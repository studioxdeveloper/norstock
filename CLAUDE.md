# STUDIO X Tech Stack

> Denne filen gir Claude full kontekst om STUDIO X sin teknologistack og konvensjoner.

---

## DETTE PROSJEKTET

> **Fyll ut for hvert prosjekt.** Claude bruker dette til å forstå hva som er relevant.

```yaml
prosjekt:
  navn: "NorStock"
  beskrivelse: "Plattform for unoterte aksjer - porteføljeoversikt, selskapsprofiler, forum og markedsplass for kjøp/salg-interesse"

type:                         # Sett 'x' for aktive plattformer
  web: [ ]                    # React + Vite webapplikasjon
  pwa: [x]                    # Progressive Web App (anbefalt for MVP)
  react_native: [ ]           # React Native mobilapp
  admin: [x]                  # Admin-panel for selskapsadministratorer

supabase:
  prosjekt_navn: "NorStock"
  region: "eu-north-1"        # Stockholm (GDPR-compliance, norske data)

auth:
  metode: "BankID"            # Via Signicat/Criipto for sikker norsk e-ID
  # Clerk brukes IKKE - BankID er primær autentisering

integrasjoner:
  - BankID (autentisering via Signicat/Criipto)
  - Brønnøysundregistrene (selskapssøk, prokura-verifisering)
  # Senere faser:
  # - Aksjonærregister
  # - Varslinger (push/e-post/SMS)

nøkkelfunksjoner:
  - Porteføljeoversikt for investorer
  - Selskapsprofiler med nøkkeltall
  - Forum per selskap (åpent + aksjonær-kun)
  - Markedsplass for kjøps-/salgsinteresse
  - Matching mellom kjøper og selger
  - Sluttseddelmal for transaksjoner

viktig:
  - Løsningen skal IKKE utføre transaksjoner (unngå konsesjonsplikt)
  - Kun fasilitere kommunikasjon og matching
  - Ikke crowdfunding eller investeringsrådgivning
```

### Hva Claude skal fokusere på

| Prosjekttype | Relevante seksjoner | Design System |
|--------------|---------------------|---------------|
| **Web** | Frontend – Web, Backend, Auth | – |
| **PWA** | Frontend – Web, Backend, Auth | `docs/PWA_DESIGN.md` |
| **React Native (iOS)** | Frontend – React Native, Backend, Auth | `docs/DESIGN_IOS_APP.md` |
| **React Native (Android)** | Frontend – React Native, Backend, Auth | `docs/DESIGN_ANDROID_APP.md` |
| **Admin** | Frontend – Web, Backend, Auth | – |

---

## Selskap

**STUDIO X AS** – Norsk utviklingsselskap for mobilapper, PWA-er og webløsninger.

