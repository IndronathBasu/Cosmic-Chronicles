import React, { useEffect, useState } from 'react';
import { Parallax, ParallaxBanner, useParallaxController } from 'react-scroll-parallax';
import { AstronomicalEvent } from '../utils/fetchEvents';

// Custom hook for device detection
const useDeviceDetection = () => {
  const [deviceType, setDeviceType] = useState(() => {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width >= 768 && width <= 1024) return 'tablet';
    return 'desktop';
  });
  
  const [orientation, setOrientation] = useState(() => {
    return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
  });
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) setDeviceType('mobile');
      else if (width >= 768 && width <= 1024) setDeviceType('tablet');
      else setDeviceType('desktop');
      
      setOrientation(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return { deviceType, orientation, isTablet: deviceType === 'tablet', isMobile: deviceType === 'mobile' };
};

interface StorytellingProps {
  events: AstronomicalEvent[];
}

const Storytelling: React.FC<StorytellingProps> = ({ events }) => {
  const parallaxController = useParallaxController();
  const [scrolled, setScrolled] = useState(false);
  const { orientation, isTablet, isMobile } = useDeviceDetection();

  useEffect(() => {
    // Force a parallax cache update on mount
    if (parallaxController) {
      parallaxController.update();
    }

    // Add scroll listener to detect when user has scrolled
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > window.innerHeight * 0.2) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [parallaxController]);

  if (!events || events.length === 0) {
    return null;
  }

  // Get the first event for the hero section
  const featuredEvent = events[0];

  return (
    <div className="storytelling">
      <ParallaxBanner
        className="hero-parallax fullscreen-landing"
        layers={[
          { 
            image: featuredEvent.media,
            // Optimized parallax settings based on device type
            speed: isMobile ? -10 : isTablet ? -15 : -20,
            scale: isMobile ? [1.0, 1.15] : isTablet ? [1.0, 1.2] : [1.0, 1.3],
            opacity: [0.6, 0.9],
            expanded: false,
            easing: isTablet && orientation === 'landscape' ? 'easeOutCubic' : 'easeOutQuad',
          },
          {
            children: (
              <div className="hero-overlay"></div>
            ),
            speed: isMobile ? -10 : isTablet ? -12 : -15,
            opacity: [0.7, 0.5],
            easing: 'easeOutCubic',
          },
          {
            children: (
              <div className="hero-section">
                <div className="hero-content">
                  <Parallax 
                    translateY={isMobile ? [-20, 20] : isTablet ? [-25, 25] : [-30, 30]} 
                    opacity={[0.7, 1]} 
                    scale={isMobile ? [0.95, 1.05] : isTablet ? [0.92, 1.08] : [0.9, 1.1]} 
                    easing={isTablet ? "easeOutCubic" : "easeOutQuad"}
                  >
                    <h1 className="hero-title">Cosmic Chronicles</h1>
                  </Parallax>
                  <div className={`scroll-indicator ${scrolled ? 'hidden' : ''}`}>
                    <div className="scroll-arrow"></div>
                    <div className="scroll-text">Scroll to Explore</div>
                  </div>
                </div>
              </div>
            ),
            speed: -10,
            easing: 'easeOutQuad',
          },
        ]}
      />
      
      <div className="journey-section">
        <Parallax translateY={[-20, 20]} opacity={[0.3, 1]} scale={[0.95, 1.05]} speed={-5} easing="easeOutQuad" startScroll={window.innerHeight * 0.5} endScroll={window.innerHeight * 1.2}>
          <h2 className="journey-title">Journey Through Time and Space</h2>
        </Parallax>
        <Parallax translateY={[-15, 15]} opacity={[0.3, 1]} speed={-2} easing="easeOutCubic" startScroll={window.innerHeight * 0.6} endScroll={window.innerHeight * 1.3}>
          <p className="journey-description">
            Explore the wonders of the universe through significant astronomical events that occurred throughout history.
          </p>
        </Parallax>
      </div>

      <div className="featured-event">
        <Parallax translateY={[20, -20]} opacity={[0.5, 1]} scale={[0.95, 1.05]} easing="easeOutQuad" startScroll={window.innerHeight * 1.2} endScroll={window.innerHeight * 1.8}>
          <h2 className="featured-title">Featured Event</h2>
          <div className="featured-content">
            <div className="featured-text">
              <Parallax translateY={[-10, 10]} opacity={[0.7, 1]} scale={[0.97, 1.03]} easing="easeOutCubic" startScroll={window.innerHeight * 1.3} endScroll={window.innerHeight * 1.9}>
                <h3>{featuredEvent.title}</h3>
              </Parallax>
              <Parallax translateY={[-8, 8]} opacity={[0.7, 1]} easing="easeOutQuad" startScroll={window.innerHeight * 1.35} endScroll={window.innerHeight * 1.95}>
                <p className="featured-date">{featuredEvent.date}</p>
              </Parallax>
              <Parallax translateY={[-5, 5]} opacity={[0.7, 1]} easing="easeOutQuad" startScroll={window.innerHeight * 1.4} endScroll={window.innerHeight * 2.0}>
                <p className="featured-description">{featuredEvent.description}</p>
              </Parallax>
            </div>
            <Parallax 
              translateX={[10, -10]} 
              scale={[0.95, 1.05]} 
              rotate={[-2, 2]} 
              className="featured-image-container" 
              easing="easeOutCubic" 
              startScroll={window.innerHeight * 1.3} 
              endScroll={window.innerHeight * 1.9}
            >
              <img 
                src={featuredEvent.media} 
                alt={featuredEvent.title} 
                className="featured-image" 
                onLoad={() => parallaxController?.update()}
              />
            </Parallax>
          </div>
        </Parallax>
      </div>

      <div className="story-divider">
        <Parallax translateY={[30, -30]} opacity={[0.3, 1]} scale={[0.9, 1.1]} easing="easeOutQuad" startScroll={window.innerHeight * 2.0} endScroll={window.innerHeight * 2.5}>
          <div className="divider-line"></div>
          <div className="divider-text">Explore More Events</div>
          <div className="divider-line"></div>
        </Parallax>
      </div>
    </div>
  );
};

export default Storytelling;