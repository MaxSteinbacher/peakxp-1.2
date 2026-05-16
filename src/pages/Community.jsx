import { useState } from "react";
import { useT } from "../lib/i18n";
import { useAppAuth } from "../context/AppAuthContext";
import BackButton from "../components/shared/BackButton";
import { Link } from "react-router-dom";
import { Heart, MessageCircle, Share2, Bookmark, Send, BarChart3, MapPin, Camera, Video, Tag } from "lucide-react";
import AuthGate from "../components/AuthGate";

const CHALLENGES = [
  { id: "c1", name: "2026/27 Centurion", desc: "Ski 100 days this season", type: "Global · Season", progress: 38, target: 100, badge: "🏅", participants: 2341, unlocked: false },
  { id: "c2", name: "January Surge", desc: "4 days on snow in January", type: "Global · Monthly", progress: 4, target: 4, badge: "⚡", participants: 5892, unlocked: true },
  { id: "c3", name: "Early Bird", desc: "First run before 8:30am, 5 times", type: "Global · Habit", progress: 3, target: 5, badge: "🌅", participants: 1247, unlocked: false },
];

const TRENDING_RESORTS = [
  { id: "verbier", name: "Verbier", country: "🇨🇭 Switzerland", pisteKm: 410, rating: 4.9, image: "https://picsum.photos/seed/verbier_trend/300/200" },
  { id: "zermatt", name: "Zermatt", country: "🇨🇭 Switzerland", pisteKm: 360, rating: 4.8, image: "https://picsum.photos/seed/zermatt_trend/300/200" },
  { id: "chamonix", name: "Chamonix", country: "🇫🇷 France", pisteKm: 170, rating: 4.7, image: "https://picsum.photos/seed/chamonix_trend/300/200" },
];

const ACTIVE_FRIENDS = [
  { name: "Marco R.", status: "Skiing at Verbier", avatar: "MR", time: null },
  { name: "Sophie M.", status: "Skiing at Zermatt", avatar: "SM", time: null },
  { name: "James K.", status: "Last seen 2h ago", avatar: "JK", time: "2h" },
  { name: "Elena V.", status: "Skiing at Courchevel", avatar: "EV", time: null },
];

const RESORT_ALERTS = [
  { resort: "Verbier", alert: "35cm fresh snow overnight — all lifts open" },
  { resort: "Zermatt", alert: "Glacier runs open, -8°C at summit" },
  { resort: "Chamonix", alert: "Aiguille du Midi reopens tomorrow after maintenance" },
];

const SUGGESTED_USERS = [
  { name: "Alex Dupont", mutual: 4, avatar: "AD" },
  { name: "Nina Schneider", mutual: 7, avatar: "NS" },
  { name: "Luca Ferrari", mutual: 2, avatar: "LF" },
];

