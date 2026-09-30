import { PhaseStep, ServiceCapability, ProjectCaseStudy } from '../types';

export const HERO_PRODUCT_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuABVcjAYySrORK1JIhtpS4hERFzLMd-u-nDT0hNhVLNTvvaejdMzOiIodeJmo6V2fVIAcCeXoZOpuZdPyabGWj7oXHTgcQQM5S3dK0-3ww9hzVdrPFIZDzG3ATUp3wq7_avSm0V6gZFREFPLOYf6p9UeNk30YCAZZ3cRvlQAxsVv-n_RxE-C4kj5tzH2mrFLqJjfsoRcnxsYwxfz0nsnxvZjQgtbLS7_LJW6PHwl8Vb0pO43jSOoGtI';

export const PHASE_STEPS: PhaseStep[] = [
  {
    id: 'idea',
    number: '01',
    tag: '01 / IDEA',
    title: 'Feasibility & Exploration',
    subtitle: 'From Abstract Need to Viable Blueprint',
    description: 'We rigorously stress-test initial hypotheses, evaluate commercial BOM feasibility, and formulate early system architectures.',
    iconName: 'Lightbulb',
    deliverables: ['System Feasibility Matrix', 'Component Availability Audit', 'Patent & Tech Landscape Review', 'Target Cost of Goods (COGS) Model'],
    timeline: '1 - 2 Weeks',
    tools: ['Altium 365', 'Miro Architecture', 'Octopart API', 'Component Matrix Engine']
  },
  {
    id: 'concept',
    number: '02',
    tag: '01 / CONCEPT',
    title: 'Architectural Blueprinting',
    subtitle: 'Translating abstract requirements into technical schematics',
    description: 'Translating abstract requirements into technical schematics, communication topologies, and user interaction flows.',
    iconName: 'FileText',
    deliverables: ['High-level Electrical Block Diagrams', 'Firmware State Machines', 'Data Protocol Definitions', 'Industrial Form-Factor Constraints'],
    timeline: '2 - 3 Weeks',
    tools: ['KiCad Schematics', 'Draw.io Topology', 'SolidWorks Concept', 'Protocol Buffers']
  },
  {
    id: 'design',
    number: '03',
    tag: '02 / DESIGN',
    title: 'Industrial & Circuit Design',
    subtitle: 'Precision Mechanical & Electronic Layouts',
    description: 'Form-factor packaging, mechanical enclosures, PCB schematic capture, and impedance-matched routing with DFM constraints.',
    iconName: 'PenTool',
    deliverables: ['Multi-Layer PCB Gerber Files', '3D STEP CAD Assemblies', 'Thermal Dissipation Models', 'Component Clearance Audits'],
    timeline: '3 - 4 Weeks',
    tools: ['Altium Designer', 'Autodesk Fusion 360', 'ANSYS Thermal', 'Keysight RF Tools']
  },
  {
    id: 'engineering',
    number: '04',
    tag: '02 / ENGINEERING',
    title: 'Precision Development',
    subtitle: 'Rigorous coding and hardware prototyping',
    description: 'Rigorous coding and hardware prototyping following strict quality tolerances. Board brings-up, RTOS integration, and cloud APIs.',
    iconName: 'Cpu',
    deliverables: ['Bare-Metal / RTOS Firmware', 'Device Drivers & HAL', 'Secure Bootloader & OTA Engine', 'Restful & WebSocket Device APIs'],
    timeline: '4 - 6 Weeks',
    tools: ['FreeRTOS / Zephyr', 'Rust / C++', 'Nordic nRF Connect', 'Docker & Edge Run-times']
  },
  {
    id: 'prototype',
    number: '05',
    tag: '03 / PROTOTYPE',
    title: 'Functional Verification',
    subtitle: 'Real-World Validation & Iteration',
    description: 'Fabrication of Rev-A physical test units, CNC machined enclosures, environmental chamber testing, and RF certification pre-scans.',
    iconName: 'Layers',
    deliverables: ['Rev-A Working Prototypes', 'EMC / FCC Pre-Compliance Report', 'Thermal Performance Log', 'Battery Life & Current Draw Profile'],
    timeline: '2 - 3 Weeks',
    tools: ['Rigol Oscilloscopes', 'Spectrum Analyzers', 'Environmental Testing Chamber', 'CNC Prototyping']
  },
  {
    id: 'product',
    number: '06',
    tag: '03 / DEPLOYMENT',
    title: 'System Launch & Scaling',
    subtitle: 'Controlled rollout, infrastructure scaling, and continuous performance monitoring',
    description: 'Controlled rollout, infrastructure scaling, factory automated test fixtures (FCT), and continuous performance monitoring.',
    iconName: 'Box',
    deliverables: ['Production Test Fixture Firmware', 'Factory Flashing & Calibration Script', 'Cloud Telemetry Fleet Dashboard', 'CE / FCC / RoHS Compliance Pack'],
    timeline: 'Continuous / Mass Scale',
    tools: ['Automated Bed-of-Nails FCT', 'AWS IoT Core / GCP IoT', 'Grafana Monitoring', 'Over-The-Air Fleet Ops']
  }
];

