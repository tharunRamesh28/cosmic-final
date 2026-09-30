import React from 'react';
import { CursorGrid } from '../components/CursorGrid';
import { ArrowRight, Link as LinkIcon } from 'lucide-react';
import { Link, useRouter } from '../router';
import { HeroParallax, HeroParallaxProduct } from '../components/HeroParallax';
import { ScrollReveal } from '../components/ScrollReveal';

import airQualityMonitorImg from '../../projects/Air quality monitor.png';
import automaticFireFightingImg from '../../projects/Automatic Fire Fighting System.png';
import homeAutomationImg from '../../projects/Automatic Home Automation System.png';
import irrigationDashboardImg from '../../projects/ChatGPT Image Sep 26, 2026, 07_43_14 PM.png';
import clothesCollectorImg from '../../projects/SMART AUTOMATIC CLOTHES COLLECTOR SYSTEM.png';
import energyMonitoringImg from '../../projects/SMART ENERGY MONITORING & AUTOMATIC LIGHTING.png';
import medicineReminderImg from '../../projects/Smart Medicine Reminder System.png';
import webDashboardActualImg from '../../projects/Webdashboard.png';
import gasMonitoringDashboardImg from '../../projects/WhatsApp Image 2026-09-30 at 1.50.07 PM.jpeg';

export interface EditorialProject {
  number: string;
  name: string;
  category: string;
  description: string;
  technologies: string[];
  image: string | null;
}

