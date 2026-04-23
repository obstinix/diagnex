import React, { useState } from 'react';
import { IonChip, IonLabel, IonProgressBar, IonText, IonCard, IonCardContent } from '@ionic/react';
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
      <IonCard style={{ margin: '16px 0', boxShadow: 'none', border: '1px solid var(--diagnex-border)' }}>
        <IonCardContent>
          <IonText color="medium"><p style={{ margin: '0 0 12px 0' }}>Re-analyzing based on your response...</p></IonText>
          <IonProgressBar type="indeterminate" />
        </IonCardContent>
      </IonCard>
    ) : null;
  }

  return (
    <div style={{ marginTop: '24px' }}>
      <IonText color="primary"><h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Follow-up Questions</h3></IonText>
      {questions.slice(0, 2).map((q, idx) => (
        <div key={idx} style={{ marginBottom: '16px' }}>
          <IonText><p style={{ marginBottom: '8px', fontSize: '0.95rem' }}>{q}</p></IonText>
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
