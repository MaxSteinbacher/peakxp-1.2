import { useState } from "react";
import { useT } from "../lib/i18n";
import { Mountain, Building2, Wrench, GraduationCap, Plane, Train, Car, Package, UtensilsCrossed, Zap, Baby } from "lucide-react";
import ResortsTab from "../components/trip/ResortsTab";
import AccommodationTab from "../components/trip/AccommodationTab";
import PlaceholderTab from "../components/trip/PlaceholderTab";
import EquipmentRentalTab from "../components/trip/EquipmentRentalTab";
import SkiSchoolTab from "../components/trip/SkiSchoolTab";
import FlightsTab from "../components/trip/FlightsTab";
import TrainTab from "../components/trip/TrainTab";
import CarRentalTab from "../components/trip/CarRentalTab";
import StorageTab from "../components/trip/StorageTab";
import DiningTab from "../components/trip/DiningTab";

const TAB_KEYS = [
  { key: "resorts", i18nKey: "all_resorts", icon: Mountain },
  { key: "accommodation", i18nKey: "accommodation", icon: Building2 },
  { key: "equipment", i18nKey: "equipment_rental", icon: Wrench },
  { key: "ski-school", i18nKey: "ski_school", icon: GraduationCap },
  { key: "flights", i18nKey: "flights", icon: Plane },
  { key: "train", i18nKey: "train", icon: Train },
  { key: "car-rental", i18nKey: "car_rental", icon: Car },
  { key: "storage", i18nKey: "storage", icon: Package },
  { key: "dining", i18nKey: "dining", icon: UtensilsCrossed },
  { key: "activities", i18nKey: "activities", icon: Zap },
  { key: "childcare", i18nKey: "childcare", icon: Baby },
];

const placeholderInfo = {
  activities: { titleKey: "activities", descKey: "placeholder_activities_desc" },
  childcare: { titleKey: "childcare", descKey: "placeholder_childcare_desc" },
};

export default function TripPlanning() {
  const t = useT();
  const tabs = TAB_KEYS.map(tab => ({ ...tab, label: t(tab.i18nKey) }));
  const [activeTab, setActiveTab] = useState("resorts");
  const active = tabs.find((tab) => tab.key === activeTab);

  function renderContent() {
    if (activeTab === "resorts") return <ResortsTab />;
    if (activeTab === "accommodation") return <AccommodationTab />;
    if (activeTab === "equipment") return <EquipmentRentalTab />;
    if (activeTab === "ski-school") return <SkiSchoolTab />;
    if (activeTab === "flights") return <FlightsTab />;
    if (activeTab === "train") return <TrainTab />;
    if (activeTab === "car-rental") return <CarRentalTab />;
    if (activeTab === "storage") return <StorageTab />;
    if (activeTab === "dining") return <DiningTab />;
    const info = placeholderInfo[activeTab];
    return <PlaceholderTab title={t(info.titleKey)} description={t(info.descKey)} icon={active?.icon} />;
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Page header */}
      <div className="border-b border-white/5 bg-peak-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-0">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-peak-text mb-6">{t('trip_planning_title')}</h1>
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