import { PujaItem, GurujiItem, SacredPlace, FestivalItem, ArticleItem, FaqItem, DarshanTiming, GalleryItem } from '../types';
import { ARTICLES_DATA } from './articlesData';
import { GALLERY_DATA } from './galleryData';

export const PUJA_LIST: PujaItem[] = [
  {
    id: 'narayan-nagbali',
    slug: 'narayan-nagbali',
    sanskritName: 'नारायण नागबळी विधानम्',
    name: 'Narayan Nagbali',
    marathiName: 'नारायण नागबळी',
    tagline: 'Traditional sacred rite for Pitru dosha and ancestral peace',
    description: 'A deeply revered Vedic ritual unique to Trimbakeshwar, performed over three days. It combines Narayan Bali and Nagbali vidhis as prescribed in the Garuda Purana and Dharma Sindhu, dedicated to seeking peace for departed ancestors and resolution of spiritual obstacles.',
    significance: 'Mentioned in traditional Shastras as a comprehensive observance dedicated to Lord Vishnu and Lord Shiva, traditionally performed at the holy Kushavarta Tirtha and Ahilya Sangam.',
    duration: '3 Days (Full rituals)',
    recommendedTime: 'Morning (06:00 AM to 01:00 PM)',
    samagriProvided: true,
    image: '/assets/trimbak/narayan-nagbali.webp',
    imageUrl: '/assets/trimbak/narayan-nagbali.webp',
    category: 'Pitru Vidhi',
    suggestedPurohitCount: 2,
    traditionalObservance: 'Devotees observe fasting and perform Sankalp at Kushavarta Kund according to Vedic procedures.',
  },
  {
    id: 'tripindi-shraddha',
    slug: 'tripindi-shraddha',
    sanskritName: 'त्रिपिंडी श्राद्ध प्रयोगः',
    name: 'Tripindi Shraddha',
    marathiName: 'त्रिपिंडी श्राद्ध',
    tagline: 'Vedic remembrance and peace for previous three generations of ancestors',
    description: 'A traditional Pitru ritual performed with devotion and Vedic guidance to offer peace to departed souls of three generations (father, grandfather, great-grandfather lines). The vidhi invokes Brahma, Vishnu, and Rudra with wheat, rice, and black sesame pinda offerings.',
    significance: 'Performed to bring spiritual harmony, family tranquility, and auspicious blessings by satisfying ancestral debts as described in Shraddha Mayukha.',
    duration: '1 Day (approx. 3-4 hours)',
    recommendedTime: 'Auspicious Pitru hours (08:00 AM)',
    samagriProvided: true,
    image: '/assets/trimbak/tripindi-shraddha.webp',
    imageUrl: '/assets/trimbak/tripindi-shraddha.webp',
    category: 'Pitru Vidhi',
    suggestedPurohitCount: 1,
    traditionalObservance: 'Performed on Amavasya, Ashtami, Ekadashi, or during Pitru Paksha for maximum spiritual merit.',
  },
  {
    id: 'kaal-sarp-shanti',
    slug: 'kaal-sarp-shanti',
    sanskritName: 'कालसर्प योग शान्ति विधानम्',
    name: 'Kaal Sarp Yog Shanti',
    marathiName: 'कालसर्प योग शांती',
    tagline: 'Traditional Vedic Shanti ritual for astrological planetary harmony',
    description: 'A specialized Shanti Anushthan rooted in traditional Vedic Jyotish lore. Involves Rahu-Ketu mantra chanting, Nag-Nagin silver idol worship, Navagraha homa, and Rudra Japa in the sacred Kshetra of Mahadev.',
    significance: 'Devotees traditionally undertake this Shanti seeking mental peace, focus, harmony in personal endeavors, and relief from perceived delays.',
    duration: '1 Day (approx. 2.5-3 hours)',
    recommendedTime: 'Morning or Noon session',
    samagriProvided: true,
    image: '/assets/trimbak/kaal-sarp-shanti.webp',
    imageUrl: '/assets/trimbak/kaal-sarp-shanti.webp',
    category: 'Shanti Vidhi',
    suggestedPurohitCount: 1,
    traditionalObservance: 'Devotees wear traditional unstitched attire (Dhoti / Saree) as per temple customs.',
  },
  {
    id: 'kumbh-vivah',
    slug: 'kumbh-vivah',
    sanskritName: 'कुम्भ विवाह संस्कारः',
    name: 'Kumbh Vivah',
    marathiName: 'कुंभ विवाह',
    tagline: 'Traditional astrological remedy and Vedic ritual before marriage',
    description: 'An ancient symbolic ritual performed with a sacred clay pot (Kumbha) representing Lord Vishnu. Performed according to prescribed scriptures for individuals with Manglik or planetary configurations before wedding ceremonies.',
    significance: 'Conducted under the divine presence of Trimbakeshwar Mahadev to invoke harmony, marital bliss, and spiritual protection for married life.',
    duration: '1 Day (approx. 2-3 hours)',
    recommendedTime: 'Shubh Muhurat morning',
    samagriProvided: true,
    image: '/assets/trimbak/kumbh-vivah.webp',
    imageUrl: '/assets/trimbak/kumbh-vivah.webp',
    category: 'Vivah',
    suggestedPurohitCount: 1,
    traditionalObservance: 'Accompanied by Vishnu Sahasranama chanting and auspicious Mangal Aarti.',
  },
  {
    id: 'maha-mrityunjaya-jaap',
    slug: 'maha-mrityunjaya-jaap',
    sanskritName: 'महामृत्युञ्जय मन्त्र अनुष्ठानम्',
    name: 'Maha Mrityunjaya Jaap',
    marathiName: 'महामृत्युंजय मंत्र जप',
    tagline: 'Sacred Rigvedic chanting dedicated to Bhagwan Shiva for health and longevity',
    description: 'Intense Vedic Anushthan of the supreme healing mantra (ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्). Carried out by initiated Vedic scholars with precise samputa, nyasa, and havan at the sacred foot of Brahmagiri.',
    significance: 'Revered as the ultimate invocation for physical vitality, mental fortitude, protection from untimely distress, and profound spiritual peace.',
    duration: '1 to 3 Days (21,000 to 1,25,000 Japa count)',
    recommendedTime: 'Brahma Muhurat & Morning hours',
    samagriProvided: true,
    image: '/assets/trimbak/maha-mrityunjaya-jaap.webp',
    imageUrl: '/assets/trimbak/maha-mrityunjaya-jaap.webp',
    category: 'Anushthan',
    suggestedPurohitCount: 3,
    traditionalObservance: 'Chanted with pure ghee lamp, bilva patra offerings, and sacred cow milk abhishek.',
  },
  {
    id: 'rudrabhishek',
    slug: 'rudrabhishek',
    sanskritName: 'श्री रुद्राभिषेक पूजा',
    name: 'Rudrabhishek',
    marathiName: 'रुद्राभिषेक',
    tagline: 'Traditional Abhisheka of Mahadev with Shukla Yajurveda Rudrashtadhyayi',
    description: 'The premier devotional Shiva worship where continuous sacred libations (Panchamrit, holy Godavari jal, sugarcane juice, and bhasma) are offered while Purohits chant Sri Rudram and Chamakam from the Vedic canons.',
    significance: 'Purifies inner thoughts, radiates positive cosmic vibrations into the family, and invites Lord Trimbakeshwar’s divine grace.',
    duration: 'approx. 1.5 to 2 hours',
    recommendedTime: 'Early Morning (06:00 AM - 10:00 AM)',
    samagriProvided: true,
    image: '/assets/trimbak/rudrabhishek.webp',
    imageUrl: '/assets/trimbak/rudrabhishek.webp',
    category: 'Abhishek',
    suggestedPurohitCount: 1,
    traditionalObservance: 'Performed on Mondays, Pradosham, Shivratri, or any auspicious date with family Sankalp.',
  },
];

