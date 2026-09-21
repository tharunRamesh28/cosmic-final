export interface PhaseStep {
  id: string;
  number: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  deliverables: string[];
  timeline: string;
  tools: string[];
}

export interface ServiceCapability {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  features: string[];
  techStack: string[];
  sampleDeliverables: string[];
  tag: string;
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  clientCategory: string;
  category: 'Hardware' | 'IoT' | 'Web' | 'CAD';
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  techStack: string[];
  image: string;
  metrics: { label: string; value: string }[];
  cadNodeCode: string;
}

export interface ProjectInquiry {
  name: string;
  email: string;
  company: string;
  services: string[];
  budgetRange: string;
  currentPhase: string;
  timeline: string;
  description: string;
  ndaRequired: boolean;
}
