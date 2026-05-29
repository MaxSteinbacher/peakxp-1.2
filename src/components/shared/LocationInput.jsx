import { useState, useEffect, useRef } from "react";
import { Plane, Train, MapPin, Package, LocateFixed, CheckCircle } from "lucide-react";
import { searchDestinations, searchIndex } from "../../lib/searchIndex";

// ── Data ──────────────────────────────────────────────────────────────────────

const AIRPORTS = [
  { code: "BCN", name: "El Prat", city: "Barcelona", country: "Spain", countryCode: "ES" },
  { code: "LHR", name: "Heathrow", city: "London", country: "United Kingdom", countryCode: "GB" },
  { code: "LGW", name: "Gatwick", city: "London", country: "United Kingdom", countryCode: "GB" },
  { code: "STN", name: "Stansted", city: "London", country: "United Kingdom", countryCode: "GB" },
  { code: "CDG", name: "Charles de Gaulle", city: "Paris", country: "France", countryCode: "FR" },
  { code: "ORY", name: "Orly", city: "Paris", country: "France", countryCode: "FR" },
  { code: "AMS", name: "Schiphol", city: "Amsterdam", country: "Netherlands", countryCode: "NL" },
  { code: "BRU", name: "Zaventem", city: "Brussels", country: "Belgium", countryCode: "BE" },
  { code: "FRA", name: "Frankfurt Airport", city: "Frankfurt", country: "Germany", countryCode: "DE" },
  { code: "MUC", name: "Franz Josef Strauss", city: "Munich", country: "Germany", countryCode: "DE", nearestResort: "Kitzbühel · 1h30 to Austrian Alps", transferTime: "1h30" },
  { code: "DUS", name: "Düsseldorf Airport", city: "Düsseldorf", country: "Germany", countryCode: "DE" },
  { code: "HAM", name: "Hamburg Airport", city: "Hamburg", country: "Germany", countryCode: "DE" },
  { code: "BER", name: "Brandenburg", city: "Berlin", country: "Germany", countryCode: "DE" },
  { code: "ZRH", name: "Zurich Airport", city: "Zurich", country: "Switzerland", countryCode: "CH", nearestResort: "St Moritz · Davos · Andermatt", transferTime: "~2h" },
  { code: "GVA", name: "Geneva Airport", city: "Geneva", country: "Switzerland", countryCode: "CH", nearestResort: "Chamonix · Verbier · Les Gets", transferTime: "~1h15" },
  { code: "BSL", name: "Basel Mulhouse", city: "Basel", country: "Switzerland", countryCode: "CH" },
  { code: "VIE", name: "Vienna International", city: "Vienna", country: "Austria", countryCode: "AT" },
  { code: "SZG", name: "Salzburg Airport", city: "Salzburg", country: "Austria", countryCode: "AT", nearestResort: "Schladming · Zell am See · Kitzbühel", transferTime: "~1h30" },
  { code: "INN", name: "Innsbruck Airport", city: "Innsbruck", country: "Austria", countryCode: "AT", nearestResort: "Kitzbühel · Sölden · Ischgl", transferTime: "~1h" },
  { code: "GRZ", name: "Graz Airport", city: "Graz", country: "Austria", countryCode: "AT" },
  { code: "LYS", name: "Saint-Exupéry", city: "Lyon", country: "France", countryCode: "FR", nearestResort: "Chamonix · Les Arcs · Val d'Isère", transferTime: "~2h" },
  { code: "NCE", name: "Côte d'Azur", city: "Nice", country: "France", countryCode: "FR" },
  { code: "TRN", name: "Caselle", city: "Turin", country: "Italy", countryCode: "IT", nearestResort: "Sestriere · Via Lattea · Bardonecchia", transferTime: "~1h" },
  { code: "MXP", name: "Malpensa", city: "Milan", country: "Italy", countryCode: "IT" },
  { code: "LIN", name: "Linate", city: "Milan", country: "Italy", countryCode: "IT" },
  { code: "FCO", name: "Fiumicino", city: "Rome", country: "Italy", countryCode: "IT" },
  { code: "VCE", name: "Marco Polo", city: "Venice", country: "Italy", countryCode: "IT", nearestResort: "Cortina · Dolomites", transferTime: "~1h30" },
  { code: "MAD", name: "Adolfo Suárez Barajas", city: "Madrid", country: "Spain", countryCode: "ES" },
  { code: "OSL", name: "Gardermoen", city: "Oslo", country: "Norway", countryCode: "NO" },
  { code: "ARN", name: "Arlanda", city: "Stockholm", country: "Sweden", countryCode: "SE" },
  { code: "CPH", name: "Kastrup", city: "Copenhagen", country: "Denmark", countryCode: "DK" },
  { code: "HEL", name: "Helsinki-Vantaa", city: "Helsinki", country: "Finland", countryCode: "FI" },
  { code: "DUB", name: "Dublin Airport", city: "Dublin", country: "Ireland", countryCode: "IE" },
  { code: "WAW", name: "Chopin", city: "Warsaw", country: "Poland", countryCode: "PL" },
  { code: "PRG", name: "Václav Havel", city: "Prague", country: "Czech Republic", countryCode: "CZ" },
  { code: "BUD", name: "Liszt Ferenc", city: "Budapest", country: "Hungary", countryCode: "HU" },
];

