import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { ALL_JURISDICTIONS, getStatusColor, getStatusLabel, getCryptoStatusLabel } from '../data/fatfData'
import type { JurisdictionData } from '../data/fatfData'

export default function Comparison() {
  const [selected, setSelected] = useState<string[]>(['US', 'TR', 'IR'])

  const addCountry = (code: string) => {
    if (!selected.includes(code) && selected.length < 5) {
      setSelected([...selected, code])
    }
  }

  const removeCountry = (code: string) => {
    setSelected(selected.filter(c => c !== code))
  }

  const selectedJurisdictions = selected
    .map(code => ALL_JURISDICTIONS.find(j => j.code === code))
    .filter((j): j is JurisdictionData => j !== undefined)

  const availableCountries = ALL_JURISDICTIONS.filter(j => !selected.includes(j.code))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Compare Jurisdictions</h1>
        <p className="text-gray-400 mt-1">
          Side-by-side comparison of FATF status and crypto regulation
        </p>
      </div>

      {/* Country selector */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
        <div className="flex flex-wrap items-center gap-2">
          {selected.map(code => {
            const j = ALL_JURISDICTIONS.find(x => x.code === code)
            if (!j) return null
            return (
              <div 
                key={code}
                className="flex items-center bg-gray-700 rounded-lg px-3 py-1.5"
              >
                <span className="mr-2">{getFlagEmoji(code)}</span>
                <span className="font-medium">{j.name}</span>
                <button 
                  onClick={() => removeCountry(code)}
                  className="ml-2 text-gray-400 hover:text-red-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )
          })}
          
          {selected.length < 5 && (
            <select
              onChange={(e) => {
                if (e.target.value) {
                  addCountry(e.target.value)
                  e.target.value = ''
                }
              }}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-1.5 text-sm"
            >
              <option value="">+ Add Country</option>
              {availableCountries.map(j => (
                <option key={j.code} value={j.code}>{j.name}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Comparison table */}
      {selectedJurisdictions.length > 0 && (
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-700">
                  <th className="text-left px-4 py-3 font-medium text-gray-400">Metric</th>
                  {selectedJurisdictions.map(j => (
                    <th key={j.code} className="text-center px-4 py-3 min-w-[150px]">
                      <div className="flex flex-col items-center">
                        <span className="text-2xl mb-1">{getFlagEmoji(j.code)}</span>
                        <span className="font-medium">{j.name}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <ComparisonRow
                  label="FATF Status"
                  values={selectedJurisdictions.map(j => ({
                    value: getStatusLabel(j.fatfStatus),
                    color: getStatusColor(j.fatfStatus)
                  }))}
                />
                <ComparisonRow
                  label="Risk Score"
                  values={selectedJurisdictions.map(j => ({
                    value: `${j.riskScore}/100`,
                    color: j.riskScore > 70 ? '#ef4444' : j.riskScore > 40 ? '#f59e0b' : '#22c55e'
                  }))}
                />
                <ComparisonRow
                  label="Basel AML Index"
                  values={selectedJurisdictions.map(j => ({
                    value: j.baselAmlIndex?.toFixed(2) || 'N/A'
                  }))}
                />
                <ComparisonRow
                  label="Crypto Status"
                  values={selectedJurisdictions.map(j => ({
                    value: getCryptoStatusLabel(j.cryptoStatus),
                    color: j.cryptoStatus === 'legal' ? '#22c55e' : j.cryptoStatus === 'banned' ? '#ef4444' : '#f59e0b'
                  }))}
                />
                <ComparisonRow
                  label="Travel Rule"
                  values={selectedJurisdictions.map(j => ({
                    value: j.hasTravelRule ? '✓ Yes' : '✗ No',
                    color: j.hasTravelRule ? '#22c55e' : '#6b7280'
                  }))}
                />
                <ComparisonRow
                  label="VASP Licensing"
                  values={selectedJurisdictions.map(j => ({
                    value: j.hasVASPLicensing ? '✓ Yes' : '✗ No',
                    color: j.hasVASPLicensing ? '#22c55e' : '#6b7280'
                  }))}
                />
                <ComparisonRow
                  label="Grey List Date"
                  values={selectedJurisdictions.map(j => ({
                    value: j.greyListDate || '-'
                  }))}
                />
                <ComparisonRow
                  label="Removal Date"
                  values={selectedJurisdictions.map(j => ({
                    value: j.removalDate || '-',
                    color: j.removalDate ? '#22c55e' : undefined
                  }))}
                />
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedJurisdictions.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          Select countries above to compare
        </div>
      )}
    </div>
  )
}

interface ComparisonRowProps {
  label: string
  values: Array<{ value: string; color?: string }>
}

function ComparisonRow({ label, values }: ComparisonRowProps) {
  return (
    <tr>
      <td className="px-4 py-3 text-gray-400">{label}</td>
      {values.map((v, i) => (
        <td 
          key={i} 
          className="px-4 py-3 text-center font-medium"
          style={{ color: v.color }}
        >
          {v.value}
        </td>
      ))}
    </tr>
  )
}

function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}
