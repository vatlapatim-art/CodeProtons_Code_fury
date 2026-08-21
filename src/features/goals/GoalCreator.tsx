'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X, Calendar, Target, Flag } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Modal } from '@/components/ui/Modal'
import { SIPCalculator } from './SIPCalculator'
import type { RiskProfile } from '@/types'

const goalSchema = z.object({
  name: z.string().min(2, 'Goal name must be at least 2 characters'),
  targetAmount: z.number().min(1000, 'Target must be at least ₹1,000'),
  targetDate: z.string().refine(d => new Date(d) > new Date(), 'Target date must be in the future'),
  priority: z.enum(['essential', 'aspirational']),
})

const goalTypes = [
  { value: 'New Home', label: '🏠 New Home' },
  { value: 'Retirement', label: '🏖️ Retirement' },
  { value: 'Child Education', label: '🎓 Child Education' },
  { value: 'Emergency Fund', label: '🛡️ Emergency Fund' },
  { value: 'Custom', label: '✨ Custom Goal' },
]

interface GoalCreatorProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (goal: GoalFormData) => void
  riskProfile?: RiskProfile
}

interface GoalFormData {
  name: string
  targetAmount: number
  targetDate: string
  priority: 'essential' | 'aspirational'
}

export function GoalCreator({ isOpen, onClose, onSubmit, riskProfile }: GoalCreatorProps) {
  const [selectedType, setSelectedType] = useState('Custom')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<GoalFormData>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      targetDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000 * 5).toISOString().split('T')[0],
      priority: 'essential',
    },
  })

  const watchedName = watch('name')
  const isCustom = watchedName === 'Custom' || selectedType === 'Custom'

  const handleTypeSelect = (type: string) => {
    setSelectedType(type)
    if (type !== 'Custom') {
      setValue('name', type)
    }
  }

  const onFormSubmit = (data: GoalFormData) => {
    onSubmit(data)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Goal" size="lg">
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-ink mb-3">Select Goal Type</label>
          <div className="grid grid-cols-2 gap-2">
            {goalTypes.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => handleTypeSelect(type.value)}
                className={`p-3 rounded-xl border-2 text-left transition-all ${
                  selectedType === type.value
                    ? 'border-primary bg-primary/5'
                    : 'border-line hover:border-primary/50'
                }`}
              >
                <span className="text-lg">{type.label.split(' ')[0]}</span>
                <span className="ml-2 font-medium text-ink">{type.label.split(' ').slice(1).join(' ')}</span>
              </button>
            ))}
          </div>
        </div>

        {isCustom && (
          <Input
            label="Goal Name"
            {...register('name')}
            placeholder="e.g., World Tour, Startup Fund"
            error={errors.name?.message}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Target Amount (₹)"
            type="number"
            min="1000"
            step="1000"
            {...register('targetAmount', { valueAsNumber: true })}
            placeholder="10,00,000"
            error={errors.targetAmount?.message}
          />
          <div className="relative">
            <Input
              label="Target Date"
              type="date"
              {...register('targetDate')}
              min={new Date().toISOString().split('T')[0]}
              error={errors.targetDate?.message}
            />
            <Calendar className="absolute right-3 top-9 w-5 h-5 text-muted pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-2">Priority</label>
          <div className="flex gap-4">
            {['essential', 'aspirational'].map((priority) => (
              <label
                key={priority}
                className={`flex items-center gap-2 p-4 rounded-xl border-2 cursor-pointer flex-1 transition-all ${
                  watch('priority') === priority
                    ? 'border-primary bg-primary/5'
                    : 'border-line hover:border-primary/50'
                }`}
              >
                <input
                  type="radio"
                  {...register('priority')}
                  value={priority}
                  className="w-4 h-4 text-primary"
                />
                <div>
                  <p className="font-medium text-ink capitalize">{priority}</p>
                  <p className="text-xs text-muted">
                    {priority === 'essential' ? 'Must achieve (retirement, emergency)' : 'Nice to have (vacation, luxury)'}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <SIPCalculator
          riskProfile={riskProfile}
          initialTarget={watch('targetAmount') || undefined}
          initialDate={watch('targetDate') || undefined}
        />

        <div className="flex gap-3 pt-4 border-t border-line">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            <X className="w-4 h-4 mr-2" /> Cancel
          </Button>
          <Button type="submit" className="flex-1">
            <Target className="w-4 h-4 mr-2" /> Create Goal
          </Button>
        </div>
      </form>
    </Modal>
  )
}