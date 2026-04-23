import { AnalyzeRequest, AnalysisResult } from '../types';
import { analyzeSymptoms as runEngine } from './symptomEngine';
import { getProfile } from './storage';

export async function analyzeSymptoms(payload: AnalyzeRequest): Promise<AnalysisResult> {
  // Simulate realistic thinking delay (800-1200ms)
  await new Promise(r => setTimeout(r, 800 + Math.random() * 400));
  
  try {
    const profile = getProfile();
    const result = runEngine(payload.symptoms, profile || undefined);
    
    if (!result || !result.conditions || result.conditions.length === 0) {
      return fallbackResult();
    }
    return result;
  } catch (err) {
    console.error('Engine error:', err);
    return fallbackResult();
  }
}

function fallbackResult(): AnalysisResult {
  return {
    severity: 'low',
    severityLabel: 'Monitor at Home',
    severityColor: '#10B981',
    conditions: [{ 
      name: 'Indeterminate', 
      likelihood: 0, 
      description: 'Could not fully analyze — please describe symptoms in more detail.' 
    }],
    recommendations: [
      'Please try again with more descriptive symptoms.',
      'If symptoms worsen, see a doctor.',
      'Rest and monitor your condition.'
    ],
    urgencyMessage: 'Analysis inconclusive.',
    followUpQuestions: ['Can you provide more specific symptoms?'],
    disclaimer: 'This is not a medical diagnosis. Always consult a licensed physician.'
  };
}
