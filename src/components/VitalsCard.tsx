import React from 'react';
import { IonGrid, IonRow, IonCol, IonIcon, IonText } from '@ionic/react';
import { heartOutline, waterOutline, thermometerOutline } from 'ionicons/icons';

interface VitalsCardProps {
  bpm?:  number;   // beats per minute
  spo2?: number;   // SpO₂ %
  temp?: number;   // °F
}

const getRangeColor = (
  value: number | undefined,
  type: 'bpm' | 'spo2' | 'temp'
): string => {
  if (!value) return 'var(--text-secondary)';
  if (type === 'bpm')  return value >= 100 || value <= 50 ? '#EF4444' : value >= 90 ? '#F59E0B' : '#10B981';
  if (type === 'spo2') return value <= 92 ? '#EF4444' : value <= 95 ? '#F59E0B' : '#10B981';
  if (type === 'temp') return value >= 103 ? '#EF4444' : value >= 100.4 ? '#F59E0B' : '#10B981';
  return '#10B981';
};

const VitalsCard: React.FC<VitalsCardProps> = ({ bpm, spo2, temp }) => {
  const vitals = [
    {
      icon: heartOutline,
      value: bpm   ? `${bpm}`       : '—',
      unit:  'BPM',
      color: getRangeColor(bpm,  'bpm'),
    },
    {
      icon: waterOutline,
      value: spo2  ? `${spo2}%`     : '—',
      unit:  'SpO₂',
      color: getRangeColor(spo2, 'spo2'),
    },
    {
      icon: thermometerOutline,
      value: temp  ? `${temp}°F`    : '—',
      unit:  'Temp',
      color: getRangeColor(temp, 'temp'),
    },
  ];

  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '16px',
      marginBottom: '16px',
      border: '1px solid var(--border-color)',
      boxShadow: '0 4px 24px rgba(232,90,90,0.05)',
    }}>
      <div style={{
        fontFamily: 'Plus Jakarta Sans', fontSize: '11px', fontWeight: 700,
        letterSpacing: '1.5px', color: 'rgba(26,26,26,0.45)',
        textTransform: 'uppercase', marginBottom: '12px',
      }}>
        Biometric Readings
      </div>
      <IonGrid className="ion-no-padding">
        <IonRow>
          {vitals.map(v => (
            <IonCol key={v.unit} className="ion-text-center">
              <IonIcon icon={v.icon} style={{ color: v.color, fontSize: '22px' }} />
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '1.15rem',
                fontWeight: 600,
                marginTop: '4px',
                color: v.color,
              }}>
                {v.value}
              </div>
              <IonText style={{ fontSize: '0.78rem', fontFamily: 'DM Sans', color: 'var(--text-secondary)' }}>
                {v.unit}
              </IonText>
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default VitalsCard;
