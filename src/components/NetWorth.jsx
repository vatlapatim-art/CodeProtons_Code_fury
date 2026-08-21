import { useState } from 'react'

function NetWorth() {
  const [period, setPeriod] = useState('6M')

  const values = {
    '1M': [7.8, 8.0, 8.1, 8.3, 8.7, 9.0],
    '6M': [6.9, 7.3, 7.6, 8.0, 8.5, 9.04],
    '1Y': [5.8, 6.2, 6.7, 7.2, 7.9, 9.04],
  }

  const current = values[period][values[period].length - 1]
  const start = values[period][0]

  const growth = (((current - start) / start) * 100).toFixed(1)

  return (
    <section className="section" id="net-worth">

      <div className="section-heading">

        <div>
          <p className="eyebrow">13 / your bigger picture</p>
          <h2>Net worth history</h2>
        </div>

        <div className="range-tabs">

          {Object.keys(values).map((item) => (
            <button
              key={item}
              className={period === item ? 'selected' : ''}
              onClick={() => setPeriod(item)}
            >
              {item}
            </button>
          ))}

        </div>

      </div>

      <article className="card net-worth-card">

        <div className="net-worth-header">

          <div>
            <span className="muted">
              Current net worth
            </span>

            <strong>
              ₹{current.toFixed(2)}L
            </strong>
          </div>

          <span className="positive">
            +{growth}% ↑
          </span>

        </div>

        <div className="net-worth-chart">

          {values[period].map((value, index) => {

            const max = Math.max(...values[period])
            const height = (value / max) * 100

            return (
              <div className="net-worth-column" key={index}>

                <span
                  style={{ height: `${height}%` }}
                />

                <small>
                  ₹{value.toFixed(1)}L
                </small>

              </div>
            )
          })}

        </div>

        <p className="chart-message">
          📈 Your net worth has been moving upward consistently.
          Keep your savings rate steady to maintain the trend.
        </p>

      </article>

    </section>
  )
}

export default NetWorth