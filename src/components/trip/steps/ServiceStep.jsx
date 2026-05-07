import { useState } from "react";
import SkiSchoolTab from "../SkiSchoolTab";
import { useTripPlanner } from "../../../context/TripPlannerContext";
import { getResortById } from "../../../lib/data";
import { toast } from "sonner";
import { Ticket, Hotel, Wrench, GraduationCap, Utensils, Lock, Snowflake, Baby, Plane, Train, Car, Plus, ArrowRight } from "lucide-react";

const SERVICE_CONFIG = {
  "ski-pass": { icon: Ticket, title: "Select your lift pass", skip: "Skip this step" },
  accommodation: { icon: Hotel, title: "Choose your accommodation", skip: "Skip accommodation" },
  equipment: { icon: Wrench, title: "Rent equipment", skip: "Skip equipment" },
  "ski-school": { icon: GraduationCap, title: "Book ski school", skip: "Skip ski school" },
  dining: { icon: Utensils, title: "Reserve dining", skip: "Continue", multi: true },
  storage: { icon: Lock, title: "Book storage & lockers", skip: "Skip storage" },
  activities: { icon: Snowflake, title: "Add activities", skip: "Continue", multi: true },
  childcare: { icon: Baby, title: "Book childcare", skip: "Skip childcare" },
  flights: { icon: Plane, title: "Book flights", skip: "Skip flights", global: true },
  train: { icon: Train, title: "Book train travel", skip: "Skip train", global: true },
  car: { icon: Car, title: "Book car rental", skip: "Skip car rental", global: true },
};

const ACTIVITIES = [
  { name: "Snowshoeing tour", price: 45 },
  { name: "Spa day", price: 85 },
  { name: "Sledging", price: 25 },
  { name: "Guided off-piste", price: 120 },
  { name: "Ice skating", price: 15 },
  { name: "Snow tubing", price: 20 },
  { name: "Horse-drawn sleigh", price: 60 },
  { name: "Helicopter tour", price: 250 },
];

