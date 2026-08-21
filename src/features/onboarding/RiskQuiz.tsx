import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronLeft } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Input, Select } from '../../components/ui/Input'
import { Progress } from '../../components/ui/Progress'
import { useRiskStore } from '../../hooks/stores'
import { calculateRiskProfile } from '../../lib/riskEngine'
import type { RiskAnswers } from '../../types'

const riskSchema = z.object({
  incomeStability: z.enum(['salaried', 'freelance', 'business', 'variable']),
  primaryGoal: z.enum(['wealth', 'income', 'preservation', 'specific']),
  timeHorizon: z.enum(['<1y', '1-3y', '3-5y', '5-10y', '10y+']),
  lossTolerance: z.enum(['0-5%', '5-15%', '15-30%', '30%+']),
  experience: z.enum(['none', 'beginner', 'intermediate', 'advanced']),
  liquidityNeed: z.enum(['immediate', '1m', '3m', '6m', '1y+']),
})

const questions = [
  {
    key: 'incomeStability' as const,
    label: 'What best describes your income stability?',
    options: [
      { value: 'salaried', label: 'Salaried — Stable monthly income' },
      { value: 'freelance', label: 'Freelance — Variable but consistent' },
      { value: 'business', label: 'Business owner — Growing but unpredictable' },
      { value: 'variable', label: 'Variable — Irregular or uncertain income' },
    ],
  },
  {
    key: 'primaryGoal' as const,
    label: 'What is your primary investment goal?',
    options: [
      { value: 'wealth', label: 'Wealth creation — Long-term capital growth' },
      { value: 'specific', label: 'Specific goal — House, education, retirement' },
      { value: 'income', label: 'Regular income — Dividends, interest, SWP' },
      { value: 'preservation', label: 'Capital preservation — Protect what you have' },
    ],
  },
  {
    key: 'timeHorizon' as const,
    label: 'What is your investment time horizon?',
    options: [
      { value: '10y+', label: '10+ years — Very long term' },
      { value: '5-10y', label: '5–10 years — Long term' },
      { value: '3-5y', label: '3–5 years — Medium term' },
      { value: '1-3y', label: '1–3 years — Short term' },
      { value: '<1y', label: '< 1 year — Very short term' },
    ],
  },
  {
    key: 'lossTolerance' as const,
    label: 'How much temporary portfolio decline can you tolerate?',
    options: [
      { value: '30%+', label: '30%+ — I stay invested through deep drawdowns' },
      { value: '15-30%', label: '15–30% — Uncomfortable but I hold' },
      { value: '5-15%', label: '5–15% — I get nervous, might sell some' },
      { value: '0-5%', label: '0–5% — I need stability, minimal losses' },
    ],
  },
  {
    key: 'experience' as const,
    label: 'What is your investment experience level?',
    options: [
      { value: 'advanced', label: 'Advanced — Active investor, understand derivatives' },
      { value: 'intermediate', label: 'Intermediate — Comfortable with MFs, stocks' },
      { value: 'beginner', label: 'Beginner — Started with SIPs, learning basics' },
      { value: 'none', label: 'None — First time investing' },
    ],
  },
  {
    key: 'liquidityNeed' as const,
    label: 'How quickly might you need access to these funds?',
    options: [
      { value: '1y+', label: '1+ years — No immediate need' },
      { value: '6m', label: '6 months — Possible but not certain' },
      { value: '3m', label: '3 months — Likely need' },
      { value: '1m', label: '1 month — High liquidity needed' },
      { value: 'immediate', label: 'Immediate — Emergency access required' },
    ],
  },
]

export function RiskQuiz() {
  const { setRiskProfile } = useRiskStore()
  const [currentStep, setCurrentStep] = useState(0)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RiskAnswers>({
    resolver: zodResolver(riskSchema),
    mode: 'onChange',
  })

  const watchedValues = watch()
  const answeredCount = Object.values(watchedValues).filter(v => v !== undefined).length
  const progress = (answeredCount / questions.length) * 100

  const onSubmit = (data: RiskAnswers) => {
    const profile = calculateRiskProfile(data)
    setRiskProfile(profile)
    setCurrentStep(questions.length)
  }

  if (currentStep === questions.length) {
    return <RiskQuizResults profile={calculateRiskProfile(watchedValues as RiskAnswers)} />
  }

  const question = questions[currentStep]

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-muted mb-2">
          <span>Question {currentStep + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <Progress value={progress} size="lg" color="primary" />
      </div>

      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <div>
          <h2 className="text-2xl font-bold text-ink mb-6">{question.label}</h2>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3" role="radiogroup" aria-label={question.label}>
              {question.options.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    watchedValues[question.key] === option.value
                      ? 'border-primary bg-primary/5'
                      : 'border-line hover:border-primary/50'
                  }`}
                >
                  <input
                    type="radio"
                    {...register(question.key)}
                    value={option.value}
                    className="w-5 h-5 text-primary border-primary focus:ring-primary"
                    aria-label={option.label}
                  />
                  <span className="text-ink font-medium">{option.label}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-2" /> Back
              </Button>
              <Button
                type="submit"
                size="lg"
                disabled={!watchedValues[question.key] || isSubmitting}
              >
                {currentStep === questions.length - 1 ? 'See My Profile' : 'Next'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

function RiskQuizResults({ profile }: { profile: ReturnType<typeof calculateRiskProfile> }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center space-y-6"
    >
      <div className="w-24 h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
        <span className="text-3xl font-bold text-primary">{profile.tier[0].toUpperCase()}</span>
      </div>
      <h2 className="text-2xl font-bold text-ink">Your Profile: <span className="text-primary">{profile.tier.charAt(0).toUpperCase() + profile.tier.slice(1)}</span></h2>
      <p className="text-muted max-w-md mx-auto">{getRiskTierDescription(profile.tier)}</p>
      
      <div className="grid grid-cols-2 gap-4 p-4 bg-surface rounded-xl border border-line">
        <div className="text-center">
          <p className="text-3xl font-bold text-primary">{profile.allocation.equity}%</p>
          <p className="text-sm text-muted">Equity</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-secondary">{profile.allocation.debt}%</p>
          <p className="text-sm text-muted">Debt</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-yellow-500">{profile.allocation.gold}%</p>
          <p className="text-sm text-muted">Gold</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-muted">{profile.allocation.cash}%</p>
          <p className="text-sm text-muted">Cash</p>
        </div>
      </div>

      <p className="text-sm text-muted">Confidence Score: <span className="font-semibold text-ink">{profile.confidence}%</span></p>

      <Button size="lg" asChild className="w-full">
        <a href="/onboarding/connect">Simulate Account Connection <ArrowRight className="w-4 h-4 ml-2" /></a>
      </Button>
    </motion.div>
  )
}

function getRiskTierDescription(tier: string): string {
  const descriptions = {
    conservative: 'You prefer stability over growth. Your portfolio focuses on capital preservation with modest returns.',
    moderate: 'You seek balanced growth with managed risk. Your portfolio mixes growth and income assets.',
    aggressive: 'You prioritize long-term growth and accept higher volatility. Your portfolio is equity-heavy.',
  }
  return descriptions[tier as keyof typeof descriptions] || ''
}