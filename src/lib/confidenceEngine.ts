import type { RiskProfile } from '@/types'

interface ConfidenceInput {
  monthlySIP: number
  annualRate: number
  years: number
  targetAmount: number
  riskProfile: RiskProfile
}

export function confidenceMonteCarlo(input: ConfidenceInput): number {
  const { monthlySIP, annualRate, years, targetAmount, riskProfile } = input
  const simulations = 200
  let successCount = 0
  
  const volatilityMap = {
    conservative: 0.08,
    moderate: 0.14,
    aggressive: 0.22,
  }
  
  const volatility = volatilityMap[riskProfile.tier]
  const monthlyRate = annualRate / 100 / 12
  const months = years * 12
  
  for (let i = 0; i < simulations; i++) {
    let value = 0
    
    for (let m = 0; m < months; m++) {
      const randomReturn = monthlyRate + (Math.random() - 0.5) * volatility / Math.sqrt(12)
      value = value * (1 + randomReturn) + monthlySIP
    }
    
    if (value >= targetAmount) successCount++
  }
  
  return Math.round((successCount / simulations) * 100)
}

export function getConfidenceLabel(confidence: number): string {
  if (confidence >= 80) return 'High'
  if (confidence >= 60) return 'Medium'
  return 'Low'
}

export function getConfidenceColor(confidence: number): 'success' | 'warning' | 'error' {
  if (confidence >= 80) return 'success'
  if (confidence >= 60) return 'warning'
  return 'error'
}