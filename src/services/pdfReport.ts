import { jsPDF } from 'jspdf';
import { Chart, registerables } from 'chart.js';
import QRCode from 'qrcode';

Chart.register(...registerables);

function createChartCanvas(config: any): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 400;
    document.body.appendChild(canvas);
    
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

export const generatePDFReport = async (analysisResult: any) => {
  const profile = analysisResult.patientProfile || {};
  const name = profile.name || 'Anonymous Patient';
  const age = profile.age || 'N/A';
  const gender = profile.gender || 'N/A';
  const bloodType = profile.bloodType || 'N/A';
  const allergies = profile.allergies || 'None reported';
  const medications = profile.medications || 'None reported';
  const emergency = profile.emergencyContact || 'Not provided';
  const date = new Date(analysisResult.analyzedAt || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const reportId = 'DX-' + Date.now().toString().slice(-6);

  const doc = new jsPDF({ format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const accentColor = '#E85A5A';

  const addFooter = (pageNum: number) => {
    doc.setDrawColor('#F0D6DA');
    doc.setLineWidth(0.5);
    doc.line(15, pageHeight - 15, pageWidth - 15, pageHeight - 15);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(150);
    doc.text(`Patient: ${name} | DOB Age: ${age}`, 15, pageHeight - 8);
    doc.text('CONFIDENTIAL', pageWidth / 2, pageHeight - 8, { align: 'center' });
    doc.text(`Page ${pageNum} of 4 | ${date}`, pageWidth - 15, pageHeight - 8, { align: 'right' });
  };

  const addWatermark = () => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(60);
    doc.setTextColor(250, 240, 242);
    doc.text('CONFIDENTIAL', pageWidth / 2, pageHeight / 2, { align: 'center', angle: 45 });
  };

  // PAGE 1: COVER PAGE
  addWatermark();
  doc.setFillColor(accentColor);
  doc.rect(0, 0, pageWidth, 40, 'F');
  doc.setTextColor('#FFFFFF');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('DIAGNEX HEALTH ANALYSIS REPORT', pageWidth / 2, 25, { align: 'center' });

  doc.setTextColor(accentColor);
  doc.setFontSize(40);
  doc.text('Diagnex', pageWidth / 2, 70, { align: 'center' });
  doc.setTextColor(150);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text('AI-Powered Health Intelligence', pageWidth / 2, 80, { align: 'center' });

  const boxY = 110;
  doc.setDrawColor('#F0D6DA');
  doc.setLineWidth(0.5);
  doc.setFillColor('#FFF5F7');
  doc.roundedRect(pageWidth / 2 - 80, boxY, 160, 110, 4, 4, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(accentColor);
  doc.text('PATIENT INFORMATION', pageWidth / 2 - 70, boxY + 15);
  doc.setDrawColor('#F0D6DA');
  doc.line(pageWidth / 2 - 70, boxY + 20, pageWidth / 2 + 70, boxY + 20);

  doc.setTextColor(50);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  let lineY = boxY + 30;
  const leftX = pageWidth / 2 - 70;
  const rightX = pageWidth / 2 - 20;

  doc.setFont('helvetica', 'bold'); doc.text('Full Name:', leftX, lineY); doc.setFont('helvetica', 'normal'); doc.text(name, rightX, lineY); lineY += 8;
  doc.setFont('helvetica', 'bold'); doc.text('Age:', leftX, lineY); doc.setFont('helvetica', 'normal'); doc.text(`${age} years`, rightX, lineY); lineY += 8;
  doc.setFont('helvetica', 'bold'); doc.text('Gender:', leftX, lineY); doc.setFont('helvetica', 'normal'); doc.text(gender, rightX, lineY); lineY += 8;
  doc.setFont('helvetica', 'bold'); doc.text('Blood Type:', leftX, lineY); doc.setFont('helvetica', 'normal'); doc.text(bloodType, rightX, lineY); lineY += 8;
  doc.setFont('helvetica', 'bold'); doc.text('Known Allergies:', leftX, lineY); doc.setFont('helvetica', 'normal'); doc.text(allergies, rightX, lineY); lineY += 8;
  doc.setFont('helvetica', 'bold'); doc.text('Medications:', leftX, lineY); doc.setFont('helvetica', 'normal'); doc.text(medications, rightX, lineY); lineY += 8;
  doc.setFont('helvetica', 'bold'); doc.text('Emergency:', leftX, lineY); doc.setFont('helvetica', 'normal'); doc.text(emergency, rightX, lineY); lineY += 12;

  doc.line(leftX, lineY - 6, pageWidth / 2 + 70, lineY - 6);

  doc.setFont('helvetica', 'bold'); doc.text('Report ID:', leftX, lineY); doc.setFont('helvetica', 'normal'); doc.text(reportId, rightX, lineY); lineY += 8;
  doc.setFont('helvetica', 'bold'); doc.text('Generated:', leftX, lineY); doc.setFont('helvetica', 'normal'); doc.text(date, rightX, lineY); lineY += 8;
  doc.setFont('helvetica', 'bold'); doc.text('Analysis Time:', leftX, lineY); doc.setFont('helvetica', 'normal'); doc.text(new Date(analysisResult.analyzedAt || Date.now()).toLocaleTimeString(), rightX, lineY);

  const sevColors = { low: '#10B981', medium: '#F59E0B', high: '#F97316', critical: '#EF4444' };
  const sevBg = sevColors[analysisResult.severity as keyof typeof sevColors] || sevColors.low;
  
  doc.setFillColor(sevBg);
  doc.rect(pageWidth / 2 - 80, boxY + 130, 160, 20, 'F');
  doc.setTextColor('#FFFFFF');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(`RISK LEVEL: ${(analysisResult.severity || 'UNKNOWN').toUpperCase()}`, pageWidth / 2, boxY + 144, { align: 'center' });

  doc.setTextColor(150);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('CONFIDENTIAL — For personal use only', pageWidth / 2, pageHeight - 30, { align: 'center' });
  doc.text('Diagnex is not a substitute for professional medical advice', pageWidth / 2, pageHeight - 25, { align: 'center' });

  addFooter(1);

  // PAGE 2: ANALYSIS SUMMARY
  doc.addPage();
  addWatermark();
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(accentColor);
  doc.text('ANALYSIS SUMMARY', 15, 30);

  doc.setFontSize(14);
  doc.setTextColor(50);
  doc.text('Symptoms Reported', 15, 45);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  const symps = (analysisResult.symptomsText || '').split(',').map((s: string) => s.trim()).filter(Boolean);
  let y = 55;
  symps.forEach((s: string) => {
    doc.text(`• ${s}`, 20, y);
    y += 7;
  });

  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Urgency Assessment', 15, y);
  y += 10;
  doc.setFillColor(sevBg);
  doc.rect(15, y, 5, 20, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text(analysisResult.urgencyMessage || '', 25, y + 12);
  
  y += 35;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Possible Conditions', 15, y);
  y += 10;
  
  doc.setFillColor(accentColor);
  doc.rect(15, y, pageWidth - 30, 10, 'F');
  doc.setTextColor('#FFFFFF');
  doc.setFontSize(11);
  doc.text('Condition', 20, y + 7);
  doc.text('Likelihood', 80, y + 7);
  doc.text('Description', 110, y + 7);
  
  y += 10;
  doc.setTextColor(50);
  doc.setFont('helvetica', 'normal');
  const conds = analysisResult.conditions || [];
  conds.slice(0, 4).forEach((c: any, i: number) => {
    if (i % 2 === 0) {
      doc.setFillColor('#FFF5F7');
      doc.rect(15, y, pageWidth - 30, 12, 'F');
    }
    doc.text(c.name.substring(0, 25), 20, y + 8);
    doc.text(`${c.likelihood}%`, 80, y + 8);
    doc.text(c.description.substring(0, 45) + (c.description.length > 45 ? '...' : ''), 110, y + 8);
    y += 12;
  });

  y += 15;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Recommendations', 15, y);
  y += 10;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  (analysisResult.recommendations || []).forEach((r: string, i: number) => {
    doc.setTextColor(accentColor);
    doc.text('✓', 15, y);
    doc.setTextColor(50);
    doc.text(`${i + 1}. ${r}`, 25, y);
    y += 8;
  });

  if (allergies !== 'None reported' || medications !== 'None reported') {
    y += 10;
    doc.setFillColor('#FFF5F7');
    doc.rect(15, y, pageWidth - 30, 20, 'F');
    doc.setTextColor(accentColor);
    doc.text(`Note: Analysis considers your reported allergies (${allergies}) and current medications (${medications})`, 20, y + 12);
  }

  addFooter(2);

  // PAGE 3: CHARTS
  doc.addPage();
  addWatermark();
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(accentColor);
  doc.text(`Health Risk Charts — ${name}`, 15, 30);
  
  const pieDataUrl = await createChartCanvas({
    type: 'pie',
    data: {
      labels: conds.slice(0, 5).map((c:any) => c.name),
      datasets: [{
        data: conds.slice(0, 5).map((c:any) => c.likelihood),
        backgroundColor: ['#E85A5A', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6']
      }]
    },
    options: { plugins: { title: { display: true, text: 'Condition Likelihood Distribution' } } }
  });
  doc.addImage(pieDataUrl, 'PNG', 20, 40, 80, 55);

  const barDataUrl = await createChartCanvas({
    type: 'bar',
    data: {
      labels: ['Severity', 'Risk Factor', 'Confidence'],
      datasets: [{
        label: 'Factors',
        data: [
          analysisResult.severity === 'critical' ? 10 : analysisResult.severity === 'high' ? 7 : 4,
          (age && parseInt(age as string) > 60) ? 8 : 3,
          conds[0]?.likelihood || 0
        ],
        backgroundColor: '#E85A5A'
      }]
    },
    options: { indexAxis: 'y', plugins: { title: { display: true, text: 'Symptom Severity Factors' } } }
  });
  doc.addImage(barDataUrl, 'PNG', 110, 40, 80, 55);

  const sysMatches = analysisResult.system_matches || [];
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
  doc.addImage(radarDataUrl, 'PNG', 20, 110, 80, 55);

  let riskScore = 20;
  if (analysisResult.severity === 'medium') riskScore = 50;
  if (analysisResult.severity === 'high') riskScore = 80;
  if (analysisResult.severity === 'critical') riskScore = 95;
  
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
  doc.addImage(gaugeDataUrl, 'PNG', 110, 110, 80, 55);

  addFooter(3);

  // PAGE 4: FOLLOW-UP
  doc.addPage();
  addWatermark();
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(accentColor);
  doc.text('FOLLOW-UP GUIDANCE', 15, 30);
  
  y = 50;
  doc.setFontSize(14);
  doc.setTextColor(50);
  doc.text('When to seek emergency care:', 15, y);
  y += 10;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
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
  
  y += 20;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Conditions to Rule Out:', 15, y);
  y += 10;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  conds.slice(3, 8).forEach((c: any) => {
    doc.text(`• ${c.name}`, 20, y);
    y += 8;
  });
  
  y += 30;
  const qrDataUrl = await QRCode.toDataURL('https://diagnex.netlify.app');
  doc.addImage(qrDataUrl, 'PNG', pageWidth / 2 - 25, y, 50, 50);
  doc.setFont('helvetica', 'italic');
  doc.text('Scan to visit Diagnex', pageWidth / 2, y + 60, { align: 'center' });

  addFooter(4);

  doc.save(`Diagnex_Report_${name.replace(/\s+/g, '_')}.pdf`);
};
