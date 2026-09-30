export type AdminTab =
  | 'dashboard'
  | 'bookings'
  | 'inquiries'
  | 'payments'
  | 'gallery'
  | 'analytics'
  | 'settings';

export type ErrorStatusCode = '404' | '403' | '500' | '502' | '503';

export type PoojaType =
  | 'Narayan Nagbali (3-Day Ritual)'
  | 'Kaal Sarp Shanti Yog'
  | 'Tripindi Shradh (Pitru Moksha)'
  | 'Mahamrityunjaya Anushthan & Havan'
  | 'Rudrabhishek & Maha Abhishek'
  | 'Navgraha Shanti & Havan';

export type PaymentStatus = 'pending_verification' | 'verified' | 'rejected';

export interface Booking {
  id: string;
  devoteeName: string;
  phone: string;
  email?: string;
  poojaType: string;
  date: string;
  time: string;
  location: string;
  status: 'in_progress' | 'upcoming' | 'completed' | 'cancelled' | 'pending_verification';
  statusLabel: string;
  gotra: string;
  city: string;
  state?: string;
  devoteeAddress?: string;
  poojaAddress?: string;
  familyMembersCount: number;
  advanceAmount: number;
  totalPoojaDakshina: string;
  qrStatus: PaymentStatus;
  utrNumber?: string;
  paymentApp?: 'Google Pay' | 'PhonePe' | 'Paytm' | 'BHIM UPI' | string;
  paymentMethod?: string;
  createdByName?: string;
  assignedGuruji?: string;
  language?: string;
  bookingDate: string;
  screenshotTimestamp?: string;
  paymentScreenshot?: string;
  notes?: string;
  emailSent?: boolean;
  emailSentAt?: string;
}

export interface DevoteeLead {
  id: string;
  enquiryNumber?: string;
  name: string;
  phone: string;
  email?: string;
  city: string;
  poojaRequested: string;
  preferredDate: string;
  query: string;
  timeAgo: string;
  status: 'new' | 'contacted' | 'booked';
  preferredContactMethod?: string;
  isDatabaseSaved?: boolean;
}

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  type: 'payment' | 'booking' | 'inquiry' | 'system';
}

export interface PanchangInfo {
  tithi: string;
  nakshatra: string;
  paksha: string;
  samvat: string;
  muhurat: string;
  rahukaal: string;
  gregorianDate: string;
}

export interface AdminUser {
  name: string;
  role: string;
  email: string;
  phone: string;
  lineage: string;
  isOnline: boolean;
}
