import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../components/Spinner'
import SkeletonCard from '../components/SkeletonCard'
import { Brain, Zap, Shield, FileText, Search, Stethoscope } from 'lucide-react'

const QUICK_CHIPS = ['Fever', 'Headache', 'Cough', 'Fatigue', 'Nausea', 'Chest Pain']

export default function Home() {
  const [symptoms, setSymptoms] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const addChip = (chip) => {
    const current = symptoms.trim()
    if (current.toLowerCase().includes(chip.toLowerCase())) return
    setSymptoms(current ? `${current}, ${chip.toLowerCase()}` : chip.toLowerCase())
  }

  const handleAnalyze = async () => {
    if (!symptoms.trim()) return
    setLoading(true)
    try {
      const { data } = await axios.post('/analyze-symptoms', { symptoms })
      const historyItem = {
        id: Date.now(), date: new Date().toISOString(), symptoms,
        condition: data.condition, severity: data.severity,
        confidence: data.confidence || 0, explanation: data.explanation || '',
        recommendation: data.recommendation || ''
      }
      const existing = JSON.parse(localStorage.getItem('diagnex_history') || '[]')
      localStorage.setItem('diagnex_history', JSON.stringify([historyItem, ...existing]))
      navigate('/analyze', { state: { result: data, symptoms } })
    } catch (err) {
      console.error('Analysis error:', err)
      alert('Failed to analyze. Make sure the server is running.')
    } finally { setLoading(false) }
  }

  return (
    <div className="page-enter min-h-screen pt-20">
      {/* Hero — two column */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              AI-Powered Health Analysis
            </div>

            <div className="space-y-3">
              <h1 className="font-extrabold leading-tight tracking-tight" style={{ fontSize: 'clamp(3.5rem, 8vw, 5.5rem)' }}>
                <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Diagnex</span>
              </h1>
              <p className="text-white/90 font-medium" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)' }}>AI Hospital Assistant</p>
            </div>

            <p className="text-white/60 leading-relaxed max-w-[520px]">
              Describe your symptoms and get instant AI-powered health insights, severity assessment, and personalized recommendations.
            </p>

            {/* Input card */}
            <div className="glass-card p-6 space-y-4">
              {/* Symptom chips */}
              <div className="flex flex-wrap gap-2 mb-3">
                {QUICK_CHIPS.map(chip => (
                  <button key={chip} onClick={() => addChip(chip)}
                    className="px-3 py-1.5 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all duration-150 cursor-pointer">
                    {chip}
                  </button>
                ))}
              </div>

              <div className="relative">
                <textarea id="symptom-input" value={symptoms}
                  onChange={e => setSymptoms(e.target.value.slice(0, 500))}
                  placeholder="Describe your symptoms here... (e.g., fever, cough, headache)"
                  rows={5}
                  className="w-full bg-white/5 border border-white/15 rounded-2xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/60 focus:bg-white/[0.08] focus:ring-2 focus:ring-emerald-500/20 resize-none transition-all duration-200 text-sm leading-relaxed"
                />
                <span className="absolute bottom-3 right-4 text-xs text-white/30 mono">{symptoms.length}/500</span>
              </div>

              <button id="analyze-btn" onClick={handleAnalyze} disabled={loading || !symptoms.trim()}
                className="animate-pulse-glow mx-auto flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold text-base px-8 py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-emerald-500/25 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer">
                <Search size={18} />
                {loading ? 'Analyzing...' : 'Analyze Symptoms'}
              </button>

              <p className="text-center text-white/30 text-xs">🔒 256-bit encrypted · HIPAA-aware · Not stored</p>
            </div>

            {loading && (
              <div className="space-y-4">
                <Spinner />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><SkeletonCard /><SkeletonCard /></div>
              </div>
            )}
          </div>

          {/* Right — floating health card */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="animate-float relative">
              <div className="glass-card p-8 w-80 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                    <Stethoscope size={20} className="text-white" />
                  </div>
                  <div><p className="text-sm font-semibold text-white">Health Score</p><p className="text-xs text-emerald-400">Excellent</p></div>
                </div>
                <svg viewBox="0 0 200 60" className="w-full h-16 text-emerald-500/60">
                  <polyline fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    points="0,30 20,30 30,10 40,50 50,25 60,35 70,20 80,40 90,30 110,30 120,5 130,55 140,30 160,30 170,15 180,45 190,30 200,30" />
                </svg>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div><p className="text-lg font-bold text-emerald-400">72</p><p className="text-[10px] text-white/40">BPM</p></div>
                  <div><p className="text-lg font-bold text-teal-400">98%</p><p className="text-[10px] text-white/40">SpO2</p></div>
                  <div><p className="text-lg font-bold text-emerald-400">36.6°</p><p className="text-[10px] text-white/40">Temp</p></div>
                </div>
              </div>
              <div className="absolute -inset-8 bg-emerald-500/5 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: <Brain size={20} />, value: '50,000+', label: 'Analyses Run' },
            { icon: <Zap size={20} />, value: '2.3s', label: 'Avg Response' },
            { icon: <Shield size={20} />, value: '94.7%', label: 'Accuracy Score' },
          ].map(s => (
            <div key={s.label} className="flex flex-col items-center p-5 rounded-2xl bg-white/5 border border-white/10 text-center transition-all duration-300 hover:border-emerald-500/30">
              <div className="text-emerald-400 mb-2">{s.icon}</div>
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-xs text-white/50 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-16">
        <h2 className="text-xl font-bold text-white mb-6 text-center">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { step: '01', icon: <FileText size={22} />, title: 'Describe', desc: 'Enter your symptoms in plain language' },
            { step: '02', icon: <Brain size={22} />, title: 'Analyze', desc: 'Our AI engine processes your input instantly' },
            { step: '03', icon: <Stethoscope size={22} />, title: 'Get Results', desc: 'Receive condition, severity & recommendations' },
          ].map(s => (
            <div key={s.step} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center space-y-3 hover:border-emerald-500/30 transition-all">
              <div className="text-emerald-400 flex justify-center">{s.icon}</div>
              <p className="text-xs font-bold text-emerald-500/60">{s.step}</p>
              <h3 className="text-base font-semibold text-white">{s.title}</h3>
              <p className="text-xs text-white/50 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pb-8">
        <p className="text-center text-white/30 text-xs">
          ⚕️ This AI system is for informational purposes only and is not a substitute for professional medical advice.
        </p>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-xs text-white/30">
        © 2026 Diagnex · AI-powered health insights · Not a substitute for medical advice
      </footer>
    </div>
  )
}
