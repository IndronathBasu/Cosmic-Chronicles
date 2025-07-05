import React, { useState, useEffect } from 'react';
import { Parallax } from 'react-scroll-parallax';
import EventCard from './EventCard';
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
  
  return { deviceType, orientation, isTablet: deviceType === 'tablet' };
};

interface EventListProps {
  events: AstronomicalEvent[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  const { deviceType, isTablet } = useDeviceDetection();
  const isMobile = deviceType === 'mobile';
  if (!events || events.length === 0) {
    return <div className="no-events">No astronomical events found for this date.</div>;
  }

  return (
    <section className="event-list-section">
      <h2 className="section-title">Historical Astronomical Events</h2>
      <div className="event-list">
        {events.map((event, index) => {
          // Calculate dynamic scroll points based on index with increased values to prevent overlapping
          const startScroll = window.innerHeight * (3.5 + index * 0.2);
          const endScroll = window.innerHeight * (4.2 + index * 0.2);
          
          // Different parallax settings based on device type
          if (isMobile) {
            return (
              <div 
                key={`${event.title}-${index}`}
                className="event-parallax-wrapper"
              >
                <EventCard 
                  title={event.title}
                  date={event.date}
                  description={event.description}
                  media={event.media}
                  type={event.type}
                  source={event.source}
                  index={index}
                />
              </div>
            );
          } else if (isTablet) {
            // Optimized parallax for iPad - lighter effects for better performance
            return (
              <Parallax 
                key={`${event.title}-${index}`}
                translateY={[10, -10]} // Reduced movement for better iPad performance
                opacity={[0.8, 1]}
                scale={[0.98, 1.01]}
                // Disable rotation on iPad for better performance
                easing="easeOutQuad"
                className="tablet-parallax-wrapper"
              >
                <EventCard 
                  title={event.title}
                  date={event.date}
                  description={event.description}
                  media={event.media}
                  type={event.type}
                  source={event.source}
                  index={index}
                />
              </Parallax>
            );
          } else {
            // Full effects for desktop
            return (
              <Parallax 
                key={`${event.title}-${index}`}
                translateY={[20, -20]} 
                translateX={index % 2 === 0 ? [10, -10] : [-10, 10]}
                opacity={[0.7, 1]}
                scale={[0.97, 1.01]}
                easing={index % 2 === 0 ? "easeOutQuad" : "easeOutCubic"}
                startScroll={startScroll}
                endScroll={endScroll}
                className="event-parallax-wrapper"
              >
                <EventCard 
                  title={event.title}
                  date={event.date}
                  description={event.description}
                  media={event.media}
                  type={event.type}
                  source={event.source}
                  index={index}
                />
              </Parallax>
            );
          }
        })}
      </div>
    </section>
  );
};

export default EventList;