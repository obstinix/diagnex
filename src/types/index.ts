export interface Condition {
  name: string;
  likelihood: number;
  description: string;
}

export interface AnalysisResult {
  id?: string;
  timestamp?: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  severityLabel: 'Monitor at Home' | 'See a Doctor Soon' | 'Seek Care Today' | 'Go to ER Now';
  severityColor: '#10B981' | '#F59E0B' | '#EF4444' | '#7C3AED';
  conditions: Condition[];
  recommendations: string[];
  urgencyMessage: string;
  followUpQuestions: string[];
  disclaimer: string;
}

export interface AnalyzeRequest {
  symptoms: string;
  age?: number | string;
  gender?: string;
  medications?: string;
  allergies?: string;
  followUp?: string;
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
