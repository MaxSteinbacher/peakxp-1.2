import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Share2, Edit2, Trash2, Star } from "lucide-react";
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { getActivityById, deleteActivity, exportActivityAsGPX, saveActivity } from "../lib/activities";
import { toast } from "sonner";

const MAPTILER_KEY = "lNsV1pOMdNShmVL9tiih";
const MAP_STYLE = `https://api.maptiler.com/maps/019c8160-59cd-7579-afc6-753ee61bd724/style.json?key=${MAPTILER_KEY}`;

function fmtSec(s) {
  if (!s) return "—";
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = Math.floor(s % 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m ${sec}s`;
}
function speedColor(spd) {
  if (spd < 20) return "#3894E3";
  if (spd < 40) return "#22c55e";
  if (spd < 60) return "#eab308";
  return "#FB343D";
}

export default function ActivityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const mapRef = useRef(null);

  const [activity, setActivity] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editName, setEditName] = useState("");
  const [editNotes, setEditNotes] = useState("");

  useEffect(() => {
    const act = getActivityById(id);
    if (!act) { navigate("/tracking/log"); return; }
    setActivity(act);
    setEditName(act.name);
    setEditNotes(act.notes || "");
  }, [id]);

  useEffect(() => {
    if (!activity || !mapRef.current) return;
    const pts = activity.trackPoints || [];
    if (pts.length === 0) return;

    const script = document.createElement("script");
    script.src = "https://cdn.maptiler.com/maptiler-sdk-js/v2.2.0/maptiler-sdk.umd.min.js";
    script.onload = () => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://cdn.maptiler.com/maptiler-sdk-js/v2.2.0/maptiler-sdk.css";
      document.head.appendChild(link);
      const sdk = window.maptilersdk;
      sdk.config.apiKey = MAPTILER_KEY;
      const avgLat = pts.reduce((s, p) => s + p.lat, 0) / pts.length;
      const avgLon = pts.reduce((s, p) => s + p.lon, 0) / pts.length;
      const map = new sdk.Map({ container: mapRef.current, style: MAP_STYLE, center: [avgLon, avgLat], zoom: 13, pitch: 40 });
      map.on("load", () => {
        // Coloured route by speed
        pts.forEach((pt, i) => {
          if (i === 0) return;
          const prev = pts[i - 1];
          const color = speedColor(pt.speed || 0);
          map.addSource(`seg-${i}`, { type: "geojson", data: { type: "Feature", geometry: { type: "LineString", coordinates: [[prev.lon, prev.lat], [pt.lon, pt.lat]] } } });
          map.addLayer({ id: `seg-${i}`, type: "line", source: `seg-${i}`, paint: { "line-color": color, "line-width": 4 }, layout: { "line-cap": "round" } });
        });

        // Start marker
        const startEl = document.createElement("div");
        startEl.style.cssText = "width:14px;height:14px;background:#22c55e;border-radius:50%;border:2px solid white;";
        new sdk.Marker({ element: startEl }).setLngLat([pts[0].lon, pts[0].lat]).addTo(map);

        // End marker
        const endEl = document.createElement("div");
        endEl.style.cssText = "width:14px;height:14px;background:#FB343D;border:2px solid white;border-radius:2px;";
        new sdk.Marker({ element: endEl }).setLngLat([pts[pts.length - 1].lon, pts[pts.length - 1].lat]).addTo(map);
      });
    };
    if (!window.maptilersdk) document.head.appendChild(script);
    else script.onload();
  }, [activity]);

  if (!activity) return null;

  const s = activity.stats || {};
  const pts = activity.trackPoints || [];

  const elevData = pts.filter((_, i) => i % 3 === 0).map((p, i) => ({ i, alt: Math.round(p.altitude || 0), spd: p.speed || 0 }));
  const speedData = pts.filter((_, i) => i % 3 === 0).map((p, idx) => {
    const ms = Math.floor(idx * 3);
    return { t: `${Math.floor(ms / 60)}:${String(ms % 60).padStart(2, "0")}`, spd: Math.round(p.speed || 0) };
  });

  const totalTime = (s.durationSkiing || 0) + (s.durationLift || 0) + (s.durationIdle || 0) || 1;

  const statCards = [
    ["Total Duration", fmtSec(s.durationTotal)],
    ["Skiing Time", fmtSec(s.durationSkiing)],
    ["Lift Time", fmtSec(s.durationLift)],
    ["Idle Time", fmtSec(s.durationIdle)],
    ["Downhill Distance", `${s.distanceDownhill?.toFixed(1) || 0} km`],
    ["Vertical Descent", `${(s.verticalDescent || 0).toLocaleString()} m`],
    ["Vertical Ascent", `${(s.verticalAscent || 0).toLocaleString()} m`],
    ["Runs", s.runs || 0],
    ["Max Speed", `${s.maxSpeed || 0} km/h`],
    ["Avg Skiing Speed", `${s.avgSpeed || 0} km/h`],
    ["Turns", s.turns || 0],
    ["Max Altitude", s.maxAltitude ? `${s.maxAltitude} m` : "—"],
    ["Min Altitude", s.minAltitude ? `${s.minAltitude} m` : "—"],
    ["Start Altitude", s.startAltitude ? `${s.startAltitude} m` : "—"],
  ];

  function handleDelete() {
    deleteActivity(activity.id);
    toast.success("Activity deleted");
    navigate("/tracking/log");
  }

  function handleSaveEdit() {
    const updated = { ...activity, name: editName, notes: editNotes };
    saveActivity(updated);
    setActivity(updated);
    setShowEdit(false);
    toast.success("Activity updated");
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
      {/* Back */}
      <button onClick={() => navigate("/tracking/log")} className="flex items-center gap-2 text-peak-text-secondary hover:text-peak-text text-sm mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Peak Log
      </button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display font-extrabold text-3xl text-peak-text mb-1">{activity.name}</h1>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-peak-text-secondary">{new Date(activity.date).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</span>
            {activity.resortName && <span className="bg-peak-surface border border-white/10 px-2 py-0.5 rounded-full text-peak-text-secondary">{activity.resortName}</span>}
            <span className="bg-peak-blue/10 border border-peak-blue/20 text-peak-blue px-2 py-0.5 rounded-full capitalize">{activity.type}</span>
            <span className="border border-white/10 px-2 py-0.5 rounded-full text-peak-text-secondary capitalize">{activity.source}</span>
          </div>
        </div>
        <div className="flex gap-2 flex-shrink-0 flex-wrap">
          <button onClick={() => exportActivityAsGPX(activity)} className="flex items-center gap-1.5 px-3 py-2 border border-white/10 rounded-xl text-peak-text-secondary hover:text-peak-text text-sm transition-colors"><Download className="h-4 w-4" />Export GPX</button>
          <button onClick={() => toast.info("Community sharing coming soon")} className="flex items-center gap-1.5 px-3 py-2 border border-white/10 rounded-xl text-peak-text-secondary hover:text-peak-text text-sm transition-colors"><Share2 className="h-4 w-4" />Share</button>
          <button onClick={() => setShowEdit(true)} className="flex items-center gap-1.5 px-3 py-2 border border-white/10 rounded-xl text-peak-text-secondary hover:text-peak-text text-sm transition-colors"><Edit2 className="h-4 w-4" />Edit</button>
          <button onClick={() => setShowDelete(true)} className="flex items-center gap-1.5 px-3 py-2 border border-peak-red/20 rounded-xl text-peak-red text-sm hover:bg-peak-red/10 transition-colors"><Trash2 className="h-4 w-4" />Delete</button>
        </div>
      </div>

      {/* Map */}
      {pts.length > 0 && (
        <div className="relative mb-8">
          <div ref={mapRef} className="w-full h-96 rounded-2xl overflow-hidden" />
          {/* Speed legend */}
          <div className="absolute bottom-4 left-4 bg-peak-bg/80 backdrop-blur-sm rounded-xl p-3 flex flex-col gap-1.5">
            {[["Slow", "#3894E3"], ["Medium", "#22c55e"], ["Fast", "#eab308"], ["Very fast", "#FB343D"]].map(([label, color]) => (
              <div key={label} className="flex items-center gap-2">
                <div className="w-4 h-3 rounded-sm" style={{ background: color }} />
                <span className="text-peak-text text-xs">{label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 my-8">
        {statCards.map(([label, value]) => (
          <div key={label} className="bg-peak-card border border-white/5 rounded-2xl p-5">
            <div className="font-display font-bold text-2xl text-peak-text">{value}</div>
            <div className="text-peak-text-secondary text-xs mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Time breakdown bar */}
      {(s.durationSkiing || s.durationLift || s.durationIdle) && (
        <div className="bg-peak-card border border-white/5 rounded-2xl p-5 mb-8">
          <h3 className="font-bold text-peak-text mb-4">Time Breakdown</h3>
          <div className="flex h-6 rounded-full overflow-hidden mb-3">
            {[
              { val: s.durationSkiing, color: "bg-peak-blue", label: "Skiing" },
              { val: s.durationLift, color: "bg-yellow-500", label: "Lift" },
              { val: s.durationIdle, color: "bg-peak-text-secondary/30", label: "Idle" },
            ].filter(d => d.val > 0).map(d => (
              <div key={d.label} className={`${d.color} h-full`} style={{ width: `${(d.val / totalTime) * 100}%` }} />
            ))}
          </div>
          <div className="flex gap-6 flex-wrap">
            {[
              { label: "Skiing", val: s.durationSkiing, color: "text-peak-blue" },
              { label: "Lift", val: s.durationLift, color: "text-yellow-400" },
              { label: "Idle", val: s.durationIdle, color: "text-peak-text-secondary" },
            ].filter(d => d.val > 0).map(d => (
              <div key={d.label}>
                <span className={`font-semibold ${d.color}`}>{fmtSec(d.val)}</span>
                <span className="text-peak-text-secondary text-sm ml-1">{d.label} ({Math.round((d.val / totalTime) * 100)}%)</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Elevation profile */}
      {elevData.length > 2 && (
        <div className="bg-peak-card border border-white/5 rounded-2xl p-5 mb-6">
          <h3 className="font-bold text-peak-text mb-4">Elevation Profile</h3>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={elevData}>
              <defs>
                <linearGradient id="elevGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3894E3" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#3894E3" stopOpacity={0.3} />
                </linearGradient>
              </defs>
              <XAxis dataKey="i" hide />
              <YAxis tick={{ fill: "#6B7490", fontSize: 11 }} unit="m" />
              <Tooltip contentStyle={{ background: "#141A32", border: "none", borderRadius: 8 }} formatter={(v, n) => [n === "alt" ? `${v}m` : `${v}km/h`, n === "alt" ? "Altitude" : "Speed"]} />
              <Area type="monotone" dataKey="alt" stroke="#3894E3" fill="url(#elevGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Speed chart */}
      {speedData.length > 2 && (
        <div className="bg-peak-card border border-white/5 rounded-2xl p-5 mb-6">
          <h3 className="font-bold text-peak-text mb-4">Speed Chart</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={speedData}>
              <XAxis dataKey="t" tick={{ fill: "#6B7490", fontSize: 10 }} interval="preserveStartEnd" />
              <YAxis tick={{ fill: "#6B7490", fontSize: 11 }} unit=" km/h" />
              <Tooltip contentStyle={{ background: "#141A32", border: "none", borderRadius: 8 }} formatter={v => [`${v} km/h`, "Speed"]} />
              {s.maxSpeed > 0 && <ReferenceLine y={s.maxSpeed} stroke="#FB343D" strokeDasharray="4 2" label={{ value: `Max ${s.maxSpeed}`, fill: "#FB343D", fontSize: 10 }} />}
              {s.avgSpeed > 0 && <ReferenceLine y={s.avgSpeed} stroke="#3894E3" strokeDasharray="4 2" label={{ value: `Avg ${s.avgSpeed}`, fill: "#3894E3", fontSize: 10 }} />}
              <Line type="monotone" dataKey="spd" stroke="#3894E3" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Delete confirmation */}
      {showDelete && (
        <div className="fixed inset-0 bg-peak-bg/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-peak-card border border-white/10 rounded-2xl p-6 max-w-sm w-full mx-4">
            <h2 className="font-display font-bold text-xl text-peak-text mb-2">Delete activity?</h2>
            <p className="text-peak-text-secondary text-sm mb-6">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowDelete(false)} className="flex-1 border border-white/10 text-peak-text-secondary rounded-xl py-3 hover:text-peak-text">Cancel</button>
              <button onClick={handleDelete} className="flex-1 bg-peak-red text-white font-bold rounded-xl py-3">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit modal */}
      {showEdit && (
        <div className="fixed inset-0 bg-peak-bg/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-peak-card border border-white/10 rounded-2xl p-6 max-w-sm w-full mx-4">
            <h2 className="font-display font-bold text-xl text-peak-text mb-4">Edit activity</h2>
            <div className="space-y-4">
              <input value={editName} onChange={e => setEditName(e.target.value)} className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
              <textarea value={editNotes} onChange={e => setEditNotes(e.target.value)} rows={3} placeholder="Notes..." className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue resize-none" />
              <div className="flex gap-3">
                <button onClick={() => setShowEdit(false)} className="flex-1 border border-white/10 text-peak-text-secondary rounded-xl py-3">Cancel</button>
                <button onClick={handleSaveEdit} className="flex-1 bg-peak-red text-white font-bold rounded-xl py-3">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}