export const CAPABILITIES: ServiceCapability[] = [
  {
    id: 'hardware',
    title: 'Hardware',
    tag: 'PHYSICAL_NODE_01',
    shortDesc: 'Custom PCB design, circuitry, and embedded systems engineered for reliability and scale.',
    fullDesc: 'We architect robust electronic hardware from ultra-low-power microcontrollers to high-speed digital and RF platforms. Every board is optimized for signal integrity, thermal efficiency, and high-yield automated manufacturing.',
    iconName: 'Cpu',
    features: [
      'Multi-layer HDI & RF Circuit Layouts',
      'Ultra-Low Power Micro-Amp Sleep Regimes',
      'Power Electronics, BMS & Solar Harvesting',
      'Design for Manufacturability (DFM) & Yield Optimization',
      'EMC/EMI Shielding & Regulatory Compliance Guidance'
    ],
    techStack: ['STM32 / ARM Cortex', 'Nordic nRF52/nRF53', 'ESP32-S3', 'Altium Designer', 'KiCad', 'Texas Instruments PMICs'],
    sampleDeliverables: ['Schematics (PDF/CAD)', 'BOM with verified distributor stock', 'Pick & Place / Gerber files', 'Bring-up & verification test protocol']
  },
  {
    id: 'iot',
    title: 'IoT',
    tag: 'CONNECTIVITY_NODE_02',
    shortDesc: 'Connected device ecosystems, sensor networks, and secure data transmission protocols.',
    fullDesc: 'End-to-end connectivity solutions that bridge physical nodes to the cloud with rock-solid uptime, military-grade cryptographic key management, and extreme range telemetry protocols.',
    iconName: 'Radio',
    features: [
      'LoRaWAN, BLE 5.4 Mesh & Cellular (NB-IoT/LTE-M)',
      'TLS 1.3 Hardware Cryptographic Coprocessors',
      'Fault-Tolerant A/B Partition Over-The-Air (OTA) Updates',
      'Sensor Fusion (IMU, Environmental, Optical, Acoustic)',
      'Sub-Gigahertz Custom RF Network Topologies'
    ],
    techStack: ['MQTT / CoAP', 'Zephyr RTOS', 'FreeRTOS', 'Microchip ATECC608B', 'Semtech LoRa SX1262', 'AWS IoT Core'],
    sampleDeliverables: ['Firmware binaries & source repo', 'Secure provisioning keys', 'Network topology schematics', 'Battery consumption benchmarks']
  },
  {
    id: 'web',
    title: 'Web',
    tag: 'INTERFACE_NODE_03',
    shortDesc: 'Performant web applications, dashboards, and APIs to interface with your physical products.',
    fullDesc: 'Lightning-fast, minimal user interfaces and edge API infrastructure built to visualize live device telemetry, control actuators with sub-50ms latency, and manage enterprise hardware fleets seamlessly.',
    iconName: 'Globe',
    features: [
      'Real-Time Telemetry Streaming & WebSockets',
      'High-Performance Canvas/WebGL Data Visualizers',
      'Fleet Provisioning & Remote Diagnostic Consoles',
      'REST & gRPC Microservices with Edge Caching',
      'Role-Based Hardware Access Control & Security'
    ],
    techStack: ['TypeScript', 'React / Vite', 'Node.js & Go', 'WebSockets / gRPC', 'Tailwind CSS', 'TimescaleDB / Postgres'],
    sampleDeliverables: ['Responsive Web Dashboard', 'Interactive API Documentation', 'Device Provisioning Portal', 'Role-Based Authentication Module']
  },
  {
    id: 'cad',
    title: 'CAD',
    tag: 'MECHANICAL_NODE_04',
    shortDesc: 'Industrial design, 3D modeling, and mechanical engineering for manufacturability.',
    fullDesc: 'Sleek, ergonomic, and production-ready physical enclosures engineered for real-world environmental extremes, ingress protection (IP67/IP68), thermal conduction, and seamless tool assembly.',
    iconName: 'Compass',
    features: [
      'Industrial Product Styling & Ergonomics',
      'Tooling-Ready Plastic Injection Molding & DFM',
      'IP67 / IP68 Waterproof Gasket Engineering',
      'Finite Element Analysis (FEA) & Thermal Conduction',
      'Precision CNC Machining & Sheet Metal Design'
    ],
    techStack: ['SolidWorks', 'Autodesk Fusion 360', 'KeyShot Rendering', '3D PolyJet & SLA Prototyping', 'ANSYS Mechanical'],
    sampleDeliverables: ['3D STEP / IGES Master Assemblies', '2D Dimensioned Engineering Drawings', 'Injection Mold Draft Angle Analysis', 'Photorealistic Product Renders']
  },
  {
    id: 'robotics',
    title: 'Robotics',
    tag: 'AUTONOMOUS_NODE_05',
    shortDesc: 'Design and development of intelligent robotic systems for automation, monitoring, inspection, and real-world applications.',
    fullDesc: 'Design and development of intelligent robotic systems for automation, monitoring, inspection, and real-world applications. We integrate motor drive electronics, embedded control loops, kinematic sensor fusion, and autonomous path planning.',
    iconName: 'Bot',
    features: [
      'Mobile Robotics',
      'Embedded Robotic Control',
      'Motor Control',
      'Sensor Integration',
      'Autonomous Systems',
      'Robotic Automation',
      'Inspection Robots',
      'IoT-Connected Robotics'
    ],
    techStack: ['ROS2', 'CAN Bus', 'BLDC Motor Control', 'LiDAR', 'Edge AI', 'STM32', 'FreeRTOS'],
    sampleDeliverables: ['Kinematic Architecture Schematics', 'Motor Driver Hardware Files', 'Embedded Motion Control Firmware', 'Sensor Fusion & Teleoperation Suite']
  }
];

