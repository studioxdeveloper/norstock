import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { 
  User, Settings, Bell, Shield, HelpCircle, LogOut,
  ChevronRight, Moon, Sun, Monitor, Globe, FileText, Heart, Check, X
} from 'lucide-react'
import { Header } from '@/components/Header'
import { useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/lib/utils'

const user = {
  name: 'Ola Nordmann',
  email: 'ola@example.no',
  avatar: null,
  verified: true,
  memberSince: 'Januar 2024',
}

type Theme = 'system' | 'light' | 'dark'

const themeOptions: { value: Theme; label: string; icon: typeof Moon }[] = [
  { value: 'system', label: 'System', icon: Monitor },
  { value: 'light', label: 'Lys', icon: Sun },
  { value: 'dark', label: 'Mørk', icon: Moon },
]

export function ProfilePage() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [showThemeModal, setShowThemeModal] = useState(false)

  const getThemeLabel = () => {
    switch (theme) {
      case 'system': return 'System'
      case 'light': return 'Lys'
      case 'dark': return 'Mørk'
    }
  }

  const menuSections = [
    {
      title: 'Konto',
      items: [
        { icon: User, label: 'Rediger profil', badge: null, action: () => {} },
        { icon: Bell, label: 'Varslingsinnstillinger', badge: '3', action: () => {} },
        { icon: Shield, label: 'Sikkerhet og BankID', badge: null, action: () => {} },
      ],
    },
    {
      title: 'Innstillinger',
      items: [
        { icon: resolvedTheme === 'dark' ? Moon : Sun, label: 'Utseende', badge: getThemeLabel(), action: () => setShowThemeModal(true) },
        { icon: Globe, label: 'Språk', badge: 'Norsk', action: () => {} },
      ],
    },
    {
      title: 'Mer',
      items: [
        { icon: Heart, label: 'Fulgte selskaper', badge: '12', action: () => {} },
        { icon: FileText, label: 'Vilkår og personvern', badge: null, action: () => {} },
        { icon: HelpCircle, label: 'Hjelp og support', badge: null, action: () => {} },
      ],
    },
  ]

  return (
    <div className="min-h-screen">
      <Header 
        title="Profil"
        rightAction={
          <button className="w-10 h-10 rounded-full glass flex items-center justify-center press-effect">
            <Settings className="w-5 h-5" />
          </button>
        }
      />

      <div className="px-4 py-4">
        {/* User card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-3xl p-6 mb-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-2xl font-bold text-white">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user.name}</h2>
                {user.verified && (
                  <span className="px-2 py-0.5 rounded-full bg-accent-green/20 text-accent-green text-xs font-medium">
                    Verifisert
                  </span>
                )}
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm">{user.email}</p>
              <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">Medlem siden {user.memberSince}</p>
            </div>
          </div>
        </motion.div>

        {/* Menu sections */}
        {menuSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + sectionIndex * 0.1 }}
            className="mb-6"
          >
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3 px-1">{section.title}</h3>
            <div className="glass rounded-2xl overflow-hidden divide-y divide-white/5">
              {section.items.map((item, i) => {
                const Icon = item.icon
                return (
                  <button
                    key={i}
                    onClick={item.action}
                    className="w-full px-4 py-4 flex items-center gap-4 press-effect text-left hover:bg-white/5 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-200/80 dark:bg-slate-700/50 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                    </div>
                    <span className="flex-1 font-medium text-slate-900 dark:text-white">{item.label}</span>
                    {item.badge && (
                      <span className="text-sm text-slate-500 dark:text-slate-400">{item.badge}</span>
                    )}
                    <ChevronRight className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                  </button>
                )
              })}
            </div>
          </motion.div>
        ))}

        {/* Logout button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full glass rounded-2xl px-4 py-4 flex items-center gap-4 press-effect text-left text-accent-red hover:bg-accent-red/10 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-accent-red/20 flex items-center justify-center">
            <LogOut className="w-5 h-5 text-accent-red" />
          </div>
          <span className="flex-1 font-medium">Logg ut</span>
        </motion.button>

        {/* Version */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-xs text-slate-500 mt-8"
        >
          NorStock v1.0.0 · STUDIO X AS
        </motion.p>
      </div>

      {/* Theme Modal */}
      <AnimatePresence>
        {showThemeModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowThemeModal(false)}
              className="fixed inset-0 bg-black/60 z-50"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-4 right-4 bottom-8 z-50 max-w-[calc(800px-2rem)] mx-auto"
            >
              <div className="glass-dark rounded-3xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-white/10">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Utseende</h3>
                  <button 
                    onClick={() => setShowThemeModal(false)}
                    className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700/50 flex items-center justify-center press-effect"
                  >
                    <X className="w-4 h-4 text-slate-600 dark:text-white" />
                  </button>
                </div>
                
                {/* Options */}
                <div className="p-2">
                  {themeOptions.map((option) => {
                    const Icon = option.icon
                    const isSelected = theme === option.value
                    
                    return (
                      <button
                        key={option.value}
                        onClick={() => {
                          setTheme(option.value)
                          setShowThemeModal(false)
                        }}
                        className={cn(
                          'w-full p-4 rounded-2xl flex items-center gap-4 transition-all press-effect',
                          isSelected 
                            ? 'bg-brand-500/20 border border-brand-500/50' 
                            : 'hover:bg-slate-100 dark:hover:bg-white/5'
                        )}
                      >
                        <div className={cn(
                          'w-12 h-12 rounded-xl flex items-center justify-center',
                          isSelected ? 'bg-brand-500/30' : 'bg-slate-200 dark:bg-slate-700/50'
                        )}>
                          <Icon className={cn(
                            'w-6 h-6',
                            isSelected ? 'text-brand-400' : 'text-slate-600 dark:text-slate-300'
                          )} />
                        </div>
                        <div className="flex-1 text-left">
                          <p className={cn(
                            'font-semibold',
                            isSelected ? 'text-brand-500 dark:text-brand-400' : 'text-slate-900 dark:text-white'
                          )}>
                            {option.label}
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {option.value === 'system' && 'Følger enhetens innstillinger'}
                            {option.value === 'light' && 'Alltid lys modus'}
                            {option.value === 'dark' && 'Alltid mørk modus'}
                          </p>
                        </div>
                        {isSelected && (
                          <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center">
                            <Check className="w-5 h-5 text-white" />
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
