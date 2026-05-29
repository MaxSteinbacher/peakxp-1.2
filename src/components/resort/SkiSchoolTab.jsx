import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Users, Clock, Globe, Baby, Star, Phone, Mail, ExternalLink, ChevronDown, ChevronUp, Check, Award } from "lucide-react";
import { getSkiSchoolsByResortId } from "@/lib/skiSchools";

function PartnerSchoolCard({ school }) {
  const [expanded, setExpanded] = useState(false);
  const [selectedImg, setSelectedImg] = useState(0);

  return (
    <div className="bg-peak-card border border-peak-blue/20 rounded-2xl overflow-hidden">
      {/* Hero image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={school.images[selectedImg]}
          alt={school.name}
          className="w-full h-full object-cover"
        />
        {/* Partner badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-peak-blue text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
          <Award className="w-3 h-3" />
          PeakXP Partner
        </div>
        {/* Thumbnail strip */}
        <div className="absolute bottom-3 right-3 flex gap-1.5">
          {school.images.slice(0, 5).map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedImg(i)}
              className={`w-8 h-8 rounded-md overflow-hidden border-2 transition-all ${selectedImg === i ? "border-white" : "border-white/30"}`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-display font-bold text-peak-text text-xl leading-tight">{school.name}</h3>
            <p className="text-peak-blue text-xs font-medium mt-0.5">{school.tagline}</p>
          </div>
          <div className="flex items-center gap-1 bg-yellow-500/10 px-2.5 py-1.5 rounded-lg flex-shrink-0">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-yellow-400 font-bold text-sm">{school.rating}</span>
            <span className="text-peak-text-secondary text-xs">({school.reviews})</span>
          </div>
        </div>

        <p className="text-peak-text-secondary text-xs mb-3">{school.location}</p>

        {/* Disciplines */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {school.disciplines.map(d => (
            <span key={d} className="text-xs bg-peak-blue/10 text-peak-blue border border-peak-blue/20 px-2.5 py-1 rounded-full font-medium">
              {d}
            </span>
          ))}
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-peak-surface rounded-xl p-3 text-center">
            <p className="text-peak-text font-bold text-lg">{school.instructorCount}+</p>
            <p className="text-peak-text-secondary text-xs">Instructors</p>
          </div>
          <div className="bg-peak-surface rounded-xl p-3 text-center">
            <p className="text-peak-text font-bold text-lg">€{school.groupLessonFrom}</p>
            <p className="text-peak-text-secondary text-xs">Group from</p>
          </div>
          <div className="bg-peak-surface rounded-xl p-3 text-center">
            <p className="text-peak-text font-bold text-lg">€{school.privateLessonFrom}</p>
            <p className="text-peak-text-secondary text-xs">Private from</p>
          </div>
        </div>

        {/* Contact */}
        <div className="flex flex-wrap gap-2 mb-4">
          <a href={`tel:${school.phone}`} className="flex items-center gap-1.5 text-xs bg-peak-surface border border-white/8 text-peak-text-secondary hover:text-peak-text px-3 py-2 rounded-lg transition-colors">
            <Phone className="w-3.5 h-3.5" /> {school.phone}
          </a>
          <a href={`mailto:${school.email}`} className="flex items-center gap-1.5 text-xs bg-peak-surface border border-white/8 text-peak-text-secondary hover:text-peak-text px-3 py-2 rounded-lg transition-colors">
            <Mail className="w-3.5 h-3.5" /> Email
          </a>
          <a href={school.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs bg-peak-blue/10 border border-peak-blue/20 text-peak-blue px-3 py-2 rounded-lg transition-colors hover:bg-peak-blue/20">
            <ExternalLink className="w-3.5 h-3.5" /> Website
          </a>
        </div>

        {/* Expand button */}
        <button
          onClick={() => setExpanded(e => !e)}
          className="w-full flex items-center justify-center gap-1.5 py-2 text-xs text-peak-text-secondary hover:text-peak-text transition-colors border border-white/8 rounded-xl"
        >
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          {expanded ? "Show less" : "Show full profile & pricing"}
        </button>

        {expanded && (
          <div className="mt-5 space-y-5">
            {/* Description */}
            <p className="text-peak-text-secondary text-sm leading-relaxed">{school.description}</p>

            {/* Highlights */}
            <div>
              <p className="text-peak-text font-semibold text-sm mb-2">What's included</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {school.highlights.map(h => (
                  <div key={h} className="flex items-start gap-2 text-xs text-peak-text-secondary">
                    <Check className="w-3.5 h-3.5 text-peak-green flex-shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing */}
            {school.offerings.map(cat => (
              <div key={cat.category}>
                <p className="text-peak-text font-semibold text-sm mb-2">{cat.category}</p>
                <div className="bg-peak-surface rounded-xl overflow-hidden">
                  {cat.items.map((item, i) => (
                    <div key={item.name} className={`flex items-center justify-between px-4 py-2.5 text-sm ${i < cat.items.length - 1 ? "border-b border-white/5" : ""}`}>
                      <span className="text-peak-text-secondary flex-1 mr-3">{item.name}</span>
                      <span className="text-peak-text font-semibold whitespace-nowrap">from €{item.priceFrom}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Price note */}
            {school.priceNote && (
              <p className="text-peak-text-secondary text-xs bg-peak-surface rounded-xl p-3 border border-white/5">
                ℹ️ {school.priceNote}
              </p>
            )}

            {/* Director */}
            {school.director && (
              <div className="bg-peak-surface rounded-xl p-4">
                <p className="text-peak-text font-semibold text-sm mb-1">{school.director.name}</p>
                <p className="text-peak-blue text-xs mb-2">{school.director.role}</p>
                <div className="flex flex-wrap gap-1.5">
                  {school.director.qualifications.map(q => (
                    <span key={q} className="text-xs bg-peak-card border border-white/8 text-peak-text-secondary px-2 py-0.5 rounded-full">{q}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            <div className="flex flex-wrap gap-2">
              {school.languages.map(l => (
                <span key={l} className="text-xs bg-peak-surface border border-white/8 text-peak-text-secondary px-2.5 py-1 rounded-full">{l}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SkiSchoolTab({ resort }) {
  const navigate = useNavigate();
  const f = resort.facilities || {};
  const partnerSchools = getSkiSchoolsByResortId(resort.id);

  return (
    <div className="space-y-8">
      {/* Partner Schools */}
      {partnerSchools.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="font-display font-bold text-peak-text text-xl">Featured Ski Schools</h3>
            <span className="bg-peak-blue/10 text-peak-blue text-xs font-semibold px-2.5 py-0.5 rounded-full">
              PeakXP Partner
            </span>
          </div>
          <div className="space-y-4">
            {partnerSchools.map(school => (
              <PartnerSchoolCard key={school.id} school={school} />
            ))}
          </div>
        </div>
      )}

      {/* All Schools list */}
      {resort.skiSchoolNames && resort.skiSchoolNames.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="font-display font-bold text-peak-text text-xl">All Ski Schools</h3>
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

      {/* General Pricing */}
      <div>
        <h3 className="font-display font-bold text-peak-text text-xl mb-4">Lesson Prices at This Resort</h3>
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