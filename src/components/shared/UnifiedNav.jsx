import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronRight, Home, ArrowLeft } from "lucide-react";

/**
 * UnifiedNav — automatic breadcrumb (parses current URL path) with an
 * optional back button. Hidden on the homepage.
 *
 * Props:
 *   customCrumbs  Array<{ label, to }>  — override the auto-generated crumbs
 *   showBack      boolean               — render a back button before the crumbs
 */
const LABELS = {
  discovery:       "Discovery",
  resort:          "Resort",
  "trip-planning": "Trip Planning",
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
  tracking:        "PeakTracking",
  book:            "Booking",
  search:          "Search",
  "my-trips":      "My Trips",
  plan:            "Trip Planner",
  agents:          "Expert Agents",
};

function titleCase(seg) {
  return seg.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" ");
}

export default function UnifiedNav({ customCrumbs, showBack = false }) {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === "/") return null;

  const segments = location.pathname.split("/").filter(Boolean);

  const crumbs = customCrumbs || segments.map((seg, idx) => ({
    label: LABELS[seg] || titleCase(seg),
    to: "/" + segments.slice(0, idx + 1).join("/"),
  }));

  return (
    <nav aria-label="Breadcrumb" style={{
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontSize: 12,
      color: "rgba(255,255,255,0.4)",
      padding: "8px 0",
      flexWrap: "wrap",
    }}>
      {showBack && (
        <button
          onClick={() => navigate(-1)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            color: "rgba(255,255,255,0.5)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: 12,
            padding: "2px 8px 2px 0",
            transition: "color 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
        >
          <ArrowLeft style={{ width: 14, height: 14 }} />
          Back
        </button>
      )}

      <Link to="/" style={{ display: "flex", alignItems: "center", color: "rgba(255,255,255,0.4)", transition: "color 0.15s" }}
        onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
        onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>
        <Home style={{ width: 12, height: 12 }} />
      </Link>

      {crumbs.map((crumb, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <ChevronRight style={{ width: 10, height: 10, opacity: 0.4 }} />
          {i === crumbs.length - 1 ? (
            <span style={{ color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>{crumb.label}</span>
          ) : (
            <Link to={crumb.to} style={{ color: "rgba(255,255,255,0.4)", transition: "color 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}