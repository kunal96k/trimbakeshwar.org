import React from 'react';
import { SupportedLanguage } from '../types';
import { getHomeTranslations } from '../data/homeTranslations';
import { getDevoteeReviewsData } from '../data/homeDataTranslations';
import { Quote, Star } from 'lucide-react';

interface DevoteeExperiencesProps {
  currentLang: SupportedLanguage;
}

export function DevoteeExperiences({ currentLang }: DevoteeExperiencesProps) {
  const ht = getHomeTranslations(currentLang);
  const reviews = getDevoteeReviewsData(currentLang);

  return (
    <section id="devotee-experiences" className="py-20 sm:py-28 bg-[#EDE3D1]/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block text-xs uppercase tracking-widest text-[#C56A18] font-bold font-sanskrit mb-2">
            {ht.reviewsNative}
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-heading text-[#5A1717] mb-4">
            {ht.reviewsTitle}
          </h2>
          <p className="text-stone-700 text-sm sm:text-base font-sans leading-relaxed">
            {ht.reviewsSubtitle}
          </p>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="bg-[#FBF6EA] rounded-2xl border border-[#B88935]/30 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all relative"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#B88935]/30" />
                </div>

                <p className="text-xs sm:text-sm text-[#211D19]/85 font-sans leading-relaxed italic mb-6">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#B88935]/15">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold font-heading text-[#5A1717]">
                      {review.name}
                    </div>
                    <div className="text-[11px] text-stone-500 font-sans">
                      {review.city}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-[#EDE3D1] text-[10px] font-semibold text-[#5A1717]">
                      {review.puja}
                    </span>
                    <div className="text-[10px] text-stone-400 mt-0.5">{review.date}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center text-[11px] text-stone-500 italic">
          {ht.reviewsNote}
        </div>
      </div>
    </section>
  );
}
