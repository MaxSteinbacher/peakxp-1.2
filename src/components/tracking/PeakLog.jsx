import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Mountain, BarChart3, TrendingUp, Zap, Clock, MapPin, Trash2, Download, MoreVertical } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { getAllActivities, deleteActivity, exportActivityAsGPX } from "../../lib/activities";
import { toast } from "sonner";

const MAPTILER_KEY = "lNsV1pOMdNShmVL9tiih";

function fmtDuration(s) {
  if (!s) return "0m";
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function SeasonBadge({ label, active, onClick }) {
  return (
    <button onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${active ? "bg-peak-red/10 text-peak-red border border-peak-red/30" : "text-peak-text-secondary hover:text-peak-text border border-transparent"}`}>
      {label}
    </button>
  );
}

function StatCard({ icon: IconComp, value, label, color = "text-peak-blue" }) {
  const Icon = IconComp;
  return (
    <div className="bg-peak-card border border-white/5 rounded-2xl p-5">
      <div className={`w-10 h-10 rounded-xl bg-peak-blue/10 flex items-center justify-center mb-3`}>
        <Icon className={`h-5 w-5 ${color}`} />
      </div>
      <p className="font-display font-bold text-peak-text text-2xl">{value}</p>
      <p className="text-peak-text-secondary text-xs mt-0.5">{label}</p>
    </div>
  );
}

function MiniMap({ activity }) {
  const pts = activity.trackPoints || [];
  if (pts.length < 2) {
    return (
      <div className="h-32 bg-peak-surface flex items-center justify-center">
        <span className="text-peak-text-secondary text-xs">{activity.resortName || "No map data"}</span>
      </div>
    );
  }
  const avgLon = pts.reduce((s, p) => s + p.lon, 0) / pts.length;
  const avgLat = pts.reduce((s, p) => s + p.lat, 0) / pts.length;
  const url = `https://api.maptiler.com/maps/019c8160-59cd-7579-afc6-753ee61bd724/static/${avgLon},${avgLat},12/400x128.png?key=${MAPTILER_KEY}`;
  return <img src={url} alt="Route map" className="w-full h-32 object-cover" />;
}

function ActivityCard({ activity, onDelete }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const s = activity.stats || {};
  const typeColors = { skiing: "text-peak-blue", snowboard: "text-purple-400", freeride: "text-peak-green" };

  return (
    <div className="bg-peak-card border border-white/5 rounded-2xl overflow-hidden hover:border-white/15 transition-all cursor-pointer"
      onClick={() => navigate(`/tracking/activity/${activity.id}`)}>
      <MiniMap activity={activity} />
      <div className="px-5 py-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="font-bold text-peak-text text-sm">{activity.name}</p>
            <p className="text-peak-text-secondary text-xs mt-0.5">
              {new Date(activity.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
              {activity.resortName && ` · ${activity.resortName}`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-peak-surface border border-white/10 px-2 py-0.5 rounded-full text-peak-text-secondary capitalize">{activity.source || "tracked"}</span>
            <div className="relative" onClick={e => e.stopPropagation()}>
              <button onClick={() => setMenuOpen(v => !v)} className="p-1 text-peak-text-secondary hover:text-peak-text rounded-lg transition-colors">
                <MoreVertical className="h-4 w-4" />
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-6 w-40 bg-peak-card border border-white/10 rounded-xl shadow-xl z-10 py-1">
                  <button onClick={() => { navigate(`/tracking/activity/${activity.id}`); setMenuOpen(false); }} className="w-full text-left px-3 py-2 text-sm text-peak-text-secondary hover:text-peak-text hover:bg-white/5 transition-colors">View</button>
                  <button onClick={() => { exportActivityAsGPX(activity); setMenuOpen(false); }} className="w-full text-left px-3 py-2 text-sm text-peak-text-secondary hover:text-peak-text hover:bg-white/5 transition-colors">Export GPX</button>
                  <button onClick={() => { onDelete(activity.id); setMenuOpen(false); }} className="w-full text-left px-3 py-2 text-sm text-peak-red hover:bg-peak-red/10 transition-colors">Delete</button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-peak-text-secondary">
          {s.distanceDownhill > 0 && <span><span className="text-peak-text font-medium">{s.distanceDownhill} km</span> downhill</span>}
          {s.verticalDescent > 0 && <span><span className="text-peak-text font-medium">{s.verticalDescent?.toLocaleString()} m</span> ↓</span>}
          {s.runs > 0 && <span><span className="text-peak-text font-medium">{s.runs}</span> runs</span>}
          {s.maxSpeed > 0 && <span><span className="text-peak-text font-medium">{s.maxSpeed} km/h</span> max</span>}
          {s.durationSkiing > 0 && <span><span className="text-peak-text font-medium">{fmtDuration(s.durationSkiing)}</span> ski time</span>}
          {s.turns > 0 && <span><span className="text-peak-text font-medium">{s.turns}</span> turns</span>}
        </div>
      </div>
    </div>
  );
}

function getSeasonRange(label) {
  const now = new Date();
  if (label === "All time") return null;
  const year = parseInt(label.slice(0, 4));
  return { start: new Date(year, 9, 1), end: new Date(year + 1, 8, 30) };
}

export default function PeakLog() {
  const navigate = useNavigate();
  const [season, setSeason] = useState("2024/25");
  const [typeFilter, setTypeFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [activities, setActivities] = useState(() => getAllActivities());

  const seasons = ["2024/25", "2023/24", "All time"];

  const filtered = useMemo(() => {
    let list = [...activities];
    const range = getSeasonRange(season === "All time" ? "All time" : season);
    if (range) list = list.filter(a => { const d = new Date(a.date); return d >= range.start && d <= range.end; });
    if (typeFilter !== "All") list = list.filter(a => a.type === typeFilter.toLowerCase());
    if (sortBy === "Newest") list.sort((a, b) => new Date(b.date) - new Date(a.date));
    else if (sortBy === "Oldest") list.sort((a, b) => new Date(a.date) - new Date(b.date));
    else if (sortBy === "Most vertical") list.sort((a, b) => (b.stats?.verticalDescent || 0) - (a.stats?.verticalDescent || 0));
    else if (sortBy === "Fastest") list.sort((a, b) => (b.stats?.maxSpeed || 0) - (a.stats?.maxSpeed || 0));
    return list;
  }, [activities, season, typeFilter, sortBy]);

  const heroStats = useMemo(() => {
    const days = new Set(filtered.map(a => a.date?.slice(0, 10))).size;
    const runs = filtered.reduce((s, a) => s + (a.stats?.runs || 0), 0);
    const vert = filtered.reduce((s, a) => s + (a.stats?.verticalDescent || 0), 0);
    const maxSpd = Math.max(0, ...filtered.map(a => a.stats?.maxSpeed || 0));
    const skiTime = filtered.reduce((s, a) => s + (a.stats?.durationSkiing || 0), 0);
    const resorts = new Set(filtered.map(a => a.resortId).filter(Boolean)).size;
    return { days, runs, vert: (vert / 1000).toFixed(1), maxSpd: Math.round(maxSpd), skiTime: fmtDuration(skiTime), resorts };
  }, [filtered]);

  // Chart data — vertical by week
  const vertChartData = useMemo(() => {
    const weeks = {};
    filtered.forEach(a => {
      const d = new Date(a.date);
      const wk = `W${Math.ceil(d.getDate() / 7)} ${d.toLocaleString("en", { month: "short" })}`;
      weeks[wk] = (weeks[wk] || 0) + (a.stats?.verticalDescent || 0);
    });
    return Object.entries(weeks).map(([week, vert]) => ({ week, vert }));
  }, [filtered]);

  // Pie chart data
  const pieData = useMemo(() => {
    const ski = filtered.reduce((s, a) => s + (a.stats?.durationSkiing || 0), 0);
    const lift = filtered.reduce((s, a) => s + (a.stats?.durationLift || 0), 0);
    const idle = filtered.reduce((s, a) => s + (a.stats?.durationIdle || 0), 0);
    return [
      { name: "Skiing", value: ski, color: "#3894E3" },
      { name: "Lift", value: lift, color: "#eab308" },
      { name: "Idle", value: idle, color: "#6B7490" },
    ].filter(d => d.value > 0);
  }, [filtered]);

  function handleDelete(id) {
    deleteActivity(id);
    setActivities(getAllActivities());
    toast.success("Activity deleted");
  }

  if (activities.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <Mountain className="h-16 w-16 text-peak-text-secondary/20 mx-auto mb-4" />
        <h2 className="font-display font-bold text-2xl text-peak-text mb-2">No activities yet</h2>
        <p className="text-peak-text-secondary text-sm mb-8">Start recording your first ski session or import from your watch.</p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => navigate("/tracking")} className="px-6 py-3 bg-peak-red hover:bg-peak-red-hover text-white font-bold rounded-xl transition-colors text-sm">Start recording</button>
          <button onClick={() => navigate("/tracking/import")} className="px-6 py-3 border border-white/10 text-peak-text-secondary rounded-xl transition-colors text-sm hover:text-peak-text">Import activity</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Season selector */}
      <div className="flex gap-2 mb-6">
        {seasons.map(s => <SeasonBadge key={s} label={s} active={season === s} onClick={() => setSeason(s)} />)}
      </div>

      {/* Hero stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <StatCard icon={Mountain} value={heroStats.days} label="Days on mountain" />
        <StatCard icon={TrendingUp} value={heroStats.runs} label="Runs" />
        <StatCard icon={BarChart3} value={`${heroStats.vert}km`} label="Vertical descent" />
        <StatCard icon={Zap} value={`${heroStats.maxSpd} km/h`} label="Max speed" />
        <StatCard icon={Clock} value={heroStats.skiTime} label="Time skiing" />
        <StatCard icon={MapPin} value={heroStats.resorts || "—"} label="Resorts visited" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {vertChartData.length > 0 && (
          <div className="bg-peak-card border border-white/5 rounded-2xl p-5">
            <p className="font-bold text-peak-text text-sm mb-4">Vertical descent by week</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={vertChartData}>
                <XAxis dataKey="week" tick={{ fill: "#6B7490", fontSize: 11 }} />
                <YAxis tick={{ fill: "#6B7490", fontSize: 11 }} />
                <Tooltip contentStyle={{ background: "#141A32", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#ECF4FA" }} />
                <Bar dataKey="vert" fill="#3894E3" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {pieData.length > 0 && (
          <div className="bg-peak-card border border-white/5 rounded-2xl p-5">
            <p className="font-bold text-peak-text text-sm mb-4">Activity time breakdown</p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value">
                  {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "#141A32", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#ECF4FA" }}
                  formatter={(v) => fmtDuration(v)} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-2">
              {pieData.map(d => (
                <span key={d.name} className="flex items-center gap-1.5 text-xs text-peak-text-secondary">
                  <span className="w-3 h-3 rounded-full" style={{ background: d.color }} />{d.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap gap-3 items-center mb-6 py-3 border-y border-white/5">
        <div className="flex gap-1">
          {["All", "Skiing", "Snowboard", "Freeride"].map(t => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${typeFilter === t ? "bg-peak-red/10 text-peak-red" : "text-peak-text-secondary hover:text-peak-text"}`}>
              {t}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-peak-text-secondary">Sort:</span>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}
            className="bg-peak-surface border border-white/10 rounded-lg px-3 py-1.5 text-xs text-peak-text outline-none">
            {["Newest", "Oldest", "Most vertical", "Fastest"].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Activity list */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-peak-text-secondary">No activities match your filters.</p>
          <button onClick={() => { setTypeFilter("All"); }} className="text-peak-blue text-sm hover:underline mt-2">Clear filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(a => <ActivityCard key={a.id} activity={a} onDelete={handleDelete} />)}
        </div>
      )}
    </div>
  );
}