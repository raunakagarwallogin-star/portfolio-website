import React, { useRef, useEffect, useState } from 'react';
import Contact from './Contact';
import './IntuitCaseStudy.css';

export default function IntuitCaseStudy() {
  const progressRef = useRef(null);
  const [barLeft, setBarLeft] = useState(-9999);
  const [showBar, setShowBar] = useState(false);
  const [barClipTop, setBarClipTop] = useState(0);
  const [barClipBottom, setBarClipBottom] = useState(0);

  useEffect(() => {
    const updateBar = () => {
      if (progressRef.current) {
        const rect = progressRef.current.getBoundingClientRect();
        setBarLeft(rect.left);
        const midScreen = window.innerHeight * 0.5;
        // Show only when red bar overlaps the grey track
        const visible = rect.top < midScreen && rect.bottom > 0;
        setShowBar(visible);
        // Clip top: don't show above grey track start
        const clipTop = Math.max(0, rect.top);
        // Clip bottom: only clip when grey track bottom is above the midpoint (red dot)
        const clipBottom = rect.bottom < midScreen ? Math.max(0, midScreen - rect.bottom) : 0;
        setBarClipTop(clipTop);
        setBarClipBottom(clipBottom);
      }
    };
    updateBar();
    window.addEventListener('scroll', updateBar, { passive: true });
    window.addEventListener('resize', updateBar);
    return () => {
      window.removeEventListener('scroll', updateBar);
      window.removeEventListener('resize', updateBar);
    };
  }, []);

  return (
    <div className="case-study-page">
      {showBar && (
        <div
          className="cs-timeline-progress-bar"
          style={{
            left: barLeft + 'px',
            clipPath: `inset(${barClipTop}px 0 ${barClipBottom}px 0)`,
          }}
        />
      )}
      {/* ── Hero ── */}
      <section className="cs-hero">
        <div className="cs-container">
          <h1 className="cs-title">Transforming the onboarding experience for Experts</h1>
          <p className="cs-subtitle">Serving the pool of 120K+ experts</p>
        </div>
      </section>

      {/* ── Hero image ── */}
      <div className="cs-hero-image-wrap">
        <img
          src="https://cdn.prod.website-files.com/62a9c118130e8b4c6d766b99/669cc447d23ed5f45802b959_Group%201125087788.png"
          alt="Intuit Expert Portal hero"
          loading="lazy"
        />
      </div>

      {/* ── Info bar ── */}
      <section className="cs-info-bar">
        <div className="cs-container">
          <div className="cs-info-grid">
            <div className="cs-info-col">
              <h4>🙋🏻 My Team</h4>
              <p>1 Sr. Product Designer,<br />2 Project Managers - I collaborated with the PMs to identify gaps for the redesign, curate user stories, and build the framework supporting it.<br />3 Engineers - 2 Frontend and 1 Backend</p>
            </div>
            <div className="cs-info-col">
              <h4>📑 About</h4>
              <p>Reimagining the onboarding journey for Intuit expert portal by delivering a seemless user experience, optimising task completion, provide self service help, and ensure mobile-web responsiveness.</p>
            </div>
            <div className="cs-info-col">
              <h4>⌛️ Duration</h4>
              <p>5 Months of Research<br />and Designing</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Background ── */}
      <section className="cs-section">
        <div className="cs-container">
          <h2 className="cs-section-heading">Background</h2>
          <p className="cs-body-text">
            Intuit Inc. is an American multinational business software company that specializes in financial software. Serving approximately <strong>100 million customers worldwide</strong> with TurboTax, Credit Karma, QuickBooks, and Mailchimp.
          </p>
          <p className="cs-body-text">
            Intuit has a <strong>network of Experts</strong>, also known as Intuit Live or TurboTax Live, that connects users with a network of <strong>certified professionals, including accountants, bookkeepers, and tax experts,</strong> to provide real-time, personalized assistance. This service allows individuals and small businesses to receive expert guidance directly through Intuit's software platforms.
          </p>
          <div className="cs-section-image">
            <img
              src="https://cdn.prod.website-files.com/62a9c118130e8b4c6d766b99/66acb350b3feb4fcf6282fcd_MacBook%20Air%20-%204.png"
              alt="Intuit background"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ── Full-width image ── */}
      <div className="cs-full-image">
        <img
          src="https://cdn.prod.website-files.com/62a9c118130e8b4c6d766b99/669cbd9b032b8db8b936c92d_Frame%201197133214.png"
          alt="Process overview"
          loading="lazy"
        />
      </div>

      {/* ── Current Challenges ── */}
      <section className="cs-section">
        <div className="cs-container">
          <h2 className="cs-section-heading">Current challenges</h2>
          <p className="cs-body-text">
            Over time, expert onboarding experiences have been built to <strong>solve for different problems independently,</strong> instead of incrementally building towards a long term strategy to deliver an efficient and effective onboarding. (e.g. HR employee onboarding process, attrition, equipment shipping, rostering, training, etc) <strong>We have made it difficult for experts to complete their required task</strong> to enter production.
          </p>
          <p className="cs-body-text">
            <strong>Business gaps -</strong> Our disjointed, labor-intensive experiences often require hands-on help for experts to complete their tasks, resulting in significant delay and heavy operational costs.
          </p>
          <p className="cs-body-text">
            <strong>Design gaps -</strong> Friction in the process creates confusion and a sub-optimal experience for experts. To address these challenges, there is a need to revamp the end-to-end experience and create a more intuitive journey.
          </p>
          <div className="cs-stats-row">
            <div className="cs-stat-card">
              <h4>46K</h4>
              <div className="cs-stat-label">Total Expert</div>
              <p>Lack a unified brand, purpose, and standards. Strong push for personalisation and unskiling opportunity.</p>
            </div>
            <div className="cs-stat-card">
              <h4>90%</h4>
              <div className="cs-stat-label">Expert needs<br />hands-on help</div>
              <p>TA alone spends $2M every year for a team of 50 Customer Experience members to support 14,000 experts through the entire onboarding journey.</p>
            </div>
            <div className="cs-stat-card">
              <h4>43%</h4>
              <div className="cs-stat-label">Experts Retiring in<br />next 3 years</div>
              <p>Imminent need to focus on experience for the next generation of experts (GenZ).</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Objective ── */}
      <section className="cs-section">
        <div className="cs-container">
          <h2 className="cs-section-heading">Objective</h2>
          <p className="cs-objective-text">
            Reimagining experts journey to onboard them at <br />
            <strong>speed and scale,</strong> delivering a seemless user experience, optimising task completion, and ensure <strong>mobile-web responsiveness.</strong>
          </p>
        </div>
      </section>

      {/* ── Goals ── */}
      <section className="cs-section">
        <div className="cs-container">
          <h2 className="cs-section-heading">Goals</h2>
          <ul className="cs-goals-list">
            <li>
              <strong>Streamlined onbording process and reduced timelines -</strong> Improve usability and reducing the number of steps involved in the onboarding process. This aims to improve key performance metrics such as the percentage of expert completing onboarding tasks, speeding up the task completion, and ultimately reducing the support tickets.
            </li>
            <li>
              <strong>Reduce Manual Support Intervention -</strong> Lower the number of support requests by automating and simplifying onboarding tasks.
            </li>
            <li>
              <strong>Ensure Scalability and Responsiveness -</strong> Make the onboarding platform fully accessible and scalable to support its existing and future business goals.
            </li>
          </ul>
        </div>
      </section>

      {/* ── Discover Timeline ── */}
      <section className="cs-timeline-section">
        <div className="cs-container">
          <div className="cs-timeline-wrapper">
            <div className="cs-timeline-progress" ref={progressRef} />

            {/* Timeline item 1 - Discover */}
            <div className="cs-timeline-item">
              <div className="cs-timeline-left">
                <div className="cs-timeline-label">Discover</div>
              </div>
              <div className="cs-timeline-center">
                <div className="cs-timeline-dot" />
              </div>
              <div className="cs-timeline-content">
                <h3>Analysis of existing journey</h3>
                <p className="cs-body-text">
                  This data provides a detailed breakdown of the expert onboarding journey, highlighting significant dropoff rates at various stages and identifying key areas where targeted interventions can enhance retention and readiness.
                </p>
                <div className="cs-stats-row">
                  <div className="cs-stat-card">
                    <h4>102K</h4>
                    <div className="cs-stat-label">Total Hired<br />Expert</div>
                    <p>Across Domain and Product. They receive welcome email with credential and link to portal.</p>
                  </div>
                  <div className="cs-stat-card">
                    <h4>76%</h4>
                    <div className="cs-stat-label">Access IEP on<br />Mobile</div>
                    <p>Majority of experts try and access the Expert portal via their mobile phone</p>
                  </div>
                  <div className="cs-stat-card">
                    <h4>57%</h4>
                    <div className="cs-stat-label">Onboarding Task completion</div>
                    <p>52,039 experts were effectively onboarded highlighting a major bottle neck in the journey.</p>
                  </div>
                  <div className="cs-stat-card">
                    <h4>45%</h4>
                    <div className="cs-stat-label">Overall<br />conversion</div>
                    <p>46,570 experts were effectively ready to serve out customer.</p>
                  </div>
                </div>
                <div className="cs-section-image">
                  <img
                    src="https://cdn.prod.website-files.com/62a9c118130e8b4c6d766b99/66a1fe78f680bc788084031b_Frame%201197133216.png"
                    alt="Existing journey analysis"
                    loading="lazy"
                  />
                </div>
                <p className="cs-body-text">
                  The expert onboarding journey represents several opportunities for improvement based on the significant drop-off rates observed at various stages. Out of 102579 experts hired, only 46570 are ultimately read to serve, indicating a considerable reduction throughout the process.<br /><br />
                  The most significant drop (43%) occurs between the starting and completing onboarding tasks. Simplifying tasks, providing clearer instruction, and offering additional support could help reduce this attrition rate.
                </p>
              </div>
            </div>

            {/* Timeline item 2 - Discover */}
            <div className="cs-timeline-item">
              <div className="cs-timeline-left">
                <div className="cs-timeline-label">Discover</div>
              </div>
              <div className="cs-timeline-center">
                <div className="cs-timeline-dot" />
              </div>
              <div className="cs-timeline-content">
                <h3>Validating with our Experts</h3>
                <p className="cs-body-text">
                  In order to understand the expert pain points and gap in the journey, I conducted a ser research can help understand the pain points and mental models of experts, allowing for a more user-centered design that reduces friction.
                </p>
                <div className="cs-stats-row">
                  <div className="cs-stat-card">
                    <h4>08</h4>
                    <div className="cs-stat-label">Total Experts (TTL)</div>
                    <p>1:1 indepth interviews with experts<br />+2 roundtable discussions</p>
                  </div>
                  <div className="cs-stat-card">
                    <h4>05</h4>
                    <div className="cs-stat-label">New hire experts</div>
                    <p>Started this season with Intuit</p>
                  </div>
                  <div className="cs-stat-card">
                    <h4>03</h4>
                    <div className="cs-stat-label">Rehire experts</div>
                    <p>Have worked atleast one season</p>
                  </div>
                  <div className="cs-stat-card">
                    <h4>1-15 years</h4>
                    <div className="cs-stat-label">Years of experience</div>
                    <p>1-5 yrs : 3 experts<br />5-10 yrs :  3 experts<br />10-15 yrs : 2-3 experts</p>
                  </div>
                </div>
                <p className="cs-body-text">
                  <strong>Research Objectives</strong><br /><br />
                  1. Understanding expert's preferences, habits, mental models, and perceptions during onboarding journey.<br />
                  2. Identify key pain points and how it impacts an expert's satisfaction and efficiency.<br />
                  3. Key features and expectations that can serve as strong differentiators between a new hire vs. rehire hire experts.<br />
                  4. Provide actionable insights and recommendations for target state vision to enhance usability and appeal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Full-width image (validation) ── */}
      <div className="cs-full-image">
        <img
          src="https://cdn.prod.website-files.com/62a9c118130e8b4c6d766b99/669f41fe13e91bf643d66a1a_image%20171.png"
          alt="Validation findings"
          loading="lazy"
        />
      </div>

      {/* ── Takeaways ── */}
      <section className="cs-takeaways-section">
        <div className="cs-container">
          <h2 className="cs-section-heading">Takeaways</h2>
          <div className="cs-takeaways-grid">
            <div className="cs-takeaway-card">
              <h4>Challenges with UI Assessibility</h4>
              <p>
                The onboarding interface lacks clarity and user-freindliness. This hampers trusts and efficiency in the onboarding process.<br /><strong>90% of experts require hands-on help</strong> to complete their 5 pre-start onboarding tasks.
              </p>
            </div>
            <div className="cs-takeaway-card">
              <h4>Lack of support &amp; Communication</h4>
              <p>
                Experts feels less impowered due to lack of self-service support. This affects the morale and engagement. <strong>Experts cannot easily resolve issues on their own.</strong>
              </p>
            </div>
            <div className="cs-takeaway-card">
              <h4>Personalisation &amp; Scalibility</h4>
              <p>
                The platform is not flexible enough to handle different service types, devices, and third-party experts. <strong>Experts face a one-size-fits-all onboarding process</strong>, even when certain tasks are irrelevant to their roles.
              </p>
            </div>
            <div className="cs-takeaway-card">
              <h4>Lack of visibility &amp; growth</h4>
              <p>
                There isn't enought clarity given to the experts regarding their past performance, upskiling need, competition, raise etc.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Full-width images ── */}
      <div className="cs-full-image">
        <img
          src="https://cdn.prod.website-files.com/62a9c118130e8b4c6d766b99/66a124cf345569f9865cdc94_Frame%201197133214.png"
          alt="Research findings"
          loading="lazy"
        />
      </div>

      <div className="cs-full-image">
        <img
          src="https://cdn.prod.website-files.com/62a9c118130e8b4c6d766b99/66a0e2757d4910c70139d74b_Group%201125087831.png"
          alt="Design exploration"
          loading="lazy"
        />
      </div>

      <div className="cs-full-image">
        <img
          src="https://cdn.prod.website-files.com/62a9c118130e8b4c6d766b99/66a2074268fe9e77cef41735_Accessibility%20(5).png"
          alt="Accessibility design"
          loading="lazy"
        />
      </div>

      <div className="cs-full-image">
        <img
          src="https://cdn.prod.website-files.com/62a9c118130e8b4c6d766b99/66a11cfc5ccd632e88a3f957_Accessibility.png"
          alt="Accessibility overview"
          loading="lazy"
        />
      </div>

      <div className="cs-full-image">
        <img
          src="https://cdn.prod.website-files.com/62a9c118130e8b4c6d766b99/66a209718d577327d650ebad_Accessibility%20(6).png"
          alt="Accessibility iteration"
          loading="lazy"
        />
      </div>

      <div className="cs-full-image">
        <img
          src="https://cdn.prod.website-files.com/62a9c118130e8b4c6d766b99/66a2038e063e15d1458ca0fe_Accessibility%20(3).png"
          alt="Design system"
          loading="lazy"
        />
      </div>

      <div className="cs-full-image">
        <img
          src="https://cdn.prod.website-files.com/62a9c118130e8b4c6d766b99/66a0bb2dffa2f77d741851e6_Accessibility%20(6).png"
          alt="Mobile responsiveness"
          loading="lazy"
        />
      </div>

      <div className="cs-full-image">
        <img
          src="https://cdn.prod.website-files.com/62a9c118130e8b4c6d766b99/66a0c524d7bcdd17424c13da_Accessibility%20(8).png"
          alt="Component library"
          loading="lazy"
        />
      </div>

      <div className="cs-full-image">
        <img
          src="https://cdn.prod.website-files.com/62a9c118130e8b4c6d766b99/66a203de240b9b702b2bdae7_Accessibility%20(4).png"
          alt="Design details"
          loading="lazy"
        />
      </div>

      <div className="cs-full-image">
        <img
          src="https://cdn.prod.website-files.com/62a9c118130e8b4c6d766b99/66a0d2ae7eea0da591958b7a_Accessibility%20(9).png"
          alt="Final designs"
          loading="lazy"
        />
      </div>

      <div className="cs-full-image">
        <img
          src="https://cdn.prod.website-files.com/62a9c118130e8b4c6d766b99/66a12284054d86dedfaaa9ec_Group%201125087833%20(1).png"
          alt="Impact overview"
          loading="lazy"
        />
      </div>

      {/* ── Impact Timeline ── */}
      <section className="cs-timeline-section">
        <div className="cs-container">
          <div className="cs-timeline-wrapper">
            <div className="cs-timeline-progress" />

            <div className="cs-timeline-item">
              <div className="cs-timeline-left">
                <div className="cs-timeline-label">Impact</div>
              </div>
              <div className="cs-timeline-center">
                <div className="cs-timeline-dot" />
              </div>
              <div className="cs-timeline-content">
                <h3>Key Observations</h3>
                <p className="cs-body-text">
                  We were able to push the latest design into the production by mid of June, exposing our funnel to a limited 3% expert base (6,257 expert in June) ~ 182 experts. This preliminary release shows a significant jump in the task completion rate.
                </p>
                <div className="cs-stats-row">
                  <div className="cs-stat-card">
                    <h4>78%</h4>
                    <div className="cs-stat-label">Task Completion</div>
                    <p>More than 140 experts were able to completed their onboarding task within day 1 successfully.</p>
                  </div>
                  <div className="cs-stat-card">
                    <h4>47%</h4>
                    <div className="cs-stat-label">Attempted using mobile</div>
                    <p>About 85 experts attempted onboarding task on their web browser.</p>
                  </div>
                  <div className="cs-stat-card">
                    <h4>16%</h4>
                    <div className="cs-stat-label">Completed task on mobile</div>
                    <p>About 29 experts were able to successfully completed their onboarding task on mobile</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="cs-full-image">
        <img
          src="https://cdn.prod.website-files.com/62a9c118130e8b4c6d766b99/66a1f777a805d1355d218ee1_Frame%201197133227.jpg"
          alt="Final impact"
          loading="lazy"
        />
      </div>

      {/* ── Key Learnings ── */}
      <section className="cs-learnings-section">
        <div className="cs-container">
          <h2 className="cs-section-heading">Key learnings</h2>
          <ul className="cs-learnings-list">
            <li>
              <strong>Stakeholder Management:</strong> Regular design walkthrough to different product teams, getting regular feedback and ensuring everyone is aligned and informed regarding design decision until design handoff to dev. Keeping stakeholders in the loop through email and slacks channels conversation.
            </li>
            <li>
              <strong>Empathy:</strong> Not only for the archetype I am designing for but also who I am designing with. Ability to consider multiple perspective, self awareness and influence the roadmap with design decision.
            </li>
            <li>
              Beyond focusing solely on enhancing end users' experiences, my role expanded to include understanding business requirements and the broader product environment. This involved <strong>embracing the complexities of both business and user-oriented facets</strong>. To effectively communicate with the tech team and make informed design choices, it was essential to grasp the nuances of the existing tech stack.
            </li>
            <li>
              <strong>Designing with Future Growth in Mind:</strong> The redesign process prioritized scalability, ensuring that the product can effortlessly accommodate expansion.
            </li>
          </ul>
        </div>
      </section>

      {/* ── Footer ── */}
      <Contact />
    </div>
  );
}
