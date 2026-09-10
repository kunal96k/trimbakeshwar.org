import React, { useEffect } from 'react';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { Header } from './components/Header';
import { MobileBottomBar } from './components/MobileBottomBar';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';

// Pages
import { HomePage } from './pages/HomePage';
import { TempleOverviewPage } from './pages/TempleOverviewPage';
import { JyotirlingaPage } from './pages/JyotirlingaPage';
import { TempleStoryPage } from './pages/TempleStoryPage';
import { DarshanTimingsPage } from './pages/DarshanTimingsPage';
import { TempleGuidePage } from './pages/TempleGuidePage';
import { TravelGuidePage } from './pages/TravelGuidePage';
import { PujaDirectoryPage } from './pages/PujaDirectoryPage';
import { PujaDetailPage } from './pages/PujaDetailPage';
import { GurujiDirectoryPage } from './pages/GurujiDirectoryPage';
import { SacredPlacesPage } from './pages/SacredPlacesPage';
import { FestivalsPage } from './pages/FestivalsPage';
import { ArticlesPage } from './pages/ArticlesPage';
import { GalleryPage } from './pages/GalleryPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FaqsPage } from './pages/FaqsPage';

function MainRouter() {
  const {
    currentRoute,
    currentLang,
    isBookingOpen,
    closeBooking,
    selectedPujaForBooking,
    selectedGurujiForBooking,
  } = useNavigation();

  // Scroll to top upon navigating to any route
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentRoute]);

  const renderActiveView = () => {
    // 1. Home
    if (currentRoute === '/') {
      return <HomePage />;
    }

    // 2. Temple & Sanctum
    if (currentRoute === '/temple') {
      return <TempleOverviewPage />;
    }
    if (currentRoute === '/jyotirlinga') {
      return <JyotirlingaPage />;
    }
    if (currentRoute === '/temple/story') {
      return <TempleStoryPage />;
    }
    if (currentRoute === '/darshan') {
      return <DarshanTimingsPage />;
    }
    if (currentRoute === '/temple-guide') {
      return <TempleGuidePage />;
    }
    if (currentRoute === '/travel') {
      return <TravelGuidePage />;
    }

    // 3. Puja Directory & Dynamic Details
    if (currentRoute === '/puja') {
      return <PujaDirectoryPage />;
    }
    if (currentRoute.startsWith('/puja/')) {
      const slug = currentRoute.replace('/puja/', '').trim();
      return <PujaDetailPage slug={slug} />;
    }

    // 4. Gurujis
    if (currentRoute === '/guruji') {
      return <GurujiDirectoryPage />;
    }

    // 5. Sacred Places & Kunds
    if (currentRoute === '/sacred-places') {
      return <SacredPlacesPage />;
    }

    // 6. Festivals
    if (currentRoute === '/festivals') {
      return <FestivalsPage />;
    }

    // 7. Articles
    if (currentRoute === '/articles' || currentRoute.startsWith('/articles/')) {
      return <ArticlesPage />;
    }

    // 8. Gallery
    if (currentRoute === '/gallery' || currentRoute.startsWith('/gallery/')) {
      return <GalleryPage />;
    }

    // 9. About, Contact & FAQs
    if (currentRoute === '/about') {
      return <AboutPage />;
    }
    if (currentRoute === '/contact' || currentRoute.endsWith('/contact')) {
      return <ContactPage />;
    }
    if (currentRoute === '/faqs') {
      return <FaqsPage />;
    }

    // Default fallback
    return <HomePage />;
  };

  return (
    <div className="min-h-screen bg-[#FBF6EA] text-[#211D19] selection:bg-[#C56A18] selection:text-white flex flex-col font-sans antialiased pb-16 md:pb-0">
      {/* Top Header with MegaMenu and Language selector */}
      <Header />

      {/* Main Routed Page Content */}
      <main className="flex-grow">
        {renderActiveView()}
      </main>

      {/* Comprehensive Temple Footer */}
      <Footer currentLang={currentLang} />

      {/* Floating Mobile Bottom Navigation Bar */}
      <MobileBottomBar />

      {/* Global Quick Search Modal (Cmd+K / Search button) */}
      <GlobalSearchModal />

      {/* 5-Step Interactive Booking Wizard */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={closeBooking}
        currentLang={currentLang}
        initialVidhiId={selectedPujaForBooking}
        initialGurujiId={selectedGurujiForBooking}
      />
    </div>
  );
}

export default function App() {
  return (
    <NavigationProvider>
      <MainRouter />
    </NavigationProvider>
  );
}
