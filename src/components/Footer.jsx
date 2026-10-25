import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          THE<span>WHALES</span>INDIA
        </div>
        
        <div className="footer-copy">
          © 2026 TheWhalesIndia. Complete Digital Solutions.
        </div>

        <div className="footer-links">
          <a href="#services">Services</a>
          <a href="#portfolio">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
