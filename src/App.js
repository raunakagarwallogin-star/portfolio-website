import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import OtherWork from './components/OtherWork';
import Contact from './components/Contact';
import IntuitCaseStudy from './components/IntuitCaseStudy';

import FabricCanvas from './components/FabricCanvas';

function MouseCircle() {
  const circleRef = React.useRef(null);
  const mouse = React.useRef({ x: -100, y: -100 });
  const pos = React.useRef({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const wasHovering = React.useRef(false);
  const audioCtx = React.useRef(null);
  const clickBuffer = React.useRef(null);

  useEffect(() => {
    // Load audio
    const initAudio = () => {
      if (!audioCtx.current) {
        audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
        fetch('/splat.wav')
          .then(r => r.arrayBuffer())
          .then(buf => audioCtx.current.decodeAudioData(buf))
          .then(decoded => { clickBuffer.current = decoded; })
          .catch(() => {});
      }
      if (audioCtx.current.state === 'suspended') {
        audioCtx.current.resume();
      }
    };
    window.addEventListener('click', initAudio, { once: true });
    window.addEventListener('touchstart', initAudio, { once: true });
    return () => {
      window.removeEventListener('click', initAudio);
      window.removeEventListener('touchstart', initAudio);
    };
  }, []);

  const playClick = React.useCallback(() => {
    if (audioCtx.current && clickBuffer.current) {
      const source = audioCtx.current.createBufferSource();
      source.buffer = clickBuffer.current;
      source.playbackRate.value = 1.8;
      const gain = audioCtx.current.createGain();
      gain.gain.value = 0.3;
      source.connect(gain);
      gain.connect(audioCtx.current.destination);
      source.start(0);
    }
  }, []);

  useEffect(() => {
    wasHovering.current = hovering;
  }, [hovering]);

  useEffect(() => {
    let magnetTarget = null;
    let lastHovering = false;

    const findNearestSnappable = (x, y) => {
      const snappables = document.querySelectorAll('button, .device-btn, .work-tab, .nav-link, .footer-link, .project-pill, .project-arrow, .pills-arrow');
      let nearest = null;
      let nearestDist = Infinity;
      for (const el of snappables) {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
        if (dist < 80 && dist < nearestDist) {
          nearest = { x: cx, y: cy, dist };
          nearestDist = dist;
        }
      }
      return nearest;
    };

    const move = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      const target = e.target;
      const clickable = target.closest('a, button, [role="button"], input, select, textarea, [onclick], .paint-wrapper, h1, h2, h3, .hero-heading, .hero-subheading, .project-image-link, .project-content, .project-arrow, .footer-link, .nav-link, .work-tab, .other-project-card, .frame-mockup, .frame-content, .marquee-img, .marquee-item, img');
      const isHovering = !!clickable;
      setHovering(isHovering);

      if (isHovering && !lastHovering) {
        playClick();
      } else if (!isHovering && lastHovering) {
        playClick();
      }
      lastHovering = isHovering;

      const snap = findNearestSnappable(e.clientX, e.clientY);
      if (snap) {
        const t = 1 - snap.dist / 80;
        magnetTarget = { x: snap.x, y: snap.y, strength: 0.5 * t };
      } else {
        magnetTarget = null;
      }
    };
    window.addEventListener('mousemove', move);

    let raf;
    const animate = () => {
      const targetX = magnetTarget
        ? mouse.current.x + (magnetTarget.x - mouse.current.x) * magnetTarget.strength
        : mouse.current.x;
      const targetY = magnetTarget
        ? mouse.current.y + (magnetTarget.y - mouse.current.y) * magnetTarget.strength
        : mouse.current.y;
      const speed = magnetTarget ? 0.12 : 0.06;
      pos.current.x += (targetX - pos.current.x) * speed;
      pos.current.y += (targetY - pos.current.y) * speed;
      if (circleRef.current) {
        circleRef.current.style.left = `${pos.current.x}px`;
        circleRef.current.style.top = `${pos.current.y}px`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className={`mouse-circle ${hovering ? 'mouse-circle-hover' : ''}`}
      ref={circleRef}
    />
  );
}

function HomePage() {
  const [activeTab, setActiveTab] = React.useState('casestudies');

  return (
    <>
      <Hero activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'casestudies' ? <Projects /> : <OtherWork />}
      <Contact />
    </>
  );
}

export default function App() {
  const location = useLocation();

  React.useEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <FabricCanvas />
      <MouseCircle />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/intuit-expert-portal" element={<IntuitCaseStudy />} />
      </Routes>
    </>
  );
}
