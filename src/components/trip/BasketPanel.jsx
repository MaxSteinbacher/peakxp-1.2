import { X, ShoppingBag, Pencil, Ticket, Hotel, Wrench, GraduationCap, Utensils, Lock, Snowflake, Baby, Plane, Train, Car } from "lucide-react";
import { useTripPlanner } from "../../context/TripPlannerContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SERVICE_ICONS = {
  "ski-pass": Ticket, accommodation: Hotel, equipment: Wrench, "ski-school": GraduationCap,
  dining: Utensils, storage: Lock, activities: Snowflake, childcare: Baby,
  flights: Plane, train: Train, car: Car,
};

export default function BasketPanel({ open, onClose }) {
  const { session, removeFromBasket, getBasketTotal } = useTripPlanner();
  const navigate = useNavigate();

  if (!open || !session) return null;
  const total = getBasketTotal();

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 bottom-0 w-96 max-w-full bg-peak-card border-l border-white/10 z-50 flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <h3 className="font-display font-bold text-peak-text text-lg">Your trip basket</h3>
          <button onClick={onClose} className="text-peak-text-secondary hover:text-peak-text transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {session.basket.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <ShoppingBag className="h-12 w-12 text-peak-text-secondary/30 mb-3" />
              <p className="text-peak-text-secondary text-sm">{"No items yet — keep planning!"}</p>
            </div>
          ) : (
            session.basket.map(item => {
              const Icon = SERVICE_ICONS[item.serviceKey] || Ticket;
              return (
                <div key={item.itemId} className="bg-peak-surface rounded-xl p-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-peak-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="h-4 w-4 text-peak-blue" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-peak-text text-sm font-medium leading-tight">{item.label}</p>
                      {item.resortName && <p className="text-peak-text-secondary text-xs mt-0.5">{item.resortName}</p>}
                      <p className="text-peak-red font-bold text-sm mt-1">{"\u20AC"}{((item.priceEUR || 0) * (item.quantity || 1)).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button onClick={() => toast("Edit coming soon")} className="p-1.5 rounded-lg hover:bg-white/5 text-peak-text-secondary hover:text-peak-text transition-colors">
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button onClick={() => removeFromBasket(item.itemId)} className="p-1.5 rounded-lg hover:bg-white/5 text-peak-text-secondary hover:text-peak-red transition-colors">
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="px-5 py-4 border-t border-white/5">
          <div className="flex justify-between text-peak-text-secondary text-sm mb-1">
            <span>Subtotal</span>
            <span>{"\u20AC"}{total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-peak-text font-bold text-lg mb-4">
            <span>Total</span>
            <span>{"\u20AC"}{total.toLocaleString()}</span>
          </div>
          <button onClick={onClose} className="w-full border border-white/10 text-peak-text-secondary rounded-xl py-2.5 mb-2 hover:text-peak-text transition-colors text-sm">
            Continue planning
          </button>
          <button
            onClick={() => { onClose(); navigate("/plan/summary"); }}
            disabled={session.basket.length === 0}
            className="w-full bg-peak-red hover:bg-peak-red-hover disabled:opacity-40 text-white font-bold rounded-xl py-3 transition-colors"
          >
            {"Review & checkout"}
          </button>
        </div>
      </div>
    </>
  );
}