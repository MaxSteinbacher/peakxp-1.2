import { MapPin, Phone, ExternalLink, Train } from "lucide-react";
import PeakMap from "../shared/PeakMap";

export default function HotelLocationTab({ hotel }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${hotel.coordinates.lat},${hotel.coordinates.lon}`;
  return (
    <div className="space-y-6">
      <PeakMap
        center={[hotel.coordinates.lon, hotel.coordinates.lat]}
        zoom={14}
        pitch={45}
        bearing={0}
        height="h-96"
        maxBounds={[
          [hotel.coordinates.lon - 0.05, hotel.coordinates.lat - 0.05],
          [hotel.coordinates.lon + 0.05, hotel.coordinates.lat + 0.05]
        ]}
        onMapLoad={(map) => {
          new window.maptilersdk.Marker()
            .setLngLat([hotel.coordinates.lon, hotel.coordinates.lat])
            .addTo(map);
        }}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-peak-card border border-white/5 rounded-xl p-5 space-y-3">
          <h3 className="font-display font-bold text-peak-text text-base">Address and Contact</h3>
          <div className="flex items-start gap-2 text-sm">
            <MapPin className="h-4 w-4 text-peak-red flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-peak-text">{hotel.address}</p>
              <p className="text-peak-text">{hotel.city}, {hotel.country}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-peak-text-secondary flex-shrink-0" />
            <a href={`tel:${hotel.phone}`} className="text-peak-text-secondary hover:text-peak-blue transition-colors">{hotel.phone}</a>
          </div>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-peak-blue text-sm hover:underline">
            <ExternalLink className="h-4 w-4" />Open in Google Maps
          </a>
        </div>
        <div className="bg-peak-card border border-white/5 rounded-xl p-5 space-y-3">
          <h3 className="font-display font-bold text-peak-text text-base">Getting here</h3>
          <div className="flex items-start gap-2 text-sm">
            <Train className="h-4 w-4 text-peak-blue flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-peak-text font-medium">{hotel.publicTransport?.nearestStation}</p>
              <p className="text-peak-text-secondary">{hotel.publicTransport?.distanceKm} km from hotel</p>
              {hotel.publicTransport?.shuttleAvailable && (
                <p className="text-peak-green text-xs mt-1">Shuttle service available — enquire at reception</p>
              )}
            </div>
          </div>
          <div className="space-y-2 mt-2">
            {hotel.nearbyAttractions?.map(a => (
              <div key={a.name} className="flex items-center justify-between text-sm border-b border-white/5 pb-1.5">
                <span className="text-peak-text">{a.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-peak-text-secondary text-xs">{a.type}</span>
                  <span className="bg-peak-blue/10 text-peak-blue text-xs px-2 py-0.5 rounded-full">{a.distanceKm} km</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}