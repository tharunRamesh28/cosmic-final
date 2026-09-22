import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

interface PricingSectionProps {
  onSelectTier: (tierName: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectTier }) => {
  const packages = [
    {
      id: 'rapid',
      name: 'RAPID',
      timeline: '7–10 Days',
      description: 'For ideas and projects that need a quick turnaround.',
      deliverables: [
        'Faster development cycle',
        'Focused implementation',
        'Essential testing',
        'Priority execution'
      ],
      cta: 'SELECT RAPID',
      highlighted: false
    },
    {
      id: 'standard',
      name: 'STANDARD',
      timeline: '10–14 Days',
      description: 'For projects requiring a balanced development and testing cycle.',
      deliverables: [
        'Complete implementation',
        'Development and testing',
        'Refinement and corrections',
        'Recommended for most projects'
      ],
      cta: 'SELECT STANDARD',
      highlighted: true
    },
    {
      id: 'extended',
      name: 'EXTENDED',
      timeline: '14–20 Days',
      description: 'For projects that require additional development, testing, or refinement.',
      deliverables: [
        'Detailed implementation',
        'Extended testing',
        'Multiple refinement cycles',
        'Additional technical requirements'
      ],
      cta: 'SELECT EXTENDED',
      highlighted: false
    }
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 px-6 md:px-16 max-w-[1440px] mx-auto border-t border-[#c4c7c7]/30">
      {/* Header */}
      <div className="mb-14">
        <span className="font-mono-tech text-xs md:text-sm text-[#444748] tracking-widest uppercase flex items-center mb-2">
          <span className="w-8 h-px bg-[#000000] mr-4 inline-block"></span>
          Development Speed &amp; Timeline
        </span>
        <h2 className="font-display-tech text-3xl sm:text-4xl md:text-5xl font-bold text-[#000000] tracking-tight">
          DEVELOPMENT PACKAGES
        </h2>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`bg-[#ffffff] rounded-xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
              pkg.highlighted
                ? 'border-2 border-[#000000] shadow-md ring-2 ring-[#c8f179]/60 cosmic-glow'
                : 'border border-[#c4c7c7]/60 shadow-xs hover:border-black'
            }`}
          >
            {pkg.highlighted && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#c8f179] text-[#141f00] font-mono-tech text-[10px] uppercase font-bold px-3 py-1 rounded-full border border-black shadow-xs">
                RECOMMENDED
              </div>
            )}

            <div>
              {/* Package Name & Timeline */}
              <div className="mb-4">
                <span className="font-mono-tech text-[11px] text-[#476800] uppercase font-bold tracking-wider block mb-1">
                  SPEED TIER
                </span>
                <h3 className="font-display-tech text-2xl sm:text-3xl font-black text-[#000000] tracking-tight">
                  {pkg.name}
                </h3>
              </div>

              {/* Timeline Pill */}
              <div className="flex items-center gap-2 font-mono-tech text-xs text-[#191c1b] font-bold bg-[#f4fbe9] border border-[#c8f179] px-3.5 py-1.5 rounded-lg mb-5 w-fit">
                <span className="w-2 h-2 rounded-full bg-[#476800]" />
                <span>TIMELINE: {pkg.timeline}</span>
              </div>

              {/* Description */}
              <p className="font-display-tech text-sm text-[#444748] leading-relaxed mb-6">
                {pkg.description}
              </p>

              <div className="h-px w-full bg-[#c4c7c7]/50 mb-6"></div>

              {/* Deliverables List */}
              <div className="space-y-3 mb-8">
                {pkg.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-display-tech text-[#191c1b]">
                    <Check className="w-4 h-4 text-[#476800] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA Button */}
            <button
              onClick={() => onSelectTier(pkg.name)}
              className={`w-full font-mono-tech text-xs tracking-wider px-6 py-4 rounded-lg flex justify-between items-center transition-all cursor-pointer font-bold ${
                pkg.highlighted
                  ? 'bg-[#000000] text-white hover:bg-[#2e312f] cosmic-glow'
                  : 'bg-transparent border border-[#000000] text-[#000000] hover:bg-[#edeeeb]'
              }`}
            >
              <span>{pkg.cta}</span>
              <ArrowRight className="w-4 h-4 text-[#c8f179]" />
            </button>
          </div>
        ))}
      </div>

      {/* Professional Pricing Message */}
      <div className="border border-[#c4c7c7]/60 bg-[#f9faf7] rounded-xl p-5 md:p-6 text-center max-w-3xl mx-auto">
        <p className="font-display-tech text-sm md:text-base font-semibold text-[#191c1b] mb-1">
          Your project fee is based on the package and development timeline you select.
        </p>
        <p className="font-mono-tech text-xs text-[#444748]">
          The final project fee will depend on your selected package, technical complexity, hardware/software requirements, and overall engineering scope.
        </p>
      </div>
    </section>
  );
};
