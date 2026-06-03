import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, List, BarChart2, RotateCcw } from "lucide-react";
import { getResortById } from "../lib/data";
import RightPanel from "../components/route/RightPanel";

const MAPTILER_KEY = "lNsV1pOMdNShmVL9tiih";
const MAP_STYLE = `https://api.maptiler.com/maps/019c8160-59cd-7579-afc6-753ee61bd724/style.json?key=${MAPTILER_KEY}`;
const EMPTY_FC = { type: "FeatureCollection", features: [] };
const ROUTE_COLOR = "#FF00C8";

const ROUTE_MODES = [
  { key: "fastest",   label: "Fastest",      icon: "⚡", desc: "Shortest path A→B" },
  { key: "easy_only", label: "Easy only",    icon: "🟢", desc: "Blue & green runs" },
  { key: "variety",   label: "Best variety", icon: "🎿", desc: "Mix of difficulties" },
  { key: "scenic",    label: "Most scenic",  icon: "🏔️", desc: "Longest scenic route" },
];

// ── Haversine ────────────────────────────────────────────────────────────────
function hav(a, b) {
  const R = 6371, dLat = (b[1]-a[1])*Math.PI/180, dLon = (b[0]-a[0])*Math.PI/180;
  const s = Math.sin(dLat/2)**2 + Math.cos(a[1]*Math.PI/180)*Math.cos(b[1]*Math.PI/180)*Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1-s));
}

// ── Stats ────────────────────────────────────────────────────────────────────
function calcStats(pts, path) {
  const coords = (path?.length >= 2) ? path : pts.map(p => p.lngLat);
  let dist = 0;
  for (let i = 1; i < coords.length; i++) dist += hav(coords[i-1], coords[i]);
  return {
    distanceKm: dist.toFixed(1),
    totalDescent: 0,
    totalAscent: 0,
    estimatedMinutes: Math.round(dist / 30 * 60),
    waypoints: pts.length,
  };
}

// ── Graph builder ────────────────────────────────────────────────────────────
const DIFF_W = { novice:1, easy:1, beginner:1, intermediate:1.3, advanced:1.8, expert:2.5, freeride:2.5 };

function buildGraph(features, mode) {
  const grid = new Map(), coords = [], edges = [];

  function node(c) {
    const k = `${Math.round(c[0]*10000)},${Math.round(c[1]*10000)}`;
    if (!grid.has(k)) { grid.set(k, coords.length); coords.push(c); }
    return grid.get(k);
  }

  features.forEach(f => {
    if (f.geometry.type !== "LineString") return;
    const lift  = !!f.properties?.aerialway;
    const piste = !!f.properties?.["piste:type"];
    if (!lift && !piste) return;

    const diff = f.properties?.["piste:difficulty"] || "intermediate";
    if (mode === "easy_only" && !lift && !["novice","easy","beginner"].includes(diff)) return;

    const w = lift ? 0.4 : (DIFF_W[diff] ?? 1.3) * (mode === "scenic" ? 0.5 : 1);
    const cs = f.geometry.coordinates;

    for (let i = 0; i < cs.length - 1; i++) {
      const a = node(cs[i]), b = node(cs[i+1]);
      if (a === b) continue;
      const d = hav(cs[i], cs[i+1]);
      edges.push({ from:a, to:b, d:d*w,     seg:[cs[i], cs[i+1]] });
      edges.push({ from:b, to:a, d:d*w*1.5, seg:[cs[i+1], cs[i]] });
    }
  });

  const adj = new Map();
  edges.forEach((e, i) => {
    if (!adj.has(e.from)) adj.set(e.from, []);
    adj.get(e.from).push({ to:e.to, d:e.d, i });
  });

  return { coords, edges, adj };
}

