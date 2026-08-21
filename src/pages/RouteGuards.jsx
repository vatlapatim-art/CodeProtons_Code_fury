import { Navigate, useLocation } from 'react-router-dom'
import { useFinance } from '../context/FinanceContext.jsx'

export function ProtectedRoute({ children }) {
  const { isAuthenticated, profile } = useFinance()
  const location = useLocation()
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  if (profile.onboardingCompleted && location.pathname === '/onboarding') return <Navigate to="/dashboard" replace />
  if (!profile.onboardingCompleted && location.pathname !== '/onboarding') return <Navigate to="/onboarding" replace />
  return children
}

export function AuthenticatedRedirect({ children }) {
  const { isAuthenticated, profile } = useFinance()
  if (!isAuthenticated) return children
  return <Navigate to={profile.onboardingCompleted ? '/dashboard' : '/onboarding'} replace />
}

export function NotFoundPage() {
  return <main className="error-state"><p className="eyebrow">404 / page not found</p><h1>This page took a wrong turn.</h1><p>Return to Arthiq and continue with your financial workspace.</p><a className="primary-button" href="/">Back to Arthiq</a></main>
}
