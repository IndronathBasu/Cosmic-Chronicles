import axios from 'axios';
import { OPENAI_API_KEY, OPENAI_API_ENDPOINT, CHAT_CONFIG } from './config';

// Interface for chat message
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

/**
 * Sends a message to the OpenAI API and returns the response
 * @param messages - Array of previous messages for context
 * @returns Promise with the AI response
 */
export const sendMessageToOpenAI = async (messages: ChatMessage[]): Promise<string> => {
  try {
    // Add a system message if it doesn't exist
    if (!messages.some(msg => msg.role === 'system')) {
      messages = [
        {
          role: 'system',
          content: CHAT_CONFIG.system_message
        },
        ...messages
      ];
    }

    const response = await axios.post(
      OPENAI_API_ENDPOINT,
      {
        model: CHAT_CONFIG.model,
        messages: messages,
        max_tokens: CHAT_CONFIG.max_tokens,
        temperature: CHAT_CONFIG.temperature,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    if (axios.isAxiosError(error) && error.response) {
      console.error('API response error:', error.response.data);
      throw new Error(`API error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
    }
    throw new Error('Failed to get response from AI service');
  }
};

/**
 * Alternative implementation using a mock service for testing or development
 * @param userMessage - The message from the user
 * @returns Promise with a simulated AI response
 */
export const sendMessageToMockService = async (userMessage: string): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const spaceKeywords = ['planet', 'star', 'galaxy', 'universe', 'space', 'nasa', 'astronaut', 
                         'rocket', 'moon', 'mars', 'jupiter', 'saturn', 'telescope', 'cosmos', 
                         'astronomy', 'orbit', 'satellite', 'comet', 'asteroid', 'black hole'];
  
  const generalResponses = [
    "The universe is approximately 13.8 billion years old.",
    "There are more stars in the universe than grains of sand on all of Earth's beaches.",
    "A day on Venus is longer than a year on Venus.",
    "The largest known star, UY Scuti, is about 1,700 times larger than our Sun.",
    "Black holes don't actually suck things in like a vacuum cleaner.",
    "The Milky Way galaxy is on a collision course with the Andromeda galaxy.",
    "Saturn's rings are mostly made of ice and rock.",
    "The Great Red Spot on Jupiter is a storm that has been raging for at least 400 years.",
    "Light from the Sun takes about 8 minutes to reach Earth.",
    "There could be billions of Earth-like planets in our galaxy alone."
  ];
  
  const specificResponses: Record<string, string[]> = {
    'planet': [
      "There are eight recognized planets in our solar system.",
      "Jupiter is the largest planet in our solar system.",
      "Mercury is the closest planet to the Sun and has extreme temperature variations."
    ],
    'star': [
      "Stars are massive balls of plasma held together by gravity.",
      "Our Sun is a G-type main-sequence star (G2V) and is about 4.6 billion years old.",
      "Betelgeuse is a red supergiant star that could go supernova soon (in astronomical terms)."
    ],
    'moon': [
      "Earth's Moon is the fifth largest moon in the solar system.",
      "The Moon is gradually moving away from Earth at a rate of about 3.8 cm per year.",
      "The dark areas on the Moon are called 'maria' or seas, though they contain no water."
    ]
  };
  
  // Check if the user message contains any space keywords
  const matchedKeywords = spaceKeywords.filter(keyword => 
    userMessage.toLowerCase().includes(keyword.toLowerCase())
  );
  
  if (matchedKeywords.length > 0) {
    // Use the first matched keyword to find a specific response
    const keyword = matchedKeywords[0];
    const responses = specificResponses[keyword] || generalResponses;
    return responses[Math.floor(Math.random() * responses.length)];
  } else {
    // If no keywords match, use a general response
    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  }
};