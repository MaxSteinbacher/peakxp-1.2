import { Link } from "react-router-dom";
import { Ticket, Wrench, GraduationCap, Hotel, MapPin, Navigation, BarChart3, ArrowRight } from "lucide-react";
import SearchBar from "../components/SearchBar";
import ResortCard from "../components/ResortCard";
import { resorts, trendingCards } from "../lib/data";

const planTiles = [
  { icon: Ticket, label: "Lift Passes", desc: "Pre-book and skip the queue" },
  { icon: Wrench, label: "Equipment Rental", desc: "Premium gear delivered" },
  { icon: GraduationCap, label: "Ski School", desc: "AI-matched instructors" },
  { icon: Hotel, label: "Accommodation", desc: "Slope-side stays" },
];

const pillars = [
  { icon: Ticket, label: "Smart booking", desc: "One cart for everything" },
  { icon: Navigation, label: "On-mountain GPS", desc: "Real-time trail mapping" },
  { icon: BarChart3, label: "Performance tracking", desc: "Every run, recorded" },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://picsum.photos/seed/alpshero/1920/1080"
            alt="Alpine mountains"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-peak-bg/80 backdrop-blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-t from-peak-bg via-peak-bg/40 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl text-peak-text tracking-tight leading-none mb-4">
            THE MOUNTAIN,<br />
            <span className="text-peak-red">UNIFIED.</span>
          </h1>
          <p className="text-peak-text-secondary text-lg sm:text-xl max-w-2xl mx-auto mb-10">
            Find, book, and experience every ski resort in the Alps — in one place.
          </p>
          <SearchBar />
        </div>
      </section>

      {/* Video Hero */}
      <section className="relative w-full h-[70vh] overflow-hidden flex items-end">
        <div className="absolute inset-0 bg-peak-bg">
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-peak-surface via-peak-bg to-black">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full border-2 border-white/20 flex items-center justify-center mx-auto mb-4">
                <div className="w-0 h-0 border-t-[14px] border-t-transparent border-b-[14px] border-b-transparent border-l-[24px] border-l-white/50 ml-2" />
              </div>
              <p className="text-peak-text-secondary text-sm tracking-widest uppercase">Video background</p>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-peak-bg" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="flex items-end justify-between">
            <div>
              <span className="inline-block text-peak-text-secondary text-xs tracking-[0.3em] uppercase mb-2">Season 2025–2026</span>
              <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-peak-text leading-tight">
                The Alps.<br />
                <span className="text-peak-blue">Unfiltered.</span>
              </h2>
            </div>
            <div className="hidden sm:flex flex-col items-end gap-1 text-peak-text-secondary text-xs">
              <span className="tracking-widest uppercase">Scroll to explore</span>
              <div className="w-px h-10 bg-white/20 self-center mt-1" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resorts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-peak-text">Featured Resorts</h2>
          <Link to="/search" className="flex items-center gap-1 text-peak-blue text-sm font-medium hover:underline">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {resorts.slice(0, 12).map((resort) => (
            <ResortCard key={resort.id} resort={resort} compact />
          ))}
        </div>
      </section>

      {/* Plan your trip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-peak-text mb-8">Plan your trip</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {planTiles.map((tile) => (
            <div
              key={tile.label}
              className="group bg-peak-card border border-white/5 rounded-xl p-6 hover:border-peak-blue/30 transition-all duration-300 cursor-pointer hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-peak-blue/10 flex items-center justify-center mb-4 group-hover:bg-peak-blue/20 transition-colors">
                <tile.icon className="h-6 w-6 text-peak-blue" />
              </div>
              <h3 className="font-display font-bold text-peak-text text-lg mb-1">{tile.label}</h3>
              <p className="text-peak-text-secondary text-sm">{tile.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trending this week */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-peak-text mb-8">Trending this week</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {trendingCards.map((card) => (
            <Link
              key={card.id}
              to={`/resort/${card.id}`}
              className="group relative rounded-xl overflow-hidden h-72"
            >
              <img
                src={card.image}
                alt={card.resort}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-peak-bg via-peak-bg/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block bg-peak-red/90 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  {card.tag}
                </span>
                <h3 className="font-display font-bold text-peak-text text-2xl">{card.resort}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Performance elevated banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-peak-card border border-white/5 rounded-2xl p-8 sm:p-12">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-peak-text text-center mb-2">
            Your performance, <span className="text-peak-red">elevated</span>
          </h2>
          <p className="text-peak-text-secondary text-center text-sm mb-10">
            Everything you need, unified in one platform.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {pillars.map((p) => (
              <div key={p.label} className="flex items-center gap-4 bg-peak-surface rounded-xl p-5">
                <div className="w-12 h-12 rounded-xl bg-peak-blue/10 flex items-center justify-center flex-shrink-0">
                  <p.icon className="h-6 w-6 text-peak-blue" />
                </div>
                <div>
                  <p className="text-peak-text font-semibold text-sm">{p.label}</p>
                  <p className="text-peak-text-secondary text-xs">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-display font-bold text-peak-text-secondary text-sm">
            PEAK<span className="text-peak-red">XP</span> © 2026
          </span>
          <div className="flex gap-6 text-peak-text-secondary text-sm">
            <span className="hover:text-peak-text cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-peak-text cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-peak-text cursor-pointer transition-colors">Support</span>
          </div>
        </div>
      </footer>
    </div>
  );
}