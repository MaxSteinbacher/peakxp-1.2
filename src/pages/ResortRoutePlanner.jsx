import { useEffect, useRef, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, List, BarChart2 } from "lucide-react";
import { getResortById } from "../lib/data";
import LeftPanel from "../components/route/LeftPanel";
import RightPanel from "../components/route/RightPanel";

const MAPTILER_KEY = "lNsV1pOMdNShmVL9tiih";
const MAP_STYLE = `https://api.maptiler.com/maps/019c8160-59cd-7579-afc6-753ee61bd724/style.json?key=${MAPTILER_KEY}`;

const ROUTE_MODES = [
  { key: "fastest", label: "Fastest", icon: "⚡", desc: "Shortest path A to B" },
  { key: "easy_only", label: "Easy only", icon: "🟢", desc: "Blue & green runs only" },
  { key: "variety", label: "Best variety", icon: "🎿", desc: "Mix of difficulty levels" },
  { key: "scenic", label: "Most scenic", icon: "🏔️", desc: "Longest, most scenic" },
];

const EMPTY_FC = { type: "FeatureCollection", features: [] };

function haversineKm(a, b) {
  const R = 6371;
  const dLat = (b[1] - a[1]) * Math.PI / 180;
  const dLon = (b[0] - a[0]) * Math.PI / 180;
  const s = Math.sin(dLat/2)**2 + Math.cos(a[1]*Math.PI/180)*Math.cos(b[1]*Math.PI/180)*Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1-s));
}

function calcStats(points, pathCoords) {
  if (points.length < 2) return { distanceKm: "0.0", totalDescent: 0, totalAscent: 0, estimatedMinutes: 0 };
  let dist = 0;
  const coords = (pathCoords && pathCoords.length >= 2) ? pathCoords : points.map(p => p.lngLat);
  for (let i = 1; i < coords.length; i++) dist += haversineKm(coords[i-1], coords[i]);
  let descent = 0, ascent = 0;
  for (let i = 1; i < points.length; i++) {
    if (points[i].elevation != null && points[i-1].elevation != null) {
      const diff = points[i-1].elevation - points[i].elevation;
      if (diff > 0) descent += diff; else ascent += Math.abs(diff);
    }
  }
  return { distanceKm: dist.toFixed(1), totalDescent: Math.round(descent), totalAscent: Math.round(ascent), estimatedMinutes: Math.round(dist / 30 * 60) };
}

function nearestPointOnFeatures(coord, features) {
  let best = null, bestDist = Infinity;
  features.forEach(f => {
    if (f.geometry.type !== "LineString") return;
    f.geometry.coordinates.forEach(c => {
      const d = Math.hypot(c[0]-coord[0], c[1]-coord[1]) * 111000;
      if (d < bestDist) { bestDist = d; best = c; }
    });
  });
  return { point: best, dist: bestDist };
}

async function fetchElevation(lon, lat) {
  try {
    const res = await fetch(`https://api.maptiler.com/elevation/point?lon=${lon}&lat=${lat}&key=${MAPTILER_KEY}`);
    const data = await res.json();
    return data.elevation ?? null;
  } catch { return null; }
}

// ─── Piste graph router ────────────────────────────────────────────────────
// Grid-snapped node keys so nearby coords share the same bucket
function gridKey(lon, lat, res = 10000) {
  return `${Math.round(lon * res)},${Math.round(lat * res)}`;
}

