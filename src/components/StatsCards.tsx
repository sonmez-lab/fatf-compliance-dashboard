import { AlertTriangle, AlertCircle, CheckCircle, TrendingDown } from 'lucide-react'
import { BLACK_LIST, GREY_LIST, RECENTLY_REMOVED, COMPLIANT } from '../data/fatfData'

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Black List */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Black List</p>
            <p className="text-3xl font-bold text-red-500">{BLACK_LIST.length}</p>
          </div>
          <div className="p-3 bg-red-500/20 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>
        </div>
        <p className="mt-2 text-xs text-gray-500">Call for Action</p>
      </div>

      {/* Grey List */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Grey List</p>
            <p className="text-3xl font-bold text-amber-500">{GREY_LIST.length}</p>
          </div>
          <div className="p-3 bg-amber-500/20 rounded-lg">
            <AlertCircle className="w-6 h-6 text-amber-500" />
          </div>
        </div>
        <p className="mt-2 text-xs text-gray-500">Increased Monitoring</p>
      </div>

      {/* Recently Removed */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Recently Removed</p>
            <p className="text-3xl font-bold text-green-500">{RECENTLY_REMOVED.length}</p>
          </div>
          <div className="p-3 bg-green-500/20 rounded-lg">
            <TrendingDown className="w-6 h-6 text-green-500" />
          </div>
        </div>
        <p className="mt-2 text-xs text-gray-500">Removed in 2024</p>
      </div>

      {/* Compliant */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Major Compliant</p>
            <p className="text-3xl font-bold text-green-500">{COMPLIANT.length}</p>
          </div>
          <div className="p-3 bg-green-500/20 rounded-lg">
            <CheckCircle className="w-6 h-6 text-green-500" />
          </div>
        </div>
        <p className="mt-2 text-xs text-gray-500">Key Economies</p>
      </div>
    </div>
  )
}
