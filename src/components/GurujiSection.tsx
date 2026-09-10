import React, { useState } from 'react';
import { SupportedLanguage, GurujiItem } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { getHomeTranslations } from '../data/homeTranslations';
import { getGurujiSectionData } from '../data/homeDataTranslations';
import { GURUJI_LIST } from '../data/siteData';
import { Award, BookOpen, Star, Phone, MessageSquare, X, CheckCircle2 } from 'lucide-react';

interface GurujiSectionProps {
  currentLang: SupportedLanguage;
  onOpenBooking: (vidhiId?: string, gurujiId?: string) => void;
}

const SPOKEN_LANG_NAMES: Record<string, Record<SupportedLanguage, string>> = {
  'Marathi': {
    en: 'Marathi', mr: 'मराठी', hi: 'मराठी', sa: 'महाराष्ट्री', gu: 'મરાઠી', te: 'మరాఠీ', kn: 'ಮರಾಠಿ', ta: 'மராத்தி', bn: 'মারাঠি', or: 'ମରାଠୀ'
  },
  'Hindi': {
    en: 'Hindi', mr: 'हिंदी', hi: 'हिंदी', sa: 'हिन्दी', gu: 'હિન્દી', te: 'హిందీ', kn: 'ಹಿಂದಿ', ta: 'இந்தி', bn: 'হিন্দি', or: 'ହିନ୍ଦୀ'
  },
  'English': {
    en: 'English', mr: 'इंग्रजी', hi: 'अंग्रेजी', sa: 'आङ्ग्लम्', gu: 'અંગ્રેજી', te: 'ఇంగ్లీష్', kn: 'ಇಂಗ್ಲಿಷ್', ta: 'ஆங்கிலம்', bn: 'ইংরেজি', or: 'ଇଂରାଜୀ'
  },
  'Sanskrit': {
    en: 'Sanskrit', mr: 'संस्कृत', hi: 'संस्कृत', sa: 'संस्कृतम्', gu: 'સંસ્કૃત', te: 'సంస్కృతం', kn: 'ಸಂಸ್ಕೃತ', ta: 'சமஸ்கிருதம்', bn: 'সংস্কৃত', or: 'ସଂସ୍କୃତ'
  },
  'Gujarati': {
    en: 'Gujarati', mr: 'गुजराती', hi: 'गुजराती', sa: 'गौर्जरा', gu: 'ગુજરાતી', te: 'ગુજરાતી', kn: 'ಗುಜರಾತಿ', ta: 'குஜராத்தி', bn: 'গুজরাটি', or: 'ଗୁଜରାଟୀ'
  },
  'Bengali': {
    en: 'Bengali', mr: 'बंगाली', hi: 'बंगाली', sa: 'वङ्गीया', gu: 'બંગાળી', te: 'బెంగాలీ', kn: 'ಬೆಂಗಾಲಿ', ta: 'வங்காளம்', bn: 'বাংলা', or: 'ବଙ୍ଗାଳୀ'
  },
  'Kannada': {
    en: 'Kannada', mr: 'कन्नड', hi: 'कन्नड़', sa: 'कन्नडम्', gu: 'કન્નડ', te: 'కన్నడ', kn: 'ಕನ್ನಡ', ta: 'கன்னடம்', bn: 'কন্নড়', or: 'କନ୍ନଡ଼'
  },
};

