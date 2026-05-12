import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Radio, BarChart3, Eye, Upload, Route } from "lucide-react";
import BackButton from "../components/shared/BackButton";
import AuthGate from "../components/AuthGate";
import { useAppAuth } from "../context/AppAuthContext";

const TABS = [
  { label: "Record", icon: Radio, path: "/tracking" },
  { label: "Peak Log", icon: BarChart3, path: "/tracking/log" },
  { label: "Peak Vision AI", icon: Eye, path: "/tracking/vision" },
  { label: "Import", icon: Upload, path: "/tracking/import" },
  { label: "Route Planner", icon: Route, path: "/tracking/routes" },
];

export default function PeakTracking() {
  const { isLoggedIn } = useAppAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-peak-bg flex items-center justify-center px-4 pt-16">
        <AuthGate message="Sign in to track your skiing activity and performance." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-peak-bg pt-16 flex flex-col">
      <div className="px-6 pt-4">
        <BackButton to="/" className="mb-1" />
      </div>
      {/* Sub-nav */}
      <div className="sticky top-16 z-40 bg-peak-surface border-b border-white/5 px-6 flex gap-1 overflow-x-auto hide-scrollbar">
        {TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = tab.path === "/tracking"
            ? location.pathname === "/tracking"
            : location.pathname.startsWith(tab.path);
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                isActive
                  ? "border-peak-red text-peak-red bg-peak-red/10"
                  : "border-transparent text-peak-text-secondary hover:text-peak-text"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}