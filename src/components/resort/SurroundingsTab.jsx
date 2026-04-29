import { ExternalLink } from "lucide-react";

const ACTIVITY_ICONS = {
  "Snowshoeing": "🥾", "Ice skating": "⛸", "Curling": "🥌", "Swimming": "🏊",
  "Spa & wellness": "🧖", "Sledging": "🛷", "Paragliding": "🪂", "Dog sledding": "🐕",
  "Winter hiking": "🏔", "Museum": "🏛", "Shopping": "🛍", "Wine & gastronomy": "🍷",
};

export default function SurroundingsTab({ resort }) {
  const s = resort.surroundings || {};

  return (
    <div className="space-y-6">
      {/* About the area */}
      <div className="bg-peak-card border border-white/5 rounded-xl p-5">
        <h3 className="font-display font-bold text-peak-text text-base mb-3">About the area</h3>
        <p className="text-peak-text-secondary text-sm leading-relaxed">{s.description || "A scenic Alpine region with exceptional mountain landscapes."}</p>
      </div>

      {/* Nearby towns */}
      <div>
        <h3 className="font-display font-bold text-peak-text text-base mb-3">Nearby towns and villages</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(s.nearbyTowns || []).map(town => (
            <div key={town.name} className="bg-peak-card border border-white/5 rounded-xl p-4">
              <div className="flex items-start justify-between mb-1">
                <p className="text-peak-text font-semibold text-sm">{town.name}</p>
                <span className="text-peak-blue text-xs">{town.distance}</span>
              </div>
              <p className="text-peak-text-secondary text-xs leading-relaxed">{town.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Activities */}
      <div>
        <h3 className="font-display font-bold text-peak-text text-base mb-3">Things to do off the slopes</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(s.activities || []).map(activity => (
            <div key={activity} className="bg-peak-card border border-white/5 rounded-xl p-4 flex items-center gap-3">
              <span className="text-2xl">{ACTIVITY_ICONS[activity] || "⭐"}</span>
              <span className="text-peak-text text-sm">{activity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Local transport */}
      <div className="bg-peak-card border border-white/5 rounded-xl p-5">
        <h3 className="font-display font-bold text-peak-text text-base mb-3">Local transport connections</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-peak-text-secondary text-xs uppercase tracking-widest border-b border-white/5">
                <th className="text-left pb-2">Destination</th>
                <th className="text-left pb-2">Type</th>
                <th className="text-left pb-2">Drive time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {(resort.airports || []).map(a => (
                <tr key={a.airport}>
                  <td className="py-2 text-peak-text">{a.airport} ({a.iata})</td>
                  <td className="py-2 text-peak-text-secondary">Airport</td>
                  <td className="py-2 text-peak-blue font-medium">{a.driveTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tourist info */}
      <div className="bg-peak-card border border-white/5 rounded-xl p-5">
        <h3 className="font-display font-bold text-peak-text text-base mb-3">Tourist information</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-peak-text-secondary">Tourism board</span>
            <a href={s.touristBoardUrl || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-peak-blue hover:underline">
              {s.touristBoard} <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <div className="flex items-center justify-between border-t border-white/5 pt-2">
            <span className="text-peak-text-secondary">Emergency number</span>
            <span className="text-peak-red font-bold">{s.emergency || "112"}</span>
          </div>
          <div className="flex items-center justify-between border-t border-white/5 pt-2">
            <span className="text-peak-text-secondary">Nearest hospital</span>
            <span className="text-peak-text text-right text-xs">{s.hospital || "Regional hospital"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}