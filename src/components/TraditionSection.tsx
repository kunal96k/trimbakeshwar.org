import React from 'react';
import { SupportedLanguage } from '../types';
import { getHomeTranslations } from '../data/homeTranslations';
import { BilvaPatraIcon, SacredMandala, OmSymbol } from './Motifs';
import {
  ShieldCheck,
  Scroll,
  HeartHandshake,
  History,
  Sparkles,
  Flame,
  ArrowRight,
  PhoneCall,
  CheckCircle2,
  Crown,
} from 'lucide-react';

interface TraditionSectionProps {
  currentLang: SupportedLanguage;
  onOpenBooking?: (vidhiId?: string) => void;
}

interface TraditionalRitualItem {
  id: string;
  nameKey: string;
  nameMr: string;
  nameEn: string;
  nameHi: string;
  subtitleMr: string;
  subtitleEn: string;
  tagMr: string;
  tagEn: string;
}

const ALL_HEREDITARY_RITUALS: TraditionalRitualItem[] = [
  {
    id: 'narayan-nagbali',
    nameKey: 'narayan-nagbali',
    nameMr: 'नारायण नागबळी',
    nameEn: 'Narayan Nagbali',
    nameHi: 'नारायण नागबली',
    subtitleMr: 'पितृदोष निवारण व मोक्ष प्राप्तीसाठी ३ दिवसीय शास्त्रोक्त महाविधी',
    subtitleEn: '3-Day Vedic Pitru Dosha & Ancestral Peace Rite',
    tagMr: 'सर्वात प्रमुख विधी',
    tagEn: 'Primary Kshetra Vidhi',
  },
  {
    id: 'kaal-sarp-shanti',
    nameKey: 'kaal-sarp-shanti',
    nameMr: 'कालसर्प योग शांती',
    nameEn: 'Kaal Sarp Yog Shanti',
    nameHi: 'कालसर्प योग शांति',
    subtitleMr: 'राहू-केतू दोष शांती, ग्रह पीडा निवारण व सर्वतोपरी यशसिद्धी',
    subtitleEn: 'Rahu-Ketu Planetary Alignment & Prosperity Anushthan',
    tagMr: 'विशेष शांती',
    tagEn: 'Special Shanti',
  },
  {
    id: 'tripindi-shraddha',
    nameKey: 'tripindi-shraddha',
    nameMr: 'त्रिपिंडी श्राद्ध',
    nameEn: 'Tripindi Shraddha',
    nameHi: 'त्रिपिंडी श्राद्ध',
    subtitleMr: 'तीन पिढ्यांच्या अतृप्त पितरांच्या आत्मशांतीसाठी वेदोक्त पिंडदान',
    subtitleEn: '3-Generation Ancestral Blessing & Pinda Daan',
    tagMr: 'पितृ कार्य',
    tagEn: 'Pitru Rite',
  },
  {
    id: 'maha-mrityunjaya-jaap',
    nameKey: 'maha-mrityunjaya-jaap',
    nameMr: 'महामृत्युंजय जप व हवन',
    nameEn: 'Maha Mrityunjaya Japa & Havan',
    nameHi: 'महामृत्युंजय जप एवं हवन',
    subtitleMr: 'आरोग्य, दीर्घायुष्य, संकट निवारण व वेदोक्त महाहवन अनुष्ठान',
    subtitleEn: 'Rigvedic Healing, Longevity & Sacred Fire Homa',
    tagMr: 'वेदोक्त अनुष्ठान',
    tagEn: 'Vedic Anushthan',
  },
  {
    id: 'rudrabhishek',
    nameKey: 'rudrabhishek',
    nameMr: 'रुद्राभिषेक व महाअभिषेक',
    nameEn: 'Rudrabhishek & Mahabhishek',
    nameHi: 'रुद्राभिषेक एवं महाअभिषेक',
    subtitleMr: 'शुक्ल यजुर्वेदीय रुद्राष्टाध्यायी अभिषेक, पंचामृत व भस्म अर्पण',
    subtitleEn: 'Shukla Yajurveda Rudrashtadhyayi Sacred Libations',
    tagMr: 'नित्य महापूजा',
    tagEn: 'Sacred Abhishekam',
  },
  {
    id: 'laghurudra-maharudra',
    nameKey: 'laghurudra-maharudra',
    nameMr: 'लघुरुद्र व महारुद्र अभिषेक',
    nameEn: 'Laghurudra & Maharudra',
    nameHi: 'लघुरुद्र एवं महारुद्र महायज्ञ',
    subtitleMr: '११/१२१ रुद्रावर्तन, एकादशणी होम व महापूर्णाहुती यज्ञाविधी',
    subtitleEn: '11/121 Recitations Grand Shaivite Vedic Yajna',
    tagMr: 'महायज्ञ',
    tagEn: 'Grand Yajna',
  },
  {
    id: 'graha-nakshatra-shanti',
    nameKey: 'graha-nakshatra-shanti',
    nameMr: 'ग्रह नक्षत्र शांती',
    nameEn: 'Graha Nakshatra Shanti',
    nameHi: 'ग्रह नक्षत्र शांति',
    subtitleMr: 'नवग्रह मंडलाभिषेक, नक्षत्र दोष निवारण व सुख-शांती प्राप्ती',
    subtitleEn: 'Navagraha & Janma Nakshatra Planetary Harmony',
    tagMr: 'ज्योतिष शांती',
    tagEn: 'Astrological Shanti',
  },
  {
    id: 'vastu-shanti',
    nameKey: 'vastu-shanti',
    nameMr: 'वास्तुशांती पूजा',
    nameEn: 'Vastu Shanti Puja',
    nameHi: 'वास्तु शांति पूजा',
    subtitleMr: 'गृहप्रवेश, वास्तुकल्प, वास्तुपुरुष आराधना व गृह शुध्दीकरण',
    subtitleEn: 'New Home Consecration & Vastu Energy Purification',
    tagMr: 'मांगल्य विधी',
    tagEn: 'Home Blessing',
  },
  {
    id: 'navachandi-yaag',
    nameKey: 'navachandi-yaag',
    nameMr: 'नवचंडी याग',
    nameEn: 'Navachandi Yaag',
    nameHi: 'नवचंडी महायज्ञ',
    subtitleMr: 'श्री दुर्गा सप्तशती ९ संपुटित पाठ, कुमारी पूजन व महाहवन',
    subtitleEn: 'Durga Saptashati 9-Recitation Shakti Maha Yajna',
    tagMr: 'शक्ती महायाग',
    tagEn: 'Shakti Yajna',
  },
  {
    id: 'ganesh-yaag',
    nameKey: 'ganesh-yaag',
    nameMr: 'गणेश याग',
    nameEn: 'Ganesh Yaag',
    nameHi: 'गणेश याग',
    subtitleMr: 'अथर्वशीर्ष सहस्रावर्तन, मोदक-दूर्वा महाहवन व विघ्नहर्ता कृपा',
    subtitleEn: 'Atharvashirsha Sahasravartan for Siddhi & Prosperity',
    tagMr: 'सिद्धिदायक',
    tagEn: 'Siddhi Yajna',
  },
  {
    id: 'udak-shanti',
    nameKey: 'udak-shanti',
    nameMr: 'उदक शांती विधी',
    nameEn: 'Udak Shanti',
    nameHi: 'उदक शांति प्रयोग',
    subtitleMr: '१४४० वेदमंत्रांनी पावन जल प्रोक्षण, कुलशांती व पावित्र्य विधी',
    subtitleEn: '1,440 Vedic Verse Kalash Water Sanctification',
    tagMr: 'वेदोक्त शांती',
    tagEn: 'Vedic Sanctification',
  },
];