// ── Dijkstra ─────────────────────────────────────────────────────────────────
function route(graph, start, end) {
  const { coords, edges, adj } = graph;
  if (!coords.length) return null;

  let best = -1, bd = Infinity, best2 = -1, bd2 = Infinity;
  for (let i = 0; i < coords.length; i++) {
    const d1 = hav(start, coords[i]), d2 = hav(end, coords[i]);
    if (d1 < bd)  { bd  = d1; best  = i; }
    if (d2 < bd2) { bd2 = d2; best2 = i; }
  }
  if (best < 0 || best2 < 0 || bd > 2 || bd2 > 2) return null;
  if (best === best2) return [start, end];

  const S = best, E = best2;
  const dist = new Float64Array(coords.length).fill(Infinity);
  const prev = new Int32Array(coords.length).fill(-1);
  const prevE = new Int32Array(coords.length).fill(-1);
  const vis  = new Uint8Array(coords.length);
  dist[S] = 0;

  const heap = [[0, S]];
  const push = item => {
    heap.push(item); let i = heap.length - 1;
    while (i > 0) { const p = (i-1)>>1; if (heap[p][0] <= heap[i][0]) break; [heap[p],heap[i]]=[heap[i],heap[p]]; i=p; }
  };
  const pop = () => {
    const t = heap[0], l = heap.pop();
    if (heap.length) { heap[0]=l; let i=0; while(true) { let s=i,a=2*i+1,b=2*i+2; if(a<heap.length&&heap[a][0]<heap[s][0])s=a; if(b<heap.length&&heap[b][0]<heap[s][0])s=b; if(s===i)break; [heap[i],heap[s]]=[heap[s],heap[i]]; i=s; } }
    return t;
  };

  while (heap.length) {
    const [d, u] = pop();
    if (vis[u]) continue; vis[u] = 1;
    if (u === E) break;
    for (const { to, d:w, i } of (adj.get(u) || [])) {
      const nd = d + w;
      if (nd < dist[to]) { dist[to]=nd; prev[to]=u; prevE[to]=i; push([nd,to]); }
    }
  }

  if (prev[E] === -1) return null;
  const path = [], ep = [];
  let cur = E;
  while (prevE[cur] !== -1) { ep.unshift(prevE[cur]); cur = prev[cur]; }
  ep.forEach(ei => {
    const seg = edges[ei].seg;
    if (!path.length) path.push(...seg); else path.push(seg[1]);
  });
  return path.length >= 2 ? path : null;
}

// ── Overpass → GeoJSON ───────────────────────────────────────────────────────
function toGeoJSON(data) {
  const nodes = {};
  data.elements.forEach(el => { if (el.type === "node") nodes[el.id] = [el.lon, el.lat]; });
  const features = [];
  data.elements.forEach(el => {
    if (el.type !== "way" || !el.nodes) return;
    const cs = el.nodes.map(n => nodes[n]).filter(Boolean);
    if (cs.length >= 2) features.push({ type:"Feature", geometry:{ type:"LineString", coordinates:cs }, properties:{ ...el.tags } });
  });
  return { type:"FeatureCollection", features };
}