export const FEATURED_PROJECTS: ProjectCaseStudy[] = [
  {
    id: 'aeronode',
    title: 'AeroNode Telemetry Node',
    clientCategory: 'Industrial IoT / Climate Tech',
    category: 'Hardware',
    description: 'An autonomous environmental sensing unit designed for remote deployments with zero maintenance for 5+ years.',
    challenge: 'Achieve sub-5uA deep sleep while sampling 8 distinct atmospheric sensors and transmitting via LoRaWAN up to 15km in mountainous terrain.',
    solution: 'Engineered a custom dual-core Nordic nRF5340 board with integrated solar MPPT charging, precision power gating, and custom helical antenna matching network.',
    results: [
      'Zero battery degradation across 18-month field trial',
      '14.2 km maximum line-of-sight packet transmission',
      'IP68 sealed enclosure with breathable Gore-Tex pressure valve'
    ],
    techStack: ['Nordic nRF5340', 'Semtech LoRa', 'Altium Designer', 'Zephyr RTOS', 'IP68 Enclosure'],
    image: HERO_PRODUCT_IMAGE,
    metrics: [
      { label: 'Deep Sleep Draw', value: '3.8 µA' },
      { label: 'Uplink Range', value: '15.4 km' },
      { label: 'Operating Temp', value: '-40°C to +85°C' }
    ],
    cadNodeCode: '[CAD_NODE_AERONODE_V3]'
  },
  {
    id: 'pulsematrix',
    title: 'PulseMatrix Modular Gateway',
    clientCategory: 'Factory Automation & Robotics',
    category: 'IoT',
    description: 'Modular high-throughput edge controller connecting legacy CNC machinery to modern web observability dashboards.',
    challenge: 'Handle multi-bus industrial protocols (RS485, CAN-FD, Ethernet/IP) simultaneously with microsecond timestamp synchronization.',
    solution: 'Designed an isolated multi-bus PCB sandwich structure housed in an extruded anodized aluminum chassis with DIN-rail mount.',
    results: [
      'Sub-50µs timestamp precision across 32 concurrent machines',
      'Hot-swappable I/O expansion modules',
      'Sub-second failover redundant LTE backup'
    ],
    techStack: ['STM32MP1 Dual Core', 'CAN-FD / RS485', 'Embedded Linux', 'React Telemetry UI', 'CNC Aluminum'],
    image: HERO_PRODUCT_IMAGE,
    metrics: [
      { label: 'Bus Throughput', value: '1 Gbps' },
      { label: 'Isolation Voltage', value: '2.5 kV RMS' },
      { label: 'MTBF Rating', value: '120,000 hrs' }
    ],
    cadNodeCode: '[CAD_NODE_PULSE_GATEWAY_V1]'
  },
  {
    id: 'lumina-controller',
    title: 'Lumina Core Wearable Biosensor',
    clientCategory: 'MedTech & High-Performance Athletic',
    category: 'CAD',
    description: 'Ultra-miniaturized photoplethysmography (PPG) and motion sensor with medical-grade biocompatible silicone enclosure.',
    challenge: 'Fit a 120mAh LiPo, wireless Qi charging coil, Bluetooth 5.4 radio, and 6-axis IMU into an ultra-slim 28mm puck under 14 grams.',
    solution: 'Developed a rigid-flex 6-layer PCB with embedded micro-vias, ultrasonic-welded polycarbonate core, and over-molded liquid silicone rubber (LSR).',
    results: [
      '11.8 grams total weight including battery',
      '7 days battery life on continuous 25Hz PPG sampling',
      'Passed 5 ATM water immersion tests'
    ],
    techStack: ['Rigid-Flex PCB', 'Nordic nRF52840', 'Liquid Silicone Rubber', 'Qi Wireless Power', 'Web Bluetooth App'],
    image: HERO_PRODUCT_IMAGE,
    metrics: [
      { label: 'Mass', value: '11.8 g' },
      { label: 'Thickness', value: '6.4 mm' },
      { label: 'Water Resistance', value: '5 ATM / 50m' }
    ],
    cadNodeCode: '[CAD_NODE_LUMINA_CORE_V2]'
  }
];

export const STUDIO_SPECS = {
  founded: '2021',
  projectsShipped: '48+',
  patentsGranted: '12',
  averageCycleToPrototype: '4.2 Weeks',
  tolerances: '0.01 mm / ISO 9001 Alignment',
  standards: ['ISO 13485 (MedTech)', 'FCC Part 15 Class B', 'CE / RED Directive', 'RoHS / REACH compliant']
};
