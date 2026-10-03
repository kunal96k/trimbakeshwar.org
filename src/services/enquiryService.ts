/**
 * Shri Kshetra Trimbakeshwar Purohit Portal – Devotee Contact Enquiry API Service
 *
 * Handles:
 *  - Submitting contact form → POST /api/contact (Spring Boot backend)
 *  - Fetching paginated enquiries with server-side search / filter / sort
 *  - Status update PATCH /api/contact/{enquiryNumber}/status
 *  - Offline fallback via localStorage when backend is unreachable
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ContactEnquiryPayload {
  name: string;
  phone: string;
  email: string;
  city?: string;
  subject?: string;
  poojaRequested?: string;
  message: string;
  preferredDate?: string;
  preferredContactMethod?: string;
  language?: string;
  botField?: string;
}

export interface ContactEnquiryRecord {
  id?: number | string;
  enquiryNumber: string;
  name: string;
  email: string;
  phone: string;
  city?: string;
  subject?: string;
  poojaRequested?: string;
  devoteeMessage: string;
  preferredDate?: string;
  preferredContactMethod?: string;
  adminNotes?: string;
  status: string;
  createdAt: string;
  updatedAt?: string;
  isOfflineSaved?: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  leadCode?: string;
  enquiryNumber?: string;
  isOfflineSaved?: boolean;
}

/** Parameters for server-side paginated enquiry fetch */
export interface EnquiryFetchParams {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
  search?: string;
  status?: string;
  fromDate?: string;
  toDate?: string;
}

/** Spring Page response shape */
export interface PagedEnquiryResponse {
  content: ContactEnquiryRecord[];
  totalElements: number;
  totalPages: number;
  number: number;      // current page (0-based)
  size: number;
  first: boolean;
  last: boolean;
}

export interface PoojaBookingPayload {
  devoteeName: string;
  phone: string;
  email?: string;
  gotra?: string;
  city?: string;
  state?: string;
  devoteeAddress?: string;
  poojaType: string;
  poojaCategory?: string;
  scheduledDate: string;
  timeSlot?: string;
  location?: string;
  poojaAddress?: string;
  familyMembersCount?: number;
  advanceAmount?: number;
  paymentMethod?: string;
  utrNumber?: string;
  paymentApp?: string;
  paymentScreenshot?: string;
  notes?: string;
  language?: string;
}

export interface PaymentRecord {
  id?: number | string;
  paymentCode: string;
  bookingCode?: string;
  devoteeName: string;
  phone: string;
  email?: string;
  poojaType?: string;
  amount: number;
  currency?: string;
  paymentMethod?: string;
  paymentApp?: string;
  utrNumber?: string;
  paymentScreenshot?: string;
  status: 'pending_verification' | 'verified' | 'rejected' | 'refunded';
  verifiedBy?: string;
  verifiedAt?: string;
  rejectionReason?: string;
  adminNotes?: string;
  scheduledDate?: string;
  timeSlot?: string;
  gotra?: string;
  city?: string;
  state?: string;
  devoteeAddress?: string;
  poojaAddress?: string;
  familyMembersCount?: number;
  bookingQrStatus?: string;
  bookingEmailSent?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface PaymentFetchParams {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
  search?: string;
  status?: string;
  method?: string;
  fromDate?: string;
  toDate?: string;
}

export interface PagedPaymentResponse {
  content: PaymentRecord[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
}

export interface PaymentStats {
  totalCount: number;
  pendingCount: number;
  verifiedCount: number;
  rejectedCount: number;
  verifiedRevenue: number;
  currency: string;
}


// ─── Config ───────────────────────────────────────────────────────────────────

const API_BASE_URL =
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_API_BASE_URL) ||
  '/api';

// ─── Submit contact form ───────────────────────────────────────────────────────

/**
 * POST /api/contact — Submit a devotee contact form.
 * On backend failure, saves to localStorage as fallback.
 */
export async function submitContactEnquiry(
  enquiry: ContactEnquiryPayload
): Promise<ApiResponse<ContactEnquiryRecord>> {
  const backendPayload = {
    name: enquiry.name.trim(),
    email: enquiry.email.trim(),
    phone: enquiry.phone.trim(),
    city: enquiry.city?.trim() || 'Trimbakeshwar',
    subject: enquiry.subject?.trim() || enquiry.poojaRequested?.trim() || 'General Enquiry',
    poojaRequested: enquiry.poojaRequested?.trim() || enquiry.subject?.trim() || 'Ritual Consultation',
    message: enquiry.message.trim(),
    preferredDate: enquiry.preferredDate || '',
    preferredContactMethod: enquiry.preferredContactMethod || 'phone',
    language: enquiry.language || 'en',
    botField: enquiry.botField,
  };

  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(backendPayload),
    });

    if (response.ok) {
      const data = await response.json();
      const record: ContactEnquiryRecord = normaliseServerItem(data, enquiry);
      saveEnquiryLocally(record);
      return {
        success: true,
        message: data.message || 'Your contact enquiry has been received and saved successfully.',
        data: record,
        enquiryNumber: record.enquiryNumber,
        leadCode: record.enquiryNumber,
      };
    }

    // Non-2xx: parse error body for display
    let errMsg = 'Server error. Please try again.';
    try {
      const errBody = await response.json();
      errMsg = errBody.message || errBody.error || errMsg;
    } catch {
      errMsg = (await response.text()) || errMsg;
    }
    console.warn('Backend /api/contact returned non-200:', response.status, errMsg);
    return saveFallbackEnquiry(enquiry);
  } catch (err) {
    console.warn('Backend /api/contact unreachable, saving locally:', err);
    return saveFallbackEnquiry(enquiry);
  }
}

