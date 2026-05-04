import { useState } from "react";
import DateRangePicker, { fmtDate } from "../shared/DateRangePicker";
import { User, Star, Users, Snowflake, Zap, HelpCircle, Plus, X } from "lucide-react";
import BookingShell from "./shared/BookingShell";
import ResultCard from "./shared/ResultCard";
import CheckoutFlow from "./shared/CheckoutFlow";

const STEPS = ["Who", "Course", "Schedule", "School", "Checkout"];

function Tooltip({ text }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-block ml-1.5 align-middle">
      <button onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} onClick={() => setOpen(v => !v)} type="button" className="text-peak-text-secondary hover:text-peak-blue transition-colors">
        <HelpCircle className="h-4 w-4" />
      </button>
      {open && <div className="absolute z-50 left-6 top-0 w-64 bg-peak-surface border border-white/10 rounded-xl p-3 shadow-xl text-xs text-peak-text-secondary leading-relaxed">{text}</div>}
    </span>
  );
}

function PillSelect({ options, value, onChange, multi = false }) {
  function toggle(opt) {
    if (multi) {
      const arr = value || [];
      onChange(arr.includes(opt) ? arr.filter(v => v !== opt) : [...arr, opt]);
    } else {
      onChange(value === opt ? null : opt);
    }
  }
  const isActive = (opt) => multi ? (value || []).includes(opt) : value === opt;
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button key={opt.label || opt} onClick={() => toggle(opt.label || opt)}
          className={`px-4 py-2 text-sm font-medium rounded-xl border transition-colors ${isActive(opt.label || opt) ? "bg-peak-blue/20 border-peak-blue/50 text-peak-blue" : "border-white/10 text-peak-text-secondary hover:text-peak-text"}`}>
          {opt.label || opt}
        </button>
      ))}
    </div>
  );
}

const SKILL_LEVELS = [
  { label: "First timer", desc: "Never skied before" },
  { label: "Beginner", desc: "Can do easy slopes" },
  { label: "Intermediate", desc: "Parallel turns" },
  { label: "Advanced", desc: "Black runs" },
  { label: "Expert", desc: "Off-piste / racing" },
];

const SCHOOLS = [
  { id: "ecole-du-ski", name: "Ecole du Ski Français", image: "https://picsum.photos/seed/school1/600/400", rating: 4.8, reviews: 412, meta: ["Slope-side — meets at bottom of Gondola 1", "English · French · German · Italian", "BASI certified · 48 instructors"], pricePerDay: 42, status: "Available", tier: "Top rated" },
  { id: "peak-ski-school", name: "Peak Ski Academy", image: "https://picsum.photos/seed/school2/600/400", rating: 4.6, reviews: 213, meta: ["200m from main lift", "English · Spanish", "ISIA member · 22 instructors"], pricePerDay: 38, status: "Limited", tier: "Local favourite" },
  { id: "little-snow-stars", name: "Little Snow Stars", image: "https://picsum.photos/seed/school3/600/400", rating: 4.9, reviews: 187, meta: ["Slope-side — Kids meeting point", "English · French · German", "Specialist kids school · 18 instructors"], pricePerDay: 45, status: "Available", tier: "Best for kids" },
];

