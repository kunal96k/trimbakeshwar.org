import React from 'react';
import { SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { getHomeTranslations } from '../data/homeTranslations';
import {
  TrishulIcon,
  OmSymbol,
  SacredMandala,
  TripundraMark,
  LotusIcon,
  ShankhaIcon,
  MukutIcon,
  DivyaSparkleIcon,
  GodavariWaveIcon,
} from './Motifs';
import { ArrowRight, Sparkles } from 'lucide-react';

interface JyotirlingaSectionProps {
  currentLang: SupportedLanguage;
}

export function JyotirlingaSection({ currentLang }: JyotirlingaSectionProps) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const ht = getHomeTranslations(currentLang);

  return (
    <section id="jyotirlinga" className="py-24 sm:py-32 bg-[#241512] text-white relative overflow-hidden">
      {/* Background Decorative Sacred Chakra Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] sm:w-[640px] lg:w-[760px] h-[420px] sm:h-[640px] lg:h-[760px] opacity-15 sm:opacity-20 pointer-events-none">
        <SacredMandala className="w-full h-full animate-[spin_180s_linear_infinite] drop-shadow-[0_0_30px_rgba(212,175,55,0.2)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5A1717]/80 border border-[#B88935]/30 text-amber-300 text-xs font-sanskrit uppercase tracking-widest mb-4">
            <span>॥ द्वादश ज्योतिर्लिंग क्षेत्रम् ॥</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-sanskrit text-amber-50 mb-3">
            {t.jyotirlingaHeadingNative}
          </h2>

          <div className="text-lg sm:text-xl font-heading italic text-amber-200/80 mb-6">
            {t.jyotirlingaHeadingEng}
          </div>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-sans">
            {t.jyotirlingaDesc}
          </p>
        </div>

        {/* The Sacred Trinity (Trideva) Visual Representation in Trimbak Linga Cavity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Sacred Trinity Graphic */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
              {/* Outer Golden Aura Ring */}
              <div className="absolute inset-0 rounded-full border border-[#D4AF37]/30 animate-pulse"></div>
              <div className="absolute inset-4 rounded-full border border-dashed border-[#B88935]/40"></div>
              <div className="absolute inset-10 rounded-full bg-gradient-to-br from-[#381512] via-[#241512] to-[#160907] border-2 border-[#B88935]/60 shadow-[0_0_50px_rgba(184,137,53,0.15)]"></div>

              {/* Three Sacred Faces / Petals representing Brahma, Vishnu, Maheshwar */}
              {/* Center sacred symbol */}
              <div className="relative z-20 flex flex-col items-center justify-center text-center">
                <span className="text-3xl sm:text-4xl text-[#D4AF37] font-sanskrit font-bold drop-shadow">
                  ॐ
                </span>
                <span className="text-[11px] uppercase tracking-widest text-amber-200/90 font-sans mt-1">
                  त्रिमूर्ति ज्योतिर्लिंग
                </span>
              </div>

              {/* Maheshwar (Top Center) */}
              <div className="absolute top-6 sm:top-8 flex flex-col items-center z-20 group cursor-default">
                <div className="w-12 h-12 rounded-full bg-[#5A1717] border border-amber-300/50 flex items-center justify-center shadow-lg text-[#D4AF37]">
                  <TrishulIcon className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold font-sanskrit text-amber-100 mt-1">
                  श्री महेश्वर
                </span>
                <span className="text-[10px] text-stone-400 font-sans">{ht.jyotirlingaTrinityRudra}</span>
              </div>

              {/* Brahma (Bottom Left) */}
              <div className="absolute bottom-8 left-6 sm:left-10 flex flex-col items-center z-20 group cursor-default">
                <div className="w-12 h-12 rounded-full bg-[#3B1C10] border border-amber-300/50 flex items-center justify-center shadow-lg text-amber-300">
                  <LotusIcon className="w-6 h-6 text-amber-300" />
                </div>
                <span className="text-xs font-bold font-sanskrit text-amber-100 mt-1">
                  श्री ब्रह्मा
                </span>
                <span className="text-[10px] text-stone-400 font-sans">{ht.jyotirlingaTrinityBrahma}</span>
              </div>

              {/* Vishnu (Bottom Right) */}
              <div className="absolute bottom-8 right-6 sm:right-10 flex flex-col items-center z-20 group cursor-default">
                <div className="w-12 h-12 rounded-full bg-[#1C2A38] border border-amber-300/50 flex items-center justify-center shadow-lg text-amber-300">
                  <ShankhaIcon className="w-6 h-6 text-amber-300" />
                </div>
                <span className="text-xs font-bold font-sanskrit text-amber-100 mt-1">
                  श्री विष्णु
                </span>
                <span className="text-[10px] text-stone-400 font-sans">{ht.jyotirlingaTrinityVishnu}</span>
              </div>
            </div>
          </div>

          {/* Descriptive Column */}
          <div className="lg:col-span-6 flex flex-col space-y-5">
            <div className="p-5 rounded-2xl bg-[#311A16]/80 border border-[#B88935]/25">
              <div className="flex items-center gap-2.5 text-amber-300 text-sm font-semibold mb-1">
                <DivyaSparkleIcon className="w-4 h-4 text-amber-300 shrink-0" />
                <span className="font-sanskrit">{ht.jyotirlingaFeature1Title}</span>
              </div>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                {ht.jyotirlingaFeature1Desc}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#311A16]/80 border border-[#B88935]/25">
              <div className="flex items-center gap-2.5 text-amber-300 text-sm font-semibold mb-1">
                <MukutIcon className="w-4 h-4 text-amber-300 shrink-0" />
                <span className="font-sanskrit">{ht.jyotirlingaFeature2Title}</span>
              </div>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                {ht.jyotirlingaFeature2Desc}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#311A16]/80 border border-[#B88935]/25">
              <div className="flex items-center gap-2.5 text-amber-300 text-sm font-semibold mb-1">
                <GodavariWaveIcon className="w-4 h-4 text-amber-300 shrink-0" />
                <span className="font-sanskrit">{ht.jyotirlingaFeature3Title}</span>
              </div>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                {ht.jyotirlingaFeature3Desc}
              </p>
            </div>

            <div className="pt-2">
              <a
                href="#story"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-[#211D19] bg-[#FBF6EA] hover:bg-[#EDE3D1] transition-colors"
              >
                <span>{t.jyotirlingaCta}</span>
                <ArrowRight className="w-4 h-4 text-[#C56A18]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
