import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, X, ArrowLeft } from "lucide-react";
import { resorts } from "../../lib/data";
import { useT } from "../../lib/i18n";

// ─── Geography data ───────────────────────────────────────────────────────────

const GEO = {
  continents: [
    {
      id: "europe", name: "Europe", lat: 54, lon: 15,
      bounds: { n: 72, s: 35, e: 45, w: -25 },
      regions: [
        {
          id: "alps", name: "Alps", lat: 46.8, lon: 10.2, bounds: { n: 48.5, s: 43.5, e: 16.5, w: 5.5 },
          subRegions: [
            // Austria — 3 natural ski identities
            { id: "at-vorarlberg", name: "Vorarlberg", lat: 47.35, lon: 9.90, resortCount: 6, flag: "🇦🇹", countryFilter: "Austria", regionKeywords: ["vorarlberg"] },
            { id: "at-tyrol", name: "Tyrol", lat: 47.30, lon: 11.40, resortCount: 21, flag: "🇦🇹", countryFilter: "Austria", regionKeywords: ["tyrol"] },
            { id: "at-salzburg", name: "Salzburg", lat: 47.55, lon: 13.20, resortCount: 10, flag: "🇦🇹", countryFilter: "Austria", regionKeywords: ["salzburg"] },
            { id: "at-south", name: "Carinthia & Styria", lat: 47.00, lon: 14.50, resortCount: 11, flag: "🇦🇹", countryFilter: "Austria", regionKeywords: ["carinthia","styria","lower austria","upper austria"] },
            // Switzerland — 2 distinct arcs
            { id: "ch-west", name: "Valais & Vaud", lat: 46.35, lon: 7.30, resortCount: 14, flag: "🇨🇭", countryFilter: "Switzerland", regionKeywords: ["valais","vaud","bernese","obwalden","uri","schwyz","st. gallen"] },
            { id: "ch-east", name: "Graubünden", lat: 46.70, lon: 9.90, resortCount: 6, flag: "🇨🇭", countryFilter: "Switzerland", regionKeywords: ["graubunden","graubünden"] },
            // France — 3 ski heartlands
            { id: "fr-savoie", name: "Savoie", lat: 45.30, lon: 6.50, resortCount: 11, flag: "🇫🇷", countryFilter: "France", regionKeywords: ["savoie"] },
            { id: "fr-haute-savoie", name: "Haute-Savoie", lat: 46.10, lon: 6.35, resortCount: 5, flag: "🇫🇷", countryFilter: "France", regionKeywords: ["haute-savoie","haute savoie"] },
            { id: "fr-south", name: "Southern Alps", lat: 44.70, lon: 6.20, resortCount: 8, flag: "🇫🇷", countryFilter: "France", regionKeywords: ["hautes-alpes","hautes alpes","isere","alpes-maritimes"] },
            // Italy — 4 alpine identities
            { id: "it-alto-adige", name: "South Tyrol", lat: 46.55, lon: 11.55, resortCount: 8, flag: "🇮🇹", countryFilter: "Italy", regionKeywords: ["alto adige"] },
            { id: "it-trentino", name: "Trentino", lat: 46.10, lon: 11.00, resortCount: 7, flag: "🇮🇹", countryFilter: "Italy", regionKeywords: ["trentino","lombardy"] },
            { id: "it-veneto", name: "Veneto & Dolomites", lat: 46.40, lon: 12.20, resortCount: 2, flag: "🇮🇹", countryFilter: "Italy", regionKeywords: ["veneto"] },
            { id: "it-west", name: "Valle d'Aosta & Piedmont", lat: 45.50, lon: 6.95, resortCount: 7, flag: "🇮🇹", countryFilter: "Italy", regionKeywords: ["aosta","piedmont"] },
          ]
        },
        {
          id: "pyrenees", name: "Pyrenees", comingSoon: true, lat: 42.7, lon: 0.5,
          subRegions: [
            { id: "andorra", name: "Andorra", lat: 42.5, lon: 1.5 },
            { id: "spain-aragon", name: "Spain Aragon", lat: 42.7, lon: -0.4 },
            { id: "spain-catalonia", name: "Spain Catalonia", lat: 42.4, lon: 1.1 },
            { id: "france-hautes-pyrenees", name: "France Hautes-Pyrénées", lat: 42.9, lon: 0.1 },
            { id: "france-ariege", name: "France Ariège", lat: 42.8, lon: 1.5 },
          ]
        },
        { id: "scandinavia", name: "Scandinavia", comingSoon: true, lat: 65.0, lon: 17.0, subRegions: [{ id: "scandinavia-main", name: "Scandinavia", lat: 62, lon: 15 }] },
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
    if (document.querySelector('script[src="' + src + '"]')) { resolve(); return; }
    const s = document.createElement("script");
    s.src = src; s.onload = resolve; s.onerror = reject;
    document.head.appendChild(s);
  });
}

function getResortCount(subRegionId) {
  const counts = {
    "at-vorarlberg": 6, "at-tyrol": 21, "at-salzburg": 10, "at-south": 11,
    "ch-west": 14, "ch-east": 6,
    "fr-savoie": 11, "fr-haute-savoie": 5, "fr-south": 8,
    "it-alto-adige": 8, "it-trentino": 7, "it-veneto": 2, "it-west": 7,
  };
  if (counts[subRegionId] !== undefined) return counts[subRegionId];
  if (subRegionId.includes("japan")) return 6;
  if (subRegionId.includes("rockies") || subRegionId.includes("sierra") || subRegionId.includes("cascades")) return 4;
  return 2;
}

function getResortsForSubRegion(subRegion) {
  if (!subRegion) return [];
  // Use regionKeywords + countryFilter for precise matching
  if (subRegion.regionKeywords && subRegion.countryFilter) {
    return resorts.filter(r => {
      const country = Array.isArray(r.country) ? r.country.join(" ") : (r.country || "");
      const region = (r.region || "").toLowerCase();
      if (!country.includes(subRegion.countryFilter)) return false;
      return subRegion.regionKeywords.some(kw => region.includes(kw.toLowerCase()));
    }).slice(0, 30);
  }
  const nameLower = subRegion.name.toLowerCase();
  const words = nameLower.split(/[\s\-_]+/).filter(w => w.length > 3);
  return resorts.filter(r => {
    const region = (r.region || "").toLowerCase();
    const country = Array.isArray(r.country) ? r.country.join(" ").toLowerCase() : (r.country || "").toLowerCase();
    return words.some(w => region.includes(w) || country.includes(w));
  }).slice(0, 20);
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function GlobalDiscoveryMap() {
  const navigate = useNavigate();
  const t = useT();
  const containerRef = useRef(null);
  const worldDataRef = useRef(null);
  const projRef = useRef(null);
  const prevTransformRef = useRef("");

  const [phase, setPhase] = useState("loading");
  const [landPaths, setLandPaths] = useState([]);
  const [countryBorderPath, setCountryBorderPath] = useState("");
  const [coastlinePath, setCoastlinePath] = useState("");
  const [svgSize, setSvgSize] = useState({ w: 800, h: 500 });
  const [activeContinent, setActiveContinent] = useState(null);
  const [activeRegion, setActiveRegion] = useState(null);
  const [activeSubRegion, setActiveSubRegion] = useState(null);
  const [svgTransform, setSvgTransform] = useState("");
  const [hoverId, setHoverId] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const [svgTransitionDone, setSvgTransitionDone] = useState(true);

  // ── Mount ────────────────────────────────────────────────────────────────────
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

      const proj = d3.geoNaturalEarth1().fitSize([w, h], { type: "Sphere" });
      const pg = d3.geoPath().projection(proj);
      projRef.current = proj;

      // Land fills
      const lp = topojson.feature(data, data.objects.land).features.map(f => pg(f)).filter(Boolean);
      setLandPaths(lp);

      // Country borders (internal only)
      const borderMesh = topojson.mesh(data, data.objects.countries, (a, b) => a !== b);
      setCountryBorderPath(pg(borderMesh) || "");

      // Coastlines
      const coastMesh = topojson.mesh(data, data.objects.countries, (a, b) => a === b);
      setCoastlinePath(pg(coastMesh) || "");

      setPhase("world");
    }
    init();
  }, []);

  // ── Projection helpers ───────────────────────────────────────────────────────
  function project(lon, lat) {
    if (!projRef.current) return { x: 0, y: 0 };
    const r = projRef.current([lon, lat]);
    if (!r) return { x: 0, y: 0 };
    return { x: r[0], y: r[1] };
  }

  function getContinentTransform(bounds, factor = 0.82) {
    if (!projRef.current) return "";
    const nw = projRef.current([bounds.w, bounds.n]);
    const ne = projRef.current([bounds.e, bounds.n]);
    const sw = projRef.current([bounds.w, bounds.s]);
    const se = projRef.current([bounds.e, bounds.s]);
    if (!nw || !ne || !sw || !se) return "";
    const boxCenterX = (nw[0] + se[0]) / 2;
    const boxCenterY = (nw[1] + se[1]) / 2;
    const boxW = Math.abs(ne[0] - nw[0]);
    const boxH = Math.abs(sw[1] - nw[1]);
    const S = Math.min(svgSize.w / boxW, svgSize.h / boxH) * factor;
    const tx = svgSize.w / 2 / S - boxCenterX;
    const ty = svgSize.h / 2 / S - boxCenterY;
    return "scale(" + S + ") translate(" + tx + "px, " + ty + "px)";
  }

  // ── Event handlers ───────────────────────────────────────────────────────────
  function handleContinentClick(continent) {
    setActiveContinent(continent);
    setPhase("continent");
    setHoverId(null);
    setTooltip(null);
    setSvgTransform(getContinentTransform(continent.bounds));
  }

  function handleRegionClick(region) {
    setActiveRegion(region);
    setPhase("region");
    setHoverId(null);
    setTooltip(null);
    prevTransformRef.current = svgTransform;
    if (region.bounds) {
      // Use tight factor (0.72) so the region fills the viewport
      setSvgTransitionDone(false);
      setSvgTransform(getContinentTransform(region.bounds, 0.62));
      setTimeout(() => setSvgTransitionDone(true), 900);
    } else if (projRef.current) {
      // For regions without explicit bounds, zoom tightly on their center
      const pos = projRef.current([region.lon, region.lat]);
      if (pos) {
        const S = Math.min(svgSize.w / 200, svgSize.h / 150) * 4.5;
        const tx = svgSize.w / 2 / S - pos[0];
        const ty = svgSize.h / 2 / S - pos[1];
        setSvgTransform("scale(" + S + ") translate(" + tx + "px, " + ty + "px)");
      }
    }
  }


  function handleSubRegionClick(subRegion) {
    setActiveSubRegion(subRegion);
    setHoverId(null);
    setTooltip(null);
    setPhase("map3d");
  }

  function handleBack() {
    if (phase === "map3d") {
      setPhase("region");
    } else if (phase === "subregion") {
      setPhase("region");
      setActiveSubRegion(null);
    } else if (phase === "region") {
      setPhase("continent");
      setActiveRegion(null);
      setSvgTransform(prevTransformRef.current || (activeContinent ? getContinentTransform(activeContinent.bounds) : ""));
    } else if (phase === "continent") {
      setPhase("world");
      setActiveContinent(null);
      setSvgTransform("");
    }
  }

  function handleMarkerMouseEnter(id, name, count, clientX, clientY) {
    setHoverId(id);
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) setTooltip({ x: clientX - rect.left, y: clientY - rect.top, text: name, sub: count > 0 ? count + " resorts" : "" });
  }

  function handleMarkerMouseLeave() {
    setHoverId(null);
    setTooltip(null);
  }

  function getRegionPositions(regions) {
    return regions.map(r => { const p = project(r.lon, r.lat); return { ...r, px: p.x, py: p.y }; });
  }

  function getSubRegionPositions(subRegions) {
    return subRegions.map(sr => {
      const p = project(sr.lon, sr.lat);
      return { ...sr, px: p.x, py: p.y };
    });
  }

  // Convert SVG-space coords to screen-space coords using the current CSS transform
  // svgTransform is like "scale(S) translate(tx, ty)" 
  function svgToScreen(px, py) {
    if (!svgTransform) return { x: px, y: py };
    const scaleMatch = svgTransform.match(/scale[(]([^)]+)[)]/);
    const translateMatch = svgTransform.match(/translate[(]([^p]+)px,\s*([^p]+)px[)]/);
    if (!scaleMatch) return { x: px, y: py };
    const S = parseFloat(scaleMatch[1]);
    const tx = translateMatch ? parseFloat(translateMatch[1]) : 0;
    const ty = translateMatch ? parseFloat(translateMatch[2]) : 0;
    return {
      x: (px + tx) * S,
      y: (py + ty) * S,
    };
  }

  const svgStyle = {
    position: "absolute", inset: 0, display: "block",
    transformOrigin: "0 0",
    transform: svgTransform || "none",
    transition: "transform 0.8s cubic-bezier(0.4,0,0.2,1)",
  };

  const containerHeight = "520px";

  return (
    <div ref={containerRef} style={{ position: "relative", overflow: "hidden", borderRadius: 16, background: "#070B1E", height: containerHeight, clipPath: "inset(0 round 16px)" }}>

      {/* Loading */}
      {phase === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-white/10 border-t-peak-red rounded-full animate-spin" />
            <p className="text-white/40 text-xs">Loading map…</p>
          </div>
        </div>
      )}

      {/* SVG map */}
      {phase !== "map3d" && (
        <svg width={svgSize.w} height={svgSize.h} style={svgStyle}>

          {/* Layer 1: Land fills */}
          <g>
            {landPaths.map((d, i) => (
              <path key={i} d={d} fill="rgba(255,255,255,0.06)" stroke="none" style={{ pointerEvents: "none" }} />
            ))}
          </g>

          {/* Layer 2: Country borders */}
          {countryBorderPath && (
            <path d={countryBorderPath} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth={0.4} style={{ pointerEvents: "none" }} />
          )}

          {/* Layer 3: Coastlines */}
          {coastlinePath && (
            <path d={coastlinePath} fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth={0.7} style={{ pointerEvents: "none" }} />
          )}

          {/* Markers */}
          <g>
            {/* World: continent markers */}
            {phase === "world" && GEO.continents.map(continent => {
              const pos = project(continent.lon, continent.lat);
              const isEurope = continent.id === "europe";
              const hovered = hoverId === continent.id && isEurope;

              if (isEurope) {
                return (
                  <g
                    key={continent.id}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleContinentClick(continent)}
                    onMouseEnter={e => handleMarkerMouseEnter(continent.id, continent.name, 0, e.clientX, e.clientY)}
                    onMouseLeave={handleMarkerMouseLeave}
                  >
                    <circle
                      cx={pos.x} cy={pos.y} r={30}
                      fill={hovered ? "rgba(251,52,61,0.2)" : "rgba(251,52,61,0.08)"}
                      stroke={hovered ? "rgba(251,52,61,0.9)" : "rgba(251,52,61,0.45)"}
                      strokeWidth={1.5}
                      style={{ transition: "all 0.25s ease", filter: hovered ? "drop-shadow(0 0 10px rgba(251,52,61,0.6))" : "none" }}
                    />
                    <circle cx={pos.x} cy={pos.y} r={6} fill="#FB343D" style={{ pointerEvents: "none" }} />
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
              }

              // Non-Europe: coming soon, no hover/click
              return (
                <g key={continent.id} style={{ cursor: "default" }}>
                  <text x={pos.x} y={pos.y - 35} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize={9} fontWeight={500} style={{ pointerEvents: "none" }}>
                    {t('coming_soon')}
                  </text>
                  <circle cx={pos.x} cy={pos.y} r={30} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" strokeWidth={1.5} style={{ pointerEvents: "none" }} />
                  <circle cx={pos.x} cy={pos.y} r={6} fill="rgba(255,255,255,0.3)" style={{ pointerEvents: "none" }} />
                  <text
                    x={pos.x} y={pos.y + 30}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.35)"
                    fontSize={11} fontWeight={600}
                    style={{ pointerEvents: "none", fontFamily: "var(--font-display)" }}
                  >
                    {continent.name}
                  </text>
                </g>
              );
            })}

            {/* Continent: region markers */}
            {phase === "continent" && activeContinent && getRegionPositions(activeContinent.regions).map(region => {
              const hovered = hoverId === region.id;
              const isComingSoon = !!region.comingSoon;
              if (isComingSoon) {
                return (
                  <g key={region.id} style={{ cursor: "default", opacity: 0.45 }}>
                    <circle cx={region.px} cy={region.py} r={4}
                      fill="rgba(255,255,255,0.15)" stroke="none"
                      style={{ pointerEvents: "none" }} />
                    <text x={region.px} y={region.py + 13} textAnchor="middle"
                      fill="rgba(255,255,255,0.4)" fontSize={8} fontWeight={600}
                      style={{ pointerEvents: "none", fontFamily: "var(--font-display)" }}>{region.name}</text>
                    <text x={region.px} y={region.py + 22} textAnchor="middle"
                      fill="rgba(255,255,255,0.25)" fontSize={6} fontWeight={400}
                      style={{ pointerEvents: "none" }}>{t("coming_soon")}</text>
                  </g>
                );
              }
              return (
                <g
                  key={region.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleRegionClick(region)}
                  onMouseEnter={e => handleMarkerMouseEnter(region.id, region.name, 0, e.clientX, e.clientY)}
                  onMouseLeave={handleMarkerMouseLeave}
                >
                  <circle
                    cx={region.px} cy={region.py} r={10}
                    fill={hovered ? "rgba(56,148,227,0.22)" : "rgba(56,148,227,0.1)"}
                    stroke={hovered ? "rgba(56,148,227,0.95)" : "rgba(56,148,227,0.5)"}
                    strokeWidth={1.5}
                    style={{ transition: "all 0.25s ease", filter: hovered ? "drop-shadow(0 0 8px rgba(56,148,227,0.6))" : "none" }}
                  />
                  <circle cx={region.px} cy={region.py} r={3.5} fill="#3894E3" style={{ pointerEvents: "none" }} />
                  <text
                    x={region.px} y={region.py + 17}
                    textAnchor="middle"
                    fill={hovered ? "white" : "rgba(255,255,255,0.75)"}
                    fontSize={9} fontWeight={600}
                    style={{ pointerEvents: "none", fontFamily: "var(--font-display)" }}
                  >
                    {region.name}
                  </text>
                </g>
              );
            })}

            {/* Region: subRegion markers rendered in SVG space but tiny — screen overlay handles labels */}
            {phase === "region" && activeRegion && getSubRegionPositions(activeRegion.subRegions).map(sr => {
              return (
                <circle key={sr.id} cx={sr.px} cy={sr.py} r={1.5}
                  fill="rgba(62,207,142,0.6)" style={{ pointerEvents: "none" }} />
              );
            })}
          </g>
        </svg>
      )}

      {/* Subregion bubbles overlay — only shown after pan transition finishes */}
      {phase === "region" && activeRegion && svgTransitionDone && (() => {
        const positions = getSubRegionPositions(activeRegion.subRegions);
        return positions.map(sr => {
          const screen = svgToScreen(sr.px, sr.py);
          const isHov = hoverId === sr.id;
          const BUBBLE_R = 28; // fixed screen pixels
          return (
            <div
              key={sr.id}
              style={{
                position: "absolute",
                left: screen.x - BUBBLE_R,
                top: screen.y - BUBBLE_R,
                width: BUBBLE_R * 2,
                height: BUBBLE_R * 2,
                cursor: "pointer",
                zIndex: isHov ? 20 : 10,
                transition: "transform 0.15s ease",
                transform: isHov ? "scale(1.12)" : "scale(1)",
              }}
              onClick={() => handleSubRegionClick(sr)}
              onMouseEnter={e => { setHoverId(sr.id); const rect = containerRef.current?.getBoundingClientRect(); if (rect) setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top, text: sr.name, sub: sr.resortCount ? sr.resortCount + " resorts" : "" }); }}
              onMouseLeave={() => { setHoverId(null); setTooltip(null); }}
            >
              {/* Circle */}
              <div style={{
                position: "absolute", inset: 0, borderRadius: "50%",
                background: isHov ? "rgba(62,207,142,0.35)" : "rgba(62,207,142,0.18)",
                border: `1.5px solid ${isHov ? "rgba(62,207,142,0.9)" : "rgba(62,207,142,0.5)"}`,
                boxShadow: isHov ? "0 0 14px rgba(62,207,142,0.5)" : "none",
                transition: "all 0.2s ease",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                gap: 1,
              }}>
                {sr.flag && (
                  <span style={{ fontSize: 13, lineHeight: 1 }}>{sr.flag}</span>
                )}
                <span style={{
                  color: isHov ? "white" : "rgba(255,255,255,0.85)",
                  fontSize: 7,
                  fontWeight: 700,
                  fontFamily: "var(--font-display)",
                  textAlign: "center",
                  lineHeight: 1.1,
                  letterSpacing: "0.02em",
                  maxWidth: BUBBLE_R * 1.6,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}>
                  {sr.name}
                </span>
              </div>
            </div>
          );
        });
      })()}

      {/* Resort grid for map3d phase — fast 2D, click through to resort detail */}
      {phase === "map3d" && activeSubRegion && (() => {
        const subResorts = getResortsForSubRegion(activeSubRegion);
        return (
          <div style={{ position: "absolute", inset: 0, overflowY: "auto", background: "#070B1E", padding: "24px" }}>
            <div style={{ marginBottom: 16 }}>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginBottom: 4 }}>
                {activeSubRegion.flag} {activeSubRegion.name}
              </p>
              <h3 style={{ color: "white", fontWeight: 700, fontSize: 18, fontFamily: "var(--font-display)" }}>
                {subResorts.length} ski resorts
              </h3>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
              {subResorts.map(resort => (
                <div key={resort.id}
                  onClick={() => navigate("/resort/" + resort.id)}
                  style={{
                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 12, overflow: "hidden", cursor: "pointer",
                    transition: "border-color 0.15s ease, transform 0.15s ease",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(56,148,227,0.5)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div style={{ height: 90, overflow: "hidden", background: "rgba(255,255,255,0.04)" }}>
                    {resort.image ? (
                      <img src={resort.image} alt={resort.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 28 }}>{activeSubRegion.flag}</span>
                      </div>
                    )}
                  </div>
                  <div style={{ padding: "10px 12px" }}>
                    <p style={{ color: "white", fontWeight: 700, fontSize: 12, fontFamily: "var(--font-display)", marginBottom: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{resort.name}</p>
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      {resort.pisteKm && <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 10 }}>{resort.pisteKm}km</span>}
                      {resort.lifts && <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 10 }}>·</span>}
                      {resort.lifts && <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 10 }}>{resort.lifts} lifts</span>}
                    </div>
                    {resort.rating && (
                      <div style={{ marginTop: 4, display: "flex", alignItems: "center", gap: 3 }}>
                        <span style={{ color: "#FACC15", fontSize: 10 }}>★</span>
                        <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10 }}>{resort.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* Tooltip */}
      {tooltip && (
        <div style={{
          position: "absolute", left: tooltip.x + 12, top: tooltip.y - 50,
          background: "rgba(7,11,30,0.92)", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 10, padding: "8px 12px", color: "white", fontSize: 12, fontWeight: 600,
          pointerEvents: "none", backdropFilter: "blur(12px)", zIndex: 40, whiteSpace: "nowrap",
        }}>
          {tooltip.text}
          {tooltip.sub && <span style={{ color: "rgba(255,255,255,0.5)", fontWeight: 400, marginLeft: 6 }}>{tooltip.sub}</span>}
        </div>
      )}

      {/* Header */}
      {phase === "world" && (
        <div className="absolute top-6 left-6 z-20 pointer-events-none">
          <h3 className="font-display font-bold text-white text-2xl">{t('explore_the_world')}</h3>
          <p className="text-white/50 text-sm mt-1">{t('click_continent')}</p>
        </div>
      )}

      {/* Breadcrumb */}
      {phase !== "world" && phase !== "loading" && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 text-xs whitespace-nowrap">
          <button onClick={() => { setPhase("world"); setActiveContinent(null); setActiveRegion(null); setActiveSubRegion(null); setSvgTransform(""); }} className="text-white/60 hover:text-white transition-colors">World</button>
          {activeContinent && (
            <>
              <ChevronRight className="h-3 w-3 text-white/30" />
              {phase === "continent"
                ? <span className="text-white font-medium">{activeContinent.name}</span>
                : <button onClick={() => { setPhase("continent"); setActiveRegion(null); setActiveSubRegion(null); setSvgTransform(getContinentTransform(activeContinent.bounds)); }} className="text-white/60 hover:text-white transition-colors">{activeContinent.name}</button>}
            </>
          )}
          {activeRegion && (
            <>
              <ChevronRight className="h-3 w-3 text-white/30" />
              {phase === "region"
                ? <span className="text-white font-medium">{activeRegion.name}</span>
                : <button onClick={() => { setPhase("region"); setActiveSubRegion(null); }} className="text-white/60 hover:text-white transition-colors">{activeRegion.name}</button>}
            </>
          )}
          {activeSubRegion && (
            <>
              <ChevronRight className="h-3 w-3 text-white/30" />
              <span className="text-white font-medium">{activeSubRegion.name}</span>
            </>
          )}
        </div>
      )}

      {/* Back button */}
      {phase !== "world" && phase !== "loading" && (
        <button onClick={handleBack} className="absolute bottom-6 left-6 z-30 flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 text-white text-xs font-medium hover:border-white/30 transition-colors">
          <ArrowLeft className="h-3 w-3" />
          Back
        </button>
      )}




    </div>
  );
}