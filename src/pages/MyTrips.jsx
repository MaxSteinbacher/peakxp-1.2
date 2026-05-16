import { useState, useEffect, useMemo } from "react";
import { useT } from "../lib/i18n";
import { savePlan } from "../lib/bookings";
import BackButton from "../components/shared/BackButton";
import { useNavigate, Link } from "react-router-dom";
import {
  CheckCircle, Bookmark, Ticket, Clock, X, Bot, Calendar, Plus, Heart,
  ShoppingBag, MoreHorizontal, Trash2, Copy, Archive, Edit2, MapPin,
  ChevronDown, ChevronUp, ArrowRight, Star, TrendingUp, DollarSign,
} from "lucide-react";
import { toast } from "sonner";
import { useTripPlanner } from "../context/TripPlannerContext";
import { resorts } from "../lib/data";
import {
  getUserSavedPlans, deleteSavedPlan, updateSavedPlan,
  getSeasonPasses, addSeasonPass, removeSeasonPass, PASS_REGISTRY,
} from "../lib/bookings";

// ─── Helpers ────────────────────────────────────────────────────────────────

const SERVICE_COLORS = {
  "lift-pass": "bg-peak-red", accommodation: "bg-peak-blue", flights: "bg-purple-400",
  train: "bg-peak-green", car: "bg-yellow-400", equipment: "bg-orange-400",
  "ski-school": "bg-pink-400", dining: "bg-teal-400", storage: "bg-gray-400",
};
const SERVICE_LABELS = {
  "lift-pass": "Lift Pass", accommodation: "Accommodation", flights: "Flights",
  train: "Train", car: "Car Rental", equipment: "Equipment", "ski-school": "Ski School",
  dining: "Dining", storage: "Storage",
};

function getTabFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("tab") || "booked";
}

function EmptyState({ icon: Icon, title, desc, action, actionLabel, actionTo }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 rounded-2xl bg-peak-surface flex items-center justify-center mb-4">
        <Icon className="h-8 w-8 text-peak-text-secondary/30" />
      </div>
      <p className="font-display font-bold text-peak-text text-xl mb-2">{title}</p>
      <p className="text-peak-text-secondary text-sm max-w-xs mb-6">{desc}</p>
      {actionLabel && (
        <button onClick={() => navigate(actionTo || "/")}
          className="bg-peak-red text-white font-semibold px-6 py-3 rounded-xl text-sm hover:bg-peak-red-hover transition-colors">
          {actionLabel}
        </button>
      )}
    </div>
  );
}

// ─── Agent Plans (legacy) ─────────────────────────────────────────────────────