// ─── Date filter helper ────────────────────────────────────────────────────────
/**
 * Date range filter matcher adhering strictly to:
 * - If only fromDate is provided: matches records on that specific date only (exact single-day match)
 * - If only toDate is provided: matches records from earliest up to that date (<= toDate)
 * - If both fromDate & toDate are provided: matches records in the date range
 */
export function matchDateFilter(itemDateStr?: string, fromDate?: string, toDate?: string): boolean {
  if (!fromDate && !toDate) return true;
  if (!itemDateStr) return false;
  const dStr = itemDateStr.slice(0, 10);
  if (fromDate && toDate) {
    let f = fromDate;
    let t = toDate;
    if (f > t) { const tmp = f; f = t; t = tmp; }
    return dStr >= f && dStr <= t;
  }
  if (fromDate) {
    return dStr === fromDate;
  }
  if (toDate) {
    return dStr <= toDate;
  }
  return true;
}

// ─── Paginated fetch with server-side search / filter / sort ──────────────────

/**
 * GET /api/contact — Fetch paginated enquiries from the Spring Boot backend.
 * Returns a PagedEnquiryResponse so the UI can drive server-side pagination.
 *
 * Falls back to cached localStorage data when backend is unreachable.
 */
export async function fetchEnquiriesPage(
  params: EnquiryFetchParams = {}
): Promise<PagedEnquiryResponse> {
  const {
    page = 0,
    size = 20,
    sortBy = 'id',
    sortDir = 'desc',
    search = '',
    status = '',
    fromDate = '',
    toDate = '',
  } = params;

  const query = new URLSearchParams({
    page: String(page),
    size: String(size),
    sortBy,
    sortDir,
    ...(search   ? { search }   : {}),
    ...(status   ? { status }   : {}),
    ...(fromDate ? { fromDate } : {}),
    ...(toDate   ? { toDate }   : {}),
  });

  try {
    const response = await fetch(`${API_BASE_URL}/contact?${query}`, {
      headers: { Accept: 'application/json' },
    });

    if (response.ok) {
      const pageData = await response.json();
      const content: ContactEnquiryRecord[] = (pageData.content || []).map(
        (item: any) => normaliseServerItem(item)
      );

      // Refresh local cache with the latest server page
      try {
        localStorage.setItem('trimbak_contact_enquiries', JSON.stringify(content.slice(0, 100)));
      } catch { /* quota */ }

      return {
        content,
        totalElements: pageData.totalElements ?? content.length,
        totalPages:    pageData.totalPages    ?? 1,
        number:        pageData.number        ?? page,
        size:          pageData.size          ?? size,
        first:         pageData.first         ?? (page === 0),
        last:          pageData.last          ?? true,
      };
    }

    console.warn('Backend /api/contact GET returned non-200:', response.status);
  } catch (err) {
    console.debug('Using cached/local contact enquiries (backend unreachable):', err);
  }

  // Fallback: local cache filtered by search, status, and date range
  let localList = getStoredEnquiries();
  if (status) {
    localList = localList.filter((e) => e.status?.toUpperCase() === status.toUpperCase());
  }
  if (fromDate || toDate) {
    localList = localList.filter((e) => matchDateFilter(e.createdAt, fromDate, toDate));
  }
  if (search) {
    const q = search.toLowerCase();
    localList = localList.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.phone.includes(q) ||
        (e.email && e.email.toLowerCase().includes(q)) ||
        (e.enquiryNumber && e.enquiryNumber.toLowerCase().includes(q)) ||
        (e.city && e.city.toLowerCase().includes(q)) ||
        (e.subject && e.subject.toLowerCase().includes(q))
    );
  }

  return {
    content:       localList,
    totalElements: localList.length,
    totalPages:    1,
    number:        0,
    size:          localList.length,
    first:         true,
    last:          true,
  };
}

/**
 * @deprecated Use fetchEnquiriesPage() for server-side pagination.
 * Kept for backward compatibility with AdminApp's initial load.
 */
export async function fetchContactEnquiries(
  page: number = 0,
  size: number = 50
): Promise<ContactEnquiryRecord[]> {
  const result = await fetchEnquiriesPage({ page, size, sortBy: 'id', sortDir: 'desc' });
  return result.content;
}

// ─── Status update ─────────────────────────────────────────────────────────────

/**
 * PATCH /api/contact/{enquiryNumber}/status
 * Updates status optimistically in localStorage first, then syncs to backend.
 */
