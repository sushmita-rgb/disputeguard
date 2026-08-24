import React from 'react';
import { ShieldCheck, Cpu, Sparkles, Upload, RefreshCw } from 'lucide-react';

export default function Header({ onOpenBatchUpload, onRefresh, isRefreshing }) {
  return (
    <header style={{
      padding: '20px 32px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: 'rgba(11, 15, 25, 0.8)',
      backdropFilter: 'blur(12px)',
      sticky: 'top',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{
          width: '46px',
          height: '46px',
          borderRadius: '14px',
          background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)'
        }}>
          <ShieldCheck size={26} color="#ffffff" />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
              ChargeGuard <span style={{ background: 'linear-gradient(90deg, #6366f1, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AI</span>
            </h1>
            <span className="badge" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
              RocketRide Pipeline
            </span>
            <span className="badge" style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
              Google Gemini 1.5
            </span>
          </div>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Autonomous Chargeback Defense & Visa/Mastercard Compelling Evidence Representment Engine
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={onRefresh}
          className="btn btn-secondary"
          disabled={isRefreshing}
          title="Refresh dispute list"
        >
          <RefreshCw size={16} className={isRefreshing ? 'spin-icon' : ''} />
          {isRefreshing ? 'Syncing...' : 'Sync Cases'}
        </button>

        <button
          onClick={onOpenBatchUpload}
          className="btn btn-primary"
        >
          <Upload size={16} />
          Batch Ingest Cases
        </button>
      </div>
    </header>
  );
}
