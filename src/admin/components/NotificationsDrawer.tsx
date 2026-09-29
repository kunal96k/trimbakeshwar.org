import React from 'react';
import { AdminNotification } from '../types';
import { Bell, QrCode, MessageSquareQuote, CalendarCheck, ShieldCheck, X } from 'lucide-react';

interface NotificationsDrawerProps {
  notifications: AdminNotification[];
  isOpen: boolean;
  onClose: () => void;
  onMarkAllAsRead: () => void;
  onNotificationClick: (notification: AdminNotification) => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  notifications,
  isOpen,
  onClose,
  onMarkAllAsRead,
  onNotificationClick,
}) => {
  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => n.unread).length;

  const getIcon = (type: AdminNotification['type']) => {
    switch (type) {
      case 'payment':
        return <QrCode className="w-4 h-4 text-emerald-400" />;
      case 'inquiry':
        return <MessageSquareQuote className="w-4 h-4 text-blue-400" />;
      case 'booking':
        return <CalendarCheck className="w-4 h-4 text-amber-400" />;
      case 'system':
      default:
        return <ShieldCheck className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs" onClick={onClose} />
      <div
        className="fixed top-16 right-4 sm:right-6 z-50 w-[92vw] max-w-sm bg-[#1A0D0A] border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150"
        role="dialog"
        aria-modal="true"
        aria-label="Notifications"
      >
        <div className="p-3.5 border-b border-amber-500/20 bg-[#160B08] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-400" />
            <span className="font-bold text-xs text-amber-100 font-sanskrit">
              Notifications & Alerts ({unreadCount} New)
            </span>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllAsRead}
                className="text-[10px] text-amber-300 hover:text-amber-200 underline"
              >
                Mark all read
              </button>
            )}
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-stone-200 p-1"
              aria-label="Close notifications"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="max-h-[380px] overflow-y-auto divide-y divide-stone-800/60">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                onNotificationClick(n);
                onClose();
              }}
              className={`p-3 text-xs cursor-pointer transition-colors hover:bg-amber-500/10 ${
                n.unread ? 'bg-amber-500/5' : ''
              }`}
            >
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-black/40 border border-stone-800 mt-0.5 shrink-0">
                  {getIcon(n.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="font-bold text-amber-100 truncate text-[11px]">
                      {n.title}
                    </span>
                    <span className="text-[10px] text-stone-400 shrink-0 font-mono">
                      {n.time}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-300 leading-relaxed line-clamp-2">
                    {n.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
