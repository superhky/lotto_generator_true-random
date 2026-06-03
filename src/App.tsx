
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Radio, Thermometer, User, RefreshCw, Languages, Shield, Info, Mail, X, Download, Share2 } from 'lucide-react';
import { toBlob } from 'html-to-image';
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
import KakaoAd320x480 from './components/KakaoAd320x480';
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

const CategoryAnimation = ({ id, t }: { id: string, t: any }) => {
  switch (id) {
    case 'atmospheric':
      return (
        <div className="flex gap-2 h-10 items-center justify-center p-4">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2.5 bg-blue-400 rounded-full"
              animate={{ height: ['20%', '100%', '20%'] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
          <span className="ml-3 text-blue-400 font-bold italic">{t.generatingNumbers || '생성 중...'}</span>
        </div>
      );
    case 'quantum':
      return (
        <div className="relative w-48 h-12 flex justify-center items-center overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_8px_#a855f7]"
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{
                x: (Math.random() - 0.5) * 160,
                y: (Math.random() - 0.5) * 40,
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0]
              }}
              transition={{ duration: 0.6, repeat: Infinity, delay: Math.random() }}
            />
          ))}
          <span className="z-10 text-purple-300 font-bold italic">{t.generatingNumbers || '생성 중...'}</span>
        </div>
      );
    case 'thermal':
      return (
        <div className="flex justify-center items-end h-12 gap-1.5 p-2 w-48">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 rounded-t-full"
              style={{ background: 'linear-gradient(to top, #ea580c, #ef4444, #fcd34d)' }}
              animate={{ height: ['30%', `${Math.random() * 60 + 40}%`, '30%'] }}
              transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.1, repeatType: 'mirror' }}
            />
          ))}
          <span className="ml-2 text-red-400 font-bold italic self-center">{t.generatingNumbers || '생성 중...'}</span>
        </div>
      );
    case 'jitter':
      return (
        <div className="flex items-center justify-center gap-3 p-3">
          <motion.div
            animate={{ x: [-2, 2, -2, 2, 0], y: [1, -1, 1, -1, 0] }}
            transition={{ duration: 0.2, repeat: Infinity }}
            className="text-green-400 font-mono font-bold text-xl tracking-widest drop-shadow-[0_0_5px_#4ade80]"
          >
            010110
          </motion.div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          >
            <RefreshCw className="text-green-400" size={24} />
          </motion.div>
        </div>
      );
    case 'user':
      return (
        <div className="relative w-48 h-12 flex justify-center items-center border border-orange-500/30 rounded-lg bg-orange-900/20 overflow-hidden">
          <motion.div
            animate={{ 
              x: [-40, 40, 20, -30, -40],
              y: [-10, 15, -15, 10, -10]
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute"
          >
            <User size={20} className="text-orange-400" />
          </motion.div>
          <div className="w-full h-full absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_#f97316_0%,_transparent_60%)] animate-pulse"></div>
          <span className="z-10 text-orange-300 font-bold italic ml-6">{t.generatingNumbers || '생성 중...'}</span>
        </div>
      );
    default:
      return null;
  }
};

