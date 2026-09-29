import React from 'react';
import { SupportedLanguage, AppRoute } from '../types';
import { TRANSLATIONS, TRIMBAKESHWAR_NAME_BY_LANG } from '../data/translations';
import { getFooterTranslations } from '../data/navFooterTranslations';
import { TrishulIcon } from './Motifs';
import { ArrowUp, MapPin, Phone, Clock, Mail, Heart, ShieldCheck } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

interface FooterProps {
  currentLang?: SupportedLanguage;
  onOpenBooking?: () => void;
}

export function Footer({ currentLang = 'en', onOpenBooking }: FooterProps) {
  const { navigate, openBooking } = useNavigation();
  const ft = getFooterTranslations(currentLang);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBook = () => {
    if (onOpenBooking) {
      onOpenBooking();
    } else {
      openBooking();
    }
  };

  return (
    <footer className="bg-[#1B0E0B] text-stone-300 relative border-t-2 border-[#B88935]/40 overflow-hidden font-sans select-none">
      {/* Top Ornamental Gold Accent Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#8A5A14] via-[#D4AF37] to-[#8A5A14]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#B88935]/20">
          {/* Column 1: Identity & Invocation */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-3 text-left group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-300/60 shadow-md shrink-0 bg-white p-0.5 flex items-center justify-center">
                <img
                  src="/assets/purohit-profile.png"
                  alt="श्री क्षेत्र त्र्यंबकेश्वर पुरोहित संघ Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold font-devanagari text-amber-100">
                  {TRIMBAKESHWAR_NAME_BY_LANG[currentLang] || ft.brandTitle}
                </h3>
                <div className="text-xs text-amber-300/80 font-sans tracking-widest uppercase">
                  {ft.brandTagline}
                </div>
              </div>
            </button>

            <p className="text-xs text-stone-400 leading-relaxed font-sans">
              {ft.missionDesc}
            </p>

            <div className="p-3.5 rounded-xl bg-black/40 border border-amber-400/20 text-xs text-amber-200/90 font-devanagari leading-relaxed">
              ॥ ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् ।<br />
              उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात् ॥
            </div>
          </div>

          {/* Column 2: Temple & Heritage Links */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-amber-200 uppercase tracking-wider font-heading mb-4 border-b border-amber-400/20 pb-1">
              {ft.tirthakshetraHeading}
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => navigate('/temple')} className="hover:text-amber-200 transition-colors text-left cursor-pointer">
                  {ft.templeHeritage}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/jyotirlinga')} className="hover:text-amber-200 transition-colors text-left cursor-pointer">
                  {ft.theSacredJyotirlinga}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/temple/story')} className="hover:text-amber-200 transition-colors text-left cursor-pointer">
                  {ft.theSacredStory}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/darshan')} className="hover:text-amber-200 transition-colors text-left cursor-pointer">
                  {ft.darshanTimings}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/temple-guide')} className="hover:text-amber-200 transition-colors text-left cursor-pointer">
                  {ft.pilgrimGuide}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/sacred-places')} className="hover:text-amber-200 transition-colors text-left cursor-pointer">
                  {ft.sacredPlaces}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/festivals')} className="hover:text-amber-200 transition-colors text-left cursor-pointer">
                  {ft.festivals}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/travel')} className="hover:text-amber-200 transition-colors text-left cursor-pointer">
                  {ft.howToReach}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/articles')} className="hover:text-amber-200 transition-colors text-left cursor-pointer">
                  {ft.articles}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/gallery')} className="hover:text-amber-200 transition-colors text-left cursor-pointer">
                  {ft.gallery}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Sacred Vidhis */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-amber-200 uppercase tracking-wider font-heading mb-4 border-b border-amber-400/20 pb-1">
              {ft.pujaHeading}
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => navigate('/puja/narayan-nagbali')}
                  className="hover:text-amber-200 transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <span className="text-[#C56A18]">•</span>
                  <span>नारायण नागबळी (Narayan Nagbali)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/puja/tripindi-shraddha')}
                  className="hover:text-amber-200 transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <span className="text-[#C56A18]">•</span>
                  <span>त्रिपिंडी श्राद्ध (Tripindi Shraddha)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/puja/kaal-sarp-yog')}
                  className="hover:text-amber-200 transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <span className="text-[#C56A18]">•</span>
                  <span>कालसर्प योग शांती (Kaal Sarp Shanti)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/puja/kumbh-vivah')}
                  className="hover:text-amber-200 transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <span className="text-[#C56A18]">•</span>
                  <span>कुंभ विवाह (Kumbh Vivah)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/puja/maha-mrityunjaya')}
                  className="hover:text-amber-200 transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <span className="text-[#C56A18]">•</span>
                  <span>महामृत्युंजय जप (Mrityunjaya Jaap)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/puja/rudrabhishek')}
                  className="hover:text-amber-200 transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <span className="text-[#C56A18]">•</span>
                  <span>रुद्राभिषेक (Rudrabhishek)</span>
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={handleBook}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold text-[#211D19] bg-gradient-to-r from-amber-300 to-amber-400 hover:bg-amber-400 transition-all shadow-xs cursor-pointer whitespace-nowrap shrink-0"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  <span className="whitespace-nowrap shrink-0" style={{ whiteSpace: 'nowrap' }}>{ft.bookVidhiNow}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Seva Assistance */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-amber-200 uppercase tracking-wider font-heading mb-4 border-b border-amber-400/20 pb-1">
              {ft.assistanceHeading}
            </h4>
            <div className="space-y-3 text-xs text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <a
                  href="https://share.google/YsotIiu38IlI8yFEu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-200 transition-colors"
                  title="Open in Google Maps"
                >
                  <span>{ft.address}</span>
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{ft.darshanTimeText}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{ft.helpline}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:trimbak.tirthapurohit@gmail.com" className="hover:text-amber-200 transition-colors">
                  trimbak.tirthapurohit@gmail.com
                </a>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-black/40 border border-white/10 text-[11px] text-stone-400 space-y-1">
              <div className="flex items-center gap-1 text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{ft.guaranteeTitle}</span>
              </div>
              <p>{ft.guaranteeDesc}</p>
            </div>
          </div>
        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex flex-wrap items-center gap-4">
            <span>© {new Date().getFullYear()} {ft.copyright}</span>
            <button onClick={() => navigate('/about')} className="hover:text-stone-300">About</button>
            <button onClick={() => navigate('/contact')} className="hover:text-stone-300">Contact</button>
            <button onClick={() => navigate('/faqs')} className="hover:text-stone-300">FAQs</button>
            <button onClick={() => navigate('/articles')} className="hover:text-stone-300">Articles</button>
            <button onClick={() => navigate('/gallery')} className="hover:text-stone-300">Gallery</button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-devanagari text-amber-400/90">{ft.harHarMahadev}</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-stone-800 hover:bg-[#5A1717] text-stone-300 hover:text-white transition-colors cursor-pointer"
              title="Scroll to top"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
