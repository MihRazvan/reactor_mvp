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
  '#FF0000', // Bright Red
  '#00FF00', // Bright Green
  '#0000FF', // Bright Blue
  '#FFFF00', // Bright Yellow
  '#FF00FF', // Bright Magenta
  '#00FFFF', // Bright Cyan
  '#FF8000', // Bright Orange
  '#8000FF', // Bright Purple
  '#FF0080', // Bright Pink
  '#00FF80', // Bright Lime
] as const;

export type ReactorColor = typeof REACTOR_COLORS[number]; 