export const GURUJI_LIST: GurujiItem[] = [
  {
    id: 'guruji-1',
    name: 'Pt. Vidyadhar Shastri Dixit',
    title: 'Senior Vedic Purohit & Jyotishacharya',
    titleNative: 'पं. श्री विद्याधर शास्त्री दीक्षित गुरुजी',
    experienceYears: 28,
    languages: ['Marathi', 'Hindi', 'English', 'Sanskrit'],
    specialties: ['Narayan Nagbali', 'Tripindi Shraddha', 'Rudrabhishek'],
    education: 'Ved Murti, Sampurnanand Sanskrit Vishwavidyalaya',
    avatar: '/assets/trimbak/guruji-1.jpg',
    rating: 4.9,
    reviewCount: 412,
    bio: 'Preserving four generations of Purohit seva in Trimbakeshwar. Guided thousands of Yajmans through authentic Garuda Purana procedures with absolute devotion and transparency.',
    purohitParampara: 'Trimbak Kshetra Purohit Sangh (Verified Representative)',
  },
  {
    id: 'guruji-2',
    name: 'Pt. Onkarnath Joshi Guruji',
    title: 'Vedic Ritual Specialist & Anushthan Acharya',
    titleNative: 'पं. श्री ओंकारनाथ जोशी गुरुजी',
    experienceYears: 22,
    languages: ['Marathi', 'Hindi', 'Gujarati', 'English'],
    specialties: ['Kaal Sarp Shanti', 'Maha Mrityunjaya Jaap', 'Navagraha Homa'],
    education: 'Shukla Yajurveda Acharya, Nashik Veda Pathashala',
    avatar: '/assets/trimbak/guruji-2.jpg',
    rating: 4.95,
    reviewCount: 320,
    bio: 'Specialist in astrological Shanti vidhis and Vedic Japa Anushthans. Known for patient explanations of ritual significance to devotees from Gujarat, Maharashtra, and North India.',
    purohitParampara: 'Yajurvediya Shakha Guruji (Verified Representative)',
  },
  {
    id: 'guruji-3',
    name: 'Pt. Bhalchandra Shukla Guruji',
    title: 'Dharma Shastra Scholar & Pitru Vidhi Purohit',
    titleNative: 'पं. श्री भालचंद्र शुक्ल गुरुजी',
    experienceYears: 25,
    languages: ['Marathi', 'Hindi', 'Bengali', 'Sanskrit'],
    specialties: ['Tripindi Shraddha', 'Narayan Nagbali', 'Kumbh Vivah'],
    education: 'Shastri in Dharma Shastra & Mimamsa',
    avatar: '/assets/trimbak/guruji-3.jpg',
    rating: 4.88,
    reviewCount: 285,
    bio: 'Deep expertise in ancestral peace rituals and Kumbh Vivah sacraments. Dedicated to maintaining flawless Vedic purity, personal Sankalp recitations, and devotee comfort.',
    purohitParampara: 'Heritage Trimbak Purohit Lineage (Verified Representative)',
  },
  {
    id: 'guruji-4',
    name: 'Pt. Dnyaneshwar Kulkarni Guruji',
    title: 'Shaiva Agama Acharya & Rudra Purohit',
    titleNative: 'पं. श्री ज्ञानेश्वर कुलकर्णी गुरुजी',
    experienceYears: 19,
    languages: ['Marathi', 'Hindi', 'Kannada', 'English'],
    specialties: ['Laghu Rudra', 'Maha Rudrabhishek', 'Vastu Shanti'],
    education: 'Veda Vibhushan, Pune Sanskrit Adhyayan Kendra',
    avatar: '/assets/trimbak/guruji-4.jpg',
    rating: 4.92,
    reviewCount: 218,
    bio: 'Expert in Shivopasana and consecrated chanting of Vedic Rudram hymns. Conducts morning temple abhishek and customized homams with peaceful cadence.',
    purohitParampara: 'Shaiva Tradition Purohit (Verified Representative)',
  },
];

