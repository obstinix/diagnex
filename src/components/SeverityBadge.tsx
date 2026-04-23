import React from 'react';
import { IonBadge, IonIcon } from '@ionic/react';
import { checkmarkCircle, warningOutline, alertCircle, flameOutline } from 'ionicons/icons';

interface Props {
  severity: 'low' | 'medium' | 'high' | 'critical';
}

const severityConfig = {
  low: { icon: checkmarkCircle, color: 'var(--severity-low)', label: 'Monitor at Home' },
  medium: { icon: warningOutline, color: 'var(--severity-medium)', label: 'See a Doctor Soon' },
  high: { icon: alertCircle, color: 'var(--severity-high)', label: 'Seek Care Today' },
  critical: { icon: flameOutline, color: 'var(--severity-critical)', label: 'Go to ER Now' }
};

const SeverityBadge: React.FC<Props> = ({ severity }) => {
  const config = severityConfig[severity];

  return (
    <IonBadge
      style={{
        '--background': config.color,
        padding: '12px 16px',
        fontSize: '16px',
        fontWeight: 'bold',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        borderRadius: '16px',
        animation: 'severity-pulse 2s infinite',
        color: '#fff'
      }}
    >
      <IonIcon icon={config.icon} style={{ fontSize: '20px' }} />
      {config.label}
    </IonBadge>
  );
};

export default SeverityBadge;
