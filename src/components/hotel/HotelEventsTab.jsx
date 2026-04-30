import { Users, Maximize2 } from "lucide-react";
import { useState } from "react";

export default function HotelEventsTab({ hotel }) {
  const { events } = hotel;
  const [form, setForm] = useState({ name: "", company: "", email: "", type: "", guests: "", dates: "", notes: "" });

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Max capacity", value: `${events.maxCapacity} people`, icon: Users },
          { label: "Meeting rooms", value: `${events.roomCount} rooms`, icon: Maximize2 },
          { label: "Largest space", value: `${events.largestRoomSqm} m²`, icon: Maximize2 },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-peak-card border border-white/5 rounded-xl p-5 text-center">
            <Icon className="h-6 w-6 text-peak-blue mx-auto mb-2" />
            <p className="text-peak-text font-bold text-xl">{value}</p>
            <p className="text-peak-text-secondary text-xs">{label}</p>
          </div>
        ))}
      </div>

      <p className="text-peak-text-secondary text-sm leading-relaxed">{events.description}</p>

      {/* Room listing */}
      <div className="space-y-3">
        {events.rooms?.map(r => (
          <div key={r.name} className="bg-peak-card border border-white/5 rounded-xl p-5 flex items-center justify-between gap-4">
            <div>
              <h4 className="text-peak-text font-semibold text-sm">{r.name}</h4>
              <p className="text-peak-text-secondary text-xs mt-0.5">{r.features}</p>
            </div>
            <div className="flex gap-4 text-right flex-shrink-0">
              <div>
                <p className="text-peak-text font-bold text-sm">Up to {r.capacity}</p>
                <p className="text-peak-text-secondary text-xs">guests</p>
              </div>
              {r.sqm && (
                <div>
                  <p className="text-peak-text font-bold text-sm">{r.sqm} m²</p>
                  <p className="text-peak-text-secondary text-xs">floor area</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Request proposal form */}
      <div className="bg-peak-card border border-white/5 rounded-xl p-6">
        <h3 className="font-display font-bold text-peak-text text-lg mb-4">Request a proposal</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} placeholder="Your name" className="bg-peak-surface border border-white/10 rounded-lg px-3 py-2 text-peak-text text-sm outline-none focus:border-peak-blue" />
          <input value={form.company} onChange={e => setForm(f => ({...f, company: e.target.value}))} placeholder="Company" className="bg-peak-surface border border-white/10 rounded-lg px-3 py-2 text-peak-text text-sm outline-none focus:border-peak-blue" />
          <input value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} placeholder="Email address" className="bg-peak-surface border border-white/10 rounded-lg px-3 py-2 text-peak-text text-sm outline-none focus:border-peak-blue" />
          <select value={form.type} onChange={e => setForm(f => ({...f, type: e.target.value}))} className="bg-peak-surface border border-white/10 rounded-lg px-3 py-2 text-peak-text text-sm outline-none focus:border-peak-blue">
            <option value="">Event type</option>
            <option>Conference</option>
            <option>Wedding</option>
            <option>Incentive</option>
            <option>Product launch</option>
            <option>Other</option>
          </select>
          <input value={form.guests} onChange={e => setForm(f => ({...f, guests: e.target.value}))} placeholder="Expected guests" type="number" className="bg-peak-surface border border-white/10 rounded-lg px-3 py-2 text-peak-text text-sm outline-none focus:border-peak-blue" />
          <input value={form.dates} onChange={e => setForm(f => ({...f, dates: e.target.value}))} placeholder="Preferred dates" className="bg-peak-surface border border-white/10 rounded-lg px-3 py-2 text-peak-text text-sm outline-none focus:border-peak-blue" />
          <textarea value={form.notes} onChange={e => setForm(f => ({...f, notes: e.target.value}))} placeholder="Additional notes" rows={3} className="sm:col-span-2 bg-peak-surface border border-white/10 rounded-lg px-3 py-2 text-peak-text text-sm outline-none focus:border-peak-blue resize-none" />
        </div>
        <button className="mt-3 bg-peak-red hover:bg-peak-red-hover text-white text-sm px-6 py-2.5 rounded-lg font-medium transition-colors">Send proposal request</button>
      </div>
    </div>
  );
}