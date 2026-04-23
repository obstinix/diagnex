import React, { useState } from 'react';
import { IonChip, IonLabel, IonSpinner } from '@ionic/react';
import { analyzeSymptoms } from '../services/api';
import { AnalyzeRequest, AnalysisResult } from '../types';

interface Props {
  questions: string[];
  initialRequest: AnalyzeRequest;
  onUpdateResult: (result: AnalysisResult) => void;
  onError: (msg: string) => void;
}

const FollowUpFlow: React.FC<Props> = ({ questions, initialRequest, onUpdateResult, onError }) => {
  const [loading, setLoading] = useState(false);
  const [answered, setAnswered] = useState(false);

  if (!questions || questions.length === 0) return null;

  const handleAnswer = async (question: string, answer: string) => {
    setLoading(true);
    setAnswered(true);
    try {
      const followUpContext = `User was asked: "${question}". They replied: "${answer}".`;
      const newRequest: AnalyzeRequest = {
        ...initialRequest,
        followUp: (initialRequest.followUp ? initialRequest.followUp + '\n' : '') + followUpContext
      };
      const result = await analyzeSymptoms(newRequest);
      onUpdateResult(result);
    } catch (err: any) {
      onError(err.message || 'Follow-up analysis failed.');
      setAnswered(false);
    } finally {
      setLoading(false);
    }
  };

  if (answered) {
    return loading ? (
      <div style={{ background: 'white', borderRadius: '16px', padding: '16px', margin: '16px 0', borderLeft: '5px solid #F59E0B', boxShadow: '0 4px 24px rgba(232,90,90,0.08)', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <IonSpinner name="crescent" color="primary" />
        <span style={{ fontFamily: 'Plus Jakarta Sans', color: '#1A1A1A', fontWeight: 500 }}>Re-analyzing...</span>
      </div>
    ) : null;
  }

  return (
    <div style={{ background: 'white', borderRadius: '16px', padding: '16px', marginTop: '24px', borderLeft: '5px solid #F59E0B', boxShadow: '0 4px 24px rgba(232,90,90,0.08)' }}>
      <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#1A1A1A', margin: '0 0 16px 0', fontFamily: 'Plus Jakarta Sans' }}>Follow-up Questions</h3>
      {questions.slice(0, 2).map((q, idx) => (
        <div key={idx} style={{ marginBottom: idx === 0 ? '16px' : '0' }}>
          <p style={{ marginBottom: '12px', fontSize: '16px', fontFamily: 'Cormorant Garamond', fontStyle: 'italic', color: '#1A1A1A', margin: '0 0 12px 0' }}>{q}</p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <IonChip color="primary" outline onClick={() => handleAnswer(q, 'Yes')}>
              <IonLabel>Yes</IonLabel>
            </IonChip>
            <IonChip color="medium" outline onClick={() => handleAnswer(q, 'No')}>
              <IonLabel>No</IonLabel>
            </IonChip>
            <IonChip color="medium" outline onClick={() => handleAnswer(q, 'Not sure')}>
              <IonLabel>Not sure</IonLabel>
            </IonChip>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FollowUpFlow;
