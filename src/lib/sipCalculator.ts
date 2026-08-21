export function requiredSIP(annualRate: number, years: number, targetAmount: number): number {
  const monthlyRate = annualRate / 100 / 12
  const months = years * 12
  
  if (monthlyRate === 0) return targetAmount / months
  
  const sip = targetAmount * monthlyRate / (Math.pow(1 + monthlyRate, months) - 1)
  return Math.round(sip)
}

export function futureValue(monthlySIP: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 100 / 12
  const months = years * 12
  
  if (monthlyRate === 0) return monthlySIP * months
  
  const fv = monthlySIP * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate
  return Math.round(fv)
}

export function timeToGoal(monthlySIP: number, annualRate: number, targetAmount: number): number {
  const monthlyRate = annualRate / 100 / 12
  
  if (monthlyRate === 0) return targetAmount / monthlySIP / 12
  
  const months = Math.log(1 + (targetAmount * monthlyRate) / monthlySIP) / Math.log(1 + monthlyRate)
  return months / 12
}

export function getExpectedReturn(riskTier: 'conservative' | 'moderate' | 'aggressive'): number {
  const returns = {
    conservative: 8,
    moderate: 11,
    aggressive: 14,
  }
  return returns[riskTier]
}