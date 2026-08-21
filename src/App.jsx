import { useState } from 'react'
import './App.css'

const holdings = [
  { name: 'Mutual funds', provider: 'Zerodha Coin', value: '₹4,82,600', change: '+12.8%', tone: 'blue' },
  { name: 'Stocks', provider: 'Groww', value: '₹2,41,850', change: '+8.4%', tone: 'green' },
  { name: 'Fixed deposits', provider: 'HDFC Bank', value: '₹1,80,000', change: '+6.5%', tone: 'yellow' },
]

const spendData = {
  Week: [42, 58, 36, 63, 48, 76, 54],
  Month: [54, 64, 42, 72, 57, 82, 68],
  Year: [38, 52, 45, 68, 58, 74, 62],
}

function App() {
  const [spendRange, setSpendRange] = useState('Month')
  const [riskStarted, setRiskStarted] = useState(false)
  const [goalProgress, setGoalProgress] = useState(62)

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Arthiq home"><span className="brand-mark">✦</span> Arthiq</a>
        <nav className="desktop-nav" aria-label="Main navigation"><a className="active" href="#overview">Overview</a><a href="#investments">Investments</a><a href="#goals">Goals</a></nav>
        <button className="invest-button" type="button">Invest now <span>↗</span></button>
      </header>

      <main id="top">
        <section className="hero" id="overview">
          <div className="hero-copy"><p className="eyebrow">Friday, 18 August 2023 <span className="live-dot" /> All systems healthy</p><h1>Take control of<br /><em>your finances.</em></h1><p className="hero-subtitle">From SIPs to portfolio consolidation, make informed decisions with confidence.</p><button className="primary-button" type="button">Get started <span>→</span></button></div>
          <div className="hero-visual" aria-label="Portfolio value chart"><div className="visual-label"><span>Portfolio value</span><strong>₹9,04,450</strong><small>+11.2% this year</small></div><svg viewBox="0 0 500 220" role="img" aria-label="Rising portfolio graph"><defs><linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#bdebdc" stopOpacity=".75" /><stop offset="1" stopColor="#bdebdc" stopOpacity="0" /></linearGradient></defs><path d="M0 193 C38 180,45 150,78 164 S120 150,145 148 S177 174,204 142 S250 130,268 110 S310 122,337 82 S365 107,393 69 S428 78,451 40 S478 58,500 14 V220 H0Z" fill="url(#chart-fill)" /><path d="M0 193 C38 180,45 150,78 164 S120 150,145 148 S177 174,204 142 S250 130,268 110 S310 122,337 82 S365 107,393 69 S428 78,451 40 S478 58,500 14" fill="none" stroke="#0e9f72" strokeWidth="3" /></svg><span className="chart-badge">+₹12,340</span></div>
        </section>

        <section className="content-grid">
          <article className="card risk-card"><div className="card-heading"><div><p className="eyebrow">01 / understand yourself</p><h2>Find your investor profile</h2></div><span className="number-icon">01</span></div><p className="muted">A quick 3-question check to help us tailor your plan.</p><div className="progress-track"><span style={{ width: riskStarted ? '66%' : '33%' }} /></div><div className="progress-label"><span>{riskStarted ? '2 of 3 completed' : '1 of 3 completed'}</span><span>{riskStarted ? 'Almost there' : '3 min to complete'}</span></div><button className="text-button" type="button" onClick={() => setRiskStarted(true)}>{riskStarted ? 'Continue assessment' : 'Start risk assessment'} <span>→</span></button></article>
          <article className="card net-worth-card"><div className="card-heading"><div><p className="eyebrow">your snapshot</p><h2>Net worth</h2></div><button className="icon-button" aria-label="More options" type="button">···</button></div><strong className="big-number">₹9,04,450</strong><p className="positive"><span>↗</span> ₹48,200 <span className="muted">this month</span></p><div className="mini-bars" aria-hidden="true">{[30, 48, 36, 60, 52, 68, 75, 83, 79, 94].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div></article>
        </section>

        <section className="section" id="investments"><div className="section-heading"><div><p className="eyebrow">02 / all in one place</p><h2>Your investments</h2></div><button className="outline-button" type="button">View portfolio <span>↗</span></button></div><div className="holdings-grid">{holdings.map((holding) => <article className="holding-card" key={holding.name}><div className={`holding-icon ${holding.tone}`}>{holding.name === 'Stocks' ? '↗' : holding.name === 'Fixed deposits' ? '▣' : '◒'}</div><p className="muted">{holding.name}</p><h3>{holding.value}</h3><div className="holding-foot"><span>{holding.provider}</span><strong>+{holding.change.replace('+', '')}</strong></div></article>)}</div></section>

        <section className="lower-grid"><article className="card goals-card" id="goals"><div className="section-heading"><div><p className="eyebrow">03 / make it tangible</p><h2>Goals in motion</h2></div><button className="icon-button" aria-label="Add a goal" type="button">＋</button></div><div className="goal-item"><div className="goal-icon home">⌂</div><div className="goal-detail"><div className="goal-title"><span>New home</span><strong>₹18,60,000 <small>of ₹30,00,000</small></strong></div><div className="progress-track"><span style={{ width: `${goalProgress}%` }} /></div><div className="progress-label"><span>{goalProgress}% funded</span><span>Dec 2026</span></div></div></div><div className="goal-item second"><div className="goal-icon sun">☼</div><div className="goal-detail"><div className="goal-title"><span>Retirement</span><strong>₹24,80,000 <small>of ₹1,00,00,000</small></strong></div><div className="progress-track green-track"><span style={{ width: '25%' }} /></div><div className="progress-label"><span>25% funded</span><span>2048</span></div></div></div><button className="text-button" type="button" onClick={() => setGoalProgress((value) => value >= 90 ? 62 : value + 10)}>Add ₹10,000 to home goal <span>→</span></button></article>
          <article className="card spend-card"><div className="section-heading"><div><p className="eyebrow">04 / know your flow</p><h2>Spend analysis</h2></div><div className="range-tabs">{Object.keys(spendData).map((range) => <button type="button" className={spendRange === range ? 'selected' : ''} onClick={() => setSpendRange(range)} key={range}>{range}</button>)}</div></div><div className="spend-total"><strong>₹42,680</strong><span className="positive">↓ 4.2% <small>vs last {spendRange.toLowerCase()}</small></span></div><div className="spend-chart"><div className="grid-lines"><i /><i /><i /><i /></div><div className="bars">{spendData[spendRange].map((height, index) => <div className="bar-column" key={index}><span className={index === 5 ? 'highlight-bar' : ''} style={{ height: `${height}%` }} /><small>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</small></div>)}</div></div><div className="tags"><span><i className="dot blue-dot" /> Essentials <b>₹18,240</b></span><span><i className="dot green-dot" /> Lifestyle <b>₹12,480</b></span><span><i className="dot yellow-dot" /> Other <b>₹11,960</b></span></div></article></section>
      </main>

      <footer><a className="brand" href="#top"><span className="brand-mark">✦</span> Arthiq</a><span>© 2023 Arthiq</span><nav><a href="#resources">Resources</a><a href="#about">About us</a><a href="#contact">Contact</a><a href="#terms">Terms</a></nav><div className="socials"><a href="#linkedin" aria-label="LinkedIn">in</a><a href="#twitter" aria-label="Twitter">𝕏</a><a href="#instagram" aria-label="Instagram">◎</a></div></footer>
    </div>
  )
}

export default App
