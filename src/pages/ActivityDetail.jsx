import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Download, Trash2, Star } from "lucide-react";
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { getActivityById, deleteActivity, exportActivityAsGPX } from "../lib/activities";
import { toast } from "sonner";

const MAPTILER_KEY = "lNsV1pOMdNShmVL9tiih";
const MAP_STYLE = `https://api.maptiler.com/maps/019c8160-59cd-7579-afc6-753ee61bd724/style.json?key=${MAPTILER_KEY}`;

function fmtDuration(s) {
  if (!s) return "—";
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function speedColor(spd) {
  if (spd < 20) return "#3894E3";
  if (spd < 40) return "#22c55e";
  if (spd < 60) return "#eab308";
  return "#FB343D";
}

function StatCard({ label, value }) {
  return (
    <div className="bg-peak-card border border-white/5 rounded-xl p-4">
      <p className="text-peak-text-secondary text-xs mb-1">{label}</p>
      <p className="font-display font-bold text-xl text-peak-text">{value ?? "—"}</p>
    </div>
  );
}

export default function ActivityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [activity, setActivity] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const a = getActivityById(id);
    if (!a) { navigate("/tracking/log"); return; }
    setActivity(a);
  }, [id]);

  useEffect(() => {
    if (!activity || mapInstance.current) return;
    const pts = activity.trackPoints || [];
    if (pts.length === 0) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.maptiler.com/maptiler-sdk-js/latest/maptiler-sdk.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://cdn.maptiler.com/maptiler-sdk-js/latest/maptiler-sdk.umd.min.js";
    script.onload = () => {
      const avgLon = pts.reduce((s, p) => s + p.lon, 0) / pts.length;
      const avgLat = pts.reduce((s, p) => s + p.lat, 0) / pts.length;
      window.maptilersdk.config.apiKey = MAPTILER_KEY;
      const map = new window.maptilersdk.Map({
        container: mapRef.current,
        style: MAP_STYLE,
        center: [avgLon, avgLat],
        zoom: 13,
        pitch: 40,
      });
      map.on("load", () => {
        const coords = pts.map(p => [p.lon, p.lat]);
        map.addSource("route", { type: "geojson", data: { type: "Feature", geometry: { type: "LineString", coordinates: coords } } });
        map.addLayer({ id: "route-line", type: "line", source: "route", paint: { "line-color": "#FB343D", "line-width": 3, "line-opacity": 0.9 }, layout: { "line-cap": "round", "line-join": "round" } });

        // Start marker
        const startEl = document.createElement("div");
        startEl.style.cssText = "width:14px;height:14px;background:#22c55e;border-radius:50%;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.5)";
        new window.maptilersdk.Marker({ element: startEl }).setLngLat(coords[0]).addTo(map);
        // End marker
        const endEl = document.createElement("div");
        endEl.style.cssText = "width:14px;height:14px;background:#FB343D;border-radius:3px;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.5)";
        new window.maptilersdk.Marker({ element: endEl }).setLngLat(coords[coords.length - 1]).addTo(map);

        mapInstance.current = map;
        setMapLoaded(true);
      });
    };
    document.head.appendChild(script);
  }, [activity]);

  if (!activity) return null;

  const s = activity.stats || {};
  const pts = activity.trackPoints || [];

  // Elevation chart data
  const elevData = pts.filter((_, i) => i % Math.max(1, Math.floor(pts.length / 200)) === 0).map((p, i) => ({
    i, alt: Math.round(p.altitude || 0), speed: Math.round(p.speed || 0),
  }));

  // Speed chart data
  const speedData = pts.filter((_, i) => i % Math.max(1, Math.floor(pts.length / 200)) === 0).map((p, i) => ({
    i, speed: Math.round(p.speed || 0),
  }));

  const totalTime = (s.durationSkiing || 0) + (s.durationLift || 0) + (s.durationIdle || 0) || 1;
  const skiPct = Math.round((s.durationSkiing || 0) / totalTime * 100);
  const liftPct = Math.round((s.durationLift || 0) / totalTime * 100);
  const idlePct = 100 - skiPct - liftPct;

  function handleDelete() {
    deleteActivity(activity.id);
    toast.success("Activity deleted");
    navigate("/tracking/log");
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back */}
      <Link to="/tracking/log" className="flex items-center gap-2 text-peak-text-secondary hover:text-peak-text text-sm mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Peak Log
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display font-extrabold text-3xl text-peak-text mb-1">{activity.name}</h1>
          <p className="text-peak-text-secondary text-sm">
            {new Date(activity.date).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            {activity.resortName && ` · ${activity.resortName}`}
          </p>
          <div className="flex gap-2 mt-2">
            <span className="text-xs bg-peak-blue/10 text-peak-blue px-2 py-0.5 rounded-full capitalize">{activity.type}</span>
            <span className="text-xs bg-peak-surface text-peak-text-secondary px-2 py-0.5 rounded-full capitalize">{activity.source}</span>
          </div>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button onClick={() => exportActivityAsGPX(activity)} className="flex items-center gap-2 px-4 py-2 border border-white/10 text-peak-text-secondary rounded-xl text-sm hover:text-peak-text transition-colors">
            <Download className="h-4 w-4" /> Export GPX
          </button>
          <button onClick={() => setShowDeleteModal(true)} className="flex items-center gap-2 px-4 py-2 bg-peak-red/10 border border-peak-red/20 text-peak-red rounded-xl text-sm hover:bg-peak-red/20 transition-colors">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Map */}
      {pts.length > 0 && (
        <div className="relative w-full h-96 rounded-2xl overflow-hidden mb-8 bg-peak-surface">
          <div ref={mapRef} className="w-full h-full" />
          {!mapLoaded && <div className="absolute inset-0 flex items-center justify-center"><div className="w-8 h-8 border-4 border-white/10 border-t-peak-red rounded-full animate-spin" /></div>}
          {/* Speed legend */}
          <div className="absolute bottom-4 left-4 bg-peak-bg/80 backdrop-blur-sm rounded-xl px-3 py-2 flex gap-3">
            {[["#3894E3","Slow"],["#22c55e","Medium"],["#eab308","Fast"],["#FB343D","Very fast"]].map(([c,l]) => (
              <span key={l} className="flex items-center gap-1 text-xs text-peak-text">
                <span className="w-3 h-3 rounded-sm" style={{ background: c }} />{l}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total duration" value={fmtDuration(s.durationTotal)} />
        <StatCard label="Skiing time" value={fmtDuration(s.durationSkiing)} />
        <StatCard label="Lift time" value={fmtDuration(s.durationLift)} />
        <StatCard label="Idle time" value={fmtDuration(s.durationIdle)} />
        <StatCard label="Downhill distance" value={s.distanceDownhill ? `${s.distanceDownhill} km` : "—"} />
        <StatCard label="Vertical descent" value={s.verticalDescent ? `${s.verticalDescent?.toLocaleString()} m` : "—"} />
        <StatCard label="Vertical ascent" value={s.verticalAscent ? `${s.verticalAscent?.toLocaleString()} m` : "—"} />
        <StatCard label="Runs" value={s.runs ?? "—"} />
        <StatCard label="Max speed" value={s.maxSpeed ? `${s.maxSpeed} km/h` : "—"} />
        <StatCard label="Avg skiing speed" value={s.avgSpeed ? `${s.avgSpeed} km/h` : "—"} />
        <StatCard label="Turns" value={s.turns ?? "—"} />
        <StatCard label="Max altitude" value={s.maxAltitude ? `${s.maxAltitude} m` : "—"} />
        <StatCard label="Min altitude" value={s.minAltitude ? `${s.minAltitude} m` : "—"} />
        <StatCard label="Start altitude" value={s.startAltitude ? `${s.startAltitude} m` : "—"} />
      </div>

      {/* Time breakdown */}
      <div className="bg-peak-card border border-white/5 rounded-2xl p-5 mb-6">
        <p className="font-bold text-peak-text text-sm mb-4">Time breakdown</p>
        <div className="flex rounded-xl overflow-hidden h-6 mb-3">
          {skiPct > 0 && <div className="bg-peak-blue transition-all" style={{ width: `${skiPct}%` }} title={`Skiing ${skiPct}%`} />}
          {liftPct > 0 && <div className="bg-yellow-500 transition-all" style={{ width: `${liftPct}%` }} title={`Lift ${liftPct}%`} />}
          {idlePct > 0 && <div className="bg-white/10 transition-all" style={{ width: `${idlePct}%` }} title={`Idle ${idlePct}%`} />}
        </div>
        <div className="flex gap-6 text-xs text-peak-text-secondary">
          <span><span className="inline-block w-2.5 h-2.5 rounded-sm bg-peak-blue mr-1.5" />Skiing {fmtDuration(s.durationSkiing)} ({skiPct}%)</span>
          <span><span className="inline-block w-2.5 h-2.5 rounded-sm bg-yellow-500 mr-1.5" />Lift {fmtDuration(s.durationLift)} ({liftPct}%)</span>
          <span><span className="inline-block w-2.5 h-2.5 rounded-sm bg-white/10 mr-1.5" />Idle {fmtDuration(s.durationIdle)} ({idlePct}%)</span>
        </div>
      </div>

      {/* Elevation chart */}
      {elevData.length > 2 && (
        <div className="bg-peak-card border border-white/5 rounded-2xl p-5 mb-6">
          <p className="font-bold text-peak-text text-sm mb-4">Elevation profile</p>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={elevData}>
              <defs>
                <linearGradient id="elevGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3894E3" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3894E3" stopOpacity={0.3} />
                </linearGradient>
              </defs>
              <XAxis dataKey="i" hide />
              <YAxis tick={{ fill: "#6B7490", fontSize: 11 }} unit="m" />
              <Tooltip contentStyle={{ background: "#141A32", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#ECF4FA" }}
                formatter={(v, n) => n === "alt" ? [`${v} m`, "Altitude"] : [`${v} km/h`, "Speed"]} />
              <Area type="monotone" dataKey="alt" stroke="#3894E3" fill="url(#elevGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Speed chart */}
      {speedData.length > 2 && (
        <div className="bg-peak-card border border-white/5 rounded-2xl p-5 mb-6">
          <p className="font-bold text-peak-text text-sm mb-4">Speed over time</p>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={speedData}>
              <XAxis dataKey="i" hide />
              <YAxis tick={{ fill: "#6B7490", fontSize: 11 }} unit=" km/h" />
              <Tooltip contentStyle={{ background: "#141A32", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#ECF4FA" }}
                formatter={v => [`${v} km/h`, "Speed"]} />
              {s.maxSpeed > 0 && <ReferenceLine y={s.maxSpeed} stroke="#FB343D" strokeDasharray="4 2" label={{ value: `Max ${s.maxSpeed}`, fill: "#FB343D", fontSize: 11 }} />}
              {s.avgSpeed > 0 && <ReferenceLine y={s.avgSpeed} stroke="#3894E3" strokeDasharray="4 2" label={{ value: `Avg ${s.avgSpeed}`, fill: "#3894E3", fontSize: 11 }} />}
              <Line type="monotone" dataKey="speed" stroke="#FB343D" dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Notes */}
      {activity.notes && (
        <div className="bg-peak-card border border-white/5 rounded-2xl p-5 mb-6">
          <p className="font-bold text-peak-text text-sm mb-2">Notes</p>
          <p className="text-peak-text-secondary text-sm">{activity.notes}</p>
        </div>
      )}

      {/* Delete modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-peak-bg/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-peak-card border border-white/10 rounded-2xl p-6 max-w-sm w-full">
            <h3 className="font-display font-bold text-xl text-peak-text mb-2">Delete activity?</h3>
            <p className="text-peak-text-secondary text-sm mb-5">This action cannot be undone. All GPS data for this session will be permanently removed.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteModal(false)} className="flex-1 border border-white/10 text-peak-text-secondary rounded-xl py-3 text-sm hover:text-peak-text transition-colors">Cancel</button>
              <button onClick={handleDelete} className="flex-1 bg-peak-red hover:bg-peak-red-hover text-white font-bold rounded-xl py-3 text-sm transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}