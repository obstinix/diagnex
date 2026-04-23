import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonButton, IonList, IonItem, IonIcon, IonLabel, IonNote, useIonLoading, useIonToast } from '@ionic/react';
import { locationOutline, medkitOutline, pulseOutline, callOutline } from 'ionicons/icons';
import { getNearestHospitalUrl } from '../services/geolocation';

const DoctorFinder: React.FC = () => {
  const [presentLoading, dismissLoading] = useIonLoading();
  const [presentToast] = useIonToast();

  const handleFindNearest = async () => {
    await presentLoading({ message: 'Finding nearest hospital...' });
    try {
      const url = await getNearestHospitalUrl();
      dismissLoading();
      window.open(url, '_blank');
    } catch (err) {
      dismissLoading();
      presentToast({ message: 'Could not get location.', color: 'danger', duration: 3000 });
      window.open('https://www.google.com/maps/search/hospitals+near+me', '_blank');
    }
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--background': 'var(--accent-strong)' }}>
          <IonTitle style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'white' }}>Find Care</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen style={{ '--background': 'var(--bg-primary)' }} className="ion-padding">
        
        <IonCard className="animate-in" style={{ background: '#FFF0F3', boxShadow: '0 8px 32px rgba(232,90,90,0.1)', border: '1px solid #F0D6DA' }}>
          <IonCardContent className="ion-text-center" style={{ padding: '32px 16px' }}>
            <IonIcon icon={locationOutline} style={{ fontSize: '80px', color: '#E85A5A', marginBottom: '16px' }} />
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1A1A1A', marginBottom: '8px', fontFamily: 'var(--font-display)' }}>Need Immediate Care?</h2>
            <p style={{ color: '#6B6B6B', fontFamily: 'Plus Jakarta Sans', marginBottom: '24px' }}>Locate the closest medical facility instantly.</p>
            <IonButton expand="block" onClick={handleFindNearest} style={{ '--background': '#10B981', color: 'white', height: '54px', '--border-radius': '50px', fontFamily: 'Plus Jakarta Sans', fontWeight: 600, '--box-shadow': '0 8px 24px rgba(16,185,129,0.35)' }}>
              Find Nearest Hospital
            </IonButton>
          </IonCardContent>
        </IonCard>

        <IonCard className="animate-in" style={{ animationDelay: '0.1s', border: '1px solid #F0D6DA', boxShadow: '0 4px 24px rgba(232,90,90,0.05)', borderRadius: '16px' }}>
          <IonList lines="none">
            <IonItem button onClick={() => window.open('https://www.google.com/maps/search/urgent+care', '_blank')} style={{ '--padding-start': '16px', '--padding-end': '16px', '--padding-top': '8px', '--padding-bottom': '8px' }}>
              <div style={{ background: 'rgba(245,158,11,0.1)', padding: '12px', borderRadius: '12px', marginRight: '16px' }}>
                <IonIcon icon={pulseOutline} style={{ color: '#F59E0B', fontSize: '24px' }} />
              </div>
              <IonLabel>
                <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, color: '#1A1A1A', fontSize: '16px', marginBottom: '4px' }}>Urgent Care</h3>
                <IonNote style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '13px' }}>For non-life-threatening conditions</IonNote>
              </IonLabel>
            </IonItem>
            
            <div style={{ height: '1px', background: '#F0D6DA', margin: '0 16px' }}></div>

            <IonItem button onClick={() => window.open('https://www.google.com/maps/search/pharmacy', '_blank')} style={{ '--padding-start': '16px', '--padding-end': '16px', '--padding-top': '8px', '--padding-bottom': '8px' }}>
              <div style={{ background: 'rgba(232,90,90,0.1)', padding: '12px', borderRadius: '12px', marginRight: '16px' }}>
                <IonIcon icon={medkitOutline} style={{ color: '#E85A5A', fontSize: '24px' }} />
              </div>
              <IonLabel>
                <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 700, color: '#1A1A1A', fontSize: '16px', marginBottom: '4px' }}>Pharmacy</h3>
                <IonNote style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '13px' }}>Find a nearby pharmacy</IonNote>
              </IonLabel>
            </IonItem>
          </IonList>
        </IonCard>

        <IonCard className="animate-in" style={{ animationDelay: '0.2s', background: 'linear-gradient(135deg, #EF4444, #DC2626)', color: '#fff', borderRadius: '16px', border: 'none', boxShadow: '0 8px 32px rgba(239,68,68,0.3)' }}>
          <IonCardContent style={{ padding: '20px' }}>
            <IonList lines="none" style={{ background: 'transparent', padding: 0 }}>
              <IonItem style={{ '--background': 'transparent', color: '#fff', '--padding-start': 0, '--inner-padding-end': 0 }}>
                <IonIcon slot="start" icon={callOutline} style={{ color: '#fff', fontSize: '28px', marginRight: '16px' }} />
                <IonLabel>
                  <h3 style={{ color: '#fff', fontWeight: 700, fontFamily: 'var(--font-display)', fontSize: '18px', marginBottom: '4px' }}>Emergency</h3>
                  <p style={{ color: 'rgba(255,255,255,0.9)', fontFamily: 'DM Sans', fontSize: '14px', margin: 0 }}>Call local services</p>
                </IonLabel>
                <IonButton slot="end" fill="outline" style={{ '--color': '#fff', '--border-color': 'rgba(255,255,255,0.5)', '--border-radius': '50px', fontWeight: 600, fontFamily: 'DM Sans' }} href="tel:911">Call 911</IonButton>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default DoctorFinder;
