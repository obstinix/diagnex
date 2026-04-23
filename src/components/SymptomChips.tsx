import React from 'react';
import { IonChip, IonLabel } from '@ionic/react';

interface Props {
  onSelect: (symptom: string) => void;
}

const symptomsList = [
  'Fever', 'Headache', 'Cough', 'Fatigue', 
  'Nausea', 'Chest Pain', 'Dizziness', 'Sore Throat'
];

const SymptomChips: React.FC<Props> = ({ onSelect }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
      {symptomsList.map(symptom => (
        <IonChip 
          key={symptom} 
          onClick={() => onSelect(symptom)}
          style={{ '--background': 'rgba(27,58,107,0.08)' }}
        >
          <IonLabel style={{ fontWeight: 500 }}>{symptom}</IonLabel>
        </IonChip>
      ))}
    </div>
  );
};

export default SymptomChips;
