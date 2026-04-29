import { Construction } from "lucide-react";

export default function PlaceholderTab({ title, description, icon: Icon }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-2xl bg-peak-blue/10 flex items-center justify-center mb-5">
        {Icon ? <Icon className="h-8 w-8 text-peak-blue" /> : <Construction className="h-8 w-8 text-peak-blue" />}
      </div>
      <h3 className="font-display font-bold text-2xl text-peak-text mb-2">{title}</h3>
      <p className="text-peak-text-secondary text-sm max-w-md">{description || "This section is coming soon. We're working hard to bring you the best experience."}</p>
      <span className="mt-6 inline-block bg-peak-blue/10 text-peak-blue text-xs font-semibold px-3 py-1.5 rounded-full">Coming soon</span>
    </div>
  );
}