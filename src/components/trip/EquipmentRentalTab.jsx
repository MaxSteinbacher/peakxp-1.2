import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Star, MapPin, ChevronDown, ChevronUp, Check } from "lucide-react";
import { useTripPlanner } from "../../context/TripPlannerContext";
import { useProfile } from "../../context/ProfileContext";
import { useT } from "../../lib/i18n";

// ─── Static shop data ─────────────────────────────────────────────────────────
const SHOPS = [
  {
    id: "intersport-mariaalm", name: "Intersport Maria Alm", tier: "performance", badge: "official_partner",
    image: "https://www.intersport-mariaalm.at/wordpress/wp-content/uploads/medium-Hochkoenigman-1.jpg",
    rating: 4.9, reviews: 487, distLift: "Multiple locations — valley stations Hintermoos & Aberg",
    location: "slope_side",
    brands: ["Atomic", "Salomon", "Head", "Fischer", "Rossignol", "Nordica", "Blizzard"],
    pricePerDay: { ski: 35, snowboard: 32, boots: 12, poles: 6, helmet: 8 },
    availability: "available",
    services: ["Free ski depot at Hintermoos & Aberg", "Children under 10 free (parents renting)", "7-for-6 deal", "Online early booking discount up to 15%", "Boot fitting service", "Ski service & tuning", "Helmet fitting"],
    openingHours: "08:00 – 17:00",
    resort: "hochkonig",
    website: "https://www.intersport-mariaalm.at",
    address: "Maria Alm, Salzburgerland — 7 locations",
    highlight: "Hochkönig's official equipment partner — 7 shops in the region",
  },
  {
    id: "s1", name: "Schneider Sport", tier: "performance", badge: "top_rated",
    image: "", rating: 4.8, reviews: 312, distLift: "50m from main lift",
    location: "slope_side",
    brands: ["Atomic", "Salomon", "Head"],
    pricePerDay: { ski: 38, snowboard: 35, boots: 12, poles: 6, helmet: 8 },
    availability: "available",
    services: ["Fitting service", "Boot heat-moulding", "Free day-1 exchange"],
    openingHours: "08:00 – 17:30",
  },
  {
    id: "s2", name: "Alpine Rentals", tier: "standard", badge: "best_value",
    image: "", rating: 4.5, reviews: 187, distLift: "200m from main lift",
    location: "village",
    brands: ["Rossignol", "Fischer", "K2"],
    pricePerDay: { ski: 28, snowboard: 26, boots: 9, poles: 5, helmet: 6 },
    availability: "available",
    services: ["Online pre-booking", "Free size exchange", "Delivery to hotel"],
    openingHours: "08:30 – 18:00",
  },
  {
    id: "s3", name: "Peak Gear Pro", tier: "premium", badge: "premium_choice",
    image: "", rating: 4.9, reviews: 241, distLift: "Ski-in ski-out",
    location: "slope_side",
    brands: ["Völkl", "Nordica", "Dynastar", "Blizzard"],
    pricePerDay: { ski: 52, snowboard: 48, boots: 16, poles: 8, helmet: 10 },
    availability: "available",
    services: ["Expert fitting", "Tuning included", "Premium models", "Delivery"],
    openingHours: "07:30 – 18:30",
  },
  {
    id: "s4", name: "Berghutte Rentals", tier: "budget", badge: "budget_friendly",
    image: "", rating: 4.1, reviews: 89, distLift: "400m from main lift",
    location: "village",
    brands: ["Elan", "Scott", "Völkl"],
    pricePerDay: { ski: 18, snowboard: 17, boots: 7, poles: 4, helmet: 5 },
    availability: "limited",
    services: ["Walk-in welcome", "Group discounts"],
    openingHours: "09:00 – 17:00",
  },
  {
    id: "s5", name: "Sport 2000 Rendezvous", tier: "standard", badge: "local_favourite",
    image: "", rating: 4.4, reviews: 156, distLift: "150m from gondola",
    location: "village",
    brands: ["Rossignol", "Salomon", "Head", "Atomic"],
    pricePerDay: { ski: 32, snowboard: 29, boots: 11, poles: 5, helmet: 7 },
    availability: "available",
    services: ["Online booking", "Free exchange", "Kids packages"],
    openingHours: "08:00 – 18:00",
  },
  {
    id: "s6", name: "Summit Equipment", tier: "performance", badge: "expert_pick",
    image: "", rating: 4.7, reviews: 203, distLift: "100m from main lift",
    location: "slope_side",
    brands: ["Atomic", "Head", "Fischer"],
    pricePerDay: { ski: 44, snowboard: 40, boots: 14, poles: 7, helmet: 9 },
    availability: "available",
    services: ["Race tuning", "Demo skis available", "Expert advice"],
    openingHours: "08:00 – 17:30",
  },
];

