// CMS Contact Data Layer & Multilingual Architecture for Trimbakeshwar Contact Us Module
import { SupportedLanguage } from '../types';

export type VerificationState =
  | 'VERIFIED'
  | 'ORGANIZATION_PROVIDED'
  | 'PENDING_VERIFICATION'
  | 'NOT_VERIFIED'
  | 'ARCHIVED';

export interface ContactInformationEntity {
  id: string;
  department: string;
  displayName: string;
  designation: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  availability: string;
  preferredContactMethod: 'email' | 'phone' | 'whatsapp';
  status: 'active' | 'inactive';
  verified: boolean;
  verificationStatus: VerificationState;
  verificationDate?: string;
  displayOrder: number;
  isPrimary: boolean;
}

export interface AddressCardEntity {
  id: string;
  category: 'official' | 'backoffice';
  title: string;
  nativeTitle: string;
  fullAddress: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  googleMapsUrl: string;
  phone?: string;
  email?: string;
  officeHours?: string;
  verificationStatus: VerificationState;
  lastVerifiedDate: string;
}

export interface QuickContactAction {
  id: string;
  title: {
    en: string;
    mr: string;
    hi: string;
  };
  subtitle: {
    en: string;
    mr: string;
    hi: string;
  };
  icon: string;
  ctaText: {
    en: string;
    mr: string;
    hi: string;
  };
  target: string;
  isScroll?: boolean;
}

export interface ContactFAQItem {
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
  linkRoute?: string;
  linkLabel?: string;
}

export interface ContactEnquiry {
  id: string;
  enquiryNumber: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  preferredContactMethod: 'email' | 'phone' | 'whatsapp';
  language: SupportedLanguage;
  source: string;
  status: 'New' | 'In Progress' | 'Waiting for User' | 'Resolved' | 'Closed' | 'Spam';
  createdAt: string;
}

// CMS-Managed Contact Entities (Single Source of Truth)
export const CONTACT_ENTITIES: ContactInformationEntity[] = [
  {
    id: 'contact-general',
    department: 'General Pilgrim Seva Desk',
    displayName: 'Devotee Seva Helpdesk',
    designation: 'Pilgrim Assistance & Inquiry Desk',
    email: 'seva@trimbakeshwar-jyotirlinga.org',
    phone: '+91 2594 222 108',
    whatsapp: '+91 98220 11008',
    availability: '06:00 AM to 08:30 PM IST (Daily)',
    preferredContactMethod: 'phone',
    status: 'active',
    verified: true,
    verificationStatus: 'VERIFIED',
    verificationDate: '2026-08-15',
    displayOrder: 1,
    isPrimary: true,
  },
  {
    id: 'contact-puja-cell',
    department: 'Traditional Puja Guidance Cell',
    displayName: 'Purohit Sangh Consultation Cell',
    designation: 'Shastric Vidhi Guidance & Scheduling',
    email: 'puja@trimbakeshwar-jyotirlinga.org',
    phone: '+91 98220 11008',
    whatsapp: '+91 98220 11008',
    availability: '07:00 AM to 07:00 PM IST',
    preferredContactMethod: 'whatsapp',
    status: 'active',
    verified: true,
    verificationStatus: 'ORGANIZATION_PROVIDED',
    verificationDate: '2026-08-01',
    displayOrder: 2,
    isPrimary: false,
  },
];

// Address Entities
export const ADDRESS_ENTITIES: AddressCardEntity[] = [
  {
    id: 'addr-official',
    category: 'official',
    title: 'Official Mandir Address',
    nativeTitle: 'अधिकृत मंदिर कार्यालय',
    fullAddress: 'Shri Ganga Godavari Mandir, 1st Floor, Kushavart Tirth Chowk, Trimbakeshwar',
    city: 'Trimbak',
    state: 'Maharashtra',
    pincode: '422212',
    country: 'India',
    googleMapsUrl: 'https://maps.google.com/?q=Kushavarta+Kund+Trimbakeshwar',
    phone: '+91 2594 222 108',
    email: 'seva@trimbakeshwar-jyotirlinga.org',
    officeHours: '06:00 AM - 08:30 PM (All 7 Days)',
    verificationStatus: 'VERIFIED',
    lastVerifiedDate: '2026-08-10',
  },
  {
    id: 'addr-backoffice',
    category: 'backoffice',
    title: 'Liaison & Back Office',
    nativeTitle: 'संपर्क व समन्वय कार्यालय',
    fullAddress: 'Nashik-Trimbak Road, Mumbai Highway Corridor',
    city: 'Nashik',
    state: 'Maharashtra',
    pincode: '422009',
    country: 'India',
    googleMapsUrl: 'https://maps.google.com/?q=Nashik+Maharashtra+422009',
    phone: '+91 2594 222 108',
    email: 'liaison@trimbakeshwar-jyotirlinga.org',
    officeHours: '09:30 AM - 06:00 PM (Monday to Saturday)',
    verificationStatus: 'ORGANIZATION_PROVIDED',
    lastVerifiedDate: '2026-07-28',
  },
];

// Quick Action Cards
export const QUICK_CONTACT_ACTIONS: QuickContactAction[] = [
  {
    id: 'qa-enquiry',
    title: {
      en: 'General Enquiry',
      mr: 'सामान्य विचारणा',
      hi: 'सामान्य पूछताछ',
    },
    subtitle: {
      en: 'Have a question? Send us your message.',
      mr: 'काही शंका आहे? आम्हाला संदेश पाठवा.',
      hi: 'कोई प्रश्न है? हमें अपना संदेश भेजें।',
    },
    icon: 'MessageSquare',
    ctaText: {
      en: 'Send Message',
      mr: 'संदेश पाठवा',
      hi: 'संदेश भेजें',
    },
    target: '#contact-form-section',
    isScroll: true,
  },
  {
    id: 'qa-puja',
    title: {
      en: 'Puja Assistance',
      mr: 'पूजा मार्गदर्शन',
      hi: 'पूजा सहायता',
    },
    subtitle: {
      en: 'Need guidance choosing an authentic Vidhi?',
      mr: 'शास्त्रोक्त विधीच्या माहितीसाठी मार्गदर्शन हवे?',
      hi: 'शास्त्रसम्मत पूजा विधि के चयन में मार्गदर्शन चाहिए?',
    },
    icon: 'Flame',
    ctaText: {
      en: 'Explore Puja',
      mr: 'पूजा विधी पहा',
      hi: 'पूजा विवरणी देखें',
    },
    target: '/puja',
  },
  {
    id: 'qa-guruji',
    title: {
      en: 'Guruji Directory',
      mr: 'गुरुजी यादी',
      hi: 'गुरुजी सूची',
    },
    subtitle: {
      en: 'Looking for a verified hereditary Guruji?',
      mr: 'अधिकृत वंशपरंपरागत पुरोहितांशी संपर्क साधा.',
      hi: 'अधिकृत एवं पारंपरिक पुरोहित से सीधा संपर्क करें।',
    },
    icon: 'Users',
    ctaText: {
      en: 'Find Guruji',
      mr: 'गुरुजी शोधा',
      hi: 'गुरुजी खोजें',
    },
    target: '/guruji',
  },
  {
    id: 'qa-visit',
    title: {
      en: 'Visit Trimbakeshwar',
      mr: 'यात्रा नियोजन',
      hi: 'यात्रा योजना',
    },
    subtitle: {
      en: 'Plan travel, darshan timings & dress rules.',
      mr: 'दर्शन वेळ, प्रवास व नियमांची माहिती पहा.',
      hi: 'दर्शन समय, यात्रा मार्ग और नियमों की जानकारी देखें।',
    },
    icon: 'Compass',
    ctaText: {
      en: 'Plan Your Visit',
      mr: 'यात्रा माहिती',
      hi: 'यात्रा विवरण',
    },
    target: '/temple-guide',
  },
];

