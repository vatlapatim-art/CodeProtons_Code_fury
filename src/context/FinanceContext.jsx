import { createContext, useContext, useMemo, useState } from 'react'
import {
  calculateDerivedFinance,
  loadFinanceState,
  newId,
  resetFinanceState as resetStoredFinanceState,
  saveFinanceState,
} from '../data/financeService'

const FinanceContext = createContext(null)

export function FinanceProvider({ children }) {
  const [state, setState] = useState(loadFinanceState)

  const updateState = (updater) => {
    setState((current) => {
      const next = typeof updater === 'function' ? updater(current) : updater
      saveFinanceState(next)
      return next
    })
  }

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
      profile: { ...current.profile, onboardingAnswers: answers, personality },
    })),
    resetFinanceState: () => setState(resetStoredFinanceState()),
  }), [])

  const value = useMemo(() => ({
    ...state,
    derived: calculateDerivedFinance(state),
    ...actions,
  }), [state, actions])

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
}

export function useFinance() {
  const context = useContext(FinanceContext)
  if (!context) {
    throw new Error('useFinance must be used inside FinanceProvider')
  }
  return context
}
