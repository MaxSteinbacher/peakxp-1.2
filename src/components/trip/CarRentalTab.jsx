import { useState, useMemo, useEffect } from "react";
import DateRangePicker, { fmtDate } from "../shared/DateRangePicker";
import { ArrowUpDown, AlertTriangle, MapPin, ChevronDown, ChevronUp, ShoppingBag } from "lucide-react";
import SavePlanButton from "./SavePlanButton";
import BookingShell from "./shared/BookingShell";
import CheckoutFlow from "./shared/CheckoutFlow";
import RangeSlider from "../shared/RangeSlider";
import { Checkbox } from "@/components/ui/checkbox";

const STEPS = ["Search", "Results", "Checkout"];
const SORT_OPTIONS = ["Cheapest", "Best rated", "Recommended", "Largest boot", "Luxury first"];

const CITY_AIRPORT_LOOKUP = {
  barcelona: "Barcelona", london: "London", paris: "Paris", amsterdam: "Amsterdam",
  frankfurt: "Frankfurt", zurich: "Zurich", munich: "Munich", rome: "Rome",
  madrid: "Madrid", brussels: "Brussels", stockholm: "Stockholm", oslo: "Oslo",
  geneva: "Geneva", milan: "Milan",
};

const MOCK_CARS = [
  { id: "car1", name: "Volkswagen Tiguan", category: "SUV", seats: 5, doors: 5, boot: "Large", transmission: "Automatic", fuel: "Diesel", winter: ["Winter tyres", "4WD"], company: "Sixt", location: "Geneva Airport", locationDist: "On-site desk", pricePerDay: 78, mileage: "Unlimited", fuel_policy: "Full-to-full", cancellation: "Free cancellation", included: ["CDW", "TPL"], rating: 4.7, status: "Available" },
  { id: "car2", name: "Renault Zoe Electric", category: "Compact", seats: 5, doors: 5, boot: "Medium", transmission: "Automatic", fuel: "Electric", winter: [], company: "Europcar", location: "Geneva City Centre", locationDist: "2km from airport", pricePerDay: 55, mileage: "Unlimited", fuel_policy: "Full-to-full", cancellation: "Free cancellation", included: ["CDW"], rating: 4.3, status: "Available" },
  { id: "car3", name: "Porsche Cayenne", category: "Luxury", seats: 5, doors: 5, boot: "Large", transmission: "Automatic", fuel: "Petrol", winter: ["Winter tyres", "4WD", "Ski rack"], company: "Hertz", location: "Zurich Airport", locationDist: "On-site desk", pricePerDay: 195, mileage: "500 km/day", fuel_policy: "Full-to-empty", cancellation: "Non-refundable", included: ["CDW", "TPL", "Theft"], rating: 4.9, status: "Available" },
  { id: "car4", name: "Ford Galaxy", category: "Van", seats: 7, doors: 5, boot: "Very large", transmission: "Manual", fuel: "Diesel", winter: ["Winter tyres"], company: "Avis", location: "Lyon Airport", locationDist: "On-site desk", pricePerDay: 89, mileage: "Unlimited", fuel_policy: "Full-to-full", cancellation: "Free cancellation", included: ["CDW", "TPL"], rating: 4.5, status: "Limited" },
];

const VEHICLE_PREFS = ["Snow-ready", "4WD / AWD", "Automatic", "Manual", "Ski rack", "Large boot", "7-seater", "Electric / Hybrid", "Luxury"];

const ADDONS_CAR = [
  { key: "full_protect", label: "Full protection (zero excess)", price: 18, unit: "/day" },
  { key: "gps", label: "GPS navigation", price: 8, unit: "/day" },
  { key: "child_infant", label: "Infant seat", price: 7, unit: "/day" },
  { key: "child_toddler", label: "Toddler seat", price: 7, unit: "/day" },
  { key: "child_booster", label: "Booster seat", price: 7, unit: "/day" },
  { key: "add_driver", label: "Additional driver", price: 12, unit: "/day" },
  { key: "fuel", label: "Prepaid fuel (return empty)", price: 45, unit: " flat" },
  { key: "roadside", label: "Roadside assistance premium", price: 6, unit: "/day" },
  { key: "ski_rack", label: "Ski rack (if not included)", price: 12, unit: "/day" },
  { key: "chains", label: "Snow chains (if not included)", price: 25, unit: " flat" },
];

