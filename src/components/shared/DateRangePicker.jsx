// AVAILABILITY DATA — connect to live API
// unavailableDates and unavailableRanges props should be fetched
// from the booking/reservation system per property ID and room type.
// Expected endpoint: GET /api/availability?propertyId=X&roomType=Y&month=YYYY-MM
// Returns: { unavailableDates: string[], unavailableRanges: { start, end }[] }
// Until live data is available, pass empty arrays (all dates available).

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X, Calendar as CalendarIcon } from "lucide-react";

// ─── Utilities ────────────────────────────────────────────────────────────────

export function toUTC(year, month, day) {
  return new Date(Date.UTC(year, month, day));
}

export function fmtDate(d) {
  if (!d) return null;
  const date = typeof d === "string" ? new Date(d + "T00:00:00Z") : d;
  if (isNaN(date)) return null;
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const day = date.getUTCDate().toString().padStart(2, "0");
  return `${day} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

function toISO(date) {
  if (!date) return null;
  const d = typeof date === "string" ? new Date(date + "T00:00:00Z") : date;
  if (isNaN(d)) return null;
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth()+1).padStart(2,"0")}-${String(d.getUTCDate()).padStart(2,"0")}`;
}

function parseDate(d) {
  if (!d) return null;
  if (d instanceof Date) return d;
  const parsed = new Date(d + "T00:00:00Z");
  return isNaN(parsed) ? null : parsed;
}

function diffDays(a, b) {
  if (!a || !b) return 0;
  return Math.round((b - a) / 86400000);
}

function isDateUnavailable(date, unavailableDates, unavailableRanges) {
  const iso = toISO(date);
  if (!iso) return false;
  if (unavailableDates.includes(iso)) return true;
  for (const r of unavailableRanges) {
    if (iso >= r.start && iso <= r.end) return true;
  }
  return false;
}

function wouldCrossUnavailable(start, end, unavailableDates, unavailableRanges) {
  if (!start || !end) return false;
  const s = parseDate(start);
  const e = parseDate(end);
  let cur = new Date(s);
  while (cur <= e) {
    if (isDateUnavailable(cur, unavailableDates, unavailableRanges)) return true;
    cur.setUTCDate(cur.getUTCDate() + 1);
  }
  return false;
}

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const MONTH_ABBR = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS = ["Mo","Tu","We","Th","Fr","Sa","Su"];

// ─── Inner Calendar Grid ───────────────────────────────────────────────────────

