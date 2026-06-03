import { useState, useMemo, useEffect } from "react";
import { useT } from "../../lib/i18n";
import { Link } from "react-router-dom";
import { X, SlidersHorizontal } from "lucide-react";
import DateRangePicker from "../shared/DateRangePicker";
import RangeSlider from "../shared/RangeSlider";
import { useTripPlanner } from "../../context/TripPlannerContext";
import { resorts, SEASON_PASSES } from "../../lib/data";
import { sortByProximity, getNearestResorts, getResortsInDestination } from "../../lib/proximity";

const SORT_KEYS = ["recommended", "closest_first", "price_low", "price_high", "rating", "most_pistes", "most_lifts"];

function recommendedScore(r) {
  const prox = r.distanceKm != null ? Math.max(0, 1 - r.distanceKm / 500) : 0.5;
  const rating = ((r.rating || 7) - 5) / 5;
  const pistes = Math.min(1, (r.pisteKm || 0) / 600);
  return prox * 0.4 + rating * 0.35 + pistes * 0.25;
}

function ActiveChips({ filters, onRemove, onClearAll }) {
  const chips = [];
  if (filters.distanceKm < 150) chips.push({ key: "distanceKm", label: `Within ${filters.distanceKm}km` });
  if (filters.countries.length) chips.push(...filters.countries.map(c => ({ key: `country:${c}`, label: c })));
  if (filters.priceRange[0] > 0 || filters.priceRange[1] < 150) chips.push({ key: "price", label: `€${filters.priceRange[0]}–€${filters.priceRange[1]}/day` });
  if (filters.pisteRange[0] > 0 || filters.pisteRange[1] < 600) chips.push({ key: "piste", label: `${filters.pisteRange[0]}–${filters.pisteRange[1]}km pistes` });
  if (filters.altRange[0] > 0 || filters.altRange[1] < 5000) chips.push({ key: "alt", label: `${filters.altRange[0]}–${filters.altRange[1]}m` });
  if (filters.liftsMin > 0) chips.push({ key: "lifts", label: `Min ${filters.liftsMin} lifts` });
  if (filters.minRating) chips.push({ key: "rating", label: `${filters.minRating}+ rating` });
  if (filters.facilities.length) chips.push(...filters.facilities.map(f => ({ key: `fac:${f}`, label: f })));
  if (filters.passes.length) chips.push(...filters.passes.map(p => ({ key: `pass:${p}`, label: p })));

  if (!chips.length) return null;
  return (
    <div className="flex flex-wrap gap-2 mb-4 items-center">
      {chips.map(c => (
        <span key={c.key} className="bg-peak-surface border border-white/10 rounded-full px-3 py-1 text-peak-text text-xs flex items-center gap-1.5">
          {c.label}
          <button onClick={() => onRemove(c.key)} className="text-peak-text-secondary hover:text-peak-red transition-colors"><X className="h-3 w-3" /></button>
        </span>
      ))}
      <button onClick={onClearAll} className="text-peak-blue text-xs hover:underline">Clear all</button>
    </div>
  );
}

