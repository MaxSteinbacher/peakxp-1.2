function getQuestionCards(t) {
  return {
  family: [
    { key: "group_composition", question: t("agent_q_family_1"), options: [t("agent_q_family_1_a"), t("agent_q_family_1_b"), t("agent_q_family_1_c"), t("agent_q_family_1_d")] },
    { key: "children_skill",    question: t("agent_q_family_2"), options: [t("agent_q_family_2_a"), t("agent_q_family_2_b"), t("agent_q_family_2_c"), t("agent_q_family_2_d")] },
    { key: "accommodation_priority", question: t("agent_q_family_3"), options: [t("agent_q_family_3_a"), t("agent_q_family_3_b"), t("agent_q_family_3_c"), t("agent_q_family_3_d")] },
    { key: "budget",            question: t("agent_q_family_4"), options: [t("agent_q_family_4_a"), t("agent_q_family_4_b"), t("agent_q_family_4_c"), t("agent_q_family_4_d")] },
    { key: "travel_dates",      question: t("agent_q_family_5"), options: [t("agent_q_family_5_a"), t("agent_q_family_5_b"), t("agent_q_family_5_c"), t("agent_q_family_5_d")] },
  ],
  luxury: [
    { key: "experience_type",     question: t("agent_q_luxury_1"), options: [t("agent_q_luxury_1_a"), t("agent_q_luxury_1_b"), t("agent_q_luxury_1_c"), t("agent_q_luxury_1_d")] },
    { key: "resort_preference",   question: t("agent_q_luxury_2"), options: [t("agent_q_luxury_2_a"), t("agent_q_luxury_2_b"), t("agent_q_luxury_2_c"), t("agent_q_luxury_2_d")] },
    { key: "non_ski_priority",    question: t("agent_q_luxury_3"), options: [t("agent_q_luxury_3_a"), t("agent_q_luxury_3_b"), t("agent_q_luxury_3_c"), t("agent_q_luxury_3_d")] },
    { key: "budget",              question: t("agent_q_luxury_4"), options: [t("agent_q_luxury_4_a"), t("agent_q_luxury_4_b"), t("agent_q_luxury_4_c"), t("agent_q_luxury_4_d")] },
  ],
  budget: [
    { key: "group",             question: t("agent_q_budget_1"), options: [t("agent_q_budget_1_a"), t("agent_q_budget_1_b"), t("agent_q_budget_1_c"), t("agent_q_budget_1_d")] },
    { key: "date_flexibility",  question: t("agent_q_budget_2"), options: [t("agent_q_budget_2_a"), t("agent_q_budget_2_b"), t("agent_q_budget_2_c"), t("agent_q_budget_2_d")] },
    { key: "destination",       question: t("agent_q_budget_3"), options: [t("agent_q_budget_3_a"), t("agent_q_budget_3_b"), t("agent_q_budget_3_c"), t("agent_q_budget_3_d")] },
    { key: "budget",            question: t("agent_q_budget_4"), options: [t("agent_q_budget_4_a"), t("agent_q_budget_4_b"), t("agent_q_budget_4_c"), t("agent_q_budget_4_d")] },
  ],
  advanced: [
    { key: "terrain",             question: t("agent_q_advanced_1"), options: [t("agent_q_advanced_1_a"), t("agent_q_advanced_1_b"), t("agent_q_advanced_1_c"), t("agent_q_advanced_1_d")] },
    { key: "offpiste_experience", question: t("agent_q_advanced_2"), options: [t("agent_q_advanced_2_a"), t("agent_q_advanced_2_b"), t("agent_q_advanced_2_c"), t("agent_q_advanced_2_d")] },
    { key: "guide_preference",    question: t("agent_q_advanced_3"), options: [t("agent_q_advanced_3_a"), t("agent_q_advanced_3_b"), t("agent_q_advanced_3_c"), t("agent_q_advanced_3_d")] },
    { key: "resort_vibe",         question: t("agent_q_advanced_4"), options: [t("agent_q_advanced_4_a"), t("agent_q_advanced_4_b"), t("agent_q_advanced_4_c"), t("agent_q_advanced_4_d")] },
  ],
  beginner: [
    { key: "experience",    question: t("agent_q_beginner_1"), options: [t("agent_q_beginner_1_a"), t("agent_q_beginner_1_b"), t("agent_q_beginner_1_c"), t("agent_q_beginner_1_d")] },
    { key: "discipline",    question: t("agent_q_beginner_2"), options: [t("agent_q_beginner_2_a"), t("agent_q_beginner_2_b"), t("agent_q_beginner_2_c"), t("agent_q_beginner_2_d")] },
    { key: "top_priority",  question: t("agent_q_beginner_3"), options: [t("agent_q_beginner_3_a"), t("agent_q_beginner_3_b"), t("agent_q_beginner_3_c"), t("agent_q_beginner_3_d")] },
    { key: "duration",      question: t("agent_q_beginner_4"), options: [t("agent_q_beginner_4_a"), t("agent_q_beginner_4_b"), t("agent_q_beginner_4_c"), t("agent_q_beginner_4_d")] },
  ],
  explorer: [
    { key: "escape_from",         question: t("agent_q_explorer_1"), options: [t("agent_q_explorer_1_a"), t("agent_q_explorer_1_b"), t("agent_q_explorer_1_c"), t("agent_q_explorer_1_d")] },
    { key: "hidden_gem_type",     question: t("agent_q_explorer_2"), options: [t("agent_q_explorer_2_a"), t("agent_q_explorer_2_b"), t("agent_q_explorer_2_c"), t("agent_q_explorer_2_d")] },
    { key: "logistics_tolerance", question: t("agent_q_explorer_3"), options: [t("agent_q_explorer_3_a"), t("agent_q_explorer_3_b"), t("agent_q_explorer_3_c"), t("agent_q_explorer_3_d")] },
    { key: "skill_level",         question: t("agent_q_explorer_4"), options: [t("agent_q_explorer_4_a"), t("agent_q_explorer_4_b"), t("agent_q_explorer_4_c"), t("agent_q_explorer_4_d")] },
  ],
  };
}import { useState, useEffect, useRef } from "react";
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