export async function updateContactEnquiryStatus(
  enquiryNumber: string,
  status: string,
  adminNotes?: string
): Promise<boolean> {
  // Optimistic local update
  const list = getStoredEnquiries();
  const updated = list.map((item) =>
    item.enquiryNumber === enquiryNumber
      ? { ...item, status: status.toUpperCase(), adminNotes: adminNotes ?? item.adminNotes }
      : item
  );
  try {
    localStorage.setItem('trimbak_contact_enquiries', JSON.stringify(updated));
    window.dispatchEvent(
      new CustomEvent('trimbak_enquiry_updated', { detail: { enquiryNumber, status } })
    );
  } catch { /* quota */ }

  // Sync to backend
  try {
    const res = await fetch(
      `${API_BASE_URL}/contact/${encodeURIComponent(enquiryNumber)}/status`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ status: status.toUpperCase(), adminNotes }),
      }
    );
    return res.ok;
  } catch (err) {
    console.warn('Backend status update offline; local cache updated:', err);
    return false;
  }
}

// ─── Delete enquiry ────────────────────────────────────────────────────────────

export async function deleteContactEnquiry(enquiryNumber: string): Promise<boolean> {
  // Update local cache
  const list = getStoredEnquiries();
  const updated = list.filter((item) => item.enquiryNumber !== enquiryNumber);
  try {
    localStorage.setItem('trimbak_contact_enquiries', JSON.stringify(updated));
    window.dispatchEvent(
      new CustomEvent('trimbak_enquiry_deleted', { detail: { enquiryNumber } })
    );
  } catch { /* quota */ }

  // Sync to backend
  try {
    const res = await fetch(
      `${API_BASE_URL}/contact/${encodeURIComponent(enquiryNumber)}`,
      {
        method: 'DELETE',
        headers: { Accept: 'application/json' },
      }
    );
    return res.ok;
  } catch (err) {
    console.warn('Backend delete offline; local cache updated:', err);
    return false;
  }
}

// ─── Fetch Stats ───────────────────────────────────────────────────────────────

