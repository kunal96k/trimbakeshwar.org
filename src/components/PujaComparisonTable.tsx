import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { PUJA_COMPARISON_TABLE } from '../data/siteData';
import { ShieldCheck, Calendar, ArrowRight } from 'lucide-react';
import { AppRoute } from '../types';

export function PujaComparisonTable() {
  const { navigate, openBooking } = useNavigation();

  return (
    <div className="w-full bg-[#EDE3D1]/40 border border-[#B88935]/30 rounded-2xl p-4 sm:p-6 overflow-hidden">
      <div className="mb-4">
        <h3 className="text-lg sm:text-xl font-heading font-bold text-[#5A1717]">
          Trimbakeshwar Puja Comparison Matrix
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Review authentic Vedic guidelines, prescribed durations, and preparation requirements to select the suitable Vidhi.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[650px] text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-[#B88935]/30 text-[#5A1717] font-semibold bg-[#EDE3D1]/60">
              <th className="py-3 px-3">Puja / Vidhi</th>
              <th className="py-3 px-3">Traditional Context</th>
              <th className="py-3 px-3">Typical Duration</th>
              <th className="py-3 px-3">Yajman Preparation</th>
              <th className="py-3 px-3">Purohit Seva</th>
              <th className="py-3 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#B88935]/15 text-stone-800">
            {PUJA_COMPARISON_TABLE.map((row) => (
              <tr key={row.slug} className="hover:bg-white/50 transition-colors">
                <td className="py-3.5 px-3">
                  <div className="font-bold text-[#5A1717]">{row.pujaName}</div>
                  <div className="text-[11px] font-devanagari text-[#B88935]">{row.sanskritName}</div>
                </td>
                <td className="py-3.5 px-3 text-xs text-stone-600 max-w-[220px]">
                  {row.context}
                </td>
                <td className="py-3.5 px-3 whitespace-nowrap font-medium text-amber-900">
                  {row.duration}
                </td>
                <td className="py-3.5 px-3 text-xs text-stone-600 max-w-[200px]">
                  {row.preparation}
                </td>
                <td className="py-3.5 px-3 whitespace-nowrap text-xs text-stone-700">
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md font-medium">
                    <ShieldCheck className="w-3 h-3 text-emerald-700" />
                    {row.gurujiRequired}
                  </span>
                </td>
                <td className="py-3.5 px-3 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => navigate(`/puja/${row.slug}` as AppRoute)}
                      className="px-2.5 py-1 text-xs text-[#5A1717] hover:text-[#C56A18] font-medium transition-colors"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => openBooking(row.slug)}
                      className="px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-[#5A1717] to-[#C56A18] hover:from-[#6D1B1B] hover:to-[#B88935] rounded-lg shadow-xs active:scale-95 transition-all"
                    >
                      Book
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 pt-3 border-t border-[#B88935]/20 text-[11px] text-stone-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <span>Note: Puja dakshina and exact samagri cost are finalized during booking directly with your chosen Guruji.</span>
        <button
          onClick={() => navigate('/puja')}
          className="text-[#5A1717] font-semibold hover:underline inline-flex items-center gap-1"
        >
          <span>View All Detailed Puja Pages</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
