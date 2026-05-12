import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Compass, Layers, Mountain } from "lucide-react";

const API_KEY = "lNsV1pOMdNShmVL9tiih";
const STYLE = `https://api.maptiler.com/maps/019c8160-59cd-7579-afc6-753ee61bd724/style.json?key=${API_KEY}`;

// Module-level SDK load state — shared across all instances
let sdkLoaded = false;
let sdkLoading = false;
let sdkCallbacks = [];

function loadSDK() {
  return new Promise((resolve, reject) => {
    if (sdkLoaded && window.maptilersdk) { resolve(); return; }
    sdkCallbacks.push({ resolve, reject });
    if (sdkLoading) return;
    sdkLoading = true;

    // CSS
    if (!document.querySelector('link[href*="maptiler-sdk.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://cdn.maptiler.com/maptiler-sdk-js/latest/maptiler-sdk.css";
      document.head.appendChild(link);
    }

    // Script
    const script = document.createElement("script");
    script.src = "https://cdn.maptiler.com/maptiler-sdk-js/latest/maptiler-sdk.umd.min.js";
    script.async = true;
    script.onload = () => {
      const wait = setInterval(() => {
        if (window.maptilersdk) {
          clearInterval(wait);
          sdkLoaded = true;
          sdkLoading = false;
          sdkCallbacks.forEach(cb => cb.resolve());
          sdkCallbacks = [];
        }
      }, 50);
    };
    script.onerror = () => {
      sdkLoading = false;
      sdkCallbacks.forEach(cb => cb.reject(new Error("Failed to load MapTiler SDK")));
      sdkCallbacks = [];
    };
    document.head.appendChild(script);
  });
}

function RotateControl({ mapRef, is3D, setIs3D }) {
  const dragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });

  const handleStart = useCallback((e) => {
    dragging.current = true;
    const pos = e.touches ? e.touches[0] : e;
    startPos.current = { x: pos.clientX, y: pos.clientY };
    e.preventDefault();
  }, []);

  const handleMove = useCallback((e) => {
    if (!dragging.current || !mapRef.current) return;
    const pos = e.touches ? e.touches[0] : e;
    const dx = pos.clientX - startPos.current.x;
    const dy = pos.clientY - startPos.current.y;
    startPos.current = { x: pos.clientX, y: pos.clientY };
    const map = mapRef.current;
    map.setBearing(map.getBearing() + dx * 0.5);
    map.setPitch(Math.max(0, Math.min(85, map.getPitch() - dy * 0.3)));
  }, [mapRef]);

  const handleEnd = useCallback(() => { dragging.current = false; }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("touchend", handleEnd);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [handleMove, handleEnd]);

  function resetOrientation() {
    mapRef.current?.easeTo({ bearing: 0, pitch: 55, duration: 500 });
  }

  function toggleFlat() {
    const map = mapRef.current;
    if (!map) return;
    if (is3D) {
      map.easeTo({ pitch: 0, duration: 400 });
      try { map.setTerrain(null); } catch {}
      setIs3D(false);
    } else {
      map.easeTo({ pitch: 55, duration: 400 });
      try {
        map.setTerrain({ source: "maptiler-dem", exaggeration: 1.5 });
      } catch {}
      setIs3D(true);
    }
  }

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-auto">
      {/* Icon buttons */}
      <div className="flex gap-2">
        <button
          onClick={resetOrientation}
          className="w-8 h-8 rounded-lg bg-peak-bg/70 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
          title="Reset orientation"
        >
          <Compass size={14} />
        </button>
        <button
          onClick={toggleFlat}
          className="w-8 h-8 rounded-lg bg-peak-bg/70 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
          title="Toggle 3D"
        >
          <Layers size={14} />
        </button>
      </div>

      {/* Joystick ring */}
      <div
        className="w-20 h-20 rounded-full bg-peak-bg/70 backdrop-blur-sm border border-white/15 flex items-center justify-center select-none relative cursor-grab active:cursor-grabbing"
        onMouseDown={handleStart}
        onTouchStart={handleStart}
      >
        <ChevronUp size={14} className="text-white/50 absolute top-2" />
        <ChevronDown size={14} className="text-white/50 absolute bottom-2" />
        <ChevronLeft size={14} className="text-white/50 absolute left-2" />
        <ChevronRight size={14} className="text-white/50 absolute right-2" />
        <div className="w-5 h-5 rounded-full bg-white/10 absolute" />
      </div>
    </div>
  );
}

export default function PeakMap({
  center,
  zoom = 13,
  pitch = 55,
  bearing = -15,
  height = "h-96",
  maxBounds = null,
  terrain = true,
  terrainExaggeration = 1.5,
  showNavigation = true,
  showScale = true,
  showRotateControl = true,
  onMapLoad,
  onMapClick,
  className = "",
}) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [errorMsg, setErrorMsg] = useState("");
  const [is3D, setIs3D] = useState(terrain);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      setStatus("loading");
      try {
        await loadSDK();
        if (cancelled || !containerRef.current) return;

        const maptilersdk = window.maptilersdk;
        maptilersdk.config.apiKey = API_KEY;

        const mapOptions = {
          container: containerRef.current,
          style: STYLE,
          center,
          zoom,
          pitch,
          bearing,
          antialias: true,
        };
        if (maxBounds) mapOptions.maxBounds = maxBounds;

        const map = new maptilersdk.Map(mapOptions);
        mapRef.current = map;

        map.on("load", () => {
          if (cancelled) return;

          if (terrain) {
            map.addSource("maptiler-dem", {
              type: "raster-dem",
              url: `https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json?key=${API_KEY}`,
              tileSize: 256,
            });
            map.setTerrain({ source: "maptiler-dem", exaggeration: terrainExaggeration });
          }

          if (showNavigation) {
            map.addControl(new maptilersdk.NavigationControl(), "bottom-right");
          }

          if (showScale) {
            map.addControl(new maptilersdk.ScaleControl(), "bottom-left");
          }

          if (onMapLoad) onMapLoad(map);

          if (onMapClick) {
            map.on("click", (e) => onMapClick({ lngLat: e.lngLat, point: e.point }));
          }

          setStatus("ready");
        });

        map.on("error", (e) => {
          console.error("MapTiler error:", e);
        });

      } catch (err) {
        if (!cancelled) {
          setErrorMsg(err.message || "Map failed to load");
          setStatus("error");
        }
      }
    }

    init();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [retryKey]);

  if (status === "loading") {
    return (
      <div className={`${height} bg-peak-surface animate-pulse rounded-2xl flex flex-col items-center justify-center gap-2 ${className}`}>
        <Mountain className="h-8 w-8 text-peak-text-secondary/40" />
        <span className="text-peak-text-secondary text-sm">Loading map...</span>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className={`${height} bg-peak-surface rounded-2xl flex flex-col items-center justify-center gap-3 ${className}`}>
        <Mountain className="h-8 w-8 text-peak-red/50" />
        <p className="text-peak-text-secondary text-sm">{errorMsg || "Map failed to load"}</p>
        <button
          onClick={() => setRetryKey(k => k + 1)}
          className="px-4 py-2 bg-peak-red text-white text-xs font-semibold rounded-lg hover:bg-peak-red-hover transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={`${height} relative rounded-2xl overflow-hidden ${className}`}>
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />
      {showRotateControl && status === "ready" && (
        <RotateControl mapRef={mapRef} is3D={is3D} setIs3D={setIs3D} />
      )}
    </div>
  );
}