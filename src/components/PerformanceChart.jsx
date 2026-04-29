import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function PerformanceChart({ current, lastSeason }) {
  const data = [
    { name: "Last season", value: lastSeason },
    { name: "This season", value: current },
  ];

  const colors = ["#6B7490", "#3894E3"];

  return (
    <div className="bg-peak-card border border-white/5 rounded-xl p-5">
      <h3 className="font-display font-bold text-peak-text text-lg mb-1">Your progression</h3>
      <p className="text-peak-text-secondary text-xs mb-4">Vertical metres this season vs. last</p>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={40}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#6B7490", fontSize: 12 }} />
            <YAxis hide />
            <Tooltip
              cursor={false}
              contentStyle={{
                background: "#141A32",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                color: "#ECF4FA",
                fontSize: "12px",
              }}
              formatter={(value) => [`${(value / 1000).toFixed(1)}k m`, "Vertical"]}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {data.map((_, i) => (
                <Cell key={i} fill={colors[i]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-2 mt-2">
        <span className="text-peak-blue font-display font-bold text-2xl">
          +{Math.round(((current - lastSeason) / lastSeason) * 100)}%
        </span>
        <span className="text-peak-text-secondary text-xs">improvement</span>
      </div>
    </div>
  );
}