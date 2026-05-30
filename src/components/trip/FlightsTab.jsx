import { useState, useMemo, useEffect } from "react";
import DateRangePicker, { fmtDate } from "../shared/DateRangePicker";
import { Plane, Leaf, ArrowUpDown, SlidersHorizontal, ArrowLeftRight, ChevronDown, ChevronUp, MapPin, AlertTriangle, ShoppingBag } from "lucide-react";
import { useT } from "../../lib/i18n";
import LocationInput from "../shared/LocationInput";
import SavePlanButton from "./SavePlanButton";
import BookingShell from "./shared/BookingShell";
import CheckoutFlow from "./shared/CheckoutFlow";
import RangeSlider from "../shared/RangeSlider";
import { Checkbox } from "@/components/ui/checkbox";

const STEPS_KEYS = ["search_step", "results", "checkout_step"];

const SORT_KEYS = ["cheapest", "fastest", "best", "departure_time", "arrival_time"];
const SORT_VALUES = ["Cheapest", "Fastest", "Best", "Departure", "Arrival"];

const DEST_AIRPORTS = [
  { iata: "GVA", name: "Geneva", transfer: "1h15 to Verbier / 1h to Chamonix" },
  { iata: "ZRH", name: "Zurich", transfer: "2h to Zermatt / 2h30 to Verbier" },
  { iata: "INN", name: "Innsbruck", transfer: "30min to Sölden / 45min to Kitzbühel" },
  { iata: "SZG", name: "Salzburg", transfer: "1h to Zell am See / 1h15 to Obertauern" },
  { iata: "MUC", name: "Munich", transfer: "1h30 to Zugspitze / 1h to Garmisch" },
  { iata: "LYS", name: "Lyon", transfer: "2h to Les Deux Alpes / 2h15 to Alpe d'Huez" },
  { iata: "TRN", name: "Turin", transfer: "1h30 to Sestriere / 1h45 to Courmayeur" },
  { iata: "MXP", name: "Milan Malpensa", transfer: "2h to Livigno / 2h30 to Cortina" },
  { iata: "VIE", name: "Vienna", transfer: "3h to Kitzbühel / 3h30 to Innsbruck area" },
  { iata: "BRN", name: "Bern", transfer: "1h to Grindelwald / 1h15 to Wengen" },
];

const CITY_AIRPORT_LOOKUP = {
  barcelona: "BCN", london: "LHR", paris: "CDG", amsterdam: "AMS",
  frankfurt: "FRA", zurich: "ZRH", munich: "MUC", rome: "FCO",
  madrid: "MAD", brussels: "BRU", stockholm: "ARN", oslo: "OSL",
  copenhagen: "CPH", milan: "MXP", geneva: "GVA",
};

const MOCK_FLIGHTS = [
  { id: "fl1", airline: "Swiss Air", iata: "LX", flightNo: "LX 237", from: "BCN", fromCity: "Barcelona", to: "GVA", toCity: "Geneva", dep: "06:30", arr: "08:15", duration: "1h 45m", stops: "Direct", cabin: "Economy", price: 89, eco: "Low", co2kg: 87, refundable: true, baggage: "1× cabin bag", checkedBag: false },
  { id: "fl2", airline: "easyJet", iata: "U2", flightNo: "EZY 8341", from: "LGW", fromCity: "London", to: "GVA", toCity: "Geneva", dep: "07:00", arr: "09:40", duration: "2h 40m", stops: "Direct", cabin: "Economy", price: 67, eco: "Medium", co2kg: 112, refundable: false, baggage: "1× cabin bag", checkedBag: false },
  { id: "fl3", airline: "Lufthansa", iata: "LH", flightNo: "LH 1804", from: "MUC", fromCity: "Munich", to: "GVA", toCity: "Geneva", dep: "10:15", arr: "14:30", duration: "4h 15m", stops: "1 stop · via FRA", cabin: "Business", price: 340, eco: "High", co2kg: 198, refundable: true, baggage: "2× checked bags", checkedBag: true },
  { id: "fl4", airline: "Vueling", iata: "VY", flightNo: "VY 1234", from: "BCN", fromCity: "Barcelona", to: "ZRH", toCity: "Zurich", dep: "08:50", arr: "10:40", duration: "1h 50m", stops: "Direct", cabin: "Economy", price: 54, eco: "Low", co2kg: 79, refundable: false, baggage: "1× cabin bag", checkedBag: false },
  { id: "fl5", airline: "Swiss Air", iata: "LX", flightNo: "LX 189", from: "AMS", fromCity: "Amsterdam", to: "GVA", toCity: "Geneva", dep: "11:40", arr: "13:25", duration: "1h 45m", stops: "Direct", cabin: "Economy", price: 112, eco: "Low", co2kg: 91, refundable: true, baggage: "1× cabin bag", checkedBag: false },
];

