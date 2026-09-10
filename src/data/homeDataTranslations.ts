import { SupportedLanguage } from '../types';

export interface GurujiSectionData {
  disclaimerNote: string;
  yearsVedicExp: string;
  paramparaLabel: string;
  educationLabel: string;
  languagesLabel: string;
  closeBtn: string;
  bookWithGurujiBtn: string;
}

export interface SacredPlaceData {
  id: string;
  name: string;
  nativeName: string;
  distanceFromTemple: string;
  significance: string;
  description: string;
  timings?: string;
  elevation?: string;
}

export interface StoryChapterData {
  chapter: string;
  titleNative: string;
  titleEng: string;
  quote: string;
  content: string;
  puranaQuote: string;
}

export interface FestivalData {
  id: string;
  name: string;
  nativeName: string;
  traditionalPeriod: string;
  description: string;
  significance: string;
}

export interface DarshanTimingData {
  name: string;
  nameNative: string;
  time: string;
  description: string;
}

export interface DarshanGuidelinesData {
  menLabel: string;
  womenLabel: string;
  securityTitle: string;
  securityDesc: string;
  seniorTitle: string;
  seniorDesc: string;
}

export interface HowToReachData {
  roadDetails: string[];
  trainDetails: string[];
  airDetails: string[];
  coordsTitle: string;
  coordsAddress: string;
  coordsMeta: string;
  mapsBtn: string;
}

export interface DevoteeReviewData {
  name: string;
  city: string;
  puja: string;
  date: string;
  comment: string;
}

export interface FaqData {
  id: string;
  question: string;
  questionNative: string;
  answer: string;
}

// -------------------------------------------------------------
// 1. GURUJI SECTION TRANSLATIONS
// -------------------------------------------------------------
export const GURUJI_SECTION_TRANSLATIONS: Record<SupportedLanguage, GurujiSectionData> = {
  en: {
    disclaimerNote: '* Authorized and certified Purohits adhering strictly to the Vedic customs and guidelines of Trimbak Kshetra. Direct coordination without intermediary commissions.',
    yearsVedicExp: 'Years Vedic Experience',
    paramparaLabel: 'Parampara',
    educationLabel: 'Vedic Education',
    languagesLabel: 'Languages',
    closeBtn: 'Close',
    bookWithGurujiBtn: 'Book with this Guruji',
  },
  mr: {
    disclaimerNote: '* त्र्यंबक क्षेत्राच्या वैदिक परंपरा व नियमांचे काटेकोर पालन करणारे अधिकृत व प्रमाणित पुरोहित. मध्यस्थांशिवाय थेट संपर्क व पारदर्शकता.',
    yearsVedicExp: 'वर्षे वैदिक अनुभव',
    paramparaLabel: 'परंपरा',
    educationLabel: 'वैदिक शिक्षण',
    languagesLabel: 'भाषा',
    closeBtn: 'बंद करा',
    bookWithGurujiBtn: 'या गुरुजींसोबत पूजा बुक करा',
  },
  hi: {
    disclaimerNote: '* त्र्यंबकेश्वर क्षेत्र की वैदिक परंपराओं और नियमों का निष्ठापूर्वक पालन करने वाले अधिकृत एवं प्रमाणित पुरोहित। बिना बिचौलियों के सीधा समन्वय।',
    yearsVedicExp: 'वर्षों का वैदिक अनुभव',
    paramparaLabel: 'परंपरा',
    educationLabel: 'वैदिक शिक्षा',
    languagesLabel: 'भाषाएं',
    closeBtn: 'बंद करें',
    bookWithGurujiBtn: 'इन गुरुजी के साथ पूजा बुक करें',
  },
  sa: {
    disclaimerNote: '* त्र्यम्बकेश्वरक्षेत्रस्य वैदिकमर्यादानुकूलम् अधिकृताः वंशपरम्परागताः पुरोहिताः। मध्यस्थरहितं प्रत्यक्षं समन्वयम्।',
    yearsVedicExp: 'वर्षाणां वेदानुभवः',
    paramparaLabel: 'परम्परा',
    educationLabel: 'वैदिकशिक्षणम्',
    languagesLabel: 'भाषाः',
    closeBtn: 'पिदधातु',
    bookWithGurujiBtn: 'एभिः गुरुवर्यैः सह सङ्कल्पं कुरुत',
  },
  gu: {
    disclaimerNote: '* ત્ર્યંબકેશ્વર ક્ષેત્રની વૈદિક પરંપરા અને નિયમોનું ચુસ્ત પાલન કરતા અધિકૃત અને પ્રમાણિત પુરોહિતો. દલાલો વિના સીધો સંપર્ક.',
    yearsVedicExp: 'વર્ષોનો વૈદિક અનુભવ',
    paramparaLabel: 'પરંપરા',
    educationLabel: 'વૈદિક શિક્ષણ',
    languagesLabel: 'ભાષાઓ',
    closeBtn: 'બંધ કરો',
    bookWithGurujiBtn: 'આ ગુરુજી સાથે પૂજા બુક કરો',
  },
  te: {
    disclaimerNote: '* త్రయంబకేశ్వర్ క్షేత్ర వేద సంప్రదాయాలు మరియు నియమాలను ఖచ్చితంగా పాటించే అధికారిక వంశపారంపర్య పురోహితులు. దళారులు లేకుండా ప్రత్యక్ష సమన్వయం.',
    yearsVedicExp: 'సంవత్సరాల వైదిక అనుభవం',
    paramparaLabel: 'పరంపర',
    educationLabel: 'వేద విద్య',
    languagesLabel: 'భాషలు',
    closeBtn: 'మూసివేయి',
    bookWithGurujiBtn: 'ఈ గురూజీతో పూజ బుక్ చేయండి',
  },
  kn: {
    disclaimerNote: '* ತ್ರ್ಯಂಬಕ ಕ್ಷೇತ್ರ ಪರಂಪರೆ ಮತ್ತು ನಿಯಮಗಳನ್ನು ಕಟ್ಟುನಿಟ್ಟಾಗಿ ಪಾಲಿಸುವ ಅಧಿಕೃತ ಹಾಗೂ ಪ್ರಮಾಣಿತ ವೈದಿಕ ಪುರೋಹಿತರು. ಮಧ್ಯವರ್ತಿಗಳಿಲ್ಲದೆ ನೇರ ಸಮನ್ವಯ.',
    yearsVedicExp: 'ವರ್ಷಗಳ ವೈದಿಕ ಅನುಭವ',
    paramparaLabel: 'ಪರಂಪರೆ',
    educationLabel: 'ವೈದಿಕ ಶಿಕ್ಷಣ',
    languagesLabel: 'ಭಾಷೆಗಳು',
    closeBtn: 'ಮುಚ್ಚಿ',
    bookWithGurujiBtn: 'ಈ ಗುರೂಜಿಯೊಂದಿಗೆ ಪೂಜೆ ಬುಕ್ ಮಾಡಿ',
  },
  ta: {
    disclaimerNote: '* திரிம்பகேஷ்வர திருத்தல வேத நெறிமுறைகளை முழுமையாகக் கடைபிடிக்கும் அங்கீகரிக்கப்பட்ட பரம்பரை புரோகிதர்கள். தரகர்கள் இன்றி நேரடி வழிகாட்டல்.',
    yearsVedicExp: 'ஆண்டுகள் வேத அனுபவம்',
    paramparaLabel: 'பாரம்பரியம்',
    educationLabel: 'வேதக் கல்வி',
    languagesLabel: 'மொழிகள்',
    closeBtn: 'மூடுக',
    bookWithGurujiBtn: 'இந்த குருஜியுடன் பூஜை பதிவு செய்க',
  },
  bn: {
    disclaimerNote: '* ত্র্যম্বকেশ্বর ক্ষেত্রের বৈদিক শাস্ত্রাচার ও নিয়মাবলি কঠোরভাবে অনুসরণকারী অনুমোদিত বৈদিক পুরোহিতমণ্ডলী। মধ্যস্থতাবিহীন সরাসরি যোগাযোগ।',
    yearsVedicExp: 'বছরের বৈদিক অভিজ্ঞতা',
    paramparaLabel: 'পরম্পরা',
    educationLabel: 'বৈদিক শিক্ষা',
    languagesLabel: 'ভাষা',
    closeBtn: 'বন্ধ করুন',
    bookWithGurujiBtn: 'এই গুরুজীর সাথে পূজা বুক করুন',
  },
  or: {
    disclaimerNote: '* ତ୍ର୍ୟମ୍ବକେଶ୍ୱର କ୍ଷେତ୍ରର ବୈଦିକ ନୀତିନିୟମକୁ ନିଷ୍ଠାର ସହ ପାଳନ କରୁଥିବା ପ୍ରାମାଣିକ ବଂଶାନୁକ୍ରମିକ ପୁରୋହିତ। ବିନା ଦଲାଲରେ ସିଧାସଳଖ ସେବା।',
    yearsVedicExp: 'ବର୍ଷର ବୈଦିକ ଅନୁଭବ',
    paramparaLabel: 'ପରମ୍ପରା',
    educationLabel: 'ବୈଦିକ ଶିକ୍ଷା',
    languagesLabel: 'ଭାଷା',
    closeBtn: 'ବନ୍ଦ କରନ୍ତୁ',
    bookWithGurujiBtn: 'ଏହି ଗୁରୁଜୀଙ୍କ ସହିତ ପୂଜା ବୁକ୍ କରନ୍ତୁ',
  },
};

