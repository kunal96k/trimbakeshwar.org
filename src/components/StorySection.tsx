import React, { useState } from 'react';
import { SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { getHomeTranslations } from '../data/homeTranslations';
import { getStoryChaptersData } from '../data/homeDataTranslations';
import { TEMPLE_STORY_CHAPTERS } from '../data/siteData';
import { ChevronRight, ChevronLeft, BookOpen, Quote } from 'lucide-react';

interface StorySectionProps {
  currentLang: SupportedLanguage;
}

export function StorySection({ currentLang }: StorySectionProps) {
  const [activeChapter, setActiveChapter] = useState(0);
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const ht = getHomeTranslations(currentLang);
  const chapters = getStoryChaptersData(currentLang);

  const current = chapters[activeChapter] || chapters[0];
  const staticChapter = TEMPLE_STORY_CHAPTERS[activeChapter] || TEMPLE_STORY_CHAPTERS[0];

  return (
    <section id="story" className="py-20 sm:py-28 bg-[#EDE3D1]/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-block text-xs uppercase tracking-widest text-[#C56A18] font-bold font-sanskrit mb-2">
            {t.storyHeadingNative}
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-heading text-[#5A1717] mb-4">
            {t.storyHeadingEng}
          </h2>
          <p className="text-stone-700 text-sm sm:text-base font-sans leading-relaxed">
            {ht.storySubtitle}
          </p>
        </div>

        {/* Desktop Chapter Navigation Tabs */}
        <div className="hidden md:flex justify-center items-center gap-3 mb-10">
          {chapters.map((chap, idx) => (
            <button
              key={chap.chapter}
              onClick={() => setActiveChapter(idx)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeChapter === idx
                  ? 'bg-[#5A1717] text-white shadow-md'
                  : 'bg-[#FBF6EA] text-stone-700 hover:bg-[#EDE3D1] border border-[#B88935]/25'
              }`}
            >
              <span className="opacity-70 font-mono">{chap.chapter}</span>
              <span className="font-sanskrit">{chap.titleNative}</span>
            </button>
          ))}
        </div>

        {/* Active Chapter Showcase Card */}
        <div className="bg-[#FBF6EA] rounded-3xl border border-[#B88935]/40 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
            {/* Image Side */}
            <div className="lg:col-span-6 relative h-64 sm:h-96 lg:h-[460px] bg-stone-200">
              <img
                src={staticChapter.image}
                alt={current.titleEng}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#241512]/80 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs text-amber-300 font-mono tracking-widest font-bold">
                  {ht.storyChapterPrefix} {current.chapter} / 03
                </span>
                <div className="text-lg sm:text-xl font-bold font-sanskrit text-amber-100">
                  {current.quote}
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#C56A18] font-bold font-mono tracking-wider uppercase mb-2">
                  <span>{ht.storyPuranaLore}</span>
                  <span>•</span>
                  <span>{ht.storyChapterPrefix} {current.chapter}</span>
                </div>

                <h3 className="text-xl sm:text-3xl font-bold font-sanskrit text-[#5A1717] mb-2">
                  {current.titleNative}
                </h3>

                <div className="text-base sm:text-lg font-heading italic text-stone-600 mb-6">
                  {current.titleEng}
                </div>

                <p className="text-sm sm:text-base text-[#211D19]/85 font-sans leading-relaxed mb-6">
                  {current.content}
                </p>

                <div className="p-4 rounded-2xl bg-[#EDE3D1]/60 border-l-4 border-[#5A1717] text-xs text-stone-700 italic">
                  "{current.puranaQuote}"
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-8 mt-6 border-t border-[#B88935]/20">
                <button
                  onClick={() => setActiveChapter((prev) => (prev > 0 ? prev - 1 : chapters.length - 1))}
                  className="p-2.5 rounded-full bg-[#EDE3D1] hover:bg-[#B88935]/30 text-[#5A1717] transition-colors flex items-center gap-1 text-xs font-semibold cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">{ht.storyPrevBtn}</span>
                </button>

                <div className="text-xs font-mono text-stone-500 font-semibold">
                  0{activeChapter + 1} / 03
                </div>

                <button
                  onClick={() => setActiveChapter((prev) => (prev < chapters.length - 1 ? prev + 1 : 0))}
                  className="p-2.5 rounded-full bg-[#5A1717] hover:bg-[#6D1B1B] text-white transition-colors flex items-center gap-1 text-xs font-semibold cursor-pointer"
                >
                  <span className="hidden sm:inline">{ht.storyNextBtn}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