export const SACRED_PLACES: SacredPlace[] = [
  {
    id: 'trimbakeshwar-mandir',
    name: 'Shri Trimbakeshwar Temple',
    nativeName: 'त्र्यंबकेश्वर मंदिर',
    distanceFromTemple: 'Center of Kshetra',
    significance: 'The core 12th-century black basalt Jyotirlinga temple built by Peshwa Nana Saheb.',
    description: 'Masterpiece of Hemadpanthi architecture featuring intricate stone carvings, the holy sanctum enshrining the three-faced linga, and majestic Sabha Mandap surrounded by high stone ramparts.',
    image: '/assets/trimbak/trimbakeshwar-temple.webp',
    timings: '05:30 AM - 09:00 PM',
  },
  {
    id: 'kushavarta-tirtha',
    name: 'Kushavarta Tirtha (Kund)',
    nativeName: 'कुशावर्त तीर्थ',
    distanceFromTemple: '400 meters (5 min walk)',
    significance: 'The sacred pond where Rishi Gautama stopped and consecrated the holy river Godavari.',
    description: 'All Vedic rituals including Narayan Nagbali begin with a sacred holy dip (Snaan) here. Built with grand stone ghats and pillared pavilions, it is revered as the gateway of spiritual purification.',
    image: '/assets/trimbak/kushavarta-tirtha.webp',
    timings: 'Open all day for Snan',
  },
  {
    id: 'brahmagiri-parvat',
    name: 'Brahmagiri Mountain',
    nativeName: 'ब्रह्मगिरी पर्वत',
    distanceFromTemple: '1 km to base (approx. 750 stone steps)',
    significance: 'The physical mountain form of Lord Shiva and original source of the Godavari river.',
    description: 'Towering majestic fortress mountain in the Western Ghats. Climbing its stone-cut steps leads to Gangadwar, cave shrines, ancient viewpoints, and lush Sahyadri mist.',
    image: '/assets/trimbak/brahmagiri-parvat.webp',
    elevation: '1,295 meters',
  },
  {
    id: 'gangadwar',
    name: 'Gangadwar',
    nativeName: 'गंगाद्वार',
    distanceFromTemple: 'Brahmagiri halfway point (approx. 45 min climb)',
    significance: 'Where the river Godavari first emerges from the mouth of a stone Nandi cow.',
    description: 'Devotees climb up to receive the first drops of Gautami Ganga water. Nearby lies the revered shrine of Sage Gautama and Mother Ahilya.',
    image: '/assets/trimbak/gangadwar.webp',
    timings: '06:00 AM - 06:00 PM',
  },
  {
    id: 'kedareshwar',
    name: 'Kedareshwar Temple',
    nativeName: 'केदारेश्वर',
    distanceFromTemple: '1.5 km towards Brahmagiri',
    significance: 'Ancient cave temple dedicated to Lord Shiva in an undisturbed natural alcove.',
    description: 'A deeply serene sanctuary surrounded by waterfalls during monsoon, where yogis and pilgrims contemplate in meditative stillness.',
    image: '/assets/trimbak/kedareshwar.webp',
    timings: '06:00 AM - 07:00 PM',
  },
  {
    id: 'nivruttinath-samadhi',
    name: 'Sant Nivruttinath Maharaj Samadhi',
    nativeName: 'संत निवृत्तिनाथ महाराज समाधी',
    distanceFromTemple: '1.2 km from Main Temple',
    significance: 'Sanjeevan Samadhi of elder brother and Guru of Sant Dnyaneshwar Maharaj.',
    description: 'One of the most sacred pilgrimage centers of the Varkari tradition in Maharashtra. The temple radiates profound devotional quietude and Abhang chanting.',
    image: '/assets/trimbak/nivruttinath-samadhi.webp',
    timings: '05:00 AM - 09:30 PM',
  },
  {
    id: 'anjaneri-parvat',
    name: 'Anjaneri Hill',
    nativeName: 'अंजनेरी पर्वत',
    distanceFromTemple: '7 km from Trimbakeshwar',
    significance: 'Revered in Sanatan tradition as the sacred birthplace of Lord Hanumanji.',
    description: 'Named after Mata Anjani, this spectacular mountain plateau features historic rock-cut temples, Jain caves, and trekking routes with breathtaking views of Nashik valley.',
    image: '/assets/trimbak/anjaneri-parvat.webp',
    elevation: '1,280 meters',
  },
  {
    id: 'saptashrungi-gad',
    name: 'Shree Saptashrungi Nivasini Devi',
    nativeName: 'सप्तशृंगी देवी (वणी)',
    distanceFromTemple: '65 km (convenient day trip)',
    significance: 'One of the three-and-a-half Shakti Peethas of Maharashtra (Ardha Shaktipeeth).',
    description: 'Enshrined atop seven majestic mountain peaks (Sapta-shringa), the monumental 8-foot-tall Swayambhu idol of Mahishasuramardini has 18 arms holding divine weapons.',
    image: '/assets/trimbak/saptashrungi-gad.webp',
    timings: '05:00 AM - 09:00 PM',
  },
];

