import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import ScrollToTopButton from "./shared/ScrollToTop";
import Breadcrumb from "./shared/Breadcrumb";

// Pages where breadcrumb should NOT show (too cluttered or redundant)
const NO_BREADCRUMB = ["/", "/discovery", "/expert-agents", "/community", "/profile"];

export default function Layout() {
  const location = useLocation();
  const showBreadcrumb = !NO_BREADCRUMB.includes(location.pathname);

  return (
    <>
      {/* Premium custom scrollbar — invisible until hover near right edge */}
      <style>{`
        :root { scrollbar-width: thin; scrollbar-color: rgba(56,148,227,0.18) transparent; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb {
          background: rgba(56,148,227,0.18);
          border-radius: 3px;
          transition: background 0.3s ease;
        }
        ::-webkit-scrollbar-thumb:hover { background: rgba(56,148,227,0.45); }
        html { scroll-behavior: smooth; }
      `}</style>

      <div className="min-h-screen bg-peak-bg">
        <Navbar />
        <main className="pt-16">
          {showBreadcrumb && (
            <div className="max-w-7xl mx-auto px-4">
              <Breadcrumb />
            </div>
          )}
          <Outlet />
        </main>
        <ScrollToTopButton />
      </div>
    </>
  );
}
