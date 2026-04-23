export interface Condition {
  name: string;
  likelihood: number;
  description: string;
  body_system?: string;
}

export interface AnalysisResult {
  id?: string;
  timestamp?: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  severityLabel: 'Monitor at Home' | 'See a Doctor Soon' | 'Seek Care Today' | 'Go to ER Now';
  severityColor: '#10B981' | '#F59E0B' | '#F97316' | '#EF4444' | string;
  conditions: Condition[];
  recommendations: string[];
  urgencyMessage: string;
  followUpQuestions: string[];
  disclaimer: string;
  system_matches?: string[];
}

export interface AnalyzeRequest {
  symptoms: string;
  age?: number | string;
  gender?: string;
  medications?: string;
  allergies?: string;
  followUp?: string;
  profile?: any;
}

export interface PatientProfile {
  name: string;
  age: string;
  gender: string;
  bloodType: string;
  medications: string;
  allergies: string;
  emergencyContact: string;
  shareProfile: boolean;
}
