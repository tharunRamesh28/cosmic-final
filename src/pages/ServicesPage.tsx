import React, { useEffect, useRef, useState } from 'react';
import { CursorGrid } from '../components/CursorGrid';
import { ArrowRight, Check, Activity, Cpu, Box, Terminal, Bot } from 'lucide-react';
import { Link, useRouter } from '../router';
import { HERO_PRODUCT_IMAGE } from '../data/cosmicData';
import smartDripImg from '../assets/smartdrip_plus.jpg';
import roboticsImg from '../../projects/Automatic Fire Fighting System.png';
import homeAutomationImg from '../../projects/Automatic Home Automation System.png';
import smartEnergyImg from '../../projects/SMART ENERGY MONITORING & AUTOMATIC LIGHTING.png';
import webDevImg from '../../projects/WhatsApp Image 2026-09-30 at 1.50.07 PM.jpeg';

interface CompactService {
  id: string;
  num: string;
  title: string;
  subtitle?: string;
  description: string;
  capabilities: string[];
  image: string;
  badge: string;
  icon: React.ElementType;
}

export const ServicesPage: React.FC = () => {
  const { navigate } = useRouter();

  // Five services including Robotics
  const services: CompactService[] = [
    {
      id: 'iot',
      num: '01',
      title: 'IoT SYSTEMS',
      description:
        'Connected systems that collect, communicate and respond in real time — from sensor networks and smart devices to cloud-connected monitoring platforms.',
      capabilities: [
        'Sensor Integration',
        'Wireless Connectivity',
        'Real-Time Monitoring',
        'Cloud Integration',
      ],
      image: homeAutomationImg,
      badge: 'CONNECTED ECOSYSTEM',
      icon: Activity,
    },
    {
      id: 'embedded',
      num: '02',
      title: 'EMBEDDED SYSTEMS',
      subtitle: 'PROTOTYPE → PRODUCT',
      description:
        'From working prototypes to product-oriented embedded systems, we combine electronics, firmware and intelligent control to build reliable technology.',
      capabilities: [
        'Microcontrollers',
        'Firmware',
        'Electronics Integration',
        'Prototype Development',
        'Product Development',
      ],
      image: smartEnergyImg,
      badge: 'PROTOTYPE → PRODUCT',
      icon: Cpu,
    },
    {
      id: 'cad',
      num: '03',
      title: 'CAD DESIGN',
      description:
        'Product and mechanical designs developed around electronics, functionality and manufacturing requirements — from concept models to prototype-ready designs.',
      capabilities: [
        '3D CAD',
        'Product Enclosures',
        'Mechanical Design',
        'Electronics Integration',
      ],
      image:
        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80',
      badge: 'PRECISION ENCLOSURES',
      icon: Box,
    },
    {
      id: 'web',
      num: '04',
      title: 'WEB DEVELOPMENT',
      description:
        'Full-stack web platforms that connect products, users and data — from responsive interfaces to backend systems, databases and cloud-connected applications.',
      capabilities: [
        'Frontend',
        'Backend',
        'APIs',
        'Databases',
        'Cloud Integration',
      ],
      image: webDevImg,
      badge: 'FULL-STACK DASHBOARDS',
      icon: Terminal,
    },
    {
      id: 'robotics',
      num: '05',
      title: 'ROBOTICS',
      description:
        'Design and development of intelligent robotic systems for automation, monitoring, inspection, and real-world applications.',
      capabilities: [
        'Mobile Robotics',
        'Embedded Robotic Control',
        'Motor Control',
        'Sensor Integration',
        'Autonomous Systems',
        'Robotic Automation',
        'Inspection Robots',
        'IoT-Connected Robotics',
      ],
      image: roboticsImg,
      badge: 'INTELLIGENT AUTOMATION',
      icon: Bot,
    },
  ];

  return (
    <div className="w-full relative text-[#191c1b] selection:bg-[#c8f179] selection:text-[#000000]">
      {/* Background Subtle Tech Grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="tech-grid absolute inset-0 opacity-40 pointer-events-none -z-10" />
        <CursorGrid color="0, 0, 0" maxOpacity={0.25} />
      </div>

      {/* 1. SERVICES PAGE HEADING (Compact & Professional) */}
      <section className="px-6 md:px-16 pt-10 sm:pt-14 md:pt-16 pb-8 md:pb-12 max-w-[1280px] mx-auto border-b border-[#c4c7c7]/30">
        {/* Breadcrumb */}
        <div className="font-mono-tech text-xs text-[#74a81e] font-semibold mb-4 flex items-center gap-2">
          <Link to="/" className="text-[#444748] hover:text-black transition-colors">
            HOME
          </Link>
          <span>/</span>
          <span>SERVICES</span>
        </div>

        <div className="max-w-4xl">
          {/* Main Editorial Heading */}
          <h1 className="font-display-tech text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#000000] tracking-tight leading-[1.05] mb-4">
            WHAT WE{' '}
            <span className="text-[#476800] bg-[#daf396] px-3 py-0.5 rounded-sm inline-block shadow-2xs">
              ENGINEER.
            </span>
          </h1>

          {/* Short Introduction */}
          <p className="font-display-tech text-base sm:text-lg md:text-xl text-[#3b3e3c] leading-relaxed font-normal max-w-3xl">
            From connected electronics and embedded systems to CAD and full-stack web platforms, we build technology around the product and the customer&apos;s requirements.
          </p>
        </div>
      </section>

      {/* 2. FOUR COMPACT HORIZONTAL SERVICE CARDS (~320-380px Desktop Height) */}
      <section className="px-6 md:px-16 py-10 md:py-14 max-w-[1280px] mx-auto space-y-6 sm:space-y-8">
        {services.map((svc) => (
          <CompactServiceCard key={svc.id} service={svc} />
        ))}
      </section>

      {/* 3. COMPACT CUSTOMER-FIRST CLOSING SECTION */}
      <section className="px-6 md:px-16 pt-10 pb-16 md:pb-20 max-w-[1280px] mx-auto">
        <div className="bg-[#ffffff] border border-[#c4c7c7]/80 rounded-xl p-6 sm:p-10 md:p-12 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="font-mono-tech text-[11px] text-[#476800] font-bold tracking-widest uppercase mb-2 block">
              # CUSTOMER-FIRST ENGINEERING
            </span>
            <h2 className="font-display-tech text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#000000] tracking-tight mb-3">
              THE RIGHT TECHNOLOGY FOR THE PRODUCT YOU ACTUALLY NEED.
            </h2>
            <p className="font-display-tech text-sm sm:text-base text-[#444748] leading-relaxed font-normal">
              We don&apos;t force every customer into the same technology stack. We combine hardware, software and engineering around the actual requirements of each product.
            </p>
          </div>

          <button
            onClick={() => navigate('/order')}
            id="services-start-project-btn"
            className="bg-[#000000] text-white font-mono-tech text-xs tracking-wider px-7 py-3 rounded flex items-center justify-center gap-3 hover:bg-[#2e312f] transition-all duration-200 group cosmic-glow shadow-md cursor-pointer shrink-0"
          >
            <span>START A PROJECT</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-[#c8f179]" />
          </button>
        </div>
      </section>
    </div>
  );
};

const CompactServiceCard: React.FC<{ service: CompactService }> = ({ service }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const IconComp = service.icon;

  return (
    <div
      ref={cardRef}
      id={`service-card-${service.id}`}
      className={`group rounded-xl bg-[#ffffff] border border-[#c4c7c7]/60 hover:border-[#000000] p-5 sm:p-7 md:p-8 shadow-xs hover:shadow-md transition-all duration-500 will-change-transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-stretch">
        
        {/* LEFT CONTENT AREA: ~60% Width */}
        <div className="md:col-span-7 flex flex-col justify-between">
          <div>
            {/* Number + Subtitle / Badge */}
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="font-mono-tech text-xs sm:text-sm font-bold px-2 py-0.5 rounded bg-[#f3f4f1] text-[#444748] group-hover:bg-[#daf396] group-hover:text-[#476800] transition-colors duration-200">
                {service.num}
              </span>
              {service.subtitle && (
                <span className="font-mono-tech text-[11px] uppercase font-extrabold tracking-wider text-[#476800] bg-[#f4fbe9] border border-[#c4c7c7]/50 px-2.5 py-0.5 rounded">
                  {service.subtitle}
                </span>
              )}
            </div>

            {/* Title */}
            <h2 className="font-display-tech text-2xl sm:text-3xl font-extrabold text-[#000000] tracking-tight mb-2.5 group-hover:text-[#476800] transition-colors duration-200">
              {service.title}
            </h2>

            {/* Short Description */}
            <p className="font-display-tech text-sm sm:text-base text-[#444748] leading-relaxed mb-5 font-normal">
              {service.description}
            </p>
          </div>

          {/* Key Capabilities List */}
          <div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {service.capabilities.map((cap) => (
                <span
                  key={cap}
                  className="font-mono-tech text-[10px] sm:text-[11px] text-[#2e312f] bg-[#f9faf7] border border-[#c4c7c7]/60 group-hover:border-[#476800]/40 px-2.5 py-1 rounded shadow-3xs flex items-center gap-1.5 font-medium transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#476800] shrink-0" />
                  {cap}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT VISUAL AREA: ~40% Width (Photo + Clean Crop + Subtle Hover Depth) */}
        <div className="md:col-span-5 w-full min-h-[220px] sm:min-h-[250px] md:min-h-[260px] max-h-[340px] rounded-lg overflow-hidden border border-[#c4c7c7]/50 bg-[#f3f4f1] relative group/photo">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover group-hover/photo:scale-104 transition-transform duration-500 ease-out"
            loading="lazy"
          />

          {/* Subtle technical gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover/photo:opacity-20 transition-opacity" />

          {/* Top-Right Technical Icon Indicator */}
          <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-xs text-[#c8f179] p-2 rounded border border-neutral-700 shadow-sm">
            <IconComp className="w-4 h-4" />
          </div>

          {/* Bottom Badge */}
          <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-xs text-white font-mono-tech text-[9px] sm:text-[10px] font-bold px-2.5 py-1 rounded border border-neutral-700 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8f179] animate-pulse" />
            <span>{service.badge}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
