import { Wifi, Tv, Shield, Droplets, Users, ChevronRight } from "lucide-react";

const AMENITY_ICONS = { "Free WiFi": Wifi, "Flat-screen TV": Tv, "Safe": Shield, "Raindance shower": Droplets };

export default function HotelRoomsTab({ hotel }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-peak-text-secondary text-sm">{hotel.totalRooms} rooms · {hotel.totalSuites} suites</p>
      </div>
      {hotel.rooms?.map((room, idx) => (
        <div key={room.id} className="bg-peak-card border border-white/5 rounded-xl overflow-hidden flex flex-col sm:flex-row">
          <div className="w-full sm:w-52 h-40 sm:h-auto flex-shrink-0 overflow-hidden">
            <img
              src={room.images?.[0] || hotel.images[idx % hotel.images.length]}
              alt={room.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-3 mb-1">
                <h3 className="font-display font-bold text-peak-text text-lg">{room.name}</h3>
                <div className="flex items-center gap-1 text-peak-text-secondary text-xs flex-shrink-0">
                  <Users className="h-3.5 w-3.5" /> Max {room.maxGuests}
                </div>
              </div>
              <p className="text-peak-text-secondary text-sm leading-relaxed mb-3">{room.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {room.amenities?.slice(0, 5).map(a => (
                  <span key={a} className="text-xs bg-peak-surface text-peak-text-secondary px-2 py-0.5 rounded-full border border-white/5">{a}</span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-peak-text-secondary text-xs">From </span>
                <span className="text-peak-text font-bold text-xl">€{room.pricePerNight}</span>
                <span className="text-peak-text-secondary text-xs"> /night</span>
              </div>
              <div className="flex gap-2">
                <button className="border border-white/10 text-peak-text-secondary text-xs px-4 py-2 rounded-lg hover:text-peak-text transition-colors">
                  View details
                </button>
                <button className="bg-peak-red hover:bg-peak-red-hover text-white text-xs px-4 py-2 rounded-lg font-medium transition-colors">
                  Reserve
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}