// -------------------------------------------------------------
// 2. SACRED PLACES TRANSLATIONS
// -------------------------------------------------------------
export const SACRED_PLACES_DATA: Record<SupportedLanguage, SacredPlaceData[]> = {
  en: [
    {
      id: 'trimbakeshwar-mandir',
      name: 'Shri Trimbakeshwar Temple',
      nativeName: 'त्र्यंबकेश्वर मंदिर',
      distanceFromTemple: 'Center of Kshetra',
      significance: 'The core 12th-century black basalt Jyotirlinga temple built by Peshwa Nana Saheb.',
      description: 'Masterpiece of Hemadpanthi architecture featuring intricate stone carvings, the holy sanctum enshrining the three-faced linga, and majestic Sabha Mandap surrounded by high stone ramparts.',
      timings: '05:30 AM - 09:00 PM',
    },
    {
      id: 'kushavarta-tirtha',
      name: 'Kushavarta Tirtha (Kund)',
      nativeName: 'कुशावर्त तीर्थ',
      distanceFromTemple: '400 meters (5 min walk)',
      significance: 'The sacred pond where Rishi Gautama stopped and consecrated the holy river Godavari.',
      description: 'All Vedic rituals including Narayan Nagbali begin with a sacred holy dip (Snaan) here. Built with grand stone ghats and pillared pavilions, it is revered as the gateway of spiritual purification.',
      timings: 'Open all day for Snan',
    },
    {
      id: 'brahmagiri-parvat',
      name: 'Brahmagiri Mountain',
      nativeName: 'ब्रह्मगिरी पर्वत',
      distanceFromTemple: '1 km to base (approx. 750 stone steps)',
      significance: 'The physical mountain form of Lord Shiva and original source of the Godavari river.',
      description: 'Towering majestic fortress mountain in the Western Ghats. Climbing its stone-cut steps leads to Gangadwar, cave shrines, ancient viewpoints, and lush Sahyadri mist.',
      elevation: '1,295 meters',
    },
    {
      id: 'gangadwar',
      name: 'Gangadwar',
      nativeName: 'गंगाद्वार',
      distanceFromTemple: 'Brahmagiri halfway point (approx. 45 min climb)',
      significance: 'Where the river Godavari first emerges from the mouth of a stone Nandi cow.',
      description: 'Devotees climb up to receive the first drops of Gautami Ganga water. Nearby lies the revered shrine of Sage Gautama and Mother Ahilya.',
      timings: '06:00 AM - 06:00 PM',
    },
    {
      id: 'kedareshwar',
      name: 'Kedareshwar Temple',
      nativeName: 'केदारेश्वर',
      distanceFromTemple: '1.5 km towards Brahmagiri',
      significance: 'Ancient cave temple dedicated to Lord Shiva in an undisturbed natural alcove.',
      description: 'A deeply serene sanctuary surrounded by waterfalls during monsoon, where yogis and pilgrims contemplate in meditative stillness.',
      timings: '06:00 AM - 07:00 PM',
    },
    {
      id: 'nivruttinath-samadhi',
      name: 'Sant Nivruttinath Maharaj Samadhi',
      nativeName: 'संत निवृत्तिनाथ महाराज समाधी',
      distanceFromTemple: '1.2 km from Main Temple',
      significance: 'Sanjeevan Samadhi of elder brother and Guru of Sant Dnyaneshwar Maharaj.',
      description: 'One of the most sacred pilgrimage centers of the Varkari tradition in Maharashtra. The temple radiates profound devotional quietude and Abhang chanting.',
      timings: '05:00 AM - 09:30 PM',
    },
    {
      id: 'anjaneri-parvat',
      name: 'Anjaneri Hill',
      nativeName: 'अंजनेरी पर्वत',
      distanceFromTemple: '7 km from Trimbakeshwar',
      significance: 'Revered in Sanatan tradition as the sacred birthplace of Lord Hanumanji.',
      description: 'Named after Mata Anjani, this spectacular mountain plateau features historic rock-cut temples, Jain caves, and trekking routes with breathtaking views of Nashik valley.',
      elevation: '1,280 meters',
    },
    {
      id: 'saptashrungi-gad',
      name: 'Shree Saptashrungi Nivasini Devi',
      nativeName: 'सप्तशृंगी देवी (वणी)',
      distanceFromTemple: '65 km (convenient day trip)',
      significance: 'One of the three-and-a-half Shakti Peethas of Maharashtra (Ardha Shaktipeeth).',
      description: 'Enshrined atop seven majestic mountain peaks (Sapta-shringa), the monumental 8-foot-tall Swayambhu idol of Mahishasuramardini has 18 arms holding divine weapons.',
      timings: '05:00 AM - 09:00 PM',
    },
  ],
  mr: [
    {
      id: 'trimbakeshwar-mandir',
      name: 'श्री त्र्यंबकेश्वर ज्योतिर्लिंग मंदिर',
      nativeName: 'त्र्यंबकेश्वर मंदिर',
      distanceFromTemple: 'क्षेत्राचे मध्यवर्ती केंद्र',
      significance: 'पेशवे नानासाहेब यांनी बांधलेले १२ व्या शतकातील भव्य हेमाडपंथी काळ्या पाषाणातील ज्योतिर्लिंग मंदिर.',
      description: 'अप्रतिम कोरीवकाम, त्रिमुखी ज्योतिर्लिंग प्रतिष्ठापित असलेले गर्भगृह, आणि उंच दगडी तटबंदीने वेढलेला भव्य सभामंडप हे या मंदिराचे वैशिष्ट्य आहे.',
      timings: 'पहाटे ०५:३० ते रात्री ०९:००',
    },
    {
      id: 'kushavarta-tirtha',
      name: 'कुशावर्त तीर्थ (कुंड)',
      nativeName: 'कुशावर्त तीर्थ',
      distanceFromTemple: '४०० मीटर (५ मिनिटांचे अंतर)',
      significance: 'महर्षि गौतम ऋषींनी दर्भाच्या साहाय्याने पवित्र गोदावरी नदीला अडवून पावन केलेले अमृततीर्थ.',
      description: 'नारायण नागबळीसह सर्व प्रमुख वैदिक विधींची सुरुवात कुशावर्तातील पवित्र स्नानाने होते. चारी बाजूंनी देखणे दगडी घाट आणि ओवऱ्यांनी हे तीर्थ सुशोभित आहे.',
      timings: 'पवित्र स्नानासाठी दिवसभर खुले',
    },
    {
      id: 'brahmagiri-parvat',
      name: 'ब्रह्मगिरी पर्वत',
      nativeName: 'ब्रह्मगिरी पर्वत',
      distanceFromTemple: 'पायथ्याशी १ किमी (सुमारे ७५० दगडी पायऱ्या)',
      significance: 'भगवान शिवाचे साक्षात शैल्यरूप आणि दक्षिण गंगा गोदावरीचे मूळ उगमस्थान.',
      description: 'सह्याद्रीच्या डोंगररांगांमधील बुलंद गिरीदुर्ग. दगडी पायऱ्या चढून गंगाद्वार, प्राचीन लेणी, गुहा आणि निसर्गरम्य धुक्याने वेढलेले शिखर येथे पोहोचता येते.',
      elevation: '१,२९५ मीटर',
    },
    {
      id: 'gangadwar',
      name: 'गंगाद्वार',
      nativeName: 'गंगाद्वार',
      distanceFromTemple: 'ब्रह्मगिरीच्या मध्यावर (४५ मिनिटांची चढण)',
      significance: 'दगडी गोमुखातून पवित्र गोदावरी नदीचा पहिला प्रवाह प्रकट होतो ते पावन स्थान.',
      description: 'भाविक येथे येऊन गौतमी गंगेचे प्रथम जल अंगावर शिंपडतात. जवळच गौतम ऋषी व माता अहिल्या यांचे पूजनीय मंदिर आहे.',
      timings: 'सकाळी ०६:०० ते संध्याकाळी ०६:००',
    },
    {
      id: 'kedareshwar',
      name: 'केदारेश्वर मंदिर',
      nativeName: 'केदारेश्वर',
      distanceFromTemple: 'ब्रह्मगिरीकडे १.५ किमी',
      significance: 'नैसर्गिक गुहेत स्थित भगवान शंकरांचे प्राचीन व शांत मंदिर.',
      description: 'पावसाळ्यात जलप्रपातांनी वेढलेले हे अत्यंत शांत ठिकाण साधक व भाविकांना मनःशांती प्रदान करते.',
      timings: 'सकाळी ०६:०० ते संध्याकाळी ०७:००',
    },
    {
      id: 'nivruttinath-samadhi',
      name: 'संत निवृत्तिनाथ महाराज समाधी मंदिर',
      nativeName: 'संत निवृत्तिनाथ महाराज समाधी',
      distanceFromTemple: 'मुख्य मंदिरापासून १.२ किमी',
      significance: 'संत ज्ञानेश्वर महाराजांचे ज्येष्ठ बंधू व सद्गुरू संत निवृत्तिनाथ महाराजांची संजीवनी समाधी.',
      description: 'वारकरी संप्रदायाचे महाराष्ट्रातील अत्यंत पवित्र तीर्थक्षेत्र, जिथे अखंड हरिनाम संकीर्तन आणि अभंगवाणीचा निनाद चालू असतो.',
      timings: 'पहाटे ०५:०० ते रात्री ०९:३०',
    },
    {
      id: 'anjaneri-parvat',
      name: 'अंजनेरी पर्वत',
      nativeName: 'अंजनेरी पर्वत',
      distanceFromTemple: 'त्र्यंबकेश्वरपासून ७ किमी',
      significance: 'सनातन परंपरेनुसार संकटमोचन भगवान मारुतीरायांचे (हनुमानजी) पावन जन्मस्थान.',
      description: 'माता अंजनीच्या नावावरून ओळखला जाणारा हा पठारी पर्वत ऐतिहासिक मंदिरे, प्राचीन जैन गुहा आणि सुंदर निसर्गदृश्यांसाठी प्रसिद्ध आहे.',
      elevation: '१,२८० मीटर',
    },
    {
      id: 'saptashrungi-gad',
      name: 'श्री सप्तशृंगी निवासिनी देवी (वणी)',
      nativeName: 'सप्तशृंगी देवी (वणी)',
      distanceFromTemple: '६५ किमी (एका दिवसाची यात्रा)',
      significance: 'महाराष्ट्रातील साडेतीन शक्तिपीठांपैकी एक प्रमुख अर्धपीठ.',
      description: 'सात उत्तुंग शिखरांच्या कुशीत विराजमान असलेली महिषासुरमर्दिनी अठराभुजांची ८ फूट उंच भव्य स्वयंभू मूर्ती.',
      timings: 'सकाळी ०५:०० ते रात्री ०९:००',
    },
  ],
  hi: [
    {
      id: 'trimbakeshwar-mandir',
      name: 'श्री त्र्यंबकेश्वर ज्योतिर्लिंग मंदिर',
      nativeName: 'त्र्यंबकेश्वर मंदिर',
      distanceFromTemple: 'क्षेत्र का मुख्य केंद्र',
      significance: 'पेशवा नानासाहेब द्वारा निर्मित १२वीं शताब्दी का भव्य हेमाडपंथी काले पत्थरों का ज्योतिर्लिंग मंदिर।',
      description: 'अद्भुत नक्काशी, ब्रह्मा-विष्णु-महेश रूपी त्रिमुखी ज्योतिर्लिंग और ऊंची चारदीवारी से घिरा भव्य सभामंडप इस पावन धाम की पहचान है।',
      timings: 'प्रातः ०५:३० से रात्रि ०९:००',
    },
    {
      id: 'kushavarta-tirtha',
      name: 'कुशावर्त तीर्थ (कुंड)',
      nativeName: 'कुशावर्त तीर्थ',
      distanceFromTemple: '४०० मीटर (५ मिनट की दूरी)',
      significance: 'ऋषि गौतम द्वारा कुशा (दर्भ) के स्पर्श से पवित्र गोदावरी नदी को प्रकट व संचित करने वाला अमृत कुंड।',
      description: 'नारायण नागबलि सहित सभी वैदिक अनुष्ठानों का आरंभ इसी पावन कुंड में पवित्र स्नान से होता है। यह कुंड सुंदर शिला-घाटों से सुशोभित है।',
      timings: 'पवित्र स्नान हेतु दिनभर खुला',
    },
    {
      id: 'brahmagiri-parvat',
      name: 'ब्रह्मगिरी पर्वत',
      nativeName: 'ब्रह्मगिरी पर्वत',
      distanceFromTemple: 'तलहटी से १ किमी (लगभग ७५० सीढ़ियां)',
      significance: 'भगवान शिव का साक्षात शैल स्वरूप और पवित्र गोदावरी नदी का मूल उद्गम स्थल।',
      description: 'सह्याद्रि पर्वतमाला का विशाल गिरिदुर्ग। सीढ़ियां चढ़कर गंगाद्वार, प्राचीन गुफाओं और मनोहारी वादियों का दर्शन होता है।',
      elevation: '१,२९५ मीटर',
    },
    {
      id: 'gangadwar',
      name: 'गंगाद्वार',
      nativeName: 'गंगाद्वार',
      distanceFromTemple: 'ब्रह्मगिरी के मध्य (४५ मिनट की चढ़ाई)',
      significance: 'वह स्थान जहाँ गोमुख शिला से पवित्र गोदावरी की प्रथम जलधारा प्रवाहित होती है।',
      description: 'श्रद्धालु यहाँ गौतमी गंगा की प्रथम बूंदों से अभिषेक करते हैं। निकट ही महर्षि गौतम और माता अहिल्या का पावन मंदिर है।',
      timings: 'प्रातः ०६:०० से सायं ०६:००',
    },
    {
      id: 'kedareshwar',
      name: 'केदारेश्वर मंदिर',
      nativeName: 'केदारेश्वर',
      distanceFromTemple: 'ब्रह्मगिरी मार्ग पर १.५ किमी',
      significance: 'प्राकृतिक कंदरा में स्थित भगवान शिव का प्राचीन व अत्यंत शांत तीर्थ।',
      description: 'वर्षाकाल में झरनों से घिरा यह अत्यंत रमणीय स्थल साधकों और भक्तों को आत्मिक शांति प्रदान करता है।',
      timings: 'प्रातः ०६:०० से सायं ०७:००',
    },
    {
      id: 'nivruttinath-samadhi',
      name: 'संत निवृत्तिनाथ महाराज समाधि',
      nativeName: 'संत निवृत्तिनाथ महाराज समाधी',
      distanceFromTemple: 'मुख्य मंदिर से १.२ किमी',
      significance: 'संत ज्ञानेश्वर महाराज के बड़े भाई और गुरु संत निवृत्तिनाथ जी की संजीवन समाधि।',
      description: 'वारकरी संप्रदाय का पावन तीर्थ जहाँ निरंतर अभंग और हरिनाम संकीर्तन की मधुर गूंज रहती है।',
      timings: 'प्रातः ०५:०० से रात्रि ०९:३०',
    },
    {
      id: 'anjaneri-parvat',
      name: 'अंजनेरी पर्वत',
      nativeName: 'अंजनेरी पर्वत',
      distanceFromTemple: 'त्र्यंबकेश्वर से ७ किमी',
      significance: 'सनातन मान्यता के अनुसार भगवान संकटमोचन हनुमान जी का पावन जन्मस्थान।',
      description: 'माता अंजनी के नाम पर प्रसिद्ध यह पर्वत ऐतिहासिक गुफाओं, प्राचीन मंदिरों और ट्रेकिंग के लिए विख्यात है।',
      elevation: '१,२८० मीटर',
    },
    {
      id: 'saptashrungi-gad',
      name: 'श्री सप्तशृंगी देवी (वणी)',
      nativeName: 'सप्तशृंगी देवी (वणी)',
      distanceFromTemple: '६५ किमी (एक दिवसीय यात्रा)',
      significance: 'महाराष्ट्र के साढ़े तीन शक्तिपीठों में से एक प्रमुख शक्तिपीठ।',
      description: 'सात शिखरों के मध्य विराजी अठारह भुजाओं वाली महिषासुरमर्दिनी की ८ फीट ऊंची भव्य स्वयंभू मूर्ति।',
      timings: 'प्रातः ०५:०० से रात्रि ०९:००',
    },
  ],
  sa: [
    {
      id: 'trimbakeshwar-mandir',
      name: 'श्री त्र्यम्बकेश्वर ज्योतिर्लिङ्गमन्दिरम्',
      nativeName: 'त्र्यम्बकेश्वर मन्दिरम्',
      distanceFromTemple: 'क्षेत्रस्य केन्द्रम्',
      significance: 'नानासाहेब पेशवे महोदयेन निर्मितं कृष्णशिलामयं द्वादशज्योतिर्लिङ्गेषु अष्टमं पावनधाम।',
      description: 'हेमाडपन्थी स्थापत्यकला, ब्रह्मा-विष्णु-रुद्ररूपा त्रिमूर्तिः, तथा विशालः सभामण्डपः।',
      timings: 'प्रातः ०५:३० तः रात्रौ ०९:०० पर्यन्तम्',
    },
    {
      id: 'kushavarta-tirtha',
      name: 'कुशावर्ततीर्थम्',
      nativeName: 'कुशावर्त तीर्थम्',
      distanceFromTemple: '४०० मी. (५ निमेषाः)',
      significance: 'गौतममहर्षिणा दर्भेण बद्धा संप्रवर्तिता दक्षिणगङ्गा गोदावरी।',
      description: 'नारायणनागबल्यादिसर्ववैदिकविधीनां शुभारम्भोऽत्र पावनस्नानेन भवति। शिलाघट्टाः मनोहराः सन्ति।',
      timings: 'स्नानाय सर्वदा उद्घाटितम्',
    },
    {
      id: 'brahmagiri-parvat',
      name: 'ब्रह्मगिरिपर्वतः',
      nativeName: 'ब्रह्मगिरी पर्वतः',
      distanceFromTemple: 'मूलतः १ कि.मी.',
      significance: 'भगवान् शिवः साक्षात् शैलरूपेण स्थितः, गोदावर्याः उद्गमस्थलम्।',
      description: 'सह्याद्रिशृङ्गस्थः विशालः पर्वतः, यत्र सोपानैः गङ्गाद्वारं प्रति गन्तुं शक्यते।',
      elevation: '१,२९५ मी.',
    },
    {
      id: 'gangadwar',
      name: 'गङ्गाद्वारम्',
      nativeName: 'गङ्गाद्वारम्',
      distanceFromTemple: 'ब्रह्मगिरेः मध्यभागे',
      significance: 'यत्र गोमुखात् प्रथमं गोदावर्याः दिव्यप्रवाहः प्रादुर्भवति।',
      description: 'भक्ताः अत्र पवित्रजलस्पर्शं कुर्वन्ति, समीपे च श्रीगौतमाहिल्यातीर्थं विराजते।',
      timings: 'प्रातः ०६:०० तः सायं ०६:००',
    },
    {
      id: 'kedareshwar',
      name: 'केदारेश्वरमन्दिरम्',
      nativeName: 'केदारेश्वरः',
      distanceFromTemple: '१.५ कि.मी.',
      significance: 'प्राकृतिकगुहायां स्थितः शिवस्य पुरातनः एकान्तप्रदः धाम।',
      description: 'वर्षाकाले जलप्रपातैः परिवेष्टितं ध्यानसाधनायोग्यं पावनं स्थानम्।',
      timings: 'प्रातः ०६:०० तः सायं ०७:००',
    },
    {
      id: 'nivruttinath-samadhi',
      name: 'सन्त निवृत्तिनाथ महाराज समाधिमन्दिरम्',
      nativeName: 'सन्त निवृत्तिनाथ समाधिः',
      distanceFromTemple: '१.२ कि.मी.',
      significance: 'सन्त ज्ञानेश्वरस्य ज्येष्ठभ्रातुः गुरोश्च सञ्जीवनसमाधिस्थलम्।',
      description: 'वारकरीसम्प्रदायस्य परमं श्रद्धाकेन्द्रं यत्र अनवरतं नामस्मरणं प्रचलति।',
      timings: 'प्रातः ०५:०० तः रात्रौ ०९:३०',
    },
    {
      id: 'anjaneri-parvat',
      name: 'अञ्जनेरीपर्वतः',
      nativeName: 'अञ्जनेरी पर्वतः',
      distanceFromTemple: '७ कि.मी.',
      significance: 'सनातनपरम्परानुसारं भगवतः श्रीहनुमतः पावनं जन्मस्थलम्।',
      description: 'माता अञ्जनेः नाम्ना प्रसिद्धः पर्वतः, यत्र शैलमन्दिराणि दृश्यन्ते।',
      elevation: '१,२८० मी.',
    },
    {
      id: 'saptashrungi-gad',
      name: 'श्री सप्तशृङ्गी देवी (वणी)',
      nativeName: 'सप्तशृङ्गी देवी',
      distanceFromTemple: '६५ कि.मी.',
      significance: 'महाराष्ट्रस्य शक्तिपीठेषु परमपावनं पीठम्।',
      description: 'सप्तशृङ्गेषु स्थिता अष्टादशभुजा महिषासुरमर्दिनी देवी।',
      timings: 'प्रातः ०५:०० तः रात्रौ ०९:००',
    },
  ],
  gu: [
    {
      id: 'trimbakeshwar-mandir',
      name: 'શ્રી ત્ર્યંબકેશ્વર જ્યોતિર્લિંગ મંદિર',
      nativeName: 'ત્ર્યંબકેશ્વર મંદિર',
      distanceFromTemple: 'તીર્થક્ષેત્રનું કેન્દ્ર',
      significance: 'પેશ્વા નાનાસાહેબ દ્વારા નિર્મિત ૧૨મી સદીનું ભવ્ય હેમાડપંથી કાળા પથ્થરનું જ્યોતિર્લિંગ મંદિર.',
      description: 'અદ્ભુત કોતરણી, ત્રિમૂર્તિ જ્યોતિર્લિંગ ગર્ભગૃહ અને વિશાળ પથ્થરની દીવાલોથી ઘેરાયેલો સભામંડપ.',
      timings: 'સવારે ૦૫:૩૦ થી રાત્રે ૦૯:૦૦',
    },
    {
      id: 'kushavarta-tirtha',
      name: 'કુશાવર્ત તીર્થ (કુંડ)',
      nativeName: 'કુશાવર્ત તીર્થ',
      distanceFromTemple: '૪૦૦ મીટર (૫ મિનિટ)',
      significance: 'ગૌતમ ઋષિએ દર્ભથી પવિત્ર ગોદાવરી નદીને એકત્રિત કરી પાવન કરેલું કુંડ.',
      description: 'નારાયણ નાગબલી સહિતના તમામ વૈદિક વિધિઓ આ કુંડમાં પવિત્ર સ્નાનથી શરૂ થાય છે.',
      timings: 'પવિત્ર સ્નાન માટે દિવસભર ખુલ્લું',
    },
    {
      id: 'brahmagiri-parvat',
      name: 'બ્રહ્મગિરી પર્વત',
      nativeName: 'બ્રહ્મગિરી પર્વત',
      distanceFromTemple: 'તળેટીથી ૧ કિમી (આશરે ૭૫૦ પગથિયાં)',
      significance: 'ભગવાન શિવનું સાક્ષાત શૈલ્ય સ્વરૂપ અને ગોદાવરી નદીનું મૂળ ઉદ્ગમ સ્થાન.',
      description: 'સહ્યાદ્રિનું ભવ્ય શિખર, પગથિયાં ચડીને ગંગાદ્વાર અને પ્રાચીન ગુફાઓના દર્શન થાય છે.',
      elevation: '૧,૨૯૫ મીટર',
    },
    {
      id: 'gangadwar',
      name: 'ગંગાદ્વાર',
      nativeName: 'ગંગાદ્વાર',
      distanceFromTemple: 'બ્રહ્મગિરીના મધ્યે (૪૫ મિનિટ)',
      significance: 'જ્યાં પથ્થરના ગોમુખમાંથી ગોદાવરીની પ્રથમ જળધારા પ્રગટ થાય છે.',
      description: 'યાત્રાળુઓ અહીં પવિત્ર ગંગાજળનો અભિષેક લે છે. પાસે ઋષિ ગૌતમ અને અહલ્યાજીનું મંદિર છે.',
      timings: 'સવારે ૦૬:૦૦ થી સાંજે ૦૬:૦૦',
    },
    {
      id: 'kedareshwar',
      name: 'કેદારેશ્વર મંદિર',
      nativeName: 'કેદારેશ્વર',
      distanceFromTemple: '૧.૫ કિમી',
      significance: 'કુદરતી ગુફામાં આવેલું ભગવાન શિવનું શાંત અને પવિત્ર મંદિર.',
      description: 'ચોમાસામાં ધોધથી ઘેરાયેલું આ રમણીય સ્થળ સાધકોને શાંતિ અર્પે છે.',
      timings: 'સવારે ૦૬:૦૦ થી સાંજે ૦૭:૦૦',
    },
    {
      id: 'nivruttinath-samadhi',
      name: 'સંત નિવૃત્તિનાથ મહારાજ સમાધિ',
      nativeName: 'સંત નિવૃત્તિનાથ સમાધિ',
      distanceFromTemple: 'મુખ્ય મંદિરથી ૧.૨ કિમી',
      significance: 'સંત જ્ઞાનેશ્વર મહારાજના મોટા ભાઈ અને ગુરુ સંત નિવૃત્તિનાથજીનું સંજીવન સમાધિ સ્થળ.',
      description: 'વારકરી સંપ્રદાયનું અત્યંત પવિત્ર તીર્થ જ્યાં અખંડ હરિનામ સંકીર્તન ગૂંજે છે.',
      timings: 'સવારે ૦૫:૦૦ થી રાત્રે ૦૯:૩૦',
    },
    {
      id: 'anjaneri-parvat',
      name: 'અંજનેરી પર્વત',
      nativeName: 'અંજનેરી પર્વત',
      distanceFromTemple: '૭ કિમી',
      significance: 'સનાતન પરંપરા અનુસાર સંકટમોચન હનુમાનજીનું પાવન જન્મસ્થળ.',
      description: 'માતા અંજનીના નામ પરથી પ્રખ્યાત આ પર્વત ટ્રેકિંગ અને પ્રાચીન ગુફાઓ માટે જાણીતો છે.',
      elevation: '૧,૨૮૦ મીટર',
    },
    {
      id: 'saptashrungi-gad',
      name: 'શ્રી સપ્તશૃંગી દેવી (વણિ)',
      nativeName: 'સપ્તશૃંગી દેવી',
      distanceFromTemple: '૬૫ કિમી',
      significance: 'મહારાષ્ટ્રના સાડા ત્રણ શક્તિપીઠો પૈકીનું એક મહત્ત્વપૂર્ણ શક્તિપીઠ.',
      description: 'સાત શિખરો વચ્ચે બિરાજમાન અઢાર ભુજાવાળી મહિષાસુરમર્દિનીની ૮ ફૂટ ઊંચી સ્વયંભૂ મૂર્તિ.',
      timings: 'સવારે ૦૫:૦૦ થી રાત્રે ૦૯:૦૦',
    },
  ],
  te: [
    {
      id: 'trimbakeshwar-mandir',
      name: 'శ్రీ త్రయంబకేశ్వర జ్యోతిర్లింగ ఆలయం',
      nativeName: 'త్రయంబకేశ్వర ఆలయం',
      distanceFromTemple: 'క్షేత్ర కేంద్రం',
      significance: 'పీష్వా నానాసాహెబ్ నిర్మించిన 12వ శతాబ్దపు నల్లరాతి హేమాడ్పంతి జ్యోతిర్లింగ ఆలయం.',
      description: 'అద్భుతమైన రాతి శిల్పకళ, బ్రహ్మ-విష్ణు-మహేశ్వరుల త్రిముఖ లింగ గర్భాలయం మరియు విశాల ప్రాకారం.',
      timings: 'ఉదయం 05:30 నుండి రాత్రి 09:00',
    },
    {
      id: 'kushavarta-tirtha',
      name: 'కుశావవర్త తీర్థం (పుష్కరిణి)',
      nativeName: 'కుశావవర్త తీర్థం',
      distanceFromTemple: '400 మీటర్లు (5 నిమిషాలు)',
      significance: 'గౌతమ మహర్షి దర్భలతో పవిత్ర గోదావరి నదిని నిలిపి పవిత్రం చేసిన పవిత్ర జలరాశి.',
      description: 'నారాయణ నాగబలి సహా సమస్త వేద పూజలు ఈ పవిత్ర స్నానంతోనే ప్రారంభమవుతాయి.',
      timings: 'పవిత్ర స్నానానికి రోజంతా తెరిచి ఉంటుంది',
    },
    {
      id: 'brahmagiri-parvat',
      name: 'బ్రహ్మగిరి పర్వతం',
      nativeName: 'బ్రహ్మగిరి పర్వతం',
      distanceFromTemple: 'పాదాల వద్దకు 1 కి.మీ. (సుమారు 750 మెట్లు)',
      significance: 'పరమశివుని సాక్షాత్ పర్వత రూపం మరియు గోదావరి నది మూల జన్మస్థలం.',
      description: 'సహ్యాద్రి పర్వత శ్రేణులలోని అద్భుత శిఖరం. మెట్లు ఎక్కి గంగాద్వారం, గుహలను దర్శించవచ్చు.',
      elevation: '1,295 మీటర్లు',
    },
    {
      id: 'gangadwar',
      name: 'గంగాద్వారం',
      nativeName: 'గంగాద్వారం',
      distanceFromTemple: 'బ్రహ్మగిరి మధ్యభాగం (45 నిమిషాలు)',
      significance: 'గోముఖ శిల నుండి గోదావరి నది తొలి ధార ఉద్భవించే పవిత్ర స్థలం.',
      description: 'భక్తులు గౌతమీ గంగా ప్రథమ జలంతో పునీతులవుతారు. సమీపంలో గౌతమ మహర్షి ఆలయం ఉంది.',
      timings: 'ఉదయం 06:00 నుండి సాయంత్రం 06:00',
    },
    {
      id: 'kedareshwar',
      name: 'కేదారేశ్వర ఆలయం',
      nativeName: 'కేదారేశ్వరుడు',
      distanceFromTemple: '1.5 కి.మీ.',
      significance: 'సహజసిద్ధ గుహలో వెలసిన శివుని ప్రశాంత ప్రాచీన ఆలయం.',
      description: 'వర్షాకాలంలో జలపాతాలతో చుట్టుముట్టబడిన ధ్యానయోగ్యమైన ఏకాంత స్థలం.',
      timings: 'ఉదయం 06:00 నుండి సాయంత్రం 07:00',
    },
    {
      id: 'nivruttinath-samadhi',
      name: 'సంత్ నివృత్తినాథ్ మహారాజ్ సమాధి',
      nativeName: 'సంత్ నివృత్తినాథ్ సమాధి',
      distanceFromTemple: '1.2 కి.మీ.',
      significance: 'సంత్ జ్ఞానేశ్వర్ మహారాజ్ అన్నగారు, గురువు అయిన నివృత్తినాథుల సంజీవన సమాధి.',
      description: 'వార్కరీ సంప్రదాయంలో పరమ పవిత్రమైన తీర్థం, ఇక్కడ అఖండ భజనలు జరుగుతాయి.',
      timings: 'ఉదయం 05:00 నుండి రాత్రి 09:30',
    },
    {
      id: 'anjaneri-parvat',
      name: 'అంజనేరి పర్వతం',
      nativeName: 'అంజనేరి పర్వతం',
      distanceFromTemple: '7 కి.మీ.',
      significance: 'సనాతన సంప్రదాయం ప్రకారం శ్రీ హనుమంతులవారి పవిత్ర జన్మస్థలం.',
      description: 'అంజనాదేవి పేరిట వెలసిన కొండ, ప్రాచీన గుహలు మరియు అద్భుత ప్రకృతి దృశ్యాలకు నిలయం.',
      elevation: '1,280 మీటర్లు',
    },
    {
      id: 'saptashrungi-gad',
      name: 'శ్రీ సప్తశృంగి దేవి (వణి)',
      nativeName: 'సప్తశృంగి దేవి',
      distanceFromTemple: '65 కి.మీ.',
      significance: 'మహారాష్ట్రలోని ప్రసిద్ధ శక్తిపీఠాలలో ప్రముఖమైన క్షేత్రం.',
      description: 'ఏడు శిఖరాల మధ్య 18 చేతులతో దర్శనమిచ్చే 8 అడుగుల మహిషాసురమర్దిని స్వయంభూ మూర్తి.',
      timings: 'ఉదయం 05:00 నుండి రాత్రి 09:00',
    },
  ],
  kn: [
    {
      id: 'trimbakeshwar-mandir',
      name: 'ಶ್ರೀ ತ್ರ್ಯಂಬಕೇಶ್ವರ ಜ್ಯೋತಿರ್ಲಿಂಗ ದೇವಾಲಯ',
      nativeName: 'ತ್ರ್ಯಂಬಕೇಶ್ವರ ದೇವಾಲಯ',
      distanceFromTemple: 'ಕ್ಷೇತ್ರದ ಕೇಂದ್ರ',
      significance: 'ಪೇಶ್ವೆ ನಾನಾಸಾಹೇಬರು ನಿರ್ಮಿಸಿದ 12ನೇ ಶತಮಾನದ ಕಪ್ಪು ಶಿಲೆಯ ಹೇಮಾಡಪಂಥಿ ಜ್ಯೋತಿರ್ಲಿಂಗ ಮಂದಿರ.',
      description: 'ಅತ್ಯಂತ ಸುಂದರ ಕೆತ್ತನೆ, ಬ್ರಹ್ಮ-ವಿಷ್ಣು-ಮಹೇಶ್ವರರ ತ್ರಿಮುಖ ಲಿಂಗವಿರುವ ಗರ್ಭಗುಡಿ ಮತ್ತು ವಿಶಾಲ ಸಭಾಮಂಟಪ.',
      timings: 'ಬೆಳಿಗ್ಗೆ 05:30 ರಿಂದ ರಾತ್ರಿ 09:00',
    },
    {
      id: 'kushavarta-tirtha',
      name: 'ಕುಶಾವರ್ತ ತೀರ್ಥ (ಕಲ್ಯಾಣಿ)',
      nativeName: 'ಕುಶಾವರ್ತ ತೀರ್ಥ',
      distanceFromTemple: '400 ಮೀಟರ್ (5 ನಿಮಿಷ)',
      significance: 'ಗೌತಮ ಋಷಿಗಳು ದರ್ಭೆಯಿಂದ ಪವಿತ್ರ ಗೋದಾವರಿಯನ್ನು ತಡೆದು ನಿಲ್ಲಿಸಿದ ಪುಣ್ಯ ತೀರ್ಥ.',
      description: 'ನಾರಾಯಣ ನಾಗಬಲಿ ಸೇರಿದಂತೆ ಎಲ್ಲಾ ಪೂಜೆಗಳು ಇಲ್ಲಿಯ ಪುಣ್ಯಸ್ನಾನದಿಂದಲೇ ಪ್ರಾರಂಭವಾಗುತ್ತವೆ.',
      timings: 'ಪುಣ್ಯಸ್ನಾನಕ್ಕೆ ದಿನವಿಡೀ ಮುಕ್ತ',
    },
    {
      id: 'brahmagiri-parvat',
      name: 'ಬ್ರಹ್ಮಗಿರಿ ಪರ್ವತ',
      nativeName: 'ಬ್ರಹ್ಮಗಿರಿ ಪರ್ವತ',
      distanceFromTemple: 'ಬುಡಕ್ಕೆ 1 ಕಿ.ಮೀ. (ಸುಮಾರು 750 ಮೆಟ್ಟಿಲುಗಳು)',
      significance: 'ಭಗವಾನ್ ಶಿವನ ಸಾಕ್ಷಾತ್ ಪರ್ವತ ರೂಪ ಹಾಗೂ ಗೋದಾವರಿ ನದಿಯ ಮೂಲ ಉಗಮ ಸ್ಥಾನ.',
      description: 'ಸಹ್ಯಾದ್ರಿ ಪರ್ವತದ ಭವ್ಯ ಶಿಖರ, ಗಂಗಾದ್ವಾರ ಮತ್ತು ಗುಹೆಗಳಿಗೆ ದಾರಿ ಕಲ್ಪಿಸುವ ಸುಂದರ ಬೆಟ್ಟ.',
      elevation: '1,295 ಮೀಟರ್',
    },
    {
      id: 'gangadwar',
      name: 'ಗಂಗಾದ್ವಾರ',
      nativeName: 'ಗಂಗಾದ್ವಾರ',
      distanceFromTemple: 'ಬ್ರಹ್ಮಗಿರಿಯ ಮಧ್ಯಭಾಗ (45 ನಿಮಿಷ)',
      significance: 'ಗೋಮುಖ ಶಿಲೆಯಿಂದ ಗೋದಾವರಿ ನದಿಯ ಮೊದಲ ಜಲಧಾರೆ ಹೊರಹೊಮ್ಮುವ ಪವಿತ್ರ ಸ್ಥಳ.',
      description: 'ಭಕ್ತರು ಇಲ್ಲಿ ಮೊದಲ ಗಂಗಾಜಲವನ್ನು ಸ್ಪರ್ಶಿಸಿ ಪುನೀತರಾಗುತ್ತಾರೆ. ಗೌತಮ ಋಷಿಗಳ ಮಂದಿರ ಇಲ್ಲಿದೆ.',
      timings: 'ಬೆಳಿಗ್ಗೆ 06:00 ರಿಂದ ಸಂಜೆ 06:00',
    },
    {
      id: 'kedareshwar',
      name: 'ಕೇದಾರೇಶ್ವರ ದೇವಾಲಯ',
      nativeName: 'ಕೇದಾರೇಶ್ವರ',
      distanceFromTemple: '1.5 ಕಿ.ಮೀ.',
      significance: 'ನೈಸರ್ಗಿಕ ಗುಹೆಯಲ್ಲಿರುವ ಶಿವನ ಪ್ರಾಚೀನ ಹಾಗೂ ಶಾಂತ ತಾಣ.',
      description: 'ಮಳೆಗಾಲದಲ್ಲಿ ಜಲಪಾತಗಳಿಂದ ಆವೃತವಾಗುವ ಧ್ಯಾನಸ್ಥ ತಾಣ.',
      timings: 'ಬೆಳಿಗ್ಗೆ 06:00 ರಿಂದ ಸಂಜೆ 07:00',
    },
    {
      id: 'nivruttinath-samadhi',
      name: 'ಸಂತ ನಿವೃತ್ತಿನಾಥ ಮಹಾರಾಜ ಸಮಾಧಿ',
      nativeName: 'ಸಂತ ನಿವೃತ್ತಿನಾಥ ಸಮಾಧಿ',
      distanceFromTemple: '1.2 ಕಿ.ಮೀ.',
      significance: 'ಸಂತ ಜ್ಞಾನೇಶ್ವರರ ಜ್ಯೇಷ್ಠ ಸಹೋದರ ಹಾಗೂ ಗುರುಗಳಾದ ನಿವೃತ್ತಿನಾಥರ ಸಂಜೀವನ ಸಮಾಧಿ.',
      description: 'ವಾರಕರಿ ಸಂಪ್ರದಾಯದ ಪರಮ ಪವಿತ್ರ ಕ್ಷೇತ್ರ, ನಿರಂತರ ಭಜನೆ ಕೀರ್ತನೆಗಳು ಮೊಳಗುತ್ತವೆ.',
      timings: 'ಬೆಳಿಗ್ಗೆ 05:00 ರಿಂದ ರಾತ್ರಿ 09:30',
    },
    {
      id: 'anjaneri-parvat',
      name: 'ಅಂಜನೇರಿ ಪರ್ವತ',
      nativeName: 'ಅಂಜನೇರಿ ಬೆಟ್ಟ',
      distanceFromTemple: '7 ಕಿ.ಮೀ.',
      significance: 'ಸನಾತನ ಪರಂಪರೆಯಂತೆ ಶ್ರೀ ಹನುಮಂತ ದೇವರ ಪವಿತ್ರ ಜನ್ಮಸ್ಥಳ.',
      description: 'ಅಂಜನಾದೇವಿಯ ಹೆಸರಿನ ಈ ಬೆಟ್ಟವು ಪ್ರಾಚೀನ ಗುಹೆಗಳು ಮತ್ತು ಚಾರಣಕ್ಕೆ ಹೆಸರುವಾಸಿಯಾಗಿದೆ.',
      elevation: '1,280 ಮೀಟರ್',
    },
    {
      id: 'saptashrungi-gad',
      name: 'ಶ್ರೀ ಸಪ್ತಶೃಂಗಿ ದೇವಿ (ವಣಿ)',
      nativeName: 'ಸಪ್ತಶೃಂಗಿ ದೇವಿ',
      distanceFromTemple: '65 ಕಿ.ಮೀ.',
      significance: 'ಮಹಾರಾಷ್ಟ್ರದ ಶಕ್ತಿಪೀಠಗಳಲ್ಲಿ ಪ್ರಮುಖವಾದ ಪವಿತ್ರ ಕ್ಷೇತ್ರ.',
      description: 'ಏಳು ಶಿಖರಗಳ ನಡುವೆ ನೆಲೆಸಿರುವ 18 ಕೈಗಳ 8 ಅಡಿ ಎತ್ತರದ ಮಹಿಷಾಸುರಮರ್ದಿನಿ ಸ್ವಯಂಭೂ ಮೂರ್ತಿ.',
      timings: 'ಬೆಳಿಗ್ಗೆ 05:00 ರಿಂದ ರಾತ್ರಿ 09:00',
    },
  ],
  ta: [
    {
      id: 'trimbakeshwar-mandir',
      name: 'ஸ்ரீ திரிம்பகேஷ்வரர் ஜோதிர்லிங்க திருக்கோயில்',
      nativeName: 'திரிம்பகேஷ்வரர் கோயில்',
      distanceFromTemple: 'திருத்தல மையம்',
      significance: 'பேஷ்வா நானாசாகேப் அவர்களால் 12ஆம் நூற்றாண்டில் கருங்கல்லால் கட்டப்பட்ட ஹேமட்பாந்தி ஜோதிர்லிங்க ஆலயம்.',
      description: 'நுணுக்கமான சிற்ப வேலைப்பாடுகள், பிரம்மா-விஷ்ணு-சிவன் முகம் கொண்ட ஜோதிர்லிங்கம் மற்றும் பிரம்மாண்ட மண்டபம்.',
      timings: 'காலை 05:30 முதல் இரவு 09:00 வரை',
    },
    {
      id: 'kushavarta-tirtha',
      name: 'குஷாவர்த்த தீர்த்தம் (குளம்)',
      nativeName: 'குஷாவர்த்த தீர்த்தம்',
      distanceFromTemple: '400 மீட்டர் (5 நிமிட நடை)',
      significance: 'கௌதம முனிவரால் தர்ப்பைப் புல் கொண்டு புனித கோதாவரி நதி நிலைநிறுத்தப்பட்ட புனித தீர்த்தம்.',
      description: 'நாராயண நாகபலி உள்ளிட்ட அனைத்து வைதீக சடங்குகளும் இங்கு நீராடினாலே தொடங்குகின்றன.',
      timings: 'புனித நீராடலுக்கு நாள் முழுவதும் திறந்துள்ளது',
    },
    {
      id: 'brahmagiri-parvat',
      name: 'பிரம்மகிரி மலை',
      nativeName: 'பிரம்மகிரி மலை',
      distanceFromTemple: 'அடிவாரம் 1 கி.மீ. (சுமார் 750 படிகள்)',
      significance: 'சிவபெருமானின் சாக்ஷாத் மலை வடிவம் மற்றும் கோதாவரி நதியின் மூல பிறப்பிடம்.',
      description: 'மேற்குத் தொடர்ச்சி மலையின் கம்பீரமான சிகரம். படிகள் வழி கங்காதுவாரம் மற்றும் குகைகளை அடையலாம்.',
      elevation: '1,295 மீட்டர்',
    },
    {
      id: 'gangadwar',
      name: 'கங்காதுவாரம்',
      nativeName: 'கங்காதுவாரம்',
      distanceFromTemple: 'பிரம்மகிரி நடுப்பகுதி (45 நிமிடங்கள்)',
      significance: 'கல்லிலான கோமுகத்திலிருந்து கோதாவரியின் முதல் துளி வெளிப்படும் புனித இடம்.',
      description: 'பக்தர்கள் கௌதமி கங்கையின் முதல் நீரை இங்கு தரிசிக்கின்றனர். கௌதமர் ஆலயம் அருகில் உள்ளது.',
      timings: 'காலை 06:00 முதல் மாலை 06:00 வரை',
    },
    {
      id: 'kedareshwar',
      name: 'கேதாரேஸ்வரர் கோயில்',
      nativeName: 'கேதாரேஸ்வரர்',
      distanceFromTemple: '1.5 கி.மீ.',
      significance: 'இயற்கைக் குகையில் அமைந்துள்ள சிவபெருமானின் அமைதியான பழமையான ஆலயம்.',
      description: 'மழைக்காலத்தில் நீர்வீழ்ச்சிகள் சூழ அமைதியான தியானத்திற்கு உகந்த இடம்.',
      timings: 'காலை 06:00 முதல் இரவு 07:00 வரை',
    },
    {
      id: 'nivruttinath-samadhi',
      name: 'சாந்து நிவிருத்திநாத் மகாராஜ் சமாதி',
      nativeName: 'நிவிருத்திநாத் சமாதி',
      distanceFromTemple: '1.2 கி.மீ.',
      significance: 'சாந்து ஞானேஸ்வரரின் மூத்த சகோதரரும் குருவுமான நிவிருத்திநாதரின் ஜீவ சமாதி.',
      description: 'வார்கரி பாரம்பரியத்தின் புனிதம் மிக்க இடம், தொடர் பஜனைகள் ஒலிக்கின்றன.',
      timings: 'காலை 05:00 முதல் இரவு 09:30 வரை',
    },
    {
      id: 'anjaneri-parvat',
      name: 'அஞ்சனேரி மலை',
      nativeName: 'அஞ்சனேரி மலை',
      distanceFromTemple: '7 கி.மீ.',
      significance: 'சனாதன தர்மத்தின்படி ஸ்ரீ அனுமன் அவதரித்த திருத்தலம்.',
      description: 'அஞ்சனை தேவியின் பெயரில் அமைந்த இம்மலை குகைகள் மற்றும் மலையேற்றத்திற்கு பிரசித்தி பெற்றது.',
      elevation: '1,280 மீட்டர்',
    },
    {
      id: 'saptashrungi-gad',
      name: 'ஸ்ரீ சப்தஸ்ருங்கி தேவி (வணி)',
      nativeName: 'சப்தஸ்ருங்கி தேவி',
      distanceFromTemple: '65 கி.மீ.',
      significance: 'மகாராஷ்டிராவின் சக்தி பீடங்களில் மிகவும் போற்றப்படும் ஆலயம்.',
      description: 'ஏழு சிகரங்களுக்கு இடையே 18 கரங்களுடன் அருள்பாலிக்கும் 8 அடி சுயம்பு மகிஷாசுரமர்த்தினி.',
      timings: 'காலை 05:00 முதல் இரவு 09:00 வரை',
    },
  ],
  bn: [
    {
      id: 'trimbakeshwar-mandir',
      name: 'শ্রী ত্র্যম্বকেশ্বর জ্যোতির্লিঙ্গ মন্দির',
      nativeName: 'ত্র্যম্বকেশ্বর মন্দির',
      distanceFromTemple: 'তীর্থক্ষেত্রের কেন্দ্রস্থল',
      significance: 'পেশোয়া নানা সাহেব কর্তৃক নির্মিত ১২শ শতাব্দীর কৃষ্ণপ্রস্তর খোদাইকৃত হেমাডপন্তী জ্যোতির্লিঙ্গ মন্দির।',
      description: 'অনুপম স্থাপত্যকলা, ব্রহ্মা-বিষ্ণু-মহেশ্বরের ত্রিভঙ্গি লিঙ্গম এবং সুবিশাল পাথরের প্রাচীরবেষ্টিত মণ্ডপ।',
      timings: 'ভোর ০৫:৩০ থেকে রাত ০৯:০০',
    },
    {
      id: 'kushavarta-tirtha',
      name: 'কুশাবর্ত তীর্থ (কুণ্ড)',
      nativeName: 'কুশাবর্ত তীর্থ',
      distanceFromTemple: '৪০০ মিটার (৫ মিনিট)',
      significance: 'মহর্ষি গৌতম কুশ (দর্ভ) দ্বারা পবিত্র গোদাবরীকে আবদ্ধ করে পুণ্যময় করেছিলেন।',
      description: 'নারায়ণ নাগবলিসহ সমস্ত বৈদিক পূজার সূচনা এই পবিত্র কুণ্ডে স্নানের মাধ্যমেই হয়।',
      timings: 'পুণ্যস্নানের জন্য সারাদিন উন্মুক্ত',
    },
    {
      id: 'brahmagiri-parvat',
      name: 'ব্রহ্মগিরি পর্বত',
      nativeName: 'ব্রহ্মগিরি পর্বত',
      distanceFromTemple: 'পাদদেশ থেকে ১ কিমি (প্রায় ৭৫০ সিঁড়ি)',
      significance: 'ভগবান শিবের প্রত্যক্ষ শৈলরূপ এবং গোদাবরী নদীর আদি জন্মস্থান।',
      description: 'সহ্যাদ্রির সুবিশাল পর্বতমালা, সিঁড়ি বেয়ে গঙ্গাদ্বার ও প্রাচীন গুহার দর্শন মেলে।',
      elevation: '১,২৯৫ মিটার',
    },
    {
      id: 'gangadwar',
      name: 'গঙ্গাদ্বার',
      nativeName: 'গঙ্গাদ্বার',
      distanceFromTemple: 'ব্রহ্মগিরির মধ্যভাগ (৪৫ মিনিট)',
      significance: 'যেখানে পাথরের গোমুখ থেকে গোদাবরীর প্রথম ধারা প্রবাহিত হয়।',
      description: 'ভক্তরা এখানে পবিত্র গঙ্গাজল মাথায় ধারণ করেন। পাশেই গৌতম ঋষি ও অহল্যার মন্দির।',
      timings: 'সকাল ০৬:০০ থেকে সন্ধ্যা ০৬:০০',
    },
    {
      id: 'kedareshwar',
      name: 'কেদারেশ্বর মন্দির',
      nativeName: 'কেদারেশ্বর',
      distanceFromTemple: '১.৫ কিমি',
      significance: 'প্রাকৃতিক গুহায় অবস্থিত শিবের অতি প্রাচীন ও শান্ত ধাম।',
      description: 'বর্ষায় জলপ্রপাতে ঘেরা এই স্থান সাধকদের ধ্যানের অপূর্ব পরিবেশ প্রদান করে।',
      timings: 'সকাল ০৬:০০ থেকে সন্ধ্যা ০৭:০০',
    },
    {
      id: 'nivruttinath-samadhi',
      name: 'সন্ত নিবৃত্তিনাথ মহারাজ সমাধি',
      nativeName: 'সন্ত নিবৃত্তিনাথ সমাধি',
      distanceFromTemple: '১.২ কিমি',
      significance: 'সন্ত জ্ঞানেশ্বরের অগ্রজ ও গুরু সন্ত নিবৃত্তিনাথের সংজীবন সমাধি।',
      description: 'ওয়ারকরি সম্প্রদায়ের পরম তীর্থ, যেখানে নিরন্তর ভজন-কীর্তনের ধ্বনি প্রতিধ্বনিত হয়।',
      timings: 'ভোর ০৫:০০ থেকে রাত ০৯:৩০',
    },
    {
      id: 'anjaneri-parvat',
      name: 'অঞ্জনেরী পর্বত',
      nativeName: 'অঞ্জনেরী পর্বত',
      distanceFromTemple: '৭ কিমি',
      significance: 'সনাতন শাস্ত্রানুসারে মহাবীর হনুমানজির পবিত্র জন্মভূমি।',
      description: 'মাতা অঞ্জনার নামাঙ্কিত এই পাহাড় মনোরম ট্রেকিং ও প্রাচীন গুহার জন্য খ্যাত।',
      elevation: '১,২৮০ মিটার',
    },
    {
      id: 'saptashrungi-gad',
      name: 'শ্রী সপ্তশৃঙ্গী দেবী (বণী)',
      nativeName: 'সপ্তশৃঙ্গী দেবী',
      distanceFromTemple: '৬৫ কিমি',
      significance: 'মহারাষ্ট্রের সাড়ে তিনটি শক্তিপীঠের মধ্যে অন্যতম জাগ্রত পীঠ।',
      description: 'সাতটি শৃঙ্গের মাঝে ১৮ হাতবিশিষ্ট ৮ ফুট উঁচু মহিষাসুরমর্দিনী দেবীর স্বয়ম্ভূ মূর্তি।',
      timings: 'ভোর ০৫:০০ থেকে রাত ০৯:০০',
    },
  ],
  or: [
    {
      id: 'trimbakeshwar-mandir',
      name: 'ଶ୍ରୀ ତ୍ର୍ୟମ୍ବକେଶ୍ୱର ଜ୍ୟୋତିର୍ଲିଙ୍ଗ ମନ୍ଦିର',
      nativeName: 'ତ୍ର୍ୟମ୍ବକେଶ୍ୱର ମନ୍ଦିର',
      distanceFromTemple: 'କ୍ଷେତ୍ରର କେନ୍ଦ୍ରସ୍ଥଳ',
      significance: 'ପେଶୱା ନାନାସାହେବଙ୍କ ଦ୍ୱାରା ନିର୍ମିତ ଦ୍ୱାଦଶ ଶତାବ୍ଦୀର କଳାମୁଗୁନି ପଥରର ହେମାଡପନ୍ଥୀ ଜ୍ୟୋତିର୍ଲିଙ୍ଗ ମନ୍ଦିର।',
      description: 'ଅଦ୍ଭୁତ କାରୁକାର୍ଯ୍ୟ, ବ୍ରହ୍ମା-ବିଷ୍ଣୁ-ମହେଶ୍ୱରଙ୍କ ତ୍ରିମୁଖୀ ଲିଙ୍ଗ ଏବଂ ବିଶାଳ ସଭାମଣ୍ଡପ।',
      timings: 'ପ୍ରଭାତ ୦୫:୩୦ ରୁ ରାତ୍ରି ୦୯:୦୦',
    },
    {
      id: 'kushavarta-tirtha',
      name: 'କୁଶାବର୍ତ୍ତ ତୀର୍ଥ (ପୁଷ୍କରିଣୀ)',
      nativeName: 'କୁଶାବର୍ତ୍ତ ତୀର୍ଥ',
      distanceFromTemple: '୪୦୦ ମିଟର (୫ ମିନିଟ୍)',
      significance: 'ଗୌତମ ଋଷି କୁଶ (ଦର୍ଭ) ସାହାଯ୍ୟରେ ପବିତ୍ର ଗୋଦାବରୀ ନଦୀକୁ ବାନ୍ଧି ସଞ୍ଚିତ କରିଥିବା ଅମୃତ କୁଣ୍ଡ।',
      description: 'ନାରାୟଣ ନାଗବଳି ସମେତ ସମସ୍ତ ବୈଦିକ କର୍ମ ଏହି କୁଣ୍ଡରେ ପବିତ୍ର ସ୍ନାନରୁ ହିଁ ଆରମ୍ଭ ହୁଏ।',
      timings: 'ପବିତ୍ର ସ୍ନାନ ପାଇଁ ସାରାଦିନ ଖୋଲା',
    },
    {
      id: 'brahmagiri-parvat',
      name: 'ବ୍ରହ୍ମଗିରି ପର୍ବତ',
      nativeName: 'ବ୍ରହ୍ମଗିରି ପର୍ବତ',
      distanceFromTemple: 'ପାଦଦେଶରୁ ୧ କିମି (ପ୍ରାୟ ୭୫୦ ପାହାଚ)',
      significance: 'ଭଗବାନ ଶିବଙ୍କ ପ୍ରତ୍ୟକ୍ଷ ଶୈଳ ରୂପ ଏବଂ ଗୋଦାବରୀ ନଦୀର ମୂଳ ଉତ୍ସ।',
      description: 'ସହ୍ୟାଦ୍ରିର ବିରାଟ ପର୍ବତ, ପାହାଚ ଚଢ଼ି ଗଙ୍ଗାଦ୍ୱାର ଓ ପ୍ରାଚୀନ ଗୁମ୍ଫା ଦର୍ଶନ କରିହୁଏ।',
      elevation: '୧,୨୯୫ ମିଟର',
    },
    {
      id: 'gangadwar',
      name: 'ଗଙ୍ଗାଦ୍ୱାର',
      nativeName: 'ଗଙ୍ଗାଦ୍ୱାର',
      distanceFromTemple: 'ବ୍ରହ୍ମଗିରିର ମଧ୍ୟଭାଗ (୪୫ ମିନିଟ୍)',
      significance: 'ଯେଉଁଠାରେ ପଥର ଗୋମୁଖରୁ ଗୋଦାବରୀର ପ୍ରଥମ ଜଳଧାରା ନିର୍ଗତ ହୁଏ।',
      description: 'ଭକ୍ତମାନେ ପ୍ରଥମ ଗଙ୍ଗାଜଳରେ ନିଜକୁ ପବିତ୍ର କରନ୍ତି। ନିକଟରେ ଗୌତମ ଓ ଅହଲ୍ୟାଙ୍କ ମନ୍ଦିର ରହିଛି।',
      timings: 'ସକାଳ ୦୬:୦୦ ରୁ ସନ୍ଧ୍ୟା ୦୬:୦୦',
    },
    {
      id: 'kedareshwar',
      name: 'କେଦାରେଶ୍ୱର ମନ୍ଦିର',
      nativeName: 'କେଦାରେଶ୍ୱର',
      distanceFromTemple: '୧.୫ କିମି',
      significance: 'ପ୍ରାକୃତିକ ଗୁମ୍ଫା ମଧ୍ୟରେ ଅବସ୍ଥିତ ଶିବଙ୍କ ପ୍ରାଚୀନ ଏକାନ୍ତ ଧାମ।',
      description: 'ବର୍ଷାଋତୁରେ ଝରଣା ଘେରା ଏହି ରମଣୀୟ ସ୍ଥାନ ଧ୍ୟାନ ସାଧନା ପାଇଁ ଅତ୍ୟନ୍ତ ଉପଯୁକ୍ତ।',
      timings: 'ସକାଳ ୦୬:୦୦ ରୁ ସନ୍ଧ୍ୟା ୦୭:୦୦',
    },
    {
      id: 'nivruttinath-samadhi',
      name: 'ସନ୍ଥ ନିବୃତ୍ତିନାଥ ମହାରାଜ ସମାଧି',
      nativeName: 'ସନ୍ଥ ନିବୃତ୍ତିନାଥ ସମାଧି',
      distanceFromTemple: '୧.୨ କିମି',
      significance: 'ସନ୍ଥ ଜ୍ଞାନେଶ୍ୱରଙ୍କ ଜ୍ୟେଷ୍ଠ ଭ୍ରାତା ତଥା ଗୁରୁ ସନ୍ଥ ନିବୃତ୍ତିନାଥଙ୍କ ସଞ୍ଜୀବନ ସମାଧି।',
      description: 'ୱାରକରୀ ସମ୍ପ୍ରଦାୟର ପରମ ପବିତ୍ର କ୍ଷେତ୍ର ଯେଉଁଠାରେ ଅହରହ ଭଜନ କୀର୍ତ୍ତନ ହୁଏ।',
      timings: 'ପ୍ରଭାତ ୦୫:୦୦ ରୁ ରାତ୍ରି ୦୯:୩୦',
    },
    {
      id: 'anjaneri-parvat',
      name: 'ଅଞ୍ଜନେରୀ ପର୍ବତ',
      nativeName: 'ଅଞ୍ଜନେରୀ ପର୍ବତ',
      distanceFromTemple: '୭ କିମି',
      significance: 'ସନାତନ ଶାସ୍ତ୍ର ଅନୁଯାୟୀ ସଙ୍କଟମୋଚନ ଶ୍ରୀ ହନୁମାନଜୀଙ୍କ ପବିତ୍ର ଜନ୍ମଭୂମି।',
      description: 'ମାତା ଅଞ୍ଜନାଙ୍କ ନାମରେ ନାମିତ ଏହି ପାହାଡ଼ ପ୍ରାଚୀନ ଗୁମ୍ଫା ଓ ଟ୍ରେକିଂ ପାଇଁ ପ୍ରସିଦ୍ଧ।',
      elevation: '୧,୨୮୦ ମିଟର',
    },
    {
      id: 'saptashrungi-gad',
      name: 'ଶ୍ରୀ ସପ୍ତଶୃଙ୍ଗୀ ଦେବୀ (ୱଣୀ)',
      nativeName: 'ସପ୍ତଶୃଙ୍ଗୀ ଦେବୀ',
      distanceFromTemple: '୬୫ କିମି',
      significance: 'ମହାରାଷ୍ଟ୍ରର ଶକ୍ତିପୀଠମାନଙ୍କ ମଧ୍ୟରେ ଅନ୍ୟତମ ପ୍ରଧାନ ପୀଠ।',
      description: 'ସାତୋଟି ଶିଖର ମଧ୍ୟରେ ୧୮ଟି ହାତ ବିଶିଷ୍ଟ ୮ ଫୁଟ ଉଚ୍ଚ ମହିଷାସୁରମର୍ଦ୍ଦିନୀ ସ୍ୱୟମ୍ଭୂ ମୂର୍ତ୍ତି।',
      timings: 'ପ୍ରଭାତ ୦୫:୦୦ ରୁ ରାତ୍ରି ୦୯:୦୦',
    },
  ],
};

