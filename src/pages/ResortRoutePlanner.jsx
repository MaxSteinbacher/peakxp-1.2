import { useEffect, useRef, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Mountain, List, BarChart2 } from "lucide-react";
import { getResortById } from "../lib/data";
import LeftPanel from "../components/route/LeftPanel";
import RightPanel from "../components/route/RightPanel";

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
      if (diff > 0) descent += diff;
      else ascent += Math.abs(diff);
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

const EMPTY_FC = { type: "FeatureCollection", features: [] };

export default function ResortRoutePlanner() {
  const { id } = useParams();
  const resort = getResortById(id);
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const geojsonRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [routePoints, setRoutePoints] = useState([]);
  const [layers, setLayers] = useState({ slopes: true, lifts: true, liftStatus: true, terrain: true });
  const [stats, setStats] = useState({ distanceKm: "0.0", totalDescent: 0, totalAscent: 0, estimatedMinutes: 0 });
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const [savedRoutes, setSavedRoutes] = useState([]);
  const routeRef = useRef([]);

  const lat = resort?.lat;
  const lng = resort?.lng;

  useEffect(() => { routeRef.current = routePoints; }, [routePoints]);

  useEffect(() => {
    if (!id) return;
    try {
      const raw = localStorage.getItem(`routes:${id}`);
      if (raw) setSavedRoutes(JSON.parse(raw));
    } catch {}
  }, [id]);

  const updateMapSources = useCallback((points) => {
    const map = mapInstance.current;
    if (!map) return;
    const lineSrc = map.getSource("route-line");
    const ptSrc = map.getSource("route-points");
    if (points.length >= 2 && lineSrc) {
      lineSrc.setData({ type: "FeatureCollection", features: [{ type: "Feature", geometry: { type: "LineString", coordinates: points.map(p => p.lngLat) }, properties: {} }] });
    } else if (lineSrc) {
      lineSrc.setData(EMPTY_FC);
    }
    if (ptSrc) {
      ptSrc.setData({ type: "FeatureCollection", features: points.map((p, i) => ({ type: "Feature", geometry: { type: "Point", coordinates: p.lngLat }, properties: { pointIndex: i + 1, type: p.type, id: p.id } })) });
    }
  }, []);

  useEffect(() => {
    updateMapSources(routePoints);
    setStats(calcStats(routePoints));
  }, [routePoints, updateMapSources]);

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
    if (!lat || !lng || (lat === 0 && lng === 0) || !mapRef.current) { setLoading(false); return; }
    let map = null, unmounted = false;

    loadSDK().then(sdk => {
      if (unmounted || !mapRef.current) return;
      sdk.config.apiKey = MAPTILER_KEY;

      map = new sdk.Map({
        container: mapRef.current,
        style: STYLE_URL,
        center: [lng, lat],
        zoom: 13,
        pitch: 55,
        bearing: 0,
        terrain: true,
        terrainExaggeration: 1.5,
        scrollZoom: true,
        dragRotate: true,
        touchZoomRotate: true,
        keyboard: true,
        attributionControl: false,
      });

      map.addControl(new sdk.NavigationControl({ showCompass: true, showZoom: true, visualizePitch: true }), "bottom-right");
      map.addControl(new sdk.ScaleControl({ unit: "metric" }), "bottom-left");
      map.addControl(new sdk.FullscreenControl(), "top-right");

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
            const filter = Array.isArray(difficulty)
              ? ["in", ["get", "piste:difficulty"], ["literal", difficulty]]
              : ["==", ["get", "piste:difficulty"], difficulty];
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
          const type = idx === 0 ? "start" : "waypoint";
          const elevation = await fetchElevation(coord[0], coord[1]);
          const newPt = { id: Date.now(), lngLat: coord, name: snapName || `Point ${idx + 1}`, elevation, type };
          setRoutePoints(prev => [...prev, newPt]);
        });

        if (!unmounted) setLoading(false);
      });

      mapInstance.current = map;
    }).catch(() => { if (!unmounted) setLoading(false); });

    return () => {
      unmounted = true;
      if (mapInstance.current) { mapInstance.current.remove(); mapInstance.current = null; }
    };
  }, [lat, lng]);

  useEffect(() => {
    function handleAddToRoute(e) {
      sessionStorage.setItem("pendingRoute", JSON.stringify(e.detail));
    }
    window.addEventListener("addToRoute", handleAddToRoute);
    return () => window.removeEventListener("addToRoute", handleAddToRoute);
  }, []);

  function handleDelete(ptId) { setRoutePoints(prev => prev.filter(p => p.id !== ptId)); }
  function handleRename(ptId, name) { setRoutePoints(prev => prev.map(p => p.id === ptId ? { ...p, name } : p)); }
  function handleTypeChange(ptId, type) { setRoutePoints(prev => prev.map(p => p.id === ptId ? { ...p, type } : p)); }
  function handleClear() { setRoutePoints([]); }
  function handleReverse() { setRoutePoints(prev => [...prev].reverse()); }
  function handleReorder(newArr) { setRoutePoints(newArr); }

  function handleSave() {
    if (routePoints.length < 2 || !resort) return;
    const route = { id: Date.now(), name: `My route at ${resort.name}`, resortId: resort.id, resortName: resort.name, points: routePoints, stats, createdAt: new Date().toISOString() };
    const updated = [route, ...savedRoutes];
    localStorage.setItem(`routes:${id}`, JSON.stringify(updated));
    setSavedRoutes(updated);
  }

  function handleLoadRoute(route) { setRoutePoints(route.points); }

  if (!resort) {
    return (
      <div className="min-h-screen bg-peak-bg flex items-center justify-center">
        <p className="text-peak-text-secondary">Resort not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-peak-bg flex flex-col">
      {/* Header */}
      <div className="h-14 bg-peak-surface border-b border-white/5 flex items-center px-4 gap-4 flex-shrink-0 z-30 relative">
        <Link to={`/resort/${id}`} className="flex items-center gap-1.5 text-peak-text-secondary hover:text-peak-text transition-colors text-sm flex-shrink-0">
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">{resort.name}</span>
        </Link>
        <div className="w-px h-5 bg-white/10 hidden sm:block" />
        <span className="font-display font-bold text-peak-text text-lg hidden sm:block">Route Planner</span>
        <div className="flex items-center gap-3 ml-auto text-sm">
          <span className="text-peak-text-secondary hidden md:block">{stats.distanceKm} km</span>
          <span className="text-peak-text-secondary hidden md:block">{stats.totalDescent.toLocaleString()} m</span>
          <span className="text-peak-text-secondary hidden md:block">~{stats.estimatedMinutes} min</span>
          <button onClick={handleSave} disabled={routePoints.length < 2} className="bg-peak-red text-white px-4 py-1.5 rounded-lg text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed transition-opacity">
            Save route
          </button>
        </div>
      </div>

      {/* Main area */}
      <div className="flex-1 relative overflow-hidden">
        {loading && (
          <div className="absolute inset-0 z-40 bg-peak-surface flex flex-col items-center justify-center gap-3">
            <Mountain className="h-12 w-12 text-peak-text-secondary/40 animate-pulse" />
            <p className="text-peak-text-secondary text-sm">Loading 3D terrain...</p>
          </div>
        )}

        <div ref={mapRef} className="absolute inset-0" />

        {/* Left panel desktop */}
        <div className="absolute left-0 top-0 bottom-0 w-72 bg-peak-surface border-r border-white/5 z-20 hidden lg:flex flex-col overflow-hidden">
          <LeftPanel routePoints={routePoints} layers={layers} setLayers={setLayers} onDelete={handleDelete} onRename={handleRename} onTypeChange={handleTypeChange} onClear={handleClear} onReverse={handleReverse} onReorder={handleReorder} savedRoutes={savedRoutes} onLoadRoute={handleLoadRoute} />
        </div>

        {/* Right panel desktop */}
        <div className="absolute right-0 top-0 bottom-0 w-64 bg-peak-surface/90 backdrop-blur-sm border-l border-white/5 z-20 hidden lg:flex flex-col overflow-hidden">
          <RightPanel stats={stats} routePoints={routePoints} resortId={id} routeName={`My route at ${resort.name}`} />
        </div>

        {/* Mobile FABs */}
        <div className="lg:hidden">
          <button onClick={() => setLeftOpen(o => !o)} className="absolute bottom-20 left-4 z-30 bg-peak-surface border border-white/10 rounded-full p-3 shadow-lg">
            <List className="h-5 w-5 text-peak-text" />
          </button>
          <button onClick={() => setRightOpen(o => !o)} className="absolute bottom-20 right-4 z-30 bg-peak-surface border border-white/10 rounded-full p-3 shadow-lg">
            <BarChart2 className="h-5 w-5 text-peak-text" />
          </button>
        </div>

        {/* Mobile left sheet */}
        {leftOpen && (
          <div className="lg:hidden absolute inset-0 z-40 flex">
            <div className="w-80 max-w-[85vw] bg-peak-surface h-full flex flex-col overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between p-4 border-b border-white/5">
                <span className="font-bold text-peak-text text-sm">Route and Layers</span>
                <button onClick={() => setLeftOpen(false)} className="text-peak-text-secondary hover:text-peak-text text-lg leading-none">x</button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <LeftPanel routePoints={routePoints} layers={layers} setLayers={setLayers} onDelete={handleDelete} onRename={handleRename} onTypeChange={handleTypeChange} onClear={handleClear} onReverse={handleReverse} onReorder={handleReorder} savedRoutes={savedRoutes} onLoadRoute={handleLoadRoute} />
              </div>
            </div>
            <div className="flex-1" onClick={() => setLeftOpen(false)} />
          </div>
        )}

        {/* Mobile right sheet */}
        {rightOpen && (
          <div className="lg:hidden absolute inset-0 z-40 flex justify-end">
            <div className="flex-1" onClick={() => setRightOpen(false)} />
            <div className="w-72 max-w-[85vw] bg-peak-surface h-full flex flex-col overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between p-4 border-b border-white/5">
                <span className="font-bold text-peak-text text-sm">Route Stats</span>
                <button onClick={() => setRightOpen(false)} className="text-peak-text-secondary hover:text-peak-text text-lg leading-none">x</button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <RightPanel stats={stats} routePoints={routePoints} resortId={id} routeName={`My route at ${resort.name}`} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}