import React, { useState } from 'react';
import { Booking } from '../types';
import {
  X,
  Plus,
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  FileText,
  Loader2,
  Languages,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Check,
} from 'lucide-react';
import { submitPoojaBooking } from '../../services/enquiryService';

interface NewBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newBooking: Booking) => void;
}

export type BookingModalTab = 'devotee' | 'pooja' | 'payment';

// Complete sanctified list of all official temple poojas from siteData without skipping
export const ALL_POOJA_OPTIONS: string[] = [
  'Narayan Nagbali (3-Day Ritual)',
  'Tripindi Shraddha (Pitru Moksha)',
  'Kaal Sarp Yog Shanti',
  'Kumbh Vivah',
  'Maha Mrityunjaya Jaap & Anushthan',
  'Rudrabhishek & Maha Abhishek',
  'Laghurudra & Maharudra (Grand Homa)',
  'Graha Nakshatra Shanti & Navagraha Havan',
  'Vastu Shanti Puja',
  'Navachandi Yaag (Maha Shakti Anushthan)',
  'Ganesh Yaag (Atharvashirsha Sahasravartan)',
  'Udak Shanti',
  'Other (Manual Entry)',
];

export const GURUJI_OPTIONS: string[] = [
  'Pt. Pravin Shambhu Deshmukh (Desai) - 25 Generations Lineage',
  'Pt. Atharva Pravin Deshmukh - Tirth Purohit',
  'Pt. Shambhu Mahadev Deshmukh - Senior Scholar',
  'Any Hereditary Vatandar Purohit Available',
];

export const TIME_SLOT_OPTIONS: string[] = [
  '06:30 AM to 10:30 AM (Morning Brahma / Shubh Muhurat)',
  '11:00 AM to 02:00 PM (Madhyahna / Abhijit Muhurat)',
  '02:30 PM to 06:30 PM (Aparahna / Pradosh Kaal)',
  '07:00 PM to 09:00 PM (Sandhya Special Anushthan)',
];

export const LOCATION_OPTIONS: string[] = [
  'Shri Trimbakeshwar Anushthan Bhavan',
  'Ahilya Godavari Sangam Tirtha',
  'Yajman Private Dharamshala / Hall',
];

export const LANGUAGE_OPTIONS: string[] = [
  'Marathi (मराठी)',
  'Hindi (हिन्दी)',
  'English',
  'Gujarati (ગુજરાતી)',
  'Sanskrit (संस्कृतम्)',
  'Telugu (తెలుగు)',
  'Kannada (ಕನ್ನಡ)',
  'Bengali (বাংলা)',
];

export const PAYMENT_METHODS: { value: string; label: string }[] = [
  { value: 'Cash', label: 'Cash (Direct Cash to Temple Office)' },
  { value: 'UPI / QR', label: 'UPI / QR (Google Pay / PhonePe / Paytm)' },
  { value: 'Direct Bank Transfer', label: 'Direct Bank Transfer (NEFT / RTGS / IMPS)' },
  { value: 'Debit / Credit Card', label: 'Debit / Credit Card (POS Terminal)' },
  { value: 'Cheque / DD', label: 'Cheque / Demand Draft' },
  { value: 'Unpaid / Pay on Arrival', label: 'Unpaid (Due on Arrival)' },
];

export const PAYMENT_STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: 'verified', label: 'Advance Token Paid (₹1,000 Verified)' },
  { value: 'full_paid', label: 'Full Pooja Dakshina Paid' },
  { value: 'pending_verification', label: 'Payment Under Review / Pending' },
  { value: 'pay_on_arrival', label: 'Unpaid (Payment on Arrival)' },
];

