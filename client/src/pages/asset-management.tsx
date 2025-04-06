import { useState } from "react";
import Sidebar from "@/components/sidebar";
import DashboardHeader from "@/components/dashboard-header";

interface Asset {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadDate: string;
  tags: string[];
}

const AssetManagement = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [assetName, setAssetName] = useState("");
  const [assetTags, setAssetTags] = useState("");
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setAssetName(e.target.files[0].name.split('.')[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0]);
      setAssetName(e.dataTransfer.files[0].name.split('.')[0]);
    }
  };

  const handleSubmit = () => {
    console.log("Uploading asset:", {
      file: selectedFile,
      name: assetName,
      tags: assetTags.split(',').map(tag => tag.trim())
    });
    // Reset form
    setSelectedFile(null);
    setAssetName("");
    setAssetTags("");
  };

  const assets: Asset[] = [
    {
      id: "1",
      name: "CardioX Clinical Efficacy Infographic",
      type: "Image",
      size: "2.4 MB",
      uploadedBy: "John Doe",
      uploadDate: "Today, 10:45 AM",
      tags: ["CardioX", "Clinical", "Infographic"]
    },
    {
      id: "2",
      name: "ImmunoPlus Product Overview",
      type: "PDF",
      size: "4.7 MB",
      uploadedBy: "Sarah Johnson",
      uploadDate: "Yesterday, 3:20 PM",
      tags: ["ImmunoPlus", "Overview", "Product"]
    },
    {
      id: "3",
      name: "NeuroCare Patient Education Video",
      type: "Video",
      size: "18.2 MB",
      uploadedBy: "Mike Reynolds",
      uploadDate: "Apr 4, 2023",
      tags: ["NeuroCare", "Patient", "Education"]
    },
    {
      id: "4",
      name: "DiabeShield Clinical Presentation",
      type: "PowerPoint",
      size: "8.5 MB",
      uploadedBy: "John Doe",
      uploadDate: "Apr 1, 2023",
      tags: ["DiabeShield", "Clinical", "Presentation"]
    }
  ];

  return (
    <div className="h-screen flex flex-col md:flex-row bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto bg-background-dark">
        <DashboardHeader title="Asset Management" />
        
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-1">Asset Management</h2>
            <p className="text-gray-400">Upload and manage assets for your HCP engagement</p>
          </div>
          
          {/* Upload Section */}
          <div className="bg-background-card rounded-xl shadow-lg overflow-hidden mb-8 p-6">
            <h3 className="text-lg font-semibold mb-4">Upload Asset</h3>
            <div 
              className={`border-2 border-dashed ${dragActive ? 'border-primary' : 'border-gray-700'} rounded-lg p-8 text-center mb-4`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <span className="material-icons text-3xl text-gray-500 mb-2">cloud_upload</span>
              <p className="mb-4 text-gray-400">
                {selectedFile 
                  ? `Selected: ${selectedFile.name} (${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)`
                  : "Drag and drop your file here, or click to browse"
                }
              </p>
              <input 
                type="file" 
                id="fileUpload" 
                className="hidden" 
                onChange={handleFileUpload}
              />
              <label 
                htmlFor="fileUpload" 
                className="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg transition cursor-pointer inline-block"
              >
                Select File
              </label>
              <p className="mt-4 text-xs text-gray-500">
                Supported formats: JPG, PNG, PDF, DOCX, PPTX, MP4, MP3, etc.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">Asset Name</label>
                <input 
                  type="text" 
                  className="w-full bg-background-dark text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-primary"
                  placeholder="Enter asset name"
                  value={assetName}
                  onChange={(e) => setAssetName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
                <input 
                  type="text" 
                  className="w-full bg-background-dark text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-primary"
                  placeholder="E.g. Product, Clinical, Education"
                  value={assetTags}
                  onChange={(e) => setAssetTags(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <button 
                className="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg transition"
                onClick={handleSubmit}
                disabled={!selectedFile || !assetName}
              >
                Upload Asset
              </button>
            </div>
          </div>
          
          {/* Asset Library */}
          <div className="bg-background-card rounded-xl shadow-lg overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
              <h3 className="font-semibold">Asset Library</h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <span className="material-icons text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2">search</span>
                  <input 
                    type="text" 
                    placeholder="Search assets..." 
                    className="bg-background-dark text-white pl-10 pr-4 py-2 rounded-lg text-sm border border-gray-700 focus:outline-none focus:border-primary"
                  />
                </div>
                <button className="bg-background-dark hover:bg-background-lighter text-white px-3 py-2 rounded-lg text-sm flex items-center space-x-1 transition">
                  <span className="material-icons text-sm">filter_list</span>
                  <span>Filter</span>
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
              {assets.map((asset) => (
                <div key={asset.id} className="bg-background-dark rounded-lg overflow-hidden border border-gray-700 hover:border-primary transition">
                  <div className="p-2 border-b border-gray-700 flex items-center">
                    <span className={`material-icons mr-2 ${
                      asset.type === 'PDF' ? 'text-red-400' : 
                      asset.type === 'Image' ? 'text-blue-400' :
                      asset.type === 'Video' ? 'text-purple-400' :
                      'text-orange-400'
                    }`}>
                      {asset.type === 'PDF' ? 'picture_as_pdf' : 
                       asset.type === 'Image' ? 'image' :
                       asset.type === 'Video' ? 'videocam' :
                       'slideshow'}
                    </span>
                    <span className="text-sm truncate flex-1">{asset.name}</span>
                  </div>
                  <div className="h-32 bg-background-lighter flex items-center justify-center">
                    <span className={`material-icons text-4xl ${
                      asset.type === 'PDF' ? 'text-red-400' : 
                      asset.type === 'Image' ? 'text-blue-400' :
                      asset.type === 'Video' ? 'text-purple-400' :
                      'text-orange-400'
                    }`}>
                      {asset.type === 'PDF' ? 'picture_as_pdf' : 
                       asset.type === 'Image' ? 'image' :
                       asset.type === 'Video' ? 'videocam' :
                       'slideshow'}
                    </span>
                  </div>
                  <div className="p-3">
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                      <span>{asset.size}</span>
                      <span>{asset.uploadDate}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {asset.tags.map((tag, index) => (
                        <span key={index} className="text-xs bg-background-lighter px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between">
                      <button className="text-primary hover:text-primary/80 text-sm flex items-center">
                        <span className="material-icons text-sm mr-1">visibility</span>
                        Preview
                      </button>
                      <button className="text-red-500 hover:text-red-400 text-sm">
                        <span className="material-icons text-sm">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 flex justify-between items-center border-t border-gray-800">
              <p className="text-sm text-gray-400">Showing 4 of 36 assets</p>
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

export default AssetManagement;