// -------------------------------------------------------------
// 3. STORY CHAPTERS TRANSLATIONS
// -------------------------------------------------------------
export const STORY_CHAPTERS_DATA: Record<SupportedLanguage, StoryChapterData[]> = {
  en: [
    {
      chapter: '01',
      titleNative: 'Brahmagiri Parvat',
      titleEng: 'Brahmagiri: The Mountain Embodiment of Mahadev',
      quote: '॥ सह्याद्रिशीर्षे विमले वसन्तं ॥',
      content: 'According to ancient Hindu scriptures, Lord Brahma performed a profound penance on this majestic Sahyadri mountain to seek the divine darshan of Lord Shiva. Pleased with his devotion, Shiva manifested and proclaimed that the mountain itself would forever embody his sacred presence.',
      puranaQuote: 'In the Padma Purana and Shiva Purana, this sacred event is commemorated as the eternal marriage of Divine Grace, Penance, and Cosmic Water.',
    },
    {
      chapter: '02',
      titleNative: 'Maharishi Gautama & Descent of Godavari',
      titleEng: 'Gautam Rishi & The Holy Descent of Dakshin Ganga',
      quote: '॥ गोदावरीतीरपवित्रदेशे ॥',
      content: 'During a prolonged famine in Danda-karanya, Maharishi Gautama engaged in intense meditation and righteous cultivation. After an unintended mishap involving a cow made of darba grass, the sage performed severe penance. Compassionate Shiva untied his matted locks, allowing the celestial river Ganga to descend on Brahmagiri, which came to be venerated as Gautami Godavari.',
      puranaQuote: 'Sage Gautama circumambulated Mother Godavari with sacred kusha grass, establishing Kushavarta Tirtha for all devotees.',
    },
    {
      chapter: '03',
      titleNative: 'Manifestation of Trimbakeshwar Jyotirlinga',
      titleEng: 'The Manifestation of Trinity in One Sacred Linga',
      quote: '॥ तं त्र्यम्बकमीशमीडे ॥',
      content: 'At the fervent prayer of Sage Gautama, Mother Godavari, and all the Devas, Lord Shiva agreed to reside permanently at this holy confluence accompanied by Brahma and Vishnu. Hence, the Jyotirlinga is called "Trimbak" (the Three-Eyed Lord who embodies the Trinity), making it singular among the twelve sacred Jyotirlingas.',
      puranaQuote: 'To this day, natural spring waters flow gently within the sacred sanctum cavity, bathing the Trinity Jyotirlinga continuously.',
    },
  ],
  mr: [
    {
      chapter: '01',
      titleNative: 'ब्रह्मगिरी पर्वत आणि ब्रह्मदेवांचे तप',
      titleEng: 'ब्रह्मगिरी पर्वत: महादेवांचे साक्षात शैल्यरूप',
      quote: '॥ सह्याद्रिशीर्षे विमले वसन्तं ॥',
      content: 'प्राचीन पुराणांनुसार ब्रह्मदेवांनी भगवान शिवांशी एकरूप होण्यासाठी सह्याद्रीच्या या पावन पर्वतावर कठोर तपश्चर्या केली. त्यांच्या भक्तीवर प्रसन्न होऊन महादेवांनी येथे प्रगट होऊन वरदान दिले की हा पर्वत साक्षात त्यांचेच शैल्यरूप म्हणून त्रिभुवनात पूजला जाईल.',
      puranaQuote: 'पद्मपुराण व शिवपुराणात या घटनेचे वर्णन ईश्वरी कृपा, तपस्या आणि सृष्टीच्या कल्याणाचा महासंगम म्हणून केले आहे.',
    },
    {
      chapter: '02',
      titleNative: 'महर्षि गौतम आणि गोदावरी अवतरण',
      titleEng: 'गौतम ऋषींची तपश्चर्या व गोदावरीचा उगम',
      quote: '॥ गोदावरीतीरपवित्रदेशे ॥',
      content: 'दंडकारण्यातील भीषण दुष्काळात महर्षी गौतमांनी आपल्या तपोबलाने धान्य पिकवून जीवांचे रक्षण केले. अनवधानाने घडलेल्या प्रसंगाच्या प्रायश्चित्तासाठी त्यांनी शिवाची आराधना केली. दयाळू महादेवांनी आपल्या जटा मोकळ्या करून स्वर्गीय गंगेला ब्रह्मगिरीवर सोडले, जी गौतमी गोदावरी म्हणून ओळखली जाऊ लागली.',
      puranaQuote: 'गौतम ऋषींनी कुशाने (दर्भ) नदीला अडवून कुशावर्त तीर्थाची निर्मिती केली, जे आजही सर्व पापांचे क्षालन करणारे मानले जाते.',
    },
    {
      chapter: '03',
      titleNative: 'त्र्यंबकेश्वर ज्योतिर्लिंग प्राकट्य',
      titleEng: 'ब्रह्मा, विष्णू आणि महेश्वर एकाच ज्योतिर्लिंगात',
      quote: '॥ तं त्र्यम्बकमीशमीडे ॥',
      content: 'महर्षी गौतम, माता गोदावरी व समस्त देवांच्या प्रार्थनेवरून भगवान शंकरांनी येथे ब्रह्मा आणि विष्णू यांच्यासह कायमचे वास्तव्य करण्याचे मान्य केले. म्हणूनच या ज्योतिर्लिंगाला "त्र्यंबकेश्वर" (त्रिमूर्तीचे अधिष्ठान) म्हटले जाते, जे बारा ज्योतिर्लिंगांमध्ये एकमेव अद्वितीय आहे.',
      puranaQuote: 'आजही गर्भगृहातील पवित्र अरण्यातून नैसर्गिक जलधारा वाहून त्रिमूर्ती लिंगावर अविरत जलाभिषेक करत राहते.',
    },
  ],
  hi: [
    {
      chapter: '01',
      titleNative: 'ब्रह्मगिरी पर्वत और ब्रह्मा जी का तप',
      titleEng: 'ब्रह्मगिरी: महादेव का साक्षात पर्वत स्वरूप',
      quote: '॥ सह्याद्रिशीर्षे विमले वसन्तं ॥',
      content: 'प्राचीन हिंदू धर्मग्रंथों के अनुसार, भगवान ब्रह्मा जी ने सह्याद्रि के इस पावन पर्वत पर भगवान शिव के साक्षात दर्शन हेतु घोर तपस्या की। ब्रह्मा जी की निश्चल भक्ति से प्रसन्न होकर शिव जी प्रकट हुए और वरदान दिया कि यह पर्वत स्वयं उनका स्वरूप माना जाएगा।',
      puranaQuote: 'पद्म पुराण और शिव पुराण में इस पावन घटना को तप, कृपा और दिव्य जल के त्रिवेणी संगम के रूप में वर्णित किया गया है।',
    },
    {
      chapter: '02',
      titleNative: 'महर्षि गौतम और गोदावरी अवतरण',
      titleEng: 'गौतम ऋषि की तपस्या और दक्षिण गंगा का आगमन',
      quote: '॥ गोदावरीतीरपवित्रदेशे ॥',
      content: 'दंडकारण्य में अकाल के समय महर्षि गौतम ने अपनी तपस्या से सभी प्राणियों का भरण-पोषण किया। इसके उपरांत उन्होंने भगवान शिव की आराधना की। दयालु शिव ने अपनी जटा खोलकर गंगा को ब्रह्मगिरी पर उतारा, जो आगे चलकर गौतमी गोदावरी के नाम से विख्यात हुईं।',
      puranaQuote: 'महर्षि गौतम ने दर्भ (कुश) से पवित्र धारा को कुशावर्त कुंड में स्थापित किया, जो मोक्षदायक तीर्थ बन गया।',
    },
    {
      chapter: '03',
      titleNative: 'त्र्यंबकेश्वर ज्योतिर्लिंग प्राकट्य',
      titleEng: 'एक ही ज्योतिर्लिंग में ब्रह्मा, विष्णु और महेश',
      quote: '॥ तं त्र्यम्बकमीशमीडे ॥',
      content: 'गौतम ऋषि, माता गोदावरी और समस्त देवगणों की प्रार्थना पर भगवान शिव ने ब्रह्मा और विष्णु जी के साथ यहाँ नित्य निवास स्वीकार किया। इस कारण यह ज्योतिर्लिंग "त्र्यंबकेश्वर" कहलाया, जो द्वादश ज्योतिर्लिंगों में अद्वितीय है।',
      puranaQuote: 'गर्भगृह के आंतरिक लिंग गुहा से आज भी निरंतर प्राकृतिक जलधारा प्रवाहित होकर त्रिमूर्ति का अभिषेक करती है।',
    },
  ],
  sa: [
    {
      chapter: '01',
      titleNative: 'ब्रह्मगिरिपर्वतः ब्रह्मणः तपश्च',
      titleEng: 'ब्रह्मगिरिः महादेवस्य साक्षात् शैल्यस्वरूपम्',
      quote: '॥ सह्याद्रिशीर्षे विमले वसन्तं ॥',
      content: 'पुरातनपुराणानुसारं ब्रह्मदेवेन शिवदर्शनार्थं सह्याद्रिशिखरे घोरं तपः कृतम्। भक्त्या तुष्टः शङ्करः प्रादुर्भूय पर्वतं स्वस्वरूपत्वेन अनुगृहीतवान्।',
      puranaQuote: 'पद्मपुराणे शिवपुराणे च एतन्महत्त्वं महता विस्तरेण प्रतिपादितम्।',
    },
    {
      chapter: '02',
      titleNative: 'गौतममहर्षिः गोदावर्याः अवतरणञ्च',
      titleEng: 'गौतमऋषेः तपः दक्षिणगङ्गायाः प्राकट्यम्',
      quote: '॥ गोदावरीतीरपवित्रदेशे ॥',
      content: 'दण्डकारण्ये महर्षिः गौतमः प्राणिनां रक्षणार्थं तपश्चचार। तस्य तपसा प्रसन्नेन शम्भुना जटाजूटात् गङ्गा ब्रह्मगिरौ मुक्ता, या गौतमी गोदावरी अभवत्।',
      puranaQuote: 'गौतमेन कुशेन बद्धं कुशावर्ततीर्थं सर्वपापनाशनं संजातम्।',
    },
    {
      chapter: '03',
      titleNative: 'त्र्यम्बकेश्वरज्योतिर्लिङ्गप्रादुर्भावः',
      titleEng: 'एकस्मिन्नेव लिङ्गे ब्रह्मा, विष्णुः, रुद्रश्च',
      quote: '॥ तं त्र्यम्बकमीशमीडे ॥',
      content: 'गौतमस्य देवानाञ्च प्रार्थनया भगवान् शिवः ब्रह्मविष्णुभ्यां सह अत्रैव नित्यनिवासं कृतवान्। अत एव एतद् ज्योतिर्लिङ्गं त्र्यम्बकेश्वर इति गीयते।',
      puranaQuote: 'गर्भगृहे अद्यापि त्रिमूर्तीनाम् उपरि निरन्तरं पावनजलधारा प्रवहति।',
    },
  ],
  gu: [
    {
      chapter: '01',
      titleNative: 'બ્રહ્મગિરી પર્વત અને બ્રહ્માજીની તપસ્યા',
      titleEng: 'બ્રહ્મગિરી: મહાદેવનું સાક્ષાત શૈલ્ય સ્વરૂપ',
      quote: '॥ सह्याद्रिशीर्षे विमले वसन्तं ॥',
      content: 'પ્રાચીન પુરાણો મુજબ બ્રહ્માજીએ ભગવાન શિવના દર્શન માટે સહ્યાદ્રિના આ પર્વત પર કઠોર તપ કર્યું. ભોળાનાથે પ્રસન્ન થઈને આ પર્વતને પોતાનું જ સ્વરૂપ જાહેર કર્યું.',
      puranaQuote: 'પદ્મ પુરાણ અને શિવ પુરાણમાં આ પવિત્ર ઘટનાનું સુંદર વર્ણન છે.',
    },
    {
      chapter: '02',
      titleNative: 'મહર્ષિ ગૌતમ અને ગોદાવરી અવતરણ',
      titleEng: 'ગૌતમ ઋષિની તપસ્યા અને પવિત્ર ગોદાવરીનું આગમન',
      quote: '॥ गोदावरीतीरपवित्रदेशे ॥',
      content: 'દંડકારણ્યમાં દુષ્કાળ સમયે ગૌતમ ઋષિએ જીવોનું રક્ષણ કર્યું અને શિવજીની આરાધના કરી. ભગવાને પોતાની જટામાંથી ગંગાને બ્રહ્મગિરી પર વહાવી, જે ગૌતમી ગોદાવરી કહેવાઈ.',
      puranaQuote: 'ગૌતમ ઋષિએ દર્ભથી પાણીને રોકી કુશાવર્ત કુંડ સ્થાપિત કર્યો.',
    },
    {
      chapter: '03',
      titleNative: 'ત્ર્યંબકેશ્વર જ્યોતિર્લિંગ પ્રાગટ્ય',
      titleEng: 'એક જ લિંગમાં બ્રહ્મા, વિષ્ણુ અને મહેશ',
      quote: '॥ तं त्र्यम्बकमीशमीडे ॥',
      content: 'ગૌતમ ઋષિ અને દેવતાઓની વિનંતી પર શિવજી બ્રહ્મા અને વિષ્ણુ સાથે અહીં કાયમ માટે બિરાજમાન થયા. તેથી આ લિંગ ત્ર્યંબકેશ્વર કહેવાયું.',
      puranaQuote: 'આજે પણ ગર્ભગૃહમાં કુદરતી જળધારા ત્રિમૂર્તિનો અવિરત અભિષેક કરે છે.',
    },
  ],
  te: [
    {
      chapter: '01',
      titleNative: 'బ్రహ్మగిరి పర్వతం - బ్రహ్మదేవుని తపస్సు',
      titleEng: 'బ్రహ్మగిరి: మహాదేవుని సాక్షాత్ పర్వత రూపం',
      quote: '॥ सह्याद्रिशीर्षे विमले वसन्तं ॥',
      content: 'పురాణాల ప్రకారం బ్రహ్మదేవుడు శివ సాక్షాత్కారం కోసం ఈ పర్వతంపై తీవ్ర తపస్సు చేశాడు. శివుడు ప్రసన్నుడై ఈ పర్వతమే తన స్వరూపమని వరమిచ్చాడు.',
      puranaQuote: 'పద్మ పురాణంలో మరియు శివ పురాణంలో ఈ పవిత్ర లీల కొనియాడబడింది.',
    },
    {
      chapter: '02',
      titleNative: 'గౌతమ మహర్షి - గోదావరి అవతరణ',
      titleEng: 'గౌతమ ఋషి తపస్సు - దక్షిణ గంగ ప్రవాహం',
      quote: '॥ गोदावरीतीरपవित्रदेशे ॥',
      content: 'దండకారణ్య కరువు సమయంలో గౌతమ మహర్షి తపస్సుతో పరమేశ్వరుని ప్రార్థించాడు. శివుడు తన జటామకుటం నుండి గంగను భూమిపైకి వదిలాడు, అదే గౌతమీ గోదావరిగా ప్రసిద్ధి చెందింది.',
      puranaQuote: 'గౌతమ మహర్షి దర్భలతో నదిని ఆపి కుశావవర్త తీర్థాన్ని సృష్టించారు.',
    },
    {
      chapter: '03',
      titleNative: 'త్రయంబకేశ్వర జ్యోతిర్లింగ ప్రాకట్యం',
      titleEng: 'ఒకే లింగంలో బ్రహ్మ, విష్ణు, మహేశ్వరులు',
      quote: '॥ तं त्र्यम्बकमीशमीडे ॥',
      content: 'గౌతముడు, దేవతల ప్రార్థన మేరకు శివుడు బ్రహ్మ, విష్ణువులతో కలిసి ఇక్కడ శాశ్వతంగా కొలువుదీరాడు. అందుకే ఇది త్రయంబకేశ్వరుడిగా పిలువబడుతోంది.',
      puranaQuote: 'గర్భగుడిలో నేటికీ సహజసిద్ధ జలధార త్రిమూర్తులపై నిరంతరం ప్రవహిస్తుంది.',
    },
  ],
  kn: [
    {
      chapter: '01',
      titleNative: 'ಬ್ರಹ್ಮಗಿರಿ ಪರ್ವತ ಮತ್ತು ಬ್ರಹ್ಮನ ತಪಸ್ಸು',
      titleEng: 'ಬ್ರಹ್ಮಗಿರಿ: ಶಿವನ ಸಾಕ್ಷಾತ್ ಶೈಲ ರೂಪ',
      quote: '॥ सह्याद्रिशीर्षे विमले वसन्तं ॥',
      content: 'ಪುರಾಣಗಳ ಪ್ರಕಾರ ಬ್ರಹ್ಮದೇವನು ಶಿವನ ದರ್ಶನಕ್ಕಾಗಿ ಸಹ್ಯಾದ್ರಿ ಶಿಖರದಲ್ಲಿ ತಪಸ್ಸು ಮಾಡಿದನು. ಶಿವನು ಪ್ರಸನ್ನನಾಗಿ ಈ ಪರ್ವತವೇ ತನ್ನ ರೂಪವೆಂದು ಅನುಗ್ರಹಿಸಿದನು.',
      puranaQuote: 'ಶಿವಪುರಾಣದಲ್ಲಿ ಈ ಘಟನೆಯನ್ನು ದೈವಿಕ ಅನುಗ್ರಹವೆಂದು ವರ್ಣಿಸಲಾಗಿದೆ.',
    },
    {
      chapter: '02',
      titleNative: 'ಗೌತಮ ಮಹರ್ಷಿ ಮತ್ತು ಗೋದಾವರಿ ಅವತರಣ',
      titleEng: 'ಗೌತಮ ಋಷಿಯ ತಪಸ್ಸು - ದಕ್ಷಿಣ ಗಂಗೆಯ ಜನನ',
      quote: '॥ गोदावरीतीरपवित्रदेशे ॥',
      content: 'ಬರಗಾಲದ ಸಮಯದಲ್ಲಿ ಗೌತಮ ಋಷಿಯು ಲೋಕಕಲ್ಯಾಣಕ್ಕಾಗಿ ಶಿವನನ್ನು ಪ್ರಾರ್ಥಿಸಿದನು. ಕರುಣಾಮಯಿ ಶಿವನು ಜಟೆಯಿಂದ ಗಂಗೆಯನ್ನು ಹರಿಸಿದನು, ಅದುವೇ ಗೌತಮಿ ಗೋದಾವರಿ.',
      puranaQuote: 'ಗೌತಮ ಋಷಿಯು ದರ್ಭೆಯಿಂದ ಗೋದಾವರಿಯನ್ನು ನಿಲ್ಲಿಸಿ ಕುಶಾವರ್ತ ತೀರ್ಥವನ್ನು ನಿರ್ಮಿಸಿದನು.',
    },
    {
      chapter: '03',
      titleNative: 'ತ್ರ್ಯಂಬಕೇಶ್ವರ ಜ್ಯೋತಿರ್ಲಿಂಗ ಪ್ರಕಟಣೆ',
      titleEng: 'ಒಂದೇ ಲಿಂಗದಲ್ಲಿ ಬ್ರಹ್ಮ, ವಿಷ್ಣು, ಮಹೇಶ್ವರ',
      quote: '॥ तं त्र्यम्बकमीशमीडे ॥',
      content: 'ದೇವತೆಗಳು ಮತ್ತು ಗೌತಮರ ಪ್ರಾರ್ಥನೆಯಂತೆ ಶಿವನು ಬ್ರಹ್ಮ ಮತ್ತು ವಿಷ್ಣುವಿನೊಂದಿಗೆ ಇಲ್ಲಿ ನೆಲೆಸಿದನು. ಆದ್ದರಿಂದ ಇದು ತ್ರ್ಯಂಬಕೇಶ್ವರ ಎಂದು ಪೂಜಿಸಲ್ಪಡುತ್ತದೆ.',
      puranaQuote: 'ಗರ್ಭಗುಡಿಯಲ್ಲಿ ಇಂದಿಗೂ ನೈಸರ್ಗಿಕ ಜಲಧಾರೆ ನಿರಂತರವಾಗಿ ತ್ರಿಮೂರ್ತಿಗಳ ಮೇಲೆ ಹರಿಯುತ್ತದೆ.',
    },
  ],
  ta: [
    {
      chapter: '01',
      titleNative: 'பிரம்மகிரி மலை - பிரம்மனின் தவம்',
      titleEng: 'பிரம்மகிரி: சிவபெருமானின் மலை வடிவம்',
      quote: '॥ सह्याद्रिशीर्षे विमले वसन्तं ॥',
      content: 'புராணங்களின்படி பிரம்மதேவர் சிவபெருமானின் அருள் பெற இம்மலையில் கடும் தவம் புரிந்தார். ஈசன் மகிழ்ந்து இம்மலையே தனது திருவுருவம் என்று அருளினார்.',
      puranaQuote: 'சிவபுராணத்திலும் பத்மபுராணத்திலும் இந்நிகழ்வு போற்றப்படுகிறது.',
    },
    {
      chapter: '02',
      titleNative: 'கௌதம முனிவர் - கோதாவரி அவதாரம்',
      titleEng: 'கௌதம முனிவரின் தவம் - புண்ணிய கோதாவரியின் வருகை',
      quote: '॥ गोदावरीतीरपवित्रदेशे ॥',
      content: 'பஞ்ச காலத்தின்போது கௌதம முனிவர் உயிர்களைக் காத்து சிவனை வழிபட்டார். ஈசன் தன் ஜடையிலிருந்து கங்கையை இறக்க, அது கௌதமி கோதாவரியாக விளங்கியது.',
      puranaQuote: 'கௌதம முனிவர் தர்ப்பைப் புல்லால் நதியை நிலைநிறுத்தி குஷாவர்த்த தீர்த்தத்தை அமைத்தார்.',
    },
    {
      chapter: '03',
      titleNative: 'திரிம்பகேஷ்வரர் ஜோதிர்லிங்க அவதாரம்',
      titleEng: 'ஒரே லிங்கத்தில் பிரம்மா, விஷ்ணு, சிவன்',
      quote: '॥ तं त्र्यम्बकमीशमीडे ॥',
      content: 'முனிவர்கள் மற்றும் தேவர்களின் வேண்டுகோளுக்கிணங்க சிவபெருமான் பிரம்மா, விஷ்ணுவுடன் இங்கு நித்திய வாசம் செய்ய ஒப்புக்கொண்டார். இதனால் திரிம்பகேஷ்வரர் எனப் பெயர் பெற்றது.',
      puranaQuote: 'இன்றும் கருவறையில் இயற்கை நீரூற்று மும்மூர்த்திகளையும் அபிஷேகம் செய்கிறது.',
    },
  ],
  bn: [
    {
      chapter: '01',
      titleNative: 'ব্রহ্মগিরি পর্বত ও ব্রহ্মার তপস্যা',
      titleEng: 'ব্রহ্মগিরি: শিবের প্রত্যক্ষ শৈলরূপ',
      quote: '॥ सह्याद्रिशीर्षे विमले वसन्तं ॥',
      content: 'প্রাচীন শাস্ত্রানুসারে ব্রহ্মা শিবের দর্শনের জন্য এই সহ্যাদ্রি পর্বতে কঠোর তপস্যা করেন। শিব সন্তুষ্ট হয়ে এই পর্বতকে নিজেরই পবিত্র রূপ বলে ঘোষণা করেন।',
      puranaQuote: 'পদ্ম পুরাণ ও শিব পুরাণে এই পবিত্র লীলা সবিস্তারে বর্ণিত।',
    },
    {
      chapter: '02',
      titleNative: 'মহর্ষি গৌতম ও গোদাবরী অবতরণ',
      titleEng: 'গৌতম মুনির তপস্যা ও দক্ষিণ গঙ্গার আগমন',
      quote: '॥ गोदावरीतीरपवित्रदेशे ॥',
      content: 'দুর্ভিক্ষের সময় গৌতম মুনি জগতের কল্যাণে শিবের আরাধনা করেন। দয়ালু শিব জটামুক্ত করে ব্রহ্মগিরিতে গঙ্গাকে অবতীর্ণ করান, যা গৌতমী গোদাবরী নামে পরিচিত হয়।',
      puranaQuote: 'গৌতম মুনি কুশ দ্বারা নদীকে ধারণ করে কুশাবর্ত তীর্থ স্থাপন করেন।',
    },
    {
      chapter: '03',
      titleNative: 'ত্র্যম্বকেশ্বর জ্যোতির্লিঙ্গ প্রাকট্য',
      titleEng: 'একই লিঙ্গে ব্রহ্মা, বিষ্ণু ও মহেশ্বর',
      quote: '॥ तं त्र्यम्बकमीशमीडे ॥',
      content: 'গৌতম মুনি ও দেবতাদের প্রার্থনায় শিব ব্রহ্মা ও বিষ্ণুর সহিত চিরকাল এখানে অবস্থানের প্রতিশ্রুতি দেন। তাই এই লিঙ্গ "ত্র্যম্বকেশ্বর" নামে পূজিত।',
      puranaQuote: 'গর্ভগৃহে আজও প্রাকৃতিক জলধারা ত্রিমূর্তির উপর অবিরাম প্রবাহিত হয়।',
    },
  ],
  or: [
    {
      chapter: '01',
      titleNative: 'ବ୍ରହ୍ମଗିରି ପର୍ବତ ଓ ବ୍ରହ୍ମାଙ୍କ ତପସ୍ୟା',
      titleEng: 'ବ୍ରହ୍ମଗିରି: ମହାଦେବଙ୍କ ପ୍ରତ୍ୟକ୍ଷ ଶୈଳ ସ୍ୱରୂପ',
      quote: '॥ सह्याद्रिशीर्षे विमले वसन्तं ॥',
      content: 'ପୁରାଣ ଅନୁସାରେ ବ୍ରହ୍ମା ଶିବଙ୍କ ଦର୍ଶନ ପାଇଁ ସହ୍ୟାଦ୍ରି ପର୍ବତରେ କଠୋର ତପସ୍ୟା କରିଥିଲେ। ଶିବ ସନ୍ତୁଷ୍ଟ ହୋଇ ପର୍ବତକୁ ନିଜର ଅଂଶ ଘୋଷଣା କଲେ।',
      puranaQuote: 'ପଦ୍ମ ପୁରାଣ ଓ ଶିବ ପୁରାଣରେ ଏହି ଘଟଣା ବର୍ଣ୍ଣିତ ଅଛି।',
    },
    {
      chapter: '02',
      titleNative: 'ମହର୍ଷି ଗୌତମ ଓ ଗୋଦାବରୀ ଅବତରଣ',
      titleEng: 'ଗୌତମ ଋଷିଙ୍କ ତପ ଓ ଦକ୍ଷିଣ ଗଙ୍ଗାଙ୍କ ଆଗମନ',
      quote: '॥ गोदावरीतीरपवित्रदेशे ॥',
      content: 'ମରୁଡ଼ି ସମୟରେ ଗୌତମ ଋଷି ଶିବଙ୍କ ଆରାଧନା କଲେ। ଦୟାମୟ ଶିବ ନିଜ ଜଟାରୁ ଗଙ୍ଗାଙ୍କୁ ବ୍ରହ୍ମଗିରିରେ ଛାଡ଼ିଲେ, ଯାହା ଗୌତମୀ ଗୋଦାବରୀ ଭାବେ ପରିଚିତ ହେଲା।',
      puranaQuote: 'ଗୌତମ ଋଷି କୁଶ ଦ୍ୱାରା ନଦୀକୁ ବାନ୍ଧି କୁଶାବର୍ତ୍ତ କୁଣ୍ଡ ସ୍ଥାପନ କଲେ।',
    },
    {
      chapter: '03',
      titleNative: 'ତ୍ର୍ୟମ୍ବକେଶ୍ୱର ଜ୍ୟୋତିର୍ଲିଙ୍ଗ ପ୍ରାକଟ୍ୟ',
      titleEng: 'ଗୋଟିଏ ଲିଙ୍ଗରେ ବ୍ରହ୍ମା, ବିଷ୍ଣୁ ଓ ମହେଶ୍ୱର',
      quote: '॥ तं त्र्यम्बकमीशमीडे ॥',
      content: 'ଋଷି ଓ ଦେବତାଙ୍କ ପ୍ରାର୍ଥନାରେ ଶିବ ବ୍ରହ୍ମା ଓ ବିଷ୍ଣୁଙ୍କ ସହିତ ଏଠାରେ ସ୍ଥାୟୀ ନିବାସ କଲେ। ତେଣୁ ଏହି ଜ୍ୟୋତିର୍ଲିଙ୍ଗ ତ୍ର୍ୟମ୍ବକେଶ୍ୱର ଭାବେ ଖ୍ୟାତ।',
      puranaQuote: 'ଗର୍ଭଗୃହରେ ଆଜି ମଧ୍ୟ ପ୍ରାକୃତିକ ଜଳଧାରା ନିରନ୍ତର ତ୍ରିମୂର୍ତ୍ତିଙ୍କୁ ଅଭିଷେକ କରୁଛି।',
    },
  ],
};

