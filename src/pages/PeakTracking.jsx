import { Link, Outlet, useLocation } from "react-router-dom";
import { Radio, BarChart3, Eye, Upload } from "lucide-react";
import AuthGate from "../components/AuthGate";
import { useAppAuth } from "../context/AppAuthContext";

const TABS = [
  { label: "Record", icon: Radio, path: "/tracking" },
  { label: "Peak Log", icon: BarChart3, path: "/tracking/log" },
  { label: "Peak Vision AI", icon: Eye, path: "/tracking/vision" },
  { label: "Import", icon: Upload, path: "/tracking/import" },
];

export default function PeakTracking() {
  const { isLoggedIn } = useAppAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <AuthGate message="Sign in to track your skiing activity and performance." />;
  }

  function isActive(tab) {
    if (tab.path === "/tracking") return location.pathname === "/tracking";
    return location.pathname.startsWith(tab.path);
  }

  return (
    <div className="min-h-screen bg-peak-bg">
      {/* Sub-nav */}
      <div className="sticky top-16 z-40 bg-peak-surface border-b border-white/5 px-6 flex gap-1 overflow-x-auto hide-scrollbar">
        {TABS.map(tab => {
          const Icon = tab.icon;
          const active = isActive(tab);
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                active
                  ? "text-peak-red border-peak-red bg-peak-red/5"
                  : "text-peak-text-secondary hover:text-peak-text border-transparent"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </Link>
          );
        })}
      </div>

      {/* Content */}
      <Outlet />
    </div>
  );
}