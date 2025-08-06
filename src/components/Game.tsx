import React from 'react';
import { Reactor } from './Reactor';
import { TPSDashboard } from './TPSDashboard';
import { GameOverOverlay } from './GameOverOverlay';
import { Countdown } from './Countdown';
import { CommunityPanel } from './CommunityPanel';
import { useGameState } from '../hooks/useGameState';
import { PI_STAGES } from '../utils/gameConfig';
import './Game.css';

export const Game: React.FC = () => {
  const {
    gameState,
    reactorRings,
    clickResult,
    handleRingClick,
    restartGame,
    startGame,
    getCurrentPiStage,
  } = useGameState();

  const currentPiStage = getCurrentPiStage();
  
  // Calculate progress percentage
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
    <div className="game-container">
      {/* Start Button - Only show when game hasn't started */}
      {!gameState.gameStarted && (
        <div className="start-button-container">
          <button 
            className="compact-start-button"
            onClick={startGame}
          >
            Start Game
          </button>
        </div>
      )}

      {/* Main Game Layout */}
      <div className="game-layout">
        {/* Left side - Game Area */}
        <div className="game-area">
          {/* Reactor Section (Main Hero) */}
          <div className="reactor-section">
            <Reactor
              rings={reactorRings}
              targetColor={gameState.targetColor}
              clickResult={clickResult}
              onRingClick={handleRingClick}
              gameState={gameState}
            />
          </div>
          
          {/* π² Progress Panel (Left Side) */}
          <div className="progress-panel">
            <div className="info-panel">
              <h3 style={{ color: '#4a9eff', marginBottom: '10px' }}>π² Progress</h3>
              <div className="pi-display">π² = {gameState.currentPiStage}</div>
              <div className="stage-info">Stage: {currentPiStage.description}</div>
            </div>
          </div>
        </div>

        {/* Right side - TPS Dashboard + Energy Status */}
        <div className="tps-dashboard-section">
          <TPSDashboard gameState={gameState} />
          <div className="info-panel energy-status-panel">
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
      </div>

      {/* Community Panel - Below the game */}
      <CommunityPanel gameState={gameState} />

      {/* Background effects */}
      <div className="background-effects">
        <div className="energy-particles"></div>
        <div className="core-glow"></div>
      </div>

      {/* Countdown */}
      <Countdown countdown={gameState.countdown} />

      {/* Game Over Overlay */}
      <GameOverOverlay 
        gameState={gameState}
        onRestart={restartGame}
      />
    </div>
  );
}; 