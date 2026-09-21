import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Clock, Layers, ArrowUpRight, HelpCircle } from 'lucide-react';
import { Link, useRouter } from '../router';

export const PricingPage: React.FC = () => {
  const { navigate } = useRouter();

  const pricingCategories = [
    {
      title: 'PROJECT CONSULTATION',
      price: 'Starting from / Contact',
      description: 'Initial technical feasibility audit, architecture scoping, and component selection review.',
      deliverables: [
        'System architecture blueprint',
        'Component availability & BOM cost audit',
        'Technical feasibility & risk analysis',
        'Engineering timeline estimation'
      ]
    },
    {
      title: 'PROTOTYPE DEVELOPMENT',
      price: 'Custom quotation',
      description: 'Rapid breadboarding, functional Rev-A prototype fabrication, and bench testing.',
      deliverables: [
        'Working physical hardware prototype',
        'Bench testing & oscilloscope logs',
        'Initial 3D printed enclosure fitting',
        'Hardware bring-up documentation'
      ]
    },
    {
      title: 'PCB DESIGN',
      price: 'Custom quotation',
      description: 'Complete schematic capture, multi-layer board layout, DFM checks, and production Gerber files.',
      deliverables: [
        'Multi-layer schematic & PCB layout (Altium / KiCad)',
        'Full Gerber, drill, and centroid fabrication files',
        'Verified distributor BOM with stock checks',
        'Design for Manufacturability (DFM) report'
      ]
    },
    {
      title: 'EMBEDDED SYSTEM',
      price: 'Custom quotation',
      description: 'Custom firmware architecture, RTOS integration, peripheral drivers, and low-power optimization.',
      deliverables: [
        'Production C/C++ / Rust firmware repository',
        'Hardware Abstraction Layer (HAL) drivers',
        'Secure bootloader & OTA engine',
        'State machine & communication protocols'
      ]
    },
    {
      title: 'IoT DEVELOPMENT',
      price: 'Custom quotation',
      description: 'Connected hardware ecosystems, wireless telemetry, cloud ingestion, and real-time dashboards.',
      deliverables: [
        'Wireless connectivity integration (Wi-Fi, BLE, LoRa, Cellular)',
        'TLS 1.3 cryptographic security & provisioning',
        'Cloud telemetry ingestion endpoints',
        'Responsive telemetry monitoring dashboard'
      ]
    },
    {
      title: 'COMPLETE PRODUCT DEVELOPMENT',
      price: 'Custom quotation',
      highlighted: true,
      description: 'Full-stack turnkey product realization from initial concept to certified factory production.',
      deliverables: [
        'Concept → Schematics → PCB → Firmware → CAD → Prototype',
        'Injection-mold ready 3D CAD tooling assemblies',
        'Regulatory pre-compliance testing (FCC, CE, RoHS)',
        'Automated factory test fixtures (FCT) and flashing scripts'
      ]
    }
  ];

  return (
    <div className="animate-in fade-in duration-300 px-6 md:px-16 py-12 md:py-20 max-w-[1440px] mx-auto">
      {/* Breadcrumb Navigation */}
      <div className="font-mono-tech text-xs text-[#74a81e] font-semibold mb-6 flex items-center gap-2">
        <Link to="/" className="text-[#444748] hover:text-black transition-colors">HOME</Link>
        <span>#</span>
        <span>PRICING</span>
      </div>

      {/* Page Header */}
      <div className="max-w-4xl mb-16 md:mb-20">
        <div className="inline-block bg-[#f3f4f1] text-[#476800] border border-[#c4c7c7] font-mono-tech text-xs font-bold px-3 py-1 rounded mb-4">
          TRANSPARENT PROJECT-BASED ESTIMATION
        </div>
        <h1 className="font-display-tech text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#000000] tracking-tight mb-6">
          ENGINEERING PRICING.
        </h1>
        <p className="font-display-tech text-lg sm:text-xl md:text-2xl text-[#444748] font-normal leading-relaxed mb-6">
          Every project is different. Pricing depends on complexity, components, development time, prototyping requirements and final product requirements.
        </p>

        {/* Clear Call to Action */}
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => navigate('/order')}
            className="bg-[#000000] text-white font-mono-tech text-xs font-bold px-8 py-4 rounded-lg hover:bg-[#2e312f] transition-all flex items-center gap-2 cursor-pointer shadow-md"
          >
            <span>GET A PROJECT QUOTE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Pricing Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20">
        {pricingCategories.map((cat) => (
          <div
            key={cat.title}
            className={`rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 border ${
              cat.highlighted
                ? 'bg-[#f4fbe9] border-2 border-[#191c1b] shadow-xl ring-2 ring-[#c8f179]/50'
                : 'bg-white border-[#c4c7c7]/60 shadow-xs hover:border-black'
            }`}
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="font-mono-tech text-xs text-[#74a81e] font-bold uppercase tracking-wider">
                  {cat.highlighted ? '★ TURNKEY' : '# SERVICE TIER'}
                </span>
              </div>

              <h2 className="font-display-tech text-xl sm:text-2xl font-extrabold text-[#000000] mb-2">
                {cat.title}
              </h2>

              <div className="font-mono-tech text-sm font-bold text-[#476800] mb-4">
                {cat.price}
              </div>

              <p className="font-display-tech text-xs sm:text-sm text-[#444748] leading-relaxed mb-6">
                {cat.description}
              </p>

              {/* Deliverables */}
              <div className="space-y-2.5 mb-8 pt-4 border-t border-[#c4c7c7]/30">
                <span className="font-mono-tech text-[10px] text-neutral-400 uppercase font-bold block mb-1">
                  TYPICAL DELIVERABLES
                </span>
                {cat.deliverables.map((del, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#476800] shrink-0 mt-0.5" />
                    <span className="font-display-tech text-xs text-[#191c1b]">
                      {del}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action */}
            <button
              onClick={() => navigate('/order', { initialService: cat.title })}
              className={`w-full py-3.5 px-4 rounded-lg font-mono-tech text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                cat.highlighted
                  ? 'bg-[#000000] text-white hover:bg-[#2e312f]'
                  : 'bg-white border border-black text-[#000000] hover:bg-[#f3f4f1]'
              }`}
            >
              <span>REQUEST QUOTE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Pricing Explanation Note */}
      <div className="bg-[#f9faf7] border border-[#c4c7c7]/80 rounded-2xl p-8 md:p-12 mb-16">
        <div className="flex items-center gap-3 mb-4">
          <HelpCircle className="w-5 h-5 text-[#476800]" />
          <h2 className="font-display-tech text-xl font-bold text-[#000000]">
            How Our Pricing Works
          </h2>
        </div>
        <p className="font-display-tech text-base text-[#444748] leading-relaxed mb-6 max-w-3xl">
          Hardware and electronics development is fundamentally dependent on engineering scope, component bill-of-materials, multi-layer routing complexity, and mechanical tooling requirements. Rather than quoting arbitrary fixed prices, we provide transparent milestone-based proposals following a brief scoping review.
        </p>
        <button
          onClick={() => navigate('/order')}
          className="bg-[#000000] text-white font-mono-tech text-xs font-bold px-6 py-3.5 rounded-lg hover:bg-[#2e312f] transition-all flex items-center gap-2 cursor-pointer shadow-xs"
        >
          <span>GET A PROJECT QUOTE</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Return Home Subtle Link */}
      <div className="pt-8 border-t border-[#c4c7c7]/30 flex justify-between items-center font-mono-tech text-xs">
        <Link to="/" className="text-[#444748] hover:text-black transition-colors flex items-center gap-1.5">
          <span>RETURN HOME</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link to="/order" className="text-[#476800] font-bold hover:underline flex items-center gap-1.5">
          <span>SUBMIT PROJECT REQUIREMENTS</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
