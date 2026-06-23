import { useState, useRef } from "react";
import { useAppAuth } from "../context/AppAuthContext";
import { Heart, Flame, Snowflake, Trophy, Star, Mountain, Camera, Plus, Upload, ChevronRight, X, Check, Users, BarChart3, Award, Target, Filter, Globe, MapPin, Zap, ShoppingBag, Search, MessageCircle, ShoppingCart, Tag, ChevronLeft, ChevronDown, Send } from "lucide-react";
import { parseGPX, saveActivity, getActivities, getStats, getChallengeProgress, SYSTEM_CHALLENGES, createCustomChallenge, getLeaderboard } from "../lib/activityTracking";
import { USER_BADGES, getEarnedUserBadges } from "../lib/badges";

const REACTIONS = [
  { id:"heart",    icon:"❤️", label:"Love" },
  { id:"fire",     icon:"🔥", label:"Fire" },
  { id:"snow",     icon:"❄️", label:"Cold!" },
  { id:"ski",      icon:"⛷️", label:"Ski!" },
  { id:"trophy",   icon:"🏆", label:"Epic" },
  { id:"mountain", icon:"🏔️", label:"Stoked" },
  { id:"crystal",  icon:"💎", label:"Class" },
  { id:"ice",      icon:"🧊", label:"Icy" },
];

const TABS = [
  { id:"feed",       label:"Feed",         icon:Globe },
  { id:"challenges", label:"Challenges",   icon:Target },
  { id:"ranking",    label:"Rankings",     icon:BarChart3 },
  { id:"activities", label:"My Activities",icon:Mountain },
  { id:"marketplace", label:"Marketplace",   icon:ShoppingBag },
];