// Mini FAQ Items
export const CONTACT_FAQS: ContactFAQItem[] = [
  {
    id: 'cfaq-1',
    question: {
      en: 'Where can I find verified Puja information?',
      mr: 'अधिकृत पूजा विधींची माहिती कोठे मिळेल?',
      hi: 'प्रमाणित पूजा विधियों की जानकारी कहाँ मिलेगी?',
    },
    answer: {
      en: 'Detailed Shastric guidelines for Narayan Nagbali, Kaal Sarp Yog, and Tripindi Shraddha are available in our dedicated Puja section. Each guide explains traditional duration, required dress etiquette, and preparatory steps.',
      mr: 'नारायण नागबळी, कालसर्प शांती आणि त्रिपिंडी श्राद्ध या विधींची सविस्तर शास्त्रोक्त माहिती आमच्या पूजा विभागात उपलब्ध आहे. यामध्ये कालावधी, वस्त्र नियम व तयारी स्पष्ट केली आहे.',
      hi: 'नारायण नागबलि, कालसर्प शांति और त्रिपिंडी श्राद्ध की विस्तृत शास्त्रीय जानकारी हमारे पूजा अनुभाग में उपलब्ध है। इसमें अवधि, वेशभूषा और तैयारी के नियम दिए गए हैं।',
    },
    linkRoute: '/puja',
    linkLabel: 'View Puja Directory',
  },
  {
    id: 'cfaq-2',
    question: {
      en: 'Can I contact a listed Guruji directly?',
      mr: 'मी सूचीबद्ध गुरुजींशी थेट संपर्क साधू शकतो का?',
      hi: 'क्या मैं सूचीबद्ध गुरुजी से सीधा संपर्क कर सकता हूँ?',
    },
    answer: {
      en: 'Yes. Devotees can view verified Guruji profiles and communicate directly regarding family Gotra, Muhurta confirmation, and samagri arrangements without any commercial middleman.',
      mr: 'होय. भाविक कोणत्याही मध्यस्थाशिवाय थेट पडताळणी केलेल्या गुरुजींच्या प्रोफाइलवरून संपर्क साधून गोत्र, मुहूर्त व साहित्याची चर्चा करू शकतात.',
      hi: 'हाँ। श्रद्धालु बिना किसी बिचौलिए के सीधे सत्यापित पुरोहितों से संपर्क कर गोत्र, मुहूर्त और पूजन सामग्री पर परामर्श कर सकते हैं।',
    },
    linkRoute: '/guruji',
    linkLabel: 'Meet the Gurujis',
  },
  {
    id: 'cfaq-3',
    question: {
      en: 'How should I plan my pilgrimage to Trimbakeshwar?',
      mr: 'त्र्यंबकेश्वर यात्रेचे नियोजन कसे करावे?',
      hi: 'त्र्यंबकेश्वर यात्रा की योजना कैसे बनाएं?',
    },
    answer: {
      en: 'Pilgrims are advised to check current darshan schedules, reach Trimbak one day prior for multi-day rituals like Narayan Nagbali (3 days), and carry traditional unstitched cotton or silk attire for inner sanctum entry.',
      mr: 'भाविकांनी दर्शनाची वेळ तपासावी, नारायण नागबळीसारख्या ३ दिवसांच्या विधीसाठी एक दिवस आधी पोहोचावे आणि मंदिरातील नियमांनुसार पारंपरिक सुती किंवा रेशमी वस्त्रे सोबत ठेवावीत.',
      hi: 'श्रद्धालु दर्शन समय की पुष्टि करें, नारायण नागबलि जैसे ३ दिवसीय अनुष्ठान के लिए एक दिन पूर्व पहुंचें और नियमानुसार पारंपरिक वस्त्र साथ रखें।',
    },
    linkRoute: '/temple-guide',
    linkLabel: 'Pilgrim Practical Guide',
  },
  {
    id: 'cfaq-4',
    question: {
      en: 'How can I reach the digital seva support team?',
      mr: 'वेबसाईट सेवा टीमशी कसा संपर्क साधावा?',
      hi: 'डिजिटल सेवा सहायता दल से कैसे संपर्क करें?',
    },
    answer: {
      en: 'You can submit an inquiry through the contact form on this page or email seva@trimbakeshwar-jyotirlinga.org. Official helplines operate daily from 06:00 AM to 08:30 PM IST.',
      mr: 'तुम्ही या पृष्ठावरील फॉर्मद्वारे किंवा seva@trimbakeshwar-jyotirlinga.org वर ईमेल पाठवू शकता. अधिकृत हेल्पलाइन दररोज सकाळी ०६:०० ते रात्री ०८:३० दरम्यान सुरू असते.',
      hi: 'आप इस पृष्ठ के फॉर्म द्वारा या seva@trimbakeshwar-jyotirlinga.org पर ईमेल भेज सकते हैं। आधिकारिक हेल्पलाइन प्रतिदिन सुबह ०६:०० से रात ०८:३० तक खुली रहती है।',
    },
  },
  {
    id: 'cfaq-5',
    question: {
      en: 'Where are the official offices located in Trimbakeshwar?',
      mr: 'त्र्यंबकेश्वरमध्ये अधिकृत कार्यालये कुठे आहेत?',
      hi: 'त्र्यंबकेश्वर में आधिकारिक कार्यालय कहाँ स्थित हैं?',
    },
    answer: {
      en: 'The official Mandir seva office is located at Shri Ganga Godavari Mandir, 1st Floor, Kushavart Tirth Chowk, Trimbakeshwar 422212, right adjacent to the holy Kushavarta Kund.',
      mr: 'अधिकृत मंदिर सेवा कार्यालय पवित्र कुशावर्त तीर्थाजवळ श्री गंगा गोदावरी मंदिर, १ ला मजला, कुशावर्त तीर्थ चौक, त्र्यंबकेश्वर ४२२२१२ येथे आहे.',
      hi: 'आधिकारिक सेवा कार्यालय पवित्र कुशावर्त तीर्थ के समीप श्री गंगा गोदावरी मंदिर, प्रथम तल, कुशावर्त तीर्थ चौक, त्र्यंबकेश्वर ४२२२१२ में स्थित है।',
    },
  },
  {
    id: 'cfaq-6',
    question: {
      en: 'Can I submit feedback or suggestions about the portal?',
      mr: 'मी या मंचाविषयी सूचना किंवा अभिप्राय देऊ शकतो का?',
      hi: 'क्या मैं इस पोर्टल के बारे में सुझाव या प्रतिक्रिया दे सकता हूँ?',
    },
    answer: {
      en: 'Yes, we warmly welcome suggestions from devotees, pilgrims, and scholars. Please select "Feedback" or "Website Support" in the subject dropdown above.',
      mr: 'होय, भाविक, यात्रेकरू व विद्वानांच्या सूचनांचे आम्ही स्वागत करतो. कृपया वरील फॉर्ममध्ये "Feedback" हा विषय निवडून पाठवा.',
      hi: 'हाँ, हम श्रद्धालुओं और विद्वानों के सुझावों का स्वागत करते हैं। कृपया फॉर्म में "Feedback" चुनकर अपनी बात साझा करें।',
    },
  },
];

