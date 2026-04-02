import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import './Hero.css';

function PaintText({ className, children, motionProps, paintPhase, onPhaseChange }) {
  const ref = useRef(null);
  const gradCanvasRef = useRef(null);
  const whiteCanvasRef = useRef(null);
  const [gradMask, setGradMask] = useState('');
  const [whiteMask, setWhiteMask] = useState('');
  const prevPhase = useRef(paintPhase);

  // Reset canvases when phase changes externally
  if (paintPhase !== prevPhase.current) {
    if (paintPhase === 'gradient') {
      gradCanvasRef.current = null;
      whiteCanvasRef.current = null;
      setGradMask('');
      setWhiteMask('');
    } else if (paintPhase === 'white' && prevPhase.current === 'gradient') {
      whiteCanvasRef.current = null;
      setWhiteMask('');
    }
    prevPhase.current = paintPhase;
  }

  const ensureCanvas = (canvasRef, el) => {
    if (!canvasRef.current) {
      const rect = el.getBoundingClientRect();
      const c = document.createElement('canvas');
      c.width = Math.ceil(rect.width);
      c.height = Math.ceil(rect.height);
      canvasRef.current = c;
    }
    return canvasRef.current;
  };

  const strokeCount = useRef(0);

  const paintCircle = (canvas, x, y) => {
    const ctx = canvas.getContext('2d');
    const radius = 30;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  };

  const getCoverage = (canvas) => {
    const ctx = canvas.getContext('2d');
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let filled = 0;
    let total = 0;
    for (let i = 3; i < data.length; i += 64) {
      if (data[i] > 80) filled++;
      total++;
    }
    return filled / total;
  };

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    strokeCount.current++;
    // Only check coverage every 10 strokes for performance
    const shouldCheck = strokeCount.current % 10 === 0;

    if (paintPhase === 'gradient') {
      const canvas = ensureCanvas(gradCanvasRef, el);
      paintCircle(canvas, x, y);
      setGradMask(canvas.toDataURL());

      if (shouldCheck && getCoverage(canvas) > 0.9) {
        onPhaseChange('white');
        strokeCount.current = 0;
      }
    } else {
      const canvas = ensureCanvas(whiteCanvasRef, el);
      paintCircle(canvas, x, y);
      setWhiteMask(canvas.toDataURL());

      if (shouldCheck && getCoverage(canvas) > 0.9) {
        onPhaseChange('gradient');
        strokeCount.current = 0;
      }
    }
  };

  return (
    <motion.span {...motionProps} className={`paint-wrapper ${className}-wrapper`} ref={ref} onMouseMove={handleMouseMove}>
      {/* Layer 1: Original grey text (always there) */}
      <span className={className}>{children}</span>

      {/* Layer 2: Gradient text revealed by spray */}
      {gradMask && (
        <span
          className={`${className} paint-overlay`}
          style={{
            backgroundImage: 'linear-gradient(135deg, #667eea, #764ba2, #f093fb, #f5576c)',
            WebkitMaskImage: `url(${gradMask})`,
            maskImage: `url(${gradMask})`,
            WebkitMaskSize: '100% 100%',
            maskSize: '100% 100%',
          }}
        >
          {children}
        </span>
      )}

      {/* Layer 3: White text revealed by spray (only in white phase) */}
      {whiteMask && (
        <span
          className={`${className} paint-overlay`}
          style={{
            backgroundImage: 'linear-gradient(#fff, #fff)',
            WebkitMaskImage: `url(${whiteMask})`,
            maskImage: `url(${whiteMask})`,
            WebkitMaskSize: '100% 100%',
            maskSize: '100% 100%',
            zIndex: 3,
          }}
        >
          {children}
        </span>
      )}
    </motion.span>
  );
}

export default function Hero({ activeTab, setActiveTab }) {
  const [phase, setPhase] = React.useState(0);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const bottomRef = React.useRef(null);
  const [paintPhase, setPaintPhase] = React.useState('gradient');

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 100;
      const transitionRange = 80;
      const progress = Math.max(0, Math.min((window.scrollY - scrollThreshold) / transitionRange, 1));
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setPhase(prev => (prev === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const arrowStyle = {
    opacity: 1 - scrollProgress,
    filter: `blur(${scrollProgress * 8}px)`,
    transform: `translateY(${scrollProgress * 20}px)`,
  };

  const labelStyle = {
    opacity: scrollProgress,
    filter: `blur(${(1 - scrollProgress) * 8}px)`,
  };

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-wrapper">
          <PaintText
            className="hero-heading"
            paintPhase={paintPhase}
            onPhaseChange={setPaintPhase}
            motionProps={{
              initial: { y: 200, opacity: 0 },
              animate: { y: 0, opacity: 1 },
              transition: { duration: 1, ease: [0.42, 0, 0.58, 1], delay: 0.4 },
            }}
          >
            Hey, I'm Raunak, a Senior Product Designer with
          </PaintText>
          <PaintText
            className="hero-subheading"
            paintPhase={paintPhase}
            onPhaseChange={setPaintPhase}
            motionProps={{
              initial: { y: 200, opacity: 0 },
              animate: { y: 0, opacity: 1 },
              transition: { duration: 1, ease: [0.42, 0, 0.58, 1], delay: 0.55 },
            }}
          >
            7 years of experience crafting AI-first product experiences...
          </PaintText>
          <motion.div
            className="hero-job"
            initial={{ y: 140, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.42, 0, 0.58, 1], delay: 1.6 }}
          >
            <div className="company-swap-container">
              <AnimatePresence mode="wait">
                {phase === 0 ? (
                  <motion.div
                    key="current"
                    className="current-work"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
                  >
                    Currently building AI agents & governance tools at{' '}
                    <span className="company-name intuit">Microsoft</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="previous"
                    className="current-work razorpay"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
                  >
                    Previously at{' '}
                    <span className="company-names-wrapper">
                      <span className="company-names-gradient">Intuit</span>
                      <span className="company-names-separator"> | </span>
                      <span className="company-names-gradient">Razorpay</span>
                      <span className="company-names-separator"> | </span>
                      <span className="company-names-gradient">MakeMyTrip</span>
                      <span className="company-names-separator"> | </span>
                      <span className="company-names-gradient">StarTV Network (Disney)</span>
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          <motion.div
            className="hero-bottom"
            ref={bottomRef}
            initial={{ y: -15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.42, 0, 0.58, 1], delay: 2.2 }}
          >
            <div className="hero-bottom-swap">
              <div className="hero-bottom-item" style={arrowStyle}>
                <a href="#projects">
                  <img
                    src="https://cdn.prod.website-files.com/62a9c118130e8b4c6d766b99/62d5be8733c8e15929de8e3b_Group%203762%20(1).png"
                    alt="scroll down"
                    className="arrow-icon"
                  />
                </a>
              </div>
              <div className="hero-bottom-item" style={labelStyle}>
                <div className="work-tabs">
                  <button
                    className={`work-tab ${activeTab === 'casestudies' ? 'active' : ''}`}
                    onClick={() => setActiveTab('casestudies')}
                  >
                    <span className="tab-text">Case Studies</span>
                  </button>
                  <button
                    className={`work-tab ${activeTab === 'other' ? 'active' : ''}`}
                    onClick={() => setActiveTab('other')}
                  >
                    <span className="tab-text">Creative Lab</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
