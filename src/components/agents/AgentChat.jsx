import { useState, useEffect, useRef } from "react";
import { useT } from "../../lib/i18n";
import { X, ChevronRight, Send, Edit2, CheckCircle2, RefreshCw } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useAppAuth } from "../../context/AppAuthContext";
import AgentOptionsPanel from "./AgentOptionsPanel";
import AgentQuestionCard from "./AgentQuestionCard";
import AgentServicesCard from "./AgentServicesCard";
import { resorts } from "@/lib/data";

function buildResortContext() {
  return resorts
    .map(
      (r) =>
        "ID:" + r.id + " | " + r.name + " (" + r.country + ") | " + (r.pisteKm || "?") + "km | " +
        "Blue:" + (r.difficultyBlue || 0) + "% Red:" + (r.difficultyRed || 0) + "% Black:" + (r.difficultyBlack || 0) + "% | " +
        "Rating:" + (r.rating || "?") + " | From EUR" + (r.priceFrom || "?") + "/day | Types:" + (r.resortTypes || []).join(",")
    )
    .join("\n");
}

const AGENT_QUESTIONS = {
  family: [
    {
      key: "group_composition",
      question: "Who is coming on this family trip?",
      options: [
        "2 adults + toddlers or under-8s",
        "2 adults + children aged 8 to 14",
        "2 adults + teenagers (14+)",
        "Multi-generational — grandparents joining too",
      ],
    },
    {
      key: "children_skill",
      question: "What is the kids experience on snow?",
      options: [
        "Complete first-timers — never worn skis",
        "Had a lesson or two before",
        "Can ski easy blue runs confidently",
        "Mixed levels — some stronger than others",
      ],
    },
    {
      key: "accommodation_priority",
      question: "What matters most for accommodation?",
      options: [
        "Ski-in ski-out — kids should not have to walk far",
        "Hotel with a kids club so parents can ski freely",
        "Self-catered apartment — more space and flexibility",
        "Best value — keeping costs down matters most",
      ],
    },
    {
      key: "budget",
      question: "What is your approximate total budget for the group?",
      options: [
        "Under 3,000 EUR",
        "3,000 to 6,000 EUR",
        "6,000 to 10,000 EUR",
        "Over 10,000 EUR — quality is the priority",
      ],
    },
    {
      key: "travel_dates",
      question: "When are you planning to travel?",
      options: [
        "December — early season, quieter slopes",
        "January — best value, less crowded",
        "February — school holidays, buzzing atmosphere",
        "March — great snow and longer days",
      ],
    },
  ],
  luxury: [
    {
      key: "experience_type",
      question: "What kind of luxury experience are you looking for?",
      options: [
        "Five-star hotel with Michelin-starred dining",
        "Private ski-in ski-out chalet with a personal chef",
        "Heli-skiing and exclusive off-piste experiences",
        "The absolute best — money is no object",
      ],
    },
    {
      key: "resort_preference",
      question: "Any resorts already on your radar?",
      options: [
        "Courchevel or Meribel (Les Trois Vallees)",
        "Verbier or Zermatt (Swiss Alps)",
        "Val d Isere or Megeve (French icons)",
        "Surprise me — curate the very best option",
      ],
    },
    {
      key: "non_ski_priority",
      question: "Beyond skiing, what is non-negotiable?",
      options: [
        "World-class spa and wellness",
        "Exclusive apres-ski and vibrant nightlife",
        "Private mountain guide and instruction",
        "Total privacy — I prefer to avoid crowds",
      ],
    },
    {
      key: "budget",
      question: "What is your investment range for this trip?",
      options: [
        "10,000 to 25,000 EUR",
        "25,000 to 50,000 EUR",
        "50,000 EUR or more",
        "Open — show me the best first, budget is secondary",
      ],
    },
  ],
  budget: [
    {
      key: "group",
      question: "Who is travelling with you?",
      options: [
        "Solo — just me",
        "Couple",
        "Group of friends, 3 to 6 people",
        "Larger group — 7 or more",
      ],
    },
    {
      key: "date_flexibility",
      question: "How flexible are your travel dates?",
      options: [
        "Very flexible — I want the cheapest possible dates",
        "January specifically — cheapest month in the Alps",
        "Some flexibility — roughly a 2 to 3 week window",
        "Fixed dates I cannot change",
      ],
    },
    {
      key: "destination",
      question: "Where are you happy to ski?",
      options: [
        "Austria — consistently best value in the Alps",
        "Italy — great food and excellent prices",
        "France — bigger ski areas worth the extra cost",
        "Wherever is cheapest — I just want to ski",
      ],
    },
    {
      key: "budget",
      question: "What is your total budget for the whole group?",
      options: [
        "Under 1,500 EUR",
        "1,500 to 3,000 EUR",
        "3,000 to 5,000 EUR",
        "5,000 to 8,000 EUR",
      ],
    },
  ],
  advanced: [
    {
      key: "terrain",
      question: "What terrain are you chasing?",
      options: [
        "Steep groomed blacks and mogul fields",
        "Lift-accessed off-piste and powder stashes",
        "Guided backcountry ski touring",
        "Freeride zones and high-altitude glaciers",
      ],
    },
    {
      key: "offpiste_experience",
      question: "What is your off-piste experience level?",
      options: [
        "Strong on-piste skier, ready to try off-piste",
        "A few off-piste runs with a guide before",
        "Regular off-piste skier, confident in most terrain",
        "Expert — I ski serious backcountry independently",
      ],
    },
    {
      key: "guide_preference",
      question: "Do you want a mountain guide?",
      options: [
        "Yes — book me a private IFMGA-certified guide",
        "Group guiding is fine",
        "I am experienced enough to go independently",
        "Recommend what best suits my level",
      ],
    },
    {
      key: "resort_vibe",
      question: "What kind of resort atmosphere suits you?",
      options: [
        "Raw and extreme — the mountain is everything",
        "Expert terrain plus great apres-ski",
        "A lesser-known gem with no lift queues",
        "Show me the best expert resort overall",
      ],
    },
  ],
  beginner: [
    {
      key: "experience",
      question: "What is your experience on snow?",
      options: [
        "Complete beginner — never worn skis or a snowboard",
        "Tried it once or twice, a while ago",
        "Can get down easy slopes but want proper coaching",
        "I am confident — planning this for a beginner in my group",
      ],
    },
    {
      key: "discipline",
      question: "Skiing or snowboarding?",
      options: [
        "Skiing",
        "Snowboarding",
        "Not sure — what would you recommend for a beginner?",
        "Mixed — different people in the group want each",
      ],
    },
    {
      key: "top_priority",
      question: "What matters most for this trip?",
      options: [
        "A relaxed resort where I will not feel intimidated",
        "The best ski school — I want to genuinely improve",
        "Slope-side accommodation so I am not exhausted walking",
        "A great social scene even when off the slopes",
      ],
    },
    {
      key: "duration",
      question: "How many days are you planning?",
      options: [
        "3 days — a short taster trip",
        "4 to 5 days — enough to really get going",
        "7 days — a full week",
        "More than a week",
      ],
    },
  ],
  explorer: [
    {
      key: "escape_from",
      question: "What are you trying to escape at your usual resort?",
      options: [
        "Lift queues and overcrowded pistes",
        "Overpriced and overhyped destinations",
        "Generic resort towns with no local character",
        "All of the above — I want something completely different",
      ],
    },
    {
      key: "hidden_gem_type",
      question: "What kind of hidden gem excites you most?",
      options: [
        "A tiny snow-sure village with massive snowfall (Warth, Damuls)",
        "Extreme freeride terrain with zero crowds (La Grave, Alagna)",
        "Authentic local culture with zero tourist traps",
        "An emerging destination before it gets discovered",
      ],
    },
    {
      key: "logistics_tolerance",
      question: "How adventurous are you with the journey there?",
      options: [
        "Happy with complex transfers for the right place",
        "Open to unusual places but prefer manageable travel",
        "Need decent transport links — no long detours",
        "Best destination wins — I will figure out the journey",
      ],
    },
    {
      key: "skill_level",
      question: "What is your skiing level?",
      options: [
        "Beginner or still progressing",
        "Intermediate — comfortable on reds",
        "Advanced — I ski blacks and off-piste",
        "Expert — I want serious or extreme terrain",
      ],
    },
  ],
};

