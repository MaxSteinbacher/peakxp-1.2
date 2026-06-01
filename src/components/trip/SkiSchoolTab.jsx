import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Star, MapPin, ChevronDown, ChevronUp, Check, Globe } from "lucide-react";
import { useTripPlanner } from "../../context/TripPlannerContext";
import { useT } from "../../lib/i18n";

// ─── Static school data — photos to be added in Base44 ──────────────────────
const SCHOOLS = [
  {
    id: "sc1", name: "Ecole du Ski Français", badge: "Top rated",
    image: "", rating: 4.8, reviews: 412,
    location: "Slope-side — meets at bottom of Gondola 1",
    languages: ["English", "French", "German", "Italian"],
    certifications: ["BASI", "ESF", "ISIA"],
    instructors: 48,
    sports: ["ski", "snowboard", "telemark"],
    levels: ["beginner", "intermediate", "advanced", "expert"],
    ageGroups: ["adults", "kids", "teens"],
    lessonTypes: ["group", "private", "half_day", "full_day"],
    priceHalfDay: 42, priceFullDay: 78, pricePrivate: 95,
    availability: "available",
    groupSize: "max 8",
    highlights: ["Longest-running school in resort", "Dedicated kids area", "Video analysis available"],
  },
  {
    id: "sc2", name: "Peak Ski Academy", badge: "Expert pick",
    image: "", rating: 4.6, reviews: 213,
    location: "200m from main lift",
    languages: ["English", "Spanish"],
    certifications: ["ISIA", "BASI"],
    instructors: 22,
    sports: ["ski", "snowboard"],
    levels: ["beginner", "intermediate", "advanced"],
    ageGroups: ["adults", "teens"],
    lessonTypes: ["group", "private", "half_day", "full_day"],
    priceHalfDay: 38, priceFullDay: 70, pricePrivate: 85,
    availability: "available",
    groupSize: "max 6",
    highlights: ["Small groups", "Freestyle & freeride focus", "Video feedback"],
  },
  {
    id: "sc3", name: "Alpine Kidz School", badge: "Best for kids",
    image: "", rating: 4.9, reviews: 327,
    location: "Dedicated beginner area — 100m from Gondola 2",
    languages: ["English", "French", "German"],
    certifications: ["BASI", "Kinderland certified"],
    instructors: 31,
    sports: ["ski", "snowboard"],
    levels: ["beginner"],
    ageGroups: ["kids"],
    lessonTypes: ["group", "half_day", "full_day"],
    priceHalfDay: 36, priceFullDay: 65, pricePrivate: 80,
    availability: "available",
    groupSize: "max 5 kids",
    highlights: ["Ages 3–14", "Magic carpet & kid-friendly slopes", "Dedicated snowgarden"],
  },
  {
    id: "sc4", name: "Freeride Mountain Guides", badge: "Off-piste specialists",
    image: "", rating: 4.7, reviews: 118,
    location: "Village centre",
    languages: ["English", "French", "German"],
    certifications: ["IFMGA", "UIAGM"],
    instructors: 12,
    sports: ["ski"],
    levels: ["advanced", "expert"],
    ageGroups: ["adults"],
    lessonTypes: ["private", "full_day"],
    priceHalfDay: null, priceFullDay: 140, pricePrivate: 140,
    availability: "limited",
    groupSize: "max 4",
    highlights: ["Avalanche safety included", "Off-piste & backcountry", "Heli-skiing available"],
  },
  {
    id: "sc5", name: "Snow & Board Academy", badge: "Local favourite",
    image: "", rating: 4.5, reviews: 189,
    location: "150m from main lift",
    languages: ["English", "German", "Italian"],
    certifications: ["BASI", "SIA"],
    instructors: 26,
    sports: ["ski", "snowboard"],
    levels: ["beginner", "intermediate", "advanced"],
    ageGroups: ["adults", "kids", "teens"],
    lessonTypes: ["group", "private", "half_day", "full_day"],
    priceHalfDay: 40, priceFullDay: 72, pricePrivate: 88,
    availability: "available",
    groupSize: "max 8",
    highlights: ["Mixed adult & teen groups", "Park & freestyle lessons", "Equipment hire deals"],
  },
  {
    id: "sc6", name: "Nordic & Touring Center", badge: "Cross-country",
    image: "", rating: 4.4, reviews: 67,
    location: "Nordic trail entrance",
    languages: ["English", "French"],
    certifications: ["Nordic certified"],
    instructors: 8,
    sports: ["nordic", "telemark"],
    levels: ["beginner", "intermediate"],
    ageGroups: ["adults"],
    lessonTypes: ["group", "private", "half_day"],
    priceHalfDay: 35, priceFullDay: 60, pricePrivate: 75,
    availability: "available",
    groupSize: "max 6",
    highlights: ["Telemark lessons", "Ski touring intro", "Trail passes included"],
  },
];

