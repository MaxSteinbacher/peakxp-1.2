import { GripVertical, Trash2 } from "lucide-react";

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-8 h-4 rounded-full transition-colors flex-shrink-0 ${checked ? "bg-peak-red" : "bg-peak-surface"}`}
      style={{ border: "1px solid rgba(255,255,255,0.15)" }}
    >
      <span className="absolute top-0.5 w-3 h-3 bg-white rounded-full transition-transform shadow"
        style={{ left: checked ? "calc(100% - 14px)" : "1px" }} />
    </button>
  );
}

const TYPE_COLORS = { start: "#2d6a4f", waypoint: "#FB343D", end: "#1a1a2e" };

export default function LeftPanel({ routePoints, layers, setLayers, onDelete, onRename, onTypeChange, onClear, onReverse, onReorder, savedRoutes, onLoadRoute }) {
  function handleDragStart(e, idx) { e.dataTransfer.setData("dragIdx", idx); }
  function handleDrop(e, idx) {
    const from = parseInt(e.dataTransfer.getData("dragIdx"));
    if (from === idx) return;
    const arr = [...routePoints];
    const [item] = arr.splice(from, 1);
    arr.splice(idx, 0, item);
    onReorder(arr);
  }
  function allowDrop(e) { e.preventDefault(); }

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Route waypoints */}
      <div className="p-4 border-b border-white/5">
        <p className="text-peak-text font-bold text-sm mb-3">Your route</p>
        {routePoints.length === 0 ? (
          <p className="text-peak-text-secondary text-xs leading-relaxed">Click anywhere on the map to start building your route. Click on piste lines to snap to them automatically.</p>
        ) : (
          <div className="space-y-0.5">
            {routePoints.map((pt, idx) => (
              <div
                key={pt.id}
                draggable
                onDragStart={e => handleDragStart(e, idx)}
                onDrop={e => handleDrop(e, idx)}
                onDragOver={allowDrop}
                className="flex items-center gap-2 py-2 border-b border-white/5 cursor-grab group"
              >
                <GripVertical className="h-3.5 w-3.5 text-peak-text-secondary/40 flex-shrink-0" />
                <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: TYPE_COLORS[pt.type] || "#FB343D", border: "1.5px solid rgba(255,255,255,0.3)" }} />
                <input
                  className="flex-1 bg-transparent text-peak-text text-xs outline-none min-w-0"
                  value={pt.name}
                  onChange={e => onRename(pt.id, e.target.value)}
                />
                {pt.elevation != null && (
                  <span className="text-peak-text-secondary text-xs flex-shrink-0">{Math.round(pt.elevation)}m</span>
                )}
                <button onClick={() => onDelete(pt.id)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 className="h-3.5 w-3.5 text-peak-red" />
                </button>
              </div>
            ))}
          </div>
        )}
        {routePoints.length > 0 && (
          <div className="flex gap-2 mt-3">
            <button onClick={onClear} className="border border-white/10 text-peak-text-secondary text-xs px-3 py-1.5 rounded-lg hover:text-peak-text transition-colors">Clear route</button>
            <button onClick={onReverse} className="border border-white/10 text-peak-text-secondary text-xs px-3 py-1.5 rounded-lg hover:text-peak-text transition-colors">Reverse route</button>
          </div>
        )}
      </div>

      {/* Layer toggles */}
      <div className="p-4 border-b border-white/5">
        <p className="text-peak-text font-bold text-sm mb-3">Map layers</p>
        {[
          { key: "slopes", label: "Slopes (colour-coded)" },
          { key: "lifts", label: "Lifts" },
          { key: "liftStatus", label: "Lift status" },
          { key: "terrain", label: "3D terrain" },
        ].map(({ key, label }) => (
          <div key={key} className="flex items-center justify-between gap-3 py-1.5">
            <span className="text-peak-text text-xs">{label}</span>
            <Toggle checked={layers[key]} onChange={v => setLayers(l => ({ ...l, [key]: v }))} />
          </div>
        ))}
      </div>

      {/* Saved routes */}
      <div className="p-4">
        <p className="text-peak-text font-bold text-sm mb-3">Saved routes</p>
        {savedRoutes.length === 0 ? (
          <p className="text-peak-text-secondary text-xs">No saved routes yet. Build a route and click Save.</p>
        ) : (
          <div className="space-y-2">
            {savedRoutes.map(r => (
              <button key={r.id} onClick={() => onLoadRoute(r)} className="w-full text-left bg-peak-card rounded-lg px-3 py-2 hover:bg-white/5 transition-colors">
                <p className="text-peak-text text-xs font-medium truncate">{r.name}</p>
                <p className="text-peak-text-secondary text-xs">{r.stats.distanceKm} km · {r.points.length} points</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}