function CalendarGrid({ startDate, endDate, onStartChange, onEndChange, mode, minStay, maxStay,
  unavailableDates, unavailableRanges, context, onClose }) {

  const today = toUTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate());
  const [viewYear, setViewYear] = useState(() => {
    const s = parseDate(startDate);
    return s ? s.getUTCFullYear() : today.getUTCFullYear();
  });
  const [viewMonth, setViewMonth] = useState(() => {
    const s = parseDate(startDate);
    return s ? s.getUTCMonth() : today.getUTCMonth();
  });
  const [hoveredDate, setHoveredDate] = useState(null);
  const [selectingEnd, setSelectingEnd] = useState(!!startDate && !endDate);
  const [pickerMode, setPickerMode] = useState("days");
  const [tooltip, setTooltip] = useState(null);

  const sameDay = context !== "hotel";
  const effectiveMinStay = minStay ?? 1;

  const start = parseDate(startDate);
  const end = parseDate(endDate);

  const prevMonth = () => {
    const d = new Date(Date.UTC(viewYear, viewMonth - 1, 1));
    if (d < toUTC(today.getUTCFullYear(), today.getUTCMonth(), 1)) return;
    setViewYear(d.getUTCFullYear());
    setViewMonth(d.getUTCMonth());
  };

  const nextMonth = () => {
    const d = new Date(Date.UTC(viewYear, viewMonth + 1, 1));
    setViewYear(d.getUTCFullYear());
    setViewMonth(d.getUTCMonth());
  };

  const isPrevDisabled = toUTC(viewYear, viewMonth - 1, 1) < toUTC(today.getUTCFullYear(), today.getUTCMonth(), 1);

  const firstDay = toUTC(viewYear, viewMonth, 1);
  const firstDow = (firstDay.getUTCDay() + 6) % 7;
  const daysInMonth = new Date(Date.UTC(viewYear, viewMonth + 1, 0)).getUTCDate();

  const cells = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(toUTC(viewYear, viewMonth, d));

  function getDayState(date) {
    if (!date) return "empty";
    const iso = toISO(date);
    const isPast = date < today;
    const isUnavail = isDateUnavailable(date, unavailableDates, unavailableRanges);
    const isToday = iso === toISO(today);
    const isStart = start && iso === toISO(start);
    const isEnd = end && iso === toISO(end);

    let inRange = false;
    let inPreview = false;
    if (start && end && date > start && date < end) inRange = true;
    if (selectingEnd && start && hoveredDate && !end) {
      const hov = parseDate(hoveredDate);
      if (hov) {
        const lo = hov < start ? hov : start;
        const hi = hov < start ? start : hov;
        if (date > lo && date < hi) inPreview = true;
      }
    }

    let endDisabled = false;
    if (selectingEnd && start) {
      const daysDiff = diffDays(start, date);
      if (context === "hotel" && daysDiff < effectiveMinStay) endDisabled = true;
      if (!sameDay && daysDiff < effectiveMinStay) endDisabled = true;
      if (daysDiff > maxStay) endDisabled = true;
      if (wouldCrossUnavailable(start, date, unavailableDates, unavailableRanges) && !isStart) endDisabled = true;
    }

    return { isPast, isUnavail, isToday, isStart, isEnd, inRange, inPreview, endDisabled, iso };
  }

  function handleDayClick(date) {
    if (!date) return;
    const { isPast, isUnavail, endDisabled, iso } = getDayState(date);
    if (isPast || isUnavail) return;

    if (mode === "single") {
      onStartChange(iso);
      onEndChange && onEndChange(iso);
      setTimeout(onClose, 150);
      return;
    }

    if (!selectingEnd || !start) {
      onStartChange(iso);
      onEndChange && onEndChange(null);
      setSelectingEnd(true);
      return;
    }

    if (endDisabled) {
      if (context === "hotel" && diffDays(start, date) < effectiveMinStay) {
        setTooltip({ iso, msg: `Minimum ${effectiveMinStay} night stay` });
        setTimeout(() => setTooltip(null), 2000);
      }
      return;
    }

    if (date < start) {
      onStartChange(iso);
      onEndChange && onEndChange(null);
      setSelectingEnd(true);
      return;
    }

    onEndChange && onEndChange(iso);
    setSelectingEnd(false);
    setTimeout(onClose, 150);
  }

  function handleClear() {
    onStartChange(null);
    onEndChange && onEndChange(null);
    setSelectingEnd(false);
    setHoveredDate(null);
  }

  function handleConfirm() {
    if (mode === "single" && start) { onClose(); return; }
    if (start && end) onClose();
  }

  let summary = "Select dates";
  if (start && end) {
    const nights = diffDays(start, end);
    const unit = context === "hotel" ? (nights === 1 ? "night" : "nights") : (nights === 1 ? "day" : "days");
    summary = <><span className="text-peak-text font-semibold">{nights} {unit}</span><span className="text-peak-text-secondary"> · {fmtDate(start)} → {fmtDate(end)}</span></>;
  } else if (start) {
    summary = `From ${fmtDate(start)}`;
  }

  const confirmDisabled = mode === "single" ? !start : (!start || !end);

  return (
    <div role="dialog" aria-label="Date picker" className="w-80">
      {pickerMode === "days" && (
        <>
          <div className="flex items-center justify-between mb-1">
            <button onClick={prevMonth} disabled={isPrevDisabled}
              className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${isPrevDisabled ? "text-peak-text-secondary/30 cursor-not-allowed" : "text-peak-text hover:bg-white/10"}`}>
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-1">
              <button onClick={() => setPickerMode("months")}
                className="font-display font-bold text-peak-text text-base hover:text-peak-blue transition-colors px-1">
                {MONTHS[viewMonth]}
              </button>
              <button onClick={() => setPickerMode("years")}
                className="font-display font-bold text-peak-text text-base hover:text-peak-blue transition-colors px-1">
                {viewYear}
              </button>
            </div>
            <button onClick={nextMonth}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-peak-text hover:bg-white/10 transition-colors">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          {selectingEnd && start && !end && (
            <p className="text-peak-text-secondary text-xs text-center mb-3">
              {context === "hotel" ? "Now select your check-out date" : "Now select your end date"}
            </p>
          )}
          <div className="grid grid-cols-7 mb-1">
            {DAYS.map(d => (
              <div key={d} className="text-peak-text-secondary text-xs font-medium text-center py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {cells.map((date, i) => {
              if (!date) return <div key={`e${i}`} />;
              const state = getDayState(date);
              const isHoveredPreviewStart = selectingEnd && start && hoveredDate && parseDate(hoveredDate) < start && toISO(parseDate(hoveredDate)) === state.iso;
              const isHoveredPreviewEnd = selectingEnd && start && hoveredDate && parseDate(hoveredDate) >= start && toISO(parseDate(hoveredDate)) === state.iso;

              let cellBg = "";
              let textClass = "text-peak-text hover:bg-white/10";
              let rounded = "rounded-full";
              let cursor = "cursor-pointer";
              let ariaDisabled = false;

              if (state.isPast || state.isUnavail || (selectingEnd && state.endDisabled)) {
                textClass = state.isUnavail ? "text-peak-text-secondary/30 line-through" : "text-peak-text-secondary/30";
                cursor = "cursor-not-allowed";
                ariaDisabled = true;
                if (state.isUnavail) cellBg = "bg-peak-red/10";
              } else if (state.isStart) {
                textClass = "text-white font-bold";
                cellBg = "bg-peak-red";
                rounded = end ? "rounded-l-full rounded-r-none" : "rounded-full";
              } else if (state.isEnd) {
                textClass = "text-white font-bold";
                cellBg = "bg-peak-red";
                rounded = "rounded-r-full rounded-l-none";
              } else if (state.inRange) {
                textClass = "text-peak-text";
                cellBg = "bg-peak-red/15";
                rounded = "rounded-none";
              } else if (state.inPreview || isHoveredPreviewEnd || isHoveredPreviewStart) {
                textClass = "text-peak-text";
                cellBg = "bg-peak-red/10";
                rounded = "rounded-none";
              }

              const tipActive = tooltip?.iso === state.iso;

              return (
                <div key={state.iso} className={`relative w-full h-9 flex items-center justify-center transition-colors duration-75 ${cellBg} ${rounded}`}>
                  <button
                    aria-label={date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}
                    aria-selected={state.isStart || state.isEnd}
                    aria-disabled={ariaDisabled}
                    disabled={ariaDisabled}
                    onClick={() => handleDayClick(date)}
                    onMouseEnter={() => !ariaDisabled && setHoveredDate(state.iso)}
                    onMouseLeave={() => setHoveredDate(null)}
                    className={`w-9 h-9 flex items-center justify-center text-sm rounded-full transition-colors ${textClass} ${cursor} ${(state.isStart || state.isEnd) ? "bg-peak-red" : ""}`}>
                    {date.getUTCDate()}
                    {state.isToday && <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-peak-blue" />}
                  </button>
                  {tipActive && (
                    <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-peak-surface border border-white/10 text-peak-text text-xs px-2 py-1 rounded-lg whitespace-nowrap z-10 pointer-events-none">
                      {tooltip.msg}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      {pickerMode === "months" && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <button onClick={() => setPickerMode("days")} className="text-peak-text-secondary hover:text-peak-text">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="font-display font-bold text-peak-text">{viewYear}</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {MONTH_ABBR.map((m, i) => (
              <button key={m} onClick={() => { setViewMonth(i); setPickerMode("days"); }}
                className={`py-2 rounded-lg text-sm font-medium transition-colors ${viewMonth === i ? "bg-peak-red text-white" : "text-peak-text hover:bg-white/10"}`}>
                {m}
              </button>
            ))}
          </div>
        </div>
      )}

      {pickerMode === "years" && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <button onClick={() => setPickerMode("days")} className="text-peak-text-secondary hover:text-peak-text">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="font-display font-bold text-peak-text">Select year</span>
          </div>
          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
            {Array.from({ length: 5 }, (_, i) => today.getUTCFullYear() + i).map(yr => (
              <button key={yr} onClick={() => { setViewYear(yr); setPickerMode("days"); }}
                className={`py-2 rounded-lg text-sm font-medium transition-colors ${viewYear === yr ? "bg-peak-red text-white" : "text-peak-text hover:bg-white/10"}`}>
                {yr}
              </button>
            ))}
          </div>
        </div>
      )}

      {pickerMode === "days" && (
        <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-3">
          <div className="text-xs">{summary}</div>
          <div className="flex gap-2">
            <button onClick={handleClear} className="text-peak-text-secondary text-xs hover:text-peak-text transition-colors">Clear</button>
            <button onClick={handleConfirm} disabled={confirmDisabled}
              className="bg-peak-red disabled:opacity-40 text-white text-xs px-4 py-1.5 rounded-lg font-medium transition-colors hover:bg-peak-red-hover">
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Export ───────────────────────────────────────────────────────────────

export default function DateRangePicker({
  startDate = null,
  endDate = null,
  onStartChange,
  onEndChange,
  mode = "range",
  minStay,
  maxStay = 365,
  unavailableDates = [],
  unavailableRanges = [],
  placeholder = { start: "Check-in", end: "Check-out" },
  triggerStyle = "input",
  align = "left",
  context = "general",
}) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const hasStart = !!startDate;
  const hasEnd = !!endDate;
  const bothSelected = hasStart && (mode === "single" || hasEnd);
  const waitingForEnd = hasStart && !hasEnd && mode === "range";
  const alignClass = align === "right" ? "right-0" : align === "center" ? "left-1/2 -translate-x-1/2" : "left-0";

  if (triggerStyle === "inline") {
    return (
      <CalendarGrid
        startDate={startDate} endDate={endDate}
        onStartChange={onStartChange} onEndChange={onEndChange}
        mode={mode} minStay={minStay} maxStay={maxStay}
        unavailableDates={unavailableDates} unavailableRanges={unavailableRanges}
        context={context} onClose={() => {}}
      />
    );
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        className={`flex items-center bg-peak-surface border rounded-xl overflow-hidden transition-colors ${open ? "border-peak-blue/50" : "border-white/10"}`}
        onClick={() => setOpen(v => !v)}>
        <div className="flex-1 flex items-center gap-2 px-4 py-2.5 cursor-pointer hover:bg-white/5 transition-colors min-w-0">
          <CalendarIcon className="h-4 w-4 text-peak-text-secondary flex-shrink-0" />
          <span className={`text-sm truncate ${hasStart ? "text-peak-text" : "text-peak-text-secondary"}`}>
            {hasStart ? fmtDate(startDate) : placeholder.start}
          </span>
        </div>
        {mode === "range" && (
          <>
            <div className="w-px h-5 bg-white/10 flex-shrink-0" />
            <div className={`flex-1 flex items-center gap-2 px-4 py-2.5 cursor-pointer hover:bg-white/5 transition-colors min-w-0 ${waitingForEnd ? "animate-pulse" : ""}`}>
              <span className={`text-sm truncate ${hasEnd ? "text-peak-text" : "text-peak-text-secondary"}`}>
                {hasEnd ? fmtDate(endDate) : placeholder.end}
              </span>
            </div>
          </>
        )}
        {bothSelected && (
          <button
            onClick={(e) => { e.stopPropagation(); onStartChange(null); onEndChange && onEndChange(null); }}
            className="px-3 text-peak-text-secondary hover:text-peak-text transition-colors flex-shrink-0">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {open && (
        <>
          {isMobile ? (
            <>
              <div className="fixed inset-0 z-40 bg-peak-bg/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
              <div className="fixed bottom-0 left-0 right-0 z-50 bg-peak-card rounded-t-2xl p-5 pb-8"
                style={{ animation: "slideUp 300ms cubic-bezier(0.32,0.72,0,1) forwards" }}>
                <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-4" />
                <CalendarGrid
                  startDate={startDate} endDate={endDate}
                  onStartChange={onStartChange} onEndChange={onEndChange}
                  mode={mode} minStay={minStay} maxStay={maxStay}
                  unavailableDates={unavailableDates} unavailableRanges={unavailableRanges}
                  context={context} onClose={() => setOpen(false)}
                />
              </div>
            </>
          ) : (
            <div className={`absolute z-50 mt-2 bg-peak-card border border-white/10 rounded-2xl shadow-2xl p-4 ${alignClass}`}
              style={{ animation: "fadeDown 150ms ease forwards" }}>
              <CalendarGrid
                startDate={startDate} endDate={endDate}
                onStartChange={onStartChange} onEndChange={onEndChange}
                mode={mode} minStay={minStay} maxStay={maxStay}
                unavailableDates={unavailableDates} unavailableRanges={unavailableRanges}
                context={context} onClose={() => setOpen(false)}
              />
            </div>
          )}
        </>
      )}

      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}