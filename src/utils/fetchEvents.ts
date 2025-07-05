import axios from 'axios';
import { format } from 'date-fns';

// NASA API key - replace with your own from https://api.nasa.gov/
const NASA_API_KEY = 'DEMO_KEY';
const NASA_APOD_API = 'https://api.nasa.gov/planetary/apod';

// Historical events API - commented out as currently unused
// const HISTORICAL_EVENTS_API = 'https://api.api-ninjas.com/v1/historicalevents';

// API Ninjas key - you would need to sign up at https://api-ninjas.com/
// const API_NINJAS_KEY = '';

// Predefined astronomical events for specific dates in history
const predefinedEvents: { [key: string]: AstronomicalEvent[] } = {
  '01-01': [
    {
      title: 'NASA Mars Rover Spirit Lands on Mars',
      date: 'January 1, 2004',
      description: 'The Mars Exploration Rover Spirit successfully landed on Mars, beginning its mission to search for evidence of past water activity on the Red Planet.',
      media: 'https://mars.nasa.gov/system/resources/detail_files/3700_PIA04413-full2.jpg',
      type: 'mission'
    }
  ],
  '02-01': [
    {
      title: 'Columbia Space Shuttle Disaster',
      date: 'February 1, 2003',
      description: 'The Space Shuttle Columbia disintegrated upon re-entry into Earth\'s atmosphere, killing all seven crew members. The disaster led to significant changes in NASA\'s safety protocols.',
      media: 'https://www.nasa.gov/wp-content/uploads/static/history/shuttle/sts-107/images/high/sts107-s-002.jpg',
      type: 'disaster'
    }
  ],
  '02-18': [
    {
      title: 'Pluto Discovered by Clyde Tombaugh',
      date: 'February 18, 1930',
      description: 'Astronomer Clyde Tombaugh discovered Pluto at the Lowell Observatory. Pluto was considered the ninth planet of our solar system until 2006, when it was reclassified as a dwarf planet.',
      media: 'https://solarsystem.nasa.gov/system/resources/detail_files/933_BIG_P_COLOR_2_TRUE_COLOR1_1980.jpg',
      type: 'discovery'
    }
  ],
  '04-12': [
    {
      title: 'First Human in Space',
      date: 'April 12, 1961',
      description: 'Yuri Gagarin became the first human to journey into outer space when his Vostok spacecraft completed an orbit of Earth.',
      media: 'https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/AS11-40-5903HR.jpg',
      type: 'milestone'
    }
  ],
  '07-20': [
    {
      title: 'Apollo 11 Moon Landing',
      date: 'July 20, 1969',
      description: 'Neil Armstrong and Buzz Aldrin became the first humans to walk on the Moon. Armstrong\'s first step onto the lunar surface was broadcast on live TV to a worldwide audience.',
      media: 'https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/AS11-40-5903HR.jpg',
      type: 'milestone'
    }
  ],
  '11-02': [
    {
      title: 'International Space Station Inhabited',
      date: 'November 2, 2000',
      description: 'The first resident crew arrived at the International Space Station. The ISS has been continuously occupied ever since, marking the longest continuous human presence in low Earth orbit.',
      media: 'https://www.nasa.gov/wp-content/uploads/static/history/shuttle/sts-132/images/high/sts132-s-001.jpg',
      type: 'milestone'
    }
  ],
  '12-14': [
    {
      title: 'Gene Cernan, Last Person to Walk on the Moon',
      date: 'December 14, 1972',
      description: 'Apollo 17 astronaut Gene Cernan became the last human to walk on the Moon. As he left the lunar surface, he stated: "We leave as we came and, God willing, as we shall return, with peace, and hope for all mankind."',
      media: 'https://www.nasa.gov/wp-content/uploads/static/history/alsj/a17/AS17-134-20384HR.jpg',
      type: 'milestone'
    }
  ],
  '12-25': [
    {
      title: 'James Webb Space Telescope Launch',
      date: 'December 25, 2021',
      description: 'The James Webb Space Telescope, the largest and most powerful space telescope ever built, was launched. It is designed to observe the most distant objects in the universe.',
      media: 'https://www.nasa.gov/wp-content/uploads/2023/03/webb-first-deepfield-smacs0723-5mb.jpg',
      type: 'mission'
    }
  ]
};

// Interface for event data
export interface AstronomicalEvent {
  title: string;
  date: string;
  description: string;
  media: string;
  type?: string;
  source?: string;
}

/**
 * Fetches astronomical events that occurred on the specified date in history
 * @param date Optional date string in 'YYYY-MM-DD' format. If not provided, uses current date.
 * @returns Promise resolving to an array of astronomical events
 */
export const fetchEvents = async (date?: string): Promise<AstronomicalEvent[]> => {
  try {
    // If no date provided, use current date
    const currentDate = date ? new Date(date) : new Date();
    const monthDay = format(currentDate, 'MM-dd');
    const fullDateFormat = format(currentDate, 'yyyy-MM-dd');
    
    // Check if we have predefined events for this date
    const events: AstronomicalEvent[] = [];
    
    if (predefinedEvents[monthDay]) {
      events.push(...predefinedEvents[monthDay]);
    }
    
    // Try to fetch Astronomy Picture of the Day
    try {
      const apodResponse = await axios.get(`${NASA_APOD_API}?api_key=${NASA_API_KEY}&date=${fullDateFormat}`);
      if (apodResponse.data) {
        events.push({
          title: apodResponse.data.title,
          date: `NASA Astronomy Picture of the Day for ${format(currentDate, 'MMMM d, yyyy')}`,
          description: apodResponse.data.explanation,
          media: apodResponse.data.url,
          source: 'NASA APOD',
          type: 'apod'
        });
      }
    } catch (error) {
      console.error('Failed to fetch APOD:', error);
      // Continue execution even if APOD fetch fails
    }
    
    // If we have no events yet, add a default one
    if (events.length === 0) {
      events.push({
        title: 'NASA Database Not Updated',
        date: format(currentDate, 'MMMM d'),
        description: 'Astronomical event not yet update in NASA\'s database. Search for any other day from the calendar. Or wait till 1:30 PM',
        media: 'https://apod.nasa.gov/apod/image/2011/OrionNebula_HubbleSerrano_3000.jpg',
        type: 'default'
      });
    }
    
    return events;
  } catch (error) {
    console.error('Error fetching astronomical events:', error);
    throw new Error('Failed to fetch astronomical events');
  }
};
