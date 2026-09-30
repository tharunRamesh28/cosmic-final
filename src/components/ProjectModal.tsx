import React, { useState } from 'react';
import { X, Check, ArrowRight, Shield, Sparkles, Cpu, Radio, Globe, Compass, Bot, Send, CheckCircle2 } from 'lucide-react';
import { ProjectInquiry } from '../types';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialTier?: string;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  initialService,
  initialTier
}) => {
  const [formData, setFormData] = useState<ProjectInquiry>({
    name: '',
    email: '',
    company: '',
    services: initialService ? [initialService] : ['Hardware'],
    budgetRange: initialTier ? initialTier : 'Standard ($15k - $30k)',
    currentPhase: '01 / Concept',
    timeline: '3 - 4 Months',
    description: '',
    ndaRequired: true
  });

  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  if (!isOpen) return null;

  const serviceOptions = [
    { name: 'Hardware', icon: Cpu, desc: 'PCB Design & Microcontrollers' },
    { name: 'IoT', icon: Radio, desc: 'Wireless & Sensor Networks' },
    { name: 'Web', icon: Globe, desc: 'Telemetry & Cloud Dashboards' },
    { name: 'CAD', icon: Compass, desc: '3D Enclosures & Tooling DFM' },
    { name: 'Robotics', icon: Bot, desc: 'Mobile Robots, Actuators & Control' }
  ];

  const phaseOptions = [
    '01 / Idea & Feasibility',
    '02 / Schematic Concept',
    '03 / Prototype Verification',
    '04 / Mass Production DFM'
  ];

  const toggleService = (srv: string) => {
    if (formData.services.includes(srv)) {
      if (formData.services.length > 1) {
        setFormData({ ...formData, services: formData.services.filter((s) => s !== srv) });
      }
    } else {
      setFormData({ ...formData, services: [...formData.services, srv] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `CC-${Math.floor(100000 + Math.random() * 900000)}`;
    setReferenceId(generatedId);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[150] bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#ffffff] text-[#191c1b] border border-[#c4c7c7] rounded-xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl relative my-8 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#edeeeb] text-neutral-500 hover:text-black transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            {/* Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 border border-[#c4c7c7] px-3 py-1 rounded-full w-fit bg-[#f9faf7] mb-3">
                <span className="w-2 h-2 rounded-full bg-[#c8f179] animate-pulse"></span>
                <span className="font-mono-tech text-[10px] text-[#444748] uppercase tracking-wider font-semibold">
                  CONFIDENTIAL TECHNICAL BRIEF
                </span>
              </div>
              <h2 className="font-display-tech text-3xl sm:text-4xl font-bold text-[#000000] tracking-tight">
                START A PROJECT
              </h2>
              <p className="font-display-tech text-sm text-[#444748] mt-1">
                Define your technical specifications. An engineering lead will review within 24 hours.
              </p>
            </div>

            {/* Step 1: Select Disciplines */}
            <div className="mb-6">
              <label className="font-mono-tech text-xs font-bold text-black uppercase tracking-wider block mb-3">
                1. SELECT REQUIRED DISCIPLINES (SELECT ALL THAT APPLY)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {serviceOptions.map((srv) => {
                  const isSelected = formData.services.includes(srv.name);
                  const Icon = srv.icon;
                  return (
                    <button
                      type="button"
                      key={srv.name}
                      onClick={() => toggleService(srv.name)}
                      className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-2 border-black bg-[#f3f4f1] shadow-xs'
                          : 'border-[#c4c7c7]/60 hover:border-black bg-white'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <Icon className={`w-5 h-5 ${isSelected ? 'text-black' : 'text-[#747878]'}`} />
                        {isSelected && <Check className="w-4 h-4 text-[#476800]" />}
                      </div>
                      <span className="font-display-tech font-bold text-sm text-black block">
                        {srv.name}
                      </span>
                      <span className="font-mono-tech text-[10px] text-[#444748] block truncate">
                        {srv.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Current Maturity Phase */}
            <div className="mb-6">
              <label className="font-mono-tech text-xs font-bold text-black uppercase tracking-wider block mb-3">
                2. CURRENT PRODUCT MATURITY
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {phaseOptions.map((phase) => (
                  <button
                    type="button"
                    key={phase}
                    onClick={() => setFormData({ ...formData, currentPhase: phase })}
                    className={`font-mono-tech text-xs p-2.5 rounded border text-center transition-all ${
                      formData.currentPhase === phase
                        ? 'bg-black text-white font-bold border-black'
                        : 'bg-[#f9faf7] text-[#444748] border-[#c4c7c7] hover:border-black'
                    }`}
                  >
                    {phase}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Contact & Project Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="font-mono-tech text-xs text-[#444748] block mb-1.5 uppercase font-medium">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Alex Mercer"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#f9faf7] border border-[#c4c7c7] rounded p-3 text-sm font-display-tech text-black focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="font-mono-tech text-xs text-[#444748] block mb-1.5 uppercase font-medium">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. alex@quantum-robotics.io"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#f9faf7] border border-[#c4c7c7] rounded p-3 text-sm font-display-tech text-black focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="font-mono-tech text-xs text-[#444748] block mb-1.5 uppercase font-medium">
                  Organization / Company
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kinetic Dynamics Corp"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-[#f9faf7] border border-[#c4c7c7] rounded p-3 text-sm font-display-tech text-black focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="font-mono-tech text-xs text-[#444748] block mb-1.5 uppercase font-medium">
                  Target Prototyping Timeline
                </label>
                <select
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full bg-[#f9faf7] border border-[#c4c7c7] rounded p-3 text-sm font-display-tech text-black focus:outline-none focus:border-black"
                >
                  <option value="Rapid Sprint (3-4 Weeks)">Rapid Sprint (3-4 Weeks)</option>
                  <option value="Standard Release (2-3 Months)">Standard Release (2-3 Months)</option>
                  <option value="Enterprise Production (4-6 Months)">Enterprise Production (4-6 Months)</option>
                </select>
              </div>
            </div>

            {/* Description / Requirements */}
            <div className="mb-6">
              <label className="font-mono-tech text-xs text-[#444748] block mb-1.5 uppercase font-medium">
                High-Level Technical Requirements / Abstract *
              </label>
              <textarea
                rows={3}
                required
                placeholder="Briefly describe physical constraints, wireless range needs, sensor inputs, target power consumption, or target unit cost..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-[#f9faf7] border border-[#c4c7c7] rounded p-3 text-sm font-display-tech text-black focus:outline-none focus:border-black"
              />
            </div>

            {/* NDA Checkbox */}
            <div className="flex items-center gap-2 mb-8 bg-[#f3f4f1] p-3 rounded border border-[#c4c7c7]/50">
              <input
                type="checkbox"
                id="nda"
                checked={formData.ndaRequired}
                onChange={(e) => setFormData({ ...formData, ndaRequired: e.target.checked })}
                className="rounded border-[#747878] text-black focus:ring-0"
              />
              <label htmlFor="nda" className="font-mono-tech text-xs text-[#191c1b] cursor-pointer flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#476800]" />
                <span>Execute Mutual Non-Disclosure Agreement (NDA) prior to technical calls</span>
              </label>
            </div>

            {/* Submit Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-[#c4c7c7]/40">
              <div className="font-mono-tech text-[11px] text-[#444748]">
                ESTIMATED REVIEW TIME: &lt; 24 HOURS
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="font-mono-tech text-xs px-5 py-3 rounded border border-[#c4c7c7] text-[#444748] hover:text-black w-1/2 sm:w-auto"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="bg-[#000000] text-white font-mono-tech text-xs tracking-wider px-8 py-3.5 rounded flex items-center justify-center gap-2 hover:bg-[#2e312f] cosmic-glow w-1/2 sm:w-auto font-bold"
                >
                  <span>SUBMIT BRIEF</span>
                  <Send className="w-3.5 h-3.5 text-[#c8f179]" />
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* Submission Success View */
          <div className="py-8 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-[#f4fbe9] border border-[#c8f179] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_24px_rgba(200,241,121,0.35)]">
              <Check className="w-8 h-8 text-[#476800] stroke-[2.5]" />
            </div>

            <h3 className="font-display-tech text-3xl font-extrabold text-[#000000] tracking-tight mb-3">
              WE RECEIVED YOUR REQUEST
            </h3>
            <p className="font-display-tech text-base text-[#444748] max-w-md mx-auto mb-6 leading-relaxed">
              Our team will review your project requirements and contact you soon.
            </p>

            <div className="bg-[#f3f4f1] border border-[#c4c7c7] rounded-lg p-4 max-w-md mx-auto mb-8 text-left font-mono-tech text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#444748]">REFERENCE CODE:</span>
                <span className="font-bold text-black">{referenceId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#444748]">DISCIPLINES:</span>
                <span className="font-bold text-black">{formData.services.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#444748]">ENTRY PHASE:</span>
                <span className="font-bold text-black">{formData.currentPhase}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#444748]">NDA STATUS:</span>
                <span className="text-[#476800] font-bold">READY FOR SIGNATURE</span>
              </div>
            </div>

            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="bg-[#000000] text-white font-mono-tech text-xs tracking-wider px-8 py-3.5 rounded hover:bg-[#2e312f] cosmic-glow"
            >
              RETURN TO STUDIO OVERVIEW
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
