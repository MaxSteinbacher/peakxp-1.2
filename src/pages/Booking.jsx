import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Lock, Shield, Clock, CreditCard, ArrowLeft, AlertCircle } from "lucide-react";
import { getResortById } from "../lib/data";

const steps = ["Select", "Details", "Payment"];

export default function Booking() {
  const urlParams = new URLSearchParams(window.location.search);
  const resortId = urlParams.get("resort") || "verbier";
  const passIdx = parseInt(urlParams.get("pass") || "1");
  const adultsCount = parseInt(urlParams.get("adults") || "2");
  const childrenCount = parseInt(urlParams.get("children") || "0");
  const seniorsCount = parseInt(urlParams.get("seniors") || "0");

  const resort = getResortById(resortId);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "", email: "", nationality: "", level: "", emergencyContact: "",
    cardNumber: "", expiry: "", cvv: "", cardName: "",
  });
  const [errors, setErrors] = useState({});

  if (!resort) return <div className="text-center py-20 text-peak-text-secondary">Resort not found.</div>;

  const pass = resort.liftPasses[passIdx] || resort.liftPasses[1];
  const total = pass.adult * adultsCount + pass.child * childrenCount + pass.senior * seniorsCount;

  const updateForm = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: null }));
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!form.name) newErrors.name = "Name is required";
      if (!form.email || !form.email.includes("@")) newErrors.email = "Valid email required";
      if (!form.level) newErrors.level = "Select your skiing level";
    }
    if (step === 2) {
      if (!form.cardNumber || form.cardNumber.length < 16) newErrors.cardNumber = "Valid card number required";
      if (!form.expiry) newErrors.expiry = "Expiry date required";
      if (!form.cvv || form.cvv.length < 3) newErrors.cvv = "Valid CVV required";
      if (!form.cardName) newErrors.cardName = "Cardholder name required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep((p) => Math.min(2, p + 1));
  };

  const InputField = ({ label, field, type = "text", placeholder }) => (
    <div>
      <label className="text-peak-text text-sm font-medium mb-1.5 block">{label}</label>
      <input
        type={type}
        value={form[field]}
        onChange={(e) => updateForm(field, e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-peak-surface border rounded-lg px-4 py-3 text-peak-text placeholder:text-peak-text-secondary text-sm outline-none focus:ring-2 focus:ring-peak-blue/50 transition-all ${
          errors[field] ? "border-peak-red" : "border-white/10 focus:border-peak-blue"
        }`}
      />
      {errors[field] && (
        <p className="text-peak-red text-xs mt-1 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {errors[field]}
        </p>
      )}
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back */}
      <Link
        to={`/resort/${resortId}`}
        className="inline-flex items-center gap-1.5 text-peak-text-secondary text-sm hover:text-peak-text mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to {resort.name}
      </Link>

      {/* Progress */}
      <div className="flex items-center justify-center gap-4 mb-12">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                i <= step ? "bg-peak-red text-white" : "bg-peak-surface text-peak-text-secondary border border-white/10"
              }`}>
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className={`text-sm font-medium ${
                i <= step ? "text-peak-text" : "text-peak-text-secondary"
              }`}>{s}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-16 h-0.5 ${i < step ? "bg-peak-red" : "bg-white/10"}`} />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          {step === 0 && (
            <div>
              <h2 className="font-display font-bold text-2xl text-peak-text mb-6">Booking summary</h2>
              <div className="bg-peak-card border border-white/5 rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <img src={resort.image} alt={resort.name} className="w-20 h-14 rounded-lg object-cover" />
                  <div>
                    <h3 className="text-peak-text font-semibold">{resort.name}</h3>
                    <p className="text-peak-text-secondary text-sm">{resort.flag} {resort.country}</p>
                  </div>
                </div>
                <div className="border-t border-white/5 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-peak-text-secondary">
                    <span>Pass type</span>
                    <span className="text-peak-text">{pass.type}</span>
                  </div>
                  {adultsCount > 0 && (
                    <div className="flex justify-between text-peak-text-secondary">
                      <span>Adults × {adultsCount}</span>
                      <span className="text-peak-text">€{pass.adult * adultsCount}</span>
                    </div>
                  )}
                  {childrenCount > 0 && (
                    <div className="flex justify-between text-peak-text-secondary">
                      <span>Children × {childrenCount}</span>
                      <span className="text-peak-text">€{pass.child * childrenCount}</span>
                    </div>
                  )}
                  {seniorsCount > 0 && (
                    <div className="flex justify-between text-peak-text-secondary">
                      <span>Seniors × {seniorsCount}</span>
                      <span className="text-peak-text">€{pass.senior * seniorsCount}</span>
                    </div>
                  )}
                </div>
              </div>
              <button onClick={nextStep} className="mt-6 w-full py-3 bg-peak-red hover:bg-peak-red-hover text-white font-semibold rounded-lg transition-colors">
                Continue to details
              </button>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="font-display font-bold text-2xl text-peak-text mb-6">Guest details</h2>
              <div className="space-y-5">
                <InputField label="Full name" field="name" placeholder="John Doe" />
                <InputField label="Email" field="email" type="email" placeholder="john@example.com" />
                <InputField label="Nationality" field="nationality" placeholder="Swiss" />
                <div>
                  <label className="text-peak-text text-sm font-medium mb-1.5 block">Skiing ability</label>
                  <select
                    value={form.level}
                    onChange={(e) => updateForm("level", e.target.value)}
                    className={`w-full bg-peak-surface border rounded-lg px-4 py-3 text-peak-text text-sm outline-none focus:ring-2 focus:ring-peak-blue/50 transition-all ${
                      errors.level ? "border-peak-red" : "border-white/10 focus:border-peak-blue"
                    }`}
                  >
                    <option value="">Select level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                  {errors.level && (
                    <p className="text-peak-red text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.level}
                    </p>
                  )}
                </div>
                <InputField label="Emergency contact (optional)" field="emergencyContact" placeholder="+41 79 123 4567" />
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(0)} className="px-6 py-3 border border-white/10 text-peak-text-secondary rounded-lg hover:text-peak-text transition-colors">
                  Back
                </button>
                <button onClick={nextStep} className="flex-1 py-3 bg-peak-red hover:bg-peak-red-hover text-white font-semibold rounded-lg transition-colors">
                  Continue to payment
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-display font-bold text-2xl text-peak-text mb-6">Payment</h2>
              <div className="space-y-5">
                <InputField label="Card number" field="cardNumber" placeholder="4242 4242 4242 4242" />
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Expiry date" field="expiry" placeholder="MM/YY" />
                  <InputField label="CVV" field="cvv" placeholder="123" />
                </div>
                <InputField label="Cardholder name" field="cardName" placeholder="John Doe" />
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-4 mt-6 mb-6">
                {[
                  { icon: Lock, label: "SSL Secured" },
                  { icon: Check, label: "Instant confirmation" },
                  { icon: Clock, label: "Free cancellation" },
                ].map((b) => (
                  <div key={b.label} className="flex items-center gap-1.5 text-peak-blue text-xs font-medium">
                    <b.icon className="h-3.5 w-3.5" />
                    {b.label}
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="px-6 py-3 border border-white/10 text-peak-text-secondary rounded-lg hover:text-peak-text transition-colors">
                  Back
                </button>
                <button
                  onClick={() => {
                    if (validateStep()) alert("Booking confirmed! (Demo)");
                  }}
                  className="flex-1 py-3 bg-peak-red hover:bg-peak-red-hover text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <CreditCard className="h-4 w-4" />
                  Complete booking — €{total}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order summary sidebar */}
        <div className="bg-peak-card border border-white/5 rounded-xl p-6 h-fit lg:sticky lg:top-24">
          <h3 className="font-display font-bold text-peak-text text-lg mb-4">Order summary</h3>
          <div className="flex items-center gap-3 mb-4">
            <img src={resort.image} alt={resort.name} className="w-14 h-10 rounded-lg object-cover" />
            <div>
              <p className="text-peak-text text-sm font-medium">{resort.name}</p>
              <p className="text-peak-text-secondary text-xs">{pass.type} pass</p>
            </div>
          </div>
          <div className="border-t border-white/5 pt-4 space-y-2 text-sm">
            {adultsCount > 0 && (
              <div className="flex justify-between text-peak-text-secondary">
                <span>Adult × {adultsCount}</span>
                <span>€{pass.adult * adultsCount}</span>
              </div>
            )}
            {childrenCount > 0 && (
              <div className="flex justify-between text-peak-text-secondary">
                <span>Child × {childrenCount}</span>
                <span>€{pass.child * childrenCount}</span>
              </div>
            )}
            {seniorsCount > 0 && (
              <div className="flex justify-between text-peak-text-secondary">
                <span>Senior × {seniorsCount}</span>
                <span>€{pass.senior * seniorsCount}</span>
              </div>
            )}
            <div className="pt-3 border-t border-white/5 flex justify-between text-peak-text font-bold text-lg">
              <span>Total</span>
              <span>€{total}</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-peak-green text-xs">
            <Shield className="h-3.5 w-3.5" />
            <span>Price guarantee — no hidden fees</span>
          </div>
        </div>
      </div>
    </div>
  );
}