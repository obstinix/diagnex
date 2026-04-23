import React from 'react';
import { IonButton, IonIcon, useIonLoading } from '@ionic/react';
import { downloadOutline } from 'ionicons/icons';
import { generatePDFReport } from '../services/pdfReport';
import { AnalysisResult, AnalyzeRequest } from '../types';
import { getProfile } from '../services/storage';

interface Props {
  result: AnalysisResult;
  request: AnalyzeRequest;
}

const DownloadReportButton: React.FC<Props> = ({ result, request }) => {
  const [present, dismiss] = useIonLoading();

  const handleDownload = async () => {
    await present({ message: 'Generating your report...' });
    try {
      const profile = getProfile();
      await generatePDFReport(result, request, profile || undefined);
    } catch (err) {
      console.error(err);
    } finally {
      dismiss();
    }
  };

  return (
    <IonButton expand="block" onClick={handleDownload} style={{ '--background': '#E85A5A', color: 'white', height: '54px', '--border-radius': '50px', fontFamily: 'DM Sans', fontWeight: 600, '--box-shadow': '0 8px 24px rgba(232,90,90,0.35)', marginTop: '24px' }}>
      <IonIcon slot="start" icon={downloadOutline} />
      Download Full Report (PDF)
    </IonButton>
  );
};

export default DownloadReportButton;
