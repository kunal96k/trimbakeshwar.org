import React from 'react';
import { InnerPageHero } from '../components/InnerPageHero';
import { useNavigation } from '../context/NavigationContext';
import { Landmark, Sparkles, MapPin, Clock, ArrowRight, ShieldCheck, History } from 'lucide-react';
import { TempleIcon } from '../components/Motifs';
import { AppRoute } from '../types';
import { SEO } from '../components/SEO';
import { getPlaceOfWorshipSchema, getBreadcrumbSchema } from '../utils/seoData';

export function TempleOverviewPage() {
  const { navigate, openBooking } = useNavigation();

  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Temple Overview & History', path: '/temple' },
  ]);

  return (
    <div className="bg-[#FBF6EA] text-[#211D19] min-h-screen pb-16">
      <SEO
        title="Shri Trimbakeshwar Temple History, Architecture & Sanctum Heritage"
        description="Explore the historic 18th-century Peshwa-era black basalt Trimbakeshwar Temple in Nashik, Maharashtra. Enshrining the unique three-faced Tridev Jyotirlinga."
        canonicalPath="/temple"
        keywords={[
          'Trimbakeshwar temple architecture',
          'Trimbakeshwar history',
          'Nana Saheb Peshwa temple',
          'Trimbakeshwar basalt mandir',
          'Brahmagiri foothills temple',
        ]}
        schema={[getPlaceOfWorshipSchema(), breadcrumbsSchema]}
      />
      <InnerPageHero
        breadcrumbs={[{ label: 'Temple', route: '/temple' }, { label: 'Overview & History' }]}
        title="Shri Trimbakeshwar Temple"
        nativeTitle="श्री त्र्यंबकेश्वर ज्योतिर्लिंग मंदिर"
        description="The venerable 18th-century black basalt shrine situated at the foothills of Brahmagiri, enshrining the unique three-faced Jyotirlinga of Brahma, Vishnu, and Maheshwar."
        bgImage="/assets/trimbak/trimbakeshwar-temple.webp"
        ctaText="Darshan Timings"
        onCtaClick={() => navigate('/darshan')}
        ctaIcon={<TempleIcon className="w-4 h-4 text-white" />}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 space-y-12 sm:space-y-16">
        {/* Architectural Overview */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6">
            <div>
              <div className="text-xs font-bold text-[#C56A18] uppercase tracking-wider mb-1">
                Heritage & Divinity
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#5A1717]">
                A Living Monument of Vedic Antiquity & Peshwa Craft
              </h2>
              <p className="text-sm sm:text-base text-stone-700 mt-3 leading-relaxed">
                Trimbakeshwar Temple stands as one of the most spiritually charged sanctums in Bharat. 
                Constructed entirely from dark, volcanic basalt stone, the current majestic structure was commissioned by 
                Shrimant Peshwa Balaji Baji Rao (Nana Saheb) between 1755 and 1786 CE at an enormous cost of 16 lakh rupees.
              </p>
              <p className="text-sm sm:text-base text-stone-700 mt-3 leading-relaxed">
                Unlike any other Shivalinga in the world, the Linga here is not an upright stone pillar; rather, it is a concave 
                recess or natural cavity in the floor containing three small thumb-sized emblems representing the Divine Trinity: 
                <strong> Lord Brahma (The Creator)</strong>, <strong>Lord Vishnu (The Preserver)</strong>, and <strong>Lord Shiva (The Destroyer)</strong>.
              </p>
            </div>

            {/* Architecture Highlights */}
            <div className="bg-white/80 border border-[#B88935]/25 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-heading font-bold text-[#5A1717] flex items-center gap-2">
                <Landmark className="w-5 h-5 text-[#C56A18]" />
                <span>Hemadpanthi Nagara Architectural Highlights</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-stone-700">
                <div className="p-3 bg-[#EDE3D1]/40 rounded-xl border border-[#B88935]/20">
                  <div className="font-bold text-[#5A1717] mb-1">The Great Shikhara</div>
                  <p className="text-stone-600 leading-relaxed">
                    Towering curvilinear spire carved with intricate miniature shrines (Urushringas) topped by a gleaming golden Kalash.
                  </p>
                </div>
                <div className="p-3 bg-[#EDE3D1]/40 rounded-xl border border-[#B88935]/20">
                  <div className="font-bold text-[#5A1717] mb-1">Sabha Mandap</div>
                  <p className="text-stone-600 leading-relaxed">
                    A spacious pillared assembly hall with three grand entrance porches facing East, South, and North, providing natural light and ventilation.
                  </p>
                </div>
                <div className="p-3 bg-[#EDE3D1]/40 rounded-xl border border-[#B88935]/20">
                  <div className="font-bold text-[#5A1717] mb-1">Massive Stone Fortification</div>
                  <p className="text-stone-600 leading-relaxed">
                    Enclosed within a gigantic 20-foot-high black stone compound wall that protected the sacred complex throughout historical upheavals.
                  </p>
                </div>
                <div className="p-3 bg-[#EDE3D1]/40 rounded-xl border border-[#B88935]/20">
                  <div className="font-bold text-[#5A1717] mb-1">The Nandi Pavilion</div>
                  <p className="text-stone-600 leading-relaxed">
                    Enshrines a monolithic polished Nandi bull facing the inner sanctum, carved with ceremonial brass bells and garlands.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Fast Facts */}
          <div className="lg:col-span-4 bg-[#EDE3D1]/60 border border-[#B88935]/30 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-[#5A1717] uppercase tracking-wider border-b border-[#B88935]/20 pb-2 flex items-center gap-2">
              <History className="w-4 h-4 text-[#C56A18]" />
              <span>Temple Key Facts</span>
            </h3>

            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <div className="text-[11px] font-semibold text-stone-500 uppercase">Presiding Deity</div>
                <div className="font-bold text-[#5A1717]">Tryambakeshwar (Tridev Linga)</div>
              </div>

              <div>
                <div className="text-[11px] font-semibold text-stone-500 uppercase">Constructed By</div>
                <div className="font-semibold text-stone-800">Shrimant Peshwa Balaji Baji Rao</div>
              </div>

              <div>
                <div className="text-[11px] font-semibold text-stone-500 uppercase">Period of Construction</div>
                <div className="text-stone-700">1755 – 1786 CE (31 Years)</div>
              </div>

              <div>
                <div className="text-[11px] font-semibold text-stone-500 uppercase">Architectural Style</div>
                <div className="text-stone-700">Hemadpanthi style of Nagara Architecture</div>
              </div>

              <div>
                <div className="text-[11px] font-semibold text-stone-500 uppercase">Primary Holy Water Body</div>
                <div className="text-stone-700">Kushavarta Tirtha (Gautami Godavari)</div>
              </div>

              <div>
                <div className="text-[11px] font-semibold text-stone-500 uppercase">Holy Mountain</div>
                <div className="text-stone-700">Brahmagiri (Source of Godavari River)</div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#B88935]/20 space-y-2">
              <button
                onClick={() => navigate('/jyotirlinga')}
                className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-[#5A1717] bg-white border border-[#B88935]/30 hover:bg-[#EDE3D1] transition-colors flex items-center justify-between"
              >
                <span>The Sacred Jyotirlinga</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => navigate('/darshan')}
                className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-[#5A1717] bg-white border border-[#B88935]/30 hover:bg-[#EDE3D1] transition-colors flex items-center justify-between"
              >
                <span>Darshan & Daily Schedule</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => openBooking()}
                className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#5A1717] to-[#C56A18] shadow-xs active:scale-98 transition-all text-center"
              >
                Book Traditional Puja
              </button>
            </div>
          </div>
        </section>

        {/* Section: The Three Faces & The Golden Crown */}
        <section className="bg-gradient-to-br from-white to-[#EDE3D1]/50 border border-[#B88935]/30 rounded-2xl p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="text-xs font-bold text-[#C56A18] uppercase tracking-wider mb-1">
                Solemn Rarity
              </div>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#5A1717]">
                The Three-Faced Linga & The Golden Crown (Suvarna Mukut)
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 mt-3 leading-relaxed">
                In all other eleven Jyotirlingas, Shiva alone is worshipped. At Trimbakeshwar, the cavity holds the Trinity.
                Because the continuous spring of holy Godavari water emanates inside this hollow, constant moisture protects 
                the naturally eroded thumb-sized icons.
              </p>
              <p className="text-xs sm:text-sm text-stone-700 mt-3 leading-relaxed">
                Every Monday between <strong>04:30 PM and 05:30 PM</strong>, the famous diamond-and-ruby studded 
                <strong> Suvarna Mukut (Golden Crown)</strong>—dating back to the era of the Pandavas and adorned during the Peshwa reign—is placed 
                ceremoniously upon the deities for a special public Darshan and palanquin procession.
              </p>
              <div className="mt-4">
                <button
                  onClick={() => navigate('/darshan')}
                  className="text-xs font-bold text-[#5A1717] hover:text-[#C56A18] inline-flex items-center gap-1 group"
                >
                  <span>Read complete Monday Suvarna Mukut timings</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#B88935]/40 h-64 sm:h-72">
              <img
                src="/assets/trimbak/mukut-trimbak.webp"
                alt="Suvarna Mukut Darshan"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <div className="text-xs font-bold font-devanagari text-amber-300">सुवर्ण मुकुट दर्शन सोहळा</div>
                <div className="text-[11px] text-stone-200">Monday evening weekly procession through Trimbak streets</div>
              </div>
            </div>
          </div>
        </section>

        {/* Explore More Temple Links */}
        <section className="pt-4">
          <h3 className="text-lg font-heading font-bold text-[#5A1717] mb-4">
            Continue Exploring Trimbakeshwar Kshetra
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/jyotirlinga')}
              className="text-left p-4 rounded-xl bg-white border border-stone-200 hover:border-[#B88935]/40 hover:shadow-xs transition-all"
            >
              <div className="text-xs font-bold text-[#5A1717]">The 12 Jyotirlingas</div>
              <div className="text-[11px] text-stone-600 mt-1">Explore all 12 sacred abodes across India</div>
            </button>
            <button
              onClick={() => navigate('/temple/story')}
              className="text-left p-4 rounded-xl bg-white border border-stone-200 hover:border-[#B88935]/40 hover:shadow-xs transition-all"
            >
              <div className="text-xs font-bold text-[#5A1717]">Sacred Puranic Story</div>
              <div className="text-[11px] text-stone-600 mt-1">Sage Gautama penance & Holy Godavari descent</div>
            </button>
            <button
              onClick={() => navigate('/temple-guide')}
              className="text-left p-4 rounded-xl bg-white border border-stone-200 hover:border-[#B88935]/40 hover:shadow-xs transition-all"
            >
              <div className="text-xs font-bold text-[#5A1717]">Practical Pilgrim Guide</div>
              <div className="text-[11px] text-stone-600 mt-1">Dress code, rules, luggage, etiquette</div>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
