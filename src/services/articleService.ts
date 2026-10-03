/**
 * Shri Kshetra Trimbakeshwar Purohit Portal – Articles & Blogs API Service
 *
 * Handles:
 *  - Fetching articles combining live database records with default ARTICLES_DATA
 *  - Creating articles via backend REST API (with offline localStorage resilience)
 *  - Updating and deleting articles
 *  - Real-time search, category filtering, and stats counting
 */

import { ARTICLES_DATA, CORE_ARTICLE_CATEGORIES } from '../data/articlesData';
import type { ArticleItem, ArticleTranslation } from '../types';

export interface ArticleRecord {
  id: string | number;
  slug: string;
  title: string;
  titleNative: string;
  subtitle?: string;
  category: string;
  categorySlug?: string;
  summary: string;
  content: string;
  coverImage?: string;
  image: string;
  imageUrl?: string;
  imageAlt?: string;
  author: string;
  authorDesignation?: string;
  readingTime: string;
  readTime?: string;
  tags: string[];
  keyTakeaways?: string[];
  seoTitle?: string;
  metaDescription?: string;
  featured?: boolean;
  status: 'published' | 'scheduled' | 'draft' | 'archived';
  scheduledPublishAt?: string;
  publishedAt?: string;
  publishedDate?: string;
  date?: string;
  viewCount?: number;
  createdAt?: string;
  updatedAt?: string;
  isCustom?: boolean;
}

export function formatArticleDate(dateStr?: string): string {
  if (!dateStr || dateStr.trim() === '') return '1 Oct 2026';
  // If it's already a clean English formatted date like 'March 15, 2026' or 'April 2026', return it
  if (!/^\d{4}-\d{2}/.test(dateStr) && !dateStr.includes('T')) {
    return dateStr;
  }
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export interface ArticleCreatePayload {
  title: string;
  titleNative?: string;
  subtitle?: string;
  slug?: string;
  category: string;
  categorySlug?: string;
  summary: string;
  content: string;
  coverImage?: string;
  imageAlt?: string;
  author?: string;
  authorDesignation?: string;
  readingTime?: string;
  tags?: string[];
  keyTakeaways?: string[];
  seoTitle?: string;
  metaDescription?: string;
  featured?: boolean;
  status?: 'published' | 'scheduled' | 'draft' | 'archived';
  scheduledPublishAt?: string;
}

export interface ArticleFetchParams {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
  search?: string;
  category?: string;
  status?: string;
  featured?: boolean;
}

export interface PagedArticleResponse {
  content: ArticleRecord[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
}

export interface ArticleStats {
  totalArticles: number;
  publishedCount: number;
  draftCount: number;
  scheduledCount: number;
  featuredCount: number;
  categoryCounts: Record<string, number>;
}

// ─── Config ───────────────────────────────────────────────────────────────────

const API_BASE_URL =
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_API_BASE_URL) ||
  '/api';

const ARTICLES_STORAGE_KEY = 'trimbak_custom_articles';
const ARTICLES_STATS_KEY = 'trimbak_articles_stats';

// ─── Storage Helpers ──────────────────────────────────────────────────────────

function getStoredArticles(): ArticleRecord[] {
  try {
    const raw = localStorage.getItem(ARTICLES_STORAGE_KEY);
    if (raw) return JSON.parse(raw) as ArticleRecord[];
  } catch { /* ignore */ }
  return [];
}

function saveArticlesLocally(items: ArticleRecord[]) {
  try {
    localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(items.slice(0, 300)));
  } catch { /* quota */ }
}

function normaliseRecord(raw: any): ArticleRecord {
  const img = raw.coverImage || raw.image || raw.imageUrl || '/assets/trimbak/temple-shikhara.webp';
  const rawDate = raw.publishedDate || raw.date || raw.publishedAt || raw.createdAt;
  const formattedDate = formatArticleDate(rawDate);
  return {
    id: raw.id ?? raw.slug ?? String(Date.now()),
    slug: raw.slug || String(raw.id || Date.now()),
    title: raw.title || 'Untitled Article',
    titleNative: raw.titleNative || raw.title || '',
    subtitle: raw.subtitle || '',
    category: raw.category || 'Vedic Rituals & Shanti Vidhi',
    categorySlug: raw.categorySlug || 'vedic-rituals',
    summary: raw.summary || '',
    content: raw.content || '',
    coverImage: img,
    image: img,
    imageUrl: img,
    imageAlt: raw.imageAlt || raw.title || '',
    author: raw.author || 'Pt. Pravin Shambhu Deshmukh (Desai)',
    authorDesignation: raw.authorDesignation || 'Hereditary Trimbak Purohit (25th Generation)',
    readingTime: raw.readingTime || raw.readTime || '6 min read',
    readTime: raw.readingTime || raw.readTime || '6 min read',
    tags: Array.isArray(raw.tags) ? raw.tags : typeof raw.tags === 'string' ? raw.tags.split(',').map((s: string) => s.trim()) : [],
    keyTakeaways: Array.isArray(raw.keyTakeaways) ? raw.keyTakeaways : [],
    seoTitle: raw.seoTitle || raw.title || '',
    metaDescription: raw.metaDescription || raw.summary || '',
    featured: Boolean(raw.featured),
    status: (raw.status?.toLowerCase() as any) || 'published',
    scheduledPublishAt: raw.scheduledPublishAt || undefined,
    publishedAt: raw.publishedAt || undefined,
    publishedDate: formattedDate,
    date: formattedDate,
    viewCount: Number(raw.viewCount || 0),
    createdAt: raw.createdAt || new Date().toISOString(),
    updatedAt: raw.updatedAt || new Date().toISOString(),
    isCustom: true,
  };
}

