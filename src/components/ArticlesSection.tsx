import React, { useState } from 'react';
import { SupportedLanguage, ArticleItem } from '../types';
import { ARTICLES_LIST } from '../data/siteData';
import { BookOpen, Clock, ArrowRight, X } from 'lucide-react';

interface ArticlesSectionProps {
  currentLang: SupportedLanguage;
}

export function ArticlesSection({ currentLang }: ArticlesSectionProps) {
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);

  return (
    <section id="articles" className="py-20 sm:py-28 bg-[#FBF6EA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block text-xs uppercase tracking-widest text-[#C56A18] font-bold font-sanskrit mb-2">
            ज्ञान • कथा • अध्यात्म
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-heading text-[#5A1717] mb-4">
            Explore Spiritual Knowledge
          </h2>
          <p className="text-stone-700 text-sm sm:text-base font-sans leading-relaxed">
            In-depth scriptural insights into Trimbakeshwar Mahatmya, Vedic ritual significance, and the Puranic traditions of Godavari.
          </p>
        </div>

        {/* 6 Article Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTICLES_LIST.map((article) => (
            <div
              key={article.id}
              className="bg-[#EDE3D1]/40 rounded-2xl border border-[#B88935]/30 overflow-hidden hover:bg-[#EDE3D1]/80 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="relative h-44 overflow-hidden bg-stone-200">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#241512]/80 via-transparent to-transparent"></div>
                
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-semibold bg-[#241512]/90 text-amber-200 backdrop-blur-xs border border-white/10">
                  {article.category}
                </div>

                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <span className="text-xs font-sanskrit text-amber-200 font-semibold block">
                    {article.titleNative}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold font-heading text-[#211D19] mb-2 group-hover:text-[#5A1717] transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#211D19]/75 font-sans leading-relaxed mb-4">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#B88935]/15 flex items-center justify-between">
                  <span className="text-[11px] text-stone-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#C56A18]" />
                    {article.readTime}
                  </span>

                  <button
                    onClick={() => setSelectedArticle(article)}
                    className="text-xs font-semibold text-[#5A1717] hover:text-[#C56A18] flex items-center gap-1 group/btn"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="bg-[#FBF6EA] text-[#211D19] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#B88935]/40 shadow-2xl p-6 sm:p-8 relative"
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-200/60 hover:bg-stone-300 text-[#211D19] transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C56A18] font-sans">
                {selectedArticle.category} • {selectedArticle.readTime}
              </span>
              <h3 className="text-2xl font-bold font-sanskrit text-[#5A1717] mt-1">
                {selectedArticle.titleNative}
              </h3>
              <div className="text-base font-heading italic text-stone-600">
                {selectedArticle.title}
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden h-52 mb-6 border border-[#B88935]/30">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-4 text-sm text-[#211D19]/85 font-sans leading-relaxed mb-6">
              <p className="text-base font-medium text-[#5A1717] italic">
                "{selectedArticle.summary}"
              </p>
              <p>{selectedArticle.content}</p>
              <p>
                In the broader spiritual landscape of Maharashtra, Trimbakeshwar occupies an unparalleled position. Devotees undertaking this sacred pilgrimage do so with the intent of inner purification, honoring ancestral continuity, and expressing reverence for the cosmic forces that sustain life.
              </p>
            </div>

            <div className="flex justify-end pt-4 border-t border-[#B88935]/20">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-6 py-2 rounded-full text-xs font-semibold text-white bg-[#5A1717] hover:bg-[#6D1B1B]"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
