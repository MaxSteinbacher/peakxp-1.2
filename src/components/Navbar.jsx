import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Bell, User, Mountain } from "lucide-react";

const navLinks = [
  { label: "Discover", path: "/" },
  { label: "My Trips", path: "/book" },
  { label: "Community", path: "/search" },
  { label: "Dashboard", path: "/dashboard" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

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
            <button className="p-2 text-peak-text-secondary hover:text-peak-text transition-colors rounded-lg hover:bg-white/5">
              <Bell className="h-5 w-5" />
            </button>
            <button className="p-2 text-peak-text-secondary hover:text-peak-text transition-colors rounded-lg hover:bg-white/5">
              <User className="h-5 w-5" />
            </button>
            <button className="px-4 py-2 text-sm font-medium text-peak-blue border border-peak-blue/30 rounded-lg hover:bg-peak-blue/10 transition-colors">
              Sign in
            </button>
            <Link
              to="/dashboard"
              className="px-4 py-2 text-sm font-semibold text-white bg-peak-red hover:bg-peak-red-hover rounded-lg transition-colors"
            >
              Get started
            </Link>
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