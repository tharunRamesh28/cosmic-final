import React from 'react';
import { Link, useRouter } from '../router';
import { HERO_PRODUCT_IMAGE } from '../data/cosmicData';
import smartDripImg from '../assets/smartdrip_plus.jpg';
import { ScrollReveal } from '../components/ScrollReveal';

interface ProjectItem {
  number: string;
  name: string;
  category: string;
  image: string;
}

export const WorksPage: React.FC = () => {
  const { navigate } = useRouter();

  // Column 1: Odd numbers (01, 03, 05, 07, 09)
  const projectsCol1: ProjectItem[] = [
    {
      number: '01',
      name: 'AIR QUALITY MONITORING',
      category: 'IoT / Embedded Systems',
      image: HERO_PRODUCT_IMAGE
    },
    {
      number: '03',
      name: 'SMART AUTOMATED PLANT WATERING',
      category: 'IoT / Automation',
      image: HERO_PRODUCT_IMAGE
    },
    {
      number: '05',
      name: 'GAS LEAKAGE DETECTION',
      category: 'Safety / Embedded Systems',
      image: HERO_PRODUCT_IMAGE
    },
    {
      number: '07',
      name: 'IV SALINE MONITORING',
      category: 'Healthcare / IoT',
      image: smartDripImg
    },
    {
      number: '09',
      name: 'SMART ENERGY TELEMETRY',
      category: 'Electronics / IoT',
      image: HERO_PRODUCT_IMAGE
    }
  ];

  // Column 2: Even numbers (02, 04, 06, 08, 10)
  const projectsCol2: ProjectItem[] = [
    {
      number: '02',
      name: 'ROBOTIC CONTINUOUS MONITORING',
      category: 'Robotics / Embedded Systems',
      image: HERO_PRODUCT_IMAGE
    },
    {
      number: '04',
      name: 'SMART HOME AUTOMATION',
      category: 'IoT / Embedded Systems',
      image: HERO_PRODUCT_IMAGE
    },
    {
      number: '06',
      name: 'TDR CABLE FAULT LOCATOR',
      category: 'Electronics / Signal Processing',
      image: HERO_PRODUCT_IMAGE
    },
    {
      number: '08',
      name: 'AI + HARDWARE SYSTEMS',
      category: 'AI / Embedded Systems',
      image: smartDripImg
    },
    {
      number: '10',
      name: 'PRECISION INDUSTRIAL SENSING',
      category: 'Industrial / Automation',
      image: HERO_PRODUCT_IMAGE
    }
  ];

  // Seamless infinite loop: duplicate items internally
  const col1Items = [...projectsCol1, ...projectsCol1];
  const col2Items = [...projectsCol2, ...projectsCol2];

  return (
    <div className="animate-in fade-in duration-300 pb-20 overflow-x-hidden">
      {/* ==================================================
          1. WORKS PAGE INTRO (COHESIVE EDITORIAL HERO)
          ================================================== */}
      <section className="px-6 md:px-16 pt-12 md:pt-16 pb-12 md:pb-16 max-w-[1440px] mx-auto">
        {/* Breadcrumb / Section Eyebrow */}
        <div className="font-mono-tech text-xs text-[#476800] font-bold mb-6 sm:mb-8 flex items-center gap-2">
          <Link to="/" className="text-[#444748] hover:text-black transition-colors">
            HOME
          </Link>
          <span>#</span>
          <span>01 # OUR WORKS</span>
        </div>

        {/* Cohesive Hero Stack: Heading → Wide Editorial Paragraph → Technical Label */}
        <div className="space-y-6 sm:space-y-8">
          {/* Main Heading */}
          <h1 className="font-display-tech text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#000000] tracking-tight leading-[1.06] max-w-4xl">
            ENGINEERING IDEAS
            <br />
            INTO <span className="text-[#476800]">REAL PRODUCTS.</span>
          </h1>

          {/* Concise Full-Width Statement */}
          <p className="font-display-tech text-lg sm:text-xl md:text-2xl lg:text-[26px] font-medium leading-[1.45] text-[#000000] w-full max-w-5xl">
            We don't just work on projects or build ordinary websites. We engineer complete technology systems designed as real products, not isolated pieces of development. From the first concept to the final implementation, we bring the right technologies together around the customer's needs.
          </p>

          {/* Integrated Finishing Technical Label */}
          <div className="pt-2">
            <div className="inline-flex items-center gap-2 font-mono-tech text-xs font-bold text-[#191c1b] tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#476800] inline-block shrink-0"></span>
              <span className="text-[#444748]">
                CAD <span className="text-[#476800]">×</span> HARDWARE <span className="text-[#476800]">×</span> EMBEDDED <span className="text-[#476800]">×</span> IoT <span className="text-[#476800]">×</span> SOFTWARE <span className="text-[#476800]">×</span> CLOUD
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          2 & 3. TWO VERTICAL MOVING PROJECT COLUMNS
          COLUMN 1: TOP → BOTTOM (animate-marquee-down)
          COLUMN 2: BOTTOM → TOP (animate-marquee-up)
          Viewport sized so 4–5 cards are naturally visible at once.
          ================================================== */}
      <section className="px-4 sm:px-6 md:px-16 py-6 max-w-[1240px] mx-auto">
        <div className="relative h-[820px] sm:h-[940px] md:h-[1020px] lg:h-[1100px] overflow-hidden rounded-2xl border border-[#c4c7c7]/50 bg-[#fafafa]">
          {/* Top & bottom subtle gradient masks for seamless visual fade */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-16 sm:h-24 bg-gradient-to-b from-[#fafafa] via-[#fafafa]/80 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 sm:h-24 bg-gradient-to-t from-[#fafafa] via-[#fafafa]/80 to-transparent z-10" />

          {/* Two vertical columns container */}
          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:gap-6 h-full p-3 sm:p-5 md:p-6">
            {/* COLUMN 1: TOP → BOTTOM */}
            <div className="vertical-marquee-col h-full overflow-hidden relative">
              <div className="flex flex-col gap-3 sm:gap-4 animate-marquee-down">
                {col1Items.map((item, idx) => (
                  <div
                    key={`c1-${item.number}-${idx}`}
                    className="bg-white border border-[#c4c7c7]/60 rounded-xl overflow-hidden shadow-xs hover:border-[#476800] hover:shadow-md hover:scale-[1.02] transition-all duration-300 select-none group"
                  >
                    {/* Project Image */}
                    <div className="h-28 sm:h-32 md:h-36 lg:h-40 w-full bg-[#f3f4f1] overflow-hidden relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-xs text-white font-mono-tech text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded">
                        {item.number}
                      </div>
                    </div>

                    {/* Project Meta */}
                    <div className="p-3 sm:p-3.5 md:p-4">
                      <h3 className="font-display-tech text-xs sm:text-sm md:text-base font-extrabold text-[#000000] mb-0.5 uppercase tracking-tight group-hover:text-[#476800] transition-colors leading-snug line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="font-mono-tech text-[10px] sm:text-[11px] text-[#74a81e] font-semibold uppercase tracking-wider">
                        {item.category}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* COLUMN 2: BOTTOM → TOP */}
            <div className="vertical-marquee-col h-full overflow-hidden relative">
              <div className="flex flex-col gap-3 sm:gap-4 animate-marquee-up">
                {col2Items.map((item, idx) => (
                  <div
                    key={`c2-${item.number}-${idx}`}
                    className="bg-white border border-[#c4c7c7]/60 rounded-xl overflow-hidden shadow-xs hover:border-[#476800] hover:shadow-md hover:scale-[1.02] transition-all duration-300 select-none group"
                  >
                    {/* Project Image */}
                    <div className="h-28 sm:h-32 md:h-36 lg:h-40 w-full bg-[#f3f4f1] overflow-hidden relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-xs text-white font-mono-tech text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded">
                        {item.number}
                      </div>
                    </div>

                    {/* Project Meta */}
                    <div className="p-3 sm:p-3.5 md:p-4">
                      <h3 className="font-display-tech text-xs sm:text-sm md:text-base font-extrabold text-[#000000] mb-0.5 uppercase tracking-tight group-hover:text-[#476800] transition-colors leading-snug line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="font-mono-tech text-[10px] sm:text-[11px] text-[#74a81e] font-semibold uppercase tracking-wider">
                        {item.category}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          4. FINAL CTA: HAVE AN IDEA? LET'S BUILD IT.
          "LET'S BUILD IT." in Cosmic Circuit Green (#476800).
          Minimal CTA card without start a project button.
          ================================================== */}
      <section className="px-6 md:px-16 pt-16 md:pt-20 pb-10 max-w-[1440px] mx-auto">
        <ScrollReveal>
          <div className="bg-white border border-[#c4c7c7]/70 rounded-2xl p-8 sm:p-12 md:p-16 text-center max-w-3xl mx-auto shadow-xs">
            <span className="font-mono-tech text-xs text-[#476800] font-bold uppercase tracking-widest block mb-3">
              HAVE AN IDEA?
            </span>

            <h2 className="font-display-tech text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#476800] tracking-tight mb-4">
              LET'S BUILD IT.
            </h2>

            <p className="font-display-tech text-base sm:text-lg text-[#444748] leading-relaxed max-w-xl mx-auto">
              Tell us the problem you're trying to solve. We'll work with you to find the right combination of hardware, software and engineering.
            </p>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};
