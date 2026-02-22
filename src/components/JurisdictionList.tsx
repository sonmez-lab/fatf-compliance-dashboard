import { Link } from 'react-router-dom'
import { ChevronRight, Shield, Ban, AlertTriangle } from 'lucide-react'
import { clsx } from 'clsx'
import type { JurisdictionData, FATFStatus } from '../data/fatfData'
import { getStatusColor, getStatusLabel, getCryptoStatusLabel } from '../data/fatfData'

interface JurisdictionListProps {
  jurisdictions: JurisdictionData[]
  title: string
  status: FATFStatus
}

export default function JurisdictionList({ jurisdictions, title, status }: JurisdictionListProps) {
  const statusIcon = {
    black_list: AlertTriangle,
    grey_list: Shield,
    compliant: Shield,
    unknown: Shield
  }[status]

  const Icon = statusIcon

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="px-4 py-3 border-b border-gray-700 flex items-center space-x-2">
        <Icon className="w-5 h-5" style={{ color: getStatusColor(status) }} />
        <h3 className="font-semibold text-lg">{title}</h3>
        <span className="text-sm text-gray-400">({jurisdictions.length})</span>
      </div>
      
      <div className="divide-y divide-gray-700 max-h-96 overflow-y-auto">
        {jurisdictions.map(jurisdiction => (
          <Link
            key={jurisdiction.code}
            to={`/country/${jurisdiction.code}`}
            className="flex items-center justify-between px-4 py-3 hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{getFlagEmoji(jurisdiction.code)}</span>
              <div>
                <p className="font-medium">{jurisdiction.name}</p>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <span>Risk: {jurisdiction.riskScore}</span>
                  <span>•</span>
                  <span>{getCryptoStatusLabel(jurisdiction.cryptoStatus)}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {jurisdiction.hasTravelRule && (
                <span className="px-2 py-0.5 bg-green-900/50 text-green-400 text-xs rounded">
                  Travel Rule
                </span>
              )}
              {jurisdiction.hasVASPLicensing && (
                <span className="px-2 py-0.5 bg-blue-900/50 text-blue-400 text-xs rounded">
                  VASP
                </span>
              )}
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

// Convert country code to flag emoji
function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}