const INITIAL_FEED = [
  {
    id: "p1", type: "activity", user: "You", avatar: "YO", time: "Just now", resort: "Verbier", flag: "🇨🇭",
    activity: { duration: "6h 40m", runs: 28, vertical: "4,200m", distance: "62km" },
    photo: "https://picsum.photos/seed/feed1/800/500",
    caption: "Best day of the season. Powder from top to bottom.",
    conditions: "Powder", mood: "🤩",
    likes: 42, comments: 8, shares: 3,
    commentsOpen: false, commentText: "",
    commentList: [
      { user: "Marco R.", text: "Epic! Wish I was there." },
      { user: "Sophie M.", text: "That vertical though 🔥" },
    ],
    liked: false, saved: false,
  },
  {
    id: "p2", type: "resort", user: "Verbier Station", avatar: "V", time: "2h ago", resort: "Verbier", flag: "🇨🇭",
    verified: true, sponsored: false,
    photo: "https://picsum.photos/seed/feed2/800/500",
    caption: "Fresh 40cm overnight — all 410km open from 08:30. See you on the mountain! 🎿",
    likes: 312, comments: 24, shares: 56,
    commentsOpen: false, commentText: "",
    commentList: [],
    liked: false, saved: false,
  },
  {
    id: "p3", type: "photo", user: "Sophie M.", avatar: "SM", time: "3h ago", resort: "Zermatt", flag: "🇨🇭",
    photo: "https://picsum.photos/seed/feed3/800/500",
    caption: "The Matterhorn never gets old ❄️",
    taggedResort: "Zermatt",
    likes: 87, comments: 12, shares: 5,
    commentsOpen: false, commentText: "",
    commentList: [
      { user: "James K.", text: "Stunning!" },
    ],
    liked: false, saved: false,
  },
  {
    id: "p4", type: "challenge", user: "Marco R.", avatar: "MR", time: "5h ago",
    challengeName: "January Surge", challengeDesc: "4 days on snow in January",
    badge: "⚡",
    likes: 31, comments: 6, shares: 2,
    commentsOpen: false, commentText: "",
    commentList: [],
    liked: false, saved: false,
    joined: false,
  },
  {
    id: "p5", type: "sponsored", user: "Hotel Les Roches", avatar: "HR", time: "6h ago", resort: "Verbier", flag: "🇨🇭",
    verified: true, sponsored: true,
    photo: "https://picsum.photos/seed/feed5/800/500",
    caption: "Last rooms available for peak week. Ski-in ski-out, heated pool, in-house boot room. From €280/night.",
    cta: "Book now", ctaLink: "/trip-planning",
    likes: 19, comments: 3, shares: 7,
    commentsOpen: false, commentText: "",
    commentList: [],
    liked: false, saved: false,
  },
  {
    id: "p6", type: "deal", user: "Val d'Isere", avatar: "VI", time: "1d ago", resort: "Val d'Isere", flag: "🇫🇷",
    verified: true,
    photo: "https://picsum.photos/seed/feed6/800/500",
    dealHeadline: "Flash deal: 20% off 6-day lift passes", price: "€189", validity: "Valid until 31 Jan",
    cta: "View deal", ctaLink: "/trip-planning",
    likes: 224, comments: 41, shares: 88,
    commentsOpen: false, commentText: "",
    commentList: [],
    liked: false, saved: false,
  },
];

const NAV_ITEMS = ["For you", "Following", "Friends", "Resort updates", "Challenges", "Promotions"];

function Avatar({ initials, size = "md" }) {
  const sizeClass = size === "sm" ? "w-8 h-8 text-xs" : size === "lg" ? "w-12 h-12 text-base" : "w-9 h-9 text-sm";
  return (
    <div className={`${sizeClass} rounded-full bg-peak-blue/20 text-peak-blue font-bold flex items-center justify-center flex-shrink-0`}>
      {initials}
    </div>
  );
}

function ReactionRow({ post, onLike, onSave, onToggleComments }) {
  return (
    <div className="flex items-center gap-4 pt-3 border-t border-white/5">
      <button onClick={onLike} className={`flex items-center gap-1.5 text-sm transition-colors ${post.liked ? "text-pink-400" : "text-peak-text-secondary hover:text-pink-400"}`}>
        <Heart className={`h-4 w-4 ${post.liked ? "fill-pink-400" : ""}`} />{post.likes + (post.liked ? 1 : 0)}
      </button>
      <button onClick={onToggleComments} className="flex items-center gap-1.5 text-sm text-peak-text-secondary hover:text-peak-blue transition-colors">
        <MessageCircle className="h-4 w-4" />{post.comments}
      </button>
      <button className="flex items-center gap-1.5 text-sm text-peak-text-secondary hover:text-peak-text transition-colors">
        <Share2 className="h-4 w-4" />{post.shares}
      </button>
      <button onClick={onSave} className={`ml-auto transition-colors ${post.saved ? "text-peak-blue" : "text-peak-text-secondary hover:text-peak-blue"}`}>
        <Bookmark className={`h-4 w-4 ${post.saved ? "fill-peak-blue" : ""}`} />
      </button>
    </div>
  );
}

