import {
  categories as initialCategories,
  financialData as initialFinancialData,
  goals as initialGoals,
  investments as initialInvestments,
  transactions as initialTransactions,
} from './demoData'

const STORAGE_KEY = 'arthiq-finance-state-v1'

const createId = (prefix) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

const seedState = () => ({
  profile: {
    name: 'Arthiq member',
    onboardingAnswers: [],
    personality: 'Balanced Grower',
  },
  financial: {
    ...initialFinancialData,
    debts: [
      { id: 'debt-education', name: 'Education loan', outstanding: 280000, emi: 8500, rate: 8.2 },
      { id: 'debt-credit', name: 'Credit card', outstanding: 42000, emi: 4000, rate: 24 },
    ],
    emergencyFund: { saved: 120000, target: 300000, monthlyExpenses: 42680 },
  },
  investments: initialInvestments.map((item, index) => ({
    ...item,
    id: item.id || `investment-${index + 1}`,
  })),
  goals: initialGoals.map((goal, index) => ({
    ...goal,
    id: goal.id || `goal-${index + 1}`,
  })),
  transactions: initialTransactions.map((transaction, index) => ({
    ...transaction,
    id: transaction.id || `transaction-${index + 1}`,
    date: transaction.date || '2026-08-01',
  })),
  budget: {
    total: 50000,
    categories: initialCategories.map((category, index) => ({
      ...category,
      spent: category.amount,
      limit: Math.round(category.amount / (category.percentage / 100)),
      icon: '•',
      id: category.id || `category-${index + 1}`,
    })),
  },
  notifications: [
    { id: 'notification-1', title: 'High spending detected', message: 'Dining expenses are 24% above your monthly average.', icon: '⚠️', read: false },
    { id: 'notification-2', title: 'Goal reminder', message: 'Your home goal is slightly behind its ideal monthly pace.', icon: '🎯', read: false },
    { id: 'notification-3', title: 'Portfolio update', message: 'Your investment portfolio gained 11.2% this year.', icon: '📈', read: true },
  ],
})

export const loadFinanceState = () => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : seedState()
  } catch {
    return seedState()
  }
}

export const saveFinanceState = (state) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    return false
  }

  return true
}

export const resetFinanceState = () => {
  const state = seedState()
  saveFinanceState(state)
  return state
}

export const newId = createId

export const calculateFinancialHealth = ({ financial, goals, budget }) => {
  const income = Number(financial.income) || 0
  const savings = Number(financial.savings) || 0
  const savingsRate = income > 0 ? (savings / income) * 100 : 0
  const budgetUsage = budget.total > 0
    ? (budget.categories.reduce((sum, item) => sum + item.amount, 0) / budget.total) * 100
    : 100
  const goalProgress = goals.length > 0
    ? goals.reduce((sum, goal) => sum + (goal.target > 0 ? goal.current / goal.target : 0), 0) / goals.length * 100
    : 0

  const score = Math.round(Math.max(0, Math.min(100,
    savingsRate * 1.8 + (100 - Math.min(budgetUsage, 100)) * 0.35 + goalProgress * 0.25
  )))

  return {
    score,
    savings: Math.round(Math.min(savingsRate * 2.5, 100)),
    investments: financial.health?.investments || 0,
    spending: Math.round(Math.max(0, 100 - budgetUsage)),
    savingsRate: Math.round(savingsRate * 10) / 10,
  }
}

export const calculateDerivedFinance = (state) => {
  const totalAssets = state.investments.reduce((sum, item) => sum + item.current, 0)
  const totalDebt = state.financial.debts.reduce((sum, debt) => sum + debt.outstanding, 0)
  const monthlyExpenses = state.financial.emergencyFund.monthlyExpenses
  const emergencyMonths = monthlyExpenses > 0
    ? state.financial.emergencyFund.saved / monthlyExpenses
    : 0

  return {
    health: calculateFinancialHealth(state),
    netWorth: totalAssets + state.financial.emergencyFund.saved - totalDebt,
    totalAssets,
    totalDebt,
    emergencyMonths: Math.round(emergencyMonths * 10) / 10,
    monthlySavingsRate: state.financial.income > 0
      ? Math.round((state.financial.savings / state.financial.income) * 1000) / 10
      : 0,
    totalInvestmentProfit: state.investments.reduce((sum, item) => sum + item.current - item.invested, 0),
  }
}
