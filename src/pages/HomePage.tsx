import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { Hero } from '../components/Hero';
import { QuickActions } from '../components/QuickActions';
import { TempleIntro } from '../components/TempleIntro';
import { JyotirlingaSection } from '../components/JyotirlingaSection';
import { ShlokaSection } from '../components/ShlokaSection';
import { PujaSection } from '../components/PujaSection';
import { BookingCtaSection } from '../components/BookingCtaSection';
import { GurujiSection } from '../components/GurujiSection';
import { TraditionSection } from '../components/TraditionSection';
import { SacredPlacesSection } from '../components/SacredPlacesSection';
import { StorySection } from '../components/StorySection';
import { FestivalsSection } from '../components/FestivalsSection';
import { DarshanInfoSection } from '../components/DarshanInfoSection';
import { HowToReachSection } from '../components/HowToReachSection';
import { DevoteeExperiences } from '../components/DevoteeExperiences';
import { FaqSection } from '../components/FaqSection';

export function HomePage() {
  const { currentLang, openBooking, navigate } = useNavigation();

  return (
    <div className="flex-grow">
      {/* 1. Cinematic Hero Section with Sanskrit Invocations */}
      <Hero
        currentLang={currentLang}
        onOpenBooking={() => openBooking()}
      />

      {/* 2. Floating Quick Action Cards */}
      <QuickActions
        currentLang={currentLang}
        onOpenBooking={() => openBooking()}
      />

      {/* 3. Editorial Temple & Godavari Introduction */}
      <TempleIntro currentLang={currentLang} />

      {/* 4. Immersive Dark Jyotirlinga Section */}
      <JyotirlingaSection currentLang={currentLang} />

      {/* 5. Sacred Sanskrit Shloka & Invocation */}
      <ShlokaSection currentLang={currentLang} />

      {/* 6. Traditional Pujas & Vidhis (6 Cards + Details Modal) */}
      <PujaSection
        currentLang={currentLang}
        onOpenBooking={(vidhiId) => openBooking(vidhiId)}
      />

      {/* 7. On-page Visual 5-Step Booking Flow Banner */}
      <BookingCtaSection
        currentLang={currentLang}
        onOpenBooking={() => openBooking()}
        onContactGuruji={() => navigate('/guruji')}
      />

      {/* 8. Gurujis Section (Verified Hereditary Purohit Profiles) */}
      <GurujiSection
        currentLang={currentLang}
        onOpenBooking={(vidhiId, gurujiId) => openBooking(vidhiId, gurujiId)}
      />

      {/* 9. Tamrapatra Tradition & Purohit Heritage Section */}
      <TraditionSection currentLang={currentLang} />

      {/* 10. Sacred Places Around Trimbakeshwar */}
      <SacredPlacesSection currentLang={currentLang} />

      {/* 11. Temple Lore & Puranic Story */}
      <StorySection currentLang={currentLang} />

      {/* 12. Festivals & Processions */}
      <FestivalsSection currentLang={currentLang} />

      {/* 13. Latest Darshan Schedule & Sanctum Etiquette */}
      <DarshanInfoSection currentLang={currentLang} />

      {/* 14. How to Reach Trimbakeshwar (Road, Train, Air) */}
      <HowToReachSection currentLang={currentLang} />

      {/* 15. Devotee Experiences & Reviews */}
      <DevoteeExperiences currentLang={currentLang} />


      {/* 17. Frequently Asked Questions Accordion */}
      <FaqSection currentLang={currentLang} />
    </div>
  );
}
