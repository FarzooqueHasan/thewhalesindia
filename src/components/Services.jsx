import React, { useEffect, useRef } from 'react';
import { Monitor, Globe, User, Shield, Briefcase, Rocket } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: <Monitor size={32} />,
    title: "Web Design & Development",
    desc: "Responsive, fast, and visually stunning websites engineered from the ground up — tailored precisely to your brand's voice."
  },
  {
    icon: <Globe size={32} />,
    title: "Online Presence Strategy",
    desc: "Domain, hosting, SEO, and digital footprint — we build the infrastructure that puts you exactly where your audience is."
  },
  {
    icon: <User size={32} />,
    title: "UI / UX Design",
    desc: "Interfaces engineered for delight. We map every user journey with precision — eliminating friction, amplifying engagement."
  },
  {
    icon: <Shield size={32} />,
    title: "AMC & Redesign",
    desc: "Annual Maintenance Contracts and full redesigns — keeping your digital presence sharp and secure as you grow."
  },
  {
    icon: <Briefcase size={32} />,
    title: "Portfolio & Personal Brands",
    desc: "Your professional story, told with impact. Portfolio sites that position you exactly where you deserve to be seen."
  },
  {
    icon: <Rocket size={32} />,
    title: "Brand Identity & Launch",
    desc: "First impressions are permanent. We engineer visual identities and digital launches that make new ventures impossible to ignore."
  }
];

const Services = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = gsap.utils.toArray('.service-card');
    
    gsap.fromTo('.services-title', 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        scrollTrigger: {
          trigger: '.services-title',
          start: 'top 80%',
        }
      }
    );

    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          }
        }
      );
    });
  }, []);

  return (
    <section id="services" className="services" ref={sectionRef}>
      <div className="services-container">
        <div className="services-header">
          <div className="s-label reveal">What We Craft</div>
          <h2 className="services-title">EVERY PIXEL. <span>INTENTIONAL.</span></h2>
          <p className="services-intro">
            From conception to launch and beyond, TheWhalesIndia engineers digital experiences 
            that don't just look remarkable — they perform, convert, and endure.
          </p>
        </div>

        <div className="services-grid">
          {services.map((svc, index) => (
            <div className="service-card interactive" key={index}>
              <div className="service-number">0{index + 1}</div>
              <div className="service-icon">{svc.icon}</div>
              <h3 className="service-title">{svc.title}</h3>
              <p className="service-desc">{svc.desc}</p>
              <div className="service-link">
                Learn More <span>→</span>
              </div>
              <div className="service-border"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
