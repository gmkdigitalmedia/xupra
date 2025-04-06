import { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
} from 'react-simple-maps';

interface HcpLocation {
  id: number;
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
  location: string;
  specialty: string;
  tag: string;
  isKol: boolean;
  engagementScore: number;
  prescribingPattern: string;
}

// Sample data for demonstration
const sampleLocations: HcpLocation[] = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    coordinates: [-73.97, 40.78], // NYC
    location: "New York",
    specialty: "Cardiology",
    tag: "High Priority",
    isKol: true,
    engagementScore: 92,
    prescribingPattern: "High"
  },
  {
    id: 2,
    name: "Dr. Michael Lee",
    coordinates: [-118.24, 34.05], // LA
    location: "Los Angeles",
    specialty: "Oncology",
    tag: "Key Decision Maker",
    isKol: true,
    engagementScore: 94,
    prescribingPattern: "High"
  },
  {
    id: 3,
    name: "Dr. James Wilson",
    coordinates: [-77.03, 38.90], // Washington DC
    location: "Washington DC",
    specialty: "Oncology",
    tag: "High Prescriber",
    isKol: true,
    engagementScore: 85,
    prescribingPattern: "Medium"
  },
  {
    id: 4,
    name: "Dr. Lisa Anderson",
    coordinates: [-87.62, 41.88], // Chicago
    location: "Chicago",
    specialty: "Neurology",
    tag: "Potential KOL",
    isKol: true,
    engagementScore: 87,
    prescribingPattern: "High"
  },
  {
    id: 5,
    name: "Dr. David Kim",
    coordinates: [-122.33, 47.60], // Seattle
    location: "Seattle",
    specialty: "Endocrinology",
    tag: "Research Focus",
    isKol: true,
    engagementScore: 83,
    prescribingPattern: "Medium"
  },
  {
    id: 6,
    name: "Dr. Jennifer Park",
    coordinates: [-71.06, 42.36], // Boston
    location: "Boston",
    specialty: "Oncology",
    tag: "Academic",
    isKol: false,
    engagementScore: 76,
    prescribingPattern: "Medium"
  },
  {
    id: 7,
    name: "Dr. Robert Johnson",
    coordinates: [-95.37, 29.76], // Houston
    location: "Houston",
    specialty: "Cardiology",
    tag: "Private Practice",
    isKol: false,
    engagementScore: 79,
    prescribingPattern: "High"
  },
  {
    id: 8,
    name: "Dr. Emily Davis",
    coordinates: [-84.39, 33.75], // Atlanta
    location: "Atlanta",
    specialty: "Neurology",
    tag: "Early Adopter",
    isKol: false,
    engagementScore: 72,
    prescribingPattern: "Low"
  },
  {
    id: 9,
    name: "Dr. Thomas Brown",
    coordinates: [-112.07, 33.45], // Phoenix
    location: "Phoenix",
    specialty: "Endocrinology",
    tag: "Conservative",
    isKol: false,
    engagementScore: 68,
    prescribingPattern: "Low"
  },
  {
    id: 10,
    name: "Dr. Maria Garcia",
    coordinates: [-80.19, 25.76], // Miami
    location: "Miami",
    specialty: "Cardiology",
    tag: "Digital Savvy",
    isKol: false,
    engagementScore: 75,
    prescribingPattern: "Medium"
  }
];

// Get marker size based on HCP attributes
const getMarkerSize = (hcp: HcpLocation): number => {
  // Scale based on engagement score, KOLs get a bonus
  const baseSize = (hcp.engagementScore / 10) * 0.7;
  const kolBonus = hcp.isKol ? 0.5 : 0;
  return baseSize + kolBonus;
};

// Get marker color based on HCP attributes
const getMarkerColor = (hcp: HcpLocation): string => {
  // Color based on specialty and KOL status
  if (hcp.isKol) {
    return "#10b981"; // Emerald-500
  }
  
  switch (hcp.specialty) {
    case "Cardiology": 
      return "#3b82f6"; // Blue-500
    case "Oncology": 
      return "#8b5cf6"; // Violet-500
    case "Neurology": 
      return "#ec4899"; // Pink-500
    case "Endocrinology": 
      return "#f59e0b"; // Amber-500
    default: 
      return "#6b7280"; // Gray-500
  }
};

