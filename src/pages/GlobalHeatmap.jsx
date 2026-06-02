import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const MAPTILER_KEY = "lNsV1pOMdNShmVL9tiih";
const MAP_STYLE = `https://api.maptiler.com/maps/019c8160-59cd-7579-afc6-753ee61bd724/style.json?key=${MAPTILER_KEY}`;

// Mock activity data — replace with real user + social data
function getMockActivities(filter) {
  const base = [
    { id: 1, user: "You", resort: "Kitzbühel", coords: [[12.37,47.44],[12.38,47.45],[12.40,47.46],[12.39,47.47]], distKm: 14.2, elevGain: 820, date: "2024-02-12", sport: "ski" },
    { id: 2, user: "You", resort: "Ski Welt", coords: [[12.17,47.44],[12.19,47.45],[12.21,47.44],[12.20,47.43]], distKm: 22.8, elevGain: 1140, date: "2024-02-08", sport: "ski" },
    { id: 3, user: "Max S.", resort: "Kitzbühel", coords: [[12.38,47.44],[12.40,47.45],[12.42,47.46]], distKm: 11.5, elevGain: 680, date: "2024-02-11", sport: "ski" },
    { id: 4, user: "Julia K.", resort: "Saalbach", coords: [[12.64,47.39],[12.66,47.40],[12.65,47.41]], distKm: 18.3, elevGain: 930, date: "2024-02-10", sport: "ski" },
    { id: 5, user: "Thomas R.", resort: "Ischgl", coords: [[10.28,47.01],[10.30,47.02],[10.29,47.03]], distKm: 26.1, elevGain: 1280, date: "2024-02-09", sport: "ski" },
    { id: 6, user: "You", resort: "Zell am See", coords: [[12.78,47.31],[12.79,47.32],[12.81,47.33]], distKm: 19.6, elevGain: 1050, date: "2024-01-28", sport: "snowboard" },
    { id: 7, user: "Anna L.", resort: "Verbier", coords: [[7.23,46.10],[7.24,46.11],[7.22,46.12]], distKm: 29.4, elevGain: 1650, date: "2024-02-07", sport: "ski" },
    { id: 8, user: "Marco P.", resort: "Cortina", coords: [[12.13,46.54],[12.14,46.55],[12.12,46.56]], distKm: 15.7, elevGain: 870, date: "2024-02-06", sport: "ski" },
  ];
  if (filter === "mine") return base.filter(a => a.user === "You");
  if (filter === "friends") return base.filter(a => a.user !== "You");
  return base;
}

const FILTER_OPTIONS = [
  { key: "everyone", label: "Everyone" },
  { key: "friends", label: "Friends" },
  { key: "mine", label: "My routes" },
];

const SPORT_COLORS = { ski: "#FB343D", snowboard: "#3894E3" };

