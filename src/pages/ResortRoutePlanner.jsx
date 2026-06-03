import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, List, BarChart2 } from "lucide-react";
import { getResortById } from "../lib/data";
import LeftPanel from "../components/route/LeftPanel";
import RightPanel from "../components/route/RightPanel";

const MAPTILER_KEY = "lNsV1pOMdNShmVL9tiih";
const MAP_STYLE = `https://api.maptiler.com/maps/019c8160-59cd-7579-afc6-753ee61bd724/style.json?key=${MAPTILER_KEY}`;
const EMPTY_FC = { type: "FeatureCollection", features: [] };

const ROUTE_MODES = [
  { key: "fastest", label: "Fastest", icon: "⚡", desc: "Shortest path A to B" },
  { key: "easy_only", label: "Easy only", icon: "🟢", desc: "Blue & green runs only" },
  { key: "variety", label: "Best variety", icon: "🎿", desc: "Mix of difficulty levels" },
  { key: "scenic", label: "Most scenic", icon: "🏔️", desc: "Longest, most scenic" },
];

function haversineKm(a, b) {
  const R = 6371, dLat = (b[1]-a[1])*Math.PI/180, dLon = (b[0]-a[0])*Math.PI/180;
  const s = Math.sin(dLat/2)**2 + Math.cos(a[1]*Math.PI/180)*Math.cos(b[1]*Math.PI/180)*Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1-s));
}

function calcStats(points, pathCoords) {
  if (points.length < 2) return { distanceKm: "0.0", totalDescent: 0, totalAscent: 0, estimatedMinutes: 0 };
  let dist = 0;
  const coords = (pathCoords?.length >= 2) ? pathCoords : points.map(p => p.lngLat);
  for (let i = 1; i < coords.length; i++) dist += haversineKm(coords[i-1], coords[i]);
  return { distanceKm: dist.toFixed(1), totalDescent: 0, totalAscent: 0, estimatedMinutes: Math.round(dist/30*60) };
}

// ── Routing ─────────────────────────────────────────────────────────────────
function gridKey(lon, lat) {
  return `${Math.round(lon * 10000)},${Math.round(lat * 10000)}`;
}

function buildGraph(features) {
  const grid = new Map(), coords = [], edges = [];
  function node(c) {
    const k = gridKey(c[0], c[1]);
    if (!grid.has(k)) { grid.set(k, coords.length); coords.push(c); }
    return grid.get(k);
  }
  const W = { novice:1, easy:1, beginner:1, intermediate:1.3, advanced:1.8, expert:2.5 };
  features.forEach(f => {
    if (f.geometry.type !== "LineString") return;
    const lift = !!f.properties?.aerialway, piste = !!f.properties?.["piste:type"];
    if (!lift && !piste) return;
    const w = lift ? 0.4 : (W[f.properties?.["piste:difficulty"]] ?? 1.3);
    const cs = f.geometry.coordinates;
    for (let i = 0; i < cs.length-1; i++) {
      const a = node(cs[i]), b = node(cs[i+1]);
      if (a === b) continue;
      const d = haversineKm(cs[i], cs[i+1]);
      edges.push({ from:a, to:b, d:d*w, seg:[cs[i],cs[i+1]] });
      edges.push({ from:b, to:a, d:d*w*1.5, seg:[cs[i+1],cs[i]] });
    }
  });
  const adj = new Map();
  edges.forEach((e,i) => { if (!adj.has(e.from)) adj.set(e.from,[]); adj.get(e.from).push({to:e.to,d:e.d,i}); });
  return { coords, edges, adj };
}

