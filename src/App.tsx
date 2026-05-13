
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
import KakaoAd from './components/KakaoAd';
import KakaoAdVertical from './components/KakaoAdVertical';
import KakaoAdRectangle from './components/KakaoAdRectangle';
import InfoSection from './components/InfoSection';
import { translations, type Language } from './utils/translations';

interface LottoSet {
  id: string;
  source: string;
  numbers: number[];
  icon: React.ReactNode;
  description: string;
  isLoading: boolean;
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
    console.log('generateAllNumbers: starting, hasGenerated:', hasGenerated);
    setHasGenerated(false); // Reset generated state
    console.log('generateAllNumbers: set hasGenerated to false');

    const initialSets: LottoSet[] = [
      { id: 'atmospheric', source: '[Atmospheric Source]', numbers: [], icon: <Radio className="text-blue-400" size={18} />, description: t.sourceLabels.atmospheric, isLoading: true },
      { id: 'quantum', source: '[Quantum Source]', numbers: [], icon: <Zap className="text-purple-400" size={18} />, description: t.sourceLabels.quantum, isLoading: true },
      { id: 'thermal', source: '[Optical/Thermal Source]', numbers: [], icon: <Thermometer className="text-red-400" size={18} />, description: t.sourceLabels.thermal, isLoading: true },
      { id: 'jitter', source: '[Hardware Jitter Source]', numbers: [], icon: <RefreshCw className="text-green-400" size={18} />, description: t.sourceLabels.jitter, isLoading: true },
      { id: 'user', source: '[User Entropy Source]', numbers: [], icon: <User className="text-orange-400" size={18} />, description: t.sourceLabels.user, isLoading: true },
    ];
    setSets(initialSets); // Set initial loading states
    console.log('generateAllNumbers: initialSets set, sets length:', initialSets.length);

    setIsGenerating(true); // Indicate overall generation started

    // Fetch numbers for each source and update state individually
    const results = await Promise.allSettled(initialSets.map(async (initialSet) => {
      let numbers: number[] = [];
      try {
        if (initialSet.id === 'atmospheric') {
          numbers = await getAtmosphericRandom();
        } else if (initialSet.id === 'quantum') {
          numbers = await getQuantumRandom();
        } else if (initialSet.id === 'thermal') {
          numbers = await getOpticalThermalRandom();
        } else if (initialSet.id === 'jitter') {
          numbers = getJitterRandom();
        } else if (initialSet.id === 'user') {
          numbers = getUserEntropyRandom(userEntropy);
        }
      } catch (error) {
        console.error(`Failed to generate numbers for ${initialSet.id}:`, error);
        // If an error occurs, return the initial set with numbers as empty and isLoading: false
        return { ...initialSet, numbers: [], isLoading: false };
      }
      return { ...initialSet, numbers, isLoading: false };
    }));

    // Process the results from Promise.allSettled
    const updatedSets: LottoSet[] = results.map(result => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        // If a promise was rejected, log the reason and return a default/failed state
        console.error("Promise rejected:", result.reason);
        // Find the corresponding initial set to retain its icon/description if possible
        const failedInitialSet = initialSets.find(s => s.id === (result.reason?.id || 'unknown')); // Assuming reason might carry id for debugging
        return { 
          ...(failedInitialSet || { id: 'error', source: 'Error', icon: null, description: 'Generation Failed' }), // Fallback if initial set not found
          numbers: [], 
          isLoading: false 
        };
      }
    });

    setSets(updatedSets); // Update with final numbers and loading states
    console.log('generateAllNumbers: updatedSets set, sets length:', updatedSets.length);
    setIsGenerating(false); // Overall generation finished
    setHasGenerated(true); // Mark as generated
    console.log('generateAllNumbers: set hasGenerated to true');
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
      {/* Desktop Side Ad (Visible on 1024px+ screens) */}
      <div className="hidden lg:block fixed left-2 xl:left-6 top-24 z-10">
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
                {sets.map((set, idx) => {
                  console.log(set.id, set.numbers, typeof set.numbers); // DEBUG LOG
                  return (
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
                      {set.isLoading ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-2 text-blue-300 italic p-4 rounded-xl bg-slate-800"
                        >
                          <RefreshCw className="animate-spin" size={20} />
                          <span>{t.generatingNumbers}</span>
                        </motion.div>
                      ) : (
                        set.numbers.map((num, nIdx) => (
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
                        ))
                      )}
                    </div>                  </motion.div>
                  ); // Corrected placement of return
                })} {/* This closes the map function correctly */}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Ads Section (Avoid duplicate IDs for stability) */}
        <KakaoAdRectangle />
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
