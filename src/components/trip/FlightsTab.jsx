import { useState, useMemo } from "react";
import { Plane, Leaf, ArrowUpDown, SlidersHorizontal, Plus, X } from "lucide-react";
import BookingShell from "./shared/BookingShell";
import ResultCard from "./shared/ResultCard";
import CheckoutFlow from "./shared/CheckoutFlow";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

const STEPS = ["Origin", "Search", "Results", "Checkout"];

const SORT_OPTIONS = ["Cheapest", "Fastest", "Best", "Departure time", "Arrival time"];

const MOCK_FLIGHTS = [
  { id: "fl1", airline: "Swiss Air", from: "ZRH", fromCity: "Zurich", to: "GVA", toCity: "Geneva", dep: "06:30", arr: "07:40", duration: "1h 10m", stops: "Direct", cabin: "Economy", price: 89, eco: "Low", refundable: true, image: "https://picsum.photos/seed/flight1/600/400" },
  { id: "fl2", airline: "easyJet", from: "LGW", fromCity: "London", to: "GVA", toCity: "Geneva", dep: "07:00", arr: "09:40", duration: "2h 40m", stops: "Direct", cabin: "Economy", price: 67, eco: "Medium", refundable: false, image: "https://picsum.photos/seed/flight2/600/400" },
  { id: "fl3", airline: "Lufthansa", from: "MUC", fromCity: "Munich", to: "GVA", toCity: "Geneva", dep: "10:15", arr: "14:30", duration: "4h 15m", stops: "1 stop via FRA", cabin: "Business", price: 340, eco: "High", refundable: true, image: "https://picsum.photos/seed/flight3/600/400" },
  { id: "fl4", airline: "Vueling", from: "BCN", fromCity: "Barcelona", to: "ZRH", toCity: "Zurich", dep: "08:50", arr: "10:40", duration: "1h 50m", stops: "Direct", cabin: "Economy", price: 54, eco: "Low", refundable: false, image: "https://picsum.photos/seed/flight4/600/400" },
];

const ecoColors = { Low: "text-peak-green", Medium: "text-yellow-400", High: "text-peak-red" };

const ADDONS = [
  { key: "baggage", label: "Checked baggage (1× 23kg)", price: 35 },
  { key: "priority", label: "Priority boarding", price: 12 },
  { key: "insurance", label: "Travel insurance", price: 18 },
  { key: "seat", label: "Seat selection", price: 15 },
];

const TRUST = [
  { icon: "ShieldCheck", label: "Price-lock guarantee" },
  { icon: "ShieldCheck", label: "Instant e-ticket" },
  { icon: "RefreshCw", label: "Free cancellation within 24h" },
  { icon: "Lock", label: "SSL secured" },
];

