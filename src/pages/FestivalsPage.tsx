import React from 'react';
import { InnerPageHero } from '../components/InnerPageHero';
import { FESTIVALS_LIST } from '../data/siteData';
import { useNavigation } from '../context/NavigationContext';
import { Sparkles, Calendar, Clock, ArrowRight } from 'lucide-react';
import { KumbhaIcon } from '../components/Motifs';

export function FestivalsPage() {
  const { navigate, openBooking } = useNavigation();

  return (
    <div className="bg-[#FBF6EA] text-[#211D19] min-h-screen pb-16">
      <InnerPageHero
        breadcrumbs={[{ label: 'Festivals' }]}
        sanskritMantra="॥ उत्सवो जयते सदा ॥"
        title="Festivals & Holy Celebrations"
        nativeTitle="त्र्यंबकेश्वरचे प्रमुख उत्सव व पर्वकाळ"
        description="Experience the divine splendor of Simhastha Kumbh Mela, Maha Shivratri, Shravan Maas Somvar, Tripuri Purnima, and traditional temple rathotsav."
        bgImage="/assets/trimbak/mahashivratri.webp"
        ctaText="Book Festival Puja"
        onCtaClick={() => openBooking()}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 space-y-12">
        {/* Simhastha Kumbh Highlight Banner */}
        <section className="bg-gradient-to-r from-[#5A1717] via-[#C56A18] to-[#5A1717] text-white rounded-2xl p-6 sm:p-8 shadow-lg">
          <div className="flex items-start gap-4">
            <KumbhaIcon className="w-10 h-10 text-amber-300 shrink-0" />
            <div>
              <div className="text-xs uppercase tracking-widest text-amber-300 font-bold">
                The Crown Festival of Sanatan Dharma
              </div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-white mt-1">
                The Simhastha Kumbh Mela at Trimbakeshwar
              </h2>
              <p className="text-xs sm:text-sm text-stone-200 mt-2 leading-relaxed">
                Occurring once every twelve solar years when Brihaspati (Jupiter) enters the zodiac sign of Simha (Leo) 
                and the Sun enters Aries (Mesha), Trimbakeshwar becomes the global capital of Shaiva saints, Akhadas, 
                and millions of pilgrims who gather for the sacred Shahi Snan at Kushavarta Kund.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-amber-200 bg-black/30 px-3 py-1.5 rounded-lg border border-amber-300/30">
                <Calendar className="w-3.5 h-3.5 text-amber-300" />
                <span>Next Upcoming Simhastha: 2027</span>
              </div>
            </div>
          </div>
        </section>

        {/* Festival Cards */}
        <div className="space-y-6">
          {FESTIVALS_LIST.map((fest) => (
            <div
              key={fest.id}
              className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row gap-6 items-start"
            >
              <div className="w-full sm:w-48 h-36 rounded-xl overflow-hidden bg-stone-900 shrink-0 relative">
                <img
                  src={fest.imageUrl}
                  alt={fest.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-2 left-2 text-[11px] font-devanagari text-amber-300 font-bold">
                  {fest.nativeName}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <h3 className="text-lg sm:text-xl font-heading font-bold text-[#5A1717]">
                    {fest.name}
                  </h3>
                  <span className="text-xs text-[#C56A18] font-semibold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    {fest.traditionalPeriod}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                  {fest.description}
                </p>

                <div className="mt-3 pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="text-stone-500">
                    <strong className="text-stone-700">Special Observances: </strong>
                    {fest.specialObservances.join(' • ')}
                  </div>
                  <button
                    onClick={() => openBooking('rudrabhishek')}
                    className="text-[#5A1717] font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    <span>Book Abhishek for Festival</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
