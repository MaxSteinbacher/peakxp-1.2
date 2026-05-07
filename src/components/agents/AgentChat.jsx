import { useState, useEffect, useRef } from "react";
import { X, ChevronRight, Send, CheckCircle, Mail } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useAppAuth } from "../../context/AppAuthContext";
import { useTripPlanner } from "../../context/TripPlannerContext";
import { useNavigate } from "react-router-dom";

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
      <div className={`max-w-[80%] ${isAgent ? "rounded-2xl rounded-tl-sm bg-peak-surface border border-white/5" : "rounded-2xl rounded-tr-sm bg-peak-red/10 border border-peak-red/20"} px-4 py-3`}>
        <p className="text-peak-text text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
        <p className="text-peak-text-secondary text-xs mt-1">{msg.time}</p>
      </div>
    </div>
  );
}

function QuickReplies({ chips, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 mt-3 pl-11">
      {chips.map(chip => (
        <button key={chip} onClick={() => onSelect(chip)}
          className="px-3 py-1.5 bg-peak-surface border border-white/10 rounded-full text-peak-text text-xs cursor-pointer hover:border-white/25 hover:bg-white/5 transition-colors">
          {chip}
        </button>
      ))}
    </div>
  );
}

function PlanCard({ plan, onBook, onSave }) {
  return (
    <div className="bg-peak-card border border-white/5 rounded-2xl overflow-hidden mt-2 w-full">
      <div className="px-5 py-4 border-b border-white/5 flex items-center gap-3">
        <CheckCircle className="h-5 w-5 text-peak-green flex-shrink-0" />
        <span className="font-bold text-peak-text">Your personalised trip plan is ready</span>
      </div>
      <div className="px-5 py-4 space-y-3">
        {plan.resorts?.map((r, i) => (
          <div key={i} className="flex items-center gap-3 bg-peak-surface rounded-xl px-4 py-3">
            <span className="text-lg">{r.flag || "🏔"}</span>
            <div>
              <p className="text-peak-text text-sm font-semibold">{r.name}</p>
              <p className="text-peak-text-secondary text-xs">{r.reason}</p>
            </div>
          </div>
        ))}
        {plan.notes && <p className="text-peak-text-secondary text-xs px-1">{plan.notes}</p>}
      </div>
      <div className="px-5 py-4 border-t border-white/5 flex gap-3">
        <button onClick={onBook} className="bg-peak-red hover:bg-peak-red-hover text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors">
          Start booking this trip →
        </button>
        <button onClick={onSave} className="border border-white/10 text-peak-text-secondary px-5 py-2.5 rounded-xl text-sm hover:text-peak-text transition-colors">
          Save to My Trips
        </button>
      </div>
    </div>
  );
}

