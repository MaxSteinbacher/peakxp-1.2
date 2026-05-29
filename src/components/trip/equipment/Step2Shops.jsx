import { useState } from "react";
import { useT } from "../../../lib/i18n";
import { Star, MapPin, ChevronDown, ChevronUp } from "lucide-react";

const MOCK_SHOPS = [
  {
    id: "schneider-sport",
    name: "Schneider Sport",
    image: "https://picsum.photos/seed/shop1/600/400",
    rating: 4.8,
    reviews: 312,
    distance: "50m from main lift",
    proximity: t("slope_side"),
    brands: ["Atomic", "Salomon", "Head"],
    pricePerDay: 38,
    tier: t("performance"),
    status: t("available"),
    package: [
      { item: "Skis", brand: "Atomic", model: "Redster X9", price: 22 },
      { item: "Ski Boots", brand: "Salomon", model: "X Pro 100", price: 10 },
      { item: "Poles", brand: "Head", model: "Multi S", price: 4 },
      { item: "Helmet", brand: "Atomic", model: "Revent+", price: 8 },
    ],
  },
  {
    id: "alpine-rentals",
    name: "Alpine Rentals",
    image: "https://picsum.photos/seed/shop2/600/400",
    rating: 4.5,
    reviews: 187,
    distance: "200m from main lift",
    proximity: t("village_centre"),
    brands: ["Rossignol", "Fischer", "K2"],
    pricePerDay: 28,
    tier: t("standard"),
    status: t("available"),
    package: [
      { item: "Skis", brand: "Rossignol", model: "Experience 88 Ti", price: 16 },
      { item: "Ski Boots", brand: "Fischer", model: "RC4 80", price: 8 },
      { item: "Poles", brand: "K2", model: "Power Composite", price: 4 },
    ],
  },
  {
    id: "budget-glide",
    name: "Budget Glide",
    image: "https://picsum.photos/seed/shop3/600/400",
    rating: 3.9,
    reviews: 95,
    distance: "800m from main lift",
    proximity: t("near_parking"),
    brands: ["Elan", "Dynastar"],
    pricePerDay: 18,
    tier: t("budget"),
    status: t("limited"),
    package: [
      { item: "Skis", brand: "Elan", model: "Amphibio 12", price: 12 },
      { item: "Ski Boots", brand: "Dynastar", model: "Speed Classic", price: 6 },
    ],
  },
  {
    id: "peak-performance-rentals",
    name: "Peak Performance Rentals",
    image: "https://picsum.photos/seed/shop4/600/400",
    rating: 4.9,
    reviews: 524,
    distance: "100m from main lift",
    proximity: t("slope_side"),
    brands: ["Volkl", "Nordica", "Tecnica", "Lange"],
    pricePerDay: 55,
    tier: "Premium",
    status: t("available"),
    package: [
      { item: "Skis", brand: "Volkl", model: "Mantra M6", price: 30 },
      { item: "Ski Boots", brand: "Lange", model: "RS 130", price: 15 },
      { item: "Poles", brand: "Nordica", model: "Pro", price: 5 },
      { item: "Helmet", brand: "Tecnica", model: "Team Pro", price: 10 },
      { item: "Goggles", brand: "Nordica", model: "Dobermann", price: 8 },
    ],
  },
];

const tierColors = {
  Budget: "text-peak-text-secondary border-white/20",
  Standard: "text-peak-blue border-peak-blue/40",
  Premium: "text-yellow-400 border-yellow-400/40",
  Performance: "text-peak-green border-peak-green/40",
};

const statusColors = {
  Available: "bg-peak-green/10 text-peak-green",
  Limited: "bg-yellow-400/10 text-yellow-400",
  Full: "bg-peak-red/10 text-peak-red",
};

