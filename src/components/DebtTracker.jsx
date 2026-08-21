function DebtTracker({ debts }) {
  const loans = debts || [
    {
      name: 'Education Loan',
      outstanding: 420000,
      original: 700000,
      emi: 12500,
      interest: '8.2%',
    },
    {
      name: 'Bike Loan',
      outstanding: 85000,
      original: 150000,
      emi: 5200,
      interest: '9.1%',
    },
  ]

  const totalOutstanding = loans.reduce(
    (sum, loan) => sum + loan.outstanding,
    0
  )

  const totalEmi = loans.reduce(
    (sum, loan) => sum + loan.emi,
    0
  )

  return (
    <section className="section" id="debt">

      <div className="section-heading">
        <div>
          <p className="eyebrow">12 / stay debt aware</p>
          <h2>Debt tracker</h2>
        </div>

        <span className="health-badge">
          ₹{totalEmi.toLocaleString('en-IN')} / month
        </span>
      </div>

      <div className="debt-grid">

        {loans.map((loan) => {

          const paidPercentage = Math.round(
            ((loan.original - loan.outstanding) /
              loan.original) *
              100
          )

          return (
            <article className="card debt-card" key={loan.name}>

              <div className="debt-header">
                <div className="debt-icon">
                  💳
                </div>

                <div>
                  <h3>{loan.name}</h3>
                  <span>
                    {loan.interest} interest
                  </span>
                </div>
              </div>

              <p className="muted">
                Outstanding
              </p>

              <strong className="debt-amount">
                ₹{loan.outstanding.toLocaleString('en-IN')}
              </strong>

              <div className="progress-track">
                <span style={{ width: `${paidPercentage}%` }} />
              </div>

              <div className="debt-details">
                <span>
                  {paidPercentage}% paid
                </span>

                <span>
                  EMI ₹{loan.emi.toLocaleString('en-IN')}
                </span>
              </div>

            </article>
          )
        })}

      </div>

      <div className="card debt-summary">
        <span>Total outstanding</span>
        <strong>
          ₹{totalOutstanding.toLocaleString('en-IN')}
        </strong>
      </div>

    </section>
  )
}

export default DebtTracker