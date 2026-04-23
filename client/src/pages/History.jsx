import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SeverityBadge from '../components/SeverityBadge'
import { ChevronRight, ClipboardList } from 'lucide-react'

export default function History() {
  const [history, setHistory] = useState([])
  const [search, setSearch] = useState('')
  const [filterSev, setFilterSev] = useState('All')
  const [expanded, setExpanded] = useState(null)
  const navigate = useNavigate()

  useEffect(() => { setHistory(JSON.parse(localStorage.getItem('diagnex_history') || '[]')) }, [])

  const clearHistory = () => { localStorage.removeItem('diagnex_history'); setHistory([]) }

  const fmt = (iso) => new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })

  const filtered = history.filter(h => {
    const matchSearch = !search || h.condition.toLowerCase().includes(search.toLowerCase()) || h.symptoms.toLowerCase().includes(search.toLowerCase())
    const matchSev = filterSev === 'All' || h.severity === filterSev
    return matchSearch && matchSev
  })

  return (
    <div className="page-enter max-w-5xl mx-auto px-6 md:px-10 py-28 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Analysis History</h1>
        <p className="text-white/50 text-sm mt-1">Review your past symptom checks</p>
      </div>

      {/* Search + filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search conditions..."
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 transition-colors" />
        <select value={filterSev} onChange={e => setFilterSev(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/70 focus:outline-none focus:border-emerald-500/50">
          <option value="All">All Severity</option>
          <option value="High">High</option><option value="Medium">Medium</option><option value="Low">Low</option>
        </select>
        {history.length > 0 && (
          <button onClick={clearHistory} className="px-4 py-2.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm hover:bg-red-500/20 transition-all cursor-pointer whitespace-nowrap">
            Clear All
          </button>
        )}
      </div>

      {/* Entries */}
      {filtered.length === 0 && history.length === 0 ? (
        <div className="text-center py-20">
          <ClipboardList size={40} className="text-white/20 mx-auto mb-4" />
          <p className="text-white/40 text-sm">No analyses yet. Try analyzing symptoms first.</p>
          <Link to="/" className="mt-4 inline-block text-emerald-400 text-sm hover:underline">Start an analysis →</Link>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16"><p className="text-white/40 text-sm">No results match your filter.</p></div>
      ) : (
        <div className="space-y-3">
          {filtered.map(item => (
            <div key={item.id}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-emerald-500/30 hover:bg-white/[0.06] transition-all cursor-pointer border-l-4 border-l-emerald-500"
              onClick={() => setExpanded(expanded === item.id ? null : item.id)}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-white text-base">{item.condition}</div>
                  <div className="text-xs text-white/40 mt-1">{fmt(item.date)} · {item.symptoms}</div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <SeverityBadge severity={item.severity} />
                  <ChevronRight size={16} className={`text-white/30 transition-transform ${expanded === item.id ? 'rotate-90' : ''}`} />
                </div>
              </div>
              {expanded === item.id && (
                <div className="mt-4 pt-4 border-t border-white/10 text-sm text-white/60 space-y-2">
                  <p>{item.explanation || 'No detailed explanation available.'}</p>
                  <p className="text-emerald-400">{item.recommendation || 'Consult a healthcare provider.'}</p>
                  <button onClick={(e) => { e.stopPropagation(); navigate('/analyze', { state: { result: item, symptoms: item.symptoms } }) }}
                    className="mt-2 text-xs text-teal-400 hover:underline">View full analysis →</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <footer className="mt-20 border-t border-white/10 py-8 text-center text-xs text-white/30">
        © 2026 Diagnex · AI-powered health insights
      </footer>
    </div>
  )
}
