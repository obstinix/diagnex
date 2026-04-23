import React from 'react';
import { IonItem, IonLabel, IonNote, IonProgressBar, IonBadge } from '@ionic/react';

interface Props {
  name: string;
  likelihood: number;
  description: string;
  severityColor: string;
}

const ConditionCard: React.FC<Props> = ({ name, likelihood, description, severityColor }) => {
  return (
    <div style={{ marginBottom: '16px' }}>
      <IonItem lines="none" style={{ '--background': 'transparent', '--padding-start': '0' }}>
        <IonLabel className="ion-text-wrap">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontWeight: 600, margin: 0, fontSize: '1.1rem' }}>{name}</h3>
            <IonBadge style={{ '--background': severityColor, fontFamily: 'var(--font-mono)' }}>
              {likelihood}%
            </IonBadge>
          </div>
          <IonNote style={{ marginTop: '8px', display: 'block', fontSize: '0.9rem' }}>{description}</IonNote>
        </IonLabel>
      </IonItem>
      <IonProgressBar 
        value={likelihood / 100} 
        style={{ '--background': 'rgba(27,58,107,0.1)', '--progress-background': severityColor, height: '6px', borderRadius: '3px' }} 
      />
    </div>
  );
};

export default ConditionCard;
