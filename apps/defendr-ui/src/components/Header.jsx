import React, { useState, useRef, useEffect } from 'react';
import {
  ShieldCheck,
  Upload,
  RefreshCw,
  LogOut,
  User,
  Settings,
  Store,
  Key,
  ChevronDown
} from 'lucide-react';

export default function Header({ user, onLogout, onOpenBatchUpload, onRefresh, isRefreshing, onOpenSettings, onSimulateWebhook, isSimulatingWebhook }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const storeName = user?.storeName || 'Apex Store';
  const platform = user?.platform || 'Stripe';
  const merchantName = user?.name || 'Alex Mercer';
  const merchantEmail = user?.email || 'demo@apexstore.io';

  // Get user initials for avatar
  const initials = merchantName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  // Handle outside click to dismiss dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header style={{
      padding: '14px 28px',
      borderBottom: '1px solid #334155',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: 'rgba(30, 41, 59, 0.95)',
      backdropFilter: 'blur(12px)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      {/* Brand & Connected Store Badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 p-1.5 flex items-center justify-center border border-blue-400/40 shadow-md flex-shrink-0">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-cyan-300" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#1D4ED8" fillOpacity="0.4"/>
              <path d="M13 7l-4 5h4l-2 5 6-7h-4l2-3z" fill="#10B981" stroke="#FFFFFF" strokeWidth="0.8"/>
            </svg>
          </div>
          <div>
            <h1 style={{ fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.02em', margin: 0, color: '#F8FAFC' }}>
              Defend<span style={{ color: '#10B981' }}>r</span>
            </h1>
          </div>
        </div>

        {/* Connected Store Live Pill Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '5px 12px',
          borderRadius: '9999px',
          background: 'rgba(6, 78, 59, 0.35)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          fontSize: '0.78rem',
          fontWeight: 600,
          color: '#34D399'
        }}>
          <span style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: '#10B981',
            boxShadow: '0 0 8px #10B981'
          }} />
          <span>{storeName} — {platform} Connected</span>
        </div>
      </div>

      {/* Right Controls: Actions & Merchant Avatar Dropdown */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        
        {/* Simulate Live Webhook Ingestion Button */}
        <button
          onClick={onSimulateWebhook}
          disabled={isSimulatingWebhook}
          style={{
            padding: '7px 14px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.2) 100%)',
            color: '#FCD34D',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            fontSize: '0.8rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 0 12px rgba(245, 158, 11, 0.15)',
            transition: 'all 0.15s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(245, 158, 11, 0.3)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'rgba(245, 158, 11, 0.2)'}
        >
          <span>⚡</span>
          <span>{isSimulatingWebhook ? 'Ingesting Webhook...' : 'Simulate Stripe Dispute'}</span>
        </button>
        
        <button
          onClick={onRefresh}
          className="btn btn-secondary"
          disabled={isRefreshing}
          title="Refresh dispute list"
          style={{ padding: '7px 14px', fontSize: '0.8rem' }}
        >
          <RefreshCw size={14} className={isRefreshing ? 'spin-icon' : ''} />
          {isRefreshing ? 'Syncing...' : 'Sync Cases'}
        </button>

        <button
          onClick={onOpenBatchUpload}
          className="btn btn-primary"
          style={{ padding: '7px 14px', fontSize: '0.8rem' }}
        >
          <Upload size={14} />
          Batch Ingest
        </button>

        {/* Vertical Divider */}
        <div style={{ width: '1px', height: '24px', background: '#334155' }} />

        {/* Merchant Profile Avatar Trigger & Dropdown Menu */}
        <div style={{ position: 'relative' }} ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '5px 12px 5px 6px',
              borderRadius: '10px',
              background: dropdownOpen ? '#1E293B' : '#0F172A',
              border: '1px solid #334155',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '7px',
              background: '#3B82F6',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {initials || 'AM'}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#F8FAFC', lineHeight: 1.1 }}>
                {merchantName}
              </span>
              <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>
                Merchant Admin
              </span>
            </div>

            <ChevronDown size={14} color="#94A3B8" style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s ease' }} />
          </button>

          {/* Interactive Dropdown Menu */}
          {dropdownOpen && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              width: '260px',
              background: '#0F172A',
              border: '1px solid #334155',
              borderRadius: '12px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
              padding: '8px',
              zIndex: 1000,
              backdropFilter: 'blur(16px)'
            }}>
              {/* Profile Card Header inside Dropdown */}
              <div style={{
                padding: '10px 12px',
                borderBottom: '1px solid #334155',
                marginBottom: '6px'
              }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#F8FAFC' }}>
                  {merchantName}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '2px' }}>
                  {merchantEmail}
                </div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  marginTop: '6px',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  color: '#34D399',
                  background: 'rgba(6, 78, 59, 0.35)',
                  padding: '2px 8px',
                  borderRadius: '9999px'
                }}>
                  {storeName} ({platform})
                </div>
              </div>

              {/* Menu Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    onOpenSettings('profile');
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'transparent',
                    color: '#F8FAFC',
                    fontSize: '0.825rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background 0.15s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = '#1E293B'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <Settings size={15} color="#60A5FA" />
                  <span>Account & Profile Settings</span>
                </button>

                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    onOpenSettings('profile');
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'transparent',
                    color: '#F8FAFC',
                    fontSize: '0.825rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background 0.15s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = '#1E293B'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <Store size={15} color="#34D399" />
                  <span>Store Configuration</span>
                </button>

                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    onOpenSettings('api');
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'transparent',
                    color: '#F8FAFC',
                    fontSize: '0.825rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background 0.15s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = '#1E293B'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <Key size={15} color="#FCD34D" />
                  <span>API & Webhook Keys</span>
                </button>

                <div style={{ height: '1px', background: '#334155', margin: '4px 0' }} />

                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    onLogout();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'rgba(244, 63, 94, 0.1)',
                    color: '#FB7185',
                    fontSize: '0.825rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background 0.15s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = 'rgba(244, 63, 94, 0.2)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'rgba(244, 63, 94, 0.1)'}
                >
                  <LogOut size={15} />
                  <span>Sign Out</span>
                </button>

              </div>
            </div>
          )}

        </div>

      </div>
    </header>
  );
}
