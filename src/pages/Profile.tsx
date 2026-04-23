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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        
        <div className="ion-text-center ion-margin-bottom">
          <IonAvatar style={{ width: '80px', height: '80px', margin: '0 auto', background: 'var(--ion-color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '2rem', fontWeight: 'bold' }}>
            {profile.name ? profile.name.charAt(0).toUpperCase() : '?'}
          </IonAvatar>
        </div>

        <IonList inset style={{ borderRadius: 'var(--diagnex-radius)' }}>
          <IonItem>
            <IonInput label="Full Name" labelPlacement="stacked" value={profile.name} onIonInput={e => setProfile({...profile, name: e.detail.value!})} />
          </IonItem>
          <IonItem>
            <IonInput type="number" label="Age" labelPlacement="stacked" value={profile.age} onIonInput={e => setProfile({...profile, age: e.detail.value!})} />
          </IonItem>
          <IonItem>
            <IonSelect label="Gender" labelPlacement="stacked" value={profile.gender} onIonChange={e => setProfile({...profile, gender: e.detail.value})}>
              <IonSelectOption value="Male">Male</IonSelectOption>
              <IonSelectOption value="Female">Female</IonSelectOption>
              <IonSelectOption value="Other">Other</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
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
          <IonItem>
            <IonInput label="Medications" labelPlacement="stacked" value={profile.medications} onIonInput={e => setProfile({...profile, medications: e.detail.value!})} />
          </IonItem>
          <IonItem>
            <IonInput label="Allergies" labelPlacement="stacked" value={profile.allergies} onIonInput={e => setProfile({...profile, allergies: e.detail.value!})} />
          </IonItem>
          <IonItem>
            <IonInput type="tel" label="Emergency Contact" labelPlacement="stacked" value={profile.emergencyContact} onIonInput={e => setProfile({...profile, emergencyContact: e.detail.value!})} />
          </IonItem>
          <IonItem lines="none">
            <IonToggle checked={profile.shareProfile} onIonChange={e => setProfile({...profile, shareProfile: e.detail.checked})}>
              <IonLabel>Share profile with AI analysis</IonLabel>
            </IonToggle>
          </IonItem>
        </IonList>
        <div className="ion-padding" style={{ marginTop: '16px' }}>
          <IonButton expand="block" style={{ height: '48px', '--border-radius': '12px' }} onClick={handleSave}>Save Profile</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
