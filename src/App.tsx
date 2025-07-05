import React, { useEffect, useState } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import { fetchEvents, AstronomicalEvent } from './utils/fetchEvents';
import EventList from './components/EventList';
import Storytelling from './components/Storytelling';
import CosmicCalendar from './components/CosmicCalendar';
import BotpressChat from './components/BotpressChat';
import './styles/main.css';
import './styles/starry-background.css';
import './styles/astrobot.css';

// Custom hook for responsive behavior
const useResponsiveLayout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return { isMobile };
};

const App: React.FC = () => {
  const [events, setEvents] = useState<AstronomicalEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isMobile } = useResponsiveLayout();

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const data = await fetchEvents(currentDate);
        setEvents(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load events. Please try again later.');
        setLoading(false);
      }
    };

    loadEvents();
  }, [currentDate]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentDate(e.target.value);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading">Loading astronomical events...</div>
        <div className="starry-background">
          <div className="stars"></div>
          <div className="stars stars-2"></div>
          <div className="stars stars-3"></div>
          <div className="nebula"></div>
          <div className="glow-stars">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="glow-star"></div>
            ))}
          </div>
          <div className="shooting-star" style={{"--rotation": "20deg"} as React.CSSProperties}></div>
          <div className="shooting-star" style={{"--rotation": "-15deg"} as React.CSSProperties}></div>
          <div className="shooting-star" style={{"--rotation": "45deg"} as React.CSSProperties}></div>
          <div className="shooting-star" style={{"--rotation": "-30deg"} as React.CSSProperties}></div>
          <div className="shooting-star" style={{"--rotation": "-60deg"} as React.CSSProperties}></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <ParallaxProvider>
      <div className="app-container">
        <div className="starry-background">
          <div className="stars"></div>
          <div className="stars stars-2"></div>
          <div className="stars stars-3"></div>
          <div className="nebula"></div>
          <div className="glow-stars">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="glow-star"></div>
            ))}
          </div>
          <div className="shooting-star" style={{"--rotation": "20deg"} as React.CSSProperties}></div>
          <div className="shooting-star" style={{"--rotation": "-15deg"} as React.CSSProperties}></div>
          <div className="shooting-star" style={{"--rotation": "45deg"} as React.CSSProperties}></div>
          <div className="shooting-star" style={{"--rotation": "-30deg"} as React.CSSProperties}></div>
          <div className="shooting-star" style={{"--rotation": "-60deg"} as React.CSSProperties}></div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobile && (
          <div className="mobile-nav">
            <div className="mobile-nav-header">
              <div className="mobile-logo">Cosmic Chronicles</div>
              <button 
                className={`mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
            {mobileMenuOpen && (
              <div className="mobile-menu">
                <a href="#" className="mobile-menu-item">Home</a>
                <a href="#" className="mobile-menu-item">About</a>
                <a href="#" className="mobile-menu-item">Events</a>
                <a href="#" className="mobile-menu-item">Gallery</a>
                <a href="#" className="mobile-menu-item">Contact</a>
              </div>
            )}
          </div>
        )}
        
        <main>
          <Storytelling events={events} />
          
          <div className="date-selector-container">
            <div className="date-selector">
              <label htmlFor="date-picker">Select a date to explore: </label>
              <div className="cosmic-date-wrapper">
                <CosmicCalendar 
                  selectedDate={currentDate} 
                  onDateChange={setCurrentDate} 
                  maxDate={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
          </div>
          
          <EventList events={events} />
        </main>
        
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-logo">Cosmic Chronicles</div>
            <div className="footer-links">
              <a href="#" className="footer-link">Home</a>
              <a href="#" className="footer-link">About</a>
              <a href="#" className="footer-link">Events</a>
              <a href="#" className="footer-link">Gallery</a>
              <a href="#" className="footer-link">Contact</a>
            </div>
            <div className="footer-social">
              <a href="#" className="social-icon">🚀</a>
              <a href="#" className="social-icon">⭐</a>
              <a href="#" className="social-icon">🔭</a>
              <a href="#" className="social-icon">🛰️</a>
            </div>
            <div className="footer-copyright">
              © {new Date().getFullYear()} Cosmic Chronicles | Explore the wonders of space
            </div>
          </div>
        </footer>
        
        {/* Astrobot Chatbot */}
        <BotpressChat />
      </div>
    </ParallaxProvider>
  );
};

export default App;