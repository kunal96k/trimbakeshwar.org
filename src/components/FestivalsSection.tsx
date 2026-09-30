import React from 'react';
import { SupportedLanguage } from '../types';
import { getHomeTranslations } from '../data/homeTranslations';
import { getFestivalsData } from '../data/homeDataTranslations';
import { FESTIVALS_LIST } from '../data/siteData';
import { Calendar, Sparkles } from 'lucide-react';

interface FestivalsSectionProps {
  currentLang: SupportedLanguage;
}

export function FestivalsSection({ currentLang }: FestivalsSectionProps) {
  const ht = getHomeTranslations(currentLang);
  const festivals = getFestivalsData(currentLang);

  const imageMap = React.useMemo(() => {
    const map: Record<string, string> = {};
    FESTIVALS_LIST.forEach((f) => {
      map[f.id] = f.image;
    });
    return map;
  }, []);

  return (
    <section id="festivals" className="py-20 sm:py-28 bg-[#FBF6EA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block text-xs uppercase tracking-widest text-[#C56A18] font-bold font-sanskrit mb-2">
            उत्सव • पर्व • परंपरा
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-heading text-[#5A1717] mb-4">
            {ht.festivalsTitle}
          </h2>
          <p className="text-stone-700 text-sm sm:text-base font-sans leading-relaxed">
            {ht.festivalsSubtitle}
          </p>
        </div>

        {/* 5 Festivals Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {festivals.map((fest) => {
            const imgSrc = imageMap[fest.id] || '/assets/trimbak/mahashivratri.webp';
            return (
              <div
                key={fest.id}
                className="bg-[#EDE3D1]/40 rounded-2xl border border-[#B88935]/30 overflow-hidden hover:bg-[#EDE3D1]/80 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="relative h-48 overflow-hidden bg-stone-200">
                  <img
                    src={imgSrc}
                    alt={fest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#241512]/80 via-transparent to-transparent"></div>
                  
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-semibold bg-[#5A1717]/90 text-amber-200 backdrop-blur-xs border border-amber-300/25 flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-[#C56A18]" />
                    <span>{fest.traditionalPeriod}</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-xs font-sanskrit text-amber-200 font-semibold block">
                      {fest.nativeName}
                    </span>
                    <h3 className="text-lg font-bold font-heading text-white">
                      {fest.name}
                    </h3>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-[#211D19]/80 font-sans leading-relaxed mb-3">
                      {fest.description}
                    </p>

                    <div className="p-3 rounded-xl bg-white/70 border border-stone-200 text-xs text-stone-700">
                      <span className="font-bold text-[#5A1717] block mb-0.5">{ht.festivalsSignificanceLabel}:</span>
                      <span>{fest.significance}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
