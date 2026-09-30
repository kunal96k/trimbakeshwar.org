import React, { useState } from 'react';
import { SupportedLanguage, PujaItem } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { getHomeTranslations } from '../data/homeTranslations';
import { PUJA_LIST } from '../data/siteData';
import { Clock, CheckCircle2, ArrowRight, Sparkles, BookOpen, X } from 'lucide-react';

interface PujaSectionProps {
  currentLang: SupportedLanguage;
  onOpenBooking: (vidhiId?: string) => void;
}

const PUJA_MODAL_LABELS: Record<SupportedLanguage, {
  categorySubtitle: string;
  scripturalDesc: string;
  significance: string;
  samagri: string;
  observance: string;
  closeBtn: string;
}> = {
  en: {
    categorySubtitle: 'Shastra Vidhi',
    scripturalDesc: 'Scriptural Description',
    significance: 'Traditional Significance',
    samagri: 'Samagri',
    observance: 'Yajman Observance',
    closeBtn: 'Close',
  },
  mr: {
    categorySubtitle: 'शास्त्रोक्त विधी',
    scripturalDesc: 'शास्त्रोक्त वर्णन',
    significance: 'पारंपरिक महत्त्व',
    samagri: 'पूजा साहित्य',
    observance: 'यजमान नियम व पथ्ये',
    closeBtn: 'बंद करा',
  },
  hi: {
    categorySubtitle: 'शास्त्रोक्त विधि',
    scripturalDesc: 'शास्त्रोक्त वर्णन',
    significance: 'पारंपरिक महत्व',
    samagri: 'पूजा सामग्री',
    observance: 'यजमान नियम व सावधानियां',
    closeBtn: 'बंद करें',
  },
  sa: {
    categorySubtitle: 'शास्त्रोक्तविधिः',
    scripturalDesc: 'शास्त्रोक्तं विवरणम्',
    significance: 'पारम्परिकं महत्त्वम्',
    samagri: 'पूजासामग्री',
    observance: 'यजमाननियमाः',
    closeBtn: 'पिदधातु',
  },
  gu: {
    categorySubtitle: 'શાસ્ત્રોક્ત વિધિ',
    scripturalDesc: 'શાસ્ત્રોક્ત વર્ણન',
    significance: 'પારંપરિક મહત્ત્વ',
    samagri: 'પૂજા સામગ્રી',
    observance: 'યજમાન નિયમ અને આચાર',
    closeBtn: 'બંધ કરો',
  },
  te: {
    categorySubtitle: 'శాస్త్రోక్త విధి',
    scripturalDesc: 'శాస్త్రోక్త వివరణ',
    significance: 'సాంప్రదాయ ప్రాముఖ్యత',
    samagri: 'పూజా సామాగ్రి',
    observance: 'యజమాని పాటించవలసిన నియమాలు',
    closeBtn: 'మూసివేయి',
  },
  kn: {
    categorySubtitle: 'ಶಾಸ್ತ್ರೋಕ್ತ ವಿಧಿ',
    scripturalDesc: 'ಶಾಸ್ತ್ರೋಕ್ತ ವಿವರಣೆ',
    significance: 'ಪಾರಂಪರಿಕ ಮಹತ್ವ',
    samagri: 'ಪೂಜಾ ಸಾಮಗ್ರಿ',
    observance: 'ಯಜಮಾನರ ನಿಯಮಗಳು',
    closeBtn: 'ಮುಚ್ಚಿ',
  },
  ta: {
    categorySubtitle: 'சாஸ்திர சடங்கு',
    scripturalDesc: 'சாஸ்திர விளக்கம்',
    significance: 'பாரம்பரிய முக்கியத்துவம்',
    samagri: 'பூஜை பொருட்கள்',
    observance: 'பக்தர்கள் கடைபிடிக்க வேண்டிய விதிகள்',
    closeBtn: 'மூடுக',
  },
  bn: {
    categorySubtitle: 'শাস্ত্রীয় বিধি',
    scripturalDesc: 'শাস্ত্রীয় বর্ণনা',
    significance: 'ঐতিহ্যবাহী গুরুত্ব',
    samagri: 'পূজা সামগ্রী',
    observance: 'যজমান নিয়ম ও সতর্কতা',
    closeBtn: 'বন্ধ করুন',
  },
  or: {
    categorySubtitle: 'ଶାସ୍ତ୍ରୋକ୍ତ ବିଧି',
    scripturalDesc: 'ଶାସ୍ତ୍ରୋକ୍ତ ବର୍ଣ୍ଣନା',
    significance: 'ପାରମ୍ପରିକ ମହତ୍ତ୍ୱ',
    samagri: 'ପୂଜା ସାମଗ୍ରୀ',
    observance: 'ଯଜମାନ ନିୟମ ଓ ବିଧି',
    closeBtn: 'ବନ୍ଦ କରନ୍ତୁ',
  },
};

