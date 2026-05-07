import { useState, useMemo, useEffect } from "react";
import { MapPin, Star, ChevronDown, ChevronUp, X, ExternalLink } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

const STEPS = ["Location", "Restaurants", "Reserve"];
const SORT_OPTIONS = ["Recommended", "Closest to lifts", "Highest rated", "Price: low to high", "Open now first"];
const PRICE_RANGE = ["€", "€€", "€€€", "€€€€"];

const RESTAURANTS = [
  {
    id: "r1", name: "Le Carve — Verbier Summit", image: "https://picsum.photos/seed/dining1/600/400",
    cuisines: ["Alpine", "Swiss", "International"], rating: 4.8, reviews: 284, source: "Based on 284 reviews",
    location: "Slope-side — 2100m", distLift: "10m from Mont-Fort gondola",
    priceRange: "€€€", openNow: true, opensAt: "11:30", closesAt: "16:30",
    moments: ["Lunch on the slopes", "Après-ski"], highlights: ["Panoramic view", "Terrace", "Gluten-free menu"],
    bookingStatus: "Available today", verified: true,
  },
  {
    id: "r2", name: "Chez Marie — Le Chable", image: "https://picsum.photos/seed/dining2/600/400",
    cuisines: ["French", "Swiss"], rating: 4.6, reviews: 193, source: "Based on 193 reviews",
    location: "Village centre, Le Chable", distLift: "400m from cable car station",
    priceRange: "€€", openNow: true, opensAt: "12:00", closesAt: "22:00",
    moments: ["Lunch on the slopes", "Dinner"], highlights: ["Fireplace", "Kid-friendly", "Live music Fridays"],
    bookingStatus: "Walk-ins welcome", verified: false,
  },
  {
    id: "r3", name: "Après All — Verbier Village", image: "https://picsum.photos/seed/dining3/600/400",
    cuisines: ["International", "Swiss"], rating: 4.5, reviews: 420, source: "Based on 420 reviews",
    location: "Village centre, Verbier", distLift: "200m from main lift",
    priceRange: "€€", openNow: true, opensAt: "15:00", closesAt: "01:00",
    moments: ["Après-ski", "Dinner", "Late night"], highlights: ["Live music", "Terrace", "Panoramic view"],
    bookingStatus: "Available today", verified: true,
  },
  {
    id: "r4", name: "Berghaus Altitude 2400", image: "https://picsum.photos/seed/dining4/600/400",
    cuisines: ["Alpine", "International"], rating: 4.7, reviews: 156, source: "Based on 156 reviews",
    location: "Slope-side — 2400m", distLift: "Ski-in ski-out",
    priceRange: "€€€", openNow: false, opensAt: "11:30", closesAt: "15:30",
    moments: ["Lunch on the slopes", "Breakfast"], highlights: ["Panoramic view", "Terrace", "Gluten-free menu"],
    bookingStatus: "Fully booked", verified: true,
  },
  {
    id: "r5", name: "La Strada — Verbier", image: "https://picsum.photos/seed/dining5/600/400",
    cuisines: ["Italian", "International"], rating: 4.4, reviews: 98, source: "Based on 98 reviews",
    location: "Village centre, Verbier", distLift: "350m from main lift",
    priceRange: "€€", openNow: true, opensAt: "19:00", closesAt: "23:00",
    moments: ["Dinner"], highlights: ["Private dining", "Vegetarian-friendly", "Kid-friendly"],
    bookingStatus: "Available today", verified: false,
  },
];

const FULL_MENU = {
  Starters: [
    { name: "Fondue au gruyere (for 2)", price: 28 },
    { name: "Raclette with pickles", price: 18 },
    { name: "Soupe a l'oignon gratinee", price: 12 },
  ],
  Mains: [
    { name: "Filet de boeuf frites", price: 38 },
    { name: "Tartiflette savoyarde", price: 22 },
    { name: "Truite fumee du lac", price: 28 },
    { name: "Risotto aux champignons (V)", price: 24 },
  ],
  Desserts: [
    { name: "Coupe de glace maison", price: 9 },
    { name: "Tarte tatin", price: 11 },
  ],
  Drinks: [
    { name: "Vin chaud (mulled wine)", price: 7 },
    { name: "Biere locale 50cl", price: 8 },
    { name: "Cidre breton", price: 7 },
  ],
};

