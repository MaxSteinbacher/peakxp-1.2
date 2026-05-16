import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useT } from "../lib/i18n";
import { Radio, BarChart3, Eye, Upload, Route } from "lucide-react";
import BackButton from "../components/shared/BackButton";
import AuthGate from "../components/AuthGate";
import { useAppAuth } from "../context/AppAuthContext";

const TRACKING_TABS = [
  { i18nKey: "record", icon: Radio, path: "/tracking" },
  { i18nKey: "peak_log", icon: BarChart3, path: "/tracking/log" },
  { i18nKey: "peak_vision", icon: Eye, path: "/tracking/vision" },
  { i18nKey: "import", icon: Upload, path: "/tracking/import" },
  { i18nKey: "nav_route_planner", icon: Route, path: "/tracking/routes" },
];

export default function PeakTracking() {
  const t = useT();
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
        {TRACKING_TABS.map(tab => {
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
              {t(tab.i18nKey)}
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