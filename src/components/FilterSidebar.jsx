import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

const countries = ["Switzerland", "France", "Austria", "Italy"];
const difficulties = ["beginner", "intermediate", "expert"];
const facilities = [
  { key: "terrain_park", label: "Terrain Park" },
  { key: "night_skiing", label: "Night Skiing" },
  { key: "kids_area", label: "Kids Area" },
];

export default function FilterSidebar({ filters, setFilters, open, onClose }) {
  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const toggleArrayItem = (key, item) => {
    setFilters((prev) => {
      const arr = prev[key] || [];
      return {
        ...prev,
        [key]: arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item],
      };
    });
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}

      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-80 lg:w-64 bg-peak-surface lg:bg-transparent
          border-r border-white/5 lg:border-0 overflow-y-auto
          transform transition-transform duration-300 lg:transform-none
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="p-5 lg:p-0 pt-20 lg:pt-0">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-peak-text">
              <SlidersHorizontal className="h-5 w-5" />
              <h3 className="font-display font-bold text-lg">Filters</h3>
            </div>
            <button onClick={onClose} className="lg:hidden text-peak-text-secondary hover:text-peak-text">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Country */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-peak-text mb-3">Country</h4>
            <div className="space-y-2">
              {countries.map((c) => (
                <label key={c} className="flex items-center gap-2 cursor-pointer group">
                  <Checkbox
                    checked={(filters.countries || []).includes(c)}
                    onCheckedChange={() => toggleArrayItem("countries", c)}
                    className="border-peak-text-secondary data-[state=checked]:bg-peak-blue data-[state=checked]:border-peak-blue"
                  />
                  <span className="text-sm text-peak-text-secondary group-hover:text-peak-text transition-colors">
                    {c}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Altitude range */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-peak-text mb-3">
              Max Altitude: {filters.altitude || 4000}m+
            </h4>
            <Slider
              value={[filters.altitude || 2000]}
              onValueChange={([v]) => updateFilter("altitude", v)}
              min={2000}
              max={4000}
              step={100}
              className="[&_[role=slider]]:bg-peak-blue [&_[role=slider]]:border-peak-blue [&_.bg-primary]:bg-peak-blue"
            />
          </div>

          {/* Difficulty */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-peak-text mb-3">Difficulty</h4>
            <div className="flex flex-wrap gap-2">
              {difficulties.map((d) => (
                <button
                  key={d}
                  onClick={() => toggleArrayItem("difficulty", d)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors capitalize ${
                    (filters.difficulty || []).includes(d)
                      ? "bg-peak-blue/20 border-peak-blue/40 text-peak-blue"
                      : "border-white/10 text-peak-text-secondary hover:text-peak-text hover:border-white/20"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Facilities */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-peak-text mb-3">Facilities</h4>
            <div className="space-y-2">
              {facilities.map((f) => (
                <label key={f.key} className="flex items-center gap-2 cursor-pointer group">
                  <Checkbox
                    checked={(filters.facilities || []).includes(f.key)}
                    onCheckedChange={() => toggleArrayItem("facilities", f.key)}
                    className="border-peak-text-secondary data-[state=checked]:bg-peak-blue data-[state=checked]:border-peak-blue"
                  />
                  <span className="text-sm text-peak-text-secondary group-hover:text-peak-text transition-colors">
                    {f.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price range */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-peak-text mb-3">
              Max price: €{filters.maxPrice || 100}/day
            </h4>
            <Slider
              value={[filters.maxPrice || 100]}
              onValueChange={([v]) => updateFilter("maxPrice", v)}
              min={30}
              max={100}
              step={5}
              className="[&_[role=slider]]:bg-peak-blue [&_[role=slider]]:border-peak-blue [&_.bg-primary]:bg-peak-blue"
            />
          </div>

          {/* Star rating */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-peak-text mb-3">
              Min rating: {filters.minRating || 7.0}+
            </h4>
            <Slider
              value={[filters.minRating || 7.0]}
              onValueChange={([v]) => updateFilter("minRating", v)}
              min={7.0}
              max={10.0}
              step={0.1}
              className="[&_[role=slider]]:bg-peak-blue [&_[role=slider]]:border-peak-blue [&_.bg-primary]:bg-peak-blue"
            />
          </div>
        </div>
      </div>
    </>
  );
}