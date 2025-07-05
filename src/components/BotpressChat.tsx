import React, { useState, useEffect } from 'react';
import { Webchat } from "@botpress/webchat";
import '../styles/botpress-chat.css';

// Replace with your actual client ID from Botpress
// You'll need to create a bot in Botpress and get the client ID
const clientId = "0f6d1f28-97bf-4f7f-80c0-8abb35d5a0a8";

const BotpressChat: React.FC = () => {
  const [isWebchatOpen, setIsWebchatOpen] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Use useEffect to handle client-side rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const toggleWebchat = () => {
    // Start rotation animation
    setIsRotating(true);
    
    // After rotation completes, toggle the chatbot visibility
    setTimeout(() => {
      setIsWebchatOpen(!isWebchatOpen);
      setIsRotating(false);
    }, 500); // Match this with the CSS animation duration
  };
  
  // Don't render anything on the server side
  if (!isMounted) {
    return null;
  }
  
  return (
    <div className="botpress-container">
      {/* Custom button with Astrobot styling */}
      <button 
        className={`astrobot-button ${isRotating ? 'rotating' : ''}`}
        onClick={toggleWebchat}
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
      
      {/* Botpress Webchat */}
      {isWebchatOpen && (
        <div
          className="botpress-webchat-container"
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "350px",
            height: "500px",
            zIndex: 1000,
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)"
          }}
        >
          <Webchat 
            clientId={clientId}
            style={{ width: '100%', height: '100%', borderRadius: '10px' }}
          />
        </div>
      )}
    </div>
  );
};

export default BotpressChat;