function getStaticArticleRecords(): ArticleRecord[] {
  return ARTICLES_DATA.map((art: ArticleItem) => {
    const rawDate = art.publishedDate || art.date || art.publishedAt || art.createdAt;
    const formattedDate = formatArticleDate(rawDate);
    return {
      id: art.id,
      slug: art.slug,
      title: art.title,
      titleNative: art.titleNative,
      subtitle: art.subtitle,
      category: art.category,
      categorySlug: art.categorySlug || 'vedic-rituals',
      summary: art.summary,
      content: art.content,
      coverImage: art.coverImage || art.image || art.imageUrl,
      image: art.image || art.coverImage || art.imageUrl || '/assets/trimbak/temple-shikhara.webp',
      imageUrl: art.imageUrl || art.image,
      imageAlt: art.imageAlt || art.title,
      author: art.author,
      authorDesignation: art.authorDesignation || 'Vedic Scholar & Hereditary Purohit',
      readingTime: art.readingTime || art.readTime || '7 min read',
      readTime: art.readingTime || art.readTime || '7 min read',
      tags: art.tags || [],
      keyTakeaways: art.keyTakeaways || [],
      seoTitle: art.seoTitle,
      metaDescription: art.metaDescription || art.summary,
      featured: Boolean(art.featured),
      status: (art.status as any) || 'published',
      viewCount: 1500,
      publishedDate: formattedDate,
      date: formattedDate,
      publishedAt: art.publishedAt,
      createdAt: art.publishedAt || art.createdAt || '2026-03-01T00:00:00Z',
      updatedAt: art.updatedAt || '2026-08-01T00:00:00Z',
      isCustom: false,
    };
  });
}

function applyFilters(items: ArticleRecord[], params: ArticleFetchParams): PagedArticleResponse {
  const { page = 0, size = 12, search = '', category = '', status = '', featured, sortBy = 'id', sortDir = 'desc' } = params;

  let filtered = [...items];

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (a) =>
        a.title?.toLowerCase().includes(q) ||
        a.titleNative?.toLowerCase().includes(q) ||
        a.summary?.toLowerCase().includes(q) ||
        a.author?.toLowerCase().includes(q) ||
        a.category?.toLowerCase().includes(q) ||
        (a.tags && a.tags.some((t) => t.toLowerCase().includes(q)))
    );
  }

  if (category && category !== 'All') {
    const catLower = category.toLowerCase().trim();
    filtered = filtered.filter((a) => {
      const aCat = (a.category || '').toLowerCase().trim();
      const aCatSlug = (a.categorySlug || '').toLowerCase().trim();
      return (
        aCat === catLower ||
        aCatSlug === catLower ||
        (a.tags && a.tags.some((t) => t.toLowerCase() === catLower))
      );
    });
  }

  if (status && status !== 'all') {
    filtered = filtered.filter((a) => a.status === status);
  }

  if (featured !== undefined) {
    filtered = filtered.filter((a) => !!a.featured === featured);
  }

  // Sort
  filtered.sort((a, b) => {
    if (sortBy === 'featured') {
      const fa = a.featured ? 1 : 0;
      const fb = b.featured ? 1 : 0;
      return sortDir === 'asc' ? fa - fb : fb - fa;
    }
    if (sortBy === 'title') {
      const ta = (a.title || '').toLowerCase();
      const tb = (b.title || '').toLowerCase();
      return sortDir === 'asc' ? ta.localeCompare(tb) : tb.localeCompare(ta);
    }
    if (sortBy === 'category') {
      const ca = (a.category || '').toLowerCase();
      const cb = (b.category || '').toLowerCase();
      return sortDir === 'asc' ? ca.localeCompare(cb) : cb.localeCompare(ca);
    }
    // Default: custom DB items first, then by date
    if (a.isCustom !== b.isCustom) {
      return a.isCustom ? -1 : 1;
    }
    const da = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const db = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return sortDir === 'asc' ? da - db : db - da;
  });

  const totalElements = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalElements / size));
  const start = page * size;
  const content = filtered.slice(start, start + size);

  return {
    content,
    totalElements,
    totalPages,
    number: page,
    size,
    first: page === 0,
    last: page >= totalPages - 1,
  };
}

