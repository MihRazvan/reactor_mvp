import type { FastSetClaim, FastSetResponse } from '../types/game';

class FastSetService {
  constructor() {
    // Initialize service for future blockchain integration
  }

  // Mock FastSet claim - in real implementation, this would call the actual API
  async claimEnergy(energyPoints: number, piStage: string): Promise<FastSetResponse> {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock successful response
      const claim: FastSetClaim = {
        id: `claim_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
        energyPoints,
        piStage,
        // transactionHash: '0x...' // For future blockchain integration
      };

      console.log('FastSet Claim:', claim);

      return {
        success: true,
        claimId: claim.id,
      };
    } catch (error) {
      console.error('FastSet claim error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Get claim history (for future blockchain integration)
  async getClaimHistory(): Promise<FastSetClaim[]> {
    // Mock implementation
    return [
      {
        id: 'claim_1',
        timestamp: Date.now() - 60000,
        energyPoints: 1,
        piStage: '3',
      },
      {
        id: 'claim_2',
        timestamp: Date.now() - 30000,
        energyPoints: 1,
        piStage: '3.1',
      },
    ];
  }

  // Validate claim (for future blockchain integration)
  async validateClaim(_claimId: string): Promise<boolean> {
    // Mock validation
    return true;
  }
}

// Export singleton instance
export const fastSetService = new FastSetService(); 