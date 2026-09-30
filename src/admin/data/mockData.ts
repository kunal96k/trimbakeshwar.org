import { Booking, DevoteeLead, AdminNotification, PanchangInfo, AdminUser } from '../types';

export const currentAdminUser: AdminUser = {
  name: 'Pt. Pravin Shambhu Deshmukh (Desai)',
  role: 'Hereditary Vatandar Tirth Purohit',
  email: 'trimbak.tirthapurohit@gmail.com',
  phone: '+91 96899 73967',
  lineage: '25 Generations Royal Vatan (Est. 1674)',
  isOnline: true,
};

export const initialPanchang: PanchangInfo = {
  tithi: 'Bhadrapada Krishna Trayodashi (Pradosh Vrat)',
  nakshatra: 'Magha Nakshatra · Sadhya Yoga',
  paksha: 'Krishna Paksha',
  samvat: 'Vikram Samvat 2083 · Ananda Samvatsara',
  muhurat: 'Amrut Kaal: 06:22 AM - 08:10 AM · Abhijit Muhurat: 11:48 AM - 12:36 PM',
  rahukaal: '03:00 PM - 04:30 PM (Avoid Auspicious Beginnings)',
  gregorianDate: 'Tuesday, 29 September 2026',
};

export const initialBookings: Booking[] = [];


export const initialDevoteeLeads: DevoteeLead[] = [];

export const initialNotifications: AdminNotification[] = [
  {
    id: 'NT-1',
    title: 'New ₹1,000 Advance QR Receipt',
    message: 'Amit Kumar Patel submitted PhonePe UPI screenshot (UTR: UPI/429011928374). Action required for confirmation.',
    time: '10 mins ago',
    unread: true,
    type: 'payment',
  },
  {
    id: 'NT-3',
    title: 'Upcoming Ritual Reminder',
    message: '02:30 PM Mahamrityunjaya Anushthan (Suresh Joshi) - Ensure Brahmagiri Yajnashala samidha is sanctified.',
    time: '1 hour ago',
    unread: true,
    type: 'booking',
  },
  {
    id: 'NT-4',
    title: 'Vatandar Cloud Backup Complete',
    message: 'Automated 25 Generations Hereditary archive backup completed with 256-bit encryption.',
    time: 'Yesterday',
    unread: false,
    type: 'system',
  },
];
