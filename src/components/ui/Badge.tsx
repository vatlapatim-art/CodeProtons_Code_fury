import { HTMLAttributes, forwardRef } from 'react'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'primary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  dot?: boolean
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className = '', variant = 'default', size = 'md', dot, children, ...props }, ref) => {
    const variants = {
      default: 'bg-line text-ink',
      success: 'bg-success/10 text-success border border-success/20',
      warning: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
      error: 'bg-error/10 text-error border border-error/20',
      info: 'bg-blue-100 text-blue-700 border border-blue-200',
      primary: 'bg-primary/10 text-primary border border-primary/20',
      outline: 'bg-transparent text-muted border border-line',
    }
    
    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
      lg: 'px-3 py-1.5 text-base',
    }

    return (
      <span
        ref={ref}
        className={`
          inline-flex items-center gap-1.5 font-medium rounded-pill border
          ${variants[variant]} ${sizes[size]} ${className}
        `}
        {...props}
      >
        {dot && <span className={`w-1.5 h-1.5 rounded-full ${variants[variant].includes('success') ? 'bg-success' : variants[variant].includes('error') ? 'bg-error' : variants[variant].includes('warning') ? 'bg-yellow-500' : variants[variant].includes('info') ? 'bg-blue-500' : 'bg-primary'}`} />}
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'