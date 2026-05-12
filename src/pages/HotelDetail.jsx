import { useState, useEffect, useRef } from "react";
import DateRangePicker from "../components/shared/DateRangePicker";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, MapPin, CheckCircle, Shield, ChevronLeft, ChevronRight, Users, Minus, Plus, Calendar } from "lucide-react";
import BackButton from "../components/shared/BackButton";
import { getHotelById } from "../lib/hotels";
import HotelOverviewTab from "../components/hotel/HotelOverviewTab";
import HotelRoomsTab from "../components/hotel/HotelRoomsTab";
import HotelFacilitiesTab from "../components/hotel/HotelFacilitiesTab";
import HotelDiningTab from "../components/hotel/HotelDiningTab";
import HotelSpaTab from "../components/hotel/HotelSpaTab";
import HotelEventsTab from "../components/hotel/HotelEventsTab";
import HotelLocationTab from "../components/hotel/HotelLocationTab";
import HotelReviewsTab from "../components/hotel/HotelReviewsTab";
import HotelRulesTab from "../components/hotel/HotelRulesTab";

const TABS = [
  { key: "overview", label: "Overview" },
  { key: "rooms", label: "Rooms" },
  { key: "facilities", label: "Facilities" },
  { key: "dining", label: "Dining" },
  { key: "spa", label: "Spa" },
  { key: "events", label: "Events" },
  { key: "location", label: "Location" },
  { key: "reviews", label: "Reviews" },
  { key: "rules", label: "House Rules" },
];

