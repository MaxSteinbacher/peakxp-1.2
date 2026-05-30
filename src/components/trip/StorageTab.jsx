import { useState, useMemo, useEffect } from "react";
import DateRangePicker, { fmtDate } from "../shared/DateRangePicker";
import { MapPin, ArrowUpDown } from "lucide-react";
import { useT } from "../../lib/i18n";
import LocationInput from "../shared/LocationInput";
import SavePlanButton from "./SavePlanButton";
import BookingShell from "./shared/BookingShell";
import ResultCard from "./shared/ResultCard";
import CheckoutFlow from "./shared/CheckoutFlow";
import RangeSlider from "../shared/RangeSlider";
import { Checkbox } from "@/components/ui/checkbox";

const STEPS_KEYS = ["location_step", "specifications", "choose_shop", "checkout_step"];
const SORT_OPTIONS = ["Closest to lifts", "Cheapest", "Best rated", "Most availability"];

const ITEMS = [
  { key: "skis", label: "Skis + poles", icon: "🎿" },
  { key: "snowboard", label: "Snowboard", icon: "🏂" },
  { key: "boots", label: "Boots", icon: "👢" },
  { key: "helmet", label: "Helmet", icon: "⛑" },
  { key: "backpack", label: "Backpack / day bag", icon: "🎒" },
  { key: "luggage", label: "Luggage / suitcase", icon: "🧳" },
  { key: "valuables", label: "Valuables (padlocked)", icon: "🔒" },
  { key: "pushchair", label: "Pushchair / stroller", icon: "🍼" },
];

const FACILITIES = [
  {
    id: "st1", name: "Verbier Main Station — Ski Locker Hall", image: "https://picsum.photos/seed/storage1/600/400",
    rating: 4.7, reviews: 312, type: "Train station", typeBadge: "Train station",
    distLift: "80m from Medran gondola", distAccom: "200m from town centre",
    sizes: ["S: 30x30x120cm", "M: 40x35x150cm", "L: 60x40x180cm — fits skis + boots", "XL: 80x60x200cm"],
    payment: ["Pay now", "Pay at venue"], hours: "07:00–20:00 daily",
    pricePerDay: 12, status: "Available",
    amenities: ["CCTV", "Heated", "Drying rack", "Attendant on-site"],
  },
  {
    id: "st2", name: "Alpine Storage — Rue du Lac, Le Chable", image: "https://picsum.photos/seed/storage2/600/400",
    rating: 4.4, reviews: 178, type: "Village centre", typeBadge: "Village centre",
    distLift: "350m from cable car", distAccom: "On main street",
    sizes: ["M: 40x35x150cm", "L: 60x40x180cm", "XL: 80x60x200cm"],
    payment: ["Pay now", "Reserve free, pay later"], hours: "08:00–19:00 daily",
    pricePerDay: 9, status: "Available",
    amenities: ["CCTV", "Heated", "Ski boot dryer"],
  },
  {
    id: "st3", name: "Medran Gondola Base — Slope-side Lockers", image: "https://picsum.photos/seed/storage3/600/400",
    rating: 4.9, reviews: 521, type: "Slope-side", typeBadge: "Slope-side",
    distLift: "Slope-side — 10m from turnstiles", distAccom: "600m from village",
    sizes: ["S: 30x30x120cm", "M: 40x35x150cm", "L: 60x40x180cm"],
    payment: ["Pay now"], hours: "07:30–18:30 daily",
    pricePerDay: 15, status: "Limited",
    amenities: ["CCTV", "Heated", "Drying rack", "Charging points", "Ski boot dryer", "Attendant on-site"],
  },
  {
    id: "st4", name: "Hotel Les Roches — Guest Storage", image: "https://picsum.photos/seed/storage4/600/400",
    rating: 4.6, reviews: 89, type: "Hotel", typeBadge: "Hotel",
    distLift: "420m from main lift", distAccom: "In-hotel",
    sizes: ["L: 60x40x180cm", "XL: 80x60x200cm"],
    payment: ["Pay at venue", "Reserve free, pay later"], hours: "24h access",
    pricePerDay: 10, status: "Available",
    amenities: ["CCTV", "Heated"],
  },
];

const TRUST = [
  { icon: "ShieldCheck", label: "Instant booking confirmation" },
  { icon: "ShieldCheck", label: "Access code sent to phone" },
  { icon: "RefreshCw", label: "Free cancellation up to 2h before" },
  { icon: "Lock", label: "SSL secured" },
];

