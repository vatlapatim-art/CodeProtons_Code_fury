import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { CheckCircle, AlertCircle, Info, Lightbulb } from 'lucide-react'
import { generateInsights } from '@/lib/insightEngine'
import type { Insight, InsightContext } from '@/types'

interface InsightPanelProps {
  context: InsightContext
}

const insightIcons = {
  positive: CheckCircle,
  warning: AlertCircle,
  info: Info,
}

const insightColors = {
  positive: 'text-success bg-success/10 border-success/20',
  warning: 'text-yellow-600 bg-yellow-100 border-yellow-200',
  info: 'text-primary bg-primary/10 border-primary/20',
}

export function InsightPanel({ context }: InsightPanelProps) {
  const insights = generateInsights(context)

  if (insights.length === 0) return null

  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-ink">Insights</h3>
        <Badge variant="outline" size="sm">Confidence Layer</Badge>
      </div>
      <div className="space-y-3">
        {insights.map((insight, index) => {
          const Icon = insightIcons[insight.type]
          const colorClasses = insightColors[insight.type]
          
          return (
            <div key={index} className={`p-4 rounded-xl border ${colorClasses}`}>
              <div className="flex gap-3">
                <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-ink">{insight.title}</p>
                  <p className="text-sm text-muted mt-1">{insight.detail}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}