export function TraditionSection({ currentLang, onOpenBooking }: TraditionSectionProps) {
  const ht = getHomeTranslations(currentLang);
  const isMarathi = currentLang === 'mr';
  const isHindi = currentLang === 'hi';

  return (
    <section id="tradition" className="py-20 sm:py-28 bg-[#1A0D0A] text-white relative overflow-hidden border-t border-amber-900/30">
      {/* Background Sacred Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-amber-600/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-orange-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header Badge */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-sanskrit mb-4 shadow-sm">
            <Crown className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>{ht.traditionBadge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-sanskrit text-amber-100 mb-3 tracking-wide">
            {ht.traditionTitle}
          </h2>
          <p className="text-sm sm:text-lg font-heading italic text-amber-200/80">
            {ht.traditionSub}
          </p>
        </div>

        {/* Hero Lineage Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Left: Tamrapatra Copper-Plate Styled Box */}
          <div className="lg:col-span-6 relative">
            <div className="p-7 sm:p-10 rounded-3xl bg-gradient-to-br from-[#68240D] via-[#4A160A] to-[#250B05] border-2 border-[#D4AF37]/50 shadow-2xl relative overflow-hidden">
              {/* Sacred Chakra Engraving Effect */}
              <div className="absolute -top-6 -right-6 w-44 h-44 opacity-20 pointer-events-none">
                <SacredMandala className="w-full h-full animate-[spin_120s_linear_infinite]" />
              </div>

              <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
                <History className="w-4 h-4" />
                <span>{isMarathi ? 'ऐतिहासिक वतनदार तीर्थ पुरोहित परंपरा' : 'Historic Hereditary Royal Vatan'}</span>
              </div>

              <p className="text-stone-100 text-xs sm:text-sm font-sans leading-relaxed mb-6">
                {ht.traditionDesc}
              </p>

              {/* Authentic Tamrapatra Visual Proof */}
              <div className="mb-6 rounded-2xl overflow-hidden border border-amber-300/30 shadow-inner bg-black/40 p-3 sm:p-4 flex items-center gap-4">
                <img
                  src="/assets/tamprpatra.png"
                  alt="Historic Tamrapatra Copper Plate Record of Trimbakeshwar Guruji"
                  className="w-20 h-16 sm:w-28 sm:h-20 object-contain rounded-lg border border-amber-400/20 bg-stone-950/60 p-1 shrink-0"
                />
                <div className="text-xs text-amber-200/90 font-sans leading-relaxed">
                  <span className="font-bold text-amber-100 block text-xs sm:text-sm font-devanagari mb-0.5">
                    {isMarathi ? 'ताम्रपत्र अधिकार व प्राचीन बहीखाता नोंद' : 'Tamrapatra Sanction & Hereditary Pilgrim Ledgers'}
                  </span>
                  {isMarathi
                    ? 'छत्रपती शिवाजी महाराजांच्या काळापासून संपूर्ण त्र्यंबकेश्वर गावाचे वतन व पिढ्यानपिढ्यांचे नोंदवही पुरावे.'
                    : 'Historic royal seal and ancestral pilgrimage ledgers recognizing 25 continuous generations of service.'}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-amber-300/20 text-xs text-amber-100 font-medium">
                <div className="flex items-center gap-2">
                  <Scroll className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>{ht.traditionPill1}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>{ht.traditionPill2}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Heritage Pillars */}
          <div className="lg:col-span-6 flex flex-col space-y-4 sm:space-y-5">
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#28130E]/90 border border-[#B88935]/30 hover:border-amber-400/60 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#852C16] to-[#501306] text-amber-300 flex items-center justify-center shrink-0 mt-0.5 shadow-md border border-amber-400/30">
                <Crown className="w-5 h-5 text-amber-200" />
              </div>
              <div>
                <h4 className="font-bold text-base text-amber-100 font-heading mb-1">
                  {ht.traditionPillar1Title}
                </h4>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  {ht.traditionPillar1Desc}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#28130E]/90 border border-[#B88935]/30 hover:border-amber-400/60 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#852C16] to-[#501306] text-amber-300 flex items-center justify-center shrink-0 mt-0.5 shadow-md border border-amber-400/30">
                <Flame className="w-5 h-5 text-amber-200" />
              </div>
              <div>
                <h4 className="font-bold text-base text-amber-100 font-heading mb-1">
                  {ht.traditionPillar2Title}
                </h4>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  {ht.traditionPillar2Desc}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#28130E]/90 border border-[#B88935]/30 hover:border-amber-400/60 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#852C16] to-[#501306] text-amber-300 flex items-center justify-center shrink-0 mt-0.5 shadow-md border border-amber-400/30">
                <ShieldCheck className="w-5 h-5 text-amber-200" />
              </div>
              <div>
                <h4 className="font-bold text-base text-amber-100 font-heading mb-1">
                  {ht.traditionPillar3Title}
                </h4>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  {ht.traditionPillar3Desc}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 11 Traditional Pujas, Shantis & Mahayaags Interactive Grid */}
        <div className="mt-8 pt-10 border-t border-amber-500/20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-sanskrit uppercase tracking-widest mb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isMarathi ? 'सर्व अधिकृत विधी व महायाग' : 'Sacred Shantis, Havans & Mahayaags'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-sanskrit text-amber-100">
                {isMarathi
                  ? 'आमच्या हस्ते प्रत्यक्ष संपन्न होणारे सर्व वैदिक विधी व महापूजा'
                  : 'Traditional Rituals & Havans Performed by Our Hereditary Hands'}
              </h3>
            </div>
            <p className="text-xs text-stone-300 max-w-md">
              {isMarathi
                ? 'प्रत्येक विधी अधिकृत वतनदार पुरोहितांकडून वेदोक्त मंत्रोच्चार व संपूर्ण संकल्पपूर्वक केला जातो.'
                : 'Conducted according to authentic Shastric procedures directly by hereditary Vatandar Purohits.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {ALL_HEREDITARY_RITUALS.map((ritual) => {
              const displayName = isMarathi ? ritual.nameMr : isHindi ? ritual.nameHi : ritual.nameEn;
              const displaySubtitle = isMarathi ? ritual.subtitleMr : ritual.subtitleEn;
              const displayTag = isMarathi ? ritual.tagMr : ritual.tagEn;

              return (
                <div
                  key={ritual.id}
                  className="group relative p-5 rounded-2xl bg-gradient-to-br from-[#2B140F] to-[#1F0C08] border border-amber-500/25 hover:border-amber-400/70 hover:shadow-xl hover:shadow-amber-950/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-200 text-[11px] font-medium">
                        {displayTag}
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 opacity-80" />
                    </div>

                    <h4 className="text-base sm:text-lg font-bold font-devanagari text-amber-100 group-hover:text-amber-300 transition-colors mb-1">
                      {displayName}
                    </h4>
                    
                    {ritual.nameMr !== displayName && (
                      <div className="text-xs text-amber-300/80 font-devanagari mb-2">
                        {ritual.nameMr}
                      </div>
                    )}

                    <p className="text-stone-300 text-xs leading-relaxed mb-4">
                      {displaySubtitle}
                    </p>
                  </div>

                  <button
                    onClick={() => onOpenBooking && onOpenBooking(ritual.id)}
                    className="w-full mt-2 py-2 px-3 rounded-xl bg-amber-500/15 hover:bg-amber-500 text-amber-200 hover:text-stone-950 border border-amber-400/40 hover:border-amber-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all group-hover:shadow-md"
                  >
                    <span>{isMarathi ? 'मुहूर्त आरक्षित करा / विधी बुक' : 'Reserve Muhurat / Inquire'}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Contact Bar for Direct Guruji Discussion */}
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-[#44170D] via-[#2F0F09] to-[#44170D] border border-amber-400/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center shrink-0 font-bold shadow-lg">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-bold text-amber-100 font-devanagari">
                  {isMarathi ? 'थेट वतनदार पुरोहितांशी विधी, तिथी व नियोजनाबाबत चर्चा करा' : 'Consult Hereditary Vatandar Purohit Pt. Pravin Shambhu Deshmukh (Desai) Directly'}
                </div>
                <div className="text-xs text-amber-200/80">
                  {isMarathi
                    ? 'सर्व विधींचे नियोजन, साहित्य व्यवस्था व निवास मार्गदर्शन'
                    : 'Personalized Samagri arrangement, Muhurat selection & Kshetra guidance'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap justify-center">
              <a
                href="tel:+919689973967"
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 whitespace-nowrap shrink-0"
                style={{ whiteSpace: 'nowrap' }}
              >
                <PhoneCall className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap shrink-0">+91 96899 73967</span>
              </a>
              <button
                onClick={() => onOpenBooking && onOpenBooking()}
                className="px-4 py-2.5 rounded-xl bg-black/40 hover:bg-black/60 text-amber-200 border border-amber-300/40 text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0"
                style={{ whiteSpace: 'nowrap' }}
              >
                <span className="whitespace-nowrap shrink-0">{isMarathi ? 'ऑनलाइन नोंदणी' : 'Book Online'}</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
