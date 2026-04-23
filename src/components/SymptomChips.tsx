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
      <style>
        {`
          .symptom-chip-default {
            background: white;
            border: 1.5px solid #F0D6DA;
            color: #1A1A1A;
            border-radius: 50px;
            padding: 8px 16px;
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 14px;
            box-shadow: 0 2px 8px rgba(232,90,90,0.08);
            transition: all 0.2s ease;
            --background: white;
            --color: #1A1A1A;
            margin: 0;
            flex-shrink: 0;
          }
          .symptom-chip-default:hover {
            border-color: #E85A5A;
            transform: translateY(-1px);
          }
          .symptom-chip-active {
            background: #E85A5A;
            color: white;
            border: 1.5px solid transparent;
            box-shadow: 0 4px 12px rgba(232,90,90,0.3);
            transform: translateY(-1px);
            border-radius: 50px;
            padding: 8px 16px;
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 14px;
            transition: all 0.2s ease;
            --background: transparent;
            --color: white;
            margin: 0;
            flex-shrink: 0;
          }
        `}
      </style>
      {SYMPTOM_CATEGORIES.map(category => (
        <div key={category.name} style={{ marginBottom: '12px' }}>
          <div style={{ 
            fontFamily: 'Plus Jakarta Sans', fontSize: '11px', fontWeight: 700, 
            letterSpacing: '1.5px', color: 'rgba(26,26,26,0.5)', 
            marginBottom: '8px', textTransform: 'uppercase',
            borderLeft: '3px solid #E85A5A', paddingLeft: '8px'
          }}>
            {category.name}
          </div>
          <div style={{ display: 'flex', overflowX: 'auto', paddingBottom: '4px', gap: '8px', WebkitOverflowScrolling: 'touch', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
            {category.chips.map(chip => {
              const isActive = lowerText.includes(chip.toLowerCase());
              return (
                <IonChip 
                  key={chip} 
                  className={isActive ? 'symptom-chip-active' : 'symptom-chip-default'}
                  onClick={() => onToggle(chip)}
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
