export const env = {
  apiUrl: import.meta.env.VITE_ARTHIQ_API_URL || '',
  apiKey: import.meta.env.VITE_ARTHIQ_API_KEY || '',
}

export const hasApiConfig = Boolean(env.apiUrl)
