import React from 'react';
import { IonChip, IonLabel } from '@ionic/react';

interface Props {
  symptomsText: string;
  onToggle: (symptom: string) => void;
}

const SYMPTOM_CATEGORIES = [
  { name: 'Common', chips: ['Fever', 'Headache', 'Fatigue', 'Nausea', 'Cough', 'Sore Throat'] },
  { name: 'Pain', chips: ['Chest Pain', 'Back Pain', 'Stomach Pain', 'Joint Pain'] },
  { name: 'Respiratory', chips: ['Shortness of Breath', 'Wheezing', 'Runny Nose'] },
  { name: 'Digestive', chips: ['Vomiting', 'Diarrhea', 'Bloating', 'Heartburn'] },
  { name: 'Other', chips: ['Dizziness', 'Rash', 'Palpitations'] }
];

const SymptomChips: React.FC<Props> = ({ symptomsText, onToggle }) => {
  const lowerText = symptomsText.toLowerCase();

  return (
    <div style={{ marginBottom: '16px' }}>
      {SYMPTOM_CATEGORIES.map(category => (
        <div key={category.name} style={{ marginBottom: '12px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ion-color-medium)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {category.name}
          </div>
          <div style={{ display: 'flex', overflowX: 'auto', paddingBottom: '4px', gap: '8px', WebkitOverflowScrolling: 'touch', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
            {category.chips.map(chip => {
              const isActive = lowerText.includes(chip.toLowerCase());
              return (
                <IonChip 
                  key={chip} 
                  color={isActive ? 'primary' : 'medium'}
                  outline={!isActive}
                  onClick={() => onToggle(chip)}
                  style={{ flexShrink: 0, margin: 0, '--background': isActive ? 'var(--ion-color-primary)' : 'rgba(27,58,107,0.08)' }}
                >
                  <IonLabel style={{ fontWeight: isActive ? 600 : 500 }}>{chip}</IonLabel>
                </IonChip>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SymptomChips;
