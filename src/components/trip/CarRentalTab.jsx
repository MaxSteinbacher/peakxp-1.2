import { useState, useMemo, useEffect } from "react";
import DateRangePicker, { fmtDate } from "../shared/DateRangePicker";
import { ArrowUpDown, AlertTriangle, MapPin, ChevronDown, ChevronUp, ShoppingBag } from "lucide-react";
import { useT } from "../../lib/i18n";
import LocationInput from "../shared/LocationInput";
import SavePlanButton from "./SavePlanButton";
import BookingShell from "./shared/BookingShell";
import CheckoutFlow from "./shared/CheckoutFlow";
import RangeSlider from "../shared/RangeSlider";
import { Checkbox } from "@/components/ui/checkbox";

const STEPS_KEYS = ["search_step", "results", "checkout_step"];
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

const RENTAL_COMPANIES_AIRPORT = ["Sixt","Hertz","Avis","Enterprise","Europcar","Budget"];
const RENTAL_COMPANIES_CITY = ["Europcar","Hertz","Avis","Local Rentals"];
const RENTAL_COMPANIES_STATION = ["Europcar","Sixt"];

const VEHICLE_TEMPLATES = [
  { name: "Volkswagen Golf", category: "Compact", seats: 5, doors: 5, boot: "Medium", fuel: "Petrol", basePpd: 45, winter: [], transmission: "Manual" },
  { name: "Seat Leon", category: "Compact", seats: 5, doors: 5, boot: "Medium", fuel: "Diesel", basePpd: 48, winter: [], transmission: "Manual" },
  { name: "Volkswagen Tiguan", category: "SUV", seats: 5, doors: 5, boot: "Large", fuel: "Diesel", basePpd: 75, winter: ["Winter tyres","4WD"], transmission: "Automatic" },
  { name: "Skoda Kodiaq", category: "SUV", seats: 7, doors: 5, boot: "Large", fuel: "Diesel", basePpd: 82, winter: ["Winter tyres","4WD"], transmission: "Automatic" },
  { name: "BMW X5", category: "Luxury", seats: 5, doors: 5, boot: "Large", fuel: "Diesel", basePpd: 140, winter: ["Winter tyres","4WD","Ski rack"], transmission: "Automatic" },
  { name: "Ford Galaxy", category: "Van", seats: 7, doors: 5, boot: "Very large", fuel: "Diesel", basePpd: 85, winter: ["Winter tyres"], transmission: "Manual" },
  { name: "Renault Zoe", category: "Compact", seats: 5, doors: 5, boot: "Medium", fuel: "Electric", basePpd: 55, winter: [], transmission: "Automatic" },
];

function generateCarResults(pickupLocation, pickupDate, returnDate, driverAge, prefs, days) {
  if (!pickupLocation) return [];
  const loc = pickupLocation.toLowerCase();
  const companies = loc.includes("airport") || /^[A-Z]{3}$/.test(pickupLocation.trim())
    ? RENTAL_COMPANIES_AIRPORT
    : loc.includes("station") ? RENTAL_COMPANIES_STATION : RENTAL_COMPANIES_CITY;
  const df = (() => { if (!pickupDate) return 1.0; const m = new Date(pickupDate).getMonth() + 1; return m === 12 ? 1.4 : (m === 1 || m === 2) ? 0.85 : 1.0; })();
  const youngDriver = driverAge && !driverAge.includes("25") && !driverAge.includes("30");
  const youngSurcharge = youngDriver ? 18 : 0;
  const wantAWD = prefs.includes("4WD / AWD") || prefs.includes("Snow-ready");
  const templates = wantAWD ? VEHICLE_TEMPLATES.filter(v => v.winter.some(w => w.includes("4WD"))) : VEHICLE_TEMPLATES;
  return templates.slice(0, Math.min(companies.length, 5)).map((tpl, i) => {
    const company = companies[i % companies.length];
    const ppd = Math.round((tpl.basePpd + youngSurcharge) * df * (0.9 + i * 0.05));
    return {
      id: `car${i}`, name: tpl.name, category: tpl.category, seats: tpl.seats, doors: tpl.doors,
      boot: tpl.boot, transmission: tpl.transmission, fuel: tpl.fuel, winter: tpl.winter,
      company, location: pickupLocation, locationDist: "On-site desk",
      pricePerDay: ppd, mileage: "Unlimited", fuel_policy: "Full-to-full",
      cancellation: i % 2 === 0 ? "Free cancellation" : "Non-refundable",
      included: ["CDW","TPL"], rating: 4.2 + Math.round(i * 0.15 * 10) / 10, status: i === 2 ? "Limited" : "Available",
    };
  });
}

