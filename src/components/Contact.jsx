import React, { useEffect } from 'react';
import gsap from 'gsap';
import './Contact.css';

const Contact = () => {
  useEffect(() => {
    gsap.from('.contact-title span', {
      opacity: 0,
      y: 50,
      duration: 1.2,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.contact',
        start: 'top 80%',
      }
    });
  }, []);

  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        <div className="contact-header">
          <div className="s-label">Get In Touch</div>
          <h2 className="contact-title">
            <span>LET'S BUILD</span>
            <span className="outline">SOMETHING</span>
            <span>EXTRAORDINARY.</span>
          </h2>
        </div>

        <div className="contact-content">
          <p className="contact-desc">
            Whether you're a startup, an institution, or an individual — if you 
            need a digital presence that commands attention, let's talk.
          </p>
          
          <a href="mailto:hello@thewhalesindia.com" className="contact-email interactive">
            hello@thewhalesindia.com
          </a>

          <div className="contact-meta">
            <div className="meta-item">Based in India</div>
            <div className="meta-sep">·</div>
            <div className="meta-item">Working Worldwide</div>
            <div className="meta-sep">·</div>
            <div className="meta-item">Always Creating</div>
          </div>

          <a href="mailto:hello@thewhalesindia.com" className="btn btn-primary interactive">
            Start a Conversation
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
