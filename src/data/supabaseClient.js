import { env, hasSupabaseConfig } from '../config/env.js'

export { hasSupabaseConfig }

export const supabaseConfig = {
  url: env.supabaseUrl,
  anonKey: env.supabaseAnonKey,
}

export const getSupabaseClient = () => {
  if (!hasSupabaseConfig) return null

  throw new Error(
    'Supabase is configured but the client SDK is not enabled yet. Install @supabase/supabase-js when backend integration begins.'
  )
}
