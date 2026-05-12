function pct(value, min, max) {
  return Math.round(((value - min) / (max - min)) * 100);
}

export default function RangeSlider({ value, onValueChange, min, max, step = 1, formatLabel, className = "" }) {
  const isDual = Array.isArray(value) && value.length >= 2;

  if (isDual) {
    const [low, high] = value;
    const lowPct = pct(low, min, max);
    const highPct = pct(high, min, max);

    return (
      <div className={`relative py-3 ${className}`}>
        <div className="relative h-1.5 rounded-full bg-white/10">
          <div className="absolute h-full bg-peak-blue rounded-full" style={{ left: `${lowPct}%`, width: `${highPct - lowPct}%` }} />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-peak-surface border-2 border-white/30 pointer-events-none" style={{ zIndex: 1 }} />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2.5 h-2.5 rounded-full bg-peak-surface border-2 border-white/30 pointer-events-none" style={{ zIndex: 1 }} />
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white shadow-lg border-2 border-peak-blue pointer-events-none" style={{ left: `${lowPct}%`, zIndex: 3 }} />
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white shadow-lg border-2 border-peak-blue pointer-events-none" style={{ left: `${highPct}%`, zIndex: 3 }} />
          <input type="range" min={min} max={max} step={step} value={low}
            onChange={e => onValueChange([Math.min(Number(e.target.value), high - step), high])}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            style={{ zIndex: low >= high - step ? 4 : 2 }} />
          <input type="range" min={min} max={max} step={step} value={high}
            onChange={e => onValueChange([low, Math.max(Number(e.target.value), low + step)])}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            style={{ zIndex: high <= low + step ? 4 : 2 }} />
        </div>
        {formatLabel && (
          <div className="flex justify-between mt-2 text-xs">
            <span className="text-peak-text font-medium">{formatLabel(low)}</span>
            <span className="text-peak-text font-medium">{formatLabel(high)}</span>
          </div>
        )}
      </div>
    );
  }

  const [val] = Array.isArray(value) ? value : [value];
  const valPct = pct(val, min, max);

  return (
    <div className={`relative py-3 ${className}`}>
      <div className="relative h-1.5 rounded-full bg-white/10">
        <div className="absolute left-0 h-full bg-peak-blue rounded-full" style={{ width: `${valPct}%` }} />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-peak-surface border-2 border-white/30 pointer-events-none" style={{ zIndex: 1 }} />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2.5 h-2.5 rounded-full bg-peak-surface border-2 border-white/30 pointer-events-none" style={{ zIndex: 1 }} />
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white shadow-lg border-2 border-peak-blue pointer-events-none" style={{ left: `${valPct}%`, zIndex: 3 }} />
        <input type="range" min={min} max={max} step={step} value={val}
          onChange={e => onValueChange([Number(e.target.value)])}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" style={{ zIndex: 2 }} />
      </div>
    </div>
  );
}