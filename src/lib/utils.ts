export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function formatCurrency(amount: number, options: { compact?: boolean; currency?: string } = {}): string {
  const { compact = false, currency = 'INR' } = options
  
  if (compact) {
    if (amount >= 1e7) return `₹${(amount / 1e7).toFixed(1)}Cr`
    if (amount >= 1e5) return `₹${(amount / 1e5).toFixed(1)}L`
    if (amount >= 1e3) return `₹${(amount / 1e3).toFixed(1)}K`
    return `₹${amount.toFixed(0)}`
  }
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatPercent(value: number, decimals = 1): string {
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(decimals)}%`
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-IN').format(value)
}

export function getColorForValue(value: number): 'positive' | 'negative' | 'neutral' {
  if (value > 0) return 'positive'
  if (value < 0) return 'negative'
  return 'neutral'
}

export function truncateAddress(address: string, chars = 4): string {
  if (address.length <= chars * 2) return address
  return `${address.slice(0, chars)}...${address.slice(-chars)}`
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 11)
}