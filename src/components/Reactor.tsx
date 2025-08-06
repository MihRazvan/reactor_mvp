import React from 'react';
import { motion } from 'framer-motion';
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
    return 'Click the correct colored segment to generate π² energy!';
  };

  // Circle positions in a perfect pentagon around the core
  const circlePositions = [
    { x: 0, y: -130 },                    // Top
    { x: 123, y: -38 },                   // Top-right
    { x: 76, y: 105 },                    // Bottom-right
    { x: -76, y: 105 },                   // Bottom-left
    { x: -123, y: -38 },                  // Top-left
  ];

  return (
    <div className="reactor-container">
      <div className="target-indicator">
        <div className="target-label">Target π² Segment Color:</div>
        <div 
          className="target-color"
          style={{ backgroundColor: targetColor }}
        ></div>
      </div>

      <div className="reactor">
        {/* Reactor core */}
        <motion.div 
          className="reactor-core"
          animate={{
            scale: [1, 1.05, 1],
            boxShadow: [
              "0 0 40px rgba(74, 158, 255, 0.9), 0 0 80px rgba(74, 158, 255, 0.5)",
              "0 0 50px rgba(74, 158, 255, 1), 0 0 100px rgba(74, 158, 255, 0.7)",
              "0 0 40px rgba(74, 158, 255, 0.9), 0 0 80px rgba(74, 158, 255, 0.5)"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.div 
            className="core-inner"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="core-pulse"
            animate={{
              scale: [1, 1.8],
              opacity: [1, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        </motion.div>

        {/* Clickable circles positioned around the core */}
        {rings.map((ring, index) => {
          const position = circlePositions[index];
          const isCorrect = ring.color === targetColor;
          const isWrong = clickResult?.visualEffect === 'flash' && ring.color !== targetColor;
          
          return (
            <motion.div
              key={ring.id}
              className={`clickable-circle circle-${ring.id + 1}`}
              style={{
                backgroundColor: ring.color,
                x: position.x,
                y: position.y,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 0.9,
                x: position.x,
                y: position.y,
              }}
              whileHover={{ 
                scale: 1.1, 
                opacity: 1,
                boxShadow: "0 0 25px rgba(255, 255, 255, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
              data-ring={ring.id + 1}
              data-color-index={ring.id}
              data-color={ring.color}
              onClick={() => handleRingClick(ring.id)}
            >
              {/* Pulse effect for correct clicks */}
              {isCorrect && clickResult?.visualEffect === 'pulse' && (
                <motion.div
                  className="pulse-overlay"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              
              {/* Flash effect for wrong clicks */}
              {isWrong && (
                <motion.div
                  className="flash-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="game-status">
        {getGameStatusMessage()}
      </div>
    </div>
  );
}; 