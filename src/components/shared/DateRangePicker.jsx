// AVAILABILITY DATA — connect to live API
// unavailableDates and unavailableRanges props should be fetched
// from the booking/reservation system per property ID and room type.
// Expected endpoint: GET /api/availability?propertyId=X&roomType=Y&month=YYYY-MM
// Returns: { unavailableDates: string[], unavailableRanges: { start, end }[] }
// Until live data is available, pass empty arrays (all dates available).

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Calendar, X } from "lucide-react";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const MONTHS_SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS_LABELS = ["Mo","Tu","We","Th","Fr","Sa","Su"];
const DAYS_FULL = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

function utc(year, month, day) {
  return new Date(Date.UTC(year, month, day));
}

function toUTC(d) {
  if (!d) return null;
  if (typeof d === "string") {
    const [y, m, day] = d.split("-").map(Number);
    return utc(y, m - 1, day);
  }
  if (d instanceof Date) return utc(d.getFullYear(), d.getMonth(), d.getDate());
  return null;
}

export function fmtDate(d) {
  if (!d) return null;
  const dd = toUTC(d);
  if (!dd) return null;
  return `${String(dd.getUTCDate()).padStart(2, "0")} ${MONTHS_SHORT[dd.getUTCMonth()]} ${dd.getUTCFullYear()}`;
}

