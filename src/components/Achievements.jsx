function Achievements() {

  const achievements = [
    {
      icon: '💰',
      title: 'First ₹1L saved',
      description: 'You crossed your first major savings milestone.',
      unlocked: true,
    },
    {
      icon: '🔥',
      title: '12 day streak',
      description: 'Tracked your finances for 12 consecutive days.',
      unlocked: true,
    },
    {
      icon: '📈',
      title: 'First investment',
      description: 'Started your investment journey.',
      unlocked: true,
    },
    {
      icon: '🎯',
      title: 'Goal 25%',
      description: 'Completed the first quarter of a goal.',
      unlocked: true,
    },
    {
      icon: '🏦',
      title: 'Emergency ready',
      description: 'Build a 6-month emergency fund.',
      unlocked: false,
    },
    {
      icon: '💎',
      title: '₹10L portfolio',
      description: 'Grow your portfolio beyond ₹10 lakh.',
      unlocked: false,
    },
  ]

  return (
    <section className="section" id="achievements">

      <div className="section-heading">

        <div>
          <p className="eyebrow">
            18 / celebrate progress
          </p>

          <h2>
            Your achievements
          </h2>
        </div>

        <span className="health-badge">
          4 / 6 unlocked
        </span>

      </div>


      <div className="achievements-grid">

        {achievements.map((achievement) => (

          <article
            className={
              achievement.unlocked
                ? 'achievement unlocked'
                : 'achievement locked'
            }
            key={achievement.title}
          >

            <div className="achievement-icon">
              {achievement.icon}
            </div>

            <div>

              <h3>
                {achievement.title}
              </h3>

              <p>
                {achievement.description}
              </p>

            </div>

            {achievement.unlocked && (
              <span className="achievement-check">
                ✓
              </span>
            )}

          </article>

        ))}

      </div>


      <div className="streak-card">

        <div className="streak-fire">
          🔥
        </div>

        <div>

          <strong>
            12 day financial streak
          </strong>

          <p>
            Keep tracking your money to reach
            the 30-day milestone.
          </p>

        </div>

        <div className="streak-progress">
          <span style={{ width: '40%' }} />
        </div>

      </div>

    </section>
  )
}

export default Achievements