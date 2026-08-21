import { useMemo, useState } from 'react'

function WhatIfSimulator() {
  const [monthly, setMonthly] = useState(5000)
  const [years, setYears] = useState(10)
  const [rate, setRate] = useState(10)

  const result = useMemo(() => {

    const months = years * 12
    const monthlyRate = rate / 100 / 12

    let futureValue = 0

    if (monthlyRate === 0) {
      futureValue = monthly * months
    } else {
      futureValue =
        monthly *
        (((1 + monthlyRate) ** months - 1) /
          monthlyRate) *
        (1 + monthlyRate)
    }

    const invested = monthly * months
    const growth = futureValue - invested

    return {
      invested,
      futureValue,
      growth,
    }

  }, [monthly, years, rate])

  const money = (value) =>
    `₹${Math.round(value).toLocaleString('en-IN')}`

  return (
    <section className="section" id="what-if">

      <div className="section-heading">

        <div>
          <p className="eyebrow">
            15 / experiment with your future
          </p>

          <h2>
            What if?
          </h2>
        </div>

        <span className="health-badge">
          Live calculator
        </span>

      </div>

      <article className="card simulator-card">

        <div className="simulator-controls">

          <label>
            Monthly investment

            <strong>
              {money(monthly)}
            </strong>

            <input
              type="range"
              min="1000"
              max="50000"
              step="1000"
              value={monthly}
              onChange={(event) =>
                setMonthly(Number(event.target.value))
              }
            />

            <div className="slider-labels">
              <span>₹1K</span>
              <span>₹50K</span>
            </div>

          </label>


          <label>
            Investment period

            <strong>
              {years} years
            </strong>

            <input
              type="range"
              min="1"
              max="30"
              value={years}
              onChange={(event) =>
                setYears(Number(event.target.value))
              }
            />

            <div className="slider-labels">
              <span>1 yr</span>
              <span>30 yrs</span>
            </div>

          </label>


          <label>
            Expected annual return

            <strong>
              {rate}%
            </strong>

            <input
              type="range"
              min="4"
              max="15"
              value={rate}
              onChange={(event) =>
                setRate(Number(event.target.value))
              }
            />

            <div className="slider-labels">
              <span>4%</span>
              <span>15%</span>
            </div>

          </label>

        </div>


        <div className="simulator-result">

          <span>
            Estimated future value
          </span>

          <strong>
            {money(result.futureValue)}
          </strong>

          <div className="simulator-stats">

            <div>
              <span>
                Total invested
              </span>

              <strong>
                {money(result.invested)}
              </strong>
            </div>

            <div>
              <span>
                Potential growth
              </span>

              <strong className="income">
                +{money(result.growth)}
              </strong>
            </div>

          </div>

        </div>

      </article>

    </section>
  )
}

export default WhatIfSimulator