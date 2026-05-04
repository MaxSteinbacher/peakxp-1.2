import { useState, useMemo } from "react";
import { Train, ArrowUpDown, SlidersHorizontal, Leaf } from "lucide-react";
import BookingShell from "./shared/BookingShell";
import ResultCard from "./shared/ResultCard";
import CheckoutFlow from "./shared/CheckoutFlow";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

const STEPS = ["Origin", "Search", "Results", "Checkout"];
const SORT_OPTIONS = ["Cheapest", "Fastest", "Earliest departure", "Latest departure"];

const MOCK_TRAINS = [
  { id: "tr1", operator: "Eurostar + TGV", from: "London St Pancras", to: "Bourg-Saint-Maurice", dep: "07:01", arr: "18:30", duration: "11h 29m", changes: "1 change at Paris Gare de Lyon", class: "Standard", price: 149, amenities: ["WiFi", "Restaurant car", "Ski storage"], refundable: true, status: "Available", image: "https://picsum.photos/seed/train1/600/400" },
  { id: "tr2", operator: "TGV Lyria", from: "Paris Gare de Lyon", to: "Chambéry", dep: "09:40", arr: "12:10", duration: "2h 30m", changes: "Direct", class: "1st class", price: 89, amenities: ["WiFi", "Power socket", "Ski storage"], refundable: false, status: "Few seats", image: "https://picsum.photos/seed/train2/600/400" },
  { id: "tr3", operator: "SBB", from: "Zurich HB", to: "Zermatt", dep: "08:00", arr: "11:02", duration: "3h 02m", changes: "1 change at Visp", class: "2nd class", price: 62, amenities: ["WiFi", "Bike space"], refundable: true, status: "Available", image: "https://picsum.photos/seed/train3/600/400" },
  { id: "tr4", operator: "ÖBB Nightjet", from: "Amsterdam CS", to: "Innsbruck", dep: "22:55", arr: "09:40", duration: "10h 45m", changes: "Direct (overnight)", class: "Sleeper", price: 119, amenities: ["Restaurant car", "Power socket", "Ski storage"], refundable: false, status: "Available", image: "https://picsum.photos/seed/train4/600/400" },
];

const ADDONS_TRAIN = [
  { key: "seat_res", label: "Seat reservation", price: 5 },
  { key: "luggage", label: "Luggage delivery to hotel", price: 25 },
  { key: "insurance", label: "Travel insurance", price: 12 },
];

const TRUST = [
  { icon: "ShieldCheck", label: "Instant e-ticket" },
  { icon: "RefreshCw", label: "Easy rebooking up to 1h before" },
  { icon: "Lock", label: "SSL secured" },
  { icon: "ShieldCheck", label: "Skip the station queue" },
];

