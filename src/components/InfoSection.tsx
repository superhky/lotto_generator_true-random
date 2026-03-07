
import React from 'react';
import { BookOpen, HelpCircle, Lightbulb, HeartHandshake } from 'lucide-react';
import { translations, type Language } from '../utils/translations';

interface InfoSectionProps {
  lang: Language;
}

const InfoSection: React.FC<InfoSectionProps> = ({ lang }) => {
  const t = translations[lang].infoSection;

  return (
    <div className="mt-16 space-y-12 text-slate-300 max-w-4xl mx-auto px-4 pb-20">
      {/* 1. Mathematical Understanding */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-blue-400">
          <BookOpen size={24} />
          <h2 className="text-2xl font-bold">{t.mathTitle}</h2>
        </div>
        <p className="leading-relaxed whitespace-pre-line">
          {t.mathDesc}
        </p>
      </section>

      {/* 2. Statistical Tips (New) */}
      <section className="space-y-4 p-6 bg-blue-500/5 border border-blue-500/10 rounded-3xl">
        <div className="flex items-center gap-2 text-yellow-400">
          <Lightbulb size={24} />
          <h2 className="text-2xl font-bold">{t.strategyTitle}</h2>
        </div>
        <p className="leading-relaxed whitespace-pre-line">
          {t.strategyDesc}
        </p>
      </section>

      {/* 3. True Random Explanation */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-purple-400">
          <HelpCircle size={24} />
          <h2 className="text-2xl font-bold">{t.randomTitle}</h2>
        </div>
        <div className="space-y-3">
          <p className="leading-relaxed whitespace-pre-line">
            {t.randomDesc}
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-2">
            {t.sources.map((source, idx) => (
              <li key={idx} className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
                <span className="text-slate-100 font-bold block mb-1">{source.name}</span> 
                <span className="text-sm text-slate-400">{source.desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Responsible Gaming (New) */}
      <section className="space-y-4 p-6 bg-red-500/5 border border-red-500/10 rounded-3xl">
        <div className="flex items-center gap-2 text-red-400">
          <HeartHandshake size={24} />
          <h2 className="text-2xl font-bold">{t.responsibleTitle}</h2>
        </div>
        <p className="leading-relaxed whitespace-pre-line text-sm md:text-base">
          {t.responsibleDesc}
        </p>
      </section>
    </div>
  );
};

export default InfoSection;
