import React from 'react';
import { Booking, DevoteeLead, PanchangInfo } from '../types';
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
  Download,
  ImagePlus,
  Sun,
  ShieldCheck,
  Eye,
  Flame,
} from 'lucide-react';

interface DashboardHomeViewProps {
  bookings: Booking[];
  leads: DevoteeLead[];
  panchang: PanchangInfo;
  searchQuery: string;
  onOpenNewBooking: () => void;
  onSelectBookingForQR: (booking: Booking) => void;
  onNavigateTab: (tab: 'bookings' | 'inquiries' | 'payments' | 'gallery' | 'analytics') => void;
  onLeadContacted: (leadId: string) => void;
  onExportReport: () => void;
}

export const DashboardHomeView: React.FC<DashboardHomeViewProps> = ({
  bookings,
  leads,
  panchang,
  searchQuery,
  onOpenNewBooking,
  onSelectBookingForQR,
  onNavigateTab,
  onLeadContacted,
  onExportReport,
}) => {
  // Live filtered bookings based on global search
  const filteredBookings = bookings.filter((b) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      b.devoteeName.toLowerCase().includes(q) ||
      b.phone.includes(q) ||
      b.poojaType.toLowerCase().includes(q) ||
      b.id.toLowerCase().includes(q) ||
      b.city.toLowerCase().includes(q)
    );
  });

  // Calculate live counts and values
  const totalBookingsCount = bookings.length;
  const pendingQRCount = bookings.filter((b) => b.qrStatus === 'pending_verification').length;
  const newLeadsCount = leads.filter((l) => l.status === 'new').length;
  const totalAdvanceCollected = bookings
    .filter((b) => b.qrStatus === 'verified')
    .reduce((sum, b) => sum + b.advanceAmount, 0);

  // Today's scheduled vidhis
  const todaySchedule = filteredBookings.filter(
    (b) => b.status === 'in_progress' || b.date.includes('29 September')
  );

  // Latest 4 bookings for the QR screenshot verification widget
  const recentBookingsList = filteredBookings.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* 2. LIVE PANCHANG & AUSPICIOUS MUHURAT STRIP */}
      <div className="px-4 py-3 rounded-2xl bg-gradient-to-r from-[#1B0C08] to-[#120705] border border-amber-500/20 text-xs flex flex-col md:flex-row md:items-center justify-between gap-3 text-stone-300 shadow-md">
        <div className="flex items-center gap-2">
          <Sun className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="font-semibold text-amber-100 font-sanskrit text-[13px]">
            Today's Auspicious Muhurat & Timings:
          </span>
          <span className="text-amber-200/90">{panchang.muhurat}</span>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-stone-400">
          <span>Rahu Kaal: <strong className="text-rose-400 font-mono">{panchang.rahukaal}</strong></span>
          <span aria-hidden="true">·</span>
          <span className="text-amber-300/80">{panchang.nakshatra}</span>
        </div>
      </div>

      {/* 3. 4 KEY STAT CARDS (KPIs) strictly matching prompt */}
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
              142 Bookings
            </div>
            <div className="text-[11px] text-stone-400 mt-1 flex items-center justify-between">
              <span className="text-emerald-400 font-medium">+14% this month</span>
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
              4 Devotees
            </div>
            <div className="text-[11px] text-stone-400 mt-1 flex items-center justify-between">
              <span className="text-rose-400 font-medium">Action Required</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Review
              </span>
            </div>
          </div>
        </div>

        {/* KPI 3: Unresolved Inquiries */}
        <div
          onClick={() => onNavigateTab('inquiries')}
          className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#1C1226] to-[#120B1A] border border-indigo-500/25 shadow-lg flex flex-col justify-between hover:border-indigo-400/60 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-stone-300 font-medium">Unresolved Inquiries</span>
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-700 text-white font-bold shadow-sm">
              <MessageSquareQuote className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-blue-200">
              9 Inquiries
            </div>
            <div className="text-[11px] text-stone-400 mt-1 flex items-center justify-between">
              <span className="text-blue-300">Avg response 15 min</span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        </div>

        {/* KPI 4: Advance Tokens Collected */}
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
              ₹54,000
            </div>
            <div className="text-[11px] text-stone-400 mt-1 flex items-center justify-between">
              <span className="text-emerald-400">₹1,000 Token Model</span>
              <span className="text-[10px] text-stone-400 font-mono">54 Rituals</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. QUICK ACTION GRID: New Booking, Verify Payment QR, Upload Gallery Images, Export Monthly Report */}
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
          onClick={onExportReport}
          className="p-3.5 rounded-2xl bg-[#1D0E0A] border border-amber-500/20 hover:border-amber-400/50 hover:bg-amber-500/10 flex items-center gap-3 text-left transition-all active:scale-[0.98]"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold shrink-0 shadow">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-amber-100 font-sanskrit">Export Monthly Report</div>
            <div className="text-[10px] text-stone-400">Financial & Seva Audit</div>
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
                          className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${
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

                    {/* Direct "Call" / "WhatsApp" buttons */}
                    <div className="flex items-center gap-1.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-800">
                      <a
                        href={`tel:${item.phone.replace(/\s+/g, '')}`}
                        className="px-2.5 py-1.5 rounded-xl bg-amber-500/15 text-amber-300 hover:bg-amber-500 hover:text-stone-950 border border-amber-400/30 text-xs font-semibold transition-colors flex items-center gap-1"
                        title="Direct Call Devotee"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call</span>
                      </a>

                      <a
                        href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}?text=Jai%20Trimbakeshwar,%20regarding%20your%20scheduled%20${encodeURIComponent(item.poojaType)}%20with%20Pt.%20Pravin%20Shambhu%20Deshmukh%20(Desai)%20Guruji.`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1.5 rounded-xl bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500 hover:text-stone-950 border border-emerald-400/30 text-xs font-semibold transition-colors flex items-center gap-1"
                        title="Direct WhatsApp Devotee"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
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
                      className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border mb-1.5 font-medium ${
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

      {/* 6. DEVOTEE INQUIRIES & LEADS FEED */}
      <div className="rounded-3xl bg-[#1A0D0A] border border-amber-500/25 p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-xl bg-blue-500/10 text-blue-300 border border-blue-400/20">
              <MessageSquareQuote className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg text-amber-100 font-sanskrit">
                Devotee Inquiries & High-Intent Leads
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
            <span>All ({leads.length}) Inquiries</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {leads.slice(0, 4).map((lead) => (
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
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${lead.status === 'new' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'}`}>
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

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${lead.phone.replace(/\s+/g, '')}`}
                    onClick={() => onLeadContacted(lead.id)}
                    className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[11px] font-semibold flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call</span>
                  </a>

                  <a
                    href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Jai%20Trimbakeshwar%20${encodeURIComponent(lead.name)},%20regarding%20your%20inquiry%20for%20${encodeURIComponent(lead.poojaRequested)}.`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => onLeadContacted(lead.id)}
                    className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-semibold flex items-center gap-1"
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
