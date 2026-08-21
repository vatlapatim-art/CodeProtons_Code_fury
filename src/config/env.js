export const env = {
  apiUrl: import.meta.env.VITE_ARTHIQ_API_URL || '',
  apiKey: import.meta.env.VITE_ARTHIQ_API_KEY || '',
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
}

export const hasApiConfig = Boolean(env.apiUrl)
export const hasSupabaseConfig = Boolean(
  env.supabaseUrl && env.supabaseAnonKey
)
