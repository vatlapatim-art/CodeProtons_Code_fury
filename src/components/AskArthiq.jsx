import { useState } from 'react'
import { hasApiConfig } from '../config/env.js'
import { useFinance } from '../context/FinanceContext.jsx'

function AskArthiq() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const { financial, goals, derived } = useFinance()

  const getAnswer = () => {

    const text = question.toLowerCase()

    if (text.includes('spend') || text.includes('expense')) {
      setAnswer(
        `Your current monthly spending is ${financial.spending.toLocaleString('en-IN')}. Your savings rate is ${derived.monthlySavingsRate}%. Reducing discretionary spending could increase your monthly buffer.`
      )
      return
    }

    if (text.includes('invest')) {
      setAnswer(
        "Your current portfolio has exposure to mutual funds, stocks and fixed deposits. A balanced approach can help you pursue growth while maintaining some stability."
      )
      return
    }

    if (text.includes('save') || text.includes('saving')) {
      setAnswer(
        `You're currently saving approximately ₹${financial.savings.toLocaleString('en-IN')} per month. Increasing that amount gradually could accelerate your financial goals.`
      )
      return
    }

    if (text.includes('goal') || text.includes('home')) {
      setAnswer(
        `You have ${goals.length} active goals. Your average goal progress is ${Math.round(goals.reduce((sum, goal) => sum + (goal.current / goal.target) * 100, 0) / Math.max(goals.length, 1))}%.`
      )
      return
    }

    setAnswer(
      "Based on your current financial profile, you're in a healthy position. Keep your savings consistent, monitor discretionary spending and continue investing for long-term goals."
    )
  }

  return (
    <section className="section" id="ask-arthiq">

      <div className="section-heading">

        <div>
          <p className="eyebrow">
            16 / your personal money companion
          </p>

          <h2>
            Ask Arthiq
          </h2>
        </div>

      </div>

      <article className="card ask-card">

        <div className="ask-header">

          <div className="ask-avatar">
            ✦
          </div>

          <div>
            <h3>
              What do you want to know?
            </h3>

            <p>
              Ask about your spending, savings,
              investments or goals.
            </p>

            <small className="muted">
              {hasApiConfig ? 'API-ready assistant' : 'Offline assistant using your saved data'}
            </small>
          </div>

        </div>


        {answer && (

          <div className="ai-answer">

            <span>
              ✦ Arthiq
            </span>

            <p>
              {answer}
            </p>

          </div>

        )}


        <div className="ask-input">

          <input
            type="text"
            placeholder="e.g. Am I spending too much?"
            value={question}
            onChange={(event) =>
              setQuestion(event.target.value)
            }
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                getAnswer()
              }
            }}
          />

          <button
            onClick={getAnswer}
            disabled={!question.trim()}
          >
            Ask →
          </button>

        </div>


        <div className="suggested-questions">

          <button
            onClick={() => {
              setQuestion('Am I spending too much?')
            }}
          >
            Am I spending too much?
          </button>

          <button
            onClick={() => {
              setQuestion('Should I invest more?')
            }}
          >
            Should I invest more?
          </button>

          <button
            onClick={() => {
              setQuestion('How can I save more?')
            }}
          >
            How can I save more?
          </button>

        </div>

      </article>

    </section>
  )
}

export default AskArthiq