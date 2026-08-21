'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, RefreshCw, Shield, TrendingUp, Target } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { useRiskStore } from '../../hooks/stores'
import { getRiskTierDescription } from '../../lib/riskEngine'
import type { RiskProfile } from '../../types'

export function RiskResults() {
  const { riskProfile } = useRiskStore()

  if (!riskProfile) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <p className="text-muted mb-4">No risk profile found. Please complete the quiz first.</p>
        <Button asChild>
          <Link href="/onboarding/quiz">Take Risk Quiz <ArrowRight className="w-4 h-4 ml-2" /></Link>
        </Button>
      </div>
    )
  }

  const tierLabels = {
    conservative: 'Conservative',
    moderate: 'Moderate',
    aggressive: 'Aggressive',
  }

  const tierColors = {
    conservative: 'text-blue-600 bg-blue-100',
    moderate: 'text-emerald-600 bg-emerald-100',
    aggressive: 'text-orange-600 bg-orange-100',
  }

  const tierIcons = {
    conservative: Shield,
    moderate: Target,
    aggressive: TrendingUp,
  }

  const TierIcon = tierIcons[riskProfile.tier]

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-24 h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <TierIcon className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-ink mb-2">Your Investor Profile</h1>
        <div className="flex items-center justify-center gap-2 mb-4">
          <Badge variant="primary" className="text-lg px-4 py-1.5">
            {tierLabels[riskProfile.tier]}
          </Badge>
          <Badge variant="outline" className="text-lg px-4 py-1.5">
            Confidence: {riskProfile.confidence}%
          </Badge>
        </div>
        <p className="text-muted max-w-md mx-auto">{getRiskTierDescription(riskProfile.tier)}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 gap-4"
      >
        <Card className="text-center p-4">
          <p className="text-3xl font-bold text-primary">{riskProfile.allocation.equity}%</p>
          <p className="text-sm text-muted">Equity</p>
        </Card>
        <Card className="text-center p-4">
          <p className="text-3xl font-bold text-secondary">{riskProfile.allocation.debt}%</p>
          <p className="text-sm text-muted">Debt</p>
        </Card>
        <Card className="text-center p-4">
          <p className="text-3xl font-bold text-yellow-500">{riskProfile.allocation.gold}%</p>
          <p className="text-sm text-muted">Gold</p>
        </Card>
        <Card className="text-center p-4">
          <p className="text-3xl font-bold text-muted">{riskProfile.allocation.cash}%</p>
          <p className="text-sm text-muted">Cash</p>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-4 bg-surface rounded-xl border border-line"
      >
        <h3 className="font-semibold text-ink mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Recommended Allocation
        </h3>
        <p className="text-sm text-muted mb-4">
          Based on your {riskProfile.tier} profile, this allocation balances risk and return
          for your time horizon and loss tolerance.
        </p>
        <div className="space-y-3">
          {[
            { label: 'Equity', value: riskProfile.allocation.equity, color: 'primary' },
            { label: 'Debt', value: riskProfile.allocation.debt, color: 'secondary' },
            { label: 'Gold', value: riskProfile.allocation.gold, color: 'warning' },
            { label: 'Cash', value: riskProfile.allocation.cash, color: 'default' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="w-20 text-sm font-medium text-ink">{item.label}</span>
              <div className="flex-1 h-2 bg-line rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    item.color === 'primary' ? 'bg-primary' :
                    item.color === 'secondary' ? 'bg-secondary' :
                    item.color === 'warning' ? 'bg-yellow-500' : 'bg-muted'
                  }`}
                  style={{ width: `${item.value}%` }}
                />
              </div>
              <span className="w-10 text-sm font-semibold text-ink text-right">{item.value}%</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Button variant="outline" onClick={() => window.location.href = '/onboarding/quiz'}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Retake Quiz
        </Button>
        <Button size="lg" asChild className="flex-1">
          <Link href="/onboarding/connect">Connect Accounts <ArrowRight className="w-4 h-4 ml-2" /></Link>
        </Button>
      </motion.div>
    </div>
  )
}
