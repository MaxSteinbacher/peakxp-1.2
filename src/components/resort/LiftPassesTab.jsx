import { useState } from "react";
import { useT } from "../../lib/i18n";
import { Link } from "react-router-dom";
import { Minus, Plus, Check, ExternalLink } from "lucide-react";
import { SEASON_PASSES } from "../../lib/data";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const CURRENT_MONTH = new Date().getMonth();

export default function LiftPassesTab({ resort }) {
  const t = useT();
  const [selectedPass, setSelectedPass] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [seniors, setSeniors] = useState(0);

  const pass = resort.liftPasses[selectedPass];
  const totalPrice = pass.adult * adults + pass.child * children + pass.senior * seniors;

  const validPasses = (resort.seasonPasses || []).map(id => SEASON_PASSES[id]).filter(Boolean);

  const calendarMonths = resort.seasonCalendar || MONTHS.map((m, i) => ({
    month: m,
    status: i >= 10 || i <= 3 ? (i === 10 || i === 3 ? "partial" : "open") : "closed",
  }));
  const calMonthMap = {};
  calendarMonths.forEach(c => { calMonthMap[c.month] = c.status; });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">

        {/* Pass rules */}
        <div className="bg-peak-card border border-white/5 rounded-xl p-5">
          <h3 className="font-display font-bold text-peak-text text-base mb-4">Pass Rules and Information</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
            {[
              { label: "Child", val: "0–14 yrs" },
              { label: "Youth", val: "15–18 yrs" },
              { label: "Adult", val: "19–64 yrs" },
              { label: "Senior", val: "65+ yrs" },
              { label: "Photo required", val: "Yes (3+ days)" },
              { label: "Hands-free RFID", val: "Yes" },
              { label: "Pass pickup", val: "Collect at resort" },
              { label: "Cancellation", val: "Up to 48h before" },
              { label: "Lost pass", val: "€10 replacement fee" },
            ].map(item => (
              <div key={item.label} className="bg-peak-surface rounded-xl p-3">
                <p className="text-peak-text-secondary text-xs mb-0.5">{item.label}</p>
                <p className="text-peak-text font-semibold text-xs">{item.val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Multi-resort season passes */}
        {validPasses.length > 0 && (
          <div>
            <h3 className="font-display font-bold text-peak-text text-base mb-3">Multi-resort passes valid here</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {validPasses.map(p => (
                <div key={p.name} className="bg-peak-card border border-white/10 rounded-2xl overflow-hidden">
                  <div className="h-2" style={{ backgroundColor: p.color }} />
                  <div className="p-4">
                    <p className="font-bold text-peak-text mb-1">{p.name}</p>
                    <p className="text-peak-text-secondary text-xs mb-2">{p.regions} resorts covered · from €{p.priceFrom}/season</p>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-peak-green text-xs font-semibold">
                        <Check className="h-3.5 w-3.5" /> Valid at this resort
                      </span>
                      <button className="flex items-center gap-1 text-peak-blue text-xs hover:underline">
                        View details <ExternalLink className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pass selection */}
        <div>
          <h3 className="font-display font-bold text-peak-text text-xl mb-4">Select your pass</h3>
          <div className="space-y-3 mb-6">
            {resort.liftPasses.map((lp, i) => (
              <button key={lp.type} onClick={() => setSelectedPass(i)}
                className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${selectedPass === i ? "bg-peak-card border-peak-red/40" : "bg-peak-surface border-white/5 hover:border-white/10"}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedPass === i ? "border-peak-red" : "border-peak-text-secondary"}`}>
                    {selectedPass === i && <div className="w-2 h-2 rounded-full bg-peak-red" />}
                  </div>
                  <span className="text-peak-text font-medium">{lp.type}</span>
                  {lp.badge && <span className="bg-peak-green/20 text-peak-green text-xs font-semibold px-2 py-0.5 rounded-full">{lp.badge}</span>}
                </div>
                <span className="text-peak-text font-bold">€{lp.adult}</span>
              </button>
            ))}
          </div>

          <h3 className="font-display font-bold text-peak-text text-xl mb-4">Guests</h3>
          {[
            { label: "Adults (19–64)", value: adults, set: setAdults, min: 1 },
            { label: "Children (0–14)", value: children, set: setChildren, min: 0 },
            { label: "Seniors (65+)", value: seniors, set: setSeniors, min: 0 },
          ].map(g => (
            <div key={g.label} className="flex items-center justify-between py-3 border-b border-white/5">
              <span className="text-peak-text text-sm">{g.label}</span>
              <div className="flex items-center gap-3">
                <button onClick={() => g.set(Math.max(g.min, g.value - 1))} className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-peak-text-secondary hover:text-peak-text">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-peak-text font-semibold w-6 text-center">{g.value}</span>
                <button onClick={() => g.set(g.value + 1)} className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-peak-text-secondary hover:text-peak-text">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Season calendar */}
        <div>
          <h3 className="font-display font-bold text-peak-text text-base mb-3">Season calendar</h3>
          <div className="flex gap-1 overflow-x-auto hide-scrollbar pb-2">
            {MONTHS.map((m, i) => {
              const status = calMonthMap[m] || "closed";
              const isCurrent = i === CURRENT_MONTH;
              return (
                <div key={m} className={`flex-shrink-0 w-16 rounded-lg p-2 text-center border relative ${status === "open" ? "bg-peak-green/20 border-peak-green/30" : status === "partial" ? "bg-yellow-500/10 border-yellow-500/20" : "bg-peak-surface border-white/5"}`}>
                  <p className={`text-xs font-semibold ${status === "open" ? "text-peak-green" : status === "partial" ? "text-yellow-400" : "text-peak-text-secondary"}`}>{m}</p>
                  <p className="text-xs text-peak-text-secondary/60 mt-0.5">{status === "open" ? "Open" : status === "partial" ? "Partial" : "Closed"}</p>
                  {isCurrent && <div className="absolute -top-1 left-1/2 -translate-x-1/2 bg-peak-red text-white text-xs px-1 rounded">Now</div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Price summary sticky */}
      <div className="bg-peak-card border border-white/5 rounded-xl p-6 h-fit lg:sticky lg:top-24">
        <h3 className="font-display font-bold text-peak-text text-lg mb-4">Price summary</h3>
        <div className="space-y-2 text-sm mb-6">
          {adults > 0 && <div className="flex justify-between text-peak-text-secondary"><span>Adult x {adults}</span><span>€{pass.adult * adults}</span></div>}
          {children > 0 && <div className="flex justify-between text-peak-text-secondary"><span>Child x {children}</span><span>€{pass.child * children}</span></div>}
          {seniors > 0 && <div className="flex justify-between text-peak-text-secondary"><span>Senior x {seniors}</span><span>€{pass.senior * seniors}</span></div>}
          <div className="pt-3 border-t border-white/5 flex justify-between text-peak-text font-bold text-lg">
            <span>Total</span><span>€{totalPrice}</span>
          </div>
        </div>
        <Link to={`/book?resort=${resort.id}&pass=${selectedPass}&adults=${adults}&children=${children}&seniors=${seniors}`}
          className="block w-full py-3 bg-peak-red hover:bg-peak-red-hover text-white text-center font-semibold rounded-lg transition-colors">
          Add to cart
        </Link>
      </div>
    </div>
  );
}