function FilterSidebar({ baseList, filters, setFilters, showDistance, destination }) {
  const t = useT();
  const countries = useMemo(() => [...new Set(baseList.map(r => Array.isArray(r.country) ? r.country[0] : r.country).filter(Boolean))].sort(), [baseList]);
  const allFacilities = ["Kids area", "Night skiing", "Snow park", "Après-ski", "Free parking", "Ski-in ski-out", "Cross-country", "Glacier skiing", "Car-free village"];
  const activeFacilities = useMemo(() => allFacilities.filter(f => {
    const key = f.toLowerCase().replace(/-/g, "_").replace(/\s+/g, "_");
    return baseList.filter(r => {
      const facs = Array.isArray(r.facilities) ? r.facilities : [];
      return facs.includes(key) || facs.includes(f.toLowerCase());
    }).length >= 3;
  }), [baseList]);
  const passOptions = useMemo(() => {
    const set = new Set();
    baseList.forEach(r => (r.seasonPasses || []).forEach(p => set.add(p)));
    return [...set];
  }, [baseList]);

  function toggle(key, arr, setArr) {
    setFilters(f => ({ ...f, [key]: arr.includes(setArr) ? arr.filter(x => x !== setArr) : [...arr, setArr] }));
  }

  return (
    <div className="space-y-5 w-64 flex-shrink-0">
      {showDistance && (
        <div className="border-b border-white/5 pb-5">
          <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-2">Distance: {filters.distanceKm < 150 ? `≤ ${filters.distanceKm}km` : "Any"}</p>
          <RangeSlider mode="single" value={filters.distanceKm} onValueChange={v => setFilters(f => ({ ...f, distanceKm: typeof v === "number" ? v : v[0] }))} min={5} max={150} step={5} formatLabel={n => n + "km"} />
        </div>
      )}
      {countries.length > 1 && (
        <div className="border-b border-white/5 pb-5">
          <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-2">{t('country').toUpperCase()}</p>
          <div className="space-y-1.5">
            {countries.map(c => (
              <label key={c} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-peak-blue" checked={filters.countries.includes(c)}
                  onChange={() => setFilters(f => ({ ...f, countries: f.countries.includes(c) ? f.countries.filter(x => x !== c) : [...f.countries, c] }))} />
                <span className="text-sm text-peak-text-secondary">{c}</span>
              </label>
            ))}
          </div>
        </div>
      )}
      <div className="border-b border-white/5 pb-5">
        <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-2">{t('daily_lift_pass')}: €{filters.priceRange[0]}–€{filters.priceRange[1]}</p>
        <RangeSlider mode="dual" value={filters.priceRange} onValueChange={v => setFilters(f => ({ ...f, priceRange: v }))} min={0} max={150} step={5} formatLabel={n => "€" + n} />
      </div>
      <div className="border-b border-white/5 pb-5">
        <p className="text-xs font-semibold text-peak-text-secondary uppercase tracking-wider mb-3">{t('terrain_altitude').toUpperCase()}</p>
        <p className="text-peak-text text-sm font-medium mb-1">{filters.altRange[0]}m – {filters.altRange[1]}m</p>
        <RangeSlider mode="dual" value={filters.altRange} onValueChange={v => setFilters(f => ({ ...f, altRange: v }))} min={0} max={5000} step={50} formatLabel={n => n + "m"} />
        <p className="text-xs text-peak-text-secondary mb-1 mt-4">{t('piste_km')}: {filters.pisteRange[0]}–{filters.pisteRange[1]}km</p>
        <RangeSlider mode="dual" value={filters.pisteRange} onValueChange={v => setFilters(f => ({ ...f, pisteRange: v }))} min={0} max={600} step={10} formatLabel={n => n + "km"} />
        <p className="text-xs text-peak-text-secondary mb-1 mt-4">{t('minimum_lifts')}: {filters.liftsMin >= 200 ? "200+" : filters.liftsMin}</p>
        <RangeSlider mode="single" value={filters.liftsMin} onValueChange={v => setFilters(f => ({ ...f, liftsMin: typeof v === "number" ? v : v[0] }))} min={0} max={200} step={5} formatLabel={String} />
      </div>
      <div className="border-b border-white/5 pb-5">
        <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-2">{t('rating').toUpperCase()}</p>
        <div className="flex flex-wrap gap-1.5">
          {["Any", "7+", "8+", "8.5+", "9+"].map(r => (
            <button key={r} onClick={() => setFilters(f => ({ ...f, minRating: r === "Any" ? null : parseFloat(r) }))}
              className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${(filters.minRating?.toString() + "+") === r || (r === "Any" && !filters.minRating) ? "bg-peak-blue/20 border-peak-blue/50 text-peak-blue" : "border-white/10 text-peak-text-secondary"}`}>
              {r}
            </button>
          ))}
        </div>
      </div>
      {activeFacilities.length > 0 && (
        <div className="border-b border-white/5 pb-5">
          <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-2">Facilities</p>
          <div className="space-y-1.5">
            {activeFacilities.map(f => (
              <label key={f} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-peak-blue" checked={filters.facilities.includes(f)}
                  onChange={() => setFilters(prev => ({ ...prev, facilities: prev.facilities.includes(f) ? prev.facilities.filter(x => x !== f) : [...prev.facilities, f] }))} />
                <span className="text-sm text-peak-text-secondary">{f}</span>
              </label>
            ))}
          </div>
        </div>
      )}
      {passOptions.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-2">{t('season_passes_filter').toUpperCase()}</p>
          <div className="space-y-1.5">
            {passOptions.map(p => (
              <label key={p} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-peak-blue" checked={filters.passes.includes(p)}
                  onChange={() => setFilters(prev => ({ ...prev, passes: prev.passes.includes(p) ? prev.passes.filter(x => x !== p) : [...prev.passes, p] }))} />
                <span className="text-sm text-peak-text-secondary">{SEASON_PASSES[p]?.name || p}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const DEFAULT_FILTERS = { distanceKm: 150, countries: [], priceRange: [0, 150], pisteRange: [0, 600], altRange: [0, 5000], liftsMin: 0, minRating: null, facilities: [], passes: [] };

export default function ResortsTab({ standalone = false }) {
  const t = useT();
  const { session } = useTripPlanner();
  // In standalone (browse) mode, never read session.destination —
  // the Trip Planning tab is independent of any active booking session.
  const destination = standalone ? null : (session?.destination || null);
  const [sortBy, setSortBy] = useState("recommended");
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [arrivalDate, setArrivalDate] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);

  const showDistance = destination?.type === "resort" || destination?.type === "region";

  const baseList = useMemo(() => {
    if (!destination || destination.type === "resort") {
      const nearestList = destination?.id ? getNearestResorts(resorts, destination.id, 12) : [];
      const main = destination?.id ? resorts.find(r => r.id === destination.id) : null;
      const combined = main
        ? [{ ...main, distanceKm: 0 }, ...nearestList]
        : getResortsInDestination(resorts, destination);
      return combined;
    }
    return getResortsInDestination(resorts, destination);
  }, [destination]);

  function clearAllFilters() { setFilters(DEFAULT_FILTERS); }

  function removeFilter(key) {
    if (key === "distanceKm") setFilters(f => ({ ...f, distanceKm: 150 }));
    else if (key.startsWith("country:")) setFilters(f => ({ ...f, countries: f.countries.filter(c => c !== key.slice(8)) }));
    else if (key === "price") setFilters(f => ({ ...f, priceRange: [0, 150] }));
    else if (key === "piste") setFilters(f => ({ ...f, pisteRange: [0, 600] }));
    else if (key === "alt") setFilters(f => ({ ...f, altRange: [0, 5000] }));
    else if (key === "lifts") setFilters(f => ({ ...f, liftsMin: 0 }));
    else if (key === "rating") setFilters(f => ({ ...f, minRating: null }));
    else if (key.startsWith("fac:")) setFilters(f => ({ ...f, facilities: f.facilities.filter(x => x !== key.slice(4)) }));
    else if (key.startsWith("pass:")) setFilters(f => ({ ...f, passes: f.passes.filter(x => x !== key.slice(5)) }));
  }

  const results = useMemo(() => {
    let list = [...baseList];
    if (showDistance && filters.distanceKm < 150) list = list.filter(r => (r.distanceKm || 0) <= filters.distanceKm);
    if (filters.countries.length) list = list.filter(r => {
      const c = Array.isArray(r.country) ? r.country[0] : r.country;
      return filters.countries.includes(c);
    });
    list = list.filter(r => (r.priceFrom || 0) >= filters.priceRange[0] && (r.priceFrom || 999) <= filters.priceRange[1]);
    list = list.filter(r => (r.pisteKm || 0) >= filters.pisteRange[0] && (r.pisteKm || 0) <= filters.pisteRange[1]);
    list = list.filter(r => (r.altitude?.summit || r.maxAltitude || 0) >= filters.altRange[0] && (r.altitude?.base || 0) <= filters.altRange[1]);
    list = list.filter(r => (r.lifts || 0) >= filters.liftsMin);
    if (filters.minRating) list = list.filter(r => (r.rating || 0) >= filters.minRating);
    if (filters.passes.length) list = list.filter(r => filters.passes.some(p => (r.seasonPasses || []).includes(p)));

    if (sortBy === "recommended") list.sort((a, b) => recommendedScore(b) - recommendedScore(a));
    else if (sortBy === "closest_first") list.sort((a, b) => (a.distanceKm || 999) - (b.distanceKm || 999));
    else if (sortBy === "price_low") list.sort((a, b) => (a.priceFrom || 0) - (b.priceFrom || 0));
    else if (sortBy === "price_high") list.sort((a, b) => (b.priceFrom || 0) - (a.priceFrom || 0));
    else if (sortBy === "rating") list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    else if (sortBy === "most_pistes") list.sort((a, b) => (b.pisteKm || 0) - (a.pisteKm || 0));
    else if (sortBy === "most_lifts") list.sort((a, b) => (b.lifts || 0) - (a.lifts || 0));

    return list;
  }, [baseList, filters, sortBy, showDistance]);

  return (
    <div>
      <div className="mb-5 max-w-sm">
        <DateRangePicker startDate={arrivalDate} endDate={departureDate} onStartChange={setArrivalDate} onEndChange={setDepartureDate} context="general" placeholder={{ start: t('arrival'), end: t('departure') }} />
      </div>

      {/* Sort bar */}
      <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar mb-3 pb-1">
        {SORT_KEYS.map(key => (
          <button key={key} onClick={() => setSortBy(key)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-colors flex-shrink-0 ${sortBy === key ? "bg-peak-red text-white" : "bg-peak-surface border border-white/10 text-peak-text-secondary hover:text-peak-text"}`}>
            {t(key)}
          </button>
        ))}
        <button onClick={() => setFiltersOpen(o => !o)} className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-peak-text-secondary border border-white/10 rounded-full ml-auto flex-shrink-0">
          <SlidersHorizontal className="h-3 w-3" /> Filters
        </button>
      </div>

      {destination?.type === "resort" && (
        <p className="text-peak-text-secondary text-sm mb-3">Resorts near <span className="text-peak-text font-medium">{destination.label}</span></p>
      )}

      <ActiveChips filters={filters} onRemove={removeFilter} onClearAll={clearAllFilters} />

      <div className="flex gap-8">
        <div className="hidden lg:block">{<FilterSidebar baseList={baseList} filters={filters} setFilters={setFilters} showDistance={showDistance} destination={destination} />}</div>

        {filtersOpen && (
          <>
            <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setFiltersOpen(false)} />
            <div className="fixed inset-y-0 left-0 z-50 w-80 bg-peak-surface border-r border-white/5 overflow-y-auto p-5 pt-20 lg:hidden">
              <FilterSidebar baseList={baseList} filters={filters} setFilters={setFilters} showDistance={showDistance} destination={destination} />
            </div>
          </>
        )}

        <div className="flex-1">
          <p className="text-peak-text-secondary text-sm mb-4">{results.length} {t('resorts_found')}</p>
          {results.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-peak-text-secondary text-lg mb-3">No resorts match your filters.</p>
              <button onClick={clearAllFilters} className="text-peak-blue hover:underline text-sm">Clear all filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {results.map(resort => (
                <Link key={resort.id} to={`/resort/${resort.id}`}
                  className="group bg-peak-card border border-white/5 hover:border-peak-blue/30 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1">
                  <div className="relative h-44 overflow-hidden">
                    <img src={resort.image} alt={resort.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 bg-peak-bg/80 backdrop-blur-sm px-2 py-0.5 rounded text-xs font-medium text-peak-text">
                      {resort.flag} {Array.isArray(resort.country) ? resort.country[0] : resort.country}
                    </div>
                    <div className="absolute top-3 right-3 bg-peak-blue text-white text-xs font-bold px-2 py-0.5 rounded">{resort.rating}</div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-bold text-peak-text text-lg">{resort.name}</h3>
                    <p className="text-peak-text-secondary text-sm mt-0.5 mb-1">{resort.pisteKm}km pistes · {resort.lifts} lifts · {resort.maxAltitude}m</p>
                    {resort.distanceKm != null && destination?.type === "resort" && (
                      <p className="text-peak-text-secondary text-xs mb-2">{resort.distanceKm} km away</p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-peak-text-secondary">{resort.ratingLabel}</span>
                      <span className="text-peak-text font-bold">€{resort.priceFrom}<span className="text-peak-text-secondary text-xs font-normal">/day</span></span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}