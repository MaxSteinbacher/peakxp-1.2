import { UtensilsCrossed, Users } from "lucide-react";

export default function HotelDiningTab({ hotel }) {
  return (
    <div className="space-y-4">
      {hotel.restaurants?.map((r, idx) => (
        <div key={r.name} className="bg-peak-card border border-white/5 rounded-xl p-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="w-full sm:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0 bg-peak-surface">
              <img
                src={hotel.images[(6 + idx) % hotel.images.length]}
                alt={r.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h3 className="font-display font-bold text-peak-text text-lg">{r.name}</h3>
                <span className="text-xs bg-peak-blue/10 text-peak-blue border border-peak-blue/20 px-2 py-0.5 rounded-full">{r.cuisine}</span>
                <span className="text-xs bg-peak-surface text-peak-text-secondary px-2 py-0.5 rounded-full border border-white/5 flex items-center gap-1"><Users className="h-3 w-3" />{r.seats} seats</span>
                {r.reservationRequired && (
                  <span className="text-xs bg-peak-red/10 text-peak-red border border-peak-red/20 px-2 py-0.5 rounded-full">Reservation required</span>
                )}
              </div>
              <p className="text-peak-text-secondary text-sm leading-relaxed mb-3">{r.description}</p>
              <p className="text-peak-text-secondary text-xs mb-3">Open daily — see reception for seasonal hours</p>
              <button className="bg-peak-red hover:bg-peak-red-hover text-white text-xs px-4 py-2 rounded-lg font-medium transition-colors">
                Reserve a table
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}