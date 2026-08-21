import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card } from '@/components/ui/Card'
import { ChartWrapper } from '@/components/ui/ChartWrapper'
import { formatPercent } from '@/lib/utils'
import { getBenchmarkSeries } from '@/data/benchmarks'

interface BenchmarkChartProps {
  portfolioReturn: number
  days?: number
}

export function BenchmarkChart({ portfolioReturn, days = 30 }: BenchmarkChartProps) {
  const nifty50 = getBenchmarkSeries('nifty50', days)
  const nifty500 = getBenchmarkSeries('nifty500', days)
  const gold = getBenchmarkSeries('gold', days)

  const portfolioSeries = nifty50.map((_, i) => {
    const dailyReturn = portfolioReturn / days
    return (i + 1) * dailyReturn
  })

  const data = nifty50.map((_, i) => ({
    day: i + 1,
    Portfolio: portfolioSeries[i],
    'Nifty 50': nifty50[i],
    'Nifty 500': nifty500[i],
    Gold: gold[i],
  }))

  return (
    <Card className="h-full">
      <h3 className="font-semibold text-ink mb-4">Performance vs Benchmarks (30D)</h3>
      <ChartWrapper height={280}>
        <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickCount={6} />
          <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `${v > 0 ? '+' : ''}${v.toFixed(1)}%`} />
          <Tooltip
              formatter={(value) => [formatPercent(Number(value ?? 0)), 'Return']}
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
            labelFormatter={(day) => `Day ${day}`}
          />
          <Legend layout="horizontal" align="center" verticalAlign="bottom" iconType="circle" wrapperStyle={{ paddingTop: 10 }} />
          <Line
            type="monotone"
            dataKey="Portfolio"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
            name="Your Portfolio"
          />
          <Line
            type="monotone"
            dataKey="Nifty 50"
            stroke="#10b981"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            name="Nifty 50"
          />
          <Line
            type="monotone"
            dataKey="Nifty 500"
            stroke="#f59e0b"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            name="Nifty 500"
          />
          <Line
            type="monotone"
            dataKey="Gold"
            stroke="#64748b"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            name="Gold"
          />
        </LineChart>
      </ChartWrapper>
      <div className="mt-4 grid grid-cols-4 gap-4 text-center">
        <BenchmarkStat label="Portfolio" value={portfolioReturn} color="#3b82f6" />
        <BenchmarkStat label="Nifty 50" value={nifty50[nifty50.length - 1]} color="#10b981" />
        <BenchmarkStat label="Nifty 500" value={nifty500[nifty500.length - 1]} color="#f59e0b" />
        <BenchmarkStat label="Gold" value={gold[gold.length - 1]} color="#64748b" />
      </div>
    </Card>
  )
}

function BenchmarkStat({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <p className="text-xs text-muted">{label}</p>
      <p className="font-bold text-lg" style={{ color }}>{value >= 0 ? '+' : ''}{value.toFixed(1)}%</p>
    </div>
  )
}