const TIERS = ["budget", "standard", "performance", "premium"];
const TIER_LABEL_KEYS = { budget: "budget_friendly", standard: "standard", performance: "performance_tier", premium: "premium_choice" };
const SPORT_TYPES = ["ski", "snowboard"];
const AVAIL_LABELS = { available: "Available", limited: "Limited", unavailable: "Unavailable" };
const AVAIL_COLORS = {
  available: "bg-peak-green/80 text-white",
  limited: "bg-amber-500/80 text-white",
  unavailable: "bg-peak-red/80 text-white",
};
const BADGE_LABELS = {
  official_partner: "⭐ Official Partner",
  top_rated: "Top rated",
  best_value: "Best value",
  premium_choice: "Premium",
  budget_friendly: "Budget-friendly",
  local_favourite: "Local favourite",
  expert_pick: "Expert pick",
};


// ─── Equipment Profile Panel ─────────────────────────────────────────────────
const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];
const BOOT_TYPES_SKI = ["Comfort / recreational", "All-mountain", "Race / performance"];
const BOOT_TYPES_SNOW = ["Soft / freestyle", "All-mountain", "Stiff / freeride"];

function EquipmentPanel({ shop, sportType, days, profile, updateProfile, onConfirm, onClose }) {
  const price = shop.pricePerDay[sportType] ?? shop.pricePerDay.ski;

  const [form, setForm] = useState({
    firstName: profile.firstName || "",
    lastName: profile.lastName || "",
    height: profile.height || "",
    weight: profile.weight || "",
    shoeSize: profile.shoeSize || "",
    helmetSize: profile.helmetSize || "",
    skillLevel: profile.skiingLevel || "Intermediate",
    bootType: "All-mountain",
    items: sportType === "ski"
      ? { skis: true, boots: true, poles: true, helmet: false }
      : { snowboard: true, boots: true, helmet: false },
    saveToProfile: true,
  });

  function setField(k, v) { setForm(prev => ({ ...prev, [k]: v })); }

  const ITEMS = sportType === "ski"
    ? [{ key: "skis", label: "Skis", price: shop.pricePerDay.ski }, { key: "boots", label: "Boots", price: shop.pricePerDay.boots }, { key: "poles", label: "Poles", price: shop.pricePerDay.poles }, { key: "helmet", label: "Helmet", price: shop.pricePerDay.helmet }]
    : [{ key: "snowboard", label: "Snowboard", price: shop.pricePerDay.snowboard }, { key: "boots", label: "Boots", price: shop.pricePerDay.boots }, { key: "helmet", label: "Helmet", price: shop.pricePerDay.helmet }];

  const totalPerDay = ITEMS.filter(i => form.items[i.key]).reduce((sum, i) => sum + (i.price || 0), 0);
  const totalForTrip = totalPerDay * days;

  function handleConfirm() {
    if (form.saveToProfile) {
      updateProfile({
        height: form.height, weight: form.weight, shoeSize: form.shoeSize,
        helmetSize: form.helmetSize, skiingLevel: form.skillLevel,
        firstName: form.firstName, lastName: form.lastName,
      });
    }
    onConfirm({
      shop, sportType, days, form, totalPerDay, totalForTrip,
      label: `${shop.name} — ${sportType} rental`,
      price: totalForTrip,
    });
  }

  const missing = !form.height || !form.shoeSize;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)" }} onClick={onClose}>
      <div className="w-full max-w-lg bg-peak-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-white/5">
          <div>
            <h3 className="font-display font-bold text-peak-text text-lg">{shop.name}</h3>
            <p className="text-peak-text-secondary text-sm mt-0.5 capitalize">{sportType} rental · {days} days · €{totalPerDay}/day</p>
          </div>
          <button onClick={onClose} className="text-peak-text-secondary hover:text-peak-text ml-3 flex-shrink-0"><X className="h-5 w-5" /></button>
        </div>

        <div className="p-5 space-y-5">
          {/* Name */}
          <div>
            <p className="text-peak-text text-sm font-semibold mb-3">Renter details</p>
            <div className="grid grid-cols-2 gap-3">
              {[{ key: "firstName", label: "First name", ph: "Anna" }, { key: "lastName", label: "Last name", ph: "Smith" }].map(f => (
                <div key={f.key}>
                  <label className="text-peak-text-secondary text-xs mb-1 block">{f.label}</label>
                  <input value={form[f.key]} onChange={e => setField(f.key, e.target.value)} placeholder={f.ph}
                    className="w-full bg-peak-surface border border-white/10 rounded-xl px-3 py-2 text-sm text-peak-text outline-none focus:border-peak-blue" />
                </div>
              ))}
            </div>
          </div>

          {/* Measurements */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-peak-text text-sm font-semibold">Your measurements</p>
              {(profile.height || profile.shoeSize) && (
                <span className="text-xs text-peak-blue">✓ Pre-filled from profile</span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: "height", label: "Height (cm)", ph: "175" },
                { key: "weight", label: "Weight (kg)", ph: "75" },
                { key: "shoeSize", label: "EU shoe size", ph: "42" },
                { key: "helmetSize", label: "Helmet size", ph: "M / 56cm" },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-peak-text-secondary text-xs mb-1 block">{f.label} {f.key === "height" || f.key === "shoeSize" ? <span className="text-peak-red text-xs">*</span> : ""}</label>
                  <input value={form[f.key]} onChange={e => setField(f.key, e.target.value)} placeholder={f.ph}
                    className={`w-full bg-peak-surface border rounded-xl px-3 py-2 text-sm text-peak-text outline-none focus:border-peak-blue ${!form[f.key] && (f.key === "height" || f.key === "shoeSize") ? "border-amber-500/50" : "border-white/10"}`} />
                </div>
              ))}
            </div>
            {missing && <p className="text-amber-400 text-xs mt-2">⚠ Height and shoe size are needed for proper fitting.</p>}
          </div>

          {/* Skill level */}
          <div>
            <p className="text-peak-text-secondary text-xs font-semibold uppercase tracking-wider mb-2">Skill level</p>
            <div className="flex gap-2 flex-wrap">
              {SKILL_LEVELS.map(l => (
                <button key={l} onClick={() => setField("skillLevel", l)}
                  className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${form.skillLevel === l ? "bg-peak-blue/20 border-peak-blue/50 text-peak-blue" : "border-white/10 text-peak-text-secondary hover:text-peak-text"}`}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Equipment selection */}
          <div>
            <p className="text-peak-text-secondary text-xs font-semibold uppercase tracking-wider mb-2">Select items</p>
            <div className="space-y-2">
              {ITEMS.map(item => (
                <label key={item.key} className="flex items-center justify-between cursor-pointer py-2 px-3 rounded-xl hover:bg-white/4 transition-colors">
                  <div className="flex items-center gap-3">
                    <div onClick={() => setForm(prev => ({ ...prev, items: { ...prev.items, [item.key]: !prev.items[item.key] } }))}
                      className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-colors flex-shrink-0 ${form.items[item.key] ? "bg-peak-blue border-peak-blue" : "border-white/20"}`}>
                      {form.items[item.key] && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <span className="text-peak-text text-sm capitalize">{item.label}</span>
                  </div>
                  <span className="text-peak-text-secondary text-xs">€{item.price}/day</span>
                </label>
              ))}
            </div>
          </div>

          {/* Save to profile */}
          <label className="flex items-center gap-3 cursor-pointer">
            <div onClick={() => setField("saveToProfile", !form.saveToProfile)}
              className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-colors flex-shrink-0 ${form.saveToProfile ? "bg-peak-blue border-peak-blue" : "border-white/20"}`}>
              {form.saveToProfile && <Check className="h-3 w-3 text-white" />}
            </div>
            <span className="text-peak-text-secondary text-sm">Save measurements to my profile</span>
          </label>

          {/* Total + CTA */}
          <div className="pt-3 border-t border-white/5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-peak-text-secondary text-sm">Total for {days} days</span>
              <span className="text-peak-text font-bold text-lg">€{totalForTrip}</span>
            </div>
            <button onClick={handleConfirm}
              className="w-full py-3 bg-peak-red hover:bg-peak-red-hover text-white font-semibold rounded-xl transition-colors">
              Confirm & add to trip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShopCard({ shop, sportType, days, onOpenPanel, t }) {
  const [expanded, setExpanded] = useState(false);
  const price = shop.pricePerDay[sportType] ?? shop.pricePerDay.ski;
  const total = price * days;
  const isOfficial = shop.badge === "official_partner";

  return (
    <div className={`bg-peak-card border rounded-2xl overflow-hidden transition-all group ${isOfficial ? "border-peak-red/30 hover:border-peak-red/50" : "border-white/5 hover:border-white/12"}`}>
      {/* Image */}
      <div className="relative h-44 bg-peak-surface overflow-hidden">
        {shop.image
          ? <img src={shop.image} alt={shop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          : <div className="w-full h-full flex items-center justify-center text-5xl opacity-20">🎿</div>
        }
        <div className="absolute top-3 left-3">
          <span className={`backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full ${isOfficial ? "bg-peak-red" : "bg-peak-blue/90"}`}>
            {BADGE_LABELS[shop.badge] || shop.badge}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm ${AVAIL_COLORS[shop.availability] || AVAIL_COLORS.available}`}>
            {AVAIL_LABELS[shop.availability] || "Available"}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-display font-bold text-peak-text text-base leading-tight">{shop.name}</h3>
          <div className="text-right flex-shrink-0">
            <p className="text-peak-text font-bold">€{price}<span className="text-peak-text-secondary text-xs font-normal">/{t("day")}</span></p>
            {days > 1 && <p className="text-peak-text-secondary text-xs">€{total} / {days} {t("nights")}</p>}
          </div>
        </div>

        <div className="flex items-center gap-2 mb-1.5">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-peak-text text-sm font-semibold">{shop.rating}</span>
          <span className="text-peak-text-secondary text-xs">({shop.reviews})</span>
        </div>

        <div className="flex items-center gap-1 text-peak-text-secondary text-xs mb-2">
          <MapPin className="h-3 w-3" />
          <span className="truncate">{shop.distLift} · {shop.location === "slope_side" ? t("slope_side") : t("village_centre")}</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {shop.brands.map(b => (
            <span key={b} className="text-xs border border-white/10 text-peak-text-secondary px-2 py-0.5 rounded-full">{b}</span>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onOpenPanel?.(shop)}
            disabled={shop.availability === "unavailable"}
            className="flex-1 py-2.5 bg-peak-red hover:bg-peak-red-hover disabled:opacity-40 text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <svg className="h-3.5 w-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            Enter details & reserve
          </button>
          <button
            onClick={() => setExpanded(e => !e)}
            className="px-3 py-2.5 rounded-xl border border-white/10 text-peak-text-secondary hover:text-peak-text transition-colors"
          >
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>

        {expanded && (
          <div className="mt-3 pt-3 border-t border-white/5 space-y-2">
            {shop.highlight && <p className="text-xs text-peak-blue font-medium">{shop.highlight}</p>}
            {shop.address && <p className="text-xs text-peak-text-secondary">📍 {shop.address}</p>}
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
              {Object.entries(shop.pricePerDay).map(([item, p]) => (
                <div key={item} className="flex justify-between">
                  <span className="text-peak-text-secondary capitalize">{item}</span>
                  <span className="text-peak-text">€{p}/{t("day")}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {shop.services.map(s => (
                <span key={s} className="text-xs bg-peak-green/10 text-peak-green px-2 py-0.5 rounded-full">✓ {s}</span>
              ))}
            </div>
            <p className="text-xs text-peak-text-secondary">{shop.openingHours}</p>
            {shop.website && (
              <a href={shop.website} target="_blank" rel="noopener noreferrer" className="text-xs text-peak-blue hover:underline block">
                {shop.website}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


// ─── Destination search ──────────────────────────────────────────────────────
import { searchDestinations } from "../../lib/searchIndex";

function DestinationSearch({ value, onSelect }) {
  const [query, setQuery] = useState(value?.label || "");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    function h(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  React.useEffect(() => {
    if (!query || query.length < 2) { setResults([]); return; }
    setResults(searchDestinations(query).slice(0, 8));
    setOpen(true);
  }, [query]);

  return (
    <div ref={ref} className="relative flex-1 min-w-[220px] max-w-xs">
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-peak-text-secondary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        <input value={query} onChange={e => { setQuery(e.target.value); if (!e.target.value) onSelect(null); }}
          onFocus={() => setOpen(true)} placeholder="Search resort or region…"
          className="w-full bg-peak-surface border border-white/10 rounded-xl pl-10 pr-8 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
        {query && <button onClick={() => { setQuery(""); onSelect(null); setOpen(false); }} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-peak-text-secondary hover:text-peak-text"><svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>}
      </div>
      {open && (results.length > 0 || !query) && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-peak-surface border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
          {!query && <div className="px-4 py-3 text-peak-text-secondary text-xs">Type to search resorts and regions</div>}
          {results.map((item, i) => (
            <button key={i} onClick={() => { setQuery(item.label); onSelect(item); setOpen(false); }}
              className="w-full text-left px-4 py-2.5 hover:bg-white/5 flex items-center gap-3 transition-colors">
              <span className="text-base">{item.flag || "⛷️"}</span>
              <div className="min-w-0"><p className="text-peak-text text-sm font-medium truncate">{item.label}</p><p className="text-peak-text-secondary text-xs truncate">{item.sublabel}</p></div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function EquipmentRentalTab({ agentServiceDetails = {}, onBook }) {
  const { session } = useTripPlanner();
  const { profile, updateProfile } = useProfile();
  const t = useT();
  // Never auto-read days or destination from session — avoids home-search contamination
  // Days come from explicit user input; destination from in-tab search only
  const sessionDays = session?.dates?.nights ? session.dates.nights + 1 : null;
  const [localDays, setLocalDays] = useState(sessionDays || null);
  const days = localDays || sessionDays || null; // null = not set, don't show
  const [selectedDestination, setSelectedDestination] = useState(null);
  const destination = selectedDestination?.label || agentServiceDetails?.destination || "";

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("recommended");
  const [filterTiers, setFilterTiers] = useState([]);
  const [filterSport, setFilterSport] = useState("ski");
  const [filterLocation, setFilterLocation] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [panelShop, setPanelShop] = useState(null);

  function toggleArr(arr, setArr, val) {
    setArr(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]);
  }

  const SORT_OPTS = [
    { key: "recommended", labelKey: "recommended" },
    { key: "rating", labelKey: "rating" },
    { key: "price_asc", labelKey: "price_low" },
    { key: "price_desc", labelKey: "price_high" },
  ];

  const filtered = useMemo(() => {
    let res = [...SHOPS];
    if (search) {
      const q = search.toLowerCase();
      res = res.filter(s => s.name.toLowerCase().includes(q) || s.brands.some(b => b.toLowerCase().includes(q)));
    }
    if (filterTiers.length) res = res.filter(s => filterTiers.includes(s.tier));
    if (filterLocation) res = res.filter(s => s.location === filterLocation);
    if (sortBy === "rating") res.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "price_asc") res.sort((a, b) => (a.pricePerDay[filterSport] ?? 0) - (b.pricePerDay[filterSport] ?? 0));
    else if (sortBy === "price_desc") res.sort((a, b) => (b.pricePerDay[filterSport] ?? 0) - (a.pricePerDay[filterSport] ?? 0));
    else res.sort((a, b) => (b.badge === "official_partner" ? 1 : 0) - (a.badge === "official_partner" ? 1 : 0));
    return res;
  }, [search, sortBy, filterTiers, filterLocation, filterSport]);

  const hasFilters = filterTiers.length > 0 || !!filterLocation;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="font-display font-extrabold text-3xl text-peak-text mb-1">{t("equipment_rental")}</h2>
        <p className="text-peak-text-secondary text-sm">
          {destination
            ? `Rental shops near ${destination}`
            : "Browse equipment rental shops — search for a resort above to filter by location"}
          {days ? ` · ${days} ${days === 1 ? "day" : "days"}` : ""}
        </p>
      </div>

      {/* Controls row */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {/* Destination search */}
        <DestinationSearch value={selectedDestination} onSelect={setSelectedDestination} />
        {/* Days input */}
        <div className="flex items-center gap-2 bg-peak-surface border border-white/10 rounded-xl px-3 py-2">
          <span className="text-peak-text-secondary text-xs whitespace-nowrap">Days:</span>
          <input type="number" min={1} max={30} value={localDays || ""} onChange={e => setLocalDays(e.target.value ? parseInt(e.target.value) : null)}
            placeholder="—" className="w-10 bg-transparent text-sm text-peak-text outline-none text-center" />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* Sport type */}
        <div className="flex rounded-xl overflow-hidden border border-white/10">
          {SPORT_TYPES.map(s => (
            <button key={s} onClick={() => setFilterSport(s)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${filterSport === s ? "bg-peak-blue text-white" : "text-peak-text-secondary hover:text-peak-text"}`}>
              {s === "ski" ? `🎿 ${t("skis")}` : `🏂 ${t("snowboard")}`}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-peak-text-secondary" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder={`${t("search")}...`}
            className="w-full bg-peak-surface border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
        </div>

        {/* Filters toggle */}
        <button onClick={() => setSidebarOpen(o => !o)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm transition-colors ${sidebarOpen ? "bg-peak-blue/10 border-peak-blue/40 text-peak-blue" : "border-white/10 text-peak-text-secondary hover:text-peak-text"}`}>
          <SlidersHorizontal className="h-4 w-4" />
          {t("filters")}
          {hasFilters && <span className="bg-peak-red text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{filterTiers.length + (filterLocation ? 1 : 0)}</span>}
        </button>

        {/* Sort */}
        <div className="flex gap-1.5 overflow-x-auto hide-scrollbar">
          {SORT_OPTS.map(o => (
            <button key={o.key} onClick={() => setSortBy(o.key)}
              className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap border transition-colors ${sortBy === o.key ? "bg-peak-blue/20 border-peak-blue/40 text-peak-blue" : "border-white/10 text-peak-text-secondary hover:text-peak-text"}`}>
              {t(o.labelKey)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        {sidebarOpen && (
          <div className="w-56 flex-shrink-0">
            <div className="bg-peak-card border border-white/5 rounded-2xl p-5 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-peak-text font-semibold text-sm">{t("filters")}</span>
                {hasFilters && (
                  <button onClick={() => { setFilterTiers([]); setFilterLocation(null); }}
                    className="text-xs text-peak-blue hover:underline">{t("clear")}</button>
                )}
              </div>

              {/* Equipment tier */}
              <div className="mb-5">
                <p className="text-peak-text-secondary text-xs font-semibold uppercase tracking-wider mb-3">{t("equipment_step")}</p>
                {TIERS.map(tier => (
                  <button key={tier} onClick={() => toggleArr(filterTiers, setFilterTiers, tier)}
                    className={`flex items-center gap-2 w-full text-left text-xs px-3 py-2 rounded-lg mb-1 transition-colors ${filterTiers.includes(tier) ? "bg-peak-blue/15 text-peak-blue" : "text-peak-text-secondary hover:text-peak-text"}`}>
                    {filterTiers.includes(tier) && <Check className="h-3 w-3 flex-shrink-0" />}
                    {t(TIER_LABEL_KEYS[tier]) || tier}
                  </button>
                ))}
              </div>

              {/* Location */}
              <div>
                <p className="text-peak-text-secondary text-xs font-semibold uppercase tracking-wider mb-3">{t("filter_location_type")}</p>
                {[
                  { val: null, labelKey: "all_filters" },
                  { val: "slope_side", labelKey: "slope_side" },
                  { val: "village", labelKey: "village_centre" },
                ].map(({ val, labelKey }) => (
                  <button key={String(val)} onClick={() => setFilterLocation(val)}
                    className={`w-full text-left text-xs px-3 py-2 rounded-lg mb-1 transition-colors ${filterLocation === val ? "bg-peak-blue/15 text-peak-blue" : "text-peak-text-secondary hover:text-peak-text"}`}>
                    {t(labelKey)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Grid */}
        <div className="flex-1 min-w-0">
          <p className="text-peak-text-secondary text-sm mb-4">
            {filtered.length} {t("shops_found") || "shops found"}
          </p>
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-peak-text-secondary">
              <p className="text-lg mb-2">{t("no_results") || "No shops match your filters"}</p>
              <button onClick={() => { setFilterTiers([]); setFilterLocation(null); }}
                className="text-peak-blue text-sm hover:underline">{t("clear_filters")}</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map(shop => (
                <ShopCard
                  key={shop.id}
                  shop={shop}
                  sportType={filterSport}
                  days={days}
                  onOpenPanel={s => setPanelShop(s)} //_legacy={s => onBook?.(
                    `${s.name} — ${filterSport} rental`,
                    (s.pricePerDay[filterSport] ?? s.pricePerDay.ski) * days,
                    { shop: s.name, tier: s.tier, days, sportType: filterSport }
                  )}
                  t={t}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Equipment profile panel */}
      {panelShop && (
        <EquipmentPanel
          shop={panelShop}
          sportType={filterSport}
          days={days}
          profile={profile}
          updateProfile={updateProfile}
          onClose={() => setPanelShop(null)}
          onConfirm={booking => {
            onBook?.(booking.label, booking.price, booking);
            setPanelShop(null);
          }}
        />
      )}
    </div>
  );
}