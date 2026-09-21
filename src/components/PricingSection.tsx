import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

interface PricingSectionProps {
  onSelectTier: (tierName: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectTier }) => {
  const tiers = [
    {
      id: 'prototype-sprint',
      name: 'Rapid Prototype Sprint',
      tag: 'REV-A PROTOTYPE',
      timeline: '3 - 4 Weeks',
      bestFor: 'Founders & R&D teams seeking physical validation before major capital commitments.',
      deliverables: [
        'Schematic design & 4-layer PCB spin',
        '3D printed / CNC functional enclosure',
        'Bare-metal bring-up firmware',
        'BOM cost optimization report',
        '3 working Rev-A physical units'
      ],
      cta: 'SELECT PROTOTYPE SPRINT',
      highlighted: false
    },
    {
      id: 'full-system',
      name: 'End-to-End System Build',
      tag: 'IDEA TO MASS PRODUCTION',
      timeline: '8 - 12 Weeks',
      bestFor: 'Commercial hardware products launching to consumer or enterprise scale.',
      deliverables: [
        'Complete 6-stage Phase Sequence pipeline',
        'Production-grade multi-layer HDI PCB & RF tuning',
        'Injection mold tooling CAD & DFM sign-off',
        'Zephyr/FreeRTOS secure firmware with OTA',
        'Web telemetry console & edge device API',
        'Pre-compliance EMC/FCC testing support'
      ],
      cta: 'COMMISSION FULL SYSTEM',
      highlighted: true
    },
    {
      id: 'dedicated-squad',
      name: 'Dedicated Hardware Lab',
      tag: 'MONTHLY EMBEDDED SQUAD',
      timeline: 'Ongoing / Retainer',
      bestFor: 'Growth-stage companies requiring specialized EE, Firmware & CAD engineering on tap.',
      deliverables: [
        'Dedicated Senior EE + Firmware + CAD engineers',
        'Weekly physical board spins and lab testing',
        'Direct Slack/Discord channel with engineering leads',
        'Continuous firmware feature iterations',
        'Supply chain & contract manufacturer oversight'
      ],
      cta: 'RESERVE SQUAD CAPACITY',
      highlighted: false
    }
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 px-6 md:px-16 max-w-[1440px] mx-auto border-t border-[#c4c7c7]/30">
      {/* Header */}
      <div className="mb-16">
        <span className="font-mono-tech text-xs md:text-sm text-[#444748] tracking-widest uppercase flex items-center mb-2">
          <span className="w-8 h-px bg-[#000000] mr-4 inline-block"></span>
          Transparent Engagements
        </span>
        <h2 className="font-display-tech text-3xl sm:text-4xl md:text-5xl font-bold text-[#000000] tracking-tight">
          ENGAGEMENT MODELS
        </h2>
      </div>

      {/* Tiers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={`bg-[#ffffff] rounded-xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
              tier.highlighted
                ? 'border-2 border-[#000000] shadow-xl cosmic-glow ring-2 ring-[#c8f179]/60'
                : 'border border-[#c4c7c7]/60 shadow-xs hover:border-black'
            }`}
          >
            {tier.highlighted && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#c8f179] text-[#141f00] font-mono-tech text-[10px] uppercase font-bold px-3 py-1 rounded-full border border-black shadow-xs">
                MOST POPULAR PATH
              </div>
            )}

            <div>
              {/* Tag & Name */}
              <div className="mb-4">
                <span className="font-mono-tech text-xs text-[#476800] uppercase font-semibold block mb-1">
                  {tier.tag}
                </span>
                <h3 className="font-display-tech text-2xl font-bold text-[#000000]">
                  {tier.name}
                </h3>
              </div>

              {/* SLA */}
              <div className="flex items-center gap-2 font-mono-tech text-xs text-[#444748] bg-[#f9faf7] px-3 py-1.5 rounded border border-[#c4c7c7]/40 mb-6 w-fit">
                <span>TIMELINE: {tier.timeline}</span>
              </div>

              <p className="font-display-tech text-sm text-[#444748] leading-relaxed mb-6">
                {tier.bestFor}
              </p>

              <div className="h-px w-full bg-[#c4c7c7]/50 tech-divider mb-6"></div>

              {/* Deliverables List */}
              <div className="space-y-3 mb-8">
                {tier.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-display-tech text-[#191c1b]">
                    <Check className="w-4 h-4 text-[#476800] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <button
              onClick={() => onSelectTier(tier.name)}
              className={`w-full font-mono-tech text-xs tracking-wider px-6 py-4 rounded flex justify-between items-center transition-all ${
                tier.highlighted
                  ? 'bg-[#000000] text-white hover:bg-[#2e312f] cosmic-glow'
                  : 'bg-transparent border border-[#000000] text-[#000000] hover:bg-[#edeeeb]'
              }`}
            >
              <span>{tier.cta}</span>
              <ArrowRight className="w-4 h-4 text-[#c8f179]" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
