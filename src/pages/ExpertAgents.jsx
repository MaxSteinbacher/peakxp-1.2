import { useState } from "react";
import { useT } from "../lib/i18n";
import { Users, Star, DollarSign, TrendingUp, Compass, Sunrise } from "lucide-react";
import AgentChat from "../components/agents/AgentChat";

const AGENT_DEFS = [
  {
    key: "family",
    icon: Users,
    nameKey: "agent_family_name",
    taglineKey: "agent_family_tagline",
    descKey: "agent_family_desc",
    badgeKey: "agent_badge_family",
    introKey: "agent_intro_family",
    accent: "#3894E3",
    glow: "rgba(56,148,227,0.55)",
    gradFrom: "rgba(56,148,227,0.18)",
    gradTo: "rgba(56,148,227,0.04)",
    iconBg: "rgba(56,148,227,0.15)",
    badgeBg: "rgba(56,148,227,0.18)",
    emoji: "👨‍👩‍👧‍👦",
    quickReplies: ["We have 2 kids under 10", "Looking for Feb half-term", "Budget around €3000"],
    systemPrompt: "You are the PeakXP Family Trip Agent. Help families plan ski holidays for all ages. Ask about ages, experience levels, budget and dates. After gathering those details, ask in one grouped question: 'To complete your trip plan, are there any of the following you would like me to include? Equipment rental, ski school or private instructor, car rental, train travel, flights, storage and lockers, dining reservations, childcare, or activities like snowshoeing or spa.' For each service mentioned ask one targeted follow-up if key details are missing. For ski-school ask level, language, course type (group/private/multi-day), days. For childcare ask child ages and days. For equipment ask what items and whether they have measurements. For car ask departure location, passengers, snow tyres or 4WD. For train ask departure station and return journey. For flights ask departure airport, cabin class, return. For storage ask daily-lockers or trip-storage and days. For dining ask mountain/valley/apres-ski and dietary needs. For activities ask which ones and on which days. When you have enough info, output [PLAN_READY] then a ```json block with: {\"options\": [{\"optionIndex\": 1, \"optionLabel\": \"Top pick\", \"optionSummary\": \"one sentence\", \"resortName\": \"Resort Name\", \"destination\": \"Resort Name, Country\", \"primaryResortId\": \"resort-id-slug\", \"estimatedTotalEUR\": 3500, \"selectedServices\": [\"ski-pass\",\"accommodation\",\"ski-school\"], \"serviceDetails\": {\"ski-school\": {\"courseType\": \"group\", \"participants\": [{\"level\": \"Beginner\", \"age\": 8}], \"language\": \"English\", \"days\": 3}, \"equipment\": {\"items\": [\"skis\",\"boots\"], \"hasOwnMeasurements\": false, \"guidedMode\": true}}, \"dates\": null, \"guests\": {\"adults\": 2, \"children\": 2, \"seniors\": 0}, \"highlights\": [\"Point 1\",\"Point 2\",\"Point 3\"], \"notes\": \"any special info\"}]} with 3-5 options total. Only include services in selectedServices that the user confirmed. Include matching serviceDetails for each. Use exact keys: ski-pass, accommodation, equipment, ski-school, car, train, flights, storage, dining, childcare, activities. Use distinct optionLabels: Top pick, Best value, Most family-friendly, Hidden gem, Premium choice.",
  },
  {
    key: "luxury",
    icon: Star,
    nameKey: "agent_luxury_name",
    taglineKey: "agent_luxury_tagline",
    descKey: "agent_luxury_desc",
    badgeKey: "agent_badge_luxury",
    introKey: "agent_intro_luxury",
    accent: "#F59E0B",
    glow: "rgba(245,158,11,0.55)",
    gradFrom: "rgba(245,158,11,0.18)",
    gradTo: "rgba(245,158,11,0.04)",
    iconBg: "rgba(245,158,11,0.15)",
    badgeBg: "rgba(245,158,11,0.18)",
    emoji: "✨",
    quickReplies: ["Verbier or Courchevel?", "I want a private chalet", "Budget is flexible"],
    systemPrompt: "You are the PeakXP Luxury Skiing Experience Agent. Help users plan ultra-premium ski trips. Ask about preferred resorts, accommodation style, private services, dates and guests. After gathering those details, ask in one grouped question: 'To complete your trip plan, are there any of the following you would like me to include? Equipment rental, ski school or private instructor, car rental, train travel, flights, storage and lockers, dining reservations, childcare, or activities like snowshoeing or spa.' For each service mentioned ask one targeted follow-up if key details are missing. When ready, output [PLAN_READY] then a ```json block with: {\"options\": [{\"optionIndex\": 1, \"optionLabel\": \"Top pick\", \"optionSummary\": \"one sentence\", \"resortName\": \"Resort Name\", \"destination\": \"Resort Name, Country\", \"primaryResortId\": \"resort-id-slug\", \"estimatedTotalEUR\": 8000, \"selectedServices\": [\"ski-pass\",\"accommodation\"], \"serviceDetails\": {}, \"dates\": null, \"guests\": {\"adults\": 2, \"children\": 0, \"seniors\": 0}, \"highlights\": [\"Point 1\",\"Point 2\",\"Point 3\"], \"notes\": \"\"}]} with 3-5 options. Only include services the user confirmed. Include matching serviceDetails for each confirmed service. Use exact keys: ski-pass, accommodation, equipment, ski-school, car, train, flights, storage, dining, childcare, activities. Labels: Top pick, Premium choice, Hidden gem, Best value, Most family-friendly.",
  },
  {
    key: "budget",
    icon: DollarSign,
    nameKey: "agent_budget_name",
    taglineKey: "agent_budget_tagline",
    descKey: "agent_budget_desc",
    badgeKey: "agent_badge_budget",
    introKey: "agent_intro_budget",
    accent: "#10B981",
    glow: "rgba(16,185,129,0.55)",
    gradFrom: "rgba(16,185,129,0.18)",
    gradTo: "rgba(16,185,129,0.04)",
    iconBg: "rgba(16,185,129,0.15)",
    badgeBg: "rgba(16,185,129,0.18)",
    emoji: "💚",
    quickReplies: ["Budget under €1500", "Solo traveller", "Any hidden gems?"],
    systemPrompt: "You are the PeakXP Budget Experience Agent. Help users find great value ski trips. Ask about budget, group size, dates, flexibility. After gathering those details, ask in one grouped question: 'To complete your trip plan, are there any of the following you would like me to include? Equipment rental, ski school or private instructor, car rental, train travel, flights, storage and lockers, dining reservations, childcare, or activities like snowshoeing or spa.' For each service mentioned ask one targeted follow-up if key details are missing. When ready, output [PLAN_READY] then a ```json block with: {\"options\": [{\"optionIndex\": 1, \"optionLabel\": \"Best value\", \"optionSummary\": \"one sentence\", \"resortName\": \"Resort Name\", \"destination\": \"Resort Name, Country\", \"primaryResortId\": \"resort-id-slug\", \"estimatedTotalEUR\": 900, \"selectedServices\": [\"ski-pass\",\"accommodation\"], \"serviceDetails\": {}, \"dates\": null, \"guests\": {\"adults\": 2, \"children\": 0, \"seniors\": 0}, \"highlights\": [\"Point 1\",\"Point 2\",\"Point 3\"], \"notes\": \"\"}]} with 3-5 options. Only include services the user confirmed. Include matching serviceDetails for each confirmed service. Use exact keys: ski-pass, accommodation, equipment, ski-school, car, train, flights, storage, dining, childcare, activities. Labels: Best value, Hidden gem, Top pick, Most family-friendly, Premium choice.",
  },
  {
    key: "advanced",
    icon: TrendingUp,
    nameKey: "agent_advanced_name",
    taglineKey: "agent_advanced_tagline",
    descKey: "agent_advanced_desc",
    badgeKey: "agent_badge_advanced",
    introKey: "agent_intro_advanced",
    accent: "#FB343D",
    glow: "rgba(251,52,61,0.55)",
    gradFrom: "rgba(251,52,61,0.18)",
    gradTo: "rgba(251,52,61,0.04)",
    iconBg: "rgba(251,52,61,0.15)",
    badgeBg: "rgba(251,52,61,0.18)",
    emoji: "🎿",
    quickReplies: ["Expert skier, love off-piste", "Looking for powder days", "Need a freeride guide"],
    systemPrompt: "You are the PeakXP Advanced Skiing Experience Agent. Help expert skiers plan trips focused on challenging terrain. Ask about experience, preferred conditions, guide preference, dates and group. After gathering those details, ask in one grouped question: 'To complete your trip plan, are there any of the following you would like me to include? Equipment rental, ski school or private instructor, car rental, train travel, flights, storage and lockers, dining reservations, childcare, or activities like snowshoeing or spa.' For each service mentioned ask one targeted follow-up if key details are missing. When ready, output [PLAN_READY] then a ```json block with: {\"options\": [{\"optionIndex\": 1, \"optionLabel\": \"Top pick\", \"optionSummary\": \"one sentence\", \"resortName\": \"Resort Name\", \"destination\": \"Resort Name, Country\", \"primaryResortId\": \"resort-id-slug\", \"estimatedTotalEUR\": 2500, \"selectedServices\": [\"ski-pass\",\"accommodation\",\"equipment\"], \"serviceDetails\": {}, \"dates\": null, \"guests\": {\"adults\": 1, \"children\": 0, \"seniors\": 0}, \"highlights\": [\"Point 1\",\"Point 2\",\"Point 3\"], \"notes\": \"\"}]} with 3-5 options. Only include services the user confirmed. Include matching serviceDetails for each confirmed service. Use exact keys: ski-pass, accommodation, equipment, ski-school, car, train, flights, storage, dining, childcare, activities. Labels: Top pick, Hidden gem, Premium choice, Best value.",
  },
  {
    key: "beginner",
    icon: Sunrise,
    nameKey: "agent_beginner_name",
    taglineKey: "agent_beginner_tagline",
    descKey: "agent_beginner_desc",
    badgeKey: "agent_badge_beginner",
    introKey: "agent_intro_beginner",
    accent: "#A855F7",
    glow: "rgba(168,85,247,0.55)",
    gradFrom: "rgba(168,85,247,0.18)",
    gradTo: "rgba(168,85,247,0.04)",
    iconBg: "rgba(168,85,247,0.15)",
    badgeBg: "rgba(168,85,247,0.18)",
    emoji: "👋",
    quickReplies: ["Complete beginner", "Tried once, want to improve", "Travelling with a non-skier"],
    systemPrompt: "You are the PeakXP Beginner Experience Agent. Help first-time and beginner skiers plan confidence-building trips. Ask about experience, age, group, comfort level, dates. After gathering those details, ask in one grouped question: 'To complete your trip plan, are there any of the following you would like me to include? Equipment rental, ski school or private instructor, car rental, train travel, flights, storage and lockers, dining reservations, childcare, or activities like snowshoeing or spa.' For each service mentioned ask one targeted follow-up if key details are missing. When ready, output [PLAN_READY] then a ```json block with: {\"options\": [{\"optionIndex\": 1, \"optionLabel\": \"Top pick\", \"optionSummary\": \"one sentence\", \"resortName\": \"Resort Name\", \"destination\": \"Resort Name, Country\", \"primaryResortId\": \"resort-id-slug\", \"estimatedTotalEUR\": 1200, \"selectedServices\": [\"ski-pass\",\"ski-school\",\"equipment\",\"accommodation\"], \"serviceDetails\": {\"ski-school\": {\"courseType\": \"group\", \"participants\": [{\"level\": \"First timer\"}], \"language\": \"English\", \"days\": 3}, \"equipment\": {\"items\": [\"skis\",\"boots\",\"helmet\"], \"hasOwnMeasurements\": false, \"guidedMode\": true}}, \"dates\": null, \"guests\": {\"adults\": 1, \"children\": 0, \"seniors\": 0}, \"highlights\": [\"Point 1\",\"Point 2\",\"Point 3\"], \"notes\": \"\"}]} with 3-5 options. Only include services the user confirmed. Include matching serviceDetails for each confirmed service. Use exact keys: ski-pass, accommodation, equipment, ski-school, car, train, flights, storage, dining, childcare, activities. Labels: Top pick, Best value, Most family-friendly, Hidden gem.",
  },
  {
    key: "explorer",
    icon: Compass,
    nameKey: "agent_explorer_name",
    taglineKey: "agent_explorer_tagline",
    descKey: "agent_explorer_desc",
    badgeKey: "agent_badge_explorer",
    introKey: "agent_intro_explorer",
    accent: "#F97316",
    glow: "rgba(249,115,22,0.55)",
    gradFrom: "rgba(249,115,22,0.18)",
    gradTo: "rgba(249,115,22,0.04)",
    iconBg: "rgba(249,115,22,0.15)",
    badgeBg: "rgba(249,115,22,0.18)",
    emoji: "🌍",
    quickReplies: ["Bored of the usual resorts", "Want something in Eastern Europe", "Looking for fewer crowds"],
    systemPrompt: "You are the PeakXP New Horizons Experience Agent. Help adventurous skiers discover hidden gem resorts. Ask about what they want to escape from and what excites them, plus dates and group. After gathering those details, ask in one grouped question: 'To complete your trip plan, are there any of the following you would like me to include? Equipment rental, ski school or private instructor, car rental, train travel, flights, storage and lockers, dining reservations, childcare, or activities like snowshoeing or spa.' For each service mentioned ask one targeted follow-up if key details are missing. When ready, output [PLAN_READY] then a ```json block with: {\"options\": [{\"optionIndex\": 1, \"optionLabel\": \"Hidden gem\", \"optionSummary\": \"one sentence\", \"resortName\": \"Resort Name\", \"destination\": \"Resort Name, Country\", \"primaryResortId\": \"resort-id-slug\", \"estimatedTotalEUR\": 1500, \"selectedServices\": [\"ski-pass\",\"accommodation\"], \"serviceDetails\": {}, \"dates\": null, \"guests\": {\"adults\": 2, \"children\": 0, \"seniors\": 0}, \"highlights\": [\"Point 1\",\"Point 2\",\"Point 3\"], \"notes\": \"\"}]} with 3-5 options. Only include services the user confirmed. Include matching serviceDetails for each confirmed service. Use exact keys: ski-pass, accommodation, equipment, ski-school, car, train, flights, storage, dining, childcare, activities. Prioritise lesser-known resorts. Labels: Hidden gem, Top pick, Best value, Premium choice.",
  },
];

