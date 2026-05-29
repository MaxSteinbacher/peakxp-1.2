import { useState, useRef } from "react";
import { useT } from "../../lib/i18n";
import { Pencil, ArrowRight, Check } from "lucide-react";

/**
 * AgentQuestionCard — single-select OR multi-select question card.
 * Always exactly 4 options + a t("something_else") custom input.
 */
export default function AgentQuestionCard({
  question,
  options,          // max 4
  stepIndex,
  totalSteps,
  onSelect,         // (answer: string) => void  — for single select
  onMultiSelect,    // (answers: string[]) => void — for multi select
  onSkip,
  onCustom,
  allowMultiple = false,
  agentColor = "text-peak-blue",
}) {
  const [selected, setSelected] = useState(null);           // single
  const [multiSelected, setMultiSelected] = useState([]);   // multi
  const [customValue, setCustomValue] = useState("");
  const [showCustom, setShowCustom] = useState(false);
  const customInputRef = useRef(null);

  // ── Single select ──────────────────────────────────────────────────────
  function handleOptionClick(opt) {
    if (allowMultiple) {
      setMultiSelected((prev) =>
        prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
      );
      return;
    }
    if (selected === opt) return;
    setSelected(opt);
    setTimeout(() => onSelect(opt), 260);
  }

  // ── Multi select confirm ───────────────────────────────────────────────
  function handleMultiConfirm() {
    if (multiSelected.length === 0) {
      onSkip();
      return;
    }
    onMultiSelect(multiSelected);
  }

  // ── Custom input ───────────────────────────────────────────────────────
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
      {/* Progress bar */}
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
        <p className="text-peak-text font-semibold text-base leading-snug">{question}</p>
        {allowMultiple && (
          <p className="text-peak-text-secondary text-xs mt-1">Select all that apply</p>
        )}
      </div>

      {/* Options */}
      <div className="px-3 pb-2 grid grid-cols-1 gap-1">
        {options.slice(0, 4).map((opt, i) => {
          const letter = String.fromCharCode(65 + i);
          const isSelected = allowMultiple
            ? multiSelected.includes(opt)
            : selected === opt;

          return (
            <button
              key={opt}
              onClick={() => handleOptionClick(opt)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-150 group border ${
                isSelected
                  ? "bg-peak-red/10 border-peak-red/30"
                  : "bg-white/3 border-transparent hover:bg-white/6 hover:border-white/10"
              }`}
            >
              <span
                className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${
                  isSelected
                    ? "bg-peak-red text-white"
                    : "bg-white/8 text-peak-text-secondary group-hover:bg-peak-red/20 group-hover:text-peak-red"
                }`}
              >
                {allowMultiple && isSelected ? <Check className="w-3.5 h-3.5" /> : letter}
              </span>
              <span className="text-peak-text text-sm flex-1 leading-snug">{opt}</span>
              <ArrowRight
                className={`w-3.5 h-3.5 flex-shrink-0 transition-colors ${
                  isSelected ? "text-peak-red/60" : "text-white/15 group-hover:text-white/40"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Custom input */}
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
              placeholder={t("type_your_answer")}
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

      {/* Footer: multi-confirm or skip */}
      <div className="pb-3 flex items-center justify-center gap-4">
        {allowMultiple && (
          <button
            onClick={handleMultiConfirm}
            className="px-5 py-2 rounded-xl bg-peak-red hover:bg-peak-red-hover text-white text-sm font-semibold transition-colors"
          >
            {multiSelected.length === 0 ? t("none_skip") : `Confirm (${multiSelected.length})`}
          </button>
        )}
        {!allowMultiple && (
          <button
            onClick={onSkip}
            className="text-peak-text-secondary/50 hover:text-peak-text-secondary text-xs transition-colors"
          >
            Skip this question
          </button>
        )}
      </div>
    </div>
  );
}