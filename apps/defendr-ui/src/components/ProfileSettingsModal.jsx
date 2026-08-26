import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  ShieldCheck,
  Lock,
  Store,
  CreditCard,
  Key,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Save,
  DollarSign,
  Mail,
  CheckCircle,
  Cpu,
  Sliders,
  Zap,
  Eye,
  EyeOff,
  RefreshCw
} from 'lucide-react';

export default function ProfileSettingsModal({
  user,
  token,
  onClose,
  onUpdateUser,
  showToast,
  onSimulateWebhook,
  initialTab = 'profile'
}) {
  // Normalize tab string (support aliases 'account' -> 'profile', 'webhooks' -> 'api')
  const normalizeTab = (t) => {
    if (t === 'account') return 'profile';
    if (t === 'webhooks' || t === 'store') return 'api';
    return t || 'profile';
  };

  const [activeTab, setActiveTab] = useState(normalizeTab(initialTab));
  const [loading, setLoading] = useState(false);
  const [copiedLabel, setCopiedLabel] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSecret, setShowSecret] = useState(false);

  // Sync tab if initialTab changes
  useEffect(() => {
    setActiveTab(normalizeTab(initialTab));
  }, [initialTab]);

  const getErrorMessage = (err) => {
    if (!err) return '';
    if (typeof err === 'string') return err;
    if (err?.response?.data?.message && typeof err.response.data.message === 'string') return err.response.data.message;
    if (err?.response?.data?.error && typeof err.response.data.error === 'string') return err.response.data.error;
    if (err?.message && typeof err.message === 'string') return err.message;
    if (err?.error && typeof err.error === 'string') return err.error;
    return 'An error occurred';
  };

  // Profile Form State with Null Safety Defaults
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Alex Mercer',
    email: user?.email || 'demo@apexstore.io',
    storeName: user?.storeName || 'Apex Store',
    platform: user?.platform || 'Stripe',
    currency: user?.currency || 'USD',
    avatar: user?.avatar || ''
  });

  // Password Form State
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // API & Webhook Keys State
  const [apiKey, setApiKey] = useState('defendr_live_pk_99402184910284');
  const [webhookSecret, setWebhookSecret] = useState('whsec_98172948710294819204');
  const webhookUrl = 'https://api.defendr.ai/v1/webhooks/stripe';

  // Automation Policy State
  const [automationRules, setAutomationRules] = useState({
    autoPilotLowRisk: true,
    humanReviewThreshold: 500,
    visaCe3Pairing: true,
    mastercardRulesCheck: true
  });

  // Handle Profile Inputs
  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage('');
  };

  // Handle Password Inputs
  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage('');
  };

  // Save Profile Changes
  const handleSaveProfile = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      });
      const data = await res.json();

      if (data.success) {
        onUpdateUser(data.user);
        showToast('Profile & Store settings updated successfully!', 'success');
        onClose();
      } else {
        setErrorMessage(getErrorMessage(data.error || 'Failed to update profile'));
      }
    } catch (err) {
      setErrorMessage(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // Save Password Change
  const handleSavePassword = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrorMessage('New password and confirm password do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setErrorMessage('New password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });
      const data = await res.json();

      if (data.success) {
        showToast('Security password updated successfully!', 'success');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        onClose();
      } else {
        setErrorMessage(getErrorMessage(data.error || 'Failed to update password'));
      }
    } catch (err) {
      setErrorMessage(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleCopyText = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedLabel(label);
    showToast(`Copied ${label} to clipboard!`, 'info');
    setTimeout(() => setCopiedLabel(''), 2000);
  };

  const handleGenerateNewKey = () => {
    const newKey = `defendr_live_pk_${Math.floor(1000000000000000 + Math.random() * 9000000000000000)}`;
    setApiKey(newKey);
    showToast('New production API key generated!', 'success');
  };

  const initials = (profileData.name || 'Alex Mercer')
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" style={{ maxWidth: '840px' }} onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid #334155',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#1E293B'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(59, 130, 246, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(59, 130, 246, 0.3)'
            }}>
              <User size={18} color="#60A5FA" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#F8FAFC', margin: 0 }}>
                Merchant Account & Store Settings
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#94A3B8', margin: '2px 0 0 0' }}>
                Manage merchant identity, credentials, API keys, webhooks, and automation policies
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: '#0F172A',
              border: '1px solid #334155',
              borderRadius: '8px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#94A3B8',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation Controls */}
        <div style={{
          display: 'flex',
          gap: '8px',
          padding: '12px 24px',
          background: '#0F172A',
          borderBottom: '1px solid #334155',
          overflowX: 'auto'
        }}>
          {[
            { id: 'profile', label: 'Account & Profile', icon: User },
            { id: 'api', label: 'API & Webhooks', icon: Key },
            { id: 'security', label: 'Security & Password', icon: Lock },
            { id: 'automation', label: 'Defense Rules & Automation', icon: Cpu }
          ].map((tab) => {
            const IconC = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setErrorMessage(''); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  background: active ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                  color: active ? '#60A5FA' : '#94A3B8',
                  border: active ? '1px solid rgba(59, 130, 246, 0.4)' : '1px solid transparent',
                  fontSize: '0.825rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                <IconC size={15} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Error Banner */}
        {typeof errorMessage === 'string' && errorMessage && (
          <div className="p-3 mb-4 rounded-lg bg-red-950/50 border border-red-500/30 text-red-400 text-xs flex items-center gap-2" style={{ margin: '16px 24px 0 24px' }}>
            <AlertCircle size={16} />
            {errorMessage}
          </div>
        )}

        {/* Modal Body */}
        <div style={{ padding: '24px', background: '#0F172A', minHeight: '360px' }}>
          
          {/* TAB 1: Account & Profile Settings */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              {/* Avatar Selector Box */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                background: '#1E293B',
                border: '1px solid #334155',
                borderRadius: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)',
                    color: '#FFFFFF',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 15px rgba(59, 130, 246, 0.4)'
                  }}>
                    {initials}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#F8FAFC' }}>
                      {profileData.name}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '2px' }}>
                      Merchant Administrator • Verified Active Session
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => showToast('Avatar updated with merchant initials', 'info')}
                  className="btn btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                >
                  Change Avatar
                </button>
              </div>

              {/* Full Name & Business Name */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#CBD5E1', marginBottom: '6px' }}>
                    Merchant Full Name
                  </label>
                  <div style={{ position: 'relative' }}>
                    <User size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '11px' }} />
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                      required
                      style={{
                        width: '100%',
                        padding: '9px 12px 9px 38px',
                        borderRadius: '8px',
                        background: '#1E293B',
                        border: '1px solid #334155',
                        color: '#F8FAFC',
                        fontSize: '0.875rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#CBD5E1', marginBottom: '6px' }}>
                    Business / Store Display Name
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Store size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '11px' }} />
                    <input
                      type="text"
                      name="storeName"
                      value={profileData.storeName}
                      onChange={handleProfileChange}
                      required
                      style={{
                        width: '100%',
                        padding: '9px 12px 9px 38px',
                        borderRadius: '8px',
                        background: '#1E293B',
                        border: '1px solid #334155',
                        color: '#F8FAFC',
                        fontSize: '0.875rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Email Address with Verified Badge */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#CBD5E1' }}>
                    Business Email Address
                  </label>
                  <span style={{ fontSize: '0.725rem', color: '#34D399', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={12} /> Verified Merchant Email
                  </span>
                </div>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '11px' }} />
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    required
                    style={{
                      width: '100%',
                      padding: '9px 12px 9px 38px',
                      borderRadius: '8px',
                      background: '#1E293B',
                      border: '1px solid #334155',
                      color: '#F8FAFC',
                      fontSize: '0.875rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  <Save size={15} />
                  {loading ? 'Saving Profile...' : 'Save Profile Settings'}
                </button>
              </div>

            </form>
          )}

          {/* TAB 2: API & Webhook Configuration */}
          {activeTab === 'api' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              {/* Webhook Endpoint Box */}
              <div style={{
                padding: '16px',
                background: '#1E293B',
                border: '1px solid #334155',
                borderRadius: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#F8FAFC', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Key size={16} color="#60A5FA" /> Stripe / Shopify Inbound Webhook URL
                  </label>
                  <button
                    type="button"
                    onClick={() => handleCopyText(webhookUrl, 'Webhook URL')}
                    className="btn btn-secondary"
                    style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                  >
                    {copiedLabel === 'Webhook URL' ? <Check size={12} color="#10B981" /> : <Copy size={12} />}
                    Copy URL
                  </button>
                </div>
                <input
                  type="text"
                  readOnly
                  value={webhookUrl}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    background: '#0F172A',
                    border: '1px solid #334155',
                    color: '#38BDF8',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.825rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Webhook Signing Secret */}
              <div style={{
                padding: '16px',
                background: '#1E293B',
                border: '1px solid #334155',
                borderRadius: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#F8FAFC' }}>
                    Webhook Signing Secret
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => setShowSecret(!showSecret)}
                      className="btn btn-secondary"
                      style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                    >
                      {showSecret ? <EyeOff size={12} /> : <Eye size={12} />}
                      {showSecret ? 'Hide' : 'Reveal'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCopyText(webhookSecret, 'Signing Secret')}
                      className="btn btn-secondary"
                      style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                    >
                      {copiedLabel === 'Signing Secret' ? <Check size={12} color="#10B981" /> : <Copy size={12} />}
                      Copy Secret
                    </button>
                  </div>
                </div>
                <input
                  type={showSecret ? 'text' : 'password'}
                  readOnly
                  value={webhookSecret}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    background: '#0F172A',
                    border: '1px solid #334155',
                    color: '#FCD34D',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.825rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Live Secret API Key Section */}
              <div style={{
                padding: '16px',
                background: '#1E293B',
                border: '1px solid #334155',
                borderRadius: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#F8FAFC' }}>
                    Production Secret API Key
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={handleGenerateNewKey}
                      className="btn btn-secondary"
                      style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                    >
                      <RefreshCw size={12} /> Generate New Key
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCopyText(apiKey, 'API Key')}
                      className="btn btn-secondary"
                      style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                    >
                      {copiedLabel === 'API Key' ? <Check size={12} color="#10B981" /> : <Copy size={12} />}
                      Copy Key
                    </button>
                  </div>
                </div>
                <input
                  type="text"
                  readOnly
                  value={apiKey}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    background: '#0F172A',
                    border: '1px solid #334155',
                    color: '#60A5FA',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.825rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Test Webhook Ping Button */}
              <div style={{
                padding: '16px',
                borderRadius: '12px',
                background: 'rgba(59, 130, 246, 0.08)',
                border: '1px solid rgba(59, 130, 246, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#60A5FA' }}>
                    Test Webhook Listener Ping
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '2px' }}>
                    Trigger a mock Stripe dispute webhook event to test live AI defense pipeline.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (onSimulateWebhook) onSimulateWebhook();
                    onClose();
                  }}
                  className="btn btn-primary"
                >
                  <Zap size={15} /> Send Test Webhook Ping
                </button>
              </div>

            </div>
          )}

          {/* TAB 3: Security & Password */}
          {activeTab === 'security' && (
            <form onSubmit={handleSavePassword} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              <div style={{
                padding: '12px 16px',
                borderRadius: '8px',
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.25)',
                color: '#60A5FA',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <ShieldCheck size={18} />
                Ensure password is at least 6 characters with a combination of letters and numbers.
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#CBD5E1', marginBottom: '6px' }}>
                  Current Password
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '11px' }} />
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="••••••••••••"
                    required
                    style={{
                      width: '100%',
                      padding: '9px 12px 9px 38px',
                      borderRadius: '8px',
                      background: '#1E293B',
                      border: '1px solid #334155',
                      color: '#F8FAFC',
                      fontSize: '0.875rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#CBD5E1', marginBottom: '6px' }}>
                  New Password
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '11px' }} />
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="••••••••••••"
                    required
                    style={{
                      width: '100%',
                      padding: '9px 12px 9px 38px',
                      borderRadius: '8px',
                      background: '#1E293B',
                      border: '1px solid #334155',
                      color: '#F8FAFC',
                      fontSize: '0.875rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#CBD5E1', marginBottom: '6px' }}>
                  Confirm New Password
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '11px' }} />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="••••••••••••"
                    required
                    style={{
                      width: '100%',
                      padding: '9px 12px 9px 38px',
                      borderRadius: '8px',
                      background: '#1E293B',
                      border: '1px solid #334155',
                      color: '#F8FAFC',
                      fontSize: '0.875rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  <Lock size={15} />
                  {loading ? 'Updating Password...' : 'Update Password'}
                </button>
              </div>

            </form>
          )}

          {/* TAB 4: Defense Rules & Automation */}
          {activeTab === 'automation' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              <div style={{
                padding: '14px 16px',
                borderRadius: '10px',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                color: '#34D399',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <Zap size={20} color="#10B981" />
                <span>Configure autonomous policy thresholds for instant 1-click & auto-pilot dispute representments.</span>
              </div>

              {/* Toggle 1: Auto-pilot low risk */}
              <div style={{
                padding: '16px',
                background: '#1E293B',
                border: '1px solid #334155',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#F8FAFC' }}>
                    Auto-Pilot Submission for Low-Risk Disputes
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '2px' }}>
                    Automatically submit representment briefs for cases under $100 with win score &gt; 95%.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={automationRules.autoPilotLowRisk}
                  onChange={(e) => setAutomationRules({ ...automationRules, autoPilotLowRisk: e.target.checked })}
                  style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: '#3B82F6' }}
                />
              </div>

              {/* Currency & Threshold Inputs */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div style={{
                  padding: '16px',
                  background: '#1E293B',
                  border: '1px solid #334155',
                  borderRadius: '12px'
                }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#F8FAFC', marginBottom: '6px' }}>
                    Base Accounting Currency
                  </label>
                  <select
                    name="currency"
                    value={profileData.currency}
                    onChange={handleProfileChange}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      background: '#0F172A',
                      border: '1px solid #334155',
                      color: '#F8FAFC',
                      fontSize: '0.875rem',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="USD" style={{ background: '#0F172A' }}>USD ($)</option>
                    <option value="INR" style={{ background: '#0F172A' }}>INR (₹)</option>
                    <option value="EUR" style={{ background: '#0F172A' }}>EUR (€)</option>
                    <option value="GBP" style={{ background: '#0F172A' }}>GBP (£)</option>
                    <option value="CAD" style={{ background: '#0F172A' }}>CAD ($)</option>
                  </select>
                </div>

                <div style={{
                  padding: '16px',
                  background: '#1E293B',
                  border: '1px solid #334155',
                  borderRadius: '12px'
                }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#F8FAFC', marginBottom: '6px' }}>
                    Mandatory Review Threshold ($)
                  </label>
                  <div style={{ position: 'relative' }}>
                    <DollarSign size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '11px' }} />
                    <input
                      type="number"
                      value={automationRules.humanReviewThreshold}
                      onChange={(e) => setAutomationRules({ ...automationRules, humanReviewThreshold: Number(e.target.value) })}
                      style={{
                        width: '100%',
                        padding: '8px 12px 8px 36px',
                        borderRadius: '8px',
                        background: '#0F172A',
                        border: '1px solid #334155',
                        color: '#F8FAFC',
                        fontSize: '0.875rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Save Automation Policies */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => {
                    showToast('Autonomous Defense policy rules saved successfully!', 'success');
                    onClose();
                  }}
                  className="btn btn-primary"
                >
                  <Save size={15} />
                  Save Automation Policies
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
