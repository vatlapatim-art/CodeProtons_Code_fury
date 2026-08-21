import { Link } from 'react-router-dom'
import { useFinance } from '../context/FinanceContext.jsx'

function LandingPage() {
  const { isAuthenticated } = useFinance()

  return (
    <main className="landing-page">
      <nav className="landing-nav">
        <Link className="brand" to="/">✦ Arthiq</Link>
        <div className="landing-nav-links">
          <a href="#how-it-works">How it works</a>
          <a href="#why-arthiq">Why Arthiq</a>
        </div>
        <div className="landing-actions">
          <Link className="landing-login" to={isAuthenticated ? '/dashboard' : '/login'}>{isAuthenticated ? 'Open workspace' : 'Sign in'}</Link>
          {!isAuthenticated && <Link className="primary-button landing-cta" to="/signup">Create account →</Link>}
        </div>
      </nav>

      <section className="landing-hero">
        <div className="landing-hero-copy">
          <p className="eyebrow"><span className="live-dot" /> Built for the way real life moves</p>
          <h1>Your money,<br /><em>made visible.</em></h1>
          <p className="landing-lead">Arthiq brings your spending, savings, goals, and investments into one calm place, so every decision feels a little more possible.</p>
          <div className="landing-hero-actions"><Link className="primary-button" to={isAuthenticated ? '/dashboard' : '/signup'}>{isAuthenticated ? 'Open your dashboard →' : 'Build your money profile →'}</Link><span>Private by design · Local workspace</span></div>
        </div>
        <div className="landing-preview" aria-label="Preview of the Arthiq financial dashboard">
          <div className="preview-topline"><span>Financial health</span><strong>78 <small>/ 100</small></strong></div>
          <div className="preview-ring"><span>Good<br /><small>momentum</small></span></div>
          <div className="preview-metrics"><div><small>Monthly savings</small><strong>₹22,320</strong><span>+8.4% this month</span></div><div><small>Portfolio value</small><strong>₹9,04,450</strong><span>+11.2% this year</span></div></div>
          <div className="preview-chart"><i /><i /><i /><i /><i /><i /><i /></div>
          <div className="preview-float">✦ <span>One clear view of your next move</span></div>
        </div>
      </section>

      <section className="landing-proof" id="why-arthiq"><p className="eyebrow">The money system you can actually return to</p><div className="landing-proof-grid"><div><strong>01</strong><h2>See the whole picture</h2><p>Know where your money is going and what it is building toward.</p></div><div><strong>02</strong><h2>Turn intent into a plan</h2><p>Make goals tangible with clear monthly targets and projections.</p></div><div><strong>03</strong><h2>Move with confidence</h2><p>Use thoughtful signals instead of noise to make your next decision.</p></div></div></section>

      <section className="landing-how" id="how-it-works"><div><p className="eyebrow">A better starting point</p><h2>From scattered numbers<br /><em>to a steady rhythm.</em></h2></div><div className="landing-steps"><div><span>1</span><p>Create your profile</p><small>Tell Arthiq what matters to you.</small></div><div><span>2</span><p>Understand your health</p><small>See the signals behind your money.</small></div><div><span>3</span><p>Take the next step</p><small>Plan, adjust, and keep moving.</small></div></div></section>

      <section className="landing-footer-cta"><p className="eyebrow">Your clearer financial life starts here</p><h2>Ready to meet your money<br /><em>with more clarity?</em></h2><Link className="primary-button" to={isAuthenticated ? '/dashboard' : '/signup'}>{isAuthenticated ? 'Open Arthiq →' : 'Create your account →'}</Link></section>
      <footer className="landing-footer"><span>© 2026 Arthiq</span><span>Understand more. Worry less.</span></footer>
    </main>
  )
}

export default LandingPage
