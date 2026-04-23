import { jsPDF } from 'jspdf';
import { Chart, registerables } from 'chart.js';
import QRCode from 'qrcode';
import { AnalysisResult, PatientProfile, AnalyzeRequest } from '../types';

Chart.register(...registerables);

function createChartCanvas(config: any): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 400;
    document.body.appendChild(canvas);
    
    // Disable animations for immediate render
    if (!config.options) config.options = {};
    config.options.animation = false;
    config.options.responsive = false;
    
    const chart = new Chart(canvas, config);
    
    setTimeout(() => {
      const dataUrl = canvas.toDataURL('image/png');
      chart.destroy();
      document.body.removeChild(canvas);
      resolve(dataUrl);
    }, 100);
  });
}

export async function generatePDFReport(result: AnalysisResult, request: AnalyzeRequest, profile?: PatientProfile) {
  const doc = new jsPDF({ format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  const accentColor = '#E85A5A';
  const pinkStrip = '#FADADD';
  
  const profileData = localStorage.getItem('diagnex_profile');
  const activeProfile = profile || (profileData ? JSON.parse(profileData) : {});
  const patientName = activeProfile.name || 'Anonymous Patient';

  const addWatermark = () => {
    doc.setFontSize(80);
    doc.setTextColor(240, 240, 240); // very light gray
    doc.text('CONFIDENTIAL', pageWidth / 2, pageHeight / 2, { align: 'center', angle: 45 });
  };
  
  const addHeader = (title: string) => {
    addWatermark();
    doc.setFillColor(pinkStrip);
    doc.rect(0, 0, pageWidth, 20, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(accentColor);
    doc.text(title, 15, 14);
  };
  
  const addFooter = (pageNum: number) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(150);
    const dateStr = new Date().toLocaleDateString();
    doc.text(`Patient: ${patientName} | Generated: ${dateStr} | Diagnex Health`, 15, pageHeight - 10);
    doc.text(`Page ${pageNum}`, pageWidth - 25, pageHeight - 10);
  };

  // PAGE 1: COVER
  addWatermark();
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(36);
  doc.setTextColor(accentColor);
  doc.text('Diagnex', pageWidth / 2, 60, { align: 'center' });
  
  doc.setFontSize(20);
  doc.setTextColor(50);
  doc.text('Health Analysis Report', pageWidth / 2, 75, { align: 'center' });
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.text(`Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, pageWidth / 2, 90, { align: 'center' });
  
  const boxY = 100;
  doc.setDrawColor('#F0D6DA');
  doc.setFillColor('#FFF5F7');
  doc.rect(40, boxY, pageWidth - 80, 50, 'FD');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(accentColor);
  doc.text('PATIENT INFORMATION', 45, boxY + 8);
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(50);
  doc.setFontSize(10);
  doc.text(`Name: ${activeProfile.name || 'Guest'}`, 45, boxY + 16);
  doc.text(`Age: ${activeProfile.age || 'N/A'}`, 45, boxY + 22);
  doc.text(`Gender: ${activeProfile.gender || 'N/A'}`, 45, boxY + 28);
  if (activeProfile.name) {
    doc.text(`Allergies: ${activeProfile.allergies || 'None'}`, 45, boxY + 34);
    doc.text(`Medications: ${activeProfile.medications || 'None'}`, 45, boxY + 40);
  }
  doc.text(`Report Date: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`, 120, boxY + 16);
  doc.text(`Report ID: DX-${Math.floor(Math.random() * 10000)}`, 120, boxY + 22);

  const severityY = 160;
  doc.setFillColor(result.severityColor);
  doc.roundedRect(pageWidth / 2 - 40, severityY, 80, 20, 3, 3, 'F');
  doc.setTextColor('#FFFFFF');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(result.severityLabel.toUpperCase(), pageWidth / 2, severityY + 14, { align: 'center' });
  
  doc.setTextColor(150);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Disclaimer: This is not a medical diagnosis. Always consult a licensed physician.', pageWidth / 2, pageHeight - 30, { align: 'center' });
  
  addFooter(1);

  // PAGE 2: SUMMARY
  doc.addPage();
  addHeader('Analysis Summary');
  
  let y = 40;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(0);
  doc.text('Symptoms Entered:', 15, y);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  y += 10;
  
  const splitSymptoms = doc.splitTextToSize(request.symptoms || 'None provided.', pageWidth - 30);
  doc.text(splitSymptoms, 15, y);
  y += (splitSymptoms.length * 6) + 10;
  
  doc.setFillColor(result.severityColor);
  doc.rect(15, y, 5, 20, 'F');
  doc.setFont('helvetica', 'bold');
  doc.text('Urgency Level:', 25, y + 8);
  doc.setFont('helvetica', 'normal');
  doc.text(result.urgencyMessage, 25, y + 16);
  y += 35;
  
  doc.setFont('helvetica', 'bold');
  doc.text('Top Conditions:', 15, y);
  y += 10;
  doc.setFont('helvetica', 'normal');
  result.conditions.slice(0, 3).forEach(c => {
    doc.text(`• ${c.name} (${c.likelihood}%)`, 20, y);
    y += 8;
  });
  y += 10;
  
  doc.setFont('helvetica', 'bold');
  doc.text('Recommendations:', 15, y);
  y += 10;
  doc.setFont('helvetica', 'normal');
  result.recommendations.forEach((r, idx) => {
    const splitRec = doc.splitTextToSize(`${idx + 1}. ${r}`, pageWidth - 30);
    doc.text(splitRec, 20, y);
    y += (splitRec.length * 6) + 2;
  });
  
  addFooter(2);

  // PAGE 3: CHARTS
  doc.addPage();
  addHeader('Visual Charts');
  
  const pieDataUrl = await createChartCanvas({
    type: 'pie',
    data: {
      labels: result.conditions.slice(0, 5).map(c => c.name),
      datasets: [{
        data: result.conditions.slice(0, 5).map(c => c.likelihood),
        backgroundColor: ['#E85A5A', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6']
      }]
    },
    options: { plugins: { title: { display: true, text: 'Condition Likelihood Distribution' } } }
  });
  doc.addImage(pieDataUrl, 'PNG', 20, 30, 80, 55);

  const barDataUrl = await createChartCanvas({
    type: 'bar',
    data: {
      labels: ['Severity Weight', 'Risk Factor', 'Match Confidence'],
      datasets: [{
        label: 'Factors',
        data: [
          result.severity === 'critical' ? 10 : result.severity === 'high' ? 7 : 4,
          (activeProfile.age && parseInt(activeProfile.age) > 60) ? 8 : 3,
          result.conditions[0]?.likelihood || 0
        ],
        backgroundColor: '#E85A5A'
      }]
    },
    options: { indexAxis: 'y', plugins: { title: { display: true, text: 'Symptom Severity Factors' } } }
  });
  doc.addImage(barDataUrl, 'PNG', 110, 30, 80, 55);

  const sysMatches = result.system_matches || [];
  const radarDataUrl = await createChartCanvas({
    type: 'radar',
    data: {
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
        backgroundColor: 'rgba(232, 90, 90, 0.4)',
        borderColor: '#E85A5A'
      }]
    },
    options: { plugins: { title: { display: true, text: 'Health Risk Profile' } }, scales: { r: { min: 0, max: 10 } } }
  });
  doc.addImage(radarDataUrl, 'PNG', 20, 100, 80, 55);

  let riskScore = 20;
  if (result.severity === 'medium') riskScore = 50;
  if (result.severity === 'high') riskScore = 80;
  if (result.severity === 'critical') riskScore = 95;
  
  const gaugeDataUrl = await createChartCanvas({
    type: 'doughnut',
    data: {
      labels: ['Risk', 'Safe'],
      datasets: [{
        data: [riskScore, 100 - riskScore],
        backgroundColor: [riskScore > 60 ? '#EF4444' : riskScore > 30 ? '#F59E0B' : '#10B981', '#E2E8F0'],
        circumference: 180,
        rotation: 270
      }]
    },
    options: { plugins: { title: { display: true, text: `Overall Risk Score: ${riskScore}/100` } } }
  });
  doc.addImage(gaugeDataUrl, 'PNG', 110, 100, 80, 55);

  addFooter(3);

  // PAGE 4: FOLLOW-UP
  doc.addPage();
  addHeader('Follow-up & Guidance');
  
  y = 40;
  doc.setFont('helvetica', 'bold');
  doc.text('When to seek emergency care:', 15, y);
  y += 10;
  doc.setFont('helvetica', 'normal');
  const erList = [
    '• Difficulty breathing or shortness of breath',
    '• Chest pain or pressure',
    '• New confusion or inability to arouse',
    '• Pale, gray, or blue-colored skin, lips, or nail beds'
  ];
  erList.forEach(line => {
    doc.text(line, 20, y);
    y += 8;
  });
  
  y += 15;
  doc.setFont('helvetica', 'bold');
  doc.text('Conditions to Rule Out:', 15, y);
  y += 10;
  doc.setFont('helvetica', 'normal');
  result.conditions.slice(3, 8).forEach(c => {
    doc.text(`• ${c.name}`, 20, y);
    y += 8;
  });
  
  y += 20;
  const qrDataUrl = await QRCode.toDataURL('https://diagnex.netlify.app');
  doc.addImage(qrDataUrl, 'PNG', pageWidth / 2 - 25, y, 50, 50);
  doc.setFont('helvetica', 'italic');
  doc.text('Scan to visit Diagnex', pageWidth / 2, y + 60, { align: 'center' });

  addFooter(4);
  
  doc.save('Diagnex_Report.pdf');
}
