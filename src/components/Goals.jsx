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

          <button className="icon-button" type="button" aria-label="Create a goal">
          ＋
        </button>

      </div>

      {goals.map((goal) => {

        const percentage = goal.target > 0 ? Math.min(
          Math.round((goal.current / goal.target) * 100),
          100
        ) : 0

        return (
          <div
            className="goal-item"
            key={goal.id || goal.name}
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

              <div className="progress-track" aria-label={`${percentage}% funded`}>

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

      <div className="goal-actions">
        {goals.map((goal) => (
          <button className="text-button" type="button" key={`add-${goal.id || goal.name}`} onClick={() => onAddMoney(goal.id)}>
            Add ₹10,000 to {goal.name} →
          </button>
        ))}
      </div>

    </article>
  )
}

export default Goals