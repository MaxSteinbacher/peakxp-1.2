import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, PenLine, FileText, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { saveActivity, createActivityId, classifySegment, computeStats, haversineKm } from "../../lib/activities";

const MAPTILER_KEY = "lNsV1pOMdNShmVL9tiih";

function parseGPX(text) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "application/xml");
  const trkpts = doc.querySelectorAll("trkpt");
  const points = [];
  trkpts.forEach((pt, i) => {
    const lat = parseFloat(pt.getAttribute("lat"));
    const lon = parseFloat(pt.getAttribute("lon"));
    const ele = parseFloat(pt.querySelector("ele")?.textContent || "0");
    const time = pt.querySelector("time")?.textContent || new Date().toISOString();
    const prev = points[points.length - 1];
    let speed = 0;
    if (prev) {
      const dt = (new Date(time) - new Date(prev.timestamp)) / 1000;
      if (dt > 0) {
        const dist = haversineKm(prev.lat, prev.lon, lat, lon);
        speed = (dist / dt) * 3600;
      }
    }
    const cls = classifySegment(prev, { lat, lon, altitude: ele, speed, timestamp: time });
    points.push({ lat, lon, altitude: ele, speed, heading: 0, accuracy: 10, timestamp: time, classification: cls });
  });
  return points;
}

