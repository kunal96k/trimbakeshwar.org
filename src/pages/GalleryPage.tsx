import React, { useState, useMemo, useEffect, useRef } from 'react';
import { InnerPageHero } from '../components/InnerPageHero';
import { TrishulIcon, TempleIcon, VedicScrollIcon } from '../components/Motifs';
import {
  GALLERY_DATA,
  GALLERY_CATEGORIES,
  FEATURED_COLLECTIONS,
  FeaturedCollection,
} from '../data/galleryData';
import { PUJA_LIST, GURUJI_LIST } from '../data/siteData';
import { ARTICLES_DATA } from '../data/articlesData';
import { useNavigation } from '../context/NavigationContext';
import { GalleryItem, AppRoute, SupportedLanguage } from '../types';
import {
  Search,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Share2,
  Calendar,
  MapPin,
  Camera,
  ShieldCheck,
  Check,
  Languages,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Play,
  Maximize2,
  Minimize2,
  Eye,
  Tag,
  ExternalLink,
  Flame,
  UserCheck,
  BookOpen,
  Info,
} from 'lucide-react';

interface GalleryPageProps {
  slug?: string;
}

const LANGUAGE_LABELS: Record<string, { label: string; native: string }> = {
  en: { label: 'English', native: 'English' },
  hi: { label: 'Hindi', native: 'हिंदी' },
  mr: { label: 'Marathi', native: 'मराठी' },
  sa: { label: 'Sanskrit', native: 'संस्कृतम्' },
  gu: { label: 'Gujarati', native: 'ગુજરાતી' },
  te: { label: 'Telugu', native: 'తెలుగు' },
  kn: { label: 'Kannada', native: 'ಕನ್ನಡ' },
  ta: { label: 'Tamil', native: 'தமிழ்' },
  bn: { label: 'Bengali', native: 'বাংলা' },
  or: { label: 'Odia', native: 'ଓଡ଼ିଆ' },
};

