import { useState } from "react";
import { useT } from "../../lib/i18n";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Star, Minus, Plus } from "lucide-react";

const propertyTypes = ["Hotels", "Apartments", "Bed & Breakfast", "Entire homes", "Chalets"];
const facilities = [
  "Parking", "Swimming pool", "Spa", "Hot tub / Jacuzzi", "Fitness center",
  "Restaurant", "Airport shuttle", "Non-smoking rooms", "24-hour front desk",
  "EV charging station", "Wheelchair accessible", "Free WiFi", "Room service",
];
const meals = [
  "Breakfast included", "Breakfast & dinner included",
  "All meals included", "Breakfast & lunch included", "Kitchen facilities",
];
const reviewScores = [
  { label: "Exceptional", value: 9, suffix: "9+" },
  { label: "Wonderful", value: 8.5, suffix: "8.5+" },
  { label: "Very good", value: 8, suffix: "8+" },
  { label: "Good", value: 7.5, suffix: "7.5+" },
  { label: "Pleasant", value: 7, suffix: "7+" },
];
const bedTypes = ["Single", "Double", "Twin"];
const groupOptions = ["Family accommodations", "Pet friendly", "Adults only"];
const reservationPolicies = ["Free cancellation", "Book without credit card"];
const sustainabilityCerts = ["Sustainability certifications"];
const propertyAccess = [
  "Auditory guidance", "Visual aids (Braille)", "Visual aids (tactile signs)",
  "Toilet with grab rails", "Bathroom emergency cord", "Raised toilet", "Lowered sink",
];
const roomAccess = [
  "Upper floors accessible by elevator", "Roll-in shower", "Walk-in shower",
  "Adapted bath", "Entire unit on ground floor", "Toilet with grab rails",
  "Entire unit wheelchair accessible", "Emergency cord in bathroom",
  "Shower chair", "Lower sink", "Raised toilet",
];

function Section({ title, children }) {
  return (
    <div className="mb-6 border-b border-white/5 pb-6">
      <h4 className="text-sm font-semibold text-peak-text mb-3">{title}</h4>
      {children}
    </div>
  );
}

function CheckGroup({ items, selected, onToggle }) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <label key={item} className="flex items-center gap-2 cursor-pointer group">
          <Checkbox
            checked={selected.includes(item)}
            onCheckedChange={() => onToggle(item)}
            className="border-peak-text-secondary data-[state=checked]:bg-peak-blue data-[state=checked]:border-peak-blue"
          />
          <span className="text-sm text-peak-text-secondary group-hover:text-peak-text transition-colors">{item}</span>
        </label>
      ))}
    </div>
  );
}

function Counter({ label, value, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-peak-text-secondary">{label}</span>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onChange(Math.max(0, value - 1))}
          className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center hover:border-white/30 transition-colors"
        >
          <Minus className="h-3 w-3 text-peak-text" />
        </button>
        <span className="text-peak-text text-sm w-4 text-center">{value}</span>
        <button
          onClick={() => onChange(value + 1)}
          className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center hover:border-white/30 transition-colors"
        >
          <Plus className="h-3 w-3 text-peak-text" />
        </button>
      </div>
    </div>
  );
}

