import React, { useEffect } from 'react';
import gsap from 'gsap';
import './About.css';

const stats = [
  { label: 'Projects Built', value: '08' },
  { label: 'Industries', value: '05' },
  { label: 'Client Satisfaction', value: '100%' },
  { label: 'AMC Partners', value: '03' }
];

const About = () => {
  useEffect(() => {
    gsap.fromTo('.about-image-wrap', 
      { rotationY: -20, rotationX: 10 },
      { 
        rotationY: 20, 
        rotationX: -10, 
        duration: 5, 
        repeat: -1, 
        yoyo: true, 
        ease: 'power1.inOut' 
      }
    );

    gsap.from('.stat-item', {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.about-stats',
        start: 'top 85%',
      }
    });
  }, []);

  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="about-grid">
          
          <div className="about-content">
            <div className="s-label reveal">About TheWhalesIndia</div>
            <h2 className="about-title">SMALL STUDIO. <span>VAST OCEAN</span> TO SWIM IN.</h2>
            <div className="about-text-wrap">
              <p>
                TheWhalesIndia was born from a simple conviction: <strong>every organisation 
                deserves a digital presence as powerful as their purpose.</strong> We're a 
                boutique digital solutions studio for clients who want more than a template — 
                they want a territory.
              </p>
              <p>
                From MUN committees and NGOs to dental clinics and aerospace organisations, 
                we've navigated a wide spectrum of industries. Each project sharpens our craft 
                and broadens our creative range.
              </p>
              <p>
                We partner long-term. Whether it's a launch, a redesign, or an ongoing 
                maintenance contract — we're in the deep end with you, every stroke of the way.
              </p>
            </div>
            
            <div className="about-stats">
              {stats.map((stat, i) => (
                <div className="stat-item" key={i}>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="about-visual">
            <div className="about-image-wrap">
              <div className="about-floating-logo">
                W<span>H</span>
              </div>
              <div className="about-glass"></div>
              <div className="about-glow"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
