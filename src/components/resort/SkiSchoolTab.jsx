import { useNavigate } from "react-router-dom";
import { GraduationCap, Users, Clock, Globe, Baby } from "lucide-react";

export default function SkiSchoolTab({ resort }) {
  const navigate = useNavigate();
  const f = resort.facilities || {};

  return (
    <div className="space-y-8">
      {/* Schools list */}
      {resort.skiSchoolNames && resort.skiSchoolNames.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="font-display font-bold text-peak-text text-xl">Ski Schools</h3>
            <span className="bg-peak-blue/10 text-peak-blue text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {resort.skiSchoolNames.length} schools
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {resort.skiSchoolNames.map((name) => (
              <div key={name} className="bg-peak-surface border border-white/5 rounded-xl px-4 py-3 flex items-center gap-3">
                <GraduationCap className="text-peak-blue w-4 h-4 flex-shrink-0" />
                <span className="text-peak-text text-sm font-medium">{name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pricing */}
      <div>
        <h3 className="font-display font-bold text-peak-text text-xl mb-4">Lesson Prices</h3>
        <div className="bg-peak-card border border-white/5 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-white/5">
            <div className="flex items-center gap-2 text-peak-text-secondary text-sm">
              <Users className="w-4 h-4" />
              Group lesson from
            </div>
            <span className="text-peak-text font-semibold text-sm">€{f.groupLessonFrom || 44}/person</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-white/5">
            <div className="flex items-center gap-2 text-peak-text-secondary text-sm">
              <Clock className="w-4 h-4" />
              Private lesson from
            </div>
            <span className="text-peak-text font-semibold text-sm">€{f.privateLessonFrom || 110}/hour</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-white/5">
            <div className="flex items-center gap-2 text-peak-text-secondary text-sm">
              <GraduationCap className="w-4 h-4" />
              Multi-day courses
            </div>
            <span className="text-peak-green font-semibold text-sm">Available at most schools</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2 text-peak-text-secondary text-sm">
              <Globe className="w-4 h-4" />
              Languages
            </div>
            <span className="text-peak-text font-semibold text-sm">German · English · Italian · Dutch</span>
          </div>
        </div>
      </div>

      {/* Childcare */}
      {resort.childcareLocations && resort.childcareLocations.length > 0 && (
        <div>
          <h3 className="font-display font-bold text-peak-text text-xl mb-4">Childcare & Kids</h3>
          <div className="bg-peak-card border border-white/5 rounded-xl p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
              {resort.childcareLocations.map((loc) => (
                <div key={loc} className="flex items-center gap-2 bg-peak-surface rounded-lg px-3 py-2">
                  <Baby className="w-4 h-4 text-peak-blue flex-shrink-0" />
                  <span className="text-peak-text text-sm">{loc}</span>
                </div>
              ))}
            </div>
            <div className="space-y-1.5 text-sm mb-4">
              <p className="text-peak-text-secondary">• Professional childcare from <span className="text-peak-text font-medium">age 1</span></p>
              <p className="text-peak-text-secondary">• Kids ski school from <span className="text-peak-text font-medium">age 2</span></p>
              <p className="text-peak-text-secondary">• Children's programmes from <span className="text-peak-text font-medium">age 2</span></p>
            </div>
            <p className="text-peak-text-secondary text-xs bg-peak-surface rounded-lg p-3">
              Specialized kids ski schools with first programmes from age 2. Mini and kids clubs with professional childcare from age 1 available at mountain and valley level.
            </p>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="pt-2">
        <button
          onClick={() => navigate("/trip-planning")}
          className="bg-peak-red text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-peak-red-hover transition-colors"
        >
          Book ski school in Trip Planning
        </button>
      </div>
    </div>
  );
}