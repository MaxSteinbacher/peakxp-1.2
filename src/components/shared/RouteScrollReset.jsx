import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * RouteScrollReset — scrolls the window to the top on every route change.
 * Rendered once at the Layout level.
 */
export default function RouteScrollReset() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}