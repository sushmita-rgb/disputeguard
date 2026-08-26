const MOCK_DISPUTES = [
    {
      disputeId: 'DIS-2024-001',
      customerName: 'Sofia Martinez',
      customerEmail: 'sofia.m@creative.io',
      amount: 349.99,
      currency: 'USD',
      status: 'PENDING_REVIEW',
      reason: 'Item not received',
      reasonCode: '13.1',
      reasonCategory: 'ITEM_NOT_RECEIVED',
      network: 'Visa',
      transactionDate: '2024-01-15',
      dueDate: '2024-02-10',
      orderId: 'ORD-882914-US',
      trackingNumber: '773910284910',
      deliveryConfirmed: true,
      riskScore: 82,
      winProbabilityScore: 82,
      evidenceSummary: [
        'Visa CE3.0 rule match: Customer has 3 prior undisputed transactions',
        'AVS Result: Billing address and shipping address match perfectly',
        'Delivery Confirmation: Carrier FedEx Priority Express signed by cardholder'
      ],
      aiDefenseLetter: `OFFICIAL CHARGEBACK REPRESENTMENT DEFENSE BRIEF
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Prepared by: Defendr AI (Google Gemini CE3.0 Synthesis Engine)
Dispute Case: DIS-2024-001   Amount: USD $349.99
Network / Reason Code: Visa — 13.1
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RE: Formal Representment — Item not received

TO: Acquiring Bank Dispute Resolution Department
FROM: Apex Store (Merchant ID: APX-ORD-882914-US)
SUBJECT: Compelling Evidence Response — Case DIS-2024-001

This representment compiles definitive evidence demonstrating successful fulfillment and delivery of the disputed item under Visa operating rules.

• Address Verification: Full Match (AVS-Y, CVV-M, 3D-Secure Authenticated)
• Cardholder IP at Checkout: 198.51.100.42 (US - Oregon ISP: Comcast)
• Billing Address on File: 742 Evergreen Terrace, Springfield, OR 97477
• Terms of Service Consent: Explicit Clickwrap Agreement accepted at checkout

Fulfillment details:
- Carrier: FedEx Priority Express
- Tracking Number: 773910284910
- Delivery: Aug 17, 2026 (Delivered & Signed by Cardholder)

We request that the chargeback be reversed in our favor.`,
      evidenceData: {
        orderId: 'ORD-882914-US',
        orderDate: 'Aug 14, 2026, 14:32 UTC',
        itemDescription: 'Ergonomic Smart Chair Pro',
        billingAddress: '742 Evergreen Terrace, Springfield, OR 97477',
        shippingAddress: '742 Evergreen Terrace, Springfield, OR 97477 (100% AVS Match)',
        carrier: 'FedEx Priority Express',
        trackingNumber: '773910284910',
        deliveryDate: 'Aug 17, 2026 (Delivered & Signed by Cardholder)',
        customerIp: '198.51.100.42 (US - Oregon ISP: Comcast)',
        tosConsent: 'Explicit Clickwrap Agreement accepted at checkout',
        avsResult: 'Full Match (AVS-Y, CVV-M, 3D-Secure Authenticated)'
      }
    },
    {
      disputeId: 'DIS-2024-002',
      customerName: 'Alexander Wright',
      customerEmail: 'a.wright@enterprise.com',
      amount: 1249.50,
      currency: 'USD',
      status: 'APPROVED',
      reason: 'Unauthorized transaction',
      reasonCode: '10.4',
      reasonCategory: 'FRAUD',
      network: 'Mastercard',
      transactionDate: '2024-01-20',
      dueDate: '2024-02-15',
      orderId: 'ORD-58302',
      trackingNumber: 'TRK-9284801',
      deliveryConfirmed: true,
      riskScore: 91,
      winProbabilityScore: 91,
      evidenceSummary: [
        'Cardholder device fingerprint consistent with prior undisputed transactions',
        'Billing address match (AVS-Y)',
        'Carrier delivery confirmed via FedEx Priority Express'
      ],
      aiDefenseLetter: `OFFICIAL CHARGEBACK REPRESENTMENT DEFENSE BRIEF
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Prepared by: Defendr AI (Google Gemini CE3.0 Synthesis Engine)
Dispute Case: DIS-2024-002   Amount: USD $1249.50
Network / Reason Code: Mastercard — 10.4
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RE: Formal Representment — Unauthorized transaction

Transaction authorized by cardholder device fingerprint. Billing address fully matched (AVS=Y). IP geolocation consistent with cardholder address.`,
      evidenceData: {
        orderId: 'ORD-58302',
        orderDate: 'Aug 15, 2026, 10:11 UTC',
        itemDescription: 'Enterprise Cloud License (Annual Plan)',
        billingAddress: '120 Rosewood Lane, Seattle, WA 98101',
        shippingAddress: '120 Rosewood Lane, Seattle, WA 98101 (100% AVS Match)',
        carrier: 'FedEx Priority Express',
        trackingNumber: 'TRK-9284801',
        deliveryDate: 'Aug 18, 2026 (Delivered & Signed by Cardholder)',
        customerIp: '198.51.100.42 (US - Oregon ISP: Comcast)',
        tosConsent: 'Explicit Clickwrap Agreement accepted at checkout',
        avsResult: 'Full Match (AVS-Y, CVV-M, 3D-Secure Authenticated)'
      }
    },
    {
      disputeId: 'DIS-2024-003',
      customerName: 'Elena Rostova',
      customerEmail: 'e.rostova@gmail.com',
      amount: 89.95,
      currency: 'USD',
      status: 'SUBMITTED',
      reason: 'Credit not processed',
      reasonCode: '13.1',
      reasonCategory: 'ITEM_NOT_RECEIVED',
      network: 'Visa',
      transactionDate: '2024-01-22',
      dueDate: '2024-02-18',
      orderId: 'ORD-58315',
      trackingNumber: 'TRK-9285001',
      deliveryConfirmed: true,
      riskScore: 55,
      winProbabilityScore: 55,
      evidenceSummary: [
        'Refund confirmation reference: REF-48291',
        'Partial address match (AVS-P)',
        'Carrier delivery confirmed via FedEx Priority Express'
      ],
      aiDefenseLetter: `Refund of $89.95 was issued on 2024-01-25 to original payment method. Refund confirmation reference: REF-48291.`,
      evidenceData: {
        orderId: 'ORD-58315',
        orderDate: 'Aug 16, 2026, 12:22 UTC',
        itemDescription: 'Ergonomic Smart Chair Pro',
        billingAddress: '742 Evergreen Terrace, Springfield, OR 97477',
        shippingAddress: '742 Evergreen Terrace, Springfield, OR 97477 (100% AVS Match)',
        carrier: 'FedEx Priority Express',
        trackingNumber: 'TRK-9285001',
        deliveryDate: 'Aug 19, 2026 (Delivered & Signed by Cardholder)',
        customerIp: '198.51.100.42 (US - Oregon ISP: Comcast)',
        tosConsent: 'Explicit Clickwrap Agreement accepted at checkout',
        avsResult: 'Full Match (AVS-Y, CVV-M, 3D-Secure Authenticated)'
      }
    },
    {
      disputeId: 'DIS-2024-004',
      customerName: 'Marcus Thompson',
      customerEmail: 'm.thompson@corporation.com',
      amount: 679.00,
      currency: 'USD',
      status: 'PENDING_REVIEW',
      reason: 'Merchandise not as described',
      reasonCode: '13.1',
      reasonCategory: 'ITEM_NOT_RECEIVED',
      network: 'Amex',
      transactionDate: '2024-01-28',
      dueDate: '2024-02-22',
      orderId: 'ORD-58328',
      trackingNumber: 'TRK-9284893',
      deliveryConfirmed: true,
      riskScore: 74,
      winProbabilityScore: 74,
      evidenceSummary: [
        'Product listing photos match item shipped',
        'Customer did not contact support prior to dispute',
        'Return window still open'
      ],
      aiDefenseLetter: `Product listing photos match item shipped. Customer did not contact support prior to dispute. Return window still open.`,
      evidenceData: {
        orderId: 'ORD-58328',
        orderDate: 'Aug 17, 2026, 15:40 UTC',
        itemDescription: 'Ergonomic Smart Chair Pro',
        billingAddress: '742 Evergreen Terrace, Springfield, OR 97477',
        shippingAddress: '742 Evergreen Terrace, Springfield, OR 97477 (100% AVS Match)',
        carrier: 'FedEx Priority Express',
        trackingNumber: 'TRK-9284893',
        deliveryDate: 'Aug 20, 2026 (Delivered & Signed by Cardholder)',
        customerIp: '198.51.100.42 (US - Oregon ISP: Comcast)',
        tosConsent: 'Explicit Clickwrap Agreement accepted at checkout',
        avsResult: 'Full Match (AVS-Y, CVV-M, 3D-Secure Authenticated)'
      }
    },
    {
      disputeId: 'DIS-2024-005',
      customerName: 'Priya Nair',
      customerEmail: 'priya.nair@techcorp.in',
      amount: 215.00,
      currency: 'USD',
      status: 'WON',
      reason: 'Duplicate charge',
      reasonCode: '13.1',
      reasonCategory: 'ITEM_NOT_RECEIVED',
      network: 'Visa',
      transactionDate: '2024-01-30',
      dueDate: '2024-02-25',
      orderId: 'ORD-58341',
      trackingNumber: 'TRK-9284912',
      deliveryConfirmed: true,
      riskScore: 96,
      winProbabilityScore: 96,
      evidenceSummary: [
        'Only one charge of $215.00 processed',
        'Bank statement shows single debit',
        'Carrier delivery confirmed via FedEx Priority Express'
      ],
      aiDefenseLetter: `Only one charge of $215.00 processed on 2024-01-30. Bank statement shows single debit. No duplicate transaction in gateway logs.`,
      evidenceData: {
        orderId: 'ORD-58341',
        orderDate: 'Aug 18, 2026, 11:15 UTC',
        itemDescription: 'Ergonomic Smart Chair Pro',
        billingAddress: '742 Evergreen Terrace, Springfield, OR 97477',
        shippingAddress: '742 Evergreen Terrace, Springfield, OR 97477 (100% AVS Match)',
        carrier: 'FedEx Priority Express',
        trackingNumber: 'TRK-9284912',
        deliveryDate: 'Aug 21, 2026 (Delivered & Signed by Cardholder)',
        customerIp: '198.51.100.42 (US - Oregon ISP: Comcast)',
        tosConsent: 'Explicit Clickwrap Agreement accepted at checkout',
        avsResult: 'Full Match (AVS-Y, CVV-M, 3D-Secure Authenticated)'
      }
    },
    {
      disputeId: 'DIS-2024-006',
      customerName: 'James O\'Brien',
      customerEmail: 'jobrien@eire.ie',
      amount: 524.75,
      currency: 'USD',
      status: 'PENDING_REVIEW',
      reason: 'Subscription cancelled but still charged',
      reasonCode: '13.1',
      reasonCategory: 'ITEM_NOT_RECEIVED',
      network: 'Mastercard',
      transactionDate: '2024-02-01',
      dueDate: '2024-02-28',
      orderId: 'ORD-58354',
      trackingNumber: 'TRK-9285002',
      deliveryConfirmed: true,
      riskScore: 63,
      winProbabilityScore: 63,
      evidenceSummary: [
        'Cancellation request received after billing cycle closed',
        'AVS & CVV match confirmed at authorization',
        'Carrier delivery confirmed via FedEx Priority Express'
      ],
      aiDefenseLetter: `Cancellation request received 2024-02-03, after billing cycle closed on 2024-02-01. Per ToS §7.2, charges for completed billing periods are non-refundable.`,
      evidenceData: {
        orderId: 'ORD-58354',
        orderDate: 'Aug 19, 2026, 17:00 UTC',
        itemDescription: 'Enterprise Cloud License (Annual Plan)',
        billingAddress: '742 Evergreen Terrace, Springfield, OR 97477',
        shippingAddress: '742 Evergreen Terrace, Springfield, OR 97477 (100% AVS Match)',
        carrier: 'FedEx Priority Express',
        trackingNumber: 'TRK-9285002',
        deliveryDate: 'Aug 22, 2026 (Delivered & Signed by Cardholder)',
        customerIp: '198.51.100.42 (US - Oregon ISP: Comcast)',
        tosConsent: 'Explicit Clickwrap Agreement accepted at checkout',
        avsResult: 'Full Match (AVS-Y, CVV-M, 3D-Secure Authenticated)'
      }
    },
    {
      disputeId: 'DIS-2024-007',
      customerName: 'Yuki Tanaka',
      customerEmail: 'y.tanaka@tokyomedia.jp',
      amount: 1875.00,
      currency: 'USD',
      status: 'APPROVED',
      reason: 'Item not received',
      reasonCode: '13.1',
      reasonCategory: 'ITEM_NOT_RECEIVED',
      network: 'Visa',
      transactionDate: '2024-02-05',
      dueDate: '2024-03-02',
      orderId: 'ORD-58367',
      trackingNumber: 'TRK-9285004',
      deliveryConfirmed: true,
      riskScore: 88,
      winProbabilityScore: 88,
      evidenceSummary: [
        'High-value order shipped via insured courier',
        'Delivered & signed by cardholder',
        'Full AVS & CVV match at authorization'
      ],
      aiDefenseLetter: `High-value order shipped via insured courier. Delivered 2024-02-08, signed by recipient. Signature scan attached. CVV & AVS fully matched at checkout.`,
      evidenceData: {
        orderId: 'ORD-58367',
        orderDate: 'Aug 20, 2026, 09:30 UTC',
        itemDescription: 'Ergonomic Smart Chair Pro',
        billingAddress: '742 Evergreen Terrace, Springfield, OR 97477',
        shippingAddress: '742 Evergreen Terrace, Springfield, OR 97477 (100% AVS Match)',
        carrier: 'FedEx Priority Express',
        trackingNumber: 'TRK-9285004',
        deliveryDate: 'Aug 23, 2026 (Delivered & Signed by Cardholder)',
        customerIp: '198.51.100.42 (US - Oregon ISP: Comcast)',
        tosConsent: 'Explicit Clickwrap Agreement accepted at checkout',
        avsResult: 'Full Match (AVS-Y, CVV-M, 3D-Secure Authenticated)'
      }
    }
  ];



