import { ShieldCheck, RefreshCw, Lock, ShoppingBag, Bookmark } from "lucide-react";
import { savePlan } from "../../../lib/bookings";
import { toast } from "sonner";
import { useAppAuth } from "../../../context/AppAuthContext";
import { useProfile } from "../../../context/ProfileContext";

const LABELS = {
  skis: "Skis", snowboard: "Snowboard", ski_boots: "Ski Boots",
  snowboard_boots: "Snowboard Boots", poles: "Poles",
  helmet: "Helmet", back_protector: "Back Protector",
};

function TrustBadges() {
  return (
    <div className="flex flex-wrap gap-4 mt-4">
      {[
        [ShieldCheck, "Pick up ready on arrival"],
        [RefreshCw, "Free size exchange on day 1"],
        [Lock, "SSL secured"],
      ].map(([Icon, label]) => (
        <div key={label} className="flex items-center gap-2 text-xs text-peak-text-secondary">
          <Icon className="h-3.5 w-3.5 text-peak-green" />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

export default function Step3Checkout({ selectedEquipment, shop, specs, answers, onBook, onBack }) {
  const { user } = useAppAuth();
  const { profile } = useProfile();
  const days = answers?.days || 3;
  const total = shop ? shop.pricePerDay * days : 0;

  // Auto-fill measurements from profile if logged in
  const profileSummary = profile ? [
    profile.height && `Height: ${profile.height}cm`,
    profile.weight && `Weight: ${profile.weight}kg`,
    profile.shoeSize && `Shoe size: EU ${profile.shoeSize}`,
    profile.skiingLevel && `Level: ${profile.skiingLevel}`,
  ].filter(Boolean).join(" · ") : null;

  function handleSave() {
    savePlan("guest", {
      serviceKey: "equipment",
      name: `${shop?.name} — ${selectedEquipment.join(", ")}`,
      destination: { label: shop?.name || "Equipment rental", type: "general" },
      itemDetails: { shop: shop?.name, equipment: selectedEquipment, days },
      estimatedPriceEUR: total,
    });
    toast.success("Saved to Trip Planning", {
      description: "View in My Trips",
      action: { label: "View", onClick: () => { window.location.href = "/my-trips?tab=planning"; } },
    });
  }

  return (
    <div className="max-w-2xl mx-auto w-full">
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
            <span className="text-peak-text">{answers.dates.start} → {answers.dates.end}</span>
          </div>
        )}
        <div className="border-t border-white/5 pt-3 space-y-1">
          {selectedEquipment.map((k) => (
            <div key={k} className="flex items-center justify-between text-sm">
              <span className="text-peak-text-secondary capitalize">{LABELS[k] || k}</span>
              <span className="text-peak-text text-xs">Included</span>
            </div>
          ))}
        </div>
        <div className="border-t border-white/5 pt-3 flex items-center justify-between">
          <span className="text-peak-text font-semibold">Total</span>
          <span className="text-peak-text font-bold text-xl">€{total}</span>
        </div>
      </div>

      {/* Profile auto-fill notice */}
      {user && profileSummary && (
        <div className="flex items-start gap-2 bg-peak-blue/10 border border-peak-blue/20 rounded-xl px-4 py-2.5 mb-4">
          <p className="text-peak-blue text-xs">
            <span className="font-semibold">Measurements from your profile:</span> {profileSummary}
          </p>
        </div>
      )}
      {user && !profileSummary && (
        <div className="flex items-start gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 mb-4">
          <p className="text-peak-text-secondary text-xs">
            Add your measurements to your profile and the shop will prepare your gear in advance.
            <a href="/profile/settings" className="text-peak-blue ml-1 hover:underline">Update profile →</a>
          </p>
        </div>
      )}

      <TrustBadges />

      <div className="flex gap-3 mt-6 flex-wrap">
        {onBack && (
          <button onClick={onBack} className="px-5 py-2.5 border border-white/10 text-peak-text-secondary hover:text-peak-text text-sm rounded-xl transition-colors">
            Back
          </button>
        )}
        <button
          onClick={() => onBook?.(`${shop?.name} — Equipment rental · ${days} days`, total, { shop: shop?.name, days, equipment: selectedEquipment })}
          className="flex-1 py-3 bg-peak-red hover:bg-peak-red-hover text-white font-display font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingBag className="h-4 w-4" /> Add to trip basket
        </button>
        <button
          onClick={handleSave}
          className="flex-1 py-3 border border-white/10 text-peak-text-secondary rounded-xl flex items-center justify-center gap-2 hover:border-white/25 hover:text-peak-text transition-colors text-sm"
        >
          <Bookmark className="h-4 w-4" /> Save to planning
        </button>
      </div>
    </div>
  );
}
