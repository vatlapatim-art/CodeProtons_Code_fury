import type { RiskAnswers, RiskProfile } from '@/types'

const QUESTION_WEIGHTS = {
  incomeStability: 20,
  primaryGoal: 15,
  timeHorizon: 25,
  lossTolerance: 25,
  experience: 10,
  liquidityNeed: 5,
} as const

const SCORE_MAP: Record<string, Record<string, number>> = {
  incomeStability: { salaried: 100, freelance: 60, business: 70, variable: 30 },
  primaryGoal: { wealth: 90, specific: 70, income: 40, preservation: 10 },
  timeHorizon: { '10y+': 100, '5-10y': 80, '3-5y': 60, '1-3y': 30, '<1y': 10 },
  lossTolerance: { '30%+': 100, '15-30%': 70, '5-15%': 40, '0-5%': 10 },
  experience: { advanced: 100, intermediate: 70, beginner: 40, none: 10 },
  liquidityNeed: { '1y+': 100, '6m': 70, '3m': 50, '1m': 30, immediate: 10 },
}

const TIER_THRESHOLDS = {
  conservative: 35,
  moderate: 65,
  aggressive: 101,
} as const

const ALLOCATION_PRESETS: Record<RiskProfile['tier'], RiskProfile['allocation']> = {
  conservative: { equity: 30, debt: 50, gold: 10, cash: 10 },
  moderate: { equity: 60, debt: 25, gold: 10, cash: 5 },
  aggressive: { equity: 80, debt: 10, gold: 5, cash: 5 },
}

export function calculateRiskProfile(answers: RiskAnswers): RiskProfile {
  let score = 0

  for (const [key, weight] of Object.entries(QUESTION_WEIGHTS)) {
    const answerKey = key as keyof RiskAnswers
    const answerValue = answers[answerKey]
    const points = SCORE_MAP[key][answerValue] ?? 0
    score += (points / 100) * weight
  }

  const finalScore = Math.round(score)
  let tier: RiskProfile['tier'] = 'moderate'

  if (finalScore < TIER_THRESHOLDS.conservative) tier = 'conservative'
  else if (finalScore < TIER_THRESHOLDS.moderate) tier = 'moderate'
  else tier = 'aggressive'

  return {
    tier,
    allocation: ALLOCATION_PRESETS[tier],
    confidence: Math.min(50 + finalScore, 95),
    score: finalScore,
  }
}

export function getRiskTierLabel(tier: RiskProfile['tier']): string {
  const labels = {
    conservative: 'Conservative',
    moderate: 'Moderate',
    aggressive: 'Aggressive',
  }
  return labels[tier]
}

export function getRiskTierDescription(tier: RiskProfile['tier']): string {
  const descriptions = {
    conservative: 'You prefer stability over growth. Your portfolio focuses on capital preservation with modest returns.',
    moderate: 'You seek balanced growth with managed risk. Your portfolio mixes growth and income assets.',
    aggressive: 'You prioritize long-term growth and accept higher volatility. Your portfolio is equity-heavy.',
  }
  return descriptions[tier]
}