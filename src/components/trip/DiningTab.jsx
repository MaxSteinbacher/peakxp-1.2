import { useState, useMemo } from "react";
import { Star, ChevronDown, ChevronUp, X, ExternalLink, MapPin, Calendar } from "lucide-react";
import { useT } from "../../lib/i18n";
import { useTripPlanner } from "../../context/TripPlannerContext";
import { savePlan } from "../../lib/bookings";
import { toast } from "sonner";

const PRICE_RANGE = ["€", "€€", "€€€", "€€€€"];

const RESTAURANTS = [
  { id: "r1", name: "Le Carve — Summit", image: "https://picsum.photos/seed/dining1/600/400", cuisines: ["Alpine", "Swiss", "International"], rating: 4.8, reviews: 284, location: "Slope-side — 2100m", distLift: "10m from main gondola", priceRange: "€€€", openNow: true, closesAt: "16:30", moments: ["Lunch on the slopes", "Apres-ski"], highlights: ["Panoramic view", "Terrace", "Gluten-free menu"], bookingStatus: "Available today", verified: true },
  { id: "r2", name: "Chez Marie — Village", image: "https://picsum.photos/seed/dining2/600/400", cuisines: ["French", "Swiss"], rating: 4.6, reviews: 193, location: "Village centre", distLift: "400m from cable car", priceRange: "€€", openNow: true, closesAt: "22:00", moments: ["Lunch on the slopes", "Dinner"], highlights: ["Fireplace", "Kid-friendly", "Live music Fridays"], bookingStatus: "Walk-ins welcome", verified: false },
  { id: "r3", name: "Apres All — Bar & Kitchen", image: "https://picsum.photos/seed/dining3/600/400", cuisines: ["International", "Swiss"], rating: 4.5, reviews: 420, location: "Village centre", distLift: "200m from main lift", priceRange: "€€", openNow: true, closesAt: "01:00", moments: ["Apres-ski", "Dinner", "Late night"], highlights: ["Live music", "Terrace", "Panoramic view"], bookingStatus: "Available today", verified: true },
  { id: "r4", name: "Berghaus Altitude 2400", image: "https://picsum.photos/seed/dining4/600/400", cuisines: ["Alpine", "International"], rating: 4.7, reviews: 156, location: "Slope-side — 2400m", distLift: "Ski-in ski-out", priceRange: "€€€", openNow: false, closesAt: "15:30", moments: ["Lunch on the slopes", "Breakfast"], highlights: ["Panoramic view", "Terrace"], bookingStatus: "Fully booked", verified: true },
  { id: "r5", name: "La Strada Ristorante", image: "https://picsum.photos/seed/dining5/600/400", cuisines: ["Italian", "International"], rating: 4.4, reviews: 98, location: "Village centre", distLift: "350m from main lift", priceRange: "€€", openNow: true, closesAt: "23:00", moments: ["Dinner"], highlights: ["Private dining", "Vegetarian-friendly", "Kid-friendly"], bookingStatus: "Available today", verified: false },
];

const FULL_MENU = {
  Starters: [{ name: "Fondue au gruyere (for 2)", price: 28 }, { name: "Raclette with pickles", price: 18 }, { name: "Soupe a l'oignon", price: 12 }],
  Mains: [{ name: "Filet de boeuf frites", price: 38 }, { name: "Tartiflette savoyarde", price: 22 }, { name: "Risotto aux champignons (V)", price: 24 }],
  Desserts: [{ name: "Tarte tatin", price: 11 }, { name: "Coupe de glace", price: 9 }],
  Drinks: [{ name: "Vin chaud", price: 7 }, { name: "Biere locale", price: 8 }],
};

