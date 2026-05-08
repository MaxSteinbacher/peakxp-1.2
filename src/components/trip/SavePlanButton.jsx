import { Bookmark } from "lucide-react";
import { toast } from "sonner";
import { savePlan } from "../../lib/bookings";

export default function SavePlanButton({ planData, userId, className = "" }) {
  function handleSave() {
    savePlan(userId || "guest", planData);
    toast.success("Saved to Trip Planning", {
      description: "View all your plans in My Trips",
      action: {
        label: "View",
        onClick: () => window.location.href = "/my-trips?tab=planning",
      },
    });
  }

  return (
    <button onClick={handleSave}
      className={`flex-1 border border-white/10 text-peak-text-secondary rounded-xl py-3 flex items-center justify-center gap-2 hover:border-white/25 hover:text-peak-text transition-colors ${className}`}>
      <Bookmark className="h-4 w-4" />
      Save to trip planning
    </button>
  );
}