export default function CarRentalTab({ agentServiceDetails = {}, onBook }) {
  const t = useT();
  const [step, setStep] = useState(0);
  const [pickupVal, setPickupVal] = useState("");
  const [sameReturn, setSameReturn] = useState(true);
  const [returnVal, setReturnVal] = useState("");
  const [pickupLocationData, setPickupLocationData] = useState(null);
  const [locationType, setLocationType] = useState("Airport");
  const [searchForm, setSearchForm] = useState({ pickupDate: null, pickupTime: "10:00", returnDate: null, returnTime: "10:00", driverAge: "25+", additionalDrivers: 0 });
  const [vehiclePrefs, setVehiclePrefs] = useState([]);
  const [filters, setFilters] = useState({ freeCancel: false, unlimited: false, fullToFull: false });

  const [sortBy, setSortBy] = useState("Recommended");
  const [priceRange, setPriceRange] = useState([0, 250]);
  const [filterWinter, setFilterWinter] = useState(false);
  const [filterAuto, setFilterAuto] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [expandedCar, setExpandedCar] = useState(null);
  const [addons, setAddons] = useState([]);
  const [preFilled, setPreFilled] = useState(false);
  const [carResults, setCarResults] = useState([]);

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

  function handlePickupSelect(s) {
    setPickupLocationData(s);
    setPickupVal(s.label);
    if (s.type === "airport") setLocationType("Airport");
    else if (s.type === "city" || s.type === "resort") setLocationType("Hotel delivery");
  }

  const pickupDays = useMemo(() => {
    if (!searchForm.pickupDate || !searchForm.returnDate) return 3;
    const diff = Math.round((new Date(searchForm.returnDate) - new Date(searchForm.pickupDate)) / 86400000);
    return Math.max(1, diff);
  }, [searchForm.pickupDate, searchForm.returnDate]);

  const filtered = useMemo(() => {
    let res = [...carResults];
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
    const [crLow, crHigh] = Array.isArray(priceRange) ? priceRange : [0, priceRange];
  res = res.filter(c => c.pricePerDay >= crLow && c.pricePerDay <= crHigh);
    if (sortBy === "Cheapest") res.sort((a, b) => a.pricePerDay - b.pricePerDay);
    else if (sortBy === "Best rated") res.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "Luxury first") res.sort((a, b) => b.pricePerDay - a.pricePerDay);
    return res;
  }, [carResults, filterWinter, filterAuto, filters, vehiclePrefs, priceRange, sortBy]);

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
    <BookingShell steps={STEPS_KEYS.map(k => t(k))} current={step} onBack={goBack}>
      {preFilled && (
        <div className="flex items-center gap-2 bg-peak-blue/10 border border-peak-blue/20 rounded-xl px-4 py-2.5 mb-4">
          <p className="text-peak-blue text-xs font-medium">{t('pre_filled_agent')}</p>
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
                <label className="block text-xs text-peak-text-secondary mb-1.5">{t('pickup_location')}</label>
                <LocationInput
                  type="general" context="pickup" placeholder={t("airport_placeholder")}
                  value={pickupVal} onChange={setPickupVal}
                  onSelect={handlePickupSelect}
                />
                <div className="flex gap-1.5 mt-2 flex-wrap">
                  {[{ key: "Airport", labelKey: "airport" }, { key: "City centre", labelKey: "city_centre" }, { key: "Train station", labelKey: "train_station" }, { key: "Hotel delivery", labelKey: "hotel_delivery" }].map(opt => (
                    <button key={opt.key} onClick={() => setLocationType(opt.key)}
                      className={`px-2.5 py-1 text-xs rounded-lg border transition-colors ${locationType === opt.key ? "bg-peak-blue/20 border-peak-blue/40 text-peak-blue" : "border-white/10 text-peak-text-secondary"}`}>
                      {t(opt.labelKey)}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs text-peak-text-secondary">{t('return_location')}</label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" checked={sameReturn} onChange={e => setSameReturn(e.target.checked)} className="accent-peak-blue" />
                    <span className="text-xs text-peak-text-secondary">{t('same_as_pickup')}</span>
                  </label>
                </div>
                {sameReturn ? (
                  <div className="bg-peak-surface border border-white/10 rounded-xl px-4 py-3 opacity-50">
                    <p className="text-peak-text text-sm">{pickupVal || t("same_as_pickup")}</p>
                  </div>
                ) : (
                  <LocationInput
                    type="general" context="dropoff" placeholder={t("return_location_placeholder")}
                    value={returnVal} onChange={setReturnVal}
                    onSelect={s => setReturnVal(s.label)}
                  />
                )}
              </div>
            </div>

            {/* Row 2 — Dates + Times */}
            <div className="border-t border-white/5 pt-5 mb-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-peak-text-secondary mb-1.5">{t('pickup_date')}</label>
                  <DateRangePicker startDate={searchForm.pickupDate} endDate={null}
                    onStartChange={v => sf("pickupDate", v)} onEndChange={() => {}}
                    context="car" minStay={1} placeholder={{ start: t("pickup_date"), end: "" }} />
                  <select value={searchForm.pickupTime} onChange={e => sf("pickupTime", e.target.value)}
                    className="mt-2 w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue">
                    {TIME_OPTIONS.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-peak-text-secondary mb-1.5">{t('return_date')}</label>
                  <DateRangePicker startDate={searchForm.returnDate} endDate={null}
                    onStartChange={v => sf("returnDate", v)} onEndChange={() => {}}
                    context="car" minStay={1} placeholder={{ start: t("return_date_car"), end: "" }} />
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
                  <label className="block text-xs text-peak-text-secondary mb-1.5">{t('driver_age')}</label>
                  <select value={searchForm.driverAge} onChange={e => sf("driverAge", e.target.value)}
                    className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-3 text-sm text-peak-text outline-none focus:border-peak-blue">
                    {["18-20", "21-24", "25-29", "30+"].map(a => <option key={a}>{a}</option>)}
                  </select>
                  {isYoungDriver && <p className="text-yellow-400 text-xs mt-1">Young driver surcharges apply for under 25</p>}
                </div>
                <div>
                  <label className="block text-xs text-peak-text-secondary mb-1.5">{t('additional_drivers')}</label>
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
              <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-2">{t("vehicle_preferences").toUpperCase()}</p>
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
              {[{ k: "freeCancel", l: t('free_cancellation_only') }, { k: "unlimited", l: t('unlimited_mileage') }, { k: "fullToFull", l: t("full_to_full") }].map(({ k, l }) => (
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

          <button onClick={() => { setCarResults(generateCarResults(pickupVal, searchForm.pickupDate, searchForm.returnDate, searchForm.driverAge, vehiclePrefs, pickupDays)); setStep(1); }} className="w-full py-4 bg-peak-red hover:bg-peak-red-hover text-white font-bold text-base rounded-xl transition-colors mt-4">
            {t('search_vehicles')}
          </button>
        </div>
      )}

      {/* STEP 1 — Results */}
      {step === 1 && (
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
            <div>
              {!pickupVal ? (
                <span className="text-peak-text-secondary text-sm">Please enter a pick-up location to search</span>
              ) : (
                <span className="text-peak-text-secondary text-sm">{filtered.length} {t('vehicles_found')} — {pickupVal} — {pickupDays} {t('day')}</span>
              )}
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
                <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-2">{t('price_per_day')}: €{priceRange[0]}–€{priceRange[1]}</p>
                <RangeSlider mode="dual" value={priceRange} onValueChange={setPriceRange} min={0} max={250} step={5} formatLabel={n => '€' + n} />
              </div>
              {[{ state: filterWinter, set: setFilterWinter, label: t('winter_ready_only') }, { state: filterAuto, set: setFilterAuto, label: t('automatic_only') }].map(({ state, set, label }) => (
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
                        <img src="https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/b769ca74c_image.png" alt={car.name} className="w-full h-full object-cover min-h-[140px]" />
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
                            <p className="text-peak-text-secondary text-xs">/{t('day')}</p>
                            <p className="text-peak-text-secondary text-sm mt-0.5">€{car.pricePerDay * pickupDays} {t('total').toLowerCase()}</p>
                          </div>
                          <div>
                            <button onClick={() => { setSelectedCar(car); setStep(2); }}
                              className="w-full bg-peak-red hover:bg-peak-red-hover text-white text-xs font-semibold rounded-xl py-2.5 transition-colors flex items-center justify-center gap-1">
                              <ShoppingBag className="h-3 w-3" /> {t('select_vehicle')}
                            </button>
                            <button onClick={() => setExpandedCar(expandedCar === car.id ? null : car.id)}
                              className="mt-1.5 text-xs text-peak-text-secondary hover:text-peak-text flex items-center justify-end gap-1 w-full">
                              {expandedCar === car.id ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                              {t('show_details')}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {expandedCar === car.id && (
                      <div className="mx-4 mb-4 bg-peak-surface rounded-xl p-4 text-xs text-peak-text-secondary space-y-1">
                        <p><span className="text-peak-text font-medium">{t("included_label")}</span> {car.included.join(", ")}</p>
                        <p><span className="text-peak-text font-medium">{t("mileage_label")}</span> {car.mileage}</p>
                        <p><span className="text-peak-text font-medium">{t("fuel_policy")}</span> {car.fuel_policy}</p>
                        <p><span className="text-peak-text font-medium">{t("cancellation_label")}</span> {car.cancellation}</p>
                        <p><span className="text-peak-text font-medium">{t("pickup_label")}</span> {car.locationDist}</p>
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
            <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-3">{t('optional_addons')}</p>
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