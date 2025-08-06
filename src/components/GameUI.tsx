import React from 'react';
import type { GameState } from '../types/game';
import { PI_STAGES } from '../utils/gameConfig';
import './GameUI.css';

interface GameUIProps {
  gameState: GameState;
  currentPiStage: any;
  onRestart: () => void;
  onStart: () => void;
}

export const GameUI: React.FC<GameUIProps> = ({
  gameState,
  currentPiStage,
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
      {/* π² Progress Panel */}
      <div className="info-panel">
        <h3 style={{ color: '#4a9eff', marginBottom: '10px' }}>π² Progress</h3>
        <div className="pi-display">π² = {gameState.currentPiStage}</div>
        <div className="stage-info">Stage: {currentPiStage.description}</div>
      </div>
      
      {/* Energy Status Panel */}
      <div className="info-panel">
        <h3 style={{ color: '#4a9eff', marginBottom: '10px' }}>Energy Status</h3>
        <div className="energy-counter">
          Energy: {gameState.currentEnergy} / {currentPiStage.energyRequired}
        </div>
        <div className="energy-bar">
          <div 
            className="energy-fill"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          ></div>
        </div>
        {gameState.gameStarted && (
          <div className="timer-display">
            Time: {formatTimer(gameState.timeRemaining)}s
          </div>
        )}
        {gameState.wrongClickStreak > 0 && (
          <div className="wrong-clicks">
            Wrong clicks: {gameState.wrongClickStreak}/3
          </div>
        )}
      </div>
    </div>
  );
}; 