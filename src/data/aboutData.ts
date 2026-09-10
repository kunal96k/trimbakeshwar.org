// CMS Data and Multi-lingual Data Architecture for About Us / Purohit Sangh / Tradition

export interface AboutValue {
  id: string;
  sanskrit: string;
  english: string;
  marathi: string;
  hindi: string;
  description: string;
  icon: string;
}

export interface VerificationLevel {
  id: string;
  title: string;
  marathiTitle: string;
  status: 'Verified' | 'Under Review' | 'Information Pending' | 'Organization Provided';
  badgeColor: string;
  description: string;
}

export interface AboutFaq {
  id: string;
  question: {
    en: string;
    mr: string;
    hi: string;
  };
  answer: {
    en: string;
    mr: string;
    hi: string;
  };
}

export interface OrganizationInfo {
  name: string;
  nativeName: string;
  registrationClaim: string;
  purohitCountClaim: string;
  verificationStatus: 'Verified' | 'Organization Provided' | 'Pending Verification';
  verifiedBy: string;
  officialAddress: string;
  backOfficeAddress: string;
  helpline: string;
  email: string;
  officeHours: string;
  disclaimer: string;
}

export const ORGANIZATION_DATA: OrganizationInfo = {
  name: 'Shri Trimbakeshwar Purohit Sangh & Seva Portal',
  nativeName: 'श्री त्र्यंबकेश्वर पुरोहित संघ व सेवा मंच',
  registrationClaim: 'Reg. / Cert. Ref: Y203-215 (As published by Purohit Sangh)',
  purohitCountClaim: 'Represents approximately 300 traditional Purohit families (Organization-provided data)',
  verificationStatus: 'Organization Provided',
  verifiedBy: 'Local Purohit Sangh Documentation / Subject to verification',
  officialAddress: 'Shri Ganga Godavari Mandir, 1st Floor, Kushavart Tirth Chowk, Trimbakeshwar, Dist. Nashik, Maharashtra - 422212',
  backOfficeAddress: 'Nashik-Trimbak Road, Dist. Nashik, Maharashtra - 422009',
  helpline: '+91 2594 222 108 / +91 98220 11008',
  email: 'seva@trimbakeshwar-jyotirlinga.org',
  officeHours: '06:00 AM to 08:30 PM (All 7 Days)',
  disclaimer: 'This platform serves as a transparent digital communication bridge between pilgrims and listed traditional Purohits. The portal does not conduct rituals directly; religious rites are performed by independent, verified Purohits according to Shastra traditions.',
};

export const ABOUT_VALUES: AboutValue[] = [
  {
    id: 'shraddha',
    sanskrit: 'श्रद्धा',
    english: 'Faith & Devotion',
    marathi: 'श्रद्धा व भक्ती',
    hindi: 'श्रद्धा एवं भक्ति',
    description: 'Deep reverence for Bhagwan Trimbakeshwar, Gautami Godavari, and ancient Vedic wisdom.',
    icon: 'trishul',
  },
  {
    id: 'seva',
    sanskrit: 'सेवा',
    english: 'Selfless Service',
    marathi: 'निःस्वार्थ सेवा',
    hindi: 'निःस्वार्थ सेवा',
    description: 'Guiding every pilgrim with humility, patience, and transparent hospitality.',
    icon: 'pranam',
  },
  {
    id: 'sanskar',
    sanskrit: 'संस्कार',
    english: 'Sacred Ritual Values',
    marathi: 'पवित्र संस्कार',
    hindi: 'पवित्र संस्कार',
    description: 'Honoring customary Shastra mandates and pure Vedic chants in every Sankalp.',
    icon: 'om',
  },
  {
    id: 'parampara',
    sanskrit: 'परंपरा',
    english: 'Living Lineage',
    marathi: 'जिवंत परंपरा',
    hindi: 'जीवंत परंपरा',
    description: 'Preserving hereditary Purohit learning passed unbroken through generations.',
    icon: 'scroll',
  },
  {
    id: 'gyan',
    sanskrit: 'ज्ञान',
    english: 'Spiritual Knowledge',
    marathi: 'अध्यात्म ज्ञान',
    hindi: 'आध्यात्मिक ज्ञान',
    description: 'Educating devotees with authentic Puranic history, Vidhi rules, and clarity.',
    icon: 'vedic',
  },
  {
    id: 'transparency',
    sanskrit: 'पारदर्शकता',
    english: 'Integrity & Transparency',
    marathi: 'पारदर्शकता व सत्य',
    hindi: 'पारदर्शिता एवं सत्य',
    description: 'Clear information on Samagri, procedures, and credentials without middlemen.',
    icon: 'temple',
  },
];

