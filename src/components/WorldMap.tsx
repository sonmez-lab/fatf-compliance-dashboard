import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'
import type { JurisdictionData } from '../data/fatfData'
import { getStatusColor, getStatusLabel } from '../data/fatfData'
import 'leaflet/dist/leaflet.css'

interface WorldMapProps {
  jurisdictions: JurisdictionData[]
  onSelect?: (code: string) => void
}

function MapController() {
  const map = useMap()
  
  useEffect(() => {
    map.invalidateSize()
  }, [map])
  
  return null
}

export default function WorldMap({ jurisdictions, onSelect }: WorldMapProps) {
  const navigate = useNavigate()

  const handleClick = (code: string) => {
    if (onSelect) {
      onSelect(code)
    } else {
      navigate(`/country/${code}`)
    }
  }

  return (
    <div className="h-[500px] rounded-lg overflow-hidden border border-gray-700">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        minZoom={1}
        maxZoom={6}
        className="h-full w-full"
        style={{ background: '#1f2937' }}
      >
        <MapController />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {jurisdictions.map(jurisdiction => (
          <CircleMarker
            key={jurisdiction.code}
            center={[jurisdiction.lat, jurisdiction.lng]}
            radius={8}
            pathOptions={{
              fillColor: getStatusColor(jurisdiction.fatfStatus),
              fillOpacity: 0.8,
              color: '#fff',
              weight: 2
            }}
            eventHandlers={{
              click: () => handleClick(jurisdiction.code)
            }}
          >
            <Popup>
              <div className="text-gray-900">
                <h3 className="font-bold text-lg">{jurisdiction.name}</h3>
                <p className="text-sm">
                  Status: <span 
                    className="font-medium"
                    style={{ color: getStatusColor(jurisdiction.fatfStatus) }}
                  >
                    {getStatusLabel(jurisdiction.fatfStatus)}
                  </span>
                </p>
                <p className="text-sm">Risk Score: {jurisdiction.riskScore}/100</p>
                <button
                  onClick={() => handleClick(jurisdiction.code)}
                  className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View Details →
                </button>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  )
}
