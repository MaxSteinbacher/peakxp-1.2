import { useState } from "react";
import { Star, ChevronDown, ChevronUp } from "lucide-react";

export default function ResultCard({ image, title, rating, reviewCount, meta, badges, price, priceLabel, priceSubline, status, statusColor, onSelect, selected, expandContent, cta = "Select" }) {
  const [expanded, setExpanded] = useState(false);

  const statusColors = {
    Available: "bg-peak-green/10 text-peak-green",
    Limited: "bg-yellow-400/10 text-yellow-400",
    Full: "bg-peak-red/10 text-peak-red",
    "Few seats": "bg-yellow-400/10 text-yellow-400",
    "Sold out": "bg-peak-red/10 text-peak-red",
  };

  return (
    <div className={`bg-peak-card border rounded-xl overflow-hidden transition-all duration-200 ${selected ? "border-peak-blue/50" : "border-white/5 hover:border-white/15"}`}>
      <div className="relative h-44 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        {status && (
          <div className={`absolute top-3 right-3 text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[status] || "bg-white/10 text-peak-text-secondary"}`}>
            {status}
          </div>
        )}
        {badges?.map((b) => (
          <span key={b.label} className={`absolute top-3 left-3 text-xs font-semibold px-2 py-0.5 rounded-full border bg-peak-bg/80 backdrop-blur-sm ${b.style || "border-white/20 text-peak-text-secondary"}`}>
            {b.label}
          </span>
        ))}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-display font-bold text-peak-text text-lg">{title}</h3>
            {rating !== undefined && (
              <div className="flex items-center gap-1 mt-0.5">
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                <span className="text-peak-text text-sm font-medium">{rating}</span>
                {reviewCount && <span className="text-peak-text-secondary text-xs">({reviewCount} reviews)</span>}
              </div>
            )}
          </div>
          {price && (
            <div className="text-right flex-shrink-0 ml-3">
              <p className="text-peak-text font-bold">{price}<span className="text-peak-text-secondary text-xs font-normal"> {priceLabel}</span></p>
              {priceSubline && <p className="text-peak-text-secondary text-xs">{priceSubline}</p>}
            </div>
          )}
        </div>

        {meta && (
          <div className="space-y-1 mb-3">
            {meta.map((m, i) => (
              <p key={i} className="text-xs text-peak-text-secondary">{m}</p>
            ))}
          </div>
        )}

        <button
          onClick={onSelect}
          className={`w-full py-2.5 text-sm font-semibold rounded-xl transition-colors mb-2 ${
            selected ? "bg-peak-blue hover:bg-peak-blue/80 text-white" : "bg-peak-red hover:bg-peak-red-hover text-white"
          }`}
        >
          {selected ? "✓ Selected" : cta}
        </button>

        {expandContent && (
          <>
            <button onClick={() => setExpanded(!expanded)} className="w-full flex items-center justify-center gap-1 text-xs text-peak-text-secondary hover:text-peak-text transition-colors">
              {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              {expanded ? "Hide" : "Show"} details
            </button>
            {expanded && <div className="mt-3 border-t border-white/5 pt-3">{expandContent}</div>}
          </>
        )}
      </div>
    </div>
  );
}