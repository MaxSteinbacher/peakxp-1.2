import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, PenLine, Watch } from "lucide-react";
import { toast } from "sonner";
import { saveActivity, createActivityId, classifySegment, calcStatsFromTrackPoints } from "../../lib/activities";

const DEVICES = ["Garmin", "Suunto", "Apple Watch", "Wahoo", "Polar", "Coros"];
const DEVICE_ROWS = [
  { name: "Garmin Connect", icon: "⌚" },
  { name: "Suunto App", icon: "⌚" },
  { name: "Apple Health", icon: "🍎" },
];

function parseGPX(text) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "application/xml");
  const trkpts = Array.from(doc.querySelectorAll("trkpt"));
  const points = trkpts.map(pt => ({
    lat: parseFloat(pt.getAttribute("lat")),
    lon: parseFloat(pt.getAttribute("lon")),
    altitude: parseFloat(pt.querySelector("ele")?.textContent || "0"),
    timestamp: pt.querySelector("time")?.textContent || new Date().toISOString(),
    speed: 0,
    heading: null,
    accuracy: null,
    classification: "idle",
  }));

  // Calculate speed and classify
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const cur = points[i];
    const dt = (new Date(cur.timestamp) - new Date(prev.timestamp)) / 1000;
    if (dt > 0) {
      const R = 6371000;
      const dLat = (cur.lat - prev.lat) * Math.PI / 180;
      const dLon = (cur.lon - prev.lon) * Math.PI / 180;
      const a = Math.sin(dLat/2)**2 + Math.cos(prev.lat*Math.PI/180)*Math.cos(cur.lat*Math.PI/180)*Math.sin(dLon/2)**2;
      const dist = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      cur.speed = (dist / dt) * 3.6;
    }
    cur.classification = classifySegment(prev, cur);
  }
  if (points.length) points[0].classification = "idle";
  return points;
}

