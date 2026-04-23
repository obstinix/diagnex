import { AnalysisResult } from '../types';
import { PatientProfile } from '../types';

interface SymptomCondition {
  name: string;
  keywords: string[];
  likelihood_weight: number;
  description: string;
  severity_floor: 'low' | 'medium' | 'high' | 'critical';
}

const CONDITIONS_DB: SymptomCondition[] = [
  { name: 'Common Cold', keywords: ['cough', 'sore throat', 'runny nose', 'sneezing', 'fatigue'], likelihood_weight: 1, description: 'Viral infection of your nose and throat.', severity_floor: 'low' },
  { name: 'Influenza', keywords: ['fever', 'chills', 'muscle pain', 'cough', 'fatigue', 'headache'], likelihood_weight: 2, description: 'Viral infection that attacks your respiratory system.', severity_floor: 'medium' },
  { name: 'COVID-19', keywords: ['fever', 'dry cough', 'fatigue', 'loss of smell', 'shortness of breath'], likelihood_weight: 2, description: 'Contagious respiratory illness caused by the SARS-CoV-2 virus.', severity_floor: 'medium' },
  { name: 'Strep Throat', keywords: ['sore throat', 'fever', 'swollen lymph nodes', 'difficulty swallowing'], likelihood_weight: 1.5, description: 'Bacterial infection that makes your throat feel sore and scratchy.', severity_floor: 'low' },
  { name: 'Bronchitis', keywords: ['cough', 'fatigue', 'shortness of breath', 'chest tightness', 'wet cough'], likelihood_weight: 1.5, description: 'Inflammation of the lining of your bronchial tubes.', severity_floor: 'medium' },
  { name: 'Pneumonia', keywords: ['cough', 'fever', 'chills', 'shortness of breath', 'chest pain'], likelihood_weight: 3, description: 'Infection that inflames the air sacs in one or both lungs.', severity_floor: 'high' },
  { name: 'Asthma', keywords: ['shortness of breath', 'chest tightness', 'wheezing', 'cough'], likelihood_weight: 2, description: 'Condition in which your airways narrow and swell.', severity_floor: 'medium' },
  { name: 'Allergic Rhinitis', keywords: ['sneezing', 'runny nose', 'redness', 'itching', 'nasal congestion'], likelihood_weight: 1, description: 'Allergic response causing itchy, watery eyes, sneezing.', severity_floor: 'low' },
  { name: 'Sinusitis', keywords: ['facial numbness', 'head pressure', 'nasal congestion', 'headache', 'fever'], likelihood_weight: 1.5, description: 'Inflammation of the tissue lining the sinuses.', severity_floor: 'low' },
  { name: 'Migraine', keywords: ['headache', 'nausea', 'vomiting', 'blurred vision', 'dizziness'], likelihood_weight: 2, description: 'Headache of varying intensity, often accompanied by nausea and sensitivity to light.', severity_floor: 'medium' },
  { name: 'Tension Headache', keywords: ['headache', 'head pressure', 'neck pain'], likelihood_weight: 1, description: 'Mild to moderate pain often described as feeling like a tight band around the head.', severity_floor: 'low' },
  { name: 'Vertigo', keywords: ['dizziness', 'nausea', 'vomiting', 'loss of balance'], likelihood_weight: 2, description: 'Sensation that you, or the environment around you, is moving or spinning.', severity_floor: 'medium' },
  { name: 'Meningitis', keywords: ['fever', 'headache', 'neck pain', 'confusion', 'nausea'], likelihood_weight: 4, description: 'Inflammation of the membranes surrounding your brain and spinal cord.', severity_floor: 'high' },
  { name: 'Heart Attack', keywords: ['chest pain', 'left arm pain', 'shortness of breath', 'cold sweats', 'nausea', 'jaw pain'], likelihood_weight: 5, description: 'A medical emergency when blood flow to the heart is blocked.', severity_floor: 'critical' },
  { name: 'Angina', keywords: ['chest pain', 'chest pressure', 'shortness of breath', 'fatigue'], likelihood_weight: 3, description: 'A type of chest pain caused by reduced blood flow to the heart.', severity_floor: 'high' },
  { name: 'Arrhythmia', keywords: ['heart palpitations', 'racing heart', 'dizziness', 'shortness of breath'], likelihood_weight: 3, description: 'Improper beating of the heart, whether irregular, too fast, or too slow.', severity_floor: 'high' },
  { name: 'Heart Failure', keywords: ['shortness of breath', 'fatigue', 'swollen ankles', 'rapid heartbeat'], likelihood_weight: 3.5, description: 'Chronic condition where the heart doesn\'t pump blood as well as it should.', severity_floor: 'high' },
  { name: 'Hypertension', keywords: ['headache', 'shortness of breath', 'nosebleeds'], likelihood_weight: 2, description: 'High blood pressure, often has no symptoms but can cause issues.', severity_floor: 'medium' },
  { name: 'Anemia', keywords: ['fatigue', 'weakness', 'pale skin', 'chest pain', 'cold hands'], likelihood_weight: 2, description: 'Condition in which you lack enough healthy red blood cells.', severity_floor: 'low' },
  { name: 'Deep Vein Thrombosis', keywords: ['swelling', 'pain', 'redness', 'warm skin'], likelihood_weight: 3, description: 'Blood clot in a deep vein, usually in the legs.', severity_floor: 'high' },
  { name: 'GERD/Acid Reflux', keywords: ['heartburn', 'chest pain', 'nausea', 'difficulty swallowing'], likelihood_weight: 1.5, description: 'Digestive disease where stomach acid irritates the food pipe lining.', severity_floor: 'low' },
  { name: 'Gastroenteritis', keywords: ['diarrhea', 'nausea', 'vomiting', 'stomach pain', 'fever'], likelihood_weight: 2, description: 'Intestinal infection marked by diarrhea, cramps, nausea, vomiting, and fever.', severity_floor: 'medium' },
  { name: 'IBS', keywords: ['stomach pain', 'bloating', 'gas', 'diarrhea', 'constipation'], likelihood_weight: 1, description: 'Common disorder affecting the large intestine.', severity_floor: 'low' },
  { name: 'Appendicitis', keywords: ['stomach pain', 'nausea', 'vomiting', 'fever', 'loss of appetite'], likelihood_weight: 4, description: 'Inflammation of the appendix, a medical emergency.', severity_floor: 'high' },
  { name: 'Food Poisoning', keywords: ['nausea', 'vomiting', 'diarrhea', 'stomach pain', 'fever'], likelihood_weight: 2, description: 'Illness caused by eating contaminated food.', severity_floor: 'medium' },
  { name: 'Peptic Ulcer', keywords: ['stomach pain', 'bloating', 'heartburn', 'nausea'], likelihood_weight: 2, description: 'Sore that develops on the lining of the esophagus, stomach, or small intestine.', severity_floor: 'medium' },
  { name: 'Crohn\'s Disease', keywords: ['diarrhea', 'stomach pain', 'fatigue', 'weight loss'], likelihood_weight: 2, description: 'Type of inflammatory bowel disease (IBD).', severity_floor: 'medium' },
  { name: 'Type 1 Diabetes', keywords: ['excessive thirst', 'frequent urination', 'excessive hunger', 'weight loss', 'fatigue'], likelihood_weight: 3, description: 'Chronic condition where pancreas produces little or no insulin.', severity_floor: 'high' },
  { name: 'Type 2 Diabetes', keywords: ['excessive thirst', 'frequent urination', 'fatigue', 'blurred vision'], likelihood_weight: 2, description: 'Chronic condition that affects the way body processes blood sugar.', severity_floor: 'medium' },
  { name: 'Hypoglycemia', keywords: ['confusion', 'heart palpitations', 'tremors', 'anxiety', 'sweating'], likelihood_weight: 3, description: 'Condition caused by a very low level of blood sugar.', severity_floor: 'high' },
  { name: 'Hyperthyroidism', keywords: ['weight loss', 'rapid heartbeat', 'anxiety', 'tremors', 'sweating'], likelihood_weight: 2, description: 'Overactive thyroid gland producing too much thyroid hormone.', severity_floor: 'medium' },
  { name: 'Hypothyroidism', keywords: ['fatigue', 'weight gain', 'cold intolerance', 'dry skin', 'constipation'], likelihood_weight: 1.5, description: 'Underactive thyroid gland not producing enough thyroid hormone.', severity_floor: 'low' },
  { name: 'Anxiety Disorder', keywords: ['anxiety', 'panic attack', 'heart palpitations', 'sweating', 'tremors'], likelihood_weight: 2, description: 'Mental health disorder characterized by feelings of worry or fear.', severity_floor: 'low' },
  { name: 'Panic Disorder', keywords: ['panic attack', 'chest pain', 'heart palpitations', 'shortness of breath', 'dizziness'], likelihood_weight: 3, description: 'Sudden episodes of intense fear or anxiety.', severity_floor: 'medium' },
  { name: 'Depression', keywords: ['fatigue', 'loss of appetite', 'insomnia', 'excessive sleep', 'suicidal thoughts'], likelihood_weight: 3, description: 'A mental health disorder characterized by persistently depressed mood.', severity_floor: 'medium' },
  { name: 'Urinary Tract Infection', keywords: ['painful urination', 'frequent urination', 'blood in urine', 'pelvic pain'], likelihood_weight: 2, description: 'Infection in any part of the urinary system.', severity_floor: 'medium' },
  { name: 'Kidney Stones', keywords: ['back pain', 'stomach pain', 'painful urination', 'nausea', 'vomiting'], likelihood_weight: 3, description: 'Hard deposits made of minerals and salts that form inside your kidneys.', severity_floor: 'high' },
  { name: 'Kidney Infection', keywords: ['fever', 'chills', 'back pain', 'frequent urination', 'nausea'], likelihood_weight: 3.5, description: 'Type of UTI that generally begins in urethra or bladder and travels to kidneys.', severity_floor: 'high' },
  { name: 'Dehydration', keywords: ['excessive thirst', 'dry skin', 'fatigue', 'dizziness', 'confusion'], likelihood_weight: 2, description: 'Condition caused by the loss of too much fluid from the body.', severity_floor: 'medium' },
  { name: 'Heat Stroke', keywords: ['high fever', 'confusion', 'rapid breathing', 'rapid heartbeat', 'loss of consciousness'], likelihood_weight: 5, description: 'Condition caused by your body overheating, a medical emergency.', severity_floor: 'critical' },
  { name: 'Heat Exhaustion', keywords: ['excessive sweating', 'rapid heartbeat', 'dizziness', 'fatigue', 'nausea'], likelihood_weight: 3, description: 'Condition whose symptoms may include heavy sweating and rapid pulse.', severity_floor: 'medium' },
  { name: 'Rheumatoid Arthritis', keywords: ['joint pain', 'stiffness', 'swollen joints', 'fatigue', 'fever'], likelihood_weight: 2, description: 'Chronic inflammatory disorder affecting many joints.', severity_floor: 'medium' },
  { name: 'Fibromyalgia', keywords: ['muscle pain', 'fatigue', 'insomnia', 'memory loss', 'mood swings'], likelihood_weight: 1.5, description: 'Disorder characterized by widespread musculoskeletal pain.', severity_floor: 'low' },
  { name: 'Lupus', keywords: ['fatigue', 'joint pain', 'rash', 'fever'], likelihood_weight: 2, description: 'Systemic autoimmune disease that occurs when your body\'s immune system attacks your own tissues.', severity_floor: 'medium' },
  { name: 'Stroke', keywords: ['drooping face', 'muscle weakness', 'confusion', 'blurred vision', 'dizziness', 'headache'], likelihood_weight: 5, description: 'Damage to the brain from interruption of its blood supply.', severity_floor: 'critical' },
  { name: 'TIA (Mini Stroke)', keywords: ['drooping face', 'muscle weakness', 'confusion', 'dizziness'], likelihood_weight: 4, description: 'A brief stroke-like attack that requires immediate medical attention.', severity_floor: 'high' },
  { name: 'Epilepsy', keywords: ['seizure', 'fainting', 'confusion', 'memory loss'], likelihood_weight: 4, description: 'Central nervous system disorder in which brain activity becomes abnormal.', severity_floor: 'high' },
  { name: 'Skin Infection (Cellulitis)', keywords: ['redness', 'swelling', 'pain', 'warm skin', 'fever'], likelihood_weight: 3, description: 'Common, potentially serious bacterial skin infection.', severity_floor: 'medium' },
  { name: 'Eczema', keywords: ['itching', 'redness', 'dry skin', 'rash'], likelihood_weight: 1, description: 'Condition that makes your skin red and itchy.', severity_floor: 'low' },
  { name: 'Psoriasis', keywords: ['rash', 'dry skin', 'stiffness', 'itching'], likelihood_weight: 1, description: 'A condition in which skin cells build up and form scales and itchy, dry patches.', severity_floor: 'low' },
];

