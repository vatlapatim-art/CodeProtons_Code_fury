import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, RiskProfile, Goal } from '@/types'

interface AuthState {
  user: User | null
  setUser: (user: User | null) => void
  clearUser: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    { name: 'auth-store' }
  )
)

interface RiskState {
  riskProfile: RiskProfile | null
  setRiskProfile: (profile: RiskProfile) => void
  clearRiskProfile: () => void
}

export const useRiskStore = create<RiskState>()(
  persist(
    (set) => ({
      riskProfile: null,
      setRiskProfile: (profile) => set({ riskProfile: profile }),
      clearRiskProfile: () => set({ riskProfile: null }),
    }),
    { name: 'risk-store' }
  )
)

interface GoalsState {
  goals: Goal[]
  addGoal: (goal: Goal) => void
  updateGoal: (id: string, updates: Partial<Goal>) => void
  deleteGoal: (id: string) => void
  setGoals: (goals: Goal[]) => void
}

export const useGoalsStore = create<GoalsState>()(
  persist(
    (set) => ({
      goals: [],
      addGoal: (goal) => set((state) => ({ goals: [...state.goals, goal] })),
      updateGoal: (id, updates) => set((state) => ({
        goals: state.goals.map((g) => g.id === id ? { ...g, ...updates } : g)
      })),
      deleteGoal: (id) => set((state) => ({
        goals: state.goals.filter((g) => g.id !== id)
      })),
      setGoals: (goals) => set({ goals }),
    }),
    { name: 'goals-store' }
  )
)