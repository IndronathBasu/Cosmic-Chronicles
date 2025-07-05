import React, { useState, useEffect, useRef } from 'react';
import '../styles/calendar-theme.css';

// Add a custom hook for responsive behavior
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

interface CosmicCalendarProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  maxDate?: string;
}

const CosmicCalendar: React.FC<CosmicCalendarProps> = ({ 
  selectedDate, 
  onDateChange,
  maxDate = new Date().toISOString().split('T')[0]
}) => {
  const [visible, setVisible] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(selectedDate));
  const calendarRef = useRef<HTMLDivElement>(null);
  
  // Parse the selected date
  const selectedDateObj = new Date(selectedDate);
  
  // Create stars for the background
  const stars = Array.from({ length: 20 }, (_, i) => {
    const size = Math.random() * 2 + 1;
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const duration = Math.random() * 3 + 2;
    
    return {
      id: i,
      style: {
        width: `${size}px`,
        height: `${size}px`,
        top: `${top}%`,
        left: `${left}%`,
        '--duration': `${duration}s`,
      } as React.CSSProperties,
    };
  });

  // Handle click outside to close calendar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Get day of week for first day of month (0 = Sunday, 6 = Saturday)
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  // Navigate to next month
  const nextMonth = () => {
    const nextMonthDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    const maxDateObj = new Date(maxDate);
    
    // Only allow navigation to next month if it doesn't exceed maxDate
    if (nextMonthDate <= maxDateObj) {
      setCurrentMonth(nextMonthDate);
    }
  };

  // Select a date
  const selectDate = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const maxDateObj = new Date(maxDate);
    
    // Only allow selection if date doesn't exceed maxDate
    if (newDate <= maxDateObj) {
      onDateChange(newDate.toISOString().split('T')[0]);
      setVisible(false);
    }
  };

  // Go to today
  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    onDateChange(today.toISOString().split('T')[0]);
  };

  // Clear selection
  const clearSelection = () => {
    // Reset to today's date but don't select it
    setCurrentMonth(new Date());
    setVisible(false);
  };

  // Format month and year for display
  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // Check if a date is today
  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  // Check if a date is selected
  const isSelected = (day: number) => {
    return (
      day === selectedDateObj.getDate() &&
      currentMonth.getMonth() === selectedDateObj.getMonth() &&
      currentMonth.getFullYear() === selectedDateObj.getFullYear()
    );
  };

  // Generate calendar days
  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="day empty"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const maxDateObj = new Date(maxDate);
      const isDisabled = date > maxDateObj;
      
      days.push(
        <div
          key={`day-${day}`}
          className={`day ${isToday(day) ? 'today' : ''} ${isSelected(day) ? 'selected' : ''} ${isDisabled ? 'empty' : ''}`}
          onClick={() => !isDisabled && selectDate(day)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <>
      <div className="date-display" onClick={() => setVisible(!visible)}>
        {selectedDate.split('-').reverse().join('/')} {/* Format as DD/MM/YYYY */}
      </div>
      
      <div ref={calendarRef} className={`cosmic-calendar ${visible ? 'visible' : ''}`}>
        <div className="calendar-stars">
          {stars.map(star => (
            <div key={star.id} className="star" style={star.style}></div>
          ))}
        </div>
        
        <div className="calendar-header">
          <div className="month-year">{formatMonthYear(currentMonth)}</div>
          <div className="nav-buttons">
            <button className="nav-btn" onClick={prevMonth}>❮</button>
            <button 
              className="nav-btn" 
              onClick={nextMonth}
              disabled={new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1) > new Date(maxDate)}
            >❯</button>
          </div>
        </div>
        
        <div className="weekdays">
          <div className="weekday">Su</div>
          <div className="weekday">Mo</div>
          <div className="weekday">Tu</div>
          <div className="weekday">We</div>
          <div className="weekday">Th</div>
          <div className="weekday">Fr</div>
          <div className="weekday">Sa</div>
        </div>
        
        <div className="days">
          {renderCalendarDays()}
        </div>
        
        <div className="calendar-footer">
          <button className="calendar-btn" onClick={clearSelection}>Clear</button>
          <button className="calendar-btn today-btn" onClick={goToToday}>Today</button>
        </div>
      </div>
    </>
  );
};

export default CosmicCalendar;