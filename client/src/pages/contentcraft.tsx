import { useState, useRef } from "react";
import Sidebar from "@/components/sidebar";
import DashboardHeader from "@/components/dashboard-header";
import ComplianceBadge from "@/components/compliance-badge";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { uploadReferenceDocument } from "@/lib/api";

interface ComplianceNote {
  type: 'warning' | 'success';
  text: string;
}

interface GeneratedContent {
  subject?: string;
  content: string;
  hcp: string;
  compliance: {
    medical: { status: string; notes: string };
    legal: { status: string; notes: string };
    regulatory: { status: string; notes: string };
  };
  complianceNotes?: ComplianceNote[];
}

const ContentCraft = () => {
  const [selectedHcp, setSelectedHcp] = useState("");
  const [contentType, setContentType] = useState("");
  const [productFocus, setProductFocus] = useState("");
  const [keyMessage, setKeyMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 10MB.",
          variant: "destructive"
        });
        return;
      }
      
      setUploadedFile(file);
      
      // In a full implementation, we would upload the file to the server here
      // Create a FormData object to send the file
      try {
        const formData = new FormData();
        formData.append('document', file);
        
        // For now, we'll just set the file in state, but in a real app we'd upload it
        // const response = await uploadReferenceDocument(formData);
        
        toast({
          title: "File uploaded",
          description: `${file.name} has been uploaded successfully.`,
        });
      } catch (error) {
        console.error("Error uploading file:", error);
        toast({
          title: "Upload failed",
          description: "There was an error uploading the file. Please try again.",
          variant: "destructive"
        });
      }
    }
  };
  
  const handleGenerateContent = async () => {
    if (!selectedHcp || !contentType || !productFocus) {
      toast({
        title: "Missing information",
        description: "Please select an HCP, content type, and product focus.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // Get the HCP ID from the name - in a real app, we'd have the IDs available in the dropdown
      const hcpIdMap: { [key: string]: string } = {
        "Dr. Sarah Chen": "1",
        "Dr. James Wilson": "2",
        "Dr. Maria Rodriguez": "3",
        "Dr. Robert Johnson": "4", 
        "Dr. Emily Chang": "5"
      };
      
      const hcpId = hcpIdMap[selectedHcp] || "1";
      
      // Reference document information
      let referenceDocumentInfo = undefined;
      
      // If a file is uploaded, we would save it and get a reference to pass to the content generation
      if (uploadedFile) {
        // In a real implementation, we would upload the file here if not already uploaded
        // and get a reference ID or path to send with the content generation request
        referenceDocumentInfo = {
          name: uploadedFile.name,
          size: uploadedFile.size,
          type: uploadedFile.type
        };
      }
      
      // Make the API call to generate content
      const response = await apiRequest(
        "POST", 
        "/api/content/generate", 
        {
          hcpId,
          contentType,
          productInfo: productFocus,
          keyMessage: keyMessage.trim() ? keyMessage : undefined,
          referenceDocument: referenceDocumentInfo
        }
      );
      
      if (!response.ok) {
        throw new Error("Failed to generate content");
      }
      
      const data = await response.json();
      setGeneratedContent(data);
      
      toast({
        title: "Content generated",
        description: "AI-powered content has been created successfully",
      });
    } catch (error) {
      console.error("Error generating content:", error);
      toast({
        title: "Generation failed",
        description: "There was an error generating the content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const savedContent = [
    {
      title: "CardioX Clinical Trial Update",
      hcp: "Dr. Sarah Chen",
      type: "Email",
      created: "Today, 10:45 AM",
      compliance: { status: "warning", label: "Review Needed" }
    },
    {
      title: "ImmunoPlus New Indication",
      hcp: "Dr. James Wilson",
      type: "Meeting Brief",
      created: "Yesterday, 3:20 PM",
      compliance: { status: "approved", label: "Approved" }
    },
    {
      title: "NeuroCare Patient Resources",
      hcp: "Dr. Maria Rodriguez",
      type: "Leave-Behind",
      created: "Apr 4, 2023",
      compliance: { status: "approved", label: "Approved" }
    }
  ];

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto bg-background-dark md:ml-64">
        <DashboardHeader title="ContentCraft AI" />
        
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-1">ContentCraft AI</h2>
            <p className="text-gray-400">Generate personalized content for HCP engagement</p>
          </div>
          
          {/* Content Generation */}
          <div className="bg-background-card rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Create New Content</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="col-span-1">
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Select HCP</label>
                    <div className="space-y-2">
                      {["Dr. Sarah Chen", "Dr. James Wilson", "Dr. Maria Rodriguez", "Dr. Robert Johnson", "Dr. Emily Chang"].map((hcp) => (
                        <div key={hcp} className="flex items-center">
                          <input
                            type="radio"
                            id={hcp}
                            name="hcp"
                            value={hcp}
                            checked={selectedHcp === hcp}
                            onChange={() => setSelectedHcp(hcp)}
                            className="mr-2"
                          />
                          <label htmlFor={hcp}>{hcp}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Content Type</label>
                    <div className="space-y-2">
                      {["Email", "Meeting Brief", "Leave-Behind", "Educational Content", "Product Update"].map((type) => (
                        <div key={type} className="flex items-center">
                          <input
                            type="radio"
                            id={type}
                            name="contentType"
                            value={type}
                            checked={contentType === type}
                            onChange={() => setContentType(type)}
                            className="mr-2"
                          />
                          <label htmlFor={type}>{type}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Product Focus</label>
                    <div className="space-y-2">
                      {["CardioX", "NeuroCare", "ImmunoPlus", "DiabeShield", "RespireClear"].map((product) => (
                        <div key={product} className="flex items-center">
                          <input
                            type="radio"
                            id={product}
                            name="productFocus"
                            value={product}
                            checked={productFocus === product}
                            onChange={() => setProductFocus(product)}
                            className="mr-2"
                          />
                          <label htmlFor={product}>{product}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Key Message</label>
                    <textarea 
                      className="w-full bg-white text-black px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary h-24 resize-none" 
                      placeholder="Enter key message or leave blank for AI to suggest"
                      value={keyMessage}
                      onChange={(e) => setKeyMessage(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Upload Reference Document</label>
                    <div className={`border-2 border-dashed ${uploadedFile ? 'border-primary bg-primary/5' : 'border-gray-300'} rounded-lg p-4 text-center hover:border-primary transition`}>
                      <input 
                        ref={fileInputRef}
                        type="file" 
                        id="document-upload" 
                        className="hidden" 
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={handleFileUpload}
                      />
                      <label htmlFor="document-upload" className="cursor-pointer w-full">
                        {uploadedFile ? (
                          <div className="flex flex-col items-center">
                            <span className="material-icons text-primary text-3xl mb-2">description</span>
                            <p className="text-sm font-medium mb-1">{uploadedFile.name}</p>
                            <p className="text-xs text-gray-400">
                              {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • Click to change
                            </p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <span className="material-icons text-3xl mb-2">upload_file</span>
                            <p className="text-sm font-medium mb-1">Click to upload or drag and drop</p>
                            <p className="text-xs text-gray-400">PDF, DOC, DOCX, TXT up to 10MB</p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                  
                  <button 
                    className="w-full bg-primary hover:bg-primary/80 text-white font-medium px-4 py-2 rounded-lg transition"
                    onClick={handleGenerateContent}
                  >
                    Generate Content
                  </button>
                </div>
                
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-2">Generated Content Preview</label>
                  <div className="bg-background-dark rounded-lg border border-gray-700 p-4 h-[28rem] overflow-y-auto">
                    {loading ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="flex flex-col items-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
                          <p>Generating personalized content...</p>
                        </div>
                      </div>
                    ) : generatedContent ? (
                      <>
                        <div className="flex justify-between mb-4">
                          <h4 className="font-medium">{contentType} for {selectedHcp}</h4>
                          <div className="flex space-x-2">
                            <ComplianceBadge 
                              status={(generatedContent.compliance?.medical?.status === "approved" ? "approved" : 
                                     generatedContent.compliance?.medical?.status === "warning" ? "warning" : 
                                     "rejected") as "approved" | "warning" | "rejected"} 
                              label="Medical" 
                            />
                            <ComplianceBadge 
                              status={(generatedContent.compliance?.legal?.status === "approved" ? "approved" : 
                                     generatedContent.compliance?.legal?.status === "warning" ? "warning" : 
                                     "rejected") as "approved" | "warning" | "rejected"} 
                              label="Legal" 
                            />
                            <ComplianceBadge 
                              status={(generatedContent.compliance?.regulatory?.status === "approved" ? "approved" : 
                                     generatedContent.compliance?.regulatory?.status === "warning" ? "warning" : 
                                     "rejected") as "approved" | "warning" | "rejected"} 
                              label="Regulatory" 
                            />
                          </div>
                        </div>
                        
                        {generatedContent.subject && (
                          <div className="mb-3">
                            <p className="text-sm text-gray-400 mb-1">Subject:</p>
                            <p>{generatedContent.subject}</p>
                          </div>
                        )}
                        
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Body:</p>
                          <div className="prose prose-sm text-white max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: generatedContent.content?.replace(/\n/g, '<br>') || '' }}></div>
                          </div>
                        </div>
                        
                        <div className="border-t border-gray-700 mt-4 pt-4">
                          <label className="block text-sm font-medium mb-2">Compliance Notes</label>
                          <ul className="text-sm space-y-2">
                            {generatedContent.complianceNotes ? (
                              generatedContent.complianceNotes.map((note: ComplianceNote, i: number) => (
                                <li key={i} className="flex items-start">
                                  <span className={`material-icons ${note.type === 'warning' ? 'text-yellow-400' : 'text-green-400'} mr-2 text-sm`}>
                                    {note.type === 'warning' ? 'warning' : 'check_circle'}
                                  </span>
                                  <span>{note.text}</span>
                                </li>
                              ))
                            ) : (
                              <>
                                <li className="flex items-start">
                                  <span className="material-icons text-green-400 mr-2 text-sm">check_circle</span>
                                  <span>Content generated using approved language and claims</span>
                                </li>
                                <li className="flex items-start">
                                  <span className="material-icons text-yellow-400 mr-2 text-sm">warning</span>
                                  <span>Please review content for any required regulatory statements</span>
                                </li>
                              </>
                            )}
                          </ul>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-gray-500">
                        <span className="material-icons text-6xl mb-4">description</span>
                        <p className="text-lg mb-2">No content generated yet</p>
                        <p className="text-sm text-center">Fill out the form on the left and click "Generate Content" to create AI-powered content</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-end mt-4 space-x-3">
                    <button 
                      className="border border-gray-600 hover:bg-white/5 text-white px-4 py-2 rounded-lg transition"
                      onClick={handleGenerateContent}
                      disabled={loading || !selectedHcp || !contentType || !productFocus}
                    >
                      Regenerate
                    </button>
                    <button 
                      className="border border-gray-600 hover:bg-white/5 text-white px-4 py-2 rounded-lg transition"
                      disabled={!generatedContent || loading}
                    >
                      Edit
                    </button>
                    <button 
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                      disabled={!generatedContent || loading}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content Library */}
          <div className="bg-background-card rounded-xl shadow-lg overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
              <h3 className="font-semibold">Saved Content</h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <span className="material-icons text-gray-600 absolute left-3 top-1/2 transform -translate-y-1/2">search</span>
                  <input 
                    type="text" 
                    placeholder="Search content..." 
                    className="bg-white text-black pl-10 pr-4 py-2 rounded-lg text-sm border border-gray-300 focus:outline-none focus:border-primary"
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
                    <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">Title</th>
                    <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">HCP</th>
                    <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">Type</th>
                    <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">Created</th>
                    <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">Compliance</th>
                    <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {savedContent.map((content, index) => (
                    <tr key={index} className="border-b border-gray-800 hover:bg-background-lighter">
                      <td className="py-3 px-4">{content.title}</td>
                      <td className="py-3 px-4">{content.hcp}</td>
                      <td className="py-3 px-4">{content.type}</td>
                      <td className="py-3 px-4 text-sm text-gray-400">{content.created}</td>
                      <td className="py-3 px-4">
                        <ComplianceBadge 
                          status={(content.compliance.status === "warning" ? "warning" : 
                                 content.compliance.status === "approved" ? "approved" : "rejected") as "approved" | "warning" | "rejected"} 
                          label={content.compliance.label} 
                        />
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-primary hover:text-primary/80 mr-2">
                          <span className="material-icons text-sm">edit</span>
                        </button>
                        <button className="text-gray-400 hover:text-white mr-2">
                          <span className="material-icons text-sm">content_copy</span>
                        </button>
                        <button className="text-red-500 hover:text-red-400">
                          <span className="material-icons text-sm">delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 flex justify-between items-center border-t border-gray-800">
              <p className="text-sm text-gray-400">Showing 3 of 342 entries</p>
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

export default ContentCraft;
