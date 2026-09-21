import React, { useState, useEffect, useRef } from 'react';

interface ReasonItem {
  num: string;
  title: string;
  description: string;
}

interface WhyChooseItemRowProps {
  item: ReasonItem;
  isLast: boolean;
}

const WhyChooseItemRow: React.FC<WhyChooseItemRowProps> = ({ item, isLast }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    // Trigger each item individually when 15-25% of that item enters the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.unobserve(el); // Keep visible once revealed
        }
      },
      {
        threshold: 0.2, // 20% visible
        rootMargin: '0px 0px -5% 0px'
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rowRef}
      className="relative flex items-start gap-5 sm:gap-8 group pb-10 sm:pb-14 last:pb-0"
    >
      {/* Flowchart Spine (Left Column): Circle + Connecting Line */}
      <div className="flex flex-col items-center shrink-0 relative self-stretch">
        {/* Full Solid Green Number Circle with White Number */}
        <div
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#476800] text-white flex items-center justify-center font-mono-tech font-bold text-base sm:text-lg z-10 shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-108"
          style={{ borderRadius: '50%' }}
          aria-label={`Step ${item.num}`}
        >
          <span>{item.num}</span>
        </div>

        {/* Flowchart Connecting Line (passes through centers, stopped on last item) */}
        {!isLast && (
          <div
            className="w-[2px] bg-[#c4c7c7]/60 group-hover:bg-[#476800]/50 transition-colors duration-300 absolute top-12 sm:top-14 bottom-0 left-1/2 -translate-x-1/2"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Horizontal Branch Connector (Desktop / Tablet) */}
      <div
        className="hidden sm:flex items-center shrink-0 w-8 md:w-12 h-12 sm:h-14"
        aria-hidden="true"
      >
        <div className="w-full h-[2px] bg-[#c4c7c7]/60 group-hover:bg-[#476800]/50 transition-colors duration-300" />
      </div>

      {/* Content Card with One-By-One Left-to-Right Scroll Reveal */}
      <div
        className={`flex-grow bg-white border border-[#c4c7c7]/60 rounded-xl p-6 sm:p-8 shadow-xs hover:border-[#000000] hover:shadow-md transition-all duration-700 ease-out relative will-change-transform ${
          hasEntered
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 -translate-x-[50px] sm:-translate-x-[100px]'
        }`}
      >
        {/* Subtle top corner indicator line on hover */}
        <div className="w-8 h-[2px] bg-transparent group-hover:bg-[#476800] transition-colors duration-300 mb-3 rounded-full" />

        {/* Card Title */}
        <h3 className="font-display-tech text-xl sm:text-2xl font-extrabold text-[#000000] tracking-tight mb-3 group-hover:text-[#476800] transition-colors duration-200">
          {item.title}
        </h3>

        {/* Card Description */}
        <p className="font-display-tech text-sm sm:text-base text-[#444748] leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
};

export const PhaseSequence: React.FC = () => {
  const reasons: ReasonItem[] = [
    {
      num: '01',
      title: 'CREATIVE SOLUTIONS',
      description:
        "We don't simply follow standard solutions. We understand the problem, think differently and create practical, innovative solutions specifically around each customer's needs."
    },
    {
      num: '02',
      title: 'CUSTOMER FIRST',
      description:
        "Every project starts with understanding the customer. Their requirements, goals and challenges guide our decisions, so the final solution is built for their actual needs."
    },
    {
      num: '03',
      title: 'END-TO-END DEVELOPMENT',
      description:
        'We build across both hardware and software — from electronics, embedded systems, IoT and PCB design to software, AI, web platforms and complete product development.'
    },
    {
      num: '04',
      title: 'LONG-TERM PARTNERSHIP',
      description:
        "We don't want to be just a service provider. We aim to become a technology partner, supporting your product from the first idea through development, improvement and future growth."
    }
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const [sectionRevealed, setSectionRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionRevealed(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-choose"
      className={`py-16 md:py-24 px-6 md:px-16 max-w-[1440px] mx-auto border-t border-[#c4c7c7]/30 transition-all duration-700 ease-out will-change-transform ${
        sectionRevealed
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-[50px]'
      }`}
    >
      {/* Section Heading with COSMIC CIRCUIT in green */}
      <div className="max-w-4xl mb-14 md:mb-20">
        <span className="font-mono-tech text-xs md:text-sm text-[#476800] tracking-widest uppercase flex items-center gap-2 mb-3 font-bold">
          <span className="w-2.5 h-2.5 bg-[#476800] rounded-full inline-block"></span>
          <span>WHY CHOOSE</span>
        </span>
        <h2 className="font-display-tech text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#000000] tracking-tight">
          WHY CHOOSE <span className="text-[#476800]">COSMIC CIRCUIT</span>?
        </h2>
      </div>

      {/* Vertical Flowchart Container */}
      <div className="max-w-4xl relative">
        <div className="flex flex-col">
          {reasons.map((item, index) => (
            <WhyChooseItemRow
              key={item.num}
              item={item}
              isLast={index === reasons.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
