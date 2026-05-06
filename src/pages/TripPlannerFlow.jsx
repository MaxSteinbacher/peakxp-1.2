import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTripPlanner, useUnsavedTripWarning } from "../context/TripPlannerContext";
import { useAppAuth } from "../context/AppAuthContext";
import PlannerHeader from "../components/trip/PlannerHeader";
import BasketPanel from "../components/trip/BasketPanel";
import LeaveWarningModal from "../components/trip/LeaveWarningModal";
import ResortSelectionStep from "../components/trip/steps/ResortSelectionStep";
import ServiceStep from "../components/trip/steps/ServiceStep";
import { MapPin, ArrowRight } from "lucide-react";

export default function TripPlannerFlow() {
  const { session, setCurrentStep, getNextStep } = useTripPlanner();
  const { user } = useAppAuth();
  const navigate = useNavigate();
  const [basketOpen, setBasketOpen] = useState(false);
  const [showLeaveWarning, setShowLeaveWarning] = useState(false);

  useUnsavedTripWarning();

  // Check for ?edit=itemId
  useEffect(() => {
    if (!session) return;
    const params = new URLSearchParams(window.location.search);
    const editId = params.get("edit");
    if (editId) {
      const item = session.basket.find(b => b.itemId === editId);
      if (item) {
        setCurrentStep(item.serviceKey, item.resortId);
      }
    }
  }, []);

  // Auto-advance to next step on mount if no current step
  useEffect(() => {
    if (!session || session.status !== "in-progress") return;
    if (!session.currentStep) {
      const next = getNextStep();
      if (next) setCurrentStep(next.serviceKey, next.resortId);
    }
  }, [session?.status]);

  function handleLogoClick() {
    if (session && session.basket.length > 0) {
      setShowLeaveWarning(true);
    } else {
      navigate("/");
    }
  }

  if (!session || session.status !== "in-progress") {
    return (
      <div className="min-h-screen bg-peak-bg flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <MapPin className="h-12 w-12 text-peak-text-secondary/30 mx-auto mb-4" />
          <h2 className="font-display font-bold text-2xl text-peak-text mb-2">No trip in progress</h2>
          <p className="text-peak-text-secondary text-sm mb-6">Start by searching for a destination on the home page.</p>
          <button onClick={() => navigate("/")} className="px-6 py-3 bg-peak-red hover:bg-peak-red-hover text-white font-bold rounded-xl transition-colors">
            Start planning
          </button>
        </div>
      </div>
    );
  }

  const current = session.currentStep;
  const allDone = getNextStep() === null && session.completedSteps.length > 0;

  return (
    <div className="min-h-screen bg-peak-bg">
      <PlannerHeader onOpenBasket={() => setBasketOpen(true)} onLogoClick={handleLogoClick} />
      <BasketPanel open={basketOpen} onClose={() => setBasketOpen(false)} />

      {showLeaveWarning && (
        <LeaveWarningModal
          isLoggedIn={!!user}
          onDismiss={() => setShowLeaveWarning(false)}
          onLeave={() => { setShowLeaveWarning(false); navigate("/"); }}
        />
      )}

      {allDone ? (
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-peak-green/20 flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">{"\uD83C\uDF89"}</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl text-peak-text mb-2">All steps complete!</h2>
          <p className="text-peak-text-secondary text-sm mb-8">Review your selections and proceed to checkout.</p>
          <button onClick={() => navigate("/plan/summary")} className="px-8 py-3 bg-peak-red hover:bg-peak-red-hover text-white font-bold rounded-xl transition-colors text-lg inline-flex items-center gap-2">
            {"Review & checkout"} <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      ) : current?.serviceKey === "resort-selection" ? (
        <ResortSelectionStep />
      ) : current?.serviceKey ? (
        <ServiceStep serviceKey={current.serviceKey} resortId={current.resortId} />
      ) : (
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <p className="text-peak-text-secondary">Setting up your trip plan...</p>
        </div>
      )}
    </div>
  );
}