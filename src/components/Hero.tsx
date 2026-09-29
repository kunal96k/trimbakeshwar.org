import React from 'react';
import { SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { TripundraMark, SacredMandala, DiyaFlameIcon, TrishulIcon, TempleIcon, PranamHandsIcon, GodavariWaveIcon, OmSymbol } from './Motifs';
import { ChevronDown, ShieldCheck, Sparkles, Compass } from 'lucide-react';

interface HeroProps {
  currentLang: SupportedLanguage;
  onOpenBooking: () => void;
}

const SCROLL_LABEL: Record<SupportedLanguage, string> = {
  en: 'Scroll',
  mr: 'खाली स्क्रोल करा',
  hi: 'नीचे स्क्रॉल करें',
  sa: 'अधः सर्पतु',
  gu: 'નીચે સ્ક્રોલ કરો',
  te: 'క్రిందికి స్క్రోల్ చేయండి',
  kn: 'ಕೆಳಗೆ ಸ್ಕ್ರಾಲ್ ಮಾಡಿ',
  ta: 'கீழே உருட்டவும்',
  bn: 'নিচে স্ক্রোল করুন',
  or: 'ତଳକୁ ସ୍କ୍ରୋଲ୍ କରନ୍ତୁ',
};

export function Hero({ currentLang, onOpenBooking }: HeroProps) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const scrollText = SCROLL_LABEL[currentLang] || SCROLL_LABEL.en;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#241512] text-white pt-24 pb-16"
    >
      {/* Background Cinematic Imagery with Authentic Trimbakeshwar & Brahmagiri Atmosphere */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/hero-section.png"
          alt="Shri Trimbakeshwar Jyotirlinga Temple and Brahmagiri Mountain Nashik"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-10000 ease-out"
        />
        {/* Layered Sacred Gradients: allows the majestic Trimbakeshwar sunrise and temple view to glow while preserving text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#241512] via-[#241512]/60 to-[#1B0E0B]/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#241512]/80 via-[#241512]/45 to-transparent"></div>
        <div className="absolute inset-0 sacred-mandala-pattern opacity-20"></div>
      </div>

      {/* Subtle Ambient Sacred Chakra Watermark */}
      <div className="absolute top-1/2 -left-28 sm:-left-20 lg:-left-16 -translate-y-1/2 opacity-25 sm:opacity-30 pointer-events-none z-10 hidden sm:block">
        <SacredMandala className="w-72 h-72 sm:w-96 sm:h-96 lg:w-[460px] lg:h-[460px] animate-[spin_100s_linear_infinite] drop-shadow-[0_0_25px_rgba(212,175,55,0.25)]" />
      </div>

      {/* Floating Diya Light Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        <div className="absolute top-1/4 left-1/5 w-2 h-2 rounded-full bg-amber-300/40 blur-[1px] animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-orange-400/30 blur-[2px] animate-pulse delay-700"></div>
        <div className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 rounded-full bg-yellow-200/30 blur-[1px] animate-pulse delay-1000"></div>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Top Sacred Sanskrit Invocation */}
        <div className="inline-flex items-center justify-center gap-3 px-5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-[#4A1212]/90 border border-[#D4AF37]/50 backdrop-blur-md mb-6 shadow-xl shadow-black/25 animate-in fade-in slide-in-from-top-4 duration-700">
          <TrishulIcon className="w-4 h-4 text-amber-300 shrink-0" />
          <span className="text-xs sm:text-sm font-bold tracking-widest text-amber-200 font-sanskrit leading-none inline-flex items-center justify-center pt-0.5">
            {t.heroSanskritInvocation}
          </span>
          <TrishulIcon className="w-4 h-4 text-amber-300 shrink-0" />
        </div>

        {/* Sacred Tripundra Mark */}
        <div className="mb-4">
          <TripundraMark className="w-20 sm:w-28 opacity-90" />
        </div>

        {/* Main Sacred Heading */}
        <h1
          id="hero-main-title"
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-sanskrit tracking-tight text-amber-50 drop-shadow-md mb-3"
        >
          {t.heroTitle}
        </h1>

        {/* English Supporting Heading */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-heading italic text-amber-200/90 font-medium mb-4">
          {t.heroSubTitle}
        </h2>

        {/* Traditional Description */}
        <p className="max-w-2xl text-stone-200/90 text-sm sm:text-base md:text-lg leading-relaxed font-sans mb-5">
          {t.heroDescription}
        </p>

        {/* Secondary Sanatan Flavor Line */}
        <div className="flex items-center justify-center gap-3 text-xs sm:text-sm text-amber-300/80 font-sanskrit font-medium tracking-wider mb-8">
          <span>{t.heroTagline}</span>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-fit mx-auto mb-12">
          {/* Primary CTA: Explore Trimbakeshwar */}
          <a
            id="hero-cta-explore"
            href="#temple"
            className="w-fit px-7 py-3.5 rounded-full text-sm sm:text-base font-semibold text-[#211D19] bg-[#FBF6EA] hover:bg-[#EDE3D1] border border-[#B88935]/60 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2.5 group active:scale-[0.98]"
          >
            <PranamHandsIcon className="w-4 h-4 text-[#C56A18] group-hover:scale-110 transition-transform shrink-0" />
            <span>{t.heroCtaExplore}</span>
          </a>

          {/* Secondary CTA: Book a Puja */}
          <button
            id="hero-cta-book-puja"
            onClick={onOpenBooking}
            className="w-fit px-8 py-3.5 rounded-full text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-[#5A1717] via-[#C56A18] to-[#996B1E] hover:from-[#6D1B1B] hover:to-[#B88935] border border-amber-300/40 shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2.5 active:scale-[0.98] whitespace-nowrap shrink-0"
            style={{ whiteSpace: 'nowrap' }}
          >
            <TrishulIcon className="w-4 h-4 text-amber-200 shrink-0" />
            <span className="whitespace-nowrap shrink-0" style={{ whiteSpace: 'nowrap' }}>{t.heroCtaBook}</span>
          </button>
        </div>

        {/* Trust & Navigation Strip */}
        <div className="w-full max-w-3xl pt-6 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-3 text-stone-300 text-xs sm:text-sm font-medium">
          <div className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-black/25 backdrop-blur-sm border border-white/5">
            <TempleIcon className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{t.heroTrust1}</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-black/25 backdrop-blur-sm border border-white/5">
            <GodavariWaveIcon className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{t.heroTrust2}</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-black/25 backdrop-blur-sm border border-white/5">
            <OmSymbol className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{t.heroTrust3}</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-black/25 backdrop-blur-sm border border-white/5">
            <TrishulIcon className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{t.heroTrust4}</span>
          </div>
        </div>
      </div>

      {/* Gentle Scroll Indicator */}
      <a
        href="#quick-actions"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-stone-400 hover:text-amber-300 transition-colors group"
        aria-label="Scroll down to explore"
      >
        <span className="text-[10px] uppercase tracking-widest font-sans opacity-70 group-hover:opacity-100">
          {scrollText}
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce mt-0.5" />
      </a>
    </section>
  );
}