export default function FlightsTab() {
  const [step, setStep] = useState(0);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [tripType, setTripType] = useState("Round trip");
  const [searchForm, setSearchForm] = useState({ from: "", to: "", depDate: "", retDate: "", adults: 1, children: 0, infants: 0, cabin: "Economy" });
  const [filters, setFilters] = useState({ directOnly: false, flexible: false, nearbyAirports: false, carbon: false });
  const [sortBy, setSortBy] = useState("Cheapest");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [addons, setAddons] = useState([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const sf = (field, val) => setSearchForm(f => ({ ...f, [field]: val }));

  const totalPax = searchForm.adults + searchForm.children + searchForm.infants;

  const filtered = useMemo(() => {
    let res = [...MOCK_FLIGHTS];
    if (filters.directOnly) res = res.filter(f => f.stops === "Direct");
    res = res.filter(f => f.price >= priceRange[0] && f.price <= priceRange[1]);
    if (sortBy === "Cheapest") res.sort((a, b) => a.price - b.price);
    else if (sortBy === "Fastest") res.sort((a, b) => a.duration.localeCompare(b.duration));
    return res;
  }, [filters, priceRange, sortBy]);

  const addonsTotal = addons.reduce((sum, k) => sum + (ADDONS.find(a => a.key === k)?.price || 0), 0);
  const totalPrice = selectedFlight ? (selectedFlight.price * totalPax) + addonsTotal : 0;

  const suggestions = origin && destination ? [
    { label: `Nearest airport to you`, value: `${origin.slice(0, 3).toUpperCase()} — 2h from resort`, iata: origin.slice(0, 3).toUpperCase() },
    { label: "Nearest airport to resort", value: "GVA — 1h15 transfer", iata: "GVA" },
    { label: "Alternative", value: "LYS — low-cost hub, 1h45 transfer", iata: "LYS" },
  ] : null;

  function goBack() { if (step > 0) setStep(s => s - 1); }

  return (
    <BookingShell steps={STEPS} current={step} onBack={goBack}>

      {/* STEP 0 */}
      {step === 0 && (
        <div className="max-w-2xl">
          <div className="bg-peak-card border border-white/5 rounded-xl p-6 mb-6">
            <h2 className="font-display font-bold text-2xl text-peak-text mb-1">We'll find the best airports for your trip</h2>
            <p className="text-peak-text-secondary text-sm mb-6">Tell us where you're coming from and where you're skiing — we'll match the nearest airports automatically.</p>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-peak-text-secondary mb-1">Where are you flying from?</label>
                <input value={origin} onChange={e => setOrigin(e.target.value)} placeholder="City or country"
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
                <button onClick={() => setOrigin("My current location")} className="mt-1.5 text-xs text-peak-blue hover:underline">Use my current location</button>
              </div>
              <div>
                <label className="block text-xs text-peak-text-secondary mb-1">Which resort or region are you skiing?</label>
                <input value={destination} onChange={e => setDestination(e.target.value)} placeholder="e.g. Verbier, Zermatt, Chamonix"
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
              </div>
            </div>
          </div>

          {suggestions && (
            <div className="bg-peak-card border border-white/5 rounded-xl p-5 mb-6 space-y-3">
              {suggestions.map(s => (
                <div key={s.iata} className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-peak-text-secondary">{s.label}</p>
                    <p className="text-peak-text text-sm font-medium">{s.value}</p>
                  </div>
                  <button onClick={() => sf("from", s.iata)} className="text-xs text-peak-blue border border-peak-blue/30 px-3 py-1 rounded-full hover:bg-peak-blue/10 transition-colors">Use this</button>
                </div>
              ))}
            </div>
          )}

          <div className="mb-6">
            <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-2">Trip type</p>
            <div className="flex gap-2">
              {["Round trip", "One way", "Multi-city"].map(t => (
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
          <h2 className="font-display font-bold text-2xl text-peak-text mb-6">Search flights</h2>
          <div className="bg-peak-card border border-white/5 rounded-xl p-6 space-y-4 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-peak-text-secondary mb-1">From</label>
                <div className="relative">
                  <input value={searchForm.from} onChange={e => sf("from", e.target.value)} placeholder="Airport or city"
                    className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
                  {searchForm.from?.length >= 3 && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-peak-blue">{searchForm.from.slice(0, 3).toUpperCase()}</span>}
                </div>
              </div>
              <div>
                <label className="block text-xs text-peak-text-secondary mb-1">To</label>
                <div className="relative">
                  <input value={searchForm.to} onChange={e => sf("to", e.target.value)} placeholder="Airport or city"
                    className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
                  {searchForm.to?.length >= 3 && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-peak-blue">{searchForm.to.slice(0, 3).toUpperCase()}</span>}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-peak-text-secondary mb-1">Departure date</label>
                <input type="date" value={searchForm.depDate} onChange={e => sf("depDate", e.target.value)}
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
              </div>
              {tripType === "Round trip" && (
                <div>
                  <label className="block text-xs text-peak-text-secondary mb-1">Return date</label>
                  <input type="date" value={searchForm.retDate} onChange={e => sf("retDate", e.target.value)}
                    className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-peak-text-secondary mb-1">Passengers</label>
                <div className="bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 space-y-2">
                  {[{ label: "Adults (12+)", key: "adults" }, { label: "Children (2–11)", key: "children" }, { label: "Infants (under 2)", key: "infants" }].map(({ label, key }) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-xs text-peak-text-secondary">{label}</span>
                      <div className="flex items-center gap-2">
                        <button onClick={() => sf(key, Math.max(key === "adults" ? 1 : 0, (searchForm[key] || 0) - 1))} className="w-6 h-6 rounded border border-white/10 text-peak-text-secondary text-sm flex items-center justify-center">−</button>
                        <span className="text-peak-text text-sm w-4 text-center">{searchForm[key] || 0}</span>
                        <button onClick={() => sf(key, (searchForm[key] || 0) + 1)} className="w-6 h-6 rounded border border-white/10 text-peak-text-secondary text-sm flex items-center justify-center">+</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs text-peak-text-secondary mb-1">Cabin class</label>
                <select value={searchForm.cabin} onChange={e => sf("cabin", e.target.value)}
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue">
                  {["Economy", "Premium Economy", "Business", "First"].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-2 border-t border-white/5">
              {[{ k: "directOnly", l: "Direct flights only" }, { k: "flexible", l: "Flexible dates (±3 days)" }, { k: "nearbyAirports", l: "Include nearby airports" }, { k: "carbon", l: "Carbon offset included" }].map(({ k, l }) => (
                <label key={k} className="flex items-center gap-2 cursor-pointer">
                  <Checkbox checked={filters[k]} onCheckedChange={v => setFilters(f => ({ ...f, [k]: v }))}
                    className="border-peak-text-secondary data-[state=checked]:bg-peak-blue data-[state=checked]:border-peak-blue" />
                  <span className="text-xs text-peak-text-secondary">{l}</span>
                </label>
              ))}
            </div>
          </div>
          <button onClick={() => setStep(2)} className="w-full py-3 bg-peak-red hover:bg-peak-red-hover text-white font-display font-bold text-sm rounded-xl transition-colors">
            Search flights
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div>
          <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
            <div className="flex gap-2 overflow-x-auto hide-scrollbar">
              {SORT_OPTIONS.map(opt => (
                <button key={opt} onClick={() => setSortBy(opt)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border whitespace-nowrap transition-colors ${sortBy === opt ? "bg-peak-blue/20 border-peak-blue/40 text-peak-blue" : "border-white/10 text-peak-text-secondary hover:text-peak-text"}`}>
                  <ArrowUpDown className="h-3 w-3" />{opt}
                </button>
              ))}
            </div>
            <button onClick={() => setFiltersOpen(!filtersOpen)} className="lg:hidden flex items-center gap-1.5 px-3 py-2 text-xs border border-white/10 text-peak-text-secondary rounded-lg">
              <SlidersHorizontal className="h-3 w-3" /> Filters
            </button>
          </div>
          <div className="flex gap-8">
            <div className="hidden lg:block w-56 flex-shrink-0 space-y-5">
              <div>
                <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-2">Price (per person): €{priceRange[0]}–€{priceRange[1]}</p>
                <Slider value={priceRange} onValueChange={setPriceRange} min={0} max={500} step={10}
                  className="[&_[role=slider]]:bg-peak-blue [&_[role=slider]]:border-peak-blue [&_.bg-primary]:bg-peak-blue" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox checked={filters.directOnly} onCheckedChange={v => setFilters(f => ({ ...f, directOnly: v }))}
                  className="border-peak-text-secondary data-[state=checked]:bg-peak-blue data-[state=checked]:border-peak-blue" />
                <span className="text-sm text-peak-text-secondary">Direct only</span>
              </label>
            </div>
            <div className="flex-1">
              <p className="text-peak-text-secondary text-sm mb-4">{filtered.length} flights found</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filtered.map(flight => (
                  <ResultCard
                    key={flight.id}
                    image={flight.image}
                    title={flight.airline}
                    meta={[
                      `${flight.dep} → ${flight.arr}  ·  ${flight.duration}  ·  ${flight.stops}`,
                      `${flight.fromCity} (${flight.from}) → ${flight.toCity} (${flight.to})`,
                      `${flight.cabin}  ·  ${flight.refundable ? "Refundable" : "Non-refundable"}`,
                    ]}
                    badges={[
                      { label: `🌿 ${flight.eco} emissions`, style: `${ecoColors[flight.eco]} border-white/20` },
                    ]}
                    price={"€" + flight.price}
                    priceLabel="/ person"
                    priceSubline={"€" + (flight.price * totalPax) + " total for " + totalPax + " pax"}
                    status={flight.stops === "Direct" ? "Direct" : "1 stop"}
                    selected={selectedFlight?.id === flight.id}
                    onSelect={() => setSelectedFlight(flight)}
                    cta="Select flight"
                    expandContent={
                      <div className="text-xs text-peak-text-secondary space-y-1">
                        <p>Baggage: 1× cabin bag included. Checked bag optional.</p>
                        <p>Operated by {flight.airline}</p>
                      </div>
                    }
                  />
                ))}
              </div>
            </div>
          </div>
          <button onClick={() => setStep(3)} disabled={!selectedFlight}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {ADDONS.map(a => (
                <button key={a.key} onClick={() => setAddons(prev => prev.includes(a.key) ? prev.filter(k => k !== a.key) : [...prev, a.key])}
                  className={`flex items-center justify-between p-3 rounded-xl border text-left transition-colors ${addons.includes(a.key) ? "border-peak-blue/50 bg-peak-blue/10" : "border-white/10 bg-peak-card"}`}>
                  <span className={`text-sm ${addons.includes(a.key) ? "text-peak-text" : "text-peak-text-secondary"}`}>{a.label}</span>
                  <span className="text-xs text-peak-blue font-medium">+€{a.price}/pax</span>
                </button>
              ))}
            </div>
          </div>
          <CheckoutFlow
            totalPrice={totalPrice}
            summary={[
              { label: "Flight", value: `${selectedFlight?.from} → ${selectedFlight?.to}` },
              { label: "Airline", value: selectedFlight?.airline },
              { label: "Cabin", value: searchForm.cabin },
              { label: "Passengers", value: totalPax },
              { label: "Departure", value: searchForm.depDate || "TBD" },
              ...(tripType === "Round trip" ? [{ label: "Return", value: searchForm.retDate || "TBD" }] : []),
            ]}
            guestFields={[
              { key: "name", label: "Full name (as on passport)", placeholder: "Jane Smith" },
              { key: "dob", label: "Date of birth", placeholder: "DD/MM/YYYY" },
              { key: "passport", label: "Passport / ID number", placeholder: "Stored securely, used for check-in only" },
              { key: "nationality", label: "Nationality", placeholder: "e.g. British" },
              { key: "ffn", label: "Frequent flyer number (optional)", placeholder: "e.g. BA12345678" },
              { key: "meal", label: "Meal preference (optional)", placeholder: "Standard / Vegetarian / Vegan / Halal / Kosher" },
            ]}
            trustBadges={TRUST}
          />
        </div>
      )}
    </BookingShell>
  );
}