export default function TrackingImport() {
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [parsed, setParsed] = useState(null);
  const [showManual, setShowManual] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [tooltips, setTooltips] = useState({});

  // Manual form state
  const [manual, setManual] = useState({
    name: "", date: "", type: "skiing", resort: "", skiTime: "", liftTime: "", idleTime: "", runs: 0, vertical: 0, maxSpeed: 0, notes: ""
  });

  // GPX preview state
  const [preview, setPreview] = useState({ name: "", type: "skiing", resort: "", notes: "", date: "" });

  function handleFile(file) {
    if (!file || !file.name.endsWith(".gpx")) { toast.error("Please select a .gpx file"); return; }
    const reader = new FileReader();
    reader.onload = e => {
      const points = parseGPX(e.target.result);
      const stats = calcStatsFromTrackPoints(points);
      const date = points[0]?.timestamp ? points[0].timestamp.slice(0, 10) : new Date().toISOString().slice(0, 10);
      setParsed({ points, stats, rawGpx: e.target.result, filename: file.name });
      setPreview({ name: file.name.replace(".gpx", ""), type: "skiing", resort: "", notes: "", date });
    };
    reader.readAsText(file);
  }

  function saveGpxActivity() {
    const pts = parsed.points;
    const avgLat = pts.length ? pts.reduce((s, p) => s + p.lat, 0) / pts.length : null;
    const avgLon = pts.length ? pts.reduce((s, p) => s + p.lon, 0) / pts.length : null;
    const MAPTILER_KEY = "lNsV1pOMdNShmVL9tiih";
    const miniMapUrl = avgLat && avgLon
      ? `https://api.maptiler.com/maps/019c8160-59cd-7579-afc6-753ee61bd724/static/${avgLon.toFixed(4)},${avgLat.toFixed(4)},13/400x128.png?key=${MAPTILER_KEY}`
      : null;

    const activity = {
      id: createActivityId(),
      userId: null,
      type: preview.type,
      name: preview.name,
      date: new Date(preview.date).toISOString(),
      resortId: null,
      resortName: preview.resort || null,
      source: "imported",
      stats: parsed.stats,
      trackPoints: parsed.points,
      gpxData: parsed.rawGpx,
      notes: preview.notes,
      isPublic: false,
      images: [],
    };
    saveActivity(activity);
    toast.success("Activity imported!");
    navigate("/tracking/log");
  }

  function saveManualActivity() {
    function parseDur(str) {
      const [h, m] = (str || "0:0").split(":").map(Number);
      return (h || 0) * 3600 + (m || 0) * 60;
    }
    const dSki = parseDur(manual.skiTime);
    const dLift = parseDur(manual.liftTime);
    const dIdle = parseDur(manual.idleTime);
    const activity = {
      id: createActivityId(),
      userId: null,
      type: manual.type,
      name: manual.name || `${manual.type} activity`,
      date: new Date(manual.date || Date.now()).toISOString(),
      resortId: null,
      resortName: manual.resort || null,
      source: "manual",
      stats: {
        durationTotal: dSki + dLift + dIdle,
        durationSkiing: dSki,
        durationLift: dLift,
        durationIdle: dIdle,
        distanceDownhill: 0,
        maxSpeed: parseFloat(manual.maxSpeed) || 0,
        avgSpeed: 0,
        verticalDescent: parseInt(manual.vertical) || 0,
        verticalAscent: 0,
        runs: parseInt(manual.runs) || 0,
        turns: 0,
        maxAltitude: null, minAltitude: null, startAltitude: null,
      },
      trackPoints: [],
      gpxData: null,
      notes: manual.notes,
      isPublic: false,
      images: [],
    };
    saveActivity(activity);
    toast.success("Activity added!");
    navigate("/tracking/log");
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="font-display font-extrabold text-2xl text-peak-text mb-2">Import activities</h1>
      <p className="text-peak-text-secondary mb-8">Import activities from your Garmin, Suunto, Apple Watch, or any GPS device that exports GPX files.</p>

      {!parsed && !showManual && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {/* GPX Upload */}
            <div className="bg-peak-card border border-white/5 rounded-2xl p-6">
              <Upload className="w-12 h-12 text-peak-blue mb-3" />
              <p className="font-bold text-peak-text text-lg mb-1">Upload GPX file</p>
              <p className="text-peak-text-secondary text-sm mb-4">Import from Garmin, Suunto, Wahoo or any GPS device</p>
              <div
                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
                onClick={() => fileRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${dragging ? "border-peak-blue/60 bg-peak-blue/5" : "border-white/10 hover:border-peak-blue/40"}`}>
                <p className="text-peak-text-secondary text-sm">Drag GPX file here or click to browse</p>
                <input ref={fileRef} type="file" accept=".gpx" className="hidden" onChange={e => handleFile(e.target.files[0])} />
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {DEVICES.map(d => <span key={d} className="text-xs border border-white/10 rounded-full px-2 py-0.5 text-peak-text-secondary">{d}</span>)}
              </div>
            </div>

            {/* Manual */}
            <div className="bg-peak-card border border-white/5 rounded-2xl p-6">
              <PenLine className="w-12 h-12 text-peak-blue mb-3" />
              <p className="font-bold text-peak-text text-lg mb-1">Add activity manually</p>
              <p className="text-peak-text-secondary text-sm mb-4">Log a past session without GPS data</p>
              <button onClick={() => setShowManual(true)} className="w-full border border-white/10 text-peak-text-secondary rounded-xl py-3 hover:text-peak-text transition-colors text-sm">Add manually</button>
            </div>
          </div>

          {/* Connect devices */}
          <div className="bg-peak-card border border-white/5 rounded-2xl p-6">
            <p className="font-bold text-peak-text mb-4">Connect your device</p>
            {DEVICE_ROWS.map(d => (
              <div key={d.name} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{d.icon}</span>
                  <span className="text-peak-text text-sm">{d.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-peak-text-secondary text-sm">Not connected</span>
                  <div className="relative">
                    <button
                      onClick={() => setTooltips(t => ({ ...t, [d.name]: !t[d.name] }))}
                      className="border border-white/10 rounded-lg px-3 py-1.5 text-peak-text-secondary text-sm hover:text-peak-text transition-colors">
                      Connect
                    </button>
                    {tooltips[d.name] && (
                      <div className="absolute right-0 top-full mt-1 w-64 bg-peak-surface border border-white/10 rounded-xl p-3 text-xs text-peak-text-secondary z-10 shadow-xl">
                        Device sync coming soon — use GPX export from your device app for now.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <p className="text-peak-text-secondary text-xs mt-3">Direct device sync coming soon. Export GPX from Garmin Connect, Suunto app or Apple Health and upload above.</p>
          </div>
        </>
      )}

      {/* GPX Preview */}
      {parsed && (
        <div className="bg-peak-card border border-white/5 rounded-2xl p-6">
          <h2 className="font-bold text-peak-text text-lg mb-4">Review import</h2>
          <div className="space-y-4 mb-6">
            <div>
              <label className="text-xs text-peak-text-secondary uppercase tracking-widest mb-1 block">Activity name</label>
              <input value={preview.name} onChange={e => setPreview(p => ({ ...p, name: e.target.value }))}
                className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
            </div>
            <div>
              <label className="text-xs text-peak-text-secondary uppercase tracking-widest mb-1 block">Type</label>
              <select value={preview.type} onChange={e => setPreview(p => ({ ...p, type: e.target.value }))}
                className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none">
                {["skiing", "snowboard", "freeride"].map(t => <option key={t} value={t} className="capitalize">{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-peak-text-secondary uppercase tracking-widest mb-1 block">Notes</label>
              <textarea value={preview.notes} onChange={e => setPreview(p => ({ ...p, notes: e.target.value }))} rows={2}
                className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue resize-none" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              ["Vertical", `${parsed.stats?.verticalDescent || 0}m`],
              ["Max speed", `${parsed.stats?.maxSpeed || 0}km/h`],
              ["Distance", `${parsed.stats?.distanceDownhill?.toFixed(1) || 0}km`],
            ].map(([l, v]) => (
              <div key={l} className="bg-peak-surface rounded-xl p-3 text-center">
                <div className="font-bold text-peak-text">{v}</div>
                <div className="text-xs text-peak-text-secondary">{l}</div>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={() => setParsed(null)} className="flex-1 border border-white/10 text-peak-text-secondary rounded-xl py-3 text-sm hover:text-peak-text">Cancel</button>
            <button onClick={saveGpxActivity} className="flex-1 bg-peak-red hover:bg-peak-red-hover text-white font-bold rounded-xl py-3 text-sm">Save activity</button>
          </div>
        </div>
      )}

      {/* Manual form */}
      {showManual && (
        <div className="bg-peak-card border border-white/5 rounded-2xl p-6">
          <h2 className="font-bold text-peak-text text-lg mb-4">Add activity manually</h2>
          <div className="space-y-4">
            {[
              { key: "name", label: "Activity name", type: "text", placeholder: "e.g. Morning run at Verbier" },
              { key: "date", label: "Date", type: "date" },
            ].map(f => (
              <div key={f.key}>
                <label className="text-xs text-peak-text-secondary uppercase tracking-widest mb-1 block">{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} value={manual[f.key]} onChange={e => setManual(m => ({ ...m, [f.key]: e.target.value }))}
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
              </div>
            ))}
            <div>
              <label className="text-xs text-peak-text-secondary uppercase tracking-widest mb-1 block">Type</label>
              <div className="flex gap-2">
                {["skiing", "snowboard", "freeride"].map(t => (
                  <button key={t} onClick={() => setManual(m => ({ ...m, type: t }))}
                    className={`px-4 py-2 rounded-lg text-sm border transition-colors capitalize ${manual.type === t ? "bg-peak-red/10 border-peak-red/30 text-peak-red" : "border-white/10 text-peak-text-secondary"}`}>{t}</button>
                ))}
              </div>
            </div>
            {[
              { key: "skiTime", label: "Skiing time (HH:MM)" },
              { key: "liftTime", label: "Lift time (HH:MM)" },
              { key: "idleTime", label: "Idle time (HH:MM)" },
            ].map(f => (
              <div key={f.key}>
                <label className="text-xs text-peak-text-secondary uppercase tracking-widest mb-1 block">{f.label}</label>
                <input placeholder="0:00" value={manual[f.key]} onChange={e => setManual(m => ({ ...m, [f.key]: e.target.value }))}
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
              </div>
            ))}
            <div className="grid grid-cols-3 gap-3">
              {[
                { key: "runs", label: "Runs" },
                { key: "vertical", label: "Vertical (m)" },
                { key: "maxSpeed", label: "Max speed (km/h)" },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-xs text-peak-text-secondary uppercase tracking-widest mb-1 block">{f.label}</label>
                  <input type="number" value={manual[f.key]} onChange={e => setManual(m => ({ ...m, [f.key]: e.target.value }))}
                    className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
                </div>
              ))}
            </div>
            <div>
              <label className="text-xs text-peak-text-secondary uppercase tracking-widest mb-1 block">Notes</label>
              <textarea value={manual.notes} onChange={e => setManual(m => ({ ...m, notes: e.target.value }))} rows={2}
                className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue resize-none" />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowManual(false)} className="flex-1 border border-white/10 text-peak-text-secondary rounded-xl py-3 text-sm">Cancel</button>
              <button onClick={saveManualActivity} className="flex-1 bg-peak-red text-white font-bold rounded-xl py-3 text-sm">Save activity</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}