// -------------------------------------------------------------
// 4. FESTIVALS DATA TRANSLATIONS
// -------------------------------------------------------------
export const FESTIVALS_DATA: Record<SupportedLanguage, FestivalData[]> = {
  en: [
    {
      id: 'mahashivratri',
      name: 'Mahashivratri',
      nativeName: 'महाशिवरात्री',
      traditionalPeriod: 'Magha Krishna Chaturdashi (Feb - Mar)',
      description: 'The premier festival celebrated with round-the-clock Char Prahar Abhisheka, Vedic mantra chanting, and thousands of devotees fasting in divine contemplation.',
      significance: 'Devotees wait through the night to offer Bilva patra and witness the grand golden crown darshan of Lord Trimbakeshwar.',
    },
    {
      id: 'sinhastha-kumbh',
      name: 'Sinhastha Kumbh Mela',
      nativeName: 'सिंहस्थ कुंभमेळा',
      traditionalPeriod: 'Once every 12 years (Jupiter in Leo)',
      description: 'One of the most magnificent spiritual gatherings on Earth. Millions of ascetics, Akhada saints, and pilgrims take the holy Snan in Kushavarta Tirtha and Godavari.',
      significance: 'Historic religious congregation sanctified by Adi Shankaracharya and ancient monastic traditions of India.',
    },
    {
      id: 'palkhi-sohala',
      name: 'Palkhi Sohala (Silver Chariot)',
      nativeName: 'पालखी सोहळा',
      traditionalPeriod: 'Every Monday & Karthik Ekadashi',
      description: 'The divine silver Palkhi carrying the sacred golden mask (Suvarna Mukut) of Lord Trimbakeshwar goes around the town accompanied by traditional Varkari Dindis and tutari trumpets.',
      significance: 'A jubilant folk-spiritual spectacle demonstrating devotion, song, and joyous community reverence.',
    },
    {
      id: 'rath-purnima',
      name: 'Rath Purnima',
      nativeName: 'रथ पौर्णिमा',
      traditionalPeriod: 'Magha Purnima',
      description: 'A grand procession where the ancient ceremonial wooden chariot is pulled through temple avenues by devoted pilgrims seeking divine darshan.',
      significance: 'Celebrated with deep joy as Lord Shiva descends into the streets to bless every household in Trimbak.',
    },
    {
      id: 'tripuri-purnima',
      name: 'Tripuri Purnima (Dev Diwali)',
      nativeName: 'त्रिपुरी पौर्णिमा',
      traditionalPeriod: 'Kartika Purnima (Nov)',
      description: 'The entire temple precinct and Kushavarta Kund are illuminated with tens of thousands of glowing earthen diyas and brass deepastambhas.',
      significance: 'Marks the triumph of Lord Shiva over the demon Tripurasura, celebrated with celestial lights and devotional bliss.',
    },
  ],
  mr: [
    {
      id: 'mahashivratri',
      name: 'महाशिवरात्री महोत्सव',
      nativeName: 'महाशिवरात्री',
      traditionalPeriod: 'माघ कृष्ण चतुर्दशी (फेब्रुवारी - मार्च)',
      description: 'अहोरात्र चार प्रहर रुद्राभिषेक, वैदिक मंत्रपठण आणि हजारो भाविकांच्या उपवासाने साजरा होणारा वर्षातील सर्वात मोठा शिवउत्सव.',
      significance: 'रात्रभर बिल्वपत्र अर्पण करून भगवान त्र्यंबकेश्वरांच्या अलौकिक सुवर्ण मुकुटाचे दर्शन घेण्यासाठी भाविकांची गर्दी होते.',
    },
    {
      id: 'sinhastha-kumbh',
      name: 'सिंहस्थ कुंभमेळा',
      nativeName: 'सिंहस्थ कुंभमेळा',
      traditionalPeriod: 'दर १२ वर्षांनी एकदा (सिंह राशीत गुरू प्रवेश)',
      description: 'जगातील सर्वात मोठा आध्यात्मिक महासोहळा. देशभरातील अखाडे, साधू-संत आणि कोट्यवधी भाविक कुशावर्तात अमृतस्नान करतात.',
      significance: 'आद्य शंकराचार्य व प्राचीन आखाडा परंपरेने पावन झालेला ऐतिहासिक धर्मसोहळा.',
    },
    {
      id: 'palkhi-sohala',
      name: 'पालखी सोहळा व नगर प्रदक्षिणा',
      nativeName: 'पालखी सोहळा',
      traditionalPeriod: 'प्रत्येक सोमवारी व कार्तिकी एकादशीला',
      description: 'भगवान त्र्यंबकेश्वरांचा सुवर्ण मुकुट चांदीच्या भव्य पालखीत विराजमान होऊन तुतारी आणि वारकरी दिंड्यांच्या गजरात नगरप्रदक्षिणा करतो.',
      significance: 'भक्ती, अभंग आणि नादब्रह्माचा अपूर्व संगम असलेला त्र्यंबकचा पारंपरिक लोकोत्सव.',
    },
    {
      id: 'rath-purnima',
      name: 'रथ पौर्णिमा',
      nativeName: 'रथ पौर्णिमा',
      traditionalPeriod: 'माघ पौर्णिमा',
      description: 'मंदिराच्या भव्य लाकडी रथात देवांची प्रतिष्ठापना करून भाविकांकडून भक्तिभावाने नगरभ्रमण केले जाते.',
      significance: 'भगवान शिव स्वतः नगरवासीयांना दर्शन व आशीर्वाद देण्यासाठी रस्त्यावर येतात अशी श्रद्धा आहे.',
    },
    {
      id: 'tripuri-purnima',
      name: 'त्रिपुरी पौर्णिमा (देवदिवाळी)',
      nativeName: 'त्रिपुरी पौर्णिमा',
      traditionalPeriod: 'कार्तिक पौर्णिमा (नोव्हेंबर)',
      description: 'कुशावर्त तीर्थ आणि मंदिर परिसर हजारो मातीच्या पणत्या आणि दीपमाळांच्या दिव्य प्रकाशाने उजळून निघतो.',
      significance: 'भगवान शिवांनी त्रिपुरासुराचा वध करून विजय मिळवल्याचे प्रतीक म्हणून दीपोत्सव साजरा होतो.',
    },
  ],
  hi: [
    {
      id: 'mahashivratri',
      name: 'महाशिवरात्रि महोत्सव',
      nativeName: 'महाशिवरात्री',
      traditionalPeriod: 'माघ कृष्ण चतुर्दशी (फरवरी - मार्च)',
      description: 'दिन-रात चलने वाला चार प्रहर रुद्राभिषेक, वैदिक मंत्रोच्चार और लाखों श्रद्धालुओं के उपवास व साधना का महापर्व।',
      significance: 'श्रद्धालु रात्रि भर बेलपत्र अर्पित करते हैं और भगवान त्र्यंबकेश्वर के दिव्य स्वर्ण मुकुट का दुर्लभ दर्शन प्राप्त करते हैं।',
    },
    {
      id: 'sinhastha-kumbh',
      name: 'सिंहस्थ कुंभ मेला',
      nativeName: 'सिंहस्थ कुंभमेळा',
      traditionalPeriod: 'प्रत्येक १२ वर्ष में एक बार (सिंह राशि में गुरु)',
      description: 'विश्व का सबसे विशाल आध्यात्मिक समागम। अखाड़ों के नागा साधु, संत और करोड़ों भक्त कुशावर्त तीर्थ में अमृत स्नान करते हैं।',
      significance: 'आदि शंकराचार्य एवं प्राचीन सन्यास परंपराओं से अभिमंत्रित ऐतिहासिक धर्म महापर्व।',
    },
    {
      id: 'palkhi-sohala',
      name: 'पालकी सोहळा व नगर भ्रमण',
      nativeName: 'पालखी सोहळा',
      traditionalPeriod: 'प्रत्येक सोमवार व कार्तिक एकादशी',
      description: 'भगवान त्र्यंबकेश्वर के स्वर्ण मुखौटे को चांदी की पालकी में विराजमान कर पारंपरिक वाद्य यंत्रों और भजनों के साथ नगर परिक्रमा कराई जाती है।',
      significance: 'भक्ति, संगीत और सामाजिक समरसता से परिपूर्ण पारंपरिक उत्सव।',
    },
    {
      id: 'rath-purnima',
      name: 'रथ पूर्णिमा',
      nativeName: 'रथ पौर्णिमा',
      traditionalPeriod: 'माघ पूर्णिमा',
      description: 'विशाल काष्ठ रथ में भगवान का विग्रह विराजित कर भक्तजन श्रद्धापूर्वक रथ खींचते हुए नगर परिक्रमा करते हैं।',
      significance: 'मान्यता है कि देवाधिदेव महादेव स्वयं नगरवासियों को आशीर्वाद देने राजपथ पर उतरते हैं।',
    },
    {
      id: 'tripuri-purnima',
      name: 'त्रिपुरी पूर्णिमा (देव दीपावली)',
      nativeName: 'त्रिपुरी पौर्णिमा',
      traditionalPeriod: 'कार्तिक पूर्णिमा (नवंबर)',
      description: 'कुशावर्त कुंड और संपूर्ण मंदिर परिसर सहस्रों मिट्टी के दीयों और दीपस्तंभों की स्वर्णिम आभा से जगमगा उठता है।',
      significance: 'त्रिपुरासुर पर भगवान शिव के विजय का पावन उत्सव, जो दिव्य प्रकाशोत्सव के रूप में मनाया जाता है।',
    },
  ],
  sa: [
    {
      id: 'mahashivratri',
      name: 'महाशिवरात्रिमहोत्सवः',
      nativeName: 'महाशिवरात्री',
      traditionalPeriod: 'माघकृष्णचतुर्दशी',
      description: 'अहोरात्रं चतुष्प्रहररुद्राभिषेकः, वेदमन्त्रोच्चारः, भक्तानाम् उपवाससाधना च।',
      significance: 'रात्रौ बिल्वपत्रसमर्पणं कृत्वा त्र्यम्बकेश्वरस्य दिव्यसुवर्णमुकुटदर्शनं प्राप्यते।',
    },
    {
      id: 'sinhastha-kumbh',
      name: 'सिंहस्थकुम्भपर्व',
      nativeName: 'सिंहस्थ कुम्भमेला',
      traditionalPeriod: 'द्वादशवर्षेषु एकवारम् (गुरौ सिंहगते)',
      description: 'संसारस्य महान् आध्यात्मिकः समागमः, यत्र कुशावर्ते अमृतस्नानं विधीयते।',
      significance: 'शङ्कराचार्यपरम्परया अभिपूतं सनातनधर्मस्य परमं पर्व।',
    },
    {
      id: 'palkhi-sohala',
      name: 'शिवपालिकामहोत्सवः',
      nativeName: 'पालखी सोहळा',
      traditionalPeriod: 'प्रतिसोमवासरं कार्तिकेकादश्याञ्च',
      description: 'रजतपालिकामध्ये सुवर्णमुकुटं संस्थाप्य नगरे शोभायात्रा निष्कास्यते।',
      significance: 'भक्त्या संकीर्तनेन च पूर्णः पारम्परिकः उत्सवः।',
    },
    {
      id: 'rath-purnima',
      name: 'रथपूर्णिमा',
      nativeName: 'रथ पौर्णिमा',
      traditionalPeriod: 'माघपूर्णिमा',
      description: 'दारुरथे भगवतः प्रतिष्ठापनं कृत्वा भक्ताः श्रद्धाभरेण रथं कर्षन्ति।',
      significance: 'भगवान् शिवः साक्षात् नगरे अवतीर्य भक्तान् अनुगृह्णाति।',
    },
    {
      id: 'tripuri-purnima',
      name: 'त्रिपुरीपूर्णिमा (देवदीपावली)',
      nativeName: 'त्रिपुरी पौर्णिमा',
      traditionalPeriod: 'कार्तिकपूर्णिमा',
      description: 'कुशावर्ततीर्थे मन्दिरे च सहस्रशो दीपाः प्रज्वाल्यन्ते।',
      significance: 'त्रिपुरासुरवधोपलक्ष्ये विजयोत्सवः दिव्यदीपावल्या रूपेण आचर्यते।',
    },
  ],
  gu: [
    {
      id: 'mahashivratri',
      name: 'મહાશિવરાત્રિ મહોત્સવ',
      nativeName: 'મહાશિવરાત્રિ',
      traditionalPeriod: 'મહા વદ ચૌદસ (ફેબ્રુઆરી - માર્ચ)',
      description: 'દિવસ-રાત ચાર પ્રહર રુદ્રાભિષેક, વૈદિક મંત્રોચ્ચાર અને હજારો ભક્તોના ઉપવાસ સાથે ઉજવાતો મહાપર્વ.',
      significance: 'ભક્તો રાત્રિભર બિલીપત્ર અર્પણ કરી ત્ર્યંબકેશ્વર મહાદેવના સુવર્ણ મુગટના અલૌકિક દર્શન કરે છે.',
    },
    {
      id: 'sinhastha-kumbh',
      name: 'સિંહસ્થ કુંભ મેળો',
      nativeName: 'સિંહસ્થ કુંભમેળો',
      traditionalPeriod: 'દર ૧૨ વર્ષે એકવાર (સિંહ રાશિમાં ગુરુ)',
      description: 'વિશ્વનો સૌથી ભવ્ય આધ્યાત્મિક મેળો. કરોડો સંતો અને યાત્રાળુઓ કુશાવર્ત કુંડમાં અમૃત સ્નાન કરે છે.',
      significance: 'આદિ શંકરાચાર્ય અને પ્રાચીન અખાડા પરંપરાથી પવિત્ર થયેલો ધર્મોત્સવ.',
    },
    {
      id: 'palkhi-sohala',
      name: 'પાલખી સોહળો (નગર યાત્રા)',
      nativeName: 'પાલખી સોહળો',
      traditionalPeriod: 'દર સોમવારે અને કાર્તિકી અગિયારસે',
      description: 'ચાંદીની પાલખીમાં ભગવાનના સુવર્ણ મુખૌટાને બિરાજમાન કરી વાજતે-ગાજતે નગર પરિક્રમા કરાવાય છે.',
      significance: 'ભક્તિ, કીર્તન અને સામુદાયિક શ્રદ્ધાનો અનેરો ઉત્સવ.',
    },
    {
      id: 'rath-purnima',
      name: 'રથ પૂર્ણિમા',
      nativeName: 'રથ પૂર્ણિમા',
      traditionalPeriod: 'મહા પૂર્ણિમા',
      description: 'વિશાળ લાકડાના રથમાં ભગવાનની મૂર્તિ પધરાવી શ્રદ્ધાળુઓ દ્વારા નગરમાં રથ ખેંચવામાં આવે છે.',
      significance: 'ભગવાન શિવ નગરજનોને દર્શન અને આશીર્વાદ આપવા રસ્તા પર પધારે છે.',
    },
    {
      id: 'tripuri-purnima',
      name: 'ત્રિપુરી પૂર્ણિમા (દેવ દિવાળી)',
      nativeName: 'ત્રિપુરી પૂર્ણિમા',
      traditionalPeriod: 'કારતક પૂર્ણિમા (નવેમ્બર)',
      description: 'કુશાવર્ત કુંડ અને મંદિર પરિસર હજારો માટીના દીવાઓથી ઝળહળી ઊઠે છે.',
      significance: 'ત્રિપુરાસુર પર ભગવાન શિવના વિજયની ખુશીમાં દીપોત્સવ મનાવાય છે.',
    },
  ],
  te: [
    {
      id: 'mahashivratri',
      name: 'మహాశివరాత్రి బ్రహ్మోత్సవాలు',
      nativeName: 'మహాశివరాత్రి',
      traditionalPeriod: 'మాఘ బహుళ చతుర్దశి (ఫిబ్రవరి - మార్చి)',
      description: 'రోజంతా నాలుగు ప్రహరాల రుద్రాభిషేకం, వేద మంత్రోచ్ఛారణలు మరియు భక్తుల జాగరణలతో అత్యంత వైభవంగా జరుగుతుంది.',
      significance: 'భక్తులు రాత్రంతా మారేడు దళాలతో పూజించి, బంగారు కిరీటాలంకృత త్రయంబకేశ్వరుని దర్శించుకుంటారు.',
    },
    {
      id: 'sinhastha-kumbh',
      name: 'సింహస్థ కుంభమేళా',
      nativeName: 'సింహస్థ కుంభమేళా',
      traditionalPeriod: 'ప్రతి 12 సంవత్సరాలకు ఒకసారి',
      description: 'భూమిపై అతిపెద్ద ఆధ్యాత్మిక సంగమం. కోట్లాది సాధువులు, యాత్రికులు కుశావవర్త పుష్కరిణిలో పుణ్యస్నానాలు ఆచరిస్తారు.',
      significance: 'ఆది శంకరాచార్యులు మరియు ప్రాచీన అఖాడా సంప్రదాయాలతో పవిత్రమైన చారిత్రక పర్వదినం.',
    },
    {
      id: 'palkhi-sohala',
      name: 'వెండి పల్లకీ సేవ',
      nativeName: 'పల్లకీ సేవ',
      traditionalPeriod: 'ప్రతి సోమవారం మరియు కార్తీక ఏకాదశి',
      description: 'త్రయంబకేశ్వరుని బంగారు ముఖవస్త్రం వెండి పల్లకీలో ఊరేగింపుగా నగరం చుట్టూ తిరుగుతుంది.',
      significance: 'భక్తి, సంకీర్తనలతో కూడిన ఆనందదాయక సంప్రదాయ ఉత్సవం.',
    },
    {
      id: 'rath-purnima',
      name: 'రథ పౌర్ణమి',
      nativeName: 'రథ పౌర్ణమి',
      traditionalPeriod: 'మాఘ పౌర్ణమి',
      description: 'పురాతన చెక్క రథంలో స్వామివారిని ఉంచి భక్తులు భక్తిశ్రద్ధలతో రథాన్ని లాగుతారు.',
      significance: 'శివుడు స్వయంగా భక్తులకు దర్శనమివ్వడానికి నగర వీధుల్లోకి వస్తాడని ప్రతీతి.',
    },
    {
      id: 'tripuri-purnima',
      name: 'త్రిపురి పౌర్ణమి (దేవ దీపావళి)',
      nativeName: 'త్రిపురి పౌర్ణమి',
      traditionalPeriod: 'కార్తీక పౌర్ణమి (నవంబర్)',
      description: 'కుశావవర్త తీర్థం మరియు ఆలయ ప్రాంగణం వేలాది ప్రమిదల దీప కాంతులతో వెలిగిపోతుంది.',
      significance: 'త్రిపురాసురునిపై శివుని విజయాన్ని పురస్కరించుకుని జరుపుకునే దీపోత్సవం.',
    },
  ],
  kn: [
    {
      id: 'mahashivratri',
      name: 'ಮಹಾಶಿವರಾತ್ರಿ ಮಹೋತ್ಸವ',
      nativeName: 'ಮಹಾಶಿವರಾತ್ರಿ',
      traditionalPeriod: 'ಮಾಘ ಬಹುಳ ಚತುರ್ದಶಿ (ಫೆಬ್ರವರಿ - ಮಾರ್ಚ್)',
      description: 'ಅಹೋರಾತ್ರಿ ನಾಲ್ಕು ಪ್ರಹರಗಳ ರುದ್ರಾಭಿಷೇಕ, ವೇದ ಮಂತ್ರ ಘೋಷ ಹಾಗೂ ಉಪವಾಸದೊಂದಿಗೆ ಆಚರಿಸಲಾಗುವ ಮಹಾಪರ್ವ.',
      significance: 'ರಾತ್ರಿಯಿಡೀ ಬಿಲ್ವಪತ್ರೆ ಅರ್ಪಿಸಿ ಭಗವಾನ್ ತ್ರ್ಯಂಬಕೇಶ್ವರರ ಸುವರ್ಣ ಕಿರೀಟದ ದರ್ಶನ ಪಡೆಯುತ್ತಾರೆ.',
    },
    {
      id: 'sinhastha-kumbh',
      name: 'ಸಿಂಹಸ್ಥ ಕುಂಭಮೇಳ',
      nativeName: 'ಸಿಂಹಸ್ಥ ಕುಂಭಮೇಳ',
      traditionalPeriod: 'ಪ್ರತಿ 12 ವರ್ಷಗಳಿಗೊಮ್ಮೆ (ಗುರು ಸಿಂಹ ಪ್ರವೇಶ)',
      description: 'ಜಗತ್ತಿನ ಅತಿ ದೊಡ್ಡ ಧಾರ್ಮಿಕ ಸಮ್ಮೇಳನ. ಕೋಟ್ಯಂತರ ಸಾಧು-ಸಂತರು ಕುಶಾವರ್ತ ತೀರ್ಥದಲ್ಲಿ ಪುಣ್ಯಸ್ನಾನ ಮಾಡುತ್ತಾರೆ.',
      significance: 'ಆದಿ ಶಂಕರಾಚಾರ್ಯರು ಸ್ಥಾಪಿಸಿದ ಪ್ರಾಚೀನ ಅಖಾಡ ಪರಂಪರೆಯ ಪವಿತ್ರ ಮಹೋತ್ಸವ.',
    },
    {
      id: 'palkhi-sohala',
      name: 'ಬೆಳ್ಳಿ ಪಲ್ಲಕ್ಕಿ ಉತ್ಸವ',
      nativeName: 'ಪಲ್ಲಕ್ಕಿ ಉತ್ಸವ',
      traditionalPeriod: 'ಪ್ರತಿ ಸೋಮವಾರ ಮತ್ತು ಕಾರ್ತಿಕ ಏಕಾದಶಿ',
      description: 'ಸ್ವರ್ಣ ಮುಖವಾಡವಿರುವ ದೇವರ ಬೆಳ್ಳಿ ಪಲ್ಲಕ್ಕಿ ವಾದ್ಯಗೋಷ್ಠಿಗಳೊಂದಿಗೆ ನಗರ ಪ್ರದಕ್ಷಿಣೆ ಮಾಡುತ್ತದೆ.',
      significance: 'ಭಕ್ತಿ, ಭಜನೆಗಳೊಂದಿಗೆ ಸಡಗರದಿಂದ ಆಚರಿಸುವ ಹಬ್ಬ.',
    },
    {
      id: 'rath-purnima',
      name: 'ರಥ ಪೂರ್ಣಿಮಾ',
      nativeName: 'ರಥ ಪೂರ್ಣಿಮಾ',
      traditionalPeriod: 'ಮಾಘ ಪೂರ್ಣಿಮೆ',
      description: 'ಭವ್ಯ ಮರದ ರಥದಲ್ಲಿ ದೇವರನ್ನು ಪ್ರತಿಷ್ಠಾಪಿಸಿ ಭಕ್ತರು ಶ್ರದ್ಧೆಯಿಂದ ರಥವನ್ನು ಎಳೆಯುತ್ತಾರೆ.',
      significance: 'ಶಿವನು ಭಕ್ತರಿಗೆ ಆಶೀರ್ವಾದ ನೀಡಲು ಬೀದಿಗೆ ಬರುತ್ತಾನೆ ಎಂಬ ನಂಬಿಕೆ.',
    },
    {
      id: 'tripuri-purnima',
      name: 'ತ್ರಿಪುರಿ ಪೂರ್ಣಿಮಾ (ದೇವ ದೀಪಾವಳಿ)',
      nativeName: 'ತ್ರಿಪುರಿ ಪೂರ್ಣಿಮಾ',
      traditionalPeriod: 'ಕಾರ್ತಿಕ ಪೂರ್ಣಿಮೆ (ನವೆಂಬರ್)',
      description: 'ಕುಶಾವರ್ತ ತೀರ್ಥ ಮತ್ತು ದೇಗುಲದ ಆವರಣವು ಸಾವಿರಾರು ಮಣ್ಣಿನ ದೀಪಗಳಿಂದ ಕಂಗೊಳಿಸುತ್ತದೆ.',
      significance: 'ತ್ರಿಪುರಾಸುರನ ಸಂಹಾರದ ವಿಜಯೋತ್ಸವವಾಗಿ ಆಚರಿಸುವ ದೀಪೋತ್ಸವ.',
    },
  ],
  ta: [
    {
      id: 'mahashivratri',
      name: 'மகாசிவராத்திரி பெருவிழா',
      nativeName: 'மகாசிவராத்திரி',
      traditionalPeriod: 'மாசி தேய்பிறை சதுர்த்தசி (பிப் - மார்ಚ್)',
      description: 'இரவு பகலாக நான்கு கால ருத்ராபிஷேகம், வேத பாராயணம் மற்றும் பக்தர்கள் உபவாசத்துடன் கொண்டாடும் பெருவிழா.',
      significance: 'வில்வ இலைகளால் பூஜித்து திரிம்பகேஷ்வரரின் தங்க கிரீட தரிசனம் பெற பக்தர்கள் திரள்கின்றனர்.',
    },
    {
      id: 'sinhastha-kumbh',
      name: 'சிம்ஹஸ்த கும்பமேளா',
      nativeName: 'சிம்ஹஸ்த கும்பமேளா',
      traditionalPeriod: '12 ஆண்டுகளுக்கு ஒருமுறை (குரு சிம்மத்தில்)',
      description: 'உலகின் மிகப்பெரிய ஆன்மீகப் பெருவிழா. லட்சக்கணக்கான துறவிகள் குஷாவர்த்த தீர்த்தத்தில் புனித நீராடுகின்றனர்.',
      significance: 'ஆதி சங்கரர் பாரம்பரியத்தால் புனிதமடைந்த வரலாற்று சிறப்புமிக்க விழா.',
    },
    {
      id: 'palkhi-sohala',
      name: 'வெள்ளிப் பல்லக்கு உலா',
      nativeName: 'பல்லக்கு உலா',
      traditionalPeriod: 'ஒவ்வொரு திங்கட்கிழமை மற்றும் கார்த்திகை ஏகாதசி',
      description: 'தங்க முகமூடி அணிந்த ஈசன் வெள்ளிப் பல்லக்கில் வாத்தியங்கள் முழங்க நகர்வலம் வருகிறார்.',
      significance: 'பக்திப் பாடல்களுடன் உற்சாகமாக நடைபெறும் பாரம்பரிய விழா.',
    },
    {
      id: 'rath-purnima',
      name: 'ரத பூர்ணிமா',
      nativeName: 'ரத பூர்ணிமா',
      traditionalPeriod: 'மாசி பௌர்ணமி',
      description: 'பழங்கால மரத்தேரில் சுவாமியை எழுந்தருளச் செய்து பக்தர்கள் வடம்பிடித்து இழுக்கும் பெருவிழா.',
      significance: 'சிவபெருமான் நேரில் வந்து பக்தர்களுக்கு அருள்பாலிப்பதாக ஐதீகம்.',
    },
    {
      id: 'tripuri-purnima',
      name: 'திரிபுரி பூர்ணிமா (தேவ தீபாவளி)',
      nativeName: 'திரிபுரி பூர்ணிமா',
      traditionalPeriod: 'கார்த்திகை பௌர்ணமி (நவம்பர்)',
      description: 'குஷாவர்த்த குளம் மற்றும் கோயில் வளாகம் முழுவதும் பல்லாயிரக்கணக்கான மண் விளக்குகளால் ஒளிர்கிறது.',
      significance: 'திரிபுராசுரனை வதம் செய்த வெற்றியை தீபவொளியால் கொண்டாடும் விழா.',
    },
  ],
  bn: [
    {
      id: 'mahashivratri',
      name: 'মহাশিবরাত্রি মহোৎসব',
      nativeName: 'মহাশিবরাত্রি',
      traditionalPeriod: 'মাঘ কৃষ্ণ চতুর্দশী (ফেব্রুয়ারি - মার্চ)',
      description: 'সারারাত চার প্রহর রুদ্রাভিষেক, বৈদিক মন্ত্রোচ্চারণ এবং ভক্তদের উপবাস সাধনার শ্রেষ্ঠ মহোৎসব।',
      significance: 'ভক্তরা বেলপাতা অর্পণ করে এবং ত্র্যম্বকেশ্বরের অলৌকিক স্বর্ণ মুকুটের দর্শন লাভ করেন।',
    },
    {
      id: 'sinhastha-kumbh',
      name: 'সিংহস্থ কুম্ভমেলা',
      nativeName: 'সিংহস্থ কুম্ভমেলা',
      traditionalPeriod: 'প্রতি ১২ বছরে একবার (সিংহ রাশিতে বৃহস্পতি)',
      description: 'বিশ্বের বৃহত্তম আধ্যাত্মিক সমাবেশ। লক্ষ লক্ষ সাধু-সন্ন্যাসী কুশাবর্ত কুণ্ডে অমৃতস্নান করেন।',
      significance: 'আদি শঙ্করাচার্য দ্বারা পুণ্যময় প্রাচীন অখাড়া ঐতিহ্যের ঐতিহাসিক ধর্মসভা।',
    },
    {
      id: 'palkhi-sohala',
      name: 'পালকি শোভাযাত্রা',
      nativeName: 'পালকি শোভাযাত্রা',
      traditionalPeriod: 'প্রতি সোমবার ও কার্তিক একাদশী',
      description: 'ভগবানের স্বর্ণমুকুট রূপার পালকিতে করে কীর্তনের সুরে শহর পরিক্রমা করে।',
      significance: 'ভক্তি ও সঙ্গীতের মাধ্যমে উদযাপিত সানন্দ জনউৎসব।',
    },
    {
      id: 'rath-purnima',
      name: 'রথ পূর্ণিমা',
      nativeName: 'রথ পূর্ণিমা',
      traditionalPeriod: 'মাঘ পূর্ণিমা',
      description: 'ঐতিহাসিক কাষ্ঠরথে বিগ্রহ স্থাপন করে ভক্তরা ভক্তিভরে রথ টেনে শহর পরিক্রমা করান।',
      significance: 'ভগবান শিব স্বয়ং রাজপথে এসে প্রজাদের দর্শন ও আশীর্বাদ দান করেন।',
    },
    {
      id: 'tripuri-purnima',
      name: 'ত্রিপুরী পূর্ণিমা (দেব দীপাবলি)',
      nativeName: 'ত্রিপুরী পূর্ণিমা',
      traditionalPeriod: 'কার্তিক পূর্ণিমা (নভেম্বর)',
      description: 'কুশাবর্ত কুণ্ড ও মন্দির প্রাঙ্গণ সহস্র মাটির প্রদীপের আলোয় উদ্ভাসিত হয়ে ওঠে।',
      significance: 'ত্রিপুরাসুর বধের আনন্দে স্বর্গীয় দীপোৎসব উদযাপিত হয়।',
    },
  ],
  or: [
    {
      id: 'mahashivratri',
      name: 'ମହାଶିବରାତ୍ରି ମହୋତ୍ସବ',
      nativeName: 'ମହାଶିବରାତ୍ରି',
      traditionalPeriod: 'ମାଘ କୃଷ୍ଣ ଚତୁର୍ଦ୍ଦଶୀ (ଫେବୃଆରୀ - ମାର୍ଚ୍ଚ)',
      description: 'ଅହୋରାତ୍ର ଚାରି ପ୍ରହର ରୁଦ୍ରାଭିଷେକ, ବେଦ ମନ୍ତ୍ରୋଚ୍ଚାରଣ ଓ ଭକ୍ତମାନଙ୍କ ଉପବାସ ସହ ପାଳିତ ମହାପର୍ବ।',
      significance: 'ଭକ୍ତମାନେ ବେଲପତ୍ର ଅର୍ପଣ କରି ପ୍ରଭୁ ତ୍ର୍ୟମ୍ବକେଶ୍ୱରଙ୍କ ଦିବ୍ୟ ସ୍ୱର୍ଣ୍ଣ ମୁକୁଟ ଦର୍ଶନ କରନ୍ତି।',
    },
    {
      id: 'sinhastha-kumbh',
      name: 'ସିଂହସ୍ଥ କୁମ୍ଭମେଳା',
      nativeName: 'ସିଂହସ୍ଥ କୁମ୍ଭମେଳା',
      traditionalPeriod: 'ପ୍ରତି ୧୨ ବର୍ଷରେ ଥରେ',
      description: 'ପୃଥିବୀର ବିଶାଳତମ ଆଧ୍ୟାତ୍ମିକ ମହାସଭା। କୋଟି କୋଟି ସାଧୁସନ୍ଥ କୁଶାବର୍ତ୍ତ କୁଣ୍ଡରେ ଅମୃତ ସ୍ନାନ କରନ୍ତି।',
      significance: 'ଆଦି ଶଙ୍କରାଚାର୍ଯ୍ୟଙ୍କ ଦ୍ୱାରା ପବିତ୍ରିତ ଐତିହାସିକ ଧର୍ମ ମହୋତ୍ସବ।',
    },
    {
      id: 'palkhi-sohala',
      name: 'ରୂପା ପାଲିଙ୍କି ଶୋଭାଯାତ୍ରା',
      nativeName: 'ପାଲିଙ୍କି ଶୋଭାଯାତ୍ରା',
      traditionalPeriod: 'ପ୍ରତି ସୋମବାର ଓ କାର୍ତ୍ତିକ ଏକାଦଶୀ',
      description: 'ପ୍ରଭୁଙ୍କ ସୁନାର ମୁଖା ରୂପା ପାଲିଙ୍କିରେ ବିରାଜମାନ ହୋଇ ସଂକୀର୍ତ୍ତନ ସହ ନଗର ପରିକ୍ରମା କରେ।',
      significance: 'ଭକ୍ତି ସଙ୍ଗୀତରେ ଭରପୂର ଆନନ୍ଦମୟ ଉତ୍ସବ।',
    },
    {
      id: 'rath-purnima',
      name: 'ରଥ ପୂର୍ଣ୍ଣିମା',
      nativeName: 'ରଥ ପୂର୍ଣ୍ଣିମା',
      traditionalPeriod: 'ମାଘ ପୂର୍ଣ୍ଣିମା',
      description: 'ବିଶାଳ କାଠ ରଥରେ ବିଗ୍ରହଙ୍କୁ ସ୍ଥାପନ କରି ଭକ୍ତମାନେ ଶ୍ରଦ୍ଧାର ସହ ରଥ ଟାଣନ୍ତି।',
      significance: 'ଶିବ ସ୍ୱୟଂ ନଗରବାସୀଙ୍କୁ ଆଶୀର୍ବାଦ ଦେବାକୁ ଆସନ୍ତି ବୋଲି ବିଶ୍ୱାସ ରହିଛି।',
    },
    {
      id: 'tripuri-purnima',
      name: 'ତ୍ରିପୁରୀ ପୂର୍ଣ୍ଣିମା (ଦେବ ଦୀପାବଳି)',
      nativeName: 'ତ୍ରିପୁରୀ ପୂର୍ଣ୍ଣିମା',
      traditionalPeriod: 'କାର୍ତ୍ତିକ ପୂର୍ଣ୍ଣିମା (ନଭେମ୍ବର)',
      description: 'କୁଶାବର୍ତ୍ତ ତୀର୍ଥ ଓ ମନ୍ଦିର ପରିସର ହଜାର ହଜାର ମାଟି ଦୀପର ଆଲୋକରେ ଝଲସି ଉଠେ।',
      significance: 'ତ୍ରିପୁରାସୁର ବଧ ପରେ ଶିବଙ୍କ ବିଜୟକୁ ଦୀପୋତ୍ସବ ଭାବେ ପାଳନ କରାଯାଏ।',
    },
  ],
};

