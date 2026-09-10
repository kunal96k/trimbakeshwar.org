import React from 'react';
import { Breadcrumbs, BreadcrumbItem } from './Breadcrumbs';
import { SacredMandala, TrishulIcon } from './Motifs';

interface InnerPageHeroProps {
  breadcrumbs: BreadcrumbItem[];
  sanskritMantra?: string;
  title: string;
  nativeTitle: string;
  description: string;
  bgImage?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  ctaIcon?: React.ReactNode;
}

export function InnerPageHero({
  breadcrumbs,
  sanskritMantra = '॥ ॐ नमः शिवाय ॥',
  title,
  nativeTitle,
  description,
  bgImage = '/assets/hero-section.png',
  ctaText,
  onCtaClick,
  ctaIcon = <TrishulIcon className="w-4 h-4 text-white" />,
}: InnerPageHeroProps) {
  return (
    <div className="relative min-h-[250px] sm:min-h-[320px] md:min-h-[380px] lg:min-h-[420px] flex items-center bg-[#241512] text-white overflow-hidden pt-20 sm:pt-24 pb-8 sm:pb-12">
      {/* Background Image with Dark & Warm Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt={title}
          className="w-full h-full object-cover object-center opacity-30 sm:opacity-35 scale-102"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#241512] via-[#241512]/75 to-[#241512]/60" />
        <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none" />
      </div>

      {/* Subtle Ambient Sacred Chakra Watermark */}
      <div className="absolute -right-24 sm:-right-12 top-1/2 -translate-y-1/2 opacity-20 sm:opacity-25 pointer-events-none hidden sm:block">
        <SacredMandala className="w-72 sm:w-96 h-72 sm:h-96 animate-[spin_120s_linear_infinite] drop-shadow-[0_0_25px_rgba(212,175,55,0.2)]" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        {/* Breadcrumb Row */}
        <div className="mb-3 sm:mb-4">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        {/* Small Sanskrit Decorative Element */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs tracking-widest font-devanagari mb-2.5 sm:mb-3 backdrop-blur-xs">
          <TrishulIcon className="w-3.5 h-3.5 text-amber-300 shrink-0" />
          <span>{sanskritMantra}</span>
        </div>

        {/* Headings */}
        <div className="max-w-3xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight leading-tight">
            {title}
          </h1>

          <div className="text-lg sm:text-xl md:text-2xl font-devanagari font-semibold text-amber-300 mt-1 sm:mt-2">
            {nativeTitle}
          </div>

          <p className="text-sm sm:text-base text-stone-300/90 mt-2.5 sm:mt-3 leading-relaxed max-w-2xl font-body">
            {description}
          </p>

          {/* Optional CTA */}
          {ctaText && onCtaClick && (
            <div className="mt-4 sm:mt-6 flex items-center gap-3">
              <button
                onClick={onCtaClick}
                className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#C56A18] to-[#B88935] hover:from-[#B88935] hover:to-[#996B1E] shadow-lg shadow-amber-950/40 active:scale-98 transition-all cursor-pointer"
              >
                <span>{ctaIcon}</span>
                <span>{ctaText}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
