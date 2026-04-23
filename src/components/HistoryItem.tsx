import React from 'react';
import { IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption, IonIcon } from '@ionic/react';
import { trash, chevronForwardOutline } from 'ionicons/icons';
import { AnalysisResult } from '../types';

interface HistoryEntry {
  id: string;
  timestamp: string;
  symptoms: string;
  result: AnalysisResult;
}

interface Props {
  entry: HistoryEntry;
  onDelete: (id: string) => void;
  onClick: (entry: HistoryEntry) => void;
}

const HistoryItem: React.FC<Props> = ({ entry, onDelete, onClick }) => {
  const getRelativeTime = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} mins ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 172800) return 'Yesterday';
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  const truncatedSymptoms = entry.symptoms.length > 60 
    ? entry.symptoms.substring(0, 60) + '...' 
    : entry.symptoms;

  const topCondition = entry.result.conditions && entry.result.conditions.length > 0 
    ? entry.result.conditions[0].name 
    : 'Unknown Condition';

  return (
    <IonItemSliding style={{ margin: '8px 16px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(232,90,90,0.05)', border: '1px solid #F0D6DA', background: 'white' }}>
      <IonItem button onClick={() => onClick(entry)} detail={false} lines="none" style={{ '--padding-start': '0', '--inner-padding-end': '0', '--background': 'white' }}>
        <div style={{ display: 'flex', width: '100%', alignItems: 'stretch' }}>
          <div style={{ width: '4px', background: entry.result.severityColor, flexShrink: 0 }}></div>
          <div style={{ padding: '16px', flex: 1, display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, margin: 0, color: '#E85A5A', fontSize: '13px' }}>
                  {topCondition}
                </h3>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#6B6B6B' }}>
                  {getRelativeTime(entry.timestamp)}
                </span>
              </div>
              <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px', color: '#1A1A1A', margin: '0 0 12px 0', lineHeight: 1.4 }}>
                "{truncatedSymptoms}"
              </p>
              <div>
                <span style={{ background: `${entry.result.severityColor}20`, color: entry.result.severityColor, padding: '4px 10px', borderRadius: '50px', fontSize: '11px', fontWeight: 700, fontFamily: 'Plus Jakarta Sans', display: 'inline-block' }}>
                  {entry.result.severityLabel.toUpperCase()}
                </span>
              </div>
            </div>
            <IonIcon icon={chevronForwardOutline} style={{ color: '#F0D6DA', fontSize: '20px', marginLeft: '12px' }} />
          </div>
        </div>
      </IonItem>
      <IonItemOptions side="end">
        <IonItemOption color="danger" onClick={() => onDelete(entry.id)} style={{ padding: '0 24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <IonIcon icon={trash} style={{ fontSize: '24px', marginBottom: '4px' }} />
            <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px', fontWeight: 600 }}>Delete</span>
          </div>
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default HistoryItem;
