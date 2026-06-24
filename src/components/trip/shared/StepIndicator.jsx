import { Check } from "lucide-react";

/**
 * StepIndicator — premium pill-style step tracker used inside booking flows.
 * Replaces the old circle-numbered stepper.
 *
 * Props:
 *   steps      string[]   — step labels
 *   current    number     — 0-based active step index
 *   onStepClick? (i) => void — if provided, completed steps become clickable
 */
export default function StepIndicator({ steps, current, onStepClick }) {
  return (
    <div className="flex items-center gap-2 flex-wrap mb-6">
      {steps.map((label, i) => {
        const isDone = i < current;
        const isActive = i === current;
        const isClickable = isDone && typeof onStepClick === "function";

        return (
          <div key={i} className="flex items-center gap-2">
            <button
              onClick={isClickable ? () => onStepClick(i) : undefined}
              disabled={!isClickable}
              title={isClickable ? `Go back to ${label}` : label}
              className={[
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all",
                isActive
                  ? "bg-peak-red/15 border-peak-red/50 text-peak-red shadow-[0_0_0_1px_rgba(251,52,61,0.15)]"
                  : isDone
                  ? "bg-peak-green/10 border-peak-green/30 text-peak-green cursor-pointer hover:bg-peak-green/20"
                  : "border-white/10 text-peak-text-secondary cursor-default",
              ].join(" ")}
            >
              {isDone ? (
                <Check className="h-3 w-3 flex-shrink-0" />
              ) : (
                <span
                  className={[
                    "w-1.5 h-1.5 rounded-full flex-shrink-0",
                    isActive ? "bg-peak-red" : "bg-white/20",
                  ].join(" ")}
                />
              )}
              {label}
            </button>

            {/* Connector line between pills */}
            {i < steps.length - 1 && (
              <div
                className={[
                  "h-px w-5 flex-shrink-0 transition-colors",
                  isDone ? "bg-peak-green/25" : "bg-white/8",
                ].join(" ")}
              />
            )}
          </div>
        );
      })}

      {/* Step count label */}
      <span className="text-peak-text-secondary text-xs ml-1 flex-shrink-0">
        Step {current + 1} of {steps.length} — {steps[current]}
      </span>
    </div>
  );
}
