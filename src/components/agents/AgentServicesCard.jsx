import { useState } from "react";
import { ChevronRight } from "lucide-react";

const ALL_SERVICES = [
  { key: "ski-pass", label: "Ski pass", emoji: "🎿", description: "Lift access & area pass" },
  { key: "accommodation", label: "Accommodation", emoji: "🏨", description: "Hotel, chalet or apartment" },
  { key: "flights", label: "Flights", emoji: "✈️", description: "Return flights" },
  { key: "train", label: "Train", emoji: "🚂", description: "Rail travel to resort" },
  { key: "equipment", label: "Equipment rental", emoji: "🎽", description: "Skis, boots, poles" },
  { key: "ski-school", label: "Ski school", emoji: "🏫", description: "Lessons and instruction" },
  { key: "childcare", label: "Childcare", emoji: "👶", description: "Kids club or crèche" },
  { key: "car", label: "Car rental", emoji: "🚗", description: "Hire car or transfers" },
  { key: "dining", label: "Dining", emoji: "🍽️", description: "Restaurant recommendations" },
  { key: "activities", label: "Activities", emoji: "⛷️", description: "Non-ski experiences" },
  { key: "storage", label: "Storage", emoji: "🔒", description: "Ski and boot storage" },
];

const DEFAULTS_BY_AGENT = {
  family: ["ski-pass", "accommodation", "ski-school", "childcare", "equipment"],
  luxury: ["ski-pass", "accommodation", "flights", "dining"],
  budget: ["ski-pass", "accommodation"],
  advanced: ["ski-pass", "accommodation", "equipment"],
  beginner: ["ski-pass", "accommodation", "ski-school", "equipment"],
  explorer: ["ski-pass", "accommodation", "flights"],
};

export default function AgentServicesCard({ agentKey, onConfirm }) {
  const defaults = DEFAULTS_BY_AGENT[agentKey] || ["ski-pass", "accommodation"];
  const [selected, setSelected] = useState(new Set(defaults));

  function toggle(key) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function handleConfirm() {
    onConfirm(Array.from(selected));
  }

  return (
    <div className="w-full rounded-2xl bg-peak-surface border border-white/8 overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-3">
        <p className="text-peak-text font-semibold text-base leading-snug">
          What would you like included?
        </p>
        <p className="text-peak-text-secondary text-xs mt-1">
          Select all the services you want help finding.
        </p>
      </div>

      {/* Services grid */}
      <div className="px-3 pb-3 grid grid-cols-2 gap-1.5 sm:grid-cols-3">
        {ALL_SERVICES.map(({ key, label, emoji, description }) => {
          const isSelected = selected.has(key);
          return (
            <button
              key={key}
              onClick={() => toggle(key)}
              className={`flex items-start gap-2.5 px-3 py-3 rounded-xl text-left transition-all duration-150 border ${
                isSelected
                  ? "bg-peak-red/10 border-peak-red/30"
                  : "bg-white/3 border-transparent hover:bg-white/6 hover:border-white/10"
              }`}
            >
              <span className="text-lg leading-none flex-shrink-0 mt-0.5">{emoji}</span>
              <div className="min-w-0">
                <p className={`text-xs font-semibold leading-snug ${isSelected ? "text-peak-text" : "text-peak-text-secondary"}`}>
                  {label}
                </p>
                <p className="text-peak-text-secondary/60 text-xs leading-snug mt-0.5 hidden sm:block">
                  {description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Confirm */}
      <div className="px-5 pb-5 pt-2">
        <button
          onClick={handleConfirm}
          disabled={selected.size === 0}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white text-sm font-semibold transition-colors ${
            selected.size > 0
              ? "bg-peak-red hover:bg-peak-red-hover"
              : "bg-peak-red/30 cursor-not-allowed"
          }`}
        >
          <ChevronRight className="h-3.5 w-3.5" />
          Continue with {selected.size} service{selected.size !== 1 ? "s" : ""}
        </button>
      </div>
    </div>
  );
}