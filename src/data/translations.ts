import { SupportedLanguage, LanguageOption } from '../types';

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', script: 'Latin' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', script: 'Devanagari' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', script: 'Devanagari' },
  { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्', script: 'Devanagari' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', script: 'Gujarati' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', script: 'Telugu' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', script: 'Kannada' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', script: 'Tamil' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', script: 'Bengali' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', script: 'Odia' },
];

export const TRIMBAKESHWAR_NAME_BY_LANG: Record<SupportedLanguage, string> = {
  en: 'TRIMBAKESHWAR',
  hi: 'त्र्यंबकेश्वर',
  mr: 'त्र्यंबकेश्वर',
  sa: 'त्र्यम्बकेश्वर',
  gu: 'ત્ર્યંબકેશ્વર',
  te: 'త్రయంబకేశ్వర్',
  kn: 'ತ್ರ್ಯಂಬಕೇಶ್ವರ',
  ta: 'திரிம்பகேஷ்வர்',
  bn: 'ত্র্যম্বকেশ্বর',
  or: 'ତ୍ର୍ୟମ୍ବକେଶ୍ୱର',
};

export interface UiTranslations {
  // Navigation
  navTemple: string;
  navPuja: string;
  navGuruji: string;
  navSacredPlaces: string;
  navFestivals: string;
  navArticles: string;
  navAbout: string;
  navBookPuja: string;
  navSearchPlaceholder: string;

  // Hero
  heroSanskritInvocation: string;
  heroTitle: string;
  heroSubTitle: string;
  heroDescription: string;
  heroTagline: string;
  heroCtaExplore: string;
  heroCtaBook: string;
  heroTrust1: string;
  heroTrust2: string;
  heroTrust3: string;
  heroTrust4: string;

  // Quick Actions
  quickHeadingNative: string;
  quickHeadingEng: string;
  card1Title: string;
  card1Desc: string;
  card1Btn: string;
  card2Title: string;
  card2Desc: string;
  card2Btn: string;
  card3Title: string;
  card3Desc: string;
  card3Btn: string;
  card4Title: string;
  card4Desc: string;
  card4Btn: string;

  // Introduction
  introEyebrow: string;
  introHeading: string;
  introDesc: string;
  introCta: string;

  // Jyotirlinga
  jyotirlingaHeadingNative: string;
  jyotirlingaHeadingEng: string;
  jyotirlingaDesc: string;
  jyotirlingaCta: string;

  // Puja Section
  pujaEyebrow: string;
  pujaHeading: string;
  pujaDesc: string;
  pujaExploreBtn: string;
  pujaBookBtn: string;

  // Book Puja Flow
  bookFlowHeadingNative: string;
  bookFlowHeadingEng: string;
  bookFlowDesc: string;
  step1: string;
  step2: string;
  step3: string;
  step4: string;
  step5: string;
  bookFlowBtn: string;
  talkToGurujiBtn: string;
  trustSimple: string;

  // Guruji
  gurujiHeadingNative: string;
  gurujiHeadingEng: string;
  gurujiDesc: string;
  gurujiExp: string;
  gurujiViewProfile: string;

  // Sacred Places
  sacredPlacesHeadingNative: string;
  sacredPlacesHeadingEng: string;

  // Story
  storyHeadingNative: string;
  storyHeadingEng: string;

  // Darshan & Travel
  darshanHeadingNative: string;
  darshanHeadingEng: string;
  reachHeadingNative: string;
  reachHeadingEng: string;

  // FAQs
  faqHeadingNative: string;
  faqHeadingEng: string;

  // Final CTA
  finalCtaTitle: string;
  finalCtaSub: string;

