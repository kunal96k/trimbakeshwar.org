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
} from 'lucide-react';
import { RoyalSeal } from './RoyalSeal';
import { TrimbakBrandLogo } from './TrimbakBrandLogo';

export type AuthStep = 'login' | 'forgot' | 'verify_otp' | 'reset_password' | 'success';

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
  const [loginMode, setLoginMode] = useState<'password' | 'otp'>('password');
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState('trimbak.tirthapurohit@gmail.com');
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
  const [remainingAttempts, setRemainingAttempts] = useState(5);
  const [cooldownTimer, setCooldownTimer] = useState(60);
  const [isCooldownActive, setIsCooldownActive] = useState(false);

  // Sync initial step if modal reopens
  useEffect(() => {
    if (isOpen) {
      setStep(initialStep);
      setErrorMessage('');
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

  if (!isOpen) return null;

  // Handle Login Submit
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (remainingAttempts <= 1) {
      setErrorMessage('Security Rate-Limit: Maximum login attempts reached. Please wait 15 minutes.');
      return;
    }

    if (!identifier.trim()) {
      setErrorMessage('Please enter your registered email address or mobile number.');
      return;
    }

    if (loginMode === 'otp') {
      // Trigger OTP dispatch for direct login
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setCooldownTimer(60);
        setIsCooldownActive(true);
        setStep('verify_otp');
      }, 700);
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your master password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Demo validation accepts registered credentials or any mock matching
      if (
        identifier.toLowerCase().includes('trimbak') ||
        identifier.includes('96899') ||
        identifier.includes('@')
      ) {
        onLoginSuccess(identifier);
        onClose();
      } else {
        setRemainingAttempts((prev) => prev - 1);
        setErrorMessage(`Invalid credentials. Security lock in ${remainingAttempts - 1} attempts.`);
      }
    }, 900);
  };

  // Handle Dispatch OTP for Forgot Password
  const handleDispatchOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setErrorMessage('Please enter your registered email address.');
      return;
    }
    setIsLoading(true);
    setErrorMessage('');
    setTimeout(() => {
      setIsLoading(false);
      setCooldownTimer(60);
      setIsCooldownActive(true);
      setStep('verify_otp');
    }, 800);
  };

  // Handle OTP Inputs & Auto-Paste
  const handleOtpChange = (index: number, value: string) => {
    const cleanVal = value.replace(/[^0-9]/g, '');
    const newOtp = [...otp];

    if (cleanVal.length > 1) {
      // Auto-paste flow: paste up to 6 digits
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

    // Auto-advance
    if (cleanVal && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // Handle OTP Verification
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 6) {
      setErrorMessage('Please enter the complete 6-digit verification code.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setTimeout(() => {
      setIsLoading(false);
      if (loginMode === 'otp' && step === 'verify_otp') {
        // Direct OTP login success
        onLoginSuccess(identifier);
        onClose();
      } else {
        // Password reset progression
        setStep('reset_password');
      }
    }, 800);
  };

  // Handle Password Reset
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }
    if (!/[A-Z]/.test(newPassword) || !/[a-z]/.test(newPassword)) {
      setErrorMessage('Password must include both uppercase and lowercase letters.');
      return;
    }
    if (!/[0-9]/.test(newPassword) || !/[@#$*&!]/.test(newPassword)) {
      setErrorMessage('Password must include at least one number and a special symbol (@, #, $, *).');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify your entry.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setTimeout(() => {
      setIsLoading(false);
      setStep('success');
      setTimeout(() => {
        onLoginSuccess(identifier);
        onClose();
      }, 2000);
    }, 1000);
  };

  // Live Password Strength Evaluation
  const hasMinLength = newPassword.length >= 8;
  const hasUpperLower = /[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword);
  const hasNumberAndSymbol = /[0-9]/.test(newPassword) && /[@#$*&!]/.test(newPassword);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div
        className="relative w-full max-w-md bg-gradient-to-b from-[#24110C] via-[#1A0B08] to-[#120705] border-2 border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 text-stone-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-black/40 text-stone-400 hover:text-white border border-amber-500/20 transition-colors"
          aria-label="Close Authentication Modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Lockup & Sacred Crest */}
        <div className="text-center mb-6 flex flex-col items-center gap-1.5">
          <div className="flex justify-center mb-2">
            <TrimbakBrandLogo size="md" isDarkTheme={true} />
          </div>
          <h2 id="auth-modal-title" className="text-lg sm:text-xl font-bold font-sanskrit text-amber-100 leading-snug">
            {step === 'login' && 'Trimbakeshwar Purohit Admin Portal'}
            {step === 'forgot' && 'Reset Master Password'}
            {step === 'verify_otp' && 'Two-Factor Authentication'}
            {step === 'reset_password' && 'Create New Master Password'}
            {step === 'success' && 'Password Updated Successfully!'}
          </h2>
          <p className="text-[11px] text-stone-400 font-sans">
            Hereditary Purohit Office Access & Verification
          </p>
        </div>

        {/* Error Notification Alert */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-2 animate-in slide-in-from-top-1">
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
            <span className="leading-snug">{errorMessage}</span>
          </div>
        )}

        {/* STEP 1: ADMIN LOGIN FORM */}
        {step === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email or Mobile Field */}
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                Email Address or Mobile Number
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-amber-400 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="trimbak.tirthapurohit@gmail.com"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full bg-black/50 border border-amber-500/30 rounded-xl py-2.5 pl-10 pr-3 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            </div>

            {/* Password Field (when in password mode) */}
            {loginMode === 'password' && (
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-semibold text-stone-300">
                    Master Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setErrorMessage('');
                      setStep('forgot');
                    }}
                    className="text-xs text-amber-400 hover:text-amber-300 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-amber-400 absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter security password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black/50 border border-amber-500/30 rounded-xl py-2.5 pl-10 pr-10 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-stone-400 hover:text-white transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-stone-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 accent-amber-500"
                />
                <span>Remember this device for 30 days</span>
              </label>

              {/* Mode Toggle Button */}
              <button
                type="button"
                onClick={() => {
                  setErrorMessage('');
                  setLoginMode(loginMode === 'password' ? 'otp' : 'password');
                }}
                className="text-xs text-amber-300/90 hover:text-amber-200 hover:underline"
              >
                {loginMode === 'password' ? 'Login with OTP' : 'Login with Password'}
              </button>
            </div>

            {/* Primary Action Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-stone-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-950/60 transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Authenticating Credentials...</span>
                </>
              ) : (
                <>
                  <span>
                    {loginMode === 'password' ? 'Sign In to Admin Portal' : 'Dispatch Login OTP'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* STEP 2: FORGOT PASSWORD */}
        {step === 'forgot' && (
          <form onSubmit={handleDispatchOtp} className="space-y-4">
            <p className="text-xs text-stone-300 leading-relaxed">
              Enter your registered Purohit email address. We will dispatch a secure 6-digit verification code to reset your password.
            </p>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                Registered Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-amber-400 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="email"
                  required
                  placeholder="trimbak.tirthapurohit@gmail.com"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full bg-black/50 border border-amber-500/30 rounded-xl py-2.5 pl-10 pr-3 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  setErrorMessage('');
                  setStep('login');
                }}
                className="w-1/3 py-2.5 rounded-xl bg-black/40 border border-amber-500/25 text-xs font-semibold text-stone-300 hover:bg-white/5 transition-colors flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="w-2/3 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Dispatching...</span>
                  </>
                ) : (
                  <span>Dispatch Verification OTP</span>
                )}
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: 6-DIGIT OTP VERIFICATION */}
        {step === 'verify_otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <p className="text-xs text-stone-300 text-center leading-relaxed">
              Enter the 6-digit verification code sent to <strong className="text-amber-200">{identifier}</strong>.
            </p>

            {/* 6 Auto-Advancing Boxes */}
            <div className="flex justify-center gap-2 sm:gap-2.5 my-3">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    otpInputRefs.current[idx] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                  className="w-10 h-12 sm:w-11 sm:h-13 text-center text-lg font-bold font-mono bg-black/60 border border-amber-400/40 rounded-xl focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-amber-200 transition-all outline-none"
                  aria-label={`OTP Digit ${idx + 1}`}
                />
              ))}
            </div>

            {/* Resend Cooldown Countdown */}
            <div className="text-center text-xs text-stone-400">
              {isCooldownActive ? (
                <span>
                  Resend Code in{' '}
                  <strong className="text-amber-300 font-mono">
                    00:{cooldownTimer < 10 ? `0${cooldownTimer}` : cooldownTimer}
                  </strong>
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setCooldownTimer(60);
                    setIsCooldownActive(true);
                  }}
                  className="text-amber-400 hover:text-amber-300 hover:underline font-semibold"
                >
                  Resend Verification OTP
                </button>
              )}
            </div>

            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setStep('login')}
                className="w-1/3 py-2.5 rounded-xl bg-black/40 border border-amber-500/25 text-xs font-semibold text-stone-300 hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="w-2/3 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <span>Verify Code & Proceed</span>
                )}
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: RESET & FORMAT NEW PASSWORD */}
        {step === 'reset_password' && (
          <form onSubmit={handleResetPassword} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                New Master Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  required
                  placeholder="At least 8 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-black/50 border border-amber-500/30 rounded-xl py-2 px-3 pr-10 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-2.5 text-stone-400 hover:text-white"
                >
                  {showNewPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Confirm New Password
              </label>
              <input
                type={showNewPassword ? 'text' : 'password'}
                required
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-black/50 border border-amber-500/30 rounded-xl py-2 px-3 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Live Security Strength Checklist */}
            <div className="p-3 rounded-xl bg-black/40 border border-amber-500/20 text-[11px] space-y-1.5 text-stone-400">
              <div className="font-semibold text-stone-300 text-xs">Security Strength Checklist:</div>
              <div className="flex items-center gap-2">
                <CheckCircle2
                  className={`w-3.5 h-3.5 ${hasMinLength ? 'text-emerald-400' : 'text-stone-600'}`}
                />
                <span className={hasMinLength ? 'text-emerald-300' : ''}>At least 8 characters</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2
                  className={`w-3.5 h-3.5 ${hasUpperLower ? 'text-emerald-400' : 'text-stone-600'}`}
                />
                <span className={hasUpperLower ? 'text-emerald-300' : ''}>Upper and lower case letters</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2
                  className={`w-3.5 h-3.5 ${hasNumberAndSymbol ? 'text-emerald-400' : 'text-stone-600'}`}
                />
                <span className={hasNumberAndSymbol ? 'text-emerald-300' : ''}>
                  At least one number and special symbol (@, #, $, *)
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 font-bold text-xs shadow-md mt-2 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Updating Password...</span>
                </>
              ) : (
                <span>Update Password & Save</span>
              )}
            </button>
          </form>
        )}

        {/* STEP 5: SUCCESS CONFIRMATION */}
        {step === 'success' && (
          <div className="text-center py-5 space-y-4 animate-in zoom-in-95">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border-2 border-emerald-400/40 shadow-lg shadow-emerald-950/50">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-100 font-sanskrit">
                Password Successfully Updated!
              </h3>
              <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                Your master authentication credentials have been securely refreshed. Redirecting to Admin Dashboard...
              </p>
            </div>
            <div className="pt-2">
              <RefreshCw className="w-5 h-5 mx-auto text-amber-400 animate-spin" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
