import { useState, useEffect, useCallback, useRef } from 'react';
import type { GameState, ClickResult, ReactorRing } from '../types/game';
import { REACTOR_COLORS } from '../types/game';
import { PI_STAGES, ENERGY_CONFIG } from '../utils/gameConfig';
import { fastSetService } from '../services/fastSetService';

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentEnergy: 0,
    currentPiStage: '9',
    targetColor: REACTOR_COLORS[0],
    isGameActive: false, // Start as inactive
    lastClickTime: Date.now(),
    energyDecayTimer: 0,
    timeRemaining: 5000, // 5 seconds for first stage
    wrongClickStreak: 0,
    finalScore: 0,
    gameEnded: false,
    // TPS tracking
    individualTPS: 0,
    networkTPS: 0,
    totalClicks: 0,
    sessionStartTime: 0, // Don't start session time until game starts
    // Game start state
    gameStarted: false,
    countdown: 0,
    showStartScreen: true, // Show start screen initially
  });

  const [reactorRings, setReactorRings] = useState<ReactorRing[]>([]);
  const [clickResult, setClickResult] = useState<ClickResult | null>(null);
  
  const colorChangeInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const energyDecayInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const tpsTracker = useRef<{ clicks: number[]; timestamps: number[] }>({ clicks: [], timestamps: [] });

  // Calculate TPS based on recent clicks
  const calculateTPS = useCallback(() => {
    const now = Date.now();
    const windowSize = 1000; // 1 second window
    const recentClicks = tpsTracker.current.timestamps.filter(
      timestamp => now - timestamp < windowSize
    );
    return recentClicks.length;
  }, []);

  // Update TPS when click happens
  const updateTPS = useCallback(() => {
    const now = Date.now();
    tpsTracker.current.timestamps.push(now);
    
    // Keep only last 10 seconds of data
    const tenSecondsAgo = now - 10000;
    tpsTracker.current.timestamps = tpsTracker.current.timestamps.filter(
      timestamp => timestamp > tenSecondsAgo
    );
    
    const currentTPS = calculateTPS();
    
    setGameState(prev => ({
      ...prev,
      individualTPS: currentTPS,
      totalClicks: prev.totalClicks + 1,
    }));
  }, [calculateTPS]);

  // Get current π stage configuration
  const getCurrentPiStage = useCallback(() => {
    return PI_STAGES.find((stage: any) => stage.stage === gameState.currentPiStage) || PI_STAGES[0];
  }, [gameState.currentPiStage]);

  // Initialize reactor rings
  const initializeReactorRings = useCallback(() => {
    const rings: ReactorRing[] = [];
    const targetColor = gameState.targetColor;
    
    // Create a shuffled array of colors to ensure uniqueness
    const shuffledColors = [...REACTOR_COLORS].sort(() => Math.random() - 0.5);
    
    // Generate unique colors for all rings
    for (let i = 0; i < 5; i++) {
      const color = shuffledColors[i];
      rings.push({
        id: i,
        color: color,
        radius: 60 + (i * 30),
        isTarget: false,
        isClickable: true,
      });
    }
    
    // Ensure exactly one ring matches the target color
    const randomRingIndex = Math.floor(Math.random() * rings.length);
    rings[randomRingIndex].color = targetColor;
    rings[randomRingIndex].isTarget = true;
    
    setReactorRings(rings);
  }, [gameState.targetColor]);

  // Handle ring click
  const handleRingClick = useCallback(async (ringId: number) => {
    const ring = reactorRings.find(r => r.id === ringId);
    
    if (!ring || !gameState.isGameActive || gameState.gameEnded) {
      return;
    }

    // Update TPS tracking
    updateTPS();

    const isCorrect = ring.color === gameState.targetColor;
    const energyGained = isCorrect ? ENERGY_CONFIG.correctClickGain : ENERGY_CONFIG.wrongClickGain;
    
    const result: ClickResult = {
      isCorrect,
      energyGained,
      visualEffect: isCorrect ? 'pulse' : 'flash',
    };

    setClickResult(result);

    if (isCorrect) {
      // Reset wrong click streak on correct click
      setGameState(prev => ({
        ...prev,
        currentEnergy: prev.currentEnergy + energyGained,
        lastClickTime: Date.now(),
        wrongClickStreak: 0,
        timeRemaining: getCurrentPiStage().colorChangeSpeed, // Reset timer
      }));

      // Make FastSet claim for correct clicks
      try {
        const response = await fastSetService.claimEnergy(1, gameState.currentPiStage);
        if (response.success) {
          console.log('FastSet claim successful:', response.claimId);
        } else {
          console.error('FastSet claim failed:', response.error);
        }
      } catch (error) {
        console.error('FastSet service error:', error);
      }
    } else {
      // Increment wrong click streak
      const newWrongClickStreak = gameState.wrongClickStreak + 1;
      
      if (newWrongClickStreak >= ENERGY_CONFIG.wrongClickLimit) {
        // Game over - set final score
        setGameState(prev => ({
          ...prev,
          gameEnded: true,
          isGameActive: false,
          finalScore: prev.currentEnergy,
          wrongClickStreak: newWrongClickStreak,
        }));
      } else {
        setGameState(prev => ({
          ...prev,
          wrongClickStreak: newWrongClickStreak,
        }));
      }
    }

    // Clear click result after animation
    setTimeout(() => setClickResult(null), 200);
  }, [reactorRings, gameState.targetColor, gameState.isGameActive, gameState.gameEnded, gameState.wrongClickStreak, getCurrentPiStage, updateTPS]);

  // Change target color
  const changeTargetColor = useCallback(() => {
    const newColor = REACTOR_COLORS[Math.floor(Math.random() * REACTOR_COLORS.length)];
    setGameState(prev => ({ ...prev, targetColor: newColor }));
    
    // Update reactor rings with unique colors and ensure one matches target
    setReactorRings(prev => {
      // Create a shuffled array of colors to ensure uniqueness
      const shuffledColors = [...REACTOR_COLORS].sort(() => Math.random() - 0.5);
      
      const newRings = prev.map((ring, index) => ({
        ...ring,
        color: shuffledColors[index],
        isTarget: false,
      }));
      
      // Ensure exactly one ring matches the new target color
      const randomRingIndex = Math.floor(Math.random() * newRings.length);
      newRings[randomRingIndex].color = newColor;
      newRings[randomRingIndex].isTarget = true;
      
      return newRings;
    });
  }, []);

  // Check π stage progression
  const checkPiProgression = useCallback(() => {
    const currentStage = getCurrentPiStage();
    const nextStageIndex = PI_STAGES.findIndex(stage => stage.stage === gameState.currentPiStage) + 1;
    
    if (nextStageIndex < PI_STAGES.length && gameState.currentEnergy >= currentStage.energyRequired) {
      const nextStage = PI_STAGES[nextStageIndex];
      setGameState(prev => ({
        ...prev,
        currentPiStage: nextStage.stage,
      }));
      return true;
    }
    return false;
  }, [gameState.currentEnergy, gameState.currentPiStage, getCurrentPiStage]);

  // Handle energy decay
  const handleEnergyDecay = useCallback(() => {
    const timeSinceLastClick = Date.now() - gameState.lastClickTime;
    if (timeSinceLastClick > ENERGY_CONFIG.decayInterval) {
      setGameState(prev => ({
        ...prev,
        currentEnergy: Math.max(0, prev.currentEnergy - ENERGY_CONFIG.decayAmount),
        energyDecayTimer: prev.energyDecayTimer + 1,
      }));
    }
  }, [gameState.lastClickTime]);

  // Start game function
  const startGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      showStartScreen: false,
      countdown: 3,
    }));

    // Start countdown
    const countdownInterval = setInterval(() => {
      setGameState(prev => {
        if (prev.countdown > 1) {
          return { ...prev, countdown: prev.countdown - 1 };
        } else if (prev.countdown === 1) {
          // Countdown finished, start the game
          clearInterval(countdownInterval);
          return {
            ...prev,
            countdown: 0,
            gameStarted: true,
            isGameActive: true,
            sessionStartTime: Date.now(),
            timeRemaining: getCurrentPiStage().colorChangeSpeed,
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [getCurrentPiStage]);

  // Restart game function
  const restartGame = useCallback(() => {
    const randomColor = REACTOR_COLORS[Math.floor(Math.random() * REACTOR_COLORS.length)];
    setGameState({
      currentEnergy: 0,
      currentPiStage: '9',
      targetColor: randomColor,
      isGameActive: false,
      lastClickTime: Date.now(),
      energyDecayTimer: 0,
      timeRemaining: 5000,
      wrongClickStreak: 0,
      finalScore: 0,
      gameEnded: false,
      // Reset TPS tracking
      individualTPS: 0,
      networkTPS: 0,
      totalClicks: 0,
      sessionStartTime: 0, // Reset session time
      gameStarted: false,
      countdown: 0,
      showStartScreen: true,
    });
    
    // Reset TPS tracker
    tpsTracker.current = { clicks: [], timestamps: [] };
    
    initializeReactorRings();
  }, [initializeReactorRings]);

  // Set up color change interval
  useEffect(() => {
    const currentStage = getCurrentPiStage();
    
    if (colorChangeInterval.current) {
      clearInterval(colorChangeInterval.current);
    }

    colorChangeInterval.current = setInterval(() => {
      changeTargetColor();
    }, currentStage.colorChangeSpeed);

    return () => {
      if (colorChangeInterval.current) {
        clearInterval(colorChangeInterval.current);
      }
    };
  }, [gameState.currentPiStage, changeTargetColor, getCurrentPiStage]);

  // Set up energy decay interval
  useEffect(() => {
    if (energyDecayInterval.current) {
      clearInterval(energyDecayInterval.current);
    }

    energyDecayInterval.current = setInterval(() => {
      handleEnergyDecay();
    }, ENERGY_CONFIG.decayInterval);

    return () => {
      if (energyDecayInterval.current) {
        clearInterval(energyDecayInterval.current);
      }
    };
  }, [handleEnergyDecay]);

  // Check π progression when energy changes
  useEffect(() => {
    checkPiProgression();
  }, [gameState.currentEnergy, checkPiProgression]);

  // Initialize reactor rings on mount
  useEffect(() => {
    initializeReactorRings();
  }, [initializeReactorRings]);

  // Set up timer interval
  useEffect(() => {
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
    }

    if (gameState.isGameActive && !gameState.gameEnded) {
      timerInterval.current = setInterval(() => {
        setGameState(prev => {
          const newTimeRemaining = prev.timeRemaining - ENERGY_CONFIG.timerUpdateInterval;
          
          if (newTimeRemaining <= 0) {
            // Timer expired - reset game
            return {
              ...prev,
              currentEnergy: 0,
              currentPiStage: '9',
              timeRemaining: 5000, // Reset to first stage time
              wrongClickStreak: 0,
              gameEnded: false,
            };
          }
          
          return {
            ...prev,
            timeRemaining: newTimeRemaining,
          };
        });
      }, ENERGY_CONFIG.timerUpdateInterval);
    }

    return () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
    };
  }, [gameState.isGameActive, gameState.gameEnded]);

  // Update timer when stage changes
  useEffect(() => {
    const currentStage = getCurrentPiStage();
    setGameState(prev => ({
      ...prev,
      timeRemaining: currentStage.colorChangeSpeed,
    }));
  }, [gameState.currentPiStage, getCurrentPiStage]);

  return {
    gameState,
    reactorRings,
    clickResult,
    handleRingClick,
    restartGame,
    startGame,
    getCurrentPiStage,
  };
}; 