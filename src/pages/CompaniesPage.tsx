import { motion } from 'framer-motion'
import { Search, Filter, ChevronRight, BadgeCheck, TrendingUp, Users } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Header } from '@/components/Header'

const categories = ['Alle', 'Teknologi', 'Fintech', 'Energi', 'Helse', 'Sjømat']

const companies = [
  { 
    id: '1', 
    name: 'TechStart AS', 
    sector: 'Teknologi', 
    logo: '🚀',
    verified: true,
    followers: 234,
    seekingCapital: true,
    description: 'Innovativ SaaS-plattform for SMB'
  },
  { 
    id: '2', 
    name: 'GreenEnergy Norge', 
    sector: 'Energi', 
    logo: '🌱',
    verified: true,
    followers: 189,
    seekingCapital: false,
    description: 'Fornybar energi og bærekraft'
  },
  { 
    id: '3', 
    name: 'Nordic FinTech', 
    sector: 'Fintech', 
    logo: '💳',
    verified: true,
    followers: 567,
    seekingCapital: true,
    description: 'Betalingsløsninger for fremtiden'
  },
  { 
    id: '4', 
    name: 'Seafood Innovation', 
    sector: 'Sjømat', 
    logo: '🐟',
    verified: false,
    followers: 98,
    seekingCapital: false,
    description: 'Bærekraftig havbruk og oppdrett'
  },
  { 
    id: '5', 
    name: 'HealthTech Nordic', 
    sector: 'Helse', 
    logo: '🏥',
    verified: true,
    followers: 321,
    seekingCapital: true,
    description: 'Digital helse og telemedisin'
  },
  { 
    id: '6', 
    name: 'PropTech Norway', 
    sector: 'Teknologi', 
    logo: '🏠',
    verified: false,
    followers: 145,
    seekingCapital: true,
    description: 'Innovasjon i eiendomsbransjen'
  },
]

export function CompaniesPage() {
  const [selectedCategory, setSelectedCategory] = useState('Alle')
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const filteredCompanies = companies.filter(company => {
    const matchesCategory = selectedCategory === 'Alle' || company.sector === selectedCategory
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen">
      <Header title="Selskaper" subtitle="Utforsk unoterte selskaper" />

      <div className="px-4 py-4">
        {/* Search */}
        <div className="glass rounded-2xl px-4 py-3 flex items-center gap-3 mb-4">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Søk etter selskaper..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder:text-slate-500"
          />
          <button className="w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center press-effect">
            <Filter className="w-4 h-4" />
          </button>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-4 -mx-4 px-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all press-effect',
                selectedCategory === category
                  ? 'bg-brand-500 text-white'
                  : 'glass text-slate-300'
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Companies list */}
        <div className="space-y-3">
        {filteredCompanies.map((company, i) => (
          <motion.button
            key={company.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            onClick={() => navigate(`/companies/${company.id}`)}
            className="w-full glass rounded-2xl p-4 text-left press-effect"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-slate-700/50 flex items-center justify-center text-2xl shrink-0">
                {company.logo}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold truncate">{company.name}</h3>
                  {company.verified && (
                    <BadgeCheck className="w-4 h-4 text-brand-400 shrink-0" />
                  )}
                </div>
                <p className="text-sm text-slate-400 mb-2 line-clamp-1">{company.description}</p>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    {company.followers}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-700/50">
                    {company.sector}
                  </span>
                  {company.seekingCapital && (
                    <span className="flex items-center gap-1 text-accent-green">
                      <TrendingUp className="w-3.5 h-3.5" />
                      Søker kapital
                    </span>
                  )}
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-500 shrink-0" />
            </div>
          </motion.button>
        ))}

          {filteredCompanies.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-400">Ingen selskaper funnet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
