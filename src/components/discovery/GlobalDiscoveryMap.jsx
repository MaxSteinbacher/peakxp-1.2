import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Maximize, Minimize, Maximize2, X, ChevronRight } from "lucide-react";
import { resorts } from "../../lib/data";

// ─── Hierarchy data ──────────────────────────────────────────────────────────

const CONTINENT_BOUNDS = {
  europe:        { minLon: -25, minLat: 35, maxLon: 45,  maxLat: 72 },
  "north-america": { minLon: -170, minLat: 15, maxLon: -50, maxLat: 75 },
  "south-america": { minLon: -82,  minLat: -56, maxLon: -34, maxLat: 13 },
  asia:          { minLon: 40,  minLat: 10, maxLon: 145, maxLat: 75 },
  oceania:       { minLon: 110, minLat: -48, maxLon: 180, maxLat: -10 },
};

const HIERARCHY = {
  continents: [
    {
      id: "europe", name: "Europe", labelPosition: { lat: 54, lon: 15 },
      regions: [
        { id: "alps", name: "Alps", labelPosition: { lat: 46.5, lon: 10.5 }, subRegions: [
          { id: "austria-tyrol", name: "Austria Tyrol", lat: 47.3, lon: 11.4 },
          { id: "austria-salzburg", name: "Austria Salzburg", lat: 47.4, lon: 13.2 },
          { id: "switzerland-valais", name: "Switzerland Valais", lat: 46.1, lon: 7.5 },
          { id: "switzerland-graubunden", name: "Switzerland Graubünden", lat: 46.7, lon: 9.5 },
          { id: "france-savoie", name: "France Savoie", lat: 45.4, lon: 6.5 },
          { id: "france-haute-savoie", name: "France Haute-Savoie", lat: 46.0, lon: 6.7 },
          { id: "italy-alto-adige", name: "Italy Alto Adige", lat: 46.7, lon: 11.5 },
          { id: "italy-trentino", name: "Italy Trentino", lat: 46.1, lon: 11.1 },
          { id: "italy-valle-daosta", name: "Italy Valle d'Aosta", lat: 45.7, lon: 7.3 },
        ]},
        { id: "pyrenees", name: "Pyrenees", labelPosition: { lat: 42.7, lon: 1.0 }, subRegions: [
          { id: "andorra", name: "Andorra", lat: 42.5, lon: 1.5 },
          { id: "spain-aragon", name: "Spain Aragon", lat: 42.7, lon: -0.4 },
          { id: "france-hautes-pyrenees", name: "France Hautes-Pyrénées", lat: 42.9, lon: 0.1 },
        ]},
        { id: "scandinavia", name: "Scandinavia", labelPosition: { lat: 62, lon: 15 }, subRegions: [{ id: "scandinavia-main", name: "Scandinavia", lat: 62, lon: 15 }] },
        { id: "carpathians", name: "Carpathians", labelPosition: { lat: 49, lon: 22 }, subRegions: [{ id: "carpathians-main", name: "Carpathians", lat: 49, lon: 22 }] },
        { id: "scottish-highlands", name: "Scottish Highlands", labelPosition: { lat: 57, lon: -4 }, subRegions: [{ id: "scottish-highlands-main", name: "Scottish Highlands", lat: 57, lon: -4 }] },
      ]
    },
    {
      id: "north-america", name: "North America", labelPosition: { lat: 48, lon: -100 },
      regions: [
        { id: "rockies-co-ut", name: "Rocky Mtns (CO/UT)", labelPosition: { lat: 39.5, lon: -106 }, subRegions: [{ id: "rockies-co-ut-main", name: "Rocky Mountains CO/UT", lat: 39.5, lon: -106 }] },
        { id: "rockies-wy-mt", name: "Rocky Mtns (WY/MT)", labelPosition: { lat: 44, lon: -110 }, subRegions: [{ id: "rockies-wy-mt-main", name: "Rocky Mountains WY/MT", lat: 44, lon: -110 }] },
        { id: "sierra-nevada", name: "Sierra Nevada", labelPosition: { lat: 38.5, lon: -119.5 }, subRegions: [{ id: "sierra-nevada-main", name: "Sierra Nevada", lat: 38.5, lon: -119.5 }] },
        { id: "cascades", name: "Cascades", labelPosition: { lat: 47.5, lon: -121.5 }, subRegions: [{ id: "cascades-main", name: "Cascades", lat: 47.5, lon: -121.5 }] },
        { id: "eastern-usa", name: "Eastern USA", labelPosition: { lat: 44, lon: -71.5 }, subRegions: [{ id: "eastern-usa-main", name: "Eastern USA", lat: 44, lon: -71.5 }] },
      ]
    },
    {
      id: "south-america", name: "South America", labelPosition: { lat: -20, lon: -58 },
      regions: [
        { id: "andes", name: "Andes", labelPosition: { lat: -33, lon: -70 }, subRegions: [{ id: "andes-main", name: "Andes Argentina Chile", lat: -33, lon: -70 }] },
      ]
    },
    {
      id: "asia", name: "Asia", labelPosition: { lat: 45, lon: 80 },
      regions: [
        { id: "japan-hokkaido", name: "Japan Hokkaido", labelPosition: { lat: 43.5, lon: 142.5 }, subRegions: [{ id: "japan-hokkaido-main", name: "Japan Hokkaido", lat: 43.5, lon: 142.5 }] },
        { id: "japan-honshu", name: "Japan Honshu", labelPosition: { lat: 36.5, lon: 138 }, subRegions: [{ id: "japan-honshu-main", name: "Japan Honshu", lat: 36.5, lon: 138 }] },
        { id: "kazakhstan", name: "Kazakhstan", labelPosition: { lat: 43, lon: 77 }, subRegions: [{ id: "kazakhstan-main", name: "Kazakhstan", lat: 43, lon: 77 }] },
      ]
    },
    {
      id: "oceania", name: "Oceania", labelPosition: { lat: -25, lon: 135 },
      regions: [
        { id: "nz-south-island", name: "New Zealand", labelPosition: { lat: -44.5, lon: 169.5 }, subRegions: [{ id: "nz-south-island-main", name: "New Zealand South Island", lat: -44.5, lon: 169.5 }] },
        { id: "australia-victoria", name: "Australia Victoria", labelPosition: { lat: -36.5, lon: 146.5 }, subRegions: [{ id: "australia-victoria-main", name: "Australia Victoria", lat: -36.5, lon: 146.5 }] },
      ]
    },
  ]
};

