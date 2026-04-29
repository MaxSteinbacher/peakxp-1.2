import { Cloud, Sun, CloudSnow, Thermometer, Snowflake } from "lucide-react";

const weatherIcons = {
  snow: CloudSnow,
  clear: Sun,
  partly_cloudy: Cloud,
};

export default function WeatherWidget({ weather }) {
  if (!weather) return null;

  return (
    <div className="bg-peak-card border border-white/5 rounded-xl p-5">
      <h3 className="font-display font-bold text-peak-text text-lg mb-4">{"Weather & Conditions"}</h3>
      
      <div className="flex items-center gap-4 mb-5">
        <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-peak-blue/10">
          <Thermometer className="h-8 w-8 text-peak-blue" />
        </div>
        <div>
          <p className="text-3xl font-display font-bold text-peak-text">{weather.temp}°C</p>
          <p className="text-sm text-peak-text-secondary">{weather.condition}</p>
        </div>
        <div className="ml-auto flex items-center gap-2 bg-peak-blue/10 px-3 py-2 rounded-lg">
          <Snowflake className="h-4 w-4 text-peak-blue" />
          <div>
            <p className="text-xs text-peak-text-secondary">Snow depth</p>
            <p className="text-sm font-bold text-peak-text">{weather.snowDepth}cm</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {weather.forecast.map((day, i) => {
          const Icon = weatherIcons[day.condition] || Cloud;
          return (
            <div key={i} className="bg-peak-surface rounded-lg p-3 text-center">
              <p className="text-xs text-peak-text-secondary mb-2">{day.day}</p>
              <Icon className="h-5 w-5 text-peak-blue mx-auto mb-2" />
              <p className="text-sm font-semibold text-peak-text">{day.high}°</p>
              <p className="text-xs text-peak-text-secondary">{day.low}°</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}