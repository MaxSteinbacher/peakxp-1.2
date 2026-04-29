import { Star } from "lucide-react";

export default function ReviewCard({ review }) {
  return (
    <div className="bg-peak-card border border-white/5 rounded-xl p-5 hover:border-peak-blue/20 transition-colors">
      <div className="flex items-start gap-3 mb-3">
        <img
          src={review.avatar}
          alt={review.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="text-peak-text font-medium text-sm">{review.name}</p>
            <span className="text-sm">{review.flag}</span>
          </div>
          <p className="text-peak-text-secondary text-xs">{review.date}</p>
        </div>
        <div className="flex items-center gap-1 bg-peak-blue text-white px-2 py-1 rounded-md text-sm font-bold">
          <Star className="h-3 w-3 fill-white" />
          {review.rating}
        </div>
      </div>
      <p className="text-peak-text-secondary text-sm leading-relaxed">{review.text}</p>
    </div>
  );
}