export const TEMPLE_STORY_CHAPTERS = [
  {
    chapter: '01',
    titleNative: 'ब्रह्मगिरी पर्वत',
    titleEng: 'Brahmagiri Parvat: The Mountain of Mahadev',
    content: 'According to ancient Hindu scriptures, Lord Brahma performed a profound penance on this majestic Sahyadri mountain to seek the divine darshan of Lord Shiva. Pleased with his devotion, Shiva manifested and proclaimed that the mountain itself would forever embody his sacred presence.',
    quote: '॥ सह्याद्रिशीर्षे विमले वसन्तं ॥',
    image: '/assets/trimbak/brahmagiri-parvat.webp',
  },
  {
    chapter: '02',
    titleNative: 'महर्षि गौतम आणि गोदावरी अवतरण',
    titleEng: 'Gautam Rishi & The Descent of Sacred Godavari',
    content: 'During a prolonged famine in Danda-karanya, Maharishi Gautama engaged in intense meditation and righteous cultivation. After an unintended mishap involving a cow made of darba grass, the sage performed severe penance. Compassionate Shiva untied his matted locks, allowing the celestial river Ganga to descend on Brahmagiri, which came to be venerated as Gautami Godavari.',
    quote: '॥ गोदावरीतीरपवित्रदेशे ॥',
    image: '/assets/trimbak/kushavarta-tirtha.webp',
  },
  {
    chapter: '03',
    titleNative: 'त्र्यंबकेश्वर ज्योतिर्लिंग प्राकट्य',
    titleEng: 'The Manifestation of Trinity in One Sacred Linga',
    content: 'At the fervent prayer of Sage Gautama, Mother Godavari, and all the Devas, Lord Shiva agreed to reside permanently at this holy confluence accompanied by Brahma and Vishnu. Hence, the Jyotirlinga is called "Trimbak" (the Three-Eyed Lord who embodies the Trinity), making it singular among the twelve sacred Jyotirlingas.',
    quote: '॥ तं त्र्यम्बकमीशमीडे ॥',
    image: '/assets/trimbak/jyotirlinga.webp',
  },
];

