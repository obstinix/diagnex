import { useState, useEffect } from 'react'
import axios from 'axios'
import SkeletonCard from '../components/SkeletonCard'

export default function Hospitals() {
  const [hospitals, setHospitals] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [maxDist, setMaxDist] = useState('20')

  useEffect(() => { fetchHospitals() }, [])

  const fetchHospitals = async (specialty = '') => {
    setLoading(true)
    try {
      const { data } = await axios.get('/hospitals', { params: specialty ? { specialty } : {} })
      setHospitals(data.map(h => ({ ...h, distance: +(Math.random() * 18 + 1).toFixed(1) })))
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
    clearTimeout(window._ht)
    window._ht = setTimeout(() => fetchHospitals(e.target.value), 300)
  }

  const stars = (r) => (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`w-3.5 h-3.5 ${i < Math.floor(r) ? 'text-amber-400' : 'text-white/10'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-white/40 ml-1">{r}</span>
    </div>
  )

  const waitColor = (w) => { const m = parseInt(w); return m < 15 ? 'text-emerald-400' : m <= 30 ? 'text-amber-400' : 'text-red-400' }

  const filtered = hospitals.filter(h => h.distance <= parseInt(maxDist))

  return (
    <div className="page-enter max-w-7xl mx-auto px-6 md:px-10 py-28">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Hospitals</h1>
          <p className="text-sm text-white/50 mt-1">Find nearby hospitals and clinics</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input value={search} onChange={handleSearch} placeholder="Filter by specialty..."
              className="w-full sm:w-64 bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-emerald-500/50 transition-colors" />
          </div>
          <select value={maxDist} onChange={e => setMaxDist(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50">
            <option value="5">Within 5 mi</option>
            <option value="10">Within 10 mi</option>
            <option value="20">Within 20 mi</option>
            <option value="50">Any distance</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {loading ? (
          [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
        ) : filtered.length === 0 ? (
          <div className="col-span-full text-center py-16"><p className="text-white/40">No hospitals found.</p></div>
        ) : filtered.map(h => (
          <div key={h._id} className="group glass-card overflow-hidden hover:border-emerald-500/40 transition-all duration-300">
            <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="p-5 space-y-4">
              <div>
                <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors">{h.name}</h3>
                <div className="mt-1 flex items-center justify-between">
                  {stars(h.rating)}
                  <span className="text-xs text-white/40">{h.distance} mi</span>
                </div>
              </div>
              <div className="space-y-2 text-sm text-white/50">
                <div className="flex items-center gap-2"><span>📍</span><span className="truncate">{h.location}</span></div>
                <div className="flex items-center gap-2"><span>📞</span><span>{h.phone}</span></div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{h.specialty}</span>
                <span className={`flex items-center gap-1 text-xs ${waitColor(h.waitTime)}`}>⏱ {h.waitTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-20 border-t border-white/10 py-8 text-center text-xs text-white/30">
        © 2026 Diagnex · Hospital Directory
      </footer>
    </div>
  )
}
