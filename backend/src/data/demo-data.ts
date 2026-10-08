export type JourneyStageStatus = 'Completed' | 'In Progress' | 'Pending' | 'Requires Action';

export interface ApplicantProfile {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  currentLocation: string;
  primaryGoal: string;
  preferredField: string;
  preferredCity: string;
  intakePeriod: string;
  currentQualification: string;
  careerGoal: string;
  education: {
    institution: string;
    degree: string;
    field: string;
    graduationDate: string;
    cgpa: string;
    level: string;
  };
  employment: {
    employer: string;
    jobTitle: string;
    responsibilities: string[];
    startDate: string;
    endDate: string;
    relevantExperience: string;
  };
  skills: string[];
  languages: {
    german: string;
    english: string;
    other: string;
  };
  motivation: string;
  documents: Array<{
    id: string;
    name: string;
    type: string;
    uploadDate: string;
    status: 'UPLOADED' | 'PROCESSING' | 'EXTRACTED' | 'NEEDS_REVIEW' | 'VERIFIED' | 'REJECTED';
    extractionStatus: string;
    verificationStatus: string;
    confidence: number;
    detectedInformation: string[];
    issues: string[];
  }>;
  qualification: {
    status: 'Qualified' | 'Partially Qualified' | 'Not Yet Qualified';
    score: number;
    matched: string[];
    missing: string[];
    unverified: string[];
  };
  completeness: number;
}

export const demoProfile: ApplicantProfile = {
  fullName: 'Demo Applicant',
  email: 'demo.applicant@example.com',
  phone: '+91 98765 43210',
  country: 'India',
  currentLocation: 'Bengaluru',
  primaryGoal: 'Employment',
  preferredField: 'Software Engineering',
  preferredCity: 'Berlin',
  intakePeriod: 'Spring 2026',
  currentQualification: 'B.Tech Computer Science',
  careerGoal: 'Senior full-stack engineer in Germany',
  education: {
    institution: 'BMS Institute of Technology',
    degree: 'B.Tech',
    field: 'Computer Science',
    graduationDate: '2023-06-30',
    cgpa: '8.5/10',
    level: 'Undergraduate',
  },
  employment: {
    employer: 'InfoCore Systems',
    jobTitle: 'Software Developer',
    responsibilities: ['React development', 'API integration', 'Database design'],
    startDate: '2023-07-01',
    endDate: '2025-01-31',
    relevantExperience: '2 years',
  },
  skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'PostgreSQL'],
  languages: {
    german: 'A2',
    english: 'Advanced',
    other: 'Hindi, Kannada',
  },
  motivation: 'I want to work in Germany to grow in a strong engineering ecosystem and contribute to a global product team.',
  documents: [
    {
      id: 'doc-1',
      name: 'degree_certificate.pdf',
      type: 'Degree Certificate',
      uploadDate: '2026-10-01',
      status: 'VERIFIED',
      extractionStatus: 'EXTRACTED',
      verificationStatus: 'Document Verified',
      confidence: 95,
      detectedInformation: ['B.Tech Computer Science', 'Graduation date: 2023'],
      issues: [],
    },
    {
      id: 'doc-2',
      name: 'experience_letter.pdf',
      type: 'Experience Letter',
      uploadDate: '2026-10-02',
      status: 'NEEDS_REVIEW',
      extractionStatus: 'EXTRACTED',
      verificationStatus: 'Needs Confirmation',
      confidence: 80,
      detectedInformation: ['2 years experience', 'Software Developer'],
      issues: ['Employment end date requires confirmation'],
    },
    {
      id: 'doc-3',
      name: 'existing_cv.pdf',
      type: 'CV',
      uploadDate: '2026-10-02',
      status: 'VERIFIED',
      extractionStatus: 'EXTRACTED',
      verificationStatus: 'Verified',
      confidence: 92,
      detectedInformation: ['React', 'Node.js', 'PostgreSQL'],
      issues: [],
    },
  ],
  qualification: {
    status: 'Partially Qualified',
    score: 78,
    matched: ['B.Tech degree', 'Relevant technical field', '2 years software experience'],
    missing: ['German B1/B2 certificate', 'Updated CV', 'Experience verification'],
    unverified: ['Work authorization status', 'Exact recognition status'],
  },
  completeness: 78,
};

export const journeyStages = [
  { id: 'registration', label: 'Registration', status: 'Completed' },
  { id: 'goal-discovery', label: 'Goal Discovery', status: 'Completed' },
  { id: 'profile', label: 'Profile Creation', status: 'Completed' },
  { id: 'documents', label: 'Document Collection', status: 'In Progress' },
  { id: 'document-processing', label: 'Document Processing', status: 'Completed' },
  { id: 'verification', label: 'Verification', status: 'In Progress' },
  { id: 'qualification', label: 'Qualification Assessment', status: 'Completed' },
  { id: 'requirements', label: 'Missing Requirements', status: 'Requires Action' },
  { id: 'sources', label: 'Source Discovery', status: 'In Progress' },
  { id: 'roadmap', label: 'Personalized Roadmap', status: 'Pending' },
  { id: 'cv', label: 'CV Generation', status: 'Pending' },
  { id: 'checklist', label: 'Final Document Checklist', status: 'Pending' },
  { id: 'consultant', label: 'Consultant Recommendation', status: 'Pending' },
  { id: 'next-action', label: 'Next Action', status: 'Pending' },
];