const TRAIN_STATIONS = [
  { code: "LDN-STP", name: "St Pancras International", city: "London", country: "United Kingdom", countryCode: "GB", nearestResort: "Eurostar connections", transferTime: null },
  { code: "PAR-LYN", name: "Gare de Lyon", city: "Paris", country: "France", countryCode: "FR", nearestResort: null, transferTime: null },
  { code: "PAR-MON", name: "Montparnasse", city: "Paris", country: "France", countryCode: "FR", nearestResort: null, transferTime: null },
  { code: "AMS-CEN", name: "Amsterdam Centraal", city: "Amsterdam", country: "Netherlands", countryCode: "NL", nearestResort: null, transferTime: null },
  { code: "BRU-MID", name: "Midi/Zuid", city: "Brussels", country: "Belgium", countryCode: "BE", nearestResort: null, transferTime: null },
  { code: "FRA-HBF", name: "Hauptbahnhof", city: "Frankfurt", country: "Germany", countryCode: "DE", nearestResort: null, transferTime: null },
  { code: "MUC-HBF", name: "Hauptbahnhof", city: "Munich", country: "Germany", countryCode: "DE", nearestResort: "Kitzbühel", transferTime: "1h30" },
  { code: "ZRH-HBF", name: "Hauptbahnhof", city: "Zurich", country: "Switzerland", countryCode: "CH", nearestResort: "St Moritz", transferTime: "3h" },
  { code: "GVA-COR", name: "Cornavin", city: "Geneva", country: "Switzerland", countryCode: "CH", nearestResort: "Verbier", transferTime: "1h15" },
  { code: "BRN-HBF", name: "Bern Hauptbahnhof", city: "Bern", country: "Switzerland", countryCode: "CH", nearestResort: "Grindelwald", transferTime: "1h" },
  { code: "INN-HBF", name: "Hauptbahnhof", city: "Innsbruck", country: "Austria", countryCode: "AT", nearestResort: "Kitzbühel", transferTime: "1h" },
  { code: "SZG-HBF", name: "Hauptbahnhof", city: "Salzburg", country: "Austria", countryCode: "AT", nearestResort: "Schladming", transferTime: "1h" },
  { code: "VIE-HBF", name: "Wien Hauptbahnhof", city: "Vienna", country: "Austria", countryCode: "AT", nearestResort: null, transferTime: null },
  { code: "BRIG", name: "Brig", city: "Brig", country: "Switzerland", countryCode: "CH", nearestResort: "Zermatt", transferTime: "30min" },
  { code: "VISP", name: "Visp", city: "Visp", country: "Switzerland", countryCode: "CH", nearestResort: "Zermatt", transferTime: "40min" },
  { code: "MART", name: "Martigny", city: "Martigny", country: "Switzerland", countryCode: "CH", nearestResort: "Verbier", transferTime: "45min" },
  { code: "SION", name: "Sion", city: "Sion", country: "Switzerland", countryCode: "CH", nearestResort: "Crans-Montana", transferTime: "30min" },
  { code: "LAND", name: "Landeck-Zams", city: "Landeck", country: "Austria", countryCode: "AT", nearestResort: "Serfaus", transferTime: "20min" },
  { code: "STAN", name: "St Anton am Arlberg", city: "St Anton am Arlberg", country: "Austria", countryCode: "AT", nearestResort: "St Anton am Arlberg", transferTime: "at resort" },
  { code: "KITZ", name: "Kitzbühel", city: "Kitzbühel", country: "Austria", countryCode: "AT", nearestResort: "Kitzbühel", transferTime: "at resort" },
  { code: "SCHL", name: "Schladming", city: "Schladming", country: "Austria", countryCode: "AT", nearestResort: "Schladming", transferTime: "at resort" },
  { code: "ZAM", name: "Zell am See", city: "Zell am See", country: "Austria", countryCode: "AT", nearestResort: "Kaprun", transferTime: "10min" },
  { code: "JEN", name: "Jenbach", city: "Jenbach", country: "Austria", countryCode: "AT", nearestResort: "Mayrhofen", transferTime: "30min" },
  { code: "MOUT", name: "Moûtiers", city: "Moûtiers", country: "France", countryCode: "FR", nearestResort: "Courchevel · Méribel · Val Thorens", transferTime: "25min" },
  { code: "BSM", name: "Bourg-Saint-Maurice", city: "Bourg-Saint-Maurice", country: "France", countryCode: "FR", nearestResort: "Les Arcs · La Plagne · Val d'Isère", transferTime: "15min" },
  { code: "ALP", name: "Aime La Plagne", city: "Aime", country: "France", countryCode: "FR", nearestResort: "La Plagne", transferTime: "10min" },
  { code: "MOD", name: "Modane", city: "Modane", country: "France", countryCode: "FR", nearestResort: "Val Thorens", transferTime: null },
  { code: "OULX", name: "Oulx-Cesana-Claviere-Sestriere", city: "Oulx", country: "Italy", countryCode: "IT", nearestResort: "Sestriere · Sauze d'Oulx", transferTime: "20min" },
  { code: "BRIA", name: "Briançon", city: "Briançon", country: "France", countryCode: "FR", nearestResort: "Serre Chevalier", transferTime: "5min" },
  { code: "BOLZ", name: "Bolzano", city: "Bolzano", country: "Italy", countryCode: "IT", nearestResort: "Alto Adige resorts", transferTime: "30min" },
  { code: "LIEN", name: "Lienz", city: "Lienz", country: "Austria", countryCode: "AT", nearestResort: "East Tyrol resorts", transferTime: null },
];

