import Link from 'next/link'

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 9.724h-3.304l-7.124-8.186-8.49 9.724h-3.296l7.976-9.166-7.962-9.14h3.296l7.124 8.166 8.458-9.701h-3.296l-7.97 9.138 7.954 9.135h3.299l-7.964-9.12 7.527-8.618z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
)

export function Footer() {
  return (
    <footer className="bg-surface border-t border-line mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center gap-2" aria-label="Arthiq Home">
              <span className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-lg">✦</span>
              <span className="font-bold text-xl text-ink">Arthiq</span>
            </Link>
            <p className="text-sm text-muted mt-4 max-w-xs">Understand your money before you invest it.</p>
          </div>
          <div>
            <h4 className="font-semibold text-ink mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/methodology" className="hover:text-primary transition-colors">Methodology</Link></li>
              <li><Link href="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-ink mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-ink mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/security" className="hover:text-primary transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-line">
          <p className="text-sm text-muted">© 2024 Arthiq. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2 rounded-lg text-muted hover:text-primary hover:bg-line transition-colors">
              <LinkedInIcon />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="p-2 rounded-lg text-muted hover:text-primary hover:bg-line transition-colors">
              <TwitterIcon />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 rounded-lg text-muted hover:text-primary hover:bg-line transition-colors">
              <InstagramIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
