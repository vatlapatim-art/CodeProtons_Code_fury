function formatMoney(value) {
  return `₹${value.toLocaleString('en-IN')}`
}

function Goals({ goals, onAddMoney }) {
  return (
    <article className="card goals-card" id="goals">

      <div className="section-heading">

        <div>
          <p className="eyebrow">04 / make it tangible</p>
          <h2>Goals in motion</h2>
        </div>

        <button className="icon-button">
          ＋
        </button>

      </div>

      {goals.map((goal) => {

        const percentage = Math.min(
          Math.round((goal.current / goal.target) * 100),
          100
        )

        return (
          <div
            className="goal-item"
            key={goal.name}
          >

            <div className="goal-icon">
              {goal.icon}
            </div>

            <div className="goal-detail">

              <div className="goal-title">

                <span>
                  {goal.name}
                </span>

                <strong>
                  {formatMoney(goal.current)}
                  <small>
                    {' '}of {formatMoney(goal.target)}
                  </small>
                </strong>

              </div>

              <div className="progress-track">

                <span
                  style={{
                    width: `${percentage}%`,
                  }}
                />

              </div>

              <div className="progress-label">

                <span>
                  {percentage}% funded
                </span>

                <span>
                  {goal.deadline}
                </span>

              </div>

            </div>

          </div>
        )
      })}

      <button
        className="text-button"
        onClick={onAddMoney}
      >
        Add ₹10,000 to home goal →
      </button>

    </article>
  )
}

export default Goals