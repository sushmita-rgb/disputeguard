import React, { useState } from 'react';
import { Search, Eye, Sparkles, CheckCircle2, AlertTriangle, Shield, ArrowUpRight } from 'lucide-react';

export default function DisputeTable({ disputes = [], onSelectDispute, onTriggerDefend, loadingId }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filtered = disputes.filter(d => {
    const matchesSearch = 
      d.disputeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.reasonCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PENDING_REVIEW':
        return <span className="badge badge-pending"><AlertTriangle size={12} /> Pending Review</span>;
      case 'APPROVED':
        return <span className="badge badge-approved"><CheckCircle2 size={12} /> Approved Draft</span>;
      case 'SUBMITTED':
        return <span className="badge badge-submitted"><Shield size={12} /> Submitted to Bank</span>;
      case 'WON':
        return <span className="badge badge-won"><CheckCircle2 size={12} /> Case Won</span>;
      case 'LOST':
        return <span className="badge badge-lost"><AlertTriangle size={12} /> Case Lost</span>;
      default:
        return <span className="badge">{status}</span>;
    }
  };

  const getScoreBadge = (score) => {
    if (!score || score === 0) {
      return <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem', fontStyle: 'italic' }}>Uncalculated</span>;
    }
    let className = 'score-pill score-high';
    if (score < 60) className = 'score-pill score-low';
    else if (score < 80) className = 'score-pill score-medium';

    return (
      <div className={className}>
        <Sparkles size={13} />
        {score}% Win Rate
      </div>
    );
  };

  return (
    <div className="glass-panel" style={{ margin: '0 32px 32px 32px', overflow: 'hidden' }}>
      {/* Table Toolbar */}
      <div style={{
        padding: '20px 24px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
            Active Chargeback Cases
          </h2>
          <span style={{
            background: 'rgba(255, 255, 255, 0.08)',
            padding: '2px 10px',
            borderRadius: '12px',
            fontSize: '0.78rem',
            color: 'var(--text-muted)'
          }}>
            {filtered.length} shown
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Search Box */}
          <div style={{ position: 'relative' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search ID, customer, code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid var(--border-card)',
                borderRadius: '8px',
                padding: '8px 12px 8px 36px',
                color: 'var(--text-main)',
                fontSize: '0.85rem',
                outline: 'none',
                width: '240px'
              }}
            />
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '6px' }}>
            {['ALL', 'PENDING_REVIEW', 'SUBMITTED'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                style={{
                  background: statusFilter === st ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                  color: statusFilter === st ? '#818cf8' : 'var(--text-muted)',
                  border: statusFilter === st ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid transparent',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {st === 'ALL' ? 'All Cases' : st === 'PENDING_REVIEW' ? 'Pending Review' : 'Submitted'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ background: 'rgba(15, 23, 42, 0.4)', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <th style={{ padding: '16px 24px' }}>Dispute ID</th>
              <th style={{ padding: '16px 16px' }}>Customer & Email</th>
              <th style={{ padding: '16px 16px' }}>Reason Code</th>
              <th style={{ padding: '16px 16px' }}>Disputed Amount</th>
              <th style={{ padding: '16px 16px' }}>Delivery / Proof</th>
              <th style={{ padding: '16px 16px' }}>AI Win Score</th>
              <th style={{ padding: '16px 16px' }}>Status</th>
              <th style={{ padding: '16px 24px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ padding: '40px', textAlign: 'center', color: 'var(--text-dim)' }}>
                  No dispute cases match the selected search/filter criteria.
                </td>
              </tr>
            ) : (
              filtered.map((d) => {
                const isGenerating = loadingId === d.disputeId;
                return (
                  <tr
                    key={d.disputeId}
                    style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '16px 24px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#e2e8f0' }}>
                      {d.disputeId}
                    </td>

                    <td style={{ padding: '16px 16px' }}>
                      <div style={{ fontWeight: 600, color: '#f8fafc' }}>{d.customerName}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{d.customerEmail}</div>
                    </td>

                    <td style={{ padding: '16px 16px' }}>
                      <span style={{
                        background: 'rgba(255, 255, 255, 0.06)',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        fontFamily: 'var(--font-mono)',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}>
                        {d.reasonCode} ({d.reasonCategory || 'FRAUD'})
                      </span>
                    </td>

                    <td style={{ padding: '16px 16px', fontWeight: 700, color: '#ffffff' }}>
                      {d.currency} ${d.amount.toFixed(2)}
                    </td>

                    <td style={{ padding: '16px 16px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {d.evidenceData?.carrier ? (
                        <div>
                          <div>{d.evidenceData.carrier}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>{d.evidenceData.trackingNumber}</div>
                        </div>
                      ) : (
                        <span style={{ fontStyle: 'italic', color: 'var(--text-dim)' }}>Digital Service</span>
                      )}
                    </td>

                    <td style={{ padding: '16px 16px' }}>
                      {getScoreBadge(d.winProbabilityScore)}
                    </td>

                    <td style={{ padding: '16px 16px' }}>
                      {getStatusBadge(d.status)}
                    </td>

                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                        <button
                          onClick={() => onSelectDispute(d)}
                          className="btn btn-secondary"
                          style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                        >
                          <Eye size={14} /> Review & Edit
                        </button>

                        {(!d.aiDefenseLetter || d.winProbabilityScore === 0) && (
                          <button
                            onClick={() => onTriggerDefend(d.disputeId)}
                            className="btn btn-primary"
                            disabled={isGenerating}
                            style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                          >
                            <Sparkles size={14} className={isGenerating ? 'spin-icon' : ''} />
                            {isGenerating ? 'Drafting...' : 'AI Defend'}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
