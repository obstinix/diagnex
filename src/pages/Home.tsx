import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonTextarea, IonButton, IonRange, IonButtons, IonIcon, useIonLoading, useIonToast, IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';
import { settingsOutline } from 'ionicons/icons';
import SymptomChips from '../components/SymptomChips';
import { analyzeSymptoms } from '../services/api';
import { useHistory } from 'react-router';
import { getProfile } from '../services/storage';

const Home: React.FC = () => {
  const [symptoms, setSymptoms] = useState('');
  const [painLevel, setPainLevel] = useState<number>(1);
  const [severityScale, setSeverityScale] = useState('mild');
  const [loading, setLoading] = useState(false);
  const [presentLoading, dismissLoading] = useIonLoading();
  const [presentToast] = useIonToast();
  const history = useHistory();

  const handleChipToggle = (symptom: string) => {
    setSymptoms(prev => {
      const lowerPrev = prev.toLowerCase();
      const lowerSymptom = symptom.toLowerCase();
      if (lowerPrev.includes(lowerSymptom)) {
        const regex = new RegExp(`\\b${symptom}\\b,?\\s*`, 'gi');
        return prev.replace(regex, '').replace(/,\s*$/, '').trim();
      } else {
        return prev ? `${prev}, ${symptom}` : symptom;
      }
    });
  };

  const handleAnalyze = async () => {
    if (!symptoms.trim()) {
      presentToast({ message: 'Please describe your symptoms first.', duration: 2000, color: 'warning' });
      return;
    }

    setLoading(true);
    await presentLoading({ message: 'Analyzing symptoms...' });

    try {
      const profile = getProfile();
      const payload = {
        symptoms: `${symptoms}. Pain level: ${painLevel}/10. Reported severity: ${severityScale}.`,
        ...(profile?.shareProfile ? {
          age: profile.age,
          gender: profile.gender,
          medications: profile.medications,
          allergies: profile.allergies
        } : {})
      };

      const result = await analyzeSymptoms(payload);
      dismissLoading();
      setLoading(false);
      history.push({ pathname: '/results', state: { result, request: payload } });
    } catch (err: any) {
      dismissLoading();
      setLoading(false);
      presentToast({ message: err.message || 'Failed to analyze symptoms. Please try again.', duration: 3000, color: 'danger' });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Diagnex</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/profile">
              <IonIcon slot="icon-only" icon={settingsOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonCard className="animate-in">
          <IonCardContent>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', marginBottom: '16px', color: 'var(--ion-color-primary)' }}>What's bothering you?</h2>
            
            <SymptomChips symptomsText={symptoms} onToggle={handleChipToggle} />
            
            <IonTextarea
              value={symptoms}
              onIonInput={e => setSymptoms(e.detail.value!)}
              placeholder="Describe your symptoms in detail..."
              autoGrow
              maxlength={500}
              counter={true}
              style={{ background: 'rgba(240,244,248,0.5)', padding: '8px', borderRadius: '8px', marginBottom: '16px' }}
            />

            <div style={{ marginBottom: '16px' }}>
              <IonLabel style={{ fontWeight: 500 }}>Pain Level (1-10)</IonLabel>
              <IonRange min={1} max={10} snaps={true} ticks={true} pin={true} value={painLevel} onIonChange={e => setPainLevel(e.detail.value as number)} />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <IonSegment value={severityScale} onIonChange={e => setSeverityScale(e.detail.value as string)}>
                <IonSegmentButton value="mild"><IonLabel>Mild</IonLabel></IonSegmentButton>
                <IonSegmentButton value="moderate"><IonLabel>Moderate</IonLabel></IonSegmentButton>
                <IonSegmentButton value="severe"><IonLabel>Severe</IonLabel></IonSegmentButton>
              </IonSegment>
            </div>

            <IonButton expand="block" color="primary" disabled={loading} style={{ height: '48px', '--border-radius': '12px' }} onClick={handleAnalyze}>
              Analyze Symptoms
            </IonButton>
          </IonCardContent>
        </IonCard>
        
        <div className="ion-text-center" style={{ marginTop: '24px', opacity: 0.6 }}>
          <IonLabel style={{ fontSize: '0.8rem' }}>Diagnex is not a substitute for professional medical advice.</IonLabel>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
