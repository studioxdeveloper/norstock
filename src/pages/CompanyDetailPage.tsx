import { motion, AnimatePresence } from 'framer-motion'
import { 
  BadgeCheck, Users, Globe, Heart, MapPin, Phone, Mail,
  MessageSquare, TrendingUp, ChevronRight, Plus, ThumbsUp,
  Linkedin, Twitter, Building2
} from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cn, formatCurrency, formatNumber } from '@/lib/utils'
import { Header } from '@/components/Header'
import { TechStartLogo } from '@/components/CompanyLogos'

const tabs = ['Oversikt', 'Nyheter', 'Forum', 'Interesser']

// Mock company data
const companyData = {
  id: '1',
  name: 'TechStart AS',
  verified: true,
  sector: 'Teknologi',
  description: 'TechStart AS er en innovativ SaaS-plattform som hjelper små og mellomstore bedrifter med å digitalisere sine prosesser. Vi tilbyr løsninger innen prosjektstyring, kundeoppfølging og rapportering.',
  followers: 234,
  orgNumber: '923 456 789',
  location: {
    city: 'Oslo',
    county: 'Oslo',
    address: 'Storgata 10, 0155 Oslo',
  },
  contact: {
    email: 'kontakt@techstart.no',
    phone: '+47 22 33 44 55',
  },
  website: 'techstart.no',
  socialMedia: {
    linkedin: 'techstart-as',
    twitter: 'techstart_no',
  },
  ceo: 'Ola Nordmann',
  founded: '2020',
  employees: '15-25',
  revenue: 12500000,
  shares: 100000,
  lastValuation: 45000000,
}

const news = [
  { id: '1', title: 'Ny emisjon planlegges for Q2 2024', date: '15. jan', preview: 'Vi er glade for å annonsere at vi planlegger en ny emisjon...' },
  { id: '2', title: 'Rekordomsetning i Q4 2023', date: '10. jan', preview: 'TechStart AS oppnådde rekordomsetning på 3.2 MNOK...' },
  { id: '3', title: 'Ny CTO ansatt', date: '5. jan', preview: 'Vi ønsker velkommen vår nye CTO, Kari Teknologi...' },
]

const forumPosts = [
  { id: '1', author: 'Investor123', title: 'Tanker om Q4-rapporten?', category: 'Diskusjon', replies: 12, likes: 8, time: '2t' },
  { id: '2', author: 'AksjeEntusiast', title: 'Prisforventninger for 2024', category: 'Analyse', replies: 8, likes: 15, time: '5t' },
  { id: '3', author: 'NordicCapital', title: 'Spørsmål om emisjonen', category: 'Spørsmål', replies: 24, likes: 32, time: '1d' },
]

const forumCategories = ['Alle', 'Diskusjon', 'Analyse', 'Spørsmål', 'Nyheter']

const interests = [
  { type: 'buy', count: 5, avgShares: 200, priceRange: '400-500' },
  { type: 'sell', count: 2, avgShares: 150, priceRange: '450-550' },
]

