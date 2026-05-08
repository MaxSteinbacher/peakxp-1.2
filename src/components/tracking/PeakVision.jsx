import { useState, useRef } from "react";
import { Eye, Video, CheckCircle, TrendingUp, Dumbbell, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { base44 } from "@/api/base44Client";

const FOCUS_AREAS = ["Carving technique", "Body position", "Speed control", "Turn initiation", "Weight distribution", "Overall assessment"];
const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];

function parseAnalysis(text) {
  const overall = text.match(/^([^*\n]+(?:\n(?![A-Z])[^\n]+)*)/)?.[1]?.trim() || "";
  const strengths = [...text.matchAll(/Strength:\s*(.+)/g)].map(m => m[1].trim());
  const improvements = [...text.matchAll(/Improvement:\s*(.+)/g)].map(m => m[1].trim());
  const drills = [...text.matchAll(/Drill:\s*(.+)/g)].map(m => m[1].trim());
  const encouragement = text.match(/Encouragement:\s*([\s\S]+?)(?:$|(?=\n[A-Z]))/)?.[1]?.trim() || "";
  const score = Math.min(100, Math.max(20, 50 + strengths.length * 8 - improvements.length * 5 + (encouragement ? 5 : 0)));
  return { overall, strengths, improvements, drills, encouragement, score };
}

function ScoreGauge({ score }) {
  const color = score >= 80 ? "#22c55e" : score >= 60 ? "#eab308" : "#FB343D";
  const circ = 2 * Math.PI * 40;
  const dash = (score / 100) * circ;
  return (
    <div className="flex flex-col items-center">
      <svg width="96" height="96" viewBox="0 0 96 96">
        <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
        <circle cx="48" cy="48" r="40" fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round"
          transform="rotate(-90 48 48)" />
        <text x="48" y="53" textAnchor="middle" fontSize="20" fontWeight="bold" fill={color}>{score}</text>
      </svg>
      <p className="text-peak-text-secondary text-xs mt-1">Technique Score</p>
      <p className="text-peak-text-secondary text-xs">AI estimate — guidance only</p>
    </div>
  );
}

