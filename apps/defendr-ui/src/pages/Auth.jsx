import React, { useState } from 'react';
import {
  ShieldCheck,
  Zap,
  Lock,
  Mail,
  User,
  Store,
  CreditCard,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  DollarSign
} from 'lucide-react';

export default function Auth({ onAuthSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    storeName: '',
    platform: 'Stripe',
    currency: 'USD'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage('');
  };

  // Handle Login or Register Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const endpoint = mode === 'register' ? '/api/auth/register' : '/api/auth/login';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        onAuthSuccess(data.user, data.token);
      } else {
        setErrorMessage(data.error || 'Authentication failed. Please try again.');
      }
    } catch (err) {
      setErrorMessage('Unable to connect to ChargeGuard AI server. Check backend network.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Instant 1-Click Demo Login
  const handleDemoLogin = async () => {
    setDemoLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/auth/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await res.json();

      if (data.success) {
        onAuthSuccess(data.user, data.token);
      } else {
        setErrorMessage(data.error || 'Instant demo login failed');
      }
    } catch (err) {
      setErrorMessage('Network error during demo login');
    } finally {
      setDemoLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0F172A',
      backgroundImage: 'radial-gradient(at 20% 20%, rgba(59, 130, 246, 0.1) 0px, transparent 50%), radial-gradient(at 80% 80%, rgba(16, 185, 129, 0.08) 0px, transparent 50%)',
      padding: '24px',
      boxSizing: 'border-box'
    }}>

      <div style={{
        width: '100%',
        maxWidth: '1000px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid #334155',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)',
        background: '#1E293B'
      }} className="auth-card-responsive">

        {/* Left Branding & Highlights Panel */}
        <div style={{
          padding: '44px 40px',
          background: '#0F172A',
          borderRight: '1px solid #334155',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '32px' }}>
              <img
                src="/icon.png"
                alt="Defendr Logo"
                style={{
                  height: '52px',
                  width: 'auto',
                  borderRadius: '10px',
                  objectFit: 'contain'
                }}
              />
              <div>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', color: '#F8FAFC' }}>
                  Defend<span style={{ color: '#10B981' }}>r</span>
                </h1>
                <span style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
                  RocketRide Chargeback Defender
                </span>
              </div>
            </div>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#F8FAFC', marginBottom: '14px', lineHeight: 1.3 }}>
              Autonomous Merchant Chargeback Defense & Evidence Suite
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: '28px' }}>
              Connect your store, automate Visa CE3.0 & Mastercard dispute representments, and boost win rates with Google Gemini AI.
            </p>

            {/* Value Bullets */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { title: 'Multi-Store Onboarding', desc: 'Seamlessly link Stripe, Shopify, or Razorpay store profiles.' },
                { title: 'RocketRide AI Defense Pipeline', desc: 'Synthesizes order logs, AVS/CVV checks, and delivery signatures.' },
                { title: 'Human-in-the-Loop Approval', desc: '1-click submission directly to payment acquirers and banks.' }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: 'rgba(59, 130, 246, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '2px',
                    flexShrink: 0
                  }}>
                    <CheckCircle2 size={14} color="#60A5FA" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#F8FAFC', margin: '0 0 2px 0' }}>{item.title}</h4>
                    <p style={{ fontSize: '0.78rem', color: '#94A3B8', margin: 0 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hackathon Judge Banner */}
          <div style={{
            marginTop: '32px',
            padding: '14px',
            borderRadius: '12px',
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <Sparkles size={22} color="#38BDF8" style={{ flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#38BDF8' }}>Hackathon Judge Quick Access</div>
              <div style={{ fontSize: '0.75rem', color: '#CBD5E1' }}>Use 1-Click Demo Login to inspect pre-populated dispute cases instantly.</div>
            </div>
          </div>
        </div>

        {/* Right Auth Form Panel */}
        <div style={{ padding: '44px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#1E293B' }}>
          
          {/* Prominent Instant Demo Login Button */}
          <button
            onClick={handleDemoLogin}
            disabled={demoLoading}
            style={{
              width: '100%',
              padding: '13px 20px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.925rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 4px 15px rgba(6, 182, 212, 0.3)',
              transition: 'all 0.15s ease',
              marginBottom: '22px'
            }}
          >
            <Zap size={18} fill="#ffffff" />
            {demoLoading ? 'Authenticating Judge Session...' : '🚀 Instant Demo Login (Judge 1-Click)'}
          </button>

          {/* Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '22px'
          }}>
            <div style={{ flex: 1, height: '1px', background: '#334155' }} />
            <span style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              or continue with account
            </span>
            <div style={{ flex: 1, height: '1px', background: '#334155' }} />
          </div>

          {/* Login / Register Tab Switches */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            background: '#0F172A',
            borderRadius: '10px',
            padding: '4px',
            marginBottom: '22px',
            border: '1px solid #334155'
          }}>
            <button
              type="button"
              onClick={() => { setMode('login'); setErrorMessage(''); }}
              style={{
                padding: '9px',
                borderRadius: '7px',
                background: mode === 'login' ? 'rgba(59, 130, 246, 0.25)' : 'transparent',
                color: mode === 'login' ? '#FFFFFF' : '#94A3B8',
                fontWeight: mode === 'login' ? 700 : 500,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                border: mode === 'login' ? '1px solid rgba(59, 130, 246, 0.4)' : '1px solid transparent'
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('register'); setErrorMessage(''); }}
              style={{
                padding: '9px',
                borderRadius: '7px',
                background: mode === 'register' ? 'rgba(59, 130, 246, 0.25)' : 'transparent',
                color: mode === 'register' ? '#FFFFFF' : '#94A3B8',
                fontWeight: mode === 'register' ? 700 : 500,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                border: mode === 'register' ? '1px solid rgba(59, 130, 246, 0.4)' : '1px solid transparent'
              }}
            >
              Register Merchant
            </button>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div style={{
              padding: '10px 14px',
              borderRadius: '8px',
              background: 'rgba(244, 63, 94, 0.15)',
              border: '1px solid rgba(244, 63, 94, 0.3)',
              color: '#FB7185',
              fontSize: '0.8rem',
              marginBottom: '18px',
              fontWeight: 500
            }}>
              {errorMessage}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            {/* Merchant Name (Register Mode) */}
            {mode === 'register' && (
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#CBD5E1', marginBottom: '5px' }}>
                  Merchant Full Name
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={15} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '11px' }} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Sarah Jenkins"
                    required={mode === 'register'}
                    style={{
                      width: '100%',
                      padding: '9px 12px 9px 36px',
                      borderRadius: '8px',
                      background: '#0F172A',
                      border: '1px solid #334155',
                      color: '#FFFFFF',
                      fontSize: '0.85rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#CBD5E1', marginBottom: '5px' }}>
                Business Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={15} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '11px' }} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="merchant@store.com"
                  required
                  style={{
                    width: '100%',
                    padding: '9px 12px 9px 36px',
                    borderRadius: '8px',
                    background: '#0F172A',
                    border: '1px solid #334155',
                    color: '#FFFFFF',
                    fontSize: '0.85rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#CBD5E1', marginBottom: '5px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={15} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '11px' }} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••••"
                  required
                  style={{
                    width: '100%',
                    padding: '9px 12px 9px 36px',
                    borderRadius: '8px',
                    background: '#0F172A',
                    border: '1px solid #334155',
                    color: '#FFFFFF',
                    fontSize: '0.85rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Store & Platform Details (Register Mode) */}
            {mode === 'register' && (
              <>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#CBD5E1', marginBottom: '5px' }}>
                    Store / Company Name
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Store size={15} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '11px' }} />
                    <input
                      type="text"
                      name="storeName"
                      value={formData.storeName}
                      onChange={handleChange}
                      placeholder="e.g. Apex Store"
                      required={mode === 'register'}
                      style={{
                        width: '100%',
                        padding: '9px 12px 9px 36px',
                        borderRadius: '8px',
                        background: '#0F172A',
                        border: '1px solid #334155',
                        color: '#FFFFFF',
                        fontSize: '0.85rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#CBD5E1', marginBottom: '5px' }}>
                      Payment Gateway
                    </label>
                    <div style={{ position: 'relative' }}>
                      <CreditCard size={15} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '11px' }} />
                      <select
                        name="platform"
                        value={formData.platform}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '9px 12px 9px 36px',
                          borderRadius: '8px',
                          background: '#0F172A',
                          border: '1px solid #334155',
                          color: '#FFFFFF',
                          fontSize: '0.85rem',
                          outline: 'none',
                          boxSizing: 'border-box',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="Stripe" style={{ background: '#0F172A' }}>Stripe</option>
                        <option value="Shopify" style={{ background: '#0F172A' }}>Shopify</option>
                        <option value="Razorpay" style={{ background: '#0F172A' }}>Razorpay</option>
                        <option value="Square" style={{ background: '#0F172A' }}>Square</option>
                        <option value="Custom" style={{ background: '#0F172A' }}>Custom API</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#CBD5E1', marginBottom: '5px' }}>
                      Base Currency
                    </label>
                    <div style={{ position: 'relative' }}>
                      <DollarSign size={15} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '11px' }} />
                      <select
                        name="currency"
                        value={formData.currency}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '9px 12px 9px 36px',
                          borderRadius: '8px',
                          background: '#0F172A',
                          border: '1px solid #334155',
                          color: '#FFFFFF',
                          fontSize: '0.85rem',
                          outline: 'none',
                          boxSizing: 'border-box',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="USD" style={{ background: '#0F172A' }}>USD ($)</option>
                        <option value="EUR" style={{ background: '#0F172A' }}>EUR (€)</option>
                        <option value="GBP" style={{ background: '#0F172A' }}>GBP (£)</option>
                        <option value="INR" style={{ background: '#0F172A' }}>INR (₹)</option>
                        <option value="CAD" style={{ background: '#0F172A' }}>CAD ($)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{
                marginTop: '10px',
                padding: '11px 18px',
                fontSize: '0.875rem'
              }}
            >
              {loading ? (mode === 'register' ? 'Registering...' : 'Signing In...') : (mode === 'register' ? 'Complete Onboarding & Access Dashboard' : 'Sign In to Dashboard')}
              <ArrowRight size={15} />
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
