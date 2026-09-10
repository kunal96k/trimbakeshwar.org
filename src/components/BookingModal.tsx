import React, { useState, useEffect, useRef } from 'react';
import { SupportedLanguage, PujaItem, GurujiItem } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { PUJA_LIST, GURUJI_LIST } from '../data/siteData';
import {
  X,
  Check,
  ArrowRight,
  ArrowLeft,
  Calendar,
  User,
  Phone,
  MapPin,
  Sparkles,
  ShieldCheck,
  CreditCard,
  QrCode,
  Smartphone,
  Building2,
  Lock,
  Clock,
  Printer,
  Share2,
  Copy,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  BadgeCheck,
  Info,
} from 'lucide-react';
import { TrishulIcon, DivyaSparkleIcon, OmSymbol } from './Motifs';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: SupportedLanguage;
  initialVidhiId?: string;
  initialGurujiId?: string;
}

export function BookingModal({
  isOpen,
  onClose,
  currentLang,
  initialVidhiId,
  initialGurujiId,
}: BookingModalProps) {
  // Steps:
  // 1: Vidhi
  // 2: Date & Muhurat
  // 3: Guruji
  // 4: Yajman Details
  // 5: Mobile OTP Verification
  // 6: Advance Booking Payment (₹500)
  // 7: Confirmed Pass
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedVidhi, setSelectedVidhi] = useState<PujaItem | null>(null);
  const [selectedGuruji, setSelectedGuruji] = useState<GurujiItem | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('06:30 AM to 10:30 AM (Morning Brahma / Shubh)');

  // Yajman Information
  const [yajmanData, setYajmanData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    gotra: '',
    familyMembers: '2',
    language: 'Marathi',
    specialNotes: '',
  });

  // Validation Error
  const [stepError, setStepError] = useState<string | null>(null);

  // OTP State
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '']);
  const [otpTimer, setOtpTimer] = useState<number>(30);
  const [canResendOtp, setCanResendOtp] = useState<boolean>(false);
  const [isOtpVerified, setIsOtpVerified] = useState<boolean>(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'qr' | 'upi' | 'card' | 'netbanking'>('qr');
  const [upiIdInput, setUpiIdInput] = useState<string>('');
  const [selectedBank, setSelectedBank] = useState<string>('sbi');
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [paymentStepText, setPaymentStepText] = useState<string>('Processing...');
  const [qrSecondsLeft, setQrSecondsLeft] = useState<number>(295);

  // Confirmation Details
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);
  const [bookingRefId, setBookingRefId] = useState<string>('');
  const [transactionId, setTransactionId] = useState<string>('');
  const [paymentTime, setPaymentTime] = useState<string>('');
  const [copiedRef, setCopiedRef] = useState<boolean>(false);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  // Initialize initial vidhi, guruji & default date
  useEffect(() => {
    if (initialVidhiId) {
      const vidhi = PUJA_LIST.find((p) => p.id === initialVidhiId || p.slug === initialVidhiId);
      if (vidhi) setSelectedVidhi(vidhi);
    } else if (!selectedVidhi && PUJA_LIST.length > 0) {
      setSelectedVidhi(PUJA_LIST[0]);
    }

    if (initialGurujiId) {
      const guruji = GURUJI_LIST.find((g) => g.id === initialGurujiId);
      if (guruji) setSelectedGuruji(guruji);
    } else if (!selectedGuruji && GURUJI_LIST.length > 0) {
      setSelectedGuruji(GURUJI_LIST[0]);
    }

    // Default auspicious date (3 days from now)
    const today = new Date();
    today.setDate(today.getDate() + 3);
    setSelectedDate(today.toISOString().split('T')[0]);
  }, [initialVidhiId, initialGurujiId, isOpen]);

  // OTP Countdown timer
  useEffect(() => {
    let interval: any = null;
    if (currentStep === 5 && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            setCanResendOtp(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentStep, otpTimer]);

  // QR Session countdown timer
  useEffect(() => {
    let interval: any = null;
    if (currentStep === 6 && paymentMethod === 'qr' && qrSecondsLeft > 0) {
      interval = setInterval(() => {
        setQrSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentStep, paymentMethod, qrSecondsLeft]);

  if (!isOpen) return null;

  // Format seconds as MM:SS
  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Quick fill sample Yajman data for easy evaluation
  const handleDemoFillYajman = () => {
    setYajmanData({
      name: 'Rajesh Ramchandra Joshi',
      phone: '9823012345',
      email: 'rajesh.joshi@example.com',
      city: 'Pune, Maharashtra',
      gotra: 'Kashyap (कश्यप)',
      familyMembers: '2',
      language: 'Marathi',
      specialNotes: 'Seeking ancestral peace and family prosperity blessings at Trimbakeshwar.',
    });
    setStepError(null);
  };

  // Handle Step 4 -> Step 5 (Validation & OTP Trigger)
  const handleProceedToOtp = () => {
    if (!yajmanData.name.trim() || yajmanData.name.trim().length < 3) {
      setStepError('Please enter Primary Yajman Full Name (at least 3 characters).');
      return;
    }
    const cleanPhone = yajmanData.phone.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setStepError('Please enter a valid 10-digit WhatsApp / Mobile number.');
      return;
    }

    setStepError(null);
    setOtpDigits(['', '', '', '']);
    setOtpError(null);
    setIsOtpVerified(false);
    setOtpTimer(30);
    setCanResendOtp(false);
    setCurrentStep(5);
  };

  // Auto-fill Demo OTP
  const handleAutoFillDemoOtp = () => {
    const demo = ['1', '2', '3', '4'];
    setOtpDigits(demo);
    setOtpError(null);
    setIsOtpVerified(true);
  };

  // Handle OTP digit changes
  const handleOtpChange = (index: number, val: string) => {
    const char = val.slice(-1);
    if (char && !/^[0-9]$/.test(char)) return;

    const newDigits = [...otpDigits];
    newDigits[index] = char;
    setOtpDigits(newDigits);
    setOtpError(null);

    // Auto-advance
    if (char && index < 3) {
      otpInputRefs.current[index + 1]?.focus();
    }

    // If 4 digits filled, verify
    if (char && index === 3) {
      const full = newDigits.join('');
      if (full.length === 4) {
        setIsOtpVerified(true);
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 4);
    if (!pasted) return;
    const newDigits = ['', '', '', ''];
    for (let i = 0; i < pasted.length; i++) {
      newDigits[i] = pasted[i];
    }
    setOtpDigits(newDigits);
    if (pasted.length === 4) {
      setIsOtpVerified(true);
      setOtpError(null);
    }
  };

  const handleVerifyOtpAndProceed = () => {
    const entered = otpDigits.join('');
    if (entered.length < 4) {
      setOtpError('Please enter the complete 4-digit code (Use Demo OTP: 1234).');
      return;
    }

    setIsOtpVerified(true);
    setOtpError(null);

    // Advance to Payment Step 6
    setTimeout(() => {
      setCurrentStep(6);
    }, 400);
  };

  const handleResendOtp = () => {
    setOtpDigits(['', '', '', '']);
    setOtpError(null);
    setIsOtpVerified(false);
    setOtpTimer(30);
    setCanResendOtp(false);
  };

  // Card Number formatting (adds space every 4 digits)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = val.replace(/(\d{4})/g, '$1 ').trim();
    setCardData({ ...cardData, number: formatted });
  };

  const handleCardExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (val.length >= 2) {
      val = val.slice(0, 2) + '/' + val.slice(2);
    }
    setCardData({ ...cardData, expiry: val });
  };

  // Payment Execution Simulation
  const handleExecutePayment = () => {
    setIsProcessingPayment(true);
    setPaymentStepText('Connecting to Secure NPCI & Bank Gateway...');

    setTimeout(() => {
      setPaymentStepText('Authorizing ₹500 Advance Token...');
    }, 600);

    setTimeout(() => {
      const ref = `TRMBK-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      const txn = `TXN-${paymentMethod.toUpperCase()}-${Math.floor(1000000000 + Math.random() * 9000000000)}`;
      const now = new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      });

      setBookingRefId(ref);
      setTransactionId(txn);
      setPaymentTime(now);
      setIsProcessingPayment(false);
      setBookingConfirmed(true);
      setCurrentStep(7);
    }, 1300);
  };

  const handleBack = () => {
    setStepError(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleCopyReference = () => {
    navigator.clipboard.writeText(bookingRefId);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `🙏 Shri Trimbakeshwar Jyotirlinga Puja Booking Confirmed!\n\n` +
        `• Booking Ref: ${bookingRefId}\n` +
        `• Transaction ID: ${transactionId} (₹500 Advance Paid)\n` +
        `• Vidhi: ${selectedVidhi?.name}\n` +
        `• Appointed Guruji: ${selectedGuruji?.name}\n` +
        `• Date: ${selectedDate} (${selectedTimeSlot})\n` +
        `• Yajman: ${yajmanData.name} (Gotra: ${yajmanData.gotra || 'Kashyap'})\n` +
        `• Venue: Kushavarta Kund Ghat & Mandir Gate 2, Trimbakeshwar\n\n` +
        `Har Har Mahadev!`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const stepLabels = [
    { num: 1, label: 'Vidhi' },
    { num: 2, label: 'Date' },
    { num: 3, label: 'Guruji' },
    { num: 4, label: 'Yajman' },
    { num: 5, label: 'OTP' },
    { num: 6, label: 'Pay ₹500' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="bg-[#FBF6EA] text-[#211D19] rounded-3xl max-w-3xl w-full max-h-[94vh] flex flex-col border border-[#B88935]/40 shadow-2xl overflow-hidden relative"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#5A1717] via-[#4A1313] to-[#2E0B0B] text-white flex items-center justify-between border-b border-amber-400/20 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
              <TrishulIcon className="w-5 h-5 text-amber-300 shrink-0" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-amber-300 text-[11px] font-semibold tracking-wider uppercase font-sans">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                <span>Shri Trimbakeshwar Jyotirlinga Seva</span>
              </div>
              <h2 className="text-base sm:text-xl font-bold font-sanskrit text-amber-50 leading-tight">
                {bookingConfirmed
                  ? 'पूजा संकल्प व टोकन पुष्टी • Booking Confirmed'
                  : currentStep === 5
                  ? 'मोबाईल ओटीपी पडताळणी • Verify Mobile OTP'
                  : currentStep === 6
                  ? 'ॲडव्हान्स टोकन पेमेंट • Pay ₹500 Advance Token'
                  : 'पूजा नोंदणी • Sacred Vidhi Booking'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Header */}
        {!bookingConfirmed && (
          <div className="bg-[#EDE3D1]/80 px-4 sm:px-6 py-2.5 border-b border-[#B88935]/25">
            {/* Desktop Stepper */}
            <div className="hidden sm:flex items-center justify-between text-xs font-medium">
              {stepLabels.map((item, idx) => (
                <React.Fragment key={item.num}>
                  <div
                    className={`flex items-center gap-1.5 transition-colors ${
                      currentStep === item.num
                        ? 'text-[#5A1717] font-bold'
                        : currentStep > item.num
                        ? 'text-emerald-700 font-semibold'
                        : 'text-stone-400'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        currentStep === item.num
                          ? 'bg-[#5A1717] text-white'
                          : currentStep > item.num
                          ? 'bg-emerald-600 text-white'
                          : 'bg-stone-300 text-stone-600'
                      }`}
                    >
                      {currentStep > item.num ? '✓' : item.num}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {idx < stepLabels.length - 1 && <span className="text-stone-300 font-light">→</span>}
                </React.Fragment>
              ))}
            </div>

            {/* Mobile Compact Stepper */}
            <div className="sm:hidden flex items-center justify-between text-xs">
              <span className="font-bold text-[#5A1717] flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#5A1717] text-white flex items-center justify-center text-[10px]">
                  {currentStep}
                </span>
                <span>
                  {currentStep === 1 && '1/6: Select Vidhi'}
                  {currentStep === 2 && '2/6: Date & Muhurat'}
                  {currentStep === 3 && '3/6: Select Guruji'}
                  {currentStep === 4 && '4/6: Yajman Information'}
                  {currentStep === 5 && '5/6: Verify Mobile OTP'}
                  {currentStep === 6 && '6/6: Pay ₹500 Advance Token'}
                </span>
              </span>
              <div className="w-24 bg-stone-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#5A1717] to-[#C56A18] h-full transition-all duration-300"
                  style={{ width: `${(currentStep / 6) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 font-sans">
          {/* STEP 1: Select Vidhi */}
          {currentStep === 1 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base sm:text-lg font-bold font-heading text-[#5A1717]">
                  Choose Traditional Vidhi
                </h3>
                <span className="text-[11px] text-[#C56A18] font-semibold bg-amber-100/60 px-2 py-0.5 rounded-full border border-amber-300/40">
                  Step 1 of 6
                </span>
              </div>
              <p className="text-xs text-stone-600 mb-4">
                Select the sacred ritual you wish to observe under the divine presence of Trimbakeshwar Mahadev.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PUJA_LIST.map((puja) => (
                  <div
                    key={puja.id}
                    onClick={() => setSelectedVidhi(puja)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all relative overflow-hidden ${
                      selectedVidhi?.id === puja.id
                        ? 'bg-[#EDE3D1] border-[#5A1717] ring-2 ring-[#5A1717]/20 shadow-sm'
                        : 'bg-white border-stone-200 hover:border-[#B88935]/60 hover:bg-amber-50/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={puja.image || puja.imageUrl}
                          alt={puja.name}
                          className="w-12 h-12 rounded-xl object-cover border border-[#B88935]/30 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="text-[10px] font-bold text-[#C56A18] uppercase tracking-wider">
                            {puja.category}
                          </div>
                          <div className="text-sm font-bold text-[#211D19] font-heading leading-snug">
                            {puja.name}
                          </div>
                          <div className="text-[11px] font-sanskrit text-stone-600">
                            {puja.sanskritName}
                          </div>
                        </div>
                      </div>
                      {selectedVidhi?.id === puja.id && (
                        <div className="w-5 h-5 rounded-full bg-[#5A1717] text-white flex items-center justify-center text-xs shrink-0 shadow-sm">
                          ✓
                        </div>
                      )}
                    </div>
                    <div className="mt-2 text-[11px] text-stone-600 line-clamp-2">
                      {puja.tagline}
                    </div>
                    <div className="mt-2.5 pt-2 border-t border-stone-200/70 flex items-center justify-between text-[10px] text-stone-600 font-medium">
                      <span>Duration: {puja.duration}</span>
                      <span className="text-[#5A1717] font-semibold">Samagri Included</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Select Date & Muhurat */}
          {currentStep === 2 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base sm:text-lg font-bold font-heading text-[#5A1717]">
                  Select Auspicious Date & Muhurat
                </h3>
                <span className="text-[11px] text-[#C56A18] font-semibold bg-amber-100/60 px-2 py-0.5 rounded-full border border-amber-300/40">
                  Step 2 of 6
                </span>
              </div>
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/60 mb-4 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-stone-500 uppercase tracking-wider block">Selected Vidhi</span>
                  <span className="font-bold text-sm text-[#5A1717]">{selectedVidhi?.name}</span>
                </div>
                <span className="text-xs font-medium text-stone-600 bg-white px-2.5 py-1 rounded-lg border border-stone-200">
                  {selectedVidhi?.duration}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    Arrival Date / Sankalp Day *
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-3 rounded-xl border border-stone-300 bg-white text-sm font-sans focus:outline-none focus:ring-2 focus:ring-[#B88935]"
                  />
                  <div className="text-[11px] text-stone-600 mt-2 flex items-center gap-1.5 bg-[#EDE3D1]/50 p-2.5 rounded-xl border border-[#B88935]/20">
                    <DivyaSparkleIcon className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>
                      {selectedVidhi?.id === 'narayan-nagbali'
                        ? 'For Narayan Nagbali, a 3-day continuous observance at Trimbakeshwar is traditionally mandated.'
                        : 'Auspicious muhurats are verified by Guruji in accordance with the Panchang.'}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    Preferred Muhurat Slot
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      {
                        label: 'Morning Brahma / Shubh',
                        time: '06:30 AM to 10:30 AM',
                        desc: 'Ideal for Pitru & Shanti vidhis',
                      },
                      {
                        label: 'Mid-Morning Abhijit',
                        time: '11:00 AM to 02:00 PM',
                        desc: 'Highly auspicious universal slot',
                      },
                      {
                        label: 'Afternoon / Pradosh',
                        time: '03:30 PM to 06:30 PM',
                        desc: 'Favored for Shiva Rudrabhishek',
                      },
                    ].map((slot) => {
                      const isSelected = selectedTimeSlot.includes(slot.label);
                      return (
                        <div
                          key={slot.label}
                          onClick={() => setSelectedTimeSlot(`${slot.time} (${slot.label})`)}
                          className={`p-3 rounded-xl border cursor-pointer text-xs transition-all ${
                            isSelected
                              ? 'bg-[#EDE3D1] border-[#5A1717] font-semibold text-[#5A1717] ring-1 ring-[#5A1717]'
                              : 'bg-white border-stone-200 hover:bg-stone-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold">{slot.label}</span>
                            {isSelected && <span className="text-[#5A1717]">✓</span>}
                          </div>
                          <div className="text-stone-600 font-mono text-[11px] mt-0.5">{slot.time}</div>
                          <div className="text-stone-500 text-[10px] mt-1">{slot.desc}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Choose Guruji */}
          {currentStep === 3 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base sm:text-lg font-bold font-heading text-[#5A1717]">
                  Choose Vedic Guruji
                </h3>
                <span className="text-[11px] text-[#C56A18] font-semibold bg-amber-100/60 px-2 py-0.5 rounded-full border border-amber-300/40">
                  Step 3 of 6
                </span>
              </div>
              <p className="text-xs text-stone-600 mb-4">
                Connect with an authorized, certified Purohit from the sacred Kshetra of Trimbakeshwar.
              </p>

              <div className="space-y-3">
                {GURUJI_LIST.map((guruji) => (
                  <div
                    key={guruji.id}
                    onClick={() => setSelectedGuruji(guruji)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                      selectedGuruji?.id === guruji.id
                        ? 'bg-[#EDE3D1] border-[#5A1717] ring-2 ring-[#5A1717]/20 shadow-sm'
                        : 'bg-white border-stone-200 hover:bg-amber-50/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={guruji.avatar}
                        alt={guruji.name}
                        className="w-13 h-13 rounded-full object-cover border-2 border-[#B88935]/40 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <div className="text-sm font-bold text-[#211D19]">{guruji.name}</div>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-semibold border border-emerald-300">
                            Verified
                          </span>
                        </div>
                        <div className="text-xs font-sanskrit text-[#5A1717] font-semibold">
                          {guruji.titleNative}
                        </div>
                        <div className="text-[11px] text-stone-500 mt-0.5">
                          {guruji.experienceYears}+ Years Exp • Languages: {guruji.languages.slice(0, 3).join(', ')}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs font-bold text-amber-700">★ {guruji.rating}</div>
                      <div className="text-[10px] text-stone-500">({guruji.reviewCount} Reviews)</div>
                      {selectedGuruji?.id === guruji.id && (
                        <div className="mt-1 w-5 h-5 rounded-full bg-[#5A1717] text-white flex items-center justify-center text-xs ml-auto">
                          ✓
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Yajman Details */}
          {currentStep === 4 && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-base sm:text-lg font-bold font-heading text-[#5A1717]">
                  Yajman & Sankalp Details
                </h3>
                <button
                  type="button"
                  onClick={handleDemoFillYajman}
                  className="text-[11px] font-semibold text-[#5A1717] hover:text-[#B88935] bg-amber-100/70 hover:bg-amber-200/80 px-2.5 py-1 rounded-full border border-amber-300/60 transition-colors flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-[#C56A18]" />
                  <span>Auto-fill Sample Data</span>
                </button>
              </div>
              <p className="text-xs text-stone-600 mb-3.5">
                Please enter devotee information for the sacred Sankalp recitation before Lord Trimbakeshwar.
              </p>

              {stepError && (
                <div className="mb-3 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{stepError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-bold text-stone-700 uppercase mb-1">
                    Primary Yajman Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Ramchandra Joshi"
                    value={yajmanData.name}
                    onChange={(e) => {
                      setYajmanData({ ...yajmanData, name: e.target.value });
                      if (stepError) setStepError(null);
                    }}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#B88935]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 uppercase mb-1">
                    WhatsApp / Mobile Number * (for OTP)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-stone-500 font-semibold">+91</span>
                    <input
                      type="tel"
                      required
                      placeholder="98XXXXXXXX"
                      value={yajmanData.phone}
                      onChange={(e) => {
                        setYajmanData({ ...yajmanData, phone: e.target.value });
                        if (stepError) setStepError(null);
                      }}
                      className="w-full pl-11 pr-3 p-2.5 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#B88935]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 uppercase mb-1">
                    City / Native Place
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Pune, Maharashtra"
                    value={yajmanData.city}
                    onChange={(e) => setYajmanData({ ...yajmanData, city: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#B88935]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 uppercase mb-1">
                    Family Gotra (गोत्र)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Kashyap / Vashistha / Shiva Gotra"
                    value={yajmanData.gotra}
                    onChange={(e) => setYajmanData({ ...yajmanData, gotra: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#B88935]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 uppercase mb-1">
                    Attending Family Members
                  </label>
                  <select
                    value={yajmanData.familyMembers}
                    onChange={(e) => setYajmanData({ ...yajmanData, familyMembers: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white focus:outline-none"
                  >
                    <option value="1">1 Person (Single Yajman)</option>
                    <option value="2">2 Persons (Yajman & Dampati)</option>
                    <option value="3-4">3 to 4 Family Members</option>
                    <option value="5+">5+ Family Members</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 uppercase mb-1">
                    Preferred Language for Vidhi
                  </label>
                  <select
                    value={yajmanData.language}
                    onChange={(e) => setYajmanData({ ...yajmanData, language: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white focus:outline-none"
                  >
                    <option value="Marathi">मराठी (Marathi)</option>
                    <option value="Hindi">हिंदी (Hindi)</option>
                    <option value="Gujarati">ગુજરાતી (Gujarati)</option>
                    <option value="English">English</option>
                    <option value="Telugu">తెలుగు (Telugu)</option>
                    <option value="Kannada">ಕನ್ನಡ (Kannada)</option>
                  </select>
                </div>
              </div>

              <div className="mt-3">
                <label className="block font-bold text-stone-700 uppercase mb-1 text-xs">
                  Special Sankalp Intentions / Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Peace of ancestors, health prayers for parents, or specific dates..."
                  value={yajmanData.specialNotes}
                  onChange={(e) => setYajmanData({ ...yajmanData, specialNotes: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-300 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[#B88935]"
                ></textarea>
              </div>

              <div className="mt-3 p-3 rounded-xl bg-[#EDE3D1]/60 border border-[#B88935]/25 flex items-start gap-2 text-xs text-stone-700">
                <ShieldCheck className="w-4 h-4 text-[#5A1717] shrink-0 mt-0.5" />
                <span>
                  Next step requires <strong>Mobile OTP Verification</strong> to authenticate your phone number,
                  followed by the official <strong>₹500 Advance Booking Token payment</strong>.
                </span>
              </div>
            </div>
          )}

          {/* STEP 5: Mobile OTP Verification (NEW) */}
          {currentStep === 5 && (
            <div className="py-2">
              <div className="text-center max-w-md mx-auto">
                <div className="w-14 h-14 rounded-full bg-amber-100 border-2 border-[#B88935]/40 text-[#5A1717] flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <Smartphone className="w-7 h-7 text-[#5A1717]" />
                </div>

                <div className="text-[11px] font-bold uppercase tracking-widest text-[#C56A18]">
                  सुरक्षित मोबाईल पडताळणी
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-sanskrit text-[#5A1717] mt-0.5 mb-1.5">
                  Verify Mobile Number (OTP)
                </h3>
                <p className="text-xs text-stone-600 mb-4">
                  We have sent a 4-digit verification code to{' '}
                  <span className="font-bold text-stone-900">+91 {yajmanData.phone || '98XXXXXXXX'}</span>.
                </p>

                {/* Demo Helper Button */}
                <div className="mb-4 inline-flex items-center gap-2 bg-amber-50 border border-amber-300/80 rounded-full px-3 py-1 text-xs">
                  <span className="text-amber-800 font-medium">Demo Testing OTP: <strong>1234</strong></span>
                  <button
                    type="button"
                    onClick={handleAutoFillDemoOtp}
                    className="bg-[#5A1717] hover:bg-[#701D1D] text-white text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors"
                  >
                    Auto-fill 1234
                  </button>
                </div>

                {/* 4 Digit Boxes */}
                <div className="flex justify-center items-center gap-3 mb-4" onPaste={handleOtpPaste}>
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => {
                        otpInputRefs.current[idx] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className={`w-12 h-14 text-center text-2xl font-bold rounded-2xl border-2 transition-all ${
                        digit
                          ? 'border-[#5A1717] bg-white text-[#5A1717] ring-2 ring-[#5A1717]/10'
                          : 'border-stone-300 bg-white text-stone-800 focus:border-[#B88935] focus:ring-2 focus:ring-[#B88935]/20'
                      }`}
                    />
                  ))}
                </div>

                {otpError && (
                  <div className="text-xs text-red-600 font-medium mb-3 flex items-center justify-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{otpError}</span>
                  </div>
                )}

                {isOtpVerified && (
                  <div className="text-xs text-emerald-700 font-bold mb-3 flex items-center justify-center gap-1.5 bg-emerald-50 py-1.5 px-3 rounded-full border border-emerald-200 mx-auto w-fit">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Mobile Number +91 {yajmanData.phone} Verified!</span>
                  </div>
                )}

                {/* Resend & Change Number Actions */}
                <div className="flex items-center justify-center gap-4 text-xs text-stone-600 mt-2 mb-2">
                  {canResendOtp ? (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="text-[#5A1717] font-bold hover:underline flex items-center gap-1"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Resend OTP via SMS</span>
                    </button>
                  ) : (
                    <span className="text-stone-500">
                      Resend code in <strong className="font-mono text-stone-800">{otpTimer}s</strong>
                    </span>
                  )}

                  <span className="text-stone-300">•</span>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="text-[#C56A18] font-semibold hover:underline"
                  >
                    Edit Phone Number
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: Advance Booking Payment Modal (₹500 Fee) (NEW) */}
          {currentStep === 6 && (
            <div>
              {/* Fee Notice Banner */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-100/90 via-[#EDE3D1] to-amber-100/70 border-2 border-[#B88935]/50 mb-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-[#5A1717] text-amber-300 flex items-center justify-center font-bold text-lg shrink-0">
                      ₹
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-stone-600 block">
                        Official Advance Booking Token
                      </span>
                      <div className="text-lg sm:text-xl font-bold text-[#5A1717] font-heading">
                        Pay ₹500.00 Advance Deposit
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full">
                      100% Deductible
                    </span>
                    <div className="text-[11px] text-stone-600 mt-1">Adjusted in final Dakshina</div>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-[#B88935]/25 text-[11px] text-stone-700 flex items-start gap-1.5">
                  <Info className="w-3.5 h-3.5 text-[#C56A18] shrink-0 mt-0.5" />
                  <span>
                    The ₹500 advance fee registers your Sankalp in the Kshetra Purohit ledger and reserves Guruji’s
                    calendar for your selected muhurat. Remaining Dakshina is payable directly after the vidhi.
                  </span>
                </div>
              </div>

              {/* Order Summary Pill */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-white rounded-xl border border-stone-200 text-xs mb-4">
                <div>
                  <span className="text-stone-500 text-[10px] block uppercase">Vidhi</span>
                  <span className="font-bold text-[#211D19] line-clamp-1">{selectedVidhi?.name}</span>
                </div>
                <div>
                  <span className="text-stone-500 text-[10px] block uppercase">Purohit</span>
                  <span className="font-bold text-[#5A1717] line-clamp-1">{selectedGuruji?.name}</span>
                </div>
                <div>
                  <span className="text-stone-500 text-[10px] block uppercase">Date</span>
                  <span className="font-semibold text-stone-800">{selectedDate}</span>
                </div>
                <div>
                  <span className="text-stone-500 text-[10px] block uppercase">Advance Token</span>
                  <span className="font-bold text-emerald-700">₹500.00 (Due Now)</span>
                </div>
              </div>

              {/* Payment Method Selector Tabs */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Select Payment Method (UPI, QR, Card, Net Banking)
                </label>
                <div className="grid grid-cols-4 gap-2 mb-4 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('qr')}
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === 'qr'
                        ? 'bg-[#5A1717] text-white border-[#5A1717] shadow-sm'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-amber-50/50'
                    }`}
                  >
                    <QrCode className="w-4 h-4" />
                    <span>Scan QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === 'upi'
                        ? 'bg-[#5A1717] text-white border-[#5A1717] shadow-sm'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-amber-50/50'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>UPI / Apps</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-[#5A1717] text-white border-[#5A1717] shadow-sm'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-amber-50/50'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Cards</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === 'netbanking'
                        ? 'bg-[#5A1717] text-white border-[#5A1717] shadow-sm'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-amber-50/50'
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Net Banking</span>
                  </button>
                </div>

                {/* TAB 1: Scan & Pay QR Code */}
                {paymentMethod === 'qr' && (
                  <div className="p-4 bg-white rounded-2xl border border-stone-200 text-center">
                    <div className="flex items-center justify-between pb-2 border-b border-stone-100 mb-3 text-xs">
                      <span className="text-stone-500 font-medium">Scan with any UPI App</span>
                      <span className="font-mono text-[#5A1717] font-bold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Expires in {formatSeconds(qrSecondsLeft)}</span>
                      </span>
                    </div>

                    {/* Styled High-res SVG QR Code */}
                    <div className="w-44 h-44 mx-auto p-2 bg-white rounded-2xl border-2 border-[#B88935]/40 shadow-inner flex flex-col items-center justify-center relative">
                      <svg viewBox="0 0 160 160" className="w-full h-full">
                        {/* Outer QR Mock Matrix */}
                        <rect width="160" height="160" fill="#FFFFFF" />
                        {/* Top-Left Finder */}
                        <rect x="10" y="10" width="36" height="36" fill="#211D19" rx="4" />
                        <rect x="16" y="16" width="24" height="24" fill="#FFFFFF" rx="2" />
                        <rect x="22" y="22" width="12" height="12" fill="#5A1717" rx="1" />

                        {/* Top-Right Finder */}
                        <rect x="114" y="10" width="36" height="36" fill="#211D19" rx="4" />
                        <rect x="120" y="16" width="24" height="24" fill="#FFFFFF" rx="2" />
                        <rect x="126" y="22" width="12" height="12" fill="#5A1717" rx="1" />

                        {/* Bottom-Left Finder */}
                        <rect x="10" y="114" width="36" height="36" fill="#211D19" rx="4" />
                        <rect x="16" y="120" width="24" height="24" fill="#FFFFFF" rx="2" />
                        <rect x="22" y="126" width="12" height="12" fill="#5A1717" rx="1" />

                        {/* QR Data Patterns */}
                        <g fill="#211D19">
                          <rect x="54" y="14" width="8" height="8" />
                          <rect x="70" y="14" width="8" height="8" />
                          <rect x="86" y="14" width="8" height="8" />
                          <rect x="98" y="22" width="8" height="8" />
                          <rect x="54" y="30" width="8" height="8" />
                          <rect x="78" y="30" width="8" height="8" />

                          <rect x="14" y="54" width="8" height="8" />
                          <rect x="30" y="54" width="8" height="8" />
                          <rect x="42" y="54" width="8" height="8" />
                          <rect x="54" y="54" width="8" height="8" />
                          <rect x="98" y="54" width="8" height="8" />
                          <rect x="114" y="54" width="8" height="8" />
                          <rect x="138" y="54" width="8" height="8" />

                          <rect x="14" y="70" width="8" height="8" />
                          <rect x="38" y="70" width="8" height="8" />
                          <rect x="54" y="70" width="8" height="8" />
                          <rect x="98" y="70" width="8" height="8" />
                          <rect x="122" y="70" width="8" height="8" />

                          <rect x="14" y="86" width="8" height="8" />
                          <rect x="30" y="86" width="8" height="8" />
                          <rect x="54" y="86" width="8" height="8" />
                          <rect x="70" y="86" width="8" height="8" />
                          <rect x="98" y="86" width="8" height="8" />
                          <rect x="114" y="86" width="8" height="8" />
                          <rect x="138" y="86" width="8" height="8" />

                          <rect x="54" y="102" width="8" height="8" />
                          <rect x="78" y="102" width="8" height="8" />
                          <rect x="98" y="102" width="8" height="8" />
                          <rect x="122" y="102" width="8" height="8" />

                          <rect x="54" y="118" width="8" height="8" />
                          <rect x="70" y="118" width="8" height="8" />
                          <rect x="98" y="118" width="8" height="8" />
                          <rect x="138" y="118" width="8" height="8" />

                          <rect x="54" y="138" width="8" height="8" />
                          <rect x="86" y="138" width="8" height="8" />
                          <rect x="114" y="138" width="8" height="8" />
                        </g>

                        {/* Central Shiva Emblem */}
                        <rect x="64" y="64" width="32" height="32" fill="#5A1717" rx="8" />
                        <circle cx="80" cy="80" r="12" fill="#B88935" />
                        <path
                          d="M80 72v16M74 76h12M76 84h8"
                          stroke="#FFFFFF"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>

                    <div className="mt-3">
                      <div className="text-sm font-bold text-[#5A1717]">₹500.00 Advance Booking Fee</div>
                      <div className="text-[11px] text-stone-500 font-mono mt-0.5">
                        UPI ID: trimbak.purohitseva@sbi
                      </div>
                    </div>

                    {/* Supported Apps Badges */}
                    <div className="flex items-center justify-center gap-2 mt-3 text-[10px] font-semibold text-stone-600">
                      <span className="px-2 py-0.5 rounded bg-stone-100 border border-stone-200">Google Pay</span>
                      <span className="px-2 py-0.5 rounded bg-stone-100 border border-stone-200">PhonePe</span>
                      <span className="px-2 py-0.5 rounded bg-stone-100 border border-stone-200">Paytm</span>
                      <span className="px-2 py-0.5 rounded bg-stone-100 border border-stone-200">BHIM UPI</span>
                    </div>
                  </div>
                )}

                {/* TAB 2: UPI Apps / ID */}
                {paymentMethod === 'upi' && (
                  <div className="p-4 bg-white rounded-2xl border border-stone-200 space-y-3.5">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase mb-1.5">
                        Popular UPI Apps (Direct App Request)
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {['Google Pay', 'PhonePe', 'Paytm', 'BHIM / Cred'].map((app) => (
                          <button
                            key={app}
                            type="button"
                            onClick={() => setUpiIdInput(`${yajmanData.phone || 'devotee'}@${app.toLowerCase().slice(0, 4)}`)}
                            className="p-2 rounded-xl border border-stone-200 hover:border-[#B88935] hover:bg-amber-50/50 text-xs font-medium text-stone-800 flex items-center justify-center gap-1.5"
                          >
                            <span>{app}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                        Or Enter Devotee UPI ID
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="e.g. mobileNumber@oksbi / username@upi"
                          value={upiIdInput}
                          onChange={(e) => setUpiIdInput(e.target.value)}
                          className="flex-1 p-2.5 rounded-xl border border-stone-300 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[#B88935]"
                        />
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {['@oksbi', '@okhdfcbank', '@okaxis', '@paytm', '@ybl'].map((sfx) => (
                          <button
                            key={sfx}
                            type="button"
                            onClick={() => {
                              const base = upiIdInput.split('@')[0] || (yajmanData.phone || 'user');
                              setUpiIdInput(`${base}${sfx}`);
                            }}
                            className="text-[10px] bg-stone-100 hover:bg-stone-200 text-stone-700 px-2 py-0.5 rounded-md font-mono"
                          >
                            {sfx}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: Credit / Debit Card */}
                {paymentMethod === 'card' && (
                  <div className="p-4 bg-white rounded-2xl border border-stone-200 space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                        Card Number (16 Digits)
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="4532 •••• •••• 8901"
                          value={cardData.number}
                          onChange={handleCardNumberChange}
                          className="w-full p-2.5 pr-20 rounded-xl border border-stone-300 bg-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#B88935]"
                        />
                        <div className="absolute right-2.5 top-2.5 flex items-center gap-1 text-[10px] font-bold text-stone-400">
                          <span>RuPay</span>
                          <span>Visa</span>
                          <span>MC</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                        Cardholder Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="Name as printed on card"
                        value={cardData.name || yajmanData.name}
                        onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-stone-300 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[#B88935]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                          Expiry (MM/YY)
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          maxLength={5}
                          value={cardData.expiry}
                          onChange={handleCardExpiryChange}
                          className="w-full p-2.5 rounded-xl border border-stone-300 bg-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#B88935]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                          CVV / CVC (3 Digits)
                        </label>
                        <input
                          type="password"
                          placeholder="•••"
                          maxLength={3}
                          value={cardData.cvv}
                          onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, '') })}
                          className="w-full p-2.5 rounded-xl border border-stone-300 bg-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#B88935]"
                        />
                      </div>
                    </div>

                    <div className="pt-1 flex items-center gap-1 text-[11px] text-stone-500">
                      <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>256-bit encrypted bank connection compliant with RBI tokenization rules.</span>
                    </div>
                  </div>
                )}

                {/* TAB 4: Net Banking */}
                {paymentMethod === 'netbanking' && (
                  <div className="p-4 bg-white rounded-2xl border border-stone-200 space-y-3">
                    <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                      Select Your Bank
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                      {[
                        { id: 'sbi', name: 'State Bank of India' },
                        { id: 'hdfc', name: 'HDFC Bank' },
                        { id: 'icici', name: 'ICICI Bank' },
                        { id: 'axis', name: 'Axis Bank' },
                        { id: 'kotak', name: 'Kotak Mahindra' },
                        { id: 'bob', name: 'Bank of Baroda' },
                      ].map((bank) => (
                        <div
                          key={bank.id}
                          onClick={() => setSelectedBank(bank.id)}
                          className={`p-2.5 rounded-xl border cursor-pointer font-medium transition-all ${
                            selectedBank === bank.id
                              ? 'bg-[#EDE3D1] border-[#5A1717] text-[#5A1717] font-bold ring-1 ring-[#5A1717]'
                              : 'bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-700'
                          }`}
                        >
                          {bank.name}
                        </div>
                      ))}
                    </div>

                    <div className="mt-2">
                      <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                        All Other Indian Banks (40+ Banks)
                      </label>
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-stone-300 bg-white text-xs focus:outline-none"
                      >
                        <option value="pnb">Punjab National Bank</option>
                        <option value="canara">Canara Bank</option>
                        <option value="union">Union Bank of India</option>
                        <option value="idbi">IDBI Bank</option>
                        <option value="yes">Yes Bank</option>
                        <option value="indusind">IndusInd Bank</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 7: Booking Confirmed / Digital Sankalp Pass */}
          {bookingConfirmed && (
            <div className="text-center py-1">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500 text-emerald-700 flex items-center justify-center mx-auto mb-2 text-2xl shadow-sm animate-in zoom-in-75">
                ✓
              </div>

              <span className="text-xs font-bold uppercase tracking-widest text-[#C56A18] font-sans">
                ॥ ॐ नमः शिवाय ॥
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-sanskrit text-[#5A1717] mt-0.5 mb-1">
                पूजा संकल्प व टोकन पुष्टी यशस्वी!
              </h3>
              <p className="text-xs text-stone-600 max-w-md mx-auto mb-4">
                Your Puja booking and ₹500 advance deposit have been confirmed. An official Sankalp pass has been generated.
              </p>

              {/* Printable / Savable Pass Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-[#EDE3D1]/80 to-[#F5EEE0] border-2 border-[#B88935]/50 text-left max-w-lg mx-auto shadow-lg relative overflow-hidden">
                {/* Background Watermark Om */}
                <div className="absolute right-[-20px] bottom-[-20px] opacity-5 pointer-events-none">
                  <OmSymbol className="w-64 h-64 text-[#5A1717]" />
                </div>

                {/* Card Top Strip */}
                <div className="flex items-center justify-between pb-3 border-b border-[#B88935]/30 mb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-500 block">Booking Reference</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-base font-bold font-mono text-[#5A1717]">{bookingRefId}</span>
                      <button
                        type="button"
                        onClick={handleCopyReference}
                        className="p-1 text-stone-500 hover:text-stone-800"
                        title="Copy Reference"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      {copiedRef && <span className="text-[10px] text-emerald-700 font-bold">Copied!</span>}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-stone-500 block">Token Status</span>
                    <div className="text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                      <BadgeCheck className="w-3.5 h-3.5" />
                      <span>₹500 PAID</span>
                    </div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center py-0.5 border-b border-stone-200/50">
                    <span className="text-stone-600">Vidhi / Ritual:</span>
                    <span className="font-bold text-[#211D19]">{selectedVidhi?.name}</span>
                  </div>

                  <div className="flex justify-between items-center py-0.5 border-b border-stone-200/50">
                    <span className="text-stone-600">Appointed Purohit:</span>
                    <div className="text-right">
                      <span className="font-bold text-[#5A1717]">{selectedGuruji?.name}</span>
                      <div className="text-[10px] text-stone-500">{selectedGuruji?.titleNative}</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-0.5 border-b border-stone-200/50">
                    <span className="text-stone-600">Scheduled Date:</span>
                    <span className="font-bold text-stone-800">{selectedDate}</span>
                  </div>

                  <div className="flex justify-between items-center py-0.5 border-b border-stone-200/50">
                    <span className="text-stone-600">Muhurat Slot:</span>
                    <span className="font-medium text-stone-800 text-[11px]">{selectedTimeSlot}</span>
                  </div>

                  <div className="flex justify-between items-center py-0.5 border-b border-stone-200/50">
                    <span className="text-stone-600">Primary Devotee (Yajman):</span>
                    <span className="font-bold text-stone-800">
                      {yajmanData.name || 'Respected Devotee'} ({yajmanData.gotra || 'Kashyap Gotra'})
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-0.5 border-b border-stone-200/50">
                    <span className="text-stone-600">Transaction ID:</span>
                    <span className="font-mono text-[11px] text-stone-700">{transactionId}</span>
                  </div>

                  <div className="flex justify-between items-center py-0.5 border-b border-stone-200/50">
                    <span className="text-stone-600">Reporting Venue:</span>
                    <span className="font-semibold text-stone-800">Kushavarta Kund Ghat & Mandir Gate 2</span>
                  </div>
                </div>

                {/* Important Devotee Advice */}
                <div className="mt-3 pt-2.5 border-t border-[#B88935]/30 text-[11px] text-stone-600 space-y-1">
                  <div className="flex items-center gap-1.5 text-[#5A1717] font-semibold">
                    <span>🕉️</span>
                    <span>Traditional Dress Code: Dhoti / Kurta for Men, Saree for Women.</span>
                  </div>
                  <div className="text-[10px] text-stone-500">
                    Guruji will contact you on WhatsApp <strong>+91 {yajmanData.phone}</strong> 24 hours prior with fasting rules.
                  </div>
                </div>
              </div>

              {/* Pass Actions: Print, WhatsApp, Close */}
              <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-4 py-2 rounded-xl bg-white border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Pass</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppShare}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share on WhatsApp</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="p-3.5 sm:p-5 bg-white border-t border-stone-200 flex items-center justify-between">
          {!bookingConfirmed ? (
            <>
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              ) : (
                <div></div>
              )}

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-2 text-xs font-semibold text-stone-500 hover:text-stone-700"
                >
                  Cancel
                </button>

                {/* Next / Action Buttons per Step */}
                {currentStep < 4 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => prev + 1)}
                    className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#5A1717] to-[#C56A18] hover:from-[#6D1B1B] hover:to-[#B88935] shadow-md flex items-center gap-1.5 transition-all"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                {currentStep === 4 && (
                  <button
                    type="button"
                    onClick={handleProceedToOtp}
                    className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#5A1717] to-[#C56A18] hover:from-[#6D1B1B] hover:to-[#B88935] shadow-md flex items-center gap-1.5 transition-all"
                  >
                    <span>Verify Mobile (OTP)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                {currentStep === 5 && (
                  <button
                    type="button"
                    onClick={handleVerifyOtpAndProceed}
                    className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-emerald-700 to-emerald-600 hover:from-emerald-800 hover:to-emerald-700 shadow-md flex items-center gap-1.5 transition-all"
                  >
                    <Check className="w-4 h-4" />
                    <span>Verify & Pay ₹500</span>
                  </button>
                )}

                {currentStep === 6 && (
                  <button
                    type="button"
                    onClick={handleExecutePayment}
                    disabled={isProcessingPayment}
                    className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#5A1717] via-[#7B1F1F] to-[#C56A18] hover:from-[#6D1B1B] hover:to-[#B88935] shadow-md flex items-center gap-2 transition-all disabled:opacity-75"
                  >
                    {isProcessingPayment ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>{paymentStepText}</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5" />
                        <span>Pay ₹500 & Confirm Booking</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="w-full flex items-center justify-between">
              <span className="text-xs text-stone-500 font-sanskrit">॥ हर हर महादेव ॥</span>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#5A1717] hover:bg-[#6D1B1B] shadow-md transition-colors"
              >
                Close & Return
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
