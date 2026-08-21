import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useFinance } from '../context/FinanceContext.jsx'

const validateEmail = (email) => /\S+@\S+\.\S+/.test(email)

function AuthShell({ title, description, children, alternate, alternateLabel }) {
  return (
    <main className="auth-page">
      <div className="auth-aside">
        <Link className="brand auth-brand" to="/">✦ Arthiq</Link>
        <div className="auth-aside-copy">
          <p className="eyebrow">A calmer way to build wealth</p>
          <h1>Make your money feel more <em>understandable.</em></h1>
          <p>See the whole picture, make a plan, and move forward with confidence.</p>
        </div>
        <div className="auth-orbit" aria-hidden="true"><span>₹</span><i /><b /></div>
      </div>
      <section className="auth-panel">
        <Link className="mobile-auth-brand brand" to="/">✦ Arthiq</Link>
        <div className="auth-card">
          <p className="eyebrow">Welcome to Arthiq</p>
          <h2>{title}</h2>
          <p className="auth-description">{description}</p>
          {children}
          <p className="auth-alternate">{alternate} <Link to={alternateLabel === 'Create an account' ? '/signup' : '/login'}>{alternateLabel}</Link></p>
        </div>
      </section>
    </main>
  )
}

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { signIn, authLoading } = useFinance()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const submit = (event) => {
    event.preventDefault()
    if (!validateEmail(form.email) || !form.password) {
      setError('Enter a valid email and password.')
      return
    }
    const result = signIn(form)
    if (result.error) {
      setError(result.error)
      return
    }
    navigate(location.state?.from || '/dashboard', { replace: true })
  }

  return (
    <AuthShell title="Good to see you." description="Sign in to return to your financial workspace." alternate="New to Arthiq?" alternateLabel="Create an account">
      <form className="auth-form" onSubmit={submit} noValidate>
        <label>Email address<input type="email" autoComplete="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} aria-invalid={Boolean(error)} /></label>
        <label>Password<input type="password" autoComplete="current-password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} aria-invalid={Boolean(error)} /></label>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="primary-button auth-submit" type="submit" disabled={authLoading}>{authLoading ? 'Signing in...' : 'Sign in →'}</button>
      </form>
    </AuthShell>
  )
}

export function SignupPage() {
  const navigate = useNavigate()
  const { signUp, authLoading } = useFinance()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')

  const submit = (event) => {
    event.preventDefault()
    if (!form.name.trim() || !validateEmail(form.email)) {
      setError('Enter your name and a valid email address.')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    const result = signUp(form)
    if (result.error) {
      setError(result.error)
      return
    }
    navigate('/onboarding', { replace: true })
  }

  return (
    <AuthShell title="Start with clarity." description="Create your private local workspace and build your money profile." alternate="Already have an account?" alternateLabel="Sign in">
      <form className="auth-form" onSubmit={submit} noValidate>
        <label>Your name<input type="text" autoComplete="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>
        <label>Email address<input type="email" autoComplete="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label>
        <label>Password<input type="password" autoComplete="new-password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} /></label>
        <label>Confirm password<input type="password" autoComplete="new-password" value={form.confirmPassword} onChange={(event) => setForm({ ...form, confirmPassword: event.target.value })} /></label>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="primary-button auth-submit" type="submit" disabled={authLoading}>{authLoading ? 'Creating workspace...' : 'Create account →'}</button>
      </form>
    </AuthShell>
  )
}
