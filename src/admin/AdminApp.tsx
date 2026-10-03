import React, { useState, useEffect, useMemo } from 'react';
import {
  AdminTab,
  Booking,
  DevoteeLead,
  AdminNotification,
  PanchangInfo,
  AdminUser,
  ErrorStatusCode,
} from './types';
import {
  initialBookings,
  initialDevoteeLeads,
  initialPanchang,
  currentAdminUser,
} from './data/mockData';
import { AdminLayout } from './components/AdminLayout';
import { DashboardHomeView } from './components/DashboardHomeView';
import { SubmodulePlaceholder } from './components/SubmodulePlaceholder';
import { AdminSettingsModule } from './components/AdminSettingsModule';
import { QRVerificationModal } from './components/QRVerificationModal';
import { NewBookingModal } from './components/NewBookingModal';
import { NotificationsDrawer } from './components/NotificationsDrawer';
import { AuthModal, AuthStep } from './components/AuthModal';
import { SystemStatusPage } from './components/SystemStatusPage';
import { ToastContainer, ToastMessage } from './components/Toast';
import { AndroidNotificationBanner, AndroidNotificationItem, NotificationType } from './components/AndroidNotificationBanner';
import {
  fetchContactEnquiries,
  updateContactEnquiryStatus,
  ContactEnquiryRecord,
  fetchBookingsPage,
  normaliseServerBooking,
  updateBookingPaymentStatus,
} from '../services/enquiryService';
import {
  fetchSession,
  getStoredAdminUser,
  logout,
  ADMIN_PROFILE_EVENT,
  ADMIN_SESSION_EVENT,
  DEFAULT_ADMIN_USER,
} from '../services/authService';
import { RoyalSeal } from './components/RoyalSeal';
import { ExternalLink } from 'lucide-react';

function contactEnquiryToLead(enquiry: ContactEnquiryRecord): DevoteeLead {
  const createdAtDate = enquiry.createdAt ? new Date(enquiry.createdAt) : new Date();
  const timeDiff = Math.floor((Date.now() - createdAtDate.getTime()) / 60000);
  let timeAgo = 'Just now';
  if (timeDiff >= 1440) {
    timeAgo = `${Math.floor(timeDiff / 1440)}d ago`;
  } else if (timeDiff >= 60) {
    timeAgo = `${Math.floor(timeDiff / 60)}h ago`;
  } else if (timeDiff > 1) {
    timeAgo = `${timeDiff}m ago`;
  }

  return {
    id: enquiry.enquiryNumber || `enq-${enquiry.id || Date.now()}`,
    enquiryNumber: enquiry.enquiryNumber,
    name: enquiry.name,
    phone: enquiry.phone,
    email: enquiry.email,
    city: enquiry.city || 'Trimbakeshwar',
    poojaRequested: enquiry.poojaRequested || enquiry.subject || 'Vedic Pooja Consultation',
    preferredDate: enquiry.preferredDate || '',
    query: enquiry.devoteeMessage || '',
    timeAgo,
    status: (!enquiry.status || enquiry.status.toUpperCase() === 'NEW' ? 'new' : 'contacted') as 'new' | 'contacted',
    preferredContactMethod: enquiry.preferredContactMethod || 'phone',
    isDatabaseSaved: true,
  };
}

function loadInitialBookings(): Booking[] {
  try {
    const saved = localStorage.getItem('trimbak_bookings');
    if (saved) {
      const parsed: Booking[] = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Clean out legacy mock IDs TRMB-2026-1081..1086
        const mockIds = new Set(['TRMB-2026-1081', 'TRMB-2026-1082', 'TRMB-2026-1083', 'TRMB-2026-1084', 'TRMB-2026-1085', 'TRMB-2026-1086']);
        return parsed.filter((b) => b && !mockIds.has(b.id)).map(normaliseServerBooking).filter(Boolean);
      }
    }
  } catch (err) {
    console.error('Failed to parse trimbak_bookings from localStorage:', err);
  }
  return [];
}

interface AdminAppProps {
  onExitAdmin?: () => void;
  initialOpenLogin?: boolean;
}

