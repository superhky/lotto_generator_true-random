
import React, { useState, useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { translations, type Language } from '../utils/translations';

interface InterstitialAdProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

const InterstitialAd: React.FC<InterstitialAdProps> = ({ isOpen, onClose, lang }) => {
  const [countdown, setCountdown] = useState(3);
  const t = translations[lang];

  useEffect(() => {
    if (isOpen) {
      setCountdown(3);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
      >
        <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-700 bg-slate-800 px-6 py-4">
            <span className="text-sm font-semibold tracking-wider text-slate-400 uppercase">Sponsored Ad</span>
            <button
              onClick={countdown === 0 ? onClose : undefined}
              className={`flex items-center gap-2 rounded-lg px-3 py-1 text-sm font-medium transition-colors ${
                countdown === 0 ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-700 text-slate-500 cursor-not-allowed'
              }`}
            >
              {countdown > 0 ? `${t.adSkip} ${countdown}s` : t.adClose}
              <X size={16} />
            </button>
          </div>

          <div className="aspect-video w-full bg-slate-800 flex flex-col items-center justify-center p-8 text-center space-y-6">
             <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400">
               <ExternalLink size={40} />
             </div>
             <div>
                <h3 className="text-2xl font-bold text-white mb-2">{t.adTitle}</h3>
                <p className="text-slate-400">{t.adSubtitle}</p>
             </div>
             <div className="w-full h-32 bg-slate-700/50 rounded-xl flex items-center justify-center border border-dashed border-slate-600">
                <span className="text-slate-500 italic">Google AdSense Area</span>
             </div>
             <button className="px-8 py-3 bg-blue-600 rounded-full font-bold text-white hover:bg-blue-500 transition-all">
                {t.adViewMore}
             </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InterstitialAd;
