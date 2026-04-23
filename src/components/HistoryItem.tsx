import React from 'react';
import { IonItem, IonLabel, IonBadge, IonItemSliding, IonItemOptions, IonItemOption, IonIcon, IonNote } from '@ionic/react';
import { trashOutline } from 'ionicons/icons';
import { AnalysisResult } from '../types';

interface Props {
  item: AnalysisResult;
  onDelete: (id: string) => void;
  onClick: (item: AnalysisResult) => void;
}

const HistoryItem: React.FC<Props> = ({ item, onDelete, onClick }) => {
  const date = item.timestamp ? new Date(item.timestamp).toLocaleDateString() : 'Unknown date';
  
  return (
    <IonItemSliding>
      <IonItem button onClick={() => onClick(item)} detail={false}>
        <IonLabel>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <h3 style={{ fontWeight: 600, margin: 0 }}>{item.conditions[0]?.name || 'Analysis'}</h3>
            <IonBadge style={{ '--background': item.severityColor, fontFamily: 'var(--font-mono)' }}>{item.severityLabel}</IonBadge>
          </div>
          <IonNote color="medium">{date}</IonNote>
        </IonLabel>
      </IonItem>
      <IonItemOptions side="end">
        <IonItemOption color="danger" onClick={() => onDelete(item.id!)}>
          <IonIcon slot="icon-only" icon={trashOutline} />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default HistoryItem;