const CITIES = [
  { name: "Barcelona", countryCode: "ES", country: "Spain" },
  { name: "London", countryCode: "GB", country: "United Kingdom" },
  { name: "Paris", countryCode: "FR", country: "France" },
  { name: "Amsterdam", countryCode: "NL", country: "Netherlands" },
  { name: "Brussels", countryCode: "BE", country: "Belgium" },
  { name: "Frankfurt", countryCode: "DE", country: "Germany" },
  { name: "Munich", countryCode: "DE", country: "Germany" },
  { name: "Düsseldorf", countryCode: "DE", country: "Germany" },
  { name: "Hamburg", countryCode: "DE", country: "Germany" },
  { name: "Berlin", countryCode: "DE", country: "Germany" },
  { name: "Zurich", countryCode: "CH", country: "Switzerland" },
  { name: "Geneva", countryCode: "CH", country: "Switzerland" },
  { name: "Basel", countryCode: "CH", country: "Switzerland" },
  { name: "Bern", countryCode: "CH", country: "Switzerland" },
  { name: "Vienna", countryCode: "AT", country: "Austria" },
  { name: "Salzburg", countryCode: "AT", country: "Austria" },
  { name: "Innsbruck", countryCode: "AT", country: "Austria" },
  { name: "Graz", countryCode: "AT", country: "Austria" },
  { name: "Kitzbühel", countryCode: "AT", country: "Austria" },
  { name: "Zell am See", countryCode: "AT", country: "Austria" },
  { name: "Schladming", countryCode: "AT", country: "Austria" },
  { name: "Lyon", countryCode: "FR", country: "France" },
  { name: "Nice", countryCode: "FR", country: "France" },
  { name: "Chamonix", countryCode: "FR", country: "France" },
  { name: "Morzine", countryCode: "FR", country: "France" },
  { name: "Les Gets", countryCode: "FR", country: "France" },
  { name: "Val d'Isère", countryCode: "FR", country: "France" },
  { name: "Tignes", countryCode: "FR", country: "France" },
  { name: "Courchevel", countryCode: "FR", country: "France" },
  { name: "Turin", countryCode: "IT", country: "Italy" },
  { name: "Milan", countryCode: "IT", country: "Italy" },
  { name: "Rome", countryCode: "IT", country: "Italy" },
  { name: "Venice", countryCode: "IT", country: "Italy" },
  { name: "Bolzano", countryCode: "IT", country: "Italy" },
  { name: "Bormio", countryCode: "IT", country: "Italy" },
  { name: "Cortina", countryCode: "IT", country: "Italy" },
  { name: "Madrid", countryCode: "ES", country: "Spain" },
  { name: "Oslo", countryCode: "NO", country: "Norway" },
  { name: "Stockholm", countryCode: "SE", country: "Sweden" },
  { name: "Copenhagen", countryCode: "DK", country: "Denmark" },
  { name: "Helsinki", countryCode: "FI", country: "Finland" },
  { name: "Dublin", countryCode: "IE", country: "Ireland" },
  { name: "Warsaw", countryCode: "PL", country: "Poland" },
  { name: "Prague", countryCode: "CZ", country: "Czech Republic" },
  { name: "Budapest", countryCode: "HU", country: "Hungary" },
  { name: "Verbier", countryCode: "CH", country: "Switzerland" },
  { name: "Zermatt", countryCode: "CH", country: "Switzerland" },
  { name: "St Moritz", countryCode: "CH", country: "Switzerland" },
  { name: "Davos", countryCode: "CH", country: "Switzerland" },
];

