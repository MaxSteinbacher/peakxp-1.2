import { Waves, Flame, Dumbbell } from "lucide-react";
import { useState } from "react";

export default function HotelSpaTab({ hotel }) {
  const { spa } = hotel;
  const [form, setForm] = useState({ name: "", email: "", treatment: "", date: "" });

  return (
    <div className="space-y-6">
      {/* Pool */}
      <div className="bg-peak-card border border-white/5 rounded-xl overflow-hidden">
        <div className="h-52 overflow-hidden">
          <img src={hotel.images[3]} alt="Indoor Pool" className="w-full h-full object-cover" />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <Waves className="h-5 w-5 text-peak-blue" />
            <h3 className="font-display font-bold text-peak-text text-lg">Indoor Pool</h3>
            <span className="text-xs bg-peak-blue/10 text-peak-blue px-2 py-0.5 rounded-full">{spa.poolSize}</span>
          </div>
          <p className="text-peak-text-secondary text-sm">15×5m indoor pool with experience showers and winter garden overlooking the hotel garden.</p>
        </div>
      </div>

      {/* Relaxation */}
      <div className="bg-peak-card border border-white/5 rounded-xl overflow-hidden">
        <div className="h-48 overflow-hidden">
          <img src={hotel.images[4]} alt="Relaxation area" className="w-full h-full object-cover" />
        </div>
        <div className="p-5">
          <h3 className="font-display font-bold text-peak-text text-base mb-1">Relaxation Area</h3>
          <p className="text-peak-text-secondary text-sm">Winter garden with loungers, fireplace relaxation room and outdoor terrace.</p>
        </div>
      </div>

      {/* Sauna landscape */}
      <div className="bg-peak-card border border-white/5 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="h-5 w-5 text-peak-red" />
          <h3 className="font-display font-bold text-peak-text text-lg">Sauna Landscape</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {spa.saunaTypes?.map(s => (
            <div key={s} className="bg-peak-surface border border-white/5 rounded-lg px-4 py-3">
              <span className="text-peak-text text-sm font-medium">{s}</span>
            </div>
          ))}
        </div>
        <p className="text-peak-text-secondary text-sm mt-4">Sauna landscape expanded 2017. Includes relaxation room with fireplace.</p>
      </div>

      {/* Treatments */}
      <div className="bg-peak-card border border-white/5 rounded-xl p-6">
        <h3 className="font-display font-bold text-peak-text text-lg mb-2">Treatments</h3>
        <p className="text-peak-text-secondary text-sm mb-4">{spa.treatments}</p>
        <div className="bg-peak-surface border border-white/5 rounded-lg p-4">
          <h4 className="text-peak-text text-sm font-semibold mb-3">Request a treatment</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} placeholder="Your name" className="bg-peak-card border border-white/10 rounded-lg px-3 py-2 text-peak-text text-sm outline-none focus:border-peak-blue" />
            <input value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} placeholder="Email address" className="bg-peak-card border border-white/10 rounded-lg px-3 py-2 text-peak-text text-sm outline-none focus:border-peak-blue" />
            <select value={form.treatment} onChange={e => setForm(f => ({...f, treatment: e.target.value}))} className="bg-peak-card border border-white/10 rounded-lg px-3 py-2 text-peak-text text-sm outline-none focus:border-peak-blue">
              <option value="">Select treatment type</option>
              <option>Massage</option>
              <option>Facial</option>
              <option>Body wrap</option>
              <option>Susanne Kaufmann signature</option>
            </select>
            <input type="date" value={form.date} onChange={e => setForm(f => ({...f, date: e.target.value}))} className="bg-peak-card border border-white/10 rounded-lg px-3 py-2 text-peak-text text-sm outline-none focus:border-peak-blue" />
          </div>
          <button className="mt-3 bg-peak-red hover:bg-peak-red-hover text-white text-sm px-5 py-2 rounded-lg font-medium transition-colors">Send enquiry</button>
        </div>
      </div>

      {/* Fitness */}
      <div className="bg-peak-card border border-white/5 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-2">
          <Dumbbell className="h-5 w-5 text-peak-green" />
          <h3 className="font-display font-bold text-peak-text text-lg">Fitness Centre</h3>
        </div>
        <p className="text-peak-text-secondary text-sm">{spa.fitnessEquipment}. New modern fitness wing built 2019.</p>
        <p className="text-peak-text-secondary text-xs mt-2">Open daily — see reception for hours</p>
      </div>

      <div className="bg-peak-card border border-white/5 rounded-xl p-5 text-center">
        <p className="text-peak-text font-bold text-base mb-1">Kitz Spa — {spa.sqm} m²</p>
        <p className="text-peak-text-secondary text-sm">Open daily to hotel guests. For day spa enquiries contact reception.</p>
      </div>
    </div>
  );
}