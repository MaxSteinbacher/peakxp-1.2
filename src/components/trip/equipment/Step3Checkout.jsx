import { useState } from "react";
import { ShieldCheck, RefreshCw, Lock, Check } from "lucide-react";

const LABELS = {
  skis: "Skis", snowboard: "Snowboard", ski_boots: "Ski Boots", snowboard_boots: "Snowboard Boots",
  poles: "Poles", helmet: "Helmet", ski_jacket: "Ski Jacket", ski_pants: "Ski Pants",
  gloves: "Gloves", goggles: "Goggles", back_protector: "Back Protector",
};

const STEPS = ["Summary", "Guest details", "Payment"];

function StepBar({ current }) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-1">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
              i < current ? "bg-peak-blue border-peak-blue text-white"
              : i === current ? "border-peak-blue text-peak-blue"
              : "border-white/20 text-peak-text-secondary"
            }`}>
              {i < current ? <Check className="h-3.5 w-3.5" /> : i + 1}
            </div>
            <span className={`text-xs whitespace-nowrap ${i === current ? "text-peak-text" : "text-peak-text-secondary"}`}>{label}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`flex-1 h-px mx-2 mb-4 ${i < current ? "bg-peak-blue" : "bg-white/10"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function Input({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label className="block text-xs text-peak-text-secondary mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue"
      />
    </div>
  );
}

function TrustBadges() {
  return (
    <div className="flex flex-wrap gap-3 mt-4">
      {[
        { icon: ShieldCheck, label: "Pick up ready on arrival" },
        { icon: RefreshCw, label: "Free size exchange on day 1" },
        { icon: Lock, label: "SSL secured" },
      ].map(({ icon: Icon, label }) => (
        <div key={label} className="flex items-center gap-2 text-xs text-peak-text-secondary">
          <Icon className="h-3.5 w-3.5 text-peak-green" />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

export default function Step3Checkout({ selectedEquipment, shop, specs, answers }) {
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [guests, setGuests] = useState([{ name: "", email: "", notes: "" }]);
  const [payment, setPayment] = useState({ card: "", expiry: "", cvv: "", name: "" });
  const [complete, setComplete] = useState(false);

  const days = answers?.days || 3;
  const total = shop ? shop.pricePerDay * days : 0;

  function addGuest() {
    setGuests((prev) => [...prev, { name: "", email: "", notes: "" }]);
  }

  function updateGuest(i, field, val) {
    setGuests((prev) => prev.map((g, idx) => idx === i ? { ...g, [field]: val } : g));
  }

  if (complete) {
    return (
      <div className="max-w-md mx-auto text-center py-16">
        <div className="w-16 h-16 rounded-full bg-peak-green/20 flex items-center justify-center mx-auto mb-4">
          <Check className="h-8 w-8 text-peak-green" />
        </div>
        <h2 className="font-display font-bold text-2xl text-peak-text mb-2">Booking confirmed!</h2>
        <p className="text-peak-text-secondary text-sm mb-4">
          Your equipment rental at <strong className="text-peak-text">{shop?.name}</strong> is confirmed.
          A confirmation has been sent to {guests[0]?.email || "your email"}.
        </p>
        <TrustBadges />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <StepBar current={checkoutStep} />

      {checkoutStep === 0 && (
        <div>
          <h3 className="font-display font-bold text-xl text-peak-text mb-4">Rental summary</h3>
          <div className="bg-peak-card border border-white/5 rounded-xl p-5 mb-5 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-peak-text-secondary">Shop</span>
              <span className="text-peak-text font-medium">{shop?.name}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-peak-text-secondary">Duration</span>
              <span className="text-peak-text">{days} day{days !== 1 ? "s" : ""}</span>
            </div>
            {answers?.dates?.start && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-peak-text-secondary">Dates</span>
                <span className="text-peak-text">{answers.dates.start} {"->"} {answers.dates.end}</span>
              </div>
            )}
            <div className="border-t border-white/5 pt-3 space-y-1">
              {selectedEquipment.map((k) => (
                <div key={k} className="flex items-center justify-between text-sm">
                  <span className="text-peak-text-secondary capitalize">{LABELS[k]}</span>
                  <span className="text-peak-text text-xs">Included</span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/5 pt-3 flex items-center justify-between">
              <span className="text-peak-text font-semibold">Total</span>
              <span className="text-peak-text font-bold text-xl">{"€" + total}</span>
            </div>
          </div>
          <TrustBadges />
          <button
            onClick={() => setCheckoutStep(1)}
            className="mt-6 px-8 py-3 bg-peak-red hover:bg-peak-red-hover text-white font-display font-bold text-sm rounded-xl transition-colors"
          >
            Continue
          </button>
        </div>
      )}

      {checkoutStep === 1 && (
        <div>
          <h3 className="font-display font-bold text-xl text-peak-text mb-4">Guest details</h3>
          <div className="space-y-6 mb-6">
            {guests.map((g, i) => (
              <div key={i} className="bg-peak-card border border-white/5 rounded-xl p-5 space-y-3">
                <p className="text-sm font-semibold text-peak-text mb-1">{"Guest " + (i + 1)}</p>
                <Input label="Full name" value={g.name} onChange={(v) => updateGuest(i, "name", v)} placeholder="Jane Smith" />
                <Input label="Email" type="email" value={g.email} onChange={(v) => updateGuest(i, "email", v)} placeholder="jane@email.com" />
                <div>
                  <label className="block text-xs text-peak-text-secondary mb-1">Measurements / notes (optional)</label>
                  <textarea
                    value={g.notes}
                    onChange={(e) => updateGuest(i, "notes", e.target.value)}
                    placeholder="e.g. height 175cm, shoe size 42, intermediate skier..."
                    rows={2}
                    className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue resize-none"
                  />
                </div>
              </div>
            ))}
          </div>
          <button onClick={addGuest} className="text-xs text-peak-blue hover:underline mb-6">+ Add another guest</button>
          <div className="flex gap-3">
            <button onClick={() => setCheckoutStep(0)} className="px-5 py-2.5 border border-white/10 text-peak-text-secondary hover:text-peak-text text-sm rounded-xl transition-colors">Back</button>
            <button onClick={() => setCheckoutStep(2)} className="px-8 py-2.5 bg-peak-red hover:bg-peak-red-hover text-white font-display font-bold text-sm rounded-xl transition-colors">Continue to payment</button>
          </div>
        </div>
      )}

      {checkoutStep === 2 && (
        <div>
          <h3 className="font-display font-bold text-xl text-peak-text mb-4">Payment</h3>
          <div className="bg-peak-card border border-white/5 rounded-xl p-5 space-y-4 mb-6">
            <Input label="Cardholder name" value={payment.name} onChange={(v) => setPayment((p) => ({ ...p, name: v }))} placeholder="Jane Smith" />
            <Input label="Card number" value={payment.card} onChange={(v) => setPayment((p) => ({ ...p, card: v }))} placeholder="•••• •••• •••• ••••" />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Expiry" value={payment.expiry} onChange={(v) => setPayment((p) => ({ ...p, expiry: v }))} placeholder="MM/YY" />
              <Input label="CVV" value={payment.cvv} onChange={(v) => setPayment((p) => ({ ...p, cvv: v }))} placeholder="•••" />
            </div>
          </div>
          <div className="bg-peak-surface border border-white/5 rounded-xl p-4 flex items-center justify-between mb-4">
            <span className="text-peak-text-secondary text-sm">Total due</span>
            <span className="text-peak-text font-bold text-xl">{"€" + total}</span>
          </div>
          <TrustBadges />
          <div className="flex gap-3 mt-6">
            <button onClick={() => setCheckoutStep(1)} className="px-5 py-2.5 border border-white/10 text-peak-text-secondary hover:text-peak-text text-sm rounded-xl transition-colors">Back</button>
            <button
              onClick={() => setComplete(true)}
              className="px-8 py-2.5 bg-peak-red hover:bg-peak-red-hover text-white font-display font-bold text-sm rounded-xl transition-colors"
            >
              {"Confirm & pay \u20ac" + total}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}