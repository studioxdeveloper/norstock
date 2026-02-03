import { motion } from 'framer-motion'
import { 
  TrendingUp, TrendingDown, ChevronRight, Bell, Plus, ArrowUpRight, ArrowDownRight
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { formatCurrency, formatNumber, formatPercentage, cn } from '@/lib/utils'
import { Header } from '@/components/Header'
import { companyLogos, DefaultCompanyLogo } from '@/components/CompanyLogos'

// Mock data
const portfolioSummary = {
  totalValue: 1250000,
  change: 45000,
  changePercent: 3.7,
}

const holdings = [
  { id: '1', name: 'TechStart AS', shares: 500, value: 450000, change: 5.2 },
  { id: '2', name: 'GreenEnergy Norge', shares: 200, value: 320000, change: -2.1 },
  { id: '3', name: 'Nordic FinTech', shares: 150, value: 280000, change: 8.4 },
  { id: '4', name: 'Seafood Innovation', shares: 100, value: 200000, change: 1.3 },
]

const recentActivity = [
  { type: 'news', company: 'TechStart AS', title: 'Ny emisjon planlegges', time: '2t' },
  { type: 'match', company: 'Nordic FinTech', title: 'Ny kjøpsinteresse matcher din', time: '5t' },
  { type: 'forum', company: 'GreenEnergy Norge', title: 'Ny diskusjon om Q4-rapporten', time: '1d' },
]

export function PortfolioPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen">
      <Header 
        title="Din portefølje" 
        rightAction={
          <button className="w-10 h-10 rounded-full glass flex items-center justify-center press-effect relative">
            <Bell className="w-5 h-5 text-slate-600 dark:text-white" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-brand-500 rounded-full" />
          </button>
        }
      />

      <div className="px-4 py-4">
        {/* Portfolio summary card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-3xl p-6 mb-6"
        >
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Total verdi</p>
          <div className="flex items-end gap-3 mb-4">
            <span className="text-4xl font-bold text-slate-900 dark:text-white">{formatCurrency(portfolioSummary.totalValue)}</span>
          </div>
          <div className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium',
            portfolioSummary.change >= 0 
              ? 'bg-accent-green/20 text-accent-green' 
              : 'bg-accent-red/20 text-accent-red'
          )}>
            {portfolioSummary.change >= 0 ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            {formatCurrency(Math.abs(portfolioSummary.change))} ({formatPercentage(portfolioSummary.changePercent)})
          </div>
        </motion.div>

        {/* Holdings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Mine aksjer</h2>
            <button className="text-brand-500 dark:text-brand-400 text-sm font-medium flex items-center gap-1 press-effect">
              <Plus className="w-4 h-4" />
              Legg til
            </button>
          </div>

          <div className="space-y-3">
            {holdings.map((holding, i) => (
              <motion.button
                key={holding.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                onClick={() => navigate(`/companies/${holding.id}`)}
                className="w-full glass rounded-2xl p-4 flex items-center gap-4 press-effect text-left"
              >
                {(() => {
                  const Logo = companyLogos[holding.id]
                  return Logo ? (
                    <Logo className="w-12 h-12" />
                  ) : (
                    <DefaultCompanyLogo className="w-12 h-12" initials={holding.name.slice(0, 2).toUpperCase()} />
                  )
                })()}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate text-slate-900 dark:text-white">{holding.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{formatNumber(holding.shares)} aksjer</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-900 dark:text-white">{formatCurrency(holding.value)}</p>
                  <p className={cn(
                    'text-sm flex items-center justify-end gap-0.5',
                    holding.change >= 0 ? 'text-accent-green' : 'text-accent-red'
                  )}>
                    {holding.change >= 0 ? (
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowDownRight className="w-3.5 h-3.5" />
                    )}
                    {formatPercentage(holding.change)}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-500" />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Recent activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Siste aktivitet</h2>
          <div className="space-y-3">
            {recentActivity.map((activity, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-4 flex items-start gap-3"
              >
                <div className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
                  activity.type === 'news' && 'bg-brand-500/20',
                  activity.type === 'match' && 'bg-accent-green/20',
                  activity.type === 'forum' && 'bg-accent-orange/20',
                )}>
                  <div className={cn(
                    'w-2 h-2 rounded-full',
                    activity.type === 'news' && 'bg-brand-400',
                    activity.type === 'match' && 'bg-accent-green',
                    activity.type === 'forum' && 'bg-accent-orange',
                  )} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-500 dark:text-slate-400">{activity.company}</p>
                  <p className="font-medium truncate text-slate-900 dark:text-white">{activity.title}</p>
                </div>
                <span className="text-xs text-slate-400 dark:text-slate-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
