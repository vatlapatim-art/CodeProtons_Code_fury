export const formatCurrency = (value) =>
  `₹${Math.round(Number(value) || 0).toLocaleString('en-IN')}`

export const formatPercentage = (value) =>
  `${Math.round((Number(value) || 0) * 10) / 10}%`

export const validateGoal = (goal) => {
  const errors = {}
  if (!goal.name?.trim()) errors.name = 'Enter a goal name.'
  if (!Number.isFinite(Number(goal.target)) || Number(goal.target) <= 0) {
    errors.target = 'Target must be greater than zero.'
  }
  if (!Number.isFinite(Number(goal.current)) || Number(goal.current) < 0) {
    errors.current = 'Saved amount cannot be negative.'
  }
  if (Number(goal.current) > Number(goal.target)) {
    errors.current = 'Saved amount cannot exceed the target.'
  }
  if (!goal.deadline?.trim()) errors.deadline = 'Enter a deadline.'
  return errors
}

export const validateTransaction = (transaction) => {
  const errors = {}
  if (!transaction.name?.trim()) errors.name = 'Enter a transaction name.'
  if (!transaction.category?.trim()) errors.category = 'Choose a category.'
  if (!Number.isFinite(Number(transaction.amount)) || Number(transaction.amount) === 0) {
    errors.amount = 'Amount must be a non-zero number.'
  }
  if (!transaction.date || Number.isNaN(Date.parse(transaction.date))) {
    errors.date = 'Enter a valid date.'
  }
  return errors
}

export const validateBudget = (value) => {
  if (!Number.isFinite(Number(value)) || Number(value) <= 0) {
    return 'Budget must be greater than zero.'
  }
  return ''
}