export default function GlobalHeatmap() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const navigate = useNavigate();
  const [filter, setFilter] = useState("everyone");
  const [loading, setLoading] = useState(true);
  const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.maptiler.com/maptiler-sdk-js/v2.2.0/maptiler-sdk.umd.min.js";
    script.onload = () => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://cdn.maptiler.com/maptiler-sdk-js/v2.2.0/maptiler-sdk.css";
      document.head.appendChild(link);

      const sdk = window.maptilersdk;
      sdk.config.apiKey = MAPTILER_KEY;

      const map = new sdk.Map({
        container: mapRef.current,
        style: MAP_STYLE,
        center: [10.5, 47.0],
        zoom: 5.5,
        pitch: 30,
        bearing: 0,
      });

      map.on("load", () => {
        // Add route line source
        map.addSource("activities", { type: "geojson", data: buildGeoJSON("everyone") });

        // Glow layer (heatmap-style)
        map.addLayer({
          id: "activity-glow",
          type: "line", source: "activities",
          paint: {
            "line-color": ["get", "color"],
            "line-width": 8, "line-opacity": 0.15, "line-blur": 4,
          }
        });
        // Core line
        map.addLayer({
          id: "activity-lines",
          type: "line", source: "activities",
          layout: { "line-cap": "round", "line-join": "round" },
          paint: {
            "line-color": ["get", "color"],
            "line-width": ["case", ["==", ["get", "isUser"], true], 2.5, 1.5],
            "line-opacity": ["case", ["==", ["get", "isUser"], true], 0.9, 0.55],
          }
        });

        mapInstance.current = map;
        setLoading(false);
      });
    };
    document.head.appendChild(script);
    return () => { if (mapInstance.current) { try { mapInstance.current.remove(); } catch {} } };
  }, []);

  function buildGeoJSON(f) {
    const activities = getMockActivities(f);
    return {
      type: "FeatureCollection",
      features: activities.map(a => ({
        type: "Feature",
        geometry: { type: "LineString", coordinates: a.coords },
        properties: { id: a.id, user: a.user, resort: a.resort, distKm: a.distKm, isUser: a.user === "You", color: SPORT_COLORS[a.sport] || "#FB343D" }
      }))
    };
  }

  function applyFilter(f) {
    setFilter(f);
    if (!mapInstance.current) return;
    const src = mapInstance.current.getSource("activities");
    if (src) src.setData(buildGeoJSON(f));
  }

  const activities = getMockActivities(filter);
  const totalKm = activities.reduce((s, a) => s + a.distKm, 0);
  const resorts = new Set(activities.map(a => a.resort)).size;
  const uniqueUsers = new Set(activities.map(a => a.user)).size;

  return (
    <div className="min-h-screen bg-peak-bg">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display font-extrabold text-3xl text-peak-text">Activity Map</h1>
            <p className="text-peak-text-secondary text-sm mt-1">All routes on the mountain — yours, friends, and the community</p>
          </div>
          <div className="flex gap-1 bg-peak-surface border border-white/10 rounded-xl p-1">
            {FILTER_OPTIONS.map(o => (
              <button key={o.key} onClick={() => applyFilter(o.key)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === o.key ? "bg-peak-red text-white" : "text-peak-text-secondary hover:text-peak-text"}`}>
                {o.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Routes", value: activities.length },
            { label: "Resorts covered", value: resorts },
            { label: "Total distance", value: `${totalKm.toFixed(0)} km` },
            { label: "Active skiers", value: uniqueUsers },
          ].map(s => (
            <div key={s.label} className="bg-peak-card border border-white/5 rounded-xl px-4 py-3">
              <p className="text-peak-text-secondary text-xs mb-1">{s.label}</p>
              <p className="text-peak-text font-bold text-xl font-display">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          {/* Map */}
          <div className="flex-1 rounded-2xl overflow-hidden border border-white/8" style={{ height: 520, position: "relative" }}>
            {loading && (
              <div className="absolute inset-0 bg-peak-bg flex items-center justify-center z-10">
                <p className="text-peak-text-secondary text-sm">Loading map…</p>
              </div>
            )}
            <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
          </div>

          {/* Activity feed */}
          <div className="w-72 flex-shrink-0 hidden lg:block">
            <div className="bg-peak-card border border-white/5 rounded-2xl overflow-hidden" style={{ height: 520, overflowY: "auto" }}>
              <div className="p-4 border-b border-white/5 sticky top-0 bg-peak-card">
                <p className="text-peak-text font-semibold text-sm">Recent activity</p>
              </div>
              <div className="divide-y divide-white/5">
                {activities.map(a => (
                  <div key={a.id} className="p-4 hover:bg-white/4 cursor-pointer transition-colors"
                    onClick={() => setSelectedActivity(a)}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-7 h-7 rounded-full bg-peak-red/20 border border-peak-red/30 flex items-center justify-center text-xs font-bold text-peak-red flex-shrink-0">
                        {a.user[0]}
                      </div>
                      <div className="min-w-0">
                        <p className="text-peak-text text-xs font-semibold truncate">{a.user}</p>
                        <p className="text-peak-text-secondary text-xs truncate">{a.resort}</p>
                      </div>
                      <span className="ml-auto text-peak-text-secondary text-xs flex-shrink-0">{a.date.slice(5)}</span>
                    </div>
                    <div className="flex gap-3 text-xs text-peak-text-secondary">
                      <span>⛷️ {a.distKm} km</span>
                      <span>↑ {a.elevGain}m</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