export async function fetchContactEnquiryStats(): Promise<{
  total: number;
  newCount: number;
  contactedCount: number;
  bookedCount: number;
  closedCount: number;
}> {
  try {
    const res = await fetch(`${API_BASE_URL}/contact/stats`, {
      headers: { Accept: 'application/json' },
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Failed to fetch enquiry stats from backend:', err);
  }
  const localList = getStoredEnquiries();
  return {
    total: localList.length,
    newCount: localList.filter((e) => e.status?.toUpperCase() === 'NEW').length,
    contactedCount: localList.filter((e) => e.status?.toUpperCase() === 'CONTACTED').length,
    bookedCount: localList.filter((e) => e.status?.toUpperCase() === 'BOOKED').length,
    closedCount: localList.filter((e) => e.status?.toUpperCase() === 'CLOSED').length,
  };
}

export const fetchEnquiryStats = fetchContactEnquiryStats;

// ─── Paginated Booking Fetch ───────────────────────────────────────────────────

export interface BookingFetchParams {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
  search?: string;
  status?: string;
  fromDate?: string;
  toDate?: string;
}

export interface PagedBookingResponse {
  content: any[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
}

/**
 * Normalise a booking object from server entity or local cache to client-side Booking shape.
 */
export function normaliseServerBooking(b: any): any {
  if (!b) return null;
  const isVerified = b.qrStatus === 'verified';
  const isRejected = b.qrStatus === 'rejected';
  return {
    id: b.bookingCode || (b.id ? String(b.id) : `TRMB-${Date.now()}`),
    devoteeName: b.devoteeName || 'Devotee',
    phone: b.phone || '',
    email: b.email || '',
    gotra: b.gotra || 'Vedic Gotra',
    city: b.city || 'Trimbakeshwar',
    state: b.state || 'Maharashtra',
    devoteeAddress: b.devoteeAddress || b.yajmanAddress || b.address || '',
    poojaType: b.poojaType || 'Vedic Vidhi Puja',
    poojaCategory: b.poojaCategory || '',
    date: b.scheduledDate || b.date || '',
    time: b.timeSlot || b.time || '06:30 AM',
    location: b.location || '',
    poojaAddress: b.poojaAddress || b.location || '',
    status: isVerified ? 'upcoming' : 'pending_verification',
    statusLabel: isVerified ? 'Confirmed Booking' : isRejected ? 'Payment Rejected' : 'Token Under Verification',
    familyMembersCount: b.familyMembersCount || 1,
    advanceAmount: b.advanceAmount || 1000,
    totalPoojaDakshina: 'As per Vedic Scriptures',
    qrStatus: b.qrStatus || 'pending_verification',
    utrNumber: b.utrNumber || '',
    paymentApp: b.paymentApp || 'Google Pay',
    paymentScreenshot: b.paymentScreenshot || '',
    bookingDate: b.createdAt ? new Date(b.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Today',
    screenshotTimestamp: b.createdAt ? new Date(b.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '',
    emailSent: Boolean(b.emailSent),
    notes: b.notes || b.adminNotes || '',
    adminNotes: b.adminNotes || '',
    createdAt: b.createdAt || new Date().toISOString(),
  };
}

/**
 * GET /api/bookings — Fetch paginated bookings from Spring Boot backend.
 * Falls back to localStorage when backend is unreachable.
 */
export async function fetchBookingsPage(
  params: BookingFetchParams = {}
): Promise<PagedBookingResponse> {
  const {
    page = 0,
    size = 20,
    sortBy = 'id',
    sortDir = 'desc',
    search = '',
    status = '',
    fromDate = '',
    toDate = '',
  } = params;

  const query = new URLSearchParams({
    page: String(page),
    size: String(size),
    sortBy,
    sortDir,
    ...(search   ? { search }   : {}),
    ...(status   ? { status }   : {}),
    ...(fromDate ? { fromDate } : {}),
    ...(toDate   ? { toDate }   : {}),
  });

  try {
    const response = await fetch(`${API_BASE_URL}/bookings?${query}`, {
      headers: { Accept: 'application/json' },
    });

    if (response.ok) {
      const pageData = await response.json();
      const rawContent = pageData.content || [];
      const content = rawContent.map(normaliseServerBooking).filter(Boolean);
      try {
        localStorage.setItem('trimbak_bookings', JSON.stringify(content.slice(0, 100)));
      } catch { /* quota */ }

      return {
        content,
        totalElements: pageData.totalElements ?? content.length,
        totalPages: pageData.totalPages ?? 1,
        number: pageData.number ?? page,
        size: pageData.size ?? size,
        first: pageData.first ?? (page === 0),
        last: pageData.last ?? true,
      };
    }
    console.warn('Backend /api/bookings GET returned non-200:', response.status);
  } catch (err) {
    console.debug('Using cached bookings (backend unreachable):', err);
  }

  // Fallback: localStorage
  let localList = getStoredBookings();
  if (status) {
    localList = localList.filter((b: any) => b.qrStatus === status);
  }
  if (fromDate || toDate) {
    localList = localList.filter((b: any) => matchDateFilter(b.createdAt || b.date, fromDate, toDate));
  }
  if (search) {
    const q = search.toLowerCase();
    localList = localList.filter(
      (b: any) =>
        b.devoteeName?.toLowerCase().includes(q) ||
        b.phone?.includes(q) ||
        (b.email && b.email.toLowerCase().includes(q)) ||
        (b.id && b.id.toLowerCase().includes(q)) ||
        (b.utrNumber && b.utrNumber.toLowerCase().includes(q)) ||
        (b.poojaType && b.poojaType.toLowerCase().includes(q)) ||
        (b.city && b.city.toLowerCase().includes(q))
    );
  }

  return {
    content: localList,
    totalElements: localList.length,
    totalPages: 1,
    number: 0,
    size: localList.length,
    first: true,
    last: true,
  };
}

/**
 * GET /api/bookings/stats — Booking summary counts.
 */
export async function fetchBookingStats(): Promise<{
  total: number;
  pendingCount: number;
  verifiedCount: number;
  rejectedCount: number;
}> {
  try {
    const res = await fetch(`${API_BASE_URL}/bookings/stats`, {
      headers: { Accept: 'application/json' },
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Failed to fetch booking stats from backend:', err);
  }
  const localList = getStoredBookings();
  return {
    total: localList.length,
    pendingCount: localList.filter((b: any) => b.qrStatus === 'pending_verification').length,
    verifiedCount: localList.filter((b: any) => b.qrStatus === 'verified').length,
    rejectedCount: localList.filter((b: any) => b.qrStatus === 'rejected').length,
  };
}

/**
 * PATCH /api/bookings/{bookingCode}/status — Verify or reject payment.
 */
export async function updateBookingPaymentStatus(
  bookingCode: string,
  qrStatus: 'verified' | 'rejected',
  adminNotes?: string
): Promise<boolean> {
  // Optimistic local update
  const list = getStoredBookings();
  const updated = list.map((b: any) =>
    b.id === bookingCode
      ? {
          ...b,
          qrStatus,
          statusLabel: qrStatus === 'verified' ? 'Confirmed Booking' : 'Payment Rejected',
          emailSent: qrStatus === 'verified' ? true : b.emailSent,
        }
      : b
  );
  try {
    localStorage.setItem('trimbak_bookings', JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('trimbak_booking_updated', { detail: { bookingCode, qrStatus } }));
  } catch { /* quota */ }

  try {
    const res = await fetch(
      `${API_BASE_URL}/bookings/${encodeURIComponent(bookingCode)}/status`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ qrStatus, adminNotes }),
      }
    );
    return res.ok;
  } catch (err) {
    console.warn('Backend booking status update offline; local cache updated:', err);
    return false;
  }
}

export function getStoredBookings(): any[] {
  try {
    const list = JSON.parse(localStorage.getItem('trimbak_bookings') || '[]');
    if (!Array.isArray(list)) return [];
    const mockIds = new Set(['TRMB-2026-1081', 'TRMB-2026-1082', 'TRMB-2026-1083', 'TRMB-2026-1084', 'TRMB-2026-1085', 'TRMB-2026-1086']);
    return list.filter((b: any) => b && !mockIds.has(b.id)).map(normaliseServerBooking).filter(Boolean);
  } catch {
    return [];
  }
}

// ─── Pooja Booking Submission (with real backend POST, localStorage fallback) ──

export async function submitPoojaBooking(
  booking: PoojaBookingPayload
): Promise<ApiResponse> {
  const year = new Date().getFullYear();
  const uniqueSuffix = `${Date.now().toString().slice(-6)}${Math.floor(10 + Math.random() * 90)}`;
  const code = `TRMB-${year}-${uniqueSuffix}`;
  const now = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const fullBooking = {
    id: code,
    devoteeName: booking.devoteeName.trim(),
    phone: booking.phone.trim(),
    email: booking.email?.trim() || '',
    poojaType: booking.poojaType || 'Vedic Vidhi Puja',
    date: booking.scheduledDate,
    time: booking.timeSlot || '06:30 AM',
    location: booking.location || '',
    poojaAddress: booking.poojaAddress || booking.location || '',
    status: 'upcoming',
    statusLabel: 'Payment Under Verification',
    gotra: booking.gotra ? (booking.gotra.includes('Gotra') ? booking.gotra : `${booking.gotra} Gotra`) : 'Kashyap Gotra',
    city: booking.city || 'Trimbakeshwar',
    state: booking.state || 'Maharashtra',
    devoteeAddress: booking.devoteeAddress || (booking as any).yajmanAddress || (booking as any).address || '',
    familyMembersCount: booking.familyMembersCount || 2,
    advanceAmount: booking.advanceAmount || 1000,
    totalPoojaDakshina: 'As per Vedic Scriptures',
    qrStatus: 'pending_verification',
    utrNumber: booking.utrNumber || `UPI/${Date.now().toString().slice(-8)}`,
    paymentApp: booking.paymentApp || 'Google Pay',
    bookingDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
    screenshotTimestamp: now,
    paymentScreenshot: booking.paymentScreenshot || '',
    notes: booking.notes || 'Devotee advance token submitted for verification.',
    createdAt: new Date().toISOString(),
  };

  // Try real backend POST /api/bookings
  try {
    const backendPayload = {
      bookingCode: code,
      devoteeName: fullBooking.devoteeName,
      phone: fullBooking.phone,
      email: fullBooking.email,
      gotra: fullBooking.gotra,
      city: fullBooking.city,
      state: fullBooking.state,
      devoteeAddress: fullBooking.devoteeAddress,
      poojaType: fullBooking.poojaType,
      poojaCategory: booking.poojaCategory,
      scheduledDate: booking.scheduledDate,
      timeSlot: booking.timeSlot || '06:30 AM',
      location: fullBooking.location,
      poojaAddress: fullBooking.poojaAddress,
      familyMembersCount: fullBooking.familyMembersCount,
      advanceAmount: fullBooking.advanceAmount,
      paymentMethod: booking.paymentMethod || 'qr',
      paymentApp: fullBooking.paymentApp,
      utrNumber: fullBooking.utrNumber,
      paymentScreenshot: fullBooking.paymentScreenshot,
      notes: fullBooking.notes,
      language: booking.language || 'en',
    };

    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(backendPayload),
    });

    if (response.ok) {
      const data = await response.json();
      const serverCode = data.bookingCode || data.leadCode || code;
      fullBooking.id = serverCode;

      // Persist to localStorage from server response
      saveBookingLocally({ ...fullBooking, id: serverCode });
      return {
        success: true,
        message: "Your Pooja booking and UPI payment screenshot have been submitted to Guruji's sacred ledger for verification.",
        leadCode: serverCode,
        data: { ...fullBooking, id: serverCode },
      };
    }
    console.warn('Backend /api/bookings returned non-200:', response.status);
  } catch (err) {
    console.warn('Backend /api/bookings unreachable, saving locally:', err);
  }

  // Fallback: save to localStorage
  saveBookingLocally(fullBooking);
  return {
    success: true,
    message: "Your Pooja booking and UPI payment screenshot have been submitted to Guruji's sacred ledger for verification.",
    leadCode: code,
    data: fullBooking,
  };
}

function saveBookingLocally(booking: any) {
  try {
    const existing = getStoredBookings();
    const filtered = existing.filter((b: any) => b.id !== booking.id);
    filtered.unshift(booking);
    localStorage.setItem('trimbak_bookings', JSON.stringify(filtered.slice(0, 100)));
    localStorage.setItem('trimbak_offline_bookings', JSON.stringify(filtered.slice(0, 100)));
    localStorage.setItem('trimbak_last_booking_time', Date.now().toString());

    // Dispatch global event for live admin dashboard sync
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('trimbak_booking_submitted', { detail: booking }));
    }
  } catch (err) {
    console.warn('LocalStorage booking save warning:', err);
  }
}


