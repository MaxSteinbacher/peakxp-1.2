import { useState } from "react";
import { useT } from "../lib/i18n";
import { Users, Star, DollarSign, TrendingUp, Compass, Sunrise } from "lucide-react";
import BackButton from "../components/shared/BackButton";
import AgentChat from "../components/agents/AgentChat";

const agents = [
  {
    key: "family",
    icon: Users,
    name: "Family Trip Agent",
    tagline: "Perfect ski holidays for all ages",
    desc: "Finds family-friendly resorts, kids' ski schools, childcare services and accommodation suited to families with children of all ages.",
    color: "text-peak-blue",
    bg: "bg-peak-blue/10",
    glowColor: "rgba(56,148,227,0.4)",
    badge: "Family",
    introMessage: "Hi! I'm your Family Trip Agent 👨‍👩‍👧‍👦 Tell me about your family — ages, experience levels, and when you're thinking of travelling — and I'll find the perfect resort for everyone.",
    quickReplies: ["We have 2 kids under 10", "Looking for Feb half-term", "Budget around €3000"],
    systemPrompt: "You are the PeakXP Family Trip Agent. Help families plan ski holidays for all ages. Ask about ages, experience levels, budget and dates. After gathering those details, ask in one grouped question: 'To complete your trip plan, are there any of the following you would like me to include? Equipment rental, ski school or private instructor, car rental, train travel, flights, storage and lockers, dining reservations, childcare, or activities like snowshoeing or spa.' For each service mentioned ask one targeted follow-up if key details are missing. For ski-school ask level, language, course type (group/private/multi-day), days. For childcare ask child ages and days. For equipment ask what items and whether they have measurements. For car ask departure location, passengers, snow tyres or 4WD. For train ask departure station and return journey. For flights ask departure airport, cabin class, return. For storage ask daily-lockers or trip-storage and days. For dining ask mountain/valley/apres-ski and dietary needs. For activities ask which ones and on which days. When you have enough info, output [PLAN_READY] then a ```json block with: {\"options\": [{\"optionIndex\": 1, \"optionLabel\": \"Top pick\", \"optionSummary\": \"one sentence\", \"resortName\": \"Resort Name\", \"destination\": \"Resort Name, Country\", \"primaryResortId\": \"resort-id-slug\", \"estimatedTotalEUR\": 3500, \"selectedServices\": [\"ski-pass\",\"accommodation\",\"ski-school\"], \"serviceDetails\": {\"ski-school\": {\"courseType\": \"group\", \"participants\": [{\"level\": \"Beginner\", \"age\": 8}], \"language\": \"English\", \"days\": 3}, \"equipment\": {\"items\": [\"skis\",\"boots\"], \"hasOwnMeasurements\": false, \"guidedMode\": true}}, \"dates\": null, \"guests\": {\"adults\": 2, \"children\": 2, \"seniors\": 0}, \"highlights\": [\"Point 1\",\"Point 2\",\"Point 3\"], \"notes\": \"any special info\"}]} with 3-5 options total. Only include services in selectedServices that the user confirmed. Include matching serviceDetails for each. Use exact keys: ski-pass, accommodation, equipment, ski-school, car, train, flights, storage, dining, childcare, activities. Use distinct optionLabels: Top pick, Best value, Most family-friendly, Hidden gem, Premium choice.",
  },
  {
    key: "luxury",
    icon: Star,
    name: "Luxury Skiing Experience Agent",
    tagline: "Five-star skiing, curated for you",
    desc: "Books slope-side chalets, private instructors, helicopter transfers and exclusive après-ski experiences at the world's most prestigious resorts.",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    glowColor: "rgba(250,204,21,0.35)",
    badge: "Luxury",
    introMessage: "Welcome ✨ I'm your Luxury Skiing Agent. Tell me your ideal experience — the resort, the chalet, the private guide — and I'll make it happen.",
    quickReplies: ["Verbier or Courchevel?", "I want a private chalet", "Budget is flexible"],
    systemPrompt: "You are the PeakXP Luxury Skiing Experience Agent. Help users plan ultra-premium ski trips. Ask about preferred resorts, accommodation style, private services, dates and guests. After gathering those details, ask in one grouped question: 'To complete your trip plan, are there any of the following you would like me to include? Equipment rental, ski school or private instructor, car rental, train travel, flights, storage and lockers, dining reservations, childcare, or activities like snowshoeing or spa.' For each service mentioned ask one targeted follow-up if key details are missing. When ready, output [PLAN_READY] then a ```json block with: {\"options\": [{\"optionIndex\": 1, \"optionLabel\": \"Top pick\", \"optionSummary\": \"one sentence\", \"resortName\": \"Resort Name\", \"destination\": \"Resort Name, Country\", \"primaryResortId\": \"resort-id-slug\", \"estimatedTotalEUR\": 8000, \"selectedServices\": [\"ski-pass\",\"accommodation\"], \"serviceDetails\": {}, \"dates\": null, \"guests\": {\"adults\": 2, \"children\": 0, \"seniors\": 0}, \"highlights\": [\"Point 1\",\"Point 2\",\"Point 3\"], \"notes\": \"\"}]} with 3-5 options. Only include services the user confirmed. Include matching serviceDetails for each confirmed service. Use exact keys: ski-pass, accommodation, equipment, ski-school, car, train, flights, storage, dining, childcare, activities. Labels: Top pick, Premium choice, Hidden gem, Best value, Most family-friendly.",
  },
  {
    key: "budget",
    icon: DollarSign,
    name: "Budget Experience Agent",
    tagline: "Maximum skiing, minimum spend",
    desc: "Finds the best value resorts, group lift pass deals, budget accommodation and affordable rental equipment so you can ski more for less.",
    color: "text-peak-green",
    bg: "bg-peak-green/10",
    glowColor: "rgba(62,207,142,0.35)",
    badge: "Budget",
    introMessage: "Hey! I'm your Budget Skiing Agent 💚 Let's get you on the slopes for less. What's your total budget and how many people are travelling?",
    quickReplies: ["Budget under €1500", "Solo traveller", "Any hidden gems?"],
    systemPrompt: "You are the PeakXP Budget Experience Agent. Help users find great value ski trips. Ask about budget, group size, dates, flexibility. After gathering those details, ask in one grouped question: 'To complete your trip plan, are there any of the following you would like me to include? Equipment rental, ski school or private instructor, car rental, train travel, flights, storage and lockers, dining reservations, childcare, or activities like snowshoeing or spa.' For each service mentioned ask one targeted follow-up if key details are missing. When ready, output [PLAN_READY] then a ```json block with: {\"options\": [{\"optionIndex\": 1, \"optionLabel\": \"Best value\", \"optionSummary\": \"one sentence\", \"resortName\": \"Resort Name\", \"destination\": \"Resort Name, Country\", \"primaryResortId\": \"resort-id-slug\", \"estimatedTotalEUR\": 900, \"selectedServices\": [\"ski-pass\",\"accommodation\"], \"serviceDetails\": {}, \"dates\": null, \"guests\": {\"adults\": 2, \"children\": 0, \"seniors\": 0}, \"highlights\": [\"Point 1\",\"Point 2\",\"Point 3\"], \"notes\": \"\"}]} with 3-5 options. Only include services the user confirmed. Include matching serviceDetails for each confirmed service. Use exact keys: ski-pass, accommodation, equipment, ski-school, car, train, flights, storage, dining, childcare, activities. Labels: Best value, Hidden gem, Top pick, Most family-friendly, Premium choice.",
  },
  {
    key: "advanced",
    icon: TrendingUp,
    name: "Advanced Skiing Experience Agent",
    tagline: "Elite terrain, expertly planned",
    desc: "Targets expert off-piste zones, freeride areas, steep couloirs and high-altitude glaciers — with matching guide and forecasting services.",
    color: "text-peak-red",
    bg: "bg-peak-red/10",
    glowColor: "rgba(251,52,61,0.35)",
    badge: "Advanced",
    introMessage: "Let's talk terrain 🎿 I'm your Advanced Skiing Agent. Tell me your ability level, preferred snow conditions and whether you want guided off-piste or unguided.",
    quickReplies: ["Expert skier, love off-piste", "Looking for powder days", "Need a freeride guide"],
    systemPrompt: "You are the PeakXP Advanced Skiing Experience Agent. Help expert skiers plan trips focused on challenging terrain. Ask about experience, preferred conditions, guide preference, dates and group. After gathering those details, ask in one grouped question: 'To complete your trip plan, are there any of the following you would like me to include? Equipment rental, ski school or private instructor, car rental, train travel, flights, storage and lockers, dining reservations, childcare, or activities like snowshoeing or spa.' For each service mentioned ask one targeted follow-up if key details are missing. When ready, output [PLAN_READY] then a ```json block with: {\"options\": [{\"optionIndex\": 1, \"optionLabel\": \"Top pick\", \"optionSummary\": \"one sentence\", \"resortName\": \"Resort Name\", \"destination\": \"Resort Name, Country\", \"primaryResortId\": \"resort-id-slug\", \"estimatedTotalEUR\": 2500, \"selectedServices\": [\"ski-pass\",\"accommodation\",\"equipment\"], \"serviceDetails\": {}, \"dates\": null, \"guests\": {\"adults\": 1, \"children\": 0, \"seniors\": 0}, \"highlights\": [\"Point 1\",\"Point 2\",\"Point 3\"], \"notes\": \"\"}]} with 3-5 options. Only include services the user confirmed. Include matching serviceDetails for each confirmed service. Use exact keys: ski-pass, accommodation, equipment, ski-school, car, train, flights, storage, dining, childcare, activities. Labels: Top pick, Hidden gem, Premium choice, Best value.",
  },
  {
    key: "beginner",
    icon: Sunrise,
    name: "Beginner Experience Agent",
    tagline: "Your first time on snow, done right",
    desc: "Selects beginner-friendly resorts, books first-timer lesson packages, equipment hire and gentle blue runs to build confidence fast.",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    glowColor: "rgba(192,132,252,0.35)",
    badge: "Beginner",
    introMessage: "Welcome to the snow! ❄️ I'm your Beginner Agent and I'll make sure your first ski trip is amazing. Have you ever skied before?",
    quickReplies: ["Complete beginner", "Tried once, want to improve", "Travelling with a non-skier"],
    systemPrompt: "You are the PeakXP Beginner Experience Agent. Help first-time and beginner skiers plan confidence-building trips. Ask about experience, age, group, comfort level, dates. After gathering those details, ask in one grouped question: 'To complete your trip plan, are there any of the following you would like me to include? Equipment rental, ski school or private instructor, car rental, train travel, flights, storage and lockers, dining reservations, childcare, or activities like snowshoeing or spa.' For each service mentioned ask one targeted follow-up if key details are missing. When ready, output [PLAN_READY] then a ```json block with: {\"options\": [{\"optionIndex\": 1, \"optionLabel\": \"Top pick\", \"optionSummary\": \"one sentence\", \"resortName\": \"Resort Name\", \"destination\": \"Resort Name, Country\", \"primaryResortId\": \"resort-id-slug\", \"estimatedTotalEUR\": 1200, \"selectedServices\": [\"ski-pass\",\"ski-school\",\"equipment\",\"accommodation\"], \"serviceDetails\": {\"ski-school\": {\"courseType\": \"group\", \"participants\": [{\"level\": \"First timer\"}], \"language\": \"English\", \"days\": 3}, \"equipment\": {\"items\": [\"skis\",\"boots\",\"helmet\"], \"hasOwnMeasurements\": false, \"guidedMode\": true}}, \"dates\": null, \"guests\": {\"adults\": 1, \"children\": 0, \"seniors\": 0}, \"highlights\": [\"Point 1\",\"Point 2\",\"Point 3\"], \"notes\": \"\"}]} with 3-5 options. Only include services the user confirmed. Include matching serviceDetails for each confirmed service. Use exact keys: ski-pass, accommodation, equipment, ski-school, car, train, flights, storage, dining, childcare, activities. Labels: Top pick, Best value, Most family-friendly, Hidden gem.",
  },
  {
    key: "explorer",
    icon: Compass,
    name: "New Horizons Experience Agent",
    tagline: "Discover skiing beyond the usual",
    desc: "Uncovers hidden gems, emerging ski destinations and off-the-beaten-path resorts across the Alps and beyond for the adventurous traveller.",
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    glowColor: "rgba(251,146,60,0.35)",
    badge: "Explorer",
    introMessage: "Ready to explore the unexpected? 🧭 I find resorts most people have never heard of. What are you tired of at your usual resort?",
    quickReplies: ["Bored of the usual resorts", "Want something in Eastern Europe", "Looking for fewer crowds"],
    systemPrompt: "You are the PeakXP New Horizons Experience Agent. Help adventurous skiers discover hidden gem resorts. Ask about what they want to escape from and what excites them, plus dates and group. After gathering those details, ask in one grouped question: 'To complete your trip plan, are there any of the following you would like me to include? Equipment rental, ski school or private instructor, car rental, train travel, flights, storage and lockers, dining reservations, childcare, or activities like snowshoeing or spa.' For each service mentioned ask one targeted follow-up if key details are missing. When ready, output [PLAN_READY] then a ```json block with: {\"options\": [{\"optionIndex\": 1, \"optionLabel\": \"Hidden gem\", \"optionSummary\": \"one sentence\", \"resortName\": \"Resort Name\", \"destination\": \"Resort Name, Country\", \"primaryResortId\": \"resort-id-slug\", \"estimatedTotalEUR\": 1500, \"selectedServices\": [\"ski-pass\",\"accommodation\"], \"serviceDetails\": {}, \"dates\": null, \"guests\": {\"adults\": 2, \"children\": 0, \"seniors\": 0}, \"highlights\": [\"Point 1\",\"Point 2\",\"Point 3\"], \"notes\": \"\"}]} with 3-5 options. Only include services the user confirmed. Include matching serviceDetails for each confirmed service. Use exact keys: ski-pass, accommodation, equipment, ski-school, car, train, flights, storage, dining, childcare, activities. Prioritise lesser-known resorts. Labels: Hidden gem, Top pick, Best value, Premium choice.",
  },
];

export default function ExpertAgents() {
  const t = useT();
  const [activeAgent, setActiveAgent] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);

  function openChat(agent) {
    setActiveAgent(agent);
    setChatOpen(true);
  }

  return (
    <>
      <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <BackButton to="/" className="mb-6" />
        <div className="mb-12 text-center">
          <span className="inline-block text-peak-blue text-xs font-semibold uppercase tracking-widest mb-3">AI-powered</span>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-peak-text mb-4">{t('expert_agents_title')}</h1>
          <p className="text-peak-text-secondary text-lg max-w-2xl mx-auto">
            Specialised AI booking agents that plan, book and manage your entire ski trip — tailored to your style.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <div
              key={agent.name}
              className="group bg-peak-card border border-white/5 rounded-2xl p-7 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={() => openChat(agent)}
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
              <button
                onClick={(e) => { e.stopPropagation(); openChat(agent); }}
                className={`mt-auto flex items-center gap-2 text-sm font-semibold ${agent.color} group-hover:gap-3 transition-all`}
              >
                <agent.icon className="h-4 w-4" />
                {t('start_planning')} →
              </button>
            </div>
          ))}
        </div>
      </div>

      {activeAgent && (
        <AgentChat agent={activeAgent} isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      )}
    </>
  );
}