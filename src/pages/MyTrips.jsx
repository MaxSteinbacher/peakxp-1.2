import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bot, Calendar, Clock, XCircle, ChevronDown, ChevronUp, Trash2, ArrowRight } from "lucide-react";
import { useTripPlanner } from "../context/TripPlannerContext";
import { resorts } from "../lib/data";
import { toast } from "sonner";

const TABS = [
  { key: "upcoming", label: "Upcoming", icon: Calendar },
  { key: "past", label: "Past", icon: Clock },
  { key: "cancelled", label: "Cancelled", icon: XCircle },
  { key: "agent", label: "Agent Plans", icon: Bot },
];

function EmptyState({ icon: Icon, text }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <Icon className="h-12 w-12 text-peak-text-secondary/20 mb-4" />
      <p className="text-peak-text-secondary text-sm max-w-xs">{text}</p>
    </div>
  );
}

function AgentPlanCard({ plan, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const { startTrip, addResort } = useTripPlanner();

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
    const dates = option.dates || { start: null, end: null, nights: null };
    const guests = option.guests || { adults: 2, children: 0, seniors: 0 };
    const selectedServices = option.selectedServices?.length > 0 ? option.selectedServices : ["ski-pass"];

    startTrip(destination, dates, guests, selectedServices);
    if (resortObj) setTimeout(() => addResort({ ...resortObj, resortId: resortObj.id }), 80);

    sessionStorage.setItem("peakxp_agent_option", JSON.stringify({
      agentKey: plan.agentKey,
      agentName: plan.agentName,
      optionLabel: option.optionLabel,
      optionSummary: option.optionSummary,
      resortName: option.resortName,
    }));
    navigate("/plan");
  }

  const topOption = plan.options?.[0];
  const createdDate = new Date(plan.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="bg-peak-card border border-white/5 rounded-2xl overflow-hidden mb-4">
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-peak-blue/10 flex items-center justify-center flex-shrink-0">
            <Bot className="h-4 w-4 text-peak-blue" />
          </div>
          <div className="min-w-0">
            <p className="text-peak-text font-semibold text-sm truncate">{plan.agentName}</p>
            <p className="text-peak-text-secondary text-xs">{createdDate} · {plan.options?.length || 0} options saved</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => {
              if (confirm("Delete this saved plan?")) onDelete(plan.id);
            }}
            className="w-8 h-8 rounded-lg bg-peak-surface border border-white/5 flex items-center justify-center text-peak-text-secondary hover:text-peak-red transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="w-8 h-8 rounded-lg bg-peak-surface border border-white/5 flex items-center justify-center text-peak-text-secondary hover:text-peak-text transition-colors"
          >
            {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* Collapsed preview */}
      {!expanded && topOption && (
        <div className="px-5 pb-4 flex items-center justify-between gap-4 border-t border-white/5 pt-3">
          <div>
            <span className="text-xs text-peak-text-secondary">Top option: </span>
            <span className="text-peak-text text-xs font-semibold">{topOption.optionLabel} — {topOption.resortName}</span>
            {topOption.estimatedTotalEUR && (
              <span className="text-peak-text-secondary text-xs ml-2">€{topOption.estimatedTotalEUR.toLocaleString()}</span>
            )}
          </div>
          <button onClick={() => setExpanded(true)} className="text-peak-blue text-xs hover:underline flex-shrink-0">
            View all →
          </button>
        </div>
      )}

      {/* Expanded options */}
      {expanded && (
        <div className="border-t border-white/5 divide-y divide-white/5">
          {(plan.options || []).map((option) => (
            <div key={option.optionIndex} className="px-5 py-4 flex items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-bold text-peak-text">{option.optionLabel}</span>
                  {option.estimatedTotalEUR && (
                    <span className="text-peak-text-secondary text-xs">· €{option.estimatedTotalEUR.toLocaleString()}</span>
                  )}
                </div>
                <p className="text-peak-text font-medium text-sm">{option.resortName}</p>
                <p className="text-peak-text-secondary text-xs mt-0.5 line-clamp-1">{option.optionSummary}</p>
              </div>
              <button
                onClick={() => handleBook(option)}
                className="bg-peak-red hover:bg-peak-red-hover text-white font-semibold px-4 py-2 rounded-xl text-xs transition-colors flex items-center gap-1.5 flex-shrink-0"
              >
                Book <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MyTrips() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [agentPlans, setAgentPlans] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("peakxp_agent_plans") || "[]");
    } catch {
      return [];
    }
  });

  function deletePlan(id) {
    const updated = agentPlans.filter((p) => p.id !== id);
    setAgentPlans(updated);
    localStorage.setItem("peakxp_agent_plans", JSON.stringify(updated));
    toast.success("Plan deleted");
  }

  return (
    <div className="min-h-screen pt-24 pb-16 max-w-4xl mx-auto px-4 sm:px-6">
      <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-peak-text mb-8">My Trips</h1>

      {/* Tabs */}
      <div className="flex gap-1 bg-peak-surface rounded-xl p-1 mb-8 overflow-x-auto hide-scrollbar">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === key
                ? "bg-peak-card text-peak-text shadow-sm"
                : "text-peak-text-secondary hover:text-peak-text"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "upcoming" && (
        <EmptyState icon={Calendar} text="No upcoming trips yet. Start planning your next ski adventure from the home page." />
      )}
      {activeTab === "past" && (
        <EmptyState icon={Clock} text="Your completed trips will appear here." />
      )}
      {activeTab === "cancelled" && (
        <EmptyState icon={XCircle} text="No cancelled trips." />
      )}
      {activeTab === "agent" && (
        agentPlans.length === 0 ? (
          <EmptyState
            icon={Bot}
            text="No saved agent plans yet. Start a conversation with any Expert Agent to get personalised recommendations."
          />
        ) : (
          <div>
            {agentPlans.map((plan) => (
              <AgentPlanCard key={plan.id} plan={plan} onDelete={deletePlan} />
            ))}
          </div>
        )
      )}
    </div>
  );
}