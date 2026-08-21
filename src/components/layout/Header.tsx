'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, User, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useAuthStore } from '@/hooks/stores'
import { Button } from '@/components/ui/Button'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, clearUser } = useAuthStore()
  const pathname = usePathname()

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/goals', label: 'Goals' },
    { path: '/spend', label: 'Spend' },
  ]

  const handleSignOut = () => {
    clearUser()
    window.location.href = '/'
  }

  if (!user) return null

  return (
    <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-line">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16">
          <Link href="/dashboard" className="flex items-center gap-2" aria-label="Arthiq Home">
            <span className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-lg">✦</span>
            <span className="font-bold text-xl text-ink">Arthiq</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-sm font-medium transition-colors ${
                  pathname === item.path
                    ? 'text-primary'
                    : 'text-muted hover:text-ink'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-line rounded-pill text-sm text-muted">
              <User className="w-4 h-4" />
              <span>{user.email?.split('@')[0] || 'User'}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4" />
              <span>Sign out</span>
            </Button>
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-ink hover:bg-line"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden py-4 border-t border-line animate-slide-down">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium ${
                    pathname === item.path
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted hover:bg-line hover:text-ink'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-line flex items-center gap-2 px-3 py-1.5 bg-line rounded-pill text-sm text-muted">
                <User className="w-4 h-4" />
                <span>{user.email?.split('@')[0] || 'User'}</span>
              </div>
              <Button variant="outline" className="w-full justify-start" onClick={handleSignOut}>
                <LogOut className="w-4 h-4" />
                <span>Sign out</span>
              </Button>
            </div>
          </div>
        )}
      </nav>
      <style jsx global>{`
        @keyframes slide-down { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slide-down { animation: slide-down 0.2s ease-out; }
      `}</style>
    </header>
  )
}
