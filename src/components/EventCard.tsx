import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AstronomicalEvent } from '../utils/fetchEvents';

interface EventCardProps extends AstronomicalEvent {
  index?: number; // Optional index for animation sequencing
}

const EventCard: React.FC<EventCardProps> = ({ title, date, description, media, type, source, index = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Track window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  // Auto-expand on larger screens and handle iPad specifically
  useEffect(() => {
    if (windowWidth >= 1024) {
      // Desktop - always expanded
      setIsExpanded(true);
    } else if (windowWidth >= 768 && windowWidth <= 1024) {
      // iPad - expanded in landscape, collapsed in portrait
      const isLandscape = window.innerWidth > window.innerHeight;
      setIsExpanded(isLandscape);
    } else {
      // Mobile - always collapsed
      setIsExpanded(false);
    }
  }, [windowWidth]);

  // Determine card style based on event type
  const getCardStyle = () => {
    switch(type) {
      case 'mission':
        return 'event-card mission';
      case 'discovery':
        return 'event-card discovery';
      case 'milestone':
        return 'event-card milestone';
      case 'disaster':
        return 'event-card disaster';
      case 'apod':
        return 'event-card apod';
      default:
        return 'event-card';
    }
  };

  return (
    <motion.div 
        className={getCardStyle()}
        initial={{ opacity: 0, y: 80, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          delay: index * 0.1
        }}
        whileHover={{ 
          scale: 1.03, 
          y: -10,
          boxShadow: "0 30px 60px rgba(0, 0, 0, 0.4), 0 0 30px rgba(77, 171, 247, 0.4)",
          transition: { duration: 0.4, ease: "easeOut" }
        }}
        onClick={toggleExpand}
    >
      {media && (
        <motion.div 
          className="event-media"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.img 
            src={media} 
            alt={title} 
            loading="lazy" 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onLoad={(e) => {
              // Ensure image is properly loaded and sized
              const img = e.currentTarget;
              if (img.complete) {
                img.style.opacity = '1';
              }
            }}
          />
          {source && (
            <motion.div 
              className="event-source"
              initial={{ opacity: 0.7, y: 10 }}
              whileHover={{ opacity: 1, y: 0, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
            >
              {source}
            </motion.div>
          )}
        </motion.div>
      )}
      <motion.div 
        className="event-content"
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.h3 
          className="event-title"
          initial={{ y: 10, opacity: 0.8 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.3 }}
          whileHover={{ scale: 1.01, x: 3 }}
        >
          {title}
        </motion.h3>
        
        <motion.p 
          className="event-date"
          initial={{ y: 5, opacity: 0.8 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.4 }}
          whileHover={{ scale: 1.03 }}
        >
          {date}
        </motion.p>
        
        <AnimatePresence>
          <motion.div 
            className="event-description-container"
            initial={false}
            animate={{ 
              height: isExpanded ? 'auto' : windowWidth < 768 ? '80px' : '100px',
              opacity: isExpanded ? 1 : 0.9
            }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 20,
              height: { duration: 0.4 }
            }}
          >
            <motion.p 
              className="event-description"
              initial={{ opacity: 0.9 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {description}
            </motion.p>
          </motion.div>
        </AnimatePresence>
        
        <motion.button 
          className="read-more-btn" 
          onClick={(e) => {
            e.stopPropagation();
            toggleExpand();
          }}
          whileHover={{ 
            scale: 1.05, 
            y: -3,
            boxShadow: "0 5px 15px rgba(77, 171, 247, 0.4)"
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default EventCard;