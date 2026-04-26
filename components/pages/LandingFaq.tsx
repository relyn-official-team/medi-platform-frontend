'use client';

import { useState } from 'react';
import { Building2, Handshake, ChevronDown } from 'lucide-react';

type FaqItem = { q: string; a: string };

export default function LandingFaq({
  sectionLabel,
  sectionTitle,
  tabHospital,
  tabAgency,
  hospitalItems,
  agencyItems,
}: {
  sectionLabel: string;
  sectionTitle: string;
  tabHospital: string;
  tabAgency: string;
  hospitalItems: FaqItem[];
  agencyItems: FaqItem[];
}) {
  const [activeTab, setActiveTab] = useState<'hospital' | 'agency'>('hospital');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = activeTab === 'hospital' ? hospitalItems : agencyItems;

  const handleTabChange = (tab: 'hospital' | 'agency') => {
    setActiveTab(tab);
    setOpenIndex(null);
  };

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="mt-14">
      <div className="text-[11px] font-bold tracking-[0.16em] text-neutral-400">
        {sectionLabel}
      </div>
      <h2 className="mt-2 text-3xl font-black tracking-[-0.02em]">
        {sectionTitle}
      </h2>
      <div className="mt-3 h-[3px] w-28 rounded-full bg-blue-500" />

      <div className="mt-8 inline-flex rounded-full bg-white/70 p-1 shadow-sm ring-1 ring-white/60">
        <button
          onClick={() => handleTabChange('hospital')}
          className={[
            'inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-colors',
            activeTab === 'hospital'
              ? 'bg-[#0b1220] text-white shadow-[0_4px_14px_rgba(2,6,23,0.18)]'
              : 'text-neutral-600 hover:text-neutral-900',
          ].join(' ')}
        >
          <Building2 className="h-4 w-4" />
          {tabHospital}
        </button>
        <button
          onClick={() => handleTabChange('agency')}
          className={[
            'inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-colors',
            activeTab === 'agency'
              ? 'bg-[#0b1220] text-white shadow-[0_4px_14px_rgba(2,6,23,0.18)]'
              : 'text-neutral-600 hover:text-neutral-900',
          ].join(' ')}
        >
          <Handshake className="h-4 w-4" />
          {tabAgency}
        </button>
      </div>

      <div className="mt-6 divide-y divide-slate-100 overflow-hidden rounded-[22px] bg-white/70 shadow-[0_18px_55px_rgba(2,6,23,0.10)] ring-1 ring-white/60">
        {items.map((item, i) => (
          <div key={i}>
            <button
              onClick={() => toggle(i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span
                className={[
                  'text-sm font-bold transition-colors',
                  openIndex === i ? 'text-blue-600' : 'text-neutral-950',
                ].join(' ')}
              >
                {item.q}
              </span>
              <ChevronDown
                className={[
                  'h-5 w-5 flex-shrink-0 text-blue-500 transition-transform duration-300',
                  openIndex === i ? 'rotate-180' : '',
                ].join(' ')}
              />
            </button>
            <div
              className={[
                'overflow-hidden transition-all duration-300 ease-in-out',
                openIndex === i ? 'max-h-96' : 'max-h-0',
              ].join(' ')}
            >
              <div className="px-6 pb-5 pt-1 text-sm leading-7 text-neutral-600">
                {item.a}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