export default function AccommodationFilter() {
  const t = useT();
  const [budget, setBudget] = useState([50, 300]);
  const [propTypes, setPropTypes] = useState([]);
  const [distToSki, setDistToSki] = useState([5]);
  const [shuttle, setShuttle] = useState(false);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [selFacilities, setSelFacilities] = useState([]);
  const [selMeals, setSelMeals] = useState([]);
  const [reviewScore, setReviewScore] = useState(null);
  const [stars, setStars] = useState(0);
  const [distTrain, setDistTrain] = useState([100]);
  const [distAirport, setDistAirport] = useState([200]);
  const [bedPref, setBedPref] = useState([]);
  const [groupOpts, setGroupOpts] = useState([]);
  const [resPolicies, setResPolicies] = useState([]);
  const [certs, setCerts] = useState([]);
  const [propAccessOpts, setPropAccessOpts] = useState([]);
  const [roomAccessOpts, setRoomAccessOpts] = useState([]);

  const toggle = (setter) => (item) =>
    setter((prev) => prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]);

  return (
    <div className="w-64 flex-shrink-0 overflow-y-auto pr-2">
      {/* Budget */}
      <Section title={`Budget per day: €${budget[0]} – €${budget[1]}`}>
        <Slider
          value={budget}
          onValueChange={setBudget}
          min={10}
          max={1000}
          step={10}
          className="[&_[role=slider]]:bg-peak-blue [&_[role=slider]]:border-peak-blue [&_.bg-primary]:bg-peak-blue"
        />
      </Section>

      {/* Popular filters */}
      <Section title="Popular filters">
        <CheckGroup
          items={["Free cancellation", "Breakfast included", "No prepayment needed", "Pool"]}
          selected={[...resPolicies, ...selMeals]}
          onToggle={(item) => {
            if (["Free cancellation", "No prepayment needed"].includes(item)) toggle(setResPolicies)(item);
            else toggle(setSelMeals)(item);
          }}
        />
      </Section>

      {/* Property type */}
      <Section title="Property type">
        <CheckGroup items={propertyTypes} selected={propTypes} onToggle={toggle(setPropTypes)} />
      </Section>

      {/* Distance to ski area */}
      <Section title={`Distance to ski area: up to ${distToSki[0]} km`}>
        <Slider
          value={distToSki}
          onValueChange={setDistToSki}
          min={1}
          max={20}
          step={1}
          className="[&_[role=slider]]:bg-peak-blue [&_[role=slider]]:border-peak-blue [&_.bg-primary]:bg-peak-blue"
        />
      </Section>

      {/* Shuttle */}
      <Section title="Shuttle service">
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox
            checked={shuttle}
            onCheckedChange={setShuttle}
            className="border-peak-text-secondary data-[state=checked]:bg-peak-blue data-[state=checked]:border-peak-blue"
          />
          <span className="text-sm text-peak-text-secondary">Shuttle service available</span>
        </label>
      </Section>

      {/* Bedrooms & Bathrooms */}
      <Section title={t("bedrooms_bathrooms")}>
        <div className="space-y-3">
          <Counter label="Min. bedrooms" value={bedrooms} onChange={setBedrooms} />
          <Counter label="Min. bathrooms" value={bathrooms} onChange={setBathrooms} />
        </div>
      </Section>

      {/* Facilities */}
      <Section title={t("facilities")}>
        <CheckGroup items={facilities} selected={selFacilities} onToggle={toggle(setSelFacilities)} />
      </Section>

      {/* Meals */}
      <Section title={t("meals_included")}>
        <CheckGroup items={meals} selected={selMeals} onToggle={toggle(setSelMeals)} />
      </Section>

      {/* Review score */}
      <Section title="Review score">
        <div className="space-y-2">
          {reviewScores.map((s) => (
            <button
              key={s.value}
              onClick={() => setReviewScore(reviewScore === s.value ? null : s.value)}
              className={`w-full text-left px-3 py-2 rounded-lg border text-sm transition-colors ${
                reviewScore === s.value
                  ? "bg-peak-blue/20 border-peak-blue/40 text-peak-blue"
                  : "border-white/10 text-peak-text-secondary hover:text-peak-text"
              }`}
            >
              {s.label} <span className="opacity-60">{s.suffix}</span>
            </button>
          ))}
        </div>
      </Section>

      {/* Property rating */}
      <Section title="Property rating">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} onClick={() => setStars(stars === n ? 0 : n)}>
              <Star className={`h-5 w-5 ${n <= stars ? "fill-yellow-400 text-yellow-400" : "text-peak-text-secondary"}`} />
            </button>
          ))}
        </div>
      </Section>

      {/* Distance from train */}
      <Section title={`Distance from train station: up to ${distTrain[0]} km`}>
        <Slider
          value={distTrain}
          onValueChange={setDistTrain}
          min={5}
          max={100}
          step={5}
          className="[&_[role=slider]]:bg-peak-blue [&_[role=slider]]:border-peak-blue [&_.bg-primary]:bg-peak-blue"
        />
      </Section>

      {/* Distance from airport */}
      <Section title={`Distance from airport: up to ${distAirport[0]} km`}>
        <Slider
          value={distAirport}
          onValueChange={setDistAirport}
          min={5}
          max={200}
          step={5}
          className="[&_[role=slider]]:bg-peak-blue [&_[role=slider]]:border-peak-blue [&_.bg-primary]:bg-peak-blue"
        />
      </Section>

      {/* Bed preference */}
      <Section title={t("bed_preference")}>
        <div className="flex flex-wrap gap-2">
          {bedTypes.map((b) => (
            <button
              key={b}
              onClick={() => toggle(setBedPref)(b)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                bedPref.includes(b)
                  ? "bg-peak-blue/20 border-peak-blue/40 text-peak-blue"
                  : "border-white/10 text-peak-text-secondary hover:text-peak-text"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </Section>

      {/* Group travelling */}
      <Section title={t("group_travelling")}>
        <CheckGroup items={groupOptions} selected={groupOpts} onToggle={toggle(setGroupOpts)} />
      </Section>

      {/* Reservation policy */}
      <Section title="Reservation policy">
        <CheckGroup items={reservationPolicies} selected={resPolicies} onToggle={toggle(setResPolicies)} />
      </Section>

      {/* Certifications */}
      <Section title={t("certifications")}>
        <CheckGroup items={sustainabilityCerts} selected={certs} onToggle={toggle(setCerts)} />
      </Section>

      {/* Property accessibility */}
      <Section title="Property accessibility">
        <CheckGroup items={propertyAccess} selected={propAccessOpts} onToggle={toggle(setPropAccessOpts)} />
      </Section>

      {/* Room accessibility */}
      <Section title="Room accessibility">
        <CheckGroup items={roomAccess} selected={roomAccessOpts} onToggle={toggle(setRoomAccessOpts)} />
      </Section>
    </div>
  );
}