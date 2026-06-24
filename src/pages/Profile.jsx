import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import UnifiedNav from "../components/shared/UnifiedNav";
import { useAppAuth } from "../context/AppAuthContext";
import { useProfile } from "../context/ProfileContext";
import { getActivities } from "../lib/activityTracking";
import {
  User, CreditCard, Shield, MapPin, Wrench, Plus, AlertTriangle,
  CheckCircle, Navigation, Store, ChevronRight, Trash2, Edit3,
  Eye, EyeOff, Lock, Star, BookOpen, Settings, Heart, Activity
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
const TABS = [
  { id:"overview",    label:"Overview",       icon:User },
  { id:"booking",     label:"Booking info",   icon:BookOpen },
  { id:"payment",     label:"Payment",        icon:CreditCard },
  { id:"gear",        label:"Gear tracker",   icon:Wrench },
  { id:"measurements",label:"Measurements",   icon:Activity },
  { id:"preferences", label:"Preferences",    icon:Settings },
  { id:"privacy",     label:"Privacy",        icon:Shield },
  { id:"saved",       label:"Saved",          icon:Heart },
];

function Field({ label, value }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
      <span className="text-xs text-peak-text-secondary">{label}</span>
      <span className="text-sm text-peak-text font-medium">{value || <span className="text-white/20">Not set</span>}</span>
    </div>
  );
}

