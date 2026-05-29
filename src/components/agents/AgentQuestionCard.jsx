import { CheckCircle, ArrowRight, Plus, Ticket, Hotel, Wrench, GraduationCap, Utensils, Lock, Snowflake, Baby, Plane, Train, Car } from "lucide-react";
import { useT } from "../../lib/i18n";

const SERVICE_ICONS = {
  "ski-pass": Ticket, accommodation: Hotel, equipment: Wrench, "ski-school": GraduationCap,
  dining: Utensils, storage: Lock, activities: Snowflake, childcare: Baby,
  flights: Plane, train: Train, car: Car,
};

export default function CompletionPanel({ basket, total, onCheckout, onAddMore }) {
  const t = useT();
  const tax = Math.round(total * 0.1);
  const grandTotal = total + tax;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
      <div className="w-20 h-20 rounded-full bg-peak-green/20 flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-peak-green" />
      </div>
      <h2 className="font-display font-extrabold text-3xl text-peak-text mb-3">{t("trip_ready_review")}</h2>
      <p className="text-peak-text-secondary text-base mb-8">
        All your selections have been added to your basket. Review everything before checkout.
      </p>

      <div className="bg-peak-card border border-white/5 rounded-2xl p-5 text-left mb-8">
        <p className="font-bold text-peak-text text-base mb-4">{t("basket_summary")}</p>
        <div className="space-y-0">
          {basket.map(item => {
            const Icon = SERVICE_ICONS[item.serviceKey] || Ticket;
            return (
              <div key={item.itemId} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-2 min-w-0">
                  <Icon className="h-4 w-4 text-peak-blue flex-shrink-0" />
                  <span className="text-peak-text text-sm truncate">{item.label}</span>
                </div>
                <span className="font-semibold text-peak-text text-sm flex-shrink-0 ml-3">
                  €{((item.priceEUR || 0) * (item.quantity || 1)).toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-between pt-3 mt-1">
          <span className="font-bold text-peak-text">{t("total")}</span>
          <span className="font-bold text-peak-text text-xl">€{grandTotal.toLocaleString()}</span>
        </div>
        <p className="text-peak-text-secondary text-xs mt-1">{t("includes_taxes")}</p>
      </div>

      <div className="space-y-3">
        <button
          onClick={onCheckout}
          className="w-full bg-peak-red hover:bg-peak-red-hover text-white font-bold rounded-xl py-4 text-base flex items-center justify-center gap-2 transition-colors"
        >
          Review and checkout <ArrowRight className="h-5 w-5" />
        </button>
        <button
          onClick={onAddMore}
          className="w-full border border-white/10 text-peak-text-secondary rounded-xl py-3 text-sm hover:text-peak-text hover:border-white/20 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="h-4 w-4" /> Add more services
        </button>
      </div>
    </div>
  );
}