import React from 'react';
import { InnerPageHero } from '../components/InnerPageHero';
import { TEMPLE_PRACTICAL_GUIDE, CONTACT_INFO } from '../data/siteData';
import { useNavigation } from '../context/NavigationContext';
import { Check, X, ShieldAlert, Phone, Home, HeartHandshake, Info } from 'lucide-react';
import { SEO } from '../components/SEO';
import { getBreadcrumbSchema } from '../utils/seoData';

export function TempleGuidePage() {
  const { navigate, openBooking } = useNavigation();

  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Temple', path: '/temple' },
    { name: 'Pilgrim Practical Guide', path: '/temple-guide' },
  ]);

  return (
    <div className="bg-[#FBF6EA] text-[#211D19] min-h-screen pb-16">
      <SEO
        title="Devotee Guidelines & Sanctum Etiquette | Trimbakeshwar Temple Pilgrim Guide"
        description="Comprehensive pilgrim checklist for visiting Trimbakeshwar: mandatory dress codes, what to bring, Kushavarta snan guidelines, locker rooms, and accommodation."
        canonicalPath="/temple-guide"
        keywords={[
          'Trimbakeshwar pilgrim guide',
          'Trimbakeshwar dress code rules',
          'Kushavarta bath guidelines',
          'Trimbakeshwar rules for devotees',
          'Trimbakeshwar temple lockers',
        ]}
        schema={breadcrumbsSchema}
      />
      <InnerPageHero
        breadcrumbs={[
          { label: 'Temple', route: '/temple' },
          { label: 'Pilgrim Practical Guide' },
        ]}
        sanskritMantra="॥ तीर्थयात्री आचारसंहिता ॥"
        title="Trimbakeshwar Pilgrim Practical Guide"
        nativeTitle="भाविकांसाठी उपयुक्त नियमावली व मार्गदर्शिका"
        description="Essential practical information on dress code, items allowed, Kushavarta snan decorum, accommodation options, and emergency contacts."
        bgImage="/assets/trimbak/trimbakeshwar-shiva-temple.webp"
        ctaText="Plan Your Puja"
        onCtaClick={() => navigate('/puja')}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 space-y-12">
        {/* Do's and Don'ts Checklist */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* What to Bring */}
          <div className="bg-white/85 border border-emerald-200 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center gap-2 text-emerald-800 font-heading font-bold text-lg mb-4">
              <span className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">✓</span>
              <span>What You Should Carry</span>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-stone-700">
              {TEMPLE_PRACTICAL_GUIDE.whatToBring.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What Not to Bring */}
          <div className="bg-white/85 border border-rose-200 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center gap-2 text-rose-800 font-heading font-bold text-lg mb-4">
              <span className="w-7 h-7 rounded-full bg-rose-100 flex items-center justify-center text-rose-700">✕</span>
              <span>Prohibited Inside Sanctum</span>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-stone-700">
              {TEMPLE_PRACTICAL_GUIDE.whatNotToBring.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Kushavarta Snan & Etiquette */}
        <section className="bg-white/85 border border-[#B88935]/25 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#C56A18] uppercase tracking-wider">
            <HeartHandshake className="w-4 h-4" />
            <span>Spiritual Decorum & Kushavarta Snan</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#5A1717]">
            Sanctity of Kushavarta Tirtha
          </h2>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            Taking holy Snan at Kushavarta Kund is an essential preliminary rite before performing Narayan Nagbali, 
            Tripindi Shraddha, or entering the temple for Abhishek. Devotees must observe respectful silence:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-stone-700">
            {TEMPLE_PRACTICAL_GUIDE.generalEtiquette.map((rule, idx) => (
              <div key={idx} className="p-3 bg-[#EDE3D1]/40 rounded-xl border border-[#B88935]/20 flex items-start gap-2">
                <span className="text-[#C56A18] font-bold mt-0.5">•</span>
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Accommodation Options */}
        <section className="bg-white/85 border border-stone-200 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-bold text-[#C56A18] uppercase tracking-wider mb-2">
            <Home className="w-4 h-4" />
            <span>Stay in Trimbak Town</span>
          </div>
          <h3 className="text-lg sm:text-xl font-heading font-bold text-[#5A1717] mb-4">
            Pilgrim Accommodation Facilities
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-[#EDE3D1]/40 border border-[#B88935]/20">
              <h4 className="font-bold text-[#5A1717] mb-1">Sansthan Bhakta Niwas</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Operated by the Temple Trust with clean rooms, family suites, and dormitory options at subsidised rates. Located 500m from temple.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#EDE3D1]/40 border border-[#B88935]/20">
              <h4 className="font-bold text-[#5A1717] mb-1">Traditional Dharmashalas</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Community guest houses (Maheshwari, Gujarati, Maratha Bhavans) offering Satvik dining and convenient access to Kushavarta Ghat.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#EDE3D1]/40 border border-[#B88935]/20">
              <h4 className="font-bold text-[#5A1717] mb-1">Purohit Guest Arrangements</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                For 3-day rituals like Narayan Nagbali, authorized Gurujis often assist yajmans with family lodging and satvik meals during the Vidhi.
              </p>
            </div>
          </div>
        </section>

        {/* Emergency Contacts Strip */}
        <section className="bg-gradient-to-r from-[#5A1717] to-[#731E1E] text-white rounded-2xl p-6">
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Phone className="w-4 h-4" />
            <span>Important Pilgrim Helpline Numbers</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TEMPLE_PRACTICAL_GUIDE.emergencyContacts.map((contact, idx) => (
              <div key={idx} className="p-3 bg-white/10 rounded-xl backdrop-blur-xs">
                <div className="text-[11px] text-amber-200/90">{contact.label}</div>
                <div className="text-sm font-bold text-white mt-0.5 font-mono">{contact.phone}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
