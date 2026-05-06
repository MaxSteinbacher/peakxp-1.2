import { useState, useMemo } from "react";
import { resorts as allResorts } from "../../../lib/data";
import { useTripPlanner } from "../../../context/TripPlannerContext";
import { MapPin, Plus, ArrowRight, Check } from "lucide-react";

export default function ResortSelectionStep() {
  const { session, addResort, markStepComplete, setCurrentStep, getNextStep } = useTripPlanner();
  const [showPrompt, setShowPrompt] = useState(false);
  const dest = session.destination;

  const filtered = useMemo(() => {
    return allResorts.filter(r => {
      if (!dest) return true;
      if (dest.type === "country") {
        const countryName = dest.label;
        return (Array.isArray(r.country) ? r.country.includes(countryName) : r.country === countryName)
          || (dest.countryCode && r.countryCode === dest.countryCode);
      }
      if (dest.type === "region") {
        return r.region === dest.region || r.region === dest.label;
      }
      return true;
    });
  }, [dest]);

  const selectedIds = session.resorts.map(r => r.resortId);

  function handleSelectResort(resort) {
    addResort({
      resortId: resort.id,
      resortName: resort.name,
      resortFlag: resort.flag || "",
      resortCountry: resort.country,
      dates: { start: session.dates.start, end: session.dates.end },
    });
    setShowPrompt(true);
  }

  function handleContinue() {
    markStepComplete("resort-selection", null);
    const next = getNextStep();
    if (next) setCurrentStep(next.serviceKey, next.resortId);
  }

  function handleAddAnother() {
    setShowPrompt(false);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <h2 className="font-display font-extrabold text-2xl text-peak-text mb-1">Choose your ski resort</h2>
      <p className="text-peak-text-secondary text-sm mb-6">Showing resorts in {dest?.label || "the Alps"}</p>

      {/* Selected resorts badges */}
      {session.resorts.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {session.resorts.map(r => (
            <span key={r.resortId} className="bg-peak-green/20 text-peak-green text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
              <Check className="h-3 w-3" /> {r.resortFlag} {r.resortName}
            </span>
          ))}
        </div>
      )}

      {/* Add another prompt */}
      {showPrompt && session.resorts.length > 0 && (
        <div className="bg-peak-card border border-white/5 rounded-2xl p-6 mb-6 text-center">
          <p className="text-peak-text font-semibold text-sm mb-4">Add another resort to your trip?</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <button onClick={handleAddAnother} className="flex items-center gap-1.5 px-5 py-2.5 border border-white/10 text-peak-text-secondary rounded-xl hover:text-peak-text transition-colors text-sm">
              <Plus className="h-4 w-4" /> Add another resort
            </button>
            <button onClick={handleContinue} className="flex items-center gap-1.5 px-5 py-2.5 bg-peak-red hover:bg-peak-red-hover text-white font-bold rounded-xl transition-colors text-sm">
              Continue with {session.resorts.length === 1 ? "this resort" : "these resorts"} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Resort grid */}
      {(!showPrompt || session.resorts.length === 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(resort => {
            const isSelected = selectedIds.includes(resort.id);
            const passPrice = resort.liftPasses?.[0]?.adult ?? resort.priceFrom;
            return (
              <div key={resort.id} className="group rounded-xl overflow-hidden bg-peak-card border border-white/5 hover:border-peak-blue/30 transition-all duration-300">
                <div className="relative h-44 overflow-hidden">
                  <img src={resort.image} alt={resort.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {isSelected && (
                    <div className="absolute top-3 right-3 bg-peak-green text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Check className="h-3 w-3" /> Selected
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 bg-peak-bg/80 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-peak-text">
                    {resort.rating}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-display font-bold text-peak-text text-lg">{resort.name}</h3>
                  <p className="text-peak-text-secondary text-sm mb-2">{resort.flag} {resort.country}</p>
                  <div className="flex items-center gap-3 text-xs text-peak-text-secondary mb-3">
                    <span>{resort.pisteKm}km pistes</span>
                    <span>{resort.lifts} lifts</span>
                    <span>From €{passPrice}/day</span>
                  </div>
                  {!isSelected ? (
                    <button onClick={() => handleSelectResort(resort)} className="w-full py-2.5 bg-peak-red hover:bg-peak-red-hover text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                      <MapPin className="h-4 w-4" /> Select resort
                    </button>
                  ) : (
                    <div className="w-full py-2.5 bg-peak-green/10 text-peak-green text-sm font-semibold rounded-lg text-center">
                      Added to trip
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16">
              <MapPin className="h-10 w-10 text-peak-text-secondary/30 mx-auto mb-3" />
              <p className="text-peak-text-secondary">No resorts found for this destination.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}