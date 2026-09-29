import React, { useState, useEffect } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { GURUJI_LIST, PUJA_LIST } from '../data/siteData';
import {
  ORGANIZATION_DATA,
  ABOUT_VALUES,
  VERIFICATION_LEVELS,
  PLATFORM_PILLARS,
  ABOUT_FAQS,
} from '../data/aboutData';
import { AppRoute, SupportedLanguage } from '../types';
import {
  ShieldCheck,
  Flame,
  Users,
  BookOpen,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Languages,
  Sparkles,
  ChevronDown,
  FileText,
  Smartphone,
  Calendar,
  Compass,
  Award,
  AlertCircle,
  Eye,
  Check,
  Building,
  Scroll,
  Maximize2,
  X,
} from 'lucide-react';
import { SacredMandala, TrishulIcon, TempleIcon, PranamHandsIcon, VedicScrollIcon, LotusIcon, PanchangIcon, OmSymbol } from '../components/Motifs';

function renderAboutValueIcon(id: string) {
  switch (id) {
    case 'shraddha':
      return <TrishulIcon className="w-6 h-6 text-[#C56A18]" />;
    case 'seva':
      return <PranamHandsIcon className="w-6 h-6 text-[#C56A18]" />;
    case 'sanskar':
      return <OmSymbol className="w-6 h-6 text-[#C56A18]" />;
    case 'parampara':
    case 'gyan':
      return <VedicScrollIcon className="w-6 h-6 text-[#C56A18]" />;
    case 'transparency':
      return <TempleIcon className="w-6 h-6 text-[#C56A18]" />;
    default:
      return <TrishulIcon className="w-6 h-6 text-[#C56A18]" />;
  }
}

const LANGUAGE_GREETINGS: Record<string, { name: string; native: string; greeting: string }> = {
  en: { name: 'English', native: 'English', greeting: 'Welcome to Trimbakeshwar Jyotirlinga Seva Portal' },
  hi: { name: 'Hindi', native: 'हिंदी', greeting: 'त्र्यंबकेश्वर ज्योतिर्लिंग सेवा पोर्टल में आपका स्वागत है' },
  mr: { name: 'Marathi', native: 'मराठी', greeting: 'श्री त्र्यंबकेश्वर ज्योतिर्लिंग सेवा मंचामध्ये आपले स्वागत आहे' },
  sa: { name: 'Sanskrit', native: 'संस्कृतम्', greeting: 'त्र्यम्बकेश्वरक्षेत्रे भक्तानां हार्दं स्वागतम्' },
  gu: { name: 'Gujarati', native: 'ગુજરાતી', greeting: 'ત્ર્યંબકેશ્વર જ્યોતિર્લિંગ સેવા પોર્ટલમાં આપનું સ્વાગત છે' },
  te: { name: 'Telugu', native: 'తెలుగు', greeting: 'శ్రీ త్రయంబకేశ్వర జ్యోతిర్లింగ సేవా పోర్టల్‌కు స్వాగతం' },
  kn: { name: 'Kannada', native: 'ಕನ್ನಡ', greeting: 'ಶ್ರೀ ತ್ರ್ಯಂಬಕೇಶ್ವರ ಜ್ಯೋತಿರ್ಲಿಂಗ ಸೇವಾ ಪೋರ್ಟಲ್‌ಗೆ ಸುಸ್ವಾಗತ' },
  ta: { name: 'Tamil', native: 'தமிழ்', greeting: 'ஸ்ரீ திரியம்பகேஸ்வரர் ஜோதிர்லிங்க சேவை போர்ட்டலுக்கு நல்வரவு' },
  bn: { name: 'Bengali', native: 'বাংলা', greeting: 'শ্রী ত্র্যম্বকেশ্বর জ্যোতির্লিঙ্গ সেবা পোর্টালে স্বাগতম' },
  or: { name: 'Odia', native: 'ଓଡ଼ିଆ', greeting: 'ଶ୍ରୀ ତ୍ର୍ୟମ୍ବକେଶ୍ୱର ଜ୍ୟୋତିର୍ଲିଙ୍ଗ ସେବା ପୋର୍ଟାଲକୁ ସ୍ୱାଗତ' },
};

