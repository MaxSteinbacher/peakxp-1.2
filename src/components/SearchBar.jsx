import { useState, useEffect, useRef } from "react";
import { useT } from "../lib/i18n";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, CalendarDays, Users, Plus, Check, Globe, Map, X } from "lucide-react";
import DateRangePicker, { fmtDate } from "./shared/DateRangePicker";
import { searchDestinations, searchIndex } from "../lib/searchIndex";
import { useTripPlanner } from "../context/TripPlannerContext";
import { resorts as allResorts } from "../lib/data";
import { toast } from "sonner";

const SERVICE_KEYS = [
  { key: "ski-pass", i18nKey: "ski_passes" },
  { key: "accommodation", i18nKey: "accommodation" },
  { key: "equipment", i18nKey: "equipment_rental" },
  { key: "ski-school", i18nKey: "ski_school" },
  { key: "flights", i18nKey: "flights" },
  { key: "train", i18nKey: "train" },
  { key: "car", i18nKey: "car_rental" },
  { key: "storage", i18nKey: "storage" },
  { key: "dining", i18nKey: "dining" },
  { key: "activities", i18nKey: "activities" },
  { key: "childcare", i18nKey: "childcare" },
];

const TYPE_ICON = { resort: MapPin, country: Globe, region: Map };
const TYPE_LABEL = { resort: "Resort", country: "Country", region: "Region" };