function dijkstra(graph, start, end) {
  const { coords, edges, adj } = graph;
  if (!coords.length) return null;
  function nearest(c) {
    let best=-1, bd=Infinity;
    for (let i=0; i<coords.length; i++) { const d=haversineKm(c,coords[i]); if (d<bd){bd=d;best=i;} }
    return {idx:best,dist:bd};
  }
  const {idx:S,dist:dS}=nearest(start), {idx:E,dist:dE}=nearest(end);
  if (S<0||E<0||dS>2||dE>2) return null;
  if (S===E) return [start,end];
  const dist=new Float64Array(coords.length).fill(Infinity);
  const prev=new Int32Array(coords.length).fill(-1);
  const prevE=new Int32Array(coords.length).fill(-1);
  const vis=new Uint8Array(coords.length);
  dist[S]=0;
  const heap=[[0,S]];
  function push(item){heap.push(item);let i=heap.length-1;while(i>0){const p=(i-1)>>1;if(heap[p][0]<=heap[i][0])break;[heap[p],heap[i]]=[heap[i],heap[p]];i=p;}}
  function pop(){const t=heap[0],l=heap.pop();if(heap.length){heap[0]=l;let i=0;while(true){let s=i,a=2*i+1,b=2*i+2;if(a<heap.length&&heap[a][0]<heap[s][0])s=a;if(b<heap.length&&heap[b][0]<heap[s][0])s=b;if(s===i)break;[heap[i],heap[s]]=[heap[s],heap[i]];i=s;}}return t;}
  while(heap.length){
    const[d,u]=pop();
    if(vis[u])continue;vis[u]=1;
    if(u===E)break;
    for(const{to,d:w,i}of(adj.get(u)||[])){const nd=d+w;if(nd<dist[to]){dist[to]=nd;prev[to]=u;prevE[to]=i;push([nd,to]);}}
  }
  if(prev[E]===-1)return null;
  const path=[],ep=[];
  let cur=E;while(prevE[cur]!==-1){ep.unshift(prevE[cur]);cur=prev[cur];}
  ep.forEach(ei=>{const s=edges[ei].seg;if(!path.length)path.push(...s);else path.push(s[1]);});
  return path.length>=2?path:null;
}

function overpassToGeoJSON(data) {
  const nodes={};
  data.elements.forEach(el=>{if(el.type==="node")nodes[el.id]=[el.lon,el.lat];});
  const features=[];
  data.elements.forEach(el=>{
    if(el.type==="way"&&el.nodes){
      const cs=el.nodes.map(n=>nodes[n]).filter(Boolean);
      if(cs.length>=2)features.push({type:"Feature",geometry:{type:"LineString",coordinates:cs},properties:{...el.tags}});
    }
  });
  return{type:"FeatureCollection",features};
}

