import { Sliders, Sparkles } from "lucide-react";

const EQUIPMENT_TYPES = [
  { key: "skis", label: "Skis", emoji: "🎿" },
  { key: "snowboard", label: "Snowboard", emoji: "🏂" },
  { key: "ski_boots", label: "Ski Boots", emoji: "👢" },
  { key: "snowboard_boots", label: "Snowboard Boots", emoji: "👟" },
  { key: "poles", label: "Poles", emoji: "🥢" },
  { key: "helmet", label: "Helmet", emoji: "⛑️" },
  { key: "ski_jacket", label: "Ski Jacket", emoji: "🧥" },
  { key: "ski_pants", label: "Ski Pants", emoji: "👖" },
  { key: "gloves", label: "Gloves", emoji: "🧤" },
  { key: "goggles", label: "Goggles", emoji: "🥽" },
  { key: "back_protector", label: "Back Protector", emoji: "🛡️" },
];

function toggle(arr, val) {
  return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
}

export default function Step0({ selectedEquipment, setSelectedEquipment, mode, setMode, onContinue }) {
  const canContinue = selectedEquipment.length > 0 && mode !== null;

  return (
    <div>
      <h2 className="font-display font-bold text-2xl text-peak-text mb-1">What do you need?</h2>
      <p className="text-peak-text-secondary text-sm mb-6">Select all the equipment you'd like to rent.</p>

      {/* Equipment grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 mb-8">
        {EQUIPMENT_TYPES.map((eq) => {
          const active = selectedEquipment.includes(eq.key);
          return (
            <button
              key={eq.key}
              onClick={() => setSelectedEquipment((prev) => toggle(prev, eq.key))}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 ${
                active
                  ? "border-peak-blue/50 bg-peak-blue/10 text-peak-blue"
                  : "border-white/10 bg-peak-card text-peak-text-secondary hover:border-white/25 hover:text-peak-text"
              }`}
            >
              <span className="text-2xl">{eq.emoji}</span>
              <span className="text-xs font-medium text-center leading-tight">{eq.label}</span>
            </button>
          );
        })}
      </div>

      {/* Mode selector */}
      <h3 className="font-display font-bold text-lg text-peak-text mb-3">How would you like to proceed?</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {[
          {
            key: "expert",
            title: "I know what I want",
            subtitle: "I'll choose my own specs.",
            icon: Sliders,
          },
          {
            key: "guided",
            title: "Help me choose",
            subtitle: "Answer a few questions and we'll match you.",
            icon: Sparkles,
          },
        ].map((m) => {
          const Icon = m.icon;
          const active = mode === m.key;
          return (
            <button
              key={m.key}
              onClick={() => setMode(m.key)}
              className={`flex items-start gap-4 p-5 rounded-xl border text-left transition-all duration-200 ${
                active
                  ? "border-peak-blue/50 bg-peak-blue/10"
                  : "border-white/10 bg-peak-card hover:border-white/25"
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${active ? "bg-peak-blue/20" : "bg-white/5"}`}>
                <Icon className={`h-5 w-5 ${active ? "text-peak-blue" : "text-peak-text-secondary"}`} />
              </div>
              <div>
                <p className={`font-semibold text-sm mb-0.5 ${active ? "text-peak-text" : "text-peak-text-secondary"}`}>{m.title}</p>
                <p className="text-peak-text-secondary text-xs">{m.subtitle}</p>
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={onContinue}
        disabled={!canContinue}
        className="px-8 py-3 bg-peak-red hover:bg-peak-red-hover disabled:opacity-40 disabled:cursor-not-allowed text-white font-display font-bold text-sm rounded-xl transition-colors"
      >
        Continue
      </button>
    </div>
  );
}