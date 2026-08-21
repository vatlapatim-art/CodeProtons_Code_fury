function formatMoney(value) {
  return `₹${value.toLocaleString('en-IN')}`
}

function Investments({ investments }) {
  const total = investments.reduce(
    (sum, investment) => sum + investment.current,
    0
  )

  const invested = investments.reduce(
    (sum, investment) => sum + investment.invested,
    0
  )

  const profit = total - invested

  return (
    <section className="section" id="investments">

      <div className="section-heading">

        <div>
          <p className="eyebrow">03 / all in one place</p>
          <h2>Your investments</h2>
        </div>

        <span className="health-badge">
          +{((profit / invested) * 100).toFixed(1)}% overall
        </span>

      </div>

      <div className="holdings-grid">

        {investments.map((investment) => {

          const gain =
            investment.current - investment.invested

          return (
            <article
              className="holding-card"
              key={investment.id || investment.name}
            >

              <div className={`holding-icon ${investment.type}`}>
                {investment.type === 'stocks'
                  ? '↗'
                  : investment.type === 'fd'
                    ? '▣'
                    : '◒'}
              </div>

              <p className="muted">
                {investment.name}
              </p>

              <h3>
                {formatMoney(investment.current)}
              </h3>

              <div className="investment-details">

                <span>
                  Invested {formatMoney(investment.invested)}
                </span>

                <strong>
                  +{formatMoney(gain)}
                </strong>

              </div>

              <div className="holding-foot">

                <span>
                  {investment.provider}
                </span>

                <strong>
                  +{investment.returnPercentage}%
                </strong>

              </div>

            </article>
          )
        })}

      </div>

      <article className="card allocation-card">

        <div className="section-heading">

          <div>
            <p className="eyebrow">Portfolio breakdown</p>
            <h2>Asset allocation</h2>
          </div>

        </div>

        <div className="allocation">

          <div className="allocation-chart">

            <div className="allocation-inner">
              {formatMoney(total)}
            </div>

          </div>

          <div className="allocation-list">

            {investments.map((investment, index) => (
              <div key={investment.id || investment.name}>
                <span>
                  <i className={`dot ${index % 3 === 0 ? 'blue-dot' : index % 3 === 1 ? 'green-dot' : 'yellow-dot'}`} />
                  {investment.name}
                </span>

                <strong>{total > 0 ? Math.round((investment.current / total) * 100) : 0}%</strong>
              </div>
            ))}

          </div>

        </div>

      </article>

    </section>
  )
}

export default Investments