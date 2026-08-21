import { useState } from 'react'

function Budget() {
  const [budget, setBudget] = useState(50000)

  const categories = [
    { name: 'Food', spent: 7200, limit: 8000, icon: '🍔' },
    { name: 'Transport', spent: 4200, limit: 6000, icon: '⛽' },
    { name: 'Shopping', spent: 6800, limit: 5000, icon: '🛍️' },
    { name: 'Bills', spent: 9500, limit: 12000, icon: '📄' },
    { name: 'Entertainment', spent: 3980, limit: 5000, icon: '🎬' },
  ]

  const totalSpent = categories.reduce(
    (sum, category) => sum + category.spent,
    0
  )

  const remaining = budget - totalSpent
  const overallPercentage = Math.min(
    Math.round((totalSpent / budget) * 100),
    100
  )

  return (
    <section className="section" id="budget">

      <div className="section-heading">
        <div>
          <p className="eyebrow">09 / plan your money</p>
          <h2>Monthly budget</h2>
        </div>

        <span className="health-badge">
          {overallPercentage}% used
        </span>
      </div>

      <article className="card budget-card">

        <div className="budget-summary">

          <div>
            <span className="muted">Monthly budget</span>
            <strong>₹{budget.toLocaleString('en-IN')}</strong>
          </div>

          <div>
            <span className="muted">Spent</span>
            <strong>₹{totalSpent.toLocaleString('en-IN')}</strong>
          </div>

          <div>
            <span className="muted">Remaining</span>
            <strong className={remaining < 0 ? 'expense' : 'income'}>
              ₹{Math.abs(remaining).toLocaleString('en-IN')}
            </strong>
          </div>

        </div>

        <div className="progress-track budget-progress">
          <span style={{ width: `${overallPercentage}%` }} />
        </div>

        <div className="budget-list">

          {categories.map((category) => {

            const percentage = Math.round(
              (category.spent / category.limit) * 100
            )

            const overBudget = category.spent > category.limit

            return (
              <div className="budget-row" key={category.name}>

                <div className="budget-category">
                  <span className="budget-icon">
                    {category.icon}
                  </span>

                  <div>
                    <strong>{category.name}</strong>
                    <small>
                      ₹{category.spent.toLocaleString('en-IN')}
                      {' '}of ₹{category.limit.toLocaleString('en-IN')}
                    </small>
                  </div>
                </div>

                <div className="budget-row-right">

                  <div className="budget-mini-track">
                    <span
                      className={overBudget ? 'over-budget' : ''}
                      style={{
                        width: `${Math.min(percentage, 100)}%`,
                      }}
                    />
                  </div>

                  <strong className={overBudget ? 'expense' : ''}>
                    {percentage}%
                  </strong>

                </div>

              </div>
            )
          })}

        </div>

        <div className="budget-tip">
          💡 <strong>Arthiq tip:</strong> Your shopping budget
          is above its limit. Reducing it by ₹1,800 would
          bring you back on track.
        </div>

      </article>

    </section>
  )
}

export default Budget