function AgentPlanCard({ plan, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const { startTrip, addResort } = useTripPlanner();

  function handleBook(option) {
    const resortObj = resorts.find(r => r.id === option.primaryResortId || r.name === option.resortName);
    const destination = { type: "resort", label: option.resortName || option.destination || "", id: option.primaryResortId || resortObj?.id || null, countryCode: resortObj?.country || null, flag: resortObj?.flag || "" };
    const dates = option.dates || { start: null, end: null, nights: null };
    const guests = option.guests || { adults: 2, children: 0, seniors: 0 };
    const selectedServices = option.selectedServices?.length > 0 ? option.selectedServices : ["ski-pass"];
    startTrip(destination, dates, guests, selectedServices);
    if (resortObj) setTimeout(() => addResort({ ...resortObj, resortId: resortObj.id }), 80);
    sessionStorage.setItem("peakxp_agent_option", JSON.stringify({ agentKey: plan.agentKey, agentName: plan.agentName, optionLabel: option.optionLabel, optionSummary: option.optionSummary, resortName: option.resortName }));
    navigate("/plan");
  }

  const topOption = plan.options?.[0];
  const createdDate = new Date(plan.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="bg-peak-card border border-white/5 rounded-2xl overflow-hidden mb-4">
      <div className="px-5 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-peak-blue/10 flex items-center justify-center flex-shrink-0">
            <Bot className="h-4 w-4 text-peak-blue" />
          </div>
          <div className="min-w-0">
            <p className="text-peak-text font-semibold text-sm truncate">{plan.agentName}</p>
            <p className="text-peak-text-secondary text-xs">{createdDate} · {plan.options?.length || 0} options</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button onClick={() => { if (confirm("Delete this saved plan?")) onDelete(plan.id); }} className="w-8 h-8 rounded-lg bg-peak-surface border border-white/5 flex items-center justify-center text-peak-text-secondary hover:text-peak-red transition-colors">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
          <button onClick={() => setExpanded(v => !v)} className="w-8 h-8 rounded-lg bg-peak-surface border border-white/5 flex items-center justify-center text-peak-text-secondary hover:text-peak-text transition-colors">
            {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>
      {!expanded && topOption && (
        <div className="px-5 pb-4 flex items-center justify-between gap-4 border-t border-white/5 pt-3">
          <div>
            <span className="text-xs text-peak-text-secondary">Top option: </span>
            <span className="text-peak-text text-xs font-semibold">{topOption.optionLabel} — {topOption.resortName}</span>
            {topOption.estimatedTotalEUR && <span className="text-peak-text-secondary text-xs ml-2">€{topOption.estimatedTotalEUR.toLocaleString()}</span>}
          </div>
          <button onClick={() => setExpanded(true)} className="text-peak-blue text-xs hover:underline flex-shrink-0">View all →</button>
        </div>
      )}
      {expanded && (
        <div className="border-t border-white/5 divide-y divide-white/5">
          {(plan.options || []).map(option => (
            <div key={option.optionIndex} className="px-5 py-4 flex items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-bold text-peak-text">{option.optionLabel}</span>
                  {option.estimatedTotalEUR && <span className="text-peak-text-secondary text-xs">· €{option.estimatedTotalEUR.toLocaleString()}</span>}
                </div>
                <p className="text-peak-text font-medium text-sm">{option.resortName}</p>
                <p className="text-peak-text-secondary text-xs mt-0.5 line-clamp-1">{option.optionSummary}</p>
              </div>
              <button onClick={() => handleBook(option)} className="bg-peak-red hover:bg-peak-red-hover text-white font-semibold px-4 py-2 rounded-xl text-xs transition-colors flex items-center gap-1.5 flex-shrink-0">
                Book <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Plan Card ────────────────────────────────────────────────────────────────

function PlanCard({ plan, onDelete, onUpdate, onAddToBasket }) {
  const [editingName, setEditingName] = useState(false);
  const [nameVal, setNameVal] = useState(plan.name || "Untitled plan");
  const [menuOpen, setMenuOpen] = useState(false);
  const color = SERVICE_COLORS[plan.serviceKey] || "bg-peak-text-secondary";

  function saveName() {
    setEditingName(false);
    if (nameVal !== plan.name) onUpdate(plan.id, { name: nameVal });
  }

  function toggleFav() {
    onUpdate(plan.id, { status: plan.status === "favourite" ? "planning" : "favourite" });
  }

  const dateStr = plan.dates?.start
    ? `${new Date(plan.dates.start).toLocaleDateString("en-GB", { day: "numeric", month: "short" })} – ${plan.dates?.end ? new Date(plan.dates.end).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "?"}`
    : null;

  const keyDetail = (() => {
    const d = plan.itemDetails || {};
    if (plan.serviceKey === "lift-pass") return d.passType || null;
    if (plan.serviceKey === "accommodation") return d.roomType || null;
    if (plan.serviceKey === "flights") return d.route || null;
    if (plan.serviceKey === "car") return d.category || null;
    if (plan.serviceKey === "ski-school") return d.courseType || null;
    return null;
  })();

  return (
    <div className={`bg-peak-card border rounded-2xl overflow-hidden hover:border-white/15 transition-all group ${plan.status === "favourite" ? "border-yellow-400/20" : "border-white/5"}`}>
      <div className={`h-1.5 ${color}`} />
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${color}/20 text-peak-text-secondary`}>
            {SERVICE_LABELS[plan.serviceKey] || plan.serviceKey}
          </span>
          <div className="relative">
            <button onClick={() => setMenuOpen(m => !m)} className="w-7 h-7 rounded-lg bg-peak-surface border border-white/10 flex items-center justify-center text-peak-text-secondary hover:text-peak-text opacity-0 group-hover:opacity-100 transition-all">
              <MoreHorizontal className="h-3.5 w-3.5" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-8 z-10 bg-peak-card border border-white/10 rounded-xl py-1 w-40 shadow-xl">
                {[
                  { label: "Edit name", icon: Edit2, action: () => { setEditingName(true); setMenuOpen(false); } },
                  { label: "Duplicate", icon: Copy, action: () => { onUpdate(null, null, plan); setMenuOpen(false); } },
                  { label: "Archive", icon: Archive, action: () => { onUpdate(plan.id, { status: "archived" }); setMenuOpen(false); } },
                  { label: "Delete", icon: Trash2, action: () => { onDelete(plan.id); setMenuOpen(false); }, danger: true },
                ].map(item => (
                  <button key={item.label} onClick={item.action} className={`w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-peak-surface transition-colors ${item.danger ? "text-peak-red" : "text-peak-text-secondary hover:text-peak-text"}`}>
                    <item.icon className="h-3.5 w-3.5" />{item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {editingName ? (
          <input autoFocus value={nameVal} onChange={e => setNameVal(e.target.value)} onBlur={saveName} onKeyDown={e => e.key === "Enter" && saveName()}
            className="font-bold text-peak-text text-base bg-peak-surface border border-peak-blue/50 rounded-lg px-2 py-1 w-full outline-none text-sm" />
        ) : (
          <p className="font-bold text-peak-text text-base mt-1 cursor-pointer hover:text-peak-blue transition-colors" onClick={() => setEditingName(true)}>{nameVal}</p>
        )}

        {dateStr && <p className="text-peak-text-secondary text-sm mt-1">{dateStr}</p>}
        {plan.guests?.adults && <p className="text-peak-text-secondary text-xs mt-0.5">{plan.guests.adults} adult{plan.guests.adults !== 1 ? "s" : ""}{plan.guests.children ? `, ${plan.guests.children} children` : ""}</p>}
        {keyDetail && <p className="text-peak-text-secondary text-xs mt-1 italic">{keyDetail}</p>}
        {plan.estimatedPriceEUR && <p className="font-display font-bold text-peak-text text-lg mt-3">€{plan.estimatedPriceEUR.toLocaleString()}</p>}
      </div>
      <div className="px-5 pb-5 flex gap-2">
        <button onClick={() => onAddToBasket(plan.id)} className="flex-1 bg-peak-red hover:bg-peak-red-hover text-white text-xs font-semibold rounded-lg py-2 transition-colors flex items-center justify-center gap-1">
          <ShoppingBag className="h-3.5 w-3.5" /> Add to basket
        </button>
        <button onClick={toggleFav} className="w-9 h-9 rounded-lg bg-peak-surface border border-white/10 flex items-center justify-center hover:border-white/25 transition-colors">
          <Heart className={`h-4 w-4 ${plan.status === "favourite" ? "fill-peak-red text-peak-red" : "text-peak-text-secondary"}`} />
        </button>
      </div>
    </div>
  );
}

// ─── Pass Card ────────────────────────────────────────────────────────────────

function PassCard({ pass, onRemove }) {
  const meta = PASS_REGISTRY.find(p => p.key === pass.passKey) || {};
  const now = new Date();
  const validTo = pass.validTo ? new Date(pass.validTo) : null;
  const daysLeft = validTo ? Math.round((validTo - now) / 86400000) : null;
  const status = !validTo ? "active" : daysLeft > 30 ? "active" : daysLeft > 0 ? "expiring" : "expired";
  const statusLabel = { active: "Active", expiring: "Expires soon", expired: "Expired" }[status];
  const statusColor = { active: "text-peak-green", expiring: "text-yellow-400", expired: "text-peak-text-secondary" }[status];

  return (
    <div className="bg-peak-card border border-white/5 rounded-2xl p-5 flex items-start gap-4">
      <div className={`w-12 h-12 rounded-xl ${meta.color || "bg-peak-surface"} ${meta.textColor || "text-peak-text"} flex items-center justify-center text-base font-bold flex-shrink-0`}>
        {(meta.name || pass.passKey)?.[0] || "P"}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-peak-text text-base">{meta.name || pass.passKey}</p>
        <p className="text-peak-text-secondary text-sm">{meta.region || pass.region || ""}</p>
        {pass.validFrom && <p className="text-peak-text-secondary text-xs mt-1">Valid: {new Date(pass.validFrom).toLocaleDateString("en-GB")} – {validTo ? validTo.toLocaleDateString("en-GB") : "?"}</p>}
        <p className={`text-xs font-semibold mt-1 ${statusColor}`}>{statusLabel}{daysLeft !== null && daysLeft > 0 && ` · ${daysLeft} days left`}</p>
        {pass.passNumber && <p className="text-peak-text-secondary text-xs mt-1 font-mono">Pass #: {pass.passNumber}</p>}
      </div>
      <button onClick={() => onRemove(pass.id)} className="w-8 h-8 rounded-lg bg-peak-surface border border-white/5 flex items-center justify-center text-peak-text-secondary hover:text-peak-red transition-colors flex-shrink-0">
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

// ─── Add Pass Modal ───────────────────────────────────────────────────────────

function AddPassModal({ onClose, onAdd }) {
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ passNumber: "", validFrom: "", validTo: "", notes: "" });

  function handleAdd() {
    if (!selected) return;
    onAdd({ passKey: selected, ...form });
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-peak-bg/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-peak-card border border-white/10 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-bold text-xl text-peak-text">Add your season pass</h2>
          <button onClick={onClose} className="text-peak-text-secondary hover:text-peak-text transition-colors"><X className="h-5 w-5" /></button>
        </div>

        {!selected ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {PASS_REGISTRY.map(pass => (
              <button key={pass.key} onClick={() => setSelected(pass.key)}
                className="p-4 rounded-xl border border-white/10 hover:border-white/25 text-left transition-all">
                <div className={`w-10 h-10 rounded-lg ${pass.color} ${pass.textColor} flex items-center justify-center font-bold text-base mb-2`}>{pass.name[0]}</div>
                <p className="font-semibold text-peak-text text-sm">{pass.name}</p>
                <p className="text-peak-text-secondary text-xs">{pass.region}</p>
                <p className="text-peak-text-secondary text-xs mt-1">{pass.price}</p>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-peak-surface rounded-xl p-3 mb-4">
              {(() => { const meta = PASS_REGISTRY.find(p => p.key === selected); return (<><div className={`w-9 h-9 rounded-lg ${meta?.color} ${meta?.textColor} flex items-center justify-center font-bold`}>{meta?.name[0]}</div><div><p className="font-semibold text-peak-text text-sm">{meta?.name}</p><p className="text-peak-text-secondary text-xs">{meta?.region}</p></div></>); })()}
              <button onClick={() => setSelected(null)} className="ml-auto text-xs text-peak-blue hover:underline">Change</button>
            </div>
            {[
              { key: "passNumber", label: "Pass number (optional)", placeholder: "For your reference" },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-xs text-peak-text-secondary mb-1">{f.label}</label>
                <input value={form[f.key]} onChange={e => setForm(v => ({ ...v, [f.key]: e.target.value }))} placeholder={f.placeholder}
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
              </div>
            ))}
            <div className="grid grid-cols-2 gap-4">
              {[{ k: "validFrom", l: "Valid from" }, { k: "validTo", l: "Valid to" }].map(f => (
                <div key={f.k}>
                  <label className="block text-xs text-peak-text-secondary mb-1">{f.l}</label>
                  <input type="date" value={form[f.k]} onChange={e => setForm(v => ({ ...v, [f.k]: e.target.value }))}
                    className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
                </div>
              ))}
            </div>
            <button onClick={handleAdd} className="w-full py-3 bg-peak-red hover:bg-peak-red-hover text-white font-bold rounded-xl transition-colors">
              Save pass
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MyTrips() {
  const t = useT();
  const navigate = useNavigate();
  const { addToBasket } = useTripPlanner();
  const [activeTab, setActiveTab] = useState(getTabFromUrl);

  // Saved plans
  const [savedPlans, setSavedPlans] = useState(() => getUserSavedPlans());
  const [planSearch, setPlanSearch] = useState("");
  const [planSortBy, setPlanSortBy] = useState("Newest");
  const [planServiceFilter, setPlanServiceFilter] = useState("All");
  const [planStatusFilter, setPlanStatusFilter] = useState("All");

  // Season passes
  const [seasonPasses, setSeasonPasses] = useState(() => getSeasonPasses());
  const [showAddPass, setShowAddPass] = useState(false);

  // Agent plans (legacy)
  const [agentPlans, setAgentPlans] = useState(() => {
    try { return JSON.parse(localStorage.getItem("peakxp_agent_plans") || "[]"); } catch { return []; }
  });

  // Sync URL tab
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlTab = params.get("tab");
    if (urlTab && urlTab !== activeTab) setActiveTab(urlTab);
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("tab", activeTab);
    window.history.replaceState({}, "", url.toString());
  }, [activeTab]);

  const TABS = [
    { key: "booked", label: t('booked'), icon: CheckCircle },
    { key: "planning", label: t('trip_planning_tab'), icon: Bookmark },
    { key: "passes", label: t('season_passes'), icon: Ticket },
    { key: "past", label: t('past'), icon: Clock },
    { key: "cancelled", label: t('cancelled'), icon: X },
  ];

  // Stats
  const totalSpend = 0; // would sum confirmed bookings
  const stats = [
    { icon: CheckCircle, label: "Trips booked", value: "0" },
    { icon: Bookmark, label: "Saved plans", value: savedPlans.length },
    { icon: Ticket, label: "Season passes", value: seasonPasses.length },
    { icon: DollarSign, label: "Total spend", value: `€${totalSpend.toLocaleString()}` },
  ];

  // Draft trip
  const hasDraft = !!localStorage.getItem("peakxp_trip_session");

  // Plan helpers
  function handleDeletePlan(id) {
    deleteSavedPlan(id);
    setSavedPlans(getUserSavedPlans());
    toast.success("Plan deleted");
  }

  function handleUpdatePlan(id, changes, duplicate) {
    if (duplicate) {
      const newPlan = { ...duplicate, id: undefined, createdAt: undefined, name: (duplicate.name || "Plan") + " (copy)" };
      savePlan(duplicate.userId, newPlan);
      setSavedPlans(getUserSavedPlans());
      toast.success("Plan duplicated");
      return;
    }
    updateSavedPlan(id, changes);
    setSavedPlans(getUserSavedPlans());
  }

  function handleAddToBasket(planId) {
    const plan = savedPlans.find(p => p.id === planId);
    if (!plan?.itemDetails) { toast.error("No basket details available for this plan"); return; }
    addToBasket?.(plan.itemDetails);
    toast.success("Added to trip basket!");
  }

  // Filter/sort plans
  const filteredPlans = useMemo(() => {
    let plans = savedPlans.filter(p => p.status !== "archived");
    if (planSearch) plans = plans.filter(p => (p.name || "").toLowerCase().includes(planSearch.toLowerCase()) || (p.resortName || "").toLowerCase().includes(planSearch.toLowerCase()) || (p.destination?.label || "").toLowerCase().includes(planSearch.toLowerCase()));
    if (planServiceFilter !== "All") plans = plans.filter(p => p.serviceKey === planServiceFilter.toLowerCase().replace(" ", "-"));
    if (planStatusFilter !== "All") plans = plans.filter(p => p.status === planStatusFilter.toLowerCase());
    if (planSortBy === "Newest") plans.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    else if (planSortBy === "Travel date") plans.sort((a, b) => new Date(a.dates?.start || 0) - new Date(b.dates?.start || 0));
    else if (planSortBy === "Estimated price") plans.sort((a, b) => (b.estimatedPriceEUR || 0) - (a.estimatedPriceEUR || 0));
    else if (planSortBy === "Destination") plans.sort((a, b) => (a.destination?.label || "").localeCompare(b.destination?.label || ""));
    return plans;
  }, [savedPlans, planSearch, planServiceFilter, planStatusFilter, planSortBy]);

  // Group by destination
  const favPlans = filteredPlans.filter(p => p.status === "favourite");
  const regularPlans = filteredPlans.filter(p => p.status !== "favourite");

  const destinationGroups = useMemo(() => {
    const groups = {};
    regularPlans.forEach(plan => {
      const key = plan.resortName || plan.hotelName || plan.destination?.label || "General";
      if (!groups[key]) groups[key] = [];
      groups[key].push(plan);
    });
    return Object.entries(groups);
  }, [regularPlans]);

  // Season pass helpers
  function handleAddPass(passData) {
    addSeasonPass(undefined, passData);
    setSeasonPasses(getSeasonPasses());
    toast.success("Season pass added!");
  }
  function handleRemovePass(id) {
    removeSeasonPass(id);
    setSeasonPasses(getSeasonPasses());
    toast.success("Pass removed");
  }

  // Agent plans helper
  function deleteAgentPlan(id) {
    const updated = agentPlans.filter(p => p.id !== id);
    setAgentPlans(updated);
    localStorage.setItem("peakxp_agent_plans", JSON.stringify(updated));
    toast.success("Plan deleted");
  }

  return (
    <div className="min-h-screen pt-24 pb-16 max-w-5xl mx-auto px-4 sm:px-6">
      <BackButton to="/" className="mb-4" />
      <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-peak-text mb-6">{t('my_trips_title')}</h1>

      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="bg-peak-card border border-white/5 rounded-xl p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-peak-surface flex items-center justify-center">
              <Icon className="h-4 w-4 text-peak-blue" />
            </div>
            <div>
              <p className="font-display font-bold text-peak-text text-xl leading-none">{value}</p>
              <p className="text-peak-text-secondary text-xs mt-0.5">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <button onClick={() => navigate("/trip-planning")} className="bg-peak-red text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-peak-red-hover transition-colors">
          Plan a new trip
        </button>
        <button onClick={() => navigate("/search")} className="border border-white/10 text-peak-text-secondary px-4 py-2 rounded-xl text-sm hover:text-peak-text transition-colors">
          Browse resorts
        </button>
        {hasDraft && (
          <button onClick={() => navigate("/plan")} className="border border-white/10 text-peak-text-secondary px-4 py-2 rounded-xl text-sm hover:text-peak-text transition-colors">
            Continue draft
          </button>
        )}
        <button onClick={() => navigate("/agents")} className="border border-white/10 text-peak-text-secondary px-4 py-2 rounded-xl text-sm hover:text-peak-text transition-colors">
          Start with an agent
        </button>
        <button onClick={() => { setActiveTab("passes"); setShowAddPass(true); }} className="border border-white/10 text-peak-text-secondary px-4 py-2 rounded-xl text-sm hover:text-peak-text transition-colors">
          Add a season pass
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-peak-surface rounded-xl p-1 mb-8 overflow-x-auto hide-scrollbar">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button key={key} onClick={() => setActiveTab(key)}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === key ? "bg-peak-card text-peak-text shadow-sm" : "text-peak-text-secondary hover:text-peak-text"}`}>
            <Icon className="h-4 w-4" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* ── Tab: Booked Trips ─────────────────────────────────────────────── */}
      {activeTab === "booked" && (
        <EmptyState icon={CheckCircle} title="No upcoming trips" desc="Start planning your next ski adventure from the home page." actionLabel="Start planning" actionTo="/trip-planning" />
      )}

      {/* ── Tab: Trip Planning ────────────────────────────────────────────── */}
      {activeTab === "planning" && (
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold text-peak-text text-2xl">Your saved trip plans</h2>
            <button onClick={() => navigate("/trip-planning")} className="bg-peak-red text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-peak-red-hover transition-colors">
              <Plus className="h-4 w-4" /> New plan
            </button>
          </div>

          {/* Filter bar */}
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <input value={planSearch} onChange={e => setPlanSearch(e.target.value)} placeholder="Search plans..."
              className="bg-peak-surface border border-white/10 rounded-xl px-4 py-2 text-sm text-peak-text outline-none focus:border-peak-blue w-48" />
            <select value={planSortBy} onChange={e => setPlanSortBy(e.target.value)}
              className="bg-peak-surface border border-white/10 rounded-xl px-3 py-2 text-sm text-peak-text outline-none focus:border-peak-blue">
              {["Newest", "Travel date", "Estimated price", "Destination"].map(s => <option key={s}>{s}</option>)}
            </select>
            <div className="flex gap-1 overflow-x-auto hide-scrollbar">
              {["All", "Planning", "Favourite"].map(s => (
                <button key={s} onClick={() => setPlanStatusFilter(s)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border whitespace-nowrap transition-colors ${planStatusFilter === s ? "bg-peak-blue/20 border-peak-blue/40 text-peak-blue" : "border-white/10 text-peak-text-secondary hover:text-peak-text"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Service filter pills */}
          <div className="flex gap-1 overflow-x-auto hide-scrollbar mb-6 pb-1">
            {["All", "Lift Pass", "Hotel", "Flights", "Train", "Car", "Equipment", "Ski School", "Dining"].map(s => (
              <button key={s} onClick={() => setPlanServiceFilter(s)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border whitespace-nowrap transition-colors flex-shrink-0 ${planServiceFilter === s ? "bg-peak-red/20 border-peak-red/40 text-peak-red" : "border-white/10 text-peak-text-secondary hover:text-peak-text"}`}>
                {s}
              </button>
            ))}
          </div>

          {/* Legacy agent plans */}
          {agentPlans.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Bot className="h-4 w-4 text-peak-blue" />
                <span className="font-bold text-peak-text text-sm">Agent recommendations</span>
                <span className="bg-peak-surface text-peak-text-secondary text-xs px-2 py-0.5 rounded-full">{agentPlans.length}</span>
              </div>
              {agentPlans.map(plan => <AgentPlanCard key={plan.id} plan={plan} onDelete={deleteAgentPlan} />)}
            </div>
          )}

          {savedPlans.length === 0 ? (
            <EmptyState icon={Bookmark} title="No saved plans yet" desc="Browse resorts, hotels and transport options and save anything that catches your eye." actionLabel="Start exploring" actionTo="/trip-planning" />
          ) : filteredPlans.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-peak-text-secondary text-sm mb-2">No plans match your filters</p>
              <button onClick={() => { setPlanSearch(""); setPlanServiceFilter("All"); setPlanStatusFilter("All"); }} className="text-peak-blue text-sm hover:underline">Clear filters</button>
            </div>
          ) : (
            <>
              {/* Favourites section */}
              {favPlans.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Heart className="h-4 w-4 fill-peak-red text-peak-red" />
                    <span className="font-bold text-peak-text">Favourites</span>
                    <span className="bg-peak-surface text-peak-text-secondary text-xs px-2 py-0.5 rounded-full">{favPlans.length}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {favPlans.map(plan => (
                      <PlanCard key={plan.id} plan={plan} onDelete={handleDeletePlan} onUpdate={handleUpdatePlan} onAddToBasket={handleAddToBasket} />
                    ))}
                  </div>
                </div>
              )}

              {/* Destination groups */}
              {destinationGroups.map(([dest, plans]) => (
                <div key={dest} className="mb-8">
                  <div className="flex items-center justify-between py-3 border-b border-white/5 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-peak-text text-lg">{dest}</span>
                      <span className="bg-peak-surface text-peak-text-secondary text-xs px-2 py-0.5 rounded-full">{plans.length}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => { plans.forEach(p => handleAddToBasket(p.id)); toast.success(`${plans.length} plans added to basket`); }}
                        className="bg-peak-red/10 text-peak-red border border-peak-red/20 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-peak-red/20 transition-colors">
                        Book all
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {plans.map(plan => (
                      <PlanCard key={plan.id} plan={plan} onDelete={handleDeletePlan} onUpdate={handleUpdatePlan} onAddToBasket={handleAddToBasket} />
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}

      {/* ── Tab: Season Passes ────────────────────────────────────────────── */}
      {activeTab === "passes" && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold text-peak-text text-2xl">Season Passes</h2>
            <button onClick={() => setShowAddPass(true)} className="bg-peak-red text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-peak-red-hover transition-colors">
              <Plus className="h-4 w-4" /> Add pass
            </button>
          </div>

          {seasonPasses.length === 0 ? (
            <EmptyState icon={Ticket} title="No season passes added" desc="Add your Ikon Pass, Epic Pass, Magic Pass or regional season card to track usage and discover valid resorts." actionLabel="Add a pass" />
          ) : (
            <div className="space-y-4">
              {seasonPasses.map(pass => (
                <PassCard key={pass.id} pass={pass} onRemove={handleRemovePass} />
              ))}
            </div>
          )}

          {showAddPass && <AddPassModal onClose={() => setShowAddPass(false)} onAdd={handleAddPass} />}
        </div>
      )}

      {/* ── Tab: Past Trips ───────────────────────────────────────────────── */}
      {activeTab === "past" && (
        <div>
          <div className="flex items-center gap-3 bg-peak-card border border-white/5 rounded-2xl p-5 mb-6">
            <TrendingUp className="h-5 w-5 text-peak-blue" />
            <div>
              <p className="font-bold text-peak-text text-sm">Your ski stats</p>
              <p className="text-peak-text-secondary text-xs">Resorts visited: 0 · Total nights: 0 · Total days skiing: 0</p>
            </div>
          </div>
          <EmptyState icon={Clock} title="No past trips yet" desc="Your completed trips will appear here after travel dates have passed." />
        </div>
      )}

      {/* ── Tab: Cancelled ────────────────────────────────────────────────── */}
      {activeTab === "cancelled" && (
        <EmptyState icon={X} title="No cancelled trips" desc="Any cancelled bookings will appear here." />
      )}
    </div>
  );
}