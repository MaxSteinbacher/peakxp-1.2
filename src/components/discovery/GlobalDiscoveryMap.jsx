import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Maximize2, Maximize, Minimize, X, ArrowLeft } from "lucide-react";

// ─── Geography data ───────────────────────────────────────────────────────────

const GEO = {
  continents: [
    {
      id: "europe", name: "Europe", lat: 54, lon: 15,
      bounds: { n: 72, s: 35, e: 45, w: -25 },
      regions: [
        {
          id: "alps", name: "Alps", lat: 46.5, lon: 10.5,
          subRegions: [
            { id: "austria-tyrol", name: "Austria Tyrol", lat: 47.3, lon: 11.4 },
            { id: "austria-salzburg", name: "Austria Salzburg", lat: 47.4, lon: 13.2 },
            { id: "austria-vorarlberg", name: "Austria Vorarlberg", lat: 47.2, lon: 9.9 },
            { id: "austria-styria", name: "Austria Styria", lat: 47.4, lon: 14.5 },
            { id: "austria-carinthia", name: "Austria Carinthia", lat: 46.7, lon: 13.8 },
            { id: "switzerland-valais", name: "Switzerland Valais", lat: 46.1, lon: 7.5 },
            { id: "switzerland-graubuenden", name: "Switzerland Graubünden", lat: 46.7, lon: 9.5 },
            { id: "switzerland-bernese", name: "Switzerland Bernese Oberland", lat: 46.6, lon: 7.9 },
            { id: "france-savoie", name: "France Savoie", lat: 45.4, lon: 6.5 },
            { id: "france-haute-savoie", name: "France Haute-Savoie", lat: 46.0, lon: 6.7 },
            { id: "france-hautes-alpes", name: "France Hautes-Alpes", lat: 44.8, lon: 6.3 },
            { id: "italy-alto-adige", name: "Italy Alto Adige", lat: 46.7, lon: 11.5 },
            { id: "italy-trentino", name: "Italy Trentino", lat: 46.1, lon: 11.1 },
            { id: "italy-valle-daosta", name: "Italy Valle d'Aosta", lat: 45.7, lon: 7.3 },
            { id: "italy-lombardy", name: "Italy Lombardy", lat: 46.3, lon: 10.2 },
            { id: "italy-veneto", name: "Italy Veneto", lat: 46.4, lon: 12.1 },
            { id: "italy-piedmont", name: "Italy Piedmont", lat: 44.9, lon: 6.9 },
          ]
        },
        {
          id: "pyrenees", name: "Pyrenees", lat: 42.7, lon: 1.0,
          subRegions: [
            { id: "andorra", name: "Andorra", lat: 42.5, lon: 1.5 },
            { id: "spain-aragon", name: "Spain Aragon", lat: 42.7, lon: -0.4 },
            { id: "spain-catalonia", name: "Spain Catalonia", lat: 42.4, lon: 1.1 },
            { id: "france-hautes-pyrenees", name: "France Hautes-Pyrénées", lat: 42.9, lon: 0.1 },
            { id: "france-ariege", name: "France Ariège", lat: 42.8, lon: 1.5 },
          ]
        },
        { id: "scandinavia", name: "Scandinavia", lat: 62, lon: 15, subRegions: [{ id: "scandinavia-main", name: "Scandinavia", lat: 62, lon: 15 }] },
        { id: "carpathians", name: "Carpathians", lat: 49, lon: 22, subRegions: [{ id: "carpathians-main", name: "Carpathians", lat: 49, lon: 22 }] },
        { id: "caucasus", name: "Caucasus", lat: 42.5, lon: 44, subRegions: [{ id: "caucasus-main", name: "Caucasus", lat: 42.5, lon: 44 }] },
        { id: "scottish-highlands", name: "Scottish Highlands", lat: 57, lon: -4, subRegions: [{ id: "scottish-highlands-main", name: "Scottish Highlands", lat: 57, lon: -4 }] },
      ]
    },
    {
      id: "north-america", name: "North America", lat: 48, lon: -100,
      bounds: { n: 75, s: 15, e: -50, w: -170 },
      regions: [
        { id: "rockies-co-ut", name: "Rockies CO/UT", lat: 39.5, lon: -106, subRegions: [{ id: "rockies-co-ut-main", name: "Rockies Colorado Utah", lat: 39.5, lon: -106 }] },
        { id: "rockies-wy-mt", name: "Rockies WY/MT", lat: 44, lon: -110, subRegions: [{ id: "rockies-wy-mt-main", name: "Rockies Wyoming Montana", lat: 44, lon: -110 }] },
        { id: "sierra-nevada", name: "Sierra Nevada", lat: 38.5, lon: -119.5, subRegions: [{ id: "sierra-nevada-main", name: "Sierra Nevada", lat: 38.5, lon: -119.5 }] },
        { id: "cascades", name: "Cascades", lat: 47.5, lon: -121.5, subRegions: [{ id: "cascades-main", name: "Cascades", lat: 47.5, lon: -121.5 }] },
        { id: "eastern-usa", name: "Eastern USA", lat: 44, lon: -71.5, subRegions: [{ id: "eastern-usa-main", name: "Eastern USA", lat: 44, lon: -71.5 }] },
        { id: "eastern-canada", name: "Eastern Canada", lat: 47, lon: -71, subRegions: [{ id: "eastern-canada-main", name: "Eastern Canada Quebec", lat: 47, lon: -71 }] },
      ]
    },
    {
      id: "south-america", name: "South America", lat: -20, lon: -58,
      bounds: { n: 13, s: -56, e: -34, w: -82 },
      regions: [
        { id: "andes", name: "Andes", lat: -33, lon: -70, subRegions: [{ id: "andes-main", name: "Andes Argentina Chile", lat: -33, lon: -70 }] },
      ]
    },
    {
      id: "asia", name: "Asia", lat: 45, lon: 80,
      bounds: { n: 75, s: 10, e: 145, w: 40 },
      regions: [
        { id: "japan-hokkaido", name: "Japan Hokkaido", lat: 43.5, lon: 142.5, subRegions: [{ id: "japan-hokkaido-main", name: "Japan Hokkaido", lat: 43.5, lon: 142.5 }] },
        { id: "japan-honshu", name: "Japan Honshu", lat: 36.5, lon: 138, subRegions: [{ id: "japan-honshu-main", name: "Japan Honshu", lat: 36.5, lon: 138 }] },
        { id: "kazakhstan", name: "Kazakhstan", lat: 43, lon: 77, subRegions: [{ id: "kazakhstan-main", name: "Kazakhstan", lat: 43, lon: 77 }] },
        { id: "south-korea", name: "South Korea", lat: 37.5, lon: 128.5, subRegions: [{ id: "south-korea-main", name: "South Korea", lat: 37.5, lon: 128.5 }] },
      ]
    },
    {
      id: "oceania", name: "Oceania", lat: -25, lon: 135,
      bounds: { n: -10, s: -48, e: 180, w: 110 },
      regions: [
        { id: "nz-south-island", name: "New Zealand", lat: -44.5, lon: 169.5, subRegions: [{ id: "nz-south-island-main", name: "New Zealand South Island", lat: -44.5, lon: 169.5 }] },
        { id: "australia-victoria", name: "Australia Victoria", lat: -36.5, lon: 146.5, subRegions: [{ id: "australia-victoria-main", name: "Australia Victoria", lat: -36.5, lon: 146.5 }] },
      ]
    },
  ]
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
    const s = document.createElement("script");
    s.src = src; s.onload = resolve; s.onerror = reject;
    document.head.appendChild(s);
  });
}

