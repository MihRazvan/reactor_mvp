import type { FastSetClaim, FastSetResponse } from '../types/game';
import { FASTSET_CONFIG } from '../utils/gameConfig';

class FastSetService {
  private baseUrl: string;
  private timeout: number;
  private retryAttempts: number;

  constructor() {
    this.baseUrl = FASTSET_CONFIG.baseUrl;
    this.timeout = FASTSET_CONFIG.timeout;
    this.retryAttempts = FASTSET_CONFIG.retryAttempts;
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

  // Mock API call with retry logic
  private async makeApiCall(endpoint: string, data: any): Promise<FastSetResponse> {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= this.retryAttempts; attempt++) {
      try {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
          signal: AbortSignal.timeout(this.timeout),
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        return await response.json();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');
        
        if (attempt < this.retryAttempts) {
          // Exponential backoff
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }
    }

    return {
      success: false,
      error: lastError?.message || 'Max retry attempts reached',
    };
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
  async validateClaim(claimId: string): Promise<boolean> {
    // Mock validation
    return true;
  }
}

// Export singleton instance
export const fastSetService = new FastSetService(); 