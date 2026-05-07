import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTripPlanner, useUnsavedTripWarning } from "../context/TripPlannerContext";
import { useAppAuth } from "../context/AppAuthContext";
import { ArrowLeft, ChevronDown, ChevronUp, Ticket, Hotel, Wrench, GraduationCap, Utensils, Lock, Snowflake, Baby, Plane, Train, Car, X, Pencil, Plus, CreditCard, Shield, Check, Clock, AlertCircle, TriangleAlert } from "lucide-react";
import DateRangePicker from "../components/shared/DateRangePicker";

const SERVICE_ICONS = {
  "ski-pass": Ticket, accommodation: Hotel, equipment: Wrench, "ski-school": GraduationCap,
  dining: Utensils, storage: Lock, activities: Snowflake, childcare: Baby,
  flights: Plane, train: Train, car: Car,
};

const GLOBAL_SERVICES = ["flights", "train", "car"];

function calcNights(start, end) {
  if (!start || !end) return null;
  return Math.round((new Date(end) - new Date(start)) / 86400000);
}

function ItemRow({ item, expandedItem, setExpandedItem, removeFromBasket, navigate, updateBasketItem, onReviewed, reviewed }) {
  const Icon = SERVICE_ICONS[item.serviceKey] || Ticket;
  const isExpanded = expandedItem === item.itemId;
  const isPending = item.status === "pending-confirmation";
  const [localStart, setLocalStart] = useState(item.details?.startDate || null);
  const [localEnd, setLocalEnd] = useState(item.details?.endDate || null);
  const [updated, setUpdated] = useState(false);

  function handleToggle() {
    setExpandedItem(isExpanded ? null : item.itemId);
    if (!reviewed) onReviewed(item.itemId);
  }

  function handleDateChange(start, end) {
    setLocalStart(start);
    setLocalEnd(end);
    if (start && end) {
      const nights = calcNights(start, end);
      const pricePer = item.details?.pricePerNight || (item.priceEUR / (item.details?.nights || 1));
      const newPrice = pricePer * nights;
      updateBasketItem(item.itemId, {
        priceEUR: Math.round(newPrice),
        details: { ...item.details, startDate: start, endDate: end, nights },
        label: item.label.replace(/\d+ nights/, `${nights} nights`),
      });
      setUpdated(true);
      setTimeout(() => setUpdated(false), 1500);
    }
  }

  const price = ((item.priceEUR || 0) * (item.quantity || 1));
  const hasDateDetails = ["accommodation", "ski-pass", "equipment", "ski-school", "flights", "train", "car", "storage"].includes(item.serviceKey);

  return (
    <div className="bg-peak-surface rounded-xl overflow-hidden mb-2">
      <button onClick={handleToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-white/5 cursor-pointer transition-colors text-left">
        <div className="flex items-center gap-3 min-w-0">
          <Icon className="h-4 w-4 text-peak-blue flex-shrink-0" />
          <span className="text-peak-text text-sm font-medium truncate">{item.label}</span>
          {isPending && !reviewed && (
            <span className="flex items-center gap-1 text-amber-400 text-xs flex-shrink-0">
              <TriangleAlert className="h-3 w-3" /> Review needed
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-peak-text font-bold text-sm">{"\u20AC"}{price.toLocaleString()}</span>
          {isExpanded ? <ChevronUp className="h-4 w-4 text-peak-text-secondary" /> : <ChevronDown className="h-4 w-4 text-peak-text-secondary" />}
        </div>
      </button>
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-white/5 pt-3">
          {isPending && (
            <div className="flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 rounded-lg px-3 py-2 mb-3">
              <TriangleAlert className="h-4 w-4 text-amber-400 flex-shrink-0" />
              <p className="text-amber-400 text-xs">Review and confirm the details for this item before checkout</p>
            </div>
          )}
          <div className="text-peak-text-secondary text-xs space-y-1 mb-3">
            {item.details && Object.entries(item.details).filter(([k]) => k !== "startDate" && k !== "endDate").map(([k, v]) => (
              <p key={k}><span className="capitalize">{k.replace(/([A-Z])/g, " $1")}:</span> {String(v)}</p>
            ))}
          </div>
          {hasDateDetails && (
            <div className="mb-3">
              <p className="text-peak-text-secondary text-xs font-semibold mb-2 uppercase tracking-wider">Dates</p>
              <DateRangePicker
                startDate={localStart}
                endDate={localEnd}
                onStartChange={(d) => handleDateChange(d, localEnd)}
                onEndChange={(d) => handleDateChange(localStart, d)}
                context="edit"
                placeholder={{ start: "Check-in / Start", end: "Check-out / End" }}
              />
              {updated && (
                <span className="inline-flex items-center gap-1 text-peak-green text-xs mt-1">
                  <Check className="h-3 w-3" /> Updated
                </span>
              )}
            </div>
          )}
          <div className="flex gap-2">
            <button onClick={() => navigate(`/plan?edit=${item.itemId}`)} className="flex items-center gap-1 px-3 py-1.5 text-xs text-peak-blue border border-peak-blue/30 rounded-lg hover:bg-peak-blue/10 transition-colors">
              <Pencil className="h-3 w-3" /> Edit in planner
            </button>
            <button onClick={() => { removeFromBasket(item.itemId); setExpandedItem(null); }} className="flex items-center gap-1 px-3 py-1.5 text-xs text-peak-red border border-peak-red/30 rounded-lg hover:bg-peak-red/10 transition-colors">
              <X className="h-3 w-3" /> Remove
            </button>
            <button onClick={() => navigate("/plan")} className="flex items-center gap-1 px-3 py-1.5 text-xs text-peak-text-secondary border border-white/10 rounded-lg hover:text-peak-text transition-colors">
              <Plus className="h-3 w-3" /> Add another
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function InputField({ label, field, form, errors, updateForm, type = "text", placeholder }) {
  return (
    <div>
      <label className="text-peak-text text-sm font-medium mb-1.5 block">{label}</label>
      <input type={type} value={form[field]} onChange={(e) => updateForm(field, e.target.value)} placeholder={placeholder}
        className={`w-full bg-peak-surface border rounded-lg px-4 py-3 text-peak-text placeholder:text-peak-text-secondary text-sm outline-none focus:ring-2 focus:ring-peak-blue/50 transition-all ${errors[field] ? "border-peak-red" : "border-white/10 focus:border-peak-blue"}`} />
      {errors[field] && <p className="text-peak-red text-xs mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors[field]}</p>}
    </div>
  );
}

export default function TripSummary() {
  const { session, removeFromBasket, updateBasketItem, getBasketTotal, clearTrip } = useTripPlanner();
  const { user } = useAppAuth();
  const navigate = useNavigate();
  const [expandedItem, setExpandedItem] = useState(null);
  const [reviewedItems, setReviewedItems] = useState(new Set());

  const pendingItems = session?.basket?.filter(item => item.status === "pending-confirmation") || [];
  const allPendingReviewed = pendingItems.every(item => reviewedItems.has(item.itemId));

  const markReviewed = useCallback((itemId) => {
    setReviewedItems(prev => new Set([...prev, itemId]));
  }, []);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", phone: "", nationality: "", emergencyName: "", emergencyPhone: "", requests: "", cardNumber: "", expiry: "", cvv: "", cardName: "" });
  const [errors, setErrors] = useState({});

  useUnsavedTripWarning();

  useEffect(() => {
    if (!session || session.basket.length === 0) {
      navigate("/plan");
    }
  }, [session]);

  if (!session || session.basket.length === 0) return null;

  const total = getBasketTotal();
  const tax = Math.round(total * 0.1);
  const grandTotal = total + tax;

  const sortedResorts = [...session.resorts].sort((a, b) => a.order - b.order);
  const resortItems = {};
  const globalItems = [];

  session.basket.forEach(item => {
    if (item.resortId && !GLOBAL_SERVICES.includes(item.serviceKey)) {
      if (!resortItems[item.resortId]) resortItems[item.resortId] = [];
      resortItems[item.resortId].push(item);
    } else {
      globalItems.push(item);
    }
  });

  function updateForm(key, value) {
    setForm(prev => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: null }));
  }

  function validateCheckout() {
    const errs = {};
    if (checkoutStep === 0) {
      if (!form.name) errs.name = "Required";
      if (!form.email || !form.email.includes("@")) errs.email = "Valid email required";
    }
    if (checkoutStep === 2) {
      if (!form.cardNumber || form.cardNumber.length < 16) errs.cardNumber = "Valid card number required";
      if (!form.expiry) errs.expiry = "Required";
      if (!form.cvv || form.cvv.length < 3) errs.cvv = "Required";
      if (!form.cardName) errs.cardName = "Required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleCompleteBooking() {
    if (!validateCheckout()) return;
    const bookings = session.basket.map((item, i) => ({
      id: `BK-${Date.now()}-${i}`,
      ...item, status: "confirmed",
    }));
    const existingBookings = JSON.parse(localStorage.getItem("peakxp_bookings") || "[]");
    existingBookings.push({
      tripId: session.id,
      destination: session.destination,
      dates: session.dates,
      resorts: session.resorts,
      bookings,
      totalPaid: grandTotal,
      bookedAt: new Date().toISOString(),
    });
    localStorage.setItem("peakxp_bookings", JSON.stringify(existingBookings));
    clearTrip();
    navigate("/plan/confirmed");
  }

  // ── CHECKOUT VIEW ──
  if (showCheckout) {
    return (
      <div className="min-h-screen bg-peak-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <button onClick={() => setShowCheckout(false)} className="flex items-center gap-1.5 text-peak-text-secondary text-sm hover:text-peak-text mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to summary
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-8">
                {["Contact details", "Guest info", "Payment"].map((s, i) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${i <= checkoutStep ? "bg-peak-red text-white" : "bg-peak-surface text-peak-text-secondary border border-white/10"}`}>
                      {i < checkoutStep ? <Check className="h-4 w-4" /> : i + 1}
                    </div>
                    <span className={`text-sm font-medium hidden sm:inline ${i <= checkoutStep ? "text-peak-text" : "text-peak-text-secondary"}`}>{s}</span>
                    {i < 2 && <div className={`w-8 h-0.5 ${i < checkoutStep ? "bg-peak-red" : "bg-white/10"}`} />}
                  </div>
                ))}
              </div>

              {checkoutStep === 0 && (
                <div className="space-y-5">
                  <h2 className="font-display font-bold text-2xl text-peak-text mb-4">Contact details</h2>
                  <InputField label="Full name" field="name" form={form} errors={errors} updateForm={updateForm} placeholder="John Doe" />
                  <InputField label="Email" field="email" form={form} errors={errors} updateForm={updateForm} type="email" placeholder="john@example.com" />
                  <InputField label="Phone" field="phone" form={form} errors={errors} updateForm={updateForm} placeholder="+41 79 123 4567" />
                  <InputField label="Nationality" field="nationality" form={form} errors={errors} updateForm={updateForm} placeholder="Swiss" />
                  <h3 className="text-peak-text font-semibold text-sm pt-4">Emergency contact</h3>
                  <InputField label="Name" field="emergencyName" form={form} errors={errors} updateForm={updateForm} placeholder="Jane Doe" />
                  <InputField label="Phone" field="emergencyPhone" form={form} errors={errors} updateForm={updateForm} placeholder="+41 79 987 6543" />
                  <div>
                    <label className="text-peak-text text-sm font-medium mb-1.5 block">Special requests</label>
                    <textarea value={form.requests} onChange={(e) => updateForm("requests", e.target.value)} placeholder="Any special requests..."
                      className="w-full bg-peak-surface border border-white/10 rounded-lg px-4 py-3 text-peak-text placeholder:text-peak-text-secondary text-sm outline-none focus:border-peak-blue h-24 resize-none" />
                  </div>
                  <button onClick={() => { if (validateCheckout()) setCheckoutStep(1); }} className="w-full py-3 bg-peak-red hover:bg-peak-red-hover text-white font-bold rounded-xl transition-colors">Continue</button>
                </div>
              )}

              {checkoutStep === 1 && (
                <div className="space-y-5">
                  <h2 className="font-display font-bold text-2xl text-peak-text mb-4">Guest information</h2>
                  <p className="text-peak-text-secondary text-sm">Pre-filled from your contact details.</p>
                  {session.basket.map(item => (
                    <div key={item.itemId} className="bg-peak-card border border-white/5 rounded-xl p-4">
                      <p className="text-peak-text text-sm font-medium mb-1">{item.label}</p>
                      <p className="text-peak-text-secondary text-xs">Guest: {form.name || "Lead guest"}</p>
                    </div>
                  ))}
                  <div className="flex gap-3">
                    <button onClick={() => setCheckoutStep(0)} className="px-6 py-3 border border-white/10 text-peak-text-secondary rounded-lg hover:text-peak-text transition-colors">Back</button>
                    <button onClick={() => setCheckoutStep(2)} className="flex-1 py-3 bg-peak-red hover:bg-peak-red-hover text-white font-bold rounded-xl transition-colors">Continue to payment</button>
                  </div>
                </div>
              )}

              {checkoutStep === 2 && (
                <div className="space-y-5">
                  <h2 className="font-display font-bold text-2xl text-peak-text mb-4">Payment</h2>
                  <InputField label="Card number" field="cardNumber" form={form} errors={errors} updateForm={updateForm} placeholder="4242 4242 4242 4242" />
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="Expiry date" field="expiry" form={form} errors={errors} updateForm={updateForm} placeholder="MM/YY" />
                    <InputField label="CVV" field="cvv" form={form} errors={errors} updateForm={updateForm} placeholder="123" />
                  </div>
                  <InputField label="Cardholder name" field="cardName" form={form} errors={errors} updateForm={updateForm} placeholder="John Doe" />
                  <div className="flex flex-wrap gap-4 mt-4 mb-4">
                    {[{ icon: Lock, label: "SSL Secured" }, { icon: Check, label: "Instant confirmation" }, { icon: Clock, label: "Free cancellation" }, { icon: Shield, label: "Price guarantee" }].map(b => (
                      <div key={b.label} className="flex items-center gap-1.5 text-peak-blue text-xs font-medium"><b.icon className="h-3.5 w-3.5" />{b.label}</div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setCheckoutStep(1)} className="px-6 py-3 border border-white/10 text-peak-text-secondary rounded-lg hover:text-peak-text transition-colors">Back</button>
                    <button onClick={handleCompleteBooking} className="flex-1 py-3 bg-peak-red hover:bg-peak-red-hover text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                      <CreditCard className="h-4 w-4" /> {"Complete booking — \u20AC"}{grandTotal.toLocaleString()}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-peak-card border border-white/5 rounded-xl p-6 h-fit lg:sticky lg:top-24">
              <h3 className="font-display font-bold text-peak-text text-lg mb-4">Order summary</h3>
              <div className="space-y-2 text-sm border-b border-white/5 pb-3 mb-3">
                {session.basket.map(item => (
                  <div key={item.itemId} className="flex justify-between">
                    <span className="text-peak-text-secondary truncate mr-2">{item.label}</span>
                    <span className="text-peak-text flex-shrink-0">{"\u20AC"}{((item.priceEUR || 0) * (item.quantity || 1)).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-peak-text-secondary text-sm mb-1"><span>Subtotal</span><span>{"\u20AC"}{total.toLocaleString()}</span></div>
              <div className="flex justify-between text-peak-text-secondary text-sm mb-3"><span>{"Taxes & fees"}</span><span>{"\u20AC"}{tax.toLocaleString()}</span></div>
              <div className="flex justify-between text-peak-text font-bold text-xl pt-3 border-t border-white/5"><span>Total</span><span>{"\u20AC"}{grandTotal.toLocaleString()}</span></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── SUMMARY VIEW ──
  return (
    <div className="min-h-screen bg-peak-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link to="/plan" className="flex items-center gap-1.5 text-peak-text-secondary text-sm hover:text-peak-text mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Continue planning
        </Link>

        <h1 className="font-display font-extrabold text-3xl text-peak-text mb-2">Your trip summary</h1>

        <div className="flex items-center gap-3 text-sm text-peak-text-secondary mb-6 flex-wrap">
          {session.destination && <span>{session.destination.flag} {session.destination.label}</span>}
          {session.dates.start && (
            <>
              <span className="text-white/20">{"\u00B7"}</span>
              <span>
                {new Date(session.dates.start).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                {session.dates.end && ` \u2192 ${new Date(session.dates.end).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}`}
                {session.dates.nights && ` (${session.dates.nights} nights)`}
              </span>
            </>
          )}
        </div>

        <div className="bg-peak-card border border-white/5 rounded-2xl p-6 mb-6">
          <div className="flex flex-wrap gap-4 mb-4">
            {sortedResorts.map(r => (
              <span key={r.resortId} className="bg-peak-surface text-peak-text text-xs font-medium px-3 py-1.5 rounded-full">
                {r.resortFlag} {r.resortName}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {session.selectedServices.map(svc => {
              const Icon = SERVICE_ICONS[svc] || Ticket;
              return <span key={svc} className="flex items-center gap-1 bg-peak-blue/10 text-peak-blue text-xs font-medium px-2 py-1 rounded-full"><Icon className="h-3 w-3" />{svc.replace(/-/g, " ")}</span>;
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {sortedResorts.map(resort => {
              const items = resortItems[resort.resortId] || [];
              if (items.length === 0) return null;
              return (
                <div key={resort.resortId} className="mb-8">
                  <h3 className="font-display font-bold text-peak-text text-xl mb-3 flex items-center gap-2">
                    {resort.resortFlag} {resort.resortName}
                  </h3>
                  {items.map(item => <ItemRow key={item.itemId} item={item} expandedItem={expandedItem} setExpandedItem={setExpandedItem} removeFromBasket={removeFromBasket} navigate={navigate} updateBasketItem={updateBasketItem} onReviewed={markReviewed} reviewed={reviewedItems.has(item.itemId)} />)}
                </div>
              );
            })}

            {globalItems.length > 0 && (
              <div className="mb-8">
                <h3 className="font-display font-bold text-peak-text text-xl mb-3 flex items-center gap-2">
                  <Plane className="h-5 w-5 text-peak-blue" /> Getting there
                </h3>
                {globalItems.map(item => <ItemRow key={item.itemId} item={item} expandedItem={expandedItem} setExpandedItem={setExpandedItem} removeFromBasket={removeFromBasket} navigate={navigate} updateBasketItem={updateBasketItem} onReviewed={markReviewed} reviewed={reviewedItems.has(item.itemId)} />)}
              </div>
            )}
          </div>

          <div className="lg:sticky lg:top-24 bg-peak-card border border-white/5 rounded-2xl p-6 h-fit">
            <h3 className="font-display font-bold text-peak-text text-lg mb-4">Price breakdown</h3>
            <div className="space-y-2 text-sm">
              {session.basket.map(item => (
                <div key={item.itemId} className="flex justify-between">
                  <span className="text-peak-text-secondary truncate mr-2">{item.label}</span>
                  <span className="text-peak-text flex-shrink-0">{"\u20AC"}{((item.priceEUR || 0) * (item.quantity || 1)).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/5 mt-3 pt-3 space-y-1">
              <div className="flex justify-between text-peak-text-secondary text-sm"><span>Subtotal</span><span>{"\u20AC"}{total.toLocaleString()}</span></div>
              <div className="flex justify-between text-peak-text-secondary text-sm"><span>{"Taxes & fees (10%)"}</span><span>{"\u20AC"}{tax.toLocaleString()}</span></div>
            </div>
            <div className="flex justify-between text-peak-text font-bold text-2xl pt-3 border-t border-white/5 mt-3">
              <span>Total</span><span>{"\u20AC"}{grandTotal.toLocaleString()}</span>
            </div>
            <p className="text-peak-text-secondary text-xs mt-1">All prices in EUR. Taxes included.</p>
            <button
              onClick={() => { if (allPendingReviewed) setShowCheckout(true); }}
              disabled={!allPendingReviewed}
              className={`w-full font-bold rounded-xl py-4 text-lg mt-4 transition-colors ${
                allPendingReviewed
                  ? "bg-peak-red hover:bg-peak-red-hover text-white"
                  : "bg-peak-surface text-peak-text-secondary border border-white/10 cursor-not-allowed"
              }`}
            >
              {allPendingReviewed ? "Proceed to checkout" : "Confirm all items to continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}