function now() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function AgentChat({ agent, isOpen, onClose }) {
  const { user } = useAppAuth();
  const { startTrip } = useTripPlanner();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]); // for API context
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [quickReplies, setQuickReplies] = useState([]);
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);
  const scrollRef = useRef(null);
  const textareaRef = useRef(null);

  const userInitials = user ? (user.firstName?.[0] || "") + (user.lastName?.[0] || "") : "G";

  useEffect(() => {
    if (isOpen && agent) {
      setVisible(true);
      // Init with intro message
      setMessages([{ role: "assistant", content: agent.introMessage, time: now() }]);
      setHistory([]);
      setPlan(null);
      setQuickReplies(agent.quickReplies || []);
      setError(null);
    } else {
      setTimeout(() => setVisible(false), 400);
    }
  }, [isOpen, agent]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  function handleTextareaInput(e) {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  }

  async function sendMessage(text) {
    if (!text.trim() || typing) return;
    const userMsg = { role: "user", content: text.trim(), time: now() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setQuickReplies([]);
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
        // Extract JSON plan block
        const jsonMatch = rawContent.match(/```json\n?([\s\S]*?)\n?```/);
        if (jsonMatch) {
          try { parsedPlan = JSON.parse(jsonMatch[1]); } catch {}
        }
        displayContent = rawContent.replace("[PLAN_READY]", "").replace(/```json[\s\S]*?```/, "").trim();
      }

      const assistantMsg = { role: "assistant", content: displayContent, time: now() };
      setMessages(prev => [...prev, assistantMsg]);
      setHistory(prev => [...prev, { role: "assistant", content: displayContent }]);
      setTyping(false);

      if (parsedPlan) {
        setPlan(parsedPlan);
        // Store in sessionStorage for notification
        sessionStorage.setItem(`peakxp_agent_result_${agent.key}`, JSON.stringify(parsedPlan));
      }
    } catch {
      setTyping(false);
      setError("Something went wrong. Please try again.");
    }
  }

  function handleBook() {
    if (!plan) return;
    onClose();
    navigate("/plan");
  }

  if (!visible || !agent) return null;

  const panelClass = isOpen
    ? "translate-x-0 sm:translate-x-0 translate-y-0"
    : "translate-x-full sm:translate-x-full translate-y-full sm:translate-y-0";

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-peak-bg/70 backdrop-blur-md z-50 transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Panel */}
      <div className={`fixed right-0 top-0 bottom-0 w-full max-w-2xl bg-peak-bg border-l border-white/5 flex flex-col z-50 shadow-2xl transition-transform duration-[350ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${panelClass}
        sm:rounded-none
        max-sm:top-auto max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:w-full max-sm:max-w-none max-sm:h-[92vh] max-sm:rounded-t-3xl`}>

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
            {[{ icon: ChevronRight, label: "Minimise" }, { icon: X, label: "Close" }].map(({ icon: Icon, label }) => (
              <button key={label} onClick={onClose} aria-label={label}
                className="w-9 h-9 rounded-xl bg-peak-surface border border-white/5 flex items-center justify-center text-peak-text-secondary hover:text-peak-text hover:border-white/15 transition-colors cursor-pointer">
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>
        {/* Colour glow line */}
        <div className={`h-px flex-shrink-0`} style={{ background: `linear-gradient(to right, transparent, ${agent.glowColor || "rgba(56,148,227,0.4)"}, transparent)` }} />

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-6 space-y-4 scrollbar-thin">
          {messages.map((msg, i) => (
            <div key={i}>
              <MessageBubble msg={msg} agent={agent} userInitials={userInitials} />
              {msg.role === "assistant" && i === messages.length - 1 && quickReplies.length > 0 && !plan && (
                <QuickReplies chips={quickReplies} onSelect={(c) => { sendMessage(c); }} />
              )}
              {msg.role === "assistant" && plan && i === messages.length - 1 && (
                <>
                  <PlanCard plan={plan} onBook={handleBook} onSave={() => {}} />
                  {/* Email banner */}
                  <div className="bg-peak-blue/10 border border-peak-blue/20 rounded-xl px-4 py-3 flex items-center gap-3 mt-3">
                    <Mail className="h-4 w-4 text-peak-blue flex-shrink-0" />
                    {user ? (
                      <p className="text-peak-text-secondary text-sm">A copy of your trip plan has been sent to {user.email}</p>
                    ) : (
                      <p className="text-peak-text-secondary text-sm">
                        <a href="/auth" className="text-peak-blue hover:underline">Sign in</a> to receive your plan by email
                      </p>
                    )}
                    {/* TODO: connect to email API (Resend / SendGrid) — trigger POST /api/send-plan with plan data and user email */}
                  </div>
                </>
              )}
            </div>
          ))}
          {typing && <TypingIndicator agent={agent} />}
          {error && (
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-xl ${agent.bg} flex items-center justify-center flex-shrink-0`}>
                <agent.icon className={`h-4 w-4 ${agent.color}`} />
              </div>
              <div className="bg-peak-surface border border-peak-red/20 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                <p className="text-peak-text text-sm">{error}</p>
                <button onClick={() => { setError(null); }} className="text-peak-blue text-xs mt-1 hover:underline">Retry</button>
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
              placeholder={`Message ${agent.name}...`}
              className="flex-1 bg-transparent text-peak-text text-sm outline-none resize-none leading-relaxed placeholder:text-peak-text-secondary/60"
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