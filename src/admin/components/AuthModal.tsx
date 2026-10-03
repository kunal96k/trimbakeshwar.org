import React, { useState, useEffect, useRef } from 'react';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  KeyRound,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  X,
  Phone,
  ShieldAlert,
  Smartphone,
  Key,
} from 'lucide-react';
import { RoyalSeal } from './RoyalSeal';
import { TrimbakBrandLogo } from './TrimbakBrandLogo';
import {
  loginRequest,
  verifyLoginOtp,
  resendLoginOtp,
  forgotPasswordRequest,
  forgotPasswordReset,
  DEFAULT_ADMIN_USER,
  maskEmail,
} from '../../services/authService';
import { ToastContainer, ToastMessage } from './Toast';

export type AuthStep = 'login' | 'verify_otp' | 'forgot' | 'reset_password' | 'success';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string) => void;
  initialStep?: AuthStep;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialStep = 'login',
}) => {
  const [step, setStep] = useState<AuthStep>(initialStep);
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState(DEFAULT_ADMIN_USER.email);
  const [password, setPassword] = useState('Purohit@2026');
  const [rememberMe, setRememberMe] = useState(true);

  // OTP State (6 boxes)
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Password reset state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);

  // UI & Rate Limiting State
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [cooldownTimer, setCooldownTimer] = useState(60);
  const [isCooldownActive, setIsCooldownActive] = useState(false);
  const [otpExpirySeconds, setOtpExpirySeconds] = useState(600);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const triggerToast = (type: 'success' | 'error' | 'info', title: string, message?: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    const newToast: ToastMessage = { id, type, title, message };
    setToasts((prev) => [...prev.slice(-3), newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync initial step if modal reopens
  useEffect(() => {
    if (isOpen) {
      setStep(initialStep);
      setErrorMessage('');
      setSuccessMessage('');
      setOtp(['', '', '', '', '', '']);
    }
  }, [isOpen, initialStep]);

  // Cooldown timer for OTP resend
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCooldownActive && cooldownTimer > 0) {
      timer = setInterval(() => {
        setCooldownTimer((prev) => prev - 1);
      }, 1000);
    } else if (cooldownTimer === 0) {
      setIsCooldownActive(false);
    }
    return () => clearInterval(timer);
  }, [isCooldownActive, cooldownTimer]);

  // OTP Expiry Countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'verify_otp' && otpExpirySeconds > 0) {
      timer = setInterval(() => {
        setOtpExpirySeconds((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, otpExpirySeconds]);

  if (!isOpen) return null;

  // Step 1: Submit Email + Password -> Triggers 2FA OTP to registered email
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!identifier.trim()) {
      const err = 'कृपया नोंदणीकृत ईमेल पत्ता प्रविष्ट करा. | Please enter your registered email address.';
      setErrorMessage(err);
      triggerToast('error', 'Authentication Failed', err);
      return;
    }

    if (!password) {
      const err = 'कृपया संकेतशब्द प्रविष्ट करा. | Please enter your administrator password.';
      setErrorMessage(err);
      triggerToast('error', 'Authentication Failed', err);
      return;
    }

    setIsLoading(true);
    try {
      const res = await loginRequest(identifier, password);
      if (res.success) {
        setStep('verify_otp');
        const msg = res.message || 'सुरक्षा OTP आपल्या ईमेलवर पाठविला आहे. | 2FA Security OTP sent to your registered email.';
        setSuccessMessage(msg);
        triggerToast('success', '2FA OTP Dispatched', `Security verification code sent to ${maskEmail(identifier)}`);
        setCooldownTimer(60);
        setIsCooldownActive(true);
        setOtpExpirySeconds(res.expiresInSeconds || 600);
        setTimeout(() => {
          otpInputRefs.current[0]?.focus();
        }, 150);
      } else {
        const err = res.message || 'Login request failed.';
        setErrorMessage(err);
        triggerToast('error', 'Login Error', err);
      }
    } catch (err: any) {
      const errMsg = err.message || 'अवैध ईमेल किंवा संकेतशब्द. | Invalid administrator credentials.';
      setErrorMessage(errMsg);
      triggerToast('error', 'Authentication Failed', errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify 6-digit OTP -> Establishes Session
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join('').trim();
    if (enteredOtp.length < 6) {
      const err = 'कृपया पूर्ण ६ अंकी OTP प्रविष्ट करा. | Please enter the complete 6-digit verification code.';
      setErrorMessage(err);
      triggerToast('error', 'Incomplete Code', err);
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    try {
      const res = await verifyLoginOtp(identifier, enteredOtp);
      if (res.success) {
        setTimeout(() => {
          onLoginSuccess(identifier);
        }, 1000);
      } else {
        const err = res.message || 'अवैध OTP कोड. | Invalid OTP code.';
        setErrorMessage(err);
        triggerToast('error', 'Verification Error', err);
      }
    } catch (err: any) {
      const errMsg = err.message || 'OTP प्रमाणीकरण अयशस्वी. कृपया कोड तपासा. | OTP verification failed. Please check the code.';
      setErrorMessage(errMsg);
      triggerToast('error', 'OTP Verification Failed', errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP Action
  const handleResendOtp = async () => {
    if (isCooldownActive) return;
    setIsLoading(true);
    setErrorMessage('');
    try {
      const res = await resendLoginOtp(identifier);
      const msg = res.message || `नवीन OTP ${identifier} वर पाठविला आहे. | New OTP resent.`;
      setSuccessMessage(msg);
      triggerToast('info', 'OTP Resent', `A fresh 6-digit security code was dispatched to ${maskEmail(identifier)}`);
      setCooldownTimer(60);
      setIsCooldownActive(true);
      setOtpExpirySeconds(600);
      setOtp(['', '', '', '', '', '']);
      otpInputRefs.current[0]?.focus();
    } catch (err: any) {
      const errMsg = err.message || 'OTP पुन्हा पाठवण्यात त्रुटी. | Failed to resend OTP.';
      setErrorMessage(errMsg);
      triggerToast('error', 'Resend Failed', errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Forgot Password: Step 1 -> Send Reset OTP
  const handleDispatchForgotOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      const err = 'कृपया प्रशासक ईमेल पत्ता प्रविष्ट करा. | Please enter your administrator email.';
      setErrorMessage(err);
      triggerToast('error', 'Missing Email', err);
      return;
    }
    setIsLoading(true);
    setErrorMessage('');
    try {
      const res = await forgotPasswordRequest(identifier);
      if (res.success) {
        setStep('reset_password');
        const msg = res.message || 'संकेतशब्द रीसेट OTP पाठविला आहे. | Password reset OTP dispatched.';
        setSuccessMessage(msg);
        triggerToast('success', 'Reset OTP Sent', `Security reset code dispatched to ${maskEmail(identifier)}`);
        setCooldownTimer(60);
        setIsCooldownActive(true);
      } else {
        const err = res.message || 'Could not send reset OTP.';
        setErrorMessage(err);
        triggerToast('error', 'Dispatch Error', err);
      }
    } catch (err: any) {
      const errMsg = err.message || 'Failed to dispatch reset OTP.';
      setErrorMessage(errMsg);
      triggerToast('error', 'Reset Dispatch Failed', errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Forgot Password: Step 2 -> Verify OTP and Reset
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join('').trim();
    if (enteredOtp.length < 6) {
      const err = 'कृपया ६ अंकी OTP प्रविष्ट करा. | Please enter the 6-digit OTP.';
      setErrorMessage(err);
      triggerToast('error', 'Incomplete Code', err);
      return;
    }
    if (newPassword.length < 6) {
      const err = 'नवीन संकेतशब्द किमान ६ अक्षरांचा असावा. | New password must be at least 6 characters.';
      setErrorMessage(err);
      triggerToast('error', 'Weak Password', err);
      return;
    }
    if (newPassword !== confirmPassword) {
      const err = 'संकेतशब्द जुळत नाहीत. | New password and confirm password do not match.';
      setErrorMessage(err);
      triggerToast('error', 'Mismatch Error', err);
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    try {
      const res = await forgotPasswordReset({
        email: identifier,
        otp: enteredOtp,
        newPassword,
        confirmPassword,
      });

      if (res.success) {
        setStep('success');
        triggerToast('success', 'Password Updated', 'Your administrator password has been reset successfully.');
        setTimeout(() => {
          onLoginSuccess(identifier);
        }, 1200);
      } else {
        const err = res.message || 'Could not reset password.';
        setErrorMessage(err);
        triggerToast('error', 'Reset Error', err);
      }
    } catch (err: any) {
      const errMsg = err.message || 'Password reset failed.';
      setErrorMessage(errMsg);
      triggerToast('error', 'Reset Failed', errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP Inputs & Auto-Paste
  const handleOtpChange = (index: number, value: string) => {
    const cleanVal = value.replace(/[^0-9]/g, '');
    const newOtp = [...otp];

    if (cleanVal.length > 1) {
      const pastedDigits = cleanVal.slice(0, 6).split('');
      pastedDigits.forEach((char, i) => {
        newOtp[i] = char;
      });
      setOtp(newOtp);
      const nextIdx = Math.min(pastedDigits.length, 5);
      otpInputRefs.current[nextIdx]?.focus();
      return;
    }

    newOtp[index] = cleanVal;
    setOtp(newOtp);

    if (cleanVal && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const formatExpiryTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md rounded-3xl bg-[#1A0D0A] border border-amber-500/30 shadow-2xl overflow-hidden p-6 sm:p-7 space-y-5">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-black/40 hover:bg-stone-800 text-stone-400 hover:text-stone-100 border border-stone-800 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Brand Header */}
        <div className="text-center space-y-1.5 pt-1">
          <div className="flex justify-center">
            <TrimbakBrandLogo size="md" isDarkTheme={true} />
          </div>
          <p className="text-xs text-stone-400 font-sans">
            Hereditary Vatandar Purohit Administrative Suite
          </p>
        </div>

        {/* Error / Success Messages */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 flex items-start gap-2 animate-in fade-in">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && !errorMessage && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-start gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* ─── STEP 1: PASSWORD LOGIN ─── */}
        {step === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="text-center pb-1">
              <h2 className="text-lg font-bold text-amber-100 font-sanskrit">
                Admin Authentication (लॉगिन)
              </h2>
              <p className="text-xs text-stone-400 mt-0.5">
                Enter your master credentials. A 2FA OTP will be dispatched to your email.
              </p>
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-300">
                Registered Email ID <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="trimbak.tirthapurohit@gmail.com"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-black/50 border border-stone-700 focus:border-amber-400 text-sm text-stone-100 placeholder-stone-500 focus:outline-none font-mono"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-stone-300">
                  Password (संकेतशब्द) <span className="text-rose-400">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setErrorMessage('');
                    setStep('forgot');
                  }}
                  className="text-xs text-amber-400 hover:text-amber-300 cursor-pointer font-medium"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password"
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-black/50 border border-stone-700 focus:border-amber-400 text-sm text-stone-100 placeholder-stone-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-3 text-stone-400 hover:text-amber-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-950/40 transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Verifying Credentials & Sending OTP...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify Password & Get 2FA OTP</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* ─── STEP 2: 2FA OTP VERIFICATION ─── */}
        {step === 'verify_otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-400 mx-auto">
                <KeyRound className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-amber-100 font-sanskrit">
                Two-Factor Security Code (2FA OTP)
              </h2>
              <p className="text-xs text-stone-300">
                A 6-digit code has been dispatched to:
              </p>
              <p className="text-xs font-mono font-bold text-amber-300">
                {maskEmail(identifier)}
              </p>
            </div>

            {/* 6 Digit Input Boxes */}
            <div className="flex justify-center gap-2 sm:gap-2.5 my-3">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    otpInputRefs.current[idx] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                  className="w-10 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-bold font-mono text-amber-200 bg-black/60 border-2 border-amber-500/30 focus:border-amber-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 shadow-inner"
                />
              ))}
            </div>

            {/* Timer & Resend Button */}
            <div className="flex items-center justify-between text-xs text-stone-400 pt-1">
              <span>Code expires in: <strong className="text-amber-300 font-mono">{formatExpiryTime(otpExpirySeconds)}</strong></span>
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isCooldownActive || isLoading}
                className="text-amber-400 hover:text-amber-300 disabled:text-stone-600 cursor-pointer disabled:cursor-not-allowed font-medium"
              >
                {isCooldownActive ? `Resend in ${cooldownTimer}s` : 'Resend OTP'}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                type="submit"
                disabled={isLoading || otp.join('').length < 6}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-950/40 transition-all cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Validating OTP & Establishing Session...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verify OTP & Enter Admin Portal</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setStep('login')}
                className="w-full py-2 text-center text-xs text-stone-400 hover:text-stone-200 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Password Login</span>
              </button>
            </div>
          </form>
        )}

        {/* ─── STEP 3: FORGOT PASSWORD REQUEST ─── */}
        {step === 'forgot' && (
          <form onSubmit={handleDispatchForgotOtp} className="space-y-4">
            <div className="text-center space-y-1">
              <h2 className="text-lg font-bold text-amber-100 font-sanskrit">
                Forgot Master Password
              </h2>
              <p className="text-xs text-stone-400">
                Enter your registered admin email address to receive a secure password reset code.
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-300">
                Registered Email ID
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="trimbak.tirthapurohit@gmail.com"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-black/50 border border-stone-700 focus:border-amber-400 text-sm text-stone-100 placeholder-stone-500 focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-950/40 transition-all cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Sending Reset Code...</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    <span>Send Password Reset OTP</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setStep('login')}
                className="w-full py-2 text-center text-xs text-stone-400 hover:text-stone-200 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Login</span>
              </button>
            </div>
          </form>
        )}

        {/* ─── STEP 4: RESET PASSWORD WITH OTP ─── */}
        {step === 'reset_password' && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="text-center space-y-1">
              <h2 className="text-lg font-bold text-amber-100 font-sanskrit">
                Set New Administrative Password
              </h2>
              <p className="text-xs text-stone-400">
                Enter the OTP code received at <strong>{maskEmail(identifier)}</strong> and specify your new password.
              </p>
            </div>

            {/* OTP Code */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-300">
                6-Digit Reset OTP Code
              </label>
              <div className="flex justify-center gap-2 my-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      otpInputRefs.current[idx] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className="w-9 h-11 text-center text-base font-bold font-mono text-amber-200 bg-black/60 border border-amber-500/30 focus:border-amber-400 rounded-lg focus:outline-none"
                  />
                ))}
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-300">
                New Password (नवीन पासवर्ड)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-black/50 border border-stone-700 focus:border-amber-400 text-sm text-stone-100 placeholder-stone-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="absolute right-3 top-3 text-stone-400 hover:text-amber-300"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-300">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-black/50 border border-stone-700 focus:border-amber-400 text-sm text-stone-100 placeholder-stone-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-950/40 transition-all cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Resetting Password...</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>Confirm & Reset Password</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setStep('login')}
                className="w-full py-2 text-center text-xs text-stone-400 hover:text-stone-200 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Login</span>
              </button>
            </div>
          </form>
        )}

        {/* ─── STEP 5: SUCCESS SPLASH ─── */}
        {step === 'success' && (
          <div className="py-8 text-center space-y-3 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/60">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-amber-100 font-sanskrit">
              प्रवेश प्रमाणित व सुरक्षित (Authenticated)
            </h2>
            <p className="text-xs text-stone-300 max-w-xs mx-auto">
              Welcome back to Shri Kshetra Trimbakeshwar Jyotirlinga Purohit Portal.
            </p>
          </div>
        )}
      </div>

      {/* Floating Sanctified Toast Alerts */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
};

export default AuthModal;
