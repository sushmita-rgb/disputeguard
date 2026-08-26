import React, { useState, useEffect } from 'react';
import logoImg from '../assets/icon.png';
import { FastForward, ShieldCheck, Sparkles } from 'lucide-react';

export default function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Progress bar animation timer
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2.5; // ~2.2s total duration
      });
    }, 50);

    // Phase 1 -> 2 at 800ms
    const timer1 = setTimeout(() => {
      setPhase(2);
    }, 800);

    // Phase 2 -> 3 at 1600ms
    const timer2 = setTimeout(() => {
      setPhase(3);
    }, 1600);

    // Fade out and complete at 2200ms
    const timer3 = setTimeout(() => {
      handleFinish();
    }, 2200);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleFinish = () => {
    if (isFading) return;
    setIsFading(true);
    setTimeout(() => {
      onComplete();
    }, 600); // 600ms fade-out animation duration
  };

  const getStatusText = () => {
    switch (phase) {
      case 1:
        return 'Initializing RocketRide Pipeline...';
      case 2:
        return 'Connecting Visa CE3.0 & Mastercard Rules...';
      case 3:
        return 'Ready to Defend Revenue';
      default:
        return 'Ready to Defend Revenue';
    }
  };

  return (
    <div
      onClick={handleFinish}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0B0F19',
        color: '#F8FAFC',
        opacity: isFading ? 0 : 1,
        transition: 'opacity 0.6s ease-in-out',
        cursor: 'pointer',
        userSelect: 'none',
        overflow: 'hidden'
      }}
    >
      {/* Background Ambient Glow Orbs */}
      <div style={{
        position: 'absolute',
        top: '25%',
        left: '30%',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.18) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '25%',
        right: '30%',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none'
      }} />

      {/* Top Right Skip Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleFinish();
        }}
        style={{
          position: 'absolute',
          top: '28px',
          right: '32px',
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '9999px',
          padding: '8px 16px',
          color: '#94A3B8',
          fontSize: '0.8rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          backdropFilter: 'blur(8px)'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = 'rgba(59, 130, 246, 0.25)';
          e.currentTarget.style.color = '#FFFFFF';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
          e.currentTarget.style.color = '#94A3B8';
        }}
      >
        <span>Skip Intro</span>
        <FastForward size={14} />
      </button>

      {/* Main Centered Content Block */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        zIndex: 10
      }}>
        {/* Animated Logo Container with Pulse Ring */}
        <div style={{
          position: 'relative',
          marginBottom: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Glowing Aura Ring */}
          <div style={{
            position: 'absolute',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(16, 185, 129, 0.2) 60%, transparent 100%)',
            animation: 'pulseGlow 2s infinite ease-in-out',
            filter: 'blur(10px)'
          }} />

          <img src={logoImg} alt="Defendr Logo" className="h-20 w-20 object-contain drop-shadow-xl animate-pulse" />
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: '2.4rem',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          margin: '0 0 8px 0',
          color: '#F8FAFC',
          fontFamily: 'var(--font-display)'
        }}>
          Defend<span style={{ color: '#10B981' }}>r</span>
        </h1>

        {/* Subtitle Status Message */}
        <div style={{
          fontSize: '0.925rem',
          color: phase === 3 ? '#34D399' : '#94A3B8',
          fontWeight: 500,
          minHeight: '24px',
          marginBottom: '32px',
          transition: 'color 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Sparkles size={16} color={phase === 3 ? '#10B981' : '#3B82F6'} className="spin-icon" />
          <span>{getStatusText()}</span>
        </div>

        {/* Animated Progress Bar */}
        <div style={{
          width: '220px',
          height: '4px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '9999px',
          overflow: 'hidden',
          boxShadow: '0 0 10px rgba(0,0,0,0.5)'
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #3B82F6 0%, #06B6D4 50%, #10B981 100%)',
            borderRadius: '9999px',
            transition: 'width 0.05s linear',
            boxShadow: '0 0 12px #10B981'
          }} />
        </div>

        {/* Click anywhere caption */}
        <span style={{
          fontSize: '0.725rem',
          color: '#64748B',
          marginTop: '28px',
          letterSpacing: '0.04em'
        }}>
          Click anywhere to skip
        </span>
      </div>

      {/* Inline Keyframe Animations */}
      <style>{`
        @keyframes zoomIn {
          0% { opacity: 0; transform: scale(0.7); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
