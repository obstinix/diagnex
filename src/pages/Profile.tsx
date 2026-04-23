import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonInput, IonSelect, IonSelectOption, IonToggle, IonLabel, IonButton, useIonToast, IonAvatar } from '@ionic/react';
import { PatientProfile } from '../types';
import { getProfile, saveProfile } from '../services/storage';

const defaultProfile: PatientProfile = {
  name: '', age: '', gender: '', bloodType: '', medications: '', allergies: '', emergencyContact: '', shareProfile: true
};

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<PatientProfile>(defaultProfile);
  const [presentToast] = useIonToast();

  useEffect(() => {
    const p = getProfile();
    if (p) setProfile(p);
  }, []);

  const handleSave = () => {
    saveProfile(profile);
    presentToast({ message: 'Profile saved successfully', duration: 2000, color: 'success' });
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
            .save-button {
              --background: #E85A5A;
              --color: white;
              --border-radius: 50px;
              height: 54px;
              font-family: 'Plus Jakarta Sans', sans-serif;
              font-size: 16px;
              font-weight: 600;
              --box-shadow: 0 8px 24px rgba(232,90,90,0.35);
              transition: all 0.2s ease;
              margin-top: 24px;
            }
            .save-button:hover {
              transform: translateY(-2px);
              --box-shadow: 0 12px 28px rgba(232,90,90,0.45);
            }
          `}
        </style>
        <div className="ion-padding animate-in">
          
          <div className="ion-text-center ion-margin-bottom" style={{ marginTop: '16px' }}>
            <IonAvatar style={{ width: '80px', height: '80px', margin: '0 auto', background: '#FADADD', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E85A5A', fontSize: '2rem', fontWeight: 'bold', boxShadow: '0 8px 24px rgba(232,90,90,0.25)' }}>
              {profile.name ? profile.name.charAt(0).toUpperCase() : '?'}
            </IonAvatar>
          </div>

          <div style={sectionHeaderStyle}>Personal Details</div>
          
          <IonList lines="none" style={{ background: 'transparent', padding: 0 }}>
            <IonItem className="profile-input">
              <IonInput label="Full Name" labelPlacement="stacked" value={profile.name} onIonInput={e => setProfile({...profile, name: e.detail.value!})} />
            </IonItem>
            <div style={{ display: 'flex', gap: '12px' }}>
              <IonItem className="profile-input" style={{ flex: 1 }}>
                <IonInput type="number" label="Age" labelPlacement="stacked" value={profile.age} onIonInput={e => setProfile({...profile, age: e.detail.value!})} />
              </IonItem>
              <IonItem className="profile-input" style={{ flex: 1 }}>
                <IonSelect label="Gender" labelPlacement="stacked" value={profile.gender} onIonChange={e => setProfile({...profile, gender: e.detail.value})}>
                  <IonSelectOption value="Male">Male</IonSelectOption>
                  <IonSelectOption value="Female">Female</IonSelectOption>
                  <IonSelectOption value="Other">Other</IonSelectOption>
                </IonSelect>
              </IonItem>
            </div>
            <IonItem className="profile-input">
              <IonSelect label="Blood Type" labelPlacement="stacked" value={profile.bloodType} onIonChange={e => setProfile({...profile, bloodType: e.detail.value})}>
                <IonSelectOption value="A+">A+</IonSelectOption>
                <IonSelectOption value="A-">A-</IonSelectOption>
                <IonSelectOption value="B+">B+</IonSelectOption>
                <IonSelectOption value="B-">B-</IonSelectOption>
                <IonSelectOption value="AB+">AB+</IonSelectOption>
                <IonSelectOption value="AB-">AB-</IonSelectOption>
                <IonSelectOption value="O+">O+</IonSelectOption>
                <IonSelectOption value="O-">O-</IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonList>

          <div style={sectionHeaderStyle}>Medical History</div>

          <IonList lines="none" style={{ background: 'transparent', padding: 0 }}>
            <IonItem className="profile-input">
              <IonInput label="Medications" labelPlacement="stacked" value={profile.medications} onIonInput={e => setProfile({...profile, medications: e.detail.value!})} />
            </IonItem>
            <IonItem className="profile-input">
              <IonInput label="Allergies" labelPlacement="stacked" value={profile.allergies} onIonInput={e => setProfile({...profile, allergies: e.detail.value!})} />
            </IonItem>
          </IonList>

          <div style={sectionHeaderStyle}>Emergency</div>

          <IonList lines="none" style={{ background: 'transparent', padding: 0 }}>
            <IonItem className="profile-input">
              <IonInput type="tel" label="Emergency Contact" labelPlacement="stacked" value={profile.emergencyContact} onIonInput={e => setProfile({...profile, emergencyContact: e.detail.value!})} />
            </IonItem>
            
            <IonItem className="profile-input" style={{ marginTop: '16px' }}>
              <IonToggle checked={profile.shareProfile} onIonChange={e => setProfile({...profile, shareProfile: e.detail.checked})}>
                <IonLabel style={{ fontFamily: 'DM Sans', fontWeight: 600, color: '#1B3A6B' }}>Share profile with AI</IonLabel>
              </IonToggle>
            </IonItem>
          </IonList>

          <IonButton expand="block" className="save-button" onClick={handleSave}>Save Profile</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
