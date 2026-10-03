/**
 * Shri Kshetra Trimbakeshwar Purohit Portal – Temple Gallery API Service
 *
 * Handles:
 *  - Fetching paginated gallery images with server-side search / filter / sort
 *  - Creating gallery images (file upload via multipart/form-data OR image URL)
 *  - Updating gallery image metadata
 *  - Deleting gallery images
 *  - Offline fallback via static GALLERY_DATA when backend is unreachable
 *
 * Backend endpoints (Spring Boot):
 *  GET    /api/gallery       – paginated list
 *  POST   /api/gallery       – create (multipart file OR json url)
 *  PUT    /api/gallery/:id   – update metadata
 *  DELETE /api/gallery/:id   – delete + remove file
 *  GET    /api/gallery/stats – stat counts
 */

import { GALLERY_DATA } from '../data/galleryData';
import type { GalleryItem } from '../types';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GalleryRecord {
  id: string | number;
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
  altText?: string;
  featured?: boolean;
  status?: 'published' | 'scheduled' | 'draft' | 'inactive';
  scheduledPublishAt?: string;
  publishedAt?: string;
  layoutSpan?: 'standard' | 'wide' | 'tall' | 'large';
  tags?: string[];
  slug?: string;
  isUploaded?: boolean;
  createdAt?: string;
  updatedAt?: string;
  sortOrder?: number;
}

export interface GalleryCreatePayload {
  title: string;
  titleNative?: string;
  caption: string;
  description?: string;
  category: string;
  collection?: string;
  location?: string;
  event?: string;
  date?: string;
  year?: string;
  photographer?: string;
  source?: string;
  altText?: string;
  featured?: boolean;
  status?: 'published' | 'scheduled' | 'draft' | 'inactive';
  scheduledPublishAt?: string;
  layoutSpan?: 'standard' | 'wide' | 'tall' | 'large';
  tags?: string[];
  imageUrl?: string;
  slug?: string;
  sortOrder?: number;
}

export interface GalleryFetchParams {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
  search?: string;
  category?: string;
  status?: string;
  featured?: boolean;
}

export interface PagedGalleryResponse {
  content: GalleryRecord[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
}

export interface GalleryStats {
  totalImages: number;
  publishedCount?: number;
  scheduledCount?: number;
  featuredCount: number;
  categoryCounts: Record<string, number>;
  recentCount: number;
  uploadedCount: number;
}

// ─── Config ───────────────────────────────────────────────────────────────────

const API_BASE_URL =
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_API_BASE_URL) ||
  '/api';

const GALLERY_STORAGE_KEY = 'trimbak_gallery_items';
const GALLERY_STATS_KEY = 'trimbak_gallery_stats';

// ─── Local Storage Helpers ────────────────────────────────────────────────────

function getStoredGallery(): GalleryRecord[] {
  try {
    const raw = localStorage.getItem(GALLERY_STORAGE_KEY);
    if (raw) return JSON.parse(raw) as GalleryRecord[];
  } catch { /* ignore */ }
  return [];
}

function saveGalleryLocally(items: GalleryRecord[]) {
  try {
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(items.slice(0, 200)));
  } catch { /* quota */ }
}

function applyLocalFilters(items: GalleryRecord[], params: GalleryFetchParams): PagedGalleryResponse {
  const { page = 0, size = 12, search = '', category = '', featured, sortBy = 'createdAt', sortDir = 'desc' } = params;

  let filtered = [...items];

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (i) =>
        i.title?.toLowerCase().includes(q) ||
        i.caption?.toLowerCase().includes(q) ||
        i.category?.toLowerCase().includes(q) ||
        i.description?.toLowerCase().includes(q) ||
        (i.tags && i.tags.some((t) => t.toLowerCase().includes(q)))
    );
  }

  if (category && category !== 'All') {
    const catLower = category.toLowerCase().trim();
    filtered = filtered.filter((i) => {
      const itemCat = (i.category || '').toLowerCase().trim();
      if (itemCat === catLower) return true;
      if (catLower === 'festivals' && (itemCat.includes('festival') || itemCat === 'mahashivratri' || itemCat === 'kumbh mela' || itemCat === 'palkhi sohala')) return true;
      if (catLower === 'sacred places' && (itemCat.includes('sacred') || itemCat === 'brahmagiri' || itemCat === 'kushavarta' || itemCat === 'godavari')) return true;
      if (i.tags && i.tags.some((t) => t.toLowerCase() === catLower)) return true;
      if (i.collection && i.collection.toLowerCase().includes(catLower)) return true;
      return false;
    });
  }

  if (featured !== undefined) {
    filtered = filtered.filter((i) => !!i.featured === featured);
  }

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
    // Date / ID sorting (Latest uploaded/created database items always on top #1)
    if (a.isUploaded !== b.isUploaded) {
      return a.isUploaded ? -1 : 1;
    }
    const da = a.createdAt ? new Date(a.createdAt).getTime() : (typeof a.id === 'number' ? a.id : 0);
    const db = b.createdAt ? new Date(b.createdAt).getTime() : (typeof b.id === 'number' ? b.id : 0);
    if (da && db && da !== db) {
      return sortDir === 'asc' ? da - db : db - da;
    }
    const sa = String(a.id || '');
    const sb = String(b.id || '');
    return sortDir === 'asc' ? sa.localeCompare(sb) : sb.localeCompare(sa);
  });

  const totalElements = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalElements / size));
  const start = page * size;
  const content = filtered.slice(start, start + size);

  return { content, totalElements, totalPages, number: page, size, first: page === 0, last: page >= totalPages - 1 };
}

