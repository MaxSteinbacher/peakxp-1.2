import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BackButton({ label = "Back", to = null, onClick = null, className = "" }) {
  const navigate = useNavigate();
  const handleClick = onClick || (() => to ? navigate(to) : navigate(-1));
  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 text-peak-text-secondary hover:text-peak-text transition-colors cursor-pointer text-sm font-medium w-fit ${className}`}
    >
      <ChevronLeft size={16} />
      {label}
    </button>
  );
}