import { useState, useRef, useEffect } from 'react'
import axios from 'axios'

const SUGGESTIONS = [
  'What are my symptoms?',
  'Find a hospital',
  'Is this serious?',
]

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hi! I\'m the Diagnex AI assistant. How can I help you today?', time: new Date() }
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const endRef = useRef(null)
  const sessionId = useRef(`session-${Date.now()}`)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const sendMessage = async (text) => {
    const msg = text || input.trim()
    if (!msg) return
    setMessages(prev => [...prev, { role: 'user', text: msg, time: new Date() }])
    setInput('')
    setTyping(true)
    try {
      const { data } = await axios.post('/chat', { message: msg, sessionId: sessionId.current })
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', text: data.reply, time: new Date() }])
        setTyping(false)
      }, 600)
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Sorry, something went wrong. Please try again.', time: new Date() }])
      setTyping(false)
    }
  }

  const clearChat = () => {
    setMessages([{ role: 'assistant', text: 'Chat cleared. How can I help you?', time: new Date() }])
    sessionId.current = `session-${Date.now()}`
  }

  const formatTime = (date) => new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return (
    <>
      {/* Floating bubble with tooltip */}
      {!open && (
        <div className="fixed bottom-6 right-6 z-50 group">
          <button
            onClick={() => setOpen(true)}
            className="chat-bubble-pulse w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-xl shadow-emerald-500/30 flex items-center justify-center hover:scale-110 transition-all duration-200 cursor-pointer"
            aria-label="Open chat"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
          <span className="absolute bottom-16 right-0 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 pointer-events-none">
            AI Health Chat
          </span>
        </div>
      )}

      {/* Chat panel */}
      {open && (
        <div className="slide-up fixed bottom-6 right-6 z-50 w-96 h-[520px] rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-white/10 flex flex-col bg-[#0a0f0d]/95 backdrop-blur-xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-500/15 to-teal-500/15 px-5 py-4 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Diagnex Assistant</p>
                <p className="text-xs text-emerald-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Online</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={clearChat} className="text-white/40 hover:text-white/80 transition-colors cursor-pointer" title="Clear chat">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
              <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white/80 transition-colors cursor-pointer" title="Close">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-br-md'
                    : 'bg-white/5 text-white/90 rounded-bl-md border border-white/5'
                }`}>
                  <p>{m.text}</p>
                  <p className={`text-[10px] mt-1 ${m.role === 'user' ? 'text-white/50' : 'text-white/30'}`}>{formatTime(m.time)}</p>
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-bl-md border border-white/5 flex gap-1.5">
                  <span className="typing-dot w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="typing-dot w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="typing-dot w-2 h-2 rounded-full bg-emerald-400" />
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Suggestion chips */}
          <div className="px-4 py-2 flex gap-2 overflow-x-auto border-t border-white/5">
            {SUGGESTIONS.map(s => (
              <button key={s} onClick={() => sendMessage(s)} className="shrink-0 text-xs px-3 py-1.5 rounded-full border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 transition-colors cursor-pointer">
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-white/5">
            <form onSubmit={e => { e.preventDefault(); sendMessage() }} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-emerald-500/50 transition-colors"
              />
              <button type="submit" className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
