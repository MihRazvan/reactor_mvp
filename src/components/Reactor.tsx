import React from 'react';
import type { ReactorRing, ClickResult, GameState } from '../types/game';
import './Reactor.css';

interface ReactorProps {
  rings: ReactorRing[];
  targetColor: string;
  clickResult: ClickResult | null;
  onRingClick: (ringId: number) => void;
  gameState?: GameState;
}

export const Reactor: React.FC<ReactorProps> = ({
  rings,
  targetColor,
  clickResult,
  onRingClick,
  gameState,
}) => {
  const handleRingClick = (ringId: number) => {
    onRingClick(ringId);
  };

  const getGameStatusMessage = () => {
    if (gameState?.gameEnded) {
      return 'Game Over! Click "Play Again" to restart!';
    }
    if (gameState?.wrongClickStreak && gameState.wrongClickStreak > 0) {
      return `Wrong clicks: ${gameState.wrongClickStreak}/3 - Be careful!`;
    }
    return 'Click the correct colored ring to generate energy!';
  };

  return (
    <div className="reactor-container">
      <div className="target-indicator">
        <div className="target-label">Target Ring Color:</div>
        <div 
          className="target-color"
          style={{ backgroundColor: targetColor }}
        ></div>
      </div>

      <div className="reactor">
        {rings.map((ring) => (
          <div
            key={ring.id}
            className={`reactor-ring ring-${ring.id + 1} ${
              clickResult?.visualEffect === 'pulse' && ring.color === targetColor
                ? 'pulse-effect'
                : clickResult?.visualEffect === 'flash' && ring.color !== targetColor
                ? 'wrong-click'
                : ''
            }`}
            style={{
              borderColor: ring.color,
            }}
            data-ring={ring.id + 1}
            data-color-index={ring.id}
            onClick={() => handleRingClick(ring.id)}
          />
        ))}
        <div className="reactor-core"></div>
      </div>

      <div className="game-status">
        {getGameStatusMessage()}
      </div>
    </div>
  );
}; 