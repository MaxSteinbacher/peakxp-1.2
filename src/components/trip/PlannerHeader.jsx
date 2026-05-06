import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useTripPlanner } from "../../context/TripPlannerContext";
import PlannerProgressBar from "./PlannerProgressBar";

export default function PlannerHeader({ onOpenBasket, onLogoClick }) {
  const { session, getBasketTotal } = useTripPlanner();
  if (!session) return null;

  const total = getBasketTotal();
  const itemCount = session.basket.length;

  const dest = session.destination;
  const dates = session.dates;
  const guests = session.guests;
  const currentResort = session.currentStep?.resortId
    ? session.resorts.find(r => r.resortId === session.currentStep.resortId)
    : null;

  return (
    <div className="sticky top-0 z-30">
      {/* Main header */}
      <div className="h-16 bg-peak-surface border-b border-white/5 flex items-center px-4 sm:px-6 gap-4">
        <button onClick={onLogoClick} className="font-display font-bold text-peak-text text-lg flex-shrink-0">
          PEAK<span className="text-peak-red">XP</span>
        </button>

        <div className="flex-1 overflow-hidden">
          <PlannerProgressBar />
        </div>

        <button
          onClick={onOpenBasket}
          className="flex items-center gap-2 bg-peak-card border border-white/10 rounded-xl px-4 py-2 cursor-pointer hover:border-white/20 transition-colors flex-shrink-0"
        >
          <ShoppingBag className="h-4 w-4 text-peak-text-secondary" />
          {itemCount > 0 && (
            <span className="bg-peak-red text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {itemCount}
            </span>
          )}
          <span className="text-peak-text text-sm font-medium hidden sm:inline">€{total.toLocaleString()}</span>
        </button>
      </div>

      {/* Context banner */}
      <div className="bg-peak-surface/80 border-b border-white/5 px-4 sm:px-6 py-2 flex items-center gap-3 text-sm flex-wrap">
        {dest && (
          <span className="text-peak-text font-medium">{dest.flag} {dest.label}</span>
        )}
        {dates?.start && (
          <>
            <span className="text-white/20">·</span>
            <span className="text-peak-text-secondary">
              {new Date(dates.start).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
              {dates.end && ` → ${new Date(dates.end).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}`}
              {dates.nights && ` (${dates.nights} nights)`}
            </span>
          </>
        )}
        {guests && (
          <>
            <span className="text-white/20">·</span>
            <span className="text-peak-text-secondary">
              {guests.adults + guests.children + guests.seniors} guest{(guests.adults + guests.children + guests.seniors) !== 1 ? "s" : ""}
            </span>
          </>
        )}
        {currentResort && (
          <>
            <span className="text-white/20">→</span>
            <span className="text-peak-blue font-medium">Now planning: {currentResort.resortFlag} {currentResort.resortName}</span>
          </>
        )}
      </div>
    </div>
  );
}