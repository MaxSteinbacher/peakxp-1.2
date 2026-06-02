import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function GlobalHeatmap() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-peak-bg flex flex-col items-center justify-center text-center px-4">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center gap-2 text-peak-text-secondary hover:text-peak-text transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>
      <div className="text-6xl mb-6">🗺️</div>
      <h1 className="font-display font-bold text-3xl text-peak-text mb-3">Activity Heatmap</h1>
      <p className="text-peak-text-secondary text-sm max-w-md">
        The global activity heatmap is coming soon. Track your runs across all resorts on one map.
      </p>
    </div>
  );
}