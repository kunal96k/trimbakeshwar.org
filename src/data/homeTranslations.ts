import { SupportedLanguage } from '../types';

export interface HomeTranslations {
  // Temple Intro
  introBadgeBrahmagiriTitle: string;
  introBadgeBrahmagiriDesc: string;
  introBadgeKushavartaTitle: string;
  introBadgeKushavartaDesc: string;
  introBadgeHemadpanthiTitle: string;
  introBadgeHemadpanthiDesc: string;
  introQuoteText: string;
  introQuoteAuthor: string;
  introCardTag: string;
  introCardTitle: string;
  introCardDesc: string;

  // Jyotirlinga
  jyotirlingaTrinityRudra: string;
  jyotirlingaTrinityBrahma: string;
  jyotirlingaTrinityVishnu: string;
  jyotirlingaFeature1Title: string;
  jyotirlingaFeature1Desc: string;
  jyotirlingaFeature2Title: string;
  jyotirlingaFeature2Desc: string;
  jyotirlingaFeature3Title: string;
  jyotirlingaFeature3Desc: string;

  // Shloka Section
  shlokaMeaningTitle: string;
  shlokaMeaningText: string;
  shlokaPraise: string;

  // Puja Section
  pujaDurationLabel: string;
  pujaSamagriLabel: string;
  pujaSamagriVal: string;
  pujaDetailsBtn: string;
  pujaBookBtn: string;
  pujaNames: Record<string, { name: string; desc: string; duration: string }>;

  // Booking Flow
  step1Desc: string;
  step2Desc: string;
  step3Desc: string;
  step4Desc: string;
  step5Desc: string;
  trustBadge1: string;
  trustBadge2: string;
  trustBadge3: string;

  // Guruji Section
  gurujiLanguagesLabel: string;
  gurujiSpecialtiesLabel: string;
  gurujiBookVidhiBtn: string;

  // Tradition Section
  traditionBadge: string;
  traditionTitle: string;
  traditionSub: string;
  traditionDesc: string;
  traditionPill1: string;
  traditionPill2: string;
  traditionPillar1Title: string;
  traditionPillar1Desc: string;
  traditionPillar2Title: string;
  traditionPillar2Desc: string;
  traditionPillar3Title: string;
  traditionPillar3Desc: string;

  // Sacred Places
  sacredPlacesSubtitle: string;
  sacredPlacesExploreBtn: string;
  sacredPlacesDistancePrefix: string;

  // Story Section
  storySubtitle: string;
  storyPuranaLore: string;
  storyChapterPrefix: string;
  storyPrevBtn: string;
  storyNextBtn: string;

  // Festivals Section
  festivalsTitle: string;
  festivalsSubtitle: string;
  festivalsSignificanceLabel: string;

  // Darshan Section
  darshanSubtitle: string;
  darshanTabTimings: string;
  darshanTabGuidelines: string;
  darshanDailySchedule: string;
  darshanTempleGates: string;
  darshanMondayTitle: string;
  darshanMondayDesc: string;
  darshanDressMen: string;
  darshanDressWomen: string;
  darshanRulesTitle: string;

  // How to Reach Section
  reachSubtitle: string;
  reachRoadTitle: string;
  reachRoadDesc: string;
  reachRoadNote: string;
  reachTrainTitle: string;
  reachTrainDesc: string;
  reachTrainNote: string;
  reachAirTitle: string;
  reachAirDesc: string;
  reachAirNote: string;

  // Devotee Experiences
  reviewsNative: string;
  reviewsTitle: string;
  reviewsSubtitle: string;
  reviewsNote: string;

  // FAQ Section
  faqSubtitle: string;
}

