function FinancialForecast() {
  const forecast = [
    { label: 'Now', value: 9.04 },
    { label: '1 Year', value: 12.1 },
    { label: '3 Years', value: 17.8 },
    { label: '5 Years', value: 22.8 },
  ]

  return (
    <section className="section" id="forecast">

      <div className="section-heading">
        <div>
          <p className="eyebrow">14 / look ahead</p>
          <h2>Financial forecast</h2>
        </div>

        <span className="health-badge">
          10% assumed return
        </span>
      </div>

      <article className="card forecast-card">

        <div className="forecast-intro">
          <div>
            <span className="muted">
              Projected wealth
            </span>

            <strong>
              ₹22.8L
            </strong>
          </div>

          <p>
            If you maintain your current savings and
            investment habits, this is your estimated
            portfolio value in 5 years.
          </p>
        </div>

        <div className="forecast-timeline">

          {forecast.map((item, index) => (

            <div
              className="forecast-point"
              key={item.label}
            >

              <div className="forecast-dot">
                {index === forecast.length - 1 ? '★' : '•'}
              </div>

              <span>
                {item.label}
              </span>

              <strong>
                ₹{item.value}L
              </strong>

              {index < forecast.length - 1 && (
                <div className="forecast-line" />
              )}

            </div>

          ))}

        </div>

        <div className="budget-tip">
          🔮 <strong>Forecast:</strong> Increasing your
          monthly investment by ₹5,000 could push your
          5-year projected wealth significantly higher.
        </div>

      </article>

    </section>
  )
}

export default FinancialForecast