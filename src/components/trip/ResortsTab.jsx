import { useState, useMemo } from "react";
import { ArrowUpDown, SlidersHorizontal, Star } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { resorts } from "../../lib/data";

const sortOptions = [
  { key: "relevance", label: "Relevance" },
  { key: "price", label: "Price" },
  { key: "rating", label: "Rating" },
  { key: "altitude", label: "Altitude" },
];

const popularFilterDefs = [
  { key: "beginner", label: "Beginner friendly" },
  { key: "family", label: "Family resort" },
  { key: "terrain_park", label: "Snow park" },
  { key: "night_skiing", label: "Night skiing" },
  { key: "free_parking", label: "Free parking" },
  { key: "apres_ski", label: "Après-ski" },
];

const countries = ["Switzerland", "France", "Austria", "Italy", "Andorra", "Spain", "Norway", "Slovenia"];
const slopeSizes = [
  { key: "small", label: "Small (<50km)" },
  { key: "medium", label: "Medium (50–150km)" },
  { key: "large", label: "Large (150–300km)" },
  { key: "vast", label: "Vast (300km+)" },
];
const slopeOfferings = ["Beginner", "Intermediate", "Expert", "Freeride", "Off-piste"];
const facilitiesChecks = [
  { key: "kids_area", label: "Kids area" },
  { key: "childcare", label: "Childcare / crèche" },
  { key: "gastronomy", label: "Gastronomy" },
  { key: "apres_ski", label: "Après-ski" },
  { key: "eco", label: "Environmental friendliness" },
];

