# FATF Compliance Dashboard

[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0+-purple.svg)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Interactive visualization dashboard for FATF (Financial Action Task Force) compliance status, grey/black lists, and crypto regulation worldwide.**

## 🎯 Purpose

**This fills the biggest gap discovered in the competitive landscape: ZERO dedicated FATF visualization tools exist on GitHub.**

The dashboard provides:

- Interactive world map with FATF grey/black list status
- Historical tracking of list changes
- Crypto regulation comparison tables
- Country deep-dives for any jurisdiction
- Side-by-side comparison tool

## 📸 Screenshots

### Global Dashboard
- Interactive map with color-coded FATF status
- Stats overview (black list, grey list, recently removed)
- Jurisdiction lists with quick access

### Country Detail
- FATF status history
- Crypto regulation details
- Risk score visualization
- Travel Rule & VASP licensing status

### Comparison Tool
- Compare up to 5 jurisdictions
- Side-by-side metrics
- Visual indicators for compliance

## 🌍 Features

### Interactive Map
- Color-coded FATF status (compliant, grey list, black list)
- Click for country details
- Filter by status

### Country Profiles
- FATF evaluation history
- Crypto regulatory framework
- Risk score (0-100)
- Basel AML Index integration

### Comparison Tools
- Side-by-side regulation comparison
- Travel Rule implementation status
- VASP licensing requirements

### Timeline
- Historical list changes
- Adding/removal events
- Status upgrades

## 🛠️ Tech Stack

- **React 18** + **TypeScript**
- **Vite** - Fast build tool
- **Leaflet.js** - Interactive maps
- **Recharts** - Charts and visualizations
- **TailwindCSS** - Styling
- **React Query** - Data fetching
- **React Router** - Navigation

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
fatf-compliance-dashboard/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Layout.tsx
│   │   ├── WorldMap.tsx
│   │   ├── StatsCards.tsx
│   │   ├── JurisdictionList.tsx
│   │   └── RiskChart.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── CountryDetail.tsx
│   │   ├── Comparison.tsx
│   │   └── Timeline.tsx
│   ├── data/
│   │   └── fatfData.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

## 📊 Data Sources

- **FATF Publications** - Official grey/black list updates
- **Basel AML Index** - Country risk scores
- **National Regulators** - Crypto regulation status

## 🔮 Roadmap

- [ ] Real-time FATF publication parsing
- [ ] Basel AML Index API integration
- [ ] Email alerts for list changes
- [ ] Export to PDF/Excel
- [ ] Embed widget for external sites

## 🚢 Deployment

### GitHub Pages

```bash
npm run build
# Deploy dist/ folder to gh-pages branch
```

### Vercel

```bash
npm i -g vercel
vercel
```

## 📄 License

MIT License - See [LICENSE](LICENSE) for details.

## ⚠️ Disclaimer

This dashboard is for research and informational purposes only. FATF status data is updated periodically and may not reflect the most recent changes. Always verify with official FATF publications for compliance decisions.