const DURATION_OPTIONS = ["Half day", "Full day", "Multi-day", "Weekly", "Season locker"];

export default function StorageTab({ agentServiceDetails = {}, onBook }) {
  const t = useT();
  const [step, setStep] = useState(0);
  const [location, setLocation] = useState("");
  const [locating, setLocating] = useState(false);
  const [areaTypes, setAreaTypes] = useState([]);
  const [prefs, setPrefs] = useState({ duration: "Full day", startDate: "", startTime: "08:00", endDate: "", endTime: "18:00", items: [], lockers: 1, accessible: false });
  const [seasonForm, setSeasonForm] = useState({ name: "", email: "", resort: "", size: "L", startSeason: "", endSeason: "" });
  const [seasonSubmitted, setSeasonSubmitted] = useState(false);
  const [sortBy, setSortBy] = useState("Closest to lifts");
  const [priceRange, setPriceRange] = useState([0, 30]);
  const [filterTypes, setFilterTypes] = useState([]);
  const [filterAmenities, setFilterAmenities] = useState([]);
  const [filterFreeCancel, setFilterFreeCancel] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [preFilled, setPreFilled] = useState(false);

  useEffect(() => {
    const sd = agentServiceDetails?.storage;
    if (!sd) return;
    const durMap = { "daily-lockers": "Full day", "trip-storage": "Multi-day" };
    if (sd.type && durMap[sd.type]) setPrefs(p => ({ ...p, duration: durMap[sd.type] }));
    setPreFilled(true);
  }, []);

  const needsEndDate = ["Multi-day", "Weekly"].includes(prefs.duration);
  const rentalDays = useMemo(() => {
    if (prefs.duration === "Half day") return 0.5;
    if (prefs.duration === "Full day") return 1;
    if (prefs.duration === "Weekly") return 7;
    if (prefs.duration === "Season locker") return 120;
    if (needsEndDate && prefs.startDate && prefs.endDate) {
      const d = Math.round((new Date(prefs.endDate) - new Date(prefs.startDate)) / 86400000);
      return Math.max(1, d);
    }
    return 1;
  }, [prefs.duration, prefs.startDate, prefs.endDate]);

  const filtered = useMemo(() => {
    let res = [...FACILITIES];
    if (filterTypes.length) res = res.filter(f => filterTypes.includes(f.type));
    if (filterAmenities.length) res = res.filter(f => filterAmenities.every(a => f.amenities.includes(a)));
    if (filterFreeCancel) res = res.filter(f => f.payment.includes("Reserve free, pay later"));
    res = res.filter(f => f.pricePerDay >= priceRange[0] && f.pricePerDay <= priceRange[1]);
    if (sortBy === "Cheapest") res.sort((a, b) => a.pricePerDay - b.pricePerDay);
    if (sortBy === "Best rated") res.sort((a, b) => b.rating - a.rating);
    return res;
  }, [filterTypes, filterAmenities, filterFreeCancel, priceRange, sortBy]);

  const toggleItem = (k) => setPrefs(p => ({ ...p, items: p.items.includes(k) ? p.items.filter(x => x !== k) : [...p.items, k] }));
  const toggleAreaType = (t) => setAreaTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  const toggleFilterType = (t) => setFilterTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  const toggleAmenity = (a) => setFilterAmenities(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);

  function goBack() { if (step > 0) setStep(s => s - 1); }

  // Season locker enquiry path
  if (prefs.duration === "Season locker" && step === 2) {
    if (seasonSubmitted) return (
      <div className="max-w-md mx-auto text-center py-16">
        <div className="w-16 h-16 rounded-full bg-peak-green/20 flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">✓</span>
        </div>
        <h2 className="font-display font-bold text-2xl text-peak-text mb-2">Enquiry received!</h2>
        <p className="text-peak-text-secondary text-sm">We'll be in touch within 24h to confirm your season locker.</p>
      </div>
    );
    return (
      <BookingShell steps={STEPS_KEYS.map(k => t(k))} current={Math.min(step, STEPS_KEYS.length - 1)} onBack={goBack}>
        <div className="max-w-lg">
          <h2 className="font-display font-bold text-2xl text-peak-text mb-2">Season locker enquiry</h2>
          <p className="text-peak-text-secondary text-sm mb-6">Fill in the form below and we'll confirm availability within 24h.</p>
          <div className="bg-peak-card border border-white/5 rounded-xl p-6 space-y-4">
            {[{ key: "name", label: "Full name", placeholder: "Jane Smith" }, { key: "email", label: "Email", placeholder: "jane@email.com" }, { key: "resort", label: "Resort", placeholder: "e.g. Verbier" }].map(f => (
              <div key={f.key}>
                <label className="block text-xs text-peak-text-secondary mb-1">{f.label}</label>
                <input value={seasonForm[f.key]} onChange={e => setSeasonForm(s => ({ ...s, [f.key]: e.target.value }))} placeholder={f.placeholder}
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
              </div>
            ))}
            <div>
              <label className="block text-xs text-peak-text-secondary mb-1">Preferred locker size</label>
              <div className="flex gap-2">
                {["S", "M", "L", "XL"].map(sz => (
                  <button key={sz} onClick={() => setSeasonForm(s => ({ ...s, size: sz }))}
                    className={`px-4 py-2 text-sm font-medium rounded-xl border transition-colors ${seasonForm.size === sz ? "bg-peak-blue/20 border-peak-blue/50 text-peak-blue" : "border-white/10 text-peak-text-secondary"}`}>
                    {sz}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs text-peak-text-secondary mb-1">Season dates</label>
              <DateRangePicker
                startDate={seasonForm.startSeason} endDate={seasonForm.endSeason}
                onStartChange={v => setSeasonForm(s => ({ ...s, startSeason: v }))} onEndChange={v => setSeasonForm(s => ({ ...s, endSeason: v }))}
                mode="range" context="storage" maxStay={365}
                placeholder={{ start: "Season start", end: "Season end" }}
              />
            </div>
          </div>
          <button onClick={() => setSeasonSubmitted(true)} className="mt-6 w-full py-3 bg-peak-red hover:bg-peak-red-hover text-white font-display font-bold text-sm rounded-xl transition-colors">
            Submit enquiry
          </button>
        </div>
      </BookingShell>
    );
  }

  return (
    <BookingShell steps={STEPS_KEYS.map(k => t(k))} current={Math.min(step, STEPS_KEYS.length - 1)} onBack={goBack}>
      {preFilled && (
        <div className="flex items-center gap-2 bg-peak-blue/10 border border-peak-blue/20 rounded-xl px-4 py-2.5 mb-4">
          <p className="text-peak-blue text-xs font-medium">{t('pre_filled_agent')}</p>
        </div>
      )}

      {/* STEP 0 — Location */}
      {step === 0 && (
        <div className="max-w-2xl">
          <h2 className="font-display font-bold text-2xl text-peak-text mb-1">Where are you skiing?</h2>
          <p className="text-peak-text-secondary text-sm mb-6">We'll find storage and locker facilities near you.</p>
          <div className="bg-peak-card border border-white/5 rounded-xl p-6 mb-6 space-y-4">
            <button onClick={() => {
              if (!navigator.geolocation) return;
              setLocating(true);
              navigator.geolocation.getCurrentPosition(async ({ coords }) => {
                try {
                  const res = await fetch(`https://api.maptiler.com/geocoding/${coords.longitude},${coords.latitude}.json?key=lNsV1pOMdNShmVL9tiih`);
                  const data = await res.json();
                  setLocation(data.features?.[0]?.context?.find(c => c.id?.startsWith("place"))?.text || data.features?.[0]?.place_name?.split(",")[0] || "Current location");
                } catch { setLocation("Current location"); }
                setLocating(false);
              }, () => setLocating(false));
            }} disabled={locating}
              className="flex items-center gap-2 text-peak-blue text-sm font-medium hover:underline disabled:opacity-50">
              <MapPin className="h-4 w-4" />
              {locating ? "Detecting location..." : t('use_my_location')}
            </button>
            <div>
              <label className="block text-xs text-peak-text-secondary mb-1">Or enter your ski area, resort, or nearby town</label>
              <LocationInput
                type="resort" context="destination" placeholder="e.g. Verbier, Zermatt, Chamonix"
                value={location} onChange={setLocation}
                onSelect={s => setLocation(s.label || s.name || s.city)}
              />
            </div>
            {location && (
              <div className="bg-peak-surface border border-white/5 rounded-xl px-4 py-3 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-peak-blue flex-shrink-0" />
                <p className="text-sm text-peak-text">Showing storage near <strong>{location}</strong> — {FACILITIES.length} options found</p>
              </div>
            )}
          </div>
          <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-3">Storage location type</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {[
              { key: "station", label: "At the ski station", desc: "Slope-side or lift building lockers" },
              { key: "town", label: "In town / village", desc: "Nearby commercial storage, hotels, luggage facilities" },
            ].map(opt => (
              <button key={opt.key} onClick={() => toggleAreaType(opt.key)}
                className={`flex flex-col items-start gap-1 p-5 rounded-xl border text-left transition-all ${areaTypes.includes(opt.key) ? "border-peak-blue/50 bg-peak-blue/10" : "border-white/10 bg-peak-card hover:border-white/25"}`}>
                <p className={`font-semibold text-sm ${areaTypes.includes(opt.key) ? "text-peak-blue" : "text-peak-text"}`}>{opt.label}</p>
                <p className="text-peak-text-secondary text-xs">{opt.desc}</p>
              </button>
            ))}
          </div>
          <button onClick={() => setStep(1)} disabled={!location}
            className="px-8 py-3 bg-peak-red hover:bg-peak-red-hover disabled:opacity-40 text-white font-display font-bold text-sm rounded-xl transition-colors">
            {t('continue')}
          </button>
        </div>
      )}

      {/* STEP 1 — Preferences */}
      {step === 1 && (
        <div className="max-w-2xl">
          <h2 className="font-display font-bold text-2xl text-peak-text mb-1">Storage preferences</h2>
          <p className="text-peak-text-secondary text-sm mb-6">Tell us what you need to store and for how long.</p>
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-2">Duration</p>
              <div className="flex flex-wrap gap-2">
                {DURATION_OPTIONS.map(d => (
                  <button key={d} onClick={() => setPrefs(p => ({ ...p, duration: d }))}
                    className={`px-4 py-2 text-sm font-medium rounded-xl border transition-colors ${prefs.duration === d ? "bg-peak-blue/20 border-peak-blue/50 text-peak-blue" : "border-white/10 text-peak-text-secondary hover:text-peak-text"}`}>
                    {d}
                  </button>
                ))}
              </div>
              {prefs.duration === "Season locker" && (
                <p className="mt-2 text-xs text-peak-blue bg-peak-blue/10 border border-peak-blue/20 rounded-lg px-3 py-2">
                  Season lockers are subject to availability — you'll complete an enquiry form in the next step.
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs text-peak-text-secondary mb-1">{needsEndDate ? "Start + end dates" : "Date"}</label>
              <DateRangePicker
                startDate={prefs.startDate} endDate={needsEndDate ? prefs.endDate : null}
                onStartChange={v => setPrefs(p => ({ ...p, startDate: v }))} onEndChange={v => setPrefs(p => ({ ...p, endDate: v }))}
                mode={needsEndDate ? "range" : "single"} context="storage"
                placeholder={{ start: "Start date", end: "End date" }}
              />
            </div>
            <div>
              <label className="block text-xs text-peak-text-secondary mb-1">Start time</label>
              <select value={prefs.startTime} onChange={e => setPrefs(p => ({ ...p, startTime: e.target.value }))}
                className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue">
                {Array.from({ length: 48 }, (_, i) => { const h = Math.floor(i / 2).toString().padStart(2, "0"); const m = i % 2 === 0 ? "00" : "30"; return `${h}:${m}`; }).map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            {(prefs.duration === "Half day" || prefs.duration === "Full day" || needsEndDate) && (
              <div>
                <label className="block text-xs text-peak-text-secondary mb-1">End time</label>
                <select value={prefs.endTime} onChange={e => setPrefs(p => ({ ...p, endTime: e.target.value }))}
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue">
                  {Array.from({ length: 48 }, (_, i) => { const h = Math.floor(i / 2).toString().padStart(2, "0"); const m = i % 2 === 0 ? "00" : "30"; return `${h}:${m}`; }).map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            )}
            <div>
              <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-3">What are you storing?</p>
              <div className="flex flex-wrap gap-2">
                {ITEMS.map(item => (
                  <button key={item.key} onClick={() => toggleItem(item.key)}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl border transition-colors ${prefs.items.includes(item.key) ? "bg-peak-blue/20 border-peak-blue/50 text-peak-blue" : "border-white/10 text-peak-text-secondary hover:text-peak-text"}`}>
                    <span>{item.icon}</span> {item.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-2">Number of lockers / spaces needed</p>
              <div className="flex items-center gap-4">
                <button onClick={() => setPrefs(p => ({ ...p, lockers: Math.max(1, p.lockers - 1) }))} className="w-10 h-10 rounded-xl border border-white/10 text-peak-text-secondary hover:text-peak-text text-xl">-</button>
                <span className="text-3xl font-display font-bold text-peak-text w-8 text-center">{prefs.lockers}</span>
                <button onClick={() => setPrefs(p => ({ ...p, lockers: Math.min(10, p.lockers + 1) }))} className="w-10 h-10 rounded-xl border border-white/10 text-peak-text-secondary hover:text-peak-text text-xl">+</button>
              </div>
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <Checkbox checked={prefs.accessible} onCheckedChange={v => setPrefs(p => ({ ...p, accessible: v }))}
                className="border-peak-text-secondary data-[state=checked]:bg-peak-blue data-[state=checked]:border-peak-blue" />
              <span className="text-sm text-peak-text-secondary">Accessibility needed — ground floor / wide access</span>
            </label>
          </div>
          <button onClick={() => setStep(2)} className="mt-8 w-full py-3 bg-peak-red hover:bg-peak-red-hover text-white font-display font-bold text-sm rounded-xl transition-colors">
            {t('search')}
          </button>
        </div>
      )}

      {/* STEP 2 — Listings */}
      {step === 2 && (
        <div>
          <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
            <div className="flex gap-2 overflow-x-auto hide-scrollbar">
              {SORT_OPTIONS.map(opt => (
                <button key={opt} onClick={() => setSortBy(opt)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border whitespace-nowrap transition-colors ${sortBy === opt ? "bg-peak-red/20 border-peak-red/40 text-peak-red" : "border-white/10 text-peak-text-secondary hover:text-peak-text"}`}>
                  <ArrowUpDown className="h-3 w-3" />{opt}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-8">
            <div className="hidden lg:block w-56 flex-shrink-0 space-y-5">
              <div>
                <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-2">Price/day: {"\u20ac" + priceRange[0]}–{"\u20ac" + priceRange[1]}</p>
                <RangeSlider value={priceRange} onValueChange={setPriceRange} min={0} max={30} step={1} formatLabel={n => '€' + n} />
              </div>
              <div>
                <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-2">Location type</p>
                {["Slope-side", "Village centre", "Train station", "Hotel"].map(t => (
                  <label key={t} className="flex items-center gap-2 cursor-pointer mb-2">
                    <Checkbox checked={filterTypes.includes(t)} onCheckedChange={() => toggleFilterType(t)}
                      className="border-peak-text-secondary data-[state=checked]:bg-peak-blue data-[state=checked]:border-peak-blue" />
                    <span className="text-sm text-peak-text-secondary">{t}</span>
                  </label>
                ))}
              </div>
              <div>
                <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-2">Amenities</p>
                {["CCTV", "Heated", "Drying rack", "Ski boot dryer", "Charging points"].map(a => (
                  <label key={a} className="flex items-center gap-2 cursor-pointer mb-2">
                    <Checkbox checked={filterAmenities.includes(a)} onCheckedChange={() => toggleAmenity(a)}
                      className="border-peak-text-secondary data-[state=checked]:bg-peak-blue data-[state=checked]:border-peak-blue" />
                    <span className="text-sm text-peak-text-secondary">{a}</span>
                  </label>
                ))}
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox checked={filterFreeCancel} onCheckedChange={setFilterFreeCancel}
                  className="border-peak-text-secondary data-[state=checked]:bg-peak-blue data-[state=checked]:border-peak-blue" />
                <span className="text-sm text-peak-text-secondary">Free reservation</span>
              </label>
            </div>
            <div className="flex-1">
              <p className="text-peak-text-secondary text-sm mb-4">{filtered.length} {t('facilities_found')} {location}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filtered.map(fac => (
                  <ResultCard
                    key={fac.id}
                    image={fac.image}
                    title={fac.name}
                    rating={fac.rating}
                    reviewCount={fac.reviews}
                    meta={[
                      fac.distLift,
                      `${fac.distAccom}  ·  ${fac.hours}`,
                      `Payment: ${fac.payment.join(" / ")}`,
                      `Amenities: ${fac.amenities.join(" · ")}`,
                    ]}
                    badges={[{ label: fac.typeBadge, style: "text-peak-blue border-peak-blue/40" }]}
                    price={"\u20ac" + fac.pricePerDay}
                    priceLabel="/ day"
                    priceSubline={"\u20ac" + Math.round(fac.pricePerDay * rentalDays * prefs.lockers) + " total (" + prefs.lockers + " locker" + (prefs.lockers > 1 ? "s" : "") + ")"}
                    status={fac.status}
                    selected={selectedFacility?.id === fac.id}
                    onSelect={() => setSelectedFacility(fac)}
                    cta="Reserve"
                    expandContent={
                      <div className="text-xs text-peak-text-secondary space-y-2">
                        <p className="font-medium text-peak-text">Size guide</p>
                        {fac.sizes.map(s => <p key={s}>{s}</p>)}
                        <p className="font-medium text-peak-text mt-2">Cancellation</p>
                        <p>Free cancellation up to 2h before start time.</p>
                        <p className="font-medium text-peak-text mt-2">Directions</p>
                        <p>See map at reception or follow the PeakXP signs from the main lift.</p>
                        <p className="font-medium text-peak-text mt-2">Recent reviews</p>
                        {["Great location, heated — really useful!", "Exactly what we needed after a long ski day.", "Clean and secure. Will use again."].map(r => <p key={r} className="border-l-2 border-white/10 pl-2">{r}</p>)}
                      </div>
                    }
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 flex gap-3">
            <button onClick={() => setStep(3)} disabled={!selectedFacility}
              className="flex-1 py-3 bg-peak-red hover:bg-peak-red-hover disabled:opacity-40 text-white font-display font-bold text-sm rounded-xl transition-colors">
              {t('continue')}
            </button>
            {selectedFacility && (
              <SavePlanButton planData={{ serviceKey: "storage", name: `${selectedFacility.name} — ${prefs.duration}`, destination: { label: location, type: "general" }, dates: { start: prefs.startDate || null, end: prefs.endDate || null }, itemDetails: { facility: selectedFacility.name, duration: prefs.duration, lockers: prefs.lockers }, estimatedPriceEUR: Math.round(selectedFacility.pricePerDay * rentalDays * prefs.lockers) }} />
            )}
          </div>
        </div>
      )}

      {/* STEP 3 — Checkout */}
      {step === 3 && (
        <CheckoutFlow
          totalPrice={selectedFacility ? Math.round(selectedFacility.pricePerDay * rentalDays * prefs.lockers) : 0}
          planData={{ serviceKey: "storage", name: `${selectedFacility?.name} — ${prefs.duration}`, destination: { label: location, type: "general" }, dates: { start: prefs.startDate || null, end: prefs.endDate || null }, itemDetails: { facility: selectedFacility?.name, duration: prefs.duration, lockers: prefs.lockers }, estimatedPriceEUR: selectedFacility ? Math.round(selectedFacility.pricePerDay * rentalDays * prefs.lockers) : 0 }}
          summary={[
            { label: "Facility", value: selectedFacility?.name },
            { label: "Type", value: selectedFacility?.typeBadge },
            { label: "Duration", value: prefs.duration },
            { label: "Start", value: `${fmtDate(prefs.startDate) || "TBD"} ${prefs.startTime}` },
            { label: "End", value: `${fmtDate(prefs.endDate) || "TBD"} ${prefs.endTime}` },
            { label: "Lockers", value: prefs.lockers },
            { label: "Items", value: prefs.items.map(k => ITEMS.find(i => i.key === k)?.label).filter(Boolean).join(", ") || "Not specified" },
          ]}
          guestFields={[
            { key: "name", label: "Full name", placeholder: "Jane Smith" },
            { key: "email", label: "Email", placeholder: "jane@email.com" },
            { key: "phone", label: "Phone number (for access code)", placeholder: "+44 7700 900123" },
            { key: "instructions", label: "Special instructions (optional)", placeholder: "e.g. Arriving at 08:30, need ground-floor access" },
          ]}
          trustBadges={TRUST}
          onComplete={() => {
            const price = selectedFacility ? Math.round(selectedFacility.pricePerDay * rentalDays * prefs.lockers) : 0;
            onBook?.(`${selectedFacility?.name} — ${prefs.duration} · ${prefs.lockers} locker${prefs.lockers > 1 ? "s" : ""}`, price, { facility: selectedFacility?.name, duration: prefs.duration, lockers: prefs.lockers });
          }}
        />
      )}
    </BookingShell>
  );
}