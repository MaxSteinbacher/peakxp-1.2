import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Radio, Square, Pause, Play, Mountain, Snowflake, Wind, Volume2, VolumeX, Locate, LocateOff } from "lucide-react";
import { toast } from "sonner";
import { saveActivity, createActivityId, classifySegment } from "../../lib/activities";

const MAPTILER_KEY = "lNsV1pOMdNShmVL9tiih";
const MAP_STYLE = `https://api.maptiler.com/maps/019c8160-59cd-7579-afc6-753ee61bd724/style.json?key=${MAPTILER_KEY}`;

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function fmtTime(s) {
  const h = Math.floor(s/3600).toString().padStart(2,"0");
  const m = Math.floor((s%3600)/60).toString().padStart(2,"0");
  const sec = Math.floor(s%60).toString().padStart(2,"0");
  return `${h}:${m}:${sec}`;
}

export default function TrackingRecord() {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const watchIdRef = useRef(null);
  const trackPointsRef = useRef([]);
  const lastHeadingsRef = useRef([]);

  const [mapLoaded, setMapLoaded] = useState(false);
  const [activityType, setActivityType] = useState("Skiing");
  const [gpsStatus, setGpsStatus] = useState("acquiring"); // acquiring | ready | unavailable
  const [gpsAccuracy, setGpsAccuracy] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [lockPosition, setLockPosition] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(() => localStorage.getItem("peakxp_voice") !== "false");
  const [savedRoutes] = useState(() => { try { return JSON.parse(localStorage.getItem("peakxp_routes") || "[]"); } catch { return []; } });
  const [selectedRoute, setSelectedRoute] = useState("");
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [activityName, setActivityName] = useState("");
  const [notes, setNotes] = useState("");
  const [currentClassification, setCurrentClassification] = useState("idle");

  const [liveStats, setLiveStats] = useState({
    speed: 0, maxSpeed: 0, verticalDescent: 0,
    distance: 0, runs: 0, altitude: null, turns: 0,
    durationSkiing: 0, durationLift: 0, durationIdle: 0,
  });

  // Load MapTiler
  useEffect(() => {
    if (mapInstanceRef.current) return;
    const script = document.createElement("script");
    script.src = "https://cdn.maptiler.com/maptiler-sdk-js/v2.2.0/maptiler-sdk.umd.min.js";
    script.onload = () => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://cdn.maptiler.com/maptiler-sdk-js/v2.2.0/maptiler-sdk.css";
      document.head.appendChild(link);

      const maptilersdk = window.maptilersdk;
      maptilersdk.config.apiKey = MAPTILER_KEY;
      const map = new maptilersdk.Map({
        container: mapRef.current,
        style: MAP_STYLE,
        center: [10.5, 46.5],
        zoom: 10,
        pitch: 45,
        bearing: 0,
        terrain: { source: "terrain", exaggeration: 1.5 },
      });

      map.on("load", () => {
        map.addSource("tracked-route", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
        map.addLayer({ id: "tracked-route-layer", type: "line", source: "tracked-route", paint: { "line-color": "#FB343D", "line-width": 4, "line-opacity": 0.95 }, layout: { "line-cap": "round", "line-join": "round" } });

        map.addSource("route-guide", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
        map.addLayer({ id: "route-guide-layer", type: "line", source: "route-guide", paint: { "line-color": "#3894E3", "line-width": 3, "line-dasharray": [2, 1] } });

        // Position marker
        const el = document.createElement("div");
        el.className = "w-5 h-5 bg-peak-red rounded-full border-2 border-white shadow-lg";
        el.style.cssText = "width:20px;height:20px;background:#FB343D;border-radius:50%;border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.5);";
        const marker = new maptilersdk.Marker({ element: el }).setLngLat([10.5, 46.5]).addTo(map);
        markerRef.current = marker;

        mapInstanceRef.current = map;
        setMapLoaded(true);
      });
    };
    document.head.appendChild(script);
    return () => { if (watchIdRef.current) navigator.geolocation.clearWatch(watchIdRef.current); };
  }, []);

  // GPS status check
  useEffect(() => {
    if (!navigator.geolocation) { setGpsStatus("unavailable"); return; }
    const id = navigator.geolocation.watchPosition(
      (pos) => { setGpsStatus("ready"); setGpsAccuracy(Math.round(pos.coords.accuracy)); },
      () => setGpsStatus("unavailable"),
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 15000 }
    );
    return () => navigator.geolocation.clearWatch(id);
  }, []);

  // Timer
  useEffect(() => {
    if (!isTracking || isPaused) return;
    const t = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(t);
  }, [isTracking, isPaused]);

  const processGPSPoint = useCallback((pos) => {
    if (isPaused) return;
    const { latitude: lat, longitude: lon, altitude, speed, heading, accuracy } = pos.coords;
    const timestamp = new Date().toISOString();
    const pts = trackPointsRef.current;
    const prev = pts[pts.length - 1];
    const classification = classifySegment(prev, { lat, lon, altitude, speed, heading, timestamp });

    const point = { lat, lon, altitude, speed: speed ? speed * 3.6 : 0, heading, accuracy, timestamp, classification };
    pts.push(point);
    trackPointsRef.current = pts;

    setCurrentClassification(classification);

    // Update map
    const map = mapInstanceRef.current;
    if (map) {
      const coords = pts.map(p => [p.lon, p.lat]);
      map.getSource("tracked-route").setData({ type: "FeatureCollection", features: [{ type: "Feature", geometry: { type: "LineString", coordinates: coords } }] });
      if (markerRef.current) markerRef.current.setLngLat([lon, lat]);
      if (lockPosition) map.panTo([lon, lat], { animate: true, duration: 500 });
    }

    // Update stats
    setLiveStats(prev => {
      const spd = point.speed;
      const maxSpd = Math.max(prev.maxSpeed, spd);
      const dAlt = altitude != null && prev.lastAlt != null ? prev.lastAlt - altitude : 0;
      const vDesc = prev.verticalDescent + (dAlt > 0 ? dAlt : 0);
      const dist = pts.length > 1 && classification === "skiing"
        ? prev.distance + haversine(pts[pts.length - 2].lat, pts[pts.length - 2].lon, lat, lon) / 1000
        : prev.distance;

      // Turn detection
      let turns = prev.turns;
      if (heading != null && classification === "skiing") {
        lastHeadingsRef.current.push({ heading, time: Date.now() });
        lastHeadingsRef.current = lastHeadingsRef.current.filter(h => Date.now() - h.time < 3000);
        if (lastHeadingsRef.current.length >= 2) {
          const first = lastHeadingsRef.current[0].heading;
          const last = heading;
          const diff = Math.abs(((last - first + 540) % 360) - 180);
          if (diff > 45) { turns++; lastHeadingsRef.current = []; }
        }
      }

      return {
        speed: Math.round(spd * 10) / 10,
        maxSpeed: Math.round(maxSpd * 10) / 10,
        verticalDescent: Math.round(vDesc),
        distance: Math.round(dist * 100) / 100,
        runs: prev.runs,
        altitude: altitude ? Math.round(altitude) : prev.altitude,
        turns,
        lastAlt: altitude,
        durationSkiing: classification === "skiing" ? prev.durationSkiing + 1 : prev.durationSkiing,
        durationLift: classification === "lift" ? prev.durationLift + 1 : prev.durationLift,
        durationIdle: classification === "idle" ? prev.durationIdle + 1 : prev.durationIdle,
      };
    });

    // Voice guidance
    if (voiceEnabled && selectedRoute) {
      const route = savedRoutes.find(r => r.id === selectedRoute);
      if (route?.waypoints) {
        route.waypoints.forEach((wp, i) => {
          const dist = haversine(lat, lon, wp.lat, wp.lng);
          if (dist < 50 && i < route.waypoints.length - 1) {
            const next = route.waypoints[i + 1];
            const msg = next.isLift
              ? `At the bottom, board the ${next.name} to continue your tour.`
              : `In 50 metres, ahead: ${next.name}`;
            window.speechSynthesis?.speak(new SpeechSynthesisUtterance(msg));
          }
        });
      }
    }
  }, [isPaused, lockPosition, voiceEnabled, selectedRoute, savedRoutes]);

  function startTracking() {
    setIsTracking(true);
    setElapsed(0);
    trackPointsRef.current = [];
    setLiveStats({ speed: 0, maxSpeed: 0, verticalDescent: 0, distance: 0, runs: 0, altitude: null, turns: 0, durationSkiing: 0, durationLift: 0, durationIdle: 0 });
    watchIdRef.current = navigator.geolocation.watchPosition(processGPSPoint, () => {}, { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 });
  }

  function stopTracking() {
    if (watchIdRef.current) navigator.geolocation.clearWatch(watchIdRef.current);
    setIsTracking(false);
    setIsPaused(false);
    const date = new Date().toLocaleDateString("en-GB");
    setActivityName(`${activityType} ${date}`);
    setShowSaveModal(true);
  }

  function saveAndNavigate() {
    const pts = trackPointsRef.current;
    const activity = {
      id: createActivityId(),
      userId: null,
      type: activityType.toLowerCase(),
      name: activityName,
      date: new Date().toISOString(),
      resortId: null,
      resortName: null,
      source: "tracked",
      stats: {
        durationTotal: elapsed,
        durationSkiing: liveStats.durationSkiing,
        durationLift: liveStats.durationLift,
        durationIdle: liveStats.durationIdle,
        distanceDownhill: liveStats.distance,
        maxSpeed: liveStats.maxSpeed,
        avgSpeed: 0,
        verticalDescent: liveStats.verticalDescent,
        verticalAscent: 0,
        runs: liveStats.runs,
        turns: liveStats.turns,
        maxAltitude: null,
        minAltitude: null,
        startAltitude: pts[0]?.altitude || null,
      },
      trackPoints: pts,
      gpxData: null,
      notes,
      isPublic: false,
      images: [],
    };
    saveActivity(activity);
    toast.success("Activity saved!");
    navigate("/tracking/log");
  }

  const clsPill = {
    skiing: "bg-peak-blue/20 text-peak-blue",
    lift: "bg-yellow-500/20 text-yellow-400",
    idle: "bg-peak-surface text-peak-text-secondary",
  };
  const clsLabel = { skiing: "Skiing", lift: "On lift", idle: "Idle" };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] h-[calc(100vh-112px)]">
      {/* Map Panel */}
      <div className="relative h-[55vh] lg:h-full">
        <div ref={mapRef} className="w-full h-full" />
        {/* Lock button */}
        <button
          onClick={() => setLockPosition(v => !v)}
          className={`absolute top-4 right-4 z-10 p-2.5 rounded-xl border backdrop-blur-sm transition-colors ${lockPosition ? "bg-peak-blue/20 border-peak-blue/40 text-peak-blue" : "bg-peak-bg/70 border-white/10 text-peak-text-secondary"}`}
        >
          {lockPosition ? <Locate className="h-4 w-4" /> : <LocateOff className="h-4 w-4" />}
        </button>
      </div>

      {/* Controls Panel */}
      <div className="flex flex-col h-full p-5 gap-4 overflow-y-auto bg-peak-surface border-l border-white/5">
        {!isTracking ? (
          <>
            {/* Activity type */}
            <div>
              <p className="text-xs font-semibold text-peak-text-secondary uppercase tracking-widest mb-3">Activity type</p>
              <div className="grid grid-cols-3 gap-2">
                {[{ type: "Skiing", Icon: Mountain }, { type: "Snowboard", Icon: Snowflake }, { type: "Freeride", Icon: Wind }].map(({ type, Icon }) => (
                  <button key={type} onClick={() => setActivityType(type)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border cursor-pointer transition-all ${activityType === type ? "border-peak-red/40 bg-peak-red/10" : "bg-peak-surface border-white/10 hover:border-white/20"}`}>
                    <Icon className={`h-5 w-5 ${activityType === type ? "text-peak-red" : "text-peak-text-secondary"}`} />
                    <span className={`text-sm font-medium ${activityType === type ? "text-peak-text" : "text-peak-text-secondary"}`}>{type}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Route selector */}
            <div className="bg-peak-card border border-white/5 rounded-xl p-4">
              <p className="text-peak-text-secondary text-sm mb-2">Follow a saved route (optional)</p>
              {savedRoutes.length === 0 ? (
                <p className="text-peak-text-secondary text-xs">No saved routes — <a href="/resort/map" className="text-peak-blue underline">create one in Route Planner</a></p>
              ) : (
                <select value={selectedRoute} onChange={e => setSelectedRoute(e.target.value)}
                  className="w-full bg-peak-surface border border-white/10 rounded-lg px-3 py-2 text-sm text-peak-text outline-none">
                  <option value="">— No route —</option>
                  {savedRoutes.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                </select>
              )}
            </div>

            {/* GPS status */}
            <div className="flex items-center gap-2 text-sm">
              {gpsStatus === "ready" && <><span className="w-2.5 h-2.5 rounded-full bg-peak-green flex-shrink-0" /><span className="text-peak-text">GPS ready — accuracy {gpsAccuracy}m</span></>}
              {gpsStatus === "acquiring" && <><span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse flex-shrink-0" /><span className="text-yellow-400">Acquiring GPS signal...</span></>}
              {gpsStatus === "unavailable" && <><span className="w-2.5 h-2.5 rounded-full bg-peak-red flex-shrink-0" /><span className="text-peak-red">GPS unavailable — check browser permissions</span></>}
            </div>

            {/* Voice toggle */}
            <button onClick={() => { const v = !voiceEnabled; setVoiceEnabled(v); localStorage.setItem("peakxp_voice", String(v)); }}
              className="flex items-center gap-2 text-sm text-peak-text-secondary">
              {voiceEnabled ? <Volume2 className="h-4 w-4 text-peak-blue" /> : <VolumeX className="h-4 w-4" />}
              Voice guidance {voiceEnabled ? "on" : "off"}
            </button>

            {/* Start button */}
            <button
              onClick={startTracking}
              disabled={gpsStatus !== "ready"}
              className="w-full bg-peak-red hover:bg-peak-red-hover disabled:opacity-40 text-white font-bold rounded-2xl py-5 text-lg flex items-center justify-center gap-3 transition-colors mt-auto"
            >
              <Radio className="h-6 w-6" /> Start Recording
            </button>
          </>
        ) : (
          <>
            {/* Timer */}
            <div className="text-center">
              <div className="font-display font-bold text-5xl text-peak-text tabular-nums">{fmtTime(elapsed)}</div>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${clsPill[currentClassification]}`}>{clsLabel[currentClassification]}</span>
                <span className="text-peak-text-secondary text-xs">{activityType}</span>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Speed", value: liveStats.speed, unit: "km/h" },
                { label: "Max Speed", value: liveStats.maxSpeed, unit: "km/h" },
                { label: "Vertical", value: liveStats.verticalDescent, unit: "m ↓" },
                { label: "Distance", value: liveStats.distance, unit: "km" },
                { label: "Runs", value: liveStats.runs, unit: "" },
                { label: "Turns", value: liveStats.turns, unit: "" },
                { label: "Altitude", value: liveStats.altitude ?? "—", unit: liveStats.altitude ? "m" : "" },
                { label: "Accuracy", value: gpsAccuracy ?? "—", unit: gpsAccuracy ? "m" : "" },
              ].map(s => (
                <div key={s.label} className="bg-peak-surface border border-white/5 rounded-xl p-4">
                  <div className="font-display font-bold text-2xl text-peak-text">{s.value}<span className="text-sm ml-1 text-peak-text-secondary">{s.unit}</span></div>
                  <div className="text-xs text-peak-text-secondary mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-auto">
              <button onClick={() => setIsPaused(v => !v)}
                className="flex-1 border border-white/10 text-peak-text-secondary rounded-xl py-3 flex items-center justify-center gap-2 hover:text-peak-text transition-colors">
                {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                {isPaused ? "Resume" : "Pause"}
              </button>
              <button onClick={stopTracking}
                className="flex-1 bg-peak-red/10 border border-peak-red/20 text-peak-red rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-peak-red/20 transition-colors">
                <Square className="h-4 w-4" /> Stop
              </button>
            </div>
          </>
        )}
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-peak-bg/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-peak-card border border-white/10 rounded-2xl p-6 max-w-md w-full mx-4">
            <h2 className="font-display font-bold text-2xl text-peak-text mb-4">Save activity</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-peak-text-secondary uppercase tracking-widest mb-1 block">Activity name</label>
                <input value={activityName} onChange={e => setActivityName(e.target.value)}
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
              </div>
              <div>
                <label className="text-xs text-peak-text-secondary uppercase tracking-widest mb-1 block">Notes (optional)</label>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3}
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue resize-none" />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => { setShowSaveModal(false); setIsTracking(false); }}
                  className="flex-1 border border-white/10 text-peak-text-secondary rounded-xl py-3 hover:text-peak-text transition-colors">
                  Discard
                </button>
                <button onClick={saveAndNavigate}
                  className="flex-1 bg-peak-red hover:bg-peak-red-hover text-white font-bold rounded-xl py-3 transition-colors">
                  Save activity
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}