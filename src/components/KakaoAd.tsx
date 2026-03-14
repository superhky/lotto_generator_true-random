
import React, { useEffect } from 'react';

const KakaoAd: React.FC = () => {
  useEffect(() => {
    // Kakao AdFit usually handles initialization via its script automatically,
    // but in SPA environments, the script needs to be present in index.html.
  }, []);

  return (
    <div className="flex justify-center my-4 overflow-hidden rounded-lg">
      <ins 
        className="kakao_ad_area" 
        style={{ display: 'none' }}
        data-ad-unit="DAN-k0Q13vABDjpykvuh"
        data-ad-width="320"
        data-ad-height="50"
      ></ins>
    </div>
  );
};

export default KakaoAd;
