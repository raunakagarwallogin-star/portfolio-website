import React, { useState, useEffect, useRef } from 'react';
import './LaptopMockup.css';

export default function LaptopMockup({ imageSrc, alt, device = 'desktop', screens, prototypeUrl }) {
  const isMobile = device === 'mobile';
  const isMulti = screens && screens.length > 1;
  const hasPrototype = !!prototypeUrl;
  const [screenIndex, setScreenIndex] = useState(0);
  const [loadedSrc, setLoadedSrc] = useState(null);
  const contentRef = useRef(null);

  // Reset index when screens change
  useEffect(() => {
    setScreenIndex(0);
  }, [screens]);

  const currentSrc = isMulti ? screens[screenIndex].src : imageSrc;
  const currentLabel = isMulti ? screens[screenIndex].label : null;

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;

    const img = new Image();
    img.src = currentSrc;
    if (img.complete) {
      setLoadedSrc(currentSrc);
    } else {
      setLoadedSrc(null);
      img.onload = () => setLoadedSrc(currentSrc);
    }
  }, [currentSrc]);

  const prev = () => setScreenIndex(i => (i - 1 + screens.length) % screens.length);
  const next = () => setScreenIndex(i => (i + 1) % screens.length);

  return (
    <div className={`frame-mockup ${isMobile ? 'frame-mobile' : ''} ${hasPrototype ? 'frame-prototype' : ''}`}>
      {hasPrototype ? (
        <div className="frame-content frame-iframe-content">
          <iframe
            src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(prototypeUrl)}&hide-ui=1`}
            title={alt}
            allowFullScreen
            style={{ pointerEvents: 'auto' }}
          />
        </div>
      ) : (
        <div className="frame-content" ref={contentRef}>
          <div className="frame-screen-inner">
            <div className="frame-scroll-area">
              {loadedSrc === currentSrc && <img src={currentSrc} alt={alt} />}
            </div>
          </div>
        </div>
      )}
      {isMulti && !hasPrototype && (
        <>
          <button className="frame-arrow-btn frame-arrow-left" onClick={prev} aria-label="Previous">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button className="frame-arrow-btn frame-arrow-right" onClick={next} aria-label="Next">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </>
      )}
      {!isMobile && !isMulti && !hasPrototype && (
        <div className="frame-base">
          <div className="frame-notch"></div>
        </div>
      )}
    </div>
  );
}
