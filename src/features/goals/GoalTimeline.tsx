import { formatCurrency } from '@/lib/utils'

interface GoalTimelineProps {
  currentAmount: number
  targetAmount: number
  monthlySIP: number
  yearsToGoal: number
  targetDate: string
}

export function GoalTimeline({ currentAmount, targetAmount, monthlySIP, yearsToGoal, targetDate }: GoalTimelineProps) {
  const progress = targetAmount > 0 ? (currentAmount / targetAmount) * 100 : 0
  const milestones = [25, 50, 75, 100]

  const getMilestoneDate = (pct: number) => {
    const monthsNeeded = (targetAmount * pct / 100) / monthlySIP
    const date = new Date()
    date.setMonth(date.getMonth() + Math.ceil(monthsNeeded))
    return date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
  }

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-ink">Timeline</h4>
      
      <div className="relative">
        <div className="h-2 bg-line rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <div className="flex justify-between -mx-2 mt-2">
          {milestones.map((ms, i) => (
            <div key={ms} className="flex flex-col items-center px-2">
              <div className={`w-3 h-3 rounded-full border-2 ${
                progress >= ms ? 'bg-primary border-primary' : 'bg-surface border-line'
              }`} />
              <span className="text-xs text-muted mt-1">{ms}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {milestones.map((ms) => (
          <div key={ms} className={`p-3 rounded-xl text-center ${progress >= ms ? 'bg-primary/5 border border-primary/20' : 'bg-line/50'}`}>
            <p className="text-sm font-medium text-ink">{ms}% Milestone</p>
            <p className="text-lg font-bold text-primary mt-1">{formatCurrency(targetAmount * ms / 100, { compact: true })}</p>
            <p className="text-xs text-muted mt-1">~{getMilestoneDate(ms)}</p>
          </div>
        ))}
      </div>

      <div className="p-3 bg-surface rounded-xl border border-line">
        <p className="text-sm text-muted">
          <strong>Target Date:</strong> {new Date(targetDate).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })} | 
          <strong>Current:</strong> {formatCurrency(currentAmount, { compact: true })} / {formatCurrency(targetAmount, { compact: true })} ({progress.toFixed(1)}%)
        </p>
      </div>
    </div>
  )
}