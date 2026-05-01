import { useState, useMemo } from "react";
import DateRangePicker, { fmtDate } from "../shared/DateRangePicker";
import { ArrowUpDown, X } from "lucide-react";
import BookingShell from "./shared/BookingShell";
import ResultCard from "./shared/ResultCard";
import CheckoutFlow from "./shared/CheckoutFlow";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

const STEPS = ["Location", "Search", "Vehicles", "Checkout"];
const SORT_OPTIONS = ["Cheapest", "Best rated", "Recommended", "Largest boot", "Luxury first"];

const MOCK_CARS = [
  { id: "car1", name: "Volkswagen Tiguan", category: "SUV", image: "https://picsum.photos/seed/car1/600/400", seats: 5, doors: 5, boot: "Large", transmission: "Automatic", fuel: "Diesel", winter: ["Winter tyres", "4WD"], company: "Sixt", location: "Geneva Airport", locationDist: "On-site desk", pricePerDay: 78, mileage: "Unlimited", fuel_policy: "Full-to-full", cancellation: "Free cancellation", included: ["CDW", "TPL"], rating: 4.7, status: "Available" },
  { id: "car2", name: "Renault Zoe Electric", category: "Compact", image: "https://picsum.photos/seed/car2/600/400", seats: 5, doors: 5, boot: "Medium", transmission: "Automatic", fuel: "Electric", winter: [], company: "Europcar", location: "Geneva City Centre", locationDist: "2km from airport", pricePerDay: 55, mileage: "Unlimited", fuel_policy: "Full-to-full", cancellation: "Free cancellation", included: ["CDW"], rating: 4.3, status: "Available" },
  { id: "car3", name: "Porsche Cayenne", category: "Luxury", image: "https://picsum.photos/seed/car3/600/400", seats: 5, doors: 5, boot: "Large", transmission: "Automatic", fuel: "Petrol", winter: ["Winter tyres", "4WD", "Ski rack"], company: "Hertz", location: "Zurich Airport", locationDist: "On-site desk", pricePerDay: 195, mileage: "500 km/day", fuel_policy: "Full-to-empty", cancellation: "Non-refundable", included: ["CDW", "TPL", "Theft"], rating: 4.9, status: "Available" },
  { id: "car4", name: "Ford Galaxy", category: "Van", image: "https://picsum.photos/seed/car4/600/400", seats: 7, doors: 5, boot: "Very large", transmission: "Manual", fuel: "Diesel", winter: ["Winter tyres"], company: "Avis", location: "Lyon Airport", locationDist: "On-site desk", pricePerDay: 89, mileage: "Unlimited", fuel_policy: "Full-to-full", cancellation: "Free cancellation", included: ["CDW", "TPL"], rating: 4.5, status: "Limited" },
];

const VEHICLE_PREFS = ["Snow-ready", "4WD / AWD", "Automatic", "Manual", "Ski rack included", "Snow chains included", "Large boot", "7-seater", "Electric / Hybrid", "Prestige / Luxury"];

const ADDONS_CAR = [
  { key: "gps", label: "GPS navigation", price: 8, unit: "/day" },
  { key: "child_seat", label: "Child seat", price: 7, unit: "/day" },
  { key: "add_driver", label: "Additional driver", price: 12, unit: "/day" },
  { key: "full_protect", label: "Full protection (zero excess)", price: 18, unit: "/day" },
  { key: "fuel", label: "Prepaid fuel (return empty)", price: 45, unit: " flat" },
  { key: "roadside", label: "Roadside assistance premium", price: 6, unit: "/day" },
  { key: "ski_rack", label: "Ski rack", price: 12, unit: "/day" },
  { key: "chains", label: "Snow chains", price: 25, unit: " flat" },
];

const TRUST = [
  { icon: "ShieldCheck", label: "Free cancellation on most vehicles" },
  { icon: "ShieldCheck", label: "No hidden fees" },
  { icon: "RefreshCw", label: "Winter-ready vehicles verified" },
  { icon: "Lock", label: "SSL secured" },
];

const TIME_OPTIONS = Array.from({ length: 48 }, (_, i) => {
  const h = Math.floor(i / 2).toString().padStart(2, "0");
  const m = i % 2 === 0 ? "00" : "30";
  return `${h}:${m}`;
});

