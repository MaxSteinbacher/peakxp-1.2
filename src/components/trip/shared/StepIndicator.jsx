import { Check } from "lucide-react";
import { useT } from "../../../lib/i18n";

export default function StepIndicator({ steps, current, label }) {
  const t = useT();
  return (
    <div className="mb-6">
      <div className="flex items-center gap-0 mb-2">
        {steps.map((stepLabel, i) => (
          <div key={stepLabel} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                i < current ? "bg-peak-red border-peak-red text-white"
                : i === current ? "border-peak-red text-peak-red bg-transparent"
                : "border-white/20 text-peak-text-secondary"
              }`}>
                {i < current ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className={`text-xs whitespace-nowrap ${i === current ? "text-peak-text" : "text-peak-text-secondary"}`}>{stepLabel}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-px mx-2 mb-4 ${i < current ? "bg-peak-red" : "bg-white/10"}`} />
            )}
          </div>
        ))}
      </div>
      <p className="text-peak-text-secondary text-xs">{t("step_label")} {current + 1} {t("of_label")} {steps.length} — {steps[current]}</p>
    </div>
  );
}