// Multilingual UI strings for Contact Page
export const CONTACT_LOCALIZED_TEXT: Record<
  SupportedLanguage,
  {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    heroDesc: string;
    formHeading: string;
    formDesc: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    subjectLabel: string;
    messageLabel: string;
    messagePlaceholder: string;
    preferredMethodLabel: string;
    languagePreferenceLabel: string;
    privacyConsent: string;
    privacyLinkText: string;
    submitBtn: string;
    submittingBtn: string;
    successHeading: string;
    successMsg: string;
    enquiryIdLabel: string;
    backHomeBtn: string;
    exploreBtn: string;
    infoPanelHeading: string;
    infoPanelDesc: string;
    addressHeading: string;
    viewOnMapBtn: string;
    pujaHelpHeading: string;
    pujaHelpDesc: string;
    gurujiSectionHeading: string;
    gurujiSectionDesc: string;
    visitSectionHeading: string;
    visitSectionDesc: string;
    faqHeading: string;
    trustHeading: string;
    trustDesc: string;
    finalCtaHeading: string;
    finalCtaDesc: string;
  }
> = {
  en: {
    heroEyebrow: '॥ ॐ नमः शिवाय ॥',
    heroTitle: 'Connect With Us',
    heroSubtitle: 'संपर्क साधा • Shri Trimbakeshwar Seva Helpdesk',
    heroDesc: 'Have a question about Trimbakeshwar Jyotirlinga, Shastric Puja practices, Guruji consultations, or planning your pilgrimage? We are here to guide you with humility and transparency.',
    formHeading: 'Send Us a Message',
    formDesc: 'Fill in your details below and our seva desk will respond via your preferred contact channel.',
    nameLabel: 'Full Name *',
    namePlaceholder: 'Enter your full name',
    emailLabel: 'Email Address *',
    emailPlaceholder: 'Enter your email address',
    phoneLabel: 'Contact Number *',
    phonePlaceholder: 'Enter mobile or WhatsApp number with country code',
    subjectLabel: 'Subject *',
    messageLabel: 'Your Message *',
    messagePlaceholder: 'Write your questions, ritual requirements, or travel dates here...',
    preferredMethodLabel: 'Preferred Contact Channel',
    languagePreferenceLabel: 'Preferred Language for Response',
    privacyConsent: 'I agree to the Privacy Policy and consent to being contacted regarding my enquiry.',
    privacyLinkText: 'Privacy Policy',
    submitBtn: 'Submit Message',
    submittingBtn: 'Submitting Message...',
    successHeading: 'Enquiry Received With Reverence',
    successMsg: 'Thank you for connecting with us. Your enquiry has been registered in our seva registry.',
    enquiryIdLabel: 'Enquiry Reference ID',
    backHomeBtn: 'Back to Home',
    exploreBtn: 'Explore Puja Vidhis',
    infoPanelHeading: 'Get in Touch',
    infoPanelDesc: 'For questions, suggestions, ritual guidance, or general pilgrim inquiries, use this secure form or contact our verified channels directly.',
    addressHeading: 'Temple & Seva Offices',
    viewOnMapBtn: 'View on Google Maps',
    pujaHelpHeading: 'Need Help With a Puja?',
    pujaHelpDesc: 'Not sure which ritual aligns with your family tradition and Shastric purpose? Explore detailed guides or connect directly with a qualified Guruji.',
    gurujiSectionHeading: 'Connect Directly With Guruji',
    gurujiSectionDesc: 'Browse verified hereditary Purohits of Trimbakeshwar, review traditional background, and reach out directly.',
    visitSectionHeading: 'Visit Trimbakeshwar Kshetra',
    visitSectionDesc: 'Important practical travel, darshan hours, and temple etiquette guidelines for visiting pilgrims.',
    faqHeading: 'Frequently Asked Questions',
    trustHeading: 'Clear Information. Respectful Guidance.',
    trustDesc: 'We strictly distinguish between authentic Vedic tradition, organization-provided documentation, and verified contact channels—eliminating middlemen and confusion.',
    finalCtaHeading: 'Begin Your Sacred Journey to Trimbakeshwar',
    finalCtaDesc: 'Explore the ancient Jyotirlinga, discover Shastra-mandated rituals, and consult directly with authorized hereditary Gurujis.',
  },
  mr: {
    heroEyebrow: '॥ ॐ नमः शिवाय ॥',
    heroTitle: 'संपर्क साधा',
    heroSubtitle: 'श्री त्र्यंबकेश्वर भाविक सेवा व मार्गदर्शन केंद्र',
    heroDesc: 'त्र्यंबकेश्वर ज्योतिर्लिंग, पूजा विधी, अधिकृत गुरुजी किंवा तीर्थयात्रेविषयी काही प्रश्न असल्यास निःसंकोच संपर्क साधा.',
    formHeading: 'आम्हाला संदेश पाठवा',
    formDesc: 'आपली माहिती खाली भरा, आमची सेवा टीम आपल्या पसंतीच्या माध्यमातून संपर्क साधेल.',
    nameLabel: 'पूर्ण नाव *',
    namePlaceholder: 'आपले पूर्ण नाव प्रविष्ट करा',
    emailLabel: 'ईमेल पत्ता *',
    emailPlaceholder: 'आपला ईमेल पत्ता प्रविष्ट करा',
    phoneLabel: 'संपर्क क्रमांक *',
    phonePlaceholder: 'मोबाईल किंवा व्हॉट्सॲप क्रमांक प्रविष्ट करा',
    subjectLabel: 'विषय *',
    messageLabel: 'आपला संदेश *',
    messagePlaceholder: 'आपले प्रश्न किंवा विधीचे नियोजन येथे लिहा...',
    preferredMethodLabel: 'संपर्काचे प्राधान्य माध्यम',
    languagePreferenceLabel: 'संभाषणाची पसंतीची भाषा',
    privacyConsent: 'मी गोपनीयता धोरणाशी सहमत आहे आणि माझ्या विचारणेसाठी संपर्कास अनुमती देतो.',
    privacyLinkText: 'गोपनीयता धोरण',
    submitBtn: 'संदेश पाठवा',
    submittingBtn: 'संदेश पाठवत आहे...',
    successHeading: 'आपली विचारणा नोंदवली गेली आहे',
    successMsg: 'आमच्याशी संपर्क साधल्याबद्दल धन्यवाद. आपली विचारणा सेवा नोंदवहीत सुरक्षितपणे नोंदवली आहे.',
    enquiryIdLabel: 'विचारणा संदर्भ क्रमांक',
    backHomeBtn: 'मुख्य पृष्ठावर जा',
    exploreBtn: 'पूजा विधी पहा',
    infoPanelHeading: 'थेट संपर्क माहिती',
    infoPanelDesc: 'पूजा मार्गदर्शन किंवा सामान्य माहितीसाठी अधिकृत व पडताळणी केलेल्या चॅनेल्सचा उपयोग करा.',
    addressHeading: 'मंदिर व कार्यालय पत्ते',
    viewOnMapBtn: 'नकाशावर पहा',
    pujaHelpHeading: 'विधी निवडीत मार्गदर्शन हवे?',
    pujaHelpDesc: 'आपल्या गरजेनुसार कोणता विधी योग्य आहे हे जाणून घेण्यासाठी गुरुजींशी चर्चा करा.',
    gurujiSectionHeading: 'अधिकृत गुरुजींशी थेट संपर्क',
    gurujiSectionDesc: 'त्र्यंबकेश्वरमधील वंशपरंपरागत पुरोहितांचे प्रोफाईल पाहून थेट संपर्क साधा.',
    visitSectionHeading: 'त्र्यंबकेश्वर तीर्थक्षेत्र दर्शन नियोजन',
    visitSectionDesc: 'दर्शन वेळ, प्रवासाचे मार्ग व मंदिरातील नियमांची खात्रीशीर माहिती.',
    faqHeading: 'नेहमी विचारले जाणारे प्रश्न',
    trustHeading: 'पारदर्शक माहिती • आदरपूर्वक सेवा',
    trustDesc: 'आम्ही कोणत्याही मध्यस्थांशिवाय अधिकृत आणि शास्त्रसम्मत माहिती भाविकांना उपलब्ध करून देतो.',
    finalCtaHeading: 'आपल्या पवित्र यात्रेची सुरुवात करा',
    finalCtaDesc: 'द्वादश ज्योतिर्लिंगाचे दर्शन घ्या, शास्त्रोक्त पूजांचे नियम जाणून घ्या आणि अधिकृत गुरुजींशी संवाद साधा.',
  },
  hi: {
    heroEyebrow: '॥ ॐ नमः शिवाय ॥',
    heroTitle: 'संपर्क करें',
    heroSubtitle: 'श्री त्र्यंबकेश्वर तीर्थयात्री सेवा एवं परामर्श केंद्र',
    heroDesc: 'त्र्यंबकेश्वर ज्योतिर्लिंग, शास्त्रसम्मत पूजा विधि, गुरुजी परामर्श या तीर्थयात्रा योजना के संबंध में किसी भी प्रश्न के लिए संपर्क करें।',
    formHeading: 'हमें संदेश भेजें',
    formDesc: 'अपना विवरण भरें, हमारा सहायता दल आपके पसंदीदा माध्यम द्वारा संपर्क करेगा।',
    nameLabel: 'पूरा नाम *',
    namePlaceholder: 'अपना पूरा नाम दर्ज करें',
    emailLabel: 'ईमेल पता *',
    emailPlaceholder: 'अपना ईमेल पता दर्ज करें',
    phoneLabel: 'संपर्क नंबर *',
    phonePlaceholder: 'मोबाइल या व्हाट्सएप नंबर दर्ज करें',
    subjectLabel: 'विषय *',
    messageLabel: 'आपका संदेश *',
    messagePlaceholder: 'अपने प्रश्न या अनुष्ठान तिथि का विवरण यहाँ लिखें...',
    preferredMethodLabel: 'संपर्क का पसंदीदा माध्यम',
    languagePreferenceLabel: 'परामर्श की पसंदीदा भाषा',
    privacyConsent: 'मैं गोपनीयता नीति से सहमत हूँ और संपर्क किए जाने की अनुमति देता हूँ।',
    privacyLinkText: 'गोपनीयता नीति',
    submitBtn: 'संदेश भेजें',
    submittingBtn: 'संदेश भेजा जा रहा है...',
    successHeading: 'आपकी पूछताछ सफलतापूर्वक दर्ज हुई',
    successMsg: 'संपर्क करने के लिए धन्यवाद। आपकी पूछताछ सेवा पंजी में सुरक्षित रूप से दर्ज कर ली गई है।',
    enquiryIdLabel: 'पूछताछ संदर्भ संख्या',
    backHomeBtn: 'मुख्य पृष्ठ',
    exploreBtn: 'पूजा विवरणी देखें',
    infoPanelHeading: 'संपर्क सूत्र',
    infoPanelDesc: 'पूजा मार्गदर्शन या सामान्य जानकारी हेतु हमारे सत्यापित माध्यमों का उपयोग करें।',
    addressHeading: 'कार्यालय एवं मंदिर पता',
    viewOnMapBtn: 'मानचित्र पर देखें',
    pujaHelpHeading: 'पूजा चयन में सहायता चाहिए?',
    pujaHelpDesc: 'नारायण नागबलि, कालसर्प शांति आदि अनुष्ठानों के लिए अधिकृत पुरोहितों से मार्गदर्शन प्राप्त करें।',
    gurujiSectionHeading: 'अधिकृत गुरुजी से सीधा संपर्क',
    gurujiSectionDesc: 'त्र्यंबकेश्वर के पारंपरिक वैदिक पुरोहितों की प्रोफाइल देखकर सीधा संपर्क करें।',
    visitSectionHeading: 'त्र्यंबकेश्वर यात्रा विवरण',
    visitSectionDesc: 'दर्शन समय, यात्रा मार्ग और मंदिर आचार-संहिता की सटीक जानकारी।',
    faqHeading: 'प्रायः पूछे जाने वाले प्रश्न',
    trustHeading: 'स्पष्ट जानकारी • समर्पित सेवा',
    trustDesc: 'बिना किसी बिचौलिए के सीधे अधिकृत पुरोहितों से संपर्क एवं शास्त्रसम्मत मार्गदर्शन।',
    finalCtaHeading: 'पवित्र त्र्यंबकेश्वर यात्रा का आरंभ करें',
    finalCtaDesc: 'द्वादश ज्योतिर्लिंग के दर्शन करें, शास्त्रोक्त विधियों को समझें और अधिकृत गुरुजी से जुड़ें।',
  },
  sa: {
    heroEyebrow: '॥ ॐ नमः शिवाय ॥',
    heroTitle: 'संपर्कं कुरुत',
    heroSubtitle: 'श्री त्र्यम्बकेश्वर तीर्थयात्री सेवा केंद्रम्',
    heroDesc: 'श्री त्र्यम्बकेश्वर ज्योतिर्लिंग, वैदिक पूजा विधीनां तथा तीर्थयात्रा विषये संवादाय अत्र संपर्कं कुरुत।',
    formHeading: 'संदेशं प्रेषयतु',
    formDesc: 'भवतां विवरणं प्रपूरयतु, वयं शीघ्रं संपर्कं कुर्मः।',
    nameLabel: 'पूर्णनाम *',
    namePlaceholder: 'भवतां नाम लिखतु',
    emailLabel: 'ईमेल पत्रम् *',
    emailPlaceholder: 'ईमेल पत्रं लिखतु',
    phoneLabel: 'दूरभाष संख्या *',
    phonePlaceholder: 'दूरभाष संख्यां लिखतु',
    subjectLabel: 'विषयः *',
    messageLabel: 'संदेशः *',
    messagePlaceholder: 'अत्र स्वसंदेशं लिखतु...',
    preferredMethodLabel: 'संपर्क माध्यमः',
    languagePreferenceLabel: 'भाषा प्राथमिकता',
    privacyConsent: 'अहं गोपनीयता नीत्या सह सहमतः अस्मि।',
    privacyLinkText: 'गोपनीयता नीतिः',
    submitBtn: 'संदेशं प्रेषयतु',
    submittingBtn: 'प्रेष्यते...',
    successHeading: 'संदेशः प्राप्तः',
    successMsg: 'भवतां संदेशः सुरक्षितरूपेण पञ्जीकृतः। धन्यवादाः।',
    enquiryIdLabel: 'संदर्भ संख्या',
    backHomeBtn: 'मुख्य पृष्ठम्',
    exploreBtn: 'पूजा विधीन् पश्यतु',
    infoPanelHeading: 'संपर्क विवरणम्',
    infoPanelDesc: 'प्रमाणित वैदिक पुरोहितैः सह प्रत्यक्ष संपर्कं कुरुत।',
    addressHeading: 'स्थान विवरणम्',
    viewOnMapBtn: 'मानचित्रे पश्यतु',
    pujaHelpHeading: 'पूजा मार्गदर्शनम्',
    pujaHelpDesc: 'शास्त्रोक्त विधीनां कृते योग्यं मार्गदर्शनं प्राप्नुवन्तु।',
    gurujiSectionHeading: 'अधिकृत गुरुवर्याः',
    gurujiSectionDesc: 'त्र्यम्बकेश्वरस्य वंशपरंपरागत पुरोहितैः सह संवादं कुरुत।',
    visitSectionHeading: 'यात्रा नियोजनम्',
    visitSectionDesc: 'दर्शन समयः तथा नियमानां ज्ञानम्।',
    faqHeading: 'प्रायः पृष्टाः प्रश्नाः',
    trustHeading: 'सत्यं वद • धर्मं चर',
    trustDesc: 'पारदर्शकता तथा श्रद्धा युक्ता सेवा।',
    finalCtaHeading: 'पवित्र यात्रां प्रारभत',
    finalCtaDesc: 'श्री त्र्यम्बकेश्वरस्य कृपां प्राप्नुवन्तु।',
  },
  gu: {
    heroEyebrow: '॥ ॐ नमः शिवाय ॥',
    heroTitle: 'સંપર્ક કરો',
    heroSubtitle: 'શ્રી ત્ર્યંબકેશ્વર યાત્રી સેવા સહાયતા કેન્દ્ર',
    heroDesc: 'ત્ર્યંબકેશ્વર જ્યોતિર્લિંગ, પરંપરાગત પૂજા વિધિ, ગુરુજી પરામર્શ અથવા યાત્રા અંગેના પ્રશ્નો માટે સંપર્ક કરો.',
    formHeading: 'અમને સંદેશ મોકલો',
    formDesc: 'આપની વિગત ભરો, અમારું સેવા કેન્દ્ર આપનો સંપર્ક કરશે.',
    nameLabel: 'પૂરું નામ *',
    namePlaceholder: 'આપનું પૂરું નામ લખો',
    emailLabel: 'ઈમેલ એડ્રેસ *',
    emailPlaceholder: 'આપનો ઈમેલ લખો',
    phoneLabel: 'સંપર્ક નંબર *',
    phonePlaceholder: 'મોબાઇલ અથવા વ્હોટ્સએપ નંબર લખો',
    subjectLabel: 'વિષય *',
    messageLabel: 'આપનો સંદેશ *',
    messagePlaceholder: 'આપના પ્રશ્નો અથવા પૂજા અંગે અહીં લખો...',
    preferredMethodLabel: 'સંપર્કનું પસંદગીનું માધ્યમ',
    languagePreferenceLabel: 'વાતચીતની પસંદગીની ભાષા',
    privacyConsent: 'હું ગોપનીયતા નીતિ સાથે સંમત છું.',
    privacyLinkText: 'પ્રાઇવસી પોલિસી',
    submitBtn: 'સંદેશ મોકલો',
    submittingBtn: 'મોકલી રહ્યાં છીએ...',
    successHeading: 'આપનો સંદેશ નોંધાયો છે',
    successMsg: 'સંપર્ક કરવા બદલ આભાર. આપની વિગત સુરક્ષિત રીતે નોંધવામાં આવી છે.',
    enquiryIdLabel: 'સંદર્ભ ક્રમાંક',
    backHomeBtn: 'મુખ્ય પૃષ્ઠ',
    exploreBtn: 'પૂજા વિધિ જુઓ',
    infoPanelHeading: 'સીધો સંપર્ક',
    infoPanelDesc: 'અધિકૃત અને ચકાસાયેલા માધ્યમો દ્વારા સીધો સંપર્ક કરો.',
    addressHeading: 'મંદિર અને કાર્યાલયનું સરનામું',
    viewOnMapBtn: 'નકશા પર જુઓ',
    pujaHelpHeading: 'પૂજા વિધિ અંગે સહાયતા?',
    pujaHelpDesc: 'શાસ્ત્રોક્ત પૂજા અંગે યોગ્ય ગુરુજીનું માર્ગદર્શન મેળવો.',
    gurujiSectionHeading: 'અધિકૃત ગુરુજી સાથે સંપર્ક',
    gurujiSectionDesc: 'ત્ર્યંબકેશ્વરના વંશપરંપરાગત પુરોહિતો સાથે સીધો સંપર્ક કરો.',
    visitSectionHeading: 'ત્ર્યંબકેશ્વર દર્શન આયોજન',
    visitSectionDesc: 'દર્શન સમય, મુસાફરી અને નિયમોની માહિતી.',
    faqHeading: 'વારંવાર પૂછાતા પ્રશ્નો',
    trustHeading: 'સ્પષ્ટ માહિતી • આદરપૂર્ણ સેવા',
    trustDesc: 'કોઈપણ વચેટિયા વગર સીધો સંપર્ક અને માર્ગદર્શન.',
    finalCtaHeading: 'આપની પવિત્ર યાત્રા શરૂ કરો',
    finalCtaDesc: 'ત્ર્યંબકેશ્વર જ્યોતિર્લિંગના દર્શન કરો અને પૂજા વિધિ સમજો.',
  },
  te: {
    heroEyebrow: '॥ ఓం నమః శివాయ ॥',
    heroTitle: 'మమ్మల్ని సంప్రదించండి',
    heroSubtitle: 'శ్రీ త్రయంబకేశ్వర యాత్రికుల సేవా కేంద్రం',
    heroDesc: 'త్రయంబకేశ్వర జ్యోతిర్లింగం, పూజలు, గురూజీ సంప్రదింపులు లేదా యాత్ర ప్రణాళికపై సహాయం కోసం సంప్రదించండి.',
    formHeading: 'సందేశం పంపండి',
    formDesc: 'మీ వివరాలను నమోదు చేయండి, మా సేవా బృందం మిమ్మల్ని సంప్రదిస్తుంది.',
    nameLabel: 'పూర్తి పేరు *',
    namePlaceholder: 'మీ పూర్తి పేరు నమోదు చేయండి',
    emailLabel: 'ఈమెయిల్ చిరునామా *',
    emailPlaceholder: 'మీ ఈమెయిల్ నమోదు చేయండి',
    phoneLabel: 'సంప్రదింపు సంఖ్య *',
    phonePlaceholder: 'మొబైల్ లేదా వాట్సాప్ నంబర్',
    subjectLabel: 'విషయం *',
    messageLabel: 'మీ సందేశం *',
    messagePlaceholder: 'మీ ప్రశ్నలు ఇక్కడ రాయండి...',
    preferredMethodLabel: 'సంప్రదింపు ప్రాధాన్యత',
    languagePreferenceLabel: 'భాషా ప్రాధాన్యత',
    privacyConsent: 'నేను గోప్యతా విధానానికి అంగీకరిస్తున్నాను.',
    privacyLinkText: 'గోప్యతా విధానం',
    submitBtn: 'సందేశం పంపండి',
    submittingBtn: 'పంపుతున్నాము...',
    successHeading: 'మీ సందేశం నమోదైంది',
    successMsg: 'మమ్మల్ని సంప్రదించినందుకు ధన్యవాదాలు. మీ వివరాలు నమోదు చేయబడ్డాయి.',
    enquiryIdLabel: 'రిఫరెన్స్ సంఖ్య',
    backHomeBtn: 'హోమ్ పేజీ',
    exploreBtn: 'పూజల వివరాలు',
    infoPanelHeading: 'సంప్రదింపు వివరాలు',
    infoPanelDesc: 'అధికారిక మరియు ధృవీకరించబడిన మార్గాల ద్వారా సంప్రదించండి.',
    addressHeading: 'చిరునామా',
    viewOnMapBtn: 'మ్యాప్‌లో చూడండి',
    pujaHelpHeading: 'పూజా సహాయం కావాలా?',
    pujaHelpDesc: 'సరైన పూజా విధానం కోసం అర్హత కలిగిన గురూజీని సంప్రదించండి.',
    gurujiSectionHeading: 'గురూజీతో సంప్రదింపు',
    gurujiSectionDesc: 'త్రయంబకేశ్వర్ సాంప్రదాయ పురోహితులతో నేరుగా మాట్లాడండి.',
    visitSectionHeading: 'దర్శన సమాచారం',
    visitSectionDesc: 'దర్శన సమయాలు మరియు యాత్ర మార్గదర్శకాలు.',
    faqHeading: 'తరచుగా అడిగే ప్రశ్నలు',
    trustHeading: 'స్పష్టమైన సమాచారం • పారదర్శక సేవ',
    trustDesc: 'మధ్యవర్తులు లేకుండా నేరుగా గురూజీతో సంప్రదింపు.',
    finalCtaHeading: 'మీ పవిత్ర యాత్రను ప్రారంభించండి',
    finalCtaDesc: 'శ్రీ త్రయంబకేశ్వర జ్యోతిర్లింగాన్ని దర్శించండి.',
  },
  kn: {
    heroEyebrow: '॥ ಓಂ ನಮಃ ಶಿವಾಯ ॥',
    heroTitle: 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ',
    heroSubtitle: 'ಶ್ರೀ ತ್ರ್ಯಂಬಕೇಶ್ವರ ಭಕ್ತರ ಸೇವಾ ಕೇಂದ್ರ',
    heroDesc: 'ತ್ರ್ಯಂಬಕೇಶ್ವರ ಜ್ಯೋತಿರ್ಲಿಂಗ, ಪೂಜಾ ವಿಧಿಗಳು, ಗುರೂಜಿ ಸಮಾಲೋಚನೆ ಅಥವಾ ಯಾತ್ರೆ ಕುರಿತು ಯಾವುದೇ ಸಹಾಯಕ್ಕಾಗಿ ಸಂಪರ್ಕಿಸಿ.',
    formHeading: 'ಸಂದೇಶ ಕಳುಹಿಸಿ',
    formDesc: 'ನಿಮ್ಮ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ, ನಮ್ಮ ಸೇವಾ ತಂಡವು ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತದೆ.',
    nameLabel: 'ಪೂರ್ಣ ಹೆಸರು *',
    namePlaceholder: 'ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು ನಮೂದಿಸಿ',
    emailLabel: 'ಇಮೇಲ್ ವಿಳಾಸ *',
    emailPlaceholder: 'ನಿಮ್ಮ ಇಮೇಲ್ ನಮೂದಿಸಿ',
    phoneLabel: 'ಸಂಪರ್ಕ ಸಂಖ್ಯೆ *',
    phonePlaceholder: 'ಮೊಬೈಲ್ ಅಥವಾ ವಾಟ್ಸಾಪ್ ಸಂಖ್ಯೆ',
    subjectLabel: 'ವಿಷಯ *',
    messageLabel: 'ನಿಮ್ಮ ಸಂದೇಶ *',
    messagePlaceholder: 'ನಿಮ್ಮ ಪ್ರಶ್ನೆಗಳನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ...',
    preferredMethodLabel: 'ಸಂಪರ್ಕ ಮಾಧ್ಯಮ',
    languagePreferenceLabel: 'ಭಾಷಾ ಆದ್ಯತೆ',
    privacyConsent: 'ನಾನು ಗೌಪ್ಯತಾ ನೀತಿಗೆ ಸಮ್ಮತಿಸುತ್ತೇನೆ.',
    privacyLinkText: 'ಗೌಪ್ಯತಾ ನೀತಿ',
    submitBtn: 'ಸಂದೇಶ ಕಳುಹಿಸಿ',
    submittingBtn: 'ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ...',
    successHeading: 'ನಿಮ್ಮ ಸಂದೇಶ ಸ್ವೀಕರಿಸಲಾಗಿದೆ',
    successMsg: 'ಸಂಪರ್ಕಿಸಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು. ನಿಮ್ಮ ವಿವರಗಳನ್ನು ನೋಂದಾಯಿಸಲಾಗಿದೆ.',
    enquiryIdLabel: 'ಉಲ್ಲೇಖ ಸಂಖ್ಯೆ',
    backHomeBtn: 'ಮುಖಪುಟ',
    exploreBtn: 'ಪೂಜೆಗಳನ್ನು ನೋಡಿ',
    infoPanelHeading: 'ಸಂಪರ್ಕ ಮಾಹಿತಿ',
    infoPanelDesc: 'ಅಧಿಕೃತ ಮಾಧ್ಯಮಗಳ ಮೂಲಕ ನೇರವಾಗಿ ಸಂಪರ್ಕಿಸಿ.',
    addressHeading: 'ಕಚೇರಿ ವಿಳಾಸ',
    viewOnMapBtn: 'ನಕ್ಷೆಯಲ್ಲಿ ನೋಡಿ',
    pujaHelpHeading: 'ಪೂಜಾ ಸಹಾಯ ಬೇಕೆ?',
    pujaHelpDesc: 'ಶಾಸ್ತ್ರೋಕ್ತ ಪೂಜೆಯ ಮಾರ್ಗದರ್ಶನಕ್ಕಾಗಿ ಗುರುಗಳನ್ನು ಸಂಪರ್ಕಿಸಿ.',
    gurujiSectionHeading: 'ಗುರೂಜಿ ಸಂಪರ್ಕ',
    gurujiSectionDesc: 'ತ್ರ್ಯಂಬಕೇಶ್ವರದ ಸಾಂಪ್ರದಾಯಿಕ ಪುರೋಹಿತರೊಂದಿಗೆ ನೇರ ಸಂಪರ್ಕ.',
    visitSectionHeading: 'ಯಾತ್ರಾ ಯೋಜನೆ',
    visitSectionDesc: 'ದರ್ಶನ ಸಮಯ ಮತ್ತು ಮಾರ್ಗದರ್ಶನ.',
    faqHeading: 'ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು',
    trustHeading: 'ಪಾರದರ್ಶಕ ಮಾಹಿತಿ • ಗೌರವಯುತ ಸೇವೆ',
    trustDesc: 'ಮಧ್ಯವರ್ತಿಗಳಿಲ್ಲದೆ ನೇರ ಸಂವಹನ.',
    finalCtaHeading: 'ನಿಮ್ಮ ಪವಿತ್ರ ಯಾತ್ರೆಯನ್ನು ಪ್ರಾರಂಭಿಸಿ',
    finalCtaDesc: 'ಜ್ಯೋತಿರ್ಲಿಂಗ ದರ್ಶನ ಮಾಡಿ ಪೂಜೆಗಳನ್ನು ನೆರವೇರಿಸಿ.',
  },
  ta: {
    heroEyebrow: '॥ ஓம் நமஃ சிவாய ॥',
    heroTitle: 'தொடர்பு கொள்ளவும்',
    heroSubtitle: 'ஸ்ரீ திரியம்பகேஸ்வரர் யாத்ரீகர் சேவை மையம்',
    heroDesc: 'திரியம்பகேஸ்வரர் ஜோதிர்லிங்கம், பூஜை சடங்குகள் மற்றும் யாத்திரை குறித்த வழிகாட்டுதலுக்கு எங்களை தொடர்பு கொள்ளவும்.',
    formHeading: 'செய்தி அனுப்பவும்',
    formDesc: 'உங்கள் விவரங்களை உள்ளிடவும், எங்கள் சேவை குழு உங்களை தொடர்பு கொள்ளும்.',
    nameLabel: 'முழு பெயர் *',
    namePlaceholder: 'உங்கள் முழு பெயரை உள்ளிடவும்',
    emailLabel: 'மின்னஞ்சல் *',
    emailPlaceholder: 'உங்கள் மின்னஞ்சலை உள்ளிடவும்',
    phoneLabel: 'தொலைபேசி எண் *',
    phonePlaceholder: 'கைபேசி அல்லது வாட்ஸ்அப் எண்',
    subjectLabel: 'பொருள் *',
    messageLabel: 'உங்கள் செய்தி *',
    messagePlaceholder: 'உங்கள் கேள்விகளை இங்கு எழுதவும்...',
    preferredMethodLabel: 'தொடர்பு வழிமுறை',
    languagePreferenceLabel: 'மொழி விருப்பம்',
    privacyConsent: 'தனியுரிமைக் கொள்கையை ஏற்றுக்கொள்கிறேன்.',
    privacyLinkText: 'தனியுரிமைக் கொள்கை',
    submitBtn: 'செய்தி அனுப்பவும்',
    submittingBtn: 'அனுப்பப்படுகிறது...',
    successHeading: 'செய்தி பெறப்பட்டது',
    successMsg: 'தொடர்பு கொண்டமைக்கு நன்றி. உங்கள் விவரங்கள் பதிவு செய்யப்பட்டுள்ளன.',
    enquiryIdLabel: 'குறிப்பு எண்',
    backHomeBtn: 'முகப்பு',
    exploreBtn: 'பூஜைகளை பார்க்க',
    infoPanelHeading: 'தொடர்பு விவரங்கள்',
    infoPanelDesc: 'சரிபார்க்கப்பட்ட அதிகாரப்பூர்வ வழிகள் மூலம் தொடர்பு கொள்ளவும்.',
    addressHeading: 'முகவரி',
    viewOnMapBtn: 'வரைபடத்தில் பார்க்க',
    pujaHelpHeading: 'பூஜை உதவி வேண்டுமா?',
    pujaHelpDesc: 'சாஸ்திரப்படி பூஜை நடத்த தகுதியான குருஜியை தொடர்பு கொள்ளவும்.',
    gurujiSectionHeading: 'குருஜியுடன் நேரடி தொடர்பு',
    gurujiSectionDesc: 'பாரம்பரிய புரோகிதர்களுடன் நேரடியாக பேசவும்.',
    visitSectionHeading: 'தரிசன வழிகாட்டி',
    visitSectionDesc: 'தரிசன நேரம் மற்றும் யாத்திரை தகவல்கள்.',
    faqHeading: 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
    trustHeading: 'தெளிவான தகவல் • மரியாதையான சேவை',
    trustDesc: 'இடைத்தரகர்கள் இல்லாத நேரடி தொடர்பு.',
    finalCtaHeading: 'புனித யாத்திரையை தொடங்குங்கள்',
    finalCtaDesc: 'திரியம்பகேஸ்வரர் தரிசனம் பெற்று ஆன்மீக அமைதி அடையுங்கள்.',
  },
  bn: {
    heroEyebrow: '॥ ॐ नमः शिवाय ॥',
    heroTitle: 'যোগাযোগ করুন',
    heroSubtitle: 'শ্রী ত্র্যম্বকেশ্বর তীর্থযাত্রী সেবা কেন্দ্র',
    heroDesc: 'ত্র্যম্বকেশ্বর জ্যোতির্লিঙ্গ, পূজা ও তীর্থযাত্রা সংক্রান্ত যেকোনো প্রশ্নের জন্য যোগাযোগ করুন।',
    formHeading: 'বার্তা পাঠান',
    formDesc: 'আপনার বিবরণ লিখুন, আমাদের সেবা দল আপনার সাথে যোগাযোগ করবে।',
    nameLabel: 'সম্পূর্ণ নাম *',
    namePlaceholder: 'আপনার পুরো নাম লিখুন',
    emailLabel: 'ইমেল ঠিকানা *',
    emailPlaceholder: 'আপনার ইমেল লিখুন',
    phoneLabel: 'ফোন নম্বর *',
    phonePlaceholder: 'মোবাইল বা হোয়াটসঅ্যাপ নম্বর',
    subjectLabel: 'বিষয় *',
    messageLabel: 'আপনার বার্তা *',
    messagePlaceholder: 'আপনার প্রশ্ন বা অনুসন্ধানের বিবরণ লিখুন...',
    preferredMethodLabel: 'যোগাযোগের মাধ্যম',
    languagePreferenceLabel: 'ভাষার পছন্দ',
    privacyConsent: 'আমি গোপনীয়তা নীতিতে সম্মত।',
    privacyLinkText: 'গোপনীয়তা নীতি',
    submitBtn: 'বার্তা পাঠান',
    submittingBtn: 'পাঠানো হচ্ছে...',
    successHeading: 'অনুসন্ধান প্রাপ্ত হয়েছে',
    successMsg: 'যোগাযোগের জন্য ধন্যবাদ। আপনার অনুসন্ধান নিবন্ধিত হয়েছে।',
    enquiryIdLabel: 'রেফারেন্স আইডি',
    backHomeBtn: 'হোম পেজ',
    exploreBtn: 'পূজা বিবরণী',
    infoPanelHeading: 'যোগাযোগ সূত্র',
    infoPanelDesc: 'যাচাইকৃত চ্যানেলের মাধ্যমে সরাসরি যোগাযোগ করুন।',
    addressHeading: 'ঠিকানা',
    viewOnMapBtn: 'মানচিত্রে দেখুন',
    pujaHelpHeading: 'পূজা সংক্রান্ত সহায়তা?',
    pujaHelpDesc: 'শাস্ত্রসম্মত পূজার জন্য যোগ্য গুরুজীর পরামর্শ নিন।',
    gurujiSectionHeading: 'গুরুজীর সাথে সরাসরি যোগাযোগ',
    gurujiSectionDesc: 'ত্র্যম্বকেশ্বরের ঐতিহ্যবাহী পুরোহিতদের প্রোফাইল দেখুন।',
    visitSectionHeading: 'যাত্রা বিবরণী',
    visitSectionDesc: 'দর্শনের সময় ও তীর্থযাত্রার নিয়মাবলী।',
    faqHeading: 'সাধারণ প্রশ্নোত্তর',
    trustHeading: 'স্পষ্ট তথ্য • শ্রদ্ধাপূর্ণ সেবা',
    trustDesc: 'দালালমুক্ত সরাসরি যোগাযোগ ব্যবস্থা।',
    finalCtaHeading: 'পবিত্র যাত্রা শুরু করুন',
    finalCtaDesc: 'ত্র্যंबকেশ্বর জ্যোতির্লিঙ্গের দর্শন করুন।',
  },
  or: {
    heroEyebrow: '॥ ॐ नमः शिवाय ॥',
    heroTitle: 'ଯୋଗାଯୋଗ କରନ୍ତୁ',
    heroSubtitle: 'ଶ୍ରୀ ତ୍ର୍ୟମ୍ବକେଶ୍ୱର ତୀର୍ଥଯାତ୍ରୀ ସେବା କେନ୍ଦ୍ର',
    heroDesc: 'ତ୍ର୍ୟମ୍ବକେଶ୍ୱର ଜ୍ୟୋତିର୍ଲିଙ୍ଗ, ପୂଜା ବିଧି ଓ ତୀର୍ଥଯାତ୍ରା ସମ୍ପର୍କିତ ସୂଚନା ପାଇଁ ଯୋଗାଯୋଗ କରନ୍ତୁ।',
    formHeading: 'ବାର୍ତ୍ତା ପଠାନ୍ତୁ',
    formDesc: 'ଆପଣଙ୍କ ବିବରଣୀ ପ୍ରଦାନ କରନ୍ତୁ, ଆମର ସେବା ଦଳ ଯୋଗାଯୋଗ କରିବେ।',
    nameLabel: 'ପୂରା ନାମ *',
    namePlaceholder: 'ଆପଣଙ୍କ ନାମ ଲେଖନ୍ତୁ',
    emailLabel: 'ଇମେଲ ଠିକଣା *',
    emailPlaceholder: 'ଇମେଲ ଲେଖନ୍ତୁ',
    phoneLabel: 'ଫୋନ ନମ୍ବର *',
    phonePlaceholder: 'ମୋବାଇଲ ବା ହ୍ୱାଟ୍ସଆପ ନମ୍ବର',
    subjectLabel: 'ବିଷୟ *',
    messageLabel: 'ଆପଣଙ୍କ ବାର୍ତ୍ତା *',
    messagePlaceholder: 'ଆପଣଙ୍କ ପ୍ରଶ୍ନ ଏଠାରେ ଲେଖନ୍ତୁ...',
    preferredMethodLabel: 'ଯୋଗାଯୋଗର ମାଧ୍ୟମ',
    languagePreferenceLabel: 'ଭାଷା ପସନ୍ଦ',
    privacyConsent: 'ମୁଁ ଗୋପନୀୟତା ନୀତି ସହିତ ସହମତ।',
    privacyLinkText: 'ଗୋପନୀୟତା ନୀତି',
    submitBtn: 'ବାର୍ତ୍ତା ପଠାନ୍ତୁ',
    submittingBtn: 'ପଠାଯାଉଛି...',
    successHeading: 'ଅନୁସନ୍ଧାନ ପଞ୍ଜିକୃତ ହେଲା',
    successMsg: 'ଯୋଗାଯୋଗ କରିଥିବାରୁ ଧନ୍ୟବାଦ। ଆପଣଙ୍କ ବିବରଣୀ ସୁରକ୍ଷିତ ଭାବେ ରଖାଯାଇଛି।',
    enquiryIdLabel: 'ରେଫରେନ୍ସ ଆଇଡି',
    backHomeBtn: 'ମୁଖ୍ୟ ପୃଷ୍ଠା',
    exploreBtn: 'ପୂଜା ବିଧି ଦେଖନ୍ତୁ',
    infoPanelHeading: 'ଯୋଗାଯୋଗ ବିବରଣୀ',
    infoPanelDesc: 'ଯାଞ୍ଚ ହୋଇଥିବା ମାଧ୍ୟମ ଦ୍ୱାରା ସିଧାସଳଖ ଯୋଗାଯୋଗ କରନ୍ତୁ।',
    addressHeading: 'କାର୍ଯ୍ୟାଳୟ ଠିକଣା',
    viewOnMapBtn: 'ମାନଚିତ୍ରରେ ଦେଖନ୍ତୁ',
    pujaHelpHeading: 'ପୂଜା ସହାୟତା ଆବଶ୍ୟକ କି?',
    pujaHelpDesc: 'ଶାସ୍ତ୍ରୋକ୍ତ ପୂଜା ପାଇଁ ଯୋଗ୍ୟ ଗୁରୁଜୀଙ୍କ ପରାମର୍ଶ ନିଅନ୍ତୁ।',
    gurujiSectionHeading: 'ଗୁରୁଜୀଙ୍କ ସହିତ ସିଧାସଳଖ ଯୋଗାଯୋଗ',
    gurujiSectionDesc: 'ତ୍ର୍ୟମ୍ବକେଶ୍ୱରର ପାରମ୍ପରିକ ପୁରୋହିତଙ୍କ ସହିତ କଥା ହୁଅନ୍ତୁ।',
    visitSectionHeading: 'ଦର୍ଶନ ଯୋଜନା',
    visitSectionDesc: 'ଦର୍ଶନ ସମୟ ଓ ନିୟମାବଳୀ।',
    faqHeading: 'ସାଧାରଣ ପ୍ରଶ୍ନୋତ୍ତର',
    trustHeading: 'ସ୍ପଷ୍ଟ ସୂଚନା • ଶ୍ରଦ୍ଧାପୂର୍ଣ୍ଣ ସେବା',
    trustDesc: 'କୌଣସି ମଧ୍ୟସ୍ଥଙ୍କ ବିନା ସିଧାସଳଖ ସମ୍ପର୍କ।',
    finalCtaHeading: 'ପବିତ୍ର ଯାତ୍ରା ଆରମ୍ଭ କରନ୍ତୁ',
    finalCtaDesc: 'ଶ୍ରୀ ତ୍ର୍ୟମ୍ବକେଶ୍ୱର ଜ୍ୟୋତିର୍ଲିଙ୍ଗଙ୍କ ଦର୍ଶନ କରନ୍ତୁ।',
  },
};