export function GeographicMap() {
  const [hoveredHcp, setHoveredHcp] = useState<HcpLocation | null>(null);
  const [position, setPosition] = useState<{ coordinates: [number, number], zoom: number }>({
    coordinates: [-98, 40], // Center of USA approximately
    zoom: 3.5
  });

  return (
    <div className="relative w-full h-full">
      <ComposableMap
        projection="geoAlbersUsa"
        projectionConfig={{ scale: 800 }}
        className="bg-slate-900 rounded-md"
      >
        <ZoomableGroup
          center={position.coordinates}
          zoom={position.zoom}
          onMoveEnd={(position: any) => setPosition(position as { coordinates: [number, number], zoom: number })}
        >
          {/* Using a simple placeholder for the geographies */}
          <g>
            <path
              d="M215.5,100 L350,100 L350,200 L215.5,200 Z"
              fill="#1e293b" // Slate-800
              stroke="#0f172a" // Slate-900
              strokeWidth={0.5}
            />
            <path
              d="M100,120 L215.5,120 L215.5,220 L100,220 Z"
              fill="#1e293b" // Slate-800
              stroke="#0f172a" // Slate-900
              strokeWidth={0.5}
            />
            <path
              d="M350,120 L450,120 L450,180 L350,180 Z"
              fill="#1e293b" // Slate-800
              stroke="#0f172a" // Slate-900
              strokeWidth={0.5}
            />
          </g>
          
          {sampleLocations.map(hcp => (
            <Marker 
              key={hcp.id} 
              coordinates={hcp.coordinates}
              onMouseEnter={() => setHoveredHcp(hcp)}
              onMouseLeave={() => setHoveredHcp(null)}
            >
              <circle
                r={getMarkerSize(hcp)}
                fill={getMarkerColor(hcp)}
                stroke="#f1f5f9" // Slate-100
                strokeWidth={0.5}
                opacity={0.8}
              />
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
      
      {hoveredHcp && (
        <div className="absolute bottom-4 left-4 bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-lg max-w-xs">
          <div className="text-white font-medium">{hoveredHcp.name}</div>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-xs text-slate-300">{hoveredHcp.location}</span>
            <span className="text-xs px-1.5 py-0.5 bg-slate-700 rounded text-slate-300">{hoveredHcp.specialty}</span>
            {hoveredHcp.isKol && (
              <span className="text-xs px-1.5 py-0.5 bg-emerald-800 rounded text-emerald-100">KOL</span>
            )}
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-slate-400">Engagement:</span>
              <span className="ml-1 text-emerald-400">{hoveredHcp.engagementScore}</span>
            </div>
            <div>
              <span className="text-slate-400">Prescribing:</span>
              <span className="ml-1 text-blue-400">{hoveredHcp.prescribingPattern}</span>
            </div>
            <div className="col-span-2">
              <span className="text-slate-400">Tag:</span>
              <span className="ml-1 text-amber-400">{hoveredHcp.tag}</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="absolute top-2 right-2 bg-slate-900 bg-opacity-80 p-2 rounded">
        <div className="text-xs text-white mb-1">Specialty</div>
        <div className="grid grid-cols-1 gap-1.5">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-emerald-500 mr-1.5"></div>
            <span className="text-xs text-white">KOL</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-1.5"></div>
            <span className="text-xs text-white">Cardiology</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-violet-500 mr-1.5"></div>
            <span className="text-xs text-white">Oncology</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-pink-500 mr-1.5"></div>
            <span className="text-xs text-white">Neurology</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-amber-500 mr-1.5"></div>
            <span className="text-xs text-white">Endocrinology</span>
          </div>
        </div>
      </div>
    </div>
  );
}