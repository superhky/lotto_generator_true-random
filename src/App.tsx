
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Radio, Thermometer, User, RefreshCw, Languages, Shield, Info, Mail, X } from 'lucide-react';
import { 
  getAtmosphericRandom, 
  getQuantumRandom, 
  getOpticalThermalRandom, 
  getJitterRandom, 
  getUserEntropyRandom 
} from './utils/TRNGService';
// import AdComponent from './components/AdComponent'; // 심사 중 미사용
import KakaoAd from './components/KakaoAd';
import KakaoAdVertical from './components/KakaoAdVertical';
import InfoSection from './components/InfoSection';
// import InterstitialAd from './components/InterstitialAd'; // 심사 중 미사용
import { translations, type Language } from './utils/translations';

interface LottoSet {
  id: string;
  source: string;
  numbers: number[];
  icon: React.ReactNode;
  description: string;
}

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ko');
  const [sets, setSets] = useState<LottoSet[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  // const [isAdOpen, setIsAdOpen] = useState(false); // 심사 중 미사용
  const [userEntropy, setUserEntropy] = useState<number[]>([]);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const t = translations[lang];

  // Collect user entropy from mouse movements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (userEntropy.length < 100) {
        setUserEntropy((prev) => [...prev, (e.clientX + e.clientY) % 256]);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [userEntropy]);

  const generateAllNumbers = useCallback(async () => {
    setIsGenerating(true);
    
    try {
      const results: LottoSet[] = [
        {
          id: 'atmospheric',
          source: '[Atmospheric Source]',
          numbers: await getAtmosphericRandom(),
          icon: <Radio className="text-blue-400" size={18} />,
          description: t.sourceLabels.atmospheric
        },
        {
          id: 'quantum',
          source: '[Quantum Source]',
          numbers: await getQuantumRandom(),
          icon: <Zap className="text-purple-400" size={18} />,
          description: t.sourceLabels.quantum
        },
        {
          id: 'thermal',
          source: '[Optical/Thermal Source]',
          numbers: getOpticalThermalRandom(),
          icon: <Thermometer className="text-red-400" size={18} />,
          description: t.sourceLabels.thermal
        },
        {
          id: 'jitter',
          source: '[Hardware Jitter Source]',
          numbers: getJitterRandom(),
          icon: <RefreshCw className="text-green-400" size={18} />,
          description: t.sourceLabels.jitter
        },
        {
          id: 'user',
          source: '[User Entropy Source]',
          numbers: getUserEntropyRandom(userEntropy),
          icon: <User className="text-orange-400" size={18} />,
          description: t.sourceLabels.user
        }
      ];

      setSets(results);
    } catch (error) {
      console.error("Failed to generate numbers:", error);
    } finally {
      setIsGenerating(false);
      setHasGenerated(true);
    }
  }, [userEntropy, t]);

  const handleStartGeneration = () => {
    generateAllNumbers();
  };

  /* // 심사 중 미사용
  const onAdClose = () => {
    setIsAdOpen(false);
  };
  */

  const getBallColor = (num: number) => {
    if (num <= 10) return 'ball-1';
    if (num <= 20) return 'ball-10';
    if (num <= 30) return 'ball-20';
    if (num <= 40) return 'ball-30';
    return 'ball-40';
  };

  const toggleLang = () => {
    setLang(prev => prev === 'ko' ? 'en' : 'ko');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Side Ads (Visible on Large Screens) */}
      <div className="hidden xl:block fixed left-4 top-24 z-10">
        <KakaoAdVertical />
      </div>
      <div className="hidden xl:block fixed right-4 top-24 z-10">
        <KakaoAdVertical />
      </div>

      {/* Language Switcher Floating Button */}
      <div className="fixed top-6 right-6 z-40">
        <button 
          onClick={toggleLang}
          className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md border border-slate-700 px-4 py-2 rounded-full hover:bg-slate-800 transition-all text-sm font-medium shadow-lg"
        >
          <Languages size={16} className="text-blue-400" />
          {lang === 'ko' ? 'English' : '한국어'}
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <header className="text-center space-y-4 mb-12">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium"
          >
            <Sparkles size={16} />
            {t.siteTitle}
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
            {t.heroTitle}
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto whitespace-pre-line">
            {t.heroSubtitle1}<br className="hidden md:block" />
            {t.heroSubtitle2}
          </p>
        </header>

        {/* Generation Trigger */}
        <div className="flex justify-center my-12">
          <button
            onClick={handleStartGeneration}
            disabled={isGenerating}
            className="group relative px-8 py-4 bg-blue-600 rounded-2xl font-bold text-xl transition-all hover:bg-blue-500 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(37,99,235,0.4)]"
          >
            <span className="flex items-center gap-3">
              {isGenerating ? t.generating : t.generateBtn}
              <RefreshCw className={isGenerating ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'} />
            </span>
          </button>
        </div>

        {/* Lotto Sets Display */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {!hasGenerated ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center p-12 border-2 border-dashed border-slate-800 rounded-3xl"
              >
                <p className="text-slate-500 italic">{t.emptyPrompt}</p>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {sets.map((set, idx) => (
                  <motion.div
                    key={set.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.15 }}
                    className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl backdrop-blur-sm hover:border-slate-700 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-800 rounded-xl">
                          {set.icon}
                        </div>
                        <div>
                          <h3 className="font-mono text-blue-400 font-bold text-sm tracking-widest">{set.source}</h3>
                          <p className="text-xs text-slate-500">{set.description}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 md:gap-4 justify-center md:justify-start">
                      {set.numbers.map((num, nIdx) => (
                        <motion.div
                          key={`${set.id}-${num}`}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ 
                            type: 'spring', 
                            stiffness: 260, 
                            damping: 20, 
                            delay: idx * 0.15 + nIdx * 0.05 
                          }}
                          className={`lotto-ball ${getBallColor(num)} shadow-xl`}
                        >
                          {num}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Ad for Review */}
        <KakaoAd />

        {/* Educational Info Section */}
        <InfoSection lang={lang} />

        {/* Footer */}
        <footer className="mt-20 text-center text-slate-600 text-sm border-t border-slate-900 pt-8 pb-12">
          <p>{t.footer.rights}</p>
          <p className="mt-2">{t.footer.warning}</p>
          
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <button onClick={() => setShowPrivacy(true)} className="hover:text-slate-400 transition-colors flex items-center gap-1">
              <Shield size={14} /> {t.footer.privacy}
            </button>
            <button onClick={() => setShowTerms(true)} className="hover:text-slate-400 transition-colors flex items-center gap-1">
              <Info size={14} /> {t.footer.terms}
            </button>
            <a href="mailto:superhky@hotmail.com" className="hover:text-slate-400 transition-colors flex items-center gap-1">
              <Mail size={14} /> {t.footer.contact}
            </a>
          </div>
        </footer>
      </div>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {showPrivacy && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-slate-900 border border-slate-700 max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-800/50">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Shield className="text-blue-400" />
                  {t.privacyPolicy.title}
                </h2>
                <button onClick={() => setShowPrivacy(false)} className="p-2 hover:bg-slate-700 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="p-8 text-slate-400 leading-relaxed max-h-[60vh] overflow-y-auto">
                <p className="whitespace-pre-line">{t.privacyPolicy.content}</p>
                <div className="mt-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                  <p className="text-xs">
                    Contact: <span className="text-slate-300">superhky@hotmail.com</span><br/>
                    Last Updated: March 2026
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terms of Service Modal */}
      <AnimatePresence>
        {showTerms && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-slate-900 border border-slate-700 max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-800/50">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Info className="text-blue-400" />
                  {t.footer.terms}
                </h2>
                <button onClick={() => setShowTerms(false)} className="p-2 hover:bg-slate-700 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="p-8 text-slate-400 leading-relaxed max-h-[60vh] overflow-y-auto">
                <p className="whitespace-pre-line">{t.termsOfService.content}</p>
                <div className="mt-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                  <p className="text-xs">
                    Last Updated: March 2026
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
