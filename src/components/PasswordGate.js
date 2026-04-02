import React, { useState } from 'react';
import './PasswordGate.css';

const PASS_HASH = '1a2b3c';

function simpleHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return h.toString(36);
}

const EXPECTED = simpleHash('Raunak_2026');

export default function PasswordGate({ onUnlock, onClose }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (simpleHash(password) === EXPECTED) {
      onUnlock();
    } else {
      setError(true);
    }
  };

  return (
    <div className="password-gate" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="password-gate-card">
        <div className="password-gate-titlebar">
          <div className="password-gate-dot red" />
          <div className="password-gate-dot yellow" />
          <div className="password-gate-dot green" />
          <span className="password-gate-titlebar-text">raunak — portfolio — zsh</span>
        </div>
        <div className="password-gate-body">
          <div className="password-gate-line">
            <span className="dim">Last login: {new Date().toDateString()}</span>
          </div>
          <div className="password-gate-line">
            <span className="prompt">➜ </span>
            <span className="cmd">open </span>
            <span className="flag">--casestudy</span>
          </div>
          <div className="password-gate-line">
            <span className="warn">⚠ Access restricted. Authentication required.</span>
          </div>
          <form onSubmit={handleSubmit} className="password-gate-form">
            <span className="password-gate-prompt-label">password ~ %&nbsp;</span>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              placeholder=""
              className={`password-gate-input ${error ? 'error' : ''}`}
              autoFocus
            />
            <button type="submit" className="password-gate-btn">→</button>
          </form>
          {error && <p className="password-gate-error">authentication failed. access denied.</p>}
        </div>
      </div>
    </div>
  );
}
