import { Badge } from '@/components/ui/Badge'
import { formatCurrency, formatPercent, formatNumber, getColorForValue } from '@/lib/utils'
import type { Holding } from '@/types'

interface HoldingsTableProps {
  holdings: Holding[]
}

export function HoldingsTable({ holdings }: HoldingsTableProps) {
  const equityHoldings = holdings.filter(h => h.assetClass === 'equity')
  const debtHoldings = holdings.filter(h => h.assetClass === 'debt')
  const goldHoldings = holdings.filter(h => h.assetClass === 'gold')
  const cashHoldings = holdings.filter(h => h.assetClass === 'cash')

  const renderSection = (title: string, items: Holding[], color: string) => {
    if (items.length === 0) return null
    
    const totalValue = items.reduce((sum, h) => sum + h.quantity * h.currentPrice, 0)
    
    return (
      <tbody key={title}>
        <tr>
          <td colSpan={6} className="px-4 py-3 bg-line/50 font-medium text-ink border-b border-line">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
              {title} ({items.length}) — {formatCurrency(totalValue, { compact: true })}
            </div>
          </td>
        </tr>
        {items.map((holding) => {
          const value = holding.quantity * holding.currentPrice
          const invested = holding.quantity * holding.avgPrice
          const pnl = value - invested
          const pnlPct = invested > 0 ? (pnl / invested) * 100 : 0
          const colorClass = getColorForValue(pnl)
          
          return (
            <tr key={holding.id} className="hover:bg-line/30 transition-colors">
              <td className="px-4 py-3">
                <div>
                  <p className="font-medium text-ink">{holding.symbol}</p>
                  <p className="text-xs text-muted">{holding.name}</p>
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-muted">{holding.platform}</td>
              <td className="px-4 py-3 text-sm text-ink">{formatNumber(holding.quantity)}</td>
              <td className="px-4 py-3 text-sm text-ink">{formatCurrency(value, { compact: true })}</td>
              <td className="px-4 py-3 text-sm text-ink">{formatCurrency(invested, { compact: true })}</td>
              <td className="px-4 py-3">
                <span className={`font-medium ${colorClass === 'positive' ? 'text-success' : colorClass === 'negative' ? 'text-error' : 'text-muted'}`}>
                  {formatPercent(pnlPct)} ({formatCurrency(pnl, { compact: true })})
                </span>
              </td>
            </tr>
          )
        })}
      </tbody>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-line">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-line/50 border-b border-line">
            <th className="px-4 py-3 text-left font-medium text-muted">Symbol</th>
            <th className="px-4 py-3 text-left font-medium text-muted">Platform</th>
            <th className="px-4 py-3 text-left font-medium text-muted">Qty</th>
            <th className="px-4 py-3 text-left font-medium text-muted">Current</th>
            <th className="px-4 py-3 text-left font-medium text-muted">Invested</th>
            <th className="px-4 py-3 text-left font-medium text-muted">P&L</th>
          </tr>
        </thead>
        {renderSection('Equity', equityHoldings, '#3b82f6')}
        {renderSection('Debt', debtHoldings, '#10b981')}
        {renderSection('Gold', goldHoldings, '#f59e0b')}
        {renderSection('Cash', cashHoldings, '#64748b')}
      </table>
    </div>
  )
}