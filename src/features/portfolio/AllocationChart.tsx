import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ChartWrapper } from '@/components/ui/ChartWrapper'
import { formatPercent } from '@/lib/utils'
import type { Allocation } from '@/types'

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#64748b']
const NAMES = ['Equity', 'Debt', 'Gold', 'Cash']

interface AllocationChartProps {
  actual: Allocation
  target: Allocation
  title?: string
}

export function AllocationChart({ actual, target, title = 'Asset Allocation' }: AllocationChartProps) {
  const actualData = [
    { name: 'Equity', value: actual.equity, target: target.equity },
    { name: 'Debt', value: actual.debt, target: target.debt },
    { name: 'Gold', value: actual.gold, target: target.gold },
    { name: 'Cash', value: actual.cash, target: target.cash },
  ].filter(d => d.value > 0 || d.target > 0)

  const totalActual = actualData.reduce((sum, d) => sum + d.value, 0)
  const totalTarget = actualData.reduce((sum, d) => sum + d.target, 0)

  return (
    <Card className="h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-ink">{title}</h3>
        <Badge variant="outline" size="sm">vs Target</Badge>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1 lg:col-span-2 xl:col-span-1">
          <ChartWrapper height={280}>
            <PieChart>
              <Pie
                data={actualData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                nameKey="name"
                label={({ name, value }) => totalActual > 0 && value > 0 ? `${name} ${formatPercent(value)}` : ''}
                labelLine={false}
              >
                {actualData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [formatPercent(Number(value ?? 0)), 'Actual']}
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
              />
              <Legend layout="vertical" align="right" verticalAlign="middle" iconType="circle" />
            </PieChart>
          </ChartWrapper>
        </div>
        <div className="space-y-2">
          {actualData.map((item, index) => (
            <div key={item.name} className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
              <span className="text-sm font-medium text-ink w-16">{item.name}</span>
              <div className="flex-1 h-2 bg-line rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ backgroundColor: COLORS[index % COLORS.length], width: `${totalActual > 0 ? (item.value / totalActual) * 100 : 0}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-ink w-14 text-right">{formatPercent(totalActual > 0 ? item.value / totalActual * 100 : 0)}</span>
              <span className="text-sm text-muted w-14 text-right">{formatPercent(item.target)} target</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}