const MEAL_MOMENTS = ["Breakfast", "Lunch on the slopes", "Apres-ski", "Dinner", "Late night"];
const MOMENT_EMOJI = { "Breakfast": "☀️", "Lunch on the slopes": "⛷️", "Apres-ski": "🍹", "Dinner": "🌙", "Late night": "🎶" };
const TIME_SLOTS = {
  "Breakfast": ["08:00", "08:30", "09:00", "09:30", "10:00"],
  "Lunch on the slopes": ["12:00", "12:30", "13:00", "13:30", "14:00"],
  "Apres-ski": ["15:30", "16:00", "16:30", "17:00", "17:30", "18:00"],
  "Dinner": ["19:00", "19:30", "20:00", "20:30", "21:00"],
  "Late night": ["22:00", "22:30", "23:00"],
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

function DaySlotPicker({ nights, bookedSlots, onBook, partySize, resortName }) {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMoment, setSelectedMoment] = useState(null);

  const days = Array.from({ length: nights }, (_, i) => i + 1);

  function isBooked(day, moment) {
    return bookedSlots.some(s => s.day === day && s.moment === moment);
  }

  function handleSelect(day, moment) {
    setSelectedDay(day);
    setSelectedMoment(moment);
    onBook(day, moment);
  }

  return (
    <div className="bg-peak-surface border border-white/8 rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-white/5 flex items-center gap-2">
        <Calendar className="h-4 w-4 text-peak-blue" />
        <p className="text-peak-text font-semibold text-sm">Choose a dining slot</p>
        <span className="text-peak-text-secondary text-xs ml-1">· {partySize} guest{partySize !== 1 ? "s" : ""} · {resortName}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs text-peak-text-secondary font-medium w-24">Meal</th>
              {days.map(d => (
                <th key={d} className="px-3 py-3 text-center text-xs text-peak-text-secondary font-medium min-w-[80px]">Day {d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MEAL_MOMENTS.map(moment => (
              <tr key={moment} className="border-t border-white/5">
                <td className="px-4 py-2.5 text-xs text-peak-text-secondary whitespace-nowrap">{MOMENT_EMOJI[moment]} {moment}</td>
                {days.map(d => {
                  const booked = isBooked(d, moment);
                  const isSelected = selectedDay === d && selectedMoment === moment;
                  return (
                    <td key={d} className="px-3 py-2 text-center">
                      {booked ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-peak-green/20 text-peak-green text-xs">✓</span>
                      ) : (
                        <button
                          onClick={() => handleSelect(d, moment)}
                          className={`w-7 h-7 rounded-full border text-xs transition-all ${isSelected ? "bg-peak-red border-peak-red text-white" : "border-white/15 text-peak-text-secondary hover:border-peak-blue hover:text-peak-blue"}`}
                        >
                          +
                        </button>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-peak-text-secondary text-xs px-5 py-3 border-t border-white/5">
        Tap <span className="text-peak-blue">+</span> to pick a restaurant for that meal slot
      </p>
    </div>
  );
}

function ReservationModal({ restaurant, day, moment, partySize, tripStart, onClose, onConfirm }) {
  const [seating, setSeating] = useState(null);
  const [requests, setRequests] = useState("");
  const [selectedTime, setSelectedTime] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const dateStr = (() => {
    if (!tripStart) return `Day ${day}`;
    const d = new Date(tripStart);
    d.setDate(d.getDate() + day - 1);
    return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
  })();

  const timeSlots = TIME_SLOTS[moment] || ["12:00", "13:00", "19:00", "20:00"];
  const unavailableSlots = ["13:00", "20:00"];

  if (confirmed) return (
    <div className="bg-peak-card border border-white/10 rounded-2xl p-6 text-center">
      <div className="w-12 h-12 rounded-full bg-peak-green/20 flex items-center justify-center mx-auto mb-3">
        <span className="text-2xl">✓</span>
      </div>
      <h3 className="font-display font-bold text-xl text-peak-text mb-1">Table reserved!</h3>
      <p className="text-peak-text-secondary text-sm mb-3">
        Booking ref: <span className="text-peak-text font-mono font-bold">PXP-{Math.random().toString(36).slice(2, 8).toUpperCase()}</span>
      </p>
      <div className="bg-peak-surface rounded-xl p-4 text-sm space-y-1 mb-4 text-left">
        <p><span className="text-peak-text-secondary">Restaurant:</span> <span className="text-peak-text">{restaurant.name}</span></p>
        <p><span className="text-peak-text-secondary">Date:</span> <span className="text-peak-text">{dateStr}</span></p>
        <p><span className="text-peak-text-secondary">Time:</span> <span className="text-peak-text">{selectedTime}</span></p>
        <p><span className="text-peak-text-secondary">Party:</span> <span className="text-peak-text">{partySize} guests</span></p>
        <p><span className="text-peak-text-secondary">Meal:</span> <span className="text-peak-text">{moment}</span></p>
      </div>
      <button onClick={() => { onConfirm(); onClose(); }} className="w-full py-2.5 bg-peak-red hover:bg-peak-red-hover text-white text-sm font-semibold rounded-xl transition-colors">
        Done
      </button>
    </div>
  );

  return (
    <div className="bg-peak-card border border-white/10 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display font-bold text-lg text-peak-text">{restaurant.name}</h3>
          <p className="text-peak-text-secondary text-xs">{dateStr} · {moment} · {partySize} guests</p>
        </div>
        <button onClick={onClose} className="text-peak-text-secondary hover:text-peak-text"><X className="h-5 w-5" /></button>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-xs text-peak-text-secondary mb-2">Select time</label>
          <div className="flex flex-wrap gap-2">
            {timeSlots.map(slot => {
              const unavail = unavailableSlots.includes(slot);
              return (
                <button key={slot} onClick={() => !unavail && setSelectedTime(slot)} disabled={unavail}
                  className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${unavail ? "opacity-30 cursor-not-allowed border-white/5 text-peak-text-secondary" : selectedTime === slot ? "bg-peak-red text-white border-peak-red" : "border-white/10 text-peak-text-secondary hover:text-peak-text hover:border-white/25"}`}>
                  {slot}
                </button>
              );
            })}
          </div>
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
        <button onClick={() => setConfirmed(true)} disabled={!selectedTime}
          className="w-full py-3 bg-peak-red hover:bg-peak-red-hover disabled:opacity-40 text-white font-semibold text-sm rounded-xl transition-colors">
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
      <div className="relative h-44 overflow-hidden">
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
      <div className="p-4">
        <h3 className="font-display font-bold text-peak-text text-base leading-tight mb-1">{restaurant.name}</h3>
        <div className="flex items-center gap-2 mb-1">
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-peak-text text-sm font-medium">{restaurant.rating}</span>
            <span className="text-peak-text-secondary text-xs">({restaurant.reviews})</span>
          </div>
          <PriceSymbol level={restaurant.priceRange} />
        </div>
        <div className="flex flex-wrap gap-1 mb-2">
          {restaurant.cuisines.map(c => <span key={c} className="text-xs text-peak-blue border border-peak-blue/30 px-2 py-0.5 rounded-full">{c}</span>)}
        </div>
        <p className="text-xs text-peak-text-secondary mb-1">{restaurant.location} · {restaurant.distLift}</p>
        <p className={`text-xs font-medium mb-3 ${restaurant.openNow ? "text-peak-green" : "text-peak-text-secondary"}`}>
          {restaurant.openNow ? `Open — closes ${restaurant.closesAt}` : "Closed"}
        </p>
        <div className="flex flex-wrap gap-1 mb-3">
          {restaurant.highlights.map(h => <span key={h} className="text-xs bg-peak-blue/10 text-peak-blue px-2 py-0.5 rounded-full">{h}</span>)}
        </div>
        <div className="flex gap-2">
          <button onClick={onReserve} disabled={restaurant.bookingStatus === "Fully booked"}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-colors ${restaurant.bookingStatus === "Fully booked" ? "opacity-40 cursor-not-allowed bg-peak-surface text-peak-text-secondary" : "bg-peak-red hover:bg-peak-red-hover text-white"}`}>
            Select for this slot
          </button>
          <button onClick={() => setMenuOpen(m => !m)}
            className="flex-1 py-2.5 text-sm font-medium rounded-xl border border-white/10 text-peak-text-secondary hover:text-peak-text transition-colors">
            Menu
          </button>
        </div>
        {menuOpen && (
          <div className="mt-3 border-t border-white/5 pt-3">
            {Object.entries(FULL_MENU).map(([section, items]) => (
              <div key={section} className="mb-2">
                <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-1">{section}</p>
                {items.map(item => (
                  <div key={item.name} className="flex justify-between text-xs text-peak-text-secondary py-1 border-b border-white/5">
                    <span>{item.name}</span><span className="text-peak-text">€{item.price}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        <button onClick={() => setExpanded(e => !e)} className="w-full flex items-center justify-center gap-1 mt-2 text-xs text-peak-text-secondary hover:text-peak-text transition-colors">
          {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          {expanded ? "Hide" : "Show"} details
        </button>
        {expanded && (
          <div className="mt-3 border-t border-white/5 pt-3 space-y-2 text-xs text-peak-text-secondary">
            <p>Seasonal alpine cuisine using fresh valley ingredients, with spectacular panoramic views.</p>
            <div className="flex gap-2">
              <button className="flex items-center gap-1 text-peak-blue hover:underline"><MapPin className="h-3 w-3" /> Directions</button>
              <button className="flex items-center gap-1 text-peak-blue hover:underline"><ExternalLink className="h-3 w-3" /> Website</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DiningTab({ agentServiceDetails = {}, onBook }) {
  const { session } = useTripPlanner();
  const resortName = session?.destination?.label || session?.resorts?.[0]?.resortName || "your resort";
  const nights = session?.dates?.nights || 3;
  const partySize = (session?.guests?.adults || 1) + (session?.guests?.children || 0);
  const tripStart = session?.dates?.start || null;

  const [bookedSlots, setBookedSlots] = useState([]);
  const [pickingSlot, setPickingSlot] = useState(null);
  const [reservingFor, setReservingFor] = useState(null);
  const [sortBy, setSortBy] = useState("Recommended");
  const [popularFilters, setPopularFilters] = useState([]);
  const [momentFilter, setMomentFilter] = useState([]);

  const SORT_OPTIONS = ["Recommended", "Closest to lifts", "Highest rated", "Price: low to high", "Open now first"];
  const POPULAR_FILTERS = ["Open now", "Panoramic view", "Terrace", "Apres-ski", "Vegetarian", "Kid-friendly"];

  const togglePop = (f) => setPopularFilters(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);
  const toggleMoment = (m) => setMomentFilter(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]);

  const filtered = useMemo(() => {
    let res = [...RESTAURANTS];
    if (momentFilter.length) res = res.filter(r => momentFilter.some(m => r.moments.includes(m)));
    if (popularFilters.includes("Open now")) res = res.filter(r => r.openNow);
    if (popularFilters.includes("Panoramic view")) res = res.filter(r => r.highlights.includes("Panoramic view"));
    if (popularFilters.includes("Terrace")) res = res.filter(r => r.highlights.includes("Terrace"));
    if (popularFilters.includes("Kid-friendly")) res = res.filter(r => r.highlights.includes("Kid-friendly"));
    if (popularFilters.includes("Vegetarian")) res = res.filter(r => r.highlights.some(h => h.toLowerCase().includes("vegetarian")));
    if (sortBy === "Highest rated") res.sort((a, b) => b.rating - a.rating);
    if (sortBy === "Open now first") res.sort((a, b) => (b.openNow ? 1 : 0) - (a.openNow ? 1 : 0));
    return res;
  }, [momentFilter, popularFilters, sortBy]);

  function handleSlotBook(day, moment) {
    setPickingSlot({ day, moment });
    setMomentFilter([moment]);
  }

  function handleRestaurantSelect(restaurant) {
    if (!pickingSlot) return;
    setReservingFor({ restaurant, ...pickingSlot });
  }

  function handleReservationConfirm() {
    if (!reservingFor) return;
    const { restaurant, day, moment } = reservingFor;
    setBookedSlots(prev => [...prev.filter(s => !(s.day === day && s.moment === moment)), { day, moment, restaurant }]);
    onBook?.(`${restaurant.name} — Day ${day} ${moment}`, 0, { restaurant: restaurant.name, day, moment, partySize });
    toast.success(`Table booked at ${restaurant.name} — Day ${day}, ${moment}`);
    setReservingFor(null);
    setPickingSlot(null);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 w-full">
      <div className="flex items-center gap-3 mb-2">
        <h2 className="font-display font-extrabold text-2xl text-peak-text">
          Dining — {resortName}
        </h2>
      </div>
      <p className="text-peak-text-secondary text-sm mb-6">
        Plan your meals day by day. {nights} nights · {partySize} guest{partySize !== 1 ? "s" : ""}
      </p>

      <div className="mb-8">
        <DaySlotPicker
          nights={nights}
          bookedSlots={bookedSlots}
          onBook={handleSlotBook}
          partySize={partySize}
          resortName={resortName}
        />
      </div>

      {pickingSlot && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-lg text-peak-text">
              Choose a restaurant for Day {pickingSlot.day} — {pickingSlot.moment}
            </h3>
            <button onClick={() => { setPickingSlot(null); setMomentFilter([]); }}
              className="text-peak-text-secondary hover:text-peak-text text-sm flex items-center gap-1">
              <X className="h-4 w-4" /> Cancel
            </button>
          </div>

          {reservingFor && (
            <div className="mb-6">
              <ReservationModal
                restaurant={reservingFor.restaurant}
                day={reservingFor.day}
                moment={reservingFor.moment}
                partySize={partySize}
                tripStart={tripStart}
                onClose={() => setReservingFor(null)}
                onConfirm={handleReservationConfirm}
              />
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-3">
            {POPULAR_FILTERS.map(f => (
              <button key={f} onClick={() => togglePop(f)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${popularFilters.includes(f) ? "bg-peak-red/20 border-peak-red/40 text-peak-red" : "border-white/10 text-peak-text-secondary hover:text-peak-text"}`}>
                {f}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 mb-4 overflow-x-auto hide-scrollbar">
            {SORT_OPTIONS.map(opt => (
              <button key={opt} onClick={() => setSortBy(opt)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border whitespace-nowrap transition-colors ${sortBy === opt ? "bg-peak-blue/20 border-peak-blue/40 text-peak-blue" : "border-white/10 text-peak-text-secondary hover:text-peak-text"}`}>
                {opt}
              </button>
            ))}
          </div>

          <p className="text-peak-text-secondary text-sm mb-4">{filtered.length} restaurants near {resortName}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map(r => (
              <RestaurantCard key={r.id} restaurant={r} onReserve={() => handleRestaurantSelect(r)} />
            ))}
          </div>
        </div>
      )}

      {bookedSlots.length > 0 && !pickingSlot && (
        <div className="mt-6 bg-peak-card border border-white/5 rounded-2xl p-5">
          <p className="text-peak-text font-semibold text-sm mb-3">Your dining plan</p>
          <div className="space-y-2">
            {bookedSlots.map((s, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-peak-text-secondary">Day {s.day} · {s.moment}</span>
                <span className="text-peak-text font-medium">{s.restaurant.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}