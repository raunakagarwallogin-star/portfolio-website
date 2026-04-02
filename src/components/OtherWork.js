import React, { useState, useRef, useEffect, useCallback } from 'react';
import './OtherWork.css';
import LaptopMockup from './LaptopMockup';

const PROJECTS = [
  {
    id: 'tamara',
    name: 'The Tamara Resorts',
    desc: 'Website redesign for a luxury resort chain — crafted the complete web experience from landing page to booking flow.',
    tags: ['Web Design', 'Freelance', 'Hospitality'],
    desktop: '/Tamara/Desktop2.png',
    mobile: '/Tamara/Mobile.png',
    galleryColor: '#004B36',
    gallery: [
      { src: '/Tamara/Gallery/Slide 16_9 - 26.jpg', label: 'Slide 26' },
      { src: '/Tamara/Gallery/Slide 16_9 - 27.jpg', label: 'Slide 27' },
      { src: '/Tamara/Gallery/Slide 16_9 - 28.jpg', label: 'Slide 28' },
      { src: '/Tamara/Gallery/Slide 16_9 - 29.jpg', label: 'Slide 29' },
      { src: '/Tamara/Gallery/Slide 16_9 - 30.jpg', label: 'Slide 30' },
      { src: '/Tamara/Gallery/Desktop - 3.png', label: 'Desktop' },
    ],
  },
  {
    id: 'holiday-valley',
    name: 'Holiday Valley',
    desc: 'Designed the digital experience for a holiday destination — from discovery to booking.',
    tags: ['Web Design', 'Freelance', 'Hospitality'],
    desktop: '/Holiday Valley/desktop.png',
    mobile: '/Holiday Valley/Mobile 2.png',
    galleryColor: '#3D5C3A',
    gallery: [
      { src: '/Holiday Valley/Banner/Slide 16_9 - 31.jpg', label: 'Slide 31' },
      { src: '/Holiday Valley/Banner/Slide 16_9 - 32.jpg', label: 'Slide 32' },
      { src: '/Holiday Valley/Banner/Slide 16_9 - 33.jpg', label: 'Slide 33' },
      { src: '/Holiday Valley/Banner/Slide 16_9 - 34.jpg', label: 'Slide 34' },
      { src: '/Holiday Valley/Banner/Slide 16_9 - 35.jpg', label: 'Slide 35' },
    ],
  },
  {
    id: 'hercules',
    name: 'Hercules',
    desc: 'Brand and web experience for Hercules — bold visuals meeting functional design.',
    tags: ['Web Design', 'Branding'],
    desktop: '/Hercules/Desktop.png',
    mobile: '/Hercules/Mobile.png',
    galleryColor: '#E63946',
    gallery: [
      { src: '/Hercules/Banner/Slide 16_9 - 36.png', label: 'Slide 36' },
      { src: '/Hercules/Banner/Frame 26459.png', label: 'Frame 26459' },
      { src: '/Hercules/Banner/Frame 26460.png', label: 'Frame 26460' },
      { src: '/Hercules/Banner/Frame 26462.png', label: 'Frame 26462' },
      { src: '/Hercules/Banner/Frame 26463.png', label: 'Frame 26463' },
    ],
  },
  {
    id: 'leadership-radius',
    name: 'Leadership Radius',
    desc: 'Designed a platform empowering leaders with tools for growth and team development.',
    tags: ['Web Design', 'SaaS'],
    desktop: '/Leadership Radius/Desktop.png',
    mobile: '/Leadership Radius/Mobile (1).png',
    galleryColor: '#1a3a5c',
    gallery: [
      { src: '/Leadership Radius/Banner/About Us.png', label: 'About Us' },
      { src: '/Leadership Radius/Banner/About Us-1.png', label: 'About Us 1' },
      { src: '/Leadership Radius/Banner/About Us-2.png', label: 'About Us 2' },
      { src: '/Leadership Radius/Banner/About Us-3.png', label: 'About Us 3' },
      { src: '/Leadership Radius/Banner/About Us-4.png', label: 'About Us 4' },
    ],
  },
  {
    id: 'broker-preview',
    name: 'Broker Preview',
    desc: 'SaaS platform for real estate brokers — buy, sell, and manage property listings.',
    tags: ['SaaS', 'Product Design'],
    desktop: '/Broker Preview/Desktop/Explore.png',
    mobile: null,
    screens: [
      { src: '/Broker Preview/Desktop/Explore.png', label: 'Explore' },
      { src: '/Broker Preview/Desktop/Property detail.png', label: 'Property Detail' },
      { src: '/Broker Preview/Desktop/Live Listing.png', label: 'Live Listing' },
      { src: '/Broker Preview/Desktop/Empty listing.png', label: 'Empty Listing' },
      { src: '/Broker Preview/Desktop/Active.png', label: 'Active' },
      { src: '/Broker Preview/Desktop/Broker Contact.png', label: 'Broker Contact' },
      { src: '/Broker Preview/Desktop/My Profile.png', label: 'My Profile' },
      { src: '/Broker Preview/Desktop/All Notification.png', label: 'Notifications' },
      { src: '/Broker Preview/Desktop/Rejected Listing.png', label: 'Rejected Listing' },
      { src: '/Broker Preview/Desktop/Saved Search settings.png', label: 'Saved Search' },
      { src: '/Broker Preview/Desktop/1.png', label: 'Screen 1' },
      { src: '/Broker Preview/Desktop/4.png', label: 'Screen 4' },
    ],
    galleryColor: '#8A3FFC',
    bgHeight: 'auto',
    mobileGrid: [
      '/Broker Preview/Mobile screens/Android Large - 2.png',
      '/Broker Preview/Mobile screens/Android Large - 3.png',
      '/Broker Preview/Mobile screens/Android Large - 4.png',
      '/Broker Preview/Mobile screens/Android Large - 5.png',
      '/Broker Preview/Mobile screens/Android Large - 6.png',
      '/Broker Preview/Mobile screens/Android Large - 8.png',
      '/Broker Preview/Mobile screens/Android Large - 9.png',
      '/Broker Preview/Mobile screens/Android Large - 10.png',
      '/Broker Preview/Mobile screens/Android Large - 11.png',
      '/Broker Preview/Mobile screens/Android Large - 13.png',
      '/Broker Preview/Mobile screens/Android Large - 14.png',
      '/Broker Preview/Mobile screens/Android Large - 15.png',
      '/Broker Preview/Mobile screens/Android Large - 16.png',
      '/Broker Preview/Mobile screens/Android Large - 17.png',
      '/Broker Preview/Mobile screens/Android Large - 18.png',
      '/Broker Preview/Mobile screens/Android Large - 19.png',
      '/Broker Preview/Mobile screens/Android Large - 20.png',
      '/Broker Preview/Mobile screens/Android Large - 21.png',
      '/Broker Preview/Mobile screens/Android Large - 22.png',
      '/Broker Preview/Mobile screens/Android Large - 23.png',
      '/Broker Preview/Mobile screens/Android Large - 24.png',
      '/Broker Preview/Mobile screens/Android Large - 25.png',
      '/Broker Preview/Mobile screens/Android Large - 26.png',
      '/Broker Preview/Mobile screens/Android Large - 27.png',
      '/Broker Preview/Mobile screens/Android Large - 28.png',
      '/Broker Preview/Mobile screens/Android Large - 29.png',
      '/Broker Preview/Mobile screens/Android Large - 30.png',
      '/Broker Preview/Mobile screens/Android Large - 31.png',
      '/Broker Preview/Mobile screens/Android Large - 32.png',
      '/Broker Preview/Mobile screens/Android Large - 33.png',
      '/Broker Preview/Mobile screens/Android Large - 34.png',
      '/Broker Preview/Mobile screens/Android Large - 36.png',
      '/Broker Preview/Mobile screens/Android Large - 37.png',
      '/Broker Preview/Mobile screens/Android Large - 38.png',
      '/Broker Preview/Mobile screens/Android Large - 39.png',
      '/Broker Preview/Mobile screens/Android Large - 40.png',
      '/Broker Preview/Mobile screens/Android Large - 41.png',
      '/Broker Preview/Mobile screens/Android Large - 42.png',
      '/Broker Preview/Mobile screens/Android Large - 43.png',
      '/Broker Preview/Mobile screens/Android Large - 44.png',
      '/Broker Preview/Mobile screens/Android Large - 46.png',
      '/Broker Preview/Mobile screens/Android Large - 47.png',
      '/Broker Preview/Mobile screens/Android Large - 49.png',
      '/Broker Preview/Mobile screens/Android Large - 50.png',
      '/Broker Preview/Mobile screens/Android Large - 51.png',
      '/Broker Preview/Mobile screens/Android Large - 52.png',
      '/Broker Preview/Mobile screens/Android Large - 53.png',
      '/Broker Preview/Mobile screens/Android Large - 54.png',
    ],
  },
  {
    id: 'warex',
    name: 'Warex',
    desc: 'Warehouse and transport management SaaS — streamlining logistics for businesses.',
    tags: ['SaaS', 'Product Design'],
    desktop: '/WAREX/Warehouse _ Listing _ 01.png',
    mobile: null,
    screens: [
      { src: '/WAREX/Warehouse _ Listing _ 01.png', label: 'Warehouse — Listing' },
      { src: '/WAREX/Warehouse _ Listing _ 02.png', label: 'Warehouse — Listing Detail' },
      { src: '/WAREX/Warehouse _ Invoice _ 03.png', label: 'Warehouse — Invoice' },
      { src: '/WAREX/Warehouse _ Order _ 04.png', label: 'Warehouse — Order' },
      { src: '/WAREX/Warehouse _ Invoice _ 06.png', label: 'Warehouse — Invoice Detail' },
      { src: '/WAREX/Transport listing _ 3.png', label: 'Transport — Listing' },
      { src: '/WAREX/Transport Inquiry _ 5.png', label: 'Transport — Inquiry' },
      { src: '/WAREX/Transport Order _ 5.png', label: 'Transport — Order' },
      { src: '/WAREX/Customer _ Profile _ 1.png', label: 'Customer — Profile' },
      { src: '/WAREX/Customer _ Inquiry _ 2.png', label: 'Customer — Inquiry' },
      { src: '/WAREX/Customer _ Retrieve _ 2.png', label: 'Customer — Retrieve' },
    ],
    galleryColor: '#1B51B3',
    bgHeight: 'auto',
    mobileGrid: [
      '/WAREX/mobile/Warehouse _ 01.png',
      '/WAREX/mobile/Warehouse _ 02.png',
      '/WAREX/mobile/Warehouse _ 03.png',
      '/WAREX/mobile/Warehouse _ 04.png',
      '/WAREX/mobile/Warehouse Inquiry _ 01.png',
      '/WAREX/mobile/Warehouse Inquiry _ 02.png',
      '/WAREX/mobile/Warehouse Inquiry _ 03.png',
      '/WAREX/mobile/Warehouse Inquiry _ 4.png',
      '/WAREX/mobile/Customer Listing _ 1.png',
      '/WAREX/mobile/Customer Listing _ 2.png',
      '/WAREX/mobile/Customer Listing _ 3.png',
      '/WAREX/mobile/Customer Listing _ 4.png',
      '/WAREX/mobile/Customer Listing _ 5.png',
      '/WAREX/mobile/Customer Listing _ 6.png',
      '/WAREX/mobile/Customer Listing _ 7.png',
      '/WAREX/mobile/Customer Listing _ 8.png',
      '/WAREX/mobile/Customer Listing _ 9.png',
      '/WAREX/mobile/Customer Listing _ 10.png',
      '/WAREX/mobile/Customer Listing _ 11.png',
      '/WAREX/mobile/Customer Listing _ 12.png',
      '/WAREX/mobile/Customer Listing _ 13.png',
      '/WAREX/mobile/Customer Listing _ 14.png',
      '/WAREX/mobile/Customer Listing _ 15.png',
      '/WAREX/mobile/Customer Listing _ 16.png',
      '/WAREX/mobile/Customer Listing _ 17.png',
      '/WAREX/mobile/Customer Listing _ 18.png',
      '/WAREX/mobile/Customer Listing _ 19.png',
      '/WAREX/mobile/Transporter _ 1.png',
      '/WAREX/mobile/Transporter _ 2.png',
      '/WAREX/mobile/Transporter _ 3.png',
      '/WAREX/mobile/Transporter _ 4.png',
      '/WAREX/mobile/Transporter _ 5.png',
      '/WAREX/mobile/Transporter Inquiry _ 1.png',
      '/WAREX/mobile/Transporter Inquiry _ 2.png',
      '/WAREX/mobile/Transporter Inquiry _ 3.png',
      '/WAREX/mobile/Transporter Inquiry _ 4.png',
      '/WAREX/mobile/Transporter Inquiry _ 5.png',
      '/WAREX/mobile/Transporter Inquiry _ 6.png',
      '/WAREX/mobile/Past Inquiry.png',
      '/WAREX/mobile/Past Inquiry-1.png',
      '/WAREX/mobile/Group 48096443.png',
    ],
  },
];

