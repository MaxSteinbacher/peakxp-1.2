import { useState, useRef, useEffect, useLayoutEffect, useCallback } from "react";
import { MapPin, Plus, Mountain, Route, Trash2, Download, Map } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { searchDestinations } from "../../lib/searchIndex";
import LocationInput from "../shared/LocationInput";
import { retrieve, persist, KEYS } from "../../lib/persistence";
import { useAppAuth } from "../../context/AppAuthContext";
import { getResortById } from "../../lib/data";


// Don't cache SDK promise — always check window.maptilersdk first

function overpassToGeoJSON(data) {
  const nodes = {};
  data.elements.forEach(el => { if (el.type === "node") nodes[el.id] = [el.lon, el.lat]; });
  const features = [];
  data.elements.forEach(el => {
    if (el.type === "way" && el.nodes) {
      const coords = el.nodes.map(nid => nodes[nid]).filter(Boolean);
      if (coords.length < 2) return;
      features.push({ type: "Feature", geometry: { type: "LineString", coordinates: coords }, properties: { ...el.tags, _id: el.id } });
    }
  });
  return { type: "FeatureCollection", features };
}

function haversineKm(a, b) {
  const R = 6371;
  const dLat = (b[1] - a[1]) * Math.PI / 180;
  const dLon = (b[0] - a[0]) * Math.PI / 180;
  const s = Math.sin(dLat / 2) ** 2 + Math.cos(a[1] * Math.PI / 180) * Math.cos(b[1] * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
}

function calcStats(points) {
  if (points.length < 2) return { distanceKm: "0.0", totalDescent: 0, totalAscent: 0, estimatedMinutes: 0 };
  let dist = 0, descent = 0, ascent = 0;
  for (let i = 1; i < points.length; i++) {
    dist += haversineKm(points[i - 1].lngLat, points[i].lngLat);
    if (points[i].elevation != null && points[i - 1].elevation != null) {
      const diff = points[i - 1].elevation - points[i].elevation;
      if (diff > 0) descent += diff; else ascent += Math.abs(diff);
    }
  }
  return { distanceKm: dist.toFixed(1), totalDescent: Math.round(descent), totalAscent: Math.round(ascent), estimatedMinutes: Math.round(dist / 30 * 60) };
}

function nearestPointOnLine(point, lineCoords) {
  let best = null, bestDist = Infinity;
  for (let i = 0; i < lineCoords.length - 1; i++) {
    const [x1, y1] = lineCoords[i], [x2, y2] = lineCoords[i + 1];
    const dx = x2 - x1, dy = y2 - y1;
    const t = Math.max(0, Math.min(1, ((point[0] - x1) * dx + (point[1] - y1) * dy) / (dx * dx + dy * dy)));
    const px = x1 + t * dx, py = y1 + t * dy;
    const d = haversineKm(point, [px, py]) * 1000;
    if (d < bestDist) { bestDist = d; best = [px, py]; }
  }
  return { point: best, dist: bestDist };
}


function generateGPX(route) {
  const pts = route.points.map(p =>
    `  <wpt lat="${p.lngLat[1]}" lon="${p.lngLat[0]}">${p.elevation != null ? `<ele>${p.elevation}</ele>` : ""}<name>${p.name}</name></wpt>`
  ).join("\n");
  const trkpts = route.points.map(p =>
    `      <trkpt lat="${p.lngLat[1]}" lon="${p.lngLat[0]}">${p.elevation != null ? `<ele>${p.elevation}</ele>` : ""}</trkpt>`
  ).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="PeakXP">
  <metadata><name>${route.name}</name></metadata>
${pts}
  <trk><name>${route.name}</name><trkseg>
${trkpts}
  </trkseg></trk>
</gpx>`;
}

const EMPTY_FC = { type: "FeatureCollection", features: [] };

// ── Embedded route planner map ───────────────────────────────────────────────
export default function RoutePlannerLanding() {
  const { user } = useAppAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [selectedResort, setSelectedResort] = useState(null);
  const [savedRoutes, setSavedRoutes] = useState([]);
  const searchRef = useRef(null);

  // Load saved routes
  useEffect(() => {
    const routes = retrieve(KEYS.ROUTES, user?.id, []);
    setSavedRoutes(routes);
  }, [user?.id]);

  function persistRoutes(routes) {
    persist(KEYS.ROUTES, routes, user?.id);
    setSavedRoutes(routes);
  }

  function handleSelectResort(item) {
    const resort = getResortById(item.id);
    setSelectedResort(resort);
    setQuery(item.label);
  }

  function handleDeleteRoute(routeId) {
    persistRoutes(savedRoutes.filter(r => r.id !== routeId));
  }

  function handleOpenRoute(route) {
    const resort = getResortById(route.resortId);
    if (!resort) return;
    setSelectedResort(resort);
    setQuery(resort.name);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleExportGPX(route) {
    const gpx = generateGPX(route);
    const blob = new Blob([gpx], { type: "application/gpx+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${route.name.replace(/\s+/g, "_")}.gpx`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Group saved routes by resort
  const routesByResort = savedRoutes.reduce((acc, r) => {
    const key = r.resortName || "Unknown resort";
    if (!acc[key]) acc[key] = [];
    acc[key].push(r);
    return acc;
  }, {});

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-peak-text text-2xl">Route Planner</h1>
          <p className="text-peak-text-secondary text-sm mt-0.5">Plan your runs before you ski them</p>
        </div>
        <button
          onClick={() => {
            if (selectedResort) {
              navigate(`/resort/${selectedResort.id}/map`);
            } else {
                        setQuery("");
              setTimeout(() => {
                searchRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
                searchRef.current?.querySelector("input")?.focus();
              }, 50);
            }
          }}
          className="bg-peak-red text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-peak-red-hover transition-colors">
          <Plus className="h-4 w-4" />
          Start planning
        </button>
      </div>

      {/* Resort search */}
      <div className="mb-6" ref={searchRef}>
        <LocationInput
          type="resort" context="destination" placeholder="Search for a resort to plan a route..."
          value={query} onChange={setQuery}
          onSelect={item => handleSelectResort(item)}
        />
      </div>

      {/* Saved routes */}
      <div>
        <h2 className="font-bold text-peak-text text-base mb-4">Your saved routes</h2>

        {savedRoutes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Mountain className="h-12 w-12 text-peak-text-secondary/30 mb-4" />
            <p className="text-peak-text-secondary text-sm">No routes yet.</p>
            <p className="text-peak-text-secondary/60 text-xs mt-1">Search for a resort above and start planning your first run.</p>
          </div>
        ) : (
          Object.entries(routesByResort).map(([resortName, routes]) => (
            <div key={resortName} className="mb-6">
              <p className="text-peak-text-secondary text-xs font-semibold uppercase tracking-widest mb-2">{resortName}</p>
              {routes.map(route => (
                <div key={route.id} className="bg-peak-card border border-white/5 rounded-xl p-4 mb-3 flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-peak-red/10 flex items-center justify-center flex-shrink-0">
                    <Route className="h-4 w-4 text-peak-red" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-peak-text font-semibold text-sm">{route.name}</p>
                    <p className="text-peak-text-secondary text-xs mt-0.5">
                      {new Date(route.createdAt).toLocaleDateString()} · {route.stats?.distanceKm || "0.0"} km · {route.points?.length || 0} waypoints
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={() => handleOpenRoute(route)}
                      className="px-3 py-1.5 bg-peak-blue/10 text-peak-blue text-xs font-medium rounded-lg hover:bg-peak-blue/20 transition-colors">
                      Open
                    </button>
                    <button onClick={() => handleExportGPX(route)}
                      className="p-1.5 text-peak-text-secondary hover:text-peak-text rounded-lg hover:bg-white/5 transition-colors">
                      <Download className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDeleteRoute(route.id)}
                      className="p-1.5 text-peak-text-secondary hover:text-peak-red rounded-lg hover:bg-peak-red/10 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}