import { useState, useRef } from "react";
import { useAppAuth } from "../context/AppAuthContext";
import { Heart, Flame, Snowflake, Trophy, Star, Mountain, Camera, Plus, Upload, ChevronRight, X, Check, Users, BarChart3, Award, Target, Filter, Globe, MapPin, Zap } from "lucide-react";
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

        {showCreatePost && <CreatePostModal user={user} onClose={()=>setShowCreatePost(false)} onPost={handlePost}/>}
      </div>
  );
}
