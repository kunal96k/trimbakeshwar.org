import React from 'react';
import { InnerPageHero } from '../components/InnerPageHero';
import { TWELVE_JYOTIRLINGAS } from '../data/siteData';
import { useNavigation } from '../context/NavigationContext';
import { Sparkles, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { LotusIcon, ShankhaIcon, TrishulIcon } from '../components/Motifs';
import { SEO } from '../components/SEO';
import { getPlaceOfWorshipSchema, getBreadcrumbSchema } from '../utils/seoData';

export function JyotirlingaPage() {
  const { navigate, openBooking } = useNavigation();

  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Temple', path: '/temple' },
    { name: 'The Sacred Jyotirlinga', path: '/jyotirlinga' },
  ]);

  return (
    <div className="bg-[#FBF6EA] text-[#211D19] min-h-screen pb-16">
      <SEO
        title="The Sacred Tridev Jyotirlinga of Trimbakeshwar | Brahma, Vishnu, Shiva Linga"
        description="Learn the profound scriptural significance of Shri Trimbakeshwar Jyotirlinga, the unique shrine embodying Brahma, Vishnu, and Rudra situated on the banks of holy Gautami River."
        canonicalPath="/jyotirlinga"
        keywords={[
          'Trimbakeshwar Jyotirlinga',
          'Tridev Jyotirlinga',
          '12 Jyotirlingas in India',
          'Brahma Vishnu Maheshwar linga',
          'Shiva Purana Trimbakeshwar',
        ]}
        schema={[getPlaceOfWorshipSchema(), breadcrumbsSchema]}
      />
      <InnerPageHero
        breadcrumbs={[
          { label: 'Temple', route: '/temple' },
          { label: 'The Sacred Jyotirlinga' },
        ]}
        sanskritMantra="॥ द्वादश ज्योतिर्लिंग स्तोत्रम् ॥"
        title="The Sacred Jyotirlinga of Trimbakeshwar"
        nativeTitle="श्री त्र्यंबकेश्वर ज्योतिर्लिंग महिमा"
        description="The only holy Jyotirlinga enshrining the sacred manifestation of Brahma, Vishnu, and Rudra together in a single natural sanctum cavity."
        bgImage="/assets/trimbak/jyotirlinga.webp"
        ctaText="Book Rudrabhishek"
        onCtaClick={() => openBooking('rudrabhishek')}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 space-y-12 sm:space-y-16">
        {/* Sacred Shloka Banner */}
        <section className="bg-gradient-to-r from-[#5A1717] to-[#731E1E] text-white rounded-2xl p-6 sm:p-8 text-center shadow-lg">
          <div className="text-amber-300 text-xs uppercase tracking-widest font-semibold mb-2">
            ॥ श्री आदि शंकराचार्य विरचित द्वादश ज्योतिर्लिंग स्तोत्रम् ॥
          </div>
          <p className="font-devanagari text-base sm:text-lg md:text-xl font-bold leading-relaxed text-amber-100 max-w-4xl mx-auto">
            सौराष्ट्रे सोमनाथं च श्रीशैले मल्लिकार्जुनम् । उज्जयिन्यां महाकालमोङ्कारममलेश्वरम् ॥<br />
            परल्यां वैद्यनाथं च डाकिन्यां भीमशङ्करम् । सेतुबन्धे तु रामेशं नागेशं दारुकावने ॥<br />
            वारणस्यां तु विश्वेशं <strong>त्र्यम्बकं गौतमीतटे</strong> । हिमालये तु केदारं घुश्मेशं च शिवालये ॥
          </p>
          <div className="text-xs text-amber-200/80 mt-3 font-devanagari">
            एतानि ज्योतिर्लिङ्गानि सायं प्रातः पठेन्नरः । सप्तजन्मकृतं पापं स्मरणेन विनश्यति ॥
          </div>
        </section>

        {/* The Unique Tridev Manifestation */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-bold text-[#C56A18] uppercase tracking-wider">
              Sacred Distinctiveness
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#5A1717]">
              The Supreme Embodiment of the Holy Trinity
            </h2>
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
              While eleven of the sacred Jyotirlingas worship Lord Shiva exclusively as the pillar of divine light (Jyoti Stambha), 
              Trimbakeshwar is unique in all of Sanatan Dharma. The sacred linga is in the form of a three-faced aperture, with 
              three distinct thumbs representing:
            </p>
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-white rounded-xl border border-[#B88935]/30 text-center flex flex-col items-center">
                <LotusIcon className="w-5 h-5 text-[#C56A18] mb-1" />
                <div className="text-xs font-bold text-[#5A1717] mt-1">Lord Brahma</div>
                <div className="text-[11px] text-stone-500">The Creator</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#B88935]/30 text-center flex flex-col items-center">
                <ShankhaIcon className="w-5 h-5 text-[#C56A18] mb-1" />
                <div className="text-xs font-bold text-[#5A1717] mt-1">Lord Vishnu</div>
                <div className="text-[11px] text-stone-500">The Preserver</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#B88935]/30 text-center flex flex-col items-center">
                <TrishulIcon className="w-5 h-5 text-[#C56A18] mb-1" />
                <div className="text-xs font-bold text-[#5A1717] mt-1">Lord Rudra</div>
                <div className="text-[11px] text-stone-500">The Dissolver</div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pt-2">
              Inside this sanctified cavity, an eternal spring of water constantly bubbles from the depths of the earth, 
              symbolizing the subterranean origin of Gautami Godavari before emerging at Kushavarta Kund.
            </p>
          </div>

          <div className="lg:col-span-5 bg-[#EDE3D1]/60 border border-[#B88935]/30 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-[#5A1717] uppercase tracking-wider border-b border-[#B88935]/20 pb-2">
              Puranic Significance
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-stone-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Eighth among the traditional twelve Jyotirlingas in the Shiva Purana.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Direct site where River Godavari (Dakshin Ganga) was released from Lord Shiva locks.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>The place where Sage Gautama attained redemption from Govatya through penance.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Sanctum of the immortal Simhastha Kumbh Mela held once every 12 years.</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={() => navigate('/temple/story')}
                className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-[#5A1717] bg-white hover:bg-[#EDE3D1] border border-[#B88935]/30 transition-colors flex items-center justify-between"
              >
                <span>Read Sacred Puranic Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* The 12 Jyotirlingas Grid */}
        <section>
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="text-xs font-bold text-[#C56A18] uppercase tracking-wider mb-1">
              Dvadasha Jyotirlinga Darshan
            </div>
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#5A1717]">
              The Twelve Sacred Shivalingas of Bharat
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-2">
              Pilgrims revere the twelve divine manifestations across the sacred geography of India.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {TWELVE_JYOTIRLINGAS.map((item, idx) => (
              <div
                key={item.name}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  item.isCurrent
                    ? 'bg-gradient-to-br from-amber-500/15 via-[#EDE3D1] to-white border-[#B88935] shadow-md ring-2 ring-[#B88935]/50'
                    : 'bg-white border-stone-200 hover:border-[#B88935]/40 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-stone-400 font-bold">
                      #{String(idx + 1).padStart(2, '0')}
                    </span>
                    {item.isCurrent && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#5A1717] text-amber-200">
                        Current Shrine
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <h4 className="text-base font-bold text-[#5A1717]">{item.name}</h4>
                    <span className="text-xs font-devanagari text-[#B88935] font-semibold">{item.nativeName}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-stone-500 mt-1">
                    <MapPin className="w-3 h-3 text-[#C56A18]" />
                    <span>{item.location}, {item.state}</span>
                  </div>
                  <p className="text-xs text-stone-600 mt-2.5 leading-relaxed">
                    {item.significance}
                  </p>
                </div>

                {item.isCurrent && (
                  <div className="pt-4 border-t border-[#B88935]/20 mt-4 flex items-center justify-between">
                    <button
                      onClick={() => openBooking('rudrabhishek')}
                      className="text-xs font-bold text-[#5A1717] hover:underline inline-flex items-center gap-1"
                    >
                      <span>Book Abhishek at Trimbak</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
