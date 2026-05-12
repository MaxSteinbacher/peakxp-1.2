import { useState, useRef } from "react";
import { Eye, CheckCircle, TrendingUp, Dumbbell, Video } from "lucide-react";
import { toast } from "sonner";
import { base44 } from "../../api/base44Client";
import { useAppAuth } from "../../context/AppAuthContext";
import { persist, retrieve, KEYS } from "../../lib/persistence";

const FOCUS_AREAS = ["Carving technique", "Body position", "Speed control", "Turn initiation", "Weight distribution", "Overall assessment"];
const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];

function parseAnalysis(text) {
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  let overall = "", strengths = [], improvements = [], drills = [], encouragement = "";
  let section = "overall";
  for (const line of lines) {
    if (line.startsWith("Strength:")) { strengths.push(line.replace("Strength:", "").trim()); section = "strengths"; }
    else if (line.startsWith("Improvement:")) { improvements.push(line.replace("Improvement:", "").trim()); section = "improvements"; }
    else if (line.startsWith("Drill:")) { drills.push(line.replace("Drill:", "").trim()); section = "drills"; }
    else if (line.startsWith("Encouragement:")) { encouragement = line.replace("Encouragement:", "").trim(); section = "encouragement"; }
    else if (section === "overall" && !overall) overall = line;
    else if (section === "encouragement") encouragement += " " + line;
  }
  const score = Math.max(30, Math.min(95, 60 + strengths.length * 5 - improvements.length * 3));
  return { overall, strengths, improvements, drills, encouragement, score };
}

function ScoreGauge({ score }) {
  const color = score >= 80 ? "#22c55e" : score >= 60 ? "#eab308" : "#FB343D";
  const r = 36, circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <div className="flex flex-col items-center">
      <svg width="96" height="96" className="-rotate-90">
        <circle cx="48" cy="48" r={r} fill="none" stroke="#1a1f3a" strokeWidth="8" />
        <circle cx="48" cy="48" r={r} fill="none" stroke={color} strokeWidth="8" strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round" />
      </svg>
      <div className="relative -mt-16 text-center mb-6">
        <span className="font-display font-bold text-2xl" style={{ color }}>{score}</span>
      </div>
      <p className="text-peak-text font-semibold text-sm">Technique Score</p>
      <p className="text-peak-text-secondary text-xs">This is an AI estimate for guidance only.</p>
    </div>
  );
}