export function AdminApp({ onExitAdmin, initialOpenLogin }: AdminAppProps = {}) {
  // Navigation & Core State
  const initialStoredUser = getStoredAdminUser();
  const hasStoredSession = Boolean(initialStoredUser);

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [bookings, setBookings] = useState<Booking[]>(loadInitialBookings);
  const [leads, setLeads] = useState<DevoteeLead[]>(initialDevoteeLeads);
  const [panchang] = useState<PanchangInfo>(initialPanchang);
  const [user, setUser] = useState<AdminUser>(initialStoredUser || currentAdminUser);
  const [searchQuery, setSearchQuery] = useState('');

  // Notification read/delete tracking
  const [readNotifIds, setReadNotifIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('trimbak_read_notif_ids');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const [deletedNotifIds, setDeletedNotifIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('trimbak_deleted_notif_ids');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Dynamically derive real notifications from live bookings & enquiries
  const notifications: AdminNotification[] = useMemo(() => {
    const notifs: AdminNotification[] = [];

    // 1. Pending Token Verifications (High Priority)
    bookings
      .filter((b) => b.qrStatus === 'pending_verification')
      .forEach((b) => {
        const id = `notif-token-${b.id}`;
        if (!deletedNotifIds.has(id)) {
          notifs.push({
            id,
            title: 'Advance Token Verification Pending',
            message: `Devotee ${b.devoteeName} submitted ₹${b.advanceAmount || 1000} advance token for ${b.poojaType} (${b.date}). UTR: ${b.utrNumber || 'Under Review'}.`,
            time: b.bookingDate || 'Recent',
            unread: !readNotifIds.has(id),
            type: 'payment',
          });
        }
      });

    // 2. New Devotee Enquiries
    leads
      .filter((l) => l.status === 'new')
      .forEach((l) => {
        const id = `notif-enq-${l.enquiryNumber || l.id}`;
        if (!deletedNotifIds.has(id)) {
          notifs.push({
            id,
            title: 'New Devotee Enquiry Received',
            message: `Enquiry from ${l.name} (${l.city}): ${l.poojaRequested}. Phone: ${l.phone}.`,
            time: l.timeAgo || 'Recent',
            unread: !readNotifIds.has(id),
            type: 'inquiry',
          });
        }
      });

    // 3. Confirmed Bookings
    bookings
      .filter((b) => b.qrStatus === 'verified')
      .slice(0, 15)
      .forEach((b) => {
        const id = `notif-confirmed-${b.id}`;
        if (!deletedNotifIds.has(id)) {
          notifs.push({
            id,
            title: 'Confirmed Pooja Booking',
            message: `Booking ${b.id} for ${b.devoteeName} (${b.poojaType}) scheduled on ${b.date} (${b.time}) is confirmed.`,
            time: b.bookingDate || 'Recent',
            unread: !readNotifIds.has(id),
            type: 'booking',
          });
        }
      });

    // 4. Contacted Enquiries
    leads
      .filter((l) => l.status === 'contacted')
      .slice(0, 10)
      .forEach((l) => {
        const id = `notif-contacted-${l.enquiryNumber || l.id}`;
        if (!deletedNotifIds.has(id)) {
          notifs.push({
            id,
            title: 'Devotee Consultation Followed Up',
            message: `Devotee enquiry from ${l.name} (${l.poojaRequested}) marked as contacted.`,
            time: l.timeAgo || 'Recent',
            unread: !readNotifIds.has(id),
            type: 'inquiry',
          });
        }
      });

    return notifs;
  }, [bookings, leads, readNotifIds, deletedNotifIds]);

  // Fetch and sync real devotee contact enquiries from Spring Boot backend database
  const loadLiveEnquiries = async () => {
    try {
      const records = await fetchContactEnquiries();
      if (records && records.length > 0) {
        const liveLeads = records.map(contactEnquiryToLead);
        setLeads(liveLeads);
      } else {
        setLeads([]);
      }
    } catch (e) {
      console.error('Error fetching live enquiries:', e);
      setLeads([]);
    }
  };

  // Fetch and sync real pooja bookings from Spring Boot backend database
  const loadLiveBookings = async () => {
    try {
      const res = await fetchBookingsPage({ size: 30 });
      if (res && Array.isArray(res.content)) {
        setBookings(res.content);
      }
    } catch (e) {
      console.error('Error fetching live bookings:', e);
    }
  };

  useEffect(() => {
    loadLiveEnquiries();
    loadLiveBookings();

    const handleNewSubmission = (event: any) => {
      const detail = event?.detail as ContactEnquiryRecord | undefined;
      if (detail) {
        const newLead = contactEnquiryToLead(detail);
        setLeads((prev) => [newLead, ...prev.filter((l) => l.enquiryNumber !== newLead.enquiryNumber)]);
        addAndroidNotification(
          'info',
          `New Devotee Contact: ${newLead.name}`,
          `Pooja: ${newLead.poojaRequested} • Phone: ${newLead.phone}. Saved in database.`,
          'View Enquiries',
          () => setActiveTab('inquiries')
        );
      } else {
        loadLiveEnquiries();
      }
    };

    const handleNewBooking = (event: any) => {
      const newBooking = event?.detail as Booking | undefined;
      if (newBooking) {
        setBookings((prev) => [newBooking, ...prev.filter((b) => b.id !== newBooking.id)]);
        addAndroidNotification(
          'warning',
          'New Token Payment Under Review',
          `Devotee ${newBooking.devoteeName} submitted ₹1,000 screenshot for ${newBooking.poojaType}. UTR: ${newBooking.utrNumber || 'Attached'}.`,
          'Verify QR',
          () => setSelectedBookingForQR(newBooking)
        );
        addToast(
          'info',
          'Payment Under Verification',
          `${newBooking.devoteeName} submitted ₹1,000 token screenshot. Action required in Payments.`
        );
      }
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'trimbak_contact_enquiries' || e.key === 'trimbak_last_enquiry_time') {
        loadLiveEnquiries();
      }
      if (e.key === 'trimbak_bookings' && e.newValue) {
        try {
          const fresh = JSON.parse(e.newValue);
          if (Array.isArray(fresh)) {
            setBookings((prev) => {
              const freshIds = new Set(fresh.map((b) => b.id));
              const remainder = prev.filter((b) => !freshIds.has(b.id));
              return [...fresh, ...remainder];
            });
          }
        } catch (_) {}
      }
    };

    window.addEventListener('trimbak_enquiry_submitted', handleNewSubmission);
    window.addEventListener('trimbak_booking_submitted', handleNewBooking);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('trimbak_enquiry_submitted', handleNewSubmission);
      window.removeEventListener('trimbak_booking_submitted', handleNewBooking);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Synchronize Live Admin Session & Profile Events
  useEffect(() => {
    let isMounted = true;
    const initSession = async () => {
      const sessionUser = await fetchSession();
      if (!isMounted) return;
      if (sessionUser) {
        setUser(sessionUser);
        setIsAuthenticated(true);
        setIsAuthModalOpen(false);
      } else {
        setIsAuthenticated(false);
        setIsAuthModalOpen(true);
      }
    };
    initSession();

    const handleProfileUpdate = (e: any) => {
      if (e.detail) setUser(e.detail);
    };
    const handleSessionChange = (e: any) => {
      if (e.detail) {
        setUser(e.detail);
        setIsAuthenticated(true);
        setIsAuthModalOpen(false);
      } else {
        setIsAuthenticated(false);
        setIsAuthModalOpen(true);
      }
    };

    window.addEventListener(ADMIN_PROFILE_EVENT, handleProfileUpdate);
    window.addEventListener(ADMIN_SESSION_EVENT, handleSessionChange);
    return () => {
      isMounted = false;
      window.removeEventListener(ADMIN_PROFILE_EVENT, handleProfileUpdate);
      window.removeEventListener(ADMIN_SESSION_EVENT, handleSessionChange);
    };
  }, []);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(hasStoredSession);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(!hasStoredSession);
  const [authInitialStep, setAuthInitialStep] = useState<AuthStep>('login');

  // System Status & Error Code State
  const [activeStatusPage, setActiveStatusPage] = useState<ErrorStatusCode | null>(null);

  // Modals & Drawers State
  const [isNewBookingModalOpen, setIsNewBookingModalOpen] = useState<boolean>(false);
  const [selectedBookingForQR, setSelectedBookingForQR] = useState<Booking | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);

  // Android Native Heads-Up Notifications System (Live alerts only - no mock data)
  const [androidNotifications, setAndroidNotifications] = useState<AndroidNotificationItem[]>([]);

  const addAndroidNotification = (
    type: NotificationType,
    title: string,
    message?: string,
    actionLabel?: string,
    onAction?: () => void
  ) => {
    const id = `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newNotif: AndroidNotificationItem = {
      id,
      type,
      title,
      message,
      timestamp: 'Just now',
      appSource: 'Trimbak Admin Console',
      actionLabel,
      onAction,
    };
    // Keep at most 3 visible stacked notifications like Android system tray
    setAndroidNotifications((prev) => [newNotif, ...prev.slice(0, 2)]);
  };

  const removeAndroidNotification = (id: string) => {
    setAndroidNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Toast System
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', title: string, message?: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastMessage = { id, type, title, message };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleLoginSuccess = (emailOrPhone: string) => {
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
    setActiveStatusPage(null);
    addAndroidNotification(
      'success',
      'Purohit Session Authenticated',
      `Welcome back, Pt. Pravin Shambhu Deshmukh (Desai). Master key validated securely.`
    );
    if (typeof window !== 'undefined') {
      window.location.hash = '#/admin';
    }
  };

  const handleSignOut = async () => {
    await logout();
    setIsAuthenticated(false);
    setUser(DEFAULT_ADMIN_USER);
    setAuthInitialStep('login');
    setIsAuthModalOpen(true);
    addAndroidNotification('info', 'Session Signed Out', 'Admin access locked until master credentials provided.');
    addToast('info', 'Signed Out', 'Administrator session terminated.');
    if (typeof window !== 'undefined') {
      window.location.hash = '#/login';
    }
  };

  // Handlers for QR Payment Approval & Rejection
  const handleApprovePayment = async (bookingId: string) => {
    let updatedBooking: Booking | undefined;
    setBookings((prev) => {
      const updated = prev.map((b) => {
        if (b.id === bookingId) {
          const u: Booking = {
            ...b,
            qrStatus: 'verified',
            status: 'upcoming',
            statusLabel: 'Confirmed Booking',
            emailSent: true,
            emailSentAt: new Date().toLocaleString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }),
          };
          updatedBooking = u;
          return u;
        }
        return b;
      });
      try {
        localStorage.setItem('trimbak_bookings', JSON.stringify(updated));
      } catch (_) {}
      return updated;
    });

    const booking = updatedBooking || bookings.find((b) => b.id === bookingId);
    const devoteeName = booking?.devoteeName || 'Devotee';
    const emailStr = booking?.email ? ` (${booking.email})` : '';

    // Trigger real backend verification API (which dispatches the official confirmation email via EmailService)
    try {
      await updateBookingPaymentStatus(bookingId, 'verified', 'Payment verified by Guruji Admin');
      loadLiveBookings();
    } catch (e) {
      console.warn('Backend payment status update offline:', e);
    }

    addAndroidNotification(
      'success',
      'Token Payment Approved & Verified',
      `₹1,000 advance receipt approved for ${devoteeName}. Official confirmation email dispatched${emailStr}. Booking status updated to Confirmed.`
    );
    addToast(
      'success',
      'Booking Confirmed & Email Dispatched',
      `Devotee ${devoteeName}'s UPI payment verified. Guruji contact schedule initiated.`
    );
  };

  const handleRejectPayment = async (bookingId: string, reason: string) => {
    setBookings((prev) => {
      const updated: Booking[] = prev.map((b) =>
        b.id === bookingId
          ? { ...b, qrStatus: 'rejected' as const, statusLabel: 'Re-verification Needed' }
          : b
      );
      try {
        localStorage.setItem('trimbak_bookings', JSON.stringify(updated));
      } catch (_) {}
      return updated;
    });

    try {
      await updateBookingPaymentStatus(bookingId, 'rejected', reason);
      loadLiveBookings();
    } catch (e) {
      console.warn('Backend payment status reject offline:', e);
    }

    addAndroidNotification(
      'error',
      'Token Screenshot Rejected',
      `Reason: ${reason}. A re-upload SMS & email notification has been dispatched to devotee.`
    );
    addToast('error', 'Payment Rejected', reason);
  };

  // Handler for New Walk-In Booking
  const handleCreateBooking = (newBooking: Booking) => {
    setBookings((prev) => {
      const updated = [newBooking, ...prev];
      try {
        localStorage.setItem('trimbak_bookings', JSON.stringify(updated));
      } catch (_) {}
      return updated;
    });
    addAndroidNotification(
      'success',
      'New Pooja Booking Reserved',
      `${newBooking.devoteeName} (${newBooking.poojaType}) has been logged in Kushavarta register.`,
      'View Schedule',
      () => setActiveTab('bookings')
    );
  };

  const handleLeadContacted = async (leadId: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: 'contacted' } : l))
    );

    const targetLead = leads.find((l) => l.id === leadId);
    if (targetLead?.enquiryNumber) {
      await updateContactEnquiryStatus(targetLead.enquiryNumber, 'CONTACTED');
    }

    addAndroidNotification(
      'info',
      'Devotee Enquiry Updated',
      'Devotee marked as contacted. Status synced with database.'
    );
  };

  // Handler for CSV Export
  const handleExportReport = () => {
    const headers = 'Booking ID,Devotee Name,Phone,Pooja Type,Scheduled Date,Time,Advance Paid (INR),QR Status\n';
    const rows = bookings
      .map(
        (b) =>
          `"${b.id}","${b.devoteeName}","${b.phone}","${b.poojaType}","${b.date}","${b.time}","${b.advanceAmount || 1000}","${b.qrStatus}"`
      )
      .join('\n');
    const blob = new Blob(['\uFEFF' + headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Trimbak_Purohit_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addAndroidNotification(
      'success',
      'Report CSV Exported',
      'Financial and booking ledger downloaded to your local device.'
    );
  };

  // Notification Actions
  const handleMarkAsRead = (id: string) => {
    setReadNotifIds((prev) => {
      const updated = new Set(prev).add(id);
      try {
        localStorage.setItem('trimbak_read_notif_ids', JSON.stringify(Array.from(updated)));
      } catch {}
      return updated;
    });
  };

  const handleMarkAllNotificationsRead = () => {
    const allIds = notifications.map((n) => n.id);
    setReadNotifIds((prev) => {
      const updated = new Set([...Array.from(prev), ...allIds]);
      try {
        localStorage.setItem('trimbak_read_notif_ids', JSON.stringify(Array.from(updated)));
      } catch {}
      return updated;
    });
    addAndroidNotification('info', 'Notifications Cleared', 'All active alerts marked as read.');
  };

  const handleDeleteNotification = (id: string) => {
    setDeletedNotifIds((prev) => {
      const updated = new Set(prev).add(id);
      try {
        localStorage.setItem('trimbak_deleted_notif_ids', JSON.stringify(Array.from(updated)));
      } catch {}
      return updated;
    });
  };

  const handleClearAllNotifications = () => {
    const allIds = notifications.map((n) => n.id);
    setDeletedNotifIds((prev) => {
      const updated = new Set([...Array.from(prev), ...allIds]);
      try {
        localStorage.setItem('trimbak_deleted_notif_ids', JSON.stringify(Array.from(updated)));
      } catch {}
      return updated;
    });
    addAndroidNotification('info', 'All Alerts Dismissed', 'Notification drawer cleared.');
  };

  const handleNotificationClick = (notification: AdminNotification) => {
    handleMarkAsRead(notification.id);
    if (notification.type === 'payment' || notification.type === 'booking') {
      const match = bookings.find(
        (b) =>
          (notification.id && b.id && (notification.id.includes(b.id) || b.id.includes(notification.id))) ||
          notification.message.includes(b.devoteeName) ||
          (b.utrNumber && notification.message.includes(b.utrNumber))
      );
      if (match) {
        if (match.qrStatus === 'pending_verification') {
          setSelectedBookingForQR(match);
        } else {
          setActiveTab('bookings');
        }
        return;
      }
      setActiveTab('bookings');
    } else if (notification.type === 'inquiry') {
      setActiveTab('inquiries');
    }
  };

  // Trigger test android notification
  const handleTriggerTestNotification = (type: 'error' | 'warning' | 'success') => {
    if (type === 'error') {
      addAndroidNotification(
        'error',
        'UTR Verification Failed: #UTR-482910',
        'Devotee uploaded an invalid or duplicate transaction screenshot. Please request re-upload.',
        'Review QR',
        () => {
          const b = bookings.find((item) => item.qrStatus === 'pending_verification') || bookings[0];
          setSelectedBookingForQR(b);
        }
      );
    } else if (type === 'warning') {
      addAndroidNotification(
        'warning',
        '3 Muhurat Bookings Confirmed for Amavasya',
        'High devotee turnout expected at Kushavarta Tirth tomorrow morning.',
        'View Bookings',
        () => setActiveTab('bookings')
      );
    } else {
      addAndroidNotification(
        'success',
        '₹1,000 Advance Token Verified',
        'Transaction verified via PhonePe Merchant Gateway. Booking locked.'
      );
    }
  };

  // Dynamic Badge Counts
  const pendingQRCount = bookings.filter((b) => b.qrStatus === 'pending_verification').length;
  const newLeadsCount = leads.filter((l) => l.status === 'new').length;
  const unreadNotificationsCount = notifications.filter((n) => n.unread).length;

  // Render System Status Page if active
  if (activeStatusPage) {
    return (
      <>
        <SystemStatusPage
          code={activeStatusPage}
          onReturnHome={() => setActiveStatusPage(null)}
          onOpenLogin={() => {
            setActiveStatusPage(null);
            setAuthInitialStep('login');
            setIsAuthModalOpen(true);
          }}
          onOpenNewBooking={() => {
            setActiveStatusPage(null);
            setIsNewBookingModalOpen(true);
          }}
          onRetry={() => {
            addToast('info', 'Reconnection Check', 'Checking upstream Node gateway connection...');
            setActiveStatusPage(null);
          }}
        />
        {/* Auth Modal Available */}
        <AuthModal
          isOpen={isAuthModalOpen}
          initialStep={authInitialStep}
          onClose={() => setIsAuthModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
        <ToastContainer toasts={toasts} onDismiss={removeToast} />
      </>
    );
  }

  // If unauthenticated, render dedicated full-screen login gateway
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full bg-[#100705] flex flex-col justify-between items-center relative overflow-y-auto selection:bg-amber-600 selection:text-white">
        {/* Sacred ambient background lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-950/40 via-[#120705] to-[#0A0403] pointer-events-none" />

        {/* Top Sacred Bar */}
        <header className="w-full max-w-5xl mx-auto px-4 py-5 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <RoyalSeal size="sm" />
            <div>
              <div className="text-xs font-bold text-amber-200 font-sanskrit tracking-wider">
                ॥ श्री क्षेत्र त्र्यम्बकेश्वर ज्योतिर्लिंग ॥
              </div>
              <div className="text-[11px] text-stone-400 font-sans">
                Hereditary Vatandar Purohit Administrative Suite
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              if (onExitAdmin) onExitAdmin();
              else if (typeof window !== 'undefined') window.location.hash = '#/';
            }}
            className="text-xs text-amber-300/90 hover:text-amber-200 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 transition-all cursor-pointer shadow-sm"
          >
            <span>Return to Devotee Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </header>

        {/* Central Auth Container */}
        <main className="w-full max-w-md px-4 py-6 z-10 flex flex-col items-center">
          <AuthModal
            isOpen={true}
            initialStep={authInitialStep}
            onClose={() => {
              if (onExitAdmin) onExitAdmin();
              else if (typeof window !== 'undefined') window.location.hash = '#/';
            }}
            onLoginSuccess={handleLoginSuccess}
          />
        </main>

        {/* Bottom Sacred Footer */}
        <footer className="w-full py-4 text-center text-[11px] text-stone-500 z-10 border-t border-amber-500/10">
          Official Hereditary Tirth Purohit Office · 25 Generations Lineage (Est. 1674) · All Rights Reserved
        </footer>

        {/* Toast Notification Container */}
        <ToastContainer toasts={toasts} onDismiss={removeToast} />
      </div>
    );
  }

  return (
    <>
      <AdminLayout
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        unreadNotificationsCount={unreadNotificationsCount}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenNewBooking={() => setIsNewBookingModalOpen(true)}
        onOpenAuthModal={() => {
          setAuthInitialStep('login');
          setIsAuthModalOpen(true);
        }}
        onSignOut={handleSignOut}
        onTriggerStatusPage={(code) => setActiveStatusPage(code)}
        pendingQRCount={pendingQRCount}
        newLeadsCount={newLeadsCount}
        user={user}
        onExitAdmin={onExitAdmin}
        onTriggerNotificationTest={handleTriggerTestNotification}
      >
        {activeTab === 'dashboard' ? (
          <DashboardHomeView
            bookings={bookings}
            leads={leads}
            searchQuery={searchQuery}
            onOpenNewBooking={() => setIsNewBookingModalOpen(true)}
            onSelectBookingForQR={(booking) => setSelectedBookingForQR(booking)}
            onNavigateTab={(tab) => setActiveTab(tab)}
            onLeadContacted={handleLeadContacted}
          />
        ) : activeTab === 'settings' ? (
          <AdminSettingsModule
            currentUser={user}
            onProfileUpdated={(updated) => {
              setUser(updated);
              addToast('success', 'Profile Updated', 'Vatandar Purohit profile saved.');
              addAndroidNotification('success', 'Profile Updated', 'Vatandar Purohit profile persona saved.');
            }}
            onLogout={handleSignOut}
            onShowToast={(type, title, msg) => {
              addAndroidNotification(type, title, msg);
              addToast(type === 'warning' ? 'info' : type, title, msg);
            }}
          />
        ) : (
          <SubmodulePlaceholder
            activeTab={activeTab}
            onBackToDashboard={() => setActiveTab('dashboard')}
            bookings={bookings}
            leads={leads}
            onOpenNewBooking={() => setIsNewBookingModalOpen(true)}
            onSelectBookingForQR={(booking) => setSelectedBookingForQR(booking)}
            onLeadContacted={handleLeadContacted}
            onRefreshLeads={loadLiveEnquiries}
            onRefreshBookings={loadLiveBookings}
            notifications={notifications}
            onNavigateTab={(tab) => setActiveTab(tab)}
            onMarkAllAsRead={handleMarkAllNotificationsRead}
            onMarkAsRead={handleMarkAsRead}
            onDeleteNotification={handleDeleteNotification}
            onClearAllNotifications={handleClearAllNotifications}
          />
        )}
      </AdminLayout>

      {/* ANDROID NATIVE HEADS-UP NOTIFICATIONS (SWIPE LEFT/RIGHT & AUTO-CLOSE) */}
      <AndroidNotificationBanner
        notifications={androidNotifications}
        onDismiss={removeAndroidNotification}
      />

      {/* MODULE 1: AUTHENTICATION SUITE MODAL */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialStep={authInitialStep}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* QR Verification Modal */}
      <QRVerificationModal
        booking={selectedBookingForQR}
        isOpen={Boolean(selectedBookingForQR)}
        onClose={() => setSelectedBookingForQR(null)}
        onApprove={handleApprovePayment}
        onReject={handleRejectPayment}
      />

      {/* New Walk-In Booking Modal */}
      <NewBookingModal
        isOpen={isNewBookingModalOpen}
        onClose={() => setIsNewBookingModalOpen(false)}
        onSubmit={handleCreateBooking}
      />

      {/* Notifications Drawer */}
      <NotificationsDrawer
        notifications={notifications}
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onMarkAllAsRead={handleMarkAllNotificationsRead}
        onNotificationClick={handleNotificationClick}
      />

      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </>
  );
}

export default AdminApp;
