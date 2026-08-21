import { HTMLAttributes, forwardRef } from 'react'

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  showLabel?: boolean
  label?: string
}

const colorClasses = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  success: 'bg-success',
  warning: 'bg-yellow-500',
  error: 'bg-error',
}

const trackClasses = {
  primary: 'bg-primary/10',
  secondary: 'bg-secondary/10',
  success: 'bg-success/10',
  warning: 'bg-yellow-100',
  error: 'bg-error/10',
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className = '', value, max = 100, size = 'md', color = 'primary', showLabel, label, ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
    
    const sizes = {
      sm: 'h-1.5',
      md: 'h-2.5',
      lg: 'h-4',
    }

    return (
      <div ref={ref} className={className} {...props}>
        {(showLabel || label) && (
          <div className="flex justify-between text-sm font-medium mb-1.5">
            <span className="text-ink">{label || `${Math.round(percentage)}%`}</span>
            {showLabel && <span className="text-muted">{Math.round(percentage)}%</span>}
          </div>
        )}
        <div className={`relative ${sizes[size]} rounded-full overflow-hidden ${trackClasses[color]}`}>
          <div
            className={`${colorClasses[color]} h-full rounded-full transition-all duration-500 ease-out`}
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={label || 'Progress'}
          />
        </div>
      </div>
    )
  }
)

Progress.displayName = 'Progress'