function buildPisteGraph(features) {
  // Two-pass: first collect all coords, then merge nearby nodes via grid
  const coordGrid = new Map(); // gridKey → nodeIdx
  const nodeCoords = [];       // nodeIdx → [lon, lat]
  const edges = [];

  function getNode(c) {
    const k = gridKey(c[0], c[1]);
    if (!coordGrid.has(k)) {
      coordGrid.set(k, nodeCoords.length);
      nodeCoords.push(c);
    }
    return coordGrid.get(k);
  }

  features.forEach(f => {
    if (f.geometry.type !== "LineString") return;
    const isLift = !!f.properties["aerialway"];
    const isPiste = !!f.properties["piste:type"];
    if (!isLift && !isPiste) return;

    const diff = f.properties["piste:difficulty"] || "intermediate";
    const WEIGHT = { easy: 1, novice: 1, beginner: 1, intermediate: 1.4, advanced: 2, expert: 3 };
    const w = isLift ? 0.5 : (WEIGHT[diff] ?? 1.4);

    const coords = f.geometry.coordinates;
    for (let i = 0; i < coords.length - 1; i++) {
      const a = getNode(coords[i]);
      const b = getNode(coords[i + 1]);
      if (a === b) continue;
      const d = haversineKm(coords[i], coords[i + 1]);
      const segCoords = [coords[i], coords[i + 1]];
      edges.push({ from: a, to: b, dist: d * w, segCoords });
      // Add reverse edge: lifts go both ways; pistes also added in reverse
      // with higher cost (going uphill on piste = almost impossible but keep connected)
      edges.push({ from: b, to: a, dist: d * (isLift ? w : w * 8), segCoords: [coords[i+1], coords[i]] });
    }
  });

  const adj = new Map();
  edges.forEach((e, idx) => {
    if (!adj.has(e.from)) adj.set(e.from, []);
    adj.get(e.from).push({ to: e.to, dist: e.dist, idx });
  });

  return { nodeCoords, edges, adj };
}

function dijkstra(graph, startCoord, endCoord) {
  const { nodeCoords, edges, adj } = graph;
  if (!nodeCoords.length) return null;

  // Snap click coords to nearest node
  function nearest(coord) {
    let best = -1, bestD = Infinity;
    for (let i = 0; i < nodeCoords.length; i++) {
      const d = haversineKm(coord, nodeCoords[i]);
      if (d < bestD) { bestD = d; best = i; }
    }
    return { idx: best, dist: bestD };
  }

  const { idx: S, dist: dS } = nearest(startCoord);
  const { idx: E, dist: dE } = nearest(endCoord);
  if (S < 0 || E < 0 || dS > 2.0 || dE > 2.0) return null; // >2km from any piste

  if (S === E) return [startCoord, endCoord];

  const distArr = new Float64Array(nodeCoords.length).fill(Infinity);
  distArr[S] = 0;
  const prevNode = new Int32Array(nodeCoords.length).fill(-1);
  const prevEdgeIdx = new Int32Array(nodeCoords.length).fill(-1);
  const visited = new Uint8Array(nodeCoords.length);

  // Min-heap via sorted array (sufficient for ~5k nodes)
  // Simple binary min-heap — much faster than pq.sort for large graphs
  const heap = [[0, S]];
  function heapPush(item) {
    heap.push(item);
    let i = heap.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (heap[p][0] <= heap[i][0]) break;
      [heap[p], heap[i]] = [heap[i], heap[p]]; i = p;
    }
  }
  function heapPop() {
    const top = heap[0]; const last = heap.pop();
    if (heap.length) { heap[0] = last; let i = 0;
      while (true) { let s = i, l = 2*i+1, r = 2*i+2;
        if (l < heap.length && heap[l][0] < heap[s][0]) s = l;
        if (r < heap.length && heap[r][0] < heap[s][0]) s = r;
        if (s === i) break; [heap[i], heap[s]] = [heap[s], heap[i]]; i = s; } }
    return top;
  }

  while (heap.length) {
    const [d, u] = heapPop();
    if (visited[u]) continue;
    visited[u] = 1;
    if (u === E) break;
    for (const { to, dist: w, idx } of (adj.get(u) || [])) {
      const nd = d + w;
      if (nd < distArr[to]) {
        distArr[to] = nd;
        prevNode[to] = u;
        prevEdgeIdx[to] = idx;
        heapPush([nd, to]);
      }
    }
  }

  if (prevNode[E] === -1) return null;

  // Reconstruct
  const edgePath = [];
  let cur = E;
  while (prevEdgeIdx[cur] !== -1) {
    edgePath.unshift(prevEdgeIdx[cur]);
    cur = prevNode[cur];
    if (cur === S) break;
  }

  const path = [];
  edgePath.forEach(ei => {
    const seg = edges[ei].segCoords;
    if (!path.length) path.push(...seg);
    else path.push(seg[1]);
  });

  return path.length >= 2 ? path : null;
}