export default function SearchBar() {
  const t = useT();
  const navigate = useNavigate();
  const { startTrip } = useTripPlanner();

  // Destination
  const [query, setQuery] = useState("");
  const [selectedDest, setSelectedDest] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [results, setResults] = useState([]);
  const [destError, setDestError] = useState("");
  const destRef = useRef(null);

  // Dates
  const [searchStart, setSearchStart] = useState(null);
  const [searchEnd, setSearchEnd] = useState(null);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const dateRef = useRef(null);

  // Guests
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [seniors, setSeniors] = useState(0);
  const [guestOpen, setGuestOpen] = useState(false);
  const guestRef = useRef(null);

  // Services
  const [selected, setSelected] = useState(["ski-pass"]);

  // Close on outside click
  useEffect(() => {
    function handler(e) {
      if (guestRef.current && !guestRef.current.contains(e.target)) setGuestOpen(false);
      if (destRef.current && !destRef.current.contains(e.target)) setShowDropdown(false);
      if (dateRef.current && !dateRef.current.contains(e.target)) setDatePickerOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Search as user types
  useEffect(() => {
    if (query.length > 0 && !selectedDest) {
      setResults(searchDestinations(query, searchIndex));
      setShowDropdown(true);
    } else {
      setResults([]);
      if (!selectedDest) setShowDropdown(false);
    }
  }, [query, selectedDest]);

  function handleSelectDest(item) {
    setSelectedDest(item);
    setQuery(item.label);
    setShowDropdown(false);
    setDestError("");
  }

  function clearDest() {
    setSelectedDest(null);
    setQuery("");
    setDestError("");
  }

  // Date label
  const dateLabel = searchStart
    ? searchEnd
      ? `${fmtDate(searchStart)} → ${fmtDate(searchEnd)}`
      : fmtDate(searchStart)
    : t('add_dates');

  // Guest label
  const guestParts = [];
  if (adults > 0) guestParts.push(`${adults} ${adults !== 1 ? t('adults') : t('adult')}`);
  if (children > 0) guestParts.push(`${children} ${t('children')}`);
  if (seniors > 0) guestParts.push(`${seniors} ${t('seniors')}`);
  const guestLabel = guestParts.join(" · ") || "Add guests";

  function toggleService(key) {
    if (selected.includes(key)) {
      if (selected.length <= 1) { toast.error("Select at least one service"); return; }
      setSelected(prev => prev.filter(k => k !== key));
    } else {
      setSelected(prev => [...prev, key]);
    }
  }

  function handleSearch() {
    if (!selectedDest) { setDestError("Please select a destination"); return; }
    setDestError("");
    if (!searchStart) toast("Adding dates helps us show accurate availability", { icon: "📅" });

    // For resort type, enrich with coordinates for proximity engine
    let resortCoords = {};
    if (selectedDest.type === "resort") {
      const matchedResort = allResorts.find(r => r.id === selectedDest.id || r.name.toLowerCase() === selectedDest.label.toLowerCase());
      if (matchedResort?.coordinates) {
        resortCoords = { lat: matchedResort.coordinates.lat, lon: matchedResort.coordinates.lon };
      }
    }

    const destination = {
      type: selectedDest.type,
      label: selectedDest.label,
      id: selectedDest.id,
      resortId: selectedDest.type === "resort" ? selectedDest.id : undefined,
      countryCode: Array.isArray(selectedDest.countryCode) ? selectedDest.countryCode[0] : selectedDest.countryCode,
      region: selectedDest.region || null,
      flag: selectedDest.flag || "",
      ...resortCoords,
    };
    const nights = searchStart && searchEnd ? Math.round((new Date(searchEnd) - new Date(searchStart)) / 86400000) : null;
    const dates = {
      start: searchStart ? (searchStart instanceof Date ? searchStart.toISOString() : new Date(searchStart).toISOString()) : null,
      end: searchEnd ? (searchEnd instanceof Date ? searchEnd.toISOString() : new Date(searchEnd).toISOString()) : null,
      nights,
    };
    startTrip(destination, dates, { adults, children, seniors }, selected);
    navigate("/plan");
  }

  // Group dropdown results
  const grouped = { region: [], country: [], resort: [] };
  results.forEach(r => { if (grouped[r.type]) grouped[r.type].push(r); });
  const groupOrder = ["region", "country", "resort"];
  const groupLabels = { region: "Regions", country: "Countries", resort: "Resorts" };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main search bar */}
      <div className="relative flex flex-col sm:flex-row items-stretch bg-peak-card border border-white/10 rounded-xl overflow-visible shadow-2xl">

        {/* Destination */}
        <div className="relative flex-1 flex items-center px-5 py-4 border-b sm:border-b-0 sm:border-r border-white/10" ref={destRef}>
          <MapPin className="h-7 w-7 text-peak-blue mr-3 flex-shrink-0" strokeWidth={2.5} />
          <div className="flex-1 flex items-center gap-2 min-w-0">
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); if (selectedDest) setSelectedDest(null); }}
              onFocus={() => { if (query.length > 0 && !selectedDest) setShowDropdown(true); }}
              placeholder={t('where_going')}
              className="w-full bg-transparent text-peak-text placeholder:text-peak-text-secondary/70 outline-none text-sm font-medium"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            {selectedDest && (
              <button onClick={clearDest} className="text-peak-text-secondary hover:text-peak-text flex-shrink-0">
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          {destError && (
            <p className="absolute -bottom-5 left-5 text-peak-red text-xs whitespace-nowrap">{destError}</p>
          )}
          {/* Destination dropdown */}
          {showDropdown && results.length > 0 && (
            <div className="absolute top-full left-0 w-full sm:w-96 bg-peak-card border border-white/10 rounded-2xl shadow-xl z-50 overflow-hidden mt-2">
              {groupOrder.map(type => {
                const items = grouped[type];
                if (!items || items.length === 0) return null;
                return (
                  <div key={type}>
                    <div className="text-peak-text-secondary text-xs font-semibold uppercase tracking-wider px-4 py-2 bg-peak-surface">{groupLabels[type]}</div>
                    {items.map(item => {
                      const Icon = TYPE_ICON[item.type] || MapPin;
                      return (
                        <button key={item.id} onMouseDown={() => handleSelectDest(item)}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 cursor-pointer transition-colors text-left">
                          <Icon className="h-4 w-4 text-peak-blue flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-peak-text text-sm font-medium">{item.flag} {item.label}</p>
                            <p className="text-peak-text-secondary text-xs truncate">{item.sublabel}</p>
                          </div>
                          {item.type === "resort" && item.pisteKm && (
                            <span className="text-peak-text-secondary text-xs flex-shrink-0">{item.pisteKm}km</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Dates — button trigger, calendar opens below the full bar */}
        <button
          onClick={() => setDatePickerOpen(o => !o)}
          className="flex-1 flex items-center px-5 py-4 border-b sm:border-b-0 sm:border-r border-white/10 text-left"
        >
          <CalendarDays className="h-7 w-7 text-peak-blue mr-3 flex-shrink-0" strokeWidth={2.5} />
          <span className={`text-sm font-medium truncate ${searchStart ? "text-peak-text" : "text-peak-text-secondary/70"}`}>
            {dateLabel}
          </span>
        </button>

        {/* Guests */}
        <div className="relative flex-1" ref={guestRef}>
          <button onClick={() => setGuestOpen(o => !o)} className="w-full flex items-center px-5 py-4 text-left">
            <Users className="h-7 w-7 text-peak-blue mr-3 flex-shrink-0" strokeWidth={2.5} />
            <span className={`text-sm font-medium truncate ${(adults + children + seniors) > 0 ? "text-peak-text" : "text-peak-text-secondary/70"}`}>
              {guestLabel}
            </span>
          </button>
          {guestOpen && (
            <div className="absolute top-full left-0 right-0 z-30 mt-2 bg-peak-card border border-white/10 rounded-2xl shadow-2xl p-4 min-w-[220px]">
              {[
                { label: t('adults'), sub: t('age_13_plus'), val: adults, set: setAdults, min: 1 },
                { label: t('children'), sub: t('ages_2_12'), val: children, set: setChildren, min: 0 },
                { label: t('seniors'), sub: t('age_65_plus'), val: seniors, set: setSeniors, min: 0 },
              ].map(({ label, sub, val, set, min }) => (
                <div key={label} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                  <div>
                    <p className="text-peak-text text-sm font-medium">{label}</p>
                    <p className="text-peak-text-secondary text-xs">{sub}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => set(v => Math.max(min, v - 1))} className="w-7 h-7 rounded-full border border-white/20 text-peak-text-secondary hover:text-peak-text hover:border-white/40 flex items-center justify-center transition-colors">−</button>
                    <span className="w-6 text-center text-peak-text text-sm font-bold">{val}</span>
                    <button onClick={() => set(v => Math.min(20, v + 1))} className="w-7 h-7 rounded-full border border-white/20 text-peak-text-secondary hover:text-peak-text hover:border-white/40 flex items-center justify-center transition-colors">+</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Search button */}
        <button onClick={handleSearch} className="m-3 px-6 py-3 bg-peak-red hover:bg-peak-red-hover text-white font-display font-bold text-sm tracking-wide rounded-lg transition-colors flex items-center gap-2 flex-shrink-0">
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">{t('search')}</span>
        </button>
      </div>

      {/* Date picker dropdown — below the full bar */}
      {datePickerOpen && (
        <div ref={dateRef} className="mt-2 bg-peak-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          <DateRangePicker
            triggerStyle="inline"
            startDate={searchStart}
            endDate={searchEnd}
            onStartChange={setSearchStart}
            onEndChange={(d) => {
              setSearchEnd(d);
              if (searchStart && d) setDatePickerOpen(false);
            }}
            context="general"
            placeholder={{ start: "Arrival", end: "Departure" }}
          />
        </div>
      )}

      {/* Service pills */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {SERVICE_KEYS.map((svc) => {
          const isActive = selected.includes(svc.key);
          return (
            <button key={svc.key} onClick={() => toggleService(svc.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                isActive
                  ? "bg-peak-red/20 border-peak-red/40 text-peak-red"
                  : "bg-white/5 border-white/10 text-peak-text-secondary hover:border-white/25 hover:text-peak-text"
              }`}>
              {isActive ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
              {t(svc.i18nKey)}
            </button>
          );
        })}
      </div>
    </div>
  );
}