import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Mountain, Calendar, TrendingUp, Zap, Timer, MapPin, MoreVertical, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import { getUserActivities, exportActivityAsGPX, deleteActivity, formatDuration } from "../../lib/activities";
import { useAppAuth } from "../../context/AppAuthContext";

const MAPTILER_KEY = "lNsV1pOMdNShmVL9tiih";

function getSeasonRange(label) {
  const now = new Date();
  const yr = now.getFullYear();
  if (label === "All time") return { start: new Date(0), end: new Date() };
  const match = label.match(/(\d{4})\/(\d{2})/);
  if (!match) return { start: new Date(0), end: new Date() };
  const startYr = parseInt(match[1]);
  return { start: new Date(startYr, 9, 1), end: new Date(startYr + 1, 8, 30) };
}

function seasonLabel(date) {
  const d = new Date(date);
  const yr = d.getFullYear();
  const mo = d.getMonth();
  const base = mo >= 9 ? yr : yr - 1;
  return `${base}/${String(base + 1).slice(2)}`;
}

function fmtDur(s) {
  const h = Math.floor((s || 0) / 3600);
  const m = Math.floor(((s || 0) % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export default function PeakLog() {
  const { user } = useAppAuth();
  const navigate = useNavigate();
  const allActivities = getUserActivities(user?.id);

  const seasons = useMemo(() => {
    const s = new Set(allActivities.map(a => seasonLabel(a.date)));
    return ["All time", ...Array.from(s).sort().reverse()];
  }, [allActivities]);

  const [selectedSeason, setSelectedSeason] = useState(seasons[0] || "All time");
  const [typeFilter, setTypeFilter] = useState("All");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [openMenu, setOpenMenu] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  const seasonRange = getSeasonRange(selectedSeason);
  const seasonActivities = allActivities.filter(a => {
    const d = new Date(a.date);
    return d >= seasonRange.start && d <= seasonRange.end;
  });

  const filtered = useMemo(() => {
    let arr = [...seasonActivities];
    if (typeFilter !== "All") arr = arr.filter(a => a.type === typeFilter.toLowerCase());
    if (sourceFilter !== "All") arr = arr.filter(a => a.source === sourceFilter.toLowerCase());
    arr.sort((a, b) => {
      if (sortBy === "Newest") return new Date(b.date) - new Date(a.date);
      if (sortBy === "Oldest") return new Date(a.date) - new Date(b.date);
      if (sortBy === "Most vertical") return (b.stats?.verticalDescent || 0) - (a.stats?.verticalDescent || 0);
      if (sortBy === "Fastest") return (b.stats?.maxSpeed || 0) - (a.stats?.maxSpeed || 0);
      if (sortBy === "Most runs") return (b.stats?.runs || 0) - (a.stats?.runs || 0);
      return 0;
    });
    return arr;
  }, [seasonActivities, typeFilter, sourceFilter, sortBy]);

  // Hero stats
  const heroStats = useMemo(() => {
    const days = new Set(seasonActivities.map(a => a.date?.slice(0, 10))).size;
    const runs = seasonActivities.reduce((s, a) => s + (a.stats?.runs || 0), 0);
    const vDesc = seasonActivities.reduce((s, a) => s + (a.stats?.verticalDescent || 0), 0);
    const maxSpd = Math.max(0, ...seasonActivities.map(a => a.stats?.maxSpeed || 0));
    const skiTime = seasonActivities.reduce((s, a) => s + (a.stats?.durationSkiing || 0), 0);
    const resorts = new Set(seasonActivities.map(a => a.resortId).filter(Boolean)).size;
    return { days, runs, vDesc: (vDesc / 1000).toFixed(1), maxSpd: Math.round(maxSpd), skiTime: fmtDur(skiTime), resorts };
  }, [seasonActivities]);

  // Charts data
  const verticalByWeek = useMemo(() => {
    const map = {};
    seasonActivities.forEach(a => {
      const d = new Date(a.date);
      const week = `W${Math.ceil(d.getDate() / 7)} ${d.toLocaleString("en", { month: "short" })}`;
      map[week] = (map[week] || 0) + (a.stats?.verticalDescent || 0);
    });
    return Object.entries(map).map(([week, v]) => ({ week, v }));
  }, [seasonActivities]);

  const pieData = useMemo(() => {
    const skiing = seasonActivities.reduce((s, a) => s + (a.stats?.durationSkiing || 0), 0);
    const lift = seasonActivities.reduce((s, a) => s + (a.stats?.durationLift || 0), 0);
    const idle = seasonActivities.reduce((s, a) => s + (a.stats?.durationIdle || 0), 0);
    return [
      { name: "Skiing", value: skiing, color: "#3894E3" },
      { name: "On Lift", value: lift, color: "#eab308" },
      { name: "Idle", value: idle, color: "#6B7490" },
    ].filter(d => d.value > 0);
  }, [seasonActivities]);

  const techData = useMemo(() => {
    return seasonActivities
      .filter(a => a.stats?.turns && a.stats?.runs)
      .map(a => ({ date: a.date?.slice(0, 10), turnsPerRun: Math.round(a.stats.turns / a.stats.runs) }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [seasonActivities]);

  if (allActivities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 px-4">
        <Mountain className="h-16 w-16 text-peak-text-secondary/20 mb-4" />
        <h2 className="font-display font-bold text-2xl text-peak-text mb-2">No activities yet</h2>
        <p className="text-peak-text-secondary text-sm mb-8">Start recording your first ski session or import from your watch.</p>
        <div className="flex gap-3">
          <button onClick={() => navigate("/tracking")} className="px-5 py-2.5 bg-peak-red text-white font-bold rounded-xl text-sm">Start recording</button>
          <button onClick={() => navigate("/tracking/import")} className="px-5 py-2.5 border border-white/10 text-peak-text-secondary rounded-xl text-sm hover:text-peak-text">Import activity</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Season selector */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {seasons.map(s => (
          <button key={s} onClick={() => setSelectedSeason(s)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedSeason === s ? "bg-peak-red/10 border border-peak-red/30 text-peak-red" : "border border-white/10 text-peak-text-secondary hover:text-peak-text"}`}>
            {s} season
          </button>
        ))}
      </div>

      {/* Hero stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {[
          { icon: Calendar, label: "Days on mountain", value: heroStats.days },
          { icon: TrendingUp, label: "Runs", value: heroStats.runs },
          { icon: Mountain, label: "Vertical (km)", value: heroStats.vDesc },
          { icon: Zap, label: "Max speed (km/h)", value: heroStats.maxSpd },
          { icon: Timer, label: "Time skiing", value: heroStats.skiTime },
          { icon: MapPin, label: "Resorts visited", value: heroStats.resorts },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="bg-peak-card border border-white/5 rounded-2xl p-5">
            <div className="bg-peak-blue/10 rounded-xl w-10 h-10 flex items-center justify-center mb-3">
              <Icon className="h-5 w-5 text-peak-blue" />
            </div>
            <div className="font-display font-bold text-peak-text text-2xl">{value}</div>
            <div className="text-peak-text-secondary text-xs mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div className="bg-peak-surface border border-white/5 rounded-xl px-4 py-3 flex flex-wrap gap-3 items-center mb-8">
        <div className="flex gap-1">
          {["All", "Skiing", "Snowboard", "Freeride"].map(t => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${typeFilter === t ? "bg-peak-red/10 text-peak-red border border-peak-red/30" : "text-peak-text-secondary hover:text-peak-text"}`}>{t}</button>
          ))}
        </div>
        <div className="h-4 w-px bg-white/10" />
        <div className="flex gap-1">
          {["All", "Tracked", "Imported", "Manual"].map(t => (
            <button key={t} onClick={() => setSourceFilter(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${sourceFilter === t ? "bg-peak-blue/10 text-peak-blue border border-peak-blue/30" : "text-peak-text-secondary hover:text-peak-text"}`}>{t}</button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-peak-text-secondary">Sort:</span>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}
            className="bg-peak-card border border-white/10 rounded-lg px-3 py-1.5 text-xs text-peak-text outline-none">
            {["Newest", "Oldest", "Most vertical", "Fastest", "Most runs"].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
      </div>

      {/* Charts */}
      {seasonActivities.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Vertical by week */}
          <div className="bg-peak-card border border-white/5 rounded-2xl p-5">
            <h3 className="font-bold text-peak-text mb-4">Vertical Descent</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={verticalByWeek}>
                <XAxis dataKey="week" tick={{ fill: "#6B7490", fontSize: 11 }} />
                <YAxis tick={{ fill: "#6B7490", fontSize: 11 }} />
                <Tooltip contentStyle={{ background: "#141A32", border: "none", borderRadius: 8 }} labelStyle={{ color: "#ECF4FA" }} />
                <Bar dataKey="v" fill="#3894E3" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Time breakdown donut */}
          <div className="bg-peak-card border border-white/5 rounded-2xl p-5">
            <h3 className="font-bold text-peak-text mb-4">Activity Time Breakdown</h3>
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" paddingAngle={2}>
                    {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Legend formatter={(v) => <span style={{ color: "#ECF4FA", fontSize: 12 }}>{v}</span>} />
                  <Tooltip contentStyle={{ background: "#141A32", border: "none", borderRadius: 8 }} formatter={v => fmtDur(v)} />
                </PieChart>
              </ResponsiveContainer>
            ) : <p className="text-peak-text-secondary text-sm">No data</p>}
          </div>

          {/* Technique chart */}
          {techData.length > 1 && (
            <div className="bg-peak-card border border-white/5 rounded-2xl p-5">
              <h3 className="font-bold text-peak-text mb-4">Turns per Run (Technique)</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={techData}>
                  <XAxis dataKey="date" tick={{ fill: "#6B7490", fontSize: 11 }} />
                  <YAxis tick={{ fill: "#6B7490", fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "#141A32", border: "none", borderRadius: 8 }} />
                  <Line type="monotone" dataKey="turnsPerRun" stroke="#3894E3" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}

      {/* Activity list */}
      <h3 className="font-bold text-peak-text text-lg mb-4">Activities ({filtered.length})</h3>
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-peak-text-secondary text-sm">
          No activities match your filters. <button onClick={() => { setTypeFilter("All"); setSourceFilter("All"); }} className="text-peak-blue underline">Clear filters</button>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(act => {
            const pts = act.trackPoints || [];
            const avgLat = pts.length ? pts.reduce((s, p) => s + p.lat, 0) / pts.length : null;
            const avgLon = pts.length ? pts.reduce((s, p) => s + p.lon, 0) / pts.length : null;
            const miniMapUrl = avgLat && avgLon
              ? `https://api.maptiler.com/maps/019c8160-59cd-7579-afc6-753ee61bd724/static/${avgLon.toFixed(4)},${avgLat.toFixed(4)},13/400x128.png?key=${MAPTILER_KEY}`
              : null;

            return (
              <div key={act.id} className="bg-peak-card border border-white/5 rounded-2xl overflow-hidden cursor-pointer hover:border-white/15 transition-all"
                onClick={() => navigate(`/tracking/activity/${act.id}`)}>
                {miniMapUrl && (
                  <div className="h-32 relative overflow-hidden">
                    <img src={miniMapUrl} alt="route" className="w-full h-full object-cover" />
                  </div>
                )}
                {!miniMapUrl && act.resortName && (
                  <div className="h-16 bg-peak-surface flex items-center justify-center text-peak-text-secondary text-sm">{act.resortName}</div>
                )}
                <div className="px-5 py-4 flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="font-bold text-peak-text truncate">{act.name}</p>
                    <p className="text-peak-text-secondary text-sm">{new Date(act.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}{act.resortName ? ` · ${act.resortName}` : ""}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                    <span className="text-xs border border-white/10 rounded-full px-2 py-0.5 text-peak-text-secondary capitalize">{act.source}</span>
                    <div className="relative" onClick={e => { e.stopPropagation(); setOpenMenu(openMenu === act.id ? null : act.id); }}>
                      <button className="p-1.5 text-peak-text-secondary hover:text-peak-text rounded-lg hover:bg-white/5"><MoreVertical className="h-4 w-4" /></button>
                      {openMenu === act.id && (
                        <div className="absolute right-0 top-full mt-1 w-40 bg-peak-card border border-white/10 rounded-xl shadow-xl z-10 overflow-hidden">
                          {[
                            ["View", () => navigate(`/tracking/activity/${act.id}`)],
                            ["Export GPX", () => exportActivityAsGPX(act)],
                            ["Delete", () => { deleteActivity(act.id); window.location.reload(); }],
                          ].map(([label, fn]) => (
                            <button key={label} onClick={(e) => { e.stopPropagation(); fn(); setOpenMenu(null); }}
                              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${label === "Delete" ? "text-peak-red hover:bg-peak-red/10" : "text-peak-text-secondary hover:text-peak-text hover:bg-white/5"}`}>
                              {label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 px-5 pb-4 text-sm">
                  {[
                    ["Distance", `${act.stats?.distanceDownhill?.toFixed(1) || 0} km`],
                    ["Vertical", `${(act.stats?.verticalDescent || 0).toLocaleString()} m ↓`],
                    ["Runs", `${act.stats?.runs || 0}`],
                    ["Max speed", `${act.stats?.maxSpeed || 0} km/h`],
                    ["Ski time", fmtDur(act.stats?.durationSkiing)],
                    ["Turns", `${act.stats?.turns || 0}`],
                  ].map(([l, v]) => (
                    <span key={l} className="text-peak-text-secondary"><span className="text-peak-text font-medium">{v}</span> {l}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}