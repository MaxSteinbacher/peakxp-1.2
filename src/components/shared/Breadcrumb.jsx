import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

/**
 * Automatic breadcrumb — parses current URL path
 * Shows: Home > Section > Page
 * Hidden on homepage (/)
 */
const LABELS = {
  discovery:    "Discovery",
  resort:       "Resort",
  "trip-planning": "Trip Planning",
  accommodation:"Accommodation",
  "ski-school": "Ski School",
  equipment:    "Equipment Rental",
  flights:      "Flights",
  dining:       "Dining",
  storage:      "Storage",
  "car-rental": "Car Rental",
  train:        "Train",
  "expert-agents":"Expert Agents",
  community:    "Community",
  profile:      "Profile",
  settings:     "Settings",
  map:          "Route Planner",
  "activity-map":"Activity Map",
};

export default function Breadcrumb({ customCrumbs }) {
  const location = useLocation();
  if (location.pathname === "/") return null;

  const segments = location.pathname.split("/").filter(Boolean);

  const crumbs = customCrumbs || segments.map((seg, idx) => ({
    label: LABELS[seg] || seg.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" "),
    to: "/" + segments.slice(0, idx + 1).join("/"),
  }));

  return (
    <nav aria-label="Breadcrumb" style={{
      display: "flex",
      alignItems: "center",
      gap: 4,
      fontSize: 12,
      color: "rgba(255,255,255,0.4)",
      padding: "8px 0",
      flexWrap: "wrap",
    }}>
      <Link to="/" style={{ display:"flex", alignItems:"center", color:"rgba(255,255,255,0.4)", transition:"color 0.15s" }}
        onMouseEnter={e=>e.currentTarget.style.color="rgba(255,255,255,0.8)"}
        onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.4)"}>
        <Home style={{ width:12, height:12 }}/>
      </Link>
      {crumbs.map((crumb, i) => (
        <span key={i} style={{ display:"flex", alignItems:"center", gap:4 }}>
          <ChevronRight style={{ width:10, height:10, opacity:0.4 }}/>
          {i === crumbs.length - 1 ? (
            <span style={{ color:"rgba(255,255,255,0.7)", fontWeight:500 }}>{crumb.label}</span>
          ) : (
            <Link to={crumb.to} style={{ color:"rgba(255,255,255,0.4)", transition:"color 0.15s" }}
              onMouseEnter={e=>e.currentTarget.style.color="rgba(255,255,255,0.8)"}
              onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.4)"}>
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