// ── Component ────────────────────────────────────────────────────────────────
export default function ResortRoutePlanner() {
  const { id } = useParams();
  const resort = getResortById(id);
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const graphRef = useRef(null);
  const geojsonRef = useRef(null);
  const routeRef = useRef([]);
  const pathRef = useRef([]);
  const routeModeRef = useRef("fastest");

  const [loading, setLoading] = useState(true);
  const [routeStatus, setRouteStatus] = useState("loading");
  const [routePoints, setRoutePoints] = useState([]);
  const [routePathCoords, setRoutePathCoords] = useState([]);
  const [routeMode, setRouteMode] = useState("fastest");
  const [stats, setStats] = useState({ distanceKm:"0.0", totalDescent:0, totalAscent:0, estimatedMinutes:0 });
  const [savedRoutes, setSavedRoutes] = useState([]);
  const [undoStack, setUndoStack] = useState([]);
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  useEffect(()=>{routeRef.current=routePoints;},[routePoints]);
  useEffect(()=>{pathRef.current=routePathCoords;},[routePathCoords]);
  useEffect(()=>{routeModeRef.current=routeMode;},[routeMode]);
  useEffect(()=>{ setStats(calcStats(routePoints,routePathCoords)); },[routePoints,routePathCoords]);

  useEffect(()=>{
    if(!id)return;
    try{const r=localStorage.getItem(`routes:${id}`);if(r)setSavedRoutes(JSON.parse(r));}catch{}
  },[id]);

  // Re-route all segments when mode changes
  useEffect(()=>{
    const pts=routeRef.current;
    if(pts.length<2||!graphRef.current)return;
    let combined=[];
    for(let i=0;i<pts.length-1;i++){
      const seg=dijkstra(graphRef.current,pts[i].lngLat,pts[i+1].lngLat);
      combined=combined.concat(seg||[pts[i].lngLat,pts[i+1].lngLat]);
    }
    setRoutePathCoords(combined);
    const src=mapInstance.current?.getSource("route-line");
    if(src&&combined.length>=2)src.setData({type:"FeatureCollection",features:[{type:"Feature",geometry:{type:"LineString",coordinates:combined},properties:{}}]});
  },[routeMode]);

  // Map init — exact TrackingRecord pattern
  useEffect(()=>{
    if(!resort?.lat||!resort?.lng){setLoading(false);return;}
    const lat=resort.lat, lng=resort.lng;
    let unmounted=false;

    const script=document.createElement("script");
    script.src="https://cdn.maptiler.com/maptiler-sdk-js/v2.2.0/maptiler-sdk.umd.min.js";
    script.onload=()=>{
      if(unmounted)return;
      const link=document.createElement("link");
      link.rel="stylesheet";
      link.href="https://cdn.maptiler.com/maptiler-sdk-js/v2.2.0/maptiler-sdk.css";
      document.head.appendChild(link);

      const sdk=window.maptilersdk;
      sdk.config.apiKey=MAPTILER_KEY;

      const map=new sdk.Map({
        container:mapRef.current, style:MAP_STYLE,
        center:[lng,lat], zoom:13, pitch:50, bearing:0,
        terrain:{source:"terrain",exaggeration:1.5},
      });

      map.addControl(new sdk.NavigationControl({showCompass:true,showZoom:true,visualizePitch:true}),"bottom-right");
      map.addControl(new sdk.ScaleControl({unit:"metric"}),"bottom-left");

      map.on("load",async()=>{
        if(unmounted)return;

        // Route drawing sources + layers
        map.addSource("route-line",{type:"geojson",data:EMPTY_FC});
        map.addSource("route-points",{type:"geojson",data:EMPTY_FC});
        map.addLayer({id:"route-shadow",type:"line",source:"route-line",paint:{"line-color":"#ffffff","line-width":7,"line-opacity":0.3},layout:{"line-cap":"round","line-join":"round"}});
        map.addLayer({id:"route-core",type:"line",source:"route-line",paint:{"line-color":"#FF00C8","line-width":4,"line-opacity":1},layout:{"line-cap":"round","line-join":"round"}});
        map.addLayer({id:"route-dots",type:"circle",source:"route-points",paint:{"circle-radius":9,"circle-color":"#FF00C8","circle-stroke-width":2.5,"circle-stroke-color":"#ffffff"}});
        map.addLayer({id:"route-nums",type:"symbol",source:"route-points",layout:{"text-field":["get","pointIndex"],"text-size":11,"text-anchor":"center","text-font":["Open Sans Bold","Arial Unicode MS Bold"]},paint:{"text-color":"#ffffff"}});

        setLoading(false);
        mapInstance.current=map;

        // Fetch piste data via corsproxy.io — works from browsers, bypasses IP blocks
        const pad=0.12;
        const lp=pad/Math.cos(lat*Math.PI/180);
        const [S,N,W,E]=[lat-pad,lat+pad,lng-lp,lng+lp];
        const query=`[out:json][timeout:25];(way["piste:type"="downhill"](${S},${W},${N},${E});way["aerialway"](${S},${W},${N},${E}););out body;>;out skel qt;`;
        const urls=[
          `https://corsproxy.io/?${encodeURIComponent("https://overpass-api.de/api/interpreter?data="+encodeURIComponent(query))}`,
          `https://api.allorigins.win/raw?url=${encodeURIComponent("https://overpass-api.de/api/interpreter?data="+encodeURIComponent(query))}`,
          `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`,
        ];

        for(const url of urls){
          try{
            const ctrl=new AbortController();
            setTimeout(()=>ctrl.abort(),20000);
            const res=await fetch(url,{signal:ctrl.signal});
            if(!res.ok)throw new Error(`HTTP ${res.status}`);
            const data=await res.json();
            if(unmounted)return;
            const gj=overpassToGeoJSON(data);
            if(gj.features.length>5){
              geojsonRef.current=gj;
              graphRef.current=buildGraph(gj.features);
              setRouteStatus("ready");
              console.log(`[PeakXP] Graph ready: ${graphRef.current.coords.length} nodes from ${url.slice(0,40)}`);
              break;
            }
          }catch(e){ console.warn("[PeakXP] fetch failed:",url.slice(0,40),e.message); }
        }

        if(!graphRef.current) setRouteStatus("failed");

        // Click handler
        map.on("click",async e=>{
          if(unmounted)return;
          let coord=[e.lngLat.lng,e.lngLat.lat];

          // Snap to nearest piste point
          if(geojsonRef.current){
            let bestDist=Infinity, bestPt=null;
            geojsonRef.current.features.forEach(f=>{
              if(f.geometry.type!=="LineString")return;
              f.geometry.coordinates.forEach(c=>{
                const d=haversineKm(coord,c)*1000;
                if(d<bestDist){bestDist=d;bestPt=c;}
              });
            });
            if(bestPt&&bestDist<80)coord=bestPt;
          }

          const prev=routeRef.current;
          const newPt={id:Date.now(),lngLat:coord,name:`Point ${prev.length+1}`,elevation:null,type:prev.length===0?"start":"waypoint"};
          const newPts=[...prev,newPt];
          setUndoStack(s=>[...s.slice(-20),{points:prev,path:pathRef.current}]);
          setRoutePoints(newPts);

          const ptSrc=map.getSource("route-points");
          if(ptSrc)ptSrc.setData({type:"FeatureCollection",features:newPts.map((p,i)=>({type:"Feature",geometry:{type:"Point",coordinates:p.lngLat},properties:{pointIndex:i+1,type:p.type}}))});

          if(newPts.length>=2){
            const prev2=newPts[newPts.length-2];
            const seg=graphRef.current?dijkstra(graphRef.current,prev2.lngLat,coord):null;
            const combined=[...pathRef.current,...(seg||[prev2.lngLat,coord])];
            setRoutePathCoords(combined);
            const lineSrc=map.getSource("route-line");
            if(lineSrc&&combined.length>=2)lineSrc.setData({type:"FeatureCollection",features:[{type:"Feature",geometry:{type:"LineString",coordinates:combined},properties:{}}]});
          }
        });
      });
    };
    script.onerror=()=>setLoading(false);
    document.head.appendChild(script);
    return()=>{ unmounted=true; if(mapInstance.current){try{mapInstance.current.remove();}catch{}mapInstance.current=null;} };
  },[resort?.id]);

  function handleDelete(ptId){
    const newPts=routePoints.filter(p=>p.id!==ptId);
    setRoutePoints(newPts); setRoutePathCoords([]);
    const l=mapInstance.current?.getSource("route-line");
    const p=mapInstance.current?.getSource("route-points");
    if(l)l.setData(EMPTY_FC);
    if(p)p.setData({type:"FeatureCollection",features:newPts.map((pt,i)=>({type:"Feature",geometry:{type:"Point",coordinates:pt.lngLat},properties:{pointIndex:i+1,type:pt.type}}))});
  }
  function handleRename(ptId,name){setRoutePoints(prev=>prev.map(p=>p.id===ptId?{...p,name}:p));}
  function handleTypeChange(ptId,type){setRoutePoints(prev=>prev.map(p=>p.id===ptId?{...p,type}:p));}
  function handleClear(){
    setRoutePoints([]);setRoutePathCoords([]);
    mapInstance.current?.getSource("route-line")?.setData(EMPTY_FC);
    mapInstance.current?.getSource("route-points")?.setData(EMPTY_FC);
  }
  function handleReverse(){setRoutePoints(prev=>[...prev].reverse());}
  function handleReorder(arr){setRoutePoints(arr);}
  function handleUndo(){
    setUndoStack(stack=>{
      if(!stack.length)return stack;
      const last=stack[stack.length-1];
      setRoutePoints(last.points);setRoutePathCoords(last.path);
      const l=mapInstance.current?.getSource("route-line");
      const p=mapInstance.current?.getSource("route-points");
      if(l)l.setData(last.path.length>=2?{type:"FeatureCollection",features:[{type:"Feature",geometry:{type:"LineString",coordinates:last.path},properties:{}}]}:EMPTY_FC);
      if(p)p.setData({type:"FeatureCollection",features:last.points.map((pt,i)=>({type:"Feature",geometry:{type:"Point",coordinates:pt.lngLat},properties:{pointIndex:i+1,type:pt.type}}))});
      return stack.slice(0,-1);
    });
  }
  function handleSave(){
    if(routePoints.length<2||!resort)return;
    const route={id:Date.now(),name:`Route at ${resort.name}`,resortId:resort.id,resortName:resort.name,points:routePoints,pathCoords:routePathCoords,stats,createdAt:new Date().toISOString()};
    const updated=[route,...savedRoutes];
    localStorage.setItem(`routes:${id}`,JSON.stringify(updated));
    setSavedRoutes(updated);
  }
  function handleLoadRoute(route){
    setRoutePoints(route.points);setRoutePathCoords(route.pathCoords||[]);
    const path=route.pathCoords||[];
    const l=mapInstance.current?.getSource("route-line");
    const p=mapInstance.current?.getSource("route-points");
    if(l&&path.length>=2)l.setData({type:"FeatureCollection",features:[{type:"Feature",geometry:{type:"LineString",coordinates:path},properties:{}}]});
    if(p)p.setData({type:"FeatureCollection",features:route.points.map((pt,i)=>({type:"Feature",geometry:{type:"Point",coordinates:pt.lngLat},properties:{pointIndex:i+1,type:pt.type}}))});
  }

  if(!resort)return<div className="min-h-screen bg-peak-bg flex items-center justify-center"><p className="text-peak-text-secondary">Resort not found.</p></div>;

  return(
    <div style={{height:"calc(100vh - 64px)",display:"flex",flexDirection:"column",overflow:"hidden"}}>
      {/* Header */}
      <div className="h-14 bg-peak-surface border-b border-white/5 flex items-center px-4 gap-4 flex-shrink-0 z-30">
        <Link to={`/resort/${id}`} className="flex items-center gap-1.5 text-peak-text-secondary hover:text-peak-text transition-colors text-sm">
          <ArrowLeft className="h-4 w-4"/><span className="hidden sm:inline">{resort.name}</span>
        </Link>
        <div className="w-px h-5 bg-white/10 hidden sm:block"/>
        <span className="font-display font-bold text-peak-text text-lg hidden sm:block">Route Planner</span>
        <div className="flex items-center gap-3 ml-auto text-sm">
          <span className="text-peak-text-secondary hidden md:block">{stats.distanceKm} km</span>
          <span className="text-peak-text-secondary hidden md:block">{stats.totalDescent} m ↓</span>
          <span className="text-peak-text-secondary hidden md:block">~{stats.estimatedMinutes} min</span>
          <button onClick={handleSave} disabled={routePoints.length<2} className="bg-peak-red text-white px-4 py-1.5 rounded-lg text-sm font-medium disabled:opacity-40">Save route</button>
        </div>
      </div>

      {/* Main */}
      <div style={{flex:1,display:"flex",overflow:"hidden",minHeight:0,position:"relative"}}>
        {loading&&(
          <div style={{position:"absolute",inset:0,zIndex:50,background:"#070B1E",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:12}}>
            <div style={{fontSize:36}}>⛷️</div>
            <p style={{color:"rgba(255,255,255,0.5)",fontSize:14}}>Loading resort map…</p>
          </div>
        )}

        {/* Route status pill */}
        {!loading&&(
          <div style={{position:"absolute",top:12,left:"50%",transform:"translateX(-50%)",zIndex:30,background:"rgba(0,0,0,0.8)",borderRadius:20,padding:"4px 14px",fontSize:11,whiteSpace:"nowrap",
            color:routeStatus==="ready"?"#4ade80":routeStatus==="failed"?"#f87171":"#facc15"}}>
            {routeStatus==="ready"?"✓ Routing ready — click pistes to plan":routeStatus==="failed"?"⚠ Routing unavailable — straight lines only":"⏳ Loading slope data…"}
          </div>
        )}

        {/* Left panel */}
        <div className="w-60 flex-shrink-0 bg-peak-surface border-r border-white/5 overflow-y-auto hidden lg:block z-10">
          <LeftPanel routePoints={routePoints} onDelete={handleDelete} onRename={handleRename}
            onTypeChange={handleTypeChange} onClear={handleClear} onReverse={handleReverse}
            onReorder={handleReorder} savedRoutes={savedRoutes} onLoadRoute={handleLoadRoute}
            routeMode={routeMode} setRouteMode={setRouteMode} routeModes={ROUTE_MODES}
            onUndo={handleUndo} canUndo={undoStack.length>0}/>
        </div>

        {/* Map */}
        <div style={{flex:1,position:"relative",minWidth:0,minHeight:0}}>
          <div ref={mapRef} style={{position:"absolute",inset:0,width:"100%",height:"100%"}}/>
        </div>

        {/* Right panel */}
        <div className="w-60 flex-shrink-0 bg-peak-surface/90 border-l border-white/5 overflow-y-auto hidden lg:block z-10">
          <RightPanel stats={stats} routePoints={routePoints} resortId={id} routeName={`Route at ${resort.name}`}
            savedRoutes={savedRoutes} onLoadRoute={handleLoadRoute}/>
        </div>

        {/* Mobile buttons */}
        <button onClick={()=>setLeftOpen(o=>!o)} className="lg:hidden absolute bottom-20 left-4 z-30 bg-peak-surface border border-white/10 rounded-full p-3 shadow-lg"><List className="h-5 w-5 text-peak-text"/></button>
        <button onClick={()=>setRightOpen(o=>!o)} className="lg:hidden absolute bottom-20 right-4 z-30 bg-peak-surface border border-white/10 rounded-full p-3 shadow-lg"><BarChart2 className="h-5 w-5 text-peak-text"/></button>
      </div>
    </div>
  );
}