// ─── GET Gallery Page ─────────────────────────────────────────────────────────

export async function fetchGalleryPage(params: GalleryFetchParams = {}): Promise<PagedGalleryResponse> {
  const { page = 0, size = 16, sortBy = 'id', sortDir = 'desc', search = '', category = '', featured } = params;

  // 1. Fetch live database records from backend (up to 200 items)
  let dbItems: GalleryRecord[] = [];
  try {
    const query = new URLSearchParams({
      page: '0',
      size: '200',
      sortBy: 'id',
      sortDir: 'desc',
    });

    const response = await fetch(`${API_BASE_URL}/gallery?${query}`, {
      headers: { Accept: 'application/json' },
    });

    if (response.ok) {
      const pageData = await response.json();
      dbItems = (pageData.content || []).map(normaliseRecord);

      try {
        saveGalleryLocally(dbItems);
      } catch { /* ignore */ }
    } else {
      dbItems = getStoredGallery();
    }
  } catch (err) {
    console.debug('Gallery backend unreachable, using local fallback:', err);
    dbItems = getStoredGallery();
  }

  // 2. Prepare curated static images from bundled GALLERY_DATA
  const staticItems: GalleryRecord[] = GALLERY_DATA.map((item: GalleryItem) => ({
    ...item,
    id: String(item.id),
    isUploaded: false,
  }));

  // 3. Merge: Real database images first (latest additions), followed by static curated photos
  const dbIds = new Set(dbItems.map((r) => String(r.id)));
  const dbUrls = new Set(
    dbItems
      .map((r) => r.imageUrl?.trim().toLowerCase())
      .filter((url): url is string => Boolean(url))
  );

  const uniqueStaticItems = staticItems.filter((s) => {
    if (dbIds.has(String(s.id))) return false;
    if (s.imageUrl && dbUrls.has(s.imageUrl.trim().toLowerCase())) return false;
    return true;
  });

  // Unified list: real database images + all curated images!
  const combined = [...dbItems, ...uniqueStaticItems];

  // 4. Apply all search, category, and sorting filters and paginate cleanly
  return applyLocalFilters(combined, params);
}

// ─── GET Gallery Stats ────────────────────────────────────────────────────────

export async function fetchGalleryStats(): Promise<GalleryStats> {
  let dbItems: GalleryRecord[] = [];
  try {
    const response = await fetch(`${API_BASE_URL}/gallery?page=0&size=200`, { headers: { Accept: 'application/json' } });
    if (response.ok) {
      const pageData = await response.json();
      dbItems = (pageData.content || []).map(normaliseRecord);
    }
  } catch {
    dbItems = getStoredGallery();
  }

  const staticItems: GalleryRecord[] = GALLERY_DATA.map((item: GalleryItem) => ({
    ...item,
    id: String(item.id),
    isUploaded: false,
  }));

  const dbIds = new Set(dbItems.map((r) => String(r.id)));
  const allItems = [...dbItems, ...staticItems.filter((s) => !dbIds.has(String(s.id)))];

  const categoryCounts: Record<string, number> = {};
  allItems.forEach((i) => {
    categoryCounts[i.category] = (categoryCounts[i.category] || 0) + 1;
  });
  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;

  return {
    totalImages: allItems.length,
    featuredCount: allItems.filter((i) => i.featured).length,
    categoryCounts,
    recentCount: allItems.filter((i) => i.createdAt && new Date(i.createdAt).getTime() > thirtyDaysAgo).length,
    uploadedCount: dbItems.length,
  };
}

