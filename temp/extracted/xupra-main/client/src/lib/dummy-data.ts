// Dummy data for demonstration purposes
// This file provides initial data for the in-memory storage

export interface DummyHcp {
  name: string;
  specialty: string;
  prescribingPattern: string;
  engagementScore: number;
  tag: string;
  email: string;
  organization: string;
  notes: string;
}

export interface DummyContent {
  title: string;
  hcp: string;
  type: string;
  subject?: string;
  content: string;
  compliance: {
    medical: { status: string; notes: string };
    legal: { status: string; notes: string };
    regulatory: { status: string; notes: string };
  };
  createdBy: string;
}

export interface DummyCampaign {
  name: string;
  target: string;
  channels: string[];
  startDate: string;
  endDate: string;
  status: string;
  createdBy: string;
}

export interface DummyAsset {
  name: string;
  type: string;
  size: string;
  url: string;
  tags: string[];
  uploadedBy: string;
}

export interface DummyActivity {
  activity: string;
  user: string;
  status: string;
  relatedTo: string;
}

// HCP data
export const dummyHcps: DummyHcp[] = [
  {
    name: "Dr. Sarah Chen",
    specialty: "Cardiology",
    prescribingPattern: "High Volume",
    engagementScore: 87,
    tag: "Early Adopter",
    email: "sarah.chen@example.com",
    organization: "Metropolis Medical Center",
    notes: "Interested in new cardiovascular treatments"
  },
  {
    name: "Dr. James Wilson",
    specialty: "Oncology",
    prescribingPattern: "Medium Volume",
    engagementScore: 76,
    tag: "Evidence Driven",
    email: "james.wilson@example.com",
    organization: "City Cancer Institute",
    notes: "Requires strong clinical data before adoption"
  },
  {
    name: "Dr. Maria Rodriguez",
    specialty: "Neurology",
    prescribingPattern: "Low Volume",
    engagementScore: 62,
    tag: "Patient Focused",
    email: "maria.rodriguez@example.com",
    organization: "Westside Neuro Center",
    notes: "Emphasizes patient quality of life in treatment decisions"
  },
  {
    name: "Dr. Robert Johnson",
    specialty: "General Practice",
    prescribingPattern: "High Volume",
    engagementScore: 81,
    tag: "Balanced",
    email: "robert.johnson@example.com",
    organization: "Community Family Practice",
    notes: "Considers multiple factors in prescribing decisions"
  },
  {
    name: "Dr. Emily Chang",
    specialty: "Pediatrics",
    prescribingPattern: "Medium Volume",
    engagementScore: 74,
    tag: "Patient Focused",
    email: "emily.chang@example.com",
    organization: "Children's Medical Group",
    notes: "Focused on minimizing side effects in pediatric patients"
  }
];

