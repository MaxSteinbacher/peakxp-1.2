import { useState } from "react";
import { useT } from "../../lib/i18n";
import { Mountain, Building2, Wrench, GraduationCap, Baby,
  UtensilsCrossed, Plane, Train, Car, Package, Compass, ChevronRight } from "lucide-react";

const ALL_SERVICES = [
  { key: "ski-pass",     icon: Mountain,         label: "Ski pass",               desc: "Lift tickets for your dates" },
  { key: "accommodation",icon: Building2,         label: "Accommodation",          desc: "Hotel, chalet or apartment" },
  { key: "equipment",    icon: Wrench,            label: "Equipment rental",       desc: "Skis, boots, helmet, poles" },
  { key: "ski-school",   icon: GraduationCap,     label: "Ski school / instructor",desc: "Group or private lessons" },
  { key: "childcare",    icon: Baby,              label: "Childcare",              desc: "Nursery and kids' club" },
  { key: "dining",       icon: UtensilsCrossed,   label: "Dining reservations",    desc: "Mountain, valley, après-ski" },
  { key: "flights",      icon: Plane,             label: "Flights",                desc: "Return flights from your airport" },
  { key: "train",        icon: Train,             label: "Train travel",           desc: "Rail transfers to the resort" },
  { key: "car",          icon: Car,               label: "Car rental",             desc: "With snow tyres / 4WD option" },
  { key: "storage",      icon: Package,           label: "Storage & lockers",      desc: "Daily or full-trip storage" },
  { key: "activities",   icon: Compass,           label: "Activities",             desc: "Snowshoeing, spa, toboggan…" },
];

/**
 * Services to ALWAYS pre-include (not shown as optional — always in plan).
 * Services to HIDE per agent (don't make sense for that agent).
 */
const AGENT_SERVICE_CONFIG = {
  family: {
    alwaysIncluded: ["ski-pass", "accommodation"],
    hidden: [],
  },
  luxury: {
    alwaysIncluded: ["ski-pass", "accommodation"],
    hidden: ["storage"],
  },
  budget: {
    alwaysIncluded: ["ski-pass", "accommodation"],
    hidden: ["childcare"],
  },
  advanced: {
    alwaysIncluded: ["ski-pass", "accommodation"],
    hidden: ["childcare"],
  },
  beginner: {
    alwaysIncluded: ["ski-pass", "accommodation", "ski-school", "equipment"],
    hidden: ["childcare"],
  },
  explorer: {
    alwaysIncluded: ["ski-pass", "accommodation"],
    hidden: ["childcare"],
  },
};

export default function AgentServicesCard({ agentKey, onConfirm }) {
  const t = useT();
  const config = AGENT_SERVICE_CONFIG[agentKey] || { alwaysIncluded: ["ski-pass", "accommodation"], hidden: [] };

  // Optional services = not always included + not hidden
  const optionalServices = ALL_SERVICES.filter(
    (s) => !config.alwaysIncluded.includes(s.key) && !config.hidden.includes(s.key)
  );

  const [selected, setSelected] = useState([]);

  function toggle(key) {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  }

  function handleConfirm() {
    const allSelected = [...config.alwaysIncluded, ...selected];
    onConfirm(allSelected, selected);
  }

  return (
    <div className="w-full rounded-2xl bg-peak-surface border border-white/8 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/5">
        <p className="text-peak-text font-semibold text-base leading-snug">
          What else would you like me to include?
        </p>
        <p className="text-peak-text-secondary text-xs mt-1">
          Ski pass &amp; accommodation are always included. Add anything extra below.
        </p>
      </div>

      {/* Always-included pills */}
      <div className="px-5 pt-3 pb-2 flex flex-wrap gap-2">
        {config.alwaysIncluded.map((key) => {
          const svc = ALL_SERVICES.find((s) => s.key === key);
          if (!svc) return null;
          const Icon = svc.icon;
          return (
            <span key={key} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-peak-red/10 border border-peak-red/20 text-peak-red text-xs font-medium">
              <Icon className="w-3 h-3" />
              {svc.label}
            </span>
          );
        })}
      </div>

      {/* Optional services */}
      <div className="px-3 pb-2 grid grid-cols-1 gap-1">
        {optionalServices.map((svc) => {
          const Icon = svc.icon;
          const isSelected = selected.includes(svc.key);
          return (
            <button
              key={svc.key}
              onClick={() => toggle(svc.key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-150 group border ${
                isSelected
                  ? "bg-peak-blue/10 border-peak-blue/30"
                  : "bg-white/3 border-transparent hover:bg-white/6 hover:border-white/10"
              }`}
            >
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                isSelected ? "bg-peak-blue/20 text-peak-blue" : "bg-white/8 text-peak-text-secondary group-hover:text-peak-blue group-hover:bg-peak-blue/10"
              }`}>
                <Icon className="w-4 h-4" />
              </span>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium transition-colors ${isSelected ? "text-peak-blue" : "text-peak-text"}`}>
                  {svc.label}
                </p>
                <p className="text-peak-text-secondary text-xs">{svc.desc}</p>
              </div>
              <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                isSelected ? "bg-peak-blue border-peak-blue" : "border-white/20 group-hover:border-peak-blue/40"
              }`}>
                {isSelected && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Confirm */}
      <div className="px-5 pb-5 pt-3 border-t border-white/5 mt-1">
        <button
          onClick={handleConfirm}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-peak-red hover:bg-peak-red-hover text-white font-semibold text-sm transition-colors"
        >
          {selected.length === 0
            ? t("find_options")
            : `Include ${selected.length} extra service${selected.length > 1 ? "s" : ""} — find my options`}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