export const VERIFICATION_LEVELS: VerificationLevel[] = [
  {
    id: 'profile-verified',
    title: 'Profile & Contact Verified',
    marathiTitle: 'प्रोफाइल व संपर्क पडताळणी',
    status: 'Verified',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: 'Identity documentation and local Trimbakeshwar residence confirmation completed.',
  },
  {
    id: 'purohit-info',
    title: 'Purohit Lineage & Experience',
    marathiTitle: 'पुरोहित घराणे व अनुभव नोंद',
    status: 'Verified',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: 'Vedic schooling (Ved Pathshala) and traditional family practice record verified.',
  },
  {
    id: 'tamrapatra-info',
    title: 'Tamrapatra Record Submission',
    marathiTitle: 'ताम्रपत्र नोंद सादर',
    status: 'Organization Provided',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    description: 'Family copper plate / hereditary reference submitted for administrative review.',
  },
  {
    id: 'organization-auth',
    title: 'Purohit Sangh Membership',
    marathiTitle: 'पुरोहित संघ नोंदणी',
    status: 'Organization Provided',
    badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
    description: 'Listed in the community registry based on organizational documentation.',
  },
];

export const PLATFORM_PILLARS = [
  {
    step: '01',
    title: 'Accessible Information',
    marathiTitle: 'सुलभ माहिती',
    description: 'Centralized repository of temple darshan timings, dress code, and rituals.',
    icon: 'BookOpen',
  },
  {
    step: '02',
    title: 'Transparent Guruji Profiles',
    marathiTitle: 'पारदर्शक गुरुजी प्रोफाइल',
    description: 'Direct visibility into Guruji experience, languages, and traditional specializations.',
    icon: 'Users',
  },
  {
    step: '03',
    title: 'Shastric Puja Knowledge',
    marathiTitle: 'शास्त्राधारित पूजा ज्ञान',
    description: 'In-depth procedural guides on Narayan Nagbali, Kaal Sarp Yog, and Tripindi.',
    icon: 'Flame',
  },
  {
    step: '04',
    title: '10 Indian Languages',
    marathiTitle: 'बहुभाषिक सहाय्य',
    description: 'Multilingual access so devotees from all regions can prepare without confusion.',
    icon: 'Languages',
  },
  {
    step: '05',
    title: 'Direct Devotee-Guruji Contact',
    marathiTitle: 'थेट संपर्क व्यवस्था',
    description: 'No commercial brokers or unverified touts—connect directly with certified Purohits.',
    icon: 'PhoneCall',
  },
  {
    step: '06',
    title: 'Hassle-Free Booking Request',
    marathiTitle: 'सुलभ विधी नोंदणी',
    description: 'Submit dates, Gotra, and family requirements smoothly prior to arrival in Trimbak.',
    icon: 'CalendarCheck',
  },
];

export const DIGITAL_BRIDGE_STEPS = [
  {
    id: 'step-1',
    actor: 'DEVOTEE',
    actorNative: 'श्रद्धालू भक्त',
    action: 'Discover',
    actionNative: 'शोध व माहिती',
    description: 'Devotee learns about Trimbakeshwar Jyotirlinga, sacred Kunds, and authentic Vidhi requirements.',
  },
  {
    id: 'step-2',
    actor: 'KNOWLEDGE',
    actorNative: 'शास्त्र ज्ञान',
    action: 'Understand',
    actionNative: 'नियम व प्रक्रिया',
    description: 'Reviews Muhurta dates, dress etiquette, number of days required, and ancestral details.',
  },
  {
    id: 'step-3',
    actor: 'PLATFORM',
    actorNative: 'डिजिटल दुवा',
    action: 'Connect',
    actionNative: 'थेट संवाद',
    description: 'Devotee explores verified Guruji profiles and sends a direct inquiry.',
  },
  {
    id: 'step-4',
    actor: 'GURUJI / PUROHIT',
    actorNative: 'अधिकृत गुरुजी',
    action: 'Guide & Consult',
    actionNative: 'मार्गदर्शन व संकल्प',
    description: 'Guruji reviews family Gotra, confirms Muhurta, explains Samagri, and schedules the Vidhi.',
  },
  {
    id: 'step-5',
    actor: 'SACRED SEVA',
    actorNative: 'विधी व समाधान',
    action: 'Complete Puja',
    actionNative: 'विधी संपन्न',
    description: 'Devotee arrives at Trimbakeshwar and undergoes the authentic Shastra-prescribed ritual.',
  },
];

