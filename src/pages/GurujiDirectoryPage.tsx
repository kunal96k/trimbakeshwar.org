import React, { useState, useMemo, useEffect } from 'react';
import { InnerPageHero } from '../components/InnerPageHero';
import { GURUJI_LIST } from '../data/siteData';
import { useNavigation } from '../context/NavigationContext';
import {
  ShieldCheck,
  Phone,
  MessageSquare,
  Search,
  Award,
  BookOpen,
  Check,
  Maximize2,
  X,
  Scroll,
  Calendar,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { TrishulIcon, TempleIcon, PranamHandsIcon, SacredMandala } from '../components/Motifs';

export function GurujiDirectoryPage() {
  const { navigate, openBooking } = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

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

  const allSpecialties = [
    'All',
    'Narayan Nagbali',
    'Tripindi Shraddha',
    'Kaal Sarp Yog',
    'Maha Mrityunjaya',
    'Rudrabhishek',
    'Maharudra',
    'Vastu Shanti',
    'Navachandi Yaag',
  ];
  const allLanguages = ['All', 'Marathi', 'Hindi', 'Gujarati', 'English', 'Sanskrit'];

  const filteredGurujis = useMemo(() => {
    return GURUJI_LIST.filter((g) => {
      const matchesSearch =
        g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.titleNative.includes(searchQuery) ||
        g.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesLang =
        selectedLanguage === 'All' || g.languages.includes(selectedLanguage);

      const matchesSpec =
        selectedSpecialty === 'All' ||
        g.specialties.some((s) => s.toLowerCase().includes(selectedSpecialty.toLowerCase()));

      return matchesSearch && matchesLang && matchesSpec;
    });
  }, [searchQuery, selectedLanguage, selectedSpecialty]);

  return (
    <div className="bg-[#FBF6EA] text-[#211D19] min-h-screen pb-16">
      <InnerPageHero
        breadcrumbs={[{ label: 'Guruji Directory' }]}
        sanskritMantra="॥ विद्वान् सर्वत्र पूज्यते • वंशपरंपरागत पुरोहित सेवा ॥"
        title="Authorized Hereditary Vedic Guruji"
        nativeTitle="श्री क्षेत्र त्र्यंबकेश्वर अधिकृत वंशपरंपरागत वतनदार पुरोहित"
        description="Connect directly with our 25th generation royal vatandar tirth purohit family bestowed with the historic custodianship of Trimbakeshwar Kshetra since the era of Chhatrapati Shivaji Maharaj."
        bgImage="/assets/hero-section.png"
        ctaText="Book Puja with Guruji"
        onCtaClick={() => openBooking()}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 space-y-10">
        {/* Verification Guarantee Banner */}
        <section className="bg-gradient-to-r from-[#3B0E0E] via-[#501515] to-[#2B0A0A] text-white border-2 border-[#D4AF37]/50 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 opacity-10 pointer-events-none">
            <SacredMandala className="w-full h-full animate-[spin_120s_linear_infinite]" />
          </div>

          <div className="flex items-start sm:items-center gap-4 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-[#B88935] text-[#211D19] flex items-center justify-center shrink-0 shadow-lg">
              <Scroll className="w-7 h-7 text-[#211D19]" />
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[10px] font-bold uppercase tracking-wider font-devanagari">
                ताम्रपत्र अधिकार • २५ पिढ्यांचे वंशपरंपरागत वतनदार
              </div>
              <h3 className="font-heading font-bold text-lg sm:text-xl text-white">
                100% Authorized & Hereditary Trimbakeshwar Purohit
              </h3>
              <p className="text-xs sm:text-sm text-stone-200/90 leading-relaxed font-sans max-w-2xl">
                Bestowed with the royal hereditary custodianship (Vatan) of the entire Trimbakeshwar village since the golden era of Chhatrapati Shivaji Maharaj. All Vedic rituals and sacred Havans are performed directly by our authentic Purohit hands.
              </p>
            </div>
          </div>

          <button
            onClick={() => openBooking()}
            className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-[#211D19] bg-gradient-to-r from-amber-300 via-[#D4AF37] to-[#B88935] hover:brightness-105 shadow-md active:scale-95 transition-all inline-flex items-center gap-2 shrink-0 cursor-pointer relative z-10"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Sacred Puja</span>
          </button>
        </section>

        {/* Search & Filter Controls */}
        <div className="bg-white border border-[#B88935]/30 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#C56A18]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Guruji by name, Vedic title, or ritual specialty..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-[#B88935]"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100 text-xs">
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              <span className="text-stone-500 font-bold whitespace-nowrap">Ritual Specialty:</span>
              {allSpecialties.map((spec) => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpecialty(spec)}
                  className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-colors cursor-pointer ${
                    selectedSpecialty === spec
                      ? 'bg-[#5A1717] text-white shadow-xs'
                      : 'bg-[#EDE3D1]/60 text-stone-700 hover:bg-[#EDE3D1]'
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto py-1">
              <span className="text-stone-500 font-bold whitespace-nowrap">Language:</span>
              {allLanguages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-colors cursor-pointer ${
                    selectedLanguage === lang
                      ? 'bg-[#C56A18] text-white shadow-xs'
                      : 'bg-[#EDE3D1]/60 text-stone-700 hover:bg-[#EDE3D1]'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Guruji Profile Card (Featured Grand Layout) */}
        {filteredGurujis.length === 0 ? (
          <div className="bg-white border border-stone-200 rounded-3xl p-12 text-center text-stone-500 text-sm space-y-3">
            <p>No Gurujis matched your current search filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedLanguage('All');
                setSelectedSpecialty('All');
              }}
              className="px-4 py-2 rounded-xl bg-[#EDE3D1] text-[#5A1717] font-semibold text-xs hover:bg-[#B88935]/20 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredGurujis.map((guruji) => (
            <div
              key={guruji.id}
              className="bg-white border-2 border-[#D4AF37]/50 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all relative overflow-hidden space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left: Guruji Official Photo Portrait Card */}
                <div className="lg:col-span-5 flex flex-col gap-4">
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
                    className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-xl bg-black/60 group p-2.5 flex flex-col justify-between cursor-pointer hover:border-amber-400 transition-all hover:scale-[1.01]"
                  >
                    <div className="relative overflow-hidden rounded-xl bg-stone-950/80">
                      <img
                        src="/assets/guruji.png"
                        alt={guruji.name}
                        className="w-full h-80 sm:h-96 object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-2.5 left-2.5 px-3 py-1 rounded-full bg-black/80 border border-amber-400/50 text-[10px] font-bold text-amber-300 font-devanagari shadow-sm">
                        मुख्य पुरोहित
                      </div>
                      <div className="absolute bottom-2.5 right-2.5 px-3 py-1.5 rounded-lg bg-black/80 border border-amber-400/40 text-[11px] font-medium text-amber-200 flex items-center gap-1.5 shadow-md backdrop-blur-xs group-hover:bg-amber-400/20 group-hover:border-amber-300 transition-all">
                        <Maximize2 className="w-3.5 h-3.5 text-amber-300" />
                        <span>मोठे पहा • View Full</span>
                      </div>
                    </div>

                    <div className="p-3.5 text-center bg-black/75 rounded-xl border border-amber-400/20 mt-2">
                      <span className="text-base font-bold text-amber-200 font-devanagari block leading-tight">
                        {guruji.titleNative}
                      </span>
                      <span className="text-xs text-stone-300 block mt-1 font-sans">
                        २५ पिढ्यांचे वंशपरंपरागत वतनदार तीर्थ पुरोहित
                      </span>
                    </div>
                  </div>

                  {/* Rating & Devotee Trust Pill */}
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-amber-800 font-bold">
                      <span>★ {guruji.rating}</span>
                      <span className="text-stone-500 font-normal">({guruji.reviewCount} Devotee Reviews)</span>
                    </div>
                    <span className="text-emerald-800 font-bold text-[11px] flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Verified Hereditary Purohit</span>
                    </span>
                  </div>
                </div>

                {/* Right: Full Credentials, Bio, Stats, Specialties */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-3 py-1 rounded-full bg-[#EDE3D1] text-[#5A1717] font-bold text-xs font-devanagari">
                        श्री क्षेत्र त्र्यंबकेश्वर
                      </span>
                      <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs inline-flex items-center gap-1 border border-emerald-300">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                        <span>100% Authorized Purohit</span>
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#5A1717] leading-tight">
                      {guruji.name}
                    </h2>
                    <div className="text-base sm:text-lg font-devanagari text-[#B88935] font-bold mt-1">
                      {guruji.titleNative}
                    </div>
                    <div className="text-xs sm:text-sm text-stone-600 mt-1 font-medium">
                      {guruji.education} • {guruji.experienceYears}+ Years Vidhi Experience
                    </div>
                  </div>

                  {/* 3 Heritage Stat Badges */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-xl bg-[#EDE3D1]/40 border border-[#B88935]/30 text-center">
                      <span className="text-[#5A1717] font-bold text-base block font-heading">25+ Generations</span>
                      <span className="text-[10px] text-stone-600 block font-devanagari">अखंड वंशपरंपरागत वारसा</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#EDE3D1]/40 border border-[#B88935]/30 text-center">
                      <span className="text-[#5A1717] font-bold text-base block font-heading">Royal Vatan</span>
                      <span className="text-[10px] text-stone-600 block font-devanagari">छत्रपती शिवाजी महाराज कालीन</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#EDE3D1]/40 border border-[#B88935]/30 text-center">
                      <span className="text-[#5A1717] font-bold text-base block font-heading">Direct Sankalp</span>
                      <span className="text-[10px] text-stone-600 block font-devanagari">थेट अधिकृत संकल्प</span>
                    </div>
                  </div>

                  {/* Bio Content */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200 text-xs sm:text-sm text-stone-700 space-y-3 leading-relaxed">
                    <p className="font-sans font-medium text-stone-800">
                      We are hereditary Tirth Purohits of Shri Kshetra Trimbakeshwar. Since the golden era of Chhatrapati Shivaji Maharaj, our family was bestowed with the historic royal Vatan (hereditary custodianship) of the entire Trimbakeshwar village. Since then, all religious ceremonies, sacred Havans, and Shastric rituals of this holy kshetra are performed directly by our authentic Purohit hands.
                    </p>
                    <p className="text-stone-600 text-xs">
                      Serving pilgrims for over 25 unbroken generations, we conduct all traditional Vedic rituals including Narayan Nagbali, Kaal Sarp Yog Shanti, Tripindi Shraddha, Maha Mrityunjaya Japa & Havan, Rudrabhishek, Mahabhishek, Laghurudra, Maharudra, Graha Nakshatra Shanti, Vastu Shanti, Navachandi Yaag, Ganesh Yaag, and Udak Shanti with authentic Shastric devotion.
                    </p>
                  </div>

                  {/* Ritual Specialties */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#5A1717] block">
                      Sacred Ritual Specialties:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {guruji.specialties.map((spec) => (
                        <span
                          key={spec}
                          className="px-2.5 py-1 rounded-lg bg-[#EDE3D1]/60 border border-[#B88935]/30 text-stone-800 text-xs font-medium"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="flex items-center gap-2 text-xs text-stone-600">
                    <span className="font-bold text-stone-800">Languages Spoken:</span>
                    <span>{guruji.languages.join(' • ')}</span>
                  </div>

                  {/* Action CTAs */}
                  <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => openBooking('narayan-nagbali', guruji.id)}
                      className="flex-1 py-3 px-6 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#5A1717] via-[#7B1F1F] to-[#C56A18] hover:from-[#6D1B1B] hover:to-[#B88935] rounded-xl shadow-md transition-all text-center cursor-pointer inline-flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book Sacred Puja with Guruji</span>
                    </button>

                    <a
                      href={`https://wa.me/919689973967?text=Jai%20Trimbakeshwar,%20I%20would%20like%20to%20consult%20Pt.%20Pravin%20Shambhu%20Deshmukh%20Guruji%20regarding%20Puja%20Vidhi.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs transition-colors"
                      title="Direct WhatsApp Consultation"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </a>

                    <a
                      href={`tel:${guruji.contactPhone}`}
                      className="px-4 py-3 rounded-xl bg-[#EDE3D1] hover:bg-[#D4AF37]/40 text-[#5A1717] text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors border border-[#B88935]/40"
                      title="Call Guruji Helpline"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{guruji.contactPhone}</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Historic Tamrapatra Copper Plate Charter Section */}
              <div className="pt-8 border-t-2 border-[#D4AF37]/30">
                <div className="bg-gradient-to-r from-stone-900 to-[#2A0E0E] text-white rounded-2xl p-5 sm:p-7 border border-amber-400/40 shadow-xl flex flex-col md:flex-row items-center gap-6">
                  {/* Tamrapatra Thumbnail Card */}
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
                    className="w-full sm:w-56 h-60 sm:h-56 rounded-xl overflow-hidden border-2 border-amber-400/60 shadow-lg shrink-0 relative group cursor-pointer bg-black/60 p-2 flex items-center justify-center hover:scale-[1.02] transition-transform"
                  >
                    <img
                      src="/assets/tamprpatra.png"
                      alt="Historic Tamrapatra Copper Plate Charter"
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/80 text-[10px] font-bold text-amber-300 font-devanagari border border-amber-400/40">
                      ऐतिहासिक सनद
                    </div>
                    <div className="absolute bottom-2 inset-x-2 text-center py-1 rounded bg-black/80 text-[10px] text-amber-200 border border-amber-400/30 flex items-center justify-center gap-1">
                      <Maximize2 className="w-3 h-3 text-amber-300" />
                      <span>मोठे पहा • View Full</span>
                    </div>
                  </div>

                  <div className="space-y-2 flex-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[10px] font-bold uppercase tracking-wider font-devanagari">
                      सनद व ताम्रपत्र पुरावा • Royal Evidence
                    </div>
                    <h3 className="text-lg sm:text-xl font-heading font-bold text-amber-100">
                      Historic Royal Tamrapatra of Pt. Pravin Shambhu Deshmukh
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                      Our ancestral family holds the authentic copper plate charter (ताम्रपत्र) and royal Sanad granting perpetual hereditary custodianship (वतन) of Shri Kshetra Trimbakeshwar. Every sacred ritual performed by Guruji follows these unbroken centuries-old Shastric traditions.
                    </p>
                    <div className="pt-2 flex items-center gap-3">
                      <button
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
                        className="px-4 py-2 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 border border-amber-400/40 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Maximize2 className="w-3.5 h-3.5 text-amber-300" />
                        <span>Inspect Tamrapatra Document</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
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
