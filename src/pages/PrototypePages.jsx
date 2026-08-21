import { useState } from 'react'
import { Link } from 'react-router-dom'
import Budget from '../components/Budget'
import Goals from '../components/Goals'
import Investments from '../components/Investments'
import Transactions from '../components/Transactions'
import WhatIfSimulator from '../components/WhatIfSimulator'
import { useFinance } from '../context/FinanceContext.jsx'
import { validateGoal, validateTransaction } from '../utils/finance'

function PageFrame({ title, children }) {
  return (
    <div className="app-shell route-shell">
      <header className="topbar">
        <Link className="brand" to="/">✦ Arthiq</Link>
        <Link className="outline-button" to="/">Back to dashboard</Link>
      </header>
      <main className="route-content">
        <p className="eyebrow">Arthiq workspace</p>
        <h1 className="route-title">{title}</h1>
        {children}
      </main>
    </div>
  )
}

export function GoalsPage() {
  const { goals, addGoal, updateGoal, deleteGoal, addMoneyToGoal } = useFinance()
  const [form, setForm] = useState({ name: '', target: '', current: '0', deadline: '', icon: '✦' })
  const [errors, setErrors] = useState({})

  const submit = (event) => {
    event.preventDefault()
    const nextErrors = validateGoal(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    addGoal({ ...form, target: Number(form.target), current: Number(form.current) })
    setForm({ name: '', target: '', current: '0', deadline: '', icon: '✦' })
  }

  return (
    <PageFrame title="Goals">
      <Goals goals={goals} onAddMoney={(id) => addMoneyToGoal(id, 10000)} />
      <form className="card prototype-form" onSubmit={submit} noValidate>
        <h2>Create a goal</h2>
        <div className="prototype-form-grid">
          <label>Goal name<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} aria-invalid={Boolean(errors.name)} />{errors.name && <small className="form-error">{errors.name}</small>}</label>
          <label>Target amount<input type="number" min="1" value={form.target} onChange={(event) => setForm({ ...form, target: event.target.value })} aria-invalid={Boolean(errors.target)} />{errors.target && <small className="form-error">{errors.target}</small>}</label>
          <label>Already saved<input type="number" min="0" value={form.current} onChange={(event) => setForm({ ...form, current: event.target.value })} aria-invalid={Boolean(errors.current)} />{errors.current && <small className="form-error">{errors.current}</small>}</label>
          <label>Deadline<input placeholder="Dec 2027" value={form.deadline} onChange={(event) => setForm({ ...form, deadline: event.target.value })} aria-invalid={Boolean(errors.deadline)} />{errors.deadline && <small className="form-error">{errors.deadline}</small>}</label>
        </div>
        <button className="primary-button" type="submit">Create goal</button>
      </form>
      <div className="card prototype-list">
        <h2>Manage goals</h2>
        {goals.map((goal) => <div className="prototype-row" key={goal.id}><span>{goal.name}</span><div><button className="text-button" type="button" onClick={() => updateGoal(goal.id, { deadline: goal.deadline === 'Paused' ? 'Dec 2027' : 'Paused' })}>Pause / resume</button><button className="text-button danger-button" type="button" onClick={() => deleteGoal(goal.id)}>Delete</button></div></div>)}
      </div>
    </PageFrame>
  )
}

export function TransactionsPage() {
  const { transactions, addTransaction, deleteTransaction } = useFinance()
  const [form, setForm] = useState({ name: '', category: '', amount: '', date: new Date().toISOString().slice(0, 10), icon: '•' })
  const [errors, setErrors] = useState({})
  const submit = (event) => {
    event.preventDefault()
    const nextErrors = validateTransaction(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    addTransaction({ ...form, amount: Number(form.amount) })
    setForm({ name: '', category: '', amount: '', date: new Date().toISOString().slice(0, 10), icon: '•' })
  }
  return <PageFrame title="Transactions"><form className="card prototype-form" onSubmit={submit} noValidate><h2>Add transaction</h2><div className="prototype-form-grid"><label>Name<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />{errors.name && <small className="form-error">{errors.name}</small>}</label><label>Category<input value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} />{errors.category && <small className="form-error">{errors.category}</small>}</label><label>Amount<input type="number" value={form.amount} onChange={(event) => setForm({ ...form, amount: event.target.value })} />{errors.amount && <small className="form-error">{errors.amount}</small>}</label><label>Date<input type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} />{errors.date && <small className="form-error">{errors.date}</small>}</label></div><button className="primary-button" type="submit">Add transaction</button></form><Transactions transactions={transactions} /><div className="card prototype-list"><h2>Remove transactions</h2>{transactions.map((transaction) => <div className="prototype-row" key={transaction.id}><span>{transaction.name} <small>{transaction.category}</small></span><button className="text-button danger-button" type="button" onClick={() => deleteTransaction(transaction.id)}>Delete</button></div>)}</div></PageFrame>
}

export function InvestmentsPage() {
  const { investments } = useFinance()
  return <PageFrame title="Investments"><Investments investments={investments} /></PageFrame>
}

export function BudgetPage() {
  const { budget, updateBudget } = useFinance()
  const [value, setValue] = useState(budget.total)
  const save = (event) => { event.preventDefault(); if (Number(value) > 0) updateBudget(value) }
  return <PageFrame title="Budget"><form className="card prototype-form" onSubmit={save}><h2>Monthly budget</h2><label>Total budget<input type="number" min="1" value={value} onChange={(event) => setValue(event.target.value)} /></label><button className="primary-button" type="submit">Save budget</button></form><Budget budget={budget} /></PageFrame>
}

export function PlanningPage() {
  return <PageFrame title="Planning tools"><WhatIfSimulator /></PageFrame>
}

export function ProfilePage() {
  const { profile, resetFinanceState } = useFinance()
  return <PageFrame title="Profile and settings"><section className="card prototype-list"><h2>{profile.personality}</h2><p className="muted">Your assessment and financial workspace are stored locally on this device.</p><button className="outline-button" type="button" onClick={resetFinanceState}>Reset demo data</button></section></PageFrame>
}
