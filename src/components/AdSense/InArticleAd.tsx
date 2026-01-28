import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface InArticleAdProps {
  adSlot: string;
  className?: string;
}

const InArticleAd: React.FC<InArticleAdProps> = ({ adSlot, className = '' }) => {
  const adRef = useRef<HTMLDivElement>(null);
  const isAdLoaded = useRef(false);

  useEffect(() => {
    if (isAdLoaded.current) return;

    try {
      if (window.adsbygoogle && adRef.current) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isAdLoaded.current = true;
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }

    return () => {
      isAdLoaded.current = false;
    };
  }, []);

  return (
    <div ref={adRef} className={`in-article-ad my-8 ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-6734760373013716"
        data-ad-slot={adSlot}
      />
    </div>
  );
};

export default InArticleAd;
