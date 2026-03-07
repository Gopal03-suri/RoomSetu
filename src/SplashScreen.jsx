import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SplashScreen.css';

const SplashScreen = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Start fade out after 5.5 seconds
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 5500);

    // Navigate to landing page after 6 seconds
    const navigateTimer = setTimeout(() => {
      setIsVisible(false);
      navigate('/landing');
    }, 6000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navigateTimer);
    };
  }, [navigate]);

  if (!isVisible) return null;

  return (
    <div className={`splash-container ${isFadingOut ? 'splash-fade-out' : ''}`}>
      {/* House SVG */}
      <div className="house-container">
        <svg className="house-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* House outline */}
          <path 
            className="house-path house-outline" 
            d="M50 15 L15 45 L15 85 L85 85 L85 45 Z" 
          />
          {/* Roof */}
          <path 
            className="house-path house-outline" 
            d="M10 50 L50 15 L90 50" 
          />
          {/* Door */}
          <path 
            className="house-path house-outline" 
            d="M42 85 L42 60 L58 60 L58 85" 
            style={{ animationDelay: '0.8s' }}
          />
          {/* Window left */}
          <rect 
            x="25" y="50" 
            width="12" height="12" 
            rx="1"
            className="house-path house-outline"
            style={{ animationDelay: '1s' }}
          />
          {/* Window right */}
          <rect 
            x="63" y="50" 
            width="12" height="12" 
            rx="1"
            className="house-path house-outline"
            style={{ animationDelay: '1.1s' }}
          />
          {/* Chimney */}
          <rect 
            x="70" y="25" 
            width="10" height="15" 
            rx="1"
            className="house-path house-outline"
            style={{ animationDelay: '0.9s' }}
          />
        </svg>

        {/* Left Pin */}
        <div className="pin pin-left">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#3b82f6"/>
            <circle cx="12" cy="9" r="2.5" fill="white"/>
          </svg>
        </div>

        {/* Right Pin */}
        <div className="pin pin-right">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#3b82f6"/>
            <circle cx="12" cy="9" r="2.5" fill="white"/>
          </svg>
        </div>

        {/* Connection Line */}
        <div className="connection-line"></div>
      </div>

      {/* Brand Name */}
      <h1 className="brand-name">
        Room<span>Setu</span>
      </h1>

      {/* Tagline */}
      <p className="tagline">
        Smart Roommate & Rental Matching
      </p>

      {/* Loading Dots */}
      <div className="loading-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default SplashScreen;
