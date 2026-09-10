import React from 'react';
import { SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { getHomeTranslations } from '../data/homeTranslations';
import { getHowToReachData } from '../data/homeDataTranslations';
import { Car, Train, Plane, MapPin, ExternalLink, Navigation } from 'lucide-react';

interface HowToReachSectionProps {
  currentLang: SupportedLanguage;
}

export function HowToReachSection({ currentLang }: HowToReachSectionProps) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const ht = getHomeTranslations(currentLang);
  const hrData = getHowToReachData(currentLang);

  const transportModes = [
    {
      id: 'road',
      icon: <Car className="w-7 h-7 text-[#C56A18]" />,
      title: ht.reachRoadTitle,
      description: ht.reachRoadDesc,
      details: hrData.roadDetails,
      note: ht.reachRoadNote,
    },
    {
      id: 'train',
      icon: <Train className="w-7 h-7 text-[#5A1717]" />,
      title: ht.reachTrainTitle,
      description: ht.reachTrainDesc,
      details: hrData.trainDetails,
      note: ht.reachTrainNote,
    },
    {
      id: 'air',
      icon: <Plane className="w-7 h-7 text-[#B88935]" />,
      title: ht.reachAirTitle,
      description: ht.reachAirDesc,
      details: hrData.airDetails,
      note: ht.reachAirNote,
    },
  ];

  return (
    <section id="how-to-reach" className="py-20 sm:py-28 bg-[#FBF6EA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block text-xs uppercase tracking-widest text-[#C56A18] font-bold font-sanskrit mb-2">
            {t.reachHeadingNative}
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-heading text-[#5A1717] mb-4">
            {t.reachHeadingEng}
          </h2>
          <p className="text-stone-700 text-sm sm:text-base font-sans leading-relaxed">
            {ht.reachSubtitle}
          </p>
        </div>

        {/* 3 Travel Modes Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {transportModes.map((mode) => (
            <div
              key={mode.id}
              className="bg-[#EDE3D1]/50 rounded-2xl border border-[#B88935]/30 p-6 flex flex-col justify-between hover:bg-[#EDE3D1] hover:shadow-md transition-all duration-300"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white border border-[#B88935]/25 flex items-center justify-center shadow-xs mb-4">
                  {mode.icon}
                </div>

                <h3 className="text-lg font-bold font-heading text-[#5A1717] mb-2">
                  {mode.title}
                </h3>
                <p className="text-xs text-stone-600 font-sans mb-4">
                  {mode.description}
                </p>

                <ul className="space-y-2 text-xs text-[#211D19]/80 font-sans mb-4">
                  {mode.details.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#C56A18] font-bold mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-white/70 border border-stone-200 text-[11px] text-stone-600 italic">
                {mode.note}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Map & Route Guidance Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#241512] via-[#3B1212] to-[#241512] text-white border border-[#B88935]/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#5A1717] border border-amber-300/40 flex items-center justify-center text-amber-300 shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-amber-300">
                {hrData.coordsTitle}
              </div>
              <h4 className="text-base sm:text-lg font-bold text-amber-100 font-heading">
                {hrData.coordsAddress}
              </h4>
              <p className="text-xs text-stone-300 mt-0.5">
                {hrData.coordsMeta}
              </p>
            </div>
          </div>

          <a
            href="https://maps.google.com/?q=Trimbakeshwar+Shiva+Temple+Nashik"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-[#211D19] bg-gradient-to-r from-amber-300 to-amber-400 hover:bg-amber-400 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <Navigation className="w-4 h-4" />
            <span>{hrData.mapsBtn}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
