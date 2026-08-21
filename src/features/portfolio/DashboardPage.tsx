'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Target, AlertTriangle, Lightbulb, RefreshCw, Download } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { PageContainer } from '@/components/layout/PageContainer'
import { KPICards } from './KPICards'
import { AllocationChart } from './AllocationChart'
import { HoldingsTable } from './HoldingsTable'
import { OverlapAlert } from './OverlapAlert'
import { BenchmarkChart } from './BenchmarkChart'
import { InsightPanel } from './InsightPanel'
import { useRiskStore, useGoalsStore } from '@/hooks/stores'
import { seedMockPortfolio } from '@/data/mockPortfolio'
import { getAllocation, getPortfolioValue, getPortfolioReturn, detectOverlap, getMaxHoldingPct, getBenchmarkComparison } from '@/lib/portfolioCalcs'
import { useToast } from '@/components/ui/Toast'
import type { Holding, RiskProfile } from '@/types'

export function DashboardPage() {
  const { riskProfile } = useRiskStore()
  const { goals } = useGoalsStore()
  const { toast } = useToast()
  
  const [holdings, setHoldings] = useState<Holding[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('portfolio')
    if (stored) {
      setHoldings(JSON.parse(stored))
    } else {
      setHoldings(seedMockPortfolio())
    }
    setLoading(false)
  }, [])

  const allocation = getAllocation(holdings)
  const portfolioValue = getPortfolioValue(holdings)
  const portfolioReturn = getPortfolioReturn(holdings)
  const overlapReport = detectOverlap(holdings)
  const maxHoldingPct = getMaxHoldingPct(holdings)
  const benchmark = getBenchmarkComparison(portfolioReturn)

  const insightContext = {
    sharpe: 1.2,
    maxHoldingPct,
    overlapSeverity: overlapReport.severity,
    startedSIPWithoutQuiz: !riskProfile,
    hasEmergencyFund: goals.some(g => g.name.toLowerCase().includes('emergency')),
    portfolioReturn,
    benchmarkReturn: benchmark.nifty50Return,
  }

  if (loading) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
        </div>
      </PageContainer>
    )
  }

  const totalInvested = holdings.reduce((sum, h) => sum + h.quantity * h.avgPrice, 0)
  const totalPnL = portfolioValue - totalInvested
  const totalPnLPct = totalInvested > 0 ? (totalPnL / totalInvested) * 100 : 0

  const kpiData = [
    {
      label: 'Total Value',
      value: portfolioValue,
      change: totalPnLPct,
      icon: TrendingUp,
      formatter: (v: number) => v.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }),
    },
    {
      label: 'Today\'s P&L',
      value: totalPnL,
      change: totalPnLPct,
      icon: Target,
      formatter: (v: number) => v.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }),
    },
    {
      label: 'Equity %',
      value: allocation.equity,
      change: riskProfile ? allocation.equity - riskProfile.allocation.equity : 0,
      icon: AlertTriangle,
      formatter: (v: number) => `${v}%`,
    },
    {
      label: 'Diversification',
      value: Math.max(0, 100 - (overlapReport.severity === 'high' ? 30 : overlapReport.severity === 'medium' ? 15 : 0)),
      change: 0,
      icon: Lightbulb,
      formatter: (v: number) => `${v}%`,
    },
  ]

  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
          <div>
            <h1 className="text-2xl font-bold text-ink">Dashboard</h1>
            <p className="text-muted">Complete view of your consolidated portfolio</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="outline" size="sm" onClick={() => { setHoldings(seedMockPortfolio()); toast({ type: 'success', title: 'Refreshed' }) }}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        <KPICards data={kpiData} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div className="lg:col-span-2 space-y-6">
            <AllocationChart actual={allocation} target={riskProfile?.allocation || { equity: 60, debt: 25, gold: 10, cash: 5 }} />
            <HoldingsTable holdings={holdings} />
          </motion.div>
          <motion.div className="space-y-6">
            <OverlapAlert report={overlapReport} />
            <BenchmarkChart portfolioReturn={portfolioReturn} />
            <InsightPanel context={insightContext} />
          </motion.div>
        </div>
      </motion.div>
    </PageContainer>
  )
}