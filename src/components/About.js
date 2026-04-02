import React from 'react';
import './About.css';

export default function About() {
  return (
    <section id="about" className="about">
      <h2 className="section-title">About Me</h2>
      <div className="about-grid">
        <div className="about-text">
          <p>
            I'm a product designer passionate about creating intuitive, accessible, and
            delightful digital experiences. With a background in visual design and human-computer
            interaction, I bring both creativity and analytical thinking to every project.
          </p>
          <p>
            I believe great design is invisible — it simply works. My approach combines
            user research, rapid prototyping, and close collaboration with engineering
            to ship products people love.
          </p>
        </div>
        <div className="about-stats">
          <div className="stat">
            <span className="stat-number">5+</span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="stat">
            <span className="stat-number">30+</span>
            <span className="stat-label">Projects Delivered</span>
          </div>
          <div className="stat">
            <span className="stat-number">10+</span>
            <span className="stat-label">Happy Clients</span>
          </div>
        </div>
      </div>
    </section>
  );
}
