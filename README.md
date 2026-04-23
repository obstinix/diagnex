<div align="center">

<img src="https://img.shields.io/badge/Diagnex-AI%20Health%20Assistant-E85A5A?style=for-the-badge&logo=heart&logoColor=white" />

# 🏥 Diagnex
### *Know what your body is telling you.*

<p>
AI-powered symptom analysis • 80+ conditions detected • 
Instant PDF reports • Zero backend required
</p>

[![Made with Ionic](https://img.shields.io/badge/Ionic-React-3880FF?style=flat-square&logo=ionic)](https://ionicframework.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![License MIT](https://img.shields.io/badge/License-MIT-E85A5A?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-FADADD?style=flat-square)](CONTRIBUTING.md)
[![Stars](https://img.shields.io/github/stars/obstinix/diagnex?style=flat-square&color=E85A5A)](https://github.com/obstinix/diagnex/stargazers)

<br/>

[🚀 Live Demo](https://diagnex.netlify.app) • 
[📖 Docs](#documentation) • 
[🐛 Report Bug](https://github.com/obstinix/diagnex/issues) • 
[✨ Request Feature](https://github.com/obstinix/diagnex/issues)

</div>

---

## 🩺 The Problem

> *"In 2024, over 3.5 billion Google searches per day are health-related. 
> Yet most people receive either generic web results, 
> overwhelming medical jargon, or inaccurate self-diagnosis."*

**Healthcare accessibility is broken:**

- 🌍 **2.5 billion people** lack access to basic healthcare services
- ⏱️ Average GP appointment wait time: **2-3 weeks** in many countries
- 💸 First doctor consultation costs **$150-300+** in the US without insurance
- 😰 **72% of people** search symptoms online before (or instead of) 
   seeing a doctor
- 📱 Yet existing symptom checkers are either paywalled, inaccurate, 
   or terrifyingly alarmist

**Diagnex solves this** by providing instant, intelligent, 
privacy-first symptom analysis — completely free, 
no account needed, no data leaving your device.

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔬 **Smart Symptom Analysis** | Matches symptoms against 80+ conditions using weighted scoring |
| 🎯 **Severity Triage** | 4-level system: Low → Medium → High → Critical |
| 📊 **Visual Charts** | Pie chart, radar, bar chart, and risk doughnut in-app |
| 📥 **PDF Reports** | 4-page report with patient data, charts, and recommendations |
| 📱 **PWA Ready** | Installable on any device, works offline |
| 🗣️ **AI Chatbot** | Built-in assistant for navigation and health queries |
| 👤 **Patient Profiles** | Personalized analysis using age, gender, allergies, medications |
| 📋 **Analysis History** | Save and revisit past analyses with swipe-to-delete |
| 🏥 **Find Care** | Geolocation-based nearest hospital finder |
| 🔒 **100% Private** | Zero backend, all data stays on your device |

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | ![Ionic](https://img.shields.io/badge/Ionic%205-3880FF?logo=ionic&logoColor=white) | Mobile-first UI components |
| **Frontend** | ![React](https://img.shields.io/badge/React%2018-61DAFB?logo=react&logoColor=black) | Component architecture |
| **Language** | ![TypeScript](https://img.shields.io/badge/TypeScript%205-3178C6?logo=typescript&logoColor=white) | Type safety |
| **Build Tool** | ![Vite](https://img.shields.io/badge/Vite%205-646CFF?logo=vite&logoColor=white) | Lightning-fast dev server |
| **Routing** | ![React Router](https://img.shields.io/badge/React%20Router%206-CA4245?logo=reactrouter&logoColor=white) | SPA navigation |
| **Charts** | ![Chart.js](https://img.shields.io/badge/Chart.js%204-FF6384?logo=chartdotjs&logoColor=white) | Data visualization |
| **PDF** | ![jsPDF](https://img.shields.io/badge/jsPDF%202-E85A5A?logoColor=white) | Report generation |
| **Styling** | ![CSS3](https://img.shields.io/badge/CSS3%20Variables-1572B6?logo=css3&logoColor=white) | Design system |
| **Storage** | ![LocalStorage](https://img.shields.io/badge/LocalStorage-F7DF1E?logo=javascript&logoColor=black) | Client-side persistence |
| **Deploy** | ![Netlify](https://img.shields.io/badge/Netlify-00C7B7?logo=netlify&logoColor=white) | Static hosting |

</div>

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    DIAGNEX ARCHITECTURE                  │
│                                                         │
│  ┌─────────────┐    ┌──────────────┐    ┌────────────┐  │
│  │   Landing   │    │  Ionic App   │    │  PWA Shell │  │
│  │    Page     │───▶│  (React 18)  │◀───│  (SW + M)  │  │
│  └─────────────┘    └──────┬───────┘    └────────────┘  │
│                            │                            │
│              ┌─────────────┼──────────────┐             │
│              ▼             ▼              ▼             │
│        ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│        │  Pages   │  │Components│  │ Services │        │
│        │ /home    │  │Severity  │  │symptom   │        │
│        │ /results │  │Badge     │  │Engine.ts │        │
│        │ /history │  │VitalsCard│  │api.ts    │        │
│        │ /find    │  │ChatBot   │  │pdfReport │        │
│        │ /profile │  │Chips     │  │storage.ts│        │
│        └──────────┘  └──────────┘  └──────────┘        │
│                            │                            │
│              ┌─────────────┴──────────────┐             │
│              ▼                            ▼             │
│        ┌──────────────┐         ┌──────────────────┐    │
│        │  LocalStorage│         │  Symptom Engine  │    │
│        │  diagnex_    │         │  80+ conditions  │    │
│        │  _profile    │         │  Synonym map     │    │
│        │  _last_result│         │  Severity scorer │    │
│        │  _history    │         │  Age adjustment  │    │
│        └──────────────┘         └──────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

### How The Symptom Engine Works

```
User Input (text)
       │
       ▼
┌─────────────────┐
│  Tokenizer      │ → splits "I have bad headache + fever"
│  + Synonym Map  │   into ["headache", "fever"]
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Condition      │ → scores each of 80+ conditions
│  Matcher        │   by keyword overlap percentage
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Severity       │ → sums danger weights per symptom
│  Calculator     │   applies age factor (60+ → +1 level)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Response       │ → generates contextual recommendations
│  Generator      │   selects relevant follow-up questions
└────────┬────────┘
         │
         ▼
   AnalysisResult
   { severity, conditions[], recommendations[],
     urgency_message, follow_up_questions[] }
```

## 📁 Project Structure

```
diagnex/
│
├── 📄 index.html              # Entry HTML, Google Fonts loaded here
├── 📄 vite.config.ts          # Vite + Ionic build config
├── 📄 tsconfig.json           # TypeScript configuration
├── 📄 package.json            # Dependencies and scripts
├── 📄 requirements.txt        # Node/npm version requirements
├── 📄 netlify.toml            # Netlify deploy config + redirects
├── 📄 capacitor.config.ts     # Capacitor config (native builds)
├── 📄 .env.example            # Environment variable template
├── 📄 .gitignore              # Git ignore rules
│
├── 📁 src/
│   ├── 📄 main.tsx            # React DOM entry point
│   ├── 📄 App.tsx             # Root component, routing, tabs
│   │
│   ├── 📁 pages/
│   │   ├── 📄 Landing.tsx     # Hero landing page (route: /)
│   │   ├── 📄 Home.tsx        # Symptom input (route: /home)
│   │   ├── 📄 Results.tsx     # Analysis output (route: /results)
│   │   ├── 📄 History.tsx     # Past analyses (route: /history)
│   │   ├── 📄 DoctorFinder.tsx # Find care (route: /find-care)
│   │   └── 📄 Profile.tsx     # Patient data (route: /profile)
│   │
│   ├── 📁 components/
│   │   ├── 📄 ChatBot.tsx         # Floating chatbot widget
│   │   ├── 📄 SeverityBadge.tsx   # Colored severity pill
│   │   ├── 📄 VitalsCard.tsx      # BPM/SpO2/Temp display
│   │   ├── 📄 SymptomChips.tsx    # Clickable symptom chips
│   │   ├── 📄 ConditionCard.tsx   # Condition likelihood bar
│   │   ├── 📄 FollowUpFlow.tsx    # Follow-up Q&A component
│   │   ├── 📄 HistoryItem.tsx     # Single history entry card
│   │   ├── 📄 ProfileModal.tsx    # Profile edit modal
│   │   └── 📄 DownloadReportBtn.tsx # PDF download button
│   │
│   ├── 📁 services/
│   │   ├── 📄 symptomEngine.ts    # Core AI analysis engine
│   │   ├── 📄 api.ts              # API service wrapper
│   │   ├── 📄 pdfReport.ts        # PDF generation logic
│   │   ├── 📄 storage.ts          # localStorage utilities
│   │   └── 📄 geolocation.ts      # Location services
│   │
│   ├── 📁 types/
│   │   └── 📄 index.ts            # TypeScript interfaces
│   │
│   └── 📁 theme/
│       ├── 📄 variables.css       # CSS design tokens
│       └── 📄 global.css          # Global styles, animations
│
├── 📁 docs/
│   └── 📁 screenshots/            # App screenshots for README
│
└── 📁 public/
    ├── 📄 favicon.ico
    └── 📄 manifest.json           # PWA manifest
```

## 🔬 Feature Deep Dive

### 1. Symptom Analysis Engine
The core of Diagnex is a client-side intelligence engine built 
in TypeScript with no external API dependencies...
(explain: tokenizer, synonym map with 50+ aliases, 
weighted scoring per symptom danger level 1-10,
condition matching across 80+ diseases,
severity calculation: 0-15=low, 16-30=medium, 31-50=high, 51+=critical,
age adjustment for 60+ patients,
fallback result always returned)

### 2. PDF Report Generation
Uses jsPDF + html2canvas + Chart.js to generate a 4-page report...
(explain: cover page structure, patient data integration,
chart rendering pipeline: Chart.js → canvas → base64 → jsPDF embed,
CONFIDENTIAL watermark, page footers)

### 3. Chatbot Assistant
10 intent categories, keyword matching, 600-900ms simulated delay...
(explain: response map structure, typing indicator,
quick command chips, emergency detection)

### 4. Patient Profile System
Auto-saves on every keystroke via onChange handlers...
(explain: localStorage key: diagnex_profile,
fields: name/age/gender/bloodType/allergies/medications/emergency,
how it influences analysis: age→severity, allergies→recommendations)

### 5. History System  
Stores up to 20 analyses, loads via useIonViewWillEnter...
(explain: localStorage key: diagnex_history,
entry structure: id/timestamp/symptoms/result,
swipe-to-delete with IonItemSliding)

## 🌐 DOM Structure

```html
<IonApp>
  <IonReactRouter>
    <!-- Tab Layout -->
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/"        → <Landing />
        <Route path="/home"    → <Home />
        <Route path="/results" → <Results />
        <Route path="/history" → <History />
        <Route path="/find-care" → <DoctorFinder />
        <Route path="/profile" → <Profile />
      </IonRouterOutlet>

      <!-- Bottom Tab Bar -->
      <IonTabBar slot="bottom">
        <IonTabButton tab="home"      href="/home">
        <IonTabButton tab="results"   href="/results">
        <IonTabButton tab="history"   href="/history">
        <IonTabButton tab="find-care" href="/find-care">
        <IonTabButton tab="profile"   href="/profile">
      </IonTabBar>
    </IonTabs>

    <!-- Global Overlay Components (outside tabs) -->
    <ChatBot />   ← fixed position, always visible
  </IonReactRouter>
</IonApp>
```

## 🚀 Getting Started

### Prerequisites

```bash
node --version   # v18.0.0 or higher required
npm --version    # v9.0.0 or higher required
```

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/obstinix/diagnex.git
cd diagnex

# 2. Install dependencies
npm install

# 3. Copy environment file
cp .env.example .env

# 4. Start development server
npm run dev

# 5. Open in browser
# → http://localhost:5173
```

### Build for Production

```bash
npm run build     # Creates optimized build in /dist
npm run preview   # Preview production build locally
```

### Deploy to Netlify

```bash
# Option 1: Drag & drop /dist folder to netlify.com/drop
# Option 2: Connect GitHub repo (auto-deploys on push)
# Option 3: Netlify CLI
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

## 🌟 Show Your Support

<div align="center">

**If Diagnex helped you or you find it useful:**

[![Star this repo](https://img.shields.io/badge/⭐%20Star%20This%20Repo-E85A5A?style=for-the-badge)](https://github.com/obstinix/diagnex)

*Stars help others discover Diagnex and motivate continued development!*

</div>

## 🤝 Contributing

Contributions are what make open source amazing! 
Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch 
   (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes 
   (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch 
   (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Good First Issues
- [ ] Add more diseases to the symptom engine
- [ ] Add more languages (i18n support)
- [ ] Dark mode toggle
- [ ] Add unit tests for symptomEngine.ts
- [ ] Improve PDF chart rendering quality

## ⚠️ Medical Disclaimer

> **Diagnex is NOT a medical device and does NOT provide medical advice.**
> It is intended for informational and educational purposes only.
> Always consult a qualified healthcare professional for medical decisions.
> In case of emergency, call your local emergency number immediately.

## 📄 License

Distributed under the MIT License. 
See `LICENSE` for more information.

---

<div align="center">
Made with ❤️ and <span style="color:#E85A5A">♥</span> 
by <a href="https://github.com/obstinix">obstinix</a>
<br/>
<sub>Diagnex — Because your health deserves instant answers.</sub>
</div>
