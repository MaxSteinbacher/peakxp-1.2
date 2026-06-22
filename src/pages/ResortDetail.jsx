import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Mountain, ArrowLeft, Heart, Share2, MapPin, Snowflake, Thermometer, Car, ExternalLink } from "lucide-react";
import { useT } from "../lib/i18n";
import BackButton from "../components/shared/BackButton";
import { getResortById, SEASON_PASSES } from "../lib/data";
import ResortBadgesPanel from "../components/badges/ResortBadges";
import { getRealRating } from "../lib/externalRatings";
import ReviewCard from "../components/ReviewCard";
import InstructorCard from "../components/InstructorCard";
import OverviewTab from "../components/resort/OverviewTab";
import PhotoSlideshow from "../components/resort/PhotoSlideshow";
import ConditionsTab from "../components/resort/ConditionsTab";
import LiftPassesTab from "../components/resort/LiftPassesTab";
import FacilitiesTab from "../components/resort/FacilitiesTab";
import SkiSchoolTab from "../components/resort/SkiSchoolTab";
import SurroundingsTab from "../components/resort/SurroundingsTab";
import EventsTab from "../components/resort/EventsTab";

const TAB_KEYS = ["overview", "conditions", "lift_passes", "facilities", "surroundings", "events", "ski_school_tab", "reviews"];

const OPEN_STATUS = {
  "Open": "bg-peak-green/20 text-peak-green border-peak-green/30",
  "Partially open": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  "Closed": "bg-red-900/20 text-peak-red border-peak-red/30",
};

export default function ResortDetail() {
  const t = useT();
  const { id } = useParams();
  const resort = getResortById(id);
  const [activeTab, setActiveTab] = useState("overview");
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

      {/* Unified Video + Photo Slideshow */}
      <div className="relative mb-8">
        <PhotoSlideshow images={resort.images} videos={resort.videos} youtubeId={resort.youtubeId} />
        <div className="absolute top-4 left-16 flex gap-2 z-10">
          <button onClick={() => setSaved(!saved)} className="p-2.5 rounded-full bg-peak-bg/60 backdrop-blur-sm text-white hover:bg-peak-bg/80 transition-colors">
            <Heart className={`h-5 w-5 ${saved ? "fill-peak-red text-peak-red" : ""}`} />
          </button>
          <button className="p-2.5 rounded-full bg-peak-bg/60 backdrop-blur-sm text-white hover:bg-peak-bg/80 transition-colors">
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Resort header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
        {/* Left: name, country, status */}
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap mb-2">
            {(resort.logo || resort.logoImage) && (
              <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center flex-shrink-0 overflow-hidden p-1 border border-white/10">
                <img
                  src={resort.logo || resort.logoImage}
                  alt={resort.name}
                  className="w-full h-full object-contain"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            )}
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-peak-text">{resort.name}</h1>
            {(() => {
              const ext = getRealRating(resort);
              return ext ? (
                <div className="flex flex-col items-start">
                  <span className="bg-peak-blue text-white text-sm font-bold px-3 py-1 rounded-lg">{ext.overall}</span>
                  <a href={ext.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-peak-text-secondary text-xs hover:text-peak-blue mt-0.5">Source: skiresort.de ↗</a>
                </div>
              ) : (
                <span className="text-peak-text-secondary text-sm">No verified rating yet</span>
              );
            })()}
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
          { label: t('altitude'), value: `${resort.minAltitude}–${resort.maxAltitude}m` },
          { label: t('runs'), value: resort.runs },
          { label: t('pistes'), value: `${resort.pisteKm}km` },
          { label: t('lifts'), value: resort.lifts, sub: resort.gondolas ? `${resort.gondolas}G / ${resort.chairlifts}C / ${resort.dragLifts}D` : null },
          { label: t('vertical'), value: `${resort.verticalDrop || resort.maxAltitude - resort.minAltitude}m` },
          { label: t('longest_run'), value: `${resort.longestRun || "—"}km` },
          { label: t('snow_guns'), value: resort.snowCannons || "—" },
          { label: t('difficulty'), value: null, special: "diff" },
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

      {/* Resort Badges */}
      <div className="mb-6">
        <ResortBadgesPanel resort={resort} />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto hide-scrollbar border-b border-white/5 mb-8">
        {TAB_KEYS.map(key => (
          <button key={key} onClick={() => setActiveTab(key)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === key ? "border-peak-red text-peak-text" : "border-transparent text-peak-text-secondary hover:text-peak-text"}`}>
            {t(key)}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "overview" && <OverviewTab resort={resort} />}
      {activeTab === "conditions" && <ConditionsTab resort={resort} />}
      {activeTab === "lift_passes" && <LiftPassesTab resort={resort} />}
      {activeTab === "facilities" && <FacilitiesTab resort={resort} />}
      {activeTab === "surroundings" && <SurroundingsTab resort={resort} />}
      {activeTab === "events" && <EventsTab resort={resort} />}

      {activeTab === "ski_school_tab" && (
        <SkiSchoolTab resort={resort} />
      )}

      {activeTab === "reviews" && (
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