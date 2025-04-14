import { useState } from "react";
import Sidebar from "@/components/sidebar";
import DashboardHeader from "@/components/dashboard-header";
import TagBadge from "@/components/tag-badge";

const MediTag = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
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

  const hcpData = [
    {
      name: "Dr. Sarah Chen",
      specialty: "Cardiology",
      prescribingPattern: "High Volume",
      engagementScore: "87/100",
      tag: { label: "Early Adopter", color: "green" }
    },
    {
      name: "Dr. James Wilson",
      specialty: "Oncology",
      prescribingPattern: "Medium Volume",
      engagementScore: "76/100",
      tag: { label: "Evidence Driven", color: "blue" }
    },
    {
      name: "Dr. Maria Rodriguez",
      specialty: "Neurology",
      prescribingPattern: "Low Volume",
      engagementScore: "62/100",
      tag: { label: "Patient Focused", color: "purple" }
    },
    {
      name: "Dr. Robert Johnson",
      specialty: "General Practice",
      prescribingPattern: "High Volume",
      engagementScore: "81/100",
      tag: { label: "Balanced", color: "indigo" }
    },
    {
      name: "Dr. Emily Chang",
      specialty: "Pediatrics",
      prescribingPattern: "Medium Volume",
      engagementScore: "74/100",
      tag: { label: "Patient Focused", color: "purple" }
    }
  ];

  return (
    <div className="h-screen flex flex-col md:flex-row bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto bg-background-dark">
        <DashboardHeader title="MediTag Engine" />
        
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-1">MediTag Engine</h2>
            <p className="text-gray-400">Segment and categorize healthcare providers</p>
          </div>
          
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
          
          {/* Data Table */}
          <div className="bg-background-card rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
              <h3 className="font-semibold">HCP Database</h3>
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
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-background-lighter">
                    <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">Name</th>
                    <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">Specialty</th>
                    <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">Prescribing Pattern</th>
                    <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">Engagement Score</th>
                    <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">Tag</th>
                    <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {hcpData.map((hcp, index) => (
                    <tr key={index} className="border-b border-gray-800 hover:bg-background-lighter">
                      <td className="py-3 px-4">{hcp.name}</td>
                      <td className="py-3 px-4">{hcp.specialty}</td>
                      <td className="py-3 px-4">{hcp.prescribingPattern}</td>
                      <td className="py-3 px-4">{hcp.engagementScore}</td>
                      <td className="py-3 px-4">
                        <TagBadge 
                          label={hcp.tag.label} 
                          color={hcp.tag.color as any} 
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
            
            <div className="p-4 flex justify-between items-center border-t border-gray-800">
              <p className="text-sm text-gray-400">Showing 5 of 1,258 entries</p>
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default MediTag;