**GitHub:** [github.com/studioxdeveloper](https://github.com/studioxdeveloper)

---

## Tech Stack Oversikt

### Frontend – Web & PWA

| Teknologi | Bruksområde |
|-----------|-------------|
| **React + Vite** | UI og build (IKKE Next.js) |
| **TypeScript** | Alltid |
| **React Router** | Client-side routing |
| **Tailwind CSS** | Styling |
| **shadcn/ui** | UI-komponenter |
| **Lucide React** | Ikoner |
| **React Query** | Data fetching |
| **Recharts** | Grafer |

### Frontend – React Native

| Teknologi | Bruksområde |
|-----------|-------------|
| **React Native + Expo** | Native mobilapper |
| **Expo Router** | Fil-basert routing |
| **TypeScript** | Alltid |

### Backend

| Teknologi | Bruksområde |
|-----------|-------------|
| **Supabase** | Primær backend (PostgreSQL, Auth, Storage, Realtime) |
| **PostgreSQL RLS** | Row Level Security for aksjonærdata |

### Auth & Integrasjoner

| Teknologi | Bruksområde |
|-----------|-------------|
| **BankID** | Primær auth for NorStock (via Signicat/Criipto) |
| **Brønnøysund API** | Selskapssøk og prokura-verifisering |
| **Supabase Auth** | Session management etter BankID-login |
| **Resend** | E-postvarsler |

### Verktøy

| Teknologi | Bruksområde |
|-----------|-------------|
| **Bun** | Package manager og runtime |
| **Vercel** | Hosting |
| **GitHub Actions** | CI/CD |
| **Expo EAS** | React Native builds |

---

## Git & GitHub

### Organisasjon

Alle prosjekter opprettes under **[github.com/studioxdeveloper](https://github.com/studioxdeveloper)**.

### .gitignore (OBLIGATORISK)

Når du oppretter et nytt prosjekt, **MÅ** denne `.gitignore` brukes:

```gitignore
# Dependencies
node_modules/
.pnp/
.pnp.js

# Build
dist/
build/
.next/
out/
.expo/

# Environment – ALDRI COMMIT DISSE
.env
.env.local
.env.development
.env.production
.env*.local
*.env

# Claude/AI – Skal ikke i Git
.claude/
.cursor/
Documentation/

# IDE
.vscode/
.idea/
*.swp
*.swo
.DS_Store

# Testing
coverage/
.nyc_output/

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# TypeScript
*.tsbuildinfo

# Expo (React Native)
.expo/
dist/
web-build/

# Supabase
supabase/.branches/
supabase/.temp/
```

### Hva som IKKE skal i Git

| Mappe/Fil | Grunn |
|-----------|-------|
| `.env*` | Hemmeligheter (API-nøkler, passord) |
| `.claude/` | Lokal Claude-konfig |
| `.cursor/` | Lokal Cursor-konfig |
| `Documentation/` | Kundefiler (presentasjoner, UX) |
| `node_modules/` | Installeres med `bun install` |

### Hva som SKAL i Git

| Mappe/Fil | Grunn |
|-----------|-------|
| `CLAUDE.md` | Prosjektkonfig for Claude |
| `docs/` | STUDIO X dokumentasjon |
| `src/` | Kildekode |
| `.env.example` | Mal for miljøvariabler (uten verdier) |

### .env.example (lag alltid)

```env
# Supabase
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

# BankID via Criipto
VITE_CRIIPTO_DOMAIN=
VITE_CRIIPTO_CLIENT_ID=

# Brønnøysund API
VITE_BRREG_API_URL=https://data.brreg.no/enhetsregisteret/api

# E-post
RESEND_API_KEY=
```

### Git-kommandoer for nytt prosjekt

```bash
# 1. Initialiser Git
git init

# 2. Legg til .gitignore FØRST
# (Claude oppretter denne automatisk)

# 3. Første commit
git add .
git commit -m "Initial commit: Project setup"

# 4. Koble til GitHub
git remote add origin https://github.com/studioxdeveloper/[prosjektnavn].git
git branch -M main
git push -u origin main
```

### Branch-strategi

```bash
# Feature
git checkout -b feature/user-auth

# Bugfix
git checkout -b fix/login-error

# Merge til main
git checkout main
git merge feature/user-auth
git push
```

### Commit-meldinger (engelsk)

```bash
# Format: type: beskrivelse
git commit -m "Add user authentication with Clerk"
git commit -m "Fix login redirect bug"
git commit -m "Update dashboard layout"
```

---

## Supabase

### Grunnleggende oppsett

```tsx
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

### Row Level Security (RLS) – ALLTID PÅ

```sql
-- Aktiver RLS
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Brukere kan kun se/endre egne data
CREATE POLICY "Users own data" ON documents
  FOR ALL USING (auth.uid() = user_id);
```

### Realtime

```tsx
const channel = supabase
  .channel('changes')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'documents' },
    (payload) => console.log(payload)
  )
  .subscribe()
```

### Storage

```tsx
// Last opp
await supabase.storage.from('files').upload(`${userId}/${filename}`, file)

// Hent URL
const { data } = supabase.storage.from('files').getPublicUrl(path)
```

---

## State Management

| Type | Løsning |
|------|---------|
| **Server state** | React Query |
| **Global UI** | Zustand |
| **Lokal** | useState |

```tsx
// stores/uiStore.ts
import { create } from 'zustand'

export const useUIStore = create((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
}))
```

---

## Mappestruktur

### Små prosjekter

```
src/
├── components/
│   └── ui/              # shadcn/ui
├── pages/
├── hooks/
├── stores/
├── lib/
│   ├── supabase.ts
│   ├── queryClient.ts
│   └── errors.ts
├── types/
└── App.tsx
```

### Store prosjekter (feature-basert)

```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── api.ts
│   └── dashboard/
├── shared/
│   ├── components/ui/
│   ├── hooks/
│   ├── stores/
│   └── lib/
└── pages/
```

---

## API-kall mønster

Bruk custom hooks med React Query – ikke lag eget service-lag.

```tsx
// hooks/useDocuments.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { parseError } from '@/lib/errors'
import toast from 'react-hot-toast'

