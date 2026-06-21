import { useState } from "react";
import { useT } from "../lib/i18n";
import { Users, Star, DollarSign, TrendingUp, Compass, Sunrise } from "lucide-react";
import AgentChat from "../components/agents/AgentChat";

const AGENT_DEFS = [
  {
    key: "family", icon: Users,
    nameKey: "agent_family_name", taglineKey: "agent_family_tagline",
    descKey: "agent_family_desc", badgeKey: "agent_badge_family", introKey: "agent_intro_family",
    accent: "#3894E3", glow: "rgba(56,148,227,0.5)",
    gradFrom: "rgba(56,148,227,0.14)", iconBg: "rgba(56,148,227,0.12)",
    image: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/be9bf6c14_Familie_Skifahren_Winter_24_25MirjaGeh_12.jpg",
    quickReplies: ["We have 2 kids under 10", "Looking for Feb half-term", "Budget around €3000"],
    systemPrompt: "You are the PeakXP Family Trip Agent. Help families plan ski holidays for all ages. Ask about ages, experience levels, budget and dates. After gathering those details, ask in one grouped question: 'To complete your trip plan, are there any of the following you would like me to include? Equipment rental, ski school or private instructor, car rental, train travel, flights, storage and lockers, dining reservations, childcare, or activities like snowshoeing or spa.' For each service mentioned ask one targeted follow-up if key details are missing. When you have enough info, output [PLAN_READY] then a ```json block with: {\"options\": [{\"optionIndex\": 1, \"optionLabel\": \"Top pick\", \"optionSummary\": \"one sentence\", \"resortName\": \"Resort Name\", \"destination\": \"Resort Name, Country\", \"primaryResortId\": \"resort-id-slug\", \"estimatedTotalEUR\": 3500, \"selectedServices\": [\"ski-pass\",\"accommodation\",\"ski-school\"], \"serviceDetails\": {}, \"dates\": null, \"guests\": {\"adults\": 2, \"children\": 2, \"seniors\": 0}, \"highlights\": [\"Point 1\",\"Point 2\",\"Point 3\"], \"notes\": \"\"}]} with 3-5 options. Use exact keys: ski-pass, accommodation, equipment, ski-school, car, train, flights, storage, dining, childcare, activities. Labels: Top pick, Best value, Most family-friendly, Hidden gem, Premium choice.",
  },
  {
    key: "luxury", icon: Star,
    nameKey: "agent_luxury_name", taglineKey: "agent_luxury_tagline",
    descKey: "agent_luxury_desc", badgeKey: "agent_badge_luxury", introKey: "agent_intro_luxury",
    accent: "#F59E0B", glow: "rgba(245,158,11,0.5)",
    gradFrom: "rgba(245,158,11,0.12)", iconBg: "rgba(245,158,11,0.12)",
    image: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/d30c1904e_AuenansichtTerrasse2HotelKitzhof.jpg",
    quickReplies: ["Verbier or Courchevel?", "I want a private chalet", "Budget is flexible"],
    systemPrompt: "You are the PeakXP Luxury Skiing Experience Agent. Help users plan ultra-premium ski trips. Ask about preferred resorts, accommodation style, private services, dates and guests. After gathering those details, ask in one grouped question about additional services. When ready, output [PLAN_READY] then a ```json block with: {\"options\": [{\"optionIndex\": 1, \"optionLabel\": \"Top pick\", \"optionSummary\": \"one sentence\", \"resortName\": \"Resort Name\", \"destination\": \"Resort Name, Country\", \"primaryResortId\": \"resort-id-slug\", \"estimatedTotalEUR\": 8000, \"selectedServices\": [\"ski-pass\",\"accommodation\"], \"serviceDetails\": {}, \"dates\": null, \"guests\": {\"adults\": 2, \"children\": 0, \"seniors\": 0}, \"highlights\": [\"Point 1\",\"Point 2\",\"Point 3\"], \"notes\": \"\"}]} with 3-5 options. Labels: Top pick, Premium choice, Hidden gem, Best value, Most family-friendly.",
  },
  {
    key: "budget", icon: DollarSign,
    nameKey: "agent_budget_name", taglineKey: "agent_budget_tagline",
    descKey: "agent_budget_desc", badgeKey: "agent_badge_budget", introKey: "agent_intro_budget",
    accent: "#10B981", glow: "rgba(16,185,129,0.5)",
    gradFrom: "rgba(16,185,129,0.12)", iconBg: "rgba(16,185,129,0.12)",
    image: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/48ae20357_FedericoModica2650.jpg",
    quickReplies: ["Budget under €1500", "Solo traveller", "Any hidden gems?"],
    systemPrompt: "You are the PeakXP Budget Experience Agent. Help users find great value ski trips. Ask about budget, group size, dates, flexibility. After gathering those details, ask in one grouped question about additional services. When ready, output [PLAN_READY] then a ```json block with: {\"options\": [{\"optionIndex\": 1, \"optionLabel\": \"Best value\", \"optionSummary\": \"one sentence\", \"resortName\": \"Resort Name\", \"destination\": \"Resort Name, Country\", \"primaryResortId\": \"resort-id-slug\", \"estimatedTotalEUR\": 900, \"selectedServices\": [\"ski-pass\",\"accommodation\"], \"serviceDetails\": {}, \"dates\": null, \"guests\": {\"adults\": 2, \"children\": 0, \"seniors\": 0}, \"highlights\": [\"Point 1\",\"Point 2\",\"Point 3\"], \"notes\": \"\"}]} with 3-5 options. Labels: Best value, Hidden gem, Top pick, Most family-friendly, Premium choice.",
  },
  {
    key: "advanced", icon: TrendingUp,
    nameKey: "agent_advanced_name", taglineKey: "agent_advanced_tagline",
    descKey: "agent_advanced_desc", badgeKey: "agent_badge_advanced", introKey: "agent_intro_advanced",
    accent: "#FB343D", glow: "rgba(251,52,61,0.5)",
    gradFrom: "rgba(251,52,61,0.12)", iconBg: "rgba(251,52,61,0.12)",
    image: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/7284a7dd7_20170120_SkiWelt_Tim-Marcour_highres-2skiweltwilderkaiser-brixentalitimmarcour.jpg",
    quickReplies: ["Expert skier, love off-piste", "Looking for powder days", "Need a freeride guide"],
    systemPrompt: "You are the PeakXP Advanced Skiing Experience Agent. Help expert skiers plan trips focused on challenging terrain. Ask about experience, preferred conditions, guide preference, dates and group. After gathering those details, ask in one grouped question about additional services. When ready, output [PLAN_READY] then a ```json block with: {\"options\": [{\"optionIndex\": 1, \"optionLabel\": \"Top pick\", \"optionSummary\": \"one sentence\", \"resortName\": \"Resort Name\", \"destination\": \"Resort Name, Country\", \"primaryResortId\": \"resort-id-slug\", \"estimatedTotalEUR\": 2500, \"selectedServices\": [\"ski-pass\",\"accommodation\",\"equipment\"], \"serviceDetails\": {}, \"dates\": null, \"guests\": {\"adults\": 1, \"children\": 0, \"seniors\": 0}, \"highlights\": [\"Point 1\",\"Point 2\",\"Point 3\"], \"notes\": \"\"}]} with 3-5 options. Labels: Top pick, Hidden gem, Premium choice, Best value.",
  },
  {
    key: "beginner", icon: Sunrise,
    nameKey: "agent_beginner_name", taglineKey: "agent_beginner_tagline",
    descKey: "agent_beginner_desc", badgeKey: "agent_badge_beginner", introKey: "agent_intro_beginner",
    accent: "#A855F7", glow: "rgba(168,85,247,0.5)",
    gradFrom: "rgba(168,85,247,0.12)", iconBg: "rgba(168,85,247,0.12)",
    image: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/b295dbb03_DJI_0133.jpg",
    quickReplies: ["Complete beginner", "Tried once, want to improve", "Travelling with a non-skier"],
    systemPrompt: "You are the PeakXP Beginner Experience Agent. Help first-time and beginner skiers plan confidence-building trips. Ask about experience, age, group, comfort level, dates. After gathering details ask about additional services. When ready, output [PLAN_READY] then a ```json block with: {\"options\": [{\"optionIndex\": 1, \"optionLabel\": \"Top pick\", \"optionSummary\": \"one sentence\", \"resortName\": \"Resort Name\", \"destination\": \"Resort Name, Country\", \"primaryResortId\": \"resort-id-slug\", \"estimatedTotalEUR\": 1200, \"selectedServices\": [\"ski-pass\",\"ski-school\",\"equipment\",\"accommodation\"], \"serviceDetails\": {}, \"dates\": null, \"guests\": {\"adults\": 1, \"children\": 0, \"seniors\": 0}, \"highlights\": [\"Point 1\",\"Point 2\",\"Point 3\"], \"notes\": \"\"}]} with 3-5 options. Labels: Top pick, Best value, Most family-friendly, Hidden gem.",
  },
  {
    key: "explorer", icon: Compass,
    nameKey: "agent_explorer_name", taglineKey: "agent_explorer_tagline",
    descKey: "agent_explorer_desc", badgeKey: "agent_badge_explorer", introKey: "agent_intro_explorer",
    accent: "#F97316", glow: "rgba(249,115,22,0.5)",
    gradFrom: "rgba(249,115,22,0.12)", iconBg: "rgba(249,115,22,0.12)",
    image: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/36b3a6b56_AS-PHOTO-231203-1511-web2048px72dpi.jpg",
    quickReplies: ["Bored of the usual resorts", "Want something in Eastern Europe", "Looking for fewer crowds"],
    systemPrompt: "You are the PeakXP New Horizons Experience Agent. Help adventurous skiers discover hidden gem resorts. Ask about what they want to escape and what excites them, plus dates and group. After gathering details ask about additional services. When ready, output [PLAN_READY] then a ```json block with: {\"options\": [{\"optionIndex\": 1, \"optionLabel\": \"Hidden gem\", \"optionSummary\": \"one sentence\", \"resortName\": \"Resort Name\", \"destination\": \"Resort Name, Country\", \"primaryResortId\": \"resort-id-slug\", \"estimatedTotalEUR\": 1500, \"selectedServices\": [\"ski-pass\",\"accommodation\"], \"serviceDetails\": {}, \"dates\": null, \"guests\": {\"adults\": 2, \"children\": 0, \"seniors\": 0}, \"highlights\": [\"Point 1\",\"Point 2\",\"Point 3\"], \"notes\": \"\"}]} with 3-5 options. Prioritise lesser-known resorts. Labels: Hidden gem, Top pick, Best value, Premium choice.",
  },
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
  }));

  function openChat(agent) { setActiveAgent(agent); setChatOpen(true); }

  return (
    <>
      <style>{`
        @keyframes orbFloat1{0%,100%{transform:translate(-50%,-50%) scale(1)}50%{transform:translate(-50%,-50%) scale(1.1) translate(20px,-15px)}}
        @keyframes orbFloat2{0%,100%{transform:translate(-50%,-50%) scale(1)}50%{transform:translate(-50%,-50%) scale(1.08) translate(-18px,22px)}}
        @keyframes orbFloat3{0%,100%{transform:translate(-50%,-50%) scale(1)}50%{transform:translate(-50%,-50%) scale(1.06) translate(15px,18px)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pillPulse{0%,100%{box-shadow:0 0 0 0 rgba(56,148,227,0)}50%{box-shadow:0 0 0 6px rgba(56,148,227,0)}}
        .agent-card{transition:transform 0.35s cubic-bezier(0.34,1.4,0.64,1),box-shadow 0.3s ease}
        .agent-card:hover{transform:translateY(-4px) scale(1.005)}
      `}</style>

      <div style={{ minHeight:"100vh", background:"#060A18", position:"relative", overflow:"hidden" }}>

        {/* Ambient orbs */}
        <div style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:0}}>
          {[
            {l:"12%",t:"18%",r:500,c:"rgba(56,148,227,0.07)",a:"orbFloat1",d:"16s"},
            {l:"88%",t:"10%",r:380,c:"rgba(245,158,11,0.06)",a:"orbFloat2",d:"20s"},
            {l:"55%",t:"78%",r:440,c:"rgba(168,85,247,0.05)",a:"orbFloat3",d:"18s"},
          ].map((o,i)=>(
            <div key={i} style={{
              position:"absolute",left:o.l,top:o.t,
              width:o.r*2,height:o.r*2,borderRadius:"50%",
              background:`radial-gradient(circle,${o.c} 0%,transparent 70%)`,
              transform:"translate(-50%,-50%)",
              animation:`${o.a} ${o.d} ease-in-out infinite`,
            }}/>
          ))}
        </div>

        {/* Hero */}
        <div style={{position:"relative",zIndex:1,textAlign:"center",padding:"88px 24px 56px"}}>
          {/* Pill */}
          <div style={{
            display:"inline-flex",alignItems:"center",gap:8,
            background:"rgba(56,148,227,0.1)",border:"1px solid rgba(56,148,227,0.2)",
            borderRadius:100,padding:"5px 14px",marginBottom:22,
          }}>
            <div style={{width:5,height:5,borderRadius:"50%",background:"#3894E3",boxShadow:"0 0 6px #3894E3"}}/>
            <span style={{fontSize:10,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:"#3894E3"}}>
              AI-Powered
            </span>
          </div>

          <h1 style={{
            fontFamily:"var(--font-display,inherit)",fontWeight:900,
            fontSize:"clamp(44px,7vw,80px)",lineHeight:1.0,letterSpacing:"-0.03em",
            color:"#fff",margin:"0 0 18px",
            animation:"fadeUp 0.6s ease both",
          }}>
            Expert{" "}
            <span style={{color:"rgba(255,255,255,0.45)"}}>Agents</span>
          </h1>

          <p style={{
            fontSize:17,lineHeight:1.65,color:"rgba(255,255,255,0.4)",
            maxWidth:480,margin:"0 auto",
            animation:"fadeUp 0.6s 0.12s ease both",opacity:0,animationFillMode:"forwards",
          }}>
            Specialised AI agents that plan, book and manage your entire ski trip — tailored to your style.
          </p>
        </div>

        {/* Cards — 2 columns */}
        <div style={{
          position:"relative",zIndex:1,
          maxWidth:1100,margin:"0 auto",
          padding:"0 24px 100px",
          display:"grid",
          gridTemplateColumns:"repeat(2, 1fr)",
          gap:16,
        }}>
          {agents.map((agent, idx) => {
            const hovered = hoveredKey === agent.key;
            return (
              <div
                key={agent.key}
                className="agent-card"
                onClick={() => openChat(agent)}
                onMouseEnter={() => setHoveredKey(agent.key)}
                onMouseLeave={() => setHoveredKey(null)}
                style={{
                  position:"relative",
                  borderRadius:18,
                  overflow:"hidden",
                  cursor:"pointer",
                  display:"flex",
                  minHeight:200,
                  background:"rgba(10,14,30,0.9)",
                  border: hovered
                    ? `1px solid ${agent.accent}50`
                    : "1px solid rgba(255,255,255,0.06)",
                  boxShadow: hovered
                    ? `0 0 0 1px ${agent.accent}30, 0 0 50px ${agent.glow}, 0 20px 60px rgba(0,0,0,0.5)`
                    : "0 4px 24px rgba(0,0,0,0.3)",
                  backdropFilter:"blur(16px)",
                  animation:`fadeUp 0.5s ${0.06 * idx}s ease both`,
                  opacity:0,animationFillMode:"forwards",
                }}
              >
                {/* Left: text content */}
                <div style={{
                  flex:1,
                  padding:"28px 28px 24px",
                  display:"flex",flexDirection:"column",
                  position:"relative",zIndex:1,
                  minWidth:0,
                }}>
                  {/* Accent gradient behind text */}
                  <div style={{
                    position:"absolute",inset:0,
                    background:`radial-gradient(ellipse at 0% 0%, ${agent.gradFrom} 0%, transparent 65%)`,
                    opacity: hovered ? 1 : 0.7,
                    transition:"opacity 0.3s ease",
                    pointerEvents:"none",
                    borderRadius:18,
                  }}/>

                  {/* Top row: icon + badge */}
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18,position:"relative"}}>
                    {/* Icon box */}
                    <div style={{
                      width:42,height:42,borderRadius:11,
                      background:agent.iconBg,
                      border:`1px solid ${agent.accent}25`,
                      display:"flex",alignItems:"center",justifyContent:"center",
                      transition:"box-shadow 0.3s ease",
                      boxShadow: hovered ? `0 0 16px ${agent.glow}` : "none",
                    }}>
                      <agent.icon style={{width:20,height:20,color:agent.accent}}/>
                    </div>

  
                  </div>

                  {/* Name */}
                  <h3 style={{
                    fontSize:18,fontWeight:800,color:"#fff",
                    margin:"0 0 5px",letterSpacing:"-0.02em",lineHeight:1.2,
                    position:"relative",
                  }}>
                    {agent.name}
                  </h3>

                  {/* Tagline */}
                  <p style={{
                    fontSize:12.5,fontWeight:600,color:agent.accent,
                    margin:"0 0 10px",opacity:0.9,position:"relative",
                  }}>
                    {agent.tagline}
                  </p>

                  {/* Description */}
                  <p style={{
                    fontSize:13,lineHeight:1.6,color:"rgba(255,255,255,0.4)",
                    margin:"0",flex:1,position:"relative",
                  }}>
                    {agent.desc}
                  </p>

                  {/* CTA */}
                  <button
                    onClick={e=>{e.stopPropagation();openChat(agent);}}
                    style={{
                      marginTop:20,
                      display:"flex",alignItems:"center",gap:6,
                      fontSize:12.5,fontWeight:700,color:agent.accent,
                      background:"none",border:"none",padding:0,cursor:"pointer",
                      position:"relative",
                      transition:"gap 0.2s ease",
                    }}
                  >
                    <agent.icon style={{width:13,height:13}}/>
                    {t("start_planning")} →
                  </button>
                </div>

                {/* Right: photo placeholder — darkened */}
                <div style={{
                  width:"38%",flexShrink:0,
                  position:"relative",overflow:"hidden",
                }}>
                  {/* Image — empty for Base44 to fill */}
                  {agent.image ? (
                    <img
                      src={agent.image}
                      alt={agent.name}
                      style={{
                        position:"absolute",inset:0,
                        width:"100%",height:"100%",
                        objectFit:"cover",
                        filter:"brightness(0.45) saturate(0.8)",
                        transition:"filter 0.3s ease, transform 0.4s ease",
                        transform: hovered ? "scale(1.05)" : "scale(1)",
                      }}
                    />
                  ) : (
                    /* Placeholder — tinted with agent colour */
                    <div style={{
                      position:"absolute",inset:0,
                      background:`linear-gradient(135deg, ${agent.iconBg} 0%, rgba(6,10,24,0.6) 100%)`,
                      display:"flex",alignItems:"center",justifyContent:"center",
                      flexDirection:"column",gap:10,
                    }}>
                      <div style={{
                        width:48,height:48,borderRadius:14,
                        background:`${agent.accent}18`,
                        border:`1px dashed ${agent.accent}35`,
                        display:"flex",alignItems:"center",justifyContent:"center",
                      }}>
                        <agent.icon style={{width:22,height:22,color:agent.accent,opacity:0.5}}/>
                      </div>
                      <span style={{fontSize:10,color:`${agent.accent}60`,fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase"}}>
                        Add photo
                      </span>
                    </div>
                  )}

                  {/* Dark gradient overlay on left edge so text blends in */}
                  <div style={{
                    position:"absolute",inset:0,
                    background:"linear-gradient(to right, rgba(10,14,30,0.95) 0%, rgba(10,14,30,0.3) 35%, rgba(10,14,30,0) 100%)",
                    pointerEvents:"none",
                  }}/>

                  {/* Accent tint overlay */}
                  <div style={{
                    position:"absolute",inset:0,
                    background:`linear-gradient(to bottom left, ${agent.accent}12 0%, transparent 60%)`,
                    opacity: hovered ? 1 : 0.5,
                    transition:"opacity 0.3s ease",
                    pointerEvents:"none",
                  }}/>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom fade */}
        <div style={{
          position:"absolute",bottom:0,left:0,right:0,height:100,
          background:"linear-gradient(to top,#060A18,transparent)",
          pointerEvents:"none",
        }}/>
      </div>

      {activeAgent && (
        <AgentChat agent={activeAgent} isOpen={chatOpen} onClose={()=>setChatOpen(false)}/>
      )}
    </>
  );
}