function routeAlongPistes(start, end, geojson) {
  if (!geojson?.features?.length) return null;
  try {
    const graph = buildPisteGraph(geojson.features);
    return dijkstra(graph, start, end);
  } catch (e) {
    console.warn("Routing error:", e);
    return null;
  }
}

function overpassToGeoJSON(data) {
  const nodes = {};
  data.elements.forEach(el => { if (el.type === "node") nodes[el.id] = [el.lon, el.lat]; });
  const features = [];
  data.elements.forEach(el => {
    if (el.type === "way" && el.nodes) {
      const coords = el.nodes.map(n => nodes[n]).filter(Boolean);
      if (coords.length >= 2) features.push({ type: "Feature", geometry: { type: "LineString", coordinates: coords }, properties: { ...el.tags } });
    }
  });
  return { type: "FeatureCollection", features };
}

export default function ResortRoutePlanner() {
  const { id } = useParams();
  const resort = getResortById(id);
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const geojsonRef = useRef(null);
  const routeRef = useRef([]);
  const pathRef = useRef([]);
  const routeModeRef = useRef("fastest");

  const [mapLoaded, setMapLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [routePoints, setRoutePoints] = useState([]);
  const [routePathCoords, setRoutePathCoords] = useState([]);
  const [routeMode, setRouteMode] = useState("fastest");
  const [stats, setStats] = useState({ distanceKm: "0.0", totalDescent: 0, totalAscent: 0, estimatedMinutes: 0 });
  const [savedRoutes, setSavedRoutes] = useState([]);
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const [undoStack, setUndoStack] = useState([]); // stack of {points, path} snapshots

  useEffect(() => { routeRef.current = routePoints; }, [routePoints]);
  useEffect(() => { routeModeRef.current = routeMode; }, [routeMode]);
  useEffect(() => { pathRef.current = routePathCoords; }, [routePathCoords]);

  // Load saved routes
  useEffect(() => {
    if (!id) return;
    try { const raw = localStorage.getItem(`routes:${id}`); if (raw) setSavedRoutes(JSON.parse(raw)); } catch {}
  }, [id]);


  // Re-route when mode changes
  useEffect(() => {
    const pts = routeRef.current;
    if (pts.length < 2 || !geojsonRef.current) return;
    (() => {
      let combined = [];
      for (let i = 0; i < pts.length - 1; i++) {
        const seg = routeAlongPistes(pts[i].lngLat, pts[i+1].lngLat, geojsonRef.current);
        if (seg) combined = combined.concat(seg);
        else combined = combined.concat([pts[i].lngLat, pts[i+1].lngLat]);
      }
      setRoutePathCoords(combined);
      const lineSrc = mapInstance.current?.getSource("route-line");
      if (lineSrc && combined.length >= 2) {
        lineSrc.setData({ type: "FeatureCollection", features: [{ type: "Feature", geometry: { type: "LineString", coordinates: combined }, properties: {} }] });
      }
    })();
  }, [routeMode]);

  // Stats update
  useEffect(() => {
    setStats(calcStats(routePoints, routePathCoords));
  }, [routePoints, routePathCoords]);

  // ── Map initialization — same pattern as TrackingRecord ──────────────────
  useEffect(() => {
    if (!resort?.lat || !resort?.lng) { setLoading(false); return; }
    const lat = resort.lat, lng = resort.lng;
    let unmounted = false;

    const script = document.createElement("script");
    script.src = "https://cdn.maptiler.com/maptiler-sdk-js/v2.2.0/maptiler-sdk.umd.min.js";
    script.onload = () => {
      if (unmounted) return;
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://cdn.maptiler.com/maptiler-sdk-js/v2.2.0/maptiler-sdk.css";
      document.head.appendChild(link);

      const sdk = window.maptilersdk;
      sdk.config.apiKey = MAPTILER_KEY;

      const map = new sdk.Map({
        container: mapRef.current,
        style: MAP_STYLE,
        center: [lng, lat],
        zoom: 13,
        pitch: 55,
        bearing: 0,
        terrain: { source: "terrain", exaggeration: 1.5 },
      });

      map.addControl(new sdk.NavigationControl({ showCompass: true, showZoom: true, visualizePitch: true }), "bottom-right");
      map.addControl(new sdk.ScaleControl({ unit: "metric" }), "bottom-left");

      map.on("load", async () => {
        if (unmounted) return;

        // Route drawing sources
        map.addSource("route-line", { type: "geojson", data: EMPTY_FC });
        map.addSource("route-points", { type: "geojson", data: EMPTY_FC });
        map.addLayer({ id: "route-line", type: "line", source: "route-line", paint: { "line-color": "#FB343D", "line-width": 4, "line-opacity": 1 }, layout: { "line-cap": "round", "line-join": "round" } });
        map.addLayer({ id: "route-points-circle", type: "circle", source: "route-points", paint: { "circle-radius": 8, "circle-color": "#FB343D", "circle-stroke-width": 2, "circle-stroke-color": "#ffffff" } });
        map.addLayer({ id: "route-labels", type: "symbol", source: "route-points", layout: { "text-field": ["get", "pointIndex"], "text-size": 10, "text-anchor": "center", "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"] }, paint: { "text-color": "#ffffff" } });

        // Fetch piste data from Overpass
        const pad = 0.09;
        const [S, N, W, E] = [lat-pad, lat+pad, lng-pad, lng+pad];
        const query = `[out:json][timeout:20];(way["piste:type"="downhill"](${S},${W},${N},${E});way["piste:type"="nordic"](${S},${W},${N},${E});way["aerialway"](${S},${W},${N},${E}););out body;>;out skel qt;`;
        try {
          const ctrl = new AbortController();
          setTimeout(() => ctrl.abort(), 18000);
          const res = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`, { signal: ctrl.signal });
          const data = await res.json();
          if (unmounted) return;
          const geojson = overpassToGeoJSON(data);
          geojsonRef.current = geojson;
          map.addSource("openski-data", { type: "geojson", data: geojson });
          [
            { id: "pistes-black", difficulty: "expert", color: "#333", width: 4 },
            { id: "pistes-red", difficulty: "advanced", color: "#e63946", width: 3.5 },
            { id: "pistes-blue", difficulty: "intermediate", color: "#3894E3", width: 3.5 },
            { id: "pistes-green", difficulty: ["easy","novice"], color: "#2d6a4f", width: 3.5 },
          ].forEach(({ id: lid, difficulty, color, width }) => {
            const filter = Array.isArray(difficulty)
              ? ["in", ["get","piste:difficulty"], ["literal", difficulty]]
              : ["==", ["get","piste:difficulty"], difficulty];
            map.addLayer({ id: lid, type: "line", source: "openski-data", filter, paint: { "line-color": color, "line-width": width, "line-opacity": 0.9 } });
          });
          map.addLayer({ id: "piste-labels", type: "symbol", source: "openski-data", filter: ["has","name"], layout: { "text-field": ["get","name"], "text-size": 11, "text-font": ["Open Sans Bold","Arial Unicode MS Bold"] }, paint: { "text-color": "#ffffff", "text-halo-color": "#0a0a1a", "text-halo-width": 1.5 } });
          map.addLayer({ id: "lifts-line", type: "line", source: "openski-data", filter: ["has","aerialway"], paint: { "line-color": "#FB343D", "line-width": 2, "line-dasharray": [2,1], "line-opacity": 0.85 } });
          map.addLayer({ id: "lifts-label", type: "symbol", source: "openski-data", filter: ["all",["has","aerialway"],["has","name"]], layout: { "text-field": ["get","name"], "text-size": 10, "text-font": ["Open Sans Regular","Arial Unicode MS Regular"] }, paint: { "text-color": "#FB343D", "text-halo-color": "#ffffff", "text-halo-width": 1.5 } });
        } catch {}

        // Click handler — snap to piste + route
        map.on("click", async e => {
          if (unmounted) return;
          const { lngLat } = e;
          let coord = [lngLat.lng, lngLat.lat];
          let snapName = null;
          const gj = geojsonRef.current;
          if (gj) {
            const pisteOnly = gj.features.filter(f => f.properties["piste:type"]);
            const { point, dist } = nearestPointOnFeatures(coord, pisteOnly);
            if (point && dist < 60) { coord = point; snapName = pisteOnly.find(f => f.geometry.coordinates.includes(point))?.properties?.name || null; }
          }
          const elevation = await fetchElevation(coord[0], coord[1]);
          const prev = routeRef.current;
          const newPt = { id: Date.now(), lngLat: coord, name: snapName || `Point ${prev.length + 1}`, elevation, type: prev.length === 0 ? "start" : "waypoint" };
          const newPts = [...prev, newPt];
          // Save undo snapshot
          setUndoStack(stack => [...stack.slice(-20), { points: prev, path: pathRef.current }]);
          setRoutePoints(newPts);

          // Update point markers
          const ptSrc = map.getSource("route-points");
          if (ptSrc) ptSrc.setData({ type: "FeatureCollection", features: newPts.map((p, i) => ({ type: "Feature", geometry: { type: "Point", coordinates: p.lngLat }, properties: { pointIndex: i+1, type: p.type } })) });

          // Route from previous point to this one
          if (newPts.length >= 2) {
            const prev2 = newPts[newPts.length-2];
            const seg = routeAlongPistes(prev2.lngLat, coord, gj);
            const existing = pathRef.current;
            const combined = [...existing, ...(seg || [prev2.lngLat, coord])];
            setRoutePathCoords(combined);
            const lineSrc = map.getSource("route-line");
            if (lineSrc && combined.length >= 2) lineSrc.setData({ type: "FeatureCollection", features: [{ type: "Feature", geometry: { type: "LineString", coordinates: combined }, properties: {} }] });
          }
        });

        mapInstance.current = map;
        setMapLoaded(true);
        setLoading(false);
      });
    };
    script.onerror = () => setLoading(false);
    document.head.appendChild(script);

    return () => {
      unmounted = true;
      if (mapInstance.current) { try { mapInstance.current.remove(); } catch {} mapInstance.current = null; }
    };
  }, [resort?.id]);

  function handleDelete(ptId) {
    const newPts = routePoints.filter(p => p.id !== ptId);
    setRoutePoints(newPts);
    setRoutePathCoords([]);
    const lineSrc = mapInstance.current?.getSource("route-line");
    const ptSrc = mapInstance.current?.getSource("route-points");
    if (lineSrc) lineSrc.setData(EMPTY_FC);
    if (ptSrc) ptSrc.setData({ type: "FeatureCollection", features: newPts.map((p,i) => ({ type: "Feature", geometry: { type: "Point", coordinates: p.lngLat }, properties: { pointIndex: i+1, type: p.type } })) });
  }
  function handleRename(ptId, name) { setRoutePoints(prev => prev.map(p => p.id === ptId ? { ...p, name } : p)); }
  function handleTypeChange(ptId, type) { setRoutePoints(prev => prev.map(p => p.id === ptId ? { ...p, type } : p)); }
  function handleClear() {
    setRoutePoints([]); setRoutePathCoords([]);
    const lineSrc = mapInstance.current?.getSource("route-line");
    const ptSrc = mapInstance.current?.getSource("route-points");
    if (lineSrc) lineSrc.setData(EMPTY_FC);
    if (ptSrc) ptSrc.setData(EMPTY_FC);
  }
  function handleReverse() { setRoutePoints(prev => [...prev].reverse()); }
  function handleReorder(arr) { setRoutePoints(arr); }
  function handleUndo() {
    setUndoStack(stack => {
      if (!stack.length) return stack;
      const last = stack[stack.length - 1];
      const newStack = stack.slice(0, -1);
      setRoutePoints(last.points);
      setRoutePathCoords(last.path);
      const lineSrc = mapInstance.current?.getSource("route-line");
      const ptSrc = mapInstance.current?.getSource("route-points");
      if (lineSrc) lineSrc.setData(last.path.length >= 2
        ? { type: "FeatureCollection", features: [{ type: "Feature", geometry: { type: "LineString", coordinates: last.path }, properties: {} }] }
        : EMPTY_FC);
      if (ptSrc) ptSrc.setData({ type: "FeatureCollection", features: last.points.map((p,i) => ({ type: "Feature", geometry: { type: "Point", coordinates: p.lngLat }, properties: { pointIndex: i+1, type: p.type } })) });
      return newStack;
    });
  }

  function handleSave() {
    if (routePoints.length < 2 || !resort) return;
    const route = { id: Date.now(), name: `Route at ${resort.name}`, resortId: resort.id, resortName: resort.name, points: routePoints, pathCoords: routePathCoords, stats, createdAt: new Date().toISOString() };
    const updated = [route, ...savedRoutes];
    localStorage.setItem(`routes:${id}`, JSON.stringify(updated));
    setSavedRoutes(updated);
  }
  function handleLoadRoute(route) {
    setRoutePoints(route.points);
    const path = route.pathCoords || [];
    setRoutePathCoords(path);
    const lineSrc = mapInstance.current?.getSource("route-line");
    const ptSrc = mapInstance.current?.getSource("route-points");
    if (lineSrc && path.length >= 2) lineSrc.setData({ type: "FeatureCollection", features: [{ type: "Feature", geometry: { type: "LineString", coordinates: path }, properties: {} }] });
    if (ptSrc) ptSrc.setData({ type: "FeatureCollection", features: route.points.map((p,i) => ({ type: "Feature", geometry: { type: "Point", coordinates: p.lngLat }, properties: { pointIndex: i+1, type: p.type } })) });
  }

  if (!resort) return <div className="min-h-screen bg-peak-bg flex items-center justify-center"><p className="text-peak-text-secondary">Resort not found.</p></div>;

  return (
    <div style={{ height: "calc(100vh - 64px)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <div className="h-14 bg-peak-surface border-b border-white/5 flex items-center px-4 gap-4 flex-shrink-0 z-30">
        <Link to={`/resort/${id}`} className="flex items-center gap-1.5 text-peak-text-secondary hover:text-peak-text transition-colors text-sm">
          <ArrowLeft className="h-4 w-4" /><span className="hidden sm:inline">{resort.name}</span>
        </Link>
        <div className="w-px h-5 bg-white/10 hidden sm:block" />
        <span className="font-display font-bold text-peak-text text-lg hidden sm:block">Route Planner</span>
        <div className="flex items-center gap-3 ml-auto text-sm">
          <span className="text-peak-text-secondary hidden md:block">{stats.distanceKm} km</span>
          <span className="text-peak-text-secondary hidden md:block">{stats.totalDescent} m ↓</span>
          <span className="text-peak-text-secondary hidden md:block">~{stats.estimatedMinutes} min</span>
          <button onClick={handleSave} disabled={routePoints.length < 2} className="bg-peak-red text-white px-4 py-1.5 rounded-lg text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed">Save route</button>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden", minHeight: 0, position: "relative" }}>

        {/* Loading overlay */}
        {loading && (
          <div style={{ position: "absolute", inset: 0, zIndex: 50, background: "#070B1E", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
            <div style={{ fontSize: 36, animation: "pulse 2s infinite" }}>⛷️</div>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>Loading resort map…</p>
          </div>
        )}

        {/* Left panel */}
        <div className="w-60 flex-shrink-0 bg-peak-surface border-r border-white/5 overflow-y-auto hidden lg:block z-10">
          <LeftPanel routePoints={routePoints}
            onDelete={handleDelete} onRename={handleRename} onTypeChange={handleTypeChange}
            onClear={handleClear} onReverse={handleReverse} onReorder={handleReorder}
            savedRoutes={savedRoutes} onLoadRoute={handleLoadRoute}
            routeMode={routeMode} setRouteMode={setRouteMode} routeModes={ROUTE_MODES}
            onUndo={handleUndo} canUndo={undoStack.length > 0} />
        </div>

        {/* Map */}
        <div style={{ flex: 1, position: "relative", minWidth: 0, minHeight: 0 }}>
          <div ref={mapRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
        </div>

        {/* Right panel */}
        <div className="w-60 flex-shrink-0 bg-peak-surface/90 border-l border-white/5 overflow-y-auto hidden lg:block z-10">
          <RightPanel stats={stats} routePoints={routePoints} resortId={id} routeName={`Route at ${resort.name}`} />
        </div>

        {/* Mobile FABs */}
        <button onClick={() => setLeftOpen(o => !o)} className="lg:hidden absolute bottom-20 left-4 z-30 bg-peak-surface border border-white/10 rounded-full p-3 shadow-lg"><List className="h-5 w-5 text-peak-text" /></button>
        <button onClick={() => setRightOpen(o => !o)} className="lg:hidden absolute bottom-20 right-4 z-30 bg-peak-surface border border-white/10 rounded-full p-3 shadow-lg"><BarChart2 className="h-5 w-5 text-peak-text" /></button>

        {leftOpen && (
          <div className="lg:hidden absolute inset-0 z-40 flex">
            <div className="w-72 max-w-[85vw] bg-peak-surface h-full overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between p-4 border-b border-white/5">
                <span className="font-bold text-peak-text text-sm">Route & Layers</span>
                <button onClick={() => setLeftOpen(false)} className="text-peak-text-secondary text-xl leading-none">×</button>
              </div>
              <LeftPanel routePoints={routePoints} onDelete={handleDelete} onRename={handleRename} onTypeChange={handleTypeChange} onClear={handleClear} onReverse={handleReverse} onReorder={handleReorder} savedRoutes={savedRoutes} onLoadRoute={handleLoadRoute} routeMode={routeMode} setRouteMode={setRouteMode} routeModes={ROUTE_MODES} onUndo={handleUndo} canUndo={undoStack.length > 0} />
            </div>
            <div className="flex-1" onClick={() => setLeftOpen(false)} />
          </div>
        )}
        {rightOpen && (
          <div className="lg:hidden absolute inset-0 z-40 flex justify-end">
            <div className="flex-1" onClick={() => setRightOpen(false)} />
            <div className="w-72 max-w-[85vw] bg-peak-surface h-full overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between p-4 border-b border-white/5">
                <span className="font-bold text-peak-text text-sm">Route Stats</span>
                <button onClick={() => setRightOpen(false)} className="text-peak-text-secondary text-xl leading-none">×</button>
              </div>
              <RightPanel stats={stats} routePoints={routePoints} resortId={id} routeName={`Route at ${resort.name}`} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
