import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AdminTab, Booking, DevoteeLead } from '../types';
import {
  CalendarCheck,
  QrCode,
  MessageSquareQuote,
  ImagePlus,
  BarChart3,
  Settings,
  ArrowLeft,
  Plus,
  Phone,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Database,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Mail,
  X,
  Loader2,
  Trash2,
  Eye,
  Download,
  FileSpreadsheet,
  FileText,
  Printer,
  Calendar,
  MapPin,
  Clock,
  Check,
  Bell,
  Lock,
  Inbox,
  RotateCcw,
  Copy,
  ExternalLink,
  ZoomIn,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Upload,
} from 'lucide-react';
import {
  fetchEnquiriesPage,
  updateContactEnquiryStatus,
  deleteContactEnquiry,
  ContactEnquiryRecord,
  PagedEnquiryResponse,
  EnquiryFetchParams,
  fetchBookingsPage,
  fetchBookingStats,
  updateBookingPaymentStatus,
} from '../../services/enquiryService';
import {
  getTempleUpiConfig,
  saveTempleUpiConfig,
  resetTempleUpiConfig,
  DEFAULT_TEMPLE_UPI_CONFIG,
  UPI_CONFIG_UPDATED_EVENT,
  TempleUpiConfig,
} from '../../services/templePaymentConfig';

// ─── Types ────────────────────────────────────────────────────────────────────

interface SubmodulePlaceholderProps {
  activeTab: AdminTab;
  onBackToDashboard: () => void;
  bookings: Booking[];
  leads: DevoteeLead[];
  onOpenNewBooking: () => void;
  onSelectBookingForQR: (booking: Booking) => void;
  onLeadContacted?: (leadId: string) => void;
  onRefreshLeads?: () => void;
}

type SortField = 'id' | 'createdAt' | 'name' | 'status' | 'enquiryNumber' | 'city';
type StatusFilter = '' | 'NEW' | 'CONTACTED' | 'BOOKED' | 'CLOSED';

// ─── Export Utilities ─────────────────────────────────────────────────────────

