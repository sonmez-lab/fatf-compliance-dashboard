import { ArrowRight, ArrowDown, ArrowUp } from 'lucide-react'
import { BLACK_LIST, GREY_LIST, RECENTLY_REMOVED } from '../data/fatfData'

interface TimelineEvent {
  date: string
  country: string
  code: string
  action: 'added_grey' | 'added_black' | 'removed' | 'upgraded'
  details?: string
}

// Historical timeline data
const TIMELINE_EVENTS: TimelineEvent[] = [
  // 2024 events
  { date: '2024-10-01', country: 'Bulgaria', code: 'BG', action: 'added_grey', details: 'First EU member added in recent years' },
  { date: '2024-06-28', country: 'Turkey', code: 'TR', action: 'removed', details: 'Completed action plan after 3 years' },
  { date: '2024-06-28', country: 'Jamaica', code: 'JM', action: 'removed' },
  { date: '2024-06-01', country: 'Venezuela', code: 'VE', action: 'added_grey' },
  { date: '2024-02-23', country: 'United Arab Emirates', code: 'AE', action: 'removed', details: 'Major crypto hub cleared' },
  { date: '2024-02-01', country: 'Kenya', code: 'KE', action: 'added_grey' },
  
  // 2023 events
  { date: '2023-06-01', country: 'Vietnam', code: 'VN', action: 'added_grey' },
  { date: '2023-02-01', country: 'Nigeria', code: 'NG', action: 'added_grey', details: 'Despite major crypto adoption' },
  { date: '2023-02-01', country: 'Cameroon', code: 'CM', action: 'added_grey' },
  
  // 2022 events
  { date: '2022-10-01', country: 'Myanmar', code: 'MM', action: 'added_black', details: 'Post-coup escalation' },
  { date: '2022-10-01', country: 'DR Congo', code: 'CD', action: 'added_grey' },
  { date: '2022-10-01', country: 'Mozambique', code: 'MZ', action: 'added_grey' },
  { date: '2022-03-01', country: 'United Arab Emirates', code: 'AE', action: 'added_grey' },
  { date: '2022-02-01', country: 'Tanzania', code: 'TZ', action: 'added_grey' },
  
  // 2021 events
  { date: '2021-10-01', country: 'Turkey', code: 'TR', action: 'added_grey', details: 'Strategic deficiencies identified' },
  { date: '2021-10-01', country: 'Mali', code: 'ML', action: 'added_grey' },
  { date: '2021-06-01', country: 'South Sudan', code: 'SS', action: 'added_grey' },
  { date: '2021-06-01', country: 'Philippines', code: 'PH', action: 'added_grey' },
  { date: '2021-02-01', country: 'Senegal', code: 'SN', action: 'added_grey' },
  { date: '2021-02-01', country: 'Burkina Faso', code: 'BF', action: 'added_grey' },
  
  // 2020 events
  { date: '2020-10-01', country: 'Haiti', code: 'HT', action: 'added_grey' },
  { date: '2020-02-01', country: 'Iran', code: 'IR', action: 'upgraded', details: 'Upgraded to black list with counter-measures' },
  
  // Historical
  { date: '2011-02-01', country: 'North Korea', code: 'KP', action: 'added_black', details: 'Original black list member' },
  { date: '2010-02-01', country: 'Syria', code: 'SY', action: 'added_grey', details: 'Long-standing grey list member' },
  { date: '2010-02-01', country: 'Yemen', code: 'YE', action: 'added_grey', details: 'Long-standing grey list member' },
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export default function Timeline() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">FATF List Timeline</h1>
        <p className="text-gray-400 mt-1">
          Historical changes to grey and black list status
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 bg-gray-800 rounded-lg border border-gray-700 p-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <span className="text-sm text-gray-400">Added to Grey List</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-sm text-gray-400">Added to Black List</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-sm text-gray-400">Removed from List</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-purple-500" />
          <span className="text-sm text-gray-400">Upgraded (Grey → Black)</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-700" />

        <div className="space-y-6">
          {TIMELINE_EVENTS.map((event, index) => (
            <TimelineItem key={index} event={event} />
          ))}
        </div>
      </div>
    </div>
  )
}

function TimelineItem({ event }: { event: TimelineEvent }) {
  const getActionColor = () => {
    switch (event.action) {
      case 'added_grey': return 'bg-amber-500'
      case 'added_black': return 'bg-red-500'
      case 'removed': return 'bg-green-500'
      case 'upgraded': return 'bg-purple-500'
    }
  }

  const getActionLabel = () => {
    switch (event.action) {
      case 'added_grey': return 'Added to Grey List'
      case 'added_black': return 'Added to Black List'
      case 'removed': return 'Removed from List'
      case 'upgraded': return 'Upgraded to Black List'
    }
  }

  const getActionIcon = () => {
    switch (event.action) {
      case 'added_grey': return <ArrowRight className="w-4 h-4" />
      case 'added_black': return <ArrowDown className="w-4 h-4" />
      case 'removed': return <ArrowUp className="w-4 h-4" />
      case 'upgraded': return <ArrowDown className="w-4 h-4" />
    }
  }

  return (
    <div className="relative flex items-start pl-16">
      {/* Dot */}
      <div 
        className={`absolute left-6 w-4 h-4 rounded-full ${getActionColor()} border-2 border-gray-900`}
      />

      {/* Content */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 flex-1">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{getFlagEmoji(event.code)}</span>
            <div>
              <h3 className="font-semibold">{event.country}</h3>
              <div className="flex items-center space-x-2 text-sm">
                <span className={`px-2 py-0.5 rounded ${getActionColor()} text-white flex items-center space-x-1`}>
                  {getActionIcon()}
                  <span>{getActionLabel()}</span>
                </span>
              </div>
            </div>
          </div>
          <span className="text-sm text-gray-400">{formatDate(event.date)}</span>
        </div>
        
        {event.details && (
          <p className="mt-2 text-sm text-gray-400">{event.details}</p>
        )}
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

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long' 
  })
}