// -------------------------------------------------------------
// 5. DARSHAN TIMINGS & GUIDELINES TRANSLATIONS
// -------------------------------------------------------------
export const DARSHAN_TIMINGS_DATA: Record<SupportedLanguage, DarshanTimingData[]> = {
  en: [
    {
      name: 'Mangala Aarti & Nirmalya Visarjan',
      nameNative: 'मंगला आरती व पूजा',
      time: '05:30 AM - 06:00 AM',
      description: 'Morning awakening ritual, removal of previous day flowers, and sacred conch blowing.',
    },
    {
      name: 'General Darshan & Jalabhishek',
      nameNative: 'सामान्य दर्शन व जलाभिषेक',
      time: '06:00 AM - 12:00 PM',
      description: 'Open for all pilgrims. Abhishek passes allow entry into the inner sanctum according to dress code.',
    },
    {
      name: 'Madhyana Mahapuja & Aarti',
      nameNative: 'मध्यान्ह महापूजा व आरती',
      time: '12:00 PM - 01:00 PM',
      description: 'Grand noon worship where naivedya (sacred food offering) is presented to the Lord.',
    },
    {
      name: 'Afternoon Darshan',
      nameNative: 'दुपारचे दर्शन',
      time: '01:30 PM - 07:00 PM',
      description: 'Continuous queue darshan from the Sabha Mandap.',
    },
    {
      name: 'Sandhya Aarti & Suvarna Mukut Darshan',
      nameNative: 'संध्या आरती व मुकुट दर्शन',
      time: '07:00 PM - 08:00 PM',
      description: 'Special evening ritual with brass bells. On Mondays, the historical gem-studded Golden Crown is adorned.',
    },
    {
      name: 'Shej Aarti & Temple Closure',
      nameNative: 'शेज आरती',
      time: '08:30 PM - 09:00 PM',
      description: 'Night lullaby hymn, restful consecration, and sanctuary closing.',
    },
  ],
  mr: [
    {
      name: 'मंगला आरती व निर्माल्य विसर्जन',
      nameNative: 'मंगला आरती व पूजा',
      time: 'पहाटे ०५:३० - ०६:००',
      description: 'प्रभातीची मंगल आरती, मागील दिवसाचे निर्माल्य विसर्जन आणि शंखध्वनी.',
    },
    {
      name: 'सामान्य दर्शन व जलाभिषेक',
      nameNative: 'सामान्य दर्शन व जलाभिषेक',
      time: 'सकाळी ०६:०० - दुपारी १२:००',
      description: 'सर्व भाविकांसाठी खुले दर्शन. गर्भगृह प्रवेश व अभिषेकासाठी पारंपरिक सोवळे अनिवार्य.',
    },
    {
      name: 'मध्यान्ह महापूजा व भोग आरती',
      nameNative: 'मध्यान्ह महापूजा व आरती',
      time: 'दुपारी १२:०० - ०१:००',
      description: 'दुपारची मुख्य राजोपचार महापूजा, महाप्रसाद नैवेद्य आणि षोडशोपचार विधी.',
    },
    {
      name: 'दुपारचे दर्शन',
      nameNative: 'दुपारचे दर्शन',
      time: 'दुपारी ०१:३० - संध्याकाळी ०७:००',
      description: 'सभामंडपातून अखंड दर्शन रांग व्यवस्था.',
    },
    {
      name: 'संध्या आरती व सुवर्ण मुकुट दर्शन',
      nameNative: 'संध्या आरती व मुकुट दर्शन',
      time: 'संध्याकाळी ०७:०० - रात्री ०८:००',
      description: 'धूपारती. दर सोमवारी ऐतिहासिक रत्नजडित सुवर्ण मुकुटाचे अलौकिक दर्शन.',
    },
    {
      name: 'शेज आरती व मंदिर द्वार बंदी',
      nameNative: 'शेज आरती',
      time: 'रात्री ०८:३० - ०९:००',
      description: 'दिवसाची सांगता, देवाची निद्रावस्था शेजारती व कपाट बंदी.',
    },
  ],
  hi: [
    {
      name: 'मंगला आरती व निर्माल्य विसर्जन',
      nameNative: 'मंगला आरती व पूजा',
      time: 'प्रातः ०५:३० - ०६:००',
      description: 'प्रातःकालीन जागरण आरती, पिछले दिन के फूलों का विसर्जन और पावन शंखनाद।',
    },
    {
      name: 'सामान्य दर्शन व जलाभिषेक',
      nameNative: 'सामान्य दर्शन व जलाभिषेक',
      time: 'प्रातः ०६:०० - दोपहर १२:००',
      description: 'सभी भक्तों के लिए खुला दर्शन। गर्भगृह अभिषेक हेतु पारंपरिक वेशभूषा अनिवार्य।',
    },
    {
      name: 'मध्यान्ह महापूजा व आरती',
      nameNative: 'मध्यान्ह महापूजा व आरती',
      time: 'दोपहर १२:०० - ०१:००',
      description: 'दोपहर का मुख्य भोग व महापूजा, नैवेद्य समर्पण और षोडशोपचार आरती।',
    },
    {
      name: 'अपराह्न दर्शन',
      nameNative: 'दुपारचे दर्शन',
      time: 'दोपहर ०१:३० - सायं ०७:००',
      description: 'सभामंडप से निरंतर कतार दर्शन व्यवस्था।',
    },
    {
      name: 'संध्या आरती व स्वर्ण मुकुट दर्शन',
      nameNative: 'संध्या आरती व मुकुट दर्शन',
      time: 'सायं ०७:०० - रात्रि ०८:००',
      description: 'दीपारती। सोमवार को ऐतिहासिक रत्नजड़ित स्वर्ण मुकुट का दिव्य दर्शन।',
    },
    {
      name: 'शयन (शेज) आरती व कपाट बंद',
      nameNative: 'शेज आरती',
      time: 'रात्रि ०८:३० - ०९:००',
      description: 'रात्रि शयन आरती, स्तुतिगान और मंदिर के मुख्य कपाट बंद।',
    },
  ],
  sa: [
    {
      name: 'मङ्गला आरती निर्माल्यविसर्जनञ्च',
      nameNative: 'मंगला आरती व पूजा',
      time: 'प्रातः ०५:३० - ०६:००',
      description: 'प्रातःजागरणविधिः, शङ्खध्वनिः, निर्माल्योत्सारणञ्च।',
    },
    {
      name: 'सामान्यदर्शनं जलाभिषेकश्च',
      nameNative: 'सामान्य दर्शन व जलाभिषेक',
      time: 'प्रातः ०६:०० - १२:००',
      description: 'सर्वेषां भक्तानां दर्शनम्। गर्भगृहप्रवेशाय पारम्परिकवस्त्रम् अनिवार्यम्।',
    },
    {
      name: 'मध्याह्नमहापूजा भोगारती च',
      nameNative: 'मध्यान्ह महापूजा व आरती',
      time: 'मध्याह्ने १२:०० - ०१:००',
      description: 'मध्याह्नस्य राजोपचारपूजा, नैवेद्यसमर्पणं च।',
    },
    {
      name: 'अपराह्नदर्शनम्',
      nameNative: 'दुपारचे दर्शन',
      time: 'अपराह्ने ०१:३० - ०७:००',
      description: 'सभामण्डपात् सततपङ्क्तिदर्शनम्।',
    },
    {
      name: 'सन्ध्या आरती सुवर्णमुकुटदर्शनञ्च',
      nameNative: 'संध्या आरती व मुकुट दर्शन',
      time: 'सायं ०७:०० - ०८:००',
      description: 'दीपारती। सोमवासरे ऐतिहासिकरत्नजडितसुवर्णमुकुटस्य दिव्यदर्शनम्।',
    },
    {
      name: 'शयनारती कपाटपिधानञ्च',
      nameNative: 'शेज आरती',
      time: 'रात्रौ ०८:३० - ०९:००',
      description: 'रात्रिकालीनशयनारती, मन्दिरकवाटपिधानञ्च।',
    },
  ],
  gu: [
    {
      name: 'મંગળા આરતી અને નિર્માલ્ય વિસર્જન',
      nameNative: 'મંગળા આરતી',
      time: 'સવારે ૦૫:૩૦ - ૦૬:૦૦',
      description: 'પ્રભાત જાગરણ આરતી, પૂર્વ દિવસના પુષ્પોનું વિસર્જન અને શંખનાદ.',
    },
    {
      name: 'સામાન્ય દર્શન અને જલાભિષેક',
      nameNative: 'સામાન્ય દર્શન',
      time: 'સવારે ૦૬:૦૦ - બપોરે ૧૨:૦૦',
      description: 'તમામ યાત્રાળુઓ માટે દર્શન. ગર્ભગૃહ અભિષેક માટે પરંપરાગત વસ્ત્રો અનિવાર્ય.',
    },
    {
      name: 'મધ્યાહ્ન મહાપૂજા અને આરતી',
      nameNative: 'મધ્યાહ્ન મહાપૂજા',
      time: 'બપોરે ૧૨:૦૦ - ૦૧:૦૦',
      description: 'બપોરની મુખ્ય રાજોપચાર પૂજા અને મહાપ્રસાદ નૈવેદ્ય અર્પણ.',
    },
    {
      name: 'બપોરના દર્શન',
      nameNative: 'બપોરના દર્શન',
      time: 'બપોરે ૦૧:૩૦ - સાંજે ૦૭:૦૦',
      description: 'સભા મંડપમાંથી અવિરત લાઇન દર્શન વ્યવસ્થા.',
    },
    {
      name: 'સંધ્યા આરતી અને સુવર્ણ મુગટ દર્શન',
      nameNative: 'સંધ્યા આરતી',
      time: 'સાંજે ૦૭:૦૦ - રાત્રે ૦૮:૦૦',
      description: 'દીપ આરતી. સોમવારે ઐતિહાસિક રત્નજડિત સુવર્ણ મુગટના દિવ્ય દર્શન.',
    },
    {
      name: 'શયન (શેજ) આરતી',
      nameNative: 'શેજ આરતી',
      time: 'રાત્રે ૦૮:૩૦ - ૦૯:૦૦',
      description: 'રાત્રિ શયન આરતી અને મંદિરના કપાટ બંધ.',
    },
  ],
  te: [
    {
      name: 'మంగళ హారతి & నిర్మాల్య విసర్జన',
      nameNative: 'మంగళ హారతి',
      time: 'ఉదయం 05:30 - 06:00',
      description: 'ఉదయపు మేల్కొలుపు పూజ, శంఖారావం మరియు నిర్మాల్య విసర్జన.',
    },
    {
      name: 'సాధారణ దర్శనం & జలాభిషేకం',
      nameNative: 'సాధారణ దర్శనం',
      time: 'ఉదయం 06:00 - మధ్యాహ్నం 12:00',
      description: 'భక్తులందరికీ దర్శనం. గర్భాలయ అభిషేకానికి సాంప్రదాయ వస్త్రధారణ తప్పనిసరి.',
    },
    {
      name: 'మధ్యాహ్న మహాపూజ & హారతి',
      nameNative: 'మధ్యాహ్న పూజ',
      time: 'మధ్యాహ్నం 12:00 - 01:00',
      description: 'మధ్యాహ్న రాజోపచార పూజ మరియు నైవేద్య సమర్పణ.',
    },
    {
      name: 'మధ్యాహ్న దర్శనం',
      nameNative: 'అపరాహ్న దర్శనం',
      time: 'మధ్యాహ్నం 01:30 - రాత్రి 07:00',
      description: 'సభా మండపం నుండి నిరంతర క్యూ దర్శనం.',
    },
    {
      name: 'సంధ్యా హారతి & సువర్ణ కిరీట దర్శనం',
      nameNative: 'సంధ్యా హారతి',
      time: 'రాత్రి 07:00 - 08:00',
      description: 'దీపారాధన. సోమవారాల్లో రత్నాలు పొదిగిన బంగారు కిరీట దర్శనం.',
    },
    {
      name: 'శేజ్ హారతి (శయనోత్సవం)',
      nameNative: 'శేజ్ హారతి',
      time: 'రాత్రి 08:30 - 09:00',
      description: 'రాత్రి లాలిపాట, శయన హారతి మరియు ఆలయ తలుపుల మూసివేత.',
    },
  ],
  kn: [
    {
      name: 'ಮಂಗಳ ಆರತಿ ಮತ್ತು ನಿರ್ಮಾಲ್ಯ ವಿಸರ್ಜನೆ',
      nameNative: 'ಮಂಗಳ ಆರತಿ',
      time: 'ಬೆಳಿಗ್ಗೆ 05:30 - 06:00',
      description: 'ಮುಂಜಾನೆಯ ಜಾಗರಣ ಪೂಜೆ, ಶಂಖನಾದ ಮತ್ತು ನಿರ್ಮಾಲ್ಯ ವಿಸರ್ಜನೆ.',
    },
    {
      name: 'ಸಾಮಾನ್ಯ ದರ್ಶನ ಮತ್ತು ಜಲಾಭಿಷೇಕ',
      nameNative: 'ಸಾಮಾನ್ಯ ದರ್ಶನ',
      time: 'ಬೆಳಿಗ್ಗೆ 06:00 - ಮಧ್ಯಾಹ್ನ 12:00',
      description: 'ಎಲ್ಲಾ ಭಕ್ತರಿಗೆ ದರ್ಶನ. ಗರ್ಭಗುಡಿ ಪ್ರವೇಶಕ್ಕೆ ಸಾಂಪ್ರದಾಯಿಕ ಉಡುಪು ಕಡ್ಡಾಯ.',
    },
    {
      name: 'ಮಧ್ಯಾಹ್ನ ಮಹಾಪೂಜೆ ಮತ್ತು ಆರತಿ',
      nameNative: 'ಮಧ್ಯಾಹ್ನ ಮಹಾಪೂಜೆ',
      time: 'ಮಧ್ಯಾಹ್ನ 12:00 - 01:00',
      description: 'ಮಧ್ಯಾಹ್ನದ ಮುಖ್ಯ ರಾಜೋಪಚಾರ ಪೂಜೆ ಮತ್ತು ನೈವೇದ್ಯ ಸಮರ್ಪಣೆ.',
    },
    {
      name: 'ಅಪರಾಹ್ನ ದರ್ಶನ',
      nameNative: 'ಅಪರಾಹ್ನ ದರ್ಶನ',
      time: 'ಮಧ್ಯಾಹ್ನ 01:30 - ಸಂಜೆ 07:00',
      description: 'ಸಭಾ ಮಂಟಪದಿಂದ ನಿರಂತರ ಸಾಲು ದರ್ಶನ.',
    },
    {
      name: 'ಸಂಧ್ಯಾ ಆರತಿ ಮತ್ತು ಸ್ವರ್ಣ ಕಿರೀಟ ದರ್ಶನ',
      nameNative: 'ಸಂಧ್ಯಾ ಆರತಿ',
      time: 'ಸಂಜೆ 07:00 - ರಾತ್ರಿ 08:00',
      description: 'ದೀಪಾರತಿ. ಸೋಮವಾರ ರತ್ನಖಚಿತ ಬಂಗಾರದ ಕಿರೀಟದ ದಿವ್ಯ ದರ್ಶನ.',
    },
    {
      name: 'ಶೇಜ್ ಆರತಿ (ಶಯನ)',
      nameNative: 'ಶೇಜ್ ಆರತಿ',
      time: 'ರಾತ್ರಿ 08:30 - 09:00',
      description: 'ರಾತ್ರಿ ಶಯನ ಆರತಿ ಮತ್ತು ದೇಗುಲದ ಬಾಗಿಲು ಮುಚ್ಚುವಿಕೆ.',
    },
  ],
  ta: [
    {
      name: 'மங்கள ஆரத்தி & நிர்மால்ய விசர்ஜனம்',
      nameNative: 'மங்கள ஆரத்தி',
      time: 'காலை 05:30 - 06:00',
      description: 'காலை திருப்பள்ளியெழுச்சி, சங்கு முழக்கம் மற்றும் முந்தைய மலர்கள் அகற்றுதல்.',
    },
    {
      name: 'பொது தரிசனம் & ஜலாபிஷேகம்',
      nameNative: 'பொது தரிசனம்',
      time: 'காலை 06:00 - நண்பகல் 12:00',
      description: 'அனைத்து பக்தர்களுக்கும் தரிசனம். கருவறை அபிஷேகத்திற்கு பாரம்பரிய உடை கட்டாயம்.',
    },
    {
      name: 'உச்சிக்கால மகாபூஜை & ஆரத்தி',
      nameNative: 'உச்சிக்கால பூஜை',
      time: 'நண்பகல் 12:00 - 01:00',
      description: 'நண்பகல் ராஜோபசார பூஜை மற்றும் நைவேத்திய சமர்ப்பணம்.',
    },
    {
      name: 'மதிய தரிசனம்',
      nameNative: 'மதிய தரிசனம்',
      time: 'மதியம் 01:30 - இரவு 07:00',
      description: 'சபா மண்டபத்திலிருந்து தொடர் வரிசை தரிசனம்.',
    },
    {
      name: 'சாயரட்சை ஆரத்தி & தங்க கிரீட தரிசனம்',
      nameNative: 'சாயரட்சை ஆரத்தி',
      time: 'இரவு 07:00 - 08:00',
      description: 'தீப ஆரத்தி. திங்கட்கிழமைகளில் வரலாற்று சிறப்புமிக்க தங்க கிரீட தரிசனம்.',
    },
    {
      name: 'அர்த்தஜாம (ஷேஜ்) ஆரத்தி',
      nameNative: 'பள்ளியறை பூஜை',
      time: 'இரவு 08:30 - 09:00',
      description: 'இரவு பள்ளியறை பூஜை மற்றும் நடை அடைப்பு.',
    },
  ],
  bn: [
    {
      name: 'মঙ্গলা আরতি ও নির্মাল্য বিসর্জন',
      nameNative: 'মঙ্গলা আরতি',
      time: 'ভোর ০৫:৩০ - ০৬:০০',
      description: 'প্রাতঃকালীন জাগরণ আরতি, শঙ্খধ্বনি ও পূর্বদিনের পুষ্প বিসর্জন।',
    },
    {
      name: 'সাধারণ দর্শন ও জলাভিষেক',
      nameNative: 'সাধারণ দর্শন',
      time: 'সকাল ০৬:০০ - দুপুর ১২:০০',
      description: 'সকল ভক্তদের জন্য দর্শন। গর্ভগৃহে প্রবেশের জন্য ঐতিহ্যবাহী বস্ত্র বাধ্যতামূলক।',
    },
    {
      name: 'মধ্যাহ্ন মহাপূজা ও আরতি',
      nameNative: 'মধ্যাহ্ন মহাপূজা',
      time: 'দুপুর ১২:০০ - ০১:০০',
      description: 'দুপুরের প্রধান রাজোপচার পূজা ও অন্নভোগ নিবেদন।',
    },
    {
      name: 'অপরাহ্ন দর্শন',
      nameNative: 'অপরাহ্ন দর্শন',
      time: 'দুপুর ০১:৩০ - সন্ধ্যা ০৭:০০',
      description: 'সভামণ্ডপ থেকে অবিরাম সারি দর্শন ব্যবস্থা।',
    },
    {
      name: 'সন্ধ্যা আরতি ও স্বর্ণ মুকুট দর্শন',
      nameNative: 'সন্ধ্যা আরতি',
      time: 'সন্ধ্যা ০৭:০০ - রাত ০৮:০০',
      description: 'দীপারতি। সোমবার ঐতিহাসিক রত্নখচিত স্বর্ণ মুকুটের দিব্য দর্শন।',
    },
    {
      name: 'শয়ন আরতি ও মন্দির দ্বার বন্ধ',
      nameNative: 'শয়ন আরতি',
      time: 'রাত ০৮:৩০ - ০৯:০০',
      description: 'রাত্রিকালীন শয়ন আরতি ও মন্দিরের কপাট বন্ধ।',
    },
  ],
  or: [
    {
      name: 'ମଙ୍ଗଳ ଆଳତି ଓ ନିର୍ମାଲ୍ୟ ବିସର୍ଜନ',
      nameNative: 'ମଙ୍ଗଳ ଆଳତି',
      time: 'ପ୍ରଭାତ ୦୫:୩୦ - ୦୬:୦୦',
      description: 'ପ୍ରାତଃ ଜାଗରଣ ଆଳତି, ଶଙ୍ଖ ଧ୍ୱନି ଓ ପୂର୍ବଦିନର ଫୁଲ ବିସର୍ଜନ।',
    },
    {
      name: 'ସାଧାରଣ ଦର୍ଶନ ଓ ଜଳାଭିଷେକ',
      nameNative: 'ସାଧାରଣ ଦର୍ଶନ',
      time: 'ସକାଳ ୦୬:୦୦ - ମଧ୍ୟାହ୍ନ ୧୨:୦୦',
      description: 'ସମସ୍ତ ଭକ୍ତଙ୍କ ପାଇଁ ଦର୍ଶନ। ଗର୍ଭଗୃହ ପ୍ରବେଶ ପାଇଁ ପାରମ୍ପରିକ ବସ୍ତ୍ର ବାଧ୍ୟତାମୂଳକ।',
    },
    {
      name: 'ମଧ୍ୟାହ୍ନ ମହାପୂଜା ଓ ଆଳତି',
      nameNative: 'ମଧ୍ୟାହ୍ନ ମହାପୂଜା',
      time: 'ମଧ୍ୟାହ୍ନ ୧୨:୦୦ - ୦୧:୦୦',
      description: 'ମଧ୍ୟାହ୍ନର ମୁଖ୍ୟ ରାଜୋପଚାର ପୂଜା ଓ ମହାପ୍ରସାଦ ନୈବେଦ୍ୟ ସମର୍ପଣ।',
    },
    {
      name: 'ଅପରାହ୍ନ ଦର୍ଶନ',
      nameNative: 'ଅପରାହ୍ନ ଦର୍ଶନ',
      time: 'ଅପରାହ୍ନ ୦୧:୩୦ - ସନ୍ଧ୍ୟା ୦୭:୦୦',
      description: 'ସଭା ମଣ୍ଡପରୁ ନିରନ୍ତର ଧାଡ଼ି ଦର୍ଶନ।',
    },
    {
      name: 'ସନ୍ଧ୍ୟା ଆଳତି ଓ ସୁବର୍ଣ୍ଣ ମୁକୁଟ ଦର୍ଶନ',
      nameNative: 'ସନ୍ଧ୍ୟା ଆଳତି',
      time: 'ସନ୍ଧ୍ୟା ୦୭:୦୦ - ରାତ୍ରି ୦୮:୦୦',
      description: 'ଦୀପ ଆଳତି। ସୋମବାର ରତ୍ନଖଚିତ ସୁନାର ମୁକୁଟର ଦିବ୍ୟ ଦର୍ଶନ।',
    },
    {
      name: 'ଶୟନ (ଶେଜ) ଆଳତି',
      nameNative: 'ଶୟନ ଆଳତି',
      time: 'ରାତ୍ରି ୦୮:୩୦ - ୦୯:୦୦',
      description: 'ରାତ୍ରି ଶୟନ ଆଳତି ଏବଂ ମନ୍ଦିର କବାଟ ବନ୍ଦ।',
    },
  ],
};