export default function SkiSchoolTab() {
  const [step, setStep] = useState(0);
  const [participants, setParticipants] = useState([{ type: "adult", age: null, name: "Participant 1" }]);
  const [courseType, setCourseType] = useState(null);
  const [schedule, setSchedule] = useState({ sport: "Skiing", duration: "half-day", time: "morning", days: 3, date: null, endDate: null, level: "Beginner", language: "English", requests: "" });
  const [selectedSchool, setSelectedSchool] = useState(null);

  const hasKids = participants.some(p => p.type === "kid" && p.age <= 5);
  const days = schedule.days || 1;

  function addParticipant() {
    setParticipants(prev => [...prev, { type: "adult", age: null, name: `Participant ${prev.length + 1}` }]);
  }
  function removeParticipant(i) {
    setParticipants(prev => prev.filter((_, idx) => idx !== i));
  }
  function updateParticipant(i, field, val) {
    setParticipants(prev => prev.map((p, idx) => idx === i ? { ...p, [field]: val } : p));
  }

  function goBack() {
    if (step > 0) setStep(s => s - 1);
  }

  const courseTypes = [
    { key: "group", icon: Users, title: "Group lesson", desc: "Join a small group matched to your level. Max 8–10 participants. Best value.", from: "€35/half-day" },
    { key: "private", icon: Star, title: "Private lesson", desc: "Your own certified instructor, 100% focused on you. Fastest progression.", from: "€90/hour" },
    ...(hasKids ? [{ key: "childcare", icon: Snowflake, title: "Childcare (Bambini)", desc: "Supervised snow play and first ski steps for ages 3–5. Warm indoor space included.", from: "€45/half-day" }] : []),
    { key: "freestyle", icon: Zap, title: "Freestyle / Specialty", desc: "Moguls, park tricks, off-piste technique, racing gates. For intermediate to expert.", from: "€50/half-day" },
  ];

  const TRUST = [
    { icon: "ShieldCheck", label: "Certified instructors only" },
    { icon: "RefreshCw", label: "Free rebooking up to 48h before" },
    { icon: "Lock", label: "SSL secured" },
  ];

  return (
    <BookingShell steps={STEPS} current={step} onBack={goBack}>

      {/* STEP 0 */}
      {step === 0 && (
        <div>
          <h2 className="font-display font-bold text-2xl text-peak-text mb-1">Who is taking lessons?</h2>
          <p className="text-peak-text-secondary text-sm mb-6">You can add multiple participants — each gets their own lesson.</p>
          <div className="space-y-3 mb-6">
            {participants.map((p, i) => (
              <div key={i} className="bg-peak-card border border-white/5 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex gap-2">
                    {[{ v: "adult", label: "Adult 15+" }, { v: "kid", label: "Child 3–14" }].map(opt => (
                      <button key={opt.v} onClick={() => updateParticipant(i, "type", opt.v)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${p.type === opt.v ? "bg-peak-blue/20 border-peak-blue/50 text-peak-blue" : "border-white/10 text-peak-text-secondary"}`}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  {participants.length > 1 && (
                    <button onClick={() => removeParticipant(i)} className="ml-auto text-peak-text-secondary hover:text-peak-red transition-colors">
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                {p.type === "kid" && (
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-peak-text-secondary">Child age:</span>
                      <button onClick={() => updateParticipant(i, "age", Math.max(3, (p.age || 5) - 1))} className="w-8 h-8 rounded-lg border border-white/10 text-peak-text-secondary hover:text-peak-text text-lg flex items-center justify-center">−</button>
                      <span className="text-peak-text font-bold w-6 text-center">{p.age || 5}</span>
                      <button onClick={() => updateParticipant(i, "age", Math.min(14, (p.age || 5) + 1))} className="w-8 h-8 rounded-lg border border-white/10 text-peak-text-secondary hover:text-peak-text text-lg flex items-center justify-center">+</button>
                    </div>
                    {(p.age || 5) <= 4 && (
                      <p className="mt-2 text-xs text-peak-blue bg-peak-blue/10 border border-peak-blue/20 rounded-lg px-3 py-2">
                        For ages 3–4 we recommend our childcare programme with supervised snow play and first ski steps.
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          <button onClick={addParticipant} className="text-peak-blue text-sm hover:underline mb-6 flex items-center gap-1">
            <Plus className="h-4 w-4" /> Add another person
          </button>
          <button onClick={() => setStep(1)} className="px-8 py-3 bg-peak-red hover:bg-peak-red-hover text-white font-display font-bold text-sm rounded-xl transition-colors">
            Continue
          </button>
        </div>
      )}

      {/* STEP 1 */}
      {step === 1 && (
        <div>
          <h2 className="font-display font-bold text-2xl text-peak-text mb-1">Choose a course type</h2>
          <p className="text-peak-text-secondary text-sm mb-6">Select the lesson format that works best for your group.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {courseTypes.map(ct => {
              const Icon = ct.icon;
              const active = courseType === ct.key;
              return (
                <button key={ct.key} onClick={() => setCourseType(ct.key)}
                  className={`flex flex-col items-start gap-3 p-5 rounded-xl border text-left transition-all ${active ? "border-peak-blue/50 bg-peak-blue/10" : "border-white/10 bg-peak-card hover:border-white/25"}`}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${active ? "bg-peak-blue/20" : "bg-white/5"}`}>
                    <Icon className={`h-5 w-5 ${active ? "text-peak-blue" : "text-peak-text-secondary"}`} />
                  </div>
                  <div>
                    <p className="font-semibold text-peak-text text-sm mb-1">{ct.title}</p>
                    <p className="text-peak-text-secondary text-xs mb-2">{ct.desc}</p>
                    <span className="text-peak-blue text-xs font-medium">From {ct.from}</span>
                  </div>
                </button>
              );
            })}
          </div>
          <button onClick={() => setStep(2)} disabled={!courseType}
            className="px-8 py-3 bg-peak-red hover:bg-peak-red-hover disabled:opacity-40 text-white font-display font-bold text-sm rounded-xl transition-colors">
            Continue
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="max-w-2xl">
          <h2 className="font-display font-bold text-2xl text-peak-text mb-1">Schedule preferences</h2>
          <p className="text-peak-text-secondary text-sm mb-6">Tell us when and how you'd like to learn.</p>
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-2">Sport</p>
              <PillSelect options={["Skiing", "Snowboard", "Cross-country", "Telemark"]} value={schedule.sport} onChange={v => setSchedule(s => ({ ...s, sport: v }))} />
            </div>
            <div>
              <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-3">Duration</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[{ key: "half-day", label: "Half-day", sub: "Choose morning or afternoon" }, { key: "full-day", label: "Full day", sub: "9:00–16:00, lunch break included" }].map(d => (
                  <button key={d.key} onClick={() => setSchedule(s => ({ ...s, duration: d.key }))}
                    className={`p-4 rounded-xl border text-left transition-all ${schedule.duration === d.key ? "border-peak-blue/50 bg-peak-blue/10" : "border-white/10 bg-peak-card"}`}>
                    <p className={`font-semibold text-sm ${schedule.duration === d.key ? "text-peak-text" : "text-peak-text-secondary"}`}>{d.label}</p>
                    <p className="text-peak-text-secondary text-xs">{d.sub}</p>
                  </button>
                ))}
              </div>
              {schedule.duration === "half-day" && (
                <div className="flex gap-2 mt-3">
                  {[{ k: "morning", l: "Morning 9:00–12:00" }, { k: "afternoon", l: "Afternoon 13:00–16:00" }].map(t => (
                    <button key={t.k} onClick={() => setSchedule(s => ({ ...s, time: t.k }))}
                      className={`px-4 py-2 text-xs font-medium rounded-lg border transition-colors ${schedule.time === t.k ? "bg-peak-blue/20 border-peak-blue/50 text-peak-blue" : "border-white/10 text-peak-text-secondary"}`}>
                      {t.l}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div>
              <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-2">Number of days</p>
              <div className="flex items-center gap-4">
                <button onClick={() => setSchedule(s => ({ ...s, days: Math.max(1, s.days - 1) }))} className="w-10 h-10 rounded-xl border border-white/10 text-peak-text-secondary hover:text-peak-text text-xl">−</button>
                <span className="text-3xl font-display font-bold text-peak-text w-8 text-center">{schedule.days}</span>
                <button onClick={() => setSchedule(s => ({ ...s, days: Math.min(14, s.days + 1) }))} className="w-10 h-10 rounded-xl border border-white/10 text-peak-text-secondary hover:text-peak-text text-xl">+</button>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-2">Lesson dates</p>
              <DateRangePicker
                startDate={schedule.date} endDate={schedule.endDate}
                onStartChange={v => setSchedule(s => ({ ...s, date: v }))} onEndChange={v => setSchedule(s => ({ ...s, endDate: v }))}
                mode="range" context="ski-school"
                placeholder={{ start: "First lesson day", end: "Last lesson day" }}
              />
            </div>
            <div>
              <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-1 flex items-center">
                Skill level <Tooltip text="If you're unsure, choose one level lower than you think — it's easier to move up on day one than to struggle." />
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {SKILL_LEVELS.map(sl => (
                  <button key={sl.label} onClick={() => setSchedule(s => ({ ...s, level: sl.label }))}
                    className={`flex flex-col items-start px-4 py-2.5 rounded-xl border transition-colors text-left ${schedule.level === sl.label ? "bg-peak-blue/20 border-peak-blue/50" : "border-white/10"}`}>
                    <span className={`text-sm font-medium ${schedule.level === sl.label ? "text-peak-blue" : "text-peak-text-secondary"}`}>{sl.label}</span>
                    <span className="text-xs text-peak-text-secondary">{sl.desc}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-2">Language of instruction</p>
              <select value={schedule.language} onChange={e => setSchedule(s => ({ ...s, language: e.target.value }))}
                className="bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue">
                {["English", "French", "German", "Italian", "Spanish", "Norwegian", "Dutch"].map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <p className="text-xs font-semibold text-peak-text uppercase tracking-widest mb-2">Special requests <span className="normal-case font-normal text-peak-text-secondary">(optional)</span></p>
              <textarea value={schedule.requests} onChange={e => setSchedule(s => ({ ...s, requests: e.target.value }))} rows={2} placeholder="e.g. fear of heights, previous injury, want to focus on moguls..."
                className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue resize-none" />
            </div>
          </div>
          <button onClick={() => setStep(3)} className="mt-8 px-8 py-3 bg-peak-red hover:bg-peak-red-hover text-white font-display font-bold text-sm rounded-xl transition-colors">
            Find ski schools
          </button>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div>
          <h2 className="font-display font-bold text-2xl text-peak-text mb-1">Choose a ski school</h2>
          <p className="text-peak-text-secondary text-sm mb-6">{schedule.days} day{schedule.days !== 1 ? "s" : ""} · {schedule.sport} · {schedule.level}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            {SCHOOLS.map(school => (
              <ResultCard
                key={school.id}
                image={school.image}
                title={school.name}
                rating={school.rating}
                reviewCount={school.reviews}
                meta={school.meta}
                badges={[{ label: school.tier, style: "text-peak-blue border-peak-blue/40" }]}
                price={"€" + school.pricePerDay}
                priceLabel="/ half-day"
                priceSubline={"€" + (school.pricePerDay * days) + " for " + days + " day" + (days !== 1 ? "s" : "")}
                status={school.status}
                selected={selectedSchool?.id === school.id}
                onSelect={() => setSelectedSchool(school)}
                cta="Select school"
                expandContent={
                  <div className="space-y-2 text-xs text-peak-text-secondary">
                    <p className="font-medium text-peak-text">Instructors</p>
                    {["Alex R. — Level 3 BASI · Freestyle specialist", "Sophie M. — Level 4 BASI · Kids specialist", "Marco T. — ISIA · Off-piste & racing"].map(inst => (
                      <p key={inst}>{inst}</p>
                    ))}
                    <p className="mt-2 font-medium text-peak-text">Meeting point</p>
                    <p>Bottom of main gondola, blue flag stand. 15 min before lesson start.</p>
                    <p className="mt-2 font-medium text-peak-text">Cancellation</p>
                    <p>Full refund if cancelled 48h before. No refund within 48h.</p>
                  </div>
                }
              />
            ))}
          </div>
          <button onClick={() => setStep(4)} disabled={!selectedSchool}
            className="px-8 py-3 bg-peak-red hover:bg-peak-red-hover disabled:opacity-40 text-white font-display font-bold text-sm rounded-xl transition-colors">
            Continue to checkout
          </button>
        </div>
      )}

      {/* STEP 4 */}
      {step === 4 && (
        <CheckoutFlow
          totalPrice={selectedSchool ? selectedSchool.pricePerDay * days : 0}
          summary={[
            { label: "School", value: selectedSchool?.name },
            { label: "Course", value: courseType },
            { label: "Sport", value: schedule.sport },
            { label: "Level", value: schedule.level },
            { label: "Duration", value: schedule.duration + (schedule.duration === "half-day" ? ` (${schedule.time})` : "") },
            { label: "Days", value: schedule.days },
            { label: "Start date", value: fmtDate(schedule.date) || "TBD" },
            { label: "Participants", value: participants.length },
          ]}
          guestFields={[
            { key: "name", label: "Full name", placeholder: "Jane Smith" },
            { key: "dob", label: "Date of birth", placeholder: "DD/MM/YYYY" },
            { key: "level", label: "Skiing level", placeholder: "e.g. Intermediate" },
            { key: "emergency", label: "Emergency contact (optional)", placeholder: "Name & phone number" },
            { key: "medical", label: "Medical notes (optional, private)", placeholder: "Any relevant medical info..." },
          ]}
          trustBadges={TRUST}
        />
      )}
    </BookingShell>
  );
}