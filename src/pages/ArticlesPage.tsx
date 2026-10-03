import React, { useState, useMemo, useEffect } from 'react';
import { InnerPageHero } from '../components/InnerPageHero';
import {
  TempleIcon,
  TrishulIcon,
  LotusIcon,
  OmSymbol,
  BrahmagiriIcon,
  KumbhaIcon,
  VedicScrollIcon,
  DivyaSparkleIcon,
  DhwajaIcon,
} from '../components/Motifs';
import {
  ARTICLES_DATA,
  ARTICLES_CATEGORIES,
  CORE_ARTICLE_CATEGORIES,
  AUTHORS_DATA,
  getCategoryBySlug,
  getAuthorBySlug,
  getArticlesByCategory,
  getArticlesByAuthor,
  getArticlesByTag,
  getRelatedArticles,
  generateArticleJsonLd,
  generateBreadcrumbJsonLd,
  generateFaqJsonLd,
  generateXmlSitemap,
} from '../data/articlesData';
import { fetchArticlesPage, formatArticleDate } from '../services/articleService';
import { PUJA_LIST, GURUJI_LIST } from '../data/siteData';
import { useNavigation } from '../context/NavigationContext';
import { SEO } from '../components/SEO';
import { SEO_CONFIG, getBreadcrumbSchema } from '../utils/seoData';
import {
  BookOpen,
  Clock,
  Calendar,
  ArrowRight,
  Share2,
  ArrowLeft,
  Search,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  User,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Flame,
  Bookmark,
  Languages,
  Check,
  Tag,
  ShieldCheck,
  ListOrdered,
  Printer,
  FileCode,
  Compass,
  MapPin,
  Info,
  Layers,
  Code2,
  Copy,
} from 'lucide-react';
import { AppRoute, ArticleItem, ArticleAuthor, ArticleCategoryInfo } from '../types';

const LANGUAGE_LABELS: Record<string, { label: string; native: string }> = {
  en: { label: 'English', native: 'English' },
  hi: { label: 'Hindi', native: 'हिंदी' },
  mr: { label: 'Marathi', native: 'मराठी' },
  gu: { label: 'Gujarati', native: 'ગુજરાતી' },
  te: { label: 'Telugu', native: 'తెలుగు' },
  kn: { label: 'Kannada', native: 'ಕನ್ನಡ' },
  ta: { label: 'Tamil', native: 'தமிழ்' },
  bn: { label: 'Bengali', native: 'বাংলা' },
  or: { label: 'Odia', native: 'ଓଡ଼ିଆ' },
  sa: { label: 'Sanskrit', native: 'संस्कृतम्' },
};

function renderHinduCategoryIcon(slug?: string, className = 'w-5 h-5') {
  switch (slug) {
    case 'trimbakeshwar-temple':
    case 'temple-history':
      return <TempleIcon className={className} />;
    case 'jyotirlinga':
      return <TrishulIcon className={className} />;
    case 'puja-vidhi':
      return <LotusIcon className={className} />;
    case 'hindu-traditions':
      return <OmSymbol className={className} />;
    case 'pilgrimage-travel':
      return <DhwajaIcon className={className} />;
    case 'sacred-places':
      return <BrahmagiriIcon className={className} />;
    case 'festivals':
      return <KumbhaIcon className={className} />;
    case 'spiritual-knowledge':
      return <VedicScrollIcon className={className} />;
    case 'culture-heritage':
      return <DivyaSparkleIcon className={className} />;
    default:
      return <TempleIcon className={className} />;
  }
}

