import type { Insight, InsightContext, RedFlag } from '@/types'

export function generateInsights(ctx: InsightContext): Insight[] {
  const insights: Insight[] = []

  if (ctx.sharpe > 1) {
    insights.push({
      type: 'positive',
      title: 'Good risk-adjusted returns',
      detail: `Sharpe ratio of ${ctx.sharpe.toFixed(1)} means you're well compensated for risk taken.`
    })
  }

  if (ctx.maxHoldingPct > 30) {
    insights.push({
      type: 'warning',
      title: 'Concentration risk detected',
      detail: `Your largest holding is ${ctx.maxHoldingPct}% of portfolio. Consider diversifying.`
    })
  }

  if (ctx.overlapSeverity === 'high') {
    insights.push({
      type: 'warning',
      title: 'High fund overlap',
      detail: 'Multiple funds hold the same stocks. This reduces diversification benefits.'
    })
  } else if (ctx.overlapSeverity === 'medium') {
    insights.push({
      type: 'info',
      title: 'Moderate fund overlap',
      detail: 'Some funds share holdings. Review for unnecessary duplication.'
    })
  }

  if (ctx.startedSIPWithoutQuiz) {
    insights.push({
      type: 'warning',
      title: 'SIP started without risk assessment',
      detail: 'Equity can drop 20%+ in bad years. Take the 2-min risk quiz to understand your tolerance.'
    })
  }

  if (!ctx.hasEmergencyFund) {
    insights.push({
      type: 'info',
      title: 'Build emergency fund first',
      detail: 'Keep 3–6 months expenses in liquid assets before long-term investing.'
    })
  }

  if (ctx.portfolioReturn < ctx.benchmarkReturn - 2) {
    insights.push({
      type: 'warning',
      title: 'Underperforming benchmark',
      detail: `Portfolio trails benchmark by ${(ctx.benchmarkReturn - ctx.portfolioReturn).toFixed(1)}%. Consider reviewing fund selection.`
    })
  }

  if (ctx.portfolioReturn > ctx.benchmarkReturn + 2) {
    insights.push({
      type: 'positive',
      title: 'Beating the benchmark',
      detail: `Portfolio outperforms benchmark by ${(ctx.portfolioReturn - ctx.benchmarkReturn).toFixed(1)}%.`
    })
  }

  return insights.slice(0, 5)
}

export function detectRedFlags(holdings: any[]): RedFlag[] {
  const flags: RedFlag[] = []

  const equityHoldings = holdings.filter(h => h.assetClass === 'equity')
  
  equityHoldings.forEach(h => {
    const volatility = (h.currentPrice - h.avgPrice) / h.avgPrice * 100
    if (volatility > 80) {
      flags.push({
        type: 'meme_stock',
        message: `${h.symbol} shows extreme volatility (${volatility.toFixed(0)}%). Are you comfortable with this risk?`,
        severity: 'high'
      })
    }
  })

  const sectorExposure = equityHoldings.reduce((acc, h) => {
    const sector = h.sector || 'Unknown'
    acc[sector] = (acc[sector] || 0) + h.quantity * h.currentPrice
    return acc
  }, {} as Record<string, number>)

  const totalEquity = (Object.values(sectorExposure) as number[]).reduce((a, b) => a + b, 0)
  ;(Object.entries(sectorExposure) as [string, number][]).forEach(([sector, value]) => {
    const pct = (value / totalEquity) * 100
    if (pct > 40) {
      flags.push({
        type: 'sector_concentration',
        message: `Heavy ${sector} exposure (${pct.toFixed(0)}%). Diversify across sectors.`,
        severity: 'medium'
      })
    }
  })

  const hasLeverage = holdings.some(h => h.isPledged || h.isMargin)
  if (hasLeverage) {
    flags.push({
      type: 'leverage',
      message: 'Borrowed money amplifies losses. Ensure you understand margin/pledge risks.',
      severity: 'high'
    })
  }

  const hasNominee = holdings.every(h => h.nominee)
  if (!hasNominee) {
    flags.push({
      type: 'missing_nominee',
      message: 'Some holdings lack nominees. Add nominees to avoid legal complications.',
      severity: 'medium'
    })
  }

  return flags
}