// ─── localStorage helpers ─────────────────────────────────────────────────────

export function getStoredEnquiries(): ContactEnquiryRecord[] {
  try {
    return JSON.parse(localStorage.getItem('trimbak_contact_enquiries') || '[]');
  } catch {
    return [];
  }
}

function saveEnquiryLocally(record: ContactEnquiryRecord) {
  try {
    const existing = getStoredEnquiries();
    const filtered = existing.filter((item) => item.enquiryNumber !== record.enquiryNumber);
    filtered.unshift(record);
    localStorage.setItem('trimbak_contact_enquiries', JSON.stringify(filtered.slice(0, 100)));
    localStorage.setItem('trimbak_last_enquiry_time', Date.now().toString());
    window.dispatchEvent(new CustomEvent('trimbak_enquiry_submitted', { detail: record }));
  } catch (e) {
    console.warn('LocalStorage save failed:', e);
  }
}

function saveFallbackEnquiry(enquiry: ContactEnquiryPayload): ApiResponse<ContactEnquiryRecord> {
  const enquiryNumber = `TRK-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
  const record: ContactEnquiryRecord = {
    id: Date.now(),
    enquiryNumber,
    name: enquiry.name.trim(),
    email: enquiry.email.trim(),
    phone: enquiry.phone.trim(),
    city: enquiry.city?.trim() || 'Trimbakeshwar',
    subject: enquiry.subject?.trim() || enquiry.poojaRequested?.trim() || 'General Enquiry',
    poojaRequested: enquiry.poojaRequested?.trim() || enquiry.subject?.trim() || 'Ritual Consultation',
    devoteeMessage: enquiry.message.trim(),
    preferredDate: enquiry.preferredDate || '',
    preferredContactMethod: enquiry.preferredContactMethod || 'phone',
    status: 'NEW',
    createdAt: new Date().toISOString(),
    isOfflineSaved: true,
  };
  saveEnquiryLocally(record);
  return {
    success: true,
    message: 'Your contact enquiry has been received and saved successfully.',
    data: record,
    enquiryNumber: record.enquiryNumber,
    leadCode: record.enquiryNumber,
    isOfflineSaved: true,
  };
}

// ─── Internal normaliser ──────────────────────────────────────────────────────

function normaliseServerItem(
  item: any,
  fallback?: ContactEnquiryPayload
): ContactEnquiryRecord {
  return {
    id:                    item.id,
    enquiryNumber:         item.enquiryNumber || `TRK-${item.id}`,
    name:                  item.name          || fallback?.name   || '',
    email:                 item.email         || fallback?.email  || '',
    phone:                 item.phone         || fallback?.phone  || '',
    city:                  item.city          || fallback?.city   || 'Trimbakeshwar',
    subject:               item.subject       || fallback?.subject || 'General Enquiry',
    poojaRequested:        item.poojaRequested || item.subject    || 'Ritual Consultation',
    devoteeMessage:        item.devoteeMessage || item.message    || '',
    preferredDate:         item.preferredDate  || fallback?.preferredDate || '',
    preferredContactMethod: item.preferredContactMethod || fallback?.preferredContactMethod || 'phone',
    adminNotes:            item.adminNotes     || '',
    status:                item.status         || 'NEW',
    createdAt:             item.createdAt      || new Date().toISOString(),
    updatedAt:             item.updatedAt,
  };
}

// ─── Payment Module API Functions ─────────────────────────────────────────────

export function normaliseServerPayment(p: any): PaymentRecord {
  if (!p) return null as any;
  return {
    id: p.id,
    paymentCode: p.paymentCode || `PAY-${Date.now()}`,
    bookingCode: p.bookingCode || '',
    devoteeName: p.devoteeName || 'Devotee',
    phone: p.phone || '',
    email: p.email || '',
    poojaType: p.poojaType || 'Vedic Vidhi Pooja',
    amount: typeof p.amount === 'number' ? p.amount : 1000,
    currency: p.currency || 'INR',
    paymentMethod: p.paymentMethod || 'qr',
    paymentApp: p.paymentApp || 'Google Pay',
    utrNumber: p.utrNumber || '',
    paymentScreenshot: p.paymentScreenshot || '',
    status: p.status || 'pending_verification',
    verifiedBy: p.verifiedBy,
    verifiedAt: p.verifiedAt,
    rejectionReason: p.rejectionReason,
    adminNotes: p.adminNotes || '',
    scheduledDate: p.scheduledDate,
    timeSlot: p.timeSlot,
    gotra: p.gotra,
    city: p.city,
    bookingQrStatus: p.bookingQrStatus,
    bookingEmailSent: Boolean(p.bookingEmailSent),
    createdAt: p.createdAt || new Date().toISOString(),
    updatedAt: p.updatedAt,
  };
}

/**
 * GET /api/payments — Fetch paginated payments from Spring Boot backend.
 * Falls back to local cached payments or synthesized payments from bookings.
 */
export async function fetchPaymentsPage(
  params: PaymentFetchParams = {}
): Promise<PagedPaymentResponse> {
  const {
    page = 0,
    size = 20,
    sortBy = 'id',
    sortDir = 'desc',
    search = '',
    status = '',
    method = '',
    fromDate = '',
    toDate = '',
  } = params;

  const query = new URLSearchParams({
    page: String(page),
    size: String(size),
    sortBy,
    sortDir,
    ...(search   ? { search }   : {}),
    ...(status   ? { status }   : {}),
    ...(method   ? { method }   : {}),
    ...(fromDate ? { fromDate } : {}),
    ...(toDate   ? { toDate }   : {}),
  });

  try {
    const response = await fetch(`${API_BASE_URL}/payments?${query}`, {
      headers: { Accept: 'application/json' },
    });

    if (response.ok) {
      const pageData = await response.json();
      const rawContent = pageData.content || [];
      const content = rawContent.map(normaliseServerPayment).filter(Boolean);
      try {
        localStorage.setItem('trimbak_payments', JSON.stringify(content.slice(0, 100)));
      } catch { /* quota */ }

      return {
        content,
        totalElements: pageData.totalElements ?? content.length,
        totalPages: pageData.totalPages ?? 1,
        number: pageData.number ?? page,
        size: pageData.size ?? size,
        first: pageData.first ?? (page === 0),
        last: pageData.last ?? true,
      };
    }
  } catch (err) {
    console.debug('Backend /api/payments unreachable; using cached fallback:', err);
  }

  // Fallback from localStorage or bookings
  const localPayments = getStoredPayments();
  let filtered = localPayments;
  if (status) {
    filtered = filtered.filter((p) => p.status === status);
  }
  if (method) {
    filtered = filtered.filter((p) => p.paymentMethod === method);
  }
  if (fromDate || toDate) {
    filtered = filtered.filter((p) => matchDateFilter(p.createdAt, fromDate, toDate));
  }
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.devoteeName.toLowerCase().includes(q) ||
        p.phone.includes(q) ||
        (p.email && p.email.toLowerCase().includes(q)) ||
        (p.utrNumber && p.utrNumber.toLowerCase().includes(q)) ||
        (p.paymentCode && p.paymentCode.toLowerCase().includes(q)) ||
        (p.bookingCode && p.bookingCode.toLowerCase().includes(q))
    );
  }

  return {
    content: filtered,
    totalElements: filtered.length,
    totalPages: 1,
    number: 0,
    size: filtered.length,
    first: true,
    last: true,
  };
}

/**
 * GET /api/payments/stats — Payment summary metrics.
 */
export async function fetchPaymentStats(): Promise<PaymentStats> {
  try {
    const res = await fetch(`${API_BASE_URL}/payments/stats`, {
      headers: { Accept: 'application/json' },
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Failed to fetch payment stats from backend:', err);
  }

  const localList = getStoredPayments();
  const verifiedList = localList.filter((p) => p.status === 'verified');
  return {
    totalCount: localList.length,
    pendingCount: localList.filter((p) => p.status === 'pending_verification').length,
    verifiedCount: verifiedList.length,
    rejectedCount: localList.filter((p) => p.status === 'rejected').length,
    verifiedRevenue: verifiedList.reduce((acc, p) => acc + (p.amount || 1000), 0),
    currency: 'INR',
  };
}

/**
 * PATCH /api/payments/{paymentCode}/verify — Verify payment & confirm linked booking.
 */
export async function verifyPaymentApi(
  paymentCode: string,
  adminNotes?: string,
  verifiedBy?: string
): Promise<boolean> {
  // Update local payment cache
  const list = getStoredPayments();
  let linkedBookingCode = '';
  const updated = list.map((p) => {
    if (p.paymentCode === paymentCode) {
      linkedBookingCode = p.bookingCode || '';
      return {
        ...p,
        status: 'verified' as const,
        verifiedAt: new Date().toISOString(),
        verifiedBy: verifiedBy || 'Pt. Pravin Shambhu Deshmukh (Admin)',
        adminNotes: adminNotes || p.adminNotes,
      };
    }
    return p;
  });
  try {
    localStorage.setItem('trimbak_payments', JSON.stringify(updated));
  } catch { /* quota */ }

  // If linked booking exists, also update booking locally
  if (linkedBookingCode) {
    updateBookingPaymentStatus(linkedBookingCode, 'verified', adminNotes).catch(() => {});
  }

  try {
    const res = await fetch(
      `${API_BASE_URL}/payments/${encodeURIComponent(paymentCode)}/verify`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ status: 'verified', adminNotes, verifiedBy }),
      }
    );
    return res.ok;
  } catch (err) {
    console.warn('Backend verify payment offline; local cache updated:', err);
    return false;
  }
}

/**
 * PATCH /api/payments/{paymentCode}/reject — Reject payment with reason.
 */
export async function rejectPaymentApi(
  paymentCode: string,
  reason: string,
  adminNotes?: string
): Promise<boolean> {
  const list = getStoredPayments();
  let linkedBookingCode = '';
  const updated = list.map((p) => {
    if (p.paymentCode === paymentCode) {
      linkedBookingCode = p.bookingCode || '';
      return {
        ...p,
        status: 'rejected' as const,
        rejectionReason: reason,
        adminNotes: adminNotes || p.adminNotes,
      };
    }
    return p;
  });
  try {
    localStorage.setItem('trimbak_payments', JSON.stringify(updated));
  } catch { /* quota */ }

  if (linkedBookingCode) {
    updateBookingPaymentStatus(linkedBookingCode, 'rejected', reason).catch(() => {});
  }

  try {
    const res = await fetch(
      `${API_BASE_URL}/payments/${encodeURIComponent(paymentCode)}/reject`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ status: 'rejected', reason, adminNotes }),
      }
    );
    return res.ok;
  } catch (err) {
    console.warn('Backend reject payment offline; local cache updated:', err);
    return false;
  }
}

/**
 * POST /api/payments — Record manual or client payment.
 */
export async function createPaymentApi(
  payload: Partial<PaymentRecord>
): Promise<ApiResponse<PaymentRecord>> {
  try {
    const res = await fetch(`${API_BASE_URL}/payments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      const data = await res.json();
      return {
        success: true,
        message: 'Payment registered successfully',
        data,
      };
    }
  } catch (err) {
    console.warn('Backend payment creation offline; saving locally:', err);
  }

  const newPayment: PaymentRecord = {
    paymentCode: payload.paymentCode || `PAY-${new Date().getFullYear()}-${Date.now().toString().slice(-5)}`,
    bookingCode: payload.bookingCode,
    devoteeName: payload.devoteeName || 'Devotee',
    phone: payload.phone || '',
    email: payload.email,
    poojaType: payload.poojaType || 'Vedic Pooja',
    amount: payload.amount || 1000,
    currency: 'INR',
    paymentMethod: payload.paymentMethod || 'qr',
    paymentApp: payload.paymentApp || 'Google Pay',
    utrNumber: payload.utrNumber,
    paymentScreenshot: payload.paymentScreenshot,
    status: payload.status || 'pending_verification',
    adminNotes: payload.adminNotes,
    createdAt: new Date().toISOString(),
  };

  const current = getStoredPayments();
  const updated = [newPayment, ...current];
  try {
    localStorage.setItem('trimbak_payments', JSON.stringify(updated.slice(0, 100)));
  } catch { /* quota */ }

  return {
    success: true,
    message: 'Payment saved locally (offline mode)',
    data: newPayment,
  };
}

