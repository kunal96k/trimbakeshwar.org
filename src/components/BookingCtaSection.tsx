import React from 'react';
import { SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { getHomeTranslations } from '../data/homeTranslations';
import { CheckCircle2, ArrowRight, Shield, PhoneCall, CalendarCheck, Sparkles } from 'lucide-react';
import { SacredMandala, TrishulIcon, PanchangIcon, PranamHandsIcon, VedicScrollIcon, DivyaSparkleIcon } from './Motifs';

interface BookingCtaSectionProps {
  currentLang: SupportedLanguage;
  onOpenBooking: () => void;
  onContactGuruji: () => void;
}

export function BookingCtaSection({ currentLang, onOpenBooking, onContactGuruji }: BookingCtaSectionProps) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const ht = getHomeTranslations(currentLang);

  const steps = [
    { num: '01', title: t.step1, desc: ht.step1Desc, icon: <TrishulIcon className="w-5 h-5 text-amber-300" /> },
    { num: '02', title: t.step2, desc: ht.step2Desc, icon: <PanchangIcon className="w-5 h-5 text-amber-300" /> },
    { num: '03', title: t.step3, desc: ht.step3Desc, icon: <PranamHandsIcon className="w-5 h-5 text-amber-300" /> },
    { num: '04', title: t.step4, desc: ht.step4Desc, icon: <VedicScrollIcon className="w-5 h-5 text-amber-300" /> },
    { num: '05', title: t.step5, desc: ht.step5Desc, icon: <DivyaSparkleIcon className="w-5 h-5 text-amber-300" /> },
  ];

  return (
    <section id="book-puja" className="py-20 sm:py-28 bg-[#FBF6EA] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#5A1717] via-[#431212] to-[#241512] rounded-3xl p-8 sm:p-14 text-white border border-[#B88935]/40 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Sacred Chakra Background */}
          <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 opacity-20 pointer-events-none">
            <SacredMandala className="w-[420px] sm:w-[540px] h-[420px] sm:h-[540px] animate-[spin_120s_linear_infinite] drop-shadow-[0_0_30px_rgba(212,175,55,0.25)]" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            {/* Native Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/30 border border-amber-300/30 text-amber-300 text-xs font-sanskrit mb-3">
              <span>{t.bookFlowHeadingNative}</span>
            </div>

            {/* Main Section Heading */}
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-heading text-amber-100 mb-4">
              {t.bookFlowHeadingEng}
            </h2>

            <p className="text-stone-300 text-sm sm:text-base font-sans max-w-2xl mx-auto leading-relaxed mb-12">
              {t.bookFlowDesc}
            </p>

            {/* 5-Step Visual Flow */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12 text-left">
              {steps.map((step, idx) => (
                <div
                  key={step.num}
                  className="relative p-4 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-xs flex flex-col justify-between hover:border-amber-400/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg">{step.icon}</span>
                      <span className="text-xs font-bold text-amber-300/60 font-sans tracking-widest">
                        {step.num}
                      </span>
                    </div>
                    <div className="font-bold text-sm text-amber-100 mb-1 font-heading">
                      {step.title}
                    </div>
                    <div className="text-[11px] text-stone-300/80 font-sans leading-snug">
                      {step.desc}
                    </div>
                  </div>

                  {idx < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-amber-400 text-xs">
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <button
                id="booking-cta-main-btn"
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-8 py-4 rounded-full text-sm sm:text-base font-bold text-[#211D19] bg-gradient-to-r from-[#FFD54F] via-[#FFCA28] to-[#FFA000] hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
                style={{ whiteSpace: 'nowrap' }}
              >
                <TrishulIcon className="w-4 h-4 text-[#211D19] shrink-0" />
                <span className="whitespace-nowrap shrink-0" style={{ whiteSpace: 'nowrap' }}>{t.bookFlowBtn}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              <button
                id="booking-cta-contact-guruji"
                onClick={onContactGuruji}
                className="w-full sm:w-auto px-7 py-4 rounded-full text-sm sm:text-base font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
                style={{ whiteSpace: 'nowrap' }}
              >
                <PhoneCall className="w-4 h-4 text-amber-300 shrink-0" />
                <span className="whitespace-nowrap shrink-0" style={{ whiteSpace: 'nowrap' }}>{t.talkToGurujiBtn}</span>
              </button>
            </div>

            {/* Reassuring Microcopy */}
            <div className="flex items-center justify-center gap-6 text-xs text-amber-200/80 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{ht.trustBadge1}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{ht.trustBadge2}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{ht.trustBadge3}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
