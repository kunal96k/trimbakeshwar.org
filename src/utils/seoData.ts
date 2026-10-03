// Comprehensive SEO Configuration & Schema.org JSON-LD Builders for Shri Trimbakeshwar Jyotirlinga Portal
import { PujaItem, ArticleItem, FaqItem, FestivalItem, GalleryItem } from '../types';

export const SEO_CONFIG = {
  siteName: 'Shri Trimbakeshwar Jyotirlinga & Purohit Seva',
  siteUrl: 'https://www.tirthapurohit.in',
  defaultOgImage: 'https://www.tirthapurohit.in/assets/trimbak/jyotirlinga-temple-main.webp',
  author: 'Pt. Pravin Shambhu Deshmukh (Desai) - Hereditary Vatandar Purohit',
  email: 'trimbak.tirthapurohit@gmail.com',
  phone: '+91 96899 73967',
  formattedPhone: '+919689973967',
  geo: {
    region: 'IN-MH',
    placename: 'Trimbakeshwar, Nashik, Maharashtra, India',
    latitude: 19.9324,
    longitude: 73.5308,
    postalCode: '422212',
    streetAddress: 'Shri Ganga Godavari Mandir, 1st Floor, Kushavart Tirth Chowk',
    addressLocality: 'Trimbakeshwar, Nashik',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  },
  social: {
    twitter: '@TrimbakPurohit',
    facebook: 'https://facebook.com/TrimbakeshwarPurohitOfficial',
    instagram: 'https://instagram.com/trimbakeshwar_purohit',
    youtube: 'https://youtube.com/@TrimbakeshwarJyotirlingaPurohit',
  },
  openingHours: 'Mo-Su 06:00-20:30',
  priceRange: '₹₹ - ₹₹₹',
};

// Global default keywords covering high-intent search queries
export const GLOBAL_SEO_KEYWORDS = [
  'Trimbakeshwar Jyotirlinga',
  'Trimbakeshwar temple Nashik',
  'Trimbakeshwar Guruji contact number',
  'Trimbakeshwar authorized purohit',
  'Tamrapatra dhari Guruji Trimbakeshwar',
  'Pandit Pravin Shambhu Deshmukh',
  'Narayan Nagbali Puja Trimbakeshwar',
  'Narayan Nagbali cost and procedure',
  'Kaal Sarp Dosh Nivaran Trimbakeshwar',
  'Kaal Sarp Yog Shanti vidhi',
  'Tripindi Shraddha Trimbakeshwar',
  'Maha Mrityunjaya Jaap Trimbakeshwar',
  'Rudrabhishek Puja Trimbakeshwar',
  'Kumbh Vivah Trimbakeshwar',
  'Ark Vivah Trimbakeshwar',
  'Kushavarta Kund Trimbakeshwar',
  'Brahmagiri mountain Godavari origin',
  'Trimbakeshwar darshan timings',
  'Trimbakeshwar VIP darshan pass',
  'Nashik to Trimbakeshwar travel guide',
  'How to reach Trimbakeshwar',
  'Pitru Dosh Nivaran puja Nashik',
  'Peshwa era temple architecture',
  'त्र्यंबकेश्वर ज्योतिर्लिंग',
  'त्र्यंबकेश्वर गुरुजी संपर्क',
  'नारायण नागबळी पूजा त्र्यंबकेश्वर',
  'कालसर्प योग शांती',
  'त्रिपिंडी श्राद्ध विधी',
  'कुशावर्त तीर्थ नाशिक',
];

// ─────────────────────────────────────────────────────────────────────────────
// Schema.org JSON-LD Structured Data Builders
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Main Hindu Temple & Place of Worship Schema
 */
export function getPlaceOfWorshipSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HinduTemple',
    '@id': `${SEO_CONFIG.siteUrl}/#temple`,
    name: 'Shri Trimbakeshwar Jyotirlinga Temple',
    alternateName: ['त्र्यंबकेश्वर ज्योतिर्लिंग मंदिर', 'Tryambakeshwar Mandir', 'Trimbak Temple'],
    description:
      'One of the 12 sacred Jyotirlingas in India, embodying the holy Tridev (Brahma, Vishnu, Maheshwar) and the sacred origin of River Godavari at Brahmagiri, Nashik, Maharashtra.',
    url: SEO_CONFIG.siteUrl,
    logo: `${SEO_CONFIG.siteUrl}/assets/purohit-profile.png`,
    image: [
      `${SEO_CONFIG.siteUrl}/assets/trimbak/jyotirlinga-temple-main.webp`,
      `${SEO_CONFIG.siteUrl}/assets/trimbak/kushavarta-kund.webp`,
    ],
    telephone: SEO_CONFIG.phone,
    email: SEO_CONFIG.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SEO_CONFIG.geo.streetAddress,
      addressLocality: SEO_CONFIG.geo.addressLocality,
      addressRegion: SEO_CONFIG.geo.addressRegion,
      postalCode: SEO_CONFIG.geo.postalCode,
      addressCountry: SEO_CONFIG.geo.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SEO_CONFIG.geo.latitude,
      longitude: SEO_CONFIG.geo.longitude,
    },
    hasMap: 'https://maps.google.com/?q=Trimbakeshwar+Jyotirlinga+Temple+Nashik',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '05:30',
        closes: '21:00',
      },
    ],
    isAccessibleForFree: true,
    publicAccess: true,
  };
}