export function ArticlesPage() {
  const { currentRoute, navigate, openBooking } = useNavigation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRoute]);

  // Determine subroute path
  const subPath = currentRoute.replace(/^\/articles\/?/, '').trim();

  // Search & Filter State for Directory View
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Dynamic articles state (Bundled ARTICLES_DATA + Live Database Articles)
  const [allArticles, setAllArticles] = useState<ArticleItem[]>(ARTICLES_DATA);
  const [isLoadingLive, setIsLoadingLive] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadDynamicArticles() {
      try {
        setIsLoadingLive(true);
        const res = await fetchArticlesPage({ page: 0, size: 300, sortBy: 'id', sortDir: 'desc' });
        if (isMounted && res?.content?.length) {
          setAllArticles(res.content as unknown as ArticleItem[]);
        }
      } catch (err) {
        console.debug('Using bundled articles catalog fallback:', err);
      } finally {
        if (isMounted) setIsLoadingLive(false);
      }
    }
    loadDynamicArticles();
    return () => {
      isMounted = false;
    };
  }, []);

  // Detail View State
  const [selectedLang, setSelectedLang] = useState<string>('en');
  const [copiedToast, setCopiedToast] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>('');
  const [readingProgress, setReadingProgress] = useState(0);
  const [schemaModalOpen, setSchemaModalOpen] = useState(false);
  const [sitemapModalOpen, setSitemapModalOpen] = useState(false);
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [copiedSitemap, setCopiedSitemap] = useState(false);

  // Reading Progress Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setReadingProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentRoute]);

  // Social Sharing Handler
  const handleShare = async (title: string, summary: string) => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, text: summary, url });
        return;
      } catch {
        // fall back to clipboard
      }
    }
    navigator.clipboard.writeText(url);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  const handleCopyText = (text: string, type: 'schema' | 'sitemap') => {
    navigator.clipboard.writeText(text);
    if (type === 'schema') {
      setCopiedSchema(true);
      setTimeout(() => setCopiedSchema(false), 2000);
    } else {
      setCopiedSitemap(true);
      setTimeout(() => setCopiedSitemap(false), 2000);
    }
  };

  // =========================================================================
  // ROUTE DISPATCH LOGIC
  // =========================================================================

  // 1. Category View: /articles/category/:categorySlug
  if (subPath.startsWith('category/')) {
    const catSlug = subPath.replace('category/', '').trim();
    const categoryInfo = getCategoryBySlug(catSlug) || {
      name: catSlug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      slug: catSlug,
      devanagariName: 'धार्मिक लेख संग्रह',
      tagline: 'Authentic Shastric Knowledge & Heritage',
      description: `Comprehensive guide and authoritative articles regarding ${catSlug.replace(/-/g, ' ')} at Trimbakeshwar Kshetra.`,
      icon: 'temple',
    };
    const categoryArticles = allArticles.filter((a) => {
      const aCat = (a.category || '').toLowerCase().trim();
      const aCatSlug = (a.categorySlug || '').toLowerCase().trim();
      const target = catSlug.toLowerCase().trim();
      return (
        aCatSlug === target ||
        aCat.replace(/[^a-z0-9]+/g, '-') === target ||
        (a.tags && a.tags.some((t) => t.toLowerCase() === target))
      );
    });

    if (categoryArticles.length === 0 && !getCategoryBySlug(catSlug)) {
      return renderNotFound();
    }

    const pillarArticle = categoryArticles.find((a) => a.featured) || categoryArticles[0];

    return (
      <div className="bg-[#FBF6EA] text-[#211D19] min-h-screen pb-20">
        <SEO
          title={`${categoryInfo.name} Articles & Shastras | Trimbakeshwar Knowledge Hub`}
          description={categoryInfo.description}
          canonicalPath={`/articles/category/${categoryInfo.slug}`}
          keywords={[categoryInfo.name, 'Trimbakeshwar articles', 'Vedic rituals guide']}
          schema={getBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Articles', path: '/articles' },
            { name: categoryInfo.name, path: `/articles/category/${categoryInfo.slug}` },
          ])}
        />
        <InnerPageHero
          breadcrumbs={[
            { label: 'Articles', route: '/articles' },
            { label: categoryInfo.name },
          ]}
          sanskritMantra="॥ धर्मेण हीनाः पशुभिः समानाः ॥"
          title={`${categoryInfo.name} Articles`}
          nativeTitle={categoryInfo.devanagariName}
          description={categoryInfo.description}
          ctaText="All Articles"
          onCtaClick={() => navigate('/articles')}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 space-y-12">
          {/* Category Header Badge & Count */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-white border border-[#B88935]/30 rounded-2xl shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EDE3D1] text-[#C56A18] flex items-center justify-center shrink-0 border border-[#B88935]/30">
                {renderHinduCategoryIcon(categoryInfo.slug, 'w-6 h-6')}
              </div>
              <div>
                <h2 className="text-base font-bold text-[#5A1717]">
                  {categoryInfo.tagline || `${categoryInfo.name} Knowledge Hub`}
                </h2>
                <p className="text-xs text-stone-600">
                  {categoryArticles.length} {categoryArticles.length === 1 ? 'Article' : 'Articles'} verified by Vedic scholars
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/articles')}
                className="px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-[#EDE3D1] transition-colors cursor-pointer"
              >
                ← Browse Other Categories
              </button>
            </div>
          </div>

          {/* Pillar / Featured Article Spotlight if available */}
          {pillarArticle && (
            <div className="bg-gradient-to-r from-[#5A1717] to-[#3E0E0E] text-white rounded-3xl overflow-hidden shadow-xl border border-[#B88935]/40 grid grid-cols-1 md:grid-cols-12 items-center">
              <div className="md:col-span-7 p-6 sm:p-10 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[11px] font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Vedic Shastra Guide</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading leading-snug">
                  {pillarArticle.title}
                </h3>
                {pillarArticle.titleNative && (
                  <p className="text-sm font-devanagari text-amber-200/90 font-medium">
                    {pillarArticle.titleNative}
                  </p>
                )}
                <p className="text-stone-300 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                  {pillarArticle.summary}
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-amber-200/80">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    <span>{pillarArticle.author}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{pillarArticle.readingTime || pillarArticle.readTime}</span>
                  </span>
                </div>
                <div>
                  <button
                    onClick={() => navigate(`/articles/${pillarArticle.slug}` as AppRoute)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#B88935] to-[#8C631B] hover:brightness-110 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                  >
                    <span>Read Pillar Guide</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="md:col-span-5 h-64 md:h-full min-h-[260px] bg-stone-900 relative">
                <img
                  src={pillarArticle.imageUrl || pillarArticle.image}
                  alt={pillarArticle.imageAlt || pillarArticle.title}
                  className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          )}

          {/* Articles Grid in this category */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold font-heading text-[#5A1717] flex items-center gap-2 border-b border-[#B88935]/30 pb-3">
              <BookOpen className="w-5 h-5 text-[#C56A18]" />
              <span>All Articles in {categoryInfo.name}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryArticles.map((article) => renderArticleCard(article))}
            </div>
          </div>

          {/* Category FAQ Accordion */}
          <div className="bg-white border border-[#B88935]/30 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
            <div className="text-xs font-bold text-[#5A1717] uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-stone-200">
              <HelpCircle className="w-4 h-4 text-[#C56A18]" />
              <span>Frequently Asked Questions regarding {categoryInfo.name}</span>
            </div>
            <div className="space-y-3 pt-2">
              <div className="border border-stone-200 rounded-xl p-4 bg-stone-50/50">
                <div className="text-sm font-bold text-[#5A1717]">
                  Are these articles verified with authoritative Hindu scriptures?
                </div>
                <div className="text-xs text-stone-600 mt-2 leading-relaxed">
                  Yes. All articles published under {categoryInfo.name} are curated in consultation with the Pandit Shastri Parishad and Vedic Research Council of Trimbakeshwar, citing references from the Shiva Purana, Garuda Purana, and Dharma Sindhu.
                </div>
              </div>
              <div className="border border-stone-200 rounded-xl p-4 bg-stone-50/50">
                <div className="text-sm font-bold text-[#5A1717]">
                  Can I book a consultation or puja related to these topics?
                </div>
                <div className="text-xs text-stone-600 mt-2 leading-relaxed">
                  Yes, devotees can consult verified Tamrapatra-dhari Purohits at Trimbakeshwar for guidance and schedule authentic rituals through the Seva portal.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Author Profile & Archive: /articles/author/:authorSlug
  if (subPath.startsWith('author/')) {
    const authorSlug = subPath.replace('author/', '').trim();
    const author = getAuthorBySlug(authorSlug) || {
      id: authorSlug,
      name: authorSlug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      nameNative: 'वेदोक्त पंडित',
      slug: authorSlug,
      photo: '/assets/trimbak/guruji-1.jpg',
      bio: 'Authoritative contributor and Vedic researcher specializing in Trimbakeshwar Kshetra traditions.',
      designation: 'Vedic Shastra Scholar',
      expertise: ['Shiva Purana', 'Trimbakeshwar History', 'Purohit Parampara'],
      languages: ['Sanskrit', 'Marathi', 'Hindi', 'English'],
      verificationStatus: 'VERIFIED' as const,
    };

    const authorArticles = allArticles.filter((a) => {
      const target = authorSlug.toLowerCase().trim();
      return (
        (a.authorSlug && a.authorSlug.toLowerCase() === target) ||
        (a.author && a.author.toLowerCase().replace(/[^a-z0-9]+/g, '-') === target)
      );
    });

    return (
      <div className="bg-[#FBF6EA] text-[#211D19] min-h-screen pb-20">
        <SEO
          title={`${author.name} - Author & Vedic Shastra Scholar`}
          description={`Read sacred pilgrimage and Vedic ritual research articles authored by ${author.name}, ${author.designation} at Trimbakeshwar.`}
          canonicalPath={`/articles/author/${author.slug}`}
          schema={getBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Articles', path: '/articles' },
            { name: author.name, path: `/articles/author/${author.slug}` },
          ])}
        />
        <InnerPageHero
          breadcrumbs={[
            { label: 'Articles', route: '/articles' },
            { label: author.name },
          ]}
          sanskritMantra="॥ विद्या विनयेन शोभते ॥"
          title={author.name}
          nativeTitle={author.nameNative}
          description={author.designation}
          ctaText="All Authors"
          onCtaClick={() => navigate('/articles')}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 space-y-12">
          {/* Author Profile Bio Card */}
          <div className="bg-white border border-[#B88935]/30 rounded-3xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
            <div className="relative shrink-0">
              <img
                src={author.photo}
                alt={author.name}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover border-2 border-[#B88935]/40 shadow-md"
              />
              <div className="absolute -bottom-2 -right-2 bg-[#5A1717] text-amber-300 p-1.5 rounded-full border border-amber-300/40 shadow-xs" title="Verified Author">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left space-y-3">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <h1 className="text-xl sm:text-2xl font-bold font-heading text-[#5A1717]">
                  {author.name}
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-[11px] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{author.verificationStatus || 'VERIFIED'}</span>
                </span>
              </div>

              <div className="text-xs font-semibold text-[#C56A18]">
                {author.designation}
              </div>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed max-w-3xl">
                {author.bio}
              </p>

              {/* Expertise Tags & Languages */}
              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-2">
                {author.expertise?.map((exp) => (
                  <span
                    key={exp}
                    className="px-2.5 py-1 rounded-md bg-[#EDE3D1]/80 text-[11px] font-medium text-stone-700 border border-[#B88935]/20"
                  >
                    ✦ {exp}
                  </span>
                ))}
              </div>

              <div className="text-xs text-stone-500 pt-1">
                <strong>Languages:</strong> {author.languages?.join(', ') || 'Sanskrit, Marathi, Hindi, English'}
              </div>
            </div>
          </div>

          {/* Articles Published by Author */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold font-heading text-[#5A1717] flex items-center gap-2 border-b border-[#B88935]/30 pb-3">
              <BookOpen className="w-5 h-5 text-[#C56A18]" />
              <span>Articles by {author.name} ({authorArticles.length})</span>
            </h3>

            {authorArticles.length === 0 ? (
              <div className="bg-white border border-stone-200 rounded-2xl p-8 text-center text-stone-500 text-sm">
                No articles published under this author yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {authorArticles.map((article) => renderArticleCard(article))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 3. Tag Archive: /articles/tag/:tagSlug
  if (subPath.startsWith('tag/')) {
    const tagSlug = decodeURIComponent(subPath.replace('tag/', '').trim());
    const tagArticles = allArticles.filter((a) =>
      a.tags && a.tags.some((t) => t.toLowerCase().trim() === tagSlug.toLowerCase().trim())
    );

    return (
      <div className="bg-[#FBF6EA] text-[#211D19] min-h-screen pb-20">
        <SEO
          title={`Articles tagged #${tagSlug} | Trimbakeshwar Knowledge Base`}
          description={`Browse sacred research articles and pilgrim guides tagged with #${tagSlug} on Trimbakeshwar Jyotirlinga and Vedic Pooja traditions.`}
          canonicalPath={`/articles/tag/${tagSlug}`}
          schema={getBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Articles', path: '/articles' },
            { name: `#${tagSlug}`, path: `/articles/tag/${tagSlug}` },
          ])}
        />
        <InnerPageHero
          breadcrumbs={[
            { label: 'Articles', route: '/articles' },
            { label: `#${tagSlug}` },
          ]}
          sanskritMantra="॥ ज्ञानं परमं ध्येयम् ॥"
          title={`Articles Tagged #${tagSlug}`}
          nativeTitle="विषय सूची"
          description={`Exploring articles, rituals, and scriptural commentary related to #${tagSlug}.`}
          ctaText="All Articles"
          onCtaClick={() => navigate('/articles')}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 space-y-8">
          <div className="flex items-center justify-between p-4 bg-white border border-[#B88935]/30 rounded-xl">
            <span className="text-xs font-semibold text-stone-700">
              Showing {tagArticles.length} {tagArticles.length === 1 ? 'article' : 'articles'} tagged with #{tagSlug}
            </span>
            <button
              onClick={() => navigate('/articles')}
              className="text-xs text-[#5A1717] hover:underline font-bold"
            >
              Clear Tag
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tagArticles.map((article) => renderArticleCard(article))}
          </div>
        </div>
      </div>
    );
  }

  // 4. Detail View: /articles/:slug (or fallback to 404 if not found)
  if (subPath) {
    const activeArticle = allArticles.find(
      (a) => a.slug?.toLowerCase() === subPath.toLowerCase() || String(a.id) === subPath
    );

    if (!activeArticle) {
      return renderNotFound();
    }

    return renderArticleDetail(activeArticle);
  }

  // 5. Default: Main Articles Directory: /articles
  return renderDirectoryView();

  // =========================================================================
  // SUB-RENDERERS
  // =========================================================================

  // --- Article Card Renderer ---
  function renderArticleCard(article: ArticleItem) {
    const catInfo = CORE_ARTICLE_CATEGORIES.find((c) => c.name === article.category || c.slug === article.categorySlug);

    return (
      <div
        key={article.id}
        className="bg-white border border-stone-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg hover:border-[#B88935]/60 transition-all duration-300 flex flex-col group"
      >
        {/* Card Image */}
        <div className="h-48 overflow-hidden relative bg-stone-900">
          <img
            src={article.imageUrl || article.image}
            alt={article.imageAlt || article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className="px-2.5 py-1 rounded-full bg-[#5A1717]/90 text-amber-200 text-[10px] font-bold tracking-wider uppercase border border-amber-400/30 backdrop-blur-xs">
              {article.category}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[11px] text-stone-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#C56A18]" />
                <span>{formatArticleDate(article.publishedDate || article.date || article.publishedAt || article.createdAt)}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#C56A18]" />
                <span>{article.readingTime || article.readTime || '6 min read'}</span>
              </span>
            </div>

            <h4
              onClick={() => navigate(`/articles/${article.slug}` as AppRoute)}
              className="text-base font-bold font-heading text-[#5A1717] group-hover:text-[#C56A18] transition-colors leading-snug line-clamp-2 cursor-pointer"
            >
              {article.title}
            </h4>

            {article.titleNative && (
              <p className="text-xs font-devanagari text-stone-600 line-clamp-1">
                {article.titleNative}
              </p>
            )}

            <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
              {article.summary}
            </p>
          </div>

          {/* Card Footer: Author and Link */}
          <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
            <span
              onClick={(e) => {
                e.stopPropagation();
                if (article.authorSlug) {
                  navigate(`/articles/author/${article.authorSlug}` as AppRoute);
                }
              }}
              className="text-[11px] text-stone-500 hover:text-[#5A1717] font-medium truncate max-w-[170px] cursor-pointer"
            >
              {article.author}
            </span>

            <button
              onClick={() => navigate(`/articles/${article.slug}` as AppRoute)}
              className="text-[#5A1717] group-hover:text-[#C56A18] font-bold inline-flex items-center gap-1 text-xs cursor-pointer"
            >
              <span>Read</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- 404 / Article Not Found View (Section 55) ---
  function renderNotFound() {
    return (
      <div className="bg-[#FBF6EA] text-[#211D19] min-h-screen pb-20">
        <div className="bg-gradient-to-b from-[#5A1717] via-[#431111] to-[#2B0A0A] text-white pt-24 pb-16 px-4 sm:px-6 text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="relative inline-block mx-auto mb-2">
              <img
                src="/assets/purohit-profile.png"
                alt="Shri Trimbakeshwar Purohit Official Logo"
                className="w-16 h-16 rounded-full object-cover border-2 border-[#D4AF37] shadow-lg p-0.5 bg-[#5A1717]"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-500/90 text-[#3A0F0F] flex items-center justify-center border border-amber-300 shadow-xs">
                <BookOpen className="w-3 h-3" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold font-heading">
              Article Not Found
            </h1>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              The article you're looking for may have been moved, updated, or is no longer available.
            </p>
          </div>
        </div>

        <div className="max-w-xl mx-auto px-4 sm:px-6 pt-10 space-y-6">
          {/* Quick Search */}
          <div className="bg-white border border-[#B88935]/30 rounded-2xl p-5 shadow-xs">
            <div className="text-xs font-bold text-[#5A1717] uppercase tracking-wider mb-2">
              Search Articles
            </div>
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by topic, e.g. Narayan Nagbali, Kushavarta..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setSearchQuery((e.target as HTMLInputElement).value);
                    navigate('/articles');
                  }
                }}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-1 focus:ring-[#5A1717]"
              />
            </div>
          </div>

          {/* Navigation Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => navigate('/articles')}
              className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-[#5A1717] hover:bg-[#431111] text-amber-200 font-bold text-xs shadow-md transition-colors text-center cursor-pointer"
            >
              Browse All Articles
            </button>
            <button
              onClick={() => navigate('/temple')}
              className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-white border border-stone-300 hover:bg-[#EDE3D1] text-[#211D19] font-bold text-xs shadow-xs transition-colors text-center cursor-pointer"
            >
              Explore Trimbakeshwar
            </button>
            <button
              onClick={() => navigate('/puja')}
              className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-[#B88935] hover:brightness-110 text-white font-bold text-xs shadow-xs transition-colors text-center cursor-pointer"
            >
              Book Vedic Puja
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Article Detail View (Section 18, 20, 21, 64) ---
  function renderArticleDetail(activeArticle: ArticleItem) {
    const currentTranslation =
      selectedLang !== 'en' && activeArticle.translations?.[selectedLang]
        ? activeArticle.translations[selectedLang]
        : null;

    const displayTitle = currentTranslation?.title || activeArticle.title;
    const displaySubtitle = currentTranslation?.subtitle || activeArticle.subtitle || activeArticle.summary;
    const displayContent = currentTranslation?.content || activeArticle.content;
    const availableLanguages = activeArticle.languageCodes || ['en', 'hi', 'mr'];

    const relatedPujas = (activeArticle.relatedPuja || [])
      .map((pSlug) => PUJA_LIST.find((p) => p.slug === pSlug || p.id === pSlug))
      .filter(Boolean);

    const relatedGurujis = (activeArticle.relatedGuruji || [])
      .map((gId) => GURUJI_LIST.find((g) => g.id === gId))
      .filter(Boolean);

    const relatedArticlesList = getRelatedArticles(activeArticle, 3);
    const categoryInfo = CORE_ARTICLE_CATEGORIES.find((c) => c.name === activeArticle.category || c.slug === activeArticle.categorySlug);
    const authorObj = getAuthorBySlug(activeArticle.authorSlug || '') || {
      name: activeArticle.author,
      slug: activeArticle.authorSlug || 'vedic-research-council',
      photo: '/assets/trimbak/guruji-1.jpg',
      bio: 'Vedic research scholar and heritage documentation authority for Shri Kshetra Trimbakeshwar.',
      designation: activeArticle.authorDesignation || 'Vedic Shastra Scholar',
      verificationStatus: activeArticle.verificationStatus || 'VERIFIED',
    };

    const articleJsonLd = generateArticleJsonLd(activeArticle);

    const articleBreadcrumbs = getBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Articles', path: '/articles' },
      { name: activeArticle.title, path: `/articles/${activeArticle.slug}` },
    ]);

    return (
      <div className="bg-[#FBF6EA] text-[#211D19] min-h-screen pb-20">
        <SEO
          title={displayTitle}
          description={displaySubtitle || activeArticle.summary}
          canonicalPath={`/articles/${activeArticle.slug}`}
          ogImage={activeArticle.coverImage || activeArticle.imageUrl || activeArticle.image}
          ogType="article"
          articleMeta={{
            publishedTime: activeArticle.publishedDate || activeArticle.date,
            author: activeArticle.author,
            section: activeArticle.category,
            tags: activeArticle.tags,
          }}
          keywords={[
            activeArticle.title,
            activeArticle.category,
            ...(activeArticle.tags || []),
            'Trimbakeshwar guide',
            'Vedic ritual instructions',
          ]}
          schema={[articleJsonLd, articleBreadcrumbs]}
        />
        {/* Sticky Reading Progress Bar (Section 21) */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-stone-200 z-50">
          <div
            className="h-full bg-gradient-to-r from-[#B88935] to-[#C56A18] transition-all duration-150"
            style={{ width: `${readingProgress}%` }}
          />
        </div>

        {/* Hero Header & Breadcrumbs */}
        <div className="bg-gradient-to-b from-[#5A1717] via-[#431111] to-[#2B0A0A] text-white pt-24 pb-14 px-4 sm:px-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#B88935_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="max-w-4xl mx-auto relative z-10">
            {/* Breadcrumb Links */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-amber-200/80 mb-4">
              <button
                onClick={() => navigate('/articles')}
                className="hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Articles</span>
              </button>
              <span>/</span>
              {categoryInfo ? (
                <button
                  onClick={() => navigate(`/articles/category/${categoryInfo.slug}` as AppRoute)}
                  className="hover:text-white text-amber-300 font-semibold cursor-pointer"
                >
                  {categoryInfo.name}
                </button>
              ) : (
                <span className="text-amber-300">{activeArticle.category}</span>
              )}
              <span>/</span>
              <span className="text-stone-300 truncate max-w-[200px]">{activeArticle.title}</span>
            </div>

            {/* Category Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <span>{activeArticle.category}</span>
              {activeArticle.verificationStatus === 'VERIFIED' && (
                <span className="flex items-center gap-0.5 text-emerald-400 ml-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span className="text-[10px]">Verified</span>
                </span>
              )}
            </div>

            {/* Title & Native Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-white leading-tight">
              {displayTitle}
            </h1>

            {activeArticle.titleNative && selectedLang === 'en' && (
              <h2 className="text-base sm:text-lg font-devanagari text-amber-200/90 font-medium mt-2">
                {activeArticle.titleNative}
              </h2>
            )}

            {/* Metadata Bar: Date, Read Time, Updated */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-300 mt-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#B88935]" />
                <span>Published: {formatArticleDate(activeArticle.publishedDate || activeArticle.publishedAt || activeArticle.date || activeArticle.createdAt)}</span>
              </span>
              {activeArticle.updatedAt && (
                <span className="text-amber-300/80">
                  (Updated: {formatArticleDate(activeArticle.updatedAt)})
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#B88935]" />
                <span>{activeArticle.readingTime || activeArticle.readTime || '6 min read'}</span>
              </span>
            </div>

            {displaySubtitle && (
              <p className="text-stone-300 text-sm sm:text-base mt-3 max-w-3xl leading-relaxed">
                {displaySubtitle}
              </p>
            )}

            {/* Author & Action Toolbar */}
            <div className="mt-6 pt-5 border-t border-amber-900/40 flex flex-wrap items-center justify-between gap-4">
              <div
                onClick={() => {
                  if (activeArticle.authorSlug) {
                    navigate(`/articles/author/${activeArticle.authorSlug}` as AppRoute);
                  }
                }}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#B88935] to-[#8C631B] flex items-center justify-center text-amber-100 shadow-xs">
                  <TrishulIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white group-hover:text-amber-300 transition-colors">
                    {activeArticle.author || 'Vedic Research Council, Trimbakeshwar'}
                  </div>
                  <div className="text-[11px] text-amber-200/70">
                    {activeArticle.authorDesignation || 'Verified Traditional Shastra Research'}
                  </div>
                </div>
              </div>

              {/* Action Buttons: Language, Share, Print, Schema */}
              <div className="flex items-center gap-2">
                {/* Language Switcher Dropdown */}
                <div className="relative group">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/40 border border-amber-500/30 text-xs text-amber-200 hover:bg-black/60 transition-colors cursor-pointer">
                    <Languages className="w-3.5 h-3.5 text-[#B88935]" />
                    <span>Lang: {LANGUAGE_LABELS[selectedLang]?.native || 'English'}</span>
                    <ChevronDown className="w-3 h-3 text-amber-300" />
                  </div>
                  <div className="absolute right-0 top-full mt-1 w-44 bg-[#FBF6EA] border border-[#B88935]/30 rounded-xl shadow-xl py-1 z-30 hidden group-hover:block text-[#211D19]">
                    {availableLanguages.map((code) => {
                      const langMeta = LANGUAGE_LABELS[code] || { label: code, native: code };
                      const isSelected = selectedLang === code;
                      return (
                        <button
                          key={code}
                          onClick={() => setSelectedLang(code)}
                          className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[#EDE3D1] transition-colors cursor-pointer ${
                            isSelected ? 'font-bold text-[#5A1717] bg-[#EDE3D1]/70' : 'text-stone-700'
                          }`}
                        >
                          <span>{langMeta.native}</span>
                          <span className="text-[10px] text-stone-500">
                            {isSelected ? '✓' : langMeta.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Print Button */}
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs text-white transition-colors cursor-pointer"
                  title="Print friendly layout"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Print</span>
                </button>

                {/* Share Button */}
                <button
                  onClick={() => handleShare(activeArticle.title, activeArticle.summary)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs text-white transition-colors cursor-pointer active:scale-95"
                  title="Share article"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>

                {/* Schema / SEO Inspection Modal Trigger */}
                <button
                  onClick={() => setSchemaModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-xs transition-colors cursor-pointer"
                  title="View JSON-LD Schema & SEO Metadata"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Schema</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copied Toast */}
        {copiedToast && (
          <div className="fixed bottom-6 right-6 bg-[#5A1717] text-amber-100 border border-[#B88935] px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <Check className="w-4 h-4 text-[#B88935]" />
            <span>Article link copied to clipboard!</span>
          </div>
        )}

        {/* Main Content Layout */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Article Body (8 cols) */}
            <article className="lg:col-span-8 space-y-8">
              {/* Featured Image */}
              {(activeArticle.imageUrl || activeArticle.image) && (
                <div className="rounded-2xl overflow-hidden border border-[#B88935]/20 shadow-md bg-stone-900">
                  <img
                    src={activeArticle.imageUrl || activeArticle.image}
                    alt={activeArticle.imageAlt || activeArticle.title}
                    className="w-full h-64 sm:h-80 md:h-96 object-cover"
                  />
                  <div className="p-3 bg-[#EDE3D1]/90 text-[11px] text-stone-600 border-t border-[#B88935]/20 flex items-center justify-between">
                    <span>{activeArticle.imageCaption || 'Shri Trimbakeshwar Jyotirlinga Kshetra, Nashik, Maharashtra'}</span>
                    <span className="text-[#5A1717] font-semibold">Authorized Photographic Archive</span>
                  </div>
                </div>
              )}

              {/* Key Takeaways Callout Box (Section 18) */}
              {activeArticle.keyTakeaways && activeArticle.keyTakeaways.length > 0 && (
                <div className="bg-amber-50/80 border-2 border-amber-300/70 rounded-2xl p-5 shadow-xs space-y-2.5">
                  <div className="text-xs font-bold text-[#5A1717] uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C56A18]" />
                    <span>Key Takeaways & Shastra Highlights</span>
                  </div>
                  <ul className="space-y-1.5 pl-1">
                    {activeArticle.keyTakeaways.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-stone-800 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[#B88935] shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Mobile Table of Contents */}
              {activeArticle.tableOfContents && activeArticle.tableOfContents.length > 0 && (
                <div className="lg:hidden bg-white border border-[#B88935]/30 rounded-xl p-4 shadow-xs">
                  <button
                    onClick={() => setMobileTocOpen(!mobileTocOpen)}
                    className="w-full flex items-center justify-between text-xs font-bold text-[#5A1717] uppercase tracking-wider cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <ListOrdered className="w-4 h-4 text-[#C56A18]" />
                      <span>Table of Contents ({activeArticle.tableOfContents.length} Sections)</span>
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileTocOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileTocOpen && (
                    <div className="mt-3 pt-3 border-t border-stone-200 space-y-1.5">
                      {activeArticle.tableOfContents.map((toc) => (
                        <a
                          key={toc.id}
                          href={`#${toc.id}`}
                          onClick={() => setMobileTocOpen(false)}
                          className="block text-xs text-stone-700 hover:text-[#5A1717] hover:underline py-1"
                        >
                          • {toc.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Sacred Sanskrit Shloka Box */}
              {activeArticle.shloka && (
                <div className="bg-gradient-to-r from-[#EDE3D1] via-[#F4EBD9] to-[#EDE3D1] border-2 border-[#B88935]/40 rounded-2xl p-5 sm:p-6 shadow-xs relative overflow-hidden">
                  <div className="absolute -top-2 -right-2 w-16 h-16 opacity-10 select-none text-[#5A1717]">
                    <TrishulIcon className="w-full h-full" />
                  </div>
                  <div className="text-[11px] font-bold text-[#5A1717] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C56A18]" />
                    <span>Sacred Shastra Pramanam / शास्त्र प्रमाण</span>
                  </div>

                  <div className="font-devanagari text-base sm:text-lg font-bold text-[#5A1717] leading-relaxed whitespace-pre-line text-center py-2">
                    {activeArticle.shloka.sanskrit}
                  </div>

                  {activeArticle.shloka.transliteration && (
                    <div className="text-xs text-stone-600 italic text-center mt-1 border-t border-[#B88935]/20 pt-2 font-serif">
                      {activeArticle.shloka.transliteration}
                    </div>
                  )}

                  <div className="text-xs sm:text-sm text-stone-800 mt-3 pt-2 border-t border-[#B88935]/20 leading-relaxed font-body">
                    <strong className="text-[#5A1717]">Translation: </strong>
                    {activeArticle.shloka.translation}
                  </div>

                  {activeArticle.shloka.context && (
                    <div className="text-[11px] text-[#C56A18] font-medium mt-2">
                      Context: {activeArticle.shloka.context}
                    </div>
                  )}
                </div>
              )}

              {/* Article Main Text Content */}
              <div className="bg-white border border-stone-200/80 rounded-2xl p-6 sm:p-10 shadow-xs prose prose-stone max-w-none">
                <div className="text-stone-800 text-sm sm:text-base leading-relaxed space-y-5 font-body">
                  {displayContent.split('\n\n').map((paragraph, idx) => {
                    if (paragraph.startsWith('### ')) {
                      const headingText = paragraph.replace('### ', '').trim();
                      const slugId = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                      return (
                        <h3
                          key={idx}
                          id={slugId}
                          className="text-lg sm:text-xl font-heading font-bold text-[#5A1717] pt-4 pb-1 border-b border-[#B88935]/20 scroll-mt-24 flex items-center gap-2"
                        >
                          <span className="text-[#C56A18]">✦</span>
                          <span>{headingText}</span>
                        </h3>
                      );
                    }

                    if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
                      const items = paragraph
                        .split('\n')
                        .map((line) => line.replace(/^[-*]\s+/, '').trim())
                        .filter(Boolean);
                      return (
                        <ul key={idx} className="space-y-2 pl-2 my-3">
                          {items.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex items-start gap-2.5 text-stone-700 text-sm leading-relaxed">
                              <span className="text-[#C56A18] font-bold text-xs mt-1">●</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      );
                    }

                    return (
                      <p key={idx} className="leading-relaxed">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </div>

              {/* Sources & Citations Section (Section 18, 23) */}
              {activeArticle.sources && activeArticle.sources.length > 0 && (
                <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
                  <div className="text-xs font-bold text-[#5A1717] uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-stone-200">
                    <BookMarkedIcon className="w-4 h-4 text-[#C56A18]" />
                    <span>Authoritative Sources & Scripture References</span>
                  </div>
                  <ul className="space-y-2 text-xs">
                    {activeArticle.sources.map((src, sIdx) => (
                      <li key={sIdx} className="flex items-start justify-between gap-2 p-2.5 rounded-lg bg-stone-50 border border-stone-100">
                        <div>
                          <div className="font-semibold text-[#5A1717]">{src.title}</div>
                          <div className="text-stone-500 text-[11px] mt-0.5">
                            {src.publisher} {src.verseReference && `• ${src.verseReference}`}
                          </div>
                        </div>
                        {src.url && (
                          <a
                            href={src.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#C56A18] hover:underline flex items-center gap-1 shrink-0 font-medium"
                          >
                            <span>Reference</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Author Bio Box */}
              <div className="bg-[#EDE3D1]/50 border border-[#B88935]/30 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <img
                  src={authorObj.photo}
                  alt={authorObj.name}
                  className="w-20 h-20 rounded-xl object-cover border border-[#B88935]/40 shadow-xs shrink-0"
                />
                <div className="space-y-2 text-center sm:text-left flex-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h4
                      onClick={() => navigate(`/articles/author/${authorObj.slug}` as AppRoute)}
                      className="text-base font-bold text-[#5A1717] hover:text-[#C56A18] cursor-pointer"
                    >
                      {authorObj.name}
                    </h4>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      ✓ {authorObj.verificationStatus}
                    </span>
                  </div>
                  <div className="text-xs text-[#C56A18] font-semibold">{authorObj.designation}</div>
                  <p className="text-xs text-stone-600 leading-relaxed">{authorObj.bio}</p>
                  <button
                    onClick={() => navigate(`/articles/author/${authorObj.slug}` as AppRoute)}
                    className="text-xs font-bold text-[#5A1717] hover:underline inline-flex items-center gap-1 cursor-pointer pt-1"
                  >
                    <span>View all articles by this author</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* FAQ Section */}
              {activeArticle.faqs && activeArticle.faqs.length > 0 && (
                <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-stone-200">
                    <HelpCircle className="w-5 h-5 text-[#C56A18]" />
                    <h3 className="text-base font-bold font-heading text-[#5A1717]">
                      Frequently Asked Questions
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {activeArticle.faqs.map((faq, index) => {
                      const isOpen = activeFaq === index;
                      return (
                        <div key={index} className="border border-stone-200 rounded-xl overflow-hidden">
                          <button
                            onClick={() => setActiveFaq(isOpen ? null : index)}
                            className="w-full text-left p-4 bg-stone-50/50 hover:bg-stone-50 flex items-center justify-between text-xs sm:text-sm font-semibold text-[#5A1717] transition-colors cursor-pointer"
                          >
                            <span>{faq.question}</span>
                            <ChevronDown className={`w-4 h-4 text-stone-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                          </button>
                          {isOpen && (
                            <div className="p-4 text-xs sm:text-sm text-stone-700 bg-white border-t border-stone-100 leading-relaxed font-body">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tags Cloud */}
              {activeArticle.tags && activeArticle.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-[#C56A18]" />
                    <span>Tags:</span>
                  </span>
                  {activeArticle.tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => navigate(`/articles/tag/${encodeURIComponent(tag)}` as AppRoute)}
                      className="px-2.5 py-1 rounded-full bg-[#EDE3D1] hover:bg-[#B88935]/20 text-stone-700 text-xs font-medium transition-colors cursor-pointer"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              )}
            </article>

            {/* Right Column: Sticky Sidebar (4 cols) */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              {/* Desktop Sticky Table of Contents (Section 20) */}
              {activeArticle.tableOfContents && activeArticle.tableOfContents.length > 0 && (
                <div className="hidden lg:block bg-white border border-[#B88935]/30 rounded-2xl p-5 shadow-xs">
                  <div className="text-xs font-bold text-[#5A1717] uppercase tracking-wider mb-3 pb-2 border-b border-stone-100 flex items-center gap-1.5">
                    <ListOrdered className="w-4 h-4 text-[#C56A18]" />
                    <span>Table of Contents</span>
                  </div>
                  <nav className="space-y-1 text-xs">
                    {activeArticle.tableOfContents.map((toc) => (
                      <a
                        key={toc.id}
                        href={`#${toc.id}`}
                        className="block py-1.5 px-2 rounded-lg text-stone-700 hover:text-[#5A1717] hover:bg-[#EDE3D1]/50 transition-colors"
                      >
                        {toc.title}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* Puja Booking CTA Card */}
              <div className="bg-gradient-to-br from-[#5A1717] to-[#3B0E0E] text-white rounded-2xl p-6 shadow-md border border-[#B88935]/30 space-y-4">
                <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                  <Flame className="w-4 h-4 text-[#B88935]" />
                  <span>Authorized Vedic Seva</span>
                </div>
                <h4 className="text-base font-bold font-heading">
                  Planning a Holy Visit to Trimbakeshwar?
                </h4>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Perform sacred rituals with certified Tamrapatra-dhari Purohits at the original Godavari Snan Kund and Jyotirlinga sanctum.
                </p>
                <button
                  onClick={() => openBooking()}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#B88935] to-[#8C631B] hover:brightness-110 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Book Official Puja Consult
                </button>
              </div>

              {/* Related Pujas */}
              {relatedPujas.length > 0 && (
                <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs">
                  <div className="text-xs font-bold text-[#5A1717] uppercase tracking-wider mb-3 pb-2 border-b border-stone-100 flex items-center justify-between">
                    <span>Related Traditional Vidhis</span>
                    <Flame className="w-4 h-4 text-[#C56A18]" />
                  </div>
                  <div className="space-y-3">
                    {relatedPujas.map((puja) => (
                      <button
                        key={puja.slug}
                        onClick={() => navigate(`/puja/${puja.slug}` as AppRoute)}
                        className="w-full text-left p-3 rounded-xl border border-stone-200/80 hover:border-[#B88935]/50 hover:bg-[#EDE3D1]/30 transition-all group cursor-pointer"
                      >
                        <div className="text-xs font-bold text-[#5A1717] group-hover:text-[#C56A18] transition-colors">
                          {puja.name}
                        </div>
                        <div className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">
                          {puja.duration} • {puja.category}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Gurujis */}
              {relatedGurujis.length > 0 && (
                <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs">
                  <div className="text-xs font-bold text-[#5A1717] uppercase tracking-wider mb-3 pb-2 border-b border-stone-100 flex items-center justify-between">
                    <span>Authorized Gurujis</span>
                    <User className="w-4 h-4 text-[#C56A18]" />
                  </div>
                  <div className="space-y-3">
                    {relatedGurujis.map((guruji) => (
                      <div
                        key={guruji.id}
                        className="p-3 rounded-xl border border-stone-200/80 bg-stone-50/50 flex items-center gap-3"
                      >
                        <img
                          src={guruji.avatar}
                          alt={guruji.name}
                          className="w-10 h-10 rounded-full object-cover border border-[#B88935]/30"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold text-[#5A1717] truncate">{guruji.name}</div>
                          <div className="text-[10px] text-stone-500 truncate">{guruji.title}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommended Articles */}
              {relatedArticlesList.length > 0 && (
                <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs">
                  <div className="text-xs font-bold text-[#5A1717] uppercase tracking-wider mb-3 pb-2 border-b border-stone-100">
                    Recommended Reading
                  </div>
                  <div className="space-y-3">
                    {relatedArticlesList.map((rel) => (
                      <button
                        key={rel.id}
                        onClick={() => navigate(`/articles/${rel.slug || rel.id}` as AppRoute)}
                        className="w-full text-left flex items-start gap-3 group cursor-pointer"
                      >
                        <div className="w-16 h-14 rounded-lg overflow-hidden shrink-0 bg-stone-200 border border-stone-200">
                          <img
                            src={rel.imageUrl || rel.image}
                            alt={rel.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-[#5A1717] group-hover:text-[#C56A18] line-clamp-2 leading-snug">
                            {rel.title}
                          </div>
                          <div className="text-[10px] text-stone-500 mt-1 flex items-center gap-1.5">
                            <span>{formatArticleDate(rel.publishedDate || rel.date || rel.publishedAt || rel.createdAt)}</span>
                            <span>•</span>
                            <span>{rel.readTime || rel.readingTime || '6 min read'}</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>

        {/* Schema / SEO Modal (Section 64-66) */}
        {schemaModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
            <div className="bg-white border border-[#B88935] rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
              <div className="p-4 sm:p-5 bg-gradient-to-r from-[#5A1717] to-[#3E0E0E] text-white flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold">
                  <Code2 className="w-4 h-4 text-amber-300" />
                  <span>Article Schema & SEO Metadata (JSON-LD)</span>
                </div>
                <button
                  onClick={() => setSchemaModalOpen(false)}
                  className="text-stone-300 hover:text-white text-lg p-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 text-xs font-mono bg-stone-900 text-stone-200">
                <div className="flex items-center justify-between text-[11px] text-amber-400 font-sans pb-2 border-b border-stone-700">
                  <span>Schema: https://schema.org/Article</span>
                  <button
                    onClick={() => handleCopyText(JSON.stringify(articleJsonLd, null, 2), 'schema')}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-600 transition-colors cursor-pointer"
                  >
                    {copiedSchema ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedSchema ? 'Copied!' : 'Copy JSON'}</span>
                  </button>
                </div>
                <pre className="whitespace-pre-wrap leading-relaxed text-[11px]">
                  {JSON.stringify(articleJsonLd, null, 2)}
                </pre>
              </div>

              <div className="p-4 bg-stone-100 border-t border-stone-200 flex justify-end">
                <button
                  onClick={() => setSchemaModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#5A1717] text-white text-xs font-bold cursor-pointer"
                >
                  Close Viewer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // --- Main Articles Directory View (/articles) ---
  function renderDirectoryView() {
    const featuredArticle = allArticles.find((a) => a.featured) || allArticles[0];

    // Filtered articles list
    const filteredArticles = allArticles.filter((article) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        article.category === selectedCategory ||
        article.categorySlug === selectedCategory.toLowerCase().replace(/[^a-z0-9]+/g, '-');

      const matchesTag =
        !selectedTag || (article.tags && article.tags.includes(selectedTag));

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        (article.titleNative && article.titleNative.toLowerCase().includes(query)) ||
        article.summary.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query) ||
        (article.tags && article.tags.some((t) => t.toLowerCase().includes(query)));

      return matchesCategory && matchesTag && matchesSearch;
    });

    const sitemapXml = generateXmlSitemap();

    return (
      <div className="bg-[#FBF6EA] text-[#211D19] min-h-screen pb-20">
        <SEO
          title="Vedic Articles & Pilgrimage Guides | Trimbakeshwar Shastric Knowledge Hub"
          description="Explore comprehensive research articles on Trimbakeshwar Jyotirlinga history, Narayan Nagbali vidhis, Kaal Sarp Yog, Pitru Shradha, Godavari origins, and pilgrim travel."
          canonicalPath="/articles"
          keywords={[
            'Trimbakeshwar articles',
            'Narayan Nagbali vidhi guide',
            'Kaal Sarp dosh explanation',
            'Trimbakeshwar history',
            'Godavari origin Brahmagiri',
          ]}
          schema={getBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Articles', path: '/articles' },
          ])}
        />
        {/* Hero Header */}
        <InnerPageHero
          breadcrumbs={[{ label: 'Articles' }]}
          sanskritMantra="॥ धर्मो रक्षति रक्षितः • सत्यं वद धर्मं चर ॥"
          title="Spiritual Articles & Vedic Knowledge"
          nativeTitle="धार्मिक लेख व आध्यात्मिक मार्गदर्शन"
          description="Authentic treatises, scriptural references, and ritual guides on Trimbakeshwar Jyotirlinga, Narayan Nagbali, ancestral peace, and pilgrimage traditions."
          bgImage="/assets/trimbak/jyotirlinga.webp"
          ctaText="Puja Directory"
          onCtaClick={() => navigate('/puja')}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 space-y-10">
          {/* Search, Categories, and Tools Header */}
          <div className="bg-white border border-[#B88935]/30 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
            {/* Top Search Input */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles by title, topic (e.g. Narayan Nagbali, Kushavarta, How to reach, Brahmagiri)..."
                  className="w-full pl-12 pr-10 py-3 rounded-xl border border-stone-300 focus:border-[#5A1717] focus:ring-1 focus:ring-[#5A1717] text-sm text-stone-800 placeholder-stone-400 bg-stone-50/50"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Sitemap Inspection Button */}
              <button
                onClick={() => setSitemapModalOpen(true)}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl border border-[#B88935]/40 text-[#5A1717] hover:bg-[#EDE3D1] text-xs font-bold transition-colors shrink-0 cursor-pointer"
                title="View XML Sitemap"
              >
                <FileCode className="w-4 h-4 text-[#C56A18]" />
                <span>XML Sitemap</span>
              </button>
            </div>

            {/* Core Category Filter Pills */}
            <div>
              <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Core Categories (10)</span>
                {selectedTag && (
                  <button
                    onClick={() => setSelectedTag(null)}
                    className="text-[#C56A18] hover:underline font-normal text-xs cursor-pointer"
                  >
                    Clear Tag Filter (#{selectedTag})
                  </button>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {ARTICLES_CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setSelectedTag(null);
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#5A1717] text-amber-200 shadow-xs'
                          : 'bg-[#EDE3D1] text-stone-700 hover:bg-[#B88935]/20 hover:text-[#5A1717]'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Top Featured Spotlight Card (Only on 'All' and no search filter) */}
          {selectedCategory === 'All' && !searchQuery && !selectedTag && featuredArticle && (
            <div className="bg-gradient-to-r from-[#5A1717] to-[#3E0E0E] text-white rounded-3xl overflow-hidden shadow-xl border border-[#B88935]/40 grid grid-cols-1 md:grid-cols-12 items-center">
              <div className="md:col-span-7 p-6 sm:p-10 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[11px] font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Vedic Shastra Study</span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-heading leading-snug">
                  {featuredArticle.title}
                </h3>
                {featuredArticle.titleNative && (
                  <p className="text-sm font-devanagari text-amber-200/90 font-medium">
                    {featuredArticle.titleNative}
                  </p>
                )}
                <p className="text-stone-300 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                  {featuredArticle.summary}
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-amber-200/80">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    <span>{featuredArticle.author}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-300" />
                    <span>{formatArticleDate(featuredArticle.publishedDate || featuredArticle.date || featuredArticle.publishedAt || featuredArticle.createdAt)}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{featuredArticle.readingTime || featuredArticle.readTime || '8 min read'}</span>
                  </span>
                </div>
                <div>
                  <button
                    onClick={() => navigate(`/articles/${featuredArticle.slug}` as AppRoute)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#B88935] to-[#8C631B] hover:brightness-110 text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer active:scale-95"
                  >
                    <span>Read Full Treatise</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="md:col-span-5 h-64 md:h-full min-h-[300px] bg-stone-900 relative">
                <img
                  src={featuredArticle.imageUrl || featuredArticle.image}
                  alt={featuredArticle.imageAlt || featuredArticle.title}
                  className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          )}

          {/* 10 Core Categories Showcase Bar */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold font-heading text-[#5A1717] flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#C56A18]" />
                <span>Explore by Pillar Topics</span>
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {CORE_ARTICLE_CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => navigate(`/articles/category/${cat.slug}` as AppRoute)}
                  className="p-3.5 bg-white border border-stone-200 hover:border-[#B88935] rounded-xl text-left transition-all hover:shadow-sm group cursor-pointer"
                >
                  <div className="mb-2 text-[#C56A18] group-hover:text-[#5A1717] transition-colors">
                    {renderHinduCategoryIcon(cat.slug, 'w-5 h-5')}
                  </div>
                  <div className="text-xs font-bold text-[#5A1717] group-hover:text-[#C56A18] line-clamp-1">
                    {cat.name}
                  </div>
                  <div className="text-[10px] text-stone-500 line-clamp-1 mt-0.5">
                    {cat.devanagariName}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#B88935]/20 pb-3">
              <h3 className="text-lg font-bold font-heading text-[#5A1717]">
                {selectedCategory === 'All' ? 'All Published Articles' : `${selectedCategory} Articles`} ({filteredArticles.length})
              </h3>
              {searchQuery && (
                <span className="text-xs text-stone-500">
                  Search query: &quot;{searchQuery}&quot;
                </span>
              )}
            </div>

            {filteredArticles.length === 0 ? (
              <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center space-y-3">
                <BookOpen className="w-8 h-8 text-stone-400 mx-auto" />
                <div className="text-base font-bold text-stone-700">No articles matched your criteria</div>
                <p className="text-xs text-stone-500">
                  Try adjusting your search terms or selecting a different category.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setSelectedTag(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#5A1717] text-white text-xs font-bold cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => renderArticleCard(article))}
              </div>
            )}
          </div>

          {/* Author Directory Section */}
          <div className="bg-white border border-[#B88935]/30 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <h3 className="text-base font-bold font-heading text-[#5A1717] flex items-center gap-2">
                  <User className="w-4 h-4 text-[#C56A18]" />
                  <span>Vedic Authors & Editorial Shastris</span>
                </h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  Respected authorities contributing authentic scriptural treatises on Trimbakeshwar
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {AUTHORS_DATA.map((auth) => (
                <div
                  key={auth.slug}
                  onClick={() => navigate(`/articles/author/${auth.slug}` as AppRoute)}
                  className="p-4 rounded-2xl border border-stone-200 hover:border-[#B88935] bg-stone-50/50 hover:bg-[#EDE3D1]/40 transition-all cursor-pointer group text-center flex flex-col items-center"
                >
                  <img
                    src={auth.photo}
                    alt={auth.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#B88935]/40 mb-3 shadow-xs"
                  />
                  <div className="text-xs font-bold text-[#5A1717] group-hover:text-[#C56A18] line-clamp-1">
                    {auth.name}
                  </div>
                  <div className="text-[10px] text-[#C56A18] font-semibold mt-0.5 line-clamp-1">
                    {auth.designation}
                  </div>
                  <div className="text-[10px] text-stone-500 mt-2 line-clamp-2">
                    {auth.expertise.slice(0, 2).join(' • ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* XML Sitemap Modal (Section 64) */}
        {sitemapModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
            <div className="bg-white border border-[#B88935] rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
              <div className="p-4 sm:p-5 bg-gradient-to-r from-[#5A1717] to-[#3E0E0E] text-white flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold">
                  <FileCode className="w-4 h-4 text-amber-300" />
                  <span>XML Sitemap (Sitemaps Protocol 0.9 & Hreflang Alternates)</span>
                </div>
                <button
                  onClick={() => setSitemapModalOpen(false)}
                  className="text-stone-300 hover:text-white text-lg p-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 text-xs font-mono bg-stone-900 text-stone-200">
                <div className="flex items-center justify-between text-[11px] text-amber-400 font-sans pb-2 border-b border-stone-700">
                  <span>Dynamic Sitemap containing {allArticles.length} Articles & {CORE_ARTICLE_CATEGORIES.length} Categories</span>
                  <button
                    onClick={() => handleCopyText(sitemapXml, 'sitemap')}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-600 transition-colors cursor-pointer"
                  >
                    {copiedSitemap ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedSitemap ? 'Copied!' : 'Copy XML'}</span>
                  </button>
                </div>
                <pre className="whitespace-pre-wrap leading-relaxed text-[11px]">
                  {sitemapXml}
                </pre>
              </div>

              <div className="p-4 bg-stone-100 border-t border-stone-200 flex justify-end">
                <button
                  onClick={() => setSitemapModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#5A1717] text-white text-xs font-bold cursor-pointer"
                >
                  Close Sitemap
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

// Inline BookMarked icon wrapper if lucide-react name is BookMarked
function BookMarkedIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
      <path d="M10 2v10l3-2.5 3 2.5V2" />
    </svg>
  );
}