function getResortsForSubRegion(subRegionId) {
  const words = subRegionId.toLowerCase().split("-").filter(w => w.length > 2);
  return resorts.filter(r => {
    const rRegion = (r.region || "").toLowerCase();
    const rCountry = Array.isArray(r.country) ? r.country.join(",").toLowerCase() : (r.country || "").toLowerCase();
    return words.some(w => rRegion.includes(w) || rCountry.includes(w));
  });
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
    const s = document.createElement("script");
    s.src = src; s.onload = resolve; s.onerror = reject;
    document.head.appendChild(s);
  });
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function GlobalDiscoveryMap() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const projectionRef = useRef(null);
  const pathGenRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  const [libsLoaded, setLibsLoaded] = useState(false);
  const [svgSize, setSvgSize] = useState({ w: 900, h: 520 });
  const [landPaths, setLandPaths] = useState([]);
  const [projectedContinents, setProjectedContinents] = useState([]);
  const [projectedRegions, setProjectedRegions] = useState([]);

  const [zoomLevel, setZoomLevel] = useState("world");
  const [selectedContinent, setSelectedContinent] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedSubRegion, setSelectedSubRegion] = useState(null);
  const [viewBox, setViewBox] = useState(null);

  const [hoveredContinent, setHoveredContinent] = useState(null);
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [tooltipPos, setTooltipPos] = useState(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [svgOpacity, setSvgOpacity] = useState(1);
  const [mapOpacity, setMapOpacity] = useState(0);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Load D3 + TopoJSON
  useEffect(() => {
    async function load() {
      await loadScript("https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js");
      await loadScript("https://cdn.jsdelivr.net/npm/topojson-client@3/dist/topojson-client.min.js");
      const worldData = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then(r => r.json());

      const d3 = window.d3;
      const topojson = window.topojson;
      const container = containerRef.current;
      const w = container?.clientWidth || 900;
      const h = container?.clientHeight || 520;
      setSvgSize({ w, h });
      setViewBox(`0 0 ${w} ${h}`);

      // D3 only for projection math
      const landFeature = topojson.feature(worldData, worldData.objects.land);
      const countriesFeature = topojson.feature(worldData, worldData.objects.countries);
      const projection = d3.geoNaturalEarth1().fitSize([w, h], { type: "Sphere" });
      const pathGen = d3.geoPath().projection(projection);
      projectionRef.current = projection;
      pathGenRef.current = pathGen;

      // Generate land paths (strings only)
      const paths = countriesFeature.features.map(f => pathGen(f)).filter(Boolean);
      setLandPaths(paths);

      // Project continent marker positions
      const projected = HIERARCHY.continents.map(c => {
        const [x, y] = projection([c.labelPosition.lon, c.labelPosition.lat]) || [0, 0];
        return { ...c, svgX: x, svgY: y };
      });
      setProjectedContinents(projected);
      setLibsLoaded(true);
    }
    load();
  }, []);

  // Recompute region projections when continent changes
  useEffect(() => {
    if (!selectedContinent || !projectionRef.current) return;
    const projected = selectedContinent.regions.map(r => {
      const [x, y] = projectionRef.current([r.labelPosition.lon, r.labelPosition.lat]) || [0, 0];
      return { ...r, svgX: x, svgY: y };
    });
    setProjectedRegions(projected);
  }, [selectedContinent]);

  // ── Event handlers ──────────────────────────────────────────────────────────

  function handleContinentClick(continent) {
    setSelectedContinent(continent);
    setZoomLevel("continent");
    setHoveredContinent(null);
    setTooltipPos(null);

    // Zoom viewBox to continent bounds
    const proj = projectionRef.current;
    if (!proj) return;
    const bounds = CONTINENT_BOUNDS[continent.id];
    if (!bounds) return;
    const [x1, y1] = proj([bounds.minLon, bounds.maxLat]) || [0, 0];
    const [x2, y2] = proj([bounds.maxLon, bounds.minLat]) || [svgSize.w, svgSize.h];
    const pad = 40;
    setViewBox(`${x1 - pad} ${y1 - pad} ${(x2 - x1) + pad * 2} ${(y2 - y1) + pad * 2}`);
  }

  function handleContinentHover(continent, e) {
    setHoveredContinent(continent);
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  function handleContinentLeave() {
    setHoveredContinent(null);
    setTooltipPos(null);
  }

  function handleRegionClick(region) {
    setSelectedRegion(region);
    setZoomLevel("region");
    setHoveredRegion(null);
    const proj = projectionRef.current;
    if (!proj) return;
    const [rx, ry] = proj([region.labelPosition.lon, region.labelPosition.lat]) || [0, 0];
    const size = 120;
    setViewBox(`${rx - size} ${ry - size} ${size * 2} ${size * 2}`);
  }

  function handleRegionHover(region, e) {
    setHoveredRegion(region);
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  function handleRegionLeave() {
    setHoveredRegion(null);
    setTooltipPos(null);
  }

  // ── Navigation ──────────────────────────────────────────────────────────────

  function navToWorld() {
    setZoomLevel("world");
    setSelectedContinent(null);
    setSelectedRegion(null);
    setSelectedSubRegion(null);
    setViewBox(`0 0 ${svgSize.w} ${svgSize.h}`);
    setSvgOpacity(1);
  }

  function navToContinent() {
    if (zoomLevel === "map3d" || zoomLevel === "subregion") { backToRegion(); setTimeout(() => { setZoomLevel("continent"); setSelectedRegion(null); }, 500); return; }
    setZoomLevel("continent");
    setSelectedRegion(null);
    setSelectedSubRegion(null);
    if (selectedContinent) handleContinentClick(selectedContinent);
  }

  function navToRegion() {
    if (zoomLevel === "map3d" || zoomLevel === "subregion") { backToRegion(); return; }
    setZoomLevel("region");
    setSelectedSubRegion(null);
  }

  // ── MapTiler transition ──────────────────────────────────────────────────────

  const transitionToMap3D = useCallback(async (subRegion) => {
    setSvgOpacity(0);
    await new Promise(r => setTimeout(r, 400));
    setZoomLevel("subregion");

    await loadScript("https://cdn.maptiler.com/maptiler-sdk-js/v2.0.0/maptiler-sdk.umd.min.js");
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.maptiler.com/maptiler-sdk-js/v2.0.0/maptiler-sdk.css";
    if (!document.querySelector(`link[href="${link.href}"]`)) document.head.appendChild(link);

    await new Promise(r => setTimeout(r, 300));
    const maptilersdk = window.maptilersdk;
    if (!maptilersdk || !document.getElementById("discovery-3d-map")) return;

    maptilersdk.config.apiKey = "lNsV1pOMdNShmVL9tiih";
    const map = new maptilersdk.Map({
      container: "discovery-3d-map",
      style: "https://api.maptiler.com/maps/019c8160-59cd-7579-afc6-753ee61bd724/style.json?key=lNsV1pOMdNShmVL9tiih",
      center: [subRegion.lon, subRegion.lat], zoom: 8, pitch: 45, bearing: -15,
    });
    mapInstanceRef.current = map;

    map.on("load", () => {
      try {
        map.addSource("terrain", { type: "raster-dem", url: "https://api.maptiler.com/tiles/terrain-rgb/tiles.json?key=lNsV1pOMdNShmVL9tiih" });
        map.setTerrain({ source: "terrain", exaggeration: 1.5 });
      } catch {}

      getResortsForSubRegion(subRegion.id).forEach(resort => {
        if (!resort.coordinates?.lon || !resort.coordinates?.lat) return;
        const el = document.createElement("div");
        el.style.cssText = "position:relative;cursor:pointer;";
        const badge = document.createElement("div");
        badge.style.cssText = "width:36px;height:36px;border-radius:50%;background:#070B1E;border:2px solid #FB343D;display:flex;align-items:center;justify-content:center;box-shadow:0 0 12px rgba(251,52,61,0.4);";
        const initials = document.createElement("span");
        initials.style.cssText = "font-size:11px;font-weight:700;color:white;";
        initials.textContent = resort.name.substring(0, 2).toUpperCase();
        badge.appendChild(initials);
        const ptr = document.createElement("div");
        ptr.style.cssText = "width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:7px solid #FB343D;margin:0 auto;";
        const tt = document.createElement("div");
        tt.style.cssText = "position:absolute;bottom:52px;left:50%;transform:translateX(-50%);background:rgba(7,11,30,0.95);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:12px;min-width:180px;backdrop-filter:blur(12px);pointer-events:none;display:none;z-index:100;";
        tt.innerHTML = `<div style="font-weight:700;color:white;font-size:13px;margin-bottom:4px;">${resort.name}</div><div style="color:rgba(255,255,255,0.5);font-size:11px;">${resort.country || ""}</div><a style="color:#FB343D;font-size:11px;font-weight:600;margin-top:6px;display:block;">View resort →</a>`;
        el.addEventListener("mouseenter", () => { tt.style.display = "block"; });
        el.addEventListener("mouseleave", () => { tt.style.display = "none"; });
        el.addEventListener("click", () => { sessionStorage.setItem("peakxp_back_context", "discovery-map"); navigate(`/resort/${resort.id}`); });
        el.appendChild(badge); el.appendChild(ptr); el.appendChild(tt);
        const marker = new maptilersdk.Marker({ element: el }).setLngLat([resort.coordinates.lon, resort.coordinates.lat]).addTo(map);
        markersRef.current.push(marker);
      });
      map.addControl(new maptilersdk.NavigationControl(), "bottom-right");
      map.addControl(new maptilersdk.ScaleControl(), "bottom-left");
    });

    map.on("idle", () => { setMapOpacity(1); setZoomLevel("map3d"); });
  }, [navigate]);

  const backToRegion = useCallback(() => {
    setMapOpacity(0);
    setTimeout(() => {
      if (mapInstanceRef.current) {
        markersRef.current.forEach(m => m.remove());
        markersRef.current = [];
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      setSvgOpacity(1);
      setZoomLevel("region");
      setSelectedSubRegion(null);
    }, 400);
  }, []);

  // ── Render ──────────────────────────────────────────────────────────────────

  const containerClass = isFullscreen
    ? "fixed inset-0 z-50 overflow-hidden"
    : `relative w-full overflow-hidden ${isMobile ? "h-[300px]" : "h-[520px]"}`;

  const subResortCount = selectedSubRegion ? getResortsForSubRegion(selectedSubRegion.id).length : 0;

  return (
    <div ref={containerRef} className={containerClass} style={{ background: "#070B1E" }}>

      {/* React-controlled SVG — no D3 event handlers */}
      {zoomLevel !== "map3d" && (
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          viewBox={viewBox || `0 0 ${svgSize.w} ${svgSize.h}`}
          style={{
            position: "absolute", inset: 0, opacity: svgOpacity,
            transition: "opacity 0.4s, viewBox 0.8s cubic-bezier(0.4,0,0.2,1)",
            display: "block", touchAction: "none"
          }}
        >
          {/* Layer 1: land fills — no pointer events */}
          {landPaths.map((d, i) => (
            <path key={i} d={d} fill="rgba(255,255,255,0.05)" stroke="none" style={{ pointerEvents: "none" }} />
          ))}

          {/* Layer 2: continent markers — pure React events */}
          {projectedContinents.map((continent) => {
            const hovered = hoveredContinent?.id === continent.id;
            return (
              <g
                key={continent.id}
                style={{ cursor: "pointer" }}
                onClick={() => handleContinentClick(continent)}
                onMouseEnter={(e) => handleContinentHover(continent, e)}
                onMouseLeave={handleContinentLeave}
              >
                {/* Pulse ring */}
                <circle
                  cx={continent.svgX} cy={continent.svgY} r={hovered ? 58 : 52}
                  fill="none"
                  stroke={hovered ? "rgba(251,52,61,0.5)" : "rgba(251,52,61,0.2)"}
                  strokeWidth={1}
                  style={{ transition: "all 0.3s ease", filter: hovered ? "drop-shadow(0 0 8px rgba(251,52,61,0.6))" : "none" }}
                />
                {/* Fill circle */}
                <circle
                  cx={continent.svgX} cy={continent.svgY} r={44}
                  fill={hovered ? "rgba(251,52,61,0.2)" : "rgba(251,52,61,0.08)"}
                  stroke="rgba(251,52,61,0.55)" strokeWidth={1.5}
                  style={{ transition: "all 0.3s ease" }}
                />
                {/* Center dot */}
                <circle cx={continent.svgX} cy={continent.svgY} r={6} fill="#FB343D" style={{ pointerEvents: "none" }} />
                {/* Label */}
                <text
                  x={continent.svgX} y={continent.svgY + 26}
                  textAnchor="middle"
                  fill={hovered ? "white" : "rgba(255,255,255,0.8)"}
                  fontSize={11} fontWeight={700}
                  style={{ pointerEvents: "none", transition: "fill 0.2s ease", fontFamily: "var(--font-display)" }}
                >
                  {continent.name}
                </text>
              </g>
            );
          })}

          {/* Layer 3: region markers */}
          {zoomLevel !== "world" && projectedRegions.map((region) => {
            const hovered = hoveredRegion?.id === region.id;
            return (
              <g
                key={region.id}
                style={{ cursor: "pointer" }}
                onClick={() => handleRegionClick(region)}
                onMouseEnter={(e) => handleRegionHover(region, e)}
                onMouseLeave={handleRegionLeave}
              >
                <circle
                  cx={region.svgX} cy={region.svgY} r={hovered ? 30 : 24}
                  fill={hovered ? "rgba(56,148,227,0.22)" : "rgba(56,148,227,0.08)"}
                  stroke={hovered ? "rgba(56,148,227,0.9)" : "rgba(56,148,227,0.5)"}
                  strokeWidth={1.5}
                  style={{ transition: "all 0.3s ease" }}
                />
                <circle cx={region.svgX} cy={region.svgY} r={5} fill="#3894E3" style={{ pointerEvents: "none" }} />
                <text
                  x={region.svgX} y={region.svgY + 20}
                  textAnchor="middle" fill="rgba(255,255,255,0.8)"
                  fontSize={9} fontWeight={700}
                  style={{ pointerEvents: "none", fontFamily: "var(--font-display)" }}
                >
                  {region.name}
                </text>
              </g>
            );
          })}
        </svg>
      )}

      {/* MapTiler 3D map */}
      <div id="discovery-3d-map" style={{ opacity: mapOpacity, transition: "opacity 0.4s", position: "absolute", inset: 0 }} />

      {/* Loading */}
      {!libsLoaded && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-white/10 border-t-peak-red rounded-full animate-spin" />
            <p className="text-white/40 text-xs">Loading map…</p>
          </div>
        </div>
      )}

      {/* Section header */}
      {zoomLevel === "world" && (
        <div className="absolute top-6 left-6 z-20 pointer-events-none">
          <h3 className="font-display font-bold text-white text-2xl">Explore the World</h3>
          <p className="text-white/50 text-sm mt-1">Click any continent to discover ski regions</p>
        </div>
      )}

      {/* Breadcrumb */}
      {zoomLevel !== "world" && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-peak-bg/70 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 whitespace-nowrap">
          <button onClick={navToWorld} className="text-white/60 text-xs font-medium hover:text-white transition-colors">World</button>
          {selectedContinent && (
            <>
              <ChevronRight className="h-3 w-3 text-white/30" />
              {zoomLevel === "continent"
                ? <span className="text-white text-xs font-medium">{selectedContinent.name}</span>
                : <button onClick={navToContinent} className="text-white/60 text-xs font-medium hover:text-white transition-colors">{selectedContinent.name}</button>}
            </>
          )}
          {selectedRegion && (
            <>
              <ChevronRight className="h-3 w-3 text-white/30" />
              {zoomLevel === "region"
                ? <span className="text-white text-xs font-medium">{selectedRegion.name}</span>
                : <button onClick={navToRegion} className="text-white/60 text-xs font-medium hover:text-white transition-colors">{selectedRegion.name}</button>}
            </>
          )}
          {selectedSubRegion && (
            <>
              <ChevronRight className="h-3 w-3 text-white/30" />
              <span className="text-white text-xs font-medium">{selectedSubRegion.name}</span>
            </>
          )}
          {zoomLevel === "map3d" && (
            <>
              <ChevronRight className="h-3 w-3 text-white/30" />
              <span className="text-white text-xs font-medium">Resorts</span>
            </>
          )}
        </div>
      )}

      {/* Resort count chip */}
      {zoomLevel === "map3d" && selectedSubRegion && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-20 bg-peak-bg/70 backdrop-blur-md border border-white/10 text-white text-xs font-medium px-4 py-2 rounded-full pointer-events-none">
          {subResortCount} resort{subResortCount !== 1 ? "s" : ""} in {selectedSubRegion.name}
        </div>
      )}

      {/* Fullscreen buttons */}
      <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
        {isFullscreen && (
          <button onClick={() => setIsFullscreen(false)} className="w-10 h-10 rounded-xl bg-peak-bg/60 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:border-white/25 transition-colors">
            <X className="h-4 w-4 text-white" />
          </button>
        )}
        <button onClick={() => setIsFullscreen(v => !v)} className="w-10 h-10 rounded-xl bg-peak-bg/60 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:border-white/25 transition-colors">
          {isFullscreen ? <Minimize className="h-4 w-4 text-white" /> : <Maximize className="h-4 w-4 text-white" />}
        </button>
      </div>

      {/* Explore button */}
      {!isFullscreen && (
        <button onClick={() => setIsFullscreen(true)}
          className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 transition-all ${
            isMobile ? "bg-peak-red text-white font-semibold px-5 py-3 rounded-full text-sm"
              : "bg-peak-bg/70 backdrop-blur-md border border-white/10 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:border-white/25"
          }`}>
          <Maximize2 className="h-4 w-4" />
          Explore full map
        </button>
      )}

      {/* Tooltip */}
      {(hoveredContinent || hoveredRegion) && tooltipPos && (
        <div style={{
          position: "absolute",
          left: tooltipPos.x + 12,
          top: tooltipPos.y - 40,
          background: "rgba(7,11,30,0.92)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 10,
          padding: "8px 12px",
          color: "white",
          fontSize: 12,
          fontWeight: 600,
          pointerEvents: "none",
          backdropFilter: "blur(12px)",
          zIndex: 40,
          whiteSpace: "nowrap",
        }}>
          {hoveredContinent?.name || hoveredRegion?.name}
          <span style={{ color: "rgba(255,255,255,0.5)", fontWeight: 400, marginLeft: 6 }}>
            {hoveredContinent
              ? HIERARCHY.continents.find(c => c.id === hoveredContinent.id)?.regions.length + " regions"
              : hoveredRegion?.subRegions?.length + " sub-regions"}
          </span>
        </div>
      )}
    </div>
  );
}