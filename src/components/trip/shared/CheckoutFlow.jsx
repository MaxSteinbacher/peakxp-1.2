import { useState } from "react";
import { ShieldCheck, RefreshCw, Lock, Zap, ShoppingBag, Bookmark } from "lucide-react";
import StepIndicator from "./StepIndicator";
import { savePlan } from "../../../lib/bookings";
import { toast } from "sonner";

function Input({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label className="block text-xs text-peak-text-secondary mb-1">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
    </div>
  );
}

export function TrustBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
      {[
        [ShieldCheck, "Price guarantee"],
        [Zap, "Instant confirmation"],
        [RefreshCw, "Free cancellation on eligible items"],
        [Lock, "SSL secured"],
      ].map(([Icon, label]) => (
        <div key={label} className="flex items-center gap-1.5 text-peak-text-secondary text-xs">
          <Icon className="h-3.5 w-3.5" />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

const CHECKOUT_STEPS = ["Summary", "Your details"];

export default function CheckoutFlow({ summary, guestFields, trustBadges, onComplete, totalPrice, planData }) {
  const [step, setStep] = useState(0);
  const [guestData, setGuestData] = useState([{}]);

  return (
    <div className="max-w-2xl mx-auto">
      <StepIndicator steps={CHECKOUT_STEPS} current={step} />

      {step === 0 && (
        <div>
          <h3 className="font-display font-bold text-xl text-peak-text mb-4">Booking summary</h3>
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
          <TrustBadges />
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
          <TrustBadges />
          <div className="flex gap-3 mt-6 flex-wrap">
            <button onClick={() => setStep(0)} className="px-5 py-2.5 border border-white/10 text-peak-text-secondary hover:text-peak-text text-sm rounded-xl transition-colors">Back</button>
            <button onClick={() => onComplete?.(guestData[0])}
              className="flex-1 py-3 bg-peak-red hover:bg-peak-red-hover text-white font-display font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2">
              <ShoppingBag className="h-4 w-4" /> Add to trip basket
            </button>
            {planData && (
              <button
                onClick={() => {
                  savePlan("guest", planData);
                  toast.success("Saved to Trip Planning", { description: "View in My Trips", action: { label: "View", onClick: () => { window.location.href = "/my-trips?tab=planning"; } } });
                }}
                className="flex-1 py-3 border border-white/10 text-peak-text-secondary rounded-xl flex items-center justify-center gap-2 hover:border-white/25 hover:text-peak-text transition-colors text-sm">
                <Bookmark className="h-4 w-4" /> Save to trip planning
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}