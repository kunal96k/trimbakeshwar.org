import React, { useState } from 'react';
import { SupportedLanguage, GurujiItem } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { getHomeTranslations } from '../data/homeTranslations';
import { getGurujiSectionData } from '../data/homeDataTranslations';
import { GURUJI_LIST } from '../data/siteData';
import {
  Award,
  BookOpen,
  Star,
  Phone,
  MessageSquare,
  X,
  CheckCircle2,
  Maximize2,
  ShieldCheck,
  Calendar,
  Sparkles,
} from 'lucide-react';

interface GurujiSectionProps {
  currentLang: SupportedLanguage;
  onOpenBooking: (vidhiId?: string, gurujiId?: string) => void;
}

const SPOKEN_LANG_NAMES: Record<string, Record<SupportedLanguage, string>> = {
  Marathi: {
    en: 'Marathi', mr: 'मराठी', hi: 'मराठी', sa: 'महाराष्ट्री', gu: 'મરાઠી', te: 'మరాఠీ', kn: 'ಮರಾಠಿ', ta: 'மராத்தி', bn: 'মারাঠি', or: 'ମରାଠୀ',
  },
  Hindi: {
    en: 'Hindi', mr: 'हिंदी', hi: 'हिंदी', sa: 'हिन्दी', gu: 'હિન્દી', te: 'హిందీ', kn: 'ಹಿಂದಿ', ta: 'இந்தி', bn: 'হিন্দি', or: 'ହିନ୍ଦୀ',
  },
  English: {
    en: 'English', mr: 'इंग्रजी', hi: 'अंग्रेजी', sa: 'आङ्ग्लम्', gu: 'અંગ્રેજી', te: 'ఇంగ్లీష్', kn: 'ಇಂಗ್ಲಿಷ್', ta: 'ஆங்கிலம்', bn: 'ইংরেজি', or: 'ଇଂରାଜୀ',
  },
  Sanskrit: {
    en: 'Sanskrit', mr: 'संस्कृत', hi: 'संस्कृत', sa: 'संस्कृतम्', gu: 'સંસ્કૃત', te: 'సంస్కృతం', kn: 'ಸಂಸ್ಕೃತ', ta: 'சமஸ்கிருதம்', bn: 'সংস্কৃত', or: 'ସଂସ୍କୃତ',
  },
  Gujarati: {
    en: 'Gujarati', mr: 'गुजराती', hi: 'गुजराती', sa: 'गौर्जरा', gu: 'ગુજરાતી', te: 'గుజరాతి', kn: 'ಗುಜರಾತಿ', ta: 'குஜராத்தி', bn: 'গুজরাটি', or: 'ଗୁଜରାଟୀ',
  },
  Bengali: {
    en: 'Bengali', mr: 'बंगाली', hi: 'बंगाली', sa: 'वङ्गीया', gu: 'બંગાળી', te: 'బెంగాలీ', kn: 'ಬೆಂಗಾಲಿ', ta: 'வங்காளம்', bn: 'বাংলা', or: 'ବଙ୍ଗାଳୀ',
  },
  Kannada: {
    en: 'Kannada', mr: 'कन्नड', hi: 'कन्नड़', sa: 'कन्नडम्', gu: 'કન્નડ', te: 'కన్నడ', kn: 'ಕನ್ನಡ', ta: 'கன்னடம்', bn: 'কন্নড়', or: 'କନ୍ନଡ଼',
  },
};

