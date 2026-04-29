import { Check } from "lucide-react";

export default function StepIndicator({ steps, current }) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
              i < current ? "bg-peak-blue border-peak-blue text-white"
              : i === current ? "border-peak-blue text-peak-blue bg-transparent"
              : "border-white/20 text-peak-text-secondary"
            }`}>
              {i < current ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span className={`text-xs whitespace-nowrap ${i === current ? "text-peak-text" : "text-peak-text-secondary"}`}>{label}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`flex-1 h-px mx-2 mb-4 ${i < current ? "bg-peak-blue" : "bg-white/10"}`} />
          )}
        </div>
      ))}
    </div>
  );
}