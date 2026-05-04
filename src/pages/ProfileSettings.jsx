import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppAuth } from "../context/AppAuthContext";
import { useProfile } from "../context/ProfileContext";
import AuthGate from "../components/AuthGate";

const SECTIONS = ["Account", "Measurements", "Preferences", "Notifications", "Privacy", "Connected accounts", "About"];
const COUNTRIES = ["Austria","France","Germany","Italy","Norway","Sweden","Switzerland","United Kingdom","United States","Other"];

function Toggle({ label, desc, checked, onChange }) {
  return (
    <div className="flex items-start justify-between py-3 border-b border-white/5 last:border-0">
      <div className="flex-1 pr-4">
        <p className="text-sm text-peak-text font-medium">{label}</p>
        {desc && <p className="text-xs text-peak-text-secondary mt-0.5">{desc}</p>}
      </div>
      <div onClick={onChange} className={`w-10 h-5 rounded-full transition-colors cursor-pointer flex items-center px-0.5 flex-shrink-0 mt-0.5 ${checked ? "bg-peak-red" : "bg-white/10"}`}>
        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${checked ? "translate-x-5" : ""}`} />
      </div>
    </div>
  );
}

export default function ProfileSettings() {
  const { isLoggedIn, user, updateUser, logout } = useAppAuth();
  const { profile, updateProfile } = useProfile();
  const [section, setSection] = useState("Account");
  const [toast, setToast] = useState("");
  const [account, setAccount] = useState({ firstName: user?.firstName || "", lastName: user?.lastName || "", email: user?.email || "", country: user?.country || "" });

  const NOTIF_LABELS = {
    newSnow: ["New snow alerts", "When a saved resort reports fresh snowfall"],
    liftStatus: ["Lift status changes", "When lifts at saved resorts open or close"],
    priceAlerts: ["Price drops", "When a hotel or flight you viewed drops in price"],
    friendActivity: ["Friend activity", "When friends post or complete challenges"],
    challenges: ["Challenge updates", "New challenges and your progress"],
    promotions: ["Partner promotions", "Offers from verified resort and hotel partners"],
    newsletter: ["Newsletter", "Weekly PeakXP digest"],
  };

  if (!isLoggedIn) return <AuthGate message="Sign in to access settings." />;

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  }

  function exportData() {
    const data = {};
    Object.keys(localStorage).filter(k => k.startsWith("peakxp_")).forEach(k => { data[k] = JSON.parse(localStorage.getItem(k) || "null"); });
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `peakxp-data-export-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-peak-green text-white text-xs font-semibold px-4 py-2 rounded-full shadow-xl z-50">
          {toast}
        </div>
      )}
      <h1 className="font-display font-extrabold text-2xl text-peak-text mb-6">Settings</h1>
      <div className="flex gap-6">
        <div className="hidden sm:block w-48 flex-shrink-0">
          <div className="bg-peak-card border border-white/5 rounded-2xl p-2 sticky top-20">
            {SECTIONS.map(s => (
              <button key={s} onClick={() => setSection(s)}
                className={`w-full text-left px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${section === s ? "bg-peak-red/10 text-peak-red" : "text-peak-text-secondary hover:text-peak-text hover:bg-white/5"}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="sm:hidden w-full mb-4">
          <select value={section} onChange={e => setSection(e.target.value)}
            className="w-full bg-peak-card border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none">
            {SECTIONS.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        <div className="flex-1 bg-peak-card border border-white/5 rounded-2xl p-6">
          {section === "Account" && (
            <div className="space-y-4">
              <h2 className="font-display font-bold text-lg text-peak-text">Account</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-peak-text-secondary mb-1">First name</label>
                  <input value={account.firstName} onChange={e => setAccount(a => ({ ...a, firstName: e.target.value }))}
                    className="w-full bg-peak-bg border border-white/10 rounded-xl px-3 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
                </div>
                <div>
                  <label className="block text-xs text-peak-text-secondary mb-1">Last name</label>
                  <input value={account.lastName} onChange={e => setAccount(a => ({ ...a, lastName: e.target.value }))}
                    className="w-full bg-peak-bg border border-white/10 rounded-xl px-3 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-peak-text-secondary mb-1">Email</label>
                <input type="email" value={account.email} onChange={e => setAccount(a => ({ ...a, email: e.target.value }))}
                  className="w-full bg-peak-bg border border-white/10 rounded-xl px-3 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
              </div>
              <div>
                <label className="block text-xs text-peak-text-secondary mb-1">Home country</label>
                <select value={account.country} onChange={e => setAccount(a => ({ ...a, country: e.target.value }))}
                  className="w-full bg-peak-bg border border-white/10 rounded-xl px-3 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue">
                  <option value="">Select</option>
                  {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <button onClick={() => { updateUser(account); showToast("Account updated"); }}
                className="px-6 py-2.5 bg-peak-red hover:bg-peak-red-hover text-white text-sm font-bold rounded-xl transition-colors">Save</button>
            </div>
          )}

          {section === "Measurements" && (
            <div className="space-y-4">
              <h2 className="font-display font-bold text-lg text-peak-text">Measurements</h2>
              <div className="grid grid-cols-2 gap-4">
                {[{ k: "height", l: "Height (cm)" }, { k: "weight", l: "Weight (kg)" }, { k: "shoeSize", l: "Shoe size (EU)" }].map(({ k, l }) => (
                  <div key={k}>
                    <label className="block text-xs text-peak-text-secondary mb-1">{l}</label>
                    <input type="number" defaultValue={profile[k] || ""}
                      onBlur={e => updateProfile({ [k]: e.target.value ? Number(e.target.value) : null })}
                      className="w-full bg-peak-bg border border-white/10 rounded-xl px-3 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
                  </div>
                ))}
              </div>
              <p className="text-xs text-peak-text-secondary">These are used to automatically suggest the right equipment size and ski school level when booking.</p>
              <button onClick={() => showToast("Measurements saved")} className="px-6 py-2.5 bg-peak-red hover:bg-peak-red-hover text-white text-sm font-bold rounded-xl transition-colors">Save</button>
            </div>
          )}

          {section === "Preferences" && (
            <div className="space-y-4">
              <h2 className="font-display font-bold text-lg text-peak-text">Preferences</h2>
              {[
                { k: "language", l: "Language", opts: [["en","English"],["de","Deutsch"],["fr","Français"],["it","Italiano"]] },
                { k: "currency", l: "Currency", opts: [["EUR","EUR"],["USD","USD"],["CHF","CHF"],["GBP","GBP"],["NOK","NOK"],["SEK","SEK"]] },
                { k: "temperatureUnit", l: "Temperature", opts: [["celsius","Celsius (°C)"],["fahrenheit","Fahrenheit (°F)"]] },
                { k: "distanceUnit", l: "Distance", opts: [["metric","Metric (km)"],["imperial","Imperial (mi)"]] },
              ].map(({ k, l, opts }) => (
                <div key={k}>
                  <label className="block text-xs text-peak-text-secondary mb-1">{l}</label>
                  <select value={profile[k]} onChange={e => { updateProfile({ [k]: e.target.value }); showToast("Applied"); }}
                    className="w-full bg-peak-bg border border-white/10 rounded-xl px-3 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue">
                    {opts.map(([v, n]) => <option key={v} value={v}>{n}</option>)}
                  </select>
                </div>
              ))}
            </div>
          )}

          {section === "Notifications" && (
            <div>
              <h2 className="font-display font-bold text-lg text-peak-text mb-4">Notifications</h2>
              {Object.entries(NOTIF_LABELS).map(([key, [label, desc]]) => (
                <Toggle key={key} label={label} desc={desc} checked={profile.notifications?.[key] ?? true}
                  onChange={() => updateProfile({ notifications: { ...profile.notifications, [key]: !profile.notifications?.[key] } })} />
              ))}
              <button onClick={() => showToast("Saved")} className="mt-4 px-6 py-2.5 bg-peak-red hover:bg-peak-red-hover text-white text-sm font-bold rounded-xl transition-colors">Save</button>
            </div>
          )}

          {section === "Privacy" && (
            <div className="space-y-4">
              <h2 className="font-display font-bold text-lg text-peak-text">Privacy</h2>
              <Toggle label="Show activity in feed" checked={profile.showActivityFeed} onChange={() => updateProfile({ showActivityFeed: !profile.showActivityFeed })} />
              <Toggle label="Show stats publicly" checked={profile.showStats} onChange={() => updateProfile({ showStats: !profile.showStats })} />
              <div className="border-t border-white/5 pt-4">
                <h3 className="text-sm font-semibold text-peak-text mb-2">Data export</h3>
                <button onClick={exportData} className="px-4 py-2 border border-white/10 text-peak-text-secondary hover:text-peak-text text-sm rounded-xl transition-colors">Export my data</button>
              </div>
              <div className="border-t border-white/5 pt-4">
                <h3 className="text-sm font-semibold text-peak-text mb-1">Current session</h3>
                <p className="text-xs text-peak-text-secondary mb-2 truncate">{navigator.userAgent.split(")")[0].split("(")[1] || "Unknown device"}</p>
                <button onClick={logout} className="px-4 py-2 border border-peak-red/40 text-peak-red text-sm rounded-xl hover:bg-peak-red/10 transition-colors">Sign out this session</button>
              </div>
            </div>
          )}

          {section === "Connected accounts" && (
            <div className="space-y-4">
              <h2 className="font-display font-bold text-lg text-peak-text">Connected accounts</h2>
              {["Google","Apple","Facebook"].map(p => (
                <div key={p} className="flex items-center justify-between py-3 border-b border-white/5">
                  <div>
                    <p className="text-sm font-medium text-peak-text">{p}</p>
                    <p className="text-xs text-peak-text-secondary">Not connected</p>
                  </div>
                  <button onClick={() => alert("Social login connection coming soon.")} className="px-4 py-1.5 border border-white/10 text-peak-text-secondary hover:text-peak-text text-xs rounded-xl transition-colors">Connect</button>
                </div>
              ))}
            </div>
          )}

          {section === "About" && (
            <div className="space-y-4">
              <h2 className="font-display font-bold text-lg text-peak-text">About</h2>
              <p className="text-sm text-peak-text-secondary">PeakXP v1.0.0</p>
              <div className="flex gap-4">
                <Link to="/privacy" className="text-sm text-peak-blue hover:underline">Privacy Policy</Link>
                <Link to="/terms" className="text-sm text-peak-blue hover:underline">Terms of Service</Link>
              </div>
              <p className="text-xs text-peak-text-secondary mt-4">Built with love for the mountains.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}