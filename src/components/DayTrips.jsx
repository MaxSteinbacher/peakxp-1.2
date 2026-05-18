import { useEffect, useState } from "react";
import { MapPin, Clock } from "lucide-react";
import { useT } from "../lib/i18n";

const dayTripResorts = [
  {
    id: "skiwelt",
    name: "SkiWelt Wilder Kaiser",
    region: "Brixental, Austria",
    distance: "120 km",
    driveTime: "1h 20min",
    pisteKm: 284,
    lifts: 90,
    image: "https://picsum.photos/seed/skiwelt/600/400",
  },
  {
    id: "kitzski",
    name: "KitzSki",
    region: "Kitzbühel, Austria",
    distance: "140 km",
    driveTime: "1h 35min",
    pisteKm: 220,
    lifts: 57,
    image: "https://picsum.photos/seed/kitzski/600/400",
  },
  {
    id: "skijuwel",
    name: "Skijuwel Alpbachtal",
    region: "Alpbach, Austria",
    distance: "110 km",
    driveTime: "1h 10min",
    pisteKm: 109,
    lifts: 45,
    image: "https://picsum.photos/seed/skijuwel/600/400",
  },
  {
    id: "zillertal",
    name: "Zillertalarena",
    region: "Zillertal, Austria",
    distance: "145 km",
    driveTime: "1h 40min",
    pisteKm: 167,
    lifts: 52,
    image: "https://picsum.photos/seed/zillertal/600/400",
  },
  {
    id: "steinplatte",
    name: "Steinplatte",
    region: "Waidring, Austria",
    distance: "100 km",
    driveTime: "1h 05min",
    pisteKm: 42,
    lifts: 14,
    image: "https://picsum.photos/seed/steinplatte/600/400",
  },
  {
    id: "stjohann",
    name: "St. Johann in Tirol",
    region: "Tirol, Austria",
    distance: "115 km",
    driveTime: "1h 15min",
    pisteKm: 60,
    lifts: 22,
    image: "https://picsum.photos/seed/stjohann/600/400",
  },
];

export default function DayTrips() {
  const t = useT();
  const [city, setCity] = useState("Munich");

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`
        );
        const data = await res.json();
        const detected =
          data.address?.city ||
          data.address?.town ||
          data.address?.village ||
          data.address?.county;
        if (detected) setCity(detected);
      },
      () => {} // silently fall back to Munich
    );
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <MapPin className="h-4 w-4 text-peak-blue" />
          <span className="text-peak-blue text-xs font-semibold uppercase tracking-widest">Based on your location</span>
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-peak-text">{t('day_trips_from')} {city}</h2>
        <p className="text-peak-text-secondary text-sm mt-1">{t('day_trips_subline')}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {dayTripResorts.map((resort) => (
          <div
            key={resort.id}
            className="group rounded-xl overflow-hidden bg-peak-card border border-white/5 hover:border-peak-blue/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          >
            <div className="relative h-32 overflow-hidden">
              <img
                src={resort.image}
                alt={resort.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-peak-bg/80 to-transparent" />
              <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-peak-bg/70 backdrop-blur-sm px-2 py-0.5 rounded-md">
                <Clock className="h-3 w-3 text-peak-blue" />
                <span className="text-white text-xs font-medium">{resort.driveTime}</span>
              </div>
            </div>
            <div className="p-3">
              <h3 className="font-display font-bold text-peak-text text-base leading-tight mb-0.5">{resort.name}</h3>
              <p className="text-peak-text-secondary text-xs mb-2">{resort.region}</p>
              <div className="flex items-center gap-2 text-xs text-peak-text-secondary">
                <span>{resort.pisteKm}km</span>
                <span className="text-white/20">·</span>
                <span>{resort.lifts} lifts</span>
              </div>
              <div className="mt-2 flex items-center gap-1 text-peak-blue text-xs font-medium">
                <MapPin className="h-3 w-3" />
                {resort.distance}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}