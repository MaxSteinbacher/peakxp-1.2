import { Bot, Users, Star, DollarSign, TrendingUp, Compass, Sunrise } from "lucide-react";

const agents = [
  {
    icon: Users,
    name: "Family Trip Agent",
    tagline: "Perfect ski holidays for all ages",
    desc: "Finds family-friendly resorts, kids' ski schools, childcare services and accommodation suited to families with children of all ages.",
    color: "text-peak-blue",
    bg: "bg-peak-blue/10",
    badge: "Family",
  },
  {
    icon: Star,
    name: "Luxury Skiing Experience Agent",
    tagline: "Five-star skiing, curated for you",
    desc: "Books slope-side chalets, private instructors, helicopter transfers and exclusive après-ski experiences at the world's most prestigious resorts.",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    badge: "Luxury",
  },
  {
    icon: DollarSign,
    name: "Budget Experience Agent",
    tagline: "Maximum skiing, minimum spend",
    desc: "Finds the best value resorts, group lift pass deals, budget accommodation and affordable rental equipment so you can ski more for less.",
    color: "text-peak-green",
    bg: "bg-peak-green/10",
    badge: "Budget",
  },
  {
    icon: TrendingUp,
    name: "Advanced Skiing Experience Agent",
    tagline: "Elite terrain, expertly planned",
    desc: "Targets expert off-piste zones, freeride areas, steep couloirs and high-altitude glaciers — with matching guide and forecasting services.",
    color: "text-peak-red",
    bg: "bg-peak-red/10",
    badge: "Advanced",
  },
  {
    icon: Sunrise,
    name: "Beginner Experience Agent",
    tagline: "Your first time on snow, done right",
    desc: "Selects beginner-friendly resorts, books first-timer lesson packages, equipment hire and gentle blue runs to build confidence fast.",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    badge: "Beginner",
  },
  {
    icon: Compass,
    name: "New Horizons Experience Agent",
    tagline: "Discover skiing beyond the usual",
    desc: "Uncovers hidden gems, emerging ski destinations and off-the-beaten-path resorts across the Alps and beyond for the adventurous traveller.",
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    badge: "Explorer",
  },
];

export default function ExpertAgents() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12 text-center">
        <span className="inline-block text-peak-blue text-xs font-semibold uppercase tracking-widest mb-3">AI-powered</span>
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-peak-text mb-4">Expert Agents</h1>
        <p className="text-peak-text-secondary text-lg max-w-2xl mx-auto">
          Specialised AI booking agents that plan, book and manage your entire ski trip — tailored to your style.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div
            key={agent.name}
            className="group bg-peak-card border border-white/5 hover:border-white/15 rounded-2xl p-7 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between">
              <div className={`w-12 h-12 rounded-xl ${agent.bg} flex items-center justify-center`}>
                <agent.icon className={`h-6 w-6 ${agent.color}`} />
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${agent.bg} ${agent.color}`}>
                {agent.badge}
              </span>
            </div>
            <div>
              <h3 className="text-peak-text font-bold text-lg leading-snug mb-1">{agent.name}</h3>
              <p className={`text-sm font-medium mb-2 ${agent.color}`}>{agent.tagline}</p>
              <p className="text-peak-text-secondary text-sm leading-relaxed">{agent.desc}</p>
            </div>
            <button className="mt-auto flex items-center gap-2 text-sm font-semibold text-peak-text-secondary hover:text-peak-text transition-colors group-hover:gap-3">
              <Bot className="h-4 w-4" />
              Coming soon
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}