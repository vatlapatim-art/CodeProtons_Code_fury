'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Input, Select } from '@/components/ui/Input'
import { Progress } from '@/components/ui/Progress'
import { Badge } from '@/components/ui/Badge'
import { formatCurrency, formatPercent } from '@/lib/utils'
import { requiredSIP, futureValue, timeToGoal, getExpectedReturn } from '@/lib/sipCalculator'
import { confidenceMonteCarlo, getConfidenceLabel, getConfidenceColor } from '@/lib/confidenceEngine'
import type { RiskProfile } from '@/types'

interface SIPCalculatorProps {
  initialTarget?: number
  initialDate?: string
  riskProfile?: RiskProfile
  onCalculate?: (result: SIPResult) => void
}

interface SIPResult {
  monthlySIP: number
  futureValue: number
  yearsToGoal: number
  confidence: number
  confidenceLabel: string
  confidenceColor: 'success' | 'warning' | 'error'
}

const goalPresets = [
  { label: 'New Home', target: 3000000, years: 5 },
  { label: 'Retirement', target: 10000000, years: 20 },
  { label: 'Child Education', target: 5000000, years: 10 },
  { label: 'Emergency Fund', target: 500000, years: 2 },
  { label: 'Custom Goal', target: 0, years: 5 },
]

export function SIPCalculator({ initialTarget, initialDate, riskProfile, onCalculate }: SIPCalculatorProps) {
  const [goalType, setGoalType] = useState('Custom Goal')
  const [targetAmount, setTargetAmount] = useState(initialTarget || 1000000)
  const [targetYears, setTargetYears] = useState(initialDate ? Math.max(1, Math.ceil((new Date(initialDate).getTime() - Date.now()) / (365 * 24 * 60 * 60 * 1000))) : 5)
  const [result, setResult] = useState<SIPResult | null>(null)

  useEffect(() => {
    const preset = goalPresets.find(p => p.label === goalType)
    if (preset && preset.target > 0) {
      setTargetAmount(preset.target)
      setTargetYears(preset.years)
    }
    calculate()
  }, [goalType, targetAmount, targetYears, riskProfile])

  const calculate = () => {
    const annualRate = riskProfile ? getExpectedReturn(riskProfile.tier) : 12
    const monthlySIP = requiredSIP(annualRate, targetYears, targetAmount)
    const fv = futureValue(monthlySIP, annualRate, targetYears)
    const confidence = confidenceMonteCarlo({ monthlySIP, annualRate, years: targetYears, targetAmount, riskProfile: riskProfile || { tier: 'moderate', allocation: { equity: 60, debt: 25, gold: 10, cash: 5 }, confidence: 70, score: 50 } })
    
    const newResult: SIPResult = {
      monthlySIP,
      futureValue: fv,
      yearsToGoal: targetYears,
      confidence,
      confidenceLabel: getConfidenceLabel(confidence),
      confidenceColor: getConfidenceColor(confidence),
    }
    setResult(newResult)
    onCalculate?.(newResult)
  }

  return (
    <Card className="p-6">
      <h3 className="font-semibold text-ink mb-4 flex items-center gap-2">
        <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
        </span>
        SIP Calculator
      </h3>

      <div className="space-y-4 mb-6">
        <Select
          label="Goal Type"
          value={goalType}
          onChange={(e) => setGoalType(e.target.value)}
          options={goalPresets.map(p => ({ value: p.label, label: p.label }))}
        />
        <Input
          label="Target Amount (₹)"
          type="number"
          value={targetAmount}
          onChange={(e) => setTargetAmount(Number(e.target.value) || 0)}
          placeholder="10,00,000"
        />
        <Input
          label="Target Years"
          type="number"
          min="1"
          max="40"
          value={targetYears}
          onChange={(e) => setTargetYears(Number(e.target.value) || 1)}
        />
      </div>

      {result && (
        <div className="space-y-4 pt-4 border-t border-line">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-primary/5 rounded-xl">
              <p className="text-2xl font-bold text-primary">{formatCurrency(result.monthlySIP, { compact: true })}/mo</p>
              <p className="text-sm text-muted">Monthly SIP Required</p>
            </div>
            <div className="text-center p-4 bg-secondary/5 rounded-xl">
              <p className="text-2xl font-bold text-secondary">{formatCurrency(result.futureValue, { compact: true })}</p>
              <p className="text-sm text-muted">Projected Value</p>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted">Confidence Level</span>
              <span className="font-semibold text-ink">{result.confidenceLabel} ({result.confidence}%)</span>
            </div>
            <Progress value={result.confidence} color={result.confidenceColor} size="md" showLabel />
            <p className="text-xs text-muted mt-1 text-center">
              Based on {riskProfile?.tier || 'moderate'} profile with {getExpectedReturn(riskProfile?.tier || 'moderate')}% expected return
            </p>
          </div>

          <div className="p-3 bg-line/50 rounded-lg">
            <p className="text-sm text-muted">
              <strong>Time to goal:</strong> {result.yearsToGoal} years | 
              <strong>Total invested:</strong> {formatCurrency(result.monthlySIP * 12 * result.yearsToGoal, { compact: true })} | 
              <strong>Est. gains:</strong> {formatCurrency(result.futureValue - result.monthlySIP * 12 * result.yearsToGoal, { compact: true })}
            </p>
          </div>
        </div>
      )}
    </Card>
  )
}