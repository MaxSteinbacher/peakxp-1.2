import { useState, useMemo, useRef } from "react";
import {
  Hotel, Star, MapPin, Wifi, ChevronDown, ChevronUp, ChevronLeft,
  ChevronRight, Check, X, Users, Calendar, SlidersHorizontal,
  Snowflake, Car, Utensils, Dumbbell, Waves, Shield, Info,
  ArrowRight, Heart, Share2,
} from "lucide-react";
import { hotels as hotelData } from "../../lib/hotels";
import { resorts as allResorts } from "../../lib/data";
import { haversineKm } from "../../lib/proximity";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function addDays(dateStr, n) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  d.setDate(d.getDate() + n);
  return d.toISOString().split("T")[0];
}

function fmtDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function nightsBetween(a, b) {
  if (!a || !b) return 0;
  return Math.max(0, Math.round((new Date(b) - new Date(a)) / 86400000));
}

function seededOffset(str, scale) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  return ((Math.abs(hash) % 1000) / 1000 - 0.5) * scale;
}

// ─── Build the full hotel catalogue with coordinates + distance ────────────────

function buildHotelList(resortCoords) {
  // Use real hotel data, add fake coordinates for those without
  return hotelData.map((h, idx) => {
    const coords = h.coordinates || {
      lat: (resortCoords?.lat || 46) + seededOffset(h.id + "lat", 0.3),
      lon: (resortCoords?.lon || 10) + seededOffset(h.id + "lon", 0.3),
    };
    const dist = resortCoords
      ? haversineKm(resortCoords.lat, resortCoords.lon, coords.lat, coords.lon)
      : null;
    return {
      ...h,
      coordinates: coords,
      distanceKm: dist,
      // Ensure rooms exist
      rooms: h.rooms?.filter(r => r.pricePerNight) || [
        { id: "std", name: "Standard Room", description: "Comfortable alpine room.", maxGuests: 2, pricePerNight: h.priceFrom || 150, amenities: ["Free WiFi", "TV", "Bathroom"], available: true },
      ],
      amenities: h.amenities || [],
    };
  });
}

// ─── Room type pill ────────────────────────────────────────────────────────────

const AMENITY_ICONS = {
  "Free WiFi": Wifi, "Spa": Waves, "Pool": Waves, "Indoor Pool": Waves,
  "Parking": Car, "Underground Parking": Car, "Restaurant": Utensils,
  "Fitness Centre": Dumbbell, "Ski Storage": Snowflake,
};

function AmenityBadge({ label }) {
  const Icon = AMENITY_ICONS[label] || null;
  return (
    <span className="flex items-center gap-1 text-xs text-peak-text-secondary bg-peak-surface border border-white/8 px-2 py-0.5 rounded-full whitespace-nowrap">
      {Icon && <Icon className="h-2.5 w-2.5 flex-shrink-0" />}
      {label}
    </span>
  );
}

// ─── Single hotel card — big, premium, Booking.com–inspired ───────────────────

