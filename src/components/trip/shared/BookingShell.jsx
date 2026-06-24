import StepIndicator from "./StepIndicator";

/**
 * BookingShell — wraps every booking sub-flow (Storage, Equipment, etc.)
 * with a consistent pill step tracker and back navigation.
 *
 * Props:
 *   steps      string[]        — step labels (e.g. ["Location", "Specs", "Choose Shop", "Checkout"])
 *   current    number          — 0-based active step index
 *   onBack     () => void      — called when user presses back (also wired to step click)
 *   onGoToStep (i) => void     — optional: jump directly to a completed step
 *   children   ReactNode
 */
export default function BookingShell({ steps, current, onBack, onGoToStep, children }) {
  function handleStepClick(i) {
    if (typeof onGoToStep === "function") {
      onGoToStep(i);
    } else if (typeof onBack === "function") {
      // Fallback: call onBack once per step difference
      const diff = current - i;
      if (diff > 0) onBack();
    }
  }

  return (
    <div>
      <StepIndicator
        steps={steps}
        current={current}
        onStepClick={current > 0 ? handleStepClick : undefined}
      />
      {children}
    </div>
  );
}
