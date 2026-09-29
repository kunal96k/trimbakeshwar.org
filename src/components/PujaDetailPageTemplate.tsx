import React, { useState } from 'react';
import { InnerPageHero } from './InnerPageHero';
import { useNavigation } from '../context/NavigationContext';
import { GURUJI_LIST, ARTICLES_LIST } from '../data/siteData';
import { 
  Calendar, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  ChevronDown, 
  Users, 
  BookOpen, 
  Sparkles,
  ArrowRight,
  Flame
} from 'lucide-react';
import { LotusIcon } from './Motifs';
import { AppRoute } from '../types';

export interface PujaTimelineStep {
  dayOrStage: string;
  title: string;
  desc: string;
  rituals: string[];
}

export interface PujaDetailPageProps {
  slug: string;
  title: string;
  nativeTitle: string;
  sanskritName: string;
  tagline: string;
  bgImage?: string;
  overview: string;
  traditionalSignificance: string;
  whoPerforms: string[];
  whenPerformed: string;
  duration: string;
  timelineSteps?: PujaTimelineStep[];
  samagriList: string[];
  preparationChecklist: string[];
  whatYajmanShouldKnow: string[];
  importantNotes: string[];
  faqs: { q: string; a: string }[];
  sanskritVerse?: string;
}

export function PujaDetailPageTemplate(props: PujaDetailPageProps) {
  const { navigate, openBooking } = useNavigation();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Filter Gurujis who specialize in this puja
  const relatedGurujis = GURUJI_LIST.filter((g) =>
    g.specialties.some((s) => s.toLowerCase().includes(props.title.toLowerCase()) || props.title.toLowerCase().includes(s.toLowerCase()))
  );
  const displayGurujis = relatedGurujis.length > 0 ? relatedGurujis : GURUJI_LIST.slice(0, 3);

  // Related articles
  const relatedArticles = ARTICLES_LIST.slice(0, 3);

  return (
    <div className="bg-[#FBF6EA] text-[#211D19] min-h-screen pb-16">
      {/* 1. Global Inner Page Hero */}
      <InnerPageHero
        breadcrumbs={[
          { label: 'Puja Directory', route: '/puja' },
          { label: props.title },
        ]}
        sanskritMantra={props.sanskritName}
        title={props.title}
        nativeTitle={props.nativeTitle}
        description={props.tagline}
        bgImage={props.bgImage}
        ctaText={`Book ${props.title}`}
        onCtaClick={() => openBooking(props.slug)}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 space-y-12 sm:space-y-16">
        {/* Sanskrit Inscription Banner (if provided) */}
        {props.sanskritVerse && (
          <div className="bg-[#EDE3D1]/70 border border-[#B88935]/40 rounded-2xl p-4 sm:p-6 text-center shadow-xs">
            <div className="text-amber-800 text-xs uppercase tracking-widest font-semibold mb-1">
              ॥ पारंपारिक श्लोक मन्त्र ॥
            </div>
            <div className="font-devanagari text-base sm:text-lg md:text-xl font-bold text-[#5A1717] leading-relaxed">
              {props.sanskritVerse}
            </div>
          </div>
        )}

        {/* 2. Overview & Traditional Significance */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6">
            <div>
              <div className="text-xs font-bold text-[#C56A18] uppercase tracking-wider mb-1">
                Overview & Context
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#5A1717]">
                About {props.title}
              </h2>
              <p className="text-sm sm:text-base text-stone-700 mt-3 leading-relaxed">
                {props.overview}
              </p>
            </div>

            {/* Authentic Ritual Showcase Visual */}
            {props.bgImage && (
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#B88935]/30 shadow-lg h-60 sm:h-72 bg-stone-900 group">
                <img
                  src={props.bgImage}
                  alt={props.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div>
                    <span className="text-xs font-bold text-amber-300 font-devanagari block">
                      {props.nativeTitle}
                    </span>
                    <span className="text-[11px] text-stone-200">
                      Sacred Vedic Vidhi at Kushavarta & Trimbakeshwar Kshetra
                    </span>
                  </div>
                  <LotusIcon className="w-5 h-5 text-amber-300 shrink-0" />
                </div>
              </div>
            )}

            <div className="bg-white/80 border border-[#B88935]/25 rounded-2xl p-5 sm:p-6">
              <h3 className="text-lg font-heading font-bold text-[#5A1717] flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-[#C56A18]" />
                <span>Traditional Significance</span>
              </h3>
              <p className="text-sm text-stone-700 leading-relaxed">
                {props.traditionalSignificance}
              </p>
            </div>
          </div>

          {/* Quick Meta Snapshot Card */}
          <div className="lg:col-span-4 bg-[#EDE3D1]/60 border border-[#B88935]/30 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-[#5A1717] uppercase tracking-wider border-b border-[#B88935]/20 pb-2">
              Ritual Snapshot
            </h3>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#C56A18] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-800">Typical Duration</div>
                  <div className="text-stone-600 text-xs">{props.duration}</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-[#C56A18] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-800">Recommended Time</div>
                  <div className="text-stone-600 text-xs">{props.whenPerformed}</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#C56A18] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-800">Purohit Requirement</div>
                  <div className="text-stone-600 text-xs">Conducted by authorized Trimbak Vedic Guruji</div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => openBooking(props.slug)}
                className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#5A1717] to-[#C56A18] hover:from-[#6D1B1B] hover:to-[#B88935] shadow-md transition-all cursor-pointer text-center whitespace-nowrap shrink-0"
                style={{ whiteSpace: 'nowrap' }}
              >
                <span className="whitespace-nowrap shrink-0" style={{ whiteSpace: 'nowrap' }}>Proceed to Book Puja</span>
              </button>
              <div className="text-[10px] text-center text-stone-500 mt-2">
                Price confirmed with Guruji during booking
              </div>
            </div>
          </div>
        </section>

        {/* 3. Who Traditionally Performs & When It Is Performed */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/80 border border-stone-200/80 rounded-2xl p-5 sm:p-6">
            <h3 className="text-base sm:text-lg font-heading font-bold text-[#5A1717] mb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#C56A18]" />
              <span>Who Traditionally Performs This Ritual?</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
              {props.whoPerforms.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#C56A18] shrink-0 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/80 border border-stone-200/80 rounded-2xl p-5 sm:p-6">
            <h3 className="text-base sm:text-lg font-heading font-bold text-[#5A1717] mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#C56A18]" />
              <span>Auspicious Days & Muhurat Guidance</span>
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-3">
              {props.whenPerformed}
            </p>
            <div className="text-xs text-stone-500 bg-[#EDE3D1]/40 p-3 rounded-xl border border-[#B88935]/20">
              Devotees are advised to consult with an authorized Guruji to match their birth nakshatra / tithi for optimal spiritual sanctity.
            </div>
          </div>
        </section>

        {/* 4. Vidhi / Process (Timeline if multi-day or steps) */}
        {props.timelineSteps && props.timelineSteps.length > 0 && (
          <section className="bg-[#EDE3D1]/30 border border-[#B88935]/30 rounded-2xl p-6 sm:p-8">
            <div className="text-center max-w-xl mx-auto mb-8">
              <div className="text-xs font-bold text-[#C56A18] uppercase tracking-wider mb-1">
                Day-by-Day Vidhi Sequence
              </div>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#5A1717]">
                Traditional Puja Procedure & Flow
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {props.timelineSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#B88935]/25 rounded-xl p-5 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="inline-block px-3 py-1 rounded-md bg-[#5A1717] text-amber-200 text-xs font-bold font-mono mb-3">
                      {step.dayOrStage}
                    </div>
                    <h4 className="text-base font-bold text-[#5A1717] mb-2">
                      {step.title}
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed mb-4">
                      {step.desc}
                    </p>
                  </div>

                  <div className="border-t border-stone-200/70 pt-3">
                    <div className="text-[11px] font-bold text-stone-500 uppercase mb-1.5">
                      Key Observances:
                    </div>
                    <ul className="space-y-1 text-xs text-stone-700">
                      {step.rituals.map((r, rIdx) => (
                        <li key={rIdx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. Samagri & Preparation Checklist */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Samagri */}
          <div className="bg-white/80 border border-stone-200/80 rounded-2xl p-6">
            <h3 className="text-lg font-heading font-bold text-[#5A1717] mb-3 flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#C56A18]" />
              <span>Traditional Materials & Samagri</span>
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              All core Vedic samagri is arranged and consecrated by the Purohit prior to the ceremony:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
              {props.samagriList.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-[#EDE3D1]/30">
                  <LotusIcon className="w-3.5 h-3.5 text-[#C56A18] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Yajman Preparation Checklist */}
          <div className="bg-white/80 border border-stone-200/80 rounded-2xl p-6">
            <h3 className="text-lg font-heading font-bold text-[#5A1717] mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Yajman Preparation Checklist</span>
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
              {props.preparationChecklist.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 6. What Yajman Should Know & Important Notes */}
        <section className="bg-amber-500/10 border border-[#B88935]/30 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-2 text-sm font-bold text-[#5A1717] mb-4">
            <AlertCircle className="w-5 h-5 text-[#C56A18]" />
            <span>Important Ritual Guidelines & Respectful Observance</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-stone-700">
            <div>
              <h4 className="font-bold text-[#5A1717] mb-2">What Yajman Should Know:</h4>
              <ul className="space-y-1.5 list-disc list-inside">
                {props.whatYajmanShouldKnow.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#5A1717] mb-2">Notice on Traditional Shastras:</h4>
              <ul className="space-y-1.5 list-disc list-inside">
                {props.importantNotes.map((note, idx) => (
                  <li key={idx}>{note}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 7. Available Gurujis */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-xs font-bold text-[#C56A18] uppercase tracking-wider mb-1">
                Authorized Purohits
              </div>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#5A1717]">
                Gurujis for {props.title}
              </h3>
            </div>
            <button
              onClick={() => navigate('/guruji')}
              className="text-xs font-semibold text-[#5A1717] hover:underline"
            >
              View Full Directory →
            </button>
          </div>

          <div className={`grid grid-cols-1 ${displayGurujis.length === 1 ? 'max-w-xl mx-auto' : 'md:grid-cols-3'} gap-5`}>
            {displayGurujis.map((guruji) => (
              <div
                key={guruji.id}
                className="bg-white border border-stone-200/80 rounded-2xl p-4 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={guruji.avatar}
                      alt={guruji.name}
                      className="w-12 h-12 rounded-full object-cover object-top border border-[#B88935]/40 shrink-0"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#5A1717]">{guruji.name}</div>
                      <div className="text-[11px] text-[#B88935] font-devanagari">{guruji.titleNative}</div>
                      <div className="text-[10px] text-stone-500">{guruji.experienceYears} Years Experience</div>
                    </div>
                  </div>
                  <p className="text-xs text-stone-600 line-clamp-2 mb-3">
                    {guruji.bio}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center gap-2">
                  <button
                    onClick={() => openBooking(props.slug, guruji.id)}
                    className="flex-1 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#5A1717] to-[#C56A18] rounded-lg shadow-xs"
                  >
                    Book with Guruji
                  </button>
                  <button
                    onClick={() => navigate('/guruji')}
                    className="px-3 py-2 text-xs text-[#5A1717] hover:bg-[#EDE3D1] rounded-lg font-medium"
                  >
                    Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Frequently Asked Questions */}
        {props.faqs && props.faqs.length > 0 && (
          <section className="bg-white/80 border border-stone-200/80 rounded-2xl p-6 sm:p-8">
            <h3 className="text-xl font-heading font-bold text-[#5A1717] mb-6">
              Frequently Asked Questions About {props.title}
            </h3>

            <div className="divide-y divide-stone-200">
              {props.faqs.map((faq, idx) => (
                <div key={idx} className="py-3.5">
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full text-left flex items-center justify-between text-sm font-semibold text-[#5A1717] hover:text-[#C56A18] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${openFaqIndex === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaqIndex === idx && (
                    <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed pl-2 border-l-2 border-[#B88935]">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 9. Related Articles */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading font-bold text-[#5A1717]">
              Related Spiritual Knowledge & Articles
            </h3>
            <button
              onClick={() => navigate('/articles')}
              className="text-xs font-semibold text-[#5A1717] hover:underline"
            >
              All Articles →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedArticles.map((art) => (
              <button
                key={art.id}
                onClick={() => navigate(`/articles/${art.id}` as AppRoute)}
                className="text-left bg-white/90 border border-stone-200 rounded-xl overflow-hidden hover:border-[#B88935]/40 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                {art.image && (
                  <div className="h-28 w-full overflow-hidden bg-stone-100">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] text-[#B88935] font-semibold uppercase mb-1">
                      {art.category}
                    </div>
                    <div className="text-xs font-bold text-[#5A1717] group-hover:text-[#C56A18] line-clamp-2">
                      {art.title}
                    </div>
                  </div>
                  <div className="text-[11px] text-stone-500 mt-2 flex items-center justify-between">
                    <span>{art.readTime}</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* 10. Final Booking CTA Strip */}
        <div className="bg-gradient-to-r from-[#5A1717] via-[#C56A18] to-[#5A1717] rounded-2xl p-6 sm:p-10 text-white text-center shadow-xl">
          <h3 className="text-xl sm:text-2xl font-heading font-bold mb-2">
            Participate in Sacred {props.title} at Trimbakeshwar
          </h3>
          <p className="text-xs sm:text-sm text-stone-200 max-w-xl mx-auto mb-6">
            Confirm your date with verified hereditary Gurujis according to prescribed Vedic guidelines and Shubh Muhurat.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => openBooking(props.slug)}
              className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-[#5A1717] bg-amber-200 hover:bg-white shadow-lg active:scale-95 transition-all cursor-pointer"
            >
              Book {props.title} Now
            </button>
            <button
              onClick={() => navigate('/puja')}
              className="px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold border border-white/40 hover:bg-white/10 transition-colors"
            >
              Compare All Pujas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
