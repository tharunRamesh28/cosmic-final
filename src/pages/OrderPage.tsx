import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Upload, Send, HelpCircle } from 'lucide-react';
import { Link, useRouter } from '../router';

export const OrderPage: React.FC = () => {
  const { locationState } = useRouter();

  // Form fields
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [projectName, setProjectName] = useState<string>('');
  const [projectType, setProjectType] = useState<string>('Electronics');
  const [projectDescription, setProjectDescription] = useState<string>('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [budgetRange, setBudgetRange] = useState<string>('$5,000 - $15,000');
  const [expectedTimeline, setExpectedTimeline] = useState<string>('4 - 8 Weeks');
  const [fileName, setFileName] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (locationState?.initialService) {
      setProjectName(locationState.initialService);
    }
  }, [locationState]);

  const projectTypes = [
    'Electronics',
    'Embedded Systems',
    'IoT',
    'PCB',
    'CAD Design',
    'Robotics',
    'AI + Hardware',
    'Complete Product',
    'Other'
  ];

  const availableServices = [
    'Circuit Design',
    'Schematic Capture',
    'PCB Layout & DFM',
    'Embedded Firmware (C/C++/Rust)',
    'IoT Cloud Telemetry',
    '3D Mechanical CAD',
    'Physical Prototyping',
    'Edge AI / Computer Vision',
    'Complete Product Turnkey'
  ];

  const handleServiceToggle = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="animate-in fade-in duration-300 px-6 md:px-16 py-12 md:py-20 max-w-[1440px] mx-auto">
      {/* Breadcrumb Navigation */}
      <div className="font-mono-tech text-xs text-[#74a81e] font-semibold mb-6 flex items-center gap-2">
        <Link to="/" className="text-[#444748] hover:text-black transition-colors">HOME</Link>
        <span>#</span>
        <span>ORDER</span>
      </div>

      {/* Page Header */}
      <div className="max-w-4xl mb-16">
        <div className="inline-block bg-[#f3f4f1] text-[#476800] border border-[#c4c7c7] font-mono-tech text-xs font-bold px-3 py-1 rounded mb-4">
          PROJECT COMMISSION # SCOPING INQUIRY
        </div>
        <h1 className="font-display-tech text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#000000] tracking-tight mb-4">
          START YOUR PROJECT.
        </h1>
        <p className="font-display-tech text-lg sm:text-xl md:text-2xl text-[#444748] font-normal leading-relaxed">
          Have an idea? Tell us what you want to build.
        </p>
      </div>

      {submitted ? (
        /* Confirmation State */
        <div className="bg-white border border-[#c4c7c7]/60 rounded-2xl p-8 md:p-16 max-w-2xl mx-auto text-center shadow-lg">
          <div className="w-16 h-16 rounded-full bg-[#c8f179]/30 border-2 border-[#476800] text-[#191c1b] flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-[#476800]" />
          </div>
          <h2 className="font-display-tech text-3xl font-bold text-[#000000] mb-4">
            Project Proposal Transmitted
          </h2>
          <p className="font-display-tech text-base text-[#444748] mb-8 leading-relaxed">
            Thank you, <span className="font-bold text-black">{name || 'Client'}</span>. Our engineering team has received your project brief. A technical lead will review your specifications and contact you at <span className="font-bold text-black">{email}</span> within 24 hours.
          </p>

          <div className="bg-[#f9faf7] border border-[#c4c7c7]/60 rounded-xl p-6 mb-8 text-left font-mono-tech text-xs space-y-2.5">
            <div><span className="text-neutral-400">PROJECT:</span> {projectName || 'Hardware Build'}</div>
            <div><span className="text-neutral-400">TYPE:</span> {projectType}</div>
            <div><span className="text-neutral-400">SERVICES:</span> {selectedServices.length > 0 ? selectedServices.join(', ') : 'Turnkey Development'}</div>
            <div><span className="text-neutral-400">TIMELINE:</span> {expectedTimeline}</div>
            <div><span className="text-neutral-400">BUDGET:</span> {budgetRange}</div>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#000000] text-white font-mono-tech text-xs font-bold px-8 py-4 rounded-lg hover:bg-[#2e312f] transition-all cursor-pointer"
          >
            <span>RETURN HOME</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        /* Professional Project Enquiry Form */
        <div className="bg-white border border-[#c4c7c7]/60 rounded-2xl p-8 md:p-14 shadow-xs max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Contact Details Grid */}
            <div>
              <span className="font-mono-tech text-xs text-[#74a81e] font-bold uppercase tracking-wider block mb-4">
                # 01 CLIENT INFORMATION
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-mono-tech text-xs text-neutral-500 uppercase font-bold block mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Nikola Tesla"
                    className="w-full bg-[#f9faf7] border border-[#c4c7c7] rounded-lg p-3.5 text-sm font-display-tech text-black focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div>
                  <label className="font-mono-tech text-xs text-neutral-500 uppercase font-bold block mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nikola@enterprise.com"
                    className="w-full bg-[#f9faf7] border border-[#c4c7c7] rounded-lg p-3.5 text-sm font-display-tech text-black focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div>
                  <label className="font-mono-tech text-xs text-neutral-500 uppercase font-bold block mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 019-2834"
                    className="w-full bg-[#f9faf7] border border-[#c4c7c7] rounded-lg p-3.5 text-sm font-display-tech text-black focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div>
                  <label className="font-mono-tech text-xs text-neutral-500 uppercase font-bold block mb-2">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Tesla Dynamics Labs"
                    className="w-full bg-[#f9faf7] border border-[#c4c7c7] rounded-lg p-3.5 text-sm font-display-tech text-black focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="pt-6 border-t border-[#c4c7c7]/30">
              <span className="font-mono-tech text-xs text-[#74a81e] font-bold uppercase tracking-wider block mb-4">
                # 02 PROJECT DEFINITION
              </span>

              <div className="space-y-6">
                <div>
                  <label className="font-mono-tech text-xs text-neutral-500 uppercase font-bold block mb-2">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="e.g. Autonomous LoRa Sensor Hub"
                    className="w-full bg-[#f9faf7] border border-[#c4c7c7] rounded-lg p-3.5 text-sm font-display-tech text-black focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                {/* Project Type Options */}
                <div>
                  <label className="font-mono-tech text-xs text-neutral-500 uppercase font-bold block mb-2">
                    Project Type *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {projectTypes.map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setProjectType(type)}
                        className={`p-3 rounded-lg border text-left font-mono-tech text-xs transition-all cursor-pointer ${
                          projectType === type
                            ? 'border-2 border-black bg-[#191c1b] text-white font-bold'
                            : 'border-[#c4c7c7]/70 bg-[#f9faf7] text-[#191c1b] hover:border-black'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-mono-tech text-xs text-neutral-500 uppercase font-bold block mb-2">
                    Project Description *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder="Explain the functional requirements, target application, operating environment, and what you need us to build..."
                    className="w-full bg-[#f9faf7] border border-[#c4c7c7] rounded-lg p-3.5 text-sm font-display-tech text-black focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                {/* Required Services Multi-Select */}
                <div>
                  <label className="font-mono-tech text-xs text-neutral-500 uppercase font-bold block mb-2">
                    Required Services (Select All That Apply)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {availableServices.map((service) => {
                      const isSelected = selectedServices.includes(service);
                      return (
                        <button
                          type="button"
                          key={service}
                          onClick={() => handleServiceToggle(service)}
                          className={`p-3 rounded-lg border text-left font-mono-tech text-xs transition-all flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'border-2 border-black bg-[#f4fbe9] text-[#191c1b] font-bold'
                              : 'border-[#c4c7c7]/60 bg-white text-[#444748] hover:border-black'
                          }`}
                        >
                          <span>{service}</span>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#476800]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Scope & Logistics */}
            <div className="pt-6 border-t border-[#c4c7c7]/30">
              <span className="font-mono-tech text-xs text-[#74a81e] font-bold uppercase tracking-wider block mb-4">
                # 03 TIMELINE, BUDGET & FILES
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="font-mono-tech text-xs text-neutral-500 uppercase font-bold block mb-2">
                    Budget Range
                  </label>
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full bg-[#f9faf7] border border-[#c4c7c7] rounded-lg p-3.5 text-sm font-display-tech text-black focus:outline-none focus:border-black"
                  >
                    <option value="<$5,000">&lt; $5,000 (Feasibility / Proof of Concept)</option>
                    <option value="$5,000 - $15,000">$5,000 - $15,000 (Functional Hardware Prototype)</option>
                    <option value="$15,000 - $35,000">$15,000 - $35,000 (Production-Ready Rev-A System)</option>
                    <option value="$35,000+">$35,000+ (Full Turnkey Hardware, Firmware & CAD)</option>
                  </select>
                </div>

                <div>
                  <label className="font-mono-tech text-xs text-neutral-500 uppercase font-bold block mb-2">
                    Expected Timeline
                  </label>
                  <select
                    value={expectedTimeline}
                    onChange={(e) => setExpectedTimeline(e.target.value)}
                    className="w-full bg-[#f9faf7] border border-[#c4c7c7] rounded-lg p-3.5 text-sm font-display-tech text-black focus:outline-none focus:border-black"
                  >
                    <option value="Express (1–2 Weeks)">Express Delivery (1–2 Weeks)</option>
                    <option value="Priority (3–4 Weeks)">Priority (3–4 Weeks)</option>
                    <option value="Standard (4–8 Weeks)">Standard Development (4–8 Weeks)</option>
                    <option value="Flexible (8+ Weeks)">Flexible / Ongoing Engineering</option>
                  </select>
                </div>
              </div>

              {/* Upload Project Files */}
              <div>
                <label className="font-mono-tech text-xs text-neutral-500 uppercase font-bold block mb-2">
                  Upload Project Files (Schematics, Spec Sheets, CAD, Reference Docs)
                </label>
                <div className="relative border-2 border-dashed border-[#c4c7c7] rounded-xl p-6 text-center hover:border-black transition-colors bg-[#f9faf7]">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload className="w-6 h-6 text-[#476800] mx-auto mb-2" />
                  <p className="font-display-tech text-xs text-[#191c1b] font-semibold">
                    {fileName ? `Selected file: ${fileName}` : 'Drag & drop project files, or browse from computer'}
                  </p>
                  <p className="font-mono-tech text-[10px] text-neutral-400 mt-1">
                    Supports PDF, STEP, ZIP, Gerber, DWG, PNG (Max 50MB)
                  </p>
                </div>
              </div>
            </div>

            {/* Submission CTA */}
            <div className="pt-6 border-t border-[#c4c7c7]/30 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-neutral-500 font-mono-tech text-xs">
                <ShieldCheck className="w-4 h-4 text-[#476800]" />
                <span>All submissions protected under mutual non-disclosure.</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-[#000000] text-white font-mono-tech text-xs font-bold px-10 py-4 rounded-lg hover:bg-[#2e312f] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>SUBMIT PROJECT</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Return Home Subtle Link */}
      <div className="mt-20 pt-8 border-t border-[#c4c7c7]/30 flex justify-between items-center font-mono-tech text-xs">
        <Link to="/" className="text-[#444748] hover:text-black transition-colors flex items-center gap-1.5">
          <span>RETURN HOME</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <span className="text-neutral-400">
          CONFIDENTIAL # PROPRIETARY HARDWARE SPECIFICATION
        </span>
      </div>
    </div>
  );
};
