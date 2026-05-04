import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, CalendarDays, Users, Plus, Check } from "lucide-react";
import DateRangePicker, { fmtDate } from "./shared/DateRangePicker";
import { resorts } from "../lib/data";

const addOns = [
  { key: "ski_passes", label: "Ski passes" },
  { key: "accommodation", label: "Accommodation" },
  { key: "equipment", label: "Equipment rental" },
  { key: "ski_school", label: "Ski school" },
  { key: "flights", label: "Flights" },
  { key: "train", label: "Train" },
  { key: "car_rental", label: "Car rental" },
  { key: "storage", label: "Storage & lockers" },
  { key: "dining", label: "Dining" },
  { key: "activities", label: "Activities" },
  { key: "childcare", label: "Childcare" },
];

export default function SearchBar() {
  const [destination, setDestination] = useState("");
  const [who, setWho] = useState(1);
  const [searchStart, setSearchStart] = useState(null);
  const [searchEnd, setSearchEnd] = useState(null);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const dateContainerRef = useRef(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!datePickerOpen) return;
    function handler(e) {
      if (dateContainerRef.current && !dateContainerRef.current.contains(e.target)) {
        setDatePickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [datePickerOpen]);

  const suggestions = destination.length > 0
    ? resorts.filter(r => r.name.toLowerCase().includes(destination.toLowerCase()))
    : [];

  const toggleAddOn = (key) => {
    setSelected(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const handleSearch = () => {
    navigate("/trip-planning" + (destination ? `?q=${encodeURIComponent(destination)}` : ""));
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main search bar */}
      <div className="relative flex flex-col sm:flex-row items-stretch bg-peak-card border border-white/10 rounded-xl overflow-visible shadow-2xl">

        {/* Destination */}
        <div className="relative flex-1 flex items-center px-5 py-4 border-b sm:border-b-0 sm:border-r border-white/10">
          <MapPin className="h-7 w-7 text-peak-blue mr-3 flex-shrink-0" strokeWidth={2.5} />
          <input
            type="text"
            value={destination}
            onChange={(e) => { setDestination(e.target.value); setShowSuggestions(true); }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Where are you going?"
            className="w-full bg-transparent text-peak-text placeholder:text-peak-text-secondary/70 outline-none text-sm font-medium"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          {/* Autocomplete */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-30 mt-2 bg-peak-card border border-white/10 rounded-xl overflow-hidden shadow-2xl">
              {suggestions.map((resort) => (
                <button
                  key={resort.id}
                  onMouseDown={() => {
                    setDestination(resort.name);
                    setShowSuggestions(false);
                  }}
                  className="w-full flex items-center gap-4 px-5 py-3 hover:bg-white/5 transition-colors text-left"
                >
                  <img src={resort.image} alt={resort.name} className="w-12 h-8 rounded object-cover" />
                  <div>
                    <p className="text-peak-text text-sm font-medium">{resort.name}</p>
                    <p className="text-peak-text-secondary text-xs">{resort.flag} {resort.country} · {resort.pisteKm}km</p>
                  </div>
                  <span className="ml-auto text-peak-blue text-xs font-semibold">{resort.rating}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* When */}
        <button
          onClick={() => setDatePickerOpen(true)}
          className="flex-1 flex items-center px-5 py-4 border-b sm:border-b-0 sm:border-r border-white/10 text-left"
        >
          <CalendarDays className="h-7 w-7 text-peak-blue mr-3 flex-shrink-0" strokeWidth={2.5} />
          <span className={`text-sm font-medium ${searchStart ? "text-peak-text" : "text-peak-text-secondary/70"}`}>
            {searchStart ? (searchEnd ? `${fmtDate(searchStart)} → ${fmtDate(searchEnd)}` : fmtDate(searchStart)) : "Add dates"}
          </span>
        </button>

        {/* Who */}
        <div className="flex-1 flex items-center px-5 py-4 gap-3">
          <Users className="h-7 w-7 text-peak-blue flex-shrink-0" strokeWidth={2.5} />
          <div className="flex items-center gap-2 flex-1">
            <button
              onClick={() => setWho(w => Math.max(1, w - 1))}
              className="w-7 h-7 rounded-full border border-white/20 text-peak-text-secondary hover:text-peak-text hover:border-white/40 flex items-center justify-center text-base transition-colors flex-shrink-0"
            >−</button>
            <span className="text-peak-text text-sm font-medium w-20 text-center">
              {who} {who === 1 ? "guest" : "guests"}
            </span>
            <button
              onClick={() => setWho(w => Math.min(20, w + 1))}
              className="w-7 h-7 rounded-full border border-white/20 text-peak-text-secondary hover:text-peak-text hover:border-white/40 flex items-center justify-center text-base transition-colors flex-shrink-0"
            >+</button>
          </div>
        </div>

        {/* Search button */}
        <button
          onClick={handleSearch}
          className="m-3 px-6 py-3 bg-peak-red hover:bg-peak-red-hover text-white font-display font-bold text-sm tracking-wide rounded-lg transition-colors flex items-center gap-2 flex-shrink-0"
        >
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">Search</span>
        </button>
      </div>

      {/* Inline DateRangePicker */}
      {datePickerOpen && (
        <div ref={dateContainerRef} className="mt-2 bg-peak-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          <DateRangePicker
            triggerStyle="inline"
            startDate={searchStart} endDate={searchEnd}
            onStartChange={setSearchStart}
            onEndChange={(d) => { setSearchEnd(d); if (searchStart && d) setDatePickerOpen(false); }}
            context="general"
            placeholder={{ start: "Arrival", end: "Departure" }}
          />
        </div>
      )}

      {/* Add-ons */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {addOns.map((addon) => {
          const isSelected = selected.includes(addon.key);
          return (
            <button
              key={addon.key}
              onClick={() => toggleAddOn(addon.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                isSelected
                  ? "bg-peak-red/20 border-peak-red/50 text-peak-red"
                  : "bg-white/5 border-white/10 text-peak-text-secondary hover:border-white/25 hover:text-peak-text"
              }`}
            >
              {isSelected ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
              {addon.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}