export type SupportedLanguage = 
  | 'en' // English
  | 'hi' // Hindi
  | 'mr' // Marathi
  | 'gu' // Gujarati
  | 'te' // Telugu
  | 'kn' // Kannada
  | 'ta' // Tamil
  | 'bn' // Bengali
  | 'or' // Odia
  | 'sa'; // Sanskrit

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  script: string;
}

export interface PujaItem {
  id: string;
  slug: string;
  sanskritName: string;
  name: string;
  marathiName: string;
  tagline: string;
  description: string;
  significance: string;
  duration: string;
  recommendedTime: string;
  samagriProvided: boolean;
  image: string;
  imageUrl?: string;
  category: 'Pitru Vidhi' | 'Shanti Vidhi' | 'Abhishek' | 'Anushthan' | 'Vivah' | 'Yaag & Homa' | 'Vastu & Shanti';
  suggestedPurohitCount: number;
  traditionalObservance: string;
  fixedFee?: number | null;
  advanceToken?: number;
  feeNote?: string;
  feeNoteMarathi?: string;
}

export interface GurujiItem {
  id: string;
  name: string;
  title: string;
  titleNative: string;
  experienceYears: number;
  languages: string[];
  specialties: string[];
  education: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  bio: string;
  purohitParampara: string;
  lineage?: string;
  isCertified?: boolean;
  contactPhone?: string;
}

export interface SacredPlace {
  id: string;
  name: string;
  nativeName: string;
  distanceFromTemple: string;
  significance: string;
  description: string;
  image: string;
  imageUrl?: string;
  spiritualImportance?: string;
  timings?: string;
  elevation?: string;
}

export interface FestivalItem {
  id: string;
  name: string;
  nativeName: string;
  traditionalPeriod: string;
  description: string;
  significance: string;
  image: string;
  imageUrl?: string;
  specialObservances?: string[];
}

export interface ArticleTranslation {
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  seoTitle?: string;
  seoDescription?: string;
  metaKeywords?: string[];
  imageAlt?: string;
}

export interface ArticleSource {
  title: string;
  publisher: string;
  url?: string;
  publicationDate?: string;
  verseReference?: string;
  sourceType: 'Scripture' | 'Historical Record' | 'Temple Trust' | 'Academic' | 'Gazetteer' | 'Pilgrimage Authority';
}

export interface ArticleAuthor {
  id: string;
  name: string;
  nameNative?: string;
  slug: string;
  photo: string;
  bio: string;
  designation: string;
  expertise: string[];
  languages: string[];
  verificationStatus: 'VERIFIED' | 'ORGANIZATION_PROVIDED' | 'PENDING_VERIFICATION';
  socialLinks?: {
    website?: string;
    email?: string;
  };
}

export interface ArticleCategoryInfo {
  name: string;
  slug: string;
  devanagariName: string;
  tagline: string;
  description: string;
  icon: string;
  pillarArticleSlug?: string;
}

export interface ArticleItem {
  id: string;
  slug: string;
  category: string;
  categorySlug?: string;
  tags: string[];
  featured?: boolean;
  popular?: boolean;
  status?: 'published' | 'draft' | 'in_review' | 'approved' | 'scheduled' | 'archived';
  coverImage?: string;
  image: string;
  imageUrl?: string;
  imageAlt?: string;
  imageCaption?: string;
  imageCredit?: string;
  author: string;
  authorSlug?: string;
  authorBio?: string;
  authorPhoto?: string;
  authorDesignation?: string;
  authorExpertise?: string[];
  editor?: string;
  publishedAt?: string;
  updatedAt?: string;
  publishedDate?: string;
  date?: string;
  readingTime: string;
  readTime?: string;
  title: string;
  titleNative: string;
  subtitle?: string;
  summary: string;
  content: string;
  keyTakeaways?: string[];
  searchIntent?: 'INFORMATIONAL' | 'NAVIGATIONAL' | 'TRANSACTIONAL' | 'COMMERCIAL_INVESTIGATION' | 'TRAVEL';
  ctaType?: 'temple' | 'puja' | 'travel' | 'spiritual' | 'guruji';
  seoTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  verificationStatus?: 'VERIFIED' | 'ORGANIZATION_PROVIDED' | 'PENDING_VERIFICATION';
  lastReviewedDate?: string;
  nextReviewDate?: string;
  sources?: ArticleSource[];
  shloka?: {
    sanskrit: string;
    transliteration: string;
    translation: string;
    context: string;
  };
  tableOfContents?: { id: string; title: string }[];
  faqs?: { question: string; answer: string }[];
  checklist?: string[];
  relatedPuja?: string[];
  relatedGuruji?: string[];
  relatedArticles?: string[];
  relatedSacredPlaces?: string[];
  relatedFestivals?: string[];
  translations?: Partial<Record<SupportedLanguage, ArticleTranslation>>;
  languageCodes?: SupportedLanguage[];
}

export interface FaqItem {
  id: string;
  question: string;
  questionNative: string;
  answer: string;
}

export interface DarshanTiming {
  name: string;
  nameNative: string;
  time: string;
  description: string;
}

export interface BookingFormData {
  vidhiId: string;
  vidhiName: string;
  date: string;
  gurujiId: string;
  gurujiName: string;
  yajmanName: string;
  phone: string;
  email: string;
  city: string;
  gotra: string;
  familyMembersCount: number;
  specialSankalp: string;
  preferredLanguage: string;
}

export interface GalleryImageTranslation {
  title?: string;
  caption?: string;
  description?: string;
  altText?: string;
}

export interface GalleryItem {
  id: string;
  slug?: string;
  title: string;
  titleNative?: string;
  caption: string;
  description?: string;
  imageUrl: string;
  thumbnailUrl?: string;
  category: string;
  collection?: string;
  location?: string;
  event?: string;
  date?: string;
  year?: string;
  photographer?: string;
  source?: string;
  copyright?: string;
  license?: string;
  altText?: string;
  featured?: boolean;
  layoutSpan?: 'standard' | 'wide' | 'tall' | 'large';
  tags?: string[];
  relatedArticle?: string;
  relatedPuja?: string;
  relatedGuruji?: string;
  videoUrl?: string;
  translations?: Partial<Record<SupportedLanguage, GalleryImageTranslation>>;
}

export interface ContactInquiry {
  name: string;
  mobile: string;
  email: string;
  language: string;
  pujaInterest: string;
  message: string;
}

export type AppRoute =
  | '/'
  | '/temple'
  | '/jyotirlinga'
  | '/temple/story'
  | '/puja'
  | '/puja/narayan-nagbali'
  | '/puja/tripindi-shraddha'
  | '/puja/kaal-sarp-yog'
  | '/puja/kumbh-vivah'
  | '/puja/maha-mrityunjaya'
  | '/puja/rudrabhishek'
  | '/guruji'
  | '/booking'
  | '/sacred-places'
  | '/festivals'
  | '/articles'
  | '/gallery'
  | '/faqs'
  | '/about'
  | '/contact'
  | '/travel'
  | '/darshan'
  | '/temple-guide'
  | '/search'
  | string;
