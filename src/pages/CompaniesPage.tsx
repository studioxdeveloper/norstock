import { motion } from 'framer-motion'
import { 
  Search, Filter, ChevronRight, BadgeCheck, TrendingUp, Users, MapPin, Heart
} from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Header } from '@/components/Header'
import { companyLogos, DefaultCompanyLogo } from '@/components/CompanyLogos'

const categories = ['Alle', 'Teknologi', 'Fintech', 'Energi', 'Helse', 'Sjømat']

const companies = [
  { 
    id: '1', 
    name: 'TechStart AS', 
    orgNumber: '923 456 789',
    sector: 'Teknologi', 
    location: 'Oslo',
    verified: true,
    followers: 234,
    seekingCapital: true,
    description: 'Innovativ SaaS-plattform for SMB'
  },
  { 
    id: '2', 
    name: 'GreenEnergy Norge', 
    orgNumber: '912 345 678',
    sector: 'Energi', 
    location: 'Bergen',
    verified: true,
    followers: 189,
    seekingCapital: false,
    description: 'Fornybar energi og bærekraft'
  },
  { 
    id: '3', 
    name: 'Nordic FinTech', 
    orgNumber: '987 654 321',
    sector: 'Fintech', 
    location: 'Oslo',
    verified: true,
    followers: 567,
    seekingCapital: true,
    description: 'Betalingsløsninger for fremtiden'
  },
  { 
    id: '4', 
    name: 'Seafood Innovation', 
    orgNumber: '945 678 123',
    sector: 'Sjømat', 
    location: 'Ålesund',
    verified: false,
    followers: 98,
    seekingCapital: false,
    description: 'Bærekraftig havbruk og oppdrett'
  },
  { 
    id: '5', 
    name: 'HealthTech Nordic', 
    orgNumber: '934 567 890',
    sector: 'Helse', 
    location: 'Trondheim',
    verified: true,
    followers: 321,
    seekingCapital: true,
    description: 'Digital helse og telemedisin'
  },
  { 
    id: '6', 
    name: 'PropTech Norway', 
    orgNumber: '956 789 012',
    sector: 'Teknologi', 
    location: 'Stavanger',
    verified: false,
    followers: 145,
    seekingCapital: true,
    description: 'Innovasjon i eiendomsbransjen'
  },
]

export function CompaniesPage() {
  const [selectedCategory, setSelectedCategory] = useState('Alle')
  const [searchQuery, setSearchQuery] = useState('')
  const [followedCompanies, setFollowedCompanies] = useState<string[]>([])
  const navigate = useNavigate()

  const toggleFollow = (e: React.MouseEvent, companyId: string) => {
    e.stopPropagation()
    setFollowedCompanies(prev => 
      prev.includes(companyId) 
        ? prev.filter(id => id !== companyId)
        : [...prev, companyId]
    )
  }

  const filteredCompanies = companies.filter(company => {
    const matchesCategory = selectedCategory === 'Alle' || company.sector === selectedCategory
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen">
      <Header title="Selskaper" />

      <div className="px-4 py-4">
        {/* Search */}
        <div className="glass rounded-2xl px-4 py-3 flex items-center gap-3 mb-4">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Søk etter selskaper..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
          <button className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700/50 flex items-center justify-center press-effect">
            <Filter className="w-4 h-4 text-slate-600 dark:text-white" />
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
                  : 'glass text-slate-600 dark:text-slate-300'
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Companies list */}
        <div className="space-y-3">
        {filteredCompanies.map((company, i) => {
          const isFollowed = followedCompanies.includes(company.id)
          return (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="glass rounded-2xl p-4"
            >
              <button
                onClick={() => navigate(`/companies/${company.id}`)}
                className="w-full text-left press-effect"
              >
                <div className="flex items-start gap-4">
                  {(() => {
                    const Logo = companyLogos[company.id]
                    return Logo ? (
                      <Logo className="w-14 h-14 shrink-0" />
                    ) : (
                      <DefaultCompanyLogo className="w-14 h-14 shrink-0" initials={company.name.slice(0, 2).toUpperCase()} />
                    )
                  })()}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold truncate text-slate-900 dark:text-white">{company.name}</h3>
                      {company.verified && (
                        <BadgeCheck className="w-4 h-4 text-brand-400 shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-2 line-clamp-1">{company.description}</p>
                    <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {company.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {company.followers}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300">
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
                  <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0" />
                </div>
              </button>
              
              {/* Follow button */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200 dark:border-white/5">
                <span className="text-xs text-slate-500">Org.nr: {company.orgNumber}</span>
                <button
                  onClick={(e) => toggleFollow(e, company.id)}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all press-effect',
                    isFollowed
                      ? 'bg-brand-500/20 text-brand-500 dark:text-brand-400'
                      : 'bg-slate-200 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300'
                  )}
                >
                  <Heart className={cn('w-3.5 h-3.5', isFollowed && 'fill-current')} />
                  {isFollowed ? 'Følger' : 'Følg'}
                </button>
              </div>
            </motion.div>
          )
        })}

          {filteredCompanies.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500 dark:text-slate-400">Ingen selskaper funnet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
