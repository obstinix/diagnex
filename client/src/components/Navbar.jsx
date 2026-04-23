import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/analyze', label: 'Analysis' },
  { to: '/hospitals', label: 'Hospitals' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/history', label: 'History' },
  { to: '/emergency', label: 'Emergency' },
]

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-3 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <span className="text-lg font-bold text-white group-hover:opacity-80 transition-opacity">Diagnex</span>
          <span className="relative flex h-2 w-2 ml-0.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
        </NavLink>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(link => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.08]'
                }`
              }>
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />AI Online
          </span>
          {/* Mobile hamburger */}
          <button id="mobile-menu-btn" className="md:hidden text-white/70 hover:text-white p-2 cursor-pointer"
            onClick={() => document.getElementById('mobile-nav')?.classList.toggle('hidden')}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div id="mobile-nav" className="hidden md:hidden border-t border-white/5 bg-black/50 backdrop-blur-xl px-6 py-3 space-y-1">
        {links.map(link => (
          <NavLink key={link.to} to={link.to} end={link.to === '/'}
            onClick={() => document.getElementById('mobile-nav')?.classList.add('hidden')}
            className={({ isActive }) =>
              `block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive ? 'bg-emerald-500/20 text-emerald-400' : 'text-white/70 hover:text-white hover:bg-white/10'
              }`
            }>
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
