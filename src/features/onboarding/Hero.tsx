'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp, Shield, Target, Zap } from 'lucide-react'
import { Button } from '../../components/ui/Button'

const features = [
  { icon: Target, title: 'Risk Profiling', desc: '6-question assessment to understand your risk tolerance' },
  { icon: Shield, title: 'Portfolio Consolidation', desc: 'Single view across Zerodha, Groww, Coin, EPF & more' },
  { icon: Zap, title: 'Goal-Based Planning', desc: 'SIP calculator with confidence meter tied to your profile' },
  { icon: TrendingUp, title: 'Plain-Language Insights', desc: 'Why this recommendation — not black-box advice' },
]

export function Hero() {
  return (
    <section className="py-16 md:py-24">
      <div className="text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-primary/10 text-primary text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            New: AI-powered portfolio insights
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-ink leading-tight mb-6"
        >
          Understand your money{' '}
          <span className="text-primary">before you invest it</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10"
        >
          From SIPs to portfolio consolidation — make informed decisions with confidence.
          No jargon. No hidden agendas. Just clear, actionable guidance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Button size="lg" asChild>
            <Link href="/onboarding/quiz">Start Free Assessment <ArrowRight className="w-5 h-5" /></Link>
          </Button>
          <Button variant="outline" size="lg">View Demo Dashboard</Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex items-center justify-center gap-2 text-sm text-muted"
        >
          <span className="flex items-center gap-1"><TrendingUp className="w-4 h-4" /> 10,000+ investors</span>
          <span className="w-px h-6 bg-line mx-2" />
          <span className="flex items-center gap-1"><Shield className="w-4 h-4" /> SEBI-compliant methodology</span>
          <span className="w-px h-6 bg-line mx-2" />
          <span className="flex items-center gap-1"><Target className="w-4 h-4" /> 94% user satisfaction</span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="group p-6 bg-surface rounded-xl border border-line hover:border-primary/50 hover:shadow-soft transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <feature.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-ink mb-2">{feature.title}</h3>
            <p className="text-muted text-sm">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
