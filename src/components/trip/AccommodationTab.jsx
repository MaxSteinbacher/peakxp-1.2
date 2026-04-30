import AccommodationFilter from "./AccommodationFilter";
import { Link } from "react-router-dom";

const mockProperties = [
  { id: "hotel-kitzhof", name: "Hotel Kitzhof Mountain Design Resort", type: "Hotel", location: "Kitzbühel, Austria", price: 195, rating: 9.1, image: "https://media.base44.com/images/public/69f1c737747c83c0b091a543/18c29298b_AuenansichtfrontHotelKitzhof.jpg", stars: 4 },
  { id: 2, name: "Alpenhof Boutique Hotel", type: "Hotel", location: "Verbier, Switzerland", price: 189, rating: 9.2, image: "https://picsum.photos/seed/hotel1/400/250", stars: 4 },
  { id: 3, name: "Chalet Blanc", type: "Chalet", location: "Courchevel, France", price: 420, rating: 9.5, image: "https://picsum.photos/seed/hotel2/400/250", stars: 5 },
  { id: 4, name: "Mountain View Apartments", type: "Apartment", location: "Zermatt, Switzerland", price: 95, rating: 8.7, image: "https://picsum.photos/seed/hotel3/400/250", stars: 3 },
  { id: 5, name: "Tyrolean B&B", type: "B&B", location: "St. Anton, Austria", price: 72, rating: 8.4, image: "https://picsum.photos/seed/hotel4/400/250", stars: 3 },
  { id: 6, name: "Summit Lodge", type: "Hotel", location: "Val Thorens, France", price: 155, rating: 8.9, image: "https://picsum.photos/seed/hotel5/400/250", stars: 4 },
  { id: 7, name: "The Ski Haus", type: "Entire home", location: "Kitzbühel, Austria", price: 310, rating: 9.1, image: "https://picsum.photos/seed/hotel6/400/250", stars: 5 },
];

function PropertyCard({ p }) {
  const href = typeof p.id === "string" ? `/hotel/${p.id}` : "#";
  return (
    <Link to={href} className="bg-peak-card border border-white/5 hover:border-peak-blue/30 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer group block">
      <div className="relative h-44 overflow-hidden">
        <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 left-3 bg-peak-bg/80 backdrop-blur-sm px-2 py-0.5 rounded text-xs font-medium text-peak-text">{p.type}</div>
        <div className="absolute top-3 right-3 bg-peak-blue text-white text-xs font-bold px-2 py-0.5 rounded">{p.rating}</div>
      </div>
      <div className="p-5">
        <h3 className="font-display font-bold text-peak-text text-lg">{p.name}</h3>
        <p className="text-peak-text-secondary text-sm mt-0.5 mb-3">{p.location}</p>
        <div className="flex items-center justify-between mb-3">
          <div className="flex">
            {Array.from({ length: p.stars }).map((_, i) => (
              <span key={i} className="text-yellow-400 text-xs">★</span>
            ))}
          </div>
          <span className="text-peak-text font-bold">€{p.price}<span className="text-peak-text-secondary text-xs font-normal">/night</span></span>
        </div>
        <span className="bg-peak-red text-white text-xs font-medium px-3 py-1.5 rounded-lg">View hotel</span>
      </div>
    </Link>
  );
}

export default function AccommodationTab() {
  return (
    <div className="flex gap-8">
      <AccommodationFilter />
      <div className="flex-1">
        <p className="text-peak-text-secondary text-sm mb-6">{mockProperties.length} properties found</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {mockProperties.map(p => <PropertyCard key={p.id} p={p} />)}
        </div>
      </div>
    </div>
  );
}