// ─── Conversation persistence (localStorage) ──────────────────────────────
const STORAGE_PREFIX = "peakxp_agent_conv_";

function saveConversation(agentKey, state) {
  try {
    localStorage.setItem(STORAGE_PREFIX + agentKey, JSON.stringify({
      ...state,
      savedAt: Date.now(),
    }));
  } catch {}
}

function loadConversation(agentKey) {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + agentKey);
    if (!raw) return null;
    const data = JSON.parse(raw);
    // Expire after 24 hours
    if (Date.now() - data.savedAt > 24 * 60 * 60 * 1000) {
      localStorage.removeItem(STORAGE_PREFIX + agentKey);
      return null;
    }
    return data;
  } catch { return null; }
}

function clearConversation(agentKey) {
  try { localStorage.removeItem(STORAGE_PREFIX + agentKey); } catch {}
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
  const [resumePrompt, setResumePrompt] = useState("none");
  const [savedConvPreview, setSavedConvPreview] = useState(null);
  const scrollRef = useRef(null);
  const textareaRef = useRef(null);
  const userInitials = user ? (user.firstName?.[0] || user.full_name?.[0] || "G") : "G";
  const questionCards = agent ? (getQuestionCards(t)[agent.key] || []) : [];
  const totalIntakeQ = questionCards.length;
  const totalSteps = totalIntakeQ + 1;

  function handleResume() {
    if (!savedConvPreview) return;
    // Restore saved state
    setMessages(savedConvPreview.messages || []);
    setHistory(savedConvPreview.history || []);
    setPhase(savedConvPreview.phase || "chat");
    setQuestionIndex(savedConvPreview.questionIndex || 0);
    setIntakeAnswers(savedConvPreview.intakeAnswers || {});
    setServicesSelected(savedConvPreview.servicesSelected || []);
    setPlan(savedConvPreview.plan || null);
    setResumePrompt("none");
    setSavedConvPreview(null);
  }

  function handleNewConversation() {
    if (agent) clearConversation(agent.key);
    setResumePrompt("none");
    setSavedConvPreview(null);
    resetAll(agent);
  }

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
    const qCards = getQuestionCards(t)[ag.key] || [];
    if (qCards.length) setTimeout(() => setShowCard(true), 400);
  }

  useEffect(() => {
    if (isOpen && agent) {
      setVisible(true);
      // Check for a saved conversation
      const saved = loadConversation(agent.key);
      if (saved && saved.messages && saved.messages.length > 1) {
        // Has a real conversation — show resume prompt
        setSavedConvPreview(saved);
        setResumePrompt("prompt");
      } else {
        // No saved conversation — start fresh
        setResumePrompt("none");
        setSavedConvPreview(null);
        resetAll(agent);
      }
    } else {
      setTimeout(() => setVisible(false), 400);
    }
  }, [isOpen, agent]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing, showCard, questionIndex, phase]);

  // Auto-save conversation whenever messages change (only after intro)
  useEffect(() => {
    if (!agent || messages.length <= 1 || resumePrompt === "prompt") return;
    saveConversation(agent.key, {
      messages, history, phase, questionIndex,
      intakeAnswers, servicesSelected, plan,
    });
  }, [messages, phase, plan]);

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

          {/* Resume prompt — shown when a saved conversation is found */}
          {resumePrompt === "prompt" && savedConvPreview && (
            <div className="flex flex-col items-center justify-center h-full py-12 text-center">
              <div className={`w-16 h-16 rounded-2xl ${agent.bg} flex items-center justify-center mb-5`}>
                <agent.icon className={`h-8 w-8 ${agent.color}`} />
              </div>
              <h3 className="text-peak-text font-display font-bold text-xl mb-2">
                {t("agent_resume_title")}
              </h3>
              <p className="text-peak-text-secondary text-sm mb-1 max-w-xs">
                {t("agent_resume_desc")} <span className={`font-semibold ${agent.color}`}>{agent.name}</span>
              </p>
              <p className="text-peak-text-secondary/50 text-xs mb-8">
                {t("agent_last_message")}: {savedConvPreview.messages?.slice(-1)[0]?.time || "recently"}
              </p>
              <div className="flex flex-col gap-3 w-full max-w-xs">
                <button
                  onClick={handleResume}
                  className="w-full py-3 px-6 rounded-xl bg-peak-red hover:bg-peak-red-hover text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                >
                  ↩ {t("agent_continue_conv")}
                </button>
                <button
                  onClick={handleNewConversation}
                  className="w-full py-3 px-6 rounded-xl border border-white/10 text-peak-text-secondary hover:text-peak-text hover:border-white/20 text-sm transition-colors"
                >
                  {t("agent_new_conv")}
                </button>
              </div>
            </div>
          )}

          {resumePrompt === "none" && messages.map((msg, i) => (
            <div key={i}>
              <MessageBubble msg={msg} agent={agent} userInitials={userInitials} />
              {msg.role === "assistant" && plan && i === messages.length - 1 && (
                <AgentOptionsPanel options={plan.options || []} agentKey={agent.key} agentName={agent.name} onClose={onClose} onStartOver={() => resetAll(agent)} />
              )}
            </div>
          ))}

          {resumePrompt === "none" && phase === "questions" && showCard && currentQuestion && !typing && !plan && (
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

          {resumePrompt === "none" && phase === "services" && !typing && !plan && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <AgentServicesCard agentKey={agent.key} onConfirm={handleServicesConfirm} />
            </div>
          )}

          {resumePrompt === "none" && phase === "summary" && !typing && !plan && (
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

          {resumePrompt === "none" && phase === "chat" && plan && !typing && (
            <FollowUpChips onSend={sendMessage} disabled={typing} />
          )}

          {resumePrompt === "none" && typing && <TypingIndicator agent={agent} />}
          {resumePrompt === "none" && error && (
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