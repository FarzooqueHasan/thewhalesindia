import React, { useEffect } from 'react';
import gsap from 'gsap';
import './Process.css';

const steps = [
  {
    n: '01',
    title: 'Discover',
    desc: 'We immerse ourselves in your world — understanding your brand, your goals, and your audience before a single pixel is placed.'
  },
  {
    n: '02',
    title: 'Strategise',
    desc: 'A clear digital blueprint. Sitemap, wireframes, and a creative direction tailored precisely to your vision and your users.'
  },
  {
    n: '03',
    title: 'Design & Build',
    desc: 'Where craft meets code. Responsive, fast, visually stunning — built to perform flawlessly on every screen, every time.'
  },
  {
    n: '04',
    title: 'Launch & Sustain',
    desc: 'We launch together. Then we stay — through AMCs, updates, and ongoing partnerships to keep your presence growing.'
  }
];

const Process = () => {
  useEffect(() => {
    gsap.from('.process-step', {
      opacity: 0,
      x: -30,
      duration: 1,
      stagger: 0.3,
      scrollTrigger: {
        trigger: '.process-grid',
        start: 'top 75%',
      }
    });

    gsap.fromTo('.process-line-fill', 
      { scaleX: 0 },
      { 
        scaleX: 1, 
        duration: 2, 
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: '.process-grid',
          start: 'top 75%',
        }
      }
    );
  }, []);

  return (
    <section id="process" className="process">
      <div className="process-container">
        <div className="process-header">
          <div className="s-label">How We Work</div>
          <h2 className="process-title">FROM BRIEF TO <span>BRILLIANT.</span></h2>
        </div>

        <div className="process-grid">
          <div className="process-line">
            <div className="process-line-fill"></div>
          </div>
          
          {steps.map((step, i) => (
            <div className="process-step" key={i}>
              <div className="process-number-wrap">
                <div className="process-number">{step.n}</div>
                <div className="process-dot"></div>
              </div>
              <h3 className="process-step-title">{step.title}</h3>
              <p className="process-step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
