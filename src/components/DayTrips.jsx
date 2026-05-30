import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Clock, Car, Train, Plane, Navigation } from "lucide-react";
import { useT } from "../lib/i18n";
import { resorts } from "../lib/data";

// ─── Transport mode logic ──────────────────────────────────────────────────
// Thresholds in straight-line km
const DRIVE_MAX_KM = 350;   // under this → car or train
const TRAIN_PREF_KM = 600;  // under this → car/train (train preferred if under 6h)
// For flights we add ~1h airport + ~1h transfer to the ski resort

function getTransportMode(straightKm) {
  if (straightKm < DRIVE_MAX_KM) return "car";
  if (straightKm < TRAIN_PREF_KM) return "car_or_train";
  return "plane";
}

// Haversine straight-line km
function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Estimate realistic travel time from straight-line km by mode
// Road distance ≈ straight-line × 1.35 factor, avg speed 90 km/h for mountain roads
// Train: similar distance but avg 120 km/h and more direct routing
// Plane: flight time (800 km/h) + 1h airport overhead + ~1.5h resort transfer
function estimateTime(straightKm, mode) {
  if (mode === "car") {
    const roadKm = straightKm * 1.35;
    const totalMins = Math.round(roadKm / 85 * 60); // 85 km/h avg incl. mountain sections
    return { mins: totalMins, roadKm: Math.round(roadKm) };
  }
  if (mode === "car_or_train") {
    const roadKm = straightKm * 1.3;
    const totalMins = Math.round(roadKm / 100 * 60);
    return { mins: totalMins, roadKm: Math.round(roadKm) };
  }
  // plane: flight + airport overhead (60 min) + resort transfer (90 min)
  const flightMins = Math.round((straightKm / 800) * 60);
  const totalMins = flightMins + 60 + 90;
  return { mins: totalMins, roadKm: Math.round(straightKm) };
}

function formatTime(mins) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h === 0) return `${m}min`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m.toString().padStart(2, "0")}min`;
}

// ─── IP-based location fallback (free, no key) ────────────────────────────
async function getLocationFromIP() {
  // Try multiple free IP geolocation APIs in sequence
  const apis = [
    async () => {
      const r = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(4000) });
      const d = await r.json();
      if (d.latitude && d.longitude) return { city: d.city || d.region || "your location", lat: d.latitude, lon: d.longitude };
      return null;
    },
    async () => {
      const r = await fetch("https://ip-api.com/json/?fields=city,lat,lon,status", { signal: AbortSignal.timeout(4000) });
      const d = await r.json();
      if (d.status === "success") return { city: d.city || "your location", lat: d.lat, lon: d.lon };
      return null;
    },
    async () => {
      const r = await fetch("https://freeipapi.com/api/json", { signal: AbortSignal.timeout(4000) });
      const d = await r.json();
      if (d.latitude && d.longitude) return { city: d.cityName || "your location", lat: d.latitude, lon: d.longitude };
      return null;
    },
  ];
  for (const api of apis) {
    try {
      const result = await api();
      if (result) return result;
    } catch {}
  }
  // Final fallback: central Europe
  return { city: "Munich", lat: 48.14, lon: 11.58 };
}

// ─── Try to get real road time from OSRM (free, no key) ───────────────────
async function fetchOsrmTime(fromLat, fromLon, toLat, toLon) {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${fromLon},${fromLat};${toLon},${toLat}?overview=false`;
    const res = await fetch(url, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) return null;
    const data = await res.json();
    const route = data.routes?.[0];
    if (!route) return null;
    return {
      mins: Math.round(route.duration / 60),
      roadKm: Math.round(route.distance / 1000),
    };
  } catch {
    return null;
  }
}

// ─── Transport icon ────────────────────────────────────────────────────────
function TransportIcon({ mode, className = "h-3 w-3" }) {
  if (mode === "car") return <Car className={className} />;
  if (mode === "car_or_train") return <Train className={className} />;
  return <Plane className={className} />;
}

