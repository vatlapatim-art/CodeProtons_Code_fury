import { HTMLAttributes, forwardRef } from 'react'
import { ResponsiveContainer } from 'recharts'

interface ChartWrapperProps extends HTMLAttributes<HTMLDivElement> {
  height?: number | string
  width?: number | string
}

export const ChartWrapper = forwardRef<HTMLDivElement, ChartWrapperProps>(
  ({ className = '', height = 300, width = '100%', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`w-full ${className}`}
        style={{ height, width }}
        {...props}
      >
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    )
  }
)

ChartWrapper.displayName = 'ChartWrapper'