import { useState } from "react";
import { Copy, Check } from "lucide-react";

const TYPE_COLORS = {
  Race: "bg-peak-red/20 text-peak-red",
  Festival: "bg-purple-500/20 text-purple-400",
  Concert: "bg-pink-500/20 text-pink-400",
  Family: "bg-peak-green/20 text-peak-green",
  "Après-ski": "bg-yellow-500/20 text-yellow-400",
  Competition: "bg-peak-blue/20 text-peak-blue",
};

function PromoCode({ code }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <button onClick={copy} className="flex items-center gap-2 bg-peak-surface rounded px-3 py-1.5 font-mono text-sm text-peak-text border border-white/10 hover:border-white/25 transition-colors">
      <span>{code}</span>
      {copied ? <Check className="h-3.5 w-3.5 text-peak-green" /> : <Copy className="h-3.5 w-3.5 text-peak-text-secondary" />}
    </button>
  );
}

export default function EventsTab({ resort }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="space-y-6">
      {/* Events */}
      <div>
        <h3 className="font-display font-bold text-peak-text text-xl mb-4">Upcoming events</h3>
        <div className="space-y-3">
          {(resort.events || []).map(ev => (
            <div key={ev.name} className="bg-peak-card border border-white/5 rounded-xl p-5 flex gap-4">
              <div className="flex-shrink-0 text-center">
                <p className="text-peak-blue text-xs font-semibold">{ev.date.split(" ").slice(1).join(" ")}</p>
                <p className="font-display font-bold text-peak-text text-2xl">{ev.date.split(" ")[0]}</p>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <p className="font-display font-bold text-peak-text">{ev.name}</p>
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${TYPE_COLORS[ev.type] || "bg-white/10 text-peak-text-secondary"}`}>{ev.type}</span>
                </div>
                <p className="text-peak-text-secondary text-sm">{ev.desc}</p>
              </div>
              <button className="flex-shrink-0 text-xs text-peak-blue border border-peak-blue/30 px-3 py-1.5 rounded-lg hover:bg-peak-blue/10 transition-colors self-start">
                + Calendar
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Promotions */}
      <div>
        <h3 className="font-display font-bold text-peak-text text-xl mb-4">Promotional offers</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(resort.promotions || []).map(promo => (
            <div key={promo.headline} className="bg-peak-card border border-white/5 rounded-xl overflow-hidden">
              <div className="relative h-36 overflow-hidden">
                <img src={promo.image} alt={promo.headline} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-peak-bg via-peak-bg/20 to-transparent" />
                <span className="absolute top-3 left-3 bg-peak-green/90 text-white text-xs font-bold px-2.5 py-1 rounded-full">{promo.discount}</span>
                {promo.code && (
                  <div className="absolute bottom-3 left-3">
                    <span className="text-white/60 text-xs">Online exclusive</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="font-semibold text-peak-text mb-1">{promo.headline}</p>
                <p className="text-peak-text-secondary text-xs mb-3">{promo.validity}</p>
                {promo.code && (
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-peak-text-secondary text-xs">Promo code:</span>
                    <PromoCode code={promo.code} />
                  </div>
                )}
                <button className="w-full py-2 bg-peak-red hover:bg-peak-red-hover text-white text-sm font-semibold rounded-xl transition-colors">
                  Book now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Online exclusives */}
      <div className="bg-peak-card border border-white/5 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="font-display font-bold text-peak-text text-base">Online-exclusive offers</h3>
          <span className="bg-peak-blue/20 text-peak-blue text-xs font-semibold px-2.5 py-0.5 rounded-full">Online exclusive</span>
        </div>
        <div className="space-y-3">
          {[
            { label: "Book 7+ days online — free €30 equipment voucher", cta: "Book now" },
            { label: "Early season booking (before 1 Dec) — 10% off all passes", cta: "Book now" },
            { label: "Group of 6+ — complimentary guide for one day", cta: "Enquire" },
          ].map(offer => (
            <div key={offer.label} className="flex items-center justify-between bg-peak-surface rounded-xl p-3">
              <p className="text-peak-text text-sm flex-1 mr-3">{offer.label}</p>
              <button className="flex-shrink-0 text-xs text-peak-blue border border-peak-blue/30 px-3 py-1.5 rounded-lg hover:bg-peak-blue/10 transition-colors">{offer.cta}</button>
            </div>
          ))}
        </div>
      </div>

      {/* Resort newsletter signup */}
      <div className="bg-peak-card border border-white/5 rounded-xl p-5">
        <h3 className="font-display font-bold text-peak-text text-base mb-1">Get {resort.name} updates</h3>
        <p className="text-peak-text-secondary text-xs mb-4">Snow alerts, events, and exclusive offers direct to your inbox.</p>
        {subscribed ? (
          <p className="text-peak-green text-sm flex items-center gap-2"><Check className="h-4 w-4" /> You're subscribed!</p>
        ) : (
          <div className="flex gap-2">
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address"
              className="flex-1 bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
            <button onClick={() => email && setSubscribed(true)} disabled={!email}
              className="px-5 py-2.5 bg-peak-red hover:bg-peak-red-hover disabled:opacity-40 text-white text-sm font-semibold rounded-xl transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        )}
      </div>
    </div>
  );
}