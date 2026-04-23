import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonRefresher, IonRefresherContent, IonButtons, IonButton, useIonAlert, IonCard, IonCardContent, IonIcon } from '@ionic/react';
import { trashOutline, timeOutline } from 'ionicons/icons';
import { getHistory, deleteAnalysis, clearHistory } from '../services/storage';
import { AnalysisResult } from '../types';
import HistoryItem from '../components/HistoryItem';
import { useHistory as useRouterHistory } from 'react-router';

const History: React.FC = () => {
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [presentAlert] = useIonAlert();
  const routerHistory = useRouterHistory();

  const loadHistory = () => {
    setHistory(getHistory());
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleRefresh = (event: CustomEvent) => {
    loadHistory();
    event.detail.complete();
  };

  const handleDelete = (id: string) => {
    deleteAnalysis(id);
    loadHistory();
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
            clearHistory();
            loadHistory();
          }
        }
      ]
    });
  };

  const handleItemClick = (item: AnalysisResult) => {
    routerHistory.push({ pathname: '/results', state: { result: item, request: { symptoms: 'Historical data' } } });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>History</IonTitle>
          <IonButtons slot="end">
            {history.length > 0 && (
              <IonButton color="danger" onClick={handleClearAll}>
                <IonIcon slot="icon-only" icon={trashOutline} />
              </IonButton>
            )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        {history.length === 0 ? (
          <IonCard className="ion-margin ion-text-center" style={{ marginTop: '40px', background: 'transparent', boxShadow: 'none', border: 'none' }}>
            <IonCardContent>
              <IonIcon icon={timeOutline} style={{ fontSize: '64px', color: 'var(--ion-color-medium)', marginBottom: '16px' }} />
              <h2 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--ion-text-color)' }}>No analyses yet</h2>
              <p style={{ color: 'var(--ion-color-medium)' }}>Save your results to view them here.</p>
            </IonCardContent>
          </IonCard>
        ) : (
          <IonList>
            {history.map(item => (
              <HistoryItem key={item.id!} item={item} onDelete={handleDelete} onClick={handleItemClick} />
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default History;
