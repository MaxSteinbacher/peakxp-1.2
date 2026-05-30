import { useEffect, useRef, useState } from "react";
import { Mountain } from "lucide-react";

const MAPTILER_KEY = "lNsV1pOMdNShmVL9tiih";
const STYLE_URL = `https://api.maptiler.com/maps/019c8160-59cd-7579-afc6-753ee61bd724/style.json?key=${MAPTILER_KEY}`;

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
        const check = setInterval(() => {
          if (window.maptilersdk) { clearInterval(check); resolve(window.maptilersdk); }
        }, 50);
        setTimeout(() => { clearInterval(check); reject(new Error("SDK timeout")); }, 10000);
      };
      script.onerror = reject;
      document.head.appendChild(script);
    } else {
      const check = setInterval(() => {
        if (window.maptilersdk) { clearInterval(check); resolve(window.maptilersdk); }
      }, 50);
      setTimeout(() => { clearInterval(check); reject(new Error("SDK timeout")); }, 10000);
    }
  });
  return sdkLoadPromise;
}

function overpassToGeoJSON(data) {
  const nodes = {};
  data.elements.forEach(el => {
    if (el.type === "node") nodes[el.id] = [el.lon, el.lat];
  });
  const features = [];
  data.elements.forEach(el => {
    if (el.type === "way" && el.nodes) {
      const coords = el.nodes.map(id => nodes[id]).filter(Boolean);
      if (coords.length < 2) return;
      features.push({
        type: "Feature",
        geometry: { type: "LineString", coordinates: coords },
        properties: { ...el.tags, _id: el.id },
      });
    }
  });
  return { type: "FeatureCollection", features };
}

const DIFFICULTY_COLORS = {
  expert: "#1a1a2e",
  advanced: "#e63946",
  intermediate: "#3894E3",
  easy: "#2d6a4f",
  novice: "#2d6a4f",
};