export const activityLog = [
  'Profile Agent updated education details',
  'Document Agent processed degree certificate',
  'Verification Agent detected matching graduation date',
  'Qualification Agent recalculated eligibility',
  'Roadmap Agent updated next steps',
  'Notification Agent sent profile update notification',
];

export const notificationTemplates = [
  {
    type: 'welcome',
    subject: 'Welcome to your Germany Applicant Journey.',
    message: 'Welcome to your Germany Applicant Journey. We have started evaluating your profile and next steps.',
  },
  {
    type: 'document_processed',
    subject: 'Your degree certificate has been processed.',
    message: 'Your degree certificate has been processed and the extracted details are now linked to your profile.',
  },
  {
    type: 'missing_requirement',
    subject: 'Missing German language certificate',
    message: 'Your profile is missing a German language certificate. Please upload or confirm confirmation.',
  },
  {
    type: 'qualification_update',
    subject: 'Qualification assessment updated.',
    message: 'Your qualification assessment has been updated based on the latest profile information.',
  },
  {
    type: 'roadmap_update',
    subject: 'Your roadmap has changed.',
    message: 'Your personalized roadmap has changed based on your latest document and goal status.',
  },
  {
    type: 'cv_ready',
    subject: 'Your professional CV is ready.',
    message: 'Your Germany-oriented CV has been generated and is ready for review.',
  },
  {
    type: 'action_required',
    subject: 'Action required: review extracted information.',
    message: 'Please review the information extracted from your uploaded experience letter.',
  },
];

export const sourceRecommendations = [
  {
    id: 'german-tests',
    name: 'Goethe-Institut / TELC',
    category: 'Official language exam',
    purpose: 'German B1/B2 certification',
    whyRelevant: 'You currently have A2 German, so a recognized exam is the next critical gap.',
    recommendedAction: 'Choose an exam date and begin targeted practice.',
  },
  {
    id: 'recognition',
    name: 'Anabin / German recognition database',
    category: 'Official qualification information',
    purpose: 'Check recognition of your degree and academic background.',
    whyRelevant: 'Your B.Tech degree should be reviewed for equivalence in Germany before applications.',
    recommendedAction: 'Confirm whether your degree requires a recognition check.',
  },
  {
    id: 'job-portal',
    name: 'Make it in Germany / EURES',
    category: 'Employment opportunities',
    purpose: 'Identify relevant job openings and work visas information.',
    whyRelevant: 'Your goal is employment and you need role-specific opportunities in tech.',
    recommendedAction: 'Shortlist roles matching your software experience and language level.',
  },
  {
    id: 'cv-guide',
    name: 'German CV guidance resources',
    category: 'Application resources',
    purpose: 'Prepare a German-style CV and cover letter.',
    whyRelevant: 'Your current CV needs to align with Germany hiring expectations.',
    recommendedAction: 'Update your CV with clear project and skills sections.',
  },
];

export const roadmapItems = [
  { phase: 'Profile Preparation', tasks: ['Complete applicant profile', 'Upload degree', 'Upload experience letter'], status: 'In Progress' },
  { phase: 'Language', tasks: ['English information available', 'German language requirement pending'], status: 'Requires Action' },
  { phase: 'Qualification', tasks: ['Academic requirement matched', 'Language requirement pending'], status: 'In Progress' },
  { phase: 'Application Preparation', tasks: ['Build CV', 'Shortlist suitable opportunities', 'Prepare application documents'], status: 'Pending' },
  { phase: 'Final Documentation', tasks: ['Generate document checklist', 'Verify remaining documents', 'Connect with consultant if required'], status: 'Pending' },
];

export const checklistItems = [
  { heading: 'Education', items: ['Degree certificate', 'Marksheets', 'Certified/recognized copy required'] },
  { heading: 'Employment', items: ['Experience letter', 'Updated employment details'] },
  { heading: 'Language', items: ['German language certificate'] },
  { heading: 'Application', items: ['CV', 'Motivation letter'] },
];

export const demoUser = {
  id: 'user-001',
  name: 'Demo Applicant',
  email: 'demo.applicant@example.com',
  phone: '+91 98765 43210',
  country: 'India',
};

export const appState = {
  users: [demoUser],
  applicant: demoProfile,
  notifications: [
    {
      id: 'note-1',
      type: 'welcome',
      subject: 'Welcome to your Germany Applicant Journey.',
      message: 'Welcome to your Germany Applicant Journey. We have started evaluating your profile and next steps.',
      createdAt: new Date().toISOString(),
      read: false,
      stage: 'Registration',
    },
    {
      id: 'note-2',
      type: 'missing_requirement',
      subject: 'Missing German language certificate',
      message: 'Your profile is missing a German language certificate.',
      createdAt: new Date().toISOString(),
      read: false,
      stage: 'Qualification',
    },
  ],
};
