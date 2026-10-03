import React, { useState, useEffect } from 'react';
import { useNavigation } from '../context/NavigationContext';
import {
  CONTACT_ENTITIES,
  QUICK_CONTACT_ACTIONS,
  CONTACT_FAQS,
  CONTACT_LOCALIZED_TEXT,
  ContactEnquiry,
} from '../data/contactData';
import { GURUJI_LIST, PUJA_LIST } from '../data/siteData';
import { SupportedLanguage, AppRoute } from '../types';
import {
  Phone,
  Mail,
  MessageSquare,
  Clock,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  Languages,
  Send,
  Users,
  Flame,
  Compass,
  ChevronDown,
  Sparkles,
  Building,
  Lock,
  RefreshCw,
  Info,
} from 'lucide-react';
import { SacredMandala, TrishulIcon } from '../components/Motifs';
import { submitContactEnquiry } from '../services/enquiryService';
import { SEO } from '../components/SEO';
import { getPurohitLocalBusinessSchema, getBreadcrumbSchema } from '../utils/seoData';
import { trackEvent } from '../utils/analytics';

export function ContactPage() {
  const { currentRoute, navigate, openBooking } = useNavigation();

  // Determine language from route or default to 'en'
  const getInitialLanguage = (): SupportedLanguage => {
    if (currentRoute.includes('/mr/') || currentRoute.includes('/marathi/')) return 'mr';
    if (currentRoute.includes('/hi/')) return 'hi';
    if (currentRoute.includes('/sa/')) return 'sa';
    if (currentRoute.includes('/gu/')) return 'gu';
    if (currentRoute.includes('/te/')) return 'te';
    if (currentRoute.includes('/kn/')) return 'kn';
    if (currentRoute.includes('/ta/')) return 'ta';
    if (currentRoute.includes('/bn/')) return 'bn';
    if (currentRoute.includes('/or/')) return 'or';
    return 'en';
  };

  const [activeLang, setActiveLang] = useState<SupportedLanguage>(getInitialLanguage);

  // Synchronize when route changes
  useEffect(() => {
    setActiveLang(getInitialLanguage());
  }, [currentRoute]);

  const t = CONTACT_LOCALIZED_TEXT[activeLang] || CONTACT_LOCALIZED_TEXT.en;

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Enquiry',
    message: '',
    preferredContactMethod: 'phone' as 'phone' | 'email' | 'whatsapp',
    languagePreference: activeLang,
    privacyConsent: false,
    botField: '', // Honeypot
  });

  // Validation State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEnquiry, setSubmittedEnquiry] = useState<ContactEnquiry | null>(null);

  // FAQ Accordion State
  const [openFaqId, setOpenFaqId] = useState<string | null>('cfaq-1');

  // Input change handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    }
  };

  // ── Utility: strip HTML tags from a string (XSS client-side guard) ──────
  const stripHtml = (v: string) =>
    v.replace(/<[^>]*>/g, '').replace(/javascript\s*:/gi, '').replace(/on\w+\s*=/gi, '');

  // ── Utility: word count ──────────────────────────────────────────────────
  const wordCount = (v: string) => v.trim() === '' ? 0 : v.trim().split(/\s+/).length;

  // Form Validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name: 2–100 chars, no HTML
    if (!formData.name.trim()) {
      newErrors.name = activeLang === 'mr' ? 'कृपया आपले पूर्ण नाव प्रविष्ट करा.' : activeLang === 'hi' ? 'कृपया अपना पूरा नाम दर्ज करें।' : 'Please enter your full name.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = activeLang === 'mr' ? 'नाव किमान २ अक्षरांचे असावे.' : activeLang === 'hi' ? 'नाम कम से कम २ अक्षरों का होना चाहिए।' : 'Name must be at least 2 characters.';
    } else if (formData.name.trim().length > 100) {
      newErrors.name = 'Name must not exceed 100 characters.';
    } else if (/<[^>]*>/.test(formData.name)) {
      newErrors.name = 'Name must not contain HTML or special markup.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = activeLang === 'mr' ? 'कृपया ईमेल पत्ता प्रविष्ट करा.' : activeLang === 'hi' ? 'कृपया वैध ईमेल पता दर्ज करें।' : 'Please enter your email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = activeLang === 'mr' ? 'अवैध ईमेल पत्ता.' : activeLang === 'hi' ? 'अमान्य ईमेल पता।' : 'Please enter a valid email address.';
    }

    // Phone: min 10 / max 20 digits
    const phoneDigits = formData.phone.replace(/[^0-9]/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = activeLang === 'mr' ? 'कृपया संपर्क क्रमांक प्रविष्ट करा.' : activeLang === 'hi' ? 'कृपया संपर्क नंबर दर्ज करें।' : 'Please enter your contact number.';
    } else if (phoneDigits.length < 10) {
      newErrors.phone = activeLang === 'mr' ? 'कृपया किमान १० अंकी क्रमांक प्रविष्ट करा.' : activeLang === 'hi' ? 'कृपया कम से कम १० अंकों का नंबर दर्ज करें।' : 'Contact number must have at least 10 digits.';
    } else if (phoneDigits.length > 20) {
      newErrors.phone = 'Contact number must not exceed 20 digits.';
    }

    // Message: 10 chars min, 200 words max, no HTML
    const msgWords = wordCount(formData.message);
    if (!formData.message.trim()) {
      newErrors.message = activeLang === 'mr' ? 'कृपया आपला संदेश लिहा.' : activeLang === 'hi' ? 'कृपया अपना संदेश लिखें।' : 'Please write your message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = activeLang === 'mr' ? 'संदेश किमान १० अक्षरांचा असावा.' : activeLang === 'hi' ? 'संदेश कम से कम १० अक्षरों का होना चाहिए।' : 'Message should be at least 10 characters long.';
    } else if (msgWords > 200) {
      newErrors.message = `Message must not exceed 200 words (currently ${msgWords} words).`;
    } else if (/<[^>]*>/.test(formData.message)) {
      newErrors.message = 'Message must not contain HTML tags or script code.';
    }

    // Honeypot check
    if (formData.botField) {
      newErrors.botField = 'Spam detected.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form Submit Handler connecting directly to Spring Boot Backend API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // XSS client-side strip before sending
    const cleanName    = stripHtml(formData.name.trim());
    const cleanEmail   = stripHtml(formData.email.trim());
    const cleanPhone   = stripHtml(formData.phone.trim());
    const cleanMessage = stripHtml(formData.message.trim());
    const cleanSubject = stripHtml(formData.subject);

    try {
      // 1. Send devotee contact enquiry directly to backend Spring Boot API (POST /api/contact)
      const apiResponse = await submitContactEnquiry({
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        subject: cleanSubject,
        poojaRequested: cleanSubject,
        message: cleanMessage,
        preferredContactMethod: formData.preferredContactMethod,
        language: formData.languagePreference,
        botField: formData.botField,
      });

      const generatedId = apiResponse.enquiryNumber || apiResponse.leadCode || `TRK-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

      const newEnquiry: ContactEnquiry = {
        id: `enquiry-${Date.now()}`,
        enquiryNumber: generatedId,
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        subject: cleanSubject,
        message: cleanMessage,
        preferredContactMethod: formData.preferredContactMethod,
        language: formData.languagePreference,
        source: 'contact_page',
        status: 'New',
        createdAt: new Date().toISOString(),
      };

      // 2. Track analytics event
      trackEvent('submit_contact_enquiry', 'lead_generation', cleanSubject);

      // 3. Persist to local devotee store for fast local inspection
      try {
        const stored = JSON.parse(localStorage.getItem('trimbak_devotee_enquiries') || '[]');
        stored.unshift(newEnquiry);
        localStorage.setItem('trimbak_devotee_enquiries', JSON.stringify(stored.slice(0, 50)));
      } catch {
        // storage fallback
      }

      setSubmittedEnquiry(newEnquiry);
    } catch (error) {
      console.error('Submission error:', error);
      const fallbackId = `TRK-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedEnquiry({
        id: `enquiry-${Date.now()}`,
        enquiryNumber: fallbackId,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.subject,
        message: formData.message.trim(),
        preferredContactMethod: formData.preferredContactMethod,
        language: formData.languagePreference,
        source: 'contact_page',
        status: 'New',
        createdAt: new Date().toISOString(),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset Form
  const handleReset = () => {
    setSubmittedEnquiry(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'General Enquiry',
      message: '',
      preferredContactMethod: 'phone',
      languagePreference: activeLang,
      privacyConsent: false,
      botField: '',
    });
    setErrors({});
  };

  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
  ]);

  return (
    <div className="bg-[#FBF6EA] text-[#211D19] min-h-screen pb-20 select-none">
      <SEO
        title="Contact Trimbakeshwar Devotee Seva Helpdesk | Guruji Contact & Location"
        description="Get in touch with the official Trimbakeshwar Devotee Seva Helpdesk and Hereditary Vatandar Purohit Pt. Pravin Shambhu Deshmukh. Office located at Kushavart Tirth Chowk, Trimbakeshwar."
        canonicalPath="/contact"
        keywords={[
          'Trimbakeshwar contact number',
          'Trimbakeshwar Guruji phone number',
          'Trimbakeshwar temple helpline',
          'Pt Pravin Deshmukh contact',
          'Trimbakeshwar address',
          'Kushavarta Kund location',
        ]}
        schema={[getPurohitLocalBusinessSchema(), breadcrumbsSchema]}
      />
      {/* =========================================================================
          1. BREADCRUMBS ROW
          ========================================================================= */}
      <div className="bg-[#2B0A0A] text-amber-200/80 text-xs px-4 sm:px-8 py-2.5 border-b border-amber-900/40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap">
            <button
              onClick={() => navigate('/')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>&gt;</span>
            <span className="text-amber-300 font-semibold">Contact</span>
          </div>

          {/* Language Indicator in Top Bar */}
          <div className="hidden sm:flex items-center gap-2 text-[11px] text-amber-200/90">
            <Languages className="w-3.5 h-3.5 text-[#B88935]" />
            <span>Language:</span>
            <span className="font-bold text-white uppercase">{activeLang}</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. CONTACT HERO SECTION
          ========================================================================= */}
      <section className="relative bg-gradient-to-b from-[#2B0A0A] via-[#431111] to-[#5A1717] text-white pt-12 sm:pt-16 pb-16 sm:pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Authentic Background Image Layer */}
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="/assets/hero-section.png"
            alt="Trimbakeshwar Temple Background"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Sacred Vignette & Mandala Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FBF6EA] via-transparent to-black/60 z-0" />

        {/* Ambient Rotating Sacred Chakra Watermark */}
        <div className="absolute top-1/2 -right-24 sm:-right-12 -translate-y-1/2 opacity-20 sm:opacity-25 pointer-events-none hidden sm:block">
          <SacredMandala className="w-72 sm:w-96 h-72 sm:h-96 animate-[spin_120s_linear_infinite] drop-shadow-[0_0_30px_rgba(212,175,55,0.2)]" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-4">
          {/* Eyebrow Mantra */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-[#B88935]/50 text-amber-200 text-xs sm:text-sm font-devanagari tracking-wider shadow-sm">
            <TrishulIcon className="w-4 h-4 text-amber-300 shrink-0" />
            <span>{t.heroEyebrow} • श्री त्र्यम्बकेश्वराय नमः</span>
          </div>

          {/* Headings */}
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">
              {t.heroTitle}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-amber-200 font-serif italic">
              {t.heroSubtitle}
            </p>
          </div>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-stone-200 text-xs sm:text-sm leading-relaxed font-sans">
            {t.heroDesc}
          </p>

          {/* Multilingual Selector Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-1.5">
            {(
              [
                ['en', 'English'],
                ['mr', 'मराठी'],
                ['hi', 'हिंदी'],
                ['sa', 'संस्कृतम्'],
                ['gu', 'ગુજરાતી'],
                ['te', 'తెలుగు'],
                ['kn', 'ಕನ್ನಡ'],
                ['ta', 'தமிழ்'],
                ['bn', 'বাংলা'],
                ['or', 'ଓଡ଼ିଆ'],
              ] as [SupportedLanguage, string][]
            ).map(([code, label]) => (
              <button
                key={code}
                onClick={() => setActiveLang(code)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${activeLang === code
                    ? 'bg-[#B88935] text-[#211D19] font-bold shadow-xs'
                    : 'bg-black/30 hover:bg-black/50 text-white/80 border border-white/10'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. QUICK CONTACT ACTIONS (4 CARDS)
          ========================================================================= */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-10 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {QUICK_CONTACT_ACTIONS.map((action) => {
            const title =
              activeLang === 'mr'
                ? action.title.mr
                : activeLang === 'hi'
                  ? action.title.hi
                  : action.title.en;
            const subtitle =
              activeLang === 'mr'
                ? action.subtitle.mr
                : activeLang === 'hi'
                  ? action.subtitle.hi
                  : action.subtitle.en;
            const cta =
              activeLang === 'mr'
                ? action.ctaText.mr
                : activeLang === 'hi'
                  ? action.ctaText.hi
                  : action.ctaText.en;

            return (
              <div
                key={action.id}
                className="bg-white border border-[#B88935]/40 rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col justify-between space-y-3 hover:border-[#5A1717] transition-all group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#EDE3D1] text-[#5A1717] flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                    {action.icon === 'MessageSquare' && <MessageSquare className="w-5 h-5" />}
                    {action.icon === 'Flame' && <Flame className="w-5 h-5" />}
                    {action.icon === 'Users' && <Users className="w-5 h-5" />}
                    {action.icon === 'Compass' && <Compass className="w-5 h-5" />}
                  </div>
                  <h3 className="text-xs sm:text-sm font-heading font-bold text-[#5A1717]">
                    {title}
                  </h3>
                  <p className="text-[11px] text-stone-600 mt-1 leading-snug line-clamp-2">
                    {subtitle}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-100">
                  {action.isScroll ? (
                    <a
                      href={action.target}
                      className="text-xs font-bold text-[#5A1717] group-hover:text-[#C56A18] inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>{cta}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  ) : (
                    <button
                      onClick={() => navigate(action.target as AppRoute)}
                      className="text-xs font-bold text-[#5A1717] group-hover:text-[#C56A18] inline-flex items-center gap-1 cursor-pointer text-left"
                    >
                      <span>{cta}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 space-y-16">
        {/* =========================================================================
            4. MAIN TWO-COLUMN SECTION: CONTACT INFO (LEFT) + FORM (RIGHT)
            ========================================================================= */}
        <section id="contact-form-section" className="scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: CONTACT INFORMATION & CHANNELS (45%) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white border border-[#B88935]/30 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
                <div className="space-y-1 pb-3 border-b border-stone-200">
                  <span className="text-[10px] font-bold text-[#C56A18] uppercase tracking-wider block font-heading">
                    {activeLang === 'mr' ? 'अधिकृत संपर्क' : activeLang === 'hi' ? 'सत्यापित संपर्क' : 'VERIFIED CONTACT'}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#5A1717]">
                    {t.infoPanelHeading}
                  </h2>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {t.infoPanelDesc}
                  </p>
                </div>

                {/* Sourced from CMS Entities (Single Source of Truth) */}
                <div className="space-y-4">
                  {CONTACT_ENTITIES.filter((e) => e.status === 'active').map((entity) => (
                    <div
                      key={entity.id}
                      className="p-4 rounded-2xl bg-[#FBF6EA] border border-stone-200/90 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-[10px] uppercase font-bold text-[#C56A18] tracking-wider">
                            {entity.department}
                          </div>
                          <h4 className="text-xs sm:text-sm font-heading font-bold text-[#5A1717]">
                            {entity.displayName}
                          </h4>
                          <div className="text-[11px] text-stone-500">{entity.designation}</div>
                        </div>

                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-200 shrink-0">
                          <ShieldCheck className="w-3 h-3" />
                          <span>{entity.verificationStatus}</span>
                        </span>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-stone-200/60 text-xs">
                        {entity.phone && (
                          <div className="flex items-center justify-between">
                            <span className="text-stone-500">Phone:</span>
                            <a
                              href={`tel:${entity.phone.replace(/\s+/g, '')}`}
                              className="font-mono font-bold text-[#5A1717] hover:text-[#C56A18] flex items-center gap-1"
                            >
                              <Phone className="w-3.5 h-3.5 text-[#C56A18]" />
                              <span>{entity.phone}</span>
                            </a>
                          </div>
                        )}

                        {entity.whatsapp && (
                          <div className="flex items-center justify-between">
                            <span className="text-stone-500">WhatsApp:</span>
                            <a
                              href={`https://wa.me/${entity.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Namaskar, I have an enquiry regarding Trimbakeshwar pilgrimage.')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mono font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>{entity.whatsapp}</span>
                            </a>
                          </div>
                        )}

                        {entity.email && (
                          <div className="flex items-center justify-between">
                            <span className="text-stone-500">Email:</span>
                            <a
                              href={`mailto:${entity.email}`}
                              className="font-mono text-stone-700 hover:text-[#5A1717] flex items-center gap-1 truncate max-w-[200px]"
                            >
                              <Mail className="w-3.5 h-3.5 text-[#C56A18]" />
                              <span className="truncate">{entity.email}</span>
                            </a>
                          </div>
                        )}

                        <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>Timing:</span>
                          </span>
                          <span>{entity.availability}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Direct Action Buttons */}
                <div className="pt-2 grid grid-cols-2 gap-2">
                  <a
                    href="tel:+919689973967"
                    className="py-2.5 px-3 rounded-xl bg-[#5A1717] hover:bg-[#6D1B1B] text-amber-200 text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Helpline</span>
                  </a>
                  <a
                    href={`https://wa.me/919689973967?text=${encodeURIComponent('Namaskar Guruji, I would like guidance regarding Trimbakeshwar Puja.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Seva</span>
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: CONTACT FORM (55%) */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-[#B88935]/40 rounded-3xl p-6 sm:p-10 shadow-lg relative">
                {/* Decorative Top Trim */}
                <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-[#5A1717] via-[#B88935] to-[#5A1717] rounded-t-3xl" />

                {submittedEnquiry ? (
                  /* Form Success State */
                  <div className="py-8 text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-inner">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div className="space-y-2 max-w-md mx-auto">
                      <h3 className="text-2xl font-heading font-bold text-[#5A1717]">
                        {t.successHeading}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                        {t.successMsg}
                      </p>
                    </div>

                    {/* Enquiry Reference ID Card */}
                    <div className="p-4 rounded-2xl bg-[#FBF6EA] border border-[#B88935]/40 max-w-sm mx-auto space-y-1">
                      <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">
                        {t.enquiryIdLabel}
                      </span>
                      <div className="font-mono text-lg font-bold text-[#5A1717] tracking-wider">
                        #{submittedEnquiry.enquiryNumber}
                      </div>
                      <p className="text-[11px] text-stone-500">
                        Please save this reference ID for any follow-up communications.
                      </p>
                    </div>

                    {/* Success Actions */}
                    <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                      <button
                        onClick={handleReset}
                        className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#5A1717] bg-[#EDE3D1] hover:bg-[#B88935]/20 border border-[#B88935]/40 transition-colors cursor-pointer"
                      >
                        Submit Another Enquiry
                      </button>
                      <button
                        onClick={() => navigate('/puja')}
                        className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#211D19] bg-gradient-to-r from-amber-300 to-[#B88935] hover:brightness-105 transition-all cursor-pointer shadow-xs"
                      >
                        {t.exploreBtn}
                      </button>
                    </div>
                  </div>
                ) : (
                  /* The Contact Form */
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div className="space-y-1 pb-2 border-b border-stone-100">
                      <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#5A1717]">
                        {t.formHeading}
                      </h2>
                      <p className="text-xs text-stone-600">
                        {t.formDesc}
                      </p>
                    </div>

                    {/* Honeypot Field for anti-spam (invisible to users) */}
                    <input
                      type="text"
                      name="botField"
                      value={formData.botField}
                      onChange={handleChange}
                      style={{ display: 'none' }}
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    {/* Full Name */}
                    <div className="space-y-1">
                      <label htmlFor="contact-name" className="block text-xs font-bold text-stone-800">
                        {t.nameLabel}
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t.namePlaceholder}
                        className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm transition-colors ${errors.name
                            ? 'border-red-400 bg-red-50/50 focus:border-red-600 focus:ring-red-600'
                            : 'border-stone-300 bg-white focus:border-[#5A1717] focus:ring-1 focus:ring-[#5A1717]'
                          }`}
                      />
                      {errors.name && (
                        <p className="text-[11px] text-red-600 flex items-center gap-1 mt-0.5">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email & Contact Number Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email */}
                      <div className="space-y-1">
                        <label htmlFor="contact-email" className="block text-xs font-bold text-stone-800">
                          {t.emailLabel}
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={t.emailPlaceholder}
                          className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm transition-colors ${errors.email
                              ? 'border-red-400 bg-red-50/50 focus:border-red-600'
                              : 'border-stone-300 bg-white focus:border-[#5A1717] focus:ring-1 focus:ring-[#5A1717]'
                            }`}
                        />
                        {errors.email && (
                          <p className="text-[11px] text-red-600 flex items-center gap-1 mt-0.5">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            <span>{errors.email}</span>
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="space-y-1">
                        <label htmlFor="contact-phone" className="block text-xs font-bold text-stone-800">
                          {t.phoneLabel}
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder={t.phonePlaceholder}
                          className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm transition-colors ${errors.phone
                              ? 'border-red-400 bg-red-50/50 focus:border-red-600'
                              : 'border-stone-300 bg-white focus:border-[#5A1717] focus:ring-1 focus:ring-[#5A1717]'
                            }`}
                        />
                        {errors.phone && (
                          <p className="text-[11px] text-red-600 flex items-center gap-1 mt-0.5">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            <span>{errors.phone}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Subject Dropdown */}
                    <div className="space-y-1">
                      <label htmlFor="contact-subject" className="block text-xs font-bold text-stone-800">
                        {t.subjectLabel}
                      </label>
                      <select
                        id="contact-subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-white focus:border-[#5A1717] focus:ring-1 focus:ring-[#5A1717] text-xs sm:text-sm text-stone-800"
                      >
                        <option value="General Enquiry">General Enquiry / सामान्य विचारणा</option>
                        <option value="Puja Information">Puja Information / पूजा विधी माहिती</option>
                        <option value="Puja Booking Assistance">Puja Booking Assistance / विधी नोंदणी सहाय्य</option>
                        <option value="Guruji Enquiry">Guruji Consultation / गुरुजींशी संपर्क</option>
                        <option value="Temple Visit">Temple Visit & Darshan / दर्शन व यात्रा नियोजन</option>
                        <option value="Website Support">Website Support / पोर्टल सहाय्य</option>
                        <option value="Feedback">Feedback & Suggestions / अभिप्राय व सूचना</option>
                        <option value="Partnership">Partnership / Collaboration</option>
                        <option value="Other">Other / इतर</option>
                      </select>
                    </div>

                    {/* Message Area */}
                    <div className="space-y-1">
                      <label htmlFor="contact-message" className="block text-xs font-bold text-stone-800">
                        {t.messageLabel}
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={t.messagePlaceholder}
                        className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm transition-colors ${errors.message
                            ? 'border-red-400 bg-red-50/50 focus:border-red-600'
                            : 'border-stone-300 bg-white focus:border-[#5A1717] focus:ring-1 focus:ring-[#5A1717]'
                          }`}
                      />
                      {errors.message && (
                        <p className="text-[11px] text-red-600 flex items-center gap-1 mt-0.5">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.message}</span>
                        </p>
                      )}
                      {/* Live word counter */}
                      {(() => {
                        const wc = wordCount(formData.message);
                        return (
                          <p className={`text-[11px] mt-0.5 text-right ${wc > 200 ? 'text-red-600 font-semibold' : 'text-stone-400'}`}>
                            {wc} / 200 words
                          </p>
                        );
                      })()}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 px-6 rounded-xl bg-[#5A1717] hover:bg-[#6D1B1B] text-[#FBF6EA] text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed border border-[#B88935]/40"
                      >
                        {isSubmitting ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                            <span>{t.submittingBtn}</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 text-amber-300" />
                            <span>{t.submitBtn}</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Security & Privacy Micro-Badge */}
                    <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 pt-1">
                      <Lock className="w-3.5 h-3.5 text-stone-400" />
                      <span>Your information is held in strict devotee confidentiality. No spam.</span>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. PUJA ASSISTANCE SECTION (6 TRADITIONAL PUJAS)
            ========================================================================= */}
        <section className="bg-white border border-[#B88935]/30 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200">
            <div>
              <span className="text-[10px] font-bold text-[#C56A18] uppercase tracking-wider block font-heading">
                पूजा मार्गदर्शन • SHASTRA-MANDATED VIDHI
              </span>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#5A1717]">
                {t.pujaHelpHeading}
              </h2>
            </div>
            <button
              onClick={() => navigate('/puja')}
              className="text-xs font-bold text-[#5A1717] hover:text-[#C56A18] inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Explore All Puja Guides</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-3xl">
            {t.pujaHelpDesc}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {PUJA_LIST.map((p) => (
              <button
                key={p.id}
                onClick={() => navigate(`/puja/${p.slug}` as AppRoute)}
                className="rounded-2xl bg-white border border-stone-200 hover:border-[#B88935] hover:shadow-md transition-all text-left group cursor-pointer overflow-hidden flex flex-col"
              >
                {/* Puja Image */}
                <div className="relative h-32 overflow-hidden bg-stone-900 shrink-0">
                  <img
                    src={p.image || p.imageUrl || '/assets/trimbak/narayan-nagbali.webp'}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] text-amber-300 font-devanagari border border-amber-400/30">
                    {p.marathiName}
                  </div>
                </div>
                {/* Card Body */}
                <div className="p-3 flex flex-col gap-1">
                  <div className="text-xs font-heading font-bold text-[#5A1717] leading-tight">
                    {p.name}
                  </div>
                  <div className="text-[10px] text-[#C56A18] font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {p.duration}
                  </div>
                  <div className="text-[10px] text-stone-500 leading-tight line-clamp-2 mt-0.5">
                    {p.tagline}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-[#EDE3D1]/60 border border-[#B88935]/40 text-xs text-stone-700 flex items-start gap-2">
            <Info className="w-4 h-4 text-[#C56A18] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <em>Note on Shastra conformity:</em> All rituals are traditionally conducted by authorized Shukla Yajurvedic Purohits according to Garuda Purana and Dharma Sindhu mandates. No supernatural or magical outcomes are promised.
            </p>
          </div>
        </section>

        {/* =========================================================================
            6. GURUJI DIRECTORY CALLOUT
            ========================================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-stone-200">
            <div>
              <span className="text-[10px] font-bold text-[#C56A18] uppercase tracking-wider block font-heading">
                गुरुजी संपर्क • HEREDITARY PUROHITS
              </span>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#5A1717]">
                {t.gurujiSectionHeading}
              </h2>
            </div>
            <button
              onClick={() => navigate('/guruji')}
              className="text-xs font-bold text-[#5A1717] hover:text-[#C56A18] inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View Verified Guruji Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GURUJI_LIST.slice(0, 3).map((g) => (
              <div
                key={g.id}
                className="bg-white border border-[#B88935]/30 rounded-2xl p-4 shadow-xs flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={g.avatar}
                    alt={g.name}
                    className="w-12 h-12 rounded-full object-cover object-top border border-[#B88935]/50 shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-heading font-bold text-[#5A1717] truncate">
                      {g.name}
                    </h4>
                    <div className="text-[10px] text-stone-500 font-devanagari truncate">
                      {g.titleNative}
                    </div>
                    <div className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                      <ShieldCheck className="w-3 h-3" />
                      <span>{g.experienceYears}+ Years Exp.</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => openBooking(g.id)}
                  className="px-3 py-1.5 rounded-lg bg-[#5A1717] text-amber-200 text-xs font-bold hover:bg-[#6D1B1B] transition-colors shrink-0 cursor-pointer"
                >
                  Contact
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            7. VISIT TRIMBAKESHWAR PRACTICAL GUIDE CARD
            ========================================================================= */}
        <section className="bg-gradient-to-br from-[#2E0B0B] via-[#4A1212] to-[#5A1717] text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-[#B88935]/40 space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-[10px] uppercase tracking-widest text-amber-300 font-bold font-heading">
              तीर्थक्षेत्र दर्शन • PILGRIM PRACTICAL GUIDE
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
              {t.visitSectionHeading}
            </h2>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
              {t.visitSectionDesc}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => navigate('/darshan')}
              className="p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-amber-300/50 transition-all text-left space-y-1 group cursor-pointer"
            >
              <Clock className="w-5 h-5 text-amber-300 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-white">Darshan Timings</div>
              <div className="text-[10px] text-stone-300">05:30 AM - 09:00 PM</div>
            </button>
            <button
              onClick={() => navigate('/temple-guide')}
              className="p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-amber-300/50 transition-all text-left space-y-1 group cursor-pointer"
            >
              <Building className="w-5 h-5 text-amber-300 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-white">Dress Etiquette</div>
              <div className="text-[10px] text-stone-300">Traditional Dhoti & Saree</div>
            </button>
            <button
              onClick={() => navigate('/travel')}
              className="p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-amber-300/50 transition-all text-left space-y-1 group cursor-pointer"
            >
              <Compass className="w-5 h-5 text-amber-300 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-white">How to Reach</div>
              <div className="text-[10px] text-stone-300">Road, Train, Airport</div>
            </button>
            <button
              onClick={() => navigate('/temple')}
              className="p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-amber-300/50 transition-all text-left space-y-1 group cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-amber-300 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-white">Temple History</div>
              <div className="text-[10px] text-stone-300">Peshwa Black Basalt</div>
            </button>
          </div>

          <div className="text-[11px] text-amber-200/80 bg-black/30 p-3 rounded-xl border border-amber-300/20">
            <strong>Devotee Advisory:</strong> Mandir darshan timings and Suvarna Mukut Darshan (every Monday 04:00 PM - 05:00 PM) may vary during Shravan, Mahashivratri, and Kumbh Mela. Always confirm prior to travel.
          </div>
        </section>

        {/* =========================================================================
            8. CONTACT MINI FAQ ACCORDION
            ========================================================================= */}
        <section className="space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-[#C56A18] uppercase tracking-wider block font-heading">
              वारंवार विचारले जाणारे प्रश्न • FAQS
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#5A1717]">
              {t.faqHeading}
            </h2>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {CONTACT_FAQS.map((faq) => {
              const isOpen = openFaqId === faq.id;
              const question =
                activeLang === 'mr'
                  ? faq.question.mr
                  : activeLang === 'hi'
                    ? faq.question.hi
                    : faq.question.en;
              const answer =
                activeLang === 'mr'
                  ? faq.answer.mr
                  : activeLang === 'hi'
                    ? faq.answer.hi
                    : faq.answer.en;

              return (
                <div
                  key={faq.id}
                  className="bg-white border border-stone-200/90 rounded-2xl overflow-hidden shadow-xs transition-all"
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 hover:bg-stone-50/50 cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-heading font-bold text-[#5A1717]">
                      {question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#5A1717]' : ''
                        }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-4 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 font-sans space-y-2">
                      <p>{answer}</p>
                      {faq.linkRoute && faq.linkLabel && (
                        <div className="pt-1">
                          <button
                            onClick={() => navigate(faq.linkRoute as AppRoute)}
                            className="text-xs font-bold text-[#5A1717] hover:text-[#C56A18] inline-flex items-center gap-1 cursor-pointer"
                          >
                            <span>{faq.linkLabel}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => navigate('/faqs')}
              className="px-5 py-2 rounded-xl bg-[#EDE3D1] hover:bg-[#B88935]/20 text-[#5A1717] text-xs font-bold transition-colors cursor-pointer"
            >
              View Complete FAQ Database →
            </button>
          </div>
        </section>

        {/* =========================================================================
            9. TRUST & TRANSPARENCY SECTION
            ========================================================================= */}
        <section className="bg-white border border-[#B88935]/30 rounded-3xl p-6 sm:p-10 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-heading font-bold text-[#5A1717]">
                {t.trustHeading}
              </h3>
              <p className="text-xs text-stone-600">
                {t.trustDesc}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-xl bg-[#FBF6EA] border border-stone-200">
              <div className="font-bold text-[#5A1717]">No Commercial Middlemen</div>
              <p className="text-stone-600 text-[11px] mt-0.5">
                Devotees talk directly to verified hereditary Purohits without commissions or touts.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-[#FBF6EA] border border-stone-200">
              <div className="font-bold text-[#5A1717]">Vedic Scriptural Fidelity</div>
              <p className="text-stone-600 text-[11px] mt-0.5">
                Rituals strictly adhere to Shukla Yajurveda traditions and customary lineage practices.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-[#FBF6EA] border border-stone-200">
              <div className="font-bold text-[#5A1717]">Transparent Dakshina & Samagri</div>
              <p className="text-stone-600 text-[11px] mt-0.5">
                Clear guidance on samagri provisions, stay arrangements, and traditional rituals.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            10. FINAL SPIRITUAL CTA
            ========================================================================= */}
        <section className="relative bg-gradient-to-r from-[#5A1717] via-[#4A1212] to-[#2E0B0B] text-white rounded-3xl p-8 sm:p-12 border border-[#B88935]/40 shadow-xl overflow-hidden text-center space-y-4">
          <div className="text-sm font-devanagari text-amber-300 font-bold tracking-widest uppercase">
            ॥ हर हर महादेव ॥
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white">
            {t.finalCtaHeading}
          </h3>
          <p className="text-stone-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed font-sans">
            {t.finalCtaDesc}
          </p>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => navigate('/temple')}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-stone-900 bg-amber-300 hover:bg-amber-400 transition-colors cursor-pointer"
            >
              Explore Temple
            </button>
            <button
              onClick={() => openBooking()}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#B88935] hover:bg-[#A3782E] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              style={{ whiteSpace: 'nowrap' }}
            >
              Book Puja
            </button>
            <button
              onClick={() => navigate('/about')}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-amber-200 border border-amber-400/40 hover:bg-white/10 transition-colors cursor-pointer"
            >
              About Purohit Sangh
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
