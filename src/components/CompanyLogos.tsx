// Company logos using Lucide icons with white icons and slate background
import { Rocket, Leaf, CreditCard, Fish, HeartPulse, Home, LucideIcon } from 'lucide-react'

interface LogoProps {
  className?: string
}

interface CompanyLogoProps extends LogoProps {
  icon: LucideIcon
}

function CompanyLogo({ className, icon: Icon }: CompanyLogoProps) {
  return (
    <div 
      className={`flex items-center justify-center rounded-xl ${className}`}
      style={{ backgroundColor: 'rgba(51, 65, 85, 0.8)' }}
    >
      <Icon className="w-1/2 h-1/2 text-white" strokeWidth={1.5} />
    </div>
  )
}

// TechStart AS
export function TechStartLogo({ className }: LogoProps) {
  return <CompanyLogo className={className} icon={Rocket} />
}

// GreenEnergy Norge
export function GreenEnergyLogo({ className }: LogoProps) {
  return <CompanyLogo className={className} icon={Leaf} />
}

// Nordic FinTech
export function NordicFinTechLogo({ className }: LogoProps) {
  return <CompanyLogo className={className} icon={CreditCard} />
}

// Seafood Innovation
export function SeafoodInnovationLogo({ className }: LogoProps) {
  return <CompanyLogo className={className} icon={Fish} />
}

// HealthTech Nordic
export function HealthTechNordicLogo({ className }: LogoProps) {
  return <CompanyLogo className={className} icon={HeartPulse} />
}

// PropTech Norway
export function PropTechNorwayLogo({ className }: LogoProps) {
  return <CompanyLogo className={className} icon={Home} />
}

// Map company IDs to logo components
export const companyLogos: Record<string, React.FC<{ className?: string }>> = {
  '1': TechStartLogo,
  '2': GreenEnergyLogo,
  '3': NordicFinTechLogo,
  '4': SeafoodInnovationLogo,
  '5': HealthTechNordicLogo,
  '6': PropTechNorwayLogo,
}

// Default fallback logo
export function DefaultCompanyLogo({ className, initials }: { className?: string; initials: string }) {
  return (
    <div 
      className={`flex items-center justify-center rounded-xl ${className}`}
      style={{ backgroundColor: 'rgba(51, 65, 85, 0.8)' }}
    >
      <span className="text-white font-bold text-sm">{initials}</span>
    </div>
  )
}
