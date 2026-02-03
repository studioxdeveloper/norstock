import { motion } from 'framer-motion'
import { Shield, ArrowRight, Briefcase, Building2, Handshake, TrendingUp } from 'lucide-react'

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
          className="text-center mb-8"
        >
          <img 
            src="/appikon.png" 
            alt="NorStock" 
            className="w-20 h-20 rounded-3xl mb-6 shadow-xl shadow-brand-500/30 mx-auto"
          />
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            NorStock
          </h1>
          <p className="text-slate-400 text-lg">
            Unoterte aksjer – oversikt og matching
          </p>
        </motion.div>

        {/* Hero illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative h-32 mb-8 flex items-center justify-center"
        >
          {/* Decorative chart lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 120" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00a79d" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#00a79d" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#00a79d" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <path 
              d="M0 100 Q50 80 100 60 T200 40 T300 50 T400 30" 
              stroke="url(#chartGradient)" 
              strokeWidth="2" 
              fill="none"
              className="opacity-60"
            />
            <path 
              d="M0 90 Q80 70 150 80 T250 50 T350 60 T400 40" 
              stroke="#ed9f22" 
              strokeWidth="1.5" 
              fill="none"
              strokeDasharray="4 4"
              className="opacity-40"
            />
          </svg>
          
          {/* Floating icons */}
          <div className="relative flex items-center justify-center gap-8">
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-14 h-14 rounded-2xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center"
            >
              <TrendingUp className="w-7 h-7 text-brand-400" />
            </motion.div>
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="w-16 h-16 rounded-2xl bg-accent-orange/20 border border-accent-orange/30 flex items-center justify-center"
            >
              <Building2 className="w-8 h-8 text-accent-orange" />
            </motion.div>
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="w-14 h-14 rounded-2xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center"
            >
              <Handshake className="w-7 h-7 text-brand-400" />
            </motion.div>
          </div>
        </motion.div>

        {/* Features in single card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-3xl p-5 mb-8"
        >
          <div className="space-y-4">
            {[
              { icon: Briefcase, title: 'Porteføljeoversikt', desc: 'Hold oversikt over dine investeringer' },
              { icon: Building2, title: 'Selskapsprofiler', desc: 'Detaljert info og nøkkeltall' },
              { icon: Handshake, title: 'Matching', desc: 'Finn kjøpere og selgere' },
            ].map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-500/15 flex items-center justify-center shrink-0">
                  <feature.icon className="w-5 h-5 text-brand-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white text-sm">{feature.title}</h3>
                  <p className="text-xs text-slate-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
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
