import { MapPin, Calendar, Users, Luggage } from "lucide-react";

const features = [
  { icon: MapPin, title: "Destination Picker", desc: "Find the perfect resort based on your skill level, budget and travel window." },
  { icon: Calendar, title: "Itinerary Builder", desc: "Day-by-day ski trip planner with lift passes, lessons and accommodation." },
  { icon: Users, title: "Group Coordination", desc: "Invite your group and sync everyone's preferences in one shared plan." },
  { icon: Luggage, title: "Packing & Gear", desc: "Personalised packing lists and equipment rental pre-booked at the resort." },
];

export default function TripPlanning() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12 text-center">
        <span className="inline-block text-peak-blue text-xs font-semibold uppercase tracking-widest mb-3">Coming soon</span>
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-peak-text mb-4">Trip Planning</h1>
        <p className="text-peak-text-secondary text-lg max-w-2xl mx-auto">
          Everything you need to plan the perfect ski trip — from choosing your resort to booking every detail.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {features.map((f) => (
          <div key={f.title} className="bg-peak-card border border-white/5 rounded-2xl p-8 flex items-start gap-5">
            <div className="w-12 h-12 rounded-xl bg-peak-blue/10 flex items-center justify-center flex-shrink-0">
              <f.icon className="h-6 w-6 text-peak-blue" />
            </div>
            <div>
              <h3 className="text-peak-text font-bold text-lg mb-1">{f.title}</h3>
              <p className="text-peak-text-secondary text-sm">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}