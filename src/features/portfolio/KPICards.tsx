import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatCurrency, formatPercent, getColorForValue } from '@/lib/utils'
import type { FC } from 'react'

interface KPICardData {
  label: string
  value: number
  change: number
  icon: FC<{ className?: string }>
  formatter: (v: number) => string
}

interface KPICardsProps {
  data: KPICardData[]
}

export function KPICards({ data }: KPICardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group"
        >
          <Card className="h-full p-5 hover:shadow-soft transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <span className="text-sm text-muted">{item.label}</span>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-ink">{item.formatter(item.value)}</p>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium ${getColorForValue(item.change) === 'positive' ? 'text-success' : getColorForValue(item.change) === 'negative' ? 'text-error' : 'text-muted'}`}>
                  {formatPercent(item.change)}
                </span>
                <span className="text-xs text-muted">vs target</span>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

import { motion } from 'framer-motion'