function ShopCard({ shop, days, selected, onSelect }) {
  const [expanded, setExpanded] = useState(false);
  const totalPrice = shop.pricePerDay * days;

  return (
    <div className={`bg-peak-card border rounded-xl overflow-hidden transition-all duration-200 ${selected ? "border-peak-blue/50" : "border-white/5 hover:border-white/15"}`}>
      <div className="relative h-44 overflow-hidden">
        <img src={shop.image} alt={shop.name} className="w-full h-full object-cover" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border bg-peak-bg/80 backdrop-blur-sm ${tierColors[shop.tier]}`}>
            {shop.tier}
          </span>
        </div>
        <div className={`absolute top-3 right-3 text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[shop.status]}`}>
          {shop.status}
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-display font-bold text-peak-text text-lg">{shop.name}</h3>
            <div className="flex items-center gap-1 mt-0.5">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-peak-text text-sm font-medium">{shop.rating}</span>
              <span className="text-peak-text-secondary text-xs">({shop.reviews} reviews)</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-peak-text font-bold">€{shop.pricePerDay}<span className="text-peak-text-secondary text-xs font-normal"> / day</span></p>
            <p className="text-peak-text-secondary text-xs">€{totalPrice} for {days} day{days !== 1 ? "s" : ""}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-peak-text-secondary mb-2">
          <MapPin className="h-3 w-3" />
          <span>{shop.distance}</span>
          <span className="text-white/20 mx-1">·</span>
          <span>{shop.proximity}</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-4">
          {shop.brands.map((b) => (
            <span key={b} className="text-xs text-peak-text-secondary border border-white/10 px-2 py-0.5 rounded-full">{b}</span>
          ))}
        </div>
        <button
          onClick={onSelect}
          className={`w-full py-2.5 text-sm font-semibold rounded-xl transition-colors mb-3 ${
            selected ? "bg-peak-blue hover:bg-peak-blue/80 text-white" : "bg-peak-red hover:bg-peak-red-hover text-white"
          }`}
        >
          {selected ? "✓ Shop selected" : "Select shop"}
        </button>
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-1 text-xs text-peak-text-secondary hover:text-peak-text transition-colors"
        >
          {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          {expanded ? "Hide" : "View"} full package breakdown
        </button>
        {expanded && (
          <div className="mt-3 border-t border-white/5 pt-3 space-y-2">
            {shop.package.map((item) => (
              <div key={item.item} className="flex items-center justify-between text-sm">
                <div>
                  <span className="text-peak-text font-medium">{item.item}</span>
                  <span className="text-peak-text-secondary text-xs ml-2">{item.brand} {item.model}</span>
                </div>
                <span className="text-peak-text-secondary text-xs">€{item.price}/day</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Step2Shops({ selectedShop, setSelectedShop, onContinue, answers }) {
  const t = useT();
  const days = answers?.days || 3;
  const [destination, setDestination] = useState(answers?.destination || "");

  return (
    <div>
      <h2 className="font-display font-bold text-2xl text-peak-text mb-1">Choose a rental shop</h2>
      <p className="text-peak-text-secondary text-sm mb-6">Shops near your resort — prices shown for {days} day{days !== 1 ? "s" : ""}.</p>

      <div className="mb-6 max-w-sm">
        <label className="block text-xs text-peak-text-secondary mb-1">Resort / destination</label>
        <input
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="e.g. Verbier, Zermatt, Kitzbühel..."
          className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        {MOCK_SHOPS.map((shop) => (
          <ShopCard
            key={shop.id}
            shop={shop}
            days={days}
            selected={selectedShop?.id === shop.id}
            onSelect={() => setSelectedShop(shop)}
          />
        ))}
      </div>

      <button
        onClick={onContinue}
        disabled={!selectedShop}
        className="px-8 py-3 bg-peak-red hover:bg-peak-red-hover disabled:opacity-40 disabled:cursor-not-allowed text-white font-display font-bold text-sm rounded-xl transition-colors"
      >
        Continue to checkout
      </button>
    </div>
  );
}