export function CompanyDetailPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Oversikt')
  const [isFollowing, setIsFollowing] = useState(false)
  const [selectedForumCategory, setSelectedForumCategory] = useState('Alle')
  const [likedPosts, setLikedPosts] = useState<string[]>([])

  const toggleLike = (postId: string) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    )
  }

  const filteredForumPosts = forumPosts.filter(post => 
    selectedForumCategory === 'Alle' || post.category === selectedForumCategory
  )

  return (
    <div className="min-h-screen">
      <Header 
        title={companyData.name}
        showBack
        rightAction={
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all press-effect',
              isFollowing
                ? 'bg-brand-500 text-white'
                : 'glass text-white'
            )}
          >
            <Heart className={cn('w-4 h-4', isFollowing && 'fill-current')} />
            {isFollowing ? 'Følger' : 'Følg'}
          </button>
        }
      />

      <div className="px-4 py-4">
        {/* Company info */}
        <div className="flex items-start gap-4 mb-4">
          <TechStartLogo className="w-16 h-16" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              {companyData.verified && <BadgeCheck className="w-4 h-4 text-brand-400" />}
              <span className="text-sm text-slate-400">{companyData.sector}</span>
            </div>
            <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-sm text-slate-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {companyData.location.city}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {companyData.followers} følgere
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Org.nr: {companyData.orgNumber}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-4 -mx-4 px-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all press-effect',
                activeTab === tab
                  ? 'bg-brand-500 text-white'
                  : 'glass text-slate-300'
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {activeTab === 'Oversikt' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {/* Description */}
              <div className="glass rounded-2xl p-4">
                <h3 className="font-semibold mb-2">Om selskapet</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{companyData.description}</p>
              </div>

              {/* Key figures */}
              <div className="glass rounded-2xl p-4">
                <h3 className="font-semibold mb-4">Nøkkeltall</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Omsetning', value: formatCurrency(companyData.revenue) },
                    { label: 'Siste verdivurdering', value: formatCurrency(companyData.lastValuation) },
                    { label: 'Antall aksjer', value: formatNumber(companyData.shares) },
                    { label: 'Ansatte', value: companyData.employees },
                    { label: 'Stiftet', value: companyData.founded },
                    { label: 'Daglig leder', value: companyData.ceo },
                  ].map((item, i) => (
                    <div key={i} className="bg-slate-800/50 rounded-xl p-3">
                      <p className="text-xs text-slate-400 mb-1">{item.label}</p>
                      <p className="font-semibold text-sm">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact info */}
              <div className="glass rounded-2xl p-4">
                <h3 className="font-semibold mb-4">Kontakt</h3>
                <div className="space-y-3">
                  <a href={`mailto:${companyData.contact.email}`} className="flex items-center gap-3 text-sm text-slate-300 hover:text-brand-400 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-slate-400" />
                    </div>
                    <span>{companyData.contact.email}</span>
                  </a>
                  <a href={`tel:${companyData.contact.phone}`} className="flex items-center gap-3 text-sm text-slate-300 hover:text-brand-400 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-slate-400" />
                    </div>
                    <span>{companyData.contact.phone}</span>
                  </a>
                  <a href={`https://${companyData.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-slate-300 hover:text-brand-400 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center">
                      <Globe className="w-5 h-5 text-slate-400" />
                    </div>
                    <span>{companyData.website}</span>
                  </a>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <div className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-slate-400" />
                    </div>
                    <span>{companyData.location.address}</span>
                  </div>
                </div>
                
                {/* Social media */}
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/5">
                  <span className="text-xs text-slate-500">Sosiale medier:</span>
                  <a href={`https://linkedin.com/company/${companyData.socialMedia.linkedin}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-slate-800/50 flex items-center justify-center hover:bg-brand-500/20 transition-colors">
                    <Linkedin className="w-4 h-4 text-slate-400" />
                  </a>
                  <a href={`https://twitter.com/${companyData.socialMedia.twitter}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-slate-800/50 flex items-center justify-center hover:bg-brand-500/20 transition-colors">
                    <Twitter className="w-4 h-4 text-slate-400" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'Nyheter' && (
            <motion.div
              key="news"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3"
            >
              {news.map((item) => (
                <button
                  key={item.id}
                  className="w-full glass rounded-2xl p-4 text-left press-effect"
                >
                  <p className="text-xs text-brand-400 mb-1">{item.date}</p>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400 line-clamp-2">{item.preview}</p>
                </button>
              ))}
            </motion.div>
          )}

          {activeTab === 'Forum' && (
            <motion.div
              key="forum"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3"
            >
              <button className="w-full glass rounded-2xl p-4 flex items-center justify-center gap-2 text-brand-400 font-medium press-effect">
                <Plus className="w-5 h-5" />
                Opprett ny tråd
              </button>

              {/* Forum categories */}
              <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 -mx-4 px-4">
                {forumCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedForumCategory(category)}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all press-effect',
                      selectedForumCategory === category
                        ? 'bg-brand-500/20 text-brand-400 border border-brand-500/30'
                        : 'bg-slate-800/50 text-slate-400'
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {filteredForumPosts.map((post) => {
                const isLiked = likedPosts.includes(post.id)
                return (
                  <div
                    key={post.id}
                    className="glass rounded-2xl p-4"
                  >
                    <button className="w-full text-left press-effect">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-xs text-slate-400">@{post.author} · {post.time}</p>
                            <span className={cn(
                              'px-2 py-0.5 rounded-full text-[10px] font-medium',
                              post.category === 'Diskusjon' && 'bg-brand-500/20 text-brand-400',
                              post.category === 'Analyse' && 'bg-accent-orange/20 text-accent-orange',
                              post.category === 'Spørsmål' && 'bg-purple-500/20 text-purple-400',
                              post.category === 'Nyheter' && 'bg-accent-green/20 text-accent-green',
                            )}>
                              {post.category}
                            </span>
                          </div>
                          <h3 className="font-semibold mb-2">{post.title}</h3>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-500 shrink-0" />
                      </div>
                    </button>
                    
                    {/* Stats and like button */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5" />
                          {post.replies} svar
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-3.5 h-3.5" />
                          {post.likes + (isLiked ? 1 : 0)}
                        </span>
                      </div>
                      <button
                        onClick={() => toggleLike(post.id)}
                        className={cn(
                          'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all press-effect',
                          isLiked
                            ? 'bg-brand-500/20 text-brand-400'
                            : 'bg-slate-800/50 text-slate-400'
                        )}
                      >
                        <ThumbsUp className={cn('w-3.5 h-3.5', isLiked && 'fill-current')} />
                        {isLiked ? 'Likt' : 'Lik'}
                      </button>
                    </div>
                  </div>
                )
              })}
              
              {filteredForumPosts.length === 0 && (
                <div className="text-center py-8 text-slate-400 text-sm">
                  Ingen tråder i denne kategorien ennå
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'Interesser' && (
            <motion.div
              key="interests"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {/* Interest summary */}
              <div className="grid grid-cols-2 gap-3">
                {interests.map((interest) => (
                  <div
                    key={interest.type}
                    className={cn(
                      'rounded-2xl p-4',
                      interest.type === 'buy' ? 'bg-accent-green/10 border border-accent-green/30' : 'bg-accent-red/10 border border-accent-red/30'
                    )}
                  >
                    <p className={cn(
                      'text-sm font-medium mb-2',
                      interest.type === 'buy' ? 'text-accent-green' : 'text-accent-red'
                    )}>
                      {interest.type === 'buy' ? 'Kjøpsinteresser' : 'Salgsinteresser'}
                    </p>
                    <p className="text-2xl font-bold mb-2">{interest.count}</p>
                    <p className="text-xs text-slate-400">
                      Snitt {interest.avgShares} aksjer<br />
                      kr {interest.priceRange}/aksje
                    </p>
                  </div>
                ))}
              </div>

              {/* Add interest button */}
              <button 
                onClick={() => navigate(`/companies/${companyData.id}/interest`)}
                className="w-full bg-brand-500 text-white rounded-2xl p-4 font-semibold flex items-center justify-center gap-2 press-effect"
              >
                <TrendingUp className="w-5 h-5" />
                Registrer interesse
              </button>

              <p className="text-xs text-slate-500 text-center">
                Interesser er anonyme inntil begge parter godtar kontakt
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