const SPECIALTY_NAMES: Record<string, Record<SupportedLanguage, string>> = {
  'Narayan Nagbali': {
    en: 'Narayan Nagbali', mr: 'नारायण नागबली', hi: 'नारायण नागबली', sa: 'नारायणनागबलिः', gu: 'નારાયણ નાગબલી', te: 'నారాయణ నాగబలి', kn: 'ನಾರಾಯಣ ನಾಗಬಲಿ', ta: 'நாராயண நாகபலி', bn: 'নারায়ণ নাগবলি', or: 'ନାରାୟଣ ନାଗବଳି'
  },
  'Tripindi Shraddha': {
    en: 'Tripindi Shraddha', mr: 'त्रिपिंडी श्राद्ध', hi: 'त्रिपिंडी श्राद्ध', sa: 'त्रिपिण्डीश्राद्धम्', gu: 'ત્રિપિંડી શ્રાદ્ધ', te: 'త్రిపిండి శ్రాద్ధం', kn: 'ತ್ರಿಪಿಂಡಿ ಶ್ರಾದ್ಧ', ta: 'திரிபிண்டி சிராத்தம்', bn: 'ত্রিপিন্ডী শ্রাদ্ধ', or: 'ତ୍ରିପିଣ୍ଡୀ ଶ୍ରାଦ୍ଧ'
  },
  'Rudrabhishek': {
    en: 'Rudrabhishek', mr: 'रुद्राभिषेक', hi: 'रुद्राभिषेक', sa: 'रुद्राभिषेकः', gu: 'રુદ્રાભિષેક', te: 'రుద్రాభిషేకం', kn: 'ರುದ್ರಾಭಿಷೇಕ', ta: 'ருத்ராபிஷேகம்', bn: 'রুদ্রাভিষেক', or: 'ରୁଦ୍ରାଭିଷେକ'
  },
  'Kaal Sarp Shanti': {
    en: 'Kaal Sarp Shanti', mr: 'कालसर्प शांती', hi: 'कालसर्प शांति', sa: 'कालसर्पशान्तिः', gu: 'કાલસર્પ શાંતિ', te: 'కాలసర్ప శాంతి', kn: 'ಕಾಲಸರ್ಪ ಶಾಂತಿ', ta: 'காலசர்ப்ப சாந்தி', bn: 'কালসর্প শান্তি', or: 'କାଳସର୍ପ ଶାନ୍ତି'
  },
  'Maha Mrityunjaya Jaap': {
    en: 'Maha Mrityunjaya Jaap', mr: 'महामृत्युंजय जप', hi: 'महामृत्युंजय जप', sa: 'महामृत्युञ्जयजपः', gu: 'મહામૃત્યુંજય જપ', te: 'మహామృత్యుంజయ జపం', kn: 'ಮಹಾಮೃತ್ಯುಂಜಯ ಜಪ', ta: 'மகா மிருத்யுஞ்சய ஜபம்', bn: 'মহামৃত্যুঞ্জয় জপ', or: 'ମହାମୃତ୍ୟୁଞ୍ଜୟ ଜପ'
  },
  'Navagraha Homa': {
    en: 'Navagraha Homa', mr: 'नवग्रह होम', hi: 'नवग्रह होम', sa: 'नवग्रहहोमः', gu: 'નવગ્રહ હોમ', te: 'నవగ్రహ హోమం', kn: 'ನವಗ್ರಹ ಹೋಮ', ta: 'நவக்கிரக ஹோமம்', bn: 'নবগ্রহ হোম', or: 'ନବଗ୍ରହ ହୋମ'
  },
  'Kumbh Vivah': {
    en: 'Kumbh Vivah', mr: 'कुंभ विवाह', hi: 'कुंभ विवाह', sa: 'कुम्भविवाहः', gu: 'કુંભ વિવાહ', te: 'కుంభ వివాహం', kn: 'ಕುಂಭ ವಿವಾಹ', ta: 'கும்ப விவாகம்', bn: 'কুম্ভ বিবাহ', or: 'କୁମ୍ଭ ବିବାହ'
  },
  'Laghu Rudra': {
    en: 'Laghu Rudra', mr: 'लघु रुद्र', hi: 'लघु रुद्र', sa: 'लघुरुद्रः', gu: 'લઘુ રુદ્ર', te: 'లఘు రుద్ర', kn: 'ಲಘು ರುದ್ರ', ta: 'லகு ருத்ர', bn: 'লঘু রুদ্র', or: 'ଲଘୁ ରୁଦ୍ର'
  },
  'Maha Rudrabhishek': {
    en: 'Maha Rudrabhishek', mr: 'महारुद्राभिषेक', hi: 'महारुद्राभिषेक', sa: 'महारुद्राभिषेकः', gu: 'મહારુદ્રાભિષેક', te: 'మహారుద్రాభిషేకం', kn: 'ಮಹಾರುದ್ರಾಭಿಷೇಕ', ta: 'மகா ருத்ராபிஷேகம்', bn: 'মহারুদ্রাভিষেক', or: 'ମହାରୁଦ୍ରାଭିଷେକ'
  },
  'Vastu Shanti': {
    en: 'Vastu Shanti', mr: 'वास्तु शांती', hi: 'वास्तु शांति', sa: 'वास्तुशान्तिः', gu: 'વાસ્તુ શાંતિ', te: 'వాస్తు శాಂತಿ', kn: 'ವಾಸ್ತು ಶಾಂತಿ', ta: 'வாஸ்து சாந்தி', bn: 'বাস্তু শান্তি', or: 'ବାସ୍ତୁ ଶାନ୍ତି'
  },
};