function exportToCSV(enquiries: ContactEnquiryRecord[]) {
  const headers = [
    'Enquiry No',
    'Devotee Name',
    'Email',
    'Phone',
    'City',
    'Pooja Requested',
    'Preferred Date',
    'Preferred Contact Method',
    'Status',
    'Submitted Timestamp',
    'Devotee Message',
    'Admin Notes',
  ];

  const rows = enquiries.map((e) => [
    `"${(e.enquiryNumber || '').replace(/"/g, '""')}"`,
    `"${(e.name || '').replace(/"/g, '""')}"`,
    `"${(e.email || '').replace(/"/g, '""')}"`,
    `"${(e.phone || '').replace(/"/g, '""')}"`,
    `"${(e.city || 'Trimbakeshwar').replace(/"/g, '""')}"`,
    `"${(e.poojaRequested || e.subject || '').replace(/"/g, '""')}"`,
    `"${(e.preferredDate || 'Flexible').replace(/"/g, '""')}"`,
    `"${(e.preferredContactMethod || 'phone').replace(/"/g, '""')}"`,
    `"${(e.status || 'NEW').replace(/"/g, '""')}"`,
    `"${(e.createdAt ? new Date(e.createdAt).toLocaleString('en-IN') : '').replace(/"/g, '""')}"`,
    `"${(e.devoteeMessage || '').replace(/"/g, '""')}"`,
    `"${(e.adminNotes || '').replace(/"/g, '""')}"`,
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Trimbakeshwar_Devotee_Enquiries_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function exportToExcel(enquiries: ContactEnquiryRecord[]) {
  const tableHtml = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Devotee Enquiries</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
      <meta http-equiv="content-type" content="text/plain; charset=UTF-8"/>
      <style>
        body { font-family: Calibri, sans-serif; font-size: 11pt; }
        h2 { color: #5A1717; }
        th { background-color: #B88935; color: #FFFFFF; font-weight: bold; border: 1px solid #7D5915; padding: 8px; text-align: left; }
        td { border: 1px solid #E2E8F0; padding: 6px 8px; }
        .num { mso-number-format:"\\@"; }
        .status-new { background-color: #FEF3C7; color: #92400E; font-weight: bold; }
        .status-contacted { background-color: #DBEAFE; color: #1E40AF; font-weight: bold; }
        .status-booked { background-color: #D1FAE5; color: #065F46; font-weight: bold; }
        .status-closed { background-color: #F3F4F6; color: #374151; }
      </style>
    </head>
    <body>
      <h2>Shri Kshetra Trimbakeshwar Jyotirlinga - Devotee Contact Enquiries Ledger</h2>
      <p>Official Vatandar Purohit Portal · Exported on: ${new Date().toLocaleString('en-IN')}</p>
      <table>
        <thead>
          <tr>
            <th>Enquiry No</th>
            <th>Devotee Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
            <th>Pooja Requested</th>
            <th>Preferred Date</th>
            <th>Method</th>
            <th>Status</th>
            <th>Submitted At</th>
            <th>Devotee Message</th>
            <th>Admin Notes</th>
          </tr>
        </thead>
        <tbody>
          ${enquiries
      .map(
        (e) => `
            <tr>
              <td class="num" style="font-weight: bold;">${e.enquiryNumber}</td>
              <td><strong>${e.name}</strong></td>
              <td>${e.email}</td>
              <td class="num">${e.phone}</td>
              <td>${e.city || 'Trimbakeshwar'}</td>
              <td>${e.poojaRequested || e.subject || 'Ritual'}</td>
              <td>${e.preferredDate || 'Flexible'}</td>
              <td>${e.preferredContactMethod || 'phone'}</td>
              <td class="status-${(e.status || 'new').toLowerCase()}">${e.status}</td>
              <td>${e.createdAt ? new Date(e.createdAt).toLocaleString('en-IN') : ''}</td>
              <td>${e.devoteeMessage || ''}</td>
              <td>${e.adminNotes || ''}</td>
            </tr>
          `
      )
      .join('')}
        </tbody>
      </table>
    </body>
    </html>
  `;

  const blob = new Blob(['\uFEFF' + tableHtml], { type: 'application/vnd.ms-excel;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Trimbakeshwar_Devotee_Enquiries_${new Date().toISOString().slice(0, 10)}.xls`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function exportToPDF(enquiries: ContactEnquiryRecord[]) {
  const printWindow = window.open('', '_blank', 'width=1100,height=800');
  if (!printWindow) {
    alert('Please allow popups to generate the printable PDF document.');
    return;
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Trimbakeshwar Devotee Enquiries Report</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; color: #1a1a1a; padding: 24px; font-size: 11px; margin: 0; }
        .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #b88935; padding-bottom: 12px; margin-bottom: 14px; }
        .title { font-size: 18px; font-weight: bold; color: #5a1717; }
        .subtitle { font-size: 11px; color: #b88935; margin-top: 2px; }
        .meta { text-align: right; font-size: 10px; color: #666; font-family: monospace; }
        table { width: 100%; border-collapse: collapse; margin-top: 8px; }
        th { background-color: #5a1717; color: #ffffff; text-align: left; padding: 6px 8px; font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; border: 1px solid #4a1212; }
        td { border: 1px solid #e5e5e5; padding: 6px 8px; font-size: 10px; vertical-align: top; }
        tr:nth-child(even) { background-color: #faf7f2; }
        .badge { display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 9px; font-weight: bold; font-family: monospace; }
        .badge-NEW { background: #fef3c7; color: #92400e; border: 1px solid #f59e0b; }
        .badge-CONTACTED { background: #dbeafe; color: #1e40af; border: 1px solid #3b82f6; }
        .badge-BOOKED { background: #d1fae5; color: #065f46; border: 1px solid #10b981; }
        .badge-CLOSED { background: #f3f4f6; color: #374151; border: 1px solid #9ca3af; }
        .footer { margin-top: 16px; font-size: 9px; color: #888; text-align: center; border-top: 1px solid #ddd; padding-top: 8px; }
        @media print {
          @page { size: landscape; margin: 10mm; }
          body { padding: 0; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <div class="title">श्री क्षेत्र त्र्यंबकेश्वर ज्योतिर्लिंग · Devotee Contact Enquiries</div>
          <div class="subtitle">Hereditary Vatandar Tirth Purohit Office · Verified Devotee Registry</div>
        </div>
        <div class="meta">
          <div>Generated: ${new Date().toLocaleString('en-IN')}</div>
          <div>Records: ${enquiries.length} Enquiries</div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Enquiry No</th>
            <th>Devotee Name</th>
            <th>Contact Details</th>
            <th>City</th>
            <th>Pooja Requested</th>
            <th>Preferred Date</th>
            <th>Status</th>
            <th>Devotee Message</th>
          </tr>
        </thead>
        <tbody>
          ${enquiries
      .map(
        (e) => `
            <tr>
              <td style="font-family: monospace; font-weight: bold; color: #5a1717;">${e.enquiryNumber}</td>
              <td><strong>${e.name}</strong></td>
              <td>${e.phone}<br/><span style="color:#666;">${e.email}</span></td>
              <td>${e.city || 'Trimbakeshwar'}</td>
              <td>${e.poojaRequested || e.subject || 'Ritual'}</td>
              <td>${e.preferredDate || 'Flexible'}</td>
              <td><span class="badge badge-${e.status}">${e.status}</span></td>
              <td>${e.devoteeMessage || '-'}</td>
            </tr>
          `
      )
      .join('')}
        </tbody>
      </table>
      <div class="footer">
        Sacred Vatandar Purohit Portal · 25 Generations Lineage Archive · Confidential Office Ledger
      </div>
      <script>
        window.onload = function() {
          window.print();
        };
      </script>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
}

// ─── Status Badge Helper ──────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const upper = status?.toUpperCase() ?? 'NEW';
  const cfg: Record<string, { cls: string; icon: React.ReactNode; label: string }> = {
    NEW: { cls: 'bg-amber-500/20 text-amber-300 border-amber-500/40', icon: <AlertCircle className="w-3 h-3" />, label: 'New' },
    CONTACTED: { cls: 'bg-blue-500/20 text-blue-300 border-blue-500/40', icon: <Phone className="w-3 h-3" />, label: 'Contacted' },
    BOOKED: { cls: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40', icon: <CheckCircle2 className="w-3 h-3" />, label: 'Booked' },
    CLOSED: { cls: 'bg-stone-600/30 text-stone-400 border-stone-600/50', icon: <X className="w-3 h-3" />, label: 'Closed' },
  };
  const { cls, icon, label } = cfg[upper] ?? cfg.NEW;
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full font-medium border ${cls}`}>
      {icon}
      {label}
    </span>
  );
}

// ─── Inquiries Module (Compact, Zero Waste Space, Server-Side 25/Page) ────────

function InquiriesModule({
  leads,
  onLeadContacted,
}: {
  leads: DevoteeLead[];
  onLeadContacted?: (leadId: string) => void;
}) {
  // Server-Side Pagination state (25 records per page)
  const [page, setPage] = useState(0);
  const [pageSize] = useState(25);
  const [totalPages, setTotal] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  // Filters & sort state
  const [search, setSearch] = useState('');
  const [inputVal, setInputVal] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('');
  const [sortBy, setSortBy] = useState<SortField>('id');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  // Data & Modal state
  const [enquiries, setEnquiries] = useState<ContactEnquiryRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState<ContactEnquiryRecord | null>(null);

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fetch page from backend
  const loadPage = useCallback(async (params: EnquiryFetchParams) => {
    setLoading(true);
    setError(null);
    try {
      const result: PagedEnquiryResponse = await fetchEnquiriesPage(params);
      setEnquiries(result.content);
      setTotal(result.totalPages);
      setTotalElements(result.totalElements);
    } catch (e: any) {
      setError('Failed to fetch enquiries from server. Displaying local data.');
      console.error('Enquiry fetch error:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  // Re-fetch on filter/page/sort change
  useEffect(() => {
    loadPage({ page, size: pageSize, sortBy, sortDir, search, status: statusFilter });
  }, [page, pageSize, search, statusFilter, sortBy, sortDir, loadPage]);

  // Search debounce
  const handleSearchInput = (val: string) => {
    setInputVal(val);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setPage(0);
      setSearch(val.trim());
    }, 350);
  };

  // Status update
  const handleStatusChange = async (record: ContactEnquiryRecord, newStatus: string, notes?: string) => {
    setEnquiries((prev) =>
      prev.map((e) =>
        e.enquiryNumber === record.enquiryNumber
          ? { ...e, status: newStatus, adminNotes: notes !== undefined ? notes : e.adminNotes }
          : e
      )
    );
    if (selectedEnquiry && selectedEnquiry.enquiryNumber === record.enquiryNumber) {
      setSelectedEnquiry((prev) =>
        prev
          ? { ...prev, status: newStatus, adminNotes: notes !== undefined ? notes : prev.adminNotes }
          : null
      );
    }
    await updateContactEnquiryStatus(record.enquiryNumber, newStatus, notes);
    if (onLeadContacted && record.enquiryNumber) {
      onLeadContacted(record.enquiryNumber);
    }
  };

  // Delete enquiry
  const handleDeleteEnquiry = async (record: ContactEnquiryRecord) => {
    if (
      !window.confirm(
        `Are you sure you want to permanently delete enquiry ${record.enquiryNumber} from ${record.name}?`
      )
    ) {
      return;
    }
    setEnquiries((prev) => prev.filter((e) => e.enquiryNumber !== record.enquiryNumber));
    setTotalElements((prev) => Math.max(0, prev - 1));
    if (selectedEnquiry?.enquiryNumber === record.enquiryNumber) {
      setSelectedEnquiry(null);
    }
    await deleteContactEnquiry(record.enquiryNumber);
  };

  // Handle Export (fetches all filtered records if more than current page)
  const handleExport = async (format: 'csv' | 'excel' | 'pdf') => {
    setExporting(true);
    let dataToExport = enquiries;
    try {
      if (totalElements > enquiries.length) {
        const fullRes = await fetchEnquiriesPage({
          page: 0,
          size: Math.min(totalElements, 500),
          sortBy,
          sortDir,
          search,
          status: statusFilter,
        });
        if (fullRes.content && fullRes.content.length > 0) {
          dataToExport = fullRes.content;
        }
      }
      if (format === 'csv') exportToCSV(dataToExport);
      else if (format === 'excel') exportToExcel(dataToExport);
      else if (format === 'pdf') exportToPDF(dataToExport);
    } catch (e) {
      console.error('Export error:', e);
      if (format === 'csv') exportToCSV(enquiries);
      else if (format === 'excel') exportToExcel(enquiries);
      else if (format === 'pdf') exportToPDF(enquiries);
    } finally {
      setExporting(false);
    }
  };

  const statusOptions: { value: StatusFilter; label: string }[] = [
    { value: '', label: 'All Status' },
    { value: 'NEW', label: 'New' },
    { value: 'CONTACTED', label: 'Contacted' },
    { value: 'BOOKED', label: 'Booked' },
    { value: 'CLOSED', label: 'Closed' },
  ];

  const sortOptions: { field: SortField; label: string }[] = [
    { field: 'id', label: 'Date Received' },
    { field: 'name', label: 'Devotee Name' },
    { field: 'status', label: 'Status' },
    { field: 'enquiryNumber', label: 'Enquiry No.' },
    { field: 'city', label: 'City' },
  ];

  const newCount = enquiries.filter((e) => e.status?.toUpperCase() === 'NEW').length;
  const startRecord = totalElements === 0 ? 0 : page * pageSize + 1;
  const endRecord = Math.min((page + 1) * pageSize, totalElements);

  return (
    <div className="flex flex-col min-h-[calc(100vh-140px)] justify-between space-y-3.5">
      {/* ─── Compact Top Control Bar (No useless headers or wasted space) ─── */}
      <div className="rounded-2xl bg-[#1A0D0A] border border-amber-500/25 p-3.5 sm:p-4 shadow-xl space-y-3">
        {/* Row 1: Title, Live DB Badge, Stats & Export Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-amber-500/15">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-base font-bold text-amber-100 font-sanskrit flex items-center gap-2">
              <span>Devotee Enquiries</span>
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono flex items-center gap-1">
              <Database className="w-3 h-3" />
              <span>Live DB</span>
            </span>
            <span className="text-xs text-amber-300 font-mono px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
              {totalElements} Total · {newCount} New
            </span>
            <button
              onClick={() =>
                loadPage({ page, size: pageSize, sortBy, sortDir, search, status: statusFilter })
              }
              disabled={loading}
              className="p-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-amber-300 border border-stone-700 transition-colors disabled:opacity-50"
              title="Refresh Enquiries"
            >
              {loading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <RefreshCw className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Export Actions Bar */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-stone-400 font-mono mr-1">Export:</span>
            <button
              onClick={() => handleExport('csv')}
              disabled={exporting || enquiries.length === 0}
              className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-amber-300 border border-stone-700 text-xs font-medium flex items-center gap-1 transition-colors disabled:opacity-40 no-underline"
              title="Download CSV"
            >
              <FileText className="w-3 h-3 text-amber-400" />
              <span>CSV</span>
            </button>
            <button
              onClick={() => handleExport('excel')}
              disabled={exporting || enquiries.length === 0}
              className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-emerald-400 border border-stone-700 text-xs font-medium flex items-center gap-1 transition-colors disabled:opacity-40 no-underline"
              title="Download Excel Spreadsheet"
            >
              <FileSpreadsheet className="w-3 h-3 text-emerald-400" />
              <span>Excel</span>
            </button>
            <button
              onClick={() => handleExport('pdf')}
              disabled={exporting || enquiries.length === 0}
              className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-rose-400 border border-stone-700 text-xs font-medium flex items-center gap-1 transition-colors disabled:opacity-40 no-underline"
              title="Print or Save as PDF"
            >
              <Printer className="w-3 h-3 text-rose-400" />
              <span>PDF</span>
            </button>
          </div>
        </div>

        {/* Row 2: Search, Status Filter & Sorting Bar */}
        <div className="flex flex-col md:flex-row gap-2">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={inputVal}
              onChange={(e) => handleSearchInput(e.target.value)}
              placeholder="Search by devotee name, phone, email, city, enquiry number…"
              className="w-full pl-8 pr-8 py-1.5 rounded-xl bg-black/60 border border-amber-500/20 text-stone-200 text-xs placeholder:text-stone-500 focus:outline-none focus:border-amber-400/60 transition-colors"
            />
            {inputVal && (
              <button
                onClick={() => {
                  setInputVal('');
                  setSearch('');
                  setPage(0);
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as StatusFilter);
                setPage(0);
              }}
              className="pl-7 pr-3 py-1.5 rounded-xl bg-black/60 border border-amber-500/20 text-stone-200 text-xs focus:outline-none focus:border-amber-400/60 appearance-none cursor-pointer"
            >
              {statusOptions.map((o) => (
                <option key={o.value} value={o.value} className="bg-stone-900 text-stone-100">
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Field and Direction */}
          <div className="relative">
            <ArrowUpDown className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
            <select
              value={`${sortBy}:${sortDir}`}
              onChange={(e) => {
                const [f, d] = e.target.value.split(':') as [SortField, 'asc' | 'desc'];
                setSortBy(f);
                setSortDir(d);
                setPage(0);
              }}
              className="pl-7 pr-3 py-1.5 rounded-xl bg-black/60 border border-amber-500/20 text-stone-200 text-xs focus:outline-none focus:border-amber-400/60 appearance-none cursor-pointer"
            >
              {sortOptions.map((o) => (
                <React.Fragment key={o.field}>
                  <option value={`${o.field}:desc`} className="bg-stone-900 text-stone-100">
                    {o.label} (Newest / Z-A) ↓
                  </option>
                  <option value={`${o.field}:asc`} className="bg-stone-900 text-stone-100">
                    {o.label} (Oldest / A-Z) ↑
                  </option>
                </React.Fragment>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ─── Error Notification ─── */}
      {error && (
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {/* ─── Enquiry Cards List / Rich Empty State ─── */}
      <div className="flex-1 space-y-2.5">
        {loading && enquiries.length === 0 ? (
          <div className="w-full flex items-center justify-center py-16 text-stone-400 text-xs gap-3 rounded-2xl bg-[#1A0D0A]/70 border border-amber-500/20">
            <Loader2 className="w-5 h-5 animate-spin text-amber-400" />
            <span className="font-medium text-stone-300">Synchronizing live devotee enquiries from database…</span>
          </div>
        ) : enquiries.length === 0 ? (
          <div className="w-full text-center py-14 px-6 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#1C0D0A] to-[#140805] border border-amber-500/25 shadow-xl space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 shadow-inner">
              <Inbox className="w-8 h-8 opacity-80" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base sm:text-lg font-bold text-amber-100 font-sanskrit leading-snug">
                {search || statusFilter ? 'No Matching Enquiries Found' : 'No Devotee Enquiries Found'}
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed max-w-md mx-auto">
                {search || statusFilter
                  ? `No records found matching "${search || statusFilter}". Try adjusting your keywords or clearing filters.`
                  : 'No devotee enquiries have been submitted yet. Submissions received through the contact form will appear here in real time.'}
              </p>
            </div>
            {(search || statusFilter) && (
              <button
                onClick={() => {
                  setSearch('');
                  setInputVal('');
                  setStatusFilter('');
                  setPage(0);
                }}
                className="px-4 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters & Show All</span>
              </button>
            )}
          </div>
        ) : (
          enquiries.map((record) => (
            <EnquiryCard
              key={record.enquiryNumber}
              record={record}
              onStatusChange={handleStatusChange}
              onDelete={handleDeleteEnquiry}
              onViewDetails={(r) => setSelectedEnquiry(r)}
            />
          ))
        )}
      </div>

      {/* ─── Server-Side Pagination Bar (25 Records / Page - Fixed / Sticky to Bottom) ─── */}
      {totalElements > 0 && (
        <div className="sticky bottom-0 z-20 mt-auto flex flex-col sm:flex-row items-center justify-between gap-3 p-3 sm:px-4 rounded-2xl bg-[#140805]/95 backdrop-blur-md border border-amber-500/30 shadow-2xl text-xs">
          <div className="text-stone-400 font-mono text-[11px]">
            Showing <span className="text-amber-300 font-bold">{startRecord}</span> to{' '}
            <span className="text-amber-300 font-bold">{endRecord}</span> of{' '}
            <span className="text-stone-200 font-bold">{totalElements}</span> entries (25 per page)
          </div>

          <div className="flex items-center gap-1.5">
            <PageBtn
              icon={<ChevronsLeft className="w-3.5 h-3.5" />}
              onClick={() => setPage(0)}
              disabled={page === 0 || loading}
              title="First page"
            />
            <PageBtn
              icon={<ChevronLeft className="w-3.5 h-3.5" />}
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 0 || loading}
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
                  onClick={() => setPage(p)}
                  disabled={loading}
                  className={`w-7 h-7 rounded-lg text-xs font-mono transition-colors ${p === page
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
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= totalPages - 1 || loading}
              title="Next page"
            />
            <PageBtn
              icon={<ChevronsRight className="w-3.5 h-3.5" />}
              onClick={() => setPage(Math.max(0, totalPages - 1))}
              disabled={page >= totalPages - 1 || loading}
              title="Last page"
            />
          </div>
        </div>
      )}

      {/* ─── Devotee Enquiry View Modal ─── */}
      {selectedEnquiry && (
        <EnquiryViewModal
          enquiry={selectedEnquiry}
          onClose={() => setSelectedEnquiry(null)}
          onStatusChange={handleStatusChange}
          onDelete={handleDeleteEnquiry}
        />
      )}
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
      className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-amber-300 border border-stone-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
    >
      {icon}
    </button>
  );
}

// ─── Individual Enquiry Card with Message Truncation ──────────────────────────

function EnquiryCard({
  record,
  onStatusChange,
  onDelete,
  onViewDetails,
}: {
  record: ContactEnquiryRecord;
  onStatusChange: (r: ContactEnquiryRecord, s: string, notes?: string) => void;
  onDelete: (r: ContactEnquiryRecord) => void;
  onViewDetails: (r: ContactEnquiryRecord) => void;
}) {
  const isNew = record.status?.toUpperCase() === 'NEW';
  const rawMessage = record.devoteeMessage || '';
  const isMessageLong = rawMessage.length > 70;
  const displayMessage = isMessageLong ? `${rawMessage.slice(0, 70)}...` : rawMessage;

  const timeAgo = (() => {
    const d = record.createdAt ? new Date(record.createdAt) : new Date();
    const diff = Math.floor((Date.now() - d.getTime()) / 60000);
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return `${Math.floor(diff / 1440)}d ago`;
  })();

  return (
    <div
      className={`p-3 sm:p-3.5 rounded-2xl border transition-colors space-y-2.5 ${isNew
          ? 'bg-[#1e100c] border-amber-500/35 hover:border-amber-400/60'
          : 'bg-[#150a08]/90 border-amber-500/15 hover:border-amber-400/35'
        }`}
    >
      {/* Top Header Row */}
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-sm text-stone-100">{record.name}</span>
            {record.city && (
              <span className="text-xs text-stone-400">({record.city})</span>
            )}
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
              {record.enquiryNumber}
            </span>
          </div>

          <div className="text-xs text-amber-300/90 font-medium mt-0.5">
            Pooja: <span className="text-stone-200">{record.poojaRequested || record.subject || 'General Enquiry'}</span>
            {record.preferredDate && (
              <span className="text-stone-400 ml-2">
                · Muhurat: <span className="text-stone-300">{record.preferredDate}</span>
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <StatusBadge status={record.status} />
          <span className="text-[11px] text-stone-400 font-mono">{timeAgo}</span>
        </div>
      </div>

      {/* Devotee Message (Truncated if long + Click opens View Modal) */}
      {rawMessage && (
        <div
          onClick={() => onViewDetails(record)}
          className="group cursor-pointer bg-stone-950/70 hover:bg-stone-950 p-2.5 rounded-xl border border-stone-800 hover:border-amber-500/30 text-xs text-stone-300 leading-relaxed transition-colors flex items-center justify-between gap-2"
        >
          <div className="flex-1">
            <span className="text-stone-400 font-medium text-[10px] uppercase tracking-wider block mb-0.5">
              Devotee Message:
            </span>
            <span className="italic text-stone-200">&ldquo;{displayMessage}&rdquo;</span>
          </div>
          {isMessageLong && (
            <span className="shrink-0 text-[11px] text-amber-400 group-hover:text-amber-300 font-semibold no-underline flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>View Full</span>
            </span>
          )}
        </div>
      )}

      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-stone-800/80">
        {/* Contact info */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-stone-300 font-mono">
          <span className="flex items-center gap-1">
            <Phone className="w-3 h-3 text-amber-400" />
            <a href={`tel:${record.phone}`} className="hover:text-amber-300 no-underline text-stone-300">
              {record.phone}
            </a>
          </span>
          {record.email && (
            <span className="hidden md:inline-flex items-center gap-1 text-stone-400">
              <Mail className="w-3 h-3 text-amber-400" />
              <a href={`mailto:${record.email}`} className="hover:text-amber-300 no-underline text-stone-400">
                {record.email}
              </a>
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Status Dropdown with Lucide Icon */}
          <div className="relative inline-flex items-center">
            <span className="absolute left-2 pointer-events-none">
              {record.status?.toUpperCase() === 'NEW' && <Bell className="w-3 h-3 text-amber-400" />}
              {record.status?.toUpperCase() === 'CONTACTED' && <Phone className="w-3 h-3 text-blue-400" />}
              {record.status?.toUpperCase() === 'BOOKED' && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
              {record.status?.toUpperCase() === 'CLOSED' && <Lock className="w-3 h-3 text-stone-400" />}
            </span>
            <select
              value={record.status?.toUpperCase() ?? 'NEW'}
              onChange={(e) => onStatusChange(record, e.target.value)}
              className="pl-6 pr-2 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs border border-stone-700 focus:outline-none focus:border-amber-400/60 cursor-pointer transition-colors"
            >
              <option value="NEW" className="bg-stone-900 text-stone-100">New</option>
              <option value="CONTACTED" className="bg-stone-900 text-stone-100">Contacted</option>
              <option value="BOOKED" className="bg-stone-900 text-stone-100">Booked</option>
              <option value="CLOSED" className="bg-stone-900 text-stone-100">Closed</option>
            </select>
          </div>

          {/* View Details Button */}
          <button
            onClick={() => onViewDetails(record)}
            className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-amber-300 border border-stone-700 text-xs font-medium flex items-center gap-1 transition-colors no-underline cursor-pointer"
            title="View Full Enquiry Details"
          >
            <Eye className="w-3 h-3 text-amber-400" />
            <span>Details</span>
          </button>

          {/* Quick Call */}
          <a
            href={`tel:${record.phone.replace(/\s+/g, '')}`}
            onClick={() => isNew && onStatusChange(record, 'CONTACTED')}
            className="px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-400/30 text-xs font-semibold flex items-center gap-1 hover:bg-amber-500 hover:text-stone-950 transition-colors no-underline"
          >
            <Phone className="w-3 h-3" />
            <span>Call</span>
          </a>

          {/* Quick WhatsApp */}
          <a
            href={`https://wa.me/${record.phone.replace(/[^0-9]/g, '')}?text=Jai%20Trimbakeshwar%20${encodeURIComponent(record.name)},%20regarding%20your%20inquiry%20for%20${encodeURIComponent(record.poojaRequested || 'Pooja')}.`}
            target="_blank"
            rel="noreferrer"
            onClick={() => isNew && onStatusChange(record, 'CONTACTED')}
            className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 text-xs font-semibold flex items-center gap-1 hover:bg-emerald-500 hover:text-stone-950 transition-colors no-underline"
          >
            <MessageCircle className="w-3 h-3" />
            <span>WhatsApp</span>
          </a>

          {/* Delete Enquiry */}
          <button
            onClick={() => onDelete(record)}
            title="Delete enquiry"
            className="p-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 border border-rose-500/25 text-xs transition-colors cursor-pointer"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Enquiry Details View Modal ───────────────────────────────────────────────

function EnquiryViewModal({
  enquiry,
  onClose,
  onStatusChange,
  onDelete,
}: {
  enquiry: ContactEnquiryRecord;
  onClose: () => void;
  onStatusChange: (r: ContactEnquiryRecord, s: string, notes?: string) => void;
  onDelete: (r: ContactEnquiryRecord) => void;
}) {
  const [adminNotes, setAdminNotes] = useState(enquiry.adminNotes || '');
  const [status, setStatus] = useState(enquiry.status || 'NEW');
  const [savingNote, setSavingNote] = useState(false);
  const [noteSaved, setNoteSaved] = useState(false);

  const handleSaveNotes = async () => {
    setSavingNote(true);
    await onStatusChange(enquiry, status, adminNotes);
    setSavingNote(false);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2500);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-3xl bg-[#180C09] border border-amber-500/30 shadow-2xl max-h-[90vh] flex flex-col overflow-hidden"
      >
        {/* FIXED MODAL HEADER (Pinned at top, doesn't scroll) */}
        <div className="shrink-0 p-4 sm:p-6 pb-4 border-b border-amber-500/20 bg-[#180C09] flex items-start justify-between gap-3 z-10">
          <div className="flex flex-col gap-1 sm:gap-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-base sm:text-lg font-bold text-amber-100 font-sanskrit leading-snug">
                Devotee Enquiry Details
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 font-mono text-xs font-bold">
                {enquiry.enquiryNumber}
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono">
                Live DB
              </span>
            </div>
            <p className="text-xs text-stone-400">
              Received on {enquiry.createdAt ? new Date(enquiry.createdAt).toLocaleString('en-IN') : 'Recent'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 transition-colors shrink-0"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SCROLLABLE BODY ONLY */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 custom-scrollbar">
          {/* Devotee Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-black/40 border border-amber-500/15 space-y-1">
              <span className="text-[10px] text-stone-400 uppercase tracking-wider font-mono">Devotee Name</span>
              <div className="font-bold text-sm text-stone-100">{enquiry.name}</div>
              <div className="text-stone-400 flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3 text-amber-400" />
                <span>{enquiry.city || 'Trimbakeshwar'}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-amber-500/15 space-y-1">
              <span className="text-[10px] text-stone-400 uppercase tracking-wider font-mono">Contact Info</span>
              <div className="font-mono text-stone-200 flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-amber-400" />
                <a href={`tel:${enquiry.phone}`} className="hover:text-amber-300 no-underline">
                  {enquiry.phone}
                </a>
              </div>
              <div className="font-mono text-stone-400 flex items-center gap-1.5 mt-0.5 truncate">
                <Mail className="w-3 h-3 text-amber-400" />
                <a href={`mailto:${enquiry.email}`} className="hover:text-amber-300 no-underline truncate">
                  {enquiry.email}
                </a>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-amber-500/15 space-y-1">
              <span className="text-[10px] text-stone-400 uppercase tracking-wider font-mono">Pooja Requested</span>
              <div className="font-bold text-amber-200">{enquiry.poojaRequested || enquiry.subject || 'General Consultation'}</div>
              <div className="text-stone-400 text-[11px]">
                Preferred Date: <span className="text-stone-200">{enquiry.preferredDate || 'Flexible'}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-amber-500/15 space-y-1">
              <span className="text-[10px] text-stone-400 uppercase tracking-wider font-mono">Status & Channel</span>
              <div className="flex items-center gap-2 pt-0.5">
                <StatusBadge status={status} />
                <span className="text-stone-400 capitalize text-[11px]">via {enquiry.preferredContactMethod || 'phone'}</span>
              </div>
            </div>
          </div>

          {/* Full Devotee Message */}
          <div className="p-3.5 rounded-2xl bg-black/60 border border-amber-500/20 space-y-1.5">
            <span className="text-[10px] text-amber-300/80 font-bold uppercase tracking-wider">
              Full Devotee Enquiry Message:
            </span>
            <p className="text-xs text-stone-100 leading-relaxed italic bg-stone-900/60 p-3 rounded-xl border border-stone-800">
              &ldquo;{enquiry.devoteeMessage || 'No message text provided.'}&rdquo;
            </p>
          </div>

          {/* Status Update & Admin Notes Editor */}
          <div className="p-3.5 rounded-2xl bg-black/40 border border-amber-500/15 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold text-amber-200">Update Status & Purohit Office Notes</label>

              {/* Status Selector with Lucide Icon */}
              <div className="relative inline-flex items-center">
                <span className="absolute left-2.5 pointer-events-none">
                  {status?.toUpperCase() === 'NEW' && <Bell className="w-3.5 h-3.5 text-amber-400" />}
                  {status?.toUpperCase() === 'CONTACTED' && <Phone className="w-3.5 h-3.5 text-blue-400" />}
                  {status?.toUpperCase() === 'BOOKED' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  {status?.toUpperCase() === 'CLOSED' && <Lock className="w-3.5 h-3.5 text-stone-400" />}
                </span>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-lg bg-stone-800 border border-amber-500/30 text-xs text-amber-100 focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="NEW" className="bg-stone-900 text-stone-100">New Enquiry</option>
                  <option value="CONTACTED" className="bg-stone-900 text-stone-100">Contacted Devotee</option>
                  <option value="BOOKED" className="bg-stone-900 text-stone-100">Booking Confirmed</option>
                  <option value="CLOSED" className="bg-stone-900 text-stone-100">Closed</option>
                </select>
              </div>
            </div>

            <textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              rows={3}
              placeholder="Add internal notes (e.g. called on phone, devotee booking Narayan Nagbali for 3 persons on 15th Oct)..."
              className="w-full p-2.5 rounded-xl bg-black/60 border border-stone-700 text-stone-200 text-xs placeholder:text-stone-500 focus:outline-none focus:border-amber-400/60 resize-none"
            />

            <div className="flex items-center justify-between">
              {noteSaved ? (
                <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                  <Check className="w-3.5 h-3.5" /> Notes & status saved to database!
                </span>
              ) : (
                <span className="text-[10px] text-stone-500">Changes sync instantly with database</span>
              )}

              <button
                onClick={handleSaveNotes}
                disabled={savingNote}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 font-bold text-xs shadow hover:from-amber-300 flex items-center gap-1 disabled:opacity-50 cursor-pointer"
              >
                {savingNote && <Loader2 className="w-3 h-3 animate-spin" />}
                <span>Save Status & Notes</span>
              </button>
            </div>
          </div>
        </div>

        {/* FIXED MODAL FOOTER (Pinned at bottom, doesn't scroll) */}
        <div className="shrink-0 p-3.5 sm:p-4 border-t border-amber-500/20 bg-[#140805] flex flex-wrap items-center justify-between gap-2 z-10">
          <button
            onClick={() => onDelete(enquiry)}
            className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Enquiry</span>
          </button>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${enquiry.phone}`}
              className="px-3 py-1.5 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-400/30 text-xs font-semibold flex items-center gap-1.5 hover:bg-amber-500 hover:text-stone-950 transition-colors no-underline"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Devotee</span>
            </a>

            <a
              href={`https://wa.me/${enquiry.phone.replace(/[^0-9]/g, '')}?text=Jai%20Trimbakeshwar%20${encodeURIComponent(enquiry.name)},%20regarding%20your%20inquiry%20for%20${encodeURIComponent(enquiry.poojaRequested || 'Pooja')}.`}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-xl bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 text-xs font-semibold flex items-center gap-1.5 hover:bg-emerald-500 hover:text-stone-950 transition-colors no-underline"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Payments & QR Verification Module ──────────────────────────────────────────

function PaymentsModule({
  bookings,
  onSelectBookingForQR,
  onBackToDashboard,
}: {
  bookings: Booking[];
  onSelectBookingForQR: (b: Booking) => void;
  onBackToDashboard: () => void;
}) {
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'VERIFIED' | 'REJECTED'>('ALL');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const pageSize = 10;
  const [showManageUpiModal, setShowManageUpiModal] = useState(false);
  const [previewBooking, setPreviewBooking] = useState<Booking | null>(null);
  const [templeUpi, setTempleUpi] = useState<TempleUpiConfig>(getTempleUpiConfig());
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const handleUpiUpdate = (e: any) => {
      setTempleUpi(e.detail || getTempleUpiConfig());
    };
    window.addEventListener(UPI_CONFIG_UPDATED_EVENT, handleUpiUpdate);
    return () => window.removeEventListener(UPI_CONFIG_UPDATED_EVENT, handleUpiUpdate);
  }, []);

  const pendingCount = bookings.filter((b) => b.qrStatus === 'pending_verification').length;
  const verifiedCount = bookings.filter((b) => b.qrStatus === 'verified').length;
  const rejectedCount = bookings.filter((b) => b.qrStatus === 'rejected').length;
  const totalVerifiedRevenue = verifiedCount * 1000;

  const filteredBookings = bookings.filter((b) => {
    if (filter === 'PENDING' && b.qrStatus !== 'pending_verification') return false;
    if (filter === 'VERIFIED' && b.qrStatus !== 'verified') return false;
    if (filter === 'REJECTED' && b.qrStatus !== 'rejected') return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    const name = String(b.devoteeName || '').toLowerCase();
    const email = String(b.email || '').toLowerCase();
    const phone = String(b.phone || '');
    const utr = String(b.utrNumber || '').toLowerCase();
    const pooja = String(b.poojaType || '').toLowerCase();
    const id = String(b.id || '').toLowerCase();
    const city = String(b.city || '').toLowerCase();
    return (
      name.includes(q) ||
      email.includes(q) ||
      phone.includes(q) ||
      utr.includes(q) ||
      pooja.includes(q) ||
      id.includes(q) ||
      city.includes(q)
    );
  });

  const totalElements = filteredBookings.length;
  const totalPages = Math.ceil(totalElements / pageSize) || 1;
  const startRecord = totalElements === 0 ? 0 : page * pageSize + 1;
  const endRecord = Math.min((page + 1) * pageSize, totalElements);
  const paginatedBookings = filteredBookings.slice(page * pageSize, (page + 1) * pageSize);

  const handleCopyUTR = (b: Booking) => {
    if (b.utrNumber) {
      navigator.clipboard?.writeText(b.utrNumber);
      setCopiedId(b.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-sanskrit text-amber-100">
            Payment Receipts & UPI Verification
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">
            Devotee ₹1,000 advance tokens & temple ledger reconciliation
          </p>
        </div>
        <button
          onClick={() => setShowManageUpiModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs transition-all shadow-md hover:shadow-amber-500/25 cursor-pointer"
        >
          <Settings className="w-4 h-4 text-stone-950" />
          <span>Update Temple UPI & QR Code</span>
        </button>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-[#1A0D0A] border border-amber-500/20 shadow-md">
          <div className="text-[11px] text-stone-400 font-medium">Total Token Bookings</div>
          <div className="text-2xl font-bold font-mono text-amber-200 mt-1">
            {bookings.length}
          </div>
          <div className="text-[10px] text-stone-400 mt-1">₹1,000 Advance Model</div>
        </div>

        <div
          onClick={() => setFilter('PENDING')}
          className={`p-4 rounded-2xl border shadow-md cursor-pointer transition-all ${filter === 'PENDING'
              ? 'bg-rose-950/40 border-rose-500 shadow-rose-950/30'
              : 'bg-[#1A0D0A] border-rose-500/30 hover:border-rose-400/60'
            }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-rose-300 font-medium">Under Verification</span>
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
          </div>
          <div className="text-2xl font-bold font-mono text-rose-300 mt-1">
            {pendingCount}
          </div>
          <div className="text-[10px] text-rose-400 font-medium mt-1">
            {pendingCount > 0 ? 'Requires Purohit Review' : 'All Cleared'}
          </div>
        </div>

        <div
          onClick={() => setFilter('VERIFIED')}
          className={`p-4 rounded-2xl border shadow-md cursor-pointer transition-all ${filter === 'VERIFIED'
              ? 'bg-emerald-950/40 border-emerald-500 shadow-emerald-950/30'
              : 'bg-[#1A0D0A] border-emerald-500/30 hover:border-emerald-400/60'
            }`}
        >
          <div className="text-[11px] text-emerald-300 font-medium">Verified & Confirmed</div>
          <div className="text-2xl font-bold font-mono text-emerald-300 mt-1">
            {verifiedCount}
          </div>
          <div className="text-[10px] text-emerald-400 mt-1">Confirmation Email Sent</div>
        </div>

        <div
          onClick={() => setShowManageUpiModal(true)}
          className="p-4 rounded-2xl bg-[#1A0D0A] border border-amber-500/20 shadow-md hover:border-amber-400/50 cursor-pointer transition-all group"
          title="Click to update Temple UPI & QR Code"
        >
          <div className="text-[11px] text-stone-400 font-medium flex items-center justify-between">
            <span>Official Temple VPA</span>
            <span className="text-[10px] text-amber-400/80 font-mono group-hover:text-amber-300">Edit ⚙️</span>
          </div>
          <div className="text-xs font-bold font-mono text-amber-300 mt-1 truncate">
            {templeUpi.upiId || 'atharvadeshmukh525-1@oksbi'}
          </div>
          <div className="text-[10px] text-stone-400 mt-1 truncate">
            {templeUpi.bankName || 'State Bank of India'} • {templeUpi.branch || 'Kushavarta Kund'}
          </div>
        </div>
      </div>

      {/* Filter Chips & Search Bar */}
      <div className="p-4 rounded-2xl bg-[#1A0D0A] border border-amber-500/20 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-lg">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            placeholder="Search by devotee name, phone, email, UTR number or ritual..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-black/60 border border-amber-500/25 text-stone-100 placeholder-stone-500 text-xs focus:outline-none focus:border-amber-400 transition-colors"
          />
          {search && (
            <button
              onClick={() => {
                setSearch('');
                setPage(0);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {(
            [
              { key: 'ALL', label: `All Receipts (${bookings.length})` },
              { key: 'PENDING', label: `Pending Review (${pendingCount})`, badge: pendingCount > 0 },
              { key: 'VERIFIED', label: `Verified (${verifiedCount})` },
              { key: 'REJECTED', label: `Rejected (${rejectedCount})` },
            ] as const
          ).map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setFilter(item.key);
                setPage(0);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${filter === item.key
                  ? 'bg-amber-500 text-stone-950 border-amber-400 shadow'
                  : 'bg-black/40 text-stone-300 border-amber-500/20 hover:border-amber-400/50'
                }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Receipts Ledger List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#1A0D0A] border border-amber-500/20 space-y-3">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-center text-amber-300">
              <QrCode className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-amber-100 font-sanskrit">
              No Payment Receipts Found
            </h4>
            <p className="text-xs text-stone-400 max-w-sm mx-auto">
              {search
                ? `No devotee payment records match "${search}". Try clearing search filter.`
                : 'No booking receipts in this category.'}
            </p>
            {search && (
              <button
                onClick={() => {
                  setSearch('');
                  setPage(0);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-400/30 text-xs font-semibold hover:bg-amber-500 hover:text-stone-950 transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          paginatedBookings.map((b) => {
            const isPending = b.qrStatus === 'pending_verification';
            const isVerified = b.qrStatus === 'verified';
            const isRejected = b.qrStatus === 'rejected';

            return (
              <div
                key={b.id}
                className={`p-5 rounded-3xl bg-[#1A0D0A] border transition-all shadow-xl hover:border-amber-400/50 ${isPending
                    ? 'border-amber-500/35 bg-gradient-to-br from-[#1F0E09] to-[#140705]'
                    : isVerified
                      ? 'border-emerald-500/30 bg-gradient-to-br from-[#121A13] to-[#0A100B]'
                      : 'border-rose-500/30 bg-gradient-to-br from-[#1F0A0A] to-[#120505]'
                  }`}
              >
                {/* Top Row: Devotee & Status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-4 border-b border-amber-500/15">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-bold text-base text-stone-100 font-sanskrit">
                      {b.devoteeName}
                    </span>
                    <span className="text-xs text-amber-300/90 font-medium">
                      ({b.gotra})
                    </span>
                    <span className="text-xs text-stone-400">
                      • {b.city}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-black/60 border border-amber-500/20 text-stone-300">
                      Ref: {b.id}
                    </span>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border font-semibold ${isPending
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                          : isVerified
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        }`}
                    >
                      {isPending ? (
                        <>
                          <Clock className="w-3.5 h-3.5 text-amber-400" />
                          <span>Action Required • Payment Under Verification</span>
                        </>
                      ) : isVerified ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Slot Confirmed • Payment Verified</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                          <span>Screenshot Rejected • Awaiting Resubmission</span>
                        </>
                      )}
                    </span>

                    {b.emailSent && (
                      <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30 font-medium">
                        <Mail className="w-3 h-3 text-blue-400" />
                        <span>Email Sent</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Middle Content: Details & Screenshot Preview Box */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 py-4">
                  {/* Left Column (8 cols): Pooja & Devotee Metadata */}
                  <div className="md:col-span-8 space-y-3">
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-bold text-amber-200">
                          {b.poojaType}
                        </div>
                        <div className="text-xs text-stone-300 mt-0.5 flex items-center gap-2 flex-wrap">
                          <span className="flex items-center gap-1 text-amber-300/90 font-medium">
                            <Calendar className="w-3.5 h-3.5 text-amber-400" />
                            {b.date}
                          </span>
                          <span className="text-stone-500">•</span>
                          <span className="flex items-center gap-1 text-stone-300">
                            <Clock className="w-3.5 h-3.5 text-stone-400" />
                            {b.time}
                          </span>
                          <span className="text-stone-500">•</span>
                          <span className="flex items-center gap-1 text-stone-400">
                            <MapPin className="w-3.5 h-3.5 text-amber-400" />
                            {b.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Financial & UTR details row */}
                    <div className="p-3 rounded-2xl bg-black/45 border border-amber-500/20 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <div className="text-[10px] text-stone-400 uppercase font-mono">Token Paid</div>
                        <div className="font-bold text-sm text-emerald-400 font-mono">
                          ₹{b.advanceAmount || 1000}.00
                        </div>
                        <div className="text-[10px] text-stone-500">Advance Consecration</div>
                      </div>

                      <div>
                        <div className="text-[10px] text-stone-400 uppercase font-mono">UPI App Used</div>
                        <div className="font-semibold text-amber-200 flex items-center gap-1">
                          <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                          <span>{b.paymentApp || 'BHIM UPI'}</span>
                        </div>
                        <div className="text-[10px] text-stone-500">{b.bookingDate}</div>
                      </div>

                      <div>
                        <div className="text-[10px] text-stone-400 uppercase font-mono">12-Digit UTR / Ref</div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="font-mono text-xs text-amber-300 font-bold truncate">
                            {b.utrNumber || 'Screenshot Uploaded'}
                          </span>
                          {b.utrNumber && (
                            <button
                              onClick={() => handleCopyUTR(b)}
                              className="p-1 rounded hover:bg-stone-800 text-stone-400 hover:text-amber-300 transition-colors"
                              title="Copy UTR Number"
                            >
                              {copiedId === b.id ? (
                                <Check className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Contact channels */}
                    <div className="flex items-center gap-3 text-xs text-stone-300 flex-wrap">
                      <a
                        href={`tel:${b.phone.replace(/\s+/g, '')}`}
                        className="inline-flex items-center gap-1.5 text-amber-300 hover:underline"
                      >
                        <Phone className="w-3.5 h-3.5 text-amber-400" />
                        <span>{b.phone}</span>
                      </a>
                      {b.email && (
                        <>
                          <span className="text-stone-600">•</span>
                          <a
                            href={`mailto:${b.email}`}
                            className="inline-flex items-center gap-1.5 text-stone-300 hover:underline"
                          >
                            <Mail className="w-3.5 h-3.5 text-amber-400" />
                            <span>{b.email}</span>
                          </a>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Right Column (4 cols): Screenshot Thumbnail Box */}
                  <div className="md:col-span-4 flex flex-col justify-center">
                    <div
                      onClick={() => setPreviewBooking(b)}
                      className="group relative h-36 rounded-2xl border border-amber-500/30 bg-black/60 overflow-hidden cursor-pointer shadow-md flex items-center justify-center transition-all hover:border-amber-400"
                    >
                      {b.paymentScreenshot ? (
                        <img
                          src={b.paymentScreenshot}
                          alt="Devotee Payment Screenshot"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="p-3 text-center space-y-1.5">
                          <div className="w-9 h-9 mx-auto rounded-xl bg-amber-500/15 border border-amber-400/25 flex items-center justify-center text-amber-300">
                            <QrCode className="w-5 h-5" />
                          </div>
                          <div className="text-[11px] font-bold text-amber-200">
                            ₹1,000 Payment Slip
                          </div>
                          <div className="text-[10px] text-stone-400 font-mono">
                            {b.paymentApp || 'UPI'} • {b.utrNumber ? b.utrNumber.slice(-8) : 'Receipt'}
                          </div>
                        </div>
                      )}

                      {/* Hover Overlay with Zoom Icon */}
                      <div className="absolute inset-0 bg-stone-950/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1 text-amber-200 transition-opacity">
                        <ZoomIn className="w-6 h-6 text-amber-400" />
                        <span className="text-[11px] font-bold">Inspect Screenshot</span>
                      </div>

                      {/* Small badge */}
                      <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 border border-amber-500/30 text-[9px] text-amber-300 font-mono">
                        Click to Zoom
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="pt-3 border-t border-amber-500/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-[11px] text-stone-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>
                      {isPending
                        ? 'Transaction pending temple ledger verification'
                        : isVerified
                          ? 'Confirmed in Hereditary Vatandar Kushavarta registry'
                          : 'Devotee notified to resubmit transaction receipt'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        isVerified
                          ? `Jai Trimbakeshwar! Respected ${b.devoteeName} Ji, your booking for ${b.poojaType} is verified and confirmed. Guruji Pt. Pravin Shambhu Deshmukh will contact you.`
                          : `Jai Trimbakeshwar! Respected ${b.devoteeName} Ji, regarding your token payment for ${b.poojaType} at Shri Trimbakeshwar Jyotirlinga.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 text-xs font-semibold flex items-center gap-1.5 hover:bg-emerald-500 hover:text-stone-950 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>

                    <button
                      onClick={() => onSelectBookingForQR(b)}
                      className={`px-4 py-1.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-1.5 ${isPending
                          ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 text-stone-950'
                          : 'bg-stone-800 hover:bg-stone-700 text-amber-300 border border-amber-400/30'
                        }`}
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>{isPending ? 'Review & Verify Payment' : 'View Pass & Email'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ─── Server-Side Style Pagination Bar (10 Records / Page - Fixed / Sticky to Bottom) ─── */}
      {totalElements > 0 && (
        <div className="sticky bottom-0 z-20 mt-auto flex flex-col sm:flex-row items-center justify-between gap-3 p-3 sm:px-4 rounded-2xl bg-[#140805]/95 backdrop-blur-md border border-amber-500/30 shadow-2xl text-xs">
          <div className="text-stone-400 font-mono text-[11px]">
            Showing <span className="text-amber-300 font-bold">{startRecord}</span> to{' '}
            <span className="text-amber-300 font-bold">{endRecord}</span> of{' '}
            <span className="text-stone-200 font-bold">{totalElements}</span> entries ({pageSize} per page)
          </div>

          <div className="flex items-center gap-1.5">
            <PageBtn
              icon={<ChevronsLeft className="w-3.5 h-3.5" />}
              onClick={() => setPage(0)}
              disabled={page === 0}
              title="First page"
            />
            <PageBtn
              icon={<ChevronLeft className="w-3.5 h-3.5" />}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
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
                  onClick={() => setPage(p)}
                  className={`w-7 h-7 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                    p === page
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
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              title="Next page"
            />
            <PageBtn
              icon={<ChevronsRight className="w-3.5 h-3.5" />}
              onClick={() => setPage(Math.max(0, totalPages - 1))}
              disabled={page >= totalPages - 1}
              title="Last page"
            />
          </div>
        </div>
      )}

      {/* DEVOTEE SCREENSHOT LIGHTBOX MODAL */}
      {previewBooking && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-[#170B08] border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl space-y-4">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-[#2B110B] to-[#170B08] border-b border-amber-500/20 flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <div className="text-[11px] text-amber-300 font-mono tracking-wider">
                  DEVOTEE PAYMENT RECEIPT • {previewBooking.id}
                </div>
                <h3 className="text-base font-bold text-amber-100 font-sanskrit leading-snug">
                  {previewBooking.devoteeName} ({previewBooking.poojaType})
                </h3>
              </div>
              <button
                onClick={() => setPreviewBooking(null)}
                className="p-2 rounded-xl bg-stone-900 text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body: Large Image */}
            <div className="px-5">
              <div className="max-h-[60vh] overflow-auto rounded-2xl bg-black/60 border border-amber-500/20 flex items-center justify-center p-3">
                {previewBooking.paymentScreenshot ? (
                  <img
                    src={previewBooking.paymentScreenshot}
                    alt="Payment Receipt"
                    className="max-h-[55vh] w-auto object-contain rounded-xl"
                  />
                ) : (
                  <div className="p-8 text-center space-y-2">
                    <QrCode className="w-12 h-12 mx-auto text-amber-400" />
                    <div className="text-sm font-bold text-amber-200">
                      Standard Token Receipt
                    </div>
                    <div className="text-xs text-stone-400">
                      App: {previewBooking.paymentApp || 'BHIM UPI'} • UTR: {previewBooking.utrNumber || 'N/A'}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Metadata & Actions */}
            <div className="p-5 bg-black/40 border-t border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="text-xs text-amber-200 font-mono">
                  UTR: <strong className="text-amber-100">{previewBooking.utrNumber || 'Verified Screenshot'}</strong>
                </div>
                <div className="text-[11px] text-stone-400">
                  Devotee: {previewBooking.phone} {previewBooking.email ? `• ${previewBooking.email}` : ''}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewBooking(null)}
                  className="px-3.5 py-1.5 rounded-xl bg-stone-800 text-stone-300 text-xs font-semibold hover:bg-stone-700"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const b = previewBooking;
                    setPreviewBooking(null);
                    onSelectBookingForQR(b);
                  }}
                  className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 font-bold text-xs shadow hover:from-amber-300 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Open Full Verification Modal</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DYNAMIC TEMPLE UPI & QR CODE MANAGEMENT MODAL */}
      {showManageUpiModal && (
        <ManageTempleUPIModal
          isOpen={showManageUpiModal}
          onClose={() => setShowManageUpiModal(false)}
          initialConfig={templeUpi}
        />
      )}
    </div>
  );
}

// ─── Manage Temple UPI & QR Settings Modal ──────────────────────────────────────

function ManageTempleUPIModal({
  isOpen,
  onClose,
  initialConfig,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialConfig: TempleUpiConfig;
}) {
  const [config, setConfig] = useState<TempleUpiConfig>(initialConfig);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setConfig(initialConfig);
    setSavedSuccess(false);
  }, [initialConfig, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (JPG, PNG, or WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5 MB. Please upload a smaller image.');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setConfig((prev) => ({ ...prev, qrImageUrl: dataUrl }));
      }
      setIsUploading(false);
    };
    reader.onerror = () => {
      alert('Failed to read image file.');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!config.upiId.trim()) {
      alert('Please enter a valid UPI ID (VPA).');
      return;
    }
    saveTempleUpiConfig(config);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleReset = () => {
    if (
      confirm(
        'Reset Temple UPI & QR Code to hereditary default credentials (/assets/UPI.jpeg & atharvadeshmukh525-1@oksbi)?'
      )
    ) {
      const def = resetTempleUpiConfig();
      setConfig(def);
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        onClose();
      }, 1000);
    }
  };

  const isCustomized =
    config.upiId !== DEFAULT_TEMPLE_UPI_CONFIG.upiId ||
    config.qrImageUrl !== DEFAULT_TEMPLE_UPI_CONFIG.qrImageUrl ||
    config.payeeName !== DEFAULT_TEMPLE_UPI_CONFIG.payeeName;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl bg-[#170B08] border border-amber-500/35 rounded-3xl overflow-hidden shadow-2xl space-y-0 my-auto">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#2B110B] via-[#1F0C08] to-[#170B08] border-b border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 shadow-inner">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-amber-300 font-mono tracking-wider uppercase font-semibold flex items-center gap-2">
                <span>Official Temple Settlement</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[9px]">
                  {isCustomized ? 'Custom QR Active' : 'Default Hereditary QR'}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-amber-100 font-sanskrit leading-tight mt-0.5">
                Update Temple UPI & QR Code · अधिकृत UPI व्यवस्थापन
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-900/80 text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Success Alert */}
        {savedSuccess && (
          <div className="px-5 py-3 bg-emerald-950/80 border-b border-emerald-500/40 text-emerald-200 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Temple UPI credentials saved and applied live to all devotee booking portals!</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Top Info Banner */}
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              Changes saved here immediately update the <strong>QR Code Image</strong>, <strong>UPI ID</strong>, and <strong>Payee Name</strong> displayed to devotees during the ₹1,000 advance booking process.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
            {/* Left Column: Live QR Preview (5 cols) */}
            <div className="md:col-span-5 p-4 rounded-2xl bg-black/60 border border-amber-500/25 flex flex-col items-center text-center space-y-3 shadow-inner">
              <div className="text-[10px] uppercase font-mono tracking-wider text-stone-400 font-semibold">
                Live Devotee QR Preview
              </div>

              <div className="p-3 bg-white rounded-2xl shadow-xl border-2 border-amber-500/40 w-44 h-44 flex items-center justify-center overflow-hidden">
                <img
                  src={config.qrImageUrl || '/assets/UPI.jpeg'}
                  alt="Temple UPI QR Code Preview"
                  className="w-full h-full object-contain rounded-xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/UPI.jpeg';
                  }}
                />
              </div>

              <div className="space-y-1 w-full px-2">
                <div className="text-xs font-bold text-amber-200 truncate" title={config.payeeName}>
                  {config.payeeName || 'Pt. Atharva Deshmukh'}
                </div>
                <div className="text-[11px] font-mono text-amber-300/90 bg-amber-500/15 py-0.5 px-2 rounded border border-amber-500/25 truncate">
                  {config.upiId || 'atharvadeshmukh525-1@oksbi'}
                </div>
                <div className="text-[10px] text-stone-400 truncate">
                  {config.bankName || 'State Bank of India'} • {config.branch || 'Kushavarta Kund'}
                </div>
              </div>

              {/* Upload trigger */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="w-full py-2 px-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/35 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Processing Image...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload New QR Image</span>
                  </>
                )}
              </button>
            </div>

            {/* Right Column: Editable Form Fields (7 cols) */}
            <div className="md:col-span-7 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-amber-200/90 mb-1">
                  Official Temple UPI ID (VPA) *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={config.upiId}
                    onChange={(e) => setConfig({ ...config, upiId: e.target.value.trim() })}
                    placeholder="e.g. atharvadeshmukh525-1@oksbi"
                    className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs font-mono focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard?.writeText(config.upiId);
                      setCopiedUpi(true);
                      setTimeout(() => setCopiedUpi(false), 2000);
                    }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-amber-300"
                    title="Copy UPI ID"
                  >
                    {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-[10px] text-stone-400 mt-1">
                  Used by devotees for manual copy-paste in PhonePe, GPay, Paytm, BHIM.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-200/90 mb-1">
                  Hereditary Payee Name *
                </label>
                <input
                  type="text"
                  value={config.payeeName}
                  onChange={(e) => setConfig({ ...config, payeeName: e.target.value })}
                  placeholder="e.g. Pt. Atharva Deshmukh / Pt. Pravin Shambhu Deshmukh"
                  className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-amber-200/90 mb-1">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    value={config.bankName}
                    onChange={(e) => setConfig({ ...config, bankName: e.target.value })}
                    placeholder="State Bank of India"
                    className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-amber-200/90 mb-1">
                    Branch Location
                  </label>
                  <input
                    type="text"
                    value={config.branch}
                    onChange={(e) => setConfig({ ...config, branch: e.target.value })}
                    placeholder="Kushavarta Kund Branch"
                    className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-200/90 mb-1">
                  QR Image Source / URL
                </label>
                <input
                  type="text"
                  value={config.qrImageUrl.startsWith('data:') ? 'Custom Uploaded Image (Base64 Data)' : config.qrImageUrl}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (!val.startsWith('Custom Uploaded')) {
                      setConfig({ ...config, qrImageUrl: val });
                    }
                  }}
                  placeholder="/assets/UPI.jpeg or https://..."
                  className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-amber-500/30 text-stone-300 text-xs font-mono focus:outline-none focus:border-amber-400 truncate"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-200/90 mb-1">
                  Administrative Note (Internal)
                </label>
                <input
                  type="text"
                  value={config.notes || ''}
                  onChange={(e) => setConfig({ ...config, notes: e.target.value })}
                  placeholder="e.g. Official SBI Current Account for Kumbh / Daily Pooja Tokens"
                  className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-black/50 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-amber-300 border border-stone-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Hereditary Default</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-stone-900 text-stone-300 hover:text-white font-semibold text-xs border border-stone-800"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 text-stone-950 font-bold text-xs shadow-lg hover:shadow-amber-500/30 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-stone-950" />
              <span>Save & Apply Live to Devotees</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Booking Export Helpers (CSV, Excel, PDF) ───────────────────────────────

function exportBookingsToCSV(bookings: Booking[]) {
  const headers = [
    'Booking ID',
    'Devotee Name',
    'Phone',
    'Email',
    'Gotra',
    'City',
    'Pooja Type',
    'Scheduled Date',
    'Time Slot',
    'Location',
    'Members',
    'Advance Token',
    'Payment Status',
    'UTR Number',
    'Payment App',
    'Booking Date',
  ];

  const rows = bookings.map((b) => [
    `"${(b.id || '').replace(/"/g, '""')}"`,
    `"${(b.devoteeName || '').replace(/"/g, '""')}"`,
    `"${(b.phone || '').replace(/"/g, '""')}"`,
    `"${(b.email || '').replace(/"/g, '""')}"`,
    `"${(b.gotra || '').replace(/"/g, '""')}"`,
    `"${(b.city || 'Trimbakeshwar').replace(/"/g, '""')}"`,
    `"${(b.poojaType || '').replace(/"/g, '""')}"`,
    `"${(b.date || '').replace(/"/g, '""')}"`,
    `"${(b.time || '').replace(/"/g, '""')}"`,
    `"${(b.location || '').replace(/"/g, '""')}"`,
    `"${b.familyMembersCount || 1}"`,
    `"₹${b.advanceAmount || 1000}"`,
    `"${(b.qrStatus || 'pending_verification').replace(/"/g, '""')}"`,
    `"${(b.utrNumber || '').replace(/"/g, '""')}"`,
    `"${(b.paymentApp || '').replace(/"/g, '""')}"`,
    `"${(b.bookingDate || '').replace(/"/g, '""')}"`,
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Trimbakeshwar_Pooja_Bookings_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function exportBookingsToExcel(bookings: Booking[]) {
  const tableHtml = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Pooja Bookings</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
      <meta http-equiv="content-type" content="text/plain; charset=UTF-8"/>
      <style>
        body { font-family: Calibri, sans-serif; font-size: 11pt; }
        h2 { color: #5A1717; }
        th { background-color: #B88935; color: #FFFFFF; font-weight: bold; border: 1px solid #7D5915; padding: 8px; text-align: left; }
        td { border: 1px solid #E2E8F0; padding: 6px 8px; }
        .num { mso-number-format:"\\@"; }
        .status-verified { background-color: #D1FAE5; color: #065F46; font-weight: bold; }
        .status-pending { background-color: #FEF3C7; color: #92400E; font-weight: bold; }
        .status-rejected { background-color: #FEE2E2; color: #991B1B; font-weight: bold; }
      </style>
    </head>
    <body>
      <h2>Shri Kshetra Trimbakeshwar Jyotirlinga - Official Pooja Bookings Master Ledger</h2>
      <p>Hereditary Vatandar Purohit Portal · Exported: ${new Date().toLocaleString('en-IN')}</p>
      <table>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Devotee Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Gotra</th>
            <th>City</th>
            <th>Pooja Type</th>
            <th>Scheduled Date</th>
            <th>Time Slot</th>
            <th>Location</th>
            <th>Advance Token</th>
            <th>Status</th>
            <th>UTR Number</th>
            <th>Payment App</th>
            <th>Booked Date</th>
          </tr>
        </thead>
        <tbody>
          ${bookings
      .map(
        (b) => `
            <tr>
              <td class="num">${b.id || ''}</td>
              <td><b>${b.devoteeName || ''}</b></td>
              <td class="num">${b.phone || ''}</td>
              <td>${b.email || ''}</td>
              <td>${b.gotra || ''}</td>
              <td>${b.city || ''}</td>
              <td>${b.poojaType || ''}</td>
              <td>${b.date || ''}</td>
              <td>${b.time || ''}</td>
              <td>${b.location || ''}</td>
              <td>₹${b.advanceAmount || 1000}</td>
              <td class="${b.qrStatus === 'verified' ? 'status-verified' : b.qrStatus === 'rejected' ? 'status-rejected' : 'status-pending'}">
                ${b.qrStatus === 'verified' ? 'Verified' : b.qrStatus === 'rejected' ? 'Rejected' : 'Under Verification'}
              </td>
              <td class="num">${b.utrNumber || ''}</td>
              <td>${b.paymentApp || ''}</td>
              <td>${b.bookingDate || ''}</td>
            </tr>`
      )
      .join('')}
        </tbody>
      </table>
    </body>
    </html>
  `;

  const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Trimbakeshwar_Pooja_Bookings_${new Date().toISOString().slice(0, 10)}.xls`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function exportBookingsToPDF(bookings: Booking[]) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow pop-ups in your browser to print / save as PDF.');
    return;
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Shri Trimbakeshwar Jyotirlinga - Pooja Bookings Ledger</title>
      <meta charset="utf-8"/>
      <style>
        @media print {
          @page { size: landscape; margin: 12mm; }
        }
        body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 10pt; color: #1a1a1a; margin: 0; padding: 15px; }
        .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #5A1717; padding-bottom: 10px; margin-bottom: 12px; }
        .title { color: #5A1717; font-size: 16pt; font-weight: bold; }
        .sub { color: #B88935; font-size: 10pt; font-weight: 600; }
        .meta { font-size: 8pt; color: #666; text-align: right; }
        table { width: 100%; border-collapse: collapse; font-size: 9pt; }
        th { background: #5A1717; color: #fff; padding: 6px 8px; text-align: left; font-size: 8.5pt; }
        td { border-bottom: 1px solid #e0e0e0; padding: 6px 8px; }
        tr:nth-child(even) { background: #fdfaf6; }
        .badge { display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 7.5pt; font-weight: bold; }
        .badge-verified { background: #d1fae5; color: #065f46; }
        .badge-pending { background: #fef3c7; color: #92400e; }
        .badge-rejected { background: #fee2e2; color: #991b1b; }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <div class="title">श्री क्षेत्र त्र्यम्बकेश्वर ज्योतिर्लिंग · तीर्थ पुरोहित कार्यालय</div>
          <div class="sub">Pooja Bookings & Sanctified Ritual Ledger (${bookings.length} Records)</div>
        </div>
        <div class="meta">
          <div>Exported: ${new Date().toLocaleString('en-IN')}</div>
          <div>Pt. Pravin Shambhu Deshmukh (Desai)</div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Devotee Name</th>
            <th>Phone</th>
            <th>Gotra & City</th>
            <th>Ritual / Pooja</th>
            <th>Date & Time</th>
            <th>Advance Token</th>
            <th>Status</th>
            <th>UTR / Payment</th>
          </tr>
        </thead>
        <tbody>
          ${bookings
      .map(
        (b) => `
            <tr>
              <td><b>${b.id || ''}</b></td>
              <td><b>${b.devoteeName || ''}</b></td>
              <td>${b.phone || ''}</td>
              <td>${b.gotra || ''} · ${b.city || ''}</td>
              <td>${b.poojaType || ''}</td>
              <td>${b.date || ''} (${b.time || ''})</td>
              <td>₹${b.advanceAmount || 1000}</td>
              <td>
                <span class="badge ${b.qrStatus === 'verified' ? 'badge-verified' : b.qrStatus === 'rejected' ? 'badge-rejected' : 'badge-pending'}">
                  ${b.qrStatus === 'verified' ? 'Verified' : b.qrStatus === 'rejected' ? 'Rejected' : 'Under Review'}
                </span>
              </td>
              <td>${b.utrNumber || 'N/A'}</td>
            </tr>`
      )
      .join('')}
        </tbody>
      </table>
      <script>window.onload = function() { window.print(); }<\/script>
    </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}

// ─── Print Single Devotee Booking Pass / Receipt ────────────────────────────

function printSanctifiedBookingReceipt(b: Booking) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    window.print();
    return;
  }
  const isPending = b.qrStatus === 'pending_verification';
  const isVerified = b.qrStatus === 'verified';
  const statusLabel = isVerified
    ? 'Verified & Confirmed (प्रमाणित व निश्चित)'
    : isPending
      ? 'Status: Booking Under Verification (पडताळणी प्रलंबित)'
      : 'Payment Verification Rejected (अस्वीकृत)';
  const statusColor = isVerified ? '#065F46' : isPending ? '#92400E' : '#991B1B';
  const statusBg = isVerified ? '#D1FAE5' : isPending ? '#FEF3C7' : '#FEE2E2';

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>श्री त्र्यंबकेश्वर पूजा पावती - ${b.id}</title>
      <meta charset="utf-8" />
      <style>
        @media print {
          @page { size: A4; margin: 12mm; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #211D19;
          background: #FFFFFF;
          margin: 0;
          padding: 20px;
        }
        .receipt-card {
          border: 3px double #B88935;
          border-radius: 16px;
          padding: 24px;
          position: relative;
          background: #FDFAF5;
          overflow: hidden;
          box-sizing: border-box;
        }
        .watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 300px;
          height: 300px;
          opacity: 0.085;
          pointer-events: none;
          z-index: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .watermark img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .content {
          position: relative;
          z-index: 1;
        }
        .header {
          text-align: center;
          border-bottom: 2px solid #5A1717;
          padding-bottom: 14px;
          margin-bottom: 16px;
        }
        .header-top {
          font-size: 12px;
          color: #8C6218;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
        .header-title {
          font-size: 22px;
          color: #5A1717;
          font-weight: 800;
          margin: 4px 0;
        }
        .header-sub {
          font-size: 11px;
          color: #4A3E31;
          margin-top: 2px;
        }
        .badge-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          padding: 8px 12px;
          background: ${statusBg};
          border: 1px solid ${statusColor};
          border-radius: 8px;
        }
        .badge-ref {
          font-family: monospace;
          font-size: 13px;
          font-weight: bold;
          color: #5A1717;
        }
        .badge-status {
          font-size: 11.5px;
          font-weight: bold;
          color: ${statusColor};
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 14px;
        }
        td {
          padding: 6px 8px;
          font-size: 11.5px;
          border-bottom: 1px dashed #E5D5BA;
        }
        .td-label {
          width: 36%;
          color: #555;
        }
        .td-val {
          width: 64%;
          font-weight: bold;
          color: #1A1A1A;
        }
        .amount-val {
          color: #065F46;
          font-size: 13px;
        }
        .guidelines {
          background: #FFFDF8;
          border: 1px solid #E2D2B5;
          border-radius: 8px;
          padding: 10px 12px;
          margin-top: 14px;
          font-size: 10.5px;
          color: #4A3E31;
          line-height: 1.5;
        }
        .guidelines-title {
          font-weight: bold;
          color: #5A1717;
          margin-bottom: 3px;
        }
        .footer {
          margin-top: 18px;
          padding-top: 10px;
          border-top: 1px solid #D5C2A5;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          font-size: 9.5px;
          color: #777;
        }
        .seal-box {
          text-align: right;
        }
        .seal-line {
          font-weight: bold;
          color: #5A1717;
          font-size: 10.5px;
        }
      </style>
    </head>
    <body>
      <div class="receipt-card">
        <div class="watermark">
          <img src="/assets/purohit-profile-transparent.png" alt="Shri Trimbakeshwar Purohit Sangh Seal" />
        </div>
        <div class="content">
          <div class="header">
            <div class="header-top">॥ श्री क्षेत्र त्र्यम्बकेश्वर ज्योतिर्लिंग तीर्थ पुरोहित कार्यालय ॥</div>
            <div class="header-title">पवित्र पूजा पावती एवं संकल्प पत्र</div>
            <div class="header-sub">Pt. Pravin Shambhu Deshmukh (Desai) / Pt. Atharva Deshmukh · वंशपरंपरागत २५ पिढ्यांचे वतनदार तीर्थ पुरोहित (सन १६७४)</div>
            <div class="header-sub">कुशावर्त तीर्थ कुण्ड, श्री क्षेत्र त्र्यम्बकेश्वर, जि. नाशिक · संपर्क: +91 96899 73967</div>
          </div>

          <div class="badge-bar">
            <div class="badge-ref">Booking Ref: ${b.id}</div>
            <div class="badge-status">${statusLabel}</div>
          </div>

          <table>
            <tr>
              <td class="td-label">Primary Devotee (Yajman):</td>
              <td class="td-val">${b.devoteeName} (${b.gotra ? (b.gotra.includes('Gotra') ? b.gotra : b.gotra + ' Gotra') : 'Kashyap Gotra'})</td>
            </tr>
            <tr>
              <td class="td-label">Contact Mobile / WhatsApp:</td>
              <td class="td-val">${b.phone}</td>
            </tr>
            ${b.email ? `
            <tr>
              <td class="td-label">Devotee Email:</td>
              <td class="td-val">${b.email}</td>
            </tr>
            ` : ''}
            <tr>
              <td class="td-label">City & State of Residence:</td>
              <td class="td-val">${b.city || 'Trimbakeshwar'}, ${b.state || 'Maharashtra'}</td>
            </tr>
            ${b.devoteeAddress ? `
            <tr>
              <td class="td-label">Devotee Residential Address:</td>
              <td class="td-val">${b.devoteeAddress}</td>
            </tr>
            ` : ''}
            <tr>
              <td class="td-label">Family Members Attending:</td>
              <td class="td-val">${b.familyMembersCount || 2} Persons Attending</td>
            </tr>
            <tr>
              <td class="td-label">Sanctified Vidhi / Pooja:</td>
              <td class="td-val">${b.poojaType}</td>
            </tr>
            <tr>
              <td class="td-label">Appointed Hereditary Guruji:</td>
              <td class="td-val">${b.assignedGuruji || 'Pt. Pravin Shambhu Deshmukh (Desai)'}</td>
            </tr>
            <tr>
              <td class="td-label">Scheduled Date:</td>
              <td class="td-val">${b.date}</td>
            </tr>
            <tr>
              <td class="td-label">Muhurat Time Slot:</td>
              <td class="td-val">${b.time}</td>
            </tr>
            <tr>
              <td class="td-label">Pooja Performing Venue / Address:</td>
              <td class="td-val">${b.poojaAddress || b.location || 'Kushavarta Kund Ghat & Mandir Gate 2, Trimbakeshwar'}</td>
            </tr>
            <tr>
              <td class="td-label">Advance Token Deposit:</td>
              <td class="td-val amount-val">₹${b.advanceAmount || 1000}.00 (Submitted via ${b.paymentApp || 'UPI'})</td>
            </tr>
            <tr>
              <td class="td-label">UPI Transaction ID (UTR):</td>
              <td class="td-val" style="font-family: monospace;">${b.utrNumber || 'Under Review'}</td>
            </tr>
            ${b.notes ? `
            <tr>
              <td class="td-label">Devotee Sankalp Notes:</td>
              <td class="td-val">${b.notes}</td>
            </tr>
            ` : ''}
          </table>

          <div class="guidelines">
            <div class="guidelines-title">पवित्र संकल्प नियम • Devotee Ritual Guidelines:</div>
            <div style="margin-bottom: 5px;">• <strong>१. परिधान नियम (Dress Code):</strong> पुरुषों हेतु सोवळे / पांढरे धोतर-कुर्ता तथा महिला हेतु साडी परिधान अनिवार्य आहे. <span style="font-size: 10px; color: #555;">(Mandatory Attire: White/Saffron Dhoti-Kurta for Men, Traditional Saree for Women.)</span></div>
            <div style="margin-bottom: 5px;">• <strong>२. स्नान व उपवास (Purification & Fasting):</strong> पूजेच्या दिवशी सकाळी कुशावर्त तीर्थ स्नान करून उपवास ठेवावा. <span style="font-size: 10px; color: #555;">(Holy Bath & Fasting: Sacred bath at Kushavarta Kund and fasting until ritual completion.)</span></div>
            <div>• <strong>३. पूजा साहित्य (Sacred Samagri):</strong> सर्व वैदिक पूजा साहित्य पुरोहित कार्यालयातून सिद्ध केले जाईल. <span style="font-size: 10px; color: #555;">(Puja Samagri: Consecrated Vedic materials and offerings provided by Guruji's Karyalaya.)</span></div>
          </div>

          <div class="footer">
            <div>
              <div>Submission Time: ${b.screenshotTimestamp || (b.bookingDate ? b.bookingDate + ' (Created)' : new Date().toLocaleDateString('en-IN'))}</div>
              <div>Official Devotee Ledger Record · Har Har Mahadev!</div>
            </div>
            <div class="seal-box">
              <div class="seal-line">श्री क्षेत्र त्र्यम्बकेश्वर तीर्थ पुरोहित कार्यालय</div>
            </div>
          </div>
        </div>
      </div>
      <script>window.onload = function() { window.print(); }<\/script>
    </body>
    </html>
  `;
  printWindow.document.write(html);
  printWindow.document.close();
}

// ─── Devotee Booking Pass Modal ──────────────────────────────────────────────

function BookingPassModal({
  booking,
  onClose,
  onVerifyPayment,
}: {
  booking: Booking;
  onClose: () => void;
  onVerifyPayment?: (booking: Booking) => void;
}) {
  const isPending = booking.qrStatus === 'pending_verification';
  const isVerified = booking.qrStatus === 'verified';
  const [showProofLightbox, setShowProofLightbox] = useState(false);

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
        <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-gradient-to-b from-[#1C0B08] via-[#140705] to-[#0D0403] border-2 border-amber-500/40 shadow-2xl custom-scrollbar text-stone-200 overflow-hidden">
          {/* Pass Header */}
          <div className="relative z-1 p-5 sm:p-6 bg-gradient-to-r from-[#4A0E0E] via-[#2A0807] to-[#1C0B08] border-b border-amber-500/30 text-center">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-xl bg-black/40 hover:bg-black/70 text-stone-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex flex-col gap-1.5 items-center">
              <div className="text-[11px] text-amber-300 font-mono tracking-widest uppercase">
                ॥ श्री क्षेत्र त्र्यम्बकेश्वर ज्योतिर्लिंग तीर्थ पुरोहित कार्यालय ॥
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-sanskrit text-amber-100 leading-snug">
                पवित्र पूजा संकल्प एवं दर्शन पत्र
              </h3>
              <div className="inline-block mt-1 px-3 py-1 rounded-full bg-black/50 border border-amber-400/40 text-amber-300 font-mono text-xs">
                Pass No: <strong>{booking.id}</strong>
              </div>
            </div>
          </div>

          {/* Pass Content */}
          <div className="relative z-1 p-5 sm:p-6 space-y-5">
            {/* Status Alert Banner */}
            <div className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${isVerified
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                : isPending
                  ? 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                  : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
              }`}>
              <div className="flex items-center gap-2.5">
                {isVerified ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : isPending ? (
                  <Clock className="w-5 h-5 text-amber-400 shrink-0 animate-pulse" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                )}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider">
                    {isVerified
                      ? 'Status: Confirmed & Verified (प्रमाणित व निश्चित)'
                      : isPending
                        ? 'Status: Booking Under Verification (पडताळणी प्रलंबित)'
                        : 'Status: Payment Verification Rejected (अस्वीकृत)'}
                  </div>
                  <div className="text-[11px] opacity-80">
                    {isVerified
                      ? 'Official Guruji slot confirmed. Devotee pass is active and sanctified.'
                      : isPending
                        ? 'UPI screenshot & UTR number under review against temple bank ledger.'
                        : 'Payment details could not be verified. Devotee contacted for re-upload.'}
                  </div>
                </div>
              </div>
              {isPending && onVerifyPayment && (
                <button
                  onClick={() => { onClose(); onVerifyPayment(booking); }}
                  className="px-3 py-1.5 rounded-xl bg-amber-400 text-stone-950 font-bold text-xs hover:bg-amber-300 shrink-0 shadow cursor-pointer"
                >
                  Verify Now
                </button>
              )}
            </div>

            {/* Details Grid (Detailed Breakdown) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Devotee Info */}
              <div className="p-3.5 rounded-2xl bg-black/40 border border-amber-500/20 space-y-1.5">
                <span className="text-[10px] text-amber-400 font-mono uppercase block">Devotee (Yajman) Details</span>
                <div className="text-base font-bold text-stone-100 font-sanskrit">{booking.devoteeName}</div>
                <div className="text-xs text-amber-300/90 font-medium">Gotra: {booking.gotra || 'Kashyap Gotra'}</div>
                <div className="text-xs text-stone-300">
                  Attending Family: <strong>{booking.familyMembersCount || 2} Persons</strong>
                </div>
                <div className="text-xs text-stone-400">
                  Native City: {booking.city || 'Trimbakeshwar'}{booking.state ? `, ${booking.state}` : ''}
                </div>
                {booking.devoteeAddress && (
                  <div className="text-xs text-stone-400 pt-1 border-t border-stone-800">
                    <span className="text-[10px] text-stone-500 block uppercase">Client Residential Address:</span>
                    <span className="text-stone-300">{booking.devoteeAddress}</span>
                  </div>
                )}
              </div>

              {/* Ritual & Muhurat */}
              <div className="p-3.5 rounded-2xl bg-black/40 border border-amber-500/20 space-y-1.5">
                <span className="text-[10px] text-amber-400 font-mono uppercase block">Ritual & Sacred Venue</span>
                <div className="text-sm font-bold text-amber-200">{booking.poojaType}</div>
                <div className="text-xs text-stone-300 font-medium flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Scheduled Date: <strong>{booking.date}</strong></span>
                </div>
                <div className="text-xs text-stone-300 font-medium flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Muhurat Slot: <strong>{booking.time}</strong></span>
                </div>
                <div className="text-xs text-stone-300 flex items-start gap-1.5 pt-1 border-t border-stone-800">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-stone-400 block uppercase">Pooja Performing Venue / Address:</span>
                    <span className="text-stone-200">{booking.poojaAddress || booking.location || 'Kushavarta Kund Ghat & Mandir Gate 2, Trimbakeshwar'}</span>
                  </div>
                </div>
              </div>

              {/* Financial Audit */}
              <div className="p-3.5 rounded-2xl bg-black/40 border border-amber-500/20 space-y-1.5">
                <span className="text-[10px] text-amber-400 font-mono uppercase block">Advance Token & Payment Audit</span>
                <div className="text-base font-bold font-mono text-emerald-300">
                  ₹{booking.advanceAmount || 1000} Advance Token Deposit
                </div>
                <div className="text-xs text-stone-300">Channel / Method: {booking.paymentApp || 'UPI Transfer'}</div>
                {booking.utrNumber && (
                  <div className="text-xs font-mono text-amber-300/90 bg-stone-900/60 p-1.5 rounded-lg border border-amber-500/20 break-all">
                    UTR / Ref No: {booking.utrNumber}
                  </div>
                )}
              </div>

              {/* Contact Channels & Timestamp */}
              <div className="p-3.5 rounded-2xl bg-black/40 border border-amber-500/20 space-y-1.5">
                <span className="text-[10px] text-amber-400 font-mono uppercase block">Contact & Submission Timestamp</span>
                <div className="text-xs text-stone-200">
                  Phone: <a href={`tel:${booking.phone}`} className="text-amber-300 underline font-medium">{booking.phone}</a>
                </div>
                {booking.email && (
                  <div className="text-xs text-stone-200 truncate">
                    Email: <a href={`mailto:${booking.email}`} className="text-stone-300 underline">{booking.email}</a>
                  </div>
                )}
                <div className="text-xs text-amber-300/90 font-mono pt-1 border-t border-stone-800 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Submitted: {booking.screenshotTimestamp || (booking.bookingDate ? `${booking.bookingDate} (Created)` : 'Recently Submitted')}</span>
                </div>
                <div className="text-[11px] text-stone-400 pt-0.5 flex items-center gap-2">
                  {booking.emailSent ? (
                    <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-semibold">Email Dispatched</span>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-semibold">Pending Verification</span>
                  )}
                </div>
              </div>
            </div>

            {/* Devotee Notes / Sankalp Intent */}
            {booking.notes && (
              <div className="p-3.5 rounded-2xl bg-black/40 border border-amber-500/20 space-y-1">
                <span className="text-[10px] text-amber-400 font-mono uppercase">Devotee Sankalp Intent & Notes</span>
                <div className="text-xs text-stone-300 italic leading-relaxed">
                  "{booking.notes}"
                </div>
              </div>
            )}

            {/* Attached Payment Screenshot Proof */}
            {booking.paymentScreenshot && (
              <div className="p-3.5 rounded-2xl bg-black/50 border border-amber-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-amber-400 font-mono uppercase">Attached Payment Screenshot (Proof)</span>
                  <button
                    type="button"
                    onClick={() => setShowProofLightbox(true)}
                    className="text-[11px] text-amber-300 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Zoom Screenshot</span>
                  </button>
                </div>
                <div
                  onClick={() => setShowProofLightbox(true)}
                  className="group relative max-h-52 overflow-hidden rounded-xl border border-stone-800 bg-stone-950 flex items-center justify-center cursor-pointer"
                >
                  <img
                    src={booking.paymentScreenshot}
                    alt="Payment Proof"
                    className="max-h-52 object-contain transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1.5 rounded-full bg-black/80 text-amber-300 text-xs font-bold flex items-center gap-1.5 border border-amber-500/40">
                      <Eye className="w-4 h-4" /> Click to Inspect Full Resolution
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Vedic Guidelines (Marathi & English) */}
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-2 text-xs">
              <div className="font-bold text-amber-200 font-sanskrit flex items-center justify-between">
                <span>पवित्र संकल्प नियम • Devotee Ritual Guidelines</span>
                <span className="text-[10px] text-amber-400 font-mono uppercase">Vedic Observances</span>
              </div>
              <div className="space-y-2 text-[11px] text-stone-300 leading-relaxed border-t border-amber-500/20 pt-2">
                <div>
                  <div className="font-semibold text-amber-100 font-devanagari">१. परिधान नियम (Dress Code):</div>
                  <div className="text-stone-300 pl-3">
                    • पुरुषों हेतु सोवळे / पांढरे धोतर-कुर्ता तथा महिला हेतु साडी परिधान अनिवार्य आहे.
                  </div>
                  <div className="text-stone-400 text-[10px] pl-3 italic">
                    • Mandatory Traditional Attire: White/Saffron Dhoti-Kurta for Men, Saree for Women.
                  </div>
                </div>

                <div>
                  <div className="font-semibold text-amber-100 font-devanagari">२. स्नान व उपवास (Purification & Fasting):</div>
                  <div className="text-stone-300 pl-3">
                    • पूजेच्या दिवशी सकाळी कुशावर्त तीर्थ स्नान करून उपवास ठेवावा.
                  </div>
                  <div className="text-stone-400 text-[10px] pl-3 italic">
                    • Holy Bath & Fasting: Devotees must observe fasting (upvaas) and take a holy bath at Kushavarta Kund on the morning of the Vidhi.
                  </div>
                </div>

                <div>
                  <div className="font-semibold text-amber-100 font-devanagari">३. पूजा साहित्य (Sacred Samagri):</div>
                  <div className="text-stone-300 pl-3">
                    • सर्व वैदिक पूजा साहित्य पुरोहित कार्यालयातून सिद्ध केले जाईल.
                  </div>
                  <div className="text-stone-400 text-[10px] pl-3 italic">
                    • Puja Samagri: All sanctified Vedic puja materials, Dravyas, and samagri will be consecrated and provided by Guruji’s Purohit Karyalaya.
                  </div>
                </div>
              </div>
            </div>

            {/* Hereditary Purohit Info */}
            <div className="p-3.5 rounded-2xl bg-black/60 border border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div>
                <div className="font-bold text-amber-100 font-sanskrit">पं. प्रवीण शंभू देशमुख (देसाई) / पं. अथर्व देशमुख</div>
                <div className="text-[11px] text-amber-400/80">वंशपरंपरागत २५ पिढ्यांचे वतनदार तीर्थ पुरोहित (सन १६७४)</div>
                <div className="text-[11px] text-stone-400 mt-0.5">कुशावर्त तीर्थ कुण्ड, श्री क्षेत्र त्र्यम्बकेश्वर, जि. नाशिक</div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={`https://wa.me/${String(booking.phone || '').replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold flex items-center gap-1 hover:bg-emerald-500 hover:text-stone-950 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
                <button
                  onClick={() => printSanctifiedBookingReceipt(booking)}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 font-bold text-xs shadow hover:from-amber-300 hover:to-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Pass</span>
                </button>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="relative z-1 p-4 bg-black/50 border-t border-amber-500/20 flex items-center justify-between text-xs">
            <span className="text-[11px] text-stone-500 font-mono">Sacred Trimbakeshwar Devotee Registry</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* SCREENSHOT FULL RESOLUTION LIGHTBOX DIALOG */}
      {showProofLightbox && booking.paymentScreenshot && (
        <div className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-fade-in">
          <div className="relative w-full max-w-3xl max-h-[94vh] bg-[#140806] border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            <div className="p-4 bg-gradient-to-r from-[#3D0F0B] to-[#1C0705] border-b border-amber-500/25 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-amber-300 font-mono tracking-widest uppercase block">
                  Payment Verification Proof • {booking.id}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-amber-100 font-sanskrit">
                  {booking.devoteeName} ({booking.poojaType})
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={booking.paymentScreenshot}
                  download={`Payment-Receipt-${booking.id}.png`}
                  className="p-2 rounded-xl bg-stone-900 text-stone-300 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
                  title="Download Image"
                >
                  <Download className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setShowProofLightbox(false)}
                  className="p-2 rounded-xl bg-stone-900 text-stone-300 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-black/70">
              <img
                src={booking.paymentScreenshot}
                alt="Devotee Payment Full Proof"
                className="max-h-[72vh] w-auto max-w-full object-contain rounded-xl shadow-lg border border-amber-500/20"
              />
            </div>

            <div className="p-3.5 bg-black/60 border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-300">
              <div className="font-mono text-amber-200">
                UTR: <strong>{booking.utrNumber || 'Under Verification'}</strong> • App: {booking.paymentApp || 'UPI'}
              </div>
              <button
                type="button"
                onClick={() => setShowProofLightbox(false)}
                className="px-3.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Bookings Module (Stat Cards, Search, Sort, Filter & Live DB Pagination) ──

function BookingsModule({
  initialBookings,
  onSelectBookingForQR,
  onOpenNewBooking,
}: {
  initialBookings: Booking[];
  onSelectBookingForQR: (b: Booking) => void;
  onOpenNewBooking: () => void;
}) {
  const [page, setPage] = useState(0);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  const [search, setSearch] = useState('');
  const [inputVal, setInputVal] = useState('');
  const [qrStatusFilter, setQrStatusFilter] = useState<'' | 'pending_verification' | 'verified' | 'rejected'>('');
  const [poojaFilter, setPoojaFilter] = useState('');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    pendingCount: 0,
    verifiedCount: 0,
    rejectedCount: 0,
    verifiedRevenue: 0,
  });

  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedBookingForPass, setSelectedBookingForPass] = useState<Booking | null>(null);

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fetch Stats from Spring Boot /api/bookings/stats
  const loadStats = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:8080/api/bookings/stats');
      if (res.ok) {
        const data = await res.json();
        setStats({
          total: data.total ?? 0,
          pendingCount: data.pendingCount ?? 0,
          verifiedCount: data.verifiedCount ?? 0,
          rejectedCount: data.rejectedCount ?? 0,
          verifiedRevenue: data.verifiedRevenue ?? (data.verifiedCount ?? 0) * 1000,
        });
        return;
      }
    } catch (_) { }
    // Local calculation fallback
    try {
      const local: Booking[] = JSON.parse(localStorage.getItem('trimbak_bookings') || '[]');
      const mockIds = new Set(['TRMB-2026-1081', 'TRMB-2026-1082', 'TRMB-2026-1083', 'TRMB-2026-1084', 'TRMB-2026-1085', 'TRMB-2026-1086']);
      const clean = local.filter((b) => !mockIds.has(b.id));
      const pending = clean.filter((b) => b.qrStatus === 'pending_verification').length;
      const verified = clean.filter((b) => b.qrStatus === 'verified').length;
      const rejected = clean.filter((b) => b.qrStatus === 'rejected').length;
      setStats({
        total: clean.length,
        pendingCount: pending,
        verifiedCount: verified,
        rejectedCount: rejected,
        verifiedRevenue: verified * 1000,
      });
    } catch (_) { }
  }, []);

  // Fetch paginated bookings from Spring Boot /api/bookings
  const loadPage = useCallback(async (params: any) => {
    setLoading(true);
    setError(null);
    try {
      const query = new URLSearchParams({
        page: String(params.page ?? 0),
        size: String(params.size ?? 20),
        sortBy: 'id',
        sortDir: params.sortDir ?? 'desc',
        ...(params.search ? { search: params.search } : {}),
        ...(params.status ? { status: params.status } : {}),
      });

      const response = await fetch(`http://localhost:8080/api/bookings?${query}`, {
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        const pageData = await response.json();
        const rawContent = pageData.content || [];
        const content: Booking[] = rawContent.map((b: any) => ({
          id: b.bookingCode || String(b.id),
          devoteeName: b.devoteeName,
          phone: b.phone,
          email: b.email,
          poojaType: b.poojaType,
          date: b.scheduledDate || b.date || 'TBD',
          time: b.timeSlot || b.time || '06:30 AM',
          location: b.location || 'Kushavarta Kund & Ahilya Sangam Ghat',
          status: b.qrStatus === 'verified' ? 'upcoming' : 'pending_verification',
          statusLabel: b.qrStatus === 'verified' ? 'Confirmed Booking' : b.qrStatus === 'rejected' ? 'Payment Rejected' : 'Token Under Verification',
          gotra: b.gotra || 'Vedic Gotra',
          city: b.city || 'Trimbakeshwar',
          state: b.state || 'Maharashtra',
          devoteeAddress: b.devoteeAddress || '',
          poojaAddress: b.poojaAddress || b.location || 'Kushavarta Kund Ghat & Mandir Gate 2, Trimbakeshwar',
          familyMembersCount: b.familyMembersCount || 1,
          advanceAmount: b.advanceAmount || 1000,
          totalPoojaDakshina: 'As per Vedic Scriptures',
          qrStatus: b.qrStatus || 'pending_verification',
          utrNumber: b.utrNumber,
          paymentApp: b.paymentApp || 'Google Pay',
          paymentScreenshot: b.paymentScreenshot,
          bookingDate: b.createdAt ? new Date(b.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Today',
          screenshotTimestamp: b.createdAt ? new Date(b.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) + ', ' + new Date(b.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }) : '',
          emailSent: b.emailSent,
          notes: b.notes || b.adminNotes,
        }));

        setBookings(content);
        setTotalPages(pageData.totalPages ?? (content.length > 0 ? 1 : 0));
        setTotalElements(pageData.totalElements ?? content.length);
        setLoading(false);
        return;
      }
    } catch (err) {
      console.debug('Spring Boot bookings API unreachable, checking local fallback:', err);
    }

    // Local fallback: purge mock bookings and filter real bookings only
    try {
      const local: Booking[] = JSON.parse(localStorage.getItem('trimbak_bookings') || '[]');
      const mockIds = new Set(['TRMB-2026-1081', 'TRMB-2026-1082', 'TRMB-2026-1083', 'TRMB-2026-1084', 'TRMB-2026-1085', 'TRMB-2026-1086']);
      const clean = local.filter((b) => !mockIds.has(b.id));

      const q = (params.search || '').toLowerCase();
      const filtered = clean.filter((b: Booking) => {
        if (params.status && b.qrStatus !== params.status) return false;
        if (params.pooja && !b.poojaType?.toLowerCase().includes(params.pooja.toLowerCase())) return false;
        if (!q) return true;
        return (
          b.devoteeName?.toLowerCase().includes(q) ||
          b.phone?.includes(q) ||
          (b.email && b.email.toLowerCase().includes(q)) ||
          (b.utrNumber && b.utrNumber.toLowerCase().includes(q)) ||
          b.poojaType?.toLowerCase().includes(q) ||
          b.id?.toLowerCase().includes(q) ||
          b.city?.toLowerCase().includes(q)
        );
      });

      const sorted = [...filtered].sort((a: any, b: any) =>
        (params.sortDir || 'desc') === 'desc'
          ? new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
          : new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()
      );

      const startIdx = (params.page ?? 0) * 20;
      setBookings(sorted.slice(startIdx, startIdx + 20));
      setTotalPages(Math.max(1, Math.ceil(sorted.length / 20)));
      setTotalElements(sorted.length);
    } catch (e) {
      setBookings([]);
      setTotalPages(0);
      setTotalElements(0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();
    loadPage({ page, size: pageSize, sortDir, search, status: qrStatusFilter, pooja: poojaFilter });
  }, [page, pageSize, sortDir, search, qrStatusFilter, poojaFilter, loadPage, loadStats]);

  const handleSearchInput = (val: string) => {
    setInputVal(val);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setPage(0);
      setSearch(val.trim());
    }, 300);
  };

  // Sync real-time updates
  useEffect(() => {
    const onNew = (e: Event) => {
      loadStats();
      loadPage({ page: 0, size: pageSize, sortDir, search, status: qrStatusFilter });
    };
    const onUpdated = () => {
      loadStats();
      loadPage({ page, size: pageSize, sortDir, search, status: qrStatusFilter });
    };
    window.addEventListener('trimbak_booking_submitted', onNew);
    window.addEventListener('trimbak_booking_updated', onUpdated);
    return () => {
      window.removeEventListener('trimbak_booking_submitted', onNew);
      window.removeEventListener('trimbak_booking_updated', onUpdated);
    };
  }, [loadPage, loadStats, page, pageSize, qrStatusFilter, search, sortDir]);

  // Handle Export
  const handleExport = async (format: 'csv' | 'excel' | 'pdf') => {
    setExporting(true);
    let dataToExport = bookings;
    try {
      if (totalElements > bookings.length) {
        const query = new URLSearchParams({
          page: '0',
          size: String(Math.min(totalElements, 500)),
          sortBy: 'id',
          sortDir,
          ...(search ? { search } : {}),
          ...(qrStatusFilter ? { status: qrStatusFilter } : {}),
        });
        const res = await fetch(`http://localhost:8080/api/bookings?${query}`);
        if (res.ok) {
          const pData = await res.json();
          if (pData.content && pData.content.length > 0) {
            dataToExport = pData.content.map((b: any) => ({
              ...b,
              id: b.bookingCode || String(b.id),
              date: b.scheduledDate || b.date,
              time: b.timeSlot || b.time,
            }));
          }
        }
      }
      if (format === 'csv') exportBookingsToCSV(dataToExport);
      else if (format === 'excel') exportBookingsToExcel(dataToExport);
      else if (format === 'pdf') exportBookingsToPDF(dataToExport);
    } catch (e) {
      console.error('Export bookings error:', e);
      if (format === 'csv') exportBookingsToCSV(bookings);
      else if (format === 'excel') exportBookingsToExcel(bookings);
      else if (format === 'pdf') exportBookingsToPDF(bookings);
    } finally {
      setExporting(false);
    }
  };

  const startRecord = totalElements === 0 ? 0 : page * pageSize + 1;
  const endRecord = Math.min((page + 1) * pageSize, totalElements);

  return (
    <div className="space-y-4">
      {/* ─── 4 Stat Cards Row ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Card 1: Total Bookings */}
        <div
          onClick={() => { setQrStatusFilter(''); setPage(0); }}
          className={`p-4 rounded-2xl border shadow-md cursor-pointer transition-all ${qrStatusFilter === ''
              ? 'bg-[#1F0E09] border-amber-500/50 shadow-amber-950/30'
              : 'bg-[#1A0D0A] border-amber-500/20 hover:border-amber-400/50'
            }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-stone-400 font-medium">Total Bookings</span>
            <Database className="w-3.5 h-3.5 text-amber-400/80" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-200 mt-1">
            {stats.total || totalElements}
          </div>
          <div className="text-[10px] text-amber-400/80 mt-1">Master Devotee Ledger</div>
        </div>

        {/* Card 2: Under Verification */}
        <div
          onClick={() => {
            setQrStatusFilter(qrStatusFilter === 'pending_verification' ? '' : 'pending_verification');
            setPage(0);
          }}
          className={`p-4 rounded-2xl border shadow-md cursor-pointer transition-all ${qrStatusFilter === 'pending_verification'
              ? 'bg-rose-950/50 border-rose-500 shadow-rose-950/40'
              : 'bg-[#1A0D0A] border-rose-500/30 hover:border-rose-400/60'
            }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-rose-300 font-medium">Under Verification</span>
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          </div>
          <div className="text-2xl font-bold font-mono text-rose-300 mt-1">
            {stats.pendingCount}
          </div>
          <div className="text-[10px] text-rose-400/90 mt-1">UPI Screenshots Awaiting Review</div>
        </div>

        {/* Card 3: Verified & Confirmed */}
        <div
          onClick={() => {
            setQrStatusFilter(qrStatusFilter === 'verified' ? '' : 'verified');
            setPage(0);
          }}
          className={`p-4 rounded-2xl border shadow-md cursor-pointer transition-all ${qrStatusFilter === 'verified'
              ? 'bg-emerald-950/50 border-emerald-500 shadow-emerald-950/40'
              : 'bg-[#1A0D0A] border-emerald-500/30 hover:border-emerald-400/60'
            }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-emerald-300 font-medium">Verified & Confirmed</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-300 mt-1">
            {stats.verifiedCount}
          </div>
          <div className="text-[10px] text-emerald-400/90 mt-1">
            ₹{stats.verifiedRevenue.toLocaleString('en-IN')} Token Advance
          </div>
        </div>

        {/* Card 4: Rejected / Disputed */}
        <div
          onClick={() => {
            setQrStatusFilter(qrStatusFilter === 'rejected' ? '' : 'rejected');
            setPage(0);
          }}
          className={`p-4 rounded-2xl border shadow-md cursor-pointer transition-all ${qrStatusFilter === 'rejected'
              ? 'bg-stone-800 border-stone-400 shadow-stone-900/50'
              : 'bg-[#1A0D0A] border-stone-600/30 hover:border-stone-500/60'
            }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-stone-400 font-medium">Payment Rejected</span>
            <AlertCircle className="w-3.5 h-3.5 text-stone-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-stone-300 mt-1">
            {stats.rejectedCount}
          </div>
          <div className="text-[10px] text-stone-500 mt-1">Re-submission Required</div>
        </div>
      </div>

      {/* ─── Compact Control Bar ─── */}
      <div className="rounded-2xl bg-[#1A0D0A] border border-amber-500/25 p-3.5 sm:p-4 shadow-xl space-y-3">
        {/* Row 1: Title, Live DB Badge, Stats & Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-amber-500/15">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-base font-bold text-amber-100 font-sanskrit flex items-center gap-2">
              <span>Pooja Bookings Ledger</span>
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono flex items-center gap-1">
              <Database className="w-3 h-3" />
              <span>Live DB</span>
            </span>
            <span className="text-xs text-amber-300 font-mono px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
              {totalElements} Total · {stats.pendingCount} Under Review
            </span>
            <button
              onClick={() => {
                loadStats();
                loadPage({ page, size: pageSize, sortDir, search, status: qrStatusFilter, pooja: poojaFilter });
              }}
              disabled={loading}
              className="p-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-amber-300 border border-stone-700 transition-colors disabled:opacity-50"
              title="Refresh Bookings"
            >
              {loading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <RefreshCw className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Export & New Booking Actions Bar */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-stone-400 font-mono mr-1">Export:</span>
            <button
              onClick={() => handleExport('csv')}
              disabled={exporting || bookings.length === 0}
              className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-amber-300 border border-stone-700 text-xs font-medium flex items-center gap-1 transition-colors disabled:opacity-40"
              title="Download CSV"
            >
              <FileText className="w-3 h-3 text-amber-400" />
              <span>CSV</span>
            </button>
            <button
              onClick={() => handleExport('excel')}
              disabled={exporting || bookings.length === 0}
              className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-emerald-400 border border-stone-700 text-xs font-medium flex items-center gap-1 transition-colors disabled:opacity-40"
              title="Download Excel Spreadsheet"
            >
              <FileSpreadsheet className="w-3 h-3 text-emerald-400" />
              <span>Excel</span>
            </button>
            <button
              onClick={() => handleExport('pdf')}
              disabled={exporting || bookings.length === 0}
              className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-rose-400 border border-stone-700 text-xs font-medium flex items-center gap-1 transition-colors disabled:opacity-40"
              title="Print or Save as PDF"
            >
              <Printer className="w-3 h-3 text-rose-400" />
              <span>PDF</span>
            </button>

            <button
              onClick={onOpenNewBooking}
              className="ml-1 px-3 py-1 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 font-bold text-xs flex items-center gap-1 shadow hover:from-amber-300 hover:to-amber-400 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Booking</span>
            </button>
          </div>
        </div>

        {/* Row 2: Search, Status Filter, Pooja Filter & Sort */}
        <div className="flex flex-col md:flex-row gap-2">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={inputVal}
              onChange={(e) => handleSearchInput(e.target.value)}
              placeholder="Search by devotee name, phone, email, UTR, booking ID, city…"
              className="w-full pl-8 pr-8 py-1.5 rounded-xl bg-black/60 border border-amber-500/20 text-stone-200 text-xs placeholder:text-stone-500 focus:outline-none focus:border-amber-400/60 transition-colors"
            />
            {inputVal && (
              <button
                onClick={() => {
                  setInputVal('');
                  setSearch('');
                  setPage(0);
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
            <select
              value={qrStatusFilter}
              onChange={(e) => {
                setQrStatusFilter(e.target.value as any);
                setPage(0);
              }}
              className="pl-7 pr-3 py-1.5 rounded-xl bg-black/60 border border-amber-500/20 text-stone-200 text-xs focus:outline-none focus:border-amber-400/60 appearance-none cursor-pointer"
            >
              <option value="" className="bg-stone-900">All Status</option>
              <option value="pending_verification" className="bg-stone-900">Under Verification</option>
              <option value="verified" className="bg-stone-900">Confirmed & Verified</option>
              <option value="rejected" className="bg-stone-900">Rejected</option>
            </select>
          </div>

          {/* Pooja Type Filter */}
          <div className="relative">
            <select
              value={poojaFilter}
              onChange={(e) => {
                setPoojaFilter(e.target.value);
                setPage(0);
              }}
              className="px-3 py-1.5 rounded-xl bg-black/60 border border-amber-500/20 text-stone-200 text-xs focus:outline-none focus:border-amber-400/60 appearance-none cursor-pointer"
            >
              <option value="" className="bg-stone-900">All Pooja Rituals</option>
              <option value="Narayan Nagbali" className="bg-stone-900">Narayan Nagbali</option>
              <option value="Tripindi" className="bg-stone-900">Tripindi Shraddha</option>
              <option value="Kaal Sarp" className="bg-stone-900">Kaal Sarp Yog Shanti</option>
              <option value="Kumbh Vivah" className="bg-stone-900">Kumbh Vivah</option>
              <option value="Mahamrityunjaya" className="bg-stone-900">Maha Mrityunjaya Jaap</option>
              <option value="Rudrabhishek" className="bg-stone-900">Rudrabhishek</option>
              <option value="Laghurudra" className="bg-stone-900">Laghurudra & Maharudra</option>
              <option value="Graha Nakshatra" className="bg-stone-900">Graha Nakshatra Shanti</option>
              <option value="Vastu Shanti" className="bg-stone-900">Vastu Shanti Puja</option>
              <option value="Navachandi" className="bg-stone-900">Navachandi Yaag</option>
              <option value="Ganesh Yaag" className="bg-stone-900">Ganesh Yaag</option>
              <option value="Udak Shanti" className="bg-stone-900">Udak Shanti</option>
            </select>
          </div>

          {/* Sort Direction Toggle */}
          <div className="relative">
            <ArrowUpDown className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
            <select
              value={sortDir}
              onChange={(e) => {
                setSortDir(e.target.value as 'asc' | 'desc');
                setPage(0);
              }}
              className="pl-7 pr-3 py-1.5 rounded-xl bg-black/60 border border-amber-500/20 text-stone-200 text-xs focus:outline-none focus:border-amber-400/60 appearance-none cursor-pointer"
            >
              <option value="desc" className="bg-stone-900">Newest First ↓</option>
              <option value="asc" className="bg-stone-900">Oldest First ↑</option>
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
          <span>{error}</span>
        </div>
      )}

      {/* ─── Bookings Cards List ─── */}
      <div className="space-y-3">
        {loading && bookings.length === 0 ? (
          <div className="w-full p-12 text-center rounded-2xl sm:rounded-3xl bg-[#1A0D0A] border border-amber-500/20">
            <Loader2 className="w-8 h-8 mx-auto text-amber-400 animate-spin mb-3" />
            <p className="text-xs text-stone-400">Loading sanctified pooja bookings registry…</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="w-full p-12 text-center rounded-2xl sm:rounded-3xl bg-[#1A0D0A] border border-amber-500/20 space-y-3.5">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-center text-amber-300 shadow-inner">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base sm:text-lg font-bold text-amber-100 font-sanskrit leading-snug">No Bookings Found</h4>
              <p className="text-xs text-stone-400 max-w-md mx-auto leading-relaxed">
                {search || qrStatusFilter || poojaFilter
                  ? 'No bookings match the specified search or filter criteria.'
                  : 'No bookings in the database yet. When devotees book, they will appear here in real time.'}
              </p>
            </div>
            {search || qrStatusFilter || poojaFilter ? (
              <button
                onClick={() => {
                  setInputVal('');
                  setSearch('');
                  setQrStatusFilter('');
                  setPoojaFilter('');
                  setPage(0);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-400/30 text-xs font-semibold hover:bg-amber-500 hover:text-stone-950 transition-colors cursor-pointer"
              >
                Clear Filters
              </button>
            ) : (
              <button
                onClick={onOpenNewBooking}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 font-bold text-xs shadow hover:from-amber-300 hover:to-amber-400 transition-colors cursor-pointer"
              >
                + Register First Booking
              </button>
            )}
          </div>
        ) : (
          bookings.map((b) => {
            const isPending = b.qrStatus === 'pending_verification';
            const isVerified = b.qrStatus === 'verified';
            return (
              <div
                key={b.id}
                className={`p-4 rounded-2xl border transition-all hover:border-amber-400/40 ${isPending
                    ? 'bg-gradient-to-br from-[#1F0E09] to-[#140705] border-amber-500/35'
                    : isVerified
                      ? 'bg-gradient-to-br from-[#0E1A0F] to-[#0A100B] border-emerald-500/30'
                      : 'bg-black/40 border-rose-500/30'
                  }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-stone-100 font-sanskrit">
                        {b.devoteeName}
                      </span>
                      <span className="text-xs text-amber-300">({b.gotra || 'Vedic Gotra'})</span>
                      <span className="text-xs text-stone-400">• {b.city || 'Trimbakeshwar'}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 border border-amber-500/20 text-stone-300">
                        {b.id}
                      </span>
                    </div>

                    <div className="text-xs text-amber-200 font-medium">
                      {b.poojaType} · <span className="text-amber-300/90">{b.date}</span> ({b.time})
                    </div>

                    <div className="text-[11px] text-stone-400 flex items-center gap-2 flex-wrap">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-400" />
                        <span>{b.location}</span>
                      </span>
                      <span>•</span>
                      <span>
                        <a href={`tel:${b.phone}`} className="text-amber-300 hover:underline">
                          {b.phone}
                        </a>
                      </span>
                      {b.email && (
                        <>
                          <span>•</span>
                          <span className="truncate max-w-[200px] text-stone-400">{b.email}</span>
                        </>
                      )}
                    </div>

                    <div className="flex items-center gap-2 pt-0.5 flex-wrap">
                      <span
                        className={`text-[10px] px-2.5 py-0.5 rounded-full border font-medium ${isPending
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/30 flex items-center gap-1'
                            : isVerified
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30 flex items-center gap-1'
                              : 'bg-stone-800 text-stone-300 border-stone-700'
                          }`}
                      >
                        {isPending && <Clock className="w-2.5 h-2.5 animate-pulse" />}
                        {isVerified && <CheckCircle2 className="w-2.5 h-2.5" />}
                        {isPending
                          ? 'Token Under Verification'
                          : isVerified
                            ? '₹1,000 Token Verified'
                            : 'Payment Rejected'}
                      </span>

                      {b.utrNumber && (
                        <span className="text-[10px] text-stone-400 font-mono bg-stone-900/80 px-2 py-0.5 rounded border border-amber-500/15">
                          UTR: {b.utrNumber}
                        </span>
                      )}

                      {b.emailSent && (
                        <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30">
                          <Mail className="w-2.5 h-2.5" />
                          <span>Email Sent</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setSelectedBookingForPass(b)}
                      className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 border border-amber-400/25 text-xs font-semibold flex items-center gap-1 transition-colors"
                      title="View Devotee Pass Details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Pass</span>
                    </button>

                    <button
                      onClick={() => onSelectBookingForQR(b)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${isPending
                          ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 font-bold shadow hover:from-amber-300 hover:to-amber-400'
                          : 'bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700'
                        }`}
                      title={isPending ? 'Verify Devotee Token Receipt' : 'Review QR Verification'}
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>{isPending ? 'Verify Token' : 'Receipt'}</span>
                    </button>

                    <a
                      href={`tel:${b.phone.replace(/\s+/g, '')}`}
                      className="p-2 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-400/30 hover:bg-amber-500 hover:text-stone-950 transition-colors"
                      title="Call Devotee"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 hover:bg-emerald-500 hover:text-stone-950 transition-colors"
                      title="WhatsApp Devotee"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ─── Sticky Server-Side Pagination Bar (20 Records / Page) ─── */}
      {totalElements > 0 && (
        <div className="sticky bottom-0 z-20 mt-auto flex flex-col sm:flex-row items-center justify-between gap-3 p-3 sm:px-4 rounded-2xl bg-[#140805]/95 backdrop-blur-md border border-amber-500/30 shadow-2xl text-xs">
          <div className="text-stone-400 font-mono text-[11px]">
            Showing <span className="text-amber-300 font-bold">{startRecord}</span> to{' '}
            <span className="text-amber-300 font-bold">{endRecord}</span> of{' '}
            <span className="text-stone-200 font-bold">{totalElements}</span> bookings (20 per page)
          </div>

          <div className="flex items-center gap-1.5">
            <PageBtn
              icon={<ChevronsLeft className="w-3.5 h-3.5" />}
              onClick={() => setPage(0)}
              disabled={page === 0 || loading}
              title="First page"
            />
            <PageBtn
              icon={<ChevronLeft className="w-3.5 h-3.5" />}
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 0 || loading}
              title="Previous page"
            />

            {Array.from({ length: Math.min(5, Math.max(1, totalPages)) }, (_, i) => {
              const start = Math.max(0, Math.min(page - 2, Math.max(0, totalPages - 5)));
              const p = start + i;
              if (p >= totalPages) return null;
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  disabled={loading}
                  className={`w-7 h-7 rounded-lg text-xs font-mono transition-colors ${p === page
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
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= totalPages - 1 || loading}
              title="Next page"
            />
            <PageBtn
              icon={<ChevronsRight className="w-3.5 h-3.5" />}
              onClick={() => setPage(Math.max(0, totalPages - 1))}
              disabled={page >= totalPages - 1 || loading}
              title="Last page"
            />
          </div>
        </div>
      )}

      {/* ─── Devotee Booking Pass Modal ─── */}
      {selectedBookingForPass && (
        <BookingPassModal
          booking={selectedBookingForPass}
          onClose={() => setSelectedBookingForPass(null)}
          onVerifyPayment={onSelectBookingForQR}
        />
      )}
    </div>
  );
}

// ─── Main SubmodulePlaceholder Export ─────────────────────────────────────────

export const SubmodulePlaceholder: React.FC<SubmodulePlaceholderProps> = ({
  activeTab,
  onBackToDashboard,
  bookings,
  leads,
  onOpenNewBooking,
  onSelectBookingForQR,
  onLeadContacted,
  onRefreshLeads,
}) => {
  // If activeTab is 'inquiries', render InquiriesModule DIRECTLY!
  if (activeTab === 'inquiries') {
    return <InquiriesModule leads={leads} onLeadContacted={onLeadContacted} />;
  }

  // If activeTab is 'payments', render PaymentsModule DIRECTLY!
  if (activeTab === 'payments') {
    return (
      <PaymentsModule
        bookings={bookings}
        onSelectBookingForQR={onSelectBookingForQR}
        onBackToDashboard={onBackToDashboard}
      />
    );
  }

  // If activeTab is 'bookings', render BookingsModule DIRECTLY with stats, search, sort, filter & pagination!
  if (activeTab === 'bookings') {
    return (
      <BookingsModule
        initialBookings={bookings}
        onSelectBookingForQR={onSelectBookingForQR}
        onOpenNewBooking={onOpenNewBooking}
      />
    );
  }

  // Fallback for remaining submodules (gallery, analytics, settings)
  const config = {
    gallery: {
      title: 'Dynamic Temple Gallery Management',
      titleEn: 'Pooja Darshan & Image Uploader',
      description: 'Upload high-resolution photographs of Kushavarta Kund rituals, Garbhagriha abhishek, and festivals.',
      icon: ImagePlus,
    },
    analytics: {
      title: 'Financial & Seva Reports',
      titleEn: 'Audit, Statistics & Inbound Devotee Trends',
      description: 'Comprehensive financial breakdowns, token ledgers, and ritual distribution analytics.',
      icon: BarChart3,
    },
    settings: {
      title: 'Purohit Profile & System Settings',
      titleEn: 'Hereditary Vatandar Profile & Bank QR Settings',
      description: 'Pt. Pravin Shambhu Deshmukh (Desai) official Purohit certificate, contact channels, and UPI settlement accounts.',
      icon: Settings,
    },
  }[activeTab as Exclude<AdminTab, 'dashboard' | 'inquiries' | 'bookings' | 'payments'>] || {
    title: 'Module',
    titleEn: 'System Module',
    description: '',
    icon: CalendarCheck,
  };

  const Icon = config.icon;

  return (
    <div className="p-8 sm:p-10 text-center rounded-3xl bg-[#1A0D0A] border border-amber-500/20 space-y-4 shadow-xl">
      <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-300">
        <Icon className="w-7 h-7" />
      </div>
      <div>
        <h4 className="text-base sm:text-lg font-bold text-amber-100 font-sanskrit">{config.title}</h4>
        <p className="text-xs text-stone-400 max-w-md mx-auto mt-1 leading-relaxed">
          {config.description}
        </p>
      </div>
    </div>
  );
};

