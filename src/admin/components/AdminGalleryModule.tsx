import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  ImagePlus,
  Search,
  Filter,
  RefreshCw,
  Database,
  Upload,
  Link,
  X,
  Eye,
  Pencil,
  Trash2,
  Clock,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Loader2,
  CheckCircle2,
  Camera,
  MapPin,
  Calendar,
  Tag,
  Layout,
  Image as ImageIcon,
  AlertTriangle,
  Plus,
  Grid3X3,
  LayoutGrid,
  Check,
  ArrowUpDown,
  ArrowDown,
  ArrowUp,
  ZoomIn,
  Download,
  RotateCcw,
} from 'lucide-react';
import {
  fetchGalleryPage,
  fetchGalleryStats,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  GalleryRecord,
  GalleryCreatePayload,
  GalleryFetchParams,
  GalleryStats,
  formatGalleryDate,
} from '../../services/galleryService';
import { GALLERY_CATEGORIES } from '../../data/galleryData';

// ─── Types ────────────────────────────────────────────────────────────────────

type SortField = 'id' | 'title' | 'category' | 'createdAt' | 'status';
type LayoutMode = 'grid' | 'list';

const CATEGORIES = GALLERY_CATEGORIES as unknown as string[];
const PAGE_SIZE_OPTIONS = [12, 24, 48];
const LAYOUT_OPTIONS: { value: 'standard' | 'wide' | 'tall' | 'large'; label: string }[] = [
  { value: 'standard', label: 'Standard (1×1)' },
  { value: 'wide', label: 'Wide (2×1)' },
  { value: 'tall', label: 'Tall (1×2)' },
  { value: 'large', label: 'Large (2×2)' },
];

// ─── Empty Form ───────────────────────────────────────────────────────────────

function emptyForm(): GalleryCreatePayload {
  return {
    title: '',
    titleNative: '',
    caption: '',
    description: '',
    category: 'Temple',
    collection: '',
    location: '',
    event: '',
    date: '',
    year: '',
    photographer: '',
    source: '',
    altText: '',
    featured: false,
    layoutSpan: 'standard',
    tags: [],
    imageUrl: '',
    slug: '',
  };
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
  color: string;
}) {
  return (
    <div className={`flex items-center gap-3 p-4 rounded-2xl bg-[#1A0D0A] border border-amber-500/20 shadow-lg`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] text-stone-500 uppercase tracking-wider font-medium">{label}</p>
        <p className="text-xl font-bold text-amber-100 leading-tight">{value}</p>
        {sub && <p className="text-[10px] text-stone-500 mt-0.5 truncate">{sub}</p>}
      </div>
    </div>
  );
}

// ─── Image Modal (View) ───────────────────────────────────────────────────────

