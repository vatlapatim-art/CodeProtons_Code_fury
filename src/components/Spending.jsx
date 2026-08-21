import { useState } from 'react'
import { spendingData, categories } from '../data/demoData'

function formatMoney(value) {
  return `₹${value.toLocaleString('en-IN')}`
}

function Spending() {
  const [range, setRange] = useState('Month')

  return (
    <article className="card spend-card">

      <div className="section-heading">

        <div>
          <p className="eyebrow">
            05 / know your flow
          </p>

          <h2>
            Spend analysis
          </h2>
        </div>

        <div className="range-tabs">

          {Object.keys(spendingData).map((item) => (

            <button
              key={item}
              className={
                range === item
                  ? 'selected'
                  : ''
              }
              onClick={() => setRange(item)}
            >
              {item}
            </button>

          ))}

        </div>

      </div>

      <div className="spend-total">

        <strong>
          ₹42,680
        </strong>

        <span className="positive">
          ↓ 4.2%
          <small>
            {' '}vs last {range.toLowerCase()}
          </small>
        </span>

      </div>

      <div className="spend-chart">

        <div className="grid-lines">
          <i />
          <i />
          <i />
          <i />
        </div>

        <div className="bars">

          {spendingData[range].map(
            (height, index) => (

              <div
                className="bar-column"
                key={index}
              >

                <span
                  className={
                    index === 5
                      ? 'highlight-bar'
                      : ''
                  }
                  style={{
                    height: `${height}%`,
                  }}
                />

                <small>
                  {[
                    'M',
                    'T',
                    'W',
                    'T',
                    'F',
                    'S',
                    'S',
                  ][index]}
                </small>

              </div>
            )
          )}

        </div>

      </div>

      <div className="tags">

        {categories.map((category) => (

          <span key={category.name}>

            <i
              className={`dot ${category.type}-dot`}
            />

            {category.name}

            <b>
              {formatMoney(category.amount)}
            </b>

          </span>

        ))}

      </div>

    </article>
  )
}

export default Spending