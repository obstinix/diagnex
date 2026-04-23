import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonFabList, IonIcon, useIonToast, IonButton, IonBackButton, IonButtons } from '@ionic/react';
import { shareSocial, copyOutline, bookmarkOutline, addOutline, checkmarkCircle } from 'ionicons/icons';
import { useLocation, useHistory } from 'react-router';
import { AnalysisResult, AnalyzeRequest } from '../types';
import ConditionCard from '../components/ConditionCard';
import FollowUpFlow from '../components/FollowUpFlow';
import { saveAnalysis } from '../services/storage';
import DownloadReportButton from '../components/DownloadReportButton';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, RadialLinearScale, PointElement, LineElement, Filler } from 'chart.js';
import { Bar, Doughnut, Radar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, RadialLinearScale, PointElement, LineElement, Filler);

const Results: React.FC = () => {
  const history = useHistory();
  const [presentToast] = useIonToast();
  
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [request, setRequest] = useState<AnalyzeRequest | null>(null);

  useEffect(() => {
    const res = localStorage.getItem('diagnex_last_result');
    const req = localStorage.getItem('diagnex_last_request');
    if (res && req) {
      setResult(JSON.parse(res));
      setRequest(JSON.parse(req));
    }
  }, []);

  if (!result || !request) {
    return (
      <IonPage>
        <IonHeader className="ion-no-border">
          <IonToolbar style={{ '--background': 'var(--accent-strong)' }}>
            <IonTitle style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'white' }}>Results</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding" style={{ '--background': 'var(--bg-primary)' }}>
          <p style={{ fontFamily: 'Plus Jakarta Sans', textAlign: 'center', marginTop: '40px', color: 'var(--text-secondary)' }}>No analysis found. Please start a new symptom check.</p>
          <IonButton expand="block" routerLink="/home" style={{ '--background': 'var(--accent-strong)' }}>Go Home</IonButton>
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
          text: `Severity: ${result.severityLabel}\n\nTop conditions:\n${result.conditions?.map(c => `- ${c.name} (${c.likelihood}%)`).join('\n')}\n\n${result.urgencyMessage}`
        });
      } catch (err) {
        console.error('Error sharing', err);
      }
    } else {
      presentToast({ message: 'Sharing not supported on this device', duration: 2000 });
    }
  };

  let bannerConfig = { bg: '#D1FAE5', border: '#10B981', icon: '✅' };
  if (result.severity === 'medium') bannerConfig = { bg: '#FEF3C7', border: '#F59E0B', icon: '⚠️' };
  else if (result.severity === 'high') bannerConfig = { bg: '#FFE4CC', border: '#F97316', icon: '🔶' };
  else if (result.severity === 'critical') bannerConfig = { bg: '#FFD6D6', border: '#EF4444', icon: '🚨' };

  const barData = {
    labels: result.conditions?.slice(0, 5).map(c => c.name) || [],
    datasets: [{
      label: 'Likelihood %',
      data: result.conditions?.slice(0, 5).map(c => c.likelihood) || [],
      backgroundColor: result.conditions?.slice(0, 5).map(c => c.likelihood > 60 ? '#EF4444' : c.likelihood > 30 ? '#F59E0B' : '#10B981'),
      borderRadius: 4
    }]
  };

  const sysMatches = result.system_matches || [];
  const radarData = {
    labels: ['Cardiovascular', 'Respiratory', 'Neurological', 'Digestive', 'Infectious', 'Metabolic'],
    datasets: [{
      label: 'System Affected',
      data: [
        sysMatches.includes('Cardiovascular') ? 10 : 2,
        sysMatches.includes('Respiratory') ? 10 : 2,
        sysMatches.includes('Neurological') ? 10 : 2,
        sysMatches.includes('Digestive') ? 10 : 2,
        sysMatches.includes('Infectious') ? 10 : 2,
        sysMatches.includes('Metabolic') ? 10 : 2
      ],
      backgroundColor: 'rgba(250, 218, 221, 0.6)',
      borderColor: '#E85A5A',
      borderWidth: 2,
      pointBackgroundColor: '#E85A5A'
    }]
  };

  let riskScore = 20;
  if (result.severity === 'medium') riskScore = 50;
  if (result.severity === 'high') riskScore = 80;
  if (result.severity === 'critical') riskScore = 95;

  const gaugeData = {
    labels: ['Risk', 'Safe'],
    datasets: [{
      data: [riskScore, 100 - riskScore],
      backgroundColor: [riskScore > 60 ? '#EF4444' : riskScore > 30 ? '#F59E0B' : '#10B981', '#F0D6DA'],
      circumference: 180,
      rotation: 270,
      borderWidth: 0,
      cutout: '80%'
    }]
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--background': 'var(--accent-strong)' }}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" style={{ color: 'white' }} />
          </IonButtons>
          <IonTitle style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'white' }}>Analysis</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen style={{ '--background': 'var(--bg-primary)' }} className="ion-padding">
        
        <div className="animate-in" style={{ 
          background: bannerConfig.bg, 
          borderLeft: `5px solid ${bannerConfig.border}`, 
          borderRadius: '16px', 
          padding: '20px', 
          marginBottom: '24px',
          boxShadow: '0 4px 24px rgba(232, 90, 90, 0.08)',
          animation: result.severity === 'critical' ? 'criticalPulse 2s infinite' : 'none'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{ fontSize: '24px' }}>{bannerConfig.icon}</span>
            <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: '#1A1A1A', fontFamily: 'var(--font-display)' }}>
              {result.severityLabel}
            </h2>
          </div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'Plus Jakarta Sans' }}>
            {result.urgencyMessage}
          </h3>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', fontFamily: 'Plus Jakarta Sans' }}>
            {result.disclaimer}
          </p>
        </div>

        {/* CHARTS */}
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px', color: 'var(--text-primary)' }}>Visual Insights</h3>
        
        <div style={{ background: 'white', borderRadius: '16px', padding: '16px', marginBottom: '16px', border: '1px solid var(--border-color)', boxShadow: '0 4px 24px rgba(232,90,90,0.05)' }}>
          <h4 style={{ margin: '0 0 16px 0', fontFamily: 'Plus Jakarta Sans', fontSize: '14px', fontWeight: 700, color: '#1A1A1A' }}>Condition Likelihood</h4>
          <Bar data={barData} options={{ indexAxis: 'y', animation: { duration: 1000 }, plugins: { legend: { display: false } }, scales: { x: { max: 100 } } }} />
        </div>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
          <div style={{ flex: 1, background: 'white', borderRadius: '16px', padding: '16px', border: '1px solid var(--border-color)', boxShadow: '0 4px 24px rgba(232,90,90,0.05)' }}>
            <h4 style={{ margin: '0 0 8px 0', fontFamily: 'Plus Jakarta Sans', fontSize: '14px', fontWeight: 700, color: '#1A1A1A', textAlign: 'center' }}>Affected Systems</h4>
            <Radar data={radarData} options={{ plugins: { legend: { display: false } }, scales: { r: { ticks: { display: false }, min: 0, max: 10 } } }} />
          </div>
          <div style={{ flex: 1, background: 'white', borderRadius: '16px', padding: '16px', border: '1px solid var(--border-color)', boxShadow: '0 4px 24px rgba(232,90,90,0.05)', position: 'relative' }}>
            <h4 style={{ margin: '0 0 8px 0', fontFamily: 'Plus Jakarta Sans', fontSize: '14px', fontWeight: 700, color: '#1A1A1A', textAlign: 'center' }}>Risk Score</h4>
            <div style={{ position: 'relative', marginTop: '20px' }}>
              <Doughnut data={gaugeData} options={{ plugins: { legend: { display: false }, tooltip: { enabled: false } }, rotation: -90, circumference: 180 }} />
              <div style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', textAlign: 'center', fontFamily: 'Cormorant Garamond', fontSize: '28px', fontWeight: 700, color: '#1A1A1A' }}>{riskScore}</div>
            </div>
          </div>
        </div>

        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px', color: 'var(--text-primary)' }}>
          Possible Conditions
        </h3>
        
        {result.conditions?.map((condition, idx) => (
          <ConditionCard 
            key={idx} 
            name={condition.name} 
            likelihood={condition.likelihood} 
            description={condition.description} 
            severityColor={result.severityColor} 
          />
        ))}

        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, margin: '24px 0 16px 0', color: 'var(--text-primary)' }}>
          Recommendations
        </h3>
        
        <div style={{ background: 'white', borderRadius: '16px', padding: '0 16px', border: '1px solid var(--border-color)' }}>
          {result.recommendations?.map((rec, idx) => (
            <div key={idx} style={{ 
              display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '16px 0',
              borderBottom: idx < result.recommendations.length - 1 ? '1px solid #F0D6DA' : 'none'
            }}>
              <IonIcon icon={checkmarkCircle} style={{ color: '#10B981', fontSize: '20px', marginTop: '2px', flexShrink: 0 }} />
              <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px', color: '#6B6B6B', lineHeight: '1.5' }}>
                {rec}
              </div>
            </div>
          ))}
        </div>

        <DownloadReportButton result={result} request={request} />

        <FollowUpFlow 
          questions={result.followUpQuestions || []} 
          initialRequest={request} 
          onUpdateResult={(newRes) => {
            setResult(newRes);
            localStorage.setItem('diagnex_last_result', JSON.stringify(newRes));
          }} 
          onError={msg => presentToast({ message: msg, color: 'danger', duration: 3000 })} 
        />

        <div style={{ marginTop: '32px', marginBottom: '24px' }}>
          <IonButton expand="block" fill="outline" style={{ height: '50px', '--border-radius': '50px', fontFamily: 'Plus Jakarta Sans', fontWeight: 600, '--border-color': 'var(--border-color)', '--color': 'var(--accent-strong)' }} onClick={() => history.push('/home')}>
            Start New Analysis
          </IonButton>
        </div>

        <IonFab vertical="bottom" horizontal="end" slot="fixed" style={{ marginBottom: '16px' }}>
          <IonFabButton style={{ '--background': 'var(--accent-strong)' }}>
            <IonIcon icon={addOutline} />
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton onClick={handleSave} style={{ '--background': '#10B981', '--color': 'white' }}>
              <IonIcon icon={bookmarkOutline} />
            </IonFabButton>
            <IonFabButton onClick={handleCopy} style={{ '--background': '#F59E0B', '--color': 'white' }}>
              <IonIcon icon={copyOutline} />
            </IonFabButton>
            <IonFabButton onClick={handleShare} style={{ '--background': '#3B82F6', '--color': 'white' }}>
              <IonIcon icon={shareSocial} />
            </IonFabButton>
          </IonFabList>
        </IonFab>

      </IonContent>
    </IonPage>
  );
};

export default Results;
