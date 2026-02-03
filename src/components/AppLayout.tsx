import { ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Briefcase, Building2, TrendingUp, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface AppLayoutProps {
  children: ReactNode
}

const tabs = [
  { path: '/portfolio', icon: Briefcase, label: 'Portefølje' },
  { path: '/companies', icon: Building2, label: 'Selskaper' },
  { path: '/marketplace', icon: TrendingUp, label: 'Marked' },
  { path: '/profile', icon: User, label: 'Profil' },
]

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation()
  const navigate = useNavigate()
  
  const currentPath = location.pathname.startsWith('/companies/') 
    ? '/companies' 
    : location.pathname

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content */}
      <main className="flex-1 pb-24 scroll-container">
        {children}
      </main>

      {/* iOS-style floating tab bar */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center pb-[max(env(safe-area-inset-bottom),16px)] px-4 z-50">
        <nav className="tab-bar-glass rounded-full px-2 py-2 flex gap-1 shadow-2xl shadow-black/50">
          {tabs.map((tab) => {
            const isActive = currentPath === tab.path
            const Icon = tab.icon
            
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className={cn(
                  'relative flex flex-col items-center justify-center px-5 py-2 rounded-full transition-all duration-200 press-effect',
                  isActive ? 'text-white' : 'text-slate-400'
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-brand-500/25 rounded-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <Icon className={cn("w-5 h-5 relative z-10", isActive && "text-brand-400")} strokeWidth={isActive ? 2.5 : 2} />
                <span className={cn("text-[10px] mt-1 font-medium relative z-10", isActive && "text-brand-400")}>{tab.label}</span>
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
