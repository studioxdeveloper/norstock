import { ReactNode } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface HeaderProps {
  title: string
  subtitle?: string
  showBack?: boolean
  rightAction?: ReactNode
}

export function Header({ 
  title, 
  subtitle, 
  showBack = false, 
  rightAction,
}: HeaderProps) {
  const navigate = useNavigate()

  return (
    <div className="sticky top-0 z-30 glass-dark">
      <div className="px-4 pt-[calc(env(safe-area-inset-top)+12px)] pb-3">
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full glass flex items-center justify-center press-effect shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          
          <div className="flex-1 min-w-0">
            {subtitle && (
              <p className="text-slate-400 text-sm">{subtitle}</p>
            )}
            <h1 className="text-xl font-bold truncate">{title}</h1>
          </div>

          {rightAction && (
            <div className="shrink-0">
              {rightAction}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