// Content data
export const dummyContents: DummyContent[] = [
  {
    title: "CardioX Clinical Trial Update",
    hcp: "Dr. Sarah Chen",
    type: "Email",
    subject: "New Clinical Data: CardioX Shows Promising Results in Reducing CVD Risk",
    content: "Dear Dr. Chen,\n\nI hope this email finds you well. Given your pioneering approach to cardiovascular treatments, I wanted to share some recent clinical findings regarding CardioX that align with your evidence-based practice.\n\nOur latest phase III trial (CARDIO-PREVENT) demonstrated a 27% reduction in major adverse cardiovascular events (MACE) in high-risk patients, with a safety profile consistent with previous studies. Notably, the results showed particular efficacy in patients with comorbid hypertension and hyperlipidemia – a patient group I know comprises a significant portion of your practice.\n\nKey findings include:\n- 27% reduction in MACE compared to standard of care\n- Significant improvements in secondary endpoints including blood pressure control\n- Minimal drug-drug interactions with common co-medications\n- Favorable safety profile with minimal need for dosage adjustments\n\nAs someone who has been an early adopter of innovative cardiovascular therapies, I'd welcome the opportunity to discuss these findings in more detail. Would you be available for a brief 15-minute call next week?\n\nI've attached the summary of clinical data for your review.\n\nBest regards,\nJohn Doe\nMedical Science Liaison",
    compliance: {
      medical: { status: "approved", notes: "Claims about efficacy are supported by phase III trial data" },
      legal: { status: "approved", notes: "Safety information is accurately represented" },
      regulatory: { status: "warning", notes: "Recommend including specific contraindication statement in final version" }
    },
    createdBy: "John Doe"
  },
  {
    title: "ImmunoPlus New Indication",
    hcp: "Dr. James Wilson",
    type: "Meeting Brief",
    content: "Meeting Brief: Dr. James Wilson - ImmunoPlus New Indication\n\nKey Points:\n\n1. Newly approved indication for ImmunoPlus in treatment of advanced melanoma\n2. Phase III IMMUNO-MEL trial showed 42% improvement in progression-free survival\n3. Safety profile consistent with previous indications\n4. Specific dosing considerations for patients with hepatic impairment\n\nSupporting Materials:\n- Clinical trial summary\n- Prescribing information\n- Patient support program details\n\nAction Items:\n- Discuss integration with current treatment protocols\n- Address any questions about patient selection criteria\n- Provide information on reimbursement support",
    compliance: {
      medical: { status: "approved", notes: "All efficacy claims supported by phase III data" },
      legal: { status: "approved", notes: "No intellectual property concerns" },
      regulatory: { status: "approved", notes: "All information aligned with approved labeling" }
    },
    createdBy: "Sarah Johnson"
  },
  {
    title: "NeuroCare Patient Resources",
    hcp: "Dr. Maria Rodriguez",
    type: "Leave-Behind",
    content: "NeuroCare Patient Resources\n\nDear Dr. Rodriguez,\n\nAs discussed during our meeting, I'm providing these patient education materials about NeuroCare for your practice:\n\n1. Patient Starter Guide - Simplified explanation of how NeuroCare works and what patients can expect\n2. Side Effect Management - Practical tips for managing common side effects\n3. Treatment Calendar - Helps patients track their medication schedule and appointments\n4. Support Program Information - Details about the patient assistance program including financial support options\n\nThese materials are designed to address the common concerns your patients have expressed about beginning treatment with NeuroCare. They emphasize quality of life considerations while providing practical support.\n\nPlease let me know if you need additional copies or have suggestions for improvement.\n\nThank you,\nMike Reynolds\nPatient Education Specialist",
    compliance: {
      medical: { status: "approved", notes: "Patient education materials align with clinical guidelines" },
      legal: { status: "approved", notes: "Privacy and disclaimer statements included" },
      regulatory: { status: "approved", notes: "All materials conform to current labeling" }
    },
    createdBy: "Mike Reynolds"
  }
];

// Campaign data
export const dummyCampaigns: DummyCampaign[] = [
  {
    name: "Q2 Cardiology Engagement",
    target: "Cardiologists",
    channels: ["Email", "Meeting"],
    startDate: "2023-04-10T00:00:00.000Z",
    endDate: "2023-06-15T00:00:00.000Z",
    status: "In Progress",
    createdBy: "John Doe"
  },
  {
    name: "Oncology New Product Launch",
    target: "Oncologists",
    channels: ["Email", "Webinar"],
    startDate: "2023-05-01T00:00:00.000Z",
    endDate: "2023-07-30T00:00:00.000Z",
    status: "Planned",
    createdBy: "Sarah Johnson"
  },
  {
    name: "Pediatrician Educational Series",
    target: "Pediatricians",
    channels: ["Video", "Email"],
    startDate: "2023-03-15T00:00:00.000Z",
    endDate: "2023-03-30T00:00:00.000Z",
    status: "Completed",
    createdBy: "Mike Reynolds"
  }
];

