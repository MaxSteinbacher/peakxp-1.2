import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Calendar, Users, Snowflake } from "lucide-react";
import { resorts } from "../lib/data";

const tabs = [
  { key: "where", label: "Where", icon: MapPin, placeholder: "Search resorts..." },
  { key: "when", label: "When", icon: Calendar, placeholder: "Select dates" },
  { key: "who", label: "Who", icon: Users, placeholder: "2 adults" },
  { key: "activity", label: "Activity", icon: Snowflake, placeholder: "Skiing" },
];

export default function SearchBar() {
  const [activeTab, setActiveTab] = useState("where");
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const suggestions = query.length > 0
    ? resorts.filter(r => r.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  const handleSearch = () => {
    navigate("/search" + (query ? `?q=${encodeURIComponent(query)}` : ""));
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Tabs */}
      <div className="flex gap-1 mb-3">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === tab.key
                ? "bg-white/10 text-peak-text"
                : "text-peak-text-secondary hover:text-peak-text hover:bg-white/5"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Search input bar */}
      <div className="relative flex items-center bg-peak-card border border-white/10 rounded-xl overflow-hidden">
        <div className="flex-1 flex items-center px-5 py-4">
          <Search className="h-5 w-5 text-peak-text-secondary mr-3 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder={tabs.find(t => t.key === activeTab)?.placeholder}
            className="w-full bg-transparent text-peak-text placeholder:text-peak-text-secondary outline-none text-base"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <button
          onClick={handleSearch}
          className="m-2 px-6 py-3 bg-peak-red hover:bg-peak-red-hover text-white font-display font-bold text-sm tracking-wide rounded-lg transition-colors flex-shrink-0"
        >
          Search resorts
        </button>
      </div>

      {/* Autocomplete suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-20 mt-2 w-full max-w-4xl bg-peak-card border border-white/10 rounded-xl overflow-hidden shadow-2xl">
          {suggestions.map((resort) => (
            <button
              key={resort.id}
              onMouseDown={() => {
                setQuery(resort.name);
                setShowSuggestions(false);
                navigate(`/resort/${resort.id}`);
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
  );
}