export const DARSHAN_GUIDELINES_DATA: Record<SupportedLanguage, DarshanGuidelinesData> = {
  en: {
    menLabel: 'Men:',
    womenLabel: 'Women:',
    securityTitle: 'Security & Electronic Items',
    securityDesc: 'Mobile phones, smartwatches, cameras, leather belts, and wallets must be deposited at the official temple cloakroom counters before entering the barricaded queue line. Photography inside the temple sanctum is strictly prohibited.',
    seniorTitle: 'Facilities for Senior Citizens & Divyang Jan',
    seniorDesc: 'Dedicated assisted queues and wheelchair ramps are available via the North gate for elderly pilgrims and devotees with special physical needs.',
  },
  mr: {
    menLabel: 'पुरुषांसाठी:',
    womenLabel: 'महिलांसाठी:',
    securityTitle: 'सुरक्षा व इलेक्ट्रॉनिक वस्तूंचे नियम',
    securityDesc: 'मोबाईल फोन, स्मार्टवॉच, कॅमेरा, लेदर बेल्ट आणि पाकीट दर्शनाला जाण्यापूर्वी मंदिर सुरक्षा लॉकर काउंटरवर जमा करावेत. गर्भगृहात छायाचित्रणास सक्त मनाई आहे.',
    seniorTitle: 'ज्येष्ठ नागरिक व दिव्यांग भाविकांसाठी विशेष सुविधा',
    seniorDesc: 'ज्येष्ठ नागरिक आणि दिव्यांग भाविकांसाठी उत्तर दरवाजाकडून समर्पित सहाय्यक रांग आणि व्हीलचेअर रॅम्पची सुविधा उपलब्ध आहे.',
  },
  hi: {
    menLabel: 'पुरुषों के लिए:',
    womenLabel: 'महिलाओं के लिए:',
    securityTitle: 'सुरक्षा व इलेक्ट्रॉनिक वस्तुओं संबंधी नियम',
    securityDesc: 'मोबाइल फोन, स्मार्टवॉच, कैमरा, चमड़े का बेल्ट और पर्स दर्शन कतार में जाने से पहले मंदिर के लॉकर काउंटर पर जमा करवाएं। गर्भगृह में फोटोग्राफी पूर्णतः निषेध है।',
    seniorTitle: 'वरिष्ठ नागरिकों व दिव्यांग जनों हेतु विशेष सुविधा',
    seniorDesc: 'वरिष्ठ नागरिकों और दिव्यांग श्रद्धालुओं के लिए उत्तर द्वार से समर्पित सहायक कतार व व्हीलचेयर रैंप की सुविधा उपलब्ध है।',
  },
  sa: {
    menLabel: 'पुरुषाणाम् कृते:',
    womenLabel: 'महिलानाम् कृते:',
    securityTitle: 'सुरक्षानियमाः विद्युदुपकरणानि च',
    securityDesc: 'चलदूरवाणी, घटिका, कैमरा, चर्मनिर्मितवस्तूनि च बहिः सुरक्षाकक्षे स्थापनीयानि। गर्भगृहे छायाचित्रणं सर्वथा निषिद्धम्।',
    seniorTitle: 'ज्येष्ठनागरिकाणां दिव्याङ्गानां च विशेषसुविधा',
    seniorDesc: 'ज्येष्ठनागरिकेभ्यः दिव्याङ्गेभ्यश्च उत्तरद्वारेण विशेषपङ्क्तिः चक्रासन्दिका (व्हीलचेयर) च उपलभ्यते।',
  },
  gu: {
    menLabel: 'પુરુષો માટે:',
    womenLabel: 'મહિલાઓ માટે:',
    securityTitle: 'સુરક્ષા અને ઈલેક્ટ્રોનિક વસ્તુઓના નિયમો',
    securityDesc: 'મોબાઈલ ફોન, સ્માર્ટવોચ, કેમેરા, ચામડાના પટ્ટા અને પાકીટ દર્શન લાઇનમાં જતાં પહેલાં ક્લોકરૂમ કાઉન્ટર પર જમા કરાવો. ગર્ભગૃહમાં ફોટોગ્રાફી સખત મનાઈ છે.',
    seniorTitle: 'વરિષ્ઠ નાગરિકો અને દિવ્યાંગો માટે વિશેષ સુવિધા',
    seniorDesc: 'વરિષ્ઠ નાગરિકો અને દિવ્યાંગ ભક્તો માટે ઉત્તર દ્વાર તરફથી સમર્પિત સહાયક લાઇન અને વ્હીલચેર રેમ્પ ઉપલબ્ધ છે.',
  },
  te: {
    menLabel: 'పురుషులకు:',
    womenLabel: 'మహిళలకు:',
    securityTitle: 'భద్రతా & ఎలక్ట్రానిక్ వస్తువుల నిబంధనలు',
    securityDesc: 'మొబైల్ ఫోన్లు, స్మార్ట్ వాచ్‌లు, కెమెరాలు, లెదర్ బెల్టులు మరియు పర్సులు దర్శన క్యూలోకి వెళ్లేముందు క్లాక్‌రూమ్ కౌంటర్లలో భద్రపరచాలి. గర్భాలయంలో ఫోటోగ్రఫీ నిషిద్ధం.',
    seniorTitle: 'వయోవృద్ధులు & దివ్యాంగులకు ప్రత్యేక సౌకర్యాలు',
    seniorDesc: 'వయోవృద్ధులు మరియు శారీరక దివ్యాంగుల కోసం ఉత్తర ద్వారం గుండా ప్రత్యేక సహాయక క్యూ మరియు వీల్‌చైర్ ర్యాంప్ సౌకర్యం ఉంది.',
  },
  kn: {
    menLabel: 'ಪುರುಷರಿಗೆ:',
    womenLabel: 'ಮಹಿಳೆಯರಿಗೆ:',
    securityTitle: 'ಭದ್ರತೆ ಮತ್ತು ಎಲೆಕ್ಟ್ರಾನಿಕ್ ವಸ್ತುಗಳ ನಿಯಮಗಳು',
    securityDesc: 'ಮೊಬೈಲ್ ಫೋನ್, ಸ್ಮಾರ್ಟ್‌ವಾಚ್, ಕ್ಯಾಮೆರಾ, ಚರ್ಮದ ಬೆಲ್ಟ್ ಮತ್ತು ಪರ್ಸ್‌ಗಳನ್ನು ಸರತಿ ಸಾಲಿಗೆ ಹೋಗುವ ಮೊದಲು ಕ್ಲಾಕ್‌ರೂಮ್‌ನಲ್ಲಿ ಇಡಬೇಕು. ಗರ್ಭಗುಡಿಯಲ್ಲಿ ಛಾಯಾಗ್ರಹಣ ನಿಷೇಧಿಸಲಾಗಿದೆ.',
    seniorTitle: 'ಹಿರಿಯ ನಾಗರಿಕರು ಮತ್ತು ದಿವ್ಯಾಂಗರಿಗೆ ವಿಶೇಷ ಸೌಲಭ್ಯ',
    seniorDesc: 'ಹಿರಿಯ ನಾಗರಿಕರು ಮತ್ತು ದಿವ್ಯಾಂಗ ಭಕ್ತರಿಗಾಗಿ ಉತ್ತರ ದ್ವಾರದ ಮೂಲಕ ಪ್ರತ್ಯೇಕ ಸಾಲು ಮತ್ತು ಗಾಲಿಕುರ್ಚಿ (ವೀಲ್‌ಚೇರ್) ವ್ಯವಸ್ಥೆ ಲಭ್ಯವಿದೆ.',
  },
  ta: {
    menLabel: 'ஆண்களுக்கு:',
    womenLabel: 'பெண்களுக்கு:',
    securityTitle: 'பாதுகாப்பு & மின்னணு பொருட்கள் விதிமுறைகள்',
    securityDesc: 'கைபேசி, கடிகாரம், கேமரா, தோல் பெல்ட் மற்றும் பணப்பைகளை வரிசையில் செல்லும் முன் கோயிலின் லாக்கர் கவுண்டரில் ஒப்படைக்க வேண்டும். கருவறையில் புகைப்படம் எடுப்பது தடை செய்யப்பட்டுள்ளது.',
    seniorTitle: 'முதியவர்கள் & மாற்றுத்திறனாளிகளுக்கான சிறப்பு வசதிகள்',
    seniorDesc: 'முதியவர்கள் மற்றும் மாற்றுத்திறனாளி பக்தர்களுக்காக வடக்கு வாசல் வழியாக பிரத்யேக வரிசை மற்றும் சக்கர நாற்காலி வசதிகள் உள்ளன.',
  },
  bn: {
    menLabel: 'পুরুষদের জন্য:',
    womenLabel: 'মহিলাদের জন্য:',
    securityTitle: 'নিরাপত্তা ও ইলেকট্রনিক সামগ্রীর নিয়মাবলি',
    securityDesc: 'মোবাইল ফোন, স্মার্টওয়াচ, ক্যামেরা, চামড়ার বেল্ট এবং মানিব্যাগ লাইনে প্রবেশের পূর্বে লকার কাউন্টারে জমা রাখা বাধ্যতামূলক। গর্ভগৃহে ছবি তোলা সম্পূর্ণ নিষিদ্ধ।',
    seniorTitle: 'প্রবীণ নাগরিক ও দিব্যাঙ্গ ভক্তদের বিশেষ সুবিধা',
    seniorDesc: 'প্রবীণ নাগরিক ও বিশেষ চাহিদাসম্পন্ন ভক্তদের জন্য উত্তর দ্বার দিয়ে বিশেষ সহায়ক সারি ও হুইলচেয়ার র‍্যাম্পের ব্যবস্থা রয়েছে।',
  },
  or: {
    menLabel: 'ପୁରୁଷମାନଙ୍କ ପାଇଁ:',
    womenLabel: 'ମହିଳାମାନଙ୍କ ପାଇଁ:',
    securityTitle: 'ସୁରକ୍ଷା ଓ ଇଲେକ୍ଟ୍ରୋନିକ୍ ସାମଗ୍ରୀ ନିୟମାବଳୀ',
    securityDesc: 'ମୋବାଇଲ୍ ଫୋନ୍, ସ୍ମାର୍ଟୱାଚ୍, କ୍ୟାମେରା, ଚମଡ଼ା ବେଲ୍ଟ ଏବଂ ପର୍ସ ଧାଡ଼ିକୁ ଯିବା ପୂର୍ବରୁ କ୍ଲୋକରୁମ୍ କାଉଣ୍ଟରରେ ଜମା କରନ୍ତୁ। ଗର୍ଭଗୃହରେ ଫଟୋ ଉଠାଇବା ସମ୍ପୂର୍ଣ୍ଣ ନିଷେଧ।',
    seniorTitle: 'ବରିଷ୍ଠ ନାଗରିକ ଓ ଦିବ୍ୟାଙ୍ଗଙ୍କ ପାଇଁ ସ୍ୱତନ୍ତ୍ର ସୁବିଧା',
    seniorDesc: 'ବରିଷ୍ଠ ନାଗରିକ ଏବଂ ଦିବ୍ୟାଙ୍ଗ ଶ୍ରଦ୍ଧାଳୁଙ୍କ ପାଇଁ ଉତ୍ତର ଦ୍ୱାର ପଟୁ ସ୍ୱତନ୍ତ୍ର ସହାୟକ ଧାଡ଼ି ଏବଂ ହୁଇଲ୍ ଚେୟାର୍ ସୁବିଧା ଉପଲବ୍ଧ।',
  },
};

// -------------------------------------------------------------
// 6. HOW TO REACH SECTION TRANSLATIONS
// -------------------------------------------------------------
export const HOW_TO_REACH_DATA: Record<SupportedLanguage, HowToReachData> = {
  en: {
    roadDetails: [
      'From Nashik City: 28 km (approx. 40 minutes via NH-848)',
      'From Mumbai: 170 km (approx. 3.5 to 4 hours via Samruddhi / NH-160)',
      'From Pune: 225 km (approx. 4.5 hours via Sangamner - Sinnar)',
      'From Shirdi: 115 km (approx. 2.5 hours via Sinnar)',
    ],
    trainDetails: [
      'Distance to Trimbakeshwar: 38 km from Nashik Road Railway Station',
      'Connected to Mumbai, Delhi, Kolkata, Bengaluru, Chennai, Ahmedabad',
      'Direct express trains (Panchavati, Vande Bharat, Tapovan Express)',
    ],
    airDetails: [
      'Nashik Ozar Airport (ISK): 50 km (Domestic flights from Delhi, Hyderabad, Bengaluru)',
      'Mumbai CSMIA (BOM): 175 km (Major international gateway)',
      'Pune Airport (PNQ): 230 km (Convenient domestic & international flights)',
    ],
    coordsTitle: 'Official Location Coordinates',
    coordsAddress: 'Shri Trimbakeshwar Jyotirlinga Temple, Nashik, Maharashtra 422212',
    coordsMeta: 'Latitude: 19.9328° N, Longitude: 73.5308° E • Elevation: 580m above sea level',
    mapsBtn: 'Open in Google Maps',
  },
  mr: {
    roadDetails: [
      'नाशिक शहरातून: २८ किमी (एनएच-८४८ मार्गे सुमारे ४० मिनिटे)',
      'मुंबईवरून: १७० किमी (समृद्धी महामार्ग / एनएच-१६० मार्गे ३.५ ते ४ तास)',
      'पुण्यावरून: २२५ किमी (संगमनेर - सिन्नर मार्गे सुमारे ४.५ तास)',
      'शिर्डीवरून: ११५ किमी (सिन्नर मार्गे सुमारे २.५ तास)',
    ],
    trainDetails: [
      'नाशिक रोड रेल्वे स्थानकापासून अंतर: ३८ किमी (टॅक्सी व बसेस उपलब्ध)',
      'मुंबई, दिल्ली, कोलकाता, बंगळुरू, चेन्नई, अहमदाबादशी थेट जोडलेले',
      'पंचवटी, वंदे भारत, तपोवन एक्सप्रेस यासारख्या वेगवान थेट गाड्या',
    ],
    airDetails: [
      'नाशिक ओझर विमानतळ (ISK): ५० किमी (दिल्ली, हैदराबाद, बंगळुरू येथून थेट उड्डाणे)',
      'मुंबई छत्रपती शिवाजी महाराज आंतरराष्ट्रीय विमानतळ (BOM): १७५ किमी',
      'पुणे आंतरराष्ट्रीय विमानतळ (PNQ): २३० किमी',
    ],
    coordsTitle: 'अधिकृत भौगोलिक स्थान निर्देशांक',
    coordsAddress: 'श्री त्र्यंबकेश्वर ज्योतिर्लिंग मंदिर, ता. त्र्यंबकेश्वर, जि. नाशिक, महाराष्ट्र ४२२२१२',
    coordsMeta: 'अक्षांश: १९.९३२८° उत्तर, रेखांश: ७३.५३०८° पूर्व • समुद्रसपाटीपासून उंची: ५८० मीटर',
    mapsBtn: 'गुगल मॅप्सवर उघडा',
  },
  hi: {
    roadDetails: [
      'नासिक शहर से: २८ किमी (एनएच-८४८ द्वारा लगभग ४० मिनट)',
      'मुंबई से: १७० किमी (समृद्धि महामार्ग / एनएच-१६० द्वारा ३.५ से ४ घंटे)',
      'पुणे से: २२५ किमी (संगमनेर - सिन्नर द्वारा लगभग ४.५ घंटे)',
      'शिरडी से: ११५ किमी (सिन्नर द्वारा लगभग २.५ घंटे)',
    ],
    trainDetails: [
      'नासिक रोड रेलवे स्टेशन से दूरी: ३८ किमी (नियमित बस एवं टैक्सी उपलब्ध)',
      'मुंबई, दिल्ली, कोलकाता, बेंगलुरु, चेन्नई, अहमदाबाद से सीधा रेल संपर्क',
      'पंचवटी, वंदे भारत, तपोवन एक्सप्रेस जैसी प्रमुख सुपरफास्ट ट्रेनें',
    ],
    airDetails: [
      'नासिक ओझर हवाई अड्डा (ISK): ५० किमी (दिल्ली, हैदराबाद, बेंगलुरु से सीधी उड़ानें)',
      'मुंबई अंतरराष्ट्रीय हवाई अड्डा (BOM): १७५ किमी (विश्वव्यापी संपर्क)',
      'पुणे अंतरराष्ट्रीय हवाई अड्डा (PNQ): २३० किमी',
    ],
    coordsTitle: 'आधिकारिक भौगोलिक निर्देशांक',
    coordsAddress: 'श्री त्र्यंबकेश्वर ज्योतिर्लिंग मंदिर, नासिक, महाराष्ट्र ४२२२१२',
    coordsMeta: 'अक्षांश: १९.९३२८° उत्तर, देशांतर: ७३.५३०८° पूर्व • समुद्र तल से ऊंचाई: ५८० मीटर',
    mapsBtn: 'गूगल मैप्स पर देखें',
  },
  sa: {
    roadDetails: [
      'नासिकनगरात्: २८ कि.मी. (एनएच-८४८ मार्गेण ४० निमेषाः)',
      'मुम्बईनगरात्: १७० कि.मी. (३.५ तः ४ घण्टाः)',
      'पुणेनगरात्: २२५ कि.मी. (४.५ घण्टाः)',
      'शिरडीतः: ११५ कि.मी. (२.५ घण्टाः)',
    ],
    trainDetails: [
      'नासिकरोड-रेलयानागारात् अंतरम्: ३८ कि.मी.',
      'मुम्बई-दिल्ली-कोलकाता-बेङ्गळूरु-नगरेभ्यः प्रत्यक्षं रेलयानम्',
      'वन्दे भारत, पञ्चवटी, तपोवन सदृशाः द्रुतगामिन्यः',
    ],
    airDetails: [
      'नासिक ओझर विमानस्थानकम् (ISK): ५० कि.मी.',
      'मुम्बई विमानस्थानकम् (BOM): १७५ कि.मी.',
      'पुणे विमानस्थानकम् (PNQ): २३० कि.मी.',
    ],
    coordsTitle: 'प्रामाणिकभौगोलिकनिर्देशाङ्काः',
    coordsAddress: 'श्री त्र्यम्बकेश्वर ज्योतिर्लिङ्गमन्दिरम्, नासिक, महाराष्ट्रम् ४२२२१२',
    coordsMeta: 'अक्षांशः: १९.९३२८° उ., देशान्तरः: ७३.५३०८° पू. • समुद्रतलादुन्नतिः: ५८० मी.',
    mapsBtn: 'गुगल-मानचित्रे पश्यतु',
  },
  gu: {
    roadDetails: [
      'નાસિક શહેરથી: ૨૮ કિમી (NH-848 થઈને આશરે ૪૦ મિનિટ)',
      'મુંબઈથી: ૧૭૦ કિમી (સમૃદ્ધિ / NH-160 થઈને ૩.૫ થી ૪ કલાક)',
      'પુણેથી: ૨૨૫ કિમી (આશરે ૪.૫ કલાક)',
      'શિરડીથી: ૧૧૫ કિમી (આશરે ૨.૫ કલાક)',
    ],
    trainDetails: [
      'નાસિક રોડ રેલવે સ્ટેશનથી અંતર: ૩૮ કિમી (ટેક્સી અને બસો ઉપલબ્ધ)',
      'મુંબઈ, અમદાવાદ, સુરત, દિલ્હી સાથે સીધું રેલ જોડાણ',
      'વંદે ભારત અને પંચવટી જેવી ઝડપી ટ્રેનો',
    ],
    airDetails: [
      'નાસિક ઓઝર એરપોર્ટ (ISK): ૫૦ કિમી',
      'મુંબઈ એરપોર્ટ (BOM): ૧૭૫ કિમી',
      'પુણે એરપોર્ટ (PNQ): ૨૩૦ કિમી',
    ],
    coordsTitle: 'સત્તાવાર ભૌગોલિક સ્થાન',
    coordsAddress: 'શ્રી ત્ર્યંબકેશ્વર જ્યોતિર્લિંગ મંદિર, નાસિક, મહારાષ્ટ્ર ૪૨૨૨૧૨',
    coordsMeta: 'અક્ષાંશ: ૧૯.૯૩૨૮° ઉ., રેખાંશ: ૭૩.૫૩૦૮° પૂ. • સમુદ્ર સપાટીથી ઊંચાઈ: ૫૮૦ મીટર',
    mapsBtn: 'ગૂગલ મેપ્સ પર જુઓ',
  },
  te: {
    roadDetails: [
      'నాసిక్ నగరం నుండి: 28 కి.మీ. (NH-848 ద్వారా సుమారు 40 నిమిషాలు)',
      'ముంబై నుండి: 170 కి.మీ. (NH-160 ద్వారా 3.5 నుండి 4 గంటలు)',
      'పూణే నుండి: 225 కి.మీ. (సుమారు 4.5 గంటలు)',
      'షిర్డీ నుండి: 115 కి.మీ. (సుమారు 2.5 గంటలు)',
    ],
    trainDetails: [
      'నాసిక్ రోడ్ రైల్వే స్టేషన్ నుండి దూరం: 38 కి.మీ.',
      'హైదరాబాద్, ముంబై, ఢిల్లీ, బెంగళూరు నుండి ప్రత్యక్ష రైళ్లు',
      'వందే భారత్ మరియు ఎక్స్‌ప్రెస్ రైళ్ల సౌకర్యం',
    ],
    airDetails: [
      'నాసిక్ ఓజార్ విమానాశ్రయం (ISK): 50 కి.మీ. (హైదరాబాద్ నుండి విమానాలు)',
      'ముంబై విమానాశ్రయం (BOM): 175 కి.మీ.',
      'పూణే విమానాశ్రయం (PNQ): 230 కి.మీ.',
    ],
    coordsTitle: 'అధికారిక భౌగోళిక స్థానం',
    coordsAddress: 'శ్రీ త్రయంబకేశ్వర జ్యోతిర్లింగ ఆలయం, నాసిక్, మహారాష్ట్ర 422212',
    coordsMeta: 'అక్షాంశం: 19.9328° N, రేఖాంశం: 73.5308° E • సముద్ర మట్టానికి ఎత్తు: 580 మీటర్లు',
    mapsBtn: 'గూగుల్ మ్యాప్స్‌లో తెరవండి',
  },
  kn: {
    roadDetails: [
      'ನಾಸಿಕ್ ನಗರದಿಂದ: 28 ಕಿ.ಮೀ. (NH-848 ಮೂಲಕ ಸುಮಾರು 40 ನಿಮಿಷ)',
      'ಮುಂಬೈನಿಂದ: 170 ಕಿ.ಮೀ. (3.5 ರಿಂದ 4 ಗಂಟೆಗಳು)',
      'ಪುಣೆಯಿಂದ: 225 ಕಿ.ಮೀ. (ಸುಮಾರು 4.5 ಗಂಟೆಗಳು)',
      'ಶಿರಡಿಯಿಂದ: 115 ಕಿ.ಮೀ. (ಸುಮಾರು 2.5 ಗಂಟೆಗಳು)',
    ],
    trainDetails: [
      'ನಾಸಿಕ್ ರೋಡ್ ರೈಲ್ವೆ ನಿಲ್ದಾಣದಿಂದ ದೂರ: 38 ಕಿ.ಮೀ.',
      'ಬೆಂಗಳೂರು, ಮುಂಬೈ, ದೆಹಲಿಯಿಂದ ನೇರ ರೈಲು ಸಂಪರ್ಕ',
      'ವಂದೇ ಭಾರತ್ ಮತ್ತು ಎಕ್ಸ್‌ಪ್ರೆಸ್ ರೈಲುಗಳ ಸೌಲಭ್ಯ',
    ],
    airDetails: [
      'ನಾಸಿಕ್ ಓಜಾರ್ ವಿಮಾನ ನಿಲ್ದಾಣ (ISK): 50 ಕಿ.ಮೀ. (ಬೆಂಗಳೂರಿನಿಂದ ನೇರ ವಿಮಾನಗಳು)',
      'ಮುಂಬೈ ವಿಮಾನ ನಿಲ್ದಾಣ (BOM): 175 ಕಿ.ಮೀ.',
      'ಪುಣೆ ವಿಮಾನ ನಿಲ್ದಾಣ (PNQ): 230 ಕಿ.ಮೀ.',
    ],
    coordsTitle: 'ಅಧಿಕೃತ ಭೌಗೋಳಿಕ ನಿರ್ದೇಶಾಂಕಗಳು',
    coordsAddress: 'ಶ್ರೀ ತ್ರ್ಯಂಬಕೇಶ್ವರ ಜ್ಯೋತಿರ್ಲಿಂಗ ದೇವಾಲಯ, ನಾಸಿಕ್, ಮಹಾರಾಷ್ಟ್ರ 422212',
    coordsMeta: 'ಅಕ್ಷಾಂಶ: 19.9328° N, ರೇಖಾಂಶ: 73.5308° E • ಸಮುದ್ರ ಮಟ್ಟದಿಂದ ಎತ್ತರ: 580 ಮೀಟರ್',
    mapsBtn: 'ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್‌ನಲ್ಲಿ ತೆರೆಯಿರಿ',
  },
  ta: {
    roadDetails: [
      'நாசிக் நகரத்திலிருந்து: 28 கி.மீ. (NH-848 வழியாக சுமார் 40 நிமிடங்கள்)',
      'மும்பையிலிருந்து: 170 கி.மீ. (3.5 முதல் 4 மணி நேரம்)',
      'புனேவிலிருந்து: 225 கி.மீ. (சுமார் 4.5 மணி நேரம்)',
      'சீரடியிலிருந்து: 115 கி.மீ. (சுமார் 2.5 மணி நேரம்)',
    ],
    trainDetails: [
      'நாசிக் ரோடு ரயில் நிலையத்திலிருந்து தூரம்: 38 கி.மீ.',
      'சென்னை, மும்பை, டெல்லியிலிருந்து நேரடி ரயில் வசதி',
      'வந்தே பாரத் மற்றும் விரைவு ரயில்கள் வசதி',
    ],
    airDetails: [
      'நாசிக் ஓஜார் விமான நிலையம் (ISK): 50 கி.மீ.',
      'மும்பை சர்வதேச விமான நிலையம் (BOM): 175 கி.மீ.',
      'புனே விமான நிலையம் (PNQ): 230 கி.மீ.',
    ],
    coordsTitle: 'அதிகாரப்பூர்வ இருப்பிட அமைவிடம்',
    coordsAddress: 'ஸ்ரீ திரிம்பகேஷ்வரர் ஜோதிர்லிங்க திருக்கோயில், நாசிக், மகாராஷ்டிரா 422212',
    coordsMeta: 'அட்சரேகை: 19.9328° N, தீர்க்கரேகை: 73.5308° E • கடல் மட்டத்திலிருந்து உயரம்: 580 மீ',
    mapsBtn: 'கூகுள் வரைபடத்தில் பார்க்க',
  },
  bn: {
    roadDetails: [
      'নাসিক শহর থেকে: ২৮ কিমি (NH-848 দিয়ে প্রায় ৪০ মিনিট)',
      'মুম্বই থেকে: ১৭০ কিমি (৩.৫ থেকে ৪ ঘণ্টা)',
      'পুনে থেকে: ২২৫ কিমি (প্রায় ৪.৫ ঘণ্টা)',
      'শিরডি থেকে: ১১৫ কিমি (প্রায় ২.৫ ঘণ্টা)',
    ],
    trainDetails: [
      'নাসিক রোড রেল স্টেশন থেকে দূরত্ব: ৩৮ কিমি',
      'কলকাতা, মুম্বই, দিল্লি থেকে সরাসরি এক্সপ্রেস ট্রেন সংযোগ',
      'বন্দে ভারত ও সুপারফাস্ট ট্রেনের সুবিধা',
    ],
    airDetails: [
      'নাসিক ওঝর বিমানবন্দর (ISK): ৫০ কিমি',
      'মুম্বই আন্তর্জাতিক বিমানবন্দর (BOM): ১৭৫ কিমি',
      'পুনে বিমানবন্দর (PNQ): ২৩০ কিমি',
    ],
    coordsTitle: 'আনুষ্ঠানিক ভৌগোলিক অবস্থান',
    coordsAddress: 'শ্রী ত্র্যম্বকেশ্বর জ্যোতির্লিঙ্গ মন্দির, নাসিক, মহারাষ্ট্র ৪২২২১২',
    coordsMeta: 'অক্ষাংশ: ১৯.৯৩২৮° উত্তর, দ্রাঘিমাংশ: ৭৩.৫৩০৮° পূর্ব • সমুদ্রপৃষ্ঠ থেকে উচ্চতা: ৫৮০ মিটার',
    mapsBtn: 'গুগল ম্যাপে দেখুন',
  },
  or: {
    roadDetails: [
      'ନାସିକ ସହରରୁ: ୨୮ କିମି (NH-848 ଦେଇ ପ୍ରାୟ ୪୦ ମିନିଟ୍)',
      'ମୁମ୍ବାଇରୁ: ୧୭୦ କିମି (୩.୫ ରୁ ୪ ଘଣ୍ଟା)',
      'ପୁଣେରୁ: ୨୨୫ କିମି (ପ୍ରାୟ ୪.୫ ଘଣ୍ଟା)',
      'ଶିରିଡ଼ିରୁ: ୧୧୫ କିମି (ପ୍ରାୟ ୨.୫ ଘଣ୍ଟା)',
    ],
    trainDetails: [
      'ନାସିକ ରୋଡ୍ ରେଳ ଷ୍ଟେସନରୁ ଦୂରତା: ୩୮ କିମି',
      'ଭୁବନେଶ୍ୱର, ମୁମ୍ବାଇ, ଦିଲ୍ଲୀରୁ ସିଧାସଳଖ ଟ୍ରେନ୍ ଯୋଗାଯୋଗ',
      'ବନ୍ଦେ ଭାରତ ଓ ଏକ୍ସପ୍ରେସ୍ ଟ୍ରେନ୍ ସୁବିଧା',
    ],
    airDetails: [
      'ନାସିକ ଓଝର ବିମାନବନ୍ଦର (ISK): ୫୦ କିମି',
      'ମୁମ୍ବାଇ ଅନ୍ତର୍ଜାତୀୟ ବିମାନବନ୍ଦର (BOM): ୧୭୫ କିମି',
      'ପୁଣେ ବିମାନବନ୍ଦର (PNQ): ୨୩୦ କିମି',
    ],
    coordsTitle: 'ଅଧିକୃତ ଭୌଗୋଳିକ ଅବସ୍ଥିତି',
    coordsAddress: 'ଶ୍ରୀ ତ୍ର୍ୟମ୍ବକେଶ୍ୱର ଜ୍ୟୋତିର୍ଲିଙ୍ଗ ମନ୍ଦିର, ନାସିକ, ମହାରାଷ୍ଟ୍ର ୪୨୨୨୧୨',
    coordsMeta: 'ଅକ୍ଷାଂଶ: ୧୯.୯୩୨୮° ଉତ୍ତର, ଦ୍ରାଘିମା: ୭୩.୫୩୦୮° ପୂର୍ବ • ସମୁଦ୍ର ପତ୍ତନରୁ ଉଚ୍ଚତା: ୫୮୦ ମିଟର',
    mapsBtn: 'ଗୁଗଲ୍ ମ୍ୟାପ୍ସରେ ଖୋଲନ୍ତୁ',
  },
};

