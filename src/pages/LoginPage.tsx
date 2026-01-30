import { motion } from 'framer-motion'
import { TrendingUp, Shield, ArrowRight } from 'lucide-react'

interface LoginPageProps {
  onLogin: () => void
}

export function LoginPage({ onLogin }: LoginPageProps) {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-[-20%] left-[-30%] w-[80%] h-[60%] bg-brand-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-20%] w-[60%] h-[40%] bg-brand-500/15 rounded-full blur-[100px]" />

      <div className="flex-1 flex flex-col justify-center px-6 pt-[env(safe-area-inset-top)] pb-12 relative z-10">
        {/* Logo and branding */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-400 to-brand-600 mb-6 shadow-xl shadow-brand-500/30">
            <TrendingUp className="w-10 h-10 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            NorStock
          </h1>
          <p className="text-slate-400 text-lg">
            Unoterte aksjer – oversikt og matching
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4 mb-12"
        >
          {[
            { title: 'Porteføljeoversikt', desc: 'Hold oversikt over alle dine unoterte investeringer' },
            { title: 'Selskapsprofiler', desc: 'Detaljert informasjon om selskaper og nøkkeltall' },
            { title: 'Matching', desc: 'Finn kjøpere og selgere i markedsplassen' },
          ].map((feature, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-4 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-500/20 flex items-center justify-center shrink-0">
                <div className="w-2 h-2 rounded-full bg-brand-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-0.5">{feature.title}</h3>
                <p className="text-sm text-slate-400">{feature.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Login buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-3"
        >
          <button
            onClick={onLogin}
            className="w-full bg-gradient-to-r from-brand-500 to-brand-600 text-white py-4 px-6 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 shadow-xl shadow-brand-500/30 press-effect transition-all hover:shadow-brand-500/50"
          >
            <Shield className="w-5 h-5" />
            Logg inn med BankID
            <ArrowRight className="w-5 h-5 ml-auto" />
          </button>

          <button
            onClick={onLogin}
            className="w-full glass text-white py-4 px-6 rounded-2xl font-medium flex items-center justify-center gap-2 press-effect"
          >
            Utforsk som gjest
          </button>
        </motion.div>

        {/* Terms */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-xs text-slate-500 mt-8"
        >
          Ved å logge inn aksepterer du våre{' '}
          <span className="text-brand-400">vilkår</span> og{' '}
          <span className="text-brand-400">personvernregler</span>
        </motion.p>
      </div>
    </div>
  )
}
