import React, { useState, useEffect } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonInput, IonSelect, IonSelectOption, IonToggle, IonLabel, IonButton, IonButtons, useIonToast } from '@ionic/react';
import { PatientProfile } from '../types';
import { getProfile, saveProfile } from '../services/storage';

interface Props {
  onDismiss: () => void;
}

const defaultProfile: PatientProfile = {
  name: '', age: '', gender: '', bloodType: '', medications: '', allergies: '', emergencyContact: '', shareProfile: true
};

const ProfileModal: React.FC<Props> = ({ onDismiss }) => {
  const [profile, setProfile] = useState<PatientProfile>(defaultProfile);
  const [presentToast] = useIonToast();

  useEffect(() => {
    const p = getProfile();
    if (p) setProfile(p);
  }, []);

  const handleSave = () => {
    saveProfile(profile);
    presentToast({ message: 'Profile saved successfully', duration: 2000, color: 'success' });
    onDismiss();
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Patient Profile</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDismiss}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList inset>
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
        <div className="ion-padding">
          <IonButton expand="block" onClick={handleSave}>Save Profile</IonButton>
        </div>
      </IonContent>
    </>
  );
};

export default ProfileModal;