function PriceSymbol({ level }) {
  return (
    <span className="text-xs">
      {PRICE_RANGE.map((s, i) => (
        <span key={i} className={PRICE_RANGE.indexOf(level) >= i ? "text-peak-text" : "text-peak-text-secondary/30"}>{s}</span>
      ))}
    </span>
  );
}

function ReservationPanel({ restaurant, onClose }) {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [partySize, setPartySize] = useState(2);
  const [seating, setSeating] = useState(null);
  const [requests, setRequests] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const timeSlots = [];
  for (let h = 12; h <= 21; h++) {
    timeSlots.push(`${h.toString().padStart(2, "0")}:00`);
    timeSlots.push(`${h.toString().padStart(2, "0")}:30`);
  }

  const unavailableSlots = ["13:00", "13:30", "20:00"];

  if (confirmed) return (
    <div className="bg-peak-card border border-white/10 rounded-2xl p-6 text-center">
      <div className="w-12 h-12 rounded-full bg-peak-green/20 flex items-center justify-center mx-auto mb-3">
        <span className="text-xl">✓</span>
      </div>
      <h3 className="font-display font-bold text-xl text-peak-text mb-1">Table reserved!</h3>
      <p className="text-peak-text-secondary text-sm mb-3">Booking reference: <span className="text-peak-text font-mono font-bold">PXP-{Math.random().toString(36).slice(2, 8).toUpperCase()}</span></p>
      <div className="bg-peak-surface rounded-xl p-4 text-sm space-y-1 mb-4 text-left">
        <p><span className="text-peak-text-secondary">Restaurant:</span> <span className="text-peak-text">{restaurant.name}</span></p>
        <p><span className="text-peak-text-secondary">Date:</span> <span className="text-peak-text">{date}</span></p>
        <p><span className="text-peak-text-secondary">Time:</span> <span className="text-peak-text">{selectedTime}</span></p>
        <p><span className="text-peak-text-secondary">Party size:</span> <span className="text-peak-text">{partySize}</span></p>
      </div>
      <button onClick={onClose} className="text-peak-blue text-sm hover:underline">Close</button>
    </div>
  );

  return (
    <div className="bg-peak-card border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-lg text-peak-text">Reserve a table</h3>
        <button onClick={onClose} className="text-peak-text-secondary hover:text-peak-text transition-colors"><X className="h-5 w-5" /></button>
      </div>
      <p className="text-peak-text-secondary text-sm mb-4">{restaurant.name}</p>
      <div className="space-y-4">
        <div>
          <label className="block text-xs text-peak-text-secondary mb-1">Date</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)}
            className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
        </div>
        <div>
          <label className="block text-xs text-peak-text-secondary mb-2">Time</label>
          <div className="flex flex-wrap gap-2">
            {timeSlots.map(t => {
              const unavail = unavailableSlots.includes(t);
              return (
                <button key={t} onClick={() => !unavail && setSelectedTime(t)} disabled={unavail}
                  className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${unavail ? "opacity-30 cursor-not-allowed border-white/5 text-peak-text-secondary" : selectedTime === t ? "bg-peak-red text-white border-peak-red" : "border-white/10 text-peak-text-secondary hover:text-peak-text hover:border-white/25"}`}>
                  {t}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <label className="block text-xs text-peak-text-secondary mb-1">Party size</label>
          <div className="flex items-center gap-4">
            <button onClick={() => setPartySize(Math.max(1, partySize - 1))} className="w-9 h-9 rounded-lg border border-white/10 text-peak-text-secondary hover:text-peak-text text-xl flex items-center justify-center">-</button>
            <span className="text-2xl font-display font-bold text-peak-text w-6 text-center">{partySize}</span>
            <button onClick={() => setPartySize(Math.min(20, partySize + 1))} className="w-9 h-9 rounded-lg border border-white/10 text-peak-text-secondary hover:text-peak-text text-xl flex items-center justify-center">+</button>
          </div>
          {partySize >= 10 && <p className="mt-1.5 text-xs text-peak-blue">For large groups, the restaurant will confirm within 24h.</p>}
        </div>
        <div>
          <label className="block text-xs text-peak-text-secondary mb-2">Seating preference (optional)</label>
          <div className="flex flex-wrap gap-2">
            {["Inside", "Terrace", "Bar", "Private room"].map(s => (
              <button key={s} onClick={() => setSeating(seating === s ? null : s)}
                className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${seating === s ? "bg-peak-blue/20 border-peak-blue/50 text-peak-blue" : "border-white/10 text-peak-text-secondary hover:text-peak-text"}`}>
                {s}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs text-peak-text-secondary mb-1">Special requests (optional)</label>
          <input value={requests} onChange={e => setRequests(e.target.value)} placeholder="Allergies, high chair, anniversary..."
            className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
        </div>
        <div className="border-t border-white/5 pt-4 space-y-3">
          {[{ val: name, set: setName, label: "Full name", placeholder: "Jane Smith" }, { val: email, set: setEmail, label: "Email", placeholder: "jane@email.com" }, { val: phone, set: setPhone, label: "Phone", placeholder: "+44 7700 900123" }].map(f => (
            <div key={f.label}>
              <label className="block text-xs text-peak-text-secondary mb-1">{f.label}</label>
              <input value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.placeholder}
                className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
            </div>
          ))}
        </div>
        <button onClick={() => setConfirmed(true)} disabled={!selectedTime || !name || !email}
          className="w-full py-3 bg-peak-red hover:bg-peak-red-hover disabled:opacity-40 text-white font-display font-bold text-sm rounded-xl transition-colors">
          Reserve table
        </button>
      </div>
    </div>
  );
}