function now() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function TypingIndicator({ agent }) {
  return (
    <div className="flex items-start gap-3">
      <div className={`w-8 h-8 rounded-xl ${agent.bg} flex items-center justify-center flex-shrink-0`}>
        <agent.icon className={`h-4 w-4 ${agent.color}`} />
      </div>
      <div className="bg-peak-surface border border-white/5 rounded-2xl rounded-tl-sm px-4 py-3">
        <div className="flex items-center gap-1.5">
          {[0, 150, 300].map((delay, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-peak-text-secondary animate-bounce"
              style={{ animationDelay: `${delay}ms` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ msg, agent, userInitials }) {
  const isAgent = msg.role === "assistant";
  return (
    <div className={`flex items-start gap-3 ${isAgent ? "" : "flex-row-reverse"}`}>
      {isAgent ? (
        <div className={`w-8 h-8 rounded-xl ${agent.bg} flex items-center justify-center flex-shrink-0`}>
          <agent.icon className={`h-4 w-4 ${agent.color}`} />
        </div>
      ) : (
        <div className="w-8 h-8 rounded-xl bg-peak-blue/20 flex-shrink-0 flex items-center justify-center text-peak-blue text-xs font-bold">
          {userInitials}
        </div>
      )}
      <div className={`max-w-[80%] ${isAgent
        ? "rounded-2xl rounded-tl-sm bg-peak-surface border border-white/5"
        : "rounded-2xl rounded-tr-sm bg-peak-red/10 border border-peak-red/20"
      } px-4 py-3`}>
        <p className="text-peak-text text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
        <p className="text-peak-text-secondary text-xs mt-1">{msg.time}</p>
      </div>
    </div>
  );
}

function AnswerSummaryCard({ intakeAnswers, servicesSelected, questionCards, agent, onEditQuestion, onEditServices, onConfirm, loading }) {
  const SERVICE_LABELS = {
    "ski-pass": "Ski pass", "accommodation": "Accommodation",
    "equipment": "Equipment rental", "ski-school": "Ski school",
    "childcare": "Childcare", "dining": "Dining",
    "flights": "Flights", "train": "Train",
    "car": "Car rental", "storage": "Storage", "activities": "Activities",
  };
  const intakePairs = questionCards
    .filter((q) => intakeAnswers[q.key])
    .map((q, idx) => ({ label: q.question, value: intakeAnswers[q.key], idx }));

  return (
    <div className="w-full rounded-2xl bg-peak-surface border border-white/8 overflow-hidden">
      <div className="px-5 py-4 border-b border-white/5 flex items-center gap-3">
        <CheckCircle2 className={`h-5 w-5 ${agent.color} flex-shrink-0`} />
        <div>
          <p className="text-peak-text font-semibold text-sm">Ready to search — here is your trip profile</p>
          <p className="text-peak-text-secondary text-xs">Tap any answer to change it</p>
        </div>
      </div>
      <div className="px-5 py-2 space-y-1">
        {intakePairs.map(({ label, value, idx }) => (
          <button key={idx} onClick={() => onEditQuestion(idx)} disabled={loading}
            className="w-full flex items-start gap-3 py-2 group text-left rounded-lg px-2 -mx-2 hover:bg-white/4 transition-colors">
            <span className="text-peak-text-secondary text-xs leading-relaxed flex-1">{label}</span>
            <span className="flex items-center gap-1.5 flex-shrink-0 max-w-[50%]">
              <span className="text-peak-text text-xs font-medium text-right">{value}</span>
              <Edit2 className="w-3 h-3 text-peak-text-secondary/0 group-hover:text-peak-text-secondary/60 transition-colors flex-shrink-0" />
            </span>
          </button>
        ))}
      </div>
      <div className="px-5 pb-3 pt-2 border-t border-white/5 mt-1">
        <button onClick={onEditServices} disabled={loading}
          className="w-full flex items-start gap-3 py-2 group text-left rounded-lg px-2 -mx-2 hover:bg-white/4 transition-colors">
          <span className="text-peak-text-secondary text-xs flex-1">Included services</span>
          <span className="flex items-center gap-1.5 flex-shrink-0 max-w-[55%]">
            <span className="text-peak-text text-xs font-medium text-right">
              {servicesSelected.map((k) => SERVICE_LABELS[k] || k).join(", ")}
            </span>
            <Edit2 className="w-3 h-3 text-peak-text-secondary/0 group-hover:text-peak-text-secondary/60 transition-colors flex-shrink-0" />
          </span>
        </button>
      </div>
      <div className="px-5 pb-5 pt-1">
        <button onClick={onConfirm} disabled={loading}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white text-sm font-semibold transition-colors ${loading ? "bg-peak-red/50 cursor-not-allowed" : "bg-peak-red hover:bg-peak-red-hover"}`}>
          {loading
            ? <><RefreshCw className="h-3.5 w-3.5 animate-spin" />Searching for your options...</>
            : <><ChevronRight className="h-3.5 w-3.5" />Find my personalised options</>}
        </button>
      </div>
    </div>
  );
}

function FollowUpChips({ onSend, disabled }) {
  const t = useT();
  const chips = [
    t("followup_budget"),
    t("followup_country"),
    t("followup_dates"),
    t("followup_top_pick"),
  ];
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {chips.map((chip) => (
        <button key={chip} onClick={() => onSend(chip)} disabled={disabled}
          className="px-3 py-1.5 rounded-full bg-peak-surface border border-white/8 text-peak-text-secondary text-xs hover:border-white/20 hover:text-peak-text transition-colors disabled:opacity-40">
          {chip}
        </button>
      ))}
    </div>
  );
}

export default function AgentChat({ agent, isOpen, onClose }) {
  const { user } = useAppAuth();
  const t = useT();
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [phase, setPhase] = useState("questions");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [intakeAnswers, setIntakeAnswers] = useState({});
  const [servicesSelected, setServicesSelected] = useState([]);
  const [showCard, setShowCard] = useState(false);
  const [editingFromSummary, setEditingFromSummary] = useState(false);
  const scrollRef = useRef(null);
  const textareaRef = useRef(null);
  const userInitials = user ? (user.firstName?.[0] || user.full_name?.[0] || "G") : "G";
  const questionCards = agent ? (AGENT_QUESTIONS[agent.key] || []) : [];
  const totalIntakeQ = questionCards.length;
  const totalSteps = totalIntakeQ + 1;

  function resetAll(ag) {
    setMessages([{ role: "assistant", content: ag.introMessage, time: now() }]);
    setHistory([]);
    setPlan(null);
    setError(null);
    setInput("");
    setPhase("questions");
    setQuestionIndex(0);
    setIntakeAnswers({});
    setServicesSelected([]);
    setConfirmLoading(false);
    setEditingFromSummary(false);
    setShowCard(false);
    const qCards = AGENT_QUESTIONS[ag.key] || [];
    if (qCards.length) setTimeout(() => setShowCard(true), 400);
  }

  useEffect(() => {
    if (isOpen && agent) { setVisible(true); resetAll(agent); }
    else setTimeout(() => setVisible(false), 400);
  }, [isOpen, agent]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing, showCard, questionIndex, phase]);

  function handleTextareaInput(e) {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  }

  function handleIntakeAnswer(answer) {
    const q = questionCards[questionIndex];
    const newAnswers = { ...intakeAnswers, [q.key]: answer };
    setIntakeAnswers(newAnswers);
    setMessages((prev) => [...prev, { role: "user", content: answer, time: now() }]);
    setShowCard(false);
    if (editingFromSummary) {
      setEditingFromSummary(false);
      setTimeout(() => setPhase("summary"), 350);
      return;
    }
    const nextIdx = questionIndex + 1;
    if (nextIdx >= totalIntakeQ) { setTimeout(() => setPhase("services"), 350); }
    else { setQuestionIndex(nextIdx); setTimeout(() => setShowCard(true), 350); }
  }

  function handleIntakeSkip() {
    setShowCard(false);
    if (editingFromSummary) {
      setEditingFromSummary(false);
      setTimeout(() => setPhase("summary"), 350);
      return;
    }
    const nextIdx = questionIndex + 1;
    if (nextIdx >= totalIntakeQ) { setTimeout(() => setPhase("services"), 350); }
    else { setQuestionIndex(nextIdx); setTimeout(() => setShowCard(true), 350); }
  }

  function handleServicesConfirm(allSelected) {
    setServicesSelected(allSelected);
    setTimeout(() => setPhase("summary"), 300);
  }

  function handleEditQuestion(idx) {
    setEditingFromSummary(true);
    setQuestionIndex(idx);
    setPhase("questions");
    setShowCard(false);
    setTimeout(() => setShowCard(true), 200);
  }

  function handleEditServices() { setPhase("services"); }

  async function handleConfirmAndSearch() {
    setConfirmLoading(true);
    setPhase("chat");
    const intakeSummary = Object.entries(intakeAnswers).map(([k, v]) => k + ": " + v).join("\n");
    const servicesSummary = "Selected services: " + servicesSelected.join(", ");
    const profileMessage = "User profile:\n" + intakeSummary + "\n" + servicesSummary;
    const newHistory = [{ role: "user", content: profileMessage }];
    setHistory(newHistory);
    setConfirmLoading(false);
    setTyping(true);
    try {
      const resortCtx = buildResortContext();
      const promptText = agent.systemPrompt + "\n\nAVAILABLE RESORTS IN PEAKXP DATABASE (use exact IDs as primaryResortId):\n" + resortCtx + "\n\nUser profile:\n" + profileMessage + "\n\nGenerate 3 to 4 personalised options using ONLY resorts from the list. Match user needs using resort data (difficulty, types, price, rating). Output [PLAN_READY] then a json block.\n\nAssistant:";
      const response = await base44.integrations.Core.InvokeLLM({ prompt: promptText, model: "claude_sonnet_4_6" });
      const rawContent = typeof response === "string" ? response : response?.text || response?.content || JSON.stringify(response);
      let displayContent = rawContent;
      let parsedPlan = null;
      if (rawContent.includes("[PLAN_READY]")) {
        const jsonMatch = rawContent.match(/```json\n?([\s\S]*?)\n?```/);
        if (jsonMatch) { try { parsedPlan = JSON.parse(jsonMatch[1]); } catch {} }
        displayContent = rawContent.replace("[PLAN_READY]", "").replace(/```json[\s\S]*?```/, "").trim();
      }
      setMessages((prev) => [...prev, { role: "assistant", content: displayContent, time: now() }]);
      setHistory((prev) => [...prev, { role: "assistant", content: displayContent }]);
      setTyping(false);
      if (parsedPlan) setPlan(parsedPlan);
    } catch {
      setTyping(false);
      setError("Something went wrong. Please try again.");
    }
  }

  async function sendMessage(text) {
    if (!text.trim() || typing) return;
    if (phase !== "chat") { setShowCard(false); setPhase("chat"); }
    const userMsg = { role: "user", content: text.trim(), time: now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setError(null);
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    const newHistory = [...history, { role: "user", content: text.trim() }];
    setHistory(newHistory);
    setTyping(true);
    try {
      const promptText = agent.systemPrompt + "\n\nConversation:\n" + newHistory.map((m) => (m.role === "user" ? "User" : "Assistant") + ": " + m.content).join("\n") + "\n\nAssistant:";
      const response = await base44.integrations.Core.InvokeLLM({ prompt: promptText, model: "claude_sonnet_4_6" });
      const rawContent = typeof response === "string" ? response : response?.text || response?.content || JSON.stringify(response);
      let displayContent = rawContent;
      let parsedPlan = null;
      if (rawContent.includes("[PLAN_READY]")) {
        const jsonMatch = rawContent.match(/```json\n?([\s\S]*?)\n?```/);
        if (jsonMatch) { try { parsedPlan = JSON.parse(jsonMatch[1]); } catch {} }
        displayContent = rawContent.replace("[PLAN_READY]", "").replace(/```json[\s\S]*?```/, "").trim();
      }
      setMessages((prev) => [...prev, { role: "assistant", content: displayContent, time: now() }]);
      setHistory((prev) => [...prev, { role: "assistant", content: displayContent }]);
      setTyping(false);
      if (parsedPlan) setPlan(parsedPlan);
    } catch {
      setTyping(false);
      setError("Something went wrong. Please try again.");
    }
  }

  if (!visible || !agent) return null;
  const panelClass = isOpen ? "translate-x-0 translate-y-0" : "translate-x-full translate-y-full sm:translate-y-0";
  const currentQuestion = questionCards[questionIndex];

  return (
    <>
      <div className={`fixed inset-0 bg-peak-bg/70 backdrop-blur-md z-50 transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={onClose} />
      <div className={`fixed right-0 top-0 bottom-0 w-full max-w-2xl bg-peak-bg border-l border-white/5 flex flex-col z-50 shadow-2xl transition-transform duration-[350ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${panelClass} sm:rounded-none max-sm:top-auto max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:w-full max-sm:max-w-none max-sm:h-[92vh] max-sm:rounded-t-3xl`}>
        <div className="flex-shrink-0 px-6 py-5 border-b border-white/5 flex items-center gap-4">
          <div className={`w-11 h-11 rounded-2xl ${agent.bg} flex items-center justify-center flex-shrink-0`}>
            <agent.icon className={`h-5 w-5 ${agent.color}`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display font-bold text-peak-text text-lg leading-tight">{agent.name}</p>
            <p className={`text-xs font-medium ${agent.color}`}>{agent.tagline}</p>
          </div>
          <div className="flex items-center gap-2">
            {[{ Icon: ChevronRight, label: "Minimise" }, { Icon: X, label: "Close" }].map(({ Icon, label }) => (
              <button key={label} onClick={onClose} aria-label={label}
                className="w-9 h-9 rounded-xl bg-peak-surface border border-white/5 flex items-center justify-center text-peak-text-secondary hover:text-peak-text hover:border-white/15 transition-colors cursor-pointer">
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>
        <div className="h-px flex-shrink-0" style={{ background: `linear-gradient(to right, transparent, ${agent.glowColor || "rgba(56,148,227,0.4)"}, transparent)` }} />

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
          {messages.map((msg, i) => (
            <div key={i}>
              <MessageBubble msg={msg} agent={agent} userInitials={userInitials} />
              {msg.role === "assistant" && plan && i === messages.length - 1 && (
                <AgentOptionsPanel options={plan.options || []} agentKey={agent.key} agentName={agent.name} onClose={onClose} onStartOver={() => resetAll(agent)} />
              )}
            </div>
          ))}

          {phase === "questions" && showCard && currentQuestion && !typing && !plan && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <AgentQuestionCard
                question={currentQuestion.question}
                options={currentQuestion.options}
                stepIndex={questionIndex + 1}
                totalSteps={totalSteps}
                onSelect={handleIntakeAnswer}
                onSkip={handleIntakeSkip}
                onCustom={handleIntakeAnswer}
                agentColor={agent.color}
                agentBg={agent.bg}
              />
            </div>
          )}

          {phase === "services" && !typing && !plan && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <AgentServicesCard agentKey={agent.key} onConfirm={handleServicesConfirm} />
            </div>
          )}

          {phase === "summary" && !typing && !plan && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <AnswerSummaryCard
                intakeAnswers={intakeAnswers}
                servicesSelected={servicesSelected}
                questionCards={questionCards}
                agent={agent}
                onEditQuestion={handleEditQuestion}
                onEditServices={handleEditServices}
                onConfirm={handleConfirmAndSearch}
                loading={confirmLoading}
              />
            </div>
          )}

          {phase === "chat" && plan && !typing && (
            <FollowUpChips onSend={sendMessage} disabled={typing} />
          )}

          {typing && <TypingIndicator agent={agent} />}
          {error && (
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-xl ${agent.bg} flex items-center justify-center flex-shrink-0`}>
                <agent.icon className={`h-4 w-4 ${agent.color}`} />
              </div>
              <div className="bg-peak-surface border border-peak-red/20 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                <p className="text-peak-text text-sm">{error}</p>
                <button onClick={() => setError(null)} className="text-peak-blue text-xs mt-1 hover:underline">Retry</button>
              </div>
            </div>
          )}
        </div>

        <div className="flex-shrink-0 px-6 py-4 border-t border-white/5">
          <div className="flex items-end gap-3 bg-peak-surface border border-white/10 rounded-2xl px-4 py-3 focus-within:border-white/20 transition-colors">
            <textarea ref={textareaRef} rows={1} value={input} onChange={handleTextareaInput}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
              placeholder={phase !== "chat" ? t("or_reply_directly") : t("message_agent") + " " + agent.name + "..."}
              className="flex-1 bg-transparent text-peak-text text-sm outline-none resize-none leading-relaxed placeholder:text-peak-text-secondary/40"
              style={{ maxHeight: 120 }} />
            <button onClick={() => sendMessage(input)} disabled={!input.trim() || typing}
              className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${input.trim() && !typing ? "bg-peak-red hover:bg-peak-red-hover" : "bg-peak-surface text-peak-text-secondary"} cursor-pointer`}>
              <Send className={`h-4 w-4 ${input.trim() && !typing ? "text-white" : ""}`} />
            </button>
          </div>
          <p className="text-peak-text-secondary text-xs text-center mt-2">Powered by PeakXP AI · Your data is private</p>
        </div>
      </div>
    </>
  );
}