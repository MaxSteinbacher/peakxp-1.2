import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Radio, Pause, Square, Play, Mountain, Snowflake, Wind, Volume2, VolumeX, MapPin, Navigation } from "lucide-react";
import { toast } from "sonner";
import { saveActivity, createActivityId, classifySegment, haversineKm, computeStats } from "../../lib/activities";

const MAPTILER_KEY = "lNsV1pOMdNShmVL9tiih";
const MAP_STYLE = `https://api.maptiler.com/maps/019c8160-59cd-7579-afc6-753ee61bd724/style.json?key=${MAPTILER_KEY}`;

function formatTime(s) {
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  return [h, m, sec].map(v => String(v).padStart(2, "0")).join(":");
}

function StatCard({ label, value, unit }) {
  return (
    <div className="bg-peak-surface border border-white/5 rounded-xl p-4">
      <p className="text-peak-text-secondary text-xs mb-1">{label}</p>
      <p className="font-display font-bold text-2xl text-peak-text">{value}<span className="text-sm font-body font-normal text-peak-text-secondary ml-1">{unit}</span></p>
    </div>
  );
}

export default function TrackingRecord() {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);
  const watchIdRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [activityType, setActivityType] = useState("Skiing");
  const [gpsStatus, setGpsStatus] = useState("checking"); // checking | ready | acquiring | unavailable
  const [gpsAccuracy, setGpsAccuracy] = useState(null);
  const [tracking, setTracking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [trackPoints, setTrackPoints] = useState([]);
  const [liveStats, setLiveStats] = useState({ speed: 0, maxSpeed: 0, descent: 0, distance: 0, runs: 0, altitude: 0, turns: 0 });
  const [classification, setClassification] = useState("idle");
  const [lockPosition, setLockPosition] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(() => localStorage.getItem("peakxp_voice") !== "false");
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveName, setSaveName] = useState("");
  const [saveNotes, setSaveNotes] = useState("");
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const trackRef = useRef([]);

  // Load MapTiler
  useEffect(() => {
    if (mapInstance.current) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.maptiler.com/maptiler-sdk-js/latest/maptiler-sdk.css";
    document.head.appendChild(link);
    const script = document.createElement("script");
    script.src = "https://cdn.maptiler.com/maptiler-sdk-js/latest/maptiler-sdk.umd.min.js";
    script.onload = () => {
      window.maptilersdk.config.apiKey = MAPTILER_KEY;
      const map = new window.maptilersdk.Map({
        container: mapRef.current,
        style: MAP_STYLE,
        center: [10.5, 46.5],
        zoom: 10,
        pitch: 45,
        terrain: true,
        terrainExaggeration: 1.5,
      });
      map.on("load", () => {
        map.addSource("tracked-route", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
        map.addLayer({ id: "tracked-route-line", type: "line", source: "tracked-route", paint: { "line-color": "#FB343D", "line-width": 4, "line-opacity": 0.95 }, layout: { "line-cap": "round", "line-join": "round" } });
        map.addSource("route-guide", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
        map.addLayer({ id: "route-guide-line", type: "line", source: "route-guide", paint: { "line-color": "#3894E3", "line-width": 3, "line-dasharray": [2, 1] } });
        mapInstance.current = map;
        setMapLoaded(true);
      });
    };
    document.head.appendChild(script);
  }, []);

  // GPS check
  useEffect(() => {
    if (!navigator.geolocation) { setGpsStatus("unavailable"); return; }
    setGpsStatus("acquiring");
    navigator.geolocation.getCurrentPosition(
      pos => { setGpsStatus("ready"); setGpsAccuracy(Math.round(pos.coords.accuracy)); },
      () => setGpsStatus("unavailable"),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  // Timer
  useEffect(() => {
    if (tracking && !paused) {
      timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [tracking, paused]);

  const updateMap = useCallback((points) => {
    const map = mapInstance.current;
    if (!map || points.length === 0) return;
    const coords = points.map(p => [p.lon, p.lat]);
    map.getSource("tracked-route")?.setData({ type: "FeatureCollection", features: [{ type: "Feature", geometry: { type: "LineString", coordinates: coords } }] });
    const last = points[points.length - 1];
    if (markerRef.current) {
      markerRef.current.setLngLat([last.lon, last.lat]);
    } else {
      const el = document.createElement("div");
      el.className = "w-5 h-5 bg-peak-red rounded-full border-2 border-white shadow-lg";
      markerRef.current = new window.maptilersdk.Marker({ element: el }).setLngLat([last.lon, last.lat]).addTo(map);
    }
    if (lockPosition) map.panTo([last.lon, last.lat], { animate: true, duration: 500 });
  }, [lockPosition]);

  function startTracking() {
    if (!navigator.geolocation) return;
    setTracking(true);
    setPaused(false);
    setElapsed(0);
    setTrackPoints([]);
    trackRef.current = [];
    startTimeRef.current = Date.now();

    watchIdRef.current = navigator.geolocation.watchPosition(pos => {
      const { latitude: lat, longitude: lon, altitude, speed, heading, accuracy } = pos.coords;
      const timestamp = new Date().toISOString();
      const speedKmh = speed ? speed * 3.6 : 0;
      setGpsAccuracy(Math.round(accuracy));

      setTrackPoints(prev => {
        const prevPoint = prev[prev.length - 1];
        const cls = classifySegment(prevPoint, { lat, lon, altitude: altitude || 0, speed: speedKmh, timestamp });
        const newPoint = { lat, lon, altitude: altitude || 0, speed: speedKmh, heading: heading || 0, accuracy, timestamp, classification: cls };
        const next = [...prev, newPoint];
        trackRef.current = next;

        // Update live stats
        let descent = 0, dist = 0, maxSpd = 0, runs = 0, turns = 0;
        let inRun = false;
        for (let i = 1; i < next.length; i++) {
          const p = next[i - 1], c = next[i];
          const dAlt = (c.altitude || 0) - (p.altitude || 0);
          if (dAlt < 0) descent += Math.abs(dAlt);
          if (c.classification === "skiing") { dist += haversineKm(p.lat, p.lon, c.lat, c.lon); if (!inRun) { runs++; inRun = true; } }
          else inRun = false;
          if (c.speed > maxSpd) maxSpd = c.speed;
          if (c.classification === "skiing" && i >= 3) {
            const hd = Math.abs((c.heading || 0) - (p.heading || 0));
            if (hd > 45 && hd < 315) turns++;
          }
        }
        setLiveStats({ speed: Math.round(speedKmh * 10) / 10, maxSpeed: Math.round(maxSpd * 10) / 10, descent: Math.round(descent), distance: Math.round(dist * 10) / 10, runs, altitude: Math.round(altitude || 0), turns });
        setClassification(cls);
        updateMap(next);
        return next;
      });
    }, err => { console.warn("GPS error", err); }, { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 });
  }

  function stopTracking() {
    navigator.geolocation.clearWatch(watchIdRef.current);
    setTracking(false);
    const name = `${activityType} — ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`;
    setSaveName(name);
    setShowSaveModal(true);
  }

  function handleSave() {
    const points = trackRef.current;
    const stats = computeStats(points);
    const activity = {
      id: createActivityId(),
      type: activityType.toLowerCase(),
      name: saveName,
      date: new Date().toISOString(),
      source: "tracked",
      stats,
      trackPoints: points,
      notes: saveNotes,
      isPublic: false,
      images: [],
    };
    saveActivity(activity);
    setShowSaveModal(false);
    toast.success("Activity saved!");
    navigate("/tracking/log");
  }

  const actTypes = [
    { label: "Skiing", icon: Mountain },
    { label: "Snowboard", icon: Snowflake },
    { label: "Freeride", icon: Wind },
  ];

  const clsPill = { skiing: "bg-peak-blue/20 text-peak-blue", lift: "bg-yellow-500/20 text-yellow-400", idle: "bg-peak-surface text-peak-text-secondary" };
  const clsLabel = { skiing: "Skiing", lift: "On lift", idle: "Idle" };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px]" style={{ height: "calc(100vh - 112px)" }}>
      {/* Map */}
      <div className="relative">
        <div ref={mapRef} className="w-full h-[55vh] lg:h-full" />
        {!mapLoaded && (
          <div className="absolute inset-0 bg-peak-bg flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-white/10 border-t-peak-red rounded-full animate-spin" />
          </div>
        )}
        {/* Lock position toggle */}
        <button onClick={() => setLockPosition(v => !v)}
          className={`absolute top-4 right-4 p-2.5 rounded-xl border shadow-lg transition-colors ${lockPosition ? "bg-peak-red text-white border-peak-red" : "bg-peak-card border-white/10 text-peak-text-secondary"}`}>
          <Navigation className="h-4 w-4" />
        </button>
      </div>

      {/* Controls panel */}
      <div className="flex flex-col h-full overflow-y-auto bg-peak-surface border-l border-white/5 p-5 gap-4">
        {!tracking ? (
          <>
            <div>
              <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-3">Activity type</p>
              <div className="grid grid-cols-3 gap-2">
                {actTypes.map(({ label, icon: Icon }) => (
                  <button key={label} onClick={() => setActivityType(label)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${activityType === label ? "border-peak-red/40 bg-peak-red/10" : "border-white/10 bg-peak-surface hover:border-white/20"}`}>
                    <Icon className={`h-5 w-5 ${activityType === label ? "text-peak-red" : "text-peak-text-secondary"}`} />
                    <span className={`text-sm font-medium ${activityType === label ? "text-peak-text" : "text-peak-text-secondary"}`}>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* GPS status */}
            <div className="flex items-center gap-2 text-sm">
              <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${gpsStatus === "ready" ? "bg-peak-green" : gpsStatus === "acquiring" ? "bg-yellow-400 animate-pulse" : "bg-peak-red"}`} />
              <span className="text-peak-text-secondary">
                {gpsStatus === "ready" && `GPS ready — accuracy ${gpsAccuracy}m`}
                {gpsStatus === "acquiring" && "Acquiring GPS signal..."}
                {gpsStatus === "unavailable" && "GPS unavailable — check browser permissions"}
                {gpsStatus === "checking" && "Checking GPS..."}
              </span>
            </div>

            {/* Voice toggle */}
            <button onClick={() => { const v = !voiceEnabled; setVoiceEnabled(v); localStorage.setItem("peakxp_voice", v); }}
              className="flex items-center gap-2 text-sm text-peak-text-secondary hover:text-peak-text transition-colors">
              {voiceEnabled ? <Volume2 className="h-4 w-4 text-peak-blue" /> : <VolumeX className="h-4 w-4" />}
              Voice guidance {voiceEnabled ? "on" : "off"}
            </button>

            <button onClick={startTracking} disabled={gpsStatus !== "ready"}
              className="mt-auto w-full bg-peak-red hover:bg-peak-red-hover disabled:opacity-40 text-white font-bold rounded-2xl py-5 text-lg flex items-center justify-center gap-3 transition-colors">
              <Radio className="h-6 w-6" /> Start Recording
            </button>
          </>
        ) : (
          <>
            {/* Timer */}
            <div className="text-center">
              <p className="font-display font-bold text-5xl text-peak-text tabular-nums">{formatTime(elapsed)}</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${clsPill[classification] || clsPill.idle}`}>{clsLabel[classification]}</span>
                <span className="text-peak-text-secondary text-xs">{activityType}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <StatCard label="Speed" value={liveStats.speed} unit="km/h" />
              <StatCard label="Max speed" value={liveStats.maxSpeed} unit="km/h" />
              <StatCard label="Vertical ↓" value={liveStats.descent} unit="m" />
              <StatCard label="Distance" value={liveStats.distance} unit="km" />
              <StatCard label="Runs" value={liveStats.runs} unit="" />
              <StatCard label="Altitude" value={liveStats.altitude} unit="m" />
              <StatCard label="Turns" value={liveStats.turns} unit="" />
            </div>

            {/* Pause / Stop */}
            <div className="flex gap-3 mt-auto">
              <button onClick={() => { setPaused(p => !p); if (!paused) navigator.geolocation.clearWatch(watchIdRef.current); else startTracking(); }}
                className="flex-1 border border-white/10 text-peak-text-secondary rounded-xl py-3 flex items-center justify-center gap-2 hover:text-peak-text transition-colors">
                {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                {paused ? "Resume" : "Pause"}
              </button>
              <button onClick={stopTracking}
                className="flex-1 bg-peak-red/10 border border-peak-red/20 text-peak-red rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-peak-red/20 transition-colors">
                <Square className="h-4 w-4" /> Stop
              </button>
            </div>
          </>
        )}
      </div>

      {/* Save modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-peak-bg/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-peak-card border border-white/10 rounded-2xl p-6 max-w-md w-full">
            <h3 className="font-display font-bold text-xl text-peak-text mb-4">Save activity</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-peak-text-secondary mb-1 block">Activity name</label>
                <input value={saveName} onChange={e => setSaveName(e.target.value)}
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-3 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
              </div>
              <div>
                <label className="text-xs text-peak-text-secondary mb-1 block">Notes (optional)</label>
                <textarea value={saveNotes} onChange={e => setSaveNotes(e.target.value)} rows={3}
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-3 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue resize-none" />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => { setShowSaveModal(false); setTracking(false); }} className="flex-1 border border-white/10 text-peak-text-secondary rounded-xl py-3 text-sm hover:text-peak-text transition-colors">Discard</button>
              <button onClick={handleSave} className="flex-1 bg-peak-red hover:bg-peak-red-hover text-white font-bold rounded-xl py-3 text-sm transition-colors">Save activity</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}