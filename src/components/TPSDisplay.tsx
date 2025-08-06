import React from 'react';
import { Zap, Users, Target } from 'lucide-react';
import type { GameState } from '../types/game';
import './TPSDisplay.css';

interface TPSDisplayProps {
  gameState: GameState;
}

export const TPSDisplay: React.FC<TPSDisplayProps> = ({ gameState }) => {
  // Simulate network TPS and community data
  const networkTPS = Math.floor(gameState.individualTPS * 1.5 + Math.random() * 10);
  const activePlayers = Math.floor(50 + Math.random() * 100);
  const networkGoal = 1000;
  const totalPlayers = 1247; // Simulated total registered players
  const peakTPS = 2347; // Simulated peak TPS
  
  return (
    <div className="tps-display">
      {/* Individual TPS */}
      <div className="tps-panel individual-tps">
        <div className="tps-header">
          <Zap size={20} color="#4a9eff" />
          <span>Your TPS</span>
        </div>
        <div className="tps-value">
          {gameState.individualTPS.toFixed(1)}
        </div>
        <div className="tps-label">transactions/sec</div>
        <div className="tps-stats">
          <div>Total Clicks: {gameState.totalClicks}</div>
          <div>Session Time: {Math.floor((Date.now() - gameState.sessionStartTime) / 1000)}s</div>
        </div>
      </div>

      {/* Network TPS */}
      <div className="tps-panel network-tps">
        <div className="tps-header">
          <Users size={20} color="#4ecdc4" />
          <span>Network TPS</span>
        </div>
        <div className="tps-value">
          {networkTPS.toFixed(1)}
        </div>
        <div className="tps-label">transactions/sec</div>
        <div className="tps-stats">
          <div>Active Players: {activePlayers}</div>
          <div>Total Players: {totalPlayers.toLocaleString()}</div>
          <div>Peak TPS: {peakTPS.toLocaleString()}</div>
        </div>
        <div className="tps-progress">
          <div 
            className="tps-progress-fill"
            style={{ width: `${Math.min((networkTPS / networkGoal) * 100, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Community Goal */}
      <div className="tps-panel community-goal">
        <div className="tps-header">
          <Target size={20} color="#ff6b6b" />
          <span>Community Goal</span>
        </div>
        <div className="goal-text">
          Help the Pi² community reach <strong>{networkGoal.toLocaleString()} TPS</strong>!
        </div>
        <div className="goal-progress">
          <div className="goal-progress-text">
            {Math.floor((networkTPS / networkGoal) * 100)}% Complete
          </div>
          <div className="goal-progress-bar">
            <div 
              className="goal-progress-fill"
              style={{ width: `${Math.min((networkTPS / networkGoal) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}; 