export default function PeakVision() {
  const { user } = useAppAuth();
  const fileRef = useRef(null);
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [focusAreas, setFocusAreas] = useState(["Overall assessment"]);
  const [skillLevel, setSkillLevel] = useState("Intermediate");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [result, setResult] = useState(null);
  const [savedAnalyses, setSavedAnalyses] = useState(() => retrieve(KEYS.VISION_ANALYSES, null, []));
  const [expandedIdx, setExpandedIdx] = useState(null);
  const [dragging, setDragging] = useState(false);

  function handleVideo(file) {
    if (!file) return;
    setVideoFile(file);
    setVideoUrl(URL.createObjectURL(file));
    setResult(null);
  }

  function toggleFocus(area) {
    setFocusAreas(prev => prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area]);
  }

  async function extractFrames(file) {
    return new Promise((resolve) => {
      const video = document.createElement("video");
      video.src = URL.createObjectURL(file);
      video.crossOrigin = "anonymous";
      video.onloadedmetadata = () => {
        const dur = video.duration;
        const timestamps = [0.1, 0.25, 0.5, 0.75, 0.9].map(t => t * dur);
        const frames = [];
        let idx = 0;
        function capture() {
          if (idx >= timestamps.length) { resolve(frames); return; }
          video.currentTime = timestamps[idx];
          video.onseeked = () => {
            const canvas = document.createElement("canvas");
            canvas.width = 640; canvas.height = 360;
            canvas.getContext("2d").drawImage(video, 0, 0, 640, 360);
            frames.push(canvas.toDataURL("image/jpeg", 0.7));
            idx++; capture();
          };
        }
        capture();
      };
      video.onerror = () => resolve([]);
    });
  }

  async function analyzeVideo() {
    if (!videoFile) return;
    setAnalyzing(true);
    setAnalysisStep(0);
    try {
      setAnalysisStep(0); // "Extracting frames..."
      const frames = await extractFrames(videoFile);
      setAnalysisStep(1); // "AI reviewing..."

      const prompt = `You are Peak Vision AI, an expert ski technique coach with 20 years of experience coaching all levels from beginners to World Cup competitors. You are analysing frames extracted from a skiing video. The user has identified as ${skillLevel} and wants feedback on: ${focusAreas.join(", ")}. Analyse the frames carefully for: body position and stance width, weight distribution between skis, arm position and pole planting technique, hip and shoulder alignment, turn initiation and edge engagement, speed control and rhythm. Provide your analysis in this exact structure: Overall assessment in one paragraph. Then for each identified strength, write Strength: [description] on its own line. Then for each area to improve, write Improvement: [description with specific actionable advice] on its own line. Then write three specific drills or exercises the skier can do to address the main weaknesses, each starting with Drill: on its own line. End with an Encouragement: paragraph tailored to the skill level. Be specific, constructive and encouraging.`;

      setAnalysisStep(2); // "Generating feedback..."
      const analysisText = await base44.integrations.Core.InvokeLLM({
        prompt,
        file_urls: frames.length > 0 ? frames : undefined,
      });

      const parsed = parseAnalysis(typeof analysisText === "string" ? analysisText : JSON.stringify(analysisText));
      setResult(parsed);
    } catch (e) {
      toast.error("Analysis failed. Please try again.");
    }
    setAnalyzing(false);
  }

  function saveAnalysis() {
    const entry = {
      id: Date.now(),
      filename: videoFile?.name || "video",
      date: new Date().toISOString(),
      skillLevel,
      focusAreas,
      result,
    };
    const updated = [entry, ...savedAnalyses];
    setSavedAnalyses(updated);
    persist(KEYS.VISION_ANALYSES, updated, user?.id || null);
    toast.success("Analysis saved!");
  }

  function deleteAnalysis(id) {
    const updated = savedAnalyses.filter(a => a.id !== id);
    setSavedAnalyses(updated);
    persist(KEYS.VISION_ANALYSES, updated, user?.id || null);
  }

  const STEPS = ["Extracting frames for analysis...", "AI is reviewing your technique...", "Generating coaching feedback..."];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-2 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Eye className="h-8 w-8 text-peak-red" />
          <h1 className="font-display font-extrabold text-3xl text-peak-text">Peak Vision AI</h1>
        </div>
        <span className="bg-peak-red/10 border border-peak-red/20 text-peak-red text-xs font-bold px-3 py-1 rounded-full self-start mt-1">AI Beta — results are for coaching guidance only</span>
      </div>
      <p className="text-peak-text-secondary text-base mb-8">Upload a video of your skiing and our AI will analyse your technique, identify areas for improvement and provide personalised coaching.</p>

      {/* Upload zone */}
      {!result && (
        <div>
          <div
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={e => { e.preventDefault(); setDragging(false); handleVideo(e.dataTransfer.files[0]); }}
            onClick={() => !analyzing && fileRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-colors bg-peak-surface ${dragging ? "border-peak-red/60" : analyzing ? "border-white/5" : "border-white/10 hover:border-peak-red/40"}`}
          >
            {analyzing ? (
              <div className="animate-pulse space-y-2">
                <Video className="w-16 h-16 text-peak-text-secondary mx-auto mb-4" />
                <p className="font-bold text-peak-text text-lg">{STEPS[analysisStep]}</p>
              </div>
            ) : videoFile ? (
              <>
                <Video className="w-16 h-16 text-peak-blue mx-auto mb-4" />
                <p className="font-bold text-peak-text text-lg">{videoFile.name}</p>
                <p className="text-peak-text-secondary text-sm">Click to change video</p>
              </>
            ) : (
              <>
                <Video className="w-16 h-16 text-peak-text-secondary mx-auto mb-4" />
                <p className="font-bold text-peak-text text-lg">Drop your skiing video here</p>
                <p className="text-peak-text-secondary text-sm">or click to browse</p>
                <p className="text-peak-text-secondary text-xs mt-2">Supports MP4, MOV, AVI — max 100MB</p>
              </>
            )}
            <input ref={fileRef} type="file" accept="video/*" className="hidden" onChange={e => handleVideo(e.target.files[0])} />
          </div>

          {/* Focus areas */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
            {FOCUS_AREAS.map(area => (
              <button key={area} onClick={() => toggleFocus(area)}
                className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors text-left ${focusAreas.includes(area) ? "bg-peak-red/20 border-peak-red/40 text-peak-red" : "border-white/10 text-peak-text-secondary hover:text-peak-text"}`}>
                {area}
              </button>
            ))}
          </div>

          {/* Skill level */}
          <div className="flex gap-2 mt-4 flex-wrap">
            {SKILL_LEVELS.map(l => (
              <button key={l} onClick={() => setSkillLevel(l)}
                className={`px-4 py-2 rounded-lg text-sm border transition-colors ${skillLevel === l ? "bg-peak-blue/10 border-peak-blue/30 text-peak-blue" : "border-white/10 text-peak-text-secondary hover:text-peak-text"}`}>
                {l}
              </button>
            ))}
          </div>

          <button onClick={analyzeVideo} disabled={!videoFile || analyzing}
            className="w-full bg-peak-red hover:bg-peak-red-hover disabled:opacity-40 text-white font-bold rounded-2xl py-4 text-base mt-6 transition-colors">
            Analyse video
          </button>
        </div>
      )}

      {/* Results */}
      {result && (
        <div>
          {videoUrl && <video src={videoUrl} controls className="w-full rounded-xl overflow-hidden mb-6" />}

          <div className="flex justify-center mb-8">
            <ScoreGauge score={result.score} />
          </div>

          {result.overall && (
            <div className="bg-peak-card border border-white/5 rounded-xl p-5 mb-4">
              <p className="text-peak-text text-sm leading-relaxed">{result.overall}</p>
            </div>
          )}

          {result.strengths.length > 0 && (
            <div className="bg-peak-green/5 border border-peak-green/20 rounded-xl p-5 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="h-5 w-5 text-peak-green" />
                <p className="font-bold text-peak-green">Strengths</p>
              </div>
              <ul className="space-y-1.5">
                {result.strengths.map((s, i) => <li key={i} className="text-peak-text text-sm flex gap-2"><span className="text-peak-green">✓</span>{s}</li>)}
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
                {result.improvements.map((s, i) => (
                  <li key={i} className="text-peak-text text-sm flex gap-2">
                    <span className="bg-peak-red/20 text-peak-red text-xs px-1.5 py-0.5 rounded font-bold flex-shrink-0">{i + 1}</span>{s}
                  </li>
                ))}
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
                    <span className="w-6 h-6 rounded-full bg-peak-blue/20 text-peak-blue text-xs flex items-center justify-center font-bold flex-shrink-0">{i + 1}</span>
                    <p className="text-peak-text text-sm">{d}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.encouragement && (
            <div className="bg-peak-card border border-white/5 rounded-xl p-5 mb-6 italic text-peak-text-secondary text-sm">{result.encouragement}</div>
          )}

          <div className="flex gap-3">
            <button onClick={saveAnalysis} className="flex-1 bg-peak-blue/10 border border-peak-blue/20 text-peak-blue font-semibold rounded-xl py-3 text-sm hover:bg-peak-blue/20 transition-colors">Save analysis</button>
            <button onClick={() => { setResult(null); setVideoFile(null); setVideoUrl(null); }} className="flex-1 border border-white/10 text-peak-text-secondary rounded-xl py-3 text-sm hover:text-peak-text">Analyse another</button>
            <button onClick={() => toast.info("Community sharing coming soon")} className="flex-1 border border-white/10 text-peak-text-secondary rounded-xl py-3 text-sm hover:text-peak-text">Share</button>
          </div>
        </div>
      )}

      {/* Saved analyses */}
      {!result && savedAnalyses.length > 0 && (
        <div className="mt-12">
          <p className="font-bold text-peak-text text-base mb-4">Previous analyses</p>
          {savedAnalyses.map((a, i) => (
            <div key={a.id} className="bg-peak-card border border-white/5 rounded-xl p-4 mb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <Eye className="h-4 w-4 text-peak-blue flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-peak-text text-sm font-medium truncate">{a.filename}</p>
                    <p className="text-peak-text-secondary text-xs">{new Date(a.date).toLocaleDateString()} · {a.skillLevel}</p>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => setExpandedIdx(expandedIdx === i ? null : i)} className="px-3 py-1.5 border border-white/10 rounded-lg text-peak-text-secondary text-xs hover:text-peak-text">View</button>
                  <button onClick={() => deleteAnalysis(a.id)} className="px-3 py-1.5 border border-peak-red/20 rounded-lg text-peak-red text-xs hover:bg-peak-red/10">Delete</button>
                </div>
              </div>
              {expandedIdx === i && a.result && (
                <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
                  {a.result.overall && <p className="text-peak-text-secondary text-sm">{a.result.overall}</p>}
                  {a.result.strengths?.map((s, j) => <p key={j} className="text-peak-green text-sm">✓ {s}</p>)}
                  {a.result.improvements?.map((s, j) => <p key={j} className="text-peak-red text-sm">↑ {s}</p>)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {!result && savedAnalyses.length === 0 && !videoFile && (
        <p className="text-peak-text-secondary text-sm text-center py-8 mt-8">No saved analyses yet. Upload your first skiing video above.</p>
      )}
    </div>
  );
}