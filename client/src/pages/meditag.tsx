import { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar";
import DashboardHeader from "@/components/dashboard-header";
import TagBadge from "@/components/tag-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Star, MapPin, Network, UserCheck, Users, Activity, Calendar, BarChart4 } from "lucide-react";

// Mock data for visualization examples (to be replaced by real data later)
const regionDistribution = [
  { region: "Northeast", count: 358 },
  { region: "Southeast", count: 284 },
  { region: "Midwest", count: 321 },
  { region: "Southwest", count: 170 },
  { region: "West", count: 244 },
  { region: "Northwest", count: 98 }
];

const specialtyDistribution = [
  { specialty: "Cardiology", count: 156 },
  { specialty: "Oncology", count: 142 },
  { specialty: "Neurology", count: 98 },
  { specialty: "General Practice", count: 287 },
  { specialty: "Pediatrics", count: 112 },
  { specialty: "Orthopedics", count: 78 },
  { specialty: "Other Specialties", count: 385 }
];

// HCP View mode
type ViewMode = 'basic' | 'detailed';

// Get color for influence score
const getInfluenceColor = (score: number): string => {
  if (score >= 90) return "text-emerald-400";
  if (score >= 75) return "text-blue-400";
  if (score >= 60) return "text-amber-400";
  return "text-gray-400";
};

// Component to display arrays of strings nicely
const ArrayDisplay = ({ items }: { items: string[] }) => {
  return (
    <div className="flex flex-wrap gap-1">
      {items.map((item, i) => (
        <Badge key={i} variant="outline" className="text-xs bg-background-lighter">
          {item}
        </Badge>
      ))}
    </div>
  );
};

const MediTag = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedHcp, setSelectedHcp] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('basic');
  const [activeTab, setActiveTab] = useState('database');
  const { toast } = useToast();
  
  // Fetch HCP data
  const { data: hcpData, isLoading, error } = useQuery({
    queryKey: ['/api/hcp'],
    queryFn: async () => {
      const response = await fetch('/api/hcp');
      if (!response.ok) {
        throw new Error('Failed to fetch HCP data');
      }
      return response.json();
    }
  });
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleHcpRowClick = (id: number) => {
    setSelectedHcp(id === selectedHcp ? null : id);
  };
  
  // Function to get tag color based on tag text
  const getTagColor = (tag: string): string => {
    const tagMap: {[key: string]: string} = {
      'Early Adopter': 'green',
      'Evidence Driven': 'blue',
      'Patient Focused': 'purple',
      'Balanced': 'indigo',
      'Cost Conscious': 'amber',
      'Conservative': 'red'
    };
    
    return tagMap[tag] || 'gray';
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto bg-background-dark">
        <DashboardHeader title="MediTag Engine" />
        
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-1">MediTag Engine</h2>
            <p className="text-gray-400">Precision segmentation and profiling of healthcare providers</p>
          </div>
          
          <Tabs 
            defaultValue="database" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="mb-8"
          >
            <TabsList className="mb-6">
              <TabsTrigger value="database">HCP Database</TabsTrigger>
              <TabsTrigger value="analytics">Segmentation Analytics</TabsTrigger>
              <TabsTrigger value="geographic">Geographic Mapping</TabsTrigger>
              <TabsTrigger value="influence">Influence Network</TabsTrigger>
            </TabsList>
            
            <TabsContent value="database">
              {/* Upload Section */}
              <div className="bg-background-card rounded-xl shadow-lg overflow-hidden mb-8 p-6">
                <h3 className="text-lg font-semibold mb-4">Upload HCP Data</h3>
                <div 
                  className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <span className="material-icons text-3xl text-gray-500 mb-2">cloud_upload</span>
                  <p className="mb-4 text-gray-400">
                    {selectedFile 
                      ? `Selected: ${selectedFile.name}`
                      : "Drag and drop your CSV file here, or click to browse"
                    }
                  </p>
                  <input 
                    type="file" 
                    id="fileUpload" 
                    className="hidden" 
                    accept=".csv"
                    onChange={handleFileUpload}
                  />
                  <label 
                    htmlFor="fileUpload" 
                    className="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg transition cursor-pointer inline-block"
                  >
                    Upload CSV
                  </label>
                  <p className="mt-4 text-xs text-gray-500">Maximum file size: 10MB</p>
                </div>
              </div>
              
              {/* View mode selector */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <Label>View Mode:</Label>
                  <div className="flex rounded-md overflow-hidden">
                    <button 
                      className={`px-3 py-1 text-sm ${viewMode === 'basic' ? 'bg-primary text-white' : 'bg-background-card text-gray-400'}`}
                      onClick={() => setViewMode('basic')}
                    >
                      Basic Fields
                    </button>
                    <button 
                      className={`px-3 py-1 text-sm ${viewMode === 'detailed' ? 'bg-primary text-white' : 'bg-background-card text-gray-400'}`}
                      onClick={() => setViewMode('detailed')}
                    >
                      Enhanced Profile
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <span className="material-icons text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2">search</span>
                    <input 
                      type="text" 
                      placeholder="Search HCPs..." 
                      className="bg-background-dark text-white pl-10 pr-4 py-2 rounded-lg text-sm border border-gray-700 focus:outline-none focus:border-primary"
                    />
                  </div>
                  <button className="bg-background-dark hover:bg-background-lighter text-white px-3 py-2 rounded-lg text-sm flex items-center space-x-1 transition">
                    <span className="material-icons text-sm">filter_list</span>
                    <span>Filter</span>
                  </button>
                </div>
              </div>
              
              {/* Data Table */}
              <div className="bg-background-card rounded-xl shadow-lg overflow-hidden mb-8">
                {isLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : error ? (
                  <div className="p-6 text-center text-red-500">
                    Error loading HCP data. Please try again.
                  </div>
                ) : (
                  <>
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr className="bg-background-lighter">
                            <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">Name</th>
                            <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">Specialty</th>
                            {viewMode === 'detailed' && (
                              <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">Sub-Specialty</th>
                            )}
                            <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">Prescribing</th>
                            {viewMode === 'detailed' && (
                              <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">Location</th>
                            )}
                            <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">Engagement</th>
                            {viewMode === 'detailed' && (
                              <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">KOL Status</th>
                            )}
                            <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">Tag</th>
                            <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {hcpData?.map((hcp: any) => (
                            <tr 
                              key={hcp.id} 
                              className={`border-b border-gray-800 hover:bg-background-lighter cursor-pointer ${selectedHcp === hcp.id ? 'bg-background-lighter' : ''}`}
                              onClick={() => handleHcpRowClick(hcp.id)}
                            >
                              <td className="py-3 px-4 font-medium">{hcp.name}</td>
                              <td className="py-3 px-4">{hcp.specialty}</td>
                              {viewMode === 'detailed' && (
                                <td className="py-3 px-4">{hcp.subSpecialty || '—'}</td>
                              )}
                              <td className="py-3 px-4">{hcp.prescribingPattern}</td>
                              {viewMode === 'detailed' && (
                                <td className="py-3 px-4">
                                  <div className="flex items-center">
                                    <MapPin className="h-3 w-3 mr-1 text-gray-500" />
                                    {hcp.location || hcp.region || '—'}
                                  </div>
                                </td>
                              )}
                              <td className="py-3 px-4">
                                <div className="flex items-center">
                                  <span>{hcp.engagementScore}</span>
                                  <span className="text-xs text-gray-500 ml-1">/100</span>
                                </div>
                              </td>
                              {viewMode === 'detailed' && (
                                <td className="py-3 px-4">
                                  {hcp.isKol ? (
                                    <div className="flex items-center text-amber-400">
                                      <Star className="h-3 w-3 mr-1 fill-amber-400" />
                                      <span>KOL</span>
                                    </div>
                                  ) : '—'}
                                </td>
                              )}
                              <td className="py-3 px-4">
                                <TagBadge
                                  label={hcp.tag}
                                  color={getTagColor(hcp.tag) as any}
                                  active={true}
                                />
                              </td>
                              <td className="py-3 px-4">
                                <button className="text-primary hover:text-primary/80 mr-2">
                                  <span className="material-icons text-sm">edit</span>
                                </button>
                                <button className="text-gray-400 hover:text-white">
                                  <span className="material-icons text-sm">more_vert</span>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    {/* HCP Details Panel (shown when an HCP is selected) */}
                    {selectedHcp !== null && hcpData && (
                      <div className="p-4 border-t border-gray-800 bg-background-lighter">
                        {(() => {
                          const hcp = hcpData.find((h: any) => h.id === selectedHcp);
                          if (!hcp) return null;
                          
                          return (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {/* Profile Section */}
                              <Card className="bg-background-card border-gray-800">
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-md">{hcp.name}</CardTitle>
                                  <CardDescription>{hcp.specialty}{hcp.subSpecialty ? ` (${hcp.subSpecialty})` : ''}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2 pt-0 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Email:</span>
                                    <span>{hcp.email}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Organization:</span>
                                    <span>{hcp.organization}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Hospital:</span>
                                    <span>{hcp.hospitalAffiliation || '—'}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Academic:</span>
                                    <span>{hcp.academicAffiliation || '—'}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Tag:</span>
                                    <TagBadge
                                      label={hcp.tag}
                                      color={getTagColor(hcp.tag) as any}
                                      active={true}
                                    />
                                  </div>
                                </CardContent>
                              </Card>
                              
                              {/* Location & Demographics */}
                              <Card className="bg-background-card border-gray-800">
                                <CardHeader className="pb-2">
                                  <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    <CardTitle className="text-md">Location & Demographics</CardTitle>
                                  </div>
                                </CardHeader>
                                <CardContent className="space-y-2 pt-0 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Location:</span>
                                    <span>{hcp.location || '—'}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Region:</span>
                                    <span>{hcp.region || '—'}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Setting:</span>
                                    <span>{hcp.urbanRural || '—'}</span>
                                  </div>
                                  
                                  <div className="mt-3 pt-3 border-t border-gray-800">
                                    <span className="text-gray-400 block mb-2">Patient Demographics:</span>
                                    
                                    <div className="space-y-2">
                                      <div>
                                        <span className="text-gray-500 text-xs">Age Groups:</span>
                                        {hcp.patientAgeGroup ? (
                                          <ArrayDisplay items={hcp.patientAgeGroup} />
                                        ) : <span className="text-gray-600">—</span>}
                                      </div>
                                      
                                      <div>
                                        <span className="text-gray-500 text-xs">Conditions:</span>
                                        {hcp.patientConditions ? (
                                          <ArrayDisplay items={hcp.patientConditions} />
                                        ) : <span className="text-gray-600">—</span>}
                                      </div>
                                      
                                      <div>
                                        <span className="text-gray-500 text-xs">Insurance:</span>
                                        {hcp.patientInsuranceTypes ? (
                                          <ArrayDisplay items={hcp.patientInsuranceTypes} />
                                        ) : <span className="text-gray-600">—</span>}
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                              
                              {/* Influence & Engagement */}
                              <Card className="bg-background-card border-gray-800">
                                <CardHeader className="pb-2">
                                  <div className="flex items-center">
                                    <Network className="h-4 w-4 mr-2" />
                                    <CardTitle className="text-md">Influence & Engagement</CardTitle>
                                  </div>
                                </CardHeader>
                                <CardContent className="space-y-2 pt-0 text-sm">
                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Influence Score:</span>
                                    <span className={`text-lg font-semibold ${getInfluenceColor(hcp.influenceScore || 0)}`}>
                                      {hcp.influenceScore || '—'}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">KOL Status:</span>
                                    <span>
                                      {hcp.isKol ? (
                                        <Badge className="bg-amber-500/20 text-amber-400 hover:bg-amber-500/20">
                                          Key Opinion Leader
                                        </Badge>
                                      ) : 'Standard HCP'}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Publications:</span>
                                    <span>{hcp.publicationCount || '—'}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Speaking Events:</span>
                                    <span>{hcp.speakingEngagements || '—'} /year</span>
                                  </div>
                                  
                                  <div className="mt-3 pt-3 border-t border-gray-800">
                                    <span className="text-gray-400 block mb-2">Engagement Preferences:</span>
                                    
                                    <div className="grid grid-cols-2 gap-2">
                                      <div>
                                        <span className="text-gray-500 text-xs block">Contact Method:</span>
                                        <span>{hcp.preferredContactMethod || '—'}</span>
                                      </div>
                                      <div>
                                        <span className="text-gray-500 text-xs block">Contact Time:</span>
                                        <span>{hcp.preferredContactTime || '—'}</span>
                                      </div>
                                      <div>
                                        <span className="text-gray-500 text-xs block">Digital Engagement:</span>
                                        <span>{hcp.digitalEngagementLevel || '—'}</span>
                                      </div>
                                      <div>
                                        <span className="text-gray-500 text-xs block">Prescribing Pattern:</span>
                                        <span>{hcp.prescribingPattern}</span>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          );
                        })()}
                      </div>
                    )}
                    
                    <div className="p-4 flex justify-between items-center border-t border-gray-800">
                      <p className="text-sm text-gray-400">Showing {hcpData.length} of 1,258 entries</p>
                      <div className="flex space-x-1">
                        <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-background-lighter">
                          <span className="material-icons text-sm">chevron_left</span>
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-white">1</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-background-lighter">2</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-background-lighter">3</button>
                        <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-background-lighter">
                          <span className="material-icons text-sm">chevron_right</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="analytics">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card className="bg-background-card border-gray-800">
                  <CardHeader>
                    <div className="flex items-center">
                      <UserCheck className="h-5 w-5 mr-2" />
                      <CardTitle>Specialty Distribution</CardTitle>
                    </div>
                    <CardDescription>
                      HCP count by medical specialty
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {specialtyDistribution.map((item, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{item.specialty}</span>
                            <span className="text-gray-400">{item.count} HCPs</span>
                          </div>
                          <div className="h-2 bg-background-lighter rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary" 
                              style={{ width: `${(item.count / Math.max(...specialtyDistribution.map(i => i.count))) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-background-card border-gray-800">
                  <CardHeader>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2" />
                      <CardTitle>Regional Distribution</CardTitle>
                    </div>
                    <CardDescription>
                      Geographic concentration of HCPs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {regionDistribution.map((item, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{item.region}</span>
                            <span className="text-gray-400">{item.count} HCPs</span>
                          </div>
                          <div className="h-2 bg-background-lighter rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500" 
                              style={{ width: `${(item.count / Math.max(...regionDistribution.map(i => i.count))) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="bg-background-card border-gray-800">
                  <CardHeader>
                    <div className="flex items-center">
                      <Activity className="h-5 w-5 mr-2" />
                      <CardTitle>Engagement Levels</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center justify-center h-52">
                      <div className="relative w-36 h-36">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-2xl font-bold">65%</div>
                            <div className="text-sm text-gray-400">Engaged</div>
                          </div>
                        </div>
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#2b2d42"
                            strokeWidth="3"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="3"
                            strokeDasharray="65, 100"
                          />
                        </svg>
                      </div>
                      <div className="mt-4 text-sm text-gray-400">
                        815 of 1,258 HCPs actively engaged
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-background-card border-gray-800">
                  <CardHeader>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 mr-2" />
                      <CardTitle>KOL Distribution</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center justify-center h-52">
                      <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="flex flex-col items-center p-4 rounded-lg bg-background-lighter">
                          <span className="text-amber-400 text-3xl font-bold">127</span>
                          <span className="text-sm text-gray-400">Key Opinion Leaders</span>
                        </div>
                        <div className="flex flex-col items-center p-4 rounded-lg bg-background-lighter">
                          <span className="text-blue-500 text-3xl font-bold">10%</span>
                          <span className="text-sm text-gray-400">of Total HCPs</span>
                        </div>
                      </div>
                      <div className="mt-4 text-sm text-gray-400 text-center">
                        KOLs represent 48% of total prescribing volume
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-background-card border-gray-800">
                  <CardHeader>
                    <div className="flex items-center">
                      <BarChart4 className="h-5 w-5 mr-2" />
                      <CardTitle>Digital Engagement</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>High</span>
                          <span className="text-gray-400">328 HCPs</span>
                        </div>
                        <div className="h-2 bg-background-lighter rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-emerald-500" 
                            style={{ width: '26%' }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Medium</span>
                          <span className="text-gray-400">614 HCPs</span>
                        </div>
                        <div className="h-2 bg-background-lighter rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500" 
                            style={{ width: '49%' }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Low</span>
                          <span className="text-gray-400">316 HCPs</span>
                        </div>
                        <div className="h-2 bg-background-lighter rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gray-500" 
                            style={{ width: '25%' }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="geographic">
              <Card className="bg-background-card border-gray-800 mb-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2" />
                      <CardTitle>Geographic Distribution</CardTitle>
                    </div>
                    <div className="flex gap-2 text-sm">
                      <Badge variant="outline" className="bg-background-lighter">
                        <span className="h-2 w-2 rounded-full bg-primary mr-1"></span>
                        KOLs
                      </Badge>
                      <Badge variant="outline" className="bg-background-lighter">
                        <span className="h-2 w-2 rounded-full bg-blue-500 mr-1"></span>
                        High Volume
                      </Badge>
                      <Badge variant="outline" className="bg-background-lighter">
                        <span className="h-2 w-2 rounded-full bg-gray-500 mr-1"></span>
                        Other HCPs
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="h-[400px] flex items-center justify-center p-0">
                  <div className="text-center p-8 text-gray-400 border-2 border-dashed border-gray-800 m-6 rounded-lg w-full">
                    <MapPin className="h-8 w-8 mx-auto mb-4 text-gray-500" />
                    <p className="mb-2">Interactive map visualization would be displayed here</p>
                    <p className="text-sm text-gray-500">Implementation requires a mapping library integration like react-simple-maps or Mapbox</p>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-background-card border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-base">Urban vs. Rural Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Urban</span>
                          <span className="text-gray-400">782 HCPs</span>
                        </div>
                        <div className="h-2 bg-background-lighter rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: '62%' }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Suburban</span>
                          <span className="text-gray-400">371 HCPs</span>
                        </div>
                        <div className="h-2 bg-background-lighter rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500" 
                            style={{ width: '30%' }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Rural</span>
                          <span className="text-gray-400">105 HCPs</span>
                        </div>
                        <div className="h-2 bg-background-lighter rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-emerald-500" 
                            style={{ width: '8%' }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-background-card border-gray-800 md:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-base">Hospital Affiliation Density</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-background-lighter text-left text-xs">
                          <th className="py-2 px-4">Hospital Name</th>
                          <th className="py-2 px-4">Location</th>
                          <th className="py-2 px-4">Affiliated HCPs</th>
                          <th className="py-2 px-4">KOL %</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        <tr className="border-b border-gray-800">
                          <td className="py-2 px-4">Massachusetts General Hospital</td>
                          <td className="py-2 px-4">Boston, MA</td>
                          <td className="py-2 px-4">47</td>
                          <td className="py-2 px-4">32%</td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="py-2 px-4">Mayo Clinic</td>
                          <td className="py-2 px-4">Rochester, MN</td>
                          <td className="py-2 px-4">42</td>
                          <td className="py-2 px-4">45%</td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="py-2 px-4">Cleveland Clinic</td>
                          <td className="py-2 px-4">Cleveland, OH</td>
                          <td className="py-2 px-4">38</td>
                          <td className="py-2 px-4">40%</td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="py-2 px-4">Johns Hopkins Hospital</td>
                          <td className="py-2 px-4">Baltimore, MD</td>
                          <td className="py-2 px-4">36</td>
                          <td className="py-2 px-4">38%</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4">UCLA Medical Center</td>
                          <td className="py-2 px-4">Los Angeles, CA</td>
                          <td className="py-2 px-4">31</td>
                          <td className="py-2 px-4">29%</td>
                        </tr>
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="influence">
              <Card className="bg-background-card border-gray-800 mb-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Network className="h-5 w-5 mr-2" />
                      <CardTitle>Influence Network</CardTitle>
                    </div>
                    <Badge variant="outline" className="bg-background-lighter">
                      127 KOLs identified
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="h-[400px] flex items-center justify-center p-0">
                  <div className="text-center p-8 text-gray-400 border-2 border-dashed border-gray-800 m-6 rounded-lg w-full">
                    <Network className="h-8 w-8 mx-auto mb-4 text-gray-500" />
                    <p className="mb-2">Interactive network visualization would be displayed here</p>
                    <p className="text-sm text-gray-500">Implementation requires a graph visualization library like react-force-graph or vis.js</p>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-background-card border-gray-800">
                  <CardHeader>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      <CardTitle>Top Key Opinion Leaders</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-background-lighter text-left text-xs">
                          <th className="py-2 px-4">Name</th>
                          <th className="py-2 px-4">Specialty</th>
                          <th className="py-2 px-4">Influence Score</th>
                          <th className="py-2 px-4">Publications</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        <tr className="border-b border-gray-800">
                          <td className="py-2 px-4 font-medium">Dr. Sarah Chen</td>
                          <td className="py-2 px-4">Cardiology</td>
                          <td className="py-2 px-4 text-emerald-400">92</td>
                          <td className="py-2 px-4">47</td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="py-2 px-4 font-medium">Dr. Michael Lee</td>
                          <td className="py-2 px-4">Oncology</td>
                          <td className="py-2 px-4 text-emerald-400">94</td>
                          <td className="py-2 px-4">52</td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="py-2 px-4 font-medium">Dr. James Wilson</td>
                          <td className="py-2 px-4">Oncology</td>
                          <td className="py-2 px-4 text-blue-400">85</td>
                          <td className="py-2 px-4">32</td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="py-2 px-4 font-medium">Dr. Lisa Anderson</td>
                          <td className="py-2 px-4">Neurology</td>
                          <td className="py-2 px-4 text-blue-400">87</td>
                          <td className="py-2 px-4">41</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 font-medium">Dr. David Kim</td>
                          <td className="py-2 px-4">Endocrinology</td>
                          <td className="py-2 px-4 text-blue-400">83</td>
                          <td className="py-2 px-4">29</td>
                        </tr>
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
                
                <Card className="bg-background-card border-gray-800">
                  <CardHeader>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2" />
                      <CardTitle>Professional Associations</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>American Medical Association</span>
                          <span className="text-gray-400">734 HCPs</span>
                        </div>
                        <div className="h-2 bg-background-lighter rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: '58%' }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>American College of Physicians</span>
                          <span className="text-gray-400">412 HCPs</span>
                        </div>
                        <div className="h-2 bg-background-lighter rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500" 
                            style={{ width: '33%' }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>American Academy of Family Physicians</span>
                          <span className="text-gray-400">287 HCPs</span>
                        </div>
                        <div className="h-2 bg-background-lighter rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-indigo-500" 
                            style={{ width: '23%' }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>American College of Cardiology</span>
                          <span className="text-gray-400">156 HCPs</span>
                        </div>
                        <div className="h-2 bg-background-lighter rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-emerald-500" 
                            style={{ width: '12%' }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>American Society of Clinical Oncology</span>
                          <span className="text-gray-400">142 HCPs</span>
                        </div>
                        <div className="h-2 bg-background-lighter rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-amber-500" 
                            style={{ width: '11%' }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default MediTag;
