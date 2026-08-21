import { useState } from 'react'

function formatMoney(value) {
  const absoluteValue = Math.abs(value)

  return `₹${absoluteValue.toLocaleString('en-IN')}`
}

function Transactions({ transactions }) {

  const [search, setSearch] = useState('')

  const filteredTransactions =
    transactions.filter((transaction) => {

      const text =
        `${transaction.name} ${transaction.category}`
          .toLowerCase()

      return text.includes(
        search.toLowerCase()
      )
    })

  return (
    <section className="section" id="transactions">

      <div className="section-heading">

        <div>
          <p className="eyebrow">
            06 / follow your money
          </p>

          <h2>
            Recent transactions
          </h2>
        </div>

        <input
          className="transaction-search"
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />

      </div>

      <div className="transactions-card">

        {filteredTransactions.length === 0 ? (

          <div className="empty-state">
            No transactions found.
          </div>

        ) : (

          filteredTransactions.map(
            (transaction, index) => (

              <div
                className="transaction-item"
                key={`${transaction.name}-${index}`}
              >

                <div className="transaction-icon">
                  {transaction.icon}
                </div>

                <div className="transaction-info">

                  <strong>
                    {transaction.name}
                  </strong>

                  <span>
                    {transaction.category}
                  </span>

                </div>

                <strong
                  className={
                    transaction.amount >= 0
                      ? 'income'
                      : 'expense'
                  }
                >
                  {transaction.amount >= 0
                    ? '+'
                    : '-'}
                  {formatMoney(transaction.amount)}
                </strong>

              </div>

            )
          )

        )}

      </div>

    </section>
  )
}

export default Transactions