function HotelCard({ hotel, nights, guests, onSelect }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [saved, setSaved] = useState(false);
  const images = hotel.images?.length ? hotel.images : ["https://picsum.photos/seed/" + hotel.id + "/800/500"];
  const rooms = hotel.rooms || [];

  const cheapestRoom = rooms.reduce((a, b) => (!a || b.pricePerNight < a.pricePerNight) ? b : a, null);
  const activeRoom = selectedRoom || cheapestRoom;
  const totalPrice = activeRoom ? activeRoom.pricePerNight * nights : hotel.priceFrom * nights;

  return (
    <div className="bg-peak-card border border-white/8 rounded-2xl overflow-hidden hover:border-peak-blue/30 transition-all group">
      {/* Image carousel */}
      <div className="relative h-52 overflow-hidden flex-shrink-0">
        <img
          src={images[imgIdx] || images[0]}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
        />
        {/* Nav arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); setImgIdx(i => Math.max(0, i - 1)); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-peak-bg/70 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-peak-bg"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setImgIdx(i => Math.min(images.length - 1, i + 1)); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-peak-bg/70 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-peak-bg"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            {/* Dots */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.slice(0, 5).map((_, i) => (
                <button key={i} onClick={(e) => { e.stopPropagation(); setImgIdx(i); }}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${i === imgIdx ? "bg-white w-3" : "bg-white/40"}`} />
              ))}
            </div>
          </>
        )}
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          {hotel.logo && (
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center p-1 shadow">
              <img src={hotel.logo} alt="" className="w-full h-full object-contain" />
            </div>
          )}
          {hotel.stars && (
            <div className="flex items-center gap-0.5 bg-peak-bg/80 backdrop-blur-sm px-2 py-1 rounded-full">
              {Array.from({ length: hotel.stars }).map((_, i) => (
                <Star key={i} className="h-2.5 w-2.5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          )}
        </div>
        <div className="absolute top-3 right-3 flex gap-1.5">
          <button onClick={(e) => { e.stopPropagation(); setSaved(s => !s); }}
            className="w-8 h-8 rounded-full bg-peak-bg/70 backdrop-blur-sm flex items-center justify-center hover:bg-peak-bg transition-colors">
            <Heart className={`h-4 w-4 ${saved ? "fill-peak-red text-peak-red" : "text-white"}`} />
          </button>
        </div>
        {hotel.distanceKm != null && (
          <div className="absolute bottom-3 right-3 bg-peak-bg/80 backdrop-blur-sm rounded-full px-2.5 py-1 text-xs text-peak-text flex items-center gap-1">
            <MapPin className="h-3 w-3 text-peak-blue" />
            {hotel.distanceKm < 1 ? `${Math.round(hotel.distanceKm * 1000)}m` : `${hotel.distanceKm}km`} from resort
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-peak-text text-lg leading-tight truncate">{hotel.name}</h3>
            <p className="text-peak-text-secondary text-xs mt-0.5">{hotel.city}{hotel.country ? `, ${hotel.country}` : ""}</p>
          </div>
          {hotel.rating > 0 && (
            <div className="bg-peak-blue text-white text-sm font-bold px-2.5 py-1 rounded-lg flex-shrink-0">
              {hotel.rating.toFixed(1)}
            </div>
          )}
        </div>

        {/* Top amenities row */}
        <div className="flex flex-wrap gap-1 mb-4">
          {(hotel.amenities || []).slice(0, 5).map(a => <AmenityBadge key={a} label={a} />)}
        </div>

        {/* Room selector */}
        {rooms.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-peak-text-secondary uppercase tracking-wider mb-2">Room type</p>
            <div className="space-y-1.5">
              {rooms.slice(0, expanded ? rooms.length : 2).map(room => (
                <button
                  key={room.id}
                  onClick={() => setSelectedRoom(room)}
                  className={[
                    "w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all",
                    (selectedRoom?.id || cheapestRoom?.id) === room.id
                      ? "border-peak-blue/50 bg-peak-blue/8"
                      : "border-white/8 hover:border-white/20",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className={[
                      "w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 flex items-center justify-center",
                      (selectedRoom?.id || cheapestRoom?.id) === room.id ? "border-peak-blue" : "border-white/30",
                    ].join(" ")}>
                      {(selectedRoom?.id || cheapestRoom?.id) === room.id && (
                        <div className="w-1.5 h-1.5 rounded-full bg-peak-blue" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-peak-text text-xs font-semibold truncate">{room.name}</p>
                      <p className="text-peak-text-secondary text-xs truncate">{room.description?.slice(0, 55)}{room.description?.length > 55 ? "…" : ""}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-3">
                    <p className="text-peak-text font-bold text-sm">€{room.pricePerNight}</p>
                    <p className="text-peak-text-secondary text-xs">/night</p>
                  </div>
                </button>
              ))}
            </div>
            {rooms.length > 2 && (
              <button onClick={() => setExpanded(e => !e)}
                className="flex items-center gap-1 text-xs text-peak-blue hover:underline mt-1.5">
                {expanded ? <><ChevronUp className="h-3 w-3" /> Show fewer</> : <><ChevronDown className="h-3 w-3" /> {rooms.length - 2} more room type{rooms.length - 2 !== 1 ? "s" : ""}</>}
              </button>
            )}
          </div>
        )}

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div>
            <p className="text-peak-text font-bold text-xl">€{totalPrice.toLocaleString()}</p>
            <p className="text-peak-text-secondary text-xs">{nights} night{nights !== 1 ? "s" : ""} · {activeRoom?.name || "Room"}</p>
          </div>
          <button
            onClick={() => onSelect(hotel, activeRoom || cheapestRoom, totalPrice)}
            className="bg-peak-red hover:bg-peak-red-hover text-white font-bold text-sm px-5 py-3 rounded-xl transition-colors flex items-center gap-2"
          >
            Select <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Date input button ─────────────────────────────────────────────────────────

function DateButton({ label, value, onClick }) {
  return (
    <button onClick={onClick}
      className="flex flex-col items-start px-4 py-3 bg-peak-surface border border-white/10 rounded-xl hover:border-peak-blue/50 transition-colors text-left w-full">
      <span className="text-peak-text-secondary text-xs font-semibold uppercase tracking-wide">{label}</span>
      <span className={`text-sm font-semibold mt-0.5 ${value ? "text-peak-text" : "text-peak-text-secondary/50"}`}>
        {value ? fmtDate(value) : "Add date"}
      </span>
    </button>
  );
}

// ─── Simple inline date picker ─────────────────────────────────────────────────

function MiniDatePicker({ value, onChange, min, label, onClose }) {
  return (
    <div className="absolute z-50 top-full left-0 mt-1 bg-peak-card border border-white/10 rounded-2xl shadow-2xl p-4 w-64">
      <div className="flex items-center justify-between mb-3">
        <p className="text-peak-text text-sm font-semibold">{label}</p>
        <button onClick={onClose} className="text-peak-text-secondary hover:text-peak-text"><X className="h-4 w-4" /></button>
      </div>
      <input
        type="date"
        value={value || ""}
        min={min || new Date().toISOString().split("T")[0]}
        onChange={e => { onChange(e.target.value); onClose(); }}
        className="w-full bg-peak-surface border border-white/10 rounded-xl px-3 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue"
      />
    </div>
  );
}

// ─── Filter sidebar ────────────────────────────────────────────────────────────

function FilterBar({ filters, setFilters }) {
  const STAR_OPTIONS = [3, 4, 5];
  const AMENITY_OPTIONS = ["Free WiFi", "Spa", "Pool", "Ski Storage", "Parking", "Restaurant"];

  return (
    <div className="bg-peak-card border border-white/8 rounded-2xl p-5 space-y-5 sticky top-4">
      <p className="text-peak-text font-semibold text-sm">Filters</p>

      <div>
        <p className="text-xs font-semibold text-peak-text-secondary uppercase tracking-wider mb-2">Price per night</p>
        <div className="flex gap-2 flex-wrap">
          {[["Any", null, null], ["Under €150", 0, 150], ["€150–€300", 150, 300], ["€300+", 300, 9999]].map(([label, min, max]) => (
            <button key={label}
              onClick={() => setFilters(f => ({ ...f, priceMin: min, priceMax: max }))}
              className={[
                "px-3 py-1.5 text-xs rounded-full border transition-colors",
                (filters.priceMin === min && filters.priceMax === max)
                  ? "bg-peak-blue/20 border-peak-blue/50 text-peak-blue"
                  : "border-white/10 text-peak-text-secondary hover:text-peak-text",
              ].join(" ")}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-peak-text-secondary uppercase tracking-wider mb-2">Stars</p>
        <div className="flex gap-2">
          {STAR_OPTIONS.map(s => (
            <button key={s}
              onClick={() => setFilters(f => ({ ...f, stars: f.stars.includes(s) ? f.stars.filter(x => x !== s) : [...f.stars, s] }))}
              className={[
                "px-3 py-1.5 text-xs rounded-full border transition-colors",
                filters.stars.includes(s)
                  ? "bg-yellow-400/20 border-yellow-400/40 text-yellow-400"
                  : "border-white/10 text-peak-text-secondary hover:text-peak-text",
              ].join(" ")}>
              {"★".repeat(s)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-peak-text-secondary uppercase tracking-wider mb-2">Amenities</p>
        <div className="space-y-1">
          {AMENITY_OPTIONS.map(a => (
            <label key={a} className="flex items-center gap-2 cursor-pointer py-0.5">
              <div
                onClick={() => setFilters(f => ({ ...f, amenities: f.amenities.includes(a) ? f.amenities.filter(x => x !== a) : [...f.amenities, a] }))}
                className={[
                  "w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors",
                  filters.amenities.includes(a) ? "bg-peak-blue border-peak-blue" : "border-white/20",
                ].join(" ")}>
                {filters.amenities.includes(a) && <Check className="h-2.5 w-2.5 text-white" />}
              </div>
              <span className="text-sm text-peak-text-secondary">{a}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-peak-text-secondary uppercase tracking-wider mb-2">Max distance to resort</p>
        <div className="flex gap-2 flex-wrap">
          {[["Any", 999], ["< 1km", 1], ["< 5km", 5], ["< 20km", 20]].map(([label, km]) => (
            <button key={label}
              onClick={() => setFilters(f => ({ ...f, maxDistKm: km }))}
              className={[
                "px-3 py-1.5 text-xs rounded-full border transition-colors",
                filters.maxDistKm === km
                  ? "bg-peak-blue/20 border-peak-blue/50 text-peak-blue"
                  : "border-white/10 text-peak-text-secondary hover:text-peak-text",
              ].join(" ")}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <button onClick={() => setFilters({ priceMin: null, priceMax: null, stars: [], amenities: [], maxDistKm: 999 })}
        className="text-xs text-peak-blue hover:underline">
        Clear all filters
      </button>
    </div>
  );
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function AccommodationBooking({ resort, resortEntry, session, handleAdd, handleSkip, completeAndAdvanceAll }) {
  const isMultiResort = (session?.resorts?.length || 0) > 1;
  const totalNights = session?.dates?.nights || 3;
  const sessionStart = session?.dates?.start ? session.dates.start.split("T")[0] : null;
  const sessionEnd = session?.dates?.end ? session.dates.end.split("T")[0] : null;

  // ── Strategy persisted in sessionStorage across all resort accommodation steps ──
  const STRATEGY_KEY = `accomMode_${session?.id || "trip"}`;
  const [accomMode, setAccomModeState] = useState(() => {
    try { return sessionStorage.getItem(STRATEGY_KEY) || null; }
    catch { return null; }
  });
  function setAccomMode(mode) {
    setAccomModeState(mode);
    try {
      if (mode) sessionStorage.setItem(STRATEGY_KEY, mode);
      else sessionStorage.removeItem(STRATEGY_KEY);
    } catch {}
  }

  // ── Compute nights for this resort if per-resort mode ──────────────────────
  const resortNights = useMemo(() => {
    if (!isMultiResort || accomMode !== "per-resort") return totalNights;
    const resorts = session?.resorts || [];
    if (resorts.length <= 1) return totalNights;
    const base = Math.floor(totalNights / resorts.length);
    const remainder = totalNights % resorts.length;
    const idx = resorts.findIndex(r => r.resortId === resort?.id);
    return base + (idx >= 0 && idx < remainder ? 1 : 0);
  }, [isMultiResort, accomMode, totalNights, session?.resorts, resort?.id]);

  // ── Date state (editable) ──────────────────────────────────────────────────
  const [checkIn, setCheckIn] = useState(sessionStart || "");
  const [checkOut, setCheckOut] = useState(
    sessionStart ? addDays(sessionStart, resortNights) : (sessionEnd || "")
  );
  const [showCheckInPicker, setShowCheckInPicker] = useState(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);

  const nights = nightsBetween(checkIn, checkOut) || resortNights;

  // ── Guests ─────────────────────────────────────────────────────────────────
  const totalGuests = (session?.guests?.adults || 1) + (session?.guests?.children || 0);
  const [rooms, setRooms] = useState(1);

  // ── Sort & filter ──────────────────────────────────────────────────────────
  const [sortBy, setSortBy] = useState("recommended");
  const [filters, setFilters] = useState({ priceMin: null, priceMax: null, stars: [], amenities: [], maxDistKm: 999 });
  const [showFilters, setShowFilters] = useState(false);

  // ── Build hotel list ───────────────────────────────────────────────────────
  const resortData = allResorts.find(r => r.id === resort?.id);
  const resortCoords = resortData?.coordinates || null;

  const allHotels = useMemo(() => buildHotelList(resortCoords), [resortCoords]);

  const filteredHotels = useMemo(() => {
    let list = [...allHotels];

    // Filter
    if (filters.priceMin !== null) list = list.filter(h => h.priceFrom >= filters.priceMin);
    if (filters.priceMax !== null) list = list.filter(h => h.priceFrom <= filters.priceMax);
    if (filters.stars.length) list = list.filter(h => filters.stars.includes(h.stars));
    if (filters.amenities.length) list = list.filter(h => filters.amenities.every(a => h.amenities?.includes(a)));
    if (filters.maxDistKm < 999) list = list.filter(h => h.distanceKm == null || h.distanceKm <= filters.maxDistKm);

    // Sort
    if (sortBy === "price-asc") list.sort((a, b) => a.priceFrom - b.priceFrom);
    else if (sortBy === "price-desc") list.sort((a, b) => b.priceFrom - a.priceFrom);
    else if (sortBy === "stars") list.sort((a, b) => (b.stars || 0) - (a.stars || 0));
    else if (sortBy === "distance") list.sort((a, b) => (a.distanceKm ?? 999) - (b.distanceKm ?? 999));
    else list.sort((a, b) => { // recommended
      const score = h => {
        const dist = h.distanceKm != null ? Math.max(0, 1 - h.distanceKm / 30) : 0.5;
        const stars = (h.stars || 3) / 5;
        const rating = ((h.rating || 7) - 5) / 5;
        return dist * 0.5 + stars * 0.3 + rating * 0.2;
      };
      return score(b) - score(a);
    });

    return list;
  }, [allHotels, filters, sortBy]);

  // ── Handle hotel selection ─────────────────────────────────────────────────
  function onSelectHotel(hotel, room, totalPrice) {
    const label = `${hotel.name} — ${nights} night${nights !== 1 ? "s" : ""} · ${room?.name || "Room"}`;
    handleAdd(label, totalPrice, "hotel-room", {
      hotel: hotel.name,
      room: room?.name,
      nights,
      checkIn: checkIn || sessionStart,
      checkOut: checkOut || sessionEnd,
      pricePerNight: room?.pricePerNight || hotel.priceFrom,
      startDate: checkIn || sessionStart,
      endDate: checkOut || sessionEnd,
    });
    // One-base: auto-skip accommodation for every other resort so it never re-appears
    if (accomMode === "one-base" && typeof completeAndAdvanceAll === "function") {
      const otherResorts = (session?.resorts || []).filter(r => r.resortId !== resort?.id);
      otherResorts.forEach(r => completeAndAdvanceAll("accommodation", r.resortId, true));
    }
  }

  // ── Step 1: Multi-resort base question ────────────────────────────────────
  if (isMultiResort && accomMode === null) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 w-full">
        <div className="flex items-center gap-3 mb-2">
          <Hotel className="h-6 w-6 text-peak-blue" />
          <h2 className="font-display font-extrabold text-2xl text-peak-text">Accommodation strategy</h2>
        </div>
        <p className="text-peak-text-secondary text-sm mb-8">
          You've selected <strong className="text-peak-text">{session.resorts.length} resorts</strong> across {totalNights} nights.
          How would you like to handle accommodation?
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {/* One base */}
          <button
            onClick={() => setAccomMode("one-base")}
            className="flex flex-col gap-3 p-6 rounded-2xl border border-white/10 hover:border-peak-blue/50 bg-peak-card hover:bg-peak-blue/5 text-left transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-peak-blue/10 flex items-center justify-center group-hover:bg-peak-blue/20 transition-colors">
              <Hotel className="h-5 w-5 text-peak-blue" />
            </div>
            <div>
              <p className="font-display font-bold text-peak-text text-base">One base hotel</p>
              <p className="text-peak-text-secondary text-sm mt-1">
                Stay in one hotel for the full {totalNights} nights and day-trip to each resort.
                Best if resorts are within driving distance.
              </p>
            </div>
            <div className="flex items-center gap-1 text-peak-blue text-xs font-medium mt-auto">
              Choose this <ArrowRight className="h-3 w-3" />
            </div>
          </button>

          {/* Per resort */}
          <button
            onClick={() => setAccomMode("per-resort")}
            className="flex flex-col gap-3 p-6 rounded-2xl border border-white/10 hover:border-peak-red/50 bg-peak-card hover:bg-peak-red/5 text-left transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-peak-red/10 flex items-center justify-center group-hover:bg-peak-red/20 transition-colors">
              <MapPin className="h-5 w-5 text-peak-red" />
            </div>
            <div>
              <p className="font-display font-bold text-peak-text text-base">Hotel per resort</p>
              <p className="text-peak-text-secondary text-sm mt-1">
                Book a separate hotel at each resort. Nights split equally across {session.resorts.length} stops.
                Best for multi-destination ski touring.
              </p>
            </div>
            <div className="flex items-center gap-1 text-peak-red text-xs font-medium mt-auto">
              Choose this <ArrowRight className="h-3 w-3" />
            </div>
          </button>
        </div>

        <div className="bg-peak-surface border border-white/8 rounded-xl px-4 py-3 flex items-start gap-2">
          <Info className="h-4 w-4 text-peak-blue flex-shrink-0 mt-0.5" />
          <p className="text-peak-text-secondary text-xs">
            If you choose <strong className="text-peak-text">hotel per resort</strong>, you'll book accommodation for each resort separately as you go through the planning flow.
            If you choose <strong className="text-peak-text">one base</strong>, you'll book once and the hotel will be linked to all resorts.
          </p>
        </div>

        <button onClick={handleSkip} className="w-full text-center text-peak-text-secondary text-sm hover:text-peak-text transition-colors py-4 mt-4">
          Skip accommodation for now
        </button>
      </div>
    );
  }

  // ── Steps 2+: Hotel search ─────────────────────────────────────────────────

  const contextLabel = accomMode === "one-base"
    ? `Base hotel for all ${session?.resorts?.length} resorts`
    : resort ? `${resort.flag} ${resort.name}` : "your destination";

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 w-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          {isMultiResort && (
            <button onClick={() => { setAccomMode(null); }}
              className="flex items-center gap-1 text-peak-text-secondary hover:text-peak-text text-xs transition-colors">
              <ChevronLeft className="h-3.5 w-3.5" /> Change strategy
            </button>
          )}
        </div>
        <h2 className="font-display font-extrabold text-2xl text-peak-text">
          Choose your accommodation
          <span className="text-peak-text-secondary font-normal text-lg ml-2">— {contextLabel}</span>
        </h2>
        {accomMode === "per-resort" && (
          <p className="text-peak-blue text-xs mt-1 flex items-center gap-1">
            <Info className="h-3 w-3" />
            {resortNights} night{resortNights !== 1 ? "s" : ""} allocated to {resort?.name} (equal split across {session?.resorts?.length} resorts)
          </p>
        )}
      </div>

      {/* Search bar — check-in, check-out, guests */}
      <div className="bg-peak-card border border-white/8 rounded-2xl p-4 mb-6">
        <div className="flex flex-wrap gap-3 items-end">
          {/* Check-in */}
          <div className="relative flex-1 min-w-[130px]">
            <DateButton label="Check-in" value={checkIn} onClick={() => { setShowCheckInPicker(v => !v); setShowCheckOutPicker(false); }} />
            {showCheckInPicker && (
              <MiniDatePicker
                label="Check-in date"
                value={checkIn}
                min={sessionStart || undefined}
                onChange={v => { setCheckIn(v); if (checkOut && v >= checkOut) setCheckOut(addDays(v, resortNights)); }}
                onClose={() => setShowCheckInPicker(false)}
              />
            )}
          </div>

          {/* Check-out */}
          <div className="relative flex-1 min-w-[130px]">
            <DateButton label="Check-out" value={checkOut} onClick={() => { setShowCheckOutPicker(v => !v); setShowCheckInPicker(false); }} />
            {showCheckOutPicker && (
              <MiniDatePicker
                label="Check-out date"
                value={checkOut}
                min={checkIn ? addDays(checkIn, 1) : undefined}
                onChange={v => setCheckOut(v)}
                onClose={() => setShowCheckOutPicker(false)}
              />
            )}
          </div>

          {/* Guests */}
          <div className="flex items-center gap-3 bg-peak-surface border border-white/10 rounded-xl px-4 py-3">
            <Users className="h-4 w-4 text-peak-text-secondary flex-shrink-0" />
            <div>
              <p className="text-peak-text-secondary text-xs font-semibold uppercase tracking-wide">Guests</p>
              <p className="text-peak-text text-sm font-semibold">{totalGuests} guest{totalGuests !== 1 ? "s" : ""}</p>
            </div>
          </div>

          {/* Rooms */}
          <div className="flex items-center gap-2 bg-peak-surface border border-white/10 rounded-xl px-4 py-3">
            <span className="text-peak-text-secondary text-xs font-semibold uppercase tracking-wide">Rooms</span>
            <button onClick={() => setRooms(r => Math.max(1, r - 1))} className="w-6 h-6 rounded-full border border-white/15 text-peak-text-secondary hover:text-peak-text text-sm flex items-center justify-center">−</button>
            <span className="text-peak-text font-semibold text-sm w-4 text-center">{rooms}</span>
            <button onClick={() => setRooms(r => r + 1)} className="w-6 h-6 rounded-full border border-white/15 text-peak-text-secondary hover:text-peak-text text-sm flex items-center justify-center">+</button>
          </div>
        </div>

        {/* Summary chip */}
        {checkIn && checkOut && (
          <div className="mt-3 flex items-center gap-2 text-xs text-peak-text-secondary">
            <Calendar className="h-3.5 w-3.5" />
            <span><strong className="text-peak-text">{nights} night{nights !== 1 ? "s" : ""}</strong> · {fmtDate(checkIn)} → {fmtDate(checkOut)} · {totalGuests} guest{totalGuests !== 1 ? "s" : ""} · {rooms} room{rooms !== 1 ? "s" : ""}</span>
          </div>
        )}
      </div>

      {/* Sort + filter bar */}
      <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
        <p className="text-peak-text-secondary text-sm">{filteredHotels.length} properties found</p>
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 overflow-x-auto hide-scrollbar">
            {[
              ["recommended", "Recommended"],
              ["price-asc", "Price ↑"],
              ["price-desc", "Price ↓"],
              ["stars", "Stars"],
              ["distance", "Distance"],
            ].map(([key, label]) => (
              <button key={key} onClick={() => setSortBy(key)}
                className={[
                  "px-3 py-1.5 text-xs font-medium rounded-full border whitespace-nowrap transition-colors",
                  sortBy === key ? "bg-peak-red text-white border-peak-red" : "border-white/10 text-peak-text-secondary hover:text-peak-text",
                ].join(" ")}>
                {label}
              </button>
            ))}
          </div>
          <button onClick={() => setShowFilters(f => !f)}
            className={[
              "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border transition-colors",
              showFilters ? "bg-peak-blue/20 border-peak-blue/40 text-peak-blue" : "border-white/10 text-peak-text-secondary hover:text-peak-text",
            ].join(" ")}>
            <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
          </button>
        </div>
      </div>

      {/* Layout */}
      <div className="flex gap-6">
        {/* Filter sidebar */}
        {showFilters && (
          <div className="w-60 flex-shrink-0 hidden lg:block">
            <FilterBar filters={filters} setFilters={setFilters} />
          </div>
        )}

        {/* Hotel grid */}
        <div className="flex-1 min-w-0">
          {filteredHotels.length === 0 ? (
            <div className="text-center py-16">
              <Hotel className="h-12 w-12 text-peak-text-secondary/30 mx-auto mb-3" />
              <p className="text-peak-text-secondary">No hotels match your filters.</p>
              <button onClick={() => setFilters({ priceMin: null, priceMax: null, stars: [], amenities: [], maxDistKm: 999 })}
                className="text-peak-blue text-sm hover:underline mt-2">Clear filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {filteredHotels.map(h => (
                <HotelCard
                  key={h.id}
                  hotel={h}
                  nights={nights}
                  guests={totalGuests}
                  onSelect={onSelectHotel}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <button onClick={handleSkip} className="w-full text-center text-peak-text-secondary text-sm hover:text-peak-text transition-colors py-4 mt-8">
        Skip accommodation for {resort?.name || "this resort"}
      </button>
    </div>
  );
}
