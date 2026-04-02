import React from 'react';
import './Skills.css';

const SKILL_GROUPS = [
  {
    category: 'Design',
    skills: ['Figma', 'Sketch', 'Adobe Creative Suite', 'Framer', 'Principle'],
  },
  {
    category: 'UX',
    skills: ['User Research', 'Wireframing', 'Prototyping', 'Usability Testing', 'Information Architecture'],
  },
  {
    category: 'Technical',
    skills: ['HTML / CSS', 'React', 'Design Systems', 'Accessibility (WCAG)', 'Responsive Design'],
  },
  {
    category: 'Collaboration',
    skills: ['Design Thinking', 'Agile / Scrum', 'Cross-functional Teams', 'Stakeholder Mgmt', 'Mentoring'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="skills">
      <h2 className="section-title">Skills & Expertise</h2>
      <div className="skills-grid">
        {SKILL_GROUPS.map((g, i) => (
          <div key={i} className="skill-group">
            <h3 className="skill-category">{g.category}</h3>
            <ul className="skill-list">
              {g.skills.map((s, j) => <li key={j} className="skill-item">{s}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
