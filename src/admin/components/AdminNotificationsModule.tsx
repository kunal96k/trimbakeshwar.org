import React, { useState, useMemo, useEffect } from 'react';
import { Booking, DevoteeLead, AdminNotification } from '../types';
import {
  Bell,
  CheckCheck,
  Trash2,
  Search,
  Filter,
  QrCode,
  CalendarCheck,
  MessageSquareQuote,
  Clock,
  ShieldAlert,
  CheckCircle2,
  Eye,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from 'lucide-react';

export interface AdminNotificationsModuleProps {
  bookings: Booking[];
  leads: DevoteeLead[];
  notifications: AdminNotification[];
  onSelectBookingForQR: (booking: Booking) => void;
  onNavigateTab: (tab: any) => void;
  onMarkAllAsRead: () => void;
  onMarkAsRead: (id: string) => void;
  onDeleteNotification: (id: string) => void;
  onClearAllNotifications: () => void;
}

function PageBtn({
  icon,
  onClick,
  disabled,
  title,
}: {
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  title?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className="p-1.5 rounded-lg bg-stone-800 text-stone-300 hover:bg-stone-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
    >
      {icon}
    </button>
  );
}

export const AdminNotificationsModule: React.FC<AdminNotificationsModuleProps> = ({
  bookings,
  leads,
  notifications,
  onSelectBookingForQR,
  onNavigateTab,
  onMarkAllAsRead,
  onMarkAsRead,
  onDeleteNotification,
  onClearAllNotifications,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'payment' | 'booking' | 'inquiry' | 'unread'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const pageSize = 10;

  // Reset page when filter or search changes
  useEffect(() => {
    setPage(0);
  }, [filterType, searchQuery]);

  // ── Calculate Stats from Live Data ─────────────────────────────────────────
  const pendingTokensCount = useMemo(
    () => bookings.filter((b) => b.qrStatus === 'pending_verification').length,
    [bookings]
  );
  const newEnquiriesCount = useMemo(
    () => leads.filter((l) => l.status === 'new').length,
    [leads]
  );
  const verifiedBookingsCount = useMemo(
    () => bookings.filter((b) => b.qrStatus === 'verified').length,
    [bookings]
  );
  const unreadCount = useMemo(
    () => notifications.filter((n) => n.unread).length,
    [notifications]
  );

  // ── Filtered Notifications List ────────────────────────────────────────────
  const filteredNotifications = useMemo(() => {
    return notifications.filter((n) => {
      // Type Filter
      if (filterType === 'unread' && !n.unread) return false;
      if (filterType !== 'all' && filterType !== 'unread' && n.type !== filterType) return false;

      // Search Query
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        n.title.toLowerCase().includes(q) ||
        n.message.toLowerCase().includes(q) ||
        n.id.toLowerCase().includes(q)
      );
    });
  }, [notifications, filterType, searchQuery]);

  // ── Pagination Calculations ────────────────────────────────────────────────
  const totalElements = filteredNotifications.length;
  const totalPages = Math.max(1, Math.ceil(totalElements / pageSize));
  const startRecord = totalElements === 0 ? 0 : page * pageSize + 1;
  const endRecord = Math.min((page + 1) * pageSize, totalElements);
  const paginatedNotifications = useMemo(() => {
    return filteredNotifications.slice(page * pageSize, (page + 1) * pageSize);
  }, [filteredNotifications, page, pageSize]);

  const handleActionClick = (n: AdminNotification) => {
    onMarkAsRead(n.id);

    // Look for matching booking or lead
    if (n.type === 'payment' || n.type === 'booking') {
      const match = bookings.find(
        (b) =>
          (n.id && b.id && (n.id.includes(b.id) || b.id.includes(n.id))) ||
          n.message.includes(b.devoteeName) ||
          (b.utrNumber && n.message.includes(b.utrNumber))
      );
      if (match) {
        if (match.qrStatus === 'pending_verification') {
          onSelectBookingForQR(match);
        } else {
          onNavigateTab('bookings');
        }
        return;
      }
      onNavigateTab('bookings');
    } else if (n.type === 'inquiry') {
      onNavigateTab('inquiries');
    }
  };

  return (
    <div className="space-y-5 pb-24 animate-in fade-in duration-200">
      {/* ─── Top Stats Bar ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1C0E0B] to-[#120705] border border-amber-500/25 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-stone-400 text-xs font-medium">Active Alerts</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-300 shrink-0">
              <Bell className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold font-sanskrit text-amber-100">
            {notifications.length}
          </div>
          <div className="text-[11px] text-stone-400 mt-0.5">
            <span className="text-amber-300 font-semibold">{unreadCount} Unread</span> · Live updates
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#240C08] to-[#140503] border border-rose-500/30 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-stone-400 text-xs font-medium">Token Review Required</span>
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-rose-300 shrink-0">
              <QrCode className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold font-sanskrit text-rose-200">
            {pendingTokensCount}
          </div>
          <div className="text-[11px] text-rose-300/80 mt-0.5">
            Advance ₹1,000 QR screenshots
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0D1924] to-[#070F17] border border-blue-500/30 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-stone-400 text-xs font-medium">New Devotee Enquiries</span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-300 shrink-0">
              <MessageSquareQuote className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold font-sanskrit text-blue-100">
            {newEnquiriesCount}
          </div>
          <div className="text-[11px] text-blue-300/80 mt-0.5">
            Awaiting Purohit call / reply
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0F1D13] to-[#08120B] border border-emerald-500/30 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-stone-400 text-xs font-medium">Confirmed Bookings</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shrink-0">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold font-sanskrit text-emerald-100">
            {verifiedBookingsCount}
          </div>
          <div className="text-[11px] text-emerald-300/80 mt-0.5">
            Verified ritual passes issued
          </div>
        </div>
      </div>

      {/* ─── Control Bar: Filter Pills, Search & Actions ─── */}
      <div className="p-4 rounded-2xl bg-[#1A0D0A] border border-amber-500/20 shadow-xl space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notifications by devotee name, UTR, ritual or query…"
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-black/60 border border-amber-500/25 text-stone-100 placeholder-stone-500 text-xs focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllAsRead}
                className="w-fit inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-400/30 hover:bg-amber-500 hover:text-stone-950 transition-colors text-xs font-semibold cursor-pointer whitespace-nowrap shrink-0"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark All Read</span>
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={onClearAllNotifications}
                className="w-fit inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-800 hover:bg-rose-900/30 text-stone-300 hover:text-rose-300 border border-stone-700 hover:border-rose-500/40 transition-colors text-xs font-semibold cursor-pointer whitespace-nowrap shrink-0"
                title="Clear all alerts"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-amber-500/10">
          <span className="text-[11px] text-stone-400 font-mono mr-1 flex items-center gap-1 shrink-0">
            <Filter className="w-3 h-3 text-amber-400" />
            Filter:
          </span>

          <button
            onClick={() => setFilterType('all')}
            className={`w-fit inline-flex items-center shrink-0 whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
              filterType === 'all'
                ? 'bg-amber-500 text-stone-950 border-amber-400 shadow'
                : 'bg-black/40 text-stone-300 border-amber-500/20 hover:border-amber-400/50'
            }`}
          >
            All Alerts ({notifications.length})
          </button>

          <button
            onClick={() => setFilterType('unread')}
            className={`w-fit inline-flex items-center shrink-0 whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
              filterType === 'unread'
                ? 'bg-amber-500 text-stone-950 border-amber-400 shadow'
                : 'bg-black/40 text-stone-300 border-amber-500/20 hover:border-amber-400/50'
            }`}
          >
            Unread ({unreadCount})
          </button>

          <button
            onClick={() => setFilterType('payment')}
            className={`w-fit inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
              filterType === 'payment'
                ? 'bg-rose-500 text-stone-950 border-rose-400 shadow'
                : 'bg-black/40 text-rose-300 border-rose-500/20 hover:border-rose-400/50'
            }`}
          >
            <QrCode className="w-3 h-3" />
            <span>Tokens & QR ({pendingTokensCount})</span>
          </button>

          <button
            onClick={() => setFilterType('booking')}
            className={`w-fit inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
              filterType === 'booking'
                ? 'bg-amber-500 text-stone-950 border-amber-400 shadow'
                : 'bg-black/40 text-amber-300 border-amber-500/20 hover:border-amber-400/50'
            }`}
          >
            <CalendarCheck className="w-3 h-3" />
            <span>Ritual Bookings ({verifiedBookingsCount})</span>
          </button>

          <button
            onClick={() => setFilterType('inquiry')}
            className={`w-fit inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
              filterType === 'inquiry'
                ? 'bg-blue-500 text-stone-950 border-blue-400 shadow'
                : 'bg-black/40 text-blue-300 border-blue-500/20 hover:border-blue-400/50'
            }`}
          >
            <MessageSquareQuote className="w-3 h-3" />
            <span>Enquiries ({newEnquiriesCount})</span>
          </button>
        </div>
      </div>

      {/* ─── Notifications List ─── */}
      <div className="space-y-3">
        {paginatedNotifications.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#1A0D0A] border border-amber-500/20 space-y-3">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-center text-amber-300">
              <CheckCheck className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-amber-100 font-sanskrit">
              All Caught Up!
            </h4>
            <p className="text-xs text-stone-400 max-w-sm mx-auto">
              {searchQuery
                ? `No notifications matching "${searchQuery}".`
                : 'There are no active notifications in this filter category. Live notifications from devotee bookings and enquiries will appear here automatically.'}
            </p>
          </div>
        ) : (
          paginatedNotifications.map((n) => {
            const isToken = n.type === 'payment';
            const isBooking = n.type === 'booking';
            const isInquiry = n.type === 'inquiry';

            return (
              <div
                key={n.id}
                className={`p-4 rounded-2xl border transition-all shadow-md flex flex-col sm:flex-row items-start justify-between gap-3 ${
                  n.unread
                    ? isToken
                      ? 'bg-gradient-to-r from-[#220B07] to-[#150604] border-rose-500/40 hover:border-rose-400'
                      : isInquiry
                      ? 'bg-gradient-to-r from-[#0C1924] to-[#070F17] border-blue-500/40 hover:border-blue-400'
                      : 'bg-gradient-to-r from-[#201007] to-[#120804] border-amber-500/40 hover:border-amber-400'
                    : 'bg-[#140806] border-stone-800/80 hover:border-amber-500/20 opacity-85'
                }`}
              >
                {/* Left Content */}
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <div
                    className={`p-2.5 rounded-xl border shrink-0 mt-0.5 ${
                      isToken
                        ? 'bg-rose-500/20 border-rose-400/40 text-rose-300'
                        : isBooking
                        ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300'
                        : isInquiry
                        ? 'bg-blue-500/20 border-blue-400/40 text-blue-300'
                        : 'bg-purple-500/20 border-purple-400/40 text-purple-300'
                    }`}
                  >
                    {isToken && <QrCode className="w-4 h-4" />}
                    {isBooking && <CalendarCheck className="w-4 h-4" />}
                    {isInquiry && <MessageSquareQuote className="w-4 h-4" />}
                    {!isToken && !isBooking && !isInquiry && <ShieldAlert className="w-4 h-4" />}
                  </div>

                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-stone-100 font-sanskrit">
                        {n.title}
                      </span>
                      {n.unread && (
                        <span className="w-fit inline-flex items-center shrink-0 whitespace-nowrap text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 font-bold">
                          NEW
                        </span>
                      )}
                      <span
                        className={`w-fit inline-flex items-center gap-1 shrink-0 whitespace-nowrap text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                          isToken
                            ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                            : isBooking
                            ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                            : isInquiry
                            ? 'bg-blue-500/15 text-blue-300 border-blue-500/30'
                            : 'bg-purple-500/15 text-purple-300 border-purple-500/30'
                        }`}
                      >
                        {isToken ? 'Advance Token' : isBooking ? 'Confirmed Booking' : isInquiry ? 'Devotee Enquiry' : 'System Alert'}
                      </span>
                      <span className="text-[11px] text-stone-400 font-mono ml-auto sm:ml-0 flex items-center gap-1 shrink-0 whitespace-nowrap">
                        <Clock className="w-3 h-3 text-stone-500" />
                        {n.time}
                      </span>
                    </div>

                    <p className="text-xs text-stone-300 leading-relaxed">
                      {n.message}
                    </p>
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => handleActionClick(n)}
                    className={`w-fit inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      isToken
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 font-bold shadow hover:from-amber-300 hover:to-amber-400'
                        : isInquiry
                        ? 'bg-blue-500/20 text-blue-200 border border-blue-400/30 hover:bg-blue-500 hover:text-stone-950'
                        : 'bg-stone-800 text-amber-300 border border-amber-400/25 hover:bg-stone-700'
                    }`}
                  >
                    {isToken ? <QrCode className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{isToken ? 'Verify Token' : isBooking ? 'View Bookings' : 'View Enquiry'}</span>
                  </button>

                  <button
                    onClick={() => (n.unread ? onMarkAsRead(n.id) : null)}
                    className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 border border-stone-700 transition-colors cursor-pointer shrink-0"
                    title={n.unread ? 'Mark as read' : 'Read'}
                  >
                    {n.unread ? <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> : <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>

                  <button
                    onClick={() => onDeleteNotification(n.id)}
                    className="p-1.5 rounded-lg bg-stone-800 hover:bg-rose-950/40 text-stone-400 hover:text-rose-300 border border-stone-700 hover:border-rose-500/30 transition-colors cursor-pointer shrink-0"
                    title="Dismiss alert"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ─── Server-Side Style Pagination Bar ({pageSize} Records / Page - Fixed Docked to Bottom & Edges) ─── */}
      {totalElements > 0 && (
        <div className="fixed bottom-14 lg:bottom-0 left-0 lg:left-64 right-0 z-30 flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 py-3 bg-[#120705]/95 backdrop-blur-xl border-t border-amber-500/30 shadow-[0_-8px_25px_rgba(0,0,0,0.7)] text-xs">
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
    </div>
  );
};
