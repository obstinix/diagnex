import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonLabel, IonAvatar, useIonToast, IonTextarea, useIonViewWillEnter } from '@ionic/react';
import { PatientProfile } from '../types';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<PatientProfile>({
    name: '', age: '', gender: '', bloodType: '',
    allergies: '', medications: '', emergencyContact: '', shareProfile: true
  });
  const [presentToast] = useIonToast();

  useIonViewWillEnter(() => {
    const saved = localStorage.getItem('diagnex_profile');
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  });

  const updateField = (field: string, value: string) => {
    const updated = { ...profile, [field as keyof PatientProfile]: value };
    setProfile(updated as PatientProfile);
    localStorage.setItem('diagnex_profile', JSON.stringify(updated));
    presentToast({
      message: '✓ Saved',
      duration: 1500,
      position: 'top',
      color: 'success'
    });
  };

  const sectionHeaderStyle: React.CSSProperties = {
    fontFamily: 'Plus Jakarta Sans', 
    fontSize: '11px', 
    fontWeight: 700, 
    letterSpacing: '1.5px', 
    color: 'rgba(26,26,26,0.5)', 
    marginBottom: '12px', 
    marginTop: '24px',
    textTransform: 'uppercase',
    borderLeft: '3px solid #E85A5A', 
    paddingLeft: '8px'
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--background': 'var(--accent-strong)' }}>
          <IonTitle style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'white' }}>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen style={{ '--background': 'var(--bg-primary)' }}>
        <style>
          {`
            .profile-input {
              --background: white;
              --border-radius: 16px;
              --padding-start: 16px;
              --padding-end: 16px;
              --padding-top: 12px;
              --padding-bottom: 12px;
              border: 2px solid #F0D6DA;
              border-radius: 16px;
              margin-bottom: 12px;
              font-family: 'Plus Jakarta Sans', sans-serif;
              color: #1A1A1A;
              transition: all 0.2s ease;
            }
            .profile-input.item-has-focus {
              border-color: #E85A5A;
              box-shadow: 0 0 0 3px rgba(232,90,90,0.1);
            }
            .info-card {
              background: #FFF5F7;
              border: 1px solid #F0D6DA;
              border-radius: 12px;
              padding: 16px;
              margin-top: 32px;
              margin-bottom: 32px;
              display: flex;
              gap: 12px;
            }
          `}
        </style>

        <div className="ion-padding animate-in">
          <div className="ion-text-center ion-margin-bottom" style={{ marginTop: '16px' }}>
            <IonAvatar style={{ width: '80px', height: '80px', margin: '0 auto', background: '#E85A5A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2rem', fontWeight: 'bold', boxShadow: '0 8px 24px rgba(232,90,90,0.25)' }}>
              {profile.name ? profile.name.charAt(0).toUpperCase() : '?'}
            </IonAvatar>
          </div>

          <div style={sectionHeaderStyle}>Basic Information</div>
          
          <IonItem className="profile-input" lines="none">
            <IonLabel position="stacked" style={{ color: '#6B6B6B', marginBottom: '8px' }}>Full Name</IonLabel>
            <IonInput value={profile.name} placeholder="e.g. Piyush" onIonInput={e => updateField('name', e.detail.value! as string)} />
          </IonItem>

          <div style={{ display: 'flex', gap: '12px' }}>
            <IonItem className="profile-input" lines="none" style={{ flex: 1 }}>
              <IonLabel position="stacked" style={{ color: '#6B6B6B', marginBottom: '8px' }}>Age</IonLabel>
              <IonInput type="number" value={profile.age} placeholder="e.g. 21" onIonInput={e => updateField('age', e.detail.value! as string)} />
            </IonItem>
            <IonItem className="profile-input" lines="none" style={{ flex: 1 }}>
              <IonLabel position="stacked" style={{ color: '#6B6B6B', marginBottom: '8px' }}>Gender</IonLabel>
              <IonInput value={profile.gender} placeholder="e.g. Male" onIonInput={e => updateField('gender', e.detail.value! as string)} />
            </IonItem>
          </div>

          <IonItem className="profile-input" lines="none">
            <IonLabel position="stacked" style={{ color: '#6B6B6B', marginBottom: '8px' }}>Blood Type</IonLabel>
            <IonInput value={profile.bloodType} placeholder="e.g. O-" onIonInput={e => updateField('bloodType', e.detail.value! as string)} />
          </IonItem>

          <div style={sectionHeaderStyle}>Medical Details</div>

          <IonItem className="profile-input" lines="none">
            <IonLabel position="stacked" style={{ color: '#6B6B6B', marginBottom: '8px' }}>Known Allergies</IonLabel>
            <IonTextarea rows={3} value={profile.allergies} placeholder="List any known allergies..." onIonInput={e => updateField('allergies', e.detail.value! as string)} />
          </IonItem>

          <IonItem className="profile-input" lines="none">
            <IonLabel position="stacked" style={{ color: '#6B6B6B', marginBottom: '8px' }}>Current Medications</IonLabel>
            <IonTextarea rows={3} value={profile.medications} placeholder="List current medications..." onIonInput={e => updateField('medications', e.detail.value! as string)} />
          </IonItem>

          <div style={sectionHeaderStyle}>Emergency</div>

          <IonItem className="profile-input" lines="none">
            <IonLabel position="stacked" style={{ color: '#6B6B6B', marginBottom: '8px' }}>Emergency Contact</IonLabel>
            <IonInput value={profile.emergencyContact} placeholder="Name & Phone Number" onIonInput={e => updateField('emergencyContact', e.detail.value! as string)} />
          </IonItem>

          <div className="info-card">
            <div style={{ fontSize: '20px' }}>ℹ️</div>
            <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '13px', color: '#6B6B6B', lineHeight: '1.5' }}>
              Your profile data is stored only on this device and used to personalize your health analysis.
            </div>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
