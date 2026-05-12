import { useState, useMemo, useEffect } from "react";
import { Train, ArrowUpDown, ArrowLeftRight, Leaf, ChevronDown, ChevronUp, MapPin, Wifi, Zap, UtensilsCrossed, Bike, ShoppingBag } from "lucide-react";
import SavePlanButton from "./SavePlanButton";
import BookingShell from "./shared/BookingShell";
import CheckoutFlow from "./shared/CheckoutFlow";
import RangeSlider from "../shared/RangeSlider";
import { Checkbox } from "@/components/ui/checkbox";

const STEPS = ["Search", "Results", "Checkout"];
const SORT_OPTIONS = ["Cheapest", "Fastest", "Earliest", "Latest"];

const CITY_STATION_LOOKUP = {
  barcelona: "Barcelona Sants", london: "London St Pancras", paris: "Paris Gare de Lyon",
  amsterdam: "Amsterdam Centraal", brussels: "Brussels Midi/Zuid", frankfurt: "Frankfurt Hauptbahnhof",
  zurich: "Zurich Hauptbahnhof", munich: "Munich Hauptbahnhof", rome: "Roma Termini",
  milan: "Milan Centrale", madrid: "Madrid Atocha", vienna: "Vienna Hauptbahnhof",
};

const OPERATOR_COLORS = {
  Eurostar: "text-yellow-400", TGV: "text-peak-blue", "TGV Lyria": "text-peak-blue",
  SBB: "text-peak-red", ÖBB: "text-peak-red", DB: "text-peak-red",
  Trenitalia: "text-peak-green", "ÖBB Nightjet": "text-peak-red",
};

const MOCK_TRAINS = [
  { id: "tr1", operator: "Eurostar + TGV", code: "ES", from: "London St Pancras", to: "Bourg-Saint-Maurice", dep: "07:01", arr: "18:30", duration: "11h 29m", changes: "1 change · Paris Gare de Lyon", class: "Standard", price: 149, amenities: ["WiFi", "Restaurant", "Ski storage"], refundable: true, status: "Available", skiBag: true, platform: "9", co2saved: 84 },
  { id: "tr2", operator: "TGV Lyria", code: "TGV", from: "Paris Gare de Lyon", to: "Chambéry", dep: "09:40", arr: "12:10", duration: "2h 30m", changes: "Direct", class: "1st class", price: 89, amenities: ["WiFi", "Power", "Ski storage"], refundable: false, status: "Few seats", skiBag: true, platform: "12", co2saved: 62 },
  { id: "tr3", operator: "SBB", code: "SBB", from: "Zurich HB", to: "Zermatt", dep: "08:00", arr: "11:02", duration: "3h 02m", changes: "1 change · Visp", class: "2nd class", price: 62, amenities: ["WiFi", "Bike space"], refundable: true, status: "Available", skiBag: false, platform: "7", co2saved: 48 },
  { id: "tr4", operator: "ÖBB Nightjet", code: "NJ", from: "Amsterdam CS", to: "Innsbruck", dep: "22:55", arr: "09:40", duration: "10h 45m", changes: "Direct (overnight)", class: "Sleeper", price: 119, amenities: ["Restaurant", "Power", "Ski storage"], refundable: false, status: "Available", skiBag: true, platform: "4", co2saved: 121 },
];

const ADDONS_TRAIN = [
  { key: "ski_bag", label: "Ski bag pre-booking", price: 20, unit: " flat" },
  { key: "luggage", label: "Luggage delivery to hotel", price: 25, unit: " flat" },
  { key: "seat_res", label: "Seat reservation", price: 5, unit: " flat" },
  { key: "insurance", label: "Travel insurance (standard)", price: 12, unit: "/person" },
];

const TRUST = [
  { label: "Instant e-ticket" }, { label: "Easy rebooking up to 1h before" },
  { label: "SSL secured" }, { label: "Skip the station queue" },
];

