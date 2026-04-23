import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Analyze from './pages/Analyze'
import Hospitals from './pages/Hospitals'
import Dashboard from './pages/Dashboard'
import History from './pages/History'
import Emergency from './pages/Emergency'
import Chatbot from './components/Chatbot'

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyze" element={<Analyze />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/emergency" element={<Emergency />} />
      </Routes>
      <Chatbot />
    </div>
  )
}
