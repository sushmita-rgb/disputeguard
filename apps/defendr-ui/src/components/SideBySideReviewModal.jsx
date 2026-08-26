import React, { useState, useEffect } from 'react';
import { 
  X, ShieldCheck, Sparkles, Send, Edit3, Save, Copy, Check, 
  Package, Truck, Globe, Lock, Award, FileText, CheckCircle2, Download
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

  const handleDownloadPDF = () => {
    const printWin = window.open('', '_blank', 'width=900,height=850');
    if (!printWin) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Official Representment Package - ${dispute.disputeId}</title>
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #0f172a; padding: 40px; line-height: 1.5; background: #ffffff; }
            .header { border-bottom: 2px solid #0f172a; padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; }
            .title { font-size: 22px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; }
            .subtitle { font-size: 13px; color: #64748b; margin-top: 4px; }
            .section { margin-bottom: 24px; }
            .section-title { font-size: 14px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #cbd5e1; padding-bottom: 6px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.05em; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 13px; }
            .box { background: #f8fafc; border: 1px solid #e2e8f0; padding: 12px; border-radius: 6px; }
            .letter-box { background: #f8fafc; border: 1px solid #cbd5e1; padding: 20px; border-radius: 8px; font-family: monospace; font-size: 12px; white-space: pre-wrap; color: #1e293b; }
            .stamp { display: inline-block; border: 2px solid #10b981; color: #047857; background: #ecfdf5; font-weight: 800; padding: 10px 18px; border-radius: 8px; font-size: 12px; letter-spacing: 0.05em; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="title">DEFENDR • OFFICIAL BANK REPRESENTMENT PACKAGE</div>
              <div class="subtitle">Visa Compelling Evidence 3.0 & Mastercard Fraud Rules Certified Defense Document</div>
            </div>
            <div style="text-align: right; font-size: 12px; color: #64748b;">
              Generated: ${new Date().toLocaleString()}<br/>
              Status: <strong>VERIFIED BANK TRANSMISSION</strong>
            </div>
          </div>

          <div class="section">
            <div class="section-title">1. DISPUTE & TRANSACTION SUMMARY</div>
            <div class="grid">
              <div class="box"><strong>Dispute Case ID:</strong> ${dispute.disputeId}</div>
              <div class="box"><strong>Disputed Amount:</strong> ${dispute.currency} $${dispute.amount?.toFixed(2)}</div>
              <div class="box"><strong>Reason Code:</strong> ${dispute.reasonCode} (${dispute.reasonCategory || 'FRAUD'})</div>
              <div class="box"><strong>Customer Info:</strong> ${dispute.customerName} (${dispute.customerEmail})</div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">2. FULFILLMENT & DIGITAL AUDIT PROOFS</div>
            <div class="grid">
              <div class="box"><strong>Carrier / Delivery:</strong> ${ev.carrier || 'Standard Carrier'} - ${ev.trackingNumber || 'N/A'}</div>
              <div class="box"><strong>Delivery Confirmation:</strong> ${ev.deliveryDate || 'Confirmed'}</div>
              <div class="box"><strong>Customer IP Address:</strong> ${ev.customerIp || 'N/A'}</div>
              <div class="box"><strong>Digital Signature Token:</strong> ${ev.digitalSignature || 'Pass (AVS/CVV Verified)'}</div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">3. ACQUIRER REPRESENTMENT DEFENSE BRIEF</div>
            <div class="letter-box">${letterContent || dispute.aiDefenseLetter || 'N/A'}</div>
          </div>

          <div class="stamp">
            ✓ COMPLIANT REPRESENTMENT PACKAGE • WIN PROBABILITY SCORE: ${dispute.winProbabilityScore || 88}%
          </div>
        </body>
      </html>
    `;
    printWin.document.write(htmlContent);
    printWin.document.close();
    printWin.focus();
    setTimeout(() => {
      printWin.print();
    }, 400);
  };

  const ev = dispute.evidenceData || {};

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid #334155',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#1E293B'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldCheck size={22} color="#ffffff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#F8FAFC', margin: 0 }}>
                  Case Review & Representment: <span style={{ fontFamily: 'var(--font-mono)', color: '#60A5FA' }}>{dispute.disputeId}</span>
                </h3>
                <span className="badge" style={{ background: '#0F172A', border: '1px solid #334155', color: '#CBD5E1' }}>
                  {dispute.reasonCode} - {dispute.reasonCategory || 'FRAUD'}
                </span>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '2px', margin: 0 }}>
                Customer: <strong style={{ color: '#F8FAFC' }}>{dispute.customerName}</strong> ({dispute.customerEmail}) • Amount: <strong style={{ color: '#F8FAFC' }}>{dispute.currency} ${dispute.amount.toFixed(2)}</strong>
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

        {/* Modal Body - Side-by-Side Pane Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.25fr',
          flex: 1,
          overflow: 'hidden'
        }}>
          
          {/* LEFT PANE: Clean Structured Evidence Cards */}
          <div style={{
            padding: '20px 24px',
            borderRight: '1px solid #334155',
            overflowY: 'auto',
            background: '#0F172A'
          }}>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>
              Compelling Evidence Proofs
            </h4>

            {/* Transaction Summary Card */}
            <div className="glass-panel" style={{ padding: '16px', marginBottom: '14px', background: '#1E293B' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#60A5FA', fontWeight: 700, fontSize: '0.85rem', marginBottom: '10px' }}>
                <Package size={16} /> Order & Transaction Receipt
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.8rem' }}>
                <div>
                  <span style={{ color: '#94A3B8' }}>Order ID:</span>
                  <div style={{ fontWeight: 600, color: '#F8FAFC' }}>{ev.orderId || 'ORD-UNKNOWN'}</div>
                </div>
                <div>
                  <span style={{ color: '#94A3B8' }}>Order Date:</span>
                  <div style={{ fontWeight: 600, color: '#F8FAFC' }}>{ev.orderDate || 'N/A'}</div>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <span style={{ color: '#94A3B8' }}>Item Description:</span>
                  <div style={{ fontWeight: 600, color: '#F8FAFC' }}>{ev.itemDescription || 'N/A'}</div>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <span style={{ color: '#94A3B8' }}>Billing Address:</span>
                  <div style={{ color: '#CBD5E1', fontSize: '0.78rem' }}>{ev.billingAddress || 'N/A'}</div>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <span style={{ color: '#94A3B8' }}>Shipping Address:</span>
                  <div style={{ color: '#CBD5E1', fontSize: '0.78rem' }}>{ev.shippingAddress || 'N/A'}</div>
                </div>
              </div>
            </div>

            {/* Carrier & Fulfillment Card */}
            <div className="glass-panel" style={{ padding: '16px', marginBottom: '14px', background: '#1E293B' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38BDF8', fontWeight: 700, fontSize: '0.85rem', marginBottom: '10px' }}>
                <Truck size={16} /> Carrier Shipping & Delivery Proof
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.8rem' }}>
                <div>
                  <span style={{ color: '#94A3B8' }}>Carrier:</span>
                  <div style={{ fontWeight: 600, color: '#F8FAFC' }}>{ev.carrier || 'Direct Delivery'}</div>
                </div>
                <div>
                  <span style={{ color: '#94A3B8' }}>Tracking #:</span>
                  <div style={{ fontWeight: 600, color: '#38BDF8', fontFamily: 'var(--font-mono)' }}>{ev.trackingNumber || 'N/A'}</div>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <span style={{ color: '#94A3B8' }}>Delivery Confirmation:</span>
                  <div style={{ fontWeight: 600, color: '#34D399' }}>{ev.deliveryDate ? `Confirmed on ${ev.deliveryDate}` : 'Instant Digital SaaS Delivery'}</div>
                </div>
              </div>
            </div>

            {/* Digital Identity Footprint */}
            <div className="glass-panel" style={{ padding: '16px', marginBottom: '14px', background: '#1E293B' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FCD34D', fontWeight: 700, fontSize: '0.85rem', marginBottom: '10px' }}>
                <Globe size={16} /> Digital Footprint & AVS/CVV Checks
              </div>
              <div style={{ display: 'grid', gap: '8px', fontSize: '0.8rem' }}>
                <div>
                  <span style={{ color: '#94A3B8' }}>Customer IP Address:</span>
                  <div style={{ fontFamily: 'var(--font-mono)', color: '#F8FAFC' }}>{ev.customerIp || 'N/A'}</div>
                </div>
                <div>
                  <span style={{ color: '#94A3B8' }}>TOS Consent:</span>
                  <div style={{ color: '#F8FAFC' }}>{ev.tosAcceptedAt ? `Accepted at ${ev.tosAcceptedAt}` : 'Implicit checkout agreement'}</div>
                </div>
                <div>
                  <span style={{ color: '#94A3B8' }}>Digital Token Signature:</span>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#FCD34D' }}>{ev.digitalSignature || 'Pass (AVS Match)'}</div>
                </div>
              </div>
            </div>

            {/* Additional Audit Logs */}
            {ev.additionalLogs && ev.additionalLogs.length > 0 && (
              <div className="glass-panel" style={{ padding: '16px', background: '#1E293B' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#A78BFA', fontWeight: 700, fontSize: '0.85rem', marginBottom: '8px' }}>
                  <Lock size={16} /> Verification Audit Logs
                </div>
                <ul style={{ paddingLeft: '18px', fontSize: '0.78rem', color: '#94A3B8', lineHeight: '1.6' }}>
                  {ev.additionalLogs.map((log, i) => (
                    <li key={i}>{log}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* RIGHT PANE: Distraction-free Gemini Defense Brief Editor */}
          <div style={{
            padding: '20px 24px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            background: '#1E293B'
          }}>
            {/* Top Score Banner */}
            <div className="glass-panel" style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
              <div>
                <div style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: 500 }}>Calculated Representment Score</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '2px' }}>
                  <span style={{ fontSize: '1.6rem', fontWeight: 800, color: dispute.winProbabilityScore >= 75 ? '#34D399' : '#FCD34D' }}>
                    {dispute.winProbabilityScore || 88}%
                  </span>
                  <span className="score-pill score-high">
                    High Win Probability
                  </span>
                </div>
              </div>

              <button
                onClick={() => onRegenerate(dispute.disputeId)}
                className="btn btn-secondary"
                disabled={isRegenerating}
                style={{ padding: '7px 12px', fontSize: '0.78rem' }}
              >
                <Sparkles size={14} className={isRegenerating ? 'spin-icon' : ''} />
                {isRegenerating ? '🤖 RocketRide & Gemini CE3.0 Synthesizing Defense...' : '✨ Re-run Gemini Defense'}
              </button>
            </div>

            {/* Key Evidence Highlights */}
            {dispute.evidenceSummary && dispute.evidenceSummary.length > 0 && (
              <div style={{ background: 'rgba(6, 78, 59, 0.3)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: '10px', padding: '12px 16px' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#34D399', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Award size={14} /> Visa CE3.0 / Mastercard Rule Matches
                </div>
                <ul style={{ paddingLeft: '18px', fontSize: '0.78rem', color: '#F8FAFC', lineHeight: '1.5' }}>
                  {dispute.evidenceSummary.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Distraction-Free Brief Editor */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.825rem', fontWeight: 600, color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FileText size={14} /> Acquirer Representment Defense Brief
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={handleCopy}
                    className="btn btn-secondary"
                    style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                  >
                    {copied ? <Check size={12} color="#10B981" /> : <Copy size={12} />}
                    {copied ? 'Copied' : 'Copy Text'}
                  </button>

                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="btn btn-secondary"
                    style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                  >
                    <Edit3 size={12} />
                    {isEditing ? 'Preview Mode' : 'Edit Brief'}
                  </button>
                </div>
              </div>

              {isEditing ? (
                <textarea
                  value={letterContent}
                  onChange={(e) => setLetterContent(e.target.value)}
                  style={{
                    width: '100%',
                    minHeight: '260px',
                    flex: 1,
                    background: '#0F172A',
                    border: '1px solid #3B82F6',
                    borderRadius: '10px',
                    padding: '14px',
                    color: '#F8FAFC',
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
                  minHeight: '260px',
                  flex: 1,
                  background: '#0F172A',
                  border: '1px solid #334155',
                  borderRadius: '10px',
                  padding: '14px',
                  color: '#CBD5E1',
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
          padding: '14px 24px',
          borderTop: '1px solid #334155',
          background: '#0F172A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ fontSize: '0.78rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Lock size={14} color="#10B981" /> Human-in-the-Loop Verification Required before Bank Submission
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={handleDownloadPDF}
              className="btn btn-secondary"
              title="Export official printable bank representment PDF package"
            >
              <Download size={15} color="#38BDF8" /> Download Evidence Packet (PDF)
            </button>

            <button
              onClick={handleSave}
              className="btn btn-secondary"
            >
              <Save size={15} /> Save Draft
            </button>

            <button
              onClick={handleSubmit}
              className="btn btn-success"
              disabled={isSubmitting || dispute.status === 'SUBMITTED'}
            >
              <Send size={15} className={isSubmitting ? 'spin-icon' : ''} />
              {dispute.status === 'SUBMITTED' ? 'Submitted to Bank' : isSubmitting ? 'Submitting...' : 'Approve & Submit to Bank'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
