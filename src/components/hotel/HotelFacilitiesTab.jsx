import { Waves, Dumbbell, Utensils, Users, Car, Check } from "lucide-react";

export default function HotelFacilitiesTab({ hotel }) {
  return (
    <div className="space-y-5">
      {/* Spa preview */}
      <div className="bg-peak-card border border-white/5 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Waves className="h-5 w-5 text-peak-blue" />
          <h3 className="font-display font-bold text-peak-text text-base">Spa and Wellness</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
          {[
            ["Indoor Pool", hotel.spa.poolSize],
            ["Spa Area", `${hotel.spa.sqm} m\u00B2`],
            ["Treatment Rooms", "5 rooms"],
            ["Product Brand", "Susanne Kaufmann"],
          ].map(([label, val]) => (
            <div key={label} className="bg-peak-surface rounded-lg p-3">
              <p className="text-peak-text-secondary text-xs">{label}</p>
              <p className="text-peak-text font-bold text-sm">{val}</p>
            </div>
          ))}
        </div>
        <p className="text-peak-text-secondary text-sm">{hotel.spa.description}</p>
      </div>

      {/* Restaurants */}
      <div className="bg-peak-card border border-white/5 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Utensils className="h-5 w-5 text-peak-red" />
          <h3 className="font-display font-bold text-peak-text text-base">Dining ({hotel.restaurants?.length} venues)</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {hotel.restaurants?.map(r => (
            <div key={r.name} className="bg-peak-surface rounded-lg p-3">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-peak-text font-medium text-sm">{r.name}</span>
                <span className="text-peak-text-secondary text-xs">{r.seats} seats</span>
              </div>
              <span className="text-peak-blue text-xs">{r.cuisine}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Events */}
      <div className="bg-peak-card border border-white/5 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Users className="h-5 w-5 text-peak-green" />
          <h3 className="font-display font-bold text-peak-text text-base">Meetings and Events</h3>
        </div>
        <p className="text-peak-text-secondary text-sm mb-3">Up to {hotel.events.maxCapacity} guests · {hotel.events.largestRoomSqm} m² main hall</p>
        <button className="bg-peak-surface border border-white/10 text-peak-text-secondary text-xs px-4 py-2 rounded-lg hover:text-peak-text transition-colors">Enquire about events</button>
      </div>

      {/* Parking */}
      <div className="bg-peak-card border border-white/5 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-2">
          <Car className="h-5 w-5 text-peak-text-secondary" />
          <h3 className="font-display font-bold text-peak-text text-base">Parking</h3>
        </div>
        <p className="text-peak-text-secondary text-sm">{hotel.parking.type} · €{hotel.parking.pricePerDay}/day</p>
      </div>

      {/* Full amenities */}
      <div className="bg-peak-card border border-white/5 rounded-xl p-5">
        <h3 className="font-display font-bold text-peak-text text-base mb-4">All amenities</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {hotel.amenities?.map(a => (
            <div key={a} className="flex items-center gap-2 text-sm">
              <Check className="h-3.5 w-3.5 text-peak-green flex-shrink-0" />
              <span className="text-peak-text-secondary">{a}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}