// ── Main component ───────────────────────────────────────────────────────────
export default function ResortRoutePlanner() {
  const { id } = useParams();
  const resort = getResortById(id);
  const mapRef  = useRef(null);
  const mapInst = useRef(null);
  const geoRef  = useRef(null);  // raw geojson (for snapping)
  const graphRef = useRef(null); // built graph per mode
  const ptsRef  = useRef([]);
  const pathRef = useRef([]);
  const modeRef = useRef("fastest");

  const [loading,    setLoading]    = useState(true);
  const [dataStatus, setDataStatus] = useState("loading"); // loading|ready|failed
  const [routePoints,   setRoutePoints]   = useState([]);
  const [routePath,     setRoutePath]     = useState([]);
  const [routeMode,     setRouteMode]     = useState("fastest");
  const [stats,         setStats]         = useState({ distanceKm:"0.0", totalDescent:0, totalAscent:0, estimatedMinutes:0, waypoints:0 });
  const [savedRoutes,   setSavedRoutes]   = useState([]);
  const [undoStack,     setUndoStack]     = useState([]);
  const [leftOpen,      setLeftOpen]      = useState(false);
  const [rightOpen,     setRightOpen]     = useState(false);

  useEffect(() => { ptsRef.current  = routePoints; }, [routePoints]);
  useEffect(() => { pathRef.current = routePath;   }, [routePath]);
  useEffect(() => { modeRef.current = routeMode;   }, [routeMode]);
  useEffect(() => { setStats(calcStats(routePoints, routePath)); }, [routePoints, routePath]);
  useEffect(() => {
    try { const r = localStorage.getItem(`routes:${id}`); if (r) setSavedRoutes(JSON.parse(r)); } catch {}
  }, [id]);

  // Rebuild graph + re-route when mode changes
  useEffect(() => {
    if (!geoRef.current) return;
    graphRef.current = buildGraph(geoRef.current.features, routeMode);
    const pts = ptsRef.current;
    if (pts.length < 2) return;
    let combined = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const seg = route(graphRef.current, pts[i].lngLat, pts[i+1].lngLat);
      combined = combined.concat(seg || [pts[i].lngLat, pts[i+1].lngLat]);
    }
    setRoutePath(combined);
    mapInst.current?.getSource("route-line")?.setData({
      type:"FeatureCollection", features:[{ type:"Feature", geometry:{ type:"LineString", coordinates:combined }, properties:{} }]
    });
  }, [routeMode]);

  // Map init
  useEffect(() => {
    if (!resort?.lat || !resort?.lng) { setLoading(false); return; }
    const lat = resort.lat, lng = resort.lng;
    let dead = false;

    const script = document.createElement("script");
    script.src = "https://cdn.maptiler.com/maptiler-sdk-js/v2.2.0/maptiler-sdk.umd.min.js";
    script.onload = () => {
      if (dead) return;
      const css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = "https://cdn.maptiler.com/maptiler-sdk-js/v2.2.0/maptiler-sdk.css";
      document.head.appendChild(css);

      const sdk = window.maptilersdk;
      sdk.config.apiKey = MAPTILER_KEY;

      const map = new sdk.Map({
        container: mapRef.current, style: MAP_STYLE,
        center: [lng, lat], zoom: 13, pitch: 50, bearing: 0,
        terrain: { source: "terrain", exaggeration: 1.5 },
        keyboard: false,
      });
      map.addControl(new sdk.NavigationControl({ showCompass:true, showZoom:true, visualizePitch:true }), "bottom-right");
      map.addControl(new sdk.ScaleControl({ unit:"metric" }), "bottom-left");

      map.on("load", async () => {
        if (dead) return;

        // Route drawing layers
        map.addSource("route-line",   { type:"geojson", data:EMPTY_FC });
        map.addSource("route-points", { type:"geojson", data:EMPTY_FC });
        map.addLayer({ id:"r-shadow", type:"line",   source:"route-line",   paint:{ "line-color":"#fff", "line-width":7, "line-opacity":0.25 }, layout:{ "line-cap":"round", "line-join":"round" } });
        map.addLayer({ id:"r-core",   type:"line",   source:"route-line",   paint:{ "line-color":ROUTE_COLOR, "line-width":4, "line-opacity":1 }, layout:{ "line-cap":"round", "line-join":"round" } });
        map.addLayer({ id:"r-dots",   type:"circle", source:"route-points", paint:{ "circle-radius":9, "circle-color":ROUTE_COLOR, "circle-stroke-width":2.5, "circle-stroke-color":"#fff" } });
        map.addLayer({ id:"r-nums",   type:"symbol", source:"route-points",
          layout:{ "text-field":["get","n"], "text-size":11, "text-anchor":"center", "text-font":["Open Sans Bold","Arial Unicode MS Bold"] },
          paint:{ "text-color":"#fff" } });

        mapInst.current = map;
        setLoading(false);

        // Fetch piste network — try 3 URLs
        const pad = 0.12, lp = pad / Math.cos(lat * Math.PI / 180);
        const [S,N,W,E] = [lat-pad, lat+pad, lng-lp, lng+lp];
        const q = `[out:json][timeout:25];(way["piste:type"="downhill"](${S},${W},${N},${E});way["aerialway"](${S},${W},${N},${E}););out body;>;out skel qt;`;
        const enc = encodeURIComponent;

        const sources = [
          `https://corsproxy.io/?${enc("https://overpass-api.de/api/interpreter?data="+enc(q))}`,
          `https://api.allorigins.win/raw?url=${enc("https://overpass-api.de/api/interpreter?data="+enc(q))}`,
          `https://overpass-api.de/api/interpreter?data=${enc(q)}`,
        ];

        for (const url of sources) {
          try {
            const ctrl = new AbortController();
            setTimeout(() => ctrl.abort(), 18000);
            const res = await fetch(url, { signal: ctrl.signal });
            if (!res.ok) throw new Error(res.status);
            const data = await res.json();
            if (dead) return;
            const gj = toGeoJSON(data);
            if (gj.features.length < 5) continue;
            geoRef.current   = gj;
            graphRef.current = buildGraph(gj.features, modeRef.current);
            setDataStatus("ready");
            break;
          } catch { /* try next */ }
        }

        if (!geoRef.current) setDataStatus("failed");

        // Click → snap → route
        map.on("click", async e => {
          if (dead) return;
          let coord = [e.lngLat.lng, e.lngLat.lat];

          // Snap to nearest piste vertex
          if (geoRef.current) {
            let bd = Infinity, bp = null;
            geoRef.current.features.forEach(f => {
              if (f.geometry.type !== "LineString") return;
              f.geometry.coordinates.forEach(c => {
                const d = hav(coord, c) * 1000;
                if (d < bd) { bd = d; bp = c; }
              });
            });
            if (bp && bd < 80) coord = bp;
          }

          const prev  = ptsRef.current;
          const newPt = { id:Date.now(), lngLat:coord, name:`Point ${prev.length+1}`, type:prev.length===0?"start":"waypoint" };
          const newPts = [...prev, newPt];

          setUndoStack(s => [...s.slice(-20), { pts:prev, path:pathRef.current }]);
          setRoutePoints(newPts);

          // Update dot markers
          map.getSource("route-points")?.setData({
            type:"FeatureCollection", features:newPts.map((p,i) => ({
              type:"Feature", geometry:{ type:"Point", coordinates:p.lngLat },
              properties:{ n:i+1, type:p.type }
            }))
          });

          // Route segment
          if (newPts.length >= 2) {
            const from = newPts[newPts.length-2];
            const seg  = graphRef.current ? route(graphRef.current, from.lngLat, coord) : null;
            const combined = [...pathRef.current, ...(seg || [from.lngLat, coord])];
            setRoutePath(combined);
            map.getSource("route-line")?.setData({
              type:"FeatureCollection", features:[{ type:"Feature", geometry:{ type:"LineString", coordinates:combined }, properties:{} }]
            });
          }
        });
      });
    };
    script.onerror = () => setLoading(false);
    document.head.appendChild(script);
    return () => {
      dead = true;
      try { mapInst.current?.remove(); } catch {}
      mapInst.current = null;
    };
  }, [resort?.id]);

  // ── Handlers ────────────────────────────────────────────────────────────────
  function redrawMap(pts, path) {
    mapInst.current?.getSource("route-line")?.setData(
      path.length >= 2 ? { type:"FeatureCollection", features:[{ type:"Feature", geometry:{ type:"LineString", coordinates:path }, properties:{} }] } : EMPTY_FC
    );
    mapInst.current?.getSource("route-points")?.setData({
      type:"FeatureCollection", features:pts.map((p,i) => ({ type:"Feature", geometry:{ type:"Point", coordinates:p.lngLat }, properties:{ n:i+1, type:p.type } }))
    });
  }

  function handleUndo() {
    setUndoStack(s => {
      if (!s.length) return s;
      const last = s[s.length-1];
      setRoutePoints(last.pts); setRoutePath(last.path);
      redrawMap(last.pts, last.path);
      return s.slice(0,-1);
    });
  }
  function handleClear()  { setRoutePoints([]); setRoutePath([]); setUndoStack([]); redrawMap([],[]); }
  function handleReverse(){ setRoutePoints(p => [...p].reverse()); }
  function handleDelete(ptId) {
    const newPts = routePoints.filter(p => p.id !== ptId);
    setRoutePoints(newPts); setRoutePath([]); redrawMap(newPts, []);
  }
  function handleSave() {
    if (routePoints.length < 2 || !resort) return;
    const r = { id:Date.now(), name:`Route at ${resort.name}`, resortId:resort.id, resortName:resort.name, points:routePoints, pathCoords:routePath, stats, createdAt:new Date().toISOString() };
    const updated = [r, ...savedRoutes];
    localStorage.setItem(`routes:${id}`, JSON.stringify(updated));
    setSavedRoutes(updated);
  }
  function handleLoadRoute(r) {
    setRoutePoints(r.points); setRoutePath(r.pathCoords||[]);
    redrawMap(r.points, r.pathCoords||[]);
  }

  if (!resort) return <div className="min-h-screen bg-peak-bg flex items-center justify-center text-peak-text-secondary">Resort not found.</div>;

  const PILL_COLOR = dataStatus==="ready" ? "#4ade80" : dataStatus==="failed" ? "#f87171" : "#facc15";
  const PILL_TEXT  = dataStatus==="ready" ? "✓ Routing ready — click the map to plan" : dataStatus==="failed" ? "⚠ No slope data — straight lines only" : "⏳ Loading slope data…";

  return (
    <div style={{ height:"calc(100vh - 64px)", display:"flex", flexDirection:"column", overflow:"hidden" }}>

      {/* ── Header ── */}
      <div className="h-14 bg-peak-surface border-b border-white/5 flex items-center px-4 gap-3 flex-shrink-0 z-30">
        <Link to={`/resort/${id}`} className="flex items-center gap-1.5 text-peak-text-secondary hover:text-peak-text text-sm transition-colors">
          <ArrowLeft className="h-4 w-4" /><span className="hidden sm:inline">{resort.name}</span>
        </Link>
        <div className="w-px h-5 bg-white/10" />
        <span className="font-display font-bold text-peak-text hidden sm:block">Route Planner</span>
        <div className="flex items-center gap-3 ml-auto text-sm">
          <span className="text-peak-text-secondary hidden md:block">{stats.distanceKm} km</span>
          <span className="text-peak-text-secondary hidden md:block">{stats.estimatedMinutes} min</span>
          <button onClick={handleSave} disabled={routePoints.length < 2}
            className="bg-peak-red text-white px-4 py-1.5 rounded-lg text-sm font-medium disabled:opacity-40 hover:bg-peak-red-hover transition-colors">
            Save route
          </button>
        </div>
      </div>

      {/* ── Main ── */}
      <div style={{ flex:1, display:"flex", overflow:"hidden", minHeight:0, position:"relative" }}>

        {loading && (
          <div style={{ position:"absolute", inset:0, zIndex:50, background:"#070B1E", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:12 }}>
            <div style={{ fontSize:40 }}>⛷️</div>
            <p style={{ color:"rgba(255,255,255,0.5)", fontSize:14 }}>Loading resort map…</p>
          </div>
        )}

        {/* Status pill */}
        {!loading && (
          <div style={{ position:"absolute", top:10, left:"50%", transform:"translateX(-50%)", zIndex:30, background:"rgba(7,11,30,0.88)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:20, padding:"5px 14px", fontSize:11, color:PILL_COLOR, whiteSpace:"nowrap", pointerEvents:"none" }}>
            {PILL_TEXT}
          </div>
        )}

        {/* ── Left panel ── */}
        <div className="w-60 flex-shrink-0 bg-peak-surface border-r border-white/5 overflow-y-auto hidden lg:flex flex-col z-10">
          {/* Route points */}
          <div className="p-4 border-b border-white/5">
            <p className="text-peak-text font-bold text-sm mb-3">Your route</p>
            {routePoints.length === 0
              ? <p className="text-peak-text-secondary text-xs leading-relaxed">Click anywhere on the map to start. Snaps to nearest slope automatically.</p>
              : <div className="space-y-1">
                  {routePoints.map((p, i) => (
                    <div key={p.id} className="flex items-center gap-2 group">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 text-xs"
                        style={{ background: p.type==="start"?"#22c55e":p.type==="end"?"#ef4444":"#3894E3" }}>
                        {p.type==="start"?"S":p.type==="end"?"E":i+1}
                      </span>
                      <span className="text-peak-text text-xs flex-1 truncate">{p.name}</span>
                      <button onClick={()=>handleDelete(p.id)} className="opacity-0 group-hover:opacity-100 text-peak-text-secondary hover:text-peak-red text-xs transition-all">×</button>
                    </div>
                  ))}
                </div>
            }
            {routePoints.length > 0 && (
              <div className="flex gap-2 mt-3">
                <button onClick={handleUndo} disabled={undoStack.length===0}
                  className="flex-1 text-xs py-1.5 rounded-lg border border-white/10 text-peak-text-secondary hover:text-peak-text disabled:opacity-30 transition-colors flex items-center gap-1 justify-center">
                  <RotateCcw className="h-3 w-3"/>Undo
                </button>
                <button onClick={handleClear} className="flex-1 text-xs py-1.5 rounded-lg border border-white/10 text-peak-text-secondary hover:text-peak-red transition-colors">Clear</button>
                <button onClick={handleReverse} className="flex-1 text-xs py-1.5 rounded-lg border border-white/10 text-peak-text-secondary hover:text-peak-text transition-colors">Reverse</button>
              </div>
            )}
          </div>

          {/* Route mode */}
          <div className="p-4 border-b border-white/5">
            <p className="text-peak-text font-bold text-sm mb-3">Route mode</p>
            <div className="grid grid-cols-2 gap-1.5">
              {ROUTE_MODES.map(m => (
                <button key={m.key} onClick={()=>setRouteMode(m.key)}
                  style={{ textAlign:"left", padding:"8px 10px", borderRadius:8, border:routeMode===m.key?"1.5px solid rgba(251,52,61,0.5)":"1px solid rgba(255,255,255,0.08)", background:routeMode===m.key?"rgba(251,52,61,0.12)":"rgba(255,255,255,0.03)", cursor:"pointer", transition:"all 0.15s" }}>
                  <div style={{ fontSize:15 }}>{m.icon}</div>
                  <p style={{ fontSize:11, fontWeight:700, color:routeMode===m.key?"white":"rgba(255,255,255,0.7)", marginTop:3 }}>{m.label}</p>
                  <p style={{ fontSize:10, color:"rgba(255,255,255,0.35)", marginTop:2, lineHeight:1.3 }}>{m.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Saved routes */}
          <div className="p-4 flex-1 overflow-y-auto">
            <p className="text-peak-text font-bold text-sm mb-3">Saved routes</p>
            {savedRoutes.length === 0
              ? <p className="text-peak-text-secondary text-xs">No saved routes yet. Build a route and click Save.</p>
              : savedRoutes.map(r => (
                  <div key={r.id} className="bg-peak-card rounded-xl p-3 mb-2 cursor-pointer hover:border-white/15 border border-white/5 transition-colors" onClick={()=>handleLoadRoute(r)}>
                    <p className="text-peak-text text-xs font-semibold truncate">{r.name}</p>
                    <p className="text-peak-text-secondary text-xs mt-0.5">{r.stats?.distanceKm}km · {r.stats?.estimatedMinutes}min</p>
                  </div>
                ))
            }
          </div>
        </div>

        {/* ── Map ── */}
        <div style={{ flex:1, position:"relative", minWidth:0, minHeight:0 }}>
          <div ref={mapRef} style={{ position:"absolute", inset:0 }} />
        </div>

        {/* ── Right panel ── */}
        <div className="w-60 flex-shrink-0 bg-peak-surface/95 border-l border-white/5 overflow-y-auto hidden lg:block z-10">
          {/* Stats */}
          <div className="p-4 border-b border-white/5">
            <p className="text-peak-text font-bold text-sm mb-4">Route stats</p>
            {[
              { label:"Distance",  value:`${stats.distanceKm} km` },
              { label:"Descent",   value:`${stats.totalDescent} m ↓` },
              { label:"Ascent",    value:`${stats.totalAscent} m ↑` },
              { label:"Waypoints", value:stats.waypoints },
              { label:"Est. time", value:`~${stats.estimatedMinutes} min` },
            ].map(s => (
              <div key={s.label} className="flex items-center justify-between mb-3">
                <span className="text-peak-text-secondary text-xs">{s.label}</span>
                <span className="text-peak-text font-bold text-sm">{s.value}</span>
              </div>
            ))}
          </div>

          {/* Difficulty legend */}
          <div className="p-4 border-b border-white/5">
            <p className="text-peak-text font-bold text-sm mb-3">Difficulty</p>
            {[["#43a047","Easy"],["#1565C0","Intermediate"],["#D32F2F","Advanced"],["#111111","Expert"]].map(([c,l]) => (
              <div key={l} className="flex items-center gap-2 mb-2">
                <div style={{ width:12, height:12, borderRadius:"50%", background:c, border:"1.5px solid rgba(255,255,255,0.3)", flexShrink:0 }} />
                <span className="text-peak-text-secondary text-xs">{l}</span>
              </div>
            ))}
          </div>

          {/* Share */}
          <div className="p-4">
            <p className="text-peak-text font-bold text-sm mb-3">Share route</p>
            {[
              { icon:"🔗", label:"Copy link",         action:()=>navigator.clipboard?.writeText(window.location.href) },
              { icon:"👥", label:"Share to community", action:()=>{} },
              { icon:"⬇️", label:"Export GPX",        action:()=>{} },
            ].map(b => (
              <button key={b.label} onClick={b.action}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-white/8 text-peak-text-secondary hover:text-peak-text hover:border-white/15 transition-colors mb-2 text-xs">
                <span>{b.icon}</span>{b.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile FABs */}
        <button onClick={()=>setLeftOpen(o=>!o)} className="lg:hidden absolute bottom-20 left-4 z-30 bg-peak-surface border border-white/10 rounded-full p-3 shadow-lg">
          <List className="h-5 w-5 text-peak-text"/>
        </button>
        <button onClick={()=>setRightOpen(o=>!o)} className="lg:hidden absolute bottom-20 right-4 z-30 bg-peak-surface border border-white/10 rounded-full p-3 shadow-lg">
          <BarChart2 className="h-5 w-5 text-peak-text"/>
        </button>

        {/* Mobile drawers */}
        {leftOpen && (
          <div className="lg:hidden absolute inset-0 z-40 flex" onClick={()=>setLeftOpen(false)}>
            <div className="w-72 max-w-[85vw] bg-peak-surface h-full overflow-y-auto shadow-2xl" onClick={e=>e.stopPropagation()}>
              <div className="flex items-center justify-between p-4 border-b border-white/5">
                <span className="font-bold text-peak-text text-sm">Route</span>
                <button onClick={()=>setLeftOpen(false)} className="text-peak-text-secondary text-xl">×</button>
              </div>
              <div className="p-4">
                {routePoints.map((p,i)=>(
                  <div key={p.id} className="flex items-center gap-2 mb-2">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                      style={{background:p.type==="start"?"#22c55e":p.type==="end"?"#ef4444":"#3894E3"}}>
                      {p.type==="start"?"S":i+1}
                    </span>
                    <span className="text-peak-text text-xs">{p.name}</span>
                  </div>
                ))}
                <div className="flex gap-2 mt-3">
                  <button onClick={handleUndo} className="flex-1 text-xs py-1.5 rounded-lg border border-white/10 text-peak-text-secondary">Undo</button>
                  <button onClick={handleClear} className="flex-1 text-xs py-1.5 rounded-lg border border-white/10 text-peak-text-secondary">Clear</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