const ecoColors = { Low: "text-peak-green", Medium: "text-yellow-400", High: "text-peak-red" };
const ecoBg = { Low: "bg-peak-green/10 border-peak-green/30", Medium: "bg-yellow-400/10 border-yellow-400/30", High: "bg-peak-red/10 border-peak-red/30" };

const INSURANCE_TIERS = [
  { key: "basic", label: "Basic", desc: "Medical cover only", price: 12, badge: null },
  { key: "standard", label: "Standard", desc: "Medical + cancellation + baggage", price: 22, badge: "Recommended" },
  { key: "premium", label: "Premium", desc: "All risks + adventure sports cover", price: 35, badge: "Ski trips", note: "Includes skiing & off-piste — recommended for ski trips" },
];

const TRUST = [
  { label: "Price-lock guarantee" }, { label: "Instant e-ticket" },
  { label: "Free cancellation within 24h" }, { label: "SSL secured" },
];

// Realistic route data
const ROUTE_DATA = {
  "BCN-GVA": { dur: "1h 50m", airlines: ["Vueling","Iberia","easyJet"] },
  "LHR-GVA": { dur: "2h 00m", airlines: ["British Airways","easyJet","SWISS"] },
  "LGW-GVA": { dur: "2h 05m", airlines: ["easyJet","British Airways"] },
  "AMS-MUC": { dur: "1h 30m", airlines: ["KLM","Transavia","Lufthansa"] },
  "AMS-GVA": { dur: "1h 55m", airlines: ["KLM","easyJet","SWISS"] },
  "AMS-INN": { dur: "1h 45m", airlines: ["KLM","easyJet"] },
  "CDG-GVA": { dur: "1h 20m", airlines: ["Air France","easyJet","Transavia"] },
  "CDG-INN": { dur: "1h 45m", airlines: ["Air France","easyJet"] },
  "FRA-SZG": { dur: "1h 20m", airlines: ["Lufthansa","easyJet"] },
  "FRA-INN": { dur: "1h 15m", airlines: ["Lufthansa","Austrian"] },
  "MUC-INN": { dur: "0h 55m", airlines: ["Lufthansa","Austrian"] },
  "MUC-GVA": { dur: "1h 15m", airlines: ["Lufthansa","SWISS","easyJet"] },
};

const CABIN_FACTORS = { Economy: 1.0, "Premium Economy": 1.7, Business: 3.2, First: 5.5 };
const DEP_TIMES = ["06:30","08:15","10:05","12:45","15:30","18:00"];

function durToMin(dur) {
  const m = dur.match(/(\d+)h\s*(\d+)m/);
  if (!m) return 90;
  return parseInt(m[1]) * 60 + parseInt(m[2]);
}

function dateFactor(date) {
  if (!date) return 1.0;
  const d = new Date(date);
  const month = d.getMonth() + 1;
  if (month === 12 || month === 2 || month === 1) return month === 12 ? 1.4 : 0.85;
  return 1.0;
}