export default function PeakVision() {
  const videoRef = useRef(null);
  const fileRef = useRef(null);
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [focuses, setFocuses] = useState(["Overall assessment"]);
  const [skillLevel, setSkillLevel] = useState("Intermediate");
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState("");
  const [result, setResult] = useState(null);
  const [savedAnalyses, setSavedAnalyses] = useState(() => {
    try { return JSON.parse(localStorage.getItem("peakxp_vision_analyses") || "[]"); } catch { return []; }
  });

  function handleVideo(file) {
    if (!file || !file.type.startsWith("video/")) { toast.error("Please select a video file"); return; }
    if (file.size > 100 * 1024 * 1024) { toast.error("Video must be under 100MB"); return; }
    setVideoFile(file);
    setVideoUrl(URL.createObjectURL(file));
    setResult(null);
  }

  async function extractFrames(file) {
    return new Promise(resolve => {
      const video = document.createElement("video");
      video.src = URL.createObjectURL(file);
      video.crossOrigin = "anonymous";
      video.addEventListener("loadedmetadata", () => {
        const duration = video.duration;
        const timestamps = [0.1, 0.25, 0.5, 0.75, 0.9].map(t => t * duration);
        const frames = [];
        let idx = 0;
        function seekNext() {
          if (idx >= timestamps.length) { resolve(frames); return; }
          video.currentTime = timestamps[idx++];
        }
        video.addEventListener("seeked", () => {
          const canvas = document.createElement("canvas");
          canvas.width = 640; canvas.height = 360;
          canvas.getContext("2d").drawImage(video, 0, 0, 640, 360);
          frames.push(canvas.toDataURL("image/jpeg", 0.7));
          seekNext();
        });
        seekNext();
      });
    });
  }

  async function analyse() {
    if (!videoFile) return;
    setAnalyzing(true);
    setProgress("Extracting frames for analysis...");
    const frames = await extractFrames(videoFile);
    setProgress("AI is reviewing your technique...");
    const prompt = `You are Peak Vision AI, an expert ski technique coach with 20 years of experience coaching all levels from beginners to World Cup competitors. You are analysing frames extracted from a skiing video. The user has identified as ${skillLevel} and wants feedback on: ${focuses.join(", ")}. Analyse the frames carefully for: body position and stance width, weight distribution between skis, arm position and pole planting technique, hip and shoulder alignment, turn initiation and edge engagement, speed control and rhythm. Provide your analysis in this exact structure: Overall assessment in one paragraph. Then for each identified strength, write Strength: [description] on its own line. Then for each area to improve, write Improvement: [description with specific actionable advice] on its own line. Then write three specific drills or exercises to address the main weaknesses, each starting with Drill: on its own line. End with an Encouragement: paragraph tailored to the skill level. Be specific, constructive and encouraging.`;
    setProgress("Generating coaching feedback...");
    const response = await base44.integrations.Core.InvokeLLM({ prompt, file_urls: frames, model: "claude_sonnet_4_6" });
    const parsed = parseAnalysis(typeof response === "string" ? response : JSON.stringify(response));
    setResult(parsed);
    setAnalyzing(false);
  }

  function saveAnalysis() {
    const entry = { id: Date.now(), file: videoFile?.name, date: new Date().toISOString(), skillLevel, focuses, result };
    const updated = [entry, ...savedAnalyses];
    localStorage.setItem("peakxp_vision_analyses", JSON.stringify(updated));
    setSavedAnalyses(updated);
    toast.success("Analysis saved!");
  }

  function deleteAnalysis(id) {
    const updated = savedAnalyses.filter(a => a.id !== id);
    localStorage.setItem("peakxp_vision_analyses", JSON.stringify(updated));
    setSavedAnalyses(updated);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-start gap-4 mb-2">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Eye className="h-8 w-8 text-peak-red" />
            <h1 className="font-display font-extrabold text-3xl text-peak-text">Peak Vision AI</h1>
            <span className="bg-peak-red/10 border border-peak-red/20 text-peak-red text-xs font-bold px-3 py-1 rounded-full">AI Beta</span>
          </div>
          <p className="text-peak-text-secondary text-base">Upload a video of your skiing and our AI will analyse your technique, identify areas for improvement and provide personalised coaching.</p>
        </div>
      </div>

      {/* Upload zone */}
      {!result && !analyzing && (
        <>
          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-white/10 rounded-2xl p-12 text-center cursor-pointer hover:border-peak-red/40 transition-colors bg-peak-surface mt-6">
            <Video className="w-16 h-16 text-peak-text-secondary mx-auto mb-4" />
            {videoFile ? (
              <p className="font-bold text-peak-text text-lg">{videoFile.name}</p>
            ) : (
              <>
                <p className="font-bold text-peak-text text-lg">Drop your skiing video here</p>
                <p className="text-peak-text-secondary text-sm mt-1">or click to browse</p>
                <p className="text-peak-text-secondary text-xs mt-2">Supports MP4, MOV, AVI — max 100MB</p>
              </>
            )}
            <input ref={fileRef} type="file" accept="video/*" className="hidden" onChange={e => handleVideo(e.target.files[0])} />
          </div>

          {/* Focus areas */}
          <div className="mt-6">
            <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-3">Focus areas</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {FOCUS_AREAS.map(f => (
                <button key={f} onClick={() => setFocuses(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f])}
                  className={`px-3 py-2.5 rounded-xl border text-sm font-medium text-left transition-colors ${focuses.includes(f) ? "bg-peak-red/20 border-peak-red/40 text-peak-red" : "border-white/10 text-peak-text-secondary hover:text-peak-text"}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Skill level */}
          <div className="mt-4">
            <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-3">Skill level</p>
            <div className="flex gap-2">
              {SKILL_LEVELS.map(l => (
                <button key={l} onClick={() => setSkillLevel(l)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${skillLevel === l ? "bg-peak-blue/20 border-peak-blue/50 text-peak-blue" : "border-white/10 text-peak-text-secondary hover:text-peak-text"}`}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          <button onClick={analyse} disabled={!videoFile}
            className="w-full mt-6 bg-peak-red hover:bg-peak-red-hover disabled:opacity-40 text-white font-bold rounded-2xl py-4 text-base transition-colors">
            Analyse video
          </button>
        </>
      )}

      {/* Processing state */}
      {analyzing && (
        <div className="mt-8 text-center py-16">
          <div className="w-16 h-16 border-4 border-peak-red/20 border-t-peak-red rounded-full animate-spin mx-auto mb-6" />
          <p className="text-peak-text font-medium animate-pulse">{progress}</p>
        </div>
      )}

      {/* Results */}
      {result && !analyzing && (
        <div className="mt-8">
          {videoUrl && <video src={videoUrl} controls className="w-full rounded-xl mb-6" />}

          <div className="flex items-center gap-6 mb-6">
            <ScoreGauge score={result.score} />
            {result.overall && (
              <p className="text-peak-text-secondary text-sm flex-1">{result.overall}</p>
            )}
          </div>

          {result.strengths.length > 0 && (
            <div className="bg-peak-green/5 border border-peak-green/20 rounded-xl p-5 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="h-5 w-5 text-peak-green" />
                <p className="font-bold text-peak-green">Strengths</p>
              </div>
              <ul className="space-y-2">
                {result.strengths.map((s, i) => <li key={i} className="text-peak-text text-sm flex gap-2"><span className="text-peak-green mt-0.5">•</span>{s}</li>)}
              </ul>
            </div>
          )}

          {result.improvements.length > 0 && (
            <div className="bg-peak-red/5 border border-peak-red/20 rounded-xl p-5 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-5 w-5 text-peak-red" />
                <p className="font-bold text-peak-red">Areas to Improve</p>
              </div>
              <ul className="space-y-2">
                {result.improvements.map((s, i) => <li key={i} className="text-peak-text text-sm flex gap-2"><span className="bg-peak-red/20 text-peak-red text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">{i + 1}</span>{s}</li>)}
              </ul>
            </div>
          )}

          {result.drills.length > 0 && (
            <div className="bg-peak-blue/5 border border-peak-blue/20 rounded-xl p-5 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Dumbbell className="h-5 w-5 text-peak-blue" />
                <p className="font-bold text-peak-blue">Recommended Drills</p>
              </div>
              <div className="space-y-3">
                {result.drills.map((d, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="bg-peak-blue/20 text-peak-blue text-xs rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold">{i + 1}</span>
                    <p className="text-peak-text text-sm">{d}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.encouragement && (
            <div className="bg-peak-card border border-white/5 rounded-xl p-5 mb-6 italic text-peak-text-secondary text-sm">
              {result.encouragement}
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={saveAnalysis} className="flex-1 border border-white/10 text-peak-text-secondary rounded-xl py-3 text-sm hover:text-peak-text transition-colors">Save analysis</button>
            <button onClick={() => { setResult(null); setVideoFile(null); setVideoUrl(null); }} className="flex-1 bg-peak-surface border border-white/10 text-peak-text-secondary rounded-xl py-3 text-sm hover:text-peak-text transition-colors">Analyse another video</button>
            <button onClick={() => toast.info("Community sharing coming soon!")} className="flex-1 border border-white/10 text-peak-text-secondary rounded-xl py-3 text-sm hover:text-peak-text transition-colors">Share to community</button>
          </div>
        </div>
      )}

      {/* Saved analyses */}
      {!analyzing && !result && savedAnalyses.length > 0 && (
        <div className="mt-10">
          <p className="font-bold text-peak-text text-base mb-4">Previous analyses</p>
          <div className="space-y-3">
            {savedAnalyses.map(a => (
              <div key={a.id} className="bg-peak-card border border-white/5 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Eye className="h-4 w-4 text-peak-text-secondary" />
                  <div>
                    <p className="text-peak-text text-sm font-medium">{a.file || "Unknown file"}</p>
                    <p className="text-peak-text-secondary text-xs">{new Date(a.date).toLocaleDateString()} · {a.skillLevel}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setResult(a.result); }} className="text-xs border border-white/10 rounded-lg px-3 py-1.5 text-peak-text-secondary hover:text-peak-text transition-colors">View</button>
                  <button onClick={() => deleteAnalysis(a.id)} className="text-xs text-peak-red hover:bg-peak-red/10 rounded-lg px-2 py-1.5 transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!analyzing && !result && savedAnalyses.length === 0 && !videoFile && (
        <p className="text-peak-text-secondary text-sm text-center py-8 mt-4">No saved analyses yet. Upload your first skiing video above.</p>
      )}
    </div>
  );
}