export default function ResortMap3D({ resort }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const mapLoadedRef = useRef(false);
  const [loading, setLoading] = useState(true);
  const [noCoords, setNoCoords] = useState(false);
  const [slopeToast, setSlopeToast] = useState(false);
  const [overpassLoading, setOverpassLoading] = useState(true);
  const [layers, setLayers] = useState({ slopes: true, lifts: true, liftStatus: true, terrain: true });

  const lat = resort.lat;
  const lng = resort.lng;

  useEffect(() => {
    if (!lat || !lng || (lat === 0 && lng === 0)) { setNoCoords(true); setLoading(false); setOverpassLoading(false); return; }

    let unmounted = false;

    // Fix 1: bounding box
    const buffer = 0.12;
    const bounds = [
      [lng - buffer, lat - buffer],
      [lng + buffer, lat + buffer],
    ];

    loadSDK().then(sdk => {
      if (unmounted || !mapRef.current) return;
      sdk.config.apiKey = MAPTILER_KEY;

      // Prevent map canvas from stealing page focus/scroll on init
      if (mapRef.current) {
        mapRef.current.setAttribute("tabindex", "-1");
        mapRef.current.style.outline = "none";
      }
      const map = new sdk.Map({
        container: mapRef.current,
        style: STYLE_URL,
        center: [lng, lat],
        zoom: 13,
        pitch: 62,
        bearing: -15,
        scrollZoom: true,
        dragRotate: true,
        touchZoomRotate: true,
        keyboard: false,
        attributionControl: false,
        maxBounds: bounds,
        maxZoom: 16,
        minZoom: 11,
        fadeDuration: 0,
        optimizeForTerrain: true,
        maxTileCacheSize: 50,
      });

      map.addControl(new sdk.NavigationControl({ showCompass: true, showZoom: true, visualizePitch: true }), "bottom-right");
      map.addControl(new sdk.ScaleControl({ unit: "metric" }), "bottom-left");
      map.addControl(new sdk.FullscreenControl(), "top-right");

      map.on("load", async () => {
        if (unmounted) return;

        // Fix 3: remove built-in piste/ski/slope layers from base style
        const styleLayers = map.getStyle().layers || [];
        styleLayers.forEach(layer => {
          const id = layer.id.toLowerCase();
          if (id.includes("piste") || id.includes("ski") || id.includes("slope")) {
            if (map.getLayer(layer.id)) map.removeLayer(layer.id);
          }
        });

        // Fix 4: add DEM terrain source explicitly
        if (!map.getSource("maptiler-dem")) {
          map.addSource("maptiler-dem", {
            type: "raster-dem",
            url: `https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json?key=${MAPTILER_KEY}`,
            tileSize: 256,
          });
        }
        map.setTerrain({ source: "maptiler-dem", exaggeration: 1.5 });

        mapLoadedRef.current = true;
        if (!unmounted) setLoading(false);

        // Use easeTo instead of flyTo — flyTo can trigger browser scroll-into-view
        map.once("idle", () => {
          if (unmounted) return;
          map.easeTo({ center: [lng, lat], zoom: 13.5, pitch: 65, bearing: 20, duration: 1500 });
        });

        // Fix 8: find first symbol layer for beforeId
        const firstSymbolId = map.getStyle().layers.find(l => l.type === "symbol")?.id;

        // Fix 7: use buffer = 0.12 for Overpass query
        const delta = 0.12;
        const S = lat - delta, N = lat + delta, W = lng - delta, E = lng + delta;
        const query = `[out:json][timeout:30];(way["piste:type"="downhill"](${S},${W},${N},${E});way["piste:type"="nordic"](${S},${W},${N},${E});way["aerialway"](${S},${W},${N},${E});relation["piste:type"="downhill"](${S},${W},${N},${E}););out body;>;out skel qt;`;
        const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

        let geojson = null;
        try {
          const res = await fetch(url);
          const data = await res.json();
          if (unmounted) return;
          geojson = overpassToGeoJSON(data);
        } catch {
          if (!unmounted) { setSlopeToast(true); setOverpassLoading(false); }
          return;
        }

        // Fix 5: done loading overpass
        if (!unmounted) setOverpassLoading(false);

        if (!geojson || geojson.features.length === 0) {
          setSlopeToast(true);
          return;
        }

        map.addSource("openski-data", { type: "geojson", data: geojson });

        // Fix 8: piste line layers with beforeId (above terrain, below text labels)
        const pisteFilters = [
          { id: "pistes-black", difficulty: "expert", color: "#1a1a2e", width: 3.5 },
          { id: "pistes-red", difficulty: "advanced", color: "#e63946", width: 3 },
          { id: "pistes-blue", difficulty: "intermediate", color: "#3894E3", width: 3 },
          { id: "pistes-green", difficulty: ["easy", "novice"], color: "#2d6a4f", width: 3 },
        ];

        pisteFilters.forEach(({ id, difficulty, color, width }) => {
          const filter = Array.isArray(difficulty)
            ? ["in", ["get", "piste:difficulty"], ["literal", difficulty]]
            : ["==", ["get", "piste:difficulty"], difficulty];
          map.addLayer(
            { id, type: "line", source: "openski-data", filter, paint: { "line-color": color, "line-width": width, "line-opacity": 0.9 } },
            firstSymbolId
          );
        });

        // Piste labels — no beforeId, render above everything
        map.addLayer({
          id: "piste-labels",
          type: "symbol",
          source: "openski-data",
          filter: ["has", "name"],
          layout: { "text-field": ["get", "name"], "text-size": 11, "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"] },
          paint: { "text-color": "#ffffff", "text-halo-color": "#1a1a2e", "text-halo-width": 1.5 },
        });

        // Lift line with beforeId
        map.addLayer(
          {
            id: "lifts-line",
            type: "line",
            source: "openski-data",
            filter: ["has", "aerialway"],
            paint: { "line-color": "#FB343D", "line-width": 2, "line-opacity": 0.85, "line-dasharray": [2, 1] },
          },
          firstSymbolId
        );

        // Lift label — no beforeId
        map.addLayer({
          id: "lifts-label",
          type: "symbol",
          source: "openski-data",
          filter: ["all", ["has", "aerialway"], ["has", "name"]],
          layout: { "text-field": ["get", "name"], "text-size": 10, "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"] },
          paint: { "text-color": "#FB343D", "text-halo-color": "#ffffff", "text-halo-width": 1.5 },
        });

        // Lift status markers
        geojson.features.forEach(f => {
          if (!f.properties.aerialway) return;
          const coords = f.geometry.coordinates;
          const midCoord = coords[Math.floor(coords.length / 2)];
          if (!midCoord) return;
          const el = document.createElement("div");
          el.style.cssText = "width:10px;height:10px;border-radius:50%;background:#6B7490;border:2px solid rgba(255,255,255,0.5);cursor:pointer;";
          new sdk.Marker({ element: el }).setLngLat(midCoord).addTo(map);
        });

        // Click: piste popup
        ["pistes-black", "pistes-red", "pistes-blue", "pistes-green"].forEach(layerId => {
          map.on("click", layerId, e => {
            const f = e.features[0];
            const props = f.properties;
            const diff = props["piste:difficulty"] || "";
            const color = DIFFICULTY_COLORS[diff] || "#888";
            const diffLabel = diff ? diff.charAt(0).toUpperCase() + diff.slice(1) : "Unknown";
            const name = props.name || "Unnamed piste";
            const length = props["piste:length"] ? `${Math.round(props["piste:length"])}m` : null;
            new sdk.Popup({ className: "peak-popup", closeButton: true, maxWidth: "260px" })
              .setLngLat(e.lngLat)
              .setHTML(`<div style="background:#141A32;border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:12px;color:#ECF4FA;font-size:14px;"><div style="font-weight:700;margin-bottom:6px;">${name}</div><span style="background:${color};color:white;font-size:11px;padding:2px 8px;border-radius:999px;display:inline-block;margin-bottom:6px;">${diffLabel}</span>${length ? `<div style="color:#6B7490;font-size:12px;margin-bottom:6px;">Length: ${length}</div>` : ""}<button onclick="window.dispatchEvent(new CustomEvent('addToRoute',{detail:${JSON.stringify(props)}}))" style="background:#FB343D;color:white;font-size:12px;padding:4px 12px;border-radius:8px;border:none;cursor:pointer;margin-top:4px;">Add to route</button></div>`)
              .addTo(map);
          });
          map.on("mouseenter", layerId, () => { map.getCanvas().style.cursor = "pointer"; });
          map.on("mouseleave", layerId, () => { map.getCanvas().style.cursor = ""; });
        });

        // Click: lift popup
        map.on("click", "lifts-line", e => {
          const f = e.features[0];
          const props = f.properties;
          const name = props.name || "Unnamed lift";
          const liftType = props.aerialway || "lift";
          const typeLabel = liftType.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
          const capacity = props.capacity || props["aerialway:capacity"] || null;
          new sdk.Popup({ className: "peak-popup", closeButton: true, maxWidth: "240px" })
            .setLngLat(e.lngLat)
            .setHTML(`<div style="background:#141A32;border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:12px;color:#ECF4FA;font-size:14px;"><div style="font-weight:700;margin-bottom:6px;">${name}</div><div style="color:#6B7490;font-size:12px;margin-bottom:4px;">${typeLabel}</div><span style="background:#6B7490;color:white;font-size:11px;padding:2px 8px;border-radius:999px;display:inline-block;">Unknown status</span>${capacity ? `<div style="color:#6B7490;font-size:12px;margin-top:6px;">Capacity: ${capacity}/hr</div>` : ""}</div>`)
            .addTo(map);
        });
        map.on("mouseenter", "lifts-line", () => { map.getCanvas().style.cursor = "pointer"; });
        map.on("mouseleave", "lifts-line", () => { map.getCanvas().style.cursor = ""; });
      });

      // Fix 9: store in ref
      mapInstanceRef.current = map;
    }).catch(() => {
      if (!unmounted) { setLoading(false); setOverpassLoading(false); }
    });

    return () => {
      unmounted = true;
      mapLoadedRef.current = false;
      if (mapInstanceRef.current) { mapInstanceRef.current.remove(); mapInstanceRef.current = null; }
    };
  }, [lat, lng]);

  // Fix 9: layer toggle handlers using mapInstanceRef
  useEffect(() => {
    if (!mapLoadedRef.current || !mapInstanceRef.current) return;
    const map = mapInstanceRef.current;
    const pisteIds = ["pistes-black", "pistes-red", "pistes-blue", "pistes-green", "piste-labels"];
    const liftIds = ["lifts-line", "lifts-label"];
    pisteIds.forEach(id => {
      if (map.getLayer(id)) map.setLayoutProperty(id, "visibility", layers.slopes ? "visible" : "none");
    });
    liftIds.forEach(id => {
      if (map.getLayer(id)) map.setLayoutProperty(id, "visibility", layers.lifts ? "visible" : "none");
    });
    // Fix 4: terrain toggle references maptiler-dem source
    try {
      map.setTerrain(layers.terrain ? { source: "maptiler-dem", exaggeration: 1.5 } : null);
    } catch {}
  }, [layers]);

  if (noCoords) {
    return (
      <div className="h-72 sm:h-96 w-full rounded-2xl bg-peak-surface border border-white/10 flex flex-col items-center justify-center gap-3">
        <Mountain className="h-12 w-12 text-peak-text-secondary/40" />
        <p className="text-peak-text-secondary text-sm">Location data not yet available for this resort.</p>
      </div>
    );
  }

  function Toggle({ checked, onChange }) {
    return (
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-8 h-4 rounded-full transition-colors flex-shrink-0 ${checked ? "bg-peak-red" : "bg-peak-surface"}`}
        style={{ border: "1px solid rgba(255,255,255,0.15)" }}
      >
        <span
          className="absolute top-0.5 w-3 h-3 bg-white rounded-full transition-transform shadow"
          style={{ left: checked ? "calc(100% - 14px)" : "1px" }}
        />
      </button>
    );
  }

  return (
    <div className="relative w-full h-72 sm:h-[480px] rounded-2xl overflow-hidden border border-white/10" style={{ scrollMarginTop: 0 }}>
      {loading && (
        <div className="absolute inset-0 z-30 bg-peak-surface flex flex-col items-center justify-center gap-3 rounded-2xl">
          <Mountain className="h-12 w-12 text-peak-text-secondary/40 animate-pulse" />
          <p className="text-peak-text-secondary text-sm">Loading 3D terrain...</p>
        </div>
      )}

      <div ref={mapRef} className="w-full h-full" />

      {/* Fix 5: Overpass loading pill */}
      {!loading && overpassLoading && (
        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-30 bg-peak-surface/90 backdrop-blur-sm text-peak-text-secondary text-xs px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full border-2 border-peak-blue border-t-transparent animate-spin flex-shrink-0" />
          Loading slope data...
        </div>
      )}

      {/* Layer controls */}
      {!loading && (
        <div className="absolute top-3 left-3 z-20 bg-peak-bg/85 backdrop-blur-md rounded-xl p-3 flex flex-col gap-2 min-w-36">
          <p className="text-peak-text text-xs font-bold uppercase tracking-wider mb-1">Map layers</p>
          {[
            { key: "slopes", label: "Slopes" },
            { key: "lifts", label: "Lifts" },
            { key: "liftStatus", label: "Lift status" },
            { key: "terrain", label: "3D terrain" },
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between gap-3">
              <span className="text-peak-text text-xs">{label}</span>
              <Toggle checked={layers[key]} onChange={v => setLayers(l => ({ ...l, [key]: v }))} />
            </div>
          ))}
          <div className="border-t border-white/10 mt-1 pt-2 space-y-1">
            {[
              { color: "#2d6a4f", label: "Easy" },
              { color: "#3894E3", label: "Intermediate" },
              { color: "#e63946", label: "Advanced" },
              { color: "#1a1a2e", label: "Expert" },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color, border: "1px solid rgba(255,255,255,0.3)" }} />
                <span className="text-peak-text-secondary text-xs">{label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resort info overlay */}
      {!loading && (
        <div className="absolute top-10 right-3 z-20 bg-peak-bg/85 backdrop-blur-md rounded-xl px-3 py-2">
          <p className="text-peak-text font-bold text-sm">{resort.name}</p>
          <p className="text-peak-text-secondary text-xs">{resort.minAltitude}m – {resort.maxAltitude}m</p>
          <p className="text-peak-text-secondary text-xs">{resort.pisteKm} km · {resort.lifts} lifts</p>
          <span className="inline-block bg-peak-blue/20 text-peak-blue text-xs px-2 py-0.5 rounded-full mt-1">3D Terrain · Live Data</span>
        </div>
      )}

      {/* Slope data toast */}
      {slopeToast && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 bg-peak-surface/90 text-peak-text-secondary text-xs px-3 py-2 rounded-lg flex items-center gap-2 max-w-xs text-center shadow-lg">
          <span>Slope data unavailable for this resort. Map will update when data is added to OpenStreetMap.</span>
          <button onClick={() => setSlopeToast(false)} className="text-peak-text-secondary hover:text-peak-text flex-shrink-0">✕</button>
        </div>
      )}
    </div>
  );
}