// ─── Resort card ───────────────────────────────────────────────────────────
function ResortCard({ resort }) {
  const t = useT();
  const modeLabel = {
    car: t("by_car"),
    car_or_train: t("car_or_train"),
    plane: t("by_plane"),
  }[resort.mode] || "";

  const navigate = useNavigate();
  return (
    <div
      className="group rounded-xl overflow-hidden bg-peak-card border border-white/5 hover:border-peak-blue/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      onClick={() => navigate(`/resort/${resort.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === "Enter" && navigate(`/resort/${resort.id}`)}
    >
      <div className="relative h-32 overflow-hidden">
        <img
          src={resort.image || `https://picsum.photos/seed/${resort.id}/400/250`}
          alt={resort.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-peak-bg/80 to-transparent" />
        {/* Travel time badge */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-peak-bg/80 backdrop-blur-sm px-2 py-0.5 rounded-md">
          <Clock className="h-3 w-3 text-peak-blue flex-shrink-0" />
          <span className="text-white text-xs font-medium">{resort.travelTime}</span>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-display font-bold text-peak-text text-sm leading-tight mb-0.5 truncate">{resort.name}</h3>
        <p className="text-peak-text-secondary text-xs mb-2 truncate">
          {resort.region && resort.region !== resort.country
            ? `${resort.region}, ${resort.country}`
            : resort.country}
        </p>
        <div className="flex items-center gap-2 text-xs text-peak-text-secondary mb-2">
          <span>{resort.pisteKm}km</span>
          <span className="text-white/20">·</span>
          <span>{resort.lifts} {t("lifts")}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-peak-blue text-xs font-medium">
            <MapPin className="h-3 w-3" />
            <span>{resort.roadKm} km</span>
          </div>
          <div className="flex items-center gap-1 text-peak-text-secondary/60 text-xs">
            <TransportIcon mode={resort.mode} className="h-3 w-3" />
            <span>{modeLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────
export default function DayTrips() {
  const t = useT();

  const navigate = useNavigate();
  const [locationState, setLocationState] = useState("idle"); // idle | requesting | granted | denied | error
  const [userCoords, setUserCoords] = useState(null);
  const [cityName, setCityName] = useState(""); // set via IP or GPS
  const [nearbyResorts, setNearbyResorts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Reverse geocode user coords → city name
  async function reverseGeocode(lat, lon) {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
        { headers: { "Accept-Language": "en" } }
      );
      const data = await res.json();
      return (
        data.address?.city ||
        data.address?.town ||
        data.address?.village ||
        data.address?.county ||
        "your location"
      );
    } catch {
      return "your location";
    }
  }

  // Find + rank closest resorts, fetch real OSRM times for top ~12 candidates
  async function computeNearbyResorts(lat, lon) {
    setLoading(true);

    // Score all resorts by straight-line distance
    const scored = resorts
      .filter(r => r.lat && r.lng)
      .map(r => ({
        ...r,
        straightKm: Math.round(haversineKm(lat, lon, r.lat, r.lng)),
        mode: getTransportMode(haversineKm(lat, lon, r.lat, r.lng)),
      }))
      .sort((a, b) => a.straightKm - b.straightKm)
      .slice(0, 12); // top 12 candidates

    // For car/car_or_train modes, try OSRM for top 8 candidates
    // Run up to 4 OSRM requests (the rest use estimates)
    const withTimes = await Promise.all(
      scored.map(async (r, i) => {
        let timeData = null;
        if (r.mode !== "plane" && i < 8) {
          timeData = await fetchOsrmTime(lat, lon, r.lat, r.lng);
        }
        if (!timeData) {
          timeData = estimateTime(r.straightKm, r.mode);
        }
        return {
          ...r,
          travelTime: formatTime(timeData.mins),
          roadKm: timeData.roadKm,
          travelMins: timeData.mins,
        };
      })
    );

    // Sort by actual travel time and pick top 6
    const top6 = withTimes
      .sort((a, b) => a.travelMins - b.travelMins)
      .slice(0, 6);

    setNearbyResorts(top6);
    setLoading(false);
  }

  // On mount: try to detect location silently (no prompt) using cached permission
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationState("denied");
      getLocationFromIP().then(({ city, lat, lon }) => {
        setCityName(city);
        setUserCoords({ lat, lon });
      });
      return;
    }

    // Check if permission already granted without prompting
    if (navigator.permissions) {
      navigator.permissions.query({ name: "geolocation" }).then(result => {
        if (result.state === "granted") {
          requestLocation();
        } else if (result.state === "denied") {
          setLocationState("denied");
          // Use IP geolocation as fallback
          getLocationFromIP().then(({ city, lat, lon }) => {
            setCityName(city);
            setUserCoords({ lat, lon });
          });
        } else {
          setLocationState("idle"); // prompt state — wait for user to click
        }
      });
    } else {
      // Can't check permission — show prompt
      setLocationState("idle");
    }
  }, []);

  // When userCoords change, compute nearby resorts
  useEffect(() => {
    if (userCoords) {
      computeNearbyResorts(userCoords.lat, userCoords.lon);
    }
  }, [userCoords]);

  function requestLocation() {
    setLocationState("requesting");
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        setLocationState("granted");
        const city = await reverseGeocode(coords.latitude, coords.longitude);
        setCityName(city);
        setUserCoords({ lat: coords.latitude, lon: coords.longitude });
      },
      () => {
        setLocationState("denied");
        getLocationFromIP().then(({ city, lat, lon }) => {
          setCityName(city);
          setUserCoords({ lat, lon });
        });
      },
      { timeout: 8000, maximumAge: 300000 }
    );
  }

  // Show enable-location prompt if idle
  if (locationState === "idle") {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="h-4 w-4 text-peak-blue" />
            <span className="text-peak-blue text-xs font-semibold uppercase tracking-widest">
              {t("day_trips_location_label")}
            </span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-peak-text">
            {t("day_trips_from")} …
          </h2>
        </div>
        <div className="bg-peak-card border border-white/8 rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6 max-w-2xl">
          <div className="w-14 h-14 rounded-2xl bg-peak-blue/10 flex items-center justify-center flex-shrink-0">
            <Navigation className="h-7 w-7 text-peak-blue" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="text-peak-text font-semibold text-base mb-1">
              {t("day_trips_enable_location")}
            </p>
            <p className="text-peak-text-secondary text-sm mb-4">
              {t("day_trips_enable_desc")}
            </p>
            <button
              onClick={requestLocation}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-peak-red hover:bg-peak-red-hover text-white text-sm font-semibold rounded-xl transition-colors"
            >
              <Navigation className="h-4 w-4" />
              {t("day_trips_enable_btn")}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <MapPin className="h-4 w-4 text-peak-blue" />
          <span className="text-peak-blue text-xs font-semibold uppercase tracking-widest">
            {locationState === "denied"
              ? t("day_trips_no_location")
              : t("day_trips_location_label")}
          </span>
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-peak-text">
          {t("day_trips_from")} {cityName || "…"}
        </h2>
        <p className="text-peak-text-secondary text-sm mt-1">{t("day_trips_subline")}</p>
      </div>

      {(loading || locationState === "requesting") ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden bg-peak-card border border-white/5 animate-pulse">
              <div className="h-32 bg-white/5" />
              <div className="p-3 space-y-2">
                <div className="h-3 bg-white/8 rounded w-3/4" />
                <div className="h-2.5 bg-white/5 rounded w-1/2" />
                <div className="h-2.5 bg-white/5 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {nearbyResorts.map(resort => (
            <ResortCard key={resort.id} resort={resort} />
          ))}
        </div>
      )}
    </section>
  );
}