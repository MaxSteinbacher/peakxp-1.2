import { Link } from "react-router-dom";
import { Mountain, MapPin, Timer, TrendingUp, Heart, Star, Navigation, QrCode, Ticket } from "lucide-react";
import ResortCard from "../components/ResortCard";
import PerformanceChart from "../components/PerformanceChart";
import { dashboardData, resorts } from "../lib/data";

const activityIcons = {
  ticket: Ticket,
  heart: Heart,
  map: Navigation,
  star: Star,
};

export default function Dashboard() {
  const d = dashboardData;
  const savedResorts = resorts.filter((r) => d.savedResorts.includes(r.id));

  const stats = [
    { label: "Days on mountain", value: d.totalDays, icon: Mountain },
    { label: "Resorts visited", value: d.resortsVisited, icon: MapPin },
    { label: "Runs logged", value: d.runsLogged, icon: TrendingUp },
    { label: "Vertical metres", value: `${(d.verticalMetres / 1000).toFixed(1)}k`, icon: Timer },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome header */}
      <div className="flex items-center gap-4 mb-10">
        <div className="w-14 h-14 rounded-2xl bg-peak-blue/20 flex items-center justify-center flex-shrink-0">
          <span className="font-display font-bold text-peak-blue text-xl">{d.userName[0]}</span>
        </div>
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-peak-text">
            Welcome back, {d.userName}
          </h1>
          <p className="text-peak-text-secondary text-sm">
            {"You've"} skied {d.totalDays} days this season. Push further.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming trip */}
          <div className="bg-peak-card border border-white/5 rounded-xl overflow-hidden">
            <div className="flex">
              <div className="w-1.5 bg-peak-red" />
              <div className="flex-1 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display font-bold text-peak-text text-lg">Upcoming trip</h2>
                  <span className="bg-peak-red/10 text-peak-red text-xs font-bold px-3 py-1 rounded-full">
                    {d.upcomingTrip.daysAway} days away
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-peak-text font-semibold text-xl">{d.upcomingTrip.resort}</h3>
                    <p className="text-peak-text-secondary text-sm mt-1">{d.upcomingTrip.dates}</p>
                    <p className="text-peak-text-secondary text-sm">{d.upcomingTrip.passType}</p>
                  </div>
                  <div className="w-24 h-24 bg-peak-surface rounded-xl flex items-center justify-center">
                    <QrCode className="h-12 w-12 text-peak-text-secondary" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-peak-card border border-white/5 rounded-xl p-4">
                <div className="w-10 h-10 rounded-lg bg-peak-blue/10 flex items-center justify-center mb-3">
                  <stat.icon className="h-5 w-5 text-peak-blue" />
                </div>
                <p className="font-display font-bold text-peak-text text-2xl">{stat.value}</p>
                <p className="text-peak-text-secondary text-xs mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Saved resorts */}
          <div>
            <h2 className="font-display font-bold text-peak-text text-lg mb-4">Saved resorts</h2>
            <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
              {savedResorts.map((resort) => (
                <ResortCard key={resort.id} resort={resort} compact />
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Performance chart */}
          <PerformanceChart current={d.verticalMetres} lastSeason={d.lastSeasonVertical} />

          {/* Recent activity */}
          <div className="bg-peak-card border border-white/5 rounded-xl p-5">
            <h3 className="font-display font-bold text-peak-text text-lg mb-4">Recent activity</h3>
            <div className="space-y-4">
              {d.recentActivity.map((item, i) => {
                const Icon = activityIcons[item.icon] || Star;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-peak-surface flex items-center justify-center flex-shrink-0">
                      <Icon className="h-4 w-4 text-peak-text-secondary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-peak-text text-sm truncate">{item.action}</p>
                      <p className="text-peak-text-secondary text-xs">{item.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}