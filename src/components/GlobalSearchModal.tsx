import React, { useState, useMemo } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { Search, X, ArrowRight, BookOpen, Flame, Users, MapPin, Sparkles, HelpCircle } from 'lucide-react';
import { PUJA_LIST, GURUJI_LIST, SACRED_PLACES, FESTIVALS_LIST, ARTICLES_LIST, FAQS_LIST } from '../data/siteData';
import { AppRoute } from '../types';

interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Puja' | 'Temple' | 'Guruji' | 'Sacred Place' | 'Festival' | 'Article' | 'FAQ';
  route: AppRoute;
  icon: any;
}

export function GlobalSearchModal() {
  const { isSearchModalOpen, setIsSearchModalOpen, navigate } = useNavigation();
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const allItems: SearchResultItem[] = useMemo(() => {
    const items: SearchResultItem[] = [];

    // Main Pujas
    PUJA_LIST.forEach((p) => {
      items.push({
        id: `puja-${p.id}`,
        title: p.name,
        subtitle: `${p.marathiName} • ${p.tagline} (${p.duration})`,
        category: 'Puja',
        route: `/puja/${p.slug}` as AppRoute,
        icon: Flame,
      });
    });

    // Gurujis
    GURUJI_LIST.forEach((g) => {
      items.push({
        id: `guruji-${g.id}`,
        title: g.name,
        subtitle: `${g.titleNative} • ${g.experienceYears} yrs experience • ${g.specialties.join(', ')}`,
        category: 'Guruji',
        route: `/guruji` as AppRoute,
        icon: Users,
      });
    });

    // Sacred Places
    SACRED_PLACES.forEach((sp) => {
      items.push({
        id: `place-${sp.id}`,
        title: sp.name,
        subtitle: `${sp.nativeName} • ${sp.distanceFromTemple} • ${sp.significance}`,
        category: 'Sacred Place',
        route: `/sacred-places` as AppRoute,
        icon: MapPin,
      });
    });

    // Festivals
    FESTIVALS_LIST.forEach((f) => {
      items.push({
        id: `fest-${f.id}`,
        title: f.name,
        subtitle: `${f.nativeName} • ${f.traditionalPeriod} • ${f.significance}`,
        category: 'Festival',
        route: `/festivals` as AppRoute,
        icon: Sparkles,
      });
    });

    // Articles
    ARTICLES_LIST.forEach((a) => {
      items.push({
        id: `article-${a.id}`,
        title: a.title,
        subtitle: `${a.titleNative} • ${a.category} • ${a.summary}`,
        category: 'Article',
        route: `/articles/${a.id}` as AppRoute,
        icon: BookOpen,
      });
    });

    // FAQs
    FAQS_LIST.forEach((faq) => {
      items.push({
        id: `faq-${faq.id}`,
        title: faq.question,
        subtitle: faq.answer.slice(0, 100) + '...',
        category: 'FAQ',
        route: `/faqs` as AppRoute,
        icon: HelpCircle,
      });
    });

    // Essential Temple pages
    items.push({
      id: 'page-temple',
      title: 'Shri Trimbakeshwar Temple & History',
      subtitle: 'Peshwa architecture, Hemadpanthi Nagara style & sanctum rules',
      category: 'Temple',
      route: '/temple',
      icon: BookOpen,
    });
    items.push({
      id: 'page-jyotirlinga',
      title: 'The Sacred Jyotirlinga (Tridev)',
      subtitle: 'Brahma, Vishnu & Shiva in one sacred cavity; Suvarna Mukut',
      category: 'Temple',
      route: '/jyotirlinga',
      icon: Sparkles,
    });
    items.push({
      id: 'page-story',
      title: 'Sacred Puranic Story of Trimbakeshwar',
      subtitle: 'Sage Gautama penance, Brahmagiri & descent of Holy Godavari',
      category: 'Temple',
      route: '/temple/story',
      icon: BookOpen,
    });
    items.push({
      id: 'page-darshan',
      title: 'Darshan & Daily Aarti Timings',
      subtitle: 'Mangala aarti, general abhishek, evening mukut darshan schedule',
      category: 'Temple',
      route: '/darshan',
      icon: Sparkles,
    });
    items.push({
      id: 'page-travel',
      title: 'How to Reach Trimbakeshwar',
      subtitle: 'Road, Rail and Airport routes from Nashik, Mumbai and Pune',
      category: 'Temple',
      route: '/travel',
      icon: MapPin,
    });

    return items;
  }, []);

  const filteredResults = useMemo(() => {
    let list = allItems;
    if (selectedFilter !== 'All') {
      list = list.filter((item) => item.category === selectedFilter);
    }
    if (!query.trim()) {
      return list.slice(0, 8); // show popular/quick suggestions
    }
    const q = query.toLowerCase();
    return list.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [allItems, query, selectedFilter]);

  if (!isSearchModalOpen) return null;

  const categories = ['All', 'Puja', 'Temple', 'Guruji', 'Sacred Place', 'Festival', 'Article', 'FAQ'];

  const handleSelect = (route: AppRoute) => {
    setIsSearchModalOpen(false);
    navigate(route);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-4 pt-16 sm:pt-24 bg-black/60 backdrop-blur-xs select-none">
      <div
        className="w-full max-w-2xl bg-[#FBF6EA] border border-[#B88935]/40 rounded-2xl shadow-2xl p-4 sm:p-6 text-[#211D19] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header with Close */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#B88935]/20">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-[#5A1717] text-amber-200 flex items-center justify-center text-xs shrink-0 shadow-xs">
              ॐ
            </span>
            <div className="flex flex-col gap-0.5">
              <span className="font-heading font-bold text-sm sm:text-base text-[#5A1717] leading-snug">
                Search Trimbakeshwar Kshetra
              </span>
              <span className="text-[10px] text-stone-500 font-sans">
                Vidhis, Gurujis, Darshan & Sacred Places
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsSearchModalOpen(false)}
            className="p-1 rounded-full hover:bg-[#EDE3D1] text-stone-600 transition-colors cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input Box */}
        <div className="relative mt-3">
          <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-[#C56A18]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pujas (Narayan Nagbali, Kaal Sarp), Gurujis, Darshan, Places..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-300 bg-white text-sm text-[#211D19] focus:outline-hidden focus:ring-2 focus:ring-[#B88935]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedFilter === cat
                  ? 'bg-[#5A1717] text-white font-semibold'
                  : 'bg-[#EDE3D1]/60 text-stone-700 hover:bg-[#EDE3D1]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="mt-2 max-h-72 overflow-y-auto space-y-1.5 pr-1">
          {filteredResults.length === 0 ? (
            <div className="py-8 text-center text-xs text-stone-500">
              No results found for "{query}". Try searching for Narayan Nagbali, Darshan timings, or Kushavarta.
            </div>
          ) : (
            filteredResults.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.route)}
                  className="w-full text-left p-2.5 rounded-xl border border-stone-200/60 bg-white/70 hover:bg-white hover:border-[#B88935]/40 hover:shadow-xs flex items-start gap-3 transition-all group cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#EDE3D1] text-[#5A1717] flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#5A1717] group-hover:text-[#C56A18] truncate">
                        {item.title}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 font-medium">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-600 line-clamp-1 mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#5A1717] shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              );
            })
          )}
        </div>

        {/* Footer Quick Links */}
        <div className="mt-4 pt-3 border-t border-[#B88935]/20 flex items-center justify-between text-[11px] text-stone-500">
          <span>Press ESC or click anywhere outside to close</span>
          <button
            onClick={() => handleSelect('/puja')}
            className="text-[#5A1717] font-semibold hover:underline"
          >
            Browse all Pujas →
          </button>
        </div>
      </div>
    </div>
  );
}
