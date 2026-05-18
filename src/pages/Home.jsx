import { Link } from "react-router-dom";
import { Ticket, Navigation, BarChart3, ArrowRight } from "lucide-react";
import { useT } from "../lib/i18n";
import GlobalDiscoveryMap from "../components/discovery/GlobalDiscoveryMap";
import DayTrips from "../components/DayTrips";
import SearchBar from "../components/SearchBar";
import ResortCard from "../components/ResortCard";
import { resorts, trendingCards } from "../lib/data";

const TAG_KEYS = {
  "Best powder in the Alps": "best_powder",
  "Top-rated for progression": "top_rated_progression",
  "Ultimate luxury skiing": "ultimate_luxury",
};

function getPillars(t) {
  return [
    { icon: Ticket, label: t('smart_booking'), desc: t('smart_booking_sub') },
    { icon: Navigation, label: t('on_mountain_gps'), desc: t('on_mountain_gps_sub') },
    { icon: BarChart3, label: t('performance_tracking'), desc: t('performance_tracking_sub') },
  ];
}


export default function Home() {
  const t = useT();
  const pillars = getPillars(t);
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://picsum.photos/seed/alpshero/1920/1080"
            alt="Alpine mountains"
            className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-peak-bg/80 backdrop-blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-t from-peak-bg via-peak-bg/40 to-transparent" />
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" style={{ zIndex: 2 }}>
          <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-none mb-4">
            <span className="text-peak-text">THE MOUNTAIN.</span><br />
            <span className="text-peak-red">UNIFIED.</span>
          </h1>
          <p className="text-peak-text-secondary text-lg sm:text-xl max-w-2xl mx-auto mb-10">
            {t('hero_subline')}
          </p>
          <SearchBar />
        </div>
      </section>

      {/* Video Hero */}
      <section className="relative w-full h-[70vh] overflow-hidden flex items-end">
        <div className="absolute inset-0 bg-peak-bg">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 0 }}
            src="https://media.base44.com/videos/public/6a058497bdc3421cd2bb6205/c187d7527_02-ClipBBWK.mp4"
          />
          <div className="absolute inset-0 bg-black/50" style={{ zIndex: 1 }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-peak-bg" style={{ zIndex: 1 }} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" style={{ zIndex: 1 }} />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="flex items-end justify-between">
            <div>
              <span className="inline-block text-peak-text-secondary text-xs tracking-[0.3em] uppercase mb-2">{t('tagline_season')}</span>
              <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-peak-text leading-tight">
                {t('tagline_heading')}<br />
                <span className="text-peak-blue">{t('tagline_subheading')}</span>
              </h2>
            </div>
            <div className="hidden sm:flex flex-col items-end gap-1 text-peak-text-secondary text-xs">
              <span className="tracking-widest uppercase">{t('scroll_to_explore')}</span>
              <div className="w-px h-10 bg-white/20 self-center mt-1" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resorts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-peak-text">{t('featured_resorts')}</h2>
          <Link to="/trip-planning" className="flex items-center gap-1 text-peak-blue text-sm font-medium hover:underline">
            {t('view_all')} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {resorts.slice(0, 12).map((resort) =>
          <ResortCard key={resort.id} resort={resort} compact />
          )}
        </div>
      </section>

      {/* Discover by destination */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-peak-text mb-2">{t('discover_by_destination')}</h2>
        <p className="text-peak-text-secondary text-sm mb-6">{t('discover_subline')}</p>
        <GlobalDiscoveryMap />
      </section>

      <DayTrips />

      {/* Trending this week */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-peak-text mb-8">{t('trending_this_week')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {trendingCards.map((card) =>
          <Link
            key={card.id}
            to={`/resort/${card.id}`}
            className="group relative rounded-xl overflow-hidden h-72">
            
              <img
              src={card.image}
              alt={card.resort}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            
              <div className="absolute inset-0 bg-gradient-to-t from-peak-bg via-peak-bg/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block bg-peak-red/90 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  {TAG_KEYS[card.tag] ? t(TAG_KEYS[card.tag]) : card.tag}
                </span>
                <h3 className="font-display font-bold text-peak-text text-2xl">{card.resort}</h3>
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* Performance elevated banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-peak-card border border-white/5 rounded-2xl p-8 sm:p-12">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-peak-text text-center mb-2">
            {t('performance_heading')}
          </h2>
          <p className="text-peak-text-secondary text-center text-sm mb-10">
            {t('performance_subline')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {pillars.map((p) =>
            <div key={p.label} className="flex items-center gap-4 bg-peak-surface rounded-xl p-5">
                <div className="w-12 h-12 rounded-xl bg-peak-blue/10 flex items-center justify-center flex-shrink-0">
                  <p.icon className="h-6 w-6 text-peak-blue" />
                </div>
                <div>
                  <p className="text-peak-text font-semibold text-sm">{p.label}</p>
                  <p className="text-peak-text-secondary text-xs">{p.desc}</p>
                </div>
              </div>
            )}
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
            <span className="hover:text-peak-text cursor-pointer transition-colors">{t('privacy')}</span>
            <span className="hover:text-peak-text cursor-pointer transition-colors">{t('terms')}</span>
            <span className="hover:text-peak-text cursor-pointer transition-colors">{t('support')}</span>
          </div>
        </div>
      </footer>
    </div>);

}