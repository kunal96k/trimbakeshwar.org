import React from 'react';
import { InnerPageHero } from '../components/InnerPageHero';
import { useNavigation } from '../context/NavigationContext';
import { Plane, Train, Bus, MapPin, Navigation, Car, Clock } from 'lucide-react';
import { SEO } from '../components/SEO';
import { getBreadcrumbSchema } from '../utils/seoData';

export function TravelGuidePage() {
  const { navigate, openBooking } = useNavigation();

  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Temple', path: '/temple' },
    { name: 'How to Reach Trimbakeshwar', path: '/travel' },
  ]);

  return (
    <div className="bg-[#FBF6EA] text-[#211D19] min-h-screen pb-16">
      <SEO
        title="How to Reach Trimbakeshwar from Mumbai, Pune & Nashik | Travel Route Guide"
        description="Complete travel guide to reach Trimbakeshwar Jyotirlinga: distance from Nashik Road Railway Station (36 km), Mumbai (175 km), Pune (235 km), nearest Ozar airport, and bus schedules."
        canonicalPath="/travel"
        keywords={[
          'How to reach Trimbakeshwar',
          'Mumbai to Trimbakeshwar distance',
          'Pune to Trimbakeshwar route',
          'Nashik railway station to Trimbak taxi',
          'Trimbakeshwar nearest airport',
        ]}
        schema={breadcrumbsSchema}
      />
      <InnerPageHero
        breadcrumbs={[
          { label: 'Temple', route: '/temple' },
          { label: 'How to Reach' },
        ]}
        sanskritMantra="॥ यात्रा मार्गदर्शिका ॥"
        title="How to Reach Trimbakeshwar"
        nativeTitle="त्र्यंबकेश्वर येथे कसे पोहोचावे?"
        description="Detailed road, rail, and flight routes to reach Shri Trimbakeshwar Jyotirlinga from Nashik, Mumbai, Pune, and all parts of India."
        bgImage="/assets/trimbak/brahmagiri-parvat.webp"
        ctaText="Book Puja"
        onCtaClick={() => openBooking()}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 space-y-12">
        {/* Quick Distance Snapshot Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-white/90 border border-[#B88935]/30 rounded-2xl shadow-xs">
            <div className="text-[11px] font-bold text-[#C56A18] uppercase">From Nashik City</div>
            <div className="text-2xl font-bold text-[#5A1717] mt-0.5">28 km</div>
            <div className="text-xs text-stone-500 mt-1 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>45–50 mins via Trimbak Road</span>
            </div>
          </div>
          <div className="p-4 bg-white/90 border border-[#B88935]/30 rounded-2xl shadow-xs">
            <div className="text-[11px] font-bold text-[#C56A18] uppercase">From Mumbai</div>
            <div className="text-2xl font-bold text-[#5A1717] mt-0.5">175 km</div>
            <div className="text-xs text-stone-500 mt-1 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>3.5–4 hours via NH-160 Kasara Ghat</span>
            </div>
          </div>
          <div className="p-4 bg-white/90 border border-[#B88935]/30 rounded-2xl shadow-xs">
            <div className="text-[11px] font-bold text-[#C56A18] uppercase">From Pune</div>
            <div className="text-2xl font-bold text-[#5A1717] mt-0.5">235 km</div>
            <div className="text-xs text-stone-500 mt-1 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>4.5–5 hours via NH-60 Sangamner</span>
            </div>
          </div>
        </section>

        {/* The 3 Travel Modes: Road, Train, Flight */}
        <section className="space-y-6">
          {/* 1. By Train */}
          <div className="bg-white/85 border border-stone-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-5 items-start">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#5A1717] flex items-center justify-center shrink-0">
              <Train className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-heading font-bold text-[#5A1717]">
                By Railway (Nearest Station: Nashik Road - NK)
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 mt-1.5 leading-relaxed">
                <strong>Nashik Road Railway Station (NK)</strong> is located 38 km from Trimbakeshwar and is a major Central Railway hub connected to Mumbai, Delhi, Kolkata, Hyderabad, and Bengaluru.
              </p>
              <div className="mt-3 p-3 bg-[#EDE3D1]/40 rounded-xl text-xs text-stone-700 space-y-1">
                <div>• Direct MSRTC red buses leave every 15 minutes from Nashik Road Railway Station directly to Trimbakeshwar Bus Stand.</div>
                <div>• Prepaid & app-based cabs (Ola / Uber / local taxis) are available 24 hours right outside platform 1 exit (approx. ₹700–₹1100).</div>
              </div>
            </div>
          </div>

          {/* 2. By Road */}
          <div className="bg-white/85 border border-stone-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-5 items-start">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#5A1717] flex items-center justify-center shrink-0">
              <Bus className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-heading font-bold text-[#5A1717]">
                By Road & State Transport (MSRTC)
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 mt-1.5 leading-relaxed">
                Trimbakeshwar is connected by a smooth 4-lane highway with Nashik City (CBS - Central Bus Stand).
              </p>
              <div className="mt-3 p-3 bg-[#EDE3D1]/40 rounded-xl text-xs text-stone-700 space-y-1">
                <div>• <strong>From Nashik CBS:</strong> City buses (Citylinc) and MSRTC district buses operate every 10–15 minutes from morning 05:00 AM to 10:30 PM (Fare approx. ₹40–₹50).</div>
                <div>• <strong>From Mumbai:</strong> Take Mumbai-Agra Highway (NH-160) through Thane, Kasara Ghat, and turn left onto Trimbak Road at Wadala Naka or take the Ghoti-Trimbak bypass.</div>
                <div>• <strong>From Pune:</strong> Follow Pune-Nashik Highway (NH-60) via Narayangaon and Sangamner, entering Nashik and continuing on Trimbak road.</div>
              </div>
            </div>
          </div>

          {/* 3. By Air */}
          <div className="bg-white/85 border border-stone-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-5 items-start">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#5A1717] flex items-center justify-center shrink-0">
              <Plane className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-heading font-bold text-[#5A1717]">
                By Air (Nearest Airports)
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 mt-1.5 leading-relaxed">
                Depending on flight routes, pilgrims can choose from three airport destinations:
              </p>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700">
                <div className="p-3 bg-[#EDE3D1]/40 rounded-xl">
                  <div className="font-bold text-[#5A1717]">Nashik Airport (Ozar - ISK)</div>
                  <div className="text-stone-600 mt-0.5">Approx. 52 km (1 hour 15 mins). Flights connect Ahmedabad, Hyderabad, Indore, and Nagpur.</div>
                </div>
                <div className="p-3 bg-[#EDE3D1]/40 rounded-xl">
                  <div className="font-bold text-[#5A1717]">Mumbai Airport (CSMIA - BOM)</div>
                  <div className="text-stone-600 mt-0.5">Approx. 165 km (3.5 hours). Premier international hub with global connectivity. Direct highway taxis available.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Local Town Transport & Parking */}
        <section className="bg-[#EDE3D1]/50 border border-[#B88935]/30 rounded-2xl p-6">
          <h3 className="text-base sm:text-lg font-heading font-bold text-[#5A1717] mb-2 flex items-center gap-2">
            <Car className="w-5 h-5 text-[#C56A18]" />
            <span>Local Town Transport & Vehicle Parking</span>
          </h3>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-3">
            Trimbakeshwar is a compact heritage town nestled in a mountain bowl. Most sacred spots (Main Temple, Kushavarta Kund, 
            Sant Nivruttinath Samadhi) are within 500m to 1 km of each other and easily walkable.
          </p>
          <div className="text-xs text-stone-600 space-y-1">
            <div>• <strong>Designated Vehicle Parking:</strong> Large municipal parking grounds are situated at the entrance of Trimbak town on Nashik Road (Gate #1) and near Sant Nivruttinath temple. Heavy vehicles and outside private tourist buses are not permitted in narrow temple inner lanes.</div>
            <div>• <strong>Auto-rickshaws:</strong> Readily available at Kushavarta circle, Bus Stand, and Gangadwar base at nominal fixed fares.</div>
          </div>
        </section>
      </div>
    </div>
  );
}
