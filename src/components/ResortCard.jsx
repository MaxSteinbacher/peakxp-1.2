import { Link } from "react-router-dom";
import { useState } from "react";
import { Heart, Mountain, ArrowRight, CableCar, Ruler, Ticket } from "lucide-react";
import { useT } from "../lib/i18n";

export default function ResortCard({ resort, compact = false }) {
  const t = useT();
  const [saved, setSaved] = useState(false);

  const passPrice = resort.liftPasses?.[0]?.adult ?? resort.priceFrom;

  if (compact) {
    return (
      <Link
        to={`/resort/${resort.id}`}
        className="group rounded-xl overflow-hidden bg-peak-card border border-white/5 hover:border-peak-blue/30 transition-all duration-300 hover:-translate-y-1"
      >
        <div className="relative h-44 overflow-hidden">
          <img
            src={resort.image}
            alt={resort.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3 bg-peak-bg/80 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-peak-text">
            {resort.rating}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-display font-bold text-peak-text text-xl">{resort.name}</h3>
          <p className="text-peak-text-secondary text-sm mb-3">{resort.flag} {resort.country}</p>
          <div className="flex items-center gap-3 text-xs text-peak-text-secondary">
            <span className="flex items-center gap-1">
              <CableCar className="h-3.5 w-3.5 text-peak-blue" />
              {resort.lifts} {t('lifts')}
            </span>
            <span className="flex items-center gap-1">
              <Ruler className="h-3.5 w-3.5 text-peak-blue" />
              {resort.pisteKm}km
            </span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-peak-text-secondary">
            <Ticket className="h-3.5 w-3.5 text-peak-red" />
            <span>{t('day_pass_from')} <span className="text-peak-red font-semibold">€{passPrice}</span></span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="group rounded-xl overflow-hidden bg-peak-card border border-white/5 hover:border-peak-blue/30 transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img
          src={resort.image}
          alt={resort.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <button
          onClick={(e) => { e.preventDefault(); setSaved(!saved); }}
          className="absolute top-3 right-3 p-2 rounded-full bg-peak-bg/60 backdrop-blur-sm hover:bg-peak-bg/80 transition-colors"
        >
          <Heart className={`h-4 w-4 ${saved ? "fill-peak-red text-peak-red" : "text-white"}`} />
        </button>
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="bg-peak-blue text-white text-xs font-bold px-2.5 py-1 rounded-md">
            {resort.rating}
          </span>
          <span className="text-white text-xs font-medium bg-peak-bg/60 backdrop-blur-sm px-2 py-1 rounded-md">
            {resort.ratingLabel}
          </span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-display font-bold text-peak-text text-xl">{resort.name}</h3>
            <p className="text-peak-text-secondary text-sm mt-0.5">{resort.flag} {resort.country}</p>
          </div>
          <span className="text-peak-red font-bold text-lg">€{resort.priceFrom}<span className="text-xs text-peak-text-secondary font-normal">/{t('day')}</span></span>
        </div>
        <div className="mt-4 flex items-center gap-4 text-xs text-peak-text-secondary">
          <span className="flex items-center gap-1">
            <Mountain className="h-3.5 w-3.5 text-peak-blue" />
            {resort.maxAltitude}m
          </span>
          <span>{resort.runs} {t('runs')}</span>
          <span>{resort.pisteKm}km {t('pistes')}</span>
          <span>{resort.lifts} {t('lifts')}</span>
        </div>
        <Link
          to={`/resort/${resort.id}`}
          className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 bg-peak-red hover:bg-peak-red-hover text-white text-sm font-semibold rounded-lg transition-colors"
        >
          {t('view_resort')}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}