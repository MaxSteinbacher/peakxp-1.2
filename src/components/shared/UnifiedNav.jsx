import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronRight, Home, ChevronLeft, Check } from "lucide-react";

/**
 * UnifiedNav — replaces both Breadcrumb.jsx and BackButton.jsx.
 *
 * Renders a single row:
 *   [← Back]  🏠 › Resort › Verbier
 *
 * Optionally, if `steps` prop is passed (array of step labels), appends a
 * pill-style step tracker (premium thin pills, no numbers):
 *   🏠 › Plan   ●━━━○━━━○━━━○   Step 2 of 4 — Specifications
 *
 * Props:
 *   steps?        string[]   — step labels for the pill tracker
 *   currentStep?  number     — 0-based active step index
 *   completedSteps? number[] — 0-based list of completed step indices
 *   onStepClick?  (i) => void — called when a completed step pill is clicked
 *   customCrumbs? {label, to}[] — override auto-detected breadcrumbs
 *   showBack?     boolean    — default true
 */

const LABELS = {
  resort:          "Resort",
  "trip-planning": "Trip Planning",
  plan:            "Plan",
  accommodation:   "Accommodation",
  "ski-school":    "Ski School",
  equipment:       "Equipment Rental",
  flights:         "Flights",
  dining:          "Dining",
  storage:         "Storage",
  "car-rental":    "Car Rental",
  train:           "Train",
  "expert-agents": "Expert Agents",
  community:       "Community",
  profile:         "Profile",
  settings:        "Settings",
  map:             "Route Planner",
  "activity-map":  "Activity Map",
  search:          "Search",
  book:            "Booking",
  agents:          "Expert Agents",
  tracking:        "PeakTracking",
  hotel:           "Hotel",
};

function autoLabel(seg) {
  return LABELS[seg] || seg.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" ");
}

export default function UnifiedNav({
  steps,
  currentStep = 0,
  completedSteps = [],
  onStepClick,
  customCrumbs,
  showBack = true,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === "/") return null;

  const segments = location.pathname.split("/").filter(Boolean);
  const crumbs = customCrumbs || segments.map((seg, idx) => ({
    label: autoLabel(seg),
    to: "/" + segments.slice(0, idx + 1).join("/"),
  }));

  const hasPills = steps && steps.length > 0;

  return (
    <div className="flex flex-col gap-2 py-2 mb-1">
      {/* Row 1: Back + Breadcrumb */}
      <div className="flex items-center gap-3 flex-wrap">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-peak-text-secondary hover:text-peak-text transition-colors text-xs font-medium flex-shrink-0 group"
          >
            <ChevronLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Back
          </button>
        )}

        {showBack && <span className="text-white/10 text-xs">|</span>}

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 flex-wrap" aria-label="Breadcrumb">
          <Link
            to="/"
            className="text-peak-text-secondary hover:text-peak-text transition-colors"
          >
            <Home className="h-3 w-3" />
          </Link>
          {crumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1">
              <ChevronRight className="h-2.5 w-2.5 text-white/20" />
              {i === crumbs.length - 1 ? (
                <span className="text-xs text-peak-text/70 font-medium">{crumb.label}</span>
              ) : (
                <Link
                  to={crumb.to}
                  className="text-xs text-peak-text-secondary hover:text-peak-text transition-colors"
                >
                  {crumb.label}
                </Link>
              )}
            </span>
          ))}
        </nav>
      </div>

      {/* Row 2: Pill step tracker (only when steps are provided) */}
      {hasPills && (
        <div className="flex items-center gap-2 flex-wrap">
          {steps.map((label, i) => {
            const isDone = completedSteps.includes(i);
            const isActive = i === currentStep;
            const isClickable = isDone && onStepClick;

            return (
              <div key={i} className="flex items-center gap-2">
                <button
                  onClick={isClickable ? () => onStepClick(i) : undefined}
                  disabled={!isClickable}
                  title={label}
                  className={[
                    "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all",
                    isActive
                      ? "bg-peak-red/15 border-peak-red/50 text-peak-red"
                      : isDone
                      ? "bg-peak-green/10 border-peak-green/30 text-peak-green cursor-pointer hover:bg-peak-green/20"
                      : "border-white/10 text-peak-text-secondary cursor-default",
                  ].join(" ")}
                >
                  {isDone && <Check className="h-3 w-3 flex-shrink-0" />}
                  {!isDone && (
                    <span
                      className={[
                        "w-1.5 h-1.5 rounded-full flex-shrink-0",
                        isActive ? "bg-peak-red" : "bg-white/20",
                      ].join(" ")}
                    />
                  )}
                  {label}
                </button>

                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div
                    className={[
                      "h-px w-4 flex-shrink-0",
                      isDone ? "bg-peak-green/30" : "bg-white/8",
                    ].join(" ")}
                  />
                )}
              </div>
            );
          })}

          <span className="text-peak-text-secondary text-xs ml-1">
            {currentStep + 1} / {steps.length} — {steps[currentStep]}
          </span>
        </div>
      )}
    </div>
  );
}