const LEVELS = ["beginner", "intermediate", "advanced", "expert"];
const LEVEL_LABELS = { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced", expert: "Expert / Off-piste" };
const AGE_GROUPS = ["adults", "kids", "teens"];
const AGE_LABELS = { adults: "Adults", kids: "Kids (3–14)", teens: "Teens (14–17)" };
const SPORTS = ["ski", "snowboard", "telemark", "nordic"];
const SPORT_LABELS = { ski: "🎿 Ski", snowboard: "🏂 Snowboard", telemark: "🎿 Telemark", nordic: "⛷️ Nordic" };
const LESSON_TYPES = [
  { key: "group", label: "Group" },
  { key: "private", label: "Private" },
  { key: "half_day", label: "Half day" },
  { key: "full_day", label: "Full day" },
];

function AvailBadge({ status }) {
  const cfg = { available: "bg-peak-green/80 text-white", limited: "bg-amber-500/80 text-white", unavailable: "bg-peak-red/80 text-white" };
  const labels = { available: "Available", limited: "Limited", unavailable: "Unavailable" };
  return <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cfg[status] || cfg.available}`}>{labels[status] || "Available"}</span>;
}

function SchoolCard({ school, lessonType, days, onBook, t }) {
  const [expanded, setExpanded] = useState(false);
  const price = lessonType === "private" ? school.pricePrivate
    : lessonType === "full_day" ? school.priceFullDay
    : school.priceHalfDay;
  const total = price != null ? price * days : null;

  return (
    <div className="bg-peak-card border border-white/5 rounded-2xl overflow-hidden hover:border-white/12 transition-all group">
      {/* Image */}
      <div className="relative h-44 bg-peak-surface overflow-hidden">
        {school.image
          ? <img src={school.image} alt={school.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          : <div className="w-full h-full flex items-center justify-center text-5xl opacity-20">🎿</div>
        }
        <div className="absolute top-3 left-3">
          <span className="bg-peak-blue/90 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">{school.badge}</span>
        </div>
        <div className="absolute top-3 right-3"><AvailBadge status={school.availability} /></div>
      </div>
      {/* Body */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-display font-bold text-peak-text text-base leading-tight">{school.name}</h3>
          <div className="text-right flex-shrink-0">
            {price != null ? (
              <>
                <p className="text-peak-text font-bold">€{price}<span className="text-peak-text-secondary text-xs font-normal"> / {lessonType === "full_day" ? "day" : lessonType === "private" ? "hr" : "half-day"}</span></p>
                {days > 1 && total && <p className="text-peak-text-secondary text-xs">€{total} for {days} days</p>}
              </>
            ) : <p className="text-peak-text-secondary text-xs italic">Contact for price</p>}
          </div>
        </div>
        <div className="flex items-center gap-2 mb-1.5">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-peak-text text-sm font-semibold">{school.rating}</span>
          <span className="text-peak-text-secondary text-xs">({school.reviews})</span>
        </div>
        <div className="flex items-center gap-1 text-peak-text-secondary text-xs mb-1.5">
          <MapPin className="h-3 w-3" />
          <span className="truncate">{school.location}</span>
        </div>
        <div className="flex items-center gap-1 text-peak-text-secondary text-xs mb-2">
          <Globe className="h-3 w-3" />
          <span>{school.languages.join(" · ")}</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-2">
          {school.levels.map(l => <span key={l} className="text-xs bg-white/5 text-peak-text-secondary px-2 py-0.5 rounded-full capitalize">{LEVEL_LABELS[l]}</span>)}
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {school.certifications.map(c => <span key={c} className="text-xs border border-peak-blue/30 text-peak-blue px-2 py-0.5 rounded-full">{c}</span>)}
        </div>
        <div className="flex gap-2">
          <button onClick={() => onBook?.(school)} disabled={school.availability === "unavailable"}
            className="flex-1 py-2.5 bg-peak-red hover:bg-peak-red-hover disabled:opacity-40 text-white text-sm font-semibold rounded-xl transition-colors">
            {t ? t("add_to_trip") : "Add to trip"}
          </button>
          <button onClick={() => setExpanded(e => !e)}
            className="px-3 py-2.5 rounded-xl border border-white/10 text-peak-text-secondary hover:text-peak-text transition-colors">
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
        {expanded && (
          <div className="mt-3 pt-3 border-t border-white/5 space-y-2 text-xs">
            <p className="text-peak-text-secondary">{school.instructors} instructors · {school.groupSize}</p>
            <div className="flex flex-wrap gap-1">
              {school.ageGroups.map(a => <span key={a} className="bg-peak-blue/10 text-peak-blue px-2 py-0.5 rounded-full">{AGE_LABELS[a]}</span>)}
            </div>
            <div className="space-y-0.5">
              {school.highlights.map(h => <p key={h} className="text-peak-text-secondary">✓ {h}</p>)}
            </div>
            {school.priceHalfDay && <p className="text-peak-text-secondary">Half-day €{school.priceHalfDay} · Full-day €{school.priceFullDay} · Private €{school.pricePrivate}/hr</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SkiSchoolTab({ agentServiceDetails = {}, onBook }) {
  const { session } = useTripPlanner();
  const t = useT();
  const days = session?.dates?.nights ? session.dates.nights + 1 : (agentServiceDetails?.days || 3);
  const destination = session?.destination?.label || agentServiceDetails?.destination || "";

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("recommended");
  const [filterLevels, setFilterLevels] = useState([]);
  const [filterAgeGroups, setFilterAgeGroups] = useState([]);
  const [filterSport, setFilterSport] = useState("ski");
  const [filterLessonType, setFilterLessonType] = useState("half_day");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  function toggleArr(arr, setArr, val) {
    setArr(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]);
  }

  const filtered = useMemo(() => {
    let res = SCHOOLS.filter(s => s.sports.includes(filterSport));
    if (search) res = res.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.languages.some(l => l.toLowerCase().includes(search.toLowerCase())));
    if (filterLevels.length) res = res.filter(s => filterLevels.some(l => s.levels.includes(l)));
    if (filterAgeGroups.length) res = res.filter(s => filterAgeGroups.some(a => s.ageGroups.includes(a)));
    if (filterLessonType) res = res.filter(s => s.lessonTypes.includes(filterLessonType));
    if (sortBy === "rating") res.sort((a, b) => b.rating - a.rating);
    if (sortBy === "price_asc") res.sort((a, b) => (a.priceHalfDay || 999) - (b.priceHalfDay || 999));
    if (sortBy === "price_desc") res.sort((a, b) => (b.priceHalfDay || 0) - (a.priceHalfDay || 0));
    return res;
  }, [search, sortBy, filterLevels, filterAgeGroups, filterSport, filterLessonType]);

  const hasFilters = filterLevels.length > 0 || filterAgeGroups.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full">
      <div className="mb-6">
        <h2 className="font-display font-extrabold text-3xl text-peak-text mb-1">{t ? t("ski_school") : "Ski School"}</h2>
        <p className="text-peak-text-secondary text-sm">
          {destination ? `Schools near ${destination}` : "Browse ski & snowboard schools — select a resort to filter by location"}
          {days > 1 ? ` · ${days} days` : ""}
        </p>
      </div>

      {/* Sport + lesson type + search + sort */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex rounded-xl overflow-hidden border border-white/10">
          {SPORTS.map(s => (
            <button key={s} onClick={() => setFilterSport(s)}
              className={`px-3 py-2 text-xs font-medium transition-colors ${filterSport === s ? "bg-peak-blue text-white" : "text-peak-text-secondary hover:text-peak-text"}`}>
              {SPORT_LABELS[s]}
            </button>
          ))}
        </div>
        <div className="flex rounded-xl overflow-hidden border border-white/10">
          {LESSON_TYPES.map(lt => (
            <button key={lt.key} onClick={() => setFilterLessonType(lt.key)}
              className={`px-3 py-2 text-xs font-medium transition-colors ${filterLessonType === lt.key ? "bg-peak-red text-white" : "text-peak-text-secondary hover:text-peak-text"}`}>
              {lt.label}
            </button>
          ))}
        </div>
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-peak-text-secondary" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search schools or languages..."
            className="w-full bg-peak-surface border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
        </div>
        <button onClick={() => setSidebarOpen(o => !o)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm transition-colors ${sidebarOpen ? "bg-peak-blue/10 border-peak-blue/40 text-peak-blue" : "border-white/10 text-peak-text-secondary hover:text-peak-text"}`}>
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {hasFilters && <span className="bg-peak-red text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{filterLevels.length + filterAgeGroups.length}</span>}
        </button>
      </div>

      <div className="flex gap-6">
        {sidebarOpen && (
          <div className="w-56 flex-shrink-0">
            <div className="bg-peak-card border border-white/5 rounded-2xl p-5 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-peak-text font-semibold text-sm">Filters</span>
                {hasFilters && <button onClick={() => { setFilterLevels([]); setFilterAgeGroups([]); }} className="text-xs text-peak-blue hover:underline">Clear</button>}
              </div>
              <div className="mb-5">
                <p className="text-peak-text-secondary text-xs font-semibold uppercase tracking-wider mb-3">Skill level</p>
                {LEVELS.map(level => (
                  <button key={level} onClick={() => toggleArr(filterLevels, setFilterLevels, level)}
                    className={`flex items-center gap-2 w-full text-left text-xs px-3 py-2 rounded-lg mb-1 transition-colors ${filterLevels.includes(level) ? "bg-peak-blue/15 text-peak-blue" : "text-peak-text-secondary hover:text-peak-text hover:bg-white/4"}`}>
                    {filterLevels.includes(level) && <Check className="h-3 w-3 flex-shrink-0" />}
                    {LEVEL_LABELS[level]}
                  </button>
                ))}
              </div>
              <div>
                <p className="text-peak-text-secondary text-xs font-semibold uppercase tracking-wider mb-3">Age group</p>
                {AGE_GROUPS.map(ag => (
                  <button key={ag} onClick={() => toggleArr(filterAgeGroups, setFilterAgeGroups, ag)}
                    className={`flex items-center gap-2 w-full text-left text-xs px-3 py-2 rounded-lg mb-1 transition-colors ${filterAgeGroups.includes(ag) ? "bg-peak-blue/15 text-peak-blue" : "text-peak-text-secondary hover:text-peak-text hover:bg-white/4"}`}>
                    {filterAgeGroups.includes(ag) && <Check className="h-3 w-3 flex-shrink-0" />}
                    {AGE_LABELS[ag]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-peak-text-secondary text-sm mb-4">{filtered.length} schools found</p>
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-peak-text-secondary">
              <p className="text-lg mb-2">No schools match your filters</p>
              <button onClick={() => { setFilterLevels([]); setFilterAgeGroups([]); }} className="text-peak-blue text-sm hover:underline">Clear filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map(school => (
                <SchoolCard key={school.id} school={school} lessonType={filterLessonType} days={days}
                  onBook={s => onBook?.(`${s.name} — ${filterLessonType.replace("_"," ")}`, (s.priceHalfDay || s.priceFullDay || 0) * days, { school: s.name, lessonType: filterLessonType, days, sport: filterSport })}
                  t={t} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
