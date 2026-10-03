import React, { useState } from 'react';
import { InnerPageHero } from '../components/InnerPageHero';
import { FAQS_LIST } from '../data/siteData';
import { useNavigation } from '../context/NavigationContext';
import { ChevronDown, Search, HelpCircle, Phone, MessageSquare } from 'lucide-react';
import { SEO } from '../components/SEO';
import { getFAQPageSchema, getBreadcrumbSchema } from '../utils/seoData';

export function FaqsPage() {
  const { navigate, openBooking } = useNavigation();
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaqs = FAQS_LIST.filter((f) =>
    f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.questionNative.includes(searchTerm)
  );

  const faqSchema = getFAQPageSchema(FAQS_LIST);
  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'FAQs', path: '/faqs' },
  ]);

  return (
    <div className="bg-[#FBF6EA] text-[#211D19] min-h-screen pb-16">
      <SEO
        title="Frequently Asked Questions (FAQs) | Trimbakeshwar Puja & Darshan Guide"
        description="Find clear answers to common questions about Trimbakeshwar puja booking, dress codes, Narayan Nagbali procedure, Kaal Sarp Shanti, accommodation, and temple timings."
        canonicalPath="/faqs"
        keywords={[
          'Trimbakeshwar FAQs',
          'Narayan Nagbali rules',
          'Trimbakeshwar dress code',
          'Puja booking questions',
          'Trimbakeshwar accommodation guidance',
        ]}
        schema={[faqSchema, breadcrumbsSchema]}
      />
      <InnerPageHero
        breadcrumbs={[{ label: 'FAQs' }]}
        sanskritMantra="॥ संशयोच्छेदः परमो धर्मः ॥"
        title="Frequently Asked Questions"
        nativeTitle="वारंवार विचारले जाणारे प्रश्न व शंका निरसन"
        description="Comprehensive guidance regarding puja booking procedures, ritual clothing rules, Guruji selection, and temple pilgrimage arrangements."
        bgImage="/assets/trimbak/trimbakeshwar-temple.webp"
        ctaText="Book Puja"
        onCtaClick={() => openBooking()}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 space-y-10">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-3.5 text-[#C56A18]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search questions on dress code, Narayan Nagbali, booking..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-stone-300 bg-white text-sm text-[#211D19] focus:outline-hidden focus:ring-2 focus:ring-[#B88935]"
          />
        </div>

        {/* FAQs Accordion */}
        <div className="bg-white/80 border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="py-8 text-center text-sm text-stone-500">
              No matching questions found. Please contact our devotee helpline directly.
            </div>
          ) : (
            filteredFaqs.map((faq) => (
              <div key={faq.id} className="border-b border-stone-200/70 pb-4 last:border-none last:pb-0">
                <button
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  className="w-full text-left flex items-start justify-between gap-4 py-1 text-sm sm:text-base font-bold text-[#5A1717] hover:text-[#C56A18] transition-colors"
                >
                  <div>
                    <div>{faq.question}</div>
                    <div className="text-xs font-devanagari text-[#B88935] font-normal mt-0.5">
                      {faq.questionNative}
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-stone-400 shrink-0 transition-transform duration-200 ${
                      openId === faq.id ? 'rotate-180 text-[#5A1717]' : ''
                    }`}
                  />
                </button>

                {openId === faq.id && (
                  <div className="mt-3 pl-3 border-l-2 border-[#B88935] text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Still Have Questions? Help Box */}
        <div className="bg-[#EDE3D1]/60 border border-[#B88935]/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-heading font-bold text-[#5A1717] text-base">
              Need personalized guidance on your Gotra or Muhurat?
            </h3>
            <p className="text-xs text-stone-600 mt-0.5">
              Our verified Vedic Gurujis are available to review your horoscope and advise the prescribed ritual.
            </p>
          </div>
          <button
            onClick={() => openBooking()}
            className="py-2.5 px-5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#5A1717] to-[#C56A18] whitespace-nowrap shadow-xs active:scale-95 transition-all"
          >
            Connect with Guruji
          </button>
        </div>
      </div>
    </div>
  );
}
