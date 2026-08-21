import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import {
  calculateDerivedFinance,
  loadFinanceState,
  getLocalSession,
  loginLocalUser,
  newId,
  logoutLocalUser,
  registerLocalUser,
  resetFinanceState as resetStoredFinanceState,
  saveFinanceState,
} from '../data/financeService'

const FinanceContext = createContext(null)

export function FinanceProvider({ children }) {
  const [user, setUser] = useState(getLocalSession)
  const [state, setState] = useState(() => loadFinanceState(getLocalSession()?.id))
  const [authLoading, setAuthLoading] = useState(false)

  const updateState = useCallback((updater) => {
    setState((current) => {
      const next = typeof updater === 'function' ? updater(current) : updater
      saveFinanceState(next, user?.id)
      return next
    })
  }, [user])

  const actions = useMemo(() => ({
    addGoal: (goal) => updateState((current) => ({
      ...current,
      goals: [...current.goals, { ...goal, id: newId('goal'), current: Number(goal.current) || 0 }],
    })),
    updateGoal: (id, changes) => updateState((current) => ({
      ...current,
      goals: current.goals.map((goal) => goal.id === id ? { ...goal, ...changes } : goal),
    })),
    deleteGoal: (id) => updateState((current) => ({
      ...current,
      goals: current.goals.filter((goal) => goal.id !== id),
    })),
    addMoneyToGoal: (id, amount) => updateState((current) => ({
      ...current,
      goals: current.goals.map((goal) => goal.id === id
        ? { ...goal, current: Math.min(goal.current + Number(amount), goal.target) }
        : goal),
    })),
    addTransaction: (transaction) => updateState((current) => ({
      ...current,
      transactions: [{ ...transaction, id: newId('transaction') }, ...current.transactions],
    })),
    deleteTransaction: (id) => updateState((current) => ({
      ...current,
      transactions: current.transactions.filter((transaction) => transaction.id !== id),
    })),
    updateBudget: (total) => updateState((current) => ({
      ...current,
      budget: { ...current.budget, total: Number(total) },
    })),
    markNotificationRead: (id) => updateState((current) => ({
      ...current,
      notifications: current.notifications.map((notification) => notification.id === id
        ? { ...notification, read: true }
        : notification),
    })),
    markAllNotificationsRead: () => updateState((current) => ({
      ...current,
      notifications: current.notifications.map((notification) => ({ ...notification, read: true })),
    })),
    saveOnboarding: (answers, personality) => updateState((current) => ({
      ...current,
      profile: { ...current.profile, onboardingAnswers: answers, personality, onboardingCompleted: true },
    })),
    resetFinanceState: () => setState(resetStoredFinanceState(user?.id)),
    signUp: (credentials) => {
      setAuthLoading(true)
      const result = registerLocalUser(credentials)
      if (result.user) {
        setUser(result.user)
        setState(loadFinanceState(result.user.id))
      }
      setAuthLoading(false)
      return result
    },
    signIn: (credentials) => {
      setAuthLoading(true)
      const result = loginLocalUser(credentials)
      if (result.user) {
        setUser(result.user)
        setState(loadFinanceState(result.user.id))
      }
      setAuthLoading(false)
      return result
    },
    signOut: () => {
      logoutLocalUser()
      setUser(null)
      setState(loadFinanceState())
    },
  }), [updateState, user])

  const value = useMemo(() => ({
    ...state,
    user,
    authLoading,
    isAuthenticated: Boolean(user),
    derived: calculateDerivedFinance(state),
    ...actions,
  }), [state, actions, authLoading, user])

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
}

export function useFinance() {
  const context = useContext(FinanceContext)
  if (!context) {
    throw new Error('useFinance must be used inside FinanceProvider')
  }
  return context
}
