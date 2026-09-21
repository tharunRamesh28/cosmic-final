import React from 'react';
import { Cpu, Radio, Globe, Compass } from 'lucide-react';
import { CAPABILITIES } from '../data/cosmicData';

interface CapabilitiesCoreProps {
  onStartProjectForService?: (serviceName: string) => void;
}

export const CapabilitiesCore: React.FC<CapabilitiesCoreProps> = () => {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-7 h-7 text-[#000000]" />;
      case 'Radio':
        return <Radio className="w-7 h-7 text-[#000000]" />;
      case 'Globe':
        return <Globe className="w-7 h-7 text-[#000000]" />;
      case 'Compass':
        return <Compass className="w-7 h-7 text-[#000000]" />;
      default:
        return <Cpu className="w-7 h-7 text-[#000000]" />;
    }
  };

  return (
    <section id="services" className="py-20 md:py-28 px-6 md:px-16 max-w-[1440px] mx-auto">
      {/* Section Header (Top-right sentence removed) */}
      <div className="mb-16">
        <span className="font-mono-tech text-xs md:text-sm text-[#444748] tracking-widest uppercase flex items-center mb-2">
          <span className="w-8 h-px bg-[#000000] mr-4 inline-block"></span>
          Engineering Disciplines
        </span>
        <h2 className="font-display-tech text-3xl sm:text-4xl md:text-5xl font-bold text-[#666a6a] tracking-tight animate-continuous-fade-5s">
          WHAT WE BUILD !!!
        </h2>
      </div>

      {/* 4-Column Card Grid — Pure display cards with green glowing border on cursor hover */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CAPABILITIES.map((cap) => (
          <div
            key={cap.id}
            className="bg-[#ffffff] border border-[#c4c7c7]/60 rounded-xl p-8 flex flex-col justify-start group relative shadow-xs transition-all duration-300 hover:border-[#b9e86a] hover:shadow-[0_0_30px_rgba(185,232,106,0.4)] hover:-translate-y-1 select-none"
            id={`capability-card-${cap.id}`}
          >
            {/* Header Icon + Tag */}
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 bg-[#f3f4f1] border border-[#c4c7c7]/50 flex items-center justify-center rounded-lg group-hover:border-[#b9e86a] group-hover:bg-[#c8f179]/20 transition-all duration-300">
                {getServiceIcon(cap.iconName)}
              </div>
              <span className="font-mono-tech text-[10px] text-[#444748] border border-[#c4c7c7]/50 px-2 py-0.5 rounded bg-[#f9faf7]">
                {cap.tag}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-display-tech text-2xl font-bold text-[#000000] mb-3 group-hover:text-[#476800] transition-colors">
              {cap.title}
            </h3>

            {/* Description */}
            <p className="font-display-tech text-sm text-[#444748] leading-relaxed">
              {cap.shortDesc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
