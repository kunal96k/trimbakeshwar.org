import React, { useState, useEffect } from 'react';
import { ErrorStatusCode } from '../types';
import { RoyalSeal } from './RoyalSeal';
import { TrimbakBrandLogo } from './TrimbakBrandLogo';
import {
  Compass,
  ShieldAlert,
  ServerCrash,
  WifiOff,
  Wrench,
  Home,
  RefreshCw,
  PhoneCall,
  CalendarCheck,
  Lock,
  ArrowLeft,
  Headphones,
  CheckCircle2,
  Clock,
  ExternalLink,
} from 'lucide-react';

interface SystemStatusPageProps {
  code: ErrorStatusCode;
  referenceId?: string;
  customMsg?: string;
  onReturnHome: () => void;
  onOpenLogin?: () => void;
  onOpenNewBooking?: () => void;
  onRetry?: () => void;
}

export const SystemStatusPage: React.FC<SystemStatusPageProps> = ({
  code,
  referenceId = 'ERR-TRIMBAK-8921',
  customMsg,
  onReturnHome,
  onOpenLogin,
  onOpenNewBooking,
  onRetry,
}) => {
  // Reconnect countdown timer for 502
  const [reconnectCountdown, setReconnectCountdown] = useState(15);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (code === '502') {
      timer = setInterval(() => {
        setReconnectCountdown((prev) => {
          if (prev <= 1) {
            handleRetryClick();
            return 15;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [code]);

  const handleRetryClick = () => {
    setIsRetrying(true);
    setTimeout(() => {
      setIsRetrying(false);
      if (onRetry) {
        onRetry();
      } else {
        onReturnHome();
      }
    }, 1200);
  };

  // Status page configurations strictly in English
  const config = {
    '404': {
      label: '404 · Page Not Found',
      title: 'Sacred Ritual Path Not Found',
      defaultMsg:
        'The sacred page or ritual path you are looking for has been moved or does not exist.',
      icon: Compass,
      badgeColor: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
      iconGradient: 'from-rose-500/20 to-amber-600/20 border-rose-500/30 text-rose-300',
    },
    '403': {
      label: '403 · Access Forbidden',
      title: 'Restricted Vatandar Access Only',
      defaultMsg:
        'Restricted Access. This console is strictly reserved for authorized Vatandar Purohit administrators.',
      icon: ShieldAlert,
      badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      iconGradient: 'from-amber-500/20 to-yellow-600/20 border-amber-500/30 text-amber-300',
    },
    '500': {
      label: '500 · Internal Server Error',
      title: 'Internal Server Processing Error',
      defaultMsg:
        'An unexpected server issue occurred while processing your request.',
      icon: ServerCrash,
      badgeColor: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
      iconGradient: 'from-rose-600/20 to-amber-700/20 border-rose-500/30 text-rose-300',
    },
    '502': {
      label: '502 · Bad Gateway',
      title: 'Upstream Application Disconnected',
      defaultMsg:
        'The upstream Node.js application server is not responding. The server may be restarting.',
      icon: WifiOff,
      badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      iconGradient: 'from-amber-600/20 to-orange-600/20 border-amber-500/30 text-amber-300',
    },
    '503': {
      label: '503 · Service Maintenance',
      title: 'Scheduled Temple Portal Maintenance',
      defaultMsg:
        'The Trimbakeshwar Purohit portal is currently undergoing scheduled database maintenance and high-traffic optimization.',
      icon: Wrench,
      badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      iconGradient: 'from-amber-500/20 to-teal-700/20 border-amber-500/30 text-amber-300',
    },
  }[code];

  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-[#100705] text-stone-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Sacred Radial Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] bg-[radial-gradient(circle_at_center,_rgba(245,158,11,0.1)_0%,_transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_center,_rgba(220,38,38,0.06)_0%,_transparent_70%)] pointer-events-none" />

      {/* Main Glassmorphic Status Card */}
      <div className="relative z-10 max-w-lg w-full text-center p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#1C0D0A]/95 via-[#160A08]/95 to-[#100604]/95 border-2 border-amber-500/30 shadow-2xl backdrop-blur-xl">
        
        {/* Top Status Header */}
        <div className="flex justify-center mb-5">
          <TrimbakBrandLogo size="md" isDarkTheme={true} onClick={onReturnHome} />
        </div>

        {/* Status Pill Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold font-mono mb-6 border shadow-sm ${config.badgeColor}">
          <Icon className="w-3.5 h-3.5" />
          <span>{config.label}</span>
        </div>

        {/* Dynamic Center Visual Icon */}
        <div
          className={`w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br ${config.iconGradient} border flex items-center justify-center shadow-xl mb-6`}
        >
          <Icon className={`w-10 h-10 ${code === '502' || code === '503' ? 'animate-pulse' : ''}`} />
        </div>

        {/* Headline & Description */}
        <h1 className="text-xl sm:text-2xl font-bold font-sanskrit text-amber-100 mb-2 leading-snug">
          {config.title}
        </h1>

        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-6 max-w-md mx-auto">
          {customMsg || config.defaultMsg}
        </p>

        {/* Special 502 Countdown Widget */}
        {code === '502' && (
          <div className="mb-6 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-400/20 text-xs text-amber-200 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Auto-reconnecting upstream proxy...</span>
            </span>
            <span className="font-mono font-bold text-amber-300">
              00:{reconnectCountdown < 10 ? `0${reconnectCountdown}` : reconnectCountdown}
            </span>
          </div>
        )}

        {/* Special 503 Maintenance Meta Widget */}
        {code === '503' && (
          <div className="mb-6 p-4 rounded-2xl bg-black/40 border border-amber-500/20 text-xs space-y-2 text-left">
            <div className="flex items-center justify-between text-stone-300">
              <span className="text-stone-400">Estimated Resumption:</span>
              <strong className="text-amber-300 font-semibold">Within 20 minutes</strong>
            </div>
            <div className="flex items-center justify-between text-stone-300">
              <span className="text-stone-400">Maintenance Reason:</span>
              <span>High-traffic festival tuning</span>
            </div>
            <div className="pt-2 border-t border-stone-800 text-[11px] text-amber-200/80">
              Urgent ritual bookings can be made directly via the Hereditary Purohit Helpline.
            </div>
          </div>
        )}

        {/* Action Buttons Grid according to Code */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {/* 404 Actions */}
          {code === '404' && (
            <>
              <button
                onClick={onReturnHome}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-stone-950 font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <Home className="w-4 h-4" />
                <span>Return to Home</span>
              </button>
              {onOpenNewBooking && (
                <button
                  onClick={onOpenNewBooking}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-black/40 border border-amber-400/30 text-amber-200 text-xs sm:text-sm font-semibold hover:bg-black/60 flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  <CalendarCheck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="whitespace-nowrap shrink-0" style={{ whiteSpace: 'nowrap' }}>Book Pooja Online</span>
                </button>
              )}
            </>
          )}

          {/* 403 Actions */}
          {code === '403' && (
            <>
              {onOpenLogin ? (
                <button
                  onClick={onOpenLogin}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-stone-950 font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <Lock className="w-4 h-4" />
                  <span>Sign In with Admin Credentials</span>
                </button>
              ) : null}
              <button
                onClick={onReturnHome}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-black/40 border border-amber-400/30 text-stone-300 text-xs sm:text-sm font-semibold hover:bg-black/60 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Safety</span>
              </button>
            </>
          )}

          {/* 500 Actions */}
          {code === '500' && (
            <>
              <button
                onClick={handleRetryClick}
                disabled={isRetrying}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-stone-950 font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
                <span>{isRetrying ? 'Retrying...' : 'Retry Request'}</span>
              </button>
              <a
                href="tel:+919689973967"
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-black/40 border border-amber-400/30 text-amber-200 text-xs sm:text-sm font-semibold hover:bg-black/60 flex items-center justify-center gap-2"
              >
                <Headphones className="w-4 h-4 text-amber-400" />
                <span>Contact Technical Helpdesk</span>
              </a>
            </>
          )}

          {/* 502 Actions */}
          {code === '502' && (
            <>
              <button
                onClick={handleRetryClick}
                disabled={isRetrying}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-stone-950 font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
                <span>{isRetrying ? 'Connecting...' : 'Reconnect Now'}</span>
              </button>
              <button
                onClick={onReturnHome}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-black/40 border border-amber-400/30 text-stone-300 text-xs sm:text-sm font-semibold hover:bg-black/60 flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                <span>Return to Home</span>
              </button>
            </>
          )}

          {/* 503 Actions */}
          {code === '503' && (
            <>
              <a
                href="tel:+919689973967"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 text-stone-950 font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Emergency Helpline: +91 96899 73967</span>
              </a>
              <button
                onClick={handleRetryClick}
                disabled={isRetrying}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-black/40 border border-amber-400/30 text-amber-200 text-xs sm:text-sm font-semibold hover:bg-black/60 flex items-center justify-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
                <span>Check Status</span>
              </button>
            </>
          )}
        </div>

        {/* Footer Reference Info */}
        <div className="mt-8 pt-4 border-t border-amber-500/20 text-[11px] text-stone-400 flex flex-wrap items-center justify-center gap-2">
          <span>Shri Kshetra Trimbakeshwar Tirth Purohit Portal</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono text-amber-300/80">Ref: {referenceId}</span>
        </div>

      </div>
    </div>
  );
};
