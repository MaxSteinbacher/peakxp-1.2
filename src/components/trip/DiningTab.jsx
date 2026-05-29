import { useState, useMemo } from "react";
import { Star, ChevronDown, ChevronUp, X, ExternalLink, MapPin,
  Calendar, Search, SlidersHorizontal, Check } from "lucide-react";
import { useTripPlanner } from "../../context/TripPlannerContext";
import { useT } from "../../lib/i18n";
import { toast } from "sonner";

// ─── Static data (keys only — labels via t()) ───────────────────────────────
const MEAL_KEYS = ["breakfast", "lunch_slopes", "apres_ski", "dinner", "late_night"];
const MEAL_EMOJI = {
  breakfast: "☀️", lunch_slopes: "⛷️", apres_ski: "🍹", dinner: "🌙", late_night: "🎶",
};
const MEAL_I18N = {
  breakfast: "meal_breakfast", lunch_slopes: "meal_lunch_slopes",
  apres_ski: "filter_apres_ski", dinner: "meal_dinner", late_night: "meal_late_night",
};

const PRICE_LEVELS = ["€", "€€", "€€€", "€€€€"];

const CUISINE_TYPES = ["Alpine", "Swiss", "French", "Italian", "International"];

const RESTAURANTS = [
  {
    id: "r1", name: "Le Carve — Summit",
    image: "https://picsum.photos/seed/dining1/600/400",
    cuisines: ["Alpine", "Swiss", "International"],
    rating: 4.8, reviews: 284,
    location: "slope_side", locationLabel: "Slope-side — 2100m", distLift: "10m from main gondola",
    priceLevel: "€€€", openNow: true, closesAt: "16:30",
    mealKeys: ["lunch_slopes", "apres_ski"],
    highlights: ["panoramic", "terrace", "gluten_free"],
    bookingStatus: "available_today", verified: true,
  },
  {
    id: "r2", name: "Chez Marie — Village",
    image: "https://picsum.photos/seed/dining2/600/400",
    cuisines: ["French", "Swiss"],
    rating: 4.6, reviews: 193,
    location: "valley", locationLabel: "Village centre", distLift: "400m from cable car",
    priceLevel: "€€", openNow: true, closesAt: "22:00",
    mealKeys: ["lunch_slopes", "dinner"],
    highlights: ["fireplace", "kid_friendly", "live_music"],
    bookingStatus: "walk_ins", verified: false,
  },
  {
    id: "r3", name: "Après All — Bar & Kitchen",
    image: "https://picsum.photos/seed/dining3/600/400",
    cuisines: ["International", "Swiss"],
    rating: 4.5, reviews: 420,
    location: "valley", locationLabel: "Village centre", distLift: "200m from main lift",
    priceLevel: "€€", openNow: true, closesAt: "01:00",
    mealKeys: ["apres_ski", "dinner", "late_night"],
    highlights: ["live_music", "terrace", "panoramic"],
    bookingStatus: "available_today", verified: true,
  },
  {
    id: "r4", name: "Berghaus Altitude 2400",
    image: "https://picsum.photos/seed/dining4/600/400",
    cuisines: ["Alpine", "International"],
    rating: 4.7, reviews: 156,
    location: "slope_side", locationLabel: "Slope-side — 2400m", distLift: "Ski-in ski-out",
    priceLevel: "€€€", openNow: false, closesAt: "15:30",
    mealKeys: ["lunch_slopes", "breakfast"],
    highlights: ["panoramic", "terrace"],
    bookingStatus: "fully_booked", verified: true,
  },
  {
    id: "r5", name: "La Strada Ristorante",
    image: "https://picsum.photos/seed/dining5/600/400",
    cuisines: ["Italian", "International"],
    rating: 4.4, reviews: 98,
    location: "valley", locationLabel: "Village centre", distLift: "350m from main lift",
    priceLevel: "€€", openNow: true, closesAt: "23:00",
    mealKeys: ["dinner"],
    highlights: ["private_dining", "kid_friendly"],
    bookingStatus: "available_today", verified: false,
  },
  {
    id: "r6", name: "Panorama Hütte",
    image: "https://picsum.photos/seed/dining6/600/400",
    cuisines: ["Alpine", "International"],
    rating: 4.3, reviews: 67,
    location: "slope_side", locationLabel: "Slope-side — 1800m", distLift: "50m from blue run",
    priceLevel: "€€", openNow: true, closesAt: "17:00",
    mealKeys: ["breakfast", "lunch_slopes", "apres_ski"],
    highlights: ["panoramic", "terrace", "kid_friendly"],
    bookingStatus: "walk_ins", verified: false,
  },
];

