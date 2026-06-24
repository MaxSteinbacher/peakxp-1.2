import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to the top of the page on every route change (instant, no jank).
 * Place this inside <Router> in App.jsx — it renders nothing.
 *
 * For in-page tab switches (e.g. ResortDetail), tabs scroll to the tab bar
 * position rather than the very top, so the header stays visible.
 */
export default function RouteScrollReset() {
  const { pathname } = useLocation();
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (prevPath.current !== pathname) {
      window.scrollTo({ top: 0, behavior: "instant" });
      prevPath.current = pathname;
    }
  }, [pathname]);

  return null;
}
