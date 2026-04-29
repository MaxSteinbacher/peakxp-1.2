import { useState } from "react";
import { Check, ShieldCheck, RefreshCw, Lock } from "lucide-react";
import StepIndicator from "./StepIndicator";

function Input({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label className="block text-xs text-peak-text-secondary mb-1">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
    </div>
  );
}

export function TrustBadges({ badges }) {
  const iconMap = { ShieldCheck, RefreshCw, Lock };
  return (
    <div className="flex flex-wrap gap-4 mt-4">
      {badges.map(({ icon, label }) => {
        const Icon = iconMap[icon] || ShieldCheck;
        return (
          <div key={label} className="flex items-center gap-2 text-xs text-peak-text-secondary">
            <Icon className="h-3.5 w-3.5 text-peak-green" />
            <span>{label}</span>
          </div>
        );
      })}
    </div>
  );
}

const CHECKOUT_STEPS = ["Summary", "Details", "Payment"];

export default function CheckoutFlow({ summary, guestFields, trustBadges, onComplete, totalPrice }) {
  const [step, setStep] = useState(0);
  const [guestData, setGuestData] = useState([{}]);
  const [payment, setPayment] = useState({ name: "", card: "", expiry: "", cvv: "" });
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="max-w-md mx-auto text-center py-16">
        <div className="w-16 h-16 rounded-full bg-peak-green/20 flex items-center justify-center mx-auto mb-4">
          <Check className="h-8 w-8 text-peak-green" />
        </div>
        <h2 className="font-display font-bold text-2xl text-peak-text mb-2">Booking confirmed!</h2>
        <p className="text-peak-text-secondary text-sm">A confirmation has been sent to your email.</p>
        <TrustBadges badges={trustBadges} />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <StepIndicator steps={CHECKOUT_STEPS} current={step} />

      {step === 0 && (
        <div>
          <h3 className="font-display font-bold text-xl text-peak-text mb-4">Summary</h3>
          <div className="bg-peak-card border border-white/5 rounded-xl p-5 space-y-3 mb-5">
            {summary.map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between text-sm">
                <span className="text-peak-text-secondary">{label}</span>
                <span className="text-peak-text font-medium">{value}</span>
              </div>
            ))}
            <div className="border-t border-white/5 pt-3 flex items-center justify-between">
              <span className="text-peak-text font-semibold">Total</span>
              <span className="text-peak-text font-bold text-xl">{"€" + totalPrice}</span>
            </div>
          </div>
          <TrustBadges badges={trustBadges} />
          <button onClick={() => setStep(1)} className="mt-6 px-8 py-3 bg-peak-red hover:bg-peak-red-hover text-white font-display font-bold text-sm rounded-xl transition-colors">Continue</button>
        </div>
      )}

      {step === 1 && (
        <div>
          <h3 className="font-display font-bold text-xl text-peak-text mb-4">Your details</h3>
          <div className="bg-peak-card border border-white/5 rounded-xl p-5 space-y-4 mb-6">
            {guestFields.map((f) => (
              <Input key={f.key} label={f.label} placeholder={f.placeholder} type={f.type || "text"}
                value={guestData[0][f.key] || ""}
                onChange={(v) => setGuestData([{ ...guestData[0], [f.key]: v }])} />
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(0)} className="px-5 py-2.5 border border-white/10 text-peak-text-secondary hover:text-peak-text text-sm rounded-xl transition-colors">Back</button>
            <button onClick={() => setStep(2)} className="px-8 py-2.5 bg-peak-red hover:bg-peak-red-hover text-white font-display font-bold text-sm rounded-xl transition-colors">Continue to payment</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 className="font-display font-bold text-xl text-peak-text mb-4">Payment</h3>
          <div className="bg-peak-card border border-white/5 rounded-xl p-5 space-y-4 mb-4">
            <Input label="Cardholder name" value={payment.name} onChange={(v) => setPayment((p) => ({ ...p, name: v }))} placeholder="Jane Smith" />
            <Input label="Card number" value={payment.card} onChange={(v) => setPayment((p) => ({ ...p, card: v }))} placeholder="•••• •••• •••• ••••" />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Expiry" value={payment.expiry} onChange={(v) => setPayment((p) => ({ ...p, expiry: v }))} placeholder="MM/YY" />
              <Input label="CVV" value={payment.cvv} onChange={(v) => setPayment((p) => ({ ...p, cvv: v }))} placeholder="•••" />
            </div>
          </div>
          <div className="bg-peak-surface border border-white/5 rounded-xl p-4 flex items-center justify-between mb-4">
            <span className="text-peak-text-secondary text-sm">Total due</span>
            <span className="text-peak-text font-bold text-xl">{"€" + totalPrice}</span>
          </div>
          <TrustBadges badges={trustBadges} />
          <div className="flex gap-3 mt-6">
            <button onClick={() => setStep(1)} className="px-5 py-2.5 border border-white/10 text-peak-text-secondary hover:text-peak-text text-sm rounded-xl transition-colors">Back</button>
            <button onClick={() => setDone(true)} className="px-8 py-2.5 bg-peak-red hover:bg-peak-red-hover text-white font-display font-bold text-sm rounded-xl transition-colors">
              {"Confirm \u0026 pay \u20ac" + totalPrice}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}