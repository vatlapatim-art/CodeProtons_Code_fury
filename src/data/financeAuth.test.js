import { afterEach, describe, expect, it } from 'vitest'
import {
  getLocalSession,
  loginLocalUser,
  logoutLocalUser,
  registerLocalUser,
} from './financeService'

const createStorage = () => {
  const values = new Map()
  return {
    getItem: (key) => values.get(key) || null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  }
}

describe('local finance authentication', () => {
  afterEach(() => {
    delete globalThis.window
  })

  it('registers a user and restores the session', () => {
    globalThis.window = { localStorage: createStorage() }
    const result = registerLocalUser({ name: 'Asha', email: 'ASHA@example.com', password: 'secret1' })

    expect(result.user.email).toBe('asha@example.com')
    expect(getLocalSession()).toMatchObject({ name: 'Asha', email: 'asha@example.com' })
  })

  it('rejects duplicates and authenticates valid credentials', () => {
    globalThis.window = { localStorage: createStorage() }
    registerLocalUser({ name: 'Asha', email: 'asha@example.com', password: 'secret1' })

    expect(registerLocalUser({ name: 'Other', email: 'ASHA@example.com', password: 'secret2' })).toEqual({
      error: 'An account with this email already exists.',
    })
    expect(loginLocalUser({ email: 'asha@example.com', password: 'wrong' })).toEqual({
      error: 'Email or password is incorrect.',
    })
    expect(loginLocalUser({ email: 'ASHA@example.com', password: 'secret1' }).user.name).toBe('Asha')
  })

  it('clears the session on logout', () => {
    globalThis.window = { localStorage: createStorage() }
    registerLocalUser({ name: 'Asha', email: 'asha@example.com', password: 'secret1' })
    logoutLocalUser()
    expect(getLocalSession()).toBeNull()
  })
})