const TRAIN_ROUTES = {
  "barcelona sants-geneva": { dur: "5h 30m", ops: ["TGV","Renfe"], changes: "1 change · Perpignan" },
  "london st pancras-geneva": { dur: "7h 15m", ops: ["Eurostar","TGV Lyria"], changes: "1 change · Paris" },
  "amsterdam centraal-innsbruck": { dur: "9h 00m", ops: ["ICE","ÖBB"], changes: "1 change · Munich" },
  "paris gare de lyon-geneva": { dur: "3h 10m", ops: ["TGV Lyria","SBB"], changes: "Direct" },
  "zurich hauptbahnhof-innsbruck": { dur: "3h 30m", ops: ["Railjet","ÖBB"], changes: "Direct" },
  "munich hauptbahnhof-salzburg": { dur: "1h 35m", ops: ["Railjet"], changes: "Direct" },
  "munich hauptbahnhof-innsbruck": { dur: "1h 50m", ops: ["Railjet","ÖBB"], changes: "Direct" },
  "paris gare de lyon-chambery": { dur: "2h 30m", ops: ["TGV"], changes: "Direct" },
  "paris gare de lyon-bourg-saint-maurice": { dur: "4h 30m", ops: ["TGV Neige"], changes: "Direct" },
  "amsterdam centraal-geneva": { dur: "7h 45m", ops: ["ICE","TGV Lyria"], changes: "1 change · Basel" },
};

const RAILCARD_FACTORS = { "None": 1.0, "Senior railcard": 0.8, "Youth (BahnCard 25/50)": 0.75, "Family": 0.85, "Group": 0.9, "Interrail pass": 0.3 };

function trainDurToH(dur) {
  const m = dur.match(/(\d+)h\s*(\d+)m/);
  return m ? parseInt(m[1]) + parseInt(m[2]) / 60 : 3;
}

function normStation(s) { return (s || "").toLowerCase().trim(); }

function generateTrainResults(fromStation, toStation, depDate, retDate, pax, railcard) {
  if (!fromStation || !toStation) return [];
  const routeKey = `${normStation(fromStation)}-${normStation(toStation)}`;
  const route = TRAIN_ROUTES[routeKey];
  const hours = route ? trainDurToH(route.dur) : 3 + Math.random() * 5;
  const basePrice = Math.round(40 * hours);
  const rcFactor = RAILCARD_FACTORS[railcard] || 1.0;
  const df = !depDate ? 1.0 : (() => { const m = new Date(depDate).getMonth() + 1; return m === 12 ? 1.4 : (m === 1 || m === 2) ? 0.85 : 1.0; })();
  const operators = route?.ops || ["Railjet","ICE","TGV"];
  const DEP = ["07:01","10:15","13:30","16:45"];
  return DEP.slice(0, Math.min(operators.length + 1, 4)).map((dep, i) => {
    const op = operators[i % operators.length];
    const varF = 0.9 + i * 0.12;
    const price = Math.round(basePrice * rcFactor * df * varF);
    const durH = route ? trainDurToH(route.dur) : hours;
    const arrMins = parseInt(dep.split(":")[0]) * 60 + parseInt(dep.split(":")[1]) + Math.round(durH * 60);
    const arr = `${String(Math.floor(arrMins / 60) % 24).padStart(2,"0")}:${String(arrMins % 60).padStart(2,"0")}`;
    return {
      id: `tr${i}`, operator: op, code: op.slice(0,3).toUpperCase(),
      from: fromStation, to: toStation, dep, arr,
      duration: route?.dur || `${Math.round(hours)}h 00m`,
      changes: route?.changes || `1 change · connection`,
      class: i === 0 ? "1st class" : "2nd class",
      price, refundable: i % 2 === 0, status: i === 1 ? "Few seats" : "Available",
      skiBag: true, platform: String(i + 3), co2saved: Math.round(durH * 15),
      amenities: ["WiFi", i < 2 ? "Restaurant" : "Power", "Ski storage"],
    };
  });
}

