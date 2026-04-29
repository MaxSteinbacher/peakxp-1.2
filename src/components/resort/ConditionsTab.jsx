import { useState, useEffect } from "react";
import { Snowflake, Wind, Sun } from "lucide-react";

const WEATHER_CODES = {
  0: { icon: "☀️", desc: "Clear sky" },
  1: { icon: "🌤", desc: "Mainly clear" },
  2: { icon: "⛅️", desc: "Partly cloudy" },
  3: { icon: "☁️", desc: "Overcast" },
  45: { icon: "🌫", desc: "Foggy" },
  51: { icon: "🌦", desc: "Light drizzle" },
  61: { icon: "🌧", desc: "Slight rain" },
  71: { icon: "🌨", desc: "Slight snowfall" },
  73: { icon: "❄️", desc: "Moderate snow" },
  75: { icon: "🌨", desc: "Heavy snowfall" },
  80: { icon: "🌦", desc: "Rain showers" },
  85: { icon: "❄️", desc: "Snow showers" },
  95: { icon: "⛈", desc: "Thunderstorm" },
};

function getWeatherInfo(code) {
  const keys = Object.keys(WEATHER_CODES).map(Number).sort((a, b) => a - b);
  let best = 0;
  for (const k of keys) { if (code >= k) best = k; }
  return WEATHER_CODES[best] || { icon: "🌡", desc: "Unknown" };
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function ConditionsTab({ resort }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${resort.lat}&longitude=${resort.lng}&current=temperature_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,snowfall_sum&timezone=auto&forecast_days=7`
        );
        if (res.ok) {
          const data = await res.json();
          setWeather(data);
        }
      } catch (e) { /* fall back to mock */ }
      setLoading(false);
    }
    if (resort.lat && resort.lng) fetchWeather();
    else setLoading(false);
  }, [resort.lat, resort.lng]);

  const currentTemp = weather ? Math.round(weather.current.temperature_2m) : resort.weather.temp;
  const currentCode = weather ? weather.current.weather_code : 0;
  const currentInfo = getWeatherInfo(currentCode);
  const windSpeed = weather ? Math.round(weather.current.wind_speed_10m) : 20;

  const forecast = weather
    ? weather.daily.time.map((d, i) => ({
        day: DAYS[new Date(d).getDay()],
        high: Math.round(weather.daily.temperature_2m_max[i]),
        low: Math.round(weather.daily.temperature_2m_min[i]),
        snow: weather.daily.snowfall_sum[i] || 0,
        code: 71,
      }))
    : resort.weather.forecast.map(f => ({ day: f.day, high: f.high, low: f.low, snow: 0, code: 71 }));

  const liftsOpen = resort.liftsOpen || Math.round(resort.lifts * 0.85);
  const liftsTotal = resort.liftsTotal || resort.lifts;
  const pistesOpen = resort.pistesOpen || Math.round(resort.runs * 0.85);
  const pistesTotal = resort.pistesTotal || resort.runs;

  return (
    <div className="space-y-5">
      <div className="bg-peak-blue/10 text-peak-blue text-xs rounded-lg px-3 py-2">
        Live data connection pending — showing representative values
        {weather && " · Live weather from Open-Meteo"}
      </div>

      {/* Current conditions */}
      <div className="bg-peak-card border border-white/5 rounded-xl p-5">
        <h3 className="font-display font-bold text-peak-text text-base mb-4">Current Conditions</h3>
        {loading ? (
          <div className="flex items-center gap-2 text-peak-text-secondary text-sm">
            <div className="w-4 h-4 border-2 border-peak-blue border-t-transparent rounded-full animate-spin" />
            Fetching live data...
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-peak-surface rounded-xl p-4 text-center">
              <p className="text-3xl mb-1">{currentInfo.icon}</p>
              <p className="text-peak-text font-bold text-xl">{currentTemp}°C</p>
              <p className="text-peak-text-secondary text-xs">{currentInfo.desc}</p>
            </div>
            <div className="bg-peak-surface rounded-xl p-4 text-center">
              <Wind className="h-6 w-6 text-peak-blue mx-auto mb-1" />
              <p className="text-peak-text font-bold text-xl">{windSpeed} km/h</p>
              <p className="text-peak-text-secondary text-xs">Wind speed</p>
            </div>
            <div className="bg-peak-surface rounded-xl p-4 text-center">
              <Snowflake className="h-6 w-6 text-peak-blue mx-auto mb-1" />
              <p className="text-peak-text font-bold text-xl">{resort.snowDepthMid || 140}cm</p>
              <p className="text-peak-text-secondary text-xs">Snow depth (mid)</p>
            </div>
            <div className="bg-peak-surface rounded-xl p-4 text-center">
              <Sun className="h-6 w-6 text-yellow-400 mx-auto mb-1" />
              <p className="text-peak-text font-bold text-base mt-1">{resort.snowType || "Packed powder"}</p>
              <p className="text-peak-text-secondary text-xs">Snow type</p>
            </div>
          </div>
        )}

        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { label: "Base station", val: resort.snowDepthBase || 80 },
            { label: "Mid station", val: resort.snowDepthMid || 140 },
            { label: "Top station", val: resort.snowDepthTop || 200 },
          ].map(s => (
            <div key={s.label} className="bg-peak-surface rounded-xl p-3 text-center">
              <p className="text-peak-blue font-bold text-lg">{s.val}cm</p>
              <p className="text-peak-text-secondary text-xs">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 7-day forecast */}
      <div className="bg-peak-card border border-white/5 rounded-xl p-5">
        <h3 className="font-display font-bold text-peak-text text-base mb-4">7-day forecast</h3>
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
          {forecast.map((f, i) => {
            const info = getWeatherInfo(f.code);
            return (
              <div key={i} className="flex-shrink-0 w-20 bg-peak-surface rounded-xl p-3 text-center">
                <p className="text-peak-text-secondary text-xs mb-1">{f.day}</p>
                <p className="text-xl mb-1">{info.icon}</p>
                <p className="text-peak-text text-xs font-bold">{f.high}°</p>
                <p className="text-peak-text-secondary text-xs">{f.low}°</p>
                {f.snow > 0 && <p className="text-peak-blue text-xs mt-1">{Math.round(f.snow)}cm ❄️</p>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Lifts and Pistes */}
      <div className="bg-peak-card border border-white/5 rounded-xl p-5">
        <h3 className="font-display font-bold text-peak-text text-base mb-4">Lifts and Piste Status</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { label: "Lifts open", open: liftsOpen, total: liftsTotal },
            { label: "Pistes open", open: pistesOpen, total: pistesTotal },
          ].map(item => (
            <div key={item.label}>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-peak-text font-semibold">{item.label}</span>
                <span className="text-peak-green font-bold">{item.open} / {item.total}</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-peak-green rounded-full transition-all" style={{ width: `${(item.open / item.total) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Road status */}
      <div className="bg-peak-card border border-white/5 rounded-xl p-5">
        <h3 className="font-display font-bold text-peak-text text-base mb-3">Road Status</h3>
        <div className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold mb-2 ${resort.roadStatus === "clear" ? "bg-peak-green/20 text-peak-green" : resort.roadStatus === "chains" ? "bg-yellow-500/20 text-yellow-400" : "bg-peak-red/20 text-peak-red"}`}>
          {resort.roadStatus === "clear" ? "🟢 Roads clear" : resort.roadStatus === "chains" ? "🟡 Chains recommended" : "🔴 Road closed"}
        </div>
        <p className="text-peak-text-secondary text-xs">🔌 Connect to ASFINAG / Bison Futé / TCS API for live data</p>
      </div>

      {/* Snow cannons placeholder */}
      <div className="bg-peak-surface border border-white/10 rounded-xl h-40 flex flex-col items-center justify-center gap-2">
        <Snowflake className="h-8 w-8 text-peak-blue/40" />
        <p className="text-peak-text font-semibold text-sm">{resort.snowCannons || 80} snow cannons · covers {resort.snowCannonKm || 20}km of pistes</p>
        <p className="text-peak-text-secondary text-xs">Snow cannon coverage map — integration coming soon</p>
      </div>
    </div>
  );
}