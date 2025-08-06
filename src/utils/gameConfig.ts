import type { PiStage, GameConfig } from '../types/game';

// Game configuration
export const GAME_CONFIG: GameConfig = {
  maxRings: 5,
  baseColorChangeSpeed: 4000, // 4 seconds
  energyDecayRate: 1000, // 1 second
  restartDelay: 2000, // 2 seconds
};

// π² stages with progressive difficulty
export const PI_STAGES: PiStage[] = [
  {
    stage: '9',
    energyRequired: 9,
    colorChangeSpeed: 5000,
    description: '🌱 Foundation - Building π² = 9...'
  },
  {
    stage: '9.8',
    energyRequired: 18,
    colorChangeSpeed: 4500,
    description: '⚡ Power Up - π² = 9.8...'
  },
  {
    stage: '9.86',
    energyRequired: 30,
    colorChangeSpeed: 4000,
    description: '🌟 Quantum Leap - π² = 9.86...'
  },
  {
    stage: '9.869',
    energyRequired: 45,
    colorChangeSpeed: 3500,
    description: '🔥 Fusion Core - π² = 9.869...'
  },
  {
    stage: '9.8696',
    energyRequired: 65,
    colorChangeSpeed: 3000,
    description: '🚀 Hyperdrive - π² = 9.8696...'
  },
  {
    stage: '9.86960',
    energyRequired: 90,
    colorChangeSpeed: 2500,
    description: '💫 Cosmic Reactor - π² = 9.86960...'
  },
  {
    stage: '9.869604',
    energyRequired: 120,
    colorChangeSpeed: 2000,
    description: '🌌 Stellar Nexus - π² = 9.869604...'
  },
  {
    stage: '9.8696044',
    energyRequired: 160,
    colorChangeSpeed: 1500,
    description: '⚛️ Pi² Master - π² = 9.8696044...'
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