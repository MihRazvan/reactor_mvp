import React from 'react';
import './Countdown.css';

interface CountdownProps {
  countdown: number;
}

export const Countdown: React.FC<CountdownProps> = ({ countdown }) => {
  if (countdown === 0) return null;

  const getCountdownText = () => {
    if (countdown === 1) return 'GO!';
    return countdown.toString();
  };

  const getCountdownColor = () => {
    if (countdown === 1) return '#4ecdc4'; // Green for GO!
    if (countdown === 2) return '#ff6b6b'; // Red for 2
    return '#4a9eff'; // Blue for 3
  };

  return (
    <div className="countdown-overlay">
      <div className="countdown-display">
        <div 
          className="countdown-number"
          style={{ color: getCountdownColor() }}
        >
          {getCountdownText()}
        </div>
        <div className="countdown-label">
          {countdown === 1 ? 'Get Ready!' : 'Starting in...'}
        </div>
      </div>
    </div>
  );
}; 