function ViewImageModal({
  item,
  onClose,
  onEdit,
}: {
  item: GalleryRecord;
  onClose: () => void;
  onEdit: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#160A07] border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative bg-black flex-shrink-0" style={{ maxHeight: '50vh' }}>
          <img
            src={item.imageUrl}
            alt={item.altText || item.title}
            className="w-full h-full object-contain"
            style={{ maxHeight: '50vh' }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x500/1A0D0A/B88935?text=Image+Not+Found';
            }}
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Details */}
        <div className="p-5 overflow-y-auto space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-amber-100 font-sanskrit leading-tight">{item.title}</h3>
              {item.titleNative && (
                <p className="text-sm text-amber-300/80 font-devanagari mt-0.5">{item.titleNative}</p>
              )}
            </div>
            <span className="flex-shrink-0 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-medium">
              {item.category}
            </span>
          </div>

          {item.caption && (
            <p className="text-sm text-stone-300 leading-relaxed">{item.caption}</p>
          )}

          {item.description && (
            <p className="text-xs text-stone-400 leading-relaxed border-l-2 border-amber-500/30 pl-3">
              {item.description}
            </p>
          )}

          <div className="grid grid-cols-2 gap-2 pt-1">
            {item.location && (
              <div className="flex items-center gap-1.5 text-xs text-stone-500">
                <MapPin className="w-3 h-3 text-amber-500/60" />
                <span className="truncate">{item.location}</span>
              </div>
            )}
            {(item.date || item.createdAt || item.year) && (
              <div className="flex items-center gap-1.5 text-xs text-stone-500">
                <Calendar className="w-3 h-3 text-amber-500/60" />
                <span className="truncate">{item.date || formatGalleryDate(item.createdAt) || item.year}</span>
              </div>
            )}
            {item.photographer && (
              <div className="flex items-center gap-1.5 text-xs text-stone-500">
                <Camera className="w-3 h-3 text-amber-500/60" />
                <span className="truncate">{item.photographer}</span>
              </div>
            )}
            {item.tags && item.tags.length > 0 && (
              <div className="flex items-center gap-1.5 text-xs text-stone-500 col-span-2">
                <Tag className="w-3 h-3 text-amber-500/60" />
                <span className="truncate">{item.tags.join(', ')}</span>
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-2 border-t border-amber-500/15">
            <button
              onClick={onEdit}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-amber-600/20 hover:bg-amber-600/35 text-amber-300 border border-amber-500/30 text-sm font-medium transition-colors"
            >
              <Pencil className="w-3.5 h-3.5" /> Edit Image
            </button>
            <button
              onClick={onClose}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 text-sm font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Add/Edit Modal (Simplified & User-Friendly) ─────────────────────────────

function GalleryFormModal({
  editRecord,
  onClose,
  onSaved,
}: {
  editRecord: GalleryRecord | null;
  onClose: () => void;
  onSaved: (record: GalleryRecord) => void;
}) {
  const isEdit = !!editRecord;
  const [form, setForm] = useState({
    title: editRecord?.title || '',
    category: editRecord?.category || 'Temple',
    description: editRecord?.description || editRecord?.caption || '',
    location: editRecord?.location || 'Trimbakeshwar, Nashik',
    status: (editRecord?.status || 'published') as 'published' | 'scheduled' | 'draft' | 'inactive',
    scheduledPublishAt: editRecord?.scheduledPublishAt ? editRecord.scheduledPublishAt.slice(0, 16) : '',
    imageUrl: editRecord?.imageUrl || '',
  });

  const [inputMode, setInputMode] = useState<'file' | 'url'>(
    editRecord?.isUploaded ? 'file' : 'url'
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(editRecord?.imageUrl || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { setError('File must be less than 10 MB'); return; }
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setError(null);
  };

  const handleUrlChange = (url: string) => {
    setForm((f) => ({ ...f, imageUrl: url }));
    setPreviewUrl(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) { setError('Please enter image title'); return; }
    if (!form.category) { setError('Please select a category'); return; }
    if (form.status === 'scheduled' && !form.scheduledPublishAt) {
      setError('Please select scheduled publish date & time in Indian Standard Time (IST)');
      return;
    }
    if (inputMode === 'url' && !form.imageUrl?.trim()) { setError('Please enter image URL'); return; }
    if (inputMode === 'file' && !selectedFile && !isEdit) { setError('Please select an image file to upload'); return; }

    setSaving(true);
    setError(null);
    try {
      const cleanTitle = form.title.trim();
      const cleanDesc = form.description.trim();
      const autoSlug = cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      const payload: GalleryCreatePayload = {
        title: cleanTitle,
        titleNative: editRecord?.titleNative || cleanTitle,
        caption: cleanDesc || cleanTitle,
        description: cleanDesc,
        category: form.category,
        location: form.location.trim() || 'Trimbakeshwar, Nashik',
        status: form.status,
        scheduledPublishAt: form.status === 'scheduled' ? form.scheduledPublishAt : undefined,
        imageUrl: form.imageUrl,
        layoutSpan: editRecord?.layoutSpan || 'standard',
        collection: form.category,
        tags: [form.category],
        altText: cleanTitle,
        slug: autoSlug || `gallery-${Date.now()}`,
        date: editRecord?.date || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        year: editRecord?.year || String(new Date().getFullYear()),
      };

      let record: GalleryRecord;
      if (isEdit && editRecord) {
        record = await updateGalleryImage(
          editRecord.id,
          payload,
          inputMode === 'file' && selectedFile ? selectedFile : undefined
        );
      } else {
        record = await createGalleryImage(
          payload,
          inputMode === 'file' && selectedFile ? selectedFile : undefined
        );
      }
      onSaved(record);
    } catch (err: any) {
      setError(err?.message || 'Failed to save image');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#160A07] border border-amber-500/30 rounded-3xl shadow-2xl w-full max-w-xl max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-500/20 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-400">
              <ImagePlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-amber-100 font-sanskrit">
                {isEdit ? 'Edit Gallery Image' : 'Add New Gallery Image'}
              </h3>
              <p className="text-xs text-stone-500">
                {isEdit ? 'Update details or replace image' : 'Upload photo or enter image URL'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Image Source Selection */}
          <div>
            <label className="block text-[11px] text-stone-400 uppercase tracking-wider mb-2 font-medium">Image Source *</label>
            <div className="flex rounded-xl overflow-hidden border border-stone-700">
              <button
                type="button"
                onClick={() => setInputMode('file')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold transition-colors ${
                  inputMode === 'file'
                    ? 'bg-amber-600/25 text-amber-300 border-r border-stone-700'
                    : 'bg-stone-900 text-stone-500 hover:text-stone-300 border-r border-stone-700'
                }`}
              >
                <Upload className="w-3.5 h-3.5" /> Upload File
              </button>
              <button
                type="button"
                onClick={() => setInputMode('url')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold transition-colors ${
                  inputMode === 'url'
                    ? 'bg-amber-600/25 text-amber-300'
                    : 'bg-stone-900 text-stone-500 hover:text-stone-300'
                }`}
              >
                <Link className="w-3.5 h-3.5" /> Image URL
              </button>
            </div>
          </div>

          {/* File Upload OR URL Input */}
          {inputMode === 'file' ? (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-colors ${
                  selectedFile || (isEdit && previewUrl)
                    ? 'border-amber-500/40 bg-amber-500/5'
                    : 'border-stone-700 hover:border-amber-500/40 bg-stone-900/50'
                }`}
              >
                {previewUrl ? (
                  <div className="space-y-2">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="h-28 mx-auto object-cover rounded-xl border border-amber-500/30 shadow-md"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                    <p className="text-xs text-amber-300 font-medium">
                      {selectedFile ? selectedFile.name : 'Current Image'} · Click to choose different file
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1.5 py-2">
                    <Upload className="w-8 h-8 text-amber-400/80 mx-auto" />
                    <p className="text-xs font-semibold text-stone-300">Click to choose image from your computer</p>
                    <p className="text-[11px] text-stone-500">JPG, PNG, WebP · Up to 10 MB</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <input
                type="url"
                value={form.imageUrl}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="https://example.com/image.jpg or /assets/trimbak/photo.webp"
                className="w-full bg-stone-900 border border-stone-700 text-amber-100 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500/60 placeholder:text-stone-600 transition-colors"
              />
              {previewUrl && (
                <div className="mt-2 text-center">
                  <img
                    src={previewUrl}
                    alt="URL preview"
                    className="h-28 mx-auto object-cover rounded-xl border border-amber-500/30 shadow-md"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
              )}
            </div>
          )}

          {/* Image Title */}
          <div>
            <label className="block text-[11px] text-stone-400 uppercase tracking-wider mb-1.5 font-medium">
              Image Title *
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="e.g. Trimbakeshwar Temple at Sunrise"
              className="w-full bg-stone-900 border border-stone-700 text-amber-100 text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500/60 placeholder:text-stone-600 transition-colors"
            />
          </div>

          {/* Category & Location Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[11px] text-stone-400 uppercase tracking-wider mb-1.5 font-medium">
                Category *
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full bg-stone-900 border border-stone-700 text-amber-100 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500/60 transition-colors"
              >
                {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-stone-400 uppercase tracking-wider mb-1.5 font-medium">
                Location
              </label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                placeholder="e.g. Trimbakeshwar, Nashik"
                className="w-full bg-stone-900 border border-stone-700 text-amber-100 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500/60 placeholder:text-stone-600 transition-colors"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[11px] text-stone-400 uppercase tracking-wider mb-1.5 font-medium">
              Description / Caption
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Add a brief description or note about this photograph..."
              className="w-full bg-stone-900 border border-stone-700 text-amber-100 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500/60 placeholder:text-stone-600 transition-colors resize-none"
            />
          </div>

          {/* Status & Auto-Publish Scheduling (Indian Standard Time) */}
          <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-700/80 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 items-center">
              <div>
                <label className="block text-[11px] text-stone-400 uppercase tracking-wider mb-1.5 font-medium">
                  Publishing Status *
                </label>
                <select
                  value={form.status}
                  onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as any }))}
                  className="w-full bg-stone-900 border border-stone-700 text-amber-100 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500/60 transition-colors"
                >
                  <option value="published">🚀 Publish Immediately (Active)</option>
                  <option value="scheduled">⏰ Schedule Auto-Publish (IST Date &amp; Time)</option>
                  <option value="draft">📝 Save as Draft (Private)</option>
                  <option value="inactive">📦 Inactive / Archived</option>
                </select>
              </div>

              {form.status === 'scheduled' && (
                <div>
                  <label className="block text-[11px] text-amber-400 uppercase tracking-wider mb-1.5 font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Publish Date &amp; Time (IST) *</span>
                  </label>
                  <input
                    type="datetime-local"
                    value={form.scheduledPublishAt}
                    onChange={(e) => setForm((f) => ({ ...f, scheduledPublishAt: e.target.value }))}
                    className="w-full bg-stone-900 border border-amber-500/50 text-amber-100 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-400 font-mono transition-colors"
                  />
                </div>
              )}
            </div>

            {form.status === 'scheduled' && (
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200/90 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong>Auto-Publish in IST:</strong> Background scheduler (@Scheduled) will publish this image automatically when the selected Indian Standard Time (Asia/Kolkata) arrives.
                </span>
              </div>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-amber-500/15 flex gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="flex-1 py-2 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 text-xs font-semibold transition-colors disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex-1 py-2 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Check className="w-3.5 h-3.5" />
                {isEdit ? 'Save Changes' : 'Add to Gallery'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Gallery Grid Item Card ───────────────────────────────────────────────────

function GalleryCard({
  item,
  onView,
  onEdit,
  onDelete,
}: {
  item: GalleryRecord;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative rounded-2xl overflow-hidden bg-[#1A0D0A] border border-amber-500/15 hover:border-amber-500/40 transition-all duration-200 shadow-lg hover:shadow-amber-900/30"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-square bg-stone-900 overflow-hidden">
        {imgError ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-stone-600">
            <ImageIcon className="w-10 h-10" />
            <span className="text-xs">Image unavailable</span>
          </div>
        ) : (
          <img
            src={item.thumbnailUrl || item.imageUrl}
            alt={item.altText || item.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        )}

        {/* Overlay Actions */}
        <div
          className={`absolute inset-0 bg-black/60 flex items-center justify-center gap-2 transition-opacity duration-200 ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            onClick={onView}
            className="p-2.5 rounded-xl bg-amber-600/80 hover:bg-amber-500 text-white transition-colors shadow-lg"
            title="View"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={onEdit}
            className="p-2.5 rounded-xl bg-blue-600/80 hover:bg-blue-500 text-white transition-colors shadow-lg"
            title="Edit"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2.5 rounded-xl bg-rose-600/80 hover:bg-rose-500 text-white transition-colors shadow-lg"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
          {item.status === 'scheduled' ? (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/90 text-amber-950 text-[9px] font-bold shadow-xs">
              <Clock className="w-2.5 h-2.5" /> Scheduled IST
            </span>
          ) : item.status === 'draft' ? (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-stone-800/90 text-stone-300 border border-stone-600 text-[9px] font-bold shadow-xs">
              Draft
            </span>
          ) : (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/80 text-emerald-950 text-[9px] font-bold shadow-xs">
              Published
            </span>
          )}
          {item.isUploaded && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/80 text-blue-950 text-[9px] font-bold">
              <Upload className="w-2.5 h-2.5" /> Uploaded
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-3 space-y-1.5">
        <p className="text-xs font-semibold text-amber-100 line-clamp-1">{item.title}</p>
        <p className="text-[10px] text-stone-500 line-clamp-2 leading-relaxed">{item.caption}</p>
        <div className="flex items-center justify-between pt-1 border-t border-amber-500/10 text-[10px] text-stone-400">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-amber-500/70" />
            <span className="truncate max-w-[110px]">{item.date || formatGalleryDate(item.createdAt)}</span>
          </span>
          <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[9px] font-medium shrink-0">
            {item.category}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Pagination Button ────────────────────────────────────────────────────────

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
      className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-amber-300 border border-stone-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
    >
      {icon}
    </button>
  );
}

// ─── Pagination Bar (Exact Same Style as Payments Module) ────────────────────

function PaginationBar({
  page,
  totalPages,
  totalElements,
  pageSize,
  onPage,
}: {
  page: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  onPage: (p: number) => void;
}) {
  const startRecord = totalElements === 0 ? 0 : page * pageSize + 1;
  const endRecord = Math.min((page + 1) * pageSize, totalElements);

  return (
    <div className="fixed bottom-14 lg:bottom-0 left-0 lg:left-64 right-0 z-30 flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 py-3 bg-[#120705]/95 backdrop-blur-xl border-t border-amber-500/30 shadow-[0_-8px_25px_rgba(0,0,0,0.7)] text-xs">
      <div className="text-stone-400 font-mono text-[11px]">
        Showing <span className="text-amber-300 font-bold">{startRecord}</span> to{' '}
        <span className="text-amber-300 font-bold">{endRecord}</span> of{' '}
        <span className="text-stone-200 font-bold">{totalElements}</span> entries ({pageSize} per page)
      </div>

      <div className="flex items-center gap-1.5">
        <PageBtn
          icon={<ChevronsLeft className="w-3.5 h-3.5" />}
          onClick={() => onPage(0)}
          disabled={page === 0}
          title="First page"
        />
        <PageBtn
          icon={<ChevronLeft className="w-3.5 h-3.5" />}
          onClick={() => onPage(Math.max(0, page - 1))}
          disabled={page === 0}
          title="Previous page"
        />

        {/* Page number buttons */}
        {Array.from({ length: Math.min(5, Math.max(1, totalPages)) }, (_, i) => {
          const start = Math.max(0, Math.min(page - 2, Math.max(0, totalPages - 5)));
          const p = start + i;
          if (p >= totalPages) return null;
          return (
            <button
              key={p}
              onClick={() => onPage(p)}
              className={`w-7 h-7 rounded-lg text-xs font-mono transition-colors cursor-pointer ${p === page
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
          onClick={() => onPage(Math.min(totalPages - 1, page + 1))}
          disabled={page >= totalPages - 1}
          title="Next page"
        />
        <PageBtn
          icon={<ChevronsRight className="w-3.5 h-3.5" />}
          onClick={() => onPage(Math.max(0, totalPages - 1))}
          disabled={page >= totalPages - 1}
          title="Last page"
        />
      </div>
    </div>
  );
}

// ─── Main Gallery Module ──────────────────────────────────────────────────────

export function AdminGalleryModule() {
  // Pagination
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  // Filters & sort
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'scheduled' | 'draft'>('all');
  const [sortBy, setSortBy] = useState<SortField>('id');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  // Data
  const [images, setImages] = useState<GalleryRecord[]>([]);
  const [stats, setStats] = useState<GalleryStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modals
  const [showForm, setShowForm] = useState(false);
  const [editRecord, setEditRecord] = useState<GalleryRecord | null>(null);
  const [viewRecord, setViewRecord] = useState<GalleryRecord | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<GalleryRecord | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Layout
  const [layoutMode] = useState<LayoutMode>('grid');

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Load page ──────────────────────────────────────────────────────────────

  const loadPage = useCallback(async (params: GalleryFetchParams) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchGalleryPage(params);
      setImages(result.content);
      setTotalPages(result.totalPages);
      setTotalElements(result.totalElements);
    } catch (e: any) {
      setError('Failed to load gallery images. Showing cached data.');
      console.error('Gallery fetch error:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadStats = useCallback(async () => {
    setStatsLoading(true);
    try {
      const s = await fetchGalleryStats();
      setStats(s);
    } catch { /* ignore */ } finally {
      setStatsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPage({
      page,
      size: pageSize,
      sortBy,
      sortDir,
      search,
      category: categoryFilter,
      status: statusFilter === 'all' ? undefined : statusFilter,
    });
  }, [page, pageSize, sortBy, sortDir, search, categoryFilter, statusFilter, loadPage]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  // ── Search debounce ────────────────────────────────────────────────────────

  const handleSearchInput = (val: string) => {
    setSearchInput(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setPage(0);
      setSearch(val.trim());
    }, 350);
  };

  // ── Sort toggle ────────────────────────────────────────────────────────────

  const handleSort = (field: SortField) => {
    if (sortBy === field) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortBy(field); setSortDir('desc'); }
    setPage(0);
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortBy !== field) return <ArrowUpDown className="w-3 h-3 opacity-40" />;
    return sortDir === 'asc' ? <ArrowUp className="w-3 h-3 text-amber-400" /> : <ArrowDown className="w-3 h-3 text-amber-400" />;
  };

  // ── Delete ─────────────────────────────────────────────────────────────────

  const handleDelete = async (record: GalleryRecord) => {
    setDeleting(true);
    try {
      await deleteGalleryImage(record.id);
      setImages((prev) => prev.filter((i) => String(i.id) !== String(record.id)));
      setTotalElements((prev) => Math.max(0, prev - 1));
      setDeleteConfirm(null);
      loadStats();
    } catch (e: any) {
      setError(e?.message || 'Failed to delete image');
    } finally {
      setDeleting(false);
    }
  };

  // ── After save ─────────────────────────────────────────────────────────────

  const handleSaved = (record: GalleryRecord) => {
    setImages((prev) => {
      const idx = prev.findIndex((i) => String(i.id) === String(record.id));
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = record;
        return updated;
      }
      return [record, ...prev];
    });
    if (!editRecord) setTotalElements((prev) => prev + 1);
    setShowForm(false);
    setEditRecord(null);
    loadStats();
  };

  // ── Top categories for quick filter ───────────────────────────────────────

  const topCategories = [
    'All',
    'Temple',
    'Jyotirlinga',
    'Puja',
    'Mahashivratri',
    'Kumbh Mela',
    'Palkhi Sohala',
    'Sacred Places',
    'Devotees',
  ];

  return (
    <div className="flex flex-col gap-4 pb-20">
      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          icon={ImageIcon}
          label="Total Images"
          value={statsLoading ? '…' : (stats?.totalImages ?? totalElements)}
          sub="In gallery database"
          color="bg-amber-500/15 text-amber-400"
        />
        <StatCard
          icon={Clock}
          label="Scheduled"
          value={statsLoading ? '…' : (stats?.scheduledCount ?? 0)}
          sub="Auto-publish (IST)"
          color="bg-amber-500/15 text-amber-400"
        />
        <StatCard
          icon={Upload}
          label="Uploaded Files"
          value={statsLoading ? '…' : (stats?.uploadedCount ?? '—')}
          sub="Server-stored images"
          color="bg-emerald-500/15 text-emerald-400"
        />
        <StatCard
          icon={Calendar}
          label="Recent (30d)"
          value={statsLoading ? '…' : (stats?.recentCount ?? '—')}
          sub="Newly added images"
          color="bg-blue-500/15 text-blue-400"
        />
      </div>

      {/* ── Control Bar ── */}
      <div className="rounded-2xl bg-[#1A0D0A] border border-amber-500/25 p-4 shadow-xl space-y-3">
        {/* Row 1: Title + Add Button + Refresh */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-amber-100 font-sanskrit flex items-center gap-2">
              <ImagePlus className="w-4 h-4 text-amber-400" />
              Gallery Manager
            </h2>
            <span className="text-xs text-amber-300 font-mono px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
              {totalElements} Images
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                loadPage({
                  page,
                  size: pageSize,
                  sortBy,
                  sortDir,
                  search,
                  category: categoryFilter,
                  status: statusFilter === 'all' ? undefined : statusFilter,
                });
                loadStats();
              }}
              disabled={loading}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-amber-300 border border-stone-700 transition-colors disabled:opacity-50 cursor-pointer"
              title="Refresh"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            </button>
            <button
              onClick={() => { setEditRecord(null); setShowForm(true); }}
              className="flex items-center gap-2 py-2 px-4 rounded-xl bg-amber-600/25 hover:bg-amber-600/40 text-amber-300 border border-amber-500/35 text-sm font-semibold transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Image
            </button>
          </div>
        </div>

        {/* Row 2: Search + Status Tabs + Page Size */}
        <div className="flex flex-col sm:flex-row gap-2">
          {/* Search */}
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-500" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => handleSearchInput(e.target.value)}
              placeholder="Search by title, category, tags…"
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-stone-900 border border-stone-700 text-amber-100 text-sm placeholder:text-stone-600 focus:outline-none focus:border-amber-500/50 transition-colors"
            />
            {searchInput && (
              <button
                onClick={() => { setSearchInput(''); setSearch(''); setPage(0); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-amber-400 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1">
            {(['all', 'published', 'scheduled', 'draft'] as const).map((s) => (
              <button
                key={s}
                onClick={() => { setStatusFilter(s); setPage(0); }}
                className={`px-3 py-2 rounded-xl text-xs font-medium border capitalize transition-colors cursor-pointer ${
                  statusFilter === s
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/35 font-semibold'
                    : 'bg-stone-900 text-stone-400 border-stone-700 hover:text-stone-300'
                }`}
              >
                {s === 'scheduled' ? 'Scheduled (IST)' : s}
              </button>
            ))}
          </div>

          {/* Page Size */}
          <select
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setPage(0); }}
            className="px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-stone-300 text-xs focus:outline-none focus:border-amber-500/50 transition-colors"
          >
            {PAGE_SIZE_OPTIONS.map((s) => (
              <option key={s} value={s}>{s} / page</option>
            ))}
          </select>
        </div>

        {/* Row 3: Category filter chips */}
        <div className="flex flex-wrap items-center gap-1.5 pb-1">
          <div className="flex items-center gap-1 text-amber-500/80 text-xs font-semibold mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Category:</span>
          </div>
          {topCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setCategoryFilter(cat); setPage(0); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-amber-500 text-stone-950 font-bold border-amber-400 shadow-md'
                  : 'bg-black/50 text-stone-300 border-amber-500/20 hover:border-amber-400/50 hover:text-amber-200'
              }`}
            >
              {cat}
            </button>
          ))}
          {/* More categories dropdown */}
          <select
            value={topCategories.includes(categoryFilter) ? '' : categoryFilter}
            onChange={(e) => { if (e.target.value) { setCategoryFilter(e.target.value); setPage(0); } }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              !topCategories.includes(categoryFilter) && categoryFilter !== ''
                ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold'
                : 'bg-black/50 text-stone-300 border-amber-500/20 focus:outline-none'
            }`}
          >
            <option value="" className="bg-[#1A0D0A] text-stone-300">More…</option>
            {CATEGORIES.filter((c) => !topCategories.includes(c) && c !== 'All').map((cat) => (
              <option key={cat} value={cat} className="bg-[#1A0D0A] text-stone-200">{cat}</option>
            ))}
          </select>
        </div>

        {/* Row 4: Sort bar + Clear filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-amber-500/15 text-xs text-stone-400">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-stone-500 font-mono mr-1">Sort:</span>
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
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm font-semibold'
                    : 'bg-stone-900/60 text-stone-400 hover:text-stone-200 border-stone-800 hover:bg-stone-800'
                }`}
              >
                <span>{label}</span>
                <SortIcon field={field} />
              </button>
            ))}
          </div>

          {(categoryFilter !== 'All' || statusFilter !== 'all' || search) && (
            <button
              onClick={() => {
                setCategoryFilter('All');
                setStatusFilter('all');
                setSearchInput('');
                setSearch('');
                setPage(0);
              }}
              className="inline-flex items-center gap-1 text-[11px] text-amber-400/80 hover:text-amber-300 underline font-mono cursor-pointer ml-auto sm:ml-0"
            >
              <RotateCcw className="w-3 h-3" /> Reset all filters
            </button>
          )}
        </div>
      </div>

      {/* ── Error Banner ── */}
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          {error}
          <button onClick={() => setError(null)} className="ml-auto text-amber-400 hover:text-amber-200">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ── Loading Skeleton / Empty State / Grid ── */}
      {loading && images.length === 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {Array.from({ length: pageSize }).map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden bg-[#1A0D0A] border border-amber-500/10 animate-pulse">
              <div className="aspect-square bg-stone-800" />
              <div className="p-3 space-y-2">
                <div className="h-3 bg-stone-800 rounded w-3/4" />
                <div className="h-2 bg-stone-800 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : images.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-2xl bg-[#1A0D0A] border border-amber-500/15 text-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center">
            <ImagePlus className="w-8 h-8 text-amber-400/50" />
          </div>
          <div>
            <p className="text-base font-semibold text-amber-100/60">No gallery images found</p>
            <p className="text-sm text-stone-600 mt-1">
              {search || categoryFilter !== 'All' ? 'Try adjusting your filters' : 'Add your first image to get started'}
            </p>
          </div>
          <button
            onClick={() => { setEditRecord(null); setShowForm(true); }}
            className="flex items-center gap-2 py-2.5 px-5 rounded-xl bg-amber-600/25 hover:bg-amber-600/40 text-amber-300 border border-amber-500/35 text-sm font-semibold transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add First Image
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map((item) => (
            <GalleryCard
              key={String(item.id)}
              item={item}
              onView={() => setViewRecord(item)}
              onEdit={() => { setEditRecord(item); setShowForm(true); }}
              onDelete={() => setDeleteConfirm(item)}
            />
          ))}
        </div>
      )}

      {/* ── Pagination ── */}
      {totalElements > 0 && (
        <PaginationBar
          page={page}
          totalPages={totalPages}
          totalElements={totalElements}
          pageSize={pageSize}
          onPage={setPage}
        />
      )}

      {/* ── View Modal ── */}
      {viewRecord && (
        <ViewImageModal
          item={viewRecord}
          onClose={() => setViewRecord(null)}
          onEdit={() => {
            setEditRecord(viewRecord);
            setViewRecord(null);
            setShowForm(true);
          }}
        />
      )}

      {/* ── Add/Edit Form Modal ── */}
      {showForm && (
        <GalleryFormModal
          editRecord={editRecord}
          onClose={() => { setShowForm(false); setEditRecord(null); }}
          onSaved={handleSaved}
        />
      )}

      {/* ── Delete Confirm Modal ── */}
      {deleteConfirm && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
          onClick={() => setDeleteConfirm(null)}
        >
          <div
            className="bg-[#160A07] border border-rose-500/40 rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/15 flex items-center justify-center flex-shrink-0">
                <Trash2 className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <h4 className="text-base font-bold text-rose-300">Delete Gallery Image</h4>
                <p className="text-xs text-stone-400 mt-1">
                  Delete <strong className="text-stone-300">"{deleteConfirm.title}"</strong>? This will permanently remove the image from the gallery and the website. This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteConfirm(null)}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 text-sm font-medium transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl bg-rose-600/30 hover:bg-rose-600/50 text-rose-300 border border-rose-500/40 text-sm font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                {deleting ? 'Deleting…' : 'Delete Image'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminGalleryModule;