// Asset data
export const dummyAssets: DummyAsset[] = [
  {
    name: "CardioX Clinical Efficacy Infographic",
    type: "Image",
    size: "2.4 MB",
    url: "/uploads/CardioX_Efficacy_Infographic.svg",
    tags: ["CardioX", "Clinical", "Infographic"],
    uploadedBy: "John Doe"
  },
  {
    name: "ImmunoPlus Product Overview",
    type: "PDF",
    size: "4.7 MB",
    url: "/uploads/ImmunoPlus_Overview.pdf",
    tags: ["ImmunoPlus", "Overview", "Product"],
    uploadedBy: "Sarah Johnson"
  },
  {
    name: "NeuroCare Patient Education Video",
    type: "Video",
    size: "18.2 MB",
    url: "/uploads/NeuroCare_Patient_Education.mp4",
    tags: ["NeuroCare", "Patient", "Education"],
    uploadedBy: "Mike Reynolds"
  },
  {
    name: "DiabeShield Clinical Presentation",
    type: "PowerPoint",
    size: "8.5 MB",
    url: "/uploads/DiabeShield_Clinical_Presentation.pptx",
    tags: ["DiabeShield", "Clinical", "Presentation"],
    uploadedBy: "John Doe"
  }
];

// Activity data
export const dummyActivities: DummyActivity[] = [
  {
    activity: "Campaign \"Q2 Cardiology\" created",
    user: "John Doe",
    status: "Completed",
    relatedTo: "Campaign"
  },
  {
    activity: "25 HCPs tagged in MediTag Engine",
    user: "Sarah Johnson",
    status: "Completed",
    relatedTo: "HCP"
  },
  {
    activity: "Content batch generated for oncologists",
    user: "Mike Reynolds",
    status: "Review",
    relatedTo: "Content"
  },
  {
    activity: "CSV HCP data imported",
    user: "John Doe",
    status: "Completed",
    relatedTo: "HCP"
  }
];

// Analytics data
export const dummyAnalytics = {
  keyMetrics: [
    { label: "Open Rate", value: "78%", target: "65%" },
    { label: "Response Rate", value: "36%", target: "25%" },
    { label: "ROI", value: "3.2x", target: "2.5x" }
  ],
  segmentComparison: [
    { segment: "Early Adopters", openRate: 84, responseRate: 42, engagement: 7.8, roi: 3.8 },
    { segment: "Evidence Driven", openRate: 76, responseRate: 35, engagement: 6.9, roi: 3.1 },
    { segment: "Patient Focused", openRate: 72, responseRate: 32, engagement: 6.2, roi: 2.7 },
    { segment: "Balanced", openRate: 65, responseRate: 28, engagement: 5.8, roi: 2.4 }
  ],
  aiInsights: [
    "Cardiologists showed 28% higher engagement with clinical trial data vs. general product information.",
    "Tuesday morning emails had 34% higher open rates than other days/times.",
    "HCPs who received personalized content were 2.1x more likely to schedule follow-up meetings.",
    "Content focusing on patient outcomes resonated better with 'Patient-Focused' tagged HCPs.",
    "Compliance-flagged content had 18% lower engagement rates."
  ],
  recommendations: [
    "Increase frequency of clinical data updates for Evidence-Driven HCPs.",
    "Schedule email sends for Tuesday/Thursday mornings to maximize open rates.",
    "Develop more personalized content for high-value HCP segments.",
    "Focus on patient outcome messaging for Patient-Focused segment.",
    "Address regulatory compliance flags before campaign launch."
  ]
};

// Initialize demo data
export const initializeDemoData = async (apiRequest: any) => {
  try {
    // Upload HCP data
    await apiRequest("POST", "/api/hcp/upload", {});
    
    // Create content
    for (const content of dummyContents) {
      await apiRequest("POST", "/api/content", content);
    }
    
    // Create campaigns
    for (const campaign of dummyCampaigns) {
      await apiRequest("POST", "/api/campaign", campaign);
    }
    
    // Create assets
    for (const asset of dummyAssets) {
      await apiRequest("POST", "/api/asset", asset);
    }
    
    console.log("Demo data initialized successfully");
  } catch (error) {
    console.error("Error initializing demo data:", error);
  }
};
