import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Mountain, ArrowLeft, Heart, Share2, Star, ChevronLeft, ChevronRight, Minus, Plus, MapPin } from "lucide-react";
import { getResortById } from "../lib/data";
import WeatherWidget from "../components/WeatherWidget";
import ReviewCard from "../components/ReviewCard";
import InstructorCard from "../components/InstructorCard";

const tabs = ["Overview", "Lift Passes", "Ski School", "Rentals", "Accommodation", "Reviews"];

export default function ResortDetail() {
  const { id } = useParams();
  const resort = getResortById(id);
  const [activeTab, setActiveTab] = useState("Overview");
  const [imageIdx, setImageIdx] = useState(0);
  const [saved, setSaved] = useState(false);

  // Lift pass state
  const [selectedPass, setSelectedPass] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [seniors, setSeniors] = useState(0);

  if (!resort) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-peak-text-secondary text-lg">Resort not found.</p>
        <Link to="/search" className="text-peak-blue text-sm hover:underline mt-4 inline-block">
          Back to search
        </Link>
      </div>
    );
  }

  const pass = resort.liftPasses[selectedPass];
  const totalPrice = pass.adult * adults + pass.child * children + pass.senior * seniors;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumb */}
      <Link to="/search" className="inline-flex items-center gap-1.5 text-peak-text-secondary text-sm hover:text-peak-text mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Back to results
      </Link>

      {/* Image carousel */}
      <div className="relative rounded-2xl overflow-hidden h-64 sm:h-80 lg:h-96 mb-8 group">
        <img
          src={resort.images[imageIdx]}
          alt={resort.name}
          className="w-full h-full object-cover transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-peak-bg/60 to-transparent" />

        <button
          onClick={() => setImageIdx((p) => (p === 0 ? resort.images.length - 1 : p - 1))}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-peak-bg/60 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-peak-bg/80"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => setImageIdx((p) => (p === resort.images.length - 1 ? 0 : p + 1))}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-peak-bg/60 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-peak-bg/80"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Image dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {resort.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setImageIdx(i)}
              className={`w-2 h-2 rounded-full transition-colors ${i === imageIdx ? "bg-white" : "bg-white/40"}`}
            />
          ))}
        </div>

        {/* Actions overlay */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setSaved(!saved)}
            className="p-2.5 rounded-full bg-peak-bg/60 backdrop-blur-sm text-white hover:bg-peak-bg/80 transition-colors"
          >
            <Heart className={`h-5 w-5 ${saved ? "fill-peak-red text-peak-red" : ""}`} />
          </button>
          <button className="p-2.5 rounded-full bg-peak-bg/60 backdrop-blur-sm text-white hover:bg-peak-bg/80 transition-colors">
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Resort header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-peak-text">{resort.name}</h1>
            <span className="bg-peak-blue text-white text-sm font-bold px-3 py-1 rounded-lg">{resort.rating}</span>
            <span className="text-peak-text-secondary text-sm">{resort.ratingLabel}</span>
          </div>
          <p className="text-peak-text-secondary flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            {resort.flag} {resort.country}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-peak-blue/10 text-peak-blue px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1.5">
            <Mountain className="h-4 w-4" />
            {resort.minAltitude}–{resort.maxAltitude}m
          </span>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Altitude", value: `${resort.minAltitude}–${resort.maxAltitude}m` },
          { label: "Runs", value: resort.runs },
          { label: "Pistes", value: `${resort.pisteKm}km` },
          { label: "Lifts", value: resort.lifts },
        ].map((stat) => (
          <div key={stat.label} className="bg-peak-card border border-white/5 rounded-xl p-4 text-center">
            <p className="text-peak-blue text-xs font-semibold uppercase tracking-wider mb-1">{stat.label}</p>
            <p className="font-display font-bold text-peak-text text-xl">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto hide-scrollbar border-b border-white/5 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab
                ? "border-peak-red text-peak-text"
                : "border-transparent text-peak-text-secondary hover:text-peak-text"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "Overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <p className="text-peak-text-secondary leading-relaxed mb-8">{resort.description}</p>
            <div className="bg-peak-card border border-white/5 rounded-xl p-5 h-64 flex items-center justify-center">
              <p className="text-peak-text-secondary text-sm">Trail map placeholder</p>
            </div>
          </div>
          <div>
            <WeatherWidget weather={resort.weather} />
          </div>
        </div>
      )}

      {activeTab === "Lift Passes" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h3 className="font-display font-bold text-peak-text text-xl mb-6">Select your pass</h3>
            <div className="space-y-3 mb-8">
              {resort.liftPasses.map((lp, i) => (
                <button
                  key={lp.type}
                  onClick={() => setSelectedPass(i)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                    selectedPass === i
                      ? "bg-peak-card border-peak-red/40"
                      : "bg-peak-surface border-white/5 hover:border-white/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      selectedPass === i ? "border-peak-red" : "border-peak-text-secondary"
                    }`}>
                      {selectedPass === i && <div className="w-2 h-2 rounded-full bg-peak-red" />}
                    </div>
                    <span className="text-peak-text font-medium">{lp.type}</span>
                    {lp.badge && (
                      <span className="bg-peak-green/20 text-peak-green text-xs font-semibold px-2 py-0.5 rounded-full">
                        {lp.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-peak-text font-bold">€{lp.adult}</span>
                </button>
              ))}
            </div>

            {/* Quantity selectors */}
            <h3 className="font-display font-bold text-peak-text text-xl mb-4">Guests</h3>
            {[
              { label: "Adults", value: adults, set: setAdults, min: 1 },
              { label: "Children (6-15)", value: children, set: setChildren, min: 0 },
              { label: "Seniors (65+)", value: seniors, set: setSeniors, min: 0 },
            ].map((g) => (
              <div key={g.label} className="flex items-center justify-between py-3 border-b border-white/5">
                <span className="text-peak-text text-sm">{g.label}</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => g.set(Math.max(g.min, g.value - 1))}
                    className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-peak-text-secondary hover:text-peak-text hover:border-white/20 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-peak-text font-semibold w-6 text-center">{g.value}</span>
                  <button
                    onClick={() => g.set(g.value + 1)}
                    className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-peak-text-secondary hover:text-peak-text hover:border-white/20 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Price summary */}
          <div className="bg-peak-card border border-white/5 rounded-xl p-6 h-fit lg:sticky lg:top-24">
            <h3 className="font-display font-bold text-peak-text text-lg mb-4">Price summary</h3>
            <div className="space-y-2 text-sm mb-6">
              {adults > 0 && (
                <div className="flex justify-between text-peak-text-secondary">
                  <span>Adult × {adults}</span>
                  <span>€{pass.adult * adults}</span>
                </div>
              )}
              {children > 0 && (
                <div className="flex justify-between text-peak-text-secondary">
                  <span>Child × {children}</span>
                  <span>€{pass.child * children}</span>
                </div>
              )}
              {seniors > 0 && (
                <div className="flex justify-between text-peak-text-secondary">
                  <span>Senior × {seniors}</span>
                  <span>€{pass.senior * seniors}</span>
                </div>
              )}
              <div className="pt-3 border-t border-white/5 flex justify-between text-peak-text font-bold text-lg">
                <span>Total</span>
                <span>€{totalPrice}</span>
              </div>
            </div>
            <Link
              to={`/book?resort=${resort.id}&pass=${selectedPass}&adults=${adults}&children=${children}&seniors=${seniors}`}
              className="block w-full py-3 bg-peak-red hover:bg-peak-red-hover text-white text-center font-semibold rounded-lg transition-colors"
            >
              Add to cart
            </Link>
          </div>
        </div>
      )}

      {activeTab === "Ski School" && (
        <div>
          <h3 className="font-display font-bold text-peak-text text-xl mb-6">Instructors</h3>
          {resort.instructors.length > 0 ? (
            <div className="space-y-4">
              {resort.instructors.map((inst) => (
                <InstructorCard key={inst.id} instructor={inst} />
              ))}
            </div>
          ) : (
            <p className="text-peak-text-secondary">Instructor information coming soon for this resort.</p>
          )}
        </div>
      )}

      {activeTab === "Rentals" && (
        <div className="text-center py-20">
          <Wrench className="h-12 w-12 text-peak-text-secondary mx-auto mb-4" />
          <p className="text-peak-text-secondary">Equipment rental booking coming soon.</p>
        </div>
      )}

      {activeTab === "Accommodation" && (
        <div className="text-center py-20">
          <Hotel className="h-12 w-12 text-peak-text-secondary mx-auto mb-4" />
          <p className="text-peak-text-secondary">Accommodation booking coming soon.</p>
        </div>
      )}

      {activeTab === "Reviews" && (
        <div>
          {/* Score header */}
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
                  <span className="text-peak-text-secondary text-xs w-20 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <div className="flex-1 h-2 bg-peak-surface rounded-full overflow-hidden">
                    <div className="h-full bg-peak-blue rounded-full" style={{ width: `${val * 10}%` }} />
                  </div>
                  <span className="text-peak-text text-xs font-semibold w-8 text-right">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Review cards */}
          {resort.reviews.items.length > 0 ? (
            <div className="space-y-4">
              {resort.reviews.items.map((r) => (
                <ReviewCard key={r.id} review={r} />
              ))}
            </div>
          ) : (
            <p className="text-peak-text-secondary">No reviews available yet for this resort.</p>
          )}
        </div>
      )}
    </div>
  );
}

// Icons for placeholder tabs
function Wrench(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function Hotel(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" />
      <path d="m9 16 .348-.24c1.465-1.013 3.84-1.013 5.304 0L15 16" />
      <path d="M8 7h.01" /><path d="M16 7h.01" /><path d="M12 7h.01" />
      <path d="M12 11h.01" /><path d="M16 11h.01" /><path d="M8 11h.01" />
      <path d="M10 22v-6.5m4 0V22" />
    </svg>
  );
}