// Animated orb backgrounds — one per agent accent colour, CSS-only
const ORBS = [
  { cx: "15%", cy: "20%", r: 380, color: "rgba(56,148,227,0.07)" },
  { cx: "85%", cy: "15%", r: 300, color: "rgba(245,158,11,0.06)" },
  { cx: "50%", cy: "80%", r: 420, color: "rgba(168,85,247,0.05)" },
  { cx: "80%", cy: "65%", r: 260, color: "rgba(251,52,61,0.06)" },
];

export default function ExpertAgents() {
  const t = useT();
  const [activeAgent, setActiveAgent] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [hoveredKey, setHoveredKey] = useState(null);

  const agents = AGENT_DEFS.map(a => ({
    ...a,
    name: t(a.nameKey),
    tagline: t(a.taglineKey),
    desc: t(a.descKey),
    badge: t(a.badgeKey),
    introMessage: t(a.introKey),
    color: `color-mix(in srgb, ${a.accent} 100%, transparent)`,
  }));

  function openChat(agent) {
    setActiveAgent(agent);
    setChatOpen(true);
  }

  return (
    <>
      {/* ── Full-bleed page wrapper with animated gradient bg ── */}
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #060A18 0%, #080C1F 40%, #060A18 100%)",
        position: "relative",
        overflow: "hidden",
      }}>

        {/* ── Animated ambient orbs — CSS keyframes via style tag ── */}
        <style>{`
          @keyframes orbFloat1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,-20px) scale(1.08)} }
          @keyframes orbFloat2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-25px,30px) scale(1.05)} }
          @keyframes orbFloat3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,25px) scale(1.06)} }
          @keyframes orbFloat4 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-20px,-30px) scale(1.04)} }
          @keyframes shimmer  { 0%{opacity:0.4} 50%{opacity:0.7} 100%{opacity:0.4} }
          @keyframes cardGlow { 0%,100%{box-shadow:0 0 0 1px rgba(255,255,255,0.06),0 20px 60px rgba(0,0,0,0.4)} }
          @keyframes heroTextIn { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
          @keyframes badgePulse { 0%,100%{opacity:0.9} 50%{opacity:1} }
        `}</style>

        {/* Ambient orbs */}
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:0 }}>
          {ORBS.map((orb,i) => (
            <div key={i} style={{
              position: "absolute",
              left: orb.cx, top: orb.cy,
              width: orb.r*2, height: orb.r*2,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
              transform: "translate(-50%,-50%)",
              animation: `orbFloat${i+1} ${14+i*3}s ease-in-out infinite`,
            }} />
          ))}
          {/* Fine grain texture overlay */}
          <div style={{
            position:"absolute", inset:0,
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
            opacity: 0.4,
          }} />
        </div>

        {/* ── Hero section ── */}
        <div style={{ position:"relative", zIndex:1, textAlign:"center", padding:"100px 24px 64px" }}>
          {/* Eyebrow pill */}
          <div style={{
            display:"inline-flex", alignItems:"center", gap:8,
            background:"rgba(56,148,227,0.12)", border:"1px solid rgba(56,148,227,0.25)",
            borderRadius:100, padding:"6px 16px", marginBottom:24,
            animation:"shimmer 3s ease-in-out infinite",
          }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:"#3894E3", boxShadow:"0 0 8px #3894E3" }} />
            <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"#3894E3" }}>
              AI-Powered
            </span>
          </div>

          {/* Main title */}
          <h1 style={{
            fontFamily:"var(--font-display,inherit)", fontWeight:900,
            fontSize:"clamp(48px,8vw,88px)", lineHeight:1.0,
            letterSpacing:"-0.03em", color:"#fff", margin:"0 0 20px",
            animation:"heroTextIn 0.7s ease both",
          }}>
            Expert{" "}
            <span style={{
              background:"linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.6) 100%)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
            }}>
              Agents
            </span>
          </h1>

          <p style={{
            fontSize:18, lineHeight:1.6, color:"rgba(255,255,255,0.5)",
            maxWidth:520, margin:"0 auto",
            animation:"heroTextIn 0.7s 0.15s ease both", opacity:0,
            animationFillMode:"forwards",
          }}>
            Specialised AI booking agents that plan, book and manage your entire ski trip —
            tailored to your style.
          </p>

          {/* Decorative line */}
          <div style={{ margin:"48px auto 0", width:1, height:60, background:"linear-gradient(to bottom, rgba(255,255,255,0.12), transparent)" }} />
        </div>

        {/* ── Agent cards grid ── */}
        <div style={{
          position:"relative", zIndex:1,
          maxWidth:1200, margin:"0 auto",
          padding:"0 24px 80px",
          display:"grid",
          gridTemplateColumns:"repeat(auto-fill, minmax(340px, 1fr))",
          gap:20,
        }}>
          {agents.map((agent, idx) => {
            const isHovered = hoveredKey === agent.key;
            return (
              <div
                key={agent.key}
                onClick={() => openChat(agent)}
                onMouseEnter={() => setHoveredKey(agent.key)}
                onMouseLeave={() => setHoveredKey(null)}
                style={{
                  position: "relative",
                  borderRadius: 20,
                  padding: "28px 28px 24px",
                  cursor: "pointer",
                  overflow: "hidden",
                  transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease",
                  transform: isHovered ? "translateY(-6px) scale(1.01)" : "translateY(0) scale(1)",
                  // Glowing border via box-shadow
                  boxShadow: isHovered
                    ? `0 0 0 1px ${agent.accent}60, 0 0 40px ${agent.glow}, 0 24px 64px rgba(0,0,0,0.5)`
                    : "0 0 0 1px rgba(255,255,255,0.07), 0 8px 32px rgba(0,0,0,0.35)",
                  background: "rgba(12,16,36,0.85)",
                  backdropFilter: "blur(20px)",
                  animationDelay: `${idx * 0.08}s`,
                }}
              >
                {/* Per-card ambient gradient based on accent */}
                <div style={{
                  position:"absolute", inset:0, borderRadius:20,
                  background: `radial-gradient(ellipse at 10% 0%, ${agent.gradFrom} 0%, ${agent.gradTo} 60%, transparent 100%)`,
                  transition: "opacity 0.3s ease",
                  opacity: isHovered ? 1 : 0.6,
                  pointerEvents:"none",
                }} />

                {/* Shimmer line at top when hovered */}
                {isHovered && (
                  <div style={{
                    position:"absolute", top:0, left:"10%", right:"10%", height:1,
                    background:`linear-gradient(to right, transparent, ${agent.accent}90, transparent)`,
                    animation:"shimmer 2s ease infinite",
                  }} />
                )}

                {/* Card content */}
                <div style={{ position:"relative", zIndex:1 }}>
                  {/* Top row: icon + badge */}
                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:20 }}>
                    {/* Icon */}
                    <div style={{
                      width:52, height:52, borderRadius:14,
                      background: agent.iconBg,
                      border: `1px solid ${agent.accent}30`,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      transition:"all 0.3s ease",
                      boxShadow: isHovered ? `0 0 20px ${agent.glow}` : "none",
                    }}>
                      <agent.icon style={{ width:24, height:24, color:agent.accent }} />
                    </div>

                    {/* Badge */}
                    <span style={{
                      fontSize:11, fontWeight:700, letterSpacing:"0.06em",
                      padding:"5px 12px", borderRadius:100,
                      background: agent.badgeBg,
                      border: `1px solid ${agent.accent}35`,
                      color: agent.accent,
                      animation:"badgePulse 3s ease-in-out infinite",
                    }}>
                      {agent.badge}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 style={{
                    fontSize:19, fontWeight:800, color:"#fff",
                    margin:"0 0 6px", letterSpacing:"-0.02em", lineHeight:1.2,
                  }}>
                    {agent.name}
                  </h3>

                  {/* Tagline */}
                  <p style={{
                    fontSize:13, fontWeight:600, color:agent.accent,
                    margin:"0 0 12px", opacity:0.95,
                  }}>
                    {agent.tagline}
                  </p>

                  {/* Description */}
                  <p style={{
                    fontSize:13.5, lineHeight:1.65,
                    color:"rgba(255,255,255,0.45)",
                    margin:"0 0 24px",
                  }}>
                    {agent.desc}
                  </p>

                  {/* CTA row */}
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <button
                      onClick={e => { e.stopPropagation(); openChat(agent); }}
                      style={{
                        display:"flex", alignItems:"center", gap:7,
                        fontSize:13, fontWeight:700, color:agent.accent,
                        background:"none", border:"none", padding:0, cursor:"pointer",
                        transition:"gap 0.2s ease",
                      }}
                    >
                      <agent.icon style={{ width:14, height:14 }} />
                      {t("start_planning")} →
                    </button>

                    {/* Emoji accent */}
                    <span style={{ fontSize:20, opacity:0.7 }}>{agent.emoji}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom fade */}
        <div style={{
          position:"absolute", bottom:0, left:0, right:0, height:120,
          background:"linear-gradient(to top, #060A18, transparent)",
          pointerEvents:"none",
        }} />
      </div>

      {activeAgent && (
        <AgentChat agent={activeAgent} isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      )}
    </>
  );
}
