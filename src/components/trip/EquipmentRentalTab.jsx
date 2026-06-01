import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Star, MapPin, ChevronDown, ChevronUp, Check, X } from "lucide-react";
import { useTripPlanner } from "../../context/TripPlannerContext";
import { useT } from "../../lib/i18n";

// ─── Static shop data ────────────────────────────────────────────────────────
const SHOPS = [
  {
    id: "intersport-mariaalm", name: "Intersport Maria Alm", tier: "performance", badge: "Official Partner",
    image: "https://www.intersport-mariaalm.at/wordpress/wp-content/uploads/medium-Hochkoenigman-1.jpg",
    rating: 4.9, reviews: 487, distLift: "Multiple locations — valley stations Hintermoos & Aberg",
    location: "slope_side", locationLabel: "Slope-side",
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
    id: "s1", name: "Schneider Sport", tier: "performance", badge: "Top rated",
    image: "", rating: 4.8, reviews: 312, distLift: "50m from main lift",
    location: "slope_side", locationLabel: "Slope-side",
    brands: ["Atomic", "Salomon", "Head"],
    pricePerDay: { ski: 38, snowboard: 35, boots: 12, poles: 6, helmet: 8 },
    availability: "available",
    services: ["Fitting service", "Boot heat-moulding", "Free day-1 exchange"],
    openingHours: "08:00 – 17:30",
  },
  {
    id: "s2", name: "Alpine Rentals", tier: "standard", badge: "Best value",
    image: "", rating: 4.5, reviews: 187, distLift: "200m from main lift",
    location: "village", locationLabel: "Village centre",
    brands: ["Rossignol", "Fischer", "K2"],
    pricePerDay: { ski: 28, snowboard: 26, boots: 9, poles: 5, helmet: 6 },
    availability: "available",
    services: ["Online pre-booking", "Free size exchange", "Delivery to hotel"],
    openingHours: "08:30 – 18:00",
  },
  {
    id: "s3", name: "Peak Gear Pro", tier: "premium", badge: "Premium",
    image: "", rating: 4.9, reviews: 241, distLift: "Ski-in ski-out",
    location: "slope_side", locationLabel: "Slope-side",
    brands: ["Völkl", "Nordica", "Dynastar", "Blizzard"],
    pricePerDay: { ski: 52, snowboard: 48, boots: 16, poles: 8, helmet: 10 },
    availability: "available",
    services: ["Expert fitting", "Tuning included", "Premium models", "Delivery"],
    openingHours: "07:30 – 18:30",
  },
  {
    id: "s4", name: "Berghutte Rentals", tier: "budget", badge: "Budget-friendly",
    image: "", rating: 4.1, reviews: 89, distLift: "400m from main lift",
    location: "village", locationLabel: "Village centre",
    brands: ["Elan", "Scott", "Völkl"],
    pricePerDay: { ski: 18, snowboard: 17, boots: 7, poles: 4, helmet: 5 },
    availability: "limited",
    services: ["Walk-in welcome", "Group discounts"],
    openingHours: "09:00 – 17:00",
  },
  {
    id: "s5", name: "Sport 2000 Rendezvous", tier: "standard", badge: "Local favourite",
    image: "", rating: 4.4, reviews: 156, distLift: "150m from gondola",
    location: "village", locationLabel: "Village centre",
    brands: ["Rossignol", "Salomon", "Head", "Atomic"],
    pricePerDay: { ski: 32, snowboard: 29, boots: 11, poles: 5, helmet: 7 },
    availability: "available",
    services: ["Online booking", "Free exchange", "Kids packages"],
    openingHours: "08:00 – 18:00",
  },
  {
    id: "s6", name: "Summit Equipment", tier: "performance", badge: "Expert pick",
    image: "", rating: 4.7, reviews: 203, distLift: "100m from main lift",
    location: "slope_side", locationLabel: "Slope-side",
    brands: ["Atomic", "Head", "Fischer"],
    pricePerDay: { ski: 44, snowboard: 40, boots: 14, poles: 7, helmet: 9 },
    availability: "available",
    services: ["Race tuning", "Demo skis available", "Expert advice"],
    openingHours: "08:00 – 17:30",
  },
];

const TIERS = ["budget", "standard", "performance", "premium"];
const TIER_LABELS = { budget: "Budget", standard: "Standard", performance: "Performance", premium: "Premium" };
const SPORT_TYPES = ["ski", "snowboard"];
const SORT_OPTS = [
  { key: "recommended", label: "Recommended" },
  { key: "rating", label: "Highest rated" },
  { key: "price_asc", label: "Price: low to high" },
  { key: "price_desc", label: "Price: high to low" },
  { key: "distance", label: "Closest to lifts" },
];