/**
 * LocalBusiness & Professional Purohit Vedic Service Schema
 */
export function getPurohitLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SEO_CONFIG.siteUrl}/#purohit-service`,
    name: 'Pt. Pravin Shambhu Deshmukh - Hereditary Vatandar Purohit Trimbakeshwar',
    alternateName: 'श्री त्र्यंबकेश्वर तीर्थ पुरोहित व विधी सेवा',
    description:
      '25th Generation Hereditary Vatandar Tamrapatra-dhari Purohit offering authentic Vedic Pooja Vidhis: Narayan Nagbali, Kaal Sarp Yog Shanti, Tripindi Shraddha, Maha Mrityunjaya Jaap, and Rudrabhishek at Shri Kshetra Trimbakeshwar.',
    url: SEO_CONFIG.siteUrl,
    image: `${SEO_CONFIG.siteUrl}/assets/purohit-profile.png`,
    telephone: SEO_CONFIG.phone,
    email: SEO_CONFIG.email,
    priceRange: SEO_CONFIG.priceRange,
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, UPI, Net Banking, Credit Card, Debit Card',
    areaServed: [
      {
        '@type': 'Country',
        name: 'India',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Maharashtra',
      },
      {
        '@type': 'City',
        name: 'Trimbakeshwar',
      },
      {
        '@type': 'City',
        name: 'Nashik',
      },
      {
        '@type': 'City',
        name: 'Mumbai',
      },
      {
        '@type': 'City',
        name: 'Pune',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: SEO_CONFIG.geo.streetAddress,
      addressLocality: SEO_CONFIG.geo.addressLocality,
      addressRegion: SEO_CONFIG.geo.addressRegion,
      postalCode: SEO_CONFIG.geo.postalCode,
      addressCountry: SEO_CONFIG.geo.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SEO_CONFIG.geo.latitude,
      longitude: SEO_CONFIG.geo.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '06:00',
        closes: '20:30',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1280',
      bestRating: '5',
      worstRating: '1',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Vedic Pooja & Shanti Vidhis',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Narayan Nagbali Puja',
            description: '3-Day sacred Pitru dosha and ancestral peace ritual performed at Kushavarta Kund.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Kaal Sarp Yog Shanti',
            description: 'Vedic planetary harmony and Rahu-Ketu shanti vidhi at Trimbakeshwar.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Tripindi Shraddha',
            description: 'Remembrance and peace offerings for three generations of departed ancestors.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Maha Mrityunjaya Anushthan',
            description: 'Health, vitality, and longevity jaap and havan by learned Vedic Brahmins.',
          },
        },
      ],
    },
  };
}

/**
 * Person Schema for Guruji
 */
export function getGurujiPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SEO_CONFIG.siteUrl}/#guruji`,
    name: 'Pt. Pravin Shambhu Deshmukh (Desai)',
    alternateName: 'पंडित प्रवीण शंभू देशमुख (देसाई)',
    jobTitle: 'Hereditary Vatandar Purohit (25th Generation)',
    worksFor: {
      '@type': 'Organization',
      name: 'Shri Trimbakeshwar Jyotirlinga Purohit Sanstha',
    },
    description:
      'Hereditary Tamrapatra-dhari Purohit of Shri Kshetra Trimbakeshwar performing authentic scriptural rituals according to Garuda Purana, Dharma Sindhu, and Rigvedic traditions.',
    telephone: SEO_CONFIG.phone,
    email: SEO_CONFIG.email,
    url: `${SEO_CONFIG.siteUrl}/guruji`,
    image: `${SEO_CONFIG.siteUrl}/assets/purohit-profile.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SEO_CONFIG.geo.streetAddress,
      addressLocality: SEO_CONFIG.geo.addressLocality,
      addressRegion: SEO_CONFIG.geo.addressRegion,
      postalCode: SEO_CONFIG.geo.postalCode,
      addressCountry: SEO_CONFIG.geo.addressCountry,
    },
    knowsLanguage: ['Sanskrit', 'Marathi', 'Hindi', 'English'],
    knowsAbout: [
      'Narayan Nagbali Vidhi',
      'Kaal Sarp Yog Shanti',
      'Tripindi Shraddha',
      'Rudra Homa',
      'Garuda Purana',
      'Vedic Astrology & Muhurat',
    ],
  };
}

/**
 * Individual Puja Service Schema
 */
export function getPujaServiceSchema(puja: PujaItem) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SEO_CONFIG.siteUrl}/puja/${puja.slug}#service`,
    name: puja.name,
    alternateName: [puja.sanskritName, puja.marathiName].filter(Boolean),
    serviceType: 'Vedic Religious Ritual / Shanti Vidhi',
    description: puja.description,
    provider: {
      '@type': 'ProfessionalService',
      name: 'Pt. Pravin Shambhu Deshmukh - Hereditary Purohit',
      telephone: SEO_CONFIG.phone,
      url: SEO_CONFIG.siteUrl,
    },
    areaServed: {
      '@type': 'Place',
      name: 'Shri Kshetra Trimbakeshwar, Nashik, Maharashtra',
      geo: {
        '@type': 'GeoCoordinates',
        latitude: SEO_CONFIG.geo.latitude,
        longitude: SEO_CONFIG.geo.longitude,
      },
    },
    offers: {
      '@type': 'Offer',
      price: puja.advanceToken ? puja.advanceToken.toString() : '1000',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: `${SEO_CONFIG.siteUrl}/puja/${puja.slug}`,
      validFrom: '2026-01-01',
      description: puja.feeNote || 'Advance token to reserve date and Vedic Muhurat.',
    },
    image: puja.image ? `${SEO_CONFIG.siteUrl}${puja.image}` : SEO_CONFIG.defaultOgImage,
    termsOfService: `${SEO_CONFIG.siteUrl}/terms`,
  };
}

