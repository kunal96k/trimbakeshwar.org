import React from 'react';
import { InnerPageHero } from '../components/InnerPageHero';
import { useNavigation } from '../context/NavigationContext';
import { Clock, AlertCircle, ShieldCheck, CheckCircle2, Calendar, Flame } from 'lucide-react';
import { MukutIcon } from '../components/Motifs';

export function DarshanTimingsPage() {
  const { navigate, openBooking } = useNavigation();

  const dailySchedule = [
    { time: '05:30 AM', event: 'Temple Gates Open & Mangala Aarti', type: 'Aarti', notes: 'First morning invocation and bell ringing' },
    { time: '06:00 AM – 09:00 AM', event: 'Inner Sanctum (Garbhagriha) Abhishek', type: 'Sparsh Darshan', notes: 'Men in unstitched Dhoti; directly touch and offer jal to Shivalinga' },
    { time: '09:00 AM – 12:00 PM', event: 'General Sabha Mandap Darshan', type: 'Mukh Darshan', notes: 'Continuous moving queue from central pillared hall' },
    { time: '12:00 PM – 12:30 PM', event: 'Madhyanha (Noon) Aarti & Mahanaivedya', type: 'Aarti', notes: 'Sacred food offering to Lord Shiva' },
    { time: '12:30 PM – 04:30 PM', event: 'Afternoon Devotee Darshan Queue', type: 'Mukh Darshan', notes: 'Sabha Mandap queue open for all pilgrims' },
    { time: '04:30 PM – 05:30 PM (Mondays)', event: 'Suvarna Mukut (Golden Crown) Darshan', type: 'Special Ceremony', notes: 'Historic diamond/ruby studded crown adorned on the Tridev Linga' },
    { time: '07:00 PM – 07:30 PM', event: 'Sandhya (Evening) Karpura Aarti', type: 'Aarti', notes: 'Illumination of brass deepastambhas and incense' },
    { time: '08:30 PM – 09:00 PM', event: 'Shej Aarti & Temple Closing', type: 'Aarti', notes: 'Bedtime lullaby hymns; temple doors close at 09:00 PM' },
  ];

  return (
    <div className="bg-[#FBF6EA] text-[#211D19] min-h-screen pb-16">
      <InnerPageHero
        breadcrumbs={[
          { label: 'Temple', route: '/temple' },
          { label: 'Darshan & Aarti Timings' },
        ]}
        sanskritMantra="॥ श्री त्र्यंबकेश्वर दर्शन वेळापत्रक ॥"
        title="Darshan & Daily Aarti Timings"
        nativeTitle="श्री त्र्यंबकेश्वर दर्शन व आरती वेळा"
        description="Comprehensive daily schedule of temple gate openings, inner sanctum Abhishek hours, Sabha Mandap lines, and the weekly Monday Suvarna Mukut ceremony."
        bgImage="/assets/trimbak/trimbakeshwar-temple.webp"
        ctaText="Book Abhishek Seva"
        onCtaClick={() => openBooking('rudrabhishek')}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 space-y-12">
        {/* Monday Special Notice Banner */}
        <section className="bg-gradient-to-r from-[#5A1717] via-[#C56A18] to-[#5A1717] text-white rounded-2xl p-5 sm:p-6 shadow-md">
          <div className="flex items-start gap-3">
            <MukutIcon className="w-8 h-8 text-amber-300 shrink-0" />
            <div>
              <h3 className="font-heading font-bold text-base sm:text-lg text-amber-200">
                Special Weekly Monday Ceremony: Suvarna Mukut Darshan
              </h3>
              <p className="text-xs sm:text-sm text-stone-100 mt-1 leading-relaxed">
                Every Monday from <strong>04:30 PM to 05:30 PM</strong>, the ancient five-faced golden crown (Suvarna Mukut) 
                studded with priceless rubies, emeralds, and diamonds is placed upon the Jyotirlinga. Following the Aarti, 
                a grand palanquin procession circulates through the temple streets accompanied by traditional nagadas and tutari horns.
              </p>
            </div>
          </div>
        </section>

        {/* Timetable Table */}
        <section className="bg-white/80 border border-[#B88935]/30 rounded-2xl p-5 sm:p-6 overflow-hidden">
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#5A1717] mb-4">
            Daily Temple & Aarti Schedule
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#B88935]/30 text-[#5A1717] font-semibold bg-[#EDE3D1]/60">
                  <th className="py-3 px-3">Time</th>
                  <th className="py-3 px-3">Ritual / Darshan Event</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Devotee Guidelines</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-stone-800">
                {dailySchedule.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#EDE3D1]/20 transition-colors">
                    <td className="py-3 px-3 font-bold text-[#5A1717] whitespace-nowrap">
                      {row.time}
                    </td>
                    <td className="py-3 px-3 font-semibold text-stone-900">
                      {row.event}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        row.type === 'Aarti'
                          ? 'bg-amber-100 text-amber-900'
                          : row.type === 'Sparsh Darshan'
                          ? 'bg-emerald-100 text-emerald-900'
                          : 'bg-stone-100 text-stone-700'
                      }`}>
                        {row.type}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-xs text-stone-600">
                      {row.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Sanctum Dress Code & Rules Card */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/80 border border-stone-200 rounded-2xl p-5 sm:p-6">
            <h3 className="text-base font-heading font-bold text-[#5A1717] mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Garbhagriha (Inner Sanctum) Dress Code</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
              <li className="flex items-start gap-2">
                <span className="text-[#C56A18] font-bold">•</span>
                <span><strong>Men:</strong> Unstitched traditional cotton or silk Dhoti with Angavastra (upper shirt or vest not permitted inside Garbhagriha).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#C56A18] font-bold">•</span>
                <span><strong>Women:</strong> Traditional Saree or modest Salwar-Kameez with Dupatta.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#C56A18] font-bold">•</span>
                <span><strong>Footwear:</strong> Strictly prohibited; leave at external Sansthan shoe counters outside main North Gate.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/80 border border-stone-200 rounded-2xl p-5 sm:p-6">
            <h3 className="text-base font-heading font-bold text-[#5A1717] mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <span>Security & Prohibited Items</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-700 font-bold">•</span>
                <span>Electronic devices, mobile phones, cameras, and smartwatches are strictly forbidden inside the sanctum.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-700 font-bold">•</span>
                <span>Leather belts, leather wallets, and handbags must be deposited in cloakrooms.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-700 font-bold">•</span>
                <span>Cloakrooms and locker facilities are available near the temple main entrance gate.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Free vs VIP Queue Information */}
        <section className="bg-[#EDE3D1]/50 border border-[#B88935]/30 rounded-2xl p-6">
          <h3 className="text-lg font-heading font-bold text-[#5A1717] mb-2">
            Queue Types & Sansthan Passes
          </h3>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-4">
            Shri Trimbakeshwar Sansthan Trust operates two queue tracks:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 bg-white rounded-xl border border-stone-200">
              <div className="font-bold text-[#5A1717] mb-1">General Free Darshan Line</div>
              <p className="text-stone-600 leading-relaxed">
                Open for all devotees through the main entrance. Approximate waiting time: 1 to 2 hours on weekdays; 3 to 5 hours on Mondays and festival days.
              </p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-stone-200">
              <div className="font-bold text-[#5A1717] mb-1">Special / Protocol Line</div>
              <p className="text-stone-600 leading-relaxed">
                Official Sansthan VIP passes can be obtained directly at the temple booking counter outside gate #4 (subject to daily sansthan availability).
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
