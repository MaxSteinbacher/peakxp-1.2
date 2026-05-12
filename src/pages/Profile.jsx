import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "../components/shared/BackButton";
import { useAppAuth } from "../context/AppAuthContext";
import { useProfile } from "../context/ProfileContext";
import AuthGate from "../components/AuthGate";
import { dashboardData } from "../lib/data";

const TABS = ["Overview", "Measurements", "Preferences", "Privacy", "Saved", "Activity"];

function Field({ label, value }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
      <span className="text-xs text-peak-text-secondary">{label}</span>
      <span className="text-sm text-peak-text font-medium">{value || <span className="text-white/20">Not set</span>}</span>
    </div>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex items-center justify-between cursor-pointer py-2">
      <span className="text-sm text-peak-text">{label}</span>
      <div onClick={onChange} className={`w-10 h-5 rounded-full transition-colors cursor-pointer flex items-center px-0.5 ${checked ? "bg-peak-red" : "bg-white/10"}`}>
        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${checked ? "translate-x-5" : ""}`} />
      </div>
    </label>
  );
}

export default function Profile() {
  const { isLoggedIn, user, logout } = useAppAuth();
  const { profile, updateProfile } = useProfile();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");
  const [deleteEmail, setDeleteEmail] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [measurements, setMeasurements] = useState({ ...profile });

  if (!isLoggedIn) return <AuthGate message="Sign in to view your profile." />;

  const initials = user ? `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase() : "?";
  const d = dashboardData;

  const stats = [
    { label: "Days on mountain", value: d.totalDays },
    { label: "Resorts visited", value: d.resortsVisited },
    { label: "Runs logged", value: d.runsLogged },
    { label: "Vertical metres", value: `${(d.verticalMetres / 1000).toFixed(1)}k` },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <BackButton to="/" className="mb-6" />
      {/* Header */}
      <div className="bg-peak-card border border-white/5 rounded-2xl p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="flex flex-col items-center gap-2">
            <div className="w-24 h-24 rounded-2xl bg-peak-red flex items-center justify-center flex-shrink-0">
              {user?.avatar ? <img src={user.avatar} alt="" className="w-full h-full object-cover rounded-2xl" /> :
                <span className="font-display font-bold text-white text-3xl">{initials}</span>}
            </div>
            <button onClick={() => alert("Photo upload coming soon")} className="text-xs text-peak-blue hover:underline">Change photo</button>
          </div>
          <div className="flex-1">
            <h1 className="font-display font-extrabold text-3xl text-peak-text">{user?.firstName} {user?.lastName}</h1>
            <p className="text-peak-text-secondary text-sm">{user?.email}</p>
            <p className="text-peak-text-secondary text-xs mt-1">Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-GB", { month: "long", year: "numeric" }) : "—"}</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setActiveTab("Overview")} className="px-4 py-2 border border-white/10 text-peak-text-secondary hover:text-peak-text text-sm rounded-xl transition-colors">Edit profile</button>
            <Link to="/profile/settings" className="px-4 py-2 bg-peak-surface text-peak-text-secondary hover:text-peak-text text-sm rounded-xl transition-colors">Settings</Link>
          </div>
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
      <div className="flex gap-1 overflow-x-auto hide-scrollbar mb-6">
        {TABS.map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${activeTab === t ? "bg-white/10 text-peak-text" : "text-peak-text-secondary hover:text-peak-text"}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="bg-peak-card border border-white/5 rounded-2xl p-6">
        {activeTab === "Overview" && (
          <div className="space-y-4">
            {[
              { title: "Personal", tab: "Measurements", fields: [["Height", profile.height ? `${profile.height} cm` : null], ["Weight", profile.weight ? `${profile.weight} kg` : null], ["Skiing level", profile.skiingLevel]] },
              { title: "Home base", tab: "Preferences", fields: [["City", profile.homeCity], ["Country", profile.homeCountry], ["Airport", profile.homeAirport]] },
              { title: "Emergency", tab: "Privacy", fields: [["Contact", profile.emergencyContactName], ["Phone", profile.emergencyContactPhone]] },
            ].map(({ title, tab, fields }) => (
              <div key={title} className="bg-peak-surface rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-peak-text text-sm">{title}</h3>
                  <button onClick={() => setActiveTab(tab)} className="text-xs text-peak-blue hover:underline">Edit</button>
                </div>
                {fields.map(([l, v]) => <Field key={l} label={l} value={v} />)}
              </div>
            ))}
          </div>
        )}

        {activeTab === "Measurements" && (
          <div className="space-y-4">
            <h2 className="font-display font-bold text-lg text-peak-text">Personal measurements</h2>
            <div className="grid grid-cols-2 gap-4">
              {[{ k: "height", l: "Height (cm)" }, { k: "weight", l: "Weight (kg)" }, { k: "shoeSize", l: "Shoe size (EU)" }].map(({ k, l }) => (
                <div key={k}>
                  <label className="block text-xs text-peak-text-secondary mb-1">{l}</label>
                  <input type="number" value={measurements[k] || ""} onChange={e => setMeasurements(m => ({ ...m, [k]: e.target.value }))}
                    className="w-full bg-peak-bg border border-white/10 rounded-xl px-3 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
                </div>
              ))}
            </div>
            <button onClick={() => updateProfile(measurements)} className="px-6 py-2.5 bg-peak-red hover:bg-peak-red-hover text-white text-sm font-bold rounded-xl transition-colors">Save</button>
          </div>
        )}

        {activeTab === "Preferences" && (
          <div className="space-y-4">
            <h2 className="font-display font-bold text-lg text-peak-text">App preferences</h2>
            <div className="grid grid-cols-2 gap-4">
              {[{ k: "language", l: "Language", options: [["en","English"],["de","Deutsch"],["fr","Français"],["it","Italiano"]] }, { k: "currency", l: "Currency", options: [["EUR","EUR"],["USD","USD"],["CHF","CHF"],["GBP","GBP"]] }].map(({ k, l, options }) => (
                <div key={k}>
                  <label className="block text-xs text-peak-text-secondary mb-1">{l}</label>
                  <select value={profile[k]} onChange={e => updateProfile({ [k]: e.target.value })}
                    className="w-full bg-peak-bg border border-white/10 rounded-xl px-3 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue">
                    {options.map(([v, n]) => <option key={v} value={v}>{n}</option>)}
                  </select>
                </div>
              ))}
            </div>
            <div className="space-y-2 pt-2">
              <h3 className="text-sm font-semibold text-peak-text">Notifications</h3>
              {Object.keys(profile.notifications || {}).map(key => (
                <Toggle key={key} label={key.replace(/([A-Z])/g, " $1").trim()} checked={profile.notifications[key]}
                  onChange={() => updateProfile({ notifications: { ...profile.notifications, [key]: !profile.notifications[key] } })} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "Privacy" && (
          <div className="space-y-4">
            <h2 className="font-display font-bold text-lg text-peak-text">Privacy</h2>
            <Toggle label="Show activity in feed" checked={profile.showActivityFeed} onChange={() => updateProfile({ showActivityFeed: !profile.showActivityFeed })} />
            <Toggle label="Show stats publicly" checked={profile.showStats} onChange={() => updateProfile({ showStats: !profile.showStats })} />
            <div className="mt-8 border border-peak-red/20 bg-peak-red/5 rounded-xl p-4">
              <h3 className="font-semibold text-peak-red mb-2">Danger zone</h3>
              <p className="text-xs text-peak-text-secondary mb-3">Deleting your account is permanent and cannot be undone.</p>
              <button onClick={() => setShowDelete(true)} className="px-4 py-2 border border-peak-red text-peak-red text-sm font-semibold rounded-xl hover:bg-peak-red/10 transition-colors">Delete my account</button>
            </div>
            {showDelete && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
                <div className="bg-peak-card border border-white/10 rounded-2xl p-6 w-full max-w-sm">
                  <h3 className="font-bold text-peak-text mb-2">Confirm deletion</h3>
                  <p className="text-xs text-peak-text-secondary mb-4">Type your email <strong className="text-peak-text">{user?.email}</strong> to confirm.</p>
                  <input value={deleteEmail} onChange={e => setDeleteEmail(e.target.value)} placeholder="Your email"
                    className="w-full bg-peak-surface border border-white/10 rounded-xl px-3 py-2.5 text-sm text-peak-text outline-none mb-3" />
                  <div className="flex gap-3">
                    <button onClick={() => setShowDelete(false)} className="flex-1 py-2.5 border border-white/10 text-peak-text-secondary text-sm rounded-xl">Cancel</button>
                    <button disabled={deleteEmail !== user?.email} onClick={() => {
                      Object.keys(localStorage).filter(k => k.startsWith("peakxp_")).forEach(k => localStorage.removeItem(k));
                      logout();
                    }} className="flex-1 py-2.5 bg-peak-red disabled:opacity-40 text-white text-sm font-bold rounded-xl transition-colors">Delete</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "Saved" && (
          <div className="space-y-4">
            <h2 className="font-display font-bold text-lg text-peak-text">Saved resorts</h2>
            {(profile.savedResorts || []).length === 0 ? <p className="text-peak-text-secondary text-sm">No saved resorts yet.</p> : null}
            <h2 className="font-display font-bold text-lg text-peak-text mt-4">Saved hotels</h2>
            {(profile.savedHotels || []).length === 0 ? <p className="text-peak-text-secondary text-sm">No saved hotels yet.</p> : null}
          </div>
        )}

        {activeTab === "Activity" && (
          <div className="space-y-3">
            <h2 className="font-display font-bold text-lg text-peak-text">Activity</h2>
            {(() => {
              const bookings = JSON.parse(localStorage.getItem("peakxp_bookings") || "[]");
              if (!bookings.length) return <p className="text-peak-text-secondary text-sm">No activity yet.</p>;
              return bookings.map((b, i) => (
                <div key={i} className="flex gap-3 items-start bg-peak-surface rounded-xl p-3">
                  <div className="w-8 h-8 rounded-lg bg-peak-blue/10 flex items-center justify-center flex-shrink-0 text-peak-blue text-xs font-bold">B</div>
                  <div>
                    <p className="text-sm text-peak-text">{b.description || "Booking"}</p>
                    <p className="text-xs text-peak-text-secondary">{b.date || "—"}</p>
                  </div>
                </div>
              ));
            })()}
          </div>
        )}
      </div>
    </div>
  );
}