function Toggle({ label, desc, checked, onChange }) {
  return (
    <label className="flex items-center justify-between cursor-pointer py-2.5">
      <div>
        <p className="text-sm text-peak-text">{label}</p>
        {desc && <p className="text-xs text-peak-text-secondary mt-0.5">{desc}</p>}
      </div>
      <div onClick={onChange}
        className={`w-10 h-5 rounded-full transition-colors cursor-pointer flex items-center px-0.5 flex-shrink-0 ml-4 ${checked?"bg-peak-red":"bg-white/10"}`}>
        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${checked?"translate-x-5":""}`}/>
      </div>
    </label>
  );
}

function InputRow({ label, value, onChange, type="text", placeholder="", hint="" }) {
  return (
    <div>
      <label className="block text-xs text-peak-text-secondary mb-1.5">{label}</label>
      <input type={type} value={value||""} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
        className="w-full bg-peak-bg border border-white/10 rounded-xl px-3 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue transition-colors"/>
      {hint && <p className="text-xs text-peak-text-secondary mt-1">{hint}</p>}
    </div>
  );
}

function SelectRow({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-xs text-peak-text-secondary mb-1.5">{label}</label>
      <select value={value||""} onChange={e=>onChange(e.target.value)}
        className="w-full bg-peak-bg border border-white/10 rounded-xl px-3 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue">
        <option value="">Select…</option>
        {options.map(([v,l])=><option key={v} value={v}>{l}</option>)}
      </select>
    </div>
  );
}

function SaveBtn({ onClick, saved }) {
  return (
    <button onClick={onClick}
      className="px-6 py-2.5 bg-peak-red hover:bg-red-600 text-white text-sm font-bold rounded-xl transition-colors flex items-center gap-2">
      {saved ? <><CheckCircle className="h-4 w-4"/>Saved!</> : "Save changes"}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BOOKING INFO TAB
// ─────────────────────────────────────────────────────────────────────────────
function BookingInfoTab({ profile, updateProfile }) {
  const [form, setForm] = useState({
    // Personal identification
    firstName:      profile.firstName || "",
    lastName:       profile.lastName || "",
    dateOfBirth:    profile.dateOfBirth || "",
    nationality:    profile.nationality || "",
    passportNumber: profile.passportNumber || "",
    passportExpiry: profile.passportExpiry || "",
    phoneNumber:    profile.phoneNumber || "",
    // Address
    streetAddress:  profile.streetAddress || "",
    city:           profile.city || "",
    postCode:       profile.postCode || "",
    country:        profile.country || "",
    // Emergency contact
    emergencyName:  profile.emergencyName || "",
    emergencyPhone: profile.emergencyPhone || "",
    emergencyRelation: profile.emergencyRelation || "",
    // Travel preferences
    dietaryNeeds:   profile.dietaryNeeds || "",
    medicalNotes:   profile.medicalNotes || "",
    accessibilityNeeds: profile.accessibilityNeeds || "",
    preferredAirport: profile.preferredAirport || "",
    frequentFlyerNumbers: profile.frequentFlyerNumbers || "",
  });
  const [saved, setSaved] = useState(false);
  const set = (k,v) => setForm(p=>({...p,[k]:v}));

  function handleSave() {
    updateProfile(form);
    setSaved(true);
    setTimeout(()=>setSaved(false), 2000);
  }

  const NATIONALITIES = [["AF","Afghan"],["AL","Albanian"],["AT","Austrian"],["AU","Australian"],["BE","Belgian"],["BR","Brazilian"],["CA","Canadian"],["CH","Swiss"],["CN","Chinese"],["CZ","Czech"],["DE","German"],["DK","Danish"],["ES","Spanish"],["FI","Finnish"],["FR","French"],["GB","British"],["GR","Greek"],["HU","Hungarian"],["IE","Irish"],["IL","Israeli"],["IN","Indian"],["IT","Italian"],["JP","Japanese"],["KR","South Korean"],["MX","Mexican"],["NL","Dutch"],["NO","Norwegian"],["NZ","New Zealander"],["PL","Polish"],["PT","Portuguese"],["RO","Romanian"],["RU","Russian"],["SE","Swedish"],["SK","Slovak"],["SL","Slovenian"],["TR","Turkish"],["US","American"],["ZA","South African"]];
  const COUNTRIES = NATIONALITIES.map(([c,n])=>[c,n.replace("n","")+" ("+c+")"]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-bold text-lg text-peak-text mb-1">Booking information</h2>
        <p className="text-peak-text-secondary text-sm">Used by our AI agents to book on your behalf. All data is stored securely and never shared with third parties without your consent.</p>
      </div>

      {/* Personal ID */}
      <div className="bg-peak-surface border border-white/5 rounded-xl p-5 space-y-4">
        <h3 className="font-semibold text-peak-text text-sm flex items-center gap-2"><User className="h-4 w-4 text-peak-blue"/>Personal identification</h3>
        <div className="grid grid-cols-2 gap-4">
          <InputRow label="First name" value={form.firstName} onChange={v=>set("firstName",v)} placeholder="As on passport"/>
          <InputRow label="Last name" value={form.lastName} onChange={v=>set("lastName",v)} placeholder="As on passport"/>
          <InputRow label="Date of birth" value={form.dateOfBirth} onChange={v=>set("dateOfBirth",v)} type="date"/>
          <SelectRow label="Nationality" value={form.nationality} onChange={v=>set("nationality",v)} options={NATIONALITIES}/>
          <InputRow label="Passport / ID number" value={form.passportNumber} onChange={v=>set("passportNumber",v)} placeholder="AB1234567"/>
          <InputRow label="Passport expiry" value={form.passportExpiry} onChange={v=>set("passportExpiry",v)} type="date"/>
          <InputRow label="Phone number" value={form.phoneNumber} onChange={v=>set("phoneNumber",v)} placeholder="+43 123 456 789" type="tel"/>
        </div>
      </div>

      {/* Home address */}
      <div className="bg-peak-surface border border-white/5 rounded-xl p-5 space-y-4">
        <h3 className="font-semibold text-peak-text text-sm flex items-center gap-2"><MapPin className="h-4 w-4 text-peak-blue"/>Home address</h3>
        <InputRow label="Street address" value={form.streetAddress} onChange={v=>set("streetAddress",v)} placeholder="123 Mountain Street"/>
        <div className="grid grid-cols-2 gap-4">
          <InputRow label="City" value={form.city} onChange={v=>set("city",v)} placeholder="Vienna"/>
          <InputRow label="Post code" value={form.postCode} onChange={v=>set("postCode",v)} placeholder="1010"/>
          <SelectRow label="Country" value={form.country} onChange={v=>set("country",v)} options={COUNTRIES}/>
          <InputRow label="Preferred departure airport" value={form.preferredAirport} onChange={v=>set("preferredAirport",v)} placeholder="VIE"/>
        </div>
        <InputRow label="Frequent flyer numbers" value={form.frequentFlyerNumbers} onChange={v=>set("frequentFlyerNumbers",v)} placeholder="Austrian: OS12345, Lufthansa: LH67890" hint="Separate multiple with commas"/>
      </div>

      {/* Emergency contact */}
      <div className="bg-peak-surface border border-white/5 rounded-xl p-5 space-y-4">
        <h3 className="font-semibold text-peak-text text-sm flex items-center gap-2"><Shield className="h-4 w-4 text-peak-red"/>Emergency contact</h3>
        <div className="grid grid-cols-2 gap-4">
          <InputRow label="Full name" value={form.emergencyName} onChange={v=>set("emergencyName",v)} placeholder="Jane Doe"/>
          <InputRow label="Relationship" value={form.emergencyRelation} onChange={v=>set("emergencyRelation",v)} placeholder="Partner, Parent…"/>
          <InputRow label="Phone number" value={form.emergencyPhone} onChange={v=>set("emergencyPhone",v)} placeholder="+43 123 456 789" type="tel"/>
        </div>
      </div>

      {/* Travel notes */}
      <div className="bg-peak-surface border border-white/5 rounded-xl p-5 space-y-4">
        <h3 className="font-semibold text-peak-text text-sm flex items-center gap-2"><BookOpen className="h-4 w-4 text-peak-blue"/>Travel notes</h3>
        <div>
          <label className="block text-xs text-peak-text-secondary mb-1.5">Dietary requirements</label>
          <input value={form.dietaryNeeds} onChange={e=>set("dietaryNeeds",e.target.value)} placeholder="Vegetarian, gluten-free, nut allergy…"
            className="w-full bg-peak-bg border border-white/10 rounded-xl px-3 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue"/>
        </div>
        <div>
          <label className="block text-xs text-peak-text-secondary mb-1.5">Medical notes (for ski school / guides)</label>
          <textarea value={form.medicalNotes} onChange={e=>set("medicalNotes",e.target.value)} rows={2}
            placeholder="Previous knee injury, asthma inhaler required…"
            className="w-full bg-peak-bg border border-white/10 rounded-xl px-3 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue resize-none"/>
        </div>
        <div>
          <label className="block text-xs text-peak-text-secondary mb-1.5">Accessibility needs</label>
          <input value={form.accessibilityNeeds} onChange={e=>set("accessibilityNeeds",e.target.value)} placeholder="Wheelchair access, visual impairment…"
            className="w-full bg-peak-bg border border-white/10 rounded-xl px-3 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue"/>
        </div>
      </div>

      <SaveBtn onClick={handleSave} saved={saved}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAYMENT TAB
// ─────────────────────────────────────────────────────────────────────────────
function PaymentTab({ profile, updateProfile }) {
  const [cards, setCards] = useState(() => {
    try { return JSON.parse(localStorage.getItem("peakxp_payment_methods")||"[]"); } catch { return []; }
  });
  const [showAdd, setShowAdd] = useState(false);
  const [cardForm, setCardForm] = useState({ label:"", last4:"", expiry:"", type:"visa" });
  const [showNumber, setShowNumber] = useState({});
  const [billingForm, setBillingForm] = useState({
    billingName: profile.billingName||"",
    billingAddress: profile.billingAddress||profile.streetAddress||"",
    billingCity: profile.billingCity||profile.city||"",
    billingPostCode: profile.billingPostCode||profile.postCode||"",
    billingCountry: profile.billingCountry||profile.country||"",
  });
  const [saved, setSaved] = useState(false);
  const setB = (k,v) => setBillingForm(p=>({...p,[k]:v}));
  const setC = (k,v) => setCardForm(p=>({...p,[k]:v}));

  function saveCard() {
    if (!cardForm.last4 || cardForm.last4.length < 4) return;
    const newCards = [...cards, {
      id: `card_${Date.now()}`,
      label: cardForm.label || `${cardForm.type.toUpperCase()} ending ${cardForm.last4.slice(-4)}`,
      last4: cardForm.last4.slice(-4),
      expiry: cardForm.expiry,
      type: cardForm.type,
      token: `tok_mock_${Date.now()}`, // Stripe-ready token placeholder
      isDefault: cards.length === 0,
    }];
    setCards(newCards);
    localStorage.setItem("peakxp_payment_methods", JSON.stringify(newCards));
    setShowAdd(false);
    setCardForm({ label:"", last4:"", expiry:"", type:"visa" });
  }

  function removeCard(id) {
    const updated = cards.filter(c=>c.id!==id);
    setCards(updated);
    localStorage.setItem("peakxp_payment_methods", JSON.stringify(updated));
  }

  function setDefault(id) {
    const updated = cards.map(c=>({...c, isDefault:c.id===id}));
    setCards(updated);
    localStorage.setItem("peakxp_payment_methods", JSON.stringify(updated));
  }

  function saveBilling() {
    updateProfile(billingForm);
    setSaved(true);
    setTimeout(()=>setSaved(false),2000);
  }

  const CARD_ICONS = { visa:"💳", mastercard:"💳", amex:"💳", other:"💳" };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-bold text-lg text-peak-text mb-1">Payment methods</h2>
        <p className="text-peak-text-secondary text-sm">Securely stored for AI agent bookings. Card numbers are never stored — only the last 4 digits and a secure payment token.</p>
      </div>

      {/* Security notice */}
      <div className="flex items-start gap-3 bg-peak-blue/8 border border-peak-blue/20 rounded-xl p-4">
        <Lock className="h-5 w-5 text-peak-blue flex-shrink-0 mt-0.5"/>
        <div>
          <p className="text-peak-text text-sm font-semibold">PCI-DSS compliant storage</p>
          <p className="text-peak-text-secondary text-xs mt-0.5">Full card numbers are processed by our payment partner (Stripe) and never stored on PeakXP servers. We store only the last 4 digits and a secure token reference.</p>
        </div>
      </div>

      {/* Saved cards */}
      <div className="space-y-3">
        {cards.map(card => (
          <div key={card.id} className={`bg-peak-surface border rounded-xl p-4 flex items-center gap-4 ${card.isDefault?"border-peak-blue/30":"border-white/5"}`}>
            <div className="w-12 h-8 bg-gradient-to-br from-white/10 to-white/5 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
              {CARD_ICONS[card.type]||"💳"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-peak-text text-sm font-semibold">{card.label}</p>
              <p className="text-peak-text-secondary text-xs">
                •••• •••• •••• {card.last4} · Expires {card.expiry}
                {card.isDefault && <span className="ml-2 text-peak-blue font-semibold">Default</span>}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {!card.isDefault && (
                <button onClick={()=>setDefault(card.id)}
                  className="text-xs text-peak-text-secondary hover:text-peak-blue transition-colors">Set default</button>
              )}
              <button onClick={()=>removeCard(card.id)}
                className="text-peak-text-secondary hover:text-peak-red transition-colors">
                <Trash2 className="h-4 w-4"/>
              </button>
            </div>
          </div>
        ))}

        {cards.length === 0 && (
          <div className="text-center py-8 text-peak-text-secondary text-sm">No payment methods saved yet.</div>
        )}
      </div>

      {/* Add card */}
      {!showAdd ? (
        <button onClick={()=>setShowAdd(true)}
          className="w-full border border-dashed border-white/15 hover:border-white/25 rounded-xl py-3 text-peak-text-secondary hover:text-peak-text text-sm font-medium flex items-center justify-center gap-2 transition-colors">
          <Plus className="h-4 w-4"/> Add payment method
        </button>
      ) : (
        <div className="bg-peak-surface border border-white/10 rounded-xl p-5 space-y-4">
          <h3 className="text-peak-text font-semibold text-sm">Add card</h3>
          <div className="grid grid-cols-2 gap-4">
            <SelectRow label="Card type" value={cardForm.type} onChange={v=>setC("type",v)}
              options={[["visa","Visa"],["mastercard","Mastercard"],["amex","Amex"],["other","Other"]]}/>
            <InputRow label="Nickname (optional)" value={cardForm.label} onChange={v=>setC("label",v)} placeholder="e.g. Personal Visa"/>
          </div>
          <div className="bg-peak-bg border border-white/10 rounded-xl p-4">
            <p className="text-peak-text-secondary text-xs mb-3 flex items-center gap-1.5"><Lock className="h-3 w-3"/>Card details (processed by Stripe — not stored by PeakXP)</p>
            <div className="grid grid-cols-2 gap-4">
              <InputRow label="Last 4 digits" value={cardForm.last4} onChange={v=>setC("last4",v.slice(-4))} placeholder="1234" hint="We only store last 4 digits for display"/>
              <InputRow label="Expiry (MM/YY)" value={cardForm.expiry} onChange={v=>setC("expiry",v)} placeholder="12/27"/>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={()=>setShowAdd(false)} className="flex-shrink-0 border border-white/10 text-peak-text-secondary px-4 py-2.5 rounded-xl text-sm hover:text-peak-text transition-colors">Cancel</button>
            <button onClick={saveCard} disabled={cardForm.last4.length<4}
              className="flex-1 bg-peak-red text-white py-2.5 rounded-xl text-sm font-bold disabled:opacity-40 transition-colors">
              Save card
            </button>
          </div>
        </div>
      )}

      {/* Billing address */}
      <div className="bg-peak-surface border border-white/5 rounded-xl p-5 space-y-4">
        <h3 className="font-semibold text-peak-text text-sm">Billing address</h3>
        <InputRow label="Full name on card" value={billingForm.billingName} onChange={v=>setB("billingName",v)} placeholder="Max Mustermann"/>
        <InputRow label="Street address" value={billingForm.billingAddress} onChange={v=>setB("billingAddress",v)}/>
        <div className="grid grid-cols-2 gap-4">
          <InputRow label="City" value={billingForm.billingCity} onChange={v=>setB("billingCity",v)}/>
          <InputRow label="Post code" value={billingForm.billingPostCode} onChange={v=>setB("billingPostCode",v)}/>
        </div>
        <InputRow label="Country" value={billingForm.billingCountry} onChange={v=>setB("billingCountry",v)}/>
      </div>
      <SaveBtn onClick={saveBilling} saved={saved}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GEAR TRACKER TAB
// ─────────────────────────────────────────────────────────────────────────────
const GEAR_TYPES = [
  { id:"skis",       label:"Skis",          icon:"🎿", services:[{ id:"edge",  label:"Edge & wax",      intervalDays:20, hint:"Recommended every 20 ski days" },{ id:"full",  label:"Full service",    intervalDays:50, hint:"Base grind + edges every 50 days" }] },
  { id:"snowboard",  label:"Snowboard",     icon:"🏂", services:[{ id:"wax",   label:"Wax",             intervalDays:10, hint:"Every 10 days" },{ id:"tune",  label:"Full tune",       intervalDays:40, hint:"Edges & base every 40 days" }] },
  { id:"boots",      label:"Ski boots",     icon:"👢", services:[{ id:"buckle",label:"Buckle check",    intervalDays:30, hint:"Check and replace buckles annually" },{ id:"footbed",label:"Custom footbed",  intervalDays:200, hint:"Every 2-3 seasons" }] },
  { id:"bindings",   label:"Bindings",      icon:"🔩", services:[{ id:"check", label:"Safety check",    intervalDays:30, hint:"Annual DIN check required for safety" }] },
  { id:"helmet",     label:"Helmet",        icon:"⛑️", services:[{ id:"replace",label:"Replace",        intervalDays:365*3, hint:"Replace every 3 seasons or after any impact" }] },
  { id:"goggles",    label:"Goggles",       icon:"🥽", services:[{ id:"lens",  label:"Lens check",      intervalDays:60, hint:"Check for scratches and seal integrity" }] },
  { id:"outerwear",  label:"Jacket / pants",icon:"🧥", services:[{ id:"reproof",label:"Re-proof DWR",   intervalDays:20, hint:"Re-apply waterproofing treatment every 20 days" }] },
  { id:"poles",      label:"Poles",         icon:"🪄", services:[{ id:"grip",  label:"Grip & strap check",intervalDays:50, hint:"Check grips and wrist straps annually" }] },
];

const SERVICE_COLORS = {
  ok:      { bg:"#22c55e", text:"#ffffff", label:"Good to go" },
  soon:    { bg:"#F59E0B", text:"#000000", label:"Service soon" },
  overdue: { bg:"#FB343D", text:"#ffffff", label:"Overdue" },
};

function serviceStatus(daysUsed, intervalDays) {
  const pct = daysUsed / intervalDays;
  if (pct >= 1) return "overdue";
  if (pct >= 0.8) return "soon";
  return "ok";
}

function GearCard({ item, activities, onEdit, onDelete }) {
  const gearType = GEAR_TYPES.find(g => g.id === item.type);
  const [expanded, setExpanded] = useState(false);

  // Count verified activities that include this gear item
  const linkedActivities = activities.filter(a =>
    (a.gearIds || []).includes(item.id)
  );
  const daysUsed = linkedActivities.length;

  return (
    <div className="bg-peak-surface border border-white/5 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl flex-shrink-0">
          {gearType?.icon || "📦"}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-peak-text font-semibold text-sm">{item.name}</p>
          <p className="text-peak-text-secondary text-xs">{item.brand} · {item.size} · Added {item.addedAt}</p>
          <p className="text-peak-text-secondary text-xs mt-0.5">{daysUsed} days used</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button onClick={e=>{e.stopPropagation();onEdit(item)}} className="text-peak-text-secondary hover:text-peak-blue p-1 transition-colors">
            <Edit3 className="h-3.5 w-3.5"/>
          </button>
          <button onClick={e=>{e.stopPropagation();onDelete(item.id)}} className="text-peak-text-secondary hover:text-peak-red p-1 transition-colors">
            <Trash2 className="h-3.5 w-3.5"/>
          </button>
          <ChevronRight className={`h-4 w-4 text-peak-text-secondary transition-transform ${expanded?"rotate-90":""}`}/>
        </div>
      </div>

      {/* Service bars */}
      {expanded && gearType && (
        <div className="px-4 pb-4 space-y-4 border-t border-white/5 pt-4">
          {gearType.services.map(svc => {
            const lastService = (item.serviceLog||[]).find(s=>s.serviceId===svc.id);
            const daysSinceService = lastService
              ? Math.floor((Date.now()-new Date(lastService.date))/86400000)
              : daysUsed;
            const effectiveDays = Math.min(daysSinceService, svc.intervalDays);
            const pct = Math.min(100, Math.round((effectiveDays/svc.intervalDays)*100));
            const status = serviceStatus(effectiveDays, svc.intervalDays);
            const sc = SERVICE_COLORS[status];

            return (
              <div key={svc.id}>
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-peak-text text-xs font-semibold">{svc.label}</p>
                  <span style={{background:sc.bg,color:sc.text,fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:100}}>
                    {sc.label}
                  </span>
                </div>
                <div className="h-2 bg-white/8 rounded-full overflow-hidden mb-1">
                  <div className="h-full rounded-full transition-all"
                    style={{
                      width:`${pct}%`,
                      background: status==="ok" ? "linear-gradient(to right,#22c55e,#4ade80)"
                                : status==="soon" ? "linear-gradient(to right,#F59E0B,#FBBF24)"
                                : "linear-gradient(to right,#FB343D,#f87171)",
                    }}/>
                </div>
                <div className="flex justify-between text-xs text-peak-text-secondary">
                  <span>{svc.hint}</span>
                  <span>{effectiveDays}/{svc.intervalDays} days</span>
                </div>
                {lastService && (
                  <p className="text-xs text-peak-text-secondary mt-0.5">Last serviced: {lastService.date} at {lastService.shop}</p>
                )}
                {(status==="soon"||status==="overdue") && (
                  <button onClick={()=>{
                    const log = { serviceId:svc.id, date:new Date().toISOString().split("T")[0], shop:"Manual log" };
                    // Log service — would update item in real backend
                  }} className="mt-2 text-xs text-peak-blue hover:underline">+ Log service done</button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function NearbyShopsFinder({ homeCity, homeCountry }) {
  const [useGPS, setUseGPS] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsLocation, setGpsLocation] = useState(null);
  const [gpsError, setGpsError] = useState("");

  // Mock nearby shops — in real version: Places API call with coords
  const MOCK_SHOPS = [
    { name:"Sport 2000 Mountain", address:"Hauptstraße 12, München", distance:"2.1 km", rating:4.6, services:["Ski service","Binding check","Waxing","Rental"] },
    { name:"Intersport Schweiger", address:"Maximilianstr. 34, München", distance:"3.4 km", rating:4.8, services:["Full tune","Custom boot fitting","Ski rental"] },
    { name:"Ski & Snow Center", address:"Leopoldstr. 89, München", distance:"5.2 km", rating:4.4, services:["Waxing","Sharpening","Repair"] },
  ];

  function getGPS() {
    if (!navigator.geolocation) { setGpsError("GPS not available on this device"); return; }
    setGpsLoading(true); setGpsError("");
    navigator.geolocation.getCurrentPosition(
      pos => { setGpsLocation({ lat:pos.coords.latitude, lon:pos.coords.longitude }); setGpsLoading(false); setUseGPS(true); },
      () => { setGpsError("Location access denied. Using home address."); setGpsLoading(false); }
    );
  }

  return (
    <div className="bg-peak-surface border border-white/5 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-peak-text text-sm flex items-center gap-2">
          <Store className="h-4 w-4 text-peak-blue"/>Nearby ski shops
        </h3>
        <div className="flex items-center gap-2">
          {!useGPS ? (
            <button onClick={getGPS} disabled={gpsLoading}
              className="flex items-center gap-1.5 text-xs text-peak-blue hover:underline disabled:opacity-50">
              <Navigation className="h-3 w-3"/>
              {gpsLoading ? "Locating…" : "Use GPS for precise results"}
            </button>
          ) : (
            <button onClick={()=>{setUseGPS(false);setGpsLocation(null);}}
              className="flex items-center gap-1.5 text-xs text-peak-text-secondary hover:text-peak-text">
              <MapPin className="h-3 w-3"/> Using GPS · Switch to home
            </button>
          )}
        </div>
      </div>

      {gpsError && <p className="text-peak-red text-xs mb-3">{gpsError}</p>}

      <p className="text-peak-text-secondary text-xs mb-4">
        {useGPS && gpsLocation
          ? `📍 Showing shops near your GPS location`
          : `🏠 Showing shops near ${homeCity||"your home address"}${!homeCity?" — add your city in Booking Info":""}`}
      </p>

      <div className="space-y-3">
        {MOCK_SHOPS.map((shop,i) => (
          <div key={i} className="flex items-start gap-3 p-3 bg-peak-card rounded-xl">
            <div className="w-9 h-9 rounded-lg bg-peak-blue/10 flex items-center justify-center flex-shrink-0">
              <Store className="h-4 w-4 text-peak-blue"/>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <p className="text-peak-text text-sm font-semibold">{shop.name}</p>
                <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                  <Star className="h-3 w-3 text-yellow-400 fill-yellow-400"/>
                  <span className="text-peak-text-secondary text-xs">{shop.rating}</span>
                </div>
              </div>
              <p className="text-peak-text-secondary text-xs mt-0.5">{shop.address} · {shop.distance}</p>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {shop.services.map(s=>(
                  <span key={s} className="text-xs bg-white/5 border border-white/8 text-peak-text-secondary px-2 py-0.5 rounded-full">{s}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-peak-text-secondary text-xs mt-3 text-center">Shop suggestions based on location · Powered by PeakXP partner network</p>
    </div>
  );
}

function GearTrackerTab({ profile, user }) {
  const [gear, setGear] = useState(() => {
    try { return JSON.parse(localStorage.getItem(`peakxp_gear:${user?.id||"guest"}`)||"[]"); } catch { return []; }
  });
  const [showAdd, setShowAdd] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const activities = getActivities(user?.id||"guest");

  const [form, setForm] = useState({ name:"", type:"skis", brand:"", size:"", purchaseDate:"", purchasePrice:"", notes:"" });
  const setF = (k,v) => setForm(p=>({...p,[k]:v}));

  function saveGear() {
    const item = editItem
      ? { ...editItem, ...form }
      : { id:`gear_${Date.now()}`, ...form, addedAt:new Date().toISOString().split("T")[0], serviceLog:[] };
    const updated = editItem
      ? gear.map(g=>g.id===editItem.id?item:g)
      : [item,...gear];
    setGear(updated);
    localStorage.setItem(`peakxp_gear:${user?.id||"guest"}`, JSON.stringify(updated));
    setShowAdd(false); setEditItem(null);
    setForm({ name:"", type:"skis", brand:"", size:"", purchaseDate:"", purchasePrice:"", notes:"" });
  }

  function deleteGear(id) {
    const updated = gear.filter(g=>g.id!==id);
    setGear(updated);
    localStorage.setItem(`peakxp_gear:${user?.id||"guest"}`, JSON.stringify(updated));
  }

  function startEdit(item) {
    setEditItem(item);
    setForm({ name:item.name, type:item.type, brand:item.brand||"", size:item.size||"", purchaseDate:item.purchaseDate||"", purchasePrice:item.purchasePrice||"", notes:item.notes||"" });
    setShowAdd(true);
  }

  // Summary: how many items need attention
  const needsAttention = gear.filter(item => {
    const gearType = GEAR_TYPES.find(g=>g.id===item.type);
    if (!gearType) return false;
    const daysUsed = activities.filter(a=>(a.gearIds||[]).includes(item.id)).length;
    return gearType.services.some(svc => serviceStatus(daysUsed, svc.intervalDays) !== "ok");
  }).length;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-display font-bold text-lg text-peak-text mb-1">Gear tracker</h2>
          <p className="text-peak-text-secondary text-sm">Track your equipment wear and get reminded when it's time for a service.</p>
        </div>
        <button onClick={()=>{setEditItem(null);setShowAdd(true);}}
          className="flex items-center gap-1.5 bg-peak-red text-white px-4 py-2 rounded-xl text-sm font-semibold flex-shrink-0">
          <Plus className="h-4 w-4"/>Add gear
        </button>
      </div>

      {/* Summary */}
      {gear.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-peak-surface border border-white/5 rounded-xl p-3 text-center">
            <p className="text-peak-text font-bold text-xl">{gear.length}</p>
            <p className="text-peak-text-secondary text-xs">Items tracked</p>
          </div>
          <div className={`border rounded-xl p-3 text-center ${needsAttention>0?"bg-peak-red/8 border-peak-red/25":"bg-peak-surface border-white/5"}`}>
            <p className={`font-bold text-xl ${needsAttention>0?"text-peak-red":"text-peak-text"}`}>{needsAttention}</p>
            <p className="text-peak-text-secondary text-xs">Need attention</p>
          </div>
          <div className="bg-peak-surface border border-white/5 rounded-xl p-3 text-center">
            <p className="text-peak-text font-bold text-xl">{activities.length}</p>
            <p className="text-peak-text-secondary text-xs">Days logged</p>
          </div>
        </div>
      )}

      {/* Add / edit form */}
      {showAdd && (
        <div className="bg-peak-surface border border-white/10 rounded-2xl p-5 space-y-4">
          <h3 className="font-semibold text-peak-text text-sm">{editItem?"Edit gear":"Add new gear"}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <InputRow label="Name" value={form.name} onChange={v=>setF("name",v)} placeholder="e.g. My race skis"/>
            </div>
            <SelectRow label="Type" value={form.type} onChange={v=>setF("type",v)}
              options={GEAR_TYPES.map(g=>[g.id,`${g.icon} ${g.label}`])}/>
            <InputRow label="Brand" value={form.brand} onChange={v=>setF("brand",v)} placeholder="Atomic, Salomon…"/>
            <InputRow label="Size / spec" value={form.size} onChange={v=>setF("size",v)} placeholder="175cm, 26.0, L…"/>
            <InputRow label="Purchase date" value={form.purchaseDate} onChange={v=>setF("purchaseDate",v)} type="date"/>
            <InputRow label="Purchase price (€)" value={form.purchasePrice} onChange={v=>setF("purchasePrice",v)} type="number" placeholder="0"/>
            <div className="col-span-2">
              <label className="block text-xs text-peak-text-secondary mb-1.5">Notes</label>
              <textarea value={form.notes} onChange={e=>setF("notes",e.target.value)} rows={2} placeholder="Any notes about this item…"
                className="w-full bg-peak-bg border border-white/10 rounded-xl px-3 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue resize-none"/>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={()=>{setShowAdd(false);setEditItem(null);}}
              className="border border-white/10 text-peak-text-secondary px-5 py-2.5 rounded-xl text-sm hover:text-peak-text transition-colors">
              Cancel
            </button>
            <button onClick={saveGear} disabled={!form.name}
              className="flex-1 bg-peak-red text-white py-2.5 rounded-xl text-sm font-bold disabled:opacity-40">
              {editItem?"Save changes":"Add to tracker"}
            </button>
          </div>
        </div>
      )}

      {/* Gear list */}
      {gear.length === 0 ? (
        <div className="text-center py-12">
          <Wrench className="h-10 w-10 text-peak-text-secondary mx-auto mb-3"/>
          <p className="text-peak-text font-semibold mb-1">No gear tracked yet</p>
          <p className="text-peak-text-secondary text-sm">Add your skis, boots, jacket and other equipment to start tracking wear.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {gear.map(item => (
            <GearCard key={item.id} item={item} activities={activities} onEdit={startEdit} onDelete={deleteGear}/>
          ))}
        </div>
      )}

      {/* How it works */}
      <div className="bg-peak-surface border border-white/5 rounded-xl p-4">
        <p className="text-peak-text font-semibold text-sm mb-2">How gear tracking works</p>
        <ul className="space-y-1.5 text-peak-text-secondary text-xs">
          <li>• Add your gear items with purchase date</li>
          <li>• Link gear to your GPX-imported activities in the Activity tab</li>
          <li>• Service counters update automatically based on linked activity days</li>
          <li>• Progress bars turn amber (80%) then red (100%) as service interval approaches</li>
          <li>• Shop suggestions update based on your home or GPS location</li>
        </ul>
      </div>

      {/* Nearby shops */}
      <NearbyShopsFinder homeCity={profile?.city||profile?.homeCity} homeCountry={profile?.country||profile?.homeCountry}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PROFILE PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function Profile() {
  const { isLoggedIn, user, logout } = useAppAuth();
  const { profile, updateProfile } = useProfile();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const tabBarRef = useRef(null);

  function handleTabChange(id) {
    setActiveTab(id);
    if (tabBarRef.current) {
      const top = tabBarRef.current.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }
  }
  const [deleteEmail, setDeleteEmail] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [measurements, setMeasurements] = useState({ ...profile });
  const [measSaved, setMeasSaved] = useState(false);

  if (!isLoggedIn) {
    navigate("/");
    return null;
  }

  const initials = user ? `${user.firstName?.[0]||""}${user.lastName?.[0]||""}`.toUpperCase() : "?";
  const activities = getActivities(user?.id||"guest");
  const stats = [
    { label:"Days on mountain", value:activities.length||0 },
    { label:"Resorts visited",  value:new Set(activities.filter(a=>a.resortId).map(a=>a.resortId)).size||0 },
    { label:"Lifetime vertical", value:activities.length?`${(activities.reduce((s,a)=>s+(a.verticalM||0),0)/1000).toFixed(0)}km`:"0km" },
    { label:"Activities logged", value:activities.length||0 },
  ];

  function saveMeasurements() {
    updateProfile(measurements);
    setMeasSaved(true);
    setTimeout(()=>setMeasSaved(false),2000);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <UnifiedNav customCrumbs={[{ label: "Profile", to: "/profile" }]} showBack={true} />

      {/* Profile header */}
      <div className="bg-peak-card border border-white/5 rounded-2xl p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="flex flex-col items-center gap-2">
            <div className="w-24 h-24 rounded-2xl bg-peak-red flex items-center justify-center flex-shrink-0">
              {user?.avatar
                ? <img src={user.avatar} alt="" className="w-full h-full object-cover rounded-2xl"/>
                : <span className="font-display font-bold text-white text-3xl">{initials}</span>}
            </div>
            <button onClick={()=>alert("Photo upload coming soon")} className="text-xs text-peak-blue hover:underline">Change photo</button>
          </div>
          <div className="flex-1">
            <h1 className="font-display font-extrabold text-3xl text-peak-text">{user?.firstName} {user?.lastName}</h1>
            <p className="text-peak-text-secondary text-sm">{user?.email}</p>
            <p className="text-peak-text-secondary text-xs mt-1">
              Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-GB",{month:"long",year:"numeric"}) : "—"}
            </p>
          </div>
          <Link to="/profile/settings" className="px-4 py-2 bg-peak-surface text-peak-text-secondary hover:text-peak-text text-sm rounded-xl transition-colors">Settings</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
          {stats.map(s => (
            <div key={s.label} className="bg-peak-surface rounded-xl p-3 text-center">
              <p className="font-display font-bold text-peak-text text-xl">{s.value}</p>
              <p className="text-peak-text-secondary text-xs">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div ref={tabBarRef} className="flex gap-1 overflow-x-auto pb-1 mb-6 -mx-4 px-4">
        {TABS.map(tab => {
          const Icon = tab.icon;
          return (
            <button key={tab.id} onClick={()=>handleTabChange(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors flex-shrink-0 ${activeTab===tab.id?"bg-white/10 text-peak-text":"text-peak-text-secondary hover:text-peak-text"}`}>
              <Icon className="h-3.5 w-3.5"/>{tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="bg-peak-card border border-white/5 rounded-2xl p-6">

        {activeTab === "overview" && (
          <div className="space-y-4">
            {[
              { title:"Personal", tab:"booking",  fields:[["Name",`${profile.firstName||user?.firstName||""} ${profile.lastName||user?.lastName||""}`],["Date of birth",profile.dateOfBirth],["Nationality",profile.nationality],["Phone",profile.phoneNumber]] },
              { title:"Home address", tab:"booking", fields:[["Address",profile.streetAddress],["City",profile.city],["Country",profile.country]] },
              { title:"Travel", tab:"booking",    fields:[["Passport",profile.passportNumber?`•••• ${profile.passportNumber.slice(-4)}`:null],["Preferred airport",profile.preferredAirport],["FF numbers",profile.frequentFlyerNumbers]] },
              { title:"Payment", tab:"payment",   fields:[["Cards saved",(() => { try { const c=JSON.parse(localStorage.getItem("peakxp_payment_methods")||"[]"); return c.length?`${c.length} card${c.length>1?"s":""} saved`:"None"; } catch { return "None"; } })()]] },
              { title:"Emergency", tab:"booking", fields:[["Contact",profile.emergencyName],["Phone",profile.emergencyPhone],["Relation",profile.emergencyRelation]] },
            ].map(({ title, tab, fields }) => (
              <div key={title} className="bg-peak-surface rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-peak-text text-sm">{title}</h3>
                  <button onClick={()=>setActiveTab(tab)} className="text-xs text-peak-blue hover:underline">Edit</button>
                </div>
                {fields.map(([l,v]) => <Field key={l} label={l} value={v}/>)}
              </div>
            ))}
          </div>
        )}

        {activeTab === "booking" && <BookingInfoTab profile={profile} updateProfile={updateProfile}/>}
        {activeTab === "payment" && <PaymentTab profile={profile} updateProfile={updateProfile}/>}
        {activeTab === "gear" && <GearTrackerTab profile={profile} user={user}/>}

        {activeTab === "measurements" && (
          <div className="space-y-4">
            <h2 className="font-display font-bold text-lg text-peak-text">Physical measurements</h2>
            <p className="text-peak-text-secondary text-sm">Used by AI agents for equipment rental recommendations.</p>
            <div className="grid grid-cols-2 gap-4">
              {[{k:"height",l:"Height (cm)"},{k:"weight",l:"Weight (kg)"},{k:"shoeSize",l:"Shoe size (EU)"},{k:"skiingLevel",l:"Skiing level"}].map(({k,l}) => (
                k==="skiingLevel" ? (
                  <SelectRow key={k} label={l} value={measurements[k]||""} onChange={v=>setMeasurements(m=>({...m,[k]:v}))}
                    options={[["beginner","Beginner"],["intermediate","Intermediate"],["advanced","Advanced"],["expert","Expert"]]}/>
                ) : (
                  <div key={k}>
                    <label className="block text-xs text-peak-text-secondary mb-1.5">{l}</label>
                    <input type="number" value={measurements[k]||""} onChange={e=>setMeasurements(m=>({...m,[k]:e.target.value}))}
                      className="w-full bg-peak-bg border border-white/10 rounded-xl px-3 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue"/>
                  </div>
                )
              ))}
            </div>
            <SaveBtn onClick={saveMeasurements} saved={measSaved}/>
          </div>
        )}

        {activeTab === "preferences" && (
          <div className="space-y-4">
            <h2 className="font-display font-bold text-lg text-peak-text">App preferences</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                {k:"language",l:"Language",options:[["en","English"],["de","Deutsch"],["fr","Français"],["it","Italiano"]]},
                {k:"currency",l:"Currency",options:[["EUR","EUR €"],["USD","USD $"],["CHF","CHF"],["GBP","GBP £"]]},
              ].map(({k,l,options}) => (
                <SelectRow key={k} label={l} value={profile[k]} onChange={v=>updateProfile({[k]:v})} options={options}/>
              ))}
            </div>
            <div className="space-y-1 pt-2">
              <h3 className="text-sm font-semibold text-peak-text mb-2">Notifications</h3>
              {Object.keys(profile.notifications||{}).map(key => (
                <Toggle key={key} label={key.replace(/([A-Z])/g," $1").trim()} checked={profile.notifications[key]}
                  onChange={()=>updateProfile({notifications:{...profile.notifications,[key]:!profile.notifications[key]}})}/>
              ))}
            </div>
          </div>
        )}

        {activeTab === "privacy" && (
          <div className="space-y-3">
            <h2 className="font-display font-bold text-lg text-peak-text">Privacy</h2>
            <Toggle label="Show activity in community feed" checked={profile.showActivityFeed} onChange={()=>updateProfile({showActivityFeed:!profile.showActivityFeed})}/>
            <Toggle label="Show stats publicly" checked={profile.showStats} onChange={()=>updateProfile({showStats:!profile.showStats})}/>
            <Toggle label="Allow friends to give me badges" checked={profile.allowBadges!==false} onChange={()=>updateProfile({allowBadges:profile.allowBadges===false})}/>
            <Toggle label="Allow AI agents to book on my behalf" desc="Required for agent booking features" checked={profile.agentBookingConsent!==false} onChange={()=>updateProfile({agentBookingConsent:profile.agentBookingConsent===false})}/>
            <div className="mt-8 border border-peak-red/20 bg-peak-red/5 rounded-xl p-4">
              <h3 className="font-semibold text-peak-red mb-2">Danger zone</h3>
              <p className="text-xs text-peak-text-secondary mb-3">Deleting your account is permanent and cannot be undone.</p>
              <button onClick={()=>setShowDelete(true)} className="px-4 py-2 border border-peak-red text-peak-red text-sm font-semibold rounded-xl hover:bg-peak-red/10 transition-colors">Delete my account</button>
            </div>
            {showDelete && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
                <div className="bg-peak-card border border-white/10 rounded-2xl p-6 w-full max-w-sm">
                  <h3 className="font-bold text-peak-text mb-2">Confirm deletion</h3>
                  <p className="text-xs text-peak-text-secondary mb-4">Type your email <strong className="text-peak-text">{user?.email}</strong> to confirm.</p>
                  <input value={deleteEmail} onChange={e=>setDeleteEmail(e.target.value)} placeholder="Your email"
                    className="w-full bg-peak-surface border border-white/10 rounded-xl px-3 py-2.5 text-sm text-peak-text outline-none mb-3"/>
                  <div className="flex gap-3">
                    <button onClick={()=>setShowDelete(false)} className="flex-1 py-2.5 border border-white/10 text-peak-text-secondary text-sm rounded-xl">Cancel</button>
                    <button disabled={deleteEmail!==user?.email} onClick={()=>{
                      Object.keys(localStorage).filter(k=>k.startsWith("peakxp_")||k.startsWith("activities:")||k.startsWith("stats:")).forEach(k=>localStorage.removeItem(k));
                      logout();
                    }} className="flex-1 py-2.5 bg-peak-red disabled:opacity-40 text-white text-sm font-bold rounded-xl">Delete</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "saved" && (
          <div className="space-y-4">
            <h2 className="font-display font-bold text-lg text-peak-text">Saved</h2>
            <div>
              <h3 className="text-sm font-semibold text-peak-text mb-2">Saved resorts</h3>
              {!(profile.savedResorts||[]).length && <p className="text-peak-text-secondary text-sm">No saved resorts yet.</p>}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-peak-text mb-2">Saved hotels</h3>
              {!(profile.savedHotels||[]).length && <p className="text-peak-text-secondary text-sm">No saved hotels yet.</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
