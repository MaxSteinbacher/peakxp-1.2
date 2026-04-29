import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Calendar, Users, Plus, Check } from "lucide-react";
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
  const [when, setWhen] = useState("");
  const [who, setWho] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  const suggestions = destination.length > 0
    ? resorts.filter(r => r.name.toLowerCase().includes(destination.toLowerCase()))
    : [];

  const toggleAddOn = (key) => {
    setSelected(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const handleSearch = () => {
    navigate("/search" + (destination ? `?q=${encodeURIComponent(destination)}` : ""));
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main search bar */}
      <div className="relative flex flex-col sm:flex-row items-stretch bg-peak-card border border-white/10 rounded-xl overflow-visible shadow-2xl">
        {/* Destination */}
        <div className="relative flex-1 flex items-center px-5 py-4 border-b sm:border-b-0 sm:border-r border-white/10">
          <MapPin className="h-4 w-4 text-peak-blue mr-3 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-peak-text-secondary text-[10px] uppercase tracking-widest mb-0.5">Destination</p>
            <input
              type="text"
              value={destination}
              onChange={(e) => { setDestination(e.target.value); setShowSuggestions(true); }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder="Where are you going?"
              className="w-full bg-transparent text-peak-text placeholder:text-peak-text-secondary/50 outline-none text-sm font-medium"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
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
        <div className="flex-1 flex items-center px-5 py-4 border-b sm:border-b-0 sm:border-r border-white/10">
          <Calendar className="h-4 w-4 text-peak-blue mr-3 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-peak-text-secondary text-[10px] uppercase tracking-widest mb-0.5">When</p>
            <input
              type="text"
              value={when}
              onChange={(e) => setWhen(e.target.value)}
              placeholder="Add dates"
              className="w-full bg-transparent text-peak-text placeholder:text-peak-text-secondary/50 outline-none text-sm font-medium"
            />
          </div>
        </div>

        {/* Who */}
        <div className="flex-1 flex items-center px-5 py-4">
          <Users className="h-4 w-4 text-peak-blue mr-3 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-peak-text-secondary text-[10px] uppercase tracking-widest mb-0.5">Who</p>
            <input
              type="text"
              value={who}
              onChange={(e) => setWho(e.target.value)}
              placeholder="Add guests"
              className="w-full bg-transparent text-peak-text placeholder:text-peak-text-secondary/50 outline-none text-sm font-medium"
            />
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
                  ? "bg-peak-blue/20 border-peak-blue/50 text-peak-blue"
                  : "bg-white/5 border-white/10 text-peak-text-secondary hover:border-white/25 hover:text-peak-text"
              }`}
            >
              {isSelected
                ? <Check className="h-3 w-3" />
                : <Plus className="h-3 w-3" />
              }
              {addon.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}