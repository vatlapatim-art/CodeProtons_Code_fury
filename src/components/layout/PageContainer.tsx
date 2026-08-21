import { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

interface PageContainerProps {
  children: ReactNode
  className?: string
}

export function PageContainer({ children, className = '' }: PageContainerProps) {
  return (
    <div className={`min-h-screen flex flex-col bg-background ${className}`}>
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export function AuthPageContainer({ children, className = '' }: PageContainerProps) {
  return (
    <div className={`min-h-screen flex flex-col bg-background ${className}`}>
      <main className="flex-1 w-full max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12 flex items-center justify-center">
        {children}
      </main>
      <footer className="px-4 py-6 text-center text-sm text-muted border-t border-line">
        <p>© 2024 Arthiq. All rights reserved.</p>
      </footer>
    </div>
  )
}