// -------------------------------------------------------------
// 7. DEVOTEE REVIEWS TRANSLATIONS
// -------------------------------------------------------------
export const DEVOTEE_REVIEWS_DATA: Record<SupportedLanguage, DevoteeReviewData[]> = {
  en: [
    {
      name: 'Rajesh & Sunita Kulkarni',
      city: 'Pune, Maharashtra',
      puja: 'Narayan Nagbali',
      date: 'Verified Pilgrim • August 2026',
      comment: 'An extremely peaceful and deeply meaningful 3-day experience. Guruji explained every mantra with immense patience and transparency. The arrangements at Kushavarta Kund were orderly.',
    },
    {
      name: 'Venkatesh Ramanathan',
      city: 'Bengaluru, Karnataka',
      puja: 'Rudrabhishek & Darshan',
      date: 'Verified Pilgrim • July 2026',
      comment: 'Visiting Trimbakeshwar has been my lifelong desire. The morning mist at Brahmagiri and the Rudram chanting inside the temple filled our entire family with blissful serenity.',
    },
    {
      name: 'Bhavik & Meena Patel',
      city: 'Surat, Gujarat',
      puja: 'Kaal Sarp Yog Shanti',
      date: 'Verified Pilgrim • June 2026',
      comment: 'The booking process was completely clear. Guruji spoke fluent Gujarati, took care of all the samagri, and made sure our sankalp was performed with full Vedic sanctity.',
    },
  ],
  mr: [
    {
      name: 'राजेश आणि सुनिता कुलकर्णी',
      city: 'पुणे, महाराष्ट्र',
      puja: 'नारायण नागबळी',
      date: 'प्रमाणित भाविक • ऑगस्ट २०२६',
      comment: 'अत्यंत शांत आणि मनाला तृप्ती देणारा ३ दिवसांचा अनुभव. गुरुजींनी प्रत्येक विधीचा अर्थ मराठीतून समजावून सांगितला. कुशावर्त कुंडावरील व्यवस्थाही उत्तम व शिस्तबद्ध होती.',
    },
    {
      name: 'व्यंकटेश रामनाथन',
      city: 'बंगळुरू, कर्नाटक',
      puja: 'रुद्राभिषेक व दर्शन',
      date: 'प्रमाणित भाविक • जुलै २०२६',
      comment: 'त्र्यंबकेश्वर ज्योतिर्लिंगाचे दर्शन घेणे हे आमचे दीर्घकालीन स्वप्न होते. ब्रह्मगिरीच्या कुशीतील पहाटेचे वातावरण आणि गर्भगृहातील रुद्राचे मंत्रोच्चार अंगावर रोमांच उभे करतात.',
    },
    {
      name: 'भाविक आणि मीना पटेल',
      city: 'सुरत, गुजरात',
      puja: 'कालसर्प योग शांती',
      date: 'प्रमाणित भाविक • जून २०२६',
      comment: 'बुकिंगची प्रक्रिया अगदी सोपी व पारदर्शक होती. गुरुजी गुजराती अतिशय छान बोलत होते. संपूर्ण पूजा साहित्याची व्यवस्था त्यांनी स्वतः केली आणि आमचा संकल्प विधीपूर्वक पूर्ण केला.',
    },
  ],
  hi: [
    {
      name: 'राजेश एवं सुनीता कुलकर्णी',
      city: 'पुणे, महाराष्ट्र',
      puja: 'नारायण नागबलि',
      date: 'प्रमाणित श्रद्धालु • अगस्त २०२६',
      comment: 'अत्यंत शांतिदायक और आध्यात्मिक रूप से परिपूर्ण ३ दिवसीय अनुभव। गुरुजी ने प्रत्येक मंत्र का अर्थ धैर्यपूर्वक समझाया। कुशावर्त कुंड पर व्यवस्था बहुत सुचारु थी।',
    },
    {
      name: 'वेंकटेश रामनाथन',
      city: 'बेंगलुरु, कर्नाटक',
      puja: 'रुद्राभिषेक एवं दर्शन',
      date: 'प्रमाणित श्रद्धालु • जुलाई २०२६',
      comment: 'त्र्यंबकेश्वर ज्योतिर्लिंग के दर्शन की मेरी आजीवन अभिलाषा थी। ब्रह्मगिरी की प्रातःकालीन रमणीयता और मंदिर में श्रीरुद्रम् पाठ ने हमारे पूरे परिवार को धन्य कर दिया।',
    },
    {
      name: 'भाविक एवं मीना पटेल',
      city: 'सूरत, गुजरात',
      puja: 'कालसर्प योग शांति',
      date: 'प्रमाणित श्रद्धालु • जून २०२६',
      comment: 'बुकिंग प्रक्रिया पूरी तरह पारदर्शी थी। गुरुजी ने सरल भाषा में मार्गदर्शन दिया, समस्त पूजन सामग्री की व्यवस्था की और पूर्ण वैदिक विधि से संकल्प कराया।',
    },
  ],
  sa: [
    {
      name: 'राजेशः सुनिता कुलकर्णी च',
      city: 'पुणे, महाराष्ट्रम्',
      puja: 'नारायणनागबलिः',
      date: 'प्रमाणितभक्तौ • अगस्त २०२६',
      comment: 'अतीव शान्तिदायकः पावनश्च त्रिदिवसीयः अनुभवः। गुरुवर्यैः सर्वेषां मन्त्राणां भावार्थः सविस्तरम् उपदिष्टः। कुशावर्ते व्यवस्था उत्तमा आसीत्।',
    },
    {
      name: 'वेङ्कटेश रामनाथन्',
      city: 'बेङ्गळूरु, कर्नाटकम्',
      puja: 'रुद्राभिषेकः दर्शनञ्च',
      date: 'प्रमाणितभक्तः • जुलै २०२६',
      comment: 'त्र्यम्बकेश्वरदर्शनं मम जीवनस्य चिरसङ्कल्पः आसीत्। ब्रह्मगिरेः प्रातःवातावरणेन रुद्राध्यायस्य मन्त्रघोषेण च सर्वं कुलम् आनन्दमग्नम् अभवत्।',
    },
    {
      name: 'भाविकः मीना पटेल च',
      city: 'सूरत, गुजरातम्',
      puja: 'कालसर्पशान्तिः',
      date: 'प्रमाणितभक्तौ • जून २०२६',
      comment: 'पञ्जीकरणप्रक्रिया अतीव सरला पारदर्शिनी च आसीत्। गुरुवर्यैः सर्वसामग्रीसज्जीकरणं कृत्वा वैदिकमर्यादानुकूलं सङ्कल्पः कारितः।',
    },
  ],
  gu: [
    {
      name: 'રાજેશ અને સુનિતા કુલકર્ણી',
      city: 'પુણે, મહારાષ્ટ્ર',
      puja: 'નારાયણ નાગબલી',
      date: 'પ્રમાણિત ભક્ત • ઓગસ્ટ ૨૦૨૬',
      comment: 'અત્યંત શાંતિપૂર્ણ અને ઊંડો આધ્યાત્મિક ૩ દિવસનો અનુભવ. ગુરુજીએ દરેક મંત્રનો અર્થ શાંતિથી સમજાવ્યો. કુશાવર્ત કુંડ પર વ્યવસ્થા ખૂબ જ સરસ હતી.',
    },
    {
      name: 'વેંકટેશ રામનાથન',
      city: 'બેંગલુરુ, કર્ણાટક',
      puja: 'રુદ્રાભિષેક અને દર્શન',
      date: 'પ્રમાણિત ભક્ત • જુલાઈ ૨૦૨૬',
      comment: 'ત્ર્યંબકેશ્વર દર્શનની મારી જીવનભરની ઇચ્છા પૂર્ણ થઈ. બ્રહ્મગિરીની સવાર અને ગર્ભગૃહમાં રુદ્ર મંત્રોચ્ચારથી અમારો સમગ્ર પરિવાર ધન્ય થઈ ગયો.',
    },
    {
      name: 'ભાવિક અને મીના પટેલ',
      city: 'સુરત, ગુજરાત',
      puja: 'કાલસર્પ યોગ શાંતિ',
      date: 'પ્રમાણિત ભક્ત • જૂન ૨૦૨૬',
      comment: 'બુકિંગ પ્રક્રિયા ખૂબ જ સરળ હતી. ગુરુજીએ શુદ્ધ ગુજરાતીમાં વાત કરી, બધી સામગ્રીની વ્યવસ્થા કરી અને સંપૂર્ણ વૈદિક રીતે અમારો સંકલ્પ કરાવ્યો.',
    },
  ],
  te: [
    {
      name: 'రాజేష్ & సునీత కులకర్ణి',
      city: 'పూణే, మహారాష్ట్ర',
      puja: 'నారాయణ నాగబలి',
      date: 'ధృవీకరించబడిన భక్తులు • ఆగస్టు 2026',
      comment: 'ఎంతో ప్రశాంతమైన మరియు సంతృప్తికరమైన 3 రోజుల అనుభవం. గురూజీ ప్రతి మంత్రం యొక్క అర్థాన్ని ఎంతో ఓపికతో వివరించారు. కుశావవర్త పుష్కరిణి వద్ద ఏర్పాట్లు బాగున్నాయి.',
    },
    {
      name: 'వెంకటేష్ రామనాథన్',
      city: 'బెంగళూరు, కర్ణాటక',
      puja: 'రుద్రాభిషేకం & దర్శనం',
      date: 'ధృవీకరించబడిన భక్తుడు • జూలై 2026',
      comment: 'త్రయంబకేశ్వర దర్శనం నా జీవితకాల కోరిక. బ్రహ్మగిరి ఉదయపు వాతావరణం, రుద్ర మంత్రోచ్ఛారణలు మా కుటుంబం మొత్తానికి అపారమైన మనశ్శాంతిని ఇచ్చాయి.',
    },
    {
      name: 'భావిక్ & మీనా పటేల్',
      city: 'సూరత్, గుజరాత్',
      puja: 'కాలసర్ప యోగ శాంతి',
      date: 'ధృవీకరించబడిన భక్తులు • జూన్ 2026',
      comment: 'బుకింగ్ విధానం అత్యంత పారదర్శకంగా ఉంది. గురూజీ స్వయంగా సమస్త పూజా సామగ్రిని ఏర్పాటు చేసి పూర్తి వైదిక పద్ధతిలో మా సంకల్పాన్ని పూర్తి చేయించారు.',
    },
  ],
  kn: [
    {
      name: 'ರಾಜೇಶ್ ಮತ್ತು ಸುನೀತಾ ಕುಲಕರ್ಣಿ',
      city: 'ಪುಣೆ, ಮಹಾರಾಷ್ಟ್ರ',
      puja: 'ನಾರಾಯಣ ನಾಗಬಲಿ',
      date: 'ದೃಢೀಕೃತ ಭಕ್ತರು • ಆಗಸ್ಟ್ 2026',
      comment: 'ಅತ್ಯಂತ ಶಾಂತಿಯುತ ಹಾಗೂ ಅರ್ಥಪೂರ್ಣವಾದ 3 ದಿನಗಳ ಅನುಭವ. ಗುರೂಜಿಯವರು ಪ್ರತಿಯೊಂದು ಮಂತ್ರದ ಅರ್ಥವನ್ನು ತಾಳ್ಮೆಯಿಂದ ವಿವರಿಸಿದರು.',
    },
    {
      name: 'ವೆಂಕಟೇಶ್ ರಾಮನಾಥನ್',
      city: 'ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ',
      puja: 'ರುದ್ರಾಭಿಷೇಕ ಮತ್ತು ದರ್ಶನ',
      date: 'ದೃಢೀಕೃತ ಭಕ್ತರು • ಜುಲೈ 2026',
      comment: 'ತ್ರ್ಯಂಬಕೇಶ್ವರ ಜ್ಯೋತಿರ್ಲಿಂಗ ದರ್ಶನ ನನ್ನ ಜೀವಮಾನದ ಆಸೆಯಾಗಿತ್ತು. ಬ್ರಹ್ಮಗಿರಿಯ ಮುಂಜಾನೆ ಮತ್ತು ದೇಗುಲದ ರುದ್ರ ಪಠಣ ನಮ್ಮ ಇಡೀ ಕುಟುಂಬಕ್ಕೆ ಪರಮ ಶಾಂತಿ ನೀಡಿತು.',
    },
    {
      name: 'ಭಾವಿಕ್ ಮತ್ತು ಮೀನಾ ಪಟೇಲ್',
      city: 'ಸೂರತ್, ಗುಜರಾತ್',
      puja: 'ಕಾಲಸರ್ಪ ಯೋಗ ಶಾಂತಿ',
      date: 'ದೃಢೀಕೃತ ಭಕ್ತರು • ಜೂನ್ 2026',
      comment: 'ಬುಕಿಂಗ್ ಪ್ರಕ್ರಿಯೆ ಸಂಪೂರ್ಣ ಪಾರದರ್ಶಕವಾಗಿತ್ತು. ಗುರೂಜಿಯವರು ಎಲ್ಲಾ ಪೂಜಾ ಸಾಮಗ್ರಿಗಳನ್ನು ಸಿದ್ಧಪಡಿಸಿ ವೈದಿಕ ವಿಧಿಯಂತೆ ನಮ್ಮ ಸಂಕಲ್ಪವನ್ನು ನೆರವೇರಿಸಿದರು.',
    },
  ],
  ta: [
    {
      name: 'ராஜேஷ் & சுனிதா குல்கர்னி',
      city: 'புனே, மகாராஷ்டிரா',
      puja: 'நாராயண நாகபலி',
      date: 'உறுதிப்படுத்தப்பட்ட பக்தர் • ஆகஸ்ட் 2026',
      comment: 'மிகவும் அமைதியான மற்றும் ஆன்மீக நிறைவளிக்கும் 3 நாள் அனுபவம். குருஜி ஒவ்வொரு மந்திரத்தின் பொருளையும் பொறுமையுடன் விளக்கினார்.',
    },
    {
      name: 'வெங்கடேஷ் ராமநாதன்',
      city: 'பெங்களூரு, கர்நாடகா',
      puja: 'ருத்ராபிஷேகம் & தரிசனம்',
      date: 'உறுதிப்படுத்தப்பட்ட பக்தர் • ஜூலை 2026',
      comment: 'திரிம்பகேஷ்வரர் தரிசனம் என் வாழ்நாள் விருப்பம். பிரம்மகிரியின் விடியலும், கோயிலில் ஒலித்த ஸ்ரீருத்ர மந்திரங்களும் எங்கள் குடும்பத்திற்கு பேரமைதி அளித்தன.',
    },
    {
      name: 'பாவிக் & மீனா படேல்',
      city: 'சூரத், குஜராத்',
      puja: 'காலசர்ப்ப யோக சாந்தி',
      date: 'உறுதிப்படுத்தப்பட்ட பக்தர் • ஜூன் 2026',
      comment: 'முன்பதிவு நடைமுறை மிகவும் வெளிப்படையாக இருந்தது. குருஜி அனைத்துப் பூஜை சாமான்களையும் கவனித்துக் கொண்டு வேத முறைப்படி சங்கல்பம் செய்து வைத்தார்.',
    },
  ],
  bn: [
    {
      name: 'রাজেশ ও সুনীতা কুলকার্নি',
      city: 'পুনে, মহারাষ্ট্র',
      puja: 'নারায়ণ নাগবলি',
      date: 'যাচাইকৃত তীর্থযাত্রী • আগস্ট ২০২৬',
      comment: 'অত্যন্ত শান্ত ও আধ্যাত্মিক সন্তোষজনক ৩ দিনের অভিজ্ঞতা। গুরুজী প্রতিটি মন্ত্রের অর্থ ধৈর্যের সাথে বুঝিয়ে দেন। কুশাবর্ত কুণ্ডের ব্যবস্থাপনা চমৎকার ছিল।',
    },
    {
      name: 'ভেঙ্কটেশ রামনাথন',
      city: 'বেঙ্গালুরু, কর্ণাটক',
      puja: 'রুদ্রাভিষেক ও দর্শন',
      date: 'যাচাইকৃত তীর্থযাত্রী • জুলাই ২০২৬',
      comment: 'ত্র্যম্বকেশ্বর দর্শন আমার আজীবনের স্বপ্ন ছিল। ব্রহ্মগিরির মনোরম সকাল ও মন্দিরের রুদ্রপাঠ আমাদের পুরো পরিবারকে পরমানন্দ দান করেছে।',
    },
    {
      name: 'ভাবিক ও মীনা প্যাটেল',
      city: 'সুরাট, গুজরাট',
      puja: 'কালসর্প যোগ শান্তি',
      date: 'যাচাইকৃত তীর্থযাত্রী • জুন ২০২৬',
      comment: 'বুকিং প্রক্রিয়া সম্পূর্ণ স্বচ্ছ ছিল। গুরুজী অত্যন্ত যত্নসহকারে সমস্ত পূজাসামগ্রী প্রস্তুত করে পূর্ণ বৈদিক বিধিতে আমাদের সংকল্প সম্পন্ন করান।',
    },
  ],
  or: [
    {
      name: 'ରାଜେଶ ଓ ସୁନୀତା କୁଲକର୍ଣ୍ଣୀ',
      city: 'ପୁଣେ, ମହାରାଷ୍ଟ୍ର',
      puja: 'ନାରାୟଣ ନାଗବଳି',
      date: 'ପ୍ରମାଣିତ ଶ୍ରଦ୍ଧାଳୁ • ଅଗଷ୍ଟ ୨୦୨୬',
      comment: 'ଅତ୍ୟନ୍ତ ଶାନ୍ତିଦାୟକ ଓ ପୂର୍ଣ୍ଣ ଆଧ୍ୟାତ୍ମିକ ୩ ଦିନର ଅନୁଭୂତି। ଗୁରୁଜୀ ପ୍ରତ୍ୟେକ ମନ୍ତ୍ରର ଅର୍ଥ ଧୈର୍ଯ୍ୟର ସହ ବୁଝାଇଥିଲେ। କୁଶାବର୍ତ୍ତ କୁଣ୍ଡର ବ୍ୟବସ୍ଥା ଅତି ଉତ୍ତମ ଥିଲା।',
    },
    {
      name: 'ଭେଙ୍କଟେଶ ରାମନାଥନ୍',
      city: 'ବେଙ୍ଗାଲୁରୁ, କର୍ଣ୍ଣାଟକ',
      puja: 'ରୁଦ୍ରାଭିଷେକ ଓ ଦର୍ଶନ',
      date: 'ପ୍ରମାଣିତ ଶ୍ରଦ୍ଧାଳୁ • ଜୁଲାଇ ୨୦୨୬',
      comment: 'ତ୍ର୍ୟମ୍ବକେଶ୍ୱର ଦର୍ଶନ ମୋର ଆଜୀବନର ଇଚ୍ଛା ଥିଲା। ବ୍ରହ୍ମଗିରିର ପ୍ରଭାତ ଏବଂ ମନ୍ଦିରରେ ରୁଦ୍ର ମନ୍ତ୍ରପାଠ ଆମ ପରିବାରକୁ ଅପାର ଶାନ୍ତି ଦେଇଛି।',
    },
    {
      name: 'ଭାବିକ ଓ ମୀନା ପଟେଲ',
      city: 'ସୁରଟ, ଗୁଜରାଟ',
      puja: 'କାଳସର୍ପ ଯୋଗ ଶାନ୍ତି',
      date: 'ପ୍ରମାଣିତ ଶ୍ରଦ୍ଧାଳୁ • ଜୁନ୍ ୨୦୨୬',
      comment: 'ବୁକିଂ ପ୍ରକ୍ରିୟା ସମ୍ପୂର୍ଣ୍ଣ ସ୍ୱଚ୍ଛ ଥିଲା। ଗୁରୁଜୀ ସମସ୍ତ ପୂଜା ସାମଗ୍ରୀ ବ୍ୟବସ୍ଥା କରି ସମ୍ପୂର୍ଣ୍ଣ ବୈଦିକ ବିଧିରେ ଆମର ସଂକଳ୍ପ କରାଇଥିଲେ।',
    },
  ],
};

