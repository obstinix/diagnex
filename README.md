<div align="center">

# 🩺 Diagnex

### *Know what your body is telling you — instantly.*

AI-powered symptom analysis · 57 conditions across 9 body systems · Biometric vitals engine  
Real-time severity triage · Downloadable clinical PDF reports · Offline-capable · Zero backend · 100% private

---

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-diagnex.pages.dev-E85A5A?style=for-the-badge&labelColor=1A1A1A)](https://diagnex.pages.dev/)
[![License](https://img.shields.io/badge/License-EPL--2.0-E85A5A?style=for-the-badge&labelColor=1A1A1A)](https://github.com/obstinix/diagnex/blob/main/LICENSE)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=61DAFB&labelColor=1A1A1A)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.1.6-3178C6?style=for-the-badge&logo=typescript&logoColor=3178C6&labelColor=1A1A1A)](https://typescriptlang.org)
[![Ionic](https://img.shields.io/badge/Ionic-React%207.x-3880FF?style=for-the-badge&logo=ionic&logoColor=3880FF&labelColor=1A1A1A)](https://ionicframework.com)
[![Vite](https://img.shields.io/badge/Vite-4.3.9-646CFF?style=for-the-badge&logo=vite&logoColor=646CFF&labelColor=1A1A1A)](https://vitejs.dev)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-Pages-F38020?style=for-the-badge&logo=cloudflare&logoColor=F38020&labelColor=1A1A1A)](https://pages.cloudflare.com)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-10B981?style=for-the-badge&labelColor=1A1A1A)](https://github.com/obstinix/diagnex/pulls)
[![Issues](https://img.shields.io/github/issues/obstinix/diagnex?style=for-the-badge&color=F59E0B&labelColor=1A1A1A)](https://github.com/obstinix/diagnex/issues)
[![Stars](https://img.shields.io/github/stars/obstinix/diagnex?style=for-the-badge&color=E85A5A&labelColor=1A1A1A)](https://github.com/obstinix/diagnex/stargazers)

---

**[🚀 Try Live Demo](https://diagnex.pages.dev/)** &nbsp;·&nbsp; **[🐛 Report a Bug](https://github.com/obstinix/diagnex/issues/new?template=bug_report.md)** &nbsp;·&nbsp; **[✨ Request a Feature](https://github.com/obstinix/diagnex/issues/new?template=feature_request.md)** &nbsp;·&nbsp; **[🤝 Contribute](https://github.com/obstinix/diagnex/blob/main/CONTRIBUTING.md)**

</div>

---

## Table of Contents

1. [Abstract](#1-abstract)
2. [The Problem](#2-the-problem)
3. [Feature Overview](#3-feature-overview)
4. [Disease & Condition Database](#4-disease--condition-database)
   - [Respiratory](#41-respiratory-8-conditions)
   - [Cardiovascular](#42-cardiovascular-6-conditions)
   - [Infectious](#43-infectious-10-conditions)
   - [Metabolic & Endocrine](#44-metabolic--endocrine-8-conditions)
   - [Neurological](#45-neurological-7-conditions)
   - [Mental Health](#46-mental-health-5-conditions)
   - [Gastrointestinal](#47-gastrointestinal-5-conditions)
   - [Musculoskeletal](#48-musculoskeletal-4-conditions)
   - [Dermatological](#49-dermatological-4-conditions)
5. [Biometric Vitals Engine](#5-biometric-vitals-engine)
6. [Symptom Analysis Algorithm](#6-symptom-analysis-algorithm)
7. [Emergency Detection System](#7-emergency-detection-system)
8. [PDF Clinical Report](#8-pdf-clinical-report)
9. [Find Nearest Care](#9-find-nearest-care)
10. [System Architecture](#10-system-architecture)
11. [Tech Stack](#11-tech-stack)
12. [Getting Started](#12-getting-started)
    - [Prerequisites](#121-prerequisites)
    - [Clone the Repository](#122-clone-the-repository)
    - [Install Dependencies](#123-install-dependencies)
    - [Environment Configuration](#124-environment-configuration)
    - [Run Locally](#125-run-locally)
    - [Build for Production](#126-build-for-production)
    - [Deploy to Cloudflare Pages](#127-deploy-to-cloudflare-pages)
    - [Native Mobile Build (Capacitor)](#128-native-mobile-build-capacitor)
13. [Project Structure](#13-project-structure)
14. [Interactive Features Guide](#14-interactive-features-guide)
15. [Contributing](#15-contributing)
16. [License](#16-license)
17. [Medical Disclaimer](#17-medical-disclaimer)

---

## 1. Abstract

Diagnex is a fully client-side, privacy-first medical symptom analysis engine built on Ionic React. It implements a weighted keyword-scoring model over a curated database of 57 conditions spanning 9 body systems, combined with a biometric vitals scoring layer that adjusts severity in response to real patient readings (heart rate, body temperature, SpO₂). All computation runs entirely in the browser — no telemetry, no backend calls, no account required.

The engine tokenises free-text symptom input, resolves 50+ colloquial synonym mappings to clinical terminology, scores each condition by keyword overlap weighted against condition-specific priors, applies biometric adjustments and emergency-combination detection, and outputs a 4-tier severity classification (Low → Medium → High → Critical) alongside matched conditions, ranked recommendations, and a **downloadable 4-page PDF clinical report** suitable for sharing with a healthcare provider.

When critical emergency patterns are detected — such as chest pain radiating to the left arm, neck stiffness with fever, or suicidal ideation — the system immediately escalates the result, displays a high-visibility crisis banner, and provides direct guidance to emergency services. One-tap geolocation then surfaces the nearest hospitals within a 13 km radius via a Google Maps deep-link.

Diagnex is designed as an educational and accessibility tool to bridge the information gap between symptom onset and clinical consultation — particularly in contexts where specialist access is delayed, expensive, or geographically unavailable.

---

## 2. The Problem

> *"Over 3.5 billion health-related searches occur on Google every day — yet the majority return generic content, medical jargon, or algorithmically amplified worst-case scenarios."*

| Metric | Reality |
|---|---|
| People lacking access to basic healthcare | **2.5 billion** worldwide (WHO, 2023) |
| Average GP wait time | **2–3 weeks** in high-income countries |
| First consultation cost (US, uninsured) | **$150–$300+** |
| People who search symptoms before seeing a doctor | **72%** (Pew Research) |
| Existing symptom checkers that are free, offline-capable, and private | **Near zero** |

Existing consumer tools are either paywalled, cloud-dependent (sending sensitive health data to third parties), or use alarmist language that drives unnecessary emergency visits. Diagnex is the alternative: instant, private, on-device analysis with clinically structured output — including a shareable clinical report you can hand to any doctor, and automatic escalation when something truly urgent is detected.

---

## 3. Feature Overview

| # | Feature | Description |
|---|---|---|
| 01 | **Symptom Engine** | Weighted keyword scoring across 57 conditions with synonym resolution and emergency-combination detection |
| 02 | **4-Level Severity Triage** | `Low` → `Medium` → `High` → `Critical` with colour-coded urgency banners and real-time pulsing animation for critical states |
| 03 | **Biometric Vitals Engine** | BPM, body temperature (°F), and SpO₂ inputs directly adjust severity scoring and feed the keyword matcher |
| 04 | **🚨 Emergency Detection** | Six high-risk symptom combinations (heart attack, stroke, meningitis, melanoma, TB, crisis) trigger an immediate severity escalation and real-time emergency guidance |
| 05 | **🏥 Find Nearest Care** | One-tap HTML5 Geolocation opens a Google Maps deep-link surfacing hospitals and clinics within a 13 km radius |
| 06 | **📄 Downloadable PDF Report** | Professional 4-page clinical report with embedded charts, patient demographics, QR code, and CONFIDENTIAL watermark — ready to share with any healthcare provider |
| 07 | **Visual Analytics** | Horizontal bar chart (condition likelihood), radar chart (affected body systems), and semicircular risk gauge — powered by Chart.js 4 |
| 08 | **Pain Scale & Severity Input** | 1–10 pain slider and mild/moderate/severe segment both contribute to the severity scoring model |
| 09 | **Symptom Chip Grid** | 40+ quick-tap chips across 7 categorised body-system groups (Common, Pain, Cardiac, Respiratory, Digestive, Neuro, Skin) |
| 10 | **Floating AI Chatbot** | On-page assistant with 10 intent categories, 600–900 ms simulated typing delay, and automatic emergency escalation on critical keywords |
| 11 | **Patient Profile** | Persisted name, age, gender, blood type, medications, allergies, and emergency contact — embedded into every analysis and PDF |
| 12 | **Analysis History** | Up to 20 analyses stored in `localStorage`, swipe-to-delete, tap-to-reload on the Results page |
| 13 | **Share Results** | Web Share API on mobile (native share sheet), clipboard fallback on desktop |
| 14 | **100% Private** | Zero backend, zero database, zero telemetry. All data lives in `localStorage` on the user's device |
| 15 | **PWA / Offline** | Service-worker enabled, installable on any device, works offline after first load |
| 16 | **Native Mobile** | Capacitor 5 wrapping for Android and iOS native builds (`com.diagnex.app`) |

---

## 4. Disease & Condition Database

Diagnex analyses symptoms against **57 clinically curated conditions** across 9 body systems. Each condition carries a keyword set, a likelihood weight (1–5), a severity floor, and a body-system tag used to populate the radar chart.

> **Severity Floor:** The minimum severity level a condition can produce regardless of total keyword score. For example, a condition with `severity_floor: 'critical'` will always generate a Critical result if matched, even if only a single keyword is present.

---

### 4.1 Respiratory (8 conditions)

| Condition | Tracked Symptoms | Severity Floor | Weight |
|---|---|---|---|
| **Common Cold** | Cough, sore throat, runny nose, sneezing, fatigue | Low | 1× |
| **Influenza** | Fever, chills, muscle pain, cough, fatigue, headache | Medium | 2× |
| **COVID-19** | Fever, dry cough, fatigue, loss of smell, shortness of breath | Medium | 2× |
| **Tuberculosis** | Persistent cough, coughing blood, chest pain, weight loss, night sweats, fever | High | 3× |
| **COPD** | Chronic cough, mucus, shortness of breath, wheezing, frequent chest infections | High | 3× |
| **Pulmonary Fibrosis** | Shortness of breath, dry cough, fatigue, weight loss, aching muscles | High | 3× |
| **Pleurisy** | Sharp chest pain, shortness of breath, dry cough, fever | High | 3× |
| **Sleep Apnea** | Loud snoring, gasping during sleep, morning headache, daytime sleepiness | Medium | 2× |

**Common Cold** — Rhinoviral upper respiratory infection; self-limiting in 7–10 days. Distinguished from influenza by absence of systemic symptoms (myalgia, high fever).

**Influenza** — Orthomyxovirus infection with rapid onset; differentiated from cold by prominent fever (>38.5 °C), myalgia, and prostration. Antiviral therapy (oseltamivir) most effective within 48 hours.

**COVID-19** — SARS-CoV-2 infection; clinical presentation varies from asymptomatic to multi-organ failure. Anosmia/ageusia are hallmark discriminators from other respiratory illness.

**Tuberculosis** — *Mycobacterium tuberculosis* infection; haemoptysis and night sweats are late-stage markers warranting urgent sputum culture and chest X-ray.

**COPD** — Progressive airflow obstruction (FEV₁/FVC < 0.70); strongly associated with smoking history. Exacerbations are a leading cause of hospitalisation globally.

**Pulmonary Fibrosis** — Irreversible scarring of lung parenchyma; median survival 3–5 years from diagnosis. Velcro-like crackles on auscultation.

**Pleurisy** — Inflammatory pleuritis; pain classically worsens with deep inspiration (pleuritic). Common secondary to pneumonia, pulmonary embolism, or autoimmune disease.

**Sleep Apnea** — Repetitive upper-airway collapse during sleep; apnoea–hypopnoea index (AHI) > 5 events/hour is diagnostic. Associated with hypertension, arrhythmia, and metabolic syndrome.

---

### 4.2 Cardiovascular (6 conditions)

| Condition | Tracked Symptoms | Severity Floor | Weight |
|---|---|---|---|
| **Heart Attack (STEMI/NSTEMI)** | Chest pain, left arm pain, shortness of breath, cold sweats, nausea, jaw pain | **Critical** | 5× |
| **Pulmonary Embolism** | Sudden shortness of breath, chest pain, rapid heart rate, coughing blood | **Critical** | 5× |
| **Aortic Aneurysm** | Deep back pain, abdominal pain, pulsating feeling, sudden severe pain | **Critical** | 5× |
| **Cardiomyopathy** | Breathlessness, fatigue, swollen legs, irregular heartbeat, dizziness | High | 3× |
| **Pericarditis** | Sharp chest pain, fever, shortness of breath, fatigue | High | 3× |
| **Peripheral Artery Disease** | Leg pain, cold legs/feet, weak pulse in legs, non-healing sores | High | 3× |

**Heart Attack** — Acute coronary syndrome from plaque rupture and thrombosis occluding a coronary artery. Classic presentation: crushing substernal chest pain radiating to the left arm and jaw. Emergency detector: `chest pain` + `left arm` combination triggers +50 severity points and immediate escalation.

**Pulmonary Embolism** — Thrombus occlusion of pulmonary artery; risk stratified by Wells score. Classic triad: dyspnoea, pleuritic chest pain, haemoptysis. High mortality if untreated.

**Aortic Aneurysm** — Pathological dilatation of the aortic wall; rupture is immediately life-threatening (mortality >80%). Abdominal pulsating mass with tearing/ripping pain is a surgical emergency.

**Cardiomyopathy** — Disease of the myocardium causing impaired contraction (dilated), stiffness (restrictive), or hypertrophy (HCM). End-stage may require transplantation.

**Pericarditis** — Inflammation of the pericardial sac; pain relieved by leaning forward (pathognomonic). Most commonly idiopathic or viral; treated with NSAIDs and colchicine.

**Peripheral Artery Disease** — Atherosclerotic narrowing of lower-limb vasculature; intermittent claudication is the hallmark symptom. ABI < 0.9 is diagnostic.

---

### 4.3 Infectious (10 conditions)

| Condition | Tracked Symptoms | Severity Floor | Weight |
|---|---|---|---|
| **Malaria** | Fever, chills, sweating, headache, muscle pain, nausea, vomiting, fatigue | High | 3× |
| **Dengue Fever** | High fever, severe headache, eye pain, joint pain, rash, bleeding | High | 3× |
| **Typhoid** | Sustained fever, weakness, stomach pain, headache, loss of appetite, rose spots | High | 3× |
| **Hepatitis A/B** | Jaundice, fatigue, stomach pain, dark urine, pale stool, nausea, fever | High | 3× |
| **HIV/AIDS** | Recurring infections, weight loss, fatigue, night sweats, swollen lymph nodes | High | 3× |
| **Lyme Disease** | Bullseye rash, fever, headache, muscle pain, joint pain, fatigue, facial palsy | High | 2.5× |
| **Meningitis** | Severe headache, stiff neck, fever, sensitivity to light, rash, vomiting | **Critical** | 5× |
| **Chickenpox** | Itchy blisters, rash, fever, fatigue, loss of appetite | Medium | 2× |
| **Shingles** | Painful rash, burning pain, blisters, itching, sensitivity to touch | Medium | 2× |
| **Mononucleosis** | Extreme fatigue, sore throat, fever, swollen lymph nodes, swollen spleen | Medium | 2× |

**Malaria** — *Plasmodium falciparum/vivax* protozoan transmitted by *Anopheles* mosquito. Cyclical fever pattern (every 48–72 hrs) is characteristic. Cerebral malaria is a medical emergency.

**Dengue Fever** — Flavivirus causing "breakbone fever" due to severe myalgia. Dengue haemorrhagic fever (DHF) presents with plasma leakage and thrombocytopenia; platelet monitoring is critical.

**Typhoid** — *Salmonella typhi* bacteraemia; rose spots (salmon-coloured macular rash on trunk) are pathognomonic. Blood cultures positive in first week; faecal cultures in subsequent weeks.

**Hepatitis A/B** — HAV: self-limiting feco-oral transmission. HBV: bloodborne, chronic in 5–10% of adult infections; associated with hepatocellular carcinoma risk. Both cause hepatocyte necrosis.

**HIV/AIDS** — Retroviral destruction of CD4⁺ T-lymphocytes; AIDS defined by CD4 count <200 cells/μL or AIDS-defining illness. Modern ART achieves undetectable viral load in most patients.

**Lyme Disease** — *Borrelia burgdorferi* spirochaete transmitted by *Ixodes* tick; erythema migrans (bullseye rash) is the pathognomonic early sign. Late dissemination involves cardiac and neurological systems.

**Meningitis** — Bacterial (*N. meningitidis*, *S. pneumoniae*) or viral inflammation of meninges. Classic triad: headache, neck stiffness (Kernig/Brudzinski positive), photophobia. Emergency detector: `stiff neck` + `headache` + `fever` triggers +50 severity points and crisis escalation.

**Chickenpox** — Primary varicella-zoster virus infection; highly contagious airborne transmission. Prodromal fever followed by centripetal vesicular rash. Reactivation causes shingles.

**Shingles (Herpes Zoster)** — VZV reactivation in dorsal root ganglia; dermatomal distribution of painful vesicular rash. Post-herpetic neuralgia is a debilitating complication.

**Mononucleosis** — Epstein-Barr virus (EBV) infection; "kissing disease" transmitted via saliva. Splenomegaly in 50% — contact sports contraindicated due to rupture risk.

---

### 4.4 Metabolic & Endocrine (8 conditions)

| Condition | Tracked Symptoms | Severity Floor | Weight |
|---|---|---|---|
| **Cushing's Syndrome** | Weight gain, stretch marks, high blood pressure, fatigue, mood changes | Medium | 2× |
| **Addison's Disease** | Extreme fatigue, weight loss, dark skin patches, low blood pressure, salt cravings | High | 3× |
| **PCOS** | Irregular periods, excess hair growth, acne, weight gain, fertility issues | Medium | 2× |
| **Gout** | Severe joint pain, big toe pain, swelling, redness, warmth in joint | Medium | 2× |
| **Celiac Disease** | Diarrhoea, bloating, gas, fatigue, anaemia, bone pain | Medium | 2× |
| **Vitamin D Deficiency** | Bone pain, muscle weakness, fatigue, depression, hair loss | Low | 1× |
| **Iron Deficiency Anaemia** | Fatigue, pale skin, shortness of breath, cold hands, cold feet, dizziness | Medium | 2× |
| **Vitamin B12 Deficiency** | Fatigue, weakness, numbness, balance problems, memory issues | Medium | 2× |

**Cushing's Syndrome** — Hypercortisolism from exogenous steroid use or pituitary/adrenal tumour. Characteristic moon face, buffalo hump, and purple striae.

**Addison's Disease** — Primary adrenocortical insufficiency; autoimmune destruction in 80% of cases. Adrenal crisis (acute hypotension, vomiting) is life-threatening — requires emergency hydrocortisone.

**PCOS** — Hyperandrogenism with chronic anovulation; Rotterdam criteria require 2 of 3: oligo-anovulation, clinical/biochemical hyperandrogenism, polycystic ovaries on ultrasound.

**Gout** — Monosodium urate crystal deposition in joints; peak serum urate > 6.8 mg/dL. Podagra (first MTP joint) is the classic presentation. Dietary purines and alcohol are major triggers.

**Celiac Disease** — Immune-mediated enteropathy triggered by gluten (gliadin); villous atrophy causes malabsorption. Anti-tTG IgA antibody is the primary screening test.

**Vitamin D Deficiency** — 25(OH)D serum level < 20 ng/mL; global prevalence ~1 billion people. Severe deficiency causes rickets (children) and osteomalacia (adults).

**Iron Deficiency Anaemia** — Most common nutritional deficiency globally; MCV < 80 fL, serum ferritin < 12 μg/L. Causes include blood loss, malabsorption, and insufficient dietary intake.

**Vitamin B12 Deficiency** — Cobalamin deficiency causing macrocytic anaemia and subacute combined degeneration of the spinal cord. Neurological symptoms may be irreversible if untreated.

---

### 4.5 Neurological (7 conditions)

| Condition | Tracked Symptoms | Severity Floor | Weight |
|---|---|---|---|
| **Multiple Sclerosis** | Numbness, vision problems, fatigue, coordination problems, cognitive issues | High | 3× |
| **Parkinson's Disease** | Tremors, stiff muscles, slow movement, balance problems, speech changes | High | 3× |
| **Alzheimer's Disease** | Memory loss, confusion, mood changes, difficulty with familiar tasks | High | 3× |
| **Meningitis** | *(See Infectious — classified as Neurological system)* | **Critical** | 5× |
| **Bell's Palsy** | Sudden facial weakness, facial paralysis, drooling, eye dryness | High | 3× |
| **Trigeminal Neuralgia** | Sudden severe facial pain, electric shock sensation, facial pain triggered by touch | High | 3× |
| **Cluster Headache** | Severe pain around one eye, eye watering, nasal congestion, restlessness | High | 3× |
| **Carpal Tunnel Syndrome** | Hand numbness, wrist numbness, tingling, weakness, pain at night | Medium | 2× |

**Multiple Sclerosis** — CNS demyelinating disease; relapsing-remitting (RRMS) is most common. McDonald criteria require dissemination in space and time on MRI. DMTs reduce relapse rate by 30–70%.

**Parkinson's Disease** — Dopaminergic neurodegeneration in substantia nigra; TRAP mnemonic (Tremor, Rigidity, Akinesia, Postural instability). Lewy body pathology is hallmark.

**Alzheimer's Disease** — Most common dementia (60–80%); amyloid-β plaques and tau tangles hallmarks. Cholinesterase inhibitors provide modest symptomatic benefit. MMSE and MoCA used for staging.

**Bell's Palsy** — Idiopathic peripheral facial nerve (CN VII) palsy; HSV-1 reactivation most likely aetiology. House–Brackmann scale grades severity. Corticosteroids within 72 hours improve recovery.

**Trigeminal Neuralgia** — CN V neuropathic pain disorder; lancinating, electric-shock quality. Carbamazepine is first-line pharmacotherapy. MVD surgery offers durable remission.

**Cluster Headache** — Most severe primary headache; circadian clustering around hypothalamic activity. 100% O₂ at 12 L/min and subcutaneous sumatriptan are abortive treatments.

**Carpal Tunnel Syndrome** — Median nerve compression at the wrist; Phalen's and Tinel's signs. Nocturnal paraesthesiae are classic. Electrodiagnostic studies confirm conduction velocity slowing.

---

### 4.6 Mental Health (5 conditions)

| Condition | Tracked Symptoms | Severity Floor | Weight |
|---|---|---|---|
| **PTSD** | Flashbacks, nightmares, severe anxiety, avoidance behaviour, emotional numbness | High | 3× |
| **Bipolar Disorder** | Extreme mood swings, mania, depression, energy changes, impulsive behaviour | High | 3× |
| **OCD** | Intrusive thoughts, compulsive behaviours, anxiety, repetitive actions | Medium | 2× |
| **Eating Disorder** | Extreme food restriction, binge eating, purging, distorted body image, rapid weight change | High | 3× |
| **ADHD** | Difficulty focusing, hyperactivity, impulsivity, forgetfulness, disorganisation | Medium | 2× |

> **Suicidal ideation detector:** The keyword `suicid` or `kill myself` triggers an immediate +100 severity score, escalates the chatbot to a crisis response with emergency service instructions, and presents urgent mental health resources. See [Emergency Detection System](#7-emergency-detection-system) for full details.

**PTSD** — DSM-5 criteria require trauma exposure plus intrusion, avoidance, negative cognition, and hyperarousal clusters for >1 month. Trauma-focused CBT and EMDR are evidence-based.

**Bipolar Disorder** — Type I (full mania) vs. Type II (hypomania + depression); lithium and valproate are mood stabilisers. Bipolar depression is often misdiagnosed as MDD.

**OCD** — Obsessive-compulsive disorder; ego-dystonic intrusive thoughts driving compulsive rituals. ERP (exposure and response prevention) is gold-standard psychotherapy.

**Eating Disorder** — Includes AN (restriction, BMI < 17.5), BN (binge-purge cycles), and BED. Highest mortality rate of any psychiatric condition; multidisciplinary management required.

**ADHD** — Inattentive, hyperactive-impulsive, or combined presentations; scores on Conners/Vanderbilt scales. Stimulants (methylphenidate, amphetamines) are first-line pharmacotherapy.

---

### 4.7 Gastrointestinal (5 conditions)

| Condition | Tracked Symptoms | Severity Floor | Weight |
|---|---|---|---|
| **Pancreatitis** | Severe upper abdominal pain, nausea, vomiting, fever, rapid pulse | **Critical** | 4× |
| **Diverticulitis** | Lower left abdominal pain, fever, nausea, constipation, diarrhoea | High | 3× |
| **Gallstones** | Sudden severe abdominal pain, back pain, nausea, vomiting after fatty food | High | 3× |
| **Liver Cirrhosis** | Fatigue, jaundice, swollen abdomen, easy bruising, confusion, spider veins | High | 3× |
| **Colorectal Cancer** | Blood in stool, change in bowel habits, weight loss, fatigue, abdominal pain | High | 4× |

**Pancreatitis** — Acute: lipase >3× ULN with epigastric pain radiating to back; modified Glasgow/BISAP for severity. Severe pancreatitis (Ranson criteria ≥3) has 30–40% mortality.

**Diverticulitis** — Inflammation/infection of colonic diverticula; CT abdomen is diagnostic. Complicated diverticulitis (perforation, abscess, fistula) requires surgical management.

**Gallstones (Cholelithiasis)** — 80% cholesterol stones; biliary colic is colicky RUQ pain post-prandially. Choledocholithiasis (CBD stones) risks ascending cholangitis (Charcot's triad).

**Liver Cirrhosis** — End-stage fibrosis from alcohol, NAFLD, viral hepatitis, or autoimmune disease. MELD score quantifies 90-day mortality and determines transplant listing priority.

**Colorectal Cancer** — Third most common cancer globally; Lynch syndrome and FAP are hereditary risk factors. Colonoscopy every 10 years from age 45 is screening standard of care.

---

### 4.8 Musculoskeletal (4 conditions)

| Condition | Tracked Symptoms | Severity Floor | Weight |
|---|---|---|---|
| **Osteoporosis** | Back pain, loss of height, stooped posture, easy bone fractures | Medium | 2× |
| **Ankylosing Spondylitis** | Back pain, stiffness, fatigue, hip pain, reduced flexibility | Medium | 2× |
| **Tendinitis** | Pain near joint, stiffness, mild swelling, worsened by activity | Low | 1× |
| **Bursitis** | Joint pain, swelling, limited movement, warmth | Medium | 2× |

**Osteoporosis** — T-score ≤ −2.5 SD on DXA scan; FRAX tool estimates 10-year fracture probability. Bisphosphonates (alendronate) are first-line treatment.

**Ankylosing Spondylitis** — HLA-B27-associated seronegative spondyloarthropathy; bamboo spine on X-ray is late finding. TNF inhibitors are transformative for refractory disease.

**Tendinitis** — Tendon micro-tear and degeneration; eccentric loading protocols are evidence-based treatment. Common sites: Achilles, rotator cuff, patellar, and lateral epicondyle.

**Bursitis** — Bursal sac inflammation from repetitive trauma, infection, or crystalline arthropathy. Septic bursitis requires aspiration and antibiotics.

---

### 4.9 Dermatological (4 conditions)

| Condition | Tracked Symptoms | Severity Floor | Weight |
|---|---|---|---|
| **Melanoma** | Changing mole, asymmetric lesion, multiple colours, evolving appearance | **Critical** | 5× |
| **Psoriasis** | Red scaly patches, dry skin, cracked skin, joint pain | Low | 1× |
| **Rosacea** | Facial redness, visible blood vessels, bumps, eye irritation | Low | 1× |
| **Contact Dermatitis** | Red rash, itching, blisters, burning sensation | Low | 1× |

**Melanoma** — Most lethal skin cancer; ABCDE criteria (Asymmetry, Border, Colour, Diameter, Evolving) guide biopsy decisions. Breslow thickness determines staging. BRAF V600E mutation present in ~50%; targeted therapy available. Emergency detector: `changing mole` or `asymmetric lesion` triggers +50 severity score.

**Psoriasis** — Th17-mediated chronic inflammatory dermatosis; plaques on extensor surfaces. Biologics (IL-17, IL-23, TNF inhibitors) have transformed moderate-severe management.

**Rosacea** — Chronic facial erythema with neurovascular dysregulation; subtypes include erythematotelangiectatic, papulopustular, phymatous, and ocular. Triggers: UV, heat, alcohol, spicy food.

**Contact Dermatitis** — Allergic (type IV hypersensitivity) or irritant; patch testing identifies specific allergens. Avoidance is curative; topical corticosteroids manage acute flares.

---

## 5. Biometric Vitals Engine

Diagnex accepts three optional biometric readings that directly influence the severity scoring algorithm. These readings are entered in the symptom form and preserved in the analysis request.

### Input Parameters

| Vital | Normal Range | Unit | Critical Threshold |
|---|---|---|---|
| **Body Temperature** | 97.0 – 99.5 | °F | < 95°F (hypothermia) or ≥ 103°F (high fever) |
| **Heart Rate (BPM)** | 60 – 100 | beats/min | ≤ 40 (severe bradycardia) or ≥ 150 (severe tachycardia) |
| **SpO₂** | 95 – 100 | % | ≤ 88% (critical hypoxia) |

### Severity Score Adjustments

```
TEMPERATURE SCORING
─────────────────────────────────────────────
  temp < 95°F  (hypothermia)     → +30 pts
  temp ≥ 103°F (high fever)      → +20 pts
  temp ≥ 101°F (moderate fever)  → +10 pts
  temp ≥ 100.4°F (low-grade)     → +5 pts

HEART RATE SCORING
─────────────────────────────────────────────
  bpm ≤ 40   (severe bradycardia)  → +30 pts
  bpm ≤ 50   (bradycardia)         → +15 pts
  bpm ≥ 150  (severe tachycardia)  → +25 pts
  bpm ≥ 120  (tachycardia)         → +15 pts
  bpm ≥ 100  (mild tachycardia)    → +8 pts

SpO₂ SCORING
─────────────────────────────────────────────
  spo2 ≤ 88% (critical hypoxia)   → +40 pts
  spo2 ≤ 92% (severe hypoxia)     → +25 pts
  spo2 ≤ 95% (mild hypoxia)       → +10 pts
```

### Vitals-to-Text Injection

Abnormal vitals also inject clinical terms into the symptom text *before* keyword matching runs, so the condition scorer picks up relevant conditions:

```
temp ≥ 100.4°F  →  appends "fever high temperature"
bpm ≥ 100       →  appends "rapid heartbeat palpitations tachycardia"
bpm ≤ 50        →  appends "slow heartbeat bradycardia dizziness fatigue"
spo2 ≤ 95%      →  appends "shortness of breath low oxygen hypoxia"
```

### Color-Coded Display

| Reading | Green ✅ | Amber ⚠️ | Red 🔴 |
|---|---|---|---|
| BPM | 51 – 99 | 100 – 119 | ≤ 50 or ≥ 120 |
| SpO₂ | ≥ 96% | 93 – 95% | ≤ 92% |
| Temp | 97 – 100.3°F | 100.4 – 102.9°F | ≥ 103°F or < 95°F |

---

## 6. Symptom Analysis Algorithm

```
  INPUT: free-text symptoms + patient profile + biometric vitals
         ↓
  ┌──────────────────────────────────────┐
  │  1. NORMALISATION                    │
  │     toLowercase → synonym resolution │
  │     50+ colloquial → clinical terms  │
  │     e.g. "tired" → "fatigue"         │
  │          "racing heart" → "tachycardia rapid heartbeat"
  └──────────────────────────────────────┘
         ↓
  ┌──────────────────────────────────────┐
  │  2. VITALS INJECTION                 │
  │     abnormal vitals → append         │
  │     clinical terms to text string    │
  └──────────────────────────────────────┘
         ↓
  ┌──────────────────────────────────────┐
  │  3. KEYWORD MATCHING                 │
  │     for each of 57 CONDITIONS:       │
  │       matchCount = keywords ∩ text   │
  │       likelihood = (matchCount /     │
  │                     total_keywords)  │
  │                   × 100, capped 100  │
  │     filter: matchCount > 0           │
  │     sort: likelihood DESC,           │
  │            matchCount DESC           │
  └──────────────────────────────────────┘
         ↓
  ┌──────────────────────────────────────┐
  │  4. SEVERITY SCORING                 │
  │     base = matchedKeywords.size × 5  │
  │     + emergency combos (see §7)      │
  │     + biometric adjustments          │
  │     + age > 60 → +10                 │
  │     + painLevel adjustments          │
  │     + severityScale adjustments      │
  └──────────────────────────────────────┘
         ↓
  ┌──────────────────────────────────────┐
  │  5. TIER CLASSIFICATION              │
  │     score ≥ 51  → CRITICAL           │
  │     score ≥ 31  → HIGH               │
  │     score ≥ 16  → MEDIUM             │
  │     keywords ≥ 4 → MEDIUM (floor)   │
  │     else        → LOW                │
  └──────────────────────────────────────┘
         ↓
  ┌──────────────────────────────────────┐
  │  6. SEVERITY FLOOR ESCALATION        │
  │     top-5 conditions apply floor:    │
  │     if condition.severity_floor      │
  │        > current severity → elevate  │
  └──────────────────────────────────────┘
         ↓
  OUTPUT: AnalysisResult {
    severity, severityLabel, severityColor,
    conditions[0..4], recommendations,
    urgencyMessage, followUpQuestions,
    disclaimer, system_matches
  }
```

### Synonym Map (selected)

| Colloquial Input | Resolved Clinical Term |
|---|---|
| throwing up | vomiting |
| tired | fatigue |
| dizzy | dizziness |
| cant breathe | shortness of breath |
| racing heart | rapid heartbeat |
| yellow eyes | jaundice |
| head hurts | headache |
| chest hurts | chest pain |
| sad | depression |
| can't sleep | insomnia |
| high fever | fever high temperature |
| racing pulse | rapid heartbeat |
| low oxygen | shortness of breath low oxygen hypoxia |

---

## 7. Emergency Detection System

Diagnex includes a dedicated emergency detection layer that runs in parallel with standard scoring. When high-risk symptom combinations are identified, the system bypasses the normal tier ladder — escalating directly to **Critical**, displaying a pulsing red urgency banner, and prompting the user to seek emergency care immediately.

### Emergency Combination Detectors

| 🚨 Combination | Score Added | Target Condition |
|---|---|---|
| `chest pain` + `left arm` | +50 pts | Heart Attack (STEMI/NSTEMI) |
| `drooping` + `weakness` | +50 pts | Stroke |
| `coughing blood` | +50 pts | TB / Pulmonary Embolism |
| `stiff neck` + `headache` + `fever` | +50 pts | Meningitis |
| `changing mole` or `asymmetric lesion` | +50 pts | Melanoma |
| `suicid` or `kill myself` | +100 pts | Mental health crisis escalation |

### What Happens at Critical Severity

When any emergency pattern is matched or the severity score exceeds 51 points, Diagnex activates the following:

- **Pulsing red severity banner** with `🚨 Go to Emergency Room Now` messaging
- **Chatbot escalation** — the floating assistant immediately overrides its current intent flow and provides explicit emergency service instructions (call 911 / 112 / 999 / 108)
- **Find Nearest Care shortcut** — a one-tap button surfaces the nearest emergency departments (see [§9](#9-find-nearest-care))
- **PDF report pre-flagged** — the downloadable report is stamped with the Critical severity tier, supporting fast triage at the ER

### Mental Health Crisis Response

When suicidal ideation keywords are detected (`suicid`, `kill myself`), the system:

- Adds +100 to the severity score, guaranteeing a Critical classification
- Bypasses all other chatbot intent categories
- Displays crisis helpline guidance and urges the user to call emergency services or a trusted person immediately

---

## 8. PDF Clinical Report

After every analysis, Diagnex generates a **professional 4-page clinical PDF report** that can be downloaded, printed, or shared directly with a doctor or specialist. The report is produced entirely client-side using jsPDF and html2canvas — no data leaves the device.

### Report Contents

| Page | Content |
|---|---|
| **Page 1 — Cover** | Patient name, age, gender, blood type, current medications, known allergies, emergency contact, unique report ID, QR code linking back to Diagnex, and a `CONFIDENTIAL` watermark |
| **Page 2 — Condition Likelihood** | Horizontal bar chart of the top 5 matched conditions with percentage likelihood scores |
| **Page 3 — Body Systems & Risk** | Radar chart of affected body systems + semicircular risk gauge showing overall severity score |
| **Page 4 — Recommendations** | Ranked clinical recommendations, urgency message (e.g. "Seek care today"), and legal disclaimer |

### Why It Matters

Most consumer symptom checkers give you a result on-screen and nothing more. Diagnex lets you walk into a clinic or emergency room with a structured, timestamped document that communicates your symptoms, vitals, and flagged conditions in a format that healthcare providers can immediately act on — closing the gap between self-assessment and professional triage.

### How to Download

1. Complete a symptom analysis on the home page
2. Navigate to **Results**
3. Tap **Download PDF Report** — the report generates in-browser and saves to your device

> The PDF embeds your patient profile (name, age, blood type, medications, allergies) from the Profile page. Fill in your profile before running an analysis for a fully personalised report.

---

## 9. Find Nearest Care

Diagnex includes a one-tap geolocation feature that instantly surfaces nearby hospitals, clinics, and emergency departments — directly from the app.

### How It Works

1. Navigate to the **Find Care** tab (or tap the shortcut that appears on Critical results)
2. Tap **Find Nearest Hospitals** — the browser requests location permission
3. Diagnex uses the HTML5 Geolocation API to determine your coordinates
4. A pre-built Google Maps deep-link opens, filtered to healthcare facilities within a **13 km radius**

### Privacy

Your coordinates are passed directly to Google Maps via a URL parameter — they are never stored by Diagnex, never sent to any Diagnex backend (there isn't one), and are only used for the duration of that Maps session. Location access is entirely opt-in and can be denied at any time.

### When It Activates

The Find Care shortcut appears prominently in two places:

- **Results page** — always visible after an analysis
- **Critical severity banner** — prominently highlighted when emergency patterns are detected, encouraging users to act immediately

---

## 10. System Architecture

```
╔══════════════════════════════════════════════════════════════════════╗
║                    DIAGNEX — SYSTEM ARCHITECTURE                     ║
║                  Client-Side Only · Zero Backend                     ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  ┌───────────────────────────────────────────────────────────────┐   ║
║  │                    BROWSER (Client)                           │   ║
║  │                                                               │   ║
║  │  ┌─────────────┐   ┌─────────────────┐   ┌───────────────┐   │   ║
║  │  │ Landing Page│   │   IonReactRouter │   │  PWA Shell    │   │   ║
║  │  │    (/)      │──▶│   (React 18)    │◀──│  (manifest)   │   │   ║
║  │  └─────────────┘   └────────┬────────┘   └───────────────┘   │   ║
║  │                             │                                 │   ║
║  │         ┌───────────────────┼────────────────────┐            │   ║
║  │         ▼                   ▼                    ▼            │   ║
║  │  ┌─────────────┐   ┌──────────────┐   ┌──────────────────┐   │   ║
║  │  │    PAGES    │   │  COMPONENTS  │   │    SERVICES      │   │   ║
║  │  │             │   │              │   │                  │   │   ║
║  │  │ /home       │   │ ChatBot      │   │ symptomEngine.ts │   │   ║
║  │  │ /results    │   │ VitalsCard   │   │ pdfReport.ts     │   │   ║
║  │  │ /history    │   │ ConditionCard│   │ storage.ts       │   │   ║
║  │  │ /doctors    │   │ SymptomChips │   │ geolocation.ts   │   │   ║
║  │  │ /profile    │   │ FollowUpFlow │   │                  │   │   ║
║  │  └──────┬──────┘   └──────────────┘   └─────────────────┘    │   ║
║  │         │                                                      │   ║
║  │         ▼                                                      │   ║
║  │  ┌───────────────────────────────────────────────────────┐    │   ║
║  │  │                   DATA LAYER                          │    │   ║
║  │  │                                                       │    │   ║
║  │  │  localStorage                                         │    │   ║
║  │  │  ┌─────────────────┐  ┌──────────────┐               │    │   ║
║  │  │  │diagnex_profile  │  │diagnex_history│              │    │   ║
║  │  │  │diagnex_last_res │  │diagnex_last_r │              │    │   ║
║  │  │  └─────────────────┘  └──────────────┘               │    │   ║
║  │  └───────────────────────────────────────────────────────┘    │   ║
║  │                                                               │   ║
║  └───────────────────────────────────────────────────────────────┘   ║
║                                                                      ║
║  External (opt-in only):                                             ║
║  ┌───────────────┐   ┌──────────────────────────────────┐           ║
║  │ HTML5 Geoloc  │──▶│ Google Maps (hospital deep-link) │           ║
║  └───────────────┘   └──────────────────────────────────┘           ║
║  ┌─────────────────────────────────────────────────────────┐        ║
║  │  Web Share API → native OS share sheet (mobile)         │        ║
║  └─────────────────────────────────────────────────────────┘        ║
╚══════════════════════════════════════════════════════════════════════╝
```

### Data Flow — Analysis Pipeline

```
  [Home.tsx]                [symptomEngine.ts]         [Results.tsx]
      │                           │                         │
      │  analyzeSymptoms(         │                         │
      │    symptoms,              │                         │
      │    profileWithVitals      │                         │
      │  )                        │                         │
      │ ──────────────────────── ▶│                         │
      │                           │  normalise()            │
      │                           │  injectVitals()         │
      │                           │  matchKeywords()        │
      │                           │  scoreSeverity()        │
      │                           │  applyFloors()          │
      │                           │                         │
      │ ◀────────────────── result│                         │
      │                           │                         │
      │ localStorage.setItem(     │                         │
      │   'diagnex_last_result'   │                         │
      │   'diagnex_last_request'  │                         │
      │ )                         │                         │
      │                           │                         │
      │  router.push('/results')  │                         │
      │ ──────────────────────────┼────────────────────── ▶ │
      │                           │  useIonViewWillEnter()  │
      │                           │  read localStorage      │
      │                           │  setResult() +          │
      │                           │  setRequest()           │
      │                           │  render charts +        │
      │                           │  VitalsCard + PDF btn   │
```

---

## 11. Tech Stack

### Core Framework

| Package | Version | Purpose |
|---|---|---|
| `react` | `^18.2.0` | Component model, state, reconciler |
| `react-dom` | `^18.2.0` | DOM renderer |
| `@ionic/react` | `latest (7.x)` | Mobile-first UI component library |
| `@ionic/react-router` | `latest` | Ionic integration with React Router |
| `react-router` | `^5.3.4` | SPA routing |
| `react-router-dom` | `^5.3.4` | DOM bindings for React Router |

### Language & Build

| Package | Version | Purpose |
|---|---|---|
| `typescript` | `^5.1.6` | Static typing, strict mode enabled |
| `vite` | `^4.3.9` | Dev server, HMR, production bundler |
| `@vitejs/plugin-react` | `^4.0.3` | React fast-refresh + JSX transform |

TypeScript compiler target: **ESNext**. Module resolution: **Node**. JSX transform: **react-jsx** (no React import required). Strict mode: **on**.

### Visualisation & Documents

| Package | Version | Purpose |
|---|---|---|
| `chart.js` | `^4.5.1` | Canvas-based charting engine |
| `react-chartjs-2` | `^5.3.1` | React wrapper for Chart.js |
| `jspdf` | `^4.2.1` | PDF generation (A4 format, client-side) |
| `html2canvas` | `^1.4.1` | DOM-to-canvas rasterisation for PDF chart embedding |
| `qrcode` | `^1.5.4` | QR code generation embedded in PDF reports |

### Mobile / Native

| Package | Version | Purpose |
|---|---|---|
| `@capacitor/core` | `latest` | Native bridge (iOS/Android) |
| `@capacitor/cli` | `latest` | Build tooling for native targets |
| `@capacitor/app` | `latest` | App lifecycle events |
| `@capacitor/haptics` | `latest` | Haptic feedback on native |
| `@capacitor/keyboard` | `latest` | Native keyboard handling |
| `@capacitor/status-bar` | `latest` | Status bar control on native |

App ID: `com.diagnex.app` · Web Dir: `dist`

### Typography

| Font | Role | Source |
|---|---|---|
| Cormorant Garamond | Display headings, hero text | Google Fonts |
| DM Sans | Body text, UI labels, buttons | Google Fonts |
| JetBrains Mono | Vitals readouts, percentages, IDs | Google Fonts |

### Design Tokens

```css
/* Core Palette */
--bg-primary:     #FFF5F7    /* Lightest pink background    */
--bg-surface:     #FFFFFF    /* Card / surface white        */
--accent-soft:    #FADADD    /* Chip highlights             */
--accent-strong:  #E85A5A    /* CTAs, buttons, headers      */
--accent-coral:   #FF8A80    /* Mid-tone accents            */
--text-primary:   #1A1A1A    /* Near-black body text        */
--text-secondary: #6B6B6B    /* Muted secondary text        */
--border-color:   #F0D6DA    /* Soft pink borders           */

/* Severity System */
--severity-low:      #10B981   /* Green  — Monitor at Home  */
--severity-medium:   #F59E0B   /* Amber  — See a Doctor     */
--severity-high:     #F97316   /* Orange — Seek Care Today  */
--severity-critical: #EF4444   /* Red    — Go to ER Now     */
```

### Infrastructure

| Service | Role |
|---|---|
| Cloudflare Pages | Global CDN hosting, automatic deploys from `main` |
| GitHub | Source control, issue tracking, CI/CD trigger |
| `public/_redirects` | SPA routing fallback (all paths → `/index.html`) |

---

## 12. Getting Started

### 12.1 Prerequisites

Ensure the following are installed before proceeding:

```bash
node --version   # Required: v18.0.0 or higher (LTS recommended)
npm --version    # Required: v9.0.0 or higher
git --version    # Any recent version
```

> **Recommended:** Use [nvm](https://github.com/nvm-sh/nvm) to manage Node versions:
> ```bash
> nvm install 18
> nvm use 18
> ```

---

### 12.2 Clone the Repository

```bash
# Clone via HTTPS
git clone https://github.com/obstinix/diagnex.git

# Or via SSH (if you have SSH keys configured)
git clone git@github.com:obstinix/diagnex.git

# Navigate into the project directory
cd diagnex
```

Verify the clone is complete:

```bash
ls -la
# Should show: src/, public/, package.json, tsconfig.json, vite.config.ts, etc.
```

---

### 12.3 Install Dependencies

```bash
npm install
```

This installs all `dependencies` and `devDependencies` from `package.json`. Expected output ends with a summary of packages added. If you see `npm warn` messages, they are generally safe to ignore.

**Optional:** Audit dependencies for known vulnerabilities:

```bash
npm audit
npm audit fix    # auto-fix compatible vulnerabilities
```

---

### 12.4 Environment Configuration

Diagnex requires no mandatory environment variables for local development. A template is provided for optional API URL configuration:

```bash
cp .env.example .env
```

Default `.env.example` contents:

```env
VITE_API_URL=http://localhost:3001
```

> This variable is declared for forward-compatibility. The current application is fully client-side and does not make any runtime API calls.

---

### 12.5 Run Locally

```bash
npm run dev
```

The Vite development server starts with HMR (Hot Module Replacement):

```
  VITE v4.3.9  ready in 312 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
  ➜  press h to show help
```

Open **http://localhost:5173/** in your browser. Changes to any file in `src/` will hot-reload instantly without losing component state.

**Recommended development flow:**

1. Open http://localhost:5173/home to start on the symptom input page
2. DevTools → Application → Local Storage → `http://localhost:5173` to inspect stored data
3. Console output from `symptomEngine.ts` logs input/output at each analysis step

---

### 12.6 Build for Production

```bash
# Type-check + bundle with Vite
npm run build
```

Output is placed in `dist/`:

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js      # All JS bundled and minified
│   └── index-[hash].css     # All CSS extracted and minified
└── _redirects               # SPA routing config
```

Preview the production build locally before deploying:

```bash
npm run preview
# → http://localhost:4173/
```

**Bundle size check:**

```bash
npm run build 2>&1 | grep "kB"
# Review module sizes; investigate anything over 500 kB
```

---

### 12.7 Deploy to Cloudflare Pages

**Option A: GitHub Integration (Recommended)**

1. Push your fork to GitHub
2. Log into [Cloudflare Dashboard](https://dash.cloudflare.com)
3. Pages → Create a project → Connect to Git
4. Select `obstinix/diagnex` (or your fork)
5. Set build configuration:
   ```
   Build command:           npm run build
   Build output directory:  dist
   Node.js version:         18
   ```
6. Click **Save and Deploy** — live in ~60 seconds

Every push to `main` triggers an automatic redeploy.

**Option B: Wrangler CLI**

```bash
npm install -g wrangler
wrangler login
npm run build
wrangler pages deploy dist --project-name=diagnex
```

**Option C: Netlify**

```
Build command:    npm run build
Publish dir:      dist
```
Add a `_redirects` file (already present in `public/`):
```
/*    /index.html   200
```

---

### 12.8 Native Mobile Build (Capacitor)

Diagnex includes full [Capacitor 5](https://capacitorjs.com/) configuration for Android and iOS native builds.

```bash
# 1. Build the web assets first
npm run build

# 2. Sync into native projects
npx cap sync

# 3a. Open in Android Studio
npx cap open android

# 3b. Open in Xcode (macOS only)
npx cap open ios

# 4. Run on a connected device / simulator from within the native IDE
```

App ID: `com.diagnex.app` · App Name: `Diagnex`

> **Prerequisite for Android:** Android Studio installed with SDK 33+  
> **Prerequisite for iOS:** macOS with Xcode 14+ and CocoaPods

---

## 13. Project Structure

```
diagnex/
│
├── 📄 index.html                # Entry HTML; Google Fonts loaded here
├── 📄 vite.config.ts            # Vite build + React plugin config
├── 📄 tsconfig.json             # TypeScript config (ESNext, strict, react-jsx)
├── 📄 tsconfig.node.json        # TS config for Vite build scripts
├── 📄 capacitor.config.ts       # Capacitor native config (appId, webDir)
├── 📄 package.json              # All dependencies and npm scripts
├── 📄 .env.example              # Environment variable template
├── 📄 .gitignore                # Git ignore rules
│
├── 📁 src/
│   │
│   ├── 📄 main.tsx              # React DOM.createRoot entry point
│   ├── 📄 App.tsx               # Root: IonApp → IonTabs → routing + ChatBot
│   │
│   ├── 📁 pages/                # One component per route
│   │   ├── 📄 Landing.tsx       # Hero landing page            → /
│   │   ├── 📄 Home.tsx          # Symptom input + vitals form  → /home
│   │   ├── 📄 Results.tsx       # Analysis + charts + PDF btn  → /results
│   │   ├── 📄 History.tsx       # Saved analyses timeline      → /history
│   │   ├── 📄 DoctorFinder.tsx  # Geolocation → nearest care   → /doctors
│   │   └── 📄 Profile.tsx       # Patient demographics form    → /profile
│   │
│   ├── 📁 components/           # Reusable UI components
│   │   ├── 📄 ChatBot.tsx           # Floating AI chatbot + emergency escalation
│   │   ├── 📄 VitalsCard.tsx        # BPM / SpO₂ / Temp display (props-driven)
│   │   ├── 📄 SeverityBadge.tsx     # Colour-coded severity pill
│   │   ├── 📄 SymptomChips.tsx      # Categorised quick-tap chip grid
│   │   ├── 📄 ConditionCard.tsx     # Condition name + animated likelihood bar
│   │   ├── 📄 FollowUpFlow.tsx      # Post-analysis follow-up Q&A chips
│   │   ├── 📄 HistoryItem.tsx       # Single history entry card (swipe-delete)
│   │   ├── 📄 ProfileModal.tsx      # Patient profile edit modal
│   │   └── 📄 DownloadReportButton.tsx # PDF generation trigger button
│   │
│   ├── 📁 services/             # Business logic and data services
│   │   ├── 📄 symptomEngine.ts  # Core analysis engine (57 conditions, emergency detection, vitals)
│   │   ├── 📄 pdfReport.ts      # 4-page jsPDF report generator with charts + QR
│   │   ├── 📄 storage.ts        # localStorage CRUD utilities
│   │   └── 📄 geolocation.ts    # HTML5 geolocation → Google Maps deep-link
│   │
│   ├── 📁 types/
│   │   └── 📄 index.ts          # TypeScript interfaces: AnalysisResult, AnalyzeRequest, PatientProfile
│   │
│   └── 📁 theme/
│       ├── 📄 variables.css     # CSS design tokens (full pink palette + severity colours)
│       └── 📄 global.css        # Global styles, animations (criticalPulse, animate-in)
│
├── 📁 public/
│   └── 📄 _redirects            # SPA routing fallback: /* → /index.html 200
│
└── 📁 docs/
    └── 📁 screenshots/          # App screenshots for README
```

---

## 14. Interactive Features Guide

### Symptom Chips

The chip grid provides **40+ quick-tap shortcuts** across 7 body-system categories. Tapping a chip appends the symptom to the free-text textarea; tapping again removes it. Active chips are highlighted in `--accent-strong` (`#E85A5A`).

| Category | Chips |
|---|---|
| Common | Fever, Headache, Fatigue, Nausea, Cough, Sore Throat, Chills, Night Sweats |
| Pain | Chest Pain, Back Pain, Stomach Pain, Joint Pain, Muscle Pain |
| Cardiac | Rapid Heartbeat, Palpitations, Irregular Heartbeat, Low Blood Pressure |
| Respiratory | Shortness of Breath, Wheezing, Runny Nose, Difficulty Breathing |
| Digestive | Vomiting, Diarrhoea, Bloating, Heartburn, Loss of Appetite |
| Neuro | Dizziness, Confusion, Numbness, Vision Problems, Balance Issues |
| Skin | Rash, Jaundice, Pale Skin, Swelling |

### Follow-Up Flow

After the initial analysis, the engine generates 2 follow-up yes/no questions. Answering triggers a re-analysis with the combined context, refining the result without requiring the user to re-enter all symptoms.

### Chatbot (10 Intent Categories)

| Intent | Trigger Keywords | Response |
|---|---|---|
| Greet | hello, hi, hey | Welcome message |
| Analyze | symptoms, analyze, check | Guide to symptom page |
| Results | results, score, diagnosis | Explain results page |
| History | history, past, previous | Explain history feature |
| Hospital | hospital, doctor, clinic | Guide to Find Care |
| Critical | emergency, critical, 911 | Emergency escalation |
| Profile | profile, name, age | Explain profile feature |
| Accurate | accurate, reliable, correct | Medical disclaimer |
| Help | help, what can you do | Feature overview |
| Fallback | (any other input) | Generic helpful response |

> **Emergency escalation:** any message containing `chest pain`, `can't breathe`, `stroke`, or `suicid` immediately triggers a `🚨 CALL 911` response with emergency instructions, bypassing all other intent matching.

### PDF Report (4 Pages)

| Page | Content |
|---|---|
| 1 | Cover: patient name, age, gender, blood type, allergies, medications, report ID, QR code, CONFIDENTIAL watermark |
| 2 | Condition Likelihood: horizontal bar chart of top 5 conditions with percentage scores |
| 3 | Body Systems: radar chart of affected systems + risk gauge score |
| 4 | Recommendations: ranked clinical recommendations + urgency message + legal disclaimer |

### Analysis History

- Auto-saves every completed analysis (up to 20 entries)
- Timeline view sorted newest-first
- Tap any entry to reload its full result on the Results page
- Swipe left to reveal a delete button (IonItemSliding)

---

## 15. Contributing

Contributions are warmly welcomed. Diagnex is built to be extensible — adding conditions, improving the algorithm, refining the UI, or strengthening the emergency detection layer are all high-value areas.

### Found a Bug?

**Please open an issue before submitting a PR:**  
👉 [Open a Bug Report](https://github.com/obstinix/diagnex/issues/new?template=bug_report.md)

Include:
- Steps to reproduce
- Expected vs. actual behaviour
- Browser/device information
- Console output if applicable

### Want to Contribute Code?

```bash
# 1. Fork the repository on GitHub
# 2. Clone your fork
git clone https://github.com/<your-username>/diagnex.git
cd diagnex

# 3. Create a feature branch
git checkout -b feat/your-feature-name

# 4. Install dependencies
npm install

# 5. Make your changes
#    Follow existing code style (TypeScript strict, inline styles matching design tokens)

# 6. Test locally
npm run dev

# 7. Build to confirm no TypeScript errors
npm run build

# 8. Commit with a conventional commit message
git commit -m "feat(engine): add asthma condition with 8 keywords"

# 9. Push and open a Pull Request
git push origin feat/your-feature-name
```

### Good First Issues 🟢

| Area | Task |
|---|---|
| `symptomEngine.ts` | Add more conditions (asthma, lupus, kidney stones, endometriosis…) |
| `symptomEngine.ts` | Expand the synonym map (more colloquial expressions) |
| `symptomEngine.ts` | Add emergency combos for anaphylaxis and stroke (face drooping + arm weakness + speech) |
| `SymptomChips.tsx` | Add more chips (sexual health, vision, dental) |
| `src/theme/` | Implement dark mode toggle using CSS variables |
| `src/pages/` | Add multilingual support (i18n) |
| `src/services/` | Add unit tests for `symptomEngine.ts` |
| `pdfReport.ts` | Improve chart rendering quality at high DPI |
| `pdfReport.ts` | Add vitals graph to PDF Page 3 |
| `VitalsCard.tsx` | Add blood pressure (systolic/diastolic) input |
| `DoctorFinder.tsx` | Add filtering by care type (ER, GP, specialist) |

### Contribution Guidelines

- Match the existing inline-style patterns and design token system
- Use `Cormorant Garamond` for headings, `DM Sans` for body text, `JetBrains Mono` for numeric data
- Keep components small and single-purpose
- All TypeScript must compile with `strict: true` — no `any` escapes without justification
- Commit one logical change per commit

### Feature Requests

Have an idea for a new feature?  
👉 [Open a Feature Request](https://github.com/obstinix/diagnex/issues/new?template=feature_request.md)

---

## 16. License

This project is distributed under the **Eclipse Public License 2.0 (EPL-2.0)**.

```
Copyright (c) 2025 obstinix

This program and the accompanying materials are made available under the
terms of the Eclipse Public License 2.0 which is available at
https://www.eclipse.org/legal/epl-2.0/

SPDX-License-Identifier: EPL-2.0
```

**What EPL-2.0 means for you:**

- ✅ You may use this software for personal and commercial purposes
- ✅ You may modify the source code
- ✅ You may distribute the software
- ⚠️ If you distribute **modified** versions of EPL-licensed files, those modifications must also be released under EPL-2.0
- ⚠️ You must include a copy of the EPL-2.0 license and indicate any modifications
- ✅ You may combine EPL-2.0 code with code under other licenses (in separate files) without those other files becoming EPL-2.0

Full license text: [LICENSE](https://github.com/obstinix/diagnex/blob/main/LICENSE)  
EPL-2.0 official text: [https://www.eclipse.org/legal/epl-2.0/](https://www.eclipse.org/legal/epl-2.0/)

---

## 17. Medical Disclaimer

> **⚠️ Diagnex is NOT a medical device and does NOT provide medical advice.**

Diagnex is an educational and informational tool designed to help users understand possible associations between their self-reported symptoms and documented medical conditions. It is **not** a substitute for professional medical diagnosis, clinical examination, laboratory investigation, or treatment.

**The symptom engine:**
- Is based on keyword pattern matching, not validated clinical algorithms
- Has not undergone clinical validation or regulatory review (FDA, CE, CDSCO, etc.)
- Does not account for individual medical history, comorbidities, or clinical context beyond what is explicitly entered
- May produce incorrect, incomplete, or misleading results

**Always:**
- Consult a qualified and licensed healthcare professional for any symptoms
- Call your local emergency number (911 / 112 / 999 / 108) in any life-threatening situation
- Do not delay seeking professional medical care based on the output of this application

*Diagnex is provided "as is" without warranty of any kind, express or implied, including but not limited to warranties of fitness for a particular purpose or medical suitability. The authors and contributors accept no liability for any harm, loss, or damages arising from the use of this software.*

---

<div align="center">

**[🚀 Try Diagnex Live](https://diagnex.pages.dev/)**

Made with ❤️ by [obstinix](https://github.com/obstinix)

*Diagnex — Because your health deserves instant answers.*

[![Star This Repo](https://img.shields.io/github/stars/obstinix/diagnex?style=for-the-badge&color=E85A5A&labelColor=1A1A1A)](https://github.com/obstinix/diagnex/stargazers)
[![Fork This Repo](https://img.shields.io/github/forks/obstinix/diagnex?style=for-the-badge&color=3880FF&labelColor=1A1A1A)](https://github.com/obstinix/diagnex/network/members)
[![Open Issues](https://img.shields.io/github/issues/obstinix/diagnex?style=for-the-badge&color=F59E0B&labelColor=1A1A1A)](https://github.com/obstinix/diagnex/issues)

</div>
