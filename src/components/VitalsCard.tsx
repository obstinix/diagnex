import React from 'react';
import { IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonIcon, IonText } from '@ionic/react';
import { heartOutline, waterOutline, thermometerOutline } from 'ionicons/icons';

const VitalsCard: React.FC = () => {
  return (
    <IonCard className="animate-in" style={{ margin: '0 0 16px 0' }}>
      <IonCardContent>
        <IonGrid className="ion-no-padding">
          <IonRow>
            <IonCol className="ion-text-center">
              <IonIcon icon={heartOutline} color="danger" style={{ fontSize: '24px', animation: 'pulse-dot 1.5s infinite' }} />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 600, marginTop: '4px' }}>72</div>
              <IonText color="medium" style={{ fontSize: '0.8rem' }}>BPM</IonText>
            </IonCol>
            <IonCol className="ion-text-center">
              <IonIcon icon={waterOutline} color="primary" style={{ fontSize: '24px' }} />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 600, marginTop: '4px' }}>98%</div>
              <IonText color="medium" style={{ fontSize: '0.8rem' }}>SpO2</IonText>
            </IonCol>
            <IonCol className="ion-text-center">
              <IonIcon icon={thermometerOutline} color="warning" style={{ fontSize: '24px' }} />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 600, marginTop: '4px' }}>98.6°</div>
              <IonText color="medium" style={{ fontSize: '0.8rem' }}>Temp</IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default VitalsCard;