const SPECIALTY_NAMES: Record<string, Record<SupportedLanguage, string>> = {
  'Narayan Nagbali': {
    en: 'Narayan Nagbali', mr: 'नारायण नागबली', hi: 'नारायण नागबली', sa: 'नारायणनागबलिः', gu: 'નારાયણ નાગબલી', te: 'నారాయణ నాగబలి', kn: 'ನಾರಾಯಣ ನಾಗಬಲಿ', ta: 'நாராயண நாகபலி', bn: 'নারায়ণ নাগবলি', or: 'ନାରାୟଣ ନାଗବଳି',
  },
  'Tripindi Shraddha': {
    en: 'Tripindi Shraddha', mr: 'त्रिपिंडी श्राद्ध', hi: 'त्रिपिंडी श्राद्ध', sa: 'त्रिपिण्डीश्राद्धम्', gu: 'ત્રિપિંડી શ્રાદ્ધ', te: 'త్రిపిండి శ్రాద్ధం', kn: 'ತ್ರಿಪಿಂಡಿ ಶ್ರಾದ್ಧ', ta: 'திரிபிண்டி சிராத்தம்', bn: 'ত্রিপিন্ডী শ্রাদ্ধ', or: 'ତ୍ରିପିଣ୍ଡୀ ଶ୍ରାଦ୍ଧ',
  },
  'Rudrabhishek': {
    en: 'Rudrabhishek', mr: 'रुद्राभिषेक', hi: 'रुद्राभिषेक', sa: 'रुद्राभिषेकः', gu: 'રુદ્રાભિષેક', te: 'రుద్రాభిషేకం', kn: 'ರುದ್ರಾಭಿಷೇಕ', ta: 'ருத்ராபிஷேகம்', bn: 'রুদ্রাভিষেক', or: 'ରୁଦ୍ରାଭିଷେକ',
  },
  'Kaal Sarp Shanti': {
    en: 'Kaal Sarp Shanti', mr: 'कालसर्प शांती', hi: 'कालसर्प शांति', sa: 'कालसर्पशान्तिः', gu: 'કાલસર્પ શાંતિ', te: 'కాలసర్ప శాంతి', kn: 'ಕಾಲಸರ್ಪ ಶಾಂತಿ', ta: 'காலசர்ப்ப சாந்தி', bn: 'কালসর্প শান্তি', or: 'କାଳସର୍ପ ଶାନ୍ତି',
  },
  'Maha Mrityunjaya Jaap': {
    en: 'Maha Mrityunjaya Jaap', mr: 'महामृत्युंजय जप', hi: 'महामृत्युंजय जप', sa: 'महामृत्युञ्जयजपः', gu: 'મહામૃત્યુંજય જપ', te: 'మహామృత్యుంజయ జపం', kn: 'ಮಹಾಮೃತ್ಯುಂಜಯ ಜಪ', ta: 'மகா மிருத்யுஞ்சய ஜபம்', bn: 'মহামৃত্যুঞ্জয় জপ', or: 'ମହାମୃତ୍ୟୁଞ୍ଜୟ ଜପ',
  },
  'Navagraha Homa': {
    en: 'Navagraha Homa', mr: 'नवग्रह होम', hi: 'नवग्रह होम', sa: 'नवग्रहहोमः', gu: 'નવગ્રહ હોમ', te: 'నవగ్రహ హోమం', kn: 'ನವગ્રಹ ಹೋಮ', ta: 'நவக்கிரக ஹோமம்', bn: 'নবগ্রহ হোম', or: 'ନବଗ୍ରହ ହୋମ',
  },
  'Kumbh Vivah': {
    en: 'Kumbh Vivah', mr: 'कुंभ विवाह', hi: 'कुंभ विवाह', sa: 'कुम्भविवाहः', gu: 'કુંભ વિવાહ', te: 'కుంభ వివాహం', kn: 'ಕುಂಭ ವಿವಾಹ', ta: 'கும்ப விவாகம்', bn: 'কুম্ভ বিবাহ', or: 'କୁମ୍ଭ ବିବାହ',
  },
  'Laghu Rudra': {
    en: 'Laghu Rudra', mr: 'लघु रुद्र', hi: 'लघु रुद्र', sa: 'लघुरुद्रः', gu: 'લઘુ રુદ્ર', te: 'లఘు రుద్ర', kn: 'ಲಘು ರುದ್ರ', ta: 'லகு ருத்ர', bn: 'লঘু রুদ্র', or: 'ଲଘୁ ରୁଦ୍ର',
  },
  'Maha Rudrabhishek': {
    en: 'Maha Rudrabhishek', mr: 'महारुद्राभिषेक', hi: 'महारुद्राभिषेक', sa: 'महारुद्राभिषेकः', gu: 'મહારુદ્રાભિષેક', te: 'మహారుద్రాభిషేకం', kn: 'ಮಹಾರುದ್ರಾಭಿಷೇಕ', ta: 'மகா ருத்ராபிஷேகம்', bn: 'মহারুদ্রাভিষেক', or: 'ମହାରୁଦ୍ରାଭିଷେକ',
  },
  'Vastu Shanti': {
    en: 'Vastu Shanti', mr: 'वास्तु शांती', hi: 'वास्तु शांति', sa: 'वास्तुशान्तिः', gu: 'વાસ્તુ શાંતિ', te: 'వాస్తు శాಂತಿ', kn: 'ವಾಸ್ತು ಶಾಂತಿ', ta: 'வாஸ்து சாந்தி', bn: 'বাস্তু শান্তি', or: 'ବାସ୍ତୁ ଶାନ୍ତି',
  },
};