export function useDocuments() {
  return useQuery({
    queryKey: ['documents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      return data
    },
  })
}

export function useCreateDocument() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (input: { title: string }) => {
      const { data, error } = await supabase
        .from('documents')
        .insert(input)
        .select()
        .single()
      if (error) throw error
      return data
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['documents'] })
      toast.success('Opprettet!')
    },
    onError: (e) => toast.error(parseError(e)),
  })
}
```

---

## Kodekonvensjoner

### Navngivning

- Komponenter: `PascalCase` (`UserProfile.tsx`)
- Hooks: `useX` (`useAuth.ts`)
- Utilities: `camelCase` (`formatDate.ts`)

### TypeScript

```tsx
// Eksplisitte typer på props
interface ButtonProps {
  variant: 'primary' | 'secondary'
  children: React.ReactNode
  onClick?: () => void
}
```

### Git

```bash
# Branching
git checkout -b feature/user-auth
git checkout -b fix/login-error

# Commits (engelsk)
git commit -m "Add user authentication"
```

---

## Prosjektoppsett

### PWA / Web (React + Vite)

```bash
# 1. Opprett prosjekt
bun create vite my-app --template react-ts
cd my-app

# 2. Installer core dependencies
bun add react-router-dom @supabase/supabase-js
bun add @tanstack/react-query zustand
bun add lucide-react recharts
bun add react-hot-toast

# 3. Installer Tailwind CSS
bun add -d tailwindcss postcss autoprefixer
bunx tailwindcss init -p

# 4. Installer shadcn/ui
bunx shadcn@latest init
# Velg: New York style, Zinc color, CSS variables: yes

# 5. Legg til shadcn-komponenter (etter behov)
bunx shadcn@latest add button card input label
bunx shadcn@latest add dialog sheet dropdown-menu
bunx shadcn@latest add form select textarea checkbox

# 6. Auth (velg én)
bun add @clerk/clerk-react        # Clerk (anbefalt)
# ELLER bruk Supabase Auth (allerede installert)

# 7. Testing
bun add -d vitest @testing-library/react @testing-library/jest-dom
bun add -d playwright @playwright/test
```

### React Native (Expo)

```bash
# 1. Opprett prosjekt
bunx create-expo-app my-app --template tabs
cd my-app

# 2. Installer core dependencies
bun add @supabase/supabase-js
bun add @tanstack/react-query zustand
bun add react-hot-toast

# 3. Installer animasjoner og haptics
bunx expo install react-native-reanimated
bunx expo install react-native-gesture-handler
bunx expo install expo-haptics
bunx expo install expo-blur

# 4. Installer ikoner
bun add lucide-react-native
bunx expo install react-native-svg

# 5. Auth
bun add @clerk/clerk-expo         # Clerk
bunx expo install expo-secure-store

# 6. Nyttige Expo-pakker
bunx expo install expo-image
bunx expo install expo-camera
bunx expo install expo-location
bunx expo install expo-notifications
```

### Etter oppsett – Opprett filer

```bash
# Opprett mappestruktur
mkdir -p src/{components/ui,features,hooks,lib,pages,stores,types}

# Opprett config-filer
touch src/lib/supabase.ts
touch src/lib/queryClient.ts
touch src/lib/errors.ts

# Opprett .env.example
touch .env.example
```

### shadcn/ui Tailwind-konfig

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // ... resten genereres av shadcn init
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

### Daglige kommandoer

```bash
# Utvikling
bun run dev              # Start dev server
bun run build            # Bygg for produksjon
bun run preview          # Forhåndsvis build

# Testing
bun run test             # Kjør unit tests
bun run test:e2e         # Kjør E2E tests

# Linting
bun run lint             # ESLint
bun run typecheck        # TypeScript sjekk

