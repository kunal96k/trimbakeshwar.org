import React, { useState } from 'react';
import { SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { getHomeTranslations } from '../data/homeTranslations';
import { getDarshanTimingsData, getDarshanGuidelinesData } from '../data/homeDataTranslations';
import { Clock, Info, CheckCircle2, AlertCircle, Shirt, Sparkles } from 'lucide-react';
import { MukutIcon } from './Motifs';

interface DarshanInfoSectionProps {
  currentLang: SupportedLanguage;
}

export function DarshanInfoSection({ currentLang }: DarshanInfoSectionProps) {
  const [activeTab, setActiveTab] = useState<'timings' | 'guidelines'>('timings');
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const ht = getHomeTranslations(currentLang);
  const timings = getDarshanTimingsData(currentLang);
  const dg = getDarshanGuidelinesData(currentLang);

  return (
    <section id="darshan" className="py-20 sm:py-28 bg-[#EDE3D1]/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-block text-xs uppercase tracking-widest text-[#C56A18] font-bold font-sanskrit mb-2">
            {t.darshanHeadingNative}
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-heading text-[#5A1717] mb-4">
            {t.darshanHeadingEng}
          </h2>
          <p className="text-stone-700 text-sm sm:text-base font-sans leading-relaxed">
            {ht.darshanSubtitle}
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-full bg-[#FBF6EA] border border-[#B88935]/30 shadow-xs">
            <button
              onClick={() => setActiveTab('timings')}
              className={`px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'timings'
                  ? 'bg-[#5A1717] text-white shadow-xs'
                  : 'text-stone-700 hover:text-[#5A1717]'
              }`}
            >
              {ht.darshanTabTimings}
            </button>
            <button
              onClick={() => setActiveTab('guidelines')}
              className={`px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'guidelines'
                  ? 'bg-[#5A1717] text-white shadow-xs'
                  : 'text-stone-700 hover:text-[#5A1717]'
              }`}
            >
              {ht.darshanTabGuidelines}
            </button>
          </div>
        </div>

        {/* TAB 1: Timings */}
        {activeTab === 'timings' && (
          <div className="bg-[#FBF6EA] rounded-3xl border border-[#B88935]/30 p-6 sm:p-10 shadow-lg">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#B88935]/20">
              <div>
                <div className="text-xs text-[#C56A18] font-bold uppercase tracking-wider font-sans">
                  {ht.darshanDailySchedule}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-sanskrit text-[#5A1717]">
                  {ht.darshanDailySchedule}
                </h3>
              </div>

              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EDE3D1] border border-[#B88935]/30 text-xs font-semibold text-[#5A1717]">
                <Clock className="w-3.5 h-3.5 text-[#C56A18]" />
                <span>{ht.darshanTempleGates}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {timings.map((timing, index) => (
                <div
                  key={index}
                  className="p-4 rounded-2xl bg-[#EDE3D1]/50 border border-stone-200/80 hover:border-[#B88935]/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#5A1717] font-sanskrit">
                      {timing.nameNative}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-[#5A1717] text-amber-200 text-[11px] font-mono font-semibold">
                      {timing.time}
                    </span>
                  </div>
                  <div className="text-sm font-bold font-heading text-[#211D19] mb-1">
                    {timing.name}
                  </div>
                  <p className="text-xs text-stone-600 font-sans leading-relaxed">
                    {timing.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Special Monday Golden Crown Alert */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 flex items-start gap-3 text-xs text-amber-900">
              <MukutIcon className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-sm font-sanskrit text-[#5A1717]">
                  {ht.darshanMondayTitle}
                </span>
                <p className="mt-0.5">
                  {ht.darshanMondayDesc}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Dress Code & Guidelines */}
        {activeTab === 'guidelines' && (
          <div className="bg-[#FBF6EA] rounded-3xl border border-[#B88935]/30 p-6 sm:p-10 shadow-lg">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-start gap-4">
                <Shirt className="w-8 h-8 text-[#5A1717] shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-base text-[#5A1717] font-heading mb-1">
                    {ht.darshanRulesTitle}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-2">
                    <strong>{dg.menLabel}</strong> {ht.darshanDressMen}
                  </p>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    <strong>{dg.womenLabel}</strong> {ht.darshanDressWomen}
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-start gap-4">
                <AlertCircle className="w-8 h-8 text-[#C56A18] shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-base text-[#5A1717] font-heading mb-1">
                    {dg.securityTitle}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {dg.securityDesc}
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-start gap-4">
                <CheckCircle2 className="w-8 h-8 text-[#2E7D32] shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-base text-[#5A1717] font-heading mb-1">
                    {dg.seniorTitle}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {dg.seniorDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
