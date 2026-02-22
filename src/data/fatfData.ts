/**
 * FATF compliance data for all jurisdictions.
 * Data sources: FATF publications, Basel AML Index, national regulators
 */

export type FATFStatus = 'black_list' | 'grey_list' | 'compliant' | 'unknown'
export type CryptoStatus = 'legal' | 'restricted' | 'banned' | 'unregulated' | 'unknown'

export interface JurisdictionData {
  code: string           // ISO 3166-1 alpha-2
  name: string
  fatfStatus: FATFStatus
  fatfStatusDate?: string // When status was last changed
  riskScore: number      // 0-100
  baselAmlIndex?: number // Basel AML Index score
  
  // Crypto regulation
  cryptoStatus: CryptoStatus
  hasTravelRule: boolean
  hasVASPLicensing: boolean
  
  // Key dates
  greyListDate?: string
  blackListDate?: string
  removalDate?: string
  
  // Notes
  notes?: string
  
  // Coordinates for map
  lat: number
  lng: number
}

// FATF Black List (Call for Action)
export const BLACK_LIST: JurisdictionData[] = [
  {
    code: 'KP',
    name: 'North Korea',
    fatfStatus: 'black_list',
    riskScore: 100,
    cryptoStatus: 'unknown',
    hasTravelRule: false,
    hasVASPLicensing: false,
    blackListDate: '2011-02-01',
    notes: 'Subject to counter-measures since 2011',
    lat: 40.0, lng: 127.0
  },
  {
    code: 'IR',
    name: 'Iran',
    fatfStatus: 'black_list',
    riskScore: 95,
    cryptoStatus: 'restricted',
    hasTravelRule: false,
    hasVASPLicensing: false,
    blackListDate: '2020-02-01',
    notes: 'Counter-measures since 2020; significant crypto mining',
    lat: 32.0, lng: 53.0
  },
  {
    code: 'MM',
    name: 'Myanmar',
    fatfStatus: 'black_list',
    riskScore: 90,
    cryptoStatus: 'banned',
    hasTravelRule: false,
    hasVASPLicensing: false,
    blackListDate: '2022-10-01',
    notes: 'Added after military coup; crypto banned',
    lat: 21.9, lng: 95.9
  }
]

