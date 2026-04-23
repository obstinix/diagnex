import React, { useEffect, useState } from 'react';

interface Props {
  name: string;
  likelihood: number;
  description: string;
  severityColor: string;
}

const ConditionCard: React.FC<Props> = ({ name, likelihood, description }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(likelihood), 100);
    return () => clearTimeout(timer);
  }, [likelihood]);

  let barColor = '#1B3A6B'; // low
  if (likelihood > 60) barColor = '#EF4444'; // high
  else if (likelihood > 30) barColor = '#F59E0B'; // med

  return (
    <div style={{ background: 'white', borderRadius: '16px', padding: '16px', marginBottom: '16px', boxShadow: '0 4px 24px rgba(232, 90, 90, 0.08)', border: '1px solid #F0D6DA' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <h3 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '16px', fontWeight: 700, color: '#1A1A1A', margin: 0 }}>{name}</h3>
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: '14px', fontWeight: 700, color: '#1A1A1A' }}>{likelihood}%</span>
      </div>
      <div style={{ background: '#F0D6DA', height: '6px', borderRadius: '3px', width: '100%', marginBottom: '12px', overflow: 'hidden' }}>
        <div style={{ background: barColor, height: '100%', width: `${width}%`, transition: 'width 0.6s ease' }}></div>
      </div>
      <p style={{ margin: 0, fontFamily: 'Plus Jakarta Sans', fontSize: '13px', color: '#6B6B6B', lineHeight: '1.4' }}>{description}</p>
    </div>
  );
};

export default ConditionCard;
