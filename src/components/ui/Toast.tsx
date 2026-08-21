'use client'

import { useState, useEffect, useCallback, createContext, useContext } from 'react'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
}

interface ToastProps {
  toast: Toast
  onClose: (id: string) => void
}

const icons = {
  success: <CheckCircle className="w-5 h-5 text-success" />,
  error: <AlertCircle className="w-5 h-5 text-error" />,
  warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
  info: <Info className="w-5 h-5 text-primary" />,
}

const colors = {
  success: 'border-success/20 bg-success/5',
  error: 'border-error/20 bg-error/5',
  warning: 'border-yellow-200 bg-yellow-50',
  info: 'border-primary/20 bg-primary/5',
}

function ToastItem({ toast, onClose }: ToastProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(() => onClose(toast.id), 300)
    }, toast.duration ?? 5000)
    return () => clearTimeout(timer)
  }, [toast, onClose])

  if (!visible) return null

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 z-[100] flex items-start gap-3 p-4 rounded-xl shadow-xl border min-w-[300px] max-w-md animate-slide-in',
        colors[toast.type]
      )}
      role="alert"
      aria-live="polite"
    >
      <div className="flex-shrink-0 mt-0.5">{icons[toast.type]}</div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-ink">{toast.title}</p>
        {toast.message && <p className="text-sm text-muted mt-0.5">{toast.message}</p>}
      </div>
      <button
        onClick={() => { setVisible(false); setTimeout(() => onClose(toast.id), 300) }}
        className="flex-shrink-0 p-1 rounded-lg text-muted hover:text-ink hover:bg-black/5 transition-colors"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
      <style jsx global>{`
        @keyframes slide-in { from { opacity: 0; transform: translateX(100%); } to { opacity: 1; transform: translateX(0); } }
        .animate-slide-in { animation: slide-in 0.3s ease-out; }
      `}</style>
    </div>
  )
}

interface ToastContextType {
  toasts: Toast[]
  toast: (toast: Omit<Toast, 'id'>) => void
  dismiss: (id: string) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).slice(2)
    setToasts((prev) => [...prev, { ...toast, id }])
  }, [])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, toast: addToast, dismiss }}>
      {children}
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onClose={dismiss} />
      ))}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within ToastProvider')
  return context
}