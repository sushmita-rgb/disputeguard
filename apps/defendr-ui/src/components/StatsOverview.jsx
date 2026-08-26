// @ts-nocheck
import React from 'react';
import { ShieldAlert, DollarSign, Award, Clock, ArrowUpRight } from 'lucide-react';

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
      value: `$${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      sub: `${totalCount} Active Cases At-Risk`,
      icon: ShieldAlert,
      color: '#3B82F6',
      bg: 'rgba(59, 130, 246, 0.12)',
      border: 'rgba(59, 130, 246, 0.25)'
    },
    {
      title: 'Pending Review Action',
      value: `${pendingCount} Cases`,
      sub: 'Action required before bank deadline',
      icon: Clock,
      color: '#F59E0B',
      bg: 'rgba(245, 158, 11, 0.12)',
      border: 'rgba(245, 158, 11, 0.25)'
    },
    {
      title: 'Avg. Win Probability',
      value: `${avgWinScore}% Score`,
      sub: 'Powered by Gemini CE3.0 engine',
      icon: Award,
      color: '#10B981',
      bg: 'rgba(16, 185, 129, 0.12)',
      border: 'rgba(16, 185, 129, 0.25)'
    },
    {
      title: 'Represented to Acquirers',
      value: `${submittedCount} Cases`,
      sub: 'Automated 1-click representments',
      icon: DollarSign,
      color: '#06B6D4',
      bg: 'rgba(6, 182, 212, 0.12)',
      border: 'rgba(6, 182, 212, 0.25)'
    }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
      gap: '16px',
      margin: '24px 28px'
    }}>
      {stats.map((item, idx) => {
        const IconComp = item.icon;
        return (
          <div key={idx} className="glass-card-interactive" style={{
            padding: '20px',
            background: '#1E293B',
            border: '1px solid #334155',
            borderRadius: '14px',
            boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.825rem', color: '#94A3B8', fontWeight: 500 }}>
                {item.title}
              </span>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: item.bg,
                border: `1px solid ${item.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <IconComp size={18} color={item.color} />
              </div>
            </div>
            
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F8FAFC', letterSpacing: '-0.02em' }}>
              {item.value}
            </div>

            <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ArrowUpRight size={12} color={item.color} />
              <span>{item.sub}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
