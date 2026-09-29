import React, { useState, useEffect } from 'react';
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
  initialNotifications,
  initialPanchang,
  currentAdminUser,
} from './data/mockData';
import { AdminLayout } from './components/AdminLayout';
import { DashboardHomeView } from './components/DashboardHomeView';
import { SubmodulePlaceholder } from './components/SubmodulePlaceholder';
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
} from '../services/enquiryService';

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
    preferredDate: enquiry.preferredDate || 'Flexible Muhurat',
    query: enquiry.devoteeMessage || '',
    timeAgo,
    status: (enquiry.status?.toLowerCase() === 'contacted' ? 'contacted' : 'new') as 'new' | 'contacted',
    preferredContactMethod: enquiry.preferredContactMethod || 'phone',
    isDatabaseSaved: true,
  };
}

interface AdminAppProps {
  onExitAdmin?: () => void;
  initialOpenLogin?: boolean;
}

export function AdminApp({ onExitAdmin, initialOpenLogin }: AdminAppProps = {}) {
  // Navigation & Core State
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [leads, setLeads] = useState<DevoteeLead[]>(initialDevoteeLeads);
  const [notifications, setNotifications] = useState<AdminNotification[]>(initialNotifications);
  const [panchang] = useState<PanchangInfo>(initialPanchang);
  const [user, setUser] = useState<AdminUser>(currentAdminUser);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch and sync real devotee contact enquiries from Spring Boot backend database
  const loadLiveEnquiries = async () => {
    try {
      const records = await fetchContactEnquiries();
      if (records && records.length > 0) {
        const liveLeads = records.map(contactEnquiryToLead);
        setLeads((prev) => {
          const liveNumbers = new Set(liveLeads.map((l) => l.enquiryNumber));
          const rest = prev.filter((l) => !l.enquiryNumber || !liveNumbers.has(l.enquiryNumber));
          return [...liveLeads, ...rest];
        });
      }
    } catch (e) {
      console.error('Error fetching live enquiries:', e);
    }
  };

  useEffect(() => {
    loadLiveEnquiries();

    const handleNewSubmission = (event: any) => {
      const detail = event?.detail as ContactEnquiryRecord | undefined;
      if (detail) {
        const newLead = contactEnquiryToLead(detail);
        setLeads((prev) => [newLead, ...prev.filter((l) => l.enquiryNumber !== newLead.enquiryNumber)]);
        addAndroidNotification(
          'info',
          `New Devotee Contact: ${newLead.name}`,
          `Pooja: ${newLead.poojaRequested} • Phone: ${newLead.phone}. Saved in database.`,
          'View Inquiries',
          () => setActiveTab('inquiries')
        );
      } else {
        loadLiveEnquiries();
      }
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'trimbak_contact_enquiries' || e.key === 'trimbak_last_enquiry_time') {
        loadLiveEnquiries();
      }
    };

    window.addEventListener('trimbak_enquiry_submitted', handleNewSubmission);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('trimbak_enquiry_submitted', handleNewSubmission);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(Boolean(initialOpenLogin));
  const [authInitialStep, setAuthInitialStep] = useState<AuthStep>('login');

  // System Status & Error Code State
  const [activeStatusPage, setActiveStatusPage] = useState<ErrorStatusCode | null>(null);

  // Modals & Drawers State
  const [isNewBookingModalOpen, setIsNewBookingModalOpen] = useState<boolean>(false);
  const [selectedBookingForQR, setSelectedBookingForQR] = useState<Booking | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);

  // Android Native Heads-Up Notifications System
  const [androidNotifications, setAndroidNotifications] = useState<AndroidNotificationItem[]>([
    {
      id: 'init-alert-1',
      type: 'warning',
      title: 'QR Advance Verification Pending',
      message: '₹1,000 token screenshot received from Rajesh Sharma (Kaal Sarp Shanti). Swipe right or left to dismiss.',
      timestamp: 'Just now',
      appSource: 'Trimbak Admin • UPI',
      actionLabel: 'Verify QR',
      onAction: () => {
        const pending = initialBookings.find((b) => b.qrStatus === 'pending_verification') || initialBookings[0];
        setSelectedBookingForQR(pending);
      },
    },
  ]);

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

  // Handlers for Authentication
  const handleLoginSuccess = (emailOrPhone: string) => {
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
    setActiveStatusPage(null);
    addAndroidNotification(
      'success',
      'Purohit Session Authenticated',
      `Welcome back, Pt. Pravin Shambhu Deshmukh (Desai). Master key validated securely.`
    );
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setAuthInitialStep('login');
    setIsAuthModalOpen(true);
    addAndroidNotification('info', 'Session Signed Out', 'Admin access locked until master credentials provided.');
  };

  // Handlers for QR Payment Approval & Rejection
  const handleApprovePayment = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              qrStatus: 'verified',
              status: 'upcoming',
              statusLabel: 'Confirmed Booking',
            }
          : b
      )
    );

    const booking = bookings.find((b) => b.id === bookingId);
    addAndroidNotification(
      'success',
      'Token Payment Approved & Verified',
      `₹1,000 advance receipt approved for ${booking ? booking.devoteeName : 'Devotee'}. Booking confirmed.`
    );
  };

  const handleRejectPayment = (bookingId: string, reason: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? { ...b, qrStatus: 'rejected', statusLabel: 'Re-verification Needed' }
          : b
      )
    );

    addAndroidNotification(
      'error',
      'Token Screenshot Rejected',
      `Reason: ${reason}. A re-upload SMS notification has been dispatched to devotee.`
    );
  };

  // Handler for New Walk-In Booking
  const handleCreateBooking = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
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
      'Devotee Inquiry Updated',
      'Devotee marked as contacted. Status synced with database.'
    );
  };

  // Handler for CSV Export
  const handleExportReport = () => {
    const headers = 'Booking ID,Devotee Name,Phone,Pooja Type,Scheduled Date,Time,Advance Paid,QR Status\n';
    const rows = bookings
      .map(
        (b) =>
          `"${b.id}","${b.devoteeName}","${b.phone}","${b.poojaType}","${b.date}","${b.time}","₹${b.advanceAmount}","${b.qrStatus}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
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
  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    addAndroidNotification('info', 'Notifications Cleared', 'All pending alerts marked as read.');
  };

  const handleNotificationClick = (notification: AdminNotification) => {
    if (notification.type === 'payment') {
      const pendingBooking = bookings.find((b) => b.qrStatus === 'pending_verification') || bookings[0];
      setSelectedBookingForQR(pendingBooking);
    } else if (notification.type === 'inquiry') {
      setActiveTab('inquiries');
    } else if (notification.type === 'booking') {
      setActiveTab('bookings');
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
            panchang={panchang}
            searchQuery={searchQuery}
            onOpenNewBooking={() => setIsNewBookingModalOpen(true)}
            onSelectBookingForQR={(booking) => setSelectedBookingForQR(booking)}
            onNavigateTab={(tab) => setActiveTab(tab)}
            onLeadContacted={handleLeadContacted}
            onExportReport={handleExportReport}
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
