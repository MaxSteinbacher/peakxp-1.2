import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb({ items = [] }) {
  if (!items.length) return null;

  return (
    <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1 text-sm">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <div key={idx} className="flex items-center gap-1">
            {item.to && !isLast ? (
              <Link
                to={item.to}
                className="text-peak-text-secondary hover:text-peak-blue transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-peak-text font-medium" : "text-peak-text-secondary"}>
                {item.label}
              </span>
            )}
            {!isLast && <ChevronRight className="h-3.5 w-3.5 text-peak-text-secondary flex-shrink-0" />}
          </div>
        );
      })}
    </nav>
  );
}