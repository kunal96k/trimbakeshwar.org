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
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectInput, setShowRejectInput] = useState(false);

  if (!isOpen || !booking) return null;

  const handleCopyUTR = () => {
    if (booking.utrNumber) {
      navigator.clipboard?.writeText(booking.utrNumber);
      setCopiedUTR(true);
      setTimeout(() => setCopiedUTR(false), 2000);
    }
  };

  const handleApprove = () => {
    onApprove(booking.id);
    onClose();
  };

  const handleReject = () => {
    onReject(booking.id, rejectReason || 'Screenshot blurred or transaction UTR mismatch');
    setShowRejectInput(false);
    onClose();
  };

  return (
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
        <div className="flex items-center justify-between px-5 py-4 border-b border-amber-500/20 bg-[#160B08]/90">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-300">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h2 id="qr-modal-title" className="text-base sm:text-lg font-bold font-sanskrit text-amber-100">
                UPI Token Receipt Review & Verification
              </h2>
              <p className="text-[11px] text-stone-400">
                Booking ID: <span className="font-mono text-amber-300 font-semibold">{booking.id}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
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
                <span>Payment Verified. Ritual slot is confirmed on the temple calendar.</span>
              </span>
              <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
                VERIFIED
              </span>
            </div>
          ) : (
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-center justify-between">
              <span className="flex items-center gap-2 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
                <span>Action Required: Please cross-verify credit of ₹1,000 in temple bank account.</span>
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
                {booking.gotra} • {booking.city}
              </span>
            </div>

            <div>
              <span className="text-stone-400 text-[11px] block">Ritual & Scheduled Date:</span>
              <span className="text-amber-200 font-semibold">{booking.poojaType}</span>
              <span className="text-stone-300 text-[11px] block mt-0.5">
                {booking.date} • {booking.time}
              </span>
            </div>
          </div>

          {/* Realistic Mobile Payment Screenshot & Receipt Simulator */}
          <div className="rounded-2xl border-2 border-dashed border-amber-500/30 bg-[#0E0604] p-4 sm:p-5 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-200">
                    UPI Payment Receipt ({booking.paymentApp || 'Google Pay'})
                  </div>
                  <div className="text-[10px] text-stone-400">
                    Timestamp: {booking.screenshotTimestamp || '28 Sep · 08:42 PM'}
                  </div>
                </div>
              </div>

              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-mono">
                SUCCESSFUL
              </span>
            </div>

            {/* Receipt Details */}
            <div className="space-y-3 py-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-stone-400">Advance Token Amount:</span>
                <span className="text-2xl font-bold font-mono text-emerald-400">
                  ₹{booking.advanceAmount.toLocaleString('en-IN')}.00
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-stone-400">Beneficiary / Payee:</span>
                <span className="text-stone-200 font-medium">Shri Trimbakeshwar Purohit Vatan</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-stone-400">UPI Transaction ID (UTR Ref):</span>
                <div className="flex items-center gap-1.5 font-mono text-amber-300">
                  <span>{booking.utrNumber || 'UPI/429011928374'}</span>
                  <button
                    onClick={handleCopyUTR}
                    className="p-1 rounded hover:bg-white/10 text-stone-400 hover:text-white transition-colors"
                    title="Copy UTR Reference"
                  >
                    {copiedUTR ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-stone-400">Payment Channel & Mode:</span>
                <span className="text-stone-300">{booking.paymentApp || 'UPI App'} / Instant Settlement</span>
              </div>
            </div>

            {/* Devotee Contact Bar */}
            <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between flex-wrap gap-2">
              <span className="text-[11px] text-stone-400">Devotee Phone: {booking.phone}</span>
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${booking.phone.replace(/\s+/g, '')}`}
                  className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[11px] flex items-center gap-1"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call</span>
                </a>
                <a
                  href={`https://wa.me/${booking.phone.replace(/[^0-9]/g, '')}?text=Jai%20Trimbakeshwar,%20your%20advance%20token%20receipt%20for%20the%20${encodeURIComponent(booking.poojaType)}%20has%20been%20verified.`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] flex items-center gap-1"
                >
                  <MessageCircle className="w-3 h-3" />
                  <span>WhatsApp</span>
                </a>
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
                  className="px-3 py-1.5 rounded-lg text-xs text-stone-400 hover:text-stone-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReject}
                  className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs"
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
              className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold transition-colors"
            >
              Reject
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleApprove}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-stone-950 font-bold text-xs shadow-lg shadow-emerald-950/50 flex items-center gap-1.5 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Verify & Confirm</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
