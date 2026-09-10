import React, { useState } from 'react';
import { SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { getHomeTranslations } from '../data/homeTranslations';
import { getSacredPlacesData, getGurujiSectionData, type SacredPlaceData } from '../data/homeDataTranslations';
import { SACRED_PLACES } from '../data/siteData';
import { MapPin, Clock, Mountain, ArrowRight, X } from 'lucide-react';

interface SacredPlacesSectionProps {
  currentLang: SupportedLanguage;
}

export function SacredPlacesSection({ currentLang }: SacredPlacesSectionProps) {
  const [selectedPlace, setSelectedPlace] = useState<SacredPlaceData | null>(null);
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const ht = getHomeTranslations(currentLang);
  const gd = getGurujiSectionData(currentLang);
  const places = getSacredPlacesData(currentLang);

  // Map image URLs from SACRED_PLACES by id
  const imageMap = React.useMemo(() => {
    const map: Record<string, string> = {};
    SACRED_PLACES.forEach((p) => {
      map[p.id] = p.image;
    });
    return map;
  }, []);

  return (
    <section id="sacred-places" className="py-20 sm:py-28 bg-[#FBF6EA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block text-xs uppercase tracking-widest text-[#C56A18] font-bold font-sanskrit mb-2">
            {t.sacredPlacesHeadingNative}
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-heading text-[#5A1717] mb-4">
            {t.sacredPlacesHeadingEng}
          </h2>
          <p className="text-stone-700 text-sm sm:text-base font-sans leading-relaxed">
            {ht.sacredPlacesSubtitle}
          </p>
        </div>

        {/* 8 Places Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {places.map((place) => {
            const imgSrc = imageMap[place.id] || '/assets/trimbak/kushavarta-tirtha.webp';
            return (
              <div
                key={place.id}
                id={`place-card-${place.id}`}
                className="flex flex-col justify-between bg-[#EDE3D1]/40 rounded-2xl border border-[#B88935]/30 overflow-hidden hover:bg-[#EDE3D1]/80 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                {/* Place Image */}
                <div className="relative h-44 overflow-hidden bg-stone-200">
                  <img
                    src={imgSrc}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#241512]/80 via-transparent to-transparent"></div>
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-semibold bg-[#241512]/90 text-amber-200 backdrop-blur-xs border border-white/10 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#C56A18]" />
                    <span>{place.distanceFromTemple}</span>
                  </div>
                  <div className="absolute bottom-2.5 left-3 right-3 text-white">
                    <span className="text-xs font-sanskrit text-amber-200 font-semibold block">
                      {place.nativeName}
                    </span>
                    <h3 className="text-base font-bold font-heading text-white">
                      {place.name}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-[#211D19]/80 font-sans leading-relaxed line-clamp-3 mb-3">
                      {place.description}
                    </p>

                    <div className="text-[11px] font-medium text-[#5A1717] bg-white/80 p-2 rounded-lg border border-stone-200 mb-3">
                      {place.significance}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedPlace(place)}
                    className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-[#5A1717] bg-[#FBF6EA] border border-[#B88935]/30 hover:bg-white hover:border-[#5A1717]/50 transition-colors flex items-center justify-center gap-1 group/btn cursor-pointer"
                  >
                    <span>{ht.sacredPlacesExploreBtn}</span>
                    <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Place Detail Modal */}
      {selectedPlace && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="bg-[#FBF6EA] text-[#211D19] rounded-3xl max-w-xl w-full border border-[#B88935]/40 shadow-2xl p-6 sm:p-8 relative"
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={() => setSelectedPlace(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-200/60 hover:bg-stone-300 text-[#211D19] transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C56A18] font-sans flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {selectedPlace.distanceFromTemple}
              </span>
              <h3 className="text-2xl font-bold font-sanskrit text-[#5A1717] mt-1">
                {selectedPlace.nativeName}
              </h3>
              <div className="text-base font-heading italic text-stone-600">
                {selectedPlace.name}
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden h-52 mb-4 border border-[#B88935]/30">
              <img
                src={imageMap[selectedPlace.id] || '/assets/trimbak/kushavarta-tirtha.webp'}
                alt={selectedPlace.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-[#211D19]/85 font-sans leading-relaxed mb-6">
              <p>{selectedPlace.description}</p>
              <div className="p-3.5 rounded-xl bg-[#EDE3D1]/60 border border-[#B88935]/25">
                <span className="font-bold text-[#5A1717] block mb-1">
                  {ht.festivalsSignificanceLabel}:
                </span>
                <p>{selectedPlace.significance}</p>
              </div>

              {selectedPlace.timings && (
                <div className="text-xs text-stone-600 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#C56A18]" />
                  <span>{ht.darshanTabTimings}: {selectedPlace.timings}</span>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-3 border-t border-[#B88935]/20">
              <button
                onClick={() => setSelectedPlace(null)}
                className="px-6 py-2 rounded-full text-xs font-semibold text-white bg-[#5A1717] hover:bg-[#6D1B1B] transition-colors cursor-pointer"
              >
                {gd.closeBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default SacredPlacesSection;