export function GurujiSection({ currentLang, onOpenBooking }: GurujiSectionProps) {
  const [selectedGuruji, setSelectedGuruji] = useState<GurujiItem | null>(null);
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const ht = getHomeTranslations(currentLang);
  const gd = getGurujiSectionData(currentLang);

  const translateSpokenLang = (langName: string) => {
    return SPOKEN_LANG_NAMES[langName]?.[currentLang] || langName;
  };

  const translateSpecialty = (spec: string) => {
    return SPECIALTY_NAMES[spec]?.[currentLang] || spec;
  };

  return (
    <section id="guruji" className="py-20 sm:py-28 bg-[#FBF6EA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block text-xs uppercase tracking-widest text-[#C56A18] font-bold font-sanskrit mb-2">
            {t.gurujiHeadingNative}
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-heading text-[#5A1717] mb-4">
            {t.gurujiHeadingEng}
          </h2>
          <p className="text-stone-700 text-sm sm:text-base font-sans leading-relaxed">
            {t.gurujiDesc}
          </p>
        </div>

        {/* Guruji Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {GURUJI_LIST.map((guruji) => {
            const displayName = currentLang === 'en' ? guruji.name : guruji.titleNative;
            const displayTitle = currentLang === 'en' ? guruji.title : guruji.name;

            return (
              <div
                key={guruji.id}
                id={`guruji-card-${guruji.id}`}
                className="bg-[#EDE3D1]/40 rounded-2xl border border-[#B88935]/30 p-5 flex flex-col justify-between hover:bg-[#EDE3D1]/80 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div>
                  {/* Avatar & Rating Badge */}
                  <div className="relative mb-4 flex justify-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#B88935] shadow-md group-hover:scale-105 transition-transform">
                      <img
                        src={guruji.avatar}
                        alt={displayName}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-[#5A1717] text-white text-[11px] font-bold flex items-center gap-1 shadow-sm">
                      <Star className="w-3 h-3 text-amber-300 fill-amber-300" />
                      <span>{guruji.rating}</span>
                    </div>
                  </div>

                  {/* Name & Title */}
                  <div className="text-center mb-3">
                    <h3 className="text-base font-bold font-heading text-[#211D19] group-hover:text-[#5A1717] transition-colors">
                      {displayName}
                    </h3>
                    <div className="text-xs font-sanskrit text-[#5A1717] font-semibold">
                      {displayTitle}
                    </div>
                    <div className="text-[11px] text-[#C56A18] font-semibold mt-1">
                      {guruji.experienceYears}+ {t.gurujiExp}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="mb-3 py-2 border-y border-[#B88935]/15 text-[11px] text-stone-600">
                    <span className="font-semibold text-stone-800">{ht.gurujiLanguagesLabel}: </span>
                    <span>{guruji.languages.map(translateSpokenLang).join(' • ')}</span>
                  </div>

                  {/* Specialties */}
                  <div className="mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
                      {ht.gurujiSpecialtiesLabel}:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {guruji.specialties.map((spec) => (
                        <span
                          key={spec}
                          className="px-2 py-0.5 rounded-md bg-white text-[10px] font-medium text-[#5A1717] border border-stone-200"
                        >
                          {translateSpecialty(spec)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => setSelectedGuruji(guruji)}
                    className="px-3 py-2 rounded-xl text-xs font-semibold text-[#5A1717] bg-white hover:bg-amber-50 border border-stone-300 transition-colors cursor-pointer"
                  >
                    {t.gurujiViewProfile}
                  </button>

                  <button
                    onClick={() => onOpenBooking(undefined, guruji.id)}
                    className="px-3 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#5A1717] to-[#C56A18] hover:from-[#6D1B1B] hover:to-[#B88935] shadow-xs hover:shadow transition-all cursor-pointer"
                  >
                    {ht.gurujiBookVidhiBtn}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer / Transparency Note */}
        <div className="text-center text-xs text-stone-500 font-sans max-w-xl mx-auto">
          <span>{gd.disclaimerNote}</span>
        </div>
      </div>

      {/* Guruji Profile Modal */}
      {selectedGuruji && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="bg-[#FBF6EA] text-[#211D19] rounded-3xl max-w-lg w-full border border-[#B88935]/40 shadow-2xl p-6 sm:p-8 relative"
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={() => setSelectedGuruji(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-200/60 hover:bg-stone-300 text-[#211D19] transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-4">
              <img
                src={selectedGuruji.avatar}
                alt={selectedGuruji.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#B88935]"
                referrerPolicy="no-referrer"
              />
              <div>
                <h3 className="text-lg sm:text-xl font-bold font-heading text-[#5A1717]">
                  {selectedGuruji.name}
                </h3>
                <div className="text-xs font-sanskrit text-stone-700">
                  {selectedGuruji.titleNative}
                </div>
                <div className="text-xs text-[#C56A18] font-semibold mt-0.5">
                  {selectedGuruji.experienceYears}+ {gd.yearsVedicExp}
                </div>
              </div>
            </div>

            <div className="space-y-3 text-xs text-[#211D19]/80 mb-6">
              <p className="leading-relaxed">{selectedGuruji.bio}</p>

              <div className="p-3 rounded-xl bg-[#EDE3D1]/60 border border-[#B88935]/25 space-y-1.5">
                <div>
                  <span className="font-bold text-stone-700">{gd.paramparaLabel}: </span>
                  <span>{selectedGuruji.purohitParampara}</span>
                </div>
                <div>
                  <span className="font-bold text-stone-700">{gd.educationLabel}: </span>
                  <span>{selectedGuruji.education}</span>
                </div>
                <div>
                  <span className="font-bold text-stone-700">{gd.languagesLabel}: </span>
                  <span>{selectedGuruji.languages.map(translateSpokenLang).join(', ')}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#B88935]/20">
              <button
                onClick={() => setSelectedGuruji(null)}
                className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-200 rounded-full cursor-pointer"
              >
                {gd.closeBtn}
              </button>
              <button
                onClick={() => {
                  const gId = selectedGuruji.id;
                  setSelectedGuruji(null);
                  onOpenBooking(undefined, gId);
                }}
                className="px-6 py-2 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#5A1717] to-[#C56A18] shadow-sm hover:shadow cursor-pointer"
              >
                {gd.bookWithGurujiBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