/**
 * DELETE /api/payments/{paymentCode}
 */
export async function deletePaymentApi(paymentCode: string): Promise<boolean> {
  const list = getStoredPayments();
  const updated = list.filter((p) => p.paymentCode !== paymentCode);
  try {
    localStorage.setItem('trimbak_payments', JSON.stringify(updated));
  } catch { /* quota */ }

  try {
    const res = await fetch(`${API_BASE_URL}/payments/${encodeURIComponent(paymentCode)}`, {
      method: 'DELETE',
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Helper: Retrieve stored payments from localStorage, or generate from stored bookings
 */
export function getStoredPayments(): PaymentRecord[] {
  try {
    const raw = localStorage.getItem('trimbak_payments');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(normaliseServerPayment).filter(Boolean);
      }
    }
  } catch { /* parse error */ }

  // Synthesize payments from stored bookings if no direct payments in cache
  const bookings = getStoredBookings();
  if (Array.isArray(bookings) && bookings.length > 0) {
    return bookings.map((b: any) => ({
      paymentCode: `PAY-${b.id?.replace(/^TRMB-/, '') || Date.now()}`,
      bookingCode: b.id,
      devoteeName: b.devoteeName,
      phone: b.phone,
      email: b.email,
      poojaType: b.poojaType,
      amount: b.advanceAmount || 1000,
      currency: 'INR',
      paymentMethod: b.paymentMethod || 'qr',
      paymentApp: b.paymentApp || 'Google Pay',
      utrNumber: b.utrNumber,
      paymentScreenshot: b.paymentScreenshot,
      status: (b.qrStatus === 'verified' ? 'verified' : b.qrStatus === 'rejected' ? 'rejected' : 'pending_verification') as any,
      scheduledDate: b.date,
      timeSlot: b.time,
      gotra: b.gotra,
      city: b.city,
      bookingQrStatus: b.qrStatus,
      bookingEmailSent: b.emailSent,
      createdAt: b.createdAt || new Date().toISOString(),
    }));
  }
  return [];
}

// ─── OTP Verification API Service ──────────────────────────────────────────

export interface OtpSendPayload {
  email: string;
  bookingCode?: string;
  devoteeName?: string;
  poojaType?: string;
  purpose?: string;
}

export interface OtpVerifyPayload {
  email: string;
  otp: string;
  bookingCode?: string;
}

export interface OtpResponseData {
  success: boolean;
  message: string;
  maskedEmail?: string;
  expiresInSeconds?: number;
  action?: string;
  blocked?: boolean;
  remainingAttempts?: number;
}

/**
 * POST /api/otp/send — Generate authentic 6-digit OTP and send via official temple email template.
 */
export async function sendOtpApi(payload: OtpSendPayload): Promise<OtpResponseData> {
  try {
    const res = await fetch(`${API_BASE_URL}/otp/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      return await res.json();
    }
    const err = await res.json().catch(() => ({}));
    return {
      success: false,
      message: err.message || 'Unable to send OTP. Please check your email address.',
      blocked: err.blocked || false,
    };
  } catch (e: any) {
    console.warn('Backend OTP send error:', e);
    return {
      success: false,
      message: 'Unable to reach the verification server. Please check your internet connection or try again.',
      blocked: false,
    };
  }
}

/**
 * POST /api/otp/verify — Verify authentic 6-digit OTP against backend SHA-256 hash.
 */
export async function verifyOtpApi(payload: OtpVerifyPayload): Promise<OtpResponseData> {
  try {
    const res = await fetch(`${API_BASE_URL}/otp/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      return await res.json();
    }
    const err = await res.json().catch(() => ({}));
    return {
      success: false,
      message: err.message || 'Invalid verification code entered.',
      remainingAttempts: err.remainingAttempts,
      blocked: err.blocked,
    };
  } catch (e: any) {
    console.warn('Backend OTP verify error:', e);
    return {
      success: false,
      message: 'Verification server unreachable. Please try again.',
      blocked: false,
    };
  }
}

