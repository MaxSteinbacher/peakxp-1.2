import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Star, MapPin, ChevronDown, ChevronUp, Check, Globe } from "lucide-react";
import { useTripPlanner } from "../../context/TripPlannerContext";
import { useT } from "../../lib/i18n";

// ─── Static school data ──────────────────────────────────────────────────────
const SCHOOLS = [
  {
    id: "skischule-mariaalm", name: "Skischule Maria Alm", badge: "official_partner",
    image: "https://www.skischule-mariaalm.at/fileadmin/_processed_/e/6/csm_Mannschaft_2026_b441d92673.jpg",
    rating: 4.9, reviews: 634,
    location: "Dorfstraße 8, Maria Alm — multiple meeting points at Hochkönig",
    languages: ["English", "German", "Dutch", "Danish"],
    certifications: ["ISIA", "ÖSV", "Headquarters Snowboard School"],
    instructors: 60,
    sports: ["ski", "snowboard"],
    levels: ["beginner", "intermediate", "advanced", "expert"],
    ageGroups: ["adults", "kids", "teens"],
    lessonTypes: ["group", "private", "half_day", "full_day"],
    priceHalfDay: 96, priceFullDay: 131, pricePrivate: 203,
    availability: "available",
    groupSize: "max 8",
    resort: "hochkonig",
    website: "https://www.skischule-mariaalm.at",
    phone: "+43 6584 94100",
    highlights: [
      "Bambini club from age 3 (from €74)",
      "Children full-day from €131 — personal Level Pass",
      "Adults beginner & advanced from €161",
      "Private lessons from €203",
      "Snowboard full-day €355 — Headquarters Snowboard School",
      "Language guarantees: Dutch & Danish groups",
      "Online early booking discount up to 5%",
      "Free cancellation with insurance up to 24h before",
    ],
  },
  {
    id: "skischule-reith", name: "Skischule Reith bei Kitzbühel", badge: "official_partner",
    image: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/f87372054_AS-PHOTO-231203-1199-web2048px72dpi.jpg",
    rating: 4.9, reviews: 521,
    location: "Kirchweg 7, 6370 Reith bei Kitzbühel — own Skiwiese & dedicated Kinderland",
    languages: ["English", "German"],
    certifications: ["ÖSV", "State-certified ski & mountain guides", "State-certified snowboard instructors"],
    instructors: 150,
    sports: ["ski", "snowboard", "nordic"],
    levels: ["beginner", "intermediate", "advanced", "expert"],
    ageGroups: ["adults", "kids", "teens"],
    lessonTypes: ["group", "private", "half_day", "full_day"],
    priceHalfDay: 60, priceFullDay: 90, pricePrivate: 230,
    availability: "available",
    groupSize: "5–8 per group",
    resort: "kitzski",
    website: "https://www.skischule-reith.at",
    phone: "+43 5356 654 96",
    email: "office@skischule-reith.at",
    highlights: [
      "Up to 150 certified ski, snowboard & cross-country instructors",
      "1,000m² dedicated Kinderland with 4 conveyor belts & free skilift",
      "Bambini Club from age 2 (€50/half-day) — HUBSI childcare",
      "Children group courses from €90/day (groups of 5–8)",
      "Private ski/snowboard/cross-country from €230 (2h) — peak season",
      "Freeride private from €450/day",
      "Race school (Rennschule) for competitive training",
      "Free parking, 100m bobsled run, ski bus connection",
      "Modern snowmaking — guaranteed skiing all season",
      "Special deals: early season & school holidays (up to –40%)",
      "Operates in Kitzbühel region — Kitz Ski, SkiWelt & St. Johann",
    ],
    images: [
      "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/f87372054_AS-PHOTO-231203-1199-web2048px72dpi.jpg",
      "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/cfc14b06c_AS-PHOTO-231203-1511-web2048px72dpi.jpg",
      "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/fffdc630a_AY5I5493.jpg",
      "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/4e22237b1_DJI_0133.jpg",
      "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/bb7cfb802_GruppenfotoLogoneu.jpg",
      "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/28e31ff53_Skischule_Winter.jpg",
      "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/7b09e0d33_AY5I5181.jpg",
    ],
  },
  {
    id: "sc1", name: "Ecole du Ski Français", badge: "top_rated",
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
    id: "sc2", name: "Peak Ski Academy", badge: "expert_pick",
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
    id: "sc3", name: "Alpine Kidz School", badge: "best_for_kids",
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
    id: "sc4", name: "Freeride Mountain Guides", badge: "off_piste",
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
    id: "sc5", name: "Snow & Board Academy", badge: "local_favourite",
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
    id: "sc6", name: "Nordic & Touring Center", badge: "cross_country",
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
const LEVEL_LABELS = {
  beginner: "Beginner", intermediate: "Intermediate",
  advanced: "Advanced", expert: "Expert / Off-piste",
};
const AGE_GROUPS = ["adults", "kids", "teens"];
const AGE_LABELS = { adults: "Adults", kids: "Kids (3–14)", teens: "Teens (14–17)" };
const SPORTS = ["ski", "snowboard", "telemark", "nordic"];
const SPORT_LABELS = { ski: "🎿 Ski", snowboard: "🏂 Snowboard", telemark: "🎿 Telemark", nordic: "⛷️ Nordic" };

const LESSON_TYPES = [
  { key: "group", labelKey: "group_lesson" },
  { key: "private", labelKey: "private_lesson" },
  { key: "half_day", labelKey: "half_day" },
  { key: "full_day", labelKey: "full_day" },
];

const SORT_OPTS = [
  { key: "recommended", labelKey: "recommended" },
  { key: "rating", labelKey: "rating" },
  { key: "price_asc", labelKey: "price_low" },
  { key: "price_desc", labelKey: "price_high" },
];

const BADGE_LABELS = {
  official_partner: "⭐ Official Partner",
  top_rated: "Top rated",
  expert_pick: "Expert pick",
  best_for_kids: "Best for kids",
  off_piste: "Off-piste specialists",
  local_favourite: "Local favourite",
  cross_country: "Cross-country",
};

const AVAIL_LABELS = { available: "Available", limited: "Limited", unavailable: "Unavailable" };
const AVAIL_COLORS = {
  available: "bg-peak-green/80 text-white",
  limited: "bg-amber-500/80 text-white",
  unavailable: "bg-peak-red/80 text-white",
};

function SchoolCard({ school, lessonType, days, onOpenPanel, t }) {
  const [expanded, setExpanded] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);
  const photos = school.images?.length ? school.images : (school.image ? [school.image] : []);

  // Price based on selected lesson type
  const price = lessonType === "private" ? school.pricePrivate
    : lessonType === "full_day" ? school.priceFullDay
    : school.priceHalfDay; // group & half_day both show half-day rate
  const total = price != null ? price * days : null;
  const isOfficial = school.badge === "official_partner";

  const priceLabel = lessonType === "full_day" ? `/${t("day")}`
    : lessonType === "private" ? "/hr"
    : `/${t("half_day")}`;

  return (
    <div className={`bg-peak-card border rounded-2xl overflow-hidden transition-all group ${isOfficial ? "border-peak-red/30 hover:border-peak-red/50" : "border-white/5 hover:border-white/12"}`}>
      {/* Image */}
      <div className="relative h-44 bg-peak-surface overflow-hidden">
        {photos.length > 0
          ? <img src={photos[imgIdx]} alt={school.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          : <div className="w-full h-full flex items-center justify-center text-5xl opacity-20">🎿</div>
        }
        {photos.length > 1 && (
          <div className="absolute bottom-2 right-2 flex gap-1">
            {photos.map((_, i) => (
              <button key={i} onClick={e => { e.stopPropagation(); setImgIdx(i); }}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${i === imgIdx ? "bg-white" : "bg-white/40"}`} />
            ))}
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className={`backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full ${isOfficial ? "bg-peak-red" : "bg-peak-blue/90"}`}>
            {BADGE_LABELS[school.badge] || school.badge}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${AVAIL_COLORS[school.availability] || AVAIL_COLORS.available}`}>
            {AVAIL_LABELS[school.availability] || "Available"}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-display font-bold text-peak-text text-base leading-tight">{school.name}</h3>
          <div className="text-right flex-shrink-0">
            {price != null ? (
              <>
                <p className="text-peak-text font-bold">€{price}<span className="text-peak-text-secondary text-xs font-normal">{priceLabel}</span></p>
                {days > 1 && total && <p className="text-peak-text-secondary text-xs">€{total} / {days} {t("days")}</p>}
              </>
            ) : <p className="text-peak-text-secondary text-xs italic">{t("show_details")}</p>}
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
          {school.levels.map(l => (
            <span key={l} className="text-xs bg-white/5 text-peak-text-secondary px-2 py-0.5 rounded-full">
              {LEVEL_LABELS[l]}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {school.certifications.map(c => (
            <span key={c} className="text-xs border border-peak-blue/30 text-peak-blue px-2 py-0.5 rounded-full">{c}</span>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onOpenPanel?.(school)}
            disabled={school.availability === "unavailable"}
            className="flex-1 py-2.5 bg-peak-red hover:bg-peak-red-hover disabled:opacity-40 text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            Book lesson
          </button>
          <button
            onClick={() => setExpanded(e => !e)}
            className="px-3 py-2.5 rounded-xl border border-white/10 text-peak-text-secondary hover:text-peak-text transition-colors"
          >
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>

        {expanded && (
          <div className="mt-3 pt-3 border-t border-white/5 space-y-2 text-xs">
            <p className="text-peak-text-secondary">{school.instructors} {t("ski_school_tab")} · {school.groupSize}</p>
            {school.phone && <p className="text-peak-text-secondary">📞 {school.phone}</p>}
            <div className="flex flex-wrap gap-1">
              {school.ageGroups.map(a => (
                <span key={a} className="bg-peak-blue/10 text-peak-blue px-2 py-0.5 rounded-full">{AGE_LABELS[a]}</span>
              ))}
            </div>
            <div className="space-y-0.5">
              {school.highlights.map(h => <p key={h} className="text-peak-text-secondary">✓ {h}</p>)}
            </div>
            <div className="text-peak-text-secondary space-y-0.5">
              {school.priceHalfDay && <p>{t("half_day")}: €{school.priceHalfDay} · {t("full_day")}: €{school.priceFullDay} · {t("private_lesson")}: €{school.pricePrivate}</p>}
            </div>
            {school.website && (
              <a href={school.website} target="_blank" rel="noopener noreferrer" className="text-peak-blue hover:underline block">
                {school.website}
              </a>
            )}
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

  const dest = destination.toLowerCase();
  const isHochkonig = dest.includes("hochkönig") || dest.includes("hochkonig") || dest.includes("maria alm");
  const isKitzArea = dest.includes("kitzbühel") || dest.includes("kitzbuehel") || dest.includes("kitzbuhel")
    || dest.includes("kitz ski") || dest.includes("skiwelt") || dest.includes("ski welt")
    || dest.includes("st. johann") || dest.includes("st.johann") || dest.includes("reith");

  const filtered = useMemo(() => {
    let res = SCHOOLS.filter(s => s.sports.includes(filterSport));

    // Show resort-specific schools only when their resort is selected
    res = res.filter(s => {
      if (!s.resort) return true;
      if (s.id === "skischule-mariaalm") return isHochkonig;
      if (s.id === "skischule-reith") return isKitzArea;
      return true;
    });

    if (search) {
      const q = search.toLowerCase();
      res = res.filter(s => s.name.toLowerCase().includes(q) || s.languages.some(l => l.toLowerCase().includes(q)));
    }
    if (filterLevels.length) res = res.filter(s => filterLevels.some(l => s.levels.includes(l)));
    if (filterAgeGroups.length) res = res.filter(s => filterAgeGroups.some(a => s.ageGroups.includes(a)));

    // Sort — official partners always first in recommended
    if (sortBy === "rating") res.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "price_asc") res.sort((a, b) => (a.priceHalfDay || 999) - (b.priceHalfDay || 999));
    else if (sortBy === "price_desc") res.sort((a, b) => (b.priceHalfDay || 0) - (a.priceHalfDay || 0));
    else res.sort((a, b) => (b.badge === "official_partner" ? 1 : 0) - (a.badge === "official_partner" ? 1 : 0));

    return res;
  }, [search, sortBy, filterLevels, filterAgeGroups, filterSport, isHochkonig, isKitzArea]);

  const hasFilters = filterLevels.length > 0 || filterAgeGroups.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="font-display font-extrabold text-3xl text-peak-text mb-1">{t("ski_school_tab")}</h2>
        <p className="text-peak-text-secondary text-sm">
          {destination ? `${t("schools_near") || "Schools near"} ${destination}` : t("choose_school")}
          {days > 1 ? ` · ${days} ${t("nights")}` : ""}
        </p>
      </div>

      {/* Controls row */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* Sport selector */}
        <div className="flex rounded-xl overflow-hidden border border-white/10">
          {SPORTS.map(s => (
            <button key={s} onClick={() => setFilterSport(s)}
              className={`px-3 py-2 text-xs font-medium transition-colors ${filterSport === s ? "bg-peak-blue text-white" : "text-peak-text-secondary hover:text-peak-text"}`}>
              {SPORT_LABELS[s]}
            </button>
          ))}
        </div>

        {/* Lesson type selector */}
        <div className="flex rounded-xl overflow-hidden border border-white/10">
          {LESSON_TYPES.map(lt => (
            <button key={lt.key} onClick={() => setFilterLessonType(lt.key)}
              className={`px-3 py-2 text-xs font-medium transition-colors ${filterLessonType === lt.key ? "bg-peak-red text-white" : "text-peak-text-secondary hover:text-peak-text"}`}>
              {t(lt.labelKey)}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-peak-text-secondary" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder={`${t("search")}...`}
            className="w-full bg-peak-surface border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
        </div>

        {/* Filters toggle */}
        <button onClick={() => setSidebarOpen(o => !o)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm transition-colors ${sidebarOpen ? "bg-peak-blue/10 border-peak-blue/40 text-peak-blue" : "border-white/10 text-peak-text-secondary hover:text-peak-text"}`}>
          <SlidersHorizontal className="h-4 w-4" />
          {t("filters")}
          {hasFilters && <span className="bg-peak-red text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{filterLevels.length + filterAgeGroups.length}</span>}
        </button>

        {/* Sort */}
        <div className="flex gap-1.5 overflow-x-auto hide-scrollbar">
          {SORT_OPTS.map(o => (
            <button key={o.key} onClick={() => setSortBy(o.key)}
              className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap border transition-colors ${sortBy === o.key ? "bg-peak-blue/20 border-peak-blue/40 text-peak-blue" : "border-white/10 text-peak-text-secondary hover:text-peak-text"}`}>
              {t(o.labelKey)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        {sidebarOpen && (
          <div className="w-56 flex-shrink-0">
            <div className="bg-peak-card border border-white/5 rounded-2xl p-5 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-peak-text font-semibold text-sm">{t("filters")}</span>
                {hasFilters && (
                  <button onClick={() => { setFilterLevels([]); setFilterAgeGroups([]); }}
                    className="text-xs text-peak-blue hover:underline">{t("clear")}</button>
                )}
              </div>

              {/* Skill level */}
              <div className="mb-5">
                <p className="text-peak-text-secondary text-xs font-semibold uppercase tracking-wider mb-3">{t("difficulty")}</p>
                {LEVELS.map(level => (
                  <button key={level} onClick={() => toggleArr(filterLevels, setFilterLevels, level)}
                    className={`flex items-center gap-2 w-full text-left text-xs px-3 py-2 rounded-lg mb-1 transition-colors ${filterLevels.includes(level) ? "bg-peak-blue/15 text-peak-blue" : "text-peak-text-secondary hover:text-peak-text"}`}>
                    {filterLevels.includes(level) && <Check className="h-3 w-3 flex-shrink-0" />}
                    {LEVEL_LABELS[level]}
                  </button>
                ))}
              </div>

              {/* Age group */}
              <div>
                <p className="text-peak-text-secondary text-xs font-semibold uppercase tracking-wider mb-3">{t("guests")}</p>
                {AGE_GROUPS.map(ag => (
                  <button key={ag} onClick={() => toggleArr(filterAgeGroups, setFilterAgeGroups, ag)}
                    className={`flex items-center gap-2 w-full text-left text-xs px-3 py-2 rounded-lg mb-1 transition-colors ${filterAgeGroups.includes(ag) ? "bg-peak-blue/15 text-peak-blue" : "text-peak-text-secondary hover:text-peak-text"}`}>
                    {filterAgeGroups.includes(ag) && <Check className="h-3 w-3 flex-shrink-0" />}
                    {AGE_LABELS[ag]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Grid */}
        <div className="flex-1 min-w-0">
          <p className="text-peak-text-secondary text-sm mb-4">
            {filtered.length} {t("schools_found") || "schools found"}
          </p>
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-peak-text-secondary">
              <p className="text-lg mb-2">{t("no_results") || "No schools match your filters"}</p>
              <button onClick={() => { setFilterLevels([]); setFilterAgeGroups([]); }}
                className="text-peak-blue text-sm hover:underline">{t("clear_filters")}</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map(school => (
                <SchoolCard
                  key={school.id}
                  school={school}
                  lessonType={filterLessonType}
                  days={days}
                  onBook={s => onBook?.(
                    `${s.name} — ${t(LESSON_TYPES.find(l => l.key === filterLessonType)?.labelKey || filterLessonType)}`,
                    (filterLessonType === "private" ? s.pricePrivate : filterLessonType === "full_day" ? s.priceFullDay : s.priceHalfDay || 0) * days,
                    { school: s.name, lessonType: filterLessonType, days, sport: filterSport }
                  )}
                  t={t}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {panelSchool && (
        <LessonPanel
          school={panelSchool}
          lessonType={filterLessonType}
          days={days}
          profile={profile}
          updateProfile={updateProfile}
          onClose={() => setPanelSchool(null)}
          onConfirm={booking => {
            onBook?.(booking.label, booking.price, booking);
            setPanelSchool(null);
          }}
        />
      )}
    </div>
  );
}