// ─── CREATE Gallery Image ─────────────────────────────────────────────────────

export async function createGalleryImage(metadata: GalleryCreatePayload, file?: File): Promise<GalleryRecord> {
  if (file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', metadata.title);
    formData.append('caption', metadata.caption);
    formData.append('category', metadata.category);
    if (metadata.titleNative) formData.append('titleNative', metadata.titleNative);
    if (metadata.description) formData.append('description', metadata.description);
    if (metadata.collection) formData.append('collection', metadata.collection);
    if (metadata.location) formData.append('location', metadata.location);
    if (metadata.event) formData.append('event', metadata.event);
    if (metadata.date) formData.append('date', metadata.date);
    if (metadata.year) formData.append('year', metadata.year);
    if (metadata.photographer) formData.append('photographer', metadata.photographer);
    if (metadata.source) formData.append('source', metadata.source);
    if (metadata.altText) formData.append('altText', metadata.altText);
    if (metadata.featured !== undefined) formData.append('featured', String(metadata.featured));
    if (metadata.status) formData.append('status', metadata.status);
    if (metadata.scheduledPublishAt) formData.append('scheduledPublishAt', metadata.scheduledPublishAt);
    if (metadata.layoutSpan) formData.append('layoutSpan', metadata.layoutSpan);
    if (metadata.tags) formData.append('tags', metadata.tags.join(','));
    if (metadata.slug) formData.append('slug', metadata.slug);

    try {
      const response = await fetch(`${API_BASE_URL}/gallery`, { method: 'POST', body: formData });
      if (response.ok) {
        const data = await response.json();
        const record = normaliseRecord(data);
        saveGalleryLocally([record, ...getStoredGallery()]);
        return record;
      }
      let errMsg = 'Image upload failed';
      try { const e = await response.json(); errMsg = e.message || errMsg; } catch { /* ignore */ }
      throw new Error(errMsg);
    } catch (_err: any) {
      const localRecord = await buildLocalRecord(metadata, file);
      saveGalleryLocally([localRecord, ...getStoredGallery()]);
      return localRecord;
    }
  }

  const payload = { ...metadata, tags: metadata.tags || [] };
  try {
    const response = await fetch(`${API_BASE_URL}/gallery`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      const data = await response.json();
      const record = normaliseRecord(data);
      saveGalleryLocally([record, ...getStoredGallery()]);
      return record;
    }
    let errMsg = 'Failed to save gallery image';
    try { const e = await response.json(); errMsg = e.message || errMsg; } catch { /* ignore */ }
    throw new Error(errMsg);
  } catch (_err: any) {
    const localRecord = await buildLocalRecord(metadata);
    saveGalleryLocally([localRecord, ...getStoredGallery()]);
    return localRecord;
  }
}

// ─── UPDATE Gallery Image ─────────────────────────────────────────────────────

