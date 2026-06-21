import { useState } from "react";
import { useAppAuth } from "../../context/AppAuthContext";
import { getInfrastructureBadges, COMMUNITY_BADGES, getActiveCommunityBadges, getUserVote, castVote, getCommunityBadgeThreshold } from "../../lib/badges";

export function BadgePill({ badge, size = "sm", showCount = false }) {
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", gap:6,
      background:`${badge.color}18`, border:`1px solid ${badge.color}35`,
      borderRadius:100, padding: size==="lg" ? "6px 12px" : "4px 10px",
      fontSize: size==="lg" ? 13 : 11, fontWeight:600, color:badge.color,
      whiteSpace:"nowrap",
    }}>
      <span style={{fontSize:size==="lg"?15:13}}>{badge.icon}</span>
      {badge.label}
      {showCount && badge.votes > 0 && (
        <span style={{opacity:0.6,fontWeight:400,fontSize:10}}>·{badge.votes}</span>
      )}
    </span>
  );
}

function VoteModal({ resort, user, onClose }) {
  const prevVote = getUserVote(resort.id, user?.id);
  const [selected, setSelected] = useState(new Set(prevVote?.badgeIds || []));
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const categories = {};
  COMMUNITY_BADGES.forEach(b => {
    if (!categories[b.category]) categories[b.category] = [];
    categories[b.category].push(b);
  });
  const CAT_LABELS = { terrain:"Terrain & Snow", family:"Family & Learning", lifestyle:"Lifestyle & Après", value:"Value", operations:"Lift Operations", special:"Special Awards" };

  function toggle(id) {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else {
        if (next.size >= 5) { setError("Maximum 5 badges per resort"); return prev; }
        next.add(id);
      }
      setError(""); return next;
    });
  }

  function handleSave() {
    const result = castVote(resort.id, user?.id, [...selected], true);
    if (result.success) { setSaved(true); setTimeout(onClose, 1200); }
    else setError(result.error);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm px-4 pb-4" onClick={onClose}>
      <div className="bg-peak-surface border border-white/10 rounded-2xl w-full max-w-lg max-h-[80vh] overflow-hidden" onClick={e=>e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <div>
            <p className="text-peak-text font-bold">Vote for {resort.name}</p>
            <p className="text-peak-text-secondary text-xs mt-0.5">Select up to 5 badges · {selected.size}/5 chosen</p>
          </div>
          <button onClick={onClose} className="text-peak-text-secondary hover:text-peak-text text-xl">×</button>
        </div>
        <div className="overflow-y-auto p-5 space-y-5" style={{maxHeight:"55vh"}}>
          {Object.entries(categories).map(([cat, badges]) => (
            <div key={cat}>
              <p className="text-peak-text-secondary text-xs font-semibold uppercase tracking-wider mb-2">{CAT_LABELS[cat]||cat}</p>
              <div className="flex flex-wrap gap-2">
                {badges.map(b => {
                  const active = selected.has(b.id);
                  return (
                    <button key={b.id} onClick={()=>toggle(b.id)} style={{
                      display:"inline-flex",alignItems:"center",gap:6,
                      padding:"6px 12px",borderRadius:100,fontSize:12,fontWeight:600,
                      border:`1px solid ${active?b.color+"80":"rgba(255,255,255,0.1)"}`,
                      background: active?`${b.color}20`:"transparent",
                      color: active?b.color:"rgba(255,255,255,0.5)",
                      cursor:"pointer",transition:"all 0.15s",
                    }}>
                      <span>{b.icon}</span>{b.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="px-5 py-4 border-t border-white/5">
          {error && <p className="text-peak-red text-xs mb-3">{error}</p>}
          {saved && <p className="text-green-400 text-xs mb-3">✓ Votes saved!</p>}
          <button onClick={handleSave} disabled={selected.size===0}
            className="w-full bg-peak-red text-white py-2.5 rounded-xl font-semibold text-sm disabled:opacity-40">
            Save votes
          </button>
          <p className="text-peak-text-secondary text-xs text-center mt-2">You can update your votes anytime. One vote per resort.</p>
        </div>
      </div>
    </div>
  );
}

export function CommunityBadgesSection({ resort }) {
  const { user, isLoggedIn } = useAppAuth();
  const [showVoteModal, setShowVoteModal] = useState(false);
  const activeBadges = getActiveCommunityBadges(resort.id);
  const threshold = getCommunityBadgeThreshold(resort);
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-peak-text font-semibold text-sm">Community badges</p>
        {isLoggedIn && (
          <button onClick={() => setShowVoteModal(true)} className="text-peak-blue text-xs font-medium hover:underline">
            {getUserVote(resort.id, user?.id) ? "Edit votes" : "+ Vote"}
          </button>
        )}
      </div>
      {activeBadges.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {activeBadges.map(b => <BadgePill key={b.id} badge={b} showCount={true} />)}
        </div>
      ) : (
        <p className="text-peak-text-secondary text-xs">
          No community badges yet — needs {threshold}+ verified votes per category.{" "}
          {isLoggedIn ? "Be the first to vote!" : <span className="text-peak-blue cursor-pointer">Log in to vote.</span>}
        </p>
      )}
      {showVoteModal && <VoteModal resort={resort} user={user} onClose={() => setShowVoteModal(false)} />}
    </div>
  );
}

export default function ResortBadgesPanel({ resort }) {
  const infraBadges = getInfrastructureBadges(resort);
  return (
    <div className="bg-peak-surface border border-white/5 rounded-2xl p-5 space-y-6">
      <h3 className="font-display font-bold text-base text-peak-text">Resort Badges</h3>
      {infraBadges.length > 0 && (
        <div>
          <p className="text-peak-text-secondary text-xs font-semibold uppercase tracking-wider mb-3">Infrastructure</p>
          <div className="flex flex-wrap gap-2">
            {infraBadges.map(b => <BadgePill key={b.id} badge={b} />)}
          </div>
        </div>
      )}
      <CommunityBadgesSection resort={resort} />
      <p className="text-peak-text-secondary text-xs border-t border-white/5 pt-3">
        Community badges require verified visit data. Ratings from{" "}
        <a href="https://www.skiresort.de" target="_blank" rel="noopener noreferrer" className="text-peak-blue hover:underline">skiresort.de</a>.
      </p>
    </div>
  );
}
