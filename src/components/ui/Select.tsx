import { forwardRef, SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, className = '', children, ...props }, ref) => (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>}
      <select
        ref={ref}
        className={`w-full rounded-xl border border-line bg-surface px-3 py-2.5 text-sm text-ink focus:border-primary focus:outline-none ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && <span className="mt-1 block text-xs text-error">{error}</span>}
    </label>
  ),
)

Select.displayName = 'Select'
