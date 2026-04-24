<div align="center">

<img src="https://img.shields.io/badge/Diagnex-AI%20Health%20Assistant-E85A5A?style=for-the-badge&logo=heart&logoColor=white" alt="Diagnex Banner" />

# 🏥 Diagnex
### *Know what your body is telling you.*

> AI-powered symptom analysis • 80+ conditions detected • Instant PDF reports • Zero backend required

[![Made with Ionic](https://img.shields.io/badge/Ionic-React-3880FF?style=flat-square&logo=ionic&logoColor=white)](https://ionicframework.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-4.5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-F38020?style=flat-square&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com)
[![License MIT](https://img.shields.io/badge/License-MIT-E85A5A?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-FADADD?style=flat-square)](https://github.com/obstinix/diagnex/pulls)
[![Stars](https://img.shields.io/github/stars/obstinix/diagnex?style=flat-square&color=E85A5A)](https://github.com/obstinix/diagnex/stargazers)

<br/>

**[🚀 Live Demo](https://7a605fa3.diagnex.pages.dev/)** • **[🐛 Report Bug](https://github.com/obstinix/diagnex/issues)** • **[✨ Request Feature](https://github.com/obstinix/diagnex/issues)**

<br/>

<table>
<tr>
<td align="center"><b>🏠 Landing Page</b></td>
<td align="center"><b>🔬 Symptom Analysis</b></td>
<td align="center"><b>📊 Results & Charts</b></td>
<td align="center"><b>📥 PDF Report</b></td>
</tr>
<tr>
<td><img src="docs/screenshots/landing.png" width="200" alt="Landing"/></td>
<td><img src="docs/screenshots/home.png" width="200" alt="Home"/></td>
<td><img src="docs/screenshots/results.png" width="200" alt="Results"/></td>
<td><img src="docs/screenshots/pdf.png" width="200" alt="PDF"/></td>
</tr>
</table>

</div>

---

## 🩺 The Problem

> *"Over 3.5 billion health-related searches happen on Google every single day — yet most people receive generic results, overwhelming jargon, or dangerously inaccurate self-diagnosis."*

Healthcare accessibility is broken:

- 🌍 **2.5 billion people** lack access to basic healthcare services worldwide
- ⏱️ Average GP appointment wait time is **2–3 weeks** in many countries
- 💸 First doctor consultation costs **$150–300+** in the US without insurance
- 😰 **72% of people** search symptoms online before seeing a doctor
- 📱 Existing symptom checkers are paywalled, inaccurate, or alarmist

**Diagnex solves this** — instant, intelligent, privacy-first symptom analysis. Completely free. No account. No data leaving your device. Ever.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔬 **Smart Symptom Engine** | Matches symptoms against 80+ conditions using weighted keyword scoring |
| 🎯 **4-Level Severity Triage** | Low → Medium → High → Critical with color-coded urgency messages |
| 📊 **In-App Charts** | Condition likelihood bars, body system radar, risk doughnut — powered by Chart.js |
| 📥 **PDF Report Generator** | 4-page downloadable report with patient data, charts, and recommendations |
| 🗣️ **Built-in Chatbot** | Floating assistant with 10 intent categories, no API needed |
| 👤 **Patient Profile** | Personalized analysis using age, gender, allergies, blood type, medications |
| 📋 **Analysis History** | Auto-saved analyses with swipe-to-delete and timeline view |
| 🏥 **Find Care** | One-tap geolocation-based nearest hospital finder |
| 📤 **Share Results** | Web Share API on mobile, clipboard fallback on desktop |
| 🔒 **100% Private** | Zero backend, zero database — all data stays on your device |
| 📱 **PWA Ready** | Installable on any device, works offline after first load |
| 💊 **20 Symptom Chips** | Categorized quick-tap chips across 5 body system groups |

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Framework** | Ionic React | ^7.0.0 | Mobile-first UI components & PWA |
| **Frontend** | React | ^18.0.0 | Component architecture |
| **Language** | TypeScript | ^5.0.0 | Type safety throughout |
| **Build Tool** | Vite | ^4.5.0 | Dev server & production builds |
| **Routing** | React Router DOM | ^5.3.0 | SPA client-side navigation |
| **Charts** | Chart.js + react-chartjs-2 | ^4.0.0 | Data visualization |
| **PDF** | jsPDF + html2canvas | ^2.5.0 | Report generation |
| **Icons** | Ionicons | ^7.0.0 | 1300+ SVG icons |
| **Fonts** | Cormorant Garamond, DM Sans, JetBrains Mono | — | Custom typography |
| **Storage** | Browser localStorage | native | Client-side persistence |
| **Hosting** | Cloudflare Pages | — | Global CDN deployment |

</div>

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    DIAGNEX ARCHITECTURE                       │
│                                                              │
│   Browser (Client-Side Only — No Backend)                    │
│                                                              │
│  ┌─────────────┐    ┌────────────────┐    ┌──────────────┐  │
│  │  Landing    │    │   Ionic App    │    │  PWA Shell   │  │
│  │  Page (/)   │───▶│  (React 18)    │◀───│  (manifest)  │  │
│  └─────────────┘    └───────┬────────┘    └──────────────┘  │
│                             │                               │
│           ┌─────────────────┼──────────────────┐            │
│           ▼                 ▼                  ▼            │
│     ┌──────────┐     ┌────────────┐     ┌───────────┐       │
│     │  Pages   │     │ Components │     │ Services  │       │
│     │ /home    │     │ ChatBot    │     │ symptom   │       │
│     │ /results │     │ Severity   │     │ Engine.ts │       │
│     │ /history │     │ Badge      │     │ pdfReport │       │
│     │ /find    │     │ VitalsCard │     │ storage   │       │
│     │ /profile │     │ SymChips   │     │ geoloc    │       │
│     └──────────┘     └────────────┘     └───────────┘       │
│                             │                               │
│           ┌─────────────────┴──────────────────┐            │
│           ▼                                    ▼            │
│   ┌───────────────┐                 ┌────────────────────┐  │
│   │  localStorage │                 │   Symptom Engine   │  │
│   │ _profile      │                 │  80+ conditions    │  │
│   │ _last_result  │                 │  50+ synonyms      │  │
│   │ _history      │                 │  Severity scorer   │  │
│   └───────────────┘                 └────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

### How The Symptom Engine Works

```
User Input → Tokenizer → Synonym Map → Condition Matcher → Severity Score → Result
   │              │            │               │                  │
"fever"      ["fever"]    ["fever",      flu: 85%           age > 60?
"headache"   ["headache"]  "headache"]   covid: 70%         +1 level
                                         cold: 60%          score → LOW/
                                                            MEDIUM/HIGH/
                                                            CRITICAL
```

---

## 📁 Project Structure

```
diagnex/
│
├── 📄 index.html                # Entry HTML, Google Fonts loaded here
├── 📄 vite.config.ts            # Vite + Ionic build configuration
├── 📄 tsconfig.json             # TypeScript configuration
├── 📄 tsconfig.node.json        # TypeScript node config
├── 📄 package.json              # Dependencies and npm scripts
├── 📄 capacitor.config.ts       # Capacitor native build config
├── 📄 .env.example              # Environment variable template
├── 📄 .gitignore                # Git ignore rules
├── 📄 REQUIREMENTS.md           # System requirements documentation
│
├── 📁 src/
│   ├── 📄 main.tsx              # React DOM entry point
│   ├── 📄 App.tsx               # Root component, routing, tab bar
│   │
│   ├── 📁 pages/
│   │   ├── 📄 Landing.tsx       # Hero landing page       → route: /
│   │   ├── 📄 Home.tsx          # Symptom input           → route: /home
│   │   ├── 📄 Results.tsx       # Analysis + charts       → route: /results
│   │   ├── 📄 History.tsx       # Saved analyses          → route: /history
│   │   ├── 📄 DoctorFinder.tsx  # Find nearest care       → route: /find-care
│   │   └── 📄 Profile.tsx       # Patient data            → route: /profile
│   │
│   ├── 📁 components/
│   │   ├── 📄 ChatBot.tsx           # Floating chatbot widget
│   │   ├── 📄 SeverityBadge.tsx     # Color-coded severity pill
│   │   ├── 📄 VitalsCard.tsx        # BPM / SpO2 / Temp display
│   │   ├── 📄 SymptomChips.tsx      # Categorized quick-tap chips
│   │   ├── 📄 ConditionCard.tsx     # Condition + likelihood bar
│   │   ├── 📄 FollowUpFlow.tsx      # Follow-up Q&A flow
│   │   ├── 📄 HistoryItem.tsx       # Single history entry card
│   │   ├── 📄 ProfileModal.tsx      # Profile edit modal
│   │   └── 📄 DownloadReportBtn.tsx # PDF download button
│   │
│   ├── 📁 services/
│   │   ├── 📄 symptomEngine.ts  # Core offline analysis engine
│   │   ├── 📄 api.ts            # API wrapper (calls engine)
│   │   ├── 📄 pdfReport.ts      # 4-page PDF generation
│   │   ├── 📄 storage.ts        # localStorage utilities
│   │   └── 📄 geolocation.ts    # Location + maps service
│   │
│   ├── 📁 types/
│   │   └── 📄 index.ts          # TypeScript interfaces & types
│   │
│   └── 📁 theme/
│       ├── 📄 variables.css     # CSS design tokens (pink palette)
│       └── 📄 global.css        # Global styles + animations
│
├── 📁 public/
│   ├── 📄 _redirects            # SPA routing (Cloudflare/Netlify)
│   └── 📄 manifest.json         # PWA manifest
│
└── 📁 docs/
    └── 📁 screenshots/          # App screenshots
```

---

## 🔬 Feature Deep Dive

### 1. Symptom Analysis Engine
The core of Diagnex is a fully client-side TypeScript engine with zero external dependencies. It tokenizes natural language input, resolves 50+ synonyms ("throwing up" → vomiting, "tired" → fatigue), scores each of 80+ conditions by keyword overlap, calculates a weighted severity score (0–15 = low, 16–30 = medium, 31–50 = high, 51+ = critical), applies an age adjustment for patients over 60, and always returns a valid result — never crashes or hangs.

### 2. PDF Report Generation
Uses jsPDF + html2canvas + Chart.js to produce a professional 4-page report. The pipeline renders Chart.js charts to canvas, converts to base64, and embeds them into the PDF. Each page includes the patient's name, age, gender, blood type, allergies, and medications pulled from their profile. A CONFIDENTIAL watermark and page footers with patient name appear on every page.

### 3. Chatbot Assistant
A floating bubble present on every page. Built with 10 keyword-matched intent categories (greet, analyze, results, history, hospital, critical, profile, accurate, help, fallback). Responds in 600–900ms with a simulated typing indicator. Emergency keywords like "chest pain" trigger an immediate 🚨 call-911 response. No API required.

### 4. Patient Profile System
Auto-saves on every keystroke via `onChange` handlers. Stores name, age, gender, blood type, allergies, medications, and emergency contact in localStorage. Profile data is embedded into every analysis result object and printed on PDF reports.

### 5. Analysis History
Saves up to 20 analyses using `useIonViewWillEnter` for live updates on every tab visit. Each entry stores symptoms, full result, and timestamp. Swipe-to-delete uses `IonItemSliding`. Tapping any entry reloads that result on the Results page.

---

## 🌐 DOM Structure

```html
<IonApp>
  <IonReactRouter>
    <IonTabs>

      <IonRouterOutlet>
        <Route exact path="/"           → <Landing />
        <Route path="/home"             → <Home />
        <Route path="/results"          → <Results />
        <Route path="/history"          → <History />
        <Route path="/find-care"        → <DoctorFinder />
        <Route path="/profile"          → <Profile />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="home"        href="/home">
        <IonTabButton tab="results"     href="/results">
        <IonTabButton tab="history"     href="/history">
        <IonTabButton tab="find-care"   href="/find-care">
        <IonTabButton tab="profile"     href="/profile">
      </IonTabBar>

    </IonTabs>

    <ChatBot />  ← fixed overlay, visible on all pages
  </IonReactRouter>
</IonApp>
```

---

## 🎨 Design System

```css
/* Pink Medical Luxury Palette */
--bg-primary:     #FFF5F7   /* Very light pink background    */
--bg-surface:     #FFFFFF   /* Card / surface white          */
--accent-soft:    #FADADD   /* Soft pink chips & highlights  */
--accent-strong:  #E85A5A   /* Muted red — buttons & CTAs   */
--accent-coral:   #FF8A80   /* Coral mid-tone accents        */
--text-primary:   #1A1A1A   /* Near-black body text          */
--text-secondary: #6B6B6B   /* Secondary / muted text        */
--border-color:   #F0D6DA   /* Soft pink borders             */

/* Severity Colors */
--severity-low:      #10B981   /* Green  */
--severity-medium:   #F59E0B   /* Amber  */
--severity-high:     #F97316   /* Orange */
--severity-critical: #EF4444   /* Red    */

/* Typography */
Display:  Cormorant Garamond  (headings, hero text)
Body:     DM Sans             (UI text, labels)
Data:     JetBrains Mono      (vitals, numbers, IDs)
```

---

## 🚀 Getting Started

### Prerequisites

```bash
node --version   # v18.0.0 or higher
npm --version    # v9.0.0 or higher
```

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/obstinix/diagnex.git
cd diagnex

# 2. Install all dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# → http://localhost:5173
```

### Build for Production

```bash
npm run build     # Outputs optimized build to /dist
npm run preview   # Preview production build locally
```

### Deploy to Cloudflare Pages

```
1. Push to GitHub (main branch)
2. Cloudflare Pages → Create → Connect to Git → obstinix/diagnex
3. Build command:          npm run build
4. Build output directory: dist
5. Save and Deploy ✅
```

---

## 🌟 Support This Project

<div align="center">

**If Diagnex helped you or you find it useful:**

[![⭐ Star This Repo](https://img.shields.io/badge/⭐%20Star%20This%20Repo-E85A5A?style=for-the-badge)](https://github.com/obstinix/diagnex/stargazers)

*Stars help others discover Diagnex and motivate continued development!*

</div>

---

## 🤝 Contributing

Contributions are what make open source amazing! Any contributions are **greatly appreciated**.

1. **Fork** the repository
2. **Create** your feature branch: `git checkout -b feature/AmazingFeature`
3. **Commit** your changes: `git commit -m 'Add AmazingFeature'`
4. **Push** to the branch: `git push origin feature/AmazingFeature`
5. **Open** a Pull Request

### Good First Issues 🟢
- Add more diseases to the symptom engine
- Add multilingual support (i18n)
- Dark mode toggle
- Unit tests for `symptomEngine.ts`
- Improve PDF chart rendering quality
- Add more synonym mappings

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## ⚠️ Medical Disclaimer

> **Diagnex is NOT a medical device and does NOT provide medical advice.**
> It is intended for informational and educational purposes only.
> Always consult a qualified healthcare professional for any medical decisions.
> In case of emergency, call your local emergency number (911 / 112) immediately.

---

<div align="center">

**[🚀 Try Diagnex Live](https://7a605fa3.diagnex.pages.dev/)**

Made with ❤️ by [obstinix](https://github.com/obstinix)

*Diagnex — Because your health deserves instant answers.*

</div>