function getFlag(countryCode) {
  if (!countryCode || typeof countryCode !== "string") return "";
  return countryCode.toUpperCase().split("").map(c => String.fromCodePoint(c.charCodeAt(0) + 127397)).join("");
}

function filterSuggestions(query, type) {
  if (!query || query.length < 1) return [];
  const q = query.toLowerCase().trim();
  const results = [];

  if (type === "airport" || type === "general") {
    AIRPORTS.forEach(a => {
      const score = a.code.toLowerCase() === q ? 3
        : a.code.toLowerCase().startsWith(q) ? 2
        : a.city.toLowerCase().startsWith(q) ? 2
        : (a.code.toLowerCase().includes(q) || a.city.toLowerCase().includes(q) || a.name.toLowerCase().includes(q)) ? 1
        : 0;
      if (score > 0) results.push({
        type: "airport", score, code: a.code, name: a.name, city: a.city,
        country: a.country, countryCode: a.countryCode,
        nearestResort: a.nearestResort || null, transferTime: a.transferTime || null,
        label: `${a.code} — ${a.city} ${a.name}`,
        sublabel: a.nearestResort ? `~${a.transferTime} to ${a.nearestResort}` : a.country,
      });
    });
  }

  if (type === "station" || type === "general") {
    TRAIN_STATIONS.forEach(s => {
      const score = (s.city.toLowerCase().startsWith(q) || s.name.toLowerCase().startsWith(q)) ? 2
        : (s.city.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)) ? 1
        : 0;
      if (score > 0) results.push({
        type: "station", score, code: s.code, name: s.name, city: s.city,
        country: s.country, countryCode: s.countryCode,
        nearestResort: s.nearestResort, transferTime: s.transferTime,
        label: `${s.city} ${s.name}`,
        sublabel: s.nearestResort ? `Near ${s.nearestResort}${s.transferTime ? " · " + s.transferTime : ""}` : s.country,
      });
    });
  }

  if (type === "city" || type === "general") {
    const seenCities = new Set();
    CITIES.forEach(c => {
      if (c.name.toLowerCase().startsWith(q) || c.name.toLowerCase().includes(q)) {
        if (!seenCities.has(c.name)) {
          seenCities.add(c.name);
          results.push({ type: "city", score: c.name.toLowerCase().startsWith(q) ? 2 : 1, name: c.name, country: c.country, countryCode: c.countryCode, label: c.name, sublabel: c.country });
        }
      }
    });
  }

  if (type === "resort" || type === "general") {
    const resortResults = searchDestinations(query, searchIndex).filter(r => r.type === "resort").slice(0, 5);
    resortResults.forEach(r => results.push({ type: "resort", score: 2, ...r, label: r.label, sublabel: r.sublabel }));
  }

  if (type === "pickup" || type === "dropoff" || type === "general") {
    CITIES.forEach(c => {
      if (c.name.toLowerCase().includes(q)) {
        results.push({ type: "city", score: c.name.toLowerCase().startsWith(q) ? 1 : 0, name: c.name, country: c.country, countryCode: c.countryCode, label: c.name, sublabel: c.country });
      }
    });
  }

  if (type === "storage") {
    CITIES.forEach(c => {
      if (c.name.toLowerCase().includes(q)) {
        results.push({ type: "city", score: 1, name: c.name, country: c.country, countryCode: c.countryCode, label: c.name, sublabel: `Storage options near ${c.name}` });
      }
    });
  }

  results.sort((a, b) => b.score - a.score);
  const seen = new Set();
  return results.filter(r => { const key = r.label; if (seen.has(key)) return false; seen.add(key); return true; }).slice(0, 8);
}

