import { Star, Sparkles, Globe } from "lucide-react";

export default function InstructorCard({ instructor }) {
  return (
    <div className="bg-peak-card border border-white/5 rounded-xl p-5 hover:border-peak-blue/20 transition-all duration-300 hover:-translate-y-1">
      {instructor.aiMatch && (
        <div className="flex items-center gap-1.5 bg-peak-blue/10 text-peak-blue text-xs font-semibold px-3 py-1.5 rounded-lg mb-3 w-fit">
          <Sparkles className="h-3.5 w-3.5" />
          AI Match — Matched to your level
        </div>
      )}
      <div className="flex items-center gap-4">
        <img
          src={instructor.avatar}
          alt={instructor.name}
          className="w-16 h-16 rounded-xl object-cover"
        />
        <div className="flex-1">
          <h4 className="font-display font-bold text-peak-text text-lg">{instructor.name}</h4>
          <p className="text-peak-text-secondary text-sm">{instructor.speciality}</p>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="text-peak-text text-sm font-semibold">{instructor.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-peak-text-secondary text-xs">
              <Globe className="h-3 w-3" />
              {instructor.languages.join(", ")}
            </div>
          </div>
        </div>
        <button className="px-4 py-2 bg-peak-red hover:bg-peak-red-hover text-white text-sm font-semibold rounded-lg transition-colors flex-shrink-0">
          Book lesson
        </button>
      </div>
    </div>
  );
}