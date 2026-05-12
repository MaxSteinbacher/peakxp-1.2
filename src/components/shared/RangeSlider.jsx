import { useRef, useCallback } from "react";

function pct(value, min, max) {
  return ((value - min) / (max - min)) * 100;
}

function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

function valueFromX(clientX, trackRef, min, max, step) {
  const rect = trackRef.current.getBoundingClientRect();
  const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
  const raw = min + ratio * (max - min);
  return clamp(Math.round(raw / step) * step, min, max);
}

// Single-thumb slider
function SingleSlider({ value, onValueChange, min, max, step, formatLabel }) {
  const trackRef = useRef(null);
  const valPct = pct(value, min, max);

  const startDrag = useCallback((startEvent) => {
    startEvent.preventDefault();
    function move(e) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const v = valueFromX(clientX, trackRef, min, max, step);
      onValueChange(v);
    }
    function up() {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", up);
    }
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", up);
  }, [min, max, step, onValueChange]);

  return (
    <div className="relative w-full pt-1 pb-6">
      <div ref={trackRef} className="relative h-1 rounded-full bg-peak-surface w-full my-3">
        {/* Filled portion */}
        <div className="absolute h-full rounded-full bg-peak-blue left-0" style={{ width: `${valPct}%` }} />
        {/* Thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-peak-blue shadow-md cursor-grab active:cursor-grabbing z-10"
          style={{ left: `${valPct}%` }}
          onMouseDown={startDrag}
          onTouchStart={startDrag}
        />
        {/* Native input for keyboard accessibility */}
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={e => onValueChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer m-0 p-0"
          style={{ zIndex: 5 }}
        />
      </div>
      {formatLabel && (
        <div className="flex justify-between text-peak-text-secondary text-xs mt-1">
          <span>{formatLabel(min)}</span>
          <span>{formatLabel(max)}</span>
        </div>
      )}
    </div>
  );
}

// Dual-thumb slider
function DualSlider({ value, onValueChange, min, max, step, formatLabel }) {
  const trackRef = useRef(null);
  const [low, high] = value;
  const lowPct = pct(low, min, max);
  const highPct = pct(high, min, max);

  function makeDragHandler(thumb) {
    return function startDrag(startEvent) {
      startEvent.preventDefault();
      function move(e) {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const v = valueFromX(clientX, trackRef, min, max, step);
        if (thumb === "low") {
          onValueChange([clamp(v, min, high - step), high]);
        } else {
          onValueChange([low, clamp(v, low + step, max)]);
        }
      }
      function up() {
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseup", up);
        window.removeEventListener("touchmove", move);
        window.removeEventListener("touchend", up);
      }
      window.addEventListener("mousemove", move);
      window.addEventListener("mouseup", up);
      window.addEventListener("touchmove", move, { passive: false });
      window.addEventListener("touchend", up);
    };
  }

  return (
    <div className="relative w-full pt-1 pb-6">
      <div ref={trackRef} className="relative h-1 rounded-full bg-peak-surface w-full my-3">
        {/* Filled portion between thumbs */}
        <div
          className="absolute h-full rounded-full bg-peak-blue"
          style={{ left: `${lowPct}%`, width: `${highPct - lowPct}%` }}
        />
        {/* Low thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-peak-blue shadow-md cursor-grab active:cursor-grabbing z-10"
          style={{ left: `${lowPct}%` }}
          onMouseDown={makeDragHandler("low")}
          onTouchStart={makeDragHandler("low")}
        />
        {/* High thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-peak-blue shadow-md cursor-grab active:cursor-grabbing z-10"
          style={{ left: `${highPct}%` }}
          onMouseDown={makeDragHandler("high")}
          onTouchStart={makeDragHandler("high")}
        />
        {/* Native inputs for keyboard accessibility */}
        <input
          type="range" min={min} max={max} step={step} value={low}
          onChange={e => onValueChange([clamp(Number(e.target.value), min, high - step), high])}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer m-0 p-0"
          style={{ zIndex: low >= high - step ? 6 : 4 }}
        />
        <input
          type="range" min={min} max={max} step={step} value={high}
          onChange={e => onValueChange([low, clamp(Number(e.target.value), low + step, max)])}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer m-0 p-0"
          style={{ zIndex: high <= low + step ? 6 : 5 }}
        />
      </div>
      {formatLabel && (
        <div className="flex justify-between text-peak-text-secondary text-xs mt-1">
          <span>{formatLabel(min)}</span>
          <span>{formatLabel(max)}</span>
        </div>
      )}
    </div>
  );
}

export default function RangeSlider({ value, onValueChange, min, max, step = 1, formatLabel, mode, className = "" }) {
  const isDual = mode === "dual" || (mode == null && Array.isArray(value) && value.length >= 2);

  const handleSingle = useCallback((v) => {
    if (Array.isArray(value)) onValueChange([v]);
    else onValueChange(v);
  }, [value, onValueChange]);

  if (isDual) {
    const arr = Array.isArray(value) ? value : [min, max];
    return (
      <div className={className}>
        <DualSlider value={arr} onValueChange={onValueChange} min={min} max={max} step={step} formatLabel={formatLabel} />
      </div>
    );
  }

  const singleVal = Array.isArray(value) ? value[0] : value;
  return (
    <div className={className}>
      <SingleSlider value={singleVal} onValueChange={handleSingle} min={min} max={max} step={step} formatLabel={formatLabel} />
    </div>
  );
}