// FATF Grey List (Increased Monitoring) - Current as of late 2024
export const GREY_LIST: JurisdictionData[] = [
  {
    code: 'BG',
    name: 'Bulgaria',
    fatfStatus: 'grey_list',
    riskScore: 55,
    cryptoStatus: 'legal',
    hasTravelRule: true,
    hasVASPLicensing: true,
    greyListDate: '2024-10-01',
    notes: 'Recently added; EU member state',
    lat: 42.7, lng: 25.5
  },
  {
    code: 'BF',
    name: 'Burkina Faso',
    fatfStatus: 'grey_list',
    riskScore: 68,
    cryptoStatus: 'unregulated',
    hasTravelRule: false,
    hasVASPLicensing: false,
    greyListDate: '2021-02-01',
    lat: 12.2, lng: -1.5
  },
  {
    code: 'CM',
    name: 'Cameroon',
    fatfStatus: 'grey_list',
    riskScore: 65,
    cryptoStatus: 'unregulated',
    hasTravelRule: false,
    hasVASPLicensing: false,
    greyListDate: '2023-02-01',
    lat: 5.9, lng: 10.9
  },
  {
    code: 'CD',
    name: 'DR Congo',
    fatfStatus: 'grey_list',
    riskScore: 70,
    cryptoStatus: 'unregulated',
    hasTravelRule: false,
    hasVASPLicensing: false,
    greyListDate: '2022-10-01',
    lat: -2.9, lng: 23.6
  },
  {
    code: 'HT',
    name: 'Haiti',
    fatfStatus: 'grey_list',
    riskScore: 72,
    cryptoStatus: 'unregulated',
    hasTravelRule: false,
    hasVASPLicensing: false,
    greyListDate: '2020-10-01',
    lat: 19.0, lng: -72.3
  },
  {
    code: 'KE',
    name: 'Kenya',
    fatfStatus: 'grey_list',
    riskScore: 58,
    cryptoStatus: 'unregulated',
    hasTravelRule: false,
    hasVASPLicensing: false,
    greyListDate: '2024-02-01',
    lat: -1.3, lng: 36.8
  },
  {
    code: 'ML',
    name: 'Mali',
    fatfStatus: 'grey_list',
    riskScore: 70,
    cryptoStatus: 'unregulated',
    hasTravelRule: false,
    hasVASPLicensing: false,
    greyListDate: '2021-10-01',
    lat: 17.6, lng: -4.0
  },
  {
    code: 'MZ',
    name: 'Mozambique',
    fatfStatus: 'grey_list',
    riskScore: 65,
    cryptoStatus: 'unregulated',
    hasTravelRule: false,
    hasVASPLicensing: false,
    greyListDate: '2022-10-01',
    lat: -18.7, lng: 35.5
  },
  {
    code: 'NG',
    name: 'Nigeria',
    fatfStatus: 'grey_list',
    riskScore: 62,
    cryptoStatus: 'legal',
    hasTravelRule: false,
    hasVASPLicensing: true,
    greyListDate: '2023-02-01',
    notes: 'Major crypto adoption despite grey list status',
    lat: 9.1, lng: 8.7
  },
  {
    code: 'PH',
    name: 'Philippines',
    fatfStatus: 'grey_list',
    riskScore: 55,
    cryptoStatus: 'legal',
    hasTravelRule: true,
    hasVASPLicensing: true,
    greyListDate: '2021-06-01',
    notes: 'Working on action plan; active crypto market',
    lat: 12.9, lng: 121.8
  },
  {
    code: 'SN',
    name: 'Senegal',
    fatfStatus: 'grey_list',
    riskScore: 60,
    cryptoStatus: 'unregulated',
    hasTravelRule: false,
    hasVASPLicensing: false,
    greyListDate: '2021-02-01',
    lat: 14.5, lng: -14.5
  },
  {
    code: 'SS',
    name: 'South Sudan',
    fatfStatus: 'grey_list',
    riskScore: 75,
    cryptoStatus: 'unknown',
    hasTravelRule: false,
    hasVASPLicensing: false,
    greyListDate: '2021-06-01',
    lat: 6.9, lng: 31.3
  },
  {
    code: 'SY',
    name: 'Syria',
    fatfStatus: 'grey_list',
    riskScore: 78,
    cryptoStatus: 'unknown',
    hasTravelRule: false,
    hasVASPLicensing: false,
    greyListDate: '2010-02-01',
    notes: 'Long-standing grey list member',
    lat: 35.0, lng: 38.0
  },
  {
    code: 'TZ',
    name: 'Tanzania',
    fatfStatus: 'grey_list',
    riskScore: 58,
    cryptoStatus: 'unregulated',
    hasTravelRule: false,
    hasVASPLicensing: false,
    greyListDate: '2022-02-01',
    lat: -6.4, lng: 34.9
  },
  {
    code: 'VE',
    name: 'Venezuela',
    fatfStatus: 'grey_list',
    riskScore: 72,
    cryptoStatus: 'legal',
    hasTravelRule: false,
    hasVASPLicensing: false,
    greyListDate: '2024-06-01',
    notes: 'Petro cryptocurrency; high crypto adoption',
    lat: 6.4, lng: -66.6
  },
  {
    code: 'VN',
    name: 'Vietnam',
    fatfStatus: 'grey_list',
    riskScore: 52,
    cryptoStatus: 'unregulated',
    hasTravelRule: false,
    hasVASPLicensing: false,
    greyListDate: '2023-06-01',
    notes: 'High crypto adoption; working on framework',
    lat: 14.1, lng: 108.3
  },
  {
    code: 'YE',
    name: 'Yemen',
    fatfStatus: 'grey_list',
    riskScore: 76,
    cryptoStatus: 'unknown',
    hasTravelRule: false,
    hasVASPLicensing: false,
    greyListDate: '2010-02-01',
    lat: 15.6, lng: 48.5
  }
]

// Recently removed from grey list
export const RECENTLY_REMOVED: JurisdictionData[] = [
  {
    code: 'TR',
    name: 'Turkey',
    fatfStatus: 'compliant',
    riskScore: 45,
    cryptoStatus: 'legal',
    hasTravelRule: true,
    hasVASPLicensing: true,
    greyListDate: '2021-10-01',
    removalDate: '2024-06-28',
    notes: 'Removed June 2024; implemented comprehensive AML framework',
    lat: 39.0, lng: 35.2
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    fatfStatus: 'compliant',
    riskScore: 40,
    cryptoStatus: 'legal',
    hasTravelRule: true,
    hasVASPLicensing: true,
    greyListDate: '2022-03-01',
    removalDate: '2024-02-23',
    notes: 'Removed Feb 2024; major crypto hub (Dubai)',
    lat: 23.4, lng: 53.8
  },
  {
    code: 'JM',
    name: 'Jamaica',
    fatfStatus: 'compliant',
    riskScore: 48,
    cryptoStatus: 'unregulated',
    hasTravelRule: false,
    hasVASPLicensing: false,
    greyListDate: '2020-02-01',
    removalDate: '2024-06-28',
    notes: 'Removed June 2024',
    lat: 18.1, lng: -77.3
  }
]

