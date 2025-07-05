# Astro Events App

Welcome to the Astro Events App! This project is designed to present real astronomical events that occurred on the current date in history. It features a responsive design, interactive components, and educational storytelling to engage users with the wonders of astronomy.

# Astro Events App

Astro Events App is an interactive web application that showcases astronomical events throughout history. With a beautiful galaxy-themed interface, users can explore significant space missions, discoveries, milestones, and NASA's Astronomy Picture of the Day.

## Features

- **Real-Time Events**: Displays astronomical events that happened on the current date throughout history, sourced from NASA APIs and a curated database.
- **Interactive Components**: Users can explore individual events through animated, interactive cards with detailed information and media.
- **Educational Storytelling**: Combines factual information with engaging narratives to enhance user understanding of astronomical events.
- **Responsive Design**: The application is designed to work seamlessly on various devices (mobile, tablet, desktop) in both portrait and landscape orientations.
- **Cosmic Calendar**: Interactive calendar that allows users to select different dates and view astronomical events from those dates.
- **Dual Chatbot Integration**: 
  - **Astrobot**: A custom AI assistant specializing in astronomy and space topics, providing educational information.
  - **Botpress Integration**: External chatbot service for additional user support and interaction.

## Project Structure

```
astro-events-app
├── public
│   └── index.html          # Main HTML document
├── src
│   ├── components          # React components
│   │   ├── Astrobot.tsx    # Custom AI chatbot component
│   │   ├── BotpressChat.tsx # Botpress integration component
│   │   ├── CosmicCalendar.tsx # Interactive calendar component
│   │   ├── EventCard.tsx   # Component for displaying individual events
│   │   ├── EventList.tsx   # Component for listing events
│   │   └── Storytelling.tsx # Component for storytelling context
│   ├── services            # Service layer
│   ├── styles              # CSS styles
│   │   ├── astrobot.css    # Styles for Astrobot component
│   │   ├── botpress-chat.css # Styles for Botpress chat
│   │   ├── calendar-theme.css # Styles for cosmic calendar
│   │   ├── main.css        # Main stylesheet
│   │   └── starry-background.css # Galaxy theme background styles
│   ├── utils               # Utility functions
│   │   ├── chatService.ts  # Service for AI chat functionality
│   │   ├── config.ts       # Configuration settings
│   │   └── fetchEvents.ts  # Functions for fetching event data
│   ├── App.tsx             # Main application component
│   └── index.tsx           # Entry point for the application
├── BOTPRESS_SETUP.md       # Guide for setting up Botpress integration
└── package.json            # Project dependencies and scripts
```

## Technologies Used

- **React**: Frontend library for building the user interface
- **TypeScript**: For type-safe JavaScript code
- **Framer Motion**: For smooth animations and transitions
- **React Scroll Parallax**: For parallax scrolling effects
- **Axios**: For API requests to NASA's APOD API
- **date-fns**: For date formatting and manipulation
- **Botpress**: For chatbot integration

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/astro-events-app.git
   cd astro-events-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure API keys (optional):
   - Get a NASA API key from [https://api.nasa.gov/](https://api.nasa.gov/)
   - Update the `NASA_API_KEY` in `src/utils/fetchEvents.ts`
   - For Botpress integration, follow the instructions in `BOTPRESS_SETUP.md`
   - For OpenAI integration (Astrobot), add your API key to `src/utils/config.ts`

4. Start the development server:
   ```bash
   npm start
   ```

## Usage

1. **Exploring Events**: When the application loads, you'll see astronomical events that occurred on the current date in history. Click on any event card to expand it and learn more about the event, including its significance and related media.

2. **Using the Calendar**: Click on the calendar icon to open the Cosmic Calendar. Select any date to view astronomical events from that date in history.

3. **Chatbot Assistance**:
   - **Astrobot**: Click on the Astrobot icon in the bottom right corner to chat with the custom AI assistant about astronomy and space topics.
   - **Botpress Chat**: If configured, the Botpress chatbot provides additional support and information.

4. **Responsive Design**: The application adapts to different screen sizes and orientations, providing an optimal experience on desktop, tablet, and mobile devices.

## Contributing

Contributions are welcome! Here's how you can contribute to the Astro Events App:

1. **Fork the repository**
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit your changes**:
   ```bash
   git commit -m 'Add some feature'
   ```
4. **Push to the branch**:
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open a Pull Request**

### Contribution Ideas

- Add more predefined astronomical events to the database
- Improve the UI/UX design
- Add new interactive features
- Enhance the chatbot functionality
- Improve accessibility
- Add unit tests

## Data Sources

The Astro Events App uses the following data sources:

1. **NASA Astronomy Picture of the Day (APOD) API**: Provides daily astronomy images and explanations.
   - API Documentation: [https://api.nasa.gov/](https://api.nasa.gov/)

2. **Predefined Events Database**: A curated collection of significant astronomical events throughout history, including:
   - Space missions (e.g., Mars Rover landings, James Webb Space Telescope launch)
   - Astronomical discoveries (e.g., Pluto's discovery)
   - Space exploration milestones (e.g., Moon landing, first human in space)
   - Space-related incidents (e.g., Columbia disaster)

## Future Enhancements

Planned features for future releases:

- Integration with additional NASA APIs (NEO, Mars Rover photos)
- User accounts to save favorite events
- Social sharing functionality
- Advanced filtering options for events
- Interactive 3D models of celestial bodies
- Educational quizzes about astronomy
- Dark/light theme toggle

## Team

This project is Created By Team Lunar Logic, SRM(Ktr)

Team Members:

- Indronath Basu
- Lasya Srivastava 
- Suhani Guleria
