import { useState, useEffect, useRef } from "react";
import { X, ChevronRight, Send, Edit2, CheckCircle2, RefreshCw } from "lucide-react";
import { resorts } from "@/lib/data";
import { base44 } from "@/api/base44Client";
import { useAppAuth } from "../../context/AppAuthContext";
import AgentOptionsPanel from "./AgentOptionsPanel";
import AgentQuestionCard from "./AgentQuestionCard";

// ─── Resort context for AI ─────────────────────────────────────────────────
function buildResortContext() {
  return resorts
    .map(
      (r) =>
        `ID:${r.id} | ${r.name} (${r.country}) | ${r.pisteKm || "?"}km | ` +
        `Blue:${r.difficultyBlue || 0}% Red:${r.difficultyRed || 0}% Black:${r.difficultyBlack || 0}% | ` +
        `Rating:${r.rating || "?"} | From €${r.priceFrom || "?"}/day | Types:${(r.resortTypes || []).join(",")}`
    )
    .join("\n");
}

// ─── Question sequences ────────────────────────────────────────────────────
const AGENT_QUESTIONS = {
  "family": [
    {
      key: "children_ages",
      question: "How many children are coming, and what are their ages?",
      options: ["Under 3 only", "Mix of under 3 and older", "Ages 3 to 8", "Ages 8 to 14", "Teenagers (14+)", "No children — adults only"],
    },
    {
      key: "children_skill",
      question: "What is the children's skiing experience?",
      options: ["Complete first-timers", "Had 1-2 lessons before", "Can ski easy blue runs", "Can ski reds independently", "Mixed levels in the group"],
    },
    {
      key: "accommodation",
      question: "What type of accommodation works best for your family?",
      options: ["Ski-in ski-out hotel (most convenient)", "Hotel near slopes with shuttle", "Self-catered apartment", "Luxury hotel with kids club", "Flexible — show me options"],
    },
    {
      key: "budget",
      question: "What is your approximate total budget for the group?",
      options: ["Under €3,000", "€3,000–€6,000", "€6,000–€10,000", "Over €10,000", "Prefer not to say"],
    },
    {
      key: "travel_dates",
      question: "When are you thinking of travelling?",
      options: ["December (early season)", "January (quiet and affordable)", "February (school holidays)", "March (best snow, longer days)", "April (late season deals)", "Flexible on dates"],
    },
  ],
  "luxury": [
    {
      key: "experience_type",
      question: "What kind of luxury skiing experience are you after?",
      options: ["Five-star hotel with Michelin dining", "Private chalet with chef", "Premium resort — quality over exclusivity", "Heli-skiing and off-piste adventure", "Whatever is the absolute best"],
    },
    {
      key: "resorts",
      question: "Which resorts are on your radar?",
      options: ["Courchevel", "Verbier", "Zermatt", "St Moritz", "Val d'Isère", "Surprise me with the best"],
    },
    {
      key: "priorities",
      question: "What matters most beyond the skiing?",
      options: ["World-class spa and wellness", "Michelin-starred restaurants", "Vibrant après-ski", "Private instruction and guides", "Exclusive access and privacy", "All of the above"],
    },
    {
      key: "budget",
      question: "What is your investment range for this trip?",
      options: ["€10,000–€25,000", "€25,000–€50,000", "€50,000+", "Prefer to discuss after seeing options"],
    },
  ],
  "budget": [
    {
      key: "date_flexibility",
      question: "How flexible are your travel dates?",
      options: ["Very flexible — I want the cheapest possible dates", "Somewhat flexible — 2-3 week window", "Fixed dates I cannot change", "January specifically (cheapest month)"],
    },
    {
      key: "destination",
      question: "Where are you happy to ski?",
      options: ["Austria (best value overall)", "France (bigger areas)", "Italy (great food, good value)", "Switzerland (if budget allows)", "Wherever is cheapest"],
    },
    {
      key: "budget",
      question: "What is your total budget for the whole group?",
      options: ["Under €1,500", "€1,500–€3,000", "€3,000–€5,000", "€5,000–€8,000"],
    },
    {
      key: "accommodation",
      question: "What accommodation are you comfortable with?",
      options: ["Self-catered apartment (cheapest)", "Budget hotel", "Hostel or shared", "Best value for money — any type"],
    },
  ],
  "advanced": [
    {
      key: "terrain",
      question: "What terrain are you chasing?",
      options: ["Steep groomed blacks and moguls", "Lift-accessed off-piste powder", "Guided backcountry touring", "Freeride competition zones", "Glacier high-altitude runs", "All of the above"],
    },
    {
      key: "offpiste_experience",
      question: "What is your off-piste experience?",
      options: ["Never skied off-piste", "A few times with a guide", "Regular off-piste skier", "Experienced — ski tours and serious terrain", "Expert — I guide others"],
    },
    {
      key: "guide",
      question: "Do you need a guide?",
      options: ["Yes — book me a private mountain guide", "Group guiding is fine", "I am experienced enough to go independently", "Unsure — recommend what suits my level"],
    },
    {
      key: "resorts",
      question: "Which resorts interest you?",
      options: ["La Grave (most extreme)", "Chamonix (world-class alpinism)", "Verbier (off-piste + luxury)", "Val d'Isère (best all-round expert)", "Surprise me with a hidden gem"],
    },
  ],
  "beginner": [
    {
      key: "first_time",
      question: "Is this your very first time on skis or snowboard?",
      options: ["Absolute first timer — never been on snow", "Had 1-2 lessons a while ago", "Can get down easy slopes but want to improve", "Skiing for a friend/partner who is a beginner"],
    },
    {
      key: "discipline",
      question: "Skiing or snowboarding?",
      options: ["Skiing", "Snowboarding", "Not sure yet — what do you recommend?", "One of each (mixed group)"],
    },
    {
      key: "priorities",
      question: "What matters most for your first trip?",
      options: ["A resort where I won't feel intimidated", "The best ski school reputation", "Being close to the slopes from my accommodation", "Good nightlife even if I'm not skiing all day", "Value for money"],
    },
    {
      key: "duration",
      question: "How many days do you have?",
      options: ["3 days (weekend)", "4-5 days", "7 days", "More than a week"],
    },
  ],
  "explorer": [
    {
      key: "escape_from",
      question: "What are you trying to get away from?",
      options: ["Crowds and lift queues", "Generic resorts everyone goes to", "Overpriced well-known destinations", "All of the above — I want something truly different"],
    },
    {
      key: "logistics",
      question: "How adventurous are you with logistics?",
      options: ["Happy with complex transfers for the right destination", "Prefer easy access but open to unusual places", "Need good transport links", "Completely open — best place wins"],
    },
    {
      key: "hidden_gem_type",
      question: "What kind of hidden gem appeals to you?",
      options: ["A tiny village that gets 10m of snow (Warth, Damüls)", "Extreme freeride with no crowds (La Grave, Alagna)", "Authentic local culture, no tourists", "Emerging destination before it gets discovered", "A resort with a unique non-skiing attraction"],
    },
    {
      key: "skill_level",
      question: "What is your skiing level?",
      options: ["Beginner or progressing", "Intermediate", "Advanced", "Expert", "Mixed group"],
    },
  ],
};

