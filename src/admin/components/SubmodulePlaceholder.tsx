import React from 'react';
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
  ExternalLink,
  UploadCloud,
  TrendingUp,
  ShieldCheck,
  Mail,
  RefreshCw,
  Database,
} from 'lucide-react';

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
  const config = {
    bookings: {
      title: 'Pooja Bookings & Calendar Management',
      titleEn: 'Sanctified Ritual Schedule',
      description: 'Master ledger of all Trimbakeshwar Jyotirlinga pujas, Muhurat times, and devotee registries.',
      icon: CalendarCheck,
      count: `${bookings.length} Total Bookings`,
    },
    inquiries: {
      title: 'Devotee Inquiries & High-Intent Leads',
      titleEn: 'Devotee Consultation CRM',
      description: 'Direct inquiries submitted by devotees on the official Vatandar Purohit portal.',
      icon: MessageSquareQuote,
      count: `${leads.length} Inquiries Received`,
    },
    payments: {
      title: 'Payment & QR Screenshot Verification',
      titleEn: '₹1,000 Advance Token Verification',
      description: 'UPI transaction receipts and screenshot verification for guaranteed pooja slot reservation.',
      icon: QrCode,
      count: `${bookings.filter((b) => b.qrStatus === 'pending_verification').length} Pending Reviews`,
    },
    gallery: {
      title: 'Dynamic Temple Gallery Management',
      titleEn: 'Pooja Darshan & Image Uploader',
      description: 'Upload high-resolution photographs of Kushavarta Kund rituals, Garbhagriha abhishek, and festivals.',
      icon: ImagePlus,
      count: '24 Curated Photos',
    },
    analytics: {
      title: 'Financial & Seva Reports',
      titleEn: 'Audit, Statistics & Inbound Devotee Trends',
      description: 'Comprehensive financial breakdowns, token ledgers, and ritual distribution analytics.',
      icon: BarChart3,
      count: 'September 2026 Audit Ready',
    },
    settings: {
      title: 'Purohit Profile & System Settings',
      titleEn: 'Hereditary Vatandar Profile & Bank QR Settings',
      description: 'Pt. Pravin Shambhu Deshmukh (Desai) official Purohit certificate, contact channels, and UPI settlement accounts.',
      icon: Settings,
      count: '25 Generations Lineage',
    },
  }[activeTab as Exclude<AdminTab, 'dashboard'>] || {
    title: 'Module',
    titleEn: 'System Module',
    description: '',
    icon: CalendarCheck,
    count: '',
  };

  const Icon = config.icon;

  return (
    <div className="space-y-6">
      {/* Navigation Breadcrumb Bar */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onBackToDashboard}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-400/25 text-xs font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Overview Dashboard</span>
        </button>

        {activeTab === 'bookings' && (
          <button
            onClick={onOpenNewBooking}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 font-bold text-xs shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>New Booking</span>
          </button>
        )}
      </div>

      {/* Module Hero Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#24110C] via-[#1A0B07] to-[#120705] border border-amber-500/25 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-400/30 text-amber-300 shrink-0">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] text-amber-300 font-mono">{config.titleEn}</div>
            <h2 className="text-lg sm:text-xl font-bold font-sanskrit text-amber-100">
              {config.title}
            </h2>
            <p className="text-xs text-stone-300 mt-1 max-w-xl">{config.description}</p>
          </div>
        </div>

        <div className="px-3.5 py-1.5 rounded-full bg-black/40 border border-amber-500/20 text-amber-200 text-xs font-mono shrink-0 self-start sm:self-center">
          {config.count}
        </div>
      </div>

      {/* Submodule View for Payments */}
      {activeTab === 'payments' && (
        <div className="rounded-3xl bg-[#1A0D0A] border border-amber-500/20 p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-amber-100 font-sanskrit">
              Advance Token Receipts (₹1,000 Model)
            </h3>
            <span className="text-xs text-stone-400">
              {bookings.filter((b) => b.qrStatus === 'pending_verification').length} Pending Reviews
            </span>
          </div>

          <div className="space-y-3">
            {bookings.map((b) => {
              const isPending = b.qrStatus === 'pending_verification';
              return (
                <div
                  key={b.id}
                  className="p-4 rounded-2xl bg-black/40 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-stone-100">{b.devoteeName}</span>
                      <span className="text-xs text-stone-400">({b.city})</span>
                    </div>
                    <div className="text-xs text-amber-300/90 font-medium mt-0.5">
                      {b.poojaType} • <span className="text-stone-300">{b.date}</span>
                    </div>
                    <div className="text-[11px] text-stone-400 mt-0.5 font-mono">
                      Ref: {b.utrNumber || 'Screenshot Uploaded'} • App: {b.paymentApp}
                    </div>
                  </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border ${
                          isPending
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        }`}
                      >
                        {isPending ? (
                          <>
                            <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                            <span>Action Required</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Verified</span>
                          </>
                        )}
                      </span>

                    <button
                      onClick={() => onSelectBookingForQR(b)}
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 font-bold text-xs shadow hover:from-amber-300"
                    >
                      Review Screenshot
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Submodule View for Bookings */}
      {activeTab === 'bookings' && (
        <div className="rounded-3xl bg-[#1A0D0A] border border-amber-500/20 p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-amber-100 font-sanskrit">
              Complete Pooja Booking Registry
            </h3>
            <span className="text-xs text-stone-400">{bookings.length} Total Registered Slots</span>
          </div>

          <div className="space-y-3">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-2xl bg-black/40 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-stone-100">{b.devoteeName}</span>
                    <span className="text-xs text-amber-300">({b.gotra})</span>
                  </div>
                  <div className="text-xs text-amber-200 mt-0.5 font-medium">
                    {b.poojaType} • {b.date} ({b.time})
                  </div>
                  <div className="text-[11px] text-stone-400 mt-0.5">
                    Location: {b.location} • Phone: {b.phone}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${b.phone.replace(/\s+/g, '')}`}
                    className="p-2 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-400/30 text-xs flex items-center gap-1 hover:bg-amber-500 hover:text-stone-950 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </a>
                  <a
                    href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 text-xs flex items-center gap-1 hover:bg-emerald-500 hover:text-stone-950 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submodule View for Inquiries */}
      {activeTab === 'inquiries' && (
        <div className="rounded-3xl bg-[#1A0D0A] border border-amber-500/20 p-5 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-500/15">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-amber-100 font-sanskrit">
                  Devotee Contact Enquiries & Inquiries
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono flex items-center gap-1">
                  <Database className="w-3 h-3" />
                  <span>Database Connected</span>
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">
                Submissions from the official contact form (http://localhost:3000/#/contact) saved in database
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-amber-300 font-mono px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20">
                {leads.filter((l) => l.status === 'new').length} New • {leads.length} Total
              </span>
              {onRefreshLeads && (
                <button
                  onClick={onRefreshLeads}
                  className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-amber-300 border border-stone-700 transition-colors"
                  title="Refresh from backend database"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="space-y-3.5">
            {leads.length === 0 ? (
              <div className="text-center py-10 text-stone-400 text-xs">
                No contact enquiries received yet. Submissions from /#/contact will appear here automatically.
              </div>
            ) : (
              leads.map((l) => {
                const isNew = l.status === 'new';
                return (
                  <div
                    key={l.id}
                    className="p-4 sm:p-5 rounded-2xl bg-black/45 border border-amber-500/20 hover:border-amber-400/40 transition-colors space-y-3"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-stone-100">{l.name}</span>
                          <span className="text-xs text-stone-400">({l.city || 'Trimbakeshwar'})</span>
                          {l.enquiryNumber && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                              {l.enquiryNumber}
                            </span>
                          )}
                        </div>

                        <div className="text-xs text-amber-300/90 font-medium mt-1">
                          Subject / Ritual: <span className="text-amber-100 font-semibold">{l.poojaRequested}</span>
                          {l.preferredDate && (
                            <span className="text-stone-300 ml-2">
                              • Preferred Muhurat: <span className="text-stone-200">{l.preferredDate}</span>
                            </span>
                          )}
                          {l.preferredContactMethod && (
                            <span className="text-stone-400 ml-2">
                              (Via: <span className="capitalize text-amber-200">{l.preferredContactMethod}</span>)
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full font-medium border ${
                            isNew
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                              : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          }`}
                        >
                          {isNew ? (
                            <>
                              <AlertCircle className="w-3 h-3 text-amber-400" />
                              <span>New Enquiry</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              <span>Contacted</span>
                            </>
                          )}
                        </span>
                        <span className="text-[11px] text-stone-400 font-mono">{l.timeAgo}</span>
                      </div>
                    </div>

                    {/* Devotee Message */}
                    <div className="bg-stone-950/70 p-3 rounded-xl border border-stone-800 text-xs text-stone-200 leading-relaxed">
                      <span className="text-stone-400 font-medium block text-[10px] uppercase tracking-wider mb-1">
                        Devotee Message / Inquiry:
                      </span>
                      "{l.query}"
                    </div>

                    {/* Action Bar with Call, WhatsApp, Email, and Status Toggle */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-stone-800/80">
                      <div className="flex flex-wrap items-center gap-3 text-xs text-stone-300 font-mono">
                        <span className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-amber-400" />
                          <span>{l.phone}</span>
                        </span>
                        {l.email && (
                          <a
                            href={`mailto:${l.email}?subject=Regarding%20your%20inquiry%20at%20Shri%20Kshetra%20Trimbakeshwar`}
                            className="flex items-center gap-1.5 text-stone-400 hover:text-amber-300 transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5 text-amber-400" />
                            <span>{l.email}</span>
                          </a>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {isNew && onLeadContacted && (
                          <button
                            onClick={() => onLeadContacted(l.id)}
                            className="px-2.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium border border-stone-700 transition-colors"
                          >
                            Mark Contacted
                          </button>
                        )}

                        <a
                          href={`tel:${l.phone.replace(/\s+/g, '')}`}
                          onClick={() => onLeadContacted && onLeadContacted(l.id)}
                          className="px-3 py-1.5 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-400/30 text-xs font-semibold flex items-center gap-1.5 hover:bg-amber-500 hover:text-stone-950 transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Call</span>
                        </a>

                        <a
                          href={`https://wa.me/${l.phone.replace(/[^0-9]/g, '')}?text=Jai%20Trimbakeshwar%20${encodeURIComponent(l.name)},%20regarding%20your%20inquiry%20for%20${encodeURIComponent(l.poojaRequested)}.`}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => onLeadContacted && onLeadContacted(l.id)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 text-xs font-semibold flex items-center gap-1.5 hover:bg-emerald-500 hover:text-stone-950 transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Submodule View for Gallery / Analytics / Settings */}
      {(activeTab === 'gallery' || activeTab === 'analytics' || activeTab === 'settings') && (
        <div className="p-8 sm:p-10 text-center rounded-3xl bg-[#1A0D0A] border border-amber-500/20 space-y-4 shadow-xl">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-300">
            <Icon className="w-7 h-7" />
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-bold text-amber-100 font-sanskrit">
              {config.title}
            </h4>
            <p className="text-xs text-stone-400 max-w-md mx-auto mt-1 leading-relaxed">
              This specialized module is provisioned in the core architecture. You can manage {config.titleEn} or return to the main dashboard.
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={onBackToDashboard}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-colors"
            >
              Return to Overview Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
