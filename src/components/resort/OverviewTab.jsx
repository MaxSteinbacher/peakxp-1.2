import { useState } from "react";
import { useT } from "../../lib/i18n";
import { Camera, Play } from "lucide-react";
import WeatherWidget from "../WeatherWidget";
import ResortMap3D from "../ResortMap3D";

function LeafRating({ rating }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={i <= rating ? "text-peak-green" : "text-peak-text-secondary/30"}>🌿</span>
      ))}
    </div>
  );
}

export default function OverviewTab({ resort }) {
  const t = useT();
  const [expanded, setExpanded] = useState(false);
  const desc = resort.description || "";
  const isLong = desc.length > 300;
  const displayDesc = isLong && !expanded ? desc.slice(0, 300) + "…" : desc;
  const osmUrl = `https://www.openstreetmap.org/?mlat=${resort.lat}&mlon=${resort.lng}&zoom=13`;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="bg-peak-card border border-white/5 rounded-xl p-6">
            <p className="text-peak-text-secondary leading-relaxed text-sm">{displayDesc}</p>
            {isLong && (
              <button onClick={() => setExpanded(e => !e)} className="mt-2 text-peak-blue text-xs hover:underline">
                {expanded ? "Show less" : "Read more"}
              </button>
            )}
            <div className="flex flex-wrap gap-2 mt-4">
              {resort.resortTypes?.map(t => (
                <span key={t} className="text-xs bg-peak-blue/10 text-peak-blue border border-peak-blue/20 px-3 py-1 rounded-full">{t}</span>
              ))}
            </div>
          </div>

          {/* Access and Transport */}
          <div className="bg-peak-card border border-white/5 rounded-xl p-5">
            <h3 className="font-display font-bold text-peak-text text-base mb-4">{t("access_transport")}</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-peak-text-secondary text-xs uppercase tracking-widest mb-2">{t("nearest_airports")}</p>
                <div className="space-y-1">
                  {resort.airports?.map(a => (
                    <div key={a.iata} className="flex items-center justify-between">
                      <span className="text-peak-text">{a.airport} <span className="text-peak-text-secondary text-xs">({a.iata})</span></span>
                      <span className="text-peak-blue text-xs font-medium">{a.driveTime} drive</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-white/5 pt-3">
                <p className="text-peak-text-secondary text-xs uppercase tracking-widest mb-1">Train</p>
                <p className="text-peak-text text-sm">{resort.trainStation}</p>
              </div>
              {resort.shuttle && (
                <div className="border-t border-white/5 pt-3">
                  <p className="text-peak-text-secondary text-xs uppercase tracking-widest mb-1">{t("shuttle_service")}</p>
                  <p className="text-peak-text text-sm">{resort.shuttleDesc}</p>
                </div>
              )}
              {resort.parking && (
                <div className="border-t border-white/5 pt-3">
                  <p className="text-peak-text-secondary text-xs uppercase tracking-widest mb-1">{t("parking")}</p>
                  <p className="text-peak-text text-sm">
                    {resort.parking.capacity.toLocaleString()} spaces · €{resort.parking.pricePerDay}/day
                    {resort.parking.includedInPass && <span className="ml-2 text-peak-green text-xs">{t("included_in_pass")}</span>}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Environmental */}
          <div className="bg-peak-card border border-white/5 rounded-xl p-5">
            <h3 className="font-display font-bold text-peak-text text-base mb-4">{t("environmental_sustainability")}</h3>
            <div className="flex items-center gap-3 mb-3">
              <LeafRating rating={resort.ecoRating || 3} />
              <span className="text-peak-text-secondary text-xs">{resort.ecoRenewable}% renewable electricity</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {resort.ecoCertifications?.map(c => (
                <span key={c} className="text-xs bg-peak-green/10 text-peak-green border border-peak-green/20 px-2 py-0.5 rounded-full">{c}</span>
              ))}
            </div>
            <ul className="space-y-1 mb-3">
              {resort.ecoInitiatives?.map(i => (
                <li key={i} className="text-peak-text-secondary text-xs flex items-center gap-1.5">
                  <span className="text-peak-green">•</span>{i}
                </li>
              ))}
            </ul>
            <p className="text-peak-text-secondary text-xs">
              Carbon offset:{" "}
              {resort.ecoOffsetProgram
                ? <span className="text-peak-green">{t("active_programme")}</span>
                : "Not available"
              }
            </p>
          </div>

          {/* Interactive 3D Map */}
          <div className="mb-8">
            <h2 className="font-display font-bold text-peak-text text-xl mb-2">{t("interactive_map")}</h2>
            <p className="text-peak-text-secondary text-sm mb-4">Explore slopes, lifts and terrain in 3D. Pan, tilt and zoom freely.</p>
            <ResortMap3D resort={resort} />
            <div className="mt-3 flex items-center gap-2 text-peak-text-secondary text-xs">
              <span>Slope data: OpenStreetMap contributors</span>
              <span>·</span>
              <span>Terrain: MapTiler</span>
              <a href={`/resort/${resort.id}/map`} className="ml-auto text-peak-blue hover:underline font-medium">{t("open_route_planner")}</a>
            </div>
          </div>

          {/* Webcams */}
          <div>
            <h3 className="font-display font-bold text-peak-text text-base mb-3">{t("conditions")}</h3>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
              {resort.webcams?.map(wc => (
                <div key={wc.name} className="w-64 h-40 bg-peak-surface rounded-xl border border-white/10 flex-shrink-0 relative overflow-hidden">
                  <img src={`https://picsum.photos/seed/${wc.seed}/400/250`} alt={wc.name} className="w-full h-full object-cover opacity-60" />
                  <div className="absolute inset-0 flex flex-col justify-between p-3">
                    <div className="self-start bg-peak-bg/70 backdrop-blur-sm rounded-full p-1.5">
                      <Camera className="h-3.5 w-3.5 text-white" />
                    </div>
                    <div>
                      <p className="text-white text-xs font-semibold">{wc.name}</p>
                      <p className="text-white/60 text-xs">Live feed — connect API</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <WeatherWidget weather={resort.weather} />
        </div>
      </div>
    </div>
  );
}