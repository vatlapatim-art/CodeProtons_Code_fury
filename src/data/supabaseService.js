import { getSupabaseClient, hasSupabaseConfig } from './supabaseClient.js'

const NOT_CONFIGURED = 'Supabase is not configured; localStorage remains active.'

const notConfigured = () => ({
  ok: false,
  configured: false,
  error: NOT_CONFIGURED,
})

const requireClient = () => {
  const client = getSupabaseClient()
  if (!client) return null
  return client
}

export const supabaseStatus = () => ({
  configured: hasSupabaseConfig,
  mode: hasSupabaseConfig ? 'pending-sdk' : 'local',
})

export const signIn = async (email, password) => {
  const client = requireClient()
  if (!client) return notConfigured()
  return client.auth.signInWithPassword({ email, password })
}

export const signOut = async () => {
  const client = requireClient()
  if (!client) return notConfigured()
  return client.auth.signOut()
}

export const getCurrentUser = async () => {
  const client = requireClient()
  if (!client) return notConfigured()
  return client.auth.getUser()
}

const resourceService = (table) => ({
  list: async () => {
    const client = requireClient()
    if (!client) return notConfigured()
    return client.from(table).select('*')
  },
  create: async (record) => {
    const client = requireClient()
    if (!client) return notConfigured()
    return client.from(table).insert(record).select().single()
  },
  update: async (id, changes) => {
    const client = requireClient()
    if (!client) return notConfigured()
    return client.from(table).update(changes).eq('id', id).select().single()
  },
  remove: async (id) => {
    const client = requireClient()
    if (!client) return notConfigured()
    return client.from(table).delete().eq('id', id)
  },
})

export const profiles = resourceService('profiles')
export const goals = resourceService('goals')
export const investments = resourceService('investments')
export const transactions = resourceService('transactions')
export const budgets = resourceService('budgets')
export const debts = resourceService('debts')
export const emergencyFunds = resourceService('emergency_funds')
export const notifications = resourceService('notifications')
