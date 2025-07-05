/**
 * Configuration file for API keys and settings
 * 
 * IMPORTANT: In a production environment, these values should be stored in environment variables
 * and not committed to version control. For a React application, you would typically use
 * environment variables prefixed with REACT_APP_
 */

// API Keys
export const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY || 'your-api-key-here';

// Feature flags
export const USE_MOCK_SERVICE = true; // Set to false to use the real OpenAI API

// API endpoints
export const OPENAI_API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';

// Chat configuration
export const CHAT_CONFIG = {
  model: 'gpt-3.5-turbo',
  max_tokens: 150,
  temperature: 0.7,
  system_message: 'You are Astrobot, a helpful assistant specializing in astronomy and space. ' +
                 'Provide concise, accurate information about celestial bodies, space exploration, ' +
                 'astronomical events, and cosmic phenomena. Your responses should be educational ' +
                 'and engaging, suitable for space enthusiasts of all ages.'
};