import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  Sparkles,
  Trash2,
  Pencil,
  Eye,
  CheckCircle2,
  Clock,
  User,
  Tag,
  X,
  ExternalLink,
  Layers,
  Calendar,
  AlertCircle,
  FileText,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Upload,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import {
  ArticleRecord,
  ArticleCreatePayload,
  ArticleStats,
  fetchArticlesPage,
  fetchArticleStats,
  createArticle,
  updateArticle,
  deleteArticle,
  uploadArticleImage,
  formatArticleDate,
} from '../../services/articleService';
import { CORE_ARTICLE_CATEGORIES } from '../../data/articlesData';

type ArticleSortField = 'id' | 'title' | 'category' | 'createdAt';

const ARTICLE_CATEGORIES_LIST = [
  'All',
  'Vedic Rituals & Shanti Vidhi',
  'Temple History & Architecture',
  'Pilgrimage Guide',
  'Sacred Places',
  'Festivals & Utsavs',
  'Spiritual Knowledge',
  'Cultural Heritage',
  'Mahatmya & Puranas',
];

const PRESET_IMAGES = [
  { label: 'Temple Shikhara', url: '/assets/trimbak/temple-shikhara.webp' },
  { label: 'Trimbakeshwar Temple', url: '/assets/trimbak/trimbakeshwar-temple.webp' },
  { label: 'Jyotirlinga Sanctum', url: '/assets/trimbak/jyotirlinga.webp' },
  { label: 'Kushavarta Kund', url: '/assets/trimbak/kushavarta-tirtha.webp' },
  { label: 'Narayan Nagbali Havan', url: '/assets/trimbak/havan-kund.webp' },
  { label: 'Brahmagiri Mountain', url: '/assets/trimbak/brahmagiri-mountain.webp' },
  { label: 'Golden Trimbak Mukut', url: '/assets/trimbak/mukut-trimbak.webp' },
  { label: 'Mahashivratri Utsav', url: '/assets/trimbak/mahashivratri.webp' },
];