export function GalleryPage({ slug }: GalleryPageProps) {
  const { currentRoute, navigate, openBooking } = useNavigation();

  // Route extraction: Check if current route is /gallery/:slug
  let routeSlug = slug;
  if (!routeSlug && currentRoute.startsWith('/gallery/')) {
    routeSlug = currentRoute.replace('/gallery/', '').trim();
  }

  // Check if route matches an individual photo OR a collection
  const photoFromRoute = useMemo(() => {
    if (!routeSlug) return null;
    return (
      GALLERY_DATA.find((item) => item.slug === routeSlug || item.id === routeSlug) ||
      null
    );
  }, [routeSlug]);

  const collectionFromRoute = useMemo(() => {
    if (!routeSlug || photoFromRoute) return null;
    return (
      FEATURED_COLLECTIONS.find(
        (c) => c.slug === routeSlug || c.id === routeSlug
      ) || null
    );
  }, [routeSlug, photoFromRoute]);

  // Gallery Filter & Search States
  const [selectedCategory, setSelectedCategory] = useState<string>(
    collectionFromRoute ? collectionFromRoute.category : 'All'
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('en');

  // Lightbox Modal States
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [copiedToast, setCopiedToast] = useState<boolean>(false);
  const [touchStartX, setTouchStartX] = useState<number>(0);

  // Pagination / Load More state (editorial performance)
  const [visibleCount, setVisibleCount] = useState<number>(12);

  // When collection is selected from route, sync category
  useEffect(() => {
    if (collectionFromRoute) {
      setSelectedCategory(collectionFromRoute.category);
    }
  }, [collectionFromRoute]);

  // Filtered Gallery Items
  const filteredItems = useMemo(() => {
    return GALLERY_DATA.filter((item) => {
      // Category Match
      const matchesCategory =
        selectedCategory === 'All' ||
        item.category === selectedCategory ||
        (item.tags && item.tags.includes(selectedCategory));

      // Search Query Match across titles, native script, captions, description, tags & location
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        (item.titleNative && item.titleNative.toLowerCase().includes(query)) ||
        item.caption.toLowerCase().includes(query) ||
        (item.description && item.description.toLowerCase().includes(query)) ||
        (item.location && item.location.toLowerCase().includes(query)) ||
        (item.tags && item.tags.some((t) => t.toLowerCase().includes(query)));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const displayedItems = useMemo(() => {
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, visibleCount]);

  // Handle Share link
  const handleShare = async (item: GalleryItem) => {
    const url = `${window.location.origin}/gallery/${item.slug || item.id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: item.caption,
          url,
        });
        return;
      } catch {
        // fallback to clipboard
      }
    }
    navigator.clipboard.writeText(url);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;

      if (e.key === 'Escape') {
        setLightboxIndex(null);
        setIsZoomed(false);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % filteredItems.length : null
        );
        setIsZoomed(false);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null
        );
        setIsZoomed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  // Touch Swipe for mobile Lightbox
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (lightboxIndex === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 50) {
      // swipe left -> next
      setLightboxIndex((prev) =>
        prev !== null ? (prev + 1) % filteredItems.length : null
      );
      setIsZoomed(false);
    } else if (diff < -50) {
      // swipe right -> prev
      setLightboxIndex((prev) =>
        prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null
      );
      setIsZoomed(false);
    }
  };

  // Helper to get translated content for active image
  const getImageTranslation = (item: GalleryItem, lang: SupportedLanguage) => {
    if (lang !== 'en' && item.translations?.[lang]) {
      return item.translations[lang];
    }
    return {
      title: item.title,
      caption: item.caption,
      description: item.description,
      altText: item.altText,
    };
  };

  // =========================================================================
  // 1. DEDICATED PHOTO DETAIL VIEW (/gallery/:slug)
  // =========================================================================
  if (photoFromRoute) {
    const translation = getImageTranslation(photoFromRoute, selectedLanguage);
    const relatedArticleObj = photoFromRoute.relatedArticle
      ? ARTICLES_DATA.find(
          (a) =>
            a.slug === photoFromRoute.relatedArticle ||
            a.id === photoFromRoute.relatedArticle
        )
      : null;

    const relatedPujaObj = photoFromRoute.relatedPuja
      ? PUJA_LIST.find(
          (p) =>
            p.slug === photoFromRoute.relatedPuja ||
            p.id === photoFromRoute.relatedPuja
        )
      : null;

    const relatedGurujiObj = photoFromRoute.relatedGuruji
      ? GURUJI_LIST.find((g) => g.id === photoFromRoute.relatedGuruji)
      : null;

    const otherInSameCategory = GALLERY_DATA.filter(
      (item) =>
        item.id !== photoFromRoute.id &&
        item.category === photoFromRoute.category
    ).slice(0, 3);

    return (
      <div className="bg-[#FBF6EA] text-[#211D19] min-h-screen pb-20">
        {/* Breadcrumb Header */}
        <div className="bg-gradient-to-b from-[#5A1717] via-[#431111] to-[#2B0A0A] text-white pt-24 pb-12 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb Row */}
            <div className="flex items-center gap-2 text-xs text-amber-200/80 mb-4 overflow-x-auto whitespace-nowrap">
              <button
                onClick={() => navigate('/')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Home
              </button>
              <span>/</span>
              <button
                onClick={() => navigate('/gallery')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Gallery
              </button>
              <span>/</span>
              <span className="text-amber-300 font-semibold">{photoFromRoute.category}</span>
              <span>/</span>
              <span className="text-white/70 truncate max-w-[200px] sm:max-w-none">
                {photoFromRoute.title}
              </span>
            </div>

            {/* Back Button */}
            <button
              onClick={() => navigate('/gallery')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-amber-300 hover:text-white mb-4 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Visual Archive</span>
            </button>

            {/* Title & Native Heading */}
            <div className="space-y-2 max-w-4xl">
              <div className="inline-block px-3 py-1 rounded-full bg-[#B88935] text-[#211D19] font-bold text-[10px] uppercase tracking-wider">
                {photoFromRoute.category}
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white tracking-tight leading-snug">
                {translation.title || photoFromRoute.title}
              </h1>
              {photoFromRoute.titleNative && selectedLanguage === 'en' && (
                <p className="text-amber-200/90 font-devanagari text-base sm:text-lg">
                  {photoFromRoute.titleNative}
                </p>
              )}
            </div>

            {/* Language Selector & Share Bar */}
            <div className="mt-6 pt-4 border-t border-amber-900/40 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-amber-200/80">
                <Languages className="w-4 h-4 text-[#B88935]" />
                <span>Caption Language:</span>
                <div className="flex items-center gap-1">
                  {(['en', 'hi', 'mr', 'sa'] as SupportedLanguage[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLanguage(lang)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                        selectedLanguage === lang
                          ? 'bg-[#B88935] text-[#211D19] font-bold'
                          : 'bg-black/30 hover:bg-black/50 text-white/80'
                      }`}
                    >
                      {LANGUAGE_LABELS[lang]?.native || lang}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleShare(photoFromRoute)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs text-white transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Image</span>
              </button>
            </div>
          </div>
        </div>

        {/* Copied Toast */}
        {copiedToast && (
          <div className="fixed bottom-6 right-6 bg-[#5A1717] text-amber-100 border border-[#B88935] px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <Check className="w-4 h-4 text-[#B88935]" />
            <span>Image link copied to clipboard!</span>
          </div>
        )}

        {/* Photo Container & Metadata Details */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left/Main Column: Image Display & Description */}
            <div className="lg:col-span-8 space-y-6">
              <div className="rounded-3xl overflow-hidden border-2 border-[#B88935]/30 shadow-xl bg-stone-900 relative group">
                <img
                  src={photoFromRoute.imageUrl}
                  alt={translation.altText || photoFromRoute.altText || photoFromRoute.title}
                  className="w-full h-auto max-h-[600px] object-cover mx-auto"
                />
                <button
                  onClick={() => {
                    const idx = GALLERY_DATA.findIndex((i) => i.id === photoFromRoute.id);
                    if (idx !== -1) setLightboxIndex(idx);
                  }}
                  className="absolute bottom-4 right-4 p-3 rounded-full bg-black/70 text-white hover:bg-black/90 transition-colors shadow-lg cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                  title="View full screen"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span>Full Screen</span>
                </button>
              </div>

              {/* Caption & Description Box */}
              <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
                <h3 className="text-base sm:text-lg font-heading font-bold text-[#5A1717]">
                  Photograph Synopsis & Shastric Context
                </h3>
                <p className="text-stone-800 text-sm sm:text-base leading-relaxed font-body">
                  {translation.caption || photoFromRoute.caption}
                </p>
                {photoFromRoute.description && (
                  <div className="text-stone-700 text-xs sm:text-sm leading-relaxed pt-3 border-t border-stone-100 font-sans">
                    {translation.description || photoFromRoute.description}
                  </div>
                )}

                {/* Tags */}
                {photoFromRoute.tags && photoFromRoute.tags.length > 0 && (
                  <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-stone-500 flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Archive Tags:</span>
                    </span>
                    {photoFromRoute.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-[#EDE3D1] text-[11px] font-medium text-[#5A1717]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Metadata Table & Related Actions */}
            <div className="lg:col-span-4 space-y-6">
              {/* Metadata Card */}
              <div className="bg-white border border-[#B88935]/30 rounded-2xl p-6 shadow-xs space-y-4">
                <h4 className="text-xs font-bold text-[#5A1717] uppercase tracking-wider pb-2 border-b border-stone-100 flex items-center gap-2">
                  <Camera className="w-4 h-4 text-[#C56A18]" />
                  <span>Archival Record & Attribution</span>
                </h4>

                <div className="space-y-3 text-xs">
                  {photoFromRoute.location && (
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-stone-500 block text-[10px] uppercase font-bold">Location</span>
                        <span className="text-stone-800 font-medium">{photoFromRoute.location}</span>
                      </div>
                    </div>
                  )}

                  {photoFromRoute.date && (
                    <div className="flex items-start gap-2.5">
                      <Calendar className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-stone-500 block text-[10px] uppercase font-bold">Date / Timing</span>
                        <span className="text-stone-800 font-medium">{photoFromRoute.date}</span>
                      </div>
                    </div>
                  )}

                  {photoFromRoute.year && (
                    <div className="flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-stone-500 block text-[10px] uppercase font-bold">Historical Era</span>
                        <span className="text-stone-800 font-medium">{photoFromRoute.year}</span>
                      </div>
                    </div>
                  )}

                  {photoFromRoute.source && (
                    <div className="flex items-start gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-stone-500 block text-[10px] uppercase font-bold">Source / Trust</span>
                        <span className="text-stone-800 font-medium">{photoFromRoute.source}</span>
                      </div>
                    </div>
                  )}

                  {photoFromRoute.license && (
                    <div className="flex items-start gap-2.5">
                      <Info className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-stone-500 block text-[10px] uppercase font-bold">Copyright & License</span>
                        <span className="text-stone-800 font-medium">{photoFromRoute.license}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Related Puja Widget */}
              {relatedPujaObj && (
                <div className="bg-gradient-to-br from-[#5A1717] to-[#3D0F0F] text-white rounded-2xl p-5 shadow-sm border border-[#B88935]/40 space-y-3">
                  <div className="text-[10px] uppercase font-bold text-amber-300 tracking-wider flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-[#B88935]" />
                    <span>Related Traditional Vidhi</span>
                  </div>
                  <h4 className="text-base font-heading font-bold text-white">
                    {relatedPujaObj.name}
                  </h4>
                  <p className="text-xs text-stone-200/90 line-clamp-2">
                    {relatedPujaObj.tagline}
                  </p>
                  <button
                    onClick={() => navigate(`/puja/${relatedPujaObj.slug}` as AppRoute)}
                    className="w-full py-2 px-3 rounded-xl text-xs font-bold text-[#211D19] bg-gradient-to-r from-amber-300 to-[#B88935] hover:brightness-105 transition-all text-center flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>View Puja Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Related Article Widget */}
              {relatedArticleObj && (
                <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-2">
                  <div className="text-[10px] uppercase font-bold text-[#C56A18] tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>In-Depth Shastra Article</span>
                  </div>
                  <h4 className="text-xs font-bold text-[#5A1717] leading-snug">
                    {relatedArticleObj.title}
                  </h4>
                  <p className="text-xs text-stone-600 line-clamp-2">
                    {relatedArticleObj.summary}
                  </p>
                  <button
                    onClick={() => navigate(`/articles/${relatedArticleObj.slug || relatedArticleObj.id}` as AppRoute)}
                    className="text-xs font-bold text-[#5A1717] hover:text-[#C56A18] inline-flex items-center gap-1 pt-1 cursor-pointer"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* Other Photos in Same Category */}
              {otherInSameCategory.length > 0 && (
                <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-3">
                  <div className="text-xs font-bold text-[#5A1717] uppercase tracking-wider pb-2 border-b border-stone-100">
                    More in {photoFromRoute.category}
                  </div>
                  <div className="space-y-2.5">
                    {otherInSameCategory.map((rel) => (
                      <button
                        key={rel.id}
                        onClick={() => navigate(`/gallery/${rel.slug || rel.id}` as AppRoute)}
                        className="w-full text-left flex items-center gap-3 p-1.5 rounded-xl hover:bg-[#EDE3D1]/50 transition-colors group cursor-pointer"
                      >
                        <img
                          src={rel.thumbnailUrl || rel.imageUrl}
                          alt={rel.title}
                          className="w-14 h-12 rounded-lg object-cover shrink-0 border border-stone-200"
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-[#5A1717] group-hover:text-[#C56A18] truncate">
                            {rel.title}
                          </div>
                          <div className="text-[10px] text-stone-500 truncate">
                            {rel.date || rel.location}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. MAIN GALLERY / VISUAL ARCHIVE VIEW (/gallery)
  // =========================================================================
  return (
    <div className="bg-[#FBF6EA] text-[#211D19] min-h-screen pb-20">
      {/* Cinematic Hero Section */}
      <div className="relative bg-gradient-to-b from-[#2B0A0A] via-[#431111] to-[#5A1717] text-white pt-24 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Background Image Layer with Warm Morning Mist */}
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src="/assets/hero-section.png"
            alt="Trimbakeshwar Temple Background"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Decorative Sanatan Background Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FBF6EA] via-transparent to-black/60 z-0" />

        <div className="max-w-6xl mx-auto relative z-10 text-center space-y-5">
          {/* Sacred Mantra Invocation */}
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-black/40 border border-[#B88935]/50 text-amber-200 text-xs sm:text-sm font-devanagari tracking-wider shadow-sm">
            <TrishulIcon className="w-4 h-4 text-amber-300 shrink-0" />
            <span>॥ ॐ नमः शिवाय • श्री त्र्यंबकेश्वर ज्योतिर्लिंगाय नमः ॥</span>
          </div>

          {/* Main Dual Heading */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight leading-tight">
              दर्शन • उत्सव • परंपरा
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-amber-200/90 font-serif italic">
              The Visual Story of Trimbakeshwar
            </p>
          </div>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-stone-200 text-xs sm:text-sm md:text-base leading-relaxed font-sans">
            A visual journey through the sacred Jyotirlinga, centuries-old temple architecture, hereditary Guruji rites, the divine Monday Palkhi Sohala, and the living spiritual landscape of Trimbak.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#gallery-main-grid"
              className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold text-[#211D19] bg-gradient-to-r from-amber-300 via-[#D4AF37] to-[#B88935] hover:brightness-105 shadow-md active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Visual Archive</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => navigate('/temple')}
              className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-amber-200 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all cursor-pointer"
            >
              View Temple Overview
            </button>
          </div>

          {/* Live Dynamic Archive Counters */}
          <div className="pt-8 max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-black/40 border border-[#B88935]/30">
              <div className="text-xl sm:text-2xl font-bold font-heading text-amber-200">
                {GALLERY_DATA.length}+
              </div>
              <div className="text-[11px] text-stone-300 mt-0.5">Curated Photographs</div>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-[#B88935]/30">
              <div className="text-xl sm:text-2xl font-bold font-heading text-amber-200">
                {FEATURED_COLLECTIONS.length}+
              </div>
              <div className="text-[11px] text-stone-300 mt-0.5">Thematic Collections</div>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-[#B88935]/30">
              <div className="text-xl sm:text-2xl font-bold font-heading text-amber-200">
                10
              </div>
              <div className="text-[11px] text-stone-300 mt-0.5">Indian Languages</div>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-[#B88935]/30">
              <div className="text-xl sm:text-2xl font-bold font-heading text-amber-200">
                1755 CE
              </div>
              <div className="text-[11px] text-stone-300 mt-0.5">Peshwa Shastric Archive</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 space-y-12">
        {/* =========================================================================
            FEATURED VISUAL STORIES (3 EDITORIAL CARDS)
            ========================================================================= */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <div>
              <span className="text-[11px] font-bold text-[#C56A18] uppercase tracking-wider block">
                विशेष दर्शन • FEATURED STORIES
              </span>
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#5A1717]">
                Curated Spiritual Collections
              </h2>
            </div>
            <span className="text-xs text-stone-500 hidden sm:block">
              Highlighting sacred relics & historical assemblies
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURED_COLLECTIONS.map((col) => (
              <div
                key={col.id}
                className="bg-white border border-[#B88935]/30 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Cover Image */}
                <div className="relative h-52 overflow-hidden bg-stone-900">
                  <img
                    src={col.coverImage}
                    alt={col.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute top-3 left-3 bg-[#5A1717] text-amber-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-xs">
                    {col.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-0.5 rounded-md text-[10px] font-semibold">
                    {col.photoCount} Photographs
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="font-devanagari text-amber-300 text-xs block">
                      {col.titleNative}
                    </span>
                    <h3 className="text-base font-heading font-bold text-white leading-snug">
                      {col.title}
                    </h3>
                  </div>
                </div>

                {/* Card Description & Action */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                    {col.description}
                  </p>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {col.tags.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md bg-[#EDE3D1]/80 text-[10px] font-medium text-[#5A1717]"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        setSelectedCategory(col.category);
                        const el = document.getElementById('gallery-main-grid');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-xs font-bold text-[#5A1717] group-hover:text-[#C56A18] inline-flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Explore Collection</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================================
            SEARCH & HORIZONTAL CATEGORY FILTER BAR
            ========================================================================= */}
        <div id="gallery-main-grid" className="scroll-mt-24 space-y-5">
          <div className="bg-white border border-[#B88935]/30 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
            {/* Real-time Search Box */}
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search gallery by keyword, title, deity, location (e.g., Mukut, Kushavarta, Mahashivratri, Guruji)..."
                className="w-full pl-11 pr-10 py-2.5 rounded-xl border border-stone-300 focus:border-[#5A1717] focus:ring-1 focus:ring-[#5A1717] text-xs sm:text-sm text-stone-800 placeholder-stone-400 bg-stone-50/60"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 p-1"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter Pills (Minimal ivory buttons, thin gold border) */}
            <div>
              <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Filter by Category / विषय निवडा</span>
                {selectedCategory !== 'All' && (
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className="text-[#C56A18] hover:underline font-semibold text-xs"
                  >
                    Reset Filter (Show All)
                  </button>
                )}
              </div>

              {/* Horizontal swipeable filter row without vertical wrap */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
                {GALLERY_CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                        isActive
                          ? 'bg-[#5A1717] text-amber-200 border-[#5A1717] shadow-xs'
                          : 'bg-[#FBF6EA] text-stone-700 border-[#B88935]/30 hover:bg-[#EDE3D1] hover:text-[#5A1717]'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Results Bar */}
          <div className="flex items-center justify-between text-xs text-stone-600 px-1">
            <span className="font-semibold text-[#5A1717]">
              Showing {filteredItems.length} Photographs
              {selectedCategory !== 'All' && (
                <span className="text-stone-500 font-normal"> in &quot;{selectedCategory}&quot;</span>
              )}
            </span>
            <span className="text-stone-400">Click any photograph to view high resolution</span>
          </div>

          {/* =========================================================================
              EDITORIAL MASONRY GALLERY GRID
              ========================================================================= */}
          {displayedItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {displayedItems.map((item, index) => {
                const isVideo = item.category === 'Videos' || Boolean(item.videoUrl);
                const isAnnouncement = item.category === 'Announcements';

                return (
                  <div
                    key={item.id}
                    onClick={() => setLightboxIndex(index)}
                    className="bg-white border border-stone-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg hover:border-[#B88935]/50 transition-all duration-300 cursor-pointer group flex flex-col justify-between relative"
                  >
                    {/* Image Container */}
                    <div className="relative h-56 sm:h-64 overflow-hidden bg-stone-900">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="bg-[#5A1717] text-amber-200 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-xs">
                          {item.category}
                        </span>
                        {isAnnouncement && (
                          <span className="bg-amber-500 text-stone-900 px-2 py-0.5 rounded-full text-[10px] font-bold">
                            Sangha Record
                          </span>
                        )}
                      </div>

                      {/* Center Hover Action Icon */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-10 h-10 rounded-full bg-white/90 text-[#5A1717] flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                          {isVideo ? (
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                          ) : (
                            <ZoomIn className="w-5 h-5" />
                          )}
                        </div>
                      </div>

                      {/* Bottom Image Overlay Details */}
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        {item.titleNative && (
                          <span className="font-devanagari text-amber-300 text-[11px] block truncate">
                            {item.titleNative}
                          </span>
                        )}
                        <h3 className="text-xs sm:text-sm font-heading font-bold text-white line-clamp-1 group-hover:text-amber-200 transition-colors">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    {/* Card Content Snippet */}
                    <div className="p-3.5 flex-1 flex flex-col justify-between">
                      <p className="text-[11px] text-stone-600 line-clamp-2 leading-relaxed">
                        {item.caption}
                      </p>

                      <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-400">
                        <span>{item.date || item.year || 'Sanatan Heritage'}</span>
                        <span className="text-[#5A1717] font-semibold group-hover:text-[#C56A18] inline-flex items-center gap-0.5">
                          <span>View Detail</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white border border-stone-200 rounded-2xl p-10 text-center max-w-md mx-auto space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#EDE3D1] text-[#5A1717] flex items-center justify-center mx-auto">
                <TempleIcon className="w-6 h-6 text-[#5A1717]" />
              </div>
              <h3 className="text-sm font-heading font-bold text-[#5A1717]">
                या विभागात लवकरच नवीन छायाचित्रे उपलब्ध होतील.
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                New photographs and historical records will be added to this visual collection soon. Try searching another category.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="py-1.5 px-4 rounded-xl text-xs font-bold text-white bg-[#5A1717] hover:bg-[#6D1B1B] transition-colors"
              >
                Reset Gallery Filters
              </button>
            </div>
          )}

          {/* Load More Button if applicable */}
          {filteredItems.length > visibleCount && (
            <div className="text-center pt-6">
              <button
                onClick={() => setVisibleCount((prev) => prev + 12)}
                className="px-6 py-2.5 rounded-full text-xs font-bold text-[#5A1717] bg-[#EDE3D1] hover:bg-[#B88935]/20 border border-[#B88935]/40 transition-colors shadow-xs cursor-pointer"
              >
                Load More Photographs ({filteredItems.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </div>

        {/* =========================================================================
            BOTTOM SANATAN CTA BANNER
            ========================================================================= */}
        <div className="bg-gradient-to-r from-[#5A1717] via-[#4A1212] to-[#2E0B0B] text-white rounded-3xl p-6 sm:p-10 border border-[#B88935]/40 shadow-xl relative overflow-hidden text-center space-y-4">
          <div className="text-sm font-devanagari text-amber-300 font-bold tracking-widest uppercase">
            ॥ हर हर महादेव ॥
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-white">
            Continue Your Trimbakeshwar Spiritual Journey
          </h3>
          <p className="text-stone-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Explore authentic temple history, discover Shastra-prescribed Puja rituals, read sacred treatises, or connect directly with an authorized hereditary Guruji.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => navigate('/temple')}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-stone-900 bg-amber-300 hover:bg-amber-400 transition-colors cursor-pointer"
            >
              Explore Temple
            </button>
            <button
              onClick={() => navigate('/puja')}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#B88935] hover:bg-[#A3782E] transition-colors cursor-pointer"
            >
              Explore Puja Vidhis
            </button>
            <button
              onClick={() => navigate('/articles')}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-amber-200 border border-amber-400/40 hover:bg-white/10 transition-colors cursor-pointer"
            >
              Read Spiritual Articles
            </button>
            <button
              onClick={() => navigate('/guruji')}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white border border-white/30 hover:bg-white/10 transition-colors cursor-pointer"
            >
              Find Authorized Guruji
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. FULL-SCREEN LIGHTBOX MODAL
          ========================================================================= */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-[#1B0E0B]/95 backdrop-blur-md flex flex-col justify-between select-none"
          onClick={() => {
            setLightboxIndex(null);
            setIsZoomed(false);
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Bar Controls */}
          <div
            className="p-4 sm:px-6 flex items-center justify-between text-white border-b border-white/10 bg-black/40 relative z-20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left: Category & Counter */}
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[#B88935] text-[#211D19] font-bold text-[10px] uppercase tracking-wider">
                {filteredItems[lightboxIndex].category}
              </span>
              <span className="text-xs text-stone-300">
                {lightboxIndex + 1} of {filteredItems.length}
              </span>
            </div>

            {/* Right: Actions (Language, Zoom, Share, Close) */}
            <div className="flex items-center gap-2">
              {/* Language Switcher for Lightbox */}
              <div className="hidden sm:flex items-center gap-1 bg-black/40 px-2 py-1 rounded-lg border border-white/10 text-xs">
                <Languages className="w-3.5 h-3.5 text-amber-300" />
                {(['en', 'hi', 'mr', 'sa'] as SupportedLanguage[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                      selectedLanguage === lang
                        ? 'bg-[#B88935] text-[#211D19] font-bold'
                        : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    {LANGUAGE_LABELS[lang]?.native || lang}
                  </button>
                ))}
              </div>

              {/* Zoom Button */}
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title={isZoomed ? 'Zoom Out' : 'Zoom In'}
              >
                {isZoomed ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              {/* Share Button */}
              <button
                onClick={() => handleShare(filteredItems[lightboxIndex])}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Share Image"
              >
                <Share2 className="w-4 h-4" />
              </button>

              {/* Close Button */}
              <button
                onClick={() => {
                  setLightboxIndex(null);
                  setIsZoomed(false);
                }}
                className="p-2 rounded-full bg-white/10 hover:bg-red-900/80 text-white transition-colors cursor-pointer ml-2"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Center Image Container */}
          <div
            className="flex-1 flex items-center justify-center p-2 sm:p-6 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Nav Arrow */}
            <button
              onClick={() => {
                setLightboxIndex(
                  (lightboxIndex - 1 + filteredItems.length) % filteredItems.length
                );
                setIsZoomed(false);
              }}
              className="absolute left-3 sm:left-6 z-30 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all transform -translate-y-1/2 top-1/2 cursor-pointer shadow-lg active:scale-95"
              title="Previous Photo (←)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main Image with Zoom handling */}
            <div
              className={`max-w-5xl max-h-[70vh] flex items-center justify-center transition-transform duration-300 ${
                isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img
                src={filteredItems[lightboxIndex].imageUrl}
                alt={filteredItems[lightboxIndex].title}
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
              />
            </div>

            {/* Right Nav Arrow */}
            <button
              onClick={() => {
                setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
                setIsZoomed(false);
              }}
              className="absolute right-3 sm:right-6 z-30 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all transform -translate-y-1/2 top-1/2 cursor-pointer shadow-lg active:scale-95"
              title="Next Photo (→)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Bar: Multilingual Caption & Direct Links */}
          <div
            className="p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/80 to-transparent text-white border-t border-white/10 relative z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1 max-w-2xl">
                {filteredItems[lightboxIndex].titleNative && (
                  <div className="font-devanagari text-amber-300 text-xs sm:text-sm">
                    {filteredItems[lightboxIndex].titleNative}
                  </div>
                )}
                <h3 className="text-base sm:text-lg font-heading font-bold text-white">
                  {getImageTranslation(filteredItems[lightboxIndex], selectedLanguage).title}
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {getImageTranslation(filteredItems[lightboxIndex], selectedLanguage).caption}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-stone-400 pt-1">
                  {filteredItems[lightboxIndex].location && (
                    <span className="inline-flex items-center gap-1"><TempleIcon className="w-3.5 h-3.5 text-[#B88935]" /> {filteredItems[lightboxIndex].location}</span>
                  )}
                  {filteredItems[lightboxIndex].year && (
                    <span className="inline-flex items-center gap-1">• <TempleIcon className="w-3.5 h-3.5 text-[#B88935]" /> {filteredItems[lightboxIndex].year}</span>
                  )}
                  {filteredItems[lightboxIndex].source && (
                    <span className="inline-flex items-center gap-1">• <VedicScrollIcon className="w-3.5 h-3.5 text-[#B88935]" /> {filteredItems[lightboxIndex].source}</span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    const slugOrId =
                      filteredItems[lightboxIndex].slug ||
                      filteredItems[lightboxIndex].id;
                    setLightboxIndex(null);
                    navigate(`/gallery/${slugOrId}` as AppRoute);
                  }}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#211D19] bg-gradient-to-r from-amber-300 to-[#B88935] hover:brightness-105 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Photo Page</span>
                </button>

                {filteredItems[lightboxIndex].relatedPuja && (
                  <button
                    onClick={() => {
                      const pSlug = filteredItems[lightboxIndex].relatedPuja;
                      setLightboxIndex(null);
                      navigate(`/puja/${pSlug}` as AppRoute);
                    }}
                    className="px-3 py-2 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all cursor-pointer"
                  >
                    View Vidhi →
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
