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
  hospital?: string;
}

// Sample data for Japanese hospitals and HCPs
const sampleLocations: HcpLocation[] = [
  {
    id: 1,
    name: "鈴木 優子 医師",
    coordinates: [139.7594, 35.6850], // Tokyo
    location: "東京都 (Tokyo)",
    specialty: "Cardiology",
    tag: "High Priority",
    isKol: true,
    engagementScore: 92,
    prescribingPattern: "High",
    hospital: "東京大学医学部附属病院"
  },
  {
    id: 2,
    name: "佐藤 健太 医師",
    coordinates: [135.5023, 34.6937], // Osaka
    location: "大阪市 (Osaka)",
    specialty: "Oncology",
    tag: "Key Decision Maker",
    isKol: true,
    engagementScore: 94,
    prescribingPattern: "High",
    hospital: "大阪大学医学部附属病院"
  },
  {
    id: 3,
    name: "田中 誠 医師",
    coordinates: [130.4017, 33.5902], // Fukuoka
    location: "福岡市 (Fukuoka)",
    specialty: "Oncology",
    tag: "High Prescriber",
    isKol: true,
    engagementScore: 85,
    prescribingPattern: "Medium",
    hospital: "九州大学病院"
  },
  {
    id: 4,
    name: "渡辺 美咲 医師",
    coordinates: [136.9066, 35.1815], // Nagoya
    location: "名古屋市 (Nagoya)",
    specialty: "Neurology",
    tag: "Potential KOL",
    isKol: true,
    engagementScore: 87,
    prescribingPattern: "High",
    hospital: "名古屋大学医学部附属病院"
  },
  {
    id: 5,
    name: "伊藤 直樹 医師",
    coordinates: [141.3544, 43.0621], // Sapporo
    location: "札幌市 (Sapporo)",
    specialty: "Endocrinology",
    tag: "Research Focus",
    isKol: true,
    engagementScore: 83,
    prescribingPattern: "Medium",
    hospital: "北海道大学病院"
  },
  {
    id: 6,
    name: "山本 恵 医師",
    coordinates: [132.4553, 34.3853], // Hiroshima
    location: "広島市 (Hiroshima)",
    specialty: "Oncology",
    tag: "Academic",
    isKol: false,
    engagementScore: 76,
    prescribingPattern: "Medium",
    hospital: "広島大学病院"
  },
  {
    id: 7,
    name: "中村 隆太 医師",
    coordinates: [139.0261, 36.3219], // Takasaki
    location: "高崎市 (Takasaki)",
    specialty: "Cardiology",
    tag: "Private Practice",
    isKol: false,
    engagementScore: 79,
    prescribingPattern: "High",
    hospital: "高崎総合医療センター"
  },
  {
    id: 8,
    name: "小林 七海 医師",
    coordinates: [133.9250, 34.6619], // Okayama
    location: "岡山市 (Okayama)",
    specialty: "Neurology",
    tag: "Early Adopter",
    isKol: false,
    engagementScore: 72,
    prescribingPattern: "Low",
    hospital: "岡山大学病院"
  },
  {
    id: 9,
    name: "加藤 隆 医師",
    coordinates: [131.4229, 34.1861], // Shimonoseki
    location: "下関市 (Shimonoseki)",
    specialty: "Endocrinology",
    tag: "Conservative",
    isKol: false,
    engagementScore: 68,
    prescribingPattern: "Low",
    hospital: "関門医療センター"
  },
  {
    id: 10,
    name: "吉田 千代 医師",
    coordinates: [140.8694, 38.2682], // Sendai
    location: "仙台市 (Sendai)",
    specialty: "Cardiology",
    tag: "Digital Savvy",
    isKol: false,
    engagementScore: 75,
    prescribingPattern: "Medium",
    hospital: "東北大学病院"
  },
  {
    id: 11,
    name: "高橋 良介 医師",
    coordinates: [138.2529, 36.3381], // Matsumoto
    location: "松本市 (Matsumoto)",
    specialty: "Oncology",
    tag: "Early Adopter",
    isKol: false,
    engagementScore: 77,
    prescribingPattern: "Medium",
    hospital: "信州大学医学部附属病院"
  },
  {
    id: 12,
    name: "木村 春香 医師",
    coordinates: [127.6809, 26.2124], // Naha, Okinawa
    location: "那覇市 (Naha)",
    specialty: "Neurology",
    tag: "Digital Savvy",
    isKol: true,
    engagementScore: 85,
    prescribingPattern: "High",
    hospital: "琉球大学病院"
  },
  {
    id: 13,
    name: "斎藤 健一 医師",
    coordinates: [137.2167, 36.7054], // Toyama
    location: "富山市 (Toyama)",
    specialty: "Endocrinology",
    tag: "Research Focus",
    isKol: false,
    engagementScore: 78,
    prescribingPattern: "Medium",
    hospital: "富山大学附属病院"
  },
  {
    id: 14,
    name: "青木 裕子 医師",
    coordinates: [134.5573, 34.0400], // Tokushima
    location: "徳島市 (Tokushima)",
    specialty: "Cardiology",
    tag: "High Prescriber",
    isKol: true,
    engagementScore: 88,
    prescribingPattern: "High",
    hospital: "徳島大学病院"
  },
  {
    id: 15,
    name: "井上 慎太郎 医師",
    coordinates: [133.5435, 33.5597], // Kochi
    location: "高知市 (Kochi)",
    specialty: "Oncology",
    tag: "Conservative",
    isKol: false,
    engagementScore: 71,
    prescribingPattern: "Low",
    hospital: "高知大学医学部附属病院"
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
    coordinates: [137.0, 38.0], // Center of Japan approximately
    zoom: 4.0 // Increased zoom for better visibility of Japan
  });

  return (
    <div className="relative w-full h-full">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ 
          scale: 1500, // Increased scale for better visibility of Japan
          center: [137.0, 38.0] // Centered on Japan's mainland
        }}
        className="bg-gray-900 rounded-md"
      >
        <ZoomableGroup
          center={position.coordinates}
          zoom={position.zoom}
          onMoveEnd={(position: any) => setPosition(position as { coordinates: [number, number], zoom: number })}
          translateExtent={[[120, 20], [150, 50]]} // Limit panning to Japan region
        >
          {/* Japan map with prefectures */}
          <Geographies geography="https://raw.githubusercontent.com/deldersveld/topojson/master/countries/japan/japan-prefectures.json">
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#334155" 
                  stroke="#ffffff"
                  strokeWidth={1.5}
                />
              ))
            }
          </Geographies>
          
          {sampleLocations.map(hcp => (
            <Marker 
              key={hcp.id} 
              coordinates={hcp.coordinates}
              onMouseEnter={() => setHoveredHcp(hcp)}
              onMouseLeave={() => setHoveredHcp(null)}
            >
              <circle
                r={getMarkerSize(hcp) * 1.3} // Increased size
                fill={getMarkerColor(hcp)}
                stroke="#ffffff" // White for better visibility
                strokeWidth={1.0}
                opacity={0.9}
              />
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
      
      {hoveredHcp && (
        <div className="absolute bottom-4 left-4 bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-lg max-w-xs">
          <div className="text-white font-medium">{hoveredHcp.name}</div>
          {hoveredHcp.hospital && (
            <div className="text-xs text-slate-300 mt-1">{hoveredHcp.hospital}</div>
          )}
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