export const HOME_TRANSLATIONS: Record<SupportedLanguage, HomeTranslations> = {
  // ==========================================
  // ENGLISH
  // ==========================================
  en: {
    introBadgeBrahmagiriTitle: 'Brahmagiri',
    introBadgeBrahmagiriDesc: '1,295m Peak',
    introBadgeKushavartaTitle: 'Kushavarta',
    introBadgeKushavartaDesc: 'Holy Snan Kund',
    introBadgeHemadpanthiTitle: 'Hemadpanthi',
    introBadgeHemadpanthiDesc: 'Basalt Architecture',
    introQuoteText:
      '"Trimbakeshwar is a sacred shrine of Maharashtra where the Tridev Jyotirlinga resides. River Godavari originates from Brahmagiri and Kushavarta Tirtha brings profound spiritual peace to every devotee."',
    introQuoteAuthor: 'Sanatan Tradition • Godavari Mahatmya',
    introCardTag: 'Sacred Heritage',
    introCardTitle: 'Kushavarta Tirtha & Trimbakeshwar',
    introCardDesc:
      'The holy pond consecrated by Sage Gautama, where Dakshin Ganga Godavari gathers before journeying across Bharat.',

    jyotirlingaTrinityRudra: 'Shiva (Rudra)',
    jyotirlingaTrinityBrahma: 'The Creator',
    jyotirlingaTrinityVishnu: 'The Preserver',
    jyotirlingaFeature1Title: 'Unique Tridev Manifestation',
    jyotirlingaFeature1Desc:
      'In all other eleven Jyotirlingas, Shiva is worshipped as a single solitary Linga. Only at Trimbakeshwar does the Linga feature a hollow cavity enshrining three thumb-sized lingas symbolizing Lord Brahma, Lord Vishnu, and Lord Rudra together.',
    jyotirlingaFeature2Title: 'Historic Suvarna Mukut (Golden Crown)',
    jyotirlingaFeature2Desc:
      'The sanctum houses an ancient jewel-encrusted golden crown dating from the era of the Pandavas and Peshwas, adorned with diamonds, rubies, and emeralds. It is placed upon the Jyotirlinga during special Monday evening Darshans.',
    jyotirlingaFeature3Title: 'Perpetual Godavari Jaladhara',
    jyotirlingaFeature3Desc:
      'A perpetual stream of sacred spring water constantly drips onto the three Linga cavities inside the sanctum, an enduring testimony to Mother Godavari’s tender devotion to Mahadev.',

    shlokaMeaningTitle: 'Meaning & Shastra Significance',
    shlokaMeaningText:
      'We worship the Three-Eyed Lord Shiva, who is fragrant and who nourishes all beings. Just as a ripe cucumber is effortlessly liberated from its vine, may He liberate us from worldly bondage and fear of mortality into eternal spiritual peace.',
    shlokaPraise: 'The Supreme Maha Mrityunjaya Mantra from Rigveda (7.59.12)',

    pujaDurationLabel: 'Duration',
    pujaSamagriLabel: 'Vedic Samagri',
    pujaSamagriVal: 'Arranged by Guruji',
    pujaDetailsBtn: 'View Details',
    pujaBookBtn: 'Book Vidhi',
    pujaNames: {
      'narayan-nagbali': {
        name: 'Narayan Nagbali',
        desc: 'Sacred Garuda Purana ritual for Pitru dosha and ancestral liberation.',
        duration: '3 Days (Full rituals)',
      },
      'tripindi-shraddha': {
        name: 'Tripindi Shraddha',
        desc: 'Peace and remembrance for previous three generations of ancestors.',
        duration: '1 Day (approx. 3-4 hrs)',
      },
      'kaal-sarp-shanti': {
        name: 'Kaal Sarp Yog Shanti',
        desc: 'Vedic planetary harmony and Shanti Anushthan in the presence of Shiva.',
        duration: '1 Day (approx. 2.5-3 hrs)',
      },
      'kumbh-vivah': {
        name: 'Kumbh Vivah',
        desc: 'Traditional Vedic ritual performed with consecrated clay Kumbha.',
        duration: '1 Day (approx. 2 hrs)',
      },
      'maha-mrityunjaya': {
        name: 'Maha Mrityunjaya Jaap',
        desc: 'Sacred Sanskrit mantra recitation for longevity, health, and spiritual grace.',
        duration: '1 to 3 Days',
      },
      rudrabhishek: {
        name: 'Laghu Rudra / Rudrabhishek',
        desc: 'Panchamrit and holy Godavari water abhisheka with sacred Rudra Suktam.',
        duration: '2 Hours',
      },
    },

    step1Desc: 'Select authentic Shastra ritual',
    step2Desc: 'Pick auspicious date & Muhurat',
    step3Desc: 'Connect with verified Purohit',
    step4Desc: 'Provide Gotra & Sankalp info',
    step5Desc: 'Receive instant confirmation pass',
    trustBadge1: 'Simple & Transparent',
    trustBadge2: 'Verified Trimbak Gurujis',
    trustBadge3: 'No Advance Hidden Fee',

    gurujiLanguagesLabel: 'Languages:',
    gurujiSpecialtiesLabel: 'Puja Specialties:',
    gurujiBookVidhiBtn: 'Book Vidhi',

    traditionBadge: '॥ 25 Generations Hereditary Royal Vatandar Tirth Purohit ॥',
    traditionTitle: 'Historic Royal Vatan Since the Era of Chhatrapati Shivaji Maharaj',
    traditionSub: '25 Generations of Unbroken Vedic Seva • Custodians of Trimbakeshwar Kshetra',
    traditionDesc:
      'We are hereditary Tirth Purohits of Shri Kshetra Trimbakeshwar. Since the golden era of Chhatrapati Shivaji Maharaj, our family was bestowed with the historic royal Vatan (hereditary custodianship) of the entire Trimbakeshwar village. Since then, all religious ceremonies, sacred Havans, and Shastric rituals of this holy kshetra are performed directly by our authentic Purohit hands. Serving pilgrims for over 25 unbroken generations, we conduct all traditional Vedic rituals including Narayan Nagbali, Kaal Sarp Yog Shanti, Tripindi Shraddha, Maha Mrityunjaya Japa & Havan, Rudrabhishek, Mahabhishek, Laghurudra, Maharudra, Graha Nakshatra Shanti, Vastu Shanti, Navachandi Yaag, Ganesh Yaag, and Udak Shanti with authentic Shastric devotion.',
    traditionPill1: 'Shivaji Maharaj Era Royal Vatan',
    traditionPill2: '25 Generations Hereditary Lineage',
    traditionPillar1Title: 'Royal Vatan & 25-Generation Pedigree',
    traditionPillar1Desc:
      'Bestowed with the royal custodianship (Vatan) of Trimbakeshwar village since Chhatrapati Shivaji Maharaj’s era, upholding sacred rituals across 25 continuous generations.',
    traditionPillar2Title: 'All Vedic Shantis, Havans & Mahayaags',
    traditionPillar2Desc:
      'Narayan Nagbali, Kaal Sarp Shanti, Tripindi Shraddha, Maha Mrityunjaya Japa & Havan, Rudrabhishek, Mahabhishek, Laghurudra, Maharudra, Graha Nakshatra Shanti, Vastu Shanti, Navachandi Yaag, Ganesh Yaag & Udak Shanti.',
    traditionPillar3Title: 'Direct Performance by Hereditary Hands',
    traditionPillar3Desc:
      'Direct Shastric performance by authentic hereditary Vatandar priests without intermediaries, preserving pure Vedic mantras, disciplined Sankalpa, and complete spiritual fulfillment.',

    sacredPlacesSubtitle:
      'Discover the spiritual landmarks, holy Kunds, and Sahyadri mountains that make Trimbakeshwar one of India’s most revered pilgrimage Kshetras.',
    sacredPlacesExploreBtn: 'Explore Details',
    sacredPlacesDistancePrefix: 'From Mandir',

    storySubtitle:
      'According to traditional Hindu Puranic accounts, the holy manifestation of Trimbakeshwar is intertwined with the penance of Sage Gautama and the descent of holy Godavari.',
    storyPuranaLore: 'Traditional Purana Lore',
    storyChapterPrefix: 'Chapter',
    storyPrevBtn: 'Previous Chapter',
    storyNextBtn: 'Next Chapter',

    festivalsTitle: 'Festivals of Trimbakeshwar',
    festivalsSubtitle:
      'Experience the divine jubilation of Sanatan festivals, temple processions, and sacred gatherings celebrated with eternal devotion.',
    festivalsSignificanceLabel: 'Spiritual Significance:',

    darshanSubtitle:
      'Essential schedule, Aarti timings, dress code recommendations, and sanctum etiquette for a peaceful pilgrimage.',
    darshanTabTimings: 'Latest Darshan & Aarti Schedule',
    darshanTabGuidelines: 'Dress Code & Sanctum Rules',
    darshanDailySchedule: 'Daily Temple Schedule',
    darshanTempleGates: 'Temple Gates: 05:30 AM - 09:00 PM',
    darshanMondayTitle: 'Special Monday Suvarna Mukut Darshan',
    darshanMondayDesc:
      'Every Monday evening between 07:00 PM and 08:30 PM, the historical gem-encrusted Golden Crown (Suvarna Mukut) of Lord Trimbakeshwar is placed upon the Jyotirlinga, accompanied by a grand Palkhi procession.',
    darshanDressMen: 'Men: Traditional unstitched Dhoti and Uttariya for inner sanctum Sparsh Darshan.',
    darshanDressWomen: 'Women: Traditional Saree or Salwar Kameez with Dupatta.',
    darshanRulesTitle: 'Sanctum Etiquette',

    reachSubtitle:
      'Convenient connectivity by road, rail, and air to the sacred town of Trimbakeshwar nestled at the foot of Brahmagiri.',
    reachRoadTitle: 'By Road (Highway)',
    reachRoadDesc: 'Excellent NH-848 highway connecting Nashik to Trimbakeshwar.',
    reachRoadNote: 'Frequent MSRTC city buses & private taxis run every 15 minutes from Nashik CBS bus stand.',
    reachTrainTitle: 'By Train (Railway)',
    reachTrainDesc: 'Nashik Road Railway Station (NK) is the major railhead (38 km).',
    reachTrainNote: 'Direct express trains (Vande Bharat, Panchavati, Tapovan Express) connect Mumbai and other cities.',
    reachAirTitle: 'By Air (Airport)',
    reachAirDesc: 'Nashik Ozar Airport (50 km) & Mumbai International Airport (175 km).',
    reachAirNote: 'Pre-arranged direct cab transfers available 24x7 from Mumbai or Ozar Airport to Trimbak.',

    reviewsNative: 'भक्तांचे अनुभव',
    reviewsTitle: 'Devotee Experiences & Pilgrim Feedback',
    reviewsSubtitle:
      'Heartfelt reflections shared by devotees after concluding their holy Darshan and traditional Puja observances.',
    reviewsNote:
      '* Representative experiences from verified pilgrim families across Maharashtra, Gujarat, and all regions of Bharat.',

    faqSubtitle:
      'Clarifications on ritual preparations, recommended durations, booking transparency, and temple visitation guidelines.',
  },

  // ==========================================
  // MARATHI (मराठी)
  // ==========================================
  mr: {
    introBadgeBrahmagiriTitle: 'ब्रह्मगिरी',
    introBadgeBrahmagiriDesc: '१,२९५ मीटर शिखर',
    introBadgeKushavartaTitle: 'कुशावर्त',
    introBadgeKushavartaDesc: 'पवित्र स्नान कुंड',
    introBadgeHemadpanthiTitle: 'हेमाडपंथी',
    introBadgeHemadpanthiDesc: 'काळी पाषाण वास्तुकला',
    introQuoteText:
      '"त्र्यंबकेश्वर हे महाराष्ट्रातील एक अत्यंत पवित्र तीर्थक्षेत्र असून येथे त्रिमूर्ती ज्योतिर्लिंग विराजमान आहे. ब्रह्मगिरी पर्वतावरून उगम पावलेली गोदावरी आणि कुशावर्त तीर्थाचे पावन जल भाविकांच्या अंतःकरणाला शांतता प्रदान करते."',
    introQuoteAuthor: 'सनातन परंपरा • गोदावरी माहात्म्य',
    introCardTag: 'पवित्र वारसा',
    introCardTitle: 'कुशावर्त तीर्थ व श्री त्र्यंबकेश्वर',
    introCardDesc: 'गौतम ऋषींनी संकल्पित केलेले पावन तीर्थ, जिथे दक्षिण गंगा गोदावरी शांत होऊन संपूर्ण भारतात प्रवाहित होते.',

    jyotirlingaTrinityRudra: 'श्रीमहेश्वर (रुद्र)',
    jyotirlingaTrinityBrahma: 'श्रीब्रह्मा (सृष्टिकर्ता)',
    jyotirlingaTrinityVishnu: 'श्रीविष्णू (पालनकर्ता)',
    jyotirlingaFeature1Title: 'अद्वितीय त्रिमूर्ती स्वरूप',
    jyotirlingaFeature1Desc:
      'इतर सर्व अकरा ज्योतिर्लिंगांमध्ये शिव हे एकमेव लिंग स्वरूपात पूजले जातात. केवळ श्री त्र्यंबकेश्वर येथेच एकाच विवरात ब्रह्मा, विष्णू आणि रुद्र या तिन्ही देवांचे अंगुष्ठमात्र लिंग स्वरूप एकत्र विराजमान आहे.',
    jyotirlingaFeature2Title: 'ऐतिहासिक सुवर्ण मुकुट दर्शन',
    jyotirlingaFeature2Desc:
      'गर्भगृहात पांडवकालीन व पेशवेकालीन ऐतिहासिक रत्नजडित सुवर्ण मुकुट सुरक्षित असून त्यावर हिरे, माणिक व पाचू जडवलेले आहेत. दर सोमवारी संध्याकाळी हा सुवर्ण मुकुट ज्योतिर्लिंगावर परिधान केला जातो.',
    jyotirlingaFeature3Title: 'अविरत पावन जलधारा',
    jyotirlingaFeature3Desc:
      'गर्भगृहातील तिन्ही लिंगांवर नैसर्गिक पवित्र जलधारा अविरत पाझरते, जी गोदावरी मातेच्या महादेवाला अर्पण केलेल्या अखंड जलाभिषेकाचे प्रतीक आहे.',

    shlokaMeaningTitle: 'अर्थ व शास्त्र माहात्म्य',
    shlokaMeaningText:
      'आम्ही त्रिनेत्रधारी सुगंधित व सर्व जीवांचे पोषण करणाऱ्या भगवान शंकराची उपासना करतो. ज्याप्रमाणे पिकलेली काकडी वेलीपासून सहज मुक्त होते, त्याचप्रमाणे आम्हाला मृत्यूच्या व भवसागराच्या बंधनातून मुक्त करून अमरत्वाकडे न्यावे.',
    shlokaPraise: 'ऋग्वेदोक्त (७.५९.१२) परम कल्याणकारी महामृत्युंजय मंत्र',

    pujaDurationLabel: 'कालावधी',
    pujaSamagriLabel: 'वैदिक सामग्री',
    pujaSamagriVal: 'गुरुजींकडून व्यवस्था',
    pujaDetailsBtn: 'सविस्तर माहिती',
    pujaBookBtn: 'विधी बुक करा',
    pujaNames: {
      'narayan-nagbali': {
        name: 'नारायण नागबळी',
        desc: 'पितृदोष निवारण व पूर्वजांच्या आत्मशांतीसाठी अत्यंत पवित्र व फलदायी विधी.',
        duration: '३ दिवस (संपूर्ण विधी)',
      },
      'tripindi-shraddha': {
        name: 'त्रिपिंडी श्राद्ध',
        desc: 'मागील तीन पिढ्यांतील पितरांच्या तृप्तीसाठी व कुटुंबातील सुखशांतीसाठी विधी.',
        duration: '१ दिवस (सुमारे ३-४ तास)',
      },
      'kaal-sarp-shanti': {
        name: 'कालसर्प योग शांती',
        desc: 'ज्योतिष शास्त्राधारित ग्रहपीडा निवारण व महादेव सान्निध्यातील शांति अनुष्ठान.',
        duration: '१ दिवस (सुमारे २.५-३ तास)',
      },
      'kumbh-vivah': {
        name: 'कुंभ विवाह',
        desc: 'विवाहातील दोष निवारणासाठी शास्त्रोक्त कलश प्रतिष्ठापना संस्कार.',
        duration: '१ दिवस (सुमारे २ तास)',
      },
      'maha-mrityunjaya': {
        name: 'महामृत्युंजय जप',
        desc: 'दीर्घायुष्य, आरोग्य व संकटमुक्तीसाठी वैदिक मंत्रांचे पावन अनुष्ठान.',
        duration: '१ ते ३ दिवस',
      },
      rudrabhishek: {
        name: 'लघुरुद्र / रुद्राभिषेक',
        desc: 'पंचामृत व गोदावरी जलासह रुद्रसूक्ताने महादेवाला पावन अभिषेक.',
        duration: '२ तास',
      },
    },

    step1Desc: 'आपली शास्त्रोक्त पूजा निवडा',
    step2Desc: 'शुभ मुहूर्त व तारीख ठरवा',
    step3Desc: 'प्रमाणित पुरोहितांची निवड करा',
    step4Desc: 'गोत्र व यजमान माहिती द्या',
    step5Desc: 'त्वरित पुष्टी पत्र मिळवा',
    trustBadge1: 'सरळ व पारदर्शक',
    trustBadge2: 'प्रमाणित स्थानिक पुरोहित',
    trustBadge3: 'कोणतीही गुप्त फी नाही',

    gurujiLanguagesLabel: 'भाषा:',
    gurujiSpecialtiesLabel: 'पूजा विशेषता:',
    gurujiBookVidhiBtn: 'विधी बुक करा',

    traditionBadge: '॥ २५ पिढ्यांचे वंशपरंपरागत वतनदार तीर्थ पुरोहित ॥',
    traditionTitle: 'छत्रपती शिवाजी महाराजांच्या काळापासून लाभलेले ऐतिहासिक वतन',
    traditionSub: '२५ पिढ्यांची अखंड शास्त्रोक्त सेवा • संपूर्ण त्र्यंबकेश्वर गावाचे अधिकृत वतनदार पुरोहित',
    traditionDesc:
      'आम्ही त्र्यंबकेश्वर तीर्थक्षेत्राचे वंशपरंपरागत वतनदार तीर्थ पुरोहित आहोत. छत्रपती शिवाजी महाराजांच्या काळापासून आमच्या घराण्याला या संपूर्ण त्र्यंबकेश्वर गावाचे वतन मिळालेले असून, तेव्हापासून गावातील सर्व प्रमुख धार्मिक कार्ये व विधी स्वतः आमच्या हातून संपन्न होत आहेत. आम्ही इथले वतनदार आहोत आणि गेले २५ पिढ्या आम्ही इथे अविरत कार्यरत आहोत. त्र्यंबकेश्वरमध्ये होणारे सर्व प्रमुख विधी—नारायण नागबळी, कालसर्प शांती, त्रिपिंडी श्राद्ध, महामृत्युंजय जप व हवन, लघुरुद्र, रुद्राभिषेक, महाअभिषेक, महारुद्र, ग्रह नक्षत्र शांती, तसेच वास्तुशांती, नवचंडी याग, गणेश याग, उदक शांती इत्यादी सर्व पूजा-विधी शास्त्रोक्त पद्धतीने स्वतः आमच्या हातून संपन्न केल्या जातात.',
    traditionPill1: 'छत्रपती शिवाजी महाराज कालीन वतनदार',
    traditionPill2: '२५ पिढ्यांची अखंड परंपरा',
    traditionPillar1Title: 'ऐतिहासिक वतन व २५ पिढ्यांचा वारसा',
    traditionPillar1Desc:
      'छत्रपती शिवाजी महाराजांच्या काळापासून संपूर्ण त्र्यंबकेश्वर गावाचे धार्मिक वतन आमच्या घराण्याकडे असून गेले २५ पिढ्यांपासून सर्व धार्मिक कार्ये आमच्याच हातून संपन्न होतात.',
    traditionPillar2Title: 'सर्व प्रमुख विधी, शांती व महायाग',
    traditionPillar2Desc:
      'नारायण नागबळी, कालसर्प शांती, त्रिपिंडी श्राद्ध, महामृत्युंजय जप-हवन, लघुरुद्र, महारुद्र, महाअभिषेक, ग्रह नक्षत्र शांती, वास्तुशांती, नवचंडी याग, गणेश याग व उदक शांती.',
    traditionPillar3Title: 'स्वतः अधिकृत वतनदारांच्या हस्ते प्रत्यक्ष विधी',
    traditionPillar3Desc:
      'कोणत्याही मध्यस्थांशिवाय थेट वंशपरंपरागत वतनदार तीर्थ पुरोहितांकडून पारंपरिक व प्रामाणिक संकल्प, वेदोक्त मंत्रोच्चार व संपूर्ण शास्त्रोक्त पूर्तता.',

    sacredPlacesSubtitle:
      'कुशावर्त कुंड, ब्रह्मगिरी पर्वत आणि सह्याद्रीच्या पवित्र पावन तीर्थांचे दर्शन घेऊन आपली यात्रा परिपूर्ण करा.',
    sacredPlacesExploreBtn: 'सविस्तर पाहा',
    sacredPlacesDistancePrefix: 'मंदिरापासून अंतर',

    storySubtitle:
      'गौतम ऋषींची कठोर तपश्चर्या, गोहत्येचे निवारण आणि भगवान शंकरांनी जटांमधून गोदावरीला केलेले मुक्त—या पावन कथेचा अनुभव घ्या.',
    storyPuranaLore: 'पुराण कथा परंपरा',
    storyChapterPrefix: 'अध्याय',
    storyPrevBtn: 'मागील अध्याय',
    storyNextBtn: 'पुढील अध्याय',

    festivalsTitle: 'त्र्यंबकेश्वरचे पावन उत्सव',
    festivalsSubtitle:
      'सिंहस्थ कुंभमेळा, महाशिवरात्र आणि श्रावण सोमवार यांसारख्या भव्य उत्सवांमध्ये भक्तिरसात लीन व्हा.',
    festivalsSignificanceLabel: 'आध्यात्मिक माहात्म्य:',

    darshanSubtitle:
      'शांत व सुलभ दर्शनासाठी मंदिराच्या वेळा, आरती वेळापत्रक, वस्त्रसंहिता व नियमांची संपूर्ण माहिती.',
    darshanTabTimings: 'दर्शन व आरती वेळापत्रक',
    darshanTabGuidelines: 'वस्त्रसंहिता व नियम',
    darshanDailySchedule: 'दैनिक मंदिर वेळापत्रक',
    darshanTempleGates: 'मंदिर खुले: सकाळी ०५:३० ते रात्री ०९:००',
    darshanMondayTitle: 'विशेष सोमवार सुवर्ण मुकुट दर्शन',
    darshanMondayDesc:
      'दर सोमवारी संध्याकाळी ०७:०० ते ०८:३० या वेळेत महादेवाच्या ज्योतिर्लिंगावर ऐतिहासिक रत्नजडित सुवर्ण मुकुट चढवला जातो व भव्य पालखी सोहळा संपन्न होतो.',
    darshanDressMen: 'पुरुष: गर्भगृह स्पर्श दर्शनासाठी सोवळे (धोती) व उपरणे अनिवार्य.',
    darshanDressWomen: 'महिला: साडी किंवा सलवार कमीज ओढणीसह.',
    darshanRulesTitle: 'गर्भगृह नियम',

    reachSubtitle: 'नाशिक, मुंबई व पुण्यातून रस्ते, रेल्वे व विमान मार्गाने त्र्यंबकेश्वरला पोहोचणे अत्यंत सोपे आहे.',
    reachRoadTitle: 'रस्ते मार्ग (हायवे)',
    reachRoadDesc: 'नाशिक ते त्र्यंबकेश्वर २८ किमीचा चौपदरी सुंदर रस्ता (NH-848).',
    reachRoadNote: 'नाशिक सीबीएस बस स्थानकावरून दर १५ मिनिटांनी एसटी बसेस व खाजगी गाड्या उपलब्ध असतात.',
    reachTrainTitle: 'रेल्वे मार्ग',
    reachTrainDesc: 'नाशिक रोड रेल्वे स्थानक (NK) हे मुख्य जंक्शन असून ते ३८ किमी अंतरावर आहे.',
    reachTrainNote: 'वंदे भारत, पंचवटी, तपोवन एक्सप्रेस यांसारख्या गाड्यांनी मुंबई-नाशिक जलद प्रवास शक्य.',
    reachAirTitle: 'विमान मार्ग',
    reachAirDesc: 'नाशिक ओझर विमानतळ (५० किमी) व मुंबई आंतरराष्ट्रीय विमानतळ (१७५ किमी).',
    reachAirNote: 'विमानतळावरून थेट त्र्यंबकसाठी २४ तास टॅक्सी सेवा उपलब्ध आहे.',

    reviewsNative: 'भक्तांचे अनुभव',
    reviewsTitle: 'भाविकांचे अनुभव व प्रतिक्रिया',
    reviewsSubtitle: 'पावन दर्शन व शास्त्रोक्त पूजा विधी संपन्न झाल्यानंतर भक्तांनी व्यक्त केलेल्या मनोगतांचे संकलन.',
    reviewsNote: '* महाराष्ट्र, गुजरात व देशभरातील प्रमाणित भाविक कुटुंबांचे मनोगत.',

    faqSubtitle: 'विधी तयारी, राहण्याची सोय, आवश्यक दिवस व मंदिर नियमांबाबत वारंवार विचारले जाणारे प्रश्न.',
  },

  // ==========================================
  // HINDI (हिंदी)
  // ==========================================
  hi: {
    introBadgeBrahmagiriTitle: 'ब्रह्मगिरि',
    introBadgeBrahmagiriDesc: '१,२९५ मी. पर्वत',
    introBadgeKushavartaTitle: 'कुशावर्त',
    introBadgeKushavartaDesc: 'पवित्र स्नान कुंड',
    introBadgeHemadpanthiTitle: 'हेमाडपंथी',
    introBadgeHemadpanthiDesc: 'कृष्ण प्रस्तर वास्तुकला',
    introQuoteText:
      '"त्र्यंबकेश्वर महाराष्ट्र का अत्यंत पावन तीर्थ है जहां त्रिदेव ज्योतिर्लिंग प्रतिष्ठित हैं। ब्रह्मगिरि से उद्गमित गोदावरी और कुशावर्त तीर्थ का जल प्रत्येक श्रद्धालु के हृदय को परम शांति प्रदान करता है।"',
    introQuoteAuthor: 'सनातन परंपरा • गोदावरी माहात्म्य',
    introCardTag: 'पावन धरोहर',
    introCardTitle: 'कुशावर्त तीर्थ व श्री त्र्यंबकेश्वर',
    introCardDesc: 'महर्षि गौतम द्वारा प्रतिष्ठित पावन तीर्थ, जहां दक्षिण गंगा गोदावरी शांत होकर संपूर्ण भारत में प्रवाहित होती हैं।',

    jyotirlingaTrinityRudra: 'श्रीमहेश्वर (रुद्र)',
    jyotirlingaTrinityBrahma: 'श्रीब्रह्मा (सृष्टिकर्ता)',
    jyotirlingaTrinityVishnu: 'श्रीविष्णु (पालनकर्ता)',
    jyotirlingaFeature1Title: 'अद्वितीय त्रिमूर्ति स्वरूप',
    jyotirlingaFeature1Desc:
      'अन्य ग्यारह ज्योतिर्लिंगों में केवल शिव की ही पूजा होती है। केवल त्र्यंबकेश्वर में ही एक ही विवर में ब्रह्मा, विष्णु और महेश तीनों देव अंगुष्ठमात्र लिंग रूप में एक साथ विराजते हैं।',
    jyotirlingaFeature2Title: 'ऐतिहासिक सुवर्ण मुकुट दर्शन',
    jyotirlingaFeature2Desc:
      'गर्भगृह में पांडव व पेशवा कालीन रत्नजड़ित स्वर्ण मुकुट सुरक्षित है जिसमें हीरे, माणिक्य व पन्ने जड़े हैं। प्रत्येक सोमवार संध्या को यह मुकुट ज्योतिर्लिंग पर धारण कराया जाता है।',
    jyotirlingaFeature3Title: 'अविरल पावन जलधारा',
    jyotirlingaFeature3Desc:
      'गर्भगृह में तीनों लिंगों पर प्राकृतिक रूप से शीतल जल निरंतर रिसता रहता है, जो गोदावरी माता द्वारा महादेव को अर्पित अखंड जलाभिषेक का साक्षात प्रमाण है।',

    shlokaMeaningTitle: 'अर्थ व शास्त्र माहात्म्य',
    shlokaMeaningText:
      'हम त्रिनेत्रधारी सुगंधित और समस्त जीवों का पोषण करने वाले भगवान शिव की आराधना करते हैं। जिस प्रकार पका हुआ खरबूजा बेल से अनायास मुक्त हो जाता है, उसी प्रकार वे हमें मृत्यु और सांसारिक बंधनों से मुक्त कर अमरत्व प्रदान करें।',
    shlokaPraise: 'ऋग्वेद (७.५९.१२) का परम कल्याणकारी महामृत्युंजय मंत्र',

    pujaDurationLabel: 'अवधि',
    pujaSamagriLabel: 'वैदिक सामग्री',
    pujaSamagriVal: 'गुरुजी द्वारा व्यवस्था',
    pujaDetailsBtn: 'विवरण देखें',
    pujaBookBtn: 'विधि बुक करें',
    pujaNames: {
      'narayan-nagbali': {
        name: 'नारायण नागबली',
        desc: 'पितृदोष निवारण एवं पूर्वजों की आत्मशांति के लिए गरुड़ पुराणोक्त पावन अनुष्ठान।',
        duration: '३ दिवस (संपूर्ण विधि)',
      },
      'tripindi-shraddha': {
        name: 'त्रिपिंडी श्राद्ध',
        desc: 'विगत तीन पीढ़ियों के पितरों की तृप्ति एवं कुल की सुख-समृद्धि हेतु वैदिक श्राद्ध।',
        duration: '१ दिवस (लगभग ३-४ घंटे)',
      },
      'kaal-sarp-shanti': {
        name: 'कालसर्प योग शांति',
        desc: 'ज्योतिषोक्त नवग्रह व राहु-केतु पीड़ा शांति हेतु महादेव सान्निध्य में अनुष्ठान।',
        duration: '१ दिवस (लगभग २.५-३ घंटे)',
      },
      'kumbh-vivah': {
        name: 'कुंभ विवाह',
        desc: 'वैवाहिक दोष शांति हेतु शास्त्रसम्मत पावन कलश प्रतिष्ठा संस्कार।',
        duration: '१ दिवस (लगभग २ घंटे)',
      },
      'maha-mrityunjaya': {
        name: 'महामृत्युंजय जप',
        desc: 'दीर्घायु, आरोग्य एवं समस्त संकट निवारण हेतु वैदिक मंत्रानुष्ठान।',
        duration: '१ से ३ दिवस',
      },
      rudrabhishek: {
        name: 'लघुरुद्र / रुद्राभिषेक',
        desc: 'पंचामृत एवं गोदावरी जल से रुद्रसूक्त द्वारा महादेव का पावन अभिषेक।',
        duration: '२ घंटे',
      },
    },

    step1Desc: 'शास्त्रोक्त पूजा का चयन करें',
    step2Desc: 'शुभ मुहूर्त व तिथि तय करें',
    step3Desc: 'प्रमाणित पुरोहित का चयन करें',
    step4Desc: 'गोत्र व यजमान विवरण भरें',
    step5Desc: 'तुरंत बुकिंग पुष्टि प्राप्त करें',
    trustBadge1: 'सरल एवं पारदर्शी',
    trustBadge2: 'प्रमाणित त्र्यंबक पुरोहित',
    trustBadge3: 'कोई गुप्त शुल्क नहीं',

    gurujiLanguagesLabel: 'भाषाएं:',
    gurujiSpecialtiesLabel: 'पूजा विशेषताएं:',
    gurujiBookVidhiBtn: 'विधि बुक करें',

    traditionBadge: '॥ २५ पीढ़ियों के वंशपरंपरागत वतनदार तीर्थ पुरोहित ॥',
    traditionTitle: 'छत्रपति शिवाजी महाराज के काल से प्राप्त ऐतिहासिक वतन',
    traditionSub: '२५ पीढ़ियों की अखंड शास्त्रोक्त सेवा • संपूर्ण त्र्यंबकेश्वर गांव के अधिकृत वतनदार पुरोहित',
    traditionDesc:
      'हम श्री क्षेत्र त्र्यंबकेश्वर के वंशपरंपरागत वतनदार तीर्थ पुरोहित हैं। छत्रपति शिवाजी महाराज के काल से हमारे कुल को संपूर्ण त्र्यंबकेश्वर गांव का ऐतिहासिक वतन (धार्मिक अधिकार) प्राप्त है, और तभी से यहां के समस्त धार्मिक अनुष्ठान व हवन स्वतः हमारे हाथों संपन्न होते आए हैं। विगत २५ पीढ़ियों से हम यहां अविरत कार्यरत हैं। त्र्यंबकेश्वर में होने वाले समस्त प्रमुख विधान—नारायण नागबलि, कालसर्प शांति, त्रिपिंडी श्राद्ध, महामृत्युंजय जप एवं हवन, लघुरुद्र, रुद्राभिषेक, महाअभिषेक, महारुद्र, ग्रह नक्षत्र शांति, तथा वास्तुशांति, नवचंडी याग, गणेश याग, उदक शांति आदि सभी पूजा-विधान पूर्ण शास्त्रोक्त विधि से हमारे द्वारा संपन्न कराए जाते हैं।',
    traditionPill1: 'छत्रपति शिवाजी महाराज कालीन वतनदार',
    traditionPill2: '२५ पीढ़ियों की पावन परंपरा',
    traditionPillar1Title: 'ऐतिहासिक वतन एवं २५ पीढ़ियों की परंपरा',
    traditionPillar1Desc:
      'छत्रपति शिवाजी महाराज के काल से त्र्यंबकेश्वर गांव का संपूर्ण धार्मिक वतन हमारे कुल को प्राप्त है और २५ पीढ़ियों से सभी अनुष्ठान हमारे द्वारा संपन्न होते हैं।',
    traditionPillar2Title: 'समस्त प्रमुख विधान, शांति व महायाग',
    traditionPillar2Desc:
      'नारायण नागबलि, कालसर्प शांति, त्रिपिंडी श्राद्ध, महामृत्युंजय जप-हवन, लघुरुद्र, महारुद्र, महाअभिषेक, ग्रह नक्षत्र शांति, वास्तुशांति, नवचंडी याग, गणेश याग व उदक शांति।',
    traditionPillar3Title: 'स्वयं अधिकृत पुरोहितों द्वारा प्रत्यक्ष अनुष्ठान',
    traditionPillar3Desc:
      'बिना किसी बिचौलिए के सीधे वतनदार तीर्थ पुरोहितों द्वारा वैदिक मंत्रोच्चार, अनुशासित संकल्प एवं संपूर्ण शास्त्रोक्त विधि-विधान।',

    sacredPlacesSubtitle:
      'कुशावर्त कुंड, ब्रह्मगिरि पर्वत और पवित्र तीर्थों के दर्शन कर अपनी पावन यात्रा को सार्थक बनाएं।',
    sacredPlacesExploreBtn: 'विवरण देखें',
    sacredPlacesDistancePrefix: 'मंदिर से दूरी',

    storySubtitle:
      'ऋषि गौतम की कठोर तपस्या, गोहत्या मुक्ति और भगवान शिव द्वारा अपनी जटाओं से गोदावरी को मुक्त करने की पावन गाथा।',
    storyPuranaLore: 'पौराणिक परंपरा',
    storyChapterPrefix: 'अध्याय',
    storyPrevBtn: 'पिछला अध्याय',
    storyNextBtn: 'अगला अध्याय',

    festivalsTitle: 'त्र्यंबकेश्वर के पावन पर्व व उत्सव',
    festivalsSubtitle:
      'सिंहस्थ कुंभमेला, महाशिवरात्रि और श्रावण मास के पावन उत्सवों में भक्तिभाव से सम्मिलित हों।',
    festivalsSignificanceLabel: 'आध्यात्मिक माहात्म्य:',

    darshanSubtitle:
      'सुलभ दर्शन के लिए मंदिर का समय, आरती विवरण, पारंपरिक वेशभूषा और गर्भगृह के नियम।',
    darshanTabTimings: 'दर्शन व आरती समय-सारिणी',
    darshanTabGuidelines: 'वेशभूषा व गर्भगृह नियम',
    darshanDailySchedule: 'दैनिक मंदिर समय-सारिणी',
    darshanTempleGates: 'मंदिर खुला: प्रातः ०५:३० से रात्रि ०९:००',
    darshanMondayTitle: 'विशेष सोमवार सुवर्ण मुकुट दर्शन',
    darshanMondayDesc:
      'प्रत्येक सोमवार संध्या ०७:०० से ०८:३० बजे ज्योतिर्लिंग पर ऐतिहासिक रत्नजड़ित स्वर्ण मुकुट सुशोभित किया जाता है और भव्य पालकी शोभायात्रा निकलती है।',
    darshanDressMen: 'पुरुष: गर्भगृह स्पर्श दर्शन हेतु धोती एवं उत्तरीय अनिवार्य है।',
    darshanDressWomen: 'महिलाएं: पारंपरिक साड़ी अथवा सलवार-सूट दुपट्टे के साथ।',
    darshanRulesTitle: 'गर्भगृह मर्यादा',

    reachSubtitle: 'नाशिक, मुंबई और पुणे से सड़क, रेल व वायु मार्ग द्वारा त्र्यंबकेश्वर पहुंचना अत्यंत सुगम है।',
    reachRoadTitle: 'सड़क मार्ग (राजमार्ग)',
    reachRoadDesc: 'नाशिक से त्र्यंबकेश्वर २८ किमी का उत्तम चौड़ा मार्ग (NH-848)।',
    reachRoadNote: 'नाशिक सीबीएस बस अड्डे से प्रत्येक १५ मिनट पर बसें व टैक्सियां उपलब्ध हैं।',
    reachTrainTitle: 'रेलवे मार्ग',
    reachTrainDesc: 'नाशिक रोड रेलवे स्टेशन (NK) निकटतम प्रमुख जंक्शन है (३८ किमी)।',
    reachTrainNote: 'वंदे भारत, पंचवटी, तपोवन एक्सप्रेस आदि मुंबई-नाशिक को शीघ्र जोड़ती हैं।',
    reachAirTitle: 'वायु मार्ग',
    reachAirDesc: 'नाशिक ओझर एयरपोर्ट (५० किमी) व मुंबई इंटरनेशनल एयरपोर्ट (१७५ किमी)।',
    reachAirNote: 'एयरपोर्ट से त्र्यंबक के लिए २४ घंटे टैक्सी सेवा उपलब्ध है।',

    reviewsNative: 'भक्तों के अनुभव',
    reviewsTitle: 'श्रद्धालुओं के पावन अनुभव',
    reviewsSubtitle: 'पावन दर्शन और शास्त्रोक्त पूजा संपन्न होने के उपरांत भक्तों द्वारा व्यक्त किए गए सच्चे विचार।',
    reviewsNote: '* महाराष्ट्र, गुजरात और संपूर्ण भारत से पधारे श्रद्धालु परिवारों के प्रामाणिक अनुभव।',

    faqSubtitle: 'पूजा तैयारी, निवास, आवश्यक दिन और मंदिर नियमों से संबंधित बहुप्रचलित प्रश्नों के उत्तर।',
  },

  // ==========================================
  // SANSKRIT (संस्कृतम्)
  // ==========================================
  sa: {
    introBadgeBrahmagiriTitle: 'ब्रह्मगिरिः',
    introBadgeBrahmagiriDesc: '१,२९५ मी. शिखरम्',
    introBadgeKushavartaTitle: 'कुशावर्तः',
    introBadgeKushavartaDesc: 'पावनस्नानकुण्डम्',
    introBadgeHemadpanthiTitle: 'हेमाडपन्थी',
    introBadgeHemadpanthiDesc: 'कृष्णपाषाणशिल्पम्',
    introQuoteText:
      '"त्र्यम्बकेश्वरक्षेत्रं महाराष्ट्रस्य पावनं धाम यत्र त्रिमूर्तिज्योतिर्लिङ्गं विराजते। ब्रह्मगिरेः प्रादुर्भूता गौतमी गङ्गा कुशावर्ततीर्थं च भक्तानां मनः शान्तिं प्रददाति।"',
    introQuoteAuthor: 'सनातनपरम्परा • गोदावरीमाहात्म्यम्',
    introCardTag: 'पवित्रपरम्परा',
    introCardTitle: 'कुशावर्ततीर्थं श्रीत्र्यम्बकेश्वरश्च',
    introCardDesc: 'गौतममहर्षिणा प्रतिष्ठितं पावनं तीर्थं यस्मात् दक्षिणा गङ्गा गोदावरी समस्ते भारते प्रवहति।',

    jyotirlingaTrinityRudra: 'श्रीमहेश्वरः (रुद्रः)',
    jyotirlingaTrinityBrahma: 'श्रीब्रह्मा (सृष्टिकर्ता)',
    jyotirlingaTrinityVishnu: 'श्रीविष्णुः (पालनकर्ता)',
    jyotirlingaFeature1Title: 'अद्वितीयं त्रिमूर्तिस्वरूपम्',
    jyotirlingaFeature1Desc:
      'समस्तेषु एकादशज्योतिर्लिङ्गेषु शिवः एकलिङ्गरूपेण पूज्यते। केवलं त्र्यम्बकेश्वरे एव एकस्मिन्नेव विवरे ब्रह्मा, विष्णुः, रुद्रश्च त्रयो देवाः अङ्गुष्ठमात्रलिङ्गरूपेण समन्विताः सन्ति।',
    jyotirlingaFeature2Title: 'ऐतिहासिकं सुवर्णमुकुटदर्शनम्',
    jyotirlingaFeature2Desc:
      'गर्भगृहे पाण्डवकालीनं पेशवेकालीनं च रत्नजडितं सुवर्णमुकुटं सुरक्षितमस्ति यत्र हीरकाणि, माणिक्यानि, मरकतानि च सन्ति। प्रतिसोमवासरं सायं ज्योतिर्लिङ्गे मुकुटधारणं भवति।',
    jyotirlingaFeature3Title: 'अविरता पावनजलधारा',
    jyotirlingaFeature3Desc:
      'गर्भगृहे लिङ्गोपरि प्राकृतिकतया पावनं जलं निरन्तरं स्रवति, यत् गोदावरीमातुः महादेवाय अनवरताभिषेकस्य साक्षात् प्रमाणम्।',

    shlokaMeaningTitle: 'अर्थः शास्त्रमाहात्म्यं च',
    shlokaMeaningText:
      'वयं त्रिनेत्रं सुगन्धियुक्तं पुष्टिप्रवर्धकं भगवान् शङ्करं यजामहे। यथा पक्वं कुष्माण्डं बन्धनान्मुच्यते, तथैव स नः मृत्योः संसाराच्च मोचयित्वा अमृताय गमयतु।',
    shlokaPraise: 'ऋग्वेदस्य (७.५९.१२) परमपावनः महामृत्युञ्जयमन्त्रः',

    pujaDurationLabel: 'कालावधिः',
    pujaSamagriLabel: 'वैदिकी सामग्री',
    pujaSamagriVal: 'गुरुभिः व्यवस्थापिता',
    pujaDetailsBtn: 'विवरणं पश्यन्तु',
    pujaBookBtn: 'विधिं पञ्जीकरोतु',
    pujaNames: {
      'narayan-nagbali': {
        name: 'नारायणनागबलिः',
        desc: 'पितृदोषनिवारणाय पूर्वजानां सद्गतये च गरुडपुराणोक्तं पावनं विधानम्।',
        duration: 'दिनत्रयम् (सम्पूर्णविधिः)',
      },
      'tripindi-shraddha': {
        name: 'त्रिपिण्डी श्राद्धम्',
        desc: 'त्रिपुरुषीयपितॄणां तृप्तये कुलशान्तये च वैदिकश्राद्धप्रयोगः।',
        duration: 'एकदिनम् (प्रायः ३-४ होराः)',
      },
      'kaal-sarp-shanti': {
        name: 'कालसर्पशान्तिः',
        desc: 'ज्योतिषशास्त्रोक्तग्रहदोषशान्तये शिवसान्निध्ये कृतमनुष्ठानम्।',
        duration: 'एकदिनम् (प्रायः २.५-३ होराः)',
      },
      'kumbh-vivah': {
        name: 'कुम्भविवाहः',
        desc: 'वैवाहिकदोषोपशमनाय शास्त्रसम्मतः कुम्भप्रतिष्ठासंस्कारः।',
        duration: 'एकदिनम् (प्रायः २ होरे)',
      },
      'maha-mrityunjaya': {
        name: 'महामृत्युञ्जयजपः',
        desc: 'आयुष्यवृद्धये स्वास्थ्यसिद्धये च वैदिकमन्त्राणां पावनं जपानुष्ठानम्।',
        duration: '१ तः ३ दिनानि',
      },
      rudrabhishek: {
        name: 'लघुरुद्रः / रुद्राभिषेकः',
        desc: 'पञ्चामृतेन गोदावरीजलेन च रुद्रसूक्तेन महादेवाय समर्पणम्।',
        duration: '२ होरे',
      },
    },

    step1Desc: 'शास्त्रोक्तां पूजां चिनोतु',
    step2Desc: 'शुभमुहूर्तं तिथिं च निर्धारयतु',
    step3Desc: 'प्रमाणितपुरोहितं चिनोतु',
    step4Desc: 'गोत्रयजमानविवरणं पूरयतु',
    step5Desc: 'सद्यः पञ्जीकरणपत्रं प्राप्नोतु',
    trustBadge1: 'सरलं पारदर्शकं च',
    trustBadge2: 'प्रमाणितत्र्यम्बकपुरोहिताः',
    trustBadge3: 'नास्त्यत्र गुप्तशुल्कम्',

    gurujiLanguagesLabel: 'भाषाः:',
    gurujiSpecialtiesLabel: 'पूजाविशेषाः:',
    gurujiBookVidhiBtn: 'विधिं पञ्जीकरोतु',

    traditionBadge: '॥ पञ्चविंशतिपीढिकानां वंशपरम्पराप्राप्तवतनदारतीर्थपुरोहिताः ॥',
    traditionTitle: 'छत्रपति-शिवाजीमहाराज-कालात् प्राप्तम् ऐतिहासिकं वतनम्',
    traditionSub: 'पञ्चविंशतिपीढिकानाम् अखण्डा शास्त्रोक्तसेवा • समग्रत्र्यम्बकेश्वरक्षेत्रस्य अधिकृतपुरोहिताः',
    traditionDesc:
      'वयं श्रीक्षेत्रत्र्यम्बकेश्वरस्य वंशपरम्पराप्राप्ताः वतनदारतीर्थपुरोहिताः स्मः। छत्रपतिशिवाजीमहाराजकालात् अस्माकं वंशाय समग्रत्र्यम्बकेश्वरग्रामस्य धार्मिकवतनम् प्रदत्तम्, तदारभ्य अत्रत्यानि सर्वाणि धार्मिककार्याणि साक्षात् अस्माभिरेव सम्पाद्यन्ते। पञ्चविंशतिपीढिकाभ्यः वयम् अत्र निरन्तरं सेवारताः। अत्र सम्पाद्यमानाः नारायणनागबलिः, कालसर्पशान्तिः, त्रिपिण्डीश्राद्धम्, महामृत्युञ्जयजप-हवनम्, लघुरुद्रः, रुद्राभिषेकः, महाभिषेकः, महारुद्रः, ग्रहनक्षत्रशान्तिः, वास्तुशान्तिः, नवचण्डीयागः, गणेशयागः, उदकशान्तिश्चेति सर्वे विधीयन्ते।',
    traditionPill1: 'शिवाजीमहाराजकालीन-वतनम्',
    traditionPill2: 'पञ्चविंशतिपीढिकानां परम्परा',
    traditionPillar1Title: 'ऐतिहासिकं वतनं पञ्चविंशतिपीढ्यश्च',
    traditionPillar1Desc:
      'छत्रपतिशिवाजीमहाराजकालात् त्र्यम्बकेश्वरक्षेत्रस्य सर्वाधिकारप्राप्ताः पञ्चविंशतिपीढिभ्यः सेवारताः च।',
    traditionPillar2Title: 'समस्ताः विधीयमानाः शान्ति-महायागाः',
    traditionPillar2Desc:
      'नारायणनागबलिः, कालसर्पशान्तिः, त्रिपिण्डीश्राद्धम्, महामृत्युञ्जयजपः, रुद्राभिषेकः, लघुरुद्रः, महारुद्रः, नवचण्डीयागः, गणेशयागः, उदकशान्तिश्च।',
    traditionPillar3Title: 'साक्षात् प्रामाणिकपुरोहितैः अनुष्ठानम्',
    traditionPillar3Desc:
      'मध्यस्थान् विना साक्षात् वतनदारपुरोहितैः क्रियमाणं शास्त्रोक्तसंकल्पपूर्वकं वेदोक्तविधानम्।',

    sacredPlacesSubtitle:
      'कुशावर्तकुण्डस्य, ब्रह्मगिरेः, पवित्रतीर्थानां च दर्शनेन स्वतीर्थयात्रां सफलां कुर्वन्तु।',
    sacredPlacesExploreBtn: 'विवरणं पश्यन्तु',
    sacredPlacesDistancePrefix: 'मन्दिराद्दूरी',

    storySubtitle:
      'गौतममहर्षेः तपोबलं, गोहत्यामुक्तिः, परमशिवस्य जटाभ्यो गोदावर्याः पावनमवतरणं च।',
    storyPuranaLore: 'पौराणिकपरम्परा',
    storyChapterPrefix: 'अध्यायः',
    storyPrevBtn: 'पूर्वाध्यायः',
    storyNextBtn: 'अग्रिमाध्यायः',

    festivalsTitle: 'त्र्यम्बकेश्वरस्य पावनोत्सवाः',
    festivalsSubtitle:
      'सिंहस्थकुम्भपर्वणि, महाशिवरात्रौ, श्रावणमासे च भगवतः आराधनया आत्मानं पुनीहि।',
    festivalsSignificanceLabel: 'आध्यात्मिकं माहात्म्यम्:',

    darshanSubtitle:
      'सुलभदर्शनाय मन्दिरवेला, आरतीसमयः, परम्परागतवस्त्राणि, गर्भगृहमर्यादा च।',
    darshanTabTimings: 'दर्शनारतीसमयसारिणी',
    darshanTabGuidelines: 'वस्त्रमर्यादा नियमाश्च',
    darshanDailySchedule: 'दैनिकी मन्दिरसमयसारिणी',
    darshanTempleGates: 'मन्दिरोद्घाटनम्: प्रातः ०५:३० तः रात्रौ ०९:०० पर्यन्तम्',
    darshanMondayTitle: 'विशेषसोमवासरस्य सुवर्णमुकुटदर्शनम्',
    darshanMondayDesc:
      'प्रतिसोमवासरं सायं ०७:०० तः ०८:३० पर्यन्तं ज्योतिर्लिङ्गे ऐतिहासिकं सुवर्णमुकुटं धार्यते, पालकीशोभायात्रा च प्रचलति।',
    darshanDressMen: 'पुरुषाः: गर्भगृहस्पर्शदर्शनाय धौतवस्त्रम् (धोती) उत्तरीयम् च अनिवार्यम्।',
    darshanDressWomen: 'महिलाः: साटिका (साड़ी) अथवा शालीनवस्त्राणि।',
    darshanRulesTitle: 'गर्भगृहमर्यादा',

    reachSubtitle: 'नाशिकात्, मुम्बय्याः, पुण्यातश्च मार्ग-रेल्वे-विमानयानैः त्र्यम्बकेश्वरगमनं सुगमम्।',
    reachRoadTitle: 'मार्गपरिवहनम्',
    reachRoadDesc: 'नाशिकात् त्र्यम्बकेश्वरं २८ कि.मी. चतुष्पथराजमार्गः।',
    reachRoadNote: 'नाशिककेन्द्रात् प्रति १५ निमेषेषु यानानि उपलभ्यन्ते।',
    reachTrainTitle: 'रेल्वेपरिवहनम्',
    reachTrainDesc: 'नाशिकरोडरेलस्थानकम् (NK) प्रमुखं जंक्शन अस्ति (३८ कि.मी.)।',
    reachTrainNote: 'वन्देभारत-पञ्चवटी-तपोवनप्रभृतिरेलयानानि मुम्बई-नाशिकं योजयन्ति।',
    reachAirTitle: 'विमानपरिवहनम्',
    reachAirDesc: 'नाशिकओझरविमानस्थानम् (५० कि.मी.), मुम्बईविमानस्थानम् (१७५ कि.मी.) च।',
    reachAirNote: 'विमानस्थानात् त्र्यम्बकं प्रति अहोरात्रं यानव्यवस्था वर्तते।',

    reviewsNative: 'भक्तानाम् अनुभूतीः',
    reviewsTitle: 'तीर्थयात्रिणां पावनप्रत्युत्तराणि',
    reviewsSubtitle: 'दर्शनं पूजामनुष्ठानं च समाप्य भक्तानां मनःप्रसादस्य संकलनम्।',
    reviewsNote: '* समस्तेभ्यो भारतेभ्यः आगतानां श्रद्धालुपरिवाराणां प्रमाणभूताः अनुभूतयः।',

    faqSubtitle: 'पूजासज्जता, निवासः, अपेक्षितदिनानि, मन्दिरनियमाश्चेति बहुप्रश्नानां उत्तराणि।',
  },

  // ==========================================
  // GUJARATI (ગુજરાતી)
  // ==========================================
  gu: {
    introBadgeBrahmagiriTitle: 'બ્રહ્મગિરિ',
    introBadgeBrahmagiriDesc: '૧,૨૯૫ મી. શિખર',
    introBadgeKushavartaTitle: 'કુશાવર્ત',
    introBadgeKushavartaDesc: 'પવિત્ર સ્નાન કુંડ',
    introBadgeHemadpanthiTitle: 'હેમાડપંથી',
    introBadgeHemadpanthiDesc: 'કાળા પથ્થરનું સ્થાપત્ય',
    introQuoteText:
      '"ત્ર્યંબકેશ્વર મહારાષ્ટ્રનું પરમ પવિત્ર તીર્થક્ષેત્ર છે જ્યાં ત્રિદેવ જ્યોતિર્લિંગ બિરાજમાન છે. બ્રહ્મગિરિ પર્વત પરથી પ્રગટ થયેલી ગોદાવરી અને કુશાવર્ત તીર્થ ભક્તોના હૃદયને શાંતિ આપે છે."',
    introQuoteAuthor: 'સનાતન પરંપરા • ગોદાવરી માહાત્મ્ય',
    introCardTag: 'પવિત્ર વારસો',
    introCardTitle: 'કુશાવર્ત તીર્થ અને શ્રી ત્ર્યંબકેશ્વર',
    introCardDesc: 'ગૌતમ ઋષિ દ્વારા સ્થાપિત પવિત્ર તીર્થ, જ્યાં દક્ષિણ ગંગા ગોદાવરી સમગ્ર ભારતમાં પ્રવાહિત થાય છે.',

    jyotirlingaTrinityRudra: 'શ્રીમહેશ્વર (રુદ્ર)',
    jyotirlingaTrinityBrahma: 'શ્રીબ્રહ્મા (સૃષ્ટિકર્તા)',
    jyotirlingaTrinityVishnu: 'શ્રીવિષ્ણુ (પાલનકર્તા)',
    jyotirlingaFeature1Title: 'અદ્વિતીય ત્રિમૂર્તિ સ્વરૂપ',
    jyotirlingaFeature1Desc:
      'અન્ય તમામ અગિયાર જ્યોતિર્લિંગોમાં માત્ર શિવજી જ પૂજાય છે. ફક્ત ત્ર્યંબકેશ્વરમાં જ એક જ વિવરમાં બ્રહ્મા, વિષ્ણુ અને રુદ્ર ત્રણેય દેવો અંગૂઠા જેટલા લિંગ સ્વરૂપે એકસાથે બિરાજે છે.',
    jyotirlingaFeature2Title: 'ઐતિહાસિક સુવર્ણ મુગટ દર્શન',
    jyotirlingaFeature2Desc:
      'ગર્ભગૃહમાં પાંડવ અને પેશ્વા કાળનો રત્નજડિત સુવર્ણ મુગટ છે જેમાં હીરા, માણેક અને પન્ના જડેલા છે. દર સોમવારે સાંજે આ મુગટ જ્યોતિર્લિંગ પર ધારણ કરાવાય છે.',
    jyotirlingaFeature3Title: 'અવિરત પાવન જલધારા',
    jyotirlingaFeature3Desc:
      'ગર્ભગૃહમાં ત્રણેય લિંગો પર કુદરતી જળધારા સતત વહેતી રહે છે, જે ગોદાવરી માતા દ્વારા મહાદેવને અર્પિત અખંડ જળાભિષેકનું પ્રતીક છે.',

    shlokaMeaningTitle: 'અર્થ અને શાસ્ત્ર મહત્વ',
    shlokaMeaningText:
      'અમે ત્રિનેત્રધારી, સુગંધિત અને સર્વ જીવોનું પોષણ કરનારા ભગવાન શિવની આરાધના કરીએ છીએ. જેવી રીતે પાકેલું કાકડી વેલાથી આપમેળે મુક્ત થાય છે, તેમ જ તેઓ આપણને મૃત્યુ અને સંસારના બંધનોમાંથી મુક્ત કરી અમૃતત્વ પ્રદાન કરે.',
    shlokaPraise: 'ઋગ્વેદ (૭.૫૯.૧૨) નો પરમ કલ્યાણકારી મહામૃત્યુંજય મંત્ર',

    pujaDurationLabel: 'સમયગાળો',
    pujaSamagriLabel: 'વૈદિક સામગ્રી',
    pujaSamagriVal: 'ગુરુજી દ્વારા વ્યવસ્થા',
    pujaDetailsBtn: 'વિગતો જુઓ',
    pujaBookBtn: 'વિધિ બુક કરો',
    pujaNames: {
      'narayan-nagbali': {
        name: 'નારાયણ નાગબલી',
        desc: 'પિતૃદોષ નિવારણ અને પૂર્વજોની શાંતિ માટે ગરુડ પુરાણ આધારિત પવિત્ર વિધિ.',
        duration: '૩ દિવસ (સંપૂર્ણ વિધિ)',
      },
      'tripindi-shraddha': {
        name: 'ત્રિપિંડી શ્રાદ્ધ',
        desc: 'પાછલી ત્રણ પેઢીના પિતૃઓની તૃપ્તિ અને પરિવારના સુખ-શાંતિ માટે વૈદિક શ્રાદ્ધ.',
        duration: '૧ દિવસ (આશરે ૩-૪ કલાક)',
      },
      'kaal-sarp-shanti': {
        name: 'કાલસર્પ યોગ શાંતિ',
        desc: 'જ્યોતિષશાસ્ત્ર આધારિત ગ્રહપીડા શાંતિ માટે મહાદેવના સાન્નિધ્યમાં અનુષ્ઠાન.',
        duration: '૧ દિવસ (આશરે ૨.૫-૩ કલાક)',
      },
      'kumbh-vivah': {
        name: 'કુંભ વિવાહ',
        desc: 'વૈવાહિક દોષ નિવારણ માટે શાસ્ત્રોક્ત પવિત્ર કળશ સ્થાપના સંસ્કાર.',
        duration: '૧ દિવસ (આશરે ૨ કલાક)',
      },
      'maha-mrityunjaya': {
        name: 'મહામૃત્યુંજય જાપ',
        desc: 'દીર્ઘાયુષ્ય, આરોગ્ય અને સંકટ મુક્તિ માટે વૈદિક મંત્રોનું પવિત્ર અનુષ્ઠાન.',
        duration: '૧ થી ૩ દિવસ',
      },
      rudrabhishek: {
        name: 'લઘુરુદ્ર / રુદ્રાભિષેક',
        desc: 'પંચામૃત અને ગોદાવરી જળ સાથે રુદ્રસૂક્ત દ્વારા મહાદેવને પવિત્ર અભિષેક.',
        duration: '૨ કલાક',
      },
    },

    step1Desc: 'શાસ્ત્રોક્ત પૂજા પસંદ કરો',
    step2Desc: 'શુભ મુહૂર્ત અને તારીખ નક્કી કરો',
    step3Desc: 'પ્રમાણિત પુરોહિતની પસંદગી કરો',
    step4Desc: 'ગોત્ર અને યજમાન વિગતો આપો',
    step5Desc: 'તરત જ બુકિંગ કન્ફર્મેશન મેળવો',
    trustBadge1: 'સરળ અને પારદર્શક',
    trustBadge2: 'પ્રમાણિત ત્ર્યંબક પુરોહિત',
    trustBadge3: 'કોઈ છુપો ચાર્જ નથી',

    gurujiLanguagesLabel: 'ભાષાઓ:',
    gurujiSpecialtiesLabel: 'પૂજા વિશેષતા:',
    gurujiBookVidhiBtn: 'વિધિ બુક કરો',

    traditionBadge: '॥ ૨૫ પેઢીઓની વંશપરંપરાગત વતનદાર તીર્થ પુરોહિત પરંપરા ॥',
    traditionTitle: 'છત્રપતિ શિવાજી મહારાજના કાળથી પ્રાપ્ત ઐતિહાસિક વતન',
    traditionSub: '૨૫ પેઢીઓની અખંડ શાસ્ત્રોક્ત સેવા • સમગ્ર ત્ર્યંબકેશ્વર ગામના અધિકૃત વતનદાર પુરોહિત',
    traditionDesc:
      'અમે શ્રી ક્ષેત્ર ત્ર્યંબકેશ્વરના વંશપરંપરાગત વતનદાર તીર્થ પુરોહિત છીએ. છત્રપતિ શિવાજી મહારાજના સમયથી અમારા પરિવારને સમગ્ર ત્ર્યંબકેશ્વર ગામનું ઐતિહાસિક વતન (ધાર્મિક અધિકાર) મળેલું છે, અને ત્યારથી અહીંના તમામ ધાર્મિક કાર્યો અને હવન-વિધીઓ સ્વયં અમારા હસ્તે સંપન્ન થાય છે. ૨૫ પેઢીઓથી અમે અહીં અવિરત કાર્યરત છીએ. ત્ર્યંબકેશ્વરમાં થતા તમામ મુખ્ય વિધાનો—નારાયણ નાગબલી, કાલસર્પ શાંતિ, ત્રિપિંડી શ્રાદ્ધ, મહામૃત્યુંજય જપ અને હવન, લઘુરુદ્ર, રુદ્રાભિષેક, મહાઅભિષેક, મહારુદ્ર, ગ્રહ નક્ષત્ર શાંતિ, વાસ્તુ શાંતિ, નવચંડી યાગ, ગણેશ યાગ અને ઉદક શાંતિ શાસ્ત્રોક્ત વિધિથી સ્વયં કરવામાં આવે છે.',
    traditionPill1: 'શિવાજી મહારાજ કાલીન વતન',
    traditionPill2: '૨૫ પેઢીઓની પવિત્ર પરંપરા',
    traditionPillar1Title: 'ઐતિહાસિક વતન અને ૨૫ પેઢીઓનો વારસો',
    traditionPillar1Desc:
      'છત્રપતિ શિવાજી મહારાજના સમયથી ત્ર્યંબકેશ્વર ગામનું ધાર્મિક વતન અમારા કુળ પાસે છે અને ૨૫ પેઢીઓથી તમામ વિધિઓ અમારા દ્વારા સંપન્ન થાય છે.',
    traditionPillar2Title: 'તમામ મુખ્ય વિધિઓ, શાંતિ અને મહાયાગ',
    traditionPillar2Desc:
      'નારાયણ નાગબલી, કાલસર્પ શાંતિ, ત્રિપિંડી શ્રાદ્ધ, મહામૃત્યુંજય જપ-હવન, લઘુરુદ્ર, મહારુદ્ર, વાસ્તુ શાંતિ, નવચંડી યાગ, ગણેશ યાગ, ઉદક શાંતિ.',
    traditionPillar3Title: 'અધિકૃત પુરોહિતો દ્વારા સીધું અનુષ્ઠાન',
    traditionPillar3Desc:
      'કોઈપણ વચેટિયા વગર સીધા વતનદાર પુરોહિતો દ્વારા શુદ્ધ વૈદિક મંત્રોચ્ચાર અને સંપૂર્ણ શાસ્ત્રોક્ત વિધિ.',

    sacredPlacesSubtitle:
      'કુશાવર્ત કુંડ, બ્રહ્મગિરિ પર્વત અને પવિત્ર તીર્થસ્થાનોના દર્શન કરી યાત્રાને સફળ બનાવો.',
    sacredPlacesExploreBtn: 'વિગતો જુઓ',
    sacredPlacesDistancePrefix: 'મંદિરથી અંતર',

    storySubtitle:
      'ગૌતમ ઋષિની કઠોર તપસ્યા, ગૌહત્યા મુક્તિ અને ભગવાન શિવ દ્વારા ગોદાવરીનું પ્રાગટ્ય—આ પાવન કથા જાણો.',
    storyPuranaLore: 'પૌરાણિક પરંપરા',
    storyChapterPrefix: 'અધ્યાય',
    storyPrevBtn: 'પાછલો અધ્યાય',
    storyNextBtn: 'આગળનો અધ્યાય',

    festivalsTitle: 'ત્ર્યંબકેશ્વરના પાવન ઉત્સવો',
    festivalsSubtitle:
      'સિંહસ્થ કુંભમેળો, મહાશિવરાત્રિ અને શ્રાવણ માસના ભવ્ય ઉત્સવોમાં ભક્તિભાવ સાથે સહભાગી થાઓ.',
    festivalsSignificanceLabel: 'આધ્યાત્મિક માહાત્મ્ય:',

    darshanSubtitle:
      'સરળ દર્શન માટે મંદિરનો સમય, આરતી સમયપત્રક, વસ્ત્રસંહિતા અને ગર્ભગૃહના નિયમોની સંપૂર્ણ વિગત.',
    darshanTabTimings: 'દર્શન અને આરતી સમય',
    darshanTabGuidelines: 'વસ્ત્રસંહિતા અને નિયમો',
    darshanDailySchedule: 'દૈનિક મંદિર સમયપત્રક',
    darshanTempleGates: 'મંદિર ખુલ્લું: સવારે ૦૫:૩૦ થી રાત્રે ૦૯:૦૦',
    darshanMondayTitle: 'વિશેષ સોમવાર સુવર્ણ મુગટ દર્શન',
    darshanMondayDesc:
      'દર સોમવારે સાંજે ૦૭:૦૦ થી ૦૮:૩૦ દરમિયાન જ્યોતિર્લિંગ પર ઐતિહાસિક સુવર્ણ મુગટ ચઢાવવામાં આવે છે અને પાલખી યાત્રા નીકળે છે.',
    darshanDressMen: 'પુરુષો: ગર્ભગૃહ સ્પર્શ દર્શન માટે ધોતી અને ખેસ ફરજિયાત છે.',
    darshanDressWomen: 'મહિલાઓ: સાડી અથવા સલવાર-કમીઝ દુપટ્ટા સાથે.',
    darshanRulesTitle: 'ગર્ભગૃહ મર્યાદા',

    reachSubtitle: 'નાશિક, મુંબઈ અને પુણેથી રોડ, રેલવે અને હવાઈ માર્ગે ત્ર્યંબકેશ્વર પહોંચવું ખૂબ સરળ છે.',
    reachRoadTitle: 'રોડ માર્ગ (હાઈવે)',
    reachRoadDesc: 'નાશિકથી ત્ર્યંબકેશ્વર ૨૮ કિમીનો ઉત્તમ ચાર-માર્ગીય રસ્તો (NH-848).',
    reachRoadNote: 'નાશિક સીબીએસ બસ સ્ટેન્ડથી દર ૧૫ મિનિટે બસો અને ટેક્સી ઉપલબ્ધ છે.',
    reachTrainTitle: 'રેલવે માર્ગ',
    reachTrainDesc: 'નાશિક રોડ રેલવે સ્ટેશન (NK) નજીકનું મુખ્ય જંકશન છે (૩૮ કિમી).',
    reachTrainNote: 'વંદે ભારત, પંચવટી, તપોવન એક્સપ્રેસ મુંબઈ અને ગુજરાત સાથે સીધું જોડાણ પૂરું પાડે છે.',
    reachAirTitle: 'હવાઈ માર્ગ',
    reachAirDesc: 'નાશિક ઓઝર એરપોર્ટ (૫૦ કિમી) અને મુંબઈ ઈન્ટરનેશનલ એરપોર્ટ (૧૭૫ કિમી).',
    reachAirNote: 'એરપોર્ટ પરથી ત્ર્યંબક માટે ૨૪ કલાક ટેક્સી સેવા ઉપલબ્ધ છે.',

    reviewsNative: 'ભક્તોના અનુભવો',
    reviewsTitle: 'શ્રદ્ધાળુઓના પવિત્ર અનુભવો',
    reviewsSubtitle: 'દર્શન અને શાસ્ત્રોક્ત પૂજાવિધિ પૂર્ણ થયા બાદ ભક્તો દ્વારા વ્યક્ત કરાયેલા પ્રતિભાવો.',
    reviewsNote: '* મહારાષ્ટ્ર, ગુજરાત અને સમગ્ર દેશમાંથી આવેલા શ્રદ્ધાળુ પરિવારોના સાચા અનુભવો.',

    faqSubtitle: 'પૂજાની તૈયારી, રોકાણ, જરૂરી દિવસો અને મંદિરના નિયમો અંગેના વારંવાર પૂછાતા પ્રશ્નો.',
  },

  // ==========================================
  // TELUGU (తెలుగు)
  // ==========================================
  te: {
    introBadgeBrahmagiriTitle: 'బ్రహ్మగిరి',
    introBadgeBrahmagiriDesc: '1,295 మీ. శిఖరం',
    introBadgeKushavartaTitle: 'కుశావర్థం',
    introBadgeKushavartaDesc: 'పవిత్ర స్నాన కుండం',
    introBadgeHemadpanthiTitle: 'హేమాడ్పంతి',
    introBadgeHemadpanthiDesc: 'కృష్ణశిలా నిర్మాణం',
    introQuoteText:
      '"త్రయంబకేశ్వరం మహారాష్ట్రలోని అత్యంత పవిత్రమైన పుణ్యక్షేత్రం, ఇక్కడ త్రిమూర్తి జ్యోతిర్లింగం కొలువై ఉంది. బ్రహ్మగిరి నుండి ఉద్భవించిన గోదావరి మరియు కుశావర్థ తీర్థం భక్తుల హృదయాలకు పరమశాంతిని ప్రసాదిస్తాయి."',
    introQuoteAuthor: 'సనాతన సంప్రదాయం • గోదావరి మాహాత్మ్యం',
    introCardTag: 'పవిత్ర వారసత్వం',
    introCardTitle: 'కుశావర్థ తీర్థం & శ్రీ త్రయంబకేశ్వరుడు',
    introCardDesc: 'గౌతమ మహర్షి ప్రతిష్ఠించిన పవిత్ర తీర్థం, ఇక్కడి నుండే దక్షిణ గంగ గోదావరి భారతదేశమంతటా ప్రవహిస్తుంది.',

    jyotirlingaTrinityRudra: 'శ్రీమహేశ్వరుడు (రుద్రుడు)',
    jyotirlingaTrinityBrahma: 'శ్రీబ్రహ్మ (సృష్టికర్త)',
    jyotirlingaTrinityVishnu: 'శ్రీవిష్ణువు (స్థితికారుడు)',
    jyotirlingaFeature1Title: 'అద్వితీయ త్రిమూర్తి స్వరూపం',
    jyotirlingaFeature1Desc:
      'మిగిలిన పదకొండు జ్యోతిర్లింగాలలో శివుడు ఏకలింగ రూపంలో పూజించబడతాడు. కేవలం త్రయంబకేశ్వరంలో మాత్రమే బ్రహ్మ, విష్ణు, మహేశ్వరులు ముగ్గురూ బొటనవేలంత లింగ రూపాలలో ఒకే పీఠంలో పూజలందుకుంటారు.',
    jyotirlingaFeature2Title: 'చారిత్రక సువర్ణ కిరీట దర్శనం',
    jyotirlingaFeature2Desc:
      'గర్భాలయంలో పాండవులు మరియు పీష్వాల కాలం నాటి నవరత్న ఖచిత సువర్ణ కిరీటం ఉంది. ప్రతి సోమవారం సాయంత్రం ఈ పవిత్ర కిరీటాన్ని జ్యోతిర్లింగానికి అలంకరిస్తారు.',
    jyotirlingaFeature3Title: 'అవిరళ పవిత్ర జలధార',
    jyotirlingaFeature3Desc:
      'గర్భగుడిలోని లింగాలపై నిరంతరం సహజమైన చల్లని జలధార ప్రవహిస్తుంది, ఇది గోదావరి మాత మహాదేవునికి సమర్పించే నిరంతర అభిషేకానికి ప్రతీక.',

    shlokaMeaningTitle: 'తాత్పర్యం & శాస్త్ర వైభవం',
    shlokaMeaningText:
      'సుగంధభరితుడు, సమస్త ప్రాణికోటిని పోషించే ముక్కంటి పరమేశ్వరుడిని మేము ఆరాధిస్తున్నాము. పండిన దోసకాయ తీగ నుండి సునాయాసంగా ఎలా విడివడుతుందో, అలాగే మనలను మృత్యు భయాల నుండి, సంసార బంధనాల నుండి విముక్తి చేసి అమరత్వాన్ని ప్రసాదించుగాక.',
    shlokaPraise: 'ఋగ్వేదోక్త (7.59.12) పరమ పావన మహామృత్యుంజయ మంత్రం',

    pujaDurationLabel: 'వ్యవధి',
    pujaSamagriLabel: 'వైదిక సామాగ్రి',
    pujaSamagriVal: 'గురూజీ సమకూరుస్తారు',
    pujaDetailsBtn: 'వివరాలు చూడండి',
    pujaBookBtn: 'పూజ బుక్ చేయండి',
    pujaNames: {
      'narayan-nagbali': {
        name: 'నారాయణ నాగబలి',
        desc: 'పితృదోష నివారణ మరియు పితృదేవతల ఆత్మశాంతి కోసం గరుడ పురాణోక్త విధి.',
        duration: '3 రోజులు (సంపూర్ణ విధి)',
      },
      'tripindi-shraddha': {
        name: 'త్రిపిండి శ్రాద్ధం',
        desc: 'గత మూడు తరాల పితరుల శాంతి మరియు వంశాభివృద్ధి కోసం చేసే శ్రాద్ధం.',
        duration: '1 రోజు (సుమారు 3-4 గంటలు)',
      },
      'kaal-sarp-shanti': {
        name: 'కాలసర్ప యోగ శాంతి',
        desc: 'జ్యోతిష్యాధారిత గ్రహపీడల నివారణకై పరమశివుని సన్నిధిలో శాంతి పూజ.',
        duration: '1 రోజు (సుమారు 2.5-3 గంటలు)',
      },
      'kumbh-vivah': {
        name: 'కుంభ వివాహం',
        desc: 'వివాహ దోష నివారణకై శాస్త్రోక్త కలశ ప్రతిష్ఠాపనా సంస్కారము.',
        duration: '1 రోజు (సుమారు 2 గంటలు)',
      },
      'maha-mrityunjaya': {
        name: 'మహామృత్యుంజయ జపం',
        desc: 'ఆయురారోగ్యాలు, గ్రహపీడా నివారణ కొరకు వైదిక మంత్ర జపానుష్ఠానం.',
        duration: '1 నుండి 3 రోజులు',
      },
      rudrabhishek: {
        name: 'లఘురుద్రం / రుద్రాభిషేకం',
        desc: 'పంచామృతాలు మరియు పవిత్ర గోదావరి జలాలతో నమక చమకాలతో రుద్రాభిషేకం.',
        duration: '2 గంటలు',
      },
    },

    step1Desc: 'శాస్త్రోక్త పూజను ఎంచుకోండి',
    step2Desc: 'శుభ ముహూర్తం & తేదీని నిర్ణయించండి',
    step3Desc: 'సర్టిఫైడ్ పురోహితులను ఎంచుకోండి',
    step4Desc: 'గోత్రనామాలు & యజమాని వివరాలు ఇవ్వండి',
    step5Desc: 'వెంటనే బుకింగ్ రసీదు పొందండి',
    trustBadge1: 'సరళమైనది & పారదర్శకమైనది',
    trustBadge2: 'ధృవీకరించబడిన త్రయంబక పురోహితులు',
    trustBadge3: 'ఎటువంటి దాచిన రుసుములు లేవు',

    gurujiLanguagesLabel: 'భాషలు:',
    gurujiSpecialtiesLabel: 'పూజా నైపుణ్యాలు:',
    gurujiBookVidhiBtn: 'పూజ బుక్ చేయండి',

    traditionBadge: '॥ 25 తరాల సాంప్రదాయ వతన్‌దార్ తీర్థ పురోహిత వంశం ॥',
    traditionTitle: 'ఛత్రపతి శివాజీ మహారాజ్ కాలం నుండి చారిత్రక వతన్',
    traditionSub: '25 తరాల అఖండ శాస్త్రోక్త సేవ • త్రయంబకేశ్వర్ గ్రామ అధికారిక పురోహితులు',
    traditionDesc:
      'మేము శ్రీ క్షేత్ర త్రయంబకేశ్వర్ వంశపారంపర్య వతన్‌దార్ తీర్థ పురోహితులం. ఛత్రపతి శివాజీ మహారాజ్ కాలం నుండి మా వంశానికి సంపూర్ణ త్రయంబకేశ్వర్ గ్రామ చారిత్రక వతన్ (ధార్మిక హక్కులు) లభించింది, అప్పటి నుండి ఇక్కడి సర్వ ధార్మిక కార్యాలు మా చేతుల మీదుగానే నిర్వహించబడుతున్నాయి. గత 25 తరాలుగా మేము నిరంతరాయంగా సేవ చేస్తున్నాము. నారాయణ నాగబలి, కాలసర్ప శాంతి, త్రిపిండి శ్రాద్ధం, మహామృత్యుంజయ జపం & హవనం, లఘురుద్ర, రుద్రాభిషేకం, మహాభిషేకం, మహారుద్ర, గ్రహ నక్షత్ర శాంతి, వాస్తు శాంతి, నవచండీ యాగం, గణేశ యాగం, ఉదక శాంతి వంటి సమస్త పూజలు శాస్త్రోక్తంగా స్వయంగా నిర్వహిస్తాము.',
    traditionPill1: 'శివాజీ మహారాజ్ కాలం నాటి వతన్',
    traditionPill2: '25 తరాల పవిత్ర సంప్రదాయం',
    traditionPillar1Title: 'చారిత్రక వతన్ & 25 తరాల వారసత్వం',
    traditionPillar1Desc:
      'ఛత్రపతి శివాజీ మహారాజ్ కాలం నుండి త్రయంబకేశ్వర్ గ్రామ ధార్మిక వతన్ మా వంశంలో ఉండి 25 తరాలుగా కొనసాగుతోంది.',
    traditionPillar2Title: 'సమస్త ప్రధాన విధులు, శాంతులు & మహాయాగాలు',
    traditionPillar2Desc:
      'నారాయణ నాగబలి, కాలసర్ప శాంతి, త్రిపిండి శ్రాద్ధం, మహామృత్యుంజయ జపం-హవనం, రుద్రాభిషేకం, లఘురుద్ర, మహారుద్ర, వాస్తు శాంతి, నవచండీ యాగం, ఉదక శాంతి.',
    traditionPillar3Title: 'ప్రత్యక్షంగా అర్హతగల పురోహితులచే నిర్వహణ',
    traditionPillar3Desc:
      'దళారుల ప్రమేయం లేకుండా వతన్‌దార్ పురోహితులచే స్వయంగా శాస్త్రోక్తంగా నిర్వహించబడే వేద విధి.',

    sacredPlacesSubtitle:
      'కుశావర్థ కుండం, బ్రహ్మగిరి పర్వతం మరియు పవిత్ర తీర్థాలను దర్శించి మీ పుణ్యయాత్రను సంపూర్ణం చేసుకోండి.',
    sacredPlacesExploreBtn: 'వివరాలు చూడండి',
    sacredPlacesDistancePrefix: 'ఆలయం నుండి దూరం',

    storySubtitle:
      'గౌతమ మహర్షి తపస్సు, గోహత్య దోష నివారణ మరియు పరమశివుడు గోదావరిని భువికి అనుగ్రహించిన పవిత్ర పురాణ గాథ.',
    storyPuranaLore: 'పౌరాణిక సంప్రదాయం',
    storyChapterPrefix: 'అధ్యాయం',
    storyPrevBtn: 'మునుపటి అధ్యాయం',
    storyNextBtn: 'తరువాతి అధ్యాయం',

    festivalsTitle: 'త్రయంబకేశ్వర పవిత్ర ఉత్సవాలు',
    festivalsSubtitle:
      'సింహస్థ కుంభమేళా, మహాశివరాత్రి మరియు శ్రావణ సోమవారాల వైభవోపేత ఉత్సవాలలో పాల్గొనండి.',
    festivalsSignificanceLabel: 'ఆధ్యాత్మిక విశిష్టత:',

    darshanSubtitle:
      'సులభ దర్శనం కొరకు ఆలయ వేళలు, హారతి సమయాలు, డ్రెస్ కోడ్ మరియు గర్భాలయ నిబంధనల సమాచారం.',
    darshanTabTimings: 'దర్శనం & హారతి వేళలు',
    darshanTabGuidelines: 'డ్రెస్ కోడ్ & నియమాలు',
    darshanDailySchedule: 'దినసరి ఆలయ వేళలు',
    darshanTempleGates: 'ఆలయం తెరిచే సమయం: ఉదయం 05:30 నుండి రాత్రి 09:00 వరకు',
    darshanMondayTitle: 'ప్రత్యేక సోమవార సువర్ణ కిరీట దర్శనం',
    darshanMondayDesc:
      'ప్రతి సోమవారం సాయంత్రం 07:00 నుండి 08:30 వరకు జ్యోతిర్లింగానికి చారిత్రక సువర్ణ కిరీటాన్ని అలంకరిస్తారు మరియు పల్లకీ సేవ జరుగుతుంది.',
    darshanDressMen: 'పురుషులు: గర్భాలయ స్పర్శ దర్శనం కొరకు ధోవతి (ధోతి) మరియు ఉత్తరీయం తప్పనిసరి.',
    darshanDressWomen: 'మహిళలు: చీర లేదా చుడీదార్ దుపట్టాతో.',
    darshanRulesTitle: 'గర్భాలయ నియమాలు',

    reachSubtitle: 'నాసిక్, ముంబై మరియు పూణేల నుండి రోడ్డు, రైలు మరియు విమాన మార్గాల ద్వారా సులభంగా చేరుకోవచ్చు.',
    reachRoadTitle: 'రోడ్డు మార్గం (హైవే)',
    reachRoadDesc: 'నాసిక్ నుండి త్రయంబకేశ్వరం 28 కి.మీ. 4-లేన్ హైవే (NH-848).',
    reachRoadNote: 'నాసిక్ సీబీఎస్ బస్ స్టేషన్ నుండి ప్రతి 15 నిమిషాలకు బస్సులు మరియు ట్యాక్సీలు కలవు.',
    reachTrainTitle: 'రైలు మార్గం',
    reachTrainDesc: 'నాసిక్ రోడ్ రైల్వే స్టేషన్ (NK) సమీప ప్రధాన జంక్షన్ (38 కి.మీ.).',
    reachTrainNote: 'వందే భారత్, పంచవటి, తపోవన్ ఎక్స్‌ప్రెస్ రైళ్లు ముంబై నుండి అనుసంధానిస్తాయి.',
    reachAirTitle: 'విమాన మార్గం',
    reachAirDesc: 'నాసిక్ ఓజర్ ఎయిర్‌పోర్ట్ (50 కి.మీ.) మరియు ముంబై ఇంటర్నేషనల్ ఎయిర్‌పోర్ట్ (175 కి.మీ.).',
    reachAirNote: 'ఎయిర్‌పోర్ట్ నుండి త్రయంబకేశ్వరం వరకు 24 గంటల ట్యాక్సీ సౌకర్యం కలదు.',

    reviewsNative: 'భక్తుల అనుభవాలు',
    reviewsTitle: 'భక్తుల అనుభవాలు & స్పందనలు',
    reviewsSubtitle: 'దర్శనం మరియు వైదిక పూజా విధులు ముగించుకున్న భక్తులు పంచుకున్న పవిత్ర అనుభవాలు.',
    reviewsNote: '* మహారాష్ట్ర, గుజరాత్, ఆంధ్రప్రదేశ్, తెలంగాణ మరియు భారతదేశం నలుమూలల భక్తుల అనుభవాలు.',

    faqSubtitle: 'పూజ సన్నాహాలు, వసతి, అవసరమైన రోజులు మరియు ఆలయ నియమాలపై తరచుగా అడిగే ప్రశ్నలు.',
  },

  // ==========================================
  // KANNADA (ಕನ್ನಡ)
  // ==========================================
  kn: {
    introBadgeBrahmagiriTitle: 'ಬ್ರಹ್ಮಗಿರಿ',
    introBadgeBrahmagiriDesc: '1,295 ಮೀ. ಶಿಖರ',
    introBadgeKushavartaTitle: 'ಕುಶಾವರ್ತ',
    introBadgeKushavartaDesc: 'ಪವಿತ್ರ ಸ್ನಾನ ಕುಂಡ',
    introBadgeHemadpanthiTitle: 'ಹೇಮಾಡಪಂಥಿ',
    introBadgeHemadpanthiDesc: 'ಕೃಷ್ಣಶಿಲಾ ವಾಸ್ತುಶಿಲ್ಪ',
    introQuoteText:
      '"ತ್ರ್ಯಂಬಕೇಶ್ವರವು ಮಹಾರಾಷ್ಟ್ರದ ಪರಮ ಪವಿತ್ರ ಕ್ಷೇತ್ರವಾಗಿದ್ದು, ಇಲ್ಲಿ ತ್ರಿಮೂರ್ತಿ ಜ್ಯೋತಿರ್ಲಿಂಗವು ನೆಲೆಸಿದೆ. ಬ್ರಹ್ಮಗಿರಿಯಿಂದ ಉಗಮಿಸಿದ ಗೋದಾವರಿ ಮತ್ತು ಕುಶಾವರ್ತ ತೀರ್ಥವು ಭಕ್ತರ ಮನಸ್ಸಿಗೆ ಶಾಂತಿಯನ್ನು ನೀಡುತ್ತದೆ."',
    introQuoteAuthor: 'ಸನಾತನ ಪರಂಪರೆ • ಗೋದಾವರಿ ಮಾಹಾತ್ಮ್ಯ',
    introCardTag: 'ಪವಿತ್ರ ಪರಂಪರೆ',
    introCardTitle: 'ಕುಶಾವರ್ತ ತೀರ್ಥ ಮತ್ತು ಶ್ರೀ ತ್ರ್ಯಂಬಕೇಶ್ವರ',
    introCardDesc: 'ಗೌತಮ ಮಹರ್ಷಿಗಳಿಂದ ಪ್ರತಿಷ್ಠಾಪಿಸಲ್ಪಟ್ಟ ಪವಿತ್ರ ತೀರ್ಥ, ಇಲ್ಲಿಂದ ದಕ್ಷಿಣ ಗಂಗೆ ಗೋದಾವರಿಯು ಸಮಗ್ರ ಭಾರತದಲ್ಲಿ ಹರಿಯುತ್ತದೆ.',

    jyotirlingaTrinityRudra: 'ಶ್ರೀಮಹೇಶ್ವರ (ರುದ್ರ)',
    jyotirlingaTrinityBrahma: 'ಶ್ರೀಬ್ರಹ್ಮ (ಸೃಷ್ಟಿಕರ್ತ)',
    jyotirlingaTrinityVishnu: 'ಶ್ರೀವಿಷ್ಣು (ಪಾಲಕ)',
    jyotirlingaFeature1Title: 'ಅದ್ವಿತೀಯ ತ್ರಿಮೂರ್ತಿ ಸ್ವರೂಪ',
    jyotirlingaFeature1Desc:
      'ಇತರ ಹನ್ನೊಂದು ಜ್ಯೋತಿರ್ಲಿಂಗಗಳಲ್ಲಿ ಶಿವನನ್ನು ಏಕಲಿಂಗ ರೂಪದಲ್ಲಿ ಪೂಜಿಸಲಾಗುತ್ತದೆ. ಕೇವಲ ತ್ರ್ಯಂಬಕೇಶ್ವರದಲ್ಲಿ ಮಾತ್ರ ಒಂದೇ ಪೀಠದಲ್ಲಿ ಬ್ರಹ್ಮ, ವಿಷ್ಣು ಮತ್ತು ರುದ್ರ ಮೂವರೂ ಕಿರುಬೆರಳಿನ ಗಾತ್ರದ ಲಿಂಗರೂಪಗಳಲ್ಲಿ ಒಟ್ಟಿಗೆ ನೆಲೆಸಿದ್ದಾರೆ.',
    jyotirlingaFeature2Title: 'ಐತಿಹಾಸಿಕ ಸುವರ್ಣ ಕಿರೀಟ ದರ್ಶನ',
    jyotirlingaFeature2Desc:
      'ಗರ್ಭಗುಡಿಯಲ್ಲಿ ಪಾಂಡವರು ಮತ್ತು ಪೇಶ್ವೆಗಳ ಕಾಲದ ನವರತ್ನಖಚಿತ ಚಿನ್ನದ ಕಿರೀಟವಿದ್ದು, ಪ್ರತಿ ಸೋಮವಾರ ಸಂಜೆ ಈ ಕಿರೀಟವನ್ನು ಜ್ಯೋತಿರ್ಲಿಂಗಕ್ಕೆ ತೊಡಿಸಲಾಗುತ್ತದೆ.',
    jyotirlingaFeature3Title: 'ಅವಿರತ ಪಾವನ ಜಲಧಾರೆ',
    jyotirlingaFeature3Desc:
      'ಗರ್ಭಗುಡಿಯ ಲಿಂಗಗಳ ಮೇಲೆ ನೈಸರ್ಗಿಕ ತಂಪಾದ ಜಲಧಾರೆ ಸತತವಾಗಿ ಸುರಿಯುತ್ತಿರುತ್ತದೆ, ಇದು ಗೋದಾವರಿ ಮಾತೆಯು ಮಹಾದೇವನಿಗೆ ಅರ್ಪಿಸುವ ನಿರಂತರ ಜಲಾಭಿಷೇಕದ ಸಂಕೇತವಾಗಿದೆ.',

    shlokaMeaningTitle: 'ಅರ್ಥ ಮತ್ತು ಶಾಸ್ತ್ರ ಮಹತ್ವ',
    shlokaMeaningText:
      'ಸುಗಂಧಭರಿತನೂ, ಸಮಸ್ತ ಜೀವಿಗಳನ್ನು ಪೋಷಿಸುವವನೂ ಆದ ಮುಕ್ಕಣ್ಣ ಪರಮೇಶ್ವರನನ್ನು ನಾವು ಆರಾಧಿಸುತ್ತೇವೆ. ಬಲಿತ ಸೌತೆಕಾಯಿಯು ಬಳ್ಳಿಯಿಂದ ಸಹಜವಾಗಿ ಮುಕ್ತವಾಗುವಂತೆ, ಆತನು ನಮ್ಮನ್ನು ಮೃತ್ಯುಭಯ ಹಾಗೂ ಸಂಸಾರ ಬಂಧನಗಳಿಂದ ಮುಕ್ತಗೊಳಿಸಿ ಅಮೃತತ್ವವನ್ನು ಕರುಣಿಸಲಿ.',
    shlokaPraise: 'ಋಗ್ವೇದದ (7.59.12) ಪರಮ ಕಲ್ಯಾಣಕಾರಿ ಮಹಾಮೃತ್ಯುಂಜಯ ಮಂತ್ರ',

    pujaDurationLabel: 'ಸಮಯ',
    pujaSamagriLabel: 'ವೈದಿಕ ಸಾಮಗ್ರಿ',
    pujaSamagriVal: 'ಗುರೂಜಿ ವ್ಯವಸ್ಥೆ ಮಾಡುತ್ತಾರೆ',
    pujaDetailsBtn: 'ವಿವರ ನೋಡಿ',
    pujaBookBtn: 'ಪೂಜೆ ಕಾಯ್ದಿರಿಸಿ',
    pujaNames: {
      'narayan-nagbali': {
        name: 'ನಾರಾಯಣ ನಾಗಬಲಿ',
        desc: 'ಪಿತೃದೋಷ ನಿವಾರಣೆ ಮತ್ತು ಪೂರ್ವಜರ ಆತ್ಮಶಾಂತಿಗಾಗಿ ಗರುಡ ಪುರಾಣೋಕ್ತ ಪವಿತ್ರ ವಿಧಿ.',
        duration: '3 ದಿನಗಳು (ಸಂಪೂರ್ಣ ವಿಧಿ)',
      },
      'tripindi-shraddha': {
        name: 'ತ್ರಿಪಿಂಡಿ ಶ್ರಾದ್ಧ',
        desc: 'ಹಿಂದಿನ ಮೂರು ತಲೆಮಾರುಗಳ ಪಿತೃಗಳ ತೃಪ್ತಿ ಹಾಗೂ ಕುಟುಂಬದ ಶಾಂತಿಗಾಗಿ ವೈದಿಕ ಶ್ರಾದ್ಧ.',
        duration: '1 ದಿನ (ಸುಮಾರು 3-4 ಗಂಟೆ)',
      },
      'kaal-sarp-shanti': {
        name: 'ಕಾಲಸರ್ಪ ಯೋಗ ಶಾಂತಿ',
        desc: 'ಜ್ಯೋತಿಷ್ಯದ ಗ್ರಹಪೀಡೆಗಳ ನಿವಾರಣೆಗಾಗಿ ಮಹಾದೇವನ ಸನ್ನಿಧಿಯಲ್ಲಿ ಶಾಂತಿ ಪೂಜೆ.',
        duration: '1 ದಿನ (ಸುಮಾರು 2.5-3 ಗಂಟೆ)',
      },
      'kumbh-vivah': {
        name: 'ಕುಂಭ ವಿವಾಹ',
        desc: 'ವಿವಾಹ ದೋಷ ನಿವಾರಣೆಗಾಗಿ ಶಾಸ್ತ್ರೋಕ್ತ ಕಲಶ ಪ್ರತಿಷ್ಠಾಪನಾ ಸಂಸ್ಕಾರ.',
        duration: '1 ದಿನ (ಸುಮಾರು 2 ಗಂಟೆ)',
      },
      'maha-mrityunjaya': {
        name: 'ಮಹಾಮೃತ್ಯುಂಜಯ ಜಪ',
        desc: 'ದೀರ್ಘಾಯುಷ್ಯ, ಆರೋಗ್ಯ ಮತ್ತು ಸಂಕಷ್ಟ ನಿವಾರಣೆಗಾಗಿ ವೈದಿಕ ಮಂತ್ರ ಜಪಾನುಷ್ಠಾನ.',
        duration: '1 ರಿಂದ 3 ದಿನಗಳು',
      },
      rudrabhishek: {
        name: 'ಲಘುರುದ್ರ / ರುದ್ರಾಭಿಷೇಕ',
        desc: 'ಪಂಚಾಮೃತ ಮತ್ತು ಗೋದಾವರಿ ಜಲದಿಂದ ರುದ್ರಸೂಕ್ತದೊಂದಿಗೆ ಮಹಾದೇವನಿಗೆ ಅಭಿಷೇಕ.',
        duration: '2 ಗಂಟೆ',
      },
    },

    step1Desc: 'ಶಾಸ್ತ್ರೋಕ್ತ ಪೂಜೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    step2Desc: 'ಶುಭ ಮುಹೂರ್ತ ಮತ್ತು ದಿನಾಂಕ ನಿಗದಿಪಡಿಸಿ',
    step3Desc: 'ಪ್ರಮಾಣಿತ ಪುರೋಹಿತರನ್ನು ಆರಿಸಿ',
    step4Desc: 'ಗೋತ್ರ ಮತ್ತು ಯಜಮಾನರ ವಿವರ ನೀಡಿ',
    step5Desc: 'ತಕ್ಷಣದ ಬುಕಿಂಗ್ ದೃಢೀಕರಣ ಪಡೆಯಿರಿ',
    trustBadge1: 'ಸರಳ ಮತ್ತು ಪಾರದರ್ಶಕ',
    trustBadge2: 'ದೃಢೀಕೃತ ತ್ರ್ಯಂಬಕ ಪುರೋಹಿತರು',
    trustBadge3: 'ಯಾವುದೇ ಗುಪ್ತ ಶುಲ್ಕವಿಲ್ಲ',

    gurujiLanguagesLabel: 'ಭಾಷೆಗಳು:',
    gurujiSpecialtiesLabel: 'ಪೂಜಾ ಪರಿಣತಿ:',
    gurujiBookVidhiBtn: 'ಪೂಜೆ ಕಾಯ್ದಿರಿಸಿ',

    traditionBadge: '॥ 25 ತಲೆಮಾರುಗಳ ವಂಶಪಾರಂಪರ್ಯ ವತನ್‌ದಾರ್ ತೀರ್ಥ ಪುರೋಹಿತರು ॥',
    traditionTitle: 'ಛತ್ರಪತಿ ಶಿವಾಜಿ ಮಹಾರಾಜರ ಕಾಲದಿಂದ ಪಡೆದ ಐತಿಹಾಸಿಕ ವತನ್',
    traditionSub: '25 ತಲೆಮಾರುಗಳ ಅಖಂಡ ಶಾಸ್ತ್ರೋಕ್ತ ಸೇವೆ • ತ್ರ್ಯಂಬಕೇಶ್ವರ ಕ್ಷೇತ್ರದ ಅಧಿಕೃತ ವತನ್‌ದಾರ್ ಪುರೋಹಿತರು',
    traditionDesc:
      'ನಾವು ಶ್ರೀ ಕ್ಷೇತ್ರ ತ್ರ್ಯಂಬಕೇಶ್ವರದ ವಂಶಪಾರಂಪರ್ಯ ವತನ್‌ದಾರ್ ತೀರ್ಥ ಪುರೋಹಿತರು. ಛತ್ರಪತಿ ಶಿವಾಜಿ ಮಹಾರಾಜರ ಕಾಲದಿಂದ ನಮ್ಮ ಕುಟುಂಬಕ್ಕೆ ಸಂಪೂರ್ಣ ತ್ರ್ಯಂಬಕೇಶ್ವರ ಗ್ರಾಮದ ಧಾರ್ಮಿಕ ವತನ್ (ಪಾರಂಪರಿಕ ಅಧಿಕಾರ) ದೊರೆತಿದ್ದು, ಅಂದಿನಿಂದ ಇಲ್ಲಿನ ಎಲ್ಲಾ ಧಾರ್ಮಿಕ ವಿಧಿ-ವಿಧಾನಗಳು ನಮ್ಮ ಕೈಯಿಂದಲೇ ಸಂಪನ್ನಗೊಳ್ಳುತ್ತಿವೆ. ಕಳೆದ 25 ತಲೆಮಾರುಗಳಿಂದ ನಾವು ಸೇವೆ ಸಲ್ಲಿಸುತ್ತಿದ್ದೇವೆ. ನಾರಾಯಣ ನಾಗಬಲಿ, ಕಾಲಸರ್ಪ ಶಾಂತಿ, ತ್ರಿಪಿಂಡಿ ಶ್ರಾದ್ಧ, ಮಹಾಮೃತ್ಯುಂಜಯ ಜಪ ಮತ್ತು ಹವನ, ಲಘುರುದ್ರ, ರುದ್ರಾಭಿಷೇಕ, ಮಹಾಅಭಿಷೇಕ, ಮಹಾರುದ್ರ, ಗ್ರಹ ನಕ್ಷತ್ರ ಶಾಂತಿ, ವಾಸ್ತು ಶಾಂತಿ, ನವಚಂಡೀ ಯಾಗ, ಗಣೇಶ ಯಾಗ, ಉದಕ ಶಾಂತಿ ಮೊದಲಾದ ಎಲ್ಲಾ ಪೂಜೆಗಳನ್ನು ಶಾಸ್ತ್ರೋಕ್ತವಾಗಿ ನಾವೇ ನಿರ್ವಹಿಸುತ್ತೇವೆ.',
    traditionPill1: 'ಶಿವಾಜಿ ಮಹಾರಾಜರ ಕಾಲದ ವತನ್',
    traditionPill2: '25 ತಲೆಮಾರುಗಳ ಪವಿತ್ರ ಪರಂಪರೆ',
    traditionPillar1Title: 'ಐತಿಹಾಸಿಕ ವತನ್ ಮತ್ತು 25 ತಲೆಮಾರುಗಳ ಪರಂಪರೆ',
    traditionPillar1Desc:
      'ಛತ್ರಪತಿ ಶಿವಾಜಿ ಮಹಾರಾಜರ ಕಾಲದಿಂದ ತ್ರ್ಯಂಬಕೇಶ್ವರ ಗ್ರಾಮದ ಧಾರ್ಮಿಕ ವತನ್ ನಮ್ಮ ಕುಲದಲ್ಲಿದ್ದು 25 ತಲೆಮಾರುಗಳಿಂದ ಸೇವೆ ಸಲ್ಲಿಸುತ್ತಿದ್ದೇವೆ.',
    traditionPillar2Title: 'ಎಲ್ಲಾ ಪ್ರಮುಖ ವಿಧಿಗಳು, ಶಾಂತಿಗಳು ಮತ್ತು ಮಹಾಯಾಗಗಳು',
    traditionPillar2Desc:
      'ನಾರಾಯಣ ನಾಗಬಲಿ, ಕಾಲಸರ್ಪ ಶಾಂತಿ, ತ್ರಿಪಿಂಡಿ ಶ್ರಾದ್ಧ, ಮಹಾಮೃತ್ಯುಂಜಯ ಜಪ-ಹವನ, ರುದ್ರಾಭಿಷೇಕ, ಲಘುರುದ್ರ, ಮಹಾರುದ್ರ, ವಾಸ್ತು ಶಾಂತಿ, ನವಚಂಡೀ ಯಾಗ, ಉದಕ ಶಾಂತಿ.',
    traditionPillar3Title: 'ವತನ್‌ದಾರ್ ಪುರೋಹಿತರಿಂದ ನೇರ ಅನುಷ್ಠಾನ',
    traditionPillar3Desc:
      'ಮಧ್ಯವರ್ತಿಗಳಿಲ್ಲದೆ ಸಾಂಪ್ರದಾಯಿಕ ವೈದಿಕ ಪುರೋಹಿತರಿಂದ ನೇರ ಸಂಕಲ್ಪ ಮತ್ತು ಶಾಸ್ತ್ರೋಕ್ತ ನೆರವೇರಿಕೆ.',

    sacredPlacesSubtitle:
      'ಕುಶಾವರ್ತ ಕುಂಡ, ಬ್ರಹ್ಮಗಿರಿ ಪರ್ವತ ಮತ್ತು ಪವಿತ್ರ ತೀರ್ಥಗಳನ್ನು ಸಂದರ್ಶಿಸಿ ನಿಮ್ಮ ತೀರ್ಥಯಾತ್ರೆಯನ್ನು ಸಾರ್ಥಕಗೊಳಿಸಿ.',
    sacredPlacesExploreBtn: 'ವಿವರ ನೋಡಿ',
    sacredPlacesDistancePrefix: 'ದೇವಸ್ಥಾನದಿಂದ ದೂರ',

    storySubtitle:
      'ಗೌತಮ ಮಹರ್ಷಿಗಳ ತಪಸ್ಸು, ಗೋಹತ್ಯಾ ದೋಷ ನಿವಾರಣೆ ಮತ್ತು ಪರಮಶಿವನು ಗೋದಾವರಿಯನ್ನು ಭೂಮಿಗೆ ಅನುಗ್ರಹಿಸಿದ ಪಾವನ ಪುರಾಣ ಕಥೆ.',
    storyPuranaLore: 'ಪೌರಾಣಿಕ ಪರಂಪರೆ',
    storyChapterPrefix: 'ಅಧ್ಯಾಯ',
    storyPrevBtn: 'ಹಿಂದಿನ ಅಧ್ಯಾಯ',
    storyNextBtn: 'ಮುಂದಿನ ಅಧ್ಯಾಯ',

    festivalsTitle: 'ತ್ರ್ಯಂಬಕೇಶ್ವರದ ಪವಿತ್ರ ಉತ್ಸವಗಳು',
    festivalsSubtitle:
      'ಸಿಂಹಸ್ಥ ಕುಂಭಮೇಳ, ಮಹಾಶಿವರಾತ್ರಿ ಮತ್ತು ಶ್ರಾವಣ ಸೋಮವಾರಗಳ ಭವ್ಯ ಉತ್ಸವಗಳಲ್ಲಿ ಭಕ್ತಿಪೂರ್ವಕವಾಗಿ ಭಾಗವಹಿಸಿ.',
    festivalsSignificanceLabel: 'ಆಧ್ಯಾತ್ಮಿಕ ಮಹತ್ವ:',

    darshanSubtitle:
      'ಸುಲಭ ದರ್ಶನಕ್ಕಾಗಿ ದೇವಾಲಯದ ಸಮಯ, ಆರತಿ ವೇಳಾಪಟ್ಟಿ, ವಸ್ತ್ರಸಂಹಿತೆ ಮತ್ತು ಗರ್ಭಗುಡಿಯ ನಿಯಮಗಳ ಸಮಗ್ರ ವಿವರ.',
    darshanTabTimings: 'ದರ್ಶನ ಮತ್ತು ಆರತಿ ಸಮಯ',
    darshanTabGuidelines: 'ವಸ್ತ್ರಸಂಹಿತೆ ಮತ್ತು ನಿಯಮಗಳು',
    darshanDailySchedule: 'ದೈನಂದಿನ ದೇವಾಲಯ ಸಮಯ',
    darshanTempleGates: 'ದೇವಾಲಯ ತೆರೆಯುವ ಸಮಯ: ಮುಂಜಾನೆ 05:30 ರಿಂದ ರಾತ್ರಿ 09:00 ವರೆಗೆ',
    darshanMondayTitle: 'ವಿಶೇಷ ಸೋಮವಾರ ಸುವರ್ಣ ಕಿರೀಟ ದರ್ಶನ',
    darshanMondayDesc:
      'ಪ್ರತಿ ಸೋಮವಾರ ಸಂಜೆ 07:00 ರಿಂದ 08:30 ರವರೆಗೆ ಜ್ಯೋತಿರ್ಲಿಂಗಕ್ಕೆ ಐತಿಹಾಸಿಕ ಚಿನ್ನದ ಕಿರೀಟವನ್ನು ತೊಡಿಸಲಾಗುತ್ತದೆ ಮತ್ತು ಪಲ್ಲಕ್ಕಿ ಉತ್ಸವ ನಡೆಯುತ್ತದೆ.',
    darshanDressMen: 'ಪುರುಷರು: ಗರ್ಭಗುಡಿ ಸ್ಪರ್ಶ ದರ್ಶನಕ್ಕೆ ಧೋತಿ ಮತ್ತು ಶಲ್ಯ ಕಡ್ಡಾಯ.',
    darshanDressWomen: 'ಮಹಿಳೆಯರು: ಸೀರೆ ಅಥವಾ ದುಪಟ್ಟಾ ಇರುವ ಚೂಡಿದಾರ್.',
    darshanRulesTitle: 'ಗರ್ಭಗುಡಿ ನಿಯಮಗಳು',

    reachSubtitle: 'ನಾಸಿಕ್, ಮುಂಬೈ ಮತ್ತು ಪುಣೆಯಿಂದ ರಸ್ತೆ, ರೈಲು ಮತ್ತು ವಿಮಾನ ಮಾರ್ಗಗಳ ಮೂಲಕ ಸುಲಭವಾಗಿ ತಲುಪಬಹುದು.',
    reachRoadTitle: 'ರಸ್ತೆ ಮಾರ್ಗ (ಹೆದ್ದಾರಿ)',
    reachRoadDesc: 'ನಾಸಿಕ್‌ನಿಂದ ತ್ರ್ಯಂಬಕೇಶ್ವರಕ್ಕೆ 28 ಕಿ.ಮೀ. 4-ಪಥದ ಸುಸಜ್ಜಿತ ರಸ್ತೆ (NH-848).',
    reachRoadNote: 'ನಾಸಿಕ್ ಸಿಬಿಎಸ್ ಬಸ್ ನಿಲ್ದಾಣದಿಂದ ಪ್ರತಿ 15 ನಿಮಿಷಕ್ಕೆ ಬಸ್‌ಗಳು ಮತ್ತು ಟ್ಯಾಕ್ಸಿಗಳು ಲಭ್ಯ.',
    reachTrainTitle: 'ರೈಲು ಮಾರ್ಗ',
    reachTrainDesc: 'ನಾಸಿಕ್ ರೋಡ್ ರೈಲ್ವೆ ನಿಲ್ದಾಣವು (NK) ಪ್ರಮುಖ ಜಂಕ್ಷನ್ ಆಗಿದೆ (38 ಕಿ.ಮೀ.).',
    reachTrainNote: 'ವಂದೇ ಭಾರತ್, ಪಂಚವಟಿ, ತಪೋವನ್ ಎಕ್ಸ್‌ಪ್ರೆಸ್ ಮುಂಬೈಗೆ ನೇರ ಸಂಪರ್ಕ ಒದಗಿಸುತ್ತವೆ.',
    reachAirTitle: 'ವಿಮಾನ ಮಾರ್ಗ',
    reachAirDesc: 'ನಾಸಿಕ್ ಓಜರ್ ವಿಮಾನ ನಿಲ್ದಾಣ (50 ಕಿ.ಮೀ.) ಮತ್ತು ಮುಂಬೈ ಅಂತಾರಾಷ್ಟ್ರೀಯ ವಿಮಾನ ನಿಲ್ದಾಣ (175 ಕಿ.ಮೀ.).',
    reachAirNote: 'ವಿಮಾನ ನಿಲ್ದಾಣದಿಂದ ತ್ರ್ಯಂಬಕಕ್ಕೆ 24 ಗಂಟೆಗಳ ಟ್ಯಾಕ್ಸಿ ಸೇವೆ ಲಭ್ಯವಿದೆ.',

    reviewsNative: 'ಭಕ್ತರ ಅನುಭವಗಳು',
    reviewsTitle: 'ಶ್ರದ್ಧಾಳುಗಳ ಪವಿತ್ರ ಅನುಭವಗಳು',
    reviewsSubtitle: 'ದರ್ಶನ ಮತ್ತು ವೈದಿಕ ಪೂಜಾ ವಿಧಿಗಳನ್ನು ಪೂರೈಸಿದ ನಂತರ ಭಕ್ತರು ಹಂಚಿಕೊಂಡ ಅಭಿಪ್ರಾಯಗಳು.',
    reviewsNote: '* ಮಹಾರಾಷ್ಟ್ರ, ಕರ್ನಾಟಕ, ಗುಜರಾತ್ ಹಾಗೂ ಭಾರತದಾದ್ಯಂತದ ಭಕ್ತ ಕುಟುಂಬಗಳ ಸತ್ಯಾನುಭವಗಳು.',

    faqSubtitle: 'ಪೂಜಾ ಸಿದ್ಧತೆ, ವಾಸ್ತವ್ಯ, ಬೇಕಾಗುವ ದಿನಗಳು ಮತ್ತು ದೇವಾಲಯದ ನಿಯಮಗಳ ಕುರಿತು ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೋತ್ತರಗಳು.',
  },

  // ==========================================
  // TAMIL (தமிழ்)
  // ==========================================
  ta: {
    introBadgeBrahmagiriTitle: 'பிரம்मागಿರಿ',
    introBadgeBrahmagiriDesc: '1,295 மீ. சிகரம்',
    introBadgeKushavartaTitle: 'குஷாவர்த்தம்',
    introBadgeKushavartaDesc: 'புனித நீராடல் குளம்',
    introBadgeHemadpanthiTitle: 'ஹேமத்பந்தி',
    introBadgeHemadpanthiDesc: 'கருங்கற்கோயில் கலை',
    introQuoteText:
      '"திரிம்பகேஷ்வரம் மகாராஷ்டிராவின் புனிதத்தலமாகும், இங்கு மும்மூர்த்தி ஜோதிர்லிங்கம் அருள்பಾಲிக்கிறது. பிரம்மாகிரியிலிருந்து தோன்றும் கோதாவரியும் குஷாவர்த்த தீர்த்தமும் பக்தர்களுக்கு மன அமைதியைத் தருகின்றன."',
    introQuoteAuthor: 'சனாதன பாரம்பரியம் • கோதாவரி மகாத்மியம்',
    introCardTag: 'புனிதப் பாரம்பரியம்',
    introCardTitle: 'குஷாவர்த்த தீர்த்தம் & திரிம்பகேஷ்வரர்',
    introCardDesc: 'கௌதம முனிவரால் வழிபடப்பட்ட புனித தீர்த்தம், இங்கிருந்தே தென்னக கங்கை கோதாவரி பாரதமெங்கும் பாய்கிறது.',

    jyotirlingaTrinityRudra: 'ஸ்ரீமகேஸ்வரர் (ருத்ரன்)',
    jyotirlingaTrinityBrahma: 'ஸ்ரீபிரம்மா (படைப்பவர்)',
    jyotirlingaTrinityVishnu: 'ஸ்ரீவிஷ்ணு (காப்பவர்)',
    jyotirlingaFeature1Title: 'தனித்துவ மும்மூர்த்தி வடிவம்',
    jyotirlingaFeature1Desc:
      'மற்ற அனைத்து பதினொரு ஜோதிர்லிங்கங்களிலும் சிவபெருமான் தனித்த லிங்கமாக வழிபடப்படுகிறார். திரிம்பகேஷ்வரில் மட்டுமே ஒரே பீடத்தில் பிரம்மா, விஷ்ணு, ருத்ரன் மூவரும் கட்டைவிரல் அளவிலான லிங்கங்களாகக் காட்சியளிக்கின்றனர்.',
    jyotirlingaFeature2Title: 'வரலாற்றுச் சிறப்புமிக்க தங்கக் கிரீடம்',
    jyotirlingaFeature2Desc:
      'கருவறையில் பாண்டவர் மற்றும் பேஷ்வா காலத்து நவரத்தினங்கள் பதித்த தங்கக் கிரீடம் உள்ளது. ஒவ்வொரு திங்கட்கிழமையும் மாலையில் இக்கீரிடத்தால் ஜோதிர்லிங்கத்திற்கு அலங்காரம் செய்யப்படுகிறது.',
    jyotirlingaFeature3Title: 'இடைவிடாத புனித நீர்த்தாரை',
    jyotirlingaFeature3Desc:
      'கருவறையில் உள்ள லிங்கங்களின் மீது இயற்கையான குளிர்ந்த நீர் எப்போதும் சுரந்து கொண்டிருக்கிறது, இது கோதாவரி அன்னை சிவபெருமானுக்குச் செய்யும் நித்திய அபிஷேகமாகும்.',

    shlokaMeaningTitle: 'பொருள் & சாஸ்திர மகிமை',
    shlokaMeaningText:
      'நறுமணம் கொண்டவரும், உலக உயிர்களைக் காப்பவருமான முக்கண் சிவபெருமானை வணங்குகிறோம். முதிர்ந்த வெள்ளரி எவ்வாறு கொடியிலிருந்து எளிதாக விடுபடுகிறதோ, அவ்வாறே அவர் நம்மை மரண பயத்திலிருந்தும் பிறவிப் பிணியிலிருந்தும் விடுவித்து முக்தியருளட்டும்.',
    shlokaPraise: 'ரிக்வேதத்தின் (7.59.12) மகா மிருத்யுஞ்சய மந்திரம்',

    pujaDurationLabel: 'நேரம்',
    pujaSamagriLabel: 'பூஜைப் பொருட்கள்',
    pujaSamagriVal: 'குருஜி ஏற்பாடு செய்வார்',
    pujaDetailsBtn: 'விவரம் காண்க',
    pujaBookBtn: 'பூஜை முன்பதிவு',
    pujaNames: {
      'narayan-nagbali': {
        name: 'நாராயண நாகபலி',
        desc: 'பித்ரு தோஷ நிவர்த்தி மற்றும் முன்னோர்களின் ஆத்மசாந்திக்கான கருட புராண வழிபாட்டு முறை.',
        duration: '3 நாட்கள் (முழு பூஜை)',
      },
      'tripindi-shraddha': {
        name: 'திரிபிண்டி ஷ்ராத்தம்',
        desc: 'மூன்று தலைமுறை முன்னோர்களின் ஆன்ம அமைதிக்கான சாஸ்திரோக்த பித்ரு தர்ப்பணம்.',
        duration: '1 நாள் (சுமார் 3-4 மணி நேரம்)',
      },
      'kaal-sarp-shanti': {
        name: 'காலசர்ப்ப யோக சாந்தி',
        desc: 'ஜோதிட கிரக தோஷ நிவர்த்திக்காக சிவபெருமான் சந்நிதியில் செய்யப்படும் சாந்தி பூஜை.',
        duration: '1 நாள் (சுமார் 2.5-3 மணி நேரம்)',
      },
      'kumbh-vivah': {
        name: 'கும்ப விவாகம்',
        desc: 'திருமண தோஷ நிவர்த்திக்கான சாஸ்திரோக்த கலச பிரதிஷ்டை சடங்கு.',
        duration: '1 நாள் (சுமார் 2 மணி நேரம்)',
      },
      'maha-mrityunjaya': {
        name: 'மகா மிருத்யுஞ்சய ஜபம்',
        desc: 'ஆயுள் பலம், உடல் நலம் மற்றும் தடைகள் நீங்க வேத மந்திர ஜப அனுஷ்டானம்.',
        duration: '1 முதல் 3 நாட்கள்',
      },
      rudrabhishek: {
        name: 'லகு ருத்ரம் / ருத்ராபிஷேகம்',
        desc: 'பஞ்சாமிர்தம் மற்றும் கோதாவரி தீர்த்தத்துடன் ருத்ர சூக்தத்தால் சிவனுக்கு அபிஷேகம்.',
        duration: '2 மணி நேரம்',
      },
    },

    step1Desc: 'சாஸ்திரோக்த பூஜையைத் தேர்வுசெய்க',
    step2Desc: 'சுப முகூர்த்தம் & தேதியைத் தேர்வுசெய்க',
    step3Desc: 'அங்கீகரிக்கப்பட்ட புரோகிதரைத் தேர்வுசெய்க',
    step4Desc: 'கோத்ரம் & யஜமானர் விவரங்களைப் பூர்த்திசெய்க',
    step5Desc: 'உடனடி முன்பதிவுச் சான்றிதழ் பெறுக',
    trustBadge1: 'எளிமையானது & வெளிப்படையானது',
    trustBadge2: 'அங்கீகரிக்கப்பட்ட திரிம்பக் புரோகிதர்கள்',
    trustBadge3: 'மறைமுகக் கட்டணங்கள் இல்லை',

    gurujiLanguagesLabel: 'மொழிகள்:',
    gurujiSpecialtiesLabel: 'பூஜை சிறப்புகள்:',
    gurujiBookVidhiBtn: 'பூஜை முன்பதிவு',

    traditionBadge: '॥ 25 தலைமுறைகளாகத் தொடரும் வதன்தார் தீர்த்த புரோகிதர் பரம்பரை ॥',
    traditionTitle: 'சத்ரபதி சிவாஜி மகாராஜாவின் காலத்திலிருந்து வழங்கப்பட்ட வரலாற்று வதன்',
    traditionSub: '25 தலைமுறைகளின் சாஸ்திரோக்த சேவை • திரியம்பகேஸ்வரத்தின் பாரம்பரிய உரிமை பெற்ற புரோகிதர்கள்',
    traditionDesc:
      'நாங்கள் ஸ்ரீ க்ஷேத்ர திரியம்பகேஸ்வரத்தின் பரம்பரை வதன்தார் தீர்த்த புரோகிதர்கள் ஆவோம். சத்ரபதி சிவாஜி மகாராஜாவின் காலத்திலிருந்து எங்கள் குடும்பத்திற்கு முழு திரியம்பகேஸ்வர கிராமத்தின் வரலாற்று வதன் (ஆன்மீக உரிமை) வழங்கப்பட்டுள்ளது, அன்று முதல் இத்தலத்தின் அனைத்து ஆன்மீகச் சடங்குகளும் எங்கள் கைகளாலேயே நடத்தப்படுகின்றன. கடந்த 25 தலைமுறைகளாக நாங்கள் தொடர்ந்து சேவை செய்து வருகிறோம். நாராயண நாகபலி, காலசர்ப்ப சாந்தி, திரிபிண்டி சிராத்தம், மகா மிருத்யுஞ்சய ஜபம் & ஹவனம், லகு ருத்ர, ருத்ராபிஷேகம், மகாபிஷேகம், மகாருத்ர, கிரக நட்சத்திர சாந்தி, வாஸ்து சாந்தி, நவசண்டி யாகம், கணேச யாகம், உதக சாந்தி போன்ற அனைத்து சடங்குகளும் சாஸ்திர முறைப்படி எங்களால் நேரடியாக நடத்தப்படுகின்றன.',
    traditionPill1: 'சிவாஜி மகாராஜா காலத்து வதன்',
    traditionPill2: '25 தலைமுறைப் புனித பாரம்பரியம்',
    traditionPillar1Title: 'வரலாற்று வதன் மற்றும் 25 தலைமுறை மரபு',
    traditionPillar1Desc:
      'சத்ரபதி சிவாஜி மகாராஜாவின் காலத்திலிருந்து திரியம்பகேஸ்வர கிராமத்தின் ஆன்மீக வதன் பெற்று 25 தலைமுறைகளாகச் சேவை புரிகிறோம்.',
    traditionPillar2Title: 'அனைத்து வேத சாந்திகள் & மகாயாகங்கள்',
    traditionPillar2Desc:
      'நாராயண நாகபலி, காலசர்ப்ப சாந்தி, திரிபிண்டி சிராத்தம், மகா மிருத்யுஞ்சய ஜபம், ருத்ராபிஷேகம், லகு ருத்ர, மகாருத்ர, வாஸ்து சாந்தி, நவசண்டி யாகம், உதக சாந்தி.',
    traditionPillar3Title: 'நேரடி பாரம்பரிய புரோகிதர் வழிகாட்டல்',
    traditionPillar3Desc:
      'இடைத்தரகர்கள் இன்றி பாரம்பரிய சான்றளிக்கப்பட்ட புரோகிதர்களால் வேத முறைப்படி நடத்தப்படும் தூய சங்கல்பம்.',

    sacredPlacesSubtitle:
      'குஷாவர்த்த குளம், பிரம்மாகிரி மலை மற்றும் புனித தலங்களைத் தரிசித்து உங்கள் புனிதப் பயணத்தை முழுமையாக்குங்கள்.',
    sacredPlacesExploreBtn: 'விவரம் காண்க',
    sacredPlacesDistancePrefix: 'கோயிலிலிருந்து தூரம்',

    storySubtitle:
      'கௌதம முனிவரின் கடும் தவம், பசுவதைத் தோஷ நிவர்த்தி மற்றும் சிவபெருமான் கோதாவரியை பூமிக்கு அருளிய புராண வரலாறு.',
    storyPuranaLore: 'புராணப் பாரம்பரியம்',
    storyChapterPrefix: 'அத்தியாயம்',
    storyPrevBtn: 'முந்தைய அத்தியாயம்',
    storyNextBtn: 'அடுத்த அத்தியாயம்',

    festivalsTitle: 'திரிம்பகேஷ்வர திருவிழாக்கள்',
    festivalsSubtitle:
      'சிம்ஹஸ்த கும்பமேளா, மகாசிவராத்திரி மற்றும் கார்த்திகை தீப பெருவிழாக்களில் பக்தியுடன் பங்கேற்கவும்.',
    festivalsSignificanceLabel: 'ஆன்மீக முக்கியத்துவம்:',

    darshanSubtitle:
      'எளிதான தரிசனத்திற்கு கோயில் திறக்கும் நேரம், ஆரத்தி அட்டவணை, ஆடைக்கட்டுப்பாடு மற்றும் கருவறை விதிகள்.',
    darshanTabTimings: 'தரிசனம் & ஆரத்தி நேரங்கள்',
    darshanTabGuidelines: 'ஆடைக்கட்டுப்பாடு & விதிகள்',
    darshanDailySchedule: 'தினசரி கோயில் நேர அட்டவணை',
    darshanTempleGates: 'கோயில் நடை திறப்பு: காலை 05:30 முதல் இரவு 09:00 வரை',
    darshanMondayTitle: 'திங்கட்கிழமை சிறப்பு தங்கக் கிரீட தரிசனம்',
    darshanMondayDesc:
      'ஒவ்வொரு திங்கட்கிழமையும் மாலை 07:00 முதல் 08:30 வரை ஜோதிர்லிங்கத்திற்கு வரலாற்றுச் சிறப்புமிக்க தங்கக் கிரீடம் சாத்தப்பட்டு பல்லக்கு ஊர்வலம் நடைபெறும்.',
    darshanDressMen: 'ஆண்கள்: கருவறை ஸ்பரிச தரிசனத்திற்கு வேட்டி மற்றும் மேலாடை கட்டாயம்.',
    darshanDressWomen: 'பெண்கள்: புடவை அல்லது துப்பட்டாவுடன் கூடிய சுடிதார்.',
    darshanRulesTitle: 'கருவறை ஒழுங்குமுறைகள்',

    reachSubtitle: 'நாசிக், மும்பை மற்றும் புனேவிலிருந்து சாலை, ரயில் மற்றும் விமான வழிகளில் திரிம்பகேஷ்வரத்தை எளிதில் அடையலாம்.',
    reachRoadTitle: 'சாலை வழி (நெடுஞ்சாலை)',
    reachRoadDesc: 'நாசிக்கிலிருந்து திரிம்பகேஷ்வரத்திற்கு 28 கி.மீ. 4-வழிப் பாதை (NH-848).',
    reachRoadNote: 'நாசிக் சிபிஎஸ் பேருந்து நிலையத்திலிருந்து 15 நிமிடங்களுக்கு ஒருமுறை பேருந்துகள் மற்றும் டாக்சிகள் உண்டு.',
    reachTrainTitle: 'ரயில் வழி',
    reachTrainDesc: 'நாசிக் ரோடு ரயில் நிலையம் (NK) அருகிலுள்ள முக்கிய சந்திப்பாகும் (38 கி.மீ.).',
    reachTrainNote: 'வந்தே பாரத், பஞ்சவடி, தபோவன் எக்ஸ்பிரஸ் ரயில்கள் மும்பையுடன் இணைக்கின்றன.',
    reachAirTitle: 'விமான வழி',
    reachAirDesc: 'நாசிக் ஓஜர் விமான நிலையம் (50 கி.மீ.) & மும்பை சர்வதேச விமான நிலையம் (175 கி.மீ.).',
    reachAirNote: 'விமான நிலையத்திலிருந்து திரிம்பக்கிற்கு 24 மணி நேர டாக்ஸி சேவை உள்ளது.',

    reviewsNative: 'பக்தர்களின் அனுபவங்கள்',
    reviewsTitle: 'பக்தர்களின் புனித அனுபவங்கள்',
    reviewsSubtitle: 'தரிசனம் மற்றும் சாஸ்திரோக்த பூஜைகள் நிறைவடைந்த பிறகு பக்தர்கள் பகிர்ந்த நெகிழ்ச்சியான கருத்துகள்.',
    reviewsNote: '* மகாராஷ்டிரம், தமிழ்நாடு, கர்நாடகம், குஜராத் உள்ளிட்ட அனைத்துப் பகுதி பக்தர்களின் அனுபவங்கள்.',

    faqSubtitle: 'பூஜை ஏற்பாடுகள், தங்குமிடம், தேவையான நாட்கள் மற்றும் கோயில் விதிகள் குறித்த பொதுவான கேள்விகள்.',
  },

  // ==========================================
  // BENGALI (বাংলা)
  // ==========================================
  bn: {
    introBadgeBrahmagiriTitle: 'ব্রহ্মগিরি',
    introBadgeBrahmagiriDesc: '১,২৯৫ মি. চূড়া',
    introBadgeKushavartaTitle: 'কুশাবর্ত',
    introBadgeKushavartaDesc: 'পবিত্র স্নান কুণ্ড',
    introBadgeHemadpanthiTitle: 'হেমাড়পন্থী',
    introBadgeHemadpanthiDesc: 'কৃষ্ণপ্রস্তর স্থাপত্য',
    introQuoteText:
      '"ত্র্যম্বকেশ্বর মহারাষ্ট্রের এক পরম পবিত্র তীর্থস্থান যেখানে ত্রিদেব জ্যোতির্লিঙ্গ অধিষ্ঠিত। ব্রহ্মগিরি থেকে উৎপন্ন গোদাবরী ও কুশাবর্ত তীর্থ ভক্তদের হৃদয়ে গভীর শান্তি প্রদান করে।"',
    introQuoteAuthor: 'সনাতন ঐতিহ্য • গোদাবরী মাহাত্ম্য',
    introCardTag: 'পবিত্র ঐতিহ্য',
    introCardTitle: 'কুশাবর্ত তীর্থ ও শ্রী ত্র্যম্বকেশ্বর',
    introCardDesc: 'গৌতম ঋষি দ্বারা প্রতিষ্ঠিত পবিত্র কুণ্ড, যেখান থেকে দক্ষিণ গঙ্গা গোদাবরী সমগ্র ভারতে প্রবাহিত হয়।',

    jyotirlingaTrinityRudra: 'শ্রীমহেশ্বর (রুদ্র)',
    jyotirlingaTrinityBrahma: 'শ্রীব্রহ্মা (সৃষ্টিকর্তা)',
    jyotirlingaTrinityVishnu: 'শ্রীবিষ্ণু (পালনকর্তা)',
    jyotirlingaFeature1Title: 'অনন্য ত্রিদেব স্বরূপ',
    jyotirlingaFeature1Desc:
      'অন্যান্য এগারোটি জ্যোতির্লিঙ্গে কেবল শিবের একক লিঙ্গ পূজিত হয়। একমাত্র ত্র্যম্বকেশ্বরেই একই গহ্বরে ব্রহ্মা, বিষ্ণু ও মহেশ্বর তিন দেব অঙ্গুষ্ঠ আকারের লিঙ্গরূপে বিরাজমান।',
    jyotirlingaFeature2Title: 'ঐতিহাসিক স্বর্ণমুকুট দর্শন',
    jyotirlingaFeature2Desc:
      'গর্ভগৃহে পাণ্ডব ও পেশোয়া আমলের রত্নখচিত স্বর্ণমুকুট সুরক্ষিত রয়েছে যাতে হীরা, মাণিক ও পান্না খচিত। প্রতি সোমবার সন্ধ্যায় এই মুকুট জ্যোতির্লিঙ্গে পরানো হয়।',
    jyotirlingaFeature3Title: 'অবিরাম পবিত্র জলধারা',
    jyotirlingaFeature3Desc:
      'গর্ভগৃহে তিনটি লিঙ্গের ওপর প্রাকৃতিকভাবে সর্বদা শীতল জলধারা ঝরে পড়ে, যা গোদাবরী মাতা কর্তৃক মহাদেবকে অর্পিত নিরন্তর জলাভিষেকের প্রতীক।',

    shlokaMeaningTitle: 'অর্থ ও শাস্ত্র মাহাত্ম্য',
    shlokaMeaningText:
      'আমরা ত্রিনেত্রধারী, সুগন্ধযুক্ত ও সর্বজীবের পালনকর্তা ভগবান শিবের উপাসনা করি। যেভাবে পাকা শসা লতা থেকে অনায়াসে মুক্ত হয়, তেমনি তিনি আমাদের মৃত্যুভয় ও সংসারের বন্ধন থেকে মুক্ত করে অমৃতত্ব দান করুন।',
    shlokaPraise: 'ঋগ্বেদের (৭.৫৯.১২) পরম কল্যাণকারী মহামৃত্যুঞ্জয় মন্ত্র',

    pujaDurationLabel: 'সময়কাল',
    pujaSamagriLabel: 'বৈদিক সামগ্রী',
    pujaSamagriVal: 'গুরুজী ব্যবস্থা করবেন',
    pujaDetailsBtn: 'বিবরণ দেখুন',
    pujaBookBtn: 'পূজা বুক করুন',
    pujaNames: {
      'narayan-nagbali': {
        name: 'নারায়ণ নাগবলী',
        desc: 'পিতৃদোষ নিবারণ ও পূর্বপুরুষদের আত্মার শান্তির জন্য গরুড় পুরাণোক্ত পবিত্র বিধান।',
        duration: '৩ দিন (সম্পূর্ণ বিধি)',
      },
      'tripindi-shraddha': {
        name: 'ত্রিপিন্ডী শ্রাদ্ধ',
        desc: 'পূর্ববর্তী তিন প্রজন্মের পূর্বপুরুষদের সন্তুষ্টি ও পরিবারের সুখের জন্য বৈদিক শ্রাদ্ধ।',
        duration: '১ দিন (প্রায় ৩-৪ ঘণ্টা)',
      },
      'kaal-sarp-shanti': {
        name: 'কালসর্প যোগ শান্তি',
        desc: 'জ্যোতিষোক্ত গ্রহদোষ শান্তির জন্য মহাদেবের সান্নিধ্যে বিশেষ শান্তি পূজা।',
        duration: '১ দিন (প্রায় ২.৫-৩ ঘণ্টা)',
      },
      'kumbh-vivah': {
        name: 'কুম্ভ বিবাহ',
        desc: 'বিবাহের গ্রহদোষ মুক্তির জন্য শাস্ত্রসম্মত পবিত্র কলশ প্রতিষ্ঠা সংস্কার।',
        duration: '১ দিন (প্রায় ২ ঘণ্টা)',
      },
      'maha-mrityunjaya': {
        name: 'মহামৃত্যুঞ্জয় জপ',
        desc: 'দীর্ঘায়ু, সুস্বাস্থ্য ও সঙ্কট নিবারণের জন্য বৈদিক মন্ত্রানুষ্ঠান।',
        duration: '১ থেকে ৩ দিন',
      },
      rudrabhishek: {
        name: 'লঘুরুদ্র / রুদ্রাভিষেক',
        desc: 'পঞ্চামৃত ও গোদাবরী জল সহযোগে রুদ্রসূক্ত দ্বারা মহাদেবের পবিত্র অভিষেক।',
        duration: '২ ঘণ্টা',
      },
    },

    step1Desc: 'শাস্ত্রীয় পূজা নির্বাচন করুন',
    step2Desc: 'শুভ মুহূর্ত ও তারিখ ঠিক করুন',
    step3Desc: 'প্রমাণিত পুরোহিত নির্বাচন করুন',
    step4Desc: 'গোত্র ও যজমানের তথ্য প্রদান করুন',
    step5Desc: 'তাৎক্ষণিক বুকিং কনফার্মেশন পান',
    trustBadge1: 'সহজ ও স্বচ্ছ',
    trustBadge2: 'প্রমাণিত ত্র্যম্বক পুরোহিত',
    trustBadge3: 'কোনো গোপন ফি নেই',

    gurujiLanguagesLabel: 'ভাষা:',
    gurujiSpecialtiesLabel: 'পূজা বৈশিষ্ট্য:',
    gurujiBookVidhiBtn: 'পূজা বুক করুন',

    traditionBadge: '॥ ২৫ প্রজন্মের ঐতিহ্যবাহী ওয়াতনদার তীর্থ পুরোহিত পরম্পরা ॥',
    traditionTitle: 'ছত্রপতি শিবাজী মহারাজের সময় থেকে প্রাপ্ত ঐতিহাসিক ওয়াতন',
    traditionSub: '২৫ প্রজন্মের নিরবচ্ছিন্ন শাস্ত্রীয় সেবা • সমগ্র ত্র্যম্বকেশ্বর গ্রামের অনুমোদিত পুরোহিত',
    traditionDesc:
      'আমরা শ্রী ক্ষেত্র ত্র্যম্বকেশ্বরের বংশপরম্পরাগত ওয়াতনদার তীর্থ পুরোহিত। ছত্রপতি শিবাজী মহারাজের আমল থেকে আমাদের পরিবার সমগ্র ত্র্যম্বকেশ্বর গ্রামের ঐতিহাসিক ওয়াতন (ধর্মীয় অধিকার) লাভ করেছে, এবং তখন থেকেই এই তীর্থের সমস্ত ধর্মীয় কাজ নিজস্ব হাতে সম্পন্ন হয়। বিগত ২৫ প্রজন্ম ধরে আমরা নিরবচ্ছিন্নভাবে সেবা প্রদান করছি। নারায়ণ নাগবলি, কালসর্প শান্তি, ত্রিপিন্ডী শ্রাদ্ধ, মহামৃত্যুঞ্জয় জপ ও যজ্ঞ, লঘুরুদ্র, রুদ্রাভিষেক, মহাঅভিষেক, মহারুদ্র, গ্রহ নক্ষত্র শান্তি, বাস্তু শান্তি, নবচণ্ডী যাগ, গণেশ যাগ এবং উদক শান্তি সহ সমস্ত পূজা-অনুষ্ঠান শাস্ত্রীয়ভাবে সরাসরি আমাদের দ্বারা সম্পন্ন হয়।',
    traditionPill1: 'শিবাজী মহারাজ যুগের ওয়াতন',
    traditionPill2: '২৫ প্রজন্মের পবিত্র ঐতিহ্য',
    traditionPillar1Title: 'ঐতিহাসিক ওয়াতন ও ২৫ প্রজন্মের ঐতিহ্য',
    traditionPillar1Desc:
      'ছত্রপতি শিবাজী মহারাজের সময় থেকে ত্র্যম্বকেশ্বর গ্রামের পূর্ণ ধর্মীয় ওয়াতন আমাদের বংশে রয়েছে এবং ২৫ প্রজন্ম ধরে কাজ চলছে।',
    traditionPillar2Title: 'সমস্ত প্রধান বৈদিক শান্তি ও মহাযাগ',
    traditionPillar2Desc:
      'নারায়ণ নাগবলি, কালসর্প শান্তি, ত্রিপিন্ডী শ্রাদ্ধ, মহামৃত্যুঞ্জয় জপ ও যজ্ঞ, রুদ্রাভিষেক, লঘুরুদ্র, মহারুদ্র, বাস্তু শান্তি, নবচণ্ডী যাগ, উদক শান্তি।',
    traditionPillar3Title: 'অনুমোদিত পুরোহিতদের দ্বারা প্রত্যক্ষ বিধান',
    traditionPillar3Desc:
      'দালালমুক্ত পরিবেশে সরাসরি ওয়াতনদার পুরোহিতদের দ্বারা শুদ্ধ বৈদিক মন্ত্রোচ্চারণ ও শাস্ত্রীয় নিষ্ঠা।',

    sacredPlacesSubtitle:
      'কুশাবর্ত কুণ্ড, ব্রহ্মগিরি পর্বত ও পবিত্র তীর্থ দর্শন করে আপনার যাত্রা সার্থক করুন।',
    sacredPlacesExploreBtn: 'বিবরণ দেখুন',
    sacredPlacesDistancePrefix: 'মন্দির থেকে দূরত্ব',

    storySubtitle:
      'গৌতম মুনির কঠোর তপস্যা, গোবধ পাপমুক্তি এবং মহাদেবের জটা থেকে গোদাবরীর মর্তে অবতরণের পবিত্র পৌরাণিক ইতিহাস।',
    storyPuranaLore: 'পৌরাণিক ঐতিহ্য',
    storyChapterPrefix: 'অধ্যায়',
    storyPrevBtn: 'পূর্ববর্তী অধ্যায়',
    storyNextBtn: 'পরবর্তী অধ্যায়',

    festivalsTitle: 'ত্র্যম্বকেশ্বরের পবিত্র উৎসবসমূহ',
    festivalsSubtitle:
      'সিংহস্থ কুম্ভমেলা, মহাশিবরাত্রি এবং শ্রাবণ সোমবারের মহা সমারোহে ভক্তিভরে অংশ নিন।',
    festivalsSignificanceLabel: 'আধ্যাত্মিক তাৎপর্য:',

    darshanSubtitle:
      'সহজ দর্শনের জন্য মন্দিরের সময়সূচী, আরতি নির্ঘণ্ট, পোশাকের নিয়ম ও গর্ভগৃহের বিধিনিষেধ।',
    darshanTabTimings: 'দর্শন ও আরতির সময়সূচী',
    darshanTabGuidelines: 'পোশাকবিধি ও নিয়মাবলী',
    darshanDailySchedule: 'দৈনিক মন্দির সময়সূচী',
    darshanTempleGates: 'মন্দির খোলা: সকাল ০৫:৩০ থেকে রাত ০৯:০০',
    darshanMondayTitle: 'বিশেষ সোমবার স্বর্ণমুকুট দর্শন',
    darshanMondayDesc:
      'প্রতি সোমবার সন্ধ্যা ০৭:০০ থেকে ০৮:৩০ পর্যন্ত জ্যোতির্লিঙ্গে ঐতিহাসিক স্বর্ণমুকুট পরিধান করানো হয় এবং পালকি শোভাযাত্রা অনুষ্ঠিত হয়।',
    darshanDressMen: 'পুরুষ: গর্ভগৃহে স্পর্শ দর্শনের জন্য ধুতি ও উত্তরীয় বাধ্যতামূলক।',
    darshanDressWomen: 'মহিলা: শাড়ি বা ওড়না সহ সালোয়ার কামিজ।',
    darshanRulesTitle: 'গর্ভগৃহ নিয়মাবলী',

    reachSubtitle: 'নাসিক, মুম্বই এবং পুনে থেকে সড়ক, রেল ও আকাশপথে সহজেই ত্র্যম্বকেশ্বরে পৌঁছানো যায়।',
    reachRoadTitle: 'সড়ক পথ (হাইওয়ে)',
    reachRoadDesc: 'নাসিক থেকে ত্র্যম্বকেশ্বর ২৮ কিমি চার লেনের প্রশস্ত পথ (NH-848)।',
    reachRoadNote: 'নাসিক সিবিএস বাস টার্মিনাস থেকে প্রতি ১৫ মিনিটে বাস ও ট্যাক্সি উপলব্ধ।',
    reachTrainTitle: 'রেল পথ',
    reachTrainDesc: 'নাসিক রোড রেলওয়ে স্টেশন (NK) নিকটবর্তী প্রধান জংশন (৩৮ কিমি)।',
    reachTrainNote: 'বন্দে ভারত, পঞ্চবটী, তপোবন এক্সপ্রেস মুম্বই ও নাসিককে দ্রুত যুক্ত করে।',
    reachAirTitle: 'আকাশ পথ',
    reachAirDesc: 'নাসিক ওঝর বিমানবন্দর (৫০ কিমি) ও মুম্বই আন্তর্জাতিক বিমানবন্দর (১৭৫ কিমি)।',
    reachAirNote: 'বিমানবন্দর থেকে সরাসরি ত্র্যম্বকেশ্বরের জন্য ২৪ ঘণ্টা ট্যাক্সি সেবা উপলব্ধ।',

    reviewsNative: 'ভক্তদের অভিজ্ঞতা',
    reviewsTitle: 'শ্রদ্ধালু ভক্তদের পবিত্র অভিজ্ঞতা',
    reviewsSubtitle: 'দর্শন ও শাস্ত্রীয় পূজাবিধি সম্পন্ন করার পর ভক্তদের হৃদয়স্পর্শী অনুভূতি।',
    reviewsNote: '* পশ্চিমবঙ্গ, মহারাষ্ট্র, গুজরাট সহ সমগ্র ভারতের ভক্ত পরিবারের প্রতিক্রিয়া।',

    faqSubtitle: 'পূজার প্রস্তুতি, বাসস্থান, প্রয়োজনীয় দিন ও মন্দিরের নিয়ম সংক্রান্ত সাধারণ প্রশ্নোত্তর।',
  },

  // ==========================================
  // ODIA (ଓଡ଼ିଆ)
  // ==========================================
  or: {
    introBadgeBrahmagiriTitle: 'ବ୍ରହ୍ମଗିରି',
    introBadgeBrahmagiriDesc: '୧,୨୯୫ ମି. ଶିଖର',
    introBadgeKushavartaTitle: 'କୁଶାବର୍ତ୍ତ',
    introBadgeKushavartaDesc: 'ପବିତ୍ର ସ୍ନାନ କୁଣ୍ଡ',
    introBadgeHemadpanthiTitle: 'ହେମାଡପନ୍ଥୀ',
    introBadgeHemadpanthiDesc: 'କୃଷ୍ଣପ୍ରସ୍ତର ସ୍ଥାପତ୍ୟ',
    introQuoteText:
      '"ତ୍ର୍ୟମ୍ବକେଶ୍ୱର ମହାରାଷ୍ଟ୍ରର ଏକ ପରମ ପବିତ୍ର ତୀର୍ଥକ୍ଷେତ୍ର ଯେଉଁଠାରେ ତ୍ରିଦେବ ଜ୍ୟୋତିର୍ଲିଙ୍ଗ ବିରାଜମାନ। ବ୍ରହ୍ମଗିରିରୁ ଉତ୍ପନ୍ନ ଗୋଦାବରୀ ଓ କୁଶାବର୍ତ୍ତ ତୀର୍ଥ ଭକ୍ତମାନଙ୍କ ହୃଦୟକୁ ପରମ ଶାନ୍ତି ପ୍ରଦାନ କରେ।|"',
    introQuoteAuthor: 'ସନାତନ ପରମ୍ପରା • ଗୋଦାବରୀ ମାହାତ୍ମ୍ୟ',
    introCardTag: 'ପବିତ୍ର ଐତିହ୍ୟ',
    introCardTitle: 'କୁଶାବର୍ତ୍ତ ତୀର୍ଥ ଓ ଶ୍ରୀ ତ୍ର୍ୟମ୍ବକେଶ୍ୱର',
    introCardDesc: 'ଗୌତମ ଋଷିଙ୍କ ଦ୍ୱାରା ପ୍ରତିଷ୍ଠିତ ପବିତ୍ର କୁଣ୍ଡ, ଯେଉଁଠାରୁ ଦକ୍ଷିଣ ଗଙ୍ଗା ଗୋଦାବରୀ ସମଗ୍ର ଭାରତରେ ପ୍ରବାହିତ ହୁଅନ୍ତି।',

    jyotirlingaTrinityRudra: 'ଶ୍ରୀମହେଶ୍ୱର (ରୁଦ୍ର)',
    jyotirlingaTrinityBrahma: 'ଶ୍ରୀବ୍ରହ୍ମା (ସୃଷ୍ଟିକର୍ତ୍ତା)',
    jyotirlingaTrinityVishnu: 'ଶ୍ରୀବିଷ୍ଣୁ (ପାଳନକର୍ତ୍ତା)',
    jyotirlingaFeature1Title: 'ଅଦ୍ୱିତୀୟ ତ୍ରିମୂର୍ତ୍ତି ସ୍ୱରୂପ',
    jyotirlingaFeature1Desc:
      'ଅନ୍ୟ ସମସ୍ତ ଏକାଦଶ ଜ୍ୟୋତିର୍ଲିଙ୍ଗରେ କେବଳ ଶିବଙ୍କର ଏକକ ଲିଙ୍ଗ ପୂଜା ପାଆନ୍ତି। କେବଳ ତ୍ର୍ୟମ୍ବକେଶ୍ୱରରେ ହିଁ ଗୋଟିଏ ଗର୍ତ୍ତରେ ବ୍ରହ୍ମା, ବିଷ୍ଣୁ ଓ ରୁଦ୍ର ତିନି ଦେବତା ବୁଢ଼ାଆଙ୍ଗୁଠି ଆକାରର ଲିଙ୍ଗରୂପରେ ଏକତ୍ର ବିରାଜମାନ।',
    jyotirlingaFeature2Title: 'ଐତିହାସିକ ସୁବର୍ଣ୍ଣ ମୁକୁଟ ଦର୍ଶନ',
    jyotirlingaFeature2Desc:
      'ଗର୍ଭଗୃହରେ ପାଣ୍ଡବ ଓ ପେଶୱା କାଳର ରତ୍ନଖଚିତ ସ୍ୱର୍ଣ୍ଣ ମୁକୁଟ ସୁରକ୍ଷିତ ଅଛି। ପ୍ରତି ସୋମବାର ସନ୍ଧ୍ୟାରେ ଏହି ପବିତ୍ର ମୁକୁଟ ଜ୍ୟୋତିର୍ଲିଙ୍ଗରେ ପରିଧାନ କରାଯାଏ।',
    jyotirlingaFeature3Title: 'ଅବିରତ ପବିତ୍ର ଜଳଧାରା',
    jyotirlingaFeature3Desc:
      'ଗର୍ଭଗୃହରେ ତିନୋଟି ଲିଙ୍ଗ ଉପରେ ପ୍ରାକୃତିକ ଶୀତଳ ଜଳଧାରା ନିରନ୍ତର ଝରୁଥାଏ, ଯାହା ଗୋଦାବରୀ ମାତାଙ୍କ ଦ୍ୱାରା ମହାଦେବଙ୍କୁ ଅର୍ପିତ ଅଖଣ୍ଡ ଜଳାଭିଷେକର ପ୍ରତୀକ।',

    shlokaMeaningTitle: 'ଅର୍ଥ ଓ ଶାସ୍ତ୍ର ମାହାତ୍ମ୍ୟ',
    shlokaMeaningText:
      'ଆମେ ତ୍ରିନେତ୍ରଧାରୀ, ସୁଗନ୍ଧଯୁକ୍ତ ଏବଂ ସମସ୍ତ ପ୍ରାଣୀଙ୍କ ପାଳନକର୍ତ୍ତା ଭଗବାନ ଶିବଙ୍କୁ ଉପାସନା କରୁଛୁ। ଯେପରି ପାଚିଲା କାକୁଡ଼ି ଲତାରୁ ସହଜରେ ମୁକ୍ତ ହୁଏ, ସେହିପରି ସେ ଆମକୁ ମୃତ୍ୟୁଭୟ ଓ ସଂସାର ବନ୍ଧନରୁ ମୁକ୍ତ କରି ଅମୃତତ୍ୱ ପ୍ରଦାନ କରନ୍ତୁ।',
    shlokaPraise: 'ଋଗ୍‌ବେଦ (୭.୫୯.୧୨) ର ପରମ କଲ୍ୟାଣକାରୀ ମହାମୃତ୍ୟୁଞ୍ଜୟ ମନ୍ତ୍ର',

    pujaDurationLabel: 'ସମୟସୀମା',
    pujaSamagriLabel: 'ବୈଦିକ ସାମଗ୍ରୀ',
    pujaSamagriVal: 'ଗୁରୁଜୀ ବ୍ୟବସ୍ଥା କରିବେ',
    pujaDetailsBtn: 'ବିବରଣୀ ଦେଖନ୍ତୁ',
    pujaBookBtn: 'ପୂଜା ବୁକ୍ କରନ୍ତୁ',
    pujaNames: {
      'narayan-nagbali': {
        name: 'ନାରାୟଣ ନାଗବଳୀ',
        desc: 'ପିତୃଦୋଷ ନିବାରଣ ଓ ପୂର୍ବପୁରୁଷଙ୍କ ଆତ୍ମାର ଶାନ୍ତି ପାଇଁ ଗରୁଡ଼ ପୁରାଣୋକ୍ତ ପବିତ୍ର ବିଧାନ।',
        duration: '୩ ଦିନ (ସମ୍ପୂର୍ଣ୍ଣ ବିଧି)',
      },
      'tripindi-shraddha': {
        name: 'ତ୍ରିପିଣ୍ଡୀ ଶ୍ରାଦ୍ଧ',
        desc: 'ପୂର୍ବ ତିନି ପିଢ଼ିର ପିତୃପୁରୁଷଙ୍କ ତୃପ୍ତି ଓ ପରିବାରର ସୁଖଶାନ୍ତି ପାଇଁ ବୈଦିକ ଶ୍ରାଦ୍ଧ।',
        duration: '୧ ଦିନ (ପ୍ରାୟ ୩-୪ ଘଣ୍ଟା)',
      },
      'kaal-sarp-shanti': {
        name: 'କାଳସର୍ପ ଯୋଗ ଶାନ୍ତି',
        desc: 'ଜ୍ୟୋତିଷୋକ୍ତ ଗ୍ରହଦୋଷ ଶାନ୍ତି ପାଇଁ ମହାଦେବଙ୍କ ସାନ୍ନିଧ୍ୟରେ ପବିତ୍ର ଅନୁଷ୍ଠାନ।',
        duration: '୧ ଦିନ (ପ୍ରାୟ ୨.୫-୩ ଘଣ୍ଟା)',
      },
      'kumbh-vivah': {
        name: 'କୁମ୍ଭ ବିବାହ',
        desc: 'ବୈବାହିକ ଦୋଷ ନିବାରଣ ପାଇଁ ଶାସ୍ତ୍ରସମ୍ମତ କଳସ ପ୍ରତିଷ୍ଠା ସଂସ୍କାର।',
        duration: '୧ ଦିନ (ପ୍ରାୟ ୨ ଘଣ୍ଟା)',
      },
      'maha-mrityunjaya': {
        name: 'ମହାମୃତ୍ୟୁଞ୍ଜୟ ଜପ',
        desc: 'ଦୀର୍ଘାୟୁ, ସୁସ୍ୱାସ୍ଥ୍ୟ ଓ ସଙ୍କଟ ନିବାରଣ ପାଇଁ ବୈଦିକ ମନ୍ତ୍ର ଜପାନୁଷ୍ଠାନ।',
        duration: '୧ ରୁ ୩ ଦିନ',
      },
      rudrabhishek: {
        name: 'ଲଘୁରୁଦ୍ର / ରୁଦ୍ରାଭିଷେକ',
        desc: 'ପଞ୍ଚାମୃତ ଓ ପବିତ୍ର ଗୋଦାବରୀ ଜଳ ସହିତ ରୁଦ୍ରସୂକ୍ତ ଦ୍ୱାରା ମହାଦେବଙ୍କ ଅଭିଷେକ।',
        duration: '୨ ଘଣ୍ଟା',
      },
    },

    step1Desc: 'ଶାସ୍ତ୍ରୋକ୍ତ ପୂଜା ଚୟନ କରନ୍ତୁ',
    step2Desc: 'ଶୁଭ ମୁହୂର୍ତ୍ତ ଓ ତାରିଖ ସ୍ଥିର କରନ୍ତୁ',
    step3Desc: 'ପ୍ରମାଣିତ ପୁରୋହିତ ବାଛନ୍ତୁ',
    step4Desc: 'ଗୋତ୍ର ଓ ଯଜମାନ ବିବରଣୀ ପ୍ରଦାନ କରନ୍ତୁ',
    step5Desc: 'ତୁରନ୍ତ ବୁକିଂ ନିଶ୍ଚିତତା ପତ୍ର ପାଆନ୍ତୁ',
    trustBadge1: 'ସରଳ ଓ ସ୍ୱଚ୍ଛ',
    trustBadge2: 'ପ୍ରମାଣିତ ତ୍ର୍ୟମ୍ବକ ପୁରୋହିତ',
    trustBadge3: 'କୌଣସି ଲୁକ୍କାୟିତ ଶୁଳ୍କ ନାହିଁ',

    gurujiLanguagesLabel: 'ଭାଷା:',
    gurujiSpecialtiesLabel: 'ପୂଜା ବିଶେଷତା:',
    gurujiBookVidhiBtn: 'ପୂଜା ବୁକ୍ କରନ୍ତୁ',

    traditionBadge: '॥ २५ ପିଢ଼ିର ବଂଶପରମ୍ପରାଗତ ୱତନଦାର ତୀର୍ଥ ପୁରୋହିତ ॥',
    traditionTitle: 'ଛତ୍ରପତି ଶିବାଜୀ ମହାରାଜଙ୍କ କାଳରୁ ପ୍ରାପ୍ତ ଐତିହାସିକ ୱତନ',
    traditionSub: '२५ ପିଢ଼ିର ଅଖଣ୍ଡ ଶାସ୍ତ୍ରୋକ୍ତ ସେବା • ସମଗ୍ର ତ୍ର୍ୟମ୍ବକେଶ୍ୱର ଗ୍ରାମର ଅଧିକୃତ ପୁରୋହିତ',
    traditionDesc:
      'ଆମେ ଶ୍ରୀ କ୍ଷେତ୍ର ତ୍ର୍ୟମ୍ବକେଶ୍ୱରର ବଂଶପରମ୍ପରାଗତ ୱତନଦାର ତୀର୍ଥ ପୁରୋହିତ। ଛତ୍ରପତି ଶିବାଜୀ ମହାରାଜଙ୍କ ସମୟରୁ ଆମ ବଂଶକୁ ସମଗ୍ର ତ୍ର୍ୟମ୍ବକେଶ୍ୱର ଗ୍ରାମର ଐତିହାସିକ ୱତନ (ଧାର୍ମିକ ଅଧିକାର) ମିଳିଛି, ଏବଂ ସେହି ସମୟରୁ ଏଠାର ସମସ୍ତ ଧାର୍ମିକ କାର୍ଯ୍ୟ ଆମ ନିଜ ହାତରେ ସମ୍ପନ୍ନ ହୋଇଆସୁଛି। ବିଗତ २५ ପିଢ଼ି ଧରି ଆମେ ଅବିରତ ସେବା ପ୍ରଦାନ କରୁଛୁ। ନାରାୟଣ ନାଗବଳି, କାଳସର୍ପ ଶାନ୍ତି, ତ୍ରିପିଣ୍ଡୀ ଶ୍ରାଦ୍ଧ, ମହାମୃତ୍ୟୁଞ୍ଜୟ ଜପ ଓ ହବନ, ଲଘୁରୁଦ୍ର, ରୁଦ୍ରାଭିଷେକ, ମହାଅଭିଷେକ, ମହାରୁଦ୍ର, ଗ୍ରହ ନକ୍ଷତ୍ର ଶାନ୍ତି, ବାସ୍ତୁ ଶାନ୍ତି, ନବଚଣ୍ଡୀ ଯାଗ, ଗଣେଶ ଯାଗ ଏବଂ ଉଦକ ଶାନ୍ତି ପ୍ରଭୃତି ସମସ୍ତ ପୂଜା ଶାସ୍ତ୍ରୋକ୍ତ ପଦ୍ଧତିରେ ସମ୍ପନ୍ନ କରାଯାଏ।',
    traditionPill1: 'ଶିବାଜୀ ମହାରାଜ କାଳୀନ ୱତନ',
    traditionPill2: '२५ ପିଢ଼ିର ପବିତ୍ର ପରମ୍ପରା',
    traditionPillar1Title: 'ଐତିହାସିକ ୱତନ ଓ २५ ପିଢ଼ିର ପରମ୍ପରା',
    traditionPillar1Desc:
      'ଛତ୍ରପତି ଶିବାଜୀ ମହାରାଜଙ୍କ ସମୟରୁ ତ୍ର୍ୟମ୍ବକେଶ୍ୱରର ଧାର୍ମିକ ୱତନ ଆମ ବଂଶ ପାଖରେ ରହିଛି।',
    traditionPillar2Title: 'ସମସ୍ତ ବୈଦିକ ଶାନ୍ତି ଓ ମହାଯାଗ',
    traditionPillar2Desc:
      'ନାରାୟଣ ନାଗବଳି, କାଳସର୍ପ ଶାନ୍ତି, ତ୍ରିପିଣ୍ଡୀ ଶ୍ରାଦ୍ଧ, ମହାମୃତ୍ୟୁଞ୍ଜୟ ଜପ-ହବନ, ରୁଦ୍ରାଭିଷେକ, ଲଘୁରୁଦ୍ର, ମହାରୁଦ୍ର, ବାସ୍ତୁ ଶାନ୍ତି, ନବଚଣ୍ଡୀ ଯାଗ, ଉଦକ ଶାନ୍ତି।',
    traditionPillar3Title: 'ପ୍ରତ୍ୟକ୍ଷ ଅଧିକୃତ ପୁରୋହିତଙ୍କ ଦ୍ୱାରା ଅନୁଷ୍ଠାନ',
    traditionPillar3Desc:
      'କୌଣସି ଦଲାଲଙ୍କ ବିନା ସିଧାସଳଖ ୱତନଦାର ପୁରୋହିତଙ୍କ ଦ୍ୱାରା ବୈଦିକ ମନ୍ତ୍ରୋଚ୍ଚାରଣ ଓ ଶାସ୍ତ୍ରୋକ୍ତ ସଂକଳ୍ପ।',

    sacredPlacesSubtitle:
      'କୁଶାବର୍ତ୍ତ କୁଣ୍ଡ, ବ୍ରହ୍ମଗିରି ପର୍ବତ ଓ ପବିତ୍ର ତୀର୍ଥସ୍ଥଳୀ ଦର୍ଶନ କରି ନିଜ ଯାତ୍ରାକୁ ସାର୍ଥକ କରନ୍ତୁ।',
    sacredPlacesExploreBtn: 'ବିବରଣୀ ଦେଖନ୍ତୁ',
    sacredPlacesDistancePrefix: 'ମନ୍ଦିରରୁ ଦୂରତା',

    storySubtitle:
      'ଋଷି ଗୌତମଙ୍କ କଠୋର ତପସ୍ୟା, ଗୋହତ୍ୟା ମୁକ୍ତି ଓ ଭଗବାନ ଶିବଙ୍କ ଜଟାରୁ ମର୍ତ୍ତ୍ୟକୁ ଗୋଦାବରୀଙ୍କ ଅବତରଣର ପବିତ୍ର ପୌରାଣିକ କାହାଣୀ।',
    storyPuranaLore: 'ପୌରାଣିକ ପରମ୍ପରା',
    storyChapterPrefix: 'ଅଧ୍ୟାୟ',
    storyPrevBtn: 'ପୂର୍ବ ଅଧ୍ୟାୟ',
    storyNextBtn: 'ପରବର୍ତ୍ତୀ ଅଧ୍ୟାୟ',

    festivalsTitle: 'ତ୍ର୍ୟମ୍ବକେଶ୍ୱରର ପବିତ୍ର ଉତ୍ସବ',
    festivalsSubtitle:
      'ସିଂହସ୍ଥ କୁମ୍ଭମେଳା, ମହାଶିବରାତ୍ରି ଓ ଶ୍ରାବଣ ସୋମବାରର ଭବ୍ୟ ଉତ୍ସବରେ ଭକ୍ତିଭାବରେ ସାମିଲ ହୁଅନ୍ତୁ।',
    festivalsSignificanceLabel: 'ଆଧ୍ୟାତ୍ମିକ ମହତ୍ତ୍ୱ:',

    darshanSubtitle:
      'ସହଜ ଦର୍ଶନ ପାଇଁ ମନ୍ଦିର ସମୟ, ଆରତି ସମୟସାରଣୀ, ପାରମ୍ପରିକ ପୋଷାକ ଓ ଗର୍ଭଗୃହ ନିୟମାବଳୀ।',
    darshanTabTimings: 'ଦର୍ଶନ ଓ ଆରତି ସମୟସାରଣୀ',
    darshanTabGuidelines: 'ପୋଷାକ ନିୟମ ଓ ବିଧି',
    darshanDailySchedule: 'ଦୈନିକ ମନ୍ଦିର ସମୟସାରଣୀ',
    darshanTempleGates: 'ମନ୍ଦିର ଖୋଲା: ସକାଳ ୦୫:୩୦ ରୁ ରାତି ୦୯:୦୦',
    darshanMondayTitle: 'ବିଶେଷ ସୋମବାର ସୁବର୍ଣ୍ଣ ମୁକୁଟ ଦର୍ଶନ',
    darshanMondayDesc:
      'ପ୍ରତି ସୋମବାର ସନ୍ଧ୍ୟା ୦୭:୦୦ ରୁ ୦୮:୩୦ ମଧ୍ୟରେ ଜ୍ୟୋତିର୍ଲିଙ୍ଗରେ ଐତିହାସିକ ସ୍ୱର୍ଣ୍ଣ ମୁକୁଟ ପରିଧାନ କରାଯାଏ ଓ ଭବ୍ୟ ପାଲିଙ୍କି ଶୋଭାଯାତ୍ରା ଅନୁଷ୍ଠିତ ହୁଏ।',
    darshanDressMen: 'ପୁରୁଷ: ଗର୍ଭଗୃହ ସ୍ପର୍ଶ ଦର୍ଶନ ପାଇଁ ଧୋତି ଓ ଉତ୍ତରୀୟ ବାଧ୍ୟତାମୂଳକ।',
    darshanDressWomen: 'ମହିଳା: ଶାଢ଼ୀ କିମ୍ବା ଓଢ଼ଣୀ ସହିତ ସାଲୱାର୍ କମିଜ୍।',
    darshanRulesTitle: 'ଗର୍ଭଗୃହ ଶୃଙ୍ଖଳା',

    reachSubtitle: 'ନାସିକ, ମୁମ୍ବାଇ ଓ ପୁନେରୁ ସଡ଼କ, ରେଳ ଓ ବିମାନ ପଥରେ ତ୍ର୍ୟମ୍ବକେଶ୍ୱର ପହଞ୍ଚିବା ଅତ୍ୟନ୍ତ ସହଜ।',
    reachRoadTitle: 'ସଡ଼କ ପଥ (ହାଇୱେ)',
    reachRoadDesc: 'ନାସିକରୁ ତ୍ର୍ୟମ୍ବକେଶ୍ୱର ୨୮ କି.ମି. ପ୍ରଶସ୍ତ ୪-ଲେନ୍ ରାସ୍ତା (NH-848)।',
    reachRoadNote: 'ନାସିକ ସିବିଏସ୍ ବସ୍ ଟର୍ମିନାଲରୁ ପ୍ରତି ୧୫ ମିନିଟରେ ବସ୍ ଓ ଟ୍ୟାକ୍ସି ଉପଲବ୍ଧ।',
    reachTrainTitle: 'ରେଳ ପଥ',
    reachTrainDesc: 'ନାସିକ ରୋଡ୍ ରେଳ ଷ୍ଟେସନ (NK) ନିକଟସ୍ଥ ପ୍ରମୁଖ ଜଙ୍କସନ୍ (୩୮ କି.ମି.)।',
    reachTrainNote: 'ବନ୍ଦେ ଭାରତ, ପଞ୍ଚବଟୀ, ତପୋବନ ଏକ୍ସପ୍ରେସ୍ ମୁମ୍ବାଇ ଓ ନାସିକକୁ ଯୋଡ଼େ।',
    reachAirTitle: 'ବିମାନ ପଥ',
    reachAirDesc: 'ନାସିକ ଓଝର ବିମାନବନ୍ଦର (୫୦ କି.ମି.) ଓ ମୁମ୍ବାଇ ଆନ୍ତର୍ଜାତୀୟ ବିମାନବନ୍ଦର (୧୭୫ କି.ମି.)।',
    reachAirNote: 'ବିମାନବନ୍ଦରରୁ ସିଧାସଳଖ ତ୍ର୍ୟମ୍ବକ ପାଇଁ ୨୪ ଘଣ୍ଟା ଟ୍ୟାକ୍ସି ସୁବିଧା ରହିଛି।',

    reviewsNative: 'ଭକ୍ତଙ୍କ ଅନୁଭୂତି',
    reviewsTitle: 'ଶ୍ରଦ୍ଧାଳୁ ଭକ୍ତଙ୍କ ପବିତ୍ର ଅନୁଭୂତି',
    reviewsSubtitle: 'ଦର୍ଶନ ଓ ଶାସ୍ତ୍ରୋକ୍ତ ପୂଜାବିଧି ସମାପ୍ତ ହେବା ପରେ ଭକ୍ତମାନଙ୍କ ଦ୍ୱାରା ପ୍ରକାଶିତ ପ୍ରତିକ୍ରିୟା।',
    reviewsNote: '* ଓଡ଼ିଶା, ମହାରାଷ୍ଟ୍ର, ଗୁଜରାଟ ସମେତ ସମଗ୍ର ଭାରତରୁ ଆସିଥିବା ଶ୍ରଦ୍ଧାଳୁ ପରିବାରଙ୍କ ଅନୁଭବ।',

    faqSubtitle: 'ପୂଜା ପ୍ରସ୍ତୁତି, ରହଣି, ଆବଶ୍ୟକ ଦିନ ଓ ମନ୍ଦିର ନିୟମାବଳୀ ସମ୍ବନ୍ଧୀୟ ପ୍ରଶ୍ନୋତ୍ତର।',
  },
};

export function getHomeTranslations(lang: SupportedLanguage): HomeTranslations {
  return HOME_TRANSLATIONS[lang] || HOME_TRANSLATIONS.en;
}
