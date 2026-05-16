import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Mountain, ArrowLeft, Heart, Share2, ChevronLeft, ChevronRight, MapPin, Snowflake, Thermometer, Car, Play, ExternalLink } from "lucide-react";
import BackButton from "../components/shared/BackButton";
import { getResortById, SEASON_PASSES } from "../lib/data";
import ReviewCard from "../components/ReviewCard";
import InstructorCard from "../components/InstructorCard";
import OverviewTab from "../components/resort/OverviewTab";
import ConditionsTab from "../components/resort/ConditionsTab";
import LiftPassesTab from "../components/resort/LiftPassesTab";
import FacilitiesTab from "../components/resort/FacilitiesTab";
import SurroundingsTab from "../components/resort/SurroundingsTab";
import EventsTab from "../components/resort/EventsTab";

const TABS = ["Overview", "Conditions", "Lift Passes", "Facilities", "Surroundings", "Events", "Ski School", "Reviews"];

const OPEN_STATUS = {
  "Open": "bg-peak-green/20 text-peak-green border-peak-green/30",
  "Partially open": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  "Closed": "bg-red-900/20 text-peak-red border-peak-red/30",
};

export default function ResortDetail() {
  const { id } = useParams();
  const resort = getResortById(id);
  const [activeTab, setActiveTab] = useState("Overview");
  const [imageIdx, setImageIdx] = useState(0);
  const [saved, setSaved] = useState(false);

  if (!resort) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-peak-text-secondary text-lg">Resort not found.</p>
        <Link to="/search" className="text-peak-blue text-sm hover:underline mt-4 inline-block">Back to search</Link>
      </div>
    );
  }

  const openStatus = resort.openStatus || "Open";
  const validPasses = (resort.seasonPasses || []).map(id => SEASON_PASSES[id]).filter(Boolean);
  const countries = resort.countries?.length ? resort.countries : [resort.country];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-24">
      <BackButton className="mb-6" />

      {/* Video Hero or Image Carousel */}
      {resort.videos && resort.videos.length > 0 ? (
        <div className="relative w-full overflow-hidden rounded-2xl mb-8" style={{ height: '70vh', maxHeight: '600px' }}>
          <video
            src={resort.videos[0].url}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-peak-bg/80 via-transparent to-transparent" />
          <div className="absolute top-4 right-4 flex gap-2">
            <button onClick={() => setSaved(!saved)} className="p-2.5 rounded-full bg-peak-bg/60 backdrop-blur-sm text-white hover:bg-peak-bg/80 transition-colors">
              <Heart className={`h-5 w-5 ${saved ? "fill-peak-red text-peak-red" : ""}`} />
            </button>
            <button className="p-2.5 rounded-full bg-peak-bg/60 backdrop-blur-sm text-white hover:bg-peak-bg/80 transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="relative rounded-2xl overflow-hidden h-64 sm:h-80 lg:h-[420px] mb-8 group">
          <img src={resort.images[imageIdx]} alt={resort.name} className="w-full h-full object-cover transition-all duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-peak-bg/70 to-transparent" />
          <button onClick={() => setImageIdx(p => p === 0 ? resort.images.length - 1 : p - 1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-peak-bg/60 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-peak-bg/80">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button onClick={() => setImageIdx(p => p === resort.images.length - 1 ? 0 : p + 1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-peak-bg/60 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-peak-bg/80">
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {resort.images.map((_, i) => (
              <button key={i} onClick={() => setImageIdx(i)} className={`w-2 h-2 rounded-full transition-colors ${i === imageIdx ? "bg-white" : "bg-white/40"}`} />
            ))}
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            <button onClick={() => setSaved(!saved)} className="p-2.5 rounded-full bg-peak-bg/60 backdrop-blur-sm text-white hover:bg-peak-bg/80 transition-colors">
              <Heart className={`h-5 w-5 ${saved ? "fill-peak-red text-peak-red" : ""}`} />
            </button>
            <button className="p-2.5 rounded-full bg-peak-bg/60 backdrop-blur-sm text-white hover:bg-peak-bg/80 transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Resort header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
        {/* Left: name, country, status */}
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap mb-2">
            {resort.logo && (
              <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center flex-shrink-0 overflow-hidden p-1 border border-white/10">
                <img
                  src={resort.logo}
                  alt={resort.name}
                  className="w-full h-full object-contain"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            )}
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-peak-text">{resort.name}</h1>
            <span className="bg-peak-blue text-white text-sm font-bold px-3 py-1 rounded-lg">{resort.rating}</span>
            <span className="text-peak-text-secondary text-sm">{resort.ratingLabel}</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-4 w-4 text-peak-text-secondary" />
            <span className="text-peak-text-secondary text-sm">
              {countries.map((c, i) => (
                <span key={c}>{i > 0 && <span className="mx-1 text-peak-text-secondary">/</span>}{resort.flag} {c}</span>
              ))}
            </span>
            {resort.region && <span className="text-peak-text-secondary text-sm">· {resort.region}</span>}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${OPEN_STATUS[openStatus] || OPEN_STATUS["Open"]}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${openStatus === "Open" ? "bg-peak-green" : openStatus === "Partially open" ? "bg-yellow-400" : "bg-peak-red"}`} />
              {openStatus}
            </span>
            {resort.seasonDates && (
              <span className="text-peak-text-secondary text-xs">Season: {resort.seasonDates}</span>
            )}
          </div>
        </div>

        {/* Right: status chips + season passes */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 bg-peak-blue/10 text-peak-blue px-3 py-1.5 rounded-lg text-xs font-semibold">
              <Snowflake className="h-3.5 w-3.5" />
              {resort.snowDepthTop || 145}cm base
            </div>
            <div className="flex items-center gap-1.5 bg-peak-blue/10 text-peak-blue px-3 py-1.5 rounded-lg text-xs font-semibold">
              <Thermometer className="h-3.5 w-3.5" />
              {resort.weather?.temp || -3}°C
            </div>
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${resort.roadStatus === "clear" ? "bg-peak-green/10 text-peak-green" : resort.roadStatus === "chains" ? "bg-yellow-500/10 text-yellow-400" : "bg-peak-red/10 text-peak-red"}`}>
              <Car className="h-3.5 w-3.5" />
              {resort.roadStatus === "clear" ? "Roads clear" : resort.roadStatus === "chains" ? "Chains recommended" : "Road closed"}
            </div>
          </div>
          {/* Season pass badges */}
          {validPasses.length > 0 && (
            <div className="flex gap-2 overflow-x-auto hide-scrollbar">
              {validPasses.map(p => (
                <div key={p.name} className="flex items-center gap-2 bg-peak-card border border-white/10 rounded-xl px-3 py-2 flex-shrink-0">
                  <div className="w-6 h-6 rounded flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: p.color }}>
                    {p.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                  </div>
                  <span className="text-peak-text text-xs font-medium whitespace-nowrap">{p.name}</span>
                  <span className="text-peak-green text-xs">✓</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
        {[
          { label: "Altitude", value: `${resort.minAltitude}–${resort.maxAltitude}m` },
          { label: "Runs", value: resort.runs },
          { label: "Pistes", value: `${resort.pisteKm}km` },
          { label: "Lifts", value: resort.lifts, sub: resort.gondolas ? `${resort.gondolas}G / ${resort.chairlifts}C / ${resort.dragLifts}D` : null },
          { label: "Vertical", value: `${resort.verticalDrop || resort.maxAltitude - resort.minAltitude}m` },
          { label: "Longest run", value: `${resort.longestRun || "—"}km` },
          { label: "Snow guns", value: resort.snowCannons || "—" },
          { label: "Difficulty", value: null, special: "diff" },
        ].map(stat => (
          <div key={stat.label} className="bg-peak-card border border-white/5 rounded-xl p-3 text-center">
            <p className="text-peak-blue text-xs font-semibold uppercase tracking-wider mb-1">{stat.label}</p>
            {stat.special === "diff" ? (
              <div>
                <div className="flex h-2 rounded-full overflow-hidden mb-1">
                  <div className="bg-blue-400" style={{ width: `${resort.difficultyBlue || 35}%` }} />
                  <div className="bg-peak-red" style={{ width: `${resort.difficultyRed || 40}%` }} />
                  <div className="bg-gray-900" style={{ width: `${resort.difficultyBlack || 25}%` }} />
                </div>
                <p className="text-peak-text-secondary text-xs">{resort.difficultyBlue || 35}% · {resort.difficultyRed || 40}% · {resort.difficultyBlack || 25}%</p>
              </div>
            ) : (
              <>
                <p className="font-display font-bold text-peak-text text-lg leading-tight">{stat.value}</p>
                {stat.sub && <p className="text-peak-text-secondary text-xs mt-0.5">{stat.sub}</p>}
              </>
            )}
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto hide-scrollbar border-b border-white/5 mb-8">
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab ? "border-peak-red text-peak-text" : "border-transparent text-peak-text-secondary hover:text-peak-text"}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "Overview" && <OverviewTab resort={resort} />}
      {activeTab === "Conditions" && <ConditionsTab resort={resort} />}
      {activeTab === "Lift Passes" && <LiftPassesTab resort={resort} />}
      {activeTab === "Facilities" && <FacilitiesTab resort={resort} />}
      {activeTab === "Surroundings" && <SurroundingsTab resort={resort} />}
      {activeTab === "Events" && <EventsTab resort={resort} />}

      {activeTab === "Ski School" && (
        <div>
          <h3 className="font-display font-bold text-peak-text text-xl mb-6">Instructors</h3>
          {resort.instructors && resort.instructors.length > 0 ? (
            <div className="space-y-4">
              {resort.instructors.map(inst => <InstructorCard key={inst.id} instructor={inst} />)}
            </div>
          ) : (
            <div className="text-center py-16 text-peak-text-secondary">Instructor information coming soon for this resort.</div>
          )}
        </div>
      )}

      {activeTab === "Reviews" && (
        <div>
          <div className="flex flex-col sm:flex-row gap-8 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-peak-blue flex items-center justify-center">
                <span className="font-display font-extrabold text-white text-3xl">{resort.reviews.overall}</span>
              </div>
              <div>
                <p className="text-peak-text font-bold text-lg">{resort.ratingLabel}</p>
                <p className="text-peak-text-secondary text-sm">{resort.reviews.items.length} reviews</p>
              </div>
            </div>
            <div className="flex-1 space-y-2">
              {Object.entries(resort.reviews.breakdown).map(([key, val]) => (
                <div key={key} className="flex items-center gap-3">
                  <span className="text-peak-text-secondary text-xs w-24 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <div className="flex-1 h-2 bg-peak-surface rounded-full overflow-hidden">
                    <div className="h-full bg-peak-blue rounded-full" style={{ width: `${val * 10}%` }} />
                  </div>
                  <span className="text-peak-text text-xs font-semibold w-8 text-right">{val}</span>
                </div>
              ))}
            </div>
          </div>
          {resort.reviews.items.length > 0
            ? <div className="space-y-4">{resort.reviews.items.map(r => <ReviewCard key={r.id} review={r} />)}</div>
            : <p className="text-peak-text-secondary">No reviews yet.</p>
          }
        </div>
      )}
    </div>
  );
}