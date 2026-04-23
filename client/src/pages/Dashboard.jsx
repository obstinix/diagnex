import { useState, useRef, useEffect } from 'react'
import { BarChart, Bar, PieChart, Pie, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { Download, Brain, Stethoscope } from 'lucide-react'

const TT = { backgroundColor: '#0f1a14', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', color: '#fff' }
const sevColor = (s) => s === 'High' ? 'text-red-400' : s === 'Medium' ? 'text-amber-400' : 'text-emerald-400'

export default function Dashboard() {
  const [data, setData] = useState(null)
  const ref = useRef(null)
  useEffect(() => { const h = JSON.parse(localStorage.getItem('diagnex_history') || '[]'); if (h.length) setData(h[0]) }, [])

  if (!data) return <div className="page-enter min-h-screen pt-20 flex items-center justify-center"><p className="text-white/50">No data. Complete a symptom check first.</p></div>

  const barD = [{ name: 'Fever', v: 65 }, { name: 'Headache', v: 45 }, { name: 'Fatigue', v: 78 }]
  const pieD = [{ name: 'Low', value: 45, c: '#10b981' }, { name: 'Medium', value: 35, c: '#f59e0b' }, { name: 'High', value: 20, c: '#ef4444' }]
  const lineD = [{ d: 'Mon', v: 20 }, { d: 'Tue', v: 35 }, { d: 'Wed', v: 50 }, { d: 'Thu', v: 40 }, { d: 'Fri', v: 60 }, { d: 'Sat', v: 45 }, { d: 'Sun', v: 55 }]
  const radarD = [{ s: 'Pain', A: 70 }, { s: 'Fatigue', A: 85 }, { s: 'Fever', A: 55 }, { s: 'Respiratory', A: 40 }, { s: 'Stress', A: 60 }]

  const dl = async () => {
    if (!ref.current) return
    const c = await html2canvas(ref.current, { scale: 2, backgroundColor: '#0a0f0d' })
    const pdf = new jsPDF('p', 'mm', 'a4')
    pdf.addImage(c.toDataURL('image/png'), 'PNG', 0, 0, 210, (c.height * 210) / c.width)
    pdf.save(`Diagnex-Report-${Date.now()}.pdf`)
  }

  return (
    <div className="page-enter max-w-7xl mx-auto px-6 md:px-10 py-28 space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div><h1 className="text-2xl font-bold text-white">Health Dashboard</h1><p className="text-white/50 text-sm mt-1">Analytics and health metrics</p></div>
        <button onClick={dl} className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl text-sm font-medium transition-all cursor-pointer">
          <Download size={15} /> Download Report
        </button>
      </div>

      <div ref={ref} className="space-y-6" style={{ background: '#0a0f0d', padding: 8 }}>
        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Condition', value: data.condition, color: 'text-white' },
            { label: 'Severity', value: data.severity, color: sevColor(data.severity) },
            { label: 'Confidence', value: data.confidence + '%', color: 'text-emerald-400' },
          ].map(c => (
            <div key={c.label} className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="text-xs text-white/40 uppercase tracking-wider mb-2">{c.label}</div>
              <div className={`text-2xl font-bold ${c.color}`}>{c.value}</div>
            </div>
          ))}
        </div>

        {/* Charts row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <h3 className="text-sm font-medium text-white/70 mb-4">Symptom Intensity</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barD} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={TT} /><Bar dataKey="v" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <h3 className="text-sm font-medium text-white/70 mb-4">Severity Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart><Pie data={pieD} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                {pieD.map((e, i) => <Cell key={i} fill={e.c} />)}</Pie>
                <Tooltip contentStyle={TT} /><Legend verticalAlign="bottom" height={36} iconType="circle" /></PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <h3 className="text-sm font-medium text-white/70 mb-4">Severity Trend (7 Days)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineD} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="d" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={TT} /><Line type="monotone" dataKey="v" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 0 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Radar */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <h3 className="text-sm font-medium text-white/70 mb-4">Health Metrics</h3>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarD}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" /><PolarAngleAxis dataKey="s" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.3} /><Tooltip contentStyle={TT} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* AI panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-white/70 mb-3 flex items-center gap-2"><Brain size={15} className="text-emerald-400" /> AI Explanation</h3>
            <p className="text-sm text-white/60 leading-relaxed">Symptoms "{data.symptoms}" matched {data.condition} at {data.confidence}% confidence.</p>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-emerald-400 mb-3 flex items-center gap-2"><Stethoscope size={15} /> Recommendation</h3>
            <p className="text-sm text-white/70 leading-relaxed">{data.severity === 'High' ? 'Seek immediate medical attention.' : 'Monitor symptoms and consult a provider if they worsen.'}</p>
          </div>
        </div>
      </div>

      <p className="text-center text-white/25 text-xs pt-4 border-t border-white/5">⚕️ For informational purposes only. Always consult a qualified healthcare provider.</p>
      <footer className="border-t border-white/10 py-8 text-center text-xs text-white/30 mt-8">© 2026 Diagnex · Health Dashboard</footer>
    </div>
  )
}
