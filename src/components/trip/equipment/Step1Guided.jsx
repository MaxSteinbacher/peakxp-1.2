import { useState } from "react";
import { HelpCircle, ChevronLeft, ChevronRight } from "lucide-react";

function Tooltip({ text }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-block ml-1.5 align-middle">
      <button
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)}
        className="text-peak-text-secondary hover:text-peak-blue transition-colors"
        type="button"
      >
        <HelpCircle className="h-4 w-4" />
      </button>
      {open && (
        <div className="absolute z-50 left-6 top-0 w-64 bg-peak-surface border border-white/10 rounded-xl p-3 shadow-xl text-xs text-peak-text-secondary leading-relaxed">
          {text}
        </div>
      )}
    </span>
  );
}

function PillSelector({ options, value, onChange, multi = false }) {
  function toggle(opt) {
    if (multi) {
      const arr = value || [];
      onChange(arr.includes(opt) ? arr.filter((v) => v !== opt) : [...arr, opt]);
    } else {
      onChange(value === opt ? null : opt);
    }
  }
  const isActive = (opt) => multi ? (value || []).includes(opt) : value === opt;
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => toggle(opt)}
          className={`px-4 py-2 text-sm font-medium rounded-xl border transition-colors ${
            isActive(opt) ? "bg-peak-blue/20 border-peak-blue/50 text-peak-blue" : "border-white/10 text-peak-text-secondary hover:text-peak-text"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function buildQuestions(selectedEquipment) {
  const hasBoots = selectedEquipment.includes("ski_boots") || selectedEquipment.includes("snowboard_boots");
  const hasHelmet = selectedEquipment.includes("helmet");
  const hasClothing = ["ski_jacket", "ski_pants", "gloves", "back_protector"].some((k) => selectedEquipment.includes(k));

  const questions = [
    {
      key: "age",
      label: "How old are you?",
      tooltip: "Age helps us recommend the right flex and length for your physique and strength.",
      render: (val, set) => (
        <input type="number" value={val || ""} onChange={(e) => set(e.target.value)}
          placeholder="Your age"
          className="w-48 bg-peak-surface border border-white/10 rounded-xl px-4 py-3 text-peak-text text-lg outline-none focus:border-peak-blue" />
      ),
    },
    {
      key: "height",
      label: "What is your height?",
      tooltip: "Ski and board length is calculated from your height. Stand straight against a wall and measure to the top of your head.",
      render: (val, set) => {
        const unit = (val && val.unit) || "cm";
        const num = (val && val.num) || "";
        return (
          <div className="flex items-center gap-3">
            <input type="number" value={num} onChange={(e) => set({ unit, num: e.target.value })}
              placeholder={unit === "cm" ? "e.g. 175" : "e.g. 5.9"}
              className="w-40 bg-peak-surface border border-white/10 rounded-xl px-4 py-3 text-peak-text text-lg outline-none focus:border-peak-blue" />
            <div className="flex gap-1">
              {["cm", "ft"].map((u) => (
                <button key={u} onClick={() => set({ num, unit: u })}
                  className={`px-3 py-2 text-sm rounded-lg border transition-colors ${unit === u ? "bg-peak-blue/20 border-peak-blue/50 text-peak-blue" : "border-white/10 text-peak-text-secondary"}`}>
                  {u}
                </button>
              ))}
            </div>
          </div>
        );
      },
    },
    {
      key: "weight",
      label: "What is your weight?",
      tooltip: "Weight affects ski stiffness and binding settings. Step on a scale at home before you go.",
      render: (val, set) => {
        const unit = (val && val.unit) || "kg";
        const num = (val && val.num) || "";
        return (
          <div className="flex items-center gap-3">
            <input type="number" value={num} onChange={(e) => set({ unit, num: e.target.value })}
              placeholder={unit === "kg" ? "e.g. 75" : "e.g. 165"}
              className="w-40 bg-peak-surface border border-white/10 rounded-xl px-4 py-3 text-peak-text text-lg outline-none focus:border-peak-blue" />
            <div className="flex gap-1">
              {["kg", "lbs"].map((u) => (
                <button key={u} onClick={() => set({ num, unit: u })}
                  className={`px-3 py-2 text-sm rounded-lg border transition-colors ${unit === u ? "bg-peak-blue/20 border-peak-blue/50 text-peak-blue" : "border-white/10 text-peak-text-secondary"}`}>
                  {u}
                </button>
              ))}
            </div>
          </div>
        );
      },
    },
    ...(hasBoots ? [{
      key: "shoe_size",
      label: "What is your shoe size?",
      tooltip: "Boot fit is critical for control and warmth. Use your everyday shoe size as a starting point — ski boots run slightly differently.",
      render: (val, set) => (
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 19 }, (_, i) => 32 + i).map((size) => (
            <button key={size} onClick={() => set(size)}
              className={`w-12 h-10 text-sm font-medium rounded-lg border transition-colors ${val === size ? "bg-peak-blue/20 border-peak-blue/50 text-peak-blue" : "border-white/10 text-peak-text-secondary hover:text-peak-text"}`}>
              {size}
            </button>
          ))}
        </div>
      ),
    }] : []),
    ...(hasHelmet ? [{
      key: "head_circumference",
      label: "What is your head circumference?",
      tooltip: "Measure around your head just above the eyebrows using a soft tape measure. If you don't have one, a piece of string + ruler works fine.",
      render: (val, set) => (
        <input type="number" value={val || ""} onChange={(e) => set(e.target.value)}
          placeholder="e.g. 58 cm"
          className="w-48 bg-peak-surface border border-white/10 rounded-xl px-4 py-3 text-peak-text text-lg outline-none focus:border-peak-blue" />
      ),
    }] : []),
    ...(hasClothing ? [{
      key: "clothing_size",
      label: "What is your clothing size?",
      tooltip: "Used for jacket, pants, gloves, and protector sizing.",
      render: (val, set) => <PillSelector options={["XS", "S", "M", "L", "XL", "XXL"]} value={val} onChange={set} />,
    }] : []),
    {
      key: "level",
      label: "What is your skiing / snowboarding level?",
      tooltip: "Be honest — the right level of stiffness and length makes learning much easier and safer.",
      render: (val, set) => <PillSelector options={["First timer", "Beginner", "Intermediate", "Advanced", "Expert"]} value={val} onChange={set} />,
    },
    {
      key: "terrain",
      label: "What type of terrain will you mainly ski?",
      tooltip: "Ski shape and binding settings vary a lot by terrain type.",
      render: (val, set) => <PillSelector options={["Groomed pistes", "Off-piste", "Park & tricks", "Mixed", "Not sure yet"]} value={val} onChange={set} multi />,
    },
    {
      key: "days",
      label: "How many days will you rent for?",
      tooltip: null,
      render: (val, set) => (
        <div className="flex items-center gap-4">
          <button onClick={() => set(Math.max(1, (val || 1) - 1))} className="w-10 h-10 rounded-xl border border-white/10 text-peak-text-secondary hover:text-peak-text text-xl">−</button>
          <span className="text-3xl font-display font-bold text-peak-text w-8 text-center">{val || 1}</span>
          <button onClick={() => set(Math.min(14, (val || 1) + 1))} className="w-10 h-10 rounded-xl border border-white/10 text-peak-text-secondary hover:text-peak-text text-xl">+</button>
          <span className="text-peak-text-secondary text-sm">days</span>
        </div>
      ),
    },
    {
      key: "dates",
      label: "What are your rental dates?",
      tooltip: null,
      render: (val, set) => {
        const v = val || {};
        return (
          <div className="flex items-center gap-3 flex-wrap">
            <div>
              <p className="text-xs text-peak-text-secondary mb-1">From</p>
              <input type="date" value={v.start || ""} onChange={(e) => set({ ...v, start: e.target.value })}
                className="bg-peak-surface border border-white/10 rounded-xl px-4 py-2 text-peak-text outline-none focus:border-peak-blue" />
            </div>
            <div>
              <p className="text-xs text-peak-text-secondary mb-1">To</p>
              <input type="date" value={v.end || ""} onChange={(e) => set({ ...v, end: e.target.value })}
                className="bg-peak-surface border border-white/10 rounded-xl px-4 py-2 text-peak-text outline-none focus:border-peak-blue" />
            </div>
          </div>
        );
      },
    },
  ];
  return questions;
}

function buildSummary(answers, selectedEquipment) {
  const height = answers.height?.num || "?";
  const level = answers.level || "unknown level";
  const terrain = Array.isArray(answers.terrain) ? answers.terrain.join(", ") : "mixed terrain";
  const size = answers.clothing_size || "M";
  const shoe = answers.shoe_size || "?";

  const map = {
    skis: `~${Math.round((parseFloat(height) || 170) * 0.9)}cm ski for ${level} on ${terrain}`,
    snowboard: `~${Math.round((parseFloat(height) || 170) * 0.85)}cm board for ${level}`,
    ski_boots: `EU ${shoe}, suited for ${level}`,
    snowboard_boots: `EU ${shoe}, medium flex for ${level}`,
    poles: `~${Math.round((parseFloat(height) || 170) * 0.65)}cm poles`,
    helmet: `Circumference ${answers.head_circumference || "?"}cm`,
    ski_jacket: `Size ${size}, all-conditions`,
    ski_pants: `Size ${size}, waterproof`,
    gloves: `Size ${size}, insulated`,
    goggles: `All-conditions lens`,
    back_protector: `Size ${size}, Level 2`,
  };

  return selectedEquipment.map((k) => ({ key: k, label: k.replace(/_/g, " "), spec: map[k] || "Standard" }));
}

export default function Step1Guided({ selectedEquipment, answers, setAnswers, onContinue }) {
  const questions = buildQuestions(selectedEquipment);
  const [qIndex, setQIndex] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const current = questions[qIndex];
  const val = answers[current?.key];
  const progress = ((qIndex) / questions.length) * 100;

  function setVal(v) {
    setAnswers((prev) => ({ ...prev, [current.key]: v }));
  }

  function next() {
    if (qIndex < questions.length - 1) setQIndex((i) => i + 1);
    else setShowSummary(true);
  }

  function prev() {
    if (showSummary) setShowSummary(false);
    else if (qIndex > 0) setQIndex((i) => i - 1);
  }

  const summary = buildSummary(answers, selectedEquipment);

  if (showSummary) {
    return (
      <div className="max-w-lg mx-auto">
        <h2 className="font-display font-bold text-2xl text-peak-text mb-1">Based on your answers, here's what we'll look for:</h2>
        <p className="text-peak-text-secondary text-sm mb-6">We'll use these specs to match you with the best rental packages.</p>
        <div className="space-y-3 mb-8">
          {summary.map(({ key, label, spec }) => (
            <div key={key} className="bg-peak-card border border-white/5 rounded-xl px-5 py-4 flex items-start justify-between gap-4">
              <span className="text-peak-text font-medium capitalize">{label}</span>
              <span className="text-peak-text-secondary text-sm text-right">{spec}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <button onClick={prev} className="px-5 py-2.5 border border-white/10 text-peak-text-secondary hover:text-peak-text text-sm rounded-xl transition-colors">Back</button>
          <button onClick={onContinue} className="px-8 py-2.5 bg-peak-red hover:bg-peak-red-hover text-white font-display font-bold text-sm rounded-xl transition-colors">Find rental shops</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-peak-text-secondary mb-2">
          <span>Question {qIndex + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-peak-blue rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="font-display font-bold text-2xl text-peak-text mb-1 flex items-start gap-1">
          {current.label}
          {current.tooltip && <Tooltip text={current.tooltip} />}
        </h2>
        <div className="mt-6">
          {current.render(val, setVal)}
        </div>
      </div>

      <div className="flex gap-3">
        {qIndex > 0 && (
          <button onClick={prev} className="px-5 py-2.5 border border-white/10 text-peak-text-secondary hover:text-peak-text text-sm rounded-xl transition-colors flex items-center gap-1.5">
            <ChevronLeft className="h-4 w-4" /> Back
          </button>
        )}
        <button onClick={next} className="px-8 py-2.5 bg-peak-red hover:bg-peak-red-hover text-white font-display font-bold text-sm rounded-xl transition-colors flex items-center gap-1.5">
          {qIndex < questions.length - 1 ? "Next" : "See recommendations"}
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}