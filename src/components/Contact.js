import React, { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import './Contact.css';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [copied, setCopied] = useState(false);

  const copyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('raunakagarwal.id@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 5000);
  };

  return (
    <footer className="footer" ref={ref}>
      <div className="footer-container">
        <motion.div
          className="footer-wrapper"
          initial={{ y: 40, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="footer-block">
            <h2 className="footer-heading">Lets work together!</h2>
            <p className="footer-text">
              Just send an email. I'd love to join your design team for the next project to build great products together!
            </p>
          </div>
          <div className="footer-links">
            <a href="#" onClick={copyEmail} className="footer-link">
              <div className="footer-link-inner">
                <div className="footer-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 4L12 13 2 4" />
                  </svg>
                </div>
                <span className="footer-link-text">Email me</span>
              </div>
            </a>
            <a href="https://www.linkedin.com/in/raunakagarwal-fc/" target="_blank" rel="noreferrer" className="footer-link">
              <div className="footer-link-inner">
                <div className="footer-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
                <span className="footer-link-text">LinkedIn</span>
              </div>
            </a>
            <a href="https://twitter.com/raunakagarwal14" target="_blank" rel="noreferrer" className="footer-link">
              <div className="footer-link-inner">
                <div className="footer-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4l11.7 16h4.3L8.3 4H4z" />
                    <path d="M4 20l6.8-8M13.2 12L20 4" />
                  </svg>
                </div>
                <span className="footer-link-text">Twitter</span>
              </div>
            </a>
          </div>
          {copied && (
            <div className="footer-copied"><span className="prompt">➜ </span><span className="email-highlight">raunakagarwal.id@gmail.com</span> copied to clipboard</div>
          )}
        </motion.div>
      </div>
    </footer>
  );
}
