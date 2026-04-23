import React, { useEffect, useRef, useState } from 'react';
import { IonPage, IonContent, IonIcon } from '@ionic/react';
import { arrowForwardOutline, arrowDownOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';

const Landing: React.FC = () => {
  const history = useHistory();
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const DISEASES = ['Malaria', 'Dengue Fever', 'Typhoid', 'Tuberculosis', 'Hepatitis A/B', 'HIV/AIDS', 'Lyme Disease', 'Chickenpox', 'Shingles', 'Mononucleosis', 'Meningitis', 'Cushing\'s Syndrome', 'Addison\'s Disease', 'PCOS', 'Gout', 'Celiac Disease', 'PAD', 'Aortic Aneurysm', 'Pulmonary Embolism', 'Cardiomyopathy', 'Multiple Sclerosis', 'Parkinson\'s', 'Alzheimer\'s', 'Bell\'s Palsy', 'COPD', 'Pulmonary Fibrosis', 'Sleep Apnea', 'PTSD', 'Bipolar Disorder', 'OCD', 'Pancreatitis', 'Diverticulitis', 'Gallstones', 'Osteoporosis', 'Melanoma', 'Psoriasis'];

  return (
    <IonPage>
      <IonContent fullscreen style={{ '--background': '#FFF5F7' }}>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
            
            .landing-bg {
              background: linear-gradient(135deg, #FFF0F3 0%, #FFF8F0 50%, #F0F4FF 100%);
              min-height: 100vh;
              position: relative;
              overflow: hidden;
            }
            .blob-1 {
              position: absolute;
              top: -100px;
              right: -100px;
              width: 600px;
              height: 600px;
              background: radial-gradient(circle, #FADADD 0%, transparent 70%);
              opacity: 0.5;
              z-index: 0;
              pointer-events: none;
            }
            .blob-2 {
              position: absolute;
              bottom: -50px;
              left: -50px;
              width: 300px;
              height: 300px;
              background: radial-gradient(circle, #FFD6D6 0%, transparent 70%);
              opacity: 0.4;
              z-index: 0;
              pointer-events: none;
            }
            
            .hero-content {
              position: relative;
              z-index: 1;
              max-width: 1200px;
              margin: 0 auto;
              padding: 60px 24px;
              display: flex;
              flex-direction: column;
              min-height: 90vh;
            }
            
            @media (min-width: 992px) {
              .hero-content {
                flex-direction: row;
                align-items: center;
              }
            }
            
            .floating-card {
              animation: floatBob 4s ease-in-out infinite;
            }
            
            @keyframes floatBob {
              0%, 100% { transform: translateY(0) rotate(3deg); }
              50% { transform: translateY(-15px) rotate(3deg); }
            }
            
            .marquee-container {
              overflow: hidden;
              white-space: nowrap;
              width: 100%;
              padding: 20px 0;
            }
            
            .marquee-content {
              display: inline-block;
              animation: marquee 30s linear infinite;
            }
            
            .marquee-content.reverse {
              animation: marqueeReverse 35s linear infinite;
            }
            
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            
            @keyframes marqueeReverse {
              0% { transform: translateX(-50%); }
              100% { transform: translateX(0); }
            }
          `}
        </style>

        <div className="landing-bg">
          <div className="blob-1"></div>
          <div className="blob-2"></div>
          
          <div className="hero-content">
            <div style={{ flex: 1, paddingRight: '20px' }}>
              <div style={{ display: 'inline-block', background: '#FADADD', color: '#E85A5A', borderRadius: '50px', padding: '6px 16px', fontFamily: 'Plus Jakarta Sans', fontSize: '14px', fontWeight: 600, marginBottom: '24px' }}>
                🔬 AI-Powered Health Analysis
              </div>
              
              <h1 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(48px, 8vw, 72px)', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.1, margin: '0 0 24px 0' }}>
                <span style={{ display: 'block' }}>Know what your</span>
                <span style={{ display: 'block', paddingLeft: '5%' }}>body is</span>
                <span style={{ display: 'block', paddingLeft: '10%' }}>telling you.</span>
              </h1>
              
              <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '18px', color: '#6B6B6B', maxWidth: '420px', lineHeight: 1.6, marginBottom: '40px' }}>
                Describe your symptoms and get instant AI-powered health insights, severity assessment, and personalized recommendations — completely free, no account needed.
              </p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
                <button 
                  onClick={() => history.push('/home')}
                  style={{ background: '#E85A5A', color: 'white', border: 'none', borderRadius: '50px', padding: '16px 36px', fontFamily: 'Plus Jakarta Sans', fontSize: '16px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 8px 32px rgba(232,90,90,0.35)', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s ease' }}
                  onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  Analyze My Symptoms <IonIcon icon={arrowForwardOutline} />
                </button>
                <button 
                  onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                  style={{ background: 'transparent', color: '#E85A5A', border: '2px solid #F0D6DA', borderRadius: '50px', padding: '16px 36px', fontFamily: 'Plus Jakarta Sans', fontSize: '16px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  See How It Works <IonIcon icon={arrowDownOutline} />
                </button>
              </div>
              
              <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '13px', color: '#6B6B6B', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                <span>🔒 No data stored</span>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#F0D6DA' }}></span>
                <span>⚡ Instant results</span>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#F0D6DA' }}></span>
                <span>🏥 80+ conditions</span>
              </div>
            </div>
            
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '60px' }}>
              <div className="floating-card" style={{ background: 'white', border: '1px solid #F0D6DA', borderRadius: '24px', padding: '24px', boxShadow: '0 24px 48px rgba(232,90,90,0.15)', maxWidth: '340px', width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 600, color: '#1A1A1A' }}>Health Score</div>
                  <div style={{ background: '#E6F4EA', color: '#137333', padding: '4px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: 700, fontFamily: 'Plus Jakarta Sans' }}>LOW RISK</div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: '32px' }}>
                  <div style={{ fontSize: '64px', fontFamily: 'Cormorant Garamond', fontWeight: 700, color: '#1A1A1A', lineHeight: 1 }}>72</div>
                  <div style={{ fontFamily: 'Plus Jakarta Sans', color: '#6B6B6B', fontSize: '14px' }}>Good</div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                  <div style={{ flex: 1, background: '#FFF5F7', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, color: '#E85A5A', fontSize: '16px' }}>72</div>
                    <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '11px', color: '#6B6B6B' }}>BPM</div>
                  </div>
                  <div style={{ flex: 1, background: '#FFF5F7', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, color: '#E85A5A', fontSize: '16px' }}>98%</div>
                    <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '11px', color: '#6B6B6B' }}>SpO2</div>
                  </div>
                  <div style={{ flex: 1, background: '#FFF5F7', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, color: '#E85A5A', fontSize: '16px' }}>36.6°</div>
                    <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '11px', color: '#6B6B6B' }}>Temp</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* STATS SECTION */}
        <div ref={statsRef} style={{ background: '#FFFFFF', padding: '80px 24px', borderBottom: '1px solid #F0D6DA' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', textAlign: 'center' }}>
            <div>
              <div style={{ fontFamily: 'Cormorant Garamond', fontSize: '56px', fontWeight: 700, color: '#E85A5A' }}>{statsVisible ? '80+' : '0'}</div>
              <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px', color: '#6B6B6B' }}>Conditions Detected</div>
            </div>
            <div>
              <div style={{ fontFamily: 'Cormorant Garamond', fontSize: '56px', fontWeight: 700, color: '#E85A5A' }}>{statsVisible ? '94.7%' : '0%'}</div>
              <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px', color: '#6B6B6B' }}>Accuracy Score</div>
            </div>
            <div>
              <div style={{ fontFamily: 'Cormorant Garamond', fontSize: '56px', fontWeight: 700, color: '#E85A5A' }}>{statsVisible ? '< 1s' : '0s'}</div>
              <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px', color: '#6B6B6B' }}>Analysis Time</div>
            </div>
            <div>
              <div style={{ fontFamily: 'Cormorant Garamond', fontSize: '56px', fontWeight: 700, color: '#E85A5A' }}>{statsVisible ? '100%' : '0%'}</div>
              <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px', color: '#6B6B6B' }}>Free Forever</div>
            </div>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div id="how-it-works" style={{ background: '#FFF5F7', padding: '80px 24px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: '40px', fontWeight: 700, color: '#1A1A1A', textAlign: 'center', marginBottom: '60px' }}>How Diagnex Works</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              <div style={{ background: 'white', border: '1px solid #F0D6DA', borderRadius: '20px', padding: '32px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-10px', right: '10px', fontFamily: 'Cormorant Garamond', fontSize: '120px', fontWeight: 700, color: '#FADADD', zIndex: 0, opacity: 0.5, lineHeight: 1 }}>1</div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '20px', fontWeight: 700, color: '#1A1A1A', marginBottom: '12px' }}>📝 Describe Symptoms</h3>
                  <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px', color: '#6B6B6B', lineHeight: 1.6 }}>Type out your symptoms in plain English or select from our categorized list of over 20+ common issues.</p>
                </div>
              </div>
              
              <div style={{ background: 'white', border: '1px solid #F0D6DA', borderRadius: '20px', padding: '32px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-10px', right: '10px', fontFamily: 'Cormorant Garamond', fontSize: '120px', fontWeight: 700, color: '#FADADD', zIndex: 0, opacity: 0.5, lineHeight: 1 }}>2</div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '20px', fontWeight: 700, color: '#1A1A1A', marginBottom: '12px' }}>🔬 AI Analyzes</h3>
                  <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px', color: '#6B6B6B', lineHeight: 1.6 }}>Our medical engine matches your profile against 80+ potential conditions instantly, assessing risk levels.</p>
                </div>
              </div>
              
              <div style={{ background: 'white', border: '1px solid #F0D6DA', borderRadius: '20px', padding: '32px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-10px', right: '10px', fontFamily: 'Cormorant Garamond', fontSize: '120px', fontWeight: 700, color: '#FADADD', zIndex: 0, opacity: 0.5, lineHeight: 1 }}>3</div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '20px', fontWeight: 700, color: '#1A1A1A', marginBottom: '12px' }}>📊 Get Your Report</h3>
                  <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px', color: '#6B6B6B', lineHeight: 1.6 }}>View condition likelihoods and download a comprehensive PDF report with charts and clear recommendations.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DISEASE PREVIEW */}
        <div style={{ background: '#FFFFFF', padding: '80px 0', overflow: 'hidden' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: '32px', fontWeight: 700, color: '#1A1A1A', textAlign: 'center', marginBottom: '40px' }}>What We Can Detect</h2>
          
          <div className="marquee-container">
            <div className="marquee-content">
              {DISEASES.map((d, i) => (
                <span key={`1-${i}`} style={{ background: '#FADADD', color: '#E85A5A', borderRadius: '50px', padding: '8px 20px', margin: '0 8px', fontFamily: 'Plus Jakarta Sans', fontSize: '14px', fontWeight: 600 }}>{d}</span>
              ))}
              {DISEASES.map((d, i) => (
                <span key={`1-dup-${i}`} style={{ background: '#FADADD', color: '#E85A5A', borderRadius: '50px', padding: '8px 20px', margin: '0 8px', fontFamily: 'Plus Jakarta Sans', fontSize: '14px', fontWeight: 600 }}>{d}</span>
              ))}
            </div>
          </div>
          
          <div className="marquee-container" style={{ marginTop: '16px' }}>
            <div className="marquee-content reverse">
              {DISEASES.reverse().map((d, i) => (
                <span key={`2-${i}`} style={{ background: '#FADADD', color: '#E85A5A', borderRadius: '50px', padding: '8px 20px', margin: '0 8px', fontFamily: 'Plus Jakarta Sans', fontSize: '14px', fontWeight: 600 }}>{d}</span>
              ))}
              {DISEASES.reverse().map((d, i) => (
                <span key={`2-dup-${i}`} style={{ background: '#FADADD', color: '#E85A5A', borderRadius: '50px', padding: '8px 20px', margin: '0 8px', fontFamily: 'Plus Jakarta Sans', fontSize: '14px', fontWeight: 600 }}>{d}</span>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ background: '#1A1A1A', color: 'white', padding: '60px 24px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'Cormorant Garamond', fontSize: '32px', fontWeight: 700, marginBottom: '16px' }}>Diagnex</div>
          <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px', color: '#A0A0A0', maxWidth: '400px', margin: '0 auto 8px auto' }}>Not a substitute for professional medical advice. Always consult a licensed physician in an emergency.</p>
          <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px', color: '#A0A0A0' }}>Made with ❤️ for better health awareness</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Landing;