export function GurujiSection({ currentLang, onOpenBooking }: GurujiSectionProps) {
  const [selectedGuruji, setSelectedGuruji] = useState<GurujiItem | null>(null);
  const [isPhotoPreviewOpen, setIsPhotoPreviewOpen] = useState(false);
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
        <div className="text-center max-w-3xl mx-auto mb-14">
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

        {/* Guruji Cards Container */}
        <div className="max-w-4xl mx-auto mb-12">
          {GURUJI_LIST.map((guruji) => {
            const displayName = currentLang === 'en' ? guruji.name : guruji.titleNative;
            const displayTitle = currentLang === 'en' ? guruji.title : guruji.name;

            return (
              <div
                key={guruji.id}
                id={`guruji-card-${guruji.id}`}
                className="bg-white rounded-3xl border-2 border-[#D4AF37]/50 p-6 sm:p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  {/* Left Column: Official Guruji Photo Portrait Card */}
                  <div className="md:col-span-5 flex flex-col items-center">
                    <div
                      onClick={() => setIsPhotoPreviewOpen(true)}
                      className="w-full max-w-[280px] sm:max-w-[320px] h-80 sm:h-96 rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-xl group/photo cursor-pointer relative bg-stone-950 flex flex-col justify-between hover:border-amber-400 hover:scale-[1.01] transition-all"
                      title="Click to view full photo • मोठे पहा"
                    >
                      <img
                        src="/assets/guruji.png"
                        alt={displayName}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/photo:scale-105"
                      />

                      {/* Top Badge */}
                      <div className="absolute top-2.5 left-2.5 px-3 py-1 rounded-full bg-black/85 border border-amber-400/50 text-[10px] font-bold text-amber-300 font-devanagari shadow-sm">
                        मुख्य पुरोहित
                      </div>

                      {/* Bottom Overlay Click Badge */}
                      <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-black/85 border border-amber-400/40 text-[10px] font-medium text-amber-200 flex items-center gap-1 shadow-md backdrop-blur-xs group-hover/photo:bg-amber-500/30 transition-all">
                        <Maximize2 className="w-3 h-3 text-amber-300" />
                        <span>मोठे पहा • View</span>
                      </div>
                    </div>

                    {/* Rating Pill */}
                    <div className="mt-3 px-3.5 py-1 rounded-full bg-[#5A1717] text-white text-xs font-bold flex items-center gap-1.5 shadow-md border border-amber-400/30">
                      <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                      <span>{guruji.rating} ★ ({guruji.reviewCount} Devotee Reviews)</span>
                    </div>

                    <div className="mt-2 text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>100% Authorized Hereditary Purohit</span>
                    </div>
                  </div>

                  {/* Right Column: Name, Royal Vatan Lineage, Credentials & Actions */}
                  <div className="md:col-span-7 space-y-4 text-left">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-50 border border-amber-300/80 text-amber-900 text-[10px] font-bold uppercase tracking-wider font-devanagari">
                        <Sparkles className="w-3 h-3 text-[#C56A18]" />
                        <span>छत्रपती शिवाजी महाराज कालीन ऐतिहासिक वतनदार</span>
                      </div>

                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-heading text-[#5A1717] leading-tight">
                        {displayName}
                      </h3>

                      <div className="text-xs sm:text-sm font-sanskrit text-stone-700 font-semibold">
                        {displayTitle}
                      </div>

                      <div className="text-xs text-[#C56A18] font-bold">
                        {guruji.experienceYears}+ {t.gurujiExp} • २५ पिढ्यांचे वंशपरंपरागत तीर्थ पुरोहित
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans bg-[#FBF6EA] p-3.5 rounded-2xl border border-stone-200">
                      {guruji.bio}
                    </p>

                    {/* Languages */}
                    <div className="py-2 border-y border-[#B88935]/20 text-xs text-stone-700">
                      <span className="font-bold text-[#5A1717]">{ht.gurujiLanguagesLabel}: </span>
                      <span className="font-medium">{guruji.languages.map(translateSpokenLang).join(' • ')}</span>
                    </div>

                    {/* Specialties */}
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
                        {ht.gurujiSpecialtiesLabel}:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {guruji.specialties.map((spec) => (
                          <span
                            key={spec}
                            className="px-2.5 py-1 rounded-lg bg-[#EDE3D1]/60 text-[11px] font-medium text-[#5A1717] border border-[#B88935]/30"
                          >
                            {translateSpecialty(spec)}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-3">
                      <button
                        onClick={() => setSelectedGuruji(guruji)}
                        className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#5A1717] bg-[#EDE3D1] hover:bg-[#B88935]/20 border border-[#B88935]/40 transition-colors cursor-pointer"
                      >
                        {t.gurujiViewProfile}
                      </button>

                      <button
                        onClick={() => onOpenBooking(undefined, guruji.id)}
                        className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#5A1717] to-[#C56A18] hover:from-[#6D1B1B] hover:to-[#B88935] shadow-md hover:shadow-lg transition-all cursor-pointer inline-flex items-center gap-2"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{ht.gurujiBookVidhiBtn}</span>
                      </button>
                    </div>
                  </div>
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
                src="/assets/guruji.png"
                alt={selectedGuruji.name}
                className="w-16 h-16 rounded-full object-cover object-top border-2 border-[#B88935]"
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
                className="px-6 py-2 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#5A1717] to-[#C56A18] shadow-sm hover:shadow cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>{gd.bookWithGurujiBtn}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Guruji Full Photo Lightbox Modal */}
      {isPhotoPreviewOpen && (
        <div
          onClick={() => setIsPhotoPreviewOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#120705] border-2 border-[#D4AF37]/60 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative"
          >
            <button
              onClick={() => setIsPhotoPreviewOpen(false)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 hover:bg-black text-white border border-amber-400/40 transition-colors"
            >
              <X className="w-5 h-5 text-amber-300" />
            </button>

            <div className="relative max-h-[70vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src="/assets/guruji.png"
                alt="Pt. Pravin Shambhu Deshmukh (Desai) Guruji"
                className="w-full h-auto max-h-[70vh] object-contain"
              />
            </div>

            <div className="p-5 text-center bg-[#1E0B07] border-t border-amber-500/30 space-y-1">
              <span className="text-amber-300 text-xs font-mono font-bold block">
                वेदमूर्ती पं. प्रवीण शंभू देशमुख (देसाई) गुरुजी
              </span>
              <p className="text-stone-300 text-xs font-sans">
                श्री क्षेत्र त्र्यंबकेश्वर २५ पिढ्यांचे वंशपरंपरागत वतनदार तीर्थ पुरोहित
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
