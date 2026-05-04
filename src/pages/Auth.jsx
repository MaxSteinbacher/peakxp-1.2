import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAppAuth } from "../context/AppAuthContext";

function PasswordStrength({ password }) {
  const score = [password.length >= 8, /[A-Z]/.test(password), /[0-9]/.test(password), /[^a-zA-Z0-9]/.test(password)].filter(Boolean).length;
  const colors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500"];
  const labels = ["Weak", "Fair", "Good", "Strong"];
  if (!password) return null;
  return (
    <div className="mt-1.5">
      <div className="flex gap-1 mb-1">
        {[0,1,2,3].map(i => (
          <div key={i} className={`h-1 flex-1 rounded-full ${i < score ? colors[score - 1] : "bg-white/10"}`} />
        ))}
      </div>
      <p className="text-xs text-peak-text-secondary">{labels[score - 1] || "Too short"}</p>
    </div>
  );
}

const COUNTRIES = ["Austria","France","Germany","Italy","Norway","Sweden","Switzerland","United Kingdom","United States","Other"];

export default function Auth() {
  const { isLoggedIn, login } = useAppAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("login");
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [forgotMsg, setForgotMsg] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [loginFieldErrors, setLoginFieldErrors] = useState({});
  const [regForm, setRegForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "", country: "", terms: false });
  const [regErrors, setRegErrors] = useState({});
  const [regError, setRegError] = useState("");

  useEffect(() => {
    if (isLoggedIn) navigate("/dashboard");
  }, [isLoggedIn]);

  function handleLoginSubmit(e) {
    e.preventDefault();
    const errs = {};
    if (!loginForm.email || !loginForm.email.includes("@")) errs.email = "Please enter a valid email.";
    if (!loginForm.password) errs.password = "Please enter your password.";
    if (Object.keys(errs).length) { setLoginFieldErrors(errs); return; }
    setLoginFieldErrors({});

    const accounts = JSON.parse(localStorage.getItem("peakxp_accounts") || "[]");
    const found = accounts.find(a => a.email === loginForm.email && a.password === loginForm.password);
    if (!found) { setLoginError("No account found with these details. Check your email and password."); return; }
    setLoginError("");
    const { password: _p, ...safeUser } = found;
    login(safeUser);
    const redirect = sessionStorage.getItem("peakxp_redirect") || "/dashboard";
    sessionStorage.removeItem("peakxp_redirect");
    navigate(redirect);
  }

  function handleSocialLogin(provider) {
    const userData = { id: String(Date.now()), firstName: provider, lastName: "User", email: `${provider.toLowerCase()}@social.peakxp`, createdAt: new Date().toISOString(), avatar: null };
    login(userData);
    navigate("/dashboard");
  }

  function handleRegisterSubmit(e) {
    e.preventDefault();
    const errs = {};
    if (!regForm.firstName.trim()) errs.firstName = "Required";
    if (!regForm.lastName.trim()) errs.lastName = "Required";
    if (!regForm.email || !regForm.email.includes("@")) errs.email = "Valid email required";
    if (regForm.password.length < 8) errs.password = "At least 8 characters";
    if (regForm.password !== regForm.confirmPassword) errs.confirmPassword = "Passwords do not match";
    if (!regForm.terms) errs.terms = "You must agree to continue";
    if (Object.keys(errs).length) { setRegErrors(errs); return; }
    setRegErrors({});

    const accounts = JSON.parse(localStorage.getItem("peakxp_accounts") || "[]");
    if (accounts.find(a => a.email === regForm.email)) { setRegError("An account with this email already exists."); return; }

    const newUser = { id: String(Date.now()), firstName: regForm.firstName, lastName: regForm.lastName, email: regForm.email, password: regForm.password, country: regForm.country, createdAt: new Date().toISOString(), avatar: null };
    accounts.push(newUser);
    localStorage.setItem("peakxp_accounts", JSON.stringify(accounts));
    const { password: _p, ...safeUser } = newUser;
    login(safeUser);
    navigate("/profile/setup");
  }

  return (
    <div className="min-h-screen bg-peak-bg flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-peak-card border border-white/5 rounded-2xl p-8">
        <div className="text-center mb-6">
          <h1 className="font-display font-extrabold text-2xl text-peak-text">PEAK<span className="text-peak-red">XP</span></h1>
          <p className="text-peak-text-secondary text-sm mt-1">The mountain, unified.</p>
        </div>

        {/* Tab toggle */}
        <div className="flex bg-peak-surface rounded-xl p-1 mb-6">
          {["login", "register"].map(t => (
            <button key={t} onClick={() => setTab(t)} className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${tab === t ? "bg-peak-red text-white" : "text-peak-text-secondary hover:text-peak-text"}`}>
              {t === "login" ? "Sign in" : "Create account"}
            </button>
          ))}
        </div>

        {tab === "login" ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-peak-text-secondary mb-1">Email</label>
              <input type="email" value={loginForm.email} onChange={e => setLoginForm(f => ({ ...f, email: e.target.value }))}
                className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" placeholder="you@example.com" />
              {loginFieldErrors.email && <p className="text-xs text-peak-red mt-1">{loginFieldErrors.email}</p>}
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs text-peak-text-secondary">Password</label>
                <button type="button" onClick={() => setForgotMsg(v => !v)} className="text-xs text-peak-blue hover:underline">Forgot password?</button>
              </div>
              <div className="relative">
                <input type={showPw ? "text" : "password"} value={loginForm.password} onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))}
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue pr-10" placeholder="••••••••" />
                <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-peak-text-secondary">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {loginFieldErrors.password && <p className="text-xs text-peak-red mt-1">{loginFieldErrors.password}</p>}
              {forgotMsg && <p className="text-xs text-peak-text-secondary mt-1">Password reset coming soon.</p>}
            </div>
            {loginError && <p className="text-xs text-peak-red">{loginError}</p>}
            <button type="submit" className="w-full py-3 bg-peak-red hover:bg-peak-red-hover text-white font-bold rounded-xl transition-colors">Sign in</button>
            <SocialDivider onSocial={handleSocialLogin} />
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-peak-text-secondary mb-1">First name</label>
                <input value={regForm.firstName} onChange={e => setRegForm(f => ({ ...f, firstName: e.target.value }))}
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-3 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
                {regErrors.firstName && <p className="text-xs text-peak-red mt-0.5">{regErrors.firstName}</p>}
              </div>
              <div>
                <label className="block text-xs text-peak-text-secondary mb-1">Last name</label>
                <input value={regForm.lastName} onChange={e => setRegForm(f => ({ ...f, lastName: e.target.value }))}
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-3 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
                {regErrors.lastName && <p className="text-xs text-peak-red mt-0.5">{regErrors.lastName}</p>}
              </div>
            </div>
            <div>
              <label className="block text-xs text-peak-text-secondary mb-1">Email</label>
              <input type="email" value={regForm.email} onChange={e => setRegForm(f => ({ ...f, email: e.target.value }))}
                className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
              {regErrors.email && <p className="text-xs text-peak-red mt-1">{regErrors.email}</p>}
            </div>
            <div>
              <label className="block text-xs text-peak-text-secondary mb-1">Password</label>
              <div className="relative">
                <input type={showPw ? "text" : "password"} value={regForm.password} onChange={e => setRegForm(f => ({ ...f, password: e.target.value }))}
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue pr-10" />
                <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-peak-text-secondary">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <PasswordStrength password={regForm.password} />
              {regErrors.password && <p className="text-xs text-peak-red mt-1">{regErrors.password}</p>}
            </div>
            <div>
              <label className="block text-xs text-peak-text-secondary mb-1">Confirm password</label>
              <div className="relative">
                <input type={showPw2 ? "text" : "password"} value={regForm.confirmPassword} onChange={e => setRegForm(f => ({ ...f, confirmPassword: e.target.value }))}
                  className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue pr-10" />
                <button type="button" onClick={() => setShowPw2(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-peak-text-secondary">
                  {showPw2 ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {regErrors.confirmPassword && <p className="text-xs text-peak-red mt-1">{regErrors.confirmPassword}</p>}
            </div>
            <div>
              <label className="block text-xs text-peak-text-secondary mb-1">Home country</label>
              <select value={regForm.country} onChange={e => setRegForm(f => ({ ...f, country: e.target.value }))}
                className="w-full bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue">
                <option value="">Select country</option>
                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" checked={regForm.terms} onChange={e => setRegForm(f => ({ ...f, terms: e.target.checked }))} className="mt-0.5 accent-peak-red" />
              <span className="text-xs text-peak-text-secondary">I agree to the <span className="text-peak-blue">Terms of Service</span> and <span className="text-peak-blue">Privacy Policy</span></span>
            </label>
            {regErrors.terms && <p className="text-xs text-peak-red">{regErrors.terms}</p>}
            {regError && <p className="text-xs text-peak-red">{regError}</p>}
            <button type="submit" className="w-full py-3 bg-peak-red hover:bg-peak-red-hover text-white font-bold rounded-xl transition-colors">Create account</button>
            <SocialDivider onSocial={handleSocialLogin} />
          </form>
        )}
      </div>
    </div>
  );
}

function SocialDivider({ onSocial }) {
  return (
    <>
      <div className="flex items-center gap-3 my-4">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-xs text-peak-text-secondary">or continue with</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[["Google","G"],["Apple","A"],["Facebook","f"]].map(([p, icon]) => (
          <button key={p} type="button" onClick={() => onSocial(p)}
            className="py-2.5 border border-white/10 rounded-xl text-sm text-peak-text-secondary hover:text-peak-text hover:bg-white/5 transition-colors font-semibold">
            {icon} {p}
          </button>
        ))}
      </div>
    </>
  );
}