import { useState, useRef, useEffect, useCallback } from "react";
import { MapPin, Plus, Mountain, Route, Trash2, Download, Map } from "lucide-react";
import { searchDestinations } from "../../lib/searchIndex";
import { retrieve, persist, KEYS } from "../../lib/persistence";
import { useAppAuth } from "../../context/AppAuthContext";
import { getResortById } from "../../lib/data";
import LeftPanel from "../route/LeftPanel";
import RightPanel from "../route/RightPanel";

const MAPTILER_KEY = "lNsV1pOMdNShmVL9tiih";
const STYLE_URL = `https://api.maptiler.com/maps/outdoor-v2/style.json?key=${MAPTILER_KEY}`;

let sdkLoadPromise = null;
function loadSDK() {
  if (sdkLoadPromise) return sdkLoadPromise;
  sdkLoadPromise = new Promise((resolve, reject) => {
    if (window.maptilersdk) return resolve(window.maptilersdk);
    if (!document.querySelector('link[href*="maptiler-sdk.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://cdn.maptiler.com/maptiler-sdk-js/latest/maptiler-sdk.css";
      document.head.appendChild(link);
    }
    if (!document.querySelector('script[src*="maptiler-sdk.umd.min.js"]')) {
      const script = document.createElement("script");
      script.src = "https://cdn.maptiler.com/maptiler-sdk-js/latest/maptiler-sdk.umd.min.js";
      script.onload = () => {
        const check = setInterval(() => { if (window.maptilersdk) { clearInterval(check); resolve(window.maptilersdk); } }, 50);
        setTimeout(() => { clearInterval(check); reject(new Error("SDK timeout")); }, 10000);
      };
      script.onerror = reject;
      document.head.appendChild(script);
    } else {
      const check = setInterval(() => { if (window.maptilersdk) { clearInterval(check); resolve(window.maptilersdk); } }, 50);
      setTimeout(() => { clearInterval(check); reject(new Error("SDK timeout")); }, 10000);
    }
  });
  return sdkLoadPromise;
}

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

async function fetchElevation(lon, lat) {
  try {
    const res = await fetch(`https://api.maptiler.com/elevation/point?lon=${lon}&lat=${lat}&key=${MAPTILER_KEY}`);
    const data = await res.json();
    return data.elevation ?? null;
  } catch { return null; }
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
function ResortMapPlanner({ resort, initialRoute, onSave }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const geojsonRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [routePoints, setRoutePoints] = useState(initialRoute?.points || []);
  const [layers, setLayers] = useState({ slopes: true, lifts: true, liftStatus: true, terrain: true });
  const [stats, setStats] = useState(() => calcStats(initialRoute?.points || []));
  const [savedRoutes, setSavedRoutes] = useState([]);
  const routeRef = useRef([]);

  const lat = resort?.lat;
  const lng = resort?.lng;

  useEffect(() => { routeRef.current = routePoints; }, [routePoints]);

  const updateMapSources = useCallback((points) => {
    const map = mapInstance.current;
    if (!map) return;
    const lineSrc = map.getSource("route-line");
    const ptSrc = map.getSource("route-points");
    if (points.length >= 2 && lineSrc) {
      lineSrc.setData({ type: "FeatureCollection", features: [{ type: "Feature", geometry: { type: "LineString", coordinates: points.map(p => p.lngLat) }, properties: {} }] });
    } else if (lineSrc) { lineSrc.setData(EMPTY_FC); }
    if (ptSrc) {
      ptSrc.setData({ type: "FeatureCollection", features: points.map((p, i) => ({ type: "Feature", geometry: { type: "Point", coordinates: p.lngLat }, properties: { pointIndex: i + 1, type: p.type, id: p.id } })) });
    }
  }, []);

  useEffect(() => { updateMapSources(routePoints); setStats(calcStats(routePoints)); }, [routePoints, updateMapSources]);

  useEffect(() => {
    const map = mapInstance.current;
    if (!map || loading) return;
    const pisteIds = ["pistes-black", "pistes-red", "pistes-blue", "pistes-green", "piste-labels"];
    const liftIds = ["lifts-line", "lifts-label"];
    pisteIds.forEach(lid => { if (map.getLayer(lid)) map.setLayoutProperty(lid, "visibility", layers.slopes ? "visible" : "none"); });
    liftIds.forEach(lid => { if (map.getLayer(lid)) map.setLayoutProperty(lid, "visibility", layers.lifts ? "visible" : "none"); });
    try { map.setTerrain(layers.terrain ? { exaggeration: 1.5 } : { exaggeration: 0 }); } catch {}
  }, [layers, loading]);

  useEffect(() => {
    if (!lat || !lng || !mapRef.current) { setLoading(false); return; }
    let map = null, unmounted = false;

    loadSDK().then(sdk => {
      if (unmounted || !mapRef.current) return;
      sdk.config.apiKey = MAPTILER_KEY;
      map = new sdk.Map({
        container: mapRef.current, style: STYLE_URL,
        center: [lng, lat], zoom: 13, pitch: 55, bearing: 0,
        terrain: true, terrainExaggeration: 1.5,
        scrollZoom: true, dragRotate: true, touchZoomRotate: true,
        attributionControl: false,
      });
      map.addControl(new sdk.NavigationControl({ showCompass: true, showZoom: true, visualizePitch: true }), "bottom-right");
      map.addControl(new sdk.ScaleControl({ unit: "metric" }), "bottom-left");

      map.on("load", async () => {
        if (unmounted) return;
        map.addSource("route-line", { type: "geojson", data: EMPTY_FC });
        map.addSource("route-points", { type: "geojson", data: EMPTY_FC });
        map.addLayer({ id: "route-line", type: "line", source: "route-line", paint: { "line-color": "#FB343D", "line-width": 4, "line-opacity": 1, "line-cap": "round", "line-join": "round" } });
        map.addLayer({ id: "route-points-circle", type: "circle", source: "route-points", paint: { "circle-radius": 8, "circle-color": "#FB343D", "circle-stroke-width": 2, "circle-stroke-color": "#ffffff" } });
        map.addLayer({ id: "route-labels", type: "symbol", source: "route-points", layout: { "text-field": ["get", "pointIndex"], "text-size": 10, "text-anchor": "center", "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"] }, paint: { "text-color": "#ffffff" } });

        const pad = 0.08;
        const S = lat - pad, N = lat + pad, W = lng - pad, E = lng + pad;
        const query = `[out:json][timeout:15];(way["piste:type"="downhill"](${S},${W},${N},${E});way["piste:type"="nordic"](${S},${W},${N},${E});way["aerialway"](${S},${W},${N},${E});relation["piste:type"="downhill"](${S},${W},${N},${E}););out body;>;out skel qt;`;
        try {
          const controller = new AbortController();
          setTimeout(() => controller.abort(), 15000);
          const res = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`, { signal: controller.signal });
          const data = await res.json();
          if (unmounted) return;
          const geojson = overpassToGeoJSON(data);
          geojsonRef.current = geojson;
          map.addSource("openski-data", { type: "geojson", data: geojson });
          [
            { id: "pistes-black", difficulty: "expert", color: "#1a1a2e", width: 3.5 },
            { id: "pistes-red", difficulty: "advanced", color: "#e63946", width: 3 },
            { id: "pistes-blue", difficulty: "intermediate", color: "#3894E3", width: 3 },
            { id: "pistes-green", difficulty: ["easy", "novice"], color: "#2d6a4f", width: 3 },
          ].forEach(({ id: lid, difficulty, color, width }) => {
            const filter = Array.isArray(difficulty) ? ["in", ["get", "piste:difficulty"], ["literal", difficulty]] : ["==", ["get", "piste:difficulty"], difficulty];
            map.addLayer({ id: lid, type: "line", source: "openski-data", filter, paint: { "line-color": color, "line-width": width, "line-opacity": 0.9 } });
          });
          map.addLayer({ id: "piste-labels", type: "symbol", source: "openski-data", filter: ["has", "name"], layout: { "text-field": ["get", "name"], "text-size": 11, "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"] }, paint: { "text-color": "#ffffff", "text-halo-color": "#1a1a2e", "text-halo-width": 1.5 } });
          map.addLayer({ id: "lifts-line", type: "line", source: "openski-data", filter: ["has", "aerialway"], paint: { "line-color": "#FB343D", "line-width": 2, "line-opacity": 0.85, "line-dasharray": [2, 1] } });
          map.addLayer({ id: "lifts-label", type: "symbol", source: "openski-data", filter: ["all", ["has", "aerialway"], ["has", "name"]], layout: { "text-field": ["get", "name"], "text-size": 10, "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"] }, paint: { "text-color": "#FB343D", "text-halo-color": "#ffffff", "text-halo-width": 1.5 } });
        } catch {}

        map.on("click", async e => {
          const { lngLat } = e;
          let coord = [lngLat.lng, lngLat.lat];
          let snapName = null;
          const gj = geojsonRef.current;
          if (gj) {
            let bestDist = Infinity, bestPt = null, bestPisteName = null;
            gj.features.forEach(f => {
              if (f.properties["piste:type"] && f.geometry.type === "LineString") {
                const { point, dist } = nearestPointOnLine(coord, f.geometry.coordinates);
                if (dist < 50 && dist < bestDist) { bestDist = dist; bestPt = point; bestPisteName = f.properties.name || null; }
              }
            });
            if (bestPt) { coord = bestPt; snapName = bestPisteName; }
          }
          const pts = routeRef.current;
          const idx = pts.length;
          const elevation = await fetchElevation(coord[0], coord[1]);
          const newPt = { id: Date.now(), lngLat: coord, name: snapName || `Point ${idx + 1}`, elevation, type: idx === 0 ? "start" : "waypoint" };
          setRoutePoints(prev => [...prev, newPt]);
        });

        if (initialRoute?.points?.length) updateMapSources(initialRoute.points);
        if (!unmounted) setLoading(false);
      });

      mapInstance.current = map;
    }).catch(() => { if (!unmounted) setLoading(false); });

    return () => {
      unmounted = true;
      if (mapInstance.current) { mapInstance.current.remove(); mapInstance.current = null; }
    };
  }, [lat, lng]);

  function handleSave() {
    if (routePoints.length < 2 || !resort) return;
    const route = {
      id: Date.now(), name: `My route at ${resort.name}`,
      resortId: resort.id, resortName: resort.name,
      points: routePoints, stats, createdAt: new Date().toISOString(),
    };
    onSave(route);
  }

  return (
    <div className="rounded-2xl overflow-hidden border border-white/5" style={{ height: 520 }}>
      {/* Mini header */}
      <div className="h-12 bg-peak-surface border-b border-white/5 flex items-center px-4 gap-3 flex-shrink-0">
        <Map className="h-4 w-4 text-peak-blue flex-shrink-0" />
        <span className="font-bold text-peak-text text-sm">{resort.name}</span>
        <span className="text-peak-text-secondary text-xs ml-1">{stats.distanceKm} km · {stats.totalDescent} m descent</span>
        <button onClick={handleSave} disabled={routePoints.length < 2}
          className="ml-auto bg-peak-red text-white px-3 py-1.5 rounded-lg text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-opacity">
          Save route
        </button>
      </div>

      {/* Map + panels */}
      <div className="flex" style={{ height: "calc(520px - 48px)" }}>
        {/* Left panel */}
        <div className="w-64 flex-shrink-0 bg-peak-surface border-r border-white/5 overflow-y-auto hidden lg:block">
          <LeftPanel
            routePoints={routePoints} layers={layers} setLayers={setLayers}
            onDelete={id => setRoutePoints(prev => prev.filter(p => p.id !== id))}
            onRename={(id, name) => setRoutePoints(prev => prev.map(p => p.id === id ? { ...p, name } : p))}
            onTypeChange={(id, type) => setRoutePoints(prev => prev.map(p => p.id === id ? { ...p, type } : p))}
            onClear={() => setRoutePoints([])}
            onReverse={() => setRoutePoints(prev => [...prev].reverse())}
            onReorder={setRoutePoints}
            savedRoutes={savedRoutes}
            onLoadRoute={r => setRoutePoints(r.points)}
          />
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          {loading && (
            <div className="absolute inset-0 z-10 bg-peak-surface flex flex-col items-center justify-center gap-2">
              <Mountain className="h-8 w-8 text-peak-text-secondary/40 animate-pulse" />
              <p className="text-peak-text-secondary text-xs">Loading terrain...</p>
            </div>
          )}
          <div ref={mapRef} className="absolute inset-0" />
        </div>

        {/* Right panel */}
        <div className="w-56 flex-shrink-0 bg-peak-surface/90 border-l border-white/5 overflow-y-auto hidden lg:block">
          <RightPanel stats={stats} routePoints={routePoints} resortId={resort.id} routeName={`My route at ${resort.name}`} />
        </div>
      </div>
    </div>
  );
}

// ── Main landing ─────────────────────────────────────────────────────────────
export default function RoutePlannerLanding() {
  const { user } = useAppAuth();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedResort, setSelectedResort] = useState(null);
  const [initialRoute, setInitialRoute] = useState(null);
  const [savedRoutes, setSavedRoutes] = useState([]);
  const inputRef = useRef(null);

  // Load saved routes
  useEffect(() => {
    const routes = retrieve(KEYS.ROUTES, user?.id, []);
    setSavedRoutes(routes);
  }, [user?.id]);

  function persistRoutes(routes) {
    persist(KEYS.ROUTES, routes, user?.id);
    setSavedRoutes(routes);
  }

  function handleQueryChange(e) {
    const val = e.target.value;
    setQuery(val);
    if (val.trim().length > 0) {
      const results = searchDestinations(val).filter(r => r.type === "resort");
      setSuggestions(results);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }

  function handleSelectResort(item) {
    const resort = getResortById(item.id);
    setSelectedResort(resort);
    setInitialRoute(null);
    setQuery(item.label);
    setShowSuggestions(false);
  }

  function handleSaveRoute(route) {
    const updated = [route, ...savedRoutes];
    persistRoutes(updated);
  }

  function handleDeleteRoute(routeId) {
    persistRoutes(savedRoutes.filter(r => r.id !== routeId));
  }

  function handleOpenRoute(route) {
    const resort = getResortById(route.resortId);
    if (!resort) return;
    setSelectedResort(resort);
    setInitialRoute(route);
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
          onClick={() => { setSelectedResort(null); setInitialRoute(null); setQuery(""); inputRef.current?.focus(); }}
          className="bg-peak-red text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-peak-red-hover transition-colors">
          <Plus className="h-4 w-4" />
          New route
        </button>
      </div>

      {/* Resort search */}
      <div className="bg-peak-surface border border-white/10 rounded-2xl px-5 py-4 mb-6 relative">
        <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5 text-peak-blue flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={handleQueryChange}
            onFocus={() => query.trim().length > 0 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            placeholder="Search for a resort to plan a route..."
            className="flex-1 bg-transparent text-peak-text text-sm outline-none placeholder-peak-text-secondary/50"
          />
          {query && (
            <button onClick={() => { setQuery(""); setSelectedResort(null); setInitialRoute(null); setSuggestions([]); }} className="text-peak-text-secondary hover:text-peak-text text-lg leading-none">×</button>
          )}
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-1 z-50 bg-peak-card border border-white/10 rounded-xl overflow-hidden shadow-2xl">
            {suggestions.map(item => (
              <button key={item.id} onMouseDown={() => handleSelectResort(item)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-peak-surface transition-colors text-left">
                <span className="text-lg">{item.flag || "🏔️"}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-peak-text text-sm font-medium truncate">{item.label}</p>
                  <p className="text-peak-text-secondary text-xs truncate">{item.sublabel}</p>
                </div>
                {item.pisteKm && <span className="text-peak-text-secondary text-xs flex-shrink-0">{item.pisteKm} km</span>}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Embedded planner */}
      {selectedResort && (
        <div className="mb-8">
          <ResortMapPlanner
            resort={selectedResort}
            initialRoute={initialRoute}
            onSave={handleSaveRoute}
          />
        </div>
      )}

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