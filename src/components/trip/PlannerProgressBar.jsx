import { Check } from "lucide-react";
import { useTripPlanner } from "../../context/TripPlannerContext";

const SERVICE_LABELS = {
  "resort-selection": "Choose resort",
  "ski-pass":         "Lift pass",
  accommodation:      "Hotel",
  equipment:          "Equipment",
  "ski-school":       "Ski school",
  dining:             "Dining",
  storage:            "Storage",
  activities:         "Activities",
  childcare:          "Childcare",
  flights:            "Flights",
  train:              "Train",
  car:                "Car rental",
};

const GLOBAL_SERVICES = ["flights", "train", "car"];

export default function PlannerProgressBar() {
  const { session, isStepComplete, setCurrentStep } = useTripPlanner();
  if (!session) return null;

  const resortServices = session.selectedServices.filter(s => !GLOBAL_SERVICES.includes(s));
  const globalServices = session.selectedServices.filter(s => GLOBAL_SERVICES.includes(s));

  const steps = [];

  if (session.destination?.type !== "resort" && resortServices.length > 0 && session.resorts.length === 0) {
    steps.push({ key: "resort-selection", resortId: null, resortName: null });
  }

  const sortedResorts = [...session.resorts].sort((a, b) => a.order - b.order);
  for (const resort of sortedResorts) {
    for (const svc of resortServices) {
      steps.push({ key: svc, resortId: resort.resortId, resortName: resort.resortName });
    }
  }
  for (const svc of globalServices) {
    steps.push({ key: svc, resortId: null, resortName: null });
  }

  const currentStep = session.currentStep;

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar py-1">
      {steps.map((step, i) => {
        const done = isStepComplete(step.key, step.resortId);
        const isCurrent = currentStep?.serviceKey === step.key && currentStep?.resortId === step.resortId;
        // Completed steps AND currently-active step are clickable.
        // Also allow clicking completed steps even when the CompletionPanel is showing
        // (session.currentStep may not match anything — allDone state).
        const isClickable = done || isCurrent;

        return (
          <div key={`${step.key}-${step.resortId || "g"}-${i}`} className="flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={() => {
                if (isClickable) setCurrentStep(step.key, step.resortId);
              }}
              disabled={!isClickable}
              title={isClickable ? `Go to: ${SERVICE_LABELS[step.key] || step.key}` : SERVICE_LABELS[step.key] || step.key}
              className={[
                "px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 whitespace-nowrap transition-all",
                done
                  ? "bg-peak-green/20 text-peak-green hover:bg-peak-green/30 cursor-pointer"
                  : isCurrent
                  ? "bg-peak-red text-white cursor-default"
                  : "bg-peak-surface border border-white/10 text-peak-text-secondary cursor-default opacity-60",
              ].join(" ")}
            >
              {done && <Check className="h-3 w-3" />}
              {step.resortName && !GLOBAL_SERVICES.includes(step.key) && (
                <span className="opacity-60 mr-0.5">{step.resortName} ·</span>
              )}
              {SERVICE_LABELS[step.key] || step.key}
            </button>
            {i < steps.length - 1 && <span className="text-white/15 text-xs flex-shrink-0">→</span>}
          </div>
        );
      })}
    </div>
  );
}
