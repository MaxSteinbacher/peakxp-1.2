import { useState } from "react";
import { X, Heart, MessageCircle, Share2, ChevronLeft, ChevronRight } from "lucide-react";

const posts = [
  {
    id: 1,
    user: "Sophie M.",
    avatar: "https://picsum.photos/seed/soc1/100/100",
    flag: "🇩🇪",
    resort: "Verbier",
    time: "2h ago",
    image: "https://picsum.photos/seed/feed1/800/1000",
    caption: "First powder run of the season at Verbier 🎿❄️ The off-piste is absolutely unreal right now.",
    likes: 142,
    comments: 18,
  },
  {
    id: 2,
    user: "Marcus L.",
    avatar: "https://picsum.photos/seed/soc2/100/100",
    flag: "🇸🇪",
    resort: "Zermatt",
    time: "4h ago",
    image: "https://picsum.photos/seed/feed2/800/1000",
    caption: "Matterhorn views from the top of Klein Matterhorn. Worth every meter of altitude. 🏔️",
    likes: 311,
    comments: 34,
  },
  {
    id: 3,
    user: "Elena R.",
    avatar: "https://picsum.photos/seed/soc3/100/100",
    flag: "🇮🇹",
    resort: "Cortina",
    time: "6h ago",
    image: "https://picsum.photos/seed/feed3/800/1000",
    caption: "Golden hour in the Dolomites is something else entirely 🌅 Cortina never disappoints.",
    likes: 228,
    comments: 21,
  },
  {
    id: 4,
    user: "James H.",
    avatar: "https://picsum.photos/seed/soc4/100/100",
    flag: "🇬🇧",
    resort: "Val Thorens",
    time: "1d ago",
    image: "https://picsum.photos/seed/feed4/800/1000",
    caption: "Val Thorens delivering 220cm of fresh snow. Best conditions in years! 💪",
    likes: 89,
    comments: 9,
  },
];

export default function SocialFeedOverlay({ open, onClose }) {
  const [current, setCurrent] = useState(0);
  const [liked, setLiked] = useState({});

  if (!open) return null;

  const post = posts[current];
  const isLiked = liked[post.id];

  const prev = () => setCurrent((p) => Math.max(0, p - 1));
  const next = () => setCurrent((p) => Math.min(posts.length - 1, p + 1));

  const toggleLike = () => setLiked((prev) => ({ ...prev, [post.id]: !prev[post.id] }));

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative flex items-center gap-4 max-h-[90vh] w-full max-w-3xl px-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Prev */}
        <button
          onClick={prev}
          disabled={current === 0}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors disabled:opacity-30 flex-shrink-0"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Card */}
        <div className="flex-1 bg-peak-card rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[88vh]">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              <img src={post.avatar} alt={post.user} className="w-9 h-9 rounded-full object-cover" />
              <div>
                <p className="text-peak-text text-sm font-semibold">{post.flag} {post.user}</p>
                <p className="text-peak-text-secondary text-xs">{post.resort} · {post.time}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 text-peak-text-secondary hover:text-peak-text transition-colors rounded-lg hover:bg-white/5">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Image */}
          <div className="flex-1 overflow-hidden bg-black">
            <img
              src={post.image}
              alt="Post"
              className="w-full h-full object-cover max-h-[50vh]"
            />
          </div>

          {/* Actions + caption */}
          <div className="px-5 py-4">
            <div className="flex items-center gap-4 mb-3">
              <button onClick={toggleLike} className="flex items-center gap-1.5 text-sm font-medium transition-colors">
                <Heart className={`h-5 w-5 transition-colors ${isLiked ? "fill-peak-red text-peak-red" : "text-peak-text-secondary"}`} />
                <span className={isLiked ? "text-peak-red" : "text-peak-text-secondary"}>
                  {post.likes + (isLiked ? 1 : 0)}
                </span>
              </button>
              <button className="flex items-center gap-1.5 text-sm text-peak-text-secondary hover:text-peak-text transition-colors">
                <MessageCircle className="h-5 w-5" />
                <span>{post.comments}</span>
              </button>
              <button className="flex items-center gap-1.5 text-sm text-peak-text-secondary hover:text-peak-text transition-colors ml-auto">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
            <p className="text-peak-text text-sm leading-relaxed">{post.caption}</p>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 pb-4">
            {posts.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-peak-blue" : "bg-white/20"}`}
              />
            ))}
          </div>
        </div>

        {/* Next */}
        <button
          onClick={next}
          disabled={current === posts.length - 1}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors disabled:opacity-30 flex-shrink-0"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}