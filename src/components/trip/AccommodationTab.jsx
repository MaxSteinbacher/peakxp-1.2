import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { useT } from "../../lib/i18n";
import DateRangePicker from "../shared/DateRangePicker";
import RangeSlider from "../shared/RangeSlider";
import { useTripPlanner } from "../../context/TripPlannerContext";
import { resorts } from "../../lib/data";
import { sortByProximity } from "../../lib/proximity";

const mockProperties = [
  { id: "hotel-kitzhof", name: "Hotel Kitzhof Mountain Design Resort", type: "Hotel", location: "Kitzbühel, Austria", price: 195, rating: 9.1, image: "https://media.base44.com/images/public/69f1c737747c83c0b091a543/18c29298b_AuenansichtfrontHotelKitzhof.jpg", stars: 4, coordinates: { lat: 47.445, lon: 12.393 }, facilities: ["Spa", "Restaurant", "Bar", "Free WiFi", "Ski storage", "Parking"], boardBasis: "Bed and breakfast", cancellation: "Free cancellation" },
  { id: 2, name: "Alpenhof Boutique Hotel", type: "Hotel", location: "Verbier, Switzerland", price: 189, rating: 9.2, image: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/65c315351_image.png", stars: 4, facilities: ["Spa", "Restaurant", "Free WiFi", "Ski storage"], boardBasis: "Bed and breakfast", cancellation: "Free cancellation" },
  { id: 3, name: "Chalet Blanc", type: "Chalet", location: "Courchevel, France", price: 420, rating: 9.5, image: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/65c315351_image.png", stars: 5, facilities: ["Restaurant", "Free WiFi", "Ski-in ski-out", "Ski storage"], boardBasis: "Half board", cancellation: "Non-refundable" },
  { id: 4, name: "Mountain View Apartments", type: "Apartment", location: "Zermatt, Switzerland", price: 95, rating: 8.7, image: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/65c315351_image.png", stars: 3, facilities: ["Free WiFi", "Parking"], boardBasis: "Room only", cancellation: "Free cancellation" },
  { id: 5, name: "Tyrolean B&B", type: "B&B", location: "St. Anton, Austria", price: 72, rating: 8.4, image: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/65c315351_image.png", stars: 3, facilities: ["Free WiFi", "Bar"], boardBasis: "Bed and breakfast", cancellation: "Free cancellation" },
  { id: 6, name: "Summit Lodge", type: "Hotel", location: "Val Thorens, France", price: 155, rating: 8.9, image: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/65c315351_image.png", stars: 4, facilities: ["Pool", "Restaurant", "Free WiFi", "Ski storage"], boardBasis: "Half board", cancellation: "Free cancellation" },
  { id: 7, name: "The Ski Haus", type: "Chalet", location: "Kitzbühel, Austria", price: 310, rating: 9.1, image: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/65c315351_image.png", stars: 5, facilities: ["Ski-in ski-out", "Free WiFi", "Ski storage", "Bar"], boardBasis: "Full board", cancellation: "Non-refundable" },
];

// Seed-based pseudo-random offset so placeholder hotels appear near resort consistently
function seededOffset(str, scale) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  const norm = (Math.abs(hash) % 1000) / 1000;
  return (norm - 0.5) * scale;
}

function withCoordinates(hotels, resortCoords) {
  return hotels.map(h => {
    if (h.coordinates?.lat) return h;
    const seed = String(h.id) + h.name;
    return {
      ...h,
      coordinates: {
        lat: (resortCoords?.lat || 46) + seededOffset(seed + "lat", 0.4),
        lon: (resortCoords?.lon || 10) + seededOffset(seed + "lon", 0.4),
      },
    };
  });
}

const HOTEL_TYPES = ["Hotel", "Apartment", "Chalet", "B&B", "Boutique"];
const FACILITIES_LIST = ["Ski storage", "Ski-in ski-out", "Spa", "Pool", "Restaurant", "Bar", "Free WiFi", "Parking", "Airport shuttle", "Pet friendly", "Family rooms"];

const DEFAULT_FILTERS = { distanceKm: 50, priceRange: [50, 1000], stars: [], minRating: null, types: [], facilities: [], boardBasis: [], cancellation: "Any" };

function recommendedScore(h) {
  const prox = h.distanceKm != null ? Math.max(0, 1 - h.distanceKm / 50) : 0.5;
  const rating = ((h.rating || 7) - 5) / 5;
  const stars = (h.stars || 3) / 5;
  return prox * 0.5 + rating * 0.3 + stars * 0.2;
}

function ActiveChips({ filters, onRemove, onClearAll, t }) {
  const chips = [];
  if (filters.distanceKm < 50) chips.push({ key: "dist", label: `≤ ${filters.distanceKm}km` });
  if (filters.priceRange[0] > 50 || filters.priceRange[1] < 1000) chips.push({ key: "price", label: `€${filters.priceRange[0]}–€${filters.priceRange[1]}` });
  if (filters.stars.length) chips.push(...filters.stars.map(s => ({ key: `star:${s}`, label: `${s}★` })));
  if (filters.minRating) chips.push({ key: "rating", label: `${filters.minRating}+ rating` });
  if (filters.types.length) chips.push(...filters.types.map(t => ({ key: `type:${t}`, label: t })));
  if (filters.facilities.length) chips.push(...filters.facilities.map(f => ({ key: `fac:${f}`, label: f })));
  if (filters.boardBasis.length) chips.push(...filters.boardBasis.map(b => ({ key: `board:${b}`, label: b })));
  if (filters.cancellation !== "Any") chips.push({ key: "cancel", label: filters.cancellation });

  if (!chips.length) return null;
  return (
    <div className="flex flex-wrap gap-2 mb-4 items-center">
      {chips.map(c => (
        <span key={c.key} className="bg-peak-surface border border-white/10 rounded-full px-3 py-1 text-peak-text text-xs flex items-center gap-1.5">
          {c.label}
          <button onClick={() => onRemove(c.key)} className="text-peak-text-secondary hover:text-peak-red"><X className="h-3 w-3" /></button>
        </span>
      ))}
      <button onClick={onClearAll} className="text-peak-blue text-xs hover:underline">{t("accom_clear_all")}</button>
    </div>
  );
}

export default function AccommodationTab() {
  const t = useT();
  const { session } = useTripPlanner();
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const SORT_OPTIONS = [
    { key: "Recommended", label: t("accom_sort_recommended") },
    { key: "Closest to resort", label: t("accom_sort_closest") },
    { key: "Price ↑", label: t("accom_sort_price_up") },
    { key: "Price ↓", label: t("accom_sort_price_down") },
    { key: "Rating", label: t("accom_sort_rating") },
    { key: "Stars", label: t("accom_sort_stars") },
  ];
  const BOARD_OPTIONS = [
    { key: "Room only", label: t("accom_room_only") },
    { key: "Bed and breakfast", label: t("accom_bed_breakfast") },
    { key: "Half board", label: t("accom_half_board") },
    { key: "Full board", label: t("accom_full_board") },
    { key: "All inclusive", label: t("accom_all_inclusive") },
  ];
  const CANCEL_OPTIONS = [
    { key: "Any", label: t("accom_any") },
    { key: "Free cancellation", label: t("accom_free_cancellation") },
    { key: "Non-refundable", label: t("accom_non_refundable") },
  ];
  const [sortBy, setSortBy] = useState("Recommended");
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const currentResort = useMemo(() => {
    if (!session?.resorts?.length) return null;
    const idx = session.currentResortIndex || 0;
    const r = session.resorts[idx];
    return resorts.find(res => res.id === r?.resortId) || null;
  }, [session]);

  const resortCoords = currentResort?.coordinates;
  const resortName = currentResort?.name || "resort";

  const hotelsWithCoords = useMemo(() => withCoordinates(mockProperties, resortCoords), [resortCoords]);

  const hotelsWithDist = useMemo(() => {
    if (!resortCoords?.lat) return hotelsWithCoords.map(h => ({ ...h, distanceKm: null }));
    return sortByProximity(hotelsWithCoords, resortCoords.lat, resortCoords.lon);
  }, [hotelsWithCoords, resortCoords]);

  function clearAll() { setFilters(DEFAULT_FILTERS); }
  function removeFilter(key) {
    if (key === "dist") setFilters(f => ({ ...f, distanceKm: 50 }));
    else if (key === "price") setFilters(f => ({ ...f, priceRange: [50, 1000] }));
    else if (key.startsWith("star:")) setFilters(f => ({ ...f, stars: f.stars.filter(s => String(s) !== key.slice(5)) }));
    else if (key === "rating") setFilters(f => ({ ...f, minRating: null }));
    else if (key.startsWith("type:")) setFilters(f => ({ ...f, types: f.types.filter(t => t !== key.slice(5)) }));
    else if (key.startsWith("fac:")) setFilters(f => ({ ...f, facilities: f.facilities.filter(x => x !== key.slice(4)) }));
    else if (key.startsWith("board:")) setFilters(f => ({ ...f, boardBasis: f.boardBasis.filter(b => b !== key.slice(6)) }));
    else if (key === "cancel") setFilters(f => ({ ...f, cancellation: "Any" }));
  }

  const results = useMemo(() => {
    let list = [...hotelsWithDist];
    if (filters.distanceKm < 50 && resortCoords) list = list.filter(h => (h.distanceKm || 0) <= filters.distanceKm);
    list = list.filter(h => h.price >= filters.priceRange[0] && h.price <= filters.priceRange[1]);
    if (filters.stars.length) list = list.filter(h => filters.stars.includes(h.stars));
    if (filters.minRating) list = list.filter(h => (h.rating || 0) >= filters.minRating);
    if (filters.types.length) list = list.filter(h => filters.types.includes(h.type));
    if (filters.facilities.length) list = list.filter(h => filters.facilities.every(f => (h.facilities || []).includes(f)));
    if (filters.boardBasis.length) list = list.filter(h => filters.boardBasis.includes(h.boardBasis));
    if (filters.cancellation !== "Any") list = list.filter(h => h.cancellation === filters.cancellation);

    if (sortBy === "Recommended") list.sort((a, b) => recommendedScore(b) - recommendedScore(a));
    else if (sortBy === "Closest to resort") list.sort((a, b) => (a.distanceKm || 999) - (b.distanceKm || 999));
    else if (sortBy === "Price ↑") list.sort((a, b) => a.price - b.price);
    else if (sortBy === "Price ↓") list.sort((a, b) => b.price - a.price);
    else if (sortBy === "Rating") list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    else if (sortBy === "Stars") list.sort((a, b) => (b.stars || 0) - (a.stars || 0));
    return list;
  }, [hotelsWithDist, filters, sortBy, resortCoords]);

  return (
    <div className="flex gap-8">
      {/* Sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0 space-y-5">
        <div className="border-b border-white/5 pb-5">
          <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-2">{t("accom_distance_from")}: {filters.distanceKm < 50 ? `≤ ${filters.distanceKm}km` : t("accom_any")}</p>
          <RangeSlider mode="single" value={filters.distanceKm} onValueChange={v => setFilters(f => ({ ...f, distanceKm: typeof v === "number" ? v : v[0] }))} min={0} max={50} step={1} formatLabel={n => n + "km"} />
        </div>
        <div className="border-b border-white/5 pb-5">
          <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-2">{t("accom_price_night")}: €{filters.priceRange[0]}–€{filters.priceRange[1]}</p>
          <RangeSlider mode="dual" value={filters.priceRange} onValueChange={v => setFilters(f => ({ ...f, priceRange: v }))} min={50} max={1000} step={10} formatLabel={n => "€" + n} />
        </div>
        <div className="border-b border-white/5 pb-5">
          <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-2">{t("accom_stars")}</p>
          <div className="flex flex-wrap gap-1.5">
            {[3, 4, 5].map(s => (
              <button key={s} onClick={() => setFilters(f => ({ ...f, stars: f.stars.includes(s) ? f.stars.filter(x => x !== s) : [...f.stars, s] }))}
                className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${filters.stars.includes(s) ? "bg-yellow-400/20 border-yellow-400/50 text-yellow-400" : "border-white/10 text-peak-text-secondary"}`}>
                {"★".repeat(s)}
              </button>
            ))}
          </div>
        </div>
        <div className="border-b border-white/5 pb-5">
          <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-2">{t("accom_rating")}</p>
          <div className="flex flex-wrap gap-1.5">
            {["Any", "7+", "8+", "9+"].map(r => (
              <button key={r} onClick={() => setFilters(f => ({ ...f, minRating: r === "Any" ? null : parseFloat(r) }))}
                className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${(filters.minRating?.toString() + "+") === r || (r === "Any" && !filters.minRating) ? "bg-peak-blue/20 border-peak-blue/50 text-peak-blue" : "border-white/10 text-peak-text-secondary"}`}>
                {r}
              </button>
            ))}
          </div>
        </div>
        <div className="border-b border-white/5 pb-5">
          <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-2">{t("accom_type")}</p>
          <div className="space-y-1.5">
            {HOTEL_TYPES.map(t => (
              <label key={t} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-peak-blue" checked={filters.types.includes(t)} onChange={() => setFilters(f => ({ ...f, types: f.types.includes(t) ? f.types.filter(x => x !== t) : [...f.types, t] }))} />
                <span className="text-sm text-peak-text-secondary">{t}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="border-b border-white/5 pb-5">
          <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-2">{t("accom_facilities")}</p>
          <div className="space-y-1.5 max-h-48 overflow-y-auto">
            {FACILITIES_LIST.map(f => (
              <label key={f} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-peak-blue" checked={filters.facilities.includes(f)} onChange={() => setFilters(prev => ({ ...prev, facilities: prev.facilities.includes(f) ? prev.facilities.filter(x => x !== f) : [...prev.facilities, f] }))} />
                <span className="text-sm text-peak-text-secondary">{f}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="border-b border-white/5 pb-5">
          <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-2">{t("accom_board_basis")}</p>
          <div className="flex flex-wrap gap-1.5">
            {BOARD_OPTIONS.map(b => (
              <button key={b.key} onClick={() => setFilters(f => ({ ...f, boardBasis: f.boardBasis.includes(b.key) ? f.boardBasis.filter(x => x !== b.key) : [...f.boardBasis, b.key] }))}
                className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${filters.boardBasis.includes(b.key) ? "bg-peak-blue/20 border-peak-blue/50 text-peak-blue" : "border-white/10 text-peak-text-secondary"}`}>
                {b.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-2">{t("accom_cancellation")}</p>
          <div className="flex flex-wrap gap-1.5">
            {CANCEL_OPTIONS.map(c => (
              <button key={c.key} onClick={() => setFilters(f => ({ ...f, cancellation: c.key }))}
                className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${filters.cancellation === c.key ? "bg-peak-blue/20 border-peak-blue/50 text-peak-blue" : "border-white/10 text-peak-text-secondary"}`}>
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="flex-1">
        <div className="mb-4">
          <div className="mb-4 max-w-sm">
            <DateRangePicker startDate={checkIn} endDate={checkOut} onStartChange={setCheckIn} onEndChange={setCheckOut} context="hotel" minStay={1} placeholder={{ start: "Check-in", end: "Check-out" }} />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar mb-3">
            {SORT_OPTIONS.map(opt => (
              <button key={opt.key} onClick={() => setSortBy(opt.key)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap flex-shrink-0 transition-colors ${sortBy === opt.key ? "bg-peak-red text-white" : "bg-peak-surface border border-white/10 text-peak-text-secondary hover:text-peak-text"}`}>
                {opt.label}
              </button>
            ))}
          </div>
          <ActiveChips filters={filters} onRemove={removeFilter} onClearAll={clearAll} t={t} />
          <p className="text-peak-text-secondary text-sm mb-4">{results.length} {t("accom_properties_found")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {results.map(p => {
            const href = typeof p.id === "string" ? `/hotel/${p.id}` : "#";
            return (
              <Link key={p.id} to={href} className="bg-peak-card border border-white/5 hover:border-peak-blue/30 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 group block">
                <div className="relative h-44 overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 bg-peak-bg/80 backdrop-blur-sm px-2 py-0.5 rounded text-xs font-medium text-peak-text">{p.type}</div>
                  <div className="absolute top-3 right-3 bg-peak-blue text-white text-xs font-bold px-2 py-0.5 rounded">{p.rating}</div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-peak-text text-lg">{p.name}</h3>
                  <p className="text-peak-text-secondary text-sm mt-0.5 mb-1">{p.location}</p>
                  {p.distanceKm != null && resortCoords && (
                    <p className="text-peak-text-secondary text-xs mb-2">{p.distanceKm} {t("accom_km_from")} {resortName}</p>
                  )}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex">{"★".repeat(p.stars || 0).split("").map((s, i) => <span key={i} className="text-yellow-400 text-xs">★</span>)}</div>
                    <span className="text-peak-text font-bold">€{p.price}<span className="text-peak-text-secondary text-xs font-normal">{t("accom_per_night")}</span></span>
                  </div>
                  <span className="bg-peak-red text-white text-xs font-medium px-3 py-1.5 rounded-lg">{t("accom_view_hotel")}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}