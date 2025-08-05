// Game state interfaces
export interface GameState {
  currentEnergy: number;
  currentPiStage: string;
  targetColor: string;
  isGameActive: boolean;
  lastClickTime: number;
  energyDecayTimer: number;
  timeRemaining: number; // New: countdown timer
  wrongClickStreak: number; // New: consecutive wrong clicks
  finalScore: number; // New: final score when game ends
  gameEnded: boolean; // New: whether game has ended
}

export interface PiStage {
  stage: string;
  energyRequired: number;
  colorChangeSpeed: number;
  description: string;
}

export interface ReactorRing {
  id: number;
  color: string;
  radius: number;
  isTarget: boolean;
  isClickable: boolean;
}

export interface ClickResult {
  isCorrect: boolean;
  energyGained: number;
  visualEffect: 'pulse' | 'flash' | 'none';
}

// FastSet API interfaces
export interface FastSetClaim {
  id: string;
  timestamp: number;
  energyPoints: number;
  piStage: string;
  transactionHash?: string; // For future blockchain integration
}

export interface FastSetResponse {
  success: boolean;
  claimId?: string;
  error?: string;
}

// Blockchain-ready interfaces (for future integration)
export interface WalletState {
  isConnected: boolean;
  address?: string;
  balance?: string;
  chainId?: number;
}

export interface LeaderboardEntry {
  address: string;
  energyPoints: number;
  piStage: string;
  timestamp: number;
}

export interface GameTransaction {
  type: 'energy_claim' | 'pi_unlock' | 'leaderboard_update';
  data: any;
  timestamp: number;
  transactionHash?: string;
}

// Game configuration
export interface GameConfig {
  maxRings: number;
  baseColorChangeSpeed: number;
  energyDecayRate: number;
  restartDelay: number;
}

// Color palette for reactor rings
export const REACTOR_COLORS = [
  '#FF6B6B', // Red
  '#4ECDC4', // Teal
  '#45B7D1', // Blue
  '#96CEB4', // Green
  '#FFEAA7', // Yellow
  '#DDA0DD', // Plum
  '#98D8C8', // Mint
  '#F7DC6F', // Gold
] as const;

export type ReactorColor = typeof REACTOR_COLORS[number]; 