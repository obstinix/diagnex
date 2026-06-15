import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonTextarea, IonButton, IonRange, IonButtons, IonIcon, useIonLoading, useIonToast, IonSegment, IonSegmentButton, IonLabel, IonSpinner, useIonRouter } from '@ionic/react';
import { settingsOutline, heart } from 'ionicons/icons';
import SymptomChips from '../components/SymptomChips';
import { analyzeSymptoms } from '../services/symptomEngine';
import { useHistory } from 'react-router';
import { getProfile } from '../services/storage';
import { AnalyzeRequest } from '../types';
import VitalsCard from '../components/VitalsCard';

const Home: React.FC = () => {
  const [symptoms, setSymptoms] = useState('');
  const [painLevel, setPainLevel] = useState<number>(1);
  const [severityScale, setSeverityScale] = useState('mild');
  const [bodyTemp, setBodyTemp] = useState<string>('');
  const [bpm,      setBpm]      = useState<string>('');
  const [spo2,     setSpo2]     = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [present] = useIonToast();
  const router = useIonRouter();

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
      present({ message: 'Please enter symptoms', duration: 2000, color: 'warning' });
      return;
    }

    setIsLoading(true);

    try {
      const profileRaw = localStorage.getItem('diagnex_profile');
      const profile    = profileRaw ? JSON.parse(profileRaw) : {};

      const profileWithInputs = {
        ...profile,
        painLevel,
        severityScale,
        bodyTemp: bodyTemp ? parseFloat(bodyTemp) : undefined,
        bpm:      bpm      ? parseInt(bpm)        : undefined,
        spo2:     spo2     ? parseInt(spo2)       : undefined,
      };

      const result = await analyzeSymptoms(symptoms.trim(), profileWithInputs);

      if (!result) throw new Error('Engine returned null');

      const resultWithMeta = {
        ...result,
        patientProfile: profile,
        analyzedAt:     new Date().toISOString(),
        symptomsText:   symptoms.trim(),
      };

      // Save result
      localStorage.setItem('diagnex_last_result', JSON.stringify(resultWithMeta));

      // Save request (BUG-1 fix)
      const requestObject: AnalyzeRequest = {
        symptoms:   symptoms.trim(),
        age:        profile.age,
        gender:     profile.gender,
        medications: profile.medications,
        allergies:  profile.allergies,
        bodyTemp:   bodyTemp ? parseFloat(bodyTemp) : undefined,
        bpm:        bpm      ? parseInt(bpm)        : undefined,
        spo2:       spo2     ? parseInt(spo2)       : undefined,
        profile:    profileWithInputs,
      };
      localStorage.setItem('diagnex_last_request', JSON.stringify(requestObject));

      // Save history
      const hist = JSON.parse(localStorage.getItem('diagnex_history') || '[]');
      hist.unshift({
        id:        Date.now().toString(),
        timestamp: new Date().toISOString(),
        symptoms:  symptoms.trim(),
        result:    resultWithMeta,
      });
      localStorage.setItem('diagnex_history', JSON.stringify(hist.slice(0, 20)));

      setIsLoading(false);
      router.push('/results', 'forward', 'push');

    } catch (err: any) {
      setIsLoading(false);
      present({
        message: 'Analysis failed: ' + (err.message || 'Unknown error'),
        duration: 3000,
        color: 'danger'
      });
    }
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--background': 'var(--accent-strong)', '--border-color': 'transparent' }}>
          <IonTitle style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '8px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'white', fontSize: '24px' }}>
              Diagnex <IonIcon icon={heart} style={{ color: '#FADADD', fontSize: '20px', animation: 'criticalPulse 2s infinite' }} />
            </div>
            <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px', fontWeight: 400, opacity: 0.75, letterSpacing: '0.5px', color: 'white', marginTop: '2px' }}>
              AI Health Assistant
            </div>
          </IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/profile" style={{ color: 'white' }}>
              <IonIcon slot="icon-only" icon={settingsOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen style={{ '--background': 'linear-gradient(160deg, #FFF5F7 0%, #FFF0F0 40%, #FFF5F0 100%)' }}>
        <style>
          {`
            .custom-textarea {
              background: white;
              border: 2px solid #F0D6DA;
              border-radius: 16px;
              padding: 16px;
              font-family: 'Plus Jakarta Sans', sans-serif;
              font-size: 15px;
              color: #1A1A1A;
              transition: all 0.2s ease;
              --padding-start: 0;
              --padding-end: 0;
              --padding-top: 0;
              --padding-bottom: 0;
              --background: transparent;
            }
            .custom-textarea.has-focus {
              border-color: #E85A5A;
              box-shadow: 0 0 0 3px rgba(232,90,90,0.1);
            }
            .custom-textarea::part(native) {
              color: #1A1A1A;
            }
            .custom-textarea::part(native)::placeholder {
              color: #6B6B6B;
            }
            
            .analyze-button {
              --background: linear-gradient(135deg, #E85A5A 0%, #FF6B6B 100%);
              --color: white;
              --border-radius: 50px;
              height: 54px;
              font-family: 'Plus Jakarta Sans', sans-serif;
              font-size: 16px;
              font-weight: 600;
              --box-shadow: 0 8px 28px rgba(232,90,90,0.35);
              transition: all 0.2s ease;
              width: 100%;
              margin: 0;
            }
            .analyze-button:hover {
              transform: translateY(-2px);
              --box-shadow: 0 12px 32px rgba(232,90,90,0.45);
            }
            .symptom-card {
              background: rgba(255,255,255,0.85);
              backdrop-filter: blur(20px);
              border: 1px solid #F0D6DA;
              border-radius: 24px;
              padding: 24px;
              box-shadow: var(--card-shadow);
              margin: 0;
              position: relative;
              z-index: 1;
            }
          `}
        </style>

        <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '300px', height: '300px', background: 'radial-gradient(circle, #FADADD 0%, transparent 70%)', opacity: 0.5, pointerEvents: 'none', zIndex: 0 }}></div>

        <div className="ion-padding" style={{ position: 'relative', zIndex: 1 }}>
          <IonCard className="animate-in symptom-card">
            <IonCardContent style={{ padding: 0 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '28px', color: '#1A1A1A', margin: '0 0 24px 0' }}>
                What's bothering you?
                <div style={{ borderBottom: '3px solid #E85A5A', width: '60px', marginTop: '4px' }}></div>
              </h2>
              
              <SymptomChips symptomsText={symptoms} onToggle={handleChipToggle} />
              
              <IonTextarea
                className="custom-textarea"
                value={symptoms}
                onIonInput={e => setSymptoms(e.detail.value!)}
                placeholder="Describe your symptoms in detail..."
                autoGrow
                maxlength={500}
                counter={true}
                style={{ marginBottom: '16px' }}
              />

              <div style={{ marginBottom: '16px' }}>
                <IonLabel style={{ fontWeight: 500, fontFamily: 'Plus Jakarta Sans', color: '#1A1A1A' }}>Pain Level (1-10)</IonLabel>
                <IonRange min={1} max={10} snaps={true} ticks={true} pin={true} value={painLevel} onIonChange={e => setPainLevel(e.detail.value as number)} />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <IonSegment value={severityScale} onIonChange={e => setSeverityScale(e.detail.value as string)} color="primary">
                  <IonSegmentButton value="mild"><IonLabel>Mild</IonLabel></IonSegmentButton>
                  <IonSegmentButton value="moderate"><IonLabel>Moderate</IonLabel></IonSegmentButton>
                  <IonSegmentButton value="severe"><IonLabel>Severe</IonLabel></IonSegmentButton>
                </IonSegment>
              </div>

              {/* VITALS INPUTS */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{
                  fontFamily: 'Plus Jakarta Sans', fontSize: '11px', fontWeight: 700,
                  letterSpacing: '1.5px', color: 'rgba(26,26,26,0.45)',
                  textTransform: 'uppercase', marginBottom: '12px',
                  borderLeft: '3px solid #E85A5A', paddingLeft: '8px',
                }}>
                  Biometrics (optional)
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  {/* BPM */}
                  <div style={{ flex: 1 }}>
                    <label style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                      Heart Rate (BPM)
                    </label>
                    <input
                      type="number"
                      inputMode="numeric"
                      placeholder="e.g. 72"
                      min={20} max={300}
                      value={bpm}
                      onChange={e => setBpm(e.target.value)}
                      style={{
                        width: '100%', padding: '10px 12px', borderRadius: '12px',
                        border: '1.5px solid #F0D6DA', fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '14px', color: '#1A1A1A', background: 'white',
                        outline: 'none', boxSizing: 'border-box',
                      }}
                      onFocus={e => (e.target.style.borderColor = '#E85A5A')}
                      onBlur={e  => (e.target.style.borderColor = '#F0D6DA')}
                    />
                  </div>

                  {/* TEMPERATURE */}
                  <div style={{ flex: 1 }}>
                    <label style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                      Temperature (°F)
                    </label>
                    <input
                      type="number"
                      inputMode="decimal"
                      placeholder="e.g. 98.6"
                      min={90} max={110} step={0.1}
                      value={bodyTemp}
                      onChange={e => setBodyTemp(e.target.value)}
                      style={{
                        width: '100%', padding: '10px 12px', borderRadius: '12px',
                        border: '1.5px solid #F0D6DA', fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '14px', color: '#1A1A1A', background: 'white',
                        outline: 'none', boxSizing: 'border-box',
                      }}
                      onFocus={e => (e.target.style.borderColor = '#E85A5A')}
                      onBlur={e  => (e.target.style.borderColor = '#F0D6DA')}
                    />
                  </div>

                  {/* SpO2 */}
                  <div style={{ flex: 1 }}>
                    <label style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                      SpO₂ (%)
                    </label>
                    <input
                      type="number"
                      inputMode="numeric"
                      placeholder="e.g. 98"
                      min={70} max={100}
                      value={spo2}
                      onChange={e => setSpo2(e.target.value)}
                      style={{
                        width: '100%', padding: '10px 12px', borderRadius: '12px',
                        border: '1.5px solid #F0D6DA', fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '14px', color: '#1A1A1A', background: 'white',
                        outline: 'none', boxSizing: 'border-box',
                      }}
                      onFocus={e => (e.target.style.borderColor = '#E85A5A')}
                      onBlur={e  => (e.target.style.borderColor = '#F0D6DA')}
                    />
                  </div>
                </div>

                {/* live preview — only show if any value is entered */}
                {(bpm || bodyTemp || spo2) && (
                  <div style={{ marginTop: '12px' }}>
                    <VitalsCard
                      bpm={bpm      ? parseInt(bpm)        : undefined}
                      temp={bodyTemp ? parseFloat(bodyTemp) : undefined}
                      spo2={spo2     ? parseInt(spo2)       : undefined}
                    />
                  </div>
                )}
              </div>

              <IonButton className="analyze-button" expand="block" disabled={isLoading} onClick={handleAnalyze}>
                {isLoading ? <IonSpinner name="crescent" color="light" /> : 'Analyze Symptoms'}
              </IonButton>
            </IonCardContent>
          </IonCard>
          
          <div className="ion-text-center" style={{ marginTop: '24px', opacity: 0.6 }}>
            <IonLabel style={{ fontSize: '0.8rem', fontFamily: 'Plus Jakarta Sans', color: '#1A1A1A' }}>Diagnex is not a substitute for professional medical advice.</IonLabel>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
