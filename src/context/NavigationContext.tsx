import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppRoute, SupportedLanguage } from '../types';

interface NavigationContextType {
  currentRoute: AppRoute;
  navigate: (route: AppRoute) => void;
  currentLang: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  isBookingOpen: boolean;
  openBooking: (vidhiId?: string, gurujiId?: string) => void;
  closeBooking: () => void;
  selectedPujaForBooking?: string;
  selectedGurujiForBooking?: string;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  bookingPrefill: { vidhiId?: string; gurujiId?: string };
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  // Parse initial route from pathname or hash
  const getInitialRoute = (): AppRoute => {
    if (typeof window === 'undefined') return '/';
    let hash = window.location.hash.replace(/^#/, '');
    if (hash) {
      if (!hash.startsWith('/')) hash = '/' + hash;
      return hash as AppRoute;
    }
    const path = window.location.pathname;
    if (path && path !== '/') {
      return path as AppRoute;
    }
    return '/';
  };

  const [currentRoute, setCurrentRoute] = useState<AppRoute>(getInitialRoute);
  const [currentLang, setCurrentLangState] = useState<SupportedLanguage>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('trimbak_lang');
      if (saved) return saved as SupportedLanguage;
    }
    return 'mr'; // Traditional default to Marathi for Trimbak Kshetra
  });

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState<{ vidhiId?: string; gurujiId?: string }>({});

  const setLanguage = (lang: SupportedLanguage) => {
    setCurrentLangState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('trimbak_lang', lang);
    }
  };

  const navigate = (route: AppRoute) => {
    setCurrentRoute(route);
    if (typeof window !== 'undefined') {
      // Update hash or pathname so URL is shareable and back-button works
      window.history.pushState({}, '', '#' + route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const openBooking = (vidhiId?: string, gurujiId?: string) => {
    setBookingPrefill({ vidhiId, gurujiId });
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
  };

  useEffect(() => {
    const handleUrlChange = () => {
      let hash = window.location.hash.replace(/^#/, '');
      if (hash) {
        if (!hash.startsWith('/')) hash = '/' + hash;
        setCurrentRoute(hash as AppRoute);
      } else {
        const path = window.location.pathname;
        setCurrentRoute(path as AppRoute);
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  return (
    <NavigationContext.Provider
      value={{
        currentRoute,
        navigate,
        currentLang,
        setLanguage,
        isBookingOpen,
        openBooking,
        closeBooking,
        selectedPujaForBooking: bookingPrefill.vidhiId,
        selectedGurujiForBooking: bookingPrefill.gurujiId,
        isSearchModalOpen,
        setIsSearchModalOpen,
        bookingPrefill,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
}
