import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, X, Pencil } from "lucide-react";

export default function AgentQuestionCard({
  question,
  options,
  stepIndex,
  totalSteps,
  onSelect,
  onSkip,
  onCustom,
  allowMultiple = false,
}) {
  const [selected, setSelected] = useState(null);
  const [customValue, setCustomValue] = useState("");
  const customInputRef = useRef(null);

  function handleOptionClick(opt) {
    setSelected(opt);
    setTimeout(() => onSelect(opt), 300);
  }

  function handleCustomSubmit() {
    if (!customValue.trim()) return;
    onCustom(customValue.trim());
    setCustomValue("");
  }

  const progress = ((stepIndex - 1) / totalSteps) * 100;

  return (
    <div className="bg-peak-surface/80 border border-white/8 rounded-2xl overflow-hidden mb-3">
      {/* Progress bar */}
      <div className="h-0.5 bg-peak-surface rounded-full">
        <div
          className="h-full bg-peak-red rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
        <p className="text-peak-text font-semibold text-base flex-1 pr-4">{question}</p>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-peak-text-secondary text-xs">{stepIndex} of {totalSteps}</span>
          <button
            onClick={onSkip}
            className="text-peak-text-secondary hover:text-peak-text transition-colors p-0.5"
            title="Previous"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            className="text-peak-text-secondary/40 transition-colors p-0.5 cursor-default"
            title="Next"
            tabIndex={-1}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={onSkip}
            className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-peak-text-secondary hover:text-peak-text transition-colors cursor-pointer ml-1"
            title="Skip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Options */}
      <div className="px-2 py-2">
        {options.map((opt, i) => {
          const isSelected = selected === opt;
          return (
            <button
              key={opt}
              onClick={() => handleOptionClick(opt)}
              className={`w-full flex items-center gap-3 px-3 py-3.5 rounded-xl cursor-pointer transition-colors group text-left
                ${isSelected
                  ? "bg-peak-red/10 border border-peak-red/25"
                  : "hover:bg-white/8 border border-transparent"
                }`}
            >
              <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors
                ${isSelected
                  ? "bg-peak-red text-white"
                  : "bg-white/8 text-peak-text-secondary group-hover:bg-peak-red/20 group-hover:text-peak-red"
                }`}>
                {i + 1}
              </span>
              <span className="text-peak-text text-sm flex-1">{opt}</span>
              <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-colors ${isSelected ? "text-peak-red/60" : "text-white/20 group-hover:text-peak-red"}`} />
            </button>
          );
        })}

        {/* Custom input row */}
        <div className="flex items-center gap-3 px-3 py-3 border-t border-white/5 mt-1">
          <Pencil className="w-4 h-4 text-peak-text-secondary flex-shrink-0" />
          <input
            ref={customInputRef}
            type="text"
            value={customValue}
            onChange={e => setCustomValue(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") handleCustomSubmit(); }}
            placeholder="Something else..."
            className="flex-1 bg-transparent text-peak-text-secondary text-sm placeholder:text-white/25 outline-none"
          />
          <button
            onClick={onSkip}
            className="text-peak-text-secondary text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex-shrink-0"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}