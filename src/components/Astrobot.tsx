import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToOpenAI, sendMessageToMockService, ChatMessage } from '../utils/chatService';
import { USE_MOCK_SERVICE, CHAT_CONFIG } from '../utils/config';
import '../styles/astrobot.css';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isLoading?: boolean;
}

const Astrobot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hello! I\'m Astrobot. How can I help you explore the cosmos today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      role: 'system',
      content: CHAT_CONFIG.system_message
    },
    {
      role: 'assistant',
      content: 'Hello! I\'m Astrobot. How can I help you explore the cosmos today?'
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const toggleChatbot = () => {
    // Start rotation animation
    setIsRotating(true);
    
    // After rotation completes, toggle the chatbot visibility
    setTimeout(() => {
      setIsOpen(!isOpen);
      setIsRotating(false);
    }, 500); // Match this with the CSS animation duration
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputText.trim() === '' || isLoading) return;
    
    // Clear any previous errors
    setError(null);
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };
    
    // Add loading message placeholder
    const loadingMessage: Message = {
      id: messages.length + 2,
      text: '...',
      sender: 'bot',
      timestamp: new Date(),
      isLoading: true
    };
    
    // Update chat history with user message
    const userChatMessage: ChatMessage = {
      role: 'user',
      content: inputText
    };
    
    const updatedChatHistory = [...chatHistory, userChatMessage];
    setChatHistory(updatedChatHistory);
    
    // Update UI
    setMessages([...messages, userMessage, loadingMessage]);
    setInputText('');
    setIsLoading(true);
    
    try {
      // Use either the mock service or the OpenAI API based on configuration
      let response: string;
      if (USE_MOCK_SERVICE) {
        response = await sendMessageToMockService(inputText);
      } else {
        response = await sendMessageToOpenAI(updatedChatHistory);
      }
      
      // Add bot response to chat history
      const botChatMessage: ChatMessage = {
        role: 'assistant',
        content: response
      };
      
      setChatHistory([...updatedChatHistory, botChatMessage]);
      
      // Replace loading message with actual response
      const botMessage: Message = {
        id: messages.length + 2,
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [
        ...prevMessages.slice(0, prevMessages.length - 1),
        botMessage
      ]);
    } catch (err) {
      console.error('Error getting bot response:', err);
      setError('Sorry, I encountered an error. Please try again later.');
      
      // Replace loading message with error
      const errorMessage: Message = {
        id: messages.length + 2,
        text: err instanceof Error ? err.message : 'An unknown error occurred',
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [
        ...prevMessages.slice(0, prevMessages.length - 1),
        errorMessage
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="astrobot-container">
      {/* Chatbot logo/button */}
      <button 
        className={`astrobot-button ${isRotating ? 'rotating' : ''}`}
        onClick={toggleChatbot}
        aria-label="Toggle Astrobot chatbot"
      >
        <div className="astrobot-icon">
          <div className="astrobot-face">
            <div className="astrobot-eyes">
              <div className="astrobot-eye"></div>
              <div className="astrobot-eye"></div>
            </div>
            <div className="astrobot-antenna"></div>
          </div>
        </div>
      </button>
      
      {/* Chatbot interface */}
      {isOpen && (
        <div className="astrobot-chat">
          <div className="astrobot-header">
            <h3>Astrobot</h3>
            <button 
              className="astrobot-close" 
              onClick={toggleChatbot}
              aria-label="Close chatbot"
            >
              &times;
            </button>
          </div>
          
          <div className="astrobot-messages">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`astrobot-message ${message.sender === 'bot' ? 'bot' : 'user'} ${message.isLoading ? 'loading' : ''}`}
              >
                {message.isLoading ? (
                  <div className="message-loading">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                ) : (
                  <div className="message-content">{message.text}</div>
                )}
                <div className="message-timestamp">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
            {error && (
              <div className="astrobot-error">{error}</div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <form className="astrobot-input" onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask me about space..."
              aria-label="Message input"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              aria-label="Send message"
              disabled={isLoading || inputText.trim() === ''}
              className={isLoading ? 'loading' : ''}
            >
              {isLoading ? (
                <div className="button-spinner"></div>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path fill="none" d="M0 0h24v24H0z"/>
                  <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="currentColor"/>
                </svg>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Astrobot;