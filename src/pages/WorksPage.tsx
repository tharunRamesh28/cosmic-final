import React from 'react';
import { ArrowRight, Link as LinkIcon } from 'lucide-react';
import { Link, useRouter } from '../router';
import { HERO_PRODUCT_IMAGE } from '../data/cosmicData';
import smartDripImg from '../assets/smartdrip_plus.jpg';
import { HeroParallax, HeroParallaxProduct } from '../components/HeroParallax';
import { ScrollReveal } from '../components/ScrollReveal';

export interface EditorialProject {
  number: string;
  name: string;
  category: string;
  description: string;
  technologies: string[];
  image: string;
}

export const WorksPage: React.FC = () => {
  const { navigate } = useRouter();

  // Curated project images representing actual Cosmic Circuit engineering disciplines
  const cadEnclosureImg =
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80';
  const webDashboardImg =
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80';
  const roboticArmImg =
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80';
  const circuitPrototypeImg =
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80';
  const industrialSensingImg =
    'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=900&q=80';

  // 15 project images across 3 rows for the 3D Hero Parallax
  const parallaxProducts: HeroParallaxProduct[] = [
    // ROW 1: 5 items
    {
      title: 'Air Quality Monitoring',
      link: '#projects-editorial',
      thumbnail: HERO_PRODUCT_IMAGE,
    },
    {
      title: 'IoT Telemetry Platform',
      link: '#projects-editorial',
      thumbnail: smartDripImg,
    },
    {
      title: 'CAD Enclosure Design',
      link: '#projects-editorial',
      thumbnail: cadEnclosureImg,
    },
    {
      title: 'Embedded System Controller',
      link: '#projects-editorial',
      thumbnail: circuitPrototypeImg,
    },
    {
      title: 'AeroNode LoRa Transceiver',
      link: '#projects-editorial',
      thumbnail: HERO_PRODUCT_IMAGE,
    },

    // ROW 2: 5 items
    {
      title: 'Robotic Continuous Monitor',
      link: '#projects-editorial',
      thumbnail: roboticArmImg,
    },
    {
      title: 'Full-Stack Web Dashboard',
      link: '#projects-editorial',
      thumbnail: webDashboardImg,
    },
    {
      title: 'Smart Medical Infusion (SmartDrip+)',
      link: '#projects-editorial',
      thumbnail: smartDripImg,
    },
    {
      title: 'PulseMatrix Industrial Gateway',
      link: '#projects-editorial',
      thumbnail: industrialSensingImg,
    },
    {
      title: 'Connected Micro-Sensor Node',
      link: '#projects-editorial',
      thumbnail: HERO_PRODUCT_IMAGE,
    },

    // ROW 3: 5 items
    {
      title: 'Lumina Core Wearable Biosensor',
      link: '#projects-editorial',
      thumbnail: smartDripImg,
    },
    {
      title: 'Automated Plant Watering System',
      link: '#projects-editorial',
      thumbnail: HERO_PRODUCT_IMAGE,
    },
    {
      title: 'Precision Industrial Sensing',
      link: '#projects-editorial',
      thumbnail: industrialSensingImg,
    },
    {
      title: 'TDR Cable Fault Locator',
      link: '#projects-editorial',
      thumbnail: circuitPrototypeImg,
    },
    {
      title: 'Complete Smart Energy Hub',
      link: '#projects-editorial',
      thumbnail: HERO_PRODUCT_IMAGE,
    },
  ];

  // 10 compact editorial projects shown below the HeroParallax
  const editorialProjects: EditorialProject[] = [
    {
      number: '01',
      name: 'AIR QUALITY MONITORING',
      category: 'IoT / EMBEDDED',
      description:
        'An intelligent monitoring system combining environmental sensors, embedded electronics, real-time data processing and connected cloud visualization.',
      technologies: ['ESP32', 'Sensors', 'IoT', 'Cloud', 'Dashboard'],
      image: HERO_PRODUCT_IMAGE,
    },
    {
      number: '02',
      name: 'IoT MONITORING PLATFORM',
      category: 'IoT / CLOUD',
      description:
        'Continuous telemetry fleet ingestion platform handling multi-node sensory streams, low-latency WebSocket sockets, and dynamic alerting.',
      technologies: ['MQTT', 'Nordic nRF52', 'TimescaleDB', 'React', 'WebSockets'],
      image: smartDripImg,
    },
    {
      number: '03',
      name: 'EMBEDDED PRODUCT DEVELOPMENT',
      category: 'EMBEDDED / HARDWARE',
      description:
        'Complete hardware lifecycle delivery: micro-architecture design, 4-layer impedance-matched PCB layout, RTOS firmware, and industrial DFM validation.',
      technologies: ['STM32', 'Altium 365', 'FreeRTOS', 'C++', 'DFM'],
      image: circuitPrototypeImg,
    },
    {
      number: '04',
      name: 'ROBOTIC MONITORING SYSTEM',
      category: 'ROBOTICS / EMBEDDED',
      description:
        'Autonomous multi-axis inspection and optical sensor carrier for enclosed industrial spaces with fail-safe remote intervention.',
      technologies: ['ROS2', 'CAN Bus', 'BLDC Motor Control', 'LiDAR', 'Edge AI'],
      image: roboticArmImg,
    },
    {
      number: '05',
      name: 'SMART ELECTRONICS SYSTEM',
      category: 'ELECTRONICS',
      description:
        'Ultra-low-power sensing hardware engineered for multi-year coin-cell and energy-harvesting deployment in remote locations.',
      technologies: ['ARM Cortex-M4', 'Power Gating', 'Energy Harvesting', 'BLE 5.4'],
      image: HERO_PRODUCT_IMAGE,
    },
    {
      number: '06',
      name: 'CAD PRODUCT DESIGN',
      category: 'CAD / MECHANICAL',
      description:
        'Precision mechanical enclosures designed around circuit geometries, thermal thermal management channels, and IP67 waterproof tolerances.',
      technologies: ['Fusion 360', 'SolidWorks', 'STEP Assemblies', 'CNC Tooling'],
      image: cadEnclosureImg,
    },
    {
      number: '07',
      name: 'IoT DASHBOARD & OBSERVABILITY',
      category: 'WEB / IoT',
      description:
        'High-density operational dashboard visualizing machine metrics, firmware health logs, and remote OTA package dispatching.',
      technologies: ['React', 'TypeScript', 'Tailwind', 'GraphQL', 'Grafana'],
      image: webDashboardImg,
    },
    {
      number: '08',
      name: 'INTELLIGENT EMBEDDED SYSTEM',
      category: 'EMBEDDED / AI',
      description:
        'On-device neural inference classifying acoustic and vibration anomalies at the physical edge without transmitting raw audio.',
      technologies: ['TinyML', 'Edge Impulse', 'TensorFlow Lite', 'I2S Audio'],
      image: smartDripImg,
    },
    {
      number: '09',
      name: 'ELECTRONICS PROTOTYPE',
      category: 'ELECTRONICS',
      description:
        'Rapid turn Rev-A prototype bench fabrication, oscilloscopic verification, signal integrity analysis, and automated test fixtures.',
      technologies: ['KiCad', 'SMD Assembly', 'Rigol Analysis', 'Bed-of-Nails FCT'],
      image: circuitPrototypeImg,
    },
    {
      number: '10',
      name: 'COMPLETE PRODUCT SYSTEM',
      category: 'COMPLETE PRODUCTS',
      description:
        'Turnkey engineering combining CAD chassis, certified electronics, hardened firmware, and cloud control into a factory-shippable product.',
      technologies: ['Full-System Engineering', 'ISO 9001', 'FCC Pre-scan', 'CE Pack'],
      image: HERO_PRODUCT_IMAGE,
    },
  ];

  const categories = [
    'ALL',
    'ELECTRONICS',
    'EMBEDDED',
    'IoT',
    'CAD',
    'WEB',
    'COMPLETE PRODUCTS',
  ];

  const handleStartProject = () => {
    navigate('/order');
  };

  // Header component passed directly into HeroParallax
  const parallaxHeader = (
    <div className="max-w-[1440px] mx-auto px-6 md:px-16 pt-8 sm:pt-12 pb-12 sm:pb-16 w-full">
      {/* Breadcrumb / Section Eyebrow */}
      <div className="font-mono-tech text-xs text-[#476800] font-bold mb-6 sm:mb-8 flex items-center gap-2">
        <Link to="/" className="text-[#444748] hover:text-black transition-colors">
          HOME
        </Link>
        <span>#</span>
        <span>01 # OUR WORKS</span>
      </div>

      <div className="space-y-6 sm:space-y-8">
        <span className="font-mono-tech text-xs md:text-sm text-[#444748] font-bold tracking-widest uppercase block">
          OUR WORKS
        </span>

        {/* Heading */}
        <h1 className="font-display-tech text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#000000] tracking-tight leading-[1.06] max-w-4xl">
          ENGINEERING IDEAS
          <br />
          INTO <span className="text-[#476800]">REAL PRODUCTS.</span>
        </h1>

        {/* Concise Supporting Statement */}
        <p className="font-display-tech text-lg sm:text-xl md:text-2xl font-medium leading-[1.45] text-[#191c1b] max-w-3xl">
          We don't just build isolated projects. We engineer complete technology systems — combining electronics, embedded systems, IoT, CAD and software to turn ideas into working products.
        </p>

        {/* Technical Disciplines Badges */}
        <div className="pt-2 flex flex-wrap items-center gap-2 font-mono-tech text-xs font-bold text-[#191c1b]">
          <span className="w-2 h-2 rounded-full bg-[#476800] inline-block shrink-0"></span>
          <span className="text-[#444748]">
            CAD <span className="text-[#476800]">×</span> HARDWARE <span className="text-[#476800]">×</span> EMBEDDED <span className="text-[#476800]">×</span> IoT <span className="text-[#476800]">×</span> SOFTWARE <span className="text-[#476800]">×</span> CLOUD
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full relative text-[#191c1b] selection:bg-[#c8f179] selection:text-[#000000] overflow-x-hidden">
      {/* Background Subtle Tech Grid */}
      <div className="tech-grid absolute inset-0 opacity-30 pointer-events-none -z-10" />

      {/* ==================================================
          1 & 2. 3D HERO PARALLAX SHOWCASE (ACETERNITY STYLE)
          ================================================== */}
      <HeroParallax products={parallaxProducts} header={parallaxHeader} />

      {/* ==================================================
          3. COMPACT EDITORIAL PROJECT DIRECTORY SECTION
          ================================================== */}
      <section
        id="projects-editorial"
        className="px-6 md:px-16 pt-16 md:pt-24 pb-20 max-w-[1440px] mx-auto"
      >
        <ScrollReveal>
          {/* Section Header */}
          <div className="border-b border-[#c4c7c7]/60 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-mono-tech text-xs text-[#476800] font-bold uppercase tracking-widest block mb-2">
                SHIPPED PORTFOLIO
              </span>
              <h2 className="font-display-tech text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#000000] tracking-tight">
                SELECTED CASE STUDIES
              </h2>
            </div>

            {/* Categories Bar */}
            <div className="flex flex-wrap gap-2 pt-2">
              {categories.map((cat, idx) => (
                <span
                  key={cat}
                  className={`font-mono-tech text-[10px] sm:text-[11px] font-bold px-3 py-1 rounded-full border transition-colors ${
                    idx === 0
                      ? 'bg-black text-[#c8f179] border-black'
                      : 'bg-white/80 text-[#444748] border-[#c4c7c7]/60'
                  }`}
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Compact Editorial Layout: 2 Columns of Clean Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {editorialProjects.map((project, idx) => (
            <ScrollReveal key={project.number} delay={(idx % 2) * 100}>
              <div className="bg-white border border-[#c4c7c7]/60 rounded-2xl p-6 sm:p-7 hover:border-[#476800] hover:shadow-[0_10px_35px_rgba(71,104,0,0.08)] transition-all duration-300 flex flex-col justify-between group h-full">
                <div>
                  {/* Top Bar: Number & Category */}
                  <div className="flex items-center justify-between border-b border-[#c4c7c7]/30 pb-4 mb-5">
                    <span className="font-mono-tech text-xl sm:text-2xl font-black text-[#000000] tracking-tight group-hover:text-[#476800] transition-colors">
                      {project.number}
                    </span>
                    <span className="font-mono-tech text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#476800] bg-[#c8f179]/20 px-2.5 py-1 rounded border border-[#c8f179]/40">
                      {project.category}
                    </span>
                  </div>

                  {/* Thumbnail Preview Banner */}
                  <div className="h-44 sm:h-52 w-full rounded-xl overflow-hidden mb-5 bg-[#f3f4f1] relative border border-[#c4c7c7]/40">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                    <span className="absolute bottom-3 left-3 text-white font-mono-tech text-[11px] font-bold tracking-wider">
                      COSMIC // ENG_REF_{project.number}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="font-display-tech text-xl sm:text-2xl font-black text-[#000000] mb-3 tracking-tight group-hover:text-[#476800] transition-colors leading-snug">
                    {project.name}
                  </h3>

                  {/* Short Description */}
                  <p className="font-display-tech text-sm sm:text-base text-[#444748] leading-relaxed mb-5">
                    {project.description}
                  </p>
                </div>

                {/* Technologies List */}
                <div className="pt-4 border-t border-[#c4c7c7]/30">
                  <div className="font-mono-tech text-[11px] text-[#191c1b] font-bold uppercase tracking-wider mb-2">
                    TECHNOLOGIES:
                  </div>
                  <div className="flex flex-wrap gap-1.5 font-mono-tech text-[10px] sm:text-[11px] text-[#444748]">
                    {project.technologies.map((tech, i) => (
                      <span key={tech} className="inline-flex items-center">
                        <span className="text-[#000000] font-semibold">{tech}</span>
                        {i < project.technologies.length - 1 && (
                          <span className="mx-1.5 text-[#476800] font-bold">·</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ==================================================
          4. CUSTOMER-FIRST MESSAGE & CTA
          ================================================== */}
      <section className="px-6 md:px-16 pt-8 pb-16 max-w-[1440px] mx-auto">
        <ScrollReveal>
          <div className="bg-[#090909] text-white rounded-2xl md:rounded-3xl border border-neutral-800 p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-2xl">
            {/* Cosmic Circuit subtle green ambient glow near bottom */}
            <div
              className="absolute inset-x-0 bottom-0 h-48 opacity-30 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at bottom center, #c8f179 0%, #476800 40%, transparent 80%)',
              }}
            />
            <div className="tech-grid-dark absolute inset-0 opacity-20 pointer-events-none" />

            <div className="relative z-10 max-w-3xl">
              <span className="font-mono-tech text-xs text-[#c8f179] font-bold uppercase tracking-widest block mb-4">
                ENGINEERING PHILOSOPHY
              </span>

              <h2 className="font-display-tech text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                ENGINEERED AROUND
                <br />
                <span className="text-[#c8f179]">THE PROBLEM.</span>
              </h2>

              <p className="font-display-tech text-base sm:text-lg md:text-xl text-[#c4c7c7] leading-relaxed mb-8 max-w-2xl">
                "Every project starts with a requirement, not a predefined technology stack. We combine the hardware, software and engineering needed to create the right solution."
              </p>

              <div>
                <button
                  type="button"
                  onClick={handleStartProject}
                  className="inline-flex items-center gap-3 bg-[#c8f179] text-black font-mono-tech font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl hover:bg-[#b9e86a] hover:shadow-[0_0_25px_rgba(200,241,121,0.5)] transition-all duration-300 group cursor-pointer"
                >
                  <span>START A PROJECT</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Subtle Green Ambient Effect Anchor before Footer */}
      <div
        className="w-full h-24 pointer-events-none opacity-40 -mb-20"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(200, 241, 121, 0.25) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
    </div>
  );
};
