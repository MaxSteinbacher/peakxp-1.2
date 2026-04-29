import { useState, useMemo } from "react";
import { SlidersHorizontal, ArrowUpDown, Map, LayoutGrid } from "lucide-react";
import ResortCard from "../components/ResortCard";
import FilterSidebar from "../components/FilterSidebar";
import { resorts } from "../lib/data";

const sortOptions = [
  { key: "relevance", label: "Relevance" },
  { key: "price", label: "Price" },
  { key: "rating", label: "Rating" },
  { key: "altitude", label: "Altitude" },
];

export default function Search() {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("q") || "";

  const [filters, setFilters] = useState({
    countries: [],
    altitude: 4000,
    difficulty: [],
    facilities: [],
    maxPrice: 100,
    minRating: 7.0,
  });
  const [sortBy, setSortBy] = useState("relevance");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [mapView, setMapView] = useState(false);

  const filteredResorts = useMemo(() => {
    let results = [...resorts];

    if (query) {
      results = results.filter((r) =>
        r.name.toLowerCase().includes(query.toLowerCase()) ||
        r.country.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (filters.countries.length > 0) {
      results = results.filter((r) => filters.countries.includes(r.country));
    }
    if (filters.difficulty.length > 0) {
      results = results.filter((r) =>
        filters.difficulty.some((d) => r.difficulty.includes(d))
      );
    }
    if (filters.facilities.length > 0) {
      results = results.filter((r) =>
        filters.facilities.some((f) => r.facilities.includes(f))
      );
    }
    results = results.filter(
      (r) => r.maxAltitude <= filters.altitude && r.priceFrom <= filters.maxPrice && r.rating >= filters.minRating
    );

    switch (sortBy) {
      case "price": results.sort((a, b) => a.priceFrom - b.priceFrom); break;
      case "rating": results.sort((a, b) => b.rating - a.rating); break;
      case "altitude": results.sort((a, b) => b.maxAltitude - a.maxAltitude); break;
      default: break;
    }

    return results;
  }, [query, filters, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-peak-text">
          {query ? `Results for "${query}"` : "All Resorts"}
        </h1>
        <p className="text-peak-text-secondary text-sm mt-1">
          {filteredResorts.length} resort{filteredResorts.length !== 1 ? "s" : ""} found
        </p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="hidden lg:block flex-shrink-0">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            open={true}
            onClose={() => {}}
          />
        </div>

        {/* Mobile filter sidebar */}
        <div className="lg:hidden">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            open={filtersOpen}
            onClose={() => setFiltersOpen(false)}
          />
        </div>

        {/* Results */}
        <div className="flex-1">
          {/* Sort bar */}
          <div className="flex items-center justify-between mb-6 gap-3">
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
              {sortOptions.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setSortBy(opt.key)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap ${
                    sortBy === opt.key
                      ? "bg-peak-blue/20 border-peak-blue/40 text-peak-blue"
                      : "border-white/10 text-peak-text-secondary hover:text-peak-text"
                  }`}
                >
                  <ArrowUpDown className="h-3 w-3" />
                  {opt.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFiltersOpen(true)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-peak-text-secondary border border-white/10 rounded-lg hover:text-peak-text"
              >
                <SlidersHorizontal className="h-3 w-3" />
                Filters
              </button>
              <button
                onClick={() => setMapView(!mapView)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
                  mapView
                    ? "bg-peak-blue/20 border-peak-blue/40 text-peak-blue"
                    : "border-white/10 text-peak-text-secondary hover:text-peak-text"
                }`}
              >
                {mapView ? <LayoutGrid className="h-3 w-3" /> : <Map className="h-3 w-3" />}
                {mapView ? "Grid" : "Map"}
              </button>
            </div>
          </div>

          {/* Results grid */}
          {filteredResorts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-peak-text-secondary text-lg">No resorts match your filters.</p>
              <button
                onClick={() =>
                  setFilters({ countries: [], altitude: 4000, difficulty: [], facilities: [], maxPrice: 100, minRating: 7.0 })
                }
                className="mt-4 text-peak-blue text-sm hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredResorts.map((resort) => (
                <ResortCard key={resort.id} resort={resort} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}