const TRUST = [
  { label: "Free cancellation on most vehicles" }, { label: "No hidden fees" },
  { label: "Winter-ready vehicles verified" }, { label: "SSL secured" },
];

const TIME_OPTIONS = Array.from({ length: 48 }, (_, i) => {
  const h = Math.floor(i / 2).toString().padStart(2, "0");
  const m = i % 2 === 0 ? "00" : "30";
  return `${h}:${m}`;
});

export default function CarRentalTab({ agentServiceDetails = {}, onBook }) {
  const [step, setStep] = useState(0);
  const [pickupVal, setPickupVal] = useState("");
  const [sameReturn, setSameReturn] = useState(true);
  const [returnVal, setReturnVal] = useState("");
  const [locationType, setLocationType] = useState("Airport");
  const [searchForm, setSearchForm] = useState({ pickupDate: null, pickupTime: "10:00", returnDate: null, returnTime: "10:00", driverAge: "25+", additionalDrivers: 0 });
  const [vehiclePrefs, setVehiclePrefs] = useState([]);
  const [filters, setFilters] = useState({ freeCancel: false, unlimited: false, fullToFull: false });
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [sortBy, setSortBy] = useState("Recommended");
  const [priceRange, setPriceRange] = useState([0, 250]);
  const [filterWinter, setFilterWinter] = useState(false);
  const [filterAuto, setFilterAuto] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [expandedCar, setExpandedCar] = useState(null);
  const [addons, setAddons] = useState([]);
  const [preFilled, setPreFilled] = useState(false);

  useEffect(() => {
    const sd = agentServiceDetails?.car;
    if (!sd) return;
    if (sd.departureLocation) setPickupVal(sd.departureLocation);
    const prefs = [];
    if (sd.needsSnowTyres) prefs.push("Snow-ready");
    if (sd.needs4WD) prefs.push("4WD / AWD");
    if (prefs.length) setVehiclePrefs(prefs);
    if (sd.preferredCategory === "luxury") setSortBy("Luxury first");
    else if (sd.preferredCategory === "economy") setSortBy("Cheapest");
    setPreFilled(true);
  }, []);

  const sf = (field, val) => setSearchForm(f => ({ ...f, [field]: val }));
  const togglePref = (p) => setVehiclePrefs(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);

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
            const resolved = Object.entries(CITY_AIRPORT_LOOKUP).find(([k]) => lookup.includes(k))?.[1];
            setPickupVal(resolved ? `${resolved} Airport` : city || "Unknown");
            setLocationLoading(false);
          })
          .catch(() => { setLocationError("Could not resolve location — enter manually"); setLocationLoading(false); });
      },
      () => { setLocationError("Location access denied — enter your city or airport manually"); setLocationLoading(false); }
    );
  }

  const pickupDays = useMemo(() => {
    if (!searchForm.pickupDate || !searchForm.returnDate) return 3;
    const diff = Math.round((new Date(searchForm.returnDate) - new Date(searchForm.pickupDate)) / 86400000);
    return Math.max(1, diff);
  }, [searchForm.pickupDate, searchForm.returnDate]);

  const filtered = useMemo(() => {
    let res = [...MOCK_CARS];
    if (filterWinter) res = res.filter(c => c.winter.length > 0);
    if (filterAuto) res = res.filter(c => c.transmission === "Automatic");
    if (filters.freeCancel) res = res.filter(c => c.cancellation === "Free cancellation");
    if (vehiclePrefs.length > 0) res = res.filter(c => vehiclePrefs.some(p => {
      if (p === "Snow-ready") return c.winter.length > 0;
      if (p === "4WD / AWD") return c.winter.some(w => w.includes("4WD"));
      if (p === "Automatic") return c.transmission === "Automatic";
      if (p === "Ski rack") return c.winter.some(w => w.includes("Ski rack"));
      if (p === "7-seater") return c.seats >= 7;
      if (p === "Luxury") return c.category === "Luxury";
      return true;
    }));
    res = res.filter(c => c.pricePerDay >= priceRange[0] && c.pricePerDay <= priceRange[1]);
    if (sortBy === "Cheapest") res.sort((a, b) => a.pricePerDay - b.pricePerDay);
    else if (sortBy === "Best rated") res.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "Luxury first") res.sort((a, b) => b.pricePerDay - a.pricePerDay);
    return res;
  }, [filterWinter, filterAuto, filters, vehiclePrefs, priceRange, sortBy]);

  const addonsTotal = addons.reduce((sum, k) => {
    const a = ADDONS_CAR.find(x => x.key === k);
    if (!a) return sum;
    return sum + (a.unit.includes("/day") ? a.price * pickupDays : a.price);
  }, 0);
  const totalPrice = selectedCar ? (selectedCar.pricePerDay * pickupDays) + addonsTotal : 0;

  function goBack() { if (step > 0) setStep(s => s - 1); }

  const isYoungDriver = searchForm.driverAge !== "25+";
  const statusColor = { "Available": "text-peak-green", "Limited": "text-yellow-400", "Sold out": "text-peak-red" };

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
          {isYoungDriver && (
            <div className="flex items-center gap-2 mb-4 bg-yellow-400/10 border border-yellow-400/20 rounded-xl px-4 py-2.5">
              <p className="text-xs text-yellow-400">Young driver surcharges apply for under 25. Eligible vehicles will be shown in results.</p>
            </div>
          )}

          <div className="bg-peak-card border border-white/5 rounded-2xl p-6">
            {/* Row 1 — Pick-up + Return */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-xs text-peak-text-secondary mb-1.5">Pick-up location</label>
                <div className="bg-peak-surface border border-white/10 rounded-xl px-4 py-3">
                  <input value={pickupVal} onChange={e => setPickupVal(e.target.value)} placeholder="Airport, city centre or station"
                    className="w-full bg-transparent text-peak-text text-sm outline-none placeholder-peak-text-secondary/50" />
                </div>
                <button onClick={useMyLocation} disabled={locationLoading}
                  className="mt-1.5 flex items-center gap-1 text-xs text-peak-blue hover:underline disabled:opacity-50">
                  <MapPin className="h-3 w-3" />{locationLoading ? "Detecting..." : "Use my location"}
                </button>
                {locationError && <p className="text-peak-red text-xs mt-1">{locationError}</p>}
                <div className="flex gap-1.5 mt-2 flex-wrap">
                  {["Airport", "City centre", "Train station", "Hotel delivery"].map(t => (
                    <button key={t} onClick={() => setLocationType(t)}
                      className={`px-2.5 py-1 text-xs rounded-lg border transition-colors ${locationType === t ? "bg-peak-blue/20 border-peak-blue/40 text-peak-blue" : "border-white/10 text-peak-text-secondary"}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs text-peak-text-secondary">Return location</label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" checked={sameReturn} onChange={e => setSameReturn(e.target.checked)} className="accent-peak-blue" />
                    <span className="text-xs text-peak-text-secondary">Same as pick-up</span>
                  </label>
                </div>
                <div className={`bg-peak-surface border border-white/10 rounded-xl px-4 py-3 ${sameReturn ? "opacity-50" : ""}`}>
                  <input value={sameReturn ? pickupVal : returnVal} onChange={e => setReturnVal(e.target.value)} disabled={sameReturn}
                    placeholder="Return location"
                    className="w-full bg-transparent text-peak-text text-sm outline-none placeholder-peak-text-secondary/50 disabled:cursor-not-allowed" />
                </div>
              </div>
            </div>

            {/* Row 2 — Dates + Times */}
            <div className="border-t border-white/5 pt-5 mb-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-peak-text-secondary mb-1.5">Pick-up date</label>
                  <DateRangePicker startDate={searchForm.pickupDate} endDate={null}
                    onStartChange={v => sf("pickupDate", v)} onEndChange={() => {}}
                    context="car" minStay={1} placeholder={{ start: "Pick-up date", end: "" }} />
                  <select value={searchForm.pickupTime} onChange={e => sf("pickupTime", e.target.value)}
                    className="mt-2 w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue">
                    {TIME_OPTIONS.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-peak-text-secondary mb-1.5">Return date</label>
                  <DateRangePicker startDate={searchForm.returnDate} endDate={null}
                    onStartChange={v => sf("returnDate", v)} onEndChange={() => {}}
                    context="car" minStay={1} placeholder={{ start: "Return date", end: "" }} />
                  <select value={searchForm.returnTime} onChange={e => sf("returnTime", e.target.value)}
                    className="mt-2 w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue">
                    {TIME_OPTIONS.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Row 3 — Driver details */}
            <div className="border-t border-white/5 pt-5 mb-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-peak-text-secondary mb-1.5">Driver age</label>
                  <select value={searchForm.driverAge} onChange={e => sf("driverAge", e.target.value)}
                    className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-3 text-sm text-peak-text outline-none focus:border-peak-blue">
                    {["18-20", "21-24", "25-29", "30+"].map(a => <option key={a}>{a}</option>)}
                  </select>
                  {isYoungDriver && <p className="text-yellow-400 text-xs mt-1">Young driver surcharges apply for under 25</p>}
                </div>
                <div>
                  <label className="block text-xs text-peak-text-secondary mb-1.5">Additional drivers</label>
                  <div className="flex items-center gap-3 bg-peak-surface border border-white/10 rounded-xl px-4 py-3">
                    <button onClick={() => sf("additionalDrivers", Math.max(0, searchForm.additionalDrivers - 1))} className="w-7 h-7 rounded border border-white/10 text-peak-text-secondary hover:text-peak-text text-lg flex items-center justify-center">-</button>
                    <span className="text-peak-text font-bold text-sm flex-1 text-center">{searchForm.additionalDrivers}</span>
                    <button onClick={() => sf("additionalDrivers", Math.min(3, searchForm.additionalDrivers + 1))} className="w-7 h-7 rounded border border-white/10 text-peak-text-secondary hover:text-peak-text text-lg flex items-center justify-center">+</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 4 — Vehicle preferences */}
            <div className="border-t border-white/5 pt-5 mb-5">
              <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-2">Vehicle preferences</p>
              <div className="flex flex-wrap gap-2">
                {VEHICLE_PREFS.map(p => (
                  <button key={p} onClick={() => togglePref(p)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${vehiclePrefs.includes(p) ? "bg-peak-blue/20 border-peak-blue/50 text-peak-blue" : "border-white/10 text-peak-text-secondary hover:text-peak-text"}`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Row 5 — Filter toggles */}
            <div className="border-t border-white/5 pt-4 flex flex-wrap gap-4">
              {[{ k: "freeCancel", l: "Free cancellation only" }, { k: "unlimited", l: "Unlimited mileage" }, { k: "fullToFull", l: "Full-to-full fuel only" }].map(({ k, l }) => (
                <label key={k} className="flex items-center gap-2 cursor-pointer">
                  <Checkbox checked={filters[k]} onCheckedChange={v => setFilters(f => ({ ...f, [k]: v }))}
                    className="border-peak-text-secondary data-[state=checked]:bg-peak-blue data-[state=checked]:border-peak-blue" />
                  <span className="text-xs text-peak-text-secondary">{l}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Winter alert */}
          <div className="bg-peak-blue/10 border border-peak-blue/20 rounded-xl p-3 flex items-center gap-3 mt-4">
            <AlertTriangle className="h-5 w-5 text-peak-blue flex-shrink-0" />
            <p className="text-peak-blue text-xs">For Alpine roads Dec-Apr, AWD or winter tyres are a minimum requirement. Snow chains may be legally required on certain mountain passes.</p>
          </div>

          <button onClick={() => setStep(1)} className="w-full py-4 bg-peak-red hover:bg-peak-red-hover text-white font-bold text-base rounded-xl transition-colors mt-4">
            Search vehicles
          </button>
        </div>
      )}

      {/* STEP 1 — Results */}
      {step === 1 && (
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
            <div>
              <span className="text-peak-text-secondary text-sm">{filtered.length} vehicles found</span>
              <span className="text-peak-text-secondary/60 text-xs ml-2">{pickupVal} · {pickupDays} day{pickupDays !== 1 ? "s" : ""} · {fmtDate(searchForm.pickupDate) || "-"} to {fmtDate(searchForm.returnDate) || "-"}</span>
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
                <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-2">Price/day: {"\u20ac"}{priceRange[0]}-{"\u20ac"}{priceRange[1]}</p>
                <RangeSlider value={priceRange} onValueChange={setPriceRange} min={0} max={250} step={5} formatLabel={n => '€' + n} />
              </div>
              {[{ state: filterWinter, set: setFilterWinter, label: "Winter-ready only" }, { state: filterAuto, set: setFilterAuto, label: "Automatic only" }].map(({ state, set, label }) => (
                <label key={label} className="flex items-center gap-2 cursor-pointer">
                  <Checkbox checked={state} onCheckedChange={set} className="border-peak-text-secondary data-[state=checked]:bg-peak-blue data-[state=checked]:border-peak-blue" />
                  <span className="text-sm text-peak-text-secondary">{label}</span>
                </label>
              ))}
            </div>

            {/* Car list */}
            <div className="flex-1 space-y-3">
              {filtered.map(car => (
                <div key={car.id}>
                  <div className={`bg-peak-card border rounded-2xl overflow-hidden hover:border-white/15 transition-all ${selectedCar?.id === car.id ? "border-peak-blue/40" : "border-white/5"}`}>
                    <div className="flex">
                      {/* Image strip */}
                      <div className="w-40 flex-shrink-0 relative">
                        <img src={`https://picsum.photos/seed/${car.name.replace(/\s/g, "")}/300/200`} alt={car.name} className="w-full h-full object-cover min-h-[140px]" />
                        <span className="absolute top-2 left-2 bg-peak-bg/80 backdrop-blur-sm text-peak-text text-xs font-semibold px-2 py-1 rounded-lg">{car.category}</span>
                        <span className={`absolute top-2 right-2 bg-peak-bg/80 backdrop-blur-sm text-xs font-semibold px-2 py-1 rounded-lg ${statusColor[car.status]}`}>{car.status}</span>
                      </div>

                      {/* Details */}
                      <div className="flex-1 p-4 flex gap-4">
                        <div className="flex-1">
                          <p className="font-display font-bold text-peak-text text-lg">{car.name}</p>
                          <p className="text-peak-text-secondary text-xs mb-2">{"★"} {car.rating} · {car.company} · {car.location}</p>
                          <div className="flex flex-wrap gap-1 text-peak-text-secondary text-xs mb-2">
                            <span>{car.seats} seats</span><span>·</span><span>{car.doors} doors</span><span>·</span><span>{car.boot} boot</span><span>·</span><span>{car.transmission}</span><span>·</span><span>{car.fuel}</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {car.winter.map(w => (
                              <span key={w} className="bg-peak-blue/20 text-peak-blue text-xs px-2 py-0.5 rounded-full">{w}</span>
                            ))}
                          </div>
                          <p className="text-peak-text-secondary text-xs mt-2">{car.mileage} · {car.fuel_policy} · {car.cancellation}</p>
                          {isYoungDriver && <p className="text-yellow-400 text-xs mt-1">+~15/day young driver surcharge applies</p>}
                        </div>

                        {/* Price column */}
                        <div className="w-36 flex-shrink-0 text-right flex flex-col justify-between">
                          <div>
                            <p className="font-display font-bold text-peak-text text-2xl">{"\u20ac"}{car.pricePerDay}</p>
                            <p className="text-peak-text-secondary text-xs">/day</p>
                            <p className="text-peak-text-secondary text-sm mt-0.5">{"\u20ac"}{car.pricePerDay * pickupDays} total</p>
                          </div>
                          <div>
                            <button onClick={() => { setSelectedCar(car); setStep(2); }}
                              className="w-full bg-peak-red hover:bg-peak-red-hover text-white text-xs font-semibold rounded-xl py-2.5 transition-colors flex items-center justify-center gap-1">
                              <ShoppingBag className="h-3 w-3" /> Select
                            </button>
                            <button onClick={() => setExpandedCar(expandedCar === car.id ? null : car.id)}
                              className="mt-1.5 text-xs text-peak-text-secondary hover:text-peak-text flex items-center justify-end gap-1 w-full">
                              {expandedCar === car.id ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                              Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {expandedCar === car.id && (
                      <div className="mx-4 mb-4 bg-peak-surface rounded-xl p-4 text-xs text-peak-text-secondary space-y-1">
                        <p><span className="text-peak-text font-medium">Included:</span> {car.included.join(", ")}</p>
                        <p><span className="text-peak-text font-medium">Mileage:</span> {car.mileage}</p>
                        <p><span className="text-peak-text font-medium">Fuel policy:</span> {car.fuel_policy}</p>
                        <p><span className="text-peak-text font-medium">Cancellation:</span> {car.cancellation}</p>
                        <p><span className="text-peak-text font-medium">Pick-up:</span> {car.locationDist}</p>
                        <p className="opacity-60 mt-1">CDW = collision damage waiver. TPL = third party liability.</p>
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
      {step === 2 && selectedCar && (
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-3">Optional add-ons</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {ADDONS_CAR.map(a => (
                <button key={a.key} onClick={() => setAddons(prev => prev.includes(a.key) ? prev.filter(k => k !== a.key) : [...prev, a.key])}
                  className={`flex items-center justify-between p-3 rounded-xl border text-left transition-colors ${addons.includes(a.key) ? "border-peak-blue/50 bg-peak-blue/10" : "border-white/10 bg-peak-card hover:border-white/20"}`}>
                  <span className={`text-sm ${addons.includes(a.key) ? "text-peak-text" : "text-peak-text-secondary"}`}>{a.label}</span>
                  <span className="text-xs text-peak-blue font-medium">{`+\u20ac${a.price}${a.unit}`}</span>
                </button>
              ))}
            </div>
            <div className="bg-peak-surface border border-white/5 rounded-xl p-3">
              <p className="text-peak-text-secondary text-xs">Seat selection is available at the rental desk at pick-up.</p>
            </div>
          </div>
          <CheckoutFlow
            totalPrice={totalPrice}
            planData={{ serviceKey: "car", name: `${selectedCar.name} — ${pickupDays} day rental`, destination: { label: pickupVal, type: "general" }, dates: { start: searchForm.pickupDate || null, end: searchForm.returnDate || null }, itemDetails: { vehicle: selectedCar.name, category: selectedCar.category, company: selectedCar.company, days: pickupDays }, estimatedPriceEUR: totalPrice }}
            summary={[
              { label: "Vehicle", value: selectedCar.name },
              { label: "Category", value: selectedCar.category },
              { label: "Pick-up", value: `${fmtDate(searchForm.pickupDate) || "TBD"} ${searchForm.pickupTime}` },
              { label: "Return", value: `${fmtDate(searchForm.returnDate) || "TBD"} ${searchForm.returnTime}` },
              { label: "Rental days", value: pickupDays },
              { label: "Location", value: selectedCar.location },
              { label: "Included", value: selectedCar.included.join(", ") },
            ]}
            guestFields={[
              { key: "name", label: "Full name (as on driving licence)", placeholder: "Jane Smith" },
              { key: "dob", label: "Date of birth", placeholder: "DD/MM/YYYY" },
              { key: "licence", label: "Driving licence number + country", placeholder: "e.g. SMITH123456 - UK" },
              { key: "email", label: "Email", placeholder: "jane@email.com", type: "email" },
              { key: "phone", label: "Phone number", placeholder: "+44 7700 900123" },
            ]}
            trustBadges={TRUST}
            onComplete={() => {
              onBook?.(`${selectedCar.name} — ${pickupDays} day rental · ${selectedCar.company}`, totalPrice, {
                vehicle: selectedCar.name, category: selectedCar.category,
                pickupDate: searchForm.pickupDate, returnDate: searchForm.returnDate, location: selectedCar.location,
              });
            }}
          />
        </div>
      )}
    </BookingShell>
  );
}