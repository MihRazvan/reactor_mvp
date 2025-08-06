import React from 'react';
import { Trophy, Zap, RefreshCw, Target } from 'lucide-react';
import type { GameState } from '../types/game';
import './GameOverOverlay.css';

interface GameOverOverlayProps {
  gameState: GameState;
  onRestart: () => void;
}

export const GameOverOverlay: React.FC<GameOverOverlayProps> = ({ 
  gameState, 
  onRestart 
}) => {
  if (!gameState.gameEnded) {
    return null;
  }

  const getGameOverMessage = () => {
    if (gameState.wrongClickStreak >= 3) {
      return "You clicked the wrong color 3 times in a row!";
    }
    if (gameState.timeRemaining <= 0) {
      return "Time's up! The reactor needs constant energy!";
    }
    return "Game Over!";
  };

  const getPerformanceRating = () => {
    const score = gameState.finalScore;
    if (score >= 100) return { rating: "LEGENDARY", color: "#FFD700", icon: "🌟" };
    if (score >= 50) return { rating: "EXCELLENT", color: "#4ecdc4", icon: "⭐" };
    if (score >= 25) return { rating: "GOOD", color: "#4a9eff", icon: "✨" };
    if (score >= 10) return { rating: "NOVICE", color: "#ff6b6b", icon: "🎯" };
    return { rating: "BEGINNER", color: "#cccccc", icon: "🌱" };
  };

  const performance = getPerformanceRating();

  return (
    <div className="game-over-overlay">
      <div className="game-over-modal">
        {/* Header */}
        <div className="game-over-header">
          <Trophy size={48} color="#FFD700" />
          <h1>Game Over</h1>
        </div>

        {/* Score Display */}
        <div className="score-section">
          <div className="final-score">
            <span className="score-label">Final Score</span>
            <span className="score-value">{gameState.finalScore}</span>
            <span className="score-unit">Energy Points</span>
          </div>
          
          {/* Performance Rating */}
          <div className="performance-rating" style={{ color: performance.color }}>
            <span className="rating-icon">{performance.icon}</span>
            <span className="rating-text">{performance.rating}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-section">
          <div className="stat-item">
            <Zap size={20} color="#4a9eff" />
            <span>Total Clicks: {gameState.totalClicks}</span>
          </div>
          <div className="stat-item">
            <Target size={20} color="#4ecdc4" />
            <span>π² Stage Reached: {gameState.currentPiStage}</span>
          </div>
          <div className="stat-item">
            <RefreshCw size={20} color="#ff6b6b" />
            <span>Wrong Clicks: {gameState.wrongClickStreak}/3</span>
          </div>
        </div>

        {/* Game Over Message */}
        <div className="game-over-message">
          {getGameOverMessage()}
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button 
            className="restart-button primary"
            onClick={onRestart}
          >
            <RefreshCw size={20} />
            Play Again
          </button>
          
          <div className="motivation-text">
            Help the Pi² community reach higher TPS!
          </div>
        </div>

        {/* Background Effects */}
        <div className="overlay-effects">
          <div className="energy-particles"></div>
          <div className="core-glow"></div>
        </div>
      </div>
    </div>
  );
}; 