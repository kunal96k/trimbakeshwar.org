import React, { useState, useEffect } from 'react';
import { Booking, DevoteeLead, AdminTab } from '../types';
import {
  CalendarCheck,
  QrCode,
  MessageSquareQuote,
  TrendingUp,
  Clock,
  Phone,
  MessageCircle,
  Plus,
  ChevronRight,
  ExternalLink,
  Sparkles,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  ImagePlus,
  ShieldCheck,
  Eye,
  Flame,
} from 'lucide-react';
import { fetchBookingStats, fetchContactEnquiryStats } from '../../services/enquiryService';

interface DashboardHomeViewProps {
  bookings: Booking[];
  leads: DevoteeLead[];
  searchQuery: string;
  onOpenNewBooking: () => void;
  onSelectBookingForQR: (booking: Booking) => void;
  onNavigateTab: (tab: AdminTab) => void;
  onLeadContacted: (leadId: string) => void;
}

export const DashboardHomeView: React.FC<DashboardHomeViewProps> = ({
  bookings,
  leads,
  searchQuery,
  onOpenNewBooking,
  onSelectBookingForQR,
  onNavigateTab,
  onLeadContacted,
}) => {
  // Live aggregate stats synchronized directly with PostgreSQL/Spring Boot database
  const [dbBookingStats, setDbBookingStats] = useState<{
    total: number;
    pendingCount: number;
    verifiedCount: number;
    rejectedCount: number;
    verifiedRevenue: number;
  } | null>(null);

  const [dbEnquiryStats, setDbEnquiryStats] = useState<{
    total: number;
    newCount: number;
    contactedCount: number;
    bookedCount: number;
    closedCount: number;
  } | null>(null);

  const syncDatabaseStats = async () => {
    try {
      const [bStats, eStats] = await Promise.all([
        fetchBookingStats(),
        fetchContactEnquiryStats(),
      ]);
      if (bStats) setDbBookingStats(bStats as any);
      if (eStats) setDbEnquiryStats(eStats as any);
    } catch (err) {
      console.debug('Database stats sync fallback:', err);
    }
  };

  useEffect(() => {
    syncDatabaseStats();
    const handleSync = () => syncDatabaseStats();
    window.addEventListener('trimbak_booking_submitted', handleSync);
    window.addEventListener('trimbak_booking_updated', handleSync);
    window.addEventListener('trimbak_enquiry_submitted', handleSync);
    return () => {
      window.removeEventListener('trimbak_booking_submitted', handleSync);
      window.removeEventListener('trimbak_booking_updated', handleSync);
      window.removeEventListener('trimbak_enquiry_submitted', handleSync);
    };
  }, []);

  // Live filtered bookings based on global search
  const filteredBookings = bookings.filter((b) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const name = String(b.devoteeName || '').toLowerCase();
    const phone = String(b.phone || '');
    const pooja = String(b.poojaType || '').toLowerCase();
    const id = String(b.id || '').toLowerCase();
    const city = String(b.city || '').toLowerCase();
    return (
      name.includes(q) ||
      phone.includes(q) ||
      pooja.includes(q) ||
      id.includes(q) ||
      city.includes(q)
    );
  });

  // Calculate live counts and values (with backend aggregate stats priority)
  const verifiedBookingsLocal = bookings.filter((b) => b.qrStatus === 'verified');
  const localVerifiedRevenue = verifiedBookingsLocal.reduce((sum, b) => sum + (Number(b.advanceAmount) || 1000), 0);
  const localPendingCount = bookings.filter((b) => b.qrStatus === 'pending_verification').length;
  const localNewLeadsCount = leads.filter((l) => l.status === 'new').length;

  const totalBookingsCount = dbBookingStats ? dbBookingStats.total : bookings.length;
  const pendingQRCount = dbBookingStats ? dbBookingStats.pendingCount : localPendingCount;
  const verifiedRitualsCount = dbBookingStats ? dbBookingStats.verifiedCount : verifiedBookingsLocal.length;
  const totalAdvanceCollected = dbBookingStats
    ? (dbBookingStats.verifiedRevenue ?? (dbBookingStats.verifiedCount * 1000))
    : localVerifiedRevenue;
  const totalEnquiriesCount = dbEnquiryStats ? dbEnquiryStats.total : leads.length;
  const newEnquiriesCount = dbEnquiryStats ? dbEnquiryStats.newCount : localNewLeadsCount;

  // Today's scheduled vidhis (or upcoming if none today) - strictly latest 5 records
  const todayStr = new Date().toISOString().slice(0, 10);
  const todayOnly = filteredBookings.filter(
    (b) => b.status === 'in_progress' || (Boolean(b.date) && (String(b.date).includes(todayStr) || String(b.date).toLowerCase().includes('today')))
  );
  const todaySchedule = (todayOnly.length > 0 ? todayOnly : filteredBookings).slice(0, 5);

  // Latest 5 bookings for the QR screenshot verification widget
  const recentBookingsList = filteredBookings.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* 1. 4 KEY STAT CARDS (KPIs) - Live Database Synced */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* KPI 1: Total Pooja Bookings */}
        <div
          onClick={() => onNavigateTab('bookings')}
          className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#24110C] to-[#170906] border border-amber-500/25 shadow-lg flex flex-col justify-between hover:border-amber-400/60 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-stone-300 font-medium">Total Pooja Bookings</span>
            <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-stone-950 font-bold shadow-sm">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-amber-200">
              {totalBookingsCount} {totalBookingsCount === 1 ? 'Booking' : 'Bookings'}
            </div>
            <div className="text-[11px] text-stone-400 mt-1 flex items-center justify-between">
              <span className="text-emerald-400 font-medium">Sacred Kushavarta Ledger</span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        </div>

        {/* KPI 2: Pending QR Verifications */}
        <div
          onClick={() => onNavigateTab('payments')}
          className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#2D120B] to-[#180906] border border-rose-500/30 shadow-lg flex flex-col justify-between hover:border-rose-400/60 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-stone-300 font-medium">Pending QR Verifications</span>
            <div className="p-2 rounded-xl bg-gradient-to-br from-rose-500 to-amber-700 text-white font-bold shadow-sm animate-pulse">
              <QrCode className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-rose-300">
              {pendingQRCount} {pendingQRCount === 1 ? 'Devotee' : 'Devotees'}
            </div>
            <div className="text-[11px] text-stone-400 mt-1 flex items-center justify-between">
              <span className="text-rose-400 font-medium">
                {pendingQRCount > 0 ? 'Action Required' : 'All Clear'}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Review
              </span>
            </div>
          </div>
        </div>

        {/* KPI 3: Total Enquiries */}
        <div
          onClick={() => onNavigateTab('inquiries')}
          className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#1C1226] to-[#120B1A] border border-indigo-500/25 shadow-lg flex flex-col justify-between hover:border-indigo-400/60 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-stone-300 font-medium">Total Enquiries</span>
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-700 text-white font-bold shadow-sm">
              <MessageSquareQuote className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-blue-200">
              {totalEnquiriesCount} {totalEnquiriesCount === 1 ? 'Enquiry' : 'Enquiries'}
            </div>
            <div className="text-[11px] text-stone-400 mt-1 flex items-center justify-between">
              <span className="text-blue-300">{newEnquiriesCount} New · Synced Live</span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        </div>

        {/* KPI 4: Advance Tokens Collected - Live DB Verified Amount */}
        <div
          onClick={() => onNavigateTab('payments')}
          className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#112417] to-[#0A160E] border border-emerald-500/25 shadow-lg flex flex-col justify-between hover:border-emerald-400/60 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-stone-300 font-medium">Advance Tokens Collected</span>
            <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white font-bold shadow-sm">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-emerald-300">
              ₹{totalAdvanceCollected.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-stone-400 mt-1 flex items-center justify-between">
              <span className="text-emerald-400">₹1,000 Token Model</span>
              <span className="text-[10px] text-stone-400 font-mono">
                {verifiedRitualsCount} {verifiedRitualsCount === 1 ? 'Ritual' : 'Rituals'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. QUICK ACTION GRID: New Booking, Verify Payment QR, Upload Gallery Images, Articles & Blogs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={onOpenNewBooking}
          className="p-3.5 rounded-2xl bg-[#1D0E0A] border border-amber-500/20 hover:border-amber-400/50 hover:bg-amber-500/10 flex items-center gap-3 text-left transition-all active:scale-[0.98]"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-stone-950 font-bold shrink-0 shadow">
            <Plus className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-amber-100 font-sanskrit">New Booking</div>
            <div className="text-[10px] text-stone-400">Walk-In / Phone Registration</div>
          </div>
        </button>

        <button
          onClick={() => {
            const pending = bookings.find((b) => b.qrStatus === 'pending_verification');
            if (pending) onSelectBookingForQR(pending);
            else onNavigateTab('payments');
          }}
          className="p-3.5 rounded-2xl bg-[#1D0E0A] border border-amber-500/20 hover:border-amber-400/50 hover:bg-amber-500/10 flex items-center gap-3 text-left transition-all active:scale-[0.98]"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-amber-600 flex items-center justify-center text-white font-bold shrink-0 shadow">
            <QrCode className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-amber-100 font-sanskrit">Verify Payment QR</div>
            <div className="text-[10px] text-rose-300 font-mono">{pendingQRCount} Pending Reviews</div>
          </div>
        </button>

        <button
          onClick={() => onNavigateTab('gallery')}
          className="p-3.5 rounded-2xl bg-[#1D0E0A] border border-amber-500/20 hover:border-amber-400/50 hover:bg-amber-500/10 flex items-center gap-3 text-left transition-all active:scale-[0.98]"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold shrink-0 shadow">
            <ImagePlus className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-amber-100 font-sanskrit">Upload Gallery Images</div>
            <div className="text-[10px] text-stone-400">Ritual Photos & Dharshan</div>
          </div>
        </button>

        <button
          onClick={() => onNavigateTab('articles')}
          className="p-3.5 rounded-2xl bg-[#1D0E0A] border border-amber-500/20 hover:border-amber-400/50 hover:bg-amber-500/10 flex items-center gap-3 text-left transition-all active:scale-[0.98]"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold shrink-0 shadow">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-amber-100 font-sanskrit">Articles & Blogs</div>
            <div className="text-[10px] text-stone-400">Spiritual Literature & SEO</div>
          </div>
        </button>
      </div>

      {/* 5. TWO-COLUMN DASHBOARD GRID: TODAY'S SCHEDULE & RECENT BOOKINGS / QR VERIFICATION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (7 Cols): Today's Scheduled Vidhis Widget */}
        <div className="lg:col-span-7 rounded-3xl bg-[#1A0D0A] border border-amber-500/25 p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-400/20">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-bold text-base sm:text-lg text-amber-100 font-sanskrit">
                  Today's Scheduled Vidhis & Consecrations
                </h2>
                <p className="text-[11px] text-stone-400">
                  Devotee names, Gotra, time slots, and consecration Kund
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('bookings')}
              className="text-xs text-amber-300 hover:text-amber-200 flex items-center gap-1 font-medium"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Timeline Items */}
          <div className="space-y-3">
            {todaySchedule.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-black/30 border border-stone-800 text-stone-400 text-xs">
                No scheduled rituals matching current filter.
              </div>
            ) : (
              todaySchedule.map((item) => {
                const isInProgress = item.status === 'in_progress';
                return (
                  <div
                    key={item.id}
                    className={`p-4 rounded-2xl bg-black/45 border transition-all hover:border-amber-400/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 ${
                      isInProgress ? 'border-emerald-500/40 bg-emerald-950/15' : 'border-amber-500/20'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-stone-100">
                          {item.devoteeName}
                        </span>
                        <span
                          className={`w-fit inline-flex items-center shrink-0 whitespace-nowrap text-[10px] px-2 py-0.5 rounded-full border font-medium ${
                            isInProgress
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                              : 'bg-amber-500/15 text-amber-300 border-amber-400/30'
                          }`}
                        >
                          {item.statusLabel}
                        </span>
                        <span className="text-[11px] text-stone-400 font-medium">
                          ({item.gotra})
                        </span>
                      </div>

                      <div className="text-xs text-amber-300 font-medium flex items-center gap-2">
                        <span>{item.poojaType}</span>
                        <span aria-hidden="true" className="text-stone-600">·</span>
                        <span className="text-stone-300 font-mono">{item.time}</span>
                      </div>

                      <div className="text-[11px] text-stone-400 flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>
                    </div>

                    {/* Direct "Call" / "WhatsApp" logo icons only */}
                    <div className="flex items-center gap-1.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-800">
                      <a
                        href={`tel:${String(item.phone || '').replace(/\s+/g, '')}`}
                        className="p-2 rounded-xl bg-amber-500/15 text-amber-300 hover:bg-amber-500 hover:text-stone-950 border border-amber-400/30 transition-colors flex items-center justify-center shrink-0"
                        title={`Call Devotee: ${item.phone}`}
                        aria-label={`Call Devotee ${item.phone}`}
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>

                      <a
                        href={`https://wa.me/${String(item.phone || '').replace(/[^0-9]/g, '')}?text=Jai%20Trimbakeshwar,%20regarding%20your%20scheduled%20${encodeURIComponent(item.poojaType || 'Puja')}%20with%20Pt.%20Pravin%20Shambhu%20Deshmukh%20(Desai)%20Guruji.`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500 hover:text-stone-950 border border-emerald-400/30 transition-colors flex items-center justify-center shrink-0"
                        title={`WhatsApp Devotee: ${item.phone}`}
                        aria-label={`WhatsApp Devotee ${item.phone}`}
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column (5 Cols): Recent Bookings & QR Screenshot Verification Widget */}
        <div className="lg:col-span-5 rounded-3xl bg-[#1A0D0A] border border-amber-500/25 p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-400/20">
                <QrCode className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-bold text-base sm:text-lg text-amber-100 font-sanskrit">
                  Recent Bookings & QR Verification
                </h2>
                <p className="text-[11px] text-stone-400">
                  ₹1,000 token screenshot review & approval
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('payments')}
              className="text-xs text-amber-300 hover:text-amber-200 flex items-center gap-1 font-medium"
            >
              <span>All ({bookings.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Bookings & QR Status List */}
          <div className="space-y-3">
            {recentBookingsList.map((b) => {
              const isPending = b.qrStatus === 'pending_verification';

              return (
                <div
                  key={b.id}
                  className="p-3.5 rounded-2xl bg-black/45 border border-amber-500/20 flex items-center justify-between gap-3 hover:border-amber-400/40 transition-colors"
                >
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-amber-100 truncate">
                      {b.devoteeName}
                    </div>
                    <div className="text-[11px] text-amber-300/80 truncate">
                      {b.poojaType}
                    </div>
                    <div className="text-[10px] text-stone-400 mt-0.5">
                      {b.date} • <span className="font-mono text-emerald-400">₹{b.advanceAmount} Token</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span
                      className={`w-fit inline-flex items-center gap-1 shrink-0 whitespace-nowrap text-[10px] px-2 py-0.5 rounded-full border mb-1.5 font-medium ${
                        isPending
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      }`}
                    >
                      {isPending ? (
                        <>
                          <AlertTriangle className="w-3 h-3 text-rose-400" />
                          <span>Review Required</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>Token Verified</span>
                        </>
                      )}
                    </span>

                    {/* "Review QR" button opens modal */}
                    <button
                      onClick={() => onSelectBookingForQR(b)}
                      className={`block w-full text-center py-1.5 px-2 rounded-lg font-bold text-[10px] shadow transition-all ${
                        isPending
                          ? 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950'
                          : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
                      }`}
                    >
                      {isPending ? 'Review QR' : 'View'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Vatandar Rule Notice */}
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-400/20 text-[11px] text-amber-200/90 leading-relaxed flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong>Hereditary Token Protocol:</strong> Pooja dates are consecrated and reserved upon verification of the ₹1,000 advance token payment.
            </div>
          </div>
        </div>

      </div>

      {/* 6. DEVOTEE ENQUIRIES & LEADS FEED */}
      <div className="rounded-3xl bg-[#1A0D0A] border border-amber-500/25 p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-xl bg-blue-500/10 text-blue-300 border border-blue-400/20">
              <MessageSquareQuote className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg text-amber-100 font-sanskrit">
                Devotee Enquiries & High-Intent Leads
              </h2>
              <p className="text-[11px] text-stone-400">
                Direct ritual questions and booking requests submitted via official portal
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('inquiries')}
            className="text-xs text-amber-300 hover:text-amber-200 flex items-center gap-1 font-medium"
          >
            <span>All ({totalEnquiriesCount}) Enquiries</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {leads.length === 0 ? (
          <div className="py-10 px-6 rounded-2xl bg-black/30 border border-amber-500/10 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto text-amber-400">
              <MessageSquareQuote className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-100">No Devotee Enquiries Yet</p>
              <p className="text-xs text-stone-400 max-w-md mx-auto mt-1">
                Real enquiries submitted by devotees from the website contact form will appear here automatically and synchronize with the database.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {leads.slice(0, 5).map((lead) => (
              <div
                key={lead.id}
                className="p-4 rounded-2xl bg-black/45 border border-amber-500/15 hover:border-amber-400/40 transition-colors space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-sm text-stone-100">{lead.name}</span>
                      {lead.enquiryNumber && (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                          {lead.enquiryNumber}
                        </span>
                      )}
                      {lead.isDatabaseSaved && (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          DB Saved
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-amber-300/90 font-medium">
                      {lead.city} • <span className="text-stone-300">{lead.poojaRequested}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`w-fit inline-flex items-center shrink-0 whitespace-nowrap text-[10px] font-mono px-2 py-0.5 rounded-full border ${lead.status === 'new' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'}`}>
                      {lead.status === 'new' ? 'New' : 'Contacted'}
                    </span>
                    <div className="text-[10px] text-stone-400 font-mono mt-1">{lead.timeAgo}</div>
                  </div>
                </div>

                <p className="text-xs text-stone-300/90 bg-stone-900/60 p-2.5 rounded-xl border border-stone-800 italic leading-relaxed">
                  "{lead.query}"
                </p>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-stone-400 font-mono">
                    {lead.phone}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <a
                      href={`tel:${String(lead.phone || '').replace(/\s+/g, '')}`}
                      onClick={() => onLeadContacted(lead.id)}
                      className="p-2 rounded-xl bg-amber-500/15 hover:bg-amber-500 text-amber-300 hover:text-stone-950 border border-amber-400/30 transition-colors flex items-center justify-center shrink-0"
                      title={`Call Devotee: ${lead.phone}`}
                      aria-label={`Call Devotee ${lead.phone}`}
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href={`https://wa.me/${String(lead.phone || '').replace(/[^0-9]/g, '')}?text=Jai%20Trimbakeshwar%20${encodeURIComponent(lead.name || '')},%20regarding%20your%20enquiry%20for%20${encodeURIComponent(lead.poojaRequested || 'Puja')}.`}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => onLeadContacted(lead.id)}
                      className="p-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500 text-emerald-300 hover:text-stone-950 border border-emerald-400/30 transition-colors flex items-center justify-center shrink-0"
                      title={`WhatsApp Devotee: ${lead.phone}`}
                      aria-label={`WhatsApp Devotee ${lead.phone}`}
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
