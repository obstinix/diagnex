import { AnalyzeRequest, AnalysisResult } from '../types';

const BASE = '/api';

export async function analyzeSymptoms(payload: AnalyzeRequest): Promise<AnalysisResult> {
  const res = await fetch(`${BASE}/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