export default function TrainTab({ agentServiceDetails = {}, onBook }) {
  const [step, setStep] = useState(0);
  const [tripType, setTripType] = useState("Return");
  const [fromVal, setFromVal] = useState("");
  const [toVal, setToVal] = useState("");
  const [searchForm, setSearchForm] = useState({ depDate: "", depTime: "Morning 05:00–12:00", retDate: "", retTime: "Morning 05:00–12:00", adults: 1, youth: 0, children: 0, infants: 0, railcard: "None" });
  const [filters, setFilters] = useState({ direct: false, ski: false, bike: false, accessible: false });
  const [skiGear, setSkiGear] = useState({ open: false, skiBag: false, bootBag: false, poles: false });
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [sortBy, setSortBy] = useState("Cheapest");
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [expandedTrain, setExpandedTrain] = useState(null);
  const [addons, setAddons] = useState([]);
  const [preFilled, setPreFilled] = useState(false);
  const [trainResults, setTrainResults] = useState([]);

  useEffect(() => {
    const sd = agentServiceDetails?.train;
    if (!sd) return;
    if (sd.departureStation) setFromVal(sd.departureStation);
    if (typeof sd.returnJourney === "boolean") setTripType(sd.returnJourney ? "Return" : "Single");
    setPreFilled(true);
  }, []);

  const sf = (field, val) => setSearchForm(f => ({ ...f, [field]: val }));
  const totalPax = searchForm.adults + searchForm.youth + searchForm.children;

  function useMyLocation() {
    setLocationLoading(true);
    setLocationError("");
    if (!navigator.geolocation) { setLocationError("Geolocation not supported"); setLocationLoading(false); return; }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lon } = pos.coords;
        fetch(`https://api.maptiler.com/geocoding/${lon},${lat}.json?key=lNsV1pOMdNShmVL9tiih`)
          .then(r => r.json())
          .then(data => {
            const city = data.features?.[0]?.context?.find(c => c.id?.startsWith("place"))?.text ||
              data.features?.[0]?.place_name?.split(",")[0] || "";
            const lookup = city.toLowerCase();
            const station = Object.entries(CITY_STATION_LOOKUP).find(([k]) => lookup.includes(k))?.[1];
            setFromVal(station || city || "Unknown");
            setLocationLoading(false);
          })
          .catch(() => { setLocationError("Could not resolve location — enter manually"); setLocationLoading(false); });
      },
      () => { setLocationError("Location access denied — enter your city or station manually"); setLocationLoading(false); }
    );
  }

  function swapFromTo() { const tmp = fromVal; setFromVal(toVal); setToVal(tmp); }

  const filtered = useMemo(() => {
    let res = [...trainResults];
    if (filters.direct) res = res.filter(t => t.changes === "Direct" || t.changes.startsWith("Direct"));
    if (filters.ski) res = res.filter(t => t.amenities.includes("Ski storage"));
    if (filters.bike) res = res.filter(t => t.amenities.includes("Bike space"));
    res = res.filter(t => t.price >= priceRange[0] && t.price <= priceRange[1]);
    if (sortBy === "Cheapest") res.sort((a, b) => a.price - b.price);
    else if (sortBy === "Fastest") res.sort((a, b) => a.duration.localeCompare(b.duration));
    else if (sortBy === "Earliest") res.sort((a, b) => a.dep.localeCompare(b.dep));
    else if (sortBy === "Latest") res.sort((a, b) => b.dep.localeCompare(a.dep));
    return res;
  }, [trainResults, filters, priceRange, sortBy]);

  const addonsTotal = addons.reduce((sum, k) => {
    const a = ADDONS_TRAIN.find(x => x.key === k);
    if (!a) return sum;
    return sum + (a.unit.includes("/person") ? a.price * totalPax : a.price);
  }, 0);
  const totalPrice = selectedTrain ? (selectedTrain.price * totalPax) + addonsTotal : 0;

  const amenityIcon = (a) => {
    if (a === "WiFi") return <Wifi className="h-3 w-3" />;
    if (a === "Power") return <Zap className="h-3 w-3" />;
    if (a === "Restaurant") return <UtensilsCrossed className="h-3 w-3" />;
    if (a === "Bike space") return <Bike className="h-3 w-3" />;
    return null;
  };

  function goBack() { if (step > 0) setStep(s => s - 1); }

  return (
    <BookingShell steps={STEPS} current={step} onBack={goBack}>
      {preFilled && (
        <div className="flex items-center gap-2 bg-peak-blue/10 border border-peak-blue/20 rounded-xl px-4 py-2.5 mb-4">
          <p className="text-peak-blue text-xs font-medium">Pre-filled from your agent conversation — review and adjust if needed</p>
        </div>
      )}

      {/* STEP 0 — Unified search */}
      {step === 0 && (
        <div className="max-w-5xl mx-auto">
          {/* Trip type */}
          <div className="flex gap-2 mb-5">
            {["Return", "Single", "Open return"].map(t => (
              <button key={t} onClick={() => setTripType(t)}
                className={`px-4 py-2 text-sm font-medium rounded-xl border transition-colors ${tripType === t ? "bg-peak-red text-white border-peak-red" : "bg-peak-surface border-white/10 text-peak-text-secondary hover:text-peak-text"}`}>
                {t}
              </button>
            ))}
          </div>

          {/* Main search card */}
          <div className="bg-peak-card border border-white/5 rounded-2xl p-6">
            {/* Row 1 — From / Swap / To */}
            <div className="flex items-start gap-3 mb-5">
              <div className="flex-1">
                <label className="block text-xs text-peak-text-secondary mb-1.5">From</label>
                <div className="bg-peak-surface border border-white/10 rounded-xl px-4 py-3">
                  <input value={fromVal} onChange={e => setFromVal(e.target.value)} placeholder="Departure station or city"
                    className="w-full bg-transparent text-peak-text text-sm outline-none placeholder-peak-text-secondary/50" />
                </div>
                <button onClick={useMyLocation} disabled={locationLoading}
                  className="mt-1.5 flex items-center gap-1 text-xs text-peak-blue hover:underline disabled:opacity-50">
                  <MapPin className="h-3 w-3" />{locationLoading ? "Detecting…" : "Use my location"}
                </button>
                {locationError && <p className="text-peak-red text-xs mt-1">{locationError}</p>}
              </div>

              <button onClick={swapFromTo} className="w-10 h-10 mt-7 rounded-full bg-peak-surface border border-white/10 flex items-center justify-center hover:border-white/25 flex-shrink-0 transition-colors">
                <ArrowLeftRight className="h-4 w-4 text-peak-text-secondary" />
              </button>

              <div className="flex-1">
                <label className="block text-xs text-peak-text-secondary mb-1.5">To</label>
                <div className="bg-peak-surface border border-white/10 rounded-xl px-4 py-3">
                  <input value={toVal} onChange={e => setToVal(e.target.value)} placeholder="Arrival station or resort"
                    className="w-full bg-transparent text-peak-text text-sm outline-none placeholder-peak-text-secondary/50" />
                </div>
              </div>
            </div>

            {/* Row 2 — Dates + times */}
            <div className="border-t border-white/5 pt-5 mb-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-peak-text-secondary mb-1.5">Outbound date</label>
                  <input type="date" value={searchForm.depDate} onChange={e => sf("depDate", e.target.value)}
                    className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-3 text-sm text-peak-text outline-none focus:border-peak-blue" />
                  <select value={searchForm.depTime} onChange={e => sf("depTime", e.target.value)}
                    className="mt-2 w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue">
                    {["Morning 05:00–12:00", "Afternoon 12:00–18:00", "Evening 18:00–00:00"].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                {tripType === "Return" && (
                  <div>
                    <label className="block text-xs text-peak-text-secondary mb-1.5">Return date</label>
                    <input type="date" value={searchForm.retDate} onChange={e => sf("retDate", e.target.value)}
                      className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-3 text-sm text-peak-text outline-none focus:border-peak-blue" />
                    <select value={searchForm.retTime} onChange={e => sf("retTime", e.target.value)}
                      className="mt-2 w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue">
                      {["Morning 05:00–12:00", "Afternoon 12:00–18:00", "Evening 18:00–00:00"].map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Row 3 — Passengers + Railcard */}
            <div className="border-t border-white/5 pt-5 mb-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-peak-text-secondary mb-1.5">Passengers</label>
                  <div className="bg-peak-surface border border-white/10 rounded-xl px-4 py-3 space-y-2">
                    {[{ label: "Adults", key: "adults", min: 1 }, { label: "Youth (12–25)", key: "youth", min: 0 }, { label: "Children (4–11)", key: "children", min: 0 }, { label: "Infants under 4", key: "infants", min: 0 }].map(({ label, key, min }) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-xs text-peak-text-secondary">{label}</span>
                        <div className="flex items-center gap-2">
                          <button onClick={() => sf(key, Math.max(min, (searchForm[key] || 0) - 1))} className="w-6 h-6 rounded border border-white/10 text-peak-text-secondary flex items-center justify-center text-sm">−</button>
                          <span className="text-peak-text text-sm w-4 text-center">{searchForm[key] || 0}</span>
                          <button onClick={() => sf(key, (searchForm[key] || 0) + 1)} className="w-6 h-6 rounded border border-white/10 text-peak-text-secondary flex items-center justify-center text-sm">+</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-peak-text-secondary mb-1.5">Railcard / discount</label>
                  <select value={searchForm.railcard} onChange={e => sf("railcard", e.target.value)}
                    className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-3 text-sm text-peak-text outline-none focus:border-peak-blue">
                    {["None", "Senior railcard", "Youth (BahnCard 25/50)", "Family", "Group", "Interrail pass"].map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Row 4 — Filters */}
            <div className="border-t border-white/5 pt-4 flex flex-wrap gap-4">
              {[{ k: "direct", l: "Direct trains only" }, { k: "ski", l: "Trains with ski storage" }, { k: "bike", l: "Trains with bike space" }, { k: "accessible", l: "Accessible (wheelchair)" }].map(({ k, l }) => (
                <label key={k} className="flex items-center gap-2 cursor-pointer">
                  <Checkbox checked={filters[k]} onCheckedChange={v => setFilters(f => ({ ...f, [k]: v }))}
                    className="border-peak-text-secondary data-[state=checked]:bg-peak-blue data-[state=checked]:border-peak-blue" />
                  <span className="text-xs text-peak-text-secondary">{l}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Ski equipment collapsible */}
          <div className="bg-peak-card border border-white/5 rounded-2xl p-5 mt-4">
            <button onClick={() => setSkiGear(g => ({ ...g, open: !g.open }))}
              className="w-full flex items-center justify-between">
              <span className="text-peak-text text-sm font-medium">Travelling with ski equipment?</span>
              {skiGear.open ? <ChevronUp className="h-4 w-4 text-peak-text-secondary" /> : <ChevronDown className="h-4 w-4 text-peak-text-secondary" />}
            </button>
            {skiGear.open && (
              <div className="mt-4 space-y-3">
                {[{ k: "skiBag", l: "Ski bag (book as oversized luggage on TGV/Eurostar)" }, { k: "bootBag", l: "Ski boot bag" }, { k: "poles", l: "Poles" }].map(({ k, l }) => (
                  <label key={k} className="flex items-center gap-3 cursor-pointer">
                    <Checkbox checked={skiGear[k]} onCheckedChange={v => setSkiGear(g => ({ ...g, [k]: v }))}
                      className="border-peak-text-secondary data-[state=checked]:bg-peak-blue data-[state=checked]:border-peak-blue" />
                    <span className="text-sm text-peak-text-secondary">{l}</span>
                  </label>
                ))}
                <p className="text-peak-text-secondary text-xs mt-2 pt-2 border-t border-white/5">Eurostar and TGV require advance booking for ski bags at extra cost. We will show availability per result.</p>
              </div>
            )}
          </div>

          {/* Green info card */}
          <div className="bg-peak-green/5 border border-peak-green/20 rounded-xl p-3 flex items-center gap-3 mt-4">
            <Leaf className="h-5 w-5 text-peak-green flex-shrink-0" />
            <p className="text-peak-green text-xs">Train travel produces approximately 90% fewer CO₂ emissions than flying on the same route. Where a direct or one-change train connection exists, we recommend it over flying.</p>
          </div>

          <button onClick={() => { setTrainResults(generateTrainResults(fromVal, toVal, searchForm.depDate, searchForm.retDate, totalPax, searchForm.railcard)); setStep(1); }} className="w-full py-4 bg-peak-red hover:bg-peak-red-hover text-white font-bold text-base rounded-xl transition-colors mt-4">
            Search trains
          </button>
        </div>
      )}

      {/* STEP 1 — Results */}
      {step === 1 && (
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-4 bg-peak-green/5 border border-peak-green/20 rounded-xl px-4 py-2.5">
            <Leaf className="h-4 w-4 text-peak-green flex-shrink-0" />
            <p className="text-xs text-peak-green">~90% lower CO₂ than flying — great choice for the planet.</p>
          </div>

          <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
            <div>
              {!fromVal || !toVal ? (
                <span className="text-peak-text-secondary text-sm">Please enter departure and destination stations to search</span>
              ) : (
                <span className="text-peak-text-secondary text-sm">{filtered.length} trains found from {fromVal} to {toVal}</span>
              )}
              <span className="text-peak-text-secondary/60 text-xs ml-2">{fromVal} → {toVal} · {searchForm.depDate || "–"} · {totalPax} pax</span>
            </div>
            <div className="flex gap-2 overflow-x-auto hide-scrollbar">
              {SORT_OPTIONS.map(opt => (
                <button key={opt} onClick={() => setSortBy(opt)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border whitespace-nowrap transition-colors ${sortBy === opt ? "bg-peak-blue/20 border-peak-blue/40 text-peak-blue" : "border-white/10 text-peak-text-secondary hover:text-peak-text"}`}>
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-6">
            {/* Filter sidebar */}
            <div className="hidden lg:block w-56 flex-shrink-0 space-y-5">
              <div>
                <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-2">Price: €{priceRange[0]}–€{priceRange[1]}</p>
                <RangeSlider value={priceRange} onValueChange={setPriceRange} min={0} max={300} step={5} formatLabel={n => '€' + n} />
              </div>
              {[{ k: "direct", l: "Direct only" }, { k: "ski", l: "Ski storage" }, { k: "bike", l: "Bike space" }].map(({ k, l }) => (
                <label key={k} className="flex items-center gap-2 cursor-pointer">
                  <Checkbox checked={filters[k]} onCheckedChange={v => setFilters(f => ({ ...f, [k]: v }))}
                    className="border-peak-text-secondary data-[state=checked]:bg-peak-blue data-[state=checked]:border-peak-blue" />
                  <span className="text-sm text-peak-text-secondary">{l}</span>
                </label>
              ))}
            </div>

            {/* Train list */}
            <div className="flex-1 space-y-3">
              {filtered.map(train => (
                <div key={train.id}>
                  <div className={`bg-peak-card border rounded-2xl p-5 hover:border-white/15 transition-all ${selectedTrain?.id === train.id ? "border-peak-blue/40" : "border-white/5"}`}>
                    <div className="flex items-center gap-4 flex-wrap lg:flex-nowrap">
                      {/* Operator */}
                      <div className="w-28 flex-shrink-0">
                        <div className="w-10 h-10 rounded-lg bg-peak-surface flex items-center justify-center mb-1">
                          <span className={`font-mono font-bold text-xs ${OPERATOR_COLORS[train.operator] || "text-peak-text"}`}>{train.code}</span>
                        </div>
                        <p className="text-peak-text text-xs font-medium leading-tight">{train.operator}</p>
                      </div>

                      {/* Times */}
                      <div className="flex-1 flex items-center gap-3">
                        <div className="text-right">
                          <p className="font-display font-bold text-peak-text text-2xl">{train.dep}</p>
                          <p className="text-peak-text-secondary text-xs leading-tight">{train.from.split(" ").slice(-2).join(" ")}</p>
                        </div>
                        <div className="flex-1 text-center">
                          <div className="flex items-center gap-1 mb-1">
                            <div className="flex-1 h-px bg-white/10" />
                            <Train className="h-3 w-3 text-peak-text-secondary" />
                            <div className="flex-1 h-px bg-white/10" />
                          </div>
                          <p className="text-peak-text-secondary text-xs">{train.duration}</p>
                          <p className={`text-xs font-medium mt-0.5 ${train.changes === "Direct" || train.changes.startsWith("Direct") ? "text-peak-green" : "text-peak-text-secondary"}`}>{train.changes}</p>
                        </div>
                        <div>
                          <p className="font-display font-bold text-peak-text text-2xl">{train.arr}</p>
                          <p className="text-peak-text-secondary text-xs leading-tight">{train.to.split(" ").slice(-2).join(" ")}</p>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="w-44 flex-shrink-0 space-y-1.5 text-xs">
                        <span className="bg-peak-surface border border-white/10 px-2 py-0.5 rounded-full text-peak-text-secondary">{train.class}</span>
                        <p className={train.refundable ? "text-peak-green" : "text-peak-red"}>{train.refundable ? "✓ Refundable" : "✗ Non-refundable"}</p>
                        <p className={train.skiBag ? "text-peak-green" : "text-peak-text-secondary"}>Ski bag: {train.skiBag ? "Available" : "Not available"}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {train.amenities.map(a => (
                            <span key={a} className="flex items-center gap-1 bg-peak-surface rounded px-1.5 py-0.5 text-peak-text-secondary">
                              {amenityIcon(a)}{a}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Price */}
                      <div className="w-32 flex-shrink-0 text-right">
                        <p className="font-display font-bold text-peak-text text-2xl">€{train.price}</p>
                        <p className="text-peak-text-secondary text-xs">/ person</p>
                        <p className="text-peak-text-secondary text-xs">€{train.price * totalPax} total</p>
                        <p className="text-peak-green text-xs mt-0.5">Saves ~{train.co2saved}kg CO₂</p>
                        <button onClick={() => { setSelectedTrain(train); setStep(2); }}
                          className="w-full mt-2 bg-peak-red hover:bg-peak-red-hover text-white text-xs font-semibold rounded-xl py-2.5 transition-colors flex items-center justify-center gap-1">
                          <ShoppingBag className="h-3 w-3" /> Select
                        </button>
                      </div>
                    </div>

                    <button onClick={() => setExpandedTrain(expandedTrain === train.id ? null : train.id)}
                      className="mt-3 text-xs text-peak-text-secondary hover:text-peak-text flex items-center gap-1">
                      {expandedTrain === train.id ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                      Show details
                    </button>

                    {expandedTrain === train.id && (
                      <div className="mt-3 bg-peak-surface rounded-xl p-4 text-xs text-peak-text-secondary space-y-1">
                        <p><span className="text-peak-text font-medium">Platform:</span> {train.platform}</p>
                        <p><span className="text-peak-text font-medium">Class:</span> {train.class}</p>
                        <p><span className="text-peak-text font-medium">Cancellation:</span> {train.refundable ? "Refundable up to departure" : "Non-refundable"}</p>
                        <p><span className="text-peak-text font-medium">Ski bag:</span> {train.skiBag ? "Advance booking required — approx. €15–25" : "Not available on this service"}</p>
                        <p><span className="text-peak-text font-medium">Amenities:</span> {train.amenities.join(", ")}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STEP 2 — Checkout */}
      {step === 2 && selectedTrain && (
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-3">Optional add-ons</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {ADDONS_TRAIN.map(a => (
                <button key={a.key} onClick={() => setAddons(prev => prev.includes(a.key) ? prev.filter(k => k !== a.key) : [...prev, a.key])}
                  className={`flex items-center justify-between p-3 rounded-xl border text-left transition-colors ${addons.includes(a.key) ? "border-peak-blue/50 bg-peak-blue/10" : "border-white/10 bg-peak-card hover:border-white/20"}`}>
                  <span className={`text-sm ${addons.includes(a.key) ? "text-peak-text" : "text-peak-text-secondary"}`}>{a.label}</span>
                  <span className="text-xs text-peak-blue font-medium">+€{a.price}{a.unit}</span>
                </button>
              ))}
            </div>
          </div>
          <CheckoutFlow
            totalPrice={totalPrice}
            planData={{ serviceKey: "train", name: `${selectedTrain.operator} — ${selectedTrain.from} → ${selectedTrain.to}`, destination: { label: selectedTrain.to, type: "general" }, dates: { start: searchForm.depDate || null, end: searchForm.retDate || null }, guests: { adults: totalPax, children: 0, seniors: 0 }, itemDetails: { operator: selectedTrain.operator, class: selectedTrain.class }, estimatedPriceEUR: totalPrice }}
            summary={[
              { label: "Route", value: `${selectedTrain.from} → ${selectedTrain.to}` },
              { label: "Operator", value: selectedTrain.operator },
              { label: "Class", value: selectedTrain.class },
              { label: "Outbound", value: searchForm.depDate || "TBD" },
              ...(tripType === "Return" ? [{ label: "Return", value: searchForm.retDate || "TBD" }] : []),
              { label: "Passengers", value: totalPax },
            ]}
            guestFields={[
              { key: "name", label: "Full name", placeholder: "Jane Smith" },
              { key: "dob", label: "Date of birth", placeholder: "DD/MM/YYYY" },
              { key: "railcard", label: "Railcard type", placeholder: "e.g. Senior / None" },
              { key: "seat", label: "Seat preference", placeholder: "Window / Aisle / No preference" },
              { key: "accessibility", label: "Accessibility needs (optional)", placeholder: "e.g. Wheelchair space required" },
            ]}
            trustBadges={TRUST}
            onComplete={() => {
              onBook?.(`${selectedTrain.operator} — ${selectedTrain.from} → ${selectedTrain.to} · ${totalPax} pax`, totalPrice, {
                operator: selectedTrain.operator, from: selectedTrain.from, to: selectedTrain.to,
                class: selectedTrain.class, departure: searchForm.depDate, returnDate: searchForm.retDate,
              });
            }}
          />
        </div>
      )}
    </BookingShell>
  );
}