function GuestSelector({ adults, children, onAdults, onChildren }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen(o => !o)} className="bg-peak-surface border border-white/10 text-peak-text text-sm px-4 py-2 rounded-lg flex items-center gap-2 min-w-[120px]">
        <Users className="h-4 w-4 text-peak-text-secondary" />
        {adults + children} guest{adults + children !== 1 ? "s" : ""}
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-peak-surface border border-white/10 rounded-xl p-4 z-50 shadow-2xl min-w-[200px]">
          {[["Adults", adults, onAdults, 1], ["Children", children, onChildren, 0]].map(([label, val, setter, min]) => (
            <div key={label} className="flex items-center justify-between py-2">
              <span className="text-peak-text text-sm">{label}</span>
              <div className="flex items-center gap-3">
                <button onClick={() => setter(Math.max(min, val - 1))} className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center text-peak-text-secondary hover:text-peak-text">
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="text-peak-text w-4 text-center text-sm">{val}</span>
                <button onClick={() => setter(val + 1)} className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center text-peak-text-secondary hover:text-peak-text">
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function HotelDetail() {
  const { id } = useParams();
  const hotel = getHotelById(id);
  const [activeTab, setActiveTab] = useState("overview");
  const [imgIdx, setImgIdx] = useState(0);
  const [adults, setAdults] = useState(2);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [children, setChildren] = useState(0);
  const [hovering, setHovering] = useState(false);
  const tabsRef = useRef(null);

  useEffect(() => {
    if (!hotel || hovering) return;
    const t = setInterval(() => {
      setImgIdx(i => (i + 1) % hotel.images.length);
    }, 5000);
    return () => clearInterval(t);
  }, [hotel, hovering]);

  if (!hotel) {
    return (
      <div className="min-h-screen bg-peak-bg flex items-center justify-center">
        <div className="text-center">
          <p className="text-peak-text-secondary mb-4">Hotel not found.</p>
          <Link to="/trip-planning" className="text-peak-blue hover:underline">Back to Trip Planning</Link>
        </div>
      </div>
    );
  }

  function prevImg() { setImgIdx(i => (i - 1 + hotel.images.length) % hotel.images.length); }
  function nextImg() { setImgIdx(i => (i + 1) % hotel.images.length); }

  function renderTab() {
    switch (activeTab) {
      case "overview": return <HotelOverviewTab hotel={hotel} />;
      case "rooms": return <HotelRoomsTab hotel={hotel} />;
      case "facilities": return <HotelFacilitiesTab hotel={hotel} />;
      case "dining": return <HotelDiningTab hotel={hotel} />;
      case "spa": return <HotelSpaTab hotel={hotel} />;
      case "events": return <HotelEventsTab hotel={hotel} />;
      case "location": return <HotelLocationTab hotel={hotel} />;
      case "reviews": return <HotelReviewsTab hotel={hotel} />;
      case "rules": return <HotelRulesTab hotel={hotel} />;
      default: return null;
    }
  }

  return (
    <div className="min-h-screen bg-peak-bg">
      {/* HERO: full-bleed carousel */}
      <div
        className="relative w-full h-[60vh] sm:h-[70vh] overflow-hidden"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {/* Search / booking bar — absolutely on top of carousel */}
        <div className="absolute top-0 left-0 right-0 z-20 bg-peak-bg/80 backdrop-blur-md px-4 py-3">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-3">
            <BackButton to="/trip-planning" label="Accommodation" />
            <div className="w-px h-5 bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-1.5 text-peak-text-secondary text-sm">
              <MapPin className="h-3.5 w-3.5" />
              <span>{hotel.city}, {hotel.country} {hotel.flag}</span>
            </div>
            <div className="ml-auto flex flex-wrap items-center gap-2">
              <DateRangePicker
                startDate={checkIn} endDate={checkOut}
                onStartChange={setCheckIn} onEndChange={setCheckOut}
                context="hotel" minStay={1}
                placeholder={{ start: "Check-in", end: "Check-out" }}
                unavailableDates={hotel.unavailableDates || []}
                unavailableRanges={hotel.unavailableRanges || []}
              />
              <GuestSelector adults={adults} children={children} onAdults={setAdults} onChildren={setChildren} />
              <button className="bg-peak-red hover:bg-peak-red-hover text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors">
                Check availability
              </button>
            </div>
          </div>
        </div>

        {/* Carousel images */}
        <img
          src={hotel.images[imgIdx]}
          alt={hotel.name}
          className="w-full h-full object-cover transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-peak-bg/40 via-transparent to-peak-bg/70 pointer-events-none" />

        {/* Arrows */}
        <button onClick={prevImg} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-peak-bg/60 backdrop-blur-sm border border-white/10 rounded-full p-2 hover:bg-peak-bg/80 transition-colors">
          <ChevronLeft className="h-5 w-5 text-white" />
        </button>
        <button onClick={nextImg} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-peak-bg/60 backdrop-blur-sm border border-white/10 rounded-full p-2 hover:bg-peak-bg/80 transition-colors">
          <ChevronRight className="h-5 w-5 text-white" />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
          {hotel.images.map((_, i) => (
            <button key={i} onClick={() => setImgIdx(i)} className={`rounded-full transition-all ${i === imgIdx ? "bg-white w-5 h-2" : "bg-white/40 w-2 h-2"}`} />
          ))}
        </div>
      </div>

      {/* HOTEL IDENTITY ROW */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          {/* Left */}
          <div className="flex items-start gap-4">
            {/* Logo */}
            <div className="w-16 h-16 rounded-xl bg-white border border-white/20 overflow-hidden flex-shrink-0 flex items-center justify-center">
              {hotel.logo ? (
                <img src={hotel.logo} alt={hotel.name + " logo"} className="w-full h-full object-contain p-1.5" />
              ) : (
                <svg viewBox="0 0 100 100" className="w-10 h-10 text-gray-300" fill="currentColor">
                  <path d="M55 20 Q60 10 70 15 Q65 25 60 28 L65 50 Q70 55 68 65 L60 60 L58 70 L50 65 L48 70 L40 65 L38 60 L30 65 Q28 55 33 50 L38 28 Q33 25 28 15 Q38 10 43 20 Z" />
                </svg>
              )}
            </div>
            <div>
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-peak-text">{hotel.name}</h1>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: hotel.stars }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="bg-peak-blue/10 text-peak-blue text-xs px-2 py-0.5 rounded-full">{hotel.category}</span>
                {hotel.partnerBadge && (
                  <span className="bg-peak-surface border border-white/10 rounded-lg px-2 py-0.5 text-xs text-peak-text-secondary">Preferred Hotels and Resorts L.V.X.</span>
                )}
                {hotel.verified && (
                  <div className="flex items-center gap-1 text-peak-blue text-xs">
                    <CheckCircle className="h-3.5 w-3.5" />Verified
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-peak-text-secondary text-sm">
                <MapPin className="h-3.5 w-3.5 text-peak-red" />
                {hotel.address}, {hotel.city}, {hotel.country} {hotel.flag}
              </div>
            </div>
          </div>

          {/* Right: score + price + book */}
          <div className="flex flex-wrap items-end gap-4">
            <div className="bg-peak-card border border-white/5 rounded-xl p-4 text-center min-w-[140px]">
              {hotel.reviewCount === 0 ? (
                <>
                  <p className="text-peak-text-secondary text-2xl font-bold">—</p>
                  <p className="text-peak-text-secondary text-xs mt-1">No reviews yet — be the first</p>
                  <button onClick={() => setActiveTab("reviews")} className="text-peak-blue text-sm hover:underline mt-2 block">Write a review</button>
                </>
              ) : (
                <>
                  <p className="text-peak-text font-bold text-3xl">{hotel.rating.toFixed(1)}</p>
                  <p className="text-peak-text-secondary text-xs">{hotel.ratingLabel}</p>
                  <p className="text-peak-text-secondary text-xs">{hotel.reviewCount} reviews</p>
                </>
              )}
            </div>
            <div className="text-right">
              <p className="text-peak-text-secondary text-sm">From</p>
              <p className="text-peak-text font-bold text-3xl">€{hotel.priceFrom}</p>
              <p className="text-peak-text-secondary text-sm">/night</p>
            </div>
            <button onClick={() => setActiveTab("rooms")} className="bg-peak-red hover:bg-peak-red-hover text-white font-bold px-8 py-3 rounded-xl transition-colors">
              Book now
            </button>
          </div>
        </div>
      </div>

      {/* TAB NAV */}
      <div className="sticky top-0 z-30 bg-peak-bg/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={tabsRef} className="flex gap-0 overflow-x-auto hide-scrollbar">
            {TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors flex-shrink-0 ${activeTab === tab.key ? "border-peak-red text-peak-text" : "border-transparent text-peak-text-secondary hover:text-peak-text"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* TAB CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTab()}
      </div>
    </div>
  );
}