function TierBadge({ tier, badge }) {
  if (badge === "Official Partner") return <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-peak-red text-white">⭐ Official Partner</span>;
  const colors = { budget: "bg-white/10 text-white/60", standard: "bg-blue-500/20 text-blue-300", performance: "bg-amber-500/20 text-amber-300", premium: "bg-purple-500/20 text-purple-300" };
  return <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colors[tier] || "bg-white/10 text-white/60"}`}>{TIER_LABELS[tier] || tier}</span>;
}

function AvailBadge({ status }) {
  const cfg = { available: "bg-peak-green/80 text-white", limited: "bg-amber-500/80 text-white", unavailable: "bg-peak-red/80 text-white" };
  const labels = { available: "Available", limited: "Limited", unavailable: "Unavailable" };
  return <span className={`text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm ${cfg[status] || cfg.available}`}>{labels[status] || "Available"}</span>;
}

function ShopCard({ shop, sportType, days, onBook, t }) {
  const [expanded, setExpanded] = useState(false);
  const price = shop.pricePerDay[sportType] ?? shop.pricePerDay.ski;
  const total = price * days;

  return (
    <div className="bg-peak-card border border-white/5 rounded-2xl overflow-hidden hover:border-white/12 transition-all group">
      {/* Image */}
      <div className="relative h-44 bg-peak-surface overflow-hidden">
        {shop.image
          ? <img src={shop.image} alt={shop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          : <div className="w-full h-full flex items-center justify-center text-5xl opacity-20">🎿</div>
        }
        <div className="absolute top-3 left-3"><TierBadge tier={shop.tier} badge={shop.badge} /></div>
        <div className="absolute top-3 right-3"><AvailBadge status={shop.availability} /></div>
      </div>
      {/* Body */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-display font-bold text-peak-text text-base leading-tight">{shop.name}</h3>
          <div className="text-right flex-shrink-0">
            <p className="text-peak-text font-bold">€{price}<span className="text-peak-text-secondary text-xs font-normal">/day</span></p>
            {days > 1 && <p className="text-peak-text-secondary text-xs">€{total} for {days} days</p>}
          </div>
        </div>
        <div className="flex items-center gap-2 mb-1.5">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-peak-text text-sm font-semibold">{shop.rating}</span>
          <span className="text-peak-text-secondary text-xs">({shop.reviews})</span>
          {shop.badge && <span className="text-xs bg-peak-blue/10 text-peak-blue px-2 py-0.5 rounded-full">{shop.badge}</span>}
        </div>
        <div className="flex items-center gap-1 text-peak-text-secondary text-xs mb-2">
          <MapPin className="h-3 w-3" />
          <span>{shop.distLift} · {shop.locationLabel}</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {shop.brands.map(b => <span key={b} className="text-xs border border-white/10 text-peak-text-secondary px-2 py-0.5 rounded-full">{b}</span>)}
        </div>
        <div className="flex gap-2">
          <button onClick={() => onBook?.(shop)} disabled={shop.availability === "unavailable"}
            className="flex-1 py-2.5 bg-peak-red hover:bg-peak-red-hover disabled:opacity-40 text-white text-sm font-semibold rounded-xl transition-colors">
            {t("add_to_trip")}
          </button>
          <button onClick={() => setExpanded(e => !e)}
            className="px-3 py-2.5 rounded-xl border border-white/10 text-peak-text-secondary hover:text-peak-text transition-colors">
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
        {expanded && (
          <div className="mt-3 pt-3 border-t border-white/5 space-y-2">
            {shop.highlight && <p className="text-xs text-peak-blue font-medium">{shop.highlight}</p>}
            {shop.address && <p className="text-xs text-peak-text-secondary">📍 {shop.address}</p>}
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
              {Object.entries(shop.pricePerDay).map(([item, p]) => (
                <div key={item} className="flex justify-between"><span className="text-peak-text-secondary capitalize">{item}</span><span className="text-peak-text">€{p}/day</span></div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {shop.services.map(s => <span key={s} className="text-xs bg-peak-green/10 text-peak-green px-2 py-0.5 rounded-full">✓ {s}</span>)}
            </div>
            <p className="text-xs text-peak-text-secondary">Opens: {shop.openingHours}</p>
            {shop.website && <a href={shop.website} target="_blank" rel="noopener noreferrer" className="text-xs text-peak-blue hover:underline">{shop.website}</a>}
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

  const isHochkonig = destination.toLowerCase().includes("hochkönig") || destination.toLowerCase().includes("hochkonig") || destination.toLowerCase().includes("maria alm");

  const filtered = useMemo(() => {
    let res = [...SHOPS];
    // If Hochkönig resort, only show local partner + generic shops; otherwise hide resort-specific ones
    if (!isHochkonig) res = res.filter(s => !s.resort);
    if (search) res = res.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.brands.some(b => b.toLowerCase().includes(search.toLowerCase())));
    if (filterTiers.length) res = res.filter(s => filterTiers.includes(s.tier));
    if (filterLocation) res = res.filter(s => s.location === filterLocation);
    if (sortBy === "rating") res.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "price_asc") res.sort((a, b) => (a.pricePerDay[filterSport] ?? 0) - (b.pricePerDay[filterSport] ?? 0));
    else if (sortBy === "price_desc") res.sort((a, b) => (b.pricePerDay[filterSport] ?? 0) - (a.pricePerDay[filterSport] ?? 0));
    else res.sort((a, b) => (a.resort ? -1 : 0) - (b.resort ? -1 : 0)); // resort partners first by default
    return res;
  }, [search, sortBy, filterTiers, filterLocation, filterSport, isHochkonig]);

  const hasFilters = filterTiers.length > 0 || !!filterLocation;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="font-display font-extrabold text-3xl text-peak-text mb-1">{t("equipment_rental")}</h2>
        <p className="text-peak-text-secondary text-sm">
          {destination ? `Rental shops near ${destination}` : "Browse rental shops — select a resort to filter by location"}
          {days > 1 ? ` · ${days} days` : ""}
        </p>
      </div>

      {/* Sport type + search + sort */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex rounded-xl overflow-hidden border border-white/10">
          {SPORT_TYPES.map(s => (
            <button key={s} onClick={() => setFilterSport(s)}
              className={`px-4 py-2 text-sm font-medium transition-colors capitalize ${filterSport === s ? "bg-peak-blue text-white" : "text-peak-text-secondary hover:text-peak-text"}`}>
              {s === "ski" ? "🎿 Ski" : "🏂 Snowboard"}
            </button>
          ))}
        </div>
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-peak-text-secondary" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search shops or brands..."
            className="w-full bg-peak-surface border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
        </div>
        <button onClick={() => setSidebarOpen(o => !o)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm transition-colors ${sidebarOpen ? "bg-peak-blue/10 border-peak-blue/40 text-peak-blue" : "border-white/10 text-peak-text-secondary hover:text-peak-text"}`}>
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {hasFilters && <span className="bg-peak-red text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{filterTiers.length + (filterLocation ? 1 : 0)}</span>}
        </button>
        <div className="flex gap-1.5 overflow-x-auto">
          {SORT_OPTS.map(o => (
            <button key={o.key} onClick={() => setSortBy(o.key)}
              className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap border transition-colors ${sortBy === o.key ? "bg-peak-blue/20 border-peak-blue/40 text-peak-blue" : "border-white/10 text-peak-text-secondary hover:text-peak-text"}`}>
              {o.label}
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
                <span className="text-peak-text font-semibold text-sm">Filters</span>
                {hasFilters && <button onClick={() => { setFilterTiers([]); setFilterLocation(null); }} className="text-xs text-peak-blue hover:underline">Clear</button>}
              </div>
              {/* Tier */}
              <div className="mb-5">
                <p className="text-peak-text-secondary text-xs font-semibold uppercase tracking-wider mb-3">Equipment tier</p>
                {TIERS.map(tier => (
                  <button key={tier} onClick={() => toggleArr(filterTiers, setFilterTiers, tier)}
                    className={`flex items-center gap-2 w-full text-left text-xs px-3 py-2 rounded-lg mb-1 transition-colors ${filterTiers.includes(tier) ? "bg-peak-blue/15 text-peak-blue" : "text-peak-text-secondary hover:text-peak-text hover:bg-white/4"}`}>
                    {filterTiers.includes(tier) && <Check className="h-3 w-3 flex-shrink-0" />}
                    {TIER_LABELS[tier]}
                  </button>
                ))}
              </div>
              {/* Location */}
              <div>
                <p className="text-peak-text-secondary text-xs font-semibold uppercase tracking-wider mb-3">Location</p>
                {[{ val: null, label: "All" }, { val: "slope_side", label: "Slope-side" }, { val: "village", label: "Village" }].map(({ val, label }) => (
                  <button key={String(val)} onClick={() => setFilterLocation(val)}
                    className={`w-full text-left text-xs px-3 py-2 rounded-lg mb-1 transition-colors ${filterLocation === val ? "bg-peak-blue/15 text-peak-blue" : "text-peak-text-secondary hover:text-peak-text hover:bg-white/4"}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Grid */}
        <div className="flex-1 min-w-0">
          <p className="text-peak-text-secondary text-sm mb-4">{filtered.length} shops found</p>
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-peak-text-secondary">
              <p className="text-lg mb-2">No shops match your filters</p>
              <button onClick={() => { setFilterTiers([]); setFilterLocation(null); }} className="text-peak-blue text-sm hover:underline">Clear filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map(shop => (
                <ShopCard key={shop.id} shop={shop} sportType={filterSport} days={days}
                  onBook={s => onBook?.(`${s.name} — ${filterSport} rental`, s.pricePerDay[filterSport] * days, { shop: s.name, tier: s.tier, days, sportType: filterSport })}
                  t={t} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}