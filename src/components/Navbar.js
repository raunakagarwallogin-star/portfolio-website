import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import './Navbar.css';

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      // Scrolling down → hide, scrolling up → show
      if (currentY > lastScrollY.current && currentY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`navbar ${hidden ? 'navbar-hidden' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1], delay: 0.2 }}
    >
      <div className="nav-container">
        <aside className="nav-wrapper">
          <a href="/" className="nav-logo">
            <div className="logo-block">
              <img
                loading="lazy"
                width="75"
                alt=""
                src="https://cdn.prod.website-files.com/62a9c118130e8b4c6d766b99/64ca14b0fe3deb1da9fcaf78_raunak.png"
                className="logo-image"
              />
            </div>
          </a>
          <div className="nav-right">
            <a
              href="https://cdn.prod.website-files.com/62a9c118130e8b4c6d766b99/64c8a84aad4b9e8963e8f38f_Resume_RaunakAgarwal.pdf"
              target="_blank"
              rel="noreferrer"
              className="nav-link"
            >
              <div className="logo-block">
                <span className="nav-link-text">Resume</span>
              </div>
            </a>
          </div>
        </aside>
      </div>
    </motion.nav>
  );
}
