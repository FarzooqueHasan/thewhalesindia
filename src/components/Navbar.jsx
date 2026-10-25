import React, { useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import './Navbar.css';

const Navbar = () => {
  const navRef = useRef(null);
  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out', delay: 3 }
    );
  }, []);

  return (
    <nav className="navbar" ref={navRef}>
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          THE<span>WHALES</span>INDIA
        </a>

        <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
          <a href="#services" onClick={() => setIsOpen(false)}>Services</a>
          <a href="#portfolio" onClick={() => setIsOpen(false)}>Portfolio</a>
          <a href="#about" onClick={() => setIsOpen(false)}>About</a>
          <a href="#process" onClick={() => setIsOpen(false)}>Process</a>
          <a href="#contact" className="navbar-cta" onClick={() => setIsOpen(false)}>Start Project</a>
        </div>

        <button className="navbar-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
