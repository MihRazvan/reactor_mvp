import React from 'react';
import { Reactor } from './Reactor';
import { GameUI } from './GameUI';
import { useGameState } from '../hooks/useGameState';
import './Game.css';

export const Game: React.FC = () => {
  const {
    gameState,
    reactorRings,
    clickResult,
    handleRingClick,
    restartGame,
    getCurrentPiStage,
  } = useGameState();

  const currentPiStage = getCurrentPiStage();

  return (
    <div className="game-container">
      <div className="game-layout">
        {/* Left side - Game UI */}
        <div className="game-ui-section">
          <GameUI
            gameState={gameState}
            currentPiStage={currentPiStage}
            onRestart={restartGame}
          />
        </div>

        {/* Right side - Reactor */}
        <div className="reactor-section">
          <Reactor
            rings={reactorRings}
            targetColor={gameState.targetColor}
            clickResult={clickResult}
            onRingClick={handleRingClick}
            gameState={gameState}
          />
        </div>
      </div>

      {/* Background effects */}
      <div className="background-effects">
        <div className="energy-particles"></div>
        <div className="core-glow"></div>
      </div>
    </div>
  );
}; 