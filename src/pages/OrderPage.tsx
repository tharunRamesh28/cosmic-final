import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Upload, Send, AlertCircle, Check } from 'lucide-react';
import { Link, useRouter } from '../router';
import { supabase } from '../lib/supabase';

const ALLOWED_EXTENSIONS = ['.pdf', '.step', '.stp', '.zip', '.gbr', '.gerber', '.dwg', '.png'];
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export const OrderPage: React.FC = () => {
  const { locationState } = useRouter();

  // Form fields
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [projectName, setProjectName] = useState<string>('');
  const [projectType, setProjectType] = useState<string>('Embedded Systems');
  const [projectDescription, setProjectDescription] = useState<string>('');
  const [expectedTimeline, setExpectedTimeline] = useState<string>('STANDARD (10–14 Days)');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Store confirmed details to display cleanly on the success screen
  const [confirmedSummary, setConfirmedSummary] = useState<{
    name: string;
    email: string;
    projectName: string;
    projectType: string;
    expectedTimeline: string;
  }>({
    name: '',
    email: '',
    projectName: '',
    projectType: '',
    expectedTimeline: '',
  });

  useEffect(() => {
    if (locationState?.initialService) {
      setProjectName(locationState.initialService);
    }
    if (locationState?.selectedSpeed) {
      const speed = locationState.selectedSpeed.toUpperCase();
      if (speed.includes('RAPID')) {
        setExpectedTimeline('RAPID (7–10 Days)');
      } else if (speed.includes('EXTENDED')) {
        setExpectedTimeline('EXTENDED (14–20 Days)');
      } else {
        setExpectedTimeline('STANDARD (10–14 Days)');
      }
    }
  }, [locationState]);

  const projectTypes = [
    'Embedded Systems',
    'IoT',
    'CAD Design',
    'Robotics',
    'Complete Product',
    'Other'
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormError(null);
    if (e.target.files && e.target.files.length > 0) {
      const filesArray: File[] = Array.from(e.target.files);

      for (const file of filesArray) {
        if (file.size > MAX_FILE_SIZE) {
          setFormError(`File "${file.name}" exceeds the 50MB size limit.`);
          return;
        }
        const ext = '.' + file.name.split('.').pop()?.toLowerCase();
        if (!ALLOWED_EXTENSIONS.includes(ext)) {
          setFormError(`File "${file.name}" has an unsupported format. Allowed: .pdf, .step, .zip, .gbr, .dwg, .png`);
          return;
        }
      }

      setSelectedFiles(filesArray);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // STEP 1: Validation of required fields
    if (!name.trim()) {
      setFormError('Please provide your name.');
      return;
    }
    if (!email.trim()) {
      setFormError('Please provide your email address.');
      return;
    }
    if (!projectName.trim()) {
      setFormError('Please enter a project name.');
      return;
    }
    if (!projectType) {
      setFormError('Please select a project type.');
      return;
    }
    if (!projectDescription.trim()) {
      setFormError('Please describe your project requirements.');
      return;
    }

    // STEP 2: Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setFormError('Please enter a valid email address format.');
      return;
    }

    // STEP 3: File validation
    for (const file of selectedFiles) {
      if (file.size > MAX_FILE_SIZE) {
        setFormError(`File "${file.name}" exceeds the 50MB maximum size limit.`);
        return;
      }
      const ext = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!ALLOWED_EXTENSIONS.includes(ext)) {
        setFormError(`File "${file.name}" is not an allowed format (.pdf, .step, .zip, .gbr, .dwg, .png).`);
        return;
      }
    }

    setSubmitting(true);

    try {
      // DIAGNOSTIC STEP 2: Inspect Google authentication and session immediately before submission
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      console.log('Supabase session:', session ? 'Active' : null);
      console.log('Supabase user:', user ? { id: user.id, email: user.email } : null);
      console.log('Supabase user ID:', user?.id);
      if (sessionError) console.log('Session error:', sessionError);
      if (userError) console.log('User error:', userError);

      // STEP 3: If user is null, STOP submission and prompt user
      if (!user) {
        setFormError('Please continue with Google before submitting your project.');
        setSubmitting(false);
        return;
      }

      // STEP 4: Insert into public.project_submissions with authenticated user_id
      // Testing INSERT alone without .select() to verify insert permissions
      const submissionRecord = {
        user_id: user.id,
        client_name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim() || null,
        company: company.trim() || null,
        project_name: projectName.trim(),
        project_type: projectType,
        project_description: projectDescription.trim(),
        expected_timeline: expectedTimeline || null,
        status: 'new' as const,
      };

      const { error: submissionError } = await supabase
        .from('project_submissions')
        .insert(submissionRecord);

      if (submissionError) {
        console.error('PROJECT INSERT ERROR:', submissionError);
        setFormError(
          submissionError.message ||
            'Unable to transmit project brief at this time. Please verify your details and try again.'
        );
        setSubmitting(false);
        return;
      }

      console.log('Project submitted successfully');

      // STEP 6: Upload selected files if any were provided
      if (selectedFiles.length > 0) {
        for (const file of selectedFiles) {
          const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
          const storagePath = `${user.id}/${Date.now()}_${sanitizedFileName}`;

          const { error: uploadError } = await supabase.storage
            .from('project-files')
            .upload(storagePath, file, {
              cacheControl: '3600',
              upsert: false,
            });

          if (uploadError) {
            console.error('Storage upload error:', uploadError);
          }
        }
      }

      // Preserve details for success screen
      setConfirmedSummary({
        name: name.trim(),
        email: email.trim(),
        projectName: projectName.trim(),
        projectType,
        expectedTimeline,
      });

      // Clear the form only after successful submission
      setName('');
      setEmail('');
      setPhone('');
      setCompany('');
      setProjectName('');
      setProjectDescription('');
      setSelectedFiles([]);

      // STEP 8: Show the existing website's professional success state
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setFormError('Network communication error. Please check your internet connection and try again.');
    } finally {
      setSubmitting(false);
    }
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
        /* Professional Success Confirmation */
        <div className="bg-white border border-[#c4c7c7]/60 rounded-2xl p-10 md:p-16 max-w-2xl mx-auto text-center shadow-lg animate-in fade-in zoom-in-95 duration-300">
          {/* Subtle Cosmic Circuit green success indicator / icon */}
          <div className="w-16 h-16 rounded-full bg-[#f4fbe9] border border-[#c8f179] flex items-center justify-center mx-auto mb-6 shadow-[0_0_24px_rgba(200,241,121,0.35)]">
            <Check className="w-8 h-8 text-[#476800] stroke-[2.5]" />
          </div>

          <h2 className="font-display-tech text-3xl sm:text-4xl font-extrabold text-[#000000] tracking-tight mb-3">
            WE RECEIVED YOUR REQUEST
          </h2>

          <p className="font-display-tech text-base sm:text-lg text-[#444748] max-w-lg mx-auto mb-8 leading-relaxed">
            Our team will review your project requirements and contact you soon.
          </p>

          <div className="bg-[#f9faf7] border border-[#c4c7c7]/60 rounded-xl p-5 mb-8 text-left font-mono-tech text-xs space-y-2 max-w-md mx-auto">
            <div className="flex justify-between">
              <span className="text-neutral-400">PROJECT:</span>
              <span className="font-bold text-black">{confirmedSummary.projectName || 'Hardware Build'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">DISCIPLINE:</span>
              <span className="font-bold text-black">{confirmedSummary.projectType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">CLIENT:</span>
              <span className="font-bold text-black">{confirmedSummary.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">CONTACT:</span>
              <span className="font-bold text-black">{confirmedSummary.email}</span>
            </div>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#000000] text-white font-mono-tech text-xs font-bold px-8 py-3.5 rounded-lg hover:bg-[#2e312f] transition-all cursor-pointer shadow-xs"
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
              </div>
            </div>

            {/* Scope & Logistics */}
            <div className="pt-6 border-t border-[#c4c7c7]/30">
              <span className="font-mono-tech text-xs text-[#74a81e] font-bold uppercase tracking-wider block mb-4">
                # 03 TIMELINE & FILES
              </span>

              <div className="mb-6">
                <label className="font-mono-tech text-xs text-neutral-500 uppercase font-bold block mb-2">
                  Development Package &amp; Expected Timeline
                </label>
                <select
                  value={expectedTimeline}
                  onChange={(e) => setExpectedTimeline(e.target.value)}
                  className="w-full bg-[#f9faf7] border border-[#c4c7c7] rounded-lg p-3.5 text-sm font-display-tech text-black focus:outline-none focus:border-black font-semibold"
                >
                  <option value="RAPID (7–10 Days)">RAPID — 7–10 Days (Quick turnaround)</option>
                  <option value="STANDARD (10–14 Days)">STANDARD — 10–14 Days (Balanced &amp; recommended)</option>
                  <option value="EXTENDED (14–20 Days)">EXTENDED — 14–20 Days (Additional testing &amp; refinement)</option>
                  <option value="Custom Scope / Ongoing">Custom Scope / Ongoing Engineering</option>
                </select>
              </div>

              {/* Upload Project Files */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="font-mono-tech text-xs text-neutral-500 uppercase font-bold block">
                    Upload Project Files (Optional)
                  </label>
                  <span className="font-mono-tech text-[10px] text-[#476800] uppercase font-bold">
                    Schematics, Spec Sheets, CAD, Reference Docs
                  </span>
                </div>
                <div className="relative border-2 border-dashed border-[#c4c7c7] rounded-xl p-6 text-center hover:border-black transition-colors bg-[#f9faf7]">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload className="w-6 h-6 text-[#476800] mx-auto mb-2" />
                  <p className="font-display-tech text-xs text-[#191c1b] font-semibold">
                    {selectedFiles.length > 0
                      ? selectedFiles.length === 1
                        ? `Selected file: ${selectedFiles[0].name}`
                        : `${selectedFiles.length} files selected: ${selectedFiles.map((f) => f.name).join(', ')}`
                      : 'Drag & drop project files, or browse from computer (Optional)'}
                  </p>
                  <p className="font-mono-tech text-[10px] text-neutral-400 mt-1">
                    Supports PDF, STEP, ZIP, Gerber, DWG, PNG (Max 50MB per file)
                  </p>
                  {selectedFiles.length > 0 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFiles([]);
                      }}
                      className="mt-3 inline-flex items-center gap-1 text-[11px] font-mono-tech text-neutral-500 hover:text-black underline relative z-10 cursor-pointer"
                    >
                      Clear selected files
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Error Feedback */}
            {formError && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-mono-tech flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            {/* Submission CTA */}
            <div className="pt-6 border-t border-[#c4c7c7]/30 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-neutral-500 font-mono-tech text-xs">
                <ShieldCheck className="w-4 h-4 text-[#476800]" />
                <span>All submissions protected under mutual non-disclosure.</span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto bg-[#000000] text-white font-mono-tech text-xs font-bold px-10 py-4 rounded-lg hover:bg-[#2e312f] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>SUBMITTING PROJECT...</span>
                  </>
                ) : (
                  <>
                    <span>SUBMIT PROJECT</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
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
