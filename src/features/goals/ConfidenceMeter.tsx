import { Progress } from '@/components/ui/Progress'
import { Badge } from '@/components/ui/Badge'
import { getConfidenceLabel, getConfidenceColor } from '@/lib/confidenceEngine'
import type { RiskProfile } from '@/types'

interface ConfidenceMeterProps {
  confidence: number
  monthlySIP: number
  targetAmount: number
  yearsToGoal: number
  riskProfile?: RiskProfile
  compact?: boolean
}

export function ConfidenceMeter({ confidence, monthlySIP, targetAmount, yearsToGoal, riskProfile, compact = false }: ConfidenceMeterProps) {
  const label = getConfidenceLabel(confidence)
  const color = getConfidenceColor(confidence)

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <Progress value={confidence} color={color} size="sm" showLabel label={`${confidence}%`} />
        <Badge variant={color === 'success' ? 'success' : color === 'warning' ? 'warning' : 'error'} size="sm">
          {label}
        </Badge>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-ink">Success Probability</p>
          <p className="text-sm text-muted">Monte Carlo simulation (200 runs)</p>
        </div>
        <Badge variant={color === 'success' ? 'success' : color === 'warning' ? 'warning' : 'error'} size="lg">
          {label} ({confidence}%)
        </Badge>
      </div>

      <Progress value={confidence} color={color} size="lg" showLabel label={`${confidence}% chance of reaching goal`} />

      <div className="grid grid-cols-3 gap-4 text-center p-4 bg-line/50 rounded-xl">
        <div>
          <p className="text-2xl font-bold text-primary">{monthlySIP.toLocaleString('en-IN')}/mo</p>
          <p className="text-xs text-muted">Monthly SIP</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-secondary">{yearsToGoal} yrs</p>
          <p className="text-xs text-muted">Time Horizon</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-ink">{confidence}%</p>
          <p className="text-xs text-muted">Confidence</p>
        </div>
      </div>

      <p className="text-sm text-muted text-center">
        Based on {riskProfile?.tier || 'moderate'} profile • {formatCurrency(monthlySIP * 12 * yearsToGoal)} total invested
      </p>
    </div>
  )
}

import { formatCurrency } from '@/lib/utils'