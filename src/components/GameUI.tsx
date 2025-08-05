import React from 'react';
import type { GameState } from '../types/game';
import { PI_STAGES } from '../utils/gameConfig';
import './GameUI.css';

interface GameUIProps {
  gameState: GameState;
  currentPiStage: any;
  onRestart: () => void;
}

export const GameUI: React.FC<GameUIProps> = ({
  gameState,
  currentPiStage,
  onRestart,
}) => {
  const getNextStage = () => {
    const currentIndex = PI_STAGES.findIndex(stage => stage.stage === gameState.currentPiStage);
    return currentIndex < PI_STAGES.length - 1 ? PI_STAGES[currentIndex + 1] : null;
  };

  const nextStage = getNextStage();
  const progressPercentage = nextStage 
    ? (gameState.currentEnergy / currentPiStage.energyRequired) * 100 
    : 100;

  // Format timer display
  const formatTimer = (timeRemaining: number) => {
    return (timeRemaining / 1000).toFixed(1);
  };

  return (
    <div className="game-ui">
      {/* π Progress Panel */}
      <div className="info-panel">
        <h3 style={{ color: '#4a9eff', marginBottom: '15px' }}>π Progress</h3>
        <div className="pi-display">π = {gameState.currentPiStage}</div>
        <div className="stage-info">Stage: {currentPiStage.description}</div>
      </div>
      
      {/* Energy Status Panel */}
      <div className="info-panel">
        <h3 style={{ color: '#4a9eff', marginBottom: '15px' }}>Energy Status</h3>
        <div className="energy-counter">
          Energy: {gameState.currentEnergy} / {currentPiStage.energyRequired}
        </div>
        <div className="energy-bar">
          <div 
            className="energy-fill"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          ></div>
        </div>
        <div className="timer-display">
          Time: {formatTimer(gameState.timeRemaining)}s
        </div>
        {gameState.wrongClickStreak > 0 && (
          <div className="wrong-clicks">
            Wrong clicks: {gameState.wrongClickStreak}/3
          </div>
        )}
      </div>

      {/* Game Over Panel */}
      {gameState.gameEnded && (
        <div className="info-panel game-over-panel">
          <h3 style={{ color: '#ff4757', marginBottom: '15px' }}>Game Over!</h3>
          <div className="final-score">
            Final Score: {gameState.finalScore} Energy Points
          </div>
          <div className="game-over-message">
            You clicked the wrong color 3 times in a row!
          </div>
        </div>
      )}

      {/* Controls Panel */}
      <div className="info-panel">
        <h3 style={{ color: '#4a9eff', marginBottom: '15px' }}>Controls</h3>
        <div className="controls">
          <button 
            className="restart-button"
            onClick={onRestart}
          >
            {gameState.gameEnded ? 'Play Again' : 'Instant Restart'}
          </button>
        </div>
        <div style={{ marginTop: '15px', fontSize: '14px', color: '#ccc' }}>
          {gameState.gameEnded 
            ? 'Click "Play Again" to start a new game!'
            : 'Click the correct colored ring to generate energy!'
          }
        </div>
      </div>
    </div>
  );
}; 