// ─── GET Articles Page (Unified Live DB + Default Articles) ───────────────────

export async function fetchArticlesPage(params: ArticleFetchParams = {}): Promise<PagedArticleResponse> {
  const { page = 0, size = 12, sortBy = 'id', sortDir = 'desc', search = '', category = '', status = '', featured } = params;

  // 1. Fetch live database records from backend (up to 200 items)
  let dbItems: ArticleRecord[] = [];
  try {
    const query = new URLSearchParams({
      page: '0',
      size: '200',
      sortBy: 'id',
      sortDir: 'desc',
    });

    const response = await fetch(`${API_BASE_URL}/articles?${query}`, {
      headers: { Accept: 'application/json' },
    });

    if (response.ok) {
      const pageData = await response.json();
      dbItems = (pageData.content || []).map(normaliseRecord);
      try {
        saveArticlesLocally(dbItems);
      } catch { /* ignore */ }
    } else {
      dbItems = getStoredArticles();
    }
  } catch (err) {
    console.debug('Articles backend unreachable, using local storage cache:', err);
    dbItems = getStoredArticles();
  }

  // 2. Prepare static articles from bundled ARTICLES_DATA
  const staticItems: ArticleRecord[] = getStaticArticleRecords();

  // 3. De-duplicate: Keep all real database articles, append non-conflicting static articles
  const dbSlugs = new Set(dbItems.map((r) => r.slug.toLowerCase().trim()));
  const dbTitles = new Set(dbItems.map((r) => r.title.toLowerCase().trim()));

  const uniqueStaticItems = staticItems.filter((s) => {
    if (dbSlugs.has(s.slug.toLowerCase().trim())) return false;
    if (dbTitles.has(s.title.toLowerCase().trim())) return false;
    return true;
  });

  // Unified list: real database articles (at top) + complete default catalog
  const combined = [...dbItems, ...uniqueStaticItems];

  // 4. Apply all filters, search, and pagination
  return applyFilters(combined, params);
}

// ─── GET Single Article by Slug or ID ─────────────────────────────────────────

export async function fetchArticleBySlug(slug: string): Promise<ArticleRecord | null> {
  // 1. Check backend API
  try {
    const response = await fetch(`${API_BASE_URL}/articles/slug/${encodeURIComponent(slug)}`, {
      headers: { Accept: 'application/json' },
    });
    if (response.ok) {
      return normaliseRecord(await response.json());
    }
  } catch { /* ignore */ }

  // 2. Check local stored cache
  const stored = getStoredArticles();
  const foundInStored = stored.find(
    (a) => a.slug.toLowerCase() === slug.toLowerCase() || String(a.id) === slug
  );
  if (foundInStored) return foundInStored;

  // 3. Check bundled static articles
  const staticItems = getStaticArticleRecords();
  return (
    staticItems.find(
      (a) => a.slug.toLowerCase() === slug.toLowerCase() || String(a.id) === slug
    ) || null
  );
}

// ─── UPLOAD Article Image ──────────────────────────────────────────────────

