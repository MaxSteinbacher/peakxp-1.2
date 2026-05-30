import { Sliders, Sparkles } from "lucide-react";
import { useT } from "../../../lib/i18n";

const EQUIPMENT_TYPES = [
  { key: "skis", image: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/17847d539_image.png" },
  { key: "snowboard", image: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/cb2dd3d0d_image.png" },
  { key: "ski_boots", image: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/91a7456fa_image.png" },
  { key: "snowboard_boots", image: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/7e9583c85_image.png" },
  { key: "poles", image: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/1413d6a6e_image.png" },
  { key: "helmet", image: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/3e7e89c91_image.png" },
  { key: "back_protector", image: "https://media.base44.com/images/public/6a19694d2b38b5e31a976be8/f905b4878_image.png" },
];

function toggle(arr, val) {
  return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
}

export default function Step0({ selectedEquipment, setSelectedEquipment, mode, setMode, onContinue }) {
  const t = useT();
  const canContinue = selectedEquipment.length > 0 && mode !== null;

  return (
    <div>
      <h2 className="font-display font-bold text-2xl text-peak-text mb-1">{t('what_do_you_need')}</h2>
      <p className="text-peak-text-secondary text-sm mb-6">{t('select_equipment')}</p>

      {/* Equipment grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 mb-8">
        {EQUIPMENT_TYPES.map((eq) => {
          const active = selectedEquipment.includes(eq.key);
          return (
            <button
              key={eq.key}
              onClick={() => setSelectedEquipment((prev) => toggle(prev, eq.key))}
              className={`flex flex-col items-center rounded-xl border overflow-hidden transition-all duration-200 ${
                active
                  ? "border-peak-blue/50 bg-peak-blue/10 text-peak-blue"
                  : "border-white/10 bg-peak-card text-peak-text-secondary hover:border-white/25 hover:text-peak-text"
              }`}
            >
              {eq.image
                ? <img src={eq.image} alt={eq.label} className="w-full h-20 object-cover" />
                : <div className="flex items-center justify-center h-20 w-full"><span className="text-2xl">{eq.emoji}</span></div>
              }
              <span className="text-xs font-medium text-center leading-tight px-2 py-2">{t(eq.key)}</span>
            </button>
          );
        })}
      </div>

      {/* Mode selector */}
      <h3 className="font-display font-bold text-lg text-peak-text mb-3">{t('how_proceed')}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {[
          {
            key: "expert",
            titleKey: "i_know_what_i_want",
            subtitleKey: "choose_own_specs",
            icon: Sliders,
          },
          {
            key: "guided",
            titleKey: "help_me_choose",
            subtitleKey: "answer_questions",
            icon: Sparkles,
          },
        ].map((m) => {
          const Icon = m.icon;
          const active = mode === m.key;
          return (
            <button
              key={m.key}
              onClick={() => setMode(m.key)}
              className={`flex items-start gap-4 p-5 rounded-xl border text-left transition-all duration-200 ${
                active
                  ? "border-peak-blue/50 bg-peak-blue/10"
                  : "border-white/10 bg-peak-card hover:border-white/25"
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${active ? "bg-peak-blue/20" : "bg-white/5"}`}>
                <Icon className={`h-5 w-5 ${active ? "text-peak-blue" : "text-peak-text-secondary"}`} />
              </div>
              <div>
                <p className={`font-semibold text-sm mb-0.5 ${active ? "text-peak-text" : "text-peak-text-secondary"}`}>{t(m.titleKey)}</p>
                <p className="text-peak-text-secondary text-xs">{t(m.subtitleKey)}</p>
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={onContinue}
        disabled={!canContinue}
        className="px-8 py-3 bg-peak-red hover:bg-peak-red-hover disabled:opacity-40 disabled:cursor-not-allowed text-white font-display font-bold text-sm rounded-xl transition-colors"
      >
        {t('continue')}
      </button>
    </div>
  );
}