export default function TrainTab() {
  const [step, setStep] = useState(0);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [tripType, setTripType] = useState("Return");
  const [searchForm, setSearchForm] = useState({ from: "", to: "", depDate: "", depTime: "Morning", retDate: "", retTime: "Morning", adults: 1, youth: 0, children: 0, infants: 0, railcard: "None" });
  const [filtersDirect, setFiltersDirect] = useState(false);
  const [filtersSki, setFiltersSki] = useState(false);
  const [filtersBike, setFiltersBike] = useState(false);
  const [filtersAccessible, setFiltersAccessible] = useState(false);
  const [sortBy, setSortBy] = useState("Cheapest");
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [addons, setAddons] = useState([]);

  const sf = (field, val) => setSearchForm(f => ({ ...f, [field]: val }));
  const totalPax = searchForm.adults + searchForm.youth + searchForm.children;

  const filtered = useMemo(() => {
    let res = [...MOCK_TRAINS];
    if (filtersDirect) res = res.filter(t => t.changes === "Direct" || t.changes.startsWith("Direct"));
    if (filtersSki) res = res.filter(t => t.amenities.includes("Ski storage"));
    res = res.filter(t => t.price >= priceRange[0] && t.price <= priceRange[1]);
    if (sortBy === "Cheapest") res.sort((a, b) => a.price - b.price);
    else if (sortBy === "Fastest") res.sort((a, b) => a.duration.localeCompare(b.duration));
    return res;
  }, [filtersDirect, filtersSki, priceRange, sortBy]);

  const addonsTotal = addons.reduce((sum, k) => sum + (ADDONS_TRAIN.find(a => a.key === k)?.price || 0), 0);
  const totalPrice = selectedTrain ? (selectedTrain.price * totalPax) + addonsTotal : 0;

  const suggestions = origin && destination ? [
    { label: "Nearest station to you", value: "London St Pancras — Eurostar connection" },
    { label: "Nearest station to resort", value: "Bourg-Saint-Maurice — direct TGV from Paris" },
    { label: "Transfer tip", value: "Ski train runs Fridays Dec–Apr direct to resort" },
    { label: "Journey time estimate", value: "~7h London → Bourg-Saint-Maurice via Paris" },
  ] : null;

  function goBack() { if (step > 0) setStep(s => s - 1); }

  return (
    <BookingShell steps={STEPS} current={step} onBack={goBack}>

      {/* STEP 0 */}
      {step === 0 && (
        <div className="max-w-2xl">
          <div className="bg-peak-card border border-white/5 rounded-xl p-6 mb-6">
            <h2 className="font-display font-bold text-2xl text-peak-text mb-1">The Alps by rail — often the most scenic and relaxing way to arrive.</h2>
            <p className="text-peak-text-secondary text-sm mb-6">Enter your home city and ski destination — we'll find the nearest train stations.</p>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-peak-text-secondary mb-1">Departing from</label>
                <input value={origin} onChange={e => setOrigin(e.target.value)} placeholder="City or address"
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
                <button onClick={() => setOrigin("My location")} className="mt-1.5 text-xs text-peak-blue hover:underline">Use my location</button>
              </div>
              <div>
                <label className="block text-xs text-peak-text-secondary mb-1">Skiing at</label>
                <input value={destination} onChange={e => setDestination(e.target.value)} placeholder="Resort or region"
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
              </div>
            </div>
          </div>

          {suggestions && (
            <div className="bg-peak-card border border-white/5 rounded-xl p-5 mb-6 space-y-3">
              {suggestions.map(s => (
                <div key={s.label} className="flex items-start gap-3">
                  <div>
                    <p className="text-xs text-peak-text-secondary">{s.label}</p>
                    <p className="text-peak-text text-sm">{s.value}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mb-6">
            <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-2">Trip type</p>
            <div className="flex gap-2">
              {["Return", "Single", "Open return"].map(t => (
                <button key={t} onClick={() => setTripType(t)}
                  className={`px-4 py-2 text-sm font-medium rounded-xl border transition-colors ${tripType === t ? "bg-peak-blue/20 border-peak-blue/50 text-peak-blue" : "border-white/10 text-peak-text-secondary hover:text-peak-text"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => setStep(1)} disabled={!origin || !destination}
            className="px-8 py-3 bg-peak-red hover:bg-peak-red-hover disabled:opacity-40 text-white font-display font-bold text-sm rounded-xl transition-colors">
            Continue to search
          </button>
        </div>
      )}

      {/* STEP 1 */}
      {step === 1 && (
        <div className="max-w-2xl">
          <h2 className="font-display font-bold text-2xl text-peak-text mb-6">Search trains</h2>
          <div className="bg-peak-card border border-white/5 rounded-xl p-6 space-y-4 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-peak-text-secondary mb-1">From station</label>
                <input value={searchForm.from || origin} onChange={e => sf("from", e.target.value)} placeholder="Departure station"
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
              </div>
              <div>
                <label className="block text-xs text-peak-text-secondary mb-1">To station</label>
                <input value={searchForm.to || destination} onChange={e => sf("to", e.target.value)} placeholder="Arrival station"
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-peak-text-secondary mb-1">Outbound date</label>
                <input type="date" value={searchForm.depDate} onChange={e => sf("depDate", e.target.value)}
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
                <select value={searchForm.depTime} onChange={e => sf("depTime", e.target.value)}
                  className="mt-2 w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue">
                  {["Morning 05:00–12:00", "Afternoon 12:00–18:00", "Evening 18:00–24:00"].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              {tripType === "Return" && (
                <div>
                  <label className="block text-xs text-peak-text-secondary mb-1">Return date</label>
                  <input type="date" value={searchForm.retDate} onChange={e => sf("retDate", e.target.value)}
                    className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
                  <select value={searchForm.retTime} onChange={e => sf("retTime", e.target.value)}
                    className="mt-2 w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue">
                    {["Morning 05:00–12:00", "Afternoon 12:00–18:00", "Evening 18:00–24:00"].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-peak-text-secondary mb-1">Passengers</label>
                <div className="bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 space-y-2">
                  {[{ label: "Adults", key: "adults", min: 1 }, { label: "Youth (12–25)", key: "youth", min: 0 }, { label: "Children (4–11)", key: "children", min: 0 }, { label: "Infants (0–3)", key: "infants", min: 0 }].map(({ label, key, min }) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-xs text-peak-text-secondary">{label}</span>
                      <div className="flex items-center gap-2">
                        <button onClick={() => sf(key, Math.max(min, (searchForm[key] || 0) - 1))} className="w-6 h-6 rounded border border-white/10 text-peak-text-secondary text-sm flex items-center justify-center">−</button>
                        <span className="text-peak-text text-sm w-4 text-center">{searchForm[key] || 0}</span>
                        <button onClick={() => sf(key, (searchForm[key] || 0) + 1)} className="w-6 h-6 rounded border border-white/10 text-peak-text-secondary text-sm flex items-center justify-center">+</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs text-peak-text-secondary mb-1">Railcard / discount</label>
                <select value={searchForm.railcard} onChange={e => sf("railcard", e.target.value)}
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue">
                  {["None", "Senior railcard", "Youth (BahnCard 25/50)", "Family", "Group", "Interrail pass"].map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-2 border-t border-white/5">
              {[{ state: filtersDirect, set: setFiltersDirect, label: "Direct trains only" }, { state: filtersBike, set: setFiltersBike, label: "Trains with bike space" }, { state: filtersSki, set: setFiltersSki, label: "Ski/snowboard storage" }, { state: filtersAccessible, set: setFiltersAccessible, label: "Accessible (wheelchair)" }].map(({ state, set, label }) => (
                <label key={label} className="flex items-center gap-2 cursor-pointer">
                  <Checkbox checked={state} onCheckedChange={set} className="border-peak-text-secondary data-[state=checked]:bg-peak-blue data-[state=checked]:border-peak-blue" />
                  <span className="text-xs text-peak-text-secondary">{label}</span>
                </label>
              ))}
            </div>
          </div>
          <button onClick={() => setStep(2)} className="w-full py-3 bg-peak-red hover:bg-peak-red-hover text-white font-display font-bold text-sm rounded-xl transition-colors">
            Search trains
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div>
          <div className="flex items-center gap-2 mb-4 bg-peak-blue/10 border border-peak-blue/20 rounded-xl px-4 py-2.5">
            <Leaf className="h-4 w-4 text-peak-blue flex-shrink-0" />
            <p className="text-xs text-peak-blue">~90% lower CO₂ than flying — great choice for the planet.</p>
          </div>
          <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
            <div className="flex gap-2 overflow-x-auto hide-scrollbar">
              {SORT_OPTIONS.map(opt => (
                <button key={opt} onClick={() => setSortBy(opt)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border whitespace-nowrap transition-colors ${sortBy === opt ? "bg-peak-blue/20 border-peak-blue/40 text-peak-blue" : "border-white/10 text-peak-text-secondary hover:text-peak-text"}`}>
                  <ArrowUpDown className="h-3 w-3" />{opt}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-8">
            <div className="hidden lg:block w-56 flex-shrink-0 space-y-5">
              <div>
                <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-2">Price: €{priceRange[0]}–€{priceRange[1]}</p>
                <Slider value={priceRange} onValueChange={setPriceRange} min={0} max={300} step={10}
                  className="[&_[role=slider]]:bg-peak-blue [&_[role=slider]]:border-peak-blue [&_.bg-primary]:bg-peak-blue" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox checked={filtersDirect} onCheckedChange={setFiltersDirect} className="border-peak-text-secondary data-[state=checked]:bg-peak-blue data-[state=checked]:border-peak-blue" />
                <span className="text-sm text-peak-text-secondary">Direct only</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox checked={filtersSki} onCheckedChange={setFiltersSki} className="border-peak-text-secondary data-[state=checked]:bg-peak-blue data-[state=checked]:border-peak-blue" />
                <span className="text-sm text-peak-text-secondary">Ski storage</span>
              </label>
            </div>
            <div className="flex-1">
              <p className="text-peak-text-secondary text-sm mb-4">{filtered.length} trains found</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filtered.map(train => (
                  <ResultCard
                    key={train.id}
                    image={train.image}
                    title={train.operator}
                    meta={[
                      `${train.dep} → ${train.arr}  ·  ${train.duration}  ·  ${train.changes}`,
                      `${train.from} → ${train.to}`,
                      `${train.class}  ·  ${train.refundable ? "Refundable" : "Non-refundable"}`,
                      `Amenities: ${train.amenities.join(" · ")}`,
                    ]}
                    price={"€" + train.price}
                    priceLabel="/ person"
                    priceSubline={"€" + (train.price * totalPax) + " total"}
                    status={train.status}
                    selected={selectedTrain?.id === train.id}
                    onSelect={() => setSelectedTrain(train)}
                    cta="Select train"
                    expandContent={
                      <div className="text-xs text-peak-text-secondary space-y-1">
                        <p>Class: {train.class}</p>
                        <p>Operator: {train.operator}</p>
                        <p>Amenities: {train.amenities.join(", ")}</p>
                        <p>Cancellation: {train.refundable ? "Refundable" : "Non-refundable"}</p>
                      </div>
                    }
                  />
                ))}
              </div>
            </div>
          </div>
          <button onClick={() => setStep(3)} disabled={!selectedTrain}
            className="mt-8 px-8 py-3 bg-peak-red hover:bg-peak-red-hover disabled:opacity-40 text-white font-display font-bold text-sm rounded-xl transition-colors">
            Continue to checkout
          </button>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div>
          <div className="mb-6">
            <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-3">Optional add-ons</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {ADDONS_TRAIN.map(a => (
                <button key={a.key} onClick={() => setAddons(prev => prev.includes(a.key) ? prev.filter(k => k !== a.key) : [...prev, a.key])}
                  className={`flex items-center justify-between p-3 rounded-xl border text-left transition-colors ${addons.includes(a.key) ? "border-peak-blue/50 bg-peak-blue/10" : "border-white/10 bg-peak-card"}`}>
                  <span className={`text-sm ${addons.includes(a.key) ? "text-peak-text" : "text-peak-text-secondary"}`}>{a.label}</span>
                  <span className="text-xs text-peak-blue font-medium">+€{a.price}</span>
                </button>
              ))}
            </div>
          </div>
          <CheckoutFlow
            totalPrice={totalPrice}
            summary={[
              { label: "Route", value: `${selectedTrain?.from} → ${selectedTrain?.to}` },
              { label: "Operator", value: selectedTrain?.operator },
              { label: "Class", value: selectedTrain?.class },
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
          />
        </div>
      )}
    </BookingShell>
  );
}