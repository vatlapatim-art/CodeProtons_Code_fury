import { useMemo, useState } from 'react'

function GoalCalculator() {
  const [target, setTarget] = useState(3000000)
  const [current, setCurrent] = useState(1860000)
  const [months, setMonths] = useState(24)
  const [error, setError] = useState('')

  const safeTarget = Number(target)
  const safeCurrent = Number(current)
  const safeMonths = Number(months)
  const isValid = safeTarget > 0 && safeCurrent >= 0 && safeMonths > 0 && safeCurrent <= safeTarget
  const remaining = isValid ? Math.max(safeTarget - safeCurrent, 0) : 0

  const monthlySaving = useMemo(() => {
    return safeMonths > 0
      ? Math.ceil(remaining / safeMonths)
      : remaining
  }, [remaining, safeMonths])

  const percentage = Math.min(
    isValid ? Math.round((safeCurrent / safeTarget) * 100) : 0,
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
                onChange={(event) => setTarget(Number(event.target.value))}
                onBlur={() => setError(isValid ? '' : 'Enter a positive target, valid savings, and a positive timeline.')}
              />
            </label>

            <label>
              Already saved
              <input
                type="number"
                value={current}
                onChange={(event) => setCurrent(Number(event.target.value))}
              />
            </label>

            <label>
              Time remaining
              <input
                type="number"
                min="1"
                value={months}
                onChange={(event) => setMonths(Number(event.target.value))}
              />
              <small>months</small>
            </label>

          </div>

          <div className="calculator-result">

            {error && <p className="form-error" role="alert">{error}</p>}

            <span className="muted">You need to save</span>

            <strong>
              ₹{monthlySaving.toLocaleString('en-IN')}
            </strong>

            <p>
              every month to reach your goal in {safeMonths} months.
            </p>

            <div className="progress-track">
              <span style={{ width: `${percentage}%` }} />
            </div>

            <small>
              {percentage}% already completed
            </small>

            <button className="text-button" type="button" onClick={() => { setTarget(3000000); setCurrent(1860000); setMonths(24); setError('') }}>
              Reset calculator
            </button>

          </div>

        </div>

      </article>

    </section>
  )
}

export default GoalCalculator