import React, { useState, useEffect, useRef } from 'react';
import { IonIcon } from '@ionic/react';
import { chatbubbleEllipses, close, send } from 'ionicons/icons';
import { useHistory } from 'react-router';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
}

const botResponses: Record<string, { triggers: string[], response: string }> = {
  greet: {
    triggers: ['hi', 'hello', 'hey', 'start'],
    response: "Hi! 👋 I'm Diagnex Assistant. I can help you understand your symptoms, navigate the app, or find care. What would you like help with?"
  },
  analyze: {
    triggers: ['analyze', 'symptoms', 'check', 'diagnose'],
    response: "To analyze your symptoms, go to the Home tab and either type your symptoms or tap the symptom chips. Then press 'Analyze'. 🔬"
  },
  results: {
    triggers: ['results', 'report', 'analysis', 'pdf', 'download'],
    response: "Your latest results are on the Results tab. You can also download a full PDF report with charts from there! 📊"
  },
  history: {
    triggers: ['history', 'past', 'previous', 'saved'],
    response: "All your previous analyses are saved in the History tab. Tap any entry to view it again. 📋"
  },
  hospital: {
    triggers: ['hospital', 'doctor', 'clinic', 'emergency', 'near', 'find'],
    response: "Go to the 'Find Care' tab and tap 'Find Nearest Hospital'. It will use your location to find the closest medical facility. 🏥"
  },
  critical: {
    triggers: ['chest pain', 'cant breathe', 'unconscious', 'stroke', 'emergency'],
    response: "🚨 This sounds serious! Call emergency services (112/911) immediately. Do not wait. If possible, have someone stay with you."
  },
  profile: {
    triggers: ['profile', 'name', 'age', 'info', 'personal'],
    response: "You can set your name, age, gender, allergies and medications in the Profile tab. This info improves your analysis accuracy! 👤"
  },
  accurate: {
    triggers: ['accurate', 'correct', 'reliable', 'trust'],
    response: "Diagnex matches your symptoms against 80+ medical conditions. It's great for initial guidance, but always consult a real doctor for diagnosis. 🩺"
  },
  help: {
    triggers: ['help', 'what can you do', 'commands', 'options'],
    response: "I can help with:\n• How to analyze symptoms\n• Understanding your results\n• Finding nearby hospitals\n• Navigating the app\n• Basic health questions\n\nJust ask! 💬"
  }
};

const fallbackResponse = "I'm not sure about that. Try asking about symptoms, results, finding a hospital, or type 'help' to see what I can do! 😊";

