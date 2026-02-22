import { useState } from 'react'
import { Filter } from 'lucide-react'
import WorldMap from '../components/WorldMap'
import StatsCards from '../components/StatsCards'
import JurisdictionList from '../components/JurisdictionList'
import RiskChart from '../components/RiskChart'
import { 
  ALL_JURISDICTIONS, 
  BLACK_LIST, 
  GREY_LIST, 
  RECENTLY_REMOVED,
  COMPLIANT,
  type FATFStatus 
} from '../data/fatfData'

type FilterType = 'all' | FATFStatus

export default function Dashboard() {
  const [filter, setFilter] = useState<FilterType>('all')

  const filteredJurisdictions = filter === 'all' 
    ? ALL_JURISDICTIONS 
    : ALL_JURISDICTIONS.filter(j => j.fatfStatus === filter)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">FATF Compliance Dashboard</h1>
          <p className="text-gray-400 mt-1">
            Real-time FATF grey/black list status and crypto regulation worldwide
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value as FilterType)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All Jurisdictions</option>
            <option value="black_list">Black List Only</option>
            <option value="grey_list">Grey List Only</option>
            <option value="compliant">Compliant Only</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <StatsCards />

      {/* Map */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Global Overview</h2>
        <WorldMap jurisdictions={filteredJurisdictions} />
        
        {/* Legend */}
        <div className="flex justify-center space-x-6 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-sm text-gray-400">Black List</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-sm text-gray-400">Grey List</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm text-gray-400">Compliant</span>
          </div>
        </div>
      </div>

      {/* Charts & Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Chart */}
        <RiskChart 
          jurisdictions={[...BLACK_LIST, ...GREY_LIST]}
          title="Risk Scores by Jurisdiction"
        />

        {/* Recently Removed */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <h3 className="font-semibold text-lg mb-4">Recently Removed from Grey List</h3>
          <div className="space-y-4">
            {RECENTLY_REMOVED.map(j => (
              <div key={j.code} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getFlagEmoji(j.code)}</span>
                  <div>
                    <p className="font-medium">{j.name}</p>
                    <p className="text-sm text-gray-400">
                      Removed: {j.removalDate}
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-900/50 text-green-400 text-sm rounded-full">
                  ✓ Compliant
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Jurisdiction Lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <JurisdictionList 
          jurisdictions={BLACK_LIST} 
          title="Black List" 
          status="black_list"
        />
        <JurisdictionList 
          jurisdictions={GREY_LIST} 
          title="Grey List" 
          status="grey_list"
        />
        <JurisdictionList 
          jurisdictions={COMPLIANT} 
          title="Major Compliant" 
          status="compliant"
        />
      </div>
    </div>
  )
}

function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}
