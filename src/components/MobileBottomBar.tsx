import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { AppRoute } from '../types';
import { getNavTranslations } from '../data/navFooterTranslations';
import { Landmark, Flame, Users, CalendarCheck } from 'lucide-react';

export function MobileBottomBar() {
  const { currentRoute, navigate, openBooking, currentLang } = useNavigation();
  const navT = getNavTranslations(currentLang);

  const navItems = [
    { label: navT.temple, route: '/temple' as AppRoute, icon: Landmark },
    { label: navT.pujas, route: '/puja' as AppRoute, icon: Flame },
    { label: navT.guruji, route: '/guruji' as AppRoute, icon: Users },
  ];

  return (
    <nav
      aria-label="Mobile Quick Access Bar"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#FBF6EA]/95 backdrop-blur-md border-t border-[#B88935]/25 px-2 py-1.5 shadow-lg select-none"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentRoute === item.route;
          return (
            <button
              key={item.route}
              onClick={() => navigate(item.route)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                isActive ? 'text-[#5A1717] font-bold' : 'text-stone-600 hover:text-[#5A1717]'
              }`}
            >
              <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'text-[#C56A18]' : 'text-stone-500'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}

        {/* Highlighted Book Puja Button */}
        <button
          onClick={() => openBooking()}
          className="flex items-center gap-1 py-1.5 px-3 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#5A1717] to-[#C56A18] shadow-sm active:scale-95 transition-transform cursor-pointer whitespace-nowrap shrink-0"
          style={{ whiteSpace: 'nowrap' }}
        >
          <CalendarCheck className="w-3.5 h-3.5 shrink-0" />
          <span className="whitespace-nowrap shrink-0" style={{ whiteSpace: 'nowrap' }}>{navT.bookPuja}</span>
        </button>
      </div>
    </nav>
  );
}
