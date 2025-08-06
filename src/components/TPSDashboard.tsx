import React from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Zap, Users, Target } from 'lucide-react';
import type { GameState } from '../types/game';
import './TPSDashboard.css';

interface TPSDashboardProps {
  gameState: GameState;
}

export const TPSDashboard: React.FC<TPSDashboardProps> = ({ gameState }) => {
  // Simulate network data
  const networkTPS = Math.floor(gameState.individualTPS * 1.5 + Math.random() * 10);
  const activePlayers = Math.floor(50 + Math.random() * 100);
  const networkGoal = 1000;
  const totalPlayers = 1247;
  const peakTPS = 2347;

  // Animated values for gauges
  const networkTPSValue = useMotionValue(0);
  const individualTPSValue = useMotionValue(0);
  const communityProgressValue = useMotionValue(0);

  // Transform values for gauge rotations
  const networkTPSRotation = useTransform(networkTPSValue, [0, 60], [0, 180]);

  // Animate values when they change
  React.useEffect(() => {
    animate(networkTPSValue, Math.min(networkTPS, 60), { duration: 1, ease: "easeOut" });
  }, [networkTPS, networkTPSValue]);

  React.useEffect(() => {
    animate(individualTPSValue, Math.min(gameState.individualTPS * 10, 100), { duration: 1, ease: "easeOut" });
  }, [gameState.individualTPS, individualTPSValue]);

  React.useEffect(() => {
    const progress = Math.min((networkTPS / networkGoal) * 100, 100);
    animate(communityProgressValue, progress, { duration: 1, ease: "easeOut" });
  }, [networkTPS, networkGoal, communityProgressValue]);

  // Calculate gauge colors based on values
  const getGaugeColor = (value: number, max: number) => {
    const percentage = (value / max) * 100;
    if (percentage < 30) return '#4ecdc4'; // Teal
    if (percentage < 70) return '#ffd93d'; // Yellow
    return '#ff6b6b'; // Red
  };

  const networkTPSColor = getGaugeColor(networkTPS, 60);
  const individualTPSColor = getGaugeColor(gameState.individualTPS, 10);

  return (
    <div className="tps-dashboard">
      {/* Main Network TPS Gauge */}
      <div className="dashboard-section main-gauge">
        <div className="gauge-container">
          <div className="gauge-background">
            <svg width="180" height="110" viewBox="0 0 180 110">
              {/* Gauge arc */}
              <path
                d="M 25 85 A 55 55 0 0 1 155 85"
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="5"
                strokeLinecap="round"
              />
              {/* Animated gauge fill */}
              <motion.path
                d="M 25 85 A 55 55 0 0 1 155 85"
                fill="none"
                stroke={networkTPSColor}
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray="173"
                strokeDashoffset={useTransform(networkTPSValue, [0, 60], [173, 0])}
                style={{ filter: 'drop-shadow(0 0 6px currentColor)' }}
              />
              {/* Scale markers */}
              {[0, 10, 20, 30, 40, 50, 60].map((value) => {
                const angle = (value / 60) * 180;
                const x = 90 + 45 * Math.cos((angle - 90) * Math.PI / 180);
                const y = 85 - 45 * Math.sin((angle - 90) * Math.PI / 180);
                return (
                  <g key={value}>
                    <line
                      x1={x}
                      y1={y}
                      x2={x + 6 * Math.cos((angle - 90) * Math.PI / 180)}
                      y2={y - 6 * Math.sin((angle - 90) * Math.PI / 180)}
                      stroke="white"
                      strokeWidth="1"
                    />
                    {value % 20 === 0 && (
                      <text
                        x={x + 12 * Math.cos((angle - 90) * Math.PI / 180)}
                        y={y - 12 * Math.sin((angle - 90) * Math.PI / 180)}
                        fill="white"
                        fontSize="9"
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        {value}K
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
          
          {/* Central diamond */}
          <motion.div 
            className="gauge-center"
            animate={{ 
              boxShadow: [
                `0 0 20px ${networkTPSColor}`,
                `0 0 40px ${networkTPSColor}`,
                `0 0 20px ${networkTPSColor}`
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="diamond-inner"></div>
          </motion.div>

          {/* Needle */}
          <motion.div 
            className="gauge-needle"
            style={{ rotate: networkTPSRotation }}
          />

          {/* Labels */}
          <div className="gauge-labels">
            <div className="gauge-title">
              <div className="title-dot"></div>
              Live TPS
            </div>
            <motion.div 
              className="gauge-value"
              style={{ color: networkTPSColor }}
            >
              {networkTPS.toFixed(1)}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Individual TPS Meter + Community Goal Combined */}
      <div className="dashboard-section combined-panel">
        <div className="combined-header">
          <div className="meter-header">
            <Zap size={18} color="#4a9eff" />
            <span>Your TPS</span>
          </div>
          <div className="ring-header">
            <Target size={18} color="#ff6b6b" />
            <span>Community Goal</span>
          </div>
        </div>
        
        <div className="combined-content">
          {/* Left side - Your TPS */}
          <div className="tps-side">
            <div className="meter-container">
              <div className="meter-bar">
                <motion.div 
                  className="meter-fill"
                  style={{ 
                    width: useTransform(individualTPSValue, [0, 100], ['0%', '100%']),
                    backgroundColor: individualTPSColor
                  }}
                />
              </div>
              <motion.div 
                className="meter-value"
                style={{ color: individualTPSColor }}
              >
                {gameState.individualTPS.toFixed(1)}
              </motion.div>
            </div>
            <div className="meter-stats">
              <div>Total Clicks: {gameState.totalClicks}</div>
              <div>Session: {gameState.sessionStartTime > 0 ? Math.floor((Date.now() - gameState.sessionStartTime) / 1000) : 0}s</div>
            </div>
          </div>

          {/* Right side - Community Goal */}
          <div className="goal-side">
            <div className="ring-container">
              <svg width="60" height="60" viewBox="0 0 120 120">
                {/* Background ring */}
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="8"
                />
                {/* Progress ring */}
                <motion.circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#ff6b6b"
                  strokeWidth="8"
                  strokeDasharray="314"
                  strokeDashoffset={useTransform(communityProgressValue, [0, 100], [314, 0])}
                  strokeLinecap="round"
                  style={{ filter: 'drop-shadow(0 0 6px #ff6b6b)' }}
                />
              </svg>
              <div className="ring-content">
                <div className="ring-percentage">
                  {Math.floor((networkTPS / networkGoal) * 100)}%
                </div>
                <div className="ring-label">Complete</div>
              </div>
            </div>
            <div className="ring-goal">
              Goal: {networkGoal.toLocaleString()} TPS
            </div>
          </div>
        </div>
      </div>

      {/* Network Stats */}
      <div className="dashboard-section network-stats">
        <div className="stats-header">
          <Users size={20} color="#4ecdc4" />
          <span>Network Activity</span>
        </div>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-value">{activePlayers}</div>
            <div className="stat-label">Active Players</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{totalPlayers.toLocaleString()}</div>
            <div className="stat-label">Total Players</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{peakTPS.toLocaleString()}</div>
            <div className="stat-label">Peak TPS</div>
          </div>
        </div>
      </div>
    </div>
  );
}; 