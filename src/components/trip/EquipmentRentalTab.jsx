import { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import Step0 from "./equipment/Step0";
import Step1Expert from "./equipment/Step1Expert";
import Step1Guided from "./equipment/Step1Guided";
import Step2Shops from "./equipment/Step2Shops";
import Step3Checkout from "./equipment/Step3Checkout";

const STEPS = ["Equipment", "Specifications", "Choose Shop", "Checkout"];

function StepIndicator({ current }) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
              i < current ? "bg-peak-blue border-peak-blue text-white"
              : i === current ? "border-peak-blue text-peak-blue bg-transparent"
              : "border-white/20 text-peak-text-secondary"
            }`}>
              {i < current ? "✓" : i + 1}
            </div>
            <span className={`text-xs whitespace-nowrap ${i === current ? "text-peak-text" : "text-peak-text-secondary"}`}>{label}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`flex-1 h-px mx-2 mb-4 ${i < current ? "bg-peak-blue" : "bg-white/10"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function EquipmentRentalTab({ agentServiceDetails = {}, onBook }) {
  const [step, setStep] = useState(0);
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [mode, setMode] = useState(null); // "expert" | "guided"
  const [expertSpecs, setExpertSpecs] = useState({});
  const [guidedAnswers, setGuidedAnswers] = useState({});
  const [selectedShop, setSelectedShop] = useState(null);
  const [preFilled, setPreFilled] = useState(false);

  useEffect(() => {
    const sd = agentServiceDetails?.equipment;
    if (!sd) return;
    if (Array.isArray(sd.items) && sd.items.length) setSelectedEquipment(sd.items);
    if (sd.guidedMode) setMode("guided");
    else if (sd.hasOwnMeasurements) { setMode("expert"); setStep(2); }
    setPreFilled(true);
  }, []);

  const stepIndex = step === "1a" ? 1 : step === "1b" ? 1 : typeof step === "number" ? step : 0;

  function goBack() {
    if (step === "1a" || step === "1b") setStep(0);
    else if (step === 2) setStep(mode === "expert" ? "1a" : "1b");
    else if (step === 3) setStep(2);
  }

  function handleStep0Continue() {
    setStep(mode === "expert" ? "1a" : "1b");
  }

  return (
    <div>
      <StepIndicator current={stepIndex} />
      {preFilled && (
        <div className="flex items-center gap-2 bg-peak-blue/10 border border-peak-blue/20 rounded-xl px-4 py-2.5 mb-4">
          <p className="text-peak-blue text-xs font-medium">Pre-filled from your agent conversation — review and adjust if needed</p>
        </div>
      )}

      {step !== 0 && (
        <button onClick={goBack} className="flex items-center gap-1.5 text-peak-text-secondary hover:text-peak-text text-sm mb-6 transition-colors">
          <ChevronLeft className="h-4 w-4" /> Back
        </button>
      )}

      {step === 0 && (
        <Step0
          selectedEquipment={selectedEquipment}
          setSelectedEquipment={setSelectedEquipment}
          mode={mode}
          setMode={setMode}
          onContinue={handleStep0Continue}
        />
      )}

      {step === "1a" && (
        <Step1Expert
          selectedEquipment={selectedEquipment}
          specs={expertSpecs}
          setSpecs={setExpertSpecs}
          onContinue={() => setStep(2)}
        />
      )}

      {step === "1b" && (
        <Step1Guided
          selectedEquipment={selectedEquipment}
          answers={guidedAnswers}
          setAnswers={setGuidedAnswers}
          onContinue={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <Step2Shops
          selectedEquipment={selectedEquipment}
          specs={mode === "expert" ? expertSpecs : guidedAnswers}
          selectedShop={selectedShop}
          setSelectedShop={setSelectedShop}
          onContinue={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <Step3Checkout
          selectedEquipment={selectedEquipment}
          shop={selectedShop}
          specs={mode === "expert" ? expertSpecs : guidedAnswers}
          answers={guidedAnswers}
          onBook={onBook}
        />
      )}
    </div>
  );
}