function RestaurantCard({ restaurant, onReserve }) {
  const [expanded, setExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-peak-card border border-white/5 rounded-2xl overflow-hidden hover:border-white/15 transition-all">
      <div className="relative h-48 overflow-hidden">
        <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
        {restaurant.verified && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-peak-blue/90 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            ✓ Partner
          </div>
        )}
        <div className={`absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full ${restaurant.bookingStatus === "Fully booked" ? "bg-peak-red/80 text-white" : restaurant.bookingStatus === "Walk-ins welcome" ? "bg-peak-green/80 text-white" : "bg-white/10 text-peak-text"}`}>
          {restaurant.bookingStatus}
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-display font-bold text-peak-text text-lg leading-tight mb-1">{restaurant.name}</h3>
            <div className="flex items-center gap-2 mb-1">
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                <span className="text-peak-text text-sm font-medium">{restaurant.rating}</span>
                <span className="text-peak-text-secondary text-xs">({restaurant.reviews})</span>
              </div>
              <PriceSymbol level={restaurant.priceRange} />
            </div>
            <div className="flex flex-wrap gap-1 mb-2">
              {restaurant.cuisines.map(c => (
                <span key={c} className="text-xs text-peak-blue border border-peak-blue/30 px-2 py-0.5 rounded-full">{c}</span>
              ))}
            </div>
          </div>
        </div>
        <p className="text-xs text-peak-text-secondary mb-1">{restaurant.location}</p>
        <p className={`text-xs font-medium mb-2 ${restaurant.openNow ? "text-peak-green" : "text-peak-text-secondary"}`}>
          {restaurant.openNow ? `Open now — closes ${restaurant.closesAt}` : `Closed — opens ${restaurant.opensAt}`}
        </p>
        <div className="flex flex-wrap gap-1 mb-3">
          {restaurant.moments.map(m => (
            <span key={m} className="text-xs bg-white/5 text-peak-text-secondary px-2 py-0.5 rounded-full border border-white/10">{m}</span>
          ))}
        </div>
        <div className="flex flex-wrap gap-1 mb-4">
          {restaurant.highlights.map(h => (
            <span key={h} className="text-xs bg-peak-blue/10 text-peak-blue px-2 py-0.5 rounded-full">{h}</span>
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={onReserve}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-colors ${restaurant.bookingStatus === "Fully booked" ? "opacity-40 cursor-not-allowed bg-peak-text-secondary text-peak-bg" : "bg-peak-red hover:bg-peak-red-hover text-white"}`}
            disabled={restaurant.bookingStatus === "Fully booked"}>
            Reserve a table
          </button>
          <button onClick={() => setMenuOpen(m => !m)}
            className="flex-1 py-2.5 text-sm font-medium rounded-xl border border-white/10 text-peak-text-secondary hover:text-peak-text transition-colors">
            View menu
          </button>
        </div>
        {menuOpen && (
          <div className="mt-4 border-t border-white/5 pt-4">
            {Object.entries(FULL_MENU).map(([section, items]) => (
              <div key={section} className="mb-3">
                <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-1">{section}</p>
                {items.map(item => (
                  <div key={item.name} className="flex justify-between text-xs text-peak-text-secondary py-1 border-b border-white/5">
                    <span>{item.name}</span>
                    <span className="text-peak-text">{"\u20ac"}{item.price}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        <button onClick={() => setExpanded(e => !e)} className="w-full flex items-center justify-center gap-1 mt-3 text-xs text-peak-text-secondary hover:text-peak-text transition-colors">
          {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          {expanded ? "Hide" : "Show"} full details
        </button>
        {expanded && (
          <div className="mt-3 border-t border-white/5 pt-3 space-y-3 text-xs text-peak-text-secondary">
            <p>One of the Alps' most iconic dining spots, combining breathtaking panoramic views with exceptional local cuisine. Fresh ingredients sourced daily from valley farms.</p>
            <div className="flex gap-2">
              {[1, 2, 3].map(i => (
                <img key={i} src={`https://picsum.photos/seed/diningphoto${restaurant.id}${i}/200/150`} alt="" className="w-20 h-14 rounded-lg object-cover" />
              ))}
            </div>
            <div>
              <p className="font-semibold text-peak-text mb-1">Rating breakdown</p>
              {[["Food", 4.9], ["Service", 4.7], ["Atmosphere", 4.8], ["Value", 4.4]].map(([cat, score]) => (
                <div key={cat} className="flex items-center gap-2 mb-1">
                  <span className="w-20">{cat}</span>
                  <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${(score / 5) * 100}%` }} />
                  </div>
                  <span className="text-peak-text">{score}</span>
                </div>
              ))}
            </div>
            <p className="font-semibold text-peak-text">{restaurant.distLift}</p>
            <div className="flex gap-3">
              <button className="flex items-center gap-1 text-peak-blue hover:underline"><MapPin className="h-3 w-3" /> Directions</button>
              <button className="flex items-center gap-1 text-peak-blue hover:underline"><ExternalLink className="h-3 w-3" /> Website</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DiningTab({ agentServiceDetails = {} }) {
  const [step, setStep] = useState(0);
  const [location, setLocation] = useState("");
  const [locating, setLocating] = useState(false);
  const [areas, setAreas] = useState([]);
  const [mealMoments, setMealMoments] = useState([]);
  const [sortBy, setSortBy] = useState("Recommended");
  const [reservingFor, setReservingFor] = useState(null);
  const [popularFilters, setPopularFilters] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [priceFilter, setPriceFilter] = useState([]);
  const [openNowOnly, setOpenNowOnly] = useState(false);
  const [preFilled, setPreFilled] = useState(false);

  useEffect(() => {
    const sd = agentServiceDetails?.dining;
    if (!sd) return;
    if (Array.isArray(sd.types)) {
      const areaArr = [];
      const momentArr = [];
      sd.types.forEach(t => {
        if (t === "mountain") areaArr.push("mountain");
        if (t === "valley") areaArr.push("valley");
        if (t === "apres-ski") { if (!areaArr.includes("valley")) areaArr.push("valley"); momentArr.push("Apres-ski"); }
      });
      if (areaArr.length) setAreas([...new Set(areaArr)]);
      if (momentArr.length) setMealMoments(momentArr);
    }
    setPreFilled(true);
  }, []);

  const toggleArea = (a) => setAreas(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);
  const toggleMoment = (m) => setMealMoments(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]);
  const togglePop = (f) => setPopularFilters(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);
  const togglePrice = (p) => setPriceFilter(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);

  function useMyLocation() {
    setLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async ({ coords }) => {
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`);
          const data = await res.json();
          setLocation(data.address?.city || data.address?.town || data.address?.village || "Current location");
        } catch { setLocation("Current location"); }
        setLocating(false);
      }, () => { setLocating(false); });
    } else setLocating(false);
  }

  const filtered = useMemo(() => {
    let res = [...RESTAURANTS];
    if (openNowOnly) res = res.filter(r => r.openNow);
    if (mealMoments.length) res = res.filter(r => mealMoments.some(m => r.moments.includes(m)));
    if (priceFilter.length) res = res.filter(r => priceFilter.includes(r.priceRange));
    if (minRating > 0) res = res.filter(r => r.rating >= minRating);
    if (popularFilters.includes("Open now")) res = res.filter(r => r.openNow);
    if (popularFilters.includes("Panoramic view")) res = res.filter(r => r.highlights.includes("Panoramic view"));
    if (popularFilters.includes("Terrace")) res = res.filter(r => r.highlights.includes("Terrace"));
    if (popularFilters.includes("Kid-friendly")) res = res.filter(r => r.highlights.includes("Kid-friendly"));
    if (sortBy === "Highest rated") res.sort((a, b) => b.rating - a.rating);
    if (sortBy === "Open now first") res.sort((a, b) => (b.openNow ? 1 : 0) - (a.openNow ? 1 : 0));
    return res;
  }, [openNowOnly, mealMoments, priceFilter, minRating, popularFilters, sortBy]);

  function goBack() { if (step > 0) setStep(s => s - 1); }

  return (
    <div>
      {/* Minimal step indicator for dining (3 steps but step 2 is inline) */}
      <div className="flex items-center gap-0 mb-4">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${i < step ? "bg-peak-red border-peak-red text-white" : i === step ? "border-peak-red text-peak-red bg-transparent" : "border-white/20 text-peak-text-secondary"}`}>
                {i < step ? "✓" : i + 1}
              </div>
              <span className={`text-xs whitespace-nowrap ${i === step ? "text-peak-text" : "text-peak-text-secondary"}`}>{label}</span>
            </div>
            {i < STEPS.length - 1 && <div className={`flex-1 h-px mx-2 mb-4 ${i < step ? "bg-peak-red" : "bg-white/10"}`} />}
          </div>
        ))}
      </div>
      <p className="text-peak-text-secondary text-xs mb-6">Step {step + 1} of {STEPS.length} — {STEPS[step]}</p>
      {preFilled && (
        <div className="flex items-center gap-2 bg-peak-blue/10 border border-peak-blue/20 rounded-xl px-4 py-2.5 mb-4">
          <p className="text-peak-blue text-xs font-medium">Pre-filled from your agent conversation — review and adjust if needed</p>
        </div>
      )}
      {step > 0 && (
        <button onClick={goBack} className="flex items-center gap-1.5 text-peak-text-secondary hover:text-peak-text text-sm mb-6 transition-colors">
          ← Back
        </button>
      )}

      {/* STEP 0 — Location */}
      {step === 0 && (
        <div className="max-w-2xl">
          <h2 className="font-display font-bold text-2xl text-peak-text mb-1">Where are you eating?</h2>
          <p className="text-peak-text-secondary text-sm mb-6">We'll show restaurants near you on the mountain and in the valley.</p>
          <div className="bg-peak-card border border-white/5 rounded-xl p-6 mb-6 space-y-4">
            <button onClick={useMyLocation} disabled={locating} className="flex items-center gap-2 text-peak-blue text-sm font-medium hover:underline">
              <MapPin className="h-4 w-4" />{locating ? "Detecting..." : "Use my location"}
            </button>
            <div>
              <label className="block text-xs text-peak-text-secondary mb-1">Or enter a resort, village, or town</label>
              <input value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. Verbier, Zermatt, Chamonix"
                className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
            </div>
          </div>
          <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-3">Area scope</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {[
              { key: "mountain", label: "On the mountain", desc: "Slope-side restaurants, mountain huts, summit cafes" },
              { key: "valley", label: "In the valley", desc: "Village restaurants, town dining, apres-ski venues, hotel restaurants" },
            ].map(opt => (
              <button key={opt.key} onClick={() => toggleArea(opt.key)}
                className={`flex flex-col items-start gap-1 p-5 rounded-xl border text-left transition-all ${areas.includes(opt.key) ? "border-peak-blue/50 bg-peak-blue/10" : "border-white/10 bg-peak-card hover:border-white/25"}`}>
                <p className={`font-semibold text-sm ${areas.includes(opt.key) ? "text-peak-blue" : "text-peak-text"}`}>{opt.label}</p>
                <p className="text-peak-text-secondary text-xs">{opt.desc}</p>
              </button>
            ))}
          </div>
          <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-2">Meal moment</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {["Breakfast", "Lunch on the slopes", "Apres-ski", "Dinner", "Late night"].map(m => (
              <button key={m} onClick={() => toggleMoment(m)}
                className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors ${mealMoments.includes(m) ? "bg-peak-blue/20 border-peak-blue/50 text-peak-blue" : "border-white/10 text-peak-text-secondary hover:text-peak-text"}`}>
                {m}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(1)} disabled={!location}
            className="w-full py-3 bg-peak-red hover:bg-peak-red-hover disabled:opacity-40 text-white font-display font-bold text-sm rounded-xl transition-colors">
            Show restaurants
          </button>
        </div>
      )}

      {/* STEP 1 — Results */}
      {step === 1 && (
        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            {["Open now", "Panoramic view", "Terrace", "Apres-ski", "Vegetarian", "Kid-friendly"].map(f => (
              <button key={f} onClick={() => togglePop(f)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${popularFilters.includes(f) ? "bg-peak-red/20 border-peak-red/40 text-peak-red" : "border-white/10 text-peak-text-secondary hover:text-peak-text"}`}>
                {f}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 mb-4 overflow-x-auto hide-scrollbar">
            {SORT_OPTIONS.map(opt => (
              <button key={opt} onClick={() => setSortBy(opt)}
                className={`flex items-center gap-1 px-3 py-2 text-xs font-medium rounded-lg border whitespace-nowrap transition-colors ${sortBy === opt ? "bg-peak-blue/20 border-peak-blue/40 text-peak-blue" : "border-white/10 text-peak-text-secondary hover:text-peak-text"}`}>
                {opt}
              </button>
            ))}
          </div>
          <div className="flex gap-8">
            <div className="hidden lg:block w-56 flex-shrink-0 space-y-5">
              <div>
                <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-2">Price range</p>
                <div className="flex gap-1">
                  {PRICE_RANGE.map(p => (
                    <button key={p} onClick={() => togglePrice(p)}
                      className={`px-2 py-1.5 text-xs rounded-lg border transition-colors ${priceFilter.includes(p) ? "bg-peak-blue/20 border-peak-blue/50 text-peak-blue" : "border-white/10 text-peak-text-secondary"}`}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-2">Min rating: {minRating > 0 ? minRating + "+" : "Any"}</p>
                <Slider value={[minRating]} onValueChange={([v]) => setMinRating(v)} min={0} max={5} step={0.5}
                  className="[&_[role=slider]]:bg-peak-blue [&_[role=slider]]:border-peak-blue" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox checked={openNowOnly} onCheckedChange={setOpenNowOnly}
                  className="border-peak-text-secondary data-[state=checked]:bg-peak-blue data-[state=checked]:border-peak-blue" />
                <span className="text-sm text-peak-text-secondary">Open now only</span>
              </label>
              <div>
                <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-2">Meal moment</p>
                {["Breakfast", "Lunch on the slopes", "Apres-ski", "Dinner", "Late night"].map(m => (
                  <label key={m} className="flex items-center gap-2 cursor-pointer mb-2">
                    <Checkbox checked={mealMoments.includes(m)} onCheckedChange={() => toggleMoment(m)}
                      className="border-peak-text-secondary data-[state=checked]:bg-peak-blue data-[state=checked]:border-peak-blue" />
                    <span className="text-xs text-peak-text-secondary">{m}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex-1">
              {reservingFor && (
                <div className="mb-6">
                  <ReservationPanel restaurant={reservingFor} onClose={() => setReservingFor(null)} />
                </div>
              )}
              <p className="text-peak-text-secondary text-sm mb-4">{filtered.length} restaurants near {location}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filtered.map(r => (
                  <RestaurantCard key={r.id} restaurant={r} onReserve={() => setReservingFor(r)} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}