// ─── Sub-components ────────────────────────────────────────────────────────
function TypingIndicator({ agent }) {
  return (
    <div className="flex items-start gap-3">
      <div className={`w-8 h-8 rounded-xl ${agent.bg} flex items-center justify-center flex-shrink-0`}>
        <agent.icon className={`h-4 w-4 ${agent.color}`} />
      </div>
      <div className="bg-peak-surface border border-white/5 rounded-2xl rounded-tl-sm px-4 py-3">
        <div className="flex items-center gap-1.5">
          {[0, 150, 300].map((delay, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-peak-text-secondary animate-bounce" style={{ animationDelay: `${delay}ms` }} />
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

// ─── Answer Summary Card ───────────────────────────────────────────────────
function AnswerSummaryCard({ answers, questionCards, agent, onEdit, onConfirm, loading }) {
  const pairs = questionCards
    .filter((q) => answers[q.key])
    .map((q) => ({ label: q.question, value: answers[q.key] }));
  return (
    <div className="w-full rounded-2xl bg-peak-surface border border-white/8 overflow-hidden">
      <div className="px-5 py-4 border-b border-white/5 flex items-center gap-3">
        <CheckCircle2 className={`h-5 w-5 ${agent.color} flex-shrink-0`} />
        <div>
          <p className="text-peak-text font-semibold text-sm">Here's what I know about you</p>
          <p className="text-peak-text-secondary text-xs">Review before I find your options</p>
        </div>
      </div>
      <div className="px-5 py-3 space-y-2.5">
        {pairs.map(({ label, value }, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="text-peak-text-secondary text-xs leading-relaxed flex-1">{label}</span>
            <span className="text-peak-text text-xs font-medium text-right flex-shrink-0 max-w-[55%]">{value}</span>
          </div>
        ))}
      </div>
      <div className="px-5 py-4 border-t border-white/5 flex gap-3">
        <button onClick={onEdit} disabled={loading}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-peak-text-secondary hover:text-peak-text hover:border-white/20 text-sm transition-colors flex-1 justify-center">
          <Edit2 className="h-3.5 w-3.5" />Edit answers
        </button>
        <button onClick={onConfirm} disabled={loading}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold transition-colors flex-1 justify-center ${loading ? "bg-peak-red/50 cursor-not-allowed" : "bg-peak-red hover:bg-peak-red-hover"}`}>
          {loading
            ? <><RefreshCw className="h-3.5 w-3.5 animate-spin" />Finding options…</>
            : <><ChevronRight className="h-3.5 w-3.5" />Find my options</>}
        </button>
      </div>
    </div>
  );
}

// ─── Follow-up chips ───────────────────────────────────────────────────────
function FollowUpChips({ onSend, disabled }) {
  const chips = [
    "Show me more budget-friendly options",
    "Can you suggest different dates?",
    "I'd prefer a different country",
    "Tell me more about the top pick",
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

function now() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// ─── Main component ────────────────────────────────────────────────────────
export default function AgentChat({ agent, isOpen, onClose }) {
  const { user } = useAppAuth();

  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  // Phase: "questions" | "summary" | "chat"
  const [phase, setPhase] = useState("questions");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [collectedAnswers, setCollectedAnswers] = useState({});
  const [showQuestionCard, setShowQuestionCard] = useState(false);

  const scrollRef = useRef(null);
  const textareaRef = useRef(null);

  const userInitials = user ? (user.firstName?.[0] || user.full_name?.[0] || "G") : "G";
  const questionCards = agent ? (AGENT_QUESTIONS[agent.key] || []) : [];
  const totalQuestions = questionCards.length;

  // Reset on open
  useEffect(() => {
    if (isOpen && agent) {
      setVisible(true);
      setMessages([{ role: "assistant", content: agent.introMessage, time: now() }]);
      setHistory([]);
      setPlan(null);
      setError(null);
      setInput("");
      setPhase("questions");
      setCurrentQuestionIndex(0);
      setCollectedAnswers({});
      setConfirmLoading(false);
      setShowQuestionCard(false);
      if (AGENT_QUESTIONS[agent.key]?.length) {
        setTimeout(() => setShowQuestionCard(true), 400);
      }
    } else {
      setTimeout(() => setVisible(false), 400);
    }
  }, [isOpen, agent]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing, showQuestionCard, currentQuestionIndex]);

  function handleTextareaInput(e) {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  }

  function handleStartOver() {
    setMessages([{ role: "assistant", content: agent.introMessage, time: now() }]);
    setHistory([]);
    setPlan(null);
    setError(null);
    setInput("");
    setPhase("questions");
    setCurrentQuestionIndex(0);
    setCollectedAnswers({});
    setConfirmLoading(false);
    setShowQuestionCard(false);
    if (AGENT_QUESTIONS[agent.key]?.length) {
      setTimeout(() => setShowQuestionCard(true), 400);
    }
  }

  // Called when user selects a card option or submits custom text
  function handleQuestionAnswer(answer) {
    const q = questionCards[currentQuestionIndex];
    const newAnswers = { ...collectedAnswers, [q.key]: answer };
    setCollectedAnswers(newAnswers);

    // Add user message bubble
    setMessages(prev => [...prev, { role: "user", content: answer, time: now() }]);

    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex >= totalQuestions) {
      // All questions answered — show summary card
      setShowQuestionCard(false);
      setTimeout(() => setPhase("summary"), 350);
    } else {
      // Show next question card
      setShowQuestionCard(false);
      setCurrentQuestionIndex(nextIndex);
      setTimeout(() => setShowQuestionCard(true), 400);
    }
  }

  function handleQuestionSkip() {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex >= totalQuestions) {
      setShowQuestionCard(false);
      setTimeout(() => setPhase("summary"), 350);
    } else {
      setShowQuestionCard(false);
      setCurrentQuestionIndex(nextIndex);
      setTimeout(() => setShowQuestionCard(true), 350);
    }
  }

  function handleEditAnswers() {
    setPhase("questions");
    setCurrentQuestionIndex(0);
    setShowQuestionCard(false);
    setTimeout(() => setShowQuestionCard(true), 200);
  }

  function handleConfirmAnswers() {
    setConfirmLoading(true);
    setTimeout(() => sendCollectedAnswers(collectedAnswers), 300);
  }

  async function sendCollectedAnswers(answers) {
    const keys = Object.keys(answers);
    if (keys.length === 0) {
      setPhase("chat");
      return;
    }
    const summary = keys.map(k => `${k}: ${answers[k]}`).join("\n");
    const profileMessage = `User profile:\n${summary}`;
    const newHistory = [{ role: "user", content: profileMessage }];
    setHistory(newHistory);
    setTyping(true);

    try {
      const resortCtx = buildResortContext();
      const promptText = `${agent.systemPrompt}\n\nAVAILABLE RESORTS IN PEAKXP DATABASE (use exact IDs as primaryResortId):\n${resortCtx}\n\nUser profile summary:\n${profileMessage}\n\nGenerate personalised options using ONLY resorts from the database. Match user needs using resort data (difficulty, types, price, rating). Assistant:`;
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: promptText,
        model: "claude_sonnet_4_6",
      });

      const rawContent = typeof response === "string" ? response : response?.text || response?.content || JSON.stringify(response);
      let displayContent = rawContent;
      let parsedPlan = null;

      if (rawContent.includes("[PLAN_READY]")) {
        const jsonMatch = rawContent.match(/```json\n?([\s\S]*?)\n?```/);
        if (jsonMatch) {
          try { parsedPlan = JSON.parse(jsonMatch[1]); } catch {}
        }
        displayContent = rawContent.replace("[PLAN_READY]", "").replace(/```json[\s\S]*?```/, "").trim();
      }

      setMessages(prev => [...prev, { role: "assistant", content: displayContent, time: now() }]);
      setHistory(prev => [...prev, { role: "assistant", content: displayContent }]);
      setTyping(false);
      if (parsedPlan) setPlan(parsedPlan);
    } catch {
      setTyping(false);
      setError("Something went wrong. Please try again.");
    }
  }

  async function sendMessage(text) {
    if (!text.trim() || typing) return;

    // If user types during question/summary phase, bypass to chat
    if (phase !== "chat") {
      setShowQuestionCard(false);
      setPhase("chat");
    }

    const userMsg = { role: "user", content: text.trim(), time: now() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setError(null);
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    const newHistory = [...history, { role: "user", content: text.trim() }];
    setHistory(newHistory);
    setTyping(true);

    try {
      const promptText = `${agent.systemPrompt}\n\nConversation so far:\n${newHistory.map(m => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`).join("\n")}\n\nAssistant:`;
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: promptText,
        model: "claude_sonnet_4_6",
      });

      const rawContent = typeof response === "string" ? response : response?.text || response?.content || JSON.stringify(response);
      let displayContent = rawContent;
      let parsedPlan = null;

      if (rawContent.includes("[PLAN_READY]")) {
        const jsonMatch = rawContent.match(/```json\n?([\s\S]*?)\n?```/);
        if (jsonMatch) {
          try { parsedPlan = JSON.parse(jsonMatch[1]); } catch {}
        }
        displayContent = rawContent.replace("[PLAN_READY]", "").replace(/```json[\s\S]*?```/, "").trim();
      }

      setMessages(prev => [...prev, { role: "assistant", content: displayContent, time: now() }]);
      setHistory(prev => [...prev, { role: "assistant", content: displayContent }]);
      setTyping(false);
      if (parsedPlan) setPlan(parsedPlan);
    } catch {
      setTyping(false);
      setError("Something went wrong. Please try again.");
    }
  }

  if (!visible || !agent) return null;

  const panelClass = isOpen
    ? "translate-x-0 translate-y-0"
    : "translate-x-full translate-y-full sm:translate-y-0";

  const currentQuestion = questionCards[currentQuestionIndex];

  return (
    <>
      <div
        className={`fixed inset-0 bg-peak-bg/70 backdrop-blur-md z-50 transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />
      <div className={`fixed right-0 top-0 bottom-0 w-full max-w-2xl bg-peak-bg border-l border-white/5 flex flex-col z-50 shadow-2xl transition-transform duration-[350ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${panelClass} sm:rounded-none max-sm:top-auto max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:w-full max-sm:max-w-none max-sm:h-[92vh] max-sm:rounded-t-3xl`}>

        {/* Header */}
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

        {/* Messages + Question Card */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
          {messages.map((msg, i) => (
            <div key={i}>
              <MessageBubble msg={msg} agent={agent} userInitials={userInitials} />
              {msg.role === "assistant" && plan && i === messages.length - 1 && (
                <AgentOptionsPanel
                  options={plan.options || []}
                  agentKey={agent.key}
                  agentName={agent.name}
                  onClose={onClose}
                  onStartOver={handleStartOver}
                />
              )}
            </div>
          ))}

          {/* Question card phase */}
          {phase === "questions" && showQuestionCard && currentQuestion && !typing && !plan && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <AgentQuestionCard
                question={currentQuestion.question}
                options={currentQuestion.options}
                stepIndex={currentQuestionIndex + 1}
                totalSteps={totalQuestions}
                onSelect={handleQuestionAnswer}
                onSkip={handleQuestionSkip}
                onCustom={handleQuestionAnswer}
                allowMultiple={currentQuestion.allowMultiple || false}
                agentColor={agent.color}
                agentBg={agent.bg}
              />
            </div>
          )}

          {/* Summary card phase */}
          {phase === "summary" && !typing && !plan && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <AnswerSummaryCard
                answers={collectedAnswers}
                questionCards={questionCards}
                agent={agent}
                onEdit={handleEditAnswers}
                onConfirm={handleConfirmAnswers}
                loading={confirmLoading}
              />
            </div>
          )}

          {/* Follow-up chips after plan is shown */}
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

        {/* Input */}
        <div className="flex-shrink-0 px-6 py-4 border-t border-white/5">
          <div className="flex items-end gap-3 bg-peak-surface border border-white/10 rounded-2xl px-4 py-3 focus-within:border-white/20 transition-colors">
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={handleTextareaInput}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
              placeholder={phase !== "chat" && showQuestionCard ? "Or reply directly..." : `Message ${agent.name}...`}
              className="flex-1 bg-transparent text-peak-text text-sm outline-none resize-none leading-relaxed placeholder:text-peak-text-secondary/40"
              style={{ maxHeight: 120 }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || typing}
              className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${input.trim() && !typing ? "bg-peak-red hover:bg-peak-red-hover" : "bg-peak-surface text-peak-text-secondary"} cursor-pointer`}
            >
              <Send className={`h-4 w-4 ${input.trim() && !typing ? "text-white" : ""}`} />
            </button>
          </div>
          <p className="text-peak-text-secondary text-xs text-center mt-2">Powered by PeakXP AI · Your data is private</p>
        </div>
      </div>
    </>
  );
}