// Key compliant jurisdictions (major economies)
export const COMPLIANT: JurisdictionData[] = [
  {
    code: 'US',
    name: 'United States',
    fatfStatus: 'compliant',
    riskScore: 20,
    baselAmlIndex: 4.71,
    cryptoStatus: 'legal',
    hasTravelRule: true,
    hasVASPLicensing: true,
    notes: 'SEC/FinCEN regulated; travel rule since 1996',
    lat: 38.9, lng: -77.0
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    fatfStatus: 'compliant',
    riskScore: 18,
    baselAmlIndex: 4.35,
    cryptoStatus: 'legal',
    hasTravelRule: true,
    hasVASPLicensing: true,
    notes: 'FCA regulated',
    lat: 51.5, lng: -0.1
  },
  {
    code: 'DE',
    name: 'Germany',
    fatfStatus: 'compliant',
    riskScore: 15,
    baselAmlIndex: 4.24,
    cryptoStatus: 'legal',
    hasTravelRule: true,
    hasVASPLicensing: true,
    notes: 'BaFin regulated; strong AML framework',
    lat: 52.5, lng: 13.4
  },
  {
    code: 'JP',
    name: 'Japan',
    fatfStatus: 'compliant',
    riskScore: 12,
    baselAmlIndex: 5.22,
    cryptoStatus: 'legal',
    hasTravelRule: true,
    hasVASPLicensing: true,
    notes: 'JFSA regulated; early crypto adopter',
    lat: 35.7, lng: 139.7
  },
  {
    code: 'SG',
    name: 'Singapore',
    fatfStatus: 'compliant',
    riskScore: 15,
    baselAmlIndex: 4.91,
    cryptoStatus: 'legal',
    hasTravelRule: true,
    hasVASPLicensing: true,
    notes: 'MAS regulated; crypto-friendly',
    lat: 1.4, lng: 103.8
  },
  {
    code: 'CH',
    name: 'Switzerland',
    fatfStatus: 'compliant',
    riskScore: 18,
    baselAmlIndex: 5.05,
    cryptoStatus: 'legal',
    hasTravelRule: true,
    hasVASPLicensing: true,
    notes: 'FINMA regulated; Crypto Valley',
    lat: 46.9, lng: 8.2
  },
  {
    code: 'HK',
    name: 'Hong Kong',
    fatfStatus: 'compliant',
    riskScore: 22,
    baselAmlIndex: 5.38,
    cryptoStatus: 'legal',
    hasTravelRule: true,
    hasVASPLicensing: true,
    notes: 'SFC regulated; new VASP regime 2024',
    lat: 22.3, lng: 114.2
  },
  {
    code: 'AU',
    name: 'Australia',
    fatfStatus: 'compliant',
    riskScore: 20,
    baselAmlIndex: 4.82,
    cryptoStatus: 'legal',
    hasTravelRule: true,
    hasVASPLicensing: true,
    notes: 'AUSTRAC regulated',
    lat: -25.3, lng: 133.8
  },
  {
    code: 'CA',
    name: 'Canada',
    fatfStatus: 'compliant',
    riskScore: 22,
    baselAmlIndex: 4.56,
    cryptoStatus: 'legal',
    hasTravelRule: true,
    hasVASPLicensing: true,
    notes: 'FINTRAC regulated',
    lat: 56.1, lng: -106.3
  },
  {
    code: 'KR',
    name: 'South Korea',
    fatfStatus: 'compliant',
    riskScore: 18,
    baselAmlIndex: 5.15,
    cryptoStatus: 'legal',
    hasTravelRule: true,
    hasVASPLicensing: true,
    notes: 'FSC regulated; major crypto market',
    lat: 35.9, lng: 127.8
  }
]

// Combined data
export const ALL_JURISDICTIONS: JurisdictionData[] = [
  ...BLACK_LIST,
  ...GREY_LIST,
  ...RECENTLY_REMOVED,
  ...COMPLIANT
]

// Helper functions
export function getJurisdiction(code: string): JurisdictionData | undefined {
  return ALL_JURISDICTIONS.find(j => j.code === code)
}

export function getStatusColor(status: FATFStatus): string {
  switch (status) {
    case 'black_list': return '#ef4444'
    case 'grey_list': return '#f59e0b'
    case 'compliant': return '#22c55e'
    default: return '#6b7280'
  }
}

export function getStatusLabel(status: FATFStatus): string {
  switch (status) {
    case 'black_list': return 'Black List (Call for Action)'
    case 'grey_list': return 'Grey List (Increased Monitoring)'
    case 'compliant': return 'Compliant'
    default: return 'Unknown'
  }
}

export function getCryptoStatusLabel(status: CryptoStatus): string {
  switch (status) {
    case 'legal': return 'Legal & Regulated'
    case 'restricted': return 'Restricted'
    case 'banned': return 'Banned'
    case 'unregulated': return 'Unregulated'
    default: return 'Unknown'
  }
}
