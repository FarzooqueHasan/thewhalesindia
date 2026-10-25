import React, { createContext, useContext, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DeepOceanContext = createContext();

export const useDeepOcean = () => useContext(DeepOceanContext);

export const DeepOceanProvider = ({ children }) => {
  const [depth, setDepth] = useState(0); // 0 (surface) to 1 (abyss)

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        setDepth(self.progress);
      }
    });

    return () => trigger.kill();
  }, []);

  return (
    <DeepOceanContext.Provider value={{ depth }}>
      {children}
    </DeepOceanContext.Provider>
  );
};

// A helper component to visualize depth transitions if needed
export const DepthIndicator = () => {
  const { depth } = useDeepOcean();
  return (
    <div style={{
      position: 'fixed',
      right: '20px',
      top: '50%',
      transform: 'translateY(-50%)',
      height: '200px',
      width: '2px',
      backgroundColor: 'rgba(255,255,255,0.1)',
      zIndex: 1000,
      pointerEvents: 'none'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: `${depth * 100}%`,
        background: 'linear-gradient(to bottom, transparent, var(--color-cyan))',
        transition: 'height 0.1s ease-out'
      }} />
      <div style={{
        position: 'absolute',
        top: `${depth * 100}%`,
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '10px',
        color: 'var(--color-cyan)',
        whiteSpace: 'nowrap',
        marginTop: '20px'
      }}>
        {Math.round(depth * 3000)}m
      </div>
    </div>
  );
};
