import React from 'react';
import { InnerPageHero } from '../components/InnerPageHero';
import { SACRED_PLACES } from '../data/siteData';
import { useNavigation } from '../context/NavigationContext';
import { MapPin, Sparkles, Navigation, ArrowRight } from 'lucide-react';
import { TempleIcon } from '../components/Motifs';
import { SEO } from '../components/SEO';
import { getBreadcrumbSchema } from '../utils/seoData';

export function SacredPlacesPage() {
  const { navigate, openBooking } = useNavigation();

  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Sacred Places', path: '/sacred-places' },
  ]);

  return (
    <div className="bg-[#FBF6EA] text-[#211D19] min-h-screen pb-16">
      <SEO
        title="Sacred Shrines Around Trimbakeshwar | Kushavarta Kund, Brahmagiri & Gangadwar"
        description="Explore the sacred tirthas around Trimbakeshwar: holy Kushavarta Kund where River Godavari reappears, Brahmagiri mountain peak, Gangadwar, and Sant Nivruttinath Samadhi."
        canonicalPath="/sacred-places"
        keywords={[
          'Kushavarta Kund Trimbakeshwar',
          'Brahmagiri mountain trek',
          'Gangadwar Trimbakeshwar',
          'Sant Nivruttinath Samadhi Mandir',
          'Ahilya Sangam Kund',
        ]}
        schema={breadcrumbsSchema}
      />
      <InnerPageHero
        breadcrumbs={[{ label: 'Sacred Places' }]}
        sanskritMantra="॥ तीर्थक्षेत्र महिमा ॥"
        title="Sacred Tirthas & Holy Places of Trimbak"
        nativeTitle="त्र्यंबकेश्वर क्षेत्रातील प्रमुख पवित्र तीर्थस्थाने"
        description="Discover Kushavarta Kund, Brahmagiri Mountain, Gangadwar, Sant Nivruttinath Samadhi, and other hallowed pilgrim sites around Trimbakeshwar."
        bgImage="/assets/trimbak/kushavarta-tirtha.webp"
        ctaText="Plan Pilgrimage"
        onCtaClick={() => navigate('/temple-guide')}
        ctaIcon={<TempleIcon className="w-4 h-4 text-white" />}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SACRED_PLACES.map((place) => (
            <div
              key={place.id}
              className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="relative h-56 overflow-hidden bg-stone-900">
                <img
                  src={place.imageUrl}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] text-amber-300 font-devanagari border border-amber-400/30">
                  {place.nativeName}
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white text-xs flex items-center justify-between">
                  <div className="flex items-center gap-1 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-[#C56A18]" />
                    <span>{place.distanceFromTemple}</span>
                  </div>
                  <span className="text-[11px] text-amber-200">
                    {place.significance}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-heading font-bold text-[#5A1717] group-hover:text-[#C56A18] transition-colors">
                    {place.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-2.5 leading-relaxed">
                    {place.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] text-stone-500 font-devanagari">
                    {place.spiritualImportance}
                  </span>
                  <button
                    onClick={() => navigate('/temple-guide')}
                    className="text-xs font-semibold text-[#5A1717] hover:text-[#C56A18] inline-flex items-center gap-1"
                  >
                    <span>Visiting Guide</span>
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
