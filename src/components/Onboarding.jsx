import { useEffect, useRef, useState } from 'react'
import { useFinance } from '../context/FinanceContext.jsx'

const questions = [
  {
    question: 'What is your investing experience?',
    options: [
      'I am completely new',
      'I know the basics',
      'I invest occasionally',
      'I am an experienced investor',
    ],
  },
  {
    question: 'What is your main financial goal?',
    options: [
      'Build savings',
      'Buy a home',
      'Grow investments',
      'Achieve financial freedom',
    ],
  },
  {
    question: 'How comfortable are you with investment risk?',
    options: [
      'I want almost no risk',
      'I prefer low risk',
      'I am comfortable with moderate risk',
      'I am comfortable with high risk',
    ],
  },
  {
    question: 'How long do you usually plan your investments for?',
    options: [
      'Less than a year',
      '1–3 years',
      '3–7 years',
      'More than 7 years',
    ],
  },
  {
    question: 'How much of your income do you currently save?',
    options: [
      'Less than 10%',
      '10–20%',
      '20–30%',
      'More than 30%',
    ],
  },
  {
    question: 'How prepared are you for unexpected expenses?',
    options: [
      'I have almost no emergency savings',
      'I have some savings',
      'I have around 3 months covered',
      'I have 6+ months covered',
    ],
  },
  {
    question: 'How often do you track your expenses?',
    options: [
      'Almost never',
      'Occasionally',
      'Every week',
      'Almost every day',
    ],
  },
  {
    question: 'What describes your spending style?',
    options: [
      'I am very careful',
      'I mostly plan before spending',
      'I spend freely but stay aware',
      'I often spend impulsively',
    ],
  },
  {
    question: 'What would you do if your investments dropped 20%?',
    options: [
      'Sell immediately',
      'Wait and see',
      'Keep investing',
      'Invest more',
    ],
  },
  {
    question: 'How would you describe your financial confidence?',
    options: [
      'I need a lot of guidance',
      'I understand the basics',
      'I feel fairly confident',
      'I am very confident',
    ],
  },
]

function Onboarding({ onClose }) {

  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState([])
  const closeButtonRef = useRef(null)
  const { saveOnboarding } = useFinance()

  useEffect(() => {
    closeButtonRef.current?.focus()
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const question = questions[current]

  const chooseAnswer = (answer) => {

    const updatedAnswers = [
      ...answers,
    ]

    updatedAnswers[current] = answer

    setAnswers(updatedAnswers)

    if (current < questions.length - 1) {
      setCurrent(current + 1)
    }
  }

  const previous = () => {

    if (current > 0) {
      setCurrent(current - 1)
    }
  }

  const finishAssessment = () => {
    const riskAnswer = answers[2] || ''
    const savingsAnswer = answers[4] || ''
    const personality = riskAnswer.includes('high') || savingsAnswer.includes('Less')
      ? 'Cautious Builder'
      : riskAnswer.includes('moderate')
        ? 'Balanced Grower'
        : 'Focused Planner'
    saveOnboarding(answers, personality)
    onClose()
  }

  const progress =
    ((current + 1) / questions.length) * 100

  return (
    <div className="modal-overlay">

      <div className="onboarding-modal">

        <button
          className="modal-close"
          ref={closeButtonRef}
          type="button"
          aria-label="Close assessment"
          onClick={onClose}
        >
          ×
        </button>


        <div className="onboarding-top">

          <div>

            <p className="eyebrow">
              Arthiq assessment
            </p>

            <span>
              Question {current + 1} of {questions.length}
            </span>

          </div>

          <strong>
            {Math.round(progress)}%
          </strong>

        </div>


        <div className="onboarding-progress">
          <span style={{ width: `${progress}%` }} />
        </div>


        <h2>
          {question.question}
        </h2>


        <div className="question-options">

          {question.options.map(
            (option) => (

              <button
                key={option}
                className={
                  answers[current] === option
                    ? 'selected'
                    : ''
                }
                onClick={() =>
                  chooseAnswer(option)
                }
              >
                {option}
              </button>

            )
          )}

        </div>


        <div className="onboarding-navigation">

          <button
            className="outline-button"
            onClick={previous}
            disabled={current === 0}
          >
            ← Previous
          </button>

          {current === questions.length - 1 && (

            <button
              className="primary-button"
              onClick={finishAssessment}
            >
              Finish assessment →
            </button>

          )}

        </div>

      </div>

    </div>
  )
}

export default Onboarding