export async function updateGalleryImage(id: string | number, metadata: Partial<GalleryCreatePayload>, file?: File): Promise<GalleryRecord> {
  if (file) {
    const formData = new FormData();
    formData.append('file', file);
    Object.entries(metadata).forEach(([k, v]) => {
      if (v !== undefined) formData.append(k, Array.isArray(v) ? v.join(',') : String(v));
    });
    try {
      const response = await fetch(`${API_BASE_URL}/gallery/${id}`, { method: 'PUT', body: formData });
      if (response.ok) {
        const record = normaliseRecord(await response.json());
        updateLocalCache(record);
        return record;
      }
    } catch { /* offline fallback below */ }
  } else {
    try {
      const response = await fetch(`${API_BASE_URL}/gallery/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...metadata, tags: metadata.tags || [] }),
      });
      if (response.ok) {
        const record = normaliseRecord(await response.json());
        updateLocalCache(record);
        return record;
      }
    } catch { /* offline fallback below */ }
  }

  const stored = getStoredGallery();
  const existing = stored.find((r) => String(r.id) === String(id));
  if (!existing) throw new Error('Gallery item not found');
  const updated: GalleryRecord = { ...existing, ...metadata, id: existing.id, updatedAt: new Date().toISOString() };
  updateLocalCache(updated);
  return updated;
}

// ─── DELETE Gallery Image ─────────────────────────────────────────────────────

export async function deleteGalleryImage(id: string | number): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/gallery/${id}`, {
      method: 'DELETE',
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) console.warn('Gallery DELETE returned non-200:', response.status);
  } catch (err) {
    console.warn('Gallery DELETE offline — removing from local cache only:', err);
  }
  saveGalleryLocally(getStoredGallery().filter((r) => String(r.id) !== String(id)));
}

// ─── Toggle Featured ──────────────────────────────────────────────────────────

export async function toggleGalleryFeatured(id: string | number, featured: boolean): Promise<void> {
  await updateGalleryImage(id, { featured });
}

export function formatGalleryDate(dateStr?: string): string {
  if (!dateStr || dateStr.trim() === '') return 'Sanatan Heritage';
  // If it's already a clean English formatted date like 'August 2026 Archive' or '1780 CE', return it
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

// ─── Helpers ──────────────────────────────────────────────────────────────────

function normaliseRecord(raw: any): GalleryRecord {
  const rawDate = raw.date || raw.publishedAt || raw.createdAt;
  const formattedDate = formatGalleryDate(rawDate);
  return {
    id: raw.id ?? raw.galleryId ?? String(Date.now()),
    title: raw.title || 'Untitled Image',
    titleNative: raw.titleNative || raw.title_native || undefined,
    caption: raw.caption || raw.description || '',
    description: raw.description || raw.caption || undefined,
    imageUrl: raw.imageUrl || raw.image_url || raw.filePath || raw.image || '',
    thumbnailUrl: raw.thumbnailUrl || raw.thumbnail_url || raw.imageUrl || raw.image || undefined,
    category: raw.category || 'Temple',
    collection: raw.collection || undefined,
    location: raw.location || undefined,
    event: raw.event || undefined,
    date: raw.date || formattedDate || raw.year || 'Sanatan Heritage',
    year: raw.year || undefined,
    photographer: raw.photographer || undefined,
    source: raw.source || undefined,
    altText: raw.altText || raw.alt_text || raw.title || undefined,
    featured: !!raw.featured,
    status: (raw.status?.toLowerCase() as any) || 'published',
    scheduledPublishAt: raw.scheduledPublishAt || undefined,
    publishedAt: raw.publishedAt || undefined,
    layoutSpan: raw.layoutSpan || raw.layout_span || 'standard',
    tags: Array.isArray(raw.tags)
      ? raw.tags
      : raw.tags
        ? String(raw.tags).split(',').map((t: string) => t.trim()).filter(Boolean)
        : [],
    slug: raw.slug || undefined,
    // Spring Boot Lombok generates `isUploaded()` → JSON key is `uploaded`
    isUploaded: !!(raw.isUploaded ?? raw.uploaded ?? raw.is_uploaded ?? false),
    createdAt: raw.createdAt || raw.created_at || new Date().toISOString(),
    updatedAt: raw.updatedAt || raw.updated_at || undefined,
    sortOrder: raw.sortOrder || raw.sort_order || 0,
  };
}

/**
 * Build a local (offline-safe) record for the gallery cache.
 * When a file is provided, we read it as a base64 data-URL so the
 * image survives page reloads (blob URLs are session-only).
 * Returns a Promise so callers must await it.
 */
async function buildLocalRecord(metadata: GalleryCreatePayload, file?: File): Promise<GalleryRecord> {
  const localId = `local-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;

  let imageUrl: string = metadata.imageUrl || '';
  if (file) {
    try {
      imageUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
      });
    } catch {
      // If FileReader fails, fall back to blob URL (still better than nothing)
      imageUrl = URL.createObjectURL(file);
    }
  }

  return {
    id: localId,
    title: metadata.title,
    titleNative: metadata.titleNative,
    caption: metadata.caption,
    description: metadata.description,
    imageUrl,
    thumbnailUrl: imageUrl,
    category: metadata.category,
    collection: metadata.collection,
    location: metadata.location,
    event: metadata.event,
    date: metadata.date,
    year: metadata.year,
    photographer: metadata.photographer,
    source: metadata.source,
    altText: metadata.altText || metadata.title,
    featured: metadata.featured ?? false,
    layoutSpan: metadata.layoutSpan || 'standard',
    tags: metadata.tags || [],
    slug: metadata.slug,
    isUploaded: !!file,
    createdAt: new Date().toISOString(),
    sortOrder: 0,
  };
}

function updateLocalCache(record: GalleryRecord) {
  const stored = getStoredGallery();
  const idx = stored.findIndex((r) => String(r.id) === String(record.id));
  if (idx >= 0) stored[idx] = record;
  else stored.unshift(record);
  saveGalleryLocally(stored);
}
