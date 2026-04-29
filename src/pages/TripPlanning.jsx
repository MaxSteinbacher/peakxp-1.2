import { useState } from "react";
import { Mountain, Building2, Wrench, GraduationCap, Plane, Train, Car, Package, UtensilsCrossed, Zap, Baby } from "lucide-react";
import ResortsTab from "../components/trip/ResortsTab";
import AccommodationTab from "../components/trip/AccommodationTab";
import PlaceholderTab from "../components/trip/PlaceholderTab";

const tabs = [
  { key: "resorts", label: "All Resorts", icon: Mountain },
  { key: "accommodation", label: "Accommodation", icon: Building2 },
  { key: "equipment", label: "Equipment Rental", icon: Wrench },
  { key: "ski-school", label: "Ski School", icon: GraduationCap },
  { key: "flights", label: "Flights", icon: Plane },
  { key: "train", label: "Train", icon: Train },
  { key: "car-rental", label: "Car Rental", icon: Car },
  { key: "storage", label: "Storage & Lockers", icon: Package },
  { key: "dining", label: "Dining", icon: UtensilsCrossed },
  { key: "activities", label: "Activities", icon: Zap },
  { key: "childcare", label: "Childcare", icon: Baby },
];

const placeholderInfo = {
  equipment: { title: "Equipment Rental", description: "Browse and pre-book premium ski equipment from top rental shops at your destination resort." },
  "ski-school": { title: "Ski School", description: "Find AI-matched instructors and group lessons tailored to your skill level and goals." },
  flights: { title: "Flights", description: "Search and book flights to the nearest airports for your chosen ski resort." },
  train: { title: "Train", description: "Find rail connections to the Alps — often the most scenic and stress-free way to arrive." },
  "car-rental": { title: "Car Rental", description: "Compare rental cars with ski racks, snow tyres and flexible pick-up options near your resort." },
  storage: { title: "Storage & Lockers", description: "Reserve on-mountain storage and locker facilities so you ski hands-free every day." },
  dining: { title: "Dining", description: "Discover the best mountain restaurants, slope-side cafés and après-ski venues." },
  activities: { title: "Activities", description: "From snowshoeing to spa days — book off-slope activities for the whole group." },
  childcare: { title: "Childcare", description: "Trusted childcare and crèche services at the resort, so the whole family can enjoy the mountain." },
};

export default function TripPlanning() {
  const [activeTab, setActiveTab] = useState("resorts");
  const active = tabs.find((t) => t.key === activeTab);

  function renderContent() {
    if (activeTab === "resorts") return <ResortsTab />;
    if (activeTab === "accommodation") return <AccommodationTab />;
    const info = placeholderInfo[activeTab];
    return <PlaceholderTab title={info.title} description={info.description} icon={active?.icon} />;
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Page header */}
      <div className="border-b border-white/5 bg-peak-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-0">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-peak-text mb-6">Trip Planning</h1>
          {/* Tab bar */}
          <div className="flex gap-1 overflow-x-auto hide-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? "border-peak-red text-peak-text"
                    : "border-transparent text-peak-text-secondary hover:text-peak-text"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </div>
    </div>
  );
}