const SYNONYM_MAP: Record<string, string> = {
  "throwing up": "vomiting", "puking": "vomiting", "cant breathe": "shortness of breath", "hard to breathe": "shortness of breath", "tired": "fatigue", "exhausted": "fatigue", "worn out": "fatigue", "tummy ache": "stomach pain", "belly pain": "stomach pain", "dizzy": "dizziness", "lightheaded": "dizziness", "runny nose": "nasal congestion", "stuffy nose": "nasal congestion", "throwing up blood": "coughing blood", "fit": "seizure", "passing out": "fainting", "blacking out": "fainting", "racing heart": "rapid heartbeat", "heart racing": "rapid heartbeat", "yellow eyes": "jaundice", "yellow skin": "jaundice", "muscle ache": "muscle pain", "joint ache": "joint pain", "sore back": "back pain", "swollen feet": "swollen ankles", "head hurts": "headache", "chest hurts": "chest pain", "peeing blood": "blood in urine", "can't pee": "inability to urinate", "sad": "depression", "nervous": "anxiety", "can't sleep": "insomnia", "sleeping too much": "excessive sleep", "hair falling out": "hair loss", "shaking": "tremors", "hot flashes": "heat intolerance", "always cold": "cold intolerance", "suicide": "suicidal thoughts", "kill myself": "suicidal thoughts", "want to die": "suicidal thoughts"
};