const CATEGORY_NAMES: Record<string, Record<SupportedLanguage, string>> = {
  'Pitru Vidhi': {
    en: 'Pitru Vidhi', mr: 'पितृ विधी', hi: 'पितृ विधि', sa: 'पितृविधिः', gu: 'પિતૃ વિધિ', te: 'పితృ విధి', kn: 'ಪಿತೃ ವಿಧಿ', ta: 'பித்ரு சடங்கு', bn: 'পিতৃ বিধি', or: 'ପିତୃ ବିଧି'
  },
  'Shanti Vidhi': {
    en: 'Shanti Vidhi', mr: 'शांती विधी', hi: 'शांति विधि', sa: 'शान्तिविधिः', gu: 'શાંતિ વિધિ', te: 'శాంతి విధి', kn: 'ಶಾಂತಿ ವಿಧಿ', ta: 'சாந்தி சடங்கு', bn: 'শান্তি বিধি', or: 'ଶାନ୍ତି ବିଧି'
  },
  'Vivah': {
    en: 'Vivah Sanskar', mr: 'विवाह संस्कार', hi: 'विवाह संस्कार', sa: 'विवाहसंस्कारः', gu: 'વિવાહ સંસ્કાર', te: 'వివాహ సంస్కారము', kn: 'ವಿವಾಹ ಸಂಸ್ಕಾರ', ta: 'திருமண சடங்கு', bn: 'বিবাহ সংস্কার', or: 'ବିବାହ ସଂସ୍କାର'
  },
  'Anushthan': {
    en: 'Vedic Anushthan', mr: 'वैदिक अनुष्ठान', hi: 'वैदिक अनुष्ठान', sa: 'वैदिकानुष्ठानम्', gu: 'વૈદિક અનુષ્ઠાન', te: 'వైదిక అనుష్ఠానము', kn: 'ವೈದಿಕ ಅನುಷ್ಠಾನ', ta: 'வேத அனுஷ்டானம்', bn: 'বৈদিক অনুষ্ঠান', or: 'ବୈଦିକ ଅନୁଷ୍ଠାନ'
  },
  'Shiva Puja': {
    en: 'Shiva Puja', mr: 'शिव पूजा', hi: 'शिव पूजा', sa: 'शिवपूजा', gu: 'શિવ પૂજા', te: 'శివ పూజ', kn: 'ಶಿವ ಪೂಜೆ', ta: 'சிவ பூஜை', bn: 'শিব পূজা', or: 'ଶିବ ପୂଜା'
  },
};

