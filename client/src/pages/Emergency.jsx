export default function Emergency() {
  const whenToCall = ['Chest pain or pressure', 'Difficulty breathing', 'Sudden numbness or paralysis', 'Severe bleeding or trauma', 'Loss of consciousness']
  const whileWaiting = ['Stay calm, do not hang up until instructed', 'Do not move head/neck injury victims', 'Apply direct pressure to severe bleeding', 'Gather any known medications']
  const hospitals = [
    { name: 'Lakewood Urgent Care', dist: '1.2 miles', type: 'Emergency / Urgent Care', wait: '5 min', phone: '911' },
    { name: 'Metro General Hospital ER', dist: '3.4 miles', type: 'Level 1 Trauma Center', wait: '15 min', phone: '+1-555-0101' },
  ]

  return (
    <div className="page-enter min-h-screen pt-20" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(127,29,29,0.3) 0%, #0a0f0d 60%)' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
        {/* Hero banner */}
        <div className="w-full rounded-2xl bg-red-950/60 border border-red-500/30 p-10 text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-full px-4 py-1.5 mb-4">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-red-400 text-sm font-medium">Medical Emergency</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Medical Emergency</h1>
          <p className="text-lg text-red-200/80 mb-8">If you are experiencing a life-threatening emergency, call immediately.</p>
          <a href="tel:911" className="inline-flex items-center gap-3 px-12 py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xl transition-colors shadow-lg shadow-red-600/30">
            📞 CALL 911
          </a>
        </div>

        {/* Instructions grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-red-950/40 border border-red-500/25 rounded-2xl p-6">
            <h3 className="text-red-400 font-semibold text-base mb-4 flex items-center gap-2">📞 When to Call 911</h3>
            <ul className="space-y-3">
              {whenToCall.map(s => (
                <li key={s} className="flex items-center gap-3 text-sm text-white/80">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0" />{s}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-red-950/40 border border-red-500/25 rounded-2xl p-6">
            <h3 className="text-red-400 font-semibold text-base mb-4 flex items-center gap-2">🛑 While Waiting for Help</h3>
            <ul className="space-y-3">
              {whileWaiting.map(s => (
                <li key={s} className="flex items-center gap-3 text-sm text-white/80">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0" />{s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Nearest facilities */}
        <h2 className="text-xl font-bold text-white mb-4 pl-3 border-l-4 border-red-500">Nearest Emergency Facilities</h2>
        <div className="space-y-4 mb-8">
          {hospitals.map(h => (
            <div key={h.name} className="flex flex-col sm:flex-row sm:items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-red-500/30 transition-all">
              <div>
                <div className="font-semibold text-white text-base">{h.name}</div>
                <div className="text-xs text-white/50 mt-0.5">{h.type}</div>
                <div className="flex gap-3 mt-2 text-xs text-white/40">
                  <span>📍 {h.dist}</span><span className="text-red-400">⏱ {h.wait}</span>
                </div>
              </div>
              <a href={`tel:${h.phone.replace(/[^0-9+]/g, '')}`}
                className="mt-3 sm:mt-0 px-4 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-xl text-sm font-medium hover:bg-red-500/30 transition-all text-center">
                {h.phone}
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-white/25 text-xs pt-8 border-t border-red-500/20">
          ⚕️ For informational purposes only. Always consult a qualified healthcare provider.
        </p>
      </div>

      <footer className="border-t border-white/10 py-8 text-center text-xs text-white/30 mt-8">
        © 2026 Diagnex · Emergency Resources
      </footer>
    </div>
  )
}
