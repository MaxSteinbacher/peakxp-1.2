import { useState } from "react";
import { Mountain, Eye, EyeOff, Check } from "lucide-react";

const DISCIPLINES = ["Skiing", "Snowboard", "Cross-country", "Freestyle"];
const COUNTRIES = ["United Kingdom", "United States", "France", "Germany", "Switzerland", "Austria", "Italy", "Norway", "Sweden", "Netherlands", "Belgium", "Spain", "Australia", "Canada", "Japan", "Other"];

export default function AuthGate({ onAuth }) {
  const [mode, setMode] = useState("signin"); // signin | register
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", firstName: "", lastName: "", confirmPassword: "", dob: "", country: "", disciplines: [], terms: false });

  const sf = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleDisc = (d) => setForm(f => ({ ...f, disciplines: f.disciplines.includes(d) ? f.disciplines.filter(x => x !== d) : [...f.disciplines, d] }));

  function handleAuth(e) {
    e.preventDefault();
    if (onAuth) onAuth();
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-peak-card rounded-2xl p-8 border border-white/5 shadow-2xl">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Mountain className="h-7 w-7 text-peak-red" />
          <span className="font-display font-bold text-2xl text-peak-text">PEAK<span className="text-peak-red">XP</span></span>
        </div>

        {mode === "signin" ? (
          <>
            <h1 className="font-display font-bold text-2xl text-peak-text text-center mb-1">Sign in to continue</h1>
            <p className="text-peak-text-secondary text-sm text-center mb-8">Access your trips, community feed, and personalised recommendations.</p>

            {/* Social buttons */}
            <div className="space-y-3 mb-6">
              {[
                { label: "Continue with Google", icon: "G", color: "#fff" },
                { label: "Continue with Apple", icon: "⌘", color: "#fff" },
                { label: "Continue with Facebook", icon: "f", color: "#1877F2" },
              ].map(btn => (
                <button key={btn.label} onClick={handleAuth}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 bg-peak-surface hover:bg-white/5 transition-colors">
                  <span className="w-6 h-6 rounded flex items-center justify-center font-bold text-sm" style={{ color: btn.color }}>{btn.icon}</span>
                  <span className="text-peak-text text-sm font-medium flex-1 text-center">{btn.label}</span>
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-peak-text-secondary text-xs">or</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Email/password form */}
            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label className="block text-xs text-peak-text-secondary mb-1">Email</label>
                <input type="email" value={form.email} onChange={e => sf("email", e.target.value)} placeholder="jane@email.com"
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
              </div>
              <div>
                <label className="block text-xs text-peak-text-secondary mb-1">Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} value={form.password} onChange={e => sf("password", e.target.value)} placeholder="••••••••"
                    className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 pr-10 text-sm text-peak-text outline-none focus:border-peak-blue" />
                  <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-peak-text-secondary hover:text-peak-text transition-colors">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <button type="button" className="mt-1 text-xs text-peak-blue hover:underline float-right">Forgot password?</button>
              </div>
              <button type="submit" className="w-full py-3 bg-peak-red hover:bg-peak-red-hover text-white font-display font-bold text-sm rounded-xl transition-colors mt-2">
                Sign in
              </button>
            </form>

            <p className="text-peak-text-secondary text-sm text-center mt-6">
              Don't have an account?{" "}
              <button onClick={() => setMode("register")} className="text-peak-blue hover:underline font-medium">Create one</button>
            </p>
          </>
        ) : (
          <>
            <h1 className="font-display font-bold text-2xl text-peak-text text-center mb-1">Create your account</h1>
            <p className="text-peak-text-secondary text-sm text-center mb-8">Join PeakXP and plan your perfect mountain trip.</p>

            <form onSubmit={handleAuth} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-peak-text-secondary mb-1">First name</label>
                  <input value={form.firstName} onChange={e => sf("firstName", e.target.value)} placeholder="Jane"
                    className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
                </div>
                <div>
                  <label className="block text-xs text-peak-text-secondary mb-1">Last name</label>
                  <input value={form.lastName} onChange={e => sf("lastName", e.target.value)} placeholder="Smith"
                    className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-peak-text-secondary mb-1">Email</label>
                <input type="email" value={form.email} onChange={e => sf("email", e.target.value)} placeholder="jane@email.com"
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
              </div>
              <div>
                <label className="block text-xs text-peak-text-secondary mb-1">Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} value={form.password} onChange={e => sf("password", e.target.value)} placeholder="••••••••"
                    className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 pr-10 text-sm text-peak-text outline-none focus:border-peak-blue" />
                  <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-peak-text-secondary hover:text-peak-text transition-colors">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs text-peak-text-secondary mb-1">Confirm password</label>
                <input type="password" value={form.confirmPassword} onChange={e => sf("confirmPassword", e.target.value)} placeholder="••••••••"
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-peak-text-secondary mb-1">Date of birth (optional)</label>
                  <input type="date" value={form.dob} onChange={e => sf("dob", e.target.value)}
                    className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
                </div>
                <div>
                  <label className="block text-xs text-peak-text-secondary mb-1">Home country</label>
                  <select value={form.country} onChange={e => sf("country", e.target.value)}
                    className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue">
                    <option value="">Select...</option>
                    {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs text-peak-text-secondary mb-2">Preferred discipline (optional)</label>
                <div className="flex flex-wrap gap-2">
                  {DISCIPLINES.map(d => (
                    <button key={d} type="button" onClick={() => toggleDisc(d)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${form.disciplines.includes(d) ? "bg-peak-blue/20 border-peak-blue/50 text-peak-blue" : "border-white/10 text-peak-text-secondary"}`}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <button type="button" onClick={() => sf("terms", !form.terms)}
                  className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${form.terms ? "bg-peak-blue border-peak-blue" : "border-white/20"}`}>
                  {form.terms && <Check className="h-3 w-3 text-white" />}
                </button>
                <span className="text-xs text-peak-text-secondary">I agree to the <span className="text-peak-blue">Terms of Service</span> and <span className="text-peak-blue">Privacy Policy</span></span>
              </label>
              <button type="submit" disabled={!form.terms}
                className="w-full py-3 bg-peak-red hover:bg-peak-red-hover disabled:opacity-40 text-white font-display font-bold text-sm rounded-xl transition-colors">
                Create account
              </button>
            </form>

            <p className="text-peak-text-secondary text-sm text-center mt-6">
              Already have an account?{" "}
              <button onClick={() => setMode("signin")} className="text-peak-blue hover:underline font-medium">Sign in</button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}