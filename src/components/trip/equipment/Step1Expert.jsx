import { useState } from "react";
import { Slider } from "@/components/ui/slider";

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs text-peak-text-secondary mb-1">{label}</label>
      {children}
    </div>
  );
}

function Select({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-peak-surface border border-white/10 rounded-lg px-3 py-2 text-sm text-peak-text outline-none focus:border-peak-blue"
    >
      <option value="">Select...</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

function NumberInput({ value, onChange, placeholder }) {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-peak-surface border border-white/10 rounded-lg px-3 py-2 text-sm text-peak-text outline-none focus:border-peak-blue"
    />
  );
}

function Toggle({ value, onChange, options }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
            value === o ? "bg-peak-blue/20 border-peak-blue/50 text-peak-blue" : "border-white/10 text-peak-text-secondary hover:text-peak-text"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function SliderField({ label, value, onChange, min, max, unit }) {
  return (
    <Field label={`${label}: ${value}${unit}`}>
      <div className="pt-1">
        <Slider
          value={[value]}
          onValueChange={([v]) => onChange(v)}
          min={min}
          max={max}
          step={1}
          className="[&_[role=slider]]:bg-peak-blue [&_[role=slider]]:border-peak-blue [&_.bg-primary]:bg-peak-blue"
        />
        <div className="flex justify-between text-xs text-peak-text-secondary mt-1">
          <span>{min}{unit}</span><span>{max}{unit}</span>
        </div>
      </div>
    </Field>
  );
}

const SECTIONS = {
  skis: ({ spec, set }) => (
    <div className="grid grid-cols-2 gap-4">
      <Field label="Ski type"><Select value={spec.type || ""} onChange={(v) => set("type", v)} options={["All-mountain", "Carving", "Freeride", "Park", "Racing"]} /></Field>
      <Field label="Ski length (cm)"><NumberInput value={spec.length || ""} onChange={(v) => set("length", v)} placeholder="e.g. 170" /></Field>
      <Field label="Waist width (mm)"><NumberInput value={spec.waist || ""} onChange={(v) => set("waist", v)} placeholder="e.g. 80" /></Field>
      <Field label="Binding system"><Toggle value={spec.binding} onChange={(v) => set("binding", v)} options={["Integrated", "Separate"]} /></Field>
      <div className="col-span-2"><Field label="Rocker type"><Toggle value={spec.rocker} onChange={(v) => set("rocker", v)} options={["Full rocker", "Camber", "Hybrid"]} /></Field></div>
    </div>
  ),
  snowboard: ({ spec, set }) => (
    <div className="grid grid-cols-2 gap-4">
      <Field label="Board type"><Select value={spec.type || ""} onChange={(v) => set("type", v)} options={["All-mountain", "Freestyle", "Freeride", "Splitboard"]} /></Field>
      <Field label="Board length (cm)"><NumberInput value={spec.length || ""} onChange={(v) => set("length", v)} placeholder="e.g. 155" /></Field>
      <Field label="Binding size"><Toggle value={spec.bindingSize} onChange={(v) => set("bindingSize", v)} options={["S", "M", "L", "XL"]} /></Field>
      <div className="col-span-2"><SliderField label="Flex rating" value={spec.flex || 5} onChange={(v) => set("flex", v)} min={1} max={10} unit="" /></div>
    </div>
  ),
  ski_boots: ({ spec, set }) => (
    <div className="grid grid-cols-2 gap-4">
      <Field label="Shell size (EU)"><NumberInput value={spec.size || ""} onChange={(v) => set("size", v)} placeholder="e.g. 42" /></Field>
      <Field label="Boot type"><Toggle value={spec.bootType} onChange={(v) => set("bootType", v)} options={["Alpine", "Touring", "Freeride"]} /></Field>
      <Field label="Last width"><Toggle value={spec.last} onChange={(v) => set("last", v)} options={["Narrow", "Regular", "Wide"]} /></Field>
      <div className="col-span-2"><SliderField label="Flex index" value={spec.flex || 90} onChange={(v) => set("flex", v)} min={60} max={130} unit="" /></div>
    </div>
  ),
  snowboard_boots: ({ spec, set }) => (
    <div className="grid grid-cols-2 gap-4">
      <Field label="EU shoe size"><NumberInput value={spec.size || ""} onChange={(v) => set("size", v)} placeholder="e.g. 42" /></Field>
      <Field label="Flex"><Toggle value={spec.flex} onChange={(v) => set("flex", v)} options={["Soft", "Medium", "Stiff"]} /></Field>
      <div className="col-span-2"><Field label="Lacing system"><Toggle value={spec.lacing} onChange={(v) => set("lacing", v)} options={["Traditional", "BOA", "Speed lace"]} /></Field></div>
    </div>
  ),
  poles: ({ spec, set }) => (
    <div className="grid grid-cols-2 gap-4">
      <Field label="Length (cm)"><NumberInput value={spec.length || ""} onChange={(v) => set("length", v)} placeholder="e.g. 115" /></Field>
      <Field label="Material"><Toggle value={spec.material} onChange={(v) => set("material", v)} options={["Aluminium", "Carbon"]} /></Field>
      <div className="col-span-2"><Field label="Basket type"><Toggle value={spec.basket} onChange={(v) => set("basket", v)} options={["Piste", "Powder"]} /></Field></div>
    </div>
  ),
  helmet: ({ spec, set }) => (
    <div className="grid grid-cols-2 gap-4">
      <Field label="Head circumference (cm)"><NumberInput value={spec.circumference || ""} onChange={(v) => set("circumference", v)} placeholder="e.g. 58" /></Field>
      <Field label="Style"><Toggle value={spec.style} onChange={(v) => set("style", v)} options={["In-mold", "Hard shell"]} /></Field>
      <div className="col-span-2"><Field label="MIPS protection"><Toggle value={spec.mips} onChange={(v) => set("mips", v)} options={["Yes", "No"]} /></Field></div>
    </div>
  ),
  ski_jacket: ({ spec, set }) => (
    <div className="grid grid-cols-2 gap-4">
      <Field label="EU clothing size"><Toggle value={spec.size} onChange={(v) => set("size", v)} options={["XS", "S", "M", "L", "XL", "XXL"]} /></Field>
      <div className="col-span-2"><Field label="Waterproof rating"><Toggle value={spec.waterproof} onChange={(v) => set("waterproof", v)} options={["10K", "15K", "20K+"]} /></Field></div>
    </div>
  ),
  ski_pants: ({ spec, set }) => (
    <div className="grid grid-cols-2 gap-4">
      <Field label="EU clothing size"><Toggle value={spec.size} onChange={(v) => set("size", v)} options={["XS", "S", "M", "L", "XL", "XXL"]} /></Field>
      <div className="col-span-2"><Field label="Waterproof rating"><Toggle value={spec.waterproof} onChange={(v) => set("waterproof", v)} options={["10K", "15K", "20K+"]} /></Field></div>
    </div>
  ),
  gloves: ({ spec, set }) => (
    <div className="grid grid-cols-2 gap-4">
      <Field label="EU size"><Toggle value={spec.size} onChange={(v) => set("size", v)} options={["XS", "S", "M", "L", "XL", "XXL"]} /></Field>
      <div className="col-span-2"><Field label="Insulation level"><Toggle value={spec.insulation} onChange={(v) => set("insulation", v)} options={["Light", "Medium", "Heavy"]} /></Field></div>
    </div>
  ),
  goggles: ({ spec, set }) => (
    <div className="grid grid-cols-2 gap-4">
      <Field label="Lens tint preference"><Toggle value={spec.tint} onChange={(v) => set("tint", v)} options={["All-conditions", "Sunny", "Low-light"]} /></Field>
      <div className="col-span-2"><Field label="OTG (over-glasses)"><Toggle value={spec.otg} onChange={(v) => set("otg", v)} options={["Yes", "No"]} /></Field></div>
    </div>
  ),
  back_protector: ({ spec, set }) => (
    <div className="grid grid-cols-2 gap-4">
      <Field label="EU clothing size"><Toggle value={spec.size} onChange={(v) => set("size", v)} options={["XS", "S", "M", "L", "XL", "XXL"]} /></Field>
      <div className="col-span-2"><Field label="Protection level"><Toggle value={spec.protection} onChange={(v) => set("protection", v)} options={["Level 1", "Level 2"]} /></Field></div>
    </div>
  ),
};

const LABELS = {
  skis: "Skis", snowboard: "Snowboard", ski_boots: "Ski Boots", snowboard_boots: "Snowboard Boots",
  poles: "Poles", helmet: "Helmet", ski_jacket: "Ski Jacket", ski_pants: "Ski Pants",
  gloves: "Gloves", goggles: "Goggles", back_protector: "Back Protector",
};

export default function Step1Expert({ selectedEquipment, specs, setSpecs, onContinue }) {
  function setSpecField(eqKey, field, val) {
    setSpecs((prev) => ({ ...prev, [eqKey]: { ...(prev[eqKey] || {}), [field]: val } }));
  }

  return (
    <div>
      <h2 className="font-display font-bold text-2xl text-peak-text mb-1">Your specifications</h2>
      <p className="text-peak-text-secondary text-sm mb-6">Fill in the details for each item you're renting.</p>
      <div className="space-y-6">
        {selectedEquipment.map((eqKey) => {
          const SectionComponent = SECTIONS[eqKey];
          const spec = specs[eqKey] || {};
          const set = (field, val) => setSpecField(eqKey, field, val);
          return (
            <div key={eqKey} className="bg-peak-card border border-white/5 rounded-xl p-5">
              <h3 className="font-display font-bold text-peak-text text-base mb-4">{LABELS[eqKey]}</h3>
              {SectionComponent ? <SectionComponent spec={spec} set={set} /> : <p className="text-peak-text-secondary text-sm">No additional specs required.</p>}
            </div>
          );
        })}
      </div>
      <button
        onClick={onContinue}
        className="mt-8 px-8 py-3 bg-peak-red hover:bg-peak-red-hover text-white font-display font-bold text-sm rounded-xl transition-colors"
      >
        Continue to shop selection
      </button>
    </div>
  );
}