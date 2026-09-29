import React, { useState } from 'react';
import { Booking, PoojaType } from '../types';
import { X, Plus, Calendar, Clock, MapPin, User, Phone, Sparkles, CheckCircle2 } from 'lucide-react';

interface NewBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newBooking: Booking) => void;
}

const POOJA_OPTIONS: PoojaType[] = [
  'Narayan Nagbali (3-Day Ritual)',
  'Kaal Sarp Shanti Yog',
  'Tripindi Shradh (Pitru Moksha)',
  'Mahamrityunjaya Anushthan & Havan',
  'Rudrabhishek & Maha Abhishek',
  'Navgraha Shanti & Havan',
];

export const NewBookingModal: React.FC<NewBookingModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [devoteeName, setDevoteeName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [gotra, setGotra] = useState('');
  const [poojaType, setPoojaType] = useState<string>(POOJA_OPTIONS[0]);
  const [date, setDate] = useState('03 October 2026');
  const [time, setTime] = useState('11:00 AM');
  const [location, setLocation] = useState('Shri Trimbakeshwar Anushthan Bhavan');
  const [advancePaid, setAdvancePaid] = useState(true);
  const [familyMembersCount, setFamilyMembersCount] = useState(2);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!devoteeName.trim() || !phone.trim()) {
      return;
    }

    const newId = `TRMB-2026-${Math.floor(1090 + Math.random() * 900)}`;
    const newBooking: Booking = {
      id: newId,
      devoteeName: devoteeName.trim(),
      phone: phone.trim().startsWith('+91') ? phone.trim() : `+91 ${phone.trim()}`,
      poojaType,
      date,
      time,
      location,
      status: 'upcoming',
      statusLabel: 'Confirmed (New)',
      gotra: gotra.trim() ? `${gotra.trim()} Gotra` : 'Kashyap Gotra',
      city: city.trim() || 'Nashik',
      familyMembersCount,
      advanceAmount: advancePaid ? 1000 : 0,
      totalPoojaDakshina: 'As per Vedic Scriptures',
      qrStatus: advancePaid ? 'verified' : 'pending_verification',
      utrNumber: advancePaid ? `UPI/${Math.floor(100000000000 + Math.random() * 900000000000)}` : undefined,
      paymentApp: 'Google Pay',
      bookingDate: 'Today (Walk-in)',
      notes: notes.trim(),
    };

    onSubmit(newBooking);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-booking-title"
    >
      <div
        className="relative w-full max-w-lg bg-gradient-to-b from-[#1E0E0A] to-[#120705] border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-amber-500/20 bg-[#160B08]/90">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-stone-950 font-bold shadow-md">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h2 id="new-booking-title" className="text-base sm:text-lg font-bold font-sanskrit text-amber-100">
                New Walk-In / Phone Booking
              </h2>
              <p className="text-[11px] text-stone-400">
                Instant ritual date reservation and devotee registration
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close Booking Dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 space-y-4 text-xs">
          {/* Devotee Details */}
          <div className="space-y-3">
            <div>
              <label className="block text-stone-300 font-medium mb-1">
                Yajaman (Devotee) Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Vithal Tambat"
                value={devoteeName}
                onChange={(e) => setDevoteeName(e.target.value)}
                className="w-full bg-black/50 border border-amber-500/30 rounded-xl px-3 py-2 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-300 font-medium mb-1">
                  Mobile Number (WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98234 12345"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-black/50 border border-amber-500/30 rounded-xl px-3 py-2 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-medium mb-1">
                  City / State
                </label>
                <input
                  type="text"
                  placeholder="e.g. Pune, Maharashtra"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-black/50 border border-amber-500/30 rounded-xl px-3 py-2 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-300 font-medium mb-1">
                  Gotra
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bharadwaj / Kashyap"
                  value={gotra}
                  onChange={(e) => setGotra(e.target.value)}
                  className="w-full bg-black/50 border border-amber-500/30 rounded-xl px-3 py-2 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-medium mb-1">
                  Family Members Attending
                </label>
                <select
                  value={familyMembersCount}
                  onChange={(e) => setFamilyMembersCount(Number(e.target.value))}
                  className="w-full bg-black/50 border border-amber-500/30 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-400"
                >
                  <option value={1}>1 Person (Individual Ritual)</option>
                  <option value={2}>2 Persons (Couple Sankalpa)</option>
                  <option value={3}>3 Persons (Family)</option>
                  <option value={4}>4 Persons</option>
                  <option value={5}>5+ Persons</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pooja Details */}
          <div className="pt-2 border-t border-amber-500/20 space-y-3">
            <div>
              <label className="block text-stone-300 font-medium mb-1">
                Pooja / Consecration Type *
              </label>
              <select
                value={poojaType}
                onChange={(e) => setPoojaType(e.target.value)}
                className="w-full bg-black/50 border border-amber-500/30 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-400"
              >
                {POOJA_OPTIONS.map((p) => (
                  <option key={p} value={p} className="bg-stone-900 text-stone-100">
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-300 font-medium mb-1">
                  Ritual Date *
                </label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="e.g. 05 October 2026"
                  className="w-full bg-black/50 border border-amber-500/30 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-medium mb-1">
                  Muhurat Time *
                </label>
                <input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="e.g. 11:00 AM"
                  className="w-full bg-black/50 border border-amber-500/30 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-stone-300 font-medium mb-1">
                Sanctified Location / Kund
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-black/50 border border-amber-500/30 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Advance Token Checkbox */}
          <div className="pt-2 border-t border-amber-500/20">
            <label className="flex items-center gap-3 p-3 rounded-2xl bg-amber-500/10 border border-amber-400/20 cursor-pointer">
              <input
                type="checkbox"
                checked={advancePaid}
                onChange={(e) => setAdvancePaid(e.target.checked)}
                className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 accent-amber-500"
              />
              <div>
                <span className="font-semibold text-amber-200 block text-xs">
                  Advance ₹1,000 Token Received (Confirmed)
                </span>
                <span className="text-[11px] text-stone-400 block">
                  Automatically flags slot as confirmed in temple registry.
                </span>
              </div>
            </label>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-stone-300 font-medium mb-1">
              Ritual Notes / Special Instructions
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Pitru dosha resolution, white dhoti required, hotel arrangement requested..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-black/50 border border-amber-500/30 rounded-xl px-3 py-2 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 text-xs resize-none"
            />
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-amber-500/20 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold text-xs shadow-lg shadow-amber-950 flex items-center gap-1.5 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm Booking</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