export const WorksPage: React.FC = () => {
  const { navigate } = useRouter();

  // 15 project images across 3 rows for the 3D Hero Parallax
  // Strictly using ONLY actual user-uploaded project images from /projects
  const parallaxProducts: HeroParallaxProduct[] = [
    // ROW 1: 5 items
    {
      title: 'Air Quality Monitoring',
      link: '#projects-editorial',
      thumbnail: airQualityMonitorImg,
    },
    {
      title: 'IoT Telemetry Platform',
      link: '#projects-editorial',
      thumbnail: gasMonitoringDashboardImg,
    },
    {
      title: 'Smart Medicine Reminder System',
      link: '#projects-editorial',
      thumbnail: medicineReminderImg,
    },
    {
      title: 'Automatic Fire Fighting System',
      link: '#projects-editorial',
      thumbnail: automaticFireFightingImg,
    },
    {
      title: 'Smart Energy & Automatic Lighting',
      link: '#projects-editorial',
      thumbnail: energyMonitoringImg,
    },

    // ROW 2: 5 items
    {
      title: 'Automatic Home Automation System',
      link: '#projects-editorial',
      thumbnail: homeAutomationImg,
    },
    {
      title: 'Full-Stack Web Dashboard',
      link: '#projects-editorial',
      thumbnail: webDashboardActualImg,
    },
    {
      title: 'Automatic Clothes Collector System',
      link: '#projects-editorial',
      thumbnail: clothesCollectorImg,
    },
    {
      title: 'Automated Plant Watering System',
      link: '#projects-editorial',
      thumbnail: irrigationDashboardImg,
    },
    {
      title: 'Environmental Air Quality Sentinel',
      link: '#projects-editorial',
      thumbnail: airQualityMonitorImg,
    },

    // ROW 3: 5 items
    {
      title: 'Smart Clothes Protector System',
      link: '#projects-editorial',
      thumbnail: clothesCollectorImg,
    },
    {
      title: 'Intelligent Plant Irrigation System',
      link: '#projects-editorial',
      thumbnail: irrigationDashboardImg,
    },
    {
      title: 'Multi-Gas IoT Telemetry Dashboard',
      link: '#projects-editorial',
      thumbnail: gasMonitoringDashboardImg,
    },
    {
      title: 'Healthcare Adherence Reminder System',
      link: '#projects-editorial',
      thumbnail: medicineReminderImg,
    },
    {
      title: 'Energy Monitoring & Control Hub',
      link: '#projects-editorial',
      thumbnail: energyMonitoringImg,
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
      image: airQualityMonitorImg,
    },
    {
      number: '02',
      name: 'IoT MONITORING PLATFORM',
      category: 'IoT / CLOUD',
      description:
        'Continuous telemetry fleet ingestion platform handling multi-node sensory streams, low-latency WebSocket sockets, and dynamic alerting.',
      technologies: ['MQTT', 'Nordic nRF52', 'TimescaleDB', 'React', 'WebSockets'],
      image: gasMonitoringDashboardImg,
    },
    {
      number: '03',
      name: 'SMART MEDICINE REMINDER SYSTEM',
      category: 'EMBEDDED / HEALTHCARE',
      description:
        'Connected medication scheduling device with multi-compartment real-time adherence tracking, audiovisual alarms, and automated notifications.',
      technologies: ['Microcontroller', 'RTC', 'IR Sensors', 'Buzzer/OLED', 'IoT Alerting'],
      image: medicineReminderImg,
    },
    {
      number: '04',
      name: 'AUTOMATIC FIRE FIGHTING SYSTEM',
      category: 'ROBOTICS / EMBEDDED',
      description:
        'Autonomous flame-sensing robotic extinguisher equipped with multi-zone flame detection, pump actuation, and fail-safe remote intervention.',
      technologies: ['Flame Sensors', 'Servo Actuation', 'Motor Driver', 'Autonomous Logic'],
      image: automaticFireFightingImg,
    },
    {
      number: '05',
      name: 'AUTOMATIC HOME AUTOMATION SYSTEM',
      category: 'ELECTRONICS / SMART HOME',
      description:
        'Intelligent multi-appliance automation hub featuring sensor-driven switching, low-latency relay actuation, and centralized remote control.',
      technologies: ['Relay Modules', 'Wireless Control', 'Microcontroller', 'App Interface'],
      image: homeAutomationImg,
    },
    {
      number: '06',
      name: 'SMART AUTOMATIC CLOTHES COLLECTOR',
      category: 'CAD / MECHANICAL / IoT',
      description:
        'Weather-responsive mechanical retracting enclosure engineered with rain and light optical detection to safeguard laundry automatically.',
      technologies: ['Rain Sensor', 'Stepper / DC Motor', 'Microcontroller', 'Mechanical Rig'],
      image: clothesCollectorImg,
    },
    {
      number: '07',
      name: 'IoT DASHBOARD & OBSERVABILITY',
      category: 'WEB / IoT',
      description:
        'High-density operational dashboard visualizing machine metrics, environmental sensor health logs, and telemetry dispatching.',
      technologies: ['React', 'TypeScript', 'Tailwind', 'Real-Time Charts', 'WebSockets'],
      image: webDashboardActualImg,
    },
    {
      number: '08',
      name: 'AUTOMATED PLANT WATERING SYSTEM',
      category: 'EMBEDDED / AGRICULTURE',
      description:
        'Precision soil moisture monitoring and algorithmic pump dispensing circuit ensuring automated hydration for domestic and greenhouse plants.',
      technologies: ['Soil Hygrometer', 'Submersible Pump', 'Relay Driver', 'ESP32'],
      image: irrigationDashboardImg,
    },
    {
      number: '09',
      name: 'ELECTRONICS PROTOTYPE',
      category: 'ELECTRONICS',
      description:
        'Rapid turn Rev-A prototype bench fabrication, oscilloscopic verification, signal integrity analysis, and automated test fixtures.',
      technologies: ['KiCad', 'SMD Assembly', 'Rigol Analysis', 'Bed-of-Nails FCT'],
      image: null,
    },
    {
      number: '10',
      name: 'SMART ENERGY MONITORING & LIGHTING',
      category: 'COMPLETE PRODUCTS / IoT',
      description:
        'Turnkey high-voltage AC load sensing, current/power metering, OLED diagnostic readout, and automated ambient lighting relay control.',
      technologies: ['Current Transformer', 'AC Relay', 'OLED Display', 'Power Gating'],
      image: energyMonitoringImg,
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
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="tech-grid absolute inset-0 opacity-30 pointer-events-none -z-10" />
        <CursorGrid color="0, 0, 0" maxOpacity={0.25} />
      </div>

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
                  {project.image ? (
                    <div className="h-44 sm:h-52 w-full rounded-xl overflow-hidden mb-5 bg-[#f3f4f1] relative border border-[#c4c7c7]/40">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none" />
                      <span className="absolute bottom-3 left-3 text-white font-mono-tech text-[11px] font-bold tracking-wider pointer-events-none">
                        COSMIC // ENG_REF_{project.number}
                      </span>
                    </div>
                  ) : (
                    <div className="h-28 sm:h-32 w-full rounded-xl overflow-hidden mb-5 bg-[#f3f4f1] relative border border-dashed border-[#c4c7c7]/60 flex items-center justify-between px-6">
                      <div className="flex flex-col">
                        <span className="font-mono-tech text-xs font-bold text-[#191c1b] tracking-wider uppercase">
                          CUSTOM ARCHITECTURE BUILD
                        </span>
                        <span className="font-mono-tech text-[11px] text-[#444748] mt-1">
                          Proprietary Hardware Specification · Documentation on Request
                        </span>
                      </div>
                      <span className="font-mono-tech text-[10px] text-[#476800] font-bold bg-[#c8f179]/20 px-2 py-0.5 rounded border border-[#c8f179]/40">
                        ENG_REF_{project.number}
                      </span>
                    </div>
                  )}

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
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="tech-grid-dark absolute inset-0 opacity-20 pointer-events-none" />
        <CursorGrid color="185, 232, 106" maxOpacity={0.25} />
      </div>

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
