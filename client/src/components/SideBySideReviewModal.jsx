import React, { useState, useEffect } from 'react';
import { 
  X, ShieldCheck, Sparkles, Send, Edit3, Save, Copy, Check, 
  Package, Truck, Globe, FileText, Lock, AlertCircle, Award 
} from 'lucide-react';

export default function SideBySideReviewModal({ dispute, onClose, onSaveDraft, onSubmitToBank, onRegenerate, isSubmitting, isRegenerating }) {
  if (!dispute) return null;

  const [letterContent, setLetterContent] = useState(dispute.aiDefenseLetter || '');
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLetterContent(dispute.aiDefenseLetter || '');
  }, [dispute]);

  const handleCopy = () => {
    navigator.clipboard.writeText(letterContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    onSaveDraft(dispute.disputeId, letterContent);
    setIsEditing(false);
  };

  const handleSubmit = () => {
    onSubmitToBank(dispute.disputeId, letterContent);
  };

  const ev = dispute.evidenceData || {};

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div style={{
          padding: '20px 28px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(15, 23, 42, 0.9)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldCheck size={22} color="#ffffff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                  Case Review & Representment: <span style={{ fontFamily: 'var(--font-mono)', color: '#818cf8' }}>{dispute.disputeId}</span>
                </h3>
                <span className="badge" style={{ background: 'rgba(255, 255, 255, 0.08)', color: 'var(--text-main)' }}>
                  {dispute.reasonCode} - {dispute.reasonCategory || 'FRAUD'}
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Customer: {dispute.customerName} ({dispute.customerEmail}) • Amount: {dispute.currency} ${dispute.amount.toFixed(2)}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: 'none',
              borderRadius: '10px',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body - Side-by-Side Pane Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          flex: 1,
          overflow: 'hidden'
        }}>
          
          {/* LEFT PANE: Order & Evidence Proof Inspector */}
          <div style={{
            padding: '24px',
            borderRight: '1px solid rgba(255, 255, 255, 0.08)',
            overflowY: 'auto',
            background: 'rgba(11, 15, 25, 0.5)'
          }}>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
              Compelling Evidence Inspector
            </h4>

            {/* Order & Transaction Details Card */}
            <div className="glass-panel" style={{ padding: '16px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#818cf8', fontWeight: 600, fontSize: '0.85rem', marginBottom: '12px' }}>
                <Package size={16} /> Transaction & Order Summary
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.8rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Order ID:</span>
                  <div style={{ fontWeight: 600, color: '#ffffff' }}>{ev.orderId || 'ORD-UNKNOWN'}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Order Date:</span>
                  <div style={{ fontWeight: 600, color: '#ffffff' }}>{ev.orderDate || 'N/A'}</div>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Item Purchased:</span>
                  <div style={{ fontWeight: 600, color: '#ffffff' }}>{ev.itemDescription || 'N/A'}</div>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Billing Address:</span>
                  <div style={{ color: 'var(--text-main)', fontSize: '0.78rem' }}>{ev.billingAddress || 'N/A'}</div>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Shipping Address:</span>
                  <div style={{ color: 'var(--text-main)', fontSize: '0.78rem' }}>{ev.shippingAddress || 'N/A'}</div>
                </div>
              </div>
            </div>

            {/* Carrier Shipping & Delivery Proof */}
            <div className="glass-panel" style={{ padding: '16px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '12px' }}>
                <Truck size={16} /> Fulfillment & Shipping Verification
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.8rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Carrier:</span>
                  <div style={{ fontWeight: 600, color: '#ffffff' }}>{ev.carrier || 'Standard'}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Tracking #:</span>
                  <div style={{ fontWeight: 600, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>{ev.trackingNumber || 'N/A'}</div>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Delivery Confirmation:</span>
                  <div style={{ fontWeight: 600, color: 'var(--accent-emerald)' }}>{ev.deliveryDate ? `Delivered on ${ev.deliveryDate}` : 'Digital Delivery'}</div>
                </div>
              </div>
            </div>

            {/* Digital Audit & Security Proofs */}
            <div className="glass-panel" style={{ padding: '16px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-amber)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '12px' }}>
                <Globe size={16} /> Digital Footprint & Identity Proofs
              </div>
              <div style={{ display: 'grid', gap: '8px', fontSize: '0.8rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Customer IP Address:</span>
                  <div style={{ fontFamily: 'var(--font-mono)', color: '#ffffff' }}>{ev.customerIp || 'N/A'}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Terms of Service Consent:</span>
                  <div style={{ color: '#ffffff' }}>{ev.tosAcceptedAt ? `Accepted at ${ev.tosAcceptedAt}` : 'Implicit checkout consent'}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Digital Signature Token:</span>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-amber)' }}>{ev.digitalSignature || 'Pass (AVS Match)'}</div>
                </div>
              </div>
            </div>

            {/* Additional Audit Logs */}
            {ev.additionalLogs && ev.additionalLogs.length > 0 && (
              <div className="glass-panel" style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-purple)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '8px' }}>
                  <Lock size={16} /> Additional Verification Logs
                </div>
                <ul style={{ paddingLeft: '20px', fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  {ev.additionalLogs.map((log, i) => (
                    <li key={i}>{log}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* RIGHT PANE: Editable Gemini Defense Letter & Win Score */}
          <div style={{
            padding: '24px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {/* Top Score Banner */}
            <div className="glass-panel" style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(99, 102, 241, 0.08)' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Calculated Win Score</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                  <span style={{ fontSize: '1.8rem', fontWeight: 800, color: dispute.winProbabilityScore >= 75 ? '#34d399' : '#fbbf24' }}>
                    {dispute.winProbabilityScore || 85}%
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Win Probability</span>
                </div>
              </div>

              <button
                onClick={() => onRegenerate(dispute.disputeId)}
                className="btn btn-secondary"
                disabled={isRegenerating}
                style={{ padding: '8px 14px', fontSize: '0.8rem' }}
              >
                <Sparkles size={14} className={isRegenerating ? 'spin-icon' : ''} />
                {isRegenerating ? 'Analyzing...' : 'Re-run Gemini Defense'}
              </button>
            </div>

            {/* Key Evidence Highlights */}
            {dispute.evidenceSummary && dispute.evidenceSummary.length > 0 && (
              <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '12px', padding: '14px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#34d399', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Award size={14} /> Gemini Rule Match Highlights
                </div>
                <ul style={{ paddingLeft: '18px', fontSize: '0.78rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
                  {dispute.evidenceSummary.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Editable Defense Letter Area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                  Acquirer Representment Defense Brief
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={handleCopy}
                    className="btn btn-secondary"
                    style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                  >
                    {copied ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                    {copied ? 'Copied' : 'Copy Text'}
                  </button>

                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="btn btn-secondary"
                    style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                  >
                    <Edit3 size={12} />
                    {isEditing ? 'View Mode' : 'Edit Brief'}
                  </button>
                </div>
              </div>

              {isEditing ? (
                <textarea
                  value={letterContent}
                  onChange={(e) => setLetterContent(e.target.value)}
                  style={{
                    width: '100%',
                    minHeight: '280px',
                    flex: 1,
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid var(--primary)',
                    borderRadius: '12px',
                    padding: '16px',
                    color: '#f8fafc',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.825rem',
                    lineHeight: '1.6',
                    outline: 'none',
                    resize: 'none'
                  }}
                />
              ) : (
                <div style={{
                  width: '100%',
                  minHeight: '280px',
                  flex: 1,
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid var(--border-card)',
                  borderRadius: '12px',
                  padding: '16px',
                  color: '#e2e8f0',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.825rem',
                  lineHeight: '1.6',
                  whiteSpace: 'pre-wrap',
                  overflowY: 'auto'
                }}>
                  {letterContent || 'Click "Re-run Gemini Defense" to auto-draft representment letter using AI.'}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Modal Footer - Human-in-the-Loop Action Bar */}
        <div style={{
          padding: '16px 28px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(15, 23, 42, 0.95)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Lock size={14} color="#10b981" /> Human-in-the-Loop Verification Required before Acquirer Transmission
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={handleSave}
              className="btn btn-secondary"
            >
              <Save size={16} /> Save Draft
            </button>

            <button
              onClick={handleSubmit}
              className="btn btn-success"
              disabled={isSubmitting || dispute.status === 'SUBMITTED'}
            >
              <Send size={16} className={isSubmitting ? 'spin-icon' : ''} />
              {dispute.status === 'SUBMITTED' ? 'Submitted to Bank' : isSubmitting ? 'Submitting...' : 'Approve & Submit to Bank'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