function getResortCount(subRegionId) {
  if (subRegionId.includes("austria")) return 5;
  if (subRegionId.includes("switzerland")) return 4;
  if (subRegionId.includes("france")) return 5;
  if (subRegionId.includes("italy")) return 4;
  if (subRegionId.includes("andorra")) return 2;
  if (subRegionId.includes("spain")) return 3;
  if (subRegionId.includes("japan")) return 6;
  if (subRegionId.includes("rockies") || subRegionId.includes("sierra") || subRegionId.includes("cascades")) return 4;
  return 2;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function GlobalDiscoveryMap() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const worldDataRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  const [phase, setPhase] = useState("loading");
  const [projection, setProjection] = useState(null);
  const [pathGen, setPathGen] = useState(null);
  const [landPaths, setLandPaths] = useState([]);
  const [svgSize, setSvgSize] = useState({ w: 800, h: 500 });
  const [activeContinent, setActiveContinent] = useState(null);
  const [activeRegion, setActiveRegion] = useState(null);
  const [activeSubRegion, setActiveSubRegion] = useState(null);
  const [zoomTransform, setZoomTransform] = useState({ scale: 1, tx: 0, ty: 0 });
  const [hoverId, setHoverId] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);

  // ── Mount: load D3, TopoJSON, world data ────────────────────────────────────
  useEffect(() => {
    async function init() {
      const rect = containerRef.current?.getBoundingClientRect();
      const w = rect?.width || 800;
      const h = 520;
      setSvgSize({ w, h });

      await loadScript("https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js");
      await loadScript("https://cdn.jsdelivr.net/npm/topojson-client@3/dist/topojson-client.min.js");

      const data = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then(r => r.json());
      worldDataRef.current = data;

      const d3 = window.d3;
      const topojson = window.topojson;

      const landFeature = topojson.feature(data, data.objects.land);
      const proj = d3.geoNaturalEarth1().fitSize([w, h], { type: "Sphere" });
      const pg = d3.geoPath().projection(proj);

      const paths = topojson.feature(data, data.objects.countries).features
        .map(f => pg(f))
        .filter(Boolean);

      setProjection(() => proj);
      setPathGen(() => pg);
      setLandPaths(paths);
      setPhase("world");
    }
    init();
  }, []);

  // ── Project helper ──────────────────────────────────────────────────────────
  function project(lon, lat) {
    if (!projection) return { x: 0, y: 0 };
    const result = projection([lon, lat]);
    if (!result) return { x: 0, y: 0 };
    return { x: result[0], y: result[1] };
  }

  // ── Compute zoom transform for continent bounds ──────────────────────────────
  function getContinentZoom(bounds) {
    if (!projection) return { scale: 1, tx: 0, ty: 0 };
    const pad = 30;
    const nw = projection([bounds.w, bounds.n]);
    const se = projection([bounds.e, bounds.s]);
    if (!nw || !se) return { scale: 1, tx: 0, ty: 0 };
    const boxX = nw[0] - pad;
    const boxY = nw[1] - pad;
    const boxW = se[0] - nw[0] + pad * 2;
    const boxH = se[1] - nw[1] + pad * 2;
    const scale = Math.min(svgSize.w / boxW, svgSize.h / boxH) * 0.9;
    const cx = boxX + boxW / 2;
    const cy = boxY + boxH / 2;
    const tx = svgSize.w / 2 - scale * cx;
    const ty = svgSize.h / 2 - scale * cy;
    return { scale, tx, ty };
  }

  // ── Event handlers (pure React, zero D3) ────────────────────────────────────
  function handleContinentClick(continent) {
    setActiveContinent(continent);
    setPhase("continent");
    setHoverId(null);
    setTooltip(null);
    setZoomTransform(getContinentZoom(continent.bounds));
  }

  function handleRegionClick(region) {
    setActiveRegion(region);
    setPhase("region");
    setHoverId(null);
    setTooltip(null);
    // Zoom into region: centre on it with higher scale
    if (projection) {
      const [rx, ry] = projection([region.lon, region.lat]) || [0, 0];
      const currentScale = zoomTransform.scale;
      const newScale = currentScale * 3;
      const tx = svgSize.w / 2 - newScale * rx;
      const ty = svgSize.h / 2 - newScale * ry;
      setZoomTransform({ scale: newScale, tx, ty });
    }
  }

  function handleSubRegionClick(subRegion) {
    setActiveSubRegion(subRegion);
    setHoverId(null);
    setTooltip(null);
    setTimeout(() => initMapTiler(subRegion), 200);
  }

  function handleBack() {
    if (phase === "map3d") {
      setMapVisible(false);
      setPhase("subregion");
      if (mapInstanceRef.current) {
        try { mapInstanceRef.current.remove(); } catch {}
        markersRef.current.forEach(m => { try { m.remove(); } catch {} });
        markersRef.current = [];
        mapInstanceRef.current = null;
      }
    } else if (phase === "subregion") {
      setPhase("region");
      setActiveSubRegion(null);
    } else if (phase === "region") {
      setPhase("continent");
      setActiveRegion(null);
      if (activeContinent) setZoomTransform(getContinentZoom(activeContinent.bounds));
    } else if (phase === "continent") {
      setPhase("world");
      setActiveContinent(null);
      setZoomTransform({ scale: 1, tx: 0, ty: 0 });
    }
  }

  function handleMarkerMouseEnter(id, name, count, clientX, clientY) {
    setHoverId(id);
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) setTooltip({ x: clientX - rect.left, y: clientY - rect.top, text: name, sub: count > 0 ? `${count} resorts` : "" });
  }

  function handleMarkerMouseLeave() {
    setHoverId(null);
    setTooltip(null);
  }

  // ── MapTiler init ────────────────────────────────────────────────────────────
  async function initMapTiler(subRegion) {
    setPhase("map3d");
    await loadScript("https://cdn.maptiler.com/maptiler-sdk-js/v2.0.0/maptiler-sdk.umd.min.js");
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.maptiler.com/maptiler-sdk-js/v2.0.0/maptiler-sdk.css";
    if (!document.querySelector(`link[href="${link.href}"]`)) document.head.appendChild(link);
    await new Promise(r => setTimeout(r, 100));

    const maptilersdk = window.maptilersdk;
    const container = document.getElementById("maptiler-discovery-container");
    if (!maptilersdk || !container) return;

    maptilersdk.config.apiKey = "lNsV1pOMdNShmVL9tiih";
    const map = new maptilersdk.Map({
      container,
      style: "https://api.maptiler.com/maps/019c8160-59cd-7579-afc6-753ee61bd724/style.json?key=lNsV1pOMdNShmVL9tiih",
      center: [subRegion.lon, subRegion.lat],
      zoom: 10, pitch: 55, bearing: -15,
    });
    mapInstanceRef.current = map;

    map.on("load", () => {
      try {
        map.addSource("terrain", { type: "raster-dem", url: "https://api.maptiler.com/tiles/terrain-rgb/tiles.json?key=lNsV1pOMdNShmVL9tiih" });
        map.setTerrain({ source: "terrain", exaggeration: 1.5 });
      } catch {}
      map.addControl(new maptilersdk.NavigationControl(), "bottom-right");
    });

    map.on("idle", () => setMapVisible(true));
  }

  // ── SVG transform string ─────────────────────────────────────────────────────
  const svgTransformStyle = phase === "world"
    ? "none"
    : `translate(${zoomTransform.tx}px, ${zoomTransform.ty}px) scale(${zoomTransform.scale})`;

  const containerHeight = isFullscreen ? "100vh" : "520px";

  // ── Breadcrumb ────────────────────────────────────────────────────────────────
  function Breadcrumb() {
    if (phase === "world" || phase === "loading") return null;
    return (
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 text-xs whitespace-nowrap">
        <button onClick={() => { setPhase("world"); setActiveContinent(null); setActiveRegion(null); setActiveSubRegion(null); setZoomTransform({ scale: 1, tx: 0, ty: 0 }); if (phase === "map3d") handleBack(); }} className="text-white/60 hover:text-white transition-colors">World</button>
        {activeContinent && (
          <>
            <ChevronRight className="h-3 w-3 text-white/30" />
            {phase === "continent"
              ? <span className="text-white font-medium">{activeContinent.name}</span>
              : <button onClick={() => { setPhase("continent"); setActiveRegion(null); setActiveSubRegion(null); setZoomTransform(getContinentZoom(activeContinent.bounds)); if (phase === "map3d") { setMapVisible(false); if (mapInstanceRef.current) { try { mapInstanceRef.current.remove(); } catch {} mapInstanceRef.current = null; } } }} className="text-white/60 hover:text-white transition-colors">{activeContinent.name}</button>}
          </>
        )}
        {activeRegion && (
          <>
            <ChevronRight className="h-3 w-3 text-white/30" />
            {phase === "region"
              ? <span className="text-white font-medium">{activeRegion.name}</span>
              : <button onClick={() => { setPhase("region"); setActiveSubRegion(null); if (phase === "map3d") { setMapVisible(false); if (mapInstanceRef.current) { try { mapInstanceRef.current.remove(); } catch {} mapInstanceRef.current = null; } } }} className="text-white/60 hover:text-white transition-colors">{activeRegion.name}</button>}
          </>
        )}
        {activeSubRegion && (
          <>
            <ChevronRight className="h-3 w-3 text-white/30" />
            <span className="text-white font-medium">{activeSubRegion.name}</span>
          </>
        )}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", overflow: "hidden", borderRadius: 16, background: "#070B1E", height: containerHeight }}
    >
      {/* Loading */}
      {phase === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-white/10 border-t-peak-red rounded-full animate-spin" />
            <p className="text-white/40 text-xs">Loading map…</p>
          </div>
        </div>
      )}

      {/* SVG layer */}
      {phase !== "map3d" && (
        <svg
          width={svgSize.w}
          height={svgSize.h}
          style={{
            position: "absolute", inset: 0, display: "block",
            transformOrigin: "0 0",
            transform: svgTransformStyle,
            transition: "transform 0.8s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          {/* Land fills */}
          <g>
            {landPaths.map((d, i) => (
              <path key={i} d={d} fill="rgba(255,255,255,0.06)" stroke="none" style={{ pointerEvents: "none" }} />
            ))}
          </g>

          {/* Markers */}
          <g>
            {/* World: continent markers */}
            {phase === "world" && GEO.continents.map(continent => {
              const pos = project(continent.lon, continent.lat);
              const hovered = hoverId === continent.id;
              return (
                <g
                  key={continent.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleContinentClick(continent)}
                  onMouseEnter={e => handleMarkerMouseEnter(continent.id, continent.name, 0, e.clientX, e.clientY)}
                  onMouseLeave={handleMarkerMouseLeave}
                >
                  {/* Glow ring */}
                  <circle
                    cx={pos.x} cy={pos.y} r={52}
                    fill="none"
                    stroke={hovered ? "rgba(251,52,61,0.5)" : "rgba(251,52,61,0.2)"}
                    strokeWidth={1}
                    style={{ transition: "all 0.25s ease", filter: hovered ? "drop-shadow(0 0 10px rgba(251,52,61,0.6))" : "none" }}
                  />
                  {/* Fill */}
                  <circle
                    cx={pos.x} cy={pos.y} r={44}
                    fill={hovered ? "rgba(251,52,61,0.2)" : "rgba(251,52,61,0.08)"}
                    stroke={hovered ? "rgba(251,52,61,0.9)" : "rgba(251,52,61,0.45)"}
                    strokeWidth={1.5}
                    style={{ transition: "all 0.25s ease" }}
                  />
                  {/* Dot */}
                  <circle cx={pos.x} cy={pos.y} r={6} fill="#FB343D" style={{ pointerEvents: "none" }} />
                  {/* Label */}
                  <text
                    x={pos.x} y={pos.y + 30}
                    textAnchor="middle"
                    fill={hovered ? "white" : "rgba(255,255,255,0.75)"}
                    fontSize={11} fontWeight={600}
                    style={{ pointerEvents: "none", transition: "fill 0.2s ease", fontFamily: "var(--font-display)" }}
                  >
                    {continent.name}
                  </text>
                </g>
              );
            })}

            {/* Continent: region markers */}
            {phase === "continent" && activeContinent?.regions.map(region => {
              const pos = project(region.lon, region.lat);
              const hovered = hoverId === region.id;
              return (
                <g
                  key={region.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleRegionClick(region)}
                  onMouseEnter={e => handleMarkerMouseEnter(region.id, region.name, 0, e.clientX, e.clientY)}
                  onMouseLeave={handleMarkerMouseLeave}
                >
                  <circle
                    cx={pos.x} cy={pos.y} r={hovered ? 38 : 32}
                    fill={hovered ? "rgba(56,148,227,0.22)" : "rgba(56,148,227,0.1)"}
                    stroke={hovered ? "rgba(56,148,227,0.95)" : "rgba(56,148,227,0.5)"}
                    strokeWidth={1.5}
                    style={{ transition: "all 0.25s ease", filter: hovered ? "drop-shadow(0 0 8px rgba(56,148,227,0.6))" : "none" }}
                  />
                  <circle cx={pos.x} cy={pos.y} r={5} fill="#3894E3" style={{ pointerEvents: "none" }} />
                  <text
                    x={pos.x} y={pos.y + 22}
                    textAnchor="middle"
                    fill={hovered ? "white" : "rgba(255,255,255,0.75)"}
                    fontSize={10} fontWeight={600}
                    style={{ pointerEvents: "none", fontFamily: "var(--font-display)" }}
                  >
                    {region.name}
                  </text>
                </g>
              );
            })}

            {/* Region: subregion markers */}
            {phase === "region" && activeRegion?.subRegions.map(sr => {
              const pos = project(sr.lon, sr.lat);
              const hovered = hoverId === sr.id;
              const count = getResortCount(sr.id);
              return (
                <g
                  key={sr.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSubRegionClick(sr)}
                  onMouseEnter={e => handleMarkerMouseEnter(sr.id, sr.name, count, e.clientX, e.clientY)}
                  onMouseLeave={handleMarkerMouseLeave}
                >
                  <circle
                    cx={pos.x} cy={pos.y} r={hovered ? 30 : 24}
                    fill={hovered ? "rgba(62,207,142,0.22)" : "rgba(62,207,142,0.08)"}
                    stroke={hovered ? "rgba(62,207,142,0.95)" : "rgba(62,207,142,0.45)"}
                    strokeWidth={1.5}
                    style={{ transition: "all 0.25s ease", filter: hovered ? "drop-shadow(0 0 8px rgba(62,207,142,0.5))" : "none" }}
                  />
                  <circle cx={pos.x} cy={pos.y} r={4} fill="#3ECF8E" style={{ pointerEvents: "none" }} />
                  <text
                    x={pos.x} y={pos.y + 18}
                    textAnchor="middle"
                    fill={hovered ? "white" : "rgba(255,255,255,0.7)"}
                    fontSize={9} fontWeight={600}
                    style={{ pointerEvents: "none", fontFamily: "var(--font-display)" }}
                  >
                    {sr.name.split(" ").slice(-2).join(" ")}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      )}

      {/* MapTiler container */}
      <div
        id="maptiler-discovery-container"
        style={{
          position: "absolute", inset: 0,
          opacity: mapVisible ? 1 : 0,
          transition: "opacity 0.5s ease",
          pointerEvents: phase === "map3d" ? "all" : "none",
        }}
      />

      {/* Tooltip */}
      {tooltip && (
        <div
          style={{
            position: "absolute",
            left: tooltip.x + 12,
            top: tooltip.y - 50,
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
          }}
        >
          {tooltip.text}
          {tooltip.sub && (
            <span style={{ color: "rgba(255,255,255,0.5)", fontWeight: 400, marginLeft: 6 }}>{tooltip.sub}</span>
          )}
        </div>
      )}

      {/* Section header */}
      {phase === "world" && (
        <div className="absolute top-6 left-6 z-20 pointer-events-none">
          <h3 className="font-display font-bold text-white text-2xl">Explore the World</h3>
          <p className="text-white/50 text-sm mt-1">Click a continent to discover ski regions</p>
        </div>
      )}

      {/* Breadcrumb */}
      <Breadcrumb />

      {/* Back button */}
      {phase !== "world" && phase !== "loading" && (
        <button
          onClick={handleBack}
          className="absolute bottom-6 left-6 z-30 flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 text-white text-xs font-medium hover:border-white/30 transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          Back
        </button>
      )}

      {/* Fullscreen + explore buttons */}
      <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
        {isFullscreen && (
          <button onClick={() => setIsFullscreen(false)} className="w-10 h-10 rounded-xl bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:border-white/25 transition-colors">
            <X className="h-4 w-4 text-white" />
          </button>
        )}
        <button onClick={() => setIsFullscreen(v => !v)} className="w-10 h-10 rounded-xl bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:border-white/25 transition-colors">
          {isFullscreen ? <Minimize className="h-4 w-4 text-white" /> : <Maximize className="h-4 w-4 text-white" />}
        </button>
      </div>

      {!isFullscreen && phase === "world" && (
        <button
          onClick={() => setIsFullscreen(true)}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:border-white/25 transition-colors"
        >
          <Maximize2 className="h-4 w-4" />
          Explore full map
        </button>
      )}
    </div>
  );
}