export const symptomEngine = {
  analyze: (symptomsText: string, profile?: PatientProfile): AnalysisResult => {
    let text = symptomsText.toLowerCase();
    
    for (const [synonym, standard] of Object.entries(SYNONYM_MAP)) {
      text = text.replace(new RegExp(synonym, 'g'), standard);
    }

    let matchedKeywords = new Set<string>();
    const conditionScores = CONDITIONS_DB.map(condition => {
      let matchCount = 0;
      condition.keywords.forEach(kw => {
        if (text.includes(kw)) {
          matchCount++;
          matchedKeywords.add(kw);
        }
      });
      const likelihood = matchCount > 0 ? Math.min(100, Math.round((matchCount / condition.keywords.length) * 100)) : 0;
      return { ...condition, matchCount, likelihood };
    }).filter(c => c.matchCount > 0);

    conditionScores.sort((a, b) => b.likelihood - a.likelihood || b.matchCount - a.matchCount);
    
    let severityScore = matchedKeywords.size * 5;
    
    if (text.includes('chest pain') && text.includes('left arm pain')) severityScore += 50;
    if (text.includes('drooping face') && text.includes('muscle weakness')) severityScore += 50;
    if (text.includes('coughing blood')) severityScore += 50;
    if (text.includes('suicidal thoughts') || text.includes('suicide')) severityScore += 100;
    
    if (profile?.age && parseInt(profile.age) > 60) severityScore += 10;
    
    let severity: 'low' | 'medium' | 'high' | 'critical' = 'low';
    if (severityScore >= 51) severity = 'critical';
    else if (severityScore >= 31) severity = 'high';
    else if (severityScore >= 16) severity = 'medium';
    else if (matchedKeywords.size >= 5) severity = 'medium';
    
    conditionScores.slice(0, 3).forEach(c => {
      const levels = { 'low': 1, 'medium': 2, 'high': 3, 'critical': 4 };
      if (levels[c.severity_floor] > levels[severity]) {
        severity = c.severity_floor;
      }
    });

    const severityLabels = {
      low: 'Monitor at Home',
      medium: 'See a Doctor Soon',
      high: 'Seek Care Today',
      critical: 'Go to ER Now'
    };
    
    const severityColors = {
      low: '#10B981',
      medium: '#F59E0B',
      high: '#EF4444',
      critical: '#7C3AED'
    };

    let urgencyMessage = "Monitor your symptoms closely.";
    let recommendations = [
      "Rest and stay hydrated.",
      "Consider over-the-counter medication for minor symptoms.",
      "Monitor for 48 hours and seek help if worse."
    ];
    
    if (severity === 'medium') {
      urgencyMessage = "Your symptoms warrant medical attention.";
      recommendations = [
        "See a doctor within 24-48 hours.",
        "Keep track of any changing symptoms.",
        "Avoid strenuous activity."
      ];
    } else if (severity === 'high') {
      urgencyMessage = "Please seek medical care today.";
      recommendations = [
        "See a doctor or visit urgent care today.",
        "Do not drive alone if you feel faint or dizzy.",
        "Bring someone with you if possible."
      ];
    } else if (severity === 'critical') {
      urgencyMessage = "This may be a medical emergency.";
      recommendations = [
        "Call emergency services (911) immediately.",
        "Do not wait to see if symptoms improve.",
        "Go to the nearest ER now."
      ];
    }

    let topConditions = conditionScores.slice(0, 3).map(c => ({
      name: c.name,
      likelihood: c.likelihood,
      description: c.description
    }));

    if (topConditions.length === 0) {
      topConditions = [{ name: 'Unknown Condition', likelihood: 0, description: 'No specific conditions matched. Please consult a doctor.' }];
    }

    return {
      severity,
      severityLabel: severityLabels[severity] as any,
      severityColor: severityColors[severity] as any,
      conditions: topConditions,
      recommendations,
      urgencyMessage,
      followUpQuestions: [
        "How long have you had these symptoms?",
        "Are you currently taking any medications?"
      ],
      disclaimer: "This is not a medical diagnosis. Always consult a licensed physician."
    };
  }
};