const FULL_MENU = {
  Starters: [
    { name: "Fondue au gruyère (for 2)", price: 28 },
    { name: "Raclette with pickles", price: 18 },
    { name: "Soupe à l'oignon", price: 12 },
  ],
  Mains: [
    { name: "Filet de bœuf frites", price: 38 },
    { name: "Tartiflette savoyarde", price: 22 },
    { name: "Risotto aux champignons (V)", price: 24 },
  ],
  Desserts: [{ name: "Tarte tatin", price: 11 }, { name: "Coupe de glace", price: 9 }],
  Drinks: [{ name: "Vin chaud", price: 7 }, { name: "Bière locale", price: 8 }],
};

// ─── Shared sub-components ──────────────────────────────────────────────────

function PriceSymbol({ level }) {
  const idx = PRICE_LEVELS.indexOf(level);
  return (
    <span className="text-xs font-medium">
      {PRICE_LEVELS.map((s, i) => (
        <span key={i} className={i <= idx ? "text-peak-text" : "text-peak-text-secondary/25"}>{s}</span>
      ))}
    </span>
  );
}

function StatusBadge({ status, t }) {
  const cfg = {
    fully_booked: "bg-peak-red/80 text-white",
    walk_ins: "bg-peak-green/80 text-white",
    available_today: "bg-white/10 text-peak-text",
  };
  return (
    <div className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm ${cfg[status] || "bg-white/10 text-peak-text"}`}>
      {t(status)}
    </div>
  );
}

function HighlightLabel({ key: hk, t }) {
  const map = {
    panoramic: "filter_panoramic", terrace: "filter_terrace", kid_friendly: "filter_kid_friendly",
    fireplace: "fireplace", live_music: "live_music", gluten_free: "gluten_free",
    private_dining: "private_dining", apres_ski: "filter_apres_ski",
  };
  return <span className="text-xs bg-peak-blue/10 text-peak-blue px-2 py-0.5 rounded-full">{t(map[hk] || hk)}</span>;
}

function ReservationModal({ restaurant, day, moment, momentLabel, partySize, tripStart, onClose, onConfirm }) {
  const t = useT();
  const [selectedTime, setSelectedTime] = useState(null);
  const [seating, setSeating] = useState(null);
  const [requests, setRequests] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const dateStr = (() => {
    if (!tripStart || !day) return day ? `${t("day_label_numbered")} ${day}` : "";
    const d = new Date(tripStart);
    d.setDate(d.getDate() + (day - 1));
    return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
  })();

  const timeSlots = {
    breakfast: ["08:00", "08:30", "09:00", "09:30"],
    lunch_slopes: ["12:00", "12:30", "13:00", "13:30", "14:00"],
    apres_ski: ["15:30", "16:00", "16:30", "17:00", "18:00"],
    dinner: ["19:00", "19:30", "20:00", "20:30", "21:00"],
    late_night: ["22:00", "22:30", "23:00"],
  }[moment] || ["12:00", "13:00", "19:00", "20:00"];

  const unavailable = ["13:00", "20:00"];

  if (confirmed) return (
    <div className="bg-peak-card border border-white/10 rounded-2xl p-6 text-center">
      <div className="w-12 h-12 rounded-full bg-peak-green/20 flex items-center justify-center mx-auto mb-3">
        <Check className="h-6 w-6 text-peak-green" />
      </div>
      <h3 className="font-display font-bold text-xl text-peak-text mb-1">{t("table_reserved")}</h3>
      <p className="text-peak-text-secondary text-sm mb-3">
        {t("booking_ref")}: <span className="text-peak-text font-mono font-bold">PXP-{Math.random().toString(36).slice(2, 8).toUpperCase()}</span>
      </p>
      <div className="bg-peak-surface rounded-xl p-4 text-sm space-y-1.5 mb-4 text-left">
        <div className="flex justify-between"><span className="text-peak-text-secondary">Restaurant</span><span className="text-peak-text font-medium">{restaurant.name}</span></div>
        {dateStr && <div className="flex justify-between"><span className="text-peak-text-secondary">Date</span><span className="text-peak-text">{dateStr}</span></div>}
        <div className="flex justify-between"><span className="text-peak-text-secondary">{t("select_time")}</span><span className="text-peak-text">{selectedTime}</span></div>
        <div className="flex justify-between"><span className="text-peak-text-secondary">{t("guests")}</span><span className="text-peak-text">{partySize}</span></div>
        {momentLabel && <div className="flex justify-between"><span className="text-peak-text-secondary">{t("meal")}</span><span className="text-peak-text">{momentLabel}</span></div>}
      </div>
      <button onClick={() => { onConfirm?.(); onClose(); }}
        className="w-full py-2.5 bg-peak-red hover:bg-peak-red-hover text-white text-sm font-semibold rounded-xl transition-colors">
        {t("confirm")}
      </button>
    </div>
  );

  return (
    <div className="bg-peak-card border border-white/10 rounded-2xl p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-display font-bold text-lg text-peak-text leading-tight">{restaurant.name}</h3>
          <p className="text-peak-text-secondary text-xs mt-0.5">
            {dateStr && `${dateStr} · `}{momentLabel && `${momentLabel} · `}{partySize} {t("guests")}
          </p>
        </div>
        <button onClick={onClose} className="text-peak-text-secondary hover:text-peak-text ml-3 flex-shrink-0">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-xs text-peak-text-secondary mb-2">{t("select_time")}</label>
          <div className="flex flex-wrap gap-2">
            {timeSlots.map(t2 => {
              const unavail = unavailable.includes(t2);
              return (
                <button key={t2} onClick={() => !unavail && setSelectedTime(t2)} disabled={unavail}
                  className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                    unavail ? "opacity-30 cursor-not-allowed border-white/5 text-peak-text-secondary"
                    : selectedTime === t2 ? "bg-peak-red text-white border-peak-red"
                    : "border-white/10 text-peak-text-secondary hover:text-peak-text hover:border-white/25"
                  }`}>
                  {t2}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <label className="block text-xs text-peak-text-secondary mb-2">{t("seating_preference")}</label>
          <div className="flex flex-wrap gap-2">
            {["seating_inside", "seating_terrace", "seating_bar", "seating_private"].map(sk => (
              <button key={sk} onClick={() => setSeating(seating === sk ? null : sk)}
                className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${seating === sk ? "bg-peak-blue/20 border-peak-blue/50 text-peak-blue" : "border-white/10 text-peak-text-secondary hover:text-peak-text"}`}>
                {t(sk)}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs text-peak-text-secondary mb-1">{t("special_requests")}</label>
          <input value={requests} onChange={e => setRequests(e.target.value)}
            placeholder={t("special_requests_placeholder")}
            className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
        </div>
        <button onClick={() => setConfirmed(true)} disabled={!selectedTime}
          className="w-full py-3 bg-peak-red hover:bg-peak-red-hover disabled:opacity-40 text-white font-semibold text-sm rounded-xl transition-colors">
          {t("reserve_table")}
        </button>
      </div>
    </div>
  );
}

// ─── Restaurant card used in both modes ─────────────────────────────────────

function RestaurantCard({ restaurant, onReserve, onAddToTrip, showAddToTrip, t }) {
  const [expanded, setExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-peak-card border border-white/5 rounded-2xl overflow-hidden hover:border-white/12 transition-all group">
      <div className="relative h-44 overflow-hidden">
        <img src={restaurant.image} alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {restaurant.verified && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-peak-blue/90 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            ✓ {t("partner")}
          </div>
        )}
        <StatusBadge status={restaurant.bookingStatus} t={t} />
      </div>
      <div className="p-4">
        <h3 className="font-display font-bold text-peak-text text-base leading-tight mb-1">{restaurant.name}</h3>
        <div className="flex items-center gap-2 mb-1.5">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-peak-text text-sm font-semibold">{restaurant.rating}</span>
          <span className="text-peak-text-secondary text-xs">({restaurant.reviews})</span>
          <PriceSymbol level={restaurant.priceLevel} />
        </div>
        <div className="flex flex-wrap gap-1 mb-2">
          {restaurant.cuisines.map(c => (
            <span key={c} className="text-xs text-peak-blue border border-peak-blue/30 px-2 py-0.5 rounded-full">{c}</span>
          ))}
        </div>
        <p className="text-xs text-peak-text-secondary mb-0.5">{restaurant.locationLabel} · {restaurant.distLift}</p>
        <p className={`text-xs font-medium mb-3 ${restaurant.openNow ? "text-peak-green" : "text-peak-text-secondary"}`}>
          {restaurant.openNow ? `${t("open_closes")} ${restaurant.closesAt}` : t("closed")}
        </p>
        <div className="flex flex-wrap gap-1 mb-3">
          {restaurant.highlights.map(h => <HighlightLabel key={h} hKey={h} t={t} />)}
        </div>
        <div className="flex gap-2">
          <button onClick={onReserve} disabled={restaurant.bookingStatus === "fully_booked"}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-colors ${
              restaurant.bookingStatus === "fully_booked"
                ? "opacity-40 cursor-not-allowed bg-peak-surface text-peak-text-secondary"
                : "bg-peak-red hover:bg-peak-red-hover text-white"
            }`}>
            {t("make_reservation")}
          </button>
          <button onClick={() => setMenuOpen(m => !m)}
            className="flex-1 py-2.5 text-sm font-medium rounded-xl border border-white/10 text-peak-text-secondary hover:text-peak-text transition-colors">
            {t("view_menu")}
          </button>
        </div>
        {showAddToTrip && (
          <button onClick={onAddToTrip}
            className="mt-2 w-full py-2 text-xs font-medium rounded-xl border border-peak-blue/30 text-peak-blue hover:bg-peak-blue/10 transition-colors">
            + {t("add_to_trip")}
          </button>
        )}
        {menuOpen && (
          <div className="mt-3 border-t border-white/5 pt-3">
            {Object.entries(FULL_MENU).map(([section, items]) => (
              <div key={section} className="mb-2">
                <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-1">{section}</p>
                {items.map(item => (
                  <div key={item.name} className="flex justify-between text-xs py-1 border-b border-white/5">
                    <span className="text-peak-text-secondary">{item.name}</span>
                    <span className="text-peak-text">€{item.price}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        <button onClick={() => setExpanded(e => !e)}
          className="w-full flex items-center justify-center gap-1 mt-3 text-xs text-peak-text-secondary hover:text-peak-text transition-colors">
          {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          {expanded ? t("hide_full_details") : t("show_full_details")}
        </button>
        {expanded && (
          <div className="mt-3 border-t border-white/5 pt-3 space-y-2 text-xs text-peak-text-secondary">
            <p>Seasonal alpine cuisine using fresh valley ingredients, with spectacular panoramic views and warm hospitality.</p>
            <div className="flex gap-3">
              <button className="flex items-center gap-1 text-peak-blue hover:underline">
                <MapPin className="h-3 w-3" /> {t("directions")}
              </button>
              <button className="flex items-center gap-1 text-peak-blue hover:underline">
                <ExternalLink className="h-3 w-3" /> {t("website")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── BROWSE MODE — standalone planning tab ──────────────────────────────────

function BrowseMode({ resortName }) {
  const t = useT();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("recommended");
  const [filterCuisines, setFilterCuisines] = useState([]);
  const [filterPrice, setFilterPrice] = useState([]);
  const [filterMoments, setFilterMoments] = useState([]);
  const [filterFeatures, setFilterFeatures] = useState([]);
  const [filterLocation, setFilterLocation] = useState(null);
  const [filterOpenNow, setFilterOpenNow] = useState(false);
  const [reservingRestaurant, setReservingRestaurant] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const SORT_OPTS = [
    { key: "recommended", label: t("sort_recommended") },
    { key: "rating", label: t("sort_highest_rated") },
    { key: "price_asc", label: t("sort_price_low") },
    { key: "open_now", label: t("sort_open_now") },
    { key: "closest", label: t("sort_closest_lifts") },
  ];

  const FEATURE_KEYS = ["panoramic", "terrace", "kid_friendly", "fireplace", "live_music", "gluten_free", "private_dining"];
  const FEATURE_I18N = {
    panoramic: "filter_panoramic", terrace: "filter_terrace", kid_friendly: "filter_kid_friendly",
    fireplace: "fireplace", live_music: "live_music", gluten_free: "gluten_free", private_dining: "private_dining",
  };

  function toggleArr(arr, setArr, val) {
    setArr(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]);
  }

  const filtered = useMemo(() => {
    let res = [...RESTAURANTS];
    if (search) res = res.filter(r => r.name.toLowerCase().includes(search.toLowerCase()) || r.cuisines.some(c => c.toLowerCase().includes(search.toLowerCase())));
    if (filterCuisines.length) res = res.filter(r => filterCuisines.some(c => r.cuisines.includes(c)));
    if (filterPrice.length) res = res.filter(r => filterPrice.includes(r.priceLevel));
    if (filterMoments.length) res = res.filter(r => filterMoments.some(m => r.mealKeys.includes(m)));
    if (filterFeatures.length) res = res.filter(r => filterFeatures.every(f => r.highlights.includes(f)));
    if (filterLocation) res = res.filter(r => r.location === filterLocation);
    if (filterOpenNow) res = res.filter(r => r.openNow);
    if (sortBy === "rating") res.sort((a, b) => b.rating - a.rating);
    if (sortBy === "price_asc") res.sort((a, b) => a.priceLevel.length - b.priceLevel.length);
    if (sortBy === "open_now") res.sort((a, b) => (b.openNow ? 1 : 0) - (a.openNow ? 1 : 0));
    return res;
  }, [search, sortBy, filterCuisines, filterPrice, filterMoments, filterFeatures, filterLocation, filterOpenNow]);

  const hasActiveFilters = filterCuisines.length || filterPrice.length || filterMoments.length || filterFeatures.length || filterLocation || filterOpenNow;

  function clearAll() {
    setFilterCuisines([]); setFilterPrice([]); setFilterMoments([]);
    setFilterFeatures([]); setFilterLocation(null); setFilterOpenNow(false);
  }

  function FilterSection({ title, children }) {
    const [open, setOpen] = useState(true);
    return (
      <div className="border-b border-white/5 pb-4 mb-4">
        <button onClick={() => setOpen(o => !o)}
          className="flex items-center justify-between w-full text-sm font-semibold text-peak-text mb-3">
          {title}
          {open ? <ChevronUp className="h-3.5 w-3.5 text-peak-text-secondary" /> : <ChevronDown className="h-3.5 w-3.5 text-peak-text-secondary" />}
        </button>
        {open && children}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="font-display font-extrabold text-3xl text-peak-text mb-1">{t("dining_browse_title")}</h2>
        <p className="text-peak-text-secondary text-sm">{t("dining_browse_subline")}</p>
      </div>

      {/* Search + sort bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-peak-text-secondary" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder={t("search_restaurants")}
            className="w-full bg-peak-surface border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
        </div>
        <button onClick={() => setSidebarOpen(o => !o)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm transition-colors ${sidebarOpen ? "bg-peak-blue/10 border-peak-blue/40 text-peak-blue" : "border-white/10 text-peak-text-secondary hover:text-peak-text"}`}>
          <SlidersHorizontal className="h-4 w-4" />
          {t("filters")}
          {hasActiveFilters ? <span className="bg-peak-red text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{(filterCuisines.length + filterPrice.length + filterMoments.length + filterFeatures.length + (filterLocation ? 1 : 0) + (filterOpenNow ? 1 : 0))}</span> : null}
        </button>
        <div className="flex gap-1.5 overflow-x-auto hide-scrollbar">
          {SORT_OPTS.map(opt => (
            <button key={opt.key} onClick={() => setSortBy(opt.key)}
              className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap border transition-colors ${sortBy === opt.key ? "bg-peak-blue/20 border-peak-blue/40 text-peak-blue" : "border-white/10 text-peak-text-secondary hover:text-peak-text"}`}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar filters */}
        {sidebarOpen && (
          <div className="w-64 flex-shrink-0">
            <div className="bg-peak-card border border-white/5 rounded-2xl p-5 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-peak-text font-semibold text-sm">{t("filters")}</span>
                {hasActiveFilters && (
                  <button onClick={clearAll} className="text-xs text-peak-blue hover:underline">{t("clear_filters")}</button>
                )}
              </div>

              <FilterSection title={t("filter_location_type")}>
                {[
                  { val: null, label: t("all_filters") },
                  { val: "slope_side", label: t("on_mountain") },
                  { val: "valley", label: t("in_valley") },
                ].map(({ val, label }) => (
                  <button key={String(val)} onClick={() => setFilterLocation(val)}
                    className={`w-full text-left text-xs px-3 py-2 rounded-lg mb-1 transition-colors ${filterLocation === val ? "bg-peak-blue/15 text-peak-blue" : "text-peak-text-secondary hover:text-peak-text hover:bg-white/4"}`}>
                    {label}
                  </button>
                ))}
              </FilterSection>

              <FilterSection title={t("filter_meal_moment")}>
                {MEAL_KEYS.map(k => (
                  <button key={k} onClick={() => toggleArr(filterMoments, setFilterMoments, k)}
                    className={`flex items-center gap-2 w-full text-left text-xs px-3 py-2 rounded-lg mb-1 transition-colors ${filterMoments.includes(k) ? "bg-peak-blue/15 text-peak-blue" : "text-peak-text-secondary hover:text-peak-text hover:bg-white/4"}`}>
                    <span>{MEAL_EMOJI[k]}</span>
                    <span>{t(MEAL_I18N[k])}</span>
                  </button>
                ))}
              </FilterSection>

              <FilterSection title={t("filter_cuisine")}>
                {CUISINE_TYPES.map(c => (
                  <button key={c} onClick={() => toggleArr(filterCuisines, setFilterCuisines, c)}
                    className={`w-full text-left text-xs px-3 py-2 rounded-lg mb-1 transition-colors ${filterCuisines.includes(c) ? "bg-peak-blue/15 text-peak-blue" : "text-peak-text-secondary hover:text-peak-text hover:bg-white/4"}`}>
                    {c}
                  </button>
                ))}
              </FilterSection>

              <FilterSection title={t("filter_price_range")}>
                <div className="flex gap-2 flex-wrap">
                  {PRICE_LEVELS.map(p => (
                    <button key={p} onClick={() => toggleArr(filterPrice, setFilterPrice, p)}
                      className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${filterPrice.includes(p) ? "bg-peak-blue/15 border-peak-blue/40 text-peak-blue" : "border-white/10 text-peak-text-secondary hover:text-peak-text"}`}>
                      {p}
                    </button>
                  ))}
                </div>
              </FilterSection>

              <FilterSection title={t("filter_features")}>
                {FEATURE_KEYS.map(f => (
                  <button key={f} onClick={() => toggleArr(filterFeatures, setFilterFeatures, f)}
                    className={`flex items-center gap-2 w-full text-left text-xs px-3 py-2 rounded-lg mb-1 transition-colors ${filterFeatures.includes(f) ? "bg-peak-blue/15 text-peak-blue" : "text-peak-text-secondary hover:text-peak-text hover:bg-white/4"}`}>
                    {filterFeatures.includes(f) && <Check className="h-3 w-3 flex-shrink-0" />}
                    {t(FEATURE_I18N[f])}
                  </button>
                ))}
              </FilterSection>

              <div className="border-t border-white/5 pt-4">
                <button onClick={() => setFilterOpenNow(o => !o)}
                  className={`flex items-center gap-2 w-full text-left text-xs px-3 py-2 rounded-lg transition-colors ${filterOpenNow ? "bg-peak-blue/15 text-peak-blue" : "text-peak-text-secondary hover:text-peak-text hover:bg-white/4"}`}>
                  {filterOpenNow && <Check className="h-3 w-3" />}
                  {t("filter_open_now")}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Restaurant grid */}
        <div className="flex-1 min-w-0">
          <p className="text-peak-text-secondary text-sm mb-4">
            {filtered.length} {t("restaurants_found")} {resortName && `· ${resortName}`}
          </p>
          {reservingRestaurant && (
            <div className="mb-6">
              <ReservationModal
                restaurant={reservingRestaurant}
                day={null} moment={null} momentLabel={null}
                partySize={1} tripStart={null}
                onClose={() => setReservingRestaurant(null)}
                onConfirm={() => { setReservingRestaurant(null); toast.success(`Table reserved at ${reservingRestaurant.name}`); }}
              />
            </div>
          )}
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-peak-text-secondary">
              <p className="text-lg mb-2">No restaurants match your filters</p>
              <button onClick={clearAll} className="text-peak-blue text-sm hover:underline">{t("clear_filters")}</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map(r => (
                <RestaurantCard key={r.id} restaurant={r} t={t}
                  showAddToTrip={false}
                  onReserve={() => setReservingRestaurant(r)}
                  onAddToTrip={() => toast.success(`${r.name} added to trip`)} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── BOOKING MODE — AI / trip flow day-by-day ───────────────────────────────

function BookingMode({ onBook, resortName, nights, partySize, tripStart }) {
  const t = useT();
  // slotState: { [day_moment]: "empty" | "skipped" | {restaurant} }
  const [slotState, setSlotState] = useState({});
  // Which slot is currently being picked
  const [pickingSlot, setPickingSlot] = useState(null); // { day, momentKey }
  // Reservation modal
  const [reservingFor, setReservingFor] = useState(null); // { restaurant, day, momentKey }
  // Filter for restaurant picker
  const [momentFilter, setMomentFilter] = useState([]);

  const days = Array.from({ length: nights }, (_, i) => i + 1);

  function slotKey(day, mk) { return `${day}_${mk}`; }
  function getSlot(day, mk) { return slotState[slotKey(day, mk)] || "empty"; }

  function handlePickSlot(day, mk) {
    setPickingSlot({ day, momentKey: mk });
    setMomentFilter([mk]);
  }

  function handleSkipSlot(day, mk) {
    setSlotState(prev => ({ ...prev, [slotKey(day, mk)]: "skipped" }));
  }

  function handleUndoSlot(day, mk) {
    setSlotState(prev => {
      const next = { ...prev };
      delete next[slotKey(day, mk)];
      return next;
    });
  }

  function handleSelectRestaurant(restaurant) {
    if (!pickingSlot) return;
    setReservingFor({ restaurant, ...pickingSlot });
  }

  function handleReservationConfirm() {
    if (!reservingFor) return;
    const { restaurant, day, momentKey } = reservingFor;
    setSlotState(prev => ({ ...prev, [slotKey(day, momentKey)]: restaurant }));
    onBook?.(`${restaurant.name} — ${t("day_label_numbered")} ${day} ${t(MEAL_I18N[momentKey])}`, 0, {
      restaurant: restaurant.name, day, moment: momentKey, partySize,
    });
    toast.success(`${restaurant.name} — ${t("day_label_numbered")} ${day}, ${t(MEAL_I18N[momentKey])}`);
    setReservingFor(null);
    setPickingSlot(null);
    setMomentFilter([]);
  }

  const filteredRestaurants = useMemo(() => {
    if (!momentFilter.length) return RESTAURANTS;
    return RESTAURANTS.filter(r => momentFilter.some(m => r.mealKeys.includes(m)));
  }, [momentFilter]);

  const bookedCount = Object.values(slotState).filter(v => v && v !== "skipped" && typeof v === "object").length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 w-full">
      <div className="mb-6">
        <h2 className="font-display font-extrabold text-2xl text-peak-text mb-1">{t("booking_mode_title")} — {resortName}</h2>
        <p className="text-peak-text-secondary text-sm">{t("booking_mode_subline")}</p>
        <p className="text-peak-text-secondary text-xs mt-1">{nights} {t("nights")} · {partySize} {partySize === 1 ? t("guest") : t("guests")}</p>
      </div>

      {/* Day-by-day grid */}
      <div className="bg-peak-surface border border-white/8 rounded-2xl overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-white/5 flex items-center gap-2">
          <Calendar className="h-4 w-4 text-peak-blue" />
          <p className="text-peak-text font-semibold text-sm">{t("choose_dining_slot")}</p>
          <span className="text-peak-text-secondary text-xs ml-auto">
            {partySize} {partySize === 1 ? t("guest") : t("guests")} · {resortName}
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-4 py-3 text-left text-xs text-peak-text-secondary font-medium w-36">{t("meal")}</th>
                {days.map(d => (
                  <th key={d} className="px-3 py-3 text-center text-xs text-peak-text-secondary font-medium min-w-[110px]">
                    {t("day_label_numbered")} {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MEAL_KEYS.map(mk => (
                <tr key={mk} className="border-t border-white/5">
                  <td className="px-4 py-3 text-xs text-peak-text-secondary whitespace-nowrap">
                    {MEAL_EMOJI[mk]} {t(MEAL_I18N[mk])}
                  </td>
                  {days.map(d => {
                    const slot = getSlot(d, mk);
                    const isSkipped = slot === "skipped";
                    const isBooked = slot && slot !== "empty" && slot !== "skipped";
                    const isPicking = pickingSlot?.day === d && pickingSlot?.momentKey === mk;

                    return (
                      <td key={d} className="px-2 py-2 text-center">
                        {isBooked ? (
                          <div className="flex flex-col items-center gap-1">
                            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-peak-green/20 text-peak-green text-xs">✓</div>
                            <span className="text-peak-green text-[10px] leading-tight max-w-[90px] truncate">{slot.name.split("—")[0].trim()}</span>
                            <button onClick={() => handleUndoSlot(d, mk)} className="text-[10px] text-peak-text-secondary/50 hover:text-peak-text-secondary transition-colors">{t("cancel_slot")}</button>
                          </div>
                        ) : isSkipped ? (
                          <div className="flex flex-col items-center gap-1">
                            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white/5 text-peak-text-secondary text-xs">—</div>
                            <span className="text-peak-text-secondary/50 text-[10px]">{t("slot_skipped")}</span>
                            <button onClick={() => handleUndoSlot(d, mk)} className="text-[10px] text-peak-blue hover:underline">{t("cancel_slot")}</button>
                          </div>
                        ) : isPicking ? (
                          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-peak-red/20 border border-peak-red/40 text-peak-red text-xs mx-auto animate-pulse">+</div>
                        ) : (
                          <div className="flex flex-col items-center gap-1">
                            <button onClick={() => handlePickSlot(d, mk)}
                              className="w-7 h-7 rounded-full border border-white/15 text-peak-text-secondary hover:border-peak-blue hover:text-peak-blue transition-colors text-xs mx-auto flex items-center justify-center">
                              +
                            </button>
                            <button onClick={() => handleSkipSlot(d, mk)}
                              className="text-[10px] text-peak-text-secondary/40 hover:text-peak-text-secondary transition-colors leading-tight">
                              {t("skip")}
                            </button>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-peak-text-secondary text-xs px-5 py-3 border-t border-white/5">
          {t("tap_to_pick")} · {t("skip")} {t("skip_question").toLowerCase()}
        </p>
      </div>

      {/* Restaurant picker — shown when slot is being picked */}
      {pickingSlot && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-lg text-peak-text">
              {t("choose_restaurant_for")} {t("day_label_numbered")} {pickingSlot.day} — {t(MEAL_I18N[pickingSlot.momentKey])}
            </h3>
            <button onClick={() => { setPickingSlot(null); setMomentFilter([]); }}
              className="text-peak-text-secondary hover:text-peak-text text-sm flex items-center gap-1">
              <X className="h-4 w-4" /> {t("cancel")}
            </button>
          </div>

          {reservingFor && (
            <div className="mb-6">
              <ReservationModal
                restaurant={reservingFor.restaurant}
                day={reservingFor.day}
                moment={reservingFor.momentKey}
                momentLabel={t(MEAL_I18N[reservingFor.momentKey])}
                partySize={partySize}
                tripStart={tripStart}
                onClose={() => setReservingFor(null)}
                onConfirm={handleReservationConfirm}
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredRestaurants.map(r => (
              <RestaurantCard key={r.id} restaurant={r} t={t}
                showAddToTrip={false}
                onReserve={() => handleSelectRestaurant(r)}
                onAddToTrip={() => {}} />
            ))}
          </div>
        </div>
      )}

      {/* Summary of booked slots */}
      {bookedCount > 0 && !pickingSlot && (
        <div className="mt-4 bg-peak-card border border-white/5 rounded-2xl p-5">
          <p className="text-peak-text font-semibold text-sm mb-3">{t("your_dining_plan")}</p>
          <div className="space-y-2">
            {Object.entries(slotState).filter(([, v]) => v && v !== "skipped" && typeof v === "object").map(([key, restaurant]) => {
              const [day, ...mkParts] = key.split("_");
              const mk = mkParts.join("_");
              return (
                <div key={key} className="flex items-center justify-between text-sm">
                  <span className="text-peak-text-secondary">{t("day_label_numbered")} {day} · {t(MEAL_I18N[mk])}</span>
                  <span className="text-peak-text font-medium">{restaurant.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main export — auto-detects mode ────────────────────────────────────────

export default function DiningTab({ agentServiceDetails = {}, onBook }) {
  const { session } = useTripPlanner();
  const t = useT();

  const resortName = session?.destination?.label || session?.resorts?.[0]?.resortName || "";
  const nights = session?.dates?.nights || 3;
  const partySize = (session?.guests?.adults || 1) + (session?.guests?.children || 0);
  const tripStart = session?.dates?.start || null;

  // Browse mode when opened from the standalone planning tab (no onBook prop)
  if (!onBook) {
    return <BrowseMode resortName={resortName} />;
  }

  // Booking mode when opened from the AI / trip flow (has onBook prop)
  return (
    <BookingMode
      onBook={onBook}
      resortName={resortName}
      nights={nights}
      partySize={partySize}
      tripStart={tripStart}
    />
  );
}
