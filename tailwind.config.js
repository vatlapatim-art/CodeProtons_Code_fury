/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#10b981',
        background: '#f8fafc',
        surface: '#ffffff',
        error: '#ef4444',
        success: '#22c55e',
        ink: '#1e293b',
        muted: '#64748b',
        line: '#e2e8f0',
      },
      borderRadius: {
        'xl': '16px',
        'pill': '9999px',
      },
      boxShadow: {
        'soft': '0 8px 28px rgba(30,41,59,0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}