export function PujaSection({ currentLang, onOpenBooking }: PujaSectionProps) {
  const [selectedPuja, setSelectedPuja] = useState<PujaItem | null>(null);
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const ht = getHomeTranslations(currentLang);
  const modalLabels = PUJA_MODAL_LABELS[currentLang] || PUJA_MODAL_LABELS.en;

  const getCategoryName = (cat: string) => {
    return CATEGORY_NAMES[cat]?.[currentLang] || cat;
  };

  return (
    <section id="puja" className="py-20 sm:py-28 bg-[#EDE3D1]/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block text-xs uppercase tracking-widest text-[#C56A18] font-bold font-sanskrit mb-2">
            {t.pujaEyebrow}
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-heading text-[#5A1717] mb-4">
            {t.pujaHeading}
          </h2>
          <p className="text-stone-700 text-sm sm:text-base font-sans leading-relaxed">
            {t.pujaDesc}
          </p>
        </div>

        {/* 6 Puja Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {PUJA_LIST.map((puja) => {
            const pInfo = ht.pujaNames?.[puja.slug];
            const displayName = pInfo?.name || (currentLang === 'en' ? puja.name : puja.marathiName);
            const displayDesc = pInfo?.desc || puja.description;
            const displayDuration = pInfo?.duration || puja.duration;
            const displayCategory = getCategoryName(puja.category);

            return (
              <div
                key={puja.id}
                id={`puja-card-${puja.slug}`}
                className="flex flex-col justify-between bg-[#FBF6EA] rounded-2xl border border-[#B88935]/30 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                {/* Card Image Banner */}
                <div className="relative h-48 overflow-hidden bg-stone-200">
                  <img
                    src={puja.image}
                    alt={displayName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#241512]/80 via-transparent to-transparent"></div>
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#5A1717]/90 text-amber-200 backdrop-blur-xs border border-amber-300/30">
                    {displayCategory}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-xs font-sanskrit text-amber-200 font-semibold block">
                      {puja.sanskritName}
                    </span>
                    <h3 className="text-lg font-bold font-heading text-white">
                      {displayName}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-[#211D19]/80 font-sans leading-relaxed mb-4">
                      {displayDesc}
                    </p>

                    <div className="space-y-2 py-3 border-y border-[#B88935]/15 mb-4 text-xs text-stone-600">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 font-medium">
                          <Clock className="w-3.5 h-3.5 text-[#C56A18]" />
                          {ht.pujaDurationLabel}
                        </span>
                        <span className="font-semibold text-[#5A1717]">{displayDuration}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
                          {ht.pujaSamagriLabel}
                        </span>
                        <span className="font-medium text-stone-700">{ht.pujaSamagriVal}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={() => setSelectedPuja(puja)}
                      className="px-3 py-2 text-xs font-semibold rounded-xl text-[#5A1717] bg-[#EDE3D1]/60 hover:bg-[#EDE3D1] border border-[#B88935]/30 transition-colors flex items-center justify-center gap-1"
                    >
                      <span>{t.pujaExploreBtn}</span>
                    </button>

                    <button
                      onClick={() => onOpenBooking(puja.id)}
                      className="px-3 py-2 text-xs font-semibold rounded-xl text-white bg-gradient-to-r from-[#5A1717] to-[#C56A18] hover:from-[#6D1B1B] hover:to-[#B88935] shadow-xs hover:shadow transition-all flex items-center justify-center gap-1"
                    >
                      <span>{t.pujaBookBtn}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Puja Detail Modal Drawer */}
      {selectedPuja && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="bg-[#FBF6EA] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#B88935]/40 shadow-2xl p-6 sm:p-8 relative"
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={() => setSelectedPuja(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-200/60 hover:bg-stone-300 text-[#211D19] transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {(() => {
              const modalPInfo = ht.pujaNames?.[selectedPuja.slug];
              const modalName = modalPInfo?.name || (currentLang === 'en' ? selectedPuja.name : selectedPuja.marathiName);
              const modalDesc = modalPInfo?.desc || selectedPuja.description;
              const modalDuration = modalPInfo?.duration || selectedPuja.duration;
              const modalCategory = getCategoryName(selectedPuja.category);

              return (
                <>
                  <div className="mb-5 flex flex-col gap-1 sm:gap-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C56A18] font-sans">
                      {modalCategory} • {modalLabels.categorySubtitle}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold font-sanskrit text-[#5A1717] leading-snug">
                      {selectedPuja.sanskritName}
                    </h3>
                    <div className="text-base font-heading italic text-stone-600">
                      {modalName}
                    </div>
                  </div>

                  <div className="rounded-2xl overflow-hidden h-52 mb-6 border border-[#B88935]/30">
                    <img
                      src={selectedPuja.image}
                      alt={modalName}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="space-y-4 text-sm text-[#211D19]/85 font-sans leading-relaxed mb-6">
                    <div>
                      <h4 className="font-bold text-[#5A1717] text-xs uppercase tracking-wider mb-1">
                        {modalLabels.scripturalDesc}
                      </h4>
                      <p>{modalDesc}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#EDE3D1]/60 border border-[#B88935]/25">
                      <h4 className="font-bold text-[#5A1717] text-xs uppercase tracking-wider mb-1">
                        {modalLabels.significance}
                      </h4>
                      <p>{selectedPuja.significance}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-lg bg-white border border-stone-200">
                        <div className="text-stone-500">{ht.pujaDurationLabel}</div>
                        <div className="font-bold text-[#5A1717]">{modalDuration}</div>
                      </div>
                      <div className="p-3 rounded-lg bg-white border border-stone-200">
                        <div className="text-stone-500">{modalLabels.samagri}</div>
                        <div className="font-bold text-[#5A1717]">{ht.pujaSamagriVal}</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-[#5A1717] text-xs uppercase tracking-wider mb-1">
                        {modalLabels.observance}
                      </h4>
                      <p className="text-xs text-stone-600 italic">
                        {selectedPuja.traditionalObservance}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#B88935]/20">
                    <button
                      onClick={() => setSelectedPuja(null)}
                      className="px-5 py-2.5 rounded-full text-xs font-semibold text-stone-600 hover:bg-stone-200 transition-colors cursor-pointer"
                    >
                      {modalLabels.closeBtn}
                    </button>
                    <button
                      onClick={() => {
                        const vidhiId = selectedPuja.id;
                        setSelectedPuja(null);
                        onOpenBooking(vidhiId);
                      }}
                      className="px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#5A1717] to-[#C56A18] shadow-md hover:shadow-lg transition-all cursor-pointer"
                    >
                      {t.pujaBookBtn} →
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </section>
  );
}
