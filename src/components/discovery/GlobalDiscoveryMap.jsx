import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Maximize, Minimize, Maximize2, X, ChevronRight } from "lucide-react";
import { resorts } from "../../lib/data";

// ─── Geographic hierarchy ────────────────────────────────────────────────────

const HIERARCHY = {
  continents: [
    {
      id: "europe", name: "Europe", labelPosition: { lat: 54, lon: 15 },
      regions: [
        {
          id: "alps", name: "Alps", labelPosition: { lat: 46.5, lon: 10.5 },
          subRegions: [
            { id: "austria-tyrol", name: "Austria Tyrol", lat: 47.3, lon: 11.4 },
            { id: "austria-salzburg", name: "Austria Salzburg", lat: 47.4, lon: 13.2 },
            { id: "austria-vorarlberg", name: "Austria Vorarlberg", lat: 47.2, lon: 9.9 },
            { id: "austria-styria", name: "Austria Styria", lat: 47.4, lon: 14.5 },
            { id: "austria-carinthia", name: "Austria Carinthia", lat: 46.7, lon: 13.8 },
            { id: "switzerland-valais", name: "Switzerland Valais", lat: 46.1, lon: 7.5 },
            { id: "switzerland-graubunden", name: "Switzerland Graubünden", lat: 46.7, lon: 9.5 },
            { id: "switzerland-bernese", name: "Switzerland Bernese Oberland", lat: 46.6, lon: 7.9 },
            { id: "switzerland-central", name: "Switzerland Central", lat: 46.9, lon: 8.4 },
            { id: "france-savoie", name: "France Savoie", lat: 45.4, lon: 6.5 },
            { id: "france-haute-savoie", name: "France Haute-Savoie", lat: 46.0, lon: 6.7 },
            { id: "france-hautes-alpes", name: "France Hautes-Alpes", lat: 44.8, lon: 6.3 },
            { id: "france-isere", name: "France Isère", lat: 45.1, lon: 5.9 },
            { id: "italy-alto-adige", name: "Italy Alto Adige", lat: 46.7, lon: 11.5 },
            { id: "italy-trentino", name: "Italy Trentino", lat: 46.1, lon: 11.1 },
            { id: "italy-valle-daosta", name: "Italy Valle d'Aosta", lat: 45.7, lon: 7.3 },
            { id: "italy-lombardy", name: "Italy Lombardy", lat: 46.3, lon: 10.2 },
            { id: "italy-veneto", name: "Italy Veneto", lat: 46.4, lon: 12.1 },
            { id: "italy-piedmont", name: "Italy Piedmont", lat: 44.9, lon: 6.9 },
          ]
        },
        {
          id: "pyrenees", name: "Pyrenees", labelPosition: { lat: 42.7, lon: 1.0 },
          subRegions: [
            { id: "andorra", name: "Andorra", lat: 42.5, lon: 1.5 },
            { id: "spain-aragon", name: "Spain Aragon", lat: 42.7, lon: -0.4 },
            { id: "spain-catalonia", name: "Spain Catalonia", lat: 42.4, lon: 1.1 },
            { id: "france-hautes-pyrenees", name: "France Hautes-Pyrénées", lat: 42.9, lon: 0.1 },
            { id: "france-ariege", name: "France Ariège", lat: 42.8, lon: 1.5 },
            { id: "france-pyrenees-orientales", name: "France Pyrénées-Orientales", lat: 42.5, lon: 2.0 },
          ]
        },
        { id: "scandinavia", name: "Scandinavia", labelPosition: { lat: 62, lon: 15 }, subRegions: [{ id: "scandinavia-main", name: "Scandinavia", lat: 62, lon: 15 }] },
        { id: "carpathians", name: "Carpathians", labelPosition: { lat: 49, lon: 22 }, subRegions: [{ id: "carpathians-main", name: "Carpathians", lat: 49, lon: 22 }] },
        { id: "caucasus", name: "Caucasus", labelPosition: { lat: 42.5, lon: 44 }, subRegions: [{ id: "caucasus-main", name: "Caucasus", lat: 42.5, lon: 44 }] },
        { id: "scottish-highlands", name: "Scottish Highlands", labelPosition: { lat: 57, lon: -4 }, subRegions: [{ id: "scottish-highlands-main", name: "Scottish Highlands", lat: 57, lon: -4 }] },
      ]
    },
    {
      id: "north-america", name: "North America", labelPosition: { lat: 48, lon: -100 },
      regions: [
        { id: "rockies-co-ut", name: "Rocky Mountains (CO/UT)", labelPosition: { lat: 39.5, lon: -106 }, subRegions: [{ id: "rockies-co-ut-main", name: "Rocky Mountains CO/UT", lat: 39.5, lon: -106 }] },
        { id: "rockies-wy-mt", name: "Rocky Mountains (WY/MT)", labelPosition: { lat: 44, lon: -110 }, subRegions: [{ id: "rockies-wy-mt-main", name: "Rocky Mountains WY/MT", lat: 44, lon: -110 }] },
        { id: "sierra-nevada", name: "Sierra Nevada", labelPosition: { lat: 38.5, lon: -119.5 }, subRegions: [{ id: "sierra-nevada-main", name: "Sierra Nevada", lat: 38.5, lon: -119.5 }] },
        { id: "cascades", name: "Cascades", labelPosition: { lat: 47.5, lon: -121.5 }, subRegions: [{ id: "cascades-main", name: "Cascades", lat: 47.5, lon: -121.5 }] },
        { id: "eastern-usa", name: "Eastern USA", labelPosition: { lat: 44, lon: -71.5 }, subRegions: [{ id: "eastern-usa-main", name: "Eastern USA", lat: 44, lon: -71.5 }] },
        { id: "eastern-canada", name: "Eastern Canada (Québec)", labelPosition: { lat: 47, lon: -71 }, subRegions: [{ id: "eastern-canada-main", name: "Eastern Canada Québec", lat: 47, lon: -71 }] },
        { id: "alaska", name: "Alaska", labelPosition: { lat: 62, lon: -150 }, subRegions: [{ id: "alaska-main", name: "Alaska", lat: 62, lon: -150 }] },
      ]
    },
    {
      id: "south-america", name: "South America", labelPosition: { lat: -35, lon: -65 },
      regions: [
        { id: "andes", name: "Andes (Argentina & Chile)", labelPosition: { lat: -33, lon: -70 }, subRegions: [{ id: "andes-main", name: "Andes Argentina Chile", lat: -33, lon: -70 }] },
      ]
    },
    {
      id: "asia", name: "Asia", labelPosition: { lat: 45, lon: 80 },
      regions: [
        { id: "japan-hokkaido", name: "Japan Hokkaido", labelPosition: { lat: 43.5, lon: 142.5 }, subRegions: [{ id: "japan-hokkaido-main", name: "Japan Hokkaido", lat: 43.5, lon: 142.5 }] },
        { id: "japan-honshu", name: "Japan Honshu", labelPosition: { lat: 36.5, lon: 138 }, subRegions: [{ id: "japan-honshu-main", name: "Japan Honshu", lat: 36.5, lon: 138 }] },
        { id: "kazakhstan", name: "Kazakhstan", labelPosition: { lat: 43, lon: 77 }, subRegions: [{ id: "kazakhstan-main", name: "Kazakhstan", lat: 43, lon: 77 }] },
        { id: "kyrgyzstan", name: "Kyrgyzstan", labelPosition: { lat: 42.5, lon: 74.5 }, subRegions: [{ id: "kyrgyzstan-main", name: "Kyrgyzstan", lat: 42.5, lon: 74.5 }] },
        { id: "south-korea", name: "South Korea", labelPosition: { lat: 37.5, lon: 128.5 }, subRegions: [{ id: "south-korea-main", name: "South Korea", lat: 37.5, lon: 128.5 }] },
        { id: "china-xinjiang", name: "China Xinjiang", labelPosition: { lat: 43, lon: 86 }, subRegions: [{ id: "china-xinjiang-main", name: "China Xinjiang", lat: 43, lon: 86 }] },
      ]
    },
    {
      id: "oceania", name: "Oceania", labelPosition: { lat: -40, lon: 170 },
      regions: [
        { id: "nz-south-island", name: "New Zealand South Island", labelPosition: { lat: -44.5, lon: 169.5 }, subRegions: [{ id: "nz-south-island-main", name: "New Zealand South Island", lat: -44.5, lon: 169.5 }] },
        { id: "australia-victoria", name: "Australia Victoria", labelPosition: { lat: -36.5, lon: 146.5 }, subRegions: [{ id: "australia-victoria-main", name: "Australia Victoria", lat: -36.5, lon: 146.5 }] },
        { id: "australia-nsw", name: "Australia New South Wales", labelPosition: { lat: -36, lon: 148.5 }, subRegions: [{ id: "australia-nsw-main", name: "Australia New South Wales", lat: -36, lon: 148.5 }] },
      ]
    },
  ]
};

