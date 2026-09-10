import React from 'react';
import { SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { ArrowRight, Compass, Flame, Users, CalendarDays } from 'lucide-react';
import { TempleIcon, TrishulIcon, PranamHandsIcon, LotusIcon } from './Motifs';

interface QuickActionsProps {
  currentLang: SupportedLanguage;
  onOpenBooking: () => void;
}

export function QuickActions({ currentLang, onOpenBooking }: QuickActionsProps) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const actions = [
    {
      id: 'action-darshan',
      icon: <TempleIcon className="w-6 h-6 text-[#5A1717]" />,
      title: t.card1Title,
      description: t.card1Desc,
      buttonText: t.card1Btn,
      href: '#temple',
      isBooking: false,
      accentColor: 'border-[#B88935]/40',
    },
    {
      id: 'action-puja',
      icon: <TrishulIcon className="w-6 h-6 text-[#C56A18]" />,
      title: t.card2Title,
      description: t.card2Desc,
      buttonText: t.card2Btn,
      href: '#puja',
      isBooking: false,
      accentColor: 'border-[#C56A18]/40',
    },
    {
      id: 'action-guruji',
      icon: <PranamHandsIcon className="w-6 h-6 text-[#5A1717]" />,
      title: t.card3Title,
      description: t.card3Desc,
      buttonText: t.card3Btn,
      href: '#guruji',
      isBooking: false,
      accentColor: 'border-[#5A1717]/30',
    },
    {
      id: 'action-book',
      icon: <LotusIcon className="w-6 h-6 text-[#C56A18]" />,
      title: t.card4Title,
      description: t.card4Desc,
      buttonText: t.card4Btn,
      href: '#book-puja',
      isBooking: true,
      accentColor: 'border-[#B88935]/60',
    },
  ];

  return (
    <section id="quick-actions" className="relative z-30 -mt-10 sm:-mt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Floating Container Card */}
      <div className="bg-[#FBF6EA] rounded-2xl sm:rounded-3xl border border-[#B88935]/30 shadow-xl p-5 sm:p-8 backdrop-blur-md">
        {/* Header Title inside card */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-block text-xs uppercase tracking-widest text-[#C56A18] font-semibold mb-1 font-sans">
            {t.quickHeadingNative}
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-heading text-[#5A1717]">
            {t.quickHeadingEng}
          </h2>
        </div>

        {/* 4 Action Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {actions.map((action) => (
            <div
              key={action.id}
              id={action.id}
              className={`flex flex-col justify-between p-5 rounded-xl sm:rounded-2xl bg-[#EDE3D1]/50 border ${action.accentColor} hover:bg-[#EDE3D1] hover:-translate-y-1 hover:shadow-md transition-all duration-300 group`}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#FBF6EA] border border-[#B88935]/25 flex items-center justify-center text-2xl shadow-sm mb-4 group-hover:scale-105 transition-transform">
                  {action.icon}
                </div>
                <h3 className="text-base sm:text-lg font-bold font-heading text-[#211D19] mb-2 group-hover:text-[#5A1717] transition-colors">
                  {action.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#211D19]/75 font-sans leading-relaxed mb-4">
                  {action.description}
                </p>
              </div>

              <div>
                {action.isBooking ? (
                  <button
                    onClick={onOpenBooking}
                    className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#5A1717] to-[#C56A18] shadow-sm hover:shadow transition-all"
                  >
                    <span>{action.buttonText}</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <a
                    href={action.href}
                    className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#5A1717] bg-[#FBF6EA] border border-[#B88935]/30 hover:border-[#5A1717]/40 hover:bg-white transition-all"
                  >
                    <span>{action.buttonText}</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