/**
 * FAQPage Schema
 */
export function getFAQPageSchema(faqs: FaqItem[] | Array<{ question: { en: string }; answer: { en: string } }>) {
  const mainEntity = faqs.map((faq) => {
    let q = '';
    let a = '';
    if ('question' in faq && typeof faq.question === 'object' && 'en' in faq.question) {
      q = (faq as any).question.en;
      a = (faq as any).answer.en;
    } else if ('question' in faq && typeof (faq as any).question === 'string') {
      q = (faq as any).question;
      a = (faq as any).answer;
    }
    return {
      '@type': 'Question',
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: a,
      },
    };
  }).filter((item) => item.name && item.acceptedAnswer.text);

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  };
}

/**
 * BreadcrumbList Schema
 */
export function getBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SEO_CONFIG.siteUrl}${item.path}`,
    })),
  };
}

/**
 * Article / BlogPosting Schema
 */
export function getArticleSchema(article: ArticleItem) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${SEO_CONFIG.siteUrl}/articles/${article.slug}#article`,
    headline: article.title,
    alternativeHeadline: article.titleNative,
    description: article.summary,
    articleSection: article.category,
    image: article.coverImage ? `${SEO_CONFIG.siteUrl}${article.coverImage}` : SEO_CONFIG.defaultOgImage,
    author: {
      '@type': 'Person',
      name: typeof article.author === 'string' ? article.author : 'Pt. Pravin Shambhu Deshmukh',
      jobTitle: article.authorDesignation || 'Hereditary Vatandar Purohit',
      url: `${SEO_CONFIG.siteUrl}/guruji`,
    },
    publisher: {
      '@type': 'Organization',
      name: SEO_CONFIG.siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${SEO_CONFIG.siteUrl}/assets/purohit-profile.png`,
      },
    },
    datePublished: article.publishedDate || '2026-01-01',
    dateModified: article.publishedDate || '2026-01-01',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SEO_CONFIG.siteUrl}/articles/${article.slug}`,
    },
    keywords: [
      article.category,
      'Trimbakeshwar',
      'Jyotirlinga',
      'Vedic Vidhi',
      'Purohit Guidance',
      article.title,
    ].join(', '),
  };
}

/**
 * Festival / Event Schema
 */
export function getFestivalEventSchema(festival: FestivalItem) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: festival.name,
    alternateName: festival.nativeName,
    description: festival.description,
    image: festival.image ? `${SEO_CONFIG.siteUrl}${festival.image}` : SEO_CONFIG.defaultOgImage,
    startDate: '2026-01-01T06:00:00+05:30',
    endDate: '2026-12-31T22:00:00+05:30',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: 'Shri Trimbakeshwar Jyotirlinga Temple',
      address: {
        '@type': 'PostalAddress',
        streetAddress: SEO_CONFIG.geo.streetAddress,
        addressLocality: SEO_CONFIG.geo.addressLocality,
        addressRegion: SEO_CONFIG.geo.addressRegion,
        postalCode: SEO_CONFIG.geo.postalCode,
        addressCountry: SEO_CONFIG.geo.addressCountry,
      },
    },
    organizer: {
      '@type': 'Organization',
      name: 'Shri Trimbakeshwar Devasthan Trust & Purohit Sangh',
      url: SEO_CONFIG.siteUrl,
    },
  };
}

/**
 * ImageGallery Schema
 */
export function getImageGallerySchema(images: GalleryItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'Shri Trimbakeshwar Jyotirlinga Sacred Darshan Gallery',
    description: 'High-resolution sacred photographs of Trimbakeshwar Temple, Brahmagiri Hills, Kushavarta Kund, Suvarna Mukut, and Vedic Pooja Vidhis.',
    url: `${SEO_CONFIG.siteUrl}/gallery`,
    image: images.slice(0, 10).map((img) => ({
      '@type': 'ImageObject',
      contentUrl: `${SEO_CONFIG.siteUrl}${img.imageUrl}`,
      caption: img.title || 'Sacred Trimbakeshwar View',
      description: img.description || img.caption || '',
    })),
  };
}
