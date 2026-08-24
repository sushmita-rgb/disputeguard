import React from 'react';
import { ShieldAlert, DollarSign, Award, Clock } from 'lucide-react';

export default function StatsOverview({ disputes = [] }) {
  const totalCount = disputes.length;
  const totalAmount = disputes.reduce((sum, d) => sum + (d.amount || 0), 0);
  const pendingCount = disputes.filter(d => d.status === 'PENDING_REVIEW').length;
  const submittedCount = disputes.filter(d => d.status === 'SUBMITTED' || d.status === 'APPROVED').length;

  const validScores = disputes.filter(d => d.winProbabilityScore > 0);
  const avgWinScore = validScores.length > 0
    ? Math.round(validScores.reduce((sum, d) => sum + d.winProbabilityScore, 0) / validScores.length)
    : 85;

  const stats = [
    {
      title: 'Total Disputed Volume',
      value: `${totalCount} Cases`,
      sub: `$${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} Total At-Risk`,
      icon: ShieldAlert,
      color: '#6366f1',
      bg: 'rgba(99, 102, 241, 0.12)'
    },
    {
      title: 'Pending Human Approval',
      value: `${pendingCount} Cases`,
      sub: 'Action required in side-by-side modal',
      icon: Clock,
      color: '#f59e0b',
      bg: 'rgba(245, 158, 11, 0.12)'
    },
    {
      title: 'Representment Win Rate Est.',
      value: `${avgWinScore}% Score`,
      sub: 'Powered by Gemini CE3.0 analysis',
      icon: Award,
      color: '#10b981',
      bg: 'rgba(16, 185, 129, 0.12)'
    },
    {
      title: 'Submitted to Acquirers',
      value: `${submittedCount} Cases`,
      sub: '1-Click Automated Submissions',
      icon: DollarSign,
      color: '#06b6d4',
      bg: 'rgba(6, 182, 212, 0.12)'
    }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '16px',
      margin: '24px 32px'
    }}>
      {stats.map((item, idx) => {
        const IconComp = item.icon;
        return (
          <div key={idx} className="glass-panel glass-card-interactive" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                {item.title}
              </span>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: item.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <IconComp size={20} color={item.color} />
              </div>
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
              {item.value}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '4px' }}>
              {item.sub}
            </div>
          </div>
        );
      })}
    </div>
  );
}