function generateFlightResults(fromAirport, toAirport, depDate, retDate, pax, cabinClass, skiGear) {
  if (!fromAirport || !toAirport) return [];
  const from = fromAirport.split(" ")[0].toUpperCase();
  const to = toAirport.split(" ")[0].toUpperCase();
  const routeKey = `${from}-${to}`;
  const routeData = ROUTE_DATA[routeKey] || { dur: "2h 30m", airlines: ["easyJet","Ryanair","Transavia"] };
  const durationMin = durToMin(routeData.dur);
  const basePrice = durationMin < 120 ? 80 : durationMin < 180 ? 130 : 200;
  const cabinFactor = CABIN_FACTORS[cabinClass] || 1.0;
  const df = dateFactor(depDate);
  const count = Math.min(routeData.airlines.length, 5);
  const times = DEP_TIMES.slice(0, count);
  return times.map((dep, i) => {
    const airline = routeData.airlines[i % routeData.airlines.length];
    const varFactor = 0.85 + (i * 0.08);
    const price = Math.round(basePrice * cabinFactor * df * varFactor);
    const [h, m] = dep.split(":").map(Number);
    const arrMins = h * 60 + m + durationMin;
    const arrH = Math.floor(arrMins / 60) % 24;
    const arrM = arrMins % 60;
    const arr = `${String(arrH).padStart(2,"0")}:${String(arrM).padStart(2,"0")}`;
    const skiPricing = skiGear ? 35 : 0;
    return {
      id: `f${i}`, airline, iata: airline.slice(0,2).toUpperCase(), flightNo: `${airline.slice(0,2).toUpperCase()}${100+i*37}`,
      from, fromCity: from, to, toCity: to,
      dep, arr, duration: routeData.dur, stops: "Direct",
      cabin: cabinClass, price: price + skiPricing, eco: i === 0 ? "Low" : i === count-1 ? "High" : "Medium",
      co2kg: Math.round(durationMin * 0.9), refundable: i % 2 === 0,
      baggage: cabinClass === "Economy" ? "1× cabin bag" : "2× checked bags", checkedBag: cabinClass !== "Economy",
    };
  }).sort((a, b) => a.price - b.price);
}

