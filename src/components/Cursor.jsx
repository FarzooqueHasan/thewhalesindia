import React, { useEffect, useRef } from 'react';
import './Cursor.css';

const Cursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const requestRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const animate = () => {
      const { x, y } = mousePos.current;
      ringPos.current.x += (x - ringPos.current.x) * 0.15;
      ringPos.current.y += (y - ringPos.current.y) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    requestRef.current = requestAnimationFrame(animate);

    // Hover effect for links
    const handleHover = (isHovering) => {
      if (ringRef.current) {
        if (isHovering) {
          ringRef.current.classList.add('cursor-hover');
          dotRef.current.classList.add('dot-hover');
        } else {
          ringRef.current.classList.remove('cursor-hover');
          dotRef.current.classList.remove('dot-hover');
        }
      }
    };

    const interactables = document.querySelectorAll('a, button, .interactive');
    interactables.forEach((el) => {
      el.addEventListener('mouseenter', () => handleHover(true));
      el.addEventListener('mouseleave', () => handleHover(false));
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef}></div>
      <div className="cursor-ring" ref={ringRef}></div>
    </>
  );
};

export default Cursor;
