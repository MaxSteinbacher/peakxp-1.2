import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/shared/BackButton";
import { useAppAuth } from "../context/AppAuthContext";
import { useProfile } from "../context/ProfileContext";

const STEPS = ["About you", "Your home base", "Emergency & notifications"];

const LEVELS = ["First timer", "Beginner", "Intermediate", "Advanced", "Expert"];
const DISCIPLINES = ["Skiing", "Snowboard", "Cross-country", "Freestyle"];
const HELMET_SIZES = ["XS", "S", "M", "L", "XL"];
const CLOTHING_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const BLOOD_TYPES = ["A+","A-","B+","B-","AB+","AB-","O+","O-","Unknown"];
const CURRENCIES = ["EUR","USD","CHF","GBP","NOK","SEK"];
const LANGUAGES = [{ code: "en", name: "English" }, { code: "de", name: "Deutsch" }, { code: "fr", name: "Français" }, { code: "it", name: "Italiano" }];
const COUNTRIES = ["Austria","France","Germany","Italy","Norway","Sweden","Switzerland","United Kingdom","United States","Other"];

function Pill({ label, active, onClick }) {
  return (
    <button type="button" onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${active ? "bg-peak-red/20 border-peak-red text-peak-red" : "border-white/10 text-peak-text-secondary hover:text-peak-text hover:border-white/30"}`}>
      {label}
    </button>
  );
}

export default function ProfileSetup() {
  const { isLoggedIn } = useAppAuth();
  const { updateProfile } = useProfile();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const [data, setData] = useState({
    height: "", weight: "", shoeSize: "", helmetSize: null, clothingSize: null,
    skiingLevel: null, preferredDiscipline: [],
    homeCity: "", homeCountry: "", homeAirport: "", homeTrainStation: "",
    currency: "EUR", language: "en", temperatureUnit: "celsius", distanceUnit: "metric",
    emergencyContactName: "", emergencyContactPhone: "", bloodType: null, medicalNotes: "",
    notifications: { newSnow: true, liftStatus: true, priceAlerts: true, friendActivity: true, challenges: true, promotions: true, newsletter: true },
  });

  useEffect(() => { if (!isLoggedIn) navigate("/auth"); }, [isLoggedIn]);

  function set(key, val) { setData(d => ({ ...d, [key]: val })); }
  function toggleDiscipline(d) {
    setData(prev => ({
      ...prev,
      preferredDiscipline: prev.preferredDiscipline.includes(d) ? prev.preferredDiscipline.filter(x => x !== d) : [...prev.preferredDiscipline, d],
    }));
  }
  function toggleNotif(key) {
    setData(prev => ({ ...prev, notifications: { ...prev.notifications, [key]: !prev.notifications[key] } }));
  }

  function finish() {
    updateProfile({
      height: data.height ? Number(data.height) : null,
      weight: data.weight ? Number(data.weight) : null,
      shoeSize: data.shoeSize ? Number(data.shoeSize) : null,
      helmetSize: data.helmetSize, clothingSize: data.clothingSize,
      skiingLevel: data.skiingLevel, preferredDiscipline: data.preferredDiscipline,
      homeCity: data.homeCity, homeCountry: data.homeCountry,
      homeAirport: data.homeAirport, homeTrainStation: data.homeTrainStation,
      currency: data.currency, language: data.language,
      temperatureUnit: data.temperatureUnit, distanceUnit: data.distanceUnit,
      emergencyContactName: data.emergencyContactName, emergencyContactPhone: data.emergencyContactPhone,
      bloodType: data.bloodType, medicalNotes: data.medicalNotes,
      notifications: data.notifications,
    });
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen bg-peak-bg flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg bg-peak-card border border-white/5 rounded-2xl p-8">
        <BackButton to="/" label="Skip for now" className="mb-4" />
        <h1 className="font-display font-extrabold text-2xl text-peak-text mb-1">Set up your profile</h1>
        <p className="text-peak-text-secondary text-sm mb-6">Step {step + 1} of {STEPS.length} — {STEPS[step]}</p>

        {/* Step indicator */}
        <div className="flex gap-1.5 mb-8">
          {STEPS.map((_, i) => (
            <div key={i} className={`flex-1 h-1.5 rounded-full ${i <= step ? "bg-peak-red" : "bg-white/10"}`} />
          ))}
        </div>

        {step === 0 && (
          <div className="space-y-5">
            <div className="grid grid-cols-3 gap-3">
              {[{ k: "height", l: "Height (cm)" }, { k: "weight", l: "Weight (kg)" }, { k: "shoeSize", l: "Shoe size (EU)" }].map(({ k, l }) => (
                <div key={k}>
                  <label className="block text-xs text-peak-text-secondary mb-1">{l}</label>
                  <input type="number" value={data[k]} onChange={e => set(k, e.target.value)}
                    className="w-full bg-peak-surface border border-white/10 rounded-xl px-3 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
                </div>
              ))}
            </div>
            <div>
              <label className="block text-xs text-peak-text-secondary mb-2">Helmet size</label>
              <div className="flex gap-2 flex-wrap">{HELMET_SIZES.map(s => <Pill key={s} label={s} active={data.helmetSize === s} onClick={() => set("helmetSize", s)} />)}</div>
            </div>
            <div>
              <label className="block text-xs text-peak-text-secondary mb-2">Clothing size</label>
              <div className="flex gap-2 flex-wrap">{CLOTHING_SIZES.map(s => <Pill key={s} label={s} active={data.clothingSize === s} onClick={() => set("clothingSize", s)} />)}</div>
            </div>
            <div>
              <label className="block text-xs text-peak-text-secondary mb-2">Skiing level</label>
              <div className="flex gap-2 flex-wrap">{LEVELS.map(l => <Pill key={l} label={l} active={data.skiingLevel === l.toLowerCase()} onClick={() => set("skiingLevel", l.toLowerCase())} />)}</div>
            </div>
            <div>
              <label className="block text-xs text-peak-text-secondary mb-2">Preferred discipline</label>
              <div className="flex gap-2 flex-wrap">{DISCIPLINES.map(d => <Pill key={d} label={d} active={data.preferredDiscipline.includes(d)} onClick={() => toggleDiscipline(d)} />)}</div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-peak-text-secondary mb-1">Home city</label>
                <input value={data.homeCity} onChange={e => set("homeCity", e.target.value)}
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-3 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
              </div>
              <div>
                <label className="block text-xs text-peak-text-secondary mb-1">Home country</label>
                <select value={data.homeCountry} onChange={e => set("homeCountry", e.target.value)}
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-3 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue">
                  <option value="">Select</option>
                  {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-peak-text-secondary mb-1">Nearest airport (IATA)</label>
                <input value={data.homeAirport} onChange={e => set("homeAirport", e.target.value)} placeholder="e.g. ZRH"
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-3 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
              </div>
              <div>
                <label className="block text-xs text-peak-text-secondary mb-1">Nearest train station</label>
                <input value={data.homeTrainStation} onChange={e => set("homeTrainStation", e.target.value)}
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-3 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-peak-text-secondary mb-1">Currency</label>
                <select value={data.currency} onChange={e => set("currency", e.target.value)}
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-3 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue">
                  {CURRENCIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-peak-text-secondary mb-1">Language</label>
                <select value={data.language} onChange={e => set("language", e.target.value)}
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-3 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue">
                  {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-peak-text-secondary mb-2">Temperature</label>
                <div className="flex gap-2">
                  {["celsius","fahrenheit"].map(u => <Pill key={u} label={u === "celsius" ? "°C" : "°F"} active={data.temperatureUnit === u} onClick={() => set("temperatureUnit", u)} />)}
                </div>
              </div>
              <div>
                <label className="block text-xs text-peak-text-secondary mb-2">Distance</label>
                <div className="flex gap-2">
                  {["metric","imperial"].map(u => <Pill key={u} label={u === "metric" ? "km" : "mi"} active={data.distanceUnit === u} onClick={() => set("distanceUnit", u)} />)}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-peak-text-secondary mb-1">Emergency contact name</label>
                <input value={data.emergencyContactName} onChange={e => set("emergencyContactName", e.target.value)}
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-3 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
              </div>
              <div>
                <label className="block text-xs text-peak-text-secondary mb-1">Emergency contact phone</label>
                <input value={data.emergencyContactPhone} onChange={e => set("emergencyContactPhone", e.target.value)}
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-3 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
              </div>
            </div>
            <div>
              <label className="block text-xs text-peak-text-secondary mb-1">Blood type</label>
              <div className="flex gap-2 flex-wrap">{BLOOD_TYPES.map(b => <Pill key={b} label={b} active={data.bloodType === b} onClick={() => set("bloodType", b)} />)}</div>
            </div>
            <div>
              <label className="block text-xs text-peak-text-secondary mb-1">Medical notes</label>
              <textarea value={data.medicalNotes} onChange={e => set("medicalNotes", e.target.value)} rows={3}
                className="w-full bg-peak-surface border border-white/10 rounded-xl px-3 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue resize-none" />
              <p className="text-xs text-peak-text-secondary mt-1">Stored locally on your device only. Never shared without your consent.</p>
            </div>
            <div>
              <label className="block text-xs text-peak-text-secondary mb-3">Notifications</label>
              <div className="space-y-2">
                {Object.keys(data.notifications).map(key => (
                  <label key={key} className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-peak-text capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                    <div onClick={() => toggleNotif(key)} className={`w-10 h-5 rounded-full transition-colors cursor-pointer flex items-center px-0.5 ${data.notifications[key] ? "bg-peak-red" : "bg-white/10"}`}>
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${data.notifications[key] ? "translate-x-5" : ""}`} />
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-8">
          {step > 0 ? (
            <button onClick={() => setStep(s => s - 1)} className="text-sm text-peak-text-secondary hover:text-peak-text transition-colors">← Back</button>
          ) : <div />}
          <div className="flex gap-3">
            {step < 2 && <button onClick={() => setStep(s => s + 1)} className="text-sm text-peak-text-secondary hover:text-peak-text">Skip for now</button>}
            {step < 2 ? (
              <button onClick={() => setStep(s => s + 1)} className="px-6 py-2.5 bg-peak-red hover:bg-peak-red-hover text-white text-sm font-bold rounded-xl transition-colors">Continue</button>
            ) : (
              <button onClick={finish} className="px-6 py-2.5 bg-peak-red hover:bg-peak-red-hover text-white text-sm font-bold rounded-xl transition-colors">Finish setup</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}