function getResortsForSubRegion(subRegionId) {
  const sr = subRegionId.toLowerCase();
  const words = sr.split("-").filter(w => w.length > 2);
  return resorts.filter(r => {
    const rRegion = (r.region || "").toLowerCase();
    const rCountry = Array.isArray(r.country) ? r.country.join(",").toLowerCase() : (r.country || "").toLowerCase();
    return words.some(w => rRegion.includes(w) || rCountry.includes(w));
  });
}

// ─── Script loader helper ────────────────────────────────────────────────────

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
    const s = document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function GlobalDiscoveryMap() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const topoRef = useRef(null);
  const d3Ref = useRef(null);
  const zoomRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  const [zoomLevel, setZoomLevel] = useState("world");
  const [selectedContinent, setSelectedContinent] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedSubRegion, setSelectedSubRegion] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [svgOpacity, setSvgOpacity] = useState(1);
  const [mapOpacity, setMapOpacity] = useState(0);
  const [libsLoaded, setLibsLoaded] = useState(false);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Load D3 + TopoJSON
  useEffect(() => {
    async function load() {
      await loadScript("https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js");
      await loadScript("https://cdn.jsdelivr.net/npm/topojson-client@3/dist/topojson-client.min.js");
      const [worldRes] = await Promise.all([
        fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then(r => r.json()),
      ]);
      topoRef.current = worldRes;
      setLibsLoaded(true);
    }
    load();
  }, []);

  // Draw D3 world map
  useEffect(() => {
    if (!libsLoaded || !topoRef.current || !svgRef.current) return;
    const d3 = window.d3;
    const topojson = window.topojson;
    if (!d3 || !topojson) return;
    d3Ref.current = d3;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const w = svgRef.current.clientWidth || containerRef.current?.clientWidth || 900;
    const h = svgRef.current.clientHeight || containerRef.current?.clientHeight || 520;

    const projection = d3.geoNaturalEarth1().fitSize([w, h], { type: "Sphere" });
    const path = d3.geoPath().projection(projection);

    const countries = topojson.feature(topoRef.current, topoRef.current.objects.countries);
    const borders = topojson.mesh(topoRef.current, topoRef.current.objects.countries, (a, b) => a !== b);

    // Graticule
    svg.append("path").datum(d3.geoGraticule()()).attr("d", path)
      .attr("stroke", "rgba(255,255,255,0.04)").attr("stroke-width", 0.5).attr("fill", "none");

    // Country fills
    svg.selectAll(".country").data(countries.features).enter().append("path")
      .attr("class", "country").attr("d", path)
      .attr("fill", "rgba(255,255,255,0.04)").attr("stroke", "none");

    // Country borders
    svg.append("path").datum(borders).attr("d", path)
      .attr("fill", "none").attr("stroke", "rgba(255,255,255,0.15)").attr("stroke-width", 0.5);

    // Continent hit zones + labels
    HIERARCHY.continents.forEach(continent => {
      const [cx, cy] = projection([continent.labelPosition.lon, continent.labelPosition.lat]);
      if (!cx || !cy) return;

      const totalResorts = continent.regions.reduce((sum, r) => sum + r.subRegions.length * 3, 0);

      const g = svg.append("g").attr("class", `continent-${continent.id}`).style("cursor", "pointer");

      const ring = g.append("circle")
        .attr("cx", cx).attr("cy", cy).attr("r", 44)
        .attr("fill", "transparent").attr("stroke", "rgba(251,52,61,0.3)").attr("stroke-width", 1.5);

      const pulse = g.append("circle")
        .attr("cx", cx).attr("cy", cy).attr("r", 44)
        .attr("fill", "none").attr("stroke", "rgba(251,52,61,0.5)").attr("stroke-width", 1);
      pulse.append("animate")
        .attr("attributeName", "r").attr("from", 44).attr("to", 62)
        .attr("dur", "2s").attr("repeatCount", "indefinite");
      pulse.append("animate")
        .attr("attributeName", "opacity").attr("from", 0.6).attr("to", 0)
        .attr("dur", "2s").attr("repeatCount", "indefinite");

      const dot = g.append("circle")
        .attr("cx", cx).attr("cy", cy).attr("r", 8)
        .attr("fill", "rgba(251,52,61,0.8)");

      const label = g.append("text")
        .attr("x", cx).attr("y", cy + 22)
        .attr("text-anchor", "middle").attr("fill", "rgba(255,255,255,0.7)")
        .attr("font-size", 12).attr("font-family", "var(--font-display)").attr("font-weight", 700)
        .attr("pointer-events", "none")
        .text(continent.name);

      g.on("mouseenter", function (event) {
        ring.attr("fill", "rgba(251,52,61,0.18)").attr("stroke", "rgba(251,52,61,0.8)");
        dot.attr("fill", "#FB343D");
        label.attr("fill", "white");
        setHoveredItem({ id: continent.id, name: continent.name, resortCount: continent.regions.length + " regions" });
        const rect = svgRef.current.getBoundingClientRect();
        setTooltipPosition({ x: event.clientX - rect.left, y: event.clientY - rect.top });
      });

      g.on("mouseleave", function () {
        ring.attr("fill", "transparent").attr("stroke", "rgba(251,52,61,0.3)");
        dot.attr("fill", "rgba(251,52,61,0.8)");
        label.attr("fill", "rgba(255,255,255,0.7)");
        setHoveredItem(null);
        setTooltipPosition(null);
      });

      g.on("click", function () {
        setSelectedContinent(continent);
        setZoomLevel("continent");
        // Zoom toward label position
        const scale = 3;
        const tx = w / 2 - scale * cx;
        const ty = h / 2 - scale * cy;
        d3.select(svgRef.current).transition().duration(800).ease(d3.easeCubicInOut)
          .attr("transform", `translate(${tx},${ty}) scale(${scale})`);
      });
    });

    // D3 zoom behaviour
    const zoom = d3.zoom().scaleExtent([1, 20]).on("zoom", (event) => {
      svg.attr("transform", event.transform);
    });
    d3.select(svgRef.current).call(zoom);
    zoomRef.current = zoom;

    svgRef.current.setAttribute("viewBox", `0 0 ${w} ${h}`);
  }, [libsLoaded]);

  // Draw region markers when continent selected
  useEffect(() => {
    if (zoomLevel !== "continent" || !selectedContinent || !d3Ref.current || !svgRef.current) return;
    const d3 = d3Ref.current;
    const svg = d3.select(svgRef.current);
    svg.selectAll(".region-marker").remove();

    const w = svgRef.current.clientWidth || 900;
    const h = svgRef.current.clientHeight || 520;
    const projection = d3.geoNaturalEarth1().fitSize([w, h], { type: "Sphere" });

    selectedContinent.regions.forEach(region => {
      const [rx, ry] = projection([region.labelPosition.lon, region.labelPosition.lat]);
      if (!rx || !ry) return;

      const g = svg.append("g").attr("class", "region-marker").style("cursor", "pointer");

      g.append("circle").attr("cx", rx).attr("cy", ry).attr("r", 18)
        .attr("fill", "rgba(56,148,227,0.1)").attr("stroke", "rgba(56,148,227,0.6)").attr("stroke-width", 1.5);

      const pulse = g.append("circle").attr("cx", rx).attr("cy", ry).attr("r", 18)
        .attr("fill", "none").attr("stroke", "rgba(56,148,227,0.5)").attr("stroke-width", 1);
      pulse.append("animate").attr("attributeName", "r").attr("from", 18).attr("to", 30).attr("dur", "2s").attr("repeatCount", "indefinite");
      pulse.append("animate").attr("attributeName", "opacity").attr("from", 0.6).attr("to", 0).attr("dur", "2s").attr("repeatCount", "indefinite");

      g.append("circle").attr("cx", rx).attr("cy", ry).attr("r", 5).attr("fill", "rgba(56,148,227,0.9)");

      g.append("text").attr("x", rx).attr("y", ry + 28).attr("text-anchor", "middle")
        .attr("fill", "rgba(255,255,255,0.7)").attr("font-size", 10).attr("font-family", "var(--font-display)")
        .attr("font-weight", 600).attr("pointer-events", "none").text(region.name);

      g.on("mouseenter", function (event) {
        g.select("circle").attr("fill", "rgba(56,148,227,0.25)").attr("stroke", "rgba(56,148,227,1)");
        setHoveredItem({ id: region.id, name: region.name, resortCount: region.subRegions.length + " sub-regions" });
        const rect = svgRef.current.getBoundingClientRect();
        setTooltipPosition({ x: event.clientX - rect.left, y: event.clientY - rect.top });
      });
      g.on("mouseleave", function () {
        g.select("circle").attr("fill", "rgba(56,148,227,0.1)").attr("stroke", "rgba(56,148,227,0.6)");
        setHoveredItem(null);
      });
      g.on("click", function () {
        setSelectedRegion(region);
        setZoomLevel("region");
        const scale = 6;
        const tx = w / 2 - scale * rx;
        const ty = h / 2 - scale * ry;
        d3.select(svgRef.current).transition().duration(800).ease(d3.easeCubicInOut)
          .attr("transform", `translate(${tx},${ty}) scale(${scale})`);
      });
    });
  }, [zoomLevel, selectedContinent]);

  // Draw subregion markers when region selected
  useEffect(() => {
    if (zoomLevel !== "region" || !selectedRegion || !d3Ref.current || !svgRef.current) return;
    const d3 = d3Ref.current;
    const svg = d3.select(svgRef.current);
    svg.selectAll(".subregion-marker").remove();

    const w = svgRef.current.clientWidth || 900;
    const h = svgRef.current.clientHeight || 520;
    const projection = d3.geoNaturalEarth1().fitSize([w, h], { type: "Sphere" });

    selectedRegion.subRegions.forEach(sr => {
      const [rx, ry] = projection([sr.lon, sr.lat]);
      if (!rx || !ry) return;
      const resortList = getResortsForSubRegion(sr.id);
      const hasResorts = resortList.length > 0;

      const g = svg.append("g").attr("class", "subregion-marker").style("cursor", hasResorts ? "pointer" : "default");

      const fillCol = hasResorts ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)";
      const strokeCol = hasResorts ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)";

      g.append("circle").attr("cx", rx).attr("cy", ry).attr("r", 14)
        .attr("fill", fillCol).attr("stroke", strokeCol).attr("stroke-width", 1.2);

      if (hasResorts) {
        const pulse = g.append("circle").attr("cx", rx).attr("cy", ry).attr("r", 14)
          .attr("fill", "none").attr("stroke", "rgba(255,255,255,0.3)").attr("stroke-width", 1);
        pulse.append("animate").attr("attributeName", "r").attr("from", 14).attr("to", 22).attr("dur", "2.5s").attr("repeatCount", "indefinite");
        pulse.append("animate").attr("attributeName", "opacity").attr("from", 0.5).attr("to", 0).attr("dur", "2.5s").attr("repeatCount", "indefinite");
      }

      g.append("circle").attr("cx", rx).attr("cy", ry).attr("r", 4)
        .attr("fill", hasResorts ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)");

      g.append("text").attr("x", rx).attr("y", ry + 22).attr("text-anchor", "middle")
        .attr("fill", hasResorts ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.25)")
        .attr("font-size", 9).attr("font-family", "var(--font-display)").attr("font-weight", 600)
        .attr("pointer-events", "none")
        .text(sr.name.split(" ").slice(-2).join(" "));

      g.on("mouseenter", function (event) {
        if (hasResorts) g.select("circle").attr("fill", "rgba(255,255,255,0.2)").attr("stroke", "rgba(255,255,255,0.9)");
        setHoveredItem({ id: sr.id, name: sr.name, resortCount: hasResorts ? resortList.length + " resorts" : "No resorts yet" });
        const rect = svgRef.current.getBoundingClientRect();
        setTooltipPosition({ x: event.clientX - rect.left, y: event.clientY - rect.top });
      });
      g.on("mouseleave", function () {
        g.select("circle").attr("fill", fillCol).attr("stroke", strokeCol);
        setHoveredItem(null);
      });
      if (hasResorts) {
        g.on("click", function () {
          setSelectedSubRegion(sr);
          transitionToMap3D(sr);
        });
      }
    });
  }, [zoomLevel, selectedRegion]);

  // Transition D3 → MapTiler
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
    setMapOpacity(0);

    const maptilersdk = window.maptilersdk;
    if (!maptilersdk || !document.getElementById("discovery-3d-map")) return;

    maptilersdk.config.apiKey = "lNsV1pOMdNShmVL9tiih";
    const map = new maptilersdk.Map({
      container: "discovery-3d-map",
      style: "https://api.maptiler.com/maps/019c8160-59cd-7579-afc6-753ee61bd724/style.json?key=lNsV1pOMdNShmVL9tiih",
      center: [subRegion.lon, subRegion.lat],
      zoom: 8,
      pitch: 45,
      bearing: -15,
    });
    mapInstanceRef.current = map;

    map.on("load", () => {
      try {
        map.addSource("terrain", { type: "raster-dem", url: "https://api.maptiler.com/tiles/terrain-rgb/tiles.json?key=lNsV1pOMdNShmVL9tiih" });
        map.setTerrain({ source: "terrain", exaggeration: 1.5 });
      } catch {}

      const subResorts = getResortsForSubRegion(subRegion.id);
      subResorts.forEach(resort => {
        if (!resort.coordinates?.lon || !resort.coordinates?.lat) return;
        const el = document.createElement("div");
        el.style.cssText = "position:relative;cursor:pointer;";

        const badge = document.createElement("div");
        badge.style.cssText = "width:36px;height:36px;border-radius:50%;background:#070B1E;border:2px solid #FB343D;display:flex;align-items:center;justify-content:center;box-shadow:0 0 12px rgba(251,52,61,0.4);";
        const initials = document.createElement("span");
        initials.style.cssText = "font-size:11px;font-weight:700;color:white;letter-spacing:0.5px;";
        initials.textContent = resort.name.substring(0, 2).toUpperCase();
        badge.appendChild(initials);

        const pointer = document.createElement("div");
        pointer.style.cssText = "width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:7px solid #FB343D;margin:0 auto;";

        const tooltip = document.createElement("div");
        tooltip.style.cssText = "position:absolute;bottom:52px;left:50%;transform:translateX(-50%);background:rgba(7,11,30,0.95);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:12px;min-width:180px;backdrop-filter:blur(12px);pointer-events:none;display:none;z-index:100;";
        tooltip.innerHTML = `
          <div style="font-weight:700;color:white;font-size:13px;margin-bottom:6px;">${resort.name}</div>
          <div style="color:rgba(255,255,255,0.5);font-size:11px;margin-bottom:8px;">${resort.country || ""} · ${resort.region || ""}</div>
          <div style="margin-bottom:6px;">
            ${resort.pisteKm ? `<span style="background:rgba(255,255,255,0.08);border-radius:6px;padding:2px 6px;font-size:10px;color:rgba(255,255,255,0.7);margin-right:4px;">${resort.pisteKm}km</span>` : ""}
            ${resort.lifts ? `<span style="background:rgba(255,255,255,0.08);border-radius:6px;padding:2px 6px;font-size:10px;color:rgba(255,255,255,0.7);margin-right:4px;">${resort.lifts} lifts</span>` : ""}
            ${resort.altitudeRange ? `<span style="background:rgba(255,255,255,0.08);border-radius:6px;padding:2px 6px;font-size:10px;color:rgba(255,255,255,0.7);">${resort.altitudeRange}</span>` : ""}
          </div>
          ${resort.rating ? `<span style="background:#3894E3;color:white;font-size:11px;font-weight:700;border-radius:6px;padding:2px 6px;">★ ${resort.rating}</span>` : ""}
          <a style="color:#FB343D;font-size:11px;font-weight:600;margin-top:8px;display:block;">View resort →</a>
        `;

        el.addEventListener("mouseenter", () => { tooltip.style.display = "block"; });
        el.addEventListener("mouseleave", () => { tooltip.style.display = "none"; });
        el.addEventListener("click", () => {
          sessionStorage.setItem("peakxp_back_context", "discovery-map");
          navigate(`/resort/${resort.id}`);
        });

        el.appendChild(badge);
        el.appendChild(pointer);
        el.appendChild(tooltip);

        const marker = new maptilersdk.Marker({ element: el }).setLngLat([resort.coordinates.lon, resort.coordinates.lat]).addTo(map);
        markersRef.current.push(marker);
      });

      map.addControl(new maptilersdk.NavigationControl(), "bottom-right");
      map.addControl(new maptilersdk.ScaleControl(), "bottom-left");
    });

    map.on("idle", () => {
      setMapOpacity(1);
      setZoomLevel("map3d");
    });
  }, [navigate]);

  // Navigate back from 3D map
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

  // Breadcrumb navigation
  function navToWorld() {
    setZoomLevel("world");
    setSelectedContinent(null);
    setSelectedRegion(null);
    setSelectedSubRegion(null);
    if (svgRef.current && d3Ref.current) {
      d3Ref.current.select(svgRef.current).transition().duration(600).attr("transform", "");
    }
    setSvgOpacity(1);
  }
  function navToContinent() {
    if (zoomLevel === "map3d" || zoomLevel === "subregion") { backToRegion(); setTimeout(() => { setZoomLevel("continent"); setSelectedRegion(null); }, 500); return; }
    setZoomLevel("continent");
    setSelectedRegion(null);
    setSelectedSubRegion(null);
  }
  function navToRegion() {
    if (zoomLevel === "map3d" || zoomLevel === "subregion") { backToRegion(); return; }
    setZoomLevel("region");
    setSelectedSubRegion(null);
  }

  const containerClass = isFullscreen
    ? "fixed inset-0 z-50 overflow-hidden"
    : `relative w-full overflow-hidden transition-all duration-500 ${isMobile ? "h-[300px]" : "h-[520px]"}`;

  const subResortCount = selectedSubRegion ? getResortsForSubRegion(selectedSubRegion.id).length : 0;

  return (
    <div ref={containerRef} className={containerClass} style={{ background: "#070B1E" }}>

      {/* D3 SVG map */}
      {zoomLevel !== "map3d" && (
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          style={{ opacity: svgOpacity, transition: "opacity 0.4s", touchAction: "none", position: "absolute", inset: 0 }}
        />
      )}

      {/* MapTiler 3D map */}
      <div
        id="discovery-3d-map"
        style={{ opacity: mapOpacity, transition: "opacity 0.4s", position: "absolute", inset: 0 }}
      />

      {/* Loading overlay */}
      {!libsLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-white/10 border-t-peak-red rounded-full animate-spin" />
            <p className="text-white/40 text-xs">Loading map…</p>
          </div>
        </div>
      )}

      {/* Section header */}
      <div className="absolute top-6 left-6 z-20 pointer-events-none">
        {zoomLevel === "world" && (
          <>
            <h3 className="font-display font-bold text-white text-2xl">Explore the World</h3>
            <p className="text-white/50 text-sm mt-1">Click any region to discover ski destinations</p>
          </>
        )}
      </div>

      {/* Breadcrumb */}
      {zoomLevel !== "world" && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-peak-bg/70 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 whitespace-nowrap">
          <button onClick={navToWorld} className="text-white/60 text-xs font-medium hover:text-white transition-colors">World</button>
          {selectedContinent && (
            <>
              <ChevronRight className="h-3 w-3 text-white/30" />
              {zoomLevel === "continent" ? (
                <span className="text-white text-xs font-medium">{selectedContinent.name}</span>
              ) : (
                <button onClick={navToContinent} className="text-white/60 text-xs font-medium hover:text-white transition-colors">{selectedContinent.name}</button>
              )}
            </>
          )}
          {selectedRegion && (
            <>
              <ChevronRight className="h-3 w-3 text-white/30" />
              {zoomLevel === "region" ? (
                <span className="text-white text-xs font-medium">{selectedRegion.name}</span>
              ) : (
                <button onClick={navToRegion} className="text-white/60 text-xs font-medium hover:text-white transition-colors">{selectedRegion.name}</button>
              )}
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

      {/* Resort count chip (map3d) */}
      {zoomLevel === "map3d" && selectedSubRegion && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-20 bg-peak-bg/70 backdrop-blur-md border border-white/10 text-white text-xs font-medium px-4 py-2 rounded-full pointer-events-none">
          {subResortCount} resort{subResortCount !== 1 ? "s" : ""} in {selectedSubRegion.name}
        </div>
      )}

      {/* Fullscreen / close buttons */}
      <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
        {isFullscreen && (
          <button onClick={() => setIsFullscreen(false)}
            className="w-10 h-10 rounded-xl bg-peak-bg/60 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:border-white/25 transition-colors">
            <X className="h-4 w-4 text-white" />
          </button>
        )}
        <button onClick={() => setIsFullscreen(v => !v)}
          className="w-10 h-10 rounded-xl bg-peak-bg/60 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:border-white/25 transition-colors">
          {isFullscreen ? <Minimize className="h-4 w-4 text-white" /> : <Maximize className="h-4 w-4 text-white" />}
        </button>
      </div>

      {/* Explore full map button */}
      {!isFullscreen && (
        <button onClick={() => setIsFullscreen(true)}
          className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 cursor-pointer hover:border-white/25 transition-all ${
            isMobile
              ? "bg-peak-red text-white font-semibold px-5 py-3 rounded-full text-sm"
              : "bg-peak-bg/70 backdrop-blur-md border border-white/10 text-white text-sm font-medium px-5 py-2.5 rounded-full"
          }`}>
          <Maximize2 className="h-4 w-4" />
          Explore full map
        </button>
      )}

      {/* Shared tooltip */}
      {hoveredItem && tooltipPosition && (
        <div
          className="absolute z-40 pointer-events-none bg-peak-bg/90 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2 text-white text-xs font-medium shadow-xl transition-opacity duration-150"
          style={{ left: tooltipPosition.x + 14, top: tooltipPosition.y - 30 }}>
          <p className="font-bold text-white">{hoveredItem.name}</p>
          <p className="text-white/50 mt-0.5">{hoveredItem.resortCount}</p>
        </div>
      )}
    </div>
  );
}