const GROUP_LABELS = { airport: "Airports", station: "Train stations", city: "Cities", resort: "Resorts" };
const GROUP_ORDER = ["airport", "station", "resort", "city"];

function SuggestionIcon({ type }) {
  if (type === "airport") return <Plane className="h-4 w-4 text-peak-blue flex-shrink-0" />;
  if (type === "station") return <Train className="h-4 w-4 text-peak-blue flex-shrink-0" />;
  if (type === "storage") return <Package className="h-4 w-4 text-peak-blue flex-shrink-0" />;
  return <MapPin className="h-4 w-4 text-peak-blue flex-shrink-0" />;
}

// ── Component ────────────────────────────────────────────────────────────────

export default function LocationInput({
  value, onChange, onSelect, placeholder, type = "general",
  context, prefilledFrom = null, className = ""
}) {
  const [focused, setFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [highlighted, setHighlighted] = useState(-1);
  const [locked, setLocked] = useState(!!prefilledFrom);
  const [locating, setLocating] = useState(false);
  const [locateState, setLocateState] = useState("idle"); // idle | locating | done | error
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (locked) return;
    if (focused && value && value.length >= 1) {
      setSuggestions(filterSuggestions(value, type));
    } else {
      setSuggestions([]);
    }
  }, [value, type, focused, locked]);

  useEffect(() => {
    function handler(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setFocused(false);
        setSuggestions([]);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const showDropdown = focused && !locked && suggestions.length > 0;

  function handleKeyDown(e) {
    if (!showDropdown) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setHighlighted(h => Math.min(h + 1, suggestions.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setHighlighted(h => Math.max(h - 1, 0)); }
    else if (e.key === "Enter" && highlighted >= 0) { e.preventDefault(); selectItem(suggestions[highlighted]); }
    else if (e.key === "Escape") { setFocused(false); setSuggestions([]); }
  }

  function selectItem(s) {
    onChange(s.label);
    onSelect?.(s);
    setSuggestions([]);
    setFocused(false);
    setHighlighted(-1);
  }

  function handleUseLocation() {
    if (!navigator.geolocation) { setLocateState("error"); return; }
    setLocateState("locating");
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude: lat, longitude: lon } }) => {
        try {
          const res = await fetch(`https://api.maptiler.com/geocoding/${lon},${lat}.json?key=lNsV1pOMdNShmVL9tiih`);
          const data = await res.json();
          const city = data.features?.[0]?.context?.find(c => c.id?.startsWith("place"))?.text
            || data.features?.[0]?.place_name?.split(",")[0] || "";
          const cityLower = city.toLowerCase();
          const airport = AIRPORTS.find(a => a.city.toLowerCase().includes(cityLower) || cityLower.includes(a.city.toLowerCase()));
          if (airport) {
            const label = `${airport.code} — ${airport.city} ${airport.name}`;
            onChange(label);
            onSelect?.({ type: "airport", ...airport, label, sublabel: airport.nearestResort || airport.country });
          } else {
            onChange(city || "Unknown");
          }
          setLocateState("done");
          setTimeout(() => setLocateState("idle"), 3000);
        } catch {
          setLocateState("error");
        }
      },
      () => setLocateState("error")
    );
  }

  // Group by type for "general"
  const grouped = {};
  suggestions.forEach(s => {
    if (!grouped[s.type]) grouped[s.type] = [];
    grouped[s.type].push(s);
  });
  const useGroups = type === "general";
  let flatSuggestions = [];
  if (useGroups) {
    GROUP_ORDER.forEach(t => { if (grouped[t]) flatSuggestions.push(...grouped[t]); });
  } else {
    flatSuggestions = suggestions;
  }

  const showLocationChip = context === "departure" || context === "pickup";

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className={`bg-peak-surface border rounded-xl px-4 py-3 flex items-center gap-2 transition-colors ${focused && !locked ? "border-peak-blue/50" : "border-white/10"} ${locked ? "opacity-70" : ""}`}>
        <input
          ref={inputRef}
          value={value}
          onChange={e => { if (!locked) { onChange(e.target.value); } }}
          onFocus={() => setFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          readOnly={locked}
          className="w-full bg-transparent text-peak-text text-sm outline-none placeholder-peak-text-secondary/50 disabled:cursor-not-allowed"
        />
      </div>

      {/* Prefilled chip */}
      {prefilledFrom && locked && (
        <div className="mt-1 flex items-center gap-2">
          <span className="text-peak-blue text-xs bg-peak-blue/10 border border-peak-blue/20 rounded-full px-2.5 py-0.5">Pre-filled: {prefilledFrom}</span>
          <button onClick={() => setLocked(false)} className="text-xs text-peak-text-secondary hover:text-peak-text underline">Change</button>
        </div>
      )}

      {/* Use my location chip */}
      {showLocationChip && !prefilledFrom && (
        <button onClick={handleUseLocation} className={`mt-1 flex items-center gap-1.5 text-xs cursor-pointer transition-colors ${locateState === "done" ? "text-peak-green" : "text-peak-blue hover:text-peak-blue/80"}`}>
          {locateState === "locating" ? <LocateFixed className="h-3 w-3 animate-spin" /> : locateState === "done" ? <CheckCircle className="h-3 w-3" /> : <LocateFixed className="h-3 w-3" />}
          {locateState === "locating" ? "Detecting…" : locateState === "done" ? "Location detected" : locateState === "error" ? "Location unavailable — type your city or airport" : "Use my location"}
        </button>
      )}

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-peak-card border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden max-h-72 overflow-y-auto">
          {useGroups
            ? GROUP_ORDER.filter(t => grouped[t]?.length > 0).map(groupType => (
                <div key={groupType}>
                  <div className="text-peak-text-secondary text-xs font-semibold uppercase tracking-wider px-4 py-2 bg-peak-surface">
                    {GROUP_LABELS[groupType] || groupType}
                  </div>
                  {grouped[groupType].map((s, idx) => {
                    const absIdx = flatSuggestions.indexOf(s);
                    return <SuggestionRow key={idx} s={s} isHighlighted={highlighted === absIdx} onMouseEnter={() => setHighlighted(absIdx)} onClick={() => selectItem(s)} />;
                  })}
                </div>
              ))
            : flatSuggestions.map((s, idx) => (
                <SuggestionRow key={idx} s={s} isHighlighted={highlighted === idx} onMouseEnter={() => setHighlighted(idx)} onClick={() => selectItem(s)} />
              ))
          }
        </div>
      )}
    </div>
  );
}

function SuggestionRow({ s, isHighlighted, onMouseEnter, onClick }) {
  return (
    <button
      onMouseDown={onClick}
      onMouseEnter={onMouseEnter}
      className={`w-full flex items-center gap-3 px-4 py-3 transition-colors text-left ${isHighlighted ? "bg-white/5" : "hover:bg-white/5"}`}
    >
      <SuggestionIcon type={s.type} />
      <div className="flex-1 min-w-0">
        <p className="text-peak-text text-sm font-medium truncate">
          {s.type === "airport"
            ? <><span className="font-bold text-peak-blue mr-1">{s.code}</span>{getFlag(s.countryCode)} {s.city} {s.name}</>
            : s.type === "station"
            ? <>{getFlag(s.countryCode)} {s.city} {s.name}</>
            : <>{getFlag(s.countryCode)} {s.label}</>
          }
        </p>
        {s.sublabel && (
          <p className={`text-xs mt-0.5 truncate ${(s.type === "airport" || s.type === "station") && s.nearestResort ? "text-peak-green" : "text-peak-text-secondary"}`}>
            {s.sublabel}
          </p>
        )}
      </div>
    </button>
  );
}