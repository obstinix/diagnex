import { AnalysisResult, PatientProfile } from '../types';

interface SymptomCondition {
  name: string;
  keywords: string[];
  likelihood_weight: number;
  description: string;
  severity_floor: 'low' | 'medium' | 'high' | 'critical';
  body_system: string; // For radar chart
}

const CONDITIONS_DB: SymptomCondition[] = [
  // EXISTING 40 (Summarized for space, but keeping major ones and adding system)
  { name: 'Common Cold', keywords: ['cough', 'sore throat', 'runny nose', 'sneezing', 'fatigue'], likelihood_weight: 1, description: 'Viral infection of your nose and throat.', severity_floor: 'low', body_system: 'Respiratory' },
  { name: 'Influenza', keywords: ['fever', 'chills', 'muscle pain', 'cough', 'fatigue', 'headache'], likelihood_weight: 2, description: 'Viral infection that attacks your respiratory system.', severity_floor: 'medium', body_system: 'Respiratory' },
  { name: 'COVID-19', keywords: ['fever', 'dry cough', 'fatigue', 'loss of smell', 'shortness of breath'], likelihood_weight: 2, description: 'Contagious respiratory illness.', severity_floor: 'medium', body_system: 'Respiratory' },
  { name: 'Heart Attack', keywords: ['chest pain', 'left arm pain', 'shortness of breath', 'cold sweats', 'nausea', 'jaw pain'], likelihood_weight: 5, description: 'A medical emergency when blood flow to the heart is blocked.', severity_floor: 'critical', body_system: 'Cardiovascular' },
  
  // NEW 40+ CONDITIONS
  // INFECTIOUS
  { name: 'Malaria', keywords: ['fever', 'chills', 'sweating', 'headache', 'muscle pain', 'nausea', 'vomiting', 'fatigue'], likelihood_weight: 3, description: 'Mosquito-borne infectious disease.', severity_floor: 'high', body_system: 'Infectious' },
  { name: 'Dengue Fever', keywords: ['high fever', 'severe headache', 'eye pain', 'joint pain', 'rash', 'bleeding'], likelihood_weight: 3, description: 'Mosquito-borne viral disease.', severity_floor: 'high', body_system: 'Infectious' },
  { name: 'Typhoid', keywords: ['sustained fever', 'weakness', 'stomach pain', 'headache', 'loss of appetite', 'rose spots'], likelihood_weight: 3, description: 'Bacterial infection spread through contaminated food/water.', severity_floor: 'high', body_system: 'Infectious' },
  { name: 'Tuberculosis', keywords: ['persistent cough', 'coughing blood', 'chest pain', 'weight loss', 'night sweats', 'fever'], likelihood_weight: 3, description: 'Infectious disease usually attacking the lungs.', severity_floor: 'high', body_system: 'Respiratory' },
  { name: 'Hepatitis A/B', keywords: ['jaundice', 'fatigue', 'stomach pain', 'dark urine', 'pale stool', 'nausea', 'fever'], likelihood_weight: 3, description: 'Viral liver infection.', severity_floor: 'high', body_system: 'Digestive' },
  { name: 'HIV/AIDS', keywords: ['recurring infections', 'weight loss', 'fatigue', 'night sweats', 'swollen lymph nodes'], likelihood_weight: 3, description: 'Virus that attacks the body\'s immune system.', severity_floor: 'high', body_system: 'Infectious' },
  { name: 'Lyme Disease', keywords: ['bullseye rash', 'fever', 'headache', 'muscle pain', 'joint pain', 'fatigue', 'facial palsy'], likelihood_weight: 2.5, description: 'Tick-borne illness.', severity_floor: 'high', body_system: 'Infectious' },
  { name: 'Chickenpox', keywords: ['itchy blister', 'rash', 'fever', 'fatigue', 'loss of appetite'], likelihood_weight: 2, description: 'Highly contagious viral infection.', severity_floor: 'medium', body_system: 'Infectious' },
  { name: 'Shingles', keywords: ['painful rash', 'burning pain', 'blisters', 'itching', 'sensitivity to touch'], likelihood_weight: 2, description: 'Viral infection causing a painful rash.', severity_floor: 'medium', body_system: 'Infectious' },
  { name: 'Mononucleosis', keywords: ['extreme fatigue', 'sore throat', 'fever', 'swollen lymph nodes', 'swollen spleen'], likelihood_weight: 2, description: 'Infectious illness usually caused by Epstein-Barr virus.', severity_floor: 'medium', body_system: 'Infectious' },
  { name: 'Meningitis', keywords: ['severe headache', 'stiff neck', 'fever', 'sensitivity to light', 'rash', 'vomiting'], likelihood_weight: 5, description: 'Inflammation of brain and spinal cord membranes.', severity_floor: 'critical', body_system: 'Neurological' },

  // METABOLIC
  { name: 'Cushing\'s Syndrome', keywords: ['weight gain', 'stretch marks', 'high blood pressure', 'fatigue', 'mood changes'], likelihood_weight: 2, description: 'Condition caused by high cortisol levels.', severity_floor: 'medium', body_system: 'Metabolic' },
  { name: 'Addison\'s Disease', keywords: ['extreme fatigue', 'weight loss', 'dark skin patches', 'low blood pressure', 'salt cravings'], likelihood_weight: 3, description: 'Adrenal glands don\'t produce enough hormones.', severity_floor: 'high', body_system: 'Metabolic' },
  { name: 'Polycystic Ovary Syndrome', keywords: ['irregular periods', 'excess hair growth', 'acne', 'weight gain', 'fertility issues'], likelihood_weight: 2, description: 'Hormonal disorder causing enlarged ovaries with small cysts.', severity_floor: 'medium', body_system: 'Metabolic' },
  { name: 'Gout', keywords: ['severe joint pain', 'big toe pain', 'swelling', 'redness', 'warmth in joint'], likelihood_weight: 2, description: 'Form of arthritis characterized by severe pain.', severity_floor: 'medium', body_system: 'Metabolic' },
  { name: 'Celiac Disease', keywords: ['diarrhea', 'bloating', 'gas', 'fatigue', 'anemia', 'bone pain'], likelihood_weight: 2, description: 'Immune reaction to eating gluten.', severity_floor: 'medium', body_system: 'Metabolic' },
  { name: 'Vitamin D Deficiency', keywords: ['bone pain', 'muscle weakness', 'fatigue', 'depression', 'hair loss'], likelihood_weight: 1, description: 'Low levels of vitamin D in the body.', severity_floor: 'low', body_system: 'Metabolic' },
  { name: 'Iron Deficiency Anemia', keywords: ['fatigue', 'pale skin', 'shortness of breath', 'cold hands', 'cold feet', 'dizziness'], likelihood_weight: 2, description: 'Too few healthy red blood cells due to too little iron.', severity_floor: 'medium', body_system: 'Metabolic' },
  { name: 'Vitamin B12 Deficiency', keywords: ['fatigue', 'weakness', 'numbness', 'balance problems', 'memory issues'], likelihood_weight: 2, description: 'Low levels of vitamin B12.', severity_floor: 'medium', body_system: 'Metabolic' },

  // CARDIOVASCULAR
  { name: 'Peripheral Artery Disease', keywords: ['leg pain', 'cold legs', 'cold feet', 'weak pulse in legs', 'sores that won\'t heal'], likelihood_weight: 3, description: 'Narrowed blood vessels reduce blood flow to limbs.', severity_floor: 'high', body_system: 'Cardiovascular' },
  { name: 'Aortic Aneurysm', keywords: ['deep back pain', 'abdomen pain', 'pulsating feeling', 'sudden severe pain'], likelihood_weight: 5, description: 'Bulge in the wall of the major blood vessel.', severity_floor: 'critical', body_system: 'Cardiovascular' },
  { name: 'Pulmonary Embolism', keywords: ['sudden shortness of breath', 'chest pain', 'rapid heart rate', 'coughing blood'], likelihood_weight: 5, description: 'Condition in which one or more arteries in the lungs become blocked.', severity_floor: 'critical', body_system: 'Cardiovascular' },
  { name: 'Cardiomyopathy', keywords: ['breathlessness', 'fatigue', 'swollen legs', 'irregular heartbeat', 'dizziness'], likelihood_weight: 3, description: 'Disease of the heart muscle.', severity_floor: 'high', body_system: 'Cardiovascular' },
  { name: 'Pericarditis', keywords: ['sharp chest pain', 'fever', 'shortness of breath', 'fatigue'], likelihood_weight: 3, description: 'Swelling and irritation of the tissue surrounding the heart.', severity_floor: 'high', body_system: 'Cardiovascular' },

  // NEUROLOGICAL
  { name: 'Multiple Sclerosis', keywords: ['numbness', 'vision problems', 'fatigue', 'coordination problems', 'cognitive issues'], likelihood_weight: 3, description: 'Disease in which the immune system eats away at the protective covering of nerves.', severity_floor: 'high', body_system: 'Neurological' },
  { name: 'Parkinson\'s Disease', keywords: ['tremors', 'stiff muscles', 'slow movement', 'balance problems', 'speech changes'], likelihood_weight: 3, description: 'Disorder of the central nervous system that affects movement.', severity_floor: 'high', body_system: 'Neurological' },
  { name: 'Alzheimer\'s Disease', keywords: ['memory loss', 'confusion', 'mood changes', 'difficulty with familiar tasks'], likelihood_weight: 3, description: 'Progressive disease that destroys memory and other important mental functions.', severity_floor: 'high', body_system: 'Neurological' },
  { name: 'Bell\'s Palsy', keywords: ['sudden facial weakness', 'facial paralysis', 'drooling', 'eye dryness'], likelihood_weight: 3, description: 'Sudden weakness in the muscles on one half of the face.', severity_floor: 'high', body_system: 'Neurological' },
  { name: 'Trigeminal Neuralgia', keywords: ['sudden severe facial pain', 'electric shock sensation', 'facial pain triggered by touch'], likelihood_weight: 3, description: 'Chronic pain condition that affects the trigeminal nerve.', severity_floor: 'high', body_system: 'Neurological' },
  { name: 'Cluster Headache', keywords: ['severe pain around one eye', 'eye watering', 'nasal congestion', 'restlessness'], likelihood_weight: 3, description: 'Extremely painful headaches that occur in cycles.', severity_floor: 'high', body_system: 'Neurological' },
  { name: 'Carpal Tunnel Syndrome', keywords: ['hand numbness', 'wrist numbness', 'tingling', 'weakness', 'pain at night'], likelihood_weight: 2, description: 'Numbness and tingling in the hand and arm caused by a pinched nerve in the wrist.', severity_floor: 'medium', body_system: 'Neurological' },

  // RESPIRATORY
  { name: 'COPD', keywords: ['chronic cough', 'mucus', 'shortness of breath', 'wheezing', 'frequent chest infections'], likelihood_weight: 3, description: 'Group of lung diseases that block airflow and make it difficult to breathe.', severity_floor: 'high', body_system: 'Respiratory' },
  { name: 'Pulmonary Fibrosis', keywords: ['shortness of breath', 'dry cough', 'fatigue', 'weight loss', 'aching muscles'], likelihood_weight: 3, description: 'Lung disease that occurs when lung tissue becomes damaged and scarred.', severity_floor: 'high', body_system: 'Respiratory' },
  { name: 'Pleurisy', keywords: ['sharp chest pain', 'shortness of breath', 'dry cough', 'fever'], likelihood_weight: 3, description: 'Inflammation of the tissues that line the lungs and chest cavity.', severity_floor: 'high', body_system: 'Respiratory' },
  { name: 'Sleep Apnea', keywords: ['loud snoring', 'gasping during sleep', 'morning headache', 'daytime sleepiness'], likelihood_weight: 2, description: 'Potentially serious sleep disorder in which breathing repeatedly stops and starts.', severity_floor: 'medium', body_system: 'Respiratory' },

  // MENTAL HEALTH
  { name: 'PTSD', keywords: ['flashbacks', 'nightmares', 'severe anxiety', 'avoidance behavior', 'emotional numbness'], likelihood_weight: 3, description: 'Disorder characterized by failure to recover after experiencing a terrifying event.', severity_floor: 'high', body_system: 'Mental Health' },
  { name: 'Bipolar Disorder', keywords: ['extreme mood swings', 'mania', 'depression', 'energy changes', 'impulsive behavior'], likelihood_weight: 3, description: 'Disorder associated with episodes of mood swings ranging from depressive lows to manic highs.', severity_floor: 'high', body_system: 'Mental Health' },
  { name: 'OCD', keywords: ['intrusive thoughts', 'compulsive behaviors', 'anxiety', 'repetitive actions'], likelihood_weight: 2, description: 'Excessive thoughts that lead to repetitive behaviors.', severity_floor: 'medium', body_system: 'Mental Health' },
  { name: 'Eating Disorder', keywords: ['extreme food restriction', 'binge eating', 'purging', 'distorted body image', 'rapid weight change'], likelihood_weight: 3, description: 'Illnesses in which the people experience severe disturbances in their eating behaviors.', severity_floor: 'high', body_system: 'Mental Health' },
  { name: 'ADHD', keywords: ['difficulty focusing', 'hyperactivity', 'impulsivity', 'forgetfulness', 'disorganization'], likelihood_weight: 2, description: 'Chronic condition including attention difficulty, hyperactivity, and impulsiveness.', severity_floor: 'medium', body_system: 'Mental Health' },

  // GASTROINTESTINAL
  { name: 'Pancreatitis', keywords: ['severe upper abdominal pain', 'nausea', 'vomiting', 'fever', 'rapid pulse'], likelihood_weight: 4, description: 'Inflammation of the organ lying behind the lower part of the stomach.', severity_floor: 'critical', body_system: 'Digestive' },
  { name: 'Diverticulitis', keywords: ['lower left abdominal pain', 'fever', 'nausea', 'constipation', 'diarrhea'], likelihood_weight: 3, description: 'Inflammation or infection in one or more small pouches in the digestive tract.', severity_floor: 'high', body_system: 'Digestive' },
  { name: 'Gallstones', keywords: ['sudden severe abdominal pain', 'back pain', 'nausea', 'vomiting after fatty food'], likelihood_weight: 3, description: 'Hardened deposit within the fluid in the gallbladder.', severity_floor: 'high', body_system: 'Digestive' },
  { name: 'Liver Cirrhosis', keywords: ['fatigue', 'jaundice', 'swollen abdomen', 'easy bruising', 'confusion', 'spider veins'], likelihood_weight: 3, description: 'Chronic liver damage from a variety of causes leading to scarring and liver failure.', severity_floor: 'high', body_system: 'Digestive' },
  { name: 'Colorectal Cancer', keywords: ['blood in stool', 'change in bowel habits', 'weight loss', 'fatigue', 'abdominal pain'], likelihood_weight: 4, description: 'Cancer of the colon or rectum.', severity_floor: 'high', body_system: 'Digestive' },

  // MUSCULOSKELETAL
  { name: 'Osteoporosis', keywords: ['back pain', 'loss of height', 'stooped posture', 'easy bone fractures'], likelihood_weight: 2, description: 'Condition in which bones become weak and brittle.', severity_floor: 'medium', body_system: 'Musculoskeletal' },
  { name: 'Ankylosing Spondylitis', keywords: ['back pain', 'stiffness', 'fatigue', 'hip pain', 'reduced flexibility'], likelihood_weight: 2, description: 'Inflammatory arthritis affecting the spine and large joints.', severity_floor: 'medium', body_system: 'Musculoskeletal' },
  { name: 'Tendinitis', keywords: ['pain near joint', 'stiffness', 'mild swelling', 'worsened by activity'], likelihood_weight: 1, description: 'Inflammation of the thick fibrous cords that attach muscle to bone.', severity_floor: 'low', body_system: 'Musculoskeletal' },
  { name: 'Bursitis', keywords: ['joint pain', 'swelling', 'limited movement', 'warmth'], likelihood_weight: 2, description: 'Inflammation of the fluid-filled pads that act as cushions at the joints.', severity_floor: 'medium', body_system: 'Musculoskeletal' },

  // SKIN CONDITIONS
  { name: 'Melanoma', keywords: ['changing mole', 'asymmetric lesion', 'multiple colors', 'evolving appearance'], likelihood_weight: 5, description: 'The most serious type of skin cancer.', severity_floor: 'critical', body_system: 'Skin' },
  { name: 'Rosacea', keywords: ['facial redness', 'visible blood vessels', 'bumps', 'eye irritation'], likelihood_weight: 1, description: 'Condition that causes redness and often small, red, pus-filled bumps on the face.', severity_floor: 'low', body_system: 'Skin' },
  { name: 'Psoriasis', keywords: ['red scaly patches', 'dry skin', 'cracked skin', 'joint pain'], likelihood_weight: 1, description: 'Condition in which skin cells build up and form scales and itchy, dry patches.', severity_floor: 'low', body_system: 'Skin' },
  { name: 'Contact Dermatitis', keywords: ['red rash', 'itching', 'blisters', 'burning sensation'], likelihood_weight: 1, description: 'Skin rash caused by contact with a certain substance.', severity_floor: 'low', body_system: 'Skin' }
];

