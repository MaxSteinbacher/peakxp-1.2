import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle, ArrowRight, Mountain, Building2, Wrench,
  GraduationCap, Baby, UtensilsCrossed, Plane, Train, Car,
  Package, Compass, ChevronDown, ChevronUp
} from "lucide-react";
import { useTripPlanner } from "../../context/TripPlannerContext";
import { resorts } from "../../lib/data";
import { toast } from "sonner";

const SERVICE_ICONS = {
  "ski-pass": Mountain,
  "accommodation": Building2,
  "equipment": Wrench,
  "ski-school": GraduationCap,
  "childcare": Baby,
  "dining": UtensilsCrossed,
  "flights": Plane,
  "train": Train,
  "car": Car,
  "storage": Package,
  "activities": Compass,
};

const LABEL_STYLES = {
  "Top pick": "bg-peak-red/20 text-peak-red",
  "Best value": "bg-peak-green/20 text-peak-green",
  "Premium choice": "bg-yellow-400/20 text-yellow-400",
  "Hidden gem": "bg-purple-400/20 text-purple-400",
  "Most family-friendly": "bg-peak-blue/20 text-peak-blue",
};

function getLabelStyle(label) {
  return LABEL_STYLES[label] || "bg-peak-surface text-peak-text-secondary";
}

