import { Clock, CreditCard, XCircle, Baby, PawPrint, Wind, Info } from "lucide-react";

export default function HotelRulesTab({ hotel }) {
  const { policies } = hotel;
  const sections = [
    { icon: Clock, title: "Check-in / Check-out", content: `Check-in from ${policies.checkIn} · Check-out by ${policies.checkOut}` },
    { icon: CreditCard, title: "Payment", content: "Visa, Mastercard, American Express and cash accepted. Credit card required at check-in." },
    { icon: XCircle, title: "Cancellation", content: policies.cancellation },
    { icon: Baby, title: "Children", content: policies.children },
    { icon: PawPrint, title: "Pets", content: policies.pets },
    { icon: Wind, title: "Smoking", content: policies.smoking },
    { icon: Info, title: "Accessibility", content: "Please contact reception in advance to discuss accessibility requirements." },
    { icon: Info, title: "Important information", content: "Hotel shuttle service to ski lifts available — please enquire at reception. Ski storage available on request." },
  ];

  return (
    <div className="bg-peak-card border border-white/5 rounded-xl p-6 space-y-5">
      {sections.map(({ icon: Icon, title, content }) => (
        <div key={title} className="border-b border-white/5 pb-5 last:border-0 last:pb-0">
          <div className="flex items-center gap-2 mb-2">
            <Icon className="h-4 w-4 text-peak-blue flex-shrink-0" />
            <h4 className="text-peak-text font-semibold text-sm">{title}</h4>
          </div>
          <p className="text-peak-text-secondary text-sm leading-relaxed pl-6">{content}</p>
        </div>
      ))}
    </div>
  );
}