
import React, { useEffect } from 'react';

interface AdComponentProps {
  slot?: string;
  format?: 'auto' | 'fluid';
  style?: React.CSSProperties;
}

const AdComponent: React.FC<AdComponentProps> = ({ slot, format = 'auto', style }) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('Adsbygoogle error:', e);
    }
  }, []);

  return (
    <div className="w-full flex justify-center my-4 overflow-hidden min-h-[90px] bg-slate-800/20 rounded-lg border border-slate-700/50 items-center text-slate-500 text-xs uppercase tracking-widest">
      {/* Placeholder for Google Adsense */}
      <ins
        className="adsbygoogle"
        style={style || { display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with actual ID
        data-ad-slot={slot || "XXXXXXXXXX"} // Replace with actual Slot
        data-ad-format={format}
        data-full-width-responsive="true"
      ></ins>
      <span className="absolute">ADVERTISEMENT</span>
    </div>
  );
};

export default AdComponent;