// ── Feed Post ─────────────────────────────────────────────────────────────────
function FeedPost({ post, currentUser, onReact, onComment, onGiveBadge }) {
  const [showReactions, setShowReactions] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [showBadgePanel, setShowBadgePanel] = useState(false);
  const peerBadges = USER_BADGES.filter(b => b.type === "peer");

  return (
    <div className="bg-peak-surface border border-white/5 rounded-2xl overflow-hidden mb-4">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3">
        <div className="w-9 h-9 rounded-full bg-peak-red/20 border border-peak-red/30 flex items-center justify-center text-sm font-bold text-peak-red flex-shrink-0">
          {post.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-peak-text font-semibold text-sm">{post.user}</p>
            {post.verified && <span className="text-peak-blue text-xs">✓</span>}
            {post.type === "activity" && post.resortName && (
              <span className="text-peak-text-secondary text-xs">at {post.resortName}</span>
            )}
          </div>
          <p className="text-peak-text-secondary text-xs">{post.time}</p>
        </div>
        {post.privacy && (
          <span className="text-peak-text-secondary text-xs border border-white/10 rounded-full px-2 py-0.5">
            {post.privacy === "public" ? "🌍" : "👥"} {post.privacy === "public" ? "Public" : "Friends"}
          </span>
        )}
      </div>

      {/* Activity stats */}
      {post.type === "activity" && post.stats && (
        <div className="mx-4 mb-3 bg-peak-card rounded-xl p-3 grid grid-cols-4 gap-2">
          {[
            { label:"Vertical", value:post.stats.verticalM ? `${(post.stats.verticalM/1000).toFixed(1)}km` : "—" },
            { label:"Distance", value:post.stats.distanceKm ? `${post.stats.distanceKm}km` : "—" },
            { label:"Duration", value:post.stats.durationMin ? `${Math.floor(post.stats.durationMin/60)}h${post.stats.durationMin%60}m` : "—" },
            { label:"Max speed", value:post.stats.maxSpeedKmh ? `${post.stats.maxSpeedKmh}km/h` : "—" },
          ].map(s => (
            <div key={s.label} className="text-center">
              <p className="text-peak-text font-bold text-sm">{s.value}</p>
              <p className="text-peak-text-secondary text-xs">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Challenge completion */}
      {post.type === "challenge" && (
        <div className="mx-4 mb-3 bg-peak-blue/10 border border-peak-blue/20 rounded-xl p-3 flex items-center gap-3">
          <span className="text-2xl">{post.challengeIcon || "🏆"}</span>
          <div>
            <p className="text-peak-text font-semibold text-sm">{post.challengeName}</p>
            <p className="text-peak-text-secondary text-xs">{post.challengeDesc}</p>
          </div>
          <span className="ml-auto text-green-400 font-bold text-sm">Completed!</span>
        </div>
      )}

      {/* Photo */}
      {post.photo && (
        <div className="relative">
          <img src={post.photo} alt="" className="w-full object-cover" style={{maxHeight:360}} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}

      {/* Caption */}
      {post.caption && (
        <p className="px-4 py-3 text-peak-text text-sm leading-relaxed">{post.caption}</p>
      )}

      {/* User badges received on this post */}
      {post.badgesReceived?.length > 0 && (
        <div className="px-4 pb-2 flex flex-wrap gap-1.5">
          {post.badgesReceived.map((b,i) => (
            <span key={i} style={{
              display:"inline-flex",alignItems:"center",gap:4,
              fontSize:11,fontWeight:600,padding:"3px 9px",borderRadius:100,
              background:`${b.color}18`,border:`1px solid ${b.color}30`,color:b.color,
            }}>
              {b.icon} {b.label}
            </span>
          ))}
        </div>
      )}

      {/* Action bar */}
      <div className="px-4 py-3 border-t border-white/5 flex items-center gap-4">
        {/* Reactions */}
        <div className="relative">
          <button onClick={() => setShowReactions(!showReactions)}
            className="flex items-center gap-1.5 text-peak-text-secondary hover:text-peak-text text-sm transition-colors">
            <span>{post.topReaction || "❤️"}</span>
            <span>{post.reactionCount || 0}</span>
          </button>
          {showReactions && (
            <div className="absolute bottom-8 left-0 z-20 bg-peak-surface border border-white/10 rounded-2xl p-2 flex gap-1 shadow-xl">
              {REACTIONS.map(r => (
                <button key={r.id} onClick={() => { onReact(post.id, r.id); setShowReactions(false); }}
                  className="text-xl p-1.5 hover:scale-125 transition-transform rounded-lg hover:bg-white/5"
                  title={r.label}>
                  {r.icon}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Comments */}
        <button onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1.5 text-peak-text-secondary hover:text-peak-text text-sm transition-colors">
          💬 <span>{post.commentCount || 0}</span>
        </button>

        {/* Give badge (friend-to-friend) */}
        {post.user !== currentUser?.name && (
          <button onClick={() => setShowBadgePanel(!showBadgePanel)}
            className="flex items-center gap-1.5 text-peak-text-secondary hover:text-peak-blue text-sm transition-colors ml-auto">
            <Award className="h-4 w-4" /> Give badge
          </button>
        )}
      </div>

      {/* Badge panel */}
      {showBadgePanel && (
        <div className="px-4 pb-4">
          <p className="text-peak-text-secondary text-xs mb-2">Award a peer badge to {post.user}:</p>
          <div className="flex flex-wrap gap-1.5">
            {peerBadges.map(b => (
              <button key={b.id} onClick={() => { onGiveBadge(post.id, post.user, b); setShowBadgePanel(false); }}
                style={{
                  display:"inline-flex",alignItems:"center",gap:5,
                  fontSize:11,fontWeight:600,padding:"4px 10px",borderRadius:100,
                  border:`1px solid ${b.color}40`, color:b.color,
                  background:`${b.color}12`, cursor:"pointer",
                }}>
                {b.icon} {b.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Comments */}
      {showComments && (
        <div className="px-4 pb-4 border-t border-white/5">
          <div className="space-y-2 mt-3 mb-3">
            {(post.comments || []).map((c,i) => (
              <div key={i} className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-peak-card flex items-center justify-center text-xs font-bold text-peak-text-secondary flex-shrink-0">
                  {c.user[0]}
                </div>
                <div className="bg-peak-card rounded-xl px-3 py-2 flex-1">
                  <p className="text-peak-text-secondary text-xs font-semibold">{c.user}</p>
                  <p className="text-peak-text text-sm">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={commentText} onChange={e=>setCommentText(e.target.value)}
              onKeyDown={e=>{ if(e.key==="Enter"&&commentText.trim()){onComment(post.id,commentText.trim());setCommentText("");}}}
              placeholder="Add a comment…"
              className="flex-1 bg-peak-card border border-white/10 rounded-xl px-3 py-2 text-sm text-peak-text outline-none focus:border-white/20 placeholder:text-peak-text-secondary/40"/>
            <button onClick={()=>{if(commentText.trim()){onComment(post.id,commentText.trim());setCommentText("");}}}
              disabled={!commentText.trim()}
              className="bg-peak-red text-white px-4 py-2 rounded-xl text-sm font-medium disabled:opacity-40">
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Create post modal ─────────────────────────────────────────────────────────
function CreatePostModal({ user, onClose, onPost }) {
  const [caption, setCaption] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const [photoUrl, setPhotoUrl] = useState("");
  const fileRef = useRef();

  function handleSubmit() {
    if (!caption.trim() && !photoUrl) return;
    onPost({
      id: `post_${Date.now()}`,
      type: "photo",
      user: user.name || user.displayName || "You",
      avatar: (user.name || "Y")[0].toUpperCase(),
      time: "Just now",
      caption,
      photo: photoUrl || null,
      privacy,
      reactionCount: 0, commentCount: 0, comments: [],
      reactions: {}, topReaction: "❤️",
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm px-4 pb-4" onClick={onClose}>
      <div className="bg-peak-surface border border-white/10 rounded-2xl w-full max-w-md" onClick={e=>e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <p className="text-peak-text font-bold">New post</p>
          <button onClick={onClose} className="text-peak-text-secondary hover:text-peak-text">×</button>
        </div>
        <div className="p-5 space-y-4">
          <textarea value={caption} onChange={e=>setCaption(e.target.value)} rows={3}
            placeholder="What's happening on the mountain?"
            className="w-full bg-peak-card border border-white/10 rounded-xl px-4 py-3 text-sm text-peak-text outline-none focus:border-white/20 resize-none placeholder:text-peak-text-secondary/40"/>
          <input value={photoUrl} onChange={e=>setPhotoUrl(e.target.value)}
            placeholder="Paste photo URL (optional)"
            className="w-full bg-peak-card border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-white/20 placeholder:text-peak-text-secondary/40"/>
          <div className="flex gap-2">
            {["public","friends"].map(p => (
              <button key={p} onClick={()=>setPrivacy(p)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-colors ${privacy===p?"border-peak-blue/50 bg-peak-blue/10 text-peak-blue":"border-white/10 text-peak-text-secondary"}`}>
                {p==="public"?"🌍 Public":"👥 Friends only"}
              </button>
            ))}
          </div>
        </div>
        <div className="px-5 pb-5">
          <button onClick={handleSubmit} disabled={!caption.trim()&&!photoUrl}
            className="w-full bg-peak-red text-white py-2.5 rounded-xl font-semibold text-sm disabled:opacity-40">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

// ── GPX Upload ────────────────────────────────────────────────────────────────
function GPXUpload({ user, onUploaded }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(null);
  const fileRef = useRef();

  async function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true); setError(""); setPreview(null);
    try {
      const text = await file.text();
      const activity = parseGPX(text);
      setPreview(activity);
    } catch(err) {
      setError(err.message);
    }
    setLoading(false);
  }

  function handleSave() {
    if (!preview) return;
    const saved = saveActivity(user.id, preview);
    onUploaded(saved);
    setPreview(null);
    fileRef.current.value = "";
  }

  return (
    <div className="bg-peak-surface border border-white/5 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-peak-text text-sm">Import activity</h3>
        <span className="text-peak-text-secondary text-xs">GPX format</span>
      </div>

      <div
        onClick={() => fileRef.current.click()}
        className="border-2 border-dashed border-white/10 hover:border-white/20 rounded-xl p-6 text-center cursor-pointer transition-colors mb-3">
        <Upload className="h-8 w-8 text-peak-text-secondary mx-auto mb-2"/>
        <p className="text-peak-text text-sm font-medium">Drop GPX file or click to upload</p>
        <p className="text-peak-text-secondary text-xs mt-1">From Garmin, Suunto, Apple, Polar, Wahoo</p>
      </div>
      <input ref={fileRef} type="file" accept=".gpx" className="hidden" onChange={handleFile}/>

      {loading && <p className="text-peak-text-secondary text-sm text-center">Parsing GPX…</p>}
      {error && <p className="text-peak-red text-sm">{error}</p>}

      {preview && (
        <div className="bg-peak-card rounded-xl p-4 space-y-3">
          <p className="text-peak-text font-semibold text-sm">{preview.name}</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              ["Date", preview.date],
              ["Vertical", `${(preview.totalDescentM/1000).toFixed(2)}km ↓`],
              ["Distance", `${preview.distanceKm}km`],
              ["Duration", `${Math.floor(preview.durationMin/60)}h ${preview.durationMin%60}m`],
              ["Max speed", `${preview.maxSpeedKmh} km/h`],
              ["Track points", preview.points],
            ].map(([l,v]) => (
              <div key={l} className="flex justify-between">
                <span className="text-peak-text-secondary">{l}</span>
                <span className="text-peak-text font-medium">{v}</span>
              </div>
            ))}
          </div>
          <button onClick={handleSave} className="w-full bg-peak-red text-white py-2 rounded-xl text-sm font-semibold">
            Save activity ✓
          </button>
        </div>
      )}
    </div>
  );
}

// ── Challenges panel ──────────────────────────────────────────────────────────
function ChallengesPanel({ user }) {
  const [tab, setTab] = useState("active"); // active | create
  const [showCreate, setShowCreate] = useState(false);
  const progress = getChallengeProgress(user?.id || "guest");

  const byDiff = { easy:[], medium:[], hard:[], legendary:[], custom:[] };
  progress.forEach(c => { (byDiff[c.difficulty]||byDiff.custom).push(c); });

  const DIFF_COLORS = { easy:"#34D399", medium:"#F59E0B", hard:"#FB343D", legendary:"#A855F7", custom:"#3894E3" };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-display font-bold text-xl text-peak-text">Challenges</h2>
        <button onClick={() => setShowCreate(true)}
          className="flex items-center gap-1.5 bg-peak-red text-white px-4 py-2 rounded-xl text-sm font-semibold">
          <Plus className="h-4 w-4"/> Create
        </button>
      </div>

      <p className="text-peak-text-secondary text-sm">Progress updates automatically from your imported GPX activities.</p>

      {/* Challenge groups */}
      {Object.entries(byDiff).map(([diff, chs]) => {
        if (!chs.length) return null;
        return (
          <div key={diff}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{color:DIFF_COLORS[diff]||"#888"}}>
              {diff.charAt(0).toUpperCase()+diff.slice(1)}
            </p>
            <div className="space-y-2">
              {chs.map(ch => (
                <div key={ch.id} className={`bg-peak-surface border rounded-2xl p-4 ${ch.completed?"border-green-400/30":"border-white/5"}`}>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">{ch.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-peak-text font-semibold text-sm">{ch.name}</p>
                        {ch.completed && <span className="text-green-400 text-xs font-bold">✓ Done!</span>}
                      </div>
                      <p className="text-peak-text-secondary text-xs mt-0.5">{ch.desc}</p>
                      {/* Progress bar */}
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-peak-text-secondary mb-1">
                          <span>{ch.progress?.toLocaleString()} / {ch.target?.toLocaleString()}</span>
                          <span>{ch.pct}%</span>
                        </div>
                        <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all"
                            style={{
                              width:`${ch.pct}%`,
                              background: ch.completed ? "#22c55e" : (DIFF_COLORS[diff]||"#3894E3"),
                            }}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {showCreate && <CreateChallengeModal user={user} onClose={() => setShowCreate(false)} />}
    </div>
  );
}

function CreateChallengeModal({ user, onClose }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [metric, setMetric] = useState("seasonVertical");
  const [target, setTarget] = useState("");
  const [icon, setIcon] = useState("🎿");
  const [isPublic, setIsPublic] = useState(false);

  const METRIC_OPTIONS = [
    { id:"seasonVertical",   label:"Season vertical (m)" },
    { id:"seasonDays",       label:"Season ski days" },
    { id:"weekVertical",     label:"Weekly vertical (m)" },
    { id:"lifetimeResorts",  label:"Lifetime resorts" },
    { id:"maxSpeed",         label:"Max speed (km/h)" },
  ];

  function handleCreate() {
    if (!name.trim() || !target) return;
    createCustomChallenge(user?.id || "guest", { name, desc, metric, target:Number(target), icon, isPublic });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4" onClick={onClose}>
      <div className="bg-peak-surface border border-white/10 rounded-2xl w-full max-w-md" onClick={e=>e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <p className="text-peak-text font-bold">Create challenge</p>
          <button onClick={onClose} className="text-peak-text-secondary">×</button>
        </div>
        <div className="p-5 space-y-4">
          <div className="flex gap-3">
            <div className="w-14">
              <input value={icon} onChange={e=>setIcon(e.target.value)} maxLength={2}
                className="w-full text-center text-2xl bg-peak-card border border-white/10 rounded-xl py-2.5 outline-none"/>
            </div>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Challenge name"
              className="flex-1 bg-peak-card border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-white/20 placeholder:text-peak-text-secondary/40"/>
          </div>
          <input value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description (optional)"
            className="w-full bg-peak-card border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-white/20 placeholder:text-peak-text-secondary/40"/>
          <select value={metric} onChange={e=>setMetric(e.target.value)}
            className="w-full bg-peak-card border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none">
            {METRIC_OPTIONS.map(m => <option key={m.id} value={m.id}>{m.label}</option>)}
          </select>
          <input type="number" value={target} onChange={e=>setTarget(e.target.value)} placeholder="Target number"
            className="w-full bg-peak-card border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-white/20 placeholder:text-peak-text-secondary/40"/>
          <div className="flex gap-2">
            {[["public","🌍 Public"],["friends","👥 Friends only"]].map(([v,l]) => (
              <button key={v} onClick={()=>setIsPublic(v==="public")}
                className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-colors ${(isPublic&&v==="public")||(!isPublic&&v==="friends")?"border-peak-blue/50 bg-peak-blue/10 text-peak-blue":"border-white/10 text-peak-text-secondary"}`}>
                {l}
              </button>
            ))}
          </div>
        </div>
        <div className="px-5 pb-5">
          <button onClick={handleCreate} disabled={!name.trim()||!target}
            className="w-full bg-peak-red text-white py-2.5 rounded-xl font-semibold text-sm disabled:opacity-40">
            Create challenge
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Rankings panel ────────────────────────────────────────────────────────────
function RankingsPanel({ user }) {
  const [metric, setMetric] = useState("lifetimeVertical");
  const [filter, setFilter] = useState("global");
  const stats = getStats(user?.id || "guest");

  const leaderboard = getLeaderboard({
    metric,
    homeCountry: filter === "country" ? (user?.country || "DE") : null,
  });

  // Inject real user
  const myEntry = {
    userId: user?.id || "me",
    name: user?.name || user?.displayName || "You",
    homeCountry: user?.country || "—",
    avatar: (user?.name || "Y")[0].toUpperCase(),
    lifetimeVertical: stats.lifetimeVertical,
    lifetimeDays: stats.lifetimeDays,
    lifetimeResorts: stats.lifetimeResorts,
    seasonVertical: stats.seasonVertical,
    seasonDays: stats.seasonDays,
    isMe: true,
  };
  const allEntries = [...leaderboard, myEntry].sort((a,b)=>(b[metric]||0)-(a[metric]||0)).map((e,i)=>({...e,rank:i+1}));

  const METRICS = [
    { id:"lifetimeVertical", label:"Lifetime vertical" },
    { id:"seasonVertical",   label:"Season vertical" },
    { id:"lifetimeDays",     label:"Lifetime days" },
    { id:"seasonDays",       label:"Season days" },
    { id:"lifetimeResorts",  label:"Resorts visited" },
  ];
  const FILTERS = [
    { id:"global",  label:"Global" },
    { id:"country", label:"My country" },
    { id:"friends", label:"Friends" },
  ];

  function fmt(val, m) {
    if (!val) return "—";
    if (m.includes("Vertical")) return `${(val/1000).toFixed(0)}km`;
    return val.toLocaleString();
  }

  return (
    <div className="space-y-4">
      <h2 className="font-display font-bold text-xl text-peak-text">Rankings</h2>

      {/* Metric tabs */}
      <div className="flex gap-1 overflow-x-auto pb-1">
        {METRICS.map(m => (
          <button key={m.id} onClick={() => setMetric(m.id)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${metric===m.id?"bg-peak-red text-white":"text-peak-text-secondary hover:text-peak-text"}`}>
            {m.label}
          </button>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-1">
        {FILTERS.map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${filter===f.id?"border-peak-blue/50 bg-peak-blue/10 text-peak-blue":"border-white/10 text-peak-text-secondary"}`}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-peak-surface border border-white/5 rounded-2xl overflow-hidden">
        {allEntries.slice(0,20).map((entry, i) => (
          <div key={entry.userId} className={`flex items-center gap-3 px-4 py-3 border-b border-white/5 last:border-0 ${entry.isMe?"bg-peak-blue/5":""}`}>
            <span className={`w-7 text-center font-bold text-sm flex-shrink-0 ${entry.rank<=3?"text-peak-red":"text-peak-text-secondary"}`}>
              {entry.rank===1?"🥇":entry.rank===2?"🥈":entry.rank===3?"🥉":entry.rank}
            </span>
            <div className="w-8 h-8 rounded-full bg-peak-card flex items-center justify-center text-sm font-bold text-peak-text flex-shrink-0">
              {entry.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold truncate ${entry.isMe?"text-peak-blue":"text-peak-text"}`}>
                {entry.name} {entry.isMe && "(you)"}
              </p>
              <p className="text-peak-text-secondary text-xs">{entry.homeCountry}</p>
            </div>
            <p className="text-peak-text font-bold text-sm flex-shrink-0">{fmt(entry[metric],metric)}</p>
          </div>
        ))}
      </div>
      <p className="text-peak-text-secondary text-xs text-center">Rankings based on verified GPX imports only</p>
    </div>
  );
}

// ── Activities panel ──────────────────────────────────────────────────────────
function ActivitiesPanel({ user }) {
  const [activities, setActivities] = useState(() => getActivities(user?.id || "guest"));
  const stats = getStats(user?.id || "guest");
  const earnedBadges = getEarnedUserBadges(stats);

  function handleUploaded(activity) {
    setActivities(getActivities(user?.id || "guest"));
  }

  return (
    <div className="space-y-4">
      <h2 className="font-display font-bold text-xl text-peak-text">My Activities</h2>

      {/* Stats summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label:"Lifetime vertical", value:`${(stats.lifetimeVertical/1000).toFixed(0)}km` },
          { label:"Ski days", value:stats.lifetimeDays },
          { label:"This season", value:`${(stats.seasonVertical/1000).toFixed(0)}km` },
          { label:"Resorts", value:stats.lifetimeResorts },
        ].map(s => (
          <div key={s.label} className="bg-peak-surface border border-white/5 rounded-xl p-3 text-center">
            <p className="text-peak-text font-bold text-xl">{s.value}</p>
            <p className="text-peak-text-secondary text-xs mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Earned badges */}
      {earnedBadges.length > 0 && (
        <div className="bg-peak-surface border border-white/5 rounded-2xl p-4">
          <p className="text-peak-text font-semibold text-sm mb-3">Earned badges</p>
          <div className="flex flex-wrap gap-2">
            {earnedBadges.map(b => (
              <span key={b.id} style={{
                display:"inline-flex",alignItems:"center",gap:5,
                fontSize:12,fontWeight:600,padding:"5px 11px",borderRadius:100,
                background:`${b.color}18`,border:`1px solid ${b.color}35`,color:b.color,
              }}>
                {b.icon} {b.label}
              </span>
            ))}
          </div>
        </div>
      )}

      <GPXUpload user={user} onUploaded={handleUploaded}/>

      {/* Activity list */}
      {activities.length > 0 ? (
        <div className="space-y-2">
          {activities.map(a => (
            <div key={a.id} className="bg-peak-surface border border-white/5 rounded-xl p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-peak-text font-semibold text-sm">{a.name}</p>
                  <p className="text-peak-text-secondary text-xs mt-0.5">{a.date} · {a.source}</p>
                </div>
                {a.verified && <span className="text-green-400 text-xs font-semibold">✓ Verified</span>}
              </div>
              <div className="flex gap-4 mt-2 text-xs text-peak-text-secondary">
                <span>↓ {(a.verticalM/1000).toFixed(2)}km</span>
                <span>↔ {a.distanceKm}km</span>
                {a.durationMin && <span>⏱ {Math.floor(a.durationMin/60)}h{a.durationMin%60}m</span>}
                {a.maxSpeedKmh > 0 && <span>⚡ {a.maxSpeedKmh}km/h</span>}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Mountain className="h-10 w-10 text-peak-text-secondary mx-auto mb-3"/>
          <p className="text-peak-text-secondary text-sm">No activities yet. Import a GPX to get started.</p>
        </div>
      )}
    </div>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// MARKETPLACE
// ─────────────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id:"all",        label:"All gear",      icon:"🎿" },
  { id:"skis",       label:"Skis",          icon:"🎿" },
  { id:"snowboard",  label:"Snowboards",    icon:"🏂" },
  { id:"boots",      label:"Boots",         icon:"👢" },
  { id:"bindings",   label:"Bindings",      icon:"🔩" },
  { id:"helmet",     label:"Helmets",       icon:"⛑️" },
  { id:"goggles",    label:"Goggles",       icon:"🥽" },
  { id:"outerwear",  label:"Outerwear",     icon:"🧥" },
  { id:"protection", label:"Protection",    icon:"🦺" },
  { id:"poles",      label:"Poles",         icon:"🪄" },
  { id:"bags",       label:"Bags & packs",  icon:"🎒" },
  { id:"other",      label:"Other",         icon:"📦" },
];

const CONDITIONS = [
  { id:"new",        label:"Brand new",     color:"#34D399" },
  { id:"like_new",   label:"Like new",      color:"#60A5FA" },
  { id:"good",       label:"Good",          color:"#FBBF24" },
  { id:"fair",       label:"Fair",          color:"#FB923C" },
  { id:"worn",       label:"Well loved",    color:"#94A3B8" },
];

const SEED_LISTINGS = [
  {
    id:"l1", sellerId:"u1", sellerName:"Marco R.", sellerAvatar:"M", sellerRating:4.9, sellerSales:23,
    title:"Atomic Redster X9 RS — 175cm", category:"skis", condition:"like_new",
    price:420, originalPrice:980, currency:"EUR",
    size:"175cm", brand:"Atomic", color:"Red/White",
    desc:"Used for one full season (40 days). No edge damage, base in perfect condition. Bindings not included. Stored professionally.",
    photos:["https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/17847d539_image.png"],
    location:"Munich, DE", postedAt:"2 days ago", views:87, saved:12,
    tags:["Race","Carving","Men's"],
  },
  {
    id:"l2", sellerId:"u2", sellerName:"Sophie M.", sellerAvatar:"S", sellerRating:5.0, sellerSales:7,
    title:"Salomon QST Lumen 99 — 161cm Women's", category:"skis", condition:"good",
    price:280, originalPrice:750, currency:"EUR",
    size:"161cm", brand:"Salomon", color:"Teal/Purple",
    desc:"2 seasons of use, mostly groomed runs. Some light scratches on topsheet, base waxed and edges sharp. Great all-mountain ski.",
    photos:["https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/17847d539_image.png"],
    location:"Zürich, CH", postedAt:"5 days ago", views:54, saved:8,
    tags:["All-mountain","Women's","Intermediate"],
  },
  {
    id:"l3", sellerId:"u3", sellerName:"James K.", sellerAvatar:"J", sellerRating:4.7, sellerSales:3,
    title:"Burton Custom X Snowboard — 158cm", category:"snowboard", condition:"good",
    price:350, originalPrice:800, currency:"EUR",
    size:"158cm", brand:"Burton", color:"Black/Grey",
    desc:"Three seasons, mainly park use. Twin tip in great shape. Bindings included (Burton Cartel). Perfect for intermediate to advanced.",
    photos:["https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/cb2dd3d0d_image.png"],
    location:"London, UK", postedAt:"1 week ago", views:121, saved:19,
    tags:["Park","Freeride","Burton Cartel included"],
  },
  {
    id:"l4", sellerId:"u4", sellerName:"Elena V.", sellerAvatar:"E", sellerRating:4.8, sellerSales:14,
    title:"Lange RX 130 LV Ski Boots — 26.0", category:"boots", condition:"like_new",
    price:290, originalPrice:580, currency:"EUR",
    size:"26.0 (EU 41)", brand:"Lange", color:"White/Blue",
    desc:"Worn 15 days. Narrow last (96mm). Stiff flex for expert skiers. Heat moulded once. Come with original bag and box.",
    photos:["https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/91a7456fa_image.png"],
    location:"Vienna, AT", postedAt:"3 days ago", views:43, saved:6,
    tags:["Expert","Narrow","Race performance"],
  },
  {
    id:"l5", sellerId:"u5", sellerName:"Thomas S.", sellerAvatar:"T", sellerRating:4.6, sellerSales:5,
    title:"Oakley Flight Tracker XL Goggles", category:"goggles", condition:"new",
    price:95, originalPrice:190, currency:"EUR",
    size:"One size", brand:"Oakley", color:"Matte Black / Prizm Snow Sapphire",
    desc:"Brand new, never used. Bought two pairs by mistake. Comes with original box, microfiber bag, and spare lens.",
    photos:["https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/6223f9061_image.png"],
    location:"Salzburg, AT", postedAt:"1 day ago", views:31, saved:4,
    tags:["New","Oakley","Prizm lens"],
  },
  {
    id:"l6", sellerId:"u6", sellerName:"Anna L.", sellerAvatar:"A", sellerRating:4.9, sellerSales:31,
    title:"Arc'teryx Sentinel AR Jacket — L", category:"outerwear", condition:"good",
    price:380, originalPrice:900, currency:"EUR",
    size:"Large", brand:"Arc'teryx", color:"Black",
    desc:"Two seasons, well-maintained. GORE-TEX still performing, DWR re-applied last season. No tears or stains. Zips all perfect.",
    photos:["https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/38c719aa6_image.png"],
    location:"Paris, FR", postedAt:"4 days ago", views:198, saved:34,
    tags:["GORE-TEX","Premium","Waterproof"],
  },
  {
    id:"l7", sellerId:"u7", sellerName:"Lukas B.", sellerAvatar:"L", sellerRating:4.8, sellerSales:11,
    title:"Head Kore 93 — 177cm", category:"skis", condition:"good",
    price:310, originalPrice:700, currency:"EUR",
    size:"177cm", brand:"Head", color:"Black/Orange",
    desc:"One season, all-mountain use. Lightweight karuba core, edges freshly tuned. Great touring and freeride ski.",
    photos:["https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/17847d539_image.png"],
    location:"Innsbruck, AT", postedAt:"6 days ago", views:62, saved:9,
    tags:["All-mountain","Freeride","Lightweight"],
  },
  {
    id:"l8", sellerId:"u8", sellerName:"Clara D.", sellerAvatar:"C", sellerRating:4.9, sellerSales:18,
    title:"Rossignol Experience 86 Ti — 168cm", category:"skis", condition:"like_new",
    price:360, originalPrice:820, currency:"EUR",
    size:"168cm", brand:"Rossignol", color:"Red/Black",
    desc:"Used 20 days. On-piste carver with titanal reinforcement. Base spotless, freshly waxed. Bindings not included.",
    photos:["https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/17847d539_image.png"],
    location:"Geneva, CH", postedAt:"3 days ago", views:78, saved:14,
    tags:["Piste","Carving","Intermediate"],
  },
  {
    id:"l9", sellerId:"u9", sellerName:"Pavel N.", sellerAvatar:"P", sellerRating:4.5, sellerSales:4,
    title:"Fischer Ranger 102 FR — 184cm", category:"skis", condition:"good",
    price:340, originalPrice:780, currency:"EUR",
    size:"184cm", brand:"Fischer", color:"Green/Black",
    desc:"Two seasons of freeride use. Some topsheet scuffs from rocks, base and edges solid. Perfect powder ski.",
    photos:["https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/17847d539_image.png"],
    location:"Munich, DE", postedAt:"1 week ago", views:95, saved:16,
    tags:["Freeride","Powder","Advanced"],
  },
  {
    id:"l10", sellerId:"u10", sellerName:"Mia H.", sellerAvatar:"M", sellerRating:4.7, sellerSales:9,
    title:"Salomon S/Lab MTN — 24.5", category:"boots", condition:"good",
    price:260, originalPrice:650, currency:"EUR",
    size:"24.5 (EU 39)", brand:"Salomon", color:"Black/Red",
    desc:"Two seasons touring. Custom shell heat-moulded once. Walk mode fully functional. Liners clean and odour-free.",
    photos:["https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/91a7456fa_image.png"],
    location:"Zürich, CH", postedAt:"2 days ago", views:51, saved:7,
    tags:["Touring","Women's","Heat-mouldable"],
  },
  {
    id:"l11", sellerId:"u11", sellerName:"Greta W.", sellerAvatar:"G", sellerRating:4.8, sellerSales:12,
    title:"Tecnica Cochise 130 — 27.5", category:"boots", condition:"like_new",
    price:320, originalPrice:680, currency:"EUR",
    size:"27.5 (EU 42.5)", brand:"Tecnica", color:"Black/Grey",
    desc:"Worn 10 days. 130 flex freeride boot with walk mode. C.A.S. shell moulded. Excellent condition, original box.",
    photos:["https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/91a7456fa_image.png"],
    location:"Vienna, AT", postedAt:"4 days ago", views:39, saved:5,
    tags:["Freeride","Stiff","Walk mode"],
  },
  {
    id:"l12", sellerId:"u12", sellerName:"Oscar F.", sellerAvatar:"O", sellerRating:4.6, sellerSales:6,
    title:"Head Nexo LYT 110 — 26.5", category:"boots", condition:"good",
    price:190, originalPrice:480, currency:"EUR",
    size:"26.5 (EU 41.5)", brand:"Head", color:"Blue/White",
    desc:"Three seasons, intermediate use. 110 flex, comfortable medium last. Liners compressed but still supportive.",
    photos:["https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/91a7456fa_image.png"],
    location:"Salzburg, AT", postedAt:"5 days ago", views:28, saved:3,
    tags:["Intermediate","Comfort","Medium last"],
  },
  {
    id:"l13", sellerId:"u13", sellerName:"Henrik O.", sellerAvatar:"H", sellerRating:4.9, sellerSales:22,
    title:"Leki Worldcup Racing Poles — 130cm", category:"poles", condition:"like_new",
    price:65, originalPrice:150, currency:"EUR",
    size:"130cm", brand:"Leki", color:"Black/Red",
    desc:"Used in one race weekend. Carbon composite shafts, Trigger S grips. No bends or scratches.",
    photos:["https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/1413d6a6e_image.png"],
    location:"Oslo, NO", postedAt:"2 days ago", views:22, saved:2,
    tags:["Race","Carbon","Trigger S"],
  },
  {
    id:"l14", sellerId:"u14", sellerName:"Sara P.", sellerAvatar:"S", sellerRating:4.7, sellerSales:8,
    title:"Komperdell Carbon Vario Poles — adjustable", category:"poles", condition:"good",
    price:45, originalPrice:120, currency:"EUR",
    size:"110-140cm", brand:"Komperdell", color:"Black",
    desc:"Two seasons touring. Telescopic carbon, foam grips and powder baskets. One basket missing, easily replaced.",
    photos:["https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/1413d6a6e_image.png"],
    location:"Innsbruck, AT", postedAt:"1 week ago", views:34, saved:5,
    tags:["Touring","Adjustable","Carbon"],
  },
  {
    id:"l15", sellerId:"u15", sellerName:"David M.", sellerAvatar:"D", sellerRating:4.8, sellerSales:15,
    title:"POC VPD 2.0 Back Protector — M", category:"protector", condition:"like_new",
    price:85, originalPrice:200, currency:"EUR",
    size:"Medium", brand:"POC", color:"Black",
    desc:"Worn a handful of times. VPD adaptive body armour, breathable and flexible. No damage, straps perfect.",
    photos:["https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/f905b4878_image.png"],
    location:"Geneva, CH", postedAt:"3 days ago", views:41, saved:6,
    tags:["Back protection","VPD","Body armour"],
  },
  {
    id:"l16", sellerId:"u16", sellerName:"Nina R.", sellerAvatar:"N", sellerRating:4.6, sellerSales:3,
    title:"Dainese Manis Back Protector — L", category:"protector", condition:"good",
    price:70, originalPrice:180, currency:"EUR",
    size:"Large", brand:"Dainese", color:"Black/Grey",
    desc:"Two seasons. Honeycomb articulated protector, very comfortable under a jacket. Some strap wear, protector intact.",
    photos:["https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/f905b4878_image.png"],
    location:"Milan, IT", postedAt:"6 days ago", views:26, saved:4,
    tags:["Back protection","Articulated","Comfortable"],
  },
  {
    id:"l17", sellerId:"u17", sellerName:"Finn J.", sellerAvatar:"F", sellerRating:4.9, sellerSales:27,
    title:"Lib Tech T.Rice Pro Snowboard — 157cm", category:"snowboard", condition:"like_new",
    price:400, originalPrice:850, currency:"EUR",
    size:"157cm", brand:"Lib Tech", color:"Blue/Yellow",
    desc:"One season, all-mountain. C2 hybrid camber, Magne-Traction edges sharp. No binding marks — bindings sold separately.",
    photos:["https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/cb2dd3d0d_image.png"],
    location:"Munich, DE", postedAt:"2 days ago", views:88, saved:15,
    tags:["All-mountain","Twin","Magne-Traction"],
  },
  {
    id:"l18", sellerId:"u18", sellerName:"Yuki T.", sellerAvatar:"Y", sellerRating:4.7, sellerSales:10,
    title:"Burton Imperial Snowboard Boots — 10.0", category:"boots", condition:"good",
    price:150, originalPrice:340, currency:"EUR",
    size:"US 10 / EU 43", brand:"Burton", color:"Black/Green",
    desc:"Two seasons. Medium-stiff flex, Speed Zone lacing works perfectly. Liners clean, soles minimal wear.",
    photos:["https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/7e9583c85_image.png"],
    location:"London, UK", postedAt:"4 days ago", views:47, saved:8,
    tags:["Snowboard boots","Speed Zone","Intermediate"],
  },
  {
    id:"l19", sellerId:"u19", sellerName:"Erik L.", sellerAvatar:"E", sellerRating:4.8, sellerSales:13,
    title:"Smith Vantage MIPS Helmet — M", category:"helmet", condition:"like_new",
    price:110, originalPrice:260, currency:"EUR",
    size:"Medium (54-58cm)", brand:"Smith", color:"Matte Black",
    desc:"Worn 8 days. MIPS system intact, adjustable dial fit. No impacts, shell and liner pristine. Original box.",
    photos:["https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/3e7e89c91_image.png"],
    location:"Zürich, CH", postedAt:"1 day ago", views:36, saved:7,
    tags:["MIPS","Adjustable","Safety"],
  },
  {
    id:"l20", sellerId:"u20", sellerName:"Hannah K.", sellerAvatar:"H", sellerRating:4.9, sellerSales:19,
    title:"Völkl Mantra M6 — 177cm", category:"skis", condition:"good",
    price:380, originalPrice:850, currency:"EUR",
    size:"177cm", brand:"Völkl", color:"Black/Red",
    desc:"Two seasons, piste and off-piste. Titanal frame, three radii geometry. Edges tuned, base recently stone-ground.",
    photos:["https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/17847d539_image.png"],
    location:"Innsbruck, AT", postedAt:"3 days ago", views:104, saved:21,
    tags:["All-mountain","Advanced","Titanal"],
  },
];

const SORT_OPTIONS = [
  { id:"newest",    label:"Newest first" },
  { id:"price_asc", label:"Price: low to high" },
  { id:"price_desc",label:"Price: high to low" },
  { id:"popular",   label:"Most viewed" },
];

// ── Listing card (grid) ───────────────────────────────────────────────────────
function ListingCard({ listing, onClick }) {
  const cond = CONDITIONS.find(c => c.id === listing.condition);
  const saving = Math.round((1 - listing.price / listing.originalPrice) * 100);
  return (
    <div onClick={() => onClick(listing)} style={{cursor:"pointer"}}
      className="bg-peak-surface border border-white/5 rounded-2xl overflow-hidden hover:border-white/12 transition-all group">
      {/* Photo */}
      <div className="relative overflow-hidden" style={{aspectRatio:"4/3"}}>
        <img src={listing.photos[0]} alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
        {/* Condition badge */}
        <div className="absolute top-2.5 left-2.5">
          <span style={{
            background:`${cond.color}22`, border:`1px solid ${cond.color}60`,
            color:cond.color, fontSize:10, fontWeight:700,
            padding:"3px 8px", borderRadius:100,
          }}>
            {cond.label}
          </span>
        </div>
        {/* Saving badge */}
        {saving >= 20 && (
          <div className="absolute top-2.5 right-2.5">
            <span className="bg-peak-red text-white text-xs font-bold px-2 py-0.5 rounded-full">-{saving}%</span>
          </div>
        )}
        {/* Photo count */}
        {listing.photos.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">
            {listing.photos.length} photos
          </div>
        )}
      </div>
      {/* Info */}
      <div className="p-3">
        <p className="text-peak-text font-semibold text-sm leading-tight line-clamp-2 mb-1.5">{listing.title}</p>
        <div className="flex items-baseline gap-1.5 mb-2">
          <span className="text-peak-text font-bold text-base">€{listing.price}</span>
          <span className="text-peak-text-secondary text-xs line-through">€{listing.originalPrice}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded-full bg-peak-red/20 flex items-center justify-center text-xs font-bold text-peak-red">{listing.sellerAvatar}</div>
            <span className="text-peak-text-secondary text-xs truncate max-w-[80px]">{listing.sellerName}</span>
          </div>
          <span className="text-peak-text-secondary text-xs">{listing.location.split(",")[1]?.trim() || listing.location}</span>
        </div>
      </div>
    </div>
  );
}

// ── Listing detail modal ──────────────────────────────────────────────────────
function ListingDetail({ listing, user, onClose, onMessage }) {
  const [photoIdx, setPhotoIdx] = useState(0);
  const [showOffer, setShowOffer] = useState(false);
  const [offerAmount, setOfferAmount] = useState("");
  const [offerSent, setOfferSent] = useState(false);
  const [msgText, setMsgText] = useState("");
  const [msgSent, setMsgSent] = useState(false);
  const [saved, setSaved] = useState(false);
  const cond = CONDITIONS.find(c => c.id === listing.condition);
  const saving = Math.round((1 - listing.price / listing.originalPrice) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-peak-bg overflow-y-auto" style={{top:64}}>
      {/* Back bar */}
      <div className="sticky top-0 z-10 bg-peak-bg/95 backdrop-blur-sm border-b border-white/5 flex items-center gap-3 px-4 py-3">
        <button onClick={onClose} className="flex items-center gap-1.5 text-peak-text-secondary hover:text-peak-text text-sm transition-colors">
          <ChevronLeft className="h-4 w-4"/>Back to marketplace
        </button>
        <span className="text-peak-text-secondary text-sm mx-2">·</span>
        <span className="text-peak-text text-sm font-medium truncate flex-1">{listing.title}</span>
        <button onClick={() => setSaved(!saved)}
          className={`text-sm transition-colors ${saved ? "text-peak-red" : "text-peak-text-secondary hover:text-peak-red"}`}>
          {saved ? "❤️ Saved" : "🤍 Save"}
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: photos */}
        <div>
          {/* Main photo */}
          <div className="relative rounded-2xl overflow-hidden mb-3" style={{aspectRatio:"1/1"}}>
            <img src={listing.photos[photoIdx]} alt={listing.title} className="w-full h-full object-cover"/>
            {listing.photos.length > 1 && (
              <>
                <button onClick={() => setPhotoIdx(i => Math.max(0, i-1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                  <ChevronLeft className="h-4 w-4"/>
                </button>
                <button onClick={() => setPhotoIdx(i => Math.min(listing.photos.length-1, i+1))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                  <ChevronRight className="h-4 w-4"/>
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {listing.photos.map((_,i) => (
                    <button key={i} onClick={() => setPhotoIdx(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${i===photoIdx?"bg-white w-4":"bg-white/40"}`}/>
                  ))}
                </div>
              </>
            )}
          </div>
          {/* Thumbnail strip */}
          {listing.photos.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {listing.photos.map((p,i) => (
                <button key={i} onClick={() => setPhotoIdx(i)}
                  className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors ${i===photoIdx?"border-peak-blue":"border-transparent"}`}>
                  <img src={p} alt="" className="w-full h-full object-cover"/>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: info + actions */}
        <div className="space-y-5">
          {/* Title + price */}
          <div>
            <div className="flex items-start justify-between gap-3 mb-2">
              <h2 className="font-display font-bold text-xl text-peak-text leading-tight">{listing.title}</h2>
              <div style={{
                background:`${cond.color}18`, border:`1px solid ${cond.color}40`,
                color:cond.color, fontSize:11, fontWeight:700,
                padding:"4px 10px", borderRadius:100, whiteSpace:"nowrap", flexShrink:0,
              }}>{cond.label}</div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-peak-text font-extrabold text-2xl">€{listing.price}</span>
              <span className="text-peak-text-secondary text-sm line-through">€{listing.originalPrice}</span>
              {saving >= 10 && <span className="text-green-400 text-sm font-semibold">-{saving}% off RRP</span>}
            </div>
          </div>

          {/* Details grid */}
          <div className="bg-peak-surface border border-white/5 rounded-xl p-4 grid grid-cols-2 gap-3">
            {[
              { label:"Brand",    value:listing.brand },
              { label:"Size",     value:listing.size },
              { label:"Color",    value:listing.color },
              { label:"Location", value:listing.location },
              { label:"Posted",   value:listing.postedAt },
              { label:"Views",    value:listing.views },
            ].map(row => (
              <div key={row.label}>
                <p className="text-peak-text-secondary text-xs mb-0.5">{row.label}</p>
                <p className="text-peak-text text-sm font-semibold">{row.value}</p>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {listing.tags.map(tag => (
              <span key={tag} className="bg-white/5 border border-white/8 text-peak-text-secondary text-xs px-2.5 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <div>
            <p className="text-peak-text-secondary text-xs font-semibold uppercase tracking-wider mb-2">Description</p>
            <p className="text-peak-text text-sm leading-relaxed">{listing.desc}</p>
          </div>

          {/* CTA buttons */}
          <div className="space-y-2">
            <button className="w-full bg-peak-red hover:bg-red-600 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors">
              <ShoppingCart className="h-4 w-4"/> Add to basket
            </button>
            <button onClick={() => setShowOffer(!showOffer)}
              className="w-full border border-white/15 hover:border-white/25 text-peak-text py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors">
              <Tag className="h-4 w-4"/> Make an offer
            </button>
            {showOffer && !offerSent && (
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-peak-text-secondary text-sm">€</span>
                  <input type="number" value={offerAmount} onChange={e=>setOfferAmount(e.target.value)}
                    placeholder="Your offer"
                    className="w-full bg-peak-card border border-white/10 rounded-xl pl-7 pr-4 py-2.5 text-sm text-peak-text outline-none focus:border-white/25"/>
                </div>
                <button onClick={() => { if(offerAmount) setOfferSent(true); }}
                  disabled={!offerAmount}
                  className="bg-peak-blue text-white px-5 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-40">
                  Send
                </button>
              </div>
            )}
            {offerSent && (
              <div className="flex items-center gap-2 text-green-400 text-sm bg-green-400/10 border border-green-400/20 rounded-xl px-4 py-2.5">
                <Check className="h-4 w-4"/> Offer of €{offerAmount} sent to {listing.sellerName}
              </div>
            )}
          </div>

          {/* Seller card */}
          <div className="bg-peak-surface border border-white/5 rounded-xl p-4">
            <p className="text-peak-text-secondary text-xs font-semibold uppercase tracking-wider mb-3">Seller</p>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-peak-red/20 border border-peak-red/20 flex items-center justify-center font-bold text-peak-red">
                {listing.sellerAvatar}
              </div>
              <div className="flex-1">
                <p className="text-peak-text font-semibold text-sm">{listing.sellerName}</p>
                <div className="flex items-center gap-2 text-xs text-peak-text-secondary">
                  <span>⭐ {listing.sellerRating}</span>
                  <span>·</span>
                  <span>{listing.sellerSales} sales</span>
                </div>
              </div>
            </div>
            {/* Message seller */}
            {!msgSent ? (
              <div className="space-y-2">
                <textarea value={msgText} onChange={e=>setMsgText(e.target.value)} rows={2}
                  placeholder={`Ask ${listing.sellerName} a question…`}
                  className="w-full bg-peak-card border border-white/10 rounded-xl px-3 py-2.5 text-sm text-peak-text outline-none focus:border-white/20 resize-none placeholder:text-peak-text-secondary/50"/>
                <button onClick={() => { if(msgText.trim()) setMsgSent(true); }}
                  disabled={!msgText.trim()}
                  className="w-full border border-white/15 hover:border-white/25 text-peak-text py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-40">
                  <Send className="h-3.5 w-3.5"/> Message seller
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-green-400 text-sm bg-green-400/10 border border-green-400/20 rounded-xl px-3 py-2.5">
                <Check className="h-4 w-4"/> Message sent to {listing.sellerName}
              </div>
            )}
          </div>

          {/* Safety notice */}
          <p className="text-peak-text-secondary text-xs leading-relaxed">
            🔒 All transactions are between community members. PeakXP facilitates the connection but does not process payments or handle disputes. Meet safely and verify gear before purchase.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Create listing modal ──────────────────────────────────────────────────────
function CreateListingModal({ user, onClose, onPost }) {
  const [step, setStep] = useState(1); // 1=details, 2=photos+price
  const [form, setForm] = useState({
    title:"", category:"skis", condition:"good", brand:"", size:"", color:"",
    price:"", originalPrice:"", desc:"", location:"", photoUrl:"",
  });
  const [photos, setPhotos] = useState([]);

  function set(k,v) { setForm(prev => ({...prev,[k]:v})); }

  function addPhoto() {
    if (form.photoUrl.trim() && photos.length < 6) {
      setPhotos(prev => [...prev, form.photoUrl.trim()]);
      set("photoUrl","");
    }
  }

  function handleSubmit() {
    if (!form.title || !form.price) return;
    onPost({
      id:`listing_${Date.now()}`,
      sellerId: user?.id || "me",
      sellerName: user?.name || user?.displayName || "You",
      sellerAvatar: (user?.name||"Y")[0].toUpperCase(),
      sellerRating: 5.0, sellerSales: 0,
      title: form.title, category: form.category, condition: form.condition,
      brand: form.brand, size: form.size, color: form.color,
      price: Number(form.price), originalPrice: Number(form.originalPrice)||Number(form.price),
      desc: form.desc, location: form.location || "—",
      photos: photos.length > 0 ? photos : ["https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=600&q=80"],
      postedAt: "Just now", views: 0, saved: 0, tags:[],
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm px-4 pb-4" onClick={onClose}>
      <div className="bg-peak-surface border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col" onClick={e=>e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 flex-shrink-0">
          <div>
            <p className="text-peak-text font-bold">Sell gear</p>
            <p className="text-peak-text-secondary text-xs mt-0.5">Step {step} of 2</p>
          </div>
          <button onClick={onClose} className="text-peak-text-secondary hover:text-peak-text text-xl">×</button>
        </div>

        <div className="overflow-y-auto flex-1 p-5 space-y-4">
          {step === 1 && (
            <>
              <input value={form.title} onChange={e=>set("title",e.target.value)}
                placeholder="Title — e.g. Atomic Redster X9 175cm"
                className="w-full bg-peak-card border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-white/20 placeholder:text-peak-text-secondary/40"/>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-peak-text-secondary text-xs mb-1.5">Category</p>
                  <select value={form.category} onChange={e=>set("category",e.target.value)}
                    className="w-full bg-peak-card border border-white/10 rounded-xl px-3 py-2.5 text-sm text-peak-text outline-none">
                    {CATEGORIES.filter(c=>c.id!=="all").map(c=><option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </div>
                <div>
                  <p className="text-peak-text-secondary text-xs mb-1.5">Condition</p>
                  <select value={form.condition} onChange={e=>set("condition",e.target.value)}
                    className="w-full bg-peak-card border border-white/10 rounded-xl px-3 py-2.5 text-sm text-peak-text outline-none">
                    {CONDITIONS.map(c=><option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input value={form.brand} onChange={e=>set("brand",e.target.value)} placeholder="Brand"
                  className="bg-peak-card border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-white/20 placeholder:text-peak-text-secondary/40"/>
                <input value={form.size} onChange={e=>set("size",e.target.value)} placeholder="Size / length"
                  className="bg-peak-card border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-white/20 placeholder:text-peak-text-secondary/40"/>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input value={form.color} onChange={e=>set("color",e.target.value)} placeholder="Color"
                  className="bg-peak-card border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-white/20 placeholder:text-peak-text-secondary/40"/>
                <input value={form.location} onChange={e=>set("location",e.target.value)} placeholder="Your location"
                  className="bg-peak-card border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-white/20 placeholder:text-peak-text-secondary/40"/>
              </div>

              <textarea value={form.desc} onChange={e=>set("desc",e.target.value)} rows={3}
                placeholder="Describe the gear — usage, condition details, what's included…"
                className="w-full bg-peak-card border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-white/20 resize-none placeholder:text-peak-text-secondary/40"/>
            </>
          )}

          {step === 2 && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-peak-text-secondary text-xs mb-1.5">Your price (€)</p>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-peak-text-secondary text-sm">€</span>
                    <input type="number" value={form.price} onChange={e=>set("price",e.target.value)} placeholder="0"
                      className="w-full bg-peak-card border border-white/10 rounded-xl pl-7 pr-4 py-2.5 text-sm text-peak-text outline-none focus:border-white/20"/>
                  </div>
                </div>
                <div>
                  <p className="text-peak-text-secondary text-xs mb-1.5">Original RRP (€)</p>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-peak-text-secondary text-sm">€</span>
                    <input type="number" value={form.originalPrice} onChange={e=>set("originalPrice",e.target.value)} placeholder="0"
                      className="w-full bg-peak-card border border-white/10 rounded-xl pl-7 pr-4 py-2.5 text-sm text-peak-text outline-none focus:border-white/20"/>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-peak-text-secondary text-xs mb-1.5">Photos (paste URL, up to 6)</p>
                <div className="flex gap-2 mb-2">
                  <input value={form.photoUrl} onChange={e=>set("photoUrl",e.target.value)}
                    onKeyDown={e=>{ if(e.key==="Enter") addPhoto(); }}
                    placeholder="https://…"
                    className="flex-1 bg-peak-card border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-white/20 placeholder:text-peak-text-secondary/40"/>
                  <button onClick={addPhoto} disabled={!form.photoUrl.trim()||photos.length>=6}
                    className="bg-peak-blue text-white px-4 py-2.5 rounded-xl text-sm font-medium disabled:opacity-40">
                    Add
                  </button>
                </div>
                {photos.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {photos.map((p,i) => (
                      <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 group">
                        <img src={p} alt="" className="w-full h-full object-cover"/>
                        <button onClick={()=>setPhotos(prev=>prev.filter((_,idx)=>idx!==i))}
                          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-lg">
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <div className="px-5 py-4 border-t border-white/5 flex-shrink-0">
          {step === 1 ? (
            <button onClick={()=>setStep(2)} disabled={!form.title}
              className="w-full bg-peak-red text-white py-2.5 rounded-xl font-semibold text-sm disabled:opacity-40">
              Next — Add photos & price
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={()=>setStep(1)}
                className="flex-shrink-0 border border-white/10 text-peak-text-secondary px-5 py-2.5 rounded-xl text-sm font-medium hover:text-peak-text transition-colors">
                Back
              </button>
              <button onClick={handleSubmit} disabled={!form.price}
                className="flex-1 bg-peak-red text-white py-2.5 rounded-xl font-bold text-sm disabled:opacity-40">
                Publish listing
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Marketplace panel ────────────────────────────────────────────────────
function MarketplacePanel({ user }) {
  const [listings, setListings] = useState(SEED_LISTINGS);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");
  const [selectedListing, setSelectedListing] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [priceMax, setPriceMax] = useState("");
  const [conditionFilter, setConditionFilter] = useState("all");

  // Filter + sort
  let filtered = listings.filter(l => {
    const q = search.toLowerCase();
    const matchSearch = !q || l.title.toLowerCase().includes(q) || l.brand.toLowerCase().includes(q) || l.tags.some(t=>t.toLowerCase().includes(q));
    const matchCat = category === "all" || l.category === category;
    const matchPrice = !priceMax || l.price <= Number(priceMax);
    const matchCond = conditionFilter === "all" || l.condition === conditionFilter;
    return matchSearch && matchCat && matchPrice && matchCond;
  });

  if (sort === "price_asc")  filtered = [...filtered].sort((a,b) => a.price - b.price);
  if (sort === "price_desc") filtered = [...filtered].sort((a,b) => b.price - a.price);
  if (sort === "popular")    filtered = [...filtered].sort((a,b) => b.views - a.views);

  function handlePost(listing) { setListings(prev => [listing, ...prev]); }

  if (selectedListing) {
    return <ListingDetail listing={selectedListing} user={user}
      onClose={() => setSelectedListing(null)}
      onMessage={() => {}}/>;
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-xl text-peak-text">Gear Marketplace</h2>
          <p className="text-peak-text-secondary text-sm mt-0.5">Buy and sell used ski & snowboard equipment</p>
        </div>
        <button onClick={() => setShowCreate(true)}
          className="flex items-center gap-1.5 bg-peak-red text-white px-4 py-2 rounded-xl text-sm font-semibold flex-shrink-0">
          <Plus className="h-4 w-4"/> Sell gear
        </button>
      </div>

      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-peak-text-secondary"/>
        <input value={search} onChange={e=>setSearch(e.target.value)}
          placeholder="Search skis, boots, jackets, brands…"
          className="w-full bg-peak-surface border border-white/8 rounded-xl pl-10 pr-12 py-3 text-sm text-peak-text outline-none focus:border-white/20 placeholder:text-peak-text-secondary/50"/>
        <button onClick={()=>setShowFilters(!showFilters)}
          className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${showFilters?"text-peak-blue":"text-peak-text-secondary hover:text-peak-text"}`}>
          <Filter className="h-4 w-4"/>
        </button>
      </div>

      {/* Extended filters */}
      {showFilters && (
        <div className="bg-peak-surface border border-white/8 rounded-xl p-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div>
            <p className="text-peak-text-secondary text-xs mb-1.5">Max price (€)</p>
            <input type="number" value={priceMax} onChange={e=>setPriceMax(e.target.value)} placeholder="Any"
              className="w-full bg-peak-card border border-white/10 rounded-lg px-3 py-2 text-sm text-peak-text outline-none"/>
          </div>
          <div>
            <p className="text-peak-text-secondary text-xs mb-1.5">Condition</p>
            <select value={conditionFilter} onChange={e=>setConditionFilter(e.target.value)}
              className="w-full bg-peak-card border border-white/10 rounded-lg px-3 py-2 text-sm text-peak-text outline-none">
              <option value="all">Any condition</option>
              {CONDITIONS.map(c=><option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </div>
          <div>
            <p className="text-peak-text-secondary text-xs mb-1.5">Sort by</p>
            <select value={sort} onChange={e=>setSort(e.target.value)}
              className="w-full bg-peak-card border border-white/10 rounded-lg px-3 py-2 text-sm text-peak-text outline-none">
              {SORT_OPTIONS.map(s=><option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </div>
        </div>
      )}

      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
        {CATEGORIES.map(cat => (
          <button key={cat.id} onClick={() => setCategory(cat.id)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${category===cat.id?"bg-peak-red/15 border-peak-red/40 text-peak-red":"border-white/8 text-peak-text-secondary hover:text-peak-text hover:border-white/15"}`}>
            <span>{cat.icon}</span>{cat.label}
          </button>
        ))}
      </div>

      {/* Results count + sort */}
      <div className="flex items-center justify-between">
        <p className="text-peak-text-secondary text-xs">{filtered.length} listing{filtered.length!==1?"s":""}</p>
        {!showFilters && (
          <select value={sort} onChange={e=>setSort(e.target.value)}
            className="bg-transparent border-none text-peak-text-secondary text-xs outline-none cursor-pointer">
            {SORT_OPTIONS.map(s=><option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        )}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {filtered.map(l => <ListingCard key={l.id} listing={l} onClick={setSelectedListing}/>)}
        </div>
      ) : (
        <div className="text-center py-12">
          <ShoppingBag className="h-10 w-10 text-peak-text-secondary mx-auto mb-3"/>
          <p className="text-peak-text font-semibold mb-1">No listings found</p>
          <p className="text-peak-text-secondary text-sm">Try a different search or category</p>
        </div>
      )}

      {showCreate && <CreateListingModal user={user} onClose={()=>setShowCreate(false)} onPost={handlePost}/>}
    </div>
  );
}


// ── Main Community page ───────────────────────────────────────────────────────
const SEED_FEED = [
  {
    id:"p1", type:"activity", user:"Marco R.", avatar:"M", time:"2h ago",
    resortName:"Ski Welt", privacy:"public",
    stats:{ verticalM:18400, distanceKm:62, durationMin:390, maxSpeedKmh:72 },
    caption:"Big day on the Ski Welt. Powder from 9am to 3pm and then the sun came out. 62km done.",
    photo:"https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800&q=80",
    reactionCount:34, topReaction:"🔥", commentCount:5, comments:[
      { user:"Sophie M.", text:"That vertical is insane!" },
      { user:"Elena V.", text:"🔥🔥🔥" },
    ], reactions:{}, badgesReceived:[],
  },
  {
    id:"p2", type:"photo", user:"Sophie M.", avatar:"S", time:"5h ago",
    resortName:"Zermatt", privacy:"public",
    caption:"The Matterhorn never gets old. -14°C at the summit, zero wind.",
    photo:"https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80",
    reactionCount:91, topReaction:"❤️", commentCount:12, comments:[
      { user:"James K.", text:"Stunning 😍" },
    ], reactions:{}, badgesReceived:[],
  },
  {
    id:"p3", type:"challenge", user:"Elena V.", avatar:"E", time:"Yesterday",
    challengeName:"50k Season", challengeDesc:"50,000m vertical this season",
    challengeIcon:"⭐",
    caption:"Just hit 50,000m for the season. 27 days in. Let's keep going!",
    reactionCount:58, topReaction:"🏆", commentCount:8, comments:[],
    reactions:{}, badgesReceived:[],
  },
];

export default function Community() {
  const { user, isLoggedIn } = useAppAuth();
  const [activeTab, setActiveTab] = useState("feed");
  const [feed, setFeed] = useState(SEED_FEED);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [notification, setNotification] = useState("");

  function showNotif(msg) {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3000);
  }

  function handleReact(postId, reactionId) {
    setFeed(prev => prev.map(p => {
      if (p.id !== postId) return p;
      const reactions = { ...(p.reactions || {}), [reactionId]: ((p.reactions||{})[reactionId]||0)+1 };
      const topReaction = REACTIONS.find(r => r.id === Object.entries(reactions).sort((a,b)=>b[1]-a[1])[0]?.[0])?.icon || "❤️";
      return { ...p, reactions, topReaction, reactionCount: (p.reactionCount||0)+1 };
    }));
  }

  function handleComment(postId, text) {
    if (!isLoggedIn) return;
    setFeed(prev => prev.map(p => {
      if (p.id !== postId) return p;
      return { ...p, comments:[...(p.comments||[]),{ user:user?.name||"You", text }], commentCount:(p.commentCount||0)+1 };
    }));
  }

  function handleGiveBadge(postId, targetUser, badge) {
    setFeed(prev => prev.map(p => {
      if (p.id !== postId) return p;
      const existing = (p.badgesReceived||[]).find(b=>b.id===badge.id);
      if (existing) return p;
      return { ...p, badgesReceived:[...(p.badgesReceived||[]), badge] };
    }));
    showNotif(`You gave ${targetUser} the "${badge.label}" badge! ${badge.icon}`);
  }

  function handlePost(post) {
    setFeed(prev => [post, ...prev]);
    showNotif("Post shared!");
  }

  return (
      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Notification toast */}
        {notification && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-peak-surface border border-white/10 rounded-2xl px-5 py-3 text-peak-text text-sm font-medium shadow-xl">
            {notification}
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display font-extrabold text-2xl text-peak-text">Community</h1>
          {activeTab === "feed" && isLoggedIn && (
            <button onClick={() => setShowCreatePost(true)}
              className="flex items-center gap-2 bg-peak-red text-white px-4 py-2 rounded-xl text-sm font-semibold">
              <Plus className="h-4 w-4"/> Post
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-peak-surface border border-white/5 rounded-xl p-1 mb-6">
          {TABS.map(tab => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-colors ${activeTab===tab.id?"bg-peak-card text-peak-text":"text-peak-text-secondary hover:text-peak-text"}`}>
                <Icon className="h-3.5 w-3.5"/>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        {activeTab === "feed" && (
          <div>
            {feed.map(post => (
              <FeedPost key={post.id} post={post} currentUser={user}
                onReact={handleReact} onComment={handleComment} onGiveBadge={handleGiveBadge}/>
            ))}
          </div>
        )}

        {activeTab === "challenges" && <ChallengesPanel user={user}/>}
        {activeTab === "ranking" && <RankingsPanel user={user}/>}
        {activeTab === "activities" && <ActivitiesPanel user={user}/>}
        {activeTab === "marketplace" && <MarketplacePanel user={user}/>}

        {showCreatePost && <CreatePostModal user={user} onClose={()=>setShowCreatePost(false)} onPost={handlePost}/>}
      </div>
  );
}