export default function ServiceStep({ serviceKey, resortId }) {
  const { session, addToBasket, markStepComplete, markStepSkipped, setCurrentStep, getNextStep } = useTripPlanner();
  const config = SERVICE_CONFIG[serviceKey] || { icon: Ticket, title: serviceKey, skip: "Skip" };
  const Icon = config.icon;
  const resort = resortId ? getResortById(resortId) : null;
  const resortEntry = session?.resorts?.find(r => r.resortId === resortId);
  const [selectedPass, setSelectedPass] = useState(1);
  const [addedCount, setAddedCount] = useState(0);

  function advance() {
    const next = getNextStep();
    if (next) setCurrentStep(next.serviceKey, next.resortId);
  }

  function handleAdd(label, price, type, details = {}) {
    addToBasket({
      sessionId: session.id,
      resortId: resortId || null,
      resortName: resortEntry?.resortName || resort?.name || null,
      serviceKey,
      type,
      label,
      details,
      priceEUR: price,
      quantity: 1,
      addedAt: new Date().toISOString(),
      status: "pending",
    });
    const emoji = { "ski-pass": "🎿", accommodation: "🏨", equipment: "⛷️", "ski-school": "🎓", dining: "🍽️", activities: "🏔️", flights: "✈️", train: "🚂", car: "🚗" };
    toast.success(`Added to your trip ${emoji[serviceKey] || "✓"}`);
    setAddedCount(c => c + 1);
    if (!config.multi) {
      markStepComplete(serviceKey, resortId);
      advance();
    }
  }

  function handleSkip() {
    markStepSkipped(serviceKey, resortId);
    advance();
  }

  function handleContinueMulti() {
    if (addedCount > 0) markStepComplete(serviceKey, resortId);
    else markStepSkipped(serviceKey, resortId);
    advance();
  }

  const resortLabel = resort ? `— ${resort.flag} ${resort.name}` : "";

  // ── SKI PASS ──
  if (serviceKey === "ski-pass" && resort) {
    const passes = resort.liftPasses || [];
    const g = session.guests;
    const pass = passes[selectedPass] || passes[0];
    const total = pass ? (pass.adult * g.adults + pass.child * g.children + (pass.senior || 0) * g.seniors) : 0;

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Icon className="h-6 w-6 text-peak-blue" />
          <h2 className="font-display font-extrabold text-2xl text-peak-text">Lift passes {resortLabel}</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {passes.map((p, i) => (
            <button key={p.type} onClick={() => setSelectedPass(i)}
              className={`p-4 rounded-xl border text-center transition-colors ${i === selectedPass ? "border-peak-red bg-peak-red/10" : "border-white/10 hover:border-white/20"}`}>
              <p className="text-peak-text font-bold text-sm">{p.type}</p>
              <p className="text-peak-text-secondary text-xs mt-1">From €{p.adult}</p>
              {p.badge && <span className="inline-block mt-2 bg-peak-green/20 text-peak-green text-xs px-2 py-0.5 rounded-full">{p.badge}</span>}
            </button>
          ))}
        </div>

        {pass && (
          <div className="bg-peak-card border border-white/5 rounded-2xl p-6 mb-6">
            <h3 className="font-display font-bold text-peak-text text-lg mb-4">{pass.type} pass — Price breakdown</h3>
            <div className="space-y-2 text-sm">
              {g.adults > 0 && <div className="flex justify-between"><span className="text-peak-text-secondary">Adult × {g.adults}</span><span className="text-peak-text">€{pass.adult * g.adults}</span></div>}
              {g.children > 0 && <div className="flex justify-between"><span className="text-peak-text-secondary">Child × {g.children}</span><span className="text-peak-text">€{pass.child * g.children}</span></div>}
              {g.seniors > 0 && <div className="flex justify-between"><span className="text-peak-text-secondary">Senior × {g.seniors}</span><span className="text-peak-text">€{(pass.senior || 0) * g.seniors}</span></div>}
              <div className="pt-3 border-t border-white/5 flex justify-between font-bold text-peak-text text-lg">
                <span>Total</span><span>€{total}</span>
              </div>
            </div>
          </div>
        )}

        <button onClick={() => handleAdd(`${resort.name} — ${pass?.type} lift pass · ${g.adults + g.children + g.seniors} guests`, total, `lift-pass-${pass?.type}`, { passType: pass?.type, resort: resort.name })}
          className="w-full py-3 bg-peak-red hover:bg-peak-red-hover text-white font-bold rounded-xl transition-colors mb-3">
          Add to trip basket — €{total}
        </button>
        <button onClick={handleSkip} className="w-full text-center text-peak-text-secondary text-sm hover:text-peak-text transition-colors py-2">{config.skip}</button>
      </div>
    );
  }

  // ── ACCOMMODATION ──
  if (serviceKey === "accommodation") {
    const nights = session.dates.nights || session.dates.skiDays || 3;
    const seed = resort?.name || "resort";
    const hotels = [
      { name: `Hotel Alpin ${resort?.name || "Resort"}`, stars: 4, price: 180 + ((seed.charCodeAt(0) || 0) % 80) },
      { name: `Chalet ${resort?.name || "Mountain"}`, stars: 5, price: 320 + ((seed.charCodeAt(1) || 0) % 60) },
      { name: `Pension ${resort?.name || "Valley"}`, stars: 3, price: 95 + ((seed.charCodeAt(2) || 0) % 50) },
      { name: `Aparthotel ${resort?.name || "Alpine"}`, stars: 4, price: 150 + ((seed.charCodeAt(0) || 0) % 40) },
    ];

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Icon className="h-6 w-6 text-peak-blue" />
          <h2 className="font-display font-extrabold text-2xl text-peak-text">{config.title} {resortLabel}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {hotels.map((h, i) => (
            <div key={i} className="bg-peak-card border border-white/5 rounded-2xl overflow-hidden">
              <img src={`https://picsum.photos/seed/${h.name.replace(/\s/g, "")}/600/300`} alt={h.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <div className="flex items-center gap-0.5 mb-1">
                  {Array.from({ length: h.stars }, (_, j) => <span key={j} className="text-yellow-400 text-xs">★</span>)}
                </div>
                <h4 className="text-peak-text font-semibold text-sm mb-1">{h.name}</h4>
                <p className="text-peak-text-secondary text-xs mb-3">From €{h.price}/night · {nights} nights = €{h.price * nights}</p>
                <button onClick={() => handleAdd(`${h.name} — ${nights} nights`, h.price * nights, "hotel-room", { hotel: h.name, nights, pricePerNight: h.price })}
                  className="w-full py-2 bg-peak-red hover:bg-peak-red-hover text-white text-xs font-bold rounded-lg transition-colors">
                  Select — €{(h.price * nights).toLocaleString()}
                </button>
              </div>
            </div>
          ))}
        </div>
        <button onClick={handleSkip} className="w-full text-center text-peak-text-secondary text-sm hover:text-peak-text transition-colors py-2">{config.skip}</button>
      </div>
    );
  }

  // ── ACTIVITIES ──
  if (serviceKey === "activities") {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center gap-3 mb-2">
          <Icon className="h-6 w-6 text-peak-blue" />
          <h2 className="font-display font-extrabold text-2xl text-peak-text">{config.title} {resortLabel}</h2>
        </div>
        {addedCount > 0 && <p className="text-peak-green text-sm font-medium mb-4">{addedCount} activit{addedCount !== 1 ? "ies" : "y"} added to basket</p>}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {ACTIVITIES.map(act => (
            <div key={act.name} className="bg-peak-card border border-white/5 rounded-xl overflow-hidden">
              <img src={`https://picsum.photos/seed/${act.name.replace(/\s/g, "")}/400/300`} alt={act.name} className="w-full h-28 object-cover" />
              <div className="p-3">
                <h4 className="text-peak-text text-xs font-semibold mb-1">{act.name}</h4>
                <p className="text-peak-text-secondary text-xs mb-2">From €{act.price}</p>
                <button onClick={() => handleAdd(`${act.name}${resort ? ` — ${resort.name}` : ""}`, act.price, "activity", { activity: act.name })}
                  className="w-full py-1.5 bg-peak-blue/10 text-peak-blue text-xs font-semibold rounded-lg hover:bg-peak-blue/20 transition-colors flex items-center justify-center gap-1">
                  <Plus className="h-3 w-3" /> Add
                </button>
              </div>
            </div>
          ))}
        </div>
        <button onClick={handleContinueMulti} className="w-full py-3 bg-peak-red hover:bg-peak-red-hover text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
          Continue <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    );
  }

  // ── GENERIC STEP (equipment, ski-school, dining, storage, childcare, flights, train, car) ──
  // ── SKI SCHOOL (full tab) ──
  if (serviceKey === "ski-school") {
    return <SkiSchoolTab />;
  }

  const priceMap = { equipment: 35, dining: 45, storage: 15, childcare: 65, flights: 180, train: 95, car: 55 };
  const unitPrice = priceMap[serviceKey] || 50;
  const isPerDay = ["equipment", "storage", "childcare", "car"].includes(serviceKey);
  const days = session.dates.nights || session.dates.skiDays || 3;
  const totalPrice = isPerDay ? unitPrice * days : unitPrice * (session.guests.adults + session.guests.children + session.guests.seniors);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Icon className="h-6 w-6 text-peak-blue" />
        <h2 className="font-display font-extrabold text-2xl text-peak-text">{config.title} {resortLabel}</h2>
      </div>

      {config.multi && addedCount > 0 && (
        <p className="text-peak-green text-sm font-medium mb-4">{addedCount} item{addedCount !== 1 ? "s" : ""} added</p>
      )}

      <div className="bg-peak-card border border-white/5 rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-xl bg-peak-blue/10 flex items-center justify-center">
            <Icon className="h-7 w-7 text-peak-blue" />
          </div>
          <div>
            <h3 className="text-peak-text font-bold">{config.title}</h3>
            <p className="text-peak-text-secondary text-sm">
              {isPerDay ? `From €${unitPrice}/day · ${days} days` : `From €${unitPrice} per person`}
            </p>
          </div>
        </div>
        <p className="text-peak-text-secondary text-sm mb-4">
          {config.global
            ? `Plan ${serviceKey} for your entire trip.`
            : `Book ${serviceKey.replace(/-/g, " ")} at ${resort?.name || "your destination"}.`}
        </p>
        <div className="flex justify-between items-center border-t border-white/5 pt-4">
          <span className="text-peak-text font-bold text-lg">€{totalPrice}</span>
          <button onClick={() => handleAdd(`${resort?.name ? resort.name + " — " : ""}${config.title}`, totalPrice, serviceKey, { days: isPerDay ? days : 1 })}
            className="px-6 py-2.5 bg-peak-red hover:bg-peak-red-hover text-white font-bold rounded-xl transition-colors text-sm">
            Add to trip basket
          </button>
        </div>
      </div>

      {config.multi ? (
        <button onClick={handleContinueMulti} className="w-full py-3 bg-peak-red hover:bg-peak-red-hover text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
          Continue <ArrowRight className="h-4 w-4" />
        </button>
      ) : (
        <button onClick={handleSkip} className="w-full text-center text-peak-text-secondary text-sm hover:text-peak-text transition-colors py-2">{config.skip}</button>
      )}
    </div>
  );
}