import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StatsOverview from './components/StatsOverview';
import DisputeTable from './components/DisputeTable';
import SideBySideReviewModal from './components/SideBySideReviewModal';
import BatchUploadModal from './components/BatchUploadModal';
import ProfileSettingsModal from './components/ProfileSettingsModal';
import SplashScreen from './components/SplashScreen';
import Auth from './pages/Auth';
import { CheckCircle, AlertCircle, Info, Sparkles } from 'lucide-react';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [settingsTab, setSettingsTab] = useState('profile');

  // Auth & User State
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('cg_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('cg_auth_token') || null);
  const [authChecking, setAuthChecking] = useState(true);

  // App / Dispute States
  const [disputes, setDisputes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [loadingId, setLoadingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isIngesting, setIsIngesting] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
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
  const handleAuthSuccess = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('cg_user', JSON.stringify(userData));
    localStorage.setItem('cg_auth_token', authToken);
    showToast(`Welcome ${userData.name}! Store onboarding complete.`, 'success');
  };

  // Handle Merchant Logout
  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('cg_user');
    localStorage.removeItem('cg_auth_token');
    showToast('Logged out of merchant portal', 'info');
  };

  // Trigger Gemini AI Defense Generation
  const handleTriggerDefend = async (disputeId) => {
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
  const handleSaveDraft = async (disputeId, aiDefenseLetter) => {
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
  const handleSubmitToBank = async (disputeId, aiDefenseLetter) => {
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
  const handleBatchSubmit = async (casesArray) => {
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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Header with Merchant Profile & Logout */}
      <Header
        user={user}
        onLogout={handleLogout}
        onOpenBatchUpload={() => setShowBatchModal(true)}
        onRefresh={fetchDisputes}
        isRefreshing={isRefreshing}
        onOpenSettings={(tab) => {
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
      <main style={{ flex: 1 }}>
        <StatsOverview disputes={disputes} />

        <DisputeTable
          disputes={disputes}
          onSelectDispute={(d) => setSelectedDispute(d)}
          onTriggerDefend={handleTriggerDefend}
          loadingId={loadingId}
        />
      </main>

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
          onUpdateUser={(updatedUser) => {
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
