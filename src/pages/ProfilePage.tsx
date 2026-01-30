import { motion } from 'framer-motion'
import { 
  User, Settings, Bell, Shield, HelpCircle, LogOut,
  ChevronRight, Moon, Globe, FileText, Heart
} from 'lucide-react'
import { Header } from '@/components/Header'

const user = {
  name: 'Ola Nordmann',
  email: 'ola@example.no',
  avatar: null,
  verified: true,
  memberSince: 'Januar 2024',
}

const menuSections = [
  {
    title: 'Konto',
    items: [
      { icon: User, label: 'Rediger profil', badge: null },
      { icon: Bell, label: 'Varslingsinnstillinger', badge: '3' },
      { icon: Shield, label: 'Sikkerhet og BankID', badge: null },
    ],
  },
  {
    title: 'Innstillinger',
    items: [
      { icon: Moon, label: 'Utseende', badge: 'Mørk' },
      { icon: Globe, label: 'Språk', badge: 'Norsk' },
    ],
  },
  {
    title: 'Mer',
    items: [
      { icon: Heart, label: 'Fulgte selskaper', badge: '12' },
      { icon: FileText, label: 'Vilkår og personvern', badge: null },
      { icon: HelpCircle, label: 'Hjelp og support', badge: null },
    ],
  },
]

export function ProfilePage() {
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
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-2xl font-bold">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold">{user.name}</h2>
                {user.verified && (
                  <span className="px-2 py-0.5 rounded-full bg-accent-green/20 text-accent-green text-xs font-medium">
                    Verifisert
                  </span>
                )}
              </div>
              <p className="text-slate-400 text-sm">{user.email}</p>
              <p className="text-slate-500 text-xs mt-1">Medlem siden {user.memberSince}</p>
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
            <h3 className="text-sm font-medium text-slate-400 mb-3 px-1">{section.title}</h3>
            <div className="glass rounded-2xl overflow-hidden divide-y divide-white/5">
              {section.items.map((item, i) => {
                const Icon = item.icon
                return (
                  <button
                    key={i}
                    className="w-full px-4 py-4 flex items-center gap-4 press-effect text-left hover:bg-white/5 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-700/50 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-slate-300" />
                    </div>
                    <span className="flex-1 font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="text-sm text-slate-400">{item.badge}</span>
                    )}
                    <ChevronRight className="w-5 h-5 text-slate-500" />
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
    </div>
  )
}