const QUICK_CHIPS = ['🔬 Analyze', '📊 My Results', '🏥 Find Hospital', '❓ Help'];

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unread, setUnread] = useState(true);
  const [messages, setMessages] = useState<Message[]>([{
    id: Date.now().toString(),
    sender: 'bot',
    text: "Hi! 👋 I'm Diagnex Assistant. I can help you understand your symptoms, navigate the app, or find care. What would you like help with?"
  }]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const history = useHistory();

  useEffect(() => {
    if (isOpen) {
      setUnread(false);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages, isTyping]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text };
    let newMessages = [...messages, userMsg];
    if (newMessages.length > 50) newMessages = newMessages.slice(newMessages.length - 50);
    setMessages(newMessages);
    setInputValue('');
    setIsTyping(true);

    const lowerText = text.toLowerCase();
    
    // Quick navigations
    if (lowerText.includes('analyze') || text.includes('🔬')) {
      setTimeout(() => history.push('/home'), 500);
    } else if (lowerText.includes('results') || text.includes('📊')) {
      setTimeout(() => history.push('/results'), 500);
    } else if (lowerText.includes('hospital') || text.includes('🏥')) {
      setTimeout(() => history.push('/doctors'), 500);
    }

    let reply = fallbackResponse;
    for (const key in botResponses) {
      if (botResponses[key].triggers.some(t => lowerText.includes(t))) {
        reply = botResponses[key].response;
        break;
      }
    }

    setTimeout(() => {
      const botMsg: Message = { id: Date.now().toString(), sender: 'bot', text: reply };
      let updatedMessages = [...newMessages, botMsg];
      if (updatedMessages.length > 50) updatedMessages = updatedMessages.slice(updatedMessages.length - 50);
      setMessages(updatedMessages);
      setIsTyping(false);
    }, 600 + Math.random() * 300);
  };

  return (
    <>
      <style>
        {`
          @keyframes chatPulse {
            0% { box-shadow: 0 0 0 0 rgba(232,90,90,0.5); }
            70% { box-shadow: 0 0 0 12px rgba(232,90,90,0); }
            100% { box-shadow: 0 0 0 0 rgba(232,90,90,0); }
          }
          .chatbot-btn {
            position: fixed;
            bottom: 88px;
            right: 20px;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: #E85A5A;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 20px rgba(232,90,90,0.4);
            cursor: pointer;
            z-index: 9999;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
          .chatbot-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 8px 24px rgba(232,90,90,0.6);
          }
          .chatbot-btn.pulse {
            animation: chatPulse 2s infinite;
          }
          .chatbot-popup {
            position: fixed;
            bottom: 160px;
            right: 20px;
            width: calc(100vw - 40px);
            max-width: 320px;
            height: 420px;
            background: white;
            border: 1px solid #F0D6DA;
            border-radius: 20px;
            box-shadow: 0 16px 48px rgba(0,0,0,0.15);
            z-index: 9999;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            transform: translateY(20px);
            opacity: 0;
            pointer-events: none;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .chatbot-popup.open {
            transform: translateY(0);
            opacity: 1;
            pointer-events: auto;
          }
          .chat-typing span {
            display: inline-block;
            width: 6px;
            height: 6px;
            background-color: #E85A5A;
            border-radius: 50%;
            margin: 0 2px;
            animation: typing 1.4s infinite ease-in-out both;
          }
          .chat-typing span:nth-child(1) { animation-delay: -0.32s; }
          .chat-typing span:nth-child(2) { animation-delay: -0.16s; }
          @keyframes typing {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #F0D6DA;
            border-radius: 4px;
          }
        `}
      </style>

      {/* Button */}
      <div 
        className={`chatbot-btn ${unread ? 'pulse' : ''}`} 
        onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
      >
        <IonIcon icon={chatbubbleEllipses} style={{ fontSize: '28px' }} />
        {unread && (
          <div style={{ position: 'absolute', top: '0', right: '0', width: '12px', height: '12px', background: 'white', borderRadius: '50%', padding: '2px' }}>
            <div style={{ width: '100%', height: '100%', background: '#EF4444', borderRadius: '50%' }}></div>
          </div>
        )}
      </div>

      {/* Popup */}
      <div className={`chatbot-popup ${isOpen ? 'open' : ''}`} ref={chatRef}>
        {/* Header */}
        <div style={{ background: '#E85A5A', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', color: 'white' }}>
          <div>
            <h3 style={{ margin: '0 0 4px 0', fontFamily: 'Plus Jakarta Sans', fontSize: '16px', fontWeight: 700 }}>🏥 Diagnex Assistant</h3>
            <p style={{ margin: 0, fontFamily: 'Plus Jakarta Sans', fontSize: '12px', opacity: 0.9 }}>Ask me anything about your health</p>
          </div>
          <IonIcon icon={close} style={{ fontSize: '24px', cursor: 'pointer' }} onClick={() => setIsOpen(false)} />
        </div>

        {/* Messages Area */}
        <div className="custom-scrollbar" style={{ flex: 1, padding: '16px', overflowY: 'auto', background: '#FAFAFA', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {messages.map(msg => (
            <div key={msg.id} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
              <div style={{ 
                background: msg.sender === 'user' ? '#FADADD' : 'white',
                color: msg.sender === 'user' ? '#E85A5A' : '#1A1A1A',
                padding: '12px 16px',
                borderRadius: msg.sender === 'user' ? '16px 16px 0 16px' : '16px 16px 16px 0',
                fontFamily: 'Plus Jakarta Sans',
                fontSize: '13px',
                lineHeight: 1.5,
                boxShadow: msg.sender === 'user' ? 'none' : '0 2px 8px rgba(0,0,0,0.05)',
                border: msg.sender === 'user' ? 'none' : '1px solid #F0D6DA',
                whiteSpace: 'pre-wrap'
              }}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div style={{ alignSelf: 'flex-start', background: 'white', padding: '12px 16px', borderRadius: '16px 16px 16px 0', border: '1px solid #F0D6DA' }}>
              <div className="chat-typing"><span></span><span></span><span></span></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Chips */}
        <div className="custom-scrollbar" style={{ padding: '8px 12px', display: 'flex', gap: '8px', overflowX: 'auto', background: 'white', borderTop: '1px solid #F0D6DA' }}>
          {QUICK_CHIPS.map(chip => (
            <div 
              key={chip} 
              onClick={() => handleSend(chip)}
              style={{ padding: '6px 12px', background: '#FFF5F7', border: '1px solid #F0D6DA', borderRadius: '50px', fontSize: '12px', fontFamily: 'Plus Jakarta Sans', color: '#E85A5A', cursor: 'pointer', whiteSpace: 'nowrap', fontWeight: 600 }}
            >
              {chip}
            </div>
          ))}
        </div>

        {/* Input */}
        <div style={{ padding: '12px', background: 'white', display: 'flex', gap: '8px', borderTop: '1px solid #F0D6DA' }}>
          <input 
            type="text" 
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend(inputValue)}
            placeholder="Type a message..."
            style={{ flex: 1, border: 'none', background: '#FAFAFA', borderRadius: '20px', padding: '0 16px', outline: 'none', fontFamily: 'Plus Jakarta Sans', fontSize: '13px', color: '#1A1A1A' }}
          />
          <button 
            onClick={() => handleSend(inputValue)}
            style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#E85A5A', border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <IonIcon icon={send} style={{ fontSize: '16px', marginLeft: '2px' }} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