function MobileParallaxGrid({ images }) {
  const gridRef = useRef(null);
  const colRefs = useRef([]);
  const speeds = [0.5, -0.15, 0.7, -0.35, 0.2, -0.6, 0.45, -0.1, 0.55];

  useEffect(() => {
    let raf;
    const animate = () => {
      if (!gridRef.current) { raf = requestAnimationFrame(animate); return; }
      const rect = gridRef.current.getBoundingClientRect();
      const center = window.innerHeight / 2;
      const offset = center - rect.top - rect.height / 2;

      colRefs.current.forEach((col, i) => {
        if (col) {
          const speed = speeds[i % speeds.length];
          col.style.transform = `translateY(${offset * speed}px)`;
        }
      });
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const cols = 9;
  const columns = Array.from({ length: cols }, () => []);
  images.forEach((src, i) => columns[i % cols].push(src));

  return (
    <div className="mobile-grid" data-no-dots ref={gridRef}>
      {columns.map((col, colIdx) => (
        <div
          key={colIdx}
          className="mobile-grid-col"
          ref={el => colRefs.current[colIdx] = el}
        >
          {col.map((src, i) => (
            <img key={i} src={src} alt={`Screen ${i + 1}`} className="mobile-grid-img" />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function OtherWork() {
  const [activeProject, setActiveProject] = useState('tamara');
  const [device, setDevice] = useState('desktop');
  const toggleRef = useRef(null);
  const pillsRef = useRef(null);

  // Scroll pills to top on mount with slight offset
  useEffect(() => {
    if (pillsRef.current) {
      const top = pillsRef.current.getBoundingClientRect().top + window.scrollY - 40;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  const switchDevice = (d) => {
    setDevice(d);
  };

  const project = PROJECTS.find(p => p.id === activeProject);
  const hasImages = project && project.desktop;
  const hasScreens = project && project.screens;
  const hasPrototype = project && project.prototypeUrl;

  return (
    <section id="other-work" className="other-work">
      <div className="other-work-container">
        <div className="project-pills-wrapper" data-no-dots>
          <button
            className="pills-arrow pills-arrow-left"
            onClick={() => {
              if (pillsRef.current) pillsRef.current.scrollBy({ left: -200, behavior: 'smooth' });
            }}
            aria-label="Scroll left"
          >
            ‹
          </button>
          <div className="project-pills" ref={pillsRef}>
            {PROJECTS.map(p => (
              <button
                key={p.id}
                className={`project-pill ${activeProject === p.id ? 'active' : ''}`}
                onClick={() => { setActiveProject(p.id); setDevice('desktop'); }}
              >
                {p.name}
              </button>
            ))}
          </div>
          <button
            className="pills-arrow pills-arrow-right"
            onClick={() => {
              if (pillsRef.current) pillsRef.current.scrollBy({ left: 200, behavior: 'smooth' });
            }}
            aria-label="Scroll right"
          >
            ›
          </button>
        </div>

        {/* Description before mockup */}
        <div className="other-project-intro" data-no-dots>
          <p className="other-project-desc">{project.desc}</p>
        </div>

        {/* Mockup with device toggle overlay */}
        <div className="mockup-wrapper">
          {((hasImages && project.mobile) || (hasScreens && hasPrototype)) && (
            <div className="device-toggle" ref={toggleRef} data-no-dots>
              <button
                className={`device-btn ${device === 'desktop' ? 'active' : ''}`}
                onClick={() => switchDevice('desktop')}
                aria-label="Desktop view"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <rect x="2" y="4" width="20" height="13" rx="1.5" />
                  <path d="M8 21h8" />
                </svg>
              </button>
              <button
                className={`device-btn ${device === 'mobile' ? 'active' : ''}`}
                onClick={() => switchDevice('mobile')}
                aria-label="Mobile view"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <rect x="6" y="2" width="12" height="20" rx="2" />
                </svg>
              </button>
            </div>
          )}

          {hasScreens ? (
            device === 'mobile' && hasPrototype ? (
              <LaptopMockup
                alt={project.name}
                device="mobile"
                prototypeUrl={project.prototypeUrl}
              />
            ) : (
              <LaptopMockup
                alt={project.name}
                screens={project.screens}
              />
            )
          ) : hasImages ? (
            <LaptopMockup
              imageSrc={device === 'desktop' ? project.desktop : project.mobile}
              alt={project.name}
              device={device}
            />
          ) : (
            <div className="coming-soon-frame">
              <span>Coming Soon</span>
            </div>
          )}
        </div>

        {/* Colored background - slides up behind bottom 30% of mockup */}
        <div className="project-color-bg" style={{
          backgroundColor: project.galleryColor || '#111',
          minHeight: project.bgHeight || 'auto',
          ...(project.mobileGrid ? { maxHeight: '700px', minHeight: '700px', overflow: 'hidden', paddingBottom: 0, paddingTop: 0 } : {}),
        }}>
          {project.banner && (
            <div className="project-banner" data-no-dots>
              <img src={project.banner} alt={project.name} className="project-banner-img" />
            </div>
          )}
          {project.gallery && project.gallery.length > 0 && (
            <div className="marquee-gallery" data-no-dots>
              <div className="marquee-track">
                {[...project.gallery, ...project.gallery].map((item, i) => (
                  <div className="marquee-item" key={i}>
                    {item.src ? (
                      <img src={item.src} alt={item.label} className="marquee-img" />
                    ) : (
                      <div className="marquee-placeholder">
                        <span>{item.label}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {project.mobileGrid && project.mobileGrid.length > 0 && (
            <MobileParallaxGrid images={project.mobileGrid} />
          )}
        </div>
      </div>
    </section>
  );
}