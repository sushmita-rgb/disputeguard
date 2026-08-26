// @ts-nocheck
import React, { useState } from 'react';
import { Search, Eye, Sparkles, CheckCircle2, AlertTriangle, Shield, Clock, ArrowRight } from 'lucide-react';

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
        return <span className="badge badge-approved"><CheckCircle2 size={12} /> Draft Approved</span>;
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
      return <span style={{ color: '#64748B', fontSize: '0.8rem', fontStyle: 'italic' }}>Pending AI</span>;
    }
    let className = 'score-pill score-high';
    if (score < 60) className = 'score-pill score-low';
    else if (score < 80) className = 'score-pill score-medium';

    return (
      <div className={className}>
        <Sparkles size={12} />
        {score}% Win Rate
      </div>
    );
  };

  // Helper for deadline calculation display
  const getDeadlineText = (dispute) => {
    if (dispute.status === 'SUBMITTED' || dispute.status === 'WON') {
      return <span style={{ color: '#34D399', fontSize: '0.75rem', fontWeight: 600 }}>Bank Processing</span>;
    }
    return (
      <span style={{ color: '#FCD34D', fontSize: '0.75rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
        <Clock size={12} /> 5 Days Left
      </span>
    );
  };

  return (
    <div style={{
      margin: '0 0 32px 0',
      overflow: 'hidden',
      background: '#1E293B',
      border: '1px solid #334155',
      borderRadius: '14px',
      boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.3)'
    }}>
      {/* Table Toolbar */}
      <div style={{
        padding: '18px 24px',
        borderBottom: '1px solid #334155',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        background: '#1E293B'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F8FAFC' }}>
            Active Chargeback Cases
          </h2>
          <span style={{
            background: '#0F172A',
            border: '1px solid #334155',
            padding: '3px 10px',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: '#94A3B8'
          }}>
            {filtered.length} Cases Listed
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Search Box */}
          <div style={{ position: 'relative' }}>
            <Search size={15} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search ID, customer, reason..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                background: '#0F172A',
                border: '1px solid #334155',
                borderRadius: '8px',
                padding: '8px 12px 8px 36px',
                color: '#F8FAFC',
                fontSize: '0.825rem',
                outline: 'none',
                width: '230px'
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
                  background: statusFilter === st ? 'rgba(59, 130, 246, 0.2)' : '#0F172A',
                  color: statusFilter === st ? '#60A5FA' : '#94A3B8',
                  border: statusFilter === st ? '1px solid rgba(59, 130, 246, 0.4)' : '1px solid #334155',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
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
            <tr style={{ background: '#0F172A', borderBottom: '1px solid #334155', color: '#94A3B8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              <th style={{ padding: '14px 24px', fontWeight: 600 }}>Dispute ID</th>
              <th style={{ padding: '14px 16px', fontWeight: 600 }}>Customer Info</th>
              <th style={{ padding: '14px 16px', fontWeight: 600 }}>Reason Code</th>
              <th style={{ padding: '14px 16px', fontWeight: 600 }}>Disputed Amount</th>
              <th style={{ padding: '14px 16px', fontWeight: 600 }}>Fulfillment Proof</th>
              <th style={{ padding: '14px 16px', fontWeight: 600 }}>Deadline</th>
              <th style={{ padding: '14px 16px', fontWeight: 600 }}>AI Win Score</th>
              <th style={{ padding: '14px 16px', fontWeight: 600 }}>Status</th>
              <th style={{ padding: '14px 24px', textAlign: 'right', fontWeight: 600 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ padding: '40px', textAlign: 'center', color: '#94A3B8' }}>
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
                      borderBottom: '1px solid #334155',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#273549'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '16px 24px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#60A5FA' }}>
                      {d.disputeId}
                    </td>

                    <td style={{ padding: '16px 16px' }}>
                      <span className="font-semibold text-slate-100">{d.customerName}</span>
                      <span className="text-slate-400 text-xs block">{d.customerEmail}</span>
                    </td>

                    <td style={{ padding: '16px 16px' }}>
                      <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono">{d.reasonCode}</span>
                    </td>

                    <td style={{ padding: '16px 16px' }}>
                      <span className="font-bold text-white text-sm">USD ${d.amount.toFixed(2)}</span>
                    </td>

                    <td style={{ padding: '16px 16px', fontSize: '0.8rem', color: '#94A3B8' }}>
                      {d.evidenceData?.carrier ? (
                        <div>
                          <div style={{ color: '#E2E8F0', fontWeight: 500 }}>{d.evidenceData.carrier}</div>
                          <span className="font-mono text-cyan-400 text-xs hover:underline">{d.evidenceData.trackingNumber}</span>
                        </div>
                      ) : (
                        <span style={{ fontStyle: 'italic', color: '#64748B' }}>Digital SaaS</span>
                      )}
                    </td>

                    <td style={{ padding: '16px 16px' }}>
                      {getDeadlineText(d)}
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
                          style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                        >
                          <Eye size={13} /> Review & Edit
                        </button>

                        {(!d.aiDefenseLetter || d.winProbabilityScore === 0) && (
                          <button
                            onClick={() => onTriggerDefend(d.disputeId)}
                            className="btn btn-primary"
                            disabled={isGenerating}
                            style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                          >
                            <Sparkles size={13} className={isGenerating ? 'spin-icon' : ''} />
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