export const ABOUT_FAQS: AboutFaq[] = [
  {
    id: 'faq-1',
    question: {
      en: 'What is Trimbakeshwar Purohit Sangh?',
      mr: 'त्र्यंबकेश्वर पुरोहित संघ म्हणजे काय?',
      hi: 'त्र्यंबकेश्वर पुरोहित संघ क्या है?',
    },
    answer: {
      en: 'Trimbakeshwar Purohit Sangh represents the traditional community and committee of hereditary Vedic Purohits residing in Trimbakeshwar who have guided pilgrims through Shastra-prescribed rituals for centuries.',
      mr: 'त्र्यंबकेश्वर पुरोहित संघ हे त्र्यंबकेश्वरमध्ये परंपरेने निवास करणाऱ्या आणि पिढ्यानपिढ्या भक्तांना शास्त्रोक्त विधींमध्ये मार्गदर्शन करणाऱ्या स्थानिक वैदिक पुरोहितांची संघटना व समिती आहे.',
      hi: 'त्र्यंबकेश्वर पुरोहित संघ त्र्यंबकेश्वर में पीढ़ियों से निवास करने वाले पारंपरिक वैदिक पुरोहितों का एक संगठन है जो तीर्थयात्रियों को शास्त्रसम्मत पूजा-अनुष्ठानों में मार्गदर्शन करते हैं।',
    },
  },
  {
    id: 'faq-2',
    question: {
      en: 'What is the significance of Tamrapatra in Trimbakeshwar tradition?',
      mr: 'त्र्यंबकेश्वर परंपरेत ताम्रपत्राचे काय महत्त्व आहे?',
      hi: 'त्र्यंबकेश्वर परंपरा में ताम्रपत्र का क्या महत्व है?',
    },
    answer: {
      en: 'According to the published information of the Purohit Sangh, Tamrapatra refers to historical copper-plate inscriptions that record traditional service allocations and family lineages. On this platform, Tamrapatra references are treated as organization-provided documentation subject to review.',
      mr: 'पुरोहित संघाच्या माहितीनुसार, ताम्रपत्र म्हणजे ऐतिहासिक तांब्याच्या पट्ट्यांवरील नोंदी ज्या वंशपरंपरेने चालत आलेल्या सेवा आणि अधिकारांचे प्रतीक मानल्या जातात. या डिजिटल मंचावर ताम्रपत्राची माहिती पडताळणीयोग्य कागदपत्र म्हणून नोंदवली जाते.',
      hi: 'पुरोहित संघ के अनुसार, ताम्रपत्र ऐतिहासिक तांबे के पत्रों पर उत्कीर्ण लेख हैं जो पुरोहितों की वंशावली और पारंपरिक सेवा अधिकारों को दर्शाते हैं। इस पोर्टल पर यह जानकारी संस्थागत दस्तावेज़ के रूप में दर्ज की जाती है।',
    },
  },
  {
    id: 'faq-3',
    question: {
      en: 'What is the historical tradition of Namavali registers?',
      mr: 'नामावली परंपरेचे स्वरूप काय आहे?',
      hi: 'नामावली परंपरा का क्या स्वरूप है?',
    },
    answer: {
      en: 'Namavali refers to the ancient handwritten pilgrim ledger books maintained by Purohit families over generations, recording the names, Gotras, native places, and visit dates of Yajmans. Devotee privacy is strictly respected, and private family entries are never made public without permission.',
      mr: 'नामावली म्हणजे पुरोहित घराण्यांनी पिढ्यानपिढ्या जपून ठेवलेल्या ऐतिहासिक हस्तलिखित वह्या, ज्यामध्ये देशभरातून आलेल्या यजमानांचे नाव, गोत्र आणि गाव नोंदवलेले असते. भक्तांच्या खाजगी नोंदींची गोपनीयता काटेकोरपणे राखली जाते.',
      hi: 'नामावली पुरोहित परिवारों द्वारा पीढ़ियों से सुरक्षित रखी गई वह हस्तलिखित बहियां हैं जिनमें यजमानों के नाम, गोत्र और निवास स्थान का विवरण दर्ज होता है। भक्तों की व्यक्तिगत गोपनीयता का पूर्ण सम्मान किया जाता है।',
    },
  },
  {
    id: 'faq-4',
    question: {
      en: 'How does this platform connect devotees with Gurujis?',
      mr: 'हे डिजिटल व्यासपीठ भक्तांना गुरुजींशी कसे जोडते?',
      hi: 'यह डिजिटल मंच भक्तों को गुरुजी से कैसे जोड़ता है?',
    },
    answer: {
      en: 'The platform acts as a transparent digital bridge where devotees can view verified Guruji profiles, their traditional experience, spoken languages, and contact channels to consult directly regarding Vidhi Muhurta and preparation.',
      mr: 'हे व्यासपीठ एक पारदर्शक माध्यम म्हणून कार्य करते, जेथे भाविक पडताळणी केलेले गुरुजी प्रोफाइल, त्यांचा अनुभव आणि भाषा पाहून थेट संपर्क साधू शकतात आणि विधीचे योग्य नियोजन करू शकतात.',
      hi: 'यह मंच एक पारदर्शी डिजिटल सेतु है जहाँ श्रद्धालु सत्यापित पुरोहितों के अनुभव, भाषा और संपर्क विवरण देखकर सीधे उनसे परामर्श और पूजा का समय निर्धारित कर सकते हैं।',
    },
  },
  {
    id: 'faq-5',
    question: {
      en: 'What verification is performed on listed Guruji profiles?',
      mr: 'गुरुजी प्रोफाईलवर कोणती पडताळणी केली जाते?',
      hi: 'सूचीबद्ध गुरुजी प्रोफाइलों पर क्या सत्यापन किया जाता है?',
    },
    answer: {
      en: 'Profiles undergo multi-tier checks including identity confirmation, local Trimbakeshwar residence, Vedic credential review, and organization-provided membership records. Each profile transparently displays its verification status.',
      mr: 'प्रोफाइलवर ओळख पडताळणी, त्र्यंबकेश्वरमधील वास्तव्याची खात्री, वैदिक शिक्षणाचा अनुभव आणि संस्थेने दिलेली कागदपत्रे यांची तपासणी केली जाते आणि स्थिती पारदर्शकपणे दर्शविली जाते.',
      hi: 'प्रोफाइलों पर पहचान पत्र, त्र्यंबकेश्वर स्थानीय निवास, वैदिक विद्या अनुभव और संस्था द्वारा उपलब्ध कराए गए अभिलेखों की जाँच की जाती है तथा स्थिति पारदर्शी रूप से प्रदर्शित की जाती है।',
    },
  },
  {
    id: 'faq-6',
    question: {
      en: 'Does the platform guarantee religious or worldly outcomes?',
      mr: 'हे व्यासपीठ कोणत्याही चमत्काराचे किंवा परिणामांचे आश्वासन देते का?',
      hi: 'क्या यह मंच किसी भी चमत्कार या निश्चित फल की गारंटी देता है?',
    },
    answer: {
      en: 'No. In strict adherence to Sanatan Dharma principles, all Pujas (such as Narayan Nagbali, Kaal Sarp Yog, and Rudrabhishek) are spiritual rites performed with devotional Sankalp according to Hindu traditions. No magical, medical, or guaranteed outcomes are claimed.',
      mr: 'नाही. सनातन धर्माच्या तत्त्वांचे पालन करत, सर्व विधी (जसे की नारायण नागबळी, कालसर्प शांती) हे भक्तीभावाने आणि शास्त्राच्या नियमांनुसार केले जाणारे पारंपरिक धार्मिक अनुष्ठान आहेत. कोणताही वैद्यकीय किंवा निश्चित परिणामाचा दावा केला जात नाही.',
      hi: 'नहीं। सनातन धर्म के शास्त्रीय नियमों के अनुसार सभी पूजा-अनुष्ठान श्रद्धा और संकल्प के साथ किए जाते हैं। किसी भी चमत्कारिक, चिकित्सीय या निश्चित परिणाम का दावा नहीं किया जाता।',
    },
  },
  {
    id: 'faq-7',
    question: {
      en: 'How does online Puja booking work on this portal?',
      mr: 'ऑनलाइन पूजा नोंदणी कशी कार्य करते?',
      hi: 'ऑनलाइन पूजा बुकिंग कैसे काम करती है?',
    },
    answer: {
      en: 'Devotees submit their preferred date, family Gotra, and ritual choice through the booking form. The chosen Guruji connects to confirm the Muhurta, explains Samagri and accommodation arrangements, and finalizes the schedule directly with the family.',
      mr: 'भाविक आपली इच्छित तारीख, गोत्र आणि विधीची निवड नोंदणी फॉर्मद्वारे पाठवतात. निवडलेले गुरुजी थेट संपर्क साधून मुहूर्त निश्चित करतात, साहित्याची माहिती देतात आणि सर्व नियोजन पूर्ण करतात.',
      hi: 'श्रद्धालु अपनी तिथि, गोत्र और पूजा का विवरण भेजते हैं। संबंधित गुरुजी सीधे संपर्क करके शुभ मुहूर्त और पूजन सामग्री की जानकारी देकर अनुष्ठान की योजना बनाते हैं।',
    },
  },
];