export const NewBookingModal: React.FC<NewBookingModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  // Helper to get default auspicious date (3 days ahead)
  const getDefaultDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  // Active Tab State
  const [activeTab, setActiveTab] = useState<BookingModalTab>('devotee');
  const [tabError, setTabError] = useState<string | null>(null);

  // Devotee Information (Tab 1)
  const [devoteeName, setDevoteeName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [gotra, setGotra] = useState('');
  const [familyMembersCount, setFamilyMembersCount] = useState<number>(2);
  const [language, setLanguage] = useState<string>(LANGUAGE_OPTIONS[0]);

  // Field-level errors
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Pooja & Guruji Selection (Tab 2)
  const [poojaType, setPoojaType] = useState<string>(ALL_POOJA_OPTIONS[0]);
  const [customPoojaName, setCustomPoojaName] = useState('');
  const [assignedGuruji, setAssignedGuruji] = useState<string>(GURUJI_OPTIONS[0]);
  const [date, setDate] = useState<string>(getDefaultDate());
  const [time, setTime] = useState<string>(TIME_SLOT_OPTIONS[0]);
  const [location, setLocation] = useState<string>(LOCATION_OPTIONS[0]);

  // Payment Record Keeping (Tab 3)
  const [paymentMethod, setPaymentMethod] = useState<string>('Cash');
  const [paymentStatus, setPaymentStatus] = useState<string>('verified');
  const [advanceAmount, setAdvanceAmount] = useState<number>(1000);
  const [utrNumber, setUtrNumber] = useState('');
  const [createdByName, setCreatedByName] = useState('Pt. Pravin Shambhu Deshmukh (Desai)');
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  // ── Utilities ────────────────────────────────────────────────────────────
  const stripHtml = (v: string) =>
    v.replace(/<[^>]*>/g, '').replace(/javascript\s*:/gi, '').replace(/on\w+\s*=/gi, '');

  const wordCount = (v: string) =>
    v.trim() === '' ? 0 : v.trim().split(/\s+/).length;

  const validateDevoteeFields = (): boolean => {
    const errs: Record<string, string> = {};
    if (!devoteeName.trim() || devoteeName.trim().length < 2) {
      errs.devoteeName = 'Full name is required (min 2 characters).';
    } else if (devoteeName.trim().length > 120) {
      errs.devoteeName = 'Name must not exceed 120 characters.';
    } else if (/<[^>]*>/.test(devoteeName)) {
      errs.devoteeName = 'Name must not contain HTML markup.';
    }
    const digits = phone.replace(/[^0-9]/g, '');
    if (!phone.trim() || digits.length < 10) {
      errs.phone = 'Mobile number must have at least 10 digits.';
    } else if (digits.length > 20) {
      errs.phone = 'Mobile number must not exceed 20 digits.';
    }
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const resolvedPoojaName =
    poojaType === 'Other (Manual Entry)'
      ? (customPoojaName.trim() || 'Custom Vedic Vidhi')
      : poojaType;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateDevoteeFields()) {
      setActiveTab('devotee');
      setTabError('Please correct the errors highlighted below.');
      return;
    }
    if (!devoteeName.trim() || !phone.trim()) {
      setActiveTab('devotee');
      setTabError('Please provide Devotee Full Name and Mobile Number.');
      return;
    }

    // Notes word-count guard
    if (wordCount(notes) > 200) {
      setActiveTab('payment');
      setTabError(`Notes must not exceed 200 words (currently ${wordCount(notes)}).`);
      return;
    }

    if (poojaType === 'Other (Manual Entry)' && !customPoojaName.trim()) {
      setActiveTab('pooja');
      setTabError('Please enter the custom pooja name or pick an existing ritual.');
      return;
    }

    setIsSaving(true);
    setTabError(null);

    const year = new Date().getFullYear();
    const newId = `TRMB-${year}-${Math.floor(1090 + Math.random() * 900)}`;
    const isPaid = paymentStatus === 'verified' || paymentStatus === 'full_paid';
    const resolvedUtr = utrNumber.trim()
      ? utrNumber.trim()
      : isPaid
      ? (paymentMethod === 'Cash'
          ? `CASH-${Date.now().toString().slice(-6)}`
          : `UPI/${Math.floor(100000000000 + Math.random() * 900000000000)}`)
      : undefined;

    const newBooking: Booking = {
      id: newId,
      devoteeName: stripHtml(devoteeName.trim()),
      phone: stripHtml(phone.trim().startsWith('+91') ? phone.trim() : `+91 ${phone.trim()}`),
      email: email.trim() ? stripHtml(email.trim()) : undefined,
      poojaType: resolvedPoojaName,
      date,
      time,
      location,
      status: 'upcoming',
      statusLabel: isPaid ? 'Confirmed (Walk-in / Phone)' : 'Reserved (Due on Arrival)',
      gotra: gotra.trim()
        ? (gotra.includes('Gotra') ? gotra.trim() : `${gotra.trim()} Gotra`)
        : 'Kashyap Gotra',
      city: city.trim() || 'Nashik',
      familyMembersCount,
      advanceAmount: isPaid ? Number(advanceAmount) || 1000 : 0,
      totalPoojaDakshina: 'As per Vedic Scriptures',
      qrStatus: isPaid ? 'verified' : 'pending_verification',
      utrNumber: resolvedUtr,
      paymentApp:
        paymentMethod === 'Cash'
          ? 'Cash'
          : paymentMethod.includes('UPI')
          ? 'Google Pay'
          : paymentMethod,
      paymentMethod,
      bookingDate: `Today (Manual Entry by ${createdByName.trim() || 'Admin'})`,
      createdByName: createdByName.trim() || 'Pt. Pravin Shambhu Deshmukh (Desai)',
      assignedGuruji,
      language,
      notes: `${notes.trim() ? notes.trim() + ' | ' : ''}Recorded by: ${
        createdByName.trim() || 'Staff'
      } [Mode: ${paymentMethod}, Status: ${paymentStatus}]`,
    };

    // Save directly to the live backend API (/api/bookings) & local storage
    try {
      await submitPoojaBooking({
        devoteeName: newBooking.devoteeName,
        phone: newBooking.phone,
        email: newBooking.email,
        gotra: newBooking.gotra,
        city: newBooking.city,
        poojaType: newBooking.poojaType,
        poojaCategory: 'Walk-In / Phone Entry',
        scheduledDate: newBooking.date,
        timeSlot: newBooking.time,
        familyMembersCount: newBooking.familyMembersCount,
        advanceAmount: newBooking.advanceAmount,
        paymentMethod: paymentMethod.toLowerCase(),
        paymentApp: newBooking.paymentApp,
        utrNumber: newBooking.utrNumber,
        notes: newBooking.notes,
        language: newBooking.language || 'en',
      });
    } catch (err) {
      console.warn('API DB save warning (fallback to local state):', err);
    }

    setIsSaving(false);
    onSubmit(newBooking);
    onClose();
  };

  const tabsConfig = [
    {
      id: 'devotee' as BookingModalTab,
      label: 'Devotee Info',
      sublabel: 'यजमान तपशील',
      icon: User,
      number: '1',
      isValid: Boolean(devoteeName.trim() && phone.trim()),
    },
    {
      id: 'pooja' as BookingModalTab,
      label: 'Pooja & Muhurat',
      sublabel: 'विधी व मुहूर्त',
      icon: Sparkles,
      number: '2',
      isValid: poojaType === 'Other (Manual Entry)' ? Boolean(customPoojaName.trim()) : true,
    },
    {
      id: 'payment' as BookingModalTab,
      label: 'Payment & Ledger',
      sublabel: 'देयक व नोंदणी',
      icon: CreditCard,
      number: '3',
      isValid: true,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-booking-title"
    >
      <div
        className="relative w-full max-w-4xl lg:max-w-5xl bg-gradient-to-b from-[#1E0E0A] to-[#120705] border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 sm:px-6 sm:py-4.5 border-b border-amber-500/20 bg-[#160B08]/90">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-stone-950 font-bold shadow-md shrink-0">
              <Plus className="w-5 h-5" />
            </div>
            <div className="flex flex-col gap-1">
              <h2 id="new-booking-title" className="text-base sm:text-lg font-bold font-sanskrit text-amber-100 leading-snug">
                New Walk-In / Phone Booking
              </h2>
              <p className="text-[11px] sm:text-xs text-stone-400">
                Direct devotee ritual registration into hereditary database ledger
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close Booking Dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ─── TAB SWITCHER NAVIGATION BAR ─── */}
        <div className="flex items-center border-b border-amber-500/20 bg-[#140806]/95 px-3 sm:px-6 overflow-x-auto custom-scrollbar">
          {tabsConfig.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setTabError(null);
                  setActiveTab(tab.id);
                }}
                className={`relative flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-3 font-medium text-xs transition-all cursor-pointer whitespace-nowrap shrink-0 border-b-2 ${
                  isActive
                    ? 'border-amber-400 text-amber-200 bg-amber-500/10 font-bold'
                    : 'border-transparent text-stone-400 hover:text-stone-200 hover:bg-white/5'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                    isActive
                      ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-stone-950 shadow'
                      : tab.isValid
                      ? 'bg-amber-950/60 text-amber-400 border border-amber-500/30'
                      : 'bg-stone-800 text-stone-400'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <div className="leading-tight flex items-center gap-1.5">
                    <span>{tab.label}</span>
                    {tab.isValid && !isActive && (
                      <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                    )}
                  </div>
                  <div className="text-[10px] text-amber-400/70 font-sanskrit hidden sm:block">
                    {tab.sublabel}
                  </div>
                </div>
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 shadow-sm shadow-amber-400" />
                )}
              </button>
            );
          })}
        </div>

        {/* Inline Error Alert if any */}
        {tabError && (
          <div className="mx-5 sm:mx-6 mt-3 p-3 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2 animate-in fade-in duration-150">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{tabError}</span>
          </div>
        )}

        {/* Form Body - Responsive 3-Column Grid under Active Tab */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 sm:p-6 space-y-6 text-xs flex-1 custom-scrollbar">

          {/* ════════════ TAB 1: DEVOTEE & CONTACT INFO ════════════ */}
          {activeTab === 'devotee' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-1 border-b border-amber-500/20">
                <div className="flex items-center gap-2 text-amber-200 font-semibold font-sanskrit text-xs">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  <span>यजमान व संपर्क तपशील (Devotee & Contact Information)</span>
                </div>
                <span className="text-[10px] text-stone-400 font-mono">Step 1 of 3</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {/* Column 1: Devotee Name */}
                <div>
                  <label className="block text-stone-300 font-medium mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-amber-400" />
                    <span>Yajaman (Devotee) Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Vithal Tambat"
                    value={devoteeName}
                    onChange={(e) => { setDevoteeName(e.target.value); if (fieldErrors.devoteeName) setFieldErrors(p => ({...p, devoteeName: ''})); }}
                    className={`w-full bg-black/50 border rounded-xl px-3.5 py-2.5 text-stone-100 placeholder-stone-500 focus:outline-none text-xs transition-colors ${fieldErrors.devoteeName ? 'border-rose-500 focus:border-rose-400' : 'border-amber-500/30 focus:border-amber-400'}`}
                  />
                  {fieldErrors.devoteeName && (
                    <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      {fieldErrors.devoteeName}
                    </p>
                  )}
                </div>

                {/* Column 2: Mobile Number */}
                <div>
                  <label className="block text-stone-300 font-medium mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Mobile Number (WhatsApp) * <span className="text-stone-500">(10–20 digits)</span></span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98234 12345"
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value); if (fieldErrors.phone) setFieldErrors(p => ({...p, phone: ''})); }}
                    className={`w-full bg-black/50 border rounded-xl px-3.5 py-2.5 text-stone-100 placeholder-stone-500 focus:outline-none text-xs transition-colors ${fieldErrors.phone ? 'border-rose-500 focus:border-rose-400' : 'border-amber-500/30 focus:border-amber-400'}`}
                  />
                  {fieldErrors.phone && (
                    <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      {fieldErrors.phone}
                    </p>
                  )}
                </div>

                {/* Column 3: Email Address */}
                <div>
                  <label className="block text-stone-300 font-medium mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    <span>Devotee Email (for Receipt/Pass)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. ramesh.tambat@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/50 border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 text-xs transition-colors"
                  />
                </div>

                {/* Column 4: Gotra */}
                <div>
                  <label className="block text-stone-300 font-medium mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Devotee Gotra</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bharadwaj / Kashyap"
                    value={gotra}
                    onChange={(e) => setGotra(e.target.value)}
                    className="w-full bg-black/50 border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 text-xs transition-colors"
                  />
                </div>

                {/* Column 5: City / State */}
                <div>
                  <label className="block text-stone-300 font-medium mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>City / Native Place</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Pune, Maharashtra"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-black/50 border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 text-xs transition-colors"
                  />
                </div>

                {/* Column 6: Family Members Count */}
                <div>
                  <label className="block text-stone-300 font-medium mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-amber-400" />
                    <span>Family Members Attending</span>
                  </label>
                  <select
                    value={familyMembersCount}
                    onChange={(e) => setFamilyMembersCount(Number(e.target.value))}
                    className="w-full bg-black/50 border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-amber-400 text-xs transition-colors cursor-pointer"
                  >
                    <option value={1} className="bg-stone-900 text-stone-100">1 Person (Individual Ritual)</option>
                    <option value={2} className="bg-stone-900 text-stone-100">2 Persons (Couple Sankalpa)</option>
                    <option value={3} className="bg-stone-900 text-stone-100">3 Persons (Family)</option>
                    <option value={4} className="bg-stone-900 text-stone-100">4 Persons</option>
                    <option value={5} className="bg-stone-900 text-stone-100">5+ Persons</option>
                  </select>
                </div>
              </div>

              {/* Devotee Info Hint Card */}
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-400/20 text-stone-300 text-[11px] leading-relaxed flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    Devotee contact details will be logged in the 25 generations hereditary register for Muhurat reminders and sankalp pass issuance.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ════════════ TAB 2: POOJA & MUHURAT SCHEDULE ════════════ */}
          {activeTab === 'pooja' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-1 border-b border-amber-500/20">
                <div className="flex items-center gap-2 text-amber-200 font-semibold font-sanskrit text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>विधी निवड, गुरुजी व मुहूर्त नियोजन (Ritual & Muhurat Schedule)</span>
                </div>
                <span className="text-[10px] text-stone-400 font-mono">Step 2 of 3</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {/* Column 1: Pooja Selection */}
                <div>
                  <label className="block text-stone-300 font-medium mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Pooja / Consecration Type *</span>
                  </label>
                  <select
                    value={poojaType}
                    onChange={(e) => setPoojaType(e.target.value)}
                    className="w-full bg-black/50 border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-amber-400 text-xs transition-colors cursor-pointer"
                  >
                    {ALL_POOJA_OPTIONS.map((p) => (
                      <option key={p} value={p} className="bg-stone-900 text-stone-100">
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Column 2: Assigned Guruji */}
                <div>
                  <label className="block text-stone-300 font-medium mb-1.5 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Assigned Guruji / Purohit</span>
                  </label>
                  <select
                    value={assignedGuruji}
                    onChange={(e) => setAssignedGuruji(e.target.value)}
                    className="w-full bg-black/50 border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-amber-400 text-xs transition-colors cursor-pointer truncate"
                  >
                    {GURUJI_OPTIONS.map((g) => (
                      <option key={g} value={g} className="bg-stone-900 text-stone-100">
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Column 3: Preferred Language */}
                <div>
                  <label className="block text-stone-300 font-medium mb-1.5 flex items-center gap-1.5">
                    <Languages className="w-3.5 h-3.5 text-amber-400" />
                    <span>Preferred Ritual Language</span>
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full bg-black/50 border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-amber-400 text-xs transition-colors cursor-pointer"
                  >
                    {LANGUAGE_OPTIONS.map((lang) => (
                      <option key={lang} value={lang} className="bg-stone-900 text-stone-100">
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Conditional Manual Pooja Name (if 'Other' is chosen) */}
                {poojaType === 'Other (Manual Entry)' && (
                  <div className="col-span-1 md:col-span-2 lg:col-span-3 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-400/40">
                    <label className="block text-amber-200 font-semibold mb-1 flex items-center gap-1.5 text-xs">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Enter Custom / Manual Pooja Name *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pitru Tarpan / Nav Chandi Homa / Griha Pravesh Shanti..."
                      value={customPoojaName}
                      onChange={(e) => setCustomPoojaName(e.target.value)}
                      className="w-full bg-black/70 border border-amber-400/50 rounded-xl px-3.5 py-2.5 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-300 text-xs transition-colors"
                    />
                    <span className="text-[10px] text-amber-300/80 block mt-1">
                      This custom ritual name will be stored in database and printed on the devotee's sacred pass.
                    </span>
                  </div>
                )}

                {/* Column 4: Ritual Date */}
                <div>
                  <label className="block text-stone-300 font-medium mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>Scheduled Ritual Date *</span>
                  </label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="e.g. 05 October 2026"
                    className="w-full bg-black/50 border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-amber-400 text-xs transition-colors"
                  />
                </div>

                {/* Column 5: Muhurat Time */}
                <div>
                  <label className="block text-stone-300 font-medium mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Muhurat Time Slot *</span>
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-black/50 border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-amber-400 text-xs transition-colors cursor-pointer truncate"
                  >
                    {TIME_SLOT_OPTIONS.map((slot) => (
                      <option key={slot} value={slot} className="bg-stone-900 text-stone-100">
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Column 6: Sanctified Location */}
                <div>
                  <label className="block text-stone-300 font-medium mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>Sanctified Location / Kund</span>
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-black/50 border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-amber-400 text-xs transition-colors cursor-pointer truncate"
                  >
                    {LOCATION_OPTIONS.map((loc) => (
                      <option key={loc} value={loc} className="bg-stone-900 text-stone-100">
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Ritual Guidelines Badge */}
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-400/20 text-stone-300 text-[11px] leading-relaxed flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  All 12 authentic Trimbakeshwar Vedic rituals are supported with full samagri guidance. Custom manual rituals can also be recorded for special Havans and Anushthans.
                </span>
              </div>
            </div>
          )}

          {/* ════════════ TAB 3: PAYMENT & LEDGER AUDIT ════════════ */}
          {activeTab === 'payment' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-1 border-b border-amber-500/20">
                <div className="flex items-center gap-2 text-amber-200 font-semibold font-sanskrit text-xs">
                  <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                  <span>देयक नोंद व प्रशासकीय तपशील (Payment & Administrative Record)</span>
                </div>
                <span className="text-[10px] text-stone-400 font-mono">Step 3 of 3</span>
              </div>

              {/* Booking Summary Pill Card */}
              <div className="p-3 rounded-2xl bg-black/40 border border-amber-500/25 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <div className="text-amber-200 font-bold font-sanskrit">
                    {devoteeName || 'Yajaman Name'} • <span className="text-amber-300/80">{phone || 'Phone'}</span>
                  </div>
                  <div className="text-[11px] text-stone-400">
                    {resolvedPoojaName} • {date} ({time.split('(')[0].trim()})
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[10px] font-mono">
                    Token: ₹{advanceAmount}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono">
                    Mode: {paymentMethod}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {/* Column 1: Payment Method */}
                <div>
                  <label className="block text-stone-300 font-medium mb-1.5 flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                    <span>Payment Mode / Method *</span>
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full bg-black/50 border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-amber-400 text-xs transition-colors cursor-pointer"
                  >
                    {PAYMENT_METHODS.map((m) => (
                      <option key={m.value} value={m.value} className="bg-stone-900 text-stone-100">
                        {m.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Column 2: Payment Status */}
                <div>
                  <label className="block text-stone-300 font-medium mb-1.5 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Payment Status in Ledger *</span>
                  </label>
                  <select
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value)}
                    className="w-full bg-black/50 border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-amber-400 text-xs transition-colors cursor-pointer"
                  >
                    {PAYMENT_STATUS_OPTIONS.map((s) => (
                      <option key={s.value} value={s.value} className="bg-stone-900 text-stone-100">
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Column 3: Advance Amount */}
                <div>
                  <label className="block text-stone-300 font-medium mb-1.5 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>Token / Paid Amount (₹)</span>
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={100}
                    value={advanceAmount}
                    onChange={(e) => setAdvanceAmount(Number(e.target.value))}
                    placeholder="1000"
                    className="w-full bg-black/50 border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-amber-400 text-xs transition-colors font-mono"
                  />
                </div>

                {/* Column 4: Receipt / UTR Ref */}
                <div>
                  <label className="block text-stone-300 font-medium mb-1.5 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>Receipt / UTR / Transaction Ref</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Cash Receipt #104 or UPI/4231..."
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                    className="w-full bg-black/50 border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 text-xs transition-colors font-mono"
                  />
                </div>

                {/* Column 5 & 6: Record Created By */}
                <div className="md:col-span-2 lg:col-span-2">
                  <label className="block text-stone-300 font-medium mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-amber-400" />
                    <span>Record Inserted / Created By (Staff or Guruji Name) *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pt. Pravin Shambhu Deshmukh (Desai) or Office Desk"
                    value={createdByName}
                    onChange={(e) => setCreatedByName(e.target.value)}
                    className="w-full bg-black/50 border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 text-xs transition-colors"
                  />
                </div>
              </div>

              {/* Ritual Notes */}
              <div className="pt-2">
                <label className="block text-stone-300 font-medium mb-1.5 flex items-center justify-between">
                  <span>Ritual Sankalp Notes / Special Instructions</span>
                  <span className="text-[10px] text-stone-400 font-normal">Optional (Fasting rules, white dhoti, hotel, samagri)</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Pitru dosha resolution, white dhoti required, hotel arrangement requested, specific samagri notes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-black/50 border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 text-xs resize-none transition-colors"
                />
              </div>
            </div>
          )}

        </form>

        {/* ─── MODAL FOOTER WITH STEP ACTIONS & NAVIGATION ─── */}
        <div className="pt-3.5 px-5 sm:px-6 pb-4 border-t border-amber-500/20 bg-[#160B08]/95 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2">
            {activeTab !== 'devotee' && (
              <button
                type="button"
                onClick={() => {
                  setTabError(null);
                  if (activeTab === 'payment') setActiveTab('pooja');
                  else if (activeTab === 'pooja') setActiveTab('devotee');
                }}
                disabled={isSaving}
                className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 border border-amber-400/20 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>
            )}

            {activeTab === 'devotee' && (
              <button
                type="button"
                onClick={() => {
                  if (!devoteeName.trim() || !phone.trim()) {
                    setTabError('Please provide Devotee Full Name and Mobile Number to proceed.');
                    return;
                  }
                  setTabError(null);
                  setActiveTab('pooja');
                }}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold text-xs shadow-lg shadow-amber-950/50 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Next: Pooja & Muhurat</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {activeTab === 'pooja' && (
              <button
                type="button"
                onClick={() => {
                  if (poojaType === 'Other (Manual Entry)' && !customPoojaName.trim()) {
                    setTabError('Please enter the custom pooja name or select from the list.');
                    return;
                  }
                  setTabError(null);
                  setActiveTab('payment');
                }}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold text-xs shadow-lg shadow-amber-950/50 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Next: Payment & Ledger</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {activeTab === 'payment' && (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSaving}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold text-xs shadow-lg shadow-amber-950/50 flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving to Database…</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm & Save Booking</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
