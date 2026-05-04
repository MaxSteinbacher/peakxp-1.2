import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, X } from "lucide-react";
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

  const [socialModal, setSocialModal] = useState(null); // "Google" | "Apple" | "Facebook" | null
  const [socialForm, setSocialForm] = useState({ email: "", firstName: "", lastName: "", password: "" });
  const [socialError, setSocialError] = useState("");

  function handleSocialLogin(provider) {
    setSocialForm({ email: "", firstName: "", lastName: "", password: "" });
    setSocialError("");
    setSocialModal(provider);
  }

  function handleSocialSubmit(e) {
    e.preventDefault();
    if (!socialForm.email.includes("@")) { setSocialError("Enter a valid email."); return; }
    if (!socialForm.firstName.trim()) { setSocialError("Enter your first name."); return; }
    const accounts = JSON.parse(localStorage.getItem("peakxp_accounts") || "[]");
    const existing = accounts.find(a => a.email === socialForm.email);
    if (existing) {
      const { password: _p, ...safeUser } = existing;
      login(safeUser);
      setSocialModal(null);
      navigate("/dashboard");
      return;
    }
    const newUser = { id: String(Date.now()), firstName: socialForm.firstName, lastName: socialForm.lastName || "", email: socialForm.email, password: "__social__", country: "", provider: socialModal, createdAt: new Date().toISOString(), avatar: null };
    accounts.push(newUser);
    localStorage.setItem("peakxp_accounts", JSON.stringify(accounts));
    const { password: _p, ...safeUser } = newUser;
    login(safeUser);
    setSocialModal(null);
    navigate("/profile/setup");
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
      {/* Social OAuth Modal */}
      {socialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                {socialModal === "Google" && <GoogleIcon />}
                {socialModal === "Apple" && <AppleIcon />}
                {socialModal === "Facebook" && <FacebookIcon />}
                <span className="font-semibold text-gray-800 text-sm">Sign in with {socialModal}</span>
              </div>
              <button onClick={() => setSocialModal(null)} className="text-gray-400 hover:text-gray-600"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleSocialSubmit} className="p-5 space-y-4">
              <p className="text-xs text-gray-500">{socialModal} will share your name and email address with PeakXP.</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">First name</label>
                  <input value={socialForm.firstName} onChange={e => setSocialForm(f => ({ ...f, firstName: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-400" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Last name</label>
                  <input value={socialForm.lastName} onChange={e => setSocialForm(f => ({ ...f, lastName: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-400" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Email address</label>
                <input type="email" value={socialForm.email} onChange={e => setSocialForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-400" placeholder="you@example.com" />
              </div>
              {socialError && <p className="text-xs text-red-500">{socialError}</p>}
              <button type="submit" className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors">Continue</button>
            </form>
          </div>
        </div>
      )}
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

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
      <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/>
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 814 1000" fill="currentColor" className="text-gray-900">
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-47.4-148.2-112.7C46.3 742.5 0 636.1 0 532.2 0 325.1 136.4 214.1 270.5 214.1c67.1 0 123.1 44.2 164.1 44.2 38.9 0 101.1-46.7 176.3-46.7 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
    </svg>
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
        <button type="button" onClick={() => onSocial("Google")}
          className="py-2.5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/5 transition-colors">
          <GoogleIcon />
        </button>
        <button type="button" onClick={() => onSocial("Apple")}
          className="py-2.5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/5 transition-colors">
          <AppleIcon />
        </button>
        <button type="button" onClick={() => onSocial("Facebook")}
          className="py-2.5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/5 transition-colors">
          <FacebookIcon />
        </button>
      </div>
    </>
  );
}