export default function FlightsTab({ agentServiceDetails = {}, onBook }) {
  const t = useT();
  const [step, setStep] = useState(0);
  const [tripType, setTripType] = useState("Round trip");
  const [fromVal, setFromVal] = useState("");
  const [toVal, setToVal] = useState("");
  const [fromAirportData, setFromAirportData] = useState(null);
  const [toAirportData, setToAirportData] = useState(null);
  const [searchForm, setSearchForm] = useState({ depDate: null, retDate: null, adults: 1, children: 0, infants: 0, cabin: "Economy" });
  const [filters, setFilters] = useState({ directOnly: false, flexible: false, nearbyAirports: false, carbon: false });
  const [skiGear, setSkiGear] = useState({ open: false, skiBag: false, bootBag: false, helmetBag: false, poles: false });

  const [sortBy, setSortBy] = useState("Cheapest");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [expandedFlight, setExpandedFlight] = useState(null);
  const [insurance, setInsurance] = useState(null);
  const [skiInsurance, setSkiInsurance] = useState(false);
  const [preFilled, setPreFilled] = useState(false);
  const [flightResults, setFlightResults] = useState([]);

  useEffect(() => {
    const sd = agentServiceDetails?.flights;
    if (!sd) return;
    if (sd.departureAirport) setFromVal(sd.departureAirport);
    if (sd.cabinClass) sf("cabin", { economy: "Economy", business: "Business", first: "First" }[sd.cabinClass] || "Economy");
    if (typeof sd.returnFlight === "boolean") setTripType(sd.returnFlight ? "Round trip" : "One way");
    setPreFilled(true);
  }, []);

  const sf = (field, val) => setSearchForm(f => ({ ...f, [field]: val }));
  const totalPax = searchForm.adults + searchForm.children + searchForm.infants;

  function swapFromTo() {
    const tmpVal = fromVal;
    const tmpData = fromAirportData;
    setFromVal(toVal);
    setFromAirportData(toAirportData);
    setToVal(tmpVal);
    setToAirportData(tmpData);
  }

  const filtered = useMemo(() => {
    let res = [...flightResults];
    if (filters.directOnly) res = res.filter(f => f.stops === "Direct");
    const [prLow, prHigh] = Array.isArray(priceRange) ? priceRange : [0, priceRange];
  res = res.filter(f => f.price >= prLow && f.price <= prHigh);
    if (sortBy === "Cheapest") res.sort((a, b) => a.price - b.price);
    else if (sortBy === "Fastest") res.sort((a, b) => a.duration.localeCompare(b.duration));
    else if (sortBy === "Departure") res.sort((a, b) => a.dep.localeCompare(b.dep));
    else if (sortBy === "Arrival") res.sort((a, b) => a.arr.localeCompare(b.arr));
    return res;
  }, [flightResults, filters, priceRange, sortBy]);

  const skiBagCount = Object.entries(skiGear).filter(([k, v]) => k !== "open" && v).length;
  const insurancePrice = insurance ? INSURANCE_TIERS.find(t => t.key === insurance)?.price || 0 : 0;
  const totalPrice = selectedFlight
    ? (selectedFlight.price * totalPax) + (insurancePrice * totalPax) + (skiInsurance ? 18 * totalPax : 0)
    : 0;

  function goBack() { if (step > 0) setStep(s => s - 1); }

  return (
    <BookingShell steps={STEPS_KEYS.map(k => t(k))} current={step} onBack={goBack}>
      {preFilled && (
        <div className="flex items-center gap-2 bg-peak-blue/10 border border-peak-blue/20 rounded-xl px-4 py-2.5 mb-4">
          <p className="text-peak-blue text-xs font-medium">{t('pre_filled_agent')}</p>
        </div>
      )}

      {/* STEP 0 — Unified search */}
      {step === 0 && (
        <div className="max-w-5xl mx-auto">
          {/* Trip type */}
          <div className="flex gap-2 mb-5">
            {[{ key: "Round trip", label: t('round_trip') }, { key: "One way", label: t('one_way') }, { key: "Multi-city", label: "Multi-city" }].map(opt => (
              <button key={opt.key} onClick={() => setTripType(opt.key)}
                className={`px-4 py-2 text-sm font-medium rounded-xl border transition-colors ${tripType === opt.key ? "bg-peak-red text-white border-peak-red" : "bg-peak-surface border-white/10 text-peak-text-secondary hover:text-peak-text"}`}>
                {opt.label}
              </button>
            ))}
          </div>

          {/* Main search card */}
          <div className="bg-peak-card border border-white/5 rounded-2xl p-6">
            {/* Row 1 — From / Swap / To */}
            <div className="flex items-start gap-3 mb-5">
              <div className="flex-1">
                <label className="block text-xs text-peak-text-secondary mb-1.5">{t('from')}</label>
                <LocationInput
                  type="airport" context="departure" placeholder="City or airport — e.g. Barcelona BCN"
                  value={fromVal} onChange={setFromVal}
                  onSelect={s => { setFromAirportData(s); setFromVal(s.label); }}
                />
              </div>

              <button onClick={swapFromTo} className="w-10 h-10 mt-7 rounded-full bg-peak-surface border border-white/10 flex items-center justify-center hover:border-white/25 flex-shrink-0 transition-colors">
                <ArrowLeftRight className="h-4 w-4 text-peak-text-secondary" />
              </button>

              <div className="flex-1">
                <label className="block text-xs text-peak-text-secondary mb-1.5">{t('to')}</label>
                <LocationInput
                  type="airport" context="destination" placeholder="Destination airport"
                  value={toVal} onChange={setToVal}
                  onSelect={s => { setToAirportData(s); setToVal(s.label); }}
                />
                {toAirportData?.nearestResort && (
                  <p className="mt-1.5 text-xs text-peak-green font-medium">~{toAirportData.transferTime} transfer to {toAirportData.nearestResort}</p>
                )}
              </div>
            </div>

            {/* Row 2 — Dates + Passengers + Cabin */}
            <div className="border-t border-white/5 pt-5 mb-5">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                  <label className="block text-xs text-peak-text-secondary mb-1.5">Dates</label>
                  <DateRangePicker
                    startDate={searchForm.depDate} endDate={searchForm.retDate}
                    onStartChange={v => sf("depDate", v)} onEndChange={v => sf("retDate", v)}
                    mode={tripType === "Round trip" ? "range" : "single"}
                    context="flight" minStay={1}
                    placeholder={{ start: "Departure", end: "Return" }}
                  />
                </div>
                <div>
                  <label className="block text-xs text-peak-text-secondary mb-1.5">{t('cabin_class')}</label>
                  <select value={searchForm.cabin} onChange={e => sf("cabin", e.target.value)}
                    className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-3 text-sm text-peak-text outline-none focus:border-peak-blue">
                    {["Economy", "Premium Economy", "Business", "First"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-xs text-peak-text-secondary mb-1.5">{t('passengers')}</label>
                <div className="bg-peak-surface border border-white/10 rounded-xl px-4 py-3 flex flex-wrap gap-4">
                  {[{ label: "Adults (12+)", key: "adults", min: 1 }, { label: "Children (2–11)", key: "children", min: 0 }, { label: "Infants", key: "infants", min: 0 }].map(({ label, key, min }) => (
                    <div key={key} className="flex items-center gap-3">
                      <span className="text-xs text-peak-text-secondary w-24">{label}</span>
                      <button onClick={() => sf(key, Math.max(min, (searchForm[key] || 0) - 1))} className="w-6 h-6 rounded border border-white/10 text-peak-text-secondary flex items-center justify-center text-sm hover:border-white/25">−</button>
                      <span className="text-peak-text text-sm w-4 text-center">{searchForm[key] || 0}</span>
                      <button onClick={() => sf(key, (searchForm[key] || 0) + 1)} className="w-6 h-6 rounded border border-white/10 text-peak-text-secondary flex items-center justify-center text-sm hover:border-white/25">+</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Row 3 — Filter toggles */}
            <div className="border-t border-white/5 pt-4 flex flex-wrap gap-4">
              {[{ k: "directOnly", l: t('direct_only') }, { k: "flexible", l: t('flexible_dates') + " ±3 days" }, { k: "nearbyAirports", l: "Include nearby airports" }, { k: "carbon", l: "Carbon offset included" }].map(({ k, l }) => (
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
              <span className="text-peak-text text-sm font-medium">Travelling with ski equipment?{skiBagCount > 0 ? ` (${skiBagCount} selected)` : ""}</span>
              {skiGear.open ? <ChevronUp className="h-4 w-4 text-peak-text-secondary" /> : <ChevronDown className="h-4 w-4 text-peak-text-secondary" />}
            </button>
            {skiGear.open && (
              <div className="mt-4 space-y-3">
                {[{ k: "skiBag", l: "Ski bag / snowboard bag (sports equipment)" }, { k: "bootBag", l: "Ski boots bag (separate piece)" }, { k: "helmetBag", l: "Helmet bag" }, { k: "poles", l: "Ski poles only" }].map(({ k, l }) => (
                  <label key={k} className="flex items-center gap-3 cursor-pointer">
                    <Checkbox checked={skiGear[k]} onCheckedChange={v => setSkiGear(g => ({ ...g, [k]: v }))}
                      className="border-peak-text-secondary data-[state=checked]:bg-peak-blue data-[state=checked]:border-peak-blue" />
                    <span className="text-sm text-peak-text-secondary">{l}</span>
                  </label>
                ))}
                <p className="text-peak-text-secondary text-xs mt-2 pt-2 border-t border-white/5">Most airlines charge €20–50 each way for ski equipment. We will show baggage fees per airline in the results.</p>
              </div>
            )}
          </div>

          <button onClick={() => { setFlightResults(generateFlightResults(fromVal, toVal, searchForm.depDate, searchForm.retDate, totalPax, searchForm.cabin, Object.values(skiGear).some(Boolean))); setStep(1); }} className="w-full py-4 bg-peak-red hover:bg-peak-red-hover text-white font-bold text-base rounded-xl transition-colors mt-4">
            {t('search_flights')}
          </button>
        </div>
      )}

      {/* STEP 1 — Results */}
      {step === 1 && (
        <div className="max-w-5xl mx-auto">
          {/* Carbon offset bar */}
          {filters.carbon && (
            <div className="bg-peak-green/5 border border-peak-green/20 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Leaf className="h-4 w-4 text-peak-green flex-shrink-0" />
                <span className="text-peak-green font-bold text-sm">Carbon offset options</span>
              </div>
              <p className="text-peak-text-secondary text-xs mb-3">We will add a verified carbon offset to your booking. While offsets help neutralise unavoidable emissions, the most climate-responsible choice is always to take the train when possible. Offsets are a last resort, not a solution.</p>
              <div className="space-y-2">
                {[{ name: "Gold Standard", desc: "The highest standard in voluntary carbon offsetting, independently verified", url: "goldstandard.org" }, { name: "South Pole", desc: "Reforestation and renewable energy projects across the Global South", url: "southpole.com" }, { name: "Atmosfair", desc: "Aviation-specific offsetting, founded by the German government", url: "atmosfair.de" }].map(o => (
                  <div key={o.name} className="flex items-start gap-2">
                    <span className="text-peak-green text-xs font-semibold w-24 flex-shrink-0">{o.name}</span>
                    <span className="text-peak-text-secondary text-xs">{o.desc} — <span className="text-peak-blue">{o.url}</span></span>
                  </div>
                ))}
              </div>
              <p className="text-peak-text-secondary text-xs mt-3 italic">PeakXP does not profit from carbon offset sales. Even with offsets, aviation has a significant climate impact. Where a train journey is under 6 hours, we strongly recommend choosing rail.</p>
            </div>
          )}

          {/* Results header + sort */}
          <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
            <div>
              {!fromVal || !toVal ? (
                <span className="text-peak-text-secondary text-sm">Please enter departure and destination airports to search</span>
              ) : (
                <span className="text-peak-text-secondary text-sm">{filtered.length} {t('flights_found')} {fromVal.split(" ")[0]} → {toVal.split(" ")[0]}</span>
              )}
              <span className="text-peak-text-secondary/60 text-xs ml-2">{fromVal} → {toVal} · {fmtDate(searchForm.depDate) || "–"} · {totalPax} pax · {searchForm.cabin}</span>
            </div>
            <div className="flex gap-2 overflow-x-auto hide-scrollbar">
              {SORT_KEYS.map((key, i) => (
                <button key={key} onClick={() => setSortBy(SORT_VALUES[i])}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border whitespace-nowrap transition-colors ${sortBy === SORT_VALUES[i] ? "bg-peak-blue/20 border-peak-blue/40 text-peak-blue" : "border-white/10 text-peak-text-secondary hover:text-peak-text"}`}>
                  {t(key)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-6">
            {/* Filter sidebar */}
            <div className="hidden lg:block w-56 flex-shrink-0 space-y-5">
              <div>
                <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-2">Price/person: €{priceRange[0]}–€{priceRange[1]}</p>
                <RangeSlider mode="dual" value={priceRange} onValueChange={setPriceRange} min={0} max={500} step={10} formatLabel={n => '€' + n} />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold text-peak-text uppercase tracking-widest">Stops</p>
                {["Any stops", "Direct only"].map(s => (
                  <label key={s} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="stops" checked={s === "Direct only" ? filters.directOnly : !filters.directOnly}
                      onChange={() => setFilters(f => ({ ...f, directOnly: s === "Direct only" }))}
                      className="accent-peak-blue" />
                    <span className="text-sm text-peak-text-secondary">{s}</span>
                  </label>
                ))}
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox checked={filters.carbon} onCheckedChange={v => setFilters(f => ({ ...f, carbon: v }))}
                  className="border-peak-text-secondary data-[state=checked]:bg-peak-blue data-[state=checked]:border-peak-blue" />
                <span className="text-sm text-peak-text-secondary">Carbon offset</span>
              </label>
            </div>

            {/* Flight list */}
            <div className="flex-1 space-y-3">
              {filtered.map(flight => (
                <div key={flight.id}>
                  <div className={`bg-peak-card border rounded-2xl p-5 hover:border-white/15 transition-all cursor-pointer ${selectedFlight?.id === flight.id ? "border-peak-blue/40" : "border-white/5"}`}>
                    <div className="flex items-center gap-4 flex-wrap lg:flex-nowrap">
                      {/* Airline */}
                      <div className="w-28 flex-shrink-0">
                        <div className="w-10 h-10 rounded-lg bg-peak-surface flex items-center justify-center mb-1">
                          <span className="font-mono font-bold text-peak-blue text-xs">{flight.iata}</span>
                        </div>
                        <p className="text-peak-text text-xs font-medium leading-tight">{flight.airline}</p>
                        <p className="text-peak-text-secondary text-xs">{flight.flightNo}</p>
                      </div>

                      {/* Times */}
                      <div className="flex-1 flex items-center gap-3">
                        <div className="text-right">
                          <p className="font-display font-bold text-peak-text text-2xl">{flight.dep}</p>
                          <p className="text-peak-text-secondary text-xs">{flight.from}</p>
                        </div>
                        <div className="flex-1 text-center">
                          <div className="flex items-center gap-1 mb-1">
                            <div className="flex-1 h-px bg-white/10" />
                            <Plane className="h-3 w-3 text-peak-text-secondary" />
                            <div className="flex-1 h-px bg-white/10" />
                          </div>
                          <p className="text-peak-text-secondary text-xs">{flight.duration}</p>
                          <p className={`text-xs font-medium mt-0.5 ${flight.stops === "Direct" ? "text-peak-green" : "text-peak-text-secondary"}`}>{flight.stops === "Direct" ? t('direct') : flight.stops}</p>
                        </div>
                        <div>
                          <p className="font-display font-bold text-peak-text text-2xl">{flight.arr}</p>
                          <p className="text-peak-text-secondary text-xs">{flight.to}</p>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="w-40 flex-shrink-0 space-y-1 text-xs">
                        <span className="bg-peak-surface border border-white/10 px-2 py-0.5 rounded-full text-peak-text-secondary">{flight.cabin}</span>
                        <p className={flight.refundable ? "text-peak-green" : "text-peak-red"}>
                          {flight.refundable ? "✓ Refundable" : "✗ Non-refundable"}
                        </p>
                        <p className="text-peak-text-secondary">{flight.baggage}</p>
                        {skiBagCount > 0 && <p className="text-peak-text-secondary">+€35 ski bag est.</p>}
                        <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded border text-xs ${ecoBg[flight.eco]}`}>
                          <Leaf className="h-2.5 w-2.5" />
                          <span className={ecoColors[flight.eco]}>{flight.eco} CO₂</span>
                        </span>
                      </div>

                      {/* Price */}
                      <div className="w-32 flex-shrink-0 text-right">
                        <p className="font-display font-bold text-peak-text text-2xl">€{flight.price}</p>
                        <p className="text-peak-text-secondary text-xs">/ person</p>
                        <p className="text-peak-text-secondary text-xs">€{flight.price * totalPax} total</p>
                        <button onClick={() => { setSelectedFlight(flight); setStep(2); }}
                          className="w-full mt-2 bg-peak-red hover:bg-peak-red-hover text-white text-xs font-semibold rounded-xl py-2.5 transition-colors flex items-center justify-center gap-1">
                          <ShoppingBag className="h-3 w-3" /> {t('select_flight')}
                        </button>
                      </div>
                    </div>

                    {/* Expand */}
                    <button onClick={() => setExpandedFlight(expandedFlight === flight.id ? null : flight.id)}
                      className="mt-3 text-xs text-peak-text-secondary hover:text-peak-text flex items-center gap-1">
                      {expandedFlight === flight.id ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                      {t('show_details')}
                    </button>

                    {expandedFlight === flight.id && (
                      <div className="mt-3 bg-peak-surface rounded-xl p-4 text-xs text-peak-text-secondary space-y-1">
                        <p><span className="text-peak-text font-medium">Baggage:</span> {flight.baggage}{flight.checkedBag ? " + 1 checked bag" : " — checked bag optional (+€35)"}</p>
                        <p><span className="text-peak-text font-medium">Cancellation:</span> {flight.refundable ? "Fully refundable up to 24h before" : "Non-refundable fare"}</p>
                        <p><span className="text-peak-text font-medium">Operated by:</span> {flight.airline} flight {flight.flightNo}</p>
                        <p><span className="text-peak-text font-medium">CO₂ estimate:</span> ~{flight.co2kg}kg per passenger</p>
                        {skiBagCount > 0 && <p><span className="text-peak-text font-medium">Ski equipment fee:</span> Estimated €35 each way (confirm at checkout)</p>}
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
      {step === 2 && selectedFlight && (
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-3">Travel insurance</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              {INSURANCE_TIERS.map(tier => (
                <button key={tier.key} onClick={() => setInsurance(insurance === tier.key ? null : tier.key)}
                  className={`relative p-4 rounded-xl border text-left transition-colors ${insurance === tier.key ? "border-peak-blue/50 bg-peak-blue/10" : "border-white/10 bg-peak-card hover:border-white/20"}`}>
                  {tier.badge && <span className="absolute top-3 right-3 text-xs bg-peak-blue/20 text-peak-blue px-2 py-0.5 rounded-full">{tier.badge}</span>}
                  <p className="font-semibold text-peak-text text-sm mb-1">{tier.label}</p>
                  <p className="text-peak-text-secondary text-xs mb-2">{tier.desc}</p>
                  {tier.note && <p className="text-peak-blue text-xs mb-2">{tier.note}</p>}
                  <p className="text-peak-text font-bold">from €{tier.price}/person</p>
                </button>
              ))}
            </div>

            {skiBagCount > 0 && (
              <button onClick={() => setSkiInsurance(!skiInsurance)}
                className={`w-full flex items-center justify-between p-4 rounded-xl border transition-colors ${skiInsurance ? "border-peak-blue/50 bg-peak-blue/10" : "border-white/10 bg-peak-card hover:border-white/20"}`}>
                <div className="text-left">
                  <p className="text-peak-text text-sm font-semibold">Ski equipment insurance</p>
                  <p className="text-peak-text-secondary text-xs">Covers loss, theft and damage to skis and boots up to €2,000</p>
                </div>
                <span className="text-peak-text font-bold text-sm">+€18/person</span>
              </button>
            )}

            <div className="mt-3 bg-peak-surface border border-white/5 rounded-xl p-3">
              <p className="text-peak-text-secondary text-xs">Seat selection is available after booking directly with {selectedFlight.airline}.</p>
            </div>
          </div>

          <CheckoutFlow
            totalPrice={totalPrice}
            planData={{ serviceKey: "flights", name: `${selectedFlight.airline} — ${selectedFlight.from} → ${selectedFlight.to}`, destination: { label: selectedFlight.to, type: "general" }, dates: { start: searchForm.depDate || null, end: searchForm.retDate || null }, guests: { adults: searchForm.adults, children: searchForm.children, seniors: 0 }, itemDetails: { airline: selectedFlight.airline, cabin: searchForm.cabin, flightNo: selectedFlight.flightNo }, estimatedPriceEUR: totalPrice }}
            summary={[
              { label: "Flight", value: `${selectedFlight.from} → ${selectedFlight.to}` },
              { label: "Airline", value: `${selectedFlight.airline} ${selectedFlight.flightNo}` },
              { label: "Cabin", value: searchForm.cabin },
              { label: "Passengers", value: totalPax },
              { label: "Departure", value: fmtDate(searchForm.depDate) || "TBD" },
              ...(tripType === "Round trip" ? [{ label: "Return", value: fmtDate(searchForm.retDate) || "TBD" }] : []),
              ...(insurance ? [{ label: "Insurance", value: `${INSURANCE_TIERS.find(t => t.key === insurance)?.label} — €${insurancePrice * totalPax}` }] : []),
              ...(skiInsurance ? [{ label: "Ski insurance", value: `€${18 * totalPax}` }] : []),
            ]}
            guestFields={[
              { key: "name", label: "Full name (as on passport)", placeholder: "Jane Smith" },
              { key: "dob", label: "Date of birth", placeholder: "DD/MM/YYYY" },
              { key: "passport", label: "Passport / ID number", placeholder: "Used for check-in only" },
              { key: "nationality", label: "Nationality", placeholder: "e.g. British" },
              { key: "ffn", label: "Frequent flyer number (optional)", placeholder: "e.g. BA12345678" },
              { key: "meal", label: "Meal preference (optional)", placeholder: "Standard / Vegetarian / Vegan / Halal" },
            ]}
            trustBadges={TRUST}
            onComplete={() => {
              onBook?.(`${selectedFlight.airline} — ${selectedFlight.from} → ${selectedFlight.to} · ${totalPax} pax`, totalPrice, {
                airline: selectedFlight.airline, from: selectedFlight.from, to: selectedFlight.to,
                cabin: searchForm.cabin, departure: searchForm.depDate, returnDate: searchForm.retDate,
              });
            }}
          />
        </div>
      )}
    </BookingShell>
  );
}