// -------------------------------------------------------------
// 8. FAQS TRANSLATIONS
// -------------------------------------------------------------
export const FAQS_DATA: Record<SupportedLanguage, FaqData[]> = {
  en: [
    {
      id: 'faq-1',
      question: 'How can I book a traditional Puja at Trimbakeshwar?',
      questionNative: 'त्र्यंबकेश्वर येथे पूजा कशी बुक करावी?',
      answer: 'You can choose your desired Vidhi (such as Narayan Nagbali, Tripindi Shraddha, or Rudrabhishek), select an auspicious date based on your convenience or Guruji guidance, choose an authorized Vedic Guruji, and fill in the Yajman details. Our Guruji will directly connect with you prior to the date to confirm required samagri and fasting instructions.',
    },
    {
      id: 'faq-2',
      question: 'Which Pujas are traditionally performed at Trimbakeshwar?',
      questionNative: 'त्र्यंबकेश्वरमध्ये कोणकोणत्या मुख्य पूजा होतात?',
      answer: 'The primary traditional rituals include Narayan Nagbali (3-day ritual for ancestral peace), Tripindi Shraddha (1-day Pitru observance), Kaal Sarp Yog Shanti (Vedic astrological remedy), Kumbh Vivah, Maha Mrityunjaya Jaap, and daily Rudrabhishek / Laghu Rudra offerings.',
    },
    {
      id: 'faq-3',
      question: 'How do I choose an experienced and verified Guruji?',
      questionNative: 'योग्य व अधिकृत गुरुजींची निवड कशी करावी?',
      answer: 'All Gurujis featured on this portal are authorized Purohits from established Trimbak families, formally trained in Shukla Yajurveda and Shastra Vidhi with decades of experience. You can review their profiles, languages spoken (Marathi, Hindi, Gujarati, English), and ritual specialties before selecting.',
    },
    {
      id: 'faq-4',
      question: 'What should I know regarding dress code and rules before visiting the temple?',
      questionNative: 'मंदिरात जाण्यापूर्वी वेशभूषा आणि काय नियम पाळावेत?',
      answer: 'For general Sabha Mandap darshan, modest traditional Indian attire is recommended (Kurta-Pajama or Dhoti for men, Saree or Salwar-Kameez for women). For inner sanctum entry and performing Abhishek directly, men must wear a traditional cotton or silk Dhoti (unstitched) without upper shirt (angavastra permitted), and women wear a traditional Saree. Leather belts, wallets, and mobile phones are not permitted inside the sanctum.',
    },
    {
      id: 'faq-5',
      question: 'How should I plan my pilgrimage itinerary to Trimbakeshwar?',
      questionNative: 'त्र्यंबकेश्वर यात्रेचे नियोजन कसे करावे?',
      answer: 'For a general Darshan trip, 1 to 2 days is sufficient to visit the main Mandir, Kushavarta Kund, Brahmagiri Gangadwar, and Sant Nivruttinath Samadhi. If you are participating in a 3-day Narayan Nagbali Vidhi, you should plan a minimum stay of 4 days / 3 nights in Trimbak town.',
    },
  ],
  mr: [
    {
      id: 'faq-1',
      question: 'त्र्यंबकेश्वर येथे पारंपरिक विधी व पूजा कशी बुक करावी?',
      questionNative: 'त्र्यंबकेश्वर येथे पूजा कशी बुक करावी?',
      answer: 'आपण आपल्या गरजेनुसार इच्छित विधी (उदा. नारायण नागबळी, त्रिपिंडी श्राद्ध किंवा रुद्राभिषेक) निवडून, आपल्या सोयीनुसार किंवा गुरुजींच्या मार्गदर्शनानुसार शुभ मुहूर्त व तारीख निश्चित करू शकता. त्यानंतर अधिकृत वैदिक पुरोहित निवडून यजमानांची माहिती भरावी. तारीख निश्चित झाल्यावर गुरुजी थेट आपल्याशी संपर्क साधून पूजेचे साहित्य व नियमांची संपूर्ण माहिती देतात.',
    },
    {
      id: 'faq-2',
      question: 'त्र्यंबकेश्वर तीर्थक्षेत्री कोणकोणत्या मुख्य पूजा होतात?',
      questionNative: 'त्र्यंबकेश्वरमध्ये कोणकोणत्या मुख्य पूजा होतात?',
      answer: 'येथे प्रामुख्याने नारायण नागबळी (पितृदोषासाठी ३ दिवसीय अत्यंत पवित्र विधी), त्रिपिंडी श्राद्ध (तीन पिढ्यांच्या आत्मशांतीसाठी १ दिवसीय विधी), कालसर्प योग शांती (ज्योतिषीय शांती विधी), कुंभ विवाह, महामृत्युंजय जप अनुष्ठान आणि दैनंदिन लघुरुद्र / रुद्राभिषेक हे विधी शास्त्राधारित पद्धतीने संपन्न होतात.',
    },
    {
      id: 'faq-3',
      question: 'योग्य व अधिकृत गुरुजींची निवड कशी करावी?',
      questionNative: 'योग्य व अधिकृत गुरुजींची निवड कशी करावी?',
      answer: 'या पोर्टलवर सूचीबद्ध केलेले सर्व पुरोहित त्र्यंबक क्षेत्रातील अधिकृत व प्रमाणित वंशपरंपरागत घराण्यातील आहेत. त्यांनी शुक्ल यजुर्वेद व धर्मशास्त्राचे विधिवत शिक्षण घेतलेले असून त्यांना अनेक दशकांचा अनुभव आहे. आपण त्यांची माहिती, बोलल्या जाणाऱ्या भाषा (मराठी, हिंदी, गुजराती, इंग्रजी) आणि विधींचे प्राविण्य पाहून निवड करू शकता.',
    },
    {
      id: 'faq-4',
      question: 'मंदिरात जाण्यापूर्वी वेशभूषा आणि नियमांविषयी काय काळजी घ्यावी?',
      questionNative: 'मंदिरात जाण्यापूर्वी वेशभूषा आणि काय नियम पाळावेत?',
      answer: 'सभामंडपातून सामान्य दर्शनासाठी पारंपरिक शालीन कपडे (पुरुषांसाठी कुर्ता-पायजमा किंवा धोती, महिलांसाठी साडी किंवा सलवार-कमीज) घालावेत. थेट गर्भगृहात जाऊन स्पर्श दर्शन अथवा जलाभिषेक करण्यासाठी पुरुषांना सोवळे/धोतर (शर्ट किंवा बनियन न घालता) आणि महिलांना पारंपरिक साडी अनिवार्य आहे. गर्भगृहात लेदर बेल्ट, पाकीट व मोबाईल नेण्यास सक्त मनाई आहे.',
    },
    {
      id: 'faq-5',
      question: 'त्र्यंबकेश्वर यात्रेचे नियोजन किती दिवसांचे असावे?',
      questionNative: 'त्र्यंबकेश्वर यात्रेचे नियोजन कसे करावे?',
      answer: 'सामान्य दर्शनासाठी १ ते २ दिवस पुरेसे आहेत; ज्यात मुख्य मंदिर, कुशावर्त कुंड, ब्रह्मगिरी गंगाद्वार आणि संत निवृत्तीनाथ समाधी मंदिराचे दर्शन घेता येते. जर आपण ३ दिवसीय नारायण नागबळी विधी करणार असाल, तर त्र्यंबकेश्वरमध्ये किमान ४ दिवस व ३ रात्री मुक्कामाचे नियोजन करावे.',
    },
  ],
  hi: [
    {
      id: 'faq-1',
      question: 'त्र्यंबकेश्वर में पारंपरिक पूजा व अनुष्ठान कैसे बुक करें?',
      questionNative: 'त्र्यंबकेश्वर येथे पूजा कशी बुक करावी?',
      answer: 'आप अपनी आवश्यकतानुसार वांछित अनुष्ठान (जैसे नारायण नागबलि, त्रिपिंडी श्राद्ध, या रुद्राभिषेक) चुन सकते हैं। इसके बाद शुभ तिथि व अधिकृत वैदिक गुरुजी का चयन कर यजमान विवरण दर्ज करें। बुकिंग के पश्चात गुरुजी स्वयं आपसे संपर्क कर आवश्यक सामग्री, उपवास एवं नियमों की पूरी जानकारी देंगे।',
    },
    {
      id: 'faq-2',
      question: 'त्र्यंबकेश्वर धाम में कौन-कौन सी मुख्य पूजाएं संपन्न होती हैं?',
      questionNative: 'त्र्यंबकेश्वरमध्ये कोणकोणत्या मुख्य पूजा होतात?',
      answer: 'त्र्यंबकेश्वर में मुख्य रूप से नारायण नागबलि (पितृ दोष निवारण हेतु ३ दिवसीय विशेष विधान), त्रिपिंडी श्राद्ध (तीन पीढ़ियों की तृप्ति हेतु १ दिवसीय विधान), कालसर्प योग शांति, कुंभ विवाह, महामृत्युंजय महामंत्र जप एवं दैनिक रुद्राभिषेक परंपरागत वैदिक विधि से कराए जाते हैं।',
    },
    {
      id: 'faq-3',
      question: 'योग्य एवं अधिकृत पुरोहित जी का चयन कैसे करें?',
      questionNative: 'योग्य व अधिकृत गुरुजींची निवड कशी करावी?',
      answer: 'इस सेवा पोर्टल पर सूचीबद्ध सभी गुरुजी त्र्यंबक क्षेत्र की प्रामाणिक वैदिक परंपरा से जुड़े अधिकृत पुरोहित हैं, जिन्होंने शुक्ल यजुर्वेद व धर्मशास्त्र की विधिवत शिक्षा प्राप्त की है। आप उनकी प्रोफाइल, अनुभव, और भाषाओं (मराठी, हिंदी, गुजराती, अंग्रेजी) को देखकर चयन कर सकते हैं।',
    },
    {
      id: 'faq-4',
      question: 'मंदिर दर्शन हेतु वेशभूषा एवं आवश्यक नियम क्या हैं?',
      questionNative: 'मंदिरात जाण्यापूर्वी वेशभूषा आणि काय नियम पाळावेत?',
      answer: 'सभामंडप से सामान्य दर्शन हेतु मर्यादित पारंपरिक परिधान (पुरुषों के लिए कुर्ता-पायजामा या धोती, महिलाओं हेतु साड़ी या सलवार सूट) अनुशंसित है। गर्भगृह में प्रवेश कर स्वयं जलाभिषेक करने हेतु पुरुषों के लिए बिना सिला पारंपरिक सूती/रेशमी धोती (ऊपरी वस्त्र रहित) और महिलाओं के लिए पारंपरिक साड़ी अनिवार्य है। चमड़े की वस्तुएं व मोबाइल गर्भगृह में वर्जित हैं।',
    },
    {
      id: 'faq-5',
      question: 'त्र्यंबकेश्वर तीर्थ यात्रा का समय व योजना कैसे बनाएं?',
      questionNative: 'त्र्यंबकेश्वर यात्रेचे नियोजन कसे करावे?',
      answer: 'सामान्य दर्शन, कुशावर्त स्नान, ब्रह्मगिरी गंगाद्वार और संत निवृत्तिनाथ समाधि दर्शन हेतु १ से २ दिन पर्याप्त हैं। यदि आप ३ दिवसीय नारायण नागबलि अनुष्ठान में सम्मिलित हो रहे हैं, तो त्र्यंबक में न्यूनतम ४ दिन व ३ रात्रि के प्रवास की योजना बनाएं।',
    },
  ],
  sa: [
    {
      id: 'faq-1',
      question: 'त्र्यम्बकेश्वरे पारम्परिकपूजायाः पञ्जीकरणं कथं करणीयम्?',
      questionNative: 'त्र्यंबकेश्वर येथे पूजा कशी बुक करावी?',
      answer: 'भवन्तः स्वाभीष्टं विधानं (यथा नारायणनागबलिः, त्रिपिण्डीश्राद्धम्, रुद्राभिषेकः वा) चित्वा, शुभमुहूर्तम् अधिकृतपुरोहितञ्च वृत्वा यजमानविवरणं पूरयन्तु। तदनन्तरं गुरुवर्याः साक्षात् सम्पर्कं कृत्वा सर्वमार्गदर्शनं करिष्यन्ति।',
    },
    {
      id: 'faq-2',
      question: 'त्र्यम्बकेश्वरक्षेत्रे काः काः प्रमुखाः पूजाः भवन्ति?',
      questionNative: 'त्र्यंबकेश्वरमध्ये कोणकोणत्या मुख्य पूजा होतात?',
      answer: 'अत्र मुख्यतया नारायणनागबलिः (त्रिदिवसीयः पितृशान्तिविधिः), त्रिपिण्डीश्राद्धम्, कालसर्पशान्तिः, कुम्भविवाहः, महामृत्युञ्जयजपः, नित्यरुद्राभिषेकश्च शास्त्रोक्तविधिना सम्पद्यन्ते।',
    },
    {
      id: 'faq-3',
      question: 'प्रमाणितगुरुवर्याणां चयनं कथं कर्तव्यम्?',
      questionNative: 'योग्य व अधिकृत गुरुजींची निवड कशी करावी?',
      answer: 'अत्र सूचिताः सर्वेऽपि पुरोहिताः त्र्यम्बकक्षेत्रस्य अधिकृताः यजुर्वेदपारङ्गताः निष्ठावन्तः सन्ति। तेषां भाषानुभवं विशेषताञ्च दृष्ट्वा चयनं कर्तुं शक्यते।',
    },
    {
      id: 'faq-4',
      question: 'मन्दिरप्रवेशार्थं वेषभूषानियमाः के सन्ति?',
      questionNative: 'मंदिरात जाण्यापूर्वी वेशभूषा आणि काय नियम पाळावेत?',
      answer: 'सामान्यदर्शनाय पारम्परिकवस्त्राणि। गर्भगृहप्रवेशाय पुरुषाणां कृते असीवितं धौतवस्त्रम् (धोती), महिलानां कृते शाटिका (साड़ी) च अनिर्वार्या। चर्मवस्तूनि दूरवाणी च गर्भगृहे निषिद्धानि।',
    },
    {
      id: 'faq-5',
      question: 'त्र्यम्बकेश्वरयात्रायाः समयनियोजनं कथं कार्यम्?',
      questionNative: 'त्र्यंबकेश्वर यात्रेचे नियोजन कसे करावे?',
      answer: 'सामान्यदर्शनाय कुशावर्तस्नानाय च १-२ दिनानि पर्याप्तानि। नारायणनागबलिविधानार्थं त्र्यम्बके नगरे ४ दिनानां ३ रात्रीणाञ्च निवासः कर्तव्यः।',
    },
  ],
  gu: [
    {
      id: 'faq-1',
      question: 'ત્ર્યંબકેશ્વરમાં પરંપરાગત પૂજા કેવી રીતે બુક કરવી?',
      questionNative: 'ત્ર્યંબકેશ્વરમાં પૂજા કેવી રીતે બુક કરવી?',
      answer: 'તમે તમારી ઇચ્છિત પૂજા (જેમ કે નારાયણ નાગબલી, ત્રિપિંડી શ્રાદ્ધ અથવા રુદ્રાભિષેક) પસંદ કરી શકો છો, તમારી અનુકૂળતા મુજબ શુભ તારીખ અને અધિકૃત ગુરુજી પસંદ કરી વિગતો ભરો. બુકિંગ પછી ગુરુજી સીધો સંપર્ક કરી તમામ પૂજા સામગ્રી અને નિયમો સમજાવશે.',
    },
    {
      id: 'faq-2',
      question: 'ત્ર્યંબકેશ્વર ધામમાં કઈ કઈ મુખ્ય પૂજાઓ થાય છે?',
      questionNative: 'ત્ર્યંબકેશ્વરમાં કઈ કઈ પૂજાઓ થાય છે?',
      answer: 'અહીં મુખ્યત્વે નારાયણ નાગબલી (પિતૃદોષ નિવારણ માટે ૩ દિવસની વિશેષ પૂજા), ત્રિપિંડી શ્રાદ્ધ (૧ દિવસીય વિધિ), કાલસર્પ યોગ શાંતિ, કુંભ વિવાહ, મહામૃત્યુંજય જાપ અને દૈનિક રુદ્રાભિષેક શાસ્ત્રોક્ત પદ્ધતિથી થાય છે.',
    },
    {
      id: 'faq-3',
      question: 'યોગ્ય અને પ્રમાણિત ગુરુજીની પસંદગી કેવી રીતે કરવી?',
      questionNative: 'અધિકૃત ગુરુજીની પસંદગી કેવી રીતે કરવી?',
      answer: 'આ પોર્ટલ પરના તમામ ગુરુજી ત્ર્યંબક ક્ષેત્રના અધિકૃત વંશપરંપરાગત પુરોહિતો છે, જેમણે શુક્લ યજુર્વેદનું પદ્ધતિસરનું શિક્ષણ લીધું છે. તમે તેમની પ્રોફાઇલ, ભાષાઓ અને અનુભવ જોઈને પસંદગી કરી શકો છો.',
    },
    {
      id: 'faq-4',
      question: 'મંદિરમાં દર્શન માટે વસ્ત્રો અને નિયમો શું છે?',
      questionNative: 'દર્શન માટે વસ્ત્રો અને નિયમો શું છે?',
      answer: 'સામાન્ય દર્શન માટે પરંપરાગત શાલિન વસ્ત્રો પહેરવા. ગર્ભગૃહમાં જઈ જલાભિષેક કરવા માટે પુરુષોએ સોવળું/ધોતી અને સ્ત્રીઓએ સાડી પહેરવી ફરજિયાત છે. ગર્ભગૃહમાં ચામડાની વસ્તુઓ અને મોબાઈલ લઈ જવાની સખત મનાઈ છે.',
    },
    {
      id: 'faq-5',
      question: 'ત્ર્યંબકેશ્વર યાત્રાનું આયોજન કેટલા દિવસનું રાખવું?',
      questionNative: 'યાત્રાનું આયોજન કેટલા દિવસનું રાખવું?',
      answer: 'સામાન્ય દર્શન માટે ૧ થી ૨ દિવસ પૂરતા છે. જો તમે ૩ દિવસીય નારાયણ નાગબલી પૂજામાં ભાગ લઈ રહ્યા હોવ, તો ત્ર્યંબકમાં ઓછામાં ઓછા ૪ દિવસ અને ૩ રાત્રિના રોકાણનું આયોજન કરવું જોઈએ.',
    },
  ],
  te: [
    {
      id: 'faq-1',
      question: 'త్రయంబకేశ్వర్‌లో సాంప్రదాయ పూజను ఎలా బుక్ చేసుకోవాలి?',
      questionNative: 'పూజ ఎలా బుక్ చేసుకోవాలి?',
      answer: 'మీరు కోరుకున్న విధిని (నారాయణ నాగబలి, త్రిపిండి శ్రాద్ధం లేదా రుద్రాభిషేకం) ఎంచుకుని, అనుకూలమైన ముహూర్తం మరియు గుర్తింపు పొందిన వైదిక గురూజీని ఎంపిక చేసుకుని వివరాలు నమోదు చేయండి. ఆ తర్వాత గురూజీ స్వయంగా మిమ్మల్ని సంప్రదిస్తారు.',
    },
    {
      id: 'faq-2',
      question: 'త్రయంబకేశ్వర్ క్షేత్రంలో ఏయే ముఖ్యమైన పూజలు నిర్వహిస్తారు?',
      questionNative: 'ఏయే పూజలు జరుగుతాయి?',
      answer: 'ప్రధానంగా నారాయణ నాగబలి (పితృదోష నివారణకు 3 రోజుల పూజ), త్రిపిండి శ్రాద్ధం (1 రోజు పితృ కర్మ), కాలసర్ప యోగ శాంతి, కుంభ వివాహం, మహామృత్యుంజయ జపం మరియు నిత్య రుద్రాభిషేకాలు వేదోక్తంగా జరుగుతాయి.',
    },
    {
      id: 'faq-3',
      question: 'అనుభవజ్ఞులైన, ప్రామాణిక గురూజీని ఎలా ఎంచుకోవాలి?',
      questionNative: 'గురూజీని ఎలా ఎంచుకోవాలి?',
      answer: 'ఈ పోర్టల్‌లోని గురూజీలందరూ త్రయంబక్ వంశపారంపర్యంగా వస్తున్న అధికారిక వైదిక పండితులు. మీరు వారి ప్రొఫైల్, మాట్లాడే భాషలు (తెలుగు, మరాఠీ, హిందీ, ఇంగ్లీష్) మరియు అనుభవాన్ని బట్టి ఎంపిక చేసుకోవచ్చు.',
    },
    {
      id: 'faq-4',
      question: 'ఆలయ దర్శనానికి వస్త్రధారణ మరియు నిబంధనలు ఏమిటి?',
      questionNative: 'వస్త్రధారణ నిబంధనలు ఏమిటి?',
      answer: 'సాధారణ దర్శనానికి భారతీయ సంప్రదాయ దుస్తులు ధరించాలి. గర్భగుడిలోకి వెళ్లి స్వయంగా అభిషేకం చేయుటకు పురుషులు పంచె (ధోతి), మహిళలు చీర మాత్రమే ధరించాలి. తోలు వస్తువులు మరియు మొబైల్ ఫోన్లు గర్భగుడిలో అనుమతించబడవు.',
    },
    {
      id: 'faq-5',
      question: 'త్రయంబకేశ్వర్ యాత్రను ఎన్ని రోజులకు ప్రణాళిక చేసుకోవాలి?',
      questionNative: 'యాత్రా ప్రణాళిక ఎలా ఉండాలి?',
      answer: 'సాధారణ దర్శనం, కుశావవర్త స్నానం మరియు బ్రహ్మగిరి దర్శనానికి 1 నుండి 2 రోజులు సరిపోతాయి. 3 రోజుల నారాయణ నాగబలి పూజ చేసే భక్తులు కనీసం 4 రోజులు / 3 రాత్రులు త్రయంబక్‌లో బస చేయాలని సూచించడమైనది.',
    },
  ],
  kn: [
    {
      id: 'faq-1',
      question: 'ತ್ರ್ಯಂಬಕೇಶ್ವರದಲ್ಲಿ ಪೂಜೆ ಮತ್ತು ವಿಧಿಗಳನ್ನು ಹೇಗೆ ಬುಕ್ ಮಾಡುವುದು?',
      questionNative: 'ಪೂಜೆ ಹೇಗೆ ಬುಕ್ ಮಾಡುವುದು?',
      answer: 'ನಿಮ್ಮಿಷ್ಟದ ಪೂಜೆ (ನಾರಾಯಣ ನಾಗಬಲಿ, ತ್ರಿಪಿಂಡಿ ಶ್ರಾದ್ಧ ಅಥವಾ ರುದ್ರಾಭಿಷೇಕ) ಆಯ್ಕೆಮಾಡಿ, ಶುಭ ದಿನಾಂಕ ಮತ್ತು ಅಧಿಕೃತ ಪುರೋಹಿತರನ್ನು ಆಯ್ಕೆ ಮಾಡಿ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ. ನಂತರ ಗುರೂಜಿಯವರು ನೇರವಾಗಿ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತಾರೆ.',
    },
    {
      id: 'faq-2',
      question: 'ತ್ರ್ಯಂಬಕೇಶ್ವರದಲ್ಲಿ ಯಾವ ಮುಖ್ಯ ಪೂಜೆಗಳನ್ನು ಮಾಡಲಾಗುತ್ತದೆ?',
      questionNative: 'ಯಾವ ಪೂಜೆಗಳು ನಡೆಯುತ್ತವೆ?',
      answer: 'ಪ್ರಮುಖವಾಗಿ ನಾರಾಯಣ ನಾಗಬಲಿ (ಪಿತೃ ದೋಷಕ್ಕಾಗಿ 3 ದಿನಗಳ ಪೂಜೆ), ತ್ರಿಪಿಂಡಿ ಶ್ರಾದ್ಧ (1 ದಿನದ ಪಿತೃ ಕಾರ್ಯ), ಕಾಲಸರ್ಪ ಯೋಗ ಶಾಂತಿ, ಕುಂಭ ವಿವಾಹ, ಮಹಾಮೃತ್ಯುಂಜಯ ಜಪ ಮತ್ತು ದೈನಂದಿನ ರುದ್ರಾಭಿಷೇಕಗಳು ನಡೆಯುತ್ತವೆ.',
    },
    {
      id: 'faq-3',
      question: 'ಅಧಿಕೃತ ಮತ್ತು ಅನುಭವಿ ಗುರೂಜಿಯನ್ನು ಹೇಗೆ ಆಯ್ಕೆ ಮಾಡುವುದು?',
      questionNative: 'ಗುರೂಜಿಯನ್ನು ಹೇಗೆ ಆಯ್ಕೆ ಮಾಡುವುದು?',
      answer: 'ಈ ಪೋರ್ಟಲ್‌ನಲ್ಲಿರುವ ಎಲ್ಲಾ ಗುರೂಜಿಗಳು ತ್ರ್ಯಂಬಕ ಕ್ಷೇತ್ರದ ಪರಂಪರಾಗತ ಅಧಿಕೃತ ಪುರೋಹಿತರು. ಅವರ ಪ್ರೊಫೈಲ್, ಭಾಷೆಗಳು (ಕನ್ನಡ, ಮರಾಠಿ, ಹಿಂದಿ, ಇಂಗ್ಲಿಷ್) ಮತ್ತು ಅನುಭವವನ್ನು ಪರಿಶೀಲಿಸಿ ಆಯ್ಕೆ ಮಾಡಬಹುದು.',
    },
    {
      id: 'faq-4',
      question: 'ದೇಗುಲ ದರ್ಶನಕ್ಕೆ ವಸ್ತ್ರಸಂಹಿತೆ ಮತ್ತು ನಿಯಮಗಳೇನು?',
      questionNative: 'ವಸ್ತ್ರಸಂಹಿತೆ ನಿಯಮಗಳೇನು?',
      answer: 'ಸಾಮಾನ್ಯ ದರ್ಶನಕ್ಕೆ ಸಾಂಪ್ರದಾಯಿಕ ಉಡುಪುಗಳು. ಗರ್ಭಗುಡಿಯ ಪ್ರವೇಶ ಮತ್ತು ಅಭಿಷೇಕಕ್ಕೆ ಪುರುಷರು ಧೋತಿ/ಶಲ್ಯ ಮತ್ತು ಮಹಿಳೆಯರು ಸೀರೆಯನ್ನು ಕಡ್ಡಾಯವಾಗಿ ಧರಿಸಬೇಕು. ಚರ್ಮದ ವಸ್ತುಗಳು ಮತ್ತು ಮೊಬೈಲ್‌ಗಳನ್ನು ಗರ್ಭಗುಡಿಯಲ್ಲಿ ನಿಷೇಧಿಸಲಾಗಿದೆ.',
    },
    {
      id: 'faq-5',
      question: 'ತ್ರ್ಯಂಬಕೇಶ್ವರ ಪ್ರವಾಸವನ್ನು ಎಷ್ಟು ದಿನಗಳಿಗೆ ಯೋಜಿಸಬೇಕು?',
      questionNative: 'ಪ್ರವಾಸ ಯೋಜನೆ ಹೇಗಿರಬೇಕು?',
      answer: 'ಸಾಮಾನ್ಯ ದರ್ಶನಕ್ಕಾಗಿ 1 ರಿಂದ 2 ದಿನಗಳು ಸಾಕು. ನಾರಾಯಣ ನಾಗಬಲಿ ಪೂಜೆ ಮಾಡುವವರು ಕನಿಷ್ಠ 4 ದಿನಗಳು ಮತ್ತು 3 ರಾತ್ರಿಗಳ ಕಾಲ ತ್ರ್ಯಂಬಕದಲ್ಲಿ ಉಳಿಯಲು ಯೋಜಿಸಬೇಕು.',
    },
  ],
  ta: [
    {
      id: 'faq-1',
      question: 'திரிம்பகேஷ்வரில் பூஜையை எவ்வாறு முன்பதிவு செய்வது?',
      questionNative: 'பூஜை முன்பதிவு செய்வது எப்படி?',
      answer: 'நீங்கள் செய்ய விரும்பும் சடங்கை (நாராயண நாகபலி, திரிபிண்டி சிராத்தம் அல்லது ருத்ராபிஷேகம்) தேர்வு செய்து, சுப முகூர்த்த நாள் மற்றும் அங்கீகரிக்கப்பட்ட குருஜியைத் தேர்ந்தெடுத்து விவரங்களைப் பதிவு செய்யவும். குருஜி உங்களை நேரடியாகத் தொடர்புகொள்வார்.',
    },
    {
      id: 'faq-2',
      question: 'திரிம்பகேஷ்வரில் செய்யப்படும் முக்கிய வழிபாடுகள் யாவை?',
      questionNative: 'என்னென்ன பூஜைகள் நடைபெறும்?',
      answer: 'நாராயண நாகபலி (பித்ரு தோஷ நிவர்த்திக்கான 3 நாள் சடங்கு), திரிபிண்டி சிராத்தம் (1 நாள் பித்ரு தர்ப்பணம்), காலசர்ப்ப தோஷ சாந்தி, கும்ப விவாகம், மகா மிருத்யுஞ்சய ஜபம் மற்றும் தினசரி ருத்ராபிஷேகம் ஆகியவை முக்கிய சடங்குகளாகும்.',
    },
    {
      id: 'faq-3',
      question: 'அங்கீகரிக்கப்பட்ட குருஜியை எவ்வாறு தேர்வு செய்வது?',
      questionNative: 'குருஜியைத் தேர்ந்தெடுப்பது எப்படி?',
      answer: 'இத்தளத்தில் உள்ள அனைத்து குருஜிகளும் திரிம்பக் பரம்பரை வேத பண்டிதர்கள். அவர்களின் சுயவிவரம், பேசும் மொழிகள் (தமிழ், மராத்தி, இந்தி, ஆங்கிலம்) மற்றும் அனுபவத்தைப் பார்த்து நீங்கள் தேர்வு செய்யலாம்.',
    },
    {
      id: 'faq-4',
      question: 'கோயில் தரிசனத்திற்கான ஆடைக்கட்டுப்பாடு மற்றும் விதிகள் யாவை?',
      questionNative: 'ஆடைக்கட்டுப்பாடு விதிகள் யாவை?',
      answer: 'பொது தரிசனத்திற்கு பாரம்பரிய ஆடைகள். கருவறையில் அபிஷேகம் செய்ய ஆண்கள் வேட்டி மட்டுமே அணிய வேண்டும் (சட்டை அணியக்கூடாது), பெண்கள் பாரம்பரிய புடவை அணிய வேண்டும். தோல் பொருட்கள் மற்றும் செல்போன்களுக்கு அனுமதியில்லை.',
    },
    {
      id: 'faq-5',
      question: 'திரிம்பகேஷ்வர யாத்திரையை எத்தனை நாட்களுக்கு திட்டமிட வேண்டும்?',
      questionNative: 'பயணத் திட்டம் எத்தனை நாட்கள்?',
      answer: 'பொது தரிசனம் மற்றும் பிரம்மகிரி மலையேற்றத்திற்கு 1 முதல் 2 நாட்கள் போதுமானது. 3 நாள் நாராயண நாகபலி பூஜை செய்வோர் குறைந்தது 4 நாட்கள் / 3 இரவுகள் தங்க திட்டமிட வேண்டும்.',
    },
  ],
  bn: [
    {
      id: 'faq-1',
      question: 'ত্র্যম্বকেশ্বরে ঐতিহ্যবাহী পূজা কীভাবে বুক করবেন?',
      questionNative: 'পূজা কীভাবে বুক করবেন?',
      answer: 'আপনার প্রয়োজনীয় পূজা (নারায়ণ নাগবলি, ত্রিপিন্ডী শ্রাদ্ধ বা রুদ্রাভিষেক) নির্বাচন করুন, শুভ তিথি ও অনুমোদিত বৈদিক পুরোহিত বেছে নিয়ে বিবরণ পূরণ করুন। বুকিংয়ের পর গুরুজী সরাসরি যোগাযোগ করে সব নিয়ম বুঝিয়ে দেবেন।',
    },
    {
      id: 'faq-2',
      question: 'ত্র্যম্বকেশ্বর ধামে প্রধানত কোন কোন পূজা অনুষ্ঠিত হয়?',
      questionNative: 'কোন কোন পূজা হয়?',
      answer: 'এখানে মূলত নারায়ণ নাগবলি (পিতৃদোষ শান্তির ৩ দিনের বিশেষ বিধি), ত্রিপিন্ডী শ্রাদ্ধ (১ দিনের পিতৃকর্ম), কালসর্প যোগ শান্তি, কুম্ভ বিবাহ, মহামৃত্যুঞ্জয় জপ এবং প্রাত্যহিক রুদ্রাভিষেক শাস্ত্রীয় মতে অনুষ্ঠিত হয়।',
    },
    {
      id: 'faq-3',
      question: 'অভিজ্ঞ ও যাচাইকৃত পুরোহিত কীভাবে বেছে নেবেন?',
      questionNative: 'পুরোহিত কীভাবে বেছে নেবেন?',
      answer: 'এই পোর্টালে তালিকাভুক্ত সকল পুরোহিত ত্র্যম্বক ক্ষেত্রের স্বীকৃত বংশপরম্পরাগত বৈদিক পণ্ডিত। আপনি তাঁদের প্রোফাইল, ভাষা ও অভিজ্ঞতা যাচাই করে নির্বাচন করতে পারেন।',
    },
    {
      id: 'faq-4',
      question: 'মন্দিরে দর্শনের জন্য পোশাকের নিয়মাবলি কী?',
      questionNative: 'পোশাকের নিয়ম কী?',
      answer: 'সাধারণ দর্শনের জন্য শালীন ঐতিহ্যবাহী পোশাক। গর্ভগৃহে প্রবেশ ও জলাভিষেকের জন্য পুরুষদের ধুতি এবং মহিলাদের শাড়ি পরিধান বাধ্যতামূলক। গর্ভগৃহে চামড়ার দ্রব্য ও মোবাইল ফোন নিষিদ্ধ।',
    },
    {
      id: 'faq-5',
      question: 'ত্র্যম্বকেশ্বর যাত্রার সময়সূচি কীভাবে পরিকল্পনা করবেন?',
      questionNative: 'যাত্রার পরিকল্পনা কেমন হওয়া উচিত?',
      answer: 'সাধারণ দর্শন, কুশাবর্ত স্নান ও ব্রহ্মগিরি ভ্রমণের জন্য ১ থেকে ২ দিন যথেষ্ট। ৩ দিনের নারায়ণ নাগবলি পূজার ক্ষেত্রে ত্র্যম্বকেশ্বরে ন্যূনতম ৪ দিন ও ৩ রাত থাকার পরিকল্পনা করা উচিত।',
    },
  ],
  or: [
    {
      id: 'faq-1',
      question: 'ତ୍ର୍ୟମ୍ବକେଶ୍ୱରରେ ପାରମ୍ପରିକ ପୂଜା କିପରି ବୁକ୍ କରିବେ?',
      questionNative: 'ପୂଜା କିପରି ବୁକ୍ କରିବେ?',
      answer: 'ଆପଣ ନିଜ ପସନ୍ଦର ପୂଜା (ନାରାୟଣ ନାଗବଳି, ତ୍ରିପିଣ୍ଡୀ ଶ୍ରାଦ୍ଧ କିମ୍ବା ରୁଦ୍ରାଭିଷେକ) ଚୟନ କରି, ଶୁଭ ତିଥି ଓ ଅଧିକୃତ ଗୁରୁଜୀଙ୍କୁ ବାଛି ବିବରଣୀ ପ୍ରଦାନ କରନ୍ତୁ। ଏହାପରେ ଗୁରୁଜୀ ସିଧାସଳଖ ଆପଣଙ୍କ ସହିତ ଯୋଗାଯୋଗ କରିବେ।',
    },
    {
      id: 'faq-2',
      question: 'ତ୍ର୍ୟମ୍ବକେଶ୍ୱର କ୍ଷେତ୍ରରେ କେଉଁ କେଉଁ ମୁଖ୍ୟ ପୂଜା ଅନୁଷ୍ଠିତ ହୁଏ?',
      questionNative: 'କେଉଁ କେଉଁ ପୂଜା ହୁଏ?',
      answer: 'ପ୍ରମୁଖ ଭାବେ ନାରାୟଣ ନାଗବଳି (ପିତୃଦୋଷ ନିବାରଣ ପାଇଁ ୩ ଦିନର ପୂଜା), ତ୍ରିପିଣ୍ଡୀ ଶ୍ରାଦ୍ଧ, କାଳସର୍ପ ଯୋଗ ଶାନ୍ତି, କୁମ୍ଭ ବିବାହ, ମହାମୃତ୍ୟୁଞ୍ଜୟ ଜପ ଓ ଦୈନିକ ରୁଦ୍ରାଭିଷେକ ବୈଦିକ ରୀତିରେ ସମ୍ପନ୍ନ ହୁଏ।',
    },
    {
      id: 'faq-3',
      question: 'ଅଭିଜ୍ଞ ଓ ଅଧିକୃତ ଗୁରୁଜୀଙ୍କୁ କିପରି ଚୟନ କରିବେ?',
      questionNative: 'ଗୁରୁଜୀ କିପରି ବାଛିବେ?',
      answer: 'ଏହି ପୋର୍ଟାଲରେ ଥିବା ସମସ୍ତ ଗୁରୁଜୀ ତ୍ର୍ୟମ୍ବକ କ୍ଷେତ୍ରର ବଂଶାନୁକ୍ରମିକ ପ୍ରାମାଣିକ ବୈଦିକ ପୁରୋହିତ। ଆପଣ ସେମାନଙ୍କ ପ୍ରୋଫାଇଲ୍, ଭାଷା ଓ ଅନୁଭବ ଦେଖି ଚୟନ କରିପାରିବେ।',
    },
    {
      id: 'faq-4',
      question: 'ମନ୍ଦିର ଦର୍ଶନ ପାଇଁ ବସ୍ତ୍ର ନିୟମ ଓ ନୀତି କ’ଣ?',
      questionNative: 'ବସ୍ତ୍ର ନିୟମ କ’ଣ?',
      answer: 'ସାଧାରଣ ଦର୍ଶନ ପାଇଁ ଭାରତୀୟ ପାରମ୍ପରିକ ବସ୍ତ୍ର। ଗର୍ଭଗୃହ ପ୍ରବେଶ ଓ ଅଭିଷେକ ପାଇଁ ପୁରୁଷମାନଙ୍କ ପାଇଁ ଧୋତି ଏବଂ ମହିଳାମାନଙ୍କ ପାଇଁ ଶାଢ଼ୀ ବାଧ୍ୟତାମୂଳକ। ଗର୍ଭଗୃହ ଭିତରକୁ ଚମଡ଼ା ଜିନିଷ ଓ ମୋବାଇଲ୍ ବାରଣ।',
    },
    {
      id: 'faq-5',
      question: 'ତ୍ର୍ୟମ୍ବକେଶ୍ୱର ଯାତ୍ରା କେତେ ଦିନ ପାଇଁ ଯୋଜନା କରିବା ଉଚିତ୍?',
      questionNative: 'ଯାତ୍ରା ଯୋଜନା କେତେ ଦିନର ହେବ?',
      answer: 'ସାଧାରଣ ଦର୍ଶନ ପାଇଁ ୧ ରୁ ୨ ଦିନ ଯଥେଷ୍ଟ। ୩ ଦିନର ନାରାୟଣ ନାଗବଳି ପୂଜା କରୁଥିବା ଶ୍ରଦ୍ଧାଳୁମାନେ ଅତି କମରେ ୪ ଦିନ ଓ ୩ ରାତି ତ୍ର୍ୟମ୍ବକେଶ୍ୱରରେ ରହିବା ଯୋଜନା କରିବା ଉଚିତ୍।',
    },
  ],
};

// -------------------------------------------------------------
// Helper accessors with safe fallbacks
// -------------------------------------------------------------
export function getGurujiSectionData(lang: SupportedLanguage): GurujiSectionData {
  return GURUJI_SECTION_TRANSLATIONS[lang] || GURUJI_SECTION_TRANSLATIONS.en;
}

export function getSacredPlacesData(lang: SupportedLanguage): SacredPlaceData[] {
  return SACRED_PLACES_DATA[lang] || SACRED_PLACES_DATA.en;
}

export function getStoryChaptersData(lang: SupportedLanguage): StoryChapterData[] {
  return STORY_CHAPTERS_DATA[lang] || STORY_CHAPTERS_DATA.en;
}

export function getFestivalsData(lang: SupportedLanguage): FestivalData[] {
  return FESTIVALS_DATA[lang] || FESTIVALS_DATA.en;
}

export function getDarshanTimingsData(lang: SupportedLanguage): DarshanTimingData[] {
  return DARSHAN_TIMINGS_DATA[lang] || DARSHAN_TIMINGS_DATA.en;
}

export function getDarshanGuidelinesData(lang: SupportedLanguage): DarshanGuidelinesData {
  return DARSHAN_GUIDELINES_DATA[lang] || DARSHAN_GUIDELINES_DATA.en;
}

export function getHowToReachData(lang: SupportedLanguage): HowToReachData {
  return HOW_TO_REACH_DATA[lang] || HOW_TO_REACH_DATA.en;
}

export function getDevoteeReviewsData(lang: SupportedLanguage): DevoteeReviewData[] {
  return DEVOTEE_REVIEWS_DATA[lang] || DEVOTEE_REVIEWS_DATA.en;
}

export function getFaqsData(lang: SupportedLanguage): FaqData[] {
  return FAQS_DATA[lang] || FAQS_DATA.en;
}