export default function TrackingImport() {
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [mode, setMode] = useState(null); // null | "gpx-preview" | "manual"
  const [parsedPoints, setParsedPoints] = useState([]);
  const [parsedStats, setParsedStats] = useState(null);
  const [gpxFileName, setGpxFileName] = useState("");
  const [gpxDate, setGpxDate] = useState("");
  const [dragging, setDragging] = useState(false);
  const [form, setForm] = useState({ name: "", type: "skiing", resort: "", notes: "", date: "", durationSki: "", durationLift: "", durationIdle: "", runs: 0, verticalDescent: 0, maxSpeed: 0 });

  function handleFile(file) {
    if (!file || !file.name.endsWith(".gpx")) { toast.error("Please select a .gpx file"); return; }
    setGpxFileName(file.name);
    const reader = new FileReader();
    reader.onload = e => {
      const text = e.target.result;
      const points = parseGPX(text);
      const stats = computeStats(points);
      setParsedPoints(points);
      setParsedStats(stats);
      const dateStr = points[0]?.timestamp?.slice(0, 10) || new Date().toISOString().slice(0, 10);
      setGpxDate(dateStr);
      setForm(f => ({ ...f, name: `Skiing — ${dateStr}`, date: dateStr }));
      setMode("gpx-preview");
    };
    reader.readAsText(file);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  }

  function saveGPX() {
    const activity = {
      id: createActivityId(),
      type: form.type,
      name: form.name,
      date: new Date(form.date || gpxDate).toISOString(),
      resortName: form.resort || null,
      source: "imported",
      stats: parsedStats,
      trackPoints: parsedPoints,
      gpxData: null,
      notes: form.notes,
      isPublic: false,
      images: [],
    };
    saveActivity(activity);
    toast.success("Activity imported!");
    navigate("/tracking/log");
  }

  function saveManual() {
    function parseDur(s) {
      const [h, m] = (s || "0:0").split(":").map(Number);
      return ((h || 0) * 3600 + (m || 0) * 60);
    }
    const stats = {
      durationTotal: parseDur(form.durationSki) + parseDur(form.durationLift) + parseDur(form.durationIdle),
      durationSkiing: parseDur(form.durationSki),
      durationLift: parseDur(form.durationLift),
      durationIdle: parseDur(form.durationIdle),
      distanceDownhill: 0, verticalDescent: parseInt(form.verticalDescent) || 0,
      verticalAscent: 0, maxSpeed: parseInt(form.maxSpeed) || 0, avgSpeed: 0,
      runs: parseInt(form.runs) || 0, turns: 0, maxAltitude: 0, minAltitude: 0, startAltitude: 0,
    };
    const activity = {
      id: createActivityId(),
      type: form.type,
      name: form.name,
      date: new Date(form.date || new Date()).toISOString(),
      resortName: form.resort || null,
      source: "manual",
      stats,
      trackPoints: [],
      notes: form.notes,
      isPublic: false,
      images: [],
    };
    saveActivity(activity);
    toast.success("Activity saved!");
    navigate("/tracking/log");
  }

  if (mode === "gpx-preview") {
    const s = parsedStats || {};
    const avgLon = parsedPoints.length ? parsedPoints.reduce((a, p) => a + p.lon, 0) / parsedPoints.length : 0;
    const avgLat = parsedPoints.length ? parsedPoints.reduce((a, p) => a + p.lat, 0) / parsedPoints.length : 0;
    const mapUrl = parsedPoints.length > 0 ? `https://api.maptiler.com/maps/019c8160-59cd-7579-afc6-753ee61bd724/static/${avgLon},${avgLat},12/600x200.png?key=${MAPTILER_KEY}` : null;
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h2 className="font-display font-extrabold text-2xl text-peak-text mb-1">Import activity</h2>
        <p className="text-peak-text-secondary text-sm mb-6">Review the parsed activity before saving.</p>
        {mapUrl && <img src={mapUrl} alt="Route" className="w-full h-48 object-cover rounded-2xl mb-4" />}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[["Vertical", s.verticalDescent ? `${s.verticalDescent}m` : "—"], ["Max speed", s.maxSpeed ? `${s.maxSpeed}km/h` : "—"], ["Runs", s.runs ?? "—"]].map(([l, v]) => (
            <div key={l} className="bg-peak-card border border-white/5 rounded-xl p-3 text-center">
              <p className="font-bold text-peak-text">{v}</p>
              <p className="text-peak-text-secondary text-xs">{l}</p>
            </div>
          ))}
        </div>
        <div className="space-y-3 mb-6">
          {[["Activity name", "name", "text"], ["Activity type", "type", "select"], ["Resort (optional)", "resort", "text"], ["Date", "date", "date"], ["Notes", "notes", "textarea"]].map(([label, key, type]) => (
            <div key={key}>
              <label className="text-xs text-peak-text-secondary mb-1 block">{label}</label>
              {type === "select" ? (
                <select value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-3 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue">
                  {["skiing", "snowboard", "freeride"].map(t => <option key={t}>{t}</option>)}
                </select>
              ) : type === "textarea" ? (
                <textarea value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} rows={2}
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-3 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue resize-none" />
              ) : (
                <input type={type} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-3 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <button onClick={() => setMode(null)} className="flex-1 border border-white/10 text-peak-text-secondary rounded-xl py-3 text-sm hover:text-peak-text transition-colors">Cancel</button>
          <button onClick={saveGPX} className="flex-1 bg-peak-red hover:bg-peak-red-hover text-white font-bold rounded-xl py-3 text-sm transition-colors">Save activity</button>
        </div>
      </div>
    );
  }

  if (mode === "manual") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h2 className="font-display font-extrabold text-2xl text-peak-text mb-1">Add manually</h2>
        <p className="text-peak-text-secondary text-sm mb-6">Log a past session without GPS data.</p>
        <div className="space-y-3 mb-6">
          {[["Activity name", "name", "text"], ["Date", "date", "date"], ["Activity type", "type", "select"], ["Resort (optional)", "resort", "text"], ["Skiing time (HH:MM)", "durationSki", "text"], ["Lift time (HH:MM)", "durationLift", "text"], ["Idle time (HH:MM)", "durationIdle", "text"], ["Vertical descent (m)", "verticalDescent", "number"], ["Max speed (km/h)", "maxSpeed", "number"], ["Notes", "notes", "textarea"]].map(([label, key, type]) => (
            <div key={key}>
              <label className="text-xs text-peak-text-secondary mb-1 block">{label}</label>
              {type === "select" ? (
                <select value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-3 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue">
                  {["skiing", "snowboard", "freeride"].map(t => <option key={t}>{t}</option>)}
                </select>
              ) : type === "textarea" ? (
                <textarea value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} rows={2}
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-3 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue resize-none" />
              ) : (
                <input type={type} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-3 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
              )}
            </div>
          ))}
          <div>
            <label className="text-xs text-peak-text-secondary mb-1 block">Runs</label>
            <div className="flex items-center gap-3">
              <button onClick={() => setForm(f => ({ ...f, runs: Math.max(0, f.runs - 1) }))} className="w-9 h-9 rounded-xl border border-white/10 text-peak-text-secondary hover:text-peak-text text-lg">−</button>
              <span className="text-peak-text font-bold w-8 text-center">{form.runs}</span>
              <button onClick={() => setForm(f => ({ ...f, runs: f.runs + 1 }))} className="w-9 h-9 rounded-xl border border-white/10 text-peak-text-secondary hover:text-peak-text text-lg">+</button>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setMode(null)} className="flex-1 border border-white/10 text-peak-text-secondary rounded-xl py-3 text-sm hover:text-peak-text transition-colors">Cancel</button>
          <button onClick={saveManual} className="flex-1 bg-peak-red hover:bg-peak-red-hover text-white font-bold rounded-xl py-3 text-sm transition-colors">Save activity</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="font-display font-extrabold text-2xl text-peak-text mb-1">Import activities</h2>
      <p className="text-peak-text-secondary text-sm mb-8">Import from Garmin, Suunto, Apple Watch, or any GPS device that exports GPX files.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* GPX upload */}
        <div className="bg-peak-card border border-white/5 rounded-2xl p-6">
          <Upload className="w-12 h-12 text-peak-blue mb-3" />
          <p className="font-bold text-peak-text text-lg mb-1">Upload GPX file</p>
          <p className="text-peak-text-secondary text-sm mb-4">Import from Garmin, Suunto, Wahoo or any GPS device</p>
          <div
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${dragging ? "border-peak-blue/60 bg-peak-blue/5" : "border-white/10 hover:border-peak-blue/40"}`}>
            <FileText className="h-8 w-8 text-peak-text-secondary mx-auto mb-2" />
            <p className="text-peak-text-secondary text-sm">Drag GPX file here or click to browse</p>
            <input ref={fileRef} type="file" accept=".gpx" className="hidden" onChange={e => handleFile(e.target.files[0])} />
          </div>
          <div className="flex flex-wrap gap-1 mt-3">
            {["Garmin", "Suunto", "Apple Watch", "Wahoo", "Polar", "Coros"].map(d => (
              <span key={d} className="text-xs bg-peak-surface border border-white/10 px-2 py-0.5 rounded-full text-peak-text-secondary">{d}</span>
            ))}
          </div>
        </div>

        {/* Manual */}
        <div className="bg-peak-card border border-white/5 rounded-2xl p-6">
          <PenLine className="w-12 h-12 text-peak-blue mb-3" />
          <p className="font-bold text-peak-text text-lg mb-1">Add activity manually</p>
          <p className="text-peak-text-secondary text-sm mb-4">Log a past session without GPS data</p>
          <button onClick={() => { setForm(f => ({ ...f, name: `Skiing — ${new Date().toISOString().slice(0, 10)}`, date: new Date().toISOString().slice(0, 10) })); setMode("manual"); }}
            className="w-full border border-white/10 text-peak-text-secondary rounded-xl py-3 hover:text-peak-text transition-colors text-sm">
            Add manually
          </button>
        </div>
      </div>

      {/* Connect devices */}
      <div className="bg-peak-card border border-white/5 rounded-2xl p-6">
        <p className="font-bold text-peak-text mb-4">Connect your device</p>
        {["Garmin Connect", "Suunto App", "Apple Health"].map(device => (
          <div key={device} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
            <div>
              <p className="text-peak-text text-sm font-medium">{device}</p>
              <p className="text-peak-text-secondary text-xs">Not connected</p>
            </div>
            <button onClick={() => toast.info("Device sync coming soon — use GPX export from your device app for now")}
              className="border border-white/10 rounded-lg px-3 py-1.5 text-peak-text-secondary text-sm hover:text-peak-text transition-colors">
              Connect
            </button>
          </div>
        ))}
        <p className="text-peak-text-secondary text-xs mt-4">Direct device sync coming soon. Export GPX from Garmin Connect, Suunto app or Apple Health and upload above.</p>
      </div>
    </div>
  );
}