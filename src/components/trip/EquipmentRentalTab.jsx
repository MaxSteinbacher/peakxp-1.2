import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Star, MapPin, ChevronDown, ChevronUp, Check } from "lucide-react";
import { useTripPlanner } from "../../context/TripPlannerContext";
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

function ShopCard({ shop, sportType, days, onBook, t }) {
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
            onClick={() => onBook?.(shop)}
            disabled={shop.availability === "unavailable"}
            className="flex-1 py-2.5 bg-peak-red hover:bg-peak-red-hover disabled:opacity-40 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            {t("add_to_basket")}
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

export default function EquipmentRentalTab({ agentServiceDetails = {}, onBook }) {
  const { session } = useTripPlanner();
  const t = useT();
  const days = session?.dates?.nights ? session.dates.nights + 1 : (agentServiceDetails?.days || 3);
  const destination = session?.destination?.label || agentServiceDetails?.destination || "";

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("recommended");
  const [filterTiers, setFilterTiers] = useState([]);
  const [filterSport, setFilterSport] = useState("ski");
  const [filterLocation, setFilterLocation] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  function toggleArr(arr, setArr, val) {
    setArr(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]);
  }

  const isHochkonig = destination.toLowerCase().includes("hochkönig")
    || destination.toLowerCase().includes("hochkonig")
    || destination.toLowerCase().includes("maria alm");

  const SORT_OPTS = [
    { key: "recommended", labelKey: "recommended" },
    { key: "rating", labelKey: "rating" },
    { key: "price_asc", labelKey: "price_low" },
    { key: "price_desc", labelKey: "price_high" },
  ];

  const filtered = useMemo(() => {
    let res = [...SHOPS];
    if (!isHochkonig) res = res.filter(s => !s.resort);
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
  }, [search, sortBy, filterTiers, filterLocation, filterSport, isHochkonig]);

  const hasFilters = filterTiers.length > 0 || !!filterLocation;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="font-display font-extrabold text-3xl text-peak-text mb-1">{t("equipment_rental")}</h2>
        <p className="text-peak-text-secondary text-sm">
          {destination
            ? `${t("rental_shops_near") || "Rental shops near"} ${destination}`
            : t("choose_rental_shop")}
          {days > 1 ? ` · ${days} ${t("nights")}` : ""}
        </p>
      </div>

      {/* Controls row */}
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
                  onBook={s => onBook?.(
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
    </div>
  );
}