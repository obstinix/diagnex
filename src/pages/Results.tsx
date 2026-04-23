import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonList, IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonFab, IonFabButton, IonFabList, IonIcon, useIonToast, IonButton, IonBackButton, IonButtons } from '@ionic/react';
import { shareSocial, copyOutline, bookmarkOutline, addOutline, medkitOutline } from 'ionicons/icons';
import { useLocation, useHistory } from 'react-router';
import { AnalysisResult, AnalyzeRequest } from '../types';
import SeverityBadge from '../components/SeverityBadge';
import ConditionCard from '../components/ConditionCard';
import FollowUpFlow from '../components/FollowUpFlow';
import { saveAnalysis } from '../services/storage';

interface LocationState {
  result: AnalysisResult;
  request: AnalyzeRequest;
}

const Results: React.FC = () => {
  const location = useLocation<LocationState>();
  const history = useHistory();
  const [presentToast] = useIonToast();
  
  const [result, setResult] = useState<AnalysisResult | null>(location.state?.result || null);
  const request = location.state?.request;

  if (!result || !request) {
    return (
      <IonPage>
        <IonHeader><IonToolbar><IonTitle>Results</IonTitle></IonToolbar></IonHeader>
        <IonContent className="ion-padding">
          <p>No analysis found. Please start a new symptom check.</p>
          <IonButton routerLink="/home">Go Home</IonButton>
        </IonContent>
      </IonPage>
    );
  }

  const handleSave = () => {
    saveAnalysis(result);
    presentToast({ message: 'Analysis saved to history', duration: 2000, color: 'success' });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    presentToast({ message: 'Copied to clipboard', duration: 2000 });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Diagnex Analysis',
          text: `Severity: ${result.severityLabel}\n\nTop conditions:\n${result.conditions.map(c => `- ${c.name} (${c.likelihood}%)`).join('\n')}\n\n${result.urgencyMessage}`
        });
      } catch (err) {
        console.error('Error sharing', err);
      }
    } else {
      presentToast({ message: 'Sharing not supported on this device', duration: 2000 });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Analysis</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        
        <IonCard className="animate-in" style={{ margin: '0 0 16px 0', borderLeft: `4px solid ${result.severityColor}` }}>
          <IonCardContent className="ion-text-center">
            <SeverityBadge severity={result.severity} />
            <h2 style={{ marginTop: '16px', fontSize: '1.2rem', fontWeight: 600, color: 'var(--ion-text-color)' }}>
              {result.urgencyMessage}
            </h2>
            <p style={{ marginTop: '8px', fontSize: '0.85rem', color: 'var(--ion-color-medium)' }}>
              {result.disclaimer}
            </p>
          </IonCardContent>
        </IonCard>

        <IonCard className="animate-in" style={{ animationDelay: '0.1s', margin: '0 0 16px 0' }}>
          <IonCardContent>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px', color: 'var(--ion-color-primary)' }}>
              Possible Conditions
            </h3>
            <IonList lines="none" style={{ background: 'transparent' }}>
              {result.conditions.map((condition, idx) => (
                <ConditionCard 
                  key={idx} 
                  name={condition.name} 
                  likelihood={condition.likelihood} 
                  description={condition.description} 
                  severityColor={result.severityColor} 
                />
              ))}
            </IonList>
          </IonCardContent>
        </IonCard>

        <IonCard className="animate-in" style={{ animationDelay: '0.2s', margin: '0 0 16px 0' }}>
          <IonCardContent style={{ padding: 0 }}>
            <IonAccordionGroup value="recommendations">
              <IonAccordion value="recommendations" style={{ background: 'transparent' }}>
                <IonItem slot="header" color="transparent">
                  <IonIcon icon={medkitOutline} slot="start" color="primary" />
                  <IonLabel style={{ fontWeight: 600 }}>Recommendations</IonLabel>
                </IonItem>
                <div slot="content" className="ion-padding">
                  <ul style={{ paddingLeft: '20px', margin: 0, color: 'var(--ion-text-color)' }}>
                    {result.recommendations.map((rec, idx) => (
                      <li key={idx} style={{ marginBottom: '8px' }}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </IonAccordion>
            </IonAccordionGroup>
          </IonCardContent>
        </IonCard>

        <FollowUpFlow 
          questions={result.followUpQuestions} 
          initialRequest={request} 
          onUpdateResult={setResult} 
          onError={msg => presentToast({ message: msg, color: 'danger', duration: 3000 })} 
        />

        <div className="ion-padding" style={{ marginTop: '16px' }}>
          <IonButton expand="block" fill="outline" onClick={() => history.push('/home')}>
            Start New Analysis
          </IonButton>
        </div>

        <IonFab vertical="bottom" horizontal="end" slot="fixed" style={{ marginBottom: '60px' }}>
          <IonFabButton>
            <IonIcon icon={addOutline} />
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton onClick={handleSave} color="success">
              <IonIcon icon={bookmarkOutline} />
            </IonFabButton>
            <IonFabButton onClick={handleCopy} color="secondary">
              <IonIcon icon={copyOutline} />
            </IonFabButton>
            <IonFabButton onClick={handleShare} color="tertiary">
              <IonIcon icon={shareSocial} />
            </IonFabButton>
          </IonFabList>
        </IonFab>

      </IonContent>
    </IonPage>
  );
};

export default Results;
