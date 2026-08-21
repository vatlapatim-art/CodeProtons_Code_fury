import { describe, expect, it } from 'vitest'
import { formatCurrency, validateGoal, validateTransaction } from './finance'
import { hasSupabaseConfig } from '../config/env.js'
import { supabaseStatus, goals as supabaseGoals } from '../data/supabaseService.js'

describe('finance utilities', () => {
  it('formats Indian currency', () => {
    expect(formatCurrency(22320)).toBe('₹22,320')
  })

  it('rejects invalid goals', () => {
    expect(validateGoal({ name: '', target: 0, current: -1, deadline: '' })).toEqual({
      name: 'Enter a goal name.',
      target: 'Target must be greater than zero.',
      current: 'Saved amount cannot be negative.',
      deadline: 'Enter a deadline.',
    })
  })

  it('validates transactions', () => {
    expect(validateTransaction({ name: 'Lunch', category: 'Food', amount: -420, date: '2026-08-01' })).toEqual({})
    expect(validateTransaction({ name: 'Lunch', category: '', amount: 0, date: 'invalid' })).toMatchObject({
      category: 'Choose a category.',
      amount: 'Amount must be a non-zero number.',
      date: 'Enter a valid date.',
    })
  })

  it('keeps Supabase disabled without environment variables', async () => {
    expect(hasSupabaseConfig).toBe(false)
    expect(supabaseStatus()).toEqual({ configured: false, mode: 'local' })
    await expect(supabaseGoals.list()).resolves.toEqual({
      ok: false,
      configured: false,
      error: 'Supabase is not configured; localStorage remains active.',
    })
  })
})
