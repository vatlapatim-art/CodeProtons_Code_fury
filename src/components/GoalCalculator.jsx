import { useMemo, useState } from 'react'

function GoalCalculator() {
  const [target, setTarget] = useState(3000000)
  const [current, setCurrent] = useState(1860000)
  const [months, setMonths] = useState(24)

  const remaining = Math.max(target - current, 0)

  const monthlySaving = useMemo(() => {
    return months > 0
      ? Math.ceil(remaining / months)
      : remaining
  }, [remaining, months])

  const percentage = Math.min(
    Math.round((current / target) * 100),
    100
  )

  return (
    <section className="section" id="goal-calculator">

      <div className="section-heading">
        <div>
          <p className="eyebrow">10 / make a plan</p>
          <h2>Goal calculator</h2>
        </div>
      </div>

      <article className="card calculator-card">

        <div className="calculator-grid">

          <div className="calculator-inputs">

            <label>
              Target amount
              <input
                type="number"
                value={target}
                onChange={(event) =>
                  setTarget(Number(event.target.value))
                }
              />
            </label>

            <label>
              Already saved
              <input
                type="number"
                value={current}
                onChange={(event) =>
                  setCurrent(Number(event.target.value))
                }
              />
            </label>

            <label>
              Time remaining
              <input
                type="number"
                min="1"
                value={months}
                onChange={(event) =>
                  setMonths(Number(event.target.value))
                }
              />
              <small>months</small>
            </label>

          </div>

          <div className="calculator-result">

            <span className="muted">
              You need to save
            </span>

            <strong>
              ₹{monthlySaving.toLocaleString('en-IN')}
            </strong>

            <p>
              every month to reach your goal in {months} months.
            </p>

            <div className="progress-track">
              <span style={{ width: `${percentage}%` }} />
            </div>

            <small>
              {percentage}% already completed
            </small>

          </div>

        </div>

      </article>

    </section>
  )
}

export default GoalCalculator