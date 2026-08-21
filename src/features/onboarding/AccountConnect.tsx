'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Database, Upload, User, Zap, Shield } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
import { seedMockPortfolio } from '../../data/mockPortfolio'

import { useRouter } from 'next/navigation'
import { useToast } from '../../components/ui/Toast'

export function AccountConnect() {
  const router = useRouter()
  const { toast } = useToast()

  const handleSimulate = () => {
    seedMockPortfolio()
    toast({
      type: 'success',
      title: 'Portfolio connected!',
      message: 'Mock data loaded. Redirecting to dashboard...',
    })
    setTimeout(() => router.push('/dashboard'), 1500)
  }

  const methods = [
    {
      icon: Zap,
      title: 'Account Aggregator (AA)',
      desc: 'Connect via India\'s AA framework — secure, consent-based',
      badge: 'Coming Soon',
      action: () => {},
      disabled: true,
    },
    {
      icon: Database,
      title: 'Simulate Connection',
      desc: 'Load mock portfolio data instantly for demo',
      badge: 'Demo Mode',
      action: handleSimulate,
      primary: true,
    },
    {
      icon: Upload,
      title: 'Upload CSV',
      desc: 'Export from Zerodha, Groww, Coin and upload here',
      badge: 'Manual',
      action: () => {},
      disabled: true,
    },
    {
      icon: User,
      title: 'Manual Entry',
      desc: 'Add holdings one by one — full control',
      badge: 'Manual',
      action: () => {},
      disabled: true,
    },
  ]

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Database className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-ink mb-2">Connect Your Investments</h1>
        <p className="text-muted max-w-md mx-auto">
          Link your accounts to see your complete portfolio in one place.
          Choose the method that works best for you.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {methods.map((method, index) => (
          <motion.div
            key={method.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + index * 0.1 }}
            whileHover={{ y: -2 }}
          >
            <Card className={`h-full p-6 ${method.disabled ? 'opacity-60' : 'cursor-pointer hover:border-primary/50 hover:shadow-soft'}`}
              onClick={method.action}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <method.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-ink">{method.title}</h3>
                    <Badge variant="outline" size="sm">{method.badge}</Badge>
                  </div>
                  <p className="text-sm text-muted mb-3">{method.desc}</p>
                  <Button
                    variant={method.primary ? 'primary' : 'outline'}
                    size="sm"
                    disabled={method.disabled}
                    className="w-full"
                  >
                    {method.primary ? 'Simulate & Continue' : method.disabled ? 'Coming Soon' : 'Connect'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-4 bg-surface rounded-xl border border-line text-center"
      >
        <Shield className="w-5 h-5 text-primary mx-auto mb-2" />
        <p className="text-sm text-muted">
          Your data is encrypted and never shared. We use read-only access via Account Aggregator
          or local-only mock data for demos. <a href="/privacy" className="text-primary hover:underline ml-1">Privacy Policy</a>
        </p>
      </motion.div>
    </div>
  )
}