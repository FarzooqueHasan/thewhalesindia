import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const progressRef = useRef(null);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          y: '-100%',
          duration: 1,
          ease: 'expo.inOut',
          onComplete: onComplete,
        });
      },
    });

    // Animate percentage
    const obj = { value: 0 };
    gsap.to(obj, {
      value: 100,
      duration: 2.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        setPercentage(Math.floor(obj.value));
      },
    });

    tl.fromTo(
      '.preloader-word',
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'expo.out' }
    )
    .to('.preloader-word', {
      opacity: 0,
      y: -100,
      duration: 1,
      stagger: 0.1,
      ease: 'expo.in',
      delay: 0.5,
    });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div className="preloader-container" ref={containerRef}>
      <div className="preloader-content">
        <h1 className="preloader-text" ref={textRef}>
          <span className="preloader-word">THE</span>
          <span className="preloader-word">WHALES</span>
          <span className="preloader-word">INDIA</span>
        </h1>
        <div className="preloader-progress-wrap">
          <div className="preloader-percentage">{percentage}%</div>
          <div className="preloader-bar">
            <div 
              className="preloader-fill" 
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      </div>
      <div className="preloader-bg-text">THE WHALES</div>
    </div>
  );
};

export default Preloader;
