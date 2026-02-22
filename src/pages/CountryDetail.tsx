import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'
import { getJurisdiction, getStatusColor, getStatusLabel, getCryptoStatusLabel } from '../data/fatfData'

export default function CountryDetail() {
  const { code } = useParams<{ code: string }>()
  const jurisdiction = code ? getJurisdiction(code) : undefined

  if (!jurisdiction) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Country not found</p>
        <Link to="/" className="text-blue-400 hover:text-blue-300 mt-4 inline-block">
          ← Back to Dashboard
        </Link>
      </div>
    )
  }

  const StatusIcon = jurisdiction.fatfStatus === 'black_list' 
    ? AlertTriangle 
    : jurisdiction.fatfStatus === 'grey_list' 
      ? Shield 
      : CheckCircle

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link 
        to="/" 
        className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Link>

      {/* Header */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-5xl">{getFlagEmoji(jurisdiction.code)}</span>
            <div>
              <h1 className="text-3xl font-bold">{jurisdiction.name}</h1>
              <p className="text-gray-400">{jurisdiction.code}</p>
            </div>
          </div>
          
          <div 
            className="px-4 py-2 rounded-lg flex items-center space-x-2"
            style={{ backgroundColor: `${getStatusColor(jurisdiction.fatfStatus)}20` }}
          >
            <StatusIcon 
              className="w-5 h-5" 
              style={{ color: getStatusColor(jurisdiction.fatfStatus) }}
            />
            <span 
              className="font-medium"
              style={{ color: getStatusColor(jurisdiction.fatfStatus) }}
            >
              {getStatusLabel(jurisdiction.fatfStatus)}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          label="Risk Score" 
          value={`${jurisdiction.riskScore}/100`}
          color={jurisdiction.riskScore > 70 ? 'red' : jurisdiction.riskScore > 40 ? 'amber' : 'green'}
        />
        <StatCard 
          label="Basel AML Index" 
          value={jurisdiction.baselAmlIndex?.toFixed(2) || 'N/A'}
        />
        <StatCard 
          label="Crypto Status" 
          value={getCryptoStatusLabel(jurisdiction.cryptoStatus)}
          color={jurisdiction.cryptoStatus === 'legal' ? 'green' : jurisdiction.cryptoStatus === 'banned' ? 'red' : 'amber'}
        />
        <StatCard 
          label="Travel Rule" 
          value={jurisdiction.hasTravelRule ? 'Implemented' : 'Not Implemented'}
          color={jurisdiction.hasTravelRule ? 'green' : 'gray'}
        />
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FATF Status */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h2 className="text-xl font-semibold mb-4">FATF Status</h2>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm text-gray-400">Current Status</dt>
              <dd className="font-medium" style={{ color: getStatusColor(jurisdiction.fatfStatus) }}>
                {getStatusLabel(jurisdiction.fatfStatus)}
              </dd>
            </div>
            
            {jurisdiction.greyListDate && (
              <div>
                <dt className="text-sm text-gray-400">Added to Grey List</dt>
                <dd className="font-medium">{jurisdiction.greyListDate}</dd>
              </div>
            )}
            
            {jurisdiction.blackListDate && (
              <div>
                <dt className="text-sm text-gray-400">Added to Black List</dt>
                <dd className="font-medium">{jurisdiction.blackListDate}</dd>
              </div>
            )}
            
            {jurisdiction.removalDate && (
              <div>
                <dt className="text-sm text-gray-400">Removed from List</dt>
                <dd className="font-medium text-green-400">{jurisdiction.removalDate}</dd>
              </div>
            )}
            
            {jurisdiction.notes && (
              <div>
                <dt className="text-sm text-gray-400">Notes</dt>
                <dd className="text-gray-300">{jurisdiction.notes}</dd>
              </div>
            )}
          </dl>
        </div>

        {/* Crypto Regulation */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h2 className="text-xl font-semibold mb-4">Crypto Regulation</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-gray-700">
              <span className="text-gray-400">Crypto Legal Status</span>
              <span className="font-medium">{getCryptoStatusLabel(jurisdiction.cryptoStatus)}</span>
            </div>
            
            <div className="flex items-center justify-between py-2 border-b border-gray-700">
              <span className="text-gray-400">Travel Rule</span>
              <StatusBadge active={jurisdiction.hasTravelRule} />
            </div>
            
            <div className="flex items-center justify-between py-2 border-b border-gray-700">
              <span className="text-gray-400">VASP Licensing</span>
              <StatusBadge active={jurisdiction.hasVASPLicensing} />
            </div>
          </div>
        </div>
      </div>

      {/* Risk Assessment */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h2 className="text-xl font-semibold mb-4">Risk Assessment</h2>
        
        <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-500"
            style={{ 
              width: `${jurisdiction.riskScore}%`,
              backgroundColor: jurisdiction.riskScore > 70 ? '#ef4444' : jurisdiction.riskScore > 40 ? '#f59e0b' : '#22c55e'
            }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-400">
          <span>Low Risk (0)</span>
          <span>High Risk (100)</span>
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, color = 'gray' }: { label: string; value: string; color?: string }) {
  const colorClasses = {
    red: 'text-red-400',
    amber: 'text-amber-400',
    green: 'text-green-400',
    gray: 'text-gray-300'
  }

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
      <p className="text-sm text-gray-400">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${colorClasses[color as keyof typeof colorClasses] || colorClasses.gray}`}>
        {value}
      </p>
    </div>
  )
}

function StatusBadge({ active }: { active: boolean }) {
  return active ? (
    <span className="flex items-center text-green-400">
      <CheckCircle className="w-4 h-4 mr-1" />
      Yes
    </span>
  ) : (
    <span className="flex items-center text-gray-500">
      <XCircle className="w-4 h-4 mr-1" />
      No
    </span>
  )
}

function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}
