import { useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
// Play kept for potential future video support

export default function PhotoSlideshow({ images, videos }) {
  const [idx, setIdx] = useState(0);

  // Build unified slides: videos first, then photos
  const slides = [
    ...(videos || []).filter(v => v.url).map(v => ({ type: "video", src: v.url, credits: v.credits })),
    ...(images || []).map(i => typeof i === "string" ? { type: "image", src: i } : { type: "image", src: i.src, credits: i.credits }),
  ];

  if (slides.length === 0) return null;

  const prev = () => setIdx(i => (i === 0 ? slides.length - 1 : i - 1));
  const next = () => setIdx(i => (i === slides.length - 1 ? 0 : i + 1));

  const current = slides[idx];

  return (
    <div className="relative w-full overflow-hidden rounded-2xl mb-8 group" style={{ height: '70vh', maxHeight: '600px' }}>
      {current.type === "video" ? (
        <video
          key={current.src}
          src={current.src}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      ) : (
        <img
          key={current.src}
          src={current.src}
          alt={`Resort photo ${idx}`}
          className="w-full h-full object-cover transition-all duration-500"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-peak-bg/40 via-transparent to-transparent" />

      {/* Left arrow */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-peak-bg/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-peak-bg/80 transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* Right arrow */}
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-peak-bg/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-peak-bg/80 transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 flex-wrap justify-center max-w-sm">
        {slides.map((slide, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`transition-all rounded-full ${
              i === idx
                ? "bg-white w-4 h-2"
                : "bg-white/40 w-2 h-2 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Credits bottom-left */}
      {current.credits && (
        <div className="absolute bottom-4 left-4 text-white/60 text-xs backdrop-blur-sm bg-peak-bg/30 px-2 py-1 rounded-md">
          {current.credits}
        </div>
      )}

      {/* Counter + video badge */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        {current.type === "video" && (
          <div className="flex items-center gap-1.5 bg-peak-red/80 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
            <Play className="h-3 w-3 fill-white" />
            Video
          </div>
        )}
        <div className="bg-peak-bg/60 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
          {idx + 1} / {slides.length}
        </div>
      </div>
    </div>
  );
}