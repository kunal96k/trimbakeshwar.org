import React, { useState, useEffect, useRef } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Info,
  X,
  Bell,
  ChevronRight,
  ShieldAlert,
  Flame,
  Volume2
} from 'lucide-react';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface AndroidNotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  timestamp?: string;
  appSource?: string; // e.g. "Trimbak Admin" or "Vedic System"
  actionLabel?: string;
  onAction?: () => void;
  persistent?: boolean;
}

interface AndroidNotificationBannerProps {
  notifications: AndroidNotificationItem[];
  onDismiss: (id: string) => void;
}

interface SingleNotificationCardProps {
  item: AndroidNotificationItem;
  onDismiss: (id: string) => void;
}

const SingleNotificationCard: React.FC<SingleNotificationCardProps> = ({ item, onDismiss }) => {
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isSwiping, setIsSwiping] = useState<boolean>(false);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);
  const [progress, setProgress] = useState<number>(100);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const startXRef = useRef<number>(0);
  const currentXRef = useRef<number>(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const DURATION_MS = item.type === 'error' ? 7000 : 5000;
  const SWIPE_THRESHOLD = 90; // pixels to dismiss

  // Auto-dismiss countdown with progress bar (pauses on hover/touch)
  useEffect(() => {
    if (item.persistent) return;

    const intervalTime = 50;
    const step = (intervalTime / DURATION_MS) * 100;

    const timer = setInterval(() => {
      if (!isPaused) {
        setProgress((prev) => {
          if (prev <= step) {
            clearInterval(timer);
            triggerDismiss('right');
            return 0;
          }
          return prev - step;
        });
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [DURATION_MS, isPaused, item.persistent]);

  const triggerDismiss = (direction: 'left' | 'right') => {
    setIsExiting(true);
    setExitDirection(direction);
    setTimeout(() => {
      onDismiss(item.id);
    }, 280);
  };

  // Touch handlers for mobile swipe left / right
  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    currentXRef.current = e.touches[0].clientX;
    setIsSwiping(true);
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping) return;
    currentXRef.current = e.touches[0].clientX;
    const diff = currentXRef.current - startXRef.current;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isSwiping) return;
    setIsSwiping(false);
    setIsPaused(false);

    if (dragOffset > SWIPE_THRESHOLD) {
      triggerDismiss('right');
    } else if (dragOffset < -SWIPE_THRESHOLD) {
      triggerDismiss('left');
    } else {
      // Snap back smoothly
      setDragOffset(0);
    }
  };

  // Mouse drag handlers for desktop swipe emulation
  const handleMouseDown = (e: React.MouseEvent) => {
    startXRef.current = e.clientX;
    currentXRef.current = e.clientX;
    setIsSwiping(true);
    setIsPaused(true);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      currentXRef.current = moveEvent.clientX;
      const diff = currentXRef.current - startXRef.current;
      setDragOffset(diff);
    };

    const handleMouseUp = () => {
      setIsSwiping(false);
      setIsPaused(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);

      const finalDiff = currentXRef.current - startXRef.current;
      if (finalDiff > SWIPE_THRESHOLD) {
        triggerDismiss('right');
      } else if (finalDiff < -SWIPE_THRESHOLD) {
        triggerDismiss('left');
      } else {
        setDragOffset(0);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // Theme styling based on Android Material You alert guidelines
  const getVariantStyles = () => {
    switch (item.type) {
      case 'error':
        return {
          pill: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
          accent: '#F43F5E',
          cardBg: 'bg-[#210B0B]/95',
          border: 'border-rose-500/40',
          iconBg: 'bg-rose-500/20 text-rose-400',
          progressBg: 'bg-gradient-to-r from-rose-500 to-rose-400',
          shadow: 'shadow-[0_12px_32px_rgba(225,29,72,0.35)]',
          badgeText: 'HIGH PRIORITY ALERT',
        };
      case 'warning':
        return {
          pill: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
          accent: '#F59E0B',
          cardBg: 'bg-[#231206]/95',
          border: 'border-amber-500/40',
          iconBg: 'bg-amber-500/20 text-amber-400',
          progressBg: 'bg-gradient-to-r from-amber-500 to-amber-300',
          shadow: 'shadow-[0_12px_32px_rgba(245,158,11,0.25)]',
          badgeText: 'ATTENTION REQUIRED',
        };
      case 'success':
        return {
          pill: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
          accent: '#10B981',
          cardBg: 'bg-[#0B1E13]/95',
          border: 'border-emerald-500/40',
          iconBg: 'bg-emerald-500/20 text-emerald-400',
          progressBg: 'bg-gradient-to-r from-emerald-500 to-emerald-300',
          shadow: 'shadow-[0_12px_32px_rgba(16,185,129,0.25)]',
          badgeText: 'ACTION SUCCESSFUL',
        };
      case 'info':
      default:
        return {
          pill: 'bg-amber-500/15 text-amber-200 border-amber-400/30',
          accent: '#D4AF37',
          cardBg: 'bg-[#1C0E0A]/95',
          border: 'border-amber-500/30',
          iconBg: 'bg-amber-500/20 text-amber-300',
          progressBg: 'bg-gradient-to-r from-amber-400 to-amber-200',
          shadow: 'shadow-[0_12px_32px_rgba(212,175,55,0.2)]',
          badgeText: 'ADMIN UPDATE',
        };
    }
  };

  const styles = getVariantStyles();

  // Opacity decreases as user swipes
  const swipeOpacity = Math.max(0.2, 1 - Math.abs(dragOffset) / 200);

  // Compute transform
  let transformStyle = `translateX(${dragOffset}px)`;
  if (isExiting) {
    transformStyle = exitDirection === 'left' ? 'translateX(-120%)' : 'translateX(120%)';
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      style={{
        transform: transformStyle,
        opacity: isExiting ? 0 : swipeOpacity,
        transition: isSwiping ? 'none' : 'transform 0.28s cubic-bezier(0.2, 0.9, 0.3, 1), opacity 0.28s ease',
      }}
      className={`relative w-full max-w-md mx-auto rounded-3xl ${styles.cardBg} ${styles.border} border ${styles.shadow} backdrop-blur-2xl overflow-hidden cursor-grab active:cursor-grabbing select-none transition-all p-3.5 sm:p-4 text-stone-100 group`}
    >
      {/* Top Header Row: Android App Icon, App Name & Timestamp & Close X */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          {/* Sacred Android Badge Icon */}
          <div className="w-5 h-5 rounded-lg bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center shadow-xs">
            <Flame className="w-3 h-3 text-stone-950 fill-stone-950" />
          </div>
          
          <span className="text-[11px] font-bold tracking-wider uppercase text-amber-200/90 font-mono">
            {item.appSource || 'Purohit Console'}
          </span>
          <span className="text-[10px] text-stone-500 font-mono">•</span>
          <span className="text-[10px] text-stone-400 font-mono">
            {item.timestamp || 'just now'}
          </span>
        </div>

        {/* Swipe Hint / Close Button */}
        <div className="flex items-center gap-1.5">
          <span className="hidden sm:inline text-[9px] text-stone-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
            swipe ⟷ dismiss
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              triggerDismiss('right');
            }}
            className="p-1 rounded-full text-stone-400 hover:text-stone-100 hover:bg-white/10 active:scale-95 transition-all"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Body: Alert Icon + Title + Message Content */}
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-2xl ${styles.iconBg} shrink-0 mt-0.5 shadow-inner`}>
          {item.type === 'error' && <ShieldAlert className="w-5 h-5" />}
          {item.type === 'warning' && <AlertTriangle className="w-5 h-5" />}
          {item.type === 'success' && <CheckCircle2 className="w-5 h-5" />}
          {item.type === 'info' && <Bell className="w-5 h-5" />}
        </div>

        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center gap-2">
            <h4 className="text-xs sm:text-sm font-bold text-stone-100 leading-tight">
              {item.title}
            </h4>
          </div>
          
          {item.message && (
            <p className="text-[11px] sm:text-xs text-stone-300 mt-1 leading-snug line-clamp-2">
              {item.message}
            </p>
          )}

          {/* Quick Action Button (Android Action Chip) */}
          {item.actionLabel && (
            <div className="mt-2.5 flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  item.onAction?.();
                  triggerDismiss('right');
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-stone-100 text-[11px] font-semibold transition-all border border-white/15"
              >
                <span>{item.actionLabel}</span>
                <ChevronRight className="w-3 h-3 text-amber-300" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Android System Auto-Dismiss Progress Bar */}
      {!item.persistent && (
        <div className="absolute bottom-0 inset-x-0 h-1 bg-black/40 overflow-hidden">
          <div
            className={`h-full ${styles.progressBg} transition-all duration-75`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};

export const AndroidNotificationBanner: React.FC<AndroidNotificationBannerProps> = ({
  notifications,
  onDismiss,
}) => {
  if (notifications.length === 0) return null;

  return (
    <div
      className="fixed top-3 sm:top-5 inset-x-0 z-50 flex flex-col items-center gap-2.5 px-3 sm:px-4 pointer-events-none"
      role="region"
      aria-live="polite"
      aria-label="Android System Notifications"
    >
      {notifications.map((item) => (
        <div key={item.id} className="pointer-events-auto w-full max-w-md animate-in slide-in-from-top-4 duration-300">
          <SingleNotificationCard item={item} onDismiss={onDismiss} />
        </div>
      ))}
    </div>
  );
};
