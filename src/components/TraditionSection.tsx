import React from 'react';
import { SupportedLanguage } from '../types';
import { getHomeTranslations } from '../data/homeTranslations';
import { BilvaPatraIcon, SacredMandala } from './Motifs';
import { ShieldCheck, Scroll, HeartHandshake, History } from 'lucide-react';

interface TraditionSectionProps {
  currentLang: SupportedLanguage;
}

export function TraditionSection({ currentLang }: TraditionSectionProps) {
  const ht = getHomeTranslations(currentLang);

  return (
    <section id="tradition" className="py-20 sm:py-28 bg-[#241512] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Tamrapatra Copper-Plate Styled Box */}
          <div className="lg:col-span-6 relative">
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#8A5A14] via-[#632717] to-[#3B1212] border-2 border-[#D4AF37]/50 shadow-2xl relative overflow-hidden">
              {/* Copper Sacred Chakra Engraving Effect */}
              <div className="absolute -top-4 -right-4 sm:top-0 sm:right-0 w-36 h-36 sm:w-44 sm:h-44 opacity-25 sm:opacity-30 pointer-events-none">
                <SacredMandala className="w-full h-full animate-[spin_100s_linear_infinite]" />
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-amber-300/30 text-amber-200 text-xs font-sanskrit mb-4">
                <span>{ht.traditionBadge}</span>
              </div>

              <h3 className="text-xl sm:text-3xl font-bold font-sanskrit text-amber-100 mb-4 leading-snug">
                {ht.traditionTitle}
              </h3>

              <div className="text-sm sm:text-base font-heading italic text-amber-200/90 mb-4">
                {ht.traditionSub}
              </div>

              <p className="text-stone-200 text-xs sm:text-sm font-sans leading-relaxed mb-6">
                {ht.traditionDesc}
              </p>

              {/* Authentic Tamrapatra Visual Proof */}
              <div className="mb-6 rounded-2xl overflow-hidden border border-amber-300/30 shadow-inner bg-black/40 p-3 sm:p-4 flex items-center gap-4">
                <img
                  src="/assets/trimbak/tamrapatra-heritage.png"
                  alt="Historic Tamrapatra Copper Plate Record of Trimbakeshwar Guruji"
                  className="w-20 h-16 sm:w-28 sm:h-20 object-contain rounded-lg border border-amber-400/20 bg-stone-950/60 p-1 shrink-0"
                />
                <div className="text-xs text-amber-200/90 font-sans leading-relaxed">
                  <span className="font-bold text-amber-100 block text-xs sm:text-sm font-devanagari mb-0.5">
                    ताम्रपत्र अधिकार व प्राचीन बहीखाता नोंद
                  </span>
                  Hereditary spiritual sanction recognized by Peshwa-era Tamrapatra grants and ancestral pilgrim ledgers.
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-amber-300/20 text-xs text-amber-100">
                <div className="flex items-center gap-2">
                  <Scroll className="w-4 h-4 text-amber-300" />
                  <span>{ht.traditionPill1}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-300" />
                  <span>{ht.traditionPill2}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Heritage Pillars */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#311A16]/80 border border-[#B88935]/25">
              <div className="w-10 h-10 rounded-xl bg-[#5A1717] text-amber-300 flex items-center justify-center shrink-0 mt-1 shadow-sm">
                <History className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-base text-amber-100 font-heading mb-1">
                  {ht.traditionPillar1Title}
                </h4>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  {ht.traditionPillar1Desc}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#311A16]/80 border border-[#B88935]/25">
              <div className="w-10 h-10 rounded-xl bg-[#5A1717] text-amber-300 flex items-center justify-center shrink-0 mt-1 shadow-sm">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-base text-amber-100 font-heading mb-1">
                  {ht.traditionPillar2Title}
                </h4>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  {ht.traditionPillar2Desc}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#311A16]/80 border border-[#B88935]/25">
              <div className="w-10 h-10 rounded-xl bg-[#5A1717] text-amber-300 flex items-center justify-center shrink-0 mt-1 shadow-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-base text-amber-100 font-heading mb-1">
                  {ht.traditionPillar3Title}
                </h4>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  {ht.traditionPillar3Desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
