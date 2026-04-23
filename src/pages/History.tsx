import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonRefresher, IonRefresherContent, IonButtons, IonButton, useIonAlert, IonCard, IonCardContent, IonIcon, useIonViewWillEnter } from '@ionic/react';
import { trashOutline, timeOutline } from 'ionicons/icons';
import { deleteAnalysis, clearHistory } from '../services/storage';
import { AnalysisResult } from '../types';
import HistoryItem from '../components/HistoryItem';
import { useHistory as useRouterHistory } from 'react-router';

interface HistoryEntry {
  id: string;
  timestamp: string;
  symptoms: string;
  result: AnalysisResult;
}

const History: React.FC = () => {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [presentAlert] = useIonAlert();
  const routerHistory = useRouterHistory();

  const loadHistory = () => {
    const saved = localStorage.getItem('diagnex_history');
    if (saved) {
      setEntries(JSON.parse(saved));
    } else {
      setEntries([]);
    }
  };

  useIonViewWillEnter(() => {
    loadHistory();
  });

  const handleRefresh = (event: CustomEvent) => {
    loadHistory();
    event.detail.complete();
  };

  const handleDelete = (id: string) => {
    const saved = localStorage.getItem('diagnex_history');
    if (saved) {
      const parsed = JSON.parse(saved);
      const filtered = parsed.filter((entry: HistoryEntry) => entry.id !== id);
      localStorage.setItem('diagnex_history', JSON.stringify(filtered));
      loadHistory();
    }
  };

  const handleClearAll = () => {
    presentAlert({
      header: 'Clear History',
      message: 'Are you sure you want to delete all past analyses?',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { 
          text: 'Clear', 
          role: 'destructive', 
          handler: () => {
            localStorage.removeItem('diagnex_history');
            loadHistory();
          }
        }
      ]
    });
  };

  const handleItemClick = (entry: HistoryEntry) => {
    localStorage.setItem('diagnex_last_result', JSON.stringify(entry.result));
    routerHistory.push('/results');
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--background': 'var(--accent-strong)' }}>
          <IonTitle style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'white' }}>History</IonTitle>
          <IonButtons slot="end">
            {entries.length > 0 && (
              <IonButton fill="outline" style={{ color: 'white', borderColor: 'white', marginRight: '8px' }} onClick={handleClearAll}>
                Clear All
              </IonButton>
            )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen style={{ '--background': 'var(--bg-primary)' }}>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        <div style={{ padding: '8px 0' }}>
          {entries.length === 0 ? (
            <IonCard className="ion-margin ion-text-center animate-in" style={{ marginTop: '40px', background: 'transparent', boxShadow: 'none', border: 'none' }}>
              <IonCardContent>
                <IonIcon icon={timeOutline} style={{ fontSize: '64px', color: 'var(--ion-color-medium)', marginBottom: '16px' }} />
                <h2 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--ion-text-color)', fontFamily: 'Plus Jakarta Sans' }}>No analyses yet</h2>
                <p style={{ color: 'var(--ion-color-medium)', fontFamily: 'Plus Jakarta Sans' }}>Save your results to view them here.</p>
              </IonCardContent>
            </IonCard>
          ) : (
            <IonList style={{ background: 'transparent' }} lines="none">
              {entries.map(entry => (
                <HistoryItem key={entry.id} entry={entry} onDelete={handleDelete} onClick={handleItemClick} />
              ))}
            </IonList>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default History;
