import { useLocation, useNavigate } from 'react-router-dom'
import SeverityBadge from '../components/SeverityBadge'

export default function Analyze() {
  const { state } = useLocation()
  const navigate = useNavigate()

  if (!state?.result) {
    return (
      <div className="page-enter min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-white/50">No results to display.</p>
          <button onClick={() => navigate('/')} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium text-sm cursor-pointer hover:opacity-90 transition-opacity">
            Go to Home
          </button>
        </div>
      </div>
    )
  }

  const { condition, severity, recommendation, confidence, explanation } = state.result

  return (
    <div className="page-enter min-h-screen pt-20">
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-12 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white">Analysis Results</h1>
          <p className="text-sm text-white/50">
            Based on: <span className="text-emerald-400">"{state.symptoms}"</span>
          </p>
        </div>

        {/* Result card */}
        <div className="glass-card overflow-hidden shadow-2xl shadow-black/40">
          <div className={`h-1.5 ${severity === 'High' ? 'bg-gradient-to-r from-red-500 to-orange-500' : severity === 'Medium' ? 'bg-gradient-to-r from-amber-400 to-yellow-500' : 'bg-gradient-to-r from-emerald-400 to-teal-500'}`} />

          <div className="p-8 space-y-6">
            {/* Top */}
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-white/40 mb-1">Detected Condition</p>
                <h2 className="text-3xl font-bold text-white">{condition}</h2>
              </div>
              <div className="flex flex-col items-end gap-2">
                <SeverityBadge severity={severity} />
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border border-teal-500/30 bg-teal-500/15 text-teal-400">
                  ⚡ {confidence}% Confidence
                </span>
              </div>
            </div>

            {/* Confidence bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-white/40">
                <span>AI Confidence</span><span>{confidence}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all" style={{ width: `${confidence}%` }} />
              </div>
            </div>

            {/* Explanation */}
            <div className="bg-white/[0.03] p-5 rounded-xl border border-white/5 space-y-2">
              <p className="text-emerald-400 font-semibold text-sm flex items-center gap-2">📋 AI Explanation</p>
              <p className="text-white/80 text-sm leading-relaxed">{explanation}</p>
            </div>

            {/* Recommendation */}
            <div className="bg-white/[0.03] p-5 rounded-xl border border-white/5 space-y-2">
              <p className="text-teal-400 font-semibold text-sm flex items-center gap-2">✅ Recommendation</p>
              <p className="text-white/80 text-sm leading-relaxed">{recommendation}</p>
            </div>

            {/* Severity alert */}
            <div className={`rounded-xl p-4 border flex items-start gap-3 ${severity === 'High' ? 'bg-red-500/10 border-red-500/30' : severity === 'Medium' ? 'bg-amber-500/10 border-amber-500/30' : 'bg-emerald-500/10 border-emerald-500/30'}`}>
              <span className="text-lg shrink-0 mt-0.5">{severity === 'High' ? '🚨' : severity === 'Medium' ? '⚠️' : 'ℹ️'}</span>
              <p className={`text-sm font-medium leading-relaxed ${severity === 'High' ? 'text-red-200' : severity === 'Medium' ? 'text-amber-200' : 'text-emerald-200'}`}>
                {severity === 'High' ? 'This condition may require immediate medical attention. Please consider visiting an emergency room.' : severity === 'Medium' ? 'Monitor your symptoms closely and consult a doctor if they persist or worsen.' : 'This is typically a mild condition. Self-care measures may help.'}
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-white/25 text-xs">⚕️ This AI system is for informational purposes only. Not a substitute for professional medical advice.</p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button onClick={() => navigate('/')} className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-sm hover:bg-white/10 transition-colors cursor-pointer">
            ← Check Another
          </button>
          <button onClick={() => navigate('/dashboard')} className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium text-sm hover:opacity-90 transition-opacity shadow-lg shadow-emerald-500/20 cursor-pointer">
            View Dashboard →
          </button>
        </div>

        <footer className="border-t border-white/10 py-8 text-center text-xs text-white/30 mt-8">
          © 2026 Diagnex · AI-powered health insights
        </footer>
      </div>
    </div>
  )
}
