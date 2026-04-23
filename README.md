# Diagnex AI Hospital Assistant

A production-grade medical PWA using Ionic React and Anthropic's Claude.

## Tech Stack
- **Frontend**: @ionic/react (Vite, TypeScript), Capacitor-ready
- **Backend**: Node.js + Express.js
- **AI Model**: claude-sonnet-4-20250514

## Setup Instructions

### Backend (API Server)
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and set your API key:
   ```bash
   cp .env.example .env
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend (Ionic React App)
1. Install dependencies from the root directory:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```

## Deployment
- **Frontend**: Deploy to Netlify using the included `netlify.toml`.
- **Backend**: Deploy to Render using the included `render.yaml`.
