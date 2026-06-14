import React, { useEffect, useRef } from 'react';

const KakaoAdTop: React.FC = () => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const adContainer = adRef.current;
    if (adContainer && adContainer.children.length === 0) {
      
      const ins = document.createElement('ins');
      ins.className = 'kakao_ad_area';
      ins.style.display = 'none';
      ins.setAttribute('data-ad-unit', 'DAN-m5WogfZ2E1aXUzzK');
      ins.setAttribute('data-ad-width', '320');
      ins.setAttribute('data-ad-height', '100');

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://t1.kakaocdn.net/kas/static/ba.min.js';
      script.async = true;

      adContainer.appendChild(ins);
      adContainer.appendChild(script);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center my-4 overflow-hidden w-full">
      <div 
        ref={adRef} 
        className="min-h-[100px] w-[320px] flex items-center justify-center bg-slate-900/50 rounded-lg border border-slate-800"
      >
        {/* Kakao Ad will be injected here */}
      </div>
      <p className="text-[10px] text-slate-600 mt-2 tracking-widest uppercase">ADVERTISEMENT</p>
    </div>
  );
};

export default KakaoAdTop;
