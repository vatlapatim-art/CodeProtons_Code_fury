'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Trash2, Edit, Target, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Progress } from '@/components/ui/Progress'
import { PageContainer } from '@/components/layout/PageContainer'
import { GoalCreator } from './GoalCreator'
import { SIPCalculator } from './SIPCalculator'
import { ConfidenceMeter } from './ConfidenceMeter'
import { GoalTimeline } from './GoalTimeline'
import { useGoalsStore } from '@/hooks/stores'
import { useRiskStore } from '@/hooks/stores'
import { formatCurrency, formatPercent } from '@/lib/utils'
import { requiredSIP, futureValue, getExpectedReturn } from '@/lib/sipCalculator'
import { confidenceMonteCarlo, getConfidenceLabel, getConfidenceColor } from '@/lib/confidenceEngine'
import type { RiskProfile } from '@/types'

export function GoalsPage() {
  const { goals, addGoal, updateGoal, deleteGoal } = useGoalsStore()
  const { riskProfile } = useRiskStore()
  const [isCreatorOpen, setIsCreatorOpen] = useState(false)
  const [editingGoal, setEditingGoal] = useState<typeof goals[0] | null>(null)

  const handleCreateGoal = (data: any) => {
    const annualRate = riskProfile ? getExpectedReturn(riskProfile.tier) : 12
    const years = Math.max(1, Math.ceil((new Date(data.targetDate).getTime() - Date.now()) / (365 * 24 * 60 * 60 * 1000)))
    const monthlySIP = requiredSIP(annualRate, years, data.targetAmount)
    const confidence = confidenceMonteCarlo({
      monthlySIP,
      annualRate,
      years,
      targetAmount: data.targetAmount,
      riskProfile: riskProfile || { tier: 'moderate', allocation: { equity: 60, debt: 25, gold: 10, cash: 5 }, confidence: 70, score: 50 }
    })

    const newGoal = {
      id: crypto.randomUUID(),
      name: data.name,
      targetAmount: data.targetAmount,
      targetDate: data.targetDate,
      priority: data.priority,
      currentAmount: 0,
      monthlySIP,
      confidencePct: confidence,
      createdAt: new Date().toISOString(),
    }
    addGoal(newGoal)
  }

  const handleUpdateProgress = (goalId: string, amount: number) => {
    const goal = goals.find(g => g.id === goalId)
    if (goal) {
      updateGoal(goalId, { currentAmount: Math.min(goal.currentAmount + amount, goal.targetAmount) })
    }
  }

  const calculateGoalMetrics = (goal: typeof goals[0]) => {
    const annualRate = riskProfile ? getExpectedReturn(riskProfile.tier) : 12
    const years = Math.max(1, Math.ceil((new Date(goal.targetDate).getTime() - Date.now()) / (365 * 24 * 60 * 60 * 1000)))
    const fv = futureValue(goal.monthlySIP, annualRate, years)
    const progress = goal.targetAmount > 0 ? (goal.currentAmount / goal.targetAmount) * 100 : 0
    const confidence = confidenceMonteCarlo({
      monthlySIP: goal.monthlySIP,
      annualRate,
      years,
      targetAmount: goal.targetAmount,
      riskProfile: riskProfile || { tier: 'moderate', allocation: { equity: 60, debt: 25, gold: 10, cash: 5 }, confidence: 70, score: 50 }
    })
    return { progress, fv, confidence, years }
  }

  if (goals.length === 0) {
    return (
      <PageContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center py-16"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <Target className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-ink mb-2">No Goals Yet</h1>
          <p className="text-muted mb-8">Create your first financial goal to see SIP recommendations and track progress.</p>
          <Button size="lg" onClick={() => setIsCreatorOpen(true)}>
            <Plus className="w-5 h-5 mr-2" /> Create Your First Goal
          </Button>
          <GoalCreator isOpen={isCreatorOpen} onClose={() => setIsCreatorOpen(false)} onSubmit={handleCreateGoal} riskProfile={riskProfile || undefined} />
        </motion.div>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-ink">Goals</h1>
            <p className="text-muted">Track your financial milestones with SIP planning</p>
          </div>
          <Button onClick={() => setIsCreatorOpen(true)}>
            <Plus className="w-5 h-5 mr-2" /> New Goal
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal, index) => {
            const { progress, fv, confidence, years } = calculateGoalMetrics(goal)
            const confidenceColor = getConfidenceColor(confidence)
            const confidenceLabel = getConfidenceLabel(confidence)

            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Target className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-ink">{goal.name}</h3>
                        <Badge variant={goal.priority === 'essential' ? 'success' : 'warning'} size="sm">
                          {goal.priority}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => setEditingGoal(goal)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteGoal(goal.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Target</span>
                      <span className="font-semibold text-ink">{formatCurrency(goal.targetAmount, { compact: true })}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Current</span>
                      <span className="font-semibold text-primary">{formatCurrency(goal.currentAmount, { compact: true })}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Monthly SIP</span>
                      <span className="font-semibold text-secondary">{formatCurrency(goal.monthlySIP, { compact: true })}/mo</span>
                    </div>
                    <Progress value={progress} color={confidenceColor} size="sm" showLabel label={`${progress.toFixed(1)}% funded`} />
                  </div>

                  <ConfidenceMeter
                    confidence={confidence}
                    monthlySIP={goal.monthlySIP}
                    targetAmount={goal.targetAmount}
                    yearsToGoal={years}
                    riskProfile={riskProfile || undefined}
                    compact
                  />

                  <GoalTimeline
                    currentAmount={goal.currentAmount}
                    targetAmount={goal.targetAmount}
                    monthlySIP={goal.monthlySIP}
                    yearsToGoal={years}
                    targetDate={goal.targetDate}
                  />

                  <div className="flex gap-2 pt-2 border-t border-line mt-auto">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleUpdateProgress(goal.id, goal.monthlySIP)}>
                      <TrendingUp className="w-4 h-4 mr-2" /> Add SIP
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setEditingGoal(goal)}>
                      Edit
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <GoalCreator isOpen={isCreatorOpen} onClose={() => setIsCreatorOpen(false)} onSubmit={handleCreateGoal} riskProfile={riskProfile || undefined} />
        {editingGoal && (
          <GoalCreator
            isOpen={true}
            onClose={() => setEditingGoal(null)}
            onSubmit={(data) => {
              const annualRate = riskProfile ? getExpectedReturn(riskProfile.tier) : 12
              const years = Math.max(1, Math.ceil((new Date(data.targetDate).getTime() - Date.now()) / (365 * 24 * 60 * 60 * 1000)))
              const monthlySIP = requiredSIP(annualRate, years, data.targetAmount)
              const confidence = confidenceMonteCarlo({
                monthlySIP,
                annualRate,
                years,
                targetAmount: data.targetAmount,
                riskProfile: riskProfile || { tier: 'moderate', allocation: { equity: 60, debt: 25, gold: 10, cash: 5 }, confidence: 70, score: 50 }
              })
              updateGoal(editingGoal.id, { ...data, monthlySIP, confidencePct: confidence })
              setEditingGoal(null)
            }}
            riskProfile={riskProfile || undefined}
          />
        )}
      </motion.div>
    </PageContainer>
  )
}