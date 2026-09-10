import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigation } from '../context/NavigationContext';
import { SupportedLanguage, AppRoute } from '../types';
import { LANGUAGES, TRIMBAKESHWAR_NAME_BY_LANG } from '../data/translations';
import { getNavTranslations } from '../data/navFooterTranslations';
import { 
  ChevronDown, 
  Search, 
  Globe, 
  Menu, 
  X, 
  ArrowRight, 
  Compass, 
  Sparkles,
  BookOpen,
  Calendar,
  Clock,
  ShieldCheck,
  Check,
  Landmark,
  Flame,
  Users,
  Image as ImageIcon,
  Info,
  HelpCircle,
  Phone,
  ChevronRight
} from 'lucide-react';
import { SacredMandala, TrishulIcon, LotusIcon, OmSymbol, NagDevtaIcon, VivahKnotIcon, RudrakshaMalaIcon, TempleIcon } from './Motifs';

type MobileAccordionSection = 'temple' | 'puja' | 'lang' | null;

interface HeaderProps {
  onOpenBooking?: () => void;
}

export function Header({ onOpenBooking }: HeaderProps) {
  const { currentRoute, navigate, currentLang, setLanguage, setIsSearchModalOpen } = useNavigation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [pujaMenuOpen, setPujaMenuOpen] = useState(false);
  const [templeMenuOpen, setTempleMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMobileAccordion, setActiveMobileAccordion] = useState<MobileAccordionSection>(null);

  const toggleMobileAccordion = (section: MobileAccordionSection) => {
    setActiveMobileAccordion((prev) => (prev === section ? null : section));
  };

  const pujaMenuRef = useRef<HTMLDivElement>(null);
  const templeMenuRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Determine if header should be in solid ivory state (always solid on inner pages or when scrolled)
  const isSolidHeader = isScrolled || currentRoute !== '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle outside clicks and escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pujaMenuRef.current && !pujaMenuRef.current.contains(event.target as Node)) {
        setPujaMenuOpen(false);
      }
      if (templeMenuRef.current && !templeMenuRef.current.contains(event.target as Node)) {
        setTempleMenuOpen(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPujaMenuOpen(false);
        setTempleMenuOpen(false);
        setLangDropdownOpen(false);
        setMobileMenuOpen(false);
        setActiveMobileAccordion(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleNavClick = (route: AppRoute) => {
    navigate(route);
    setPujaMenuOpen(false);
    setTempleMenuOpen(false);
    setMobileMenuOpen(false);
    setActiveMobileAccordion(null);
  };

  const handleBookClick = () => {
    setMobileMenuOpen(false);
    setActiveMobileAccordion(null);
    if (onOpenBooking) {
      onOpenBooking();
    } else {
      navigate('/booking');
    }
  };

  const currentLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];
  const navT = getNavTranslations(currentLang);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 select-none ${
        isSolidHeader
          ? 'bg-[#FBF6EA]/95 backdrop-blur-md border-b border-[#B88935]/25 shadow-sm py-2 sm:py-2.5 text-[#211D19]'
          : 'bg-transparent border-b-0 border-transparent shadow-none py-3 sm:py-4 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between">
        {/* Left: Temple Logo & Brand */}
        <button
          onClick={() => handleNavClick('/')}
          className="flex items-center gap-2.5 sm:gap-3 text-left group focus:outline-hidden cursor-pointer"
          title={`श्री क्षेत्र त्र्यंबकेश्वर पुरोहित संघ • ${TRIMBAKESHWAR_NAME_BY_LANG[currentLang] || 'TRIMBAKESHWAR'}`}
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-[#D4AF37]/80 shadow-md shrink-0 bg-white p-0.5 flex items-center justify-center">
            <img
              src="/assets/purohit-profile.png"
              alt="श्री क्षेत्र त्र्यंबकेश्वर पुरोहित संघ Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <span
              className={`font-bold text-sm sm:text-base transition-colors ${
                currentLang === 'en' ? 'font-heading tracking-wider' : 'font-devanagari tracking-normal'
              } ${
                isSolidHeader ? 'text-[#5A1717] group-hover:text-[#C56A18]' : 'text-white group-hover:text-amber-200'
              }`}
            >
              {TRIMBAKESHWAR_NAME_BY_LANG[currentLang] || 'TRIMBAKESHWAR'}
            </span>
            <span
              className={`text-[10px] sm:text-[11px] font-devanagari font-medium transition-colors ${
                isSolidHeader ? 'text-[#B88935]' : 'text-amber-300/90'
              }`}
            >
              श्री क्षेत्र त्र्यंबकेश्वर पुरोहित संघ
            </span>
          </div>
        </button>

        {/* Center: Desktop Navigation Bar */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2" aria-label="Main Navigation">
          {/* Temple Dropdown */}
          <div className="relative" ref={templeMenuRef}>
            <button
              onClick={() => {
                setTempleMenuOpen(!templeMenuOpen);
                setPujaMenuOpen(false);
                setLangDropdownOpen(false);
              }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-colors ${
                isSolidHeader
                  ? 'text-[#211D19] hover:bg-[#EDE3D1] hover:text-[#5A1717]'
                  : 'text-stone-200 hover:bg-white/10 hover:text-white'
              }`}
              aria-expanded={templeMenuOpen}
            >
              <span>{navT.temple}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${templeMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Temple Dropdown Menu */}
            {templeMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-[#FBF6EA] border border-[#B88935]/30 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in-50 zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[11px] font-bold text-[#5A1717] uppercase tracking-wider border-b border-[#B88935]/15 mb-1">
                  {navT.templeMenuTitle}
                </div>
                <button
                  onClick={() => handleNavClick('/temple')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs text-[#211D19] hover:bg-[#EDE3D1] hover:text-[#5A1717] flex items-center justify-between group transition-colors"
                >
                  <div>
                    <div className="font-semibold">{navT.templeOverview}</div>
                    <div className="text-[10px] text-stone-500">{navT.templeOverviewDesc}</div>
                  </div>
                  <ArrowRight className="w-3 h-3 text-stone-400 group-hover:text-[#5A1717] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <button
                  onClick={() => handleNavClick('/jyotirlinga')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs text-[#211D19] hover:bg-[#EDE3D1] hover:text-[#5A1717] flex items-center justify-between group transition-colors"
                >
                  <div>
                    <div className="font-semibold">{navT.theSacredJyotirlinga}</div>
                    <div className="text-[10px] text-stone-500">{navT.theSacredJyotirlingaDesc}</div>
                  </div>
                  <ArrowRight className="w-3 h-3 text-stone-400 group-hover:text-[#5A1717] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <button
                  onClick={() => handleNavClick('/temple/story')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs text-[#211D19] hover:bg-[#EDE3D1] hover:text-[#5A1717] flex items-center justify-between group transition-colors"
                >
                  <div>
                    <div className="font-semibold">{navT.sacredStory}</div>
                    <div className="text-[10px] text-stone-500">{navT.sacredStoryDesc}</div>
                  </div>
                  <ArrowRight className="w-3 h-3 text-stone-400 group-hover:text-[#5A1717] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <button
                  onClick={() => handleNavClick('/darshan')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs text-[#211D19] hover:bg-[#EDE3D1] hover:text-[#5A1717] flex items-center justify-between group transition-colors"
                >
                  <div>
                    <div className="font-semibold">{navT.darshanTimings}</div>
                    <div className="text-[10px] text-stone-500">{navT.darshanTimingsDesc}</div>
                  </div>
                  <ArrowRight className="w-3 h-3 text-stone-400 group-hover:text-[#5A1717] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <button
                  onClick={() => handleNavClick('/temple-guide')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs text-[#211D19] hover:bg-[#EDE3D1] hover:text-[#5A1717] flex items-center justify-between group transition-colors"
                >
                  <div>
                    <div className="font-semibold">{navT.practicalGuide}</div>
                    <div className="text-[10px] text-stone-500">{navT.practicalGuideDesc}</div>
                  </div>
                  <ArrowRight className="w-3 h-3 text-stone-400 group-hover:text-[#5A1717] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <button
                  onClick={() => handleNavClick('/travel')}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs text-[#211D19] hover:bg-[#EDE3D1] hover:text-[#5A1717] flex items-center justify-between group transition-colors"
                >
                  <div>
                    <div className="font-semibold">{navT.howToReach}</div>
                    <div className="text-[10px] text-stone-500">{navT.howToReachDesc}</div>
                  </div>
                  <ArrowRight className="w-3 h-3 text-stone-400 group-hover:text-[#5A1717] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            )}
          </div>

          {/* Desktop Puja Mega Menu Trigger */}
          <div className="relative" ref={pujaMenuRef}>
            <button
              id="puja-nav-trigger"
              onClick={() => {
                setPujaMenuOpen(!pujaMenuOpen);
                setTempleMenuOpen(false);
                setLangDropdownOpen(false);
              }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-colors ${
                isSolidHeader
                  ? 'text-[#211D19] hover:bg-[#EDE3D1] hover:text-[#5A1717]'
                  : 'text-stone-200 hover:bg-white/10 hover:text-white'
              }`}
              aria-expanded={pujaMenuOpen}
            >
              <span>{navT.pujas}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${pujaMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Desktop Compact Premium Mega-Menu Dropdown */}
            {pujaMenuOpen && (
              <div
                id="puja-desktop-mega-menu"
                className="absolute top-full left-0 mt-2 w-[420px] max-w-[calc(100vw-2rem)] bg-[#FBF6EA] border border-[#B88935]/30 rounded-2xl shadow-xl p-4 z-50 text-[#211D19] animate-in fade-in-50 zoom-in-95 duration-150"
              >
                {/* Header Title */}
                <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#B88935]/20">
                  <div className="flex items-center gap-2">
                    <span className="text-[#5A1717] font-bold text-xs uppercase tracking-wider font-heading">
                      {navT.drawerPujaSection}
                    </span>
                    <span className="text-[10px] text-[#B88935] font-devanagari">
                      • {navT.drawerPujaSub}
                    </span>
                  </div>
                </div>

                {/* 2-Column Compact Grid */}
                <div className="grid grid-cols-2 gap-1.5 py-1">
                  <button
                    onClick={() => handleNavClick('/puja/narayan-nagbali')}
                    className="w-full text-left px-2.5 py-2 rounded-xl text-xs text-[#5A1717] hover:bg-[#EDE3D1] hover:text-[#C56A18] font-medium flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <LotusIcon className="w-4 h-4 text-[#C56A18] shrink-0" />
                    <span className="truncate">Narayan Nagbali</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('/puja/tripindi-shraddha')}
                    className="w-full text-left px-2.5 py-2 rounded-xl text-xs text-[#5A1717] hover:bg-[#EDE3D1] hover:text-[#C56A18] font-medium flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <OmSymbol className="w-4 h-4 text-[#C56A18] shrink-0" />
                    <span className="truncate">Tripindi Shraddha</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('/puja/kaal-sarp-yog')}
                    className="w-full text-left px-2.5 py-2 rounded-xl text-xs text-[#5A1717] hover:bg-[#EDE3D1] hover:text-[#C56A18] font-medium flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <NagDevtaIcon className="w-4 h-4 text-[#C56A18] shrink-0" />
                    <span className="truncate">Kaal Sarp Yog</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('/puja/kumbh-vivah')}
                    className="w-full text-left px-2.5 py-2 rounded-xl text-xs text-[#5A1717] hover:bg-[#EDE3D1] hover:text-[#C56A18] font-medium flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <VivahKnotIcon className="w-4 h-4 text-[#C56A18] shrink-0" />
                    <span className="truncate">Kumbh Vivah</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('/puja/maha-mrityunjaya')}
                    className="w-full text-left px-2.5 py-2 rounded-xl text-xs text-[#5A1717] hover:bg-[#EDE3D1] hover:text-[#C56A18] font-medium flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <RudrakshaMalaIcon className="w-4 h-4 text-[#C56A18] shrink-0" />
                    <span className="truncate">Maha Mrityunjaya</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('/puja/rudrabhishek')}
                    className="w-full text-left px-2.5 py-2 rounded-xl text-xs text-[#5A1717] hover:bg-[#EDE3D1] hover:text-[#C56A18] font-medium flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <TrishulIcon className="w-4 h-4 text-[#C56A18] shrink-0" />
                    <span className="truncate">Rudrabhishek</span>
                  </button>
                </div>

                {/* Footer Link */}
                <div className="pt-2.5 mt-2 border-t border-[#B88935]/20 flex items-center justify-between">
                  <button
                    onClick={() => handleNavClick('/puja')}
                    className="text-xs font-semibold text-[#5A1717] hover:text-[#C56A18] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>{navT.exploreAllPujas}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] text-stone-500">Authorized Hereditary Purohits</span>
                </div>
              </div>
            )}
          </div>

          {/* Guruji */}
          <button
            onClick={() => handleNavClick('/guruji')}
            className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-colors ${
              currentRoute === '/guruji'
                ? 'text-[#5A1717] font-semibold bg-[#EDE3D1]/80'
                : isSolidHeader
                ? 'text-[#211D19] hover:bg-[#EDE3D1] hover:text-[#5A1717]'
                : 'text-stone-200 hover:bg-white/10 hover:text-white'
            }`}
          >
            {navT.guruji}
          </button>

          {/* Articles */}
          <button
            onClick={() => handleNavClick('/articles')}
            className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-colors ${
              currentRoute === '/articles' || currentRoute.startsWith('/articles/')
                ? 'text-[#5A1717] font-semibold bg-[#EDE3D1]/80'
                : isSolidHeader
                ? 'text-[#211D19] hover:bg-[#EDE3D1] hover:text-[#5A1717]'
                : 'text-stone-200 hover:bg-white/10 hover:text-white'
            }`}
          >
            {navT.articles}
          </button>

          {/* Gallery */}
          <button
            onClick={() => handleNavClick('/gallery')}
            className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-colors ${
              currentRoute === '/gallery'
                ? 'text-[#5A1717] font-semibold bg-[#EDE3D1]/80'
                : isSolidHeader
                ? 'text-[#211D19] hover:bg-[#EDE3D1] hover:text-[#5A1717]'
                : 'text-stone-200 hover:bg-white/10 hover:text-white'
            }`}
          >
            {navT.gallery}
          </button>

          {/* About */}
          <button
            onClick={() => handleNavClick('/about')}
            className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-colors ${
              currentRoute === '/about'
                ? 'text-[#5A1717] font-semibold bg-[#EDE3D1]/80'
                : isSolidHeader
                ? 'text-[#211D19] hover:bg-[#EDE3D1] hover:text-[#5A1717]'
                : 'text-stone-200 hover:bg-white/10 hover:text-white'
            }`}
          >
            {navT.about}
          </button>
        </nav>

        {/* Right Action Icons & Book Button: Language Selector, Search, Book Puja */}
        <div className="flex items-center space-x-2 sm:space-x-2.5">
          {/* Language Selector Dropdown */}
          <div className="relative" ref={langDropdownRef}>
            <button
              id="lang-selector-button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer backdrop-blur-md shadow-xs ${
                langDropdownOpen
                  ? 'border-[#B88935] bg-[#EDE3D1] text-[#5A1717] ring-2 ring-[#B88935]/25'
                  : isSolidHeader
                  ? 'border-[#B88935]/35 bg-[#EDE3D1]/60 text-[#211D19] hover:border-[#B88935] hover:bg-[#EDE3D1]'
                  : 'border-amber-300/35 bg-black/40 text-stone-100 hover:border-amber-300/70 hover:bg-black/60'
              }`}
              aria-expanded={langDropdownOpen}
              aria-label="Select Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#E27E23]" />
              <span className="font-devanagari font-semibold">{currentLangObj.nativeName}</span>
              <span className="text-[10px] opacity-75 font-mono uppercase px-1 py-0.5 rounded bg-black/10">
                {currentLangObj.code}
              </span>
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-200 ${
                  langDropdownOpen ? 'rotate-180 text-[#C56A18]' : 'opacity-70'
                }`}
              />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 top-full mt-2.5 w-72 sm:w-80 bg-[#FBF6EA]/98 backdrop-blur-xl border border-[#B88935]/40 rounded-2xl shadow-2xl p-3 z-50 text-[#211D19] animate-in fade-in-50 zoom-in-95 duration-150">
                {/* Dropdown Header */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#B88935]/20 px-1">
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-[#C56A18]" />
                    <span className="text-[11px] font-bold text-[#5A1717] uppercase tracking-wider font-heading">
                      Language / भाषा निवडा
                    </span>
                  </div>
                  <span className="text-[9px] font-semibold text-[#5A1717] bg-[#EDE3D1] px-2 py-0.5 rounded-full border border-[#B88935]/25 font-mono">
                    10 Languages
                  </span>
                </div>

                {/* 2-Column Grid of 10 Languages - NO ugly scrollbar, perfectly visible */}
                <div className="grid grid-cols-2 gap-1.5">
                  {LANGUAGES.map((lang) => {
                    const isSelected = currentLang === lang.code;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-2 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer group ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#5A1717] to-[#7B1F1F] text-white font-semibold shadow-xs border border-[#B88935]/50'
                            : 'bg-[#EDE3D1]/50 text-[#211D19] hover:bg-[#EDE3D1] hover:text-[#5A1717] border border-transparent hover:border-[#B88935]/30'
                        }`}
                      >
                        <div className="flex flex-col min-w-0 pr-1">
                          <span className={`font-devanagari font-bold truncate ${isSelected ? 'text-white' : 'text-[#211D19] group-hover:text-[#5A1717]'}`}>
                            {lang.nativeName}
                          </span>
                          <span className={`text-[10px] font-sans ${isSelected ? 'text-amber-200/90' : 'text-stone-500'}`}>
                            {lang.name}
                          </span>
                        </div>
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Dropdown Footer */}
                <div className="pt-2 mt-2 border-t border-[#B88935]/15 flex items-center justify-between text-[10px] text-stone-500 px-1">
                  <span>श्री त्र्यंबकेश्वर तीर्थक्षेत्र पोर्टल</span>
                  <span className="text-[9px] text-[#B88935] font-medium">Instant Translation</span>
                </div>
              </div>
            )}
          </div>

          {/* Global Search Button with Glass Pill */}
          <button
            id="nav-search-button"
            onClick={() => setIsSearchModalOpen(true)}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs transition-all cursor-pointer backdrop-blur-md shadow-xs ${
              isSolidHeader
                ? 'border border-[#B88935]/30 bg-[#EDE3D1]/50 text-[#211D19] hover:bg-[#EDE3D1] hover:border-[#B88935]'
                : 'border border-amber-300/30 bg-black/40 text-stone-200 hover:text-white hover:bg-black/60 hover:border-amber-300/60'
            }`}
            title="Search Temple, Pujas, Gurujis, Articles (Cmd+K)"
            aria-label="Open Search"
          >
            <Search className="w-3.5 h-3.5 text-[#E27E23]" />
            <span className="hidden md:inline text-[11px] font-medium">{navT.search}</span>
            <kbd className="hidden lg:inline text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/15 border border-white/15 opacity-80">
              ⌘K
            </kbd>
          </button>

          {/* Desktop Book Puja Button */}
          <button
            id="desktop-book-puja-btn"
            onClick={handleBookClick}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#5A1717] via-[#C56A18] to-[#996B1E] hover:from-[#6D1B1B] hover:to-[#B88935] border border-amber-300/40 shadow-sm hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] active:scale-95 transition-all cursor-pointer"
          >
            <TrishulIcon className="w-3.5 h-3.5 text-amber-200 shrink-0" />
            <span>{navT.bookPuja}</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => {
              if (!mobileMenuOpen) {
                setActiveMobileAccordion(null);
              }
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className={`p-2 rounded-full lg:hidden transition-colors cursor-pointer border ${
              isSolidHeader
                ? 'border-[#B88935]/30 hover:bg-[#EDE3D1] text-[#211D19]'
                : 'border-white/25 bg-black/40 hover:bg-black/60 text-white'
            }`}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Fixed Backdrop Overlay and Mobile/Tablet Navigation Sidebar Drawer mounted directly into document.body to prevent containing block trapping from backdrop-filter on header */}
      {typeof document !== 'undefined' &&
        createPortal(
          <>
            {/* Fixed Backdrop Overlay for Mobile/Tablet Sidebar Drawer */}
            <div
              className={`fixed inset-0 z-[9998] bg-black/60 backdrop-blur-xs transition-opacity duration-300 ease-in-out lg:hidden ${
                mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveMobileAccordion(null);
              }}
              aria-hidden="true"
            />

            {/* Fixed Mobile/Tablet Navigation Sidebar Drawer with Slide Animation */}
            <aside
              id="mobile-nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation Sidebar"
              className={`fixed inset-y-0 right-0 z-[9999] h-screen h-[100dvh] w-[88vw] max-w-[340px] sm:max-w-sm md:max-w-md bg-[#FBF6EA] text-[#211D19] shadow-2xl border-l border-[#B88935]/30 flex flex-col transition-transform duration-300 ease-out transform lg:hidden ${
                mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
        {/* Top Header inside Sidebar Drawer */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#B88935]/20 bg-[#F4ECDC]/80 backdrop-blur-xs shrink-0">
          <button
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-2.5 text-left group focus:outline-hidden cursor-pointer"
            title={`श्री क्षेत्र त्र्यंबकेश्वर पुरोहित संघ • ${TRIMBAKESHWAR_NAME_BY_LANG[currentLang] || 'TRIMBAKESHWAR'}`}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#D4AF37]/80 shadow-md shrink-0 bg-white p-0.5 flex items-center justify-center">
              <img
                src="/assets/purohit-profile.png"
                alt="श्री क्षेत्र त्र्यंबकेश्वर पुरोहित संघ Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`font-bold text-sm text-[#5A1717] ${
                  currentLang === 'en' ? 'font-heading tracking-wider' : 'font-devanagari tracking-normal'
                }`}
              >
                {TRIMBAKESHWAR_NAME_BY_LANG[currentLang] || 'TRIMBAKESHWAR'}
              </span>
              <span className="text-[10px] font-devanagari font-medium text-[#B88935]">
                श्री क्षेत्र त्र्यंबकेश्वर पुरोहित संघ
              </span>
            </div>
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setActiveMobileAccordion(null);
            }}
            className="p-2 rounded-xl text-stone-600 hover:text-[#5A1717] hover:bg-[#EDE3D1] transition-all cursor-pointer group"
            aria-label="Close navigation sidebar"
          >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
          </button>
        </div>

        {/* Scrollable Main Content */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3.5 overscroll-contain">
          {/* Quick Search Trigger inside Drawer */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setActiveMobileAccordion(null);
              setIsSearchModalOpen(true);
            }}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#EDE3D1]/60 border border-[#B88935]/25 text-stone-600 hover:text-[#5A1717] hover:border-[#B88935]/50 transition-all text-xs group cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Search className="w-4 h-4 text-[#C56A18] group-hover:scale-110 transition-transform" />
              <span>{navT.searchPlaceholder}</span>
            </div>
            <span className="text-[10px] font-medium bg-[#FBF6EA] px-2 py-0.5 rounded-md border border-[#B88935]/20 text-stone-500">
              ⌘K
            </span>
          </button>

          {/* Accordion 1: Temple & Jyotirlinga (Only one open at a time, default closed) */}
          <div className="rounded-2xl border border-[#B88935]/20 bg-[#F4ECDC]/40 overflow-hidden transition-all">
            <button
              type="button"
              onClick={() => toggleMobileAccordion('temple')}
              className={`w-full flex items-center justify-between p-3 text-left transition-colors cursor-pointer ${
                activeMobileAccordion === 'temple'
                  ? 'bg-[#EDE3D1] text-[#5A1717]'
                  : 'hover:bg-[#EDE3D1]/60 text-[#5A1717]'
              }`}
              aria-expanded={activeMobileAccordion === 'temple'}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-[#5A1717]/10 text-[#5A1717] flex items-center justify-center text-xs shrink-0">
                  <Landmark className="w-4 h-4" />
                </span>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider font-heading">
                    {navT.drawerTempleSection}
                  </div>
                  <div className="text-[10px] text-stone-500 font-devanagari">
                    {navT.drawerTempleSub}
                  </div>
                </div>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-stone-500 transition-transform duration-300 shrink-0 ${
                  activeMobileAccordion === 'temple' ? 'rotate-180 text-[#5A1717]' : ''
                }`}
              />
            </button>

            {/* Smooth CSS Grid Height Transition */}
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                activeMobileAccordion === 'temple' ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-3 pb-3 pt-1 space-y-1 border-t border-[#B88935]/15">
                  <button
                    onClick={() => handleNavClick('/temple')}
                    className={`w-full text-left py-2 px-2.5 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      currentRoute === '/temple'
                        ? 'bg-[#5A1717] text-white font-medium'
                        : 'text-stone-700 hover:text-[#5A1717] hover:bg-[#EDE3D1]'
                    }`}
                  >
                    <span>• {navT.templeOverview}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </button>
                  <button
                    onClick={() => handleNavClick('/jyotirlinga')}
                    className={`w-full text-left py-2 px-2.5 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      currentRoute === '/jyotirlinga'
                        ? 'bg-[#5A1717] text-white font-medium'
                        : 'text-stone-700 hover:text-[#5A1717] hover:bg-[#EDE3D1]'
                    }`}
                  >
                    <span>• {navT.theSacredJyotirlinga}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </button>
                  <button
                    onClick={() => handleNavClick('/temple/story')}
                    className={`w-full text-left py-2 px-2.5 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      currentRoute === '/temple/story'
                        ? 'bg-[#5A1717] text-white font-medium'
                        : 'text-stone-700 hover:text-[#5A1717] hover:bg-[#EDE3D1]'
                    }`}
                  >
                    <span>• {navT.sacredStory}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </button>
                  <button
                    onClick={() => handleNavClick('/darshan')}
                    className={`w-full text-left py-2 px-2.5 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      currentRoute === '/darshan'
                        ? 'bg-[#5A1717] text-white font-medium'
                        : 'text-stone-700 hover:text-[#5A1717] hover:bg-[#EDE3D1]'
                    }`}
                  >
                    <span>• {navT.darshanTimings}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </button>
                  <button
                    onClick={() => handleNavClick('/temple-guide')}
                    className={`w-full text-left py-2 px-2.5 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      currentRoute === '/temple-guide'
                        ? 'bg-[#5A1717] text-white font-medium'
                        : 'text-stone-700 hover:text-[#5A1717] hover:bg-[#EDE3D1]'
                    }`}
                  >
                    <span>• {navT.practicalGuide}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </button>
                  <button
                    onClick={() => handleNavClick('/travel')}
                    className={`w-full text-left py-2 px-2.5 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      currentRoute === '/travel'
                        ? 'bg-[#5A1717] text-white font-medium'
                        : 'text-stone-700 hover:text-[#5A1717] hover:bg-[#EDE3D1]'
                    }`}
                  >
                    <span>• {navT.howToReach}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Accordion 2: Trimbakeshwar Puja (Only one open at a time, default closed) */}
          <div className="rounded-2xl border border-[#B88935]/20 bg-[#F4ECDC]/40 overflow-hidden transition-all">
            <button
              type="button"
              onClick={() => toggleMobileAccordion('puja')}
              className={`w-full flex items-center justify-between p-3 text-left transition-colors cursor-pointer ${
                activeMobileAccordion === 'puja'
                  ? 'bg-[#EDE3D1] text-[#5A1717]'
                  : 'hover:bg-[#EDE3D1]/60 text-[#5A1717]'
              }`}
              aria-expanded={activeMobileAccordion === 'puja'}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-[#C56A18]/15 text-[#C56A18] flex items-center justify-center text-xs shrink-0">
                  <Flame className="w-4 h-4" />
                </span>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider font-heading">
                    {navT.drawerPujaSection}
                  </div>
                  <div className="text-[10px] text-stone-500 font-devanagari">
                    {navT.drawerPujaSub}
                  </div>
                </div>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-stone-500 transition-transform duration-300 shrink-0 ${
                  activeMobileAccordion === 'puja' ? 'rotate-180 text-[#5A1717]' : ''
                }`}
              />
            </button>

            {/* Smooth CSS Grid Height Transition */}
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                activeMobileAccordion === 'puja' ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-3 pb-3 pt-1 space-y-1 border-t border-[#B88935]/15">
                  <button
                    onClick={() => handleNavClick('/puja')}
                    className="w-full text-left py-2 px-2.5 rounded-lg text-xs font-bold text-[#C56A18] bg-[#EDE3D1]/70 hover:bg-[#EDE3D1] flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>{navT.exploreAllPujas}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleNavClick('/puja/narayan-nagbali')}
                    className={`w-full text-left py-2 px-2.5 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      currentRoute === '/puja/narayan-nagbali'
                        ? 'bg-[#5A1717] text-white font-medium'
                        : 'text-stone-700 hover:text-[#5A1717] hover:bg-[#EDE3D1]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <LotusIcon className="w-3.5 h-3.5 text-[#C56A18] shrink-0" />
                      <span>Narayan Nagbali (3 Days)</span>
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </button>
                  <button
                    onClick={() => handleNavClick('/puja/tripindi-shraddha')}
                    className={`w-full text-left py-2 px-2.5 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      currentRoute === '/puja/tripindi-shraddha'
                        ? 'bg-[#5A1717] text-white font-medium'
                        : 'text-stone-700 hover:text-[#5A1717] hover:bg-[#EDE3D1]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <OmSymbol className="w-3.5 h-3.5 text-[#C56A18] shrink-0" />
                      <span>Tripindi Shraddha (1 Day)</span>
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </button>
                  <button
                    onClick={() => handleNavClick('/puja/kaal-sarp-yog')}
                    className={`w-full text-left py-2 px-2.5 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      currentRoute === '/puja/kaal-sarp-yog'
                        ? 'bg-[#5A1717] text-white font-medium'
                        : 'text-stone-700 hover:text-[#5A1717] hover:bg-[#EDE3D1]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <NagDevtaIcon className="w-3.5 h-3.5 text-[#C56A18] shrink-0" />
                      <span>Kaal Sarp Yog Shanti (1 Day)</span>
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </button>
                  <button
                    onClick={() => handleNavClick('/puja/kumbh-vivah')}
                    className={`w-full text-left py-2 px-2.5 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      currentRoute === '/puja/kumbh-vivah'
                        ? 'bg-[#5A1717] text-white font-medium'
                        : 'text-stone-700 hover:text-[#5A1717] hover:bg-[#EDE3D1]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <VivahKnotIcon className="w-3.5 h-3.5 text-[#C56A18] shrink-0" />
                      <span>Kumbh Vivah (1 Day)</span>
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </button>
                  <button
                    onClick={() => handleNavClick('/puja/maha-mrityunjaya')}
                    className={`w-full text-left py-2 px-2.5 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      currentRoute === '/puja/maha-mrityunjaya'
                        ? 'bg-[#5A1717] text-white font-medium'
                        : 'text-stone-700 hover:text-[#5A1717] hover:bg-[#EDE3D1]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <RudrakshaMalaIcon className="w-3.5 h-3.5 text-[#C56A18] shrink-0" />
                      <span>Maha Mrityunjaya Jaap</span>
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </button>
                  <button
                    onClick={() => handleNavClick('/puja/rudrabhishek')}
                    className={`w-full text-left py-2 px-2.5 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      currentRoute === '/puja/rudrabhishek'
                        ? 'bg-[#5A1717] text-white font-medium'
                        : 'text-stone-700 hover:text-[#5A1717] hover:bg-[#EDE3D1]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <TrishulIcon className="w-3.5 h-3.5 text-[#C56A18] shrink-0" />
                      <span>Rudrabhishek (Abhisheka)</span>
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Direct Navigation Links */}
          <div className="rounded-2xl border border-[#B88935]/20 bg-[#F4ECDC]/40 p-2 space-y-0.5">
            <button
              onClick={() => handleNavClick('/guruji')}
              className={`w-full text-left py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                currentRoute === '/guruji'
                  ? 'bg-[#5A1717] text-white'
                  : 'text-[#211D19] hover:bg-[#EDE3D1] hover:text-[#5A1717]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-[#C56A18]" />
                <span>{navT.guruji}</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>
            <button
              onClick={() => handleNavClick('/articles')}
              className={`w-full text-left py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                currentRoute === '/articles' || currentRoute.startsWith('/articles/')
                  ? 'bg-[#5A1717] text-white'
                  : 'text-[#211D19] hover:bg-[#EDE3D1] hover:text-[#5A1717]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-[#B88935]" />
                <span>{navT.articles}</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>
            <button
              onClick={() => handleNavClick('/gallery')}
              className={`w-full text-left py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                currentRoute === '/gallery'
                  ? 'bg-[#5A1717] text-white'
                  : 'text-[#211D19] hover:bg-[#EDE3D1] hover:text-[#5A1717]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ImageIcon className="w-4 h-4 text-[#C56A18]" />
                <span>{navT.gallery}</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>
            <button
              onClick={() => handleNavClick('/about')}
              className={`w-full text-left py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                currentRoute === '/about'
                  ? 'bg-[#5A1717] text-white'
                  : 'text-[#211D19] hover:bg-[#EDE3D1] hover:text-[#5A1717]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Info className="w-4 h-4 text-[#B88935]" />
                <span>{navT.about}</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>
            <button
              onClick={() => handleNavClick('/faqs')}
              className={`w-full text-left py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                currentRoute === '/faqs'
                  ? 'bg-[#5A1717] text-white'
                  : 'text-[#211D19] hover:bg-[#EDE3D1] hover:text-[#5A1717]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <HelpCircle className="w-4 h-4 text-stone-500" />
                <span>{navT.faqs}</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>
            <button
              onClick={() => handleNavClick('/contact')}
              className={`w-full text-left py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                currentRoute === '/contact'
                  ? 'bg-[#5A1717] text-white'
                  : 'text-[#211D19] hover:bg-[#EDE3D1] hover:text-[#5A1717]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-stone-500" />
                <span>{navT.contact}</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>
          </div>

          {/* Accordion 3: Language Selector / भाषा निवडा (Only one open at a time, default closed) */}
          <div className="rounded-2xl border border-[#B88935]/20 bg-[#F4ECDC]/40 overflow-hidden transition-all">
            <button
              type="button"
              onClick={() => toggleMobileAccordion('lang')}
              className={`w-full flex items-center justify-between p-3 text-left transition-colors cursor-pointer ${
                activeMobileAccordion === 'lang'
                  ? 'bg-[#EDE3D1] text-[#5A1717]'
                  : 'hover:bg-[#EDE3D1]/60 text-[#211D19]'
              }`}
              aria-expanded={activeMobileAccordion === 'lang'}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-[#B88935]/15 text-[#B88935] flex items-center justify-center text-xs shrink-0">
                  <Globe className="w-4 h-4" />
                </span>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider">
                    {navT.drawerLangSection}
                  </div>
                  <div className="text-[10px] text-stone-500">
                    Active: <span className="font-devanagari font-semibold text-[#5A1717]">{currentLangObj.nativeName}</span> ({currentLangObj.code.toUpperCase()})
                  </div>
                </div>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-stone-500 transition-transform duration-300 shrink-0 ${
                  activeMobileAccordion === 'lang' ? 'rotate-180 text-[#5A1717]' : ''
                }`}
              />
            </button>

            {/* Smooth CSS Grid Height Transition */}
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                activeMobileAccordion === 'lang' ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <div className="p-3 pt-2 border-t border-[#B88935]/15">
                  <div className="text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-2">
                    10 Languages Supported
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setActiveMobileAccordion(null);
                        }}
                        className={`px-2.5 py-2 rounded-xl text-xs flex items-center justify-between text-left transition-all cursor-pointer ${
                          currentLang === lang.code
                            ? 'bg-[#5A1717] text-white font-semibold shadow-xs'
                            : 'bg-[#EDE3D1]/70 text-stone-800 hover:bg-[#EDE3D1] hover:text-[#5A1717]'
                        }`}
                      >
                        <span className="font-devanagari font-medium">{lang.nativeName}</span>
                        <span className="text-[10px] opacity-75 uppercase font-mono">{lang.code}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Fixed Bottom CTA Bar */}
        <div className="p-4 border-t border-[#B88935]/20 bg-[#F4ECDC]/90 backdrop-blur-xs shrink-0 space-y-2">
          <button
            onClick={handleBookClick}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#5A1717] via-[#C56A18] to-[#996B1E] shadow-md hover:shadow-lg active:scale-98 transition-all cursor-pointer"
          >
            <TrishulIcon className="w-4 h-4 text-amber-200 shrink-0" />
            <span>{navT.drawerBookCta}</span>
          </button>
          <div className="text-center text-[10px] text-stone-500 font-devanagari">
            श्री त्र्यंबकेश्वर मंदिर • अधिकृत तीर्थक्षेत्र सेवा
          </div>
        </div>
      </aside>
    </>,
    document.body
  )}
    </header>
  );
}