export default function AgentOptionsPanel({ options, agentKey, agentName, onClose, onStartOver }) {
  const [compareOpen, setCompareOpen] = useState(false);
  const { startTrip, addResort } = useTripPlanner();
  const navigate = useNavigate();

  function handleBook(option) {
    const resortObj = resorts.find(
      (r) => r.id === option.primaryResortId || r.name === option.resortName
    );

    const destination = {
      type: "resort",
      label: option.resortName || option.destination || "",
      id: option.primaryResortId || resortObj?.id || null,
      countryCode: resortObj?.country || null,
      flag: resortObj?.flag || "",
    };

    const dates = option.dates
      ? { ...option.dates, nights: option.dates.start && option.dates.end
          ? Math.round((new Date(option.dates.end) - new Date(option.dates.start)) / 86400000)
          : null }
      : { start: null, end: null, nights: null };

    const guests = option.guests || { adults: 2, children: 0, seniors: 0 };
    const selectedServices = option.selectedServices?.length > 0
      ? option.selectedServices
      : ["ski-pass"];

    startTrip(destination, dates, guests, selectedServices);

    if (resortObj) {
      setTimeout(() => addResort({ ...resortObj, resortId: resortObj.id }), 80);
    }

    sessionStorage.setItem("peakxp_agent_option", JSON.stringify({
      agentKey,
      agentName,
      optionLabel: option.optionLabel,
      optionSummary: option.optionSummary,
      resortName: option.resortName,
    }));

    onClose();
    navigate("/plan");
  }

  function handleSaveAll() {
    const existing = JSON.parse(localStorage.getItem("peakxp_agent_plans") || "[]");
    existing.push({
      id: String(Date.now()),
      agentKey,
      agentName,
      createdAt: new Date().toISOString(),
      options,
      status: "saved",
    });
    localStorage.setItem("peakxp_agent_plans", JSON.stringify(existing));
    toast.success("Options saved to My Trips");
  }

  if (!options || options.length === 0) return null;

  return (
    <div className="w-full mt-4 space-y-3">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <CheckCircle className="h-5 w-5 text-peak-green flex-shrink-0" />
        <div>
          <p className="font-display font-bold text-peak-text text-base">Here are your personalised options</p>
          <p className="text-peak-text-secondary text-xs">Select one to start booking or compare them below</p>
        </div>
      </div>

      {/* Option cards */}
      {options.map((option) => (
        <div
          key={option.optionIndex}
          className="bg-peak-card border border-white/5 rounded-2xl overflow-hidden hover:border-white/15 transition-all duration-200 hover:-translate-y-0.5"
        >
          {/* Card header */}
          <div className="px-5 pt-4 pb-2">
            <div className="flex items-start justify-between gap-3">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${getLabelStyle(option.optionLabel)}`}>
                {option.optionLabel}
              </span>
              <div className="text-right flex-shrink-0">
                <p className="font-display font-bold text-peak-text text-xl">
                  €{(option.estimatedTotalEUR || 0).toLocaleString()}
                </p>
                <p className="text-peak-text-secondary text-xs">est. total</p>
              </div>
            </div>
            <p className="font-display font-bold text-peak-text text-lg mt-2 leading-tight">
              {option.resortName || option.destination}
            </p>
            <p className="text-peak-text-secondary text-sm mt-0.5 leading-relaxed">{option.optionSummary}</p>
          </div>

          {/* Highlights */}
          {option.highlights?.length > 0 && (
            <div className="flex flex-wrap gap-2 px-5 pb-2">
              {option.highlights.map((h, i) => (
                <span key={i} className="bg-peak-surface border border-white/5 rounded-full px-3 py-1 text-peak-text-secondary text-xs">
                  {h}
                </span>
              ))}
            </div>
          )}

          {/* Services */}
          {option.selectedServices?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 px-5 pb-3">
              {option.selectedServices.map((svc) => {
                const Icon = SERVICE_ICONS[svc] || Package;
                return (
                  <span key={svc} className="flex items-center gap-1 bg-peak-surface rounded-lg px-2 py-1 text-peak-text-secondary text-xs">
                    <Icon className="h-3 w-3" />
                    {svc.replace(/-/g, " ")}
                  </span>
                );
              })}
            </div>
          )}

          {/* Footer */}
          <div className="px-5 py-3 border-t border-white/5 flex items-center justify-between gap-4">
            {option.notes ? (
              <p className="text-peak-text-secondary text-xs italic flex-1 truncate min-w-0" title={option.notes}>
                {option.notes}
              </p>
            ) : <span className="flex-1" />}
            <button
              onClick={() => handleBook(option)}
              className="bg-peak-red hover:bg-peak-red-hover text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-2 flex-shrink-0"
            >
              Book this trip <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}

      {/* Compare toggle */}
      <button
        onClick={() => setCompareOpen((v) => !v)}
        className="text-peak-blue text-xs hover:underline text-center w-full flex items-center justify-center gap-1 mt-1"
      >
        {compareOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        {compareOpen ? "Hide comparison" : "Compare all options"}
      </button>

      {/* Comparison table */}
      {compareOpen && (
        <div className="overflow-x-auto rounded-xl border border-white/5 mt-2">
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <td className="px-4 py-3 bg-peak-surface text-peak-text-secondary text-xs font-semibold border border-white/5 min-w-[110px]" />
                {options.map((o) => (
                  <td key={o.optionIndex} className="px-4 py-3 bg-peak-surface border border-white/5 min-w-[150px]">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${getLabelStyle(o.optionLabel)}`}>
                      {o.optionLabel}
                    </span>
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Resort", render: (o) => <span className="text-peak-text text-xs font-medium">{o.resortName}</span> },
                { label: "Est. price", render: (o) => <span className="text-peak-text text-xs font-bold">€{(o.estimatedTotalEUR || 0).toLocaleString()}</span> },
                {
                  label: "Services", render: (o) => (
                    <div className="flex flex-wrap gap-1">
                      {(o.selectedServices || []).map((s) => {
                        const Icon = SERVICE_ICONS[s] || Package;
                        return (
                          <span key={s} title={s} className="w-5 h-5 rounded bg-peak-surface border border-white/10 flex items-center justify-center">
                            <Icon className="h-3 w-3 text-peak-blue" />
                          </span>
                        );
                      })}
                    </div>
                  )
                },
                { label: "Highlights", render: (o) => <span className="text-peak-text-secondary text-xs leading-relaxed">{(o.highlights || []).join(" · ")}</span> },
              ].map(({ label, render }, ri) => (
                <tr key={label} className={ri % 2 === 0 ? "bg-peak-surface/50" : ""}>
                  <td className="px-4 py-3 border border-white/5 text-peak-text-secondary text-xs font-semibold whitespace-nowrap">{label}</td>
                  {options.map((o) => (
                    <td key={o.optionIndex} className="px-4 py-3 border border-white/5 align-top">{render(o)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Save / Start over */}
      <div className="flex items-center justify-center gap-3 mt-3 pt-3 border-t border-white/5">
        <button onClick={handleSaveAll} className="text-peak-text-secondary text-xs hover:text-peak-text transition-colors">
          Save all options to My Trips
        </button>
        <span className="text-peak-text-secondary text-xs">·</span>
        <button onClick={onStartOver} className="text-peak-text-secondary text-xs hover:text-peak-text transition-colors">
          Start over
        </button>
      </div>
    </div>
  );
}