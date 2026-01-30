import { motion } from 'framer-motion'
import { 
  TrendingUp, ArrowUpRight, ArrowDownRight,
  ChevronRight, Users, Clock, Sparkles
} from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cn, formatNumber } from '@/lib/utils'
import { Header } from '@/components/Header'

const tabs = ['Alle', 'Kjøp', 'Salg', 'Mine']

const marketInterests = [
  {
    id: '1',
    company: 'TechStart AS',
    logo: '🚀',
    type: 'buy',
    shares: 200,
    priceRange: { min: 400, max: 500 },
    time: '2t',
    matches: 3,
  },
  {
    id: '2',
    company: 'Nordic FinTech',
    logo: '💳',
    type: 'sell',
    shares: 150,
    priceRange: { min: 600, max: 700 },
    time: '5t',
    matches: 1,
  },
  {
    id: '3',
    company: 'GreenEnergy Norge',
    logo: '🌱',
    type: 'buy',
    shares: 500,
    priceRange: { min: 250, max: 300 },
    time: '1d',
    matches: 0,
  },
  {
    id: '4',
    company: 'HealthTech Nordic',
    logo: '🏥',
    type: 'sell',
    shares: 100,
    priceRange: { min: 800, max: 900 },
    time: '2d',
    matches: 5,
  },
  {
    id: '5',
    company: 'Seafood Innovation',
    logo: '🐟',
    type: 'buy',
    shares: 300,
    priceRange: { min: 350, max: 400 },
    time: '3d',
    matches: 2,
  },
]

const stats = {
  totalBuy: 156,
  totalSell: 89,
  matchesToday: 12,
}

export function MarketplacePage() {
  const [activeTab, setActiveTab] = useState('Alle')
  const navigate = useNavigate()

  const filteredInterests = marketInterests.filter(interest => {
    if (activeTab === 'Alle') return true
    if (activeTab === 'Kjøp') return interest.type === 'buy'
    if (activeTab === 'Salg') return interest.type === 'sell'
    return false // 'Mine' would filter by user
  })

  return (
    <div className="min-h-screen">
      <Header title="Markedsplass" subtitle="Finn kjøpere og selgere" />

      <div className="px-4 py-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="glass rounded-2xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-accent-green mb-1">
              <ArrowUpRight className="w-4 h-4" />
            </div>
            <p className="text-xl font-bold">{stats.totalBuy}</p>
            <p className="text-xs text-slate-400">Kjøp</p>
          </div>
          <div className="glass rounded-2xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-accent-red mb-1">
              <ArrowDownRight className="w-4 h-4" />
            </div>
            <p className="text-xl font-bold">{stats.totalSell}</p>
            <p className="text-xs text-slate-400">Salg</p>
          </div>
          <div className="glass rounded-2xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-brand-400 mb-1">
              <Sparkles className="w-4 h-4" />
            </div>
            <p className="text-xl font-bold">{stats.matchesToday}</p>
            <p className="text-xs text-slate-400">Matcher</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'flex-1 py-2.5 rounded-xl text-sm font-medium transition-all press-effect',
                activeTab === tab
                  ? 'bg-brand-500 text-white'
                  : 'glass text-slate-300'
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Interests list */}
        <div className="space-y-3">
        {filteredInterests.map((interest, i) => (
          <motion.button
            key={interest.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            onClick={() => navigate(`/companies/${interest.id}`)}
            className="w-full glass rounded-2xl p-4 text-left press-effect"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-700/50 flex items-center justify-center text-2xl shrink-0">
                {interest.logo}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold truncate">{interest.company}</h3>
                  <span className={cn(
                    'px-2 py-0.5 rounded-full text-xs font-medium',
                    interest.type === 'buy' 
                      ? 'bg-accent-green/20 text-accent-green' 
                      : 'bg-accent-red/20 text-accent-red'
                  )}>
                    {interest.type === 'buy' ? 'KJØP' : 'SALG'}
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  {formatNumber(interest.shares)} aksjer · kr {interest.priceRange.min}-{interest.priceRange.max}/aksje
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {interest.time}
                  </span>
                  {interest.matches > 0 && (
                    <span className="flex items-center gap-1 text-brand-400">
                      <Users className="w-3.5 h-3.5" />
                      {interest.matches} matcher
                    </span>
                  )}
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-500 shrink-0" />
            </div>
          </motion.button>
        ))}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="pt-4"
        >
          <button className="w-full bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-2xl p-4 font-semibold flex items-center justify-center gap-2 shadow-xl shadow-brand-500/30 press-effect">
            <TrendingUp className="w-5 h-5" />
            Registrer ny interesse
          </button>
        </motion.div>

          {/* Info */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xs text-slate-500 text-center pt-2"
          >
            Interesser er ikke bindende. Kontakt skjer først når begge parter godtar.
          </motion.p>
        </div>
      </div>
    </div>
  )
}
