import React, { useState } from 'react';
import { SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { getHomeTranslations } from '../data/homeTranslations';
import { getFaqsData } from '../data/homeDataTranslations';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FaqSectionProps {
  currentLang: SupportedLanguage;
}

export function FaqSection({ currentLang }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const ht = getHomeTranslations(currentLang);
  const faqs = getFaqsData(currentLang);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#EDE3D1]/40 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block text-xs uppercase tracking-widest text-[#C56A18] font-bold font-sanskrit mb-2">
            {t.faqHeadingNative}
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-heading text-[#5A1717] mb-4">
            {t.faqHeadingEng}
          </h2>
          <p className="text-stone-700 text-sm sm:text-base font-sans leading-relaxed">
            {ht.faqSubtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id}
                className="bg-[#FBF6EA] rounded-2xl border border-[#B88935]/30 overflow-hidden shadow-xs transition-colors"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div>
                    <span className="text-[11px] font-semibold text-[#C56A18] block font-sanskrit mb-1">
                      {faq.questionNative}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold font-heading text-[#211D19]">
                      {faq.question}
                    </h3>
                  </div>

                  <div className="p-1 rounded-full bg-[#EDE3D1] text-[#5A1717] shrink-0 mt-1">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#211D19]/80 font-sans leading-relaxed border-t border-[#B88935]/15 pt-4 bg-amber-50/20">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
