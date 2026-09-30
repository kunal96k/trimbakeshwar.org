import React, { useState } from 'react';
import { Booking } from '../types';
import {
  X,
  CheckCircle2,
  AlertCircle,
  QrCode,
  Phone,
  MessageCircle,
  Copy,
  Check,
  ShieldCheck,
  Calendar,
  Clock,
  MapPin,
  Smartphone,
  ExternalLink,
  Eye,
  Mail,
  Send,
  FileCheck,
  Image as ImageIcon,
} from 'lucide-react';

interface QRVerificationModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string, reason: string) => void;
}

export const QRVerificationModal: React.FC<QRVerificationModalProps> = ({
  booking,
  isOpen,
  onClose,
  onApprove,
  onReject,
}) => {
  const [copiedUTR, setCopiedUTR] = useState(false);
  const [copiedEmailText, setCopiedEmailText] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);
  const [showTempleQR, setShowTempleQR] = useState(false);
  const [showEmailDispatchModal, setShowEmailDispatchModal] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  if (!isOpen || !booking) return null;

  const handleCopyUTR = () => {
    if (booking.utrNumber) {
      navigator.clipboard?.writeText(booking.utrNumber);
      setCopiedUTR(true);
      setTimeout(() => setCopiedUTR(false), 2000);
    }
  };

  const emailSubject = `Booking Confirmed: Shri Trimbakeshwar Jyotirlinga Puja - ${booking.poojaType} [Ref: ${booking.id}]`;
  const emailBodyText =
    `॥ ॐ नमः शिवाय ॥\n` +
    `Shri Kshetra Trimbakeshwar Jyotirlinga Tirth Purohit Office\n\n` +
    `Respected ${booking.devoteeName} Ji,\n` +
    `Har Har Mahadev!\n\n` +
    `We are pleased to inform you that your advance token payment of ₹${booking.advanceAmount || 1000}.00 (UTR: ${booking.utrNumber || 'Verified'}) has been verified and confirmed in our temple bank ledger.\n\n` +
    `Your Sacred Vidhi booking is CONFIRMED:\n` +
    `• Booking Reference: ${booking.id}\n` +
    `• Ritual / Vidhi: ${booking.poojaType}\n` +
    `• Scheduled Date: ${booking.date} (${booking.time})\n` +
    `• Venue: Kushavarta Kund Ghat & Mandir Gate 2, Trimbakeshwar\n` +
    `• Devotee: ${booking.devoteeName} (${booking.gotra})\n\n` +
    `Our Hereditary Vatandar Tirth Purohit, Pt. Pravin Shambhu Deshmukh (Desai), will contact you directly on WhatsApp / Phone (+91 ${booking.phone}) 24 hours prior with fasting guidelines (upvaas), traditional dress code (dhoti/kurta for men, saree for women), and exact muhurat sankalp.\n\n` +
    `May Lord Trimbakeshwar Mahadev shower divine grace and blessings upon your family.\n\n` +
    `Pt. Atharva Deshmukh & Pt. Pravin Shambhu Deshmukh (Desai)\n` +
    `25 Generations Hereditary Vatandar Tirth Purohit\n` +
    `Shri Trimbakeshwar Jyotirlinga`;

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(`Subject: ${emailSubject}\n\n${emailBodyText}`);
    setCopiedEmailText(true);
    setTimeout(() => setCopiedEmailText(false), 2000);
  };

  const handleApprove = () => {
    onApprove(booking.id);
    setIsEmailSent(true);
    setShowEmailDispatchModal(true);
  };

  const handleReject = () => {
    onReject(booking.id, rejectReason || 'Screenshot blurred or transaction UTR mismatch');
    setShowRejectInput(false);
    onClose();
  };

  const handleSendViaWhatsApp = () => {
    const text = encodeURIComponent(
      `🙏 *Shri Trimbakeshwar Jyotirlinga Puja Confirmed!*\n\n` +
        `Respected ${booking.devoteeName} Ji, your advance token payment of ₹${booking.advanceAmount || 1000} (UTR: ${booking.utrNumber || 'Verified'}) has been verified.\n\n` +
        `• *Booking Ref:* ${booking.id}\n` +
        `• *Vidhi:* ${booking.poojaType}\n` +
        `• *Date & Time:* ${booking.date} (${booking.time})\n` +
        `• *Venue:* Kushavarta Kund Ghat & Mandir Gate 2\n\n` +
        `Our Guruji Pt. Pravin Shambhu Deshmukh (Desai) will contact you shortly with fasting instructions.\n\n` +
        `Har Har Mahadev!`
    );
    window.open(`https://wa.me/${booking.phone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="qr-modal-title"
      >
        <div
          className="relative w-full max-w-2xl bg-gradient-to-b from-[#1C0D0A] to-[#120705] border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 sm:px-6 sm:py-4.5 border-b border-amber-500/20 bg-[#160B08]/90">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-300 shrink-0">
                <QrCode className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-1">
                <h2 id="qr-modal-title" className="text-base sm:text-lg font-bold font-sanskrit text-amber-100 leading-snug">
                  UPI Token Receipt Review & Verification
                </h2>
                <p className="text-[11px] sm:text-xs text-stone-400">
                  Booking ID: <span className="font-mono text-amber-300 font-semibold">{booking.id}</span>
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close Verification Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content Body */}
          <div className="overflow-y-auto p-4 sm:p-6 space-y-5">
            {/* Status Alert Banner */}
            {booking.qrStatus === 'verified' ? (
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between">
                <span className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>Payment Verified. Confirmation email sent to devotee. Ritual slot is confirmed.</span>
                </span>
                <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
                  VERIFIED
                </span>
              </div>
            ) : (
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-center justify-between">
                <span className="flex items-center gap-2 font-medium">
                  <Clock className="w-4 h-4 shrink-0 text-amber-400 animate-pulse" />
                  <span>Action Required: Cross-verify credit of ₹1,000 in temple bank ledger before confirming.</span>
                </span>
                <span className="font-mono text-[10px] text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-full font-bold">
                  PENDING REVIEW
                </span>
              </div>
            )}

            {/* Devotee & Booking Snapshot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-black/40 border border-amber-500/15 rounded-2xl p-4">
              <div>
                <span className="text-stone-400 text-[11px] block">Yajaman (Devotee) Name:</span>
                <span className="text-stone-100 font-bold text-sm">{booking.devoteeName}</span>
                <span className="text-amber-300/90 text-[11px] block mt-0.5 font-medium">
                  {booking.gotra} • {booking.city}{booking.state ? `, ${booking.state}` : ''}
                </span>
                <span className="text-stone-300 text-[11px] block mt-0.5">
                  Attending Family: <strong>{booking.familyMembersCount || 2} Persons</strong>
                </span>
                {booking.devoteeAddress && (
                  <span className="text-stone-400 text-[10px] block mt-1">
                    Residence: <span className="text-stone-300">{booking.devoteeAddress}</span>
                  </span>
                )}
                {booking.email && (
                  <span className="text-stone-300 text-[11px] block mt-1 flex items-center gap-1 truncate">
                    <Mail className="w-3 h-3 text-amber-400 shrink-0" />
                    <span>{booking.email}</span>
                  </span>
                )}
              </div>

              <div>
                <span className="text-stone-400 text-[11px] block">Ritual & Scheduled Date:</span>
                <span className="text-amber-200 font-semibold">{booking.poojaType}</span>
                <span className="text-stone-300 text-[11px] block mt-0.5">
                  {booking.date} • {booking.time}
                </span>
                <span className="text-stone-400 text-[11px] block mt-1">
                  Venue: {booking.poojaAddress || booking.location || 'Kushavarta Kund Ghat & Mandir Gate 2'}
                </span>
                {booking.assignedGuruji && (
                  <span className="text-amber-400/90 text-[10px] block mt-1">
                    Guruji: {booking.assignedGuruji}
                  </span>
                )}
              </div>
            </div>

            {/* Actual Uploaded Payment Screenshot or Realistic Receipt */}
            <div className="rounded-2xl border-2 border-dashed border-amber-500/30 bg-[#0E0604] p-4 sm:p-5 relative overflow-hidden space-y-4">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-200">
                      Payment Verification Proof ({booking.paymentApp || 'Google Pay'})
                    </div>
                    <div className="text-[10px] text-stone-400">
                      Submitted: {booking.screenshotTimestamp || 'Recent submission'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {booking.paymentScreenshot && (
                    <button
                      type="button"
                      onClick={() => setShowFullImage(true)}
                      className="px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Zoom Screenshot</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowTempleQR(!showTempleQR)}
                    className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 text-[11px] font-medium flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>{showTempleQR ? 'Hide Temple QR' : 'View Temple QR'}</span>
                  </button>
                </div>
              </div>

              {/* Temple QR Code Comparison Drawer */}
              {showTempleQR && (
                <div className="p-3 bg-black/60 rounded-xl border border-amber-500/30 text-center animate-in fade-in duration-150 space-y-2">
                  <span className="text-[11px] font-bold text-amber-300 block">
                    Temple Official UPI QR (For Cross-Verification):
                  </span>
                  <img
                    src="/assets/UPI.jpeg"
                    alt="Temple Official UPI QR"
                    className="w-40 h-auto mx-auto rounded-xl border border-amber-400/50 shadow"
                  />
                  <div className="text-[10px] text-stone-400 font-mono">
                    UPI ID: <strong>atharvadeshmukh525-1@oksbi</strong> • Pt. Atharva Deshmukh
                  </div>
                </div>
              )}

              {/* Display Devotee Uploaded Screenshot */}
              {booking.paymentScreenshot ? (
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-amber-200 flex items-center justify-between">
                    <span>Devotee Uploaded Screenshot:</span>
                    <span className="text-stone-400 text-[10px]">Click image to view in high resolution</span>
                  </div>
                  <div
                    onClick={() => setShowFullImage(true)}
                    className="relative max-h-64 sm:max-h-72 overflow-hidden rounded-xl border border-amber-500/30 bg-black/60 flex items-center justify-center cursor-pointer group shadow-inner"
                  >
                    <img
                      src={booking.paymentScreenshot}
                      alt="Uploaded Payment Receipt"
                      className="max-h-64 sm:max-h-72 w-auto object-contain mx-auto transition-transform group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-3.5 py-1.5 rounded-full bg-black/85 text-amber-300 text-xs font-bold flex items-center gap-1.5 shadow-lg border border-amber-500/40">
                        <Eye className="w-4 h-4" /> Click to View Full Image
                      </span>
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Receipt Details Breakdown */}
              <div className="space-y-2.5 py-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Advance Token Amount:</span>
                  <span className="text-xl font-bold font-mono text-emerald-400">
                    ₹{booking.advanceAmount.toLocaleString('en-IN')}.00
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Beneficiary / Payee:</span>
                  <span className="text-stone-200 font-medium">
                    Shri Trimbakeshwar Purohit Vatan (Pt. Atharva / Pt. Pravin Deshmukh)
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-stone-400">UPI Transaction ID (UTR Ref):</span>
                  <div className="flex items-center gap-1.5 font-mono text-amber-300">
                    <span className="font-bold text-sm">{booking.utrNumber || 'UPI/429011928374'}</span>
                    <button
                      onClick={handleCopyUTR}
                      className="p-1 rounded hover:bg-white/10 text-stone-400 hover:text-white transition-colors cursor-pointer"
                      title="Copy UTR Reference"
                    >
                      {copiedUTR ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Payment App & Mode:</span>
                  <span className="text-stone-300">{booking.paymentApp || 'Google Pay'} / Real-time Settlement</span>
                </div>
              </div>

              {/* Devotee Contact Bar */}
              <div className="mt-3 pt-3 border-t border-stone-800 flex items-center justify-between flex-wrap gap-2">
                <span className="text-[11px] text-stone-400">Devotee Phone: {booking.phone}</span>
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${booking.phone.replace(/\s+/g, '')}`}
                    className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[11px] flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call</span>
                  </a>
                  <button
                    onClick={handleSendViaWhatsApp}
                    className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] flex items-center gap-1 cursor-pointer"
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Reject Input */}
            {showRejectInput && (
              <div className="p-3.5 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-2">
                <label className="text-xs text-rose-300 block font-medium">
                  Reason for Rejection / Devotee Notice:
                </label>
                <input
                  type="text"
                  placeholder="e.g. UTR number mismatch or blurry screenshot..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full bg-black/60 border border-rose-500/40 rounded-xl px-3 py-2 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-rose-400"
                />
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    onClick={() => setShowRejectInput(false)}
                    className="px-3 py-1.5 rounded-lg text-xs text-stone-400 hover:text-stone-200 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReject}
                    className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs cursor-pointer"
                  >
                    Confirm Rejection
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-amber-500/20 bg-[#160B08] flex items-center justify-between gap-3">
            {!showRejectInput ? (
              <button
                onClick={() => setShowRejectInput(true)}
                className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold transition-colors cursor-pointer"
              >
                Reject Payment
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={handleApprove}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-stone-950 font-bold text-xs shadow-lg shadow-emerald-950/50 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Verify Payment & Dispatch Confirmation Email</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal: Full Screen Payment Screenshot View */}
      {showFullImage && booking.paymentScreenshot && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-150"
          onClick={() => setShowFullImage(false)}
        >
          <div
            className="relative max-w-xl w-full bg-[#180805] border border-amber-500/40 rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-amber-500/20 text-white">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-sm text-amber-100 font-sanskrit">
                  Payment Screenshot Full Resolution
                </span>
              </div>
              <button
                onClick={() => setShowFullImage(false)}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-2 overflow-auto flex-1 flex items-center justify-center bg-black/60 rounded-2xl my-3">
              <img
                src={booking.paymentScreenshot}
                alt="Enlarged Payment Screenshot"
                className="max-h-[65vh] w-auto object-contain rounded-xl shadow-lg border border-amber-500/20"
              />
            </div>
            <div className="flex items-center justify-between text-xs text-stone-400 pt-1">
              <span>UTR: <strong className="font-mono text-amber-300">{booking.utrNumber}</strong></span>
              <button
                onClick={() => setShowFullImage(false)}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Email Dispatch Modal */}
      {showEmailDispatchModal && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => {
            setShowEmailDispatchModal(false);
            onClose();
          }}
        >
          <div
            className="relative w-full max-w-xl bg-gradient-to-b from-[#1E0D0A] to-[#120705] border-2 border-emerald-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-amber-500/20">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-sanskrit text-amber-100">
                    Payment Verified & Confirmation Email Sent
                  </h3>
                  <p className="text-[11px] text-emerald-400 font-medium">
                    Booking Confirmed in Kushavarta Register
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowEmailDispatchModal(false);
                  onClose();
                }}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Email Dispatch Details Card */}
            <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <span className="text-stone-300 font-semibold">Confirmation Email Dispatched</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                  DELIVERED TO DEVOTEE
                </span>
              </div>

              <div className="space-y-1.5 text-[11px]">
                <div>
                  <span className="text-stone-500 block">Recipient Email:</span>
                  <span className="font-semibold text-amber-200">
                    {booking.email || `${booking.devoteeName.toLowerCase().replace(/\s+/g, '')}@gmail.com`}
                  </span>
                </div>
                <div>
                  <span className="text-stone-500 block">Email Subject:</span>
                  <span className="font-medium text-stone-200">{emailSubject}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">From:</span>
                  <span className="text-stone-300">
                    Shri Trimbakeshwar Purohit Office &lt;trimbak.tirthapurohit@gmail.com&gt;
                  </span>
                </div>
              </div>

              {/* Email Content Box */}
              <div className="mt-3 p-3.5 rounded-xl bg-[#140805] border border-amber-500/20 text-stone-300 text-[11px] leading-relaxed space-y-2 font-sans">
                <div className="text-amber-400 font-bold font-sanskrit text-xs border-b border-amber-500/20 pb-1">
                  ॥ ॐ नमः शिवाय ॥ श्री क्षेत्र त्र्यंबकेश्वर ज्योतिर्लिंग
                </div>
                <p>
                  Respected <strong>{booking.devoteeName}</strong> Ji, Har Har Mahadev!
                </p>
                <p>
                  Your advance token payment of <strong>₹{booking.advanceAmount || 1000}.00</strong> (UTR: <strong>{booking.utrNumber}</strong>) has been verified and confirmed in the temple ledger.
                </p>
                <div className="p-2.5 rounded-lg bg-black/40 border border-amber-500/15 space-y-0.5 text-[10px] font-mono text-amber-200">
                  <div>Vidhi: {booking.poojaType}</div>
                  <div>Date & Muhurat: {booking.date} ({booking.time})</div>
                  <div>Venue: Kushavarta Kund Ghat & Mandir Gate 2</div>
                </div>
                <p className="text-amber-200/90 font-medium">
                  Our Hereditary Vatandar Tirth Purohit, <strong>Pt. Pravin Shambhu Deshmukh (Desai)</strong>, will contact you directly on WhatsApp / Mobile (<strong>+91 {booking.phone}</strong>) 24 hours prior to guide you on fasting (upvaas), traditional attire, and sacred preparations.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedEmailText ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmailText ? 'Copied Content!' : 'Copy Email Text'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSendViaWhatsApp}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Notify via WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEmailDispatchModal(false);
                    onClose();
                  }}
                  className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
