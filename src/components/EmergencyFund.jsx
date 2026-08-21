function EmergencyFund() {
  const saved = 120000
  const target = 300000
  const monthlyExpenses = 42680

  const percentage = Math.round((saved / target) * 100)
  const monthsCovered = (saved / monthlyExpenses).toFixed(1)

  return (
    <section className="section" id="emergency-fund">

      <div className="section-heading">
        <div>
          <p className="eyebrow">11 / protect your future</p>
          <h2>Emergency fund</h2>
        </div>

        <span className="health-badge">
          {percentage}% funded
        </span>
      </div>

      <article className="card emergency-card">

        <div className="emergency-main">

          <div className="emergency-icon">
            🛡️
          </div>

          <div>
            <span className="muted">
              Current emergency savings
            </span>

            <h3>
              ₹{saved.toLocaleString('en-IN')}
            </h3>

            <p>
              Your fund currently covers approximately{' '}
              <strong>{monthsCovered} months</strong> of
              your average expenses.
            </p>
          </div>

        </div>

        <div className="progress-track">
          <span style={{ width: `${percentage}%` }} />
        </div>

        <div className="emergency-footer">
          <span>
            ₹{target.toLocaleString('en-IN')} recommended target
          </span>

          <strong>
            ₹{(target - saved).toLocaleString('en-IN')} to go
          </strong>
        </div>

        <div className="budget-tip">
          💡 Aim for 6 months of essential expenses before
          increasing high-risk investments.
        </div>

      </article>

    </section>
  )
}

export default EmergencyFund