import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import StatsOverview from './components/StatsOverview';
import DisputeTable from './components/DisputeTable';
import SideBySideReviewModal from './components/SideBySideReviewModal';
import BatchUploadModal from './components/BatchUploadModal';
import ProfileSettingsModal from './components/ProfileSettingsModal';
import SplashScreen from './components/SplashScreen';
import Auth from './pages/Auth';
import AiBriefingCard from './components/AiBriefingCard';
import { CheckCircle, AlertCircle, Info, Sparkles } from 'lucide-react';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [settingsTab, setSettingsTab] = useState('profile');

  // Auth & User State
  const [user, setUser] = useState<any>(() => {
    try {
      const savedUser = localStorage.getItem('cg_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => localStorage.getItem('cg_auth_token') || null);
  const [authChecking, setAuthChecking] = useState(true);

  // App / Dispute States
  const [disputes, setDisputes] = useState<any[]>(MOCK_DISPUTES);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedDispute, setSelectedDispute] = useState<any>(null);
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isIngesting, setIsIngesting] = useState(false);
  const [toast, setToast] = useState<any>(null);
  // Show the AI Briefing popup once each time user logs in
  const [showBriefing, setShowBriefing] = useState(true);

  const showToast = (message: any, type: string = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Verify Auth Session on Mount
  useEffect(() => {
    async function checkAuthSession() {
      const storedToken = localStorage.getItem('cg_auth_token');
      if (!storedToken) {
        setAuthChecking(false);
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${storedToken}`
          }
        });
        const data = await res.json();
        if (data.success && data.user) {
          setUser(data.user);
          localStorage.setItem('cg_user', JSON.stringify(data.user));
        } else {
          // Token expired or invalid
          handleLogout();
        }
      } catch (err) {
        console.warn('Session verification network offline, relying on cached merchant profile:', err);
      } finally {
        setAuthChecking(false);
      }
    }

    checkAuthSession();
  }, []);

  // Fetch disputes when logged in
  const fetchDisputes = async () => {
    if (!token && !user) return;
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/disputes', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setDisputes(data.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch disputes:', err);
      showToast('Failed to connect to backend server', 'error');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (token || user) {
      fetchDisputes();
    }
  }, [token, user]);

  // Handle successful login/register/demo authentication
  const handleAuthSuccess = (userData: any, authToken: any) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('cg_user', JSON.stringify(userData));
    localStorage.setItem('cg_auth_token', authToken);
    showToast(`Welcome ${userData.name}! Store onboarding complete.`, 'success');
    // Always show the AI Briefing popup on every login / signup / instant demo
    setShowBriefing(true);
  };

  // Handle Merchant Logout
  const handleLogout = () => {
    setUser(null);
    setToken(null);
    setShowBriefing(false); // reset so it re-fires cleanly on next login
    localStorage.removeItem('cg_user');
    localStorage.removeItem('cg_auth_token');
    showToast('Logged out of merchant portal', 'info');
  };

  // Trigger Gemini AI Defense Generation
  const handleTriggerDefend = async (disputeId: any) => {
    setLoadingId(disputeId);
    if (selectedDispute?.disputeId === disputeId) {
      setIsRegenerating(true);
    }
    try {
      const res = await fetch(`/api/disputes/${disputeId}/defend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Gemini AI defense letter compiled for ${disputeId}!`, 'success');
        fetchDisputes();
        if (selectedDispute?.disputeId === disputeId) {
          setSelectedDispute(data.data);
        }
      } else {
        showToast(`Failed: ${data.error}`, 'error');
      }
    } catch (err) {
      showToast('Error executing defense generation pipeline', 'error');
    } finally {
      setLoadingId(null);
      setIsRegenerating(false);
    }
  };

  // Save Draft Defense Letter
  const handleSaveDraft = async (disputeId: any, aiDefenseLetter: any) => {
    try {
      const res = await fetch(`/api/disputes/${disputeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ aiDefenseLetter, status: 'APPROVED' })
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Draft updated for ${disputeId}`, 'success');
        fetchDisputes();
        if (selectedDispute?.disputeId === disputeId) {
          setSelectedDispute(data.data);
        }
      }
    } catch (err) {
      showToast('Failed to save letter draft', 'error');
    }
  };

  // Submit to Acquirer / Bank (Human-in-the-loop 1-click submit)
  const handleSubmitToBank = async (disputeId: any, aiDefenseLetter: any) => {
    setIsSubmitting(true);
    try {
      // First save any edited letter text
      if (aiDefenseLetter) {
        await fetch(`/api/disputes/${disputeId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ aiDefenseLetter })
        });
      }

      // Then trigger submission endpoint
      const res = await fetch(`/api/disputes/${disputeId}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Representment package for ${disputeId} submitted to bank!`, 'success');
        fetchDisputes();
        setSelectedDispute(data.data);
      }
    } catch (err) {
      showToast('Error submitting representment package', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const [isSimulatingWebhook, setIsSimulatingWebhook] = useState(false);

  // Batch Multi-case Ingestion
  const handleBatchSubmit = async (casesArray: any) => {
    setIsIngesting(true);
    try {
      const res = await fetch('/api/disputes/batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ cases: casesArray })
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Ingested ${data.data.length} new cases successfully!`, 'success');
        setShowBatchModal(false);
        fetchDisputes();
      } else {
        showToast(`Batch import error: ${data.error}`, 'error');
      }
    } catch (err) {
      showToast('Failed to send batch payload', 'error');
    } finally {
      setIsIngesting(false);
    }
  };

  // Simulate Live Webhook Ingestion
  const handleSimulateWebhook = async () => {
    setIsSimulatingWebhook(true);
    try {
      const res = await fetch('/api/disputes/webhook-mock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        showToast(`🚨 New $520 Dispute Received & Auto-Defended by Gemini!`, 'success');
        fetchDisputes();
        // Re-open the AI Briefing popup so merchant sees updated pending count
        setShowBriefing(true);
      } else {
        showToast(`Webhook Error: ${data.error}`, 'error');
      }
    } catch (err) {
      showToast('Error simulating live webhook ingestion', 'error');
    } finally {
      setIsSimulatingWebhook(false);
    }
  };

  // Show Animated Intro Splash Screen
  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  // If unauthenticated, show Auth & Onboarding Portal
  if (!user || !token) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }

  // Render Logged-in Merchant Dashboard
  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col overflow-y-auto">
      
      {/* Top Header with Merchant Profile & Logout */}
      <Header
        user={user}
        onLogout={handleLogout}
        onOpenBatchUpload={() => setShowBatchModal(true)}
        onRefresh={fetchDisputes}
        isRefreshing={isRefreshing}
        onOpenSettings={(tab: any) => {
          setSettingsTab(tab || 'profile');
          setShowSettingsModal(true);
        }}
        onSimulateWebhook={handleSimulateWebhook}
        isSimulatingWebhook={isSimulatingWebhook}
      />

      {/* Toast Notification Banner */}
      {toast && (
        <div style={{
          position: 'fixed',
          top: '80px',
          right: '32px',
          zIndex: 2000,
          background: toast.type === 'success' ? 'rgba(16, 185, 129, 0.95)' : toast.type === 'error' ? 'rgba(244, 63, 94, 0.95)' : 'rgba(99, 102, 241, 0.95)',
          color: '#ffffff',
          padding: '12px 20px',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '0.875rem',
          fontWeight: 600,
          backdropFilter: 'blur(8px)'
        }}>
          {toast.type === 'success' ? <CheckCircle size={18} /> : toast.type === 'error' ? <AlertCircle size={18} /> : <Info size={18} />}
          {toast.message}
        </div>
      )}

      {/* Main Dashboard Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <StatsOverview disputes={disputes as any} />

        <div id="dispute-table-section">
          <DisputeTable
            disputes={disputes as any}
            onSelectDispute={(d: any) => setSelectedDispute(d)}
            onTriggerDefend={handleTriggerDefend}
            loadingId={loadingId}
          />
        </div>
      </main>

      {/* AI Copilot Briefing Popup — fixed overlay, shown once on login */}
      {showBriefing && (
        <AiBriefingCard
          merchantName={user?.storeName || user?.email?.split('@')[0] || 'Alex'}
          disputes={disputes as any}
          onClose={() => setShowBriefing(false)}
          onJumpToQueue={() => {
            setShowBriefing(false);
            setTimeout(() => {
              const tableEl = document.getElementById('dispute-table-section');
              if (tableEl) tableEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 370);
          }}
        />
      )}

      {/* Side-by-Side Review Modal */}
      {selectedDispute && (
        <SideBySideReviewModal
          dispute={selectedDispute}
          onClose={() => setSelectedDispute(null)}
          onSaveDraft={handleSaveDraft}
          onSubmitToBank={handleSubmitToBank}
          onRegenerate={handleTriggerDefend}
          isSubmitting={isSubmitting}
          isRegenerating={isRegenerating}
        />
      )}

      {/* Batch Ingestion Modal */}
      {showBatchModal && (
        <BatchUploadModal
          onClose={() => setShowBatchModal(false)}
          onBatchSubmit={handleBatchSubmit}
          isIngesting={isIngesting}
        />
      )}

      {/* Profile & Store Settings Modal */}
      {showSettingsModal && (
        <ProfileSettingsModal
          user={user}
          token={token}
          onClose={() => setShowSettingsModal(false)}
          onUpdateUser={(updatedUser: any) => {
            setUser(updatedUser);
            localStorage.setItem('cg_user', JSON.stringify(updatedUser));
          }}
          showToast={showToast}
          initialTab={settingsTab}
          onSimulateWebhook={handleSimulateWebhook}
        />
      )}

      {/* Footer */}
      <footer style={{
        padding: '16px 32px',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.78rem',
        color: 'var(--text-dim)',
        background: 'rgba(11, 15, 25, 0.6)'
      }}>
        <div>
          Defendr &copy; 2026 • RocketRide Buildathon Project (Problem Statement #1: Chargeback Defender)
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <span>Visa CE3.0 Compliant</span>
          <span>•</span>
          <span>Mastercard Fraud Rules Compliant</span>
        </div>
      </footer>

    </div>
  );
}
