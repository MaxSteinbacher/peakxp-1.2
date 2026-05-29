import { useEffect, useState } from "react";
import { useT } from "../lib/i18n";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

export default function TripConfirmed() {
  const t = useT();
  const [trip, setTrip] = useState(null);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const bookings = JSON.parse(localStorage.getItem("peakxp_bookings") || "[]");
    if (bookings.length > 0) {
      setTrip(bookings[bookings.length - 1]);
    }
    const timer = setTimeout(() => setShowConfetti(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-peak-bg flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        {/* Confetti container */}
        <div className="relative mb-8">
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {Array.from({ length: 24 }).map((_, i) => {
                const colors = ["bg-peak-red", "bg-peak-blue", "bg-white", "bg-peak-green"];
                const angle = (i / 24) * 360;
                const distance = 60 + Math.random() * 40;
                const size = 4 + Math.random() * 6;
                const delay = Math.random() * 0.3;
                return (
                  <div
                    key={i}
                    className={`absolute left-1/2 top-1/2 rounded-sm ${colors[i % colors.length]}`}
                    style={{
                      width: size, height: size,
                      animation: `confetti-burst 1.5s ${delay}s ease-out forwards`,
                      "--angle": `${angle}deg`,
                      "--distance": `${distance}px`,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                );
              })}
            </div>
          )}
          <div className="w-24 h-24 rounded-full bg-peak-green/20 flex items-center justify-center mx-auto relative z-10">
            <Check className="h-12 w-12 text-peak-green" strokeWidth={3} />
          </div>
        </div>

        <h1 className="font-display font-extrabold text-4xl text-peak-text mb-3">Your trip is booked!</h1>
        <p className="text-peak-text-secondary text-sm mb-8">
          All your bookings are confirmed. Check My Trips for details, QR codes and manage everything in one place.
        </p>

        {/* Trip summary card */}
        {trip && (
          <div className="bg-peak-card border border-white/5 rounded-2xl p-6 mb-8 text-left">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{trip.destination?.flag}</span>
              <span className="text-peak-text font-semibold">{trip.destination?.label}</span>
            </div>
            {trip.dates?.start && (
              <p className="text-peak-text-secondary text-sm mb-2">
                {new Date(trip.dates.start).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                {trip.dates.end && ` → ${new Date(trip.dates.end).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`}
              </p>
            )}
            {trip.resorts && trip.resorts.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {trip.resorts.map(r => (
                  <span key={r.resortId} className="bg-peak-surface text-peak-text text-xs px-2.5 py-1 rounded-full">
                    {r.resortFlag} {r.resortName}
                  </span>
                ))}
              </div>
            )}
            <div className="border-t border-white/5 pt-3 mt-3 flex justify-between">
              <span className="text-peak-text-secondary text-sm">Total paid</span>
              <span className="text-peak-text font-bold text-lg">€{trip.totalPaid?.toLocaleString()}</span>
            </div>
            {trip.bookings && (
              <div className="mt-3 space-y-1">
                {trip.bookings.map(b => (
                  <p key={b.id} className="text-peak-text-secondary text-xs">
                    Ref: <span className="text-peak-blue font-medium">{b.id}</span> — {b.label}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/dashboard" className="bg-peak-red hover:bg-peak-red-hover text-white font-bold px-8 py-3 rounded-xl transition-colors">
            View in My Trips
          </Link>
          <Link to="/" className="border border-white/10 text-peak-text-secondary px-8 py-3 rounded-xl hover:text-peak-text transition-colors">
            Plan another trip
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes confetti-burst {
          0% { transform: translate(-50%, -50%) rotate(0deg) scale(1); opacity: 1; }
          100% {
            transform: translate(
              calc(-50% + cos(var(--angle)) * var(--distance)),
              calc(-50% + sin(var(--angle)) * var(--distance))
            ) rotate(720deg) scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}