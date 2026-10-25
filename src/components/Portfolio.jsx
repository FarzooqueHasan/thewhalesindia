import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, ArrowRight } from 'lucide-react';
import './Portfolio.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: '01',
    name: "Delhi Public School, Tajpur",
    category: "Education · Live",
    desc: "A full institutional website for one of the region's leading schools — engineered for parents, students, and staff.",
    link: "https://www.dpstajpur.com",
    tag: "tag-live"
  },
  {
    id: '02',
    name: "Rural Collective NGO",
    category: "NGO · Launching Soon",
    desc: "A digital home for grassroots change — designed to amplify a community-driven non-profit bridging the rural-urban divide.",
    link: "https://dpstaj.wixsite.com/ruralcollective",
    tag: "tag-soon"
  },
  {
    id: '03',
    name: "AEROSS Organisation",
    category: "Aviation · AMC + Redesign",
    desc: "Redefined digital identity for an aerospace organisation. AMC partnership — redesigned, rebuilt, and refined.",
    link: "https://aeross.org",
    tag: "tag-amc"
  },
  {
    id: '04',
    name: "CHITR",
    category: "Eco-Fashion · Upcoming",
    desc: "A digital launchpad for a bold new eco-conscious fashion brand — where sustainability meets striking visual artistry.",
    link: "https://chitr-ten.vercel.app",
    tag: "tag-soon"
  }
];

const Portfolio = () => {
  const horizontalRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const slides = gsap.utils.toArray('.portfolio-slide');

    const scrollTween = gsap.to(slides, {
      xPercent: -100 * (slides.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: horizontalRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (slides.length - 1),
        start: 'top top',
        end: () => `+=${track.offsetWidth}`,
      }
    });

    return () => {
      scrollTween.kill();
    };
  }, []);

  return (
    <section id="portfolio" className="portfolio-horizontal" ref={horizontalRef}>
      <div className="portfolio-track" ref={trackRef}>
        
        {/* Intro Slide */}
        <div className="portfolio-slide intro">
          <div className="portfolio-intro-content">
            <div className="s-label">Selected Works</div>
            <h2 className="portfolio-h2">WORK THAT SPEAKS<br/>FOR <span>ITSELF.</span></h2>
            <p className="portfolio-intro-desc">
              A curated selection of projects across multiple industries. 
              Each built to command attention and deliver performance.
            </p>
            <div className="portfolio-scroll-hint">
              <ArrowRight size={20} />
              <span>Scroll to explore</span>
            </div>
          </div>
          <div className="portfolio-intro-bg">PORTFOLIO</div>
        </div>

        {/* Project Slides */}
        {projects.map((proj) => (
          <div className="portfolio-slide project" key={proj.id}>
            <div className="project-container">
              <div className="project-meta">
                <div className={`project-tag ${proj.tag}`}>
                  <span className="dot"></span>
                  {proj.category}
                </div>
                <h2 className="project-name">{proj.name}</h2>
                <p className="project-desc">{proj.desc}</p>
                <a href={proj.link} target="_blank" rel="noopener noreferrer" className="project-link interactive">
                  Visit Project <ExternalLink size={14} />
                </a>
              </div>
              
              <div className="project-visual">
                <div className="project-mock">
                  <div className="mock-header">
                    <span className="mock-dot"></span>
                    <span className="mock-dot"></span>
                    <span className="mock-dot"></span>
                  </div>
                  <div className="mock-content">
                    <div className="mock-placeholder">
                      <div className="mock-pulse"></div>
                    </div>
                  </div>
                </div>
                <div className="project-number">{proj.id}</div>
              </div>
            </div>
            <div className="project-bg-text">{proj.name}</div>
          </div>
        ))}

      </div>
    </section>
  );
};

export default Portfolio;