function PillToggle({ label, active, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors whitespace-nowrap ${
        active
          ? "bg-peak-blue/20 border-peak-blue/40 text-peak-blue"
          : "border-white/10 text-peak-text-secondary hover:text-peak-text"
      }`}
    >
      {label}
    </button>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-5 border-b border-white/5 pb-5">
      <h4 className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-3">{title}</h4>
      {children}
    </div>
  );
}

function StarSelector({ value, onChange }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} onClick={() => onChange(value === n ? 0 : n)}>
          <Star className={`h-5 w-5 ${n <= value ? "fill-yellow-400 text-yellow-400" : "text-peak-text-secondary"}`} />
        </button>
      ))}
    </div>
  );
}

function toggle(arr, val) {
  return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
}

function getSizeKey(km) {
  if (km < 50) return "small";
  if (km < 150) return "medium";
  if (km < 300) return "large";
  return "vast";
}

export default function ResortsTab() {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("q") || "";

  const [sortBy, setSortBy] = useState("relevance");
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Filters state
  const [popularFilters, setPopularFilters] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sizes, setSizes] = useState([]);
  const [minAlt, setMinAlt] = useState([500]);
  const [maxAlt, setMaxAlt] = useState([4000]);
  const [liftsMax, setLiftsMax] = useState([100]);
  const [slopeOffer, setSlopeOffer] = useState([]);
  const [groomingMin, setGroomingMin] = useState(0);
  const [snowMin, setSnowMin] = useState(0);
  const [snowPark, setSnowPark] = useState(false);
  const [crossCountry, setCrossCountry] = useState(false);
  const [nightSkiing, setNightSkiing] = useState(false);
  const [facilities, setFacilities] = useState([]);
  const [parking, setParking] = useState("any");

  const filteredResorts = useMemo(() => {
    let results = [...resorts];

    if (query) {
      results = results.filter((r) =>
        r.name.toLowerCase().includes(query.toLowerCase()) ||
        r.country.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (selectedCountries.length > 0) {
      results = results.filter((r) => selectedCountries.includes(r.country));
    }

    results = results.filter(
      (r) => r.priceFrom >= priceRange[0] && r.priceFrom <= priceRange[1]
    );

    if (sizes.length > 0) {
      results = results.filter((r) => sizes.includes(getSizeKey(r.pisteKm)));
    }

    results = results.filter(
      (r) => r.maxAltitude >= minAlt[0] && r.maxAltitude <= (maxAlt[0] >= 4000 ? Infinity : maxAlt[0])
    );

    if (liftsMax[0] < 100) {
      results = results.filter((r) => r.lifts <= liftsMax[0]);
    }

    if (slopeOffer.length > 0) {
      results = results.filter((r) =>
        slopeOffer.some((s) => r.difficulty?.map((d) => d.toLowerCase()).includes(s.toLowerCase()))
      );
    }

    if (snowPark || popularFilters.includes("terrain_park")) {
      results = results.filter((r) => r.facilities?.includes("terrain_park"));
    }
    if (nightSkiing || popularFilters.includes("night_skiing")) {
      results = results.filter((r) => r.facilities?.includes("night_skiing"));
    }
    if (popularFilters.includes("beginner")) {
      results = results.filter((r) => r.difficulty?.includes("beginner"));
    }

    switch (sortBy) {
      case "price": results.sort((a, b) => a.priceFrom - b.priceFrom); break;
      case "rating": results.sort((a, b) => b.rating - a.rating); break;
      case "altitude": results.sort((a, b) => b.maxAltitude - a.maxAltitude); break;
      default: break;
    }

    return results;
  }, [query, sortBy, popularFilters, selectedCountries, priceRange, sizes, minAlt, maxAlt, liftsMax, slopeOffer, snowPark, nightSkiing, facilities, parking]);

  const filterPanel = (
    <div className="w-64 flex-shrink-0">
      {/* Popular filters */}
      <Section title="Popular filters">
        <div className="flex flex-wrap gap-2">
          {popularFilterDefs.map((f) => (
            <PillToggle
              key={f.key}
              label={f.label}
              active={popularFilters.includes(f.key)}
              onToggle={() => setPopularFilters((prev) => toggle(prev, f.key))}
            />
          ))}
        </div>
      </Section>

      {/* Location */}
      <Section title="Location">
        <div className="space-y-2">
          {countries.map((c) => (
            <label key={c} className="flex items-center gap-2 cursor-pointer group">
              <Checkbox
                checked={selectedCountries.includes(c)}
                onCheckedChange={() => setSelectedCountries((prev) => toggle(prev, c))}
                className="border-peak-text-secondary data-[state=checked]:bg-peak-blue data-[state=checked]:border-peak-blue"
              />
              <span className="text-sm text-peak-text-secondary group-hover:text-peak-text transition-colors">{c}</span>
            </label>
          ))}
        </div>
      </Section>

      {/* Price */}
      <Section title={`Price per day: €${priceRange[0]} – €${priceRange[1]} / day`}>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={0}
          max={200}
          step={5}
          className="[&_[role=slider]]:bg-peak-blue [&_[role=slider]]:border-peak-blue [&_.bg-primary]:bg-peak-blue"
        />
      </Section>

      {/* Mountain */}
      <Section title="Mountain">
        <div className="mb-4">
          <p className="text-xs text-peak-text-secondary mb-2">Ski resort size</p>
          <div className="flex flex-wrap gap-2">
            {slopeSizes.map((s) => (
              <PillToggle
                key={s.key}
                label={s.label}
                active={sizes.includes(s.key)}
                onToggle={() => setSizes((prev) => toggle(prev, s.key))}
              />
            ))}
          </div>
        </div>
        <div className="mb-4">
          <p className="text-xs text-peak-text-secondary mb-2">Minimum altitude: {minAlt[0]}m</p>
          <Slider value={minAlt} onValueChange={setMinAlt} min={500} max={2000} step={100}
            className="[&_[role=slider]]:bg-peak-blue [&_[role=slider]]:border-peak-blue [&_.bg-primary]:bg-peak-blue" />
        </div>
        <div className="mb-4">
          <p className="text-xs text-peak-text-secondary mb-2">Maximum altitude: {maxAlt[0] >= 4000 ? "4000m+" : `${maxAlt[0]}m`}</p>
          <Slider value={maxAlt} onValueChange={setMaxAlt} min={2000} max={4000} step={100}
            className="[&_[role=slider]]:bg-peak-blue [&_[role=slider]]:border-peak-blue [&_.bg-primary]:bg-peak-blue" />
        </div>
        <div>
          <p className="text-xs text-peak-text-secondary mb-2">Ski lifts: up to {liftsMax[0] >= 100 ? "100+" : liftsMax[0]}</p>
          <Slider value={liftsMax} onValueChange={setLiftsMax} min={0} max={100} step={5}
            className="[&_[role=slider]]:bg-peak-blue [&_[role=slider]]:border-peak-blue [&_.bg-primary]:bg-peak-blue" />
        </div>
      </Section>

      {/* Slopes */}
      <Section title="Slopes">
        <div className="mb-4">
          <p className="text-xs text-peak-text-secondary mb-2">Slope offering</p>
          <div className="flex flex-wrap gap-2">
            {slopeOfferings.map((s) => (
              <PillToggle
                key={s}
                label={s}
                active={slopeOffer.includes(s)}
                onToggle={() => setSlopeOffer((prev) => toggle(prev, s))}
              />
            ))}
          </div>
        </div>
        <div className="mb-3">
          <p className="text-xs text-peak-text-secondary mb-2">Slope grooming (min)</p>
          <StarSelector value={groomingMin} onChange={setGroomingMin} />
        </div>
        <div className="mb-3">
          <p className="text-xs text-peak-text-secondary mb-2">Snow reliability (min)</p>
          <StarSelector value={snowMin} onChange={setSnowMin} />
        </div>
        <div className="space-y-2 mt-3">
          {[
            { label: "Snow parks", checked: snowPark, set: setSnowPark },
            { label: "Cross-country skiing", checked: crossCountry, set: setCrossCountry },
            { label: "Night skiing", checked: nightSkiing, set: setNightSkiing },
          ].map(({ label, checked, set }) => (
            <label key={label} className="flex items-center gap-2 cursor-pointer group">
              <Checkbox
                checked={checked}
                onCheckedChange={set}
                className="border-peak-text-secondary data-[state=checked]:bg-peak-blue data-[state=checked]:border-peak-blue"
              />
              <span className="text-sm text-peak-text-secondary group-hover:text-peak-text transition-colors">{label}</span>
            </label>
          ))}
        </div>
      </Section>

      {/* Facilities */}
      <Section title="Facilities & Services">
        <div className="space-y-2">
          {facilitiesChecks.map((f) => (
            <label key={f.key} className="flex items-center gap-2 cursor-pointer group">
              <Checkbox
                checked={facilities.includes(f.key)}
                onCheckedChange={() => setFacilities((prev) => toggle(prev, f.key))}
                className="border-peak-text-secondary data-[state=checked]:bg-peak-blue data-[state=checked]:border-peak-blue"
              />
              <span className="text-sm text-peak-text-secondary group-hover:text-peak-text transition-colors">{f.label}</span>
            </label>
          ))}
        </div>
      </Section>

      {/* Parking */}
      <Section title="Parking">
        <div className="space-y-2">
          {["Any", "Free", "Included in ski pass", "Paid (charged)"].map((opt) => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="parking"
                checked={parking === opt.toLowerCase()}
                onChange={() => setParking(opt.toLowerCase())}
                className="accent-peak-blue"
              />
              <span className="text-sm text-peak-text-secondary group-hover:text-peak-text transition-colors">{opt}</span>
            </label>
          ))}
        </div>
      </Section>
    </div>
  );

  return (
    <div>
      {/* Sort bar */}
      <div className="flex items-center justify-between mb-6 gap-3">
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
          {sortOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setSortBy(opt.key)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap ${
                sortBy === opt.key
                  ? "bg-peak-blue/20 border-peak-blue/40 text-peak-blue"
                  : "border-white/10 text-peak-text-secondary hover:text-peak-text"
              }`}
            >
              <ArrowUpDown className="h-3 w-3" />
              {opt.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="lg:hidden flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-peak-text-secondary border border-white/10 rounded-lg hover:text-peak-text"
        >
          <SlidersHorizontal className="h-3 w-3" />
          Filters
        </button>
      </div>

      <div className="flex gap-8">
        {/* Desktop filter panel */}
        <div className="hidden lg:block">{filterPanel}</div>

        {/* Mobile filter drawer */}
        {filtersOpen && (
          <>
            <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setFiltersOpen(false)} />
            <div className="fixed inset-y-0 left-0 z-50 w-80 bg-peak-surface border-r border-white/5 overflow-y-auto p-5 pt-20 lg:hidden">
              {filterPanel}
            </div>
          </>
        )}

        {/* Results */}
        <div className="flex-1">
          <p className="text-peak-text-secondary text-sm mb-4">
            {filteredResorts.length} resort{filteredResorts.length !== 1 ? "s" : ""} found
          </p>
          {filteredResorts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-peak-text-secondary text-lg">No resorts match your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredResorts.map((resort) => (
                <Link
                  key={resort.id}
                  to={`/resort/${resort.id}`}
                  className="group bg-peak-card border border-white/5 hover:border-peak-blue/30 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={resort.image}
                      alt={resort.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-peak-bg/80 backdrop-blur-sm px-2 py-0.5 rounded text-xs font-medium text-peak-text">
                      {resort.flag} {resort.country}
                    </div>
                    <div className="absolute top-3 right-3 bg-peak-blue text-white text-xs font-bold px-2 py-0.5 rounded">
                      {resort.rating}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-bold text-peak-text text-lg">{resort.name}</h3>
                    <p className="text-peak-text-secondary text-sm mt-0.5 mb-3">{resort.pisteKm}km pistes · {resort.lifts} lifts · {resort.maxAltitude}m</p>
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