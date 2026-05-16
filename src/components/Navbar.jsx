import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Menu, X, Bell, Mountain, Globe, Activity } from "lucide-react";
import NotificationsPanel from "./NotificationsPanel";
import { useAppAuth } from "../context/AppAuthContext";
import { useLanguage } from "../context/LanguageContext";
import { useT } from "../lib/i18n";

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
  const { isLoggedIn, user, logout } = useAppAuth();
  const { lang, setLang } = useLanguage();
  const t = useT();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0]);
  const bellRef = useRef(null);
  const avatarRef = useRef(null);
  const location = useLocation();

  const selectedLang = languages.find(l => l.code === lang) || languages[0];

  const ALL_NAV_LINKS = [
    { key: "nav_discovery", path: "/" },
    { key: "nav_trip_planning", path: "/trip-planning" },
    { key: "nav_expert_agents", path: "/agents" },
    { key: "nav_peak_tracking", path: "/tracking", icon: Activity, authOnly: true },
    { key: "nav_community", path: "/community" },
  ];

  const navLinks = ALL_NAV_LINKS.filter(l => !l.authOnly || isLoggedIn);

  const initials = user ? `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase() : "";

  useEffect(() => {
    function handleClick(e) {
      if (bellRef.current && !bellRef.current.contains(e.target)) setBellOpen(false);
      if (avatarRef.current && !avatarRef.current.contains(e.target)) setAvatarOpen(false);
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
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = link.path === "/tracking"
                ? location.pathname.startsWith("/tracking")
                : location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? "text-peak-text bg-white/5"
                      : "text-peak-text-secondary hover:text-peak-text hover:bg-white/5"
                  }`}
                >
                  {Icon && <Icon className="h-3.5 w-3.5" />}
                  {t(link.key)}
                </Link>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Bell */}
            <div className="relative" ref={bellRef}>
              <button onClick={() => setBellOpen(v => !v)} className="p-2 text-peak-text-secondary hover:text-peak-text transition-colors rounded-lg hover:bg-white/5 relative">
                <Bell className="h-5 w-5" />
                {isLoggedIn && <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-peak-red" />}
              </button>
              {bellOpen && isLoggedIn && <NotificationsPanel onClose={() => setBellOpen(false)} />}
              {bellOpen && !isLoggedIn && (
                <div className="absolute right-0 mt-2 w-72 bg-peak-card border border-white/10 rounded-xl p-4 shadow-xl z-50">
                  <p className="font-semibold text-peak-text text-sm mb-2">Stay in the loop</p>
                  <input type="email" placeholder="Enter your email for alerts" className="w-full bg-peak-surface border border-white/10 rounded-xl px-3 py-2 text-sm text-peak-text outline-none focus:border-peak-blue mb-2" />
                  <button className="w-full py-2 bg-peak-red hover:bg-peak-red-hover text-white text-sm font-semibold rounded-xl transition-colors mb-1">Notify me</button>
                  <p className="text-xs text-peak-text-secondary text-center">No spam. Unsubscribe anytime.</p>
                </div>
              )}
            </div>

            {/* Currency */}
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

            {/* Language */}
            <div className="relative">
              <button onClick={() => { setLangOpen(v => !v); setCurrencyOpen(false); }}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-peak-text-secondary hover:text-peak-text border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
                <Globe className="h-4 w-4" />{selectedLang.label}
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-peak-card border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
                  {languages.map(l => (
                    <button key={l.code} onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${lang === l.code ? "text-peak-blue bg-peak-blue/10" : "text-peak-text-secondary hover:text-peak-text hover:bg-white/5"}`}>
                      <span className="font-semibold mr-2">{l.label}</span>{l.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Avatar / auth */}
            {isLoggedIn ? (
              <div className="relative" ref={avatarRef}>
                <button onClick={() => setAvatarOpen(v => !v)}
                  className="w-9 h-9 rounded-full bg-peak-red flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0">
                  {user?.avatar
                    ? <img src={user.avatar} alt="" className="w-full h-full object-cover rounded-full" />
                    : <span className="text-white text-sm font-bold">{initials}</span>}
                </button>
                {avatarOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-peak-card border border-white/10 rounded-2xl shadow-xl p-2 z-50">
                    <div className="px-3 py-2 mb-1">
                      <p className="text-sm font-semibold text-peak-text">{user?.firstName} {user?.lastName}</p>
                      <p className="text-xs text-peak-text-secondary truncate">{user?.email}</p>
                    </div>
                    <div className="h-px bg-white/5 mb-1" />
                    {[
                      [t("my_profile"), "/profile"],
                      [t("my_trips"), "/my-trips"],
                      ["Peak Log", "/tracking/log"],
                      [t("settings"), "/profile/settings"],
                    ].map(([label, path]) => (
                      <button key={path} onClick={() => { navigate(path); setAvatarOpen(false); }}
                        className="w-full text-left px-3 py-2.5 text-sm text-peak-text-secondary hover:text-peak-text hover:bg-white/5 rounded-xl transition-colors">
                        {label}
                      </button>
                    ))}
                    <div className="h-px bg-white/5 my-1" />
                    <button onClick={() => { logout(); setAvatarOpen(false); }}
                      className="w-full text-left px-3 py-2.5 text-sm text-peak-red hover:bg-peak-red/10 rounded-xl transition-colors">
                      {t("sign_out")}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/auth" className="border border-white/10 text-peak-text-secondary hover:text-peak-text px-4 py-2 rounded-lg text-sm font-medium transition-colors">{t("sign_in")}</Link>
                <Link to="/auth" className="bg-peak-red text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-peak-red-hover transition-colors">{t("get_started")}</Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-peak-text-secondary hover:text-peak-text">
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-peak-surface border-t border-white/5">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.path ? "text-peak-text bg-white/5" : "text-peak-text-secondary hover:text-peak-text"
                }`}>
                {t(link.key)}
              </Link>
            ))}
            <div className="pt-3 border-t border-white/5 flex gap-3">
              {isLoggedIn ? (
                <button onClick={() => { logout(); setMobileOpen(false); }}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-peak-red border border-peak-red/30 rounded-lg">
                  {t("sign_out")}
                </button>
              ) : (
                <>
                  <Link to="/auth" onClick={() => setMobileOpen(false)} className="flex-1 px-4 py-2.5 text-sm font-medium text-peak-text-secondary border border-white/10 rounded-lg text-center">{t("sign_in")}</Link>
                  <Link to="/auth" onClick={() => setMobileOpen(false)} className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-peak-red rounded-lg text-center">{t("get_started")}</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}