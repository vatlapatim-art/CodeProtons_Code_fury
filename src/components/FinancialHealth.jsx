function FinancialHealth({ health }) {
  return (
    <article className="card health-card">

      <div className="section-heading">
        <div>
          <p className="eyebrow">01 / financial wellness</p>
          <h2>Financial health</h2>
        </div>

        <span className="health-badge">
          {health.score >= 70 ? 'Good' : 'Needs attention'}
        </span>
      </div>

      <div className="health-score">
        <strong>{health.score}</strong>
        <span>/ 100</span>
      </div>

      <div className="health-bar">
        <span style={{ width: `${health.score}%` }} />
      </div>

      <div className="health-stats">

        <div>
          <span>Savings</span>
          <strong>{health.savings}</strong>
        </div>

        <div>
          <span>Investments</span>
          <strong>{health.investments}</strong>
        </div>

        <div>
          <span>Spending</span>
          <strong>{health.spending}</strong>
        </div>

      </div>

      <p className="health-message">
        You're doing well. Increasing your emergency fund could improve
        your financial health score.
      </p>

    </article>
  )
}

export default FinancialHealth