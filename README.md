# NorStock

> Plattform for unoterte aksjer – porteføljeoversikt, selskapsprofiler og matching

![NorStock](https://img.shields.io/badge/Status-Prototype-00a79d)
![React](https://img.shields.io/badge/React-18.3-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

## 📱 Om prosjektet

NorStock er en PWA (Progressive Web App) som gjør det enklere for investorer å følge med på unoterte aksjer og kommunisere med selskaper. Plattformen fasiliterer matching mellom potensielle kjøpere og selgere.

### Hovedfunksjoner

- 📊 **Porteføljeoversikt** – Hold oversikt over dine unoterte investeringer
- 🏢 **Selskapsprofiler** – Detaljert informasjon og nøkkeltall
- 💬 **Forum** – Diskusjoner per selskap (åpent + aksjonær-kun)
- 🤝 **Markedsplass** – Kjøps-/salgsinteresse med matching
- 🔐 **BankID** – Sikker norsk autentisering

> **Viktig:** NorStock utfører ikke transaksjoner – kun fasilitering av kommunikasjon og matching.

## 🛠️ Tech Stack

| Teknologi | Bruksområde |
|-----------|-------------|
| React + Vite | Frontend |
| TypeScript | Type-sikkerhet |
| Tailwind CSS | Styling |
| React Router | Routing |
| Framer Motion | Animasjoner |
| Lucide React | Ikoner |

## 🚀 Kom i gang

### Forutsetninger

- [Bun](https://bun.sh/) (package manager)
- Node.js 18+

### Installasjon

```bash
# Klon repo
git clone https://github.com/studioxdeveloper/norstock.git
cd norstock

# Installer dependencies
bun install

# Start utviklingsserver
bun run dev
```

Åpne http://localhost:5173 i nettleseren.

### PWA på mobil

1. Åpne appen i Safari (iOS) eller Chrome (Android)
2. Trykk på del-ikonet
3. Velg "Legg til på Hjem-skjerm"

## 📁 Prosjektstruktur

```
src/
├── components/       # Gjenbrukbare komponenter
│   ├── AppLayout.tsx # Hovedlayout med tab bar
│   └── Header.tsx    # Sticky header
├── pages/            # Sidekomponenter
│   ├── LoginPage.tsx
│   ├── PortfolioPage.tsx
│   ├── CompaniesPage.tsx
│   ├── CompanyDetailPage.tsx
│   ├── MarketplacePage.tsx
│   └── ProfilePage.tsx
├── lib/              # Utilities
│   └── utils.ts
├── App.tsx           # Router setup
├── main.tsx          # Entry point
└── index.css         # Global styles
```

## 🎨 Fargeprofil

| Farge | Hex | Bruk |
|-------|-----|------|
| Primær | `#00a79d` | Knapper, lenker, aktive elementer |
| Sekundær | `#ed9f22` | Aksentfarger |
| Sort | `#000000` | Tekst |
| Grå | `#58595b` | Sekundær tekst |

## 📜 Scripts

```bash
bun run dev       # Start utviklingsserver
bun run build     # Bygg for produksjon
bun run preview   # Forhåndsvis produksjonsbuild
bun run lint      # Kjør ESLint
```

## 🔧 Miljøvariabler

Kopier `.env.example` til `.env` og fyll inn verdier:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_CRIIPTO_DOMAIN=
VITE_CRIIPTO_CLIENT_ID=
```

## 📋 Roadmap

- [x] Prototype med mock-data
- [ ] Supabase backend-integrasjon
- [ ] BankID-autentisering
- [ ] Brønnøysund API-integrasjon
- [ ] Forum-funksjonalitet
- [ ] Matching-system
- [ ] Push-notifikasjoner

## 👥 Team

Utviklet av **STUDIO X AS**

## 📄 Lisens

Proprietær – Alle rettigheter forbeholdt.

---

*Sist oppdatert: Januar 2026*
