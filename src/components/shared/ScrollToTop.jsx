import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

/**
 * Scroll-to-top button — appears after scrolling 400px
 * Invisible by default, appears on hover near right edge (premium feel)
 */
export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    function onScroll() { setVisible(window.scrollY > 400); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title="Back to top"
      style={{
        position: "fixed",
        bottom: 28,
        right: 20,
        zIndex: 100,
        width: 40,
        height: 40,
        borderRadius: "50%",
        background: "rgba(7,11,30,0.85)",
        border: "1px solid rgba(255,255,255,0.12)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        opacity: hovered ? 1 : 0.55,
        transform: hovered ? "scale(1.1)" : "scale(1)",
        transition: "opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
        boxShadow: hovered ? "0 0 0 1px rgba(56,148,227,0.4), 0 4px 16px rgba(0,0,0,0.4)" : "0 2px 8px rgba(0,0,0,0.3)",
      }}
    >
      <ChevronUp style={{ width: 18, height: 18, color: "#fff" }} />
    </button>
  );
}
