import { useState, useRef } from "react";
import { Pencil, ArrowRight } from "lucide-react";

export default function AgentQuestionCard({
  question,
  options,
  stepIndex,
  totalSteps,
  onSelect,
  onSkip,
  onCustom,
  agentColor = "text-peak-blue",
  agentBg = "bg-peak-blue/10",
}) {
  const [selected, setSelected] = useState(null);
  const [customValue, setCustomValue] = useState("");
  const [showCustom, setShowCustom] = useState(false);
  const customInputRef = useRef(null);

  function handleOptionClick(opt) {
    if (selected === opt) return;
    setSelected(opt);
    setTimeout(() => onSelect(opt), 260);
  }

  function handleCustomSubmit() {
    if (!customValue.trim()) return;
    onCustom(customValue.trim());
    setCustomValue("");
    setShowCustom(false);
  }

  function handleShowCustom() {
    setShowCustom(true);
    setTimeout(() => customInputRef.current?.focus(), 50);
  }

  const filledSteps = stepIndex - 1;

  return (
    <div className="w-full rounded-2xl bg-peak-surface border border-white/8 overflow-hidden">
      {/* Step dots */}
      <div className="flex items-center gap-1.5 px-5 pt-4 pb-1">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full flex-1 transition-all duration-500 ${
              i < filledSteps
                ? "bg-peak-red"
                : i === filledSteps
                ? "bg-peak-red/40"
                : "bg-white/8"
            }`}
          />
        ))}
        <span className="text-peak-text-secondary text-xs ml-1 flex-shrink-0">
          {stepIndex}/{totalSteps}
        </span>
      </div>

      {/* Question */}
      <div className="px-5 pt-3 pb-4">
        <p className="text-peak-text font-semibold text-base leading-snug">
          {question}
        </p>
      </div>

      {/* Options grid */}
      <div className="px-3 pb-2 grid grid-cols-1 gap-1">
        {options.map((opt, i) => {
          const isSelected = selected === opt;
          const letter = String.fromCharCode(65 + i); // A, B, C…
          return (
            <button
              key={opt}
              onClick={() => handleOptionClick(opt)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-150 group border ${
                isSelected
                  ? "bg-peak-red/10 border-peak-red/30 scale-[0.99]"
                  : "bg-white/3 border-transparent hover:bg-white/6 hover:border-white/10"
              }`}
            >
              {/* Letter badge */}
              <span
                className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${
                  isSelected
                    ? "bg-peak-red text-white"
                    : "bg-white/8 text-peak-text-secondary group-hover:bg-peak-red/20 group-hover:text-peak-red"
                }`}
              >
                {letter}
              </span>
              <span className="text-peak-text text-sm flex-1 leading-snug">
                {opt}
              </span>
              <ArrowRight
                className={`w-3.5 h-3.5 flex-shrink-0 transition-colors ${
                  isSelected ? "text-peak-red/60" : "text-white/15 group-hover:text-white/40"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Custom answer row */}
      <div className="mx-3 mb-3 mt-1 border-t border-white/5 pt-2">
        {!showCustom ? (
          <button
            onClick={handleShowCustom}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-left bg-white/3 border border-dashed border-white/10 hover:border-white/20 hover:bg-white/5 transition-all group"
          >
            <Pencil className="w-3.5 h-3.5 text-peak-text-secondary group-hover:text-peak-text transition-colors flex-shrink-0" />
            <span className="text-peak-text-secondary text-sm group-hover:text-peak-text transition-colors">
              Something else…
            </span>
          </button>
        ) : (
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/15">
            <Pencil className="w-3.5 h-3.5 text-peak-text-secondary flex-shrink-0" />
            <input
              ref={customInputRef}
              type="text"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCustomSubmit();
                if (e.key === "Escape") { setShowCustom(false); setCustomValue(""); }
              }}
              placeholder="Type your answer…"
              className="flex-1 bg-transparent text-peak-text text-sm placeholder:text-white/25 outline-none"
            />
            <button
              onClick={handleCustomSubmit}
              disabled={!customValue.trim()}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors flex-shrink-0 ${
                customValue.trim()
                  ? "bg-peak-red text-white hover:bg-peak-red-hover"
                  : "bg-white/5 text-peak-text-secondary/40 cursor-default"
              }`}
            >
              Send
            </button>
          </div>
        )}
      </div>

      {/* Skip */}
      <div className="pb-3 flex justify-center">
        <button
          onClick={onSkip}
          className="text-peak-text-secondary/50 hover:text-peak-text-secondary text-xs transition-colors"
        >
          Skip this question
        </button>
      </div>
    </div>
  );
}
