import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import { useFinance } from './context/FinanceContext.jsx'

import FinancialHealth from './components/FinancialHealth'
import Investments from './components/Investments'
import Goals from './components/Goals'
import Spending from './components/Spending'
import Transactions from './components/Transactions'

import Budget from './components/Budget'
import GoalCalculator from './components/GoalCalculator'
import EmergencyFund from './components/EmergencyFund'
import DebtTracker from './components/DebtTracker'
import NetWorth from './components/NetWorth'
import FinancialForecast from './components/FinancialForecast'
import WhatIfSimulator from './components/WhatIfSimulator'
import AskArthiq from './components/AskArthiq'
import Notifications from './components/Notifications'
import Achievements from './components/Achievements'
import Onboarding from './components/Onboarding'
import {
  BudgetPage,
  GoalsPage,
  InvestmentsPage,
  PlanningPage,
  ProfilePage,
  TransactionsPage,
} from './pages/PrototypePages.jsx'

function Dashboard() {
  const {
    goals,
    investments,
    transactions,
    budget,
    financial,
    derived,
    addMoneyToGoal,
    profile,
  } = useFinance()
  const [showProfile, setShowProfile] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className="app-shell">

      {/* =========================
          NAVBAR
      ========================= */}

      <header className="topbar">

        <a className="brand" href="#top">
          <span className="brand-mark">
            ✦
          </span>
          Arthiq
        </a>

        <button className="mobile-menu-button" type="button" aria-label="Toggle navigation" aria-expanded={showMenu} onClick={() => setShowMenu(!showMenu)}>
          {showMenu ? '×' : '☰'}
        </button>

        <nav className={showMenu ? 'desktop-nav mobile-nav-open' : 'desktop-nav'}>

          <a href="#overview">
            Overview
          </a>

          <Link to="/investments" onClick={() => setShowMenu(false)}>
            Investments
          </Link>

          <Link to="/goals" onClick={() => setShowMenu(false)}>
            Goals
          </Link>

          <Link to="/budget" onClick={() => setShowMenu(false)}>
            Budget
          </Link>

          <Link to="/planning" onClick={() => setShowMenu(false)}>
            Simulator
          </Link>

          <a href="#ask-arthiq">
            Ask Arthiq
          </a>

        </nav>

        <button
          className="invest-button"
          type="button"
          onClick={() => setShowProfile(true)}
        >
          Find my profile ↗
        </button>

      </header>


      {/* =========================
          MAIN
      ========================= */}

      <main id="top">

        {/* =========================
            HERO
        ========================= */}

        <section
          className="hero"
          id="overview"
        >

          <div className="hero-copy">

            <p className="eyebrow">
              Your personal wealth companion

              <span className="live-dot" />

              All systems healthy
            </p>

            <h1>
              Take control of
              <br />
              <em>your finances.</em>
            </h1>

            <p className="hero-subtitle">
              Understand your money, grow your wealth
              and make smarter financial decisions
              with confidence.
            </p>

            <button
              className="primary-button"
              type="button"
              onClick={() => setShowProfile(true)}
            >
              Discover your money personality →
            </button>

          </div>


          {/* PORTFOLIO GRAPH */}

          <div className="hero-visual">

            <div className="visual-label">

              <span>
                Portfolio value
              </span>

              <strong>
                ₹9,04,450
              </strong>

              <small>
                +11.2% this year
              </small>

            </div>

            <svg viewBox="0 0 500 220">

              <defs>

                <linearGradient
                  id="chart-fill"
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="1"
                >

                  <stop
                    offset="0"
                    stopColor="#bdebdc"
                    stopOpacity=".75"
                  />

                  <stop
                    offset="1"
                    stopColor="#bdebdc"
                    stopOpacity="0"
                  />

                </linearGradient>

              </defs>

              <path
                d="M0 193 C38 180,45 150,78 164 S120 150,145 148 S177 174,204 142 S250 130,268 110 S310 122,337 82 S365 107,393 69 S428 78,451 40 S478 58,500 14 V220 H0Z"
                fill="url(#chart-fill)"
              />

              <path
                d="M0 193 C38 180,45 150,78 164 S120 150,145 148 S177 174,204 142 S250 130,268 110 S310 122,337 82 S365 107,393 69 S428 78,451 40 S478 58,500 14"
                fill="none"
                stroke="#1c8f63"
                strokeWidth="4"
              />

            </svg>

          </div>

        </section>


        {/* =========================
            FINANCIAL HEALTH
        ========================= */}

        <section className="section">

          <div className="dashboard-grid">

            <FinancialHealth
              health={derived.health}
            />


            {/* MONEY PERSONALITY */}

            <article className="card profile-card">

              <div className="section-heading">

                <div>

                  <p className="eyebrow">
                    02 / know yourself
                  </p>

                  <h2>
                    Money personality
                  </h2>

                </div>

              </div>

              <div className="personality">

                <div className="personality-icon">
                  ⚖️
                </div>

                <div>

                  <h3>
                    {profile.personality}
                  </h3>

                  <p>
                    You prefer long-term growth while
                    keeping risk under control.
                  </p>

                </div>

              </div>

              <div className="profile-tags">

                <span>
                  Moderate Risk
                </span>

                <span>
                  Long Term
                </span>

                <span>
                  Growth Focused
                </span>

              </div>

              <button
                className="outline-button"
                type="button"
                onClick={() => setShowProfile(true)}
              >
                Take assessment →
              </button>

            </article>

          </div>

        </section>


        {/* =========================
            INVESTMENTS
        ========================= */}

        <Investments
          investments={investments}
        />


        {/* =========================
            GOALS + SPENDING
        ========================= */}

        <section className="lower-grid">

          <Goals
            goals={goals}
            onAddMoney={(goalId) => addMoneyToGoal(goalId, 10000)}
          />

          <Spending />

        </section>


        {/* =========================
            TRANSACTIONS
        ========================= */}

        <Transactions
          transactions={transactions}
        />


        {/* =========================
            MONEY MANAGEMENT
        ========================= */}

        <Budget budget={budget} />

        <GoalCalculator />


        {/* =========================
            FINANCIAL SAFETY
        ========================= */}

        <EmergencyFund fund={financial.emergencyFund} />

        <DebtTracker debts={financial.debts.map((debt) => ({ ...debt, original: debt.outstanding * 1.4, interest: `${debt.rate}%` }))} />


        {/* =========================
            NET WORTH
        ========================= */}

        <NetWorth />


        {/* =========================
            FORECAST
        ========================= */}

        <FinancialForecast />


        {/* =========================
            WHAT IF
        ========================= */}

        <WhatIfSimulator />


        {/* =========================
            ASK ARTHIQ
        ========================= */}

        <AskArthiq />


        {/* =========================
            ARTHIQ INSIGHTS
        ========================= */}

        <section className="section">

          <div className="section-heading">

            <div>

              <p className="eyebrow">
                19 / your personal advisor
              </p>

              <h2>
                Arthiq insights
              </h2>

            </div>

          </div>


          <div className="insights-grid">

            <article className="insight-card">

              <div className="insight-icon">
                ✦
              </div>

              <span className="insight-label">
                Spending insight
              </span>

              <h3>
                Your lifestyle spending increased
                18% this month.
              </h3>

              <p>
                Dining and entertainment are your
                biggest areas of increase.
              </p>

              <button type="button">
                See why →
              </button>

            </article>


            <article className="insight-card">

              <div className="insight-icon">
                🎯
              </div>

              <span className="insight-label">
                Goal insight
              </span>

              <h3>
                You are on track for your home goal.
              </h3>

              <p>
                Maintaining your current savings rate
                could help you reach your target.
              </p>

              <button type="button">
                View projection →
              </button>

            </article>


            <article className="insight-card">

              <div className="insight-icon">
                📊
              </div>

              <span className="insight-label">
                Portfolio insight
              </span>

              <h3>
                Your portfolio has a balanced
                allocation.
              </h3>

              <p>
                Mutual funds make up the largest
                portion of your current portfolio.
              </p>

              <button type="button">
                Analyze portfolio →
              </button>

            </article>

          </div>

        </section>


        {/* =========================
            FINANCIAL ALERTS
        ========================= */}

        <section className="section">

          <div className="section-heading">

            <div>

              <p className="eyebrow">
                20 / stay ahead
              </p>

              <h2>
                Financial alerts
              </h2>

            </div>

          </div>


          <div className="alerts">

            <div className="alert">

              <span>
                ⚠️
              </span>

              <div>

                <strong>
                  High spending detected
                </strong>

                <p>
                  Dining expenses are 24% above
                  your monthly average.
                </p>

              </div>

            </div>


            <div className="alert">

              <span>
                🎯
              </span>

              <div>

                <strong>
                  Goal reminder
                </strong>

                <p>
                  Your home goal is slightly behind
                  its ideal monthly pace.
                </p>

              </div>

            </div>


            <div className="alert">

              <span>
                📈
              </span>

              <div>

                <strong>
                  Portfolio update
                </strong>

                <p>
                  Your investment portfolio gained
                  11.2% this year.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* =========================
            NOTIFICATIONS
        ========================= */}

        <Notifications />


        {/* =========================
            ACHIEVEMENTS
        ========================= */}

        <Achievements />

      </main>


      {/* =========================
          ONBOARDING
      ========================= */}

      {showProfile && (

        <Onboarding
          onClose={() => setShowProfile(false)}
        />

      )}


      {/* =========================
          FOOTER
      ========================= */}

      <footer>

        <a
          className="brand"
          href="#top"
        >

          <span className="brand-mark">
            ✦
          </span>

          Arthiq

        </a>

        <span>
          © 2026 Arthiq
        </span>

        <nav>

          <a href="#overview">
            Overview
          </a>

          <a href="#investments">
            Investments
          </a>

          <a href="#goals">
            Goals
          </a>

          <a href="#budget">
            Budget
          </a>

          <a href="#what-if">
            Simulator
          </a>

          <a href="#ask-arthiq">
            Ask Arthiq
          </a>

        </nav>

        <div className="socials">

          <a href="#linkedin">
            in
          </a>

          <a href="#twitter">
            𝕏
          </a>

          <a href="#instagram">
            ◎
          </a>

        </div>

      </footer>

    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/goals" element={<GoalsPage />} />
      <Route path="/investments" element={<InvestmentsPage />} />
      <Route path="/transactions" element={<TransactionsPage />} />
      <Route path="/budget" element={<BudgetPage />} />
      <Route path="/planning" element={<PlanningPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<Dashboard />} />
    </Routes>
  )
}

export default App