function CommentThread({ post, onAddComment, onTextChange }) {
  return (
    <div className="mt-3 pt-3 border-t border-white/5">
      <div className="space-y-2 mb-3">
        {post.commentList.map((c, i) => (
          <div key={i} className="flex items-start gap-2">
            <Avatar initials={c.user.split(" ").map(w => w[0]).join("")} size="sm" />
            <div className="bg-peak-surface rounded-xl px-3 py-2 text-xs text-peak-text flex-1">
              <span className="font-semibold mr-1">{c.user}</span>{c.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Avatar initials="YO" size="sm" />
        <div className="flex-1 flex gap-2">
          <input value={post.commentText} onChange={e => onTextChange(e.target.value)} placeholder="Add a comment..."
            className="flex-1 bg-peak-surface border border-white/10 rounded-full px-4 py-2 text-xs text-peak-text outline-none focus:border-peak-blue" />
          <button onClick={() => post.commentText && onAddComment()} className="text-peak-blue hover:text-peak-text transition-colors">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

const PUBLIC_POST_TYPES = ["resort", "sponsored", "challenge", "deal"];

export default function Community() {
  const t = useT();
  const { isLoggedIn } = useAppAuth();
  const [feed, setFeed] = useState(INITIAL_FEED);
  const [feedNav, setFeedNav] = useState("For you");
  const [postText, setPostText] = useState("");
  const [draftRestored, setDraftRestored] = useState(false);
  const [logActivityOpen, setLogActivityOpen] = useState(false);
  const [activity, setActivity] = useState({ sport: "Skiing", resort: "", date: "", duration: "", vertical: "", runs: "", distance: "", maxSpeed: "", conditions: "Groomed", mood: "Great" });

  function toggleLike(id) { setFeed(f => f.map(p => p.id === id ? { ...p, liked: !p.liked } : p)); }
  function toggleSave(id) { setFeed(f => f.map(p => p.id === id ? { ...p, saved: !p.saved } : p)); }
  function toggleComments(id) { setFeed(f => f.map(p => p.id === id ? { ...p, commentsOpen: !p.commentsOpen } : p)); }
  function setCommentText(id, text) { setFeed(f => f.map(p => p.id === id ? { ...p, commentText: text } : p)); }
  function addComment(id) { setFeed(f => f.map(p => p.id === id ? { ...p, commentList: [...p.commentList, { user: "You", text: p.commentText }], commentText: "", comments: p.comments + 1 } : p)); }
  function toggleJoinChallenge(id) { setFeed(f => f.map(p => p.id === id ? { ...p, joined: !p.joined } : p)); }
  function submitActivity() {
    if (!activity.resort) return;
    const newPost = {
      id: "pa" + Date.now(), type: "activity", user: "You", avatar: "YO", time: "Just now",
      resort: activity.resort, flag: "🏔",
      activity: { duration: activity.duration, runs: activity.runs, vertical: activity.vertical + "m", distance: activity.distance + "km" },
      caption: `${activity.mood === "Epic" ? "🤩 " : ""}${activity.conditions} conditions at ${activity.resort}. ${activity.vertical}m vertical, ${activity.runs} runs.`,
      conditions: activity.conditions, mood: activity.mood === "Great" ? "😊" : activity.mood === "OK" ? "😐" : activity.mood === "Tough" ? "😤" : "🤩",
      likes: 0, comments: 0, shares: 0, commentsOpen: false, commentText: "", commentList: [], liked: false, saved: false,
    };
    setFeed(prev => [newPost, ...prev]);
    setLogActivityOpen(false);
    setPostText("");
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen pt-20 bg-peak-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
            <div className="space-y-4 min-w-0">
              <div className="bg-peak-card border border-white/5 rounded-2xl p-6 text-center mb-2">
                <h2 className="font-display font-extrabold text-2xl text-peak-text mb-2">Join the PeakXP community</h2>
                <p className="text-peak-text-secondary text-sm mb-4">Log runs, connect with skiers, join challenges and get resort updates.</p>
                <div className="flex gap-3 justify-center">
                  <Link to="/auth" className="px-5 py-2.5 border border-white/10 text-peak-text-secondary hover:text-peak-text text-sm font-medium rounded-xl transition-colors">Sign in</Link>
                  <Link to="/auth" className="px-5 py-2.5 bg-peak-red hover:bg-peak-red-hover text-white text-sm font-bold rounded-xl transition-colors">Create account</Link>
                </div>
              </div>
              {INITIAL_FEED.filter(p => ["resort","sponsored","challenge","deal"].includes(p.type)).map(post => (
                <div key={post.id} className="bg-peak-card border border-white/5 rounded-2xl overflow-hidden">
                  <div className="flex items-center gap-3 p-4 pb-3">
                    <Avatar initials={post.avatar} />
                    <div><span className="text-peak-text font-semibold text-sm">{post.user}</span><p className="text-peak-text-secondary text-xs">{post.time}</p></div>
                  </div>
                  {post.photo && <img src={post.photo} alt="" className="w-full h-52 object-cover" />}
                  {post.caption && <p className="px-4 py-3 text-sm text-peak-text">{post.caption}</p>}
                </div>
              ))}
            </div>
            <div className="hidden lg:block">
              <div className="bg-peak-card border border-white/5 rounded-2xl p-4">
                <h3 className="font-display font-bold text-peak-text text-sm mb-3">Trending this week</h3>
                <div className="space-y-2">{TRENDING_RESORTS.map(r => (
                  <Link key={r.id} to={`/resort/${r.id}`} className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors">
                    <img src={r.image} alt={r.name} className="w-12 h-9 rounded-lg object-cover" />
                    <div><p className="text-peak-text font-semibold text-sm">{r.name}</p><p className="text-peak-text-secondary text-xs">{r.country}</p></div>
                  </Link>
                ))}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-peak-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BackButton to="/" className="mb-4" />
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_300px] gap-6">

          {/* LEFT COLUMN */}
          <div className="hidden lg:block space-y-4">
            {/* Profile snapshot */}
            <div className="bg-peak-card border border-white/5 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <Avatar initials="YO" size="lg" />
                <div>
                  <p className="font-semibold text-peak-text text-sm">You</p>
                  <p className="text-peak-text-secondary text-xs">Home resort: Verbier</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center mb-4">
                {[["38", "Days"], ["284", "Runs"], ["42km", "Vertical"]].map(([v, l]) => (
                  <div key={l} className="bg-peak-surface rounded-xl p-2">
                    <p className="font-display font-bold text-peak-text text-lg">{v}</p>
                    <p className="text-peak-text-secondary text-xs">{l}</p>
                  </div>
                ))}
              </div>
              <button className="text-xs text-peak-blue hover:underline">Edit profile</button>
            </div>

            {/* Feed nav */}
            <div className="bg-peak-card border border-white/5 rounded-2xl p-3 space-y-1">
              {NAV_ITEMS.map(item => (
                <button key={item} onClick={() => setFeedNav(item)}
                  className={`w-full text-left px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${feedNav === item ? "bg-peak-red/10 text-peak-red" : "text-peak-text-secondary hover:text-peak-text hover:bg-white/5"}`}>
                  {item}
                </button>
              ))}
            </div>

            {/* Challenges */}
            <div className="bg-peak-card border border-white/5 rounded-2xl p-5">
              <h3 className="font-display font-bold text-peak-text text-base mb-3">Active challenges</h3>
              <div className="space-y-3">
                {CHALLENGES.map(c => (
                  <div key={c.id} className="bg-peak-surface rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xl ${c.unlocked ? "" : "grayscale opacity-50"}`}>{c.badge}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-peak-text text-xs font-semibold truncate">{c.name}</p>
                        <p className="text-peak-text-secondary text-xs">{c.type}</p>
                      </div>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-1">
                      <div className="h-full bg-peak-red rounded-full transition-all" style={{ width: `${Math.min(100, (c.progress / c.target) * 100)}%` }} />
                    </div>
                    <p className="text-xs text-peak-text-secondary">{c.progress}/{c.target} · {c.participants.toLocaleString()} skiers</p>
                  </div>
                ))}
              </div>
              <button className="mt-3 text-xs text-peak-blue hover:underline">View all challenges</button>
            </div>
          </div>

          {/* MOBILE NAV */}
          <div className="lg:hidden flex gap-2 overflow-x-auto hide-scrollbar mb-2">
            {NAV_ITEMS.map(item => (
              <button key={item} onClick={() => setFeedNav(item)}
                className={`px-4 py-2 text-sm font-medium rounded-full border whitespace-nowrap transition-colors flex-shrink-0 ${feedNav === item ? "bg-peak-red/10 border-peak-red/30 text-peak-red" : "border-white/10 text-peak-text-secondary"}`}>
                {item}
              </button>
            ))}
          </div>

          {/* CENTRE COLUMN — FEED */}
          <div className="space-y-4 min-w-0">
            {/* Compose */}
            <div className="bg-peak-card border border-white/5 rounded-2xl p-4">
              <div className="flex gap-3 mb-3">
                <Avatar initials="YO" />
                <input value={postText} onChange={e => setPostText(e.target.value)}
                  onFocus={() => {}}
                  placeholder="Share a run, a view, or a moment..."
                  className="flex-1 bg-peak-surface border border-white/10 rounded-xl px-4 py-2.5 text-sm text-peak-text outline-none focus:border-peak-blue" />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {[{ icon: Camera, label: "Photo" }, { icon: Video, label: "Video" }, { icon: Tag, label: "Tag resort" }, { icon: MapPin, label: "Location" }].map(({ icon: Icon, label }) => (
                  <button key={label} className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-peak-text-secondary hover:text-peak-text border border-white/10 rounded-full transition-colors">
                    <Icon className="h-3.5 w-3.5" />{label}
                  </button>
                ))}
                <button onClick={() => setLogActivityOpen(v => !v)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-peak-blue border border-peak-blue/30 rounded-full hover:bg-peak-blue/10 transition-colors">
                  <BarChart3 className="h-3.5 w-3.5" />Log activity
                </button>
                <button onClick={() => postText && alert("Posted!")} disabled={!postText}
                  className="ml-auto px-4 py-1.5 bg-peak-red hover:bg-peak-red-hover disabled:opacity-40 text-white text-xs font-semibold rounded-full transition-colors">
                  Post
                </button>
              </div>
              {draftRestored && (
                <p className="text-peak-text-secondary text-xs mt-1 ml-12">Draft restored · <button onClick={() => { setPostText(""); setDraftRestored(false); }} className="text-peak-blue hover:underline">Clear</button></p>
              )}
              {logActivityOpen && (
                <div className="mt-4 border-t border-white/5 pt-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-peak-text-secondary mb-1">Sport</label>
                      <select value={activity.sport} onChange={e => setActivity(a => ({ ...a, sport: e.target.value }))}
                        className="w-full bg-peak-surface border border-white/10 rounded-xl px-3 py-2 text-xs text-peak-text outline-none">
                        {["Skiing", "Snowboard", "Cross-country", "Freestyle"].map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-peak-text-secondary mb-1">Resort</label>
                      <input value={activity.resort} onChange={e => setActivity(a => ({ ...a, resort: e.target.value }))} placeholder="e.g. Verbier"
                        className="w-full bg-peak-surface border border-white/10 rounded-xl px-3 py-2 text-xs text-peak-text outline-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-peak-text-secondary mb-1">Date</label>
                      <input type="date" value={activity.date} onChange={e => setActivity(a => ({ ...a, date: e.target.value }))}
                        className="w-full bg-peak-surface border border-white/10 rounded-xl px-3 py-2 text-xs text-peak-text outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs text-peak-text-secondary mb-1">Duration (hh:mm)</label>
                      <input value={activity.duration} onChange={e => setActivity(a => ({ ...a, duration: e.target.value }))} placeholder="06:40"
                        className="w-full bg-peak-surface border border-white/10 rounded-xl px-3 py-2 text-xs text-peak-text outline-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[{ k: "vertical", l: "Vertical (m)" }, { k: "runs", l: "Runs" }, { k: "distance", l: "Distance (km)" }].map(({ k, l }) => (
                      <div key={k}>
                        <label className="block text-xs text-peak-text-secondary mb-1">{l}</label>
                        <input type="number" value={activity[k]} onChange={e => setActivity(a => ({ ...a, [k]: e.target.value }))}
                          className="w-full bg-peak-surface border border-white/10 rounded-xl px-3 py-2 text-xs text-peak-text outline-none" />
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-peak-text-secondary mb-1">Conditions</label>
                      <select value={activity.conditions} onChange={e => setActivity(a => ({ ...a, conditions: e.target.value }))}
                        className="w-full bg-peak-surface border border-white/10 rounded-xl px-3 py-2 text-xs text-peak-text outline-none">
                        {["Powder", "Groomed", "Icy", "Spring snow", "Mixed"].map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-peak-text-secondary mb-1">Mood</label>
                      <div className="flex gap-1">
                        {[["Great", "😊"], ["OK", "😐"], ["Tough", "😤"], ["Epic", "🤩"]].map(([m, emoji]) => (
                          <button key={m} type="button" onClick={() => setActivity(a => ({ ...a, mood: m }))}
                            className={`flex-1 py-2 text-sm rounded-lg border transition-colors ${activity.mood === m ? "border-peak-blue/50 bg-peak-blue/10" : "border-white/10"}`}>
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button onClick={submitActivity} className="w-full py-2 bg-peak-red hover:bg-peak-red-hover text-white text-sm font-semibold rounded-xl transition-colors">
                    Post activity
                  </button>
                </div>
              )}
            </div>

            {/* Feed posts */}
            {feed.map(post => (
              <div key={post.id} className="bg-peak-card border border-white/5 rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center gap-3 p-4 pb-3 relative">
                  <Avatar initials={post.avatar} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-peak-text font-semibold text-sm">{post.user}</span>
                      {post.verified && <span className="text-xs text-peak-blue font-medium border border-peak-blue/30 px-1.5 py-0.5 rounded-full">✓ Partner</span>}
                      {post.resort && <span className="text-peak-text-secondary text-xs">at {post.flag} {post.resort}</span>}
                    </div>
                    <p className="text-peak-text-secondary text-xs">{post.time}</p>
                  </div>
                  {post.sponsored && <span className="text-xs text-peak-text-secondary">Sponsored</span>}
                </div>

                {/* Activity post */}
                {post.type === "activity" && (
                  <>
                    {post.activity && (
                      <div className="mx-4 mb-3 grid grid-cols-4 gap-2">
                        {Object.entries(post.activity).map(([k, v]) => (
                          <div key={k} className="bg-peak-surface rounded-xl p-2.5 text-center">
                            <p className="font-display font-bold text-peak-text text-sm">{v}</p>
                            <p className="text-peak-text-secondary text-xs capitalize">{k}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {post.photo && <img src={post.photo} alt="" className="w-full h-64 object-cover" />}
                    {post.caption && <p className="px-4 pt-3 text-sm text-peak-text">{post.caption}</p>}
                    <div className="px-4 pt-2 pb-1 flex gap-2">
                      {post.conditions && <span className="text-xs bg-peak-surface text-peak-text-secondary px-2 py-0.5 rounded-full border border-white/10">{post.conditions}</span>}
                      {post.mood && <span className="text-xs">{post.mood}</span>}
                    </div>
                  </>
                )}

                {/* Photo post */}
                {post.type === "photo" && (
                  <>
                    {post.photo && <img src={post.photo} alt="" className="w-full h-64 object-cover" />}
                    <div className="px-4 pt-3">
                      {post.caption && <p className="text-sm text-peak-text mb-2">{post.caption}</p>}
                      {post.taggedResort && <span className="inline-flex items-center gap-1 text-xs text-peak-blue border border-peak-blue/30 px-2 py-0.5 rounded-full"><Tag className="h-3 w-3" />{post.taggedResort}</span>}
                    </div>
                  </>
                )}

                {/* Resort / sponsored post */}
                {(post.type === "resort" || post.type === "sponsored") && (
                  <>
                    {post.photo && <img src={post.photo} alt="" className="w-full h-64 object-cover" />}
                    {post.caption && <p className="px-4 pt-3 text-sm text-peak-text">{post.caption}</p>}
                    {post.cta && (
                      <div className="px-4 pt-3">
                        <Link to={post.ctaLink || "#"} className="inline-block px-5 py-2 bg-peak-red hover:bg-peak-red-hover text-white text-xs font-semibold rounded-xl transition-colors">
                          {post.cta}
                        </Link>
                      </div>
                    )}
                  </>
                )}

                {/* Challenge post */}
                {post.type === "challenge" && (
                  <div className="px-4 pb-3">
                    <div className="bg-peak-surface rounded-xl p-4 flex items-center gap-3">
                      <span className="text-3xl">{post.badge}</span>
                      <div className="flex-1">
                        <p className="text-peak-text font-semibold text-sm">{post.user} just unlocked:</p>
                        <p className="text-peak-blue text-sm font-bold">{post.challengeName}</p>
                        <p className="text-peak-text-secondary text-xs">{post.challengeDesc}</p>
                      </div>
                    </div>
                    <button onClick={() => toggleJoinChallenge(post.id)}
                      className={`mt-3 px-5 py-2 text-xs font-semibold rounded-xl transition-colors ${post.joined ? "bg-peak-green/20 text-peak-green border border-peak-green/30" : "bg-peak-blue/10 text-peak-blue border border-peak-blue/30 hover:bg-peak-blue/20"}`}>
                      {post.joined ? "Joined!" : "Join this challenge"}
                    </button>
                  </div>
                )}

                {/* Deal post */}
                {post.type === "deal" && (
                  <>
                    {post.photo && <img src={post.photo} alt="" className="w-full h-52 object-cover" />}
                    <div className="px-4 pt-3">
                      <span className="inline-block bg-peak-green/20 text-peak-green text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2">Deal</span>
                      <p className="text-peak-text font-semibold text-base mb-1">{post.dealHeadline}</p>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-peak-red font-bold text-xl">{post.price}</span>
                        <span className="text-peak-text-secondary text-xs">{post.validity}</span>
                      </div>
                      <Link to={post.ctaLink || "#"} className="inline-block px-5 py-2 bg-peak-red hover:bg-peak-red-hover text-white text-xs font-semibold rounded-xl transition-colors">
                        {post.cta}
                      </Link>
                    </div>
                  </>
                )}

                {/* Reaction row */}
                <div className="px-4 pb-3 mt-3">
                  <ReactionRow post={post} onLike={() => toggleLike(post.id)} onSave={() => toggleSave(post.id)} onToggleComments={() => toggleComments(post.id)} />
                  {post.commentsOpen && (
                    <CommentThread post={post} onAddComment={() => addComment(post.id)} onTextChange={(t) => setCommentText(post.id, t)} />
                  )}
                  {!post.commentsOpen && post.commentList.length > 0 && (
                    <button onClick={() => toggleComments(post.id)} className="mt-2 text-xs text-peak-text-secondary hover:text-peak-text transition-colors">
                      View all {post.commentList.length} comments
                    </button>
                  )}
                </div>
              </div>
            ))}

            <button className="w-full py-3 border border-white/10 text-peak-text-secondary hover:text-peak-text text-sm font-medium rounded-xl transition-colors">
              Load more
            </button>
          </div>

          {/* RIGHT COLUMN */}
          <div className="hidden lg:block space-y-4">
            {/* Trending resorts */}
            <div className="bg-peak-card border border-white/5 rounded-2xl p-4">
              <h3 className="font-display font-bold text-peak-text text-sm mb-3">Trending this week</h3>
              <div className="space-y-2">
                {TRENDING_RESORTS.map(r => (
                  <Link key={r.id} to={`/resort/${r.id}`} className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors">
                    <img src={r.image} alt={r.name} className="w-12 h-9 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-peak-text font-semibold text-sm truncate">{r.name}</p>
                      <p className="text-peak-text-secondary text-xs">{r.country} · {r.pisteKm}km</p>
                    </div>
                    <span className="text-peak-text text-xs font-bold">{r.rating}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Active friends */}
            <div className="bg-peak-card border border-white/5 rounded-2xl p-4">
              <h3 className="font-display font-bold text-peak-text text-sm mb-3">Active friends</h3>
              <div className="space-y-2">
                {ACTIVE_FRIENDS.map(f => (
                  <div key={f.name} className="flex items-center gap-3">
                    <Avatar initials={f.avatar} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-peak-text text-xs font-semibold truncate">{f.name}</p>
                      <p className={`text-xs truncate ${f.time ? "text-peak-text-secondary" : "text-peak-green"}`}>{f.status}</p>
                    </div>
                    {!f.time && <div className="w-2 h-2 rounded-full bg-peak-green flex-shrink-0" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Resort alerts */}
            <div className="bg-peak-card border border-white/5 rounded-2xl p-4">
              <h3 className="font-display font-bold text-peak-text text-sm mb-3">Resort alerts</h3>
              <div className="space-y-2">
                {RESORT_ALERTS.map(a => (
                  <div key={a.resort} className="bg-peak-surface rounded-xl px-3 py-2.5">
                    <p className="text-peak-blue text-xs font-semibold mb-0.5">{a.resort}</p>
                    <p className="text-peak-text-secondary text-xs">{a.alert}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested to follow */}
            <div className="bg-peak-card border border-white/5 rounded-2xl p-4">
              <h3 className="font-display font-bold text-peak-text text-sm mb-3">Suggested to follow</h3>
              <div className="space-y-3">
                {SUGGESTED_USERS.map(u => (
                  <div key={u.name} className="flex items-center gap-3">
                    <Avatar initials={u.avatar} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-peak-text text-xs font-semibold">{u.name}</p>
                      <p className="text-peak-text-secondary text-xs">{u.mutual} mutual friends</p>
                    </div>
                    <button className="text-xs text-peak-blue border border-peak-blue/30 px-3 py-1 rounded-full hover:bg-peak-blue/10 transition-colors">
                      Follow
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}