# Expo (React Native)
bunx expo start          # Start Expo
bunx expo start --ios    # Start iOS simulator
bunx expo start --android # Start Android emulator
eas build --platform ios  # Bygg til App Store
```

---

## STUDIO X Autopilot (MCP Server)

STUDIO X har en dedikert MCP-server (`sx-autopilot`) som gir tilgang til alle STUDIO X skills og verktøy.

### Når brukeren ber om skills

**ALLTID bruk MCP-serveren først:**

```typescript
// 1. List alle skills
CallMcpTool("sx-autopilot", "list_skills", {})

// 2. Søk etter spesifikke skills
CallMcpTool("sx-autopilot", "search_skills", {
  keywords: ["betaling", "vipps"]
})

// 3. Hent en spesifikk skill
CallMcpTool("sx-autopilot", "get_skill", {
  skill_name: "vipps-checkout"
})
```

### Tilgjengelige MCP-verktøy

| Verktøy | Beskrivelse |
|---------|-------------|
| `list_skills` | Lister alle tilgjengelige STUDIO X skills |
| `search_skills` | Søker etter skills basert på nøkkelord |
| `get_skill` | Henter detaljert informasjon om en skill |
| `analyze_requirements` | Analyserer krav og foreslår relevante skills |
| `generate_context` | Genererer kontekst for implementering |

### Eksempler

```bash
# Bruker: "list skills"
→ Bruk: CallMcpTool("sx-autopilot", "list_skills", {})

# Bruker: "finn skills for betaling"
→ Bruk: CallMcpTool("sx-autopilot", "search_skills", { keywords: ["betaling"] })

# Bruker: "hvordan implementere vipps?"
→ Bruk: CallMcpTool("sx-autopilot", "get_skill", { skill_name: "vipps-checkout" })
```

---

## Dokumentasjon

| Emne | Fil |
|------|-----|
| **Brukerveiledning** | `docs/BRUKERVEILEDNING.md` |
| PWA Design System | `docs/PWA_DESIGN.md` |
| React Native (iOS) | `docs/DESIGN_IOS_APP.md` |
| React Native (Android) | `docs/DESIGN_ANDROID_APP.md` |
| Error Handling | `docs/ERROR_HANDLING.md` |

### Norske Integrasjoner

| Integrasjon | Fil |
|-------------|-----|
| BankID (e-ID) | `docs/integrations/BANKID.md` |
| Vipps (betaling) | `docs/integrations/VIPPS.md` |
| Altinn (offentlig) | `docs/integrations/ALTINN.md` |
| Norkart (kart/eiendom) | `docs/integrations/NORKART.md` |

---

## Testing

| Type | Verktøy |
|------|---------|
| Unit | Vitest |
| Component | React Testing Library |
| E2E | Playwright |

---

## Krav

- **WCAG 2.1 AA** på alle prosjekter
- **GDPR** – data i EU, samtykke, rett til sletting
- **Språk UI**: Norsk bokmål (støtt engelsk)
- **Språk kode**: Engelsk

---

---

## NorStock-spesifikke notater

### Datamodell (hovedtabeller)

```sql
-- Brukere (koblet til BankID)
users (id, bankid_pid, name, email, created_at)

-- Selskaper
companies (id, org_number, name, sector, description, ceo,
           share_count, revenue, website_url, seeking_capital, created_at)

-- Portefølje (brukers aksjer)
portfolios (id, user_id, company_id, share_count, acquired_at)

-- Forum-innlegg
forum_posts (id, company_id, user_id, content, is_shareholder_only, created_at)

-- Markedsplass (kjøp/salg-interesse)
market_interests (id, user_id, company_id, type [buy/sell],
                  share_count, price_indication, created_at)

-- Transaksjoner (for historikk, ikke utført av plattformen)
transactions (id, company_id, price_per_share, date_registered)
```

### RLS-policies (viktige)

```sql
-- Aksjonær-kun forum: kun synlig for de med aksjer i selskapet
CREATE POLICY "Shareholder forum access" ON forum_posts
  FOR SELECT USING (
    NOT is_shareholder_only
    OR EXISTS (
      SELECT 1 FROM portfolios
      WHERE portfolios.company_id = forum_posts.company_id
      AND portfolios.user_id = auth.uid()
    )
  );
```

### Regulatorisk viktig

- **IKKE** utfør transaksjoner - kun matching og kommunikasjon
- Sluttseddel fylles ut av kjøper/selger utenfor plattformen
- Selskapet oppdaterer aksjonærregister manuelt

*Sist oppdatert: 30. januar 2026*
