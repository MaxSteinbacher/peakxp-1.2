import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Menu, X, Bell, Mountain, Globe } from "lucide-react";
import NotificationsPanel from "./NotificationsPanel";

const SIMULATED_LOGGED_IN = true;

const navLinks = [

  { label: "Discovery", path: "/" },
  { label: "Trip Planning", path: "/trip-planning" },
  { label: "Expert Agents", path: "/agents" },
  { label: "My Trips", path: "/book" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "Community", path: "/community" },
];


const languages = [
  { code: "en", label: "EN", name: "English" },
  { code: "de", label: "DE", name: "Deutsch" },
  { code: "fr", label: "FR", name: "Français" },
  { code: "it", label: "IT", name: "Italiano" },
];

const CURRENCIES = [
  { code: "EUR", symbol: "€" },
  { code: "USD", symbol: "$" },
  { code: "CHF", symbol: "Fr" },
  { code: "GBP", symbol: "£" },
  { code: "NOK", symbol: "kr" },
  { code: "SEK", symbol: "kr" },
];


export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0]);
  const bellRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    function handleClick(e) {
      if (bellRef.current && !bellRef.current.contains(e.target)) setBellOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);


  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-peak-bg/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Mountain className="h-6 w-6 text-peak-red" />
            <span className="font-display font-bold text-xl tracking-wide text-peak-text">
              PEAK<span className="text-peak-red">XP</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === link.path
                    ? "text-peak-text bg-white/5"
                    : "text-peak-text-secondary hover:text-peak-text hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Bell */}
            <div className="relative" ref={bellRef}>
              <button onClick={() => setBellOpen(v => !v)} className="p-2 text-peak-text-secondary hover:text-peak-text transition-colors rounded-lg hover:bg-white/5 relative">
                <Bell className="h-5 w-5" />
                {!SIMULATED_LOGGED_IN && null}
                {SIMULATED_LOGGED_IN && <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-peak-red" />}
              </button>
              {bellOpen && SIMULATED_LOGGED_IN && <NotificationsPanel onClose={() => setBellOpen(false)} />}
              {bellOpen && !SIMULATED_LOGGED_IN && (
                <div className="absolute right-0 mt-2 w-72 bg-peak-card border border-white/10 rounded-xl p-4 shadow-xl z-50">
                  <p className="font-semibold text-peak-text text-sm mb-2">Stay in the loop</p>
                  <input type="email" placeholder="Enter your email for alerts" className="w-full bg-peak-surface border border-white/10 rounded-xl px-3 py-2 text-sm text-peak-text outline-none focus:border-peak-blue mb-2" />
                  <button className="w-full py-2 bg-peak-red hover:bg-peak-red-hover text-white text-sm font-semibold rounded-xl transition-colors mb-1">Notify me</button>
                  <p className="text-xs text-peak-text-secondary text-center">No spam. Unsubscribe anytime.</p>
                </div>
              )}
            </div>

            {/* Currency selector */}
            <div className="relative">
              <button onClick={() => { setCurrencyOpen(v => !v); setLangOpen(false); }}
                className="flex items-center gap-1 px-2.5 py-2 text-sm font-medium text-peak-text-secondary hover:text-peak-text border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
                {selectedCurrency.code}
              </button>
              {currencyOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-peak-card border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
                  {CURRENCIES.map(c => (
                    <button key={c.code} onClick={() => { setSelectedCurrency(c); setCurrencyOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${selectedCurrency.code === c.code ? "text-peak-blue bg-peak-blue/10" : "text-peak-text-secondary hover:text-peak-text hover:bg-white/5"}`}>
                      <span className="font-semibold mr-2">{c.symbol}</span>{c.code}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language selector */}
            <div className="relative">
              <button onClick={() => { setLangOpen(v => !v); setCurrencyOpen(false); }}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-peak-text-secondary hover:text-peak-text border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
                <Globe className="h-4 w-4" />{selectedLang.label}
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-peak-card border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
                  {languages.map(lang => (
                    <button key={lang.code} onClick={() => { setSelectedLang(lang); setLangOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${selectedLang.code === lang.code ? "text-peak-blue bg-peak-blue/10" : "text-peak-text-secondary hover:text-peak-text hover:bg-white/5"}`}>
                      <span className="font-semibold mr-2">{lang.label}</span>{lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {SIMULATED_LOGGED_IN ? (
              <div className="w-9 h-9 rounded-full bg-peak-blue/20 text-peak-blue font-bold text-sm flex items-center justify-center cursor-pointer hover:bg-peak-blue/30 transition-colors">
                YO
              </div>
            ) : (
              <>
                <button className="px-4 py-2 text-sm font-medium text-peak-blue border border-peak-blue/30 rounded-lg hover:bg-peak-blue/10 transition-colors">Sign in</button>
                <Link to="/dashboard" className="px-4 py-2 text-sm font-semibold text-white bg-peak-red hover:bg-peak-red-hover rounded-lg transition-colors">Get started</Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-peak-text-secondary hover:text-peak-text"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-peak-surface border-t border-white/5">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? "text-peak-text bg-white/5"
                    : "text-peak-text-secondary hover:text-peak-text"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-white/5 flex gap-3">
              <button className="flex-1 px-4 py-2.5 text-sm font-medium text-peak-blue border border-peak-blue/30 rounded-lg">
                Sign in
              </button>
              <Link
                to="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-peak-red rounded-lg text-center"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}