export const FESTIVALS_LIST: FestivalItem[] = [
  {
    id: 'mahashivratri',
    name: 'Mahashivratri',
    nativeName: 'महाशिवरात्री',
    traditionalPeriod: 'Magha Krishna Chaturdashi (Feb - Mar)',
    description: 'The premier festival celebrated with round-the-clock Char Prahar Abhisheka, Vedic mantra chanting, and thousands of devotees fasting in divine contemplation.',
    significance: 'Devotees wait through the night to offer Bilva patra and witness the grand golden crown darshan of Lord Trimbakeshwar.',
    image: '/assets/trimbak/mahashivratri.webp',
  },
  {
    id: 'sinhastha-kumbh',
    name: 'Sinhastha Kumbh Mela',
    nativeName: 'सिंहस्थ कुंभमेळा',
    traditionalPeriod: 'Once every 12 years (Jupiter enters Leo)',
    description: 'One of the most magnificent spiritual gatherings on Earth. Millions of ascetics, Akhada saints, and pilgrims take the holy Snan in Kushavarta Tirtha and Godavari.',
    significance: 'Historic religious congregation sanctified by Adi Shankaracharya and ancient monastic traditions of India.',
    image: '/assets/trimbak/kushavarta-tirtha.webp',
  },
  {
    id: 'palkhi-sohala',
    name: 'Palkhi Sohala (Silver Chariot)',
    nativeName: 'पालखी सोहळा',
    traditionalPeriod: 'Every Monday & Karthik Ekadashi',
    description: 'The divine silver Palkhi carrying the sacred golden mask (Suvarna Mukut) of Lord Trimbakeshwar goes around the town accompanied by traditional Varkari Dindis and tutari trumpets.',
    significance: 'A jubilant folk-spiritual spectacle demonstrating devotion, song, and joyous community reverence.',
    image: '/assets/trimbak/palkhi-sohala.webp',
  },
  {
    id: 'rath-purnima',
    name: 'Rath Purnima',
    nativeName: 'रथ पौर्णिमा',
    traditionalPeriod: 'Magha Purnima',
    description: 'A grand procession where the ancient ceremonial wooden chariot is pulled through temple avenues by devoted pilgrims seeking divine darshan.',
    significance: 'Celebrated with deep joy as Lord Shiva descends into the streets to bless every household in Trimbak.',
    image: '/assets/trimbak/rath-purnima.jpg',
  },
  {
    id: 'tripuri-purnima',
    name: 'Tripuri Purnima (Dev Diwali)',
    nativeName: 'त्रिपुरी पौर्णिमा',
    traditionalPeriod: 'Kartika Purnima (Nov)',
    description: 'The entire temple precinct and Kushavarta Kund are illuminated with tens of thousands of glowing earthen diyas and brass deepastambhas.',
    significance: 'Marks the triumph of Lord Shiva over the demon Tripurasura, celebrated with celestial lights and devotional bliss.',
    image: '/assets/trimbak/tripuri-purnima.webp',
  },
];

