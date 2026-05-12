import { Phone, Mail, Globe, MapPin, ExternalLink, Waves, Dumbbell, Wifi, UtensilsCrossed, Wine, Car, Users, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import PeakMap from "../shared/PeakMap";

export default function HotelOverviewTab({ hotel }) {
  const [historyOpen, setHistoryOpen] = useState(false);

  const amenityHighlights = [
    { label: "Indoor Pool", icon: Waves },
    { label: "Spa 900m²", icon: Waves },
    { label: "Free WiFi", icon: Wifi },
    { label: "Restaurant", icon: UtensilsCrossed },
    { label: "Bar / Lounge", icon: Wine },
    { label: "Fitness Centre", icon: Dumbbell },
    { label: "Parking", icon: Car },
    { label: "Conference Rooms", icon: Users },
  ];

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${hotel.coordinates.lat},${hotel.coordinates.lon}`;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: description, history, design */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-peak-card border border-white/5 rounded-xl p-6">
            <h2 className="font-display font-bold text-peak-text text-xl mb-4">About {hotel.name}</h2>
            <p className="text-peak-text-secondary leading-relaxed text-sm">{hotel.description}</p>
          </div>

          {/* History timeline */}
          <div className="bg-peak-card border border-white/5 rounded-xl p-5">
            <button
              className="flex items-center justify-between w-full"
              onClick={() => setHistoryOpen(o => !o)}
            >
              <h3 className="font-display font-bold text-peak-text text-base">Our history</h3>
              {historyOpen ? <ChevronUp className="h-4 w-4 text-peak-text-secondary" /> : <ChevronDown className="h-4 w-4 text-peak-text-secondary" />}
            </button>
            {historyOpen && (
              <div className="mt-4 space-y-3">
                {hotel.history?.map((h, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="flex-shrink-0 bg-peak-red/10 text-peak-red text-xs font-bold px-2 py-1 rounded-lg min-w-[80px] text-center leading-tight">{h.year}</span>
                    <p className="text-peak-text-secondary text-sm leading-relaxed">{h.event}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Design philosophy */}
          <div className="border-l-4 border-peak-red pl-5 py-2">
            <p className="italic text-peak-text-secondary text-sm leading-relaxed">
              "The design concept blends generous use of glass and natural daylight with mountain larch wood floors, reclaimed timber panelling, modern furniture upholstered in grey and red loden, open fireplaces, antler decorations and designer lighting — redefining Tyrolean Gemütlichkeit for the contemporary traveller."
            </p>
            <p className="text-peak-text-secondary text-xs mt-2">— Ursula Schelle-Müller, Interior Designer</p>
          </div>
        </div>

        {/* Right: quick facts + contact */}
        <div className="space-y-4">
          <div className="bg-peak-card border border-white/5 rounded-xl p-5">
            <h3 className="font-display font-bold text-peak-text text-base mb-4">Quick facts</h3>
            <div className="space-y-2">
              {[
                ["Category", hotel.quickFacts?.category],
                ["Rooms", hotel.quickFacts?.rooms],
                ["Owner", hotel.quickFacts?.owner],
                ["Director", hotel.quickFacts?.director],
                ["Architect", hotel.quickFacts?.architect],
                ["Interior Design", hotel.quickFacts?.interiorDesign],
                ["Membership", hotel.quickFacts?.membership],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-2 text-sm border-b border-white/5 pb-2">
                  <span className="text-peak-text-secondary flex-shrink-0">{label}</span>
                  <span className="text-peak-text font-medium text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-peak-card border border-white/5 rounded-xl p-5">
            <h3 className="font-display font-bold text-peak-text text-base mb-4">Contact</h3>
            <div className="space-y-3">
              <a href={`tel:${hotel.phone}`} className="flex items-center gap-2 text-peak-text-secondary hover:text-peak-blue text-sm transition-colors">
                <Phone className="h-4 w-4 flex-shrink-0" />{hotel.phone}
              </a>
              <a href={`mailto:${hotel.email}`} className="flex items-center gap-2 text-peak-text-secondary hover:text-peak-blue text-sm transition-colors">
                <Mail className="h-4 w-4 flex-shrink-0" />{hotel.email}
              </a>
              <a href={`https://${hotel.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-peak-text-secondary hover:text-peak-blue text-sm transition-colors">
                <Globe className="h-4 w-4 flex-shrink-0" />{hotel.website}
              </a>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-peak-blue/10 text-peak-blue border border-peak-blue/20 rounded-lg px-3 py-2 text-sm hover:bg-peak-blue/20 transition-colors mt-2">
                <ExternalLink className="h-4 w-4" />Get directions
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mini map */}
      <div>
        <h3 className="font-display font-bold text-peak-text text-base mb-3">Location</h3>
        <PeakMap
          center={[hotel.coordinates.lon, hotel.coordinates.lat]}
          zoom={14}
          pitch={45}
          bearing={0}
          height="h-64"
          maxBounds={[
            [hotel.coordinates.lon - 0.05, hotel.coordinates.lat - 0.05],
            [hotel.coordinates.lon + 0.05, hotel.coordinates.lat + 0.05]
          ]}
          onMapLoad={(map) => {
            new window.maptilersdk.Marker()
              .setLngLat([hotel.coordinates.lon, hotel.coordinates.lat])
              .addTo(map);
          }}
          showRotateControl={false}
        />
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {hotel.nearbyAttractions?.map(a => (
            <div key={a.name} className="bg-peak-card border border-white/5 rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <MapPin className="h-3 w-3 text-peak-red flex-shrink-0" />
                <span className="text-peak-blue text-xs font-bold">{a.distanceKm} km</span>
              </div>
              <p className="text-peak-text text-xs font-medium">{a.name}</p>
              <p className="text-peak-text-secondary text-xs">{a.type}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Amenity highlights */}
      <div>
        <h3 className="font-display font-bold text-peak-text text-base mb-3">Facilities at a glance</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {amenityHighlights.map(({ label, icon: Icon }) => (
            <div key={label} className="bg-peak-card border border-white/5 rounded-xl p-4 flex flex-col items-center gap-2 text-center">
              <Icon className="h-6 w-6 text-peak-blue" />
              <span className="text-peak-text text-xs font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}