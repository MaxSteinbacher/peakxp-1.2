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
        /* Firefox */
        :root { scrollbar-width: thin; scrollbar-color: rgba(100,160,220,0.25) #0D1226; }
        /* Chrome / Safari / Edge */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track {
          background: #0D1226;
          border-left: none;
        }
        ::-webkit-scrollbar-button {
          background: #0D1226;
          height: 4px;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(100,160,220,0.22);
          border-radius: 3px;
          transition: background 0.25s ease;
        }
        ::-webkit-scrollbar-thumb:hover { background: rgba(100,180,255,0.65); }
        ::-webkit-scrollbar-track:hover { background: #111827; }
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
