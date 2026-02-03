import { ReactNode } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface HeaderProps {
  title: string
  showBack?: boolean
  rightAction?: ReactNode
}

export function Header({ 
  title, 
  showBack = false, 
  rightAction,
}: HeaderProps) {
  const navigate = useNavigate()

  return (
    <div className="sticky top-0 z-30 glass-dark">
      <div className="px-4 pt-[calc(env(safe-area-inset-top)+12px)] pb-3">
        <div className="flex items-center justify-between">
          {/* Left side - back button or spacer */}
          <div className="w-10 shrink-0">
            {showBack && (
              <button
                onClick={() => navigate(-1)}
                className="w-10 h-10 rounded-full glass flex items-center justify-center press-effect"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-white" />
              </button>
            )}
          </div>
          
          {/* Center - title */}
          <h1 className="text-lg font-semibold text-slate-900 dark:text-white truncate text-center flex-1 px-2">
            {title}
          </h1>

          {/* Right side - action or spacer */}
          <div className="w-10 shrink-0 flex justify-end">
            {rightAction}
          </div>
        </div>
      </div>
    </div>
  )
}