  // Chants
  harHarMahadev: string;
  omNamahShivaya: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, UiTranslations> = {
  en: {
    navTemple: 'Temple',
    navPuja: 'Puja & Vidhi',
    navGuruji: 'Guruji',
    navSacredPlaces: 'Sacred Places',
    navFestivals: 'Festivals',
    navArticles: 'Spiritual Articles',
    navAbout: 'About Kshetra',
    navBookPuja: 'Book Puja',
    navSearchPlaceholder: 'Search Vidhi, Guruji, Darshan...',

    heroSanskritInvocation: '॥ ॐ नमः शिवाय ॥',
    heroTitle: 'श्री त्र्यंबकेश्वर ज्योतिर्लिंग',
    heroSubTitle: 'A Sacred Abode of Mahadev',
    heroDescription: 'One of the twelve revered Jyotirlinga Kshetras of Bhagwan Shiva, nestled in the holy land of Trimbak at the foot of Brahmagiri, Nashik, Maharashtra.',
    heroTagline: 'श्रद्धा • सेवा • संस्कार • सनातन परंपरा',
    heroCtaExplore: 'Explore Trimbakeshwar',
    heroCtaBook: 'Book a Puja',
    heroTrust1: '12 Jyotirlingas',
    heroTrust2: 'Sacred Godavari',
    heroTrust3: 'Sanatan Parampara',
    heroTrust4: 'Vedic Puja Seva',

    quickHeadingNative: 'आपकी श्रद्धा • हमारी सेवा',
    quickHeadingEng: 'How may we serve your pilgrimage?',
    card1Title: 'Temple Darshan',
    card1Desc: 'Explore the sacred Mandir, history, and live Darshan guidelines.',
    card1Btn: 'Explore Temple',
    card2Title: 'Puja & Vidhi',
    card2Desc: 'Discover traditional Vedic rituals, Pitru ceremonies, and Anushthan.',
    card2Btn: 'Explore Puja',
    card3Title: 'Find a Guruji',
    card3Desc: 'Connect with experienced Vedic Purohits for authentic ritual guidance.',
    card3Btn: 'Find Guruji',
    card4Title: 'Book Your Puja',
    card4Desc: 'Choose your preferred Vidhi, auspicious date, and Vedic Guruji.',
    card4Btn: 'Book Now',

    introEyebrow: 'पावन त्र्यंबक • THE SACRED KSHETRA',
    introHeading: 'The Sacred Land of Trimbakeshwar',
    introDesc: 'Trimbakeshwar, near Nashik in Maharashtra, is one of the most revered pilgrimage destinations in the Hindu tradition. The sacred Jyotirlinga of Bhagwan Shiva, Brahmagiri Parvat, the holy Kushavarta Tirtha, and the sacred origin traditions of the Godavari unite to make this Kshetra profoundly auspicious. Here, faith, devotion, and centuries-old Vedic traditions come together.',
    introCta: 'Discover the Sacred Kshetra →',

    jyotirlingaHeadingNative: 'त्र्यंबकेश्वर ज्योतिर्लिंग',
    jyotirlingaHeadingEng: 'The Divine Jyotirlinga of Trimbakeshwar',
    jyotirlingaDesc: 'Unlike any other Jyotirlinga, Trimbakeshwar is revered for embodying the Holy Trinity: Brahma, Vishnu, and Mahesh in a single sacred Linga cavity. Enshrined in ancient black basalt stone, this holy presence is crowned by the sacred crown adorned with precious gems.',
    jyotirlingaCta: 'Discover the Jyotirlinga Story →',

    pujaEyebrow: 'पूजा • विधी • अनुष्ठान',
    pujaHeading: 'Traditional Pujas, Performed with श्रद्धा',
    pujaDesc: 'Explore traditional Hindu rituals performed according to established Shastra customs and guided by certified Vedic Purohits.',
    pujaExploreBtn: 'Explore Vidhi',
    pujaBookBtn: 'Book Vidhi',

    bookFlowHeadingNative: 'आपली श्रद्धा • आमची सेवा',
    bookFlowHeadingEng: 'Begin Your Sacred Journey',
    bookFlowDesc: 'Choose your preferred Vidhi, date, and Guruji and begin your pilgrimage with a guided, transparent Puja experience.',
    step1: 'Choose Vidhi',
    step2: 'Select Date',
    step3: 'Choose Guruji',
    step4: 'Yajman Details',
    step5: 'Confirm Booking',
    bookFlowBtn: 'Book Your Puja',
    talkToGurujiBtn: 'Talk to a Guruji',
    trustSimple: 'Simple • Guided • Transparent',

    gurujiHeadingNative: 'परंपरेचे संरक्षक',
    gurujiHeadingEng: 'Meet Our Guruji',
    gurujiDesc: 'Connect with verified Vedic Purohits who guide devotees through traditional Puja, Vidhi, and sacred Anushthan with complete devotion.',
    gurujiExp: 'Years Experience',
    gurujiViewProfile: 'View Profile',

    sacredPlacesHeadingNative: 'पावन तीर्थक्षेत्र',
    sacredPlacesHeadingEng: 'Sacred Places Around Trimbakeshwar',

    storyHeadingNative: 'त्र्यंबकेश्वरची कथा',
    storyHeadingEng: 'The Story of Trimbakeshwar',

    darshanHeadingNative: 'दर्शन माहिती',
    darshanHeadingEng: 'Plan Your Darshan',
    reachHeadingNative: 'त्र्यंबकेश्वरला कसे याल?',
    reachHeadingEng: 'How to Reach Trimbakeshwar',

    faqHeadingNative: 'आपल्या मनातील प्रश्न',
    faqHeadingEng: 'Frequently Asked Questions',

    finalCtaTitle: 'Come With श्रद्धा. Leave With स्मरण.',
    finalCtaSub: 'Plan your Darshan, discover the sacred Kshetra, and connect with traditional Puja services from one trusted platform.',

    harHarMahadev: 'Har Har Mahadev',
    omNamahShivaya: 'Om Namah Shivaya',
  },

  hi: {
    navTemple: 'मंदिर दर्शन',
    navPuja: 'पूजा व विधि',
    navGuruji: 'गुरुजी',
    navSacredPlaces: 'पवित्र तीर्थ',
    navFestivals: 'उत्सव व पर्व',
    navArticles: 'धार्मिक लेख',
    navAbout: 'क्षेत्र परिचय',
    navBookPuja: 'पूजा बुक करें',
    navSearchPlaceholder: 'विधि, गुरुजी, दर्शन खोजें...',

    heroSanskritInvocation: '॥ ॐ नमः शिवाय ॥',
    heroTitle: 'श्री त्र्यंबकेश्वर ज्योतिर्लिंग',
    heroSubTitle: 'महादेव का पावन धाम',
    heroDescription: 'भगवान शिव के द्वादश पावन ज्योतिर्लिंगों में से एक, नाशिक के ब्रह्मगिरि की तलहटी में पवित्र त्र्यंबक की पावन धरा पर सुशोभित।',
    heroTagline: 'श्रद्धा • सेवा • संस्कार • सनातन परंपरा',
    heroCtaExplore: 'त्र्यंबकेश्वर दर्शन',
    heroCtaBook: 'अपनी पूजा बुक करें',
    heroTrust1: 'द्वादश ज्योतिर्लिंग',
    heroTrust2: 'पवित्र गोदावरी',
    heroTrust3: 'सनातन परंपरा',
    heroTrust4: 'वैदिक पूजा सेवा',

    quickHeadingNative: 'आपकी श्रद्धा • हमारी सेवा',
    quickHeadingEng: 'हम आपकी तीर्थयात्रा में कैसे सेवा कर सकते हैं?',
    card1Title: 'मंदिर दर्शन',
    card1Desc: 'पवित्र मंदिर, इतिहास व दर्शन के समय की संपूर्ण जानकारी।',
    card1Btn: 'मंदिर दर्शन देखें',
    card2Title: 'पूजा व विधि',
    card2Desc: 'परंपरागत वैदिक अनुष्ठान, पितृ शांति व अभिषेक विधि।',
    card2Btn: 'पूजा विवरण देखें',
    card3Title: 'गुरुजी से जुड़ें',
    card3Desc: 'अनुभवी व प्रामाणिक वैदिक पुरोहितों से मार्गदर्शन प्राप्त करें।',
    card3Btn: 'गुरुजी खोजें',
    card4Title: 'पूजा बुक करें',
    card4Desc: 'अपनी मनचाही विधि, शुभ तिथि व गुरुजी का चयन करें।',
    card4Btn: 'अभी बुक करें',

    introEyebrow: 'पावन त्र्यंबक • पवित्र तीर्थक्षेत्र',
    introHeading: 'त्र्यंबकेश्वर की पावन भूमि',
    introDesc: 'महाराष्ट्र के नाशिक के समीप स्थित त्र्यंबकेश्वर हिंदू परंपरा का अत्यंत पावन तीर्थ है। भगवान शिव का ज्योतिर्लिंग, ब्रह्मगिरि पर्वत, पवित्र कुशावर्त तीर्थ तथा गोदावरी का उद्गम स्थल इस क्षेत्र को परम पवित्र बनाते हैं।',
    introCta: 'पवित्र क्षेत्र जानें →',

    jyotirlingaHeadingNative: 'त्र्यंबकेश्वर ज्योतिर्लिंग',
    jyotirlingaHeadingEng: 'त्र्यंबकेश्वर का दिव्य स्वरूप',
    jyotirlingaDesc: 'इस पावन ज्योतिर्लिंग की विशेषता यह है कि इसमें ब्रह्मा, विष्णु और महेश तीनों त्रिदेवों का स्वरूप एक ही पावन लिंग विवर में विद्यमान है।',
    jyotirlingaCta: 'ज्योतिर्लिंग कथा पढ़ें →',

    pujaEyebrow: 'पूजा • विधी • अनुष्ठान',
    pujaHeading: 'श्रद्धापूर्वक संपन्न होने वाली वैदिक पूजाएं',
    pujaDesc: 'शास्त्रोक्त विधि-विधान से संपन्न होने वाली सनातन पूजाएं एवं अनुष्ठान।',
    pujaExploreBtn: 'विधि देखें',
    pujaBookBtn: 'पूजा बुक करें',

    bookFlowHeadingNative: 'आपकी श्रद्धा • हमारी सेवा',
    bookFlowHeadingEng: 'अपनी पावन तीर्थयात्रा आरंभ करें',
    bookFlowDesc: 'अपनी विधि, तिथि व गुरुजी का चयन कर पारदर्शी एवं सुगम रूप से पूजा संपन्न करें।',
    step1: 'विधि चुनें',
    step2: 'तिथि चुनें',
    step3: 'गुरुजी चुनें',
    step4: 'यजमान विवरण',
    step5: 'बुकिंग पुष्टि',
    bookFlowBtn: 'पूजा बुक करें',
    talkToGurujiBtn: 'गुरुजी से परामर्श करें',
    trustSimple: 'सरल • मार्गदर्शन युक्त • पारदर्शी',

    gurujiHeadingNative: 'परंपरा के संरक्षक',
    gurujiHeadingEng: 'हमारे प्रामाणिक गुरुजी',
    gurujiDesc: 'वैदिक परंपरा के ज्ञाता पुरोहितों से संपर्क करें जो संपूर्ण निष्ठा से विधि संपन्न करवाते हैं।',
    gurujiExp: 'वर्षों का अनुभव',
    gurujiViewProfile: 'प्रोफाइल देखें',

    sacredPlacesHeadingNative: 'पावन तीर्थक्षेत्र',
    sacredPlacesHeadingEng: 'त्र्यंबकेश्वर के प्रमुख पवित्र स्थल',

    storyHeadingNative: 'त्र्यंबकेश्वर की पावन कथा',
    storyHeadingEng: 'त्र्यंबक प्राकट्य कथा',

    darshanHeadingNative: 'दर्शन जानकारी',
    darshanHeadingEng: 'दर्शन का समय व नियम',
    reachHeadingNative: 'त्र्यंबकेश्वर कैसे पहुंचें?',
    reachHeadingEng: 'यात्रा मार्गदर्शिका',

    faqHeadingNative: 'प्रायः पूछे जाने वाले प्रश्न',
    faqHeadingEng: 'आपके प्रश्नों के समाधान',

    finalCtaTitle: 'आएं श्रद्धा के साथ। लौटें पावन स्मरण के साथ।',
    finalCtaSub: 'एक ही विश्वासपात्र मंच से अपने दर्शन और प्रामाणिक पूजा का संकल्प लें।',

    harHarMahadev: 'हर हर महादेव',
    omNamahShivaya: 'ॐ नमः शिवाय',
  },

  mr: {
    navTemple: 'मंदिर दर्शन',
    navPuja: 'पूजा व विधी',
    navGuruji: 'गुरुजी',
    navSacredPlaces: 'पवित्र तीर्थे',
    navFestivals: 'उत्सव व यात्रा',
    navArticles: 'धार्मिक लेख',
    navAbout: 'क्षेत्र माहिती',
    navBookPuja: 'पूजा बुक करा',
    navSearchPlaceholder: 'विधी, गुरुजी, दर्शन शोधा...',

    heroSanskritInvocation: '॥ ॐ नमः शिवाय ॥',
    heroTitle: 'श्री त्र्यंबकेश्वर ज्योतिर्लिंग',
    heroSubTitle: 'महादेवाचे पावन धाम',
    heroDescription: 'महाराष्ट्रातील नाशिक जवळील ब्रह्मगिरीच्या कुशीत वसलेले भगवान शिवाचे द्वादश ज्योतिर्लिंगांपैकी एक अत्यंत पावन तीर्थक्षेत्र.',
    heroTagline: 'श्रद्धा • सेवा • संस्कार • सनातन परंपरा',
    heroCtaExplore: 'त्र्यंबकेश्वर दर्शन',
    heroCtaBook: 'आपली पूजा बुक करा',
    heroTrust1: 'द्वादश ज्योतिर्लिंग',
    heroTrust2: 'पवित्र गोदावरी',
    heroTrust3: 'सनातन परंपरा',
    heroTrust4: 'वैदिक पूजा सेवा',

    quickHeadingNative: 'आपकी श्रद्धा • आमची सेवा',
    quickHeadingEng: 'आपल्या तीर्थयात्रेत आम्ही कशी सेवा करू शकतो?',
    card1Title: 'मंदिर दर्शन',
    card1Desc: 'पवित्र मंदिर, इतिहास आणि दर्शनाच्या वेळेची अचूक माहिती.',
    card1Btn: 'मंदिर पहा',
    card2Title: 'पूजा व विधी',
    card2Desc: 'पारंपरिक वैदिक विधी, पितृकार्य आणि रुद्राभिषेक.',
    card2Btn: 'विधी पहा',
    card3Title: 'गुरुजी शोधा',
    card3Desc: 'अनुभवी आणि प्रामाणिक वैदिक पुरोहितांचे मार्गदर्शन घ्या.',
    card3Btn: 'गुरुजी शोधा',
    card4Title: 'पूजा बुक करा',
    card4Desc: 'आपला विधी, शुभ तिथी आणि गुरुजी निवडा.',
    card4Btn: 'आता बुक करा',

    introEyebrow: 'पावन त्र्यंबक • पवित्र तीर्थक्षेत्र',
    introHeading: 'त्र्यंबकेश्वरची पावन भूमी',
    introDesc: 'त्र्यंबकेश्वर हे महाराष्ट्रातील एक अत्यंत पवित्र तीर्थक्षेत्र असून भगवान शिवाच्या द्वादश ज्योतिर्लिंगांपैकी एक श्री त्र्यंबकेश्वर ज्योतिर्लिंग येथे विराजमान आहे. ब्रह्मगिरी पर्वत, पवित्र कुशावर्त तीर्थ आणि गोदावरीचा उगम त्र्यंबकेश्वराला अद्वितीय पावित्र्य अर्पण करतात.',
    introCta: 'तीर्थक्षेत्राचा परिचय घ्या →',

    jyotirlingaHeadingNative: 'त्र्यंबकेश्वर ज्योतिर्लिंग',
    jyotirlingaHeadingEng: 'त्र्यंबकेश्वरचे दिव्य स्वरूप',
    jyotirlingaDesc: 'त्र्यंबकेश्वर ज्योतिर्लिंगाचे सर्वात मोठे वैशिष्ट्य म्हणजे येथे ब्रह्मा, विष्णू आणि महेश या तिन्ही देवांचे संयुक्त स्वरूप एकाच लिंग विवरात वास करते.',
    jyotirlingaCta: 'ज्योतिर्लिंग कथा वाचा →',

    pujaEyebrow: 'पूजा • विधी • अनुष्ठान',
    pujaHeading: 'श्रद्धेने संपन्न होणाऱ्या पारंपरिक पूजा',
    pujaDesc: 'शास्त्रोक्त नियमांनुसार अनुभवी पुरोहितांच्या मार्गदर्शनाखाली होणारे सनातन विधी.',
    pujaExploreBtn: 'विधी माहिती',
    pujaBookBtn: 'पूजा बुक करा',

    bookFlowHeadingNative: 'आपली श्रद्धा • आमची सेवा',
    bookFlowHeadingEng: 'आपल्या पावन यात्रेचा प्रारंभ करा',
    bookFlowDesc: 'आपला इच्छित विधी, तारीख आणि गुरुजी निवडून सहज आणि पारदर्शकपणे पूजा करा.',
    step1: 'विधी निवडा',
    step2: 'तारीख निवडा',
    step3: 'गुरुजी निवडा',
    step4: 'यजमान माहिती',
    step5: 'बुकिंग निश्चिती',
    bookFlowBtn: 'आपली पूजा बुक करा',
    talkToGurujiBtn: 'गुरुजींशी संवाद साधा',
    trustSimple: 'सहज • मार्गदर्शित • पारदर्शक',

    gurujiHeadingNative: 'परंपरेचे संरक्षक',
    gurujiHeadingEng: 'आमचे अधिकृत गुरुजी',
    gurujiDesc: 'पिढ्यानपिढ्या वैदिक परंपरेचे जतन करणाऱ्या अनुभवी पुरोहितांशी थेट संपर्क करा.',
    gurujiExp: 'वर्षांचा अनुभव',
    gurujiViewProfile: 'प्रोफाइल पहा',

    sacredPlacesHeadingNative: 'पावन तीर्थक्षेत्र',
    sacredPlacesHeadingEng: 'त्र्यंबकेश्वर परिसरातील पवित्र तीर्थे',

    storyHeadingNative: 'त्र्यंबकेश्वरची कथा',
    storyHeadingEng: 'त्र्यंबकेश्वर अवतरण कथा',

    darshanHeadingNative: 'दर्शन माहिती',
    darshanHeadingEng: 'दर्शन वेळापत्रक व नियम',
    reachHeadingNative: 'त्र्यंबकेश्वरला कसे याल?',
    reachHeadingEng: 'प्रवास मार्गदर्शिका',

    faqHeadingNative: 'आपल्या मनातील प्रश्न',
    faqHeadingEng: 'वारंवार विचारले जाणारे प्रश्न',

    finalCtaTitle: 'यावे श्रद्धेने. जावे समाधानाने.',
    finalCtaSub: 'एकाच विश्वासू मंचावरून आपले दर्शन आणि पारंपरिक पूजेचे नियोजन करा.',

    harHarMahadev: 'हर हर महादेव',
    omNamahShivaya: 'ॐ नमः शिवाय',
  },

  sa: {
    navTemple: 'मन्दिरदर्शनम्',
    navPuja: 'पूजा विधयश्च',
    navGuruji: 'गुरुवर्यः',
    navSacredPlaces: 'तीर्थक्षेत्राणि',
    navFestivals: 'उत्सवाः',
    navArticles: 'अध्यात्मलेखाः',
    navAbout: 'क्षेत्रपरिचयः',
    navBookPuja: 'पूजां बुक कुर्वन्तु',
    navSearchPlaceholder: 'विधिं गुरुं दर्शनं च अन्विष्यन्तु...',

    heroSanskritInvocation: '॥ ॐ नमः शिवाय ॥',
    heroTitle: 'श्री त्र्यंबकेश्वर ज्योतिर्लिंगम्',
    heroSubTitle: 'महादेवस्य पावनं धाम',
    heroDescription: 'भगवतः शिवस्य द्वादशज्योतिर्लिङ्गेषु प्रमुखं, सह्याद्रिशिखरे ब्रह्मगिरितले गोदावरीसङ्गमे प्रतिष्ठितं दिव्यक्षेत्रम्।',
    heroTagline: 'श्रद्धा • सेवा • संस्कार • सनातनपरम्परा',
    heroCtaExplore: 'मन्दिरदर्शनम्',
    heroCtaBook: 'पूजां बुक कुर्वन्तु',
    heroTrust1: 'द्वादश ज्योतिर्लिङ्गानि',
    heroTrust2: 'पवित्रा गोदावरी',
    heroTrust3: 'सनातनपरम्परा',
    heroTrust4: 'वैदिकी पूजासेवा',

    quickHeadingNative: 'भवतः श्रद्धा • अस्माकं सेवा',
    quickHeadingEng: 'कथं वयं भवतां सेवां कुर्याम?',
    card1Title: 'मन्दिरदर्शनम्',
    card1Desc: 'पवित्रमन्दिरस्य इतिहासः दर्शनसमयाश्च।',
    card1Btn: 'मन्दिरं पश्यन्तु',
    card2Title: 'पूजा विधयश्च',
    card2Desc: 'पारम्परिकाः वैदिकाः अनुष्ठानाः रुद्राभिषेकश्च।',
    card2Btn: 'विधीन् पश्यन्तु',
    card3Title: 'पुरोहितसम्पर्कः',
    card3Desc: 'अनुभविभिः वैदिकपुरोहितैः सह संवादः।',
    card3Btn: 'पुरोहितं पश्यन्तु',
    card4Title: 'पूजा सङ्कल्पः',
    card4Desc: 'इच्छितविधिं शुभतिथिं च चिनुत।',
    card4Btn: 'इदानीं बुक कुर्वन्तु',

    introEyebrow: 'पावनत्र्यम्बकम् • दिव्यक्षेत्रम्',
    introHeading: 'श्री त्र्यम्बकेश्वरस्य पवित्रभूमिः',
    introDesc: 'सह्याद्रिशीर्षे विमले वसन्तं गोदावरितीरपवित्रदेशे। यद्दर्शनात्पातकमाशु नाशं प्रयाति तं त्र्यम्बकमीशमीडे।',
    introCta: 'दिव्यक्षेत्रं जानीत →',

    jyotirlingaHeadingNative: 'त्र्यंबकेश्वर ज्योतिर्लिंगम्',
    jyotirlingaHeadingEng: 'त्रिमूर्त्यात्मकं ज्योतिर्लिङ्गम्',
    jyotirlingaDesc: 'अत्र भगवन्तः ब्रह्मा, विष्णुः, महेश्वरश्च त्रिभिर्मुखैरेकस्मिन्नेव लिङ्गे विराजन्ते।',
    jyotirlingaCta: 'ज्योतिर्लिङ्गकथां पठन्तु →',

    pujaEyebrow: 'पूजा • विधी • अनुष्ठानम्',
    pujaHeading: 'श्रद्धया समनुष्ठिताः वैदिकाः पूजाः',
    pujaDesc: 'शास्त्रोक्ताः विधीन् संविद्य वैदिकपुरोहितानां सान्निध्ये समर्पिताः।',
    pujaExploreBtn: 'विधिं पश्यन्तु',
    pujaBookBtn: 'पूजां बुक कुर्वन्तु',

    bookFlowHeadingNative: 'भवतः श्रद्धा • अस्माकं सेवा',
    bookFlowHeadingEng: 'आरभ्यतां पावनयात्रा',
    bookFlowDesc: 'विधिं तिथिं पुरोहितं च चित्वा सङ्कल्पपूर्वकं पूजां संपादयन्तु।',
    step1: 'विधिं चिनुत',
    step2: 'तिथिं चिनुत',
    step3: 'पुरोहितं चिनुत',
    step4: 'यजमानविवरणम्',
    step5: 'सत्यापनम्',
    bookFlowBtn: 'पूजां बुक कुर्वन्तु',
    talkToGurujiBtn: 'पुरोहितेन सह वदन्तु',
    trustSimple: 'सरलम् • पारदर्शकम् • शास्त्रसम्मतम्',

    gurujiHeadingNative: 'परम्परायाः संरक्षकाः',
    gurujiHeadingEng: 'अस्माकं वैदिकाः पुरोहिताः',
    gurujiDesc: 'पीढिपरम्परया वेदशास्त्रं रक्षन्तः आचार्याः यजमानसेवायां समर्पिताः।',
    gurujiExp: 'वर्षाणामनुभवः',
    gurujiViewProfile: 'परिचयं पश्यन्तु',

    sacredPlacesHeadingNative: 'पावनतीर्थानि',
    sacredPlacesHeadingEng: 'त्र्यम्बकपरिसरस्य तीर्थानि',

    storyHeadingNative: 'त्र्यम्बकस्य पावनकथा',
    storyHeadingEng: 'महर्षिगौतमस्य तपःकथा',

    darshanHeadingNative: 'दर्शनविवरणम्',
    darshanHeadingEng: 'दर्शनसमयः नियमाश्च',
    reachHeadingNative: 'कथं गन्तव्यम्?',
    reachHeadingEng: 'मार्गदर्शनम्',

    faqHeadingNative: 'जिज्ञासाः समाधानानि च',
    faqHeadingEng: 'प्रश्नोत्तराणि',

    finalCtaTitle: 'श्रद्धया आगच्छन्तु। स्मरणेन तृप्यन्तु।',
    finalCtaSub: 'एकेनैव विश्वस्तेन मञ्चेन तीर्थयात्रां पूजां च सङ्कल्पयन्तु।',

    harHarMahadev: 'हर हर महादेव',
    omNamahShivaya: 'ॐ नमः शिवाय',
  },

  gu: {
    navTemple: 'મંદિર દર્શન',
    navPuja: 'પૂજા અને વિધિ',
    navGuruji: 'ગુરુજી',
    navSacredPlaces: 'પવિત્ર તીર્થ',
    navFestivals: 'ઉત્સવ',
    navArticles: 'ધાર્મિક લેખ',
    navAbout: 'તીર્થ પરિચય',
    navBookPuja: 'પૂજા બુક કરો',
    navSearchPlaceholder: 'વિધિ, ગુરુજી, દર્શન શોધો...',

    heroSanskritInvocation: '॥ ॐ नमः शिवाय ॥',
    heroTitle: 'શ્રી ત્ર્યંબકેશ્વર જ્યોતિર્લિંગ',
    heroSubTitle: 'મહાદેવનું પરમ પવિત્ર ધામ',
    heroDescription: 'ભગવાન શિવના ૧૨ જ્યોતિર્લિંગો પૈકીનું એક, મહારાષ્ટ્રના નાસિક સ્થિત બ્રહ્મગિરિની ગોદમાં બિરાજમાન પાવન તીર્થ.',
    heroTagline: 'શ્રદ્ધા • સેવા • સંસ્કાર • સનાતન પરંપરા',
    heroCtaExplore: 'ત્ર્યંબકેશ્વર દર્શન',
    heroCtaBook: 'પૂજા બુક કરો',
    heroTrust1: '૧૨ જ્યોતિર્લિંગ',
    heroTrust2: 'પવિત્ર ગોદાવરી',
    heroTrust3: 'સનાતન પરંપરા',
    heroTrust4: 'વૈદિક પૂજા સેવા',

    quickHeadingNative: 'આપની શ્રદ્ધા • અમારી સેવા',
    quickHeadingEng: 'અમે તમારી યાત્રામાં કેવી રીતે સેવા કરી શકીએ?',
    card1Title: 'મંદિર દર્શન',
    card1Desc: 'પવિત્ર મંદિર, ઇતિહાસ અને દર્શનના સમયની સંપૂર્ણ માહિતી.',
    card1Btn: 'મંદિર જુઓ',
    card2Title: 'પૂજા અને વિધિ',
    card2Desc: 'પરંપરાગત વૈદિક વિધિઓ, પિતૃ કાર્ય અને રુદ્રાભિષેક.',
    card2Btn: 'વિધિ જુઓ',
    card3Title: 'ગુરુજી સંપર્ક',
    card3Desc: 'અનુભવી અને શાસ્ત્રજ્ઞ પુરોહિતો પાસેથી માર્ગદર્શન લો.',
    card3Btn: 'ગુરુજી શોધો',
    card4Title: 'પૂજા બુક કરો',
    card4Desc: 'તમારી વિધિ, શુભ તિથિ અને ગુરુજી પસંદ કરો.',
    card4Btn: 'હમણાં બુક કરો',

    introEyebrow: 'પાવન ત્ર્યંબક • તીર્થક્ષેત્ર',
    introHeading: 'ત્ર્યંબકેશ્વરની પવિત્ર ભૂમિ',
    introDesc: 'મહારાષ્ટ્રના નાસિક પાસે ત્ર્યંબકેશ્વર હિન્દુ ધર્મનું અત્યંત પવિત્ર યાત્રાધામ છે.',
    introCta: 'તીર્થક્ષેત્ર જાણો →',

    jyotirlingaHeadingNative: 'ત્ર્યંબકેશ્વર જ્યોતિર્લિંગ',
    jyotirlingaHeadingEng: 'બ્રહ્મા, વિષ્ણુ અને મહેશનું દિવ્ય સ્વરૂપ',
    jyotirlingaDesc: 'આ જ્યોતિર્લિંગની અદ્ભુત વિશેષતા છે કે અહીં બ્રહ્મા, વિષ્ણુ અને મહેશ ત્રણેય દેવો એક જ લિંગમાં બિરાજમાન છે.',
    jyotirlingaCta: 'જ્યોતિર્લિંગ કથા વાંચો →',

    pujaEyebrow: 'પૂજા • વિધિ • અનુષ્ઠાન',
    pujaHeading: 'શ્રદ્ધાપૂર્વક થતી શાસ્ત્રોક્ત પૂજાઓ',
    pujaDesc: 'શાસ્ત્ર મુજબ અનુભવી પુરોહિતો દ્વારા સંપન્ન થતી પૂજાઓ.',
    pujaExploreBtn: 'વિધિ જુઓ',
    pujaBookBtn: 'પૂજા બુક કરો',

    bookFlowHeadingNative: 'આપની શ્રદ્ધા • અમારી સેવા',
    bookFlowHeadingEng: 'તમારી પવિત્ર યાત્રા શરૂ કરો',
    bookFlowDesc: 'વિધિ, તારીખ અને ગુરુજી પસંદ કરી સરળતાથી પૂજા સંપન્ન કરો.',
    step1: 'વિધિ પસંદ કરો',
    step2: 'તારીખ પસંદ કરો',
    step3: 'ગુરુજી પસંદ કરો',
    step4: 'યજમાન વિગત',
    step5: 'બુકિંગ ખાતરી',
    bookFlowBtn: 'પૂજા બુક કરો',
    talkToGurujiBtn: 'ગુરુજી સાથે વાત કરો',
    trustSimple: 'સરળ • માર્ગદર્શિત • પારદર્શક',

    gurujiHeadingNative: 'પરંપરાના સંરક્ષક',
    gurujiHeadingEng: 'અમારા અધિકૃત ગુરુજી',
    gurujiDesc: 'વૈદિક પરંપરાનું પાલન કરતા અનુભવી પુરોહિતો.',
    gurujiExp: 'વર્ષોનો અનુભવ',
    gurujiViewProfile: 'પ્રોફાઇલ જુઓ',

    sacredPlacesHeadingNative: 'પવિત્ર તીર્થસ્થાનો',
    sacredPlacesHeadingEng: 'ત્ર્યંબકેશ્વર આસપાસના પવિત્ર સ્થળો',

    storyHeadingNative: 'ત્ર્યંબકેશ્વરની કથા',
    storyHeadingEng: 'પવિત્ર અવતરણ કથા',

    darshanHeadingNative: 'દર્શન માહિતી',
    darshanHeadingEng: 'દર્શન સમય અને નિયમો',
    reachHeadingNative: 'કેવી રીતે પહોંચવું?',
    reachHeadingEng: 'યાત્રા માર્ગદર્શિકા',

    faqHeadingNative: 'વારંવાર પૂછાતા પ્રશ્નો',
    faqHeadingEng: 'તમારા પ્રશ્નોના ઉત્તર',

    finalCtaTitle: 'શ્રદ્ધા સાથે આવો. પુણ્ય સ્મરણ સાથે જાવ.',
    finalCtaSub: 'એક જ વિશ્વસનીય પ્લેટફોર્મ પરથી દર્શન અને પૂજા બુક કરો.',

    harHarMahadev: 'હર હર મહાદેવ',
    omNamahShivaya: 'ૐ નમઃ શિવાય',
  },

  te: {
    navTemple: 'ఆలయ దర్శనం',
    navPuja: 'పూజ & విధులు',
    navGuruji: 'గురూజీ',
    navSacredPlaces: 'పుణ్యక్షేత్రాలు',
    navFestivals: 'ఉత్సవాలు',
    navArticles: 'ఆధ్యాత్మిక వ్యాసాలు',
    navAbout: 'క్షేత్ర పరిచయం',
    navBookPuja: 'పూజ బుక్ చేయండి',
    navSearchPlaceholder: 'పూజ, గురూజీ, దర్శనం శోధించండి...',

    heroSanskritInvocation: '॥ ॐ नमः शिवाय ॥',
    heroTitle: 'శ్రీ త్రయంబకేశ్వర జ్యోతిర్లింగం',
    heroSubTitle: 'మహాదేవుని పవిత్ర దివ్యక్షేత్రం',
    heroDescription: 'ద్వాదశ జ్యోతిర్లింగాలలో అత్యంత పవిత్రమైన శ్రీ త్రయంబకేశ్వర జ్యోతిర్లింగ క్షేత్రం, బ్రహ్మగిరి పాదాల చెంత, నాసిక్, మహారాష్ట్ర.',
    heroTagline: 'శ్రద్ధ • సేవ • సంస్కారం • సనాతన సంప్రదాయం',
    heroCtaExplore: 'క్షేత్ర దర్శనం',
    heroCtaBook: 'పూజను బుక్ చేయండి',
    heroTrust1: '12 జ్యోతిర్లింగాలు',
    heroTrust2: 'పవిత్ర గోదావరి',
    heroTrust3: 'సనాతన పరంపర',
    heroTrust4: 'వైదిక పూజా సేవ',

    quickHeadingNative: 'మీ శ్రద్ధ • మా సేవ',
    quickHeadingEng: 'మేము మీ యాత్రకు ఎలా సేవలందించగలం?',
    card1Title: 'ఆలయ దర్శనం',
    card1Desc: 'ఆలయ చరిత్ర, దర్శన సమయాలు మరియు మార్గదర్శకాలు.',
    card1Btn: 'ఆలయాన్ని వీక్షించండి',
    card2Title: 'పూజ & విధులు',
    card2Desc: 'సంప్రదాయ వైదిక పూజలు, పితృ కర్మలు మరియు రుద్రాభిషేకం.',
    card2Btn: 'పూజలను చూడండి',
    card3Title: 'గురూజీ మార్గదర్శనం',
    card3Desc: 'అనుభవజ్ఞులైన వైదిక పండితుల మార్గదర్శకత్వం పొందండి.',
    card3Btn: 'గురూజీని వెతకండి',
    card4Title: 'పూజ బుక్ చేయండి',
    card4Desc: 'మీ ఇష్టమైన విధి, శుభ తేదీ మరియు గురూజీని ఎంచుకోండి.',
    card4Btn: 'ఇప్పుడే బుక్ చేయండి',

    introEyebrow: 'పావన త్రయంబకం • పుణ్య క్షేత్రం',
    introHeading: 'పవిత్ర త్రయంబకేశ్వర దివ్య భూమి',
    introDesc: 'మహారాష్ట్రలోని నాసిక్ సమీపంలో ఉన్న త్రయంబకేశ్వరం సనాతన సంప్రదాయంలో అత్యంత మహిమాన్విత పుణ్యక్షేత్రం.',
    introCta: 'క్షేత్ర విశేషాలు తెలుసుకోండి →',

    jyotirlingaHeadingNative: 'త్రయంబకేశ్వర జ్యోతిర్లింగం',
    jyotirlingaHeadingEng: 'బ్రహ్మ, విష్ణు, మహేశ్వరుల త్రిమూర్తి స్వరూపం',
    jyotirlingaDesc: 'ఈ జ్యోతిర్లింగంలో బ్రహ్మ, విష్ణు, మహేశ్వరులు ముగ్గురూ ఏకైక లింగంలో కొలువై ఉండటం విశేషం.',
    jyotirlingaCta: 'జ్యోతిర్లింగ కథ చదవండి →',

    pujaEyebrow: 'పూజ • విధి • అనుష్ఠానం',
    pujaHeading: 'శ్రద్ధతో నిర్వహించే వైదిక పూజలు',
    pujaDesc: 'శాస్త్రోక్త పద్ధతిలో అనుభవజ్ఞులైన పురోహితుల ద్వారా నిర్వహించబడే పూజలు.',
    pujaExploreBtn: 'వివరాలు చూడండి',
    pujaBookBtn: 'పూజ బుక్ చేయండి',

    bookFlowHeadingNative: 'మీ శ్రద్ధ • మా సేవ',
    bookFlowHeadingEng: 'మీ పవిత్ర యాత్రను ప్రారంభించండి',
    bookFlowDesc: 'పూజ, తేదీ మరియు గురూజీని ఎంచుకుని సులభంగా పూజను సంకల్పించండి.',
    step1: 'విధిని ఎంచుకోండి',
    step2: 'తేదీని ఎంచుకోండి',
    step3: 'గురూజీని ఎంచుకోండి',
    step4: 'యజమాని వివరాలు',
    step5: 'బుకింగ్ నిర్ధారణ',
    bookFlowBtn: 'పూజ బుక్ చేయండి',
    talkToGurujiBtn: 'గురూజీతో మాట్లాడండి',
    trustSimple: 'సరళం • మార్గదర్శితం • పారదర్శకం',

    gurujiHeadingNative: 'సంప్రదాయ సంరక్షకులు',
    gurujiHeadingEng: 'మా ప్రామాణిక గురూజీలు',
    gurujiDesc: 'తరతరాలుగా వైదిక సంప్రదాయాన్ని కాపాడుతున్న అర్చకులు.',
    gurujiExp: 'సంవత్సరాల అనుభవం',
    gurujiViewProfile: 'ప్రొఫైల్ చూడండి',

    sacredPlacesHeadingNative: 'పావన తీర్థక్షేత్రాలు',
    sacredPlacesHeadingEng: 'త్రయంబక పరిసరాలలోని పవిత్ర స్థలాలు',

    storyHeadingNative: 'త్రయంబకేశ్వర పవిత్ర కథ',
    storyHeadingEng: 'గోదావరి అవతరణ మరియు పరమశివుని కథ',

    darshanHeadingNative: 'దర్శన సమాచారం',
    darshanHeadingEng: 'దర్శన సమయాలు & నిబంధనలు',
    reachHeadingNative: 'ఎలా చేరుకోవాలి?',
    reachHeadingEng: 'ప్రయాణ మార్గదర్శి',

    faqHeadingNative: 'తరచుగా అడిగే ప్రశ్నలు',
    faqHeadingEng: 'మీ సందేహాలకు సమాధానాలు',

    finalCtaTitle: 'శ్రద్ధతో రండి. శాంతితో మరలండి.',
    finalCtaSub: 'ఒకే ఒక విశ్వసనీయ వేదిక నుండి మీ దర్శనం మరియు పూజను బుక్ చేయండి.',

    harHarMahadev: 'హర హర మహాదేవ',
    omNamahShivaya: 'ఓం నమః శివాయ',
  },

  kn: {
    navTemple: 'ದೇವಾಲಯ ದರ್ಶನ',
    navPuja: 'ಪೂಜೆ & ವಿಧಿಗಳು',
    navGuruji: 'ಗುರೂಜಿ',
    navSacredPlaces: 'ಪವಿತ್ರ ತೀರ್ಥಗಳು',
    navFestivals: 'ಉತ್ಸವಗಳು',
    navArticles: 'ಧಾರ್ಮಿಕ ಲೇಖನಗಳು',
    navAbout: 'ಕ್ಷೇತ್ರ ಪರಿಚಯ',
    navBookPuja: 'ಪೂಜೆ ಕಾಯ್ದಿರಿಸಿ',
    navSearchPlaceholder: 'ವಿಧಿ, ಗುರೂಜಿ, ದರ್ಶನ ಹುಡುಕಿ...',

    heroSanskritInvocation: '॥ ॐ नमः शिवाय ॥',
    heroTitle: 'ಶ್ರೀ ತ್ರ್ಯಂಬಕೇಶ್ವರ ಜ್ಯೋತಿರ್ಲಿಂಗ',
    heroSubTitle: 'ಮಹಾದೇವನ ಪವಿತ್ರ ಸನ್ನಿಧಿ',
    heroDescription: 'ದ್ವಾದಶ ಜ್ಯೋತಿರ್ಲಿಂಗಗಳಲ್ಲಿ ಒಂದಾದ ಶ್ರೀ ತ್ರ್ಯಂಬಕೇಶ್ವರ, ನಾಸಿಕ್‌ನ ಬ್ರಹ್ಮಗಿರಿಯ ತಪ್ಪಲಿನಲ್ಲಿ ಪವಿತ್ರ ಗೋಧಾವರಿಯ ಉಗಮ ತಾಣ.',
    heroTagline: 'ಶ್ರದ್ಧಾ • ಸೇವಾ • ಸಂಸ್ಕಾರ • ಸನಾತನ ಪರಂಪರೆ',
    heroCtaExplore: 'ಕ್ಷೇತ್ರ ದರ್ಶನ',
    heroCtaBook: 'ಪೂಜೆ ಕಾಯ್ದಿರಿಸಿ',
    heroTrust1: '12 ಜ್ಯೋತಿರ್ಲಿಂಗಗಳು',
    heroTrust2: 'ಪವಿತ್ರ ಗೋದಾವರಿ',
    heroTrust3: 'ಸನಾತನ ಪರಂಪರೆ',
    heroTrust4: 'ವೈದಿಕ ಪೂಜಾ ಸೇವೆ',

    quickHeadingNative: 'ನಿಮ್ಮ ಶ್ರದ್ಧೆ • ನಮ್ಮ ಸೇವೆ',
    quickHeadingEng: 'ನಿಮ್ಮ ಯಾತ್ರೆಗೆ ನಾವು ಹೇಗೆ ಸೇವೆ ಸಲ್ಲಿಸಬಹುದು?',
    card1Title: 'ದೇವಾಲಯ ದರ್ಶನ',
    card1Desc: 'ದೇವಾಲಯದ ಇತಿಹಾಸ ಮತ್ತು ದರ್ಶನ ಸಮಯದ ಮಾಹಿತಿ.',
    card1Btn: 'ದೇವಾಲಯ ನೋಡಿ',
    card2Title: 'ಪೂಜೆ & ವಿಧಿಗಳು',
    card2Desc: 'ಸಾಂಪ್ರದಾಯಿಕ ವೈದಿಕ ವಿಧಿಗಳು ಮತ್ತು ರುದ್ರಾಭಿಷೇಕ.',
    card2Btn: 'ವಿಧಿಗಳನ್ನು ನೋಡಿ',
    card3Title: 'ಗುರೂಜಿ ಸಂಪರ್ಕ',
    card3Desc: 'ಅನುಭವಿ ಪುರೋಹಿತರಿಂದ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ.',
    card3Btn: 'ಗುರೂಜಿ ಹುಡುಕಿ',
    card4Title: 'ಪೂಜೆ ಕಾಯ್ದಿರಿಸಿ',
    card4Desc: 'ನಿಮ್ಮ ಇಷ್ಟದ ವಿಧಿ, ದಿನಾಂಕ ಮತ್ತು ಗುರೂಜಿ ಆಯ್ಕೆಮಾಡಿ.',
    card4Btn: 'ಈಗಲೇ ಕಾಯ್ದಿರಿಸಿ',

    introEyebrow: 'ಪಾವನ ತ್ರ್ಯಂಬಕ • ಪವಿತ್ರ ಕ್ಷೇತ್ರ',
    introHeading: 'ತ್ರ್ಯಂಬಕೇಶ್ವರದ ಪುಣ್ಯಭೂಮಿ',
    introDesc: 'ಮಹಾರಾಷ್ಟ್ರದ ನಾಸಿಕ್ ಬಳಿಯ ತ್ರ್ಯಂಬಕೇಶ್ವರವು ಹಿಂದೂ ಸಂಪ್ರದಾಯದ ಅತ್ಯಂತ ಪವಿತ್ರ ಯಾತ್ರಾಸ್ಥಳವಾಗಿದೆ.',
    introCta: 'ಕ್ಷೇತ್ರದ ವಿವರ ತಿಳಿಯಿರಿ →',

    jyotirlingaHeadingNative: 'ತ್ರ್ಯಂಬಕೇಶ್ವರ ಜ್ಯೋತಿರ್ಲಿಂಗ',
    jyotirlingaHeadingEng: 'ತ್ರಿಮೂರ್ತಿ ಸ್ವರೂಪ ಜ್ಯೋತಿರ್ಲಿಂಗ',
    jyotirlingaDesc: 'ಇಲ್ಲಿ ಬ್ರಹ್ಮ, ವಿಷ್ಣು ಮತ್ತು ಮಹೇಶ್ವರರು ಒಂದೇ ಲಿಂಗದಲ್ಲಿ ನೆಲೆಸಿರುವುದು ಈ ಕ್ಷೇತ್ರದ ಅತಿಶಯ.',
    jyotirlingaCta: 'ಕಥೆ ಓದಿ →',

    pujaEyebrow: 'ಪೂಜೆ • ವಿಧಿ • ಅನುಷ್ಠಾನ',
    pujaHeading: 'ಶ್ರದ್ಧಾಪೂರ್ವಕ ಸಾಂಪ್ರದಾಯಿಕ ಪೂಜೆಗಳು',
    pujaDesc: 'ಶಾಸ್ತ್ರೋಕ್ತವಾಗಿ ಅನುಭವಿ ವೈದಿಕರಿಂದ ನೆರವೇರಿಸಲ್ಪಡುವ ಪೂಜೆಗಳು.',
    pujaExploreBtn: 'ವಿಧಿ ವಿವರ',
    pujaBookBtn: 'ಪೂಜೆ ಕಾಯ್ದಿರಿಸಿ',

    bookFlowHeadingNative: 'ನಿಮ್ಮ ಶ್ರದ್ಧೆ • ನಮ್ಮ ಸೇವೆ',
    bookFlowHeadingEng: 'ನಿಮ್ಮ ಪುಣ್ಯ ಯಾತ್ರೆ ಆರಂಭಿಸಿ',
    bookFlowDesc: 'ವಿಧಿ, ದಿನಾಂಕ ಮತ್ತು ಗುರೂಜಿಯನ್ನು ಆಯ್ಕೆ ಮಾಡಿ ಸುಲಭವಾಗಿ ಪೂಜೆ ನಡೆಸಿ.',
    step1: 'ವಿಧಿ ಆಯ್ಕೆಮಾಡಿ',
    step2: 'ದಿನಾಂಕ ಆಯ್ಕೆಮಾಡಿ',
    step3: 'ಗುರೂಜಿ ಆಯ್ಕೆಮಾಡಿ',
    step4: 'ಯಜಮಾನ ವಿವರ',
    step5: 'ಖಚಿತಪಡಿಸಿ',
    bookFlowBtn: 'ಪೂಜೆ ಕಾಯ್ದಿರಿಸಿ',
    talkToGurujiBtn: 'ಗುರೂಜಿ ಜತೆ ಮಾತನಾಡಿ',
    trustSimple: 'ಸರಳ • ಮಾರ್ಗದರ್ಶಿತ • ಪಾರದರ್ಶಕ',

    gurujiHeadingNative: 'ಪರಂಪರೆಯ ರಕ್ಷಕರು',
    gurujiHeadingEng: 'ನಮ್ಮ ಪ್ರಮಾಣೀಕೃತ ಗುರೂಜಿಗಳು',
    gurujiDesc: 'ವೈದಿಕ ಜ್ಞಾನವುಳ್ಳ ಅನುಭವಿ ಪುರೋಹಿತರ ಸಂಪರ್ಕ ಪಡೆಯಿರಿ.',
    gurujiExp: 'ವರ್ಷಗಳ ಅನುಭವ',
    gurujiViewProfile: 'ಪ್ರೊಫೈಲ್ ನೋಡಿ',

    sacredPlacesHeadingNative: 'ಪವಿತ್ರ ತೀರ್ಥಕ್ಷೇತ್ರಗಳು',
    sacredPlacesHeadingEng: 'ತ್ರ್ಯಂಬಕದ ಸುತ್ತಮುತ್ತಲಿನ ಪುಣ್ಯಸ್ಥಳಗಳು',

    storyHeadingNative: 'ತ್ರ್ಯಂಬಕೇಶ್ವರದ ಕಥೆ',
    storyHeadingEng: 'ಗೌತಮ ಋಷಿ ಮತ್ತು ಗೋದಾವರಿಯ ಅವತರಣ',

    darshanHeadingNative: 'ದರ್ಶನ ಮಾಹಿತಿ',
    darshanHeadingEng: 'ದರ್ಶನ ಸಮಯ ಮತ್ತು ನಿಯಮಗಳು',
    reachHeadingNative: 'ತಲುಪುವುದು ಹೇಗೆ?',
    reachHeadingEng: 'ಪ್ರವಾಸ ಮಾರ್ಗದರ್ಶಿ',

    faqHeadingNative: 'ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು',
    faqHeadingEng: 'ನಿಮ್ಮ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರ',

    finalCtaTitle: 'ಶ್ರದ್ಧೆಯಿಂದ ಬನ್ನಿ. ಸ್ಮರಣೆಯೊಂದಿಗೆ ಮರಳಿ.',
    finalCtaSub: 'ಒಂದೇ ವಿಶ್ವಾಸಾರ್ಹ ವೇದಿಕೆಯಿಂದ ದರ್ಶನ ಮತ್ತು ಪೂಜೆ ಕಾಯ್ದಿರಿಸಿ.',

    harHarMahadev: 'ಹರ ಹರ ಮಹಾದೇವ',
    omNamahShivaya: 'ಓಂ ನಮಃ ಶಿವಾಯ',
  },

  ta: {
    navTemple: 'கோயில் தரிசனம்',
    navPuja: 'பூஜை & சடங்குகள்',
    navGuruji: 'குருஜி',
    navSacredPlaces: 'புனித தீர்த்தங்கள்',
    navFestivals: 'திருவிழாக்கள்',
    navArticles: 'ஆன்மீகக் கட்டுரைகள்',
    navAbout: 'தல வரலாறு',
    navBookPuja: 'பூஜை பதிவு செய்',
    navSearchPlaceholder: 'பூஜை, குருஜி, தரிசனம் தேடுக...',

    heroSanskritInvocation: '॥ ॐ नमः शिवाय ॥',
    heroTitle: 'ஸ்ரீ த்ரயம்பகேஸ்வரர் ஜோதிர்லிங்கம்',
    heroSubTitle: 'மகாதேவனின் புனித ஆலயம்',
    heroDescription: 'பன்னிரு ஜோதிர்லிங்கங்களில் ஒன்றான ஸ்ரீ த்ரயம்பகேஸ்வரர், பிரம்மகிரி மலையடிவாரத்தில் புனித கோதாவரி நதிக்கரையில் அமைந்துள்ள புனித தலம்.',
    heroTagline: 'பக்தி • சேவை • கலாச்சாரம் • சனாதன மரபு',
    heroCtaExplore: 'தரிசனம் காண்க',
    heroCtaBook: 'பூஜை பதிவு செய்',
    heroTrust1: '12 ஜோதிர்லிங்கங்கள்',
    heroTrust2: 'புனித கோதாவரி',
    heroTrust3: 'சனாதன பாரம்பரியம்',
    heroTrust4: 'வேத பூஜை சேவை',

    quickHeadingNative: 'உங்கள் பக்தி • எங்கள் சேவை',
    quickHeadingEng: 'உங்கள் புனித யாத்திரைக்கு நாங்கள் எவ்வாறு உதவலாம்?',
    card1Title: 'கோயில் தரிசனம்',
    card1Desc: 'கோயில் வரலாறு மற்றும் தரிசன நேரங்கள் குறித்த தகவல்.',
    card1Btn: 'கோயிலை காண்க',
    card2Title: 'பூஜை & சடங்குகள்',
    card2Desc: 'பாரம்பரிய வேத சடங்குகள் மற்றும் ருத்ராபிஷேகம்.',
    card2Btn: 'சடங்குகளை காண்க',
    card3Title: 'குருஜி தொடர்பு',
    card3Desc: 'அனுபவம் வாய்ந்த வேத புரோகிதர்களிடம் வழிகாட்டல் பெறவும்.',
    card3Btn: 'குருஜியை தேடுக',
    card4Title: 'பூஜை பதிவு செய்',
    card4Desc: 'உங்கள் பூஜை, சுப நாள் மற்றும் குருஜியை தேர்வு செய்க.',
    card4Btn: 'இப்போதே பதிவு செய்',

    introEyebrow: 'புனித த்ரயம்பகம் • புண்ணிய தலம்',
    introHeading: 'த்ரயம்பகேஸ்வரரின் புனித பூமி',
    introDesc: 'மகாராஷ்டிராவில் நாசிக் அருகில் அமைந்துள்ள த்ரயம்பகேஸ்வரம் சனாதன பாரம்பரியத்தின் மிக முக்கிய புண்ணிய தலமாகும்.',
    introCta: 'புனித தலத்தை அறிக →',

    jyotirlingaHeadingNative: 'த்ரயம்பகேஸ்வரர் ஜோதிர்லிங்கம்',
    jyotirlingaHeadingEng: 'மும்மூர்த்தி சொரூப ஜோதிர்லிங்கம்',
    jyotirlingaDesc: 'இங்கு பிரம்மா, விஷ்ணு மற்றும் ருத்ரன் மூவரும் ஒரே லிங்க திருமேனியில் காட்சி தருவது தனிச்சிறப்பு.',
    jyotirlingaCta: 'வரலாறு படிக்க →',

    pujaEyebrow: 'பூஜை • சடங்கு • அனுஷ்டானம்',
    pujaHeading: 'பக்தியுடன் நிறைவேற்றப்படும் வேத பூஜைகள்',
    pujaDesc: 'சாஸ்திர முறைப்படி சிறந்த புரோகிதர்களால் நடத்தப்படும் பூஜைகள்.',
    pujaExploreBtn: 'விவரம் காண்க',
    pujaBookBtn: 'பூஜை பதிவு செய்',

    bookFlowHeadingNative: 'உங்கள் பக்தி • எங்கள் சேவை',
    bookFlowHeadingEng: 'உங்கள் புனித பயணத்தை தொடங்குங்கள்',
    bookFlowDesc: 'பூஜை, நாள் மற்றும் குருஜியை தேர்ந்தெடுத்து சுலபமாக பதிவு செய்யுங்கள்.',
    step1: 'பூஜையை தேர்வு செய்க',
    step2: 'தேதியை தேர்வு செய்க',
    step3: 'குருஜியை தேர்வு செய்க',
    step4: 'பக்தர் விவரம்',
    step5: 'உறுதிப்படுத்தல்',
    bookFlowBtn: 'பூஜை பதிவு செய்',
    talkToGurujiBtn: 'குருஜியிடம் பேசுக',
    trustSimple: 'எளியது • வழிகாட்டப்பட்டது • வெளிப்படையானது',

    gurujiHeadingNative: 'பாரம்பரிய காவலர்கள்',
    gurujiHeadingEng: 'எங்கள் வேத குருஜிக்கள்',
    gurujiDesc: 'தலைமுறை தலைமுறையாக வேத நெறியை காக்கும் புரோகிதர்கள்.',
    gurujiExp: 'ஆண்டுகள் அனுபவம்',
    gurujiViewProfile: 'சுயவிவரம் காண்க',

    sacredPlacesHeadingNative: 'புனித தீர்த்தங்கள்',
    sacredPlacesHeadingEng: 'த்ரயம்பகத்தை சுற்றியுள்ள புனித தலங்கள்',

    storyHeadingNative: 'த்ரயம்பகேஸ்வரர் வரலாறு',
    storyHeadingEng: 'கௌதம முனிவர் மற்றும் கோதாவரி தோற்றம்',

    darshanHeadingNative: 'தரிசன தகவல்',
    darshanHeadingEng: 'தரிசன நேரம் மற்றும் விதிகள்',
    reachHeadingNative: 'செல்வது எப்படி?',
    reachHeadingEng: 'பயண வழிகாட்டி',

    faqHeadingNative: 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
    faqHeadingEng: 'உங்கள் சந்தேகங்களுக்கான விடைகள்',

    finalCtaTitle: 'பக்தியுடன் வாருங்கள். மன நிம்மதியுடன் திரும்புங்கள்.',
    finalCtaSub: 'ஒரே நம்பகமான தளத்தில் உங்கள் தரிசனம் மற்றும் பூஜையை பதிவு செய்யுங்கள்.',

    harHarMahadev: 'ஹர ஹர மகாதேவா',
    omNamahShivaya: 'ஓம் நம சிவாய',
  },

  bn: {
    navTemple: 'মন্দির দর্শন',
    navPuja: 'পূজা ও বিধি',
    navGuruji: 'গুরুজি',
    navSacredPlaces: 'পবিত্র তীর্থ',
    navFestivals: 'উৎসব ও মেলা',
    navArticles: 'আধ্যাত্মিক প্রবন্ধ',
    navAbout: 'ক্ষেত্র পরিচয়',
    navBookPuja: 'পূজা বুক করুন',
    navSearchPlaceholder: 'বিধি, গুরুজি, দর্শন অনুসন্ধান করুন...',

    heroSanskritInvocation: '॥ ॐ नमः शिवाय ॥',
    heroTitle: 'শ্রী ত্র্যম্বকেশ্বর জ্যোতির্লিঙ্গ',
    heroSubTitle: 'মহাদেবের পরম পবিত্র ধাম',
    heroDescription: 'মহারাষ্ট্রের নাসিকে ব্রহ্মগিরির পাদদেশে পবিত্র গোদাবরীর উৎসে অবস্থিত ভগবান শিবের দ্বাদশ জ্যোতির্লিঙ্গের অন্যতম মহাপীঠ।',
    heroTagline: 'শ্রদ্ধা • সেবা • সংস্কার • সনাতন পরম্পরা',
    heroCtaExplore: 'ত্র্যম্বকেশ্বর দর্শন',
    heroCtaBook: 'পূজা বুক করুন',
    heroTrust1: 'দ্বাদশ জ্যোতির্লিঙ্গ',
    heroTrust2: 'পবিত্র গোদাবরী',
    heroTrust3: 'সনাতন পরম্পরা',
    heroTrust4: 'বৈদিক পূজা সেবা',

    quickHeadingNative: 'আপনার শ্রদ্ধা • আমাদের সেবা',
    quickHeadingEng: 'আপনার তীর্থযাত্রায় আমরা কীভাবে সেবা করতে পারি?',
    card1Title: 'মন্দির দর্শন',
    card1Desc: 'পবিত্র মন্দির, ইতিহাস ও দর্শনের সময়সূচির পূর্ণ বিবরণ।',
    card1Btn: 'মন্দির দেখুন',
    card2Title: 'পূজা ও বিধি',
    card2Desc: 'সনাতন বৈদিক পূজা, পিতৃ শান্তি ও রুদ্রাভিষেক বিধি।',
    card2Btn: 'পূজা দেখুন',
    card3Title: 'গুরুজি সংযোগ',
    card3Desc: 'অভিজ্ঞ বৈদিক পুরোহিতদের সাথে যোগাযোগ ও নির্দেশনা।',
    card3Btn: 'গুরুজি খুঁজুন',
    card4Title: 'পূজা বুক করুন',
    card4Desc: 'আপনার পছন্দের পূজা, শুভ তিথি ও গুরুজি নির্বাচন করুন।',
    card4Btn: 'এখনই বুক করুন',

    introEyebrow: 'পাবন ত্র্যম্বক • পবিত্র তীর্থক্ষেত্র',
    introHeading: 'ত্র্যম্বকেশ্বরের পুণ্যভূমি',
    introDesc: 'নাসিকের সন্নিকটে অবস্থিত ত্র্যম্বকেশ্বর হিন্দু সনাতন সংস্কৃতির অন্যতম শীর্ষ তীর্থস্থান।',
    introCta: 'তীর্থ জানুন →',

    jyotirlingaHeadingNative: 'ত্র্যম্বকেশ্বর জ্যোতির্লিঙ্গ',
    jyotirlingaHeadingEng: 'ব্রহ্মা, বিষ্ণু ও মহেশ্বরের ত্রিমূর্তি রূপ',
    jyotirlingaDesc: 'এই জ্যোতির্লিঙ্গে ব্রহ্মা, বিষ্ণু ও মহেশ একই শিবলিঙ্গে ত্রিমূর্তি রূপে বিরাজমান।',
    jyotirlingaCta: 'জ্যোতির্লিঙ্গ কথা পড়ুন →',

    pujaEyebrow: 'পূজা • বিধি • অনুষ্ঠান',
    pujaHeading: 'শ্রদ্ধাপূর্ণ বৈদিক পূজাসমূহ',
    pujaDesc: 'শাস্ত্রসম্মত নিয়মে শাস্ত্রজ্ঞ পুরোহিতদের দ্বারা সম্পন্ন পূজা।',
    pujaExploreBtn: 'বিধি দেখুন',
    pujaBookBtn: 'পূজা বুক করুন',

    bookFlowHeadingNative: 'আপনার শ্রদ্ধা • আমাদের সেবা',
    bookFlowHeadingEng: 'আপনার পবিত্র যাত্রা শুরু করুন',
    bookFlowDesc: 'পূজা, তিথি ও গুরুজি বেছে নিয়ে সহজে পূজা নিশ্চিত করুন।',
    step1: 'পূজা বাছুন',
    step2: 'তিথি বাছুন',
    step3: 'গুরুজি বাছুন',
    step4: 'যজমান তথ্য',
    step5: 'বুকিং নিশ্চিতকরণ',
    bookFlowBtn: 'পূজা বুক করুন',
    talkToGurujiBtn: 'গুরুজির সাথে কথা বলুন',
    trustSimple: 'সহজ • পরিচালিত • স্বচ্ছ',

    gurujiHeadingNative: 'পরম্পরার ধারক',
    gurujiHeadingEng: 'আমাদের প্রামাণ্য গুরুজিগণ',
    gurujiDesc: 'বংশপরম্পরায় বৈদিক জ্ঞান ধারণকারী শ্রদ্ধেয় পুরোহিতবৃন্দ।',
    gurujiExp: 'বছরের অভিজ্ঞতা',
    gurujiViewProfile: 'প্রোফাইল দেখুন',

    sacredPlacesHeadingNative: 'পবিত্র তীর্থস্থান',
    sacredPlacesHeadingEng: 'ত্র্যম্বকেশ্বরের চারপাশের পুণ্যস্থান',

    storyHeadingNative: 'ত্র্যম্বকেশ্বরের পুণ্যকথা',
    storyHeadingEng: 'গৌতম ঋষি ও গোদাবরী অবতরণ',

    darshanHeadingNative: 'দর্শন তথ্য',
    darshanHeadingEng: 'দর্শন সময় ও নিয়মাবলী',
    reachHeadingNative: 'কীভাবে পৌঁছাবেন?',
    reachHeadingEng: 'ভ্রমণ নির্দেশিকা',

    faqHeadingNative: 'সাধারণ প্রশ্নোত্তর',
    faqHeadingEng: 'আপনার প্রশ্নের সমাধান',

    finalCtaTitle: 'শ্রদ্ধা নিয়ে আসুন। শান্তি নিয়ে ফিরুন।',
    finalCtaSub: 'একমাত্র বিশ্বস্ত প্ল্যাটফর্ম থেকে দর্শন ও পূজা বুক করুন।',

    harHarMahadev: 'হর হর মহাদেব',
    omNamahShivaya: 'ওঁ নমঃ শিবায়',
  },

  or: {
    navTemple: 'ମନ୍ଦିର ଦର୍ଶନ',
    navPuja: 'ପୂଜା ଓ ବିଧି',
    navGuruji: 'ଗୁରୁଜୀ',
    navSacredPlaces: 'ପବିତ୍ର ତୀର୍ଥ',
    navFestivals: 'ଉତ୍ସବ',
    navArticles: 'ଆଧ୍ୟାତ୍ମିକ ଲେଖା',
    navAbout: 'କ୍ଷେତ୍ର ପରିଚୟ',
    navBookPuja: 'ପୂଜା ବୁକ୍ କରନ୍ତୁ',
    navSearchPlaceholder: 'ବିଧି, ଗୁରୁଜୀ, ଦର୍ଶନ ଖୋଜନ୍ତୁ...',

    heroSanskritInvocation: '॥ ॐ नमः शिवाय ॥',
    heroTitle: 'ଶ୍ରୀ ତ୍ର୍ୟମ୍ବକେଶ୍ୱର ଜ୍ୟୋତିର୍ଲିଙ୍ଗ',
    heroSubTitle: 'ମହାଦେବଙ୍କ ପବିତ୍ର ଧାମ',
    heroDescription: 'ମହାରାଷ୍ଟ୍ରର ନାସିକ ନିକଟସ୍ଥ ବ୍ରହ୍ମଗିରି କୋଳରେ ପବିତ୍ର ଗୋଦାବରୀ ଉତ୍ସସ୍ଥଳରେ ଅବସ୍ଥିତ ଦ୍ୱାଦଶ ଜ୍ୟୋତିର୍ଲିଙ୍ଗ ମଧ୍ୟରୁ ଅନ୍ୟତମ।',
    heroTagline: 'ଶ୍ରଦ୍ଧା • ସେବା • ସଂସ୍କାର • ସନାତନ ପରମ୍ପରା',
    heroCtaExplore: 'କ୍ଷେତ୍ର ଦର୍ଶନ',
    heroCtaBook: 'ପୂଜା ବୁକ୍ କରନ୍ତୁ',
    heroTrust1: 'ଦ୍ୱାଦଶ ଜ୍ୟୋତିର୍ଲିଙ୍ଗ',
    heroTrust2: 'ପବିତ୍ର ଗୋଦାବରୀ',
    heroTrust3: 'ସନାତନ ପରମ୍ପରା',
    heroTrust4: 'ବୈଦିକ ପୂଜା ସେବା',

    quickHeadingNative: 'ଆପଣଙ୍କ ଶ୍ରଦ୍ଧା • ଆମର ସେବା',
    quickHeadingEng: 'ଆପଣଙ୍କ ତୀର୍ଥଯାତ୍ରାରେ ଆମେ କିପରି ସେବା କରିପାରିବା?',
    card1Title: 'ମନ୍ଦିର ଦର୍ଶନ',
    card1Desc: 'ପବିତ୍ର ମନ୍ଦିର, ଇତିହାସ ଓ ଦର୍ଶନ ସମୟର ସମ୍ପୂର୍ଣ୍ଣ ବିବରଣୀ।',
    card1Btn: 'ମନ୍ଦିର ଦେଖନ୍ତୁ',
    card2Title: 'ପୂଜା ଓ ବିଧି',
    card2Desc: 'ପାରମ୍ପରିକ ବୈଦିକ ବିଧି, ପିତୃ ଶାନ୍ତି ଏବଂ ରୁଦ୍ରାଭିଷେକ।',
    card2Btn: 'ବିଧି ଦେଖନ୍ତୁ',
    card3Title: 'ଗୁରୁଜୀଙ୍କ ସମ୍ପର୍କ',
    card3Desc: 'ଅଭିଜ୍ଞ ବୈଦିକ ପୁରୋହିତଙ୍କ ମାର୍ଗଦର୍ଶନ ନିଅନ୍ତୁ।',
    card3Btn: 'ଗୁରୁଜୀ ଖୋଜନ୍ତୁ',
    card4Title: 'ପୂଜା ବୁକ୍ କରନ୍ତୁ',
    card4Desc: 'ନିଜର ପସନ୍ଦର ପୂଜା, ଶୁଭ ତିଥି ଓ ଗୁରୁଜୀ ବାଛନ୍ତୁ।',
    card4Btn: 'ବର୍ତ୍ତମାନ ବୁକ୍ କରନ୍ତୁ',

    introEyebrow: 'ପାବନ ତ୍ର୍ୟମ୍ବକ • ତୀର୍ଥକ୍ଷେତ୍ର',
    introHeading: 'ତ୍ର୍ୟମ୍ବକେଶ୍ୱରର ପବିତ୍ର ଭୂମି',
    introDesc: 'ମହାରାଷ୍ଟ୍ରର ନାସିକ ନିକଟରେ ଥିବା ତ୍ର୍ୟମ୍ବକେଶ୍ୱର ସନାତନ ଧର୍ମର ଏକ ଅତ୍ୟନ୍ତ ପବିତ୍ର ତୀର୍ଥକ୍ଷେତ୍ର ଅଟେ।',
    introCta: 'କ୍ଷେତ୍ର ବିଷୟରେ ଜାଣନ୍ତୁ →',

    jyotirlingaHeadingNative: 'ତ୍ର୍ୟମ୍ବକେଶ୍ୱର ଜ୍ୟୋତିର୍ଲିଙ୍ଗ',
    jyotirlingaHeadingEng: 'ବ୍ରହ୍ମା, ବିଷ୍ଣୁ ଓ ମହେଶ୍ୱରଙ୍କ ତ୍ରିମୂର୍ତ୍ତି ସ୍ୱରୂପ',
    jyotirlingaDesc: 'ଏହି ଜ୍ୟୋତିର୍ଲିଙ୍ଗରେ ବ୍ରହ୍ମା, ବିଷ୍ଣୁ ଏବଂ ମହେଶ ଏକାଠି ଏକ ଶିବଲିଙ୍ଗରେ ବିରାଜମାନ କରନ୍ତି।',
    jyotirlingaCta: 'ଜ୍ୟୋତିର୍ଲିଙ୍ଗ କଥା ପଢ଼ନ୍ତୁ →',

    pujaEyebrow: 'ପୂଜା • ବିଧି • ଅନୁଷ୍ଠାନ',
    pujaHeading: 'ଶ୍ରଦ୍ଧାର ସହ ସମ୍ପନ୍ନ ବୈଦିକ ପୂଜା',
    pujaDesc: 'ଶାସ୍ତ୍ରୋକ୍ତ ନିୟମ ଅନୁସାରେ ଅଭିଜ୍ଞ ପୁରୋହିତଙ୍କ ଦ୍ୱାରା ପରିଚାଳିତ ବିଧି।',
    pujaExploreBtn: 'ବିବରଣୀ ଦେଖନ୍ତୁ',
    pujaBookBtn: 'ପୂଜା ବୁକ୍ କରନ୍ତୁ',

    bookFlowHeadingNative: 'ଆପଣଙ୍କ ଶ୍ରଦ୍ଧା • ଆମର ସେବା',
    bookFlowHeadingEng: 'ନିଜର ପବିତ୍ର ଯାତ୍ରା ଆରମ୍ଭ କରନ୍ତୁ',
    bookFlowDesc: 'ପୂଜା, ତାରିଖ ଓ ଗୁରୁଜୀ ବାଛି ସହଜରେ ପୂଜା ସମ୍ପନ୍ନ କରନ୍ତୁ।',
    step1: 'ପୂଜା ବାଛନ୍ତୁ',
    step2: 'ତାରିଖ ବାଛନ୍ତୁ',
    step3: 'ଗୁରୁଜୀ ବାଛନ୍ତୁ',
    step4: 'ଯଜମାନ ବିବରଣୀ',
    step5: 'ନିଶ୍ଚିତକରଣ',
    bookFlowBtn: 'ପୂଜା ବୁକ୍ କରନ୍ତୁ',
    talkToGurujiBtn: 'ଗୁରୁଜୀଙ୍କ ସହ କଥା ହୁଅନ୍ତୁ',
    trustSimple: 'ସରଳ • ମାର୍ଗଦର୍ଶିତ • ସ୍ୱଚ୍ଛ',

    gurujiHeadingNative: 'ପରମ୍ପରାର ରକ୍ଷକ',
    gurujiHeadingEng: 'ଆମର ପ୍ରାମାଣିକ ଗୁରୁଜୀ',
    gurujiDesc: 'ବଂଶାନୁକ୍ରମିକ ବୈଦିକ ପରମ୍ପରା ରକ୍ଷା କରୁଥିବା ପୁରୋହିତ।',
    gurujiExp: 'ବର୍ଷର ଅନୁଭବ',
    gurujiViewProfile: 'ପ୍ରୋଫାଇଲ୍ ଦେଖନ୍ତୁ',

    sacredPlacesHeadingNative: 'ପବିତ୍ର ତୀର୍ଥକ୍ଷେତ୍ର',
    sacredPlacesHeadingEng: 'ତ୍ର୍ୟମ୍ବକ ଆଖପାଖର ପବିତ୍ର ସ୍ଥାନ',

    storyHeadingNative: 'ତ୍ର୍ୟମ୍ବକେଶ୍ୱରର କଥା',
    storyHeadingEng: 'ଗୌତମ ଋଷି ଏବଂ ଗୋଦାବରୀଙ୍କ ଉତ୍ପତ୍ତି',

    darshanHeadingNative: 'ଦର୍ଶନ ସୂଚନା',
    darshanHeadingEng: 'ଦର୍ଶନ ସମୟ ଓ ନିୟମାବଳୀ',
    reachHeadingNative: 'କିପରି ପହଞ୍ଚିବେ?',
    reachHeadingEng: 'ଯାତ୍ରା ନିର୍ଦ୍ଦେଶିକା',

    faqHeadingNative: 'ସାଧାରଣ ପ୍ରଶ୍ନୋତ୍ତର',
    faqHeadingEng: 'ଆପଣଙ୍କ ପ୍ରଶ୍ନର ଉତ୍ତର',

    finalCtaTitle: 'ଶ୍ରଦ୍ଧାର ସହ ଆସନ୍ତୁ। ଶାନ୍ତିର ସହ ଫେରନ୍ତୁ।',
    finalCtaSub: 'ଗୋଟିଏ ବିଶ୍ୱସ୍ତ ମଞ୍ଚରୁ ନିଜର ଦର୍ଶନ ଓ ପୂଜା ବୁକ୍ କରନ୍ତୁ।',

    harHarMahadev: 'ହର ହର ମହାଦେବ',
    omNamahShivaya: 'ଓଁ ନମଃ ଶିବାୟ',
  },
};