export const DARSHAN_TIMINGS: DarshanTiming[] = [
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
];

export const DEVOTEE_REVIEWS = [
  {
    name: 'Rajesh & Sunita Kulkarni',
    city: 'Pune, Maharashtra',
    puja: 'Narayan Nagbali',
    date: 'Verified Pilgrim • August 2026',
    comment: 'An अत्यंत शांत and deeply meaningful 3-day experience. Guruji explained every mantra in Marathi with patience and transparency. The arrangements at Kushavarta Kund were orderly.',
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
];

export const ARTICLES_LIST: ArticleItem[] = ARTICLES_DATA;

export const FAQS_LIST: FaqItem[] = [
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
];

export interface TwelveJyotirlinga {
  name: string;
  nativeName: string;
  location: string;
  state: string;
  significance: string;
  isCurrent?: boolean;
}

export const TWELVE_JYOTIRLINGAS: TwelveJyotirlinga[] = [
  { name: 'Somnath', nativeName: 'सोमनाथ', location: 'Prabhas Patan, Saurashtra', state: 'Gujarat', significance: 'First of the twelve sacred Jyotirlingas, revered as the Eternal Shrine of the Moon God.' },
  { name: 'Mallikarjuna', nativeName: 'मल्लिकार्जुन', location: 'Srisailam, Kurnool', state: 'Andhra Pradesh', significance: 'Situated atop the sacred Nallamala Hills along the holy Krishna River.' },
  { name: 'Mahakaleshwar', nativeName: 'महाकालेश्वर', location: 'Ujjain, Shipra River', state: 'Madhya Pradesh', significance: 'The only south-facing (Dakshinabhimukhi) Jyotirlinga, Lord of Time and Eternity.' },
  { name: 'Omkareshwar', nativeName: 'ओंकारेश्वर', location: 'Mandhata Island, Narmada', state: 'Madhya Pradesh', significance: 'Natural Om-shaped river island consecrated with the Amaleshwar Linga.' },
  { name: 'Kedarnath', nativeName: 'केदारनाथ', location: 'Rudraprayag, Garhwal Himalayas', state: 'Uttarakhand', significance: 'Highest Jyotirlinga shrine amid glacial Himalayan peaks near the Mandakini River.' },
  { name: 'Bhimashankar', nativeName: 'भीमाशंकर', location: 'Sahyadri, Pune District', state: 'Maharashtra', significance: 'Source of the river Bhima, situated in dense Western Ghats biodiversity forest.' },
  { name: 'Kashi Vishwanath', nativeName: 'काशी विश्वनाथ', location: 'Varanasi, Holy Ganga', state: 'Uttar Pradesh', significance: 'The supreme spiritual capital of Sanatan Dharma and abode of Moksha.' },
  { name: 'Trimbakeshwar', nativeName: 'त्र्यंबकेश्वर', location: 'Trimbak, Nashik', state: 'Maharashtra', significance: 'Unique three-faced linga embodying Brahma, Vishnu & Rudra, source of River Godavari.', isCurrent: true },
  { name: 'Vaidyanath', nativeName: 'वैद्यनाथ', location: 'Deoghar, Santhal Parganas', state: 'Jharkhand', significance: 'The Lord of Physicians, associated with Ravana penance and divine healing.' },
  { name: 'Nageshwar', nativeName: 'नागेश्वर', location: 'Dwarka Coast', state: 'Gujarat', significance: 'Protector from poisons and spiritual obstacles mentioned in Shiva Purana.' },
  { name: 'Rameshwaram', nativeName: 'रामेश्वरम्', location: 'Rameswaram Island', state: 'Tamil Nadu', significance: 'Consecrated by Bhagwan Shri Rama before crossing to Lanka in the Treta Yuga.' },
  { name: 'Grishneshwar', nativeName: 'घृष्णेश्वर', location: 'Verul, Chhatrapati Sambhajinagar', state: 'Maharashtra', significance: 'The twelfth and final Jyotirlinga, celebrated for motherly devotion of Ghushma.' },
];

export interface PujaComparisonRow {
  pujaName: string;
  sanskritName: string;
  slug: string;
  context: string;
  duration: string;
  preparation: string;
  gurujiRequired: string;
  recommendedDays: string;
}

export const PUJA_COMPARISON_TABLE: PujaComparisonRow[] = [
  {
    pujaName: 'Narayan Nagbali',
    sanskritName: 'नारायण नागबळी',
    slug: 'narayan-nagbali',
    context: 'Pitru-related ancestral peace & unintended dosha shanti',
    duration: '3 Full Days',
    preparation: 'Strict fasting, holy snan at Kushavarta, traditional unstitched attire',
    gurujiRequired: 'Authorized Trimbak Purohit (Mandatory)',
    recommendedDays: 'Auspicious Muhurat / Pitru Paksha / Amavasya',
  },
  {
    pujaName: 'Tripindi Shraddha',
    sanskritName: 'त्रिपिंडी श्राद्ध',
    slug: 'tripindi-shraddha',
    context: 'Ancestral remembrance for 3 generations (Paternal & Maternal)',
    duration: '1 Day (3 to 4 hours)',
    preparation: 'Morning fast, snan, names and Gotra of ancestors',
    gurujiRequired: 'Vedic Purohit (Mandatory)',
    recommendedDays: 'Amavasya, Ashtami, Ekadashi, Pitru Paksha',
  },
  {
    pujaName: 'Kaal Sarp Yog Shanti',
    sanskritName: 'कालसर्प योग शांती',
    slug: 'kaal-sarp-shanti',
    context: 'Astrological planetary harmony & mental peace (Rahu-Ketu)',
    duration: '1 Day (2.5 to 3 hours)',
    preparation: 'Dhoti / Saree, birth details/kundali, morning fast',
    gurujiRequired: 'Vedic Jyotish Purohit (Mandatory)',
    recommendedDays: 'Panchami, Nag Panchami, Pradosham, Amavasya',
  },
  {
    pujaName: 'Kumbh Vivah',
    sanskritName: 'कुंभ विवाह',
    slug: 'kumbh-vivah',
    context: 'Traditional pre-marriage sacrament invoking Vishnu blessings',
    duration: '1 Day (2 to 3 hours)',
    preparation: 'New traditional dress, clay Kumbha, Vishnu worship',
    gurujiRequired: 'Vedic Acharya (Mandatory)',
    recommendedDays: 'Shubh Vivah Muhurat morning',
  },
  {
    pujaName: 'Maha Mrityunjaya Jaap',
    sanskritName: 'महामृत्युंजय जप',
    slug: 'maha-mrityunjaya-jaap',
    context: 'Sacred Vedic chanting for spiritual fortitude and well-being',
    duration: '1 to 3 Days (21,000+ chants)',
    preparation: 'Satvik routine, Sankalp in family name, Bilva patra offerings',
    gurujiRequired: 'Initiated Vedic Scholars (3 to 5 priests)',
    recommendedDays: 'Mondays, Shivratri, Shravan Maas, Any auspicious day',
  },
  {
    pujaName: 'Rudrabhishek',
    sanskritName: 'रुद्राभिषेक',
    slug: 'rudrabhishek',
    context: 'Continuous Panchamrut & Godavari holy libation with Rudram hymns',
    duration: '1.5 to 2 hours',
    preparation: 'Morning snan, unstitched Dhoti, pure heart & Sankalp',
    gurujiRequired: 'Vedic Purohit',
    recommendedDays: 'Mondays, Pradosham, Shivratri, Daily morning',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = GALLERY_DATA;

export const TEMPLE_PRACTICAL_GUIDE = {
  whatToBring: [
    'Traditional clothing (Unstitched white/saffron Dhoti & Angavastra for men; Traditional Saree or Salwar for women)',
    'Government ID proof (Aadhaar / Voter ID / Passport for temple registration or booking validation)',
    'Gotra and ancestral family details if performing Pitru rituals',
    'Comfortable slip-on footwear (deposited at official temple footwear counters outside)',
    'Light warm shawl during winter mornings (Nov to Feb)',
  ],
  whatNotToBring: [
    'Mobile phones, cameras & smartwatches inside the inner Garbhagriha',
    'Leather belts, leather wallets, leather shoes or accessories inside sanctum',
    'Heavy luggage or backpacks (use cloakroom near temple main gate)',
    'Tobacco, matchboxes, lighters or outside eatables',
  ],
  generalEtiquette: [
    'Maintain respectful silence and devotional decorum in sanctum lines',
    'Follow instructions given by temple security and authorized sevaks',
    'Take holy Snan at Kushavarta Kund before participating in personal Abhishek or Puja',
    'Dispose of nirmalya (flowers) only in designated bio-tanks',
  ],
  emergencyContacts: [
    { label: 'Temple Police Station', phone: '+91 2594 222133' },
    { label: 'Trimbakeshwar Rural Hospital', phone: '+91 2594 222045' },
    { label: 'Sansthan Information Desk', phone: '+91 2594 222225' },
    { label: 'Devotee Pilgrim Helpline', phone: '+91 98220 12345' },
  ],
};

export const CONTACT_INFO = {
  portalName: 'Shri Trimbakeshwar Jyotirlinga Seva Portal',
  address: 'Near Kushavarta Tirtha Ghat Road, Trimbakeshwar, Dist. Nashik, Maharashtra - 422212',
  phone: '+91 2594 222 108',
  altPhone: '+91 98220 11008',
  whatsapp: '+91 98220 11008',
  email: 'seva@trimbakeshwar-jyotirlinga.org',
  officeHours: '06:00 AM to 08:30 PM (All 7 Days)',
};

