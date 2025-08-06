import React from 'react';
import { Reactor } from './Reactor';
import { GameUI } from './GameUI';
import { TPSDisplay } from './TPSDisplay';
import { GameOverOverlay } from './GameOverOverlay';
import { Countdown } from './Countdown';
import { CommunityPanel } from './CommunityPanel';
import { useGameState } from '../hooks/useGameState';
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

  return (
    <div className="game-container">
      {/* Main Game Layout */}
      <div className="game-layout">
        {/* Left side - TPS Display */}
        <div className="tps-section">
          <TPSDisplay gameState={gameState} />
        </div>

        {/* Center - Reactor */}
        <div className="reactor-section">
          <Reactor
            rings={reactorRings}
            targetColor={gameState.targetColor}
            clickResult={clickResult}
            onRingClick={handleRingClick}
            gameState={gameState}
          />
        </div>

        {/* Right side - Game Progression */}
        <div className="game-progression-section">
          <GameUI
            gameState={gameState}
            currentPiStage={currentPiStage}
            onRestart={restartGame}
            onStart={startGame}
          />
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