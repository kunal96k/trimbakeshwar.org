import React, { useState, useMemo } from 'react';
import { InnerPageHero } from '../components/InnerPageHero';
import { GURUJI_LIST } from '../data/siteData';
import { useNavigation } from '../context/NavigationContext';
import { ShieldCheck, Phone, MessageSquare, Search, Award, BookOpen, Check } from 'lucide-react';

export function GurujiDirectoryPage() {
  const { navigate, openBooking } = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  const allSpecialties = ['All', 'Narayan Nagbali', 'Tripindi Shraddha', 'Kaal Sarp Yog', 'Kumbh Vivah', 'Maha Mrityunjaya', 'Rudrabhishek'];
  const allLanguages = ['All', 'Marathi', 'Hindi', 'Gujarati', 'English', 'Sanskrit'];

  const filteredGurujis = useMemo(() => {
    return GURUJI_LIST.filter((g) => {
      const matchesSearch =
        g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.titleNative.includes(searchQuery) ||
        g.bio.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLang =
        selectedLanguage === 'All' || g.languages.includes(selectedLanguage);

      const matchesSpec =
        selectedSpecialty === 'All' ||
        g.specialties.some((s) => s.toLowerCase().includes(selectedSpecialty.toLowerCase()));

      return matchesSearch && matchesLang && matchesSpec;
    });
  }, [searchQuery, selectedLanguage, selectedSpecialty]);

  return (
    <div className="bg-[#FBF6EA] text-[#211D19] min-h-screen pb-16">
      <InnerPageHero
        breadcrumbs={[{ label: 'Guruji Directory' }]}
        sanskritMantra="॥ विद्वान् सर्वत्र पूज्यते ॥"
        title="Authorized Hereditary Vedic Gurujis"
        nativeTitle="त्र्यंबकेश्वर अधिकृत वेदशास्त्रसंपन्न पुरोहित"
        description="Connect with authentic, officially recognized hereditary Vedic Purohits from established Trimbak families, well-versed in Shukla Yajurveda and Shastra rituals."
        bgImage="/assets/trimbak/tamrapatra-heritage.png"
        ctaText="Book Puja with Guruji"
        onCtaClick={() => openBooking()}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 space-y-10">
        {/* Verification Guarantee Banner */}
        <section className="bg-emerald-900/10 border border-emerald-600/30 rounded-2xl p-5 flex items-center gap-4 text-emerald-950">
          <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-sm sm:text-base">
              100% Authorized & Certified Trimbakeshwar Purohits
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
              All Gurujis on this portal possess hereditary ancestral rights (Purohit Parampara), verified Vedic credentials, and adhere strictly to prescribed Shastra rituals without commercial exploitation.
            </p>
          </div>
        </section>

        {/* Search & Filter Controls */}
        <div className="bg-white/80 border border-stone-200 rounded-2xl p-4 sm:p-5 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#C56A18]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Guruji by name or Vedic title..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-[#B88935]"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100 text-xs">
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              <span className="text-stone-500 font-bold whitespace-nowrap">Specialty:</span>
              {allSpecialties.map((spec) => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpecialty(spec)}
                  className={`px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-colors cursor-pointer ${
                    selectedSpecialty === spec
                      ? 'bg-[#5A1717] text-white'
                      : 'bg-[#EDE3D1]/60 text-stone-700 hover:bg-[#EDE3D1]'
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto py-1">
              <span className="text-stone-500 font-bold whitespace-nowrap">Language:</span>
              {allLanguages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-colors cursor-pointer ${
                    selectedLanguage === lang
                      ? 'bg-[#C56A18] text-white'
                      : 'bg-[#EDE3D1]/60 text-stone-700 hover:bg-[#EDE3D1]'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Guruji Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredGurujis.length === 0 ? (
            <div className="col-span-2 py-12 text-center text-stone-500 text-sm">
              No Gurujis matched your current filters. Try resetting the language or specialty filters.
            </div>
          ) : (
            filteredGurujis.map((guruji) => (
              <div
                key={guruji.id}
                className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start gap-4">
                    <img
                      src={guruji.avatar}
                      alt={guruji.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#B88935]/30 shadow-xs shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className="text-base sm:text-lg font-heading font-bold text-[#5A1717]">
                          {guruji.name}
                        </h3>
                        {guruji.isCertified && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            <ShieldCheck className="w-3 h-3" />
                            Verified
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-devanagari text-[#B88935] font-semibold mt-0.5">
                        {guruji.titleNative}
                      </div>
                      <div className="text-[11px] text-stone-500 mt-1 flex items-center gap-2">
                        <span className="font-semibold text-stone-800">{guruji.experienceYears}+ Years Vidhi Experience</span>
                        <span>•</span>
                        <span>{guruji.lineage}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 mt-3.5 leading-relaxed">
                    {guruji.bio}
                  </p>

                  <div className="mt-4 pt-3 border-t border-stone-100 space-y-2">
                    <div className="text-[11px]">
                      <span className="font-semibold text-stone-700">Ritual Specialties: </span>
                      <span className="text-[#5A1717]">{guruji.specialties.join(' • ')}</span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-stone-500">
                      <span className="font-semibold text-stone-700">Languages: </span>
                      <span>{guruji.languages.join(', ')}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 mt-4 flex items-center gap-2.5">
                  <button
                    onClick={() => openBooking('narayan-nagbali', guruji.id)}
                    className="flex-1 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#5A1717] to-[#C56A18] hover:from-[#6D1B1B] hover:to-[#B88935] rounded-xl shadow-xs transition-all text-center cursor-pointer"
                  >
                    Book Puja with {guruji.name.split(' ')[0]}
                  </button>
                  <a
                    href={`tel:${guruji.contactPhone}`}
                    className="p-2.5 rounded-xl bg-[#EDE3D1]/60 text-[#5A1717] hover:bg-[#EDE3D1] transition-colors"
                    title="Direct Helpline"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
