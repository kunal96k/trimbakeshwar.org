import React, { useState } from 'react';
import { InnerPageHero } from '../components/InnerPageHero';
import { PujaComparisonTable } from '../components/PujaComparisonTable';
import { PUJA_LIST } from '../data/siteData';
import { useNavigation } from '../context/NavigationContext';
import { Clock, ShieldCheck, ArrowRight, Flame } from 'lucide-react';
import { AppRoute } from '../types';
import { SEO } from '../components/SEO';
import { getBreadcrumbSchema, SEO_CONFIG } from '../utils/seoData';

export function PujaDirectoryPage() {
  const { navigate, openBooking } = useNavigation();
  const [filter, setFilter] = useState<'all' | 'ancestral' | 'shanti' | 'abhishek'>('all');

  const pujaListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Vedic Puja & Shanti Vidhis at Shri Trimbakeshwar',
    description: 'Complete list of authentic Vedic Pooja Vidhis performed at Shri Kshetra Trimbakeshwar by authorized Purohits.',
    itemListElement: PUJA_LIST.map((puja, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: puja.name,
      url: `${SEO_CONFIG.siteUrl}/puja/${puja.slug}`,
      image: `${SEO_CONFIG.siteUrl}${puja.image}`,
      description: puja.description,
    })),
  };

  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Puja Directory', path: '/puja' },
  ]);

  const filteredPujas = PUJA_LIST.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'ancestral') return p.slug === 'narayan-nagbali' || p.slug === 'tripindi-shraddha';
    if (filter === 'shanti') return p.slug === 'kaal-sarp-yog' || p.slug === 'kumbh-vivah';
    if (filter === 'abhishek') return p.slug === 'rudrabhishek' || p.slug === 'maha-mrityunjaya';
    return true;
  });

  return (
    <div className="bg-[#FBF6EA] text-[#211D19] min-h-screen pb-16">
      <SEO
        title="All Vedic Pujas & Shanti Vidhis in Trimbakeshwar | Narayan Nagbali, Kaal Sarp & Tripindi"
        description="Explore and book authentic Vedic Pooja Vidhis at Shri Trimbakeshwar Jyotirlinga. Narayan Nagbali (3 Days), Kaal Sarp Yog Shanti, Tripindi Shraddha, Maha Mrityunjaya Jaap & Rudrabhishek with Hereditary Purohits."
        canonicalPath="/puja"
        keywords={[
          'Trimbakeshwar puja list',
          'Narayan Nagbali Trimbakeshwar booking',
          'Kaal Sarp Yog Shanti cost',
          'Tripindi Shraddha samagri',
          'Rudrabhishek at Trimbakeshwar',
          'Maha Mrityunjaya Anushthan',
          'Kumbh Vivah Trimbakeshwar',
          'Ark Vivah Vidhi',
        ]}
        schema={[pujaListSchema, breadcrumbsSchema]}
      />
      <InnerPageHero
        breadcrumbs={[{ label: 'Puja Directory' }]}
        title="Trimbakeshwar Puja Services"
        nativeTitle="पारंपारिक त्र्यंबकेश्वर विधी व पूजा"
        description="Authentic Vedic rituals performed at Kushavarta Kund and consecrated pilgrim halls by authorized hereditary Gurujis according to Shukla Yajurveda traditions."
        bgImage="/assets/trimbak/narayan-nagbali.webp"
        ctaText="Compare All Pujas"
        onCtaClick={() => {
          const compElem = document.getElementById('comparison-matrix');
          compElem?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 space-y-12">
        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#B88935]/20 pb-4">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-[#C56A18]" />
            <span className="font-heading font-bold text-[#5A1717]">Select Ritual Category</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                filter === 'all' ? 'bg-[#5A1717] text-white' : 'bg-[#EDE3D1] text-stone-700 hover:bg-[#EDE3D1]/80'
              }`}
            >
              All Pujas (6)
            </button>
            <button
              onClick={() => setFilter('ancestral')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                filter === 'ancestral' ? 'bg-[#5A1717] text-white' : 'bg-[#EDE3D1] text-stone-700 hover:bg-[#EDE3D1]/80'
              }`}
            >
              Ancestral / Pitru (2)
            </button>
            <button
              onClick={() => setFilter('shanti')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                filter === 'shanti' ? 'bg-[#5A1717] text-white' : 'bg-[#EDE3D1] text-stone-700 hover:bg-[#EDE3D1]/80'
              }`}
            >
              Shanti Vidhi (2)
            </button>
            <button
              onClick={() => setFilter('abhishek')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                filter === 'abhishek' ? 'bg-[#5A1717] text-white' : 'bg-[#EDE3D1] text-stone-700 hover:bg-[#EDE3D1]/80'
              }`}
            >
              Abhishek & Jaap (2)
            </button>
          </div>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPujas.map((puja) => (
            <div
              key={puja.id}
              className="bg-white border border-stone-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="relative h-44 overflow-hidden bg-stone-900">
                <img
                  src={puja.image || puja.imageUrl || '/assets/trimbak/narayan-nagbali.webp'}
                  alt={puja.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] text-amber-300 font-devanagari border border-amber-400/30">
                  {puja.marathiName}
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-1 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-[#C56A18]" />
                    <span>{puja.duration}</span>
                  </div>
                  <div className="text-[11px] text-stone-300">
                    {puja.significance}
                  </div>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-heading font-bold text-[#5A1717] group-hover:text-[#C56A18] transition-colors">
                    {puja.name}
                  </h3>
                  <p className="text-xs text-stone-600 mt-2 line-clamp-3 leading-relaxed">
                    {puja.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 mt-4 flex items-center gap-2">
                  <button
                    onClick={() => navigate(`/puja/${puja.slug}` as AppRoute)}
                    className="flex-1 py-2 text-xs font-semibold text-[#5A1717] bg-[#EDE3D1]/70 hover:bg-[#EDE3D1] rounded-lg transition-colors text-center"
                  >
                    View Vidhi Details
                  </button>
                  <button
                    onClick={() => openBooking(puja.slug)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#5A1717] to-[#C56A18] hover:from-[#6D1B1B] hover:to-[#B88935] rounded-lg shadow-xs active:scale-95 transition-all"
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table Section */}
        <div id="comparison-matrix" className="pt-6">
          <PujaComparisonTable />
        </div>
      </div>
    </div>
  );
}
