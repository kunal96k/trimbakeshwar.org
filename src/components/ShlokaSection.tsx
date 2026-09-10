import React from 'react';
import { SupportedLanguage } from '../types';
import { SacredMandala, TripundraMark } from './Motifs';
import { getHomeTranslations } from '../data/homeTranslations';

interface ShlokaSectionProps {
  currentLang?: SupportedLanguage;
}

export function ShlokaSection({ currentLang = 'en' }: ShlokaSectionProps) {
  const ht = getHomeTranslations(currentLang);

  return (
    <section id="shloka" className="py-20 sm:py-28 bg-[#FBF6EA] relative overflow-hidden">
      {/* Centered Decorative Sacred Chakra Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[520px] h-80 sm:h-[520px] opacity-20 sm:opacity-25 pointer-events-none">
        <SacredMandala className="w-full h-full animate-[spin_140s_linear_infinite]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Frame with Gold Border and Antique Corner Accents */}
        <div className="relative p-8 sm:p-14 rounded-3xl bg-[#EDE3D1]/40 border-2 border-[#B88935]/40 shadow-xl backdrop-blur-xs">
          {/* Corner Flourishes */}
          <div className="absolute top-3 left-3 text-xs text-[#B88935]/60 font-sanskrit">☸</div>
          <div className="absolute top-3 right-3 text-xs text-[#B88935]/60 font-sanskrit">☸</div>
          <div className="absolute bottom-3 left-3 text-xs text-[#B88935]/60 font-sanskrit">☸</div>
          <div className="absolute bottom-3 right-3 text-xs text-[#B88935]/60 font-sanskrit">☸</div>

          {/* Heading */}
          <div className="inline-block text-xs uppercase tracking-widest text-[#C56A18] font-bold mb-2">
            ॥ द्वादश ज्योतिर्लिंग स्तोत्रम् ॥
          </div>
          
          <h2 className="text-xl sm:text-2xl font-bold font-sanskrit text-[#5A1717] mb-6">
            {ht.shlokaMeaningTitle || 'श्री त्र्यंबकेश्वर स्तुति'}
          </h2>

          <div className="mb-6 flex justify-center">
            <TripundraMark className="w-20 opacity-80" />
          </div>

          {/* Sacred Sanskrit Verse */}
          <div className="text-xl sm:text-2xl md:text-3xl font-sanskrit font-medium text-[#211D19] leading-loose sm:leading-loose tracking-wide mb-6">
            <p className="mb-2">सह्याद्रिशीर्षे विमले वसन्तं</p>
            <p className="mb-2">गोदावरितीरपवित्रदेशे ।</p>
            <p className="mb-2">यद्दर्शनात्पातकमाशु नाशं</p>
            <p>प्रयाति तं त्र्यम्बकमीशमीडे ॥</p>
          </div>

          {/* Bottom Invocation */}
          <div className="text-sm sm:text-base font-sanskrit font-bold text-[#C56A18] tracking-widest mb-6">
            {ht.shlokaPraise || '॥ ॐ नमः शिवाय ॥'}
          </div>

          <div className="w-24 h-[1.5px] bg-[#B88935]/40 mx-auto mb-6"></div>

          {/* Reverent Dynamic Translation */}
          <p className="text-xs sm:text-sm text-[#211D19]/75 font-sans max-w-xl mx-auto leading-relaxed italic">
            "{ht.shlokaMeaningText}"
          </p>
        </div>
      </div>
    </section>
  );
}
