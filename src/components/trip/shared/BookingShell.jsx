import { ChevronLeft } from "lucide-react";
import { useT } from "../../../lib/i18n";
import StepIndicator from "./StepIndicator";

export default function BookingShell({ steps, current, onBack, children }) {
  const t = useT();
  return (
    <div>
      <StepIndicator steps={steps} current={current} />
      {current > 0 && (
        <button onClick={onBack} className="flex items-center gap-1.5 text-peak-text-secondary hover:text-peak-text text-sm mb-6 transition-colors">
          <ChevronLeft className="h-4 w-4" /> {t("back")}
        </button>
      )}
      {children}
    </div>
  );
}