export function AdminArticlesModule() {
  const [articles, setArticles] = useState<ArticleRecord[]>([]);
  const [stats, setStats] = useState<ArticleStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);

  // Filters & Sorting (Date Added by default)
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'scheduled' | 'draft'>('all');
  const [sortBy, setSortBy] = useState<ArticleSortField>('id');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const PAGE_SIZE = 9;

  // Modals
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<ArticleRecord | null>(null);
  const [deleteConfirmArticle, setDeleteConfirmArticle] = useState<ArticleRecord | null>(null);
  const [previewArticle, setPreviewArticle] = useState<ArticleRecord | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Debounce search
  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(val.trim());
      setCurrentPage(0);
    }, 350);
  };

  // Sort toggle handler
  const handleSort = (field: ArticleSortField) => {
    if (sortBy === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortDir('desc');
    }
    setCurrentPage(0);
  };

  const SortIcon = ({ field }: { field: ArticleSortField }) => {
    if (sortBy !== field) return <ArrowUpDown className="w-3 h-3 opacity-40" />;
    return sortDir === 'asc' ? <ArrowUp className="w-3 h-3 text-amber-400" /> : <ArrowDown className="w-3 h-3 text-amber-400" />;
  };

  // Load articles
  const loadArticles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchArticlesPage({
        page: currentPage,
        size: PAGE_SIZE,
        search: debouncedSearch,
        category: categoryFilter,
        status: statusFilter === 'all' ? '' : statusFilter,
        sortBy,
        sortDir,
      });
      setArticles(res.content);
      setTotalPages(res.totalPages);
      setTotalElements(res.totalElements);
    } catch (err) {
      console.error('Error loading articles:', err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, debouncedSearch, categoryFilter, statusFilter, sortBy, sortDir]);

  // Load stats
  const loadStats = useCallback(async () => {
    setStatsLoading(true);
    try {
      const s = await fetchArticleStats();
      setStats(s);
    } catch { /* ignore */ } finally {
      setStatsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  // Delete article
  const handleDelete = async () => {
    if (!deleteConfirmArticle) return;
    setDeleting(true);
    try {
      await deleteArticle(deleteConfirmArticle.id);
      showToast(`Article "${deleteConfirmArticle.title}" deleted.`);
      setDeleteConfirmArticle(null);
      loadArticles();
      loadStats();
    } catch (err) {
      alert('Failed to delete article');
    } finally {
      setDeleting(false);
    }
  };

  const startRecord = totalElements === 0 ? 0 : currentPage * PAGE_SIZE + 1;
  const endRecord = Math.min((currentPage + 1) * PAGE_SIZE, totalElements);

  return (
    <div className="space-y-6 pb-28">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#2B0E0E] text-amber-200 border border-[#D4AF37] px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-semibold animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Module Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#180B08]/90 border border-amber-500/20 backdrop-blur-md shadow-lg">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-300 text-[10px] font-bold uppercase tracking-wider font-devanagari mb-1">
            शास्त्र ग्रंथ • ब्लॉग व्यवस्थापन
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-amber-100 flex items-center gap-2.5">
            <BookOpen className="w-6 h-6 text-amber-400" />
            <span>Articles & Spiritual Blogs Manager</span>
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">
            Manage Vedic treatises, Puranic guides, and pilgrimage blogs rendered dynamically across the portal.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => { loadArticles(); loadStats(); }}
            className="p-2.5 rounded-xl bg-black/40 hover:bg-black/60 border border-amber-500/20 text-stone-300 hover:text-amber-200 transition-colors cursor-pointer"
            title="Refresh Articles"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setEditingArticle(null);
              setIsFormModalOpen(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-[#D4AF37] to-[#B88935] hover:brightness-110 text-[#211D19] text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Create Article / Blog</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-[#180B08]/80 border border-amber-500/20 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-amber-100">{stats?.totalArticles ?? '…'}</div>
            <div className="text-[11px] text-stone-400">Total Articles</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#180B08]/80 border border-amber-500/20 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-emerald-300">{stats?.publishedCount ?? '…'}</div>
            <div className="text-[11px] text-stone-400">Published Active</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#180B08]/80 border border-amber-500/20 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-300 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-amber-300">{stats?.scheduledCount ?? 0}</div>
            <div className="text-[11px] text-stone-400">Scheduled Auto-Publish</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#180B08]/80 border border-amber-500/20 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-stone-500/10 text-stone-400 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-stone-300">{stats?.draftCount ?? 0}</div>
            <div className="text-[11px] text-stone-400">Draft Treatises</div>
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar with WRAPPED CHIPS */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#180B08]/80 border border-amber-500/20 space-y-3.5 shadow-md">
        {/* Top search & status tabs */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by title, shastra topic, author, or ritual tags..."
              className="w-full pl-10 pr-8 py-2 rounded-xl bg-black/40 border border-amber-500/20 text-xs text-stone-200 placeholder-stone-500 focus:outline-hidden focus:ring-1 focus:ring-amber-400"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-auto bg-black/40 p-1 rounded-xl border border-amber-500/20 text-xs">
            {(['all', 'published', 'scheduled', 'draft'] as const).map((s) => (
              <button
                key={s}
                onClick={() => { setStatusFilter(s); setCurrentPage(0); }}
                className={`px-3 py-1 rounded-lg font-semibold capitalize transition-all cursor-pointer ${
                  statusFilter === s
                    ? 'bg-amber-400 text-[#211D19] shadow-xs'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                {s === 'scheduled' ? 'Scheduled (IST)' : s}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Chips (Wrapped into multiple lines to avoid horizontal scroll) */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-amber-500/10 text-xs">
          <div className="flex items-center gap-1 text-amber-400/80 font-semibold mr-1 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Category:</span>
          </div>
          {ARTICLE_CATEGORIES_LIST.map((cat) => {
            const isActive = categoryFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => { setCategoryFilter(cat); setCurrentPage(0); }}
                className={`px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-amber-400 text-[#211D19] border-amber-400 font-bold shadow-xs'
                    : 'bg-black/30 text-stone-400 border-amber-500/20 hover:border-amber-400/40 hover:text-amber-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Row 3: Sort bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-amber-500/10 text-xs text-stone-400">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-stone-400 font-mono mr-1">Sort:</span>
            {([
              { field: 'id', label: 'Date Added' },
              { field: 'title', label: 'Title (A–Z)' },
              { field: 'category', label: 'Category' },
            ] as const).map(({ field, label }) => (
              <button
                key={field}
                onClick={() => handleSort(field)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-colors border cursor-pointer ${
                  sortBy === field
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 font-semibold'
                    : 'bg-black/40 text-stone-400 border-stone-800 hover:text-stone-200'
                }`}
              >
                <span>{label}</span>
                <SortIcon field={field} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles Grid / List View */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 rounded-2xl bg-[#180B08]/60 border border-amber-500/10 animate-pulse p-4 space-y-3">
              <div className="h-32 bg-stone-800 rounded-xl" />
              <div className="h-4 bg-stone-800 rounded w-3/4" />
              <div className="h-3 bg-stone-800 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : articles.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#180B08]/60 border border-amber-500/20 space-y-3">
          <BookOpen className="w-10 h-10 text-stone-600 mx-auto" />
          <h4 className="text-base font-bold text-amber-200">No articles matched your criteria</h4>
          <p className="text-xs text-stone-400 max-w-sm mx-auto">
            Try adjusting your search terms or category filter, or create a new article.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setDebouncedSearch('');
              setCategoryFilter('All');
              setStatusFilter('all');
            }}
            className="px-4 py-2 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold hover:bg-amber-400/30 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((art) => (
            <div
              key={art.id}
              className="rounded-2xl bg-[#180B08]/90 border border-amber-500/20 hover:border-amber-400/50 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              {/* Cover Image Header */}
              <div className="relative h-40 overflow-hidden bg-stone-900">
                <img
                  src={art.coverImage || art.image}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/trimbak/temple-shikhara.webp';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#180B08] via-transparent to-transparent" />

                {/* Top Left Badges */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#180B08]/90 text-amber-300 border border-amber-500/30 backdrop-blur-xs">
                    {art.category}
                  </span>
                </div>

                {/* Top Right Status Badge */}
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
                  {art.status === 'scheduled' ? (
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/90 text-stone-950 flex items-center gap-1 shadow-xs">
                      <Clock className="w-3 h-3" />
                      <span>Scheduled IST</span>
                    </span>
                  ) : art.status === 'draft' ? (
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-stone-800/90 text-stone-300 border border-stone-600 shadow-xs">
                      Draft
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-600/90 text-white shadow-xs">
                      Published
                    </span>
                  )}
                </div>

                <div className="absolute bottom-2 left-3 right-3 text-amber-200/90 text-xs font-devanagari font-semibold truncate">
                  {art.titleNative}
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h3 className="text-sm font-bold text-amber-100 font-heading line-clamp-2 leading-snug group-hover:text-amber-300 transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed font-sans">
                    {art.summary}
                  </p>
                </div>

                {/* Tags preview */}
                {art.tags && art.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {art.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md text-[10px] bg-black/40 text-stone-400 border border-amber-500/10 truncate max-w-[130px]"
                      >
                        #{tag}
                      </span>
                    ))}
                    {art.tags.length > 3 && (
                      <span className="text-[10px] text-stone-500 self-center">
                        +{art.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Footer Metadata & Action Buttons */}
                <div className="pt-3 border-t border-amber-500/15 flex items-center justify-between text-xs text-stone-400">
                  <div className="flex items-center gap-2 text-[11px] text-stone-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-amber-400" />
                      <span>{formatArticleDate(art.publishedDate || art.date || art.publishedAt || art.createdAt)}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{art.readingTime || art.readTime || '6 min read'}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* View Preview Button */}
                    <button
                      onClick={() => setPreviewArticle(art)}
                      className="p-1.5 rounded-lg bg-black/40 hover:bg-black/60 text-stone-300 hover:text-amber-200 border border-amber-500/20 transition-colors cursor-pointer"
                      title="Preview Article"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>

                    {/* Edit Button */}
                    <button
                      onClick={() => {
                        setEditingArticle(art);
                        setIsFormModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 transition-colors cursor-pointer"
                      title="Edit Article"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => setDeleteConfirmArticle(art)}
                      className="p-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 transition-colors cursor-pointer"
                      title="Delete Article"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── Server-Side Style Pagination Bar (Fixed Docked to Bottom & Edges - Copied from Payment Module) ─── */}
      {totalElements > 0 && (
        <div className="fixed bottom-14 lg:bottom-0 left-0 lg:left-64 right-0 z-30 flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 py-3 bg-[#120705]/95 backdrop-blur-xl border-t border-amber-500/30 shadow-[0_-8px_25px_rgba(0,0,0,0.7)] text-xs">
          <div className="text-stone-400 font-mono text-[11px]">
            Showing <span className="text-amber-300 font-bold">{startRecord}</span> to{' '}
            <span className="text-amber-300 font-bold">{endRecord}</span> of{' '}
            <span className="text-stone-200 font-bold">{totalElements}</span> entries ({PAGE_SIZE} per page)
          </div>

          <div className="flex items-center gap-1.5">
            <PageBtn
              icon={<ChevronsLeft className="w-3.5 h-3.5" />}
              onClick={() => setCurrentPage(0)}
              disabled={currentPage === 0}
              title="First page"
            />
            <PageBtn
              icon={<ChevronLeft className="w-3.5 h-3.5" />}
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              title="Previous page"
            />

            {/* Page number buttons */}
            {Array.from({ length: Math.min(5, Math.max(1, totalPages)) }, (_, i) => {
              const start = Math.max(0, Math.min(currentPage - 2, Math.max(0, totalPages - 5)));
              const p = start + i;
              if (p >= totalPages) return null;
              return (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`w-7 h-7 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                    p === currentPage
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 font-bold shadow'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  {p + 1}
                </button>
              );
            })}

            <PageBtn
              icon={<ChevronRight className="w-3.5 h-3.5" />}
              onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage >= totalPages - 1}
              title="Next page"
            />
            <PageBtn
              icon={<ChevronsRight className="w-3.5 h-3.5" />}
              onClick={() => setCurrentPage(totalPages - 1)}
              disabled={currentPage >= totalPages - 1}
              title="Last page"
            />
          </div>
        </div>
      )}

      {/* CREATE / EDIT ARTICLE MODAL */}
      {isFormModalOpen && (
        <ArticleFormModal
          article={editingArticle}
          onClose={() => {
            setIsFormModalOpen(false);
            setEditingArticle(null);
          }}
          onSaved={() => {
            setIsFormModalOpen(false);
            setEditingArticle(null);
            showToast(editingArticle ? 'Article updated successfully!' : 'Article created and published!');
            loadArticles();
            loadStats();
          }}
        />
      )}

      {/* ARTICLE PREVIEW MODAL */}
      {previewArticle && (
        <ArticlePreviewModal
          article={previewArticle}
          onClose={() => setPreviewArticle(null)}
        />
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#180B08] border border-amber-500/30 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-amber-100">Delete this Article?</h3>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Are you sure you want to remove &quot;{deleteConfirmArticle.title}&quot;? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-2.5 pt-2">
              <button
                onClick={() => setDeleteConfirmArticle(null)}
                className="flex-1 py-2 rounded-xl bg-black/40 text-stone-300 border border-stone-700 hover:bg-black/60 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md cursor-pointer disabled:opacity-50"
              >
                {deleting ? 'Deleting…' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── FORM MODAL COMPONENT ─────────────────────────────────────────────────────

interface ArticleFormModalProps {
  article: ArticleRecord | null;
  onClose: () => void;
  onSaved: () => void;
}

function ArticleFormModal({ article, onClose, onSaved }: ArticleFormModalProps) {
  const [title, setTitle] = useState(article?.title || '');
  const [titleNative, setTitleNative] = useState(article?.titleNative || '');
  const [subtitle, setSubtitle] = useState(article?.subtitle || '');
  const [slug, setSlug] = useState(article?.slug || '');
  const [category, setCategory] = useState(article?.category || 'Vedic Rituals & Shanti Vidhi');
  const [summary, setSummary] = useState(article?.summary || '');
  const [content, setContent] = useState(article?.content || '');
  const [coverImage, setCoverImage] = useState(article?.coverImage || article?.image || '/assets/trimbak/temple-shikhara.webp');
  
  // Image upload & source states
  const [imageSource, setImageSource] = useState<'upload' | 'preset' | 'url'>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [author, setAuthor] = useState(article?.author || 'Pt. Pravin Shambhu Deshmukh (Desai)');
  const [authorDesignation, setAuthorDesignation] = useState(article?.authorDesignation || 'Hereditary Trimbak Purohit (25th Generation)');
  const [readingTime, setReadingTime] = useState(article?.readingTime || '6 min read');
  const [tags, setTags] = useState(article?.tags?.join(', ') || '');
  const [keyTakeaways, setKeyTakeaways] = useState(article?.keyTakeaways?.join('\n') || '');
  const [scheduledPublishAt, setScheduledPublishAt] = useState(article?.scheduledPublishAt ? article.scheduledPublishAt.slice(0, 16) : '');
  const [status, setStatus] = useState<'published' | 'scheduled' | 'draft' | 'archived'>(article?.status || 'published');

  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds the 10MB limit.');
      return;
    }
    setSelectedFile(file);
    const localUrl = URL.createObjectURL(file);
    setFilePreview(localUrl);

    // Upload directly to backend to get live persistent URL
    setUploadingImage(true);
    try {
      const res = await uploadArticleImage(file);
      if (res?.url) {
        setCoverImage(res.url);
      }
    } catch (err) {
      console.warn('Backend upload fallback:', err);
    } finally {
      setUploadingImage(false);
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = 'English title is required';
    if (!summary.trim()) errs.summary = 'Summary / excerpt is required';
    if (!content.trim()) errs.content = 'Full content is required';
    if (!category.trim()) errs.category = 'Category is required';
    if (status === 'scheduled' && !scheduledPublishAt) {
      errs.scheduledPublishAt = 'Please select scheduled publish date & time in Indian Standard Time (IST)';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    try {
      const payload: ArticleCreatePayload = {
        title: title.trim(),
        titleNative: titleNative.trim() || title.trim(),
        subtitle: subtitle.trim(),
        slug: slug.trim() || undefined,
        category: category.trim(),
        summary: summary.trim(),
        content: content.trim(),
        coverImage: coverImage.trim(),
        author: author.trim(),
        authorDesignation: authorDesignation.trim(),
        readingTime: readingTime.trim(),
        tags: tags.split(',').map((s) => s.trim()).filter(Boolean),
        keyTakeaways: keyTakeaways.split('\n').map((s) => s.trim()).filter(Boolean),
        status,
        scheduledPublishAt: status === 'scheduled' ? scheduledPublishAt : undefined,
      };

      if (article) {
        await updateArticle(article.id, payload, selectedFile || undefined);
      } else {
        await createArticle(payload, selectedFile || undefined);
      }
      onSaved();
    } catch (err) {
      alert('Error saving article. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#180B08] border border-amber-500/30 rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl my-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-amber-500/20 shrink-0">
          <div>
            <h3 className="text-lg font-bold text-amber-100 font-heading">
              {article ? 'Edit Article / Blog' : 'Create New Article / Blog'}
            </h3>
            <p className="text-xs text-stone-400">
              Fill in the article details below to publish directly into the portal.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-black/40 hover:bg-black/60 text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSave} className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          {/* Row 1: Title (English) & Native Title */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-stone-300 font-semibold mb-1">
                Article Title (English) *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Complete Shastric Guide to Narayan Nagbali"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-black/40 border text-stone-100 placeholder-stone-500 focus:outline-hidden focus:ring-1 focus:ring-amber-400 ${
                  errors.title ? 'border-rose-500' : 'border-amber-500/25'
                }`}
              />
              {errors.title && <p className="text-rose-400 text-[10px] mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-stone-300 font-semibold mb-1">
                Native Title (Devanagari / मराठी / हिंदी)
              </label>
              <input
                type="text"
                value={titleNative}
                onChange={(e) => setTitleNative(e.target.value)}
                placeholder="उदा. नारायण नागबळी पूजा संपूर्ण विधी व महत्त्व"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-amber-500/25 text-stone-100 placeholder-stone-500 font-devanagari focus:outline-hidden focus:ring-1 focus:ring-amber-400"
              />
            </div>
          </div>

          {/* Row 2: Category & Slug */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-stone-300 font-semibold mb-1">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-amber-500/25 text-stone-100 focus:outline-hidden focus:ring-1 focus:ring-amber-400"
              >
                {ARTICLE_CATEGORIES_LIST.filter((c) => c !== 'All').map((cat) => (
                  <option key={cat} value={cat} className="bg-[#180B08] text-stone-200">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-stone-300 font-semibold mb-1">
                Custom URL Slug (Optional)
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="auto-generated-from-title"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-amber-500/25 text-stone-100 placeholder-stone-500 font-mono text-[11px] focus:outline-hidden focus:ring-1 focus:ring-amber-400"
              />
            </div>
          </div>

          {/* Summary / Excerpt */}
          <div>
            <label className="block text-stone-300 font-semibold mb-1">
              Summary / Excerpt (Max 300 words) *
            </label>
            <textarea
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Concise, captivating summary shown on cards and SEO previews..."
              className={`w-full px-3.5 py-2 rounded-xl bg-black/40 border text-stone-100 placeholder-stone-500 focus:outline-hidden focus:ring-1 focus:ring-amber-400 ${
                errors.summary ? 'border-rose-500' : 'border-amber-500/25'
              }`}
            />
            {errors.summary && <p className="text-rose-400 text-[10px] mt-1">{errors.summary}</p>}
          </div>

          {/* Full Content */}
          <div>
            <label className="block text-stone-300 font-semibold mb-1">
              Full Article Body / Content *
            </label>
            <textarea
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write the complete article treatise here. Supports paragraphs and bullet points..."
              className={`w-full px-3.5 py-2.5 rounded-xl bg-black/40 border text-stone-100 placeholder-stone-500 font-sans focus:outline-hidden focus:ring-1 focus:ring-amber-400 ${
                errors.content ? 'border-rose-500' : 'border-amber-500/25'
              }`}
            />
            {errors.content && <p className="text-rose-400 text-[10px] mt-1">{errors.content}</p>}
          </div>

          {/* Cover Image Selector (Upload From Device / Presets / Direct URL) */}
          <div className="space-y-3 p-4 rounded-2xl bg-black/30 border border-amber-500/20">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label className="text-stone-200 font-semibold flex items-center gap-1.5 text-xs">
                <Upload className="w-3.5 h-3.5 text-amber-400" />
                <span>Article Banner / Cover Image *</span>
              </label>
              <div className="flex rounded-lg bg-black/60 p-0.5 border border-amber-500/20 text-[10px]">
                <button
                  type="button"
                  onClick={() => setImageSource('upload')}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                    imageSource === 'upload'
                      ? 'bg-gradient-to-r from-amber-400 to-[#B88935] text-stone-950 font-bold shadow'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Upload Image
                </button>
                <button
                  type="button"
                  onClick={() => setImageSource('preset')}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                    imageSource === 'preset'
                      ? 'bg-gradient-to-r from-amber-400 to-[#B88935] text-stone-950 font-bold shadow'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Temple Presets
                </button>
                <button
                  type="button"
                  onClick={() => setImageSource('url')}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                    imageSource === 'url'
                      ? 'bg-gradient-to-r from-amber-400 to-[#B88935] text-stone-950 font-bold shadow'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Image URL
                </button>
              </div>
            </div>

            {imageSource === 'upload' && (
              <div className="space-y-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-amber-500/30 hover:border-amber-400 rounded-2xl p-5 text-center cursor-pointer transition-colors bg-black/20 hover:bg-black/40 group"
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-amber-400/10 group-hover:bg-amber-400/20 text-amber-400 flex items-center justify-center transition-colors">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-amber-200">
                        Click to browse or drop image file here
                      </span>
                      <p className="text-[10px] text-stone-400 mt-0.5">
                        Supports JPG, PNG, WEBP (Max 10MB) — Stores to uploads/articles
                      </p>
                    </div>
                  </div>
                </div>

                {(filePreview || selectedFile || (coverImage && !coverImage.startsWith('/assets/'))) && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-amber-500/20">
                    <img
                      src={filePreview || coverImage}
                      alt="Preview"
                      className="w-16 h-12 rounded-lg object-cover border border-amber-500/30 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-amber-100 truncate">
                        {selectedFile ? selectedFile.name : 'Uploaded Cover Image'}
                      </div>
                      <div className="text-[10px] text-stone-400 mt-0.5">
                        {uploadingImage ? (
                          <span className="text-amber-300 animate-pulse">Uploading to server…</span>
                        ) : (
                          <span className="text-emerald-400">✓ Attached & Ready</span>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFile(null);
                        setFilePreview(null);
                        setCoverImage('/assets/trimbak/temple-shikhara.webp');
                      }}
                      className="text-stone-400 hover:text-rose-400 text-xs p-1 cursor-pointer"
                      title="Remove"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            )}

            {imageSource === 'preset' && (
              <div className="space-y-2">
                <span className="text-[11px] text-stone-400">Choose from authentic curated temple photography:</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {PRESET_IMAGES.map((preset) => {
                    const isSelected = coverImage === preset.url;
                    return (
                      <button
                        type="button"
                        key={preset.url}
                        onClick={() => {
                          setCoverImage(preset.url);
                          setSelectedFile(null);
                          setFilePreview(null);
                        }}
                        className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-400/20 border-amber-400 text-amber-200 shadow-sm'
                            : 'bg-black/30 border-amber-500/15 text-stone-400 hover:text-stone-200 hover:border-amber-500/30'
                        }`}
                      >
                        <img src={preset.url} alt={preset.label} className="w-8 h-8 rounded-md object-cover shrink-0" />
                        <span className="text-[11px] font-medium leading-tight truncate">{preset.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {imageSource === 'url' && (
              <div className="space-y-2">
                <label className="text-[11px] text-stone-400">Enter custom image or CDN URL:</label>
                <input
                  type="text"
                  value={coverImage}
                  onChange={(e) => {
                    setCoverImage(e.target.value);
                    setSelectedFile(null);
                    setFilePreview(null);
                  }}
                  placeholder="https://example.com/images/narayan-nagbali.jpg"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-amber-500/25 text-stone-100 placeholder-stone-500 focus:outline-hidden focus:ring-1 focus:ring-amber-400 font-mono text-[11px]"
                />
              </div>
            )}
          </div>

          {/* Row 3: Author & Reading Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-stone-300 font-semibold mb-1">Author Name</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Pt. Pravin Shambhu Deshmukh (Desai)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-amber-500/25 text-stone-100 focus:outline-hidden focus:ring-1 focus:ring-amber-400"
              />
            </div>
            <div>
              <label className="block text-stone-300 font-semibold mb-1">Estimated Reading Time</label>
              <input
                type="text"
                value={readingTime}
                onChange={(e) => setReadingTime(e.target.value)}
                placeholder="e.g. 6 min read"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-amber-500/25 text-stone-100 focus:outline-hidden focus:ring-1 focus:ring-amber-400"
              />
            </div>
          </div>

          {/* Tags & Key Takeaways */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-stone-300 font-semibold mb-1">
                Tags (Comma-separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Narayan Nagbali, Pitru Dosh, Kushavarta"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-amber-500/25 text-stone-100 placeholder-stone-500 focus:outline-hidden focus:ring-1 focus:ring-amber-400"
              />
            </div>

            <div>
              <label className="block text-stone-300 font-semibold mb-1">
                Key Takeaways (One per line)
              </label>
              <textarea
                rows={2}
                value={keyTakeaways}
                onChange={(e) => setKeyTakeaways(e.target.value)}
                placeholder="Key bullet points from this shastra..."
                className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-amber-500/25 text-stone-100 placeholder-stone-500 focus:outline-hidden focus:ring-1 focus:ring-amber-400"
              />
            </div>
          </div>

          {/* Status & Auto-Publish Scheduling (Indian Standard Time) */}
          <div className="p-4 rounded-2xl bg-black/40 border border-amber-500/20 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div>
                <label className="block text-stone-200 font-semibold mb-1">Publishing Status *</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/70 border border-amber-500/30 text-stone-100 font-medium focus:outline-hidden focus:ring-1 focus:ring-amber-400 text-xs"
                >
                  <option value="published">🚀 Publish Immediately (Active)</option>
                  <option value="scheduled">⏰ Schedule Auto-Publish (IST Date &amp; Time)</option>
                  <option value="draft">📝 Save as Draft (Private)</option>
                  <option value="archived">📦 Archived</option>
                </select>
              </div>

              {status === 'scheduled' && (
                <div>
                  <label className="block text-amber-300 font-semibold mb-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Publish Date &amp; Time (Indian Standard Time · IST) *</span>
                  </label>
                  <input
                    type="datetime-local"
                    value={scheduledPublishAt}
                    onChange={(e) => setScheduledPublishAt(e.target.value)}
                    className={`w-full px-3.5 py-2 rounded-xl bg-black/70 border text-amber-100 font-mono text-xs focus:outline-hidden focus:ring-1 focus:ring-amber-400 ${
                      errors.scheduledPublishAt ? 'border-rose-500' : 'border-amber-400/50'
                    }`}
                  />
                  {errors.scheduledPublishAt && (
                    <p className="text-rose-400 text-[10px] mt-1">{errors.scheduledPublishAt}</p>
                  )}
                </div>
              )}
            </div>

            {status === 'scheduled' && (
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200/90 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong>Auto-Publish in IST:</strong> The backend scheduler (@Scheduled) automatically changes this article&apos;s status to <strong>Published Active</strong> when the selected Indian Standard Time (Asia/Kolkata) arrives.
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-3 border-t border-amber-500/20">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-black/40 text-stone-300 border border-stone-700 hover:bg-black/60 font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-[#D4AF37] to-[#B88935] hover:brightness-110 text-[#211D19] font-bold shadow-md cursor-pointer disabled:opacity-50"
            >
              {saving ? 'Saving…' : article ? 'Update Article' : 'Publish Article'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── ARTICLE PREVIEW MODAL ───────────────────────────────────────────────────

function ArticlePreviewModal({
  article,
  onClose,
}: {
  article: ArticleRecord;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#FBF6EA] text-[#211D19] border border-[#B88935]/40 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl my-auto overflow-hidden">
        {/* Modal Header */}
        <div className="relative h-56 bg-stone-900 shrink-0">
          <img
            src={article.coverImage || article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-5 right-5 text-white">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-500 text-stone-950 inline-block mb-2">
              {article.category}
            </span>
            <h2 className="text-xl font-bold font-heading leading-tight">{article.title}</h2>
            {article.titleNative && (
              <p className="text-sm font-devanagari text-amber-200 font-semibold mt-0.5">
                {article.titleNative}
              </p>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs font-sans leading-relaxed">
          <div className="flex items-center justify-between text-[11px] text-stone-500 pb-3 border-b border-[#B88935]/20">
            <span className="flex items-center gap-1 font-semibold text-[#5A1717]">
              <User className="w-3.5 h-3.5 text-[#C56A18]" />
              {article.author}
            </span>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#C56A18]" />
                <span>{formatArticleDate(article.publishedDate || article.date || article.publishedAt || article.createdAt)}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#C56A18]" />
                <span>{article.readingTime || article.readTime || '6 min read'}</span>
              </span>
            </div>
          </div>

          <div className="bg-[#EDE3D1]/60 p-4 rounded-xl border-l-4 border-[#B88935] text-stone-700 italic">
            {article.summary}
          </div>

          <div className="text-stone-800 text-sm whitespace-pre-line leading-relaxed space-y-3 font-sans">
            {article.content}
          </div>

          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
              <h4 className="text-xs font-bold text-[#5A1717] uppercase tracking-wider">Key Shastric Takeaways:</h4>
              <ul className="list-disc list-inside space-y-1 text-xs text-stone-700">
                {article.keyTakeaways.map((t, idx) => (
                  <li key={idx}>{t}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── PAGINATION BUTTON (Identical to Payment Module) ─────────────────────────

function PageBtn({
  icon,
  onClick,
  disabled,
  title,
}: {
  icon: React.ReactNode;
  onClick: () => void;
  disabled: boolean;
  title: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className="p-1.5 rounded-lg bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
    >
      {icon}
    </button>
  );
}
