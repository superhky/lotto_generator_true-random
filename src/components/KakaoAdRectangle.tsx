import React, { useEffect, useRef } from 'react';

const KakaoAdRectangle: React.FC = () => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const adContainer = adRef.current;
    if (adContainer) {
      adContainer.innerHTML = '';
      
      const ins = document.createElement('ins');
      ins.className = 'kakao_ad_area';
      ins.style.display = 'none';
      ins.setAttribute('data-ad-unit', 'DAN-voSsqf8h4XIQ3iop');
      ins.setAttribute('data-ad-width', '300');
      ins.setAttribute('data-ad-height', '250');

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://t1.daumcdn.net/kas/static/ba.min.js';
      script.async = true;

      adContainer.appendChild(ins);
      adContainer.appendChild(script);
    }

    return () => {
      if (adContainer) {
        adContainer.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center my-8 overflow-hidden w-full">
      <div 
        ref={adRef} 
        className="min-h-[250px] w-[300px] flex items-center justify-center bg-slate-900/50 rounded-lg border border-slate-800"
      >
        {/* Kakao Ad will be injected here */}
      </div>
      <p className="text-[10px] text-slate-600 mt-2 tracking-widest uppercase">ADVERTISEMENT</p>
    </div>
  );
};

export default KakaoAdRectangle;
