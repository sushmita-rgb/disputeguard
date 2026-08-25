import React, { useEffect, useState } from 'react';
import { Sparkles, ShieldCheck, Zap, ArrowRight, X } from 'lucide-react';

export default function AiBriefingCard({ merchantName = 'Alex', disputes = [], onJumpToQueue, onClose }) {
  const pendingCount = disputes.filter(
    (d) => d.status === 'PENDING_REVIEW' || d.status === 'PENDING REVIEW'
  ).length;

  const totalAtRisk = disputes
    .filter((d) => d.status === 'PENDING_REVIEW' || d.status === 'PENDING REVIEW')
    .reduce((acc, d) => acc + (d.amount || 0), 0);

  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  // Slide in on mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      if (onClose) onClose();
    }, 320);
  };

  const hasPending = pendingCount > 0;
  const blue = '#3b82f6';

  return (
    <>
      <style>{`
        @keyframes aiBriefSlideIn {
          from { opacity: 0; transform: translateY(-24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes aiBriefSlideOut {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to   { opacity: 0; transform: translateY(-18px) scale(0.97); }
        }
        @keyframes aiBriefGlow {
          0%, 100% { box-shadow: 0 0 0 0 transparent; }
          50%       { box-shadow: 0 0 18px 6px ${hasPending ? 'rgba(59,130,246,0.35)' : 'rgba(16,185,129,0.3)'}; }
        }
        @keyframes aiBadgePulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.5; }
        }
        @keyframes aiDotPing {
          0%        { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes aiOverlayIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes aiOverlayOut {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
        .ai-close-btn:hover {
          background: rgba(255,255,255,0.12) !important;
          color: #f1f5f9 !important;
        }
        .ai-cta-btn:hover {
          background: #2563eb !important;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(59,130,246,0.5) !important;
        }
        .ai-cta-btn:active { transform: translateY(0); }
      `}</style>

      {/* Backdrop overlay */}
      <div
        onClick={handleClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.45)',
          backdropFilter: 'blur(3px)',
          zIndex: 1100,
          animation: closing ? 'aiOverlayOut 0.32s ease forwards' : 'aiOverlayIn 0.25s ease forwards',
        }}
      />

      {/* Popup card */}
      <div
        style={{
          position: 'fixed',
          top: '72px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(640px, calc(100vw - 48px))',
          zIndex: 1200,
          animation: closing
            ? 'aiBriefSlideOut 0.32s cubic-bezier(0.4,0,1,1) forwards'
            : visible
              ? 'aiBriefSlideIn 0.45s cubic-bezier(0.16,1,0.3,1) forwards'
              : 'none',
          opacity: visible ? undefined : 0,

          // Card surface
          position: 'fixed',
          borderRadius: '16px',
          padding: '24px',
          overflow: 'hidden',
          background: hasPending
            ? 'linear-gradient(135deg, rgba(23,37,84,0.82) 0%, rgba(15,23,42,0.98) 60%, rgba(15,23,42,1) 100%)'
            : 'linear-gradient(135deg, rgba(6,78,59,0.5) 0%, rgba(15,23,42,0.98) 60%, rgba(15,23,42,1) 100%)',
          border: `1px solid ${hasPending ? 'rgba(59,130,246,0.4)' : 'rgba(16,185,129,0.4)'}`,
          boxShadow: hasPending
            ? '0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(59,130,246,0.1), 0 4px 24px rgba(59,130,246,0.2)'
            : '0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(16,185,129,0.08), 0 4px 24px rgba(16,185,129,0.12)',
        }}
      >
        {/* Glow orb */}
        <div style={{
          position: 'absolute',
          top: '-50px', left: '-50px',
          width: '200px', height: '200px',
          borderRadius: '50%',
          background: hasPending ? 'rgba(59,130,246,0.2)' : 'rgba(16,185,129,0.18)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }} />

        {/* Close button — top-right */}
        <button
          className="ai-close-btn"
          onClick={handleClose}
          title="Dismiss"
          style={{
            position: 'absolute',
            top: '14px', right: '14px',
            width: '30px', height: '30px',
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.05)',
            color: '#94a3b8',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            zIndex: 1,
          }}
        >
          <X size={15} />
        </button>

        {/* Icon + headline */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', position: 'relative', paddingRight: '36px' }}>
          {/* Icon badge */}
          <div style={{
            flexShrink: 0,
            width: '52px', height: '52px',
            borderRadius: '14px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: hasPending ? 'rgba(59,130,246,0.15)' : 'rgba(16,185,129,0.15)',
            border: `1px solid ${hasPending ? 'rgba(59,130,246,0.45)' : 'rgba(16,185,129,0.45)'}`,
            animation: 'aiBriefGlow 3s ease-in-out infinite',
          }}>
            {hasPending
              ? <Sparkles size={24} color="#93c5fd" />
              : <ShieldCheck size={24} color="#6ee7b7" />
            }
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Headline + badge */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ fontSize: '1rem', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.3px' }}>
                {hasPending ? 'AI Copilot Morning Briefing' : 'Store Revenue Protected'}
              </span>

              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '3px 10px', borderRadius: '999px',
                fontSize: '10px', fontWeight: 800, letterSpacing: '0.07em', textTransform: 'uppercase',
                background: hasPending ? 'rgba(59,130,246,0.15)' : 'rgba(16,185,129,0.15)',
                color: hasPending ? '#93c5fd' : '#6ee7b7',
                border: `1px solid ${hasPending ? 'rgba(59,130,246,0.4)' : 'rgba(16,185,129,0.4)'}`,
                animation: hasPending ? 'aiBadgePulse 2s ease-in-out infinite' : 'none',
              }}>
                <span style={{ position: 'relative', display: 'inline-flex', width: '6px', height: '6px' }}>
                  <span style={{
                    position: 'absolute', inset: 0, borderRadius: '50%',
                    background: hasPending ? '#60a5fa' : '#34d399',
                    animation: hasPending ? 'aiDotPing 1.2s cubic-bezier(0,0,0.2,1) infinite' : 'none',
                  }} />
                  <span style={{
                    position: 'relative', display: 'inline-block',
                    width: '6px', height: '6px', borderRadius: '50%',
                    background: hasPending ? '#60a5fa' : '#34d399',
                  }} />
                </span>
                {hasPending ? 'ACTION REQUIRED' : 'ALL CLEAR'}
              </span>
            </div>

            {/* Message */}
            <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.65, margin: 0 }}>
              {hasPending ? (
                <>
                  👋 Hello <strong style={{ color: '#f1f5f9' }}>{merchantName}</strong>! You have{' '}
                  <strong style={{ color: '#93c5fd' }}>{pendingCount} dispute{pendingCount !== 1 ? 's' : ''}</strong> requiring
                  review (<strong style={{ color: '#fbbf24' }}>${totalAtRisk.toFixed(2)} at risk</strong>).
                  {' '}RocketRide AI has prepared defense evidence with high win probability. Let&apos;s review and represent them!
                </>
              ) : (
                <>
                  🎉 We&apos;re all set, <strong style={{ color: '#f1f5f9' }}>{merchantName}</strong>! You have{' '}
                  <strong style={{ color: '#6ee7b7' }}>0 pending disputes</strong>.{' '}
                  Your revenue is fully secure and automated monitoring is active. Nothing to worry about!
                </>
              )}
            </p>
          </div>
        </div>

        {/* CTA row */}
        <div style={{
          marginTop: '20px',
          paddingTop: '18px',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <span style={{ fontSize: '0.75rem', color: '#475569' }}>
            Powered by RocketRide AI • Real-time chargeback intelligence
          </span>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {/* Dismiss text button */}
            <button
              onClick={handleClose}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#64748b',
                fontSize: '0.8125rem',
                fontWeight: 600,
                padding: '8px 14px',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
            >
              Dismiss
            </button>

            {/* Jump CTA */}
            {hasPending && (
              <button
                className="ai-cta-btn"
                onClick={() => { handleClose(); setTimeout(onJumpToQueue, 350); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '9px 18px', borderRadius: '9px',
                  background: blue, color: '#ffffff',
                  fontSize: '0.8125rem', fontWeight: 700,
                  border: 'none', cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(59,130,246,0.4)',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                <Zap size={14} color="#bfdbfe" fill="#bfdbfe" />
                Review Disputes
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
