import { Star } from "lucide-react";
import { useState } from "react";

const REVIEW_CATEGORIES = ["Overall", "Location", "Cleanliness", "Comfort", "Facilities", "Value", "Staff"];
const TRAVELLER_TYPES = ["Solo", "Couple", "Family", "Business", "Group"];

function StarPicker({ value, onChange }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <button key={i} onClick={() => onChange(i)}>
          <Star className={`h-5 w-5 ${i <= value ? "text-yellow-400 fill-yellow-400" : "text-peak-text-secondary/30"}`} />
        </button>
      ))}
    </div>
  );
}

export default function HotelReviewsTab({ hotel }) {
  const [showForm, setShowForm] = useState(false);
  const [ratings, setRatings] = useState({});
  const [form, setForm] = useState({ title: "", text: "", stayDate: "", roomType: "", travellerType: "" });

  if (hotel.reviewCount === 0 && !showForm) {
    return (
      <div className="bg-peak-card border border-white/5 rounded-2xl p-12 text-center max-w-xl mx-auto">
        <p className="text-peak-text-secondary text-5xl font-bold mb-4">—</p>
        <h3 className="font-display font-bold text-peak-text text-xl mb-2">No reviews yet</h3>
        <p className="text-peak-text-secondary text-sm mb-6">Be the first guest to review {hotel.name} on PeakXP</p>
        <button onClick={() => setShowForm(true)} className="bg-peak-red hover:bg-peak-red-hover text-white font-bold px-8 py-3 rounded-xl transition-colors">
          Write a review
        </button>
        <p className="text-peak-text-secondary text-xs mt-4">Reviews from verified PeakXP bookings will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {hotel.reviewCount === 0 && (
        <div className="bg-peak-card border border-white/5 rounded-xl p-5 text-center">
          <p className="text-peak-text-secondary text-sm">No reviews yet — be the first</p>
        </div>
      )}
      <div className="bg-peak-card border border-white/5 rounded-xl p-6">
        <h3 className="font-display font-bold text-peak-text text-lg mb-4">Write a review</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {REVIEW_CATEGORIES.map(cat => (
              <div key={cat} className="flex items-center justify-between">
                <span className="text-peak-text-secondary text-sm">{cat}</span>
                <StarPicker value={ratings[cat] || 0} onChange={v => setRatings(r => ({...r, [cat]: v}))} />
              </div>
            ))}
          </div>
          <input value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} placeholder="Review title" className="w-full bg-peak-surface border border-white/10 rounded-lg px-3 py-2 text-peak-text text-sm outline-none focus:border-peak-blue" />
          <textarea value={form.text} onChange={e => setForm(f => ({...f, text: e.target.value}))} placeholder="Share your experience..." rows={4} className="w-full bg-peak-surface border border-white/10 rounded-lg px-3 py-2 text-peak-text text-sm outline-none focus:border-peak-blue resize-none" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input type="month" value={form.stayDate} onChange={e => setForm(f => ({...f, stayDate: e.target.value}))} placeholder="Stay date" className="bg-peak-surface border border-white/10 rounded-lg px-3 py-2 text-peak-text text-sm outline-none focus:border-peak-blue" />
            <select value={form.roomType} onChange={e => setForm(f => ({...f, roomType: e.target.value}))} className="bg-peak-surface border border-white/10 rounded-lg px-3 py-2 text-peak-text text-sm outline-none focus:border-peak-blue">
              <option value="">Room type</option>
              {hotel.rooms?.map(r => <option key={r.id}>{r.name}</option>)}
            </select>
            <select value={form.travellerType} onChange={e => setForm(f => ({...f, travellerType: e.target.value}))} className="bg-peak-surface border border-white/10 rounded-lg px-3 py-2 text-peak-text text-sm outline-none focus:border-peak-blue">
              <option value="">Traveller type</option>
              {TRAVELLER_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <button className="bg-peak-red hover:bg-peak-red-hover text-white font-bold px-6 py-2.5 rounded-xl transition-colors">
            Submit review
          </button>
        </div>
      </div>
    </div>
  );
}