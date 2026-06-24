import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import ScrollToTopButton from "./shared/ScrollToTop";
import UnifiedNav from "./shared/UnifiedNav";
import RouteScrollReset from "./shared/RouteScrollReset";

// Pages where the UnifiedNav breadcrumb should NOT show
// (either they have their own nav or it's redundant)
const NO_BREADCRUMB = ["/", "/plan", "/plan/summary", "/plan/confirmed", "/auth", "/profile/setup"];

export default function Layout() {
  const location = useLocation();
  const showBreadcrumb = !NO_BREADCRUMB.some(p =>
    p === "/" ? location.pathname === "/" : location.pathname.startsWith(p)
  );

  // ResortDetail renders its own UnifiedNav inline — avoid double breadcrumb
  const isResortDetail = /^\/resort\/[^/]+$/.test(location.pathname);

  return (
    <>
      {/* Resets scroll position on every route change */}
      <RouteScrollReset />

      {/* Premium custom scrollbar */}
      <style>{`
        :root { scrollbar-width: thin; scrollbar-color: rgba(100,160,220,0.25) #0D1226; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0D1226; }
        ::-webkit-scrollbar-button { background: #0D1226; height: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(100,160,220,0.22); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(100,180,255,0.65); }
        ::-webkit-scrollbar-track:hover { background: #111827; }
        html { scroll-behavior: smooth; }
      `}</style>

      <div className="min-h-screen bg-peak-bg">
        <Navbar />
        <main className="pt-16">
          {showBreadcrumb && !isResortDetail && (
            <div className="max-w-7xl mx-auto px-4">
              <UnifiedNav />
            </div>
          )}
          <Outlet />
        </main>
        <ScrollToTopButton />
      </div>
    </>
  );
}