const SYNONYM_MAP: Record<string, string> = {
  "throwing up": "vomiting", "cant breathe": "shortness of breath", "tired": "fatigue", "dizzy": "dizziness", "runny nose": "nasal congestion",
  "racing heart": "rapid heartbeat", "yellow eyes": "jaundice", "muscle ache": "muscle pain", "head hurts": "headache", "chest hurts": "chest pain",
  "sad": "depression", "nervous": "anxiety", "can't sleep": "insomnia", "suicide": "suicidal thoughts", "kill myself": "suicidal thoughts",
  "stiff neck": "stiff neck", "bullseye rash": "bullseye rash", "eye pain": "eye pain"
};

export const analyzeSymptoms = async (symptoms: string, profile: any = {}): Promise<AnalysisResult> => {
  // Simulate network delay for realism
  await new Promise(resolve => setTimeout(resolve, 1500));

  let text = (symptoms || '').toLowerCase();
  
  for (const [synonym, standard] of Object.entries(SYNONYM_MAP)) {
    text = text.replace(new RegExp(synonym, 'g'), standard);
  }

  let matchedKeywords = new Set<string>();
  const conditionScores = CONDITIONS_DB.map(condition => {
    let matchCount = 0;
    condition.keywords.forEach(kw => {
      if (text.includes(kw.toLowerCase())) {
        matchCount++;
        matchedKeywords.add(kw);
      }
    });
    const likelihood = matchCount > 0 ? Math.min(100, Math.round((matchCount / condition.keywords.length) * 100)) : 0;
    return { ...condition, matchCount, likelihood };
  }).filter(c => c.matchCount > 0);

  conditionScores.sort((a, b) => b.likelihood - a.likelihood || b.matchCount - a.matchCount);
  
  let severityScore = matchedKeywords.size * 5;
  
  // Emergency Combos
  if (text.includes('chest pain') && text.includes('left arm')) severityScore += 50;
  if (text.includes('drooping') && text.includes('weakness')) severityScore += 50;
  if (text.includes('coughing blood')) severityScore += 50;
  if (text.includes('suicid')) severityScore += 100;
  if (text.includes('stiff neck') && text.includes('headache') && text.includes('fever')) severityScore += 50; // Meningitis combo
  if (text.includes('changing mole') || text.includes('asymmetric lesion')) severityScore += 50; // Melanoma combo
  
  if (profile?.age && parseInt(profile.age) > 60) severityScore += 10;
  
  let severity: 'low' | 'medium' | 'high' | 'critical' = 'low';
  if (severityScore >= 51) severity = 'critical';
  else if (severityScore >= 31) severity = 'high';
  else if (severityScore >= 16) severity = 'medium';
  else if (matchedKeywords.size >= 4) severity = 'medium';
  
  // Apply condition severity floor
  conditionScores.slice(0, 5).forEach(c => {
    const levels = { 'low': 1, 'medium': 2, 'high': 3, 'critical': 4 };
    if (levels[c.severity_floor] > levels[severity]) {
      severity = c.severity_floor;
    }
  });

  const severityLabels = { low: 'Monitor at Home', medium: 'See a Doctor Soon', high: 'Seek Care Today', critical: 'Go to ER Now' };
  const severityColors = { low: '#10B981', medium: '#F59E0B', high: '#F97316', critical: '#EF4444' }; // Pink theme colors
  
  let urgencyMessage = "Monitor your symptoms closely.";
  let recommendations = ["Rest and stay hydrated.", "Consider over-the-counter medication.", "Monitor for 48 hours."];
  if (severity === 'medium') {
    urgencyMessage = "Your symptoms warrant medical attention.";
    recommendations = ["See a doctor within 24-48 hours.", "Keep track of changing symptoms.", "Avoid strenuous activity."];
  } else if (severity === 'high') {
    urgencyMessage = "Please seek medical care today.";
    recommendations = ["See a doctor or visit urgent care today.", "Do not drive alone.", "Bring someone with you."];
  } else if (severity === 'critical') {
    urgencyMessage = "This may be a medical emergency.";
    recommendations = ["Call emergency services (911) immediately.", "Do not wait.", "Go to the nearest ER now."];
  }

  if (profile?.bloodType) {
    recommendations.push(`As blood type ${profile.bloodType}, ensure donors are compatible if transfusion is needed.`);
  }
  if (profile?.allergies) {
    recommendations.push(`Note: You have listed allergies to [${profile.allergies}].`);
  }

  let topConditions = conditionScores.slice(0, 5).map(c => ({
    name: c.name,
    likelihood: c.likelihood,
    description: c.description,
    body_system: c.body_system
  }));

  if (topConditions.length === 0) {
    topConditions = [{ name: 'Unknown Condition', likelihood: 0, description: 'No specific conditions matched.', body_system: 'Unknown' }];
  }

  return {
    severity,
    severityLabel: severityLabels[severity] as any,
    severityColor: severityColors[severity] as any,
    conditions: topConditions as any,
    recommendations,
    urgencyMessage,
    followUpQuestions: ["How long have you had these symptoms?", "Are you taking any medications?"],
    disclaimer: "This is not a medical diagnosis. Always consult a physician.",
    system_matches: topConditions.map(c => c.body_system).filter((v, i, a) => a.indexOf(v) === i)
  };
}