function isDateUnavailable(date, unavailableDates, unavailableRanges) {
  const iso = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`;
  if (unavailableDates.includes(iso)) return true;
  for (const r of unavailableRanges) {
    const s = new Date(r.start + "T00:00:00Z");
    const e = new Date(r.end + "T00:00:00Z");
    if (date >= s && date <= e) return true;
  }
  return false;
}

function rangeContainsUnavailable(start, end, unavailableDates, unavailableRanges) {
  let d = new Date(start.getTime() + 86400000);
  while (d < end) {
    if (isDateUnavailable(d, unavailableDates, unavailableRanges)) return true;
    d = new Date(d.getTime() + 86400000);
  }
  return false;
}

export default function DateRangePicker({
  startDate, endDate,
  onStartChange, onEndChange,
  mode = "range",
  minStay = 1,
  maxStay = 365,
  unavailableDates = [],
  unavailableRanges = [],
  placeholder = { start: "Check-in", end: "Check-out" },
  triggerStyle = "input",
  align = "left",
  context = "general",
}) {
  const [open, setOpen] = useState(false);
  const [selectingEnd, setSelectingEnd] = useState(false);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [viewYear, setViewYear] = useState(() => new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(() => new Date().getMonth());
  const [calView, setCalView] = useState("days"); // "days" | "months" | "years"
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  const start = toUTC(startDate);
  const end = toUTC(endDate);
  const now = new Date();
  const today = utc(now.getFullYear(), now.getMonth(), now.getDate());
  const CURRENT_YEAR = today.getUTCFullYear();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!open) return;
    function handler(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false);
    }
    function keyHandler(e) { if (e.key === "Escape") setOpen(false); }
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", keyHandler);
    };
  }, [open]);

  function openCalendar(preferEnd = false) {
    const ref = start || today;
    setViewYear(ref.getUTCFullYear());
    setViewMonth(ref.getUTCMonth());
    setCalView("days");
    setSelectingEnd(preferEnd && !!start);
    setOpen(true);
  }

  function prevMonth() {
    const t = utc(today.getUTCFullYear(), today.getUTCMonth(), 1);
    const d = utc(viewYear, viewMonth - 1, 1);
    if (d < t) return;
    setViewYear(d.getUTCFullYear());
    setViewMonth(d.getUTCMonth());
  }

  function nextMonth() {
    const d = utc(viewYear, viewMonth + 1, 1);
    setViewYear(d.getUTCFullYear());
    setViewMonth(d.getUTCMonth());
  }

  function handleDayClick(date) {
    if (date < today) return;
    if (isDateUnavailable(date, unavailableDates, unavailableRanges)) return;

    if (mode === "single") {
      onStartChange(date);
      setTimeout(() => setOpen(false), 150);
      return;
    }

    if (!selectingEnd || !start) {
      onStartChange(date);
      onEndChange(null);
      setSelectingEnd(true);
      return;
    }

    if (date < start) {
      onStartChange(date);
      onEndChange(null);
      setSelectingEnd(true);
      return;
    }

    if (date.getTime() === start.getTime()) {
      if (context === "hotel") return;
      onEndChange(date);
      setSelectingEnd(false);
      setTimeout(() => setOpen(false), 150);
      return;
    }

    if (rangeContainsUnavailable(start, date, unavailableDates, unavailableRanges)) return;

    const diffDays = Math.round((date - start) / 86400000);
    if (diffDays > maxStay) return;

    onEndChange(date);
    setSelectingEnd(false);
    setTimeout(() => setOpen(false), 150);
  }

  function clearDates() {
    onStartChange(null);
    onEndChange(null);
    setSelectingEnd(false);
  }

  // Compute effective range for visual display (includes hover preview)
  function getEffectiveRange() {
    if (end) return { rStart: start, rEnd: end, preview: false };
    if (selectingEnd && hoveredDate && start && hoveredDate > start) {
      return { rStart: start, rEnd: hoveredDate, preview: true };
    }
    return { rStart: start, rEnd: null, preview: false };
  }

  function renderDaysGrid() {
    const { rStart, rEnd, preview } = getEffectiveRange();
    const daysInMonth = new Date(Date.UTC(viewYear, viewMonth + 1, 0)).getUTCDate();
    const firstDow = (new Date(Date.UTC(viewYear, viewMonth, 1)).getUTCDay() + 6) % 7;
    const cells = [];

    for (let i = 0; i < firstDow; i++) {
      cells.push(<div key={`e${i}`} className="h-9" />);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const date = utc(viewYear, viewMonth, d);
      const isPast = date < today;
      const isUnavail = isDateUnavailable(date, unavailableDates, unavailableRanges);
      const isDisabled = isPast || isUnavail;
      const isToday = date.getTime() === today.getTime();
      const isStart = rStart && date.getTime() === rStart.getTime();
      const isEnd = rEnd && date.getTime() === rEnd.getTime();
      const isInRange = rStart && rEnd && date > rStart && date < rEnd;
      const bandColor = preview ? "bg-peak-red/10" : "bg-peak-red/15";
      const hasRange = !!(rStart && rEnd);

      const dow = (date.getUTCDay() + 6) % 7;
      const ariaLabel = `${DAYS_FULL[dow]} ${d} ${MONTHS[viewMonth]} ${viewYear}`;

      cells.push(
        <div
          key={d}
          className="relative h-9 flex items-center justify-center"
          onClick={() => !isDisabled && handleDayClick(date)}
          onMouseEnter={() => selectingEnd && !isDisabled && setHoveredDate(date)}
          aria-label={ariaLabel}
          aria-disabled={isDisabled}
          aria-selected={isStart || isEnd}
          title={isUnavail && !isPast ? "Not available" : undefined}
        >
          {/* Range band layers */}
          {isInRange && <div className={`absolute inset-y-1 left-0 right-0 ${bandColor}`} />}
          {isStart && hasRange && <div className={`absolute inset-y-1 left-1/2 right-0 ${bandColor}`} />}
          {isEnd && hasRange && rStart.getTime() !== rEnd.getTime() && <div className={`absolute inset-y-1 left-0 right-1/2 ${bandColor}`} />}
          {/* Day circle */}
          <div className={`relative z-10 w-8 h-8 flex items-center justify-center text-sm rounded-full transition-colors duration-75 select-none ${
            isStart || isEnd
              ? "bg-peak-red text-white font-bold cursor-pointer"
              : isDisabled
                ? `cursor-not-allowed ${isUnavail && !isPast ? "text-white/25 line-through" : "text-white/20"} ${isUnavail && !isPast ? "bg-peak-red/10" : ""}`
                : isInRange
                  ? "text-peak-text cursor-pointer"
                  : "text-peak-text hover:bg-white/10 cursor-pointer"
          }`}>
            {d}
            {isToday && !isStart && !isEnd && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-peak-blue rounded-full" />
            )}
          </div>
        </div>
      );
    }
    return cells;
  }

  const nightsOrDays = start && end ? Math.round((end - start) / 86400000) : 0;
  const unitLabel = context === "hotel" ? "night" : "day";
  const isPrevMonthDisabled = viewYear === today.getUTCFullYear() && viewMonth === today.getUTCMonth();
  const canConfirm = mode === "single" ? !!start : (!!start && !!end);
  const yearOptions = Array.from({ length: 4 }, (_, i) => CURRENT_YEAR + i);

  function FooterSummary() {
    if (!start && !end) return <span>Select dates</span>;
    if (start && !end) return <span>From {fmtDate(start)}</span>;
    return (
      <span>
        <span className="text-peak-text font-semibold">{nightsOrDays} {unitLabel}{nightsOrDays !== 1 ? "s" : ""}</span>
        <span className="text-peak-text-secondary"> · {fmtDate(start)} → {fmtDate(end)}</span>
      </span>
    );
  }

  function CalendarContent() {
    return (
      <div role="dialog" aria-label="Date picker" className="p-4 w-80">
        {mode === "range" && (
          <p className="text-peak-text-secondary text-xs text-center mb-3">
            {!start || !selectingEnd
              ? "Select your start date"
              : context === "hotel" ? "Now select your check-out date" : "Now select your end date"}
          </p>
        )}

        {/* Calendar header */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} disabled={isPrevMonthDisabled && calView === "days"}
            className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${isPrevMonthDisabled && calView === "days" ? "text-white/20 cursor-not-allowed" : "text-peak-text-secondary hover:text-peak-text hover:bg-white/10"}`}>
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-1">
            {calView === "days" && (
              <>
                <button onClick={() => setCalView("months")} className="font-display font-bold text-peak-text text-base hover:text-peak-blue transition-colors px-1">
                  {MONTHS[viewMonth]}
                </button>
                <button onClick={() => setCalView("years")} className="font-display font-bold text-peak-text text-base hover:text-peak-blue transition-colors px-1">
                  {viewYear}
                </button>
              </>
            )}
            {(calView === "months" || calView === "years") && (
              <button onClick={() => setCalView("days")} className="flex items-center gap-1 text-peak-text-secondary text-sm hover:text-peak-text px-1">
                <ChevronLeft className="h-3.5 w-3.5" /> Back
              </button>
            )}
          </div>

          <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center rounded-lg text-peak-text-secondary hover:text-peak-text hover:bg-white/10 transition-colors">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Day grid */}
        {calView === "days" && (
          <>
            <div className="grid grid-cols-7 mb-1">
              {DAYS_LABELS.map(d => (
                <div key={d} className="text-peak-text-secondary text-xs font-medium text-center py-1">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7" onMouseLeave={() => setHoveredDate(null)}>
              {renderDaysGrid()}
            </div>
          </>
        )}

        {/* Month picker */}
        {calView === "months" && (
          <div className="grid grid-cols-3 gap-2 py-2">
            {MONTHS_SHORT.map((m, i) => (
              <button key={m} onClick={() => { setViewMonth(i); setCalView("days"); }}
                className={`py-2 rounded-lg text-sm transition-colors ${i === viewMonth ? "bg-peak-red text-white font-bold" : "text-peak-text-secondary hover:bg-white/10 hover:text-peak-text"}`}>
                {m}
              </button>
            ))}
          </div>
        )}

        {/* Year picker */}
        {calView === "years" && (
          <div className="grid grid-cols-2 gap-2 py-2">
            {yearOptions.map(y => (
              <button key={y} onClick={() => { setViewYear(y); setCalView("days"); }}
                className={`py-2.5 rounded-lg text-sm transition-colors ${y === viewYear ? "bg-peak-red text-white font-bold" : "text-peak-text-secondary hover:bg-white/10 hover:text-peak-text"}`}>
                {y}
              </button>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-3">
          <div className="text-peak-text-secondary text-xs flex-1 mr-2 truncate">
            <FooterSummary />
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button onClick={clearDates} className="text-peak-text-secondary text-xs hover:text-peak-text transition-colors">Clear</button>
            <button onClick={() => setOpen(false)} disabled={!canConfirm}
              className="bg-peak-red text-white text-xs px-4 py-1.5 rounded-lg font-medium disabled:opacity-40 disabled:cursor-not-allowed transition-opacity">
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (triggerStyle === "inline") {
    return <div ref={containerRef}><CalendarContent /></div>;
  }

  const alignClass = align === "right" ? "right-0" : align === "center" ? "left-1/2 -translate-x-1/2" : "left-0";

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <div className="flex items-center bg-peak-surface border border-white/10 rounded-xl overflow-hidden">
        <button onClick={() => openCalendar(false)}
          className="flex-1 flex items-center gap-2 px-4 py-2.5 hover:bg-white/5 transition-colors min-w-0">
          <Calendar className="h-4 w-4 text-peak-text-secondary flex-shrink-0" />
          <span className={`text-sm truncate ${start ? "text-peak-text" : "text-peak-text-secondary"}`}>
            {start ? fmtDate(start) : placeholder.start}
          </span>
        </button>

        {mode === "range" && (
          <>
            <div className="w-px h-5 bg-white/10 flex-shrink-0" />
            <button onClick={() => openCalendar(true)}
              className={`flex-1 flex items-center gap-2 px-4 py-2.5 hover:bg-white/5 transition-colors min-w-0 ${start && !end ? "animate-pulse" : ""}`}>
              <Calendar className="h-4 w-4 text-peak-text-secondary flex-shrink-0" />
              <span className={`text-sm truncate ${end ? "text-peak-text" : "text-peak-text-secondary"}`}>
                {end ? fmtDate(end) : placeholder.end}
              </span>
            </button>
          </>
        )}

        {(start || end) && (
          <button onClick={(e) => { e.stopPropagation(); clearDates(); }}
            className="px-2 text-peak-text-secondary hover:text-peak-text transition-colors flex-shrink-0">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Dropdown (desktop) */}
      {open && !isMobile && (
        <div className={`absolute z-50 mt-2 bg-peak-card border border-white/10 rounded-2xl shadow-2xl ${alignClass}`}
          style={{ animation: "drpIn 150ms ease both" }}>
          <CalendarContent />
        </div>
      )}

      {/* Bottom sheet (mobile) */}
      {open && isMobile && (
        <>
          <div className="fixed inset-0 z-40 bg-peak-bg/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-peak-card rounded-t-2xl pb-8"
            style={{ animation: "slideUp 300ms cubic-bezier(0.32,0.72,0,1) both" }}>
            <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mt-3 mb-1" />
            <CalendarContent />
          </div>
        </>
      )}

      <style>{`
        @keyframes drpIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
      `}</style>
    </div>
  );
}