import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { 
  TrendingUp, TrendingDown, Send, Info, CheckCircle2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Header } from '@/components/Header'

export function RegisterInterestPage() {
  const navigate = useNavigate()
  const { companyId } = useParams()
  const [searchParams] = useSearchParams()
  const initialType = searchParams.get('type') as 'buy' | 'sell' | null
  
  const [interestType, setInterestType] = useState<'buy' | 'sell'>(initialType || 'buy')
  const [shares, setShares] = useState('')
  const [pricePerShare, setPricePerShare] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Mock company name - in real app this would come from API/context
  const companyName = 'TechStart AS'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would submit to API
    setIsSubmitted(true)
    
    // Redirect after a delay
    setTimeout(() => {
      navigate(`/companies/${companyId}`)
    }, 2000)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
            className="w-20 h-20 rounded-full bg-accent-green/20 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-10 h-10 text-accent-green" />
          </motion.div>
          <h2 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">Interesse registrert!</h2>
          <p className="text-slate-500 dark:text-slate-400">
            Du vil bli varslet når det er en match.
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header 
        title="Registrer interesse" 
        showBack 
      />

      <form onSubmit={handleSubmit} className="px-4 py-4 space-y-6">
        {/* Interest type selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-3">
            Type interesse
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setInterestType('buy')}
              className={cn(
                'p-4 rounded-2xl flex flex-col items-center gap-2 transition-all press-effect',
                interestType === 'buy'
                  ? 'bg-brand-500/20 border-2 border-brand-500'
                  : 'glass border-2 border-transparent'
              )}
            >
              <TrendingUp className={cn(
                'w-6 h-6',
                interestType === 'buy' ? 'text-brand-400' : 'text-slate-400'
              )} />
              <span className={cn(
                'font-semibold',
                interestType === 'buy' ? 'text-brand-500 dark:text-brand-400' : 'text-slate-600 dark:text-slate-300'
              )}>
                Kjøp
              </span>
              <span className="text-xs text-slate-500">Jeg vil kjøpe aksjer</span>
            </button>
            
            <button
              type="button"
              onClick={() => setInterestType('sell')}
              className={cn(
                'p-4 rounded-2xl flex flex-col items-center gap-2 transition-all press-effect',
                interestType === 'sell'
                  ? 'bg-brand-500/20 border-2 border-brand-500'
                  : 'glass border-2 border-transparent'
              )}
            >
              <TrendingDown className={cn(
                'w-6 h-6',
                interestType === 'sell' ? 'text-brand-400' : 'text-slate-400'
              )} />
              <span className={cn(
                'font-semibold',
                interestType === 'sell' ? 'text-brand-500 dark:text-brand-400' : 'text-slate-600 dark:text-slate-300'
              )}>
                Salg
              </span>
              <span className="text-xs text-slate-500">Jeg vil selge aksjer</span>
            </button>
          </div>
        </motion.div>

        {/* Number of shares */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-3">
            Antall aksjer
          </label>
          <input
            type="number"
            value={shares}
            onChange={(e) => setShares(e.target.value)}
            placeholder="F.eks. 100"
            className="w-full glass rounded-2xl px-4 py-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-brand-500/50"
            required
          />
        </motion.div>

        {/* Price per share - only for sell */}
        {interestType === 'sell' && (
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-3">
              Pris per aksje (valgfritt)
            </label>
            <input
              type="number"
              value={pricePerShare}
              onChange={(e) => setPricePerShare(e.target.value)}
              placeholder="F.eks. 150 kr"
              className="w-full glass rounded-2xl px-4 py-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-brand-500/50"
            />
          </div>
        )}

        {/* Message to company */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-3">
            Melding til selskapet (valgfritt)
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Skriv en melding om din interesse, spørsmål eller kommentarer..."
            rows={4}
            className="w-full glass rounded-2xl px-4 py-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-brand-500/50 resize-none"
          />
        </motion.div>

        {/* Info box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-4 flex gap-3"
        >
          <Info className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
          <div className="text-sm text-slate-500 dark:text-slate-400">
            <p className="mb-2">
              <strong className="text-slate-700 dark:text-slate-300">Interesser er ikke bindende.</strong>
            </p>
            <p>
              Når noen matcher din interesse vil du bli varslet. Begge parter må godta kontakt før identiteter avsløres.
            </p>
          </div>
        </motion.div>

        {/* Submit button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="pt-2"
        >
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-brand-500 to-brand-600 text-white py-4 px-6 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 shadow-xl shadow-brand-500/30 press-effect"
          >
            <Send className="w-5 h-5" />
            Send interesse
          </button>
        </motion.div>
      </form>
    </div>
  )
}
