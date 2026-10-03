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
  Mail,
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
  Upload,
  Image as ImageIcon,
  Eye,
  FileCheck,
  Hourglass,
} from 'lucide-react';
import { TrishulIcon, DivyaSparkleIcon, OmSymbol } from './Motifs';
import { submitPoojaBooking, sendOtpApi, verifyOtpApi } from '../services/enquiryService';
import { getTempleUpiConfig, UPI_CONFIG_UPDATED_EVENT, TempleUpiConfig } from '../services/templePaymentConfig';
import { trackEvent } from '../utils/analytics';

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
  // 5: Email OTP Verification
  // 6: Advance Booking Payment (₹1,000)
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
    state: 'Maharashtra',
    address: '',
    gotra: '',
    familyMembers: '2',
    language: 'Marathi',
    poojaVenue: '',
    customPoojaAddress: '',
    specialNotes: '',
  });

  // Validation Error
  const [stepError, setStepError] = useState<string | null>(null);

  // OTP State (6-Digit Cryptographic Temple Authentication)
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState<number>(60);
  const [canResendOtp, setCanResendOtp] = useState<boolean>(false);
  const [isOtpVerified, setIsOtpVerified] = useState<boolean>(false);
  const [isSendingOtp, setIsSendingOtp] = useState<boolean>(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState<boolean>(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [maskedEmail, setMaskedEmail] = useState<string>('');
  const [otpMessage, setOtpMessage] = useState<string | null>(null);
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'qr' | 'upi' | 'card' | 'netbanking'>('qr');
  const [paymentApp, setPaymentApp] = useState<string>('Google Pay');
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
  // UPI Proof & Screenshot Verification State
  const [utrInput, setUtrInput] = useState<string>('');
  const [paymentScreenshot, setPaymentScreenshot] = useState<string | null>(null);
  const [screenshotFileName, setScreenshotFileName] = useState<string | null>(null);
  const [screenshotFileSize, setScreenshotFileSize] = useState<string | null>(null);
  const [paymentValidationError, setPaymentValidationError] = useState<string | null>(null);
  const [showEnlargedScreenshot, setShowEnlargedScreenshot] = useState<boolean>(false);
  const [copiedUpiId, setCopiedUpiId] = useState<boolean>(false);
  const [bookingStatus, setBookingStatus] = useState<'pending_verification' | 'verified'>('pending_verification');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Confirmation Details
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);
  const [bookingRefId, setBookingRefId] = useState<string>('');
  const [transactionId, setTransactionId] = useState<string>('');
  const [paymentTime, setPaymentTime] = useState<string>('');
  const [copiedRef, setCopiedRef] = useState<boolean>(false);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  // Dynamic Temple UPI & QR Configuration
  const [templeUpi, setTempleUpi] = useState<TempleUpiConfig>(getTempleUpiConfig());

  useEffect(() => {
    const handleUpiUpdate = (e: any) => {
      setTempleUpi(e.detail || getTempleUpiConfig());
    };
    window.addEventListener(UPI_CONFIG_UPDATED_EVENT, handleUpiUpdate);
    return () => window.removeEventListener(UPI_CONFIG_UPDATED_EVENT, handleUpiUpdate);
  }, []);

  // Reset scroll to top on every step transition
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [currentStep, bookingConfirmed]);

  // Initialize initial vidhi, guruji & default date
  useEffect(() => {
    if (isOpen) {
      if (initialVidhiId) {
        const vidhi = PUJA_LIST.find((p) => p.id === initialVidhiId || p.slug === initialVidhiId);
        if (vidhi) setSelectedVidhi(vidhi);
      } else if (!selectedVidhi && PUJA_LIST.length > 0) {
        setSelectedVidhi(PUJA_LIST[0]);
      }

      if (initialGurujiId) {
        const guruji = GURUJI_LIST.find((g) => g.id === initialGurujiId);
        if (guruji) setSelectedGuruji(guruji);
      } else if (GURUJI_LIST.length > 0) {
        setSelectedGuruji(GURUJI_LIST[0]);
      }

      // Default auspicious date (3 days from now)
      const today = new Date();
      today.setDate(today.getDate() + 3);
      setSelectedDate(today.toISOString().split('T')[0]);

      if (bookingConfirmed) {
        setBookingConfirmed(false);
        setCurrentStep(1);
        setIsOtpVerified(false);
        setIsProcessingPayment(false);
        setStepError(null);
      }
    }
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

  if (!isOpen) return null;

  // Handle Step 4 -> Step 5 (Validation & Real Email OTP Trigger)
  const handleProceedToOtp = async () => {
    if (!yajmanData.name.trim() || yajmanData.name.trim().length < 3) {
      setStepError('Please enter Primary Yajman Full Name (at least 3 characters).');
      return;
    }
    const cleanPhone = yajmanData.phone.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setStepError('Please enter a valid 10-digit WhatsApp / Mobile number.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!yajmanData.email.trim() || !emailRegex.test(yajmanData.email.trim())) {
      setStepError('Please enter a valid Email Address to receive the authentic OTP verification code.');
      return;
    }

    setStepError(null);
    setIsSendingOtp(true);
    setOtpDigits(['', '', '', '', '', '']);
    setOtpError(null);
    setIsOtpVerified(false);
    setRemainingAttempts(null);

    try {
      const res = await sendOtpApi({
        email: yajmanData.email.trim(),
        devoteeName: yajmanData.name.trim(),
        poojaType: selectedVidhi?.name || 'Vedic Vidhi Puja',
        purpose: 'BOOKING_SUBMIT',
      });

      if (res.success) {
        setMaskedEmail(res.maskedEmail || yajmanData.email.trim());
        setOtpTimer(60);
        setCanResendOtp(false);
        setOtpMessage(res.message);
        setCurrentStep(5);
        setTimeout(() => {
          otpInputRefs.current[0]?.focus();
        }, 150);
      } else {
        setStepError(res.message || 'Failed to dispatch verification code to email.');
      }
    } catch (err) {
      setStepError('Unable to connect to verification server. Please check your network connection.');
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Perform authentic OTP verification against backend
  const performOtpVerification = async (code: string) => {
    if (!code || code.length < 6) {
      setOtpError('Please enter the complete 6-digit verification code.');
      return;
    }

    setIsVerifyingOtp(true);
    setOtpError(null);

    try {
      const res = await verifyOtpApi({
        email: yajmanData.email.trim(),
        otp: code,
      });

      if (res.success) {
        setIsOtpVerified(true);
        setOtpError(null);
        setRemainingAttempts(null);
        setOtpMessage(res.message);

        // Smooth transition to Payment Step 6 after visual confirmation
        setTimeout(() => {
          setCurrentStep(6);
        }, 500);
      } else {
        setIsOtpVerified(false);
        setOtpError(res.message || 'Incorrect OTP code entered. Please check your inbox.');
        if (typeof res.remainingAttempts === 'number') {
          setRemainingAttempts(res.remainingAttempts);
        }
      }
    } catch (err) {
      setIsOtpVerified(false);
      setOtpError('Error communicating with verification server. Please try again.');
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  // Handle OTP digit changes across 6 boxes
  const handleOtpChange = (index: number, val: string) => {
    const char = val.slice(-1);
    if (char && !/^[0-9]$/.test(char)) return;

    const newDigits = [...otpDigits];
    newDigits[index] = char;
    setOtpDigits(newDigits);
    setOtpError(null);

    // Auto-advance to next box
    if (char && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }

    // If 6 digits filled, automatically verify
    if (char && index === 5) {
      const full = newDigits.join('');
      if (full.length === 6) {
        performOtpVerification(full);
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!otpDigits[index] && index > 0) {
        otpInputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
    if (!pasted) return;
    const newDigits = ['', '', '', '', '', ''];
    for (let i = 0; i < pasted.length; i++) {
      newDigits[i] = pasted[i];
    }
    setOtpDigits(newDigits);
    if (pasted.length === 6) {
      setOtpError(null);
      performOtpVerification(pasted);
    } else {
      const nextIndex = Math.min(pasted.length, 5);
      otpInputRefs.current[nextIndex]?.focus();
    }
  };

  const handleVerifyOtpAndProceed = () => {
    const entered = otpDigits.join('');
    performOtpVerification(entered);
  };

  const handleResendOtp = async () => {
    setIsSendingOtp(true);
    setOtpDigits(['', '', '', '', '', '']);
    setOtpError(null);
    setIsOtpVerified(false);
    setRemainingAttempts(null);

    try {
      const res = await sendOtpApi({
        email: yajmanData.email.trim(),
        devoteeName: yajmanData.name.trim(),
        poojaType: selectedVidhi?.name || 'Vedic Vidhi Puja',
        purpose: 'BOOKING_SUBMIT',
      });

      if (res.success) {
        setOtpTimer(60);
        setCanResendOtp(false);
        setOtpMessage(res.message);
        setTimeout(() => {
          otpInputRefs.current[0]?.focus();
        }, 100);
      } else {
        setOtpError(res.message || 'Unable to resend OTP. Please wait before retrying.');
      }
    } catch (err) {
      setOtpError('Error connecting to verification server.');
    } finally {
      setIsSendingOtp(false);
    }
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

  // Generate Authentic High-Res Demo Payment Receipt
  const generateSampleReceipt = (app = paymentApp, utr = utrInput) => {
    const finalUtr = utr || `4290${Math.floor(10000000 + Math.random() * 90000000)}`;
    const now = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="780" viewBox="0 0 600 780" fill="none">
      <rect width="600" height="780" rx="32" fill="#F8F9FA"/>
      <rect x="24" y="24" width="552" height="732" rx="24" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2"/>
      <circle cx="300" cy="115" r="38" fill="#0D9488"/>
      <path d="M284 115 L296 127 L322 101" stroke="#FFFFFF" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="300" y="190" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="800" fill="#0F172A" text-anchor="middle">₹1,000.00</text>
      <text x="300" y="218" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#0D9488" text-anchor="middle">Completed • Paid Successfully</text>
      <line x1="50" y1="248" x2="550" y2="248" stroke="#E2E8F0" stroke-width="1.5" stroke-dasharray="6 6"/>
      <text x="50" y="285" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" fill="#64748B">To Hereditary Vatandar Tirth Purohit</text>
      <text x="50" y="312" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" font-weight="800" fill="#0F172A">Shri Trimbakeshwar Purohit Vatan</text>
      <text x="50" y="336" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#D97706">${templeUpi.payeeName || 'Pt. Atharva Deshmukh / Pt. Pravin Shambhu Deshmukh (Desai)'}</text>
      <text x="50" y="360" font-family="monospace" font-size="13" font-weight="600" fill="#475569">${templeUpi.upiId || 'atharvadeshmukh525-1@oksbi'}</text>
      <line x1="50" y1="385" x2="550" y2="385" stroke="#F1F5F9" stroke-width="1.5"/>
      <text x="50" y="415" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" fill="#64748B">UPI Transaction ID (UTR Number)</text>
      <text x="50" y="440" font-family="monospace" font-size="15" font-weight="800" fill="#0F172A">UPI/${finalUtr}</text>
      <text x="50" y="485" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" fill="#64748B">Payment Application & Mode</text>
      <text x="50" y="510" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#0F172A">${app} • Real-time UPI Transfer</text>
      <text x="50" y="555" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" fill="#64748B">Date & Timestamp</text>
      <text x="50" y="580" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#0F172A">${now}</text>
      <rect x="46" y="618" width="508" height="98" rx="16" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
      <text x="66" y="648" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#0F172A">Advance Token for Puja Booking</text>
      <text x="66" y="670" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#475569">Vidhi: ${selectedVidhi?.name || 'Vedic Pooja'} (${selectedDate})</text>
      <text x="66" y="692" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600" fill="#0D9488">Awaiting Purohit Ledger Reconciliation</text>
    </svg>`;
    return { dataUrl: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`, utr: finalUtr };
  };

  const handleAttachDemoReceipt = () => {
    const demo = generateSampleReceipt(paymentApp, utrInput);
    setPaymentScreenshot(demo.dataUrl);
    setScreenshotFileName('UPI_Receipt_Trimbak_1000.png');
    setScreenshotFileSize('48.5 KB');
    setUtrInput(demo.utr);
    setPaymentValidationError(null);
  };

  const handleScreenshotFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setPaymentValidationError('Please upload a valid image file (JPEG, PNG, or WebP).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setPaymentValidationError('Screenshot file size must be less than 5 MB.');
      return;
    }
    setPaymentValidationError(null);
    setScreenshotFileName(file.name);
    setScreenshotFileSize(`${(file.size / 1024).toFixed(1)} KB`);

    const reader = new FileReader();
    reader.onload = (event) => {
      const rawDataUrl = event.target?.result as string;
      const img = new Image();
      img.onload = () => {
        const maxDim = 1000;
        let w = img.width;
        let h = img.height;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, w, h);
          const compressed = canvas.toDataURL('image/jpeg', 0.82);
          setPaymentScreenshot(compressed);
        } else {
          setPaymentScreenshot(rawDataUrl);
        }
      };
      img.onerror = () => setPaymentScreenshot(rawDataUrl);
      img.src = rawDataUrl;
    };
    reader.readAsDataURL(file);
  };

  // Payment Execution & Backend Lead Registration (Sets Under Verification)
  const handleExecutePayment = async () => {
    if (paymentMethod === 'card' || paymentMethod === 'netbanking') {
      setPaymentMethod('qr');
      setPaymentValidationError('Cards & Net Banking are temporarily unavailable due to banking portal maintenance. Please complete your advance token payment via the authentic Temple UPI QR or any UPI App.');
      return;
    }

    let finalUtr = utrInput.trim();
    let finalScreenshot = paymentScreenshot;

    // Validation for UPI Payment Proof
    if (!finalUtr && !finalScreenshot) {
      setPaymentValidationError('Please enter your 12-digit UPI UTR number and upload your payment screenshot.');
      return;
    }
    if (!finalUtr) {
      setPaymentValidationError('Please enter the UPI Transaction ID / UTR reference number.');
      return;
    }
    if (!finalScreenshot) {
      setPaymentValidationError('Please upload your payment screenshot for admin verification.');
      return;
    }

    setPaymentValidationError(null);
    setIsProcessingPayment(true);
    setPaymentStepText('Submitting booking & UPI receipt to Guruji Ledger for verification...');

    const year = new Date().getFullYear();
    const uniqueSuffix = `${Date.now().toString().slice(-6)}${Math.floor(10 + Math.random() * 90)}`;
    const ref = `TRMB-${year}-${uniqueSuffix}`;
    const now = new Date().toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    const chosenPoojaVenue = yajmanData.poojaVenue === 'Other Custom Location / Griha Pravesh Site' && yajmanData.customPoojaAddress
      ? yajmanData.customPoojaAddress
      : yajmanData.poojaVenue;

    try {
      const apiRes = await submitPoojaBooking({
        devoteeName: yajmanData.name,
        phone: yajmanData.phone,
        email: yajmanData.email,
        gotra: yajmanData.gotra,
        city: yajmanData.city,
        state: yajmanData.state,
        devoteeAddress: yajmanData.address,
        poojaType: selectedVidhi?.name || 'Vedic Vidhi Puja',
        poojaCategory: selectedVidhi?.category,
        scheduledDate: selectedDate,
        timeSlot: selectedTimeSlot,
        location: '',
        poojaAddress: '',
        familyMembersCount: parseInt(yajmanData.familyMembers) || 2,
        advanceAmount: 1000,
        paymentMethod: paymentMethod,
        paymentApp: paymentApp,
        utrNumber: finalUtr,
        paymentScreenshot: finalScreenshot,
        notes: yajmanData.specialNotes || `Appointed Guruji: ${selectedGuruji?.name || 'Pt. Pravin Shambhu Deshmukh (Desai)'}`,
        language: yajmanData.language,
      });

      if (apiRes.leadCode) {
        setBookingRefId(apiRes.leadCode);
      } else {
        setBookingRefId(ref);
      }

      // Track booking completion event in Google Analytics
      trackEvent('complete_pooja_booking', 'booking_conversion', selectedVidhi?.name || 'Vedic Vidhi Puja', 1000);
    } catch (err) {
      console.warn('Booking API error, using fallback reference:', err);
      setBookingRefId(ref);
      trackEvent('complete_pooja_booking_offline', 'booking_conversion', selectedVidhi?.name || 'Vedic Vidhi Puja', 1000);
    }

    setTransactionId(finalUtr);
    setPaymentTime(now);
    setBookingStatus('pending_verification');
    setIsProcessingPayment(false);
    setBookingConfirmed(true);
    setCurrentStep(7);
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
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      window.print();
      return;
    }
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>श्री त्र्यंबकेश्वर पूजा पावती - ${bookingRefId}</title>
        <meta charset="utf-8" />
        <style>
          @media print {
            @page { size: A4; margin: 15mm; }
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          }
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #211D19;
            background: #FFFFFF;
            margin: 0;
            padding: 24px;
          }
          .receipt-container {
            border: 3px double #B88935;
            border-radius: 16px;
            padding: 28px;
            position: relative;
            background: #FDFAF5;
            overflow: hidden;
            box-sizing: border-box;
          }
          .watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 320px;
            height: 320px;
            opacity: 0.085;
            pointer-events: none;
            z-index: 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .watermark img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
          .content {
            position: relative;
            z-index: 1;
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #5A1717;
            padding-bottom: 16px;
            margin-bottom: 20px;
          }
          .header-top {
            font-size: 13px;
            color: #8C6218;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
          }
          .header-title {
            font-size: 24px;
            color: #5A1717;
            font-weight: 800;
            margin: 6px 0 4px;
          }
          .header-sub {
            font-size: 12px;
            color: #4A3E31;
          }
          .badge-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 18px;
            padding: 8px 12px;
            background: #FEF3C7;
            border: 1px solid #F59E0B;
            border-radius: 8px;
          }
          .badge-ref {
            font-family: monospace;
            font-size: 14px;
            font-weight: bold;
            color: #5A1717;
          }
          .badge-status {
            font-size: 12px;
            font-weight: bold;
            color: #92400E;
          }
          .grid {
            display: table;
            width: 100%;
            margin-bottom: 16px;
          }
          .row {
            display: table-row;
          }
          .cell-label {
            display: table-cell;
            width: 38%;
            padding: 6px 8px;
            font-size: 12px;
            color: #555;
            border-bottom: 1px dashed #E5D5BA;
          }
          .cell-val {
            display: table-cell;
            width: 62%;
            padding: 6px 8px;
            font-size: 12px;
            font-weight: bold;
            color: #1A1A1A;
            border-bottom: 1px dashed #E5D5BA;
          }
          .amount-val {
            color: #065F46;
            font-size: 14px;
          }
          .guidelines {
            background: #FFFDF8;
            border: 1px solid #E2D2B5;
            border-radius: 8px;
            padding: 12px 14px;
            margin-top: 16px;
            font-size: 11px;
            color: #4A3E31;
            line-height: 1.6;
          }
          .guidelines-title {
            font-weight: bold;
            color: #5A1717;
            margin-bottom: 4px;
          }
          .footer {
            margin-top: 24px;
            padding-top: 12px;
            border-top: 1px solid #D5C2A5;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            font-size: 10px;
            color: #777;
          }
          .seal-box {
            text-align: right;
          }
          .seal-line {
            font-weight: bold;
            color: #5A1717;
            font-size: 11px;
          }
        </style>
      </head>
      <body>
        <div class="receipt-container">
          <div class="watermark">
            <img src="/assets/purohit-profile-transparent.png" alt="Shri Trimbakeshwar Purohit Sangh Seal" />
          </div>
          <div class="content">
            <div class="header">
              <div class="header-top">॥ श्री क्षेत्र त्र्यम्बकेश्वर ज्योतिर्लिंग तीर्थ पुरोहित कार्यालय ॥</div>
              <div class="header-title">पवित्र पूजा पावती एवं संकल्प पत्र</div>
              <div class="header-sub">Pt. Pravin Shambhu Deshmukh (Desai) / Pt. Atharva Deshmukh · वंशपरंपरागत २५ पिढ्यांचे वतनदार तीर्थ पुरोहित (सन १६७४)</div>
              <div class="header-sub">कुशावर्त तीर्थ कुण्ड, श्री क्षेत्र त्र्यम्बकेश्वर, जि. नाशिक · फोन: +91 96899 73967</div>
            </div>

            <div class="badge-row">
              <div class="badge-ref">Booking Ref: ${bookingRefId}</div>
              <div class="badge-status">Status: Booking Under Verification (पडताळणी प्रलंबित)</div>
            </div>

            <div class="grid">
              <div class="row">
                <div class="cell-label">Primary Devotee (Yajman):</div>
                <div class="cell-val">${yajmanData.name} (${yajmanData.gotra ? yajmanData.gotra + ' Gotra' : 'Kashyap Gotra'})</div>
              </div>
              <div class="row">
                <div class="cell-label">Contact Mobile / WhatsApp:</div>
                <div class="cell-val">+91 ${yajmanData.phone}</div>
              </div>
              <div class="row">
                <div class="cell-label">Devotee Email:</div>
                <div class="cell-val">${yajmanData.email}</div>
              </div>
              <div class="row">
                <div class="cell-label">City & State:</div>
                <div class="cell-val">${yajmanData.city || 'Trimbakeshwar'}, ${yajmanData.state || 'Maharashtra'}</div>
              </div>
              ${yajmanData.address ? `
              <div class="row">
                <div class="cell-label">Client Residential Address:</div>
                <div class="cell-val">${yajmanData.address}</div>
              </div>
              ` : ''}
              <div class="row">
                <div class="cell-label">Persons Present (Family):</div>
                <div class="cell-val">${yajmanData.familyMembers || 2} Persons Attending</div>
              </div>
              <div class="row">
                <div class="cell-label">Sanctified Vidhi / Pooja:</div>
                <div class="cell-val">${selectedVidhi?.name || 'Vedic Vidhi Puja'}</div>
              </div>
              <div class="row">
                <div class="cell-label">Appointed Purohit:</div>
                <div class="cell-val">${selectedGuruji?.name || 'Pt. Pravin Shambhu Deshmukh (Desai)'}</div>
              </div>
              <div class="row">
                <div class="cell-label">Scheduled Date:</div>
                <div class="cell-val">${selectedDate}</div>
              </div>
              <div class="row">
                <div class="cell-label">Muhurat Time Slot:</div>
                <div class="cell-val">${selectedTimeSlot}</div>
              </div>
              <div class="row">
                <div class="cell-label">Advance Token Deposit:</div>
                <div class="cell-val amount-val">₹1,000.00 (Received via ${paymentApp})</div>
              </div>
              <div class="row">
                <div class="cell-label">UPI Transaction ID (UTR):</div>
                <div class="cell-val" style="font-family: monospace;">${transactionId}</div>
              </div>
              ${yajmanData.specialNotes ? `
              <div class="row">
                <div class="cell-label">Devotee Sankalp Notes:</div>
                <div class="cell-val">${yajmanData.specialNotes}</div>
              </div>
              ` : ''}
            </div>

            <div class="guidelines">
              <div class="guidelines-title">पवित्र संकल्प नियम (Vedic Ritual Guidelines):</div>
              <div>• पुरुषों हेतु सोवळे / पांढरे धोतर-कुर्ता तथा महिला हेतु साडी परिधान अनिवार्य आहे.</div>
              <div>• पूजेच्या दिवशी सकाळी कुशावर्त तीर्थ स्नान करून उपवास ठेवावा.</div>
              <div>• Guruji will contact you on WhatsApp (+91 ${yajmanData.phone}) 24 hours prior to ritual with auspicious preparations.</div>
            </div>

            <div class="footer">
              <div>
                <div>Generated on: ${paymentTime || new Date().toLocaleString('en-IN')}</div>
                <div>Official Devotee Ledger Record · Har Har Mahadev!</div>
              </div>
              <div class="seal-box">
                <div class="seal-line">श्री क्षेत्र त्र्यम्बकेश्वर तीर्थ पुरोहित कार्यालय</div>
              </div>
            </div>
          </div>
        </div>
        <script>window.onload = function() { window.print(); }<\/script>
      </body>
      </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
  };

  const handleWhatsAppShare = () => {
    const feeText = `• Vidhi Dakshina: As per mutual discussion with Guruji (₹1,000 Advance Token Paid online to reserve slot)\n`;

    const text = encodeURIComponent(
      `🙏 Shri Trimbakeshwar Jyotirlinga Puja Booking Confirmed!\n\n` +
        `• Booking Ref: ${bookingRefId}\n` +
        `• Transaction ID: ${transactionId} (₹1,000 Advance Paid)\n` +
        `• Vidhi: ${selectedVidhi?.name}\n` +
        `• Appointed Guruji: ${selectedGuruji?.name}\n` +
        `• Date: ${selectedDate} (${selectedTimeSlot})\n` +
        `• Yajman: ${yajmanData.name} (Gotra: ${yajmanData.gotra || 'Kashyap'})\n` +
        `• Devotee Email: ${yajmanData.email}\n` +
        feeText +
        `\n` +
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
    { num: 6, label: 'Pay & Verify' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="bg-[#FBF6EA] text-[#211D19] rounded-3xl w-full max-w-[94vw] sm:w-[780px] md:w-[840px] h-[92vh] max-h-[850px] min-h-[580px] flex flex-col border border-[#B88935]/40 shadow-2xl overflow-hidden relative"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Header */}
        <div className="px-5 py-3.5 sm:px-6 sm:py-4 bg-gradient-to-r from-[#5A1717] via-[#4A1313] to-[#2E0B0B] text-white flex items-center justify-between border-b border-amber-400/20 shadow-md shrink-0">
          <div className="flex items-center gap-3.5 sm:gap-4">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 shrink-0 shadow-inner">
              <TrishulIcon className="w-5 h-5 text-amber-300 shrink-0" />
            </div>
            <div className="flex flex-col gap-0.5 sm:gap-1 justify-center">
              <div className="flex items-center gap-2 text-amber-300 text-[11px] sm:text-xs font-semibold tracking-wider uppercase font-sans">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                <span>Shri Trimbakeshwar Jyotirlinga Seva</span>
              </div>
              <h2 className="text-base sm:text-lg md:text-xl font-bold font-sanskrit text-amber-50 leading-snug tracking-wide">
                {bookingConfirmed
                  ? 'पूजा नोंदणी प्राप्त • पडताळणी प्रलंबित (Under Verification)'
                  : currentStep === 5
                  ? 'ईमेल ओटीपी पडताळणी • Verify Email OTP'
                  : currentStep === 6
                  ? 'ॲडव्हान्स टोकन पेमेंट व पावती • UPI Payment & Receipt'
                  : 'पूजा नोंदणी • Sacred Vidhi Booking'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white transition-colors cursor-pointer shrink-0 ml-2"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Header */}
        {!bookingConfirmed && (
          <div className="bg-[#EDE3D1]/90 px-4 sm:px-6 py-2.5 border-b border-[#B88935]/25 shrink-0">
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
                  {currentStep === 5 && '5/6: Verify Email OTP'}
                  {currentStep === 6 && '6/6: Pay ₹1,000 & Attach Receipt'}
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
        <div
          ref={scrollContainerRef}
          className="p-4 sm:p-6 overflow-y-auto flex-1 font-sans scroll-smooth"
        >
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
              <p className="text-xs text-stone-600 mb-3">
                Select the sacred ritual you wish to observe under the divine presence of Trimbakeshwar Mahadev.
              </p>

              {/* Hereditary Purohit Trust Banner */}
              <div className="mb-4 p-3 rounded-2xl bg-gradient-to-r from-[#EDE3D1] via-amber-50 to-[#EDE3D1]/60 border border-[#B88935]/40 flex items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-3">
                  <img
                    src="/assets/guruji.png"
                    alt="Pt. Pravin Shambhu Deshmukh"
                    className="w-12 h-12 rounded-xl object-cover object-top border-2 border-[#B88935] shrink-0 shadow-xs"
                  />
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-[#5A1717] font-heading leading-tight">
                      Direct Shastric Vidhi by Pt. Pravin Shambhu Deshmukh (Desai)
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-stone-600 font-devanagari mt-0.5">
                      २५ पिढ्यांचे वंशपरंपरागत वतनदार तीर्थ पुरोहित • थेट अधिकृत संकल्प व पूजा
                    </div>
                  </div>
                </div>
                <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300 shrink-0">
                  100% Authorized
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PUJA_LIST.map((puja) => {
                  return (
                    <div
                      key={puja.id}
                      onClick={() => setSelectedVidhi(puja)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all relative overflow-hidden flex flex-col justify-between ${
                        selectedVidhi?.id === puja.id
                          ? 'bg-[#EDE3D1] border-[#5A1717] ring-2 ring-[#5A1717]/20 shadow-sm'
                          : 'bg-white border-stone-200 hover:border-[#B88935]/60 hover:bg-amber-50/40'
                      }`}
                    >
                      <div>
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
                      </div>

                      {/* Fee Badge & Duration */}
                      <div className="mt-3 pt-2 border-t border-stone-200/70 space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-stone-500 font-medium">Duration: {puja.duration}</span>
                          <span className="font-semibold text-stone-700 bg-stone-100 px-2 py-0.5 rounded-md">
                            Dakshina on discussion
                          </span>
                        </div>
                        <div className="text-[10px] text-stone-500 flex items-center justify-between">
                          <span className="text-emerald-700 font-medium">₹1,000 Advance Token</span>
                          <span className="text-stone-400">Samagri Included</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
                <div className="text-right">
                  <span className="text-xs font-bold text-[#5A1717] bg-white px-2.5 py-1 rounded-lg border border-stone-200 block">
                    ₹1,000 Advance Token
                  </span>
                  <span className="text-[10px] text-stone-500">{selectedVidhi?.duration}</span>
                </div>
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
                        : 'Auspicious muhurats are verified by Guruji Pt. Pravin Shambhu Deshmukh (Desai) in accordance with the Panchang.'}
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

          {/* STEP 3: Choose Guruji (Only 1 Guruji: Pt. Pravin Shambhu Deshmukh (Desai)) */}
          {currentStep === 3 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base sm:text-lg font-bold font-heading text-[#5A1717]">
                  Appointed Vedic Guruji
                </h3>
                <span className="text-[11px] text-[#C56A18] font-semibold bg-amber-100/60 px-2 py-0.5 rounded-full border border-amber-300/40">
                  Step 3 of 6
                </span>
              </div>
              <p className="text-xs text-stone-600 mb-4">
                Your ritual will be conducted directly by the authorized hereditary representative Vedic Purohit of Trimbakeshwar Kshetra.
              </p>

              <div className="space-y-4">
                {GURUJI_LIST.map((guruji) => (
                  <div
                    key={guruji.id}
                    onClick={() => setSelectedGuruji(guruji)}
                    className="p-4 sm:p-5 rounded-2xl border-2 border-[#5A1717] bg-[#EDE3D1] ring-2 ring-[#5A1717]/20 shadow-md flex flex-col sm:flex-row items-start gap-4 sm:gap-5 cursor-pointer"
                  >
                    {/* Large Featured Guruji Photo */}
                    <div className="relative shrink-0 mx-auto sm:mx-0 group">
                      <img
                        src={guruji.avatar}
                        alt={guruji.name}
                        className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover object-top border-2 border-[#B88935] shrink-0 shadow-md group-hover:scale-[1.02] transition-transform"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/80 border border-amber-400/50 text-[9px] font-bold text-amber-300 font-devanagari">
                        मुख्य पुरोहित
                      </div>
                      <div className="absolute bottom-1.5 inset-x-1.5 text-center py-0.5 rounded bg-black/75 text-[9px] text-amber-200 border border-amber-400/30">
                        २५ पिढ्यांचे वतनदार
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <div className="text-base sm:text-lg font-bold text-[#5A1717] font-heading leading-snug">
                            {guruji.name}
                          </div>
                          <div className="text-xs font-devanagari text-stone-800 font-semibold mt-0.5">
                            {guruji.titleNative}
                          </div>
                        </div>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-bold border border-emerald-300 inline-flex items-center gap-1 shrink-0">
                          <BadgeCheck className="w-3.5 h-3.5 text-emerald-700" />
                          <span>100% Authorized Purohit</span>
                        </span>
                      </div>

                      <div className="text-[11px] text-stone-700 font-medium mt-1.5 flex flex-wrap items-center gap-2">
                        <span className="text-amber-900 font-bold">{guruji.experienceYears}+ Years Vedic Exp</span>
                        <span>•</span>
                        <span>{guruji.education}</span>
                      </div>

                      <p className="text-[11px] text-stone-600 leading-relaxed mt-2 line-clamp-2">
                        {guruji.bio}
                      </p>

                      <div className="mt-3 pt-2 border-t border-[#B88935]/25 flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="text-[11px] text-[#C56A18] font-medium">
                          Languages: {guruji.languages.join(' • ')}
                        </div>
                        <div className="px-2.5 py-1 rounded-full bg-[#5A1717] text-white text-xs font-semibold flex items-center gap-1">
                          <Check className="w-3 h-3 text-amber-200" />
                          <span>Selected Purohit</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bio & Transparency Box */}
              {selectedGuruji && (
                <div className="mt-4 p-3.5 rounded-2xl bg-white border border-[#B88935]/30 text-xs text-stone-700 space-y-2">
                  <div className="font-semibold text-[#5A1717] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#C56A18]" />
                    <span>{selectedGuruji.purohitParampara}</span>
                  </div>
                  <p className="text-stone-600 leading-relaxed text-[11px]">
                    {selectedGuruji.bio}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Yajman Details */}
          {currentStep === 4 && (
            <div className="space-y-3.5">
              <div className="flex items-center justify-between pb-1 border-b border-[#B88935]/20">
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-heading text-[#5A1717] leading-tight">
                    Yajman & Sankalp Details
                  </h3>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Please enter devotee information for the sacred Sankalp recitation before Lord Trimbakeshwar.
                  </p>
                </div>
                <span className="text-[11px] text-[#C56A18] font-semibold bg-amber-100/60 px-2.5 py-0.5 rounded-full border border-amber-300/40 shrink-0">
                  Step 4 of 6
                </span>
              </div>

              {/* Appointed Guruji Summary Strip */}
              <div className="p-2.5 rounded-xl bg-[#EDE3D1]/70 border border-[#B88935]/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/assets/guruji.png"
                    alt="Pt. Pravin Shambhu Deshmukh (Desai)"
                    className="w-8 h-8 rounded-full object-cover object-top border border-[#B88935] shrink-0 shadow-xs"
                  />
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase tracking-wider block">Appointed Vedic Purohit</span>
                    <span className="font-bold text-[#5A1717]">Pt. Pravin Shambhu Deshmukh (Desai)</span>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                  Direct Sankalp
                </span>
              </div>

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
                    placeholder="Enter your full name"
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
                    WhatsApp / Mobile Number *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-stone-500 font-semibold">+91</span>
                    <input
                      type="tel"
                      required
                      placeholder="Enter 10-digit mobile number"
                      value={yajmanData.phone}
                      onChange={(e) => {
                        setYajmanData({ ...yajmanData, phone: e.target.value });
                        if (stepError) setStepError(null);
                      }}
                      className="w-full pl-11 pr-3 p-2.5 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#B88935]"
                    />
                  </div>
                  <div className="text-[10px] text-stone-500 mt-0.5">For Guruji direct call & WhatsApp communication</div>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 uppercase mb-1">
                    Email Address * (for OTP verification)
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={yajmanData.email}
                      onChange={(e) => {
                        setYajmanData({ ...yajmanData, email: e.target.value });
                        if (stepError) setStepError(null);
                      }}
                      className="w-full p-2.5 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#B88935]"
                    />
                  </div>
                  <div className="text-[10px] text-stone-500 mt-0.5">4-digit verification code will be sent to this email</div>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 uppercase mb-1">
                    City / Native Place
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your city / native place"
                    value={yajmanData.city}
                    onChange={(e) => setYajmanData({ ...yajmanData, city: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#B88935]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 uppercase mb-1">
                    State of Residence
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Maharashtra, Gujarat, MP"
                    value={yajmanData.state}
                    onChange={(e) => setYajmanData({ ...yajmanData, state: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#B88935]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-stone-700 uppercase mb-1">
                    Devotee Residential Address (निवासस्थान संपूर्ण पत्ता)
                  </label>
                  <input
                    type="text"
                    placeholder="Enter full flat / house / street address, area & pincode"
                    value={yajmanData.address}
                    onChange={(e) => setYajmanData({ ...yajmanData, address: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#B88935]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 uppercase mb-1">
                    Family Gotra (गोत्र)
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your gotra (if known)"
                    value={yajmanData.gotra}
                    onChange={(e) => setYajmanData({ ...yajmanData, gotra: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#B88935]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 uppercase mb-1">
                    Attending Family Members (उपस्थित व्यक्ती)
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

                <div className="sm:col-span-2">
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
                    <option value="Sanskrit">संस्कृतम् (Sanskrit)</option>
                  </select>
                </div>
              </div>

              <div className="mt-3">
                <label className="block font-bold text-stone-700 uppercase mb-1 text-xs">
                  Special Sankalp Intentions / Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Enter any special Sankalp intentions or notes (optional)..."
                  value={yajmanData.specialNotes}
                  onChange={(e) => setYajmanData({ ...yajmanData, specialNotes: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-stone-300 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[#B88935]"
                ></textarea>
              </div>

              <div className="mt-3 p-3 rounded-xl bg-[#EDE3D1]/60 border border-[#B88935]/25 flex items-start gap-2 text-xs text-stone-700">
                <ShieldCheck className="w-4 h-4 text-[#5A1717] shrink-0 mt-0.5" />
                <span>
                  Next step requires <strong>Email OTP Verification</strong> to authenticate your email address,
                  followed by the official <strong>₹1,000 Advance Booking Token payment</strong>.
                </span>
              </div>
            </div>
          )}

          {/* STEP 5: Email OTP Verification (Authentic 6-Digit Code) */}
          {currentStep === 5 && (
            <div className="py-2">
              <div className="text-center max-w-lg mx-auto">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 border-2 border-[#B88935]/50 text-[#5A1717] flex items-center justify-center mx-auto mb-3 shadow-md">
                  <Mail className="w-7 h-7 text-[#5A1717]" />
                </div>

                <div className="flex flex-col gap-1.5 mb-2.5">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-[#C56A18] flex items-center justify-center gap-1.5">
                    <Lock className="w-3 h-3 text-[#B88935]" />
                    <span>सुरक्षित ईमेल पडताळणी · SECURE EMAIL AUTHENTICATION</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-sanskrit text-[#5A1717] leading-snug">
                    Verify Email Address (OTP)
                  </h3>
                </div>
                <p className="text-xs text-stone-600 mb-2 leading-relaxed">
                  We have dispatched an authentic <strong>6-digit verification code</strong> from Guruji's Purohit Office to:
                </p>
                <div className="inline-flex items-center gap-2 bg-[#EDE3D1]/70 border border-[#B88935]/40 rounded-full px-4 py-1 mb-4">
                  <Mail className="w-3.5 h-3.5 text-[#5A1717]" />
                  <span className="font-bold text-xs text-[#5A1717] font-mono tracking-wide">
                    {maskedEmail || yajmanData.email || 'devotee@example.com'}
                  </span>
                </div>

                {/* 6 Digit Boxes */}
                <div className="flex justify-center items-center gap-2 sm:gap-3 mb-4" onPaste={handleOtpPaste}>
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
                      disabled={isVerifyingOtp}
                      className={`w-10 h-13 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-bold rounded-2xl border-2 transition-all font-mono ${
                        otpError
                          ? 'border-red-400 bg-red-50/40 text-red-900 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                          : digit
                          ? 'border-[#5A1717] bg-amber-50/50 text-[#5A1717] ring-2 ring-[#5A1717]/15'
                          : 'border-stone-300 bg-white text-stone-800 focus:border-[#B88935] focus:ring-2 focus:ring-[#B88935]/25'
                      }`}
                    />
                  ))}
                </div>

                {/* Status Banners */}
                {isVerifyingOtp && (
                  <div className="text-xs text-amber-900 font-semibold mb-3 flex items-center justify-center gap-1.5 bg-amber-50 py-2 px-4 rounded-full border border-amber-300 mx-auto w-fit animate-pulse">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-700" />
                    <span>Verifying code with Temple Server...</span>
                  </div>
                )}

                {otpError && !isVerifyingOtp && (
                  <div className="text-xs text-red-700 font-medium mb-3 flex items-center justify-center gap-1.5 bg-red-50 py-2 px-4 rounded-xl border border-red-200 mx-auto w-fit max-w-sm">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{otpError}</span>
                  </div>
                )}

                {isOtpVerified && (
                  <div className="text-xs text-emerald-800 font-bold mb-3 flex items-center justify-center gap-1.5 bg-emerald-50 py-2 px-4 rounded-full border border-emerald-300 mx-auto w-fit shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Email Verified! Proceeding to Dakshina Token Payment...</span>
                  </div>
                )}

                {/* Resend & Change Email Actions */}
                <div className="flex items-center justify-center gap-4 text-xs text-stone-600 mt-3 mb-2">
                  {canResendOtp ? (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={isSendingOtp}
                      className="text-[#5A1717] font-bold hover:underline flex items-center gap-1 cursor-pointer disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isSendingOtp ? 'animate-spin' : ''}`} />
                      <span>{isSendingOtp ? 'Sending New OTP...' : 'Resend OTP to Email'}</span>
                    </button>
                  ) : (
                    <span className="text-stone-500">
                      Resend code in <strong className="font-mono text-[#5A1717]">{otpTimer}s</strong>
                    </span>
                  )}

                  <span className="text-stone-300">•</span>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="text-[#C56A18] font-semibold hover:underline cursor-pointer"
                  >
                    Edit Email Address
                  </button>
                </div>

                <div className="mt-3 text-[11px] text-stone-500 bg-stone-50 border border-stone-200/80 rounded-xl p-2.5 flex items-center justify-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>Please check your inbox or spam/junk folder. Official email from <strong>trimbak.tirthapurohit@gmail.com</strong>.</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: Advance Booking Payment Modal (₹1,000 Fee) */}
          {currentStep === 6 && (
            <div>
              {/* Fee Notice Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-100/90 via-[#EDE3D1] to-amber-100/70 border-2 border-[#B88935]/50 mb-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-11 h-11 rounded-full bg-[#5A1717] text-amber-300 flex items-center justify-center font-bold text-xl shrink-0">
                      ₹
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-stone-600 block">
                        Official Advance Booking Token
                      </span>
                      <div className="text-lg sm:text-xl font-bold text-[#5A1717] font-heading">
                        Pay ₹1,000.00 Advance Token
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] bg-emerald-700 text-white font-bold px-2.5 py-0.5 rounded-full">
                      100% Deductible
                    </span>
                    <div className="text-[11px] text-stone-600 mt-1">Adjusted in final Dakshina</div>
                  </div>
                </div>

                {/* Pricing Note for Pujas */}
                <div className="mt-3 pt-2.5 border-t border-[#B88935]/25 text-xs text-stone-700">
                  <div className="p-2.5 rounded-xl bg-white/80 border border-[#B88935]/30 space-y-1">
                    <div className="font-bold text-[#5A1717] flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-[#C56A18]" />
                      <span>Dakshina & Samagri as per discussion with Guruji Pt. Pravin Shambhu Deshmukh (Desai)</span>
                    </div>
                    <div className="text-[11px] text-stone-600">
                      The <strong>₹1,000 advance token</strong> confirms your Sankalp in the Purohit ledger and reserves Guruji’s calendar for your chosen date & muhurat. Total Dakshina is settled mutually after the vidhi.
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary Pill */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-white rounded-xl border border-stone-200 text-xs mb-4">
                <div>
                  <span className="text-stone-500 text-[10px] block uppercase">Vidhi</span>
                  <span className="font-bold text-[#211D19] line-clamp-1">{selectedVidhi?.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src={selectedGuruji?.avatar || '/assets/guruji.png'}
                    alt={selectedGuruji?.name || 'Guruji'}
                    className="w-7 h-7 rounded-full object-cover object-top border border-[#B88935] shrink-0 shadow-xs"
                  />
                  <div className="min-w-0">
                    <span className="text-stone-500 text-[10px] block uppercase">Purohit</span>
                    <span className="font-bold text-[#5A1717] line-clamp-1 truncate">{selectedGuruji?.name}</span>
                  </div>
                </div>
                <div>
                  <span className="text-stone-500 text-[10px] block uppercase">Date</span>
                  <span className="font-semibold text-stone-800">{selectedDate}</span>
                </div>
                <div>
                  <span className="text-stone-500 text-[10px] block uppercase">Advance Token</span>
                  <span className="font-bold text-emerald-700">₹1,000.00 (Due Now)</span>
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
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
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
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
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
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer relative ${
                      paymentMethod === 'card'
                        ? 'bg-[#5A1717] text-white border-[#5A1717] shadow-sm'
                        : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Cards</span>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                      Tmp. Unavailable
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer relative ${
                      paymentMethod === 'netbanking'
                        ? 'bg-[#5A1717] text-white border-[#5A1717] shadow-sm'
                        : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>Net Banking</span>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                      Tmp. Unavailable
                    </span>
                  </button>
                </div>

                {/* TAB 1: Scan & Pay QR Code */}
                {paymentMethod === 'qr' && (
                  <div className="p-4 bg-white rounded-2xl border border-stone-200 text-center">
                    <div className="flex items-center justify-between pb-2 border-b border-stone-100 mb-3 text-xs">
                      <span className="text-stone-700 font-semibold flex items-center gap-1.5">
                        <QrCode className="w-3.5 h-3.5 text-[#5A1717]" />
                        <span>Scan with any UPI App (GPay, PhonePe, Paytm, BHIM)</span>
                      </span>
                      <span className="text-emerald-700 font-bold flex items-center gap-1 text-[11px] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200" title="Official Authenticated Temple UPI QR">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Verified Official QR</span>
                      </span>
                    </div>

                    {/* Authentic Hereditary Purohit UPI QR Code Image */}
                    <div className="w-52 mx-auto p-2 bg-white rounded-2xl border-2 border-[#B88935]/40 shadow-inner flex flex-col items-center justify-center relative group">
                      <img
                        src={templeUpi.qrImageUrl || "/assets/UPI.jpeg"}
                        alt="Shri Trimbakeshwar Purohit UPI QR Code"
                        className="w-full h-auto object-contain rounded-xl border border-stone-200 max-h-52"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/assets/UPI.jpeg';
                        }}
                      />
                    </div>

                    <div className="mt-3 space-y-1">
                      <div className="text-sm font-bold text-[#5A1717]">₹1,000.00 Advance Booking Token</div>
                      <div className="text-xs text-stone-700 font-medium">
                        Payee: <span className="font-semibold text-[#5A1717]">{templeUpi.payeeName || 'Pt. Atharva Deshmukh / Pt. Pravin Shambhu Deshmukh'}</span>
                      </div>
                      <div className="flex items-center justify-center gap-1.5 mt-1">
                        <span className="text-[11px] text-stone-700 font-mono bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-300 font-bold">
                          UPI ID: {templeUpi.upiId || 'atharvadeshmukh525-1@oksbi'}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(templeUpi.upiId || 'atharvadeshmukh525-1@oksbi');
                            setCopiedUpiId(true);
                            setTimeout(() => setCopiedUpiId(false), 2000);
                          }}
                          className="text-[11px] text-[#5A1717] hover:underline font-semibold flex items-center gap-0.5 px-2 py-1 rounded bg-amber-100/60 border border-amber-300/60 cursor-pointer"
                        >
                          {copiedUpiId ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedUpiId ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Supported Apps Badges */}
                    <div className="flex items-center justify-center gap-2 mt-3 text-[10px] font-semibold text-stone-600 flex-wrap">
                      <span className="px-2 py-0.5 rounded bg-stone-100 border border-stone-200">Google Pay</span>
                      <span className="px-2 py-0.5 rounded bg-stone-100 border border-stone-200">PhonePe</span>
                      <span className="px-2 py-0.5 rounded bg-stone-100 border border-stone-200">Paytm</span>
                      <span className="px-2 py-0.5 rounded bg-stone-100 border border-stone-200">BHIM UPI</span>
                      <span className="px-2 py-0.5 rounded bg-stone-100 border border-stone-200">Cred</span>
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
                            className="p-2 rounded-xl border border-stone-200 hover:border-[#B88935] hover:bg-amber-50/50 text-xs font-medium text-stone-800 flex items-center justify-center gap-1.5 cursor-pointer"
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
                          placeholder="Enter your UPI ID (e.g. username@upi)"
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
                            className="text-[10px] bg-stone-100 hover:bg-stone-200 text-stone-700 px-2 py-0.5 rounded-md font-mono cursor-pointer"
                          >
                            {sfx}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: Credit / Debit Card - TEMPORARILY UNAVAILABLE */}
                {paymentMethod === 'card' && (
                  <div className="p-5 bg-amber-50/80 rounded-2xl border border-amber-300 text-center space-y-3">
                    <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-[#5A1717]">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-200/80 text-amber-900 text-[10px] font-bold uppercase tracking-wider mb-1.5 border border-amber-300">
                        Notice • Tmp. Unavailable
                      </div>
                      <h4 className="text-sm font-bold text-[#5A1717]">
                        Card Payments Temporarily Unavailable
                      </h4>
                      <p className="text-xs text-stone-600 mt-1 max-w-md mx-auto leading-relaxed">
                        Due to scheduled banking payment gateway maintenance for temple trusts, Debit and Credit Card processing is temporarily offline. Please use our instant zero-fee authentic Temple UPI QR Code or any UPI App to reserve your pooja slot.
                      </p>
                    </div>
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('qr')}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#5A1717] to-[#7A1D1D] hover:from-[#7A1D1D] hover:to-[#962626] text-white text-xs font-bold shadow transition-all inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <QrCode className="w-4 h-4 text-amber-300" />
                        <span>Pay via Temple UPI QR (Recommended)</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* TAB 4: Net Banking - TEMPORARILY UNAVAILABLE */}
                {paymentMethod === 'netbanking' && (
                  <div className="p-5 bg-amber-50/80 rounded-2xl border border-amber-300 text-center space-y-3">
                    <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-[#5A1717]">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-200/80 text-amber-900 text-[10px] font-bold uppercase tracking-wider mb-1.5 border border-amber-300">
                        Notice • Tmp. Unavailable
                      </div>
                      <h4 className="text-sm font-bold text-[#5A1717]">
                        Net Banking Temporarily Unavailable
                      </h4>
                      <p className="text-xs text-stone-600 mt-1 max-w-md mx-auto leading-relaxed">
                        Direct Internet Banking (NEFT/RTGS/IMPS portal) is undergoing scheduled bank server integration. Please make your ₹1,000 token payment using the authentic Temple UPI QR Code or any UPI App.
                      </p>
                    </div>
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('qr')}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#5A1717] to-[#7A1D1D] hover:from-[#7A1D1D] hover:to-[#962626] text-white text-xs font-bold shadow transition-all inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <QrCode className="w-4 h-4 text-amber-300" />
                        <span>Pay via Temple UPI QR (Recommended)</span>
                      </button>
                    </div>
                  </div>
                )}
                {/* ─── Mandatory Payment Proof & Verification Upload Section ─── */}
                <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#EDE3D1]/80 to-amber-50/90 border-2 border-[#B88935]/40 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-[#B88935]/30">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#5A1717] text-amber-300 flex items-center justify-center font-bold text-xs">
                        2
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#5A1717] font-heading">
                          Upload Payment Proof for Verification
                        </h4>
                        <p className="text-[10px] text-stone-600">
                          Enter your UTR / Ref No. and attach your payment screenshot
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200/80 text-amber-900 border border-amber-300">
                      Required
                    </span>
                  </div>

                  {/* Payment App Selector */}
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wide mb-1.5">
                      Payment App Used:
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 text-xs font-medium">
                      {['Google Pay', 'PhonePe', 'Paytm', 'BHIM UPI', 'Cred', 'Other / Bank'].map((app) => (
                        <button
                          key={app}
                          type="button"
                          onClick={() => setPaymentApp(app)}
                          className={`p-2 rounded-xl border text-[11px] font-semibold transition-all cursor-pointer ${
                            paymentApp === app
                              ? 'bg-[#5A1717] text-white border-[#5A1717] shadow-xs'
                              : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                          }`}
                        >
                          {app}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* UTR Input */}
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wide mb-1">
                      12-Digit UPI Transaction ID / UTR Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 429011928374 or UPI/429011928374"
                      value={utrInput}
                      onChange={(e) => {
                        setUtrInput(e.target.value);
                        setPaymentValidationError(null);
                      }}
                      className="w-full p-2.5 rounded-xl border border-stone-300 bg-white text-xs font-mono font-semibold text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#B88935]"
                    />
                    <span className="text-[10px] text-stone-500 mt-1 block">
                      Find this in your UPI app receipt under "UPI Transaction ID" or "UTR / Ref No."
                    </span>
                  </div>

                  {/* Payment Screenshot Upload Dropzone */}
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wide mb-1.5">
                      Upload Payment Screenshot (Receipt) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleScreenshotFileChange}
                      className="hidden"
                    />

                    {paymentScreenshot ? (
                      <div className="p-3 bg-white rounded-xl border-2 border-emerald-500/50 flex items-center justify-between gap-3 shadow-xs">
                        <div className="flex items-center gap-3">
                          <img
                            src={paymentScreenshot}
                            alt="Uploaded receipt"
                            onClick={() => setShowEnlargedScreenshot(true)}
                            className="w-14 h-14 rounded-lg object-cover border border-emerald-400 cursor-pointer shadow-xs hover:opacity-90"
                          />
                          <div>
                            <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>Payment Screenshot Attached</span>
                            </div>
                            <div className="text-[11px] text-stone-600 mt-0.5 font-medium truncate max-w-[200px] sm:max-w-xs">
                              {screenshotFileName || 'Payment_Receipt.png'}
                            </div>
                            <span className="text-[10px] text-stone-400 font-mono">
                              {screenshotFileSize || 'Verified File'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setShowEnlargedScreenshot(true)}
                            className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                            title="View enlarged image"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Preview</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setPaymentScreenshot(null);
                              setScreenshotFileName(null);
                              setScreenshotFileSize(null);
                            }}
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold transition-colors cursor-pointer"
                            title="Remove attached screenshot"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="p-4 rounded-xl border-2 border-dashed border-[#B88935]/50 bg-white/80 hover:bg-amber-50/50 hover:border-[#B88935] transition-all flex items-center justify-center gap-2.5 text-stone-700 cursor-pointer"
                      >
                        <Upload className="w-5 h-5 text-[#C56A18] shrink-0" />
                        <div className="text-left">
                          <span className="text-xs font-bold text-[#5A1717] block">
                            Click to Upload Payment Screenshot
                          </span>
                          <span className="text-[10px] text-stone-500">
                            JPG, PNG, WebP — Max 5 MB
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {paymentValidationError && (
                    <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                      <span>{paymentValidationError}</span>
                    </div>
                  )}

                  {/* Under Verification Process Guidance */}
                  <div className="p-3 rounded-xl bg-white/90 border border-amber-300/60 text-[11px] text-stone-700 space-y-1">
                    <div className="font-bold text-[#5A1717] flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#C56A18]" />
                      <span>Under Verification Protocol:</span>
                    </div>
                    <p className="text-stone-600 leading-relaxed">
                      Upon submission, your booking status will be placed <strong>Under Verification</strong>. Our Purohit office will cross-verify your ₹1,000 credit in the bank ledger. Once verified, you will receive an official booking confirmation email at <strong>{yajmanData.email || 'your email'}</strong>, and our Guruji will contact you directly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: Booking Under Verification / Digital Sankalp Pass */}
          {bookingConfirmed && (
            <div className="text-center py-1 w-full">
              <div className="w-16 h-16 rounded-full bg-amber-100 border-2 border-amber-500 text-amber-800 flex items-center justify-center mx-auto mb-2 text-2xl shadow-sm animate-in zoom-in-75">
                <Clock className="w-8 h-8 text-amber-600 animate-pulse" />
              </div>

              <div className="flex flex-col gap-1.5 mb-2.5">
                <span className="text-xs font-bold uppercase tracking-widest text-[#C56A18] font-sans">
                  ॥ ॐ नमः शिवाय ॥ श्री त्र्यंबकेश्वर सेवा
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-sanskrit text-[#5A1717] leading-snug">
                  पूजा नोंदणी प्राप्त • पेमेंट पडताळणी प्रलंबित
                </h3>
              </div>
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/90 border border-amber-400 text-amber-900 text-xs font-bold mb-3 shadow-xs">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                <span>Status: Booking Under Verification (पडताळणी प्रलंबित)</span>
              </div>

              <p className="text-xs text-stone-600 w-full mb-3.5 leading-relaxed">
                Your Pooja booking request and ₹1,000 advance payment screenshot have been submitted. Because UPI transactions require manual ledger reconciliation by our Purohit office, your booking is currently <strong>Under Verification</strong>.
              </p>

              {/* Explanatory 3-Step Verification Notice */}
              <div className="p-3.5 mb-4 rounded-2xl bg-amber-50 border border-amber-300/80 text-left w-full text-xs space-y-2">
                <div className="font-bold text-[#5A1717] flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-[#C56A18] shrink-0" />
                  <span>Next Steps (पुढील प्रक्रिया):</span>
                </div>
                <div className="grid grid-cols-1 gap-2 text-[11px] text-stone-700">
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
                    <span><strong>Bank Ledger Reconciliation:</strong> Our Purohit office is verifying the ₹1,000 advance credit for UTR <strong className="font-mono text-[#5A1717]">{transactionId}</strong>.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
                    <span><strong>Official Confirmation Email:</strong> As soon as the transaction is verified by Admin, you will receive an official booking confirmation email at <strong className="text-[#5A1717]">{yajmanData.email}</strong>.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
                    <span><strong>Guruji Direct Guidance:</strong> Our Hereditary Vatandar Tirth Purohit, <strong>Pt. Pravin Shambhu Deshmukh (Desai)</strong>, will contact you directly on WhatsApp / Mobile (<strong>+91 {yajmanData.phone}</strong>) 24 hours prior to guide you on fasting (upvaas), traditional dress code, and exact Muhurat preparation.</span>
                  </div>
                </div>
              </div>

              {/* Printable / Savable Pass Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-[#EDE3D1]/80 to-[#F5EEE0] border-2 border-[#B88935]/50 text-left w-full shadow-lg relative overflow-hidden">
                {/* Official Hereditary Purohit Sangh Registered Emblem Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0 select-none">
                  <img
                    src="/assets/purohit-profile-transparent.png"
                    alt="Shri Trimbakeshwar Purohit Sangh Watermark"
                    className="w-56 sm:w-64 max-h-64 object-contain opacity-[0.11] filter contrast-125"
                  />
                </div>

                {/* Card Top Strip */}
                <div className="flex items-center justify-between pb-3 border-b border-[#B88935]/30 mb-3 relative z-10">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-500 block">Booking Reference</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-base font-bold font-mono text-[#5A1717]">{bookingRefId}</span>
                      <button
                        type="button"
                        onClick={handleCopyReference}
                        className="p-1 text-stone-500 hover:text-stone-800 cursor-pointer"
                        title="Copy Reference"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      {copiedRef && <span className="text-[10px] text-emerald-700 font-bold">Copied!</span>}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-stone-500 block">Token Status</span>
                    <div className="text-xs font-bold text-amber-900 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-md inline-flex items-center gap-1 shadow-2xs">
                      <Clock className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
                      <span>Booking Under Verification (पडताळणी प्रलंबित)</span>
                    </div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="space-y-2 text-xs relative z-10">
                  <div className="flex justify-between items-center py-0.5 border-b border-stone-200/50">
                    <span className="text-stone-600">Vidhi / Ritual:</span>
                    <span className="font-bold text-[#211D19]">{selectedVidhi?.name}</span>
                  </div>

                  <div className="flex justify-between items-center py-0.5 border-b border-stone-200/50">
                    <span className="text-stone-600">Advance Token Deposit:</span>
                    <span className="font-semibold text-emerald-800">
                      ₹1,000.00 (Submitted via {paymentApp})
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-stone-200/50">
                    <span className="text-stone-600">Appointed Purohit:</span>
                    <div className="flex items-center gap-2 text-right">
                      <img
                        src={selectedGuruji?.avatar || '/assets/guruji.png'}
                        alt={selectedGuruji?.name || 'Guruji'}
                        className="w-8 h-8 rounded-full object-cover object-top border border-[#B88935] shadow-xs shrink-0"
                      />
                      <div>
                        <span className="font-bold text-[#5A1717] block">{selectedGuruji?.name}</span>
                        <div className="text-[10px] text-stone-500">{selectedGuruji?.titleNative}</div>
                      </div>
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
                      {yajmanData.name || 'Respected Devotee'} ({yajmanData.gotra ? (yajmanData.gotra.includes('Gotra') ? yajmanData.gotra : `${yajmanData.gotra} Gotra`) : 'Kashyap Gotra'})
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-0.5 border-b border-stone-200/50">
                    <span className="text-stone-600">Persons Attending (उपस्थित):</span>
                    <span className="font-semibold text-stone-800">{yajmanData.familyMembers || 2} Persons</span>
                  </div>

                  <div className="flex justify-between items-center py-0.5 border-b border-stone-200/50">
                    <span className="text-stone-600">Contact WhatsApp / Phone:</span>
                    <span className="font-semibold text-stone-800">+91 {yajmanData.phone}</span>
                  </div>

                  <div className="flex justify-between items-center py-0.5 border-b border-stone-200/50">
                    <span className="text-stone-600">Devotee Email:</span>
                    <span className="font-semibold text-[#5A1717]">{yajmanData.email}</span>
                  </div>

                  <div className="flex justify-between items-center py-0.5 border-b border-stone-200/50">
                    <span className="text-stone-600">City & State:</span>
                    <span className="font-medium text-stone-800">{yajmanData.city || 'Trimbakeshwar'}, {yajmanData.state || 'Maharashtra'}</span>
                  </div>

                  {yajmanData.address && (
                    <div className="flex justify-between items-start py-0.5 border-b border-stone-200/50">
                      <span className="text-stone-600 shrink-0">Client Address:</span>
                      <span className="font-medium text-stone-800 text-right text-[11px] max-w-[240px] truncate">{yajmanData.address}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center py-0.5 border-b border-stone-200/50">
                    <span className="text-stone-600">UPI Transaction ID (UTR):</span>
                    <span className="font-mono text-[11px] font-bold text-stone-800">{transactionId}</span>
                  </div>

                  {/* Devotee Payment Screenshot Thumbnail */}
                  {paymentScreenshot && (
                    <div className="pt-2 pb-1 border-t border-stone-200/50 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={paymentScreenshot}
                          alt="Uploaded Receipt"
                          className="w-12 h-12 object-cover rounded-lg border border-amber-300 shadow-xs cursor-pointer hover:opacity-90"
                          onClick={() => setShowEnlargedScreenshot(true)}
                        />
                        <div>
                          <span className="text-[11px] font-bold text-stone-700 block">Attached UPI Receipt</span>
                          <span className="text-[10px] text-stone-500 font-mono">App: {paymentApp}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowEnlargedScreenshot(true)}
                        className="text-[11px] text-[#5A1717] font-semibold hover:underline flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1 rounded-md border border-stone-200 shadow-xs"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Receipt</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Important Devotee Advice */}
                <div className="mt-3 pt-2.5 border-t border-[#B88935]/30 text-[11px] text-stone-600 space-y-1">
                  <div className="flex items-center gap-1.5 text-[#5A1717] font-semibold">
                    <span>🕉️</span>
                    <span>Traditional Dress Code: Dhoti / Kurta for Men, Saree for Women.</span>
                  </div>
                  <div className="text-[10px] text-stone-500">
                    Guruji Pt. Pravin Shambhu Deshmukh (Desai) will contact you on WhatsApp <strong>+91 {yajmanData.phone}</strong> 24 hours prior with fasting & ritual preparations.
                  </div>
                </div>
              </div>

              {/* Pass Actions: Print, WhatsApp, Close */}
              <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-4 py-2 rounded-xl bg-white border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-semibold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppShare}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share on WhatsApp</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="p-3.5 sm:p-5 bg-white border-t border-stone-200 flex items-center justify-between shrink-0">
          {!bookingConfirmed ? (
            <>
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 flex items-center gap-1.5 cursor-pointer"
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
                  className="px-3 py-2 text-xs font-semibold text-stone-500 hover:text-stone-700 cursor-pointer"
                >
                  Cancel
                </button>

                {/* Next / Action Buttons per Step */}
                {currentStep < 4 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => prev + 1)}
                    className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#5A1717] to-[#C56A18] hover:from-[#6D1B1B] hover:to-[#B88935] shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                {currentStep === 4 && (
                  <button
                    type="button"
                    onClick={handleProceedToOtp}
                    disabled={isSendingOtp}
                    className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#5A1717] to-[#C56A18] hover:from-[#6D1B1B] hover:to-[#B88935] shadow-md flex items-center gap-1.5 transition-all disabled:opacity-75 cursor-pointer"
                  >
                    {isSendingOtp ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Sending Secure OTP...</span>
                      </>
                    ) : (
                      <>
                        <span>Verify Email (OTP)</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}

                {currentStep === 5 && (
                  <button
                    type="button"
                    onClick={handleVerifyOtpAndProceed}
                    disabled={isVerifyingOtp}
                    className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-emerald-700 to-emerald-600 hover:from-emerald-800 hover:to-emerald-700 shadow-md flex items-center gap-1.5 transition-all disabled:opacity-75 cursor-pointer"
                  >
                    {isVerifyingOtp ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Verifying Code...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Verify & Pay ₹1,000</span>
                      </>
                    )}
                  </button>
                )}

                {currentStep === 6 && (
                  <button
                    type="button"
                    onClick={handleExecutePayment}
                    disabled={isProcessingPayment}
                    className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#5A1717] via-[#7B1F1F] to-[#C56A18] hover:from-[#6D1B1B] hover:to-[#B88935] shadow-md flex items-center gap-2 transition-all disabled:opacity-75 cursor-pointer"
                  >
                    {isProcessingPayment ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>{paymentStepText}</span>
                      </>
                    ) : paymentMethod === 'card' || paymentMethod === 'netbanking' ? (
                      <>
                        <QrCode className="w-4 h-4 text-amber-300" />
                        <span>Switch to Temple UPI QR (Cards & Net Banking Offline)</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Submit Booking & Payment for Verification</span>
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
                className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#5A1717] hover:bg-[#6D1B1B] shadow-md transition-colors cursor-pointer"
              >
                Close & Return
              </button>
            </div>
          )}
        </div>

        {/* Enlarged Payment Screenshot Lightbox Modal */}
        {showEnlargedScreenshot && paymentScreenshot && (
          <div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150"
            onClick={() => setShowEnlargedScreenshot(false)}
          >
            <div
              className="relative max-w-lg w-full bg-[#1A0D0A] border border-amber-500/40 rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-amber-500/20 text-white">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-sm text-amber-100 font-sanskrit">
                    Attached UPI Payment Receipt
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowEnlargedScreenshot(false)}
                  className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-2 overflow-auto flex-1 flex items-center justify-center bg-black/50 rounded-2xl my-3">
                <img
                  src={paymentScreenshot}
                  alt="Enlarged Payment Receipt"
                  className="max-h-[65vh] w-auto object-contain rounded-xl shadow-lg border border-amber-500/20"
                />
              </div>
              <div className="flex items-center justify-between text-xs text-stone-400 pt-1">
                <span>UTR: <strong className="font-mono text-amber-300">{transactionId || utrInput}</strong></span>
                <button
                  type="button"
                  onClick={() => setShowEnlargedScreenshot(false)}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs cursor-pointer"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