export async function uploadArticleImage(file: File): Promise<{ url: string }> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/articles/upload-image`, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      if (data?.url) {
        return { url: data.url };
      }
    }
  } catch (err) {
    console.warn('Backend image upload failed, converting to local data-url:', err);
  }

  // Fallback: convert to base64 Data URL for local presentation & persistence
  return new Promise<{ url: string }>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve({ url: reader.result as string });
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.readAsDataURL(file);
  });
}

// ─── CREATE Article ───────────────────────────────────────────────────────────

export async function createArticle(payload: ArticleCreatePayload, file?: File): Promise<ArticleRecord> {
  let effectiveCover = payload.coverImage;
  if (file) {
    try {
      const uploadRes = await uploadArticleImage(file);
      if (uploadRes?.url) {
        effectiveCover = uploadRes.url;
      }
    } catch { /* ignore fallback */ }
  }

  const updatedPayload = { ...payload, coverImage: effectiveCover };
  const body = {
    ...updatedPayload,
    tags: updatedPayload.tags ? updatedPayload.tags.join(',') : '',
    keyTakeaways: updatedPayload.keyTakeaways ? updatedPayload.keyTakeaways.join('\n') : '',
  };

  try {
    const response = await fetch(`${API_BASE_URL}/articles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const created = normaliseRecord(await response.json());
      const stored = getStoredArticles();
      saveArticlesLocally([created, ...stored]);
      return created;
    }
  } catch (err) {
    console.warn('Backend POST /api/articles offline, saving locally:', err);
  }

  // Local fallback creation
  const fallbackSlug = updatedPayload.slug || updatedPayload.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now();
  const localRecord = normaliseRecord({
    ...updatedPayload,
    id: Date.now(),
    slug: fallbackSlug,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const stored = getStoredArticles();
  saveArticlesLocally([localRecord, ...stored]);
  return localRecord;
}

// ─── UPDATE Article ───────────────────────────────────────────────────────────

export async function updateArticle(id: string | number, payload: ArticleCreatePayload, file?: File): Promise<ArticleRecord> {
  let effectiveCover = payload.coverImage;
  if (file) {
    try {
      const uploadRes = await uploadArticleImage(file);
      if (uploadRes?.url) {
        effectiveCover = uploadRes.url;
      }
    } catch { /* ignore fallback */ }
  }

  const updatedPayload = { ...payload, coverImage: effectiveCover };
  const body = {
    ...updatedPayload,
    tags: updatedPayload.tags ? updatedPayload.tags.join(',') : '',
    keyTakeaways: updatedPayload.keyTakeaways ? updatedPayload.keyTakeaways.join('\n') : '',
  };

  try {
    const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const updated = normaliseRecord(await response.json());
      const stored = getStoredArticles().map((r) => (String(r.id) === String(id) ? updated : r));
      saveArticlesLocally(stored);
      return updated;
    }
  } catch (err) {
    console.warn('Backend PUT /api/articles offline, updating locally:', err);
  }

  const stored = getStoredArticles();
  const existing = stored.find((r) => String(r.id) === String(id));
  const updated: ArticleRecord = normaliseRecord({
    ...(existing || {}),
    ...payload,
    id,
    updatedAt: new Date().toISOString(),
  });
  saveArticlesLocally(stored.map((r) => (String(r.id) === String(id) ? updated : r)));
  return updated;
}

// ─── DELETE Article ───────────────────────────────────────────────────────────

export async function deleteArticle(id: string | number): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
      method: 'DELETE',
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) console.warn('Articles DELETE returned non-200:', response.status);
  } catch (err) {
    console.warn('Articles DELETE offline — removing from local storage only:', err);
  }

  saveArticlesLocally(getStoredArticles().filter((r) => String(r.id) !== String(id)));
}

// ─── Toggle Featured ──────────────────────────────────────────────────────────

export async function toggleArticleFeatured(id: string | number): Promise<ArticleRecord> {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/${id}/featured`, {
      method: 'PATCH',
      headers: { Accept: 'application/json' },
    });
    if (response.ok) {
      const updated = normaliseRecord(await response.json());
      const stored = getStoredArticles().map((r) => (String(r.id) === String(id) ? updated : r));
      saveArticlesLocally(stored);
      return updated;
    }
  } catch { /* offline fallback */ }

  const stored = getStoredArticles();
  const existing = stored.find((r) => String(r.id) === String(id));
  if (!existing) throw new Error('Article not found');
  const updated: ArticleRecord = { ...existing, featured: !existing.featured };
  saveArticlesLocally(stored.map((r) => (String(r.id) === String(id) ? updated : r)));
  return updated;
}

// ─── GET Article Stats ────────────────────────────────────────────────────────

export async function fetchArticleStats(): Promise<ArticleStats> {
  let dbItems: ArticleRecord[] = [];
  try {
    const response = await fetch(`${API_BASE_URL}/articles?page=0&size=200`, { headers: { Accept: 'application/json' } });
    if (response.ok) {
      const data = await response.json();
      dbItems = (data.content || []).map(normaliseRecord);
    }
  } catch {
    dbItems = getStoredArticles();
  }

  const staticItems = getStaticArticleRecords();
  const dbSlugs = new Set(dbItems.map((r) => r.slug.toLowerCase().trim()));
  const allItems = [...dbItems, ...staticItems.filter((s) => !dbSlugs.has(s.slug.toLowerCase().trim()))];

  const categoryCounts: Record<string, number> = {};
  allItems.forEach((a) => {
    categoryCounts[a.category] = (categoryCounts[a.category] || 0) + 1;
  });

  return {
    totalArticles: allItems.length,
    publishedCount: allItems.filter((a) => a.status === 'published').length,
    draftCount: allItems.filter((a) => a.status === 'draft').length,
    scheduledCount: allItems.filter((a) => a.status === 'scheduled').length,
    featuredCount: allItems.filter((a) => a.featured).length,
    categoryCounts,
  };
}
