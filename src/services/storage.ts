import { AnalysisResult, PatientProfile } from '../types';

const HISTORY_KEY = 'diagnex_history';
const PROFILE_KEY = 'diagnex_profile';

export function saveAnalysis(result: AnalysisResult): void {
  const history = getHistory();
  const newResult = { ...result, id: result.id || crypto.randomUUID(), timestamp: result.timestamp || Date.now() };
  const updated = [newResult, ...history].slice(0, 20);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
}

export function getHistory(): AnalysisResult[] {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function deleteAnalysis(id: string): void {
  const history = getHistory();
  const updated = history.filter(item => item.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
}

export function saveProfile(p: PatientProfile): void {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
}

export function getProfile(): PatientProfile | null {
  try {
    const data = localStorage.getItem(PROFILE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}
