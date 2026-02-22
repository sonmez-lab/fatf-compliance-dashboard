import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import type { JurisdictionData } from '../data/fatfData'
import { getStatusColor } from '../data/fatfData'

interface RiskChartProps {
  jurisdictions: JurisdictionData[]
  title: string
}

export default function RiskChart({ jurisdictions, title }: RiskChartProps) {
  const data = jurisdictions
    .slice(0, 15)
    .sort((a, b) => b.riskScore - a.riskScore)
    .map(j => ({
      name: j.code,
      fullName: j.name,
      score: j.riskScore,
      status: j.fatfStatus
    }))

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
      <h3 className="font-semibold text-lg mb-4">{title}</h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              type="number" 
              domain={[0, 100]}
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af' }}
            />
            <YAxis 
              type="category" 
              dataKey="name"
              stroke="#9ca3af"
              tick={{ fill: '#9ca3af' }}
              width={40}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload
                  return (
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-3">
                      <p className="font-medium">{data.fullName}</p>
                      <p className="text-sm text-gray-400">
                        Risk Score: <span className="text-white">{data.score}</span>
                      </p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar dataKey="score" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getStatusColor(entry.status)} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
