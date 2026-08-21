import { useState } from 'react'

function AskArthiq() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  const getAnswer = () => {

    const text = question.toLowerCase()

    if (text.includes('spend') || text.includes('expense')) {
      setAnswer(
        "Your lifestyle spending is currently around 29% of your monthly expenses. Reducing discretionary spending by ₹2,000 could increase your monthly savings."
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
        "You're currently saving approximately ₹22,320 per month. Increasing that amount gradually could accelerate your financial goals."
      )
      return
    }

    if (text.includes('goal') || text.includes('home')) {
      setAnswer(
        "Your home goal is approximately 62% funded. Maintaining your current savings rate should keep you moving toward the target."
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