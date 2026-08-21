import { cloneElement, forwardRef, isValidElement, ButtonHTMLAttributes, ReactElement } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', loading, asChild = false, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-pill transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variants = {
      primary: 'bg-primary text-white hover:bg-blue-600 focus-visible:ring-primary shadow-soft',
      secondary: 'bg-secondary text-white hover:bg-emerald-600 focus-visible:ring-secondary',
      outline: 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 focus-visible:ring-primary',
      ghost: 'text-primary hover:bg-primary/10 focus-visible:ring-primary',
      danger: 'bg-error text-white hover:bg-red-600 focus-visible:ring-error',
    }
    
    const sizes = {
      sm: 'px-3 py-1.5 text-sm gap-1.5',
      md: 'px-5 py-2.5 text-sm gap-2',
      lg: 'px-7 py-3 text-base gap-2',
    }

    const buttonClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`
    const loadingIndicator = loading ? (
      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" />
        <path className="opacity-75" d="M12 2a10 10 0 0 1 10 10" />
      </svg>
    ) : null

    if (asChild) {
      if (!isValidElement(children)) {
        throw new Error('Button with asChild requires a single React element child')
      }

      return cloneElement(children as ReactElement<Record<string, unknown>>, {
        ...props,
        className: `${buttonClassName} ${String((children.props as { className?: string }).className ?? '')}`,
      })
    }

    return (
      <button ref={ref} className={buttonClassName} disabled={disabled || loading} {...props}>
        {loadingIndicator}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'