export default function CarRentalTab() {
  const [step, setStep] = useState(0);
  const [departureLocation, setDepartureLocation] = useState("");
  const [sameReturn, setSameReturn] = useState(true);
  const [returnLocation, setReturnLocation] = useState("");
  const [searchForm, setSearchForm] = useState({ pickup: "", dropoff: "", pickupDate: "", pickupTime: "10:00", returnDate: "", returnTime: "10:00", driverAge: "25+", additionalDrivers: 0 });
  const [vehiclePrefs, setVehiclePrefs] = useState([]);
  const [sortBy, setSortBy] = useState("Recommended");
  const [priceRange, setPriceRange] = useState([0, 250]);
  const [filterWinter, setFilterWinter] = useState(false);
  const [filterAuto, setFilterAuto] = useState(false);
  const [filterFreeCancel, setFilterFreeCancel] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [addons, setAddons] = useState([]);
  const [winterDismissed, setWinterDismissed] = useState(false);

  const sf = (field, val) => setSearchForm(f => ({ ...f, [field]: val }));
  const togglePref = (p) => setVehiclePrefs(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);

  const pickupDays = useMemo(() => {
    if (!searchForm.pickupDate || !searchForm.returnDate) return 3;
    const diff = Math.round((new Date(searchForm.returnDate) - new Date(searchForm.pickupDate)) / 86400000);
    return Math.max(1, diff);
  }, [searchForm.pickupDate, searchForm.returnDate]);

  const filtered = useMemo(() => {
    let res = [...MOCK_CARS];
    if (filterWinter) res = res.filter(c => c.winter.length > 0);
    if (filterAuto) res = res.filter(c => c.transmission === "Automatic");
    if (filterFreeCancel) res = res.filter(c => c.cancellation === "Free cancellation");
    res = res.filter(c => c.pricePerDay >= priceRange[0] && c.pricePerDay <= priceRange[1]);
    if (sortBy === "Cheapest") res.sort((a, b) => a.pricePerDay - b.pricePerDay);
    else if (sortBy === "Best rated") res.sort((a, b) => b.rating - a.rating);
    return res;
  }, [filterWinter, filterAuto, filterFreeCancel, priceRange, sortBy]);

  const addonsTotal = addons.reduce((sum, k) => {
    const a = ADDONS_CAR.find(x => x.key === k);
    if (!a) return sum;
    return sum + (a.unit.includes("/day") ? a.price * pickupDays : a.price);
  }, 0);
  const totalPrice = selectedCar ? (selectedCar.pricePerDay * pickupDays) + addonsTotal : 0;

  const locationSuggestion = departureLocation ? {
    locations: `12 locations near ${departureLocation} — airport desk, city centre, train station`,
    drive: "~2h30 to Verbier from Geneva Airport",
    note: "Snow chains or 4WD recommended — Dec to Mar",
  } : null;

  function goBack() { if (step > 0) setStep(s => s - 1); }

  return (
    <BookingShell steps={STEPS} current={step} onBack={goBack}>

      {/* STEP 0 */}
      {step === 0 && (
        <div className="max-w-2xl">
          <h2 className="font-display font-bold text-2xl text-peak-text mb-1">Find the right car, ready when you land.</h2>
          <p className="text-peak-text-secondary text-sm mb-6">We'll find rental locations near your home airport or departure point — ski-ready vehicles prioritised.</p>
          <div className="bg-peak-card border border-white/5 rounded-xl p-6 mb-6 space-y-4">
            <div>
              <label className="block text-xs text-peak-text-secondary mb-1">Your departure airport or city</label>
              <input value={departureLocation} onChange={e => setDepartureLocation(e.target.value)} placeholder="e.g. Geneva, Zurich, Lyon"
                className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
              <button onClick={() => setDepartureLocation("My location")} className="mt-1.5 text-xs text-peak-blue hover:underline">Use my location</button>
            </div>
            {locationSuggestion && (
              <div className="bg-peak-surface border border-white/5 rounded-xl p-4 space-y-2 text-sm">
                <p className="text-peak-text-secondary text-xs">Rental locations near <span className="text-peak-text">{departureLocation}</span>:</p>
                <p className="text-peak-text">{locationSuggestion.locations}</p>
                <p className="text-peak-text-secondary text-xs">Drive time to resort: <span className="text-peak-text">{locationSuggestion.drive}</span></p>
                <p className="text-peak-blue text-xs">Ski road note: {locationSuggestion.note}</p>
              </div>
            )}
            <div>
              <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-2">Same return location?</p>
              <div className="flex gap-2">
                {["Yes", "No"].map(opt => (
                  <button key={opt} onClick={() => setSameReturn(opt === "Yes")}
                    className={`px-5 py-2 text-sm font-medium rounded-xl border transition-colors ${(sameReturn ? "Yes" : "No") === opt ? "bg-peak-blue/20 border-peak-blue/50 text-peak-blue" : "border-white/10 text-peak-text-secondary"}`}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            {!sameReturn && (
              <div>
                <label className="block text-xs text-peak-text-secondary mb-1">Return location</label>
                <input value={returnLocation} onChange={e => setReturnLocation(e.target.value)} placeholder="e.g. Lyon Airport"
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
              </div>
            )}
          </div>
          <button onClick={() => setStep(1)} disabled={!departureLocation}
            className="px-8 py-3 bg-peak-red hover:bg-peak-red-hover disabled:opacity-40 text-white font-display font-bold text-sm rounded-xl transition-colors">
            Continue
          </button>
        </div>
      )}

      {/* STEP 1 */}
      {step === 1 && (
        <div className="max-w-2xl">
          <h2 className="font-display font-bold text-2xl text-peak-text mb-6">Search cars</h2>
          {searchForm.driverAge !== "25+" && (
            <div className="flex items-center gap-2 mb-4 bg-yellow-400/10 border border-yellow-400/20 rounded-xl px-4 py-2.5">
              <p className="text-xs text-yellow-400">Young driver surcharges may apply. Eligible vehicles are shown below.</p>
            </div>
          )}
          <div className="bg-peak-card border border-white/5 rounded-xl p-6 space-y-4 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-peak-text-secondary mb-1">Pick-up location</label>
                <input value={searchForm.pickup || departureLocation} onChange={e => sf("pickup", e.target.value)}
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
                <select className="mt-2 w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2 text-sm text-peak-text outline-none focus:border-peak-blue">
                  {["Airport", "City centre", "Train station", "Hotel delivery"].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-peak-text-secondary mb-1">Return location</label>
                <input value={sameReturn ? (searchForm.pickup || departureLocation) : returnLocation} disabled={sameReturn}
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue disabled:opacity-50" />
              </div>
            </div>
            <div>
              <label className="block text-xs text-peak-text-secondary mb-1">Pick-up + return dates</label>
              <DateRangePicker
                startDate={searchForm.pickupDate} endDate={searchForm.returnDate}
                onStartChange={v => sf("pickupDate", v)} onEndChange={v => sf("returnDate", v)}
                context="car" minStay={1}
                placeholder={{ start: "Pick-up date", end: "Return date" }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-peak-text-secondary mb-1">Pick-up time</label>
                <select value={searchForm.pickupTime} onChange={e => sf("pickupTime", e.target.value)}
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2 text-sm text-peak-text outline-none focus:border-peak-blue">
                  {TIME_OPTIONS.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-peak-text-secondary mb-1">Return time</label>
                <select value={searchForm.returnTime} onChange={e => sf("returnTime", e.target.value)}
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2 text-sm text-peak-text outline-none focus:border-peak-blue">
                  {TIME_OPTIONS.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-peak-text-secondary mb-1">Driver age</label>
                <select value={searchForm.driverAge} onChange={e => sf("driverAge", e.target.value)}
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue">
                  {["18–20", "21–24", "25+"].map(a => <option key={a}>{a}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-peak-text-secondary mb-1">Additional drivers</label>
                <div className="flex items-center gap-3 mt-1">
                  <button onClick={() => sf("additionalDrivers", Math.max(0, searchForm.additionalDrivers - 1))} className="w-9 h-9 rounded-lg border border-white/10 text-peak-text-secondary hover:text-peak-text text-lg flex items-center justify-center">-</button>
                  <span className="text-peak-text font-bold">{searchForm.additionalDrivers}</span>
                  <button onClick={() => sf("additionalDrivers", Math.min(3, searchForm.additionalDrivers + 1))} className="w-9 h-9 rounded-lg border border-white/10 text-peak-text-secondary hover:text-peak-text text-lg flex items-center justify-center">+</button>
                </div>
              </div>
            </div>
            <div>
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
          </div>
          <button onClick={() => setStep(2)} className="w-full py-3 bg-peak-red hover:bg-peak-red-hover text-white font-display font-bold text-sm rounded-xl transition-colors">
            Search cars
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div>
          {!winterDismissed && (
            <div className="flex items-center gap-3 mb-4 bg-peak-blue/10 border border-peak-blue/20 rounded-xl px-4 py-2.5">
              <p className="text-xs text-peak-blue flex-1">For Alpine roads Dec–Apr, we recommend AWD or winter tyres as a minimum. Snow chains may be legally required on certain mountain passes.</p>
              <button onClick={() => setWinterDismissed(true)} className="text-peak-blue hover:text-peak-text transition-colors flex-shrink-0"><X className="h-4 w-4" /></button>
            </div>
          )}
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
                <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-2">Price/day: {"\u20ac" + priceRange[0]}-{"\u20ac" + priceRange[1]}</p>
                <Slider value={priceRange} onValueChange={setPriceRange} min={0} max={250} step={5}
                  className="[&_[role=slider]]:bg-peak-blue [&_[role=slider]]:border-peak-blue [&_.bg-primary]:bg-peak-blue" />
              </div>
              {[{ state: filterWinter, set: setFilterWinter, label: "Winter-ready only" }, { state: filterAuto, set: setFilterAuto, label: "Automatic only" }, { state: filterFreeCancel, set: setFilterFreeCancel, label: "Free cancellation" }].map(({ state, set, label }) => (
                <label key={label} className="flex items-center gap-2 cursor-pointer">
                  <Checkbox checked={state} onCheckedChange={set} className="border-peak-text-secondary data-[state=checked]:bg-peak-blue data-[state=checked]:border-peak-blue" />
                  <span className="text-sm text-peak-text-secondary">{label}</span>
                </label>
              ))}
            </div>
            <div className="flex-1">
              <p className="text-peak-text-secondary text-sm mb-4">{filtered.length} vehicles found - {pickupDays} day rental</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filtered.map(car => (
                  <ResultCard
                    key={car.id}
                    image={car.image}
                    title={car.name}
                    rating={car.rating}
                    meta={[
                      `${car.seats} seats · ${car.doors} doors · ${car.boot} boot · ${car.transmission} · ${car.fuel}`,
                      car.winter.length > 0 ? car.winter.join("  ") : "Standard vehicle",
                      `${car.company}  ·  ${car.location}  (${car.locationDist})`,
                      `${car.mileage}  ·  ${car.fuel_policy}  ·  ${car.cancellation}`,
                      `Included: ${car.included.join(", ")}`,
                    ]}
                    badges={[{ label: car.category, style: "text-peak-text-secondary border-white/20" }]}
                    price={"\u20ac" + car.pricePerDay}
                    priceLabel="/ day"
                    priceSubline={"\u20ac" + (car.pricePerDay * pickupDays) + " total"}
                    status={car.status}
                    selected={selectedCar?.id === car.id}
                    onSelect={() => setSelectedCar(car)}
                    cta="Select vehicle"
                    expandContent={
                      <div className="text-xs text-peak-text-secondary space-y-1">
                        <p>Transmission: {car.transmission}</p>
                        <p>Fuel type: {car.fuel}</p>
                        <p>Cancellation: {car.cancellation}</p>
                        <p>Mileage: {car.mileage}</p>
                      </div>
                    }
                  />
                ))}
              </div>
            </div>
          </div>
          <button onClick={() => setStep(3)} disabled={!selectedCar}
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
              {ADDONS_CAR.map(a => (
                <button key={a.key} onClick={() => setAddons(prev => prev.includes(a.key) ? prev.filter(k => k !== a.key) : [...prev, a.key])}
                  className={`flex items-center justify-between p-3 rounded-xl border text-left transition-colors ${addons.includes(a.key) ? "border-peak-blue/50 bg-peak-blue/10" : "border-white/10 bg-peak-card"}`}>
                  <span className={`text-sm ${addons.includes(a.key) ? "text-peak-text" : "text-peak-text-secondary"}`}>{a.label}</span>
                  <span className="text-xs text-peak-blue font-medium">{"+\u20ac" + a.price + a.unit}</span>
                </button>
              ))}
            </div>
          </div>
          <CheckoutFlow
            totalPrice={totalPrice}
            summary={[
              { label: "Vehicle", value: selectedCar?.name },
              { label: "Category", value: selectedCar?.category },
              { label: "Pick-up", value: `${fmtDate(searchForm.pickupDate) || "TBD"} ${searchForm.pickupTime}` },
              { label: "Return", value: `${fmtDate(searchForm.returnDate) || "TBD"} ${searchForm.returnTime}` },
              { label: "Rental days", value: pickupDays },
              { label: "Location", value: selectedCar?.location },
              { label: "Included", value: selectedCar?.included.join(", ") },
            ]}
            guestFields={[
              { key: "name", label: "Full name (as on driving licence)", placeholder: "Jane Smith" },
              { key: "dob", label: "Date of birth", placeholder: "DD/MM/YYYY" },
              { key: "licence", label: "Driving licence number + country", placeholder: "e.g. SMITH123456 — UK" },
              { key: "email", label: "Email", placeholder: "jane@email.com", type: "email" },
              { key: "phone", label: "Phone number", placeholder: "+44 7700 900123" },
            ]}
            trustBadges={TRUST}
          />
        </div>
      )}
    </BookingShell>
  );
}