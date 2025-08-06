import React from 'react';
import { Trophy } from 'lucide-react';
import type { GameState } from '../types/game';
import './CommunityPanel.css';

interface CommunityPanelProps {
  gameState: GameState;
}

export const CommunityPanel: React.FC<CommunityPanelProps> = () => {
  // Simulate leaderboard data
  const leaderboard = [
    { rank: 1, name: "ReactorMaster", tps: 45.2, energy: 234, avatar: "🚀" },
    { rank: 2, name: "PiSquared", tps: 38.7, energy: 189, avatar: "⚡" },
    { rank: 3, name: "EnergyQueen", tps: 32.1, energy: 156, avatar: "👑" },
    { rank: 4, name: "SpeedDemon", tps: 28.9, energy: 142, avatar: "💨" },
    { rank: 5, name: "CoreBuilder", tps: 25.4, energy: 128, avatar: "⚛️" },
  ];

  return (
    <div className="community-panel">
      <div className="community-layout">
        {/* Leaderboard */}
        <div className="community-section leaderboard-section">
          <div className="section-header">
            <Trophy size={24} color="#FFD700" />
            <h3>Top Players</h3>
          </div>
          <div className="leaderboard-list">
            {leaderboard.map((player) => (
              <div key={player.rank} className="leaderboard-item">
                <div className="rank-badge">{player.rank}</div>
                <div className="player-avatar">{player.avatar}</div>
                <div className="player-info">
                  <div className="player-name">{player.name}</div>
                  <div className="player-stats">
                    {player.tps} TPS • {player.energy} Energy
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 