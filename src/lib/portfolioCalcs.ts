import type { Holding, Allocation, OverlapReport, OverlapPair } from '@/types'

export function getAllocation(holdings: Holding[]): Allocation {
  const totalValue = holdings.reduce((sum, h) => sum + h.quantity * h.currentPrice, 0)
  if (totalValue === 0) return { equity: 0, debt: 0, gold: 0, cash: 0 }

  const byClass = holdings.reduce((acc, h) => {
    const value = h.quantity * h.currentPrice
    acc[h.assetClass] = (acc[h.assetClass] || 0) + value
    return acc
  }, {} as Record<string, number>)

  return {
    equity: Math.round((byClass.equity || 0) / totalValue * 100),
    debt: Math.round((byClass.debt || 0) / totalValue * 100),
    gold: Math.round((byClass.gold || 0) / totalValue * 100),
    cash: Math.round((byClass.cash || 0) / totalValue * 100),
  }
}

export function getPortfolioValue(holdings: Holding[]): number {
  return holdings.reduce((sum, h) => sum + h.quantity * h.currentPrice, 0)
}

export function getPortfolioReturn(holdings: Holding[]): number {
  let totalInvested = 0
  let totalCurrent = 0
  
  holdings.forEach(h => {
    totalInvested += h.quantity * h.avgPrice
    totalCurrent += h.quantity * h.currentPrice
  })
  
  if (totalInvested === 0) return 0
  return ((totalCurrent - totalInvested) / totalInvested) * 100
}

export function getPlatformBreakdown(holdings: Holding[]) {
  return holdings.reduce((acc, h) => {
    const value = h.quantity * h.currentPrice
    if (!acc[h.platform]) acc[h.platform] = { value: 0, count: 0 }
    acc[h.platform].value += value
    acc[h.platform].count += 1
    return acc
  }, {} as Record<string, { value: number; count: number }>)
}

export function detectOverlap(holdings: Holding[]): OverlapReport {
  const equityFunds = holdings.filter(h => h.assetClass === 'equity' && h.top10Stocks && h.top10Stocks.length > 0)
  const pairs: OverlapPair[] = []

  for (let i = 0; i < equityFunds.length; i++) {
    for (let j = i + 1; j < equityFunds.length; j++) {
      const fundA = equityFunds[i]
      const fundB = equityFunds[j]
      
      const setA = new Set(fundA.top10Stocks!)
      const setB = new Set(fundB.top10Stocks!)
      const common = fundA.top10Stocks!.filter(s => setB.has(s))
      const overlapPct = (common.length / 10) * 100

      if (overlapPct > 30) {
        pairs.push({
          fundA: fundA.name,
          fundB: fundB.name,
          commonStocks: common,
          overlapPct: Math.round(overlapPct),
        })
      }
    }
  }

  let severity: 'low' | 'medium' | 'high' = 'low'
  if (pairs.some(p => p.overlapPct >= 70)) severity = 'high'
  else if (pairs.some(p => p.overlapPct >= 50)) severity = 'medium'

  return { pairs, severity }
}

export function getMaxHoldingPct(holdings: Holding[]): number {
  const totalValue = getPortfolioValue(holdings)
  if (totalValue === 0) return 0
  
  const maxHolding = Math.max(...holdings.map(h => (h.quantity * h.currentPrice) / totalValue * 100))
  return Math.round(maxHolding)
}

export function getBenchmarkComparison(portfolioReturn: number) {
  const nifty50Return = 12.8
  const nifty500Return = 14.2
  const goldReturn = 8.5

  return {
    vsNifty50: portfolioReturn - nifty50Return,
    vsNifty500: portfolioReturn - nifty500Return,
    vsGold: portfolioReturn - goldReturn,
    nifty50Return,
    nifty500Return,
    goldReturn,
  }
}