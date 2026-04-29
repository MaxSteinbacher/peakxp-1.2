import { useState } from "react";
import { X, Heart, MessageCircle, Bell, Tag, Percent, Plus } from "lucide-react";

const MOCK_NOTIFS = [
  { id: 1, type: "social", icon: "heart", color: "bg-pink-500/20 text-pink-400", text: "Marco liked your run at Verbier", time: "2m ago", unread: true },
  { id: 2, type: "alerts", icon: "bell", color: "bg-peak-blue/20 text-peak-blue", text: "New snow alert: Zermatt — 28cm overnight", time: "45m ago", unread: true },
  { id: 3, type: "trips", icon: "tag", color: "bg-peak-green/20 text-peak-green", text: "Your flight price dropped €34 — book now", time: "1h ago", unread: true },
  { id: 4, type: "social", icon: "message", color: "bg-purple-500/20 text-purple-400", text: "Sophie commented on your photo at Chamonix", time: "3h ago", unread: false },
  { id: 5, type: "offers", icon: "percent", color: "bg-yellow-500/20 text-yellow-400", text: "Flash deal: 20% off lift passes at Val d'Isere this weekend", time: "5h ago", unread: false },
  { id: 6, type: "trips", icon: "bell", color: "bg-peak-blue/20 text-peak-blue", text: "Booking reminder: Ski school starts tomorrow at 09:00", time: "Yesterday", unread: false },
  { id: 7, type: "alerts", icon: "bell", color: "bg-peak-blue/20 text-peak-blue", text: "Verbier — all lifts open today, excellent visibility", time: "Yesterday", unread: false },
  { id: 8, type: "offers", icon: "percent", color: "bg-yellow-500/20 text-yellow-400", text: "Exclusive: Free ski boot fitting with equipment rental at PeakXP partners", time: "2 days ago", unread: false },
];

const TABS = ["All", "Social", "Trips", "Alerts", "Offers"];
const iconMap = { heart: Heart, message: MessageCircle, bell: Bell, tag: Tag, percent: Percent };

export default function NotificationsPanel({ onClose }) {
  const [tab, setTab] = useState("All");
  const [read, setRead] = useState([]);
  const [showAlertForm, setShowAlertForm] = useState(false);
  const [alertForm, setAlertForm] = useState({ type: "Flight", route: "", price: "", freq: "As soon as it drops" });

  const filtered = MOCK_NOTIFS.filter(n => {
    if (tab === "All") return true;
    return n.type === tab.toLowerCase();
  });

  function markAllRead() {
    setRead(MOCK_NOTIFS.map(n => n.id));
  }

  const isRead = (id) => read.includes(id);

  return (
    <div className="absolute top-full right-0 mt-2 w-96 bg-peak-card border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <span className="font-bold text-peak-text text-base">Notifications</span>
        <div className="flex items-center gap-3">
          <button onClick={markAllRead} className="text-xs text-peak-blue hover:underline">Mark all as read</button>
          <button onClick={onClose} className="text-peak-text-secondary hover:text-peak-text transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 px-3 pb-2">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${tab === t ? "bg-peak-red/20 text-peak-red" : "text-peak-text-secondary hover:text-peak-text"}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Notifications list */}
      <div className="max-h-80 overflow-y-auto">
        {filtered.map(n => {
          const Icon = iconMap[n.icon] || Bell;
          const unread = n.unread && !isRead(n.id);
          return (
            <div key={n.id} onClick={() => setRead(r => [...r, n.id])}
              className={`flex items-start gap-3 px-4 py-3 border-b border-white/5 cursor-pointer hover:bg-white/3 transition-colors ${unread ? "bg-white/2" : ""}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${n.color}`}>
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm leading-snug ${unread ? "text-peak-text" : "text-peak-text-secondary"}`}>{n.text}</p>
                <p className="text-xs text-peak-text-secondary mt-0.5">{n.time}</p>
              </div>
              {unread && <div className="w-2 h-2 rounded-full bg-peak-red flex-shrink-0 mt-1.5" />}
            </div>
          );
        })}
      </div>

      {/* Price alert creation — shown in Trips tab */}
      {tab === "Trips" && (
        <div className="px-4 py-3 border-t border-white/5">
          <button onClick={() => setShowAlertForm(v => !v)} className="flex items-center gap-1.5 text-sm text-peak-blue hover:underline">
            <Plus className="h-4 w-4" /> Add price alert
          </button>
          {showAlertForm && (
            <div className="mt-3 space-y-3">
              <select value={alertForm.type} onChange={e => setAlertForm(f => ({ ...f, type: e.target.value }))}
                className="w-full bg-peak-surface border border-white/10 rounded-xl px-3 py-2 text-sm text-peak-text outline-none">
                {["Flight", "Hotel", "Train", "Lift pass"].map(t => <option key={t}>{t}</option>)}
              </select>
              <input value={alertForm.route} onChange={e => setAlertForm(f => ({ ...f, route: e.target.value }))} placeholder="Route or property"
                className="w-full bg-peak-surface border border-white/10 rounded-xl px-3 py-2 text-sm text-peak-text outline-none" />
              <div className="flex gap-2">
                <input type="number" value={alertForm.price} onChange={e => setAlertForm(f => ({ ...f, price: e.target.value }))} placeholder="Target price (€)"
                  className="flex-1 bg-peak-surface border border-white/10 rounded-xl px-3 py-2 text-sm text-peak-text outline-none" />
                <select value={alertForm.freq} onChange={e => setAlertForm(f => ({ ...f, freq: e.target.value }))}
                  className="flex-1 bg-peak-surface border border-white/10 rounded-xl px-3 py-2 text-sm text-peak-text outline-none">
                  {["As soon as it drops", "Daily digest", "Weekly summary"].map(f => <option key={f}>{f}</option>)}
                </select>
              </div>
              <button className="w-full py-2 bg-peak-red hover:bg-peak-red-hover text-white text-sm font-semibold rounded-xl transition-colors">
                Create alert
              </button>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="px-4 py-3 border-t border-white/5">
        <button className="text-xs text-peak-text-secondary hover:text-peak-text transition-colors">
          Manage notification preferences →
        </button>
      </div>
    </div>
  );
}