import { motion, AnimatePresence } from 'framer-motion'
import { 
  Building2, Save, Send, Eye, EyeOff, Users, MessageSquare,
  TrendingUp, Edit3, Trash2, Globe, Mail, Phone, MapPin,
  Linkedin, Twitter, BarChart3, Heart, ShoppingCart
} from 'lucide-react'
import { useState } from 'react'
import { cn, formatNumber } from '@/lib/utils'
import { Header } from '@/components/Header'
import { TechStartLogo } from '@/components/CompanyLogos'

const tabs = ['Selskapsprofil', 'Forum-innlegg', 'Statistikk']

// Mock company data for the form
const initialCompanyData = {
  name: 'TechStart AS',
  orgNumber: '923 456 789',
  description: 'TechStart AS er en innovativ SaaS-plattform som hjelper små og mellomstore bedrifter med å digitalisere sine prosesser. Vi tilbyr løsninger innen prosjektstyring, kundeoppfølging og rapportering.',
  revenue: '12500000',
  valuation: '45000000',
  shares: '100000',
  employees: '15-25',
  ceo: 'Ola Nordmann',
  founded: '2020',
  email: 'kontakt@techstart.no',
  phone: '+47 22 33 44 55',
  address: 'Storgata 10, 0155 Oslo',
  website: 'techstart.no',
  linkedin: 'techstart-as',
  twitter: 'techstart_no',
  seekingCapital: true,
}

// Mock forum posts
const mockPosts = [
  { id: '1', title: 'Ny emisjon planlegges for Q2 2024', content: 'Vi er glade for å annonsere...', category: 'Nyheter', isPublic: true, date: '15. jan 2024' },
  { id: '2', title: 'Kvartalsrapport Q4 2023', content: 'Vedlagt finner dere rapporten...', category: 'Nyheter', isPublic: false, date: '10. jan 2024' },
  { id: '3', title: 'Invitasjon til aksjonærmøte', content: 'Kjære aksjonærer, vi inviterer...', category: 'Nyheter', isPublic: false, date: '5. jan 2024' },
]

// Mock statistics
const stats = {
  followers: 234,
  forumPosts: 12,
  buyInterests: 5,
  sellInterests: 2,
  totalViews: 1456,
}

export function CompanyAdminPage() {
  const [activeTab, setActiveTab] = useState('Selskapsprofil')
  const [companyData, setCompanyData] = useState(initialCompanyData)
  const [posts, setPosts] = useState(mockPosts)
  const [showSaveSuccess, setShowSaveSuccess] = useState(false)
  
  // New post form state
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'Nyheter',
    isPublic: true,
  })

  const handleSaveProfile = () => {
    setShowSaveSuccess(true)
    setTimeout(() => setShowSaveSuccess(false), 2000)
  }

  const handlePublishPost = () => {
    if (!newPost.title || !newPost.content) return
    
    const post = {
      id: Date.now().toString(),
      ...newPost,
      date: new Date().toLocaleDateString('nb-NO', { day: 'numeric', month: 'short', year: 'numeric' }),
    }
    setPosts([post, ...posts])
    setNewPost({ title: '', content: '', category: 'Nyheter', isPublic: true })
  }

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter(p => p.id !== id))
  }

  return (
    <div className="min-h-screen pb-8">
      <Header 
        title="Selskapsadmin"
        showBack
      />

      <div className="px-4 py-4">
        {/* Company header */}
        <div className="flex items-center gap-4 mb-6">
          <TechStartLogo className="w-14 h-14" />
          <div>
            <h2 className="font-bold text-lg text-slate-900 dark:text-white">{companyData.name}</h2>
            <p className="text-sm text-slate-500">Org.nr: {companyData.orgNumber}</p>
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
                  : 'glass text-slate-600 dark:text-slate-300'
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {/* Selskapsprofil Tab */}
          {activeTab === 'Selskapsprofil' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {/* Basic info */}
              <div className="glass rounded-2xl p-4">
                <h3 className="font-semibold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-brand-400" />
                  Grunnleggende info
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Selskapsnavn</label>
                    <input
                      type="text"
                      value={companyData.name}
                      disabled
                      className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Org.nr</label>
                    <input
                      type="text"
                      value={companyData.orgNumber}
                      disabled
                      className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Beskrivelse</label>
                    <textarea
                      value={companyData.description}
                      onChange={(e) => setCompanyData({ ...companyData, description: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm resize-none focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-slate-800/50">
                    <span className="text-sm text-slate-700 dark:text-slate-300">Søker kapital</span>
                    <button
                      onClick={() => setCompanyData({ ...companyData, seekingCapital: !companyData.seekingCapital })}
                      className={cn(
                        'w-12 h-7 rounded-full transition-colors relative',
                        companyData.seekingCapital ? 'bg-brand-500' : 'bg-slate-300 dark:bg-slate-600'
                      )}
                    >
                      <div className={cn(
                        'absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform',
                        companyData.seekingCapital ? 'translate-x-6' : 'translate-x-1'
                      )} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Key figures */}
              <div className="glass rounded-2xl p-4">
                <h3 className="font-semibold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-brand-400" />
                  Nøkkeltall
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Omsetning (kr)</label>
                    <input
                      type="text"
                      value={companyData.revenue}
                      onChange={(e) => setCompanyData({ ...companyData, revenue: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Verdivurdering (kr)</label>
                    <input
                      type="text"
                      value={companyData.valuation}
                      onChange={(e) => setCompanyData({ ...companyData, valuation: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Antall aksjer</label>
                    <input
                      type="text"
                      value={companyData.shares}
                      onChange={(e) => setCompanyData({ ...companyData, shares: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Ansatte</label>
                    <input
                      type="text"
                      value={companyData.employees}
                      onChange={(e) => setCompanyData({ ...companyData, employees: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Daglig leder</label>
                    <input
                      type="text"
                      value={companyData.ceo}
                      onChange={(e) => setCompanyData({ ...companyData, ceo: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Stiftet</label>
                    <input
                      type="text"
                      value={companyData.founded}
                      onChange={(e) => setCompanyData({ ...companyData, founded: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Contact info */}
              <div className="glass rounded-2xl p-4">
                <h3 className="font-semibold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
                  <Mail className="w-5 h-5 text-brand-400" />
                  Kontaktinformasjon
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-slate-500" />
                    </div>
                    <input
                      type="email"
                      value={companyData.email}
                      onChange={(e) => setCompanyData({ ...companyData, email: e.target.value })}
                      placeholder="E-post"
                      className="flex-1 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-slate-500" />
                    </div>
                    <input
                      type="tel"
                      value={companyData.phone}
                      onChange={(e) => setCompanyData({ ...companyData, phone: e.target.value })}
                      placeholder="Telefon"
                      className="flex-1 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-slate-500" />
                    </div>
                    <input
                      type="text"
                      value={companyData.address}
                      onChange={(e) => setCompanyData({ ...companyData, address: e.target.value })}
                      placeholder="Adresse"
                      className="flex-1 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center shrink-0">
                      <Globe className="w-5 h-5 text-slate-500" />
                    </div>
                    <input
                      type="text"
                      value={companyData.website}
                      onChange={(e) => setCompanyData({ ...companyData, website: e.target.value })}
                      placeholder="Nettside"
                      className="flex-1 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center shrink-0">
                      <Linkedin className="w-5 h-5 text-slate-500" />
                    </div>
                    <input
                      type="text"
                      value={companyData.linkedin}
                      onChange={(e) => setCompanyData({ ...companyData, linkedin: e.target.value })}
                      placeholder="LinkedIn"
                      className="flex-1 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center shrink-0">
                      <Twitter className="w-5 h-5 text-slate-500" />
                    </div>
                    <input
                      type="text"
                      value={companyData.twitter}
                      onChange={(e) => setCompanyData({ ...companyData, twitter: e.target.value })}
                      placeholder="Twitter/X"
                      className="flex-1 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Save button */}
              <button
                onClick={handleSaveProfile}
                className="w-full bg-brand-500 text-white rounded-2xl p-4 font-semibold flex items-center justify-center gap-2 press-effect"
              >
                <Save className="w-5 h-5" />
                {showSaveSuccess ? 'Lagret!' : 'Lagre endringer'}
              </button>
            </motion.div>
          )}

          {/* Forum-innlegg Tab */}
          {activeTab === 'Forum-innlegg' && (
            <motion.div
              key="forum"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {/* New post form */}
              <div className="glass rounded-2xl p-4">
                <h3 className="font-semibold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-brand-400" />
                  Nytt innlegg
                </h3>
                
                {/* Visibility toggle */}
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setNewPost({ ...newPost, isPublic: true })}
                    className={cn(
                      'flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all press-effect',
                      newPost.isPublic
                        ? 'bg-brand-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400'
                    )}
                  >
                    <Eye className="w-4 h-4" />
                    Åpent forum
                  </button>
                  <button
                    onClick={() => setNewPost({ ...newPost, isPublic: false })}
                    className={cn(
                      'flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all press-effect',
                      !newPost.isPublic
                        ? 'bg-accent-orange text-white'
                        : 'bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400'
                    )}
                  >
                    <EyeOff className="w-4 h-4" />
                    Kun aksjonærer
                  </button>
                </div>

                {/* Category select */}
                <div className="mb-4">
                  <label className="block text-xs text-slate-500 mb-2">Kategori</label>
                  <div className="flex gap-2">
                    {['Nyheter', 'Diskusjon', 'Analyse'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setNewPost({ ...newPost, category: cat })}
                        className={cn(
                          'px-4 py-2 rounded-full text-sm font-medium transition-all press-effect',
                          newPost.category === cat
                            ? 'bg-brand-500/20 text-brand-500 dark:text-brand-400 border border-brand-500/30'
                            : 'bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400'
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <div className="mb-4">
                  <label className="block text-xs text-slate-500 mb-1">Tittel</label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    placeholder="Skriv en tittel..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>

                {/* Content */}
                <div className="mb-4">
                  <label className="block text-xs text-slate-500 mb-1">Innhold</label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    placeholder="Skriv innholdet her..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm resize-none focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>

                {/* Publish button */}
                <button
                  onClick={handlePublishPost}
                  disabled={!newPost.title || !newPost.content}
                  className={cn(
                    'w-full rounded-2xl p-4 font-semibold flex items-center justify-center gap-2 press-effect transition-all',
                    newPost.title && newPost.content
                      ? 'bg-brand-500 text-white'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                  )}
                >
                  <Send className="w-5 h-5" />
                  Publiser innlegg
                </button>
              </div>

              {/* Published posts */}
              <div className="space-y-3">
                <h3 className="font-semibold text-slate-900 dark:text-white px-1">
                  Publiserte innlegg ({posts.length})
                </h3>
                
                {posts.map((post) => (
                  <div key={post.id} className="glass rounded-2xl p-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={cn(
                            'px-2 py-0.5 rounded-full text-[10px] font-medium',
                            post.isPublic 
                              ? 'bg-brand-500/20 text-brand-500 dark:text-brand-400'
                              : 'bg-accent-orange/20 text-accent-orange'
                          )}>
                            {post.isPublic ? 'Åpent' : 'Aksjonærer'}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 dark:bg-slate-800/50 text-slate-500">
                            {post.category}
                          </span>
                        </div>
                        <h4 className="font-semibold text-slate-900 dark:text-white">{post.title}</h4>
                        <p className="text-xs text-slate-500 mt-1">{post.date}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center hover:bg-brand-500/20 transition-colors press-effect">
                          <Edit3 className="w-4 h-4 text-slate-500" />
                        </button>
                        <button 
                          onClick={() => handleDeletePost(post.id)}
                          className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center hover:bg-accent-red/20 transition-colors press-effect"
                        >
                          <Trash2 className="w-4 h-4 text-slate-500" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{post.content}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Statistikk Tab */}
          {activeTab === 'Statistikk' && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="glass rounded-2xl p-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/20 flex items-center justify-center mb-3">
                    <Heart className="w-5 h-5 text-brand-400" />
                  </div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{formatNumber(stats.followers)}</p>
                  <p className="text-sm text-slate-500">Følgere</p>
                </div>
                
                <div className="glass rounded-2xl p-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center mb-3">
                    <MessageSquare className="w-5 h-5 text-purple-400" />
                  </div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.forumPosts}</p>
                  <p className="text-sm text-slate-500">Forum-innlegg</p>
                </div>
                
                <div className="glass rounded-2xl p-4">
                  <div className="w-10 h-10 rounded-xl bg-accent-green/20 flex items-center justify-center mb-3">
                    <ShoppingCart className="w-5 h-5 text-accent-green" />
                  </div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.buyInterests}</p>
                  <p className="text-sm text-slate-500">Kjøpsinteresser</p>
                </div>
                
                <div className="glass rounded-2xl p-4">
                  <div className="w-10 h-10 rounded-xl bg-accent-red/20 flex items-center justify-center mb-3">
                    <TrendingUp className="w-5 h-5 text-accent-red" />
                  </div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.sellInterests}</p>
                  <p className="text-sm text-slate-500">Salgsinteresser</p>
                </div>
              </div>

              {/* Total views */}
              <div className="glass rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Totale visninger</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">{formatNumber(stats.totalViews)}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center">
                    <Eye className="w-6 h-6 text-slate-500" />
                  </div>
                </div>
              </div>

              {/* Activity hint */}
              <div className="glass rounded-2xl p-4 border border-brand-500/20">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/20 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-brand-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Øk engasjementet</h4>
                    <p className="text-sm text-slate-500">
                      Publiser regelmessige oppdateringer i forumet for å holde aksjonærene informert og engasjert.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
