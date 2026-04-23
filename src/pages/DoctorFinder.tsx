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
      <IonHeader>
        <IonToolbar>
          <IonTitle style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Find Care</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonCard className="animate-in">
          <IonCardContent className="ion-text-center">
            <IonIcon icon={locationOutline} style={{ fontSize: '48px', color: 'var(--ion-color-primary)', marginBottom: '16px' }} />
            <h2 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--ion-text-color)', marginBottom: '16px' }}>Need Immediate Care?</h2>
            <IonButton expand="block" onClick={handleFindNearest} style={{ height: '48px', '--border-radius': '12px' }}>
              Find Nearest Hospital
            </IonButton>
          </IonCardContent>
        </IonCard>

        <IonCard className="animate-in" style={{ animationDelay: '0.1s' }}>
          <IonList lines="full">
            <IonItem button onClick={() => window.open('https://www.google.com/maps/search/urgent+care', '_blank')}>
              <IonIcon slot="start" icon={pulseOutline} color="secondary" />
              <IonLabel>
                <h3>Urgent Care</h3>
                <IonNote>For non-life-threatening conditions</IonNote>
              </IonLabel>
            </IonItem>
            <IonItem button onClick={() => window.open('https://www.google.com/maps/search/pharmacy', '_blank')}>
              <IonIcon slot="start" icon={medkitOutline} color="tertiary" />
              <IonLabel>
                <h3>Pharmacy</h3>
                <IonNote>Find a nearby pharmacy</IonNote>
              </IonLabel>
            </IonItem>
          </IonList>
        </IonCard>

        <IonCard className="animate-in" style={{ animationDelay: '0.2s', '--background': 'var(--ion-color-danger)', color: '#fff' }}>
          <IonCardContent>
            <IonList lines="none" style={{ background: 'transparent' }}>
              <IonItem style={{ '--background': 'transparent', color: '#fff' }}>
                <IonIcon slot="start" icon={callOutline} style={{ color: '#fff' }} />
                <IonLabel>
                  <h3 style={{ color: '#fff', fontWeight: 600 }}>Emergency Contacts</h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)' }}>Call local emergency services</p>
                </IonLabel>
                <IonButton slot="end" fill="outline" color="light" href="tel:911">Call 911</IonButton>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default DoctorFinder;
