import { Share2, Download, Copy } from "lucide-react";

export default function RightPanel({ stats, routePoints, resortId, routeName }) {
  function copyLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).catch(() => {});
  }

  function exportGPX() {
    const name = routeName || `PeakXP Route - ${resortId}`;
    const trkpts = routePoints.map(pt =>
      `      <trkpt lat="${pt.lngLat[1]}" lon="${pt.lngLat[0]}">${pt.elevation != null ? `<ele>${Math.round(pt.elevation)}</ele>` : ""}</trkpt>`
    ).join("\n");
    const gpx = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="PeakXP Route Planner">
  <trk>
    <name>${name}</name>
    <trkseg>
${trkpts}
    </trkseg>
  </trk>
</gpx>`;
    const blob = new Blob([gpx], { type: "application/gpx+xml" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `peakxp-route-${resortId}-${Date.now()}.gpx`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  return (
    <div className="flex flex-col gap-4 p-4 overflow-y-auto h-full">
      {/* Route stats */}
      <div className="bg-peak-card rounded-xl p-4">
        <p className="text-peak-text font-bold text-sm mb-3">Route stats</p>
        <div className="space-y-2">
          <div className="flex items-end justify-between">
            <span className="text-peak-text-secondary text-xs">Distance</span>
            <span className="text-peak-text font-bold text-lg">{stats.distanceKm} <span className="text-xs font-normal text-peak-text-secondary">km</span></span>
          </div>
          <div className="flex items-end justify-between">
            <span className="text-peak-text-secondary text-xs">Descent</span>
            <span className="text-peak-text font-bold text-lg">{stats.totalDescent} <span className="text-xs font-normal text-peak-text-secondary">m ↓</span></span>
          </div>
          <div className="flex items-end justify-between">
            <span className="text-peak-text-secondary text-xs">Ascent</span>
            <span className="text-peak-text font-bold text-lg">{stats.totalAscent} <span className="text-xs font-normal text-peak-text-secondary">m ↑</span></span>
          </div>
          <div className="flex items-end justify-between">
            <span className="text-peak-text-secondary text-xs">Waypoints</span>
            <span className="text-peak-text font-bold text-lg">{routePoints.length}</span>
          </div>
          <div className="flex items-end justify-between">
            <span className="text-peak-text-secondary text-xs">Est. time</span>
            <span className="text-peak-text font-bold text-lg">~{stats.estimatedMinutes} <span className="text-xs font-normal text-peak-text-secondary">min</span></span>
          </div>
        </div>
      </div>

      {/* Lift status legend */}
      <div className="bg-peak-card rounded-xl p-4">
        <p className="text-peak-text font-bold text-sm mb-3">Lift status</p>
        {[["#2d6a4f", "Open"], ["#f59e0b", "On hold"], ["#e63946", "Closed"]].map(([color, label]) => (
          <div key={label} className="flex items-center gap-2 py-1">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
            <span className="text-peak-text-secondary text-xs">{label}</span>
          </div>
        ))}
        <p className="text-peak-text-secondary text-xs mt-2">Live status: connect resort API</p>
      </div>

      {/* Difficulty legend */}
      <div className="bg-peak-card rounded-xl p-4">
        <p className="text-peak-text font-bold text-sm mb-3">Difficulty</p>
        {[["#2d6a4f", "Easy"], ["#3894E3", "Intermediate"], ["#e63946", "Advanced"], ["#1a1a2e", "Expert"]].map(([color, label]) => (
          <div key={label} className="flex items-center gap-1.5 py-0.5">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color, border: "1px solid rgba(255,255,255,0.3)" }} />
            <span className="text-peak-text-secondary text-xs">{label}</span>
          </div>
        ))}
      </div>

      {/* Share */}
      <div className="bg-peak-card rounded-xl p-4">
        <p className="text-peak-text font-bold text-sm mb-3">Share route</p>
        <div className="flex flex-col gap-2">
          <button onClick={copyLink} className="flex items-center gap-2 border border-white/10 text-peak-text-secondary text-xs px-3 py-2 rounded-lg hover:text-peak-text transition-colors w-full">
            <Copy className="h-3.5 w-3.5" /> Copy link
          </button>
          <button className="flex items-center gap-2 border border-white/10 text-peak-text-secondary text-xs px-3 py-2 rounded-lg hover:text-peak-text transition-colors w-full">
            <Share2 className="h-3.5 w-3.5" /> Share to community
          </button>
          <button onClick={exportGPX} disabled={routePoints.length < 2} className="flex items-center gap-2 border border-white/10 text-peak-text-secondary text-xs px-3 py-2 rounded-lg hover:text-peak-text transition-colors w-full disabled:opacity-40">
            <Download className="h-3.5 w-3.5" /> Export GPX
          </button>
        </div>
      </div>
    </div>
  );
}