export function AboutPage() {
  const { navigate, openBooking } = useNavigation();

  // Active language for About Us view
  const [activeLang, setActiveLang] = useState<SupportedLanguage>('en');

  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Lightbox / Image Preview Modal State
  const [selectedPreviewImage, setSelectedPreviewImage] = useState<{
    src: string;
    alt: string;
    title: string;
    badge: string;
    description: string;
  } | null>(null);

  // Close image modal on Escape key and lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPreviewImage(null);
    };
    if (selectedPreviewImage) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedPreviewImage]);

  // Toggle FAQ item
  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="bg-[#FBF6EA] text-[#211D19] min-h-screen pb-20 select-none">
      {/* =========================================================================
          HERO SECTION: Cinematic Sanatan Heritage
          ========================================================================= */}
      <section className="relative bg-gradient-to-b from-[#2B0A0A] via-[#431111] to-[#5A1717] text-white pt-24 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-6 overflow-hidden">
        {/* Background Image Layer with Morning Mist */}
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="/assets/hero-section.png"
            alt="Trimbakeshwar Temple Background"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Sanatan Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FBF6EA] via-transparent to-black/60 z-0" />

        {/* Ambient Rotating Sacred Chakra Watermark */}
        <div className="absolute top-1/2 -right-24 sm:-right-12 -translate-y-1/2 opacity-20 sm:opacity-25 pointer-events-none hidden sm:block">
          <SacredMandala className="w-72 sm:w-96 h-72 sm:h-96 animate-[spin_120s_linear_infinite] drop-shadow-[0_0_30px_rgba(212,175,55,0.2)]" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10 text-center space-y-5">
          {/* Sacred Mantra Invocation */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-[#B88935]/50 text-amber-200 text-xs sm:text-sm font-devanagari tracking-wider shadow-sm">
            <TrishulIcon className="w-4 h-4 text-amber-300 shrink-0" />
            <span>॥ ॐ नमः शिवाय • श्री त्र्यम्बकेश्वराय नमः ॥</span>
          </div>

          {/* Main Dual Heading */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight leading-tight">
              आमच्याबद्दल • About Us
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-amber-200/90 font-serif italic max-w-3xl mx-auto">
              A Digital Bridge Between Devotees and the Purohit Tradition of Trimbakeshwar
            </p>
          </div>

          {/* Subtitle / Description */}
          <p className="max-w-2xl mx-auto text-stone-200 text-xs sm:text-sm md:text-base leading-relaxed font-sans">
            Discover the spiritual heritage of Trimbakeshwar, learn about traditional Shastra-prescribed Puja practices, and connect directly with certified hereditary Gurujis through a transparent digital platform.
          </p>

          {/* Language Switcher Bar on Top */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-1.5 text-xs text-amber-200">
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] uppercase font-bold text-amber-300 mr-1">
              <Languages className="w-3.5 h-3.5" />
              <span>Language:</span>
            </span>
            {(['en', 'mr', 'hi', 'sa'] as SupportedLanguage[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveLang(lang)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeLang === lang
                    ? 'bg-[#B88935] text-[#211D19] shadow-sm font-bold'
                    : 'bg-black/30 hover:bg-black/50 text-white/80 border border-white/10'
                }`}
              >
                {LANGUAGE_GREETINGS[lang]?.native || lang}
              </button>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#tradition-section"
              className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold text-[#211D19] bg-gradient-to-r from-amber-300 via-[#D4AF37] to-[#B88935] hover:brightness-105 shadow-md active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Our Tradition</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => navigate('/guruji')}
              className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-amber-200 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all cursor-pointer"
            >
              Find a Guruji
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          HERO TRUST STRIP (No unsupported numerical claims)
          ========================================================================= */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-6 sm:-mt-8 relative z-20">
        <div className="bg-white border border-[#B88935]/40 rounded-2xl p-4 sm:p-5 shadow-lg grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-stone-200">
          <div className="pt-2 md:pt-0 flex flex-col items-center justify-center space-y-1">
            <TempleIcon className="w-6 h-6 text-[#C56A18]" />
            <span className="text-xs font-heading font-bold text-[#5A1717]">Trimbakeshwar Jyotirlinga</span>
            <span className="text-[10px] text-stone-500 font-devanagari">द्वादश ज्योतिर्लिंग तीर्थ</span>
          </div>
          <div className="pt-2 md:pt-0 flex flex-col items-center justify-center space-y-1">
            <PranamHandsIcon className="w-6 h-6 text-[#C56A18]" />
            <span className="text-xs font-heading font-bold text-[#5A1717]">Purohit Tradition</span>
            <span className="text-[10px] text-stone-500 font-devanagari">वंशपरंपरागत वैदिक सेवा</span>
          </div>
          <div className="pt-2 md:pt-0 flex flex-col items-center justify-center space-y-1">
            <TrishulIcon className="w-6 h-6 text-[#C56A18]" />
            <span className="text-xs font-heading font-bold text-[#5A1717]">Traditional Puja Seva</span>
            <span className="text-[10px] text-stone-500 font-devanagari">शास्त्रोक्त विधी व संकल्प</span>
          </div>
          <div className="pt-2 md:pt-0 flex flex-col items-center justify-center space-y-1">
            <Languages className="w-6 h-6 text-[#C56A18]" />
            <span className="text-xs font-heading font-bold text-[#5A1717]">Multilingual Platform</span>
            <span className="text-[10px] text-stone-500 font-devanagari">१० भारतीय भाषांमध्ये सहाय्य</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 space-y-16">
        {/* =========================================================================
            SECTION 1: WELCOME (Editorial Split Layout)
            ========================================================================= */}
        {/* =========================================================================
            SECTION 1: WELCOME (Editorial Full Width Layout)
            ========================================================================= */}
        <section className="bg-white border border-[#B88935]/30 rounded-3xl p-6 sm:p-10 shadow-xs space-y-4">
          <div className="space-y-4 max-w-4xl">
            <div className="inline-block px-3 py-1 rounded-full bg-[#EDE3D1] text-[#5A1717] font-bold text-[10px] uppercase tracking-wider">
              श्री त्र्यंबकेश्वरमध्ये आपले स्वागत आहे
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#5A1717] leading-tight">
              Welcome to Trimbakeshwar: Sacred Abode of the Tridev Jyotirlinga
            </h2>
            <div className="text-xs sm:text-sm text-stone-700 leading-relaxed space-y-3 font-sans">
              <p>
                Welcome to a dedicated digital platform created to share authentic knowledge about Trimbakeshwar, its ancient temple heritage, Shastra-mandated Puja practices, and the living Purohit tradition.
              </p>
              <p>
                Trimbakeshwar Mahadev Temple is traditionally revered as one of the twelve sacred Jyotirlinga Kshetras of Bhagwan Shiva, nestled at the foothills of the holy Brahmagiri Mountain where the sacred River Gautami Godavari originates in Nashik, Maharashtra.
              </p>
              <p className="p-3.5 bg-[#EDE3D1]/60 rounded-xl border-l-4 border-[#B88935] font-devanagari text-xs text-[#5A1717] italic">
                त्र्यंबकेश्वर हे भगवान शिवाच्या द्वादश ज्योतिर्लिंगांपैकी एक पवित्र तीर्थक्षेत्र म्हणून श्रद्धेने मानले जाते. या माध्यमातून त्र्यंबकेश्वरचा आध्यात्मिक वारसा, पूजा-अनुष्ठान, पुरोहित परंपरा आणि भक्तांसाठी उपयुक्त माहिती सुलभपणे उपलब्ध करून देण्याचा प्रयत्न केला जातो.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            HEREDITARY ROYAL VATANDAR & TAMRAPATRA HERITAGE SECTION
            ========================================================================= */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#3B0E0E] via-[#501515] to-[#240808] text-white border-2 border-[#D4AF37]/50 shadow-2xl p-6 sm:p-10 lg:p-12 space-y-8">
          {/* Ambient Rotating Sacred Chakra Watermark */}
          <div className="absolute -top-12 -right-12 w-64 h-64 opacity-15 pointer-events-none">
            <SacredMandala className="w-full h-full animate-[spin_120s_linear_infinite]" />
          </div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none" />

          {/* Section Heading */}
          <div className="relative z-10 max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B88935]/30 border border-[#D4AF37]/60 text-amber-200 text-[11px] font-bold uppercase tracking-wider shadow-xs">
              <Scroll className="w-3.5 h-3.5 text-amber-300" />
              <span>ताम्रपत्र अधिकार • २५ पिढ्यांचे वंशपरंपरागत वतनदार</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white tracking-tight leading-tight">
              Hereditary Tirth Purohits of Shri Kshetra Trimbakeshwar
            </h2>
            <p className="text-xs sm:text-sm font-devanagari text-amber-200/90 font-medium">
              छत्रपती शिवाजी महाराजांच्या काळापासून संपूर्ण त्र्यंबकेश्वर गावाचे ऐतिहासिक वतन व २५ पिढ्यांचा अखंड सेवा वारसा
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Dual Cards Stacked One Above Other in Each Row (Guruji Photo First on Top + Historic Tamrapatra Charter Below) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Top: Guruji Photo Card (Click opens view modal) */}
              <div
                onClick={() =>
                  setSelectedPreviewImage({
                    src: '/assets/guruji.png',
                    alt: 'Pt. Pravin Shambhu Deshmukh (Desai) Guruji at Shri Trimbakeshwar Jyotirlinga',
                    title: 'वेदमूर्ती पं. प्रवीण शंभू देशमुख (देसाई)',
                    badge: 'मुख्य पुरोहित • २५ पिढ्यांचे वंशपरंपरागत वतनदार',
                    description:
                      'श्री क्षेत्र त्र्यंबकेश्वर ज्योतिर्लिंग गर्भगृहात प्रत्यक्ष पूजेचा पावन क्षण. छत्रपती शिवाजी महाराजांच्या काळापासून संपूर्ण त्र्यंबकेश्वर गावाचे ऐतिहासिक वतनदार तीर्थ पुरोहित.',
                  })
                }
                className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/60 shadow-2xl bg-black/60 group p-2.5 flex flex-col justify-between cursor-pointer hover:border-amber-300 transition-all hover:scale-[1.01]"
              >
                <div className="relative overflow-hidden rounded-xl bg-stone-950/80">
                  <img
                    src="/assets/guruji.png"
                    alt="Pt. Pravin Shambhu Deshmukh (Desai) Guruji"
                    className="w-full h-72 sm:h-80 object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/80 border border-amber-400/50 text-[10px] font-bold text-amber-300 font-devanagari shadow-sm">
                    मुख्य पुरोहित
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-black/75 border border-amber-400/40 text-[11px] font-medium text-amber-200 flex items-center gap-1.5 shadow-md backdrop-blur-xs group-hover:bg-amber-400/20 group-hover:border-amber-300 transition-all">
                    <Maximize2 className="w-3.5 h-3.5 text-amber-300" />
                    <span>मोठे पहा • View Full</span>
                  </div>
                </div>
                <div className="p-3 text-center bg-black/70 rounded-xl border border-amber-400/20 mt-2">
                  <span className="text-sm font-bold text-amber-200 font-devanagari block leading-tight">
                    वेदमूर्ती पं. प्रवीण शंभू देशमुख (देसाई)
                  </span>
                  <span className="text-[11px] text-stone-300 block mt-1">
                    २५ पिढ्यांचे वंशपरंपरागत वतनदार तीर्थ पुरोहित
                  </span>
                </div>
              </div>

              {/* Bottom: Tamrapatra Copper Charter Card (Click opens view modal) */}
              <div
                onClick={() =>
                  setSelectedPreviewImage({
                    src: '/assets/tamprpatra.png',
                    alt: 'Historic Tamrapatra Copper Plate Charter of Trimbakeshwar Guruji',
                    title: 'ऐतिहासिक ताम्रपत्र व सनद पुरावा',
                    badge: 'ऐतिहासिक सनद • छत्रपती शिवाजी महाराज कालीन',
                    description:
                      'छत्रपती शिवाजी महाराजांच्या सुवर्णकाळापासून संपूर्ण त्र्यंबकेश्वर गावाचे अधिकृत वंशपरंपरागत वतन व पुरोहित हक्क प्रमाणित करणारे अस्सल ऐतिहासिक ताम्रपत्र व सनद पुरावा.',
                  })
                }
                className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/60 shadow-2xl bg-black/60 group p-2.5 flex flex-col justify-between cursor-pointer hover:border-amber-300 transition-all hover:scale-[1.01]"
              >
                <div className="relative overflow-hidden rounded-xl bg-stone-950/80 flex items-center justify-center p-2.5">
                  <img
                    src="/assets/tamprpatra.png"
                    alt="Historic Tamrapatra Copper Plate Charter of Trimbakeshwar Guruji"
                    className="w-full h-72 sm:h-80 object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/80 border border-amber-400/50 text-[10px] font-bold text-amber-300 font-devanagari shadow-sm">
                    ऐतिहासिक सनद
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-black/75 border border-amber-400/40 text-[11px] font-medium text-amber-200 flex items-center gap-1.5 shadow-md backdrop-blur-xs group-hover:bg-amber-400/20 group-hover:border-amber-300 transition-all">
                    <Maximize2 className="w-3.5 h-3.5 text-amber-300" />
                    <span>मोठे पहा • View Full</span>
                  </div>
                </div>
                <div className="p-3 text-center bg-black/70 rounded-xl border border-amber-400/20 mt-2">
                  <span className="text-sm font-bold text-amber-300 font-devanagari block leading-tight">
                    ऐतिहासिक ताम्रपत्र व सनद पुरावा
                  </span>
                  <span className="text-[11px] text-stone-300 block mt-1">
                    छत्रपती शिवाजी महाराज कालीन संपूर्ण गावाचे वतन
                  </span>
                </div>
              </div>
            </div>

            {/* Right: User's Official Content & Rituals List */}
            <div className="lg:col-span-7 space-y-5">
              <div className="bg-black/45 backdrop-blur-xs border border-amber-300/30 rounded-2xl p-5 sm:p-6 shadow-inner space-y-4">
                <p className="text-xs sm:text-sm md:text-[15px] text-stone-100 font-sans leading-relaxed">
                  We are hereditary Tirth Purohits of Shri Kshetra Trimbakeshwar. Since the golden era of Chhatrapati Shivaji Maharaj, our family was bestowed with the historic royal Vatan (hereditary custodianship) of the entire Trimbakeshwar village. Since then, all religious ceremonies, sacred Havans, and Shastric rituals of this holy kshetra are performed directly by our authentic Purohit hands. Serving pilgrims for over 25 unbroken generations, we conduct all traditional Vedic rituals including Narayan Nagbali, Kaal Sarp Yog Shanti, Tripindi Shraddha, Maha Mrityunjaya Japa & Havan, Rudrabhishek, Mahabhishek, Laghurudra, Maharudra, Graha Nakshatra Shanti, Vastu Shanti, Navachandi Yaag, Ganesh Yaag, and Udak Shanti with authentic Shastric devotion.
                </p>
              </div>

              {/* 3 Heritage Stat Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-white/5 border border-amber-400/20 text-center">
                  <span className="text-amber-300 font-bold text-base block font-heading">25+ Generations</span>
                  <span className="text-[10px] text-stone-300 block font-devanagari">अखंड वंशपरंपरा</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-amber-400/20 text-center">
                  <span className="text-amber-300 font-bold text-base block font-heading">Royal Vatan</span>
                  <span className="text-[10px] text-stone-300 block font-devanagari">छत्रपती शिवाजी महाराज कालीन</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-amber-400/20 text-center">
                  <span className="text-amber-300 font-bold text-base block font-heading">Direct Purohit</span>
                  <span className="text-[10px] text-stone-300 block font-devanagari">थेट अधिकृत संकल्प</span>
                </div>
              </div>

              {/* Sacred Rituals Tag Cloud */}
              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block">
                  Sacred Rituals Performed With Authentic Shastric Devotion:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Narayan Nagbali',
                    'Kaal Sarp Yog Shanti',
                    'Tripindi Shraddha',
                    'Maha Mrityunjaya Japa & Havan',
                    'Rudrabhishek',
                    'Mahabhishek',
                    'Laghurudra',
                    'Maharudra',
                    'Graha Nakshatra Shanti',
                    'Vastu Shanti',
                    'Navachandi Yaag',
                    'Ganesh Yaag',
                    'Udak Shanti',
                  ].map((ritual) => (
                    <span
                      key={ritual}
                      className="px-2.5 py-1 rounded-lg bg-amber-400/10 border border-amber-300/30 text-amber-200 text-xs font-medium"
                    >
                      {ritual}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => openBooking()}
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-[#211D19] bg-gradient-to-r from-amber-300 via-[#D4AF37] to-[#B88935] hover:brightness-105 shadow-md active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <TempleIcon className="w-4 h-4" />
                  <span>Book Sacred Vidhi With Guruji</span>
                </button>
                <button
                  onClick={() => navigate('/guruji')}
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-amber-200 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <PranamHandsIcon className="w-4 h-4" />
                  <span>Meet Pt. Pravin Shambhu Deshmukh</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: TRIMBAKESHWAR HERITAGE (Visual + Sanskrit Overlay)
            ========================================================================= */}
        <section className="relative rounded-3xl overflow-hidden border border-[#B88935]/40 shadow-xl bg-stone-900 text-white p-8 sm:p-12 text-center space-y-5">
          <div className="absolute inset-0 z-0 opacity-30">
            <img
              src="/assets/trimbak/brahmagiri-parvat.webp"
              alt="Brahmagiri Sahyadri Mountain Range"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80 z-0" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <div className="text-xs uppercase tracking-widest text-amber-300 font-bold font-heading">
              त्र्यंबकेश्वरचा आध्यात्मिक वारसा • SACRED PILGRIMAGE HERITAGE
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white">
              Centuries of Unbroken Devotion, Sanskrit Learning & Vedic Rites
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-stone-300 leading-relaxed font-sans">
              Trimbakeshwar is a sacred confluence associated with the penance of Sage Gautama, the descent of River Godavari, and the unique Tridev Jyotirlinga manifesting Brahma, Vishnu, and Mahesh in a single sacred cavity.
            </p>

            {/* Sacred 4-Pillar Overlay */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-sm sm:text-base font-devanagari text-amber-200">
              <span className="px-3.5 py-1 rounded-full bg-black/50 border border-amber-300/40">श्रद्धा (Faith)</span>
              <span className="px-3.5 py-1 rounded-full bg-black/50 border border-amber-300/40">सेवा (Service)</span>
              <span className="px-3.5 py-1 rounded-full bg-black/50 border border-amber-300/40">संस्कार (Values)</span>
              <span className="px-3.5 py-1 rounded-full bg-black/50 border border-amber-300/40">परंपरा (Tradition)</span>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: PUROHIT SANGH (Responsible & Transparent Architecture)
            ========================================================================= */}
        <section id="tradition-section" className="bg-white border border-[#B88935]/30 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200 gap-3">
            <div>
              <span className="text-[11px] font-bold text-[#C56A18] uppercase tracking-wider block">
                संस्था परिचय • PUROHIT SANGH
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#5A1717]">
                Trimbakeshwar Purohit Sangh
              </h2>
            </div>

            {/* CMS-Controlled Verification Status Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-semibold self-start sm:self-auto">
              <ShieldCheck className="w-4 h-4 text-[#C56A18]" />
              <span>Status: {ORGANIZATION_DATA.verificationStatus}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
              <p>
                The <strong>Trimbakeshwar Purohit Sangh</strong> represents the traditional community and organizing body of local hereditary Vedic Purohits residing in the holy town of Trimbakeshwar.
              </p>
              <p>
                For generations, these Purohit families have preserved the Shukla Yajurveda traditions, guiding visiting pilgrims (Yajmans) through sacred rites such as Narayan Nagbali, Tripindi Shraddha, Kaal Sarp Yog Shanti, and Kumbh Vivah.
              </p>
              <div className="p-4 bg-[#FBF6EA] rounded-2xl border border-stone-200 space-y-2 text-xs">
                <div className="font-bold text-[#5A1717] flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-[#C56A18]" />
                  <span>Institutional Reference Data (As Published by Organization):</span>
                </div>
                <ul className="space-y-1 text-stone-600 list-disc list-inside">
                  <li><strong>Community Strength:</strong> {ORGANIZATION_DATA.purohitCountClaim}</li>
                  <li><strong>Registration Reference:</strong> {ORGANIZATION_DATA.registrationClaim}</li>
                  <li><strong>Verification Source:</strong> {ORGANIZATION_DATA.verifiedBy}</li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#EDE3D1]/50 border border-[#B88935]/40 rounded-2xl p-5 space-y-3">
              <h4 className="text-xs font-bold text-[#5A1717] uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#C56A18]" />
                <span>Our Principles of Representation</span>
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                In strict commitment to truth and transparency, our platform publishes organization-supplied details while clearly distinguishing between verified facts, traditional customs, and community records.
              </p>
              <div className="pt-2 border-t border-[#B88935]/20 text-[11px] text-stone-500 italic">
                &ldquo;परंपरा ही केवळ वारसा नाही; ती जपण्याची जबाबदारी आहे.&rdquo;
              </div>
            </div>
          </div>
        </section>


        {/* =========================================================================
            SECTION 7 & 8: TAMRAPATRA & VERIFICATION FRAMEWORK
            ========================================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Section 7: Understanding Tamrapatra */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[#2E0B0B] to-[#4A1212] text-white rounded-3xl p-6 sm:p-8 shadow-md border border-[#B88935]/40 space-y-4">
            <div className="inline-block px-3 py-1 rounded-full bg-[#B88935] text-[#211D19] font-bold text-[10px] uppercase tracking-wider">
              ताम्रपत्र • HISTORICAL RECORDS
            </div>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
              Understanding the Tamrapatra Tradition
            </h3>
            {/* Tamrapatra Image Preview */}
            <div className="rounded-2xl overflow-hidden border border-amber-300/30 bg-black/50 p-3 flex items-center gap-4">
              <img
                src="/assets/tamprpatra.png"
                alt="Historic Tamrapatra Copper Charter"
                className="w-24 h-20 object-contain rounded-lg border border-amber-400/20 bg-stone-950/70 p-1 shrink-0"
              />
              <div className="text-xs text-amber-200/90 leading-relaxed font-sans">
                <span className="font-bold text-amber-100 block text-xs sm:text-sm font-devanagari">
                  छत्रपती शिवाजी महाराज कालीन ताम्रपत्र
                </span>
                Historic royal copper inscription and hereditary Vatan charter preserved across 25 generations.
              </div>
            </div>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
              Tamrapatra refers to ancient engraved copper-plate inscriptions referenced in the Trimbakeshwar Purohit tradition. Historically, royal rulers and Maratha Peshwas granted copper inscriptions to recognize traditional community service.
            </p>
            <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed font-sans">
              <em>&ldquo;According to the Purohit Sangh&apos;s published information, Tamrapatra is an important traditional identifier associated with the Purohit lineage and its Puja service tradition.&rdquo;</em>
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate('/articles/what-is-meant-by-tamrapatra' as AppRoute)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#211D19] bg-gradient-to-r from-amber-300 to-[#B88935] hover:brightness-105 transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Read Full Tamrapatra Article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Section 8: Verification & Transparency Framework */}
          <div className="lg:col-span-6 bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
            <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase tracking-wider">
              विश्वासासाठी पारदर्शकता • VERIFICATION
            </div>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#5A1717]">
              Multi-Tier Verification Framework
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Rather than making unverified claims, this platform implements a structured verification framework:
            </p>

            <div className="space-y-2.5">
              {VERIFICATION_LEVELS.map((tier) => (
                <div
                  key={tier.id}
                  className="p-3 rounded-xl border border-stone-200 bg-stone-50/70 flex items-start justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="font-bold text-[#5A1717]">{tier.title}</div>
                    <div className="text-[11px] text-stone-500 font-devanagari">{tier.marathiTitle}</div>
                    <p className="text-[11px] text-stone-600 mt-0.5">{tier.description}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border shrink-0 ${tier.badgeColor}`}>
                    {tier.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: NAMAVALI TRADITION
            ========================================================================= */}
        <section className="bg-white border border-[#B88935]/30 rounded-3xl p-6 sm:p-10 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200">
            <div>
              <span className="text-[11px] font-bold text-[#C56A18] uppercase tracking-wider block">
                नामावली परंपरा • HISTORICAL PILGRIM LEDGERS
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#5A1717]">
                The Heritage of Namavali Registers
              </h2>
            </div>
            <span className="text-xs text-stone-500 font-medium">Ancestral Pilgrim Records</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed">
              <p>
                In the Trimbakeshwar tradition, <strong>Namavali</strong> refers to historical handwritten ledgers and bahi-khatas preserved by hereditary Purohit families across centuries.
              </p>
              <p>
                When devotees visit Trimbak, their names, Gotras, ancestral village names, and dates of holy pilgrimage are recorded in these family registers. Devotees returning decades later are often shown the signatures and dates of their grandfathers and great-grandfathers.
              </p>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C56A18] shrink-0 mt-0.5" />
                <span>
                  <strong>Privacy Mandate:</strong> In accordance with strict devotee privacy guidelines, historical and personal family records are preserved respectfully and never publicly exposed online without authorization.
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#EDE3D1] rounded-2xl p-5 border border-[#B88935]/40 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#5A1717] text-amber-200 flex items-center justify-center mx-auto shadow-sm">
                <VedicScrollIcon className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-heading font-bold text-[#5A1717]">
                Connecting Ancestors & Descendants
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                A living documentary bridge celebrating centuries of devotion across generations of pilgrims.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: MEET THE GURUJI (Real Backend Data)
            ========================================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-stone-200">
            <div>
              <span className="text-[11px] font-bold text-[#C56A18] uppercase tracking-wider block">
                गुरुजी • पुरोहित सेवा • AUTHORIZED GURUJIS
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#5A1717]">
                Meet the Listed Hereditary Purohits
              </h2>
            </div>
            <button
              onClick={() => navigate('/guruji')}
              className="text-xs font-bold text-[#5A1717] hover:text-[#C56A18] inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Explore All Verified Gurujis</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {GURUJI_LIST.slice(0, 3).map((guruji) => (
              <div
                key={guruji.id}
                className="bg-white border border-[#B88935]/30 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={guruji.avatar}
                    alt={guruji.name}
                    className="w-14 h-14 rounded-full object-cover object-top border-2 border-[#B88935]/50 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-heading font-bold text-[#5A1717] truncate">
                        {guruji.name}
                      </h4>
                    </div>
                    <div className="text-[11px] text-stone-500 font-devanagari">
                      {guruji.titleNative || guruji.title}
                    </div>
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-semibold mt-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>{guruji.isCertified ? 'Verified Purohit' : 'Profile Listed'}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-100">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400">Experience:</span>
                    <span className="font-semibold text-stone-800">{guruji.experienceYears}+ Years</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400">Languages:</span>
                    <span className="font-semibold text-stone-800">{guruji.languages.slice(0, 3).join(', ')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400">Tradition:</span>
                    <span className="text-stone-700 truncate">{guruji.purohitParampara}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center gap-2">
                  <button
                    onClick={() => navigate(`/guruji/${guruji.id}` as AppRoute)}
                    className="flex-1 py-1.5 px-2 rounded-lg bg-[#EDE3D1] hover:bg-[#B88935]/20 text-[#5A1717] text-xs font-bold text-center transition-colors cursor-pointer"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => openBooking(guruji.id)}
                    className="flex-1 py-1.5 px-2 rounded-lg bg-[#5A1717] hover:bg-[#6D1B1B] text-amber-200 text-xs font-bold text-center transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    <span className="whitespace-nowrap shrink-0" style={{ whiteSpace: 'nowrap' }}>Book Puja</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: TRADITIONAL PUJA SERVICES OVERVIEW
            ========================================================================= */}
        <section className="bg-white border border-[#B88935]/30 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-[11px] font-bold text-[#C56A18] uppercase tracking-wider block">
              पूजा • विधी • अनुष्ठान • TRADITIONAL PUJAS
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#5A1717]">
              Shastra-Prescribed Rituals at Trimbakeshwar
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Explore detailed information regarding sacred rituals traditionally performed at Trimbakeshwar according to ancient Vedic scriptures.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {PUJA_LIST.map((puja) => (
              <div
                key={puja.id}
                className="p-4 rounded-2xl bg-[#FBF6EA] border border-stone-200/90 flex flex-col justify-between space-y-3 hover:border-[#B88935] transition-all"
              >
                <div>
                  <TrishulIcon className="w-5 h-5 text-[#C56A18] mb-1.5" />
                  <h4 className="text-sm font-heading font-bold text-[#5A1717]">
                    {puja.name}
                  </h4>
                  <div className="text-xs font-devanagari text-[#C56A18]">
                    {puja.marathiName}
                  </div>
                  <p className="text-[11px] text-stone-600 mt-1.5 line-clamp-2 leading-relaxed">
                    {puja.description || puja.tagline}
                  </p>
                </div>
                <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-xs">
                  <span className="text-stone-500 text-[10px]">{puja.duration}</span>
                  <button
                    onClick={() => navigate(`/puja/${puja.slug}` as AppRoute)}
                    className="text-[#5A1717] font-bold hover:text-[#C56A18] inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => navigate('/puja')}
              className="px-6 py-2.5 rounded-full text-xs font-bold text-[#211D19] bg-gradient-to-r from-amber-300 to-[#B88935] hover:brightness-105 transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>Explore All Puja Services & Guidelines</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>

        {/* =========================================================================
            SECTION 12 & 13: WHY THIS PLATFORM EXISTS & HOW IT WORKS
            ========================================================================= */}
        <section className="space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-[11px] font-bold text-[#C56A18] uppercase tracking-wider block">
              या डिजिटल व्यासपीठामागचा हेतू • WHY WE EXIST
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#5A1717]">
              Eliminating Confusion & Empowering Devotees
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              We bring reliable temple information, verified Guruji profiles, and procedural knowledge together into one transparent digital sanctuary.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {PLATFORM_PILLARS.map((pillar) => (
              <div
                key={pillar.step}
                className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-3"
              >
                <div className="text-xs font-bold font-heading text-[#C56A18]">
                  PILLAR {pillar.step}
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-heading font-bold text-[#5A1717]">
                    {pillar.title}
                  </h4>
                  <div className="text-xs font-devanagari text-stone-500">
                    {pillar.marathiTitle}
                  </div>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* =========================================================================
            SECTION 16: MULTILINGUAL MISSION (10 Indian Languages)
            ========================================================================= */}
        <section className="bg-white border border-[#B88935]/30 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-[11px] font-bold text-[#C56A18] uppercase tracking-wider block">
              एक श्रद्धा • अनेक भाषा • MULTILINGUAL MISSION
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#5A1717]">
              One Sacred Journey in 10 Indian Languages
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Devotees come to Trimbakeshwar from Maharashtra, Gujarat, Karnataka, Tamil Nadu, Andhra Pradesh, Odisha, Bengal, and across Bharat. We support them in their mother tongue.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {Object.entries(LANGUAGE_GREETINGS).map(([code, lang]) => (
              <div
                key={code}
                className="p-3 rounded-xl bg-[#FBF6EA] border border-stone-200 text-center space-y-1"
              >
                <div className="text-xs font-bold text-[#5A1717]">{lang.native}</div>
                <div className="text-[10px] text-stone-500 uppercase">{lang.name}</div>
                <p className="text-[9px] text-stone-600 italic line-clamp-2 mt-1">
                  &ldquo;{lang.greeting}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION 17 & 18: CORE VALUES (श्रद्धा, सेवा, संस्कार, परंपरा, ज्ञान, पारदर्शकता)
            ========================================================================= */}
        <section className="space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-[11px] font-bold text-[#C56A18] uppercase tracking-wider block">
              आमची मूल्ये • OUR CORE VALUES
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#5A1717]">
              Guiding Principles of Our Seva
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Every interaction on this portal is grounded in devotion, integrity, and reverence for Vedic heritage.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
            {ABOUT_VALUES.map((val) => (
              <div
                key={val.id}
                className="bg-white border border-[#B88935]/30 rounded-2xl p-4 sm:p-5 shadow-xs space-y-2 hover:border-[#5A1717] transition-all"
              >
                <div className="mb-1">{renderAboutValueIcon(val.id)}</div>
                <div>
                  <div className="text-base font-devanagari font-bold text-[#5A1717]">
                    {val.sanskrit}
                  </div>
                  <div className="text-xs font-heading font-semibold text-[#C56A18]">
                    {val.english}
                  </div>
                  <p className="text-[11px] text-stone-600 mt-1 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION 20: DIGITAL + TRADITION (Ancient Heritage Meets Modern Technology)
            ========================================================================= */}
        <section className="bg-white border border-[#B88935]/30 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-[11px] font-bold text-[#C56A18] uppercase tracking-wider block">
              परंपरा व तंत्रज्ञान • ANCIENT MEETS MODERN
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#5A1717]">
              &ldquo;परंपरा जपताना तंत्रज्ञानाचा योग्य उपयोग.&rdquo;
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Using technology thoughtfully to make sacred traditions and hereditary Purohit guidance accessible without compromising sanctity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center pt-2">
            <div className="bg-[#FBF6EA] border border-stone-200 rounded-2xl p-5 text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-[#C56A18]">
                <VedicScrollIcon className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-heading font-bold text-[#5A1717]">
                Ancient Heritage
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Centuries-old copper plates (Tamrapatra), hand-written ledgers (Namavali), and Shukla Yajurveda hymns.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center p-3 text-center space-y-1">
              <div className="w-10 h-10 rounded-full bg-[#5A1717] text-amber-200 flex items-center justify-center text-sm font-bold shadow-sm">
                +
              </div>
              <span className="text-xs font-bold text-[#C56A18] uppercase tracking-wider">
                Digital Seva Bridge
              </span>
              <span className="text-[11px] text-stone-500">
                Transparent & Direct
              </span>
            </div>

            <div className="bg-[#FBF6EA] border border-stone-200 rounded-2xl p-5 text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-[#C56A18]">
                <Smartphone className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-heading font-bold text-[#5A1717]">
                Modern Devotee Experience
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Mobile-first access to verified profiles, dress guidelines, booking requests, and multilingual resources.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 21: FORMAL ORGANIZATION INFORMATION (CMS Data)
            ========================================================================= */}
        <section className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
          <div className="pb-3 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[11px] font-bold text-[#C56A18] uppercase tracking-wider block">
                संस्थेविषयी माहिती • ORGANIZATION RECORD
              </span>
              <h2 className="text-2xl font-heading font-bold text-[#5A1717]">
                Official Directory & Contact Information
              </h2>
            </div>
            <span className="text-xs text-stone-500 font-medium">Single Source of Truth</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-stone-700">
            <div className="space-y-4">
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Organization Name</span>
                <span className="font-bold text-[#5A1717] text-base">{ORGANIZATION_DATA.name}</span>
                <span className="text-stone-500 block text-xs font-devanagari">{ORGANIZATION_DATA.nativeName}</span>
              </div>

              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Official Mandir Address</span>
                <div className="flex items-start gap-2 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#C56A18] shrink-0 mt-0.5" />
                  <a
                    href="https://share.google/YsotIiu38IlI8yFEu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-[#5A1717] font-semibold flex items-center gap-1 group"
                    title="Open in Google Maps"
                  >
                    <span>{ORGANIZATION_DATA.officialAddress}</span>
                    <span className="text-[10px] text-amber-600 underline ml-1 font-normal">(View on Google Maps)</span>
                  </a>
                </div>
              </div>

              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Liaison Office Address</span>
                <div className="flex items-start gap-2 mt-0.5">
                  <Building className="w-4 h-4 text-[#C56A18] shrink-0 mt-0.5" />
                  <span>{ORGANIZATION_DATA.backOfficeAddress}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Devotee Pilgrim Helpline</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <Phone className="w-4 h-4 text-[#C56A18] shrink-0" />
                  <span className="font-semibold text-stone-900">{ORGANIZATION_DATA.helpline}</span>
                </div>
              </div>

              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Official Seva Email</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <Mail className="w-4 h-4 text-[#C56A18] shrink-0" />
                  <span>{ORGANIZATION_DATA.email}</span>
                </div>
              </div>

              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-bold">Support & Inquiry Hours</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <Clock className="w-4 h-4 text-[#C56A18] shrink-0" />
                  <span>{ORGANIZATION_DATA.officeHours}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-500 leading-relaxed">
                {ORGANIZATION_DATA.disclaimer}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 23: FREQUENTLY ASKED QUESTIONS (ACCORDION)
            ========================================================================= */}
        <section className="space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-[11px] font-bold text-[#C56A18] uppercase tracking-wider block">
              आपल्या मनातील प्रश्न • FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#5A1717]">
              Clear Answers on Trimbakeshwar Tradition & Seva
            </h2>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {ABOUT_FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              const q =
                activeLang === 'mr'
                  ? faq.question.mr
                  : activeLang === 'hi'
                  ? faq.question.hi
                  : faq.question.en;
              const a =
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
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 hover:bg-stone-50/50 cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-heading font-bold text-[#5A1717]">
                      {q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#5A1717]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-4 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 font-sans">
                      {a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            SECTION 24: FINAL SPIRITUAL CTA
            ========================================================================= */}
        <section className="relative bg-gradient-to-r from-[#5A1717] via-[#4A1212] to-[#2E0B0B] text-white rounded-3xl p-8 sm:p-12 border border-[#B88935]/40 shadow-xl overflow-hidden text-center space-y-4">
          <div className="text-sm font-devanagari text-amber-300 font-bold tracking-widest uppercase">
            ॥ हर हर महादेव ॥
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white">
            परंपरेशी जोडा • ज्ञानाशी जोडा • श्रद्धेशी जोडा
          </h3>
          <p className="text-stone-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Connect with centuries of sacred tradition. Discover authentic Shastric knowledge, plan your pilgrimage, and consult directly with certified hereditary Gurujis.
          </p>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => navigate('/temple')}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-stone-900 bg-amber-300 hover:bg-amber-400 transition-colors cursor-pointer"
            >
              Explore Trimbakeshwar
            </button>
            <button
              onClick={() => navigate('/guruji')}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#B88935] hover:bg-[#A3782E] transition-colors cursor-pointer"
            >
              Find a Guruji
            </button>
            <button
              onClick={() => navigate('/puja')}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-amber-200 border border-amber-400/40 hover:bg-white/10 transition-colors cursor-pointer"
            >
              Explore Puja Vidhis
            </button>
          </div>
        </section>
      </div>

      {/* =========================================================================
          IMAGE PREVIEW / LIGHTBOX MODAL
          ========================================================================= */}
      {selectedPreviewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 transition-all animate-in fade-in duration-200"
          onClick={() => setSelectedPreviewImage(null)}
        >
          <div
            className="relative bg-gradient-to-b from-[#2B0E0E] to-[#140606] border-2 border-[#D4AF37]/70 rounded-3xl overflow-hidden max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-amber-400/20 flex items-center justify-between bg-black/40">
              <div className="space-y-0.5 pr-4">
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[10px] font-bold font-devanagari">
                  {selectedPreviewImage.badge}
                </div>
                <h3 className="text-base sm:text-xl font-bold font-heading text-amber-100 font-devanagari leading-snug">
                  {selectedPreviewImage.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPreviewImage(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm transition-colors shrink-0 border border-white/20 cursor-pointer"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image View Area */}
            <div className="p-3 sm:p-6 flex-1 overflow-auto flex items-center justify-center bg-black/70 min-h-[300px]">
              <img
                src={selectedPreviewImage.src}
                alt={selectedPreviewImage.alt}
                className="max-h-[64vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-amber-400/20"
              />
            </div>

            {/* Modal Footer Description */}
            <div className="p-4 sm:p-5 border-t border-amber-400/20 bg-black/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <p className="text-stone-300 font-devanagari text-xs sm:text-[13px] leading-relaxed max-w-2xl">
                {selectedPreviewImage.description}
              </p>
              <button
                type="button"
                onClick={() => setSelectedPreviewImage(null)}
                className="px-5 py-2 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 border border-amber-400/40 text-xs font-bold transition-all shrink-0 cursor-pointer"
              >
                बंद करा (Close)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
