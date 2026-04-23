import { AnalyzeRequest, AnalysisResult } from '../types';
import { symptomEngine } from './symptomEngine';
import { getProfile } from './storage';

export async function analyzeSymptoms(payload: AnalyzeRequest): Promise<AnalysisResult> {
  // Simulate realistic thinking delay (800-1200ms)
  await new Promise(r => setTimeout(r, 800 + Math.random() * 400));
  
  const profile = getProfile();
  return symptomEngine.analyze(payload.symptoms, profile || undefined);
}
