import React, { useState } from 'react';
import { X, Upload, FileCode, CheckCircle, AlertCircle } from 'lucide-react';

export default function BatchUploadModal({ onClose, onBatchSubmit, isIngesting }) {
  const sampleBatchJson = JSON.stringify({
    cases: [
      {
        disputeId: `DISP-${Math.floor(100000 + Math.random() * 900000)}`,
        amount: 890.00,
        currency: 'USD',
        reasonCode: '10.4',
        reasonCategory: 'FRAUD',
        customerName: 'Alexander Wright',
        customerEmail: 'a.wright@enterprise.com',
        evidenceData: {
          orderId: 'ORD-771092',
          orderDate: '2026-08-10 10:00:00 UTC',
          itemDescription: 'High Performance GPU Server Node Tier 1',
          carrier: 'FedEx Heavy Cargo',
          trackingNumber: '782910482019',
          deliveryDate: '2026-08-12 16:00:00 UTC',
          customerIp: '198.51.100.99',
          tosAcceptedAt: '2026-08-10 09:58:00 UTC'
        }
      },
      {
        disputeId: `DISP-${Math.floor(100000 + Math.random() * 900000)}`,
        amount: 320.00,
        currency: 'USD',
        reasonCode: '13.1',
        reasonCategory: 'ITEM_NOT_RECEIVED',
        customerName: 'Sofia Martinez',
        customerEmail: 'sofia.m@creative.io',
        evidenceData: {
          orderId: 'ORD-882104',
          orderDate: '2026-08-14 11:30:00 UTC',
          itemDescription: 'Wireless Ergonomic Keyboard & Trackpad Set',
          carrier: 'UPS Express',
          trackingNumber: '1Z8888888888888888',
          deliveryDate: '2026-08-16 12:45:00 UTC',
          customerIp: '203.0.113.88',
          tosAcceptedAt: '2026-08-14 11:29:10 UTC'
        }
      }
    ]
  }, null, 2);

  const [jsonText, setJsonText] = useState(sampleBatchJson);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = () => {
    try {
      setErrorMsg('');
      const parsed = JSON.parse(jsonText);
      const casesArray = parsed.cases || (Array.isArray(parsed) ? parsed : null);
      if (!casesArray || casesArray.length === 0) {
        throw new Error('JSON payload must contain a "cases" array or an array of dispute objects');
      }
      onBatchSubmit(casesArray);
    } catch (err) {
      setErrorMsg(err.message || 'Invalid JSON format');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" style={{ maxWidth: '750px' }} onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(15, 23, 42, 0.9)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(99, 102, 241, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(99, 102, 241, 0.3)'
            }}>
              <Upload size={20} color="#818cf8" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                Batch Multi-Case Ingestion
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Demonstrate automated processing by importing multiple chargeback case JSONs
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: 'none',
              borderRadius: '8px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Content */}
        <div style={{ padding: '24px' }}>
          {errorMsg && (
            <div style={{
              background: 'rgba(244, 63, 94, 0.15)',
              border: '1px solid rgba(244, 63, 94, 0.3)',
              borderRadius: '8px',
              padding: '12px 16px',
              color: '#fb7185',
              fontSize: '0.825rem',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <AlertCircle size={16} />
              {errorMsg}
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FileCode size={16} /> Ingestion Payload (JSON Format)
            </label>
            <button
              onClick={() => setJsonText(sampleBatchJson)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--accent-cyan)',
                fontSize: '0.75rem',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              Reset Sample JSON
            </button>
          </div>

          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            style={{
              width: '100%',
              height: '260px',
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid var(--border-card)',
              borderRadius: '12px',
              padding: '14px',
              color: '#38bdf8',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              outline: 'none',
              resize: 'none'
            }}
          />
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(15, 23, 42, 0.95)',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px'
        }}>
          <button onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
          <button onClick={handleSubmit} className="btn btn-primary" disabled={isIngesting}>
            <Upload size={16} />
            {isIngesting ? 'Ingesting...' : 'Ingest & Process Batch'}
          </button>
        </div>

      </div>
    </div>
  );
}
