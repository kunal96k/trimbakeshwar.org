import React from 'react';
import { SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { getHomeTranslations } from '../data/homeTranslations';
import { TripundraMark, BilvaPatraIcon, KalashMotif, BrahmagiriIcon, GodavariWaveIcon, TempleIcon, LotusIcon } from './Motifs';
import { Sparkles, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

interface TempleIntroProps {
  currentLang: SupportedLanguage;
}

export function TempleIntro({ currentLang }: TempleIntroProps) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const ht = getHomeTranslations(currentLang);

  return (
    <section id="temple" className="py-20 sm:py-28 bg-[#FBF6EA] relative overflow-hidden">
      {/* Background Subtle Watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 opacity-5 pointer-events-none text-[#5A1717]">
        <BilvaPatraIcon className="w-full h-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Editorial Content */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-[1.5px] bg-[#C56A18]"></span>
              <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#C56A18] font-sanskrit uppercase">
                {t.introEyebrow}
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-heading text-[#5A1717] mb-6 leading-tight">
              {t.introHeading}
            </h2>

            <p className="text-base sm:text-lg text-[#211D19]/85 font-sans leading-relaxed mb-6">
              {t.introDesc}
            </p>

            {/* Devotional Highlight */}
            <div className="p-5 rounded-2xl bg-[#EDE3D1]/70 border-l-4 border-[#C56A18] mb-8 shadow-sm">
              <p className="font-sanskrit text-sm sm:text-base text-[#5A1717] leading-relaxed italic">
                "{ht.introQuoteText}"
              </p>
              <div className="mt-2 text-xs font-semibold text-[#8A5A14] tracking-wider uppercase">
                — {ht.introQuoteAuthor}
              </div>
            </div>

            {/* Sacred Features Bullet Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-white border border-[#B88935]/20 shadow-xs">
                <BrahmagiriIcon className="w-5 h-5 text-[#C56A18] shrink-0" />
                <div className="text-xs">
                  <div className="font-bold text-[#211D19]">{ht.introBadgeBrahmagiriTitle}</div>
                  <div className="text-stone-500">{ht.introBadgeBrahmagiriDesc}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-xl bg-white border border-[#B88935]/20 shadow-xs">
                <GodavariWaveIcon className="w-5 h-5 text-[#5A1717] shrink-0" />
                <div className="text-xs">
                  <div className="font-bold text-[#211D19]">{ht.introBadgeKushavartaTitle}</div>
                  <div className="text-stone-500">{ht.introBadgeKushavartaDesc}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-xl bg-white border border-[#B88935]/20 shadow-xs col-span-2 sm:col-span-1">
                <TempleIcon className="w-5 h-5 text-[#B88935] shrink-0" />
                <div className="text-xs">
                  <div className="font-bold text-[#211D19]">{ht.introBadgeHemadpanthiTitle}</div>
                  <div className="text-stone-500">{ht.introBadgeHemadpanthiDesc}</div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div>
              <a
                id="intro-cta-discover"
                href="#story"
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-[#5A1717] hover:bg-[#6D1B1B] shadow-md hover:shadow-lg transition-all duration-300 group"
              >
                <span>{t.introCta}</span>
              </a>
            </div>
          </div>

          {/* Vertical Sanskrit Decorative Divider (Visible on Desktop) */}
          <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-center space-y-4 py-8 opacity-40 text-[#B88935]">
            <div className="w-[1px] h-20 bg-gradient-to-b from-transparent to-[#B88935]"></div>
            <span className="font-sanskrit text-xs writing-vertical-rl tracking-widest">
              ॥ ॐ त्र्यम्बकं यजामहे ॥
            </span>
            <div className="w-[1px] h-20 bg-gradient-to-t from-transparent to-[#B88935]"></div>
          </div>

          {/* Right Visual Frame */}
          <div className="lg:col-span-4 relative mb-6 lg:mb-2">
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#B88935]/40 shadow-2xl bg-[#EDE3D1] mb-3 sm:mb-4">
              <img
                src="/assets/trimbak/trimbakeshwar-shiva-temple.webp"
                alt="Trimbakeshwar Shiva Temple and Holy Sanctum"
                className="w-full h-[500px] sm:h-[540px] lg:h-[560px] object-cover scale-[1.14] -translate-y-7 sm:-translate-y-9 hover:scale-[1.18] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#241512]/90 via-transparent to-transparent"></div>

              {/* In-image Caption Card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#FBF6EA]/95 backdrop-blur-md border border-[#B88935]/30 shadow-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs text-[#C56A18] font-bold uppercase tracking-wider font-sans">
                      {ht.introCardTag}
                    </div>
                    <div className="text-sm font-bold font-sanskrit text-[#5A1717]">
                      {ht.introCardTitle}
                    </div>
                  </div>
                  <LotusIcon className="w-5 h-5 text-[#C56A18] shrink-0" />
                </div>
                <p className="text-[11px] text-[#211D19]/80 mt-1 font-sans">
                  {ht.introCardDesc}
                </p>
              </div>
            </div>

            {/* Corner Decorative Ornament */}
            <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-[#B88935] flex items-center justify-center text-white text-lg shadow-md">
              ॐ
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
