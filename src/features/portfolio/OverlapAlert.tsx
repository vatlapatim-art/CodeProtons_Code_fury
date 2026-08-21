import { AlertTriangle, AlertCircle, Info } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import type { OverlapReport } from '@/types'

interface OverlapAlertProps {
  report: OverlapReport
}

const severityConfig = {
  low: { icon: Info, color: 'text-primary bg-primary/10 border-primary/20', label: 'Low', badgeVariant: 'info' as const },
  medium: { icon: AlertTriangle, color: 'text-yellow-600 bg-yellow-100 border-yellow-200', label: 'Medium', badgeVariant: 'warning' as const },
  high: { icon: AlertCircle, color: 'text-error bg-error/10 border-error/20', label: 'High', badgeVariant: 'error' as const },
}

export function OverlapAlert({ report }: OverlapAlertProps) {
  if (report.pairs.length === 0) return null

  const config = severityConfig[report.severity]
  const Icon = config.icon

  return (
    <Card className={`border-l-4 ${config.color.replace('bg-', 'bg-').replace('text-', 'border-')}`}>
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 p-2 rounded-lg ${config.color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-ink">Fund Overlap Detected</h3>
            <Badge variant={config.badgeVariant}>{config.label} Risk</Badge>
          </div>
          <p className="text-sm text-muted mb-3">
            {report.pairs.length} fund pair{report.pairs.length > 1 ? 's' : ''} share significant holdings.
            This reduces diversification — you may own the same stocks across multiple funds.
          </p>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {report.pairs.slice(0, 5).map((pair, index) => (
              <div key={index} className="p-3 bg-line/50 rounded-lg">
                <p className="text-sm font-medium text-ink">
                  <span className="text-primary">{pair.fundA}</span> & <span className="text-primary">{pair.fundB}</span>
                </p>
                <p className="text-xs text-muted mt-1">
                  {pair.overlapPct}% overlap — {pair.commonStocks.length} common stocks:
                  {pair.commonStocks.slice(0, 3).join(', ')}
                  {pair.commonStocks.length > 3 && ` +${pair.commonStocks.length - 3} more`}
                </p>
              </div>
            ))}
            {report.pairs.length > 5 && (
              <p className="text-xs text-muted text-center py-2">
                +{report.pairs.length - 5} more pairs...
              </p>
            )}
          </div>
          <p className="text-xs text-muted mt-3">
            Consider consolidating overlapping funds or replacing with diversified alternatives.
          </p>
        </div>
      </div>
    </Card>
  )
}