import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PhotoSlideshow({ images }) {
  const [idx, setIdx] = useState(0);

  if (!images || images.length === 0) return null;

  const prev = () => setIdx(i => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIdx(i => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="relative w-full overflow-hidden rounded-2xl mb-8 group" style={{ height: '60vh', maxHeight: '520px' }}>
      <img
        src={images[idx]}
        alt={`Resort photo ${idx + 1}`}
        className="w-full h-full object-cover transition-all duration-500"
      />
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
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 flex-wrap justify-center max-w-xs">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`w-2 h-2 rounded-full transition-colors ${i === idx ? "bg-white" : "bg-white/30"}`}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="absolute top-4 right-4 bg-peak-bg/60 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
        {idx + 1} / {images.length}
      </div>
    </div>
  );
}