import type { PiStage, GameConfig } from '../types/game';

// Game configuration
export const GAME_CONFIG: GameConfig = {
  maxRings: 5,
  baseColorChangeSpeed: 4000, // 4 seconds
  energyDecayRate: 1000, // 1 second
  restartDelay: 2000, // 2 seconds
};

// π stages with progressive difficulty
export const PI_STAGES: PiStage[] = [
  {
    stage: '3',
    energyRequired: 15,
    colorChangeSpeed: 4000,
    description: 'Building π = 3...'
  },
  {
    stage: '3.1',
    energyRequired: 25,
    colorChangeSpeed: 3000,
    description: 'Building π = 3.1...'
  },
  {
    stage: '3.14',
    energyRequired: 40,
    colorChangeSpeed: 2000,
    description: 'Building π = 3.14...'
  },
  {
    stage: '3.141',
    energyRequired: 60,
    colorChangeSpeed: 1500,
    description: 'Building π = 3.141...'
  },
  {
    stage: '3.1415',
    energyRequired: 85,
    colorChangeSpeed: 1200,
    description: 'Building π = 3.1415...'
  },
  {
    stage: '3.14159',
    energyRequired: 115,
    colorChangeSpeed: 1000,
    description: 'Building π = 3.14159...'
  },
  {
    stage: '3.141592',
    energyRequired: 150,
    colorChangeSpeed: 800,
    description: 'Building π = 3.141592...'
  },
  {
    stage: '3.1415926',
    energyRequired: 200,
    colorChangeSpeed: 700,
    description: 'Building π = 3.1415926...'
  }
];

// Reactor ring configuration
export const REACTOR_RING_CONFIG = {
  baseRadius: 60,
  ringSpacing: 30,
  maxRings: 5,
  animationDuration: 300,
  pulseDuration: 150,
  flashDuration: 100,
};

// Energy system configuration
export const ENERGY_CONFIG = {
  correctClickGain: 1,
  wrongClickGain: 0,
  decayInterval: 1000, // 1 second
  decayAmount: 1,
  restartThreshold: 0,
  wrongClickLimit: 3, // New: max consecutive wrong clicks
  timerUpdateInterval: 100, // New: timer update frequency in ms
};

// FastSet API configuration (mock for now)
export const FASTSET_CONFIG = {
  baseUrl: 'https://api.fastset.com', // Mock URL
  claimEndpoint: '/claim',
  timeout: 5000,
  retryAttempts: 3,
}; 