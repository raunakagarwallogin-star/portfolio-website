import React, { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import PasswordGate from './PasswordGate';
import './Projects.css';

const PROJECTS = [
  {
    title: 'Transforming the onboarding experience for Experts',
    desc: 'To create a streamlined and scalable onboarding process for all experts on the Virtual Expert Platform (VEP) by overhauling the user experience (UX) to address current inefficiencies, providing clear task expectations and self-service support, and ensuring mobile-web responsiveness.',
    image: 'https://cdn.prod.website-files.com/62a9c118130e8b4c6d766b99/669d1d168f7f1d6ee95b0f5f_Group%201125087788%20(2).png',
    link: '/intuit-expert-portal',
    internal: true,
  },
  {
    title: 'Improving the credit limit for Merchants',
    desc: 'Helping merchants to submit the most active business bank account for underwriting, resulting in a higher Credit limit for the customer.',
    image: 'https://cdn.prod.website-files.com/62a9c118130e8b4c6d766b99/64c8bb741cf9e6192e47672e_Group%2048095475.png',
    link: 'https://raunakdesign.webflow.io/',
  },
  {
    title: "Rethinking MMT's Live Train Status for 25 million passengers",
    desc: "Redesigned MMT's Live Train Status feature in order to improve customer experience. Leveraging the power of Network Triangulation to serve its customers with more granular data.",
    image: 'https://cdn.prod.website-files.com/62a9c118130e8b4c6d766b99/62d576163f11a80fd593c553_Group%203782%20(2).png',
    link: 'https://raunakdesign.webflow.io/mmt-live-train-status',
  },
  {
    title: 'Service design for business transformation at Wipro',
    desc: "Redesigned the Wipro deal pursuit experiences in order to support existing and future business models. Enable Wipro and its employees achieve their business goals through a more human-centric approach.",
    image: 'https://cdn.prod.website-files.com/62a9c118130e8b4c6d766b99/62d5619c89995117b2d231e2_Group%203774.png',
    link: 'https://raunakdesign.webflow.io/wiprp-deal-pricing-system',
  },
];

function ProjectLink({ project, className, children, onGatedClick, ...props }) {
  if (project.internal) {
    return <a href={project.link} className={className} onClick={(e) => { e.preventDefault(); onGatedClick(project.link); }} {...props}>{children}</a>;
  }
  return <a href={project.link} target="_blank" rel="noreferrer" className={className} {...props}>{children}</a>;
}

function MotionProjectLink({ project, className, children, onGatedClick, ...motionProps }) {
  if (project.internal) {
    return (
      <motion.a href={project.link} className={className} onClick={(e) => { e.preventDefault(); onGatedClick(project.link); }} {...motionProps}>
        {children}
      </motion.a>
    );
  }
  return (
    <motion.a href={project.link} target="_blank" rel="noreferrer" className={className} {...motionProps}>
      {children}
    </motion.a>
  );
}

function ProjectCard({ project, index, onGatedClick }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const isEven = index % 2 === 0;

  return (
    <div className="project-section" ref={ref}>
      <div className="project-container">
        <div className={`project-wrapper ${isEven ? '' : 'reverse'}`}>
          {isEven ? (
            <>
              <motion.div
                className="project-content"
                initial={{ y: 70, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 70, opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <div className="project-title-wrap">
                  <h1 className="project-title">{project.title}</h1>
                </div>
                <div className="project-desc-wrap">
                  <div className="project-desc">{project.desc}</div>
                </div>
                <div className="project-desc-wrap">
                  <ProjectLink project={project} className="project-arrow" onGatedClick={onGatedClick}>
                    <img
                      src="https://cdn.prod.website-files.com/62a9c118130e8b4c6d766b99/62d7ee3743ff44c83a0599bb_Group%203784.svg"
                      alt="View project"
                      className="arrow-svg"
                    />
                  </ProjectLink>
                </div>
              </motion.div>
              <MotionProjectLink
                project={project}
                className="project-image-link"
                onGatedClick={onGatedClick}
                initial={{ y: 70, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 70, opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
              >
                <img src={project.image} alt={project.title} className="project-image" />
              </MotionProjectLink>
            </>
          ) : (
            <>
              <MotionProjectLink
                project={project}
                className="project-image-link"
                onGatedClick={onGatedClick}
                initial={{ y: 70, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 70, opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <img src={project.image} alt={project.title} className="project-image" />
              </MotionProjectLink>
              <motion.div
                className="project-content"
                initial={{ y: 70, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 70, opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
              >
                <div className="project-title-wrap">
                  <h1 className="project-title">{project.title}</h1>
                </div>
                <div className="project-desc-wrap">
                  <div className="project-desc">{project.desc}</div>
                </div>
                <div className="project-desc-wrap">
                  <ProjectLink project={project} className="project-arrow" onGatedClick={onGatedClick}>
                    <img
                      src="https://cdn.prod.website-files.com/62a9c118130e8b4c6d766b99/62d7ee3743ff44c83a0599bb_Group%203784.svg"
                      alt="View project"
                      className="arrow-svg"
                    />
                  </ProjectLink>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [gatedLink, setGatedLink] = useState(null);
  const navigate = useNavigate();

  const handleGatedClick = (link) => {
    if (sessionStorage.getItem('portfolio_unlocked') === 'true') {
      sessionStorage.removeItem('portfolio_unlocked');
    }
    setGatedLink(link);
  };

  return (
    <section id="projects">
      {PROJECTS.map((project, i) => (
        <ProjectCard key={i} project={project} index={i} onGatedClick={handleGatedClick} />
      ))}
      {gatedLink && (
        <PasswordGate
          onUnlock={() => navigate(gatedLink)}
          onClose={() => setGatedLink(null)}
        />
      )}
    </section>
  );
}
