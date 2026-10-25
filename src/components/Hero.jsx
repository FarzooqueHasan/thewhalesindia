import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Hero.css';

import { useDeepOcean } from './DeepOceanEngine';

const Hero = () => {
  const heroRef = useRef(null);
  const { depth } = useDeepOcean();

  useEffect(() => {
    const tl = gsap.timeline({ delay: 3.5 });
    // ... animation logic ...
  }, []);

  return (
    <section className="hero" ref={heroRef} style={{
      filter: `url(#liquid-distortion)`
    }}>
      <div className="hero-content" style={{
        transform: `translateY(${depth * -100}px)`,
        opacity: 1 - depth * 2
      }}>
        <div className="hero-badge">
          <span className="badge-dot"></span>
          <span>Complete Digital Solutions</span>
        </div>
        
        <h1 className="hero-title">
          <div className="title-line">
            <span>WE</span> <span>BUILD</span>
          </div>
          <div className="title-line outline">
            <span>DIGITAL</span>
          </div>
          <div className="title-line accent">
            <span>OCEANS.</span>
          </div>
        </h1>

        <p className="hero-sub">
          Websites, brands, and digital experiences crafted for organisations 
          that refuse to be ordinary. Based in India. Trusted worldwide.
        </p>

        <div className="hero-btns">
          <a href="#portfolio" className="btn btn-primary interactive">Explore Works</a>
          <a href="#contact" className="btn btn-secondary interactive">Start Project</a>
        </div>
      </div>

      <div className="hero-scroll">
        <div className="scroll-text">Scroll to dive</div>
        <div className="scroll-line"></div>
      </div>

      {/* SVG Liquid Filter */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="liquid-distortion">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.012" 
            numOctaves="1" 
            result="noise" 
          >
            <animate 
              attributeName="baseFrequency" 
              values="0.012;0.008;0.012" 
              dur="10s" 
              repeatCount="indefinite" 
            />
          </feTurbulence>
          <feDisplacementMap 
            in="SourceGraphic" 
            in2="noise" 
            scale={20 + depth * 100} 
          />
        </filter>
      </svg>
    </section>
  );
};

export default Hero;