const WealthLuckIndicator = ({ luck, t }: { luck: number, t: any }) => {
  let message = '';
  let colorClass = '';
  let barColor = '';
  let AnimationOverlay = null;
  
  if (luck >= 90) {
    message = t.wealthLuck.level4;
    colorClass = 'text-red-400';
    barColor = 'bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400';
    AnimationOverlay = (
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-full">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-yellow-300 rounded-full shadow-[0_0_5px_#fde047]"
            initial={{ 
              left: `${Math.random() * 100}%`, 
              top: '120%', 
              opacity: 0,
              scale: 0.5 
            }}
            animate={{ 
              top: '-20%', 
              opacity: [0, 1, 0],
              scale: [0.5, 1.2, 0.5],
              x: [0, Math.random() * 20 - 10]
            }}
            transition={{ 
              duration: Math.random() * 1 + 0.5, 
              repeat: Infinity, 
              delay: Math.random() * 2 
            }}
          />
        ))}
        <motion.div 
          className="absolute inset-0 bg-white/20"
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      </div>
    );
  } else if (luck >= 70) {
    message = t.wealthLuck.level3;
    colorClass = 'text-yellow-400';
    barColor = 'bg-gradient-to-r from-yellow-500 to-yellow-300';
    AnimationOverlay = (
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-full">
        <motion.div 
          className="absolute top-0 bottom-0 w-16 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-20deg]"
          animate={{ left: ['-30%', '130%'] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        />
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute flex items-center justify-center"
            initial={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`,
              scale: 0,
              opacity: 0
            }}
            animate={{ 
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0],
              rotate: [0, 90, 180]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              delay: Math.random() * 2 
            }}
          >
             <Sparkles size={12} className="text-yellow-100 opacity-80" />
          </motion.div>
        ))}
      </div>
    );
  } else if (luck >= 30) {
    message = t.wealthLuck.level2;
    colorClass = 'text-blue-400';
    barColor = 'bg-gradient-to-r from-blue-600 to-blue-400';
    AnimationOverlay = (
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-full flex items-center">
        <motion.div 
          className="w-full h-full bg-blue-300/20"
          animate={{ opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    );
  } else {
    message = t.wealthLuck.level1;
    colorClass = 'text-slate-400';
    barColor = 'bg-gradient-to-r from-slate-600 to-slate-500';
    AnimationOverlay = (
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-full flex items-center justify-center">
        <motion.div 
          className="w-full h-full bg-slate-900/20"
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[1.5px] h-3 bg-slate-300/40 rounded-full"
            initial={{ 
              left: `${Math.random() * 100}%`, 
              top: '-10px'
            }}
            animate={{ 
              top: '30px',
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: Math.random() * 0.5 + 0.5, 
              repeat: Infinity, 
              delay: Math.random() * 2 
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
      className={`max-w-lg mx-auto mb-14 p-8 bg-slate-900/80 rounded-3xl shadow-2xl backdrop-blur-xl text-center relative overflow-hidden border-2 ${
        luck >= 90 ? 'border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.3)]' :
        luck >= 70 ? 'border-yellow-500/50 shadow-[0_0_30px_rgba(234,179,8,0.2)]' :
        luck >= 30 ? 'border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.15)]' :
        'border-slate-700/50 shadow-lg'
      }`}
    >
      {/* Background ambient glow & internal animations based on luck */}
      {luck >= 90 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-red-500/20 blur-2xl animate-pulse"></div>
          {/* Shimmer */}
          <motion.div 
            className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]"
            animate={{ left: ['-50%', '150%'] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 0.5, ease: "easeInOut" }}
          />
          {/* Fireworks */}
          {[...Array(6)].map((_, i) => {
            const delay = Math.random() * 2;
            const leftPos = 20 + Math.random() * 60;
            const topPos = 20 + Math.random() * 40;
            return (
              <div key={i} className="absolute" style={{ left: `${leftPos}%`, top: `${topPos}%` }}>
                {[...Array(8)].map((_, j) => {
                  const angle = (j / 8) * Math.PI * 2;
                  const distance = 40 + Math.random() * 30;
                  return (
                    <motion.div
                      key={j}
                      className={`absolute w-1.5 h-1.5 rounded-full ${['bg-yellow-300', 'bg-red-400', 'bg-white', 'bg-orange-300'][Math.floor(Math.random()*4)]} shadow-[0_0_10px_currentColor]`}
                      initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                      animate={{ 
                        x: Math.cos(angle) * distance, 
                        y: Math.sin(angle) * distance, 
                        opacity: [0, 1, 0], 
                        scale: [0, 1.5, 0] 
                      }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: delay, ease: "easeOut" }}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
      {luck >= 70 && luck < 90 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-yellow-500/15 blur-2xl animate-[pulse_3s_ease-in-out_infinite]"></div>
          {/* Shimmer */}
          <motion.div 
            className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
            animate={{ left: ['-50%', '150%'] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
          />
          {/* Sparkle Stars */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-yellow-300 drop-shadow-[0_0_8px_rgba(253,224,71,0.8)]"
              initial={{ left: `${Math.random() * 100}%`, top: '100%', opacity: 0 }}
              animate={{ top: '-10%', opacity: [0, 1, 0], rotate: [0, 180, 360] }}
              transition={{ duration: Math.random() * 2 + 4, repeat: Infinity, delay: Math.random() * 2, ease: "linear" }}
            >
              <Sparkles size={14 + Math.random() * 10} />
            </motion.div>
          ))}
        </div>
      )}
      {luck >= 30 && luck < 70 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-blue-500/10 blur-2xl animate-[pulse_4s_ease-in-out_infinite]"></div>
          {/* Water Shimmer / Ripple */}
          <motion.div 
            className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-blue-300/10 to-transparent skew-x-[-30deg]"
            animate={{ left: ['-50%', '150%'] }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
          />
          {/* Bubbles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-blue-400/20 border-2 border-blue-300/70 rounded-full"
              style={{ width: `${8 + Math.random() * 12}px`, height: `${8 + Math.random() * 12}px` }}
              initial={{ left: `${Math.random() * 100}%`, top: '100%', opacity: 0 }}
              animate={{ top: '-10%', opacity: [0, 0.9, 0], x: [0, Math.random() * 30 - 15, 0] }}
              transition={{ duration: Math.random() * 3 + 3, repeat: Infinity, delay: Math.random() * 2, ease: "easeInOut" }}
            />
          ))}
        </div>
      )}
      {luck < 30 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/30 blur-2xl"></div>
          {/* Heavy Shadow Shimmer */}
          <motion.div 
            className="absolute top-0 bottom-0 w-full bg-gradient-to-b from-transparent via-slate-800/40 to-transparent"
            animate={{ top: ['-100%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          {/* Rain / Static */}
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[2px] h-8 bg-slate-300/70 rounded-full shadow-[0_0_5px_rgba(203,213,225,0.5)]"
              initial={{ left: `${Math.random() * 100}%`, top: '-20%', opacity: 0 }}
              animate={{ top: '120%', opacity: [0, 1, 0.5] }}
              transition={{ duration: Math.random() * 0.8 + 0.5, repeat: Infinity, delay: Math.random() * 2, ease: "linear" }}
            />
          ))}
        </div>
      )}
      
      <motion.div 
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="inline-block mb-2"
      >
        <span className="text-2xl">✨</span>
      </motion.div>
      <h3 className="text-xl font-black text-white mb-6 relative z-10 drop-shadow-md">{t.wealthLuck.title}</h3>
      <div className="relative h-8 bg-slate-800 rounded-full overflow-hidden mb-5 shadow-inner border border-slate-700/50">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${luck}%` }}
          transition={{ duration: 1.5, ease: "easeOut", type: "spring", bounce: 0.2 }}
          className={`absolute top-0 left-0 h-full ${barColor} shadow-[0_0_15px_rgba(0,0,0,0.3)]`}
        >
           {AnimationOverlay}
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center font-black text-sm text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] z-10 mix-blend-normal">
          {luck}%
        </div>
      </div>
      <p className={`text-lg font-bold ${colorClass} break-keep relative z-10 drop-shadow-md`}>
        {message}
      </p>
    </motion.div>
  );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ko');
  const [sets, setSets] = useState<LottoSet[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  // const [isAdOpen, setIsAdOpen] = useState(false); // 심사 중 미사용
  const [userEntropy, setUserEntropy] = useState<number[]>([]);
  const [wealthLuck, setWealthLuck] = useState<number | null>(null);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const t = translations[lang];

  useEffect(() => {
    // Generate a momentary wealth luck score between 1 and 100 on load
    setWealthLuck(Math.floor(Math.random() * 100) + 1);
  }, []);

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
    setIsGenerating(true); // Indicate overall generation started

    const initialSets: LottoSet[] = [
      { id: 'atmospheric', source: '[Atmospheric Source]', numbers: [], icon: <Radio className="text-blue-400" size={18} />, description: t.sourceLabels.atmospheric, isLoading: true },
      { id: 'quantum', source: '[Quantum Source]', numbers: [], icon: <Zap className="text-purple-400" size={18} />, description: t.sourceLabels.quantum, isLoading: true },
      { id: 'thermal', source: '[Optical/Thermal Source]', numbers: [], icon: <Thermometer className="text-red-400" size={18} />, description: t.sourceLabels.thermal, isLoading: true },
      { id: 'jitter', source: '[Hardware Jitter Source]', numbers: [], icon: <RefreshCw className="text-green-400" size={14} />, description: t.sourceLabels.jitter, isLoading: true },
      { id: 'user', source: '[User Entropy Source]', numbers: [], icon: <User className="text-orange-400" size={18} />, description: t.sourceLabels.user, isLoading: true },
    ];
    setSets(initialSets); // Set initial loading states

    // Generate sequentially
    for (const setDef of initialSets) {
      // Create fetch promise to run in background
      const fetchPromise = (async () => {
        try {
          if (setDef.id === 'atmospheric') return await getAtmosphericRandom();
          if (setDef.id === 'quantum') return await getQuantumRandom();
          if (setDef.id === 'thermal') return await getOpticalThermalRandom();
          if (setDef.id === 'jitter') return getJitterRandom();
          if (setDef.id === 'user') return getUserEntropyRandom(userEntropy);
          return [];
        } catch (error) {
          console.error(`Failed: ${setDef.id}`, error);
          return [];
        }
      })();

      // Artificial wait for animation (5000ms per category)
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      const numbers = await fetchPromise;

      // Update state for this set
      setSets(prev => prev.map(s => s.id === setDef.id ? { ...s, numbers, isLoading: false } : s));
    }

    setIsGenerating(false); // Overall generation finished
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

  const handleAction = async (action: 'download' | 'share') => {
    if (!printRef.current) return;

    if (sets.length === 0 || isGenerating) {
      alert(lang === 'ko' ? '번호 생성이 완료된 후 시도해주세요!' : 'Please wait until generation is complete!');
      return;
    }

    // 공유: 생성된 로또 번호와 URL 공유
    if (action === 'share') {

      const generatedNumbersText = sets.map(set => {
        if (set.numbers && set.numbers.length > 0) {
          return `${set.description}: ${set.numbers.join(', ')}`;
        }
        return '';
      }).filter(Boolean).join('\n');

      const shareContent = {
        title: t.siteTitle,
        text: `${t.shareText}\n${generatedNumbersText}`,
        url: window.location.href,
      };

      if (navigator.share) {
        navigator.share(shareContent);
      } else {
        alert(lang === 'ko' ? '이 기기/브라우저에서는 공유 기능을 지원하지 않습니다.' : 'Sharing is not supported on this device/browser.');
      }
      return;
    }

    // 다운로드: 이미지를 자동으로 컴퓨터에 저장
    const originalClass = printRef.current.className;
    printRef.current.className = originalClass + ' !bg-slate-950';

    try {
      const imageBlob = await toBlob(printRef.current, {
        backgroundColor: '#020617', // slate-950
        pixelRatio: 2,
      });

      if (!imageBlob) throw new Error('Blob generation failed');

      const fileName = `true-random-lotto-${new Date().toISOString().slice(0,10)}.png`;
      const imageUrl = URL.createObjectURL(imageBlob);
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(imageUrl);
    } catch (error) {
      console.error('Error saving image:', error);
      alert(lang === 'ko' ? '이미지 처리에 실패했습니다.' : 'Failed to process image.');
    } finally {
      if (printRef.current) {
        printRef.current.className = originalClass;
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30 overflow-x-hidden relative">
      {/* Dynamic Full Screen Ambient Glow based on Wealth Luck */}
      <AnimatePresence>
        {wealthLuck !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 pointer-events-none z-0"
          >
            {wealthLuck >= 90 && <div className="absolute inset-0 bg-red-500/10 blur-[100px] animate-pulse"></div>}
            {wealthLuck >= 70 && wealthLuck < 90 && <div className="absolute inset-0 bg-yellow-500/10 blur-[100px] animate-[pulse_4s_ease-in-out_infinite]"></div>}
            {wealthLuck >= 30 && wealthLuck < 70 && <div className="absolute inset-0 bg-blue-500/5 blur-[100px]"></div>}
          </motion.div>
        )}
      </AnimatePresence>

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
          <p className="text-slate-400 text-lg max-w-2xl mx-auto whitespace-pre-line relative z-10">
            {t.heroSubtitle1}<br className="hidden md:block" />
            {t.heroSubtitle2}
          </p>
        </header>

        {/* Wealth Luck Indicator */}
        {wealthLuck !== null && <WealthLuckIndicator luck={wealthLuck} t={t} />}

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
            {sets.length === 0 ? (
              <motion.div
                key="empty-prompt"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center p-12 border-2 border-dashed border-slate-800 rounded-3xl"
              >

                <p className="text-slate-500 italic">{t.emptyPrompt}</p>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center space-y-8">
                <div ref={printRef} className="w-full relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-2xl">
                  {/* Photo Card Header */}
                  <div className="bg-gradient-to-br from-slate-900 to-indigo-950 p-6 md:p-8 border-b border-slate-800/80 flex flex-col justify-center items-center relative overflow-hidden text-center space-y-5">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-500/10 blur-3xl rounded-full pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 blur-2xl rounded-full pointer-events-none"></div>
                    <div className="relative z-10 w-full mt-2 overflow-visible">
                      <h2 className="text-[13px] sm:text-[16px] md:text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 drop-shadow-2xl tracking-tight whitespace-nowrap mx-auto">
                        {lang === 'ko' ? '✨ 5가지 물리적 소스를 기반으로 한 오늘 당신의 행운 번호' : '✨ Your Unique Lucky Numbers from 5 Physical Sources'}
                      </h2>
                    </div>
                    <div className="relative z-10 flex items-center justify-center gap-3 w-full pb-2">
                      <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-md text-blue-300 text-xs md:text-sm font-black font-mono tracking-widest uppercase">
                        TRUE RANDOM LOTTO
                      </span>
                      <span className="text-slate-400 text-xs md:text-sm font-mono tracking-wider">
                        {new Date().toLocaleDateString(lang === 'ko' ? 'ko-KR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 md:p-8 space-y-6 relative">
                    {/* Watermark Background */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none overflow-hidden">
                      <span className="font-black text-7xl md:text-9xl italic tracking-tighter rotate-[-12deg] whitespace-nowrap">
                        TRUE RANDOM
                      </span>
                    </div>

                  {sets.map((set, idx) => {
                    console.log(set.id, set.numbers, typeof set.numbers); // DEBUG LOG
                  return (
                  <motion.div
                    key={set.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.15 }}
                    className="bg-slate-900/40 border border-slate-800/80 p-4 md:p-6 rounded-3xl backdrop-blur-md hover:border-slate-700/80 transition-colors relative z-10 shadow-lg"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      {/* Left Side: Source Info */}
                      <div className="flex items-center gap-4 w-full md:w-1/3">
                        <div className="p-3 bg-slate-800/80 rounded-2xl shadow-inner border border-slate-700/50 scale-110 flex-shrink-0">
                          {set.icon}
                        </div>
                        <div className="text-left flex flex-col justify-center">
                          <h3 className="text-base md:text-lg text-white font-black break-keep leading-snug drop-shadow-sm tracking-wide">
                            {t.sourceLabels[set.id as keyof typeof t.sourceLabels] || set.description}
                          </h3>
                        </div>
                      </div>

                      {/* Right Side: Numbers */}
                      <div className="flex flex-wrap gap-2.5 md:gap-3.5 justify-center md:justify-end w-full md:w-2/3">
                      {set.isLoading ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-2 p-2 rounded-xl"
                        >
                          <CategoryAnimation id={set.id} t={t} />
                        </motion.div>
                      ) : (
                        set.numbers.map((num, nIdx) => {
                          const baseColorClass = getBallColor(num);
                          const delay = idx * 0.15 + nIdx * 0.05;

                          if (set.id === 'quantum') {
                            return (
                              <motion.div
                                key={`${set.id}-${num}`}
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: 'spring', stiffness: 260, damping: 20, delay }}
                                className={`w-10 h-10 flex items-center justify-center font-black text-[17px] rounded-full shadow-[0_0_20px_rgba(168,85,247,0.9)] border-2 border-purple-300 relative transition-colors ${baseColorClass} z-10`}
                              >
                                <span className="drop-shadow-md z-20 relative">{num}</span>
                                <div className="absolute inset-[-14px] flex items-center justify-center opacity-100 pointer-events-none z-0">
                                  <div className="absolute w-full h-full border-[2.5px] border-purple-400 rounded-full shadow-[0_0_10px_#c084fc]" style={{ transform: 'rotate(0deg) scaleY(0.3)' }}></div>
                                  <div className="absolute w-full h-full border-[2.5px] border-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]" style={{ transform: 'rotate(60deg) scaleY(0.3)' }}></div>
                                  <div className="absolute w-full h-full border-[2.5px] border-pink-400 rounded-full shadow-[0_0_10px_#f472b6]" style={{ transform: 'rotate(120deg) scaleY(0.3)' }}></div>
                                  <div className="absolute w-2.5 h-2.5 bg-white rounded-full animate-pulse shadow-[0_0_12px_white]"></div>
                                </div>
                              </motion.div>
                            );
                          }

                          let scale = 1;
                          let rotation = 0;
                          let textYOffset = "";
                          let svgPath = "";
                          let fillStyle: React.CSSProperties = {};

                          switch (set.id) {
                            case 'atmospheric':
                              // atmospheric (cloud) symbol
                              svgPath = "M6 18a4 4 0 0 1-1.5-7.7 7 7 0 1 1 13 1.8 3.5 3.5 0 0 1-2.5 5.9H6z";
                              fillStyle = { fill: "#f3f4f6" };
                              scale = 1.6;
                              textYOffset = "mt-1";
                              break;
                            case 'thermal':
                              // thermal (flame) symbol
                              svgPath = "M12 2 C12 2, 4 9, 4 14 C4 18, 7 22, 12 22 C17 22, 20 18, 20 14 C20 9, 12 2, 12 2 Z";
                              fillStyle = { fill: "#dc2626" };
                              scale = 1.8;
                              textYOffset = "mt-2";
                              break;
                            case 'jitter':
                              // gear (톱니바퀴) icon
                              svgPath = "M12 2a1 1 0 0 1 .983.822l.117.468a5.5 5.5 0 0 1 2.018.97l.405-.236a1 1 0 0 1 1.133.225l.707.707a1 1 0 0 1 .225 1.133l-.236 .405a5.5 5.5 0 0 1-.95 2.018l.468 .117a1 1 0 0 1 .822 .983V12a1 1 0 0 1-.822 .983l-.468 .117a5.5 5.5 0 0 1-.97 2.018l.236 .405a1 1 0 0 1-.225 1.133l-.707 .707a1 1 0 0 1-1.133 .225l-.405-.236a5.5 5.5 0 0 1-2.018 .97l-.117 .468a1 1 0 0 1-.983 .822H12a1 1 0 0 1-.983-.822l-.117-.468a5.5 5.5 0 0 1-2.018-.97l-.405 .236a1 1 0 0 1-1.133-.225l-.707-.707a1 1 0 0 1-.225-1.133l.236-.405a5.5 5.5 0 0 1-.97-2.018l-.468-.117A1 1 0 0 1 5 12V12a1 1 0 0 1 .822-.983l.468-.117a5.5 5.5 0 0 1 .97-2.018l-.236-.405a1 1 0 0 1 .225-1.133l.707-.707a1 1 0 0 1 1.133-.225l.405 .236a5.5 5.5 0 0 1 2.018-.97l.117-.468A1 1 0 0 1 12 2z";
                              fillStyle = { fill: "#ffbf00" };
                              scale = 2.0;
                              textYOffset = "mt-0";
                              break;
                            case 'user':
                              // mouse-shaped user entropy symbol
                              svgPath = "M8 2C5.8 2 4 3.8 4 6V18C4 20.2 5.8 22 8 22H16C18.2 22 20 20.2 20 18V6C20 3.8 18.2 2 16 2H8zM8 4H16C17.1 4 18 4.9 18 6V10H6V6C6 4.9 6.9 4 8 4Z";
                              fillStyle = { fill: "#ffffff" };
                              scale = 1.6;
                              textYOffset = "mt-2 mr-1";
                              break;
                          }

                          return (
                            <motion.div
                              key={`${set.id}-${num}`}
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              whileHover={{ scale: 1.15 }}
                              transition={{ type: 'spring', stiffness: 260, damping: 20, delay }}
                              className="w-10 h-10 flex items-center justify-center relative z-10"
                            >
                              <svg viewBox="0 0 24 24" className="absolute inset-0 w-full h-full pointer-events-none" style={{ transform: `scale(${scale}) rotate(${rotation}deg)` }}>
                                <path d={svgPath} style={fillStyle} />
                              </svg>
                              <span className={`z-20 relative font-black text-[22px] text-black ${textYOffset}`}>{num}</span>
                              {set.id === 'quantum' && (
                                <div className={`absolute bottom-[-2px] right-[-4px] w-4 h-4 rounded-full border-[1.5px] border-slate-900 shadow-xl z-30 ${baseColorClass}`}></div>
                              )}
                            </motion.div>
                          );
                        })
                      )}
                    </div>
                  </div>
                  </motion.div>
                  );
                })}
                  </div>

                  {/* High Impact Photo Card Footer */}
                  <div className="bg-gradient-to-r from-blue-900 to-indigo-950 p-6 flex flex-col items-center justify-center relative overflow-hidden">
                     {/* subtle pattern overlay */}
                     <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20 pointer-events-none"></div>
                     <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                       <h1 className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 drop-shadow-xl tracking-tighter">
                         TRUE RANDOM LOTTO
                       </h1>
                       <div className="flex items-center gap-3 bg-black/40 px-6 py-2 rounded-full border border-white/10 backdrop-blur-md shadow-2xl">
                         <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_12px_rgba(74,222,128,0.9)]"></div>
                         <a href={typeof window !== 'undefined' ? window.location.href : '#'} className="text-blue-100 text-sm md:text-lg font-mono font-bold tracking-widest underline" target="_blank" rel="noopener noreferrer">
                           {typeof window !== 'undefined' ? window.location.href : 'https://true-random-lotto.com'}
                         </a>
                       </div>
                     </div>
                  </div>
                </div>

                {/* 이미지 다운로드 / 공유 버튼 */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="flex flex-col sm:flex-row items-center gap-4 mt-8"
                >
                  <button
                    onClick={() => handleAction('download')}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full font-medium transition-all shadow-lg text-slate-300 hover:text-white w-full sm:w-auto"
                  >
                    <Download size={18} className="text-blue-400" />
                    {(t as any).downloadImageOnly || '이미지 저장하기'}
                  </button>
                  <button
                    onClick={() => handleAction('share')}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-full font-medium transition-all shadow-lg text-blue-300 hover:text-white w-full sm:w-auto"
                  >
                    <Share2 size={18} className="text-blue-400" />
                    {(t as any).shareImageOnly || '공유하기'}
                  </button>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Ads Section (